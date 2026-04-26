---
title: Plan Disposability
created: 2026-04-26
updated: 2026-04-26
sources:
  - raw/how-to-ralph-wiggum.md
  - raw/ralph-wiggum-playbook.md
tags: [concept, autonomous-agents, agent-loops, context-management]
---

# Plan Disposability

> Treat plans as ephemeral coordination state, not contracts. A drifting plan is cheaper to regenerate than to salvage. When it's wrong, throw it away.

## The Problem

In autonomous agent loops, plans drift. Requirements change. The agent misunderstands something early and compounds the error across iterations. Fighting a stale plan wastes more iterations than regenerating it.

## The Principle

[[geoffrey-huntley|Geoffrey Huntley]]'s Ralph pattern treats `IMPLEMENTATION_PLAN.md` as coordination state between loop iterations — not a binding contract. The plan file persists on disk, gets updated after each task, and can be thrown away entirely when it no longer matches reality.

Regeneration is cheap: switch to planning mode, run gap analysis against specs and current code, produce a fresh plan. The agent re-derives what needs to be done from the actual state of the codebase rather than trusting a potentially stale plan.

## When to Regenerate

- Agent is going off track (implementing wrong things, duplicating work)
- Plan feels stale or doesn't match current code state
- Too much clutter from completed items
- Significant spec changes have been made
- Human is confused about what's actually done

## Connection to Smart Zone

Plan disposability is a form of [[smart-zone-dumb-zone|context management]] for coordination state. Instead of accumulating stale context in a plan that grows ever longer, you periodically reset — the same principle as the Memento Strategy, applied to the plan rather than the agent's context window.

## Thread

- [[the-agent-workflow]] — Plan disposability as a key discipline in the AFK loop
- [[the-human-lever]] — The human decides when to regenerate, not the agent

## Related

- [[backpressure]] — Backpressure catches bad implementations; plan disposability catches bad plans
- [[afk-agent]] — AFK agents need disposable plans to avoid accumulating errors
- [[smart-zone-dumb-zone]] — The same reset principle applied to coordination state
- [[compounding-booboos]] — Stale plans compound booboos across iterations
- [[geoffrey-huntley]] — Originator of the plan disposability principle

## Sources

- `raw/how-to-ralph-wiggum.md` — Plan regeneration as a core Ralph discipline
- `raw/ralph-wiggum-playbook.md` — "Treat IMPLEMENTATION_PLAN.md as coordination state, not a contract"
