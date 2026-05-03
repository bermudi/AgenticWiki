---
title: Ralph Loop
created: 2026-04-26
updated: 2026-05-02
sources:
  - raw/how-to-ralph-wiggum.md
  - raw/ralph-wiggum-playbook.md
  - raw/Chroma Context Engineering Episode 3 - Lance Martin - LangChain - youtube.com.md
tags: [concept, autonomous-agents, agent-loops, claude-code, workflow]
---

# Ralph Loop

> A minimalist autonomous agent loop: a dumb bash `while` loop feeds a prompt to an agent CLI, which reads a plan file, picks one task, implements it, commits, exits. Fresh context each iteration. The plan file on disk is the only shared state between otherwise isolated executions. Originated by [[geoffrey-huntley|Geoffrey Huntley]].

## The Core Loop

The entire system is a bash one-liner:

```bash
while :; do cat PROMPT.md | claude ; done
```

Each iteration: the agent reads `PROMPT.md` + `AGENTS.md` + `IMPLEMENTATION_PLAN.md`, picks the most important task, implements it, updates the plan, commits, exits. The loop restarts with fresh context. The plan file persists on disk as shared state between iterations.

No sophisticated orchestration needed — just a dumb bash loop that keeps restarting the agent, and the agent figures out what to do next by reading the plan file each time.

### Why It Works (Context Isolation)

[[lance-martin|Lance Martin]] frames the Ralph Loop as a **context isolation pattern** for long-running tasks. The core problem: you can't fit a large task in a single context window. The solution: isolate individual tasks to different sub-agents, each with a clean context window. The agents communicate via git and the file system (a `progress.txt` scratchpad), not via shared context.

