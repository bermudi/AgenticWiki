---
title: Scaling Agent Systems
created: 2026-07-03
updated: 2026-07-03
sources:
  - raw/2512.08296-scaling-agent-systems.md
  - raw/2511.09030-maker-million-step-zero-errors.md
  - raw/2603.04474-spark-to-fire-error-cascades.md
tags: [concept, multi-agent, scaling, empirical, regression, architecture-selection, mas-audit]
unaudited_marginal: 0
---

# Scaling Agent Systems

> The first quantitative scaling framework for agent systems (Kim, Gu, Park et al., Google Research + Google DeepMind + MIT, arXiv 2512.08296v3, Apr 2026). A controlled evaluation of 260 configurations across 6 agentic benchmarks, 5 canonical architectures (SAS + 4 MAS variants), and 3 LLM families, deriving a 20-parameter regression model (R² = 0.373, or 0.413 with a task-grounded capability metric) that predicts optimal architecture with 87% accuracy on held-out configurations. The framework replaces heuristic "when to use agents" guidance with measurable, predictive thresholds.

## The Experimental Design

The study's core methodological contribution is **isolating architectural effects** by controlling for implementation confounds. All configurations use:

- Identical task prompts, tools, and observation structures
- Matched total reasoning-token budgets (mean 4,800 tokens per trial)
- The same 6 agentic benchmarks, 5 architectures, and 9 models from 3 LLM families

### The 260 Configurations

| Dimension | Values |
|---|---|
| Benchmarks (6) | BrowseComp-Plus, Finance Agent, PlanCraft, Workbench, SWE-bench Verified, Terminal-Bench |
| Architectures (5) | SAS, MAS-Independent, MAS-Centralized, MAS-Decentralized, MAS-Hybrid |
| LLM families (3) | OpenAI (GPT-5-nano/mini/5), Google (Gemini-2.0/2.5 Flash, 2.5 Pro), Anthropic (Sonnet 3.7/4/4.5) |
| Total configurations | 260 (45 per benchmark × 4 benchmarks + 40 per benchmark × 2 benchmarks) |

The four MAS architectures form a **structural ablation** over two coordination dimensions: orchestrator presence (hierarchical vs. flat) and peer communication (direct sub-agent interaction vs. isolated execution). This enables controlled attribution of performance differences to specific coordination mechanisms.

### Agentic vs. Non-Agentic Tasks

The study draws a sharp distinction between agentic and non-agentic benchmarks, extending the Agentic Benchmark Checklist (Zhu et al., 2025). A task is agentic when it requires:

1. **Sequential interdependence** — later actions depend on earlier observations; one-shot policies cannot achieve high reward
2. **Partial observability** — critical state information is hidden, acquired through active querying or tool use
3. **Adaptive strategy formation** — the policy must update beliefs based on new evidence from interaction

Non-agentic benchmarks (GSM8K, MMLU, HumanEval) evaluate static reasoning. On these, MAS shows monotonic improvement through ensemble effects (89% on HumanEval with 5 agents) because voting corrects errors without sequential compounding. On agentic benchmarks, the dynamics invert: coordination overhead scales with interaction depth, agents operate on divergent world states (34% overlap after 10 interactions), and errors cascade rather than cancel.

## The Three Scaling Patterns

### 1. Capability Saturation

The most robust finding. Once single-agent baselines exceed ~45% accuracy, MAS yields diminishing/negative returns. See [[capability-saturation]] for the full treatment.

### 2. Tool-Coordination Trade-off

Tool-heavy tasks suffer disproportionately from MAS inefficiency. See [[tool-coordination-trade-off]] for the full treatment.

### 3. Architecture-Dependent Error Amplification

Trace-level error amplification factors, measured from execution-trace token analysis:

| Architecture | Error amplification (α_trace) | Mechanism |
|---|---|---|
| SAS | 1.0× | No inter-agent propagation |
| Centralized | 4.4× | Validation bottlenecks intercept errors before aggregation |
| Hybrid | 5.1× | Orchestrator + peer communication; protocol complexity introduces coordination-failure modes |
| Decentralized | 7.8× | Peer debate; errors propagate through debate rounds before consensus |
| Independent | 17.2× | No inter-agent communication; errors cascade unchecked to final output |

The 4× gap between Centralized (4.4×) and Independent (17.2×) is the quantitative evidence for the value of validation bottlenecks — the same finding the [[mast]] taxonomy identifies qualitatively as FC3 Task Verification (23.5% of failures). Centralized coordination enforces validation bottlenecks that intercept errors before propagation; Independent architecture lets individual mistakes cascade directly to the aggregated output.

