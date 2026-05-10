# LLM Wiki — Project Schema

This is a personal knowledge base built and maintained by an LLM agent. You are the wiki maintainer. The human curates sources and asks questions; you handle all summarization, cross-referencing, filing, and bookkeeping.

## Mission

This wiki is bermudi's effort to compile the best ideas about how to do AI-assisted development ("vibe coding") with discipline. Your job is to track, file, and connect these ideas — not to treat them as established truth. Nothing here is gospel. Every claim is an unproven suggestion. Sources disagree, evidence is thin, and the theory evolves. Your role is to flag contradictions, surface uncertainty, and help bermudi see how the pieces fit together. You're not declaring winners; you're maintaining a map of hypotheses in progress.

## Architecture

Three layers, following the pattern described in [the LLM Wiki Manifesto](meta/llm-wiki-manifesto.md) by Andrej Karpathy:

```
raw/              Source documents. Immutable — the LLM reads but never modifies them.
raw/assets/       Downloaded images referenced by source documents.
wiki/             LLM-generated wiki pages. You own this layer entirely.
wiki/index.md     Content catalog — thread-first, updated after every change.
wiki/threads/     Synthetic essays tracing themes across sources. The "big theory" layer.
wiki/authors/     Entity pages for people and organizations.
wiki/concepts/    Concept pages for ideas, patterns, and technologies.
wiki/projects/    Entity pages for specific tools, frameworks, and products.
meta/             The schema — design philosophy and architecture, co-evolved with the human.
```

Knowledge flows directly from `raw/` into concepts, threads, authors, and projects. There is no intermediate source-summary layer — the wiki pages itself are the digest.

The core idea: instead of RAG (retrieve-then-forget), the LLM incrementally builds and maintains a **persistent, compounding artifact** — a structured, interlinked collection of markdown files. Cross-references are already there, contradictions already flagged, synthesis already reflects everything read. The wiki keeps getting richer with every source. This pattern is related in spirit to Vannevar Bush's [Memex](https://en.wikipedia.org/wiki/Memex) (1945) — a personal, curated knowledge store with associative trails between documents. Bush's vision was private, actively curated, with the connections between documents as valuable as the documents themselves. The part he couldn't solve was who does the maintenance. The LLM handles that.

## Ownership Rules

| Layer       | Owner | You can...                        | You cannot...             |
|-------------|-------|-----------------------------------|---------------------------|
| `raw/`      | Human | Read files, create new source files | Modify or delete existing files |
| `wiki/`     | You   | Create, update, reorganize freely | —                         |
| `meta/`     | Both  | Read, propose additions           | Modify without approval   |
| `AGENTS.md` | Both  | Propose changes, apply on approval | —                         |

## Skills

Detailed operational procedures live in skill files. **Always load the relevant skill before executing an operation** — the skill contains step-by-step procedures, checklists, and verification gates that the schema only summarizes.

| Operation | Skill file | When to load |
|---|---|---|
| Ingest | `.agents/skills/wiki-ops/SKILL.md` | Processing a new source: article, paper, YouTube video, podcast notes |
| Query | `.agents/skills/wiki-ops/SKILL.md` | Answering questions against accumulated wiki knowledge |
| Lint | `.agents/skills/wiki-ops/SKILL.md` | Health-checking the wiki: broken links, orphans, contradictions, stale claims |

When in doubt, load the skill. It's better to re-read the procedure than to skip a verification step.

## Editors

Specialized subagents for wiki quality. Each owns a narrow beat — invoke them via `delegate` when their domain is relevant. All editors inherit project context and the wiki-ops skill.

| Editor | Agent | Beat | When to invoke |
|---|---|---|---|
| Structural | `structural-editor` | Copy desk — frontmatter, broken links, index accuracy, orphan pages | Post-ingest verification, periodic lint |
| Content | `content-editor` | Developmental editor — summary quality, thin pages, section completeness, contradictions | Post-ingest verification, when pages feel shallow |
| Link | `link-editor` | Weaver — bidirectional links, thread↔concept coverage, dangling refs | Post-ingest verification, when cross-references feel sparse |
| Source Verifier | `source-verifier` | Fact-checker — hallucinations, omissions, misattributions (read-only) | Post-ingest verification, when fidelity is uncertain |
| Temporal | `temporal-editor` | Diachronic guardian — stale pages, thread drift, contradiction aging, coverage gaps over git history | Weekly, surfaced via session nudge |
| Theory | `theory-editor` | Cross-thread theorist — thesis support, cross-thread tensions, unfalsifiable arguments, emerging thread candidates | Chained from temporal-editor; also invocable standalone |

All editors except Theory run during the wiki-ops lint phase. Theory-editor is triggered by temporal-editor after its own passes. You can also invoke editors individually for targeted checks.

### Temporal Editor — Session Nudge

The temporal editor runs on a weekly cadence, but there's no cron. Instead:

1. At session start, read `.agents/state/temporal-editor-last-run`.
2. If the date is 7+ days ago, suggest running `temporal-editor` via delegate.
3. If the user agrees, delegate to `temporal-editor`. It will update the state file on completion.
4. If the user declines or is mid-task, don't block — just note it.

Don't be pushy. One mention per session is enough.

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
unaudited_marginal: 0
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

Frontmatter `sources` is a machine-readable list of `raw/` filenames. The body `## Sources` section is the human-readable annotated version — each entry notes what the source contributed. Both must stay in sync. When adding a source to a page, update both places.

