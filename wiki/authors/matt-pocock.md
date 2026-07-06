---
title: Matt Pocock
created: 2026-04-24
updated: 2026-07-06
sources: ["raw/yt-ai-coding-for-real-engineers.md", "raw/yt-why-llms-hallucinate.md", "raw/yt-claude-code-feature-build.md", "raw/yt-software-fundamentals-matter-more-than-ever-matt-pocock.md", "raw/yt-how-to-de-slop-a-codebase-ruined-by-ai-with-one-skill.md", "raw/yt-slop-watch-ideation.md", "raw/yt-full-walkthrough-workflow-for-ai-coding-matt-pocock.md", "raw/yt-building-great-agent-skills-the-missing-manual.md"]
tags: ["typescript", "ai-engineering", "author"]
---

# Matt Pocock

> TypeScript expert turned AI-engineering advocate. Champions a return to software fundamentals — deep modules, shared design concepts, and verification loops — as the key to making AI-assisted development actually work. Creator of Slop Watch, a self-hosted coding agent observability platform.

Matt Pocock is a TypeScript expert, educator, and developer advocate known for his deep dives into the TypeScript type system. Recently, he has focused on the intersection of AI and software engineering, advocating for the return to fundamentals as a way to manage the complexity introduced by LLMs.

## Key Concepts Championed
- [[grey-box-engineering]] — Humans design interfaces; agents implement.
- [[smart-zone-dumb-zone]] — Managing LLM context quality.
- [[tracer-bullets]] — Vertical slices over horizontal layers.
- [[deep-vs-shallow-modules]] — Module design for agent navigation.
- [[ubiquitous-language]] — Ensuring human and agent use the same terminology.
- [[afk-agent]] — Leveraging background agents for implementation tasks.
- [[improve-codebase-architecture]] — Systematic scans for deepening opportunities.
- [[seams-and-adapters]] — Where modules meet and how they can be substituted.
- [[locality-and-leverage]] — The two payoff properties of deep modules.
- [[slop-watch]] — His self-hosted coding agent observability platform.
- [[agent-observability]] — Sessions as DAGs of turns, per-session listener pattern, per-agent adapters.
- [[strategic-vs-tactical-programming]] — Human as General/strategist, AI as Sergeant/tactician.
- [[ai-design-loop]] — The Grill Me skill and Destination/Journey design process.
- [[shared-design-concept]] — Making the "theory of the code" explicit for AI participation.
- [[verification-loop]] — TDD and "outrunning your headlights" as verification discipline.
- [[doc-rot]] — Completed PRDs become stale and mislead future agents; delete or mark as closed.
- [[sandcastle]] — TypeScript library for parallel AFK agent loops in Docker sandboxes.

## Related

- [[dhh]] — Peer in AI-native engineering; shares emphasis on design over implementation.
- [[dex-horthy]] — Shares focus on rigor and verification; differs in emphasis on code intelligence over aesthetics.
- [[mario-zechner]] — Peer in agent tooling; pi and Matt's workflows are complementary.
- [[afk-agent]] — Primary advocate of the HITL/AFK split (Docker "Sandcastle" runner).
- [[tracer-bullets]] — Championed tracer bullets for AI engineering.
- [[ubiquitous-language]] — Primary advocate of ubiquitous language in AI workflows.
- [[ralph-loop]] — Docker-based issue-driven Ralph variant (Sandcastle).
- [[hallucination]] — Originated the intrinsic/extrinsic hallucination taxonomy used in this wiki.
- [[improve-codebase-architecture]] — Created the skill for systematic architecture review.
- [[seams-and-adapters]] — Introduced seams and adapters as the architecture vocabulary for de-slopping.
- [[locality-and-leverage]] — Defined locality and leverage as the goals of deepening.
- [[slop-watch]] — His real-time-streamed ideation process: parallel research via sub-agents, DDD-driven ubiquitous language definition, per-session listener architecture.
- [[vibes-based-engineering]] — Identifies specs-to-code as "vibe coding by another name"; each recompilation degrades code quality.
- [[chris-parsons]] — Extended Ralph loops into skills and ticket-based loops; converges on plan-heavy workflow philosophy
- [[sandcastle]] — His parallel AFK agent orchestration library (planner/implementer/reviewer/merger pipeline)
- [[doc-rot]] — Primary advocate for deleting completed PRDs to prevent stale documentation from misdirecting agents
- [[leading-words]] — Originator of the leading-words steering technique: dense phrases the agent echoes in its reasoning traces, shaping behavior with built-in verification
- [[skill-hell]] — Named the third developer hell (after tutorial hell and framework hell): skills proliferate faster than evaluative capacity; his four-part checklist is the proposed exit

## Sources
- `raw/yt-software-fundamentals-matter-more-than-ever-matt-pocock.md` — Grey-box engineering, smart-zone/dumb-zone, deep vs shallow modules, AI design loop, software entropy, outrunning headlights, Grill Me skill
- `raw/yt-ai-coding-for-real-engineers.md` — HITL/AFK split, tracer bullets, context management
- `raw/yt-why-llms-hallucinate.md` — Intrinsic/extrinsic hallucination taxonomy
- `raw/yt-claude-code-feature-build.md` — Ubiquitous language workflow, AFK agents (Ralph), PRD to Issues pipeline
- `raw/yt-how-to-de-slop-a-codebase-ruined-by-ai-with-one-skill.md` — The improve-codebase-architecture skill, general/sergeant metaphor, seams/adapters vocabulary.
- `raw/yt-slop-watch-ideation.md` — Greenfield project ideation: parallel research agents, Grill Me, DDD domain modeling, Slop Watch architecture decisions.
- `raw/yt-full-walkthrough-workflow-for-ai-coding-matt-pocock.md` — Full end-to-end workshop: Grill Me → PRD → Kanban DAG → Sandcastle parallel AFK loops → QA; doc rot, push vs pull agent instructions, AI defaults to shallow modules.
- `raw/yt-building-great-agent-skills-the-missing-manual.md` — "Building Great Agent Skills: The Missing Manual" (AI Engineer World's Fair 2026). The four-part skill design checklist (trigger, structure, steering, pruning); user-invoked vs model-invoked load tradeoff; steps + reference + branches + external references; leading words as the primary steering lever; leg work via hidden future goals (split-skill technique); no-ops, sediment, single source of truth. Names [[skill-hell]] as the diagnosis the checklist responds to.
