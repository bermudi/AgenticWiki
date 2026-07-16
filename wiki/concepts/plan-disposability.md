---
title: Plan Disposability
created: 2026-04-26
updated: 2026-07-16
sources:
  - raw/how-to-ralph-wiggum.md
  - raw/ralph-wiggum-playbook.md
  - raw/yt-context-engineering-with-dex-horthy.md
unaudited_marginal: 0
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

## The RPI Retrospective: Plans Were Anti-Leverage

The deepest first-person evidence for plan disposability comes from [[dex-horthy|Dex Horthy]], who ran his own [[research-plan-implement|RPI workflow]] for a year and concluded the detailed plans were *anti-leverage*. His original plans enumerated every line of code in diff blocks; the intended use was "read the plan, then read the PR." In practice people skimmed the plans, and the plan-plus-PR review burden *doubled* reading time rather than reducing it. Worse, the plan and the code drifted, so by review time they described different things.

His resolution is the strongest possible version of disposability: **treat all planning docs as tactical execution artifacts — use once, throw out, regenerate from scratch next time.** Tokens are cheap; human time is expensive; a stale research doc reused against a changed codebase is actively dangerous. This is also why he is skeptical of [[spec-driven-development|evergreen specs]] — the code is the only durable source of truth, and anything that has to be kept in parity with it stops being worth the effort.

## Thread

- [[the-agent-workflow]] — Plan disposability as a key discipline in the AFK loop
- [[the-human-lever]] — The human decides when to regenerate, not the agent
- [[the-slop-problem]] — Stale plans are a slop source; regenerating prevents compounding drift

## Related

- [[backpressure]] — Backpressure catches bad implementations; plan disposability catches bad plans
- [[afk-agent]] — AFK agents need disposable plans to avoid accumulating errors
- [[smart-zone-dumb-zone]] — The same reset principle applied to coordination state
- [[compounding-booboos]] — Stale plans compound booboos across iterations
- [[geoffrey-huntley]] — Originator of the plan disposability principle
- [[ralph-loop]] — Plan disposability as a core discipline of the Ralph loop
- [[research-plan-implement]] — Dex's RPI workflow; its retrospective is the strongest evidence for plan disposability
- [[dex-horthy-agentic-engineering]] — Planning-as-leverage vs. plan disposability is a live tension in Dex's worldview
- [[doc-rot]] — Doc rot is why plan disposability matters: stale plans are a vector for doc rot
- [[software-factory]] — Fresh plans per session as a persistence strategy for the software factory architecture

## Sources

- `raw/how-to-ralph-wiggum.md` — Plan regeneration as a core Ralph discipline
- `raw/ralph-wiggum-playbook.md` — "Treat IMPLEMENTATION_PLAN.md as coordination state, not a contract"
- `raw/yt-context-engineering-with-dex-horthy.md` — Dex's RPI retrospective: detailed plans as anti-leverage (doubled review time), and the throw-out-and-regenerate resolution (1:02:53–1:06:16).
