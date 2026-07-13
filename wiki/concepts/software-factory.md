---
title: Software Factory
created: 2026-06-05
updated: 2026-07-12
sources:
  - raw/yt-systems-building-systems.md
  - raw/gstack-garry-tan-software-factory.md
  - raw/gsd-core-opengsd-spec-driven-framework.md
  - raw/yt-steve-yegge-youll-never-write-code-the-same-way-again.md
tags: [concept, agentic-engineering, automation, orchestration]
unaudited_marginal: 0
---

# Software Factory

> A system that maps spec-like inputs to finished, ready-to-ship software — the next logical step in [[agentic-engineering]], where the human shifts from building software to designing the systems that build the software. Proposed by [[eero-alvar|Eero Alvar]] as the next step beyond sitting in the terminal steering agents one feature at a time.

## The Mapping Analogy

Eero Alvar frames the software factory as a mathematical mapping: spec → finished software. The analogy reveals a structural problem:

- The **input space** (possible specs) is tiny compared to the **output space** (possible implementations)
- Only a very small subset of outputs are **desirable** — production-ready, aligned with the spec, no vulnerabilities, no bugs
- Everything outside that subset is **[[slop]]**

The hard part isn't building the machinery (agent workflows, harnesses) that takes a spec and produces something resembling finished software — that's trivial. The hard part is **[[aiming-problem|aiming the system]]** to land in the desirable subset.

## Chaos Property

The mapping is likely **chaotic**: tweaking the input spec even slightly can produce a completely different output, even in a deterministic system. This has implications for tuning — small changes to the factory's instructions can produce wildly different results.

A more useful framing: instead of mapping specs to individual implementations, map specs to **sets of equivalent software** — implementations that share only the meaningful aspects, discarding trivial differences (UI, UX, functionally equivalent code). Whether *this* mapping is also chaotic determines how difficult the system is to tune.

## Design Approaches

Three architectural approaches Eero Alvar identifies:

### 1. Master Orchestrator Agent
Swap the human for a master agent that does the same Claude Code prompting you've been doing. The system is proven to work — just automate the human's role.

**Problems:** Agent persistence (context limits), and the workflow is human-shaped but may not be optimal for agents.

### 2. Company-Shaped Hierarchy
Master agent at the top commanding team leads, who task worker sub-agents. A natural extension of the orchestrator pattern.

**Problems:** Same persistence issues, and company hierarchies are human organizational patterns that may not be the optimal topology for agents. See [[multi-agent-code-orchestration]].

### 3. Task Decomposition
Divide the build into phases, each with phase-specific context and instructions. A master agent oversees the pipeline.

**Trade-off:** This divides the [[aiming-problem]] into multiple smaller aiming problems — which could make tuning easier (each phase is simpler) or harder (tuning errors propagate across phases). The problem changes form but doesn't disappear.

## The Agent Persistence Problem

The shared bottleneck across all designs: **agent persistence**. Long-running complex tasks can't fit in a single session. Extending the hierarchy upward (more master agents at higher abstraction levels) has two costs:

1. **Telephone game**: Longer chains of command increase hallucination risk and information loss
2. **Increased chaos**: Longer command chains mean less control over what bottom-level workers actually produce, making the system harder to tune

## Persistence Mechanisms

Three approaches to making agents persist beyond context limits:

### New Session Tool
A tool that lets the agent end its current session and start a new one with a crafted prompt. Eero Alvar built a basic version and found: the session transition works, but the agent accumulates markdown files it never cleans up, reads the same files repeatedly, and spends most of each session reorienting. Lots of tokens spent on reorientation, little work done.

### Compact Tool
A tool for in-session compaction — staying in one session forever by compressing context. Downside: compaction is lossy, and the agent has less control over what its context looks like after compression.

### Babysitter Agent
An agent that runs alongside the master orchestrator, **invisible to it**, silently managing its context — writing perfect launch prompts for new sessions so work flows seamlessly. The babysitter acts as the agent's **subconscious mind**. See [[babysitter-agent]].

The deeper issue: ideally, the agent shouldn't have to think about context management at all. It has enough to juggle orchestrating end-to-end software builds. Making it also manage its own context is additional cognitive load.

