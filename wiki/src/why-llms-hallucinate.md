---
title: Why LLMs Hallucinate (and how to stop them)
created: 2026-04-25
updated: 2026-04-25
sources: [raw/yt-why-llms-hallucinate.md]
tags: [llm, hallucination, engineering-discipline]
---

# Why LLMs Hallucinate (and how to stop them)

> An exploration of the technical causes of LLM hallucinations and practical engineering strategies to mitigate them by shifting from extrinsic to intrinsic tasks.

## Summary

In this video, Matt Pocock breaks down why LLMs hallucinate, framing it as a predictable result of their architecture rather than a mysterious flaw. He categorizes hallucinations into **Intrinsic** (contradicting provided context) and **Extrinsic** (fabricating information not in context).

The root cause is identified as a combination of **Lossy Compression** (10TB of data squeezed into ~140GB weights) and the nature of **Next-Token Prediction**, which prioritizes plausible-sounding text over factual retrieval.

## Key Takeaways

### The Hallucination Taxonomy
- **Intrinsic**: The model has the facts in its context window but ignores or contradicts them. This is often a failure of attention or "distraction" by training weights.
- **Extrinsic**: The model reaches into its "memory" (weights) and retrieves a distorted version of a fact or fabricates one entirely.

### Why It Happens
- **Training Incentives**: Benchmarks and RLHF often reward confident answers. Models are rarely "rewarded" for saying "I don't know."
- **Statistical vs. Semantic**: The model knows that a "package name" should follow `npm install`, but it doesn't "know" if that package actually exists in the real world at this moment.

### How to Stop Them
1. **RAG (Retrieval-Augmented Generation)**: Turn an extrinsic task into an intrinsic one. Instead of asking the model to "remember" a library's API, give it the documentation.
2. **Tool Use**: Force the model to use deterministic tools (Search, Calculators, Shell) for facts.
3. **Verification Loops**: Implement a [[verification-loop]] where the model's output is checked against reality (e.g., trying to install the package it just suggested).

## Thread
- [[the-slop-problem]] — Hallucinations are a primary source of "slop" in AI-generated code.
- [[the-human-lever]] — Understanding hallucination limits helps the human define where their verification is most needed.

## Related
- [[slop]] — Hallucinations contribute to the accumulation of low-quality code.
- [[verification-loop]] — A key strategy for catching hallucinations in production systems.

## Sources
- `raw/yt-why-llms-hallucinate.md`
