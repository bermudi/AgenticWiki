---
title: Self-Harness
created: 2026-06-16
updated: 2026-06-16
sources:
  - raw/self-harness-harnesses-that-improve-themselves.txt
tags: [concept, agent-harness, self-evolution, harness-engineering, harness-recursion]
unaudited_marginal: 0
---

# Self-Harness

> A paradigm in which a fixed LLM-based agent iteratively improves its own operating harness — the prompts, tools, runtime policies, and verification rules that mediate its behavior — without relying on human engineers or stronger external agents. Operationalized as a three-stage loop (Weakness Mining → Harness Proposal → Proposal Validation) that converts execution traces into bounded, regression-tested harness edits. Across three diverse base models on Terminal-Bench-2.0, held-out pass rates improved by 14.2 to 21.4 percentage points absolute — gains attributable to the harness rather than the model.

## The Three Paradigms of Harness Improvement

The paper positions Self-Harness between two existing paradigms:

1. **Human harness engineering**: Human experts manually inspect and revise the agent harness. Effective but scales poorly with model diversity and rapid release cycles.
2. **Meta-Harness** (external optimizer): A stronger external agent (or automated search) optimizes a weaker target agent's harness. Relies on access to a stronger model and a defined search space.
3. **Self-Harness**: The same fixed model, under its current harness, proposes bounded edits to its own harness from execution evidence. No external guidance.

The empirical claim: with the same model, same tool set, same benchmark, and same evaluator, Self-Harness promotes small, auditable, regression-tested edits that turn model-specific failure patterns into concrete harness changes. Different base models require different harness changes — Self-Harness captures the model-specific pathologies rather than applying a generic "better prompt."

## The Three-Stage Loop