## Tuning Approaches

### Instruction Libraries
Instead of a scale, a library of instruction documents detailing every part of what goes into building software. By tweaking these instructions, you aim the system away from slop. This is [[context-engineering]] applied at the factory level.

### Verification Agents
In a phase-decomposition architecture, verification agents run between phases. In a persistent-master architecture, the master periodically spawns verification agents to check its work. By tuning the verification agents, you aim the system.

Either way, **tuning is the slow, expensive, and difficult part**.

## Practitioner View: Bespoke, Not Framework

[[steve-yegge|Steve Yegge]]'s contribution is the practitioner's correction: the framing above is correct as theory, but in practice every factory ends up being **bespoke, not framework-shaped**. Yegge reports he has built software factories continuously across his projects; the habit of building them is now muscle memory. Common components recur — but the assembly is per-project.

Recurring components Yegge identifies:

- **A "brain"** — a context store separate from the work. Yegge uses Obsidian. The brain holds design docs, conventions, and accumulated context that the agents reference. The exact tooling is incidental; the role — a persistent, agent-readable context store — is the load-bearing piece.
- **An issue-tracker-to-source-control bridge** — the minimum viable primitive. A Linear or GitHub Issues entry delegates to a GitHub app that runs CI. Tessl's two-app implementation is the productized version; the pattern recurs because every factory needs it.
- **Deterministic checks at the boundaries** — hooks that gate `git push` (run tests first), `stop session` (check committed), and CI (the same checks the local hooks ran, plus integration). See [[factory-maintenance]].
- **A two-mode agent topology** — a small "crew" of agents for deep design work (heavy context, deep review) plus a stream of well-specified throwaway work thrown at ephemeral agents. The two modes recur across Yegge's projects.
- **The factory is the routing layer** — the setup you have for swapping agents in and out for the appropriate work, tagged by [[intelligence-tier-routing|intelligence tier]], is the factory. See [[intelligence-tier-routing]].

> [!note] Departure: Framework vs. Bespoke
> Eero Alvar's framing is framework-shaped: pick one of three designs, tune it. Yegge's practice is the opposite: every project rebuilds the assembly, but the components converge. The frameworks ([[gstack]], [[gsd-core]]) are *one* such assembly each — useful as concrete instantiations, but not a one-size-fits-all. The wiki's existing framing (three architectural approaches) is necessary but not sufficient; the practitioner's correction is that the components are common, the assembly is bespoke.

## Stochastic Factory, Quality as a Dial

Yegge's quality argument: don't try to make one agent paint a wall perfectly on the first coat. The factory has to be **very stochastic**, and quality becomes a dial — how many tokens you're willing to spend on adversarial review, consensus, and swarming.

The mechanism:

- **Multiple passes, multiple coats** — like painting walls
- **Adversarial reviews** — agents that check other agents' output
- **Consensus** — multiple agents independently solving the same well-specified problem, with the factory picking the result
- **Quality as token spend** — the same stochastic factory produces different quality at different cost; the dial is up to the human

This is the practitioner version of the [[scaling-agent-systems|coordination-cost trade-off]]: the scaling study's 4.4× error amplification under Centralized coordination is bounded, in Yegge's framing, by choosing the right number of swarming passes for the work. The cost is dialed, not architectural.

## Shipped Instantiations

As of mid-2026, two open-source frameworks provide concrete instantiations of the software factory concept:

### gstack (Garry Tan)
[[gstack]] is the most direct shipped instance: 23 specialist slash-command skills that turn Claude Code into a virtual engineering team (CEO, eng manager, designer, reviewer, QA lead, security officer, release engineer). The sprint structure (Think → Plan → Build → Review → Test → Ship → Reflect) is the process that makes parallelism safe — without it, ten agents is ten sources of chaos. Tan reports running 10-15 parallel sprints and shipping at ~810× his 2013 pace. The [[boil-the-ocean|Boil the Ocean]] ethos (completeness is cheap with AI) and User Sovereignty principle (AI recommends, user decides) are the tuning instructions. This maps to Eero Alvar's "company-shaped hierarchy" design, but with the human retained as CEO rather than fully automated.

