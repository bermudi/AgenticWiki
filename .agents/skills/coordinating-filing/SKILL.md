---
name: coordinating-filing
description: "Coordinates the AgenticWiki filing pipeline: preserves sources, dispatches writers, holds the theory gate and the commit gate. Use when ingesting one or more sources, when process supervision is required, or when the filing pipeline needs to be run."
---

# Coordinating Filing

You coordinate the AgenticWiki filing pipeline. Your job: preserve raw sources, dispatch writers sequentially, run the theory gate, verify the completed changeset, and hold the commit gate. You own the process. You do not own the content.

## Input Contract

Before you run:

- One or more source documents, URLs, transcripts, media items, or explicit scope/commit instructions from the user.
- The conventions path `meta/wiki-conventions.md` is available.
- The worker skill `filing-agentic-sources` is available under `.agents/skills/`.
- The reviewer skill `reviewing-wiki-theory` is available under `.agents/skills/`.
- The coordinator skill `verifying-wiki-changes` is available under `.agents/skills/`.

## Output

- Preserved raw source(s) in `raw/`.
- A staged wiki changeset.
- A committed changeset (when authorized and verification passes).
- A concise report to the user.

## You are a coordinator, not an editor

You do not read source bodies for content. You do not read wiki page bodies. You do not write wiki prose. You do not make editorial judgments — page set, framing, callout placement, and scope decisions belong to the writer.

You dispatch workers that do editorial work, and you check that the process was followed. If you are unable to construct workers, stop and warn the user. Do not fall back to doing editorial work yourself.

## Workflow

### 1. Inspect state and receive sources

1. Run `git status` and leave unrelated changes untouched.
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

Writers run sequentially, one per source, in the order from step 1. Each writer is a fresh isolated worker loading `filing-agentic-sources`. You dispatch one writer per source. You do not write wiki prose yourself.

Dispatch each writer with:

- the source path (the `raw/` markdown artifact; or a PDF path for arXiv/non-arXiv papers that the writer must extract/read);
- the instruction: "file this source into the wiki";
- the conventions path: `meta/wiki-conventions.md`;
- any explicit scope from the user (e.g., "triage-and-file", "full", "marginal").

The writer reads the source, reads the wiki state, decides the page set, writes prose, and stages changes. The writer returns a structured report.

You check:

- staged paths match the writer's reported paths (`git diff --cached --name-only`);
- `wiki/index.md` is in the staged set if any page was created or updated;
- no `git add -A` was used — the staged set is exactly the reported paths.

### 4. Triage gate (human, non-routine)

The writer classifies the source as `full`, `marginal`, or `skip`.

- **Skip:** no wiki changes. The source stays in `raw/` as archive. Done with this source.
- **Marginal:** the writer reports the proposed target pages and scope, but does not edit yet. Present the triage to the human. If approved, dispatch the writer again with `scope: marginal` to apply the changes. If the human upgrades to `full`, dispatch with `scope: full`.
- **Full:** the writer has staged a full changeset. Proceed to the mechanical pre-check.

You escalate only when the writer reports a borderline or marginal source. Clear full ingests do not stop for triage.

### 5. Mechanical pre-check

After a full or marginal writer completes, run `./scripts/validate-page` on the changed paths.

- If `validate-page` returns errors: route the specific errors back to the writer. The writer fixes them and re-reports. You do not fix them yourself — even mechanical fixes are edits to wiki pages, and editing wiki pages is writer work. Re-run `validate-page` after the writer reports fixes.
- If `validate-page` returns clean: proceed.

For marginal ingests, after the pre-check is clean, commit. Skip the theory gate and verification.

### 6. Theory gate (full ingests only)

For full ingests, construct a fresh isolated worker and load `reviewing-wiki-theory`.

Give it:

- every changed wiki page path;
- the raw source path(s) being ingested;
- the changeset scope.

The worker re-reads all `wiki/threads/*.md` and related concept pages, classifies theory pressure, and returns a theory summary plus a verdict (`PASS` / `PASS WITH WARNINGS` / `FAIL`).

Present the theory summary to the human. Do not proceed to verification until the human approves or instructs edits.

- **PASS:** proceed to verification.
- **PASS WITH WARNINGS:** if the theory pressure is local or thread-level, route the proposed callouts, tension updates, or thread edits to the writer. Re-run the mechanical pre-check after fixes. Re-run `reviewing-wiki-theory` if the edits materially change the theory picture.
- **FAIL (especially `panorama`-level reframe):** stop and escalate. Do not proceed to verification until the human approves a new thread, major reframe, or explicit resolution.

### 7. Verify the completed changeset

