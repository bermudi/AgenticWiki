---
title: AFK Agent
created: 2026-04-25
updated: 2026-04-26
sources: [raw/yt-claude-code-feature-build.md, raw/how-to-ralph-wiggum.md, raw/ralph-wiggum-playbook.md]
tags: [concept, workflow, agents]
---

# AFK Agent

> An agent that operates "Away From Keyboard," performing implementation tasks in the background while the human developer focuses on design or other high-level work.

## Characteristics

- **Asynchronous Execution**: Unlike interactive sessions, AFK agents work on a queue of tasks (e.g., GitHub issues).
- **Sandboxed Environments**: Often run in isolated environments like Docker to ensure safety and reproducibility.
- **Verification-First**: Their output is typically reviewed through a separate QA or feedback UI rather than live in the terminal.
- **Task Decomposition**: Requires a well-defined PRD or set of issues to work effectively without constant human intervention.

## Benefits

- **Parallelism**: Multiple AFK agents can work on different parts of a feature simultaneously.
- **Focus**: Frees the human from watching the "cursor" and allows them to move to the next design challenge.

## The Ralph Loop

[[geoffrey-huntley|Geoffrey Huntley]]'s [[ralph-loop|Ralph Loop]] is the most detailed AFK implementation in this wiki — a dumb bash loop with fresh context per iteration, a plan file as shared state, and [[backpressure]] as the convergence mechanism. See [[ralph-loop]] for full mechanics.

## Matt Pocock's "Sandcastle" Setup

[[matt-pocock|Matt Pocock]] uses a Docker-based AFK runner (provisionally named "Sandcastle") that:
1. Spins up a Docker container mounting the working directory
2. Runs Claude Code inside the container to implement GitHub issues
3. Extracts commits made inside Docker as patches
4. Applies those patches to the local repo

This approach provides isolation (the agent can't break the host environment) while keeping the full codebase available. Task selection is issue-based rather than plan-file-based: the agent pulls open GitHub issues, picks one, implements it, commits, and closes the issue.

## QA as Parallel Activity

A key pattern from Matt's workflow: **QA runs concurrently with AFK implementation, not after it**. While the Ralph loop implements issues in the background, Matt simultaneously tests the application, finds bugs, and files new GitHub issues. These issues become fodder for the next Ralph iteration.

This creates a temporal parallelism — sometimes called the **"day shift / night shift"** pattern (coined by Jamon on Twitter): the human does the day shift (grilling, PRD writing, QA) while the agent does the night shift (implementation). The human's work queues tasks for the agent; the agent's work provides material for the human's QA.

## Thread
- [[the-agent-workflow]] — AFK is the "execution" phase of the modern agentic workflow.
- [[the-human-lever]] — The human shifts from implementation to QA and design; AFK agents execute under human-owned boundaries.

## Related

- [[claude-code]] — Can be used to spawn AFK agents (e.g., "Ralph").
- [[verification-loop]] — Essential for ensuring AFK agent output is correct.
- [[matt-pocock]] — Primary advocate of the HITL/AFK split.
- [[geoffrey-huntley]] — Originator of the Ralph Wiggum AFK implementation.
- [[backpressure]] — The convergence mechanism AFK agents need.
- [[plan-disposability]] — Plans as ephemeral coordination state for AFK loops.
- [[ralph-loop]] — The canonical AFK implementation (Ralph Wiggum loop).
- [[the-agent-workflow]] — The full pipeline from grilling through QA.

## Sources

- `raw/yt-claude-code-feature-build.md` — Demonstration of using an AFK agent to implement a multi-issue feature.
- `raw/how-to-ralph-wiggum.md` — The Ralph Wiggum autonomous loop pattern.
- `raw/ralph-wiggum-playbook.md` — paddo.dev summary of the Ralph methodology.
