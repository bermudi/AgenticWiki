---
name: coordinating-filing
description: "Coordinates AgenticWiki filing through either shared-checkout workers plus isolated reviewers or Freebuff's fresh-session baton state machine, then holds the applicable theory and commit gates."
---

# Coordinating Filing

You coordinate the AgenticWiki filing pipeline. Your job: choose the supported harness adapter, preserve role separation, produce an exact staged boundary, run the theory and verification gates, and hold the commit gate. You own the process. You do not own the content.

## Input Contract

Before you run:

- One or more source documents, URLs, transcripts, media items, or explicit scope/commit instructions from the user.
- The conventions path `meta/wiki-conventions.md` is available.
- The worker skill `filing-agentic-sources` is available under `.agents/skills/`.
- The reviewer skill `reviewing-wiki-theory` is available under `.agents/skills/`.
- The coordinator skill `verifying-wiki-changes` is available under `.agents/skills/`.

## Output

- Preserved and staged raw source(s) in `raw/`.
- A staged wiki changeset.
- A committed changeset (when authorized and verification passes).
- A concise report to the user.

## You are a coordinator, not an editor

You do not read source bodies for content or wiki page bodies as coordinator. The narrow exception is staged-diff inspection while running `verifying-wiki-changes` inline for mechanical checks, risk classification, and reviewer construction. You do not write wiki prose as coordinator. Page set, framing, callout placement, and scope decisions belong to the writer.

In a capable harness, you dispatch workers that do editorial work and check that the process was followed. Freebuff uses the explicit cross-session baton adapter below instead of unavailable subagents. Do not invent a third topology or use baton mode merely to avoid workers a harness can construct.

## Worker topology and process ledger

Read `meta/pipeline-recommendations.md` before starting. The coordinator owns updates to this durable process queue: report tested rows and close one only after recording the required dated run evidence.

The pipeline has exactly two adapters:

- **Full worker topology:** a writer is a write-capable worker attached to the coordinator's authoritative checkout. Reviewers are fresh isolated read-only workers. `verifying-wiki-changes` runs inline as orchestration and dispatches those reviewers. If a required worker cannot be constructed, stop; do not collapse roles inline.
- **Freebuff baton topology:** one bounded top-level session preserves, writes, and stages but cannot review or commit. A never-before-used session reviews the complete staged tree. If that pass stages any fix, another fresh session must review again. Only a zero-delta pass with complete theory, diff, source-fidelity, and quality rows may commit through `scripts/filing-baton`.

Reviewer edits or “fixed” self-reports are never authoritative. Full topology routes accepted edits to the active writer; baton mode permits a review pass to switch explicitly into fixer role, but that forfeits approval and forces another fresh pass.

## Pi tool-schema adapter

The following examples apply only when the current harness is Pi and exposes these tool schemas. They are adapter instructions, not universal workflow semantics; other harnesses must preserve the topology and permissions above using their native tools.

### Pi `delegate` sanity check

Pass Pi's tool an object whose top-level `tasks` value is an array of task objects. A writer dispatch uses the authoritative repository as `cwd` and grants write tools:

```json
{
  "tasks": [
    {
      "action": "prompt",
      "agent": "",
      "prompt": "Load .agents/skills/filing-agentic-sources/SKILL.md. Preserve and file <source URL or path> using meta/wiki-conventions.md. Create but do not stage the raw artifact; edit and stage only the intended wiki paths; do not commit. Return the required writer report.",
      "cwd": ".",
      "context": "fresh",
      "tools": ["*"]
    }
  ]
}
```

A fresh read-only reviewer dispatch has this shape:

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

`agent: ""` requests an ad-hoc worker; replace it only with a profile that the harness actually exposes. `cwd: "."` is this authoritative repository. `tools: ["*"]` is required for the writer; `tools: ["ro"]` is required for reviewers. For parallel reviews, add more task **objects** to the same `tasks` array. Do not pass `tasks` as a quoted JSON string, put `action: "prompt"` or `context` at the top level, or use a skill filename as an invented agent name. A schema-validation failure is a dispatch failure: correct the shape and retry once, then stop and warn if dispatch still cannot be constructed. Never replace a failed worker dispatch with inline work.

