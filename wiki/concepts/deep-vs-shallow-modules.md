---
title: Deep vs. Shallow Modules
created: 2026-04-24
updated: 2026-04-26
sources: ["raw/yt-ai-coding-for-real-engineers.md"]
tags: ["software-architecture", "clean-code"]
---

# Deep vs. Shallow Modules

> Deep modules provide simple interfaces that hide complex implementation; shallow modules expose their internals. From Ousterhout's design philosophy, deep modules are the ideal delegation unit for AI agents — the human owns the small interface, the agent owns the large implementation.

## Definition

### Deep Modules
A **Deep Module** provides a simple, powerful interface that hides significant internal complexity.
- **Interface**: Small, stable, and easy to understand.
- **Implementation**: Complex, high-value, and encapsulated.

### Shallow Modules
A **Shallow Module** has an interface that is complex relative to the amount of logic it provides.

## Why it Matters for AI
In a [[grey-box-engineering]] workflow, the human owns the interface and the agent owns the implementation.

- **Deep Modules are AI-Friendly**: The human can define a small "surface area" (the interface) and delegate a large "volume" of work (the implementation) to the agent. This keeps the agent in the [[smart-zone-dumb-zone]] because it doesn't need to understand the wider system to work on the module.
- **Shallow Modules are AI-Hostile**: They force the agent to understand the "leaky" details of the rest of the system, quickly pushing it into the **Dumb Zone**.

## Thread
- [[the-human-lever]] — Deep modules as the ideal delegation target for grey box engineering

## Related
- [[grey-box-engineering]] — Designing deep interfaces for agent delegation.
- [[smart-zone-dumb-zone]] — How module depth helps manage context.
- [[aesthetics-is-truth]] — Elegant module boundaries as aesthetic truth.
- [[strategic-vs-tactical-programming]] — Strategic design favors deep modules.
- [[agent-experience]] — Deep modules improve both DX and AX.

## Sources
- `raw/yt-ai-coding-for-real-engineers.md`
