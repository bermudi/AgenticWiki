---
type: web
url: https://github.com/ghuntley/how-to-ralph-wiggum/raw/refs/heads/main/README.md
title: How to Ralph Wiggum
author: Geoffrey Huntley (originator), Clayton Farr (playbook)
date: 2025
ingested: 2026-04-26
---

# Key points extracted during ingest

- Geoffrey Huntley originated the Ralph Wiggum technique for autonomous agent loops
- Clayton Farr documented it into a full playbook; Huntley forked it (signaling endorsement)
- Core loop: `while :; do cat PROMPT.md | claude ; done` — a dumb bash loop that restarts the agent with fresh context each iteration
- IMPLEMENTATION_PLAN.md acts as persistent shared state between isolated loop executions
- One task per iteration — agent picks the most important thing, implements, commits, exits
- Three phases: Requirements (specs/), Planning (gap analysis → IMPLEMENTATION_PLAN.md), Building (one task per loop)
- Backpressure through tests, builds, and LLM-as-judge for subjective criteria
- Prompt structure: orientation (0a-0d), main instructions (1-4), guardrails (999+)
- Enhanced loop adds mode selection (plan/build), max iterations, git push
- Advanced patterns: acceptance-driven backpressure, work-scoped branches, JTBD→Story Map→SLC releases
- Up to 500 parallel Sonnet subagents for exploration, 1 for build/tests, Opus for complex reasoning
- AGENTS.md kept to ~60 lines — operational only, no status updates
- Plans are disposable — regenerate when stale, don't salvage

> Full content was fetched via curl from the raw GitHub README.