### Pi `edit` sanity check

Pass Pi's tool an object with a target `path` and an `edits` array. Each edit is an object with exact, unique `oldText` and `newText` strings:

```json
{
  "path": ".agents/skills/coordinating-filing/SKILL.md",
  "edits": [
    {
      "oldText": "the exact unique block currently in the file",
      "newText": "the replacement block"
    }
  ]
}
```

Do not pass `edits` as a JSON string, do not use a single edit object where an array is required, and do not overlap replacements. Re-read the target when a match fails; never broaden an edit blindly.

## Workflow

### 1. Inspect state and receive sources

1. Capture `FILING_DATE=$(date +%F)`, then run `git status` and `git diff --cached --name-only`. A filing requires an empty staged index so `commit the staged set` cannot absorb earlier work. If any path is already staged, report the exact baseline and stop for the human to commit/unstage it; do not unstage or incorporate it yourself. Leave unrelated **unstaged** worktree changes untouched.
2. Identify every source the user wants ingested.
3. For multiple sources, order them by a simple heuristic if the source type is clear from metadata or user intent: primary sources (arXiv papers, original blog posts, conference talks) before commentary or aggregation. If ordering is unclear, use the order supplied. For a single source, skip ordering.
4. Detect the harness. A known Freebuff session goes directly to Step 1b. Other harnesses use full topology and the worker steps below.

### 1b. Freebuff baton mode

Freebuff uses fresh top-level sessions as the role-separation seam. `.filing-handoff/<source-slug>.json` binds each pass to exact staged modes/blob OIDs, the complete index tree, base HEAD, and branch. It handles one source locator per transaction, and only one unfinished transaction may own the repository index. Multi-source requests become ordered, separate transactions. Because reviewer skills read ordinary files, baton mode requires `wiki/` and `raw/` to contain no unstaged, untracked, or ignored files outside the staged transaction; otherwise validation could depend on bytes absent from the approved tree, so the script stops before writing/approval.

**Write pass (session A):** before fetching or reading the source, require an empty staged index and run:

```bash
./scripts/filing-baton start-write \
  --source <source-slug> \
  --locator <URL-or-path> \
  --filing-date "$FILING_DATE" \
  --session .freebuff/<actual-session-log>
```

Load `filing-agentic-sources` and perform its preservation, triage, and writing work in this bounded session. In baton mode the pass stages the complete intended boundary itself, including new raw artifacts and any process/debt files; it still must use exact `git add -- <paths>`, never `git add -A`. It may run deterministic checks but must not run semantic reviewer skills, issue a verdict, or commit. Finish with every exact staged path:

```bash
./scripts/filing-baton finish-write \
  --source <source-slug> \
  --session <same-write-session> \
  --path <exact-staged-path-1> \
  --path <exact-staged-path-2> \
  --note '<classification and write summary>'
```

For a `skip` whose locator is an unchanged raw artifact already tracked at baton start, finish with `finish-write --no-change --note '<skip reason>'`; the script records terminal `no_change` with no review or commit. A newly preserved archive-only source is not no-change: stage and review it as a raw-only transaction. Otherwise stop and tell the human to open a genuinely new Freebuff session using the prompt in `USER-MANUAL.md`.

**Review/fix pass (fresh session B, C, ...):** start before making edits:

```bash
./scripts/filing-baton start-review \
  --source <source-slug> \
  --session .freebuff/<new-session-log>
```

