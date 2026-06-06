---
title: Agentic Engineering
created: 2026-05-09
updated: 2026-06-05
sources:
  - "raw/yt-andrej-karpathy-from-vibe-coding-to-agentic-engineering.md"
  - raw/yt-systems-building-systems.md
tags: [concept, ai-engineering, discipline]
unaudited_marginal: 0
---

# Agentic Engineering

> The professional discipline of coordinating AI agents to build software faster without sacrificing quality. Coined by [[andrej-karpathy|Andrej Karpathy]] as the professional counterpart to [[vibe-coding]], agentic engineering treats agents as powerful but spiky, fallible, stochastic entities — and the engineering challenge is coordinating them well.

## Karpathy's Framing

Karpathy distinguishes agentic engineering from vibe coding:

> "Vibe coding is about raising the floor for everyone in terms of what they can do in software. The floor rises, everyone can vibe code anything and that's amazing, incredible. But then I would say agentic engineering is about preserving the quality bar of what existed before in professional software. You're not allowed to introduce vulnerabilities due to vibe coding. You're still responsible for your software just as before, but can you go faster? And spoiler is you can — but how do you do that properly?"

He calls it "agentic engineering" because it's an engineering discipline: "You have these agents which are these spiky entities. They're a bit fallible, a little bit stochastic, but they are extremely powerful. How do you coordinate them to go faster without sacrificing your quality bar and doing that well and correctly — is the realm of agentic engineering."

## The 10x Engineer, Magnified

Karpathy observes that the 10x engineer concept is being dramatically magnified:

> "People used to talk about the 10x engineer previously. I think that this is magnified a lot more. 10x is not the speed up you gain. It does seem to me like people who are very good at this peak a lot more than 10x from my perspective right now."

## Agents as Interns

A recurring metaphor: agents are like "intern entities." They're remarkably capable — they handle API details, recall, fill-in-the-blanks — but they make weird mistakes. Karpathy's example from building MenuGen: the agent tried to match email addresses across Google and Stripe accounts to associate funds, rather than using a persistent user ID. "This is the kind of thing that these agents still will make mistakes about... why would you use email addresses to try to cross-correlate the funds? They can be arbitrary."

The human remains in charge of:

- **Aesthetics and taste**: What's good, what makes sense
- **The spec**: Top-level design decisions and categories
- **Judgment**: Spotting when the agent does something weird
- **Fundamentals**: Understanding what the system is doing (e.g., tensor views vs copies) — not API details (e.g., `keep_dim` vs `keepdims`)

## The Next Step: Software Factories

[[eero-alvar|Eero Alvar]] extends the agentic engineering arc: the next logical step is shifting from *building software with agents* to *designing the systems that build the software*. This is the [[software-factory]] concept — a system that maps spec-like inputs to finished software without human steering.

The current state of agentic engineering (sitting in the terminal, steering agents one feature at a time) is the human-in-the-loop baseline. The software factory automates the human's role entirely. The hard part isn't building the factory — it's [[aiming-problem|aiming it]] to produce quality output rather than [[slop]].

## Hiring for Agentic Engineering

Karpathy proposes a different hiring paradigm: instead of puzzles, give candidates "a really big project." His example: build a Twitter clone, make it really secure, have agents simulate activity on it, then "use 10 Codexes 5.4x for X high to try to break your website — and they should not be able to break it."

The evaluation is: can you build something large using agents that withstands agentic attack?

## Thread

- [[the-verifiability-thesis]] — The causal chain that agentic engineering operates within: managing the boundary between verifiable peaks and unverifiable gaps
- [[the-human-lever]] — Agentic engineering's professional quality bar depends on human taste, judgment, and design authority
- [[the-agent-workflow]] — Agentic engineering is the workflow discipline that operationalizes the HITL/AFK cycle at professional scale
- [[the-slop-problem]] — Agentic engineering is the proposed solution to the slop that vibe coding at scale introduces
- [[agent-quality-engineering]] — The quality infrastructure that makes agentic engineering measurable and provable

## Related

- [[vibe-coding]] — The floor-raising counterpart that agentic engineering builds upon
- [[andrej-karpathy]] — The originator of the term and framing
- [[vibes-based-engineering]] — The anti-pattern that agentic engineering is designed to prevent
- [[verifiability]] — The economic driver that makes agent capabilities possible
- [[grey-box-engineering]] — The HITL/AFK handoff that agentic engineering formalizes
- [[the-human-lever]] — The human role of taste, judgment, and design authority within agentic engineering
- [[jagged-frontier]] — The spiky capability surface that agentic engineering must navigate
- [[context-engineering]] — One of the core skills of agentic engineering proficiency
- [[babysitter-agent]] — A proposed infrastructure component for professional-grade agentic systems
- [[software-1-2-3]] — Agentic engineering is the professional discipline for building with Software 3.0
- [[intent-to-code]] — Both plan-as-contract and alignment-first positions are strategies within agentic engineering, differing on where verification lives

## Sources

- `raw/yt-andrej-karpathy-from-vibe-coding-to-agentic-engineering.md` — Karpathy's Sequoia interview: coining of "agentic engineering," the intern entity metaphor, 10x magnification, hiring paradigm, and the distinction from vibe coding.
- `raw/yt-systems-building-systems.md` — [[eero-alvar|Eero Alvar]]: agentic engineering's next logical step — from building software to designing systems that build software (software factories)
