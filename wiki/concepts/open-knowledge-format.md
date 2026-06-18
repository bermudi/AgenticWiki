---
title: Open Knowledge Format (OKF)
created: 2026-06-17
updated: 2026-06-17
sources:
  - raw/how-the-open-knowledge-format-can-improve-data-sharing.md
  - raw/open-knowledge-format-spec-v0.1.md
unaudited_marginal: 0
tags: [concept, knowledge-format, llm-wiki, standardization, metadata, interop]
---

# Open Knowledge Format (OKF)

> An open specification published by Google Cloud (June 2026) that formalizes the [[andrej-karpathy|Karpathy]] LLM-wiki pattern into a portable, interoperable format. A bundle is a directory of markdown files with YAML frontmatter; the v0.1 spec is deliberately minimal — one required field (`type`), two reserved filenames, three conformance criteria — standardizing only the interop surface and punting on taxonomy, link typing, and content model.

## What OKF Is

Published 2026-06-12 as **v0.1 (Draft)**, OKF is Google Cloud's attempt to standardize the family of patterns that have emerged independently over the past year: Karpathy's LLM-wiki gist, Obsidian vaults wired to coding agents, the AGENTS.md / CLAUDE.md family of convention files, and "metadata as code" repositories inside data teams. The blog's framing is explicit — "What's missing is a format, not another service" — positioning OKF as the lingua franca these bespoke instances can exchange through.

The contribution is the spec, not a platform. Google ships reference implementations (an enrichment agent and a static HTML visualizer) as proofs of concept, but the README stresses that "nothing about the format requires a specific agent framework or LLM" and "nothing about the format requires HTML or a graph view."

## The v0.1 Design

### Bundle structure

A **bundle** is a directory tree of markdown files. The directory structure is domain-independent — producers organize concepts however makes sense. Two filenames are reserved with defined meaning at any level of the hierarchy:

| Filename   | Purpose                                              |
|------------|------------------------------------------------------|
| `index.md` | Directory listing for progressive disclosure (§6)    |
| `log.md`   | Chronological history of updates (§7)                |

All other `.md` files are concept documents. The unit of distribution is the bundle — shippable as a git repo (recommended), tarball, or subdirectory.

### Concept documents

Every concept is a UTF-8 markdown file with two parts: a YAML frontmatter block and a markdown body.

**Frontmatter — only `type` is required:**

```yaml
---
type: <Type name>                  # REQUIRED
title: <Optional display name>
description: <Optional one-line summary>
resource: <Optional canonical URI for the underlying asset>
tags: [<tag>, <tag>, …]            # Optional
timestamp: <ISO 8601 datetime>     # Optional last-modified time
# … other producer-defined key/value pairs
---
```

`type` is a short string identifying the kind of concept (`BigQuery Table`, `API Endpoint`, `Metric`, `Playbook`, etc.). Type values are **not** registered centrally. Consumers MUST tolerate unknown types gracefully, typically by treating them as generic concepts.

**Body** is standard markdown. Three section headings have conventional meaning: `# Schema` (structured column/field descriptions), `# Examples` (usage examples), `# Citations` (external sources backing claims — see §8). No body section is required.

### Cross-linking

Concepts link to each other with normal markdown links. Two forms: **absolute** (bundle-relative, beginning with `/` — recommended because stable under file moves) and **relative** (standard markdown relative paths). Link semantics are deliberately untyped — §5.3 states that "consumers that build a graph view typically treat all links as directed edges of an untyped relationship." The specific kind of relationship (parent/child, references, joins-with, depends-on) is conveyed by surrounding prose, not by the link itself. Consumers MUST tolerate broken links.

### Citations (§8)

Per-claim sourcing lives under a `# Citations` heading at the bottom of a document, numbered. Citation links MAY be absolute URLs, bundle-relative paths, or — notably — paths into a `references/` subdirectory that mirrors external material as first-class OKF concepts. The three sample bundles exercise this pattern.

### Conformance (§9)

A bundle is conformant with OKF v0.1 if:

1. Every non-reserved `.md` file contains parseable YAML frontmatter.
2. Every frontmatter block contains a non-empty `type` field.
3. Every reserved filename follows the §6/§7 structure when present.

The load-bearing interop clause is stated as a hard `MUST NOT`: consumers must not reject a bundle because of missing optional fields, unknown `type` values, unknown additional frontmatter keys, broken cross-links, or missing `index.md` files. This permissive consumption model is what makes superset-conformance safe — a producer can carry richer frontmatter than the spec defines and remain conformant.

### Versioning (§11)

Bundles MAY declare the OKF version they target via `okf_version: "0.1"` in a bundle-root `index.md` frontmatter block (the only place frontmatter is permitted in an `index.md`). Consumers that do not understand the declared version SHOULD attempt best-effort consumption. Minor bumps add backward-compatible additions; major bumps may break.

## Three Design Principles

The blog names three principles behind the design:

1. **Minimally opinionated.** OKF requires exactly one thing of every concept: a `type` field. The spec defines the interoperability surface, not the content model.
2. **Producer/consumer independence.** The same bundle hand-authored by a human can be consumed by an AI agent; generated by a metadata export pipeline and browsed in a visualizer; or synthesized by one LLM and queried by another. The format is the contract; tooling at each end is independently swappable.
3. **Format, not platform.** Not tied to any cloud, database, model provider, or agent framework. "The value of a knowledge format comes from how many parties speak it, not from who owns it."

