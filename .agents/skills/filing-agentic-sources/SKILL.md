---
name: filing-agentic-sources
description: "Writer skill: preserves and files one source into AgenticWiki by creating or verifying its raw artifact, deciding the page set, writing wiki prose, and staging wiki changes. Invoked by coordinating-filing. Does not verify or commit."
---

# Filing Agentic Sources (Writer)

You preserve and file one source into AgenticWiki. Your job: create or verify its raw artifact, read the source, decide the smallest useful page set, write the wiki changes, and stage the intended changes. Then return a structured report. In full topology you stage only wiki paths and the coordinator stages raw/process artifacts. In a Freebuff baton write pass you stage the complete exact boundary, including new raw/process artifacts, before `filing-baton finish-write`. You never invoke semantic verification or commit.

## Input Contract

Before you run:

- One source locator: a URL, local file path, or existing `raw/` artifact.
- The conventions path `meta/wiki-conventions.md` is available.
- The reference file `references/ingest-philosophy.md` is available.
- `FILING_DATE` captured by the coordinator or baton start, used for every changed page's `updated` value and new-source saved/ingested metadata.
- Optional scope from the coordinator: `triage-and-file` (default), `full`, or `marginal`.

## Output

- A new convention-compliant raw artifact, or verification that the supplied existing raw artifact is usable and unchanged.
- A staged wiki changeset in full topology, or the complete exact staged boundary in Freebuff baton mode (or no wiki changes for `skip`/`marginal` reports).
- A structured report to the coordinator, including every raw path it must check and stage.

## You own editorial judgment for one source

You decide: raw artifact construction, page-set selection, prose, attribution, callout placement, contradiction handling, and scope. You do not own process: raw staging/boundary checks, verification dispatch, theory gate, or commit gate.

## Workflow

### 1. Preserve and read the source

Create or verify the durable source artifact, then read the supplied source in full. Never modify or delete an existing file under `raw/`.

- If the source is a web or YouTube URL, fetch it and create a slugified `raw/<slug>.md` artifact with the required provenance frontmatter and body format from `meta/wiki-conventions.md`. Create companion media under `raw/assets/` when required. Full topology reports raw paths unstaged to the coordinator; a Freebuff write pass stages them in its complete boundary.
- If the source is an existing `raw/<slug>.md` artifact, verify its provenance frontmatter and read it directly. If it is malformed, report the blocker; do not repair the existing raw file.
- If the source is a local file outside `raw/`, slugify its filename and move it into `raw/` before reading. Report the move and destination. For non-arXiv papers with no stable URL, the PDF may be the durable raw copy.
- If the source is an arXiv PDF, URL, or identifier, extract the text to `raw/<arxiv-id>.md` per `meta/wiki-conventions.md` → "arXiv / Paper Source Format". Do not preserve or stage the PDF. Verify the `arxiv_id` against the paper's page-1 submission stamp and report the new raw path.
- If a non-arXiv PDF is the durable raw copy, extract text for reading using `lit parse` or the `hybrid-parse` skill, but do not create a competing `raw/` markdown copy.
- For YouTube transcripts, be aware that transcripts usually lack per-line speaker labels. For multi-speaker sources, verify attribution against the recording via the media skill before citing a quote under a speaker's name. See `meta/wiki-conventions.md` → "YouTube Source Format".

### 2. Triage

Classify the source into one of three outcomes:

| Outcome | Signal |
|---|---|
| **Full ingest** | Introduces a genuinely new idea, framework, empirical result, or tool. Would create or substantially rewrite at least one page that stands on its own. |
| **Marginal** | Adds useful color or examples to existing pages but does not warrant new pages. A few sentences of source-backed context on 1–2 existing pages. |
| **Skip** | Product demo, surface-level rehash, or outside the wiki's domain. |

If the coordinator supplied `scope: full`, proceed directly to filing. If `scope: marginal`, apply the marginal procedure and report. Otherwise:

- **Skip:** report archive-only. Do not edit wiki pages.
- **Marginal:** report the proposed target pages and one-line scope. Do not edit yet. The coordinator will present the triage to the human and re-dispatch you if approved.
- **Full:** proceed to step 3.

Be opinionated. The default is to protect the wiki from dilution — the human can always override upward.

### 3. Read the wiki state

Read `wiki/index.md`, then search `wiki/` for names and distinctive terms before creating anything. Read the existing pages the source may update.

If prior writers in this changeset have already updated pages, read their contributions in the current wiki state and adapt. Do not duplicate or overwrite their work; layer this source's contribution on top.

Identify whether the source adds:

- material claims or empirical results;
- a distinct attributed frame, interpretation, prediction, or argument;
- useful corroboration or contradiction;
- no durable knowledge beyond preserving the source.

### 4. Plan the smallest useful page set

Choose pages by knowledge ownership, not by a fixed fan-out checklist:

- update or create a concept page for an idea, pattern, or technology;
- update or create an author page for a person whose claims are load-bearing;
- update or create a project page for a specific tool, framework, or product;
- update a thread page when the source changes an established cross-source storyline;
- create a new thread page only when several sources support a genuine through-line.

Prefer updating an existing page over creating a near-duplicate. A small source should produce a small changeset, not a new workflow branch.

