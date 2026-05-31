---
title: Agent Experience (AX)
created: 2026-04-25
updated: 2026-05-31
sources:
  - raw/yt-reinventing-software-panel.md
  - raw/yt-how-agents-use-dev-tools.md
  - raw/agentic-coding-recommendations.md
  - raw/yt-llms-are-killing-agent-harness.md
unaudited_marginal: 0
tags: [concept, dx, ax, software-design, tool-design]
---

# Agent Experience (AX)

> The ease with which an AI agent can understand, navigate, and modify a codebase — and the infrastructure that surrounds it. AX converges with DX at the code level, then extends to language choice, tool interfaces, and logging design: everything the agent interacts with shapes its effectiveness.

## Overview

Agent Experience (AX) is a burgeoning concept that posits that the quality of a codebase for AI agents is fundamentally the same as its quality for human developers (**Developer Experience** or **DX**). AI agents, like humans, struggle with high cognitive load, lack of context, and non-deterministic or side-effect-heavy code.

## The AX/DX Convergence

As suggested by Martin Fowler and Kent Beck (see `raw/yt-reinventing-software-panel.md`), the Venn diagram of DX and AX is a circle. [[zanie-blue|Zanie Blue]] extends this from codebase design to tool design: tools must also be optimized for agentic consumption, not just code structure. Practices that make code easier for humans also make it easier for agents:

- **TDD/Automated Tests:** Provide a clear "contract" for the agent to verify its work.
- **Deep Modules:** Reduce the surface area an agent needs to reason about at any one time (see [[deep-vs-shallow-modules]]).
- **Clear Naming:** Helps the LLM's semantic understanding.
- **Consistency:** Reduces the amount of "novelty" the agent must process.

## Language as AX Optimization

[[armin-ronacher|Armin Ronacher]] adds a concrete, language-specific dimension: Go's structural interfaces, explicit context system, and fast test caching make it inherently more agent-friendly than Python (slow boot, fixture magic, async event loop issues) or JavaScript (high ecosystem churn). Language choice is an AX decision.

He also extends AX from code structure to **infrastructure design**: Makefile targets, dual-output logging, and pidfile-protected process managers are all AX optimizations. The codebase isn't just the source code — it's everything the agent interacts with.

Concrete AX failure: TanStack Router's `$param.tsx` filenames. The dollar sign triggers shell interpolation when the agent invokes bash to edit the file — `$param` expands to empty, so the agent edits `.tsx` instead. A naming convention harmless to humans becomes a persistent, confusing error mode for agents. This is the kind of AX failure that only emerges when the consumer is an agent invoking tools through a shell.

## Why AX Matters

As software development shifts toward agentic workflows, the "usability" of a codebase will be measured by how effectively an agent can operate within it. A codebase with poor AX will lead to more [[slop]] and more frequent [[compounding-booboos]].

> [!warning] Departure: Language Servers Are Dead?
> [[thorsten-ball|Thorsten Ball]] challenges this thread's emphasis on tool redesign. His position: language servers are now "uninteresting" — the model figures out where the parentheses go. "That's over." Specialized tool interfaces, semantic edit tools, and LSP features are all unnecessary when the model can just run shell commands. This is a radical version of the thread's own conclusion (AX matters) but argues the solution is deletion, not redesign. The tension: Zanie argues tools need richer agent-facing interfaces; Ball argues the model makes those interfaces irrelevant. The resolution may depend on model capability — for frontier models, Ball is right; for weaker models, Zanie's redesign still matters.

## Thread

- [[tool-design-for-agents]] — AX extends from codebases to the tools agents use
- [[the-human-lever]] — AX/DX convergence as a core argument for why the human must own design boundaries.

## Related

- [[deep-vs-shallow-modules]] — Key for managing agent context.
- [[verification-loop]] — AX relies on strong feedback loops.
- [[shared-design-concept]] — AX is high when the agent can easily infer the system's "theory."
- [[slop]] — Poor AX leads to more slop.
- [[compounding-booboos]] — Poor AX causes errors to compound.
- [[martin-fowler]] — Co-originator of the AX/DX convergence insight.
- [[kent-beck]] — Co-originator of the AX/DX convergence insight.
- [[zanie-blue]] — Extended AX from codebases to tool design.
- [[tool-design-for-agents]] — Extends AX from codebases to the tools agents use.
- [[agent-friendly-tooling]] — The practical craft: speed, observability, misuse resistance.
- [[armin-ronacher]] — Language choice and infrastructure as AX optimization.
- [[code-intelligence]] — Code intelligence provides the high-fidelity context that enables good AX.
- [[agent-observability]] — Designing for observability is an AX principle: the agent must expose its decision chain for the human to build trust.
- [[context-files]] — Context files are part of the AX surface area; their design directly affects agent navigation and comprehension of a codebase.
- [[html-as-agent-output]] — Output format as an AX dimension: HTML extends agent experience from codebase structure and tool interfaces to the agent's communication medium with humans
- [[knowledge-triplet]] — AX design should maximize the codebase's contribution to the knowledge triplet
- [[thorsten-ball]] — Challenges AX's emphasis on tool redesign: language servers are "uninteresting" when the model can just run shell commands
- [[ai-boilerplate-paradox]] — The inversion that makes verbose, "enterprisey" frameworks preferable because explicitness is an AX feature

## Sources

- `raw/yt-reinventing-software-panel.md` — AX/DX convergence insight from Fowler, Beck
- `raw/yt-how-agents-use-dev-tools.md` — Zanie Blue extending AX from codebases to tool design
- `raw/agentic-coding-recommendations.md` — Language choice and infrastructure as AX optimization
- `raw/yt-llms-are-killing-agent-harness.md` — Thorsten Ball: language servers are "uninteresting"; the model figures out where the parentheses go; a challenge to the AX thread's emphasis on tool redesign
