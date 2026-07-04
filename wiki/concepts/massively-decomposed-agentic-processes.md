---
title: Massively Decomposed Agentic Processes
created: 2026-07-03
updated: 2026-07-03
sources:
  - raw/2511.09030-maker-million-step-zero-errors.md
tags: [concept, multi-agent, scaling, long-horizon, error-correction, decomposition, mas-paradigm]
unaudited_marginal: 0
---

# Massively Decomposed Agentic Processes

> A scaling paradigm for LLM-based systems (Meyerson et al., Cognizant AI Lab + UT Austin, arXiv 2511.09030v1, Nov 2025): decompose a long-horizon task into the *smallest possible* subtasks (one step each), assign each to a focused microagent, and apply subtask-level error correction. The framework (MDAPs) yields log-linear cost scaling (Θ(s ln s)) under maximal decomposition — exponentially better than the exponential cost of giving one agent many steps — and is the first approach to solve a >1M-step LLM task with zero errors. The thesis: instead of waiting for ever-larger single models, scale AI by smashing intelligence into a million focused pieces.

## The Three Components

MDAPs (instantiated as [[maker|MAKER]]) combine three mechanisms:

### 1. Maximal Agentic Decomposition (MAD)

A task with `s` steps is decomposed into `s` subtasks of one step each (`m = 1`). Each microagent receives only the minimal context needed for its single step — the prior state and a fixed strategy — so its context never bloats and small non-reasoning models suffice. The role of each agent *is* the subtask it is assigned; agents are not anthropomorphized into "senior architect" / "junior coder" roles but into machine-like micro-roles.

The naive objection: decomposition creates `s` points of failure instead of one, and the joint success probability decays as `p(a*_1, …, a*_s) = Π p_i`, the same [[compounding-booboos|compounding]] dynamic. The paper's reply: a single long LLM call *also* suffers exponentially decaying correctness, and — crucially — only the decomposed form admits the per-step error correction below.

### 2. First-to-ahead-by-k Voting

For each subtask, draw independent samples until one candidate has been sampled `k` times more than any other. This is a generalization of the gambler's ruin problem, motivated by the optimality of the sequential probability ratio test (SPRT). Under the worst-case assumption (correct candidate with probability `p` racing a single alternative with probability `1-p`), the per-subtask success probability is:

> **p_sub = p_vote^k / (p_vote^k + p_alt^k) = 1 / (1 + ((1-p)/p)^k)**

For any per-step error rate `p > 0.5`, there exists a `k` such that the subtask succeeds with probability `1 - ε`. The full-task success probability is `p_full = p_sub^(s/m)`. The minimal `k` that achieves target success `t` grows **logarithmically** with `s`:

> **k_min = Θ(ln s)**

### 3. Red-Flagging

Discard any response exhibiting pathological signals — overly long outputs, malformed formats — *without* attempting to repair them. The hypothesis: bad behaviors are correlated in LLMs; a malformed response indicates the model has been conditioned into a strange state, so its reasoning is suspect even where parseable. Discarding and resampling is cheaper than repairing and propagates fewer correlated errors. This is [[backpressure]] at the response level: the environment mechanically rejects suspect outputs rather than letting them influence the next step.

## The Scaling Laws

The expected cost of solving an `s`-step task with target success probability `t` decomposes cleanly:

| Decomposition | Cost scaling | Notes |
|---|---|---|
| Single agent (`m = s`) | exponential in `s` | one wrong step contaminates the whole call |
| Partial decomposition (`m > 1`) | exponential in `m` | cost grows as `p^(-m)` |
| **Maximal decomposition (`m = 1`)** | **Θ(s ln s)** | log-linear; the `ln s` factor is `k_min`, parallelizable across `Θ(ln s)` processes |

The log-linear scaling is the headline result. The `Θ(ln s)` factor is the per-step vote count, which can be parallelized — so wall-clock time scales only **linearly** with `s`. The paper draws the analogy explicitly: log-linear algorithms were critical to scalability in classical computing; this is the LLM analog.

Cost also depends on `c/p` (cost per response divided by per-step success rate), so the optimal model is the one minimizing `c/p` — typically a small non-reasoning model, not a frontier reasoning model. In the empirical run, gpt-4.1-mini (low temperature) beat o3-mini on `c/p` despite o3-mini's lower error rate, because o3-mini's per-token cost dominates.

## The Counter-Claim: Multi-Agent Advantage

The paper frames MDAPs as demonstrating a "multi-agent advantage" analogous to quantum advantage: a problem *not solvable* by a monolithic single-agent system at any practical cost, but solvable by a massively decomposed multi-agent system. This is a direct counter-thesis to [[multi-agent-illusion]] — but the disagreement is more about *which* multi-agent architectures work than whether multi-agent systems can work at all.

> [!note] Departure: which multi-agent claim is being made
> The [[multi-agent-illusion]] audit indicts *automated* MAS frameworks (DyLAN, AFlow, ADAS, etc.) that search for or instantiate coordination topologies at test time. MDAPs are the opposite design pole: a *hand-engineered*, deterministic, maximally-decomposed architecture with subtask-level voting. The [[expert-mas]] baseline — the one positive case in the illusion audit — is the same pattern at smaller scale: hand-designed, code-driven, deterministic. The wiki's read: MDAPs do not refute the multi-agent illusion; they reinforce its corollary. The illusion is specifically about *auto-discovered* coordination; engineered decomposition is the escape hatch the audit itself identifies.

