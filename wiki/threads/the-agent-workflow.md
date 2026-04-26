---
title: The Agent Workflow
created: 2026-04-25
updated: 2026-04-26
sources:
  - raw/yt-ai-coding-for-real-engineers.md
  - raw/yt-building-pi-in-a-world-of-slop.md
  - raw/yt-software-fundamentals-matter-more-than-ever.md
  - raw/yt-dhh-ai-pilled.md
  - raw/yt-claude-code-feature-build.md
  - raw/yt-how-agents-use-dev-tools.md
tags: [thread, ai-engineering, workflow, agent-design, context-management, tool-design]
---

# The Agent Workflow

> How to actually work day-to-day with an AI agent: plan with human in the loop, execute away from keyboard, manage context ruthlessly, and ship tracer bullets to validate early. The operational layer that turns [[the-human-lever|design discipline]] into shipped software.

## The Two Phases

[[matt-pocock|Matt Pocock]] describes the workflow as two distinct phases:

1. **The Destination** (the PRD): Defining *what* you're building. This is a human-led, high-stakes activity. Tools like `grill-me` force the human to articulate the [[shared-design-concept]] and establish a [[ubiquitous-language]] before writing a single line of code.
2. **The Journey** (the Kanban): Breaking the Destination into granular, actionable steps. Each step should be small enough to stay in the [[smart-zone-dumb-zone|Smart Zone]].

The key discipline: **never skip the Destination**. Going straight from a vague idea to generated code is the failure mode of the [[ai-design-loop]] — it produces code that lacks a coherent design and compounds into [[the-slop-problem|slop]]. [[dhh|David Heinemeier Hansson]] argues that we are in the era of the **[[peak-programmer]]**, where the ability to automate this "Journey" means that the "Destination" (the why and the what) is now the primary differentiator and value of an engineer.

## HITL → AFK

[[grey-box-engineering|Grey Box Engineering]] defines the handoff between the two phases:

- **HITL (Human-In-The-Loop)**: Used during planning. The human defines interfaces, types, and the overall architecture. The agent may participate in refining the design, but the human has final authority.
- **AFK (Away-From-Keyboard)**: Once the plan is granular enough, an [[afk-agent]] executes autonomously. Each task is bounded by the interfaces and verified by the [[verification-loop]].

This isn't a one-time handoff — it's a cycle. After each AFK execution, the human reviews the outcome (via tests, not line-reading) and adjusts the plan before the next AFK session.

## Tool Design as Workflow Infrastructure

[[zanie-blue|Zanie Blue]] (Astral) identifies tool output design as a workflow concern, not just a tooling detail. When agents run tools in the AFK phase, the output those tools produce directly affects context consumption. Verbose output from a type checker or package manager floods the context window, degrading subsequent reasoning.

The fix is [[tool-design-for-agents|designing tools for agentic consumption]]: machine-readable output with built-in context reduction, verbose logs persisted to files instead of returned inline, and schemas that let agents request only the data they need. This isn't a nice-to-have — as inference gets faster, tools become the bottleneck.

## Managing Context

Context management is the operational challenge nobody anticipated. The [[smart-zone-dumb-zone]] heuristic describes the problem: LLMs reason best in the first ~100k tokens of context. Beyond that, attention degrades quadratically. The model starts ignoring constraints, hallucinating APIs, and losing track of the design concept.

The fix isn't bigger context windows — it's **ruthless context hygiene**:

- **The Memento Strategy**: Instead of summarizing a long session (which preserves the "vibes" but loses precision), clear the context and start fresh with minimal, high-quality context: the current file, relevant interfaces, and the specific task.
- **Deep modules as context boundaries**: A well-designed deep module is naturally context-complete — the agent needs the interface, not the entire call graph.

[[mario-zechner|Mario Zechner]] designed [[pi]] around this insight. Pi's minimal core (four tools: `read`, `write`, `edit`, `bash`) and session-based model make it easy to reset context and stay in the Smart Zone. The design philosophy — [[malleable-agents|malleability]] — means the agent itself can create new tools mid-session to reduce its own context load.

## Tracer Bullets

Within the Journey phase, [[tracer-bullets]] are the first thing to ship: thin vertical slices that hit every layer of the stack (DB → API → Frontend). They serve three purposes:

1. **Proof of concept**: Validates that the layers fit together before building them out.
2. **Context scaffold**: Gives the agent a concrete end-to-end reference for subsequent tasks.
3. **Design validation**: Tests whether the [[shared-design-concept]] actually works in practice, not just on paper.

## The Day-to-Day Loop

Putting it together:

1. **Design** (HITL): Define the Destination. Articulate the shared design concept. Use `grill-me` or equivalent to stress-test your thinking.
2. **Plan** (HITL): Break the Destination into a Kanban. Each task should be completable within a single Smart Zone session.
3. **Ship a tracer** (AFK): Build the thinnest vertical slice first. Verify it end-to-end.
4. **Execute** (AFK): Work through the Kanban, one task per session. Clear context between tasks.
5. **Review** (HITL): After each task, verify via tests and types. Adjust the plan if needed.
6. **Repeat** from step 4 until the Journey is complete.

## Ronacher's Concrete Practices

[[armin-ronacher|Armin Ronacher]] grounds the workflow in specific tooling and language choices:

- **Go as the workflow language**: Go's test caching means the agent doesn't need to decide which tests to run — the tool handles it. Fast compilation keeps the AFK loop tight. Explicit context passing eliminates the "where does this data come from?" confusion.
- **Makefiles as workflow interfaces**: `make dev`, `make tail-log` — simple, deterministic targets that the agent can invoke without understanding the underlying process manager.
- **Parallelization frontier**: Ronacher identifies shared state (filesystem, databases) as the bottleneck for running multiple agents. Tools like container-use and background agents are early attempts at solving this.
- **Refactor timing**: Don't refactor too early (wastes agent effort) or too late (complexity overwhelms the agent). Extract component libraries when Tailwind classes splinter across 50 files.

## Concepts in this thread

- [[afk-agent]] — Agents that implement features in the background
- [[ai-design-loop]] — Iterating with an agent to refine plans
- [[smart-zone-dumb-zone]] — Managing LLM reasoning quality via context hygiene
- [[tracer-bullets]] — Vertical slices for early end-to-end validation
- [[ubiquitous-language]] — Shared terminology to align human and agent
- [[malleable-agents]] — Agents that can be modified on the fly by users or themselves
- [[verification-loop]] — Automated feedback for each execution step
- [[peak-programmer]] — The shift from manual implementation to high-level design and verification
- [[tool-design-for-agents]] — Tool output design as workflow infrastructure

## Related threads

- [[the-slop-problem]] — What happens when you skip the planning phase
- [[the-human-lever]] — The design authority that underpins the whole workflow

## Sources

- `raw/yt-ai-coding-for-real-engineers.md` — HITL/AFK, tracer bullets, Smart Zone
- `raw/yt-building-pi-in-a-world-of-slop.md` — Context management, malleability, minimalism
- `raw/yt-software-fundamentals-matter-more-than-ever.md` — AI design loop, shared design concept
- `raw/yt-dhh-ai-pilled.md` — DHH on the shift from manual implementation to agentic workflows
- `raw/yt-claude-code-feature-build.md` — Ubiquitous Language, AFK agents (Ralph), PRD to Issues pipeline
- `raw/yt-how-agents-use-dev-tools.md` — Tool design as workflow infrastructure, scale effects, context reduction
- `raw/agentic-coding-recommendations.md` — Go for agents, Makefile interfaces, parallelization, refactor timing

