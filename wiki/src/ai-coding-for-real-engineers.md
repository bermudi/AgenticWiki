---
title: AI Coding For Real Engineers
created: 2026-04-25
updated: 2026-04-25
sources: ["raw/yt-ai-coding-for-real-engineers.md"]
tags: ["ai-engineering", "software-design", "productivity"]
---

# AI Coding For Real Engineers

> A talk by [[matt-pocock]] on moving beyond "Vibe Coding" toward structured, predictable engineering workflows with AI agents.

## Body

### The Smart Zone vs. The Dumb Zone
Pocock argues that while context windows are growing, the "Smart Zone" remains relatively small (approx. 100k tokens). As the window fills, the LLM's ability to maintain high-quality reasoning degrades because attention relationships scale quadratically.
- **Dumb Zone**: When the model starts ignoring instructions, losing track of imports, or hallucinating APIs.
- **The Memento Strategy**: Instead of "compacting" (summarizing) history, which causes "Doc Rot," engineers should "clear" context—starting a fresh session with only the minimal, necessary high-quality context.

### Planning: HITL vs. AFK
The developer should own the planning stack.
- **Human-In-The-Loop (HITL)**: Used for high-stakes design decisions. Tools like `grill-me` force the human to articulate the "Destination" (the PRD) clearly.
- **Away-From-Keyboard (AFK)**: Once the "Journey" (a granular plan/Kanban board) is established, agents can execute tasks autonomously.

### Tracer Bullets and Vertical Slices
Following the principle from *The Pragmatic Programmer*, Pocock advocates for building "Tracer Bullets"—thin vertical slices of functionality that hit every layer of the stack (DB, API, Frontend). This provides immediate proof-of-concept and prevents building layers that don't fit together later.

### Engineering Fundamentals
- **Deep Modules**: Preferring modules with simple interfaces and complex internals. This reduces the surface area an agent has to understand.
- **TDD for Agents**: Agents perform best when there is a clear "definition of done." Tests and type systems provide the automated feedback loops necessary to prevent "slop."

## Thread
- [[the-agent-workflow]] — The design loop as the planning phase of the agent workflow

## Related

- [[grey-box-engineering]] — The core philosophy of balancing human design with agentic execution.
- [[deep-vs-shallow-modules]] — How module depth affects agent navigation.
- [[ai-design-loop]] — The iterative process of refining plans with agents.
- [[tracer-bullets]] — A strategy for early integration.

## Sources

- `raw/yt-ai-coding-for-real-engineers.md` — Key takeaways from Matt Pocock's talk.
