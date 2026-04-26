---
title: Code Intelligence
created: 2026-04-25
updated: 2026-04-26
sources: ["raw/yt-no-vibes-allowed-dex-horthy.md"]
tags: ["static-analysis", "ai-context", "symbol-graph"]
---

# Code Intelligence

> The ability of a system to understand code semantically, including symbol definitions, references, and dependency relationships.

## Role in AI Engineering

In the context of AI coding assistants like [[cody]], code intelligence is used to provide **deep context** to the LLM. Instead of just sending raw text (standard RAG), the system sends:
- **Symbol Definitions**: What a specific class or function does.
- **References**: Where else this symbol is used.
- **Dependency Graphs**: How different modules interact.

This prevents [[vibes-based-engineering]] by grounding the AI's suggestions in the actual structure of the codebase.

## Thread
- [[the-human-lever]] — Code intelligence as the foundation for high-fidelity context in grey box engineering

## Related

- [[sourcegraph]] — A platform built around code intelligence.
- [[grey-box-engineering]] — Relies on code intelligence for "Human Design Authority."
- [[vibes-based-engineering]] — Code intelligence is the antidote to vibes-based context.
- [[cody]] — The product that embodies code intelligence for AI coding.
- [[dex-horthy]] — Primary advocate for code intelligence in AI workflows.

## Sources

- `raw/yt-no-vibes-allowed-dex-horthy.md`
