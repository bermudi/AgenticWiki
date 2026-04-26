---
type: youtube
url: https://youtube.com/watch?v=VIDEO_ID_PLACEHOLDER
title: Why Language Models Hallucinate
channel: AI Simplified
date: 2026-04-25
ingested: 2026-04-25
---

# Key points extracted during ingest

- Hallucination defined as a confident but factually incorrect response from an LLM.
- **Intrinsic Hallucinations**: The model contradicts the source text provided in the prompt.
- **Extrinsic Hallucinations**: The model adds information that isn't in the source and isn't factually true in the real world.
- **Root Causes**: 
    - Probabilistic nature of next-token prediction (choosing the "wrong" path).
    - Training data quality and staleness.
    - "Sycophancy": The model trying to please the user or align with prompt biases.
- **Mitigation**:
    - **RAG (Retrieval Augmented Generation)**: Grounding the model in external, verifiable data.
    - **Chain of Thought (CoT)**: Encouraging the model to reason step-by-step to reduce logic errors.
    - **Verification Loops**: Using one model to check another's output.

> Full content was processed via Gemini's native video understanding.
> This file captures extracted knowledge, not the raw transcript.
