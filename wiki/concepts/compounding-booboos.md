---
title: Compounding Booboos
created: 2026-04-25
updated: 2026-07-03
sources: [raw/yt-building-pi-in-a-world-of-slop.md, raw/slowing-the-fuck-down.md, raw/2604.15597v1.md, raw/yt-are-we-really-doing-this-again.md, raw/the-illusion-of-diminishing-returns.md, raw/2511.09030-maker-million-step-zero-errors.md, raw/2603.04474-spark-to-fire-error-cascades.md]
tags: [concept, ai, reliability]
unaudited_marginal: 0
---

# Compounding Booboos

> The phenomenon where small, unchecked errors introduced by AI agents accumulate into significant system failures or unmaintainable code.

## Overview

Because AI agents often lack a deep understanding of the entire system architecture, they may introduce minor bugs or stylistic inconsistencies ("booboos"). If these are not caught during human review, subsequent agent actions are built upon this flawed foundation, leading to a cascade of errors.

## The Human Bottleneck

[[mario-zechner|Mario Zechner]] identifies the key asymmetry: humans are bottlenecks. A human can only produce so many booboos per day. Usually, when booboo pain gets too big, the human (who hates pain) fixes them. With agents, there is no bottleneck and no pain. The tiny harmless booboos compound at an unsustainable rate. You've removed yourself from the loop, so you don't even know they've formed a monster until it's too late.

An agent also has no learning ability — it will continue making the same errors over and over. You can teach it via AGENTS.md or memory systems, but that requires observing the errors in the first place.

## Empirical Evidence

Laban et al. (2026) provide direct quantitative evidence for compounding booboos in [[delegate-52|DELEGATE-52]], a benchmark of 52 professional domains with 19 LLMs:

- **Even frontier models** (Gemini 3.1 Pro, Claude 4.6 Opus, GPT 5.4) corrupt an average of **25% of document content** after just 20 delegated interactions
- **Average degradation across all models**: **50%** by the end of a 20-interaction workflow
- **80% of model-domain combinations** show catastrophic corruption (≥20% degradation)
- Degradation **compounds multiplicatively** with document size, interaction length, and distractor context
- **Short-term performance is not predictive**: a model's score after 2 interactions is a poor predictor of its score after 20 interactions

This confirms the mechanism Mario Zechner described: small errors introduced in each interaction build upon the degraded state, and the compounding is non-linear.

## Per-Iteration Decay Across Loop Ticks

The compounding is sharpest in an [[agent-loop]], where each iteration builds on the previous iteration's output. [[neetcode|NeetCode]] supplies the framing: if an agent is correct 95% of the time per iteration, ten iterations is not "10 × 95%" — it is 0.95¹⁰ ≈ 0.60 (NeetCode miscalculated the product as 0.5 on camera; the correct value is ~0.60 and the argument is unchanged). The system is right on only ~60% of its runs. The point generalizes: unless the agent operates at (effectively) perfect accuracy, "the crap just compounds and gets worse and worse the longer you let it go." This is the same multiplicative mechanism [[delegate-52|DELEGATE-52]] measured for document editing — degradation compounds with interaction length, monotonic and non-plateauing — now stated as the structural argument against unbounded ([[orchestration-loop|while]]) loops. It is also why the [[agent-loop|for-each-not-while]] discipline and hard stops are not optional polish: bounded iteration counts are the only thing that keeps the decay product above water.

## The Inverse: Compounding as Upside

The p^t dynamic is symmetric, and the wiki has so far only told its risk face. Sinha, Arun, Goel et al. (ICLR 2026) run the same math backwards and reach the opposite conclusion: past a per-step accuracy threshold (~80%), small improvements in p translate into *exponential* growth in the length of task a model can complete. [[horizon-length]] grows as H_s = ln(s)/ln(p) — flat and punishing below the threshold, then nearly vertical.

