---
title: Darwin Agent Team
created: 2026-06-17
updated: 2026-06-17
sources:
  - raw/harnessx-composable-adaptive-evolvable-agent-harness-foundry.pdf
tags: [author, agent-harness, self-evolution, reinforcement-learning]
unaudited_marginal: 0
---

# Darwin Agent Team

> The author team behind HarnessX, a composable, adaptive, and evolvable agent harness foundry (arXiv 2606.14249v1, 12 June 2026). The paper is published under a team name; the corresponding authors are Kun Shao and Jian Luan. Core contributors are Tingyang Chen, Shuo Lu, Kang Zhao (equal contribution), and Weicheng Meng. Additional contributors: Hanlin Teng, Tianhao Li, Chao Li, Xule Liu, Jian Liang, Zhizhong Zhang, Yuan Xie, Heng Qu.

## Key Paper

- **HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry** (arXiv 2606.14249v1, 12 June 2026) — Treats the harness as a first-class typed object, evolves it via AEGIS (a four-stage trace-driven engine grounded in the operational mirror between symbolic adaptation and reinforcement learning), and closes the loop with the underlying model via cross-harness GRPO. +14.5% average gain across 5 benchmarks and 3 model families (peak +44.0%); co-evolution adds +4.7% beyond harness-only evolution. See [[harnessx]] for the wiki digest.

## Author Roles

### Core Contributors (equal contribution)
- **Tingyang Chen**\*
- **Shuo Lu**\*
- **Kang Zhao**\*
- **Weicheng Meng**

### Corresponding Authors
- **Kun Shao**†
- **Jian Luan**†

### Additional Contributors
- Hanlin Teng
- Tianhao Li
- Chao Li
- Xule Liu
- Jian Liang
- Zhizhong Zhang
- Yuan Xie
- Heng Qu

\* Equal Contribution
† Corresponding Author

## Relationship to the Wiki

### Theoretical contribution
The Darwin Agent Team's primary contribution is the **operational mirror** — the formal correspondence between symbolic harness evolution and reinforcement learning, with its three predicted pathologies (reward hacking, catastrophic forgetting, under-exploration) and the corresponding architectural defenses. See [[operational-mirror]].

### Empirical contribution
Across 5 benchmarks (ALFWorld, GAIA, WebShop, τ3-Bench, SWE-bench Verified) and 3 model families (Claude Sonnet 4.6, GPT-5.4, Qwen3.5-9B), 14 of 15 model-benchmark configurations improve with an average gain of +14.5% (peak +44.0%). The result is the most comprehensive empirical evidence to date that **harness-level optimization is a primary lever for agent performance, complementary to model scaling**.

### Engineering contribution
The processor abstraction, eight hook points with permitted-modification contracts, and the nine-dimension taxonomy form the most formal harness interface specification in the literature. The AEGIS four-stage pipeline (Digester → Planner → Evolver → Critic) with deterministic gating is the most concrete evolution architecture to date.

## Thread

- [[harness-engineering]] — The Darwin Agent Team's HarnessX is the most complete instantiation of the §5.2.3 self-evolution open problem
- [[agent-quality-engineering]] — AEGIS is the most concrete instance of the feedback flywheel applied to the harness itself

## Related

- [[harnessx]] — The foundry introduced by the team
- [[operational-mirror]] — The team's primary theoretical contribution
- [[variant-isolation]] — The team's primary architectural defense against catastrophic forgetting
- [[harness-model-co-evolution]] — The team's primary extension of the self-evolution paradigm

## Sources

- `raw/harnessx-composable-adaptive-evolvable-agent-harness-foundry.pdf` — Chen, Lu, Zhao, Meng, Shao, Luan et al. (Darwin Agent Team, 2026). *HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry.* arXiv 2606.14249v1 (12 Jun 2026). Full author list on the Contributions and Acknowledgments page (p. 27 of the PDF).