Start with deterministic checks, then run `reviewing-wiki-theory` first. If theory requires an edit, record its verdict, switch to fixer role, stage the repair, finish as `changed`, and defer the other judgments to the next fresh pass rather than reviewing an obsolete tree. If theory passes or is validly skipped, continue with `reviewing-wiki-diffs`, `verifying-source-fidelity`, and `reviewing-wiki-quality` under their normal risk/skip rules. Reviewer skills remain report-only while making judgments. Baton cannot deny the top-level session's write tools, so separation is temporal: complete judgments before explicitly switching to fixer role. Any final staged index/tree delta forfeits approval. A theory `PASS WITH WARNINGS` maps to `PASS` only when every warning was resolved or is purely advisory; an accepted unresolved limitation maps to `PASS WITH EXPLICIT DEBT: <representation>`, while a required edit maps to `changed` and an unresolved structural decision maps to `blocked`.

- With fixes staged: `finish-review --result changed --note '<findings and fixes>'`, then stop for another fresh session.
- With a blocker: `finish-review --result blocked --note '<blocker>'`.
- With zero delta: run `finish-review --result clean` with all four exact mapped rows and a non-empty evidence note. Row values must be `PASS`, `PASS WITH EXPLICIT DEBT: <where represented>`, or `SKIPPED: <risk-rule reason>`; `CARRIED`, prefixes such as `PASSING`, and missing rows are rejected.

```bash
./scripts/filing-baton finish-review \
  --source <source-slug> \
  --session <current-fresh-session> \
  --result clean \
  --review 'theory=PASS' \
  --review 'diff=PASS' \
  --review 'source-fidelity=PASS' \
  --review 'quality=PASS' \
  --note '<verbatim reviewer verdicts and material findings>'

./scripts/filing-baton commit \
  --source <source-slug> \
  --session <same-zero-delta-review-session> \
  --message '<commit message>'
```

The commit command rechecks the complete approved tree and atomically advances the recorded branch with `commit-tree`/`update-ref`. It deliberately bypasses normal commit hooks so hooks cannot add unreviewed paths; all required checks must run before approval. The approving log must still be the newest non-empty Freebuff log.

Interrupted write passes recover with `restart-write`; interrupted, blocked, or approved review states recover with `restart-review`, which voids prior approval. It preserves the recorded boundary even when that boundary has mechanical failures so the fresh pass can fix them, but refuses unrecorded staged drift. Run restart before editing. If recovery should be abandoned, a fresh session runs `abort --source <slug> --session <new-log> --reason '<reason>'`; it resets the baton-owned index to current HEAD while preserving worktree files and marks the handoff terminal; separate the preserved `wiki/`/`raw/` drafts before starting another transaction. `reconcile-commit` handles only an exact approved single-parent commit whose handoff save failed. Every command holds a repository-local transition lock. The session path/inode/mtime checks are a practical freshness signal, not a security boundary against deliberate log or handoff tampering.

Freebuff follows this section through commit and does not execute the full-topology dispatch steps below.

### 2. Prepare source locators (metadata only; full topology)

For each source, record only the URL or local path supplied by the user and any explicit scope. Do not fetch, extract, open, or read the source body. Do not verify an existing raw artifact's body. Raw creation and content-aware provenance checks belong to the dispatched writer in Step 3; the coordinator checks the reported artifact and stages it later without reading its body.

### 3. Dispatch writers (sequential)

Writers run sequentially, one per source, in the order from step 1. Each writer is a fresh write-capable worker sharing the coordinator's authoritative checkout and loading `filing-agentic-sources`. Dispatch one writer per source. Do not use isolated worktrees, patch-only workers, or any worker whose edits do not land in this checkout. You do not write wiki prose yourself.

**Dispatch gate:** successfully construct the first qualifying writer before any source fetch, extraction, body inspection, provenance judgment, triage, page selection, or wiki editing. Only source-locator metadata may be handled first. A claimed worker limitation without a harness dispatch attempt is not evidence of unavailability. In Pi, use the write-capable `delegate` call shown above. If the call fails, correct a schema error and retry once; if no qualifying writer can be constructed, stop and report the failure. Do not continue inline or hand source inspection to a non-qualifying helper.

Dispatch each writer with:

