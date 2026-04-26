---
title: Grey Box Engineering
created: 2026-04-24
updated: 2026-04-25
sources: ["raw/yt-ai-coding-for-real-engineers.md"]
tags: ["software-design", "ai-workflow"]
---

# Grey Box Engineering

> A middle-ground approach to working with AI agents that balances human design authority with agentic implementation speed.

## The Core Philosophy
In Grey Box Engineering, the human engineer owns the **Interface** and the **Plan**, while the AI agent owns the **Implementation**.

### 1. Human Design Authority (The Interface)
The human defines the "Deep Interface"—the types, the function signatures, and the public-facing API. By focusing on the interface, the human ensures the system remains navigable and maintainable.

### 2. Agentic Implementation (The Box)
The agent fills in the implementation details. Because the human has defined the boundaries (Types/Tests), the agent is constrained to produce code that fits the overall design.

### 3. Verification over Trust
You don't trust the agent's code; you trust the **[[verification-loop]]**.
- **Types**: Catch static errors.
- **Tests**: Catch logic errors (Red-Green-Refactor).
- **Tracer Bullets**: Catch integration errors.

## The HITL/AFK Loop
- **Human-In-The-Loop (HITL)**: Used during the planning phase to reach a "Shared Design Concept."
- **Away-From-Keyboard (AFK)**: Once the plan is granular enough, the agent can execute the "Grey Box" implementation autonomously. This approach avoids [[vibes-based-engineering]] by providing a rigorous framework for delegation.

## Thread
- [[the-human-lever]] — Grey box engineering as the core discipline of the human shift
- [[the-agent-workflow]] — Operationalizing the HITL/AFK handoff

## Related

- [[smart-zone-dumb-zone]] — Keeping the context small to maintain reasoning quality.
- [[tracer-bullets]] — Vertical slices to verify Grey Box designs.
- [[deep-vs-shallow-modules]] — Deep modules are the ideal targets for Grey Box delegation.
- [[verification-loop]] — The mechanical process of validating the implementation.
- [[vibes-based-engineering]] — The anti-pattern that Grey Box engineering seeks to avoid.
- [[code-intelligence]] — Enables high-fidelity context for grey box verification.
- [[compounding-booboos]] — Grey box engineering catches booboos before they compound.
- [[shared-design-concept]] — The human owns the concept; the agent implements it.
- [[slop]] — Grey box engineering is the primary alternative to slop generation.
- [[ai-design-loop]] — The design loop feeds into grey box delegation.

## Sources
- [[software-fundamentals-matter-more-than-ever]]
- [[ai-coding-for-real-engineers]]
