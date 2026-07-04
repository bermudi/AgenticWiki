---
title: MAST — Multi-Agent System Failure Taxonomy
created: 2026-07-03
updated: 2026-07-03
sources:
  - raw/2503.13657-why-multi-agent-llm-systems-fail.pdf
  - raw/2512.08296-scaling-agent-systems.pdf
tags: [concept, multi-agent, failure-modes, taxonomy, evaluation, empirical, mas-audit]
unaudited_marginal: 0
---

# MAST — Multi-Agent System Failure Taxonomy

> The first empirically grounded taxonomy of failure modes in Multi-Agent LLM Systems (MAS). Built via Grounded Theory analysis of 150 traces across 5 frameworks (κ=0.88 inter-annotator agreement), MAST identifies 14 failure modes in 3 categories: System Design Issues (44.2%), Inter-Agent Misalignment (32.3%), and Task Verification (23.5%). Released alongside MAST-Data: 1642 annotated traces from 7 popular MAS frameworks, with an LLM-as-a-Judge annotator calibrated to κ=0.77 against human experts.

## The Taxonomy

MAST (Cemri, Pan, Yang et al., UC Berkeley + Intesa Sanpaolo, NeurIPS 2025 Datasets & Benchmarks) organizes 14 failure modes into 3 categories, mapped to the inter-agent conversation stages (Pre-Execution, Execution, Post-Execution) where their root causes typically emerge.

### FC1. System Design Issues (44.2% of failures)

Failures originating in pre-execution design decisions — system architecture, prompt specifications, state management — even when they manifest during execution.

| Mode | % | Description |
|---|---|---|
| FM-1.1 Disobey Task Specification | 11.8% | Failure to adhere to specified task constraints or requirements |
| FM-1.2 Disobey Role Specification | 1.5% | Agent behaves outside its assigned role's responsibilities |
| FM-1.3 Step Repetition | 15.7% | Unnecessary reiteration of previously completed steps |
| FM-1.4 Loss of Conversation History | 2.8% | Unexpected context truncation, reverting to antecedent state |
| FM-1.5 Unaware of Termination Conditions | 12.4% | Failure to recognize when interaction should terminate |

**Insight 1:** MAS failure is not merely a function of the underlying model. A well-designed MAS can produce performance gains on the same backbone. The ChatDev intervention — fixing the CPO agent's role specification so the CEO had final say — yielded +9.4% task success on the same user prompt and LLM (GPT-4o).

### FC2. Inter-Agent Misalignment (32.3% of failures)

Failures arising from breakdowns in critical information flow during inter-agent coordination.

| Mode | % | Description |
|---|---|---|
| FM-2.1 Conversation Reset | 2.2% | Unexpected restarting of dialogue, losing context and progress |
| FM-2.2 Fail to Ask for Clarification | 6.8% | Proceeding with wrong assumptions instead of seeking clarification |
| FM-2.3 Task Derailment | 7.4% | Deviation from the intended objective into irrelevant actions |
| FM-2.4 Information Withholding | 0.8% | Failure to share data that would impact other agents' decisions |
| FM-2.5 Ignored Other Agent's Input | 1.9% | Disregarding input or recommendations from other agents |
| FM-2.6 Reasoning-Action Mismatch | 13.2% | Discrepancy between stated reasoning and actual actions taken |

**Insight 2:** Communication-protocol fixes (e.g., MCP, A2A) are often insufficient for FC2 failures. The errors occur even when agents within the same framework communicate in natural language. The paper attributes this to a collapse of "theory of mind" — agents fail to model other agents' informational needs. Robust solutions likely require both structural improvements to message content and model-level advancements in communicative intelligence, since base LLMs are not pre-trained for nuanced inter-agent dynamics.

### FC3. Task Verification (23.5% of failures)

Failures in quality control of final output — inadequate verification, premature termination.

| Mode | % | Description |
|---|---|---|
| FM-3.1 Premature Termination | 6.2% | Ending task before all objectives have been met |
| FM-3.2 No or Incomplete Verification | 8.2% | Omission of proper checking of task outcomes |
| FM-3.3 Incorrect Verification | 9.1% | Failure to validate or cross-check crucial information |

**Insight 3:** Multi-level verification is needed. Sole reliance on final-stage, low-level checks is inadequate. Systems with explicit verifiers (MetaGPT, ChatDev) generally show fewer total failures, but the verifier is not a silver bullet — a ChatDev-generated chess program passed superficial checks (code compilation) but contained runtime bugs because verification never validated against actual game rules. Adding a high-level task-objective verification step to ChatDev yielded +15.6% improvement on ProgramDev.

## MAST-Data

The dataset comprises 1642 annotated execution traces from 7 popular MAS frameworks, covering coding, math, and general-agent task domains:

