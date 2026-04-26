---
title: Claude Code
created: 2026-04-25
updated: 2026-04-26
sources: [raw/yt-claude-code-feature-build.md, raw/how-to-ralph-wiggum.md, raw/ralph-wiggum-playbook.md]
tags: [tool, ai, agent, anthropic]
---

# Claude Code

> A command-line interface (CLI) agent from Anthropic designed for high-fidelity code exploration, editing, and execution.

## Overview

Claude Code is an agentic tool that operates directly in the terminal, allowing developers to interact with their codebase through natural language. It can read files, search the repository, run commands, and propose multi-file edits.

## Features

- **Agentic Workflows**: Supports complex tasks like bug fixing, feature implementation, and codebase refactoring.
- **Tools & Skills**: Can be extended with custom skills (e.g., `/grill-me`) to perform specialized tasks.
- **HITL/AFK Support**: Designed to work both interactively with the developer and as a background agent for longer-running tasks.
- **Security**: Can be run in sandboxed environments (like Docker) to prevent unsafe operations.
- **Autonomous loops**: Supports the Ralph Wiggum pattern — `while :; do cat PROMPT.md | claude ; done` — for fully autonomous implementation with fresh context per iteration.

## Related

- [[pi]] — Similar agent harness philosophy but with a focus on minimalism and malleability.
- [[the-agent-workflow]] — The primary workflow pattern enabled by tools like Claude Code.
- [[afk-agent]] — Claude Code can spawn AFK agents (e.g., "Ralph").

## Sources

- `raw/yt-claude-code-feature-build.md` — Demonstration of complex feature building with Claude Code.
- `raw/how-to-ralph-wiggum.md` — Ralph Wiggum autonomous loop pattern using Claude Code.
