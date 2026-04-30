---
title: Claude Code
created: 2026-04-25
updated: 2026-05-01
sources: [raw/yt-claude-code-feature-build.md, raw/how-to-ralph-wiggum.md, raw/ralph-wiggum-playbook.md, "raw/Building Pi, and what makes self-modifying software so fascinating - youtube.com.md"]
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

## The Context Manipulation Problem

[[mario-zechner|Mario Zechner]] was an early, enthusiastic Claude Code user but soured on it during summer 2025. His grievances:

- **Silent context injection**: Anthropic injected system reminders and modified tool definitions behind the user's back, changing agent behavior between releases without the user's knowledge.
- **Evolving system prompts**: Mario reverse-engineered their obfuscated JavaScript and tracked every system prompt change (documented at cc-history.mario.ai). "Every release was messing with stuff."
- **Workflow breakage**: Previously working workflows would stop working because of invisible system reminders modifying model behavior.

This experience directly motivated Mario to build [[pi]], founded on the principle of context transparency — the user controls what goes into the model.

## Thread

- [[the-agent-workflow]] — Claude Code enables the Ralph Wiggum AFK loop pattern; its agentic search was the workflow breakthrough
- [[tool-design-for-agents]] — Claude Code as a cautionary tale of context transparency failures and silent system prompt injection
- [[the-slop-problem]] — The context manipulation that drove Mario away from Claude Code is a form of tool-induced slop

## Related

- [[pi]] — Built as a reaction to Claude Code's context manipulation and instability.
- [[the-agent-workflow]] — The primary workflow pattern enabled by tools like Claude Code.
- [[afk-agent]] — Claude Code can spawn AFK agents (e.g., "Ralph").
- [[ralph-loop]] — The autonomous loop pattern built on top of Claude Code.
- [[geoffrey-huntley]] — Originator of the Ralph Wiggum pattern using Claude Code.
- [[mario-zechner]] — Former happy user who left due to context manipulation.
- [[tool-design-for-agents]] — Claude Code as a cautionary tale of context transparency failures.

## Sources

- `raw/yt-claude-code-feature-build.md` — Demonstration of complex feature building with Claude Code.
- `raw/how-to-ralph-wiggum.md` — Ralph Wiggum autonomous loop pattern using Claude Code.
