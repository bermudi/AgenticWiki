---
title: Deep vs. Shallow Modules
created: 2026-04-24
updated: 2026-05-05
sources: ["raw/yt-ai-coding-for-real-engineers.md", "raw/yt-how-to-de-slop-a-codebase-ruined-by-ai-with-one-skill.md", "raw/yt-software-fundamentals-matter-more-than-ever-matt-pocock.md", "raw/yt-full-walkthrough-workflow-for-ai-coding-matt-pocock.md"]
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

> [!warning] AI Defaults to Shallow
> Left unchecked, AI agents tend to produce **shallow modules** — lots of tiny files with tangled dependencies. Matt warns: "if you don't watch AI carefully, it's going to produce a codebase that looks like this." The AI has no instinct for module depth; it defaults to whatever is easiest to generate. The human must actively enforce deep module boundaries through interface design, PRD module specifications, and continuous architecture review (the [[improve-codebase-architecture]] skill).

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
- `raw/yt-how-to-de-slop-a-codebase-ruined-by-ai-with-one-skill.md` — Locality, leverage, seams, and adapters as the vocabulary of module depth.
- `raw/yt-software-fundamentals-matter-more-than-ever-matt-pocock.md` — Visual contrast (blobs vs. bounded boxes), deep modules as testable modules, AI navigation difficulty in shallow architectures.
- `raw/yt-full-walkthrough-workflow-for-ai-coding-matt-pocock.md` — Warning that AI defaults to producing shallow modules; deep modules require active human enforcement.
