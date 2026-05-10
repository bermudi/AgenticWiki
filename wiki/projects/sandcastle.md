---
title: Sandcastle
created: 2026-05-05
updated: 2026-05-05
sources:
  - "raw/yt-full-walkthrough-workflow-for-ai-coding-matt-pocock.md"
tags: [project, agent-orchestration, afk, parallelization]
---

# Sandcastle

> [[matt-pocock|Matt Pocock]]'s TypeScript library for running parallel AFK agent loops inside Docker sandboxes — a planner/implementer/reviewer/merger pipeline that turns a Kanban board into a directed acyclic graph of concurrently executing agents.

Sandcastle is Matt's answer to the question: once you have a Kanban board of independently grabbable issues, how do you run multiple agents against it in parallel without chaos?

## The Pipeline

Sandcastle orchestrates four agent roles in sequence:

1. **Planner** — reads the issue backlog, identifies which issues can run in parallel (based on blocking relationships), and selects a batch
2. **Implementer** (per-issue, parallel) — each selected issue gets its own Docker-sandboxed agent that creates a work tree, runs the implementation prompt, and commits
3. **Reviewer** (per-issue, parallel) — each branch is reviewed by a separate agent instance (often using a stronger model like Opus for reviewing what Sonnet implemented); coding standards are **pushed** to the reviewer context
4. **Merger** — takes all reviewed branches and merges them, resolving any conflicts with types and tests

The key insight: **parallelization happens at issue granularity**. The planner examines the Kanban DAG, finds independent issues, and spawns one sandbox per issue. This is a significant evolution from the sequential [[ralph-loop|Ralph Loop]] — instead of one agent at a time picking the next task, multiple agents work on different branches simultaneously.

## Push vs Pull for Agent Instructions

Matt distinguishes two strategies for instructing agents:

- **Pull** (for implementers): [[agent-skills|Skills]] live in the repo with description headers. The implementer agent loads a skill when it needs it — Matt describes this as giving the agent "an opportunity to pull more information" rather than pre-loading everything into context.
- **Push** (for reviewers): Coding standards are pre-loaded into the reviewer's context. The reviewer needs all the rules up front to compare them against the implementation — Matt pushes coding standards to the reviewer, where the implementer pulls them as skills.

## Relationship to Ralph Loop

Sandcastle is the parallelized, Docker-sandboxed evolution of the [[ralph-loop|Ralph Loop]] — replacing the sequential "pick next task, implement, exit, restart" loop with a multi-agent orchestration pipeline. The underlying principle is the same: fresh context per task, tasks defined as issues, and the human retains authority over what gets shipped (through QA and code review — Sandcastle's reviewer agent is automated and the merger handles conflicts, but the human gates at QA).

## Thread
- [[the-agent-workflow]] — Sandcastle operationalizes the AFK implementation phase at scale

## Related
- [[ralph-loop]] — The sequential ancestor; Sandcastle parallelizes and sandboxes it
- [[afk-agent]] — Sandcastle is the orchestration layer for parallel AFK agents
- [[ai-design-loop]] — The PRD-to-Kanban phase that feeds Sandcastle's planner
- [[improve-codebase-architecture]] — Produces the architectural issues Sandcastle implements
- [[matt-pocock]] — Creator

## Sources
- `raw/yt-full-walkthrough-workflow-for-ai-coding-matt-pocock.md` — Full demonstration of the pipeline: planner, implementer, reviewer, merger stages.
