---
title: Tracer Bullets
created: 2026-04-25
updated: 2026-07-14
sources: ["raw/yt-ai-coding-for-real-engineers.md", "raw/yt-building-pi-in-a-world-of-slop.md", "raw/yt-building-great-agent-skills-the-missing-manual.md"]
unaudited_marginal: 0
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

"Vertical slice" is also [[matt-pocock|Pocock]]'s canonical example of a [[leading-words|leading word]] — the phrase is dense (it triggers the model's prior on vertical-slice development), it gets repeated throughout a skill, and the agent echoes it in its reasoning traces ("we're going to do this as a thin vertical slice"), which is what shapes behavior. The technique (build thin end-to-end) and the leading word (the phrase that triggers the technique) are the same artifact viewed from two angles.

## Thread
- [[the-agent-workflow]] — Tracer bullets as the first thing to ship in the Journey phase

## Related

- [[grey-box-engineering]] — Using vertical slices to validate human designs.
- [[verification-loop]] — Tracer bullets are verified within the loop.
- [[deepswe]] — First-test-step telemetry shows early end-to-end feedback is the strongest pass/fail correlate across 98 contrast tasks
- [[ai-design-loop]] — The first "Journey" step after the design loop completes.
- [[agent-quality-loop]] — Tracer bullet results feed back into eval design and quality metrics.
- [[matt-pocock]] — Primary advocate in the AI engineering context.
- [[leading-words]] — "Vertical slice" is the canonical leading word; the technique and the phrase are inseparable in Pocock's skill-design framework

## Sources

- `raw/yt-ai-coding-for-real-engineers.md`
- `raw/yt-building-pi-in-a-world-of-slop.md`
- `raw/yt-building-great-agent-skills-the-missing-manual.md` — "Vertical slice" as the canonical leading word; the phrase triggers the model's prior on vertical-slice development and is echoed in reasoning traces, which is the verification signal that the leading word took
