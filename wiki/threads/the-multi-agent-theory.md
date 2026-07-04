---
title: The Multi-Agent Theory
created: 2026-07-04
updated: 2026-07-04
sources:
  - raw/the-illusion-of-multi-agent-advantage.txt
  - raw/2503.13657-why-multi-agent-llm-systems-fail.txt
  - raw/2512.08296-scaling-agent-systems.pdf
  - raw/2603.04474-spark-to-fire-error-cascades.txt
  - raw/2511.09030-maker-million-step-zero-errors.txt
tags: [thread, multi-agent, mas-audit, scaling, error-propagation, decomposition, theory]
unaudited_marginal: 0
---

# The Multi-Agent Theory

> Six papers, published between November 2025 and June 2026, converge on a coherent theory of LLM-based Multi-Agent Systems (MAS). No single paper makes the full argument. Together they answer five questions in order: *whether* automated MAS work (mostly no), *why* they fail (system design, not model capability), *when* coordination helps (conditional on capability and decomposability), *how* errors propagate to system-wide false consensus (graph dynamics), and *how to make MAS reliable* (engineered decomposition + per-step error correction, or message-layer governance). The theory's central claim: the multi-agent paradigm *can* work, but only when the coordination layer is engineered — not when it is auto-discovered, and not when errors are left to propagate through an ungoverned shared context.

## Thesis

The wiki author's synthesis: the six papers form a layered theory where each layer supplies what the previous one lacked.

| Layer | Question | Source | Answer |
|---|---|---|---|
| Audit | *Whether* automated MAS work | [[multi-agent-illusion]] (Jwalapuram et al., 2026) | No — up to 10× cost, functional collapse, architectural bloat |
| Diagnosis | *Why* MAS fail | [[mast]] (Cemri et al., NeurIPS 2025) | 14 failure modes in 3 categories; system design is the binding constraint (44.2%) |
| Predictive thresholds | *When* coordination helps | [[scaling-agent-systems]] (Kim et al., 2026) | SA < 45%, low tool count, decomposable task → MAS helps; otherwise → SAS |
| Mechanism | *How* errors propagate | [[error-cascades]] (Xie et al., 2026) | Graph dynamics: βρ(A) > δ; three vulnerability classes |
| Engineered escape | *How to make MAS reliable at scale* | [[massively-decomposed-agentic-processes]] / [[maker]] (Meyerson et al., 2025) | Maximal decomposition + per-step voting; log-linear cost; million-step zero-error |
| Defense | *How to stop cascades in existing MAS* | [[genealogy-governance]] (Xie et al., 2026) | Atomic-claim decomposition, Lineage Graph, blocking with rollback; ≥89% BICR |

The theory's through-line: **the binding constraint on MAS is the coordination layer, not the model.** The audit shows coordination overhead dominates cost. The diagnosis shows system design is the largest failure category. The thresholds show coordination helps only when the task is decomposable and the model is weak enough that redundancy pays. The mechanism shows errors propagate through the coordination graph, not through model error per se. The escape shows reliability comes from engineering the coordination layer (maximal decomposition + voting), not from bigger models. The defense shows propagation can be stopped only by engineering the message layer (governance), not by agent-level self-reflection.

> [!note] Synthesis
> The layered structure and the through-line are the wiki author's synthesis. No single paper states the full theory. The illusion paper and MAST are co-authors of the audit+diagnosis layer; the scaling study is an independent quantitative corroboration; the cascade paper supplies the mechanism and the defense; the MDAP paper supplies the engineered escape. The claim that these form a coherent theory — rather than six independent findings — is constructed here.

## Layer 1: The Audit — Whether Automated MAS Work

[[multi-agent-illusion|Jwalapuram, Lin et al. (2026)]] ran the first cost-controlled audit of six automated MAS frameworks (DyLAN, AFlow, ADAS, MaAS, MAS-Orchestra, and a custom framework) against single-agent CoT-SC across five benchmarks. The result: automated MAS do not consistently outperform CoT-SC and are up to 10× more expensive. Three structural findings explain the gap:

