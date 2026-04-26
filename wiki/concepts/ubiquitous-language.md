---
title: Ubiquitous Language
created: 2026-04-25
updated: 2026-04-26
sources: [raw/yt-claude-code-feature-build.md]
tags: [concept, ddd, ai-native, design]
---

# Ubiquitous Language

> A shared, common language used by both humans and AI agents to ensure a common understanding of the domain model and system behavior.

## Context

Originally a core tenet of Domain-Driven Design (DDD), Ubiquitous Language takes on new importance in the age of AI. In an AI-native workflow, it serves as the "source of truth" for terminology that bridges the gap between the human's mental model and the agent's code generation.

## In AI-Native Engineering

- **Glossary as Context**: Maintaining a `UBIQUITOUS_LANGUAGE.md` file in the codebase allows the agent to ground its reasoning in specific, pre-defined terms (e.g., "Ghost Course" vs. "Real Course").
- **Reducing Ambiguity**: By forcing a shared vocabulary, the developer prevents the agent from introducing conflicting concepts or "slop" that doesn't align with the project's architecture.
- **Shared Design Concept**: It is the textual representation of the [[shared-design-concept]].

## Practical Example: The Materialization Cascade

[[matt-pocock|Matt Pocock]] demonstrates the power of ubiquitous language during a feature build for his course-video-manager. The grill-me session produces a new term — **"materialization cascade"** — describing the chain reaction when materializing a lesson inside a ghost course: assign file path to course → materialize section → materialize lesson.

The value compounds immediately:
1. **During grilling**: Precise language enables cleaner questions. "Should direct create work inside ghost courses?" is unambiguous when "ghost course" and "materialize" are defined.
2. **During PRD writing**: The PRD uses the established vocabulary, so the implementing agent encounters the same terms.
3. **During implementation**: A bug report saying "there's a bug in the materialization cascade" is immediately precise — no ambiguity about what subsystem failed.
4. **During debugging**: The glossary includes aliases to avoid (e.g., "create on disk" and "realize" are listed as informal synonyms), preventing the agent from inventing competing terminology.

Matt updates the ubiquitous language document after each grill-me session, adding new terms before proceeding to the PRD. This ensures the vocabulary is fresh and agreed-upon before any implementation begins.

## Thread

- [[the-human-lever]] — Defining the language is a high-leverage human task.
- [[the-agent-workflow]] — Using the language to guide the agent through complex implementations.

## Related

- [[shared-design-concept]] — The internal mental model that the language describes.
- [[ai-design-loop]] — The process of refining the language through interaction.
- [[the-human-lever]] — Defining the language is a high-leverage human task.
- [[grey-box-engineering]] — The language defines the boundaries of the grey box.
- [[matt-pocock]] — Primary advocate of ubiquitous language in AI workflows.

## Sources

- `raw/yt-claude-code-feature-build.md` — Matt Pocock's use of a Ubiquitous Language document to guide a feature build.
