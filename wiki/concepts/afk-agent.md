---
title: AFK Agent
created: 2026-04-25
updated: 2026-04-25
sources: [raw/yt-claude-code-feature-build.md]
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

## Thread

- [[the-agent-workflow]] — AFK is the "execution" phase of the modern agentic workflow.

## Related

- [[claude-code]] — Can be used to spawn AFK agents (e.g., "Ralph").
- [[verification-loop]] — Essential for ensuring AFK agent output is correct.

## Sources

- `raw/yt-claude-code-feature-build.md` — Demonstration of using an AFK agent to implement a multi-issue feature.
