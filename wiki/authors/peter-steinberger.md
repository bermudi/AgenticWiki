---
title: Peter Steinberger
created: 2026-07-01
updated: 2026-07-02
sources:
  - raw/wtf-is-a-loop-peter-steinberger-vs-boris-cherny.md
  - raw/agentic-coding-recommendations.md
  - raw/yt-building-pi-and-what-makes-self-modifying-software-so-fascinating.md
  - raw/yt-are-we-really-doing-this-again.md
unaudited_marginal: 0
tags: [author, agent-loops, agent-skills, claude-code]
---

# Peter Steinberger

> The tweet that put the "designing loops that prompt coding agents" discourse in a chokehold (2.2M views, June 7, 2026). Part of the Austrian engineering circle with [[armin-ronacher|Armin Ronacher]] and [[mario-zechner|Mario Zechner]]. Originator of the "prompt request" pattern. His more durable half of the loops thesis: turn repeated and hard work into reusable [[agent-skills|skills]].

## The Tweet

> "Here's your monthly reminder that you shouldn't be prompting coding agents anymore. You should be designing loops that prompt your agents."
> — @steipete, June 7, 2026

The telling part wasn't the claim — it was that a six-word phrase cleared 2.2 million views while the people boosting it argued in the replies about what it meant ("nobody knows but him and Boris"). The loudest idea in AI coding this week was one most people repeating it could not explain.

## The Follow-Up: Threads Spawning Threads

Four days after the tweet, Steinberger posted the closest thing to a concrete recipe: tell Codex to maintain your repos, wake every five minutes, and direct work to *threads*; this makes the work easy to parallelize and steer as needed. His stack: an "orchestrator skill" combined with "triage plus auto review plus computer use skills," so that "some work can land autonomously." The load-bearing mechanic, as [[neetcode|NeetCode]] glosses it, is that a Codex **thread** (a session, like a ChatGPT thread) can invoke and create *other* independent threads, each with its own context — one loop spawning sub-loops. That is the [[orchestration-loop|Stage-5]] primitive in plain terms: the thread is the unit of work, and a supervising thread dispatches work into isolated child threads. Everything else (the named skills, the five-minute wake) is configuration around that one capability. NeetCode's complaint is precisely that this — the one genuinely useful, concrete takeaway — was buried under the viral phrasing of the original tweet rather than stated plainly.

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
- [[orchestration-loop]] — Stage 5 of the lineage his tweet boosted; his follow-up describes the Stage-5 primitive (threads spawning threads) in plain terms
- [[boris-cherny]] — Co-protagonist: Steinberger's tweet, Cherny's definition
- [[agent-skills]] — The "more durable half" of his loops thesis
- [[armin-ronacher]] — Austrian circle; refiner of the prompt-request pattern
- [[mario-zechner]] — Austrian circle; the "valuable garbage" counterpoint to the prompt request
- [[claude-code]] — The tool his loops target
- [[neetcode]] — Surfaced the threads-spawning-threads mechanic as the one concrete takeaway buried under the viral phrasing
- [[jarred-sumner]] — Co-protagonist of the loops wave whose for-each/while walk-back tempers Steinberger's tweet enthusiasm

## Sources

- `raw/wtf-is-a-loop-peter-steinberger-vs-boris-cherny.md` — The June 7, 2026 tweet (2.2M views); the skills-as-durable-half thesis (turn repeated work into a skill); the "while-true around a stranger" framing of a loop without skills (Van Horn's wording, per the source).
- `raw/agentic-coding-recommendations.md` — Ronacher's agentic coding workflow (Go as the workflow language, Makefiles, parallelization, refactor timing); background for the Austrian engineering circle.
- `raw/yt-building-pi-and-what-makes-self-modifying-software-so-fascinating.md` — The Austrian circle (Steinberger, Ronacher, Zechner) and their joint experimentation with AI tools.
- `raw/yt-are-we-really-doing-this-again.md` — The follow-up tweet: Codex threads spawning threads (orchestrator + triage + auto-review + computer-use skills); [[neetcode|NeetCode]]'s gloss that the load-bearing mechanic is one thread invoking independent child threads.
