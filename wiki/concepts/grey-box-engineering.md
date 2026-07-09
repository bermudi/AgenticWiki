---
title: Grey Box Engineering
created: 2026-04-24
updated: 2026-05-09
sources: ["raw/yt-ai-coding-for-real-engineers.md", "raw/yt-software-fundamentals-matter-more-than-ever-matt-pocock.md"]
unaudited_marginal: 0
tags: ["software-design", "ai-workflow"]
---

# Grey Box Engineering

> A middle-ground approach to working with AI agents that balances human design authority with agentic implementation speed.

## The Core Philosophy
In Grey Box Engineering, the human engineer owns the **Interface** and the **Plan**, while the AI agent owns the **Implementation**.

### 1. Human Design Authority (The Interface)
The human defines the "Deep Interface"—the types, the function signatures, and the public-facing API. By focusing on the interface, the human ensures the system remains navigable and maintainable.

### 2. Agentic Implementation (The Box)
The agent fills in the implementation details. Because the human has defined the boundaries (Types/Tests), the agent is constrained to produce code that fits the overall design.

### 3. Verification over Trust
You don't trust the agent's code; you trust the **[[verification-loop]]**.
- **Types**: Catch static errors.
- **Tests**: Catch logic errors (Red-Green-Refactor).
- **Tracer Bullets**: Catch integration errors.

> [!warning] Contradiction
> [[compounding-booboos|Compounding Booboos]] advocates treating agent code with "the same (or more) scrutiny as human-written code" — implying line-by-line human review. Grey Box Engineering argues the opposite: humans review interfaces and outputs, not implementation lines. Both agree on *rigor*; the disagreement is on *mechanism* — Grey Box delegates line-level scrutiny to the automated verification loop.

## Design the Interface, Delegate the Implementation
[[matt-pocock|Matt Pocock]] distills grey box engineering into a single instruction: **design the interface, delegate the implementation**. The human designs the narrow boundary of a [[deep-vs-shallow-modules|deep module]]; the agent fills in the internals. This has a brain-saving benefit: you can treat module internals as grey boxes — reviewing the interface design but not reading every line of implementation. "I'll let you handle what's inside the big blob. I'm just going to test from the outside and verify it."

This is only safe when the interface is testable. The [[verification-loop]] must be strong enough to catch implementation errors at the boundary, so the human doesn't need to look inside.

## The HITL/AFK Loop
- **Human-In-The-Loop (HITL)**: Used during the planning phase to reach a "Shared Design Concept."
- **Away-From-Keyboard (AFK)**: Once the plan is granular enough, the agent can execute the "Grey Box" implementation autonomously. This approach avoids [[vibes-based-engineering]] by providing a rigorous framework for delegation.

## Thread
- [[the-human-lever]] — Grey box engineering as the core discipline of the human shift
- [[the-agent-workflow]] — Operationalizing the HITL/AFK handoff
- [[intent-to-code]] — Both plan-as-contract and alignment-first are expressions of grey box engineering, applied differently

## Related

- [[smart-zone-dumb-zone]] — Keeping the context small to maintain reasoning quality.
- [[tracer-bullets]] — Vertical slices to verify Grey Box designs.
- [[deep-vs-shallow-modules]] — Deep modules are the ideal targets for Grey Box delegation.
- [[verification-loop]] — The mechanical process of validating the implementation.
- [[vibes-based-engineering]] — The anti-pattern that Grey Box engineering seeks to avoid.
- [[code-intelligence]] — Enables high-fidelity context for grey box verification.
- [[compounding-booboos]] — Grey box engineering catches booboos before they compound.
- [[shared-design-concept]] — The human owns the concept; the agent implements it.
- [[slop]] — Grey box engineering is the primary alternative to slop generation.
- [[ai-design-loop]] — The design loop feeds into grey box delegation.
- [[strategic-vs-tactical-programming]] — Grey box engineering is strategic programming in practice.
- [[ubiquitous-language]] — The language defines the boundaries of the grey box.
- [[locality-and-leverage]] — The grey box boundary should maximize leverage (simple interface) and locality (contained implementation).
- [[seams-and-adapters]] — The seam is the grey box boundary; adapters fill the box.
- [[improve-codebase-architecture]] — The skill that identifies where grey box boundaries should be drawn.
- [[pi]] — Pi's observability enables grey box engineering in practice.
- [[mario-zechner]] — Creator of pi, advocate for grey box engineering.
- [[comprehension-debt]] — Grey box requires holding architecture in your head; comprehension debt is what happens when you stop.
- [[matt-pocock]] — Originator: human owns the interface, agent owns the implementation; the general/sergeant metaphor.
- [[plan-vs-review]] — Planning defines the grey box boundary; review inspects the contents.
- [[geoffrey-huntley]] — "Backpressure beats direction" extends grey-box engineering from interface design to environmental design
- [[agent-quality-engineering]] — The quality framework (evals + observability + flywheel) is how you maintain the grey-box model at scale: aggregate quality metrics tell you where to look
- [[agentic-engineering]] — Karpathy's professional discipline that formalizes the grey-box handoff between human design authority and agent implementation

## Sources
- `raw/yt-ai-coding-for-real-engineers.md`
- `raw/yt-software-fundamentals-matter-more-than-ever-matt-pocock.md` — "Design the interface, delegate the implementation" as the distillation of grey box engineering; treating module internals as grey boxes to save cognitive load.
