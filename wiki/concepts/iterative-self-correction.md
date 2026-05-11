---
title: Iterative Self-Correction
created: 2026-05-10
updated: 2026-05-10
sources:
  - raw/2504.21625v6.txt
tags: [concept, self-correction, instruction-following, benchmarks, feedback-loops, agent-workflow]
---

# Iterative Self-Correction

> A pattern where an LLM receives automated feedback on which constraints it violated and retries its response, cycling through evaluation → feedback → correction until all constraints are satisfied or a turn limit is reached. The Meeseeks benchmark evaluates this capability across 32 constraint types and 20 turns, revealing that even with perfect feedback, all current models hit a sub-91% ceiling — and exhibit bizarre failure modes like catastrophic overcorrection.

## The Pattern

The iterative self-correction loop is structurally simple:

```
Response → Evaluate against constraints → Generate targeted feedback → Model self-corrects → Repeat
```

This pattern matters for agent workflows because it operationalizes [[backpressure]] at the individual-response level. Instead of the human reviewing agent output and writing corrective issues (the [[ralph-loop]] pattern), an automated evaluator identifies specific constraint violations and the model retries immediately.

The key question: does this actually work? Can models leverage precise, constraint-level feedback to converge toward correct outputs?

## Meeseeks Benchmark

Wang et al. (2025) introduce Meeseeks, a multi-turn automatic instruction-following benchmark:

- **700+ instances** in Chinese and English
- **32 capability tags** across 3 cognitive evaluation dimensions:
  1. **Intent Recognition** — Does the model understand what's being asked (e.g., "modify the prompt," not "execute the prompt")?
  2. **Granular Content Validation** — Word counts, keyword inclusion, proportional constraints, language mixing
  3. **Output Structure Validation** — Multiple element generation without redundancy, format compliance
- **20 turns** of feedback-driven self-correction per instance
- **Utility rate**: fraction of responses that satisfy ALL constraints (all-or-nothing)

### Code-Guided, Rule-Augmented Evaluation

The paper's major innovation: instead of having an LLM judge subjectively evaluate responses (unreliable due to hallucinations), or regenerating cleaned versions of long responses (expensive and inaccurate), the evaluator is prompted to **write code** that extracts the relevant content from the model's response. A Python script then checks constraint satisfaction deterministically.

Result: end-to-end evaluation accuracy improved from 78.7% to **98.4%**, with up to 71% reduction in token consumption. This is a concrete example of making [[verifiability|instruction-following verifiable]] through code-guided evaluation — a pattern directly applicable to agent quality infrastructure.

## Key Findings

### The Ceiling Is Lower Than Expected

Even after 20 turns of feedback-driven self-correction, **no model exceeded 91% utility rate**. The best performer (Claude Sonnet 4 Thinking) reached ~90%. Most models plateaued well below that. This has a stark implication: current models have a hard ceiling on instruction-following that no amount of feedback overcomes within a single session.

### The Single-Turn vs. Multi-Turn Gap

The gap between a model's single-turn performance and its multi-turn upper limit is **larger than single-turn rankings suggest**. Models that start behind often catch up or surpass initially stronger models over multiple turns. The Pearson correlation between Turn 1 and Turn 20 rankings decays rapidly. A model's single-attempt score tells you little about its ultimate capability ceiling.

### Reasoning Models Consistently Outperform

Reasoning models (o3-mini, Claude Thinking variants, Qwen3-think) outperform non-reasoning counterparts, and the gap **widens** over multiple turns. Reasoning models:
- Are more sensitive to word count feedback
- Pre-calculate content quantities in their reasoning traces
- Verify constraint satisfaction before outputting
- Mitigate the "overcorrection momentum" seen in non-reasoning models

### Catastrophic Overcorrection

A bizarre failure mode: when told their word count is off, models don't converge smoothly. Instead, they oscillate wildly:

```
Target: ~400 words
Turn 1: 300 words (under) → gets feedback
Turn 2: 330 words (still under) → gets feedback again
Turn 3: 600 words (massively over) → gets feedback
Turn 4: 100 words (collapses) → gets feedback
... oscillation continues for many turns
```

Models lack a stable internal model of their own output length. They know the *direction* of error (too short / too long) but can't calibrate magnitude. This is a fundamental limitation of token-by-token generation — the model has no explicit word counter and can only approximate.

### Prompt Modification Intent Failure

When asked to *modify* a prompt (delimited by special markers) rather than *execute* it, most models execute it anyway on the first attempt. Even after explicit feedback explaining the mistake, a substantial proportion never recover. This suggests multi-turn dialogue systems have limited capacity for task reorientation — once a model commits to an interpretation, it struggles to pivot.

### The o3-mini Exception: In-Context Learning from Feedback

A remarkable positive finding: o3-mini (high) was the only model capable of leveraging pingze (tonal pattern) feedback to reconstruct content satisfying Chinese tonal constraints — a domain no model was trained on. This demonstrates that some models can genuinely *learn* from feedback within a session, going beyond simple constraint patching.