### 1. Weakness Mining
Run the fixed model M under current harness hₜ on a held-in split of tasks. For each failed run, compute a **failure signature** φ(rᵢ) = (cᵢ, qᵢ, mᵢ):
- **cᵢ** = terminal verifier-level cause (what the evaluator rejected)
- **qᵢ** = causal status of the relevant agent behavior (how the agent's behavior contributed to the rejection)
- **mᵢ** = abstract agent mechanism (the reusable behavioral pattern exposed by the trace)

Cluster failed records by exact signature agreement. This is **deterministic and evaluator-grounded** — two runs land in the same cluster only when they share verifier cause, causal status, and abstract mechanism. The result is an **evidence bundle** Bₜ grouping failures by reusable mechanism rather than superficial symptom.

### 2. Harness Proposal
Invoke the same model M (with current harness hₜ) in a proposer role. The proposer receives a bounded context: the editable surfaces of the current harness, the evidence bundle, records of passing behaviors to preserve, and summaries of previously attempted edits. It generates K **mutually distinct** proposal bundles {Δⱼ, aⱼ}, where each edit:
- Targets a specific failure mechanism from Bₜ
- Modifies only the surface needed to address that mechanism
- Avoids broad rewrites of the agent control architecture
- Carries an audit record {aⱼ} describing target, surface, expected effect, and regression risks

Diversity is encouraged across branches (different mechanisms, surfaces, or hypotheses). Minimality is enforced within each branch (no over-patching).

### 3. Proposal Validation
Each candidate hₜ⁽ʲ⁾ = Δⱼ(hₜ) is evaluated on the held-in split (whether the edit addresses the evidence that motivated it) and the held-out split (regression test for behaviors the proposer never saw). The **acceptance rule** is conservative:

> ∆ᵢₙ⁽ʲ⁾ ≥ 0 AND ∆ₕₒ⁽ʲ⁾ ≥ 0 AND max(∆ᵢₙ⁽ʲ⁾, ∆ₕₒ⁽ʲ⁾) > 0

An edit is promoted only if it improves at least one split without degrading the other. Candidates that only trade off one split for the other are rejected, even if total pass count increases. Multiple accepted candidates are merged into the next harness; rejected candidates are logged but do not change the active harness.

## Empirical Results on Terminal-Bench-2.0

Three base models from diverse families, same minimal DeepAgent-based initial harness, 64-task subset of Terminal-Bench-2.0:

| Model | Initial Pass (held-out) | Final Pass (held-out) | Absolute gain | Relative gain |
|---|---|---|---|---|
| MiniMax M2.5 | 40.5% | 61.9% | +21.4 pp | +53% |
| Qwen3.5-35B-A3B | 23.8% | 38.1% | +14.3 pp | +60% |
| GLM-5 | 42.9% | 57.1% | +14.2 pp | +33% |

Held-in improvements were also substantial (16%, 138%, 20% relative). The held-out gains are decisive: edits generalize rather than overfitting to the evidence used to motivate them.

## Model-Specific Harness Adaptations

The qualitative analyses reveal that Self-Harness produces *different* edits for *different* models, driven by their observed failure mechanisms:

- **MiniMax M2.5**: Promoted edits encourage early artifact creation, careful handling of structured tool content, and breaking unproductive tool-use loops via a runtime policy that limits total tool messages
- **Qwen3.5-35B-A3B**: Promoted edits add dependency prechecking, retry discipline, and a tool-error-triggered system prompt that redirects the agent to recover missing artifacts
- **GLM-5**: Promoted edits make environment changes persist across shell sessions and push the agent from prolonged exploration toward implementation and testing

A common thread: all three models receive edits targeting **artifact reliability** (create the required output early, ensure it survives tool failures, verify it before concluding). The differences lie in *how* the harness reaches that outcome for each model's behavioral pattern.

## Relationship to the Wiki

### Self-evolving harness as the open problem comes due
`raw/2605.18747.pdf` §5.2.3 explicitly lists "Self-Evolving Harnesses without Regression" as an open problem. Self-Harness provides a concrete instantiation: a propose-evaluate-accept loop with a conservative acceptance rule, regression-tested on held-out splits, and bounded edits rather than free-form rewrites. The empirical results (held-out improvements of 14–21 pp across three models) show that the open problem is closer to solved than to speculative.

### Strictly weaker than Meta-Harness, but model-agnostic
Meta-Harness (Lee et al., 2026) uses a stronger external agent to optimize a weaker target's harness — strictly more capable, but requires access to a stronger model. Self-Harness's contribution is that the same model can drive its own improvement without that external anchor. This matters for frontier models where no stronger model exists to provide guidance, and for deployment contexts where model families differ from training stacks.

### Bounded edits vs. free evolution
Self-Harness deliberately constrains the proposal space: each edit must target one mechanism, modify only the relevant surface, and not rewrite the control architecture. This contrasts with broader self-evolution work (Gödel Agent, Darwin Gödel Machine, The AI Scientist) where the harness and model weights can change together. The narrower scope is what makes regression testing decisive: small bounded edits either improve a specific held-in failure mechanism or they don't, and the acceptance rule is auditable.

## Design Properties

| Property | How Self-Harness implements it |
|---|---|
| **Bounded** | Edit ∆ must modify only the surface needed for its targeted mechanism |
| **Auditable** | Each proposal logs target, surface, expected effect, regression risks, and accept/reject decision |
| **Regression-tested** | Held-out split is never exposed to the proposer; acceptance rule is non-degressive |
| **Model-specific** | Evidence bundle is computed per-model; proposals are not transferred across base models |
| **Empirically grounded** | Every edit is motivated by verifier-grounded failure signatures, not by the proposer's prior |

## The Acceptance Rule as a Safety Mechanism

The conservative acceptance rule — improve at least one split without degrading the other — is the key safety property. It prevents the harness from:

- **Overfitting** to the held-in evidence at the cost of held-out performance
- **Pareto trades** that improve aggregate pass count but break specific task types
- **Stochastic promotion** of edits that won a single favorable run

In domains where higher-stakes harness changes matter, the rule is the floor, not the ceiling. The authors explicitly call out that production harness evolution would need stronger acceptance gates than pass-rate non-regression alone.

## Open Questions Left in the Paper

- The protocol depends on the quality of verifier outcomes and trace records — if the verifier is wrong about why a task failed, the weakness mining produces misleading evidence
- Accepted edits may still reflect benchmark-specific failure patterns (the protocol validates against Terminal-Bench-2.0 tasks, not arbitrary environments)
- The proposer is the same model as the agent — a stronger proposer (Meta-Harness's approach) might find edits the model can't propose for itself
- Cost characterization is not provided (the proposer invocation + per-candidate evaluation are non-trivial compute)

## Thread

- [[harness-engineering]] — Self-Harness instantiates the §5.2.3 "Self-Evolving Harnesses without Regression" open problem with a concrete propose-evaluate-accept loop and empirical evidence
- [[the-verifiability-thesis]] — The conservative acceptance rule depends on trustworthy verification; the paper's oracle-adequacy concern is the verifiability thesis applied to the self-evolution loop
- [[the-agent-workflow]] — Self-Harness is the AFK-phase version of harness engineering: the harness improves itself while the human is out of the loop
- [[evolving-context]] — Self-Harness is evolving context at the harness level rather than at the prompt/skill level
- [[agent-quality-engineering]] — The held-in/held-out split and conservative acceptance rule are quality infrastructure for the self-evolution loop

## Related

- [[harness-mechanisms]] — Self-Harness is a meta-loop over the harness mechanisms (planning, memory, tool use, control, optimization)
- [[multi-agent-code-orchestration]] — Subagent-based decomposition and middleware creation are the structural edits Self-Harness can promote (see GLM-5 case)
- [[code-as-agent-harness]] — The harness surface that Self-Harness modifies is the [[harness-interface]] layer
- [[verifiability]] — The acceptance rule relies on the verifiability principle: trustworthy pass/fail signals are the substrate for self-evolution
- [[verification-loop]] — Held-out regression testing extends the verification loop to the self-evolution process itself
- [[recursive-agent-harness]] — The complementary pattern: same model, but recursing over the harness rather than editing it
- [[babysitter-agent]] — The babysitter manages the agent's context; Self-Harness manages the agent's harness — the same invisible-maintenance pattern at different layers
- [[software-factory]] — Software factories automate spec-to-software; Self-Harness automates harness-engineering — both self-optimization at different layers of the stack

## Sources

- `raw/self-harness-harnesses-that-improve-themselves.txt` — Zhang, Zhang, Li, Zhang, Chen, Zhang, Bai, Hu (Shanghai AI Lab, 2026). *Self-Harness: Harnesses That Improve Themselves.* Full paper: §1 motivation, §3 algorithm, §4 experiments, §5 conclusion. Empirical results on Terminal-Bench-2.0 with MiniMax M2.5, Qwen3.5-35B-A3B, GLM-5.
