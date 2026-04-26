---
title: Hallucination
created: 2026-04-25
updated: 2026-04-25
sources: [raw/yt-why-llms-hallucinate.md]
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

## Mitigation Strategies

- **RAG (Retrieval-Augmented Generation)**: Ground the model by providing relevant source documents in the prompt.
- **Grounding with Tools**: Give the model access to external tools (Search, Shell, Python) to verify facts or perform deterministic calculations.
- **Chain of Thought (CoT)**: Asking the model to "think step-by-step" can help it align its internal logic before committing to a final (potentially hallucinated) answer.
- **Verification Loops**: Implement automated checks (e.g., [[verification-loop]]) to validate model outputs.

## Thread
- [[the-slop-problem]] — Hallucinations are the "atoms" of slop.

## Related
- [[slop]] — The result of unverified hallucinations being accepted as truth.
- [[verification-loop]] — The primary engineering defense against hallucinations.

## Sources
- `raw/yt-why-llms-hallucinate.md` — Matt Pocock's breakdown of intrinsic vs. extrinsic hallucinations.
