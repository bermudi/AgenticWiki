---
title: Decision Extraction
created: 2026-06-07
updated: 2026-06-07
sources:
  - raw/yt-learnings-from-a-no-code-library-keeping-the-spec-driven-development-triangle-in-sync.md
tags: [concept, spec-driven-development, workflow, observability, decisions]
unaudited_marginal: 0
---

# Decision Extraction

> The practice of mining decisions from code diffs and agent traces during commit, presenting them for human approval, and logging them as structured artifacts. A mechanism for keeping the [[spec-code-triangle|spec-code triangle]] in sync and for maintaining intent traceability across an AI-assisted codebase. Concrete implementation: [[plum-dev|Plum]].

## What It Is

Every commit to an AI-assisted codebase contains decisions — choices made by the human, the agent, or both. These decisions include:

- Architectural choices (how to structure the implementation)
- Trade-offs (speed vs. correctness, simplicity vs. extensibility)
- Dependencies and subtle choices that weren't in the spec
- Silent LLM behavior (things the agent did without asking)

Decision extraction is the practice of **surfacing these decisions at commit time**, forcing human acknowledgment, and recording them as artifacts.

## How It Works

[[plum-dev|Plum]] implements decision extraction as a commit hook:

1. Evaluate code diffs from the last commit
2. Evaluate agent traces (conversations) since the last commit
3. Extract decisions using an LLM (structured via DSPy)
4. Deduplicate decisions
5. Present to user for approval/rejection/editing
6. Log approved decisions as structured JSONL

The decision record includes:
- The decision question and answer
- `approved_by`: user or LLM (enables blame)
- Branch, timestamp, sync timestamp
- Whether it was informed by the conversation
- Code references and branch context

## Why It Matters

### Intent Traceability

"Hey, this code is done this way — is there a decision we made that is why we did this?" The decision log answers this. It's "code review where we capture intent."

### Spec-Code Synchronization

Approved decisions feed back into the spec, keeping the [[spec-code-triangle|triangle]] in sync. The spec evolves as implementation decisions are made.

### LLM Behavior Surfacing

"Sometimes you hit one you don't like and you have to say, 'No, I reject that.'" Silent LLM behavior — things the agent did without asking — gets surfaced as decisions that need approval. This is [[backpressure]] at the intent level, not just the output level.

### Hack Documentation

Shortcuts get logged. You can search for all shortcuts taken and prioritize fixing them. Rather than silently accumulating [[the-slop-problem|slop]], shortcuts become tracked debt.

### Agent Context

The decision log serves as persistent context for future agent sessions. When an agent needs to understand why something was done a certain way, it can search the decision tree rather than scanning the entire codebase.

## The "Tool Not Skill" Principle

Decision extraction cannot be a [[agent-skills|skill]] — it must be a tool:

- It must run outside the agent (handle commits, triggers, small fixes)
- It must enforce checkpoints (commit hooks that block), not just suggest
- It must be canonical and non-optional

"A skill is a suggestion. A tool needs a checkpoint."

## The Artifact as Source of Truth

The decision log becomes a new artifact in the codebase — not just code changes, but **intent**. "Not just the code changes, but the intent." This artifact can be tied to code changes, branches, and enriched with metadata about when it was approved, recreated, and synced.

## Connection to Observability

Decision extraction is a form of [[agent-observability|agent observability]] focused on the *intent* layer rather than the *execution* layer. Standard observability tracks what the agent did; decision extraction tracks *why* it did it. Combined with traces and metrics, decision extraction completes the picture: you can see what happened, why it happened, and whether the human approved.

## Thread

- [[the-agent-workflow]] — Decision extraction as a new workflow primitive
- [[spec-driven-development]] — Decision extraction operationalizes the spec-code triangle
- [[the-slop-problem]] — Decision tracking prevents silent accumulation of shortcuts

## Related

- [[plum-dev]] — The concrete implementation
- [[drew-breunig]] — Originator
- [[spec-code-triangle]] — The model decision extraction operationalizes
- [[code-clarifies-spec]] — Decision extraction captures what implementation clarified
- [[agent-observability]] — Decision extraction as intent-level observability
- [[backpressure]] — Commit-hook failure as decision-level backpressure
- [[verification-loop]] — Decision extraction adds a new verification layer
- [[agent-skills]] — The "tool not skill" boundary
- [[wide-events]] — Decision logs as intent-wide-events

## Sources

- `raw/yt-learnings-from-a-no-code-library-keeping-the-spec-driven-development-triangle-in-sync.md` — Breunig's talk; all claims derive from this source
