---
title: MAKER
created: 2026-07-03
updated: 2026-07-14
sources:
  - raw/2511.09030.md
tags: [project, multi-agent, long-horizon, error-correction, decomposition, cognizant-ai-lab]
unaudited_marginal: 0
---

# MAKER

> The first implementation of the [[massively-decomposed-agentic-processes|MDAP]] framework (Meyerson et al., Cognizant AI Lab + UT Austin, arXiv 2511.09030v1, Nov 2025). MAKER (Maximal Agentic decomposition, First-to-ahead-by-K Error correction, Red-flagging) is the system that solved Towers of Hanoi with 20 disks — over one million LLM steps, zero errors — using gpt-4.1-mini at low temperature. The result is the first demonstration that LLM-based systems can scale to million-step reliability, and that small non-reasoning models suffice when each agent's job is one focused step.

## The Three Ingredients

MAKER instantiates the three [[massively-decomposed-agentic-processes|MDAP]] components:

1. **Maximal Agentic Decomposition (MAD)** — each agent performs exactly one step (move one disk, produce the resulting state). Agents receive only the current state, the prior move, and the fixed strategy. No agent sees the full move history.
2. **First-to-ahead-by-k Voting** — for each step, independent samples are drawn until one candidate leads every other by `k` votes. With `k_min = 3` for gpt-4.1-mini (per-step error rate ~0.4%), the system targets `t = 0.95` reliability.
3. **Red-Flagging** — responses exceeding a max-token cutoff (750 tokens) or failing the format parser are discarded without repair; the agent is resampled.

## The Million-Step Result

| Setting | Value |
|---|---|
| Task | Towers of Hanoi, 20 disks |
| Optimal solution length | 2²⁰ − 1 = 1,048,575 steps |
| Base model | gpt-4.1-mini (non-reasoning) |
| Temperature | 0 for first vote, 0.1 for subsequent votes |
| Max output tokens | 750 |
| `k_min` (vote margin) | 3 |
| Target success probability | 0.95 |
| **Result** | **Solved with zero errors** |

The system exhibits the predicted exponential convergence: after the first `k = 3` sampling rounds, the number of undecided steps decays exponentially. The vast majority of cost is in the first `k` rounds; completing the remaining steps is "effectively a rounding error." One pathological step required 18 voting rounds; decorrelation of errors (across independent samples) prevented the voting mechanism from being overwhelmed.

## The Cost Model in Practice

The paper's cost projection table (Figure 6b) is the practical output of the scaling laws. For the 20-disk task at `t = 0.95`:

| Model | $/MTok | Tokens/step | 1−p | k_min | E[cost] |
|---|---|---|---|---|---|
| gpt-4.1-nano | 0.4 | 842 | 0.3571 | 29 | $41.9K |
| gpt-4.1-mini (τ=1.0) | 1.6 | 580 | 0.0040 | 4 | $4.9K |
| **gpt-4.1-mini (τ=0.1)** | 1.6 | 538 | 0.0022 | 3 | **$3.5K** |
| o3-mini (low) | 4.4 | 535 | 0.0018 | 3 | $9.4K |
| haiku-4.5 | 5.0 | 588 | 0.1839 | 12 | $71.2K |
| gpt-oss-20B | 0.2 | 1104 | 0.0358 | 6 | $1.7K |
| qwen-3 | 0.6 | 449 | 0.2342 | 15 | $11.5K |
| deepseek-v3.1 | 1.7 | 1004 | 0.0569 | 6 | $14.6K |
| kimi-k2 | 3.0 | 925 | 0.0393 | 6 | $22.9K |

Two findings worth flagging:

- **Small non-reasoning models win on `c/p`.** gpt-4.1-mini (τ=0.1) has the lowest projected cost among proprietary models despite o3-mini having a lower per-step error rate, because o3-mini's per-token cost dominates the budget. Reasoning models with higher per-token cost would cost more than gpt-4.1-mini *even if their error rate were zero* — the cost of running on all 2²⁰ − 1 steps dominates.
- **Per-step error rate is stable as the disk count grows.** This is the encouraging sign that MAKER scales: the error rate does not explode with task length, so the log-linear cost prediction holds.