After controlling for other coordination metrics in the regression, neither the main effect of error amplification (β = 0.014, p = 0.658) nor its interaction with tool count (β = 0.022, p = 0.332) reaches statistical significance. The dramatic performance differences across architectures are better explained by efficiency (ε) and overhead (%) than by error propagation per se. The error amplification factors are descriptive of the mechanism, not independent predictors in the regression.

## The Regression Model

The scaling principle (Eq. 1) relates agentic performance to four categories of predictors:

1. **Base model capability** — Intelligence Index (I), with a quadratic term (I²) to test for non-linear scaling
2. **System configuration** — agent count (n)
3. **Task properties** — tool count (T), single-agent baseline (SA)
4. **Empirical coordination metrics** — efficiency (ε), overhead (%), trace-level error amplification (α_trace), message density (ρ), redundancy (R)

The model includes 9 interaction terms, each motivated by observed patterns (not exhaustive): ε×T (efficiency-tools trade-off), α_trace×SA (error-baseline), SA×log(1+n) (baseline paradox / capability saturation), %×T (overhead scales with complexity), and others.

### Model Fit

| Specification | R²_train | R²_CV | AIC |
|---|---|---|---|
| Intelligence + Tools + Agents | 0.405 | 0.360 | -238.8 |
| + Coordination structure | 0.428 | 0.363 | -243.2 |
| + Single-agent baseline | 0.429 | 0.358 | -242.0 |
| + Interaction terms (full model) | 0.463 | **0.373** | -236.3 |
| Full model with ACI (task-grounded) | 0.481 | **0.413** | -244.8 |

The model contains **no dataset-specific parameters**, enabling prediction on unseen task domains. The task-grounded Agentic Capability Index (ACI) — each model's mean single-agent performance across all six benchmarks — outperforms the static Intelligence Index (correlation between the two: r = 0.45), validating the concern that static benchmark composites diverge from dynamic agentic performance.

### Significant Predictors

| Predictor | β | p | Survives correction? |
|---|---|---|---|
| log(1 + T) (tool diversity benefit) | 0.166 | <0.001 | Holm < 0.001 ✓ |
| SA (single-agent baseline) | 0.250 | 0.001 | Holm = 0.018 ✓ |
| SA × log(1 + n) (capability saturation) | -0.236 | 0.004 | Holm = 0.018 ✓ (also cluster-robust) |
| ε × T (tool-coordination trade-off) | -0.096 | 0.002 | Holm = 0.026 ✓ |
| I (intelligence, linear) | 0.126 | 0.008 | Directional (Holm < 0.10) |
| α_trace × SA (error-baseline) | -0.080 | 0.022 | Directional |
| R × n (redundancy benefit with scale) | 0.024 | 0.034 | Directional |

Intelligence shows a **linear** positive effect (I² is not significant, p = 0.977) — no evidence of emergent super-linear gains at higher intelligence levels within the tested range (I ∈ [42, 71]).

## Architecture Selection

The framework's practical output: given task characteristics (T, SA) and model capability (I), practitioners can compute expected performance for each architecture and select the best.

Three task archetypes from the paper:

1. **Planning tasks** (T=4, SA=0.57) → favor SAS (capability saturation + low tool count)
2. **Analysis tasks** (T=5, SA=0.35) → favor Centralized MAS (error control α_trace=4.4× with manageable overhead)
3. **Tool-heavy tasks** (T=16, SA=0.63) → favor Decentralized MAS (parallelization and redundancy outweigh efficiency losses)

The decision boundary between single-agent and multi-agent:

```
SA* ≈ 0.45  (raw performance)
```

Cross-validated on held-out configurations: **87% correct architecture selection**, substantially exceeding random choice (20%) or capability-only models (54%). Relative architecture preferences transfer across domains even when absolute cross-domain prediction is limited (within-domain LODO: 87% optimal-architecture accuracy; absolute cross-domain: MAE = 0.077).

## Decomposability Over Complexity

The study's most clarifying qualitative finding: **domain complexity alone does not predict MAS effectiveness; task decomposability does.**

