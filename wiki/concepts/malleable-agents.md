---
title: Malleable Agents
created: 2026-04-25
updated: 2026-04-25
sources: [raw/yt-building-pi-in-a-world-of-slop.md]
tags: [concept, ai-agents, design-patterns]
---

# Malleable Agents

> An approach to agent design where the agent's behavior, tools, and constraints can be modified on the fly by either the user or the agent itself.

## Overview

Malleable agents are "soft" systems. Instead of having a fixed set of capabilities defined in code, they operate in an environment where they can create new abstractions, write their own tools, and adjust their instructions to fit the specific task at hand.

## In [[pi]]

In the pi agent harness, malleability is achieved through:
- **Skills**: Sets of instructions and examples that can be loaded into a session.
- **Agent Modification**: The agent can be asked to write new skills or modify its own configuration.
- **Extensible Tools**: The human can quickly add new bash scripts or TypeScript modules that become tools for the agent.

## Related

- [[pi]] — An implementation of a malleable agent harness.
- [[ai-design-loop]] — The process of iterating on the agent's capabilities.

## Sources

- `raw/yt-building-pi-in-a-world-of-slop.md`
