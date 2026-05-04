---
title: Plan vs Review
created: 2026-05-02
updated: 2026-05-04
sources:
  - "raw/Software Engineering Is Becoming Plan and Review — Louis Knight-Webb, Vibe Kanban - youtube.com.md"
  - "raw/Can an AI Out-Plan a Senior Engineer - youtube.com.md"
tags: [concept, workflow, agent-design, human-in-the-loop]
---

# Plan vs Review

> A tunable axis in agent-assisted development: invest time upfront in detailed plans and specs (plan-heavy) to reduce review burden, or minimize planning and spend more iterative rounds reviewing and correcting (review-heavy). [[louis-knight-webb|Louis Knight-Webb]]'s quantified rule: 5 minutes of planning saves 30 minutes of reviewing.

## The Two Modes

The rise of capable coding agents doesn't eliminate human involvement — it displaces time previously spent writing code into planning and reviewing. The two endpoints of this tradeoff are:

**Plan-heavy** — Write a comprehensive spec or plan document. Interrogate the agent until it has exhausted all questions about the work. The agent then produces a higher-quality first pass with fewer errors. Benefits: fewer review rounds, less back-and-forth. Cost: more upfront thinking time, which requires the human to have already done the cognitive work.

**Review-heavy** — Give the agent a rough goal and let it iterate. Work through multiple rounds of corrections: style fixes, edge case handling, architectural drift. Benefits: faster start, less planning overhead. Cost: more total human time because review is interrupt-driven and requires context-switching between sessions.

Knight-Webb's heuristic: investing in planning is always preferable because it saves human time — **5 minutes of planning saves 30 minutes of reviewing.** Switching back and forth with a half-finished agent output is more taxing than doing the thinking upfront.

## Empirical Support: 50%+ Design Time

The Boundary AI livestream provides real-world validation: the BAML team at Boundary ML spends **50%+ of their time on design docs** (BEEPs), not implementation. Fib, the BAML language engineer, describes spending 4 days of pure design on the threading system before writing any code. The implementation after a thorough design doc is often one-shot.

This aligns directly with Knight-Webb's quantified heuristic. At Boundary ML, the plan-heavy approach is not just preferred — it's the default for all non-trivial features. The design doc is treated as the primary output; implementation is a downstream mechanical step that AI handles.

> "I spend a lot of time writing design docs and plans for almost all of my work now. I would say it's more than 50%. Most of my time I spend writing docs, coming up with plans. I heer on the side of more detail." — Fib, Boundary AI

The qualitative claim behind the quantitative allocation: good design enables one-shot implementation. The design doc absorbs complexity so the implementation doesn't have to.

## When to Use Each Mode

The feature type matrix provides concrete guidance:

| | Features | Refactoring / Migrations |
|---|---|---|
| **Frontend** | Review-heavy — too stateful, too many edge cases (interactions, animations, styles, state bugs) | Plan-heavy — well-defined transformations, easy to spec |
| **Backend** | Plan-heavy — test-driven development works naturally; clear input/output boundaries | Plan-heavy — should be fully hands-off |

Frontend feature development is the hardest case for plan-heavy because it resists exhaustive specification. The infinite combinations of states, user interactions, and visual edge cases mean even a detailed plan will miss things. The human stays in the loop, reviewing outputs iteratively.

Everything else (backend features, any migration, any refactoring) can and should be plan-heavy. Well-defined interfaces, deterministic transformations, and test-driven specifications let the agent run autonomously.

## Relationship to Existing Concepts

The plan-vs-review axis is a concrete operational dimension of [[the-human-lever|the human lever]] — it quantifies *how* the human's strategic role manifests. It also directly feeds [[the-agent-workflow|the agent workflow]], where the HITL phase is the plan-heavy moment and the AFK phase is where the plan is executed and then reviewed.

The distinction parallels [[grey-box-engineering]]: plan-heavy corresponds to owning the boundaries (defining what the box should do), while review-heavy corresponds to looking inside the box to verify it was built correctly. The tradeoff is about where you invest the time — specifying interfaces upfront or inspecting implementations after.

## Thread

- [[the-agent-workflow]] — The plan-vs-review decision is the first choice in every agent session
- [[the-human-lever]] — The quantified planning investment is a concrete expression of human design authority

## Related

- [[louis-knight-webb]] — The author who articulated this framework
- [[the-agent-workflow]] — Plan HITL, execute AFK, review outputs
- [[the-human-lever]] — The human's strategic role: planning before delegating
- [[grey-box-engineering]] — Planning defines the box; review inspects its contents
- [[afk-agent]] — AFK execution depends on plan-heavy specs
- [[verification-loop]] — The review side of the tradeoff
- [[vibes-based-engineering]] — Review-heavy without structure is vibes; plan-heavy is the alternative
- [[fighting-slop-with-slop]] — The BEEPs workflow (50%+ design time) empirically validates the plan-heavy approach.
- [[the-slop-problem]] — Plan-heavy design is a direct slop prevention strategy; review-heavy without verification accelerates it.

## Sources

- `raw/Software Engineering Is Becoming Plan and Review — Louis Knight-Webb, Vibe Kanban - youtube.com.md` — The full talk establishing the framework, quantified heuristic, and feature type matrix.
- `raw/Can an AI Out-Plan a Senior Engineer - youtube.com.md` — Real-world validation: 50%+ design time at Boundary ML; 4 days of pure design on threading; one-shot implementation enabled by thorough design
