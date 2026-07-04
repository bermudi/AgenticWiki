---
title: Philippe Laban
created: 2026-05-02
updated: 2026-05-02
sources:
  - raw/2604.15597v1.md
tags: [author, researcher, microsoft, llm-evaluation]
---

# Philippe Laban

> Researcher at Microsoft Research and lead author of DELEGATE-52, a large-scale benchmark revealing that LLMs silently corrupt documents during long delegated workflows.

## Work

Philippe Laban works at Microsoft Research. His recent research focuses on evaluating LLM reliability in long-horizon, multi-domain delegated workflows.

## DELEGATE-52

Laban led the creation of [[delegate-52|DELEGATE-52]], a benchmark spanning 52 professional domains and 310 work environments designed to measure document degradation over repeated LLM editing interactions. The benchmark introduced the [[round-trip-relay|round-trip relay]] evaluation method and found that even frontier models corrupt an average of 25% of document content over 20 interactions.

Co-authors on the paper: **Tobias Schnabel** and **Jennifer Neville**.

## Selected Publications

- *LLMs Corrupt Your Documents When You Delegate* (2026) — arXiv:2604.15597v1. Introduces DELEGATE-52 and the round-trip relay method.
- Laban et al. (2025) — Work on LLM performance in multi-turn settings.
- Laban et al. (2024) — Work on long-context LLM degradation.
- Laban et al. (2023) — Work on text simplification evaluation.

## Related
- [[delegate-52]] — The benchmark he led
- [[document-degradation]] — The core finding of his 2026 paper
- [[round-trip-relay]] — The evaluation method he co-developed
- Microsoft Research — Employer

## Sources
- `raw/2604.15597v1.md` — Authorship, affiliation, acknowledgements, and prior work references
