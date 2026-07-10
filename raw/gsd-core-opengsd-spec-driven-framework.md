---
type: web
url: https://docs.opengsd.net/core/introduction
title: GSD Core — Spec-Driven Development for AI Coding Agents (Open GSD)
author: Open GSD
date: 2026-07-10
ingested: 2026-07-10
---

# GSD Core: Spec-Driven Development for AI Coding Agents

GSD Core is a spec-driven framework that keeps AI coding agents on track across sessions — fresh context, persistent artifacts, and verified output.

GSD Core is a lightweight meta-prompting, context-engineering, and spec-driven development framework that sits on top of any AI coding runtime. Rather than replacing your editor or AI assistant, GSD Core gives it structure: a repeatable phase loop, a set of specialist subagents, and a `.planning/` directory of human-readable artifacts that survive every session boundary, every `/clear`, and every context reset.

## The problem GSD Core solves

Most AI-coding setups work well for small tasks but degrade silently as projects grow. Three forces cause the breakdown:

**Context rot.** As a conversation grows, the AI fills its context window with accumulated back-and-forth. Recall weakens, reasoning degrades, and output quality quietly drops — without any warning to you or the model.

**No shared memory between sessions.** Start a new session and the AI knows nothing about yesterday's decisions, your architecture choices, or the bugs you already ruled out. You spend the first ten minutes re-explaining what already happened.

**No verification that code works.** Most AI coding flows end at "execution complete." Nothing checks that what was built actually satisfies the requirements, passes tests, or matches the design you approved.

GSD Core solves all three. Heavy research, planning, and execution work runs in fresh-context subagents so context rot never accumulates. Structured artifacts like `STATE.md`, `CONTEXT.md`, and `continue-here.md` persist everything important across session boundaries. And the Verify step walks through what was built, diagnoses gaps, and generates fix plans before a phase is declared done.

## How it works

GSD Core structures every milestone as a repeatable five-step loop, one phase at a time:

1. **Discuss** — capture your implementation decisions before anything is planned
2. **Plan** — run parallel research agents, decompose work into atomic tasks, verify the plan fits a fresh context window
3. **Execute** — run plans in parallel execution waves; each executor starts with a clean context window of up to 200K tokens
4. **Verify** — walk through what was built, run tests, diagnose gaps, and produce fix plans before declaring done
5. **Ship** — create the PR, archive the phase artifacts, and move to the next phase

Each step produces artifacts that feed the next. Nothing is held in conversation memory — everything is written to disk in `.planning/` as plain Markdown and JSON.

## The five-step phase loop

Each phase in your `ROADMAP.md` moves through these steps in order: Discuss → Plan → Execute → Verify → Ship.

A **milestone** is a major product goal — a shippable increment that delivers meaningful value. A **phase** is one step toward that milestone. Your `ROADMAP.md` organizes phases under milestones and tracks the status of each.

Each phase is small enough to plan, execute, and verify in one session. Phases that are too large produce plans with too many tasks, which executors cannot reliably complete in a single context window. The guideline is two to three atomic plans per phase, each with two to three tasks.

## Spec-driven development

GSD Core applies a spec-driven development approach: every requirement is written down before any code is written, and every artifact gates the next stage. The flow:

```
User vision
    → REQUIREMENTS.md — scoped requirements with IDs (REQ-001, REQ-002, ...)
    → ROADMAP.md — phases mapped to requirement IDs (traceability guaranteed)
    → CONTEXT.md — implementation preferences per phase
    → RESEARCH.md — ecosystem research per phase
    → PLAN.md — atomic execution tasks referencing requirements and acceptance criteria
    → SUMMARY.md — what was built, deviations from plan
    → VERIFICATION.md — goal-backward check against phase requirements
    → UAT.md — human acceptance testing results
```

The plan-checker enforces that every plan covers the requirements it claims to cover. The verifier enforces that every requirement mapped to the phase is actually implemented. If a requirement is not covered, the phase does not advance.

## Artifact dependency map

Each artifact is consumed by specific agents downstream:

| Artifact | Read by |
| --- | --- |
| `PROJECT.md` | All agents — planner, executor, verifier, researcher |
| `REQUIREMENTS.md` | Planner, plan-checker, verifier, auditor |
| `ROADMAP.md` | Orchestrators, roadmapper |
| `STATE.md` | All agents — decisions, blockers, current position |
| `CONTEXT.md` (per phase) | Researcher, planner, executor |
| `RESEARCH.md` (per phase) | Planner, plan-checker |
| `PLAN.md` (per plan) | Executor, plan-checker |
| `SUMMARY.md` (per plan) | Verifier, state tracking |

Nothing is held in conversation memory. If you run `/clear` between steps, everything the next agent needs is already on disk.

## Planning Artifacts and Directory Structure

