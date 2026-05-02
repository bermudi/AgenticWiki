# LLM Wiki — Project Schema

This is a personal knowledge base built and maintained by an LLM agent. You are the wiki maintainer. The human curates sources and asks questions; you handle all summarization, cross-referencing, filing, and bookkeeping.

## Directory Structure

```
raw/              Immutable source documents. Never modify. Read-only.
raw/assets/       Downloaded images referenced by source documents.
wiki/             LLM-generated wiki pages. You own this layer entirely.
wiki/index.md     Content catalog — thread-first, updated after every change.
wiki/threads/     Synthetic essays tracing themes across sources. The "big theory" layer.
wiki/authors/     Entity pages for people and organizations.
wiki/concepts/    Concept pages for ideas, patterns, and technologies.
wiki/projects/    Entity pages for specific tools, frameworks, and products.
```

Knowledge flows directly from `raw/` into concepts, threads, authors, and projects. There is no intermediate source-summary layer — the wiki pages themselves are the digest.

## Ownership Rules

| Layer     | Owner | You can...                        | You cannot...             |
|-----------|-------|-----------------------------------|---------------------------|
| `raw/`    | Human | Read files                        | Create, modify, or delete |
| `wiki/`   | You   | Create, update, reorganize freely | —                         |
| `AGENTS.md` | Both | Propose changes, apply on approval | —                       |

## Page Naming

- Kebab-case: `distributed-systems.md`, `map-reduce.md`, `jeff-dean.md`
- One topic per page. Split when a section outgrows its parent.
- Entity pages for people, organizations, projects: `jeff-dean.md`
- Concept pages for ideas, patterns, technologies: `map-reduce.md`
- Thread pages for synthetic essays tracing themes across sources: `threads/the-slop-problem.md`

## Page Format

Every wiki page has YAML frontmatter and a consistent structure:

```markdown
---
title: Page Title
created: YYYY-MM-DD
updated: YYYY-MM-DD
sources: []
tags: []
---

# Page Title

> One-paragraph summary. This is the blurb shown in index.md.

## Body

The actual content. Use headings, lists, tables, code blocks as appropriate.

## Thread
- [[thread-name]] — why this concept belongs to this thread

## Related

- [[other-page]] — brief note on the relationship
- [[another-page]] — brief note on the relationship

## Sources

- `raw/filename.md` — what this source contributed to this page
```

The `> blockquote` immediately after the title is the page summary — it must exist on every page because `index.md` uses it. Keep it to 1-3 sentences.

## Cross-References

- Use Obsidian wiki-links: `[[page-name]]` (no `.md` extension)
- Always add a brief note explaining the relationship: `[[page-name]] — why it's linked`
- When creating a new page, add links to it from at least 2-3 existing pages that relate to it
- When updating a page, check if other pages need updating too (follow the `## Related` and `## Thread` links)
- Concepts that belong to a thread must have a `## Thread` section linking back to it
- Thread pages link down to concepts; concept pages link up to threads. This bidirectional weave is the navigation backbone.

## index.md

The content catalog. Organized by category. Updated after every ingest and every page creation.

```markdown
# Index

## 🧵 Threads — The Big Picture
- [[thread-name]] — one-line thesis

## ✍️ Authors
- [[page-name]] — one-line summary

## 🧠 Concepts
- [[page-name]] — one-line summary

## 🛠️ Projects & Tools
- [[page-name]] — one-line summary
```

Sources are tracked per-page in `## Sources` sections pointing to `raw/` files. Git log provides the timeline. No centralized source list needed.

When answering queries, read `wiki/index.md` first to locate relevant pages, then drill into them.

## Web Sources

When ingesting a web source (article, GitHub README, blog post, documentation), **always fetch and save the actual content to `raw/`** — not a summary stub. Use `curl` or Jina Reader (`https://r.jina.ai/<url>`) to extract the full text. Save as markdown with YAML frontmatter (type, url, title, author, date, ingested). The file in `raw/` should be the verbatim source content that a future session can re-read in full.

Never replace source content with extracted key points. The whole point of `raw/` is that it preserves the original so wiki pages can be re-derived from it.

## YouTube Videos

This project formerly used the Gemini YouTube extension for native video understanding. Currently, YouTube content may arrive either as a transcript file already in `raw/` or as inline content from a Gemini extension. **Only create a source stub in `raw/` when the content arrived inline and no file already exists on disk.** If a transcript file (`raw/*.md`) already exists, it IS the source — do not create a stub.

### YouTube source stub format

Create `raw/yt-<descriptive-slug>.md`:

```markdown
---
type: youtube
url: https://youtube.com/watch?v=VIDEO_ID
title: Video Title
channel: Channel Name
date: YYYY-MM-DD
ingested: YYYY-MM-DD
---

# Key points extracted during ingest

- Point 1
- Point 2
- Point 3

> Full content was processed via Gemini's native video understanding.
> This file captures extracted knowledge, not the raw transcript.
```

This stub serves as the durable record of what was ingested. It's not the original video, but it's enough for future sessions to re-read and re-evaluate. Wiki source pages reference these stubs the same way they reference any `raw/` file.

## Ingest Philosophy

Threads are not just filing — they are the wiki's living theory. During ingestion:

1. **Actively look for theory.** Don't just extract concepts — identify recurring claims, workflows, and principles across sources. When multiple sources converge on the same idea, that's a thread. When a new source reinforces an existing thread, deepen it.
2. **Highlight contradictions and departures.** When a source disagrees with an existing thread or concept, don't silently reconcile. Flag it explicitly with a `> [!warning] Contradiction` callout on both the concept page and the thread, and surface it to the human in your ingest summary so they can decide which direction to take.
3. **Propose new threads when themes emerge.** If a source introduces a coherent argument that doesn't fit any existing thread, propose a new one. Explain how it relates to existing threads (supports, contradicts, extends).
4. **Present the state of the theory.** After ingestion, summarize not just what was added but how the overall picture changed — which threads gained support, which took a hit, where the tensions are.

## Git

After every ingestion, commit all changes with a descriptive message:

```bash
git add -A
git commit -m "ingest: <source title> — <brief summary of what was created/updated>"
```

The commit message should be useful in `git log` — include the source name and the scope of changes. If contradictions were flagged, mention them.

## Rules

1. **Never modify files in `raw/`** — that's the source of truth.
2. **Always update `index.md`** when creating or significantly updating pages.
3. **Always add a `## Related` section** to new pages with links to existing pages.
4. **Always update the `updated` date** in frontmatter when editing a page.
5. **Prefer creating a page over leaving knowledge in chat history.** Good answers, comparisons, and analyses should be filed as wiki pages.
6. **Note contradictions explicitly.** If a new source contradicts an existing claim, flag it with a `> [!warning]` callout, not a silent overwrite. Surface contradictions in the ingest summary and in the relevant thread page so the human can decide.
7. **Ask before deleting pages.** Suggest merges or reorganizations, don't execute unilaterally.
