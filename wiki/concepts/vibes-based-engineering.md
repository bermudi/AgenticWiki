---
title: Vibes-Based Engineering
created: 2026-04-25
updated: 2026-05-05
sources:
  - raw/yt-no-vibes-allowed-dex-horthy.md
  - raw/2604.15597v1.pdf
  - raw/The Comprehension Debt Trap Every AI Dev Falls Into - youtube.com.md
  - raw/Software Fundamentals Matter More Than Ever — Matt Pocock - youtube.com.md
  - "raw/Full Walkthrough Workflow for AI Coding — Matt Pocock - youtube.com.md"
tags: ["anti-pattern", "ai-engineering", "heuristics"]
---

# Vibes-Based Engineering

> An engineering anti-pattern where an LLM's output is accepted based on a superficial sense of correctness ("it looks right") rather than rigorous verification and deep context.

## Characteristics

- **Shallow Prompting**: Providing minimal context and hoping the LLM "gets it."
- **Lack of Verification**: Not running tests or static analysis to confirm the AI's output works as intended.
- **Trial and Error**: Repeatedly asking the AI to "try again" without providing more information or structure.
- **Trust over Evidence**: Relying on the fluency of the LLM rather than the correctness of the code.
- **Single-Step Myopia**: Judging each agent output in isolation without considering how errors compound over a long workflow. [[philippe-laban|Laban]] et al. (2026) show that even when every individual interaction *looks* correct, documents can silently lose 25–50% of their semantic content over 20 interactions.
- **Specs-to-Code**: A variant where the user writes a specification, compiles it to code with AI, and avoids looking at the code. When something breaks, they modify the spec and recompile. [[matt-pocock|Matt Pocock]] identifies this as "vibe coding by another name" — each recompilation produces worse code (software entropy), and the user never builds a [[shared-design-concept]] for the system.

## The Alternative: "No Vibes"

Proposed by [[dex-horthy]], the "No Vibes" approach replaces guesswork with:
1. **High-Fidelity Context**: Using [[code-intelligence]] to feed the LLM accurate symbol information.
2. **Deterministic Verification**: Building a [[verification-loop]] into the AI workflow.
3. **Structured Reasoning**: Forcing the AI (and the human) to reason about the system's architecture before writing code.

## Thread
- [[the-slop-problem]] — Vibes-based engineering as the root cause of slop
- [[the-human-lever]] — The human lever is what replaces vibes with design authority and verification
- [[tool-design-for-agents]] — Absence of structured tool feedback enables vibes-based acceptance of outputs
- [[intent-to-code]] — Specs-to-code occupies one position on the intent-to-code axis; plan-heavy and alignment-first are the structured alternatives

## Related

- [[slop]] — Vibes-based engineering often leads to the generation of "slop."
- [[grey-box-engineering]] — The rigorous alternative that emphasizes the [[verification-loop]].
- [[strategic-vs-tactical-programming]] — Vibes-based engineering is the extreme end of tactical programming.
- [[peak-programmer]] — The era that incentivizes the speed of vibes over the rigor of engineering.
- [[aesthetics-is-truth]] — Often confused with vibes, but represents a more disciplined, experience-driven intuition.
- [[verification-loop]] — The loop that replaces vibes with proof.
- [[code-intelligence]] — High-fidelity context as the antidote to vibes.
- [[compounding-booboos]] — Vibe coding lets booboos slip through unchecked.
- [[dex-horthy]] — The primary critic of vibes-based engineering.
- [[cody]] — Designed to counter vibes with real codebase context.
- [[agent-evals]] — Evals are the structural antidote to shipping agents on vibes: "looks right to me" vs "score 0.83, here's what failed"
- [[agent-quality-engineering]] — The quality framework that replaces vibes with measurement
- [[ai-design-loop]] — The structured alternative to vibe coding.
- [[deliberate-friction]] — Absence of deliberate friction enables vibes-based engineering.
- [[delegate-52]] — Evidence that "looks correct per step" fails catastrophically over time
- [[document-degradation]] — Silent corruption invisible to vibe-checking
- [[critical-failure]] — Rare severe errors that pass vibe checks until it's too late
- [[jagged-frontier]] — Generalizing capabilities across domains is a vibes failure mode
- [[comprehension-debt]] — The cognitive cost of vibes-based engineering: delegation mode scores below 40% on comprehension
- [[matt-pocock]] — Specs-to-code as vibe coding by another name; each recompilation degrades code quality. Note: Pocock's critique is specific to specs-as-compilation-target, not planning in general — his own workflow produces a PRD.
- [[plan-vs-review]] — Review-heavy without structure is vibes-based engineering; plan-heavy is the structured alternative.

> [!note] Departure: Specs-to-Code ≠ Plan-Heavy
> [[matt-pocock|Matt Pocock]]'s critique of specs-to-code is specific: it's about treating the spec as a **compilation target** where the code is never read — if something breaks, fix the spec and recompile. This is distinct from [[plan-vs-review|plan-heavy]], which also produces specs but treats code as the battleground. See [[intent-to-code]] for the full axis.

## Sources

- `raw/yt-no-vibes-allowed-dex-horthy.md`
- `raw/2604.15597v1.pdf` — Single-step myopia: documents can lose 25–50% of semantic content over 20 interactions even when each step looks correct.
- `raw/The Comprehension Debt Trap Every AI Dev Falls Into - youtube.com.md` — Delegation mode scores below 40% on comprehension; cognitive cost of vibes-based engineering.
- `raw/Software Fundamentals Matter More Than Ever — Matt Pocock - youtube.com.md` — Specs-to-code as vibe coding by another name; each recompilation degrades code quality.