GSD Core stores all project state in a `.planning/` directory at the root of your repository. Every artifact is plain Markdown or JSON — readable by humans, writable by agents, and committable to git for team visibility. No database, no server, no external service.

### Root-level artifacts

**PROJECT.md** — the single source of truth for what your project is and what it is not. Captures project vision, architectural constraints, non-negotiable decisions, and evolution rules. Every agent reads PROJECT.md first.

**REQUIREMENTS.md** — scoped, numbered requirements in three tiers: v1 (must ship in current milestone), v2 (planned for future milestone), Out of scope. Each requirement has a stable ID (REQ-001, REQ-002). The roadmapper maps every v1 requirement to a phase, creating a traceability chain from requirement to phase to plan to implementation to verification.

**ROADMAP.md** — milestone and phase plan. Lists phases in order, records status of each phase, maps each phase to REQUIREMENTS.md IDs.

**STATE.md** — the living memory of your project. Updated after every significant action. Contains current position (which phase, which step), active decisions and blockers, metrics, and the last known good state for session recovery.

**continue-here.md** — cross-session handoff document. `/gsd-pause-work` writes a structured summary of the current session state so that you (or another session) can pick up exactly where you left off.

### Per-phase artifacts

Each phase gets its own directory under `.planning/phases/`:

- **CONTEXT.md** — implementation preferences for the phase, written by `/gsd-discuss-phase`. Contains a structured `<decisions>` block of numbered decisions.
- **DISCUSSION-LOG.md** — full audit trail of the discuss-phase conversation.
- **RESEARCH.md** — synthesized output of parallel phase researchers. Covers stack research, feature patterns, architectural approaches, and common pitfalls. Includes a **Package Legitimacy Audit** table with slopcheck verdicts: [OK], [SUS], or [SLOP]. Packages rated [SLOP] are removed before the planner ever sees them.
- **PLAN.md** files — each is one atomic execution plan. Contains structured `<task>` elements with explicit acceptance criteria, a `read_first` section, a `must_haves` section linking tasks to requirement IDs, and a dependency declaration for wave ordering.
- **SUMMARY.md** files — written by the executor after completing its assigned plan. Documents what was implemented, deviations from plan, and issues encountered.
- **VERIFICATION.md** — written by the verifier agent. Contains a PASS or FAIL verdict with specific evidence.
- **UAT.md** — human acceptance testing results.

## Specialist Agents: Roles and Architecture

GSD Core uses a multi-agent architecture where thin orchestrators spawn specialized agents with clean context windows. Rather than accumulating a single long conversation where quality degrades over time, each specialist agent starts fresh — with up to 200K tokens of context, or up to 1M tokens on models that support it — focused only on its assigned task, reading only the artifacts it needs.

You do not invoke agents directly. Orchestrators (the workflow commands like `/gsd-plan-phase` and `/gsd-execute-phase`) spawn agents automatically at the right point in the phase loop.

### How fresh-context subagents work

When an orchestrator needs to perform heavy work, it spawns a subagent with a precisely scoped prompt. That subagent receives:
- Its specific agent definition (role, tools, constraints)
- The subset of planning artifacts it needs for its task
- A model assignment based on the workflow profile

The subagent runs to completion, writes its output to disk, and returns a compact result to the orchestrator. The orchestrator's context never grows with the weight of the subagent's work — only the result arrives back.

### Agent categories

- **Researchers** — gather ecosystem knowledge before planning begins. Web access + Context7 MCP. Four instances run in parallel, each covering a different dimension.
- **Planners and checkers** — planners create execution plans from research and context. Checkers verify plans meet quality standards before code is written.
- **Executors** — implement plans. Each runs in a fresh context window and produces atomic git commits — one commit per completed task.
- **Verifiers and auditors** — verifiers confirm what was built satisfies requirements. Auditors check specific quality dimensions (security, test coverage, UI consistency).
- **Mappers** — explore the codebase and produce structured analysis documents.

### Agent tool permissions (least privilege)

| Agent | Can write code | Can search web | Can edit files |
| --- | --- | --- | --- |
| Researchers | No | Yes | No |
| Planner | No (writes plans only) | No | No |
| Plan-checker | No | No | No |
| Executor | Yes | No | Yes |
| Verifier | No | No | No |
| Codebase mapper | No | No | No |
| Debugger | No | Yes | Yes |
| Security auditor | No | No | No |

### Agent spawn patterns

| Command | Agents spawned | Parallelism |
| --- | --- | --- |
| `/gsd-new-project` | gsd-project-researcher × 4 → gsd-research-synthesizer → gsd-roadmapper | 4 parallel researchers, then sequential |
| `/gsd-plan-phase` | gsd-phase-researcher × 4 → gsd-research-synthesizer → gsd-planner → gsd-plan-checker | 4 parallel, then sequential (up to 3 check iterations) |
| `/gsd-execute-phase` | gsd-executor × N → gsd-verifier | N parallel per wave, then sequential |
| `/gsd-map-codebase` | gsd-codebase-mapper × 4 | 4 parallel |

