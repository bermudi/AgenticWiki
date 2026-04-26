---
title: Ubiquitous Language
created: 2026-04-25
updated: 2026-04-25
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

## Thread

- [[the-human-lever]] — Defining the language is a high-leverage human task.
- [[the-agent-workflow]] — Using the language to guide the agent through complex implementations.

## Related

- [[shared-design-concept]] — The internal mental model that the language describes.
- [[ai-design-loop]] — The process of refining the language through interaction.

## Sources

- `raw/yt-claude-code-feature-build.md` — Matt Pocock's use of a Ubiquitous Language document to guide a feature build.