## Implications for Agent Workflows

1. **Iterative feedback isn't a silver bullet.** It helps, but there's a hard ceiling. Don't build workflows that assume convergence.

2. **Code-guided evaluation is production-ready.** The 98.4% accuracy at 71% token savings is a pattern worth adopting for agent quality infrastructure — write evaluators as code, not as LLM judges.

3. **Reasoning models are the right choice for constraint-heavy tasks.** The gap over non-reasoning models widens with iteration. Route constraint-dense prompts to reasoning models.

4. **Word count constraints are fundamentally hard.** Models can approximate but not precisely control output length. For production systems, post-process word counts rather than relying on the model to hit targets.

5. **Prompt modification is a distinct capability.** Asking an agent to modify a prompt rather than execute it requires explicit verification — most models fail silently.

## Catastrophic Overcorrection: A Distinct Failure Mode

The most revealing finding from Meeseeks is catastrophic overcorrection — a failure mode where models receiving precise feedback about constraint violations do not converge smoothly but instead oscillate wildly:

```
Target: ~400 words
Turn 1: 300 words (under) → gets feedback
Turn 2: 330 words (still under) → gets feedback again
Turn 3: 600 words (massively over) → gets feedback
Turn 4: 100 words (collapses) → gets feedback
... oscillation continues for many turns
```

### What Makes This Distinct

Catastrophic overcorrection is not covered by the wiki's existing failure mode taxonomy:

| Failure Mode | Mechanism | Catastrophic Overcorrection? |
|---|---|---|
| [[hallucination]] | Statistical error, lossy compression | No — the model isn't fabricating; it knows the direction of error |
| [[synthetic-truth]] | Intent-aware fabrication to satisfy user | No — the model isn't constructing a narrative; it's trying to comply |
| [[execution-apathy]] | Resigns without executing | No — the model is trying hard, iterating persistently |
| [[blind-panic]] | Tool hallucination under planning load | No — no tool calling involved; the model just can't calibrate |
| Catastrophic overcorrection | Control failure: can't map feedback magnitude to output adjustment | **Yes** — a distinct category |

### Root Cause: No Internal Word Counter

Models generate token-by-token with no explicit word counting mechanism. They can sense the *direction* of error (too short / too long) from feedback but cannot calibrate *magnitude* — the adjustment step is a blind guess. When the guess is wrong, the next feedback triggers another blind adjustment, creating the oscillation.

This is a fundamental limitation of autoregressive generation, not a training gap. Until models have internal mechanisms for precise output length control, word count constraints will produce this failure mode.

### The Reasoning Model Exception

Reasoning models partially mitigate catastrophic overcorrection. They pre-calculate content quantities in their reasoning traces and verify constraint satisfaction before outputting — effectively building an internal calibration loop before the visible response. This doesn't eliminate the problem but reduces oscillation amplitude: the reasoning trace absorbs some of the blind guessing.

This is why the reasoning-vs-non-reasoning gap widens over multiple turns — non-reasoning models suffer full-amplitude oscillation while reasoning models dampen it.

## Thread
- [[the-agent-workflow]] — Iterative self-correction is a micro-scale version of the HITL→AFK cycle: automated evaluation replaces human review at the per-response level
- [[agent-quality-engineering]] — The evaluation-feedback-correction loop is the innermost cycle of the quality flywheel; Meeseeks quantifies how much headroom exists
- [[the-verifiability-thesis]] — Code-guided evaluation makes instruction-following verifiable, and Meeseeks shows that even with perfect verification, models hit a ceiling — verifiability is necessary but not sufficient

## Related
- [[rule-following]] — RuLES tested whether models can obey rules at all; Meeseeks tests whether feedback can make them obey better
- [[backpressure]] — Code-guided evaluation is automated backpressure: wrong outputs are mechanically rejected
- [[ralph-loop]] — The Ralph Loop uses plan files and human feedback; iterative self-correction compresses the cycle to within a single conversation turn
- [[verifiability]] — Verifiability is the pre-condition that makes iterative self-correction possible; Meeseeks's code-guided evaluation is a verifiability substrate
- [[verification-loop]] — The evaluation step in Meeseeks is a verification loop operating at constraint granularity
- [[agent-observability]] — Tracking which constraints fail across turns is an observability concern
- [[model-routing]] — The reasoning-vs-non-reasoning gap in multi-turn self-correction is a routing signal
- [[instruction-hierarchy]] — Multi-constraint scenarios are a flattened version of the hierarchy problem; all constraints compete equally
- [[instruction-severity-inflation]] — The multi-constraint environment mirrors severity inflation: when every constraint calls for attention equally, model performance hits a ceiling — the formatting isn't the root cause, the capability gap is

## Sources
- `raw/2504.21625v6.txt` — Wang et al., "Meeseeks: A Feedback-Driven, Iterative Self-Correction Benchmark evaluating LLMs' Instruction Following Capability": framework design, code-guided evaluation, experimental results across 17 models over 20 turns
