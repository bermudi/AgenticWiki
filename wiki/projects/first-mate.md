---
title: First Mate
created: 2026-07-09
updated: 2026-07-09
sources:
  - raw/yt-l8-principal-s-agentic-engineering-workflow.md
unaudited_marginal: 0
tags: [project, meta-agent, orchestration, multi-agent, workflow]
---

# First Mate

> An open-source meta-agent by Kun Chen that takes conversational direction from the human "captain" and dispatches parallel agents into worktrees, runs the no-mistakes pipeline, and juggles context so the human can focus on deciding what to build rather than managing each agent session.

## How It Works

The user talks to First Mate (Kun uses voice input). First Mate parses the request and decomposes it into parallel tasks. It creates worktrees (via [[treehouse]]) and launches agents in each, then runs the [[no-mistakes]] pipeline for validation. It can pull open issues, summarize them, and decide which are actionable while background tasks are running. The user can keep issuing new tasks; First Mate handles the context switching and scheduling.

## Captain / Crew Metaphor

Kun frames the workflow as a ship: the human is the captain, individual agents are crewmates, and First Mate is the first mate who manages the crew. The captain sets direction and holds the quality bar; the first mate manages the operational overhead of running many agents in parallel.

## Why It Matters

As the number of parallel agent sessions grows, the human spends too much context-switching between sessions and remembering what each is doing. First Mate externalizes that management overhead. The open problem it exposes: once the first mate is managing the work, the human becomes the bottleneck in deciding what matters (talking to users, understanding the market, crafting the "treasure map").

## Thread

- [[orchestration-loop]] — First Mate is a hand-designed meta-agent that orchestrates parallel agents.
- [[the-agent-workflow]] — It is the orchestration layer that manages parallel agent sessions.
- [[the-human-lever]] — It shifts the human from managing every agent to strategic direction and final judgment.

## Related

- [[treehouse]] — First Mate calls Treehouse to create worktrees for parallel tasks.
- [[no-mistakes]] — The validation pipeline First Mate invokes.
- [[kun-chen]] — Author of First Mate.

## Sources

- `raw/yt-l8-principal-s-agentic-engineering-workflow.md` — Live demo of First Mate decomposing a multi-repo update, dispatching agents, and triaging GitHub issues in parallel.