### GSD Core (Open GSD)
[[gsd-core|GSD Core]] maps to Eero Alvar's "task decomposition" design: a five-step phase loop (Discuss → Plan → Execute → Verify → Ship) where each phase produces artifacts the next phase consumes. The key architectural innovation is [[fresh-context-subagents|fresh-context subagents]] — thin orchestrators spawn specialist agents with clean context windows, solving the agent persistence problem that Eero Alvar identified as the shared bottleneck. The `.planning/` directory of persistent Markdown/JSON artifacts is the shared memory that survives session boundaries. Verification agents run between phases as Eero Alvar proposed, with the verifier enforcing that every requirement mapped to the phase is actually implemented before the phase advances.

### Convergence
Both frameworks converge on the same structural insight: the workflow is the safety mechanism. Without a process, parallel agents produce slop. With a process — where each step produces an artifact the next step consumes — each agent knows what to do and when to stop. The divergence is architectural: gstack chains skills within sessions (sprint model, human as CEO), GSD Core spawns fresh agents per task (subagent model, orchestrator as coordinator). See [[the-agent-workflow]] for the full workflow treatment.

## Thread

- [[the-slop-problem]] — The software factory framing defines slop precisely: outputs outside the desirable subset of production-ready, spec-aligned software
- [[the-agent-workflow]] — The software factory is the automation of the agent workflow — replacing the human-in-the-loop with a system
- [[agentic-engineering]] — The software factory is the "next logical step" in agentic engineering: designing systems that build systems
- [[the-human-lever]] — The software factory pushes the automation frontier: the human shifts from steering agents to tuning the factory

## Related

- [[aiming-problem]] — The core challenge of the software factory: tuning outputs to land in the desirable subset
- [[babysitter-agent]] — A proposed solution to the agent persistence problem
- [[multi-agent-code-orchestration]] — The company-shaped hierarchy approach maps to multi-agent orchestration patterns
- [[context-engineering]] — Instruction libraries as factory-level context engineering
- [[afk-agent]] — The software factory is the full automation of the AFK agent concept
- [[ralph-loop]] — The Ralph Loop's fresh-context-per-iteration is a minimalist persistence mechanism
- [[plan-disposability]] — Fresh plans per session as a persistence strategy
- [[the-human-lever]] — The software factory automates the execution layer of the human lever
- [[self-harness]] — Self-Harness automates harness engineering; the software factory automates spec-to-software — both self-optimization at different layers of the stack
- [[gstack]] — Shipped software factory: 23 specialist skills, sprint workflow, 10-15 parallel sprints
- [[gsd-core]] — Shipped software factory: five-step phase loop, fresh-context subagents, persistent `.planning/` artifacts
- [[fresh-context-subagents]] — GSD Core's architectural solution to the agent persistence problem
- [[boil-the-ocean]] — gstack's completeness ethos: the tuning instruction for factory output quality
- [[steve-yegge]] — Yegge's practitioner view: factories are bespoke, not framework-shaped; quality is a token-spend dial
- [[beads-work-ledger]] — The work-as-first-class-entity substrate the factory operates on
- [[factory-maintenance]] — The ongoing-hygiene problem the factory must budget for
- [[intelligence-tier-routing]] — The factory as the routing layer across model tiers

## Sources

- `raw/yt-systems-building-systems.md` — Eero Alvar: the software factory concept, mapping analogy, chaos property, three design approaches, persistence mechanisms, tuning approaches
- `raw/gstack-garry-tan-software-factory.md` — gstack: shipped software factory with 23 specialist skills, sprint workflow, parallel sprints, builder ethos
- `raw/gsd-core-opengsd-spec-driven-framework.md` — GSD Core: shipped software factory with five-step phase loop, fresh-context subagents, persistent planning artifacts, verification gates
- `raw/yt-steve-yegge-youll-never-write-code-the-same-way-again.md` — Yegge's practitioner corrections: bespoke-not-framework, the recurring components (brain, issue-tracker bridge, boundary hooks, two-mode topology, routing layer), the stochastic-factory-with-quality-dial argument, the two-mode crew-vs-throwaway pattern
