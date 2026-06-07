---
title: Single-Player to Multiplayer (SDD at Team Scale)
created: 2026-06-07
updated: 2026-06-08
sources:
  - raw/yt-cian-clarke-vibe-coding-to-spec-driven-dev.md
unaudited_marginal: 0
tags: [concept, multi-agent, team-workflow, spec-driven-development]
---

# Single-Player to Multiplayer (SDD at Team Scale)

> The current generation of spec-driven development tooling is built around a single individual contributor driving a sequence of stories executed serially. The next step is decomposing work by contributor specialization and running stories in parallel — but agentic team pace magnifies the cost of merge conflicts and forgotten commits, requiring new workflow primitives like staging gates and tighter synchronization with project management tools.

## The Frame

Cian Clarke ([[cian-clarke]], Near Form, DevCon Fall 2025) borrows the single-player-to-multiplayer frame from another DevCon keynote. The current SDD tooling stack — Kiro, BMAD, Spec Kit — is centered on individual use: one operator, one project, one sequence of tasks.

Clarke argues this is "probably the biggest challenge that we're having right now." The reason it matters: at agentic team pace, the codebase moves "not at the pace of regular work but at the pace of an agentic team." Slow individual decisions that worked fine in a 12-person engineering team become catastrophic when the work is being done by agents in parallel.

## The Two Fixes

### 1. Decompose by specialization, not by feature

If the team is a frontend engineer, a backend engineer, and a DevOps engineer, the backlog should be decomposed so each story targets one unique area of the architecture — frontend, backend, or DevOps — rather than spanning the whole codebase. This is the inverse of the "full stack developer that can just do everything" assumption baked into most current SDD tools.

The payoff: stories are much less likely to cause merge conflicts when they map to non-overlapping areas of the codebase. Specialization also aligns with [[multi-agent-code-orchestration]] patterns where distinct roles have distinct tool surfaces.

### 2. Staging gate

At agentic pace, "if one of them forgets to commit during the course of their work, the consequences of that are now much greater." The fix is a hard gate in the development lifecycle: nobody moves on without committing, pushing, and rebasing against master. Clarke: "we actually need this staging gate within our development life cycle that actually prevents anybody from moving on without committing, pushing, and making sure that everything is rebased with with master."

This is a workflow primitive, not a tooling primitive — it's a discipline enforced at the team level.

## Open Problems

- **Backlog synchronization with external tools.** Clarke suggests syncing the SDD backlog with Jira / GitHub Issues / Linear via MCP for transparency into the work of agents. None of the existing tools do this well.
- **Cross-functional specs.** A change in API design that is also a security concern (PII redaction in logging) needs to update multiple specs. The current tools tend to assume a one-to-one mapping from spec to feature.
- **Specialized role definitions.** The BMAD method's "technical director," "QA tester," "backend engineer" roles are a starting point but are not standardized across the ecosystem. Near Form is rolling their own variants.

## Empirical Status

Anecdotal. Clarke reports that Near Form is "building out you know a team of engineers um that might be much smaller than a traditional team you know we're no longer having teams of 12 or 15 people building on an agentic project it might be three or four so tiny teams." The single-player-to-multiplayer transition is observed in production at Near Form, not yet validated by external studies.

## Thread

- [[intent-to-code]] — The single-player-to-multiplayer problem is a scaling question for the plan-as-contract position: what happens to the spec as a coordination artifact when multiple contributors work in parallel?
- [[the-agent-workflow]] — The staging gate is a workflow primitive, not a tooling one; it extends the agent workflow to team scale
- [[multi-agent-code-orchestration]] — Specialization-by-architecture-area is one model; the wiki also has competing models for multi-agent role definition

## Related

- [[cian-clarke]] — The originator of the single-player-to-multiplayer frame as applied to SDD
- [[spec-driven-development]] — The hub concept; this page is the team-scale extension
- [[kiro]] — One of the foundational SDD tools Near Form uses; the current single-player bias is in the tool design
- [[bmad-method]] — The other foundational tool; strong on specialized role definition, which is the conceptual foundation for the multi-player transition
- [[multi-tier-action-space]] — Different agent roles need different tool surfaces; the specialization argument is downstream of the tool surface question
- [[grey-box-engineering]] — The HITL/AFK handoff is per-developer in the current frame; multi-player SDD needs to define what HITL means at team scale

## Sources

- `raw/yt-cian-clarke-vibe-coding-to-spec-driven-dev.md` — DevCon Fall 2025 talk. Single-player-to-multiplayer framing, decomposition by architecture area, staging gate primitive, sync with Jira/Linear via MCP, tiny team observation, brownfield + legacy language + prototype failures.
