---
title: Understanding Quizzes
created: 2026-07-15
updated: 2026-07-15
sources:
  - raw/yt-understanding-is-the-new-bottleneck-geoffrey-litt-notion.md
unaudited_marginal: 0
tags: [concept, ai-engineering, code-review, understanding, deliberate-friction]
---

# Understanding Quizzes

> Short, spaced-repetition-style checks appended to code explainer docs, used as a "speed regulator" to verify the human actually understands what the agent wrote before sending it to review.

## The Problem

Reading is easy; realizing you do not understand is hard. Andy Matuschak's line "Books don't work" captures the failure mode: you can read a long explanation, feel like you got it, and be unable to answer the most basic question five minutes later. Matuschak and Michael Nielsen prototyped the fix — interactive spaced-repetition quizzes embedded directly in essays.

[[geoffrey-litt|Geoffrey Litt]] applies this observation to code review. The faster agents generate code, the stronger the incentive to declare something "read" and move on. The quiz is a mechanical check against that false fluency.

## The Practice

Litt's Explain Diff ends with a short quiz — five questions, medium difficulty. His rule: he does not send code to others for review until he can pass the quiz about what his agents wrote. The questions are generated from the explainer doc, not from the code alone, so they test conceptual understanding of the change.

## The Speed-Regulator Framing

The broader point is behavioral. AI tools are optimized for speed; the human is incentivized to move faster. A quiz is a system that enforces the speed of understanding, not just the speed of correctness. It is a deliberate slowdown at a high-leverage decision point: the moment you decide you are ready to ship.

## Thread

- [[the-cognitive-cost]] — Quizzes are a concrete mitigation against [[comprehension-debt|comprehension]] and [[cognitive-debt|cognitive]] debt.
- [[the-human-lever]] — They keep the human's understanding honest, not just their verification output.
- [[the-agent-workflow]] — A quiz is an operational gate in the HITL/AFK handoff.

## Related

- [[geoffrey-litt]] — The source of the practice.
- [[explain-diff]] — The explainer docs that end with a quiz.
- [[deliberate-friction]] — The quiz is deliberate friction: a pause before shipping to verify understanding.
- [[comprehension-debt]] — The gap the quiz is designed to detect.
- [[skill-atrophy]] — Quizzes counter the skill erosion that comes from delegating understanding.

## Sources

- `raw/yt-understanding-is-the-new-bottleneck-geoffrey-litt-notion.md` — Litt's 2026 AI Engineer talk: Matuschak's "Books don't work", five-question quiz, speed-regulator framing, rule before sending code to review.