- the source locator supplied by the user: URL, local path, or existing `raw/` path;
- the instruction: "file this source into the wiki";
- the conventions path: `meta/wiki-conventions.md`;
- `FILING_DATE=$FILING_DATE`, which the writer uses for changed-page `updated` and new-source saved/ingested metadata;
- any explicit scope from the user (e.g., "triage-and-file", "full", "marginal").

The writer creates or verifies the raw artifact, reads the source and wiki state, decides the page set, writes prose, and stages only wiki changes. The writer returns the raw path and a structured report. The coordinator later checks raw provenance/immutability mechanically and stages the reported new artifact.

Immediately before each writer dispatch, capture the index path/blob snapshot (`git ls-files -s`). Capture it again after the writer returns. The paths whose index blob OIDs changed are that writer's contribution; this remains correct when a later writer modifies a page already staged by an earlier writer. Keep the cumulative staged boundary separate from this per-writer delta.

You check:

- the before/after index-blob delta matches the writer's exact intended-path report, while `git diff --cached --name-only` remains the explicitly labeled cumulative boundary;
- `wiki/index.md` is staged if any page was created or updated;
- the writer report includes each exact staging command, or the explicit marker `command telemetry unavailable`. Treat this as worker self-report and record independently exposed harness command telemetry separately. Only independently exposed command telemetry—not self-report or the final staged set—can establish whether `git add -A` was invoked or close AG-008. If telemetry is unavailable, report that fact; never infer “no `git add -A`” from staged-state parity alone.

### 4. Triage gate (human, non-routine)

The writer classifies the source as `full`, `marginal`, or `skip`.

- **Skip:** no wiki changes. Treat it as a raw-only archive transaction: stage the new raw artifact in Step 5, run raw mechanical validation and full-boundary checks, skip theory/diff/source-fidelity/quality with concrete `raw-only, no wiki claim` reasons, obtain the normal verifier verdict, and commit unless the user requested stop-before-commit. An existing raw source produces no change and needs no commit.
- **Marginal:** the writer reports the proposed target pages and scope, but does not edit yet. Present the triage to the human. If approved, dispatch the writer again with `scope: marginal` to apply the changes. If the human upgrades to `full`, dispatch with `scope: full`.
- **Full:** the writer has staged a full changeset. Proceed to the mechanical pre-check.

You escalate only when the writer reports a borderline or marginal source. Clear full ingests do not stop for triage.

### 5. Stage raw artifacts

After all writers complete and before the mechanical pre-check, stage every new/modified raw artifact so the staged set, the verifier's review scope, and the commit's contents all agree. The verifier's boundary is the staged set — anything not staged will not be reviewed and will not be committed, even if wiki pages cite it by path.

Stage each of the following with explicit paths (`git add -- <path>`). Never `git add -A`. Never absorb unrelated worktree changes.

1. **Newly preserved raw sources** reported by writers — each `raw/<slug>.md` and any `raw/assets/` companions.
2. **arXiv extractions produced by the writer** — the writer extracts to `raw/<arxiv-id>.md` per their Step 1 and reports the path; `git add` it now. The PDF is never committed.
3. **Non-arXiv PDFs with no stable URL** — if the PDF is the durable raw copy per Step 2, `git add` it.
4. **Writer-discovered raw sources** — any additional sources a writer retrieved, preserved under the conventions, and reported back. Check that each path is new and provenance is present, then `git add` it. The writer creates raw artifacts but does not stage them.
5. **Companion media** — any images, audio, or screenshots in `raw/assets/` referenced by a raw source.
6. **Coordinator-owned process artifacts** — if this run adds or updates observed evidence in `meta/pipeline-recommendations.md` (or registers filing debt in `meta/tech-debt.md`), update it before verification and stage that exact path with `git add -- <path>`. Process artifacts are part of the reviewed commit boundary, not post-verdict appendages.

