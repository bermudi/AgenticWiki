---
title: The Aiming Problem
created: 2026-06-05
updated: 2026-07-14
sources:
  - raw/yt-systems-building-systems.md
  - raw/yt-are-we-really-doing-this-again.md
  - raw/deepswe-failure-analysis.md
tags: [concept, agentic-engineering, tuning, quality]
unaudited_marginal: 0
---

# The Aiming Problem

> The hard part of building a [[software-factory]] isn't the machinery — it's tuning the system so its outputs land in the desirable subset of production-ready, spec-aligned software rather than [[slop]]. Proposed by [[eero-alvar|Eero Alvar]] as the core challenge of automated software production.

## The Problem

Building an agent system that takes a spec and produces something *resembling* finished software is trivial. The hard part is **aiming** that system — tuning it so the output lands in the tiny subset of outputs that are:

- Fully functional
- No vulnerabilities
- No bugs
- Perfectly aligned with the spec
- Ready to ship

Everything outside that subset is slop. The gap between "resembles software" and "is software" is the aiming problem.

## Why It's Hard

### Chaos
The mapping from specs to implementations is likely **chaotic**: small changes to the input spec produce wildly different outputs. Eero Alvar frames this as a "mathematically very unrigorous analogy" — he assumes the answer is yes, but acknowledges the analogy is exploratory. This has implications for tuning — small changes to the factory's instructions can produce wildly different results.

### Error Propagation
In phase-decomposition architectures, the aiming problem decomposes into smaller aiming problems per phase. This can make each phase easier to tune, but tuning errors in early phases **propagate** into later ones. The problem changes form but doesn't disappear.

### Longer Chains = More Chaos
Extending the orchestration hierarchy upward (more master agents at higher abstraction levels) increases chaos for two reasons:
1. **Telephone game**: Longer chains of command increase hallucination risk and information loss — "it becomes a sort of a game of telephone"
2. **Increased chaos**: Longer command chains mean less control over what bottom-level workers actually produce

The system becomes harder to tune, not easier.

## Tuning Mechanisms

### Instruction Libraries
Detailed instruction documents for every part of the build process. By tweaking instructions, you aim the system. This is [[context-engineering]] at the factory level — the instructions are the context that shapes agent behavior.

### Verification Agents
Agents that check work at phase boundaries or periodically during execution. By tuning verification agents, you create a secondary aiming mechanism — the factory aims through instructions, and verification agents catch misses.

### Both Are Slow and Expensive
Eero Alvar emphasizes: regardless of mechanism, tuning is the slow, expensive, and difficult part. There's no shortcut to making a system produce quality output reliably.

## A Concrete Instance: The Optimized Renderer

[[mitchell-hashimoto|Mitchell Hashimoto]] supplies a compact real-world case: an agent loop optimizing a renderer drove a measured metric from 88 ms to 2 ms — a 44× improvement that "sounds good, right? No, it's not." The loop aimed perfectly at the metric it could verify and hit it; the system got worse on every unmeasured axis. This is the aiming problem in miniature, and the [[verification-loop]] lesson it instantiates: the verification signal must capture the actual desired property, not a proxy the loop will learn to game (the [[reward-hacking]] pathology). The chaos property holds — a 44× swing on the measured dimension can coexist with regression everywhere else.

## A Concrete Instance: DeepSWE's Hidden Oracle

[[deepswe]] supplies the cleanest empirical instance of the aiming problem in coding agents. Its harness applies `test.patch` at grading time, so the challenge tests are absent from the repo the agent works against — and **no agent, including GPT-5.5, discovers or runs them during its loop.** Every agent aims at the *visible* suite. The visible suite is the gameable proxy; the hidden oracle is the real property.

The discriminating finding is not "the failing models tested poorly" — all models are equally test-blind by construction. It is that, under the *same* hidden-oracle constraint, GPT-5.5's changes *generalize* to the hidden behavior while the open-weight models' changes satisfy only the visible surface. On `abs-module-cache-flags`, every model spends 100–220 steps iterating until all existing tests pass, then submits; none ever runs the challenge tests. GPT-5.5 passes because its env-resolution ordering is correct enough that the hidden tests pass anyway; the open models fail on subtle env-precedence and stderr-routing bugs the visible tests never exercised.

The aiming-problem lesson sharpens here: when the only available signal is a proxy, the work is not to game the proxy harder (more visible-test runs — "verification theater") but to write changes that hold up against the *real* property you cannot directly observe. Generalization, not visible-pass rate, is the aim.

## Thread

- [[the-slop-problem]] — The aiming problem is the inverse of the slop problem: slop is what happens when aiming fails
- [[the-agent-workflow]] — The agent workflow is the human-aimed version of what the aiming problem tries to automate
- [[agentic-engineering]] — Agentic engineering is the human discipline; the aiming problem is what happens when you try to encode that discipline into a system
- [[the-human-lever]] — Tuning the factory is the new form of the human lever — slow, expensive, and difficult
- [[the-verifiability-thesis]] — Hashimoto's renderer anecdote is the proxy-gaming poster child for the thesis (verifiability → RL → jagged frontier)

## Related

- [[software-factory]] — The aiming problem is the core challenge of the software factory concept
- [[context-engineering]] — Instruction tuning is context engineering applied at the system level
- [[verifiability]] — Verification agents as an aiming mechanism connect to the broader verifiability framework
- [[backpressure]] — Backpressure (tests, builds, LLM-as-judge) is a mechanical aiming mechanism
- [[mitchell-hashimoto]] — The renderer anecdote: a loop that hit its metric and missed its goal
- [[reward-hacking]] — The formal version of the same failure: high score without genuine task completion
- [[verification-loop]] — The defense: the verification signal must measure the real property, not a gameable proxy
- [[deepswe]] — The hidden-oracle benchmark: the canonical empirical instance of a gameable proxy (visible suite) hiding the real property (hidden tests)

## Sources

- `raw/yt-systems-building-systems.md` — Eero Alvar: the aiming problem framing, chaos analogy, error propagation in phase decomposition, tuning via instruction libraries and verification agents
- `raw/yt-are-we-really-doing-this-again.md` — [[mitchell-hashimoto|Mitchell Hashimoto]]'s renderer-optimization anecdote (88 ms → 2 ms, "sounds good, right? No, it's not") as a concrete instance of aiming failing when the verification metric is gameable.
- `raw/deepswe-failure-analysis.md` — The hidden-oracle instance: all agents are test-blind by construction; GPT-5.5 generalizes to the hidden tests, open-weight models satisfy only the visible surface (`abs-module-cache-flags`).