| Benchmark | Domain complexity (D) | SAS baseline | Best MAS | Verdict |
|---|---|---|---|---|
| Workbench | 0.000 | 0.629 | +5.6% | Marginal (low complexity, high baseline → saturation) |
| SWE-bench Verified | 0.255 | 0.522 | -2.1% to -14.9% | Degradation (high baseline → saturation) |
| Finance Agent | 0.407 | 0.349 | **+80.8%** | Strong gains (decomposable + low baseline) |
| Terminal-Bench | 0.414 | 0.344 | +1.7% to -19.2% | Mixed (low tool count limits orchestration benefit) |
| PlanCraft | 0.419 | 0.568 | **-39% to -70%** | Universal degradation (sequential + high baseline) |
| BrowseComp-Plus | 0.839 | 0.318 | +9.2% | Modest (high complexity, low baseline, but world ambiguity limits verification) |

Finance Agent (D=0.41) and PlanCraft (D=0.42) have nearly identical complexity scores but opposite MAS outcomes (+80.8% vs -70%). The difference: Finance Agent's task naturally decomposes into parallel information streams (revenue, cost, market factors analyzed independently), aligning with coordination structure. PlanCraft requires strict sequential constraint satisfaction, where coordination overhead fragments reasoning capacity under fixed budgets.

The trajectory analysis reveals the mechanism:
- **PlanCraft (sequential)**: efficient SAS follows a 3-step direct path (search → move → craft). Centralized MAS decomposes this into 3 artificial subtasks (research recipe, check inventory, execute crafting) — 2 of 3 are redundant, consuming token budget on coordination rather than reasoning.
- **Finance Agent (decomposable)**: SAS hits sequential bottlenecks (turns 3-7: insufficient breadth). Centralized MAS enables parallel information synthesis (regulatory, SEC filings, operational impact) with an orchestrator that synthesizes multi-source findings.

## Three Coordination Regimes

The error taxonomy reveals three operational regimes defined by overhead level:

| Regime | Overhead | Accuracy gain | Success-cost ratio | Dominant architectures |
|---|---|---|---|---|
| Under-coordination | < 100% | Δ ≈ +2-4% | — | Minimal engagement |
| **Optimal band** | 200-300% | Highest | ρ ≈ 0.16 | Centralized, Decentralized |
| Over-coordination | > 400% | Reduced | ρ ≈ 0.11 | Hybrid (protocol complexity introduces coordination-failure modes) |

Hybrid architecture (515% overhead) runs in the over-coordination regime: its coordination-failure error rate (12.4%) is 7× higher than Centralized (1.8%) and 4× higher than Decentralized (3.2%). The protocol complexity of combining hierarchical control with lateral peer communication exceeds robust implementation.

## Turn-Count Power Law

Total reasoning turns follow power-law growth with agent count:

```
T = 2.72 × (n + 0.5)^1.724,  R² = 0.974,  95% CI on exponent: [1.685, 1.763], p < 0.001
```

The super-linear exponent (1.724 > 1) reflects quadratic message complexity (all-to-all potential communication) tempered by practical bandwidth limits. Extrapolation: ~69 turns at n=6, ~157 turns at n=10 — a 9.5×-21.8× increase over the SAS baseline of 7.2 turns.

Under fixed computational budgets, per-agent reasoning capacity becomes prohibitively thin beyond 3-4 agents. This is a **hard resource ceiling**: communication cost dominates reasoning capability at scale, creating a fundamentally different scaling regime from neural network parameter scaling (Kaplan et al.: α = 0.76 for dense models vs. α = 1.724 for agent communication).

## Message Density Saturation

Across communicating MAS architectures, success rate follows a logarithmic relationship with message density (messages per reasoning turn):

```
S = 0.73 + 0.28 ln(ρ),  R² = 0.68, p < 0.001
```

Performance plateaus near ρ* ≈ 0.39 messages/turn (achieved by Decentralized at 0.41 and Centralized at 0.39). Beyond this, additional messages yield diminishing returns — Hybrid (ρ = 0.24, but 515% overhead) shows -2.4% vs Centralized (285% overhead), a non-significant difference (t(178) = 0.61, p = 0.542). The saturation reflects information limits: high-performing runs show convergent token overlap (shared tokens: mean ≈ 1.8 bits); further messages add redundancy rather than novel information.

Optimal redundancy occurs at R ≈ 0.41 (Centralized median), balancing information fusion with reasoning independence. High redundancy (R > 0.50) correlates negatively with success (r = -0.136, p = 0.004) — an emergent diversity-efficiency trade-off.

## LLM Family Signatures

No single architecture dominates across all families. Family-specific coordination preferences emerge:

