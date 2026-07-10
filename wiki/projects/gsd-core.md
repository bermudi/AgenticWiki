---
title: GSD Core
created: 2026-07-10
updated: 2026-07-10
sources:
  - raw/gsd-core-opengsd-spec-driven-framework.md
unaudited_marginal: 0
tags: [project, open-source, spec-driven-development, agent-workflow, context-engineering, multi-agent]
---

# GSD Core

> Open GSD's spec-driven workflow engine — a lightweight meta-prompting and context-engineering framework that sits on top of any AI coding runtime. Five-step phase loop (Discuss → Plan → Execute → Verify → Ship) with a `.planning/` directory of persistent Markdown/JSON artifacts, fresh-context specialist subagents, and 65+ slash commands. Solves context rot, session amnesia, and verification gaps.

## Overview

GSD Core is the flagship tool in the Open GSD suite (alongside GSD Pi and GSD Browser). It structures every milestone as a repeatable five-step loop, where each step produces artifacts that the next step consumes. Nothing is held in conversation memory — everything is written to disk in `.planning/` as plain Markdown and JSON. The framework is runtime-agnostic: it installs its commands, agents, and hooks into whichever AI coding runtime you use (Claude Code, Cursor, Gemini CLI, etc.).

## The Problem It Solves

Three forces cause AI-coding setups to degrade silently as projects grow:

1. **Context rot** — as a conversation grows, the AI fills its context window with accumulated back-and-forth. Recall weakens, reasoning degrades, and output quality quietly drops without any warning to the user or the model. The model has not changed — its context has degraded.
2. **No shared memory between sessions** — start a new session and the AI knows nothing about yesterday's decisions, architecture choices, or already-ruled-out bugs.
3. **No verification that code works** — most AI coding flows end at "execution complete." Nothing checks that what was built satisfies requirements, passes tests, or matches the approved design.

GSD Core solves all three: heavy work runs in [[fresh-context-subagents|fresh-context subagents]], structured artifacts persist across sessions, and the Verify step walks through what was built before declaring done.

## The Five-Step Phase Loop

Every phase moves through these steps in order:

1. **Discuss** — capture implementation decisions before anything is planned. Produces `CONTEXT.md` with a structured `<decisions>` block.
2. **Plan** — run parallel research agents (4 instances), decompose work into atomic tasks, verify the plan fits a fresh context window. Produces `PLAN.md` files, each sized for a single executor context window.
3. **Execute** — run plans in parallel execution waves; each executor starts with a clean context window of up to 200K tokens. Produces `SUMMARY.md` per plan and atomic git commits.
4. **Verify** — walk through what was built, run tests, diagnose gaps, produce fix plans before declaring done. Produces `VERIFICATION.md` with PASS/FAIL verdict and evidence.
5. **Ship** — create the PR, archive phase artifacts, move to the next phase.

## Spec-Driven Development Pipeline

GSD Core applies a spec-driven approach where every requirement is written down before code, and every artifact gates the next stage:

```
User vision
    → REQUIREMENTS.md (scoped, numbered: REQ-001, REQ-002, ...)
    → ROADMAP.md (phases mapped to requirement IDs — traceability guaranteed)
    → CONTEXT.md (implementation preferences per phase)
    → RESEARCH.md (ecosystem research per phase)
    → PLAN.md (atomic execution tasks referencing requirements)
    → SUMMARY.md (what was built, deviations)
    → VERIFICATION.md (goal-backward check against requirements)
    → UAT.md (human acceptance testing)
```

The plan-checker enforces that every plan covers the requirements it claims to cover. The verifier enforces that every requirement mapped to the phase is actually implemented. If a requirement is not covered, the phase does not advance.

## Fresh-Context Subagent Architecture

GSD Core's primary defense against context rot is architectural: heavy work never runs in the main session. Thin orchestrators spawn specialist subagents, each in its own isolated context window. When you run `/gsd-plan-phase 1`, the orchestrator spawns:

1. Four researcher subagents — each with a fresh context, each focused on one research dimension
2. A synthesizer subagent — reads only the four research outputs
3. A planner subagent — reads only PROJECT.md, REQUIREMENTS.md, CONTEXT.md, RESEARCH.md
4. A plan-checker subagent — reads only the generated plans and phase context

None of these agents carries the weight of conversation history. The result arrives in the main session without the accumulated cost of the work that produced it. See [[fresh-context-subagents]] for the general pattern.