- **[[architectural-bloat|Architectural bloat]]** — complex architectures that are functionally simpler than their appearance. AFlow's 7/14 final workflows reduce to "iterate one prompt three times then aggregate" — literally CoT-SC with extra steps.
- **[[functional-collapse|Functional collapse]]** — the architecture reduces to single-agent execution at runtime. DyLAN reaches unanimous consensus in 70-90% of cases (the "diversity" mechanism is decorative). MAS-Zero's verifier selects the first worker's output 45%+ of the time. The paper names these agents "expensive witnesses": full inference cost, near-zero causal influence.
- **Capability floor** — a single-agent GPT-5 with CoT-SC beats the most sophisticated GPT-4o-based MAS at less than half the tokens. When the model is strong enough, coordination overhead is net cost.

The one positive case: [[expert-mas]] — a hand-designed, deterministic, code-driven baseline (Meta-Agent + Python Executor + Extractor/Calculator) — achieves GPT-5 57.0% → 96.5% on [[smfr]] at comparable cost. The audit's corollary: the multi-agent paradigm *can* work when engineered, not when searched.

## Layer 2: The Diagnosis — Why MAS Fail

[[mast|MAST]] (Cemri, Pan, Yang et al., NeurIPS 2025) is the first empirically grounded Multi-Agent System Failure Taxonomy. Built via Grounded Theory analysis of 150 traces across 5 frameworks (κ=0.88 inter-annotator agreement), MAST identifies 14 failure modes in 3 categories:

- **FC1 System Design Issues (44.2%)** — failures originating in pre-execution design decisions: disobeying task/role specification, step repetition, loss of conversation history, unaware of termination conditions. The largest category.
- **FC2 Inter-Agent Misalignment (32.3%)** — breakdowns in information flow during coordination: conversation reset, failure to ask for clarification, task derailment, information withholding, ignored input, reasoning-action mismatch.
- **FC3 Task Verification (23.5%)** — inadequate verification of final output: premature termination, no/incomplete verification, incorrect verification.

The central conjecture: improvements in base-model capabilities will be insufficient to address the full taxonomy. Good MAS design requires *organizational understanding* — even organizations of sophisticated individuals fail catastrophically if the organizational structure is flawed. The intervention studies confirm this: topology-based changes (DAG → cyclic graph, +15.6% on ProgramDev) were more effective than prompt-based changes (+9.4%), but task completion rates remain low. The binding constraint is design, not capability.

## Layer 3: The Thresholds — When Coordination Helps

[[scaling-agent-systems|Kim et al. (2026)]] ran the first quantitative scaling framework: 260 configurations across 6 benchmarks, 5 architectures (SAS + 4 MAS variants), 3 LLM families. A 20-parameter regression (R² = 0.373) predicts optimal architecture with 87% accuracy on held-out configurations. Two robust predictors:

- **[[capability-saturation|Capability saturation]]** (β = -0.236, p = 0.004, survives Holm-Bonferroni) — once a single-agent baseline exceeds ~45% accuracy, MAS yields diminishing or negative returns. The coordination overhead becomes net cost when baseline performance is already high.
- **[[tool-coordination-trade-off|Tool-coordination trade-off]]** (β = -0.096, p = 0.002, survives Holm-Bonferroni) — tool-heavy tasks suffer disproportionately from MAS inefficiency because multi-agent systems fragment the per-agent token budget, leaving insufficient capacity for complex tool orchestration.

The scaling study also measures error amplification factors at the trace level: Independent 17.2×, Decentralized 7.8×, Hybrid 5.1×, Centralized 4.4×. Centralized coordination contains amplification via validation bottlenecks — the 4× gap over Independent is the quantitative measure of verification's value. Three coordination regimes emerge: under-coordination (too few connections), optimal band (moderate connectivity), over-coordination (Hybrid at 515% overhead produces 12.4% coordination-failure errors — 7× Centralized's 1.8%).

