---
title: The Aiming Problem
created: 2026-06-05
updated: 2026-06-05
sources:
  - raw/yt-systems-building-systems.md
tags: [concept, agentic-engineering, tuning, quality]
unaudited_marginal: 0
---

# The Aiming Problem

> The hard part of building a [[software-factory]] isn't the machinery — it's tuning the system so its outputs land in the desirable subset of production-ready, spec-aligned software rather than [[slop]]. Proposed by [[eero-alvar|Eero Alvar]] as the core challenge of automated software production.

## The Problem

Building an agent system that takes a spec and produces something *resembling* finished software is trivial. The hard part is **aiming** that system — tuning it so the output lands in the tiny subset of outputs that are:

- Fully functional
- No vulnerabilities
- No bugs
- Perfectly aligned with the spec
- Ready to ship

Everything outside that subset is slop. The gap between "resembles software" and "is software" is the aiming problem.

## Why It's Hard

### Chaos
The mapping from specs to implementations is likely **chaotic**: small changes to the input spec produce wildly different outputs. Eero Alvar frames this as a "mathematically very unrigorous analogy" — he assumes the answer is yes, but acknowledges the analogy is exploratory. This has implications for tuning — small changes to the factory's instructions can produce wildly different results.

### Error Propagation
In phase-decomposition architectures, the aiming problem decomposes into smaller aiming problems per phase. This can make each phase easier to tune, but tuning errors in early phases **propagate** into later ones. The problem changes form but doesn't disappear.

### Longer Chains = More Chaos
Extending the orchestration hierarchy upward (more master agents at higher abstraction levels) increases chaos for two reasons:
1. **Telephone game**: Longer chains of command increase hallucination risk and information loss — "it becomes a sort of a game of telephone"
2. **Increased chaos**: Longer command chains mean less control over what bottom-level workers actually produce

The system becomes harder to tune, not easier.

## Tuning Mechanisms

### Instruction Libraries
Detailed instruction documents for every part of the build process. By tweaking instructions, you aim the system. This is [[context-engineering]] at the factory level — the instructions are the context that shapes agent behavior.

### Verification Agents
Agents that check work at phase boundaries or periodically during execution. By tuning verification agents, you create a secondary aiming mechanism — the factory aims through instructions, and verification agents catch misses.

### Both Are Slow and Expensive
Eero Alvar emphasizes: regardless of mechanism, tuning is the slow, expensive, and difficult part. There's no shortcut to making a system produce quality output reliably.

## Thread

- [[the-slop-problem]] — The aiming problem is the inverse of the slop problem: slop is what happens when aiming fails
- [[the-agent-workflow]] — The agent workflow is the human-aimed version of what the aiming problem tries to automate
- [[agentic-engineering]] — Agentic engineering is the human discipline; the aiming problem is what happens when you try to encode that discipline into a system
- [[the-human-lever]] — Tuning the factory is the new form of the human lever — slow, expensive, and difficult

## Related

- [[software-factory]] — The aiming problem is the core challenge of the software factory concept
- [[context-engineering]] — Instruction tuning is context engineering applied at the system level
- [[verifiability]] — Verification agents as an aiming mechanism connect to the broader verifiability framework
- [[backpressure]] — Backpressure (tests, builds, LLM-as-judge) is a mechanical aiming mechanism

## Sources

- `raw/yt-systems-building-systems.md` — Eero Alvar: the aiming problem framing, chaos analogy, error propagation in phase decomposition, tuning via instruction libraries and verification agents
