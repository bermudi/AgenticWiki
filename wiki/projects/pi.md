---
title: pi
created: 2026-04-25
updated: 2026-09-16
sources:
  - raw/yt-building-pi-in-a-world-of-slop.md
  - "raw/yt-building-pi-and-what-makes-self-modifying-software-so-fascinating.md"
  - raw/slowing-the-fuck-down.md
  - raw/yt-code-isnt-free-mario-zechner-hard-truths-coding-ai.md
  - raw/harnesstax-how-much-does-the-harness-matter-for-coding-agents.md
unaudited_marginal: 0
tags: [tool, ai-agents, open-source, self-modifying-software]
---

# pi

> A minimal and malleable AI coding agent harness designed for observability, extensibility, and self-modification. Built by [[mario-zechner|Mario Zechner]] out of frustration with existing tools that manipulated context behind his back.

## Origin Story

Mario was an early and enthusiastic Claude Code user. Claude Code's breakthrough packaging of agentic search — giving the LLM direct filesystem access instead of relying on vector search (Mario notes there were precursors; "they were the first that packaged it up") — was what made coding agents viable. But as the Claude Code team dogfooded and grew, the tool became unstable. The breaking point: Anthropic began injecting system reminders and modifying tool definitions behind the user's back, silently changing agent behavior between releases. Mario reverse-engineered their obfuscated JavaScript to track the evolution of Claude Code's system prompt (documented on his site). Every release was "messing with stuff."

