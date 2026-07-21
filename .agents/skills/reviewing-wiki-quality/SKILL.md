---
name: reviewing-wiki-quality
description: "Reviews new or substantially rewritten AgenticWiki pages for structure, clarity, context, chronology, navigation, and thread quality. Use in an isolated read-only worker after major page work; skip for narrow additive or mechanical edits."
---

# Reviewing Wiki Quality

Judge whether new or substantially rewritten pages work as durable wiki artifacts for a future reader. Consolidate the useful judgment previously split across structural, link, content, context, and temporal editors.

This is a report-only skill. Never edit, stage, commit, or delete files.

## Worker Capabilities

Require read/search access to the changed wiki pages, related pages, `wiki/index.md`, and `meta/wiki-conventions.md`. Network access is unnecessary. The harness should deny local writes, staging, commits, and deletion.

## When to Run

Run for:

- a new concept, author, project, or thread page;
- a substantial rewrite or reorganization;
- material thread synthesis;
- a change that adds or restructures a chronology.

Skip for narrow source annotations, small attributed additions, dates, formatting, and link-only repairs. This is one risk-triggered review, not a mandatory pass over every touched page.

## Input Contract

Require:

- the complete set of changed wiki pages;
- identification of new or substantially rewritten pages;
- the changeset's one-sentence purpose.

Read related pages only as needed to judge context, navigation, duplication, and chronology. Do not redo source verification; send factual-fidelity concerns back as specific questions for `verifying-source-fidelity`.

## Review Dimensions

### Page purpose and structure

- The summary states what the page is about and why it matters without overstating evidence.
- Sections match the page type and organize coherent responsibilities rather than arbitrary source-by-source notes.
- Headings and ordering let a reader find the factual spine, commentary, tensions, chronology, relationships, and sources.
- The page is neither an empty link target nor an indiscriminate dumping ground.

Mechanical schema failures belong to `validate-page`; report them only when they materially harm comprehension.

### Clarity and attribution

- Prose is direct, specific, and free of avoidable repetition.
- Loaded language and interpretations remain attributed.
- Transitions do not imply causation, consensus, or certainty that the page's evidence posture cannot support.
- Technical terms are explained or linked when a general reader would otherwise misunderstand them.

### Context and locality

- Readers receive enough immediate context to understand the development.
- Reusable background lives on the page that owns it rather than being duplicated across several pages.
- Important actors are identified on first use without bloating every mention with biography.
- The page links to existing context instead of recreating it.

### Chronology

- Dated events appear in a coherent order.
- The prose distinguishes event date, publication date, filing date, and later interpretation.
- A later account does not silently rewrite what was known earlier.
- Conflicting dates or temporal sequences are surfaced rather than smoothed over.

### Navigation

- `## Related` links express useful relationships, not quota-filling.
- New pages have meaningful inbound paths from the index or related pages.
- Thread↔concept links are reciprocal where the relationship helps readers.
- Page creation did not duplicate an existing subject under a slightly different name.

**Concept-to-Author links are intentionally one-way.** Concept pages should link to author pages to credit sources, but author pages should not reciprocate with backlinks to every concept that cites them. Only add an author→concept backlink when the author originated the concept (not merely got cited on it). If uncertain, leave the one-way link alone.

### Thread quality

For thread pages specifically:

- the thesis is supported by several filed sources rather than one source's frame;
- tensions and competing interpretations remain visible;
- the timeline shows development rather than merely listing source publication dates;
- source repetition is not presented as independent corroboration;
- the synthesis adds explanatory value beyond concatenating source summaries;
- cross-thread connections are explicit where the topics interact.

## Avoid Overreach

- Do not rewrite toward personal stylistic preference.
- Do not demand every page contain every possible section.
- Do not require a fixed number of links.
- Do not turn concise pages into essays.
- Do not make source-fidelity findings without identifying the exact claim that needs separate verification.
- Prefer a few high-leverage findings over line-by-line copyediting.

## Output

```markdown
## Wiki Quality Review: PASS | PASS WITH WARNINGS | FAIL

### Pages Read
- `wiki/path.md` — new | substantial rewrite | related context

### FAIL (material defects)
- page/section; reader-facing defect; smallest useful correction

### Warnings
- page/section; quality risk worth reviewing

### Source-Fidelity Questions
- exact claim to send to `verifying-source-fidelity`

### Strong Decisions
- structure, context, chronology, or navigation choices worth preserving
```

Use `FAIL` for defects that materially impair comprehension, context, chronology, navigation, or thread quality. Use `PASS WITH WARNINGS` for non-material concerns. A clean report should not manufacture suggestions.
