---
title: Treehouse
created: 2026-07-09
updated: 2026-07-09
sources:
  - raw/yt-l8-principal-s-agentic-engineering-workflow.md
unaudited_marginal: 0
tags: [project, git, worktree, parallel, workflow]
---

# Treehouse

> A git worktree manager by Kun Chen. It removes the mental overhead of creating, naming, and cleaning up git worktrees when running multiple agents in parallel.

## How It Works

- Run `treehouse` inside a repo to drop into a fresh worktree.
- Run it again to spawn another worktree.
- `treehouse status` lists all worktrees and their usage.
- When the session/tab closes, Treehouse frees up that worktree for future use. It tries to reuse idle worktrees instead of creating new ones.

## Problem It Solves

Git worktrees are the standard way to run parallel agents without conflict, but they create administrative debt: the human must name them, remember what is in each, and manually remove them. Treehouse manages this lifecycle, treating worktrees as reusable containers that the tool manages instead of the human.

## Thread

- [[the-agent-workflow]] — Treehouse is the isolation layer for parallel agent sessions.
- [[afk-agent]] — Parallel agent sessions need isolated worktrees; Treehouse makes them cheap.

## Related

- [[first-mate]] — First-mate calls Treehouse to create worktrees for parallel tasks.
- [[no-mistakes]] — No Mistakes uses isolated git worktrees for validation, but does not explicitly use Treehouse.
- [[kun-chen]] — Author of Treehouse.

## Sources

- `raw/yt-l8-principal-s-agentic-engineering-workflow.md` — Motivation, usage, and comparison with raw git worktrees.