The thresholds specify the conditions under which the multi-agent illusion is most likely to hold: high single-agent baselines and high tool counts. The illusion is not universal — it is conditional, and the conditions are now measurable.

## Layer 4: The Mechanism — How Errors Propagate

[[error-cascades|Xie, Zhu, Zhang et al. (2026)]] supply the formal mechanism beneath the audit and the diagnosis. The MAS is abstracted as a directed dependency graph `G = (V, E)` with adjacency matrix `A`. A single atomic falsehood `m` is tracked through the system under iterative context reuse. Each agent `i` has an adoption state `s_i(t) ∈ [0, 1]` — the probability it has internalized `m` as a working premise. The system reaches **false consensus** when `S(t) = (1/n) Σ s_i(t)` exceeds a threshold and stays there.

The risk criterion: linearizing in the early regime, the dominant growth factor is `(1 − δ) + β ρ(A)`, where `ρ(A)` is the spectral radius of `A`, `β` is the propagation probability, and `δ` is the effective decay rate (forgetting + self-correction + external verification). The early-stage amplification condition is:

> **β ρ(A) > δ**, equivalently **R ≈ β ρ(A) / δ > 1**

When `R > 1` the system is supercritical: a single seed expands rapidly along the principal eigenvector of `A`. This is the structural-inevitability claim — amplification is not a quirk of a particular prompt but a consequence of high exposure coupling under the given interaction graph.

Three vulnerability classes:

- **Cascade amplification** — a small, incidental error does not stay contained. Concurrent mentions from different upstream agents compound rather than cancel (the non-linear `1 − Π(·)` term). Empirically: five of six frameworks reach 100% final infection from a single seed, including settings with explicit reviewer or QA roles. Role assignment alone does not reliably stop propagation.
- **Topological fragility** — system resilience depends on *entry coordinates*, not error content. The structurally most dangerous seed is the hub (the principal-eigenvector node). LangGraph: hub injection 100% vs leaf injection 9.7% — a 10.31× impact factor. The hub is a strict informational cut-set.
- **Consensus inertia** — introducing a falsehood is computationally cheap; correcting it grows more expensive as the workflow progresses. An initial error crystallizes into constraints, assumptions, code skeletons, and evaluation criteria that subsequent steps build on. A delayed correction conflicts not with a single statement but with a dependency chain that has internalized the error. This is [[self-conditioning]] at the multi-agent layer: the system conditions on its own error-laden shared state and resists reversal.

The mapping to MAST's diagnostic categories:

| MAST category | Cascade mechanism |
|---|---|
| FC1 System Design Issues (44.2%) | Topological fragility: `ρ(A)` measures the structural vulnerability that bad design creates |
| FC2 Inter-Agent Misalignment (32.3%) | Cascade amplification: errors propagate via the non-linear `1 − Π(·)` term |
| FC3 Task Verification (23.5%) | Consensus inertia: correction cost grows with accumulated contextual debt; verification that arrives after the error has crystallized is too late |

The mapping to the scaling study's error-amplification factors: the 17.2× (Independent) vs 4.4× (Centralized) gap is the regression-side measurement of the propagation the cascade paper models formally. `ρ(A)` is high for Independent (many unchecked channels) and low for Centralized (validation bottlenecks suppress the spectral radius).

## Layer 5: The Engineered Escape — How to Make MAS Reliable at Scale

[[massively-decomposed-agentic-processes|MDAPs]] / [[maker|MAKER]] (Meyerson et al., 2025) approach the reliability problem from a different angle: rather than asking which existing architecture to pick, they fix the architecture at maximal decomposition (one step per microagent) and ask how to make *that* reliable. Three components:

