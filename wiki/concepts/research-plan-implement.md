---
title: Research / Plan / Implement
created: 2026-07-16
updated: 2026-08-13
sources:
  - raw/yt-context-engineering-with-dex-horthy.md
  - raw/yt-chroma-context-engineering-episode-1-dex-horthy-dexhorthy.md
  - raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md
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

## August 2026: Leverage Over Shape, System vs. Program Design

The August 2026 Wortmann interview deepens the retrospective into an operating doctrine:

**Spec shape doesn't matter; spec leverage does.** "I don't give two damns how your spec is shaped. It should give you leverage. It should let you read a 200-line markdown file and re-steer rather than having to read 2,000 lines of code and re-steer later where it's more work for you to load it into context, more work for the model to debug or make changes, 'cause it's already committed down one path." ([`raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md`](../raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md), 0:00–0:10, 29:48–30:01). The leverage test replaces the template debate: if reading the doc lets you intervene at the 50,000-foot, 25,000-foot, and 10,000-foot levels before reviewing code on the ground, it is doing its job; if it tries to guarantee every line is written a particular way it has drifted into being code.

**System design vs. program design.** A lot of teams stopped at system design — "Mermaid charts, here's the modules, here's the new endpoints, exactly as specified" — and still got garbage: "leaky abstractions, tramp data everywhere" ([`raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md`](../raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md), 14:33–14:50, 15:15–15:28). The next layer that actually moves quality is *program* design — interfaces, test seams, dependency injection, and how things compose. This reframes the failure: following an architecture doc to the letter is not sufficient; the code can still be garbage if the program-design seams are wrong. Dex notes the effect is especially stark on the front end — models are strong at API endpoints, CRUD, and even write-ahead logs, but still can't reason well about React ([`raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md`](../raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md), 15:49–16:08), which aligns with the [[plan-vs-review]] matrix finding that front-end features are review-heavy.

**Tactical specs live off the code, not in it.** HumanLayer's first-year answer to "where do the specs live?" is a symlinked side-repo: every spec write syncs to a separate GitHub repo, every change pushes a new version, no merge, Git treated like Google Docs/S3, accessible but not `git log` history. When the feature ships the docs are archived; they are rarely pulled back ([`raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md`](../raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md), 33:32–35:02). The alternative — checking specs into the code and maintaining parity — is the exact "two sources of truth" trap that makes evergreen SDD feel final, approved, and expensive to rewind. Bugs tied to several specs and bugs that are about internals rather than spec state are the cases that break the checked-in spec model.

**The steering sweet spot.** The first attempt most teams make is an hour chasing a perfect spec to avoid re-coding; Dex coaches to 10 minutes for ~80% and to be comfortable rewinding: a plan that is 20% wrong should be recoverable in-session, 50% wrong should be thrown out, and that requires a speculative posture where you *expect* surprises and optimize for probability of recovery, not proof of correctness. If you didn't like the design after two hours of work, reset and rebuild from scratch — the understanding is the hard part, and the second build is always better code ([`raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md`](../raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md), 32:30–33:11, 37:58–38:06). This is plan disposability operationalized as a leverage calculation, and it is the same probabilistic intuition behind the RTS/fog-of-war analogy Dex uses for LLM intuition.

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
- `raw/yt-what-actually-gets-you-2-3x-with-ai-coding-dex-horthy.md` — Leverage over shape ([0:00]), architecture doc followed to the letter but code still garbage with leaky abstractions/tramp data ([14:33]), program design (interfaces/test seams/DI) and React-specific weakness ([15:42]–[16:08]), the 200-line vs 2,000-line steering economics ([29:48]–[30:50]), tactical docs in a symlinked side-repo and the "two sources of truth" critique ([33:21]–[35:02]), the 10-minutes-for-80% and comfortable-rewind doctrine and the fog-of-war / LLM intuition framing ([32:30]–[38:06]).
