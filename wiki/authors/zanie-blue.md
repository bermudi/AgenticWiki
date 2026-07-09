---
title: Zanie Blue
created: 2026-04-25
updated: 2026-04-26
sources: ["raw/yt-how-agents-use-dev-tools.md"]
unaudited_marginal: 0
tags: ["person", "astral", "python", "developer-tools"]
---

# Zanie Blue

> Engineer at Astral, advocate for redesigning developer tools for agentic consumption.

## Overview

Zanie Blue works at Astral, building tools for Python developers (Ruff, ty, uv). Their talk at PyCon 2026 systematically analyzes how agentic programming changes the requirements for developer tools — from output formats to confidence levels to trust models.

## Key Ideas

- Tools must provide deterministic, specialized feedback to constrain stochastic agent behavior.
- Tool output should be optimized for context efficiency, not human readability alone.
- Agents can handle more diagnostic noise than humans — tools should expose more low-confidence signals.
- Escape hatches (noqa, suppressions) may need to be restricted for agentic use.
- Plugins enable agents to build their own feedback loops and memory.

## Related

- `raw/yt-how-agents-use-dev-tools.md` — The source talk.
- [[astral]] — Their employer.
- [[tool-design-for-agents]] — The core concept from their talk.
- [[agent-experience]] — Extended AX from codebases to tool design.
- [[malleable-agents]] — Advocate for plugins as agent memory and self-tooling.
- [[smart-zone-dumb-zone]] — Identified tool output as a major contributor to Dumb Zone drift.

## Sources

- `raw/yt-how-agents-use-dev-tools.md`
