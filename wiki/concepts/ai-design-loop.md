---
title: AI Design Loop
created: 2026-04-24
updated: 2026-04-25
sources: ["raw/yt-ai-coding-for-real-engineers.md"]
tags: ["ai-workflow", "software-design"]
---

# The AI Design Loop

> The process of iterating with an agent to reach a shared understanding before delegating implementation.

## The Strategy: Destination and Journey
Matt Pocock defines the design process in two phases:

1.  **The Destination (The PRD)**: Defining *what* we are building. This is a high-stakes, human-led activity. Use tools like `grill-me` to ensure the "Shared Design Concept" is solid.
2.  **The Journey (The Kanban/Issues)**: Breaking the Destination into granular, actionable steps. Each step should be small enough to stay in the [[smart-zone-dumb-zone]].

## Breaking the "Vibe Coding" Cycle
[[vibes-based-engineering|Vibe Coding]] (prompting without a plan) leads to the "Dumb Zone" as the agent's context fills with messy iterations. To break this:

- **HITL Planning**: Be Human-In-The-Loop during the Destination and Journey phases.
- **AFK Execution**: Once the Journey is clear, let the agent work Away-From-Keyboard.
- **Clearing Context**: Instead of compacting history (which leads to "Doc Rot"), clear the session and restart with the PRD and the current Kanban task.

## Thread
- [[the-agent-workflow]] — The design loop as the planning phase of the agent workflow

## Related
- [[grey-box-engineering]] — The implementation phase of the loop.
- [[smart-zone-dumb-zone]] — Managing the technical limits of the loop.
- [[tracer-bullets]] — The first "Journey" step for any new feature.
- [[verification-loop]] — The iterative process of refining the journey.
- [[vibes-based-engineering]] — Why a structured loop is necessary.

## Sources
- [[software-fundamentals-matter-more-than-ever]]
- [[ai-coding-for-real-engineers]]