1. **Maximal Agentic Decomposition (MAD)** — a task with `s` steps is decomposed into `s` subtasks of one step each. Each microagent receives only the minimal context needed for its single step — no error-laden history to condition on, so [[self-conditioning]] is structurally unavailable.
2. **First-to-ahead-by-k Voting** — for each subtask, draw independent samples until one candidate leads by `k` votes. The per-subtask success probability becomes `p_sub = 1 / (1 + ((1-p)/p)^k)`. The minimal `k` grows only logarithmically with `s` (`k_min = Θ(ln s)`), so the cost of solving an `s`-step task with target reliability `t` scales as **Θ(s ln s)** — log-linear, parallelizable to linear wall-clock.
3. **Red-Flagging** — discard any response exhibiting pathological signals (overly long, malformed) without repair. Bad behaviors are correlated in LLMs; a malformed response indicates a confused conditioning state, so resampling is cheaper than repairing and propagates fewer correlated errors.

The empirical demonstration: Towers of Hanoi with 20 disks (1,048,575 steps) solved with zero errors using gpt-4.1-mini. The per-step error rate is stable as the disk count grows — the encouraging sign that MAKER scales. Decorrelation of errors across independent samples is sufficient: in two independent runs on 10K random samples, zero steps had errors in both runs.

### The Counter-Claim and the Wiki's Read

The paper frames MDAPs as demonstrating a "multi-agent advantage" — a problem not solvable by a monolithic single-agent system at practical cost. The wiki's read: MDAPs do not refute the [[multi-agent-illusion]]; they reinforce its corollary. The illusion is specifically about *auto-discovered* coordination topologies. MDAPs are the opposite design pole: a *hand-engineered*, deterministic, maximally-decomposed architecture with subtask-level voting. The [[expert-mas]] baseline — the one positive case in the audit — is the same pattern at smaller scale: hand-designed, code-driven, deterministic. The paradigm can work when engineered, not when searched. MDAPs are the engineered-decomposition pole taken to its limit.

### The Insight-vs-Execution Boundary

MAKER is explicitly an *execution* system. The strategy (the recursive Towers of Hanoi solution) is fixed in advance and given to every microagent. The paper isolates this design choice: it tests the capacity of agents to *execute clear instructions*, separated from the capacity to *have insights about how tasks should be solved*. Both are essential; entangling them in experiments makes the source of failure hard to identify. The million-step result is a statement about the execution frontier under maximal decomposition, not about LLM planning. The open frontier (Appendix F): recursive decomposition agents that break tasks into sub-tasks, with discriminators voting on decomposition candidates — preliminary results on large-digit multiplication are "promising."

## Layer 6: The Defense — How to Stop Cascades in Existing MAS

[[genealogy-governance|Xie, Zhu, Zhang et al. (2026)]] scale backpressure to the multi-agent message layer. The governance layer sits between agent interfaces, decomposes every message into atomic claims, maintains a directed **Lineage Graph** of claim provenance, tri-state labels each claim (Green/Red/Yellow), and enforces blocking with rollback for unverified or contradicted claims. It preserves the original communication topology `A` and intervenes only on the message path.

The four-stage pipeline: decomposition + initial screening → policy routing for uncertain atoms → comprehensive verification and risk arbitration → assembly and rollback. The trust boundary: all newly generated claims are untrusted by default; only claims validated against the Lineage Graph or external evidence are trusted. This is [[dynamic-trust]] implemented as a hard boundary — trust is a property of the claim's verification status, not the source agent's role.

The headline result: ≥89% BICR (Blocked Infection Case Rate) across operating modes (Speed/Balanced/Strict), vs. 0.32 for agent-level self-reflection. The separation that matters: BICR vs. Safe Completion. Agent-monitoring baselines (AGrail, CFG) can stop part of the corrupted propagation, but their Safe Completion remains low (0.11, 0.16) — they reduce infection by *interrupting the workflow*, producing a non-usable final artifact. The governance layer limits propagation *while keeping the downstream workflow usable*.

### The Ablation: Detection Without Enforcement Is Useless

