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

### Step 1b: Diff Reasoning — Catch Semantic Drift

The bash audit catches volume changes. This step catches meaning changes — edits that changed *what the page says* without triggering word-count alarms. Run it before source-verifier: diff reasoning checks **transition fidelity** (was this change justified?), source-verifier checks **final-state fidelity** (does the result match the sources?). Both are needed because a page can pass source verification while still having suffered a silent corruption — a pre-existing caveat dropped during a rewrite, a hedged claim hardened into a universal, a paragraph "cleaned up" into meaning something subtly different.

**What to check:**
- **Orphan edits**: Changes with no clear justification from the source being ingested. The agent edited beyond what the source warranted.
- **Semantic drift**: Hedging removed, qualifiers dropped, meaning changed. "X sometimes fails under Y" → "X fails under Y." Still factually defensible, so source-verifier won't flag it — but the *change itself* wasn't justified.
- **Claim deletion**: Pre-existing claims that vanished during a rewrite without explanation. Not replaced or updated — just gone.
- **Scope creep**: Edits to sections or concepts unrelated to the source being ingested.

**How to run:**

1. Collect the diffs:

```bash
changed=$(git diff --name-only -- 'wiki/**/*.md' 2>/dev/null)
[ -z "$changed" ] && changed=$(git diff --cached --name-only -- 'wiki/**/*.md' 2>/dev/null)

for f in $changed; do
  echo "=== $f ==="
  git diff -- "$f" 2>/dev/null || git diff --cached -- "$f" 2>/dev/null
done
```

2. Spawn a single diff-reasoning delegate. Pass the collected diffs and identify the raw/ source file. The delegate reads the source itself — don't summarize it:

```
delegate({
  tasks: [{
    prompt: "You are verifying a wiki ingest by reasoning about the diffs. You'll receive unified diffs from a recent ingest and the path to the raw/ source that was ingested.\n\nRead the source first, then evaluate each diff chunk against it.\n\n## Check for:\n\n1. **Orphan edits** — changes with no connection to the source. The agent edited beyond what the source warranted.\n2. **Semantic drift** — hedging removed, qualifiers dropped, meaning changed. 'X sometimes fails' → 'X fails.' The final claim may still be true — the issue is the *change* wasn't justified.\n3. **Claim deletion** — pre-existing claims that vanished without explanation. Not replaced, just gone.\n4. **Scope creep** — edits to sections or concepts unrelated to the source.\n\n## Do NOT flag:\n\n- Formatting, whitespace, link syntax\n- Frontmatter updates (dates, source lists, tags)\n- New content clearly supported by the source\n- Rewordings that preserve meaning\n\n## Severity:\n\n- 🚨 CRITICAL: Claim deleted or meaning inverted. Must fix.\n- ⚠️ WARNING: Orphan edit, scope creep, or softened hedging. Should review.\n- ℹ️ INFO: Minor drift worth noting.\n\n## Output:\n\n### [page-name]\n- **[severity]**: [what changed and why it's problematic]\n- **Clean**: [changes that are justified]\n\n---\n\nSource being ingested: raw/[source-filename]\n\nDiffs:\n[paste the collected unified diffs]",
    tools: ["read", "bash"],
    context: "fresh"
  }]
})
```

**Important:**
- The delegate gets only the diffs and the source file path. No editing context, no full wiki pages. Narrow input = reliable judgment.
- Run this **before** source-verifier (Step 3). Diff reasoning catches transition problems; source-verifier catches final-state problems.
- **If CRITICAL findings surface:** Fix before proceeding to Step 2. Meaning changes without justification are more likely errors than intentional.

**Skip this step if:**
- The bash auditor found no substantive changes (only frontmatter, formatting, or index additions)
- The ingest was marginal (no full pages created or rewritten)

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

For each page that needs verification, use `delegate` to spawn source-verifier subagents. Run them in parallel — each is an independent session with narrow scope.

