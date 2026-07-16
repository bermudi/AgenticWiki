---
title: Shared Design Concept
created: 2026-04-25
updated: 2026-07-15
sources:
  - "raw/yt-software-fundamentals-matter-more-than-ever-matt-pocock.md"
  - "Peter Naur, Programming as Theory Building (1985)"
  - raw/yt-understanding-is-the-new-bottleneck-geoffrey-litt-notion.md
unaudited_marginal: 0
tags: ["design", "ai-engineering", "mental-models"]
---

# Shared Design Concept

> The underlying "theory of the code" that both human and AI agent must share to produce coherent work. Without it, each agent session drifts further from the original architecture.

A **Shared Design Concept** is the underlying theory or mental model of how a system works. It is the "why" behind the code.

## The Human-AI Gap

In traditional software engineering, the design concept exists in the heads of the developers. In AI-assisted engineering, this gap is dangerous. 
- If the AI doesn't understand the design concept, it will generate code that violates it.
- If the human loses track of the design concept (by letting the AI drive too much), the codebase becomes a "Frankenstein" of conflicting patterns.

## The "Theory of the Code"
Peter Naur's paper, *"Programming as Theory Building,"* argues that programming isn't just about writing lines of code; it's about building a theory of how the system solves a problem. 

[[matt-pocock|Matt Pocock]] argues that we must be explicit about this theory so the AI can participate in it.

## How to Maintain a Shared Concept

1.  **Documentation as Context**: Maintain files like `README.md`, `ARCH.md`, or a [[ubiquitous-language|glossary]]. The AI reads these and adopts the "theory."
2.  **Explicit Instruction**: Tell the AI *why* you are choosing a certain pattern. 
    - *Instead of:* "Refactor this."
    - *Try:* "Refactor this using a Strategy pattern because we expect to add more payment providers in the future."
3.  **The "Vibe Check"**: If the AI's code feels "wrong" even if it works, it's usually a sign that your shared design concept has diverged. Stop and realign.

## Shared Design Concept vs. Shared Understanding

The shared design concept is the code-level "theory of the code" that a human and agent must share to produce coherent work (Naur, Pocock). [[geoffrey-litt|Geoffrey Litt]]'s [[shared-understanding|shared understanding]] is the team-level counterpart: not one person's theory of the code, but the collective model a whole team needs to communicate and generate ideas together, built through shared spaces. (Mapping Litt onto the shared-design-concept framework is this wiki's synthesis; Litt himself frames it as solo understanding vs. team understanding, not in code-theory terms.)

## Related

- [[ubiquitous-language]] — The textual representation of the shared design concept.
- [[ai-design-loop]] — The process of iterating toward a shared design concept.
- [[grey-box-engineering]] — Owning the design concept while delegating implementation.
- [[verification-loop]] — Proving the implementation matches the shared concept.
- [[aesthetics-is-truth]] — Aesthetics help signal when the shared concept is diverging.
- [[agent-experience]] — AX is high when the agent shares the design concept.
- [[the-human-lever]] — The shared design concept as the core of human design authority.
- [[the-slop-problem]] — Without a shared concept, each agent session drifts from the architecture.
- [[comprehension-debt]] — What happens when the shared design concept erodes: code exists but nobody holds the theory.
- [[matt-pocock]] — Primary advocate for making the design concept explicit in AI workflows.
- [[vibes-based-engineering]] — Specs-to-code bypasses building a shared design concept; the user never develops a theory of the code.
- [[agent-evals]] — Evals operationalize the shared design concept: "design so quality is measurable" means the quality criteria are part of the shared concept
- [[agent-quality-engineering]] — The quality engineering thread treats the shared design concept as infrastructure: quality must be designed in from day one
- [[shared-understanding]] — The team-level model that the shared design concept supports
- [[geoffrey-litt]] — Distinguishes code-level theory from team-level shared understanding

## Thread
- [[the-human-lever]] — The shared design concept as the core of human design authority
- [[the-slop-problem]] — Without a shared concept, each agent session drifts from the architecture
- [[the-agent-workflow]] — The design concept must be explicit for the agent to participate in it
- [[intent-to-code]] — The shared design concept is what erodes in the specs-to-code position; each recompilation drifts further

## Sources
- `raw/yt-software-fundamentals-matter-more-than-ever-matt-pocock.md` — Matt Pocock on making the design concept explicit for AI agents; Grill Me skill as the mechanism for building shared understanding
- Peter Naur, *Programming as Theory Building* (1985) — The theoretical origin: programming as building a shared theory of the system
- `raw/yt-understanding-is-the-new-bottleneck-geoffrey-litt-notion.md` — Geoffrey Litt: shared understanding as the team-level counterpart to the shared design concept; shared spaces as the infrastructure for building collective understanding.
