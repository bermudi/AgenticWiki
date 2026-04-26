---
title: Shared Design Concept
created: 2026-04-25
updated: 2026-04-25
sources: []
tags: ["design", "ai-engineering", "mental-models"]
---

# Shared Design Concept

A **Shared Design Concept** is the underlying theory or mental model of how a system works. It is the "why" behind the code.

## The Human-AI Gap

In traditional software engineering, the design concept exists in the heads of the developers. In AI-assisted engineering, this gap is dangerous. 
- If the AI doesn't understand the design concept, it will generate code that violates it.
- If the human loses track of the design concept (by letting the AI drive too much), the codebase becomes a "Frankenstein" of conflicting patterns.

## The "Theory of the Code"
Peter Naur's paper, *"Programming as Theory Building,"* argues that programming isn't just about writing lines of code; it's about building a theory of how the system solves a problem. 

**Matt Pocock** argues that we must be explicit about this theory so the AI can participate in it.

## How to Maintain a Shared Concept

1.  **Documentation as Context**: Maintain files like `README.md`, `ARCH.md`, or a [[ubiquitous-language|glossary]]. The AI reads these and adopts the "theory."
2.  **Explicit Instruction**: Tell the AI *why* you are choosing a certain pattern. 
    - *Instead of:* "Refactor this."
    - *Try:* "Refactor this using a Strategy pattern because we expect to add more payment providers in the future."
3.  **The "Vibe Check"**: If the AI's code feels "wrong" even if it works, it's usually a sign that your shared design concept has diverged. Stop and realign.

## Related

- [[ubiquitous-language]] — The textual representation of the shared design concept.
- [[ai-design-loop]] — The process of iterating toward a shared design concept.
- [[grey-box-engineering]] — Owning the design concept while delegating implementation.
- [[verification-loop]] — Proving the implementation matches the shared concept.
- [[aesthetics-is-truth]] — Aesthetics help signal when the shared concept is diverging.
- [[agent-experience]] — AX is high when the agent shares the design concept.

## Thread
- [[the-human-lever]] — The shared design concept as the core of human design authority
- [[the-slop-problem]] — Without a shared concept, each agent session drifts from the architecture
- [[the-agent-workflow]] — The design concept must be explicit for the agent to participate in it

---
**Source**: [[software-fundamentals-matter-more-than-ever|Software Fundamentals Matter More Than Ever]] (Matt Pocock)
**Reference**: Peter Naur, *Programming as Theory Building* (1985)
