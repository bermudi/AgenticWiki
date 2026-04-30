# Verification Pass

> Loaded after the analytical pass is complete. Run verification BEFORE committing.

You have filed a new source (Phase 1) and critically analyzed how it affects the wiki's theory (Phase 2). Now switch to verification mode. You are no longer creating or analyzing — you are auditing. Your job is to catch errors the editing passes introduced before they become permanent.

This phase exists because LLMs silently corrupt documents during delegated editing workflows (DELEGATE-52). Verification is architecturally separated from editing: it uses separate sessions, judgment-only tasks, and narrow scope — all patterns shown to be reliable even when long editing chains degrade.

## Step 0: Pre-Flight — Is Verification Needed?

Not every change needs full verification. Use this decision tree:

```
Did any wiki/*.md file change? (check git diff)
├── No → Skip Phase 3. Commit.
└── Yes → Continue to Step 1.
```

If the change is purely mechanical (only `updated:` date changes, only whitespace, only index.md additions with no content changes), you may skip the source-verifier but still run the structural-editor to confirm index/link integrity.

## Step 1: Diff Auditor — Catch Catastrophic Drift

Run this before spawning any subagents. It catches the most common catastrophic failures using fast bash checks. No LLM calls needed.

```bash
# Identify changed wiki pages
changed=$(git diff --name-only -- 'wiki/**/*.md' 2>/dev/null)
if [ -z "$changed" ]; then
  changed=$(git diff --cached --name-only -- 'wiki/**/*.md' 2>/dev/null)
fi

echo "=== Diff Auditor ==="
echo "Changed pages: $changed"
echo ""

# Check 1: Large deletions (>20% word count loss)
for f in $changed; do
  [ ! -f "$f" ] && echo "🚨 FILE DELETED: $f" && continue
  old=$(git show HEAD:"$f" 2>/dev/null | wc -w)
  new=$(wc -w < "$f")
  [ "$old" -lt 50 ] && continue  # skip trivial pages
  ratio=$(echo "scale=2; $new / $old" | bc 2>/dev/null)
  if [ -n "$ratio" ] && (( $(echo "$ratio < 0.8" | bc -l) )); then
    echo "🚨 DELETION: $f: $old → $new words ($(echo "$ratio * 100" | bc)%)"
  fi
done

# Check 2: Summary blockquote changes
for f in $changed; do
  [ ! -f "$f" ] && continue
  old_summary=$(git show HEAD:"$f" 2>/dev/null | sed -n '/^> /p' | head -1)
  new_summary=$(sed -n '/^> /p' "$f" | head -1)
  [ "$old_summary" != "$new_summary" ] && echo "⚠️  SUMMARY CHANGED: $f"
done

# Check 3: Sources section changes
for f in $changed; do
  [ ! -f "$f" ] && continue
  old_sources=$(git show HEAD:"$f" 2>/dev/null | sed -n '/^## Sources/,$ p')
  new_sources=$(sed -n '/^## Sources/,$ p' "$f")
  [ "$old_sources" != "$new_sources" ] && echo "⚠️  SOURCES CHANGED: $f"
done

echo "=== Audit Complete ==="
```

**If any 🚨 CRITICAL is found:** Fix it now before proceeding. A deletion or suspect change needs human review. Re-run the auditor after fixing.

## Step 2: Identify Scope — Which Pages Need Source Verification?

From the diff, determine which pages actually need source verification:

```
Priority 1 (must verify): New pages AND pages with new claims
  → These have the highest risk of hallucination
  → New pages have no prior state to compare against

Priority 2 (should verify): Existing pages with substantial content changes
  → Check if the diff shows new paragraphs, changed claims, or restructured arguments
  → Skip if only cross-references, formatting, or dates changed

Priority 3 (skip): Pages with only mechanical changes
  → Only frontmatter, links, formatting, or typo fixes
  → These don't need source verification
```

List the pages that need verification. This list is the input to Step 3.

## Step 3: Source-Anchored Verification (Parallel Subagents)

For each page that needs verification, spawn a `source-verifier` subagent. Run them in parallel — each is an independent session with narrow scope.

```typescript
subagent({
  tasks: [
    {
      agent: "source-verifier",
      task: "Verify wiki/concepts/some-page.md against its raw/ sources. Check for hallucinations, omissions, misattributions, and summary accuracy. Produce a structured verification report.",
      output: ".pi/verification/some-page-report.md"
    },
    {
      agent: "source-verifier",
      task: "Verify wiki/concepts/another-page.md against its raw/ sources. Check for hallucinations, omissions, misattributions, and summary accuracy. Produce a structured verification report.",
      output: ".pi/verification/another-page-report.md"
    }
    // ... more pages as needed
  ],
  concurrency: 5
})
```

