---
title: Locality and Leverage
created: 2026-04-29
updated: 2026-04-29
sources:
  - raw/How To De-Slop A Codebase Ruined By AI (with one skill) - youtube.com.md
tags: [software-architecture, ai-engineering, module-design]
---

# Locality and Leverage

> The two payoff properties of deep modules: locality concentrates changes in one place (benefiting maintainers), and leverage maximizes capability per unit of interface the caller must learn (benefiting users). Together they are what you optimize for when deepening a codebase.

## Locality

**Locality** means that changes to a module's behavior, bug fixes, and enhancements are concentrated in a single place. High locality = you don't need to touch 12 files to change one thing.

- In a well-designed module, all code that changes together lives together.
- In a sloppy codebase (low locality), related logic is scattered across the codebase. Changing a validation rule requires touching the frontend, the backend, the tests, and a utility file — all in parallel.
- Locality benefits the **maintainers** of the module.

[[matt-pocock|Matt Pocock]]'s example from his course-video-manager: an "interleaved clip section ordering rule" had two parallel implementations with no shared seam. Refactoring into a single module gives locality — the rule lives in one place.

## Leverage

**Leverage** is the amount of behavior a caller can exercise per unit of interface they have to learn. High leverage = a small API surface unlocks a large amount of functionality.

- [[deep-vs-shallow-modules|Deep modules]] have high leverage: simple interface, complex implementation.
- Shallow modules have low leverage: you learn a lot of interface but get little behavior in return.
- Leverage benefits the **users** (callers) of the module.

Open-source libraries like TanStack Query exemplify high leverage: a few hooks unlock sophisticated caching, refetching, and state management. The caller doesn't need to understand the internals.

## Why It Matters for AI

When running an [[improve-codebase-architecture]] scan, locality and leverage are the two evaluation criteria for every deepening candidate:

1. **Does this change increase locality?** Will related code be closer together?
2. **Does this change increase leverage?** Will callers get more for less interface?

These criteria keep the human's judgment focused during the grilling phase. Instead of subjective "is this better?", you ask "does this concentrate changes?" and "does this reduce what callers need to know?"

## Thread

- [[the-human-lever]] — Locality and leverage are what the human optimizes for when owning design boundaries.
- [[the-slop-problem]] — Low locality and low leverage are structural symptoms of a sloppy codebase.
- [[the-agent-workflow]] — Architecture review evaluates deepening candidates by these two criteria.

## Related

- [[deep-vs-shallow-modules]] — Deep modules have high locality and high leverage by definition.
- [[seams-and-adapters]] — Good seams enable high locality; adapters enable high leverage through polymorphism.
- [[grey-box-engineering]] — The grey box boundary should maximize leverage for the human (simple interface) and locality for the agent (contained implementation).
- [[improve-codebase-architecture]] — The skill that evaluates candidates by these two criteria.
- [[strategic-vs-tactical-programming]] — Strategic programming prioritizes locality and leverage; tactical programming ignores them.

## Sources

- `raw/How To De-Slop A Codebase Ruined By AI (with one skill) - youtube.com.md` — Locality and leverage defined as the two payoff properties of deep modules.
