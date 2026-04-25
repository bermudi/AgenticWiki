---
title: pi
created: 2026-04-25
updated: 2026-04-25
sources: [raw/yt-building-pi-in-a-world-of-slop.md]
tags: [tool, ai-agents, open-source]
---

# pi

> A minimal and malleable AI coding agent harness designed for observability and extensibility.

## Overview

Pi is a CLI tool that provides a thin layer between an LLM and a developer's local environment. Unlike more complex "autonomous" agents, pi focuses on being a high-leverage tool that the human remains in control of.

## Core Design Principles

1.  **Minimalism**: Only four core tools (`read`, `write`, `edit`, `bash`) to minimize token usage and overhead.
2.  **Observability**: Full transparency into the LLM's thought process and tool calls.
3.  **Malleability**: Both the human and the agent can modify the environment, add new tools, and define custom workflows (e.g., through skills).
4.  **Model Agnostic**: Can be used with different LLM providers and models.

## Architecture

Pi is composed of several modules:
- `pi-ai`: A unified API for different LLMs.
- `pi-agent-core`: The main loop and tool execution engine.
- `pi-tui`: A terminal UI for interaction.
- `pi-coding-agent`: The CLI implementation that manages sessions and context.

## Thread
- [[the-agent-workflow]] — Pi's minimalism and session model as structural safeguards for context management
- [[the-human-lever]] — Observability as the mechanism that enables grey box engineering

## Related
- [[mario-zechner]] — Creator of pi.
- [[malleable-agents]] — The philosophy behind pi.
- [[slop]] — Pi is designed to help engineers avoid generating slop.

## Sources

- `raw/yt-building-pi-in-a-world-of-slop.md`
