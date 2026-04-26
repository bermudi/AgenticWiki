---
title: Armin Ronacher
created: 2026-04-26
updated: 2026-04-26
sources:
  - raw/agentic-coding-recommendations.md
tags: [author, python, flask, go, agentic-coding]
---

# Armin Ronacher

> Creator of Flask and Sentry. Advocate for Go in agentic workflows, tooling minimalism, and simplicity as an agent force multiplier. Brings a practitioner's perspective — he ships production systems with agents daily.

## Background

Armin Ronacher is a software engineer best known as the creator of **Flask** (Python web framework) and a founding engineer at **Sentry**. He writes about software engineering at [lucumr.pocoo.org](https://lucumr.pocoo.org).

## Key Positions

- **Go over Python for agentic coding**: Despite his Python pedigree (Flask, Sentry), Ronacher recommends Go for new backend projects in agentic workflows. Python's magic (pytest fixtures, async event loops) and slow interpreter boot time make it hostile to agent loops.
- **Tooling minimalism**: Prefers plain shell scripts and Makefiles over MCP servers. MCP is a last resort when the alternative is unreliable. Anything the agent can interact with is a tool.
- **Speed is the meta-constraint**: Agent loop quality is bounded by tool response time. Fast compilation, fast test execution, and fast tooling response are more important than feature richness.
- **Conservative upgrades**: Agent-cheapened upgrades degrade codebase quality. Be *more* conservative about library upgrades in agentic workflows than in manual ones.
- **Simple code**: Functions over classes, plain SQL over ORMs, local permission checks. "The dumbest possible thing that will work."
- **More code generation, fewer dependencies**: Prefers generating code over pulling in libraries.

## Contributions to the Wiki's Theory

Ronacher's perspective is notably **practical and grounded** compared to other sources. While [[matt-pocock|Matt Pocock]] focuses on workflow architecture and [[dex-horthy|Dex Horthy]] on verification rigor, Ronacher operates at the level of "which language should I choose" and "how should I structure my Makefile." This makes him a complement to the more theoretical sources.

His emphasis on Go's structural interfaces and explicit context system adds a concrete, language-specific dimension to the [[agent-experience|AX/DX convergence]] thesis. His daemon pattern for slow codebases is a novel approach to the [[tool-design-for-agents|tool design]] problem.

## Related

- [[agentic-coding-recommendations]] — His primary source in the wiki
- [[tool-design-for-agents]] — His tooling philosophy is a concrete instantiation
- [[agent-experience]] — Language choice as AX optimization
- [[the-agent-workflow]] — His workflow practices (AFK, parallelization)

## Sources

- `raw/agentic-coding-recommendations.md` — Agentic coding practices and language recommendations
