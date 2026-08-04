---
name: coordinating-filing
description: "Coordinates the AgenticWiki filing pipeline: preserves sources, dispatches writers, holds the theory gate and the commit gate. Use when ingesting one or more sources, when process supervision is required, or when the filing pipeline needs to be run."
---

# Coordinating Filing

You coordinate the AgenticWiki filing pipeline. Your job: preserve raw sources, dispatch writers sequentially, stage all raw artifacts, run the theory gate, verify the completed changeset, and hold the commit gate. You own the process. You do not own the content.

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

You do not read source bodies for content or wiki page bodies as coordinator. The narrow exception is staged-diff inspection while running `verifying-wiki-changes` inline for mechanical checks, risk classification, and reviewer construction. You do not write wiki prose as coordinator; the only writing exception is the documented writer-dispatch fallback in §3. Reviewer roles never have an inline fallback. Page set, framing, callout placement, and scope decisions belong to the writer.

You dispatch workers that do editorial work, and you check that the process was followed. If you are unable to construct a required reviewer or other non-writer worker, stop and warn the user. Do not silently fall back to doing editorial work yourself.

## Worker topology and process ledger

Read `meta/pipeline-recommendations.md` before starting. The coordinator owns updates to this durable process queue: report tested rows and close one only after recording the required dated run evidence.

Writers and reviewers use different topologies:

- A writer is a write-capable worker attached to the coordinator's **authoritative checkout**. Its edits and staging land directly in that checkout. Never dispatch writer work to an isolated or otherwise non-authoritative filesystem. If no shared-checkout writer is available, use the disclosed inline fallback in §3.
- A reviewer is a fresh isolated, read-only worker. Reviewer edits or “fixed” self-reports are never authoritative; reviewers return reports and, when useful, proposed replacements or diffs. Route accepted wiki edits to the active writer, then inspect the authoritative diff/staging, rerun deterministic checks, and re-dispatch affected reviewers.
- `verifying-wiki-changes` is process orchestration run **inline by this coordinator**, not a delegated verifier worker. It dispatches the isolated reviewers.

## Pi tool-schema adapter

The following examples apply only when the current harness is Pi and exposes these tool schemas. They are adapter instructions, not universal workflow semantics; other harnesses must preserve the topology and permissions above using their native tools.

### Pi `delegate` sanity check

Pass Pi's tool an object whose top-level `tasks` value is an array of task objects. A fresh read-only reviewer dispatch has this shape:

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

`agent: ""` requests an ad-hoc worker; replace it only with a profile that the harness actually exposes. `cwd: "."` is this repository. For parallel reviews, add more task **objects** to the same `tasks` array. Do not pass `tasks` as a quoted JSON string, put `action: "prompt"` or `context` at the top level, or use a skill filename as an invented agent name. A schema-validation failure is a dispatch failure: correct the shape and retry once, then stop and warn if dispatch still cannot be constructed. Never replace the reviewer with inline review.

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

1. Run `git status` and `git diff --cached --name-only`. A filing requires an empty staged index so `commit the staged set` cannot absorb earlier work. If any path is already staged, report the exact baseline and stop for the human to commit/unstage it; do not unstage or incorporate it yourself. Leave unrelated **unstaged** worktree changes untouched.
2. Identify every source the user wants ingested.
3. For multiple sources, order them by a simple heuristic if the source type is clear from metadata or user intent: primary sources (arXiv papers, original blog posts, conference talks) before commentary or aggregation. If ordering is unclear, dispatch in the order supplied. For a single source, skip ordering.

### 2. Preserve raw sources

For each source, create or verify the `raw/` artifact:

- If the source is a URL, fetch the content and save it to `raw/` following `meta/wiki-conventions.md` (web source format, YouTube transcript format, or arXiv extraction format).
- If the source is a local file in `~/Downloads` or elsewhere, slugify the filename and move it to `raw/`.
- If the source is already in `raw/`, verify provenance frontmatter is present.
- **Slugify filenames** per `meta/wiki-conventions.md`: lowercase, hyphen-separated, no spaces, no apostrophes, no title case. The `~/Downloads/` filename or URL tail is not acceptable.
- For arXiv papers, do not commit the PDF. The `raw/` artifact is the extracted text as markdown plus provenance frontmatter. See `meta/wiki-conventions.md` → "arXiv / Paper Source Format".
- For non-arXiv papers with no stable URL, the PDF itself may be the durable copy — commit it per `meta/wiki-conventions.md`.
- Companion media (images, audio, screenshots) go in `raw/assets/` with slugified names.