## Context Management and Session Persistence

Context management is the foundational engineering problem that GSD Core was built to solve. Most AI coding setups fail at scale not because the model is incapable, but because the context window fills up, quality degrades silently, and there is no mechanism to resume where you left off.

### What context rot is

Context rot is the quality degradation that accumulates as an AI fills its context window with conversation history. The model's attention is finite — as the window fills, the signal-to-noise ratio drops, earlier content receives less attention, and the quality of reasoning and recall quietly degrades. The model does not warn you when this happens. It continues generating output, but that output is less accurate, less consistent, and more likely to contradict earlier decisions.

Context rot is why an AI that produces excellent results on a fresh task produces mediocre results on the tenth task in the same session. The model has not changed — its context has degraded.

### Fresh-context subagent architecture

GSD Core's primary defense against context rot is architectural: heavy work never runs in the main session. Instead, thin orchestrators spawn specialist subagents, each in its own isolated context window.

When you run `/gsd-plan-phase 1`, the orchestrator does not do the planning in your current conversation. It spawns:
1. Four researcher subagents — each with a fresh context window, each focused on one research dimension
2. A synthesizer subagent — reads only the four research outputs, nothing else
3. A planner subagent — reads only PROJECT.md, REQUIREMENTS.md, CONTEXT.md, and RESEARCH.md
4. A plan-checker subagent — reads only the generated plans and the phase context

None of these agents carries the weight of your conversation history. Each starts clean with up to 200K tokens of headroom. The result arrives in your session without the accumulated cost of the work that produced it.

### The context monitor hook

Even with fresh-context subagents, some workflows run in the main session for extended periods. The context monitor hook watches context usage in real time and injects warnings directly into the agent's conversation when usage runs high.

| Remaining context | Level | Message injected |
| --- | --- | --- |
| > 35% | Normal | No warning |
| ≤ 35% | WARNING | Wrap up the current task; avoid starting new complex work |
| ≤ 25% | CRITICAL | Context nearly exhausted; save state with /gsd-pause-work and start a new session |

### Prompt guard and read injection scanner

GSD Core generates Markdown files that become LLM system prompts. Any user-controlled text that flows into planning artifacts is a potential indirect prompt injection vector. Two defensive hooks:

**Prompt guard** — fires on every Write or Edit call to `.planning/` files. Scans for role override attempts, instruction bypass patterns, system tag injections. Advisory only — does not block the write.

**Read injection scanner** — fires after every Read tool call. Scans tool output for embedded instructions in untrusted content. Also advisory.

### Cross-session persistence

**STATE.md** — the living memory of the project. Small and high-signal. Holds current state and most recent active decisions. Historical decisions are archived in phase artifacts.

**continue-here.md** — structured handoff document written by `/gsd-pause-work`. Captures what was completed, what is in progress, what the next concrete step is, and any open questions or blockers.

### Practical context discipline

- Run `/clear` between major commands. GSD Core is designed for frequent context clears. All state is in `.planning/` — nothing important is lost.
- Use `/gsd-progress` when you return. It reads STATE.md and tells you exactly where you are and what step is next.
- Respond to WARNING messages: finish current task, run `/gsd-pause-work`, `/clear`, `/gsd-resume-work`.
- Respond to CRITICAL messages immediately: stop, save state, clear context.

## Namespace routing

GSD Core ships six namespace meta-skills as top-level entry points:

| Namespace | Command | Routes to |
| --- | --- | --- |
| Phase pipeline | `/gsd-workflow` | discuss, plan, execute, verify, progress |
| Project lifecycle | `/gsd-project` | milestones, audits, summary |
| Quality gates | `/gsd-quality` | code review, debug, security, UI audit |
| Codebase intelligence | `/gsd-context` | map, graphify, docs, learnings |
| Management | `/gsd-manage` | config, workspace, workstreams, ship |
| Exploration | `/gsd-ideate` | explore, sketch, spike, spec, capture |

65+ slash commands total. The namespace routers exist to reduce the token cost of skill discovery — six entries instead of eighty-six.

## The broader Open GSD suite

Open GSD is a suite of three AI-powered developer tools:

- **GSD Core** — spec-driven workflow engine for any AI coding runtime. Runs Research → Plan → Execute → Verify → Ship with 65+ slash commands.
- **GSD Pi** — autonomous local coding agent with TUI, web UI, worktree-isolated Git, and multi-provider model routing.
- **GSD Browser** — native CDP browser automation with MCP server mode, versioned element refs, and a live human-in-the-loop viewer.
