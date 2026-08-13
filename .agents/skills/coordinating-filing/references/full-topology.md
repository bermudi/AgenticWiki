# Full worker topology adapter

This is the mandatory adapter for Pi and every harness not already known to be Freebuff/commandcode. Load it completely before source access. It specializes the common [coordinating-filing skill](../SKILL.md); the common invariants and canonical writer/verifier skills remain authoritative.

## 1. Native dispatch and tool call shapes

Use the harness's native shared-checkout write workers and isolated read-only review workers. In Pi, `delegate` takes one object whose top-level `tasks` value is an array of task objects.

Writer example:

```json
{
  "tasks": [
    {
      "action": "prompt",
      "agent": "",
      "prompt": "Load .agents/skills/filing-agentic-sources/SKILL.md. Preserve and file <locator> with FILING_DATE=<YYYY-MM-DD>. Create but do not stage raw artifacts; edit and stage only intended wiki paths; do not commit. Return the skill's required report.",
      "cwd": ".",
      "context": "fresh",
      "tools": ["*"]
    }
  ]
}
```

Reviewer example:

```json
{
  "tasks": [
    {
      "action": "prompt",
      "agent": "",
      "prompt": "Load .agents/skills/reviewing-wiki-diffs/SKILL.md and review the staged changeset. Return the required report only; do not edit files.",
      "cwd": ".",
      "context": "fresh",
      "tools": ["ro"]
    }
  ]
}
```

`agent: ""` requests an ad-hoc Pi worker; use a named profile only when the harness actually exposes it. `cwd: "."` is the authoritative checkout. Parallel reviews are separate task objects in the same array. Never quote the `tasks` array as JSON, move `action`/`context` to top level, or invent an agent name from a skill filename.

For `edit`, use a top-level path and an array of exact replacements:

```json
{
  "path": "path/to/file.md",
  "edits": [
    {"oldText": "exact unique current text", "newText": "replacement text"}
  ]
}
```

Do not stringify `edits`, pass a lone object instead of an array, overlap replacements, or broaden a failed match without re-reading the file.

## 2. Capability probe before content work

Before any writer dispatch, prove this harness can construct an isolated reviewer that reads the repository. Choose a long, nonblank, unpredictable line:

```bash
PROBE_PATH=meta/wiki-conventions.md
PROBE_LINE=$(grep -n '.\{40,\}' "$PROBE_PATH" | shuf -n1 | cut -d: -f1)
sed -n "${PROBE_LINE}p" "$PROBE_PATH"
```

Dispatch a fresh read-only worker:

> Return exactly two things and nothing else: (1) the verbatim text of line `$PROBE_LINE` of `$PROBE_PATH`; (2) your available tool names. Do not edit, stage, or commit. If you cannot read the file, say so rather than guessing.

