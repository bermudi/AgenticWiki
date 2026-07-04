---
title: Horizon Length
created: 2026-07-03
updated: 2026-07-03
sources:
  - raw/the-illusion-of-diminishing-returns.txt
  - raw/2511.09030-maker-million-step-zero-errors.txt
tags: [concept, evaluation, scaling, long-horizon, execution, compounding]
unaudited_marginal: 0
---

# Horizon Length

> The length of task (in sequential steps) a model can complete at a given success rate. Sinha, Arun, [[shashwat-goel|Goel]] et al. (ICLR 2026) formalize it as H_s = ln(s)/ln(p) — and show that because horizon length grows *hyperbolically* with per-step accuracy, the "diminishing returns" visible on short-task benchmarks are an illusion: past ~80% step accuracy, marginal per-step gains compound into exponential gains in the tasks a model can actually complete end-to-end.

## The Illusion of Diminishing Returns

Scaling laws show diminishing returns on metrics like next-token loss. Short-task benchmarks (MMLU-style QA) reinforce the picture: frontier models cluster near the top and gains look marginal. The natural conclusion — that continued investment in compute is unjustified — is the paper's target.

The argument turns on a single compounding identity. If a model succeeds at each step with independent probability p, its success over a t-step task is p^t. Inverted, this gives the horizon length at success rate s:

> **H_s(p) = ln(s) / ln(p)** (Proposition 1, under constant step accuracy and no self-correction)

Horizon length grows hyperbolically in p. The curve is flat and punishing below ~80% step accuracy, then turns nearly vertical. Beyond that threshold, a one-point gain in step accuracy buys a large jump in the length of task the model can complete. The same dynamic the wiki frames as [[compounding-booboos|compounding risk]] is, viewed from the other side, the reason scaling pays.

### Reconciling with METR's doubling

METR observed frontier-model horizon length on software tasks doubling roughly every 7 months (Kwa et al., 2025). The paper shows this exponential growth is *consistent with* diminishing step-accuracy returns: at s = 0.5, sustaining horizon doubling over time t only requires p = 2^(−1/(2t)), a diminishing function. Exponential horizon growth does not require exponential accuracy growth — it falls out of the compounding once p crosses the threshold.

## Isolating Execution from Planning and Knowledge

The paper measures horizon length on a deliberately trivial task to isolate one capability: **execution** — carrying out a plan, given the plan and the knowledge. A long-horizon reasoning/agentic task is modeled as a sequence of *retrieve-then-compose* steps. The controlled abstraction is a key-value dictionary: each turn provides the plan as keys; the model retrieves the values and maintains a running sum.

This removes planning (the keys are given) and parametric knowledge (the dictionary is in-context). Task length = (number of turns) × (turn complexity K, the keys queried per turn). The task is contamination-free — new instances generate programmatically.

> [!note] Departure: execution, not reasoning, is the long-horizon bottleneck
> The paper takes a clear side in a live debate. Shojaee et al. (2025) ("the illusion of thinking") and Kambhampati et al. (2024) ("LLMs can't plan") read long-task failures as reasoning/planning failures. Sinha et al. argue these failures are *execution* failures misattributed to reasoning: in the Shojaee setup the models follow the correct plan for many steps before failing — the failure is in carrying it out, not knowing it. Execution is the under-studied capability.

## Findings

- **Execution alone is hard.** Every model except the 4B class achieves near-perfect *first-step* accuracy — they have the knowledge. Yet even Qwen3-32B's task accuracy falls below 50% within 15 turns. (§3.1)
- **Scaling model size has non-diminishing returns on horizon length.** Across Qwen3 (4–32B) and Gemma3 (4–27B), larger models sustain accuracy for far more turns. This is non-trivial because the task is neither knowledge- nor complexity-constrained. (§3.1)
- **Single-turn execution length separates frontier models sharply.** Binary search over turn complexity (≥80% accuracy) ranks frontier thinking models: GPT-5 ("Horizon") ~2176 steps, Claude-4 Sonnet ~432, Grok 4 ~384, Gemini 2.5 Pro ~120. Without chain-of-thought, even 670B–1026B non-thinking models (DeepSeek-V3, Kimi K2) fail past ~6 steps. (§3.3)
- **Sequential test-time compute, not parallel, drives the gain.** RL-trained thinking dramatically extends single-turn execution. Parallel majority voting at matched token budgets does *not* replicate it — a contrast with math/common-sense reasoning where parallel self-consistency is competitive (Snell et al., 2024). (§3.3, Appendix D)
- **Architecture matters.** Qwen3-Next (Gated DeltaNet + attention, designed for long context) outperforms larger standard-attention models, hinting that hybrid architectures help long-horizon execution specifically. (§3.3)