> [!note] Synthesis: one dynamic, two faces
> Compounding is not inherently good or bad — it is an amplifier of the current per-step accuracy. Below the threshold it is the [[compounding-booboos|risk]] this page documents: errors sink you multiplicatively, and [[self-conditioning]] makes the decay worse than constant. Above the threshold it is the [[horizon-length|opportunity]]: accuracy gains compound into dramatic long-horizon capability. The practical upshot is that the *same* finding ("small errors compound") implies two opposite strategies depending on where you sit: below threshold, bound the horizon (hard stops, verification, short loops); above threshold, push accuracy, because each point buys an outsized jump in reachable task length.

## The Multi-Agent Face: Cascade Amplification

[[error-cascades|Xie, Zhu, Zhang et al. (2026)]] formalize the multi-agent analog: in an LLM-MAS, compounding is no longer just `p^t` over one agent's steps but a contagion process on the collaboration graph. The risk criterion `R ≈ βρ(A)/δ` is the compounding threshold for the multi-agent case — when structural amplification (`βρ(A)`) outpaces correction (`δ`), a single atomic error becomes system-wide false consensus. The three vulnerability classes map onto the compounding dynamic:

- **Cascade amplification** = compounding at the multi-agent layer: concurrent mentions from different upstream agents compound via the non-linear `1 − Π(·)` term
- **Consensus inertia** = the multi-agent [[self-conditioning]]: the system conditions on its own error-laden shared state and resists reversal; the cost of correction grows with accumulated contextual debt

The single-injection attack (one seed → up to 100% infection across 6 frameworks) is the adversarial analog of a sparse [[critical-failure]]: one catastrophic event propagates through the dependency chain.

## The Architectural Answer: Per-Step Error Correction

[[massively-decomposed-agentic-processes|MDAPs]] / [[maker|MAKER]] (Meyerson et al., 2025) answer the compounding risk directly: if `p^t` sinks you, raise the *effective* `p` via per-step voting. The first-to-ahead-by-k scheme turns a per-step success rate `p` into a per-subtask success rate `p_sub = 1 / (1 + ((1-p)/p)^k)`, and the minimal `k` grows only logarithmically with `s` (`k_min = Θ(ln s)`). The cost of solving an `s`-step task with target reliability scales as `Θ(s ln s)` — log-linear, not exponential. The million-step zero-error result is the empirical proof that per-step error correction breaks the compounding ceiling on long-horizon execution.

## Mitigation

- **Frequent Verification**: Running tests and linting after every agent action.
- **High-Quality Review**: Humans must review agent outputs rigorously — though the wiki's dominant thesis ([[grey-box-engineering]], [[the-human-lever]]) argues this review should focus on **outputs and interfaces**, not line-by-line code reading. The verification loop automates the line-level checking that humans can no longer scale to.
- [[grey-box-engineering]] — Maintaining a mental model of the system to spot "booboos" early.

