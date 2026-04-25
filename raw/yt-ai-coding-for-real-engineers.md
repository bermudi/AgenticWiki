---
type: youtube
url: https://youtube.com/watch?v=N_vC_SRE5-8&t=5560s
title: AI Coding For Real Engineers
channel: AI Engineer Europe
date: 2024-06-08
ingested: 2026-04-25
---

# Key points extracted during ingest

- **Smart Zone / Dumb Zone**: LLMs have a "Smart Zone" (first ~100k tokens) where reasoning is sharp. Beyond that, they enter the "Dumb Zone" as attention relationships scale quadratically.
- **HITL vs. AFK**: Planning should be Human-In-The-Loop (HITL) to ensure alignment. Implementation can be Away-From-Keyboard (AFK) once the "Destination" (PRD) and "Journey" (Kanban/Issues) are defined.
- **Grey Box Engineering**: Humans design the interfaces and shared concepts; agents fill in the implementation details.
- **Tracer Bullets (Vertical Slices)**: Instead of building layer-by-layer (DB then API then UI), build thin vertical slices that cross all layers to get immediate end-to-end feedback.
- **Clearing vs. Compacting**: Compacting context (summarizing history) leads to loss of precision. Clearing context and starting fresh with a minimal, high-quality prompt (The "Memento" approach) keeps the agent in the Smart Zone.
- **Deep Modules**: A simple interface hiding complex functionality. Deep modules are easier for agents to interact with than a web of many shallow modules.
- **TDD with Agents**: High-quality feedback loops (tests, types) are the "ceiling" for agent performance. Use Red-Green-Refactor to prevent the agent from "cheating" or producing "slop".

> Full content was processed via Gemini's native video understanding.
> This file captures extracted knowledge, not the raw transcript.