Report the raw staged set (`git diff --cached --name-only` filtered to `raw/`) alongside the cumulative wiki staged set and any coordinator-owned process artifacts. The staging boundary is now the union: cumulative writer-staged wiki paths ∪ coordinator-staged raw paths ∪ coordinator-staged process artifacts. The staging-boundary process check compares against this union, not against one writer's cumulative report. Record each exact coordinator `git add -- <path>` command and each writer staging command exposed by the harness.

### 6. Mechanical pre-check

After any writer completes, including a raw-only skip, rebuild the complete staged path list, run `./scripts/validate-page` on its supported changed wiki/raw content paths, run `git diff --cached --check -- <all-changed-paths>`, and require `test -z "$(git diff --name-only -- <all-changed-paths>)"`. Do not pass coordinator-owned `meta/` process artifacts to the content validator; they remain in the full cached whitespace/parity boundary. The parity check proves reviewers will read the same bytes that are staged; run it again immediately before commit.

- If `validate-page` returns errors: route the specific errors back to the writer. The writer fixes them and re-reports. You do not fix them yourself — even mechanical fixes are edits to wiki pages, and editing wiki pages is writer work. Re-run `validate-page` after the writer reports fixes.
- If `validate-page` returns clean: proceed.

After the pre-check is clean, proceed to theory as required and then verification. A marginal label never bypasses verification or the commit-gate verdict.

### 7. Theory gate

For full ingests, construct a fresh isolated worker and load `reviewing-wiki-theory`. A marginal ingest may skip theory with a recorded scope-based justification. A raw-only skip records `skipped — raw-only archive; no wiki theory changed`. Neither skip bypasses changeset verification.

Give it:

- every changed wiki page path;
- the raw source path(s) being ingested;
- the changeset scope.

The worker re-reads all `wiki/threads/*.md` and related concept pages, classifies theory pressure, and returns a theory summary plus a verdict (`PASS` / `PASS WITH WARNINGS` / `FAIL`).

Record the theory summary for the final report. The coordinator and writer own routine theory follow-through; do not ask the human to perform a second quality evaluation.

- **PASS:** proceed to verification. If the theory report contains a non-blocking suggestion that would add a meaningful cross-link or strengthen a thread connection, route it to the writer before verification. The writer applies or declines it and reports which; after an applied edit, rerun the mechanical pre-check and rerun theory if the theory picture materially changed. Cosmetic or low-value suggestions may be skipped with that reason recorded.
- **PASS WITH WARNINGS:** when the pressure is local or thread-level and the corrective action fits existing structure, route callouts, tension updates, or thread edits to the writer. Re-run the mechanical pre-check and every affected review. Escalate only when the warning requires a structural human decision such as creating, merging, splitting, retiring, or fundamentally reframing a thread.
- **FAIL:** route a concrete local/thread-level repair to the writer when it can be resolved inside approved structure, then rerun theory. Stop and ask the human only for a genuinely structural decision or an unresolved critical conflict. Do not commit around either.

### 8. Verify the completed changeset

After the theory gate is clean or validly skipped and all writer edits are staged, load and run `verifying-wiki-changes` **inline in the coordinator process**. Do not dispatch a verifier worker; that would create an unnecessary nested-dispatch dependency.

Give the inline verifier:

- every changed wiki page (including `wiki/index.md` if relevant);
- every new or changed raw source;
- whether external research is permitted;
- the changeset scope;
- every coordinator-owned staged process artifact, or `none`.

The inline verifier may inspect staged diffs only to run mechanical checks, classify actual change risk, and assemble reviewer inputs. It must not perform source-fidelity, diff-integrity, or quality judgment itself. It dispatches each required review to a fresh isolated read-only worker and returns a changeset verdict. Review requirements follow actual risk, not the writer's `full`/`marginal` label. If required reviewer dispatch is unavailable, stop and warn; do not issue a PASS.

### Reviewer-dispatch checklist

Copy this four-row checklist into the final verdict report. Every status must be either `dispatched ✓` or `skipped — <specific rule-based justification>`; “reviewed inline,” “covered manually,” and bare “not needed” are not valid statuses.

