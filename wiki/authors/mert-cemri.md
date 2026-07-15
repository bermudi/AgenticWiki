---
title: Mert Cemri
created: 2026-07-03
updated: 2026-07-14
sources:
  - raw/2503.13657.md
tags: [author, researcher, multi-agent, failure-taxonomy]
unaudited_marginal: 0
---

# Mert Cemri

> Lead author (with Melissa Z. Pan and Shuyi Yang, equal contribution) of *Why Do Multi-Agent LLM Systems Fail?* (NeurIPS 2025 Datasets & Benchmarks). Researcher at UC Berkeley working with the Sky Computing / LMSys group (Keutzer, Parameswaran, Klein, Ramchandran, Zaharia, Gonzalez, Stoica). Co-created the [[mast]] failure taxonomy and MAST-Data — the first empirically grounded MAS failure dataset.

## Work

- **[[mast]] / MAST-Data** (Cemri, Pan, Yang et al., 2025): the first empirically grounded Multi-Agent System Failure Taxonomy and the first large-scale annotated MAS failure dataset (1642 traces, 7 frameworks, 4 model families). Built via Grounded Theory with κ=0.88 inter-annotator agreement; LLM-as-a-Judge annotator calibrated to κ=0.77. Released as open-source (`agentdash` pip package, HuggingFace dataset).

## Affiliations & Collaborators

UC Berkeley — shared with the LMSys / Sky Computing lab (Ion Stoica, Joseph Gonzalez, Matei Zaharia, Dan Klein). Co-authors include Kurt Keutzer, Aditya Parameswaran, Kannan Ramchandran. The work sits in the same empirical-systems tradition as the [[multi-agent-illusion]] audit (which shares the Berkeley lineage via Stoica/Gonzalez/Zaharia) — the two papers are complementary diagnostics of the same MAS-reliability problem.

## Related

- [[mast]] — the taxonomy and dataset
- [[multi-agent-illusion]] — the complementary cost-controlled audit (Jwalapuram et al.); same empirical territory, different question (why vs. whether)
- [[prathyusha-jwalapuram]] — lead author of the multi-agent-illusion audit; the two papers form the wiki's empirical MAS-reliability cluster
- [[the-multi-agent-theory]] — the thread that traces the full six-paper theory; Cemri's work is Layer 2 (the diagnosis)

## Sources

- `raw/2503.13657.md` — Cemri, Pan, Yang et al. *Why Do Multi-Agent LLM Systems Fail?* NeurIPS 2025 Datasets & Benchmarks (arXiv 2503.13657v3, 26 Oct 2025). Lead author (equal contribution with Melissa Z. Pan and Shuyi Yang). Co-created the [[mast]] taxonomy and MAST-Data (1642 traces, 7 frameworks, 4 model families).
