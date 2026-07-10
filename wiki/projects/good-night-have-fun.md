---
title: Good Night, Have Fun
created: 2026-07-09
updated: 2026-07-09
sources:
  - raw/yt-l8-principal-s-agentic-engineering-workflow.md
unaudited_marginal: 0
tags: [project, agent-loop, afk, overnight, autonomous-agents]
---

# Good Night, Have Fun

> An open-source long-running agent loop by Kun Chen for running bounded, verifiable objectives overnight or while the human is away. The human gives an objective and a stop condition; the agent keeps iterating until the condition is met or a token/iteration cap is hit.

## How It Works

- The user provides an objective and optional stop conditions.
- The agent runs in a loop, measuring progress against the objective.
- The tool enforces **token caps**, **iteration caps**, and explicit **stop conditions** so the loop cannot run away while the user sleeps.
- Iterations are visualized as moons in the UI; the user can see how many iterations and commits have been made.
- When the loop ends, the user can review the commits and choose which ones to keep.

## Example Objective

Kun's example: run a usability test of an AI app as if the user were a seven-year-old, find the first usability problem that would confuse a child, stop and fix it, then repeat. The loop continues finding and fixing problems until the stop condition is met.

## Why Not Use `/goal`

Kun compares Good Night, Have Fun to Claude Code's `/goal` and Codex's `/goal` commands. His argument is that productized `/goal` loops lack precise budget controls: if you set a goal before bed, you might wake up with your weekly quota exhausted. Good Night, Have Fun solves the spend-control problem by letting the user set caps on tokens, iterations, and stop conditions explicitly.

## Thread

- [[afk-agent]] — Good Night, Have Fun is a bounded AFK agent loop.
- [[agent-loop]] — It is a concrete example of an agent loop with explicit hard stops.
- [[the-agent-workflow]] — It extends the execution phase across hours while the human is away.

## Related

- [[no-mistakes]] — No Mistakes can turn the commits a Good Night, Have Fun run produces into a clean PR.

- [[first-mate]] — First-mate can launch and manage Good Night, Have Fun loops.
- [[verifiability]] — The loop is only safe when the objective is mechanically verifiable.

## Sources

- `raw/yt-l8-principal-s-agentic-engineering-workflow.md` — Description, example task, comparison with `/goal`, and budget controls.