| MAS | Benchmark | LLM | Annotation | Traces |
|---|---|---|---|---|
| ChatDev | ProgramDev | GPT-4o | HE, HA, LA | 30 |
| MetaGPT | ProgramDev | GPT-4o | HE, HA, LA | 30 |
| HyperAgent | SWE-Bench Lite | Claude-3.7-Sonnet | HE, HA, LA | 30 |
| AppWorld | Test-C | GPT-4o | HE, HA, LA | 30 |
| AG2 (MathChat) | GSM-Plus | GPT-4 | HE, HA, LA | 30 |
| Magentic-One | GAIA | GPT-4o | HE, HA, LA | 30 |
| OpenManus | ProgramDev | GPT-4o | HE, HA, LA | 30 |

(HE = Human Evaluated, HA = Human Annotated, LA = LLM Annotated; additional 100-trace and larger configurations in the full table.)

The 7 frameworks span the topology space: assembly line (MetaGPT), hierarchical workflow (ChatDev, HyperAgent, OpenManus), star topology (AppWorld, Magentic-One), and agentic framework (AG2). Failure rates range from 41% (AG2 on OlympiadBench) to 86.7% (AppWorld on Test-C) — confirming the [[multi-agent-illusion]] finding that MAS performance gains are often minimal.

## The LLM-as-a-Judge Annotator

To scale annotation beyond the human-labeled subset, the authors built an LLM annotator using OpenAI's o1 with few-shot examples from human-annotated data. Performance on a held-out set:

| Model | Accuracy | Recall | Precision | F1 | Cohen's κ |
|---|---|---|---|---|---|
| o1 | 0.89 | 0.62 | 0.68 | 0.64 | 0.58 |
| o1 (few-shot) | 0.94 | 0.77 | 0.833 | 0.80 | 0.77 |

The few-shot annotator achieves κ=0.77 against expert humans — substantial agreement. Validated on two unseen MAS (OpenManus, Magentic-One) and two unseen benchmarks (MMLU, GAIA): κ=0.79. This supports MAST's generalizability across systems and tasks. Released as a pip-installable library (`agentdash`).

## Intervention Studies

Two case studies demonstrate MAST as a debugging tool — measuring failure modes before and after tactical interventions:

### AG2 / MathChat (GSM-Plus)
- **Baseline**: 84.75% (GPT-4), 84.25% (GPT-4o)
- **Improved prompt** (added verification section): 89.75% / 89.00%
- **New topology** (Problem Solver + Coder + Verifier roles, only Verifier terminates): 85.50% / 88.83%

### ChatDev (ProgramDev-v0 / HumanEval)
- **Baseline**: 25.0% / 89.6%
- **Improved prompt** (enforce hierarchy, role adherence, edge-case verifier specs): 34.4% / 90.3%
- **New topology** (DAG → cyclic graph, CTO confirms all reviews satisfied, max iteration cutoff): 40.6% / 91.5%

Topology-based changes were more effective than prompt-based changes for both systems. But the authors emphasize these are *first-step* interventions — not all failure modes are resolved, task completion rates remain low, and substantial improvements require structural strategies (strong verification, standardized communication protocols, uncertainty quantification, memory and state management), not just tactical prompt/topology tweaks.

## The Primacy of System Design

The paper's central conjecture: improvements in base-model capabilities will be insufficient to address the full MAST. Good MAS design requires *organizational understanding* — even organizations of sophisticated individuals fail catastrophically (Perrow's *Normal Accidents*) if the organizational structure is flawed. High-reliability organization research shows well-defined design principles prevent such failures.

This positions MAST as the diagnostic vocabulary for the [[multi-agent-illusion]] finding: the illusion is not that MAS *cannot* work (the [[expert-mas]] baseline proves they can), but that *current* MAS designs fail in identifiable, classifiable ways — and the failure modes point to system design, not model capability, as the binding constraint.

## Quantitative Corroboration: The Scaling Study

The [[scaling-agent-systems|Kim et al. scaling study]] (260 configurations, 6 benchmarks, 3 LLM families) explicitly builds on MAST, categorizing observed errors into specification, inter-agent misalignment, and verification failures. It provides the quantitative companion to MAST's qualitative taxonomy:

| MAST category | MAST share | Scaling study's quantitative measure |
|---|---|---|
| FC1 System Design Issues | 44.2% | The over-coordination regime (Hybrid at 515% overhead) produces 12.4% coordination-failure errors — 7× Centralized's 1.8%. Protocol complexity exceeding robust implementation is the quantitative version of system design failure. |
| FC2 Inter-Agent Misalignment | 32.3% | Trace-level error amplification: Independent 17.2×, Decentralized 7.8×, Hybrid 5.1×. Errors propagate through debate rounds and unchecked channels — the quantitative version of inter-agent misalignment. |
| FC3 Task Verification | 23.5% | Centralized coordination contains error amplification to 4.4× via validation bottlenecks, vs 17.2× for Independent (no verification). The 4× gap is the quantitative measure of verification's value — exactly what MAST's FC3 category diagnoses. |

The scaling study's [[capability-saturation|capability saturation]] finding (β = -0.236, the most robust predictor) also corroborates MAST's central conjecture: improvements in base-model capabilities will be insufficient to address the full taxonomy. As models improve and single-agent baselines rise above 45%, MAS coordination overhead becomes net cost — the failure modes MAST identifies don't disappear, they become *more* expensive relative to the alternative.

