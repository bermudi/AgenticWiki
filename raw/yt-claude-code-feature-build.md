---
type: youtube
url: https://www.youtube.com/watch?v=hX7yG1KVYhI
title: Building a complex feature with an AI agent (Claude Code)
channel: Matt Pocock
date: 2025-03-24
ingested: 2026-04-25
---

# Key points extracted during ingest

- Matt Pocock builds a "Ghost Course" feature for his "course-video-manager" using Claude Code.
- Workflow:
    - **Grill-me session**: Using a `/grill-me` command to stress-test the design requirements before writing any code.
    - **Ubiquitous Language**: Maintaining a shared glossary in the codebase to ensure human and agent use the same terminology (e.g., defining "Ghost Course", "Ghost Lesson", "Materialization").
    - **Codebase Exploration**: Agent reads schemas, types, and existing logic to build a mental model.
    - **PRD & Issues**: Agent generates a Product Requirements Document and then breaks it down into actionable GitHub issues.
    - **AFK Execution**: A background agent (named Ralph) works in a Docker sandbox to implement the issues.
    - **QA UI**: A custom tool for humans to review the agent's work, providing feedback that goes back into the agent's context.
    - **Materialization Cascade**: A specific logic where creating a "Ghost Lesson" might trigger the creation of a "Ghost Course" and the DB entries (Materialization).
- Philosophical shift: The engineer's role is defining the "Ubiquitous Language" and the "Shared Design Concept," while the agent handles the implementation "grunt work."

> Full content was processed via Gemini's native video understanding.
> This file captures extracted knowledge, not the raw transcript.
