---
title: Tool Design for Agents
created: 2026-04-25
updated: 2026-04-26
sources: ["raw/yt-how-agents-use-dev-tools.md"]
tags: ["concept", "agent-tooling", "developer-tools", "dx"]
---

# Tool Design for Agents

> Developer tools were built for human consumption. As agents become the primary consumer, tools need redesigned output formats, confidence levels, trust models, and extensibility — not new features, but a fundamentally different interface contract.

## The Core Insight

[[zanie-blue|Zanie Blue]] (Astral) identifies a shift: agents are open-ended, stochastic systems that need deterministic, specialized feedback from tools to constrain their behavior. But today's tools output for humans — verbose diagnostics, interactive TUIs, escape hatches. This mismatch wastes [[smart-zone-dumb-zone|context]] and gives agents too much latitude to bypass verification.

## Feedback Qualities Tools Provide

1. **Correctness**: Running code (tests) and static analysis (type checkers, linters). Agents can't perform complex static analysis even with fine-tuning — they need tools for this.
2. **Quality**: Readability, security, performance, dead code. Long-term signals agents can't self-assess.
3. **Efficiency**: Without specialized tools, agents use ad-hoc approaches (e.g., `curl` + `unzip` instead of a package manager) that waste time and context.
4. **Safety**: Tool boundaries (sandboxing, access controls) constrain agents from performing undesirable actions.
5. **Context discovery**: Ripgrep, documentation lookup — tools that help agents understand the state of the world.

## Design Implications

### Output Optimization
Tool output should minimize context consumption:
- Machine-readable formats (JSON) are necessary but not sufficient — raw JSON can increase verbosity.
- The tool itself is best positioned to decide what's essential. Build context reduction in natively: show key fields, allow opt-in to more.
- Persist verbose output to files and give the agent a pointer instead of flooding context.

### Confidence Levels
Current tool bars are tuned for humans (prefer false negatives to avoid fatigue). Agents don't fatigue. Tools should expose:
- More **low-confidence lints** that agents can assess for applicability.
- More **unsafe automatic fixes** (e.g., Ruff fixes marked unsafe because they might drop comments — trivial for agents to verify).

### Trust Models
Escape hatches designed for humans (`noqa`, suppressions, format-off) may enable bad agent behavior. The question: should agents have the same escape hatches? Default to constraining agents more than humans.

### Plugin Extensibility
Plugins allow agents to build their own automations and feedback loops. An agent defining custom lint rules to prevent itself from making future mistakes is a form of agent memory. This makes plugins higher priority for tool builders than they were for purely human use.

### Language Servers
LSP features need re-prioritization:
- Autocomplete is high-effort but largely irrelevant to agents.
- Rename/find-references is genuinely valuable — more efficient than agents falling back to `sed`.
- The LSP protocol itself may not be the right abstraction for agents. New protocols may be needed.

## Scale Effects

Agents make it trivial to scale from one agent to hundreds. This means 10-person teams now face 100-engineer problems: concurrency, git worktrees, reproducible environments. As inference gets faster, tools become the bottleneck. Tools designed for scale grow in importance.

## The Self-Tooling Horizon

Research shows agents that construct their own tools outperform those with pre-built harnesses. Foundational tooling requires deep domain expertise agents don't yet have, but the possibility that agents will modify tools to suit their own needs is real. This connects to [[malleable-agents]] — the agent isn't just using tools, it's extending them.

## Ronacher's Practical Instantiation

[[armin-ronacher|Armin Ronacher]] embodies many of these principles in shell scripts and Makefiles rather than formal tool protocols:

- **Misuse resistance**: Process manager with pidfile — double-spawn produces a clear error, not a silent port conflict.
- **Observability by default**: Dual-output logging (terminal + file) so agents can read logs autonomously.
- **Speed over feature richness**: No MCP unless the alternative is unreliable. Plain shell scripts are faster and more reliable than protocol servers.
- **Emergent tools**: Agents write temporary scripts; the daemon pattern gives them a fast evaluation path within the application context.

See [[agent-friendly-tooling]] for the full practical treatment.

## Thread

- [[the-slop-problem]] — Tool feedback as the mechanical defense against slop
- [[the-human-lever]] — Trust models and constraining agents as part of human design authority
- [[the-agent-workflow]] — Context reduction, scale effects, and reproducibility in the HITL/AFK loop

## Related

- [[agent-experience]] — AX/DX convergence extends to tool design
- [[verification-loop]] — Tool feedback is the engine that drives the verification loop
- [[smart-zone-dumb-zone]] — Context consumption as a tool design concern
- [[malleable-agents]] — Plugins and self-tooling as forms of agent malleability
- [[slop]] — Poor tool design leads to more slop via unverified agent output
- [[compounding-booboos]] — Better tool feedback catches booboos before they compound
- [[astral]] — Tool builder adapting for agentic consumption

## Sources

- `raw/yt-how-agents-use-dev-tools.md`