You preserve the raw artifact. If preservation requires content judgment (e.g., "did the extraction include the key paragraphs?"), dispatch a writer to inspect. You do not make that judgment yourself.

### 3. Dispatch writers (sequential)

Writers run sequentially, one per source, in the order from step 1. Each writer is a fresh write-capable worker sharing the coordinator's authoritative checkout and loading `filing-agentic-sources`. Dispatch one writer per source. Do not use isolated worktrees, patch-only workers, or any worker whose edits do not land in this checkout. You do not write wiki prose yourself except through the fallback below.

Dispatch each writer with:

- the source path (the `raw/` markdown artifact; or a PDF path for arXiv/non-arXiv papers that the writer must extract/read);
- the instruction: "file this source into the wiki";
- the conventions path: `meta/wiki-conventions.md`;
- any explicit scope from the user (e.g., "triage-and-file", "full", "marginal").

The writer reads the source, reads the wiki state, decides the page set, writes prose, and stages changes. The writer returns a structured report.

Immediately before each writer dispatch, capture the index path/blob snapshot (`git ls-files -s`). Capture it again after the writer returns. The paths whose index blob OIDs changed are that writer's contribution; this remains correct when a later writer modifies a page already staged by an earlier writer. Keep the cumulative staged boundary separate from this per-writer delta.

You check:

- the before/after index-blob delta matches the writer's exact intended-path report, while `git diff --cached --name-only` remains the explicitly labeled cumulative boundary;
- `wiki/index.md` is staged if any page was created or updated;
- the writer report includes each exact staging command, or the explicit marker `command telemetry unavailable`. Treat this as worker self-report and record independently exposed harness command telemetry separately. Only independently exposed command telemetry—not self-report or the final staged set—can establish whether `git add -A` was invoked or close AG-008. If telemetry is unavailable, report that fact; never infer “no `git add -A`” from staged-state parity alone.

### Writer-dispatch fallback

Try available write-capable, shared-checkout worker mechanisms first. An isolated or non-authoritative writer does not qualify. If none is available, the coordinator may perform the **writer role** inline only with a mandatory disclosure before reading the source or editing pages:

> No write-capable worker sharing the authoritative checkout is available. I will perform the writer role inline; this is a documented role-separation exception, not a delegated writer run.

During this exception the coordinator may read the source and write wiki prose solely as the writer. Record the disclosure, the dispatch failure/reason, affected scope, and every inline-written page in the final report. The coordinator still owns raw preservation, staging, theory, verification, and the commit gate. This exception does **not** permit inline theory, diff, source-fidelity, quality, research, or other reviewer work: reviewer dispatch failure remains a hard stop. If the user has not authorized the filing operation, ask before using the fallback.

### 4. Triage gate (human, non-routine)

The writer classifies the source as `full`, `marginal`, or `skip`.

- **Skip:** no wiki changes. The source stays in `raw/` as archive. Done with this source.
- **Marginal:** the writer reports the proposed target pages and scope, but does not edit yet. Present the triage to the human. If approved, dispatch the writer again with `scope: marginal` to apply the changes. If the human upgrades to `full`, dispatch with `scope: full`.
- **Full:** the writer has staged a full changeset. Proceed to the mechanical pre-check.

You escalate only when the writer reports a borderline or marginal source. Clear full ingests do not stop for triage.

### 5. Stage raw artifacts

After all writers complete and before the mechanical pre-check, stage every new/modified raw artifact so the staged set, the verifier's review scope, and the commit's contents all agree. The verifier's boundary is the staged set — anything not staged will not be reviewed and will not be committed, even if wiki pages cite it by path.

Stage each of the following with explicit paths (`git add -- <path>`). Never `git add -A`. Never absorb unrelated worktree changes.

1. **Newly preserved raw sources** from Step 2 — each `raw/<slug>.md` and any `raw/assets/` companions.
2. **arXiv extractions produced by the writer** — the writer extracts to `raw/<arxiv-id>.md` per their Step 1 and reports the path; `git add` it now. The PDF is never committed.
3. **Non-arXiv PDFs with no stable URL** — if the PDF is the durable raw copy per Step 2, `git add` it.
4. **Writer-discovered raw sources** — any sources a writer retrieved and reported back. Preserve them now per the Step 2 rules (slugify, write provenance frontmatter) and `git add` them. The writer does not preserve or stage raw sources.
5. **Companion media** — any images, audio, or screenshots in `raw/assets/` referenced by a raw source.
6. **Coordinator-owned process artifacts** — if this run adds or updates observed evidence in `meta/pipeline-recommendations.md` (or registers filing debt in `meta/tech-debt.md`), update it before verification and stage that exact path with `git add -- <path>`. Process artifacts are part of the reviewed commit boundary, not post-verdict appendages.

