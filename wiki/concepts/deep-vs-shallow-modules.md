---
title: Deep vs. Shallow Modules
created: 2026-04-24
updated: 2026-05-03
sources: ["raw/yt-ai-coding-for-real-engineers.md", "raw/How To De-Slop A Codebase Ruined By AI (with one skill) - youtube.com.md", "raw/Software Fundamentals Matter More Than Ever — Matt Pocock - youtube.com.md"]
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

[[matt-pocock|Matt Pocock]] visualizes the contrast as two diagrams: a shallow codebase is a scattering of many tiny blobs the AI must navigate — often struggling to find the right module in time or understand all dependencies. The same code restructured into deep modules becomes a small number of clearly bounded boxes with simple interfaces on top. The AI can work inside one box without needing to understand the others.

### Deep Modules are Testable Modules
A codebase of deep modules is a codebase that rewards TDD. You test at the interface, verify behavior through that interface, and don't need to worry about internals. This is what makes deep modules the ideal unit for [[verification-loop|verification loops]] — the boundary is narrow enough to test comprehensively.

## Thread
- [[the-human-lever]] — Deep modules as the ideal delegation target for grey box engineering
- [[the-agent-workflow]] — Deep modules as context boundaries that keep agents in the Smart Zone

## Related
- [[grey-box-engineering]] — Designing deep interfaces for agent delegation.
- [[smart-zone-dumb-zone]] — How module depth helps manage context.
- [[aesthetics-is-truth]] — Elegant module boundaries as aesthetic truth.
- [[strategic-vs-tactical-programming]] — Strategic design favors deep modules.
- [[agent-experience]] — Deep modules improve both DX and AX.
- [[locality-and-leverage]] — The two payoff properties of deep modules.
- [[seams-and-adapters]] — Deep modules have clear, minimal seams.
- [[improve-codebase-architecture]] — The skill that finds deepening candidates.
- [[matt-pocock]] — Primary advocate: deep modules as the ideal delegation unit for AI agents; general/sergeant metaphor.

## Sources
- `raw/yt-ai-coding-for-real-engineers.md`
- `raw/How To De-Slop A Codebase Ruined By AI (with one skill) - youtube.com.md` — Locality, leverage, seams, and adapters as the vocabulary of module depth.
- `raw/Software Fundamentals Matter More Than Ever — Matt Pocock - youtube.com.md` — Visual contrast (blobs vs. bounded boxes), deep modules as testable modules, AI navigation difficulty in shallow architectures.