| Variant | BICR | Tokens |
|---|---|---|
| w/o Atomization | 40.0 ± 49.0% | 11,663 |
| w/o Detection | 14.4 ± 35.2% | 14,708 |
| **w/o Blocking** | **3.1 ± 10.1%** | **34,991** |
| None | 2.2 ± 14.7% | 7,365 |

Removing blocking/rollback drops BICR to 3.1% — barely above the None baseline — *while consuming the most tokens*. Screening without enforceable isolation spends substantial computation and leaves propagation largely uncontrolled. **Detection signals need enforceable isolation or rollback to affect downstream propagation** — the [[backpressure]] thesis validated empirically at the multi-agent layer. This is the formal version of MAST's FC3 finding: superficial checks (detection without enforcement) pass, but runtime bugs (unblocked propagation) remain.

## The Through-Line: The Coordination Layer Is the Binding Constraint

Every layer of the theory converges on the same claim: the binding constraint on MAS is the coordination layer, not the model.

- The **audit** shows coordination overhead dominates cost (10× for 0% gain).
- The **diagnosis** shows system design is the largest failure category (44.2%).
- The **thresholds** show coordination helps only when the task is decomposable and the model is weak enough that redundancy pays (SA < 45%).
- The **mechanism** shows errors propagate through the coordination graph (βρ(A) > δ), not through model error per se.
- The **escape** shows reliability comes from engineering the coordination layer (maximal decomposition + voting), not from bigger models — small non-reasoning models suffice when each agent's job is one focused step.
- The **defense** shows propagation can be stopped only by engineering the message layer (governance), not by agent-level self-reflection (which fails: BICR 0.32).

The practical implication: the path to reliable MAS is not "wait for bigger models" — it is *engineer the coordination layer*. The two engineering poles that work:

1. **Maximal decomposition** (MDAPs) — make each agent's job trivially solvable, verify each step by voting, keep contexts minimal. Log-linear cost scaling. Works when the task admits decomposition into single-step subtasks.
2. **Message-layer governance** ([[genealogy-governance|genealogy governance]]) — make every claim's provenance traceable, verify before trusting, block and rollback on contradiction. Works within existing topologies without rewiring connections.

Both poles share a design principle: **remove the LLM from the coordination loop wherever possible.** MDAPs replace coordination with deterministic decomposition + voting. The governance layer replaces trust-by-role with trust-by-verification. Expert-MAS replaces coordination with a deterministic Python executor. In every case that works, the LLM's job is execution or judgment on isolated inputs — not orchestration of other LLMs.

## Implications for Other Threads

### For [[the-verifiability-thesis]]

The multi-agent theory is the verifiability thesis applied to the coordination layer. The audit's three findings (bloat, collapse, capability floor) are the symptoms of an unverifiable coordination layer. The escape (MDAPs) and the defense (governance) are both *engineered verifiability* — the EARS+PBT move at the architecture layer. The mechanism (βρ(A) > δ) is the verifiability threshold for MAS: when structural amplification outpaces correction, the system cannot self-verify. The governance layer's trust boundary (only verified claims enter trusted context) is verifiability enforced at the inter-agent message layer.

### For [[the-slop-problem]]

[[error-cascades|False consensus]] is slop at the multi-agent layer: a system that confidently agrees on the wrong thing. The single-injection attack (one seed → 100% infection) is the adversarial analog of [[compounding-booboos|compounding booboos]] — one catastrophic event propagates through the dependency chain. The governance layer is the structural defense against false-consensus slop: unverified claims are mechanically prevented from becoming shared context.

### For [[the-agent-workflow]]

The multi-agent theory specifies the workflow design space. MDAPs are the maximal-decomposition pole (one step per microagent, voting as convergence). Expert-MAS is the hand-engineered pole (deterministic executor, LLM as subroutine). The governance layer is the message-layer pole (existing topology, governed messages). The auto-discovered topologies the audit indicts are the pole that doesn't work. The workflow thread's HITL/AFK split maps to: AFK for engineered-decomposition tasks (MDAPs, Expert-MAS); HITL for governance decisions (the Yellow-atom policy routing).

