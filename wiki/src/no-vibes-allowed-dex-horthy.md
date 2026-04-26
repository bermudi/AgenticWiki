---
title: "No Vibes Allowed: Solving Hard Problems in Complex Codebases"
created: 2026-04-25
updated: 2026-04-25
sources: ["raw/yt-no-vibes-allowed-dex-horthy.md"]
tags: ["ai-engineering", "complex-codebases", "context", "verification"]
---

# No Vibes Allowed: Solving Hard Problems in Complex Codebases

> Dex Horthy argues for a shift from "vibes-based engineering" to a more rigorous, context-aware approach when using LLMs in complex software environments. He emphasizes the need for deep code intelligence and verification loops.

## Body

In this talk at the AI Engineer Code Summit, Dex Horthy (CTO at Sourcegraph) explores why LLMs struggle with "hard" engineering problems and how to bridge the gap between AI generation and production-grade engineering.

### The Limits of "Vibes"
"Vibes-based engineering" refers to the practice of prompting an LLM and hoping for a correct result without providing sufficient context or verifying the output against the system's actual constraints. This works for small, isolated tasks but breaks down in complex, legacy, or large-scale codebases where:
- Knowledge is distributed across many files.
- Implicit dependencies exist.
- Architectural patterns must be followed strictly.

### Deep Context and Code Intelligence
To solve hard problems, an AI assistant needs more than just a few snippets of code (simple RAG). It needs:
- **Symbolic Understanding**: Knowing what a function does, where it's defined, and where it's used.
- **Graph Context**: Understanding the relationships between different parts of the system.
- **Cross-Repository Knowledge**: Many problems span multiple services or libraries.

### The Verification Loop
Horthy stresses that engineering rigor requires a loop:
1. **Research**: Use code search and intelligence to understand the problem space.
2. **Proposal**: Generate a solution based on high-fidelity context.
3. **Verification**: Run tests, linters, and type checkers to catch "vibey" hallucinations.
4. **Refinement**: Use the feedback from verification to iterate on the solution.

## Thread
- [[the-slop-problem]] — Vibes-based engineering as a root cause of slop.
- [[the-human-lever]] — Horthy's verification loop as the contract between human authority and agent implementation.

## Related

- [[grey-box-engineering]] — Horthy's "No Vibes" approach aligns with the idea of knowing enough about the internals to verify results.
- [[strategic-vs-tactical-programming]] — "No Vibes" is a form of strategic programming, focusing on long-term correctness over tactical speed.
- [[ai-design-loop]] — The verification loop Horthy describes is a core part of an effective AI-assisted design process.
- [[dex-horthy]] — The speaker and CTO of Sourcegraph.
- [[cody]] — The tool built on the code intelligence principles described.

## Sources

- `raw/yt-no-vibes-allowed-dex-horthy.md` — Key takeaways from the conference talk.
