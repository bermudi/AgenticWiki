---
title: "Source: Why Language Models Hallucinate"
created: 2026-04-25
updated: 2026-04-25
sources: ["raw/yt-why-lms-hallucinate.md"]
tags: ["llm", "hallucination", "rag", "ai-safety"]
---

# Source: Why Language Models Hallucinate

> A high-level overview of why Large Language Models (LLMs) produce factually incorrect information and the current industry standard strategies for mitigating these errors.

## Key Takeaways

- **Definition**: Hallucination is not just "being wrong"; it's being confidently wrong.
- **Intrinsic vs. Extrinsic**:
    - *Intrinsic*: Contradicting the input context (e.g., summarizing a text and adding a fact not present).
    - *Extrinsic*: Making up facts that don't exist in the training data or the real world.
- **Probabilistic Nature**: LLMs don't "know" facts; they predict tokens. Sometimes the most probable token is factually incorrect due to patterns in the training data.
- **Mitigation Strategies**:
    - **RAG**: The most effective way to anchor models in truth.
    - **Chain of Thought**: Breaks down complex queries to prevent "logic skips" that lead to hallucinations.
    - **Self-Correction**: Iterative loops where the model reviews its own output.

## Related

- [[hallucination]] — central concept
- [[verification-loop]] — mitigation strategy
- [[slop]] — how hallucinations contribute to low-quality AI content

## Sources

- `raw/yt-why-lms-hallucinate.md` — primary source for this summary