- Matching text plus repository read/search and no write/stage/commit capability: proceed and record the probe.
- Context-derived/mismatching text, no repository tools, or unavailable construction: reviewer capability failure; do not retry it as transient. Enter [deferred verification](#4-deferred-verification-and-cross-harness-handoff).
- Write-capable reviewer: retry once requesting enforced read-only tools. If isolation cannot be enforced, its report is advisory only and reviewer dispatch remains unavailable.

A claimed harness limitation without an attempted native dispatch is not evidence. Consult [harness notes](harness-notes.md) for observed names and failure signatures, but native capability is established by this run.

## 3. Dispatch failure handling

Classify every failure and log attempts/errors:

- `429`, rate limit, or transport timeout: transient; retry the same task with bounded backoff such as 2s, 8s, 32s, maximum three attempts.
- Tool-schema validation: shape failure; correct the call and retry once.
- Missing named agent, absent required tools, context-derived probe answer, or inability to isolate: deterministic capability failure; stop immediately.
- Empty/no-op return: inspect task shape/filesystem scope and redispatch once; a second empty result stops the pipeline.

A writer capability failure hard-stops before coordinator source access; never perform that role inline. A reviewer capability failure uses deferred verification, never inline/manual review, generic code review, or validator-derived PASS.

## 4. Deferred verification and cross-harness handoff

`VERIFICATION DEFERRED` is an operational stop, not a verdict. It is available only when real content workers can do the work but required reviewers cannot.

1. Disclose the limitation **before writing**: the result will remain staged and uncommitted for another capable harness.
2. If the initial probe failed, dispatch the writer against the immutable original only. If it is too garbled for faithful prose, stop. If no writer is available, stop without source access or a handoff around coordinator-authored content.
3. Preserve, exactly stage, and mechanically check the complete boundary normally. Label generic checks `EXTRA — generic code review (not a wiki reviewer)`.
4. Mark required reviewer rows `UNAVAILABLE — <capability reason>`. Never commit or round deferred work to PASS.
5. Write `.filing-handoff/<source-slug>.md` (gitignored) and reproduce it in the final report.

If reviewer capability fails later, no correction layer exists to carry forward — AgenticWiki has no corrector role. Preserve the staged OIDs as-is for the next harness.

### Exact handoff template

```markdown
# Verification handoff — <source slug>

- Filing harness / model: <harness> <version> / <model or "not named in session">
- FILING_DATE: <YYYY-MM-DD>
- Reason deferred: <probe/dispatch result verbatim>
- Commit state: staged, not committed
- Session log: <path or "not exposed">

## Staged boundary
<`git diff --cached --name-only` output, verbatim>
<each path and staged blob OID from `git rev-parse ":<path>"`>

## Sources
- raw: <path>
- writer-retrieved companion sources: <paths, or "none">

## Mechanical checks already run
- filing-check staged: <verbatim summary/result>
- cached/worktree parity: <result>

## Dispatch failures and interventions
<attempts, classified failures, stalls, hard stops avoided, and human interventions>

## Reviews still required
- reviewing-wiki-theory: <required | not applicable — reason>
- reviewing-wiki-diffs: <required | not applicable — reason>
- verifying-source-fidelity: <page list>
- reviewing-wiki-quality: <page list | not applicable — reason>

## Open questions for the verifier
<numbered unresolved names, callouts, evidence-posture doubts, and writer questions>
```

The receiving harness loads `verifying-wiki-changes` in `staged-changeset` mode, checks every OID, and dispatches the missing reviews. OID drift makes the handoff stale. Deferred work never commits in the originating harness.

## 5. No correction step — AgenticWiki has no corrector role

AgenticWiki preserves the immutable original and files directly from it. There is no correcting-sources skill and no correction review row. Skip any correction dispatch.

Route from locator metadata:

- article, paper, primary/text-native document: file from the original;
- transcript/auto-caption: file from the original; if it is too garbled for faithful prose, the writer stops and reports the blocker (no separate correction pass).

Writers load [filing-agentic-sources](../../filing-agentic-sources/SKILL.md), preserve/verify the original first, use the captured `FILING_DATE`, and create raw artifacts with truthful provenance. They may alter only allowed original frontmatter, never the body.

## 6. Sequential shared-checkout writers

Dispatch one fresh writer per source in common source-class order. It loads [filing-agentic-sources](../../filing-agentic-sources/SKILL.md), receives the locator and captured `FILING_DATE`, stages only intended wiki paths, and does not stage raw or commit.

Immediately before and after each dispatch capture authoritative `git ls-files -s`. Compute that writer's changed index OIDs separately from the cumulative staged set. Inspect authoritative status/diffs after return; self-report is not evidence. Confirm:

- writer delta equals its reported exact intended paths;
- cumulative output is labeled cumulative, not claimed as this writer's delta;
- `wiki/index.md` is staged whenever pages were created/significantly updated;
- all created/verified raw, asset, companion, or retrieved-primary paths are reported for coordinator staging;
- writer-owned paths passed `filing-check paths --filing-date "$FILING_DATE" --path <path>` for each staged path;
- any blocker/media question is explicitly reported.

Record exact staging commands when telemetry exists. If unavailable, disclose that; a correct final set cannot prove which command produced it.

Writer-originated Tier-1 questions follow `verifying-wiki-changes`: coordinator runs the focused media tool, returns the structured result to the writer, exact-restages the resulting wiki/source annotation, and repeats fidelity review until closed.

## 7. Raw boundary and exact coordinator staging

After all writers, mechanically inspect each reported raw artifact for canonical path, truthful provenance, and allowed mutation. For pre-existing `raw/**`, inspect the staged diff and block any body hunk; only permitted frontmatter changes may proceed. Do not read source bodies for content.

Explicitly `git add --` each:

- newly preserved original and `raw/assets/` companion;
- writer-retrieved durable source;
- permitted authoritative raw-frontmatter correction;
- coordinator-owned `meta/tech-debt.md` / `meta/pipeline-recommendations.md` change.

The complete staged boundary must equal cumulative writer wiki paths plus all coordinator raw/process paths. Run `./scripts/filing-check staged --filing-date "$FILING_DATE"` before verification. Missing/unstaged raw paths block dispatch.

## 8. Verification, fixes, and commit

Load [verifying-wiki-changes](../../verifying-wiki-changes/SKILL.md) inline; do not spawn a nested verifier. Supply its full staged-mode contract. The coordinator classifies risk and dispatches each required named reviewer as a fresh isolated read-only worker. Reviewer judgment never occurs inline.

Use the verifier's canonical reviewer rows — theory, diff, source-fidelity, quality — plus media-question routing, verdict translation, debt holds, and report. A generic code reviewer is extra only. If a required reviewer becomes unavailable, enter deferred verification.

Route fixes to the owning writer. After each fix, inspect authoritative changes, exact-restage, run `filing-check paths --filing-date "$FILING_DATE" --path <repaired-paths>`, and redispatch every semantically affected reviewer over the full error-pattern footprint. No validator-only closure.

Reviewer report reuse is limited to the verifier's same-run ledger-only aggregation rerun after proving every reviewed wiki/raw OID unchanged.

Stage debt and recommendation evidence (AG-xxx rows) before final approval. Then rerun `filing-check staged --filing-date "$FILING_DATE"`. Commit the exact staged set only on `PASS` or `PASS WITH EXPLICIT DEBT`, when authorized and all rows/loops/questions are closed. Never commit `VERIFICATION DEFERRED` or a deferred/open finding. Reconcile `git show --stat --oneline HEAD` with the final report.