| Family | Strength | Signature |
|---|---|---|
| OpenAI | Hybrid on structured tasks | Finance: 52% Hybrid vs 39% SAS; Workbench: 56% Hybrid vs 42% SAS |
| Anthropic | Conservative, stable Centralized | Mean 43% across tasks, SD = 2.3% (lowest variance) |
| Google | Consistent cross-architecture efficiency | Performance range < 5% across topologies |

These are empirical signatures, not mechanistic conclusions — the study does not isolate the underlying mechanism (instruction-following fidelity, context utilization, inter-turn consistency).

## Limitations

The study is candid about its constraints (§5):

- **Communication overhead grows superlinearly** — scaling to larger collectives may face fundamental barriers; whether beneficial emergent behaviors (spontaneous specialization, hierarchical self-organization) can overcome communication bottlenecks is open
- **Heterogeneity doesn't bypass saturation** — mixing models of different intelligence levels within the same family finds no evidence that model mixing bypasses the capability-saturation threshold; centralized heterogeneous configurations underperform strong-model homogeneous counterparts by 12.6 pp
- **6 benchmarks may not capture the full spectrum** — embodied agents, multi-user interaction, and long-horizon temporal dependencies are not tested
- **SWE-bench and Terminal-Bench use 20-instance subsets** — individual pairwise comparisons are underpowered (bootstrap CIs ±20 pp), but aggregate trends remain robust
- **Cluster-robust inference is conservative with k=6 clusters** — only capability saturation survives at α = 0.05 under both corrections; other findings are directional patterns
- **Token-centric communication is a fundamental barrier** — current coordination requires serializing reasoning into natural language tokens; latent-space reasoning or activation sharing could alter the scaling dynamics

## Position in the Multi-Agent Debate

The scaling study is the **third leg** of the wiki's multi-agent evidence base:

| Question | Source | Answer |
|---|---|---|
| *Whether* automated MAS beat CoT-SC | [[multi-agent-illusion]] | No — up to 10× cost, functional collapse, architectural bloat |
| *Why* MAS fail | [[mast]] | 14 failure modes in 3 categories; system design is the binding constraint (44.2%) |
| *When* coordination helps vs. hurts | **This study** | Quantitative thresholds: SA < 45%, low tool count, decomposable task → MAS helps; otherwise → SAS |

The three papers converge: MAS is not universally beneficial or universally harmful — it is **conditionally beneficial**, and the conditions are now measurable. The scaling study provides the predictive framework; the illusion paper provides the cost-controlled audit; MAST provides the failure vocabulary.

> [!note] Synthesis: The Three-Leg Multi-Agent Theory
> The wiki author's synthesis: the three papers together constitute a coherent theory of multi-agent LLM systems. The illusion paper establishes that automated MAS don't work (the negative result). MAST explains why (the diagnostic). The scaling study specifies when alternatives work (the predictive). No single paper makes the full argument; the theory emerges from their convergence. This synthesis is the wiki author's, not stated by any single source.

## The Fourth and Fifth Legs: Mechanism and Engineered Escape

Two 2025–2026 papers extend the theory beyond the three-leg structure:

- **Mechanism** — [[error-cascades|Xie, Zhu, Zhang et al. (2026)]] supply the formal *how*: the collaboration graph's spectral radius ρ(A) governs amplification, and once βρ(A) > δ the system is supercritical. The architecture-specific error-amplification factors in this study's Table 5 (Independent 17.2×, Centralized 4.4×) are the regression-side measurement of the propagation the cascade paper models formally. The cascade paper's three vulnerability classes (cascade amplification, topological fragility, consensus inertia) are the dynamic patterns that produce the static symptoms this study's regression captures as overhead and efficiency.
- **Engineered escape** — [[massively-decomposed-agentic-processes|MDAPs]] / [[maker|MAKER]] (Meyerson et al., 2025) operate on a different scaling axis than this study. Where this study varies architecture (SAS + 4 MAS) and agent count, MDAPs fix the architecture at maximal decomposition (one step per microagent) and vary the per-step vote budget `k`. The MDAP scaling laws (cost Θ(s ln s), `k_min = Θ(ln s)`) are orthogonal to this study's regression: they describe reliability under a fixed engineered topology, not architecture selection across topologies. The two frameworks are complementary — this study tells you *which architecture to pick*; MDAPs tell you *how to make the engineered pole reliable at scale*.

## Thread

