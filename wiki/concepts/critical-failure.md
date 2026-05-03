---
title: Critical Failure
created: 2026-05-02
updated: 2026-05-03
sources:
  - raw/2604.15597v1.pdf
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

## Sources
- `raw/2604.15597v1.pdf` — Critical failure analysis, Table 9, and discussion of dynamics in Section 5