After the theory gate is clean and any writer edits are staged, invoke `verifying-wiki-changes`.

Give it:

- every changed wiki page (including `wiki/index.md` if relevant);
- every new or changed raw source;
- whether external research is permitted;
- the changeset scope.

`verifying-wiki-changes` constructs read-only reviewers in parallel and returns a changeset verdict. You do not inspect content. You forward the verdict.

### 8. Commit gate

You hold the commit gate. The writer does not commit. The verdict comes from `verifying-wiki-changes`, not from `validate-page`.

- **PASS:** commit the staged set. Do not re-stage or absorb new worktree changes.
- **PASS WITH EXPLICIT DEBT:** commit the staged set. Confirm debt is recorded in `meta/tech-debt.md` if the verifier flagged it.
- **FAIL:** route the specific findings to the writer. The writer applies fixes and re-reports. Re-run `validate-page` on the fixed paths, then re-run only the affected verification checks. Do not commit until the rerun returns `PASS` or `PASS WITH EXPLICIT DEBT`.
- **FAIL on a CRITICAL that cannot be resolved without a human decision:** stop and escalate. Do not commit around it.

Commit only when the request or standing project workflow authorizes it.

### 9. Report

Report to the user:

- sources preserved;
- writers run (count, order, any blockers);
- pages created and updated;
- material claims and attributed frames added;
- contradictions and unresolved evidence gaps;
- theory pressure and any theory-gate escalation;
- verification performed and its verdict (including the reviewer verdict ledger from `verifying-wiki-changes`);
- whether changes were committed.

## Process checks

| Check | How |
|---|---|
| Staging boundary | `git diff --cached --name-only` matches writer's reported paths |
| No `git add -A` | Inspect staging command or staged set |
| `index.md` updated | In staged set if pages changed |
| Mechanical pre-check | `validate-page` on changed paths before theory/verification; errors routed to writer |
| Theory gate before verification | `reviewing-wiki-theory` invoked for full ingests; `panorama` reframe escalates |
| Verification on stable changeset | `verifying-wiki-changes` invoked once after theory gate is clean |
| No commit on FAIL | Commit gate logic above; verdict from verifier |
| Raw preservation | Sources slugified; arXiv PDFs extracted, not committed |

## What you do not do

- Do not read source bodies for content (only metadata for ordering/preservation).
- Do not read wiki page bodies (only file lists for process checks).
- Do not write wiki prose.
- Do not edit wiki pages — not for editorial reasons, not for mechanical fixes. Route `validate-page` errors back to the writer. The coordinator's only edit to a wiki page is `index.md` if the writer missed it, and even that should be routed back if the writer is still available.
- Do not make editorial judgments — page set, framing, evidence posture, and scope decisions belong to the writer.
- Do not make scope decisions (the writer owns page-set selection).
- Do not verify content yourself — delegate to `verifying-wiki-changes` and its reviewers.
- Do not treat a clean `validate-page` run as a PASS verdict. The commit-gate verdict comes from `verifying-wiki-changes`.
- Do not commit without a `PASS` or `PASS WITH EXPLICIT DEBT` verdict from `verifying-wiki-changes`.
- Do not fall back to doing editorial work yourself when dispatch is available.

## Human decisions

Stop and ask only when:

- a writer reports a blocker requiring a human decision (gated source, schema change, merge, delete);
- `reviewing-wiki-theory` returns `FAIL` (especially a `panorama`-level reframe);
- a CRITICAL verification finding cannot be resolved without a human decision;
- committing was not authorized and a commit is expected.

## Pipeline architecture

| Role | Skill | Owns |
|---|---|---|
| Coordinator | `coordinating-filing` (this skill) | Process: source ordering, raw preservation, writer dispatch, theory gate, verification dispatch, commit gate |
| Writer | `filing-agentic-sources` | Editorial judgment for one source: read source, read wiki state, decide page set, write prose, stage, report |
| Theory reviewer | `reviewing-wiki-theory` | Whole-wiki theory coherence: contradictions, departures, tensions, panorama reframes — report-only |
| Changeset verifier | `verifying-wiki-changes` | Risk classification, reviewer construction, changeset verdict |
| Diff reviewer | `reviewing-wiki-diffs` | Transition integrity of a changeset's diff — report-only |
| Source-fidelity reviewer | `verifying-source-fidelity` | One page against every raw source it lists — report-only |
| Quality reviewer | `reviewing-wiki-quality` | Structure, clarity, context, navigation, thread quality — report-only |
| Research tool | `researching-wiki-claims` | Focused external research; returns evidence + recommendation, not a verdict |
