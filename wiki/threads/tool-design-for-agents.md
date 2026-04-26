---
title: Tool Design for Agents
created: 2026-04-26
updated: 2026-04-26
sources:
  - raw/yt-how-agents-use-dev-tools.md
  - raw/agentic-coding-recommendations.md
  - raw/yt-building-pi-in-a-world-of-slop.md
tags: [thread, tool-design, agent-tooling, dx, developer-tools, language-choice]
---

# Tool Design for Agents

> Developer tools were built for human consumption. As agents become the primary consumer, the tool layer needs fundamental redesign — not more features, but different interface contracts, output formats, and design priorities. Three independent sources converge on the same conclusion: the tool is the bottleneck, and the agent's effectiveness is bounded by the quality of the tools it calls.

## The Core Thesis

The wiki already has the [[the-agent-workflow|workflow]] and [[the-human-lever|human role]] threads. This thread covers the **third leg**: the tools themselves. The argument breaks into three layers that reinforce each other:

1. **Tools must change because the consumer changed.** Agents don't have intuition, fatigue, or the ability to skim. They need deterministic, structured feedback.
2. **Language and infrastructure are tooling decisions.** Choosing Go over Python, a Makefile over an MCP server — these are tool design choices that directly affect agent performance.
3. **Minimalism beats feature richness.** Fewer, composable tools with clear contracts outperform feature-rich ones because they reduce the failure surface for the LLM.

## Layer 1: Redesigning the Interface Contract

[[zanie-blue|Zanie Blue]] (Astral) provides the most systematic treatment. She identifies five qualities tools provide to agents — correctness, quality, efficiency, safety, and context discovery — and argues that each one requires different design when the consumer is an agent rather than a human.

### Output Optimization
Today's tools output for humans: verbose diagnostics, interactive TUIs, color-coded terminals. Agents need none of this. What they need:

- **Context reduction built in**: The tool itself is best positioned to decide what's essential. Raw JSON isn't enough — it can be more verbose than human-readable output. The tool should return the minimal actionable signal and persist the rest to a file the agent can opt into reading.
- **Machine-parseable confidence levels**: Human-facing linters suppress low-confidence findings to avoid fatigue. Agents don't fatigue. They should receive more signals, including low-confidence ones, and decide for themselves whether to act.
- **Restrictive trust models**: Escape hatches designed for humans (`noqa`, `--no-verify`, `--force`) enable bad agent behavior. The default for agents should be more constrained, not less.

### The Scale Effect
Agents make it trivially easy to go from one agent to a hundred and back to zero. This means a 10-person team suddenly faces the problems of a 100-engineer organization: concurrency, git worktrees, reproducible environments, declarative dependency management. Tools designed for individual human use become insufficient at agent scale. As inference gets faster, tools — not model intelligence — become the bottleneck.

### The Self-Tooling Horizon
Research shows agents that construct their own tools outperform those with pre-built harnesses. This isn't theoretical — [[malleable-agents|agents that can modify their own tools]] are already emerging. Plugin extensibility becomes higher priority than it ever was for human-only use: an agent defining custom lint rules to prevent its own future mistakes is a form of agent memory. See [[tool-design-for-agents]] (concept page) for the full framework.

## Layer 2: Language and Infrastructure as Tooling

[[armin-ronacher|Armin Ronacher]] argues that language choice is the single most consequential tooling decision for agent workflows, and that infrastructure design (Makefiles, process managers, logging) is as important as the code itself.

### Go as the Optimal Agentic Language
Ronacher makes a specific, well-argued case:

- **Explicit context system**: Go's copy-on-write context bag flows through the call chain explicitly. Agents always know how to pass data downstream — no implicit magic, no guessing where a value came from.
- **Test caching**: `go test` runs incrementally and caches results. The agent doesn't need to figure out *which* tests to run. Compare with Python where pytest's fixture injection confuses agents, or Rust where agents sometimes fail on `cargo test` invocation syntax.
- **Structural interfaces**: If a type has the right methods, it conforms. No declaration ceremony. LLMs find this trivially understandable.
- **Low ecosystem churn**: Go's commitment to backwards compatibility means less risk of agents generating outdated code — unlike JavaScript's fast-moving ecosystem.
- **Speed**: Fast compilation keeps the agent loop tight. Every millisecond of tool response time compounds across hundreds of loop iterations.

### Infrastructure as Agent Interface
Ronacher treats infrastructure the way Zanie treats tool output — as an interface contract:

- **Makefiles as workflow interfaces**: `make dev`, `make tail-log` — simple, deterministic targets the agent can invoke without understanding the underlying process manager. The Makefile is the API; the shell scripts are the implementation.
- **Misuse resistance**: A process manager with a pidfile that errors "services already running" on double-spawn instead of silently failing on a port conflict. There is no such thing as user error with an agent — every misuse path must produce a clear, informative error.
- **Dual-output observability**: Terminal + file logging so the agent can read logs autonomously without the human intermediating.

See [[agent-friendly-tooling]] for the full practical treatment of these patterns.

## Layer 3: Minimalism as Performance

[[mario-zechner|Mario Zechner]] approaches from a different angle. Rather than redesigning existing tools, he argues for fewer tools with simpler contracts. [[pi]]'s core is four tools: `read`, `write`, `edit`, `bash`. No MCP server, no protocol overhead, no feature negotiation.

The argument: complex tools create complex failure modes. A harness with 50 specialized tools gives the LLM 50 chances to pick the wrong one, misuse it, or get confused by overlapping functionality. A harness with 4 composable tools gives the LLM clarity and forces creativity into *how* the tools are composed, not *which* one to pick.

This aligns with Ronacher's skepticism of MCP unless the alternative is unreliable. Plain shell scripts are faster and more predictable than protocol servers. Minimalism isn't asceticism — it's a performance strategy. Terminal-Bench 2.0 results show minimal harnesses often outperform complex ones because clearer context and fewer failure points matter more than feature coverage.

### Malleability as the Escape Valve
The risk of minimalism is rigidity. Zechner's answer: [[malleable-agents]]. Both the user and the agent should be able to create new tools mid-session. The core stays small; the periphery is emergent. This resolves the tension between Zanie's "tools need richer interfaces" and Zechner's "keep the core minimal" — the core is minimal, but agents extend it on demand by composing the primitives.

## Concepts in this thread

- [[tool-design-for-agents]] — The theoretical framework: feedback qualities, output optimization, confidence levels, trust models
- [[agent-friendly-tooling]] — The practice: speed, observability, misuse resistance, daemon patterns
- [[agent-experience]] — AX/DX convergence extends to tool design
- [[malleable-agents]] — Minimal cores with emergent periphery
- [[smart-zone-dumb-zone]] — Tool output as a context threat that pushes agents into the Dumb Zone
- [[verification-loop]] — Tool feedback is the engine that drives verification
- [[slop]] — Poor tool design → unverified output → slop

## Related threads

- [[the-agent-workflow]] — Tool speed and output design as the infrastructure layer beneath HITL/AFK
- [[the-human-lever]] — Trust models and constraining agents as part of human design authority
- [[the-slop-problem]] — Tool feedback as the mechanical defense against quality degradation

## Sources

- `raw/yt-how-agents-use-dev-tools.md` — Zanie Blue's systematic treatment: feedback qualities, scale effects, output optimization, self-tooling
- `raw/agentic-coding-recommendations.md` — Ronacher on Go, Makefiles, misuse resistance, daemon patterns, speed
- `raw/yt-building-pi-in-a-world-of-slop.md` — Zechner on minimalism, malleability, four-tool core, Terminal-Bench results
