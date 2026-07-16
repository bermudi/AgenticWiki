---
title: Geoffrey Litt
created: 2026-07-15
updated: 2026-07-15
sources:
  - raw/yt-understanding-is-the-new-bottleneck-geoffrey-litt-notion.md
unaudited_marginal: 0
tags: [author, ai-engineering, design-engineering, notion]
---

# Geoffrey Litt

> Design engineer at Notion; advocate for understanding as the central bottleneck in agentic coding. Creator of [[explain-diff|Explain Diff]] and a practitioner of AI-assisted explanation, microworlds, and shared understanding.

## Role

Litt is a design engineer at [[notion|Notion]], working at the intersection of interface design and AI-assisted coding. His 2026 AI Engineer conference talk "Understanding is the new bottleneck" argues that the human's role in AI-generated code is not primarily correctness checking — which agents are learning to do — but **maintaining the understanding needed to participate creatively**.

## Core Argument

Litt separates two reasons to understand code:

- **Understanding to verify** — checking correctness, matching the spec, avoiding production outages. This is a thumbs-up/thumbs-down task, and agents are increasingly capable of it.
- **Understanding to participate** — building the rich conceptual structures that let you generate the next idea, recombine parts of the system, and stay an active creative partner in the project.

The second, he argues, cannot be automated away. When you review an agent's output, the understanding you gain is what you carry into the next loop. If that degrades — the **cognitive debt** he invokes (a term he credits to Margaret Storey and Simon Willison) — you eventually become a spectator rather than a participant.

## Techniques

Litt's response is not to slow down, but to use agents to make understanding richer and faster:

- [[explain-diff|Explain Diff]] — literate code explainer docs with background-first, intuition-before-details, interactive figures, and embedded quizzes.
- [[code-microworlds|Code microworlds]] — ephemeral interactive UIs that let you inhabit an algorithm or codebase to build intuition.
- [[understanding-quizzes|Understanding quizzes]] — spaced-repetition-style checks at the end of explainer docs, used as a "speed regulator" before sending code to review.
- [[shared-understanding|Shared understanding]] — multiplayer agent/human spaces where teams build collective understanding together.

## Thread

- [[the-cognitive-cost]] — Litt reframes the bottleneck from review capacity to understanding capacity, and offers concrete mitigation practices.
- [[the-human-lever]] — His "understanding to participate" argument is the human-lever corollary: the human must hold the system's conceptual model, not just its interfaces.
- [[the-agent-workflow]] — Explain Diff, microworlds, and quizzes are operational techniques for the HITL phase.

## Related

- [[cognitive-debt]] — Litt adopts the term (crediting Margaret Storey and Simon Willison) as the frame for understanding degradation; his techniques are targeted countermeasures.
- [[comprehension-debt]] — The gap his techniques are designed to close.
- [[notion]] — The workspace platform where Litt builds; its HTML blocks and shared spaces are part of the tool substrate.
- [[html-as-agent-output]] — Explain Diff's interactive figures and microworlds are concrete instances of HTML as agent output.

## Sources

- `raw/yt-understanding-is-the-new-bottleneck-geoffrey-litt-notion.md` — 2026 AI Engineer conference talk: understanding-to-participate vs. understanding-to-verify, cognitive debt, Explain Diff, microworlds, quizzes, shared spaces, Alan Kay / Papert / Matuschak influences.