| Review | Status | Worker/report or skip justification |
|---|---|---|
| Theory | `dispatched ✓` / `skipped — ...` | `reviewing-wiki-theory` report or documented marginal/mechanical scope justification |
| Diff | `dispatched ✓` / `skipped — ...` | `reviewing-wiki-diffs` report or documented transition-risk classification |
| Source-fidelity | `dispatched ✓` / `skipped — ...` | `verifying-source-fidelity` report(s) or documented mechanical/non-claim classification |
| Quality | `dispatched ✓` / `skipped — ...` | `reviewing-wiki-quality` report or documented narrow-additive/structure-preserving classification |

### Verify the verifier

When a delegated reviewer reports a **mechanical** failure — for example, missing frontmatter, a broken link, or a validator error — independently run the deterministic check before diagnosing the cause:

```bash
./scripts/validate-page <path>
```

Use the exact affected path(s), and inspect the current checkout/staged boundary rather than trusting the report's description. If `validate-page` is clean, classify the reviewer report as inconsistent and re-dispatch the affected reviewer with the command output; do not invent a validator bug or record debt from the report alone. If the deterministic check reproduces the failure, route the actual fix to the owner and rerun the check after the fix. A reviewer report is a pointer to a check, not the check itself.

### 9. Commit gate

You hold the commit gate. The writer does not commit. The verdict comes from `verifying-wiki-changes`, not from `validate-page`.

- **DEBT REGISTRATION REQUIRED** (internal hold, not a final verdict): apply the representation matrix in AGENTS.md Rule 9. Route a reader-facing page callout to the writer; add `meta/tech-debt.md` for structural, recurring, artifact-level, or out-of-scope content debt; use `meta/pipeline-recommendations.md` for workflow/process recommendations; use both page and ledger when both conditions apply. Stage the exact representation and rebuild the boundary. A page/content edit requires deterministic checks and every affected reviewer to rerun. A ledger-only addition may reuse same-run reviewer reports only after proving all reviewed content OIDs identical; never use ledger-only reuse after changed content.
- **PROCESS EVIDENCE STAGING REQUIRED** (internal hold, not a final verdict): if this run tested a pipeline recommendation and reviewer/dispatch evidence arose only during verification, update and stage `meta/pipeline-recommendations.md`, then perform the same boundary/check/OID-identical aggregation rerun. Never append same-run evidence after the final verdict.
- **PASS:** rerun full-boundary cached/worktree parity, then commit the staged set. Do not re-stage or absorb new worktree changes.
- **PASS WITH EXPLICIT DEBT:** permitted only after every accepted unresolved gap has the Rule 9 representation required for its type inside the verified staged boundary. Confirm the page callout and/or correct ledger entry, rerun parity, then commit.
- **FAIL:** route the specific findings to the writer. The writer applies fixes and re-reports. Re-run `validate-page` on the fixed paths, then re-run only the affected verification checks. Do not commit until the rerun returns `PASS` or `PASS WITH EXPLICIT DEBT`.
- **FAIL on a CRITICAL that cannot be resolved without a human decision:** stop and escalate. Do not commit around it.

### Debt-registration discipline

Before adding a row to `meta/tech-debt.md`, verify all three conditions against the current checkout and the conventions:

1. **Real:** the issue actually exists; do not copy a reviewer's claim without checking it.
2. **Not trivially fixable:** one-line mechanical fixes get routed to the writer and fixed, not deferred as debt.
3. **Not self-contradicted:** the proposed row is not disproved by the agent's own current observations or a nearby convention/example.

Record a debt row only after those checks pass, and state which condition makes the item a genuine deferral. If a row fails any check, fix or discard it instead of polluting the debt registry.

