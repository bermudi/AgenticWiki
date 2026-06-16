---
title: Babysitter Agent
created: 2026-06-05
updated: 2026-06-16
sources:
  - raw/yt-systems-building-systems.md
tags: [concept, agentic-engineering, persistence, context-management]
unaudited_marginal: 0
---

# Babysitter Agent

> An agent that runs alongside a master orchestrator, **invisible to it**, silently managing its context — writing perfect launch prompts for new sessions so work flows seamlessly from session to session. Proposed by [[eero-alvar|Eero Alvar]] as a solution to the agent persistence problem. The babysitter acts as the agent's **subconscious mind**.

## The Design

The babysitter agent operates in parallel with the master orchestrator but remains invisible to it. Its job:

1. **Monitor** the master agent's session and context state
2. **Craft** optimal launch prompts for new sessions when context limits approach
3. **Ensure continuity** — the master agent's work flows seamlessly across session boundaries without the master needing to think about context management

The key insight: ideally, the agent orchestrating a software build shouldn't have to think about its own context management. It has enough to juggle. The babysitter handles persistence as background infrastructure.

## Why Invisible?

Making the babysitter visible to the master agent would defeat the purpose — the master agent already has enough to juggle orchestrating the build. By keeping it invisible, the master agent operates as if it has infinite context, and the babysitter handles the seams. This follows from Eero's observation that "ideally, this shouldn't be something the agent has to think about" (about context management).

## Alternative Approaches

Eero Alvar built and tested a new session tool, and also considered a compact tool, before proposing the babysitter:

### New Session Tool
A tool the agent calls to end its session and start a new one. Eero built a basic version and found: the agent accumulates markdown files it never cleans up, reads the same files repeatedly, and spends most of each session reorienting. "A ton of time and tokens just spent on reorienting itself to the new session, and can't really get much done."

### Compact Tool
In-session compaction to extend a single session indefinitely. Eero describes compaction as "pretty ass" — the agent has less control over what survives compression. No specific test is mentioned, but the approach is dismissed as inferior.

Both alternatives share a flaw: they make the agent responsible for its own context management, adding to its cognitive burden.

## Open Questions

- How does the babysitter know what's important to preserve vs. what can be dropped?
- Can the babysitter's prompt-crafting be tuned, or does it introduce its own [[aiming-problem|aiming problem]]?
- Does the babysitter need its own babysitter? (Recursive persistence problem)

## Thread

- [[the-agent-workflow]] — The babysitter addresses the workflow's session boundary problem — the gap between what the agent can do in one session and what the task requires
- [[agentic-engineering]] — The babysitter is a proposed infrastructure component for professional-grade agentic systems
- [[the-human-lever]] — Invisible context management frees the human from session-level concerns

## Related

- [[software-factory]] — The babysitter is a persistence mechanism for the software factory architecture
- [[context-engineering]] — The babysitter's prompt-crafting is context engineering applied to session transitions
- [[ralph-loop]] — The Ralph Loop's fresh-context-per-iteration is a simpler alternative: instead of seamless transitions, accept the reorientation cost per iteration
- [[smart-zone-dumb-zone]] — The babysitter aims to keep the master agent in the Smart Zone by managing context size
- [[evolving-context]] — The babysitter's handoff prompts are a form of evolving context — what survives across sessions
- [[self-harness]] — The babysitter manages the agent's context; Self-Harness manages the agent's harness — the same invisible-maintenance pattern at different layers

## Sources

- `raw/yt-systems-building-systems.md` — Eero Alvar: the babysitter agent concept, invisible context management, "subconscious mind" framing, comparison with new session and compact tools