### For [[agent-quality-engineering]]

The governance layer is the MAS-specific quality infrastructure: observability (Lineage Graph) + verification (tri-state screening) + feedback (rollback) as a single message-layer plugin. The ablation (no blocking → 3.1% BICR) is the quality-engineering thesis that detection without enforcement is insufficient — the verification loop must be able to *reject*, not just *observe*.

## Tensions

> [!warning] Does the Engineered Escape Generalize Beyond Execution?
> MDAPs' million-step result is on Towers of Hanoi — a task with a known, fixed, recursive strategy. The paper is explicit that MAKER tests *execution*, not *insight*. The open question: do the log-linear scaling laws survive when the decomposition itself is part of the workload (the Appendix F generalization with recursive decomposition agents)? Preliminary results on large-digit multiplication are "promising" but not conclusive. If the scaling laws don't survive the move from execution to insight, the engineered escape is a solution for a subclass of long-horizon tasks (those with known decompositions), not for long-horizon tasks in general. The [[horizon-length]] paper's execution-vs-planning distinction is the live boundary.

> [!warning] The Governance Layer's Cost Overhead
> The governance layer's Strict mode achieves 0.94 BICR but at 4.5× the token cost of the None baseline and ~2.5× the latency. The Speed mode (0.89 BICR) is the cost-aware recommendation, but even Speed is ~1.7× tokens and ~1.6× latency over no defense. For production MAS where latency and cost are already the binding constraints (the audit's 10× cost premium), adding a governance layer that doubles the cost may be impractical. The trade-off is between *reliability* (governance) and *affordability* (no governance) — and the audit already showed that MAS without governance are unaffordable. The governance layer may make MAS reliable enough to use but too expensive to deploy, leaving the engineered-decomposition pole (MDAPs) as the only cost-effective path to reliable multi-agent execution.

> [!note] Departure: Two Engineering Poles, Not One
> The theory has two escape routes from the multi-agent illusion, and they are not interchangeable. MDAPs engineer the *architecture* (maximal decomposition) and work when the task admits single-step decomposition. The governance layer engineers the *message path* (claim-level verification) and works within existing topologies. The two are complementary: MDAPs solve the decomposition problem; governance solves the propagation problem. A MAS could use both — maximal decomposition for the execution layer, governance for the coordination layer. But no paper in the theory tests this combination. The wiki's read: the two poles address different failure modes (MDAPs address compounding/self-conditioning; governance addresses cascade amplification/consensus inertia), and a complete defense against both failure classes may require both. This is a reasonable but unvalidated extension.

> [!warning] The Theory's Coverage Gap: Adversarial vs. Stochastic Errors
> The cascade paper models two error sources: endogenous stochastic errors (the natural failure mode) and exogenous strategic adversaries (the attack). The governance layer is evaluated primarily against the adversarial case. MDAPs address the stochastic case (per-step voting catches random errors). The theory does not yet test whether the governance layer's blocking-with-rollback is cost-effective against *stochastic* errors (where the error rate is low and the cost of blocking + resampling may exceed the cost of the errors that slip through). The two error regimes may require different defenses: voting for stochastic, governance for adversarial. The theory is stronger on the adversarial side than the stochastic side.

## Related

