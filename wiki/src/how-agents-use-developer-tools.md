---
title: How Agents Use Developer Tools
created: 2026-04-25
updated: 2026-04-25
sources: ["raw/yt-how-agents-use-dev-tools.md"]
tags: ["source", "youtube", "agent-tooling", "developer-tools", "python"]
---

# How Agents Use Developer Tools

> Zanie Blue (Astral) maps the design space of developer tools for agentic consumption — feedback, context reduction, confidence levels, trust models, and the possibility that agents will eventually build their own tools.

## Summary

Zanie Blue from Astral (Ruff, ty, uv) presents a systematic analysis of how the rise of agentic programming should change how we design developer tools. The talk identifies five qualities tools provide to agents — correctness, quality, efficiency, safety, and context discovery — and then works through specific roadmap implications for Astral's tools and the broader ecosystem.

## Key Takeaways

### 1. Why Agents Need Tools
Agents are open-ended, stochastic systems. Unlike traditional tools that do one thing repeatedly, agents are generalized. They need deterministic, specialized feedback from tools to constrain their solutions. Chain-of-thought and harness feedback aren't sufficient — building reliable systems efficiently requires tools that can mechanically prove correctness, quality, and safety.

### 2. Feedback Qualities
- **Correctness**: Running code (tests) and static analysis (type checkers, linters). Research shows agents can't perform complex static analysis even with fine-tuning — they need tools for this.
- **Quality**: Readability, documentation, security, performance, dead code. Less urgent than correctness but critical for long-term project health.
- **Efficiency**: Without tools, agents use ad-hoc approaches (e.g., curl + unzip instead of a package manager) that waste both time and context. Specialized tools solve subsets of problems better than agents improvising.
- **Safety**: Tool boundaries (sandboxing, access controls) constrain agents from performing undesirable actions when given untrusted inputs.

### 3. Scale Effects
Agents make it trivially easy to scale from one agent to hundreds and back to zero. This means 10-person teams now face the problems of 100-engineer organizations: concurrency, git worktrees, reproducible environments, declarative dependency management. Tools designed for working at scale grow in importance. As inference gets faster, tools will become the bottleneck.

### 4. Output Optimization for Agents
Tool output today targets humans. For agents:
- **Machine-readable output** is necessary but not sufficient — raw JSON can increase verbosity.
- **Context reduction built into the tool**: show essential fields, let the agent opt in to more. The tool is best positioned to decide what matters.
- **Persist output to files**: give the agent a pointer instead of flooding context. Agent can investigate further as needed.
- The challenge: how do agents learn about new output formats? Not in training data for new tools.

### 5. Language Servers for Agents
LSPs power human-editor interaction, but the protocol isn't designed for agents:
- Autocomplete is high-effort but irrelevant to agentic consumers.
- Rename/find-references across files is genuinely valuable — more efficient than agents falling back to sed.
- Human-facing features like go-to-definition still matter (code review), but implementations aren't robust in UIs like GitHub.
- May need new protocols specifically for agents to understand code semantics.

### 6. Plugins as Agent Extensibility
Previously low priority for Astral, plugins are now essential. The best way to get compounding benefits from agents is to let them build their own automations and feedback loops. Example: an agent defining custom lint rules to prevent itself from making future mistakes — a form of agent memory.

### 7. Confidence Levels
Current tool confidence bars are tuned for humans (prefer false negatives to avoid fatigue). Agents don't get fatigued. Tools should expose more low-confidence lints and more "unsafe" automatic fixes (e.g., Ruff fixes marked unsafe because they might drop comments — something an agent would catch easily).

### 8. Trust Models
Escape hatches for humans (noqa, suppressions, format-off) may enable bad agent behavior. The question: should agents have the same escape hatches? Default should be to constrain agents more. Example: sandboxing in uv restricts uvx tools from accessing filesystem outside the working directory or secrets.

### 9. Agent Self-Tooling
Research shows agents that construct their own tools outperform those with pre-built harnesses. Zanie is uncertain about timeline — foundational tooling requires deep domain expertise agents don't yet have — but the possibility that agents will modify tools like uv to suit their own needs is real.

## Concepts Introduced
- [[tool-design-for-agents]] — Redesigning tools for agentic consumption
- Updates: [[agent-experience]], [[verification-loop]], [[smart-zone-dumb-zone]], [[malleable-agents]]

## Thread

- [[the-slop-problem]] — Tool feedback as the mechanical defense against slop; agents without good tool feedback produce more slop.
- [[the-human-lever]] — Trust models, constraining agents more than humans; tool design as part of the human's verification authority.
- [[the-agent-workflow]] — Scale effects, concurrency, reproducibility; context reduction in the HITL/AFK loop.

## Related

- [[agent-experience]] — AX/DX convergence, now extending to tool design.
- [[verification-loop]] — Tool feedback is the engine of the verification loop.
- [[smart-zone-dumb-zone]] — Context consumption as a tool design concern.
- [[malleable-agents]] — Plugins as agent extensibility; agents building their own tools.

## Sources

- `raw/yt-how-agents-use-dev-tools.md`
