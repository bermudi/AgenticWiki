---
title: Building a complex feature with an AI agent (Claude Code)
created: 2026-04-25
updated: 2026-04-25
sources: [raw/yt-claude-code-feature-build.md]
tags: [workflow, agents, claude-code, hitl, design]
---

# Building a complex feature with an AI agent (Claude Code)

> Matt Pocock demonstrates a sophisticated agent-assisted workflow to build a multi-layered feature, emphasizing the transition from manual coding to "design and verify" engineering.

## Summary

In this video, Matt Pocock uses Claude Code to implement "Ghost Courses" and "Ghost Lessons" in his `course-video-manager` project. The core challenge is managing entities that exist as concepts (ghosts) but need to be persisted to the database (materialized) when certain actions occur. The demonstration highlights how high-level design documents and shared terminology are more critical than individual lines of code.

## Key Concepts

### Ubiquitous Language
Matt emphasizes the need for a [[shared-design-concept]] through a "Ubiquitous Language" document. This ensures that when the human says "Ghost Course," the agent knows exactly what that means in terms of types, database schemas, and expected behavior.

### The Grill-Me Session
Before implementation, Matt uses a `grill-me` skill to have the agent challenge his assumptions. This identifies edge cases (like what happens if a ghost lesson is created for a course that doesn't exist yet) before a single line of feature code is written.

### PRD to Issues Pipeline
The workflow moves from a high-level PRD to granular GitHub issues. This decomposition allows the agent to work in smaller, verifiable chunks rather than attempting a monolithic feature build.

### AFK (Away From Keyboard) Agents
The actual implementation is handled by "Ralph," an AFK agent working in a sandboxed environment. This separates the "Design" phase (interactive) from the "Implementation" phase (background).

### Materialization Cascade
A complex logic pattern where an action on a child entity (Ghost Lesson) triggers the creation of its parent (Ghost Course) and the corresponding database records. This "cascade" was defined in the PRD and implemented by the agent.

## Workflow

1.  **Exploration**: Agent reads the codebase to understand the current state.
2.  **Design (HITL)**: Human and agent collaborate on a PRD and Ubiquitous Language.
3.  **Refinement**: Use `/grill-me` to stress-test the design.
4.  **Planning**: Agent generates GitHub issues.
5.  **Execution (AFK)**: Background agent implements the issues.
6.  **Verification**: Human reviews the work via a QA UI and provides feedback.

## Thread

- [[the-agent-workflow]] — This is a prime example of the HITL/AFK split and context management.
- [[the-human-lever]] — Matt focuses on defining boundaries and verifying, rather than typing code.
- [[the-slop-problem]] — By using a PRD and Ubiquitous Language, Matt prevents the agent from generating "slop" that doesn't fit the project's architecture.

## Related

- [[claude-code]] — The primary tool used in the demonstration.
- [[shared-design-concept]] — The underlying theory of ensuring human and agent are aligned.
- `/grill-me` — The specific skill used for design pressure-testing.
- [[verification-loop]] — The broader pattern of verification that `/grill-me` fits into.

## Sources

- `raw/yt-claude-code-feature-build.md` — Original video analysis.