- [[multi-agent-illusion]] — Layer 1: the audit
- [[mast]] — Layer 2: the diagnosis
- [[scaling-agent-systems]] — Layer 3: the thresholds
- [[error-cascades]] — Layer 4: the mechanism
- [[massively-decomposed-agentic-processes]] — Layer 5: the engineered escape
- [[maker]] — Layer 5: the implementation
- [[genealogy-governance]] — Layer 6: the defense
- [[expert-mas]] — the small-scale positive case that points toward the engineered-decomposition pole
- [[capability-saturation]] — the 45% threshold; the quantitative version of the capability floor
- [[tool-coordination-trade-off]] — the second robust predictor; tool-heavy tasks suffer from MAS inefficiency
- [[architectural-bloat]] — the static failure mode; the cascade paper's topological fragility is its quantitative version
- [[functional-collapse]] — the runtime failure mode; the cascade paper's saturation signatures are its propagation-mode signatures
- [[compounding-booboos]] — cascade amplification is compounding at the multi-agent layer; consensus inertia is the multi-agent self-conditioning
- [[self-conditioning]] — the single-agent failure mode the cascade paper generalizes to the multi-agent case
- [[critical-failure]] — the single-injection attack is the adversarial analog of a sparse critical failure
- [[backpressure]] — the governance layer's blocking-with-rollback is backpressure at the atomic-claim level; the ablation validates the thesis
- [[dynamic-trust]] — the governance layer implements dynamic trust as a hard boundary
- [[agent-observability]] — the Lineage Graph is claim-provenance observability
- [[horizon-length]] — MDAPs push horizon length via voting (raising effective `p`) rather than via model capability
- [[agent-floor]] — the tier-E ceiling; MDAPs are the architectural answer
- [[agent-loop]] — MDAPs as the sixth paradigm in the loop lineage
- [[prathyusha-jwalapuram]] — lead author of the audit (Layer 1)
- [[mert-cemri]] — lead author of the diagnosis (Layer 2)
- [[yizhe-xie]] — lead author of the mechanism and defense (Layers 4 and 6)
- [[elliot-meyerson]] — lead author of the engineered escape (Layer 5)

## Sources

- `raw/the-illusion-of-multi-agent-advantage.txt` — Jwalapuram, Lin et al. (Salesforce Research + HKUST-GZ + UBC + NTU, arXiv 2606.13003v2, 13 Jun 2026). §3 systematic evaluation across 6 frameworks and 5 benchmarks; §3.3 SMFR diagnostic benchmark + Expert-MAS; §4 architectural deconstruction (functional collapse, positional bias, motif analysis); §5 discussion (ensembling trap, capability floor). Source for Layer 1 (the audit).
- `raw/2503.13657-why-multi-agent-llm-systems-fail.txt` — Cemri, Pan, Yang et al. (UC Berkeley + Intesa Sanpaolo, NeurIPS 2025 Datasets & Benchmarks, arXiv 2503.13657v3, 26 Oct 2025). §4 MAST taxonomy (14 modes, 3 categories); §5.3 primacy of system design; Appendix B 41–86.7% failure rates; Appendix H intervention studies. Source for Layer 2 (the diagnosis).
- `raw/2512.08296-scaling-agent-systems.pdf` — Kim, Gu, Park et al. (Google Research + DeepMind + MIT, arXiv 2512.08296v3, 8 Apr 2026). §4.3 capability saturation (β = -0.236) and tool-coordination trade-off (β = -0.096); §4.4 error amplification factors (Independent 17.2×, Centralized 4.4×); three coordination regimes. Source for Layer 3 (the thresholds).
- `raw/2603.04474-spark-to-fire-error-cascades.txt` — Xie, Zhu, Zhang et al. (City University of Macau + Minzu University, arXiv 2603.04474v2, 11 May 2026). §II propagation-dynamics model (βρ(A) > δ); §IV three vulnerability classes; §V attack instantiation (up to 100% infection); §VI the governance layer; §VII evaluation and ablation. Source for Layers 4 and 6 (the mechanism and the defense).
- `raw/2511.09030-maker-million-step-zero-errors.txt` — Meyerson et al. (Cognizant AI Lab + UT Austin, arXiv 2511.09030v1, 12 Nov 2025). §3 MDAP framework (maximal decomposition, first-to-ahead-by-k voting, red-flagging); §3.2 log-linear cost scaling (Θ(s ln s), k_min = Θ(ln s)); §4.4 the million-step zero-error result; §5 discussion (insight vs. execution, microservices parallel, safety). Source for Layer 5 (the engineered escape).
