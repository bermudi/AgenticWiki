---
title: Geoffrey Huntley
created: 2026-04-26
updated: 2026-04-26
sources:
  - raw/how-to-ralph-wiggum.md
  - raw/ralph-wiggum-playbook.md
tags: [author, autonomous-agents, ralph-wiggum, claude-code]
---

# Geoffrey Huntley

> Originator of the Ralph Wiggum technique — the minimalist autonomous agent loop pattern. A developer who discovered that a dumb bash `while` loop with fresh context per iteration outperforms sophisticated orchestration.

## Background

Geoffrey Huntley is a developer known for originating the **Ralph Wiggum** technique for autonomous AI agent loops. The core insight: instead of building complex orchestration, just loop a CLI agent with fresh context and let a plan file on disk coordinate between iterations.

Clayton Farr documented and refined the technique into a full playbook. Huntley forked it on GitHub, signaling endorsement.

## Key Contributions

- **The Ralph Wiggum loop**: `while :; do cat PROMPT.md | claude ; done` — the minimal autonomous agent.
- **Plan file as shared state**: `IMPLEMENTATION_PLAN.md` persists between iterations, letting otherwise isolated loop executions coordinate.
- **One task per iteration**: Fresh context, one task, commit, exit. Avoids the [[smart-zone-dumb-zone|Dumb Zone]] entirely.
- **Backpressure over direction**: Engineer the environment (tests, builds, LLM-as-judge) so wrong outputs get rejected, rather than trying to direct the agent's every move.
- **Plan disposability**: Plans are coordination state, not contracts. Regenerate when stale.

## Relationship to Wiki Theory

Huntley's Ralph pattern is the most operationally detailed AFK implementation in the wiki. It grounds the abstract [[afk-agent]] and [[the-agent-workflow|HITL/AFK]] concepts in specific file structures, prompt templates, and bash scripts. His "backpressure beats direction" principle extends [[grey-box-engineering]] from interface design to environmental design.

## Related

- [[ralph-wiggum-playbook]] — The full source documenting his technique
- [[afk-agent]] — The concept Ralph instantiates
- [[the-agent-workflow]] — How Ralph fits the HITL/AFK loop
- [[claude-code]] — The agent CLI Ralph wraps

## Sources

- `raw/how-to-ralph-wiggum.md` — Huntley's fork of the Ralph Wiggum playbook
- `raw/ralph-wiggum-playbook.md` — paddo.dev summary