The loop is serial — one agent takes a task, does it, commits everything, and exits. The next agent picks up the next task, reads the git history and progress file to understand what happened, then works on the next item. Martin presents this as one variant of context isolation, alongside parallel sub-agent patterns (like Claude Code's parallel code review agents) — both are instances of the same principle applied differently.

## Key Design Decisions

### One Task Per Iteration
The agent processes exactly one task per loop execution. This keeps context lean and avoids the [[smart-zone-dumb-zone|Dumb Zone]] entirely. Each iteration starts fresh, loading only what it needs.

### Plan File as Shared State
`IMPLEMENTATION_PLAN.md` is the coordination mechanism between isolated loop executions. The agent reads it at the start of each iteration, picks the top task, implements it, updates the plan, and commits. Next iteration reads the updated plan.

### Three-Phase Workflow
1. **Requirements** (HITL): Human + LLM define specs in `specs/`. One file per topic of concern.
2. **Planning** (automated): Agent reads specs, examines code, generates `IMPLEMENTATION_PLAN.md` via gap analysis.
3. **Building** (AFK): Agent picks top task, implements, validates, updates plan, commits, exits.

### Prompt Structure
- **0a–0d**: Orientation (read files, understand context)
- **1–4**: Main instructions (what to do this iteration)
- **999+**: Guardrails (what not to do, safety rails)

Key language patterns: "study the codebase first," "don't assume not implemented," "ultrathink before acting," "capture the why in commits."

### Subagent Orchestration
Up to 500 parallel Sonnet subagents for searches/reads, only 1 for build/tests. Opus subagents for complex reasoning (debugging, architectural decisions).

### Enhanced Loop
Wraps the core loop with mode selection (`plan`/`build`), max-iterations support, and git push after each iteration. A `plan-work` mode creates scoped plans per branch.

## File Structure

```
project/
├── loop.sh                    # Bash orchestrator
├── PROMPT_plan.md             # Planning mode instructions
├── PROMPT_build.md            # Building mode instructions
├── AGENTS.md                  # Build/test/lint commands (~60 lines)
├── IMPLEMENTATION_PLAN.md     # Shared state between iterations
└── specs/
    └── *.md                   # One file per topic of concern
```

- **AGENTS.md**: Operational only — build commands, test commands, validation steps. ~60 lines. Status and progress belong in `IMPLEMENTATION_PLAN.md`.
- **specs/**: Source of truth for requirements. The agent gap-analyzes against these.

## Advanced Patterns

- **Acceptance-driven backpressure**: Derive test requirements from acceptance criteria during planning. Prevents "cheating" — can't claim done without passing the tests that prove it.
- **LLM-as-judge fixture**: A reusable `llm-review.ts` with binary pass/fail API for subjective criteria. Ralph discovers the pattern from code examples.
- **Work-scoped branches**: Scoped `IMPLEMENTATION_PLAN.md` per branch. Scope at plan creation (deterministic) not runtime filtering (probabilistic).
- **JTBD → Story Map → SLC releases**: Reframe specs as user journey activities, slice horizontally for Simple, Lovable, Complete releases.

## Matt Pocock's Issue-Based Variant

[[matt-pocock|Matt Pocock]] uses a Docker-based variant (provisionally named "Sandcastle") that replaces the plan file with **GitHub issues as the task queue**. Instead of `IMPLEMENTATION_PLAN.md`, the agent pulls open GitHub issues, picks one, implements it, commits with a descriptive message, and closes the issue. Each iteration closes issues until none remain.

Key differences from Huntley's original:
- **Issues as plan**: GitHub issues replace the plan file. Blocked-by relationships encode execution order.
- **PRD as parent issue**: The PRD lives as a GitHub issue, with child issues linking to it.
- **PRD-to-Issues as a skill**: A separate skill decomposes the PRD into issues while the PRD is still in context — token-efficient since the agent doesn't need to re-read the PRD.
- **QA feedback as issues**: Matt files bugs and feature requests as GitHub issues during QA, which the next Ralph iteration picks up.
- **Human-in-the-loop labels**: Issues labeled "AFK" are agent-pickable; human-labeled issues are skipped.

Matt explicitly merges issues that are too small to avoid the overhead of spinning up a full agent session for trivial changes.

- **Bad specs**: Garbage in, garbage out. Assumes Phase 1 is done properly.
- **Architectural decisions**: Novel abstractions still need human judgment. Ralph handles execution, not design.
- **Cost**: 50 iterations on a large codebase can hit $50–100+.

## Thread

- [[the-agent-workflow]] — The most detailed AFK implementation in the wiki
- [[the-slop-problem]] — [[backpressure|Backpressure]] as the primary defense against slop in autonomous loops
- [[the-human-lever]] — The human engineers the environment (specs, backpressure, plan) that makes the loop converge

## Related

- [[afk-agent]] — The Ralph Loop is the canonical AFK implementation
- [[backpressure]] — The convergence mechanism that makes the loop work
- [[plan-disposability]] — Plans as ephemeral coordination state between iterations
- [[smart-zone-dumb-zone]] — One-task-per-iteration sidesteps the Dumb Zone
- [[verification-loop]] — Downstream gates are the verification loop in autonomous mode
- [[claude-code]] — The agent CLI the loop wraps
- [[agent-friendly-tooling]] — AGENTS.md as agent-friendly infrastructure
- [[geoffrey-huntley]] — Originator of the technique
- [[matt-pocock]] — Docker-based issue-driven variant (Sandcastle)
- [[lance-martin]] — Framed the Ralph Loop as a serial context isolation pattern for long-running tasks
- [[context-engineering]] — The Ralph Loop is a context isolation technique; context engineering provides the theoretical framework for why fresh context per iteration works

## Sources

- `raw/how-to-ralph-wiggum.md` — The canonical implementation
- `raw/ralph-wiggum-playbook.md` — paddo.dev summary of the methodology
- `raw/Chroma Context Engineering Episode 3 - Lance Martin - LangChain - youtube.com.md` — Context isolation framing of the Ralph Loop pattern
