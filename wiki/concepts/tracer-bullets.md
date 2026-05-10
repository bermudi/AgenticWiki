---
title: Tracer Bullets
created: 2026-04-25
updated: 2026-04-26
sources: ["raw/yt-ai-coding-for-real-engineers.md", "raw/yt-building-pi-in-a-world-of-slop.md"]
tags: ["software-architecture", "agile", "ai-workflow"]
---

# Tracer Bullets

> Building thin vertical slices of functionality that cross all layers of a system to get immediate end-to-end feedback.

## Body

A term popularized by *The Pragmatic Programmer* and championed by [[matt-pocock]] in the context of AI Engineering. Unlike a "Layered" approach—where one might build the Database schema, then the API, then the UI—**Tracer Bullets** involve building the minimum path from the UI to the DB and back for a single feature.

### Benefits in AI Engineering
- **Early Integration**: Discovering that the DB schema doesn't support the UI requirement in hour 1 rather than week 3.
- **Agent Focus**: Agents perform better when given a specific "vertical" goal (e.g., "Make the user profile update work end-to-end") rather than a "horizontal" goal (e.g., "Write all the API endpoints").
- **Concrete Feedback**: Providing a working (if minimal) feature allows the human to verify the "Shared Design Concept" early.

## Thread
- [[the-agent-workflow]] — Tracer bullets as the first thing to ship in the Journey phase

## Related

- [[grey-box-engineering]] — Using vertical slices to validate human designs.
- [[verification-loop]] — Tracer bullets are verified within the loop.
- [[ai-design-loop]] — The first "Journey" step after the design loop completes.
- [[agent-quality-loop]] — Tracer bullet results feed back into eval design and quality metrics.
- [[matt-pocock]] — Primary advocate in the AI engineering context.

## Sources

- `raw/yt-ai-coding-for-real-engineers.md`
- `raw/yt-building-pi-in-a-world-of-slop.md`