Report the raw staged set (`git diff --cached --name-only` filtered to `raw/`) alongside the cumulative wiki staged set and any coordinator-owned process artifacts. The staging boundary is now the union: cumulative writer-staged wiki paths ∪ coordinator-staged raw paths ∪ coordinator-staged process artifacts. The staging-boundary process check compares against this union, not against one writer's cumulative report. Record each exact coordinator `git add -- <path>` command and each writer staging command exposed by the harness.

### 6. Mechanical pre-check

After a full or marginal writer completes, rebuild the complete staged path list, run `./scripts/validate-page` on its supported changed wiki content paths, run `git diff --cached --check -- <all-changed-paths>`, and require `test -z "$(git diff --name-only -- <all-changed-paths>)"`. Do not pass coordinator-owned `meta/` process artifacts to the content validator; they remain in the full cached whitespace/parity boundary. The parity check proves reviewers will read the same bytes that are staged; run it again immediately before commit.

- If `validate-page` returns errors: route the specific errors back to the writer. The writer fixes them and re-reports. You do not fix them yourself — even mechanical fixes are edits to wiki pages, and editing wiki pages is writer work. Re-run `validate-page` after the writer reports fixes.
- If `validate-page` returns clean: proceed.

After the pre-check is clean, proceed to theory as required and then verification. A marginal label never bypasses verification or the commit-gate verdict.

### 7. Theory gate

For full ingests, construct a fresh isolated worker and load `reviewing-wiki-theory`. A marginal ingest may skip theory with a recorded scope-based justification; that skip does not determine diff, source-fidelity, or quality review needs and does not skip verification.

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

A request to “file,” “ingest,” or “process” a source authorizes the coordinator to commit that bounded filing after the complete gate returns `PASS` or `PASS WITH EXPLICIT DEBT`; an explicit “stop before commit” instruction overrides this default. Commit readiness belongs to the pipeline, not to a second human QA pass: do not ask the user to reconfirm routine reviewer conclusions. Before committing, prove that the staged boundary is exact and parity-clean, mechanical checks pass, every required isolated review completed, all affected fix loops were rerun, no reviewer task or external question remains open, no unresolved CRITICAL remains, and every accepted unresolved/out-of-scope issue is represented honestly on-page and/or in `meta/tech-debt.md` under the debt rules above. Then commit and report the hash.

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
- process telemetry: each dispatched worker/task, granted capabilities (`ro` for reviewers), dispatch result, retry/empty-result events, fallback/intervention, and every exact staging command exposed by the harness; if staging commands were not exposed, say so rather than inferring their history from the staged set;
- any writer-dispatch fallback disclosure and inline-written pages;
- any debt-registration checks performed before adding `meta/tech-debt.md` rows;
- whether changes were committed.

## Process checks

