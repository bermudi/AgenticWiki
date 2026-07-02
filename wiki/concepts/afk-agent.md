---
title: AFK Agent
created: 2026-04-25
updated: 2026-07-01
sources: [raw/yt-claude-code-feature-build.md, raw/how-to-ralph-wiggum.md, raw/ralph-wiggum-playbook.md, "raw/yt-software-engineering-is-becoming-plan-and-review-louis-knight-webb-vibe-kanban.md", "raw/yt-full-walkthrough-workflow-for-ai-coding-matt-pocock.md"]
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

[[matt-pocock|Matt Pocock]] uses [[sandcastle|Sandcastle]], a TypeScript library for orchestrating parallel AFK agent loops. The pipeline has four stages:

1. **Planner** — reads the issue backlog, identifies which issues can run in parallel based on blocking relationships (Kanban DAG), and selects a batch
2. **Implementer** (per-issue, parallel) — each selected issue gets its own Docker-sandboxed agent that creates a work tree, implements, and commits
3. **Reviewer** (per-issue, parallel) — each branch is reviewed by a separate agent; coding standards are pushed to the reviewer context
4. **Merger** — merges all reviewed branches, resolving any conflicts with types and tests

This is the parallelized evolution of the sequential Ralph Loop: instead of one agent picking the next task, multiple agents work on independent issues simultaneously. The Kanban DAG determines which issues can be parallelized.

## QA as Parallel Activity

A key pattern from Matt's workflow: **QA runs concurrently with AFK implementation, not after it**. While the Ralph loop implements issues in the background, Matt simultaneously tests the application, finds bugs, and files new GitHub issues. These issues become fodder for the next Ralph iteration.

This creates a temporal parallelism — sometimes called the **"day shift / night shift"** pattern (coined by Jamon on Twitter): the human does the day shift (grilling, PRD writing, QA) while the agent does the night shift (implementation). The human's work queues tasks for the agent; the agent's work provides material for the human's QA.

### Focus Maxing: Parallel AFK Streams

As agents run for longer (crossing the 5-minute execution threshold), the single-AFK-agent model extends to **multiple concurrent AFK streams** — what [[louis-knight-webb|Louis Knight-Webb]] calls "focus maxing." The human dispatches several tasks simultaneously to different agent instances. When one finishes, the human reviews the output (tests, diff, preview), sends corrections or approval, and moves to the next completion while remaining agents keep running.

This is distinct from the day-shift/night-shift pattern: instead of one agent session per day, the human runs multiple agents **in parallel during the same work session**, each in different stages of the plan-execute-review lifecycle. The tooling challenge shifts from "how do I execute one AFK task" to "how do I manage a queue of AFK streams with review gates."

See [[the-agent-workflow|Focus Maxing / Parallel Agent Management]] for the full pattern.

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
- [[improve-codebase-architecture]] — The skill produces GitHub issues for AFK agents to implement.
- [[plan-vs-review]] — Plan-heavy specs are the prerequisite for effective AFK execution.
- [[louis-knight-webb]] — Articulated focus maxing / parallel AFK management.
- [[execution-apathy]] — Execution apathy is particularly dangerous for AFK agents: they report completion without having done the work
- [[blind-panic]] — Blind panic manifests as an AFK agent that runs its full budget producing confused, looping traces
- [[model-routing]] — Model routing enables cheaper, more scalable AFK execution by routing subtasks to the cheapest capable model
- [[software-factory]] — The software factory is the full automation of the AFK agent concept — replacing the human-in-the-loop with a system
- [[wide-events]] — Wide events make AFK agent behavior inspectable without constant human attention
- [[agent-loop]] — The agent loop is the canonical AFK execution pattern: a program that prompts the agent each tick instead of a human

## Sources

- `raw/yt-claude-code-feature-build.md` — Demonstration of using an AFK agent to implement a multi-issue feature.
- `raw/how-to-ralph-wiggum.md` — The Ralph Wiggum autonomous loop pattern.
- `raw/ralph-wiggum-playbook.md` — paddo.dev summary of the Ralph methodology.
- `raw/yt-software-engineering-is-becoming-plan-and-review-louis-knight-webb-vibe-kanban.md` — Focus maxing / parallel AFK management as agents cross the 5-minute execution threshold.
- `raw/yt-full-walkthrough-workflow-for-ai-coding-matt-pocock.md` — Sandcastle: the parallelized AFK pipeline (planner → implementer → reviewer → merger), Docker sandboxing, Kanban DAG for parallelization