**Thread-coverage consideration.** Before deciding a thread does not need updating, read the candidate threads plausibly covering the subject (via `wiki/index.md` and `wiki/threads/`). A filing can silently fail to register that it undermines or extends a thread it never touched. State in your final report which threads you considered and why you did or did not update them. Consideration is auditable; silent non-consideration is not.

### 5. Write the wiki changes

Follow `meta/wiki-conventions.md` for page shape and frontmatter.

For every changed page:

- set `updated: $FILING_DATE` exactly; do not substitute a publication, event, or UTC date;
- keep factual claims traceable to listed `raw/` sources;
- distinguish facts, interpretations, predictions, and normative claims;
- attribute arguments and frames rather than adopting them as wiki voice;
- preserve previous attributed frames instead of replacing them;
- add explicit contradiction callouts when sources disagree;
- update `## Sources` and frontmatter `sources` together;
- add `## Related` to every new page (not optional); maintain existing `## Related` sections and thread connections on updated pages;
- for new concept/author/project pages, set `unaudited_marginal: 0`; for full ingests that touch existing pages, reset `unaudited_marginal` to 0.

Use the epistemic callouts from `meta/wiki-conventions.md`: `Departure:`, `Contradiction:`, `Synthesis:`, `Extension:`. Keep them at claim level, not page level.

When a source stresses the existing theory, classify the pressure before editing. Load `references/ingest-philosophy.md` for the full theory-pressure framework:

- **Local caveat:** add a callout on the affected page.
- **Thread-level tension:** add or update the thread's `## Tensions` section and link the affected concepts.
- **Panorama-level reframe:** propose a new thread or major section; do not bury it as only a callout. Report it to the coordinator.

Update `wiki/index.md` once after the page set is stable. Do not create links merely to satisfy a target count; every connection should help a reader navigate the subject.

### 6. Stage the changeset

Stage exactly the intended changeset paths (`git add -- <paths>`). Never use `git add -A` and never absorb unrelated worktree changes.

- **Full topology:** stage only intended wiki paths. Report raw/process paths for coordinator checks and staging.
- **Freebuff baton write pass:** stage the complete intended transaction, including new raw artifacts and process/debt representations, then pass every exact path to `filing-baton finish-write`.

You do not semantically verify or commit. Full topology returns to coordinator dispatch; baton mode stops for a fresh review/fix session.

### 7. Report to the coordinator

Return a structured report:

- **classification:** `full`, `marginal`, or `skip`;
- **paths staged by this writer:** the exact intended paths passed to `git add --`; also include the cumulative `git diff --cached --name-only` output, clearly labeled as cumulative because sequential writers inherit earlier staged paths;
- **staging commands:** every exact staging invocation you ran, or `command telemetry unavailable` if the harness cannot expose it; this is self-reported evidence, distinct from any independent harness telemetry;
- **pages created or updated:** list with one-line purpose per page;
- **material claims and attributed frames added:** what this source contributed;
- **contradictions flagged:** with the callout location;
- **threads considered:** which were updated, which were left untouched and why;
- **theory pressure:** local / thread / panorama, with proposed edits;
- **evidence gaps:** claims that rely on a single source or inference, with callouts or `evidence_status` notes;
- **raw artifacts created or verified:** every source and companion path from step 1, whether newly created/moved or pre-existing; explicitly mark which new paths the coordinator must stage;
- **blockers:** gated sources, schema questions, merge or delete decisions — anything requiring a human decision the coordinator should escalate.

If the source justified no wiki change (archive-only outcome), report that with the classification and raw-source frontmatter checklist result.

## Marginal procedure

If the source is marginal (or the coordinator dispatches you with `scope: marginal`):

1. Add `raw/<filename>` to the `sources` frontmatter of the target page(s).
2. Add an entry in the `## Sources` section annotating what the source contributed.
3. Add a sentence or short paragraph to the body citing the source where it fits.
4. Update the `updated` date.
5. **Increment the `unaudited_marginal` counter** in frontmatter (add it if not present, starting at 1).
6. If `unaudited_marginal >= 5`, warn the coordinator that this page needs a source verification audit.
7. Update `wiki/index.md` if needed.
8. Stage and report.

No new pages. No theory gate. After staging and reporting, return control to the coordinator for mechanical validation, risk-classified verification, and the normal commit gate; marginal scope never skips verification.

## What you do not do

- Do not modify or delete existing raw sources (AgenticWiki has no corrector role).
- In full topology, do not stage raw sources; report each new raw path to the coordinator. In a Freebuff baton write pass, stage new raw sources as part of the complete explicit boundary.
- Do not dispatch `reviewing-wiki-theory` or `verifying-wiki-changes`.
- Do not hold the commit gate.
- Do not commit.
- Do not inspect other writers' work for process compliance (coordinator's process checks).
- Do not delete or merge pages without human approval.

## Human decisions

Report to the coordinator for escalation when:

- a required gated/paywalled source must be supplied;
- deleting or merging pages is warranted;
- project schema or `meta/` policy must change;
- evidence supports multiple materially different editorial treatments;
- a `panorama`-level reframe is brewing and needs human approval before proceeding;
- source preservation cannot produce a reliable convention-compliant new artifact.