A request to “file,” “ingest,” or “process” authorizes commit after the applicable topology returns `PASS` or `PASS WITH EXPLICIT DEBT`; “stop before commit” overrides it. Full topology requires every applicable isolated review. Freebuff requires `filing-baton finish-review --result clean` to accept all four rows with zero delta and commits only through the script in that same approving pass. In both topologies, prove exact parity-clean boundaries, mechanical checks, closed fix loops, no unresolved CRITICAL or external question, and honest debt representation before commit.

### 10. Report

Report to the user:

- sources preserved;
- writers run (count, order, any blockers);
- pages created and updated;
- material claims and attributed frames added;
- contradictions and unresolved evidence gaps;
- theory pressure and any theory-gate escalation, including meaningful non-blocking suggestions routed to the writer and their disposition;
- verification performed and its verdict (including the reviewer verdict ledger from `verifying-wiki-changes`);
- the four-row reviewer-dispatch checklist, with every skipped review justified;
- process telemetry: each dispatched worker/task, granted capabilities (`*` for writers and `ro` for reviewers), dispatch result, retry/empty-result events, and every exact staging command exposed by the harness; if staging commands were not exposed, say so rather than inferring their history from the staged set;
- any debt-registration checks performed before adding `meta/tech-debt.md` rows;
- whether changes were committed.

**Freebuff final-summary contract:** every Freebuff turn must end by running `./scripts/filing-baton handoff --source <source-slug>` and appending its complete output **verbatim as the final block of the response**. Before that block, summarize source/classification, pages and raw artifacts, findings and fixes, mechanical results, every reviewer verdict/status, staged-path count, unrelated files left untouched, baton state, and commit status. The generated block carries the authoritative handoff path, state, boundary/OIDs/tree, history, review ledger, and exact next action. The human can paste the whole response into a new Freebuff session with nothing added; the next agent must follow the block rather than asking the human to reconstruct the slug, session path, commands, or prior work.

A missing baton review ledger is verification **incomplete**, not `PASS WITH EXPLICIT PROCESS DEBT`. Process noncompliance cannot be rounded into any PASS vocabulary. If the state is nonterminal, emit the handoff block and stop; if it is `committed`, `no_change`, or `aborted`, emit the terminal handoff block for a complete final record.

## Process checks

| Check | How |
|---|---|
| Session staging isolation | Staged index is empty before filing; any pre-existing cached path stops the run rather than entering this filing's commit |
| Staging boundary | `git diff --cached --name-only` = cumulative writer-staged wiki paths ∪ coordinator-staged raw paths ∪ coordinator-owned staged process artifacts; per-writer contributions come from before/after index blob OIDs |
| Raw artifacts staged | All new raw files (preserved sources, arXiv extractions, writer-discovered sources, companion assets) are staged; any modification to a pre-existing raw path blocks |
| Existing raw immutability | For pre-existing `raw/**`, inspect the staged diff and confirm the file is unchanged; AgenticWiki permits creating raw artifacts but not modifying existing raw files. Any staged diff in an existing raw file blocks the gate. |
| Explicit-path staging | Record exact staging commands when exposed and reject any observed `git add -A`; staged-state parity alone cannot prove command history |
| `index.md` updated | In staged set if pages changed |
| Mechanical pre-check | `validate-page`, cached whitespace check, and full-boundary cached/worktree parity before theory/verification; errors routed to writer |
| Theory gate before verification | Full topology dispatches theory first; a fresh baton pass also judges theory first and fixes/stops before judging an obsolete tree; valid skips are explicit |
| Verification on stable changeset | Full topology runs inline orchestration plus isolated reviewers; Freebuff runs all named methods in one fresh zero-delta approving pass |
| No commit on FAIL | Commit gate logic above; verdict from verifier |
| Raw preservation | Sources slugified; arXiv PDFs extracted, not committed; raw artifacts staged per Step 5 |
| Review independence | Full topology gives each required review a read-only worker; Freebuff requires a fresh pass that did not stage the reviewed OIDs |
| Delegated fix propagation | Worker self-reports are not evidence; accepted fixes are present in the coordinator checkout, inspected, and re-verified |
| Pi adapter schemas | When using Pi, tool calls use the worked object/array shapes in § Pi tool-schema adapter; other harnesses use native equivalents |
| Recommendation ledger | Coordinator reports tested IDs and closes rows only with a date plus commit/session/run identifier |
| Reviewer-dispatch checklist | Final report contains theory/diff/source-fidelity/quality rows, each dispatched or skipped with a rule-based justification |
| Process telemetry | Final report records writer and reviewer task/worker identity when exposed, granted capability, dispatch result, and retries/empty returns |
| Verify the verifier | Mechanical reviewer failures are checked with `./scripts/validate-page <path>` before diagnosis or debt registration |
| Debt-registration discipline | New debt rows pass the real/not-trivial/not-self-contradicted checks; fixable one-line issues are not deferred |
| Content-role separation | Full topology constructs a qualifying shared-checkout writer before source access; Freebuff starts a bounded write pass that cannot review or commit |
| Theory suggestions routed | Meaningful non-blocking theory suggestions are routed to the writer before verification and their disposition is reported |

