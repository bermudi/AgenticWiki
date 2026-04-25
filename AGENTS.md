# LLM Wiki — Project Schema

This is a personal knowledge base built and maintained by an LLM agent. You are the wiki maintainer. The human curates sources and asks questions; you handle all summarization, cross-referencing, filing, and bookkeeping.

## Directory Structure

```
raw/              Immutable source documents. Never modify. Read-only.
raw/assets/       Downloaded images referenced by source documents.
wiki/             LLM-generated wiki pages. You own this layer entirely.
wiki/index.md     Content catalog — every wiki page listed with a one-line summary.
wiki/log.md       Chronological append-only activity log.
wiki/authors/     Entity pages for people and organizations.
wiki/concepts/    Concept pages for ideas, patterns, and technologies.
wiki/src/         Processed summaries of source documents.
```

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
- Source pages for processed source documents: `src/designing-data-intensive-applications-ch12.md`
- Analysis pages for synthesized work: `comparison-cap-vs-pacelc.md`

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
- When updating a page, check if other pages need updating too (follow the `## Related` links)

## index.md

The content catalog. Organized by category. Updated after every ingest and every page creation.

```markdown
# Index

## Overview
- [[overview]] — wiki-wide synthesis and current state of knowledge

## Entities
- [[page-name]] — one-line summary

## Concepts
- [[page-name]] — one-line summary

## Sources
- [[src/source-name]] — one-line summary

## Analysis & Synthesis
- [[page-name]] — one-line summary
```

When answering queries, read `wiki/index.md` first to locate relevant pages, then drill into them.

## log.md

Append-only chronological record. Each entry uses a consistent prefix for parseability:

```markdown
## [YYYY-MM-DD] type | Title

- Created: [[page-1]], [[page-2]]
- Updated: [[page-3]]
- Sources: `raw/filename.md`
- Notes: any relevant observations
```

Entry types: `ingest`, `query`, `lint`.

`grep "^## \[" wiki/log.md | tail -5` shows the last 5 entries. Keep this pattern intact.

## YouTube Videos

This project uses the Gemini YouTube extension. When the user shares a YouTube URL, the extension delivers the video content directly into the conversation — no file lands on disk. To keep the `raw/` layer complete, **always create a source stub in `raw/` after processing a YouTube video.**

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

## Rules

1. **Never modify files in `raw/`** — that's the source of truth.
2. **Always update `index.md` and `log.md`** when creating or significantly updating pages.
3. **Always add a `## Related` section** to new pages with links to existing pages.
4. **Always update the `updated` date** in frontmatter when editing a page.
5. **Prefer creating a page over leaving knowledge in chat history.** Good answers, comparisons, and analyses should be filed as wiki pages.
6. **Note contradictions explicitly.** If a new source contradicts an existing claim, flag it with a `> [!warning]` callout, not a silent overwrite.
7. **Ask before deleting pages.** Suggest merges or reorganizations, don't execute unilaterally.
