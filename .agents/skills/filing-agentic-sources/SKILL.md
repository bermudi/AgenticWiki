---
name: filing-agentic-sources
description: "Writer skill: files one source into AgenticWiki by reading the source, deciding the page set, writing wiki prose, and staging the changeset. Invoked by coordinating-filing. Does not preserve raw, verify, or commit."
---

# Filing Agentic Sources (Writer)

You file one source into AgenticWiki. Your job: read the source, decide the smallest useful page set, write the wiki changes, and stage the changeset. Then return a structured report to the coordinator. You do not preserve raw sources, do not invoke verification, and do not commit — those are the coordinator's responsibilities.

## Input Contract

Before you run:

- One source path (a `raw/` markdown artifact, or a PDF/paper that you must extract/read).
- The conventions path `meta/wiki-conventions.md` is available.
- The reference file `references/ingest-philosophy.md` is available.
- Optional scope from the coordinator: `triage-and-file` (default), `full`, or `marginal`.

## Output

- A staged wiki changeset (or no changes for `skip`/`marginal` reports).
- A structured report to the coordinator.

## You own editorial judgment for one source

You decide: page-set selection, prose, attribution, callout placement, contradiction handling, and scope. You do not own process: raw preservation, staging boundary checks, verification dispatch, theory gate, commit gate.

## Workflow

### 1. Read the source

Read the supplied source in full.

- If the source is a `raw/<slug>.md` artifact, read it directly.
- If the source is an arXiv PDF or an arXiv URL, extract the text to `raw/<arxiv-id>.md` per `meta/wiki-conventions.md` → "arXiv / Paper Source Format". Do not commit the PDF. Verify the `arxiv_id` against the paper's page-1 submission stamp. Report the new raw path to the coordinator.
- If the source is a non-arXiv PDF with no stable URL, the PDF may be the durable raw copy. Extract text for reading using `lit parse` or the `hybrid-parse` skill, but do not create a competing `raw/` markdown copy.
- If the source is a YouTube transcript or inline stub, be aware that transcripts usually lack per-line speaker labels. For multi-speaker sources, verify attribution against the recording via the media skill before citing a quote under a speaker's name. See `meta/wiki-conventions.md` → "YouTube Source Format".

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

- update `updated`;
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

Stage exactly the intended changeset paths (`git add -- <paths>`). The staged set is the changeset boundary. Never use `git add -A`. Never absorb unrelated worktree changes into the staged set.

You stage but do not verify and do not commit. Verification is dispatched by the coordinator after all writers complete; the commit gate is held by the coordinator.

### 7. Report to the coordinator

Return a structured report:

- **classification:** `full`, `marginal`, or `skip`;
- **staged paths:** the output of `git diff --cached --name-only` (must match the paths you staged);
- **pages created or updated:** list with one-line purpose per page;
- **material claims and attributed frames added:** what this source contributed;
- **contradictions flagged:** with the callout location;
- **threads considered:** which were updated, which were left untouched and why;
- **theory pressure:** local / thread / panorama, with proposed edits;
- **evidence gaps:** claims that rely on a single source or inference, with callouts or `evidence_status` notes;
- **new raw sources to preserve:** any sources extracted during step 1 that need to be staged (you do not stage or commit raw sources — hand these back to the coordinator);
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

No new pages. No theory gate. No verification.

## What you do not do

- Do not preserve raw sources (coordinator's responsibility, except that you may extract an arXiv/non-arXiv paper to `raw/` for reading and report the new path).
- Do not correct sources (AgenticWiki has no corrector role).
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
- a source extraction produces a new raw source that needs preservation.
