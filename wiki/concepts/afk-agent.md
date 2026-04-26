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

## Thread
- [[the-agent-workflow]] — AFK is the "execution" phase of the modern agentic workflow.

## Related

- [[claude-code]] — Can be used to spawn AFK agents (e.g., "Ralph").
- [[verification-loop]] — Essential for ensuring AFK agent output is correct.
- [[matt-pocock]] — Primary advocate of the HITL/AFK split.
- [[geoffrey-huntley]] — Originator of the Ralph Wiggum AFK implementation.
- [[backpressure]] — The convergence mechanism AFK agents need.
- [[plan-disposability]] — Plans as ephemeral coordination state for AFK loops.

## Sources

- `raw/yt-claude-code-feature-build.md` — Demonstration of using an AFK agent to implement a multi-issue feature.
- `raw/how-to-ralph-wiggum.md` — The Ralph Wiggum autonomous loop pattern.
- `raw/ralph-wiggum-playbook.md` — paddo.dev summary of the Ralph methodology.
