---
title: Capability Saturation
created: 2026-07-03
updated: 2026-07-03
sources:
  - raw/2512.08296-scaling-agent-systems.pdf
  - raw/the-illusion-of-multi-agent-advantage.pdf
tags: [concept, multi-agent, scaling, empirical, threshold, mas-audit]
unaudited_marginal: 0
---

# Capability Saturation

> The most robustly supported finding in the [[scaling-agent-systems|Kim et al. scaling study]] (260 configurations, 6 benchmarks, 3 LLM families): once a single-agent baseline exceeds ~45% accuracy on a task, adding multi-agent coordination yields diminishing or negative returns. The coordination overhead becomes a net cost when baseline performance is already high. This is the quantitative threshold that explains and sharpens the [[multi-agent-illusion]]'s qualitative "capability floor."

## The Finding

The scaling study's regression model (Eq. 1) identifies the **baseline paradox** as the single most robust predictor of MAS performance. The interaction term `SA × log(1 + n_agents)` has coefficient β = -0.236 (95% CI: [-0.396, -0.076], p = 0.004). The negative coefficient means: the higher the single-agent baseline (SA), the more negative the returns from adding agents (n).

The decision boundary, derived purely from the fitted model:

```
SA* ≈ 0.040 / 0.236 ≈ 0.170  (standardized)
```

which corresponds to **raw performance ≈ 0.45** after denormalization. Below 45% single-agent baseline, MAS can help. Above it, MAS hurts.

## Robustness

This is the only finding that survives both correction approaches simultaneously:

| Correction | Result |
|---|---|
| Cluster-robust inference (clustering on dataset, k=6) | p = 0.004 — survives |
| Holm-Bonferroni multiple-comparison correction (19 predictors) | Holm = 0.018 — survives |
| Both applied | **Only predictor surviving at α = 0.05 under both** |

The 45% threshold achieves a 94% match rate across all 16 model×benchmark configurations on SWE-bench Verified and Terminal-Bench (p < 0.001 by binomial test).

## Empirical Evidence

| Benchmark | SAS baseline | Best MAS result | Verdict |
|---|---|---|---|
| Finance Agent | 0.349 (below threshold) | Centralized +80.8% | MAS helps |
| Terminal-Bench | 0.344 (below threshold) | Independent +1.7%, Centralized -19.2% | Mixed (low tool count limits benefit) |
| Workbench | 0.629 (above threshold) | Decentralized +5.6%, Centralized -1.2% | Marginal / negative |
| SWE-bench Verified | 0.522 (above threshold) | All MAS architectures -2.1% to -14.9% | Universal degradation |
| PlanCraft | 0.568 (above threshold) | All MAS architectures -39% to -70% | Universal degradation |

The pattern is consistent: tasks where the model already performs well (SWE-bench, PlanCraft) see MAS degrade performance. Tasks where the model struggles (Finance Agent) see MAS provide genuine gains — but only with the right architecture.

## Mechanism

The saturation operates through fixed computational budgets. The scaling study matched total reasoning-token budgets across MAS and SAS configurations. Under this constraint:

- When SA is **low**, agents have residual reasoning capacity after local computation. Inter-agent messages reduce variance through redundancy elimination and enable synthesis of partial solutions.
- When SA is **high**, intra-agent reasoning for the task itself consumes most available tokens. Subsequent inter-agent messages compress reasoning quality, producing strong negative returns.

The capability saturation is not about model intelligence per se — it's about the **gap between current performance and ceiling performance** on a specific task. A frontier model on an easy task saturates; a weaker model on a hard task does not.

## Relationship to the Capability Floor

The [[multi-agent-illusion]] audit identified a qualitative "capability floor": MAS can only elevate a backbone that already has the reasoning capability to navigate coordination overhead. Mid-tier models (GPT-4o, GPT-OSS-120B) get no consistent lift from MAS; a single-agent GPT-5 with CoT-SC outperforms sophisticated GPT-4o-based MAS.

Capability saturation is the **quantitative refinement**:

| Concept | Source | Claim |
|---|---|---|
| Capability floor | [[multi-agent-illusion]] (qualitative) | Mid-tier backbones don't benefit from MAS; the backbone must already be capable |
| Capability saturation | [[scaling-agent-systems]] (quantitative) | Regardless of backbone tier, once SA > ~45% on a task, MAS yields negative returns |

The two findings converge: MAS helps when the model *can* reason but *hasn't yet* solved the task. Once the model is already solving the task well (whether because it's capable or because the task is easy), coordination overhead is pure cost.

## What This Does Not Say

Capability saturation does **not** say "never use MAS on easy tasks." It says: under matched compute budgets, MAS is net-negative above 45%. The [[expert-mas]] baseline demonstrates that hand-designed MAS *can* still help above the threshold when the architecture is engineered for the task's decomposability — Expert-MAS takes GPT-5 from 57.0% to 96.5% on SMFR, well above the 45% line. The difference: Expert-MAS uses deterministic orchestration with typed decomposition, not generic multi-agent coordination. The saturation threshold applies to the canonical architectures the scaling study tested (Independent, Centralized, Decentralized, Hybrid), not to all conceivable MAS designs.

## Thread

- [[the-agent-workflow]] — the saturation threshold is the quantitative answer to "when does multi-agent coordination actually help?" in the workflow thread
- [[the-verifiability-thesis]] — the threshold is a verifiability boundary: tasks you can already verify well (high SA) don't benefit from coordination overhead

## Related

- [[scaling-agent-systems]] — the umbrella framework; capability saturation is its most robust finding
- [[multi-agent-illusion]] — the qualitative capability floor that saturation quantifies
- [[expert-mas]] — the hand-designed baseline that escapes saturation through deterministic orchestration
- [[mast]] — the failure taxonomy; FC3 Task Verification (23.5%) is the diagnostic for why MAS degrades above the threshold: verification overhead without verification benefit
- [[tool-coordination-trade-off]] — the second robust finding from the same regression; orthogonal to saturation (tool count, not baseline performance)
- [[functional-collapse]] — the runtime mechanism behind saturation in automated MAS: agents converge on a single answer, making coordination overhead pure waste

## Sources

- `raw/2512.08296-scaling-agent-systems.pdf` — Kim, Gu, Park et al. (Google Research + Google DeepMind + MIT, arXiv 2512.08296v3, 8 Apr 2026). §4.3 scaling principles (Eq. 1, Table 4 coefficients, SA × log(1+n) interaction β = -0.236); §4.5 robustness (cluster-robust p = 0.004, Holm-Bonferroni Holm = 0.018, 94% match rate); §4.2 main results (per-benchmark SAS baselines and MAS deltas); §5 limitations (vi); §6 conclusion (capability saturation as most robust effect).
- `raw/the-illusion-of-multi-agent-advantage.pdf` — Jwalapuram, Lin et al. (Salesforce Research + HKUST-GZ + UBC + NTU, arXiv 2606.13003v2, 13 Jun 2026). Source for the Expert-MAS reference in "What This Does Not Say": Expert-MAS takes GPT-5 from 57.0% to 96.5% on SMFR, demonstrating that hand-designed MAS can escape the saturation threshold through deterministic orchestration. §3.3 SMFR + Expert-MAS.
