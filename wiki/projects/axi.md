---
title: AXI
created: 2026-07-09
updated: 2026-07-09
sources:
  - raw/yt-l8-principal-s-agentic-engineering-workflow.md
unaudited_marginal: 0
tags: [project, tool-design, agent-tooling, github, chrome-devtools]
---

# AXI

> A set of design standards and tool implementations by Kun Chen for making tools more efficient for agents to use. The central claim is that tools not optimized for agent ergonomics can cost more tokens and latency, and that designing for agent ergonomics can improve agent efficiency.

## Design Principles

Kun authored ten principles for "AXI" tools. The core theme is **agent ergonomics**: tools should be optimized for how an agent consumes them rather than for a human user. The source gives one example — a token-efficient output format can save about **40% of tokens** compared to JSON.

## Benchmarked Implementations

Kun built and benchmarked at least two AXI tools:

- **GitHub-AXI** — compared to the GitHub MCP server and the `gh` CLI on the same tasks. Kun reports that the GitHub MCP server costs **3× more tokens and more than 2× the latency** of the CLI, with no clear benefit. The AXI implementation had the lowest cost and highest success rate.
- **Chrome DevTools AXI** — benchmarked against other browser tools; agents using the AXI tool took fewer turns and fewer tokens for the same tasks.

The GitHub comparison is presented as a general caution: when you give a tool to an agent, research its efficiency, because the tool's design directly affects how much mileage the agent delivers.

## Thread

- [[tool-design-for-agents]] — AXI is a practitioner case for agent-ergonomic tooling.
- [[agent-friendly-tooling]] — AXI tools are a concrete example of agent-friendly tooling.

## Related

- [[context-engineering]] — Token-efficient tool output reduces the amount of context the agent must process.
- [[the-agent-workflow]] — Tool efficiency is a first-class workflow cost variable.
- [[kun-chen]] — Author of AXI.
- [[lavish]] — The source also mentions "lavish axi" as a tool in Kun's catalog.

## Sources

- `raw/yt-l8-principal-s-agentic-engineering-workflow.md` — AXI motivation, ten principles, GitHub-MCP-vs-CLI benchmark, Chrome DevTools benchmark.
