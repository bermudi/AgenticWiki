---
title: Malleable Agents
created: 2026-04-25
updated: 2026-05-04
sources:
  - raw/yt-building-pi-in-a-world-of-slop.md
  - raw/yt-how-agents-use-dev-tools.md
  - "raw/Building Pi, and what makes self-modifying software so fascinating - youtube.com.md"
tags: [concept, ai-agents, design-patterns, plugins, self-modifying-software]
---

# Malleable Agents

> An approach to agent design where the agent's behavior, tools, and constraints can be modified on the fly by either the user or the agent itself. The first practical foray into **self-modifying software** — software that adapts itself on behalf of the user's wishes and needs.

## Overview

Malleable agents are "soft" systems. Instead of having a fixed set of capabilities defined in code, they operate in an environment where they can create new abstractions, write their own tools, and adjust their instructions to fit the specific task at hand.

## Self-Modifying Software

[[mario-zechner|Mario Zechner]] frames malleability as the first step toward a broader paradigm of self-modifying software. In [[pi]], non-technical users ask the agent to modify the agent's own UI, add features like MCP support, or rebuild interaction patterns — and Pi writes the code that extends itself. Mario sees this extending beyond coding tools to all knowledge work: software that modifies itself on behalf of the user's needs, with agents doing the modification if given enough rope.

The key insight: malleability isn't just a convenience feature. It's a paradigm shift from software as a fixed product to software as a living, user-adapted tool.

## Plugin Extensibility

[[zanie-blue|Zanie Blue]] (Astral) argues that plugins are the key to compounding benefits from agents. When agents can extend their tools — defining custom lint rules, adding new automations — they build their own feedback loops. This is a form of **agent memory**: an agent that defines a lint rule to prevent a mistake it made yesterday is encoding experience.

Research shows agents that construct their own tools outperform those with pre-built harnesses, connecting self-tooling directly to malleability.

## In [[pi]]

In the pi agent harness, malleability is achieved through:
- **Skills**: Sets of instructions and examples that can be loaded into a session.
- **Agent Modification**: The agent can be asked to write new skills or modify its own configuration.
- **Extensible Tools**: The human can quickly add new bash scripts or TypeScript modules that become tools for the agent.
- **Extension points**: TypeScript modules loaded into the same Node process with hook points for custom tools, compaction, TUI modification — the periphery is emergent, the core stays small.

Examples from practice:
- Users who don't know how to code asking Pi to rebuild Pi's own TUI for their workflow.
- Armin building bespoke plan modes (five implementations, all abandoned — he concluded that a formalized plan-mode *feature* is useless, not that planning itself is useless).
- Someone reconfiguring Pi as an RL execution environment for open-weight models.
- Mario's own minimal setup: just a GitHub issue/PR preview widget.

## Thread

- [[the-agent-workflow]] — Malleability as a tool for context management mid-session
- [[tool-design-for-agents]] — Plugin extensibility and self-tooling as a tool design principle for agents
- [[the-slop-problem]] — Malleability as the alternative to feature-bloat: extend on demand rather than ship everything

## Related

- [[pi]] — The primary implementation of a malleable agent harness.
- [[ai-design-loop]] — The process of iterating on the agent's capabilities.
- [[verification-loop]] — Malleable agents benefit from tight verification loops.
- [[mario-zechner]] — Creator and advocate of malleable agent design.
- [[tool-design-for-agents]] — Plugin extensibility as a tool design principle for agents.
- [[zanie-blue]] — Advocate for plugins as agent memory and self-tooling.
- [[astral]] — Tool builder actively adapting for agentic use.
- [[armin-ronacher]] — Pi contributor and plan-mode experimenter.
- [[agent-skills]] — Skills being just files means agents can create and modify them, making agents self-extending

## Sources

- `raw/yt-building-pi-in-a-world-of-slop.md`
- `raw/yt-how-agents-use-dev-tools.md`
- `raw/Building Pi, and what makes self-modifying software so fascinating - youtube.com.md` — Self-modifying software as paradigm, non-technical users modifying Pi, extension points, Armin's plan-mode experiments
