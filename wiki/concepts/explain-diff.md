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

At the bottom of the doc is a short quiz. Litt's rule: he does not send code to others for review unless he can pass the quiz about what his agents wrote. The quiz is a deliberate speed regulator against the default incentive to ship faster than you understand.

## Output Format

Explain Diff's published versions output HTML or Notion pages. Litt prefers Notion so the explainer becomes a collaborative artifact the team can comment on and improve.

## Thread

- [[the-cognitive-cost]] — Explain Diff is a concrete practice for mitigating [[cognitive-debt|cognitive]] and [[comprehension-debt|comprehension]] debt.
- [[the-human-lever]] — It keeps the human in the loop through understanding, not just verification.
- [[the-agent-workflow]] — It is an operational artifact for the HITL phase of agentic engineering.

## Related

- [[geoffrey-litt]] — Creator of Explain Diff.
- [[understanding-quizzes]] — The embedded quiz pattern.
- [[code-microworlds]] — Another Litt technique for understanding through interaction.
- [[html-as-agent-output]] — Explain Diff's interactive figures are a concrete instance of HTML as agent output.
- [[deliberate-friction]] — The quiz is deliberate friction: a pause before shipping to verify understanding.
- [[comprehension-debt]] — The gap Explain Diff is designed to close.

## Sources

- `raw/yt-understanding-is-the-new-bottleneck-geoffrey-litt-notion.md` — Litt's 2026 AI Engineer talk: background-first, intuition-before-details, interactive figures, literate diffs, and the quiz-as-speed-regulator rule.
