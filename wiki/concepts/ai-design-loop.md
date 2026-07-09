---
title: AI Design Loop
created: 2026-04-24
updated: 2026-07-06
sources: ["raw/yt-ai-coding-for-real-engineers.md", "raw/yt-claude-code-feature-build.md", "raw/yt-software-fundamentals-matter-more-than-ever-matt-pocock.md", "raw/yt-full-walkthrough-workflow-for-ai-coding-matt-pocock.md", "raw/yt-building-great-agent-skills-the-missing-manual.md"]
unaudited_marginal: 0
tags: ["ai-workflow", "software-design"]
---

# The AI Design Loop

> The process of iterating with an agent to reach a shared understanding before delegating implementation.

> [!note] Departure: Alignment-First vs Plan-as-Contract
> [[matt-pocock|Matt Pocock]] departs from [[plan-vs-review|plan-heavy]] workflows: the PRD is a disposable destination hint, not a contract. He does not review the PRD — the grilling session produced alignment. Quality lives in QA, not spec precision. See [[intent-to-code]] for the full comparison.

## The Strategy: Destination and Journey
[[matt-pocock|Matt Pocock]] defines the design process in two phases:

1.  **The Destination (The PRD)**: Defining *what* we are building. This is a high-stakes, human-led activity. Use tools like `grill-me` to ensure the "Shared Design Concept" is solid.
2.  **The Journey (The Kanban/Issues)**: Breaking the Destination into granular, actionable steps. Each step should be small enough to stay in the [[smart-zone-dumb-zone]].

## Breaking the "Vibe Coding" Cycle
[[vibes-based-engineering|Vibe Coding]] (prompting without a plan) leads to the "Dumb Zone" as the agent's context fills with messy iterations. To break this:

- **HITL Planning**: Be Human-In-The-Loop during the Destination and Journey phases.
- **AFK Execution**: Once the Journey is clear, let the agent work Away-From-Keyboard.
- **Clearing Context**: Instead of compacting history (which leads to [[document-degradation|document degradation]] — the LLM silently corrupting prior decisions), clear the session and restart with the PRD and the current Kanban task. This also avoids [[doc-rot|doc rot]]: if you left the old PRD in the repo, the agent might treat it as authoritative even after the code has diverged.

## The Grill-Me Session in Practice