**Important:**
- Each source-verifier gets a single page. Narrow scope = reliable judgment per DELEGATE-52.
- Use `output` to persist reports to `.pi/verification/` so you can review them.
- Use `.pi/verification/` directory (gitignored or cleaned up after review — temporary artifacts).
- Don't send the verifier the git diff or the editing context. It gets only: the page file + its source files.

**Parallelism limit:** Don't exceed `concurrency: 5`. More than 5 parallel subagent sessions can hit API rate limits. If you have more than 5 pages to verify, run them in batches.

### If verification fails (subagent error)

If a source-verifier errors out (timeout, API error, etc.), re-run just that page. Don't re-run the whole batch.

## Step 4: Mechanical Integrity Re-Check

After source verification, re-run the structural-editor and link-editor on changed files. The editing passes may have introduced mechanical drift (broken links, stale index, missing backlinks).

Run these sequentially (not parallel — link-editor depends on structural-editor's index fixes):

```typescript
subagent({
  agent: "structural-editor",
  task: "Re-check structural integrity of recently changed wiki pages. Fix any mechanical issues (frontmatter, broken links, index accuracy, orphans). Focus only on pages that changed in this ingest."
})

subagent({
  agent: "link-editor",
  task: "Re-check cross-reference integrity of recently changed wiki pages. Fix bidirectional links, thread↔concept coverage, Related section completeness. Focus only on pages that changed in this ingest."
})
```

**Note:** The existing editors auto-fix mechanical issues. For source fidelity issues flagged by the source-verifier, they require human judgment — do NOT auto-fix those.

## Step 5: Aggregate Findings

Read all verification reports from `.pi/verification/` and aggregate them into a single summary:

```
## Verification Summary

### 🚨 CRITICAL (must fix before commit)
- [page]: [brief description of each critical finding]
- ...

### ⚠️ WARNING (should review)
- [page]: [brief description of each warning]
- ...

### ℹ️ INFO
- [notable observations]

### Mechanical Re-Checks
- Structural: [any issues found/fixed]
- Cross-references: [any issues found/fixed]

### Clean
- [pages that passed with no issues]
```

## Step 6: Present to Human

Show the verification summary. Ask:

> "N critical issues found. Fix before commit? [y/n/detail]"

If the human says `detail`, show the full reports.

## Step 7: Fix Critical Issues

For each CRITICAL finding:

1. Read the source-verifier's report to understand exactly what's wrong
2. Read the relevant `raw/` source to verify the finding (trust but verify — the verifier can also be wrong, though it's more reliable for judgment than editing)
3. Fix the wiki page to align with the source
4. If the verifier's finding was incorrect (false positive), note it and dismiss

After all critical fixes are applied, **re-run source-verifier on the fixed pages** to confirm the fixes didn't introduce new errors:

```typescript
subagent({
  agent: "source-verifier",
  task: "Re-verify wiki/concepts/fixed-page.md after critical fixes. Confirm previous CRITICAL findings are resolved. Check for any new issues introduced by the fix."
})
```

If WARNING findings were also fixed, re-verify those too.

## Step 8: Commit

Only after all CRITICAL findings are resolved and re-verified:

```bash
git add -A
git commit -m "ingest: <source title> — <summary>. Verification: [PASSED / N issues fixed]"
```

Include verification status in the commit message for audit trail.

## Cleanup

After commit, clean up temporary verification reports:

```bash
rm -f .pi/verification/*-report.md
```

## What NOT to Do in Verification

- ❌ Don't skip verification because "the changes were small." Small changes cause big errors (DELEGATE-52: sparse catastrophic failures).
- ❌ Don't fix source-verifier findings without reading the source yourself. The verifier can hallucinate too — it's just less likely to.
- ❌ Don't re-run the full editing pipeline. Verification catches errors; it doesn't replace editing.
- ❌ Don't auto-fix CRITICAL source fidelity issues. These require human judgment — the verifier flags, the human decides.
- ❌ Don't run source-verifier on more than 5 pages at once. Batch them.

## Periodic Full Audit (Monthly)

Not part of the ingest workflow. Run separately:

```bash
# Monthly: verify every page against its sources
# This catches slow drift across many small ingests
for page in $(find wiki/ -name "*.md" ! -name "index.md"); do
  # spawn source-verifier for each page
  # aggregate and report
done
```

The full audit catches the degradation pattern where a page drifts across 10 small ingests, each individually passing verification but cumulatively diverging from sources. This is the DELEGATE-52 compounding effect at the monthly timescale.
