---
title: Hallucination
created: 2026-04-25
updated: 2026-05-02
sources: [raw/yt-why-llms-hallucinate.md, raw/2604.15597v1.pdf]
tags: [llm, reliability, engineering]
---

# Hallucination

> The phenomenon where an LLM generates text that is factually incorrect, nonsensical, or contradictory to its provided context.

## Taxonomy

There are two primary types of hallucinations in LLMs:

### Intrinsic Hallucination
The model generates output that contradicts the information provided in its current context window.
- **Example**: A customer support bot that has access to a "No Refunds" policy but tells a user "You can have a refund."
- **Cause**: Often due to the model's internal training weights "overpowering" the prompt context (priors vs. evidence).

### Extrinsic Hallucination
The model generates output that is not supported by its training data or the provided context—it "makes things up" from thin air.
- **Example**: Inventing a non-existent npm package, a fake legal case, or a fictitious historical event.
- **Cause**: Lossy compression of training data and the statistical nature of next-token prediction.

## Technical Causes

1. **Lossy Compression**: Models are trained on petabytes of data but have parameters in the gigabyte range. They learn patterns and "vibes" rather than a bit-perfect database of facts.
2. **Predictive Bias**: LLMs are optimized to predict the most likely *next word*, not the most *true* word. This favors fluency and plausibility over accuracy.
3. **Training Rewards**: RLHF (Reinforcement Learning from Human Feedback) often rewards models for being helpful and confident, which can inadvertently penalize saying "I don't know."

## A Related Failure Mode: Silent Document Corruption

In long delegated workflows, LLMs exhibit a structural failure mode related to hallucination: **[[document-degradation|document degradation]]**. Rather than generating obviously false text, models silently corrupt existing documents over repeated editing interactions. [[philippe-laban|Laban]] et al. (2026) found that even frontier models corrupt an average of 25% of document content after 20 interactions.

This differs from classical hallucination in important ways:
- **Silent**: The document remains structurally plausible; errors are not immediately obvious
- **Compounding**: Each edit builds on the degraded document, amplifying earlier errors
- **Two sub-types**: Weaker models primarily **delete** content (elements vanish), while frontier models **corrupt** content (elements remain but become incorrect)

The corruption is driven by **sparse critical failures** — rare single interactions that drop reconstruction scores by 10–30+ points — rather than gradual drift. This suggests hallucination-like errors in structured documents behave more like catastrophic fault events than uniform noise.

## Mitigation Strategies

- **RAG (Retrieval-Augmented Generation)**: Ground the model by providing relevant source documents in the prompt.
- **Grounding with Tools**: Give the model access to external tools (Search, Shell, Python) to verify facts or perform deterministic calculations.
- **Chain of Thought (CoT)**: Asking the model to "think step-by-step" can help it align its internal logic before committing to a final (potentially hallucinated) answer.
- **Verification Loops**: Implement automated checks (e.g., [[verification-loop]]) to validate model outputs.

## Thread
- [[the-agent-workflow]] — Understanding hallucination mechanics is prerequisite for working with agents effectively
- [[the-slop-problem]] — Hallucinations are the "atoms" of slop.

## Related

- [[slop]] — The result of unverified hallucinations being accepted as truth.
- [[verification-loop]] — The primary engineering defense against hallucinations.
- [[smart-zone-dumb-zone]] — The Dumb Zone increases hallucination risk.
- [[matt-pocock]] — Originator of the intrinsic/extrinsic hallucination taxonomy used here.
- [[compounding-booboos]] — Hallucinated code compounds into systemic errors.
- [[vibes-based-engineering]] — Vibe coding accepts hallucinated code without verification.
- [[document-degradation]] — Silent structural corruption during long delegation workflows
- [[delegate-52]] — Quantified measurement of corruption across 52 domains
- [[critical-failure]] — Sparse catastrophic drops as the driver of silent corruption

## Sources
- `raw/yt-why-llms-hallucinate.md` — Matt Pocock's breakdown of intrinsic vs. extrinsic hallucinations.
