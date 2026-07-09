---
title: Strategic vs. Tactical Programming
created: 2026-04-25
updated: 2026-05-03
sources: ["raw/yt-software-fundamentals-matter-more-than-ever-matt-pocock.md", "raw/yt-how-to-de-slop-a-codebase-ruined-by-ai-with-one-skill.md", "John Ousterhout, *A Philosophy of Software Design*", "raw/yt-the-comprehension-debt-trap-every-ai-dev-falls-into.md"]
unaudited_marginal: 0
tags: ["software-design", "ai-engineering", "strategy"]
---

# Strategic vs. Tactical Programming

> A distinction from Ousterhout's *A Philosophy of Software Design*, central to the AI era: the human must be the strategist (designing interfaces, choosing patterns) while the AI acts as the ultimate tactician (implementing exactly what's asked, whether or not it's good for the system).

A distinction popularized by **John Ousterhout** in *A Philosophy of Software Design* and central to [[matt-pocock|Matt Pocock]]'s argument for modern engineering.

## Tactical Programming
Tactical programming is focused solely on the immediate task. The goal is to get something working as quickly as possible.
- **Short-term**: Fix the bug, ship the feature.
- **Result**: Complexity accumulates. Each tactical decision adds a small amount of "cruft" that eventually makes the system unmanageable.
- **AI Relation**: LLMs are naturally the ultimate tactical programmers. They will give you exactly what you ask for, even if it's a disaster for your future self. This tendency often leads to [[vibes-based-engineering]].

## Strategic Programming
Strategic programming prioritizes the long-term health and modularity of the system. The primary goal is not just to "make it work," but to "design it well."
- **Long-term**: Focus on clear interfaces, information hiding, and consistency.
- **Result**: A codebase that remains easy to change even as it grows.
- **Human Relation**: This is the human's primary job in the age of AI. You are the Architect/Strategist; the AI is the Builder/Tactician.

## The General and the Sergeant

[[matt-pocock|Matt Pocock]] uses a military metaphor to make the distinction vivid:

> "I think of agents as really, really good tactical programmers. They're able to get on the ground and make changes quickly, but they need someone on the level above them who is the strategic programmer."

- **The General (Human)**: Scans the terrain, decides which battles to fight, owns the strategy. Runs the [[improve-codebase-architecture]] skill to identify architectural weaknesses, then makes judgment calls about which to fix and how.
- **The Sergeant (AI)**: Executes tactical orders. Given a clear interface, implements the module. Given a GitHub issue, ships the fix. Fast, precise, but needs direction.

The [[grey-box-engineering|grey box]] boundary is where the general hands off to the sergeant.

## The Shift
[[matt-pocock|Matt Pocock]] argues that to succeed with AI, you must spend **more time being strategic**. 
- You do the "deep thinking" (designing interfaces, choosing patterns).
- You delegate the "shallow work" (implementing the logic inside those interfaces) to the AI.

Pocock's core message: "code is not cheap" — bad code is the most expensive it's ever been because it blocks AI's ability to help. The more code the AI writes, the more consequential each design decision becomes.

[[matt-pocock|Pocock]] frames this as a direct rebuttal to the "specs-to-code" movement — the idea that you write a spec, compile it with AI, and never look at the code. Each recompilation of the spec produces worse code (software entropy in action), and the human divests from design rather than investing in it. The counter-principle comes from [[kent-beck|Kent Beck]]: **"Invest in the design of the system every day.**" Specs-to-code divests from design; strategic programming invests in it.

## Related

- [[the-human-lever]] — The thread where strategic programming is framed as the human's primary job.
- [[grey-box-engineering]] — Strategic programming in practice: owning interfaces, delegating implementation.
- [[deep-vs-shallow-modules]] — A key pattern for strategic design.
- [[peak-programmer]] — Peak Programmer marks the commoditization of tactical programming.
- [[vibes-based-engineering]] — The extreme end of tactical programming.
- [[martin-fowler]] — Advocate for strategic design throughout his career.
- [[the-slop-problem]] — Tactical programming produces slop.
- [[verification-loop]] — Strategic programming requires verification to prove design intent.
- [[improve-codebase-architecture]] — The skill that operationalizes strategic programming as a recurring practice.
- [[locality-and-leverage]] — What the strategist optimizes for when designing module boundaries.
- [[comprehension-debt]] — The cost of going all-tactical: you ship fast but stop understanding what you ship.

## Thread
- [[the-human-lever]] — Strategic programming as the human's primary job in the age of AI

## Sources
- `raw/yt-software-fundamentals-matter-more-than-ever-matt-pocock.md` — Matt Pocock applying Ousterhout's strategic/tactical distinction to AI workflows; code is not cheap thesis; Kent Beck's "invest in design every day"; specs-to-code as divestment from design
- `raw/yt-how-to-de-slop-a-codebase-ruined-by-ai-with-one-skill.md` — The general/sergeant metaphor and strategic architecture review as a recurring practice.
- John Ousterhout, *A Philosophy of Software Design* — The original strategic vs. tactical programming framework
- `raw/yt-the-comprehension-debt-trap-every-ai-dev-falls-into.md` — Comprehension debt as the long-term cost of going all-tactical: shipping fast without understanding
