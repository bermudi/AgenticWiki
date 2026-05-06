---
title: Doc Rot
created: 2026-05-05
updated: 2026-05-05
sources:
  - "raw/Full Walkthrough Workflow for AI Coding — Matt Pocock - youtube.com.md"
tags: [documentation, agent-workflow, anti-pattern]
---

# Doc Rot

> Stale documentation and completed PRDs that linger in a repository and mislead future agent sessions into following outdated assumptions — code has moved on, but the docs haven't.

## The Problem

[[matt-pocock|Matt Pocock]] identified a specific failure mode: you keep a completed PRD in the repo. A month later, you start a new agent session to modify the same feature. The agent discovers the old PRD, treats it as authoritative, and generates code based on requirements that no longer match the codebase. File names have changed, structure has shifted, even product decisions have been invalidated by user testing — but the agent doesn't know that.

This is distinct from [[document-degradation]] (silent corruption during LLM editing). Doc rot isn't about corruption — it's about **staleness**. The document is still internally coherent; it just describes a version of the codebase that no longer exists.

## Matt's Solution: Delete or Mark Closed

Matt's approach: **don't keep completed PRDs in the repo**. In his GitHub-issues-based workflow, he marks PRD issues as closed. An agent *can* fetch them if it wants, but the closed status is a visual signal that the content may be stale.

For local markdown PRDs, he simply deletes them after implementation.

The counterintuitive insight: **documentation can be worse than no documentation** when it's stale. An agent with no prior docs will explore the current codebase and discover the real state. An agent with stale docs will pattern-match against outdated assumptions.

## The PRD as Ephemeral Artifact

This philosophy reframes the PRD: it's not a living document. It's an **ephemeral destination hint** that serves its purpose during planning and implementation, then becomes a liability.

The real artifact that persists is the **code**. The tests encode the requirements. The types encode the interfaces. The Kanban issues encode the work done. The PRD was scaffolding.

## Thread
- [[the-agent-workflow]] — Doc rot as a workflow hazard: stale artifacts misdirect future agents
- [[the-human-lever]] — The human's role includes pruning stale context; agents can't detect staleness
- [[intent-to-code]] — Pocock's specific argument against plan-as-contract: specs left in the repo become stale and mislead agents

## Related

- [[document-degradation]] — Distinct concept: LLMs silently corrupting documents during editing (not staleness)
- [[plan-disposability]] — Plans as ephemeral coordination state; doc rot is why disposability matters
- [[ai-design-loop]] — The PRD lives within the design loop; it should not outlive it
- [[verification-loop]] — Tests replace stale docs as the living specification
- [[matt-pocock]] — Primary advocate of deleting completed PRDs

## Sources
- `raw/Full Walkthrough Workflow for AI Coding — Matt Pocock - youtube.com.md` — The doc rot argument: stale PRDs mislead agents, the code IS the documentation, mark PRDs as closed/done.