## Decorrelation of Errors

The voting scheme depends on errors being sufficiently decorrelated across independent samples. The paper provides direct evidence: in two independent runs of gpt-4.1-mini (τ=0.1) on 10K random samples, **zero steps had errors in both runs**. Red-flagging further decorrelates by discarding the responses most likely to come from a confused conditioning state (overlong, malformed). The combination — independent sampling + red-flagging — was sufficient to overcome the few steps with abnormally high inherent error rates.

## The Insight-vs-Execution Boundary

MAKER is explicitly an *execution* system. The strategy (the recursive Towers of Hanoi solution) is fixed in advance and given to every microagent. The paper isolates this design choice: it tests the capacity of agents to *execute clear instructions*, separated from the capacity to *have insights about how tasks should be solved*. Both are essential; entangling them in experiments makes the source of failure hard to identify. The million-step result is a statement about the execution frontier under maximal decomposition, not about LLM planning.

A generalization with four agent types — decomposition agents (recursively break tasks into sub-tasks), decomposition discriminators (vote on decomposition candidates), solution discriminators (vote on composition candidates), and problem-solver agents (solve minimal subtasks) — is sketched in Appendix F with "promising" preliminary results on large-digit multiplication. This is the direction that would extend MDAPs from execution into insight.

## The Microservices Parallel

The paper draws an explicit analogy: microagents are the natural evolution of microservices. The benefits map directly — modularity, independent development, independent scaling, design for failure, evolutionary design — with natural language as the communication protocol and "complexity" replacing "large-scale systems" as the problem microagents solve. This positions MDAPs not as a one-off benchmark trick but as an architectural paradigm with a mature engineering literature behind it.

## Thread

- [[the-multi-agent-theory]] — Layer 5 (the engineered escape): MAKER is the implementation that proves the pole works at million-step scale. The thread traces the full theory across six papers.
- [[the-verifiability-thesis]] — MAKER is verifiability-driven scaling: each step is verified by voting, and the verification budget (k_min) grows only logarithmically with task length
- [[the-agent-workflow]] — the maximal-decomposition pole of the workflow design space; the opposite end from monolithic single-agent execution
- [[the-benchmark-crisis]] — Towers of Hanoi as a benchmark designed to expose the long-horizon execution gap that short-task benchmarks miss

## Related

- [[massively-decomposed-agentic-processes]] — the framework MAKER instantiates; the scaling laws and component definitions
- [[elliot-meyerson]] — lead author of the MAKER paper
- [[horizon-length]] — MAKER pushes horizon length not by raising model capability but by raising effective per-step accuracy via voting
- [[self-conditioning]] — MAKER sidesteps self-conditioning by giving each microagent only minimal context (no error-laden history)
- [[multi-agent-illusion]] — MAKER is the engineered-decomposition pole that the illusion audit's [[expert-mas]] baseline points toward
- [[expert-mas]] — the small-scale positive case; same hand-engineered deterministic pattern
- [[agent-floor]] — the tier-E ceiling MAKER's maximal decomposition is designed to break
- [[backpressure]] — red-flagging as response-level backpressure
- [[critical-failure]] — voting + red-flagging target the sparse catastrophic errors that drive long-chain degradation
- [[model-routing]] — the `c/p` selection rule as microagent-level routing

## Sources

- `raw/2511.09030.md` — Meyerson, Paolo, Dailey, Shahrzad, Francon, Hayes, Qiu, Hodjat, Miikkulainen (Cognizant AI Lab + UT Austin, arXiv 2511.09030v1, 12 Nov 2025). §3 MAKER implementation (Algorithms 1–3); §4.1 setup (Towers of Hanoi, prompt template); §4.2 single-step error rate estimation (Figure 6a, per-model error rates); §4.3 cost projection (Figure 6b, the cost table above); §4.4 the million-step result (Figure 7, Figure 8 convergence); §4.5 red-flagging impact (Figure 9, collision counts); §5 discussion (insight vs. execution, decorrelation, microservices parallel, limits, safety); Appendix F generalization to insight tasks.
