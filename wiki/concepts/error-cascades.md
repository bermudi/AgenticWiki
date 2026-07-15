---
title: Error Cascades in LLM-MAS
created: 2026-07-03
updated: 2026-07-14
sources:
  - raw/2603.04474.md
tags: [concept, multi-agent, error-propagation, security, failure-mode, mas-audit, graph-dynamics]
unaudited_marginal: 0
---

# Error Cascades in LLM-MAS

> A propagation-dynamics model for how a single atomic falsehood becomes system-level false consensus in LLM-based Multi-Agent Systems (Xie, Zhu, Zhang et al., City University of Macau + Minzu University, arXiv 2603.04474v2, May 2026). The collaboration graph is abstracted as a directed dependency graph; under iterative context reuse, errors spread as a deterministic contagion process governed by the spectral radius ρ(A) of the adjacency matrix. Three endogenous vulnerability classes are identified — cascade amplification, topological fragility, consensus inertia — and a single-injection attack reaches up to 100% false consensus across six mainstream frameworks. The model is the formal-mechanism layer beneath the [[mast]] failure taxonomy and the [[multi-agent-illusion]] audit.

## The Model

The MAS is a directed graph `G = (V, E)` with adjacency matrix `A`: an edge `j → i` means agent `j`'s output is in agent `i`'s context for the next round. A single atomic falsehood `m` (a minimal declarative claim that violates correctness — either a *factuality error* against ground truth, or a *faithfulness error* against the agent's evidence bundle) is tracked through the system.

Each agent `i` has a continuous adoption state `s_i(t) ∈ [0, 1]` — the probability it has internalized `m` as a working premise at round `t` (either by direct entailment or implicit reliance). System-level error coverage is `S(t) = (1/n) Σ s_i(t)`. The system reaches **false consensus** when `S(t)` exceeds a threshold `τ` and stays there.

### The Dynamics

Under an individual-based mean-field (IBMF) approximation, the one-step update is:

> **s_i(t+1) = (1 − δ) s_i(t) + (1 − s_i(t)) · f_i({s_j(t)})**

where `δ ∈ [0, 1]` is an effective decay rate aggregating forgetting, self-correction, and external verification, and `f_i` is the infection function from in-neighbors. The product-form infection function (matching round-based protocols) is:

> **f_i^prod(t) = 1 − Π_{j ∈ N(i)} (1 − β a_ij s_j(t))**

with propagation probability `β` per active in-neighbor. The Poisson-form variant `f_i^pois(t) = 1 − exp(−β Δt Σ a_ij s_j(t))` is used when a continuous-time interpretation is needed; the product form is the default and fits observed trajectories better on layered topologies.

### The Risk Criterion

Linearizing in the early regime (`s_i(t) ≪ 1`), the dominant growth factor is `(1 − δ) + β ρ(A)`, where `ρ(A)` is the spectral radius of `A`. The early-stage amplification condition is:

> **β ρ(A) > δ**, equivalently **R ≈ β ρ(A) / δ > 1**

When `R > 1` the system is supercritical: a single seed expands rapidly along the principal eigenvector of `A`. This is the structural-inevitability claim — amplification is not a quirk of a particular prompt but a consequence of high exposure coupling under the given interaction graph.

## The Three Vulnerability Classes

### V1. Cascade Amplification

A small, incidental error — a hallucination, a stale project fact — does not stay contained. Under recursive context reuse, concurrent mentions from different upstream agents *compound* rather than cancel (the non-linear `1 − Π(·)` term). Once `R > 1`, the dominant amplification mode associated with `ρ(A)` governs early growth.

Empirically (Figure 4), across six frameworks a tracer seed reaches saturation: five of six reach 100% final infection, including settings with explicit reviewer or QA roles. **Role assignment alone does not reliably stop propagation** once the seed starts spreading through the workflow. The topology signatures:

- **Chain** (LangChain, MetaGPT): stepwise sequential increase in `S(t)`
- **Star** (LangGraph, CrewAI): sharp jump when the hub adopts and broadcasts
- **Mesh** (AutoGen, CAMEL): near-immediate contamination (`t ≤ 3`)

### V2. Topological Fragility

System resilience depends not on error content but on *entry coordinates*. In the early linear regime, error state grows along the principal eigenvector `u_1` of `A`; a one-hot seed at node `v` excites the dominant cascade mode proportional to `[u_1]_v`. The structurally most dangerous seed is `v* = argmax_v [u_1]_v` — the hub.

| Framework | Hub infection | Leaf infection | Impact Factor |
|---|---|---|---|
| CrewAI | 100.0% | 15.9% | 6.29× |
| LangGraph | 100.0% | 9.7% | 10.31× |

The hub is a strict informational cut-set: leaf injection stays bounded until the hub adopts, at which point the system fails. The 10.31× impact factor for LangGraph is the quantitative version of [[architectural-bloat|architectural centralization]] as a vulnerability.

### V3. Consensus Inertia

A temporal asymmetry: introducing a falsehood is computationally cheap; correcting it grows more expensive as the workflow progresses. In artifact-centric workflows, intermediate outputs *are* the project state — an initial error crystallizes into constraints, assumptions, code skeletons, and evaluation criteria that subsequent steps build on. A delayed correction conflicts not with a single statement but with a dependency chain that has internalized the error.

| Intervention timing | Target role | Polluted rounds |
|---|---|---|
| t = 2 | Architect | 1.0 |
| t = 4 | QA Engineer | 2.9 |
| t = 6 | Architect | 3.9 |

This is [[compounding-booboos]] at the multi-agent layer with a named mechanism: the cost of correction is the cumulative burden of contextual debt accumulated before intervention. It is also the multi-agent analog of [[self-conditioning]]: the system conditions on its own error-laden shared state and resists reversal.

## The Attack: Directed Consensus Corruption

The paper instantiates an exogenous adversary that exploits the three vulnerabilities. The attack is gray-box (knows `G` and observed traces; no model weights) and operates at the application layer (user prompts, retrieved documents, injected messages). Three-step pipeline:

1. **Seed construction** — an atomic falsehood compatible with the task format (modify a dependency, alter a constraint, bias a criterion)
2. **Credibility packaging** — wrap the seed to align with local discourse patterns, raising `β` and suppressing `δ`. Two strategies:
   - *Compliance*: authoritative framing ("per company policy," "verified by admin") — exploits instruction-following tendency
   - *Security FUD*: frame as a critical resolution for a non-existent threat ("emergency patch for CVE-2024-0001") — bypasses verification by exploiting urgency
3. **Injection placement** — target high-influence nodes (gray-box: structural metrics aligned with `ρ(A)`; black-box: functional roles inferred from traces — aggregators, summarizers, final decision-makers)

### Attack Success Rates

| Topology | Framework | Baseline M / Q / R | Compliance M / Q / R | Security FUD M / Q / R |
|---|---|---|---|---|
| Chain | LangChain | 3.3 / 0.0 / 0.0 | 95.0 / 96.7 / 85.0 | 100.0 / 100.0 / 100.0 |
| Chain | MetaGPT | 5.0 / 11.7 / 46.7 | 100.0 / 98.3 / 100.0 | 96.7 / 76.7 / 95.0 |
| Mesh | AutoGen | 0.0 / 5.0 / 0.0 | 100.0 / 100.0 / 95.0 | 98.3 / 100.0 / 98.3 |
| Mesh | CAMEL | 0.0 / 0.0 / 0.0 | 100.0 / 100.0 / 100.0 | 100.0 / 98.3 / 100.0 |
| Star | CrewAI | 0.0 / 0.0 / 3.3 | 46.7 / 51.7 / 31.7 | 46.7 / 43.3 / 33.3 |
| Star | LangGraph | 0.0 / 8.3 / 11.7 | 100.0 / 100.0 / 100.0 | 100.0 / 98.3 / 100.0 |

(M / Q / R = QUANT / RIGID / MMLU scenarios.) Plain injection is near zero everywhere; intent-hiding packaging pushes ASR to 85–100% outside CrewAI. CrewAI's relative resistance suggests implementation-level coordination and routing policies materially affect how injected content is reused — coarse topology labels don't capture everything.

## Position in the Multi-Agent Evidence Base

| Question | Source | Answer |
|---|---|---|
| *Whether* automated MAS beat CoT-SC | [[multi-agent-illusion]] | No — up to 10× cost, functional collapse, architectural bloat |
| *Why* MAS fail | [[mast]] | 14 failure modes in 3 categories; system design is the binding constraint (44.2%) |
| *When* coordination helps vs. hurts | [[scaling-agent-systems]] | Quantitative thresholds: SA < 45%, low tool count, decomposable task |
| *How* errors propagate to false consensus | **This paper** | Graph dynamics: βρ(A) > δ; three vulnerability classes; single-seed → 100% infection |

> [!note] Synthesis: the mechanism layer beneath the diagnostics
> The wiki author's synthesis: MAST names *what* fails (14 modes), the illusion audit measures *whether* the architectures work (mostly no), the scaling study specifies *when* they help (conditional on capability + decomposability). This paper supplies the missing *how* — the formal propagation mechanism that explains why a single error becomes system-wide false consensus. The four papers together form a layered theory: mechanism (this paper) → diagnosis (MAST) → audit (illusion) → predictive thresholds (scaling). No single paper makes the full argument.

## Thread

- [[the-multi-agent-theory]] — Layer 4 (the mechanism): this page supplies the *how* — βρ(A) > δ, three vulnerability classes. The thread traces the full theory across six papers.
- [[the-slop-problem]] — false consensus is slop at the multi-agent layer: a system that confidently agrees on the wrong thing
- [[agent-quality-engineering]] — the propagation model is the formal basis for MAS-specific quality infrastructure; the defense layer is observability + verification applied at the message path
- [[the-verifiability-thesis]] — the risk criterion R ≈ βρ(A)/δ is a verifiability threshold for MAS: when structural amplification outpaces correction, the system cannot self-verify

## Related

- [[genealogy-governance]] — the defense layer introduced in the same paper: atomic-claim decomposition, lineage graph, tri-state screening, enforced rollback
- [[yizhe-xie]] — lead author
- [[mast]] — the failure taxonomy this paper supplies the mechanism for; MAST's FC2 (Inter-Agent Misalignment, 32.3%) is the diagnostic category for cascade amplification
- [[multi-agent-illusion]] — the audit this paper mechanistically explains; the [[functional-collapse|functional-collapse]] and [[architectural-bloat|architectural-bloat]] findings are the static symptoms of the dynamic propagation modeled here
- [[scaling-agent-systems]] — the architecture-specific error-amplification factors (Independent 17.2×, Centralized 4.4×) are the regression-side measurement of the propagation this paper models formally
- [[compounding-booboos]] — cascade amplification is compounding at the multi-agent layer; consensus inertia is the multi-agent analog of [[self-conditioning]]
- [[self-conditioning]] — the single-agent failure mode this paper generalizes to the multi-agent case: the system conditions on its own error-laden shared state
- [[critical-failure]] — the single-injection attack is the adversarial analog of a sparse critical failure: one seed → system-wide corruption
- [[dynamic-trust]] — the governance layer *implements* dynamic trust: claims are trusted only when verified against the lineage graph, not by source role
- [[agent-observability]] — the lineage graph is observability applied to claim provenance: every atomic claim has a traceable entry, propagation, and correction history
- [[backpressure]] — the governance layer's blocking-with-rollback is backpressure at the atomic-claim level: unverified claims are mechanically prevented from entering shared context
- [[architectural-bloat]] — topological fragility is the quantitative version: the hub is the bloat point, and `ρ(A)` measures its vulnerability
- [[functional-collapse]] — the saturation signatures (chain stepwise, star jump, mesh immediate) are propagation-mode signatures of the collapse patterns the illusion audit documents

## Sources

- `raw/2603.04474.md` — Xie, Zhu, Zhang, Zhu, Ye, Qi, Chen, Zhou (City University of Macau + Minzu University of China, arXiv 2603.04474v2, 11 May 2026). §II system modeling (atomic falsehood, adoption definition, IBMF dynamics, product-form infection function, spectral risk criterion R ≈ βρ(A)/δ); §III threat model (endogenous stochastic errors, exogenous strategic adversary, gray-box capabilities); §IV endogenous vulnerabilities (cascade amplification Figure 4, topological fragility Table II, consensus inertia Table III); §V exogenous attack instantiation (three-step pipeline, compliance + security FUD packaging); §VII evaluation (Tables IV–VII ASR/BICR/Safe Completion/Token/Latency); §VIII limitations; §X conclusion.