### Agent Categories and Least Privilege

| Agent | Can write code | Can search web | Can edit files |
|------|----------------|----------------|----------------|
| Researchers | No | Yes | No |
| Planner | No (plans only) | No | No |
| Plan-checker | No | No | No |
| Executor | Yes | No | Yes |
| Verifier | No | No | No |
| Codebase mapper | No | No | No |
| Debugger | No | Yes | Yes |
| Security auditor | No | No | No |

Checkers, mappers, and auditors are strictly read-only against implementation source — they analyze and report but never change code.

## Planning Artifacts as Cross-Session Memory

The `.planning/` directory is the project's persistent memory. Every artifact is plain Markdown or JSON — readable by humans, writable by agents, committable to git. No database, no server, no external service.

**Root-level:** `PROJECT.md` (vision + constraints), `REQUIREMENTS.md` (numbered, tiered: v1/v2/out-of-scope), `ROADMAP.md` (phases mapped to requirement IDs), `STATE.md` (living memory — current position, decisions, blockers), `continue-here.md` (cross-session handoff).

**Per-phase:** `CONTEXT.md` (decisions), `DISCUSSION-LOG.md` (audit trail), `RESEARCH.md` (synthesized research + Package Legitimacy Audit), `PLAN.md` files (atomic execution plans), `SUMMARY.md` files (what was built), `VERIFICATION.md` (PASS/FAIL with evidence), `UAT.md` (human acceptance).

The `STATE.md` + `continue-here.md` pair is the session persistence mechanism: `/gsd-pause-work` writes the handoff, `/gsd-resume-work` reads it back. The agent comes back oriented and ready to continue — not asking you to re-explain the project.

## Context Monitor Hook

Even with fresh-context subagents, some workflows run in the main session for extended periods. The context monitor hook watches context usage in real time and injects warnings:

| Remaining context | Level | Action |
|---|---|---|
| > 35% | Normal | No warning |
| ≤ 35% | WARNING | Wrap up current task; avoid starting new complex work |
| ≤ 25% | CRITICAL | Save state with `/gsd-pause-work` and start a new session |

This makes context degradation visible — the model won't warn you, but the hook will.

## Package Legitimacy Audit (Slopcheck)

`RESEARCH.md` includes a Package Legitimacy Audit table that records a verdict for every external package the researchers recommended: `[OK]`, `[SUS]`, or `[SLOP]`. Packages rated `[SLOP]` are removed before the planner ever sees them. This is a concrete anti-[[slop]] mechanism at the dependency-selection layer — preventing AI-suggested packages of dubious quality from entering the codebase.

## The Broader Open GSD Suite

- **GSD Core** — spec-driven workflow engine (this page)
- **GSD Pi** — autonomous local coding agent with TUI, web UI, worktree-isolated Git, multi-provider model routing
- **GSD Browser** — native CDP browser automation with MCP server mode, versioned element refs, live human-in-the-loop viewer

## Thread

- [[the-agent-workflow]] — GSD Core is a concrete instantiation of the five-step workflow: Discuss → Plan → Execute → Verify → Ship
- [[spec-driven-development]] — GSD Core is a spec-driven framework with full traceability from requirements to verification
- [[context-engineering]] — GSD Core's fresh-context subagent architecture is a systematic solution to context rot
- [[the-slop-problem]] — The slopcheck mechanism and verification gates are anti-slop infrastructure

## Related

- [[fresh-context-subagents]] — The architectural pattern GSD Core uses to prevent context rot
- [[spec-kit]] — The other major open-source SDD toolkit; Spec Kit is spec-generation-focused, GSD Core is workflow-execution-focused
- [[gstack]] — The other major open-source agent-workflow framework; gstack uses sprint-chained skills, GSD Core uses fresh-context subagents
- [[agent-skills]] — GSD Core ships 65+ slash commands organized into 6 namespace routers
- [[context-files]] — GSD Core's `.planning/` artifacts are a structured evolution of context files
- [[software-factory]] — GSD Core is a software factory instantiation with phase decomposition and verification agents

## Sources

- `raw/gsd-core-opengsd-spec-driven-framework.md` — Full documentation: introduction, five-step phase loop, planning artifacts directory structure, specialist agents architecture, context management and session persistence, namespace routing. Open GSD suite overview.
