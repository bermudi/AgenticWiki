---
title: Tool-Coordination Trade-off
created: 2026-07-03
updated: 2026-07-14
sources:
  - raw/2512.08296.md
tags: [concept, multi-agent, scaling, tools, empirical, mas-audit, token-budget]
unaudited_marginal: 0
---

# Tool-Coordination Trade-off

> A robust finding from the [[scaling-agent-systems|Kim et al. scaling study]]: tool-heavy tasks suffer disproportionately from multi-agent coordination overhead. The interaction between coordination efficiency and tool count (β = -0.096, p = 0.002) is the largest effect size among the regression's interaction terms and survives Holm-Bonferroni correction. The mechanism: multi-agent systems fragment the per-agent token budget, leaving insufficient capacity for complex tool orchestration. This contradicts the naïve hypothesis that "more agents help with complexity" — tool-rich environments amplify the coordination tax.

## The Finding

The scaling study's regression model tests whether efficiency penalties compound with tool complexity via the `ε × T` interaction term. The coefficient:

```
β̂(ε × T) = -0.096  (95% CI: [-0.154, -0.037], p = 0.002)
```

This is the **largest effect size among all interaction terms** in the 20-parameter model, and one of only three predictors that survive Holm-Bonferroni multiple-comparison correction (Holm = 0.026).

The negative coefficient means: as tool count (T) increases, the performance contribution of coordination efficiency (ε) becomes less favorable. Tool-rich environments amplify coordination inefficiencies.

## The Mechanism

The scaling study matched total reasoning-token budgets across MAS and SAS. Under this constraint, the mechanism is **token budget fragmentation**:

- **SAS** holds the entire token budget in a single reasoning locus. For a 16-tool task, the single agent can dedicate full capacity to tool selection, parameter configuration, and result interpretation.
- **MAS** splits the token budget across agents. Each agent receives a fraction of the total budget. For tool-heavy tasks, this fraction is insufficient for complex tool orchestration — the agent cannot reason adequately about which tool to call, with what parameters, given partial context.

The efficiency numbers from Table 5 of the scaling study:

| Architecture | Efficiency (ε) | Success/1K tokens | Overhead |
|---|---|---|---|
| SAS | 0.466 | 67.7 | 0% |
| Independent | 0.234 | 42.4 | 58% |
| Decentralized | 0.132 | 23.9 | 263% |
| Centralized | 0.120 | 21.5 | 285% |
| Hybrid | 0.074 | 13.6 | 515% |

For a 16-tool task (Workbench), the efficiency penalty ranges from 2× (Independent) to 6.3× (Hybrid) relative to SAS. The Hybrid architecture — the most communication-heavy — collapses most severely on tool-heavy benchmarks (success rate 0.452 overall, 0.21 on Workbench specifically).

## The Simple-Task Contrast

The trade-off is **threshold-dependent**. For simple tasks (T ≤ 4 tools), the efficiency effect is negligible (|Δ| < 0.05). This explains why multi-agent coordination can succeed on decomposable problems with few tools — the coordination tax hasn't kicked in yet.

The implication: the decision to use MAS should consider tool count as a first-order factor. Tasks with many tools and high coordination overhead are the worst case for MAS; tasks with few tools and decomposable structure are the best case.

## Empirical Evidence

| Benchmark | Tool count | SAS baseline | Best MAS | Verdict |
|---|---|---|---|---|
| Workbench | 16 | 0.629 | Decentralized +5.6% | Marginal (tool tax offsets parallelism) |
| SWE-bench Verified | 7 | 0.522 | All MAS -2.1% to -14.9% | Degradation (tool tax + capability saturation) |
| Terminal-Bench | 2 | 0.344 | Independent +1.7% | Mixed (low tool count, but Centralized -19.2%) |
| Finance Agent | 5 | 0.349 | Centralized +80.8% | Strong gains (decomposable + moderate tools) |
| PlanCraft | 4 | 0.568 | All MAS -39% to -70% | Degradation (sequential + capability saturation) |

Workbench (16 tools) is the cleanest demonstration: even though the task is decomposable (domain complexity D = 0.000), the tool coordination tax limits MAS gains to marginal. The Hybrid architecture — highest overhead — actively degrades on Workbench despite the task's decomposability.

## Relationship to Tool Design

The trade-off connects to the [[tool-design-for-agents]] thread but from a different angle. The tool-design thread asks: how should tools be designed for agent consumption? The tool-coordination trade-off asks: how does tool complexity interact with multi-agent coordination? The shared insight: tools are the bottleneck. For single agents, the bottleneck is interface design; for multi-agent systems, the bottleneck is token budget fragmentation across agents that each need to reason about the same tool surface.

> [!note] Extension: Tool-Aware Architecture Selection
> The scaling study's authors note (§5, limitation iii) that "developing specialized coordination protocols for tool-intensive tasks, such as explicit tool-access scheduling, capability-aware task routing, or hierarchical tool delegation, represents an important direction." This is unvalidated — no source has yet tested whether tool-aware MAS protocols can circumvent the trade-off. The [[expert-mas]] baseline hints at this: its deterministic Python executor handles tool dispatch without LLM coordination overhead, but it was tested on a 5-tool task, not a 16-tool one.

## Thread

- [[tool-design-for-agents]] — the trade-off is the multi-agent dimension of the tool-design thread: tools are the bottleneck for single agents, and tool complexity is the coordination tax for multi-agent systems
- [[the-agent-workflow]] — the trade-off sharpens when multi-agent coordination helps: few tools + decomposable = yes; many tools + any structure = coordination tax

## Related

- [[scaling-agent-systems]] — the umbrella framework; the tool-coordination trade-off is its second-most-robust finding
- [[capability-saturation]] — the other robust finding from the same regression; orthogonal (baseline performance, not tool count)
- [[multi-agent-illusion]] — the trade-off explains one dimension of the illusion: automated MAS frameworks don't account for tool complexity in their architecture search
- [[expert-mas]] — the hand-designed baseline that sidesteps the trade-off via deterministic tool dispatch (untested on high tool counts)
- [[multi-agent-code-orchestration]] — the topology taxonomy; the trade-off predicts which topologies fail on tool-heavy tasks (high-overhead topologies like Hybrid collapse)
- [[agent-friendly-tooling]] — the single-agent tool design principles; the trade-off is what happens when those tools are distributed across agents with fragmented budgets

## Sources

- `raw/2512.08296.md` — Kim, Gu, Park et al. (Google Research + Google DeepMind + MIT, arXiv 2512.08296v3, 8 Apr 2026). §4.3 scaling principles (ε × T interaction β = -0.096, p = 0.002); §4.5 robustness (Holm-Bonferroni Holm = 0.026); Table 5 coordination metrics (efficiency per architecture); §4.2 Workbench results (16-tool task, Hybrid collapse); §5 limitation iii (tool-intensive coordination protocols as future work).
