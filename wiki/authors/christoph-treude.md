---
title: Christoph Treude
created: 2026-05-10
updated: 2026-05-10
sources:
  - raw/2601.20404v1.md
unaudited_marginal: 0
tags: [author, empirical-se, ai-coding-agents]
---

# Christoph Treude

> Associate Professor at Singapore Management University and leading researcher in empirical software engineering. Co-author of multiple studies on AI coding agents and AGENTS.md files, including the first empirical investigation of their efficiency impact.

## Research

Treude has made significant contributions to understanding AGENTS.md files in practice. Key work includes:

- **Lulla et al. (2026)** — The first empirical study isolating the impact of AGENTS.md on coding agent efficiency (wall-clock time and token consumption) using a paired within-task design. Found that AGENTS.md reduces median runtime by ~28% and output token consumption by ~17%.
- Broader empirical SE research examining how AI coding agents interact with repository-level artifacts.

The efficiency study is notable for its clean experimental design — same tasks, same repository snapshots, varying only the presence of AGENTS.md — and its focus on operational metrics (runtime, tokens) as a complement to the correctness-focused evaluations common in the SWE-bench tradition.

## Thread

- [[tool-design-for-agents]] — Efficiency evidence informs context file design decisions; complements the correctness evidence from Gloaguen et al.
- [[agent-quality-engineering]] — Efficiency as a dimension of agent quality alongside correctness; the two must be evaluated together

## Related

- [[context-files]] — The artifact his research evaluates
- [[thibaud-gloaguen]] — Lead author of the complementary correctness-focused evaluation

## Sources

- `raw/2601.20404v1.md` — Co-author of the AGENTS.md efficiency study
