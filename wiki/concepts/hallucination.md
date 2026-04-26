---
title: Hallucination
created: 2026-04-25
updated: 2026-04-25
sources: ["wiki/src/why-lms-hallucinate.md"]
tags: ["concept", "llm", "reliability"]
---

# Hallucination

> The phenomenon where a Large Language Model (LLM) generates output that is factually incorrect, nonsensical, or unfaithful to the provided source text, often delivered with high confidence.

## Definition

Hallucinations are the primary barrier to the reliable deployment of LLMs in production environments. They occur because LLMs are optimized for sequence prediction based on statistical patterns, not for factual retrieval or logical consistency.

### Types

1. **Intrinsic Hallucination**: The output contradicts the information provided in the prompt or context window.
2. **Extrinsic Hallucination**: The output includes information that is neither supported nor contradicted by the context, but is factually false in reality.

## Causes

- **Data Staleness**: The model's training data has an "age cutoff."
- **Source Conflict**: Conflicting information in training data causes the model to "average" facts into something incorrect.
- **Decoding Strategy**: Greedy decoding or high temperature can lead the model down improbable (and factually incorrect) paths.
- **Alignment Bias**: Models may "hallucinate" to satisfy perceived user preferences (sycophancy).

## Mitigation

Reliable systems don't eliminate hallucinations; they detect and mitigate them.
- [[verification-loop]] — Using secondary checks to validate facts.
- **Retrieval Augmented Generation (RAG)** — Grounding the model in a trusted knowledge base.
- **Few-shot Prompting** — Providing examples of correct behavior to narrow the output space.

## Thread

- [[the-slop-problem]] — Hallucinations are a major component of AI-generated "slop."
- [[the-agent-workflow]] — Managing hallucinations is critical for autonomous agents that execute actions based on model outputs.

## Related

- [[slop]] — the outcome of unvetted hallucinations
- [[verification-loop]] — the primary technical defense
- [[src/why-lms-hallucinate]] — source overview