## Methodology

MAST was built using Grounded Theory (Glaser & Strauss, 1967):
1. **Theoretical sampling**: 150 traces from 5 frameworks (HyperAgent, AppWorld, AG2, ChatDev, MetaGPT) across programming and math tasks
2. **Open coding**: 6 expert annotators labeled failure behaviors (20+ hours per annotator)
3. **Constant comparative analysis**: refine and identify recurrence across systems
4. **Theoretical saturation**: iterate until no new failure modes emerge
5. **Inter-annotator agreement**: 3 rounds, 15 traces, refining definitions until κ=0.88

The Grounded Theory approach ensures the taxonomy emerges from empirical data rather than top-down hypothesis — the failure modes are observed, not assumed.

## Thread

- [[agent-quality-engineering]] — MAST is the failure-mode taxonomy for the multi-agent layer of the quality infrastructure; the FC3 verification finding directly reinforces the multi-level verification thesis
- [[the-agent-workflow]] — the failure modes diagnose where multi-agent workflows break in practice
- [[the-verifiability-thesis]] — the FC3 finding (verifier is not a silver bullet; multi-level verification needed) is verifiability applied at the MAS architecture level

## Related

- [[multi-agent-illusion]] — the cost-controlled audit that asks *whether* MAS outperform; MAST asks *why* they fail. Complementary diagnostics for the same empirical phenomenon.
- [[multi-agent-code-orchestration]] — the topology/role taxonomy that MAST's failure modes map onto; FC1 modes correspond to topology/role design flaws, FC2 to interaction-mode breakdowns, FC3 to convergence-pattern failures
- [[failure-modes]] — the wiki's master failure-mode table; MAST contributes the multi-agent section
- [[expert-mas]] — the hand-designed baseline demonstrating that engineered MAS can work; MAST's intervention studies (+9.4%, +15.6%) reinforce the "engineered not discovered" thesis at smaller scale
- [[architectural-bloat]] — FC1 system design issues are the empirical manifestation: complex architectures with flawed design decisions
- [[functional-collapse]] — FC2 inter-agent misalignment includes the runtime reduction patterns (consensus collapse, ignored input, reasoning-action mismatch)
- [[agent-evals]] — MAST-Data is a labeled eval dataset for MAS; the LLM annotator is a calibrated LLM-as-judge for failure classification
- [[llm-as-code-judge]] — the LLM annotator's κ=0.77 against human experts is a data point for LLM-as-judge reliability in a structured classification task (vs. the open-ended rubric evaluation where RUBRICEVAL found 55.97%)
- [[critical-failure]] — MAST's per-mode percentages are the MAS analog of the sparse-catastrophic-error finding: a few modes (FM-1.3, FM-1.1, FM-2.6, FM-3.3) account for the majority of failures
- [[backpressure]] — the FC3 finding (superficial checks pass, runtime bugs remain) is a backpressure failure: the verification gate is too weak to mechanically reject wrong outputs
- [[operational-mirror]] — MAST's tactical-vs-structural strategy distinction parallels the operational mirror's per-edit-vs-distributional distinction: tactical fixes address individual modes, structural strategies address system-wide patterns
- [[mert-cemri]] — lead author (with Melissa Z. Pan and Shuyi Yang) of the MAST paper
- [[scaling-agent-systems]] — the quantitative companion: 260-config regression that measures the error amplification factors and coordination regimes MAST diagnoses qualitatively
- [[capability-saturation]] — the quantitative corroboration of MAST's central conjecture (base-model improvements insufficient): the 45% threshold means MAS failure modes become *more* expensive as models improve

## Sources

- `raw/2503.13657-why-multi-agent-llm-systems-fail.pdf` — Cemri, Pan, Yang et al. (UC Berkeley + Intesa Sanpaolo, NeurIPS 2025 Datasets & Benchmarks, arXiv 2503.13657v3, 26 Oct 2025). §3 MAST-Data construction (Grounded Theory, IAA κ=0.88, LLM annotator κ=0.77); §4 MAST taxonomy (14 modes, 3 categories, 3 insights); §5 failure breakdown and primacy of system design; Appendix A failure mode definitions; Appendix B MAS details and failure rates (41–86.7%); Appendix G tactical vs structural strategies (Table 4); Appendix H intervention case studies (Table 5: AG2 +5pp, ChatDev +15.6pp); Appendix N failure mode examples.
- `raw/2512.08296-scaling-agent-systems.pdf` — Kim, Gu, Park et al. (Google Research + DeepMind + MIT, arXiv 2512.08296v3, 8 Apr 2026). §4.4 error taxonomy (architecture-specific failure modes mapped to MAST categories); Table 5 trace-level error amplification factors (Independent 17.2×, Centralized 4.4×); §4.4 three coordination regimes (under-coordination, optimal band, over-coordination). Source for the "Quantitative Corroboration" section.