| Check | How |
|---|---|
| Session staging isolation | Staged index is empty before filing; any pre-existing cached path stops the run rather than entering this filing's commit |
| Staging boundary | `git diff --cached --name-only` = cumulative writer-staged wiki paths ∪ coordinator-staged raw paths ∪ coordinator-owned staged process artifacts; per-writer contributions come from before/after index blob OIDs |
| Raw artifacts staged | All new/modified raw files (preserved sources, arXiv extractions, writer-discovered sources, companion assets) staged before theory gate and verification |
| Existing raw immutability | For pre-existing `raw/**`, inspect the staged diff and confirm the file is unchanged; AgenticWiki permits creating raw artifacts but not modifying existing raw files. Any staged diff in an existing raw file blocks the gate. |
| Explicit-path staging | Record exact staging commands when exposed and reject any observed `git add -A`; staged-state parity alone cannot prove command history |
| `index.md` updated | In staged set if pages changed |
| Mechanical pre-check | `validate-page`, cached whitespace check, and full-boundary cached/worktree parity before theory/verification; errors routed to writer |
| Theory gate before verification | `reviewing-wiki-theory` invoked for full ingests; a marginal skip is justified; `panorama` reframe escalates |
| Verification on stable changeset | Coordinator runs `verifying-wiki-changes` inline after raw artifacts are staged and theory is clean or validly skipped; no verifier worker or nested dispatch |
| No commit on FAIL | Commit gate logic above; verdict from verifier |
| Raw preservation | Sources slugified; arXiv PDFs extracted, not committed; raw artifacts staged per Step 5 |
| Reviewer dispatch isolation | Each required diff/source-fidelity/quality review has its own read-only worker with repository access; unavailable dispatch stops verification |
| Delegated fix propagation | Worker self-reports are not evidence; accepted fixes are present in the coordinator checkout, inspected, and re-verified |
| Pi adapter schemas | When using Pi, tool calls use the worked object/array shapes in § Pi tool-schema adapter; other harnesses use native equivalents |
| Recommendation ledger | Coordinator reports tested IDs and closes rows only with a date plus commit/session/run identifier |
| Reviewer-dispatch checklist | Final report contains theory/diff/source-fidelity/quality rows, each dispatched or skipped with a rule-based justification |
| Process telemetry | Final report records reviewer task/worker identity when exposed, read-only capability, dispatch result, retries/empty returns, and fallback/intervention events |
| Verify the verifier | Mechanical reviewer failures are checked with `./scripts/validate-page <path>` before diagnosis or debt registration |
| Debt-registration discipline | New debt rows pass the real/not-trivial/not-self-contradicted checks; fixable one-line issues are not deferred |
| Writer fallback disclosure | Inline writer work occurs only under the documented disclosure and is never used for reviewer roles |
| Theory suggestions routed | Meaningful non-blocking theory suggestions are routed to the writer before verification and their disposition is reported |

## What you do not do

- Do not read source or wiki page bodies for coordination work, except staged hunks needed for inline verifier mechanics/risk classification and bodies read while performing the disclosed writer fallback.
- Do not write wiki prose as coordinator, except while performing that documented writer-dispatch fallback; it never applies to reviewer work.
- Do not edit wiki pages — not for editorial reasons, not for mechanical fixes. Route `validate-page` errors back to the writer. The coordinator's only edit to a wiki page is `index.md` if the writer missed it, and even that should be routed back if the writer is still available.
- Do not make editorial judgments — page set, framing, evidence posture, and scope decisions belong to the writer.
- Do not make scope decisions (the writer owns page-set selection).
- Do not perform reviewer judgment yourself. Running `verifying-wiki-changes` inline permits only staged-diff inspection for mechanical checks, risk classification, reviewer construction, and verdict translation.
- Do not treat a clean `validate-page` run as a PASS verdict. The commit-gate verdict comes from `verifying-wiki-changes`.
- Do not commit without a `PASS` or `PASS WITH EXPLICIT DEBT` verdict from `verifying-wiki-changes`.
- Do not silently fall back to doing editorial work. The only exception is the documented writer-dispatch fallback, with disclosure; it never applies to theory or verification reviewers.

## Human decisions

Stop and ask only when:

- a writer reports a blocker requiring a human decision (gated source, schema change, merge, delete);
- no write-capable shared-checkout writer can be spawned and the user has not authorized the documented inline-writer fallback;
- a required theory or verification reviewer cannot be dispatched in isolation;
- theory review requires a genuinely structural decision (new/merged/split/retired thread or fundamental reframe) or leaves an unresolved critical conflict;
- a CRITICAL verification finding cannot be resolved without a human decision;
- the user explicitly instructed the coordinator to stop before commit.

## Pipeline architecture

| Role | Skill | Owns |
|---|---|---|
| Coordinator | `coordinating-filing` (this skill) | Process: source ordering, raw preservation, shared-checkout writer dispatch, theory gate, inline verification orchestration, commit gate |
| Writer | `filing-agentic-sources` | Editorial judgment in the authoritative checkout: read source/wiki, decide page set, write prose, stage, report |
| Theory reviewer | `reviewing-wiki-theory` | Whole-wiki theory coherence: contradictions, departures, tensions, panorama reframes — isolated and report-only |
| Changeset verifier | `verifying-wiki-changes` | Inline coordinator mode: mechanical checks, risk classification, isolated reviewer construction, changeset verdict |
| Diff reviewer | `reviewing-wiki-diffs` | Transition integrity of a changeset's diff — report-only |
| Source-fidelity reviewer | `verifying-source-fidelity` | One page against every raw source it lists — report-only |
| Quality reviewer | `reviewing-wiki-quality` | Structure, clarity, context, navigation, thread quality — report-only |
| Research tool | `researching-wiki-claims` | Focused external research; returns evidence + recommendation, not a verdict |