```
delegate({
  tasks: [
    {
      prompt: "Verify wiki/concepts/some-page.md against its raw/ sources. Check for hallucinations, omissions, misattributions, and summary accuracy. Produce a structured verification report.",
      agent: "source-verifier"
    },
    {
      prompt: "Verify wiki/concepts/another-page.md against its raw/ sources. Check for hallucinations, omissions, misattributions, and summary accuracy. Produce a structured verification report.",
      agent: "source-verifier"
    }
    // ... more pages as needed
  ]
})
```

**Important:**
- Each source-verifier gets a single page. Narrow scope = reliable judgment per DELEGATE-52.
- Don't send the verifier the git diff or the editing context. It gets only: the page file + its source files (it reads those itself from the paths in frontmatter `sources`).
- The verifier produces its report as text output in the delegate response. Read the responses to build the aggregate report.

**Parallelism limit:** Don't include more than 5 tasks in a single `delegate` call. More than 5 parallel subagent sessions can hit API rate limits. If you have more than 5 pages to verify, run them in batches.

### If verification fails (subagent error)

If a source-verifier errors out (timeout, API error, etc.), re-run just that page. Don't re-run the whole batch.

## Step 4: Mechanical Integrity Re-Check

After source verification, re-run the structural-editor and link-editor on changed files. The editing passes may have introduced mechanical drift (broken links, stale index, missing backlinks).

Run these sequentially (not parallel — link-editor depends on structural-editor's index fixes):

```
delegate({
  tasks: [{
    prompt: "Re-check structural integrity of recently changed wiki pages. Fix any mechanical issues (frontmatter, broken links, index accuracy, orphans). Focus only on pages that changed in this ingest.",
    agent: "structural-editor"
  }]
})

// Then after structural-editor completes:
delegate({
  tasks: [{
    prompt: "Re-check cross-reference integrity of recently changed wiki pages. Fix bidirectional links, thread↔concept coverage, Related section completeness. Focus only on pages that changed in this ingest.",
    agent: "link-editor"
  }]
})
```

**Note:** The existing editors auto-fix mechanical issues. For source fidelity issues flagged by the source-verifier, they require human judgment — do NOT auto-fix those.

## Step 5: Aggregate Findings

**Before aggregating, filter source-verifier findings for actual inaccuracies.** The verifier will flag synthesis, paraphrases, and logical inferences as WARNINGs because they go beyond the source text. These are not inaccuracies — the wiki is a synthetic artifact that draws connections between sources. Only fix findings that represent factual errors:

- **Fix**: Misattributions (wrong person credited), fabricated quotes, made-up numbers, claims contradicted by the source, concepts attributed to a source that doesn't contain them
- **Skip**: Reasonable paraphrases, logical inferences from stated premises, analytical synthesis that connects multiple sources, wiki-specific framing of source ideas

Apply this filter when building the aggregate summary below.

Read the verification reports from the source-verifier delegate responses and aggregate them into a single summary:

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

After all critical fixes are applied, **re-run source-verifier** on the fixed pages via `delegate` to confirm the fixes didn't introduce new errors:

```
delegate({
  tasks: [{
    prompt: "Re-verify wiki/concepts/fixed-page.md after critical fixes. Confirm previous CRITICAL findings are resolved. Check for any new issues introduced by the fix.",
    agent: "source-verifier"
  }]
})
```

If WARNING findings were also fixed, re-verify those too.

## Step 8: Commit

Only after all CRITICAL findings are resolved and re-verified, and the human has approved both the Phase 2 theory summary and the Phase 3 verification report:

```bash
git add wiki/
git add raw/<source-file-being-ingested.md>
git commit -m "ingest: <source title> — <summary>. Verification: [PASSED / N issues fixed]"
```

**Git rules:**
- ⚠️ **Never use `git add -A`.** It stages untracked raw/ files the user may have dropped in but hasn't asked you to ingest. Only stage `wiki/` plus the specific `raw/` file you ingested. If you ingested multiple sources in a batch, add each one explicitly.
- **Raw/ files are committed ONLY at ingest time.** Never commit a `raw/` file during meta/ changes, skill edits, or any other operation. The sole moment a `raw/` file enters git is when you commit the ingest that consumed it.
- Include verification status in the commit message for audit trail. If contradictions were flagged, mention them.

## Cleanup

After commit, no cleanup needed — verification reports exist only in the delegate responses, not on disk.

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
