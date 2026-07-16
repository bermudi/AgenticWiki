---
title: Research / Plan / Implement
created: 2026-07-16
updated: 2026-07-16
sources:
  - raw/yt-context-engineering-with-dex-horthy.md
  - raw/yt-chroma-context-engineering-episode-1-dex-horthy-dexhorthy.md
unaudited_marginal: 0
tags: [concept, workflow, context-engineering, planning, agent-loops]
---

# Research / Plan / Implement

> [[dex-horthy|Dex Horthy]]'s signature workflow for hard problems in complex codebases — widely adopted for Claude Code from mid-2025. The structure: **research** the codebase into a compressed doc, **design** the end state with a human in the loop, **plan** the steps, **implement**. Each phase runs in a fresh context window and produces a compact artifact for the next — so the whole workflow is [[context-engineering|intentional compaction]] applied as a lifecycle. The critical lesson from a year of running it: the plans were "terrible" and gave *anti-leverage*; RPI docs are tactical execution artifacts, used once and thrown away.

## The Phases

Each phase exists because models have a distinct shortcoming in it, and compaction into a fresh context window is how you keep every phase in the [[smart-zone-dumb-zone|Smart Zone]].

### 1. Research
Read the codebase — typically with parallel subagents — and compress the result into a markdown doc. A ~100,000-token codebase becomes a ~10,000-token summary of "how this system works and how the pieces connect." Dex treats this as hands-off: models are good at *explaining* an existing codebase; they're bad at *finding bugs in* one. You don't tell the agent what you're about to work on; you just ask it to explain the relevant systems.

### 2. Design (human-in-the-loop)
Current state → desired end state → open design questions. **This is the phase that most demands a human**, because models are mediocre at architecture and program design — they make decisions that are sometimes right and sometimes wrong, and program design (where the interfaces are, where the seams go, how dependency injection is done) is exactly the thing that determines whether the codebase gets more or less maintainable over the next three months.

### 3. Plan
Break the path from current to desired into steps. (See "Horizontal vs. vertical" below — this is where human taste most changes the output.)

### 4. Implement
Execute the plan in a fresh context window carrying the compressed research + design + plan.

## Intentional Compaction Is the Building Block

RPI is not project management dressed up for agents — it is [[context-engineering]] operationalized as a lifecycle. Each phase's output is a *compaction*: research compresses the codebase, design compresses the intent, planning compresses the steps. Carrying those small verified artifacts into fresh context windows is how you do as much work as possible in the Smart Zone. Strip the compaction and RPI collapses into one long, degrading session.

## The Retrospective: Plans Were Anti-Leverage

After a year of running RPI (and recommending that people read the plans), Dex's mature verdict is that **the original plans were terrible**. They enumerated every line of code that would change, in diff blocks. Consequences:

- People skimmed the plans rather than reading them, so the plan stopped functioning as a steering mechanism.
- Reviewing the plan (20 min) *plus* reviewing the PR (20 min) **doubled** reading time instead of reducing it — anti-leverage.
- The plan and the code drifted, so the two were different by the time you read them.

The fix: treat every RPI doc as a **tactical execution artifact** — use it for the task at hand, then throw it out and regenerate from scratch next time. Tokens are cheap; human time is expensive; a stale research doc reused against a changed codebase is actively dangerous. This is the empirical grounding for [[plan-disposability]], and it is a direct tension with [[spec-driven-development|evergreen specs]] (see below).

## Horizontal vs. Vertical Plans

A concrete planning failure mode Dex names: **models default to horizontal plans.** Asked to build a feature, they plan "database layer → services → API → frontend" — every layer touched, nothing testable until the end, so you're 2,000 lines in before anyone can tell whether it works.

Humans build **vertical slices**: mock API with fake data → get the frontend roughly right → build the real services layer and wire data through → make the DB migration → add business logic → add error handling. Each slice is independently testable and reviewable; the human would rather read five small verifiable diffs than one 2,000-line one. Injecting this taste is the human's job in the plan phase.

## Distinct From Spec-Driven Development

RPI is often called "spec-driven dev" and the terms get muddled. Dex draws the line: for some people SDD just means "I use markdown files while coding and forget what's in them." The evergreen-spec vision — maintain parity between specs and code, treat code as compiling specs — **never materialized** in his experience. The [[spec-code-triangle]] drift problem (two sources of truth) is unsolved in practice. RPI's docs are explicitly *not* evergreen; they are disposable. The code is the only durable source of truth.

## Thread

- [[dex-horthy-agentic-engineering]] — RPI is the workflow spine of Dex's worldview; its retrospective is the source of his planning nuance
- [[the-agent-workflow]] — RPI is a concrete instantiation of the HITL→AFK cycle with compaction at each handoff
- [[intent-to-code]] — RPI sits on the plan-heavy side; the disposable-docs lesson pressures the plan-as-contract position

## Related

- [[context-engineering]] — RPI is compaction-as-lifecycle
- [[smart-zone-dumb-zone]] — Fresh context per phase keeps each phase in the Smart Zone
- [[plan-disposability]] — The retrospective deepens and exemplifies this principle
- [[plan-vs-review]] — RPI is plan-heavy; the anti-leverage finding is evidence against over-investing in detailed plans
- [[spec-driven-development]] — RPI's disposable docs are the counter-position to evergreen specs
- [[spec-code-triangle]] — The drift problem is why RPI docs are thrown away
- [[fresh-context-subagents]] — Fresh context per phase is the same isolation principle
- [[dex-horthy]] — Originator
- [[humanlayer]] — Productizes RPI as collaborative planning checkpoints

## Sources

- `raw/yt-context-engineering-with-dex-horthy.md` — The original RPI definition and the research→100k-to-10k compaction (1:01:16–1:02:53), the "plans were terrible" / anti-leverage retrospective (1:02:53–1:03:31), the disposable-docs / tokens-are-cheap principle (1:04:59–1:06:16), intentional compaction as the building block (1:06:18–1:08:24), horizontal vs. vertical plans (1:08:25–1:09:34), the SDD-didn't-work verdict (1:03:33–1:04:16).
- `raw/yt-chroma-context-engineering-episode-1-dex-horthy-dexhorthy.md` — The earlier articulation of RPI as a Claude Code workflow.
