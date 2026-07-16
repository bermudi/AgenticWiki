---
title: Code Microworlds
created: 2026-07-15
updated: 2026-07-15
sources:
  - raw/yt-understanding-is-the-new-bottleneck-geoffrey-litt-notion.md
unaudited_marginal: 0
tags: [concept, ai-engineering, understanding, visualization, education]
---

# Code Microworlds

> Ephemeral, interactive, agent-built simulations that let a human inhabit a codebase or algorithm to build intuition faster than reading static documentation.

## The Idea

The term comes from Seymour Papert's "Mathland" — the idea that children learn French by living in France, so they should learn math by living in a world where math is the native language. Applied to code, a microworld is a tiny, purpose-built environment where the human can manipulate the system and see what happens.

[[geoffrey-litt|Geoffrey Litt]] argues that agents can write code to help us understand code, where the point is not to ship the microworld but to build the human's intuition.

## Examples

Litt gives two examples:

1. **Prolog interpreter debugger** — An ephemeral UI that visualizes the interpreter's state at every step. The user scrubs through a timeline, opens the hood, and leaves comments for themselves on the timeline. The value is not just fixing the bug but getting a feel for the machine.
2. **Website migration game** — A "video game" where the user clicks through a framework migration, seeing the old site on the left and the new site on the right, with commands and file trees updating at each step. It captures some of the benefit of doing the migration manually without the pain.

In both cases, the agent is not asked to do the work; it is asked to build a world where the human can do the work and understand it.

## Why It Works

Static text is easy to read without realizing you do not understand. Microworlds force the learner to interact with the system's behavior, exposing gaps in understanding. They also provide "peripheral vision" — the feel for the machine that comes from living inside it, not just reading about it.

## Thread

- [[the-cognitive-cost]] — Microworlds are a targeted mitigation against [[comprehension-debt|comprehension]] and [[cognitive-debt|cognitive]] debt.
- [[the-human-lever]] — The human stays the participant by building a feel for the system, not just approving outputs.
- [[the-agent-workflow]] — Microworlds are an operational artifact in the HITL phase.

## Related

- [[geoffrey-litt]] — The main source for code microworlds.
- [[explain-diff]] — Litt's other major technique for understanding code changes.
- [[understanding-quizzes]] — Another Litt technique for verifying understanding.
- [[html-as-agent-output]] — Microworlds are often built as interactive HTML/JS artifacts.
- [[deliberate-friction]] — Building a microworld is deliberate friction: it slows the immediate fix to build lasting understanding.
- [[skill-atrophy]] — Microworlds are a countermeasure against the skill erosion that comes from delegation.

## Sources

- `raw/yt-understanding-is-the-new-bottleneck-geoffrey-litt-notion.md` — Litt's 2026 AI Engineer talk: Papert's Mathland, Prolog interpreter debugger, website migration game, peripheral-vision learning, agents building understanding tools for humans.
