---
title: Agentic Coding Recommendations
created: 2026-04-26
updated: 2026-04-26
sources:
  - raw/agentic-coding-recommendations.md
tags: [source, ai-engineering, tool-design, language-choice, go, workflow]
---

# Agentic Coding Recommendations

> Armin Ronacher's practical guide to agentic coding: language choice matters (Go wins), tooling must be fast and observable, simplicity is a force multiplier, and conservative upgrade discipline prevents agent-induced decay.

## Key Takeaways

### Go as the Optimal Agentic Language

Ronacher makes a specific, well-argued case for Go over Python, Rust, and JavaScript for new backend projects in agentic workflows:

- **Explicit context system**: Go's copy-on-write context bag flows through the call chain explicitly. Agents always know how to pass data to downstream calls — no implicit magic.
- **Test caching**: `go test` runs incrementally and caches results. The agent doesn't need to figure out *which* tests to run. Compare with Rust where agents sometimes fail on `cargo test` invocation syntax.
- **Simplicity by design**: Rob Pike described Go as suitable for developers who "aren't equipped to handle a complex language." Substitute "developer" with "agent" and it's the same argument.
- **Structural interfaces**: If a type has the right methods, it conforms. No declaration ceremony. LLMs find this trivially understandable.
- **Low ecosystem churn**: Go's commitment to backwards compatibility means less risk of agents generating outdated code — unlike JavaScript's fast-moving ecosystem.

Python, by contrast, poses significant challenges: pytest's fixture injection confuses agents, async event loop issues produce incorrect code that even the agentic loop struggles to resolve, and interpreter boot time slows the agent loop itself.

### Tooling as the Force Multiplier

Ronacher's tooling philosophy treats *anything the agent can interact with* as a tool:

- **Makefiles as tool interfaces**: `make dev` starts services, protected against double-spawn with a pidfile. `make tail-log` lets the agent read logs. Simple, deterministic, no MCP required.
- **Dual-output logging**: Logs go to both terminal and file, so the agent can read the log file to diagnose state without interrupting the human.
- **Logged email in debug mode**: Auth flows log email content (including magic links) to stdout. The agent can complete a full sign-in via browser automation without human assistance — it reads the log for the link.

### Speed as the Meta-Constraint

Agent loop quality is bounded by tool response time. The difference between a 3ms tool and a 5-second compile + 60-second boot cycle is the difference between a working agent and a struggling one.

- **Emergent tools**: Agents write temporary scripts to evaluate code. These must compile and run fast to be useful.
- **The daemon pattern**: For slow-reload codebases (e.g., Sentry), Ronacher built a daemon that watches a filesystem location, imports and executes Python modules placed there, and writes output to a log. This gave the agent a fast evaluation path within the application context.
- **Log verbosity balancing**: Informative yet concise logs optimize token usage. Provide "knobs" the AI can turn.

### Simplicity as Agentic Imperative

- **Functions over classes**: Clear, descriptive, longer-than-usual function names.
- **Plain SQL over ORMs**: Agents produce excellent SQL and can match it against SQL logs. ORM min-maxing produces code that's hard to debug from log output.
- **Local permission checks**: Don't hide auth in config files or separate modules — the agent will forget to add them to new routes.
- **"The dumbest possible thing that will work."**

### Conservative Upgrade Discipline

Agents make upgrades so cheap that it's tempting to let the AI do it and check if tests pass. Ronacher finds this unsuccessful. Upgrades invalidate stale comments, decision breadcrumbs, and patterns — the agent then continues building on outdated assumptions. Be *more* conservative about upgrades than before.

### Parallelization

Agents aren't exceptionally fast individually, but parallelization boosts overall efficiency. The challenge is managing shared state (filesystem, databases, Redis). Tools to watch: container-use (Docker-isolated experiments), Cursor background agents, Codex (CI-based).

## Notable Positions

- **MCP is a last resort, not a first choice**: Ronacher uses MCP only when the alternative is unreliable. MCP servers themselves are unreliable and add failure surface. Custom tools are normal shell scripts.
- **Permission checks disabled**: Runs `claude --dangerously-skip-permissions` and manages risk via Docker or observation.
- **More code generation, fewer dependencies**: Strongly prefers generating code over pulling in libraries. The agent can maintain generated code; dependency sprawl is harder to control.
- **Refactor at the right moment**: Not too early, not too late. Vibe-code until complexity crosses a threshold, then extract (e.g., component library when Tailwind classes splinter across 50 files).

## Thread

- [[the-agent-workflow]] — Concrete tooling and language practices for the HITL/AFK loop
- [[the-human-lever]] — Simplicity and conservative upgrades as human design authority
- [[the-slop-problem]] — Language choice, tooling speed, and upgrade discipline as slop prevention

## Related

- [[tool-design-for-agents]] — Ronacher's Makefile/logging patterns are a concrete instantiation
- [[agent-experience]] — Language choice and code simplicity as AX optimization
- [[verification-loop]] — Fast tools and observability as the engine of verification
- [[slop]] — Conservative upgrades and simple code as slop prevention
- [[compounding-booboos]] — Stale comments from agent upgrades compound into confusion
- [[armin-ronacher]] — Author of this source

## Sources

- `raw/agentic-coding-recommendations.md` — The complete source
