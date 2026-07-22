---
title: Explain Diff
created: 2026-07-15
updated: 2026-07-15
sources:
  - raw/yt-understanding-is-the-new-bottleneck-geoffrey-litt-notion.md
unaudited_marginal: 0
tags: [concept, tool, ai-engineering, code-review, understanding]
---

# Explain Diff

> A skill by [[geoffrey-litt|Geoffrey Litt]] that generates a personalized, literate explainer doc for a code change, with background, intuition, interactive figures, and an embedded quiz.

## The Idea

The raw diff is a poor explanation. It shows what changed but not what you need to know to understand it. Explain Diff treats the agent's code change as an opportunity to teach the human — producing a document that would pass as a short textbook chapter on the change.

## Principles

Litt's explainer docs follow four principles:

1. **Background first** — Teach the systems, coordinate frames, and conventions the change depends on before describing the change itself. The reader can skip what they already know.
2. **Intuition before details** — State the goal in plain language ("make the garden feel three-dimensional using only 2D drawing tricks") before showing code.
3. **Interactive figures** — Where useful, embed sliders, draggables, or simulations that let the reader feel the change. Litt cautions that interactivity can be slop if used thoughtlessly; it should provide understanding that static text cannot.
4. **Literate diffs** — Code is presented in prose order, with explanations before each file, rather than as a file-by-file list.

## The Quiz as Speed Regulator

> [!note] Merged from the standalone `understanding-quizzes` page (2026-07-22)

Reading is easy; realizing you do not understand is hard. Andy Matuschak's line "Books don't work" captures the failure mode: you can read a long explanation, feel like you got it, and be unable to answer the most basic question five minutes later. Matuschak and Michael Nielsen prototyped the fix — interactive spaced-repetition quizzes embedded directly in essays.

Litt applies this observation to code review. The faster agents generate code, the stronger the incentive to declare something "read" and move on. At the bottom of the doc is a short quiz — five questions, medium difficulty. Litt's rule: he does not send code to others for review unless he can pass the quiz about what his agents wrote. The questions are generated from the explainer doc, not from the code alone, so they test conceptual understanding of the change.

The broader point is behavioral. AI tools are optimized for speed; the human is incentivized to move faster. A quiz is a system that enforces the speed of understanding, not just the speed of correctness. It is a deliberate slowdown at a high-leverage decision point: the moment you decide you are ready to ship.

## Code Microworlds

> [!note] Merged from the standalone `code-microworlds` page (2026-07-22)

The term comes from Seymour Papert's "Mathland" — the idea that children learn French by living in France, so they should learn math by living in a world where math is the native language. Applied to code, a microworld is a tiny, purpose-built environment where the human can manipulate the system and see what happens.

Litt argues that agents can write code to help us understand code, where the point is not to ship the microworld but to build the human's intuition. Examples:

1. **Prolog interpreter debugger** — An ephemeral UI that visualizes the interpreter's state at every step. The user scrubs through a timeline, opens the hood, and leaves comments. The value is not just fixing the bug but getting a feel for the machine.
2. **Website migration game** — A "video game" where the user clicks through a framework migration, seeing the old site on the left and the new site on the right, with commands and file trees updating at each step.

Static text is easy to read without realizing you do not understand. Microworlds force the learner to interact with the system's behavior, exposing gaps in understanding. They also provide "peripheral vision" — the feel for the machine that comes from living inside it, not just reading about it.

## Output Format

Explain Diff's published versions output HTML or Notion pages. Litt prefers Notion so the explainer becomes a collaborative artifact the team can comment on and improve.

## Thread

- [[the-cognitive-cost]] — Explain Diff is a concrete practice for mitigating [[cognitive-debt|cognitive]] and [[comprehension-debt|comprehension]] debt.
- [[the-human-lever]] — It keeps the human in the loop through understanding, not just verification.
- [[the-agent-workflow]] — It is an operational artifact for the HITL phase of agentic engineering.

## Related

- [[geoffrey-litt]] — Creator of Explain Diff.
- [[understanding-quizzes]] — Now merged above as the quiz pattern.
- [[code-microworlds]] — Now merged above as interactive understanding tools.
- [[html-as-agent-output]] — Explain Diff's interactive figures are a concrete instance of HTML as agent output.
- [[deliberate-friction]] — The quiz is deliberate friction: a pause before shipping to verify understanding.
- [[comprehension-debt]] — The gap Explain Diff is designed to close.

## Sources

- `raw/yt-understanding-is-the-new-bottleneck-geoffrey-litt-notion.md` — Litt's 2026 AI Engineer talk: background-first, intuition-before-details, interactive figures, literate diffs, and the quiz-as-speed-regulator rule.
