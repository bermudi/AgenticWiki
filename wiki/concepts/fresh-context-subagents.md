---
title: Fresh-Context Subagents
created: 2026-07-10
updated: 2026-07-10
sources:
  - raw/gsd-core-opengsd-spec-driven-framework.md
unaudited_marginal: 0
tags: [concept, context-engineering, multi-agent, agent-architecture]
---

# Fresh-Context Subagents

> An architectural pattern for preventing [[context-engineering|context rot]]: thin orchestrators spawn specialist subagents, each in its own isolated context window, focused only on its assigned task and reading only the artifacts it needs. The subagent writes its output to disk and returns a compact result; the orchestrator's context never grows with the weight of the subagent's work. Systematized by [[gsd-core|GSD Core]] as its primary defense against context degradation.

## The Problem: Context Rot

Context rot is the quality degradation that accumulates as an AI fills its context window with conversation history. The model's attention is finite — as the window fills, the signal-to-noise ratio drops, earlier content receives less attention, and the quality of reasoning and recall quietly degrades. The model does not warn you when this happens. It continues generating output, but that output is less accurate, less consistent, and more likely to contradict earlier decisions.

Context rot is why an AI that produces excellent results on a fresh task produces mediocre results on the tenth task in the same session. The model has not changed — its context has degraded. This is the practical manifestation of the [[self-conditioning]] finding: models degrade on their own accumulated history.

## The Pattern

Instead of running all work in a single long conversation, thin orchestrators spawn specialist subagents:

1. The orchestrator determines what work needs doing (research, planning, execution, verification).
2. It spawns a subagent with a precisely scoped prompt: the agent definition (role, tools, constraints), the subset of artifacts needed, and a model assignment.
3. The subagent starts with a fresh context window — up to 200K tokens, or up to 1M on models that support it — focused only on its assigned task.
4. The subagent runs to completion, writes its output to disk (a `RESEARCH.md`, a `PLAN.md`, a `SUMMARY.md`), and returns a compact result to the orchestrator.
5. The orchestrator's context never grows with the weight of the subagent's work — only the result arrives back.

## GSD Core's Instantiation

[[gsd-core|GSD Core]] systematizes this pattern. When you run `/gsd-plan-phase 1`, the orchestrator does not do the planning in your current conversation. It spawns:

1. **Four researcher subagents** — each with a fresh context, each focused on one research dimension, running in parallel
2. **A synthesizer subagent** — reads only the four research outputs, nothing else
3. **A planner subagent** — reads only PROJECT.md, REQUIREMENTS.md, CONTEXT.md, RESEARCH.md
4. **A plan-checker subagent** — reads only the generated plans and the phase context

None of these agents carries the weight of conversation history. Each starts clean. The result (a set of approved PLAN.md files) arrives in the main session without the accumulated cost of the work that produced it.

This pattern holds throughout the phase loop:
- **Execute:** Each executor subagent gets one plan and a fresh context — parallel executors run simultaneously without sharing state
- **Verify:** The verifier reads all summaries and performs a goal-backward check in its own clean window
- **Map codebase:** Four mapper subagents explore different dimensions in parallel

## Least Privilege

Each agent has access only to the tools it needs for its role. This keeps agents focused and prevents unintended side effects:

- Researchers: web access yes, code writing no, file editing no
- Planner: no web, no code, no file editing (writes plans only)
- Executor: code writing yes, file editing yes, web no
- Verifier: all no (read-only judgment)

## Relationship to Other Patterns

Fresh-context subagents are the architectural complement to [[context-engineering|context engineering]]'s operational techniques. Where context engineering manages what's in the window (progressive disclosure, context offloading, smart truncation), fresh-context subagents avoid the accumulation problem entirely by starting clean. The [[ralph-loop]] uses a minimalist version of this: each iteration is a fresh context window with a plan file as shared state. [[gsd-core|GSD Core]] generalizes it to a full multi-agent architecture.

The pattern is also related to sub-agent isolation — spawning sub-agents with clean context for parallelizable tasks to prevent task A's tool results from polluting task B's reasoning (a technique documented in [[context-engineering]]). GSD Core extends this from a technique for parallel tasks to the default execution model for all heavy work.

## Context Monitor

Even with fresh-context subagents, some workflows run in the main session for extended periods. GSD Core includes a context monitor hook that watches context usage and injects warnings: >35% normal, ≤35% WARNING (wrap up), ≤25% CRITICAL (save state and start new session). This makes context degradation visible — the model won't warn you, but the hook will.

## Thread

- [[the-agent-workflow]] — Fresh-context subagents are the architectural foundation for reliable long-horizon agent workflows
- [[context-engineering]] — The pattern is the architectural complement to operational context management techniques

## Related

- [[gsd-core]] — The framework that systematizes this pattern
- [[ralph-loop]] — A minimalist version: fresh context per iteration with a plan file as shared state
- [[self-conditioning]] — The failure mode this pattern prevents: models degrading on their own accumulated history
- [[context-engineering]] — The broader discipline; fresh-context subagents are the architectural layer
- Sub-agent isolation — The simpler pattern this generalizes (documented in [[context-engineering]])
- [[babysitter-agent]] — An alternative persistence mechanism; fresh-context subagents avoid the need for a babysitter by design
- [[plan-disposability]] — Fresh plans per session as a persistence strategy

## Sources

- `raw/gsd-core-opengsd-spec-driven-framework.md` — Full documentation of GSD Core's fresh-context subagent architecture, agent categories, tool permissions, spawn patterns, context monitor hook.
