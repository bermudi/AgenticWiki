---
title: Critical Failure
created: 2026-05-02
updated: 2026-07-14
sources:
  - raw/2604.15597v1.md
  - raw/2503.13657.md
  - raw/2603.04474.md
  - raw/2511.09030.md
unaudited_marginal: 0
tags: [failure-mode, llm, reliability, long-horizon]
---

# Critical Failure

> In long-horizon LLM workflows, a sparse but catastrophic error event — typically a single round-trip that drops reconstruction score by 10% or more — that explains the vast majority of total [[document-degradation|document degradation]].

## The Finding

[[philippe-laban|Laban]] et al. (2026) analyzed individual relay simulations in [[delegate-52|DELEGATE-52]] beyond aggregate degradation curves. They found that models do **not** fail via "death by a thousand cuts" (many small errors accumulating gradually). Instead:

- Models maintain **near-perfect reconstruction** in most rounds
- A **few critical failures** cause massive damage (typically losing **10–30+ points** in a single round-trip)
- These sparse critical failures explain approximately **80% of total [[document-degradation|document degradation]]**

## By the Numbers

By interaction 20, the cumulative percentage of runs with at least one critical failure (≥10pt drop):

| Model | % Runs with Critical Failure |
|-------|------------------------------|
| GPT 5 Nano | 97.2% |
| GPT 4o | 96.4% |
| OSS 120B | 92.9% |
| Mistral Large 3 | 85.8% |
| Gemini 3 Flash | 80.6% |
| Grok 4 | 61.1% |
| GPT 5.4 | 55.2% |
| Gemini 3.1 Pro | 38.1% |

## Stronger Models Don't Avoid Them

A crucial insight: stronger models do not avoid small errors better than weaker ones. Their advantage is that they **delay critical failures** and experience them in **fewer interactions**. But once a critical failure occurs, the damage is severe regardless of model tier.

This means the reliability problem is not about reducing average error rate — it is about **preventing rare catastrophic events** in long workflows.

## The Multi-Agent Analog: Single-Injection Attacks

[[error-cascades|Xie, Zhu, Zhang et al. (2026)]] document the multi-agent version of the sparse-catastrophic pattern: a single atomic falsehood injected at one node becomes system-wide false consensus (up to 100% infection across 6 frameworks). The mechanism is graph-dynamic — once βρ(A) > δ, the system is supercritical and a single seed expands along the principal eigenvector of the collaboration graph. The single-injection attack is the adversarial analog of a critical failure: one catastrophic event propagates through the dependency chain rather than contaminating one document. The defense ([[genealogy-governance|governance layer]]) targets exactly this — blocking the single Red atom before it crystallizes into shared context.

## The Architectural Mitigation: Per-Step Voting

[[massively-decomposed-agentic-processes|MDAPs]] / [[maker|MAKER]] (Meyerson et al., 2025) target the sparse-catastrophic pattern directly: per-step voting + red-flagging catches the rare bad sample before it propagates. The empirical evidence (MAKER §4.5): in two independent runs of gpt-4.1-mini on 10K random samples, **zero steps had errors in both runs** — independent sampling decorrelates the catastrophic events, and red-flagging discards the responses most likely to come from a confused conditioning state. The million-step zero-error result is the limit case: a workflow length (1,048,575 steps) where the cumulative probability of a critical failure under naive single-agent execution would be near-certain, solved with zero errors via per-step error correction.

## Why This Matters

- **Verification is hard**: Because most interactions are perfect, spot-checking a few steps gives false confidence
- **Short simulations mislead**: A 2-interaction test will almost never hit a critical failure, yet a majority of runs experience one by interaction 20 for all models except Gemini 3.1 Pro
- **Tooling implications**: Agentic harnesses that verify step-by-step may miss the structural conditions that lead to critical failures

## Thread
- [[the-slop-problem]] — Critical failures are the sparse catastrophic mechanism behind slop accumulation
- [[agent-quality-engineering]] — Long-horizon evals are necessary to catch rare critical failures
- [[the-human-lever]] — Rare catastrophic errors require human-level architectural safeguards

## Related
- [[document-degradation]] — Critical failures are the primary driver of silent degradation
- [[delegate-52]] — The benchmark where critical failures were quantified
- [[compounding-booboos]] — A single critical failure is a "booboo" that compounds irreversibly
- [[verification-loop]] — Spot-checking is insufficient; critical failures are rare and severe
- [[agent-evals]] — Long-horizon evals are necessary because short runs miss critical failures
- [[vibes-based-engineering]] — Critical failures pass vibe checks; spot-checking a few steps gives false confidence
- [[hallucination]] — Critical failures in document degradation are a structural form of hallucination: silent corruption at scale

- [[deliberate-friction]] — Deliberate friction at safety boundaries prevents critical failures from compounding
- [[mast]] — MAST's per-mode failure percentages are the MAS analog of the sparse-catastrophic-error finding: a few modes (FM-1.3, FM-1.1, FM-2.6, FM-3.3) account for the majority of failures
- [[self-conditioning]] — Self-conditioning can trigger critical failures: as the model degrades on its own error-laden history, the rising error rate produces the sparse catastrophic drops that define critical failure
- [[error-cascades]] — the multi-agent analog: a single-injection attack is the adversarial critical failure; βρ(A) > δ is the supercritical condition under which one seed becomes system-wide false consensus
- [[genealogy-governance]] — the defense against the multi-agent critical failure: blocking the single Red atom before it crystallizes into shared context
- [[massively-decomposed-agentic-processes]] — the architectural mitigation: per-step voting + red-flagging catches rare bad samples before they propagate; independent sampling decorrelates catastrophic events
- [[maker]] — the million-step zero-error result as the limit case: a workflow length where naive single-agent execution would near-certainly hit a critical failure, solved with zero errors

## Sources

- `raw/2604.15597v1.md` — Critical failure analysis, Table 9, and discussion of dynamics in Section 5
- `raw/2503.13657.md` — Cemri, Pan, Yang et al. (NeurIPS 2025). Source for the [[mast]] addition to Related. MAST's per-mode failure percentages show that a few modes (FM-1.3 Step Repetition 15.7%, FM-1.1 Disobey Task Specification 11.8%, FM-2.6 Reasoning-Action Mismatch 13.2%, FM-3.3 Incorrect Verification 9.1%) account for the majority of MAS failures — the sparse-catastrophic-error pattern in the multi-agent domain.
- `raw/2603.04474.md` — Xie, Zhu, Zhang et al. (City University of Macau + Minzu University, arXiv 2603.04474v2, 11 May 2026). §IV-A cascade amplification (single seed → up to 100% infection across 6 frameworks); §II the supercritical condition βρ(A) > δ. Source for the "Multi-Agent Analog" section.
- `raw/2511.09030.md` — Meyerson et al. (Cognizant AI Lab + UT Austin, arXiv 2511.09030v1, 12 Nov 2025). §4.5 decorrelation evidence (zero steps with errors in both independent runs); §4.4 the million-step zero-error result. Source for the "Architectural Mitigation" section.
