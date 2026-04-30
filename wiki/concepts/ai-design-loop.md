---
title: AI Design Loop
created: 2026-04-24
updated: 2026-04-29
sources: ["raw/yt-ai-coding-for-real-engineers.md", "raw/yt-claude-code-feature-build.md"]
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

## The Grill-Me Session in Practice

[[matt-pocock|Matt Pocock]] demonstrates the "Destination" phase as a structured Q&A session using a `grill-me` skill. The mechanics:

1. **Human dictates rough ideas**: No polish needed — woolly, half-formed requirements are fine. The human explains both the *what* and the *why* (the why is critical — without it, the agent can't suggest alternatives).
2. **Agent explores the codebase**: Uses subagents to read schemas, services, and tests. The parent agent receives only a summary — token-efficient exploration.
3. **Agent asks precise questions**: Challenges framing ("the code already handles this — is the gap in the UI?"), forces binary choices ("option A or B?"), and surfaces edge cases ("what happens when all real lessons are deleted?").
4. **Human drives or agent drives**: The skill is flexible — sometimes the agent leads with questions, sometimes the human directs with specific decisions.
5. **Convergence on 8 bullet points**: After ~22 minutes of Q&A, the session converges to a concise scope document. The hard part is extracting ideas from the human brain; the LLM does the synthesis.

The session produces not just requirements, but also updates the [[ubiquitous-language]] with new terms — ensuring the vocabulary for implementation is agreed before any code is written.

## Thread
- [[the-agent-workflow]] — The design loop as the planning phase of the agent workflow
- [[the-slop-problem]] — Skipping the design loop is a primary source of slop

## Related
- [[grey-box-engineering]] — The implementation phase of the loop.
- [[smart-zone-dumb-zone]] — Managing the technical limits of the loop.
- [[tracer-bullets]] — The first "Journey" step for any new feature.
- [[verification-loop]] — The iterative process of refining the journey.
- [[vibes-based-engineering]] — Why a structured loop is necessary.
- [[shared-design-concept]] — The design loop produces the shared concept.
- [[ubiquitous-language]] — The language that emerges from the design loop.
- [[malleable-agents]] — Agents can be adapted during the design loop.
- [[improve-codebase-architecture]] — The skill that applies the design loop to architecture: explore, grill, propose.

## Sources
- `raw/yt-ai-coding-for-real-engineers.md`