[[matt-pocock|Matt Pocock]] demonstrates the "Destination" phase as a structured Q&A session using a `grill-me` skill. The mechanics:1. **Human dictates rough ideas**: No polish needed — woolly, half-formed requirements are fine. The human explains both the *what* and the *why* (the why is critical — without it, the agent can't suggest alternatives).
2. **Agent explores the codebase**: Uses subagents to read schemas, services, and tests. The parent agent receives only a summary — token-efficient exploration.
3. **Agent asks precise questions**: Pushes for specificity on ambiguous requirements, surfaces edge cases the human hasn't considered (e.g., "should points be retroactive?"), and forces decisions (e.g., "what's the progression curve for levels?"). The agent may ask 20–80 questions before reaching alignment.
4. **Human drives or agent drives**: The skill is flexible — sometimes the agent leads with questions, sometimes the human directs with specific decisions.
5. **Convergence to a PRD**: The session produces a Product Requirements Document with user stories (typically 15–20), implementation decisions, and testing decisions. The hard part is extracting ideas from the human brain; the LLM does the synthesis.

The session produces not just requirements, but also updates the [[ubiquitous-language]] with new terms — ensuring the vocabulary for implementation is agreed before any code is written.

### Split-Skill Technique: Grill With Docs → 2PRD

Pocock's later skill-design work ("Building Great Agent Skills: The Missing Manual") reframes the grilling/planning flow as an instance of the **split-skill technique** for increasing leg work. The original `plan-mode` skill had two steps — ask clarifying questions, then create a plan — and the agent consistently under-invested in clarifying questions because it could see the plan was the real goal and rushed toward it.

The fix: split into two separate skills — `grill-with-docs` (clarifying questions only) and `2prd` (planning only). When `grill-with-docs` runs, the agent's only visible goal is asking good questions — it cannot rush to a plan because the plan step is in a different skill it cannot yet see. Hiding the future goal increases leg work on the current step. See [[agent-skills]] → Pocock's Skill Design Checklist → Steering, and [[leading-words]] for the companion steering lever.

## Don't Review the PRD — QA Is Where Taste Enters

Matt makes a deliberate choice: **he does not review the PRD** after the grilling session produces it. His reasoning:

- **Alignment was already achieved** during the grilling session. He already shares the design concept with the agent.
- **Summarization is LLMs' strongest capability**. Reviewing the PRD is just testing the LLM's summarization ability — low value.
- **The real work happens at QA**. The PRD is a destination hint; QA is where the human imposes taste, finds bugs, and files corrective issues. Over-indexing on the PRD is optimizing the wrong stage.

This is a deliberate inversion of the specs-to-code philosophy: instead of refining the spec until it's perfect and then compiling to code, you get aligned quickly, move to implementation, and put your verification energy into QA.

## Push vs Pull for Agent Instructions

Matt distinguishes two strategies for instructing agents during the design loop:

- **Pull** (for implementers): [[agent-skills|Skills]] are repo-side resources the agent discovers and loads when needed. Like a developer reaching for documentation. Keeps implementer context lean.
- **Push** (for reviewers): Coding standards are pre-loaded into the reviewer agent's context. The reviewer needs all rules up front to compare against the implementation.

## Doc Rot in the Design Loop

Keeping completed PRDs in the repo creates [[doc-rot|doc rot]]: future agent sessions discover stale PRDs and pattern-match against outdated assumptions. The code has moved on; the old PRD hasn't. Matt marks PRDs as closed (or deletes them) after implementation to prevent this.

## Thread
- [[the-agent-workflow]] — The design loop as the planning phase of the agent workflow
- [[the-slop-problem]] — Skipping the design loop is a primary source of slop
- [[intent-to-code]] — The alignment-first position on the intent-to-code axis

## Related

- [[grey-box-engineering]] — The implementation phase of the loop.
- [[smart-zone-dumb-zone]] — Managing the technical limits of the loop.
- [[tracer-bullets]] — The first "Journey" step for any new feature.
- [[verification-loop]] — The iterative process of refining the journey.
- [[vibes-based-engineering]] — Why a structured loop is necessary.
- [[shared-design-concept]] — The design loop produces the shared concept.
- [[ubiquitous-language]] — The language that emerges from the design loop.
- [[malleable-agents]] — Agents can be adapted during the design loop.
- [[improve-codebase-architecture]] — The skill that applies the design loop to architecture: explore, grill, propose.
- [[matt-pocock]] — Originated the Grill Me skill and the Destination/Journey framework.
- [[fighting-slop-with-slop]] — The BEEPs workflow extends the design loop to organizational scale: AI handles the tooling infrastructure around the design process.
- [[doc-rot]] — The risk of keeping completed PRDs in the repo; why the design loop produces ephemeral artifacts.
- [[sandcastle]] — The parallel AFK implementation pipeline that consumes the Kanban board produced by the design loop.

- [[agent-skills]] — Skills are the tools that execute the implementation phase of each design loop iteration
- [[leading-words]] — The companion steering lever to the split-skill technique; "vertical slice" is the canonical leading word for the journey phase

## Sources
- `raw/yt-ai-coding-for-real-engineers.md`
- `raw/yt-claude-code-feature-build.md`
- `raw/yt-software-fundamentals-matter-more-than-ever-matt-pocock.md` — Grill Me skill as the mechanism for building a shared design concept; the skill went viral (13k stars) by turning the AI into an adversarial interviewer.
- `raw/yt-full-walkthrough-workflow-for-ai-coding-matt-pocock.md` — Full workshop demonstrating Grill Me → PRD → Kanban; "don't review the PRD" philosophy; push vs pull instruction strategy; doc rot in the design loop.
- `raw/yt-building-great-agent-skills-the-missing-manual.md` — The split-skill technique: plan-mode split into `grill-with-docs` (clarifying questions) and `2prd` (planning) so the agent cannot see the future goal and under-invest in the current step; the design loop's grilling phase as an instance of hiding future goals to increase leg work.
