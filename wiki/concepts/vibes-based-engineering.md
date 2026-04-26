---
title: Vibes-Based Engineering
created: 2026-04-25
updated: 2026-04-25
sources: ["raw/yt-no-vibes-allowed-dex-horthy.md"]
tags: ["anti-pattern", "ai-engineering", "heuristics"]
---

# Vibes-Based Engineering

> An engineering anti-pattern where an LLM's output is accepted based on a superficial sense of correctness ("it looks right") rather than rigorous verification and deep context.

## Characteristics

- **Shallow Prompting**: Providing minimal context and hoping the LLM "gets it."
- **Lack of Verification**: Not running tests or static analysis to confirm the AI's output works as intended.
- **Trial and Error**: Repeatedly asking the AI to "try again" without providing more information or structure.
- **Trust over Evidence**: Relying on the fluency of the LLM rather than the correctness of the code. This makes the system highly susceptible to [[hallucination|hallucinations]].

## The Alternative: "No Vibes"

Proposed by [[dex-horthy]], the "No Vibes" approach replaces guesswork with:
1. **High-Fidelity Context**: Using [[code-intelligence]] to feed the LLM accurate symbol information.
2. **Deterministic Verification**: Building a [[verification-loop]] into the AI workflow.
3. **Structured Reasoning**: Forcing the AI (and the human) to reason about the system's architecture before writing code.

## Thread
- [[the-slop-problem]] — Vibes-based engineering as the root cause of slop

## Related

- [[slop]] — Vibes-based engineering often leads to the generation of "slop."
- [[hallucination]] — The technical failure mode that vibes-based engineering fails to detect.
- [[grey-box-engineering]] — The rigorous alternative that emphasizes the [[verification-loop]].
- [[strategic-vs-tactical-programming]] — Vibes-based engineering is the extreme end of tactical programming.
- [[peak-programmer]] — The era that incentivizes the speed of vibes over the rigor of engineering.
- [[aesthetics-is-truth]] — Often confused with vibes, but represents a more disciplined, experience-driven intuition.

## Sources

- [[src/no-vibes-allowed-dex-horthy]]
