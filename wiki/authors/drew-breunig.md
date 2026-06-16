---
title: Drew Breunig
created: 2026-06-07
updated: 2026-06-07
sources:
  - raw/yt-learnings-from-a-no-code-library-keeping-the-spec-driven-development-triangle-in-sync.md
unaudited_marginal: 0
tags: [author, spec-driven-development, decision-tracking, compound-ai]
---

# Drew Breunig

> Writer, technologist, and co-founder of Compound (a compound AI research and agentic systems startup focused on DSPy). Creator of [[onewords]] (a no-code library that proved spec-driven development works for constrained problems) and [[plum-dev]] (a decision-tracking CLI that keeps spec, tests, and code in sync). Coined the [[spec-code-triangle|spec-code triangle]] — the insight that spec-driven development is a feedback loop, not a one-way equation. Currently editing the *Context Engineering Handbook* for O'Reilly.

## Background

Breunig writes about technology, data, AI, and geospatial topics on his blog (dbrunig.com), "with a focus on the language around them and how to effectively communicate them to a wider audience." As AI coding grew, the questions on his blog "have gotten more interesting and more applied."

He co-founded Compound with Heather Miller (CMU professor, programming languages) and Claire Le Goues (CMU professor, software engineering history). The startup focuses on DSPy and associated software and research.

## Key Contributions

### The spec-code triangle

Breunig's central theoretical contribution. His initial framing of spec-driven development was a one-way equation: `Spec + Tests + Agent → Code`. He later walked this back: "I got this wrong. This isn't a one-way equation. This is a feedback loop." The act of writing code improves the spec and the tests. The [[spec-code-triangle]] model replaces the equation with a triangle where each node informs the others.

The insight emerged from watching real spec-driven projects (Vercel's just-bash, Pyantic's Monty, Anthropic's C compiler) — none were complete, and all generated implementation decisions the spec didn't anticipate.

### "No-code libraries" as a proof of concept

[[onewords]] was Breunig's experiment: a GitHub repository with only a spec, 750 conformance tests, and an install paragraph for agent setup. It proved the approach works for constrained problems and generated genuine open-source engagement (PRs that surfaced test-vs-spec mismatches). But Breunig later called it "a toy" — the spec was exhaustive for its scope, not representative of real-world complexity.

### Decision extraction as a workflow primitive

Breunig's practical contribution: the idea that every commit to an AI-assisted codebase contains decisions that should be surfaced, approved, and logged. [[plum-dev]] implements this as a git hook. The decision log becomes "code review where we capture intent" — a new artifact in the codebase that answers "why does this code exist?"

### The "tool not skill" principle

Breunig argues that decision tracking must be a tool, not a [[agent-skills|skill]]: "A skill is a suggestion. A tool needs a checkpoint." The commit-hook failure mode is essential because without it, the system gets ignored. The tool must run outside the agent, handle small commits and triggers, and be canonical.

### Software history as context for AI coding

Breunig's talk traced the arc from Margaret Hamilton coining "software engineering" (1963) through the NATO software crisis (1968) to waterfall, agile, and the current moment. His framing: "Agentic engineering enables waterfall volume at the cadence of agile." The oscillation between unhindered velocity and managed process is not new — we've been here before, and "the answer then was process. The answer now is also process, made lightweight enough via AI that moving fast doesn't require abandoning process."

## Related

- [[onewords]] — The no-code library Breunig created
- [[plum-dev]] — The decision-tracking tool Breunig built
- [[spec-code-triangle]] — The conceptual model Breunig coined
- [[code-clarifies-spec]] — Breunig's core insight about implementation as spec refinement
- [[decision-extraction]] — The practice Breunig operationalized
- [[spec-driven-development]] — The broader movement Breunig's work contributed to
- [[kiro]] — Amazon's spec-driven IDE; Al Harris's bidirectional spec sync is the same feedback loop
- [[cian-clarke]] — Clarke's SDD work at Near Form complements Breunig's triangle model
- [[intent-to-code]] — The triangle reframes the plan-as-contract position

## Sources

- `raw/yt-learnings-from-a-no-code-library-keeping-the-spec-driven-development-triangle-in-sync.md` — Computer History Museum talk. The spec-code triangle, onewords postmortem, decision extraction, Plum demo, software history digression (Hamilton, NATO, waterfall/agile), Gas Town critique, "tool not skill" principle, context engineering handbook mention.
