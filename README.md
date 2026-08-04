# AgenticWiki

> A personal wiki that compiles the best current ideas about how to do
> AI-assisted development with discipline. Maintained by bermudi, written
> by the LLM, source-of-truth in git, browsable in Obsidian.

**If you want to operate the wiki, start with the plain-language [`USER-MANUAL.md`](USER-MANUAL.md).** It explains what to ask for, what the agents do, what requires approval, when commits happen, and what never runs automatically.

The whole project is a [Karpathy-style LLM wiki](meta/llm-wiki-manifesto.md):
the LLM incrementally builds and maintains a persistent, interlinked
collection of markdown pages that compounds over time. Sources go in
`raw/` (immutable); the LLM reads them, files them into the wiki, and
keeps the cross-references, contradictions, and synthesis current.

## Structure

```
USER-MANUAL.md    Plain-language operating guide for the human owner.
raw/              Append-only source collection — agents may add artifacts; existing files are immutable.
wiki/             LLM-generated wiki pages (the digest).
  index.md        Content catalog — threads, authors, concepts, projects.
  threads/        Synthetic essays tracing themes across sources.
  authors/        Entity pages for people and organizations.
  concepts/       Idea / pattern / technology pages.
  projects/       Specific tools, frameworks, and products.
meta/             The schema — design philosophy and conventions.
scripts/          Local lint and validation helpers.
.agents/skills/   Operational procedures for ingest, query, audit, and verification.
archive/          Retired workflow artifacts.
```

The architecture, ownership rules, and invariant map live in
[`AGENTS.md`](AGENTS.md). The design philosophy — *why* this layout,
*what* it is good for — is in
[`meta/llm-wiki-manifesto.md`](meta/llm-wiki-manifesto.md). Mechanical
page/source conventions live in
[`meta/wiki-conventions.md`](meta/wiki-conventions.md), while active
filing, query, audit, and verification procedures live under
[`.agents/skills/`](.agents/skills/).

## Reading order

If you are new to the project, read in this order:

1. **[`USER-MANUAL.md`](USER-MANUAL.md)** — how to operate the wiki and understand agent activity.
2. **[`wiki/index.md`](wiki/index.md)** — the catalog. Pick a thread that interests you and follow links from there.
3. **[`meta/llm-wiki-manifesto.md`](meta/llm-wiki-manifesto.md)** — what this is and why it works.
4. **[`AGENTS.md`](AGENTS.md)** — technical schema, ownership, and invariant rules for agents.

## License

This repository is licensed under the
[Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).
See [`LICENSE`](LICENSE) for the full legal text.

In short: you can share and adapt the licensed wiki material for any
purpose, including commercially, as long as you satisfy the attribution
and notice requirements in the license. CC BY 4.0 is not a share-alike
license; consult the license text for the actual terms.

## Caveats

This is a **hypothesis map, not a textbook.** Every claim in the wiki
is an unproven suggestion extracted from a source — sources disagree,
evidence is thin, and the theory evolves. Contradictions are flagged
in-line with `> [!warning]` callouts. The git log is the chronology;
this README is a static entry point.

The wiki content is licensed CC BY 4.0. The **source materials in
`raw/` are not covered by this license** — they retain their original
copyrights. They are preserved for the maintainer's research and
quotation workflow with provenance; whether a particular use is fair
use depends on context. See each `raw/*.md` file's frontmatter for the
original URL, author, and date.

## Contributing

This is a personal research artifact, not an open-source project with
a contribution model. Pull requests will not be merged. The wiki is
browsable as-is; if it inspires you to build your own, the manifesto
is the starting point.

## Credits

- **Design pattern:** [Andrej Karpathy — *LLM Wiki*](https://gist.githubusercontent.com/karpathy/442a6bf555914893e9891c11519de94f)
  (gist, 2025-04-02). The three-layer architecture (raw / wiki / meta)
  and the "persistent compounding artifact" framing come from this
  document.
- **Sources:** material sourced claims should trace to files in `raw/`.
  Per-page `## Sources` sections list which source contributed what;
  cross-source synthesis and unresolved evidence gaps are labeled rather
  than presented as direct source claims. Provenance frontmatter on each
  `raw/*.md` points to the original.
- **Maintainer:** [bermudi](https://github.com/bermudi) (human
  curator). LLM does the bookkeeping; the human does the curating.
