---
title: Strategic vs. Tactical Programming
created: 2026-04-25
updated: 2026-04-25
sources: []
tags: ["software-design", "ai-engineering", "strategy"]
---

# Strategic vs. Tactical Programming

A distinction popularized by **John Ousterhout** in *A Philosophy of Software Design* and central to **Matt Pocock's** argument for modern engineering.

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

## The Shift
Matt Pocock argues that to succeed with AI, you must spend **more time being strategic**. 
- You do the "deep thinking" (designing interfaces, choosing patterns).
- You delegate the "shallow work" (implementing the logic inside those interfaces) to the AI.

> "The more code the AI writes, the more your design decisions matter."

## Related

- [[the-human-lever]] — The thread where strategic programming is framed as the human's primary job.
- [[grey-box-engineering]] — Strategic programming in practice: owning interfaces, delegating implementation.
- [[deep-vs-shallow-modules]] — A key pattern for strategic design.
- [[peak-programmer]] — Peak Programmer marks the commoditization of tactical programming.
- [[vibes-based-engineering]] — The extreme end of tactical programming.
- [[martin-fowler]] — Advocate for strategic design throughout his career.

## Thread
- [[the-human-lever]] — Strategic programming as the human's primary job in the age of AI

---
**Source**: [[software-fundamentals-matter-more-than-ever|Software Fundamentals Matter More Than Ever]] (Matt Pocock)
**Origin**: John Ousterhout, *A Philosophy of Software Design*
