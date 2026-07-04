# LLM Wiki — Project Schema

This file is the project schema: what the wiki is, how it's organized, who owns what, and the invariant rules. It is intentionally thin. Detailed operational procedures live in skills (`.agents/skills/`). Page formats, templates, and design philosophy live in `meta/`.

## Mission

This wiki is bermudi's effort to compile the best ideas about how to do AI-assisted development with discipline. Your job is to track, file, and connect these ideas — not to treat them as established truth. Every claim is an unproven suggestion. Sources disagree, evidence is thin, and the theory evolves. You're maintaining a map of hypotheses in progress.

## Architecture

Three layers following [the LLM Wiki Manifesto](meta/llm-wiki-manifesto.md):

```
raw/              Source documents. Immutable — the LLM reads but never modifies them. arXiv papers are kept as extracted markdown + provenance frontmatter, not the original PDF.
raw/assets/       Downloaded images referenced by source documents.
wiki/             LLM-generated wiki pages. You own this layer entirely.
wiki/index.md     Content catalog — thread-first, updated after every change.
wiki/threads/     Synthetic essays tracing themes across sources.
wiki/authors/     Entity pages for people and organizations.
wiki/concepts/    Concept pages for ideas, patterns, and technologies.
wiki/projects/    Entity pages for specific tools, frameworks, and products.
meta/             The schema — design philosophy and architecture, co-evolved with the human.
```

Knowledge flows directly from `raw/` into concepts, threads, authors, and projects. There is no intermediate source-summary layer — the wiki pages themselves are the digest. The core idea: instead of RAG (retrieve-then-forget), the LLM incrementally builds and maintains a **persistent, compounding artifact**.

## Ownership Rules

| Layer       | Owner | You can...                        | You cannot...             |
|-------------|-------|-----------------------------------|---------------------------|
| `raw/`      | Human | Read files, create new source files | Modify or delete existing files |
| `wiki/`     | You   | Create, update, reorganize freely | —                         |
| `meta/`     | Both  | Read, propose additions           | Modify without approval   |
| `AGENTS.md` | Both  | Propose changes, apply on approval | —                         |

## Skills

Detailed operational procedures live in skill files. **Always load the relevant skill before executing an operation** — the skill contains step-by-step procedures, checklists, and verification gates.

| Operation | Skill file |
|---|---|
| Ingest a new source | `.agents/skills/wiki-ops/SKILL.md` |
| Answer a question from wiki knowledge | `.agents/skills/wiki-ops/SKILL.md` |
| Lint / health-check the wiki | `.agents/skills/wiki-ops/SKILL.md` |

The wiki-ops skill references detailed sub-procedures in `references/`:
- `references/ingest-flow.md` — Phase 1 filing procedure
- `references/analytical-pass.md` — Phase 2 critical analysis
- `references/verification-pass.md` — Phase 3 verification and commit
- `references/editors.md` — Subagent editor descriptions and invocation patterns

## Where to Find Detail

| What you need | Where it lives |
|---|---|
| **The theory — what the wiki currently believes** | `wiki/index.md` (catalog), then `wiki/threads/*.md` (synthetic essays) |
| Page formats, frontmatter spec, web/YouTube/arXiv source templates | `meta/wiki-conventions.md` |
| Ingest philosophy: theory pressure, thread emergence, contradictions | `.agents/skills/wiki-ops/references/ingest-philosophy.md` |
| Design philosophy and manifesto | `meta/llm-wiki-manifesto.md` |
| Ingest pipeline, query procedure, lint checklist | `.agents/skills/wiki-ops/SKILL.md` |
| Editor descriptions and invocation patterns | `.agents/skills/wiki-ops/references/editors.md` |
| Quick mechanical validation (frontmatter, links, sources) | `./scripts/validate-page` |

## Invariant Rules

1. **Never modify or delete files in `raw/`** — that's the source of truth. You may *create* new source files during ingest.
2. **Always update `index.md`** when creating or significantly updating pages. `index.md` is a catalog only — no `sources:` frontmatter, no `## Sources` section, and no per-ingest source summaries. Git log is the chronology.
3. **Always add a `## Related` section** to new pages (concepts, authors, projects) with links to existing pages.
4. **Always update the `updated` date** in frontmatter when editing a page.
5. **Prefer creating a page over leaving knowledge in chat history.** Good answers, comparisons, and analyses should be filed as wiki pages.
6. **Note contradictions explicitly.** If a new source contradicts an existing claim, flag it with a `> [!warning]` callout, not a silent overwrite. Surface contradictions in the ingest summary and in the relevant thread page.
7. **Ask before deleting pages.** Suggest merges or reorganizations, don't execute unilaterally.
8. **arXiv papers: extract, don't archive.** Store the extracted text as `raw/<arxiv-id>.md` with `type: arxiv` / `arxiv_id` / `url` frontmatter. Never commit the original PDF — it's permanently re-downloadable from the versioned arXiv URL. The `.md` is the source-of-truth. (Non-arXiv papers with no stable URL are the exception: commit the PDF.)