The binding failure mode that caps horizon length — models degrading as their own errors accumulate in context — is [[self-conditioning]].

## Pushing Horizon Length Without Raising Model Capability

The horizon-length formula assumes a fixed per-step accuracy `p`. [[massively-decomposed-agentic-processes|MDAPs]] / [[maker|MAKER]] (Meyerson et al., 2025) push the *effective* per-step accuracy via subtask-level voting rather than by raising model capability: independent samples are drawn until one candidate leads by `k` votes, and the per-subtask success probability becomes `p_sub = 1 / (1 + ((1-p)/p)^k)`. The minimal `k` grows only logarithmically with `s` (`k_min = Θ(ln s)`), so the cost of solving an `s`-step task with target reliability `t` scales as `Θ(s ln s)` — log-linear, parallelizable to linear wall-clock. The empirical demonstration: Towers of Hanoi with 20 disks (1,048,575 steps) solved with zero errors using gpt-4.1-mini.

This is the same compounding identity run in a different direction. Where the horizon-length paper shows that *raising `p`* past ~80% buys exponential horizon gains, MDAPs show that *raising effective `p` via voting* buys the same gains at log-linear cost — without changing the underlying model. The two results are complementary: the horizon-length formula tells you when scaling pays; the MDAP scaling laws tell you that voting is a log-linear-cost way to get there.

## Why This Matters for the Wiki

Two reframes:

1. **[[compounding-booboos]] gains its inverse.** The wiki treats compounding as pure risk (p^t sinks you). Horizon length is the same math run backwards: once p is high, compounding is why scaling becomes dramatically valuable. Risk and opportunity are two faces of one multiplicative dynamic.
2. **[[the-benchmark-crisis]] gains a fifth axis.** The crisis was framed around contamination, verifier failure, prompt distortion, and environment evolution. This adds *horizon mismatch*: short-task benchmarks measure step accuracy, which systematically understates long-horizon progress. Two models that look identical at the step level can have very different horizon lengths.

## Thread

- [[the-benchmark-crisis]] — short-task benchmarks give the illusion of slowing progress; horizon length is the metric that reveals compounding gains
- [[the-verifiability-thesis]] — the paper reframes "can it reason?" as "how long can it reliably execute?"; execution length as the economically meaningful capability

## Related

- [[self-conditioning]] — the failure mode that caps horizon length; models get worse as their own errors accumulate in context
- [[compounding-booboos]] — the risk face of the same compounding dynamic (p^t sinks you); horizon length is the opportunity face (ln(s)/ln(p) lifts you)
- [[agent-floor]] — the tier-E long-horizon planning ceiling; this paper argues some "planning" failures are execution failures
- [[deepswe]] — a long-horizon coding benchmark; horizon length is the dimension DeepSWE's task design reaches toward
- [[jagged-frontier]] — the paper cites the jagged frontier directly; execution length is one axis along which the frontier separates models
- [[model-routing]] — horizon length is a routing signal: match task length to model execution capability
- [[iterative-self-correction]] — the horizon-length formula assumes no self-correction; the limits of iterative self-correction are what cap horizon length in practice
- [[context-engineering]] — context engineering as a reliability lever: the sliding-window mitigation limits the error accumulation that caps horizon length
- [[massively-decomposed-agentic-processes]] — pushes horizon length via voting (raising effective `p`) rather than via model capability (raising `p` directly); log-linear cost scaling
- [[maker]] — the empirical demonstration: 1M-step Towers of Hanoi solved with zero errors via maximal decomposition + first-to-ahead-by-k voting

## Sources

- `raw/the-illusion-of-diminishing-returns.txt` — Sinha, Arun, Goel, Staab, Geiping (ICLR 2026). *The Illusion of Diminishing Returns: Measuring Long Horizon Execution in LLMs.* arXiv 2509.09677v3. Horizon-length metric and Proposition 1 (§2.1); execution-isolation methodology (§2.2, §3); scaling and frontier-execution results (§3.1, §3.3); METR reconciliation (§2.1).
- `raw/2511.09030-maker-million-step-zero-errors.txt` — Meyerson et al. (Cognizant AI Lab + UT Austin, arXiv 2511.09030v1, 12 Nov 2025). §3.2 first-to-ahead-by-k voting and the log-linear cost scaling (Eqs. 9–18, `k_min = Θ(ln s)`); §4.4 the million-step Towers of Hanoi result. Source for the "Pushing Horizon Length Without Raising Model Capability" section.