## What you do not do

- Do not read source or wiki page bodies for coordination work, except staged hunks needed for inline verifier mechanics/risk classification.
- Do not write wiki prose as coordinator.
- Do not edit wiki pages — not for editorial reasons, not for mechanical fixes, and not even to repair `wiki/index.md`. Route every wiki edit back to the writer.
- Do not make editorial judgments — page set, framing, evidence posture, and scope decisions belong to the writer.
- Do not make scope decisions (the writer owns page-set selection).
- Do not perform reviewer judgment yourself. Running `verifying-wiki-changes` inline permits only staged-diff inspection for mechanical checks, risk classification, reviewer construction, and verdict translation.
- Do not treat a clean `validate-page` run as a PASS verdict. The commit-gate verdict comes from `verifying-wiki-changes`.
- Do not commit without a `PASS` or `PASS WITH EXPLICIT DEBT` verdict from `verifying-wiki-changes`.
- Outside explicit Freebuff baton mode, do not perform worker roles inline. Inside baton mode, the write pass cannot review/commit and a review/fix pass that stages any delta cannot approve.

## Human decisions

Stop and ask only when:

- a writer reports a blocker requiring a human decision (gated source, schema change, merge, delete);
- in full topology, no shared-checkout writer can be spawned after the required dispatch attempt;
- in full topology, a required theory or verification reviewer cannot be dispatched in isolation;
- in Freebuff, baton state cannot be safely restarted, fixed, approved, or aborted;
- theory review requires a genuinely structural decision (new/merged/split/retired thread or fundamental reframe) or leaves an unresolved critical conflict;
- a CRITICAL verification finding cannot be resolved without a human decision;
- the user explicitly instructed the coordinator to stop before commit.

## Pipeline architecture

| Role | Skill | Owns |
|---|---|---|
| Coordinator | `coordinating-filing` (this skill) | Full topology: source ordering, dispatch, raw staging, theory/verification orchestration, commit gate; Freebuff: baton protocol |
| Writer | `filing-agentic-sources` | Full topology worker or bounded Freebuff write pass: preserve/read source, decide page set, write prose, stage permitted paths |
| Theory reviewer | `reviewing-wiki-theory` | Whole-wiki theory coherence — isolated in full topology, report-only phase in a fresh baton pass |
| Changeset verifier | `verifying-wiki-changes` | Full topology inline orchestration; Freebuff fresh-pass reviewer mapping and verdict translation |
| Diff reviewer | `reviewing-wiki-diffs` | Transition integrity of a changeset's diff — report-only |
| Source-fidelity reviewer | `verifying-source-fidelity` | One page against every raw source it lists — report-only |
| Quality reviewer | `reviewing-wiki-quality` | Structure, clarity, context, navigation, thread quality — report-only |
| Research tool | `researching-wiki-claims` | Focused external research; returns evidence + recommendation, not a verdict |
