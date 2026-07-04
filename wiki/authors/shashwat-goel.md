---
title: Shashwat Goel
created: 2026-07-03
updated: 2026-07-04
sources:
  - raw/2509.09677.md
tags: [author, researcher, long-horizon-execution, scaling, execution]
unaudited_marginal: 0
---

# Shashwat Goel

> Researcher at the Max Planck Institute for Intelligent Systems / ELLIS Institute Tübingen; conceived and led the planning of *The Illusion of Diminishing Returns: Measuring Long Horizon Execution in LLMs* (ICLR 2026), co-authored with Akshit Sinha, Arvindh Arun, Steffen Staab, and Jonas Geiping. The paper introduced [[horizon-length]] as a formal metric and named the [[self-conditioning]] failure mode.

## Contribution

Lead conceiver and planning lead of the long-horizon-execution study (per the paper's author-contribution statement: "SG conceived the project… SG led their planning"). Akshit Sinha (Cambridge) led the execution of the experiments; Arvindh Arun (Stuttgart) contributed equally as a co-first author. Steffen Staab (Stuttgart / Southampton) and Jonas Geiping (MPI / ELLIS Tübingen) advised.

The work sits in a live methodological dispute — over whether long-task failures are reasoning/planning failures (Shojaee et al., 2025; Kambhampati et al., 2024) or execution failures — and takes the execution side. By isolating execution with a controlled key-value task, the paper separates the two and shows execution alone is a substantial, under-studied bottleneck.

Concepts introduced to the wiki:

- [[horizon-length]] — the formal metric (H_s = ln(s)/ln(p)) and the "diminishing returns is an illusion" thesis
- [[self-conditioning]] — the named failure mode where models degrade on their own error-laden history

## Significance to the Wiki

The paper supplies the mathematical inverse of [[compounding-booboos]]: the same p^t compounding the wiki frames as risk is, past the accuracy threshold, the reason scaling pays. It also adds a fifth axis to [[the-benchmark-crisis]] (horizon mismatch) and an execution-centric reading of [[jagged-frontier]]. It is one of the strongest positive scaling results in the wiki's corpus, and a useful counterweight to the generally skeptical tone of the benchmark-crisis and multi-agent-illusion work.

## Co-Authors

- **Akshit Sinha** (University of Cambridge) — equal-contribution first author; led execution of experiments
- **Arvindh Arun** (Institute for AI, University of Stuttgart) — equal-contribution first author
- **Steffen Staab** (University of Stuttgart / University of Southampton) — advisor
- **Jonas Geiping** (MPI for Intelligent Systems / ELLIS Institute Tübingen / Tübingen AI Center) — advisor

## Thread

- [[the-benchmark-crisis]] — the paper adds the horizon-mismatch axis to the measurement crisis
- [[the-verifiability-thesis]] — execution length as the economically meaningful capability metric

## Related

- [[horizon-length]] — the metric his paper formalizes
- [[self-conditioning]] — the failure mode his paper names
- [[compounding-booboos]] — the risk face of the same compounding dynamic
- [[the-benchmark-crisis]] — the paper adds the horizon-mismatch axis
- [[jagged-frontier]] — execution length as a frontier-separating axis

## Sources

- `raw/2509.09677.md` — Sinha, Arun, Goel, Staab, Geiping (ICLR 2026). *The Illusion of Diminishing Returns: Measuring Long Horizon Execution in LLMs.* arXiv 2509.09677v3. Author contributions and affiliations from the paper front matter.
