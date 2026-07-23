---
title: Ruhan Wang
created: 2026-07-23
updated: 2026-07-23
sources:
  - raw/2607.13285v1.md
unaudited_marginal: 0
tags: [author, agent-harness, code-understanding, behavior-localization]
---

# Ruhan Wang

> Lead author of *Harness Handbook: Making Evolving Agent Harnesses Readable, Navigable, and Editable* (arXiv 2607.13285, 2026) — a behavior-centric representation that maps what an agent harness does to the exact source locations that implement it, so coding agents can localize where a change must land before planning the edit.

## Work

- **Harness Handbook** (2026, with Yucheng Shi, Zongxia Li, Zhongzhi Li, Yue Yu, Junyao Yang, Kishan Panaganti, Haitao Mi, Dongruo Zhou, Leoweiliang). Introduces **behavior localization** as the prerequisite bottleneck in harness evolution, the **Harness Handbook** representation (L1–L3 document tree + cross-stage state-register view), an automated construction pipeline (static program analysis + LLM-assisted behavioral structuring, two leaf modes), **Behavior-Guided Progressive Disclosure (BGPD)**, and automatic resynchronization on every code diff. Evaluated on Terminus-2 and Codex harnesses: Handbook-Assisted planning improves localization and edit-plan quality while using fewer planner tokens.

Wang's broader publication record (per the paper's references) centers on uncertainty-aware and federated LLM reasoning — e.g., *Federated In-Context Learning* (arXiv 2506.07440) and *FERA: Uncertainty-Aware Federated Reasoning* (arXiv 2605.10082) — indicating a research thread in federated/uncertainty-aware inference that the Harness Handbook work extends into agent-harness engineering.

## Thread

- [[harness-engineering]] — Wang's Harness Handbook reframes harness evolution around a localization prerequisite

## Related

- [[harness-handbook]] — The paper Wang leads; behavior-centric harness representation + BGPD + resync

## Sources

- `raw/2607.13285v1.md` — Wang, Shi, Li, Li, Yu, Yang, Panaganti, Mi, Zhou, Leoweiliang (2026). *Harness Handbook: Making Evolving Agent Harnesses Readable, Navigable, and Editable.* arXiv 2607.13285v1 (14 Jul 2026). Author affiliation: Tencent HY LLM Frontier + Indiana University (internship at Tencent Seattle); lead author (ruhwang@iu.edu). The paper's reference list also cites two earlier Wang-led works on federated/uncertainty-aware LLM reasoning — *Federated In-Context Learning* (arXiv 2506.07440) and *FERA: Uncertainty-Aware Federated Reasoning* (arXiv 2605.10082) — supporting the broader-research-record note in the body.
