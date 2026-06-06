---
title: Ralph Loop
created: 2026-04-26
updated: 2026-06-05
sources:
  - raw/how-to-ralph-wiggum.md
  - raw/ralph-wiggum-playbook.md
  - raw/yt-chroma-context-engineering-episode-3-lance-martin-langchain.md
  - raw/ralph-loops-build-dumb-ai-loops-chris-parsons.md
  - "raw/yt-full-walkthrough-workflow-for-ai-coding-matt-pocock.md"
  - raw/2504.21625v6.txt
unaudited_marginal: 0
tags: [concept, autonomous-agents, agent-loops, claude-code, workflow, skills]
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

The loop is serial — one agent takes a task, does it, commits everything, and exits. The next agent picks up the next task, reads the git history and progress file to understand what happened, then works on the next item. Martin presents this as one variant of context isolation, alongside parallel sub-agent patterns (like [[claude-code|Claude Code]]'s parallel code review agents) — both are instances of the same principle applied differently.

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

> [!note] Empirical support confirmed
> The [[context-files]] empirical studies (Gloaguen et al., Lulla et al., 2026) later validated this design: short (~60 lines), operational-only, human-written context files outperform LLM-generated alternatives. The Ralph Loop pattern anticipated the evidence by converging on minimalism through practice.

- **specs/**: Source of truth for requirements. The agent gap-analyzes against these.

## Advanced Patterns

- **Acceptance-driven backpressure**: Derive test requirements from acceptance criteria during planning. Prevents "cheating" — can't claim done without passing the tests that prove it.
- **LLM-as-judge fixture**: A reusable `llm-review.ts` with binary pass/fail API for subjective criteria. Ralph discovers the pattern from code examples.
- **Work-scoped branches**: Scoped `IMPLEMENTATION_PLAN.md` per branch. Scope at plan creation (deterministic) not runtime filtering (probabilistic).
- **JTBD → Story Map → SLC releases**: Reframe specs as user journey activities, slice horizontally for Simple, Lovable, Complete releases.
- **Sub-agent validation**: During Q&A, an audience member reported that same-context validation suffers from confirmation bias — the agent "pats itself on the back." Parsons endorsed the insight and operationalized it: validation via fresh sub-agents with clean contexts catches real issues because they start with only a small chunk of context. This mirrors the [[delegate-52]] insight: separate editing and verification sessions are architecturally more reliable.

## Chris Parsons' Evolution of the Pattern

[[chris-parsons|Chris Parsons]] traces the Ralph Loop through three evolutionary stages based on his year of continuous operation:

1. **Simple re-run** (Huntley's original): After the agent finishes a task, ask it again. The agent often catches things it missed on the first pass. This was most valuable with earlier models that had higher miss rates.
2. **Ticket-based loops**: Point the loop at a batch of tickets with `implement the next most important ticket`. The agent dynamically picks dependencies rather than waterfall-style pre-planning. Parsons emphasizes: **don't pre-specify dependencies** — just tell the agent to pick the next most important thing. It handles the rest.
3. **[[claude-code|Claude Code]]'s `/loop` command**: The built-in loop with cron-like scheduling replaces the manual `while` bash loop. Supports `loop every <interval>` for recurring work (e.g., check for new bug reports hourly).

### Skills as the Loop Package

Parsons' key operational contribution: a Ralph loop is **a [[agent-skills|skill]]** — a `skill.md` file containing step-by-step instructions, recovery states, and verification rules. His skill structure includes:

- **Role definition**: "You are one engineer in a relay team. Do exactly one change, then drop the context and stop."
- **Ticket format specification**: The structure of a task, rationale, and status values.
- **Git state recovery logic**:
  - Dirty working tree + passing tests → probably done, double-check
  - Dirty working tree + failing tests → mid-flight crash, discard or treat differently
- **Verification rules**: "Test passing is not enough. Verify the actual behavior works."
- **Output mode**: Designed for fresh-context-per-iteration shell scripts (though Parsons now cares less about context isolation as context windows have grown).

This creates a tight composition: the [[agent-skills|skill]] provides the procedural knowledge; the loop provides the execution infrastructure. Skills are version-controlled, evolved over time via post-session reflection, and specific to each loop type (one for coding, one for newsletters, one for the worker loop).

### Worker Loop / Vault System

Parsons' most ambitious application: a **worker loop** that picks the next step on active projects from a vault of Markdown files, each with front matter context, decision trails, and status. The agent:
1. Reads all project files
2. Identifies the next step on the highest-priority project
3. Executes it (write an email draft, produce slides, check feedback, implement code)
4. Updates the project file with a decision trail
5. Loops

This is a pure instantiation of the LLM Wiki pattern (see `index.md`) — the vault is both the human's knowledge base and the agent's coordination state.

### "Reversible Without Embarrassment"

Parsons' safety heuristic for autonomous loop operation: if an action is reversible without causing embarrassment, the agent can proceed autonomously. If not, it makes a note in the project and hands it back to the human.

This operationalizes [[deliberate-friction]] for safety boundaries. Sending emails = irreversible (draft only). Creating slides = reversible (ship). Posting on LinkedIn = not allowed. The rule is simple enough for an agent to evaluate autonomously but captures the human's actual risk tolerance.

### Theory of Constraints

Parsons explicitly applies Goldratt's theory of constraints: Ralph loops reveal the real bottleneck. If your release process takes a month, optimizing coding speed doesn't help. The loop keeps running against the constraint until it shifts to somewhere else.

### Everything is a Loop

Parsons' operational philosophy: all knowledge work cadences are loops.
- **Heartbeat loop** (every 15 min): checks calendar, fires agent, sends Telegram updates
- **Morning loop** (6 AM): full daily briefing — overnight emails, schedule, priorities
- **Worker loop** (continuous): pick next step on active projects
- **Startup skill loop** (experimental): runs an entire startup framework as a loop

## Matt Pocock's Sandcastle: The Parallel Variant

[[matt-pocock|Matt Pocock]] evolved the sequential Ralph Loop into [[sandcastle|Sandcastle]], a TypeScript library that parallelizes issue execution across multiple Docker-sandboxed agents. Key differences from Huntley's original and Chris Parsons' ticket-based loops:

- **Kanban DAG replaces sequential picking**: Issues have blocking relationships forming a directed acyclic graph. A **planner agent** identifies which issues can run in parallel and dispatches them simultaneously.
- **Four-stage pipeline**: Planner → Implementer (parallel) → Reviewer (parallel) → Merger. Each stage runs with fresh context.
- **Separate reviewer agents**: Each implementation branch gets its own reviewer (often using a stronger model like Opus for what Sonnet implemented). This is sub-agent validation at the pipeline level.
- **Per-issue Docker sandboxes**: Each implementer runs in its own Docker container. Commits are extracted as patches, reviewed, then merged.
- **Push vs Pull for instructions**: Implementers pull skills on demand (lean context); reviewers get coding standards pushed (all rules up front).
- **PRD as parent issue**: The PRD lives as a GitHub issue, with child issues linking to it. PRD-to-Issues is a skill — token-efficient since the agent doesn't re-read the PRD.
- **QA feedback as issues**: Matt files bugs as GitHub issues during QA, which feed back into the next cycle.

The evolution from Huntley's `while :; do cat PROMPT.md | claude ; done` to Sandcastle's multi-agent pipeline preserves the core principle — fresh context per task — while adding parallelism and structured review gates.

### Limitations

- **Bad specs**: Garbage in, garbage out. Assumes Phase 1 is done properly.
- **Architectural decisions**: Novel abstractions still need human judgment. Ralph handles execution, not design.
- **Cost**: 50 iterations on a large codebase can hit $50–100+.

## Thread

- [[the-agent-workflow]] — The most detailed AFK implementation in the wiki
- [[the-slop-problem]] — [[backpressure|Backpressure]] as the primary defense against slop in autonomous loops
- [[the-human-lever]] — The human engineers the environment (specs, backpressure, plan) that makes the loop converge
- [[tool-design-for-agents]] — Skills as the loop packaging mechanism; the tool layer provides the infrastructure, the skill provides the judgment

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
- [[chris-parsons]] — Operationalized Ralph Loops as skills; traced the evolution through three stages; introduced the worker loop and sub-agent validation
- [[agent-skills]] — Skills provide the procedural knowledge; the loop provides the execution infrastructure
- [[evolving-context]] — Parsons evolves his Ralph loop skills via post-session reflection; skill learning is a category of evolving context
- [[delegate-52]] — Sub-agent validation mirrors DELEGATE-52's finding that separate verification sessions are architecturally more reliable
- [[deliberate-friction]] — "Reversible without embarrassment" is an operational instantiation of deliberate friction for safety boundaries
- [[model-routing]] — One-task-per-iteration sidesteps the tier E ceiling that model routing cannot fix; the Ralph loop is the decomposition strategy model routing depends on
- [[iterative-self-correction]] — Meeseeks's feedback-driven self-correction loop is structurally identical to a Ralph Loop with automated constraint evaluation replacing human review — the same pattern at the per-response level

- [[multi-tier-action-space]] — The Ralph loop structures execution across multiple action-space tiers
- [[software-factory]] — The Ralph Loop's fresh-context-per-iteration is a minimalist persistence mechanism for the software factory architecture
- [[babysitter-agent]] — The babysitter is a more sophisticated alternative to the Ralph Loop's crude fresh-context-per-iteration approach

## Sources

- `raw/how-to-ralph-wiggum.md` — The canonical implementation
- `raw/ralph-wiggum-playbook.md` — paddo.dev summary of the methodology
- `raw/yt-chroma-context-engineering-episode-3-lance-martin-langchain.md` — Context isolation framing of the Ralph Loop pattern
- `raw/ralph-loops-build-dumb-ai-loops-chris-parsons.md` — Chris Parsons' workshop: loop evolution, sub-agent validation, skills-as-loop-package, worker loop, safety heuristics
- `raw/yt-full-walkthrough-workflow-for-ai-coding-matt-pocock.md` — Sandcastle as the parallelized Ralph Loop variant: Kanban DAG, four-stage pipeline, Docker sandboxes, separate reviewer agents
- `raw/2504.21625v6.txt` — Meeseeks (Wang et al.): iterative self-correction as a micro-scale Ralph Loop — automated evaluation replaces human review at the per-response level
