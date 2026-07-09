---
title: Vibe Coding
created: 2026-05-09
updated: 2026-06-01
sources:
  - "raw/yt-andrej-karpathy-from-vibe-coding-to-agentic-engineering.md"
  - raw/yt-llms-are-killing-agent-harness.md
unaudited_marginal: 0
tags: [concept, ai-engineering, coding]
---

# Vibe Coding

> The term coined by [[andrej-karpathy|Andrej Karpathy]] in December 2024: coding where you fully trust the LLM's output, not reading every line or correcting errors, because the model has stopped needing correction. Raises the floor for what everyone can build — but is distinct from professional [[agentic-engineering|agentic engineering]] which preserves quality while going faster.

## Origin

Karpathy describes December 2024 as a "clear point" where the latest models crossed a threshold. He stopped correcting outputs. He kept asking for more and it "just came out fine." He describes the feeling: "I can't remember the last time I corrected it and then I just trusted the system more and more and then I was vibe coding."

He stresses that many people experienced AI last year as "ChatGPT-adjacent" — but "you really had to look again and you had to look as of December because things have changed fundamentally, especially on this agentic coherent workflow that really started to actually work."

## Vibe Coding vs Agentic Engineering

Karpathy's own distinction:

| | Vibe Coding | Agentic Engineering |
|---|---|---|
| **Goal** | Raise the floor for everyone | Preserve professional quality bar |
| **Approach** | Fully trust, don't read every line | Coordinate agents without sacrificing quality |
| **Risk** | Introduces vulnerabilities via blind trust | Manages risk through engineering discipline |
| **Speed** | Everyone can build anything | 10x is the floor, not the ceiling |

He emphasizes that vibe coding and agentic engineering are different things: "One is about raising the floor and the other is about extrapolating."

## The Capability Threshold

Karpathy dates the transition to December 2024 specifically. Before that, agentic tools were "kind of helpful" — good at chunks, sometimes messed up, needed editing. After, they became coherent across entire workflows. This was a "very stark transition" that many people missed because they were still operating on their prior year's mental model of AI capability.

### The Quality Caveat

Karpathy isn't unambivalent about vibe-coded output. He describes looking at what the model produces:

> "Sometimes I get a little bit of a heart attack because it's not like super amazing code necessarily all the time and it's very bloaty and there's a lot of copy paste and there's awkward abstractions that are brittle and like it works but it's just really gross."

This is a notable qualification: vibe coding produces *working* code, not necessarily *good* code. The model fills in the blanks with what it has learned from the median of internet code — and the median is mediocre. Karpathy's microGPT project is a concrete example: models consistently fail to simplify code when asked, because simplification isn't rewarded in RL training.

This tension — vibe coding raises the floor (everyone can build) but the default output quality is "bloaty" and "gross" — is why [[agentic-engineering]] exists: preserving the quality bar while going faster.

## Vibes as Evaluation

[[thorsten-ball|Thorsten Ball]] extends the vibe coding concept to evaluation: for general-purpose coding agents in arbitrary codebases, formal evals are less useful than direct usage experience. "How do you even say what's correct? How do you even say what's good?" AMP built evals but found vibes-based engineering — using the agent heavily — provided more signal. This suggests vibe coding isn't just a development style but also an evaluation methodology: you know the agent works when you use it and it works, not when it scores well on a benchmark.

## Relationship to Vibes-Based Engineering

> [!note] Departure: Vibe Coding ≠ Anti-Pattern
> Karpathy coined "vibe coding" as a descriptive term for a genuine capability shift, not as an anti-pattern. [[dex-horthy|Dex Horthy]] and others later developed [[vibes-based-engineering]] as a critique of what happens when vibe coding is done without discipline. Karpathy himself draws the boundary: vibe coding raises the floor, but professional software needs agentic engineering to preserve quality. The two terms are related but not synonymous — vibe coding describes what's newly possible, vibes-based engineering describes the failure mode.

## Thread

- [[the-verifiability-thesis]] — The causal chain that vibe coding sits within: verifiability → RL training → capability peaks → vibe coding
- [[the-human-lever]] — Vibe coding makes the human lever more important, not less: when code generation is automated, design authority and verification become the human's core job
- [[the-slop-problem]] — Vibe coding without discipline produces slop; agentic engineering is the proposed path forward
- [[the-agent-workflow]] — Agentic engineering as the operational discipline for vibe coding at professional scale
- [[failure-modes]] — Vibe coding is a documented failure mode in the engineering playbook: accepting AI output without verification

## Related

- [[the-human-lever]] — Vibe coding is the capability shift that makes the human lever critically important: when machines write code, humans must own design and verification
- [[agentic-engineering]] — The professional discipline Karpathy contrasts with vibe coding
- [[andrej-karpathy]] — The originator of the term and the framing
- [[vibes-based-engineering]] — The anti-pattern that emerges when vibe coding is done without verification
- [[agent-quality-engineering]] — The quality infrastructure that makes agentic engineering possible
- [[intent-to-code]] — The pure-vibes position on the intent-to-code axis is vibe coding without guardrails
- [[jagged-frontier]] — The jaggedness that makes vibe coding dangerous: models that seem reliable can fail catastrophically
- [[verifiability]] — The economic driver that made vibe coding possible by December 2024
- [[software-1-2-3]] — Vibe coding is the consumer experience of Software 3.0
- [[peak-programmer]] — "Software as we know it is dead" as the strongest articulation of peak programmer; vibe coding as the capability shift that triggers it
- [[thorsten-ball]] — Extends vibe coding to evaluation: vibes-based engineering as more signal than formal evals

## Sources

- `raw/yt-andrej-karpathy-from-vibe-coding-to-agentic-engineering.md` — Karpathy's Sequoia interview: coinage of "vibe coding," the December 2024 capability threshold, and the distinction between vibe coding and agentic engineering.
- `raw/yt-llms-are-killing-agent-harness.md` — Thorsten Ball: vibes-based evaluation for coding agents; formal evals less useful than usage experience for arbitrary codebases.
