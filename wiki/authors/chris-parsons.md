---
title: Chris Parsons
created: 2026-05-04
updated: 2026-05-04
sources:
  - raw/ralph-loops-build-dumb-ai-loops-chris-parsons.md
unaudited_marginal: 0
tags: [author, ralph-loops, agent-loops, claude-code, skills, autonomous-agents]
---

# Chris Parsons

> Ex-CTO, AI adoption consultant, and practitioner who runs Ralph Loops 24/7 across all his work — code, newsletters, emails, calendar, and client engagements. Developed the most operationally detailed Ralph Loop skill system documented in this wiki, including the worker loop pattern and the dual-mode work model.

## Background

Chris Parsons is a CTO by background with ~30 years of professional software development experience. He has been CEO of an agency, done extensive agile consulting, and now helps teams adopt AI. He runs Ralph Loops continuously — 24 hours a day — for all aspects of his work: writing code, managing email, checking calendar, writing newsletters, and doing client work.

## Key Contributions

### Ralph Loop Evolution

Parsons traces the evolution of Ralph Loops from its origins:

1. **Simple re-run** (Geoffrey Huntley's original): Ask the agent to do the same thing again — it catches what it missed.
2. **Ticket-based loops**: Point the loop at a batch of tickets with `implement the next most important ticket`. Let the agent pick dependencies dynamically rather than waterfall-style pre-planning.
3. **[[claude-code|Claude Code]]'s `/loop` command**: Built-in loop with cron-like scheduling that replaces the manual `while` bash loop.

### Sub-Agent Validation

During Q&A, an audience member reported that **same-context validation pats itself on the back** — when validation happens in the same session as implementation, the agent confirms its own work. Parsons endorsed the insight enthusiastically and noted that fresh sub-agents with clean contexts catch real issues because they "start with only a small chunk of context" and can't inherit the implementation's confirmation bias. This mirrors the [[delegate-52]] pattern — separate sessions for editing vs verification.

### Skills as the Ralph Loop Packaging Mechanism

Parsons' key operational insight: a Ralph loop is **a skill** — a `skill.md` file containing step-by-step instructions for what the agent should do, how to verify success, how to handle recovery, and when to stop. His Ralph loop skill includes:

- Role definition ("you are one engineer in a relay team")
- Ticket format specification
- Git state checking (dirty working tree handling)
- Recovery states (mid-flight crash detection via test status)
- Verification instructions (test passing is not enough — verify actual behavior)

This is a concrete instantiation of how [[agent-skills]] compose with [[ralph-loop|Ralph Loops]] — the skill provides the procedural knowledge, the loop provides the execution infrastructure.

### "Reversible Without Embarrassment" Safety Heuristic

Parsons' rule for autonomous operation: if an agent action is reversible without causing embarrassment, it can proceed autonomously. Otherwise, it drafts and waits for human review. This is an operational instantiation of [[deliberate-friction]] for safety boundaries.

### Two Modes of Work

Parsons distinguishes two modes, extending the HITL/AFK model:

1. **Fully automatic**: When specs are trusted and feedback mechanisms are deterministic, the agent runs entirely hands-off. No human involvement needed.
2. **Collaborative**: [[claude-code|Claude Code]] as a thinking partner — loading project files with context, decision trails, and feedback, then working back and forth with the human. The human contributes strategic thinking; the agent executes.

### The Worker Loop System

Parsons maintains a vault directory with thousands of Markdown files representing projects, each with front matter context, decision trails, and status. A "worker" agent loops through these projects, picking the next step on the most important one. Steps can include writing emails (drafts only), producing slide decks, checking feedback, or doing code work. The vault is essentially a personal wiki managed by AI — reinforcing the LLM Wiki pattern (see this project's `AGENTS.md`) independently.

### Theory of Constraints for Agent Workflows

Parsons explicitly applies [The Goal](https://en.wikipedia.org/wiki/The_Goal_(novel)) by Eliyahu Goldratt: Ralph loops reveal bottlenecks. If the release process takes a month, optimizing coding speed doesn't help. Fix the real constraint first.

### Everything is a Loop

Parsons' operational philosophy: all knowledge work cadences are loops. He runs:
- **Heartbeat loop** (every 15 minutes): checks calendar, fires [[claude-code|Claude]], sends Telegram updates
- **Morning loop** (6am): full daily briefing — overnight emails, schedule, priorities
- **Worker loop** (continuous): pick next step on active projects
- **Startup skill loop**: experimental — runs an entire startup framework as a loop

## Relationship to Wiki Theory

Parsons' practice independently validates several wiki concepts through real-world operation:
- [[ralph-loop]] — His operational deployment is the most documented in this wiki
- [[agent-skills]] — Skills as the packaging mechanism for loops; his skill structure (recovery states, git checks, verification rules) is a reference implementation
- [[evolving-context]] — Skills evolve via post-session reflection: "update the skill with anything you learned"
- [[backpressure]] — His "reversible without embarrassment" is a practical safety backpressure
- [[the-agent-workflow]] — His worker loop operationalizes the HITL/AFK cycle at scale
- [[verification-loop]] — Sub-agent validation as a concrete technique for avoiding confirmation bias

## Thread

- [[the-agent-workflow]] — His worker loop operationalizes the HITL/AFK cycle at scale with skills, sub-agent validation, and safety heuristics
- [[the-slop-problem]] — His "reversible without embarrassment" heuristic and backpressure-driven autonomous operation are practical slop defenses
- [[tool-design-for-agents]] — Skills as the packaging mechanism for Ralph loops; the skill provides the procedural knowledge, the loop provides the execution infrastructure

## Related

- [[geoffrey-huntley]] — Originator of the Ralph Wiggum technique
- [[matt-pocock]] — Independently developed a Docker-based Ralph Loop variant (Sandcastle)
- [[lance-martin]] — Framed the Ralph Loop as a context isolation pattern
- [[agent-skills]] — Skills as the packaging mechanism for Ralph loops
- [[ralph-loop]] — His practice is documented here
- [[claude-code]] — The agent CLI through which he runs all his Ralph loops
- [[index]] — This wiki itself follows the LLM Wiki pattern; the vault system is an independent parallel
- [[deliberate-friction]] — His "reversible without embarrassment" is an instantiation

## Sources

- `raw/ralph-loops-build-dumb-ai-loops-chris-parsons.md` — Full workshop transcript; all contributions documented here