Frontmatter `unaudited_marginal` tracks how many marginal ingests have touched this page without a verification pass. Increment on each marginal ingest. When it reaches 5, trigger a source verification audit (re-read all sources, check all claims, reset to 0). Full ingest resets it to 0 automatically. Pages created before this field was introduced are treated as 0.

### Thread page format

Thread pages live in `wiki/threads/` and follow the same frontmatter conventions, but have a different body structure:

```markdown
---
title: Thread Title
created: YYYY-MM-DD
updated: YYYY-MM-DD
sources:
  - raw/source-one.md
  - raw/source-two.md
tags: [thread, relevant-tags]
---

# Thread Title

> One-paragraph thesis statement. What this thread argues.

## Thesis

The core argument. May span multiple sections with headings as needed.

## Tensions

Where the theory is unsettled. Contradictions between sources, open questions.

## Sources

- `raw/source-one.md` — what this source contributed
- `raw/source-two.md` — what this source contributed
```

The `## Tensions` section is optional but encouraged when sources disagree.

## Cross-References

- Use Obsidian wiki-links: `[[page-name]]` (no `.md` extension)
- Always add a brief note explaining the relationship: `[[page-name]] — why it's linked`
- When creating a new page, add links to it from at least 2-3 existing pages that relate to it
- When updating a page, check if other pages need updating too (follow the body wiki-links and the `## Thread` section on concept pages)
- Concepts that belong to a thread must have a `## Thread` section linking back to it

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

When ingesting a web source (article, GitHub README, blog post, documentation), **always fetch and save the actual content to `raw/`** — not a summary stub. Use `curl` or Jina Reader (`https://r.jina.ai/<url>`) to extract the full text. The file in `raw/` should be the verbatim source content that a future session can re-read in full.

Never replace source content with extracted key points. The whole point of `raw/` is that it preserves the original so wiki pages can be re-derived from it.

### Web source file format

Create `raw/<descriptive-slug>.md`:

```markdown
---
type: web
url: https://example.com/article-slug
title: Article Title
author: Author Name
date: YYYY-MM-DD
ingested: YYYY-MM-DD
---

<Full text of the article as extracted markdown>
```

The slug should be human-readable and descriptive (e.g., `how-to-ralph-wiggum.md`). If the source has no clear date, use the ingestion date. The `ingested` date is always today.

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

1. **Discuss before you write.** After reading the source, pause and tell the human what you found — key claims, where it fits, anything surprising. Let them guide emphasis before you touch any wiki pages. The human owns what matters; you own the filing.
2. **Actively look for theory.** Don't just extract concepts — identify recurring claims, workflows, and principles across sources. When multiple sources converge on the same idea, that's a thread. When a new source reinforces an existing thread, deepen it.
3. **Track theory pressure, not just contradictions.** When a source stresses the existing theory — by contradicting a claim, reframing a failure mode, shifting a human/agent boundary, or suggesting a framework is transitional — don't silently reconcile it. Classify the pressure:
   - **Local caveat**: add a `> [!warning] Theory pressure` or `> [!note] Departure` callout on the affected page.
   - **Thread-level tension**: add or update the thread's `## Tensions` section.
   - **Panorama-level reframe**: propose a new thread or major thread section if the source reorganizes multiple existing pages.

   Surface the pressure in the ingest summary so the human can decide whether to preserve, deepen, or resolve it.
4. **Propose new threads when themes emerge.** If a source introduces a coherent argument that doesn't fit any existing thread, propose a new one. Explain how it relates to existing threads (supports, contradicts, extends).
5. **Present the state of the theory.** After ingestion, summarize not just what was added but how the overall picture changed — which threads gained support, which took a hit, where the tensions are.

## Git

Commits happen at the end of the verification phase (Phase 3), after all three ingest phases are complete and the human has approved. See `.agents/skills/wiki-ops/SKILL.md` verification pass for the commit gate.

Commit message format:

```bash
git add wiki/
git add raw/<source-file-being-ingested.md>
git commit -m "ingest: <source title> — <brief summary of what was created/updated>"
```

**Never use `git add -A`** — it sweeps up untracked raw/ files that haven't been ingested yet. Only stage `wiki/` (all changed + new wiki pages) plus the specific `raw/` source file you ingested. If you ingested multiple sources in a batch, add each one explicitly.

**Raw/ files are committed ONLY at ingest time.** Never commit a `raw/` file during meta/ changes, skill edits, or any other operation. The sole moment a `raw/` file enters git is when you commit the ingest that consumed it — alongside the wiki pages it produced. If you move a file to `raw/` as preparation for later ingest, leave it uncommitted until the ingest happens.

The commit message should be useful in `git log` — include the source name and the scope of changes. If contradictions were flagged, mention them. Include verification status.

## Rules

1. **Never modify or delete files in `raw/`** — that's the source of truth. You may *create* new source files (web content, YouTube stubs) during ingest.
2. **Always update `index.md`** when creating or significantly updating pages.
3. **Always add a `## Related` section** to new pages (concepts, authors, projects) with links to existing pages. Thread pages use inline wiki-links in the body instead.
4. **Always update the `updated` date** in frontmatter when editing a page.
5. **Prefer creating a page over leaving knowledge in chat history.** Good answers, comparisons, and analyses should be filed as wiki pages.
6. **Note contradictions explicitly.** If a new source contradicts an existing claim, flag it with a `> [!warning]` callout, not a silent overwrite. Surface contradictions in the ingest summary and in the relevant thread page so the human can decide.
7. **Ask before deleting pages.** Suggest merges or reorganizations, don't execute unilaterally.
