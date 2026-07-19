---
title: Claude Code
created: 2026-04-25
updated: 2026-07-19
sources: [raw/yt-claude-code-feature-build.md, raw/how-to-ralph-wiggum.md, raw/ralph-wiggum-playbook.md, "raw/yt-building-pi-and-what-makes-self-modifying-software-so-fascinating.md", raw/thariq-unreasonable-effectiveness-of-html.md, raw/wtf-is-a-loop-peter-steinberger-vs-boris-cherny.md]
tags: [tool, ai, agent, anthropic]
unaudited_marginal: 0
---

# Claude Code

> A command-line interface (CLI) agent from Anthropic designed for high-fidelity code exploration, editing, and execution.

## Overview

Claude Code is an agentic tool that operates directly in the terminal, allowing developers to interact with their codebase through natural language. It can read files, search the repository, run commands, and propose multi-file edits. It was created by [[boris-cherny|Boris Cherny]] as a side project in September 2024 and now reportedly sits behind close to four percent of all public commits on GitHub.

## Features

- **Agentic Workflows**: Supports complex tasks like bug fixing, feature implementation, and codebase refactoring.
- **Tools & Skills**: Can be extended with custom skills (e.g., `/grill-me`) to perform specialized tasks.
- **HITL/AFK Support**: Designed to work both interactively with the developer and as a background agent for longer-running tasks.
- **Security**: Can be run in sandboxed environments (like Docker) to prevent unsafe operations.
- **Autonomous loops**: Supports the Ralph Wiggum pattern — `while :; do cat PROMPT.md | claude ; done` — for fully autonomous implementation with fresh context per iteration.

## Autonomous Loops: /loop and /goal

In spring 2026 Claude Code shipped productized loop primitives that made [[boris-cherny|Cherny]]'s "designing loops that prompt your agents" thesis a one-command on-ramp:

- **`/goal`** — runs the [[ralph-loop|ralph loop]] until a small validator model confirms the task is done.
- **`/loop`** — a built-in loop with cron-like scheduling (uses cron under the hood) that runs on infrastructure time instead of your attention. Cherny's canonical starter:

```
/loop babysit all my PRs. Auto-fix build issues, and when comments come in, use a worktree agent to fix them.
```

Cherny's five tips for running Opus autonomously for hours or days (June 2026), in his words:

> Use auto mode for permissions so Claude doesn't ask for approval; use dynamic workflows to have Claude orchestrate hundreds or thousands of agents to get a task done; use /goal or /loop to nudge Claude to keep going until it's done; use Claude Code in the cloud so you can close your laptop; and make sure Claude has a way to self-verify its work end to end.

Tip five is the one the hype skips and the practitioners obsess over: a loop is only as trustworthy as its ability to check its own work.

The loops inherit the [[agent-loop|hard-stops discipline]] — maximum iteration count, no-progress detection, a token-or-dollar budget ceiling — because the loop that does not stop is the production failure mode. See [[orchestration-loop]].

## The Context Manipulation Problem

[[mario-zechner|Mario Zechner]] was an early, enthusiastic Claude Code user but soured on it during summer 2025. His grievances:

- **Silent context injection**: Anthropic injected system reminders and modified tool definitions behind the user's back, changing agent behavior between releases without the user's knowledge.
- **Evolving system prompts**: Mario reverse-engineered their obfuscated JavaScript and tracked every system prompt change (documented at cc-history.mario.ai). "Every release was messing with stuff."
- **Workflow breakage**: Previously working workflows would stop working because of invisible system reminders modifying model behavior.

This experience directly motivated Mario to build [[pi]], founded on the principle of context transparency — the user controls what goes into the model.

## HTML as a Workflow Primitive

[[thariq|Thariq]] (Claude Code team) documents a workflow where HTML files replace Markdown as the primary agent output. Claude Code's rich context access — filesystem, MCPs (Slack, Linear), browser, git history — makes it uniquely suited for generating HTML that synthesizes information across multiple data sources. The pattern: ask Claude Code to generate an HTML file, interact with it (or export state from it), then pass the file to a new session for implementation.

This also applies in reverse: HTML files serve as high-context inputs for verification agents. When verifying implementation, the verification agent reads the HTML plan files and has much broader context on what was intended.

## Thread

