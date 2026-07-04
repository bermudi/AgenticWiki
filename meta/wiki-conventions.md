# Wiki Conventions

> Load this when creating or editing wiki pages. Covers page formats, frontmatter spec, naming rules, and web/YouTube source templates.

## Page Naming

- Kebab-case: `distributed-systems.md`, `map-reduce.md`, `jeff-dean.md`
- One topic per page. Split when a section outgrows its parent.
- Entity pages for people, organizations, projects: `jeff-dean.md`
- Concept pages for ideas, patterns, technologies: `map-reduce.md`
- Thread pages for synthetic essays tracing themes across sources: `threads/the-slop-problem.md`

## Concept / Author / Project Page Format

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

Rules:
- The `> blockquote` immediately after the title is the page summary — it must exist on every page because `index.md` uses it. Keep it to 1-3 sentences.
- Frontmatter `sources` is a machine-readable list of `raw/` filenames. The body `## Sources` section is the human-readable annotated version — each entry notes what the source contributed. Both must stay in sync.
- Frontmatter `unaudited_marginal` tracks how many marginal ingests have touched this page without a verification pass. Increment on each marginal ingest. When it reaches 5, trigger a source verification audit (re-read all sources, check all claims, reset to 0). Full ingest resets it to 0 automatically. Pages created before this field was introduced are treated as 0.

## Thread Page Format

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

## Epistemic Callouts

Use these standard callouts to flag the epistemic status of claims, especially on thread pages where synthesis is highest. Keep them at **claim level**, not page level — a single page may contain sourced facts, synthesized arguments, and speculative extensions simultaneously.

| Callout | Use when | Example |
|---|---|---|
| `> [!note] Departure:` | Sources disagree on a point; the wiki is choosing one path or noting the fork | "Sources disagree on where the human lever should be applied most forcefully..." |
| `> [!warning] Contradiction:` | A new source directly contradicts an existing wiki claim | "The AgentFloor finding that structured prompting actively hurt Gemma 4 contradicts the thread's emphasis on prompt engineering at tier E." |
| `> [!note] Synthesis:` | The wiki author's own synthesis — not stated by any single source, but inferred from multiple | "The reconciliation is the wiki author's synthesis, not stated by Horthy..." |
| `> [!note] Extension:` | A reasonable extrapolation beyond what sources claim, but unvalidated | "it's a reasonable but unvalidated extension" |

Rules:
- Thread pages (high synthesis) should use at least one callout. The validator warns if they don't.
- Concept pages (mostly source summary) don't need callouts unless making claims beyond the sources.
- Never use a callout to water down a well-sourced claim — reserve them for genuinely uncertain or synthesized territory.
- Prefer specificity over generality: `Extension: grey-box toolchain` is better than `Extension: this whole section`.

## Cross-References

- Use Obsidian wiki-links: `[[page-name]]` (no `.md` extension)
- Always add a brief note explaining the relationship: `[[page-name]] — why it's linked`
- When creating a new page, add links to it from at least 2-3 existing pages that relate to it
- When updating a page, check if other pages need updating too (follow the body wiki-links and the `## Thread` section on concept pages)
- Concepts that belong to a thread must have a `## Thread` section linking back to it

## index.md Format

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

`wiki/index.md` is a catalog only. It must not contain `sources:` frontmatter, a `## Sources` section, or per-ingest source summaries. Sources are tracked per-page in `## Sources` sections pointing to `raw/` files. Git log provides the timeline. No centralized source list needed.

## Web Source Format

When ingesting a web source, always fetch and save the actual content to `raw/` — not a summary stub. Use `curl` or Jina Reader (`https://r.jina.ai/<url>`) to extract the full text. The file in `raw/` should be the verbatim source content that a future session can re-read in full.

Never replace source content with extracted key points. The whole point of `raw/` is that it preserves the original so wiki pages can be re-derived from it.

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

## YouTube Source Stub Format

YouTube content may arrive either as a transcript file already in `raw/` or as inline content from a Gemini extension. **Only create a source stub in `raw/` when the content arrived inline and no file already exists on disk.** If a transcript file (`raw/*.md`) already exists, it IS the source — do not create a stub.

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

## arXiv / Paper Source Format

arXiv papers are **never committed as PDFs** — the original is permanently re-downloadable from the versioned arXiv URL, and binaries bloat the repo (clone, push, history). The source-of-truth in `raw/` is the **extracted text as markdown**, with provenance frontmatter pointing back to arXiv.

Acquire + extract in one step:

```bash
# Download from the versioned arXiv URL, then extract text
curl -sL "https://arxiv.org/pdf/<ARXIV_ID>" -o /tmp/paper.pdf
lit parse /tmp/paper.pdf --no-ocr -o "raw/<arxiv-id>.md"
```

Then prepend provenance frontmatter to the extracted file:

```markdown
---
type: arxiv
arxiv_id: 2512.08296
url: https://arxiv.org/abs/2512.08296
---

<extracted text follows>
```

Rules:
- **Never `git add` the `.pdf`.** It stays out of the repo entirely. If it arrived as a local file, extract the text and `trash` the original.
- **Filename:** `raw/<arxiv-id>.md` (e.g. `raw/2512.08296.md`), or a descriptive slug if the ID isn't handy — the `arxiv_id` frontmatter is the canonical pointer either way.
- **Verify the ID.** Confirm the arXiv ID against the paper's own page-1 submission stamp (preserved in the extract) before relying on it — filenames and citations can drift.
- **Frontmatter travels with the file.** This is the "reference to the online arXiv"; there is no centralized source list (per the `index.md` rule).
- Wiki pages cite these as `raw/<arxiv-id>.md` in their `sources` frontmatter and `## Sources` sections, same as any `raw/` file.

For non-arXiv papers with no stable versioned URL, commit the PDF itself — it's the only durable copy.
