---
title: Lars Faye
created: 2026-06-03
updated: 2026-06-03
sources:
  - raw/agentic-coding-is-a-trap.md
tags: [author, ai-engineering, cognitive-debt]
unaudited_marginal: 0
---

# Lars Faye

> Software developer and writer at larsfaye.com. Author of "Agentic Coding is a Trap" — one of the most cited articulations of [[cognitive-debt]] and the [[supervision-paradox]]. Advocates for demoting AI to a secondary role in development, using it for planning and research while staying actively engaged in implementation.

## Key Contributions

Faye's central argument: agentic coding creates a self-reinforcing loop where the skills needed to supervise agents erode through the very act of using them. His framing of "cognitive debt" — as distinct from technical debt and [[comprehension-debt]] — has become a reference point in the discourse.

His proposed workflow inverts the "orchestration" model:
- Use LLMs for specs and planning, but **facilitate implementation yourself**
- Write pseudo-code to close the gap between request and generated output
- Never generate more than you can review in a sitting
- Never ask an agent to implement something you couldn't do yourself

His Star Trek analogy: "Use them like the Ship's Computer, not Data."

## Related

- [[cognitive-debt]] — The concept Faye introduced
- [[supervision-paradox]] — The structural contradiction Faye identified from Anthropic's research
- [[the-cognitive-cost]] — The thread his article anchors
- [[theo-t3gg]] — Theo's video response to Faye's article

## Sources

- `raw/agentic-coding-is-a-trap.md` — "Agentic Coding is a Trap" (April 2026); the primary source for cognitive debt, the supervision paradox, and the "demote AI" workflow
