---
title: The Ralph Wiggum Playbook
created: 2026-04-26
updated: 2026-04-26
sources:
  - raw/how-to-ralph-wiggum.md
  - raw/ralph-wiggum-playbook.md
tags: [source, ai-engineering, autonomous-agents, workflow, claude-code, agent-loops]
---

# The Ralph Wiggum Playbook

> Two complementary sources on the same methodology: Geoffrey Huntley's canonical implementation (how-to-ralph-wiggum repo) and a paddo.dev blog summary. Together they define the [[ralph-loop|Ralph Loop]] — a minimalist autonomous agent loop driven by [[backpressure]] and [[plan-disposability|plan disposability]].

## Source 1: how-to-ralph-wiggum (Huntley)

The canonical implementation. A GitHub repo containing the full playbook: `loop.sh`, prompt templates, file structure, and advanced patterns (acceptance-driven backpressure, work-scoped branches, JTBD → Story Map → SLC releases). Originated by Huntley, documented by Clayton Farr, endorsed via Huntley's fork.

## Source 2: The Ralph Wiggum Playbook (paddo.dev)

A clean blog summary by Emergent Minds (paddo.dev, 2026-01-11). Covers the three core principles (context is scarce, plans are disposable, backpressure beats direction), the three-phase workflow, backpressure mechanisms, and advanced patterns.

## Key Takeaways (across both sources)

### Three Core Principles
1. **Context is scarce**: ~176K usable tokens. Keep each iteration lean.
2. **Plans are disposable**: Cheaper to regenerate than to salvage.
3. **[[backpressure|Backpressure beats direction]]**: Engineer the environment, don't direct the agent.

### The Loop Mechanic
A dumb bash loop feeds a prompt to Claude. Agent reads the plan, picks one task, implements, commits, exits. Fresh context next iteration. The plan file on disk coordinates between isolated executions. See [[ralph-loop]] for full details.

### Backpressure Layers
- **Downstream gates**: Tests, type-checking, linting, build validation.
- **Upstream steering**: Existing code patterns guide the agent's approach.
- **LLM-as-judge**: Binary pass/fail for subjective criteria (tone, aesthetics).

### Context Efficiency
The [[smart-zone-dumb-zone|dumb zone]] hits at ~40% context utilization. One-task-per-iteration sidesteps this entirely.

### Advanced Patterns
- Acceptance-driven backpressure (test requirements derived from acceptance criteria)
- LLM-as-judge fixture pattern (`llm-review.ts`)
- Work-scoped branches (scoped plan per branch)
- JTBD → Story Map → SLC releases
- Subagent orchestration (500 Sonnet for exploration, 1 for build, Opus for reasoning)

### Limitations
- Bad specs → garbage out
- Architectural decisions still need human judgment
- Cost: $50–100+ for 50 iterations on large codebase

## Thread

- [[the-agent-workflow]] — The most detailed AFK implementation in the wiki
- [[the-human-lever]] — Backpressure engineering as the human's new role
- [[the-slop-problem]] — Backpressure as the primary defense against slop in autonomous loops

## Related

- [[ralph-loop]] — The concept page with full loop mechanics
- [[backpressure]] — The convergence mechanism
- [[plan-disposability]] — Plans as ephemeral coordination state
- [[afk-agent]] — Ralph is the canonical AFK implementation
- [[claude-code]] — The agent CLI Ralph wraps

## Sources

- `raw/how-to-ralph-wiggum.md` — Huntley's fork of the Ralph Wiggum playbook
- `raw/ralph-wiggum-playbook.md` — paddo.dev summary of the methodology
