---
title: Kun Chen
created: 2026-07-09
updated: 2026-07-09
sources:
  - raw/yt-l8-principal-s-agentic-engineering-workflow.md
unaudited_marginal: 0
tags: [author, practitioner, ai-engineering, agent-harness, workflow]
---

# Kun Chen

> Former L8 principal engineer (Meta, Microsoft, Atlassian) who built frontier coding agents at Atlassian and now publishes a disciplined, tool-heavy agentic engineering workflow. He ships 40 to 50 well-tested production changes almost every day, sometimes more, mostly via a self-built stack of open-source tools.

## Background

In the video, Kun describes himself as an ex-L8 principal engineer who has worked at Meta, Microsoft, and Atlassian, and who has been building frontier coding agents at Atlassian. He reports shipping 40 to 50 well-tested production changes almost every day, sometimes more, and frames the work as real engineering rather than demo-level "Minecraft builds."

## Agentic Engineering Workflow

Kun's workflow is terminal-centric and agent-agnostic: he uses Claude Code, Codex CLI, Pi, and OpenCode, but deliberately avoids locking into any one harness. The core operating ideas are:

- **Memory files and skills** as progressive disclosure: a tiny global memory file shared across all agents via symlink, plus a growing project-level memory file; conditionally-used knowledge is extracted into skills so it only loads when needed.
- **Tool design matters for cost and latency**: he authored a set of "axi" principles and tools (GitHub-axi, Chrome-devtools-axi) that are optimized for agent consumption, and benchmarked them against GitHub MCP and raw CLI.
- **Plan in an HTML artifact**: [[lavish]] renders plan options as interactive, in-project-style HTML instead of a terminal wall of text so the human can annotate and decide in a browser.
- **Autonomous PR pipeline**: [[no-mistakes]] turns an agent's first-pass code into a clean, evidence-backed PR with adversarial review, end-to-end testing, docs, lint, and PR babysitting.
- **Overnight loops**: [[good-night-have-fun]] runs bounded agent loops against verifiable objectives while the human is away.
- **Parallel worktrees**: [[treehouse]] manages git worktrees so multiple agents can run without stepping on each other, without the human having to remember each worktree.
- **Meta-agent crew manager**: [[first-mate]] is a higher-level agent that takes natural-language direction from the human and dispatches work to other agents, managing tabs, worktrees, and the no-mistakes pipeline.

## Tools

| Tool | Role |
|---|---|
| [[treehouse]] | Git worktree manager for parallel agent sessions. |
| [[no-mistakes]] | Autonomous PR pipeline from first-pass code to merged PR. |
| [[lavish]] | HTML artifact editor for planning and design review with an agent. |
| [[axi]] | Agent-ergonomic tool standard and implementations (GitHub, Chrome DevTools). |
| [[good-night-have-fun]] | Long-running, bounded agent loop for overnight objectives. |
| [[first-mate]] | Meta-agent that manages the "crew" of task agents. |

## Thread

- [[the-agent-workflow]] — Kun's setup is a concrete end-to-end instantiation of plan-HITL, execute-AFK, parallelize, and review.
- [[tool-design-for-agents]] — The [[axi]] tools and GitHub-MCP-vs-CLI benchmarks are a practitioner case for agent-ergonomic tooling.
- [[context-engineering]] — Memory files and skills as progressive disclosure operationalize context-density management.
- [[the-human-lever]] — The "captain / first mate / crew" metaphor is a direct reframing of the human as strategic manager, not reviewer.
- [[agent-quality-engineering]] — [[no-mistakes]] is an autonomous quality pipeline.

## Related

- [[agent-friendly-tooling]] — Kun's axi tools extend the agent-friendly tooling pattern.
- [[afk-agent]] — Good-night-have-fun and no-mistakes are AFK execution patterns.
- [[plan-vs-review]] — Lavish is a plan-heavy UI artifact; the workflow explicitly invests in planning to reduce review.
- [[orchestration-loop]] — First-mate is a hand-designed meta-agent orchestrator.
- [[agent-skills]] — Kun's memory → skill extraction and warning against unbenchmarked skills.

## Sources

- `raw/yt-l8-principal-s-agentic-engineering-workflow.md` — Full workflow walkthrough, tool introductions, and the captain/crew/first-mate framing.
