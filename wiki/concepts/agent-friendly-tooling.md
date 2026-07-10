---
title: Agent-Friendly Tooling
created: 2026-04-26
updated: 2026-07-09
sources:
  - raw/agentic-coding-recommendations.md
  - raw/yt-l8-principal-s-agentic-engineering-workflow.md
unaudited_marginal: 0
tags: [concept, tool-design, agent-speed, observability]
---

# Agent-Friendly Tooling

> Tools, scripts, and infrastructure designed specifically so that AI agents can operate effectively: fast to invoke, observable by design, and protected against misuse. The practical craft beneath the abstract [[tool-design-for-agents]] theory. Kun Chen's [[axi]] tools are a concrete case: a non-JSON, token-efficient output format can save ~40% tokens versus JSON, and the GitHub MCP server costs 3× tokens and 2×+ latency versus the `gh` CLI for the same tasks.

## The Core Principle

Agent loop quality is bounded by tool response time and output clarity. A tool that responds in 3ms with concise, actionable output keeps the agent productive. A tool that takes 60 seconds to boot and floods context with noise degrades every subsequent reasoning step. Speed and observability aren't nice-to-haves — they are the primary determinants of agent output quality.

## Design Rules

### Anything Can Be a Tool
A shell script, an MCP server, a log file — if the agent can interact with or observe it, it counts. [[armin-ronacher|Armin Ronacher]] uses Makefiles as the primary tool interface, with targets like `make dev` and `make tail-log`.

### Tools Must Be Fast
Quick response time and minimal output are paramount. Crashes are tolerable (the agent gets a clear error); hangs are problematic (the agent waits indefinitely or times out with no signal).

### Tools Must Be Misuse-Resistant
The "LLM chaos monkey" will use tools in ways no human would. There is no such thing as user error — every misuse path must produce a clear, informative error that helps the agent recover.

Example: Ronacher's process manager writes a pidfile. If spawned a second time, it errors with "services already running" instead of silently failing on a port conflict.

Not just tooling — code itself must be misuse-resistant. Concrete example: TanStack Router uses dollar signs in filenames (`$param.tsx`). The agent tries to edit `$param.tsx` via bash but shell interpolation silently expands `$param` to empty, so it edits `.tsx` instead. A minor naming convention that's harmless to humans creates a persistent error mode for agents.

### Code Should Be Misuse-Resistant Too
Ronacher extends the principle from tooling to code structure itself:
- **Functions over classes**: Clear, descriptive, longer-than-usual function names. Agents navigate functions more reliably than class hierarchies.
- **Plain SQL over ORMs**: Agents produce excellent SQL and can match it against SQL logs. ORM min-maxing produces code that's hard to debug from log output.
- **Local permission checks**: Don't hide auth in config files or separate modules — the agent will forget to add them to new routes. Keep auth logic adjacent to the route definition.
- **"The dumbest possible thing that will work."**

### Tools Must Provide Observability
The agent needs to understand system state without human help. Dual-output logging (terminal + file) lets the agent read logs independently. Logged emails in debug mode let the agent complete auth flows autonomously — it reads the log for the magic link, no human intermediation needed.

### Token Efficiency
Ronacher optimizes tool usage to minimize context consumption: avoids screenshots and browser interactions wherever possible. Screenshots and browser sessions consume context window budget without proportional value — fast scripts that return a few lines of text are more token-efficient.

### Emergent Tools
Agents write temporary scripts to evaluate code. These scripts must compile and run fast to be useful in the loop. For slow codebases, Ronacher's daemon pattern — a watcher that imports and executes modules from a filesystem location and writes output to a log — gives the agent a fast evaluation path within the application context.

## Speed Optimization Strategies

1. **Choose fast languages**: Go's fast compilation and test caching beat Python's interpreter boot time for the agent loop. Rust's `cargo test` invocation syntax also trips up agents — not a speed issue, but a tool-usability one.
2. **Daemon patterns**: For codebases where reload is expensive, provide a hot-reload sandbox the agent can push code into.
3. **Log verbosity balancing**: Informative yet concise output. Provide knobs the agent can adjust.
4. **Incremental testing**: Go's test caching means the agent doesn't need to figure out which tests to run — the tool does it automatically.

## Code Generation Over Dependencies

Ronacher strongly prefers generating code over pulling in libraries. The agent can maintain generated code; dependency sprawl is harder to control. Each new dependency is a contract the agent may misunderstand, an upgrade surface that may silently break, and a chunk of unfamiliar code the agent can't reason about. Generated code, by contrast, is code the agent wrote — it understands it.

## MCP as Last Resort

Ronacher uses MCP only when the alternative is unreliable. MCP servers themselves are unreliable and add failure surface. Custom tools are normal shell scripts — faster to invoke, easier to debug, no protocol overhead. This aligns with the broader [[tool-design-for-agents]] minimalism thesis: fewer moving parts, clearer failure modes.

## Thread

- [[tool-design-for-agents]] — This concept is the practice layer of the thread
- [[the-agent-workflow]] — Tool speed as the bottleneck in the AFK execution loop
- [[the-slop-problem]] — Slow, noisy tools produce more slop by degrading agent reasoning
- [[the-human-lever]] — Observability infrastructure as the human's window into agent activity

## Related

- [[tool-design-for-agents]] — The theoretical framework; this page is the practice
- [[agent-experience]] — Tooling speed and clarity as AX optimization
- [[verification-loop]] — Fast tools make the verification loop tight
- [[smart-zone-dumb-zone]] — Verbose tool output pushes agents into the Dumb Zone
- [[armin-ronacher]] — Primary source for these practices
- [[backpressure]] — Fast, observable tools enable tighter backpressure
- [[ralph-loop]] — AGENTS.md as agent-friendly infrastructure for the Ralph loop
- [[slop]] — Slow, noisy tools produce more slop by limiting verification cycles
- [[system-prompt-effects]] — System prompts shape how agents interact with tooling; non-monotonic effects mean more constrained tool instructions aren't always better
- [[axi]] — Kun Chen's agent-ergonomic tool standard and benchmark

## Sources

- `raw/agentic-coding-recommendations.md` — Makefile patterns, daemon pattern, speed optimization
- `raw/yt-l8-principal-s-agentic-engineering-workflow.md` — Kun Chen's AXI benchmark: GitHub MCP vs CLI (3× tokens, 2×+ latency), token-efficient non-JSON output (~40% savings), and the ten principles for agent-ergonomic tools.
