---
title: Jundong Xu
created: 2026-06-18
updated: 2026-06-18
sources:
  - raw/evoarena-tracking-memory-evolution-for-robust-llm-agents-in-dynamic-environments.md
tags: [author, nus, agent-memory, benchmark, environment-evolution]
unaudited_marginal: 0
---

# Jundong Xu

> Lead author of *EvoArena: Tracking Memory Evolution for Robust LLM Agents in Dynamic Environments* (NUS + collaborators, arXiv 2606.13681, June 2026). Co-creator with Qingchuan Li of the EvoArena benchmark and EvoMem patch-based memory paradigm. Researcher at the National University of Singapore.

## Core Contribution

The EvoArena paper introduces two paired artifacts:

1. **[[evoarena|EvoArena]]** — a benchmark suite for evaluating LLM agents under persistent environment evolution. Three subsets (Terminal-Bench-Evo, SWE-Chain-Evo, PersonaMem-Evo) cover executable workflow evolution, software repository evolution, and preference evolution. Introduces the PE/IC/CE triplet and chain-level evaluation.
2. **[[evomem|EvoMem]]** — a patch-based memory paradigm that augments any base memory system with an append-only patch history. Each non-additive update is recorded with pre-state, post-state, rationale, semantic summary, and triggering evidence. Instantiable across A-Mem, Memento-Skill, Terminus2, and OpenHands without modifying the host construction pipeline.

The paper's central empirical claim: **state collapse** is the dominant failure mode of current memory-based agents in evolving environments, and a small patch-history layer is enough to reduce regressions (Pass-to-Pass failures on SWE-Chain-Evo drop from 9.09% to 6.32%) and improve chain accuracy (Terminal-Bench-Evo: +6.1pp average, the largest single gain in the paper).

## Collaborators

Co-first authors with Qingchuan Li. Co-authors: Jiaying Wu (NUS), Yihuai Lan (SMU), Shuyue Stella Li (UW), Huichi Zhou (UCL), Bowen Jiang (UPenn), Lei Wang (UW), Jun Wang (UCL), Anh Tuan Luu (NTU), Caiming Xiong (Recursive), Hae Won Park (MIT), Bryan Hooi (NUS), Zhiyuan Hu (NUS + MIT). The author list spans eight institutions and three continents.

## Notable Empirical Results

- **State collapse quantified**: base agents achieve 43.6% step accuracy on Terminal-Bench-Evo but only 21.5% chain accuracy — a 22.1pp gap that is consistent across all three subsets.
- **[[evomem|EvoMem]] improves chain accuracy more than step accuracy**: average +2.6% step / +3.7% chain across 8 backbones × 3 subsets. The chain-level gain is 1.4× the step-level gain.
- **EvoMem helps on standard benchmarks too**: +6.5% on GAIA, +3.3% on LoCoMo. Patch-augmented retrieval is not just a recovery mechanism for evolving environments — it also helps on static tasks with hidden version-dependence.
- **Patch-uptake mechanism**: the gain from EvoMem jumps from +2.6% to +8.3% when the agent operationalizes retrieved patches (uses patch terms in subsequent reasoning/commands). The mechanism is genuine, not "more context."
- **Efficiency-accuracy independence**: token budget does not predict accuracy. GPT-5.5 uses 505M tokens to reach 62.8% on Terminal-Bench-Evo; Gemini-3.1-Pro uses 79.2M tokens to reach 53.8%.

## Position in the Wiki

- Names and formalizes [[state-collapse]] as a distinct failure mode of memory-based agents in evolving environments
- Introduces [[chain-accuracy]] as a benchmark metric that complements per-instance accuracy
- Provides the [[evomem|EvoMem]] design pattern as a memory-mechanism extension to the [[harness-mechanisms]] taxonomy
- Extends [[the-benchmark-crisis]] thread with the persistent-environment-evolution axis

## Related

- [[evoarena]] — The benchmark
- [[evomem]] — The memory paradigm
- [[state-collapse]] — The named failure mode
- [[chain-accuracy]] — The evaluation metric
- [[the-benchmark-crisis]] — The thread the paper extends

## Sources

- `raw/evoarena-tracking-memory-evolution-for-robust-llm-agents-in-dynamic-environments.md` — Xu, Li, Wu et al. (NUS + collaborators, arXiv 2606.13681, June 2026). *EvoArena: Tracking Memory Evolution for Robust LLM Agents in Dynamic Environments.* The full paper, 49 pages.