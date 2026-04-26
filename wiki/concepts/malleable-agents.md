---
title: Malleable Agents
created: 2026-04-25
updated: 2026-04-26
sources: ["raw/yt-building-pi-in-a-world-of-slop.md", "raw/yt-how-agents-use-dev-tools.md"]
tags: ["concept", "ai-agents", "design-patterns", "plugins"]
---

# Malleable Agents

> An approach to agent design where the agent's behavior, tools, and constraints can be modified on the fly by either the user or the agent itself.

## Overview

Malleable agents are "soft" systems. Instead of having a fixed set of capabilities defined in code, they operate in an environment where they can create new abstractions, write their own tools, and adjust their instructions to fit the specific task at hand.

## Plugin Extensibility

[[zanie-blue|Zanie Blue]] (Astral) argues that plugins are the key to compounding benefits from agents. When agents can extend their tools — defining custom lint rules, adding new automations — they build their own feedback loops. This is a form of **agent memory**: an agent that defines a lint rule to prevent a mistake it made yesterday is encoding experience.

Research shows agents that construct their own tools outperform those with pre-built harnesses, connecting self-tooling directly to malleability.

## In [[pi]]

In the pi agent harness, malleability is achieved through:
- **Skills**: Sets of instructions and examples that can be loaded into a session.
- **Agent Modification**: The agent can be asked to write new skills or modify its own configuration.
- **Extensible Tools**: The human can quickly add new bash scripts or TypeScript modules that become tools for the agent.

## Thread
- [[the-agent-workflow]] — Malleability as a tool for context management mid-session
- [[tool-design-for-agents]] — Plugin extensibility and self-tooling as a tool design principle for agents

## Related

- [[pi]] — An implementation of a malleable agent harness.
- [[ai-design-loop]] — The process of iterating on the agent's capabilities.
- [[verification-loop]] — Malleable agents benefit from tight verification loops.
- [[mario-zechner]] — Creator and advocate of malleable agent design.
- [[tool-design-for-agents]] — Plugin extensibility as a tool design principle for agents.
- [[zanie-blue]] — Advocate for plugins as agent memory and self-tooling.
- [[astral]] — Tool builder actively adapting for agentic use.

## Sources

- `raw/yt-building-pi-in-a-world-of-slop.md`
- `raw/yt-how-agents-use-dev-tools.md`
