---
title: Vibes-Based Engineering
created: 2026-04-25
updated: 2026-05-02
sources: ["raw/yt-no-vibes-allowed-dex-horthy.md", "raw/2604.15597v1.pdf"]
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

## The Alternative: "No Vibes"

Proposed by [[dex-horthy]], the "No Vibes" approach replaces guesswork with:
1. **High-Fidelity Context**: Using [[code-intelligence]] to feed the LLM accurate symbol information.
2. **Deterministic Verification**: Building a [[verification-loop]] into the AI workflow.
3. **Structured Reasoning**: Forcing the AI (and the human) to reason about the system's architecture before writing code.

## Thread
- [[the-slop-problem]] — Vibes-based engineering as the root cause of slop

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

## Sources

- `raw/yt-no-vibes-allowed-dex-horthy.md`