- [[the-multi-agent-theory]] — Layer 3 (the thresholds): this page supplies the *when* — SA < 45%, low tool count, decomposable task. The thread traces the full theory across six papers.
- [[the-agent-workflow]] — the scaling framework is the quantitative answer to "when does multi-agent coordination help?" in the workflow thread
- [[the-verifiability-thesis]] — the architecture-selection decision boundary (SA ≈ 0.45) is a verifiability threshold: tasks you can already do well don't benefit from coordination overhead
- [[the-benchmark-crisis]] — the agentic vs. non-agentic distinction is a benchmark-design principle: MAS evaluations on non-agentic benchmarks (HumanEval) produce misleading guidance about agentic tasks

## Related

- [[capability-saturation]] — the most robust finding (45% threshold); its own page
- [[tool-coordination-trade-off]] — the second-most-robust finding (tool count vs. efficiency); its own page
- [[multi-agent-illusion]] — the cost-controlled audit that asks *whether* MAS beat CoT-SC; this study asks *when* coordination helps
- [[mast]] — the failure taxonomy that explains *why* MAS fail; this study quantifies the conditions under which those failures dominate
- [[expert-mas]] — the hand-designed baseline that escapes the scaling study's negative findings through deterministic orchestration and typed decomposition
- [[multi-agent-code-orchestration]] — the topology taxonomy; this study provides the quantitative architecture-selection rules for choosing among those topologies
- [[functional-collapse]] — the runtime failure mode; the scaling study's error-amplification factors quantify the cost of unchecked propagation (Independent: 17.2×)
- [[architectural-bloat]] — the static failure mode; the over-coordination regime (Hybrid at 515% overhead) is the quantitative version
- [[agent-floor]] — the Harvard 6-tier benchmark; both studies isolate tool-use complexity from real-world confounds, but this study adds the coordination dimension
- [[deepswe]] — the long-horizon coding benchmark; SWE-bench Verified's placement in the saturation regime (SA = 0.522 > 0.45) is consistent with DeepSWE's finding that single-agent baselines are hard to beat on well-structured coding tasks
- [[horizon-length]] — the super-linear turn scaling (α = 1.724) is an agent-system analog of horizon-length limits: communication overhead caps the effective team size just as error-laden history caps the effective task length
- [[error-cascades]] — the formal propagation model beneath this study's error-amplification factors; βρ(A) > δ is the mechanism that produces the 17.2× (Independent) vs 4.4× (Centralized) gap
- [[genealogy-governance]] — the message-layer defense against the cascades this study's error-amplification factors measure
- [[massively-decomposed-agentic-processes]] — the orthogonal scaling axis (decomposition granularity + vote budget) this study doesn't vary; the engineered-decomposition pole
- [[maker]] — the million-step demonstration that the engineered pole can be made reliable at scale

## Sources

- `raw/2512.08296-scaling-agent-systems.md` — Kim, Gu, Park, Park, Schmidgall, Heydari, Yan, Zhang, Zhuang, Liu, Malhotra, Liang, Park, Yang, Xu, Du, Patel, Althoff, McDuff, Liu (Google Research + Google DeepMind + MIT, arXiv 2512.08296v3, 8 Apr 2026). §1 introduction (260 configurations, agentic task definition); §3 system definition (5 architectures, formal model); §4.1 setup (benchmarks, LLMs, metrics); §4.2 main results (per-benchmark MAS deltas, decomposability analysis, family-specific signatures); §4.3 scaling principles (Eq. 1 regression, Table 4 coefficients, architecture selection, 87% accuracy); §4.4 coordination efficiency (turn power law, message density saturation, error absorption, error taxonomy, three regimes); §4.5 robustness (cluster-robust, Holm-Bonferroni, ACI, LODO); §5 limitations; §6 conclusion.
- `raw/2511.09030-maker-million-step-zero-errors.md` — Meyerson et al. (Cognizant AI Lab + UT Austin, arXiv 2511.09030v1, 12 Nov 2025). §3.2 MDAP scaling laws (Θ(s ln s), `k_min = Θ(ln s)`) — the orthogonal scaling axis (decomposition granularity + vote budget) this study doesn't vary. Source for the "Engineered escape" leg.
- `raw/2603.04474-spark-to-fire-error-cascades.md` — Xie, Zhu, Zhang et al. (City University of Macau + Minzu University, arXiv 2603.04474v2, 11 May 2026). §II propagation-dynamics model (βρ(A) > δ) — the formal mechanism beneath this study's error-amplification factors. Source for the "Mechanism" leg.