> [!warning] Contradiction
> This page's original guidance — "treat agent-generated code with the same (or more) scrutiny as human-written code" — implies line-by-line human review. The wiki's dominant thesis ([[grey-box-engineering]], [[the-human-lever]], Matt Pocock's workflow) argues the opposite: humans should review **outputs and interfaces**, not implementation lines, because the speed asymmetry makes line-level review impossible at scale. The verification loop (tests, types, linters) automates the scrutiny humans can no longer provide manually. Both agree on *rigor*; they disagree on *who provides it* for line-level details.

## Thread
- [[the-slop-problem]] — Compounding booboos as the mechanism of degradation
- [[agent-quality-engineering]] — The quality loop catches production booboos and turns them into permanent eval cases

## Related

- [[slop]] — The accumulation of booboos results in slop.
- [[verification-loop]] — The primary defense: catch booboos before they compound.
- [[pi]] — Designed to provide observability so booboos are visible before they cascade.
- [[vibes-based-engineering]] — The approach that lets booboos slip through unverified.
- [[agent-experience]] — Poor AX causes errors to compound faster.
- [[hallucination]] — Hallucinated code that passes review becomes invisible booboos.
- [[mario-zechner]] — Coined the term and warned about compounding errors in AI-assisted code.
- [[backpressure]] — Backpressure catches booboos before they compound.
- [[agent-quality-loop]] — The quality flywheel catches production booboos and turns them into permanent eval cases
- [[grey-box-engineering]] — Grey box engineering catches booboos at the interface boundary.
- [[deliberate-friction]] — Deliberate friction interrupts the compounding cycle.
- [[plan-disposability]] — Stale plans compound booboos across AFK iterations.
- [[delegate-52]] — Quantified benchmark of compounding errors across 52 domains
- [[document-degradation]] — The core finding that documents silently degrade over delegation
- [[failure-modes]] — Master playbook: compounding booboos mapped to detection signals and countermeasures
- [[critical-failure]] — Sparse catastrophic errors explain ~80% of observed degradation
- [[horizon-length]] — The inverse face of the same compounding: past ~80% step accuracy, p^t becomes the reason scaling pays, not just the reason it fails
- [[self-conditioning]] — Makes compounding worse than constant: the per-step error rate itself rises as errors accumulate, so decay is super-multiplicative
- [[round-trip-relay]] — The relay method quantifies how errors compound over long workflows
- [[comprehension-debt]] — Comprehension debt is compounding booboos applied to the human's mental model
- [[agent-observability]] — Tracing catches booboos in their decision context, not as isolated log lines; the trace tree tells the story the log feed can't.
- [[execution-apathy]] — Execution apathy compounds booboos silently: the model reports completion without executing, creating a cascade of unverified assumptions
- [[blind-panic]] — Blind panic's looping and tool hallucination is a compounding booboo pattern: each failed attempt builds on the last
- [[agent-evals]] — The eval flywheel catches booboos in production before they compound; every production failure becomes a permanent eval case
- [[agent-loop]] — An open loop that writes code with no feedback is a machine for generating compounding mistakes; hard stops and verification are the defense
- [[neetcode]] — The exponential-decay articulation of per-iteration loop error compounding
- [[rollback-posture]] — Undetected faults that stack up jam the rollback valve; compounding booboos are the mechanism
- [[error-cascades]] — the multi-agent face of compounding: `βρ(A)/δ > 1` is the compounding threshold for MAS; cascade amplification and consensus inertia are the multi-agent analogs of compounding booboos and self-conditioning
- [[genealogy-governance]] — the message-layer defense against multi-agent compounding; the ablation (no blocking → 3.1% BICR) shows detection alone doesn't break the compounding cycle — enforcement does
- [[massively-decomposed-agentic-processes]] — the architectural answer: per-step voting raises effective `p` and breaks the `p^t` ceiling; cost scales log-linearly, not exponentially
- [[maker]] — the million-step zero-error demonstration that per-step error correction breaks the compounding ceiling on long-horizon execution

## Sources

- `raw/yt-building-pi-in-a-world-of-slop.md`
- `raw/slowing-the-fuck-down.md`
- `raw/2604.15597v1.md` — DELEGATE-52 benchmark: quantitative evidence of compounding errors across 52 domains
- `raw/yt-are-we-really-doing-this-again.md` — [[neetcode|NeetCode]]'s exponential-decay framing: per-iteration error compounds multiplicatively across loop ticks (0.95¹⁰ ≈ 0.60)
- `raw/the-illusion-of-diminishing-returns.md` — Sinha, Arun, Goel et al. (ICLR 2026). Proposition 1 (§2.1): H_s = ln(s)/ln(p) — the inverse of p^t compounding. Horizon length grows hyperbolically past ~80% step accuracy, so the same compounding that sinks low-accuracy agents lifts high-accuracy ones exponentially.
- `raw/2511.09030-maker-million-step-zero-errors.md` — Meyerson et al. (Cognizant AI Lab + UT Austin, arXiv 2511.09030v1, 12 Nov 2025). §3.2 first-to-ahead-by-k voting (Eqs. 9–13): per-step error correction raises effective `p` to `p_sub`, breaking the `p^t` ceiling; §3.2 cost scaling (Eqs. 14–18): `Θ(s ln s)`, log-linear not exponential. Source for the "Architectural Answer" section.
- `raw/2603.04474-spark-to-fire-error-cascades.md` — Xie, Zhu, Zhang et al. (City University of Macau + Minzu University, arXiv 2603.04474v2, 11 May 2026). §II propagation-dynamics model (`R ≈ βρ(A)/δ`); §IV three vulnerability classes (cascade amplification, topological fragility, consensus inertia). Source for the "Multi-Agent Face" section.
