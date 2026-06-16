---
title: Plum
created: 2026-06-07
updated: 2026-06-07
sources:
  - raw/yt-learnings-from-a-no-code-library-keeping-the-spec-driven-development-triangle-in-sync.md
tags: [project, spec-driven-development, decision-tracking, workflow, tool]
unaudited_marginal: 0
---

# Plum

> A command-line decision-tracking tool that keeps spec, tests, and code in sync by extracting decisions from code diffs and agent traces at commit time. Named after a plumb bob — a carpenter's tool for finding true vertical; it keeps things true. Created by [[drew-breunig|Drew Breunig]] after learning from [[onewords]]. Install: `pip install plum-dev` or `uv add plum-dev`.

## How It Works

Plum is a CLI tool, not a Python library. It integrates with git via hooks.

### The Workflow

1. **Build something** with your coding agent (tested with [[claude-code|Claude Code]])
2. **Run `plum commit`** (or trigger via git hook on regular commit)
3. Plum **identifies decisions** by evaluating:
   - Code diffs from the last commit
   - Agent traces (conversations) since the last commit
4. Plum **deduplicates** decisions and presents them to the user for approval
5. User **approves, rejects, or edits** each decision
6. Plum **updates the spec** to reflect approved decisions
7. Plum **runs `plum sync`** to report coverage gaps between specs and tests
8. If there are decisions to review, **git commit fails** — the hook blocks until decisions are approved

### Artifacts Generated

- **`decisions.jsonl`** — Structured decision log. Each entry includes:
  - The decision question and answer
  - `approved_by`: user or LLM (enables blame)
  - Branch, timestamp, sync timestamp
  - Whether it was informed by the conversation
- **`requirements.md`** — Requirements broken down from the spec, each linked to tests and source files

### Setup

Run `plum init` in your project:
1. Point it to your spec markdown file(s)
2. Point it to your test directory (pytest only currently)
3. It creates a `.plumignore` (like `.gitignore` — skip README changes, etc.)
4. It creates a `.plum/` folder for state and config
5. It adds git hooks

## Why It Can't Be a Skill

Breunig argues this must be a tool, not a [[agent-skills|skill]]:

- **A skill lives in the agent.** The decision-tracking function needs to run outside the agent — it must handle commits, triggers, and small fixes even when the agent isn't involved.
- **A skill is a suggestion.** The commit-hook checkpoint that fails the commit is essential. Without it, the system gets ignored. "We've all had this happen to us with Claude Code."
- **The system must be canonical.** It can't be optional.

## What It Enables

- **Intent traceability**: "Hey, this code is done this way — is there a decision we made that is why we did this?" The decision log answers this. It's "code review where we capture intent."
- **Spec-code alignment**: The spec gets updated as implementation decisions are made, preventing spec drift
- **LLM behavior surfacing**: Silent LLM decisions (things the agent did without asking) get surfaced as decisions that need approval
- **Hack documentation**: Shortcuts get logged; you can later search for all shortcuts taken and fix them
- **Coverage mapping**: Links requirements to tests and code — you can see which requirements have tests and how many

## Limitations (as of early 2026)

- **Pytest only**: No support for other test frameworks or conformance tests
- **Spec must be ahead of code**: Can't analyze existing code and backfill the spec
- **Decision interruption**: Long-running tasks may generate many decisions, breaking flow
- **Deduplication isn't perfect**: Decision identification is fuzzy, likely repo-specific
- **Code reversals not implemented**: Rejecting a decision doesn't automatically undo the code
- **No spec management**: Large specs should be sharded into sections
- **Untested on large projects**: Use at your own risk
- **Model routing**: Uses DSPy for structured LLM calls; decision deduplication goes to GPT-OSS for speed

## Design Principles

- **Deterministic where possible, LLM where necessary**: Decision extraction uses LLMs, but validation steps use code. "When we can use code, we will."
- **Speed matters**: The system must not slow down the development cadence
- **Simple enough for devs to hold in their head**: Complex systems just move the problem

## Related

- [[drew-breunig]] — Creator
- [[onewords]] — The no-code library that inspired plum
- [[spec-code-triangle]] — The conceptual model plum operationalizes
- [[decision-extraction]] — The practice plum instantiates
- [[code-clarifies-spec]] — The insight that drove plum's design
- [[agent-skills]] — Breunig argues this can't be a skill
- [[verification-loop]] — Plum adds a new verification layer: decision-level verification at commit time
- [[backpressure]] — The commit-hook failure is commit-level backpressure
- [[the-agent-workflow]] — Plum as a new workflow primitive

## Sources

- `raw/yt-learnings-from-a-no-code-library-keeping-the-spec-driven-development-triangle-in-sync.md` — Breunig's talk; all claims derive from this source
