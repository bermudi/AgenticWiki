---
name: querying-agentic-wiki
description: "Answers questions from accumulated AgenticWiki knowledge and traces important claims to filed raw sources. Use to look up ideas, compare claims, explore threads, identify contradictions, or explain how a concept developed. Remains read-only unless the user explicitly requests a wiki update."
---

# Querying Agentic Wiki

Answer from the wiki's accumulated knowledge while keeping filed evidence, source claims, and wiki synthesis visibly distinct.

## Procedure

1. Read `wiki/index.md` to locate likely threads, concepts, authors, and projects.
2. Read relevant thread pages for the existing synthesis.
3. Read the underlying concept/author/project pages needed to answer the question.
4. Trace load-bearing claims to each page's listed `raw/` sources. Read those sources when attribution, wording, contradiction, chronology, or evidence quality matters.
5. Search adjacent wiki pages for conflicting accounts or later developments before presenting a settled picture.
6. Answer the user's actual question; do not dump page summaries.

## Output Contract

The answer should make clear:

- **Filed evidence:** what a primary document, paper, or original source says;
- **Attributed interpretation:** what an author, commentator, or practitioner argues;
- **Wiki synthesis:** connections drawn across multiple filed sources;
- **Uncertainty:** contradictions, single-source claims, transcript limitations, or missing primary material.

Cite the relevant wiki pages using `[[page-name]]` and identify the raw sources behind material claims. Mention source type or callout status when it changes how strongly a claim should be read; do not recite metadata mechanically when it does not matter.

## Evidence Rules

- Primary sources (arXiv papers, official documentation, released datasets, conference recordings) are strongest for what the document itself records.
- Original reporting and engineering blogs support attributed factual claims.
- Analysis supports interpretation unless it independently supplies sourced facts.
- Commentary and opinion establish that an argument or frame was advanced, not that its factual premise is true.
- Several sources repeating one original report are not independent corroboration.
- A contradiction is part of the answer, not an inconvenience to resolve silently.

## Knowledge gaps

When the wiki cannot answer confidently:

1. state exactly what is known from filed material;
2. identify the missing source or unresolved conflict;
3. suggest the smallest useful next source — preferably a primary document or original reporting;
4. do not search the web unless the user asks for research beyond the wiki.

## Filing valuable answers

If the answer reveals a substantial comparison, analysis, or connection not yet in the wiki:

- offer to create a wiki page for it;
- if accepted, create the page following `meta/wiki-conventions.md`;
- add it to `wiki/index.md` under the correct category;
- add `## Related` links from 2–3 existing pages;
- if it traces a theme across sources, create it as a thread page under `wiki/threads/`.

This skill is read-only. If the user asks to preserve a useful answer or new research, hand the proposed material to `filing-agentic-sources` and `coordinating-filing` as a separate operation so it receives normal source capture, theory review, and verification.
