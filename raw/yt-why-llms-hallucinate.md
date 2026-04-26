---
type: youtube
url: https://www.youtube.com/watch?v=9VNG0h4pLh0
title: Why LLMs Hallucinate (and how to stop them)
channel: Matt Pocock
date: 2024-03-20
ingested: 2026-04-25
---

# Key points extracted during ingest

- **Taxonomy of Hallucinations**:
    - **Intrinsic Hallucinations**: When the LLM contradicts the provided context (e.g., Air Canada's chatbot making up a refund policy despite having the correct one in its prompt).
    - **Extrinsic Hallucinations**: When the LLM fabricates information from its training data (e.g., inventing a non-existent npm package or law).
- **The Compression Problem**: Training 10TB of data into a ~140GB model results in lossy compression. The LLM remembers the "vibe" and structure but loses the exact precision of facts.
- **Next-Token Prediction**: LLMs are statistical engines, not knowledge databases. They predict the most likely next word, which favors fluency over accuracy.
- **Mitigation Strategies**:
    - Move from extrinsic to intrinsic tasks by providing the necessary context in the prompt (RAG).
    - Use tools (Search, Code Interpreter) to ground the model in external reality.
    - Human verification for critical path items.

> Full content was processed via Gemini's native video understanding.
> This file captures extracted knowledge, not the raw transcript.