## What Ships With the Spec

Reference implementations at both ends of the producer/consumer split:

- **Enrichment agent** — walks a BigQuery dataset, drafts a concept document for every table and view, then runs a second LLM pass that crawls authoritative documentation and enriches each concept with citations, schemas, and join paths.
- **Static HTML visualizer** — turns any OKF bundle into an interactive graph view in a single self-contained file. No backend, no install, no data leaves the page.
- **Three sample bundles** checked into the repo as living examples of conformant OKF: GA4 e-commerce, Stack Overflow, and Bitcoin public datasets.

> [!note] Departure: LLM-generated knowledge vs. LLM-generated context
> OKF's flagship producer is an LLM (the enrichment agent), and the blog anticipates a world of bundles "synthesized by one LLM and queried by another." This sits in unresolved tension with the [[context-files]] empirical evidence: Gloaguen et al. (2026) found that **LLM-generated context artifacts degrade the consuming agent** — LLM-authored AGENTS.md files reduced task success by 0.5–2%, raised inference cost >20%, and increased reasoning tokens 14–22%. OKF does not address whether auto-generated bundles would degrade consuming agents the same way. The tension is real but not a flat contradiction: context files are operational instructions loaded into the system prompt at every turn, whereas OKF bundles are on-demand reference knowledge the agent pulls selectively. The degradation mechanism (redundant prose, reasoning overhead) may or may not transfer across that distinction. It is an open question — and a concrete risk for OKF's auto-generation use case — that neither the spec nor the announcement engages.

## What the Spec Deliberately Does Not Model

The discipline of v0.1 is visible as much in what it refuses to standardize as in what it pins down:

- **No type taxonomy.** "Type values are not registered centrally." Two conformant bundles can have zero semantic overlap in their types. The format interoperates; the content does not.
- **No typed links.** Graph consumers treat all links as untyped directed edges. Join-with, depends-on, parent-of are all conveyed by prose.
- **No content model.** No required body sections, no schema for what a "Metric" or "Playbook" must contain.
- **No contradiction or temporal-validity primitives.** `log.md` records dated change history as prose, but there is no spec-level way to assert "claim X is contradicted by source Y" or "this was true as of date D." Provenance is per-claim via `# Citations`, not document-level lineage.
- **No source-vs-derived layer distinction.** Every non-reserved file is a first-class concept. The `references/` subdirectory pattern is the closest analog to an immutable source layer, and it is producer convention, not spec.

> [!note] Synthesis: where this wiki is ahead of the spec
> The two gaps above — contradiction handling and the raw-vs-derived layer distinction — are areas where bespoke LLM-wiki instances (including this one) already do work the spec doesn't model. This wiki's `> [!warning] Contradiction:` callout convention and its immutable `raw/` source layer feeding derived `wiki/` pages are both richer than OKF v0.1. They are expressible as producer extensions under the §9 permissive-consumption rule, but they are not portable across bundles because the spec has no vocabulary for them. This is a prediction about where v0.2 pressure will land, not a criticism of v0.1 — the minimalism is the right call for earning speakers.

## Standardization Precedent

OKF follows the same play as the [[agent-skills]] open standard: publish a minimal format spec, license it openly, ship reference implementations, and let the ecosystem grow. Both treat the format as the contribution and the tooling as proof-of-concept. The bet in both cases is the same — the value of a knowledge/procedural format comes from speaker count, not ownership.

The pattern this formalizes is the [[andrej-karpathy|Karpathy]] LLM-wiki recipe: `raw/` sources compiled by an LLM into an interlinked markdown wiki, with Q&A, linting, and incremental enhancement — the same architecture documented in this project's own `meta/llm-wiki-manifesto.md`.

## Thread

- [[the-agent-workflow]] — OKF formalizes the knowledge-base layer that agents operate against; the bundle is the persistent, compounding artifact Karpathy describes

## Related

- [[andrej-karpathy]] — Originator of the LLM-wiki pattern that OKF formalizes; cited by name in the announcement
- [[context-files]] — The AGENTS.md / CLAUDE.md family is named in the blog as a related bespoke instance of the same pattern OKF standardizes
- [[agent-skills]] — Parallel precedent: minimal open format spec + reference implementations, betting that speaker count beats ownership
- [[procedural-knowledge]] — Cognitive-science framing that underpins both skills (procedural) and OKF concepts (semantic/declarative knowledge)
- [[knowledge-triplet]] — OKF bundles push "what's in the codebase" into a structured, queryable form that narrows the fabrication gap
- [[context-engineering]] — OKF is a context-engineering primitive at the organization scale: structured, queryable knowledge that agents load on demand instead of re-deriving from raw sources

## Sources

- `raw/how-the-open-knowledge-format-can-improve-data-sharing.md` — Google Cloud blog announcement (2026-06-12). Frames the fragmented-context problem, names OKF as the format-not-service answer, describes the three design principles, and lists the reference implementations and sample bundles.
- `raw/open-knowledge-format-spec-v0.1.md` — The v0.1 specification itself. Defines terminology (§2), bundle structure and reserved filenames (§3), concept frontmatter with only `type` required (§4), cross-linking with untyped semantics (§5), index/log files (§6–7), citations and the `references/` pattern (§8), the three conformance criteria plus the MUST NOT permissive-consumption clause (§9), and versioning (§11).