- [[the-agent-workflow]] — Claude Code enables the Ralph Wiggum AFK loop pattern; its agentic search was the workflow breakthrough
- [[tool-design-for-agents]] — Claude Code as a cautionary tale of context transparency failures and silent system prompt injection
- [[the-slop-problem]] — The context manipulation that drove Mario away from Claude Code is a form of tool-induced slop

## Related

- [[agent-skills]] — Claude Code's skill system (the `/skill-name` slash command and progressive disclosure) is the primary platform for skill execution; Claude Code also uses skills internally for the Ralph loop pattern
- [[pi]] — Built as a reaction to Claude Code's context manipulation and instability.
- [[the-agent-workflow]] — The primary workflow pattern enabled by tools like Claude Code.
- [[afk-agent]] — Claude Code can spawn AFK agents (e.g., "Ralph").
- [[ralph-loop]] — The autonomous loop pattern built on top of Claude Code.
- [[geoffrey-huntley]] — Originator of the Ralph Wiggum pattern using Claude Code.
- [[mario-zechner]] — Former happy user who left due to context manipulation.
- [[tool-design-for-agents]] — Claude Code as a cautionary tale of context transparency failures.
- [[lance-martin]] — Identified Claude Code as a reference implementation of the thin-tool-layer architecture his Deep Agents harness also uses
- [[context-engineering]] — Claude Code's sub-agent spawning and context isolation are operational context engineering techniques
- [[multi-tier-action-space]] — Claude Code is one of the four independent implementations (with Manis, AMP, Deep Agents) that converged on the thin-tool-layer + computer architecture
- [[slop-watch]] — Claude Code is Slop Watch's first adapter target; hook surface and JSONL output as the primary ingestion path.
- [[chris-parsons]] — Runs Ralph loops 24/7 through Claude Code; operationalized the worker loop pattern

- [[thariq]] — Claude Code team member who documented the HTML-as-output workflow pattern
- [[html-as-agent-output]] — HTML as the emerging output format for agent communication
- [[opencode]] — A similar open-source coding agent rewritten in Effect (~8M MAU)
- [[boris-cherny]] — Creator of Claude Code (side project, September 2024)
- [[agent-loop]] — The concept Claude Code's `/loop` and `/goal` primitives instantiate
- [[orchestration-loop]] — Stage 5: loops supervising loops on a schedule, made accessible by `/loop`
- [[gas-town]] — Steve Yegge's open-source orchestration loop built on 20–30 Claude Code instances
- [[claude-tag]] — The multiplayer/async/proactive sibling: Claude Code made a persistent, channel-scoped team member (paradigm 3)
- [[llm-ui-paradigms]] — Karpathy's three-paradigm framing; Claude Code is paradigm 2 (app), Claude Tag is paradigm 3 (persistent org-level entity)
- [[grammar-constrained-sampling]] — Claude Code's lenient tool-call parsing masks a decoding-level failure (~20% edit failure) that only strict harnesses surface
- [[harness-monoculture]] — Claude Code's leniency is hypothesized to propagate through RL training as a de-facto ecosystem spec
- [[agentskills]] — Claude Code is a primary reference client for the Agent Skills open standard; supports `disable-model-invocation` user-invoked skills

## Sources

- `raw/yt-claude-code-feature-build.md` — Demonstration of complex feature building with Claude Code.
- `raw/how-to-ralph-wiggum.md` — Ralph Wiggum autonomous loop pattern using Claude Code.
- `raw/ralph-wiggum-playbook.md` — paddo.dev summary of the Ralph methodology, Claude Code's role as the agent CLI in the loop.
- `raw/yt-building-pi-and-what-makes-self-modifying-software-so-fascinating.md` — Mario's grievances with Claude Code (silent context injection, system prompt manipulation); the "should I just build my own" origin story that led to Pi.
- `raw/thariq-unreasonable-effectiveness-of-html.md` — Thariq's article on using Claude Code to generate HTML files for specs, code review, design, reports, and custom editors; the tool's context access (filesystem, MCPs, git, browser) as the key differentiator over Claude.ai artifacts.
- `raw/wtf-is-a-loop-peter-steinberger-vs-boris-cherny.md` — Cherny as creator (side project, Sep 2024; ~4% of public GitHub commits); the `/loop` and `/goal` primitives; the five autonomous-Opus tips; the canonical `/loop` starter
