---
title: pi
created: 2026-04-25
updated: 2026-05-04
sources:
  - raw/yt-building-pi-in-a-world-of-slop.md
  - "raw/Building Pi, and what makes self-modifying software so fascinating - youtube.com.md"
  - raw/slowing-the-fuck-down.md
tags: [tool, ai-agents, open-source, self-modifying-software]
---

# pi

> A minimal and malleable AI coding agent harness designed for observability, extensibility, and self-modification. Built by [[mario-zechner|Mario Zechner]] out of frustration with existing tools that manipulated context behind his back.

## Origin Story

Mario was an early and enthusiastic Claude Code user. Claude Code's invention of agentic search — giving the LLM direct filesystem access instead of relying on vector search — was the breakthrough that made coding agents viable. But as the Claude Code team dogfooded and grew, the tool became unstable. The breaking point: Anthropic began injecting system reminders and modifying tool definitions behind the user's back, silently changing agent behavior between releases. Mario reverse-engineered their obfuscated JavaScript to track the evolution of Claude Code's system prompt (documented at cc-history.mario.ai). Every release was "messing with stuff."

He looked at alternatives:
- **Aider/Amp**: Good but expensive — couldn't use API subscriptions, required per-token pricing.
- **Open Code**: Open source, but also manipulated context (pruning tool results, injecting LSP diagnostics after every edit call — confusing the model with errors for code it hadn't finished writing). Required forking to modify.

Mario's reaction: "How hard can it be?" He built his own.

## Core Design Principles

1. **Minimalism**: Only four core tools (`read`, `write`, `edit`, `bash`) to minimize token usage, decision overhead, and failure surface.
2. **Stability**: The deterministic parts (everything around the LLM) should be rock-solid. The non-deterministic parts (the LLM itself) are unavoidable. But your hammer shouldn't break at a different spot every day.
3. **Context transparency**: No behind-the-back context injection. The user controls what goes into the model. This is Pi's founding grievance.
4. **Observability**: Full transparency into the LLM's thought process and tool calls.
5. **Malleability**: Both the human and the agent can modify the environment, add new tools, and define custom workflows.
6. **Model agnostic**: Can be used with different LLM providers and models.

## Architecture

Pi is composed of several modules:
- `pi-ai`: A unified API for different LLMs (Mario built his own abstraction, unconvinced by the Vercel AI SDK).
- `pi-agent-core`: The main loop and tool execution engine.
- `pi-tui`: A terminal UI for interaction.
- `pi-coding-agent`: The CLI implementation that manages sessions and context.

The extensibility comes from hook points — simple TypeScript modules loaded into the same Node process that let you provide custom tools, custom compaction, or fully revamp the TUI.

## Self-Modification

Pi's deepest feature: you can ask Pi to modify itself. Non-technical friends of Mario's have asked Pi to rebuild Pi's own UI because the extension points make it trivial. The core stays small; the periphery is emergent. This is Mario's first foray into what he calls **self-modifying software** — software that adapts itself on behalf of the user's wishes and needs. He believes this paradigm extends beyond coding tools to all knowledge work.

Examples of what users have built through self-modification:
- **MCP support**: Pi doesn't ship with MCP. Users ask Pi to add MCP support to Pi.
- **Plan modes**: Multiple implementations explored, iterated, sometimes abandoned (Armin went through five before deciding plan mode is useless).
- **RL environments**: Someone reconfigured Pi as the agent in a reinforcement learning execution environment for open-weight models.
- **Cosmetic UI changes**: Different editor box styles, visual tweaks.

## The OpenClaw Relationship

Peter Steinberger's personal AI assistant **OpenClaw** runs on Pi. The relationship has been both productive and challenging:

- **Pi got compaction because OpenClaw needed it**. Peter was "crying in chat" about needing it. Mario built it but tells his own users "don't use compaction, it's bad for you."
- **OpenClaw drove PR/issue explosion**. OpenClaw instances autonomously file issues and PRs on the Pi repo. Mario built a 3D visualization tool to cluster similar issues in 3D space and bulk-select/close them.
- **Auto-close workflow**: Every PR from an unknown account gets auto-closed. A GitHub workflow posts a comment asking the human to resubmit as a human-voice issue. Agents don't read the comment — making it an effective human/bot filter.
- Peter originally forked Pi into "towel" before switching back to using Pi directly.

## Quality Philosophy

Mario's approach to keeping Pi's codebase quality high despite heavy agent usage:

- **Refactor mercilessly**: Refactoring pulls him into the codebase structurally, not just line-by-line. He needs to understand what's going on to do a good refactor. Being in the code is the one thing that keeps quality high and complexity low.
- **Accept slop in unimportant places**: The HTML export feature — he's never looked at a single line. If it looks right coming out, that's fine.
- **Guard the core**: The agent loop, extension loading mechanism, and critical paths get careful human attention.
- **"Slow the f down"**: His blog post argument: if an agent produces 10x more code per day, it also produces 10x more bugs. Even at half your error rate, that's 5x more bugs. Dark factory with 100 agents? Simple math. Set limits on how much code you let the clanker generate per day, in line with your ability to review. "Write architecture by hand. Be in the code."
- **Merchants of learned complexity**: Agents are merchants of complexity — they've seen bad architectural decisions in training data. When they architect, you get cargo cult. Agents never see each other's runs or the full codebase, so decisions are always local, leading to duplication and unnecessary abstraction.
- **Agentic search has low recall**: The bigger the codebase, the less likely the agent finds all relevant code, regardless of search tool. Low recall is the root cause of duplicated, inconsistent code.
- **Untrustworthy tests**: Agent-written tests are as untrustworthy as agent-written code. Manual testing becomes the only reliable quality measure.

## Future

Mario plans a web-based alternative UI to the TUI. The terminal's line-based rendering is inherently limited. A web interface would enable richer interactions and make self-modification more accessible to non-technical users.

## Thread

- [[the-agent-workflow]] — Pi's minimalism and session model as structural safeguards for context management
- [[the-human-lever]] — Observability as the mechanism that enables grey box engineering; "refactor mercilessly" as the human-in-the-code practice
- [[tool-design-for-agents]] — Four-tool minimalism as the extreme end of tool design for agents; MCP vs CLI; context transparency as a founding principle
- [[the-slop-problem]] — "Slow the f down" math; agents don't feel pain; training data quality

## Related

- [[mario-zechner]] — Creator of pi.
- [[malleable-agents]] — The philosophy behind pi's extension system.
- [[slop]] — Pi is designed to help engineers avoid generating slop.
- [[claude-code]] — Pi's origin is Mario's frustration with Claude Code's context manipulation.
- [[compounding-booboos]] — Pi's observability helps catch booboos early.
- [[smart-zone-dumb-zone]] — Pi's session model helps stay in the Smart Zone.
- [[astral]] — Peer tool builder adapting for agentic use.
- [[grey-box-engineering]] — Pi's observability enables grey box engineering.
- [[deliberate-friction]] — Mario's auto-close workflow as deliberate friction against agent PR floods.
- [[slop-watch]] — Slop Watch would observe Pi sessions too; Pi's extension/skill API is one of the per-agent adapter targets.
- [[fighting-slop-with-slop]] — Mario's practice of accepting slop in Pi's HTML export is a case study of the fighting-slop-with-slop principle.

## Sources

- `raw/yt-building-pi-in-a-world-of-slop.md`
- `raw/Building Pi, and what makes self-modifying software so fascinating - youtube.com.md` — Origin story, OpenClaw relationship, self-modification philosophy, MCP vs CLI, "slow the f down", quality approach