## The Insight vs. Execution Distinction

The paper is explicit that MDAPs address *execution*, not *insight*. The overall strategy is fixed in advance and given to every microagent; each agent's job is to carry out one step of a known plan. This is the same execution-vs-planning split the [[horizon-length]] paper isolates: long-horizon failures are routinely misattributed to reasoning when they are execution failures. MDAPs push the execution frontier (1M+ steps, zero errors) by trading the planning question for a controlled execution problem.

> [!note] Extension: insight as recursively decomposed
> The paper sketches (Appendix F) a generalization in which decomposition agents recursively break a task into sub-tasks, discriminator agents vote on decomposition candidates, and problem-solver agents handle minimal subtasks. Preliminary results on large-digit multiplication are "promising." This is the open frontier: whether the MDAP scaling laws survive when `p` is not stable across steps and the decomposition itself is part of the workload.

## Limits of Decomposition

The framework assumes a task can be decomposed into small enough, simple enough steps that each is solvable with reasonable probability. The open question: are there important problems where such a decomposition is impossible or computationally infeasible to discover? The paper concedes this is the central question dictating how broadly MDAPs apply.

## Safety Argument

Extreme decomposition has a safety corollary the paper develops: if each step has a clearly defined and limited focus, the LLM's view of the world and domain of influence can be strictly limited — better sand-boxing, auditing, and control. Multiple focused agents run independently on each step, reducing the ability of agents to collude. Smaller models suffice, avoiding risks that arise in more powerful monolithic models. The thesis: MDAPs may offer a lower-risk path to superintelligence than endlessly building bigger single-agent models.

## Thread

- [[the-multi-agent-theory]] — Layer 5 (the engineered escape): this page supplies the *how to make MAS reliable at scale* — maximal decomposition + per-step voting, log-linear cost. The thread traces the full theory across six papers.
- [[the-verifiability-thesis]] — MDAPs are the execution-verification thesis taken to its limit: each step is verified by voting, and the verification budget scales logarithmically with task length
- [[the-agent-workflow]] — the maximal-decomposition pole of the workflow design space; the opposite end from monolithic single-agent execution
- [[the-benchmark-crisis]] — Towers of Hanoi as a benchmark designed to expose the long-horizon execution gap that short-task benchmarks miss

## Related

- [[maker]] — the first MDAP implementation; the million-step Towers of Hanoi result
- [[elliot-meyerson]] — lead author; also authored the position paper on asymptotic analysis with LLM primitives that motivates MDAPs
- [[horizon-length]] — the inverse-face of the same compounding: MDAPs push horizon length by raising effective per-step accuracy via voting, rather than by raising model capability
- [[self-conditioning]] — the failure mode MDAPs sidestep by giving each microagent only the minimal context (no error-laden history to condition on)
- [[compounding-booboos]] — MDAPs answer the compounding risk by per-step error correction; the cost model formalizes the trade-off
- [[multi-agent-illusion]] — the apparent counter-thesis; on the wiki's read, MDAPs reinforce the illusion's corollary (engineered decomposition works; auto-discovered topology doesn't)
- [[expert-mas]] — the small-scale positive case in the illusion audit; same hand-engineered deterministic pattern as MDAPs
- [[scaling-agent-systems]] — the quantitative MAS scaling framework; MDAPs are a different scaling axis (decomposition granularity + vote budget) vs. architecture choice + agent count
- [[capability-saturation]] — MDAPs operate below the saturation threshold by design: each microagent's task is trivially solvable, so per-step `p` is high and voting converges
- [[agent-floor]] — the tier-E long-horizon ceiling; MDAPs are an architectural answer to the ceiling the benchmark reveals
- [[backpressure]] — red-flagging is backpressure at the response level: malformed/overlong outputs are mechanically rejected
- [[critical-failure]] — voting + red-flagging target the sparse catastrophic errors that drive long-chain degradation
- [[agent-loop]] — microagents as the limit case of single-step loop bodies; the lineage ReAct → AutoGPT → ralph → /goal → orchestration gains a sixth paradigm: maximal decomposition
- [[model-routing]] — the `c/p` selection rule is routing applied at the microagent level: pick the cheapest model whose per-step accuracy exceeds 0.5

## Sources

- `raw/2511.09030-maker-million-step-zero-errors.md` — Meyerson, Paolo, Dailey, Shahrzad, Francon, Hayes, Qiu, Hodjat, Miikkulainen (Cognizant AI Lab + UT Austin, arXiv 2511.09030v1, 12 Nov 2025). §1 introduction (MDAP framework, million-step result); §3.1 maximal agentic decomposition (Eqs. 1–8); §3.2 first-to-ahead-by-k voting and scaling laws (Eqs. 9–18, log-linear cost, k_min = Θ(ln s)); §3.3 red-flagging (Eqs. 19, malformed-output correlation); §5 discussion (insight vs. execution, decorrelated errors, microservices parallel, limits of decomposition, safety); §6 conclusion.
