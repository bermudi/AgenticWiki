---
title: Vibes-Based Engineering
created: 2026-04-25
updated: 2026-05-09
sources:
  - raw/yt-no-vibes-allowed-dex-horthy.md
  - raw/2604.15597v1.md
  - raw/yt-the-comprehension-debt-trap-every-ai-dev-falls-into.md
  - raw/yt-software-fundamentals-matter-more-than-ever-matt-pocock.md
  - "raw/yt-full-walkthrough-workflow-for-ai-coding-matt-pocock.md"
  - raw/synthetic-truths-gemini-has-a-secret-code.md
  - "raw/yt-andrej-karpathy-from-vibe-coding-to-agentic-engineering.md"
unaudited_marginal: 0
tags: ["anti-pattern", "ai-engineering", "heuristics"]
---

# Vibes-Based Engineering

> An engineering anti-pattern where an LLM's output is accepted based on a superficial sense of correctness ("it looks right") rather than rigorous verification and deep context.

## Relationship to Vibe Coding

> [!note] Departure: Karpathy's "Vibe Coding" Is Not an Anti-Pattern
> [[andrej-karpathy|Andrej Karpathy]] coined "vibe coding" in December 2024 as a descriptive term for a genuine capability shift — models reached a threshold where outputs stopped needing correction. His framing is neutral, even positive: vibe coding "raises the floor for everyone." [[dex-horthy|Dex Horthy]] and others later developed "vibes-based engineering" as a critique of what happens when that capability is used without discipline. Karpathy himself draws the boundary: vibe coding raises the floor, but professional software needs [[agentic-engineering]] to preserve quality. The two terms are related but not synonymous — [[vibe-coding|vibe coding]] describes what's newly possible, vibes-based engineering describes the failure mode of doing it carelessly.

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

## Case Study: Synthetic Truth

The [[discover-ai|Discover AI]] interaction with Gemini (May 2026) is a definitive case study of why vibes-based engineering is dangerous — applied to *information* rather than *code*. The creator asked for a peer-reviewed psychology article about AI. Gemini returned a complete, authoritative, perfectly formatted study that didn't exist. The only thing that prevented disaster was the creator's deliberate verification.

As the creator puts it, the AI "succeeded perfectly, almost 99%" — it was authoritative, satisfying, and would have been accepted without the "nagging thought" to verify. The fabricated study was structurally coherent, cited a real grant and real researchers, and was accompanied by a convincing critique. This is vibes-based acceptance at its most seductive — not merely a plausible function signature, but an entire academic argument that is rhetorically flawless and factually empty.

The case reinforces the core argument: verification is not just about tests and linters. It extends to **source-level fact-checking** — checking whether the cited sources exist, whether the timeline is consistent, whether the authority structures are real. See [[synthetic-truth]] and [[temporal-smoothing]].

## Thread
- [[the-slop-problem]] — Vibes-based engineering as the root cause of slop
- [[the-human-lever]] — The human lever is what replaces vibes with design authority and verification
- [[tool-design-for-agents]] — Absence of structured tool feedback enables vibes-based acceptance of outputs
- [[intent-to-code]] — Specs-to-code occupies one position on the intent-to-code axis; plan-heavy and alignment-first are the structured alternatives

## Related

- [[vibe-coding]] — The neutral concept Karpathy coined; the capability shift that vibes-based engineering misuses
- [[agentic-engineering]] — The professional discipline Karpathy proposes as the successor to undisciplined vibe coding
- [[andrej-karpathy]] — Originator of the terms "vibe coding" and "agentic engineering"
- [[verifiability]] — The economic driver that explains why vibes-based engineering works in some domains and fails catastrophically in others
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
- [[synthetic-truth]] — Synthetic truth as the definitive case study of why vibes-based acceptance is dangerous: the output was structurally perfect and entirely fabricated
- [[temporal-smoothing]] — Temporal smoothing exploits the same verification gap as vibe coding: it looks correct unless you check the timeline
- [[hallucination]] — Hallucinations are the atomic content that vibes-based acceptance normalizes: plausible but unverified

> [!note] Departure: Specs-to-Code ≠ Plan-Heavy
> [[matt-pocock|Matt Pocock]]'s critique of specs-to-code is specific: it's about treating the spec as a **compilation target** where the code is never read — if something breaks, fix the spec and recompile. This is distinct from [[plan-vs-review|plan-heavy]], which also produces specs but treats code as the battleground. See [[intent-to-code]] for the full axis.

- [[shared-design-concept]] — Shared design concept erodes under vibes-based engineering; each fresh agent session drifts from the architecture

## Sources

- `raw/yt-no-vibes-allowed-dex-horthy.md` — Origin of the "No Vibes" term; definition of vibes-based engineering as an anti-pattern.
- `raw/2604.15597v1.md` — Single-step myopia: documents can lose 25–50% of semantic content over 20 interactions even when each step looks correct.
- `raw/yt-the-comprehension-debt-trap-every-ai-dev-falls-into.md` — Delegation mode scores below 40% on comprehension; cognitive cost of vibes-based engineering.
- `raw/yt-software-fundamentals-matter-more-than-ever-matt-pocock.md` — Specs-to-code as vibe coding by another name; each recompilation degrades code quality.
- `raw/yt-full-walkthrough-workflow-for-ai-coding-matt-pocock.md` — Practical workflow that contrasts with and replaces vibes-based engineering.
- `raw/synthetic-truths-gemini-has-a-secret-code.md` — Case study: synthetic truth as vibes-based acceptance applied to information; the definitive example of why verification matters.
- `raw/yt-andrej-karpathy-from-vibe-coding-to-agentic-engineering.md` — Karpathy's Sequoia interview: origin of "vibe coding" as a neutral term, the December 2024 capability threshold, and the distinction between vibe coding (raising the floor) and agentic engineering (preserving quality).
