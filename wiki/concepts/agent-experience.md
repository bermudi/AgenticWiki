---
title: Agent Experience (AX)
created: 2026-04-25
updated: 2026-04-25
sources: ["raw/yt-reinventing-software-panel.md", "raw/yt-how-agents-use-dev-tools.md"]
tags: ["concept", "dx", "ax", "software-design", "tool-design"]
---

# Agent Experience (AX)

> The ease with which an AI agent can understand, navigate, and modify a codebase.

## Overview

Agent Experience (AX) is a burgeoning concept that posits that the quality of a codebase for AI agents is fundamentally the same as its quality for human developers (**Developer Experience** or **DX**). AI agents, like humans, struggle with high cognitive load, lack of context, and non-deterministic or side-effect-heavy code.

## The AX/DX Convergence

As suggested by Martin Fowler and Kent Beck in the [[reinventing-software-panel]], the Venn diagram of DX and AX is a circle. [[zanie-blue|Zanie Blue]] extends this from codebase design to tool design: tools must also be optimized for agentic consumption, not just code structure. Practices that make code easier for humans also make it easier for agents:

- **TDD/Automated Tests:** Provide a clear "contract" for the agent to verify its work.
- **Deep Modules:** Reduce the surface area an agent needs to reason about at any one time (see [[deep-vs-shallow-modules]]).
- **Clear Naming:** Helps the LLM's semantic understanding.
- **Consistency:** Reduces the amount of "novelty" the agent must process.

## Why AX Matters

As software development shifts toward agentic workflows, the "usability" of a codebase will be measured by how effectively an agent can operate within it. A codebase with poor AX will lead to more [[slop]] and more frequent [[compounding-booboos]].

## Thread

- [[the-human-lever]] — AX/DX convergence as a core argument for why the human must own design boundaries.

## Related

- [[deep-vs-shallow-modules]] — Key for managing agent context.
- [[verification-loop]] — AX relies on strong feedback loops.
- [[shared-design-concept]] — AX is high when the agent can easily infer the system's "theory."
- [[slop]] — Poor AX leads to more slop.
- [[compounding-booboos]] — Poor AX causes errors to compound.
- [[martin-fowler]] — Co-originator of the AX/DX convergence insight.
- [[kent-beck]] — Co-originator of the AX/DX convergence insight.
- [[zanie-blue]] — Extended AX from codebases to tool design.
- [[tool-design-for-agents]] — Extends AX from codebases to the tools agents use.

## Sources

- `raw/yt-reinventing-software-panel.md`
- `raw/yt-how-agents-use-dev-tools.md`
