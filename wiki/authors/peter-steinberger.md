---
title: Peter Steinberger
created: 2026-07-01
updated: 2026-07-01
sources:
  - raw/wtf-is-a-loop-peter-steinberger-vs-boris-cherny.md
  - raw/agentic-coding-recommendations.md
  - raw/yt-building-pi-and-what-makes-self-modifying-software-so-fascinating.md
unaudited_marginal: 0
tags: [author, agent-loops, agent-skills, claude-code]
---

# Peter Steinberger

> The tweet that put the "designing loops that prompt coding agents" discourse in a chokehold (2.2M views, June 7, 2026). Part of the Austrian engineering circle with [[armin-ronacher|Armin Ronacher]] and [[mario-zechner|Mario Zechner]]. Originator of the "prompt request" pattern. His more durable half of the loops thesis: turn repeated and hard work into reusable [[agent-skills|skills]].

## The Tweet

> "Here's your monthly reminder that you shouldn't be prompting coding agents anymore. You should be designing loops that prompt your agents."
> — @steipete, June 7, 2026

The telling part wasn't the claim — it was that a six-word phrase cleared 2.2 million views while the people boosting it argued in the replies about what it meant ("nobody knows but him and Boris"). The loudest idea in AI coding this week was one most people repeating it could not explain.

## Skills, Not Loops, Are the Durable Half

Steinberger's recurring point *pairs* with the loops one and, per the article, is the more durable half: **if you do something more than once, turn it into an automated skill; if you do something hard, turn it into a skill afterward so next time is free.** The article's author (Matt Van Horn) frames the consequence for loops:

> A loop with no reusable skills inside it is just a while-true around a stranger. A loop that calls a library of sharp, tested, named skills is a system that compounds.

"The loop is plumbing. The asset is the skill it calls" — also Van Horn's framing. This reframes the loop as an execution harness for a procedural-knowledge library rather than a prompt-engineering artifact. See [[agent-loop#Skills, Not Prompts, Are the Reusable Unit]].

## The Prompt Request Pattern

Steinberger's earlier idea, discussed in the Pragmatic Engineer interview with [[mario-zechner|Mario Zechner]] and [[armin-ronacher|Armin Ronacher]] (2025): instead of sending code (pull requests), **send the prompt that generated it**. [[armin-ronacher|Armin Ronacher]] refines this — the prompt is valuable because the act of creating it clarifies what you really wanted to build; once intent is understood, the senior engineer often starts fresh rather than fixing the agent's implementation. [[mario-zechner|Mario Zechner]] values seeing the terrible implementation anyway: it reveals the problem space without costing his own time ("valuable garbage").

## The Austrian Engineering Circle

Part of an Austrian engineering circle with [[armin-ronacher|Armin Ronacher]] and [[mario-zechner|Mario Zechner]]. The three met through Reddit, Vienna, and a conference in Istanbul, and began experimenting with AI tools together in 2024–2025 — a circle that includes [[mario-zechner|Mario Zechner]]'s building of [[pi|Pi]] in reaction to [[claude-code|Claude Code]]'s context manipulation.

## Thread

- [[the-agent-workflow]] — The "prompt request" pattern is a workflow handoff primitive; the loops/skills thesis is the AFK execution substrate
- [[the-human-lever]] — The altitude shift from writing code to writing the loops that write the code, as articulated by Steinberger and embodied by [[boris-cherny|Boris Cherny]]'s three-stage evolution

## Related

- [[agent-loop]] — The concept his tweet named; skills as the reusable unit inside it
- [[orchestration-loop]] — Stage 5 of the lineage his tweet boosted
- [[boris-cherny]] — Co-protagonist: Steinberger's tweet, Cherny's definition
- [[agent-skills]] — The "more durable half" of his loops thesis
- [[armin-ronacher]] — Austrian circle; refiner of the prompt-request pattern
- [[mario-zechner]] — Austrian circle; the "valuable garbage" counterpoint to the prompt request
- [[claude-code]] — The tool his loops target

## Sources

- `raw/wtf-is-a-loop-peter-steinberger-vs-boris-cherny.md` — The June 7, 2026 tweet (2.2M views); the skills-as-durable-half thesis (turn repeated work into a skill); the "while-true around a stranger" framing of a loop without skills (Van Horn's wording, per the source).
- `raw/agentic-coding-recommendations.md` — Ronacher's agentic coding workflow (Go as the workflow language, Makefiles, parallelization, refactor timing); background for the Austrian engineering circle.
- `raw/yt-building-pi-and-what-makes-self-modifying-software-so-fascinating.md` — The Austrian circle (Steinberger, Ronacher, Zechner) and their joint experimentation with AI tools.