He looked at alternatives:
- **Amp/Droid**: Good but expensive — couldn't use API subscriptions, required per-token pricing.
- **Open Code**: Open source, but also manipulated context (pruning tool results, injecting LSP diagnostics after every edit call — confusing the model with errors for code it hadn't finished writing). Required forking to modify.

Mario's reaction: "How hard can it be?" He built his own.

## Core Design Principles

1. **Minimalism**: Only four core tools (`read`, `write`, `edit`, `bash`) to minimize token usage and system-prompt size (the decision-overhead and failure-surface framing is the wiki's synthesis).
2. **Stability**: The deterministic parts (everything around the LLM) should be rock-solid. The non-deterministic parts (the LLM itself) are unavoidable. But your hammer shouldn't break at a different spot every day.
3. **Context transparency**: No behind-the-back context injection. The user controls what goes into the model. This is Pi's founding grievance.
4. **Observability**: Full transparency into the LLM's thought process and tool calls.
5. **Malleability**: Both the human and the agent can modify the environment, add new tools, and define custom workflows.
6. **Model agnostic**: Can be used with different LLM providers and models.
7. **[[yolo-mode-philosophy|YOLO mode by default]]**: Pi ships with **no permission gates** — every tool call runs without asking. The label "YOLO mode is dangerous" is itself the friction: it pushes the user to do real security thinking (container boundaries, sandboxed tools) rather than accept a half-measure the user can misconfigure. See [[yolo-mode-philosophy]] for the full argument.

## Measured on the Pareto Frontier (HarnessTax, 2026)

Principle 1 stopped being only a design argument in September 2026. The [[harness-tax|HarnessTax]] study (Pan et al., UC Berkeley + Arena) ran Pi alongside Claude Code and Codex CLI across seven models on SWE-bench Lite and Terminal-Bench 2.0 — 21 model–harness pairs, same 30 tasks, 3 attempts each — and **Pi reached the cost-success Pareto frontier on both benchmarks with its four tools: read, write, edit, and bash**. For Claude Fable 5 on SWE-bench Lite, Pi and Claude Code averaged nearly identical turn counts (15.4 vs 15.3 per attempt), but Claude Code cost about twice as much ($1.33 vs $0.67) for a 1.1% success increase (97.8% vs 96.7%). Pi was also the cheapest harness for several models — figure-derived values from the study's Figure 4 put GPT-5.6 Luna at $0.030 per rollout in Pi vs Claude Code's $0.15 (the prose states only that Luna offers the lowest cost on both benchmarks) — and on Terminal-Bench 2.0, GPT-5.6 Sol achieved an 83.3% success rate in Pi versus Codex's 78.9% at about half the cost ($0.42 vs $0.76).

The mechanism corroborates Pi's founding grievance from the cost side: Claude Code's mean initial context across all seven models was **over 10× Pi's**, with longer instructions and larger tool schemas — the [[harness-tax|harness tax]] can begin with the first model call, though total spending also depends on caching, generated tokens, and later calls. Reading the result as controlled, multi-model support for Mario's minimalism thesis — previously argued from design principle and practitioner experience — is the wiki's framing; the study itself draws only the open-source-harness-research implication. See [[harness-tax]] for the full study and its caveats.

## Architecture

Pi is composed of several modules:
- `pi-ai`: A unified API for different LLMs (Mario built his own abstraction, unconvinced by the Vercel AI SDK).
- `pi-agent-core`: The main loop and tool execution engine.
- `pi-tui`: A terminal UI for interaction.
- `pi-coding-agent`: The CLI implementation that manages sessions and context.

The extensibility comes from hook points — simple TypeScript modules loaded into the same Node process that let you provide custom tools, custom compaction, or fully revamp the TUI.

## Planned Architecture (mid-2026 refactor on `main`)

Mario is mid-refactor as of July 2026, working directly on the `main` branch because the underlying rebuild is "piece by piece" — Pi users should not notice the swap. Goals:

- **Web and native UI surfaces**: TUI's line-based rendering caps what self-modifying software can express; the planning is to make third-party extensions work across web (via the SDK) and native surfaces by separating server-side and UI-side components. A permission dialog, for example, would be a server-side handler that asks "show this component with this name in the UI and give me the result" — and the UI could be a TUI, a web page, or a native Android surface.
- **Remote-ability**: One Pi session on machine A, connectable from machine B.
- **Durability & observability**: listed as refactor goals — "durability and observability and all of that stuff you'd like to have if you can remote into agents" (verbatim; the surrounding specifics are the wiki's gloss).
- **Deployment surface**: Make Pi's SDK deployable on Cloudflare Workers, Vercel, etc. The agent as a target environment, not just a local CLI.

## Self-Modification

Pi's deepest feature: you can ask Pi to modify itself. Non-technical friends of Mario's have asked Pi to rebuild Pi's own UI because the extension points make it trivial. The core stays small; the periphery is emergent. This is Mario's first foray into what he calls **self-modifying software** — software that adapts itself on behalf of the user's wishes and needs. He believes this paradigm extends to other kinds of work — to a degree, and for specific tasks.

Examples of what users have built through self-modification:
- **MCP support**: Pi doesn't ship with MCP. Users ask Pi to add MCP support to Pi.
- **Plan modes**: Multiple implementations explored, iterated, sometimes abandoned (Armin went through five before deciding plan mode is useless).
- **RL environments**: Someone reconfigured Pi as the agent in a reinforcement learning execution environment for open-weight models.
- **Cosmetic UI changes**: Different editor box styles, visual tweaks.
- **Pi extension for diff review with line annotations**: a small extension that pulls up a diff of all changes an agent made, lets the human annotate individual lines inside the diff viewer, and feeds the annotations back to the agent when "finish review" is clicked. The pattern: pre-implementation issue analysis → human review with code-level annotations → agent iterate. Mario uses this for every core-mechanic change; for "I don't care" code paths he just types "fine" and moves on.

## The OpenClaw Relationship

Peter Steinberger's personal AI assistant **OpenClaw** was built on Pi (it has since moved mostly to the Codex app server, per Mario in the July 2026 transcript). The relationship has been both productive and challenging:

- **Pi got compaction because OpenClaw needed it**. Peter was "crying in chat" about needing it. Mario built it but tells his own users "don't use compaction, it's bad for you."
- **OpenClaw drove PR/issue explosion**. OpenClaw instances autonomously file issues and PRs on the Pi repo. Mario built a 3D visualization tool to cluster similar issues in 3D space and bulk-select/close them.
- **PR scale: 50–60 clanker PRs per day**. Pre-agent, a successful Pi-sized open source project got "one or two PRs per week." After agents, Pi gets 50–60/day by Clankers. Each PR description is "kind of like a full Harry Potter book" — typically with 10 to 1,000 file changes. OpenClaw's scale is "orders of magnitude bigger" than Pi — Mario's manual triage (50 issues, 2 reopen) does not transfer. This is the wiki's most concrete data point for the magnitude of agent-driven PR-flood in 2026.
- **Auto-close workflow**: Every PR from an unknown account gets auto-closed with a comment. Re-submission requires the prospective contributor to **first file an issue in their human voice, no longer than a screen, explaining exactly what they want to do and why**. If Mario approves the issue, a GitHub workflow tags the account into a whitelist that allows future PRs to bypass auto-close. Agents don't see the comment — and the wiki's inference is that they therefore don't retry, which is what makes the workflow an effective human/bot filter. This is the concrete instantiation of [[yolo-mode-philosophy]] for the contribution gate: ship complete or don't ship.
- Peter originally forked Pi into "towel" before switching back to using Pi directly.

## Quality Philosophy

Mario's approach to keeping Pi's codebase quality high despite heavy agent usage:

- **Refactor mercilessly**: Refactoring pulls him into the codebase structurally, not just line-by-line. He needs to understand what's going on to do a good refactor. Being in the code is the one thing that keeps quality high and complexity low.
- **Accept slop in unimportant places**: The HTML export feature — he's never looked at a single line. If it looks right coming out, that's fine.
- **Guard the core**: The agent loop, extension loading mechanism, and critical paths get careful human attention.
- **"Slow the f down"**: His blog post argument, with the arithmetic coming from his Pragmatic Engineer podcast restatement of it: if an agent produces 10x more code per day, it also produces 10x more bugs. Even at half your error rate, that's 5x more bugs. Dark factory with 100 agents? Simple math. The blog post itself contributes the review-capacity limit — set limits on how much code you let the clanker generate per day, in line with your ability to review — and the closing instruction: "Write architecture by hand. Be in the code."
- **Merchants of learned complexity**: Agents are merchants of complexity — they've seen bad architectural decisions in training data. When they architect, you get cargo cult. Agents never see each other's runs or the full codebase, so decisions are always local, leading to duplication and unnecessary abstraction.
- **Agentic search has low recall**: The bigger the codebase, the less likely the agent finds all relevant code, regardless of search tool. Low recall is the root cause of duplicated, inconsistent code.
- **Untrustworthy tests**: Agent-written tests are as untrustworthy as agent-written code. Manual testing becomes the only reliable quality measure.

## Future

Mario plans a web-based alternative UI to the TUI. The terminal's line-based rendering is inherently limited. A web interface would enable richer interactions and make self-modification more accessible to non-technical users.

## Thread

- [[the-agent-workflow]] — Pi's minimalism and session model as structural safeguards for context management
- [[the-human-lever]] — Observability as the mechanism that enables grey box engineering; "refactor mercilessly" as the human-in-the-code practice
- [[tool-design-for-agents]] — Four-tool minimalism as the extreme end of tool design for agents; MCP vs CLI; context transparency as a founding principle
- [[the-slop-problem]] — "Slow the f down" math; agents don't feel pain; training data quality; the "if you cannot read it, how are you expecting to maintain it" reconfirmation
- [[deliberate-friction]] — Pi's auto-close + human-voice-issue + whitelist as a deliberate-friction contribution gate; see also [[yolo-mode-philosophy]] for the parallel security-side application
- [[harness-monoculture]] — Pi's strict edit tool is the harness that surfaced the [[grammar-constrained-sampling]] ~20% failure rate

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
- [[agent-skills]] — The wiki's agent-skills concept; malleable agents create and modify skills mid-session
- [[mastra]] — Minimalist malleable harness vs full framework with observability and eval infrastructure
- [[thorsten-ball]] — Philosophical alignment on minimalism: Ball's "harness falls away" echoes Pi's four-tool core
- [[grammar-constrained-sampling]] — Pi's strict edit tool surfaced the ~20% tool-call failure rate that Claude Code's leniency masks
- [[yolo-mode-philosophy]] — Pi's no-permission-gates-by-default design as deliberate friction at the security layer
- [[peter-steinberger]] — OpenClaw driver; Pi's most demanding user; whose OpenClaw-driven flood is orders of magnitude bigger than Pi's own 50–60 clanker PRs/day ($1.3M/month token burn)
- [[harness-tax]] — The 21-pair controlled study that measured Pi on the cost-success Pareto frontier of both benchmarks

## Sources

- `raw/yt-building-pi-in-a-world-of-slop.md` — Four-tool minimalism, the module names (pi-ai, pi-agent-core, pi-tui, pi-coding-agent), and the malleable-agents framing.
- `raw/yt-building-pi-and-what-makes-self-modifying-software-so-fascinating.md` — Origin story, OpenClaw relationship, self-modification philosophy, MCP vs CLI, "slow the f down", quality approach; also the Pragmatic Engineer episode's restatement of the slow-the-f-down arithmetic (10× code → 10× errors, half error rate → 5×, the 100-agent dark-factory multiplier, [1:12:04]–[1:12:28]).
- `raw/slowing-the-fuck-down.md` — Full articulation of the "slow the f down" argument: the review-capacity limit ("set limits on how much code you let the clanker generate per day"), "write architecture by hand / Be in the code", compounding booboos, merchants of learned complexity, good agent task criteria, agentic search recall problem. The 10×→5× arithmetic is not in the blog; it comes from the Pragmatic Engineer episode, entry 2 above.
- `raw/yt-code-isnt-free-mario-zechner-hard-truths-coding-ai.md` — [[yolo-mode-philosophy|YOLO mode]] rationale (don't ship incomplete security solutions), the July 2026 refactor goals (web/native UI, remote-ability, deploy on Cloudflare/Vercel, durability/observability), the planned server + UI-side component extension model, the Pi diff-review extension that feeds line annotations back to the agent, and the 50–60 PRs/day empirical anchoring of OpenClaw's contribution-flood scale relative to Pi's whitelist triage.
- `raw/harnesstax-how-much-does-the-harness-matter-for-coding-agents.md` — Pan et al. (UC Berkeley + Arena, 2026). Source for the "Measured on the Pareto Frontier" section: Pi on the Pareto frontier of SWE-bench Lite and Terminal-Bench 2.0 with four tools; the Fable 5 turns/cost/success comparison (15.4 vs 15.3 turns; $0.67 vs $1.33; 96.7% vs 97.8%); Luna's $0.030-vs-$0.15 cost spread; GPT-5.6 Sol's 83.3% in Pi on Terminal-Bench 2.0; Claude Code's >10× initial-context gap.
