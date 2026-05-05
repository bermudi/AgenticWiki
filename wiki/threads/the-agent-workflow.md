---
title: The Agent Workflow
created: 2026-04-25
updated: 2026-05-04
sources:
  - raw/yt-ai-coding-for-real-engineers.md
  - raw/yt-building-pi-in-a-world-of-slop.md
  - "raw/Software Fundamentals Matter More Than Ever — Matt Pocock - youtube.com.md"
  - raw/yt-dhh-ai-pilled.md
  - raw/yt-claude-code-feature-build.md
  - raw/yt-how-agents-use-dev-tools.md
  - raw/agentic-coding-recommendations.md
  - raw/how-to-ralph-wiggum.md
  - raw/ralph-wiggum-playbook.md
  - raw/How To De-Slop A Codebase Ruined By AI (with one skill) - youtube.com.md
  - "raw/Building Pi, and what makes self-modifying software so fascinating - youtube.com.md"
  - raw/slowing-the-fuck-down.md
  - "raw/Software Engineering Is Becoming Plan and Review — Louis Knight-Webb, Vibe Kanban - youtube.com.md"
  - "raw/Chroma Context Engineering Episode 1 - Dex Horthy (@dexhorthy) - youtube.com.md"
  - "raw/Chroma Context Engineering Episode 3 - Lance Martin - LangChain - youtube.com.md"
  - raw/yt-slop-watch-ideation.md
  - "raw/Mergeable by default Building the context engine to save time and tokens — Peter Werry, Unblocked - youtube.com.md"
tags: [thread, ai-engineering, workflow, agent-design, context-management, tool-design, autonomous-loops]
---

# The Agent Workflow

> How to actually work day-to-day with an AI agent: plan with human in the loop, execute away from keyboard, manage context ruthlessly, and ship tracer bullets to validate early. The operational layer that turns [[the-human-lever|design discipline]] into shipped software. The agent harness architecture has converged on a [[multi-tier-action-space]] pattern (thin tool layer + computer primitive), while [[evolving-context|evolving context]] — agents improving their own prompts, skills, and memories over time — is the major unsolved frontier.

## Thesis

The agent workflow consists of two interdependent phases — human-in-the-loop design (HITL) and away-from-keyboard execution (AFK) — joined by a tight feedback cycle. The HITL phase owns the [[shared-design-concept]] and tests; the AFK phase executes within those boundaries. Success depends on three supporting layers: [[context-engineering|context hygiene]] (keeping the model in the [[smart-zone-dumb-zone|Smart Zone]]), [[tool-design-for-agents|tool design]] (outputs that agents can consume), and [[verification-loop|verification infrastructure]] (mechanical backpressure that rejects wrong outputs). Without any of these, the workflow degrades into [[the-slop-problem|slop]].

## The Two Phases

[[matt-pocock|Matt Pocock]] describes the workflow as two distinct phases:

1. **The Destination** (the PRD): Defining *what* you're building. This is a human-led, high-stakes activity. Tools like `grill-me` force the human to articulate the [[shared-design-concept]] and establish a [[ubiquitous-language]] before writing a single line of code.
2. **The Journey** (the Kanban): Breaking the Destination into granular, actionable steps. Each step should be small enough to stay in the [[smart-zone-dumb-zone|Smart Zone]].

The key discipline: **never skip the Destination**. Going straight from a vague idea to generated code is the failure mode of the [[ai-design-loop]] — it produces code that lacks a coherent design and compounds into [[the-slop-problem|slop]]. [[dhh|David Heinemeier Hansson]] argues that we are in the era of the **[[peak-programmer]]**, where the ability to automate this "Journey" means that the "Destination" (the why and the what) is now the primary differentiator and value of an engineer.

## HITL → AFK

[[grey-box-engineering|Grey Box Engineering]] defines the handoff between the two phases:

- **HITL (Human-In-The-Loop)**: Used during planning. The human defines interfaces, types, and the overall architecture. The agent may participate in refining the design, but the human has final authority.
- **AFK (Away-From-Keyboard)**: Once the plan is granular enough, an [[afk-agent]] executes autonomously. Each task is bounded by the interfaces and verified by the [[verification-loop]].

This isn't a one-time handoff — it's a cycle. After each AFK execution, the human reviews the outcome (via tests, not line-reading) and adjusts the plan before the next AFK session.

## Tool Design as Workflow Infrastructure

[[zanie-blue|Zanie Blue]] (Astral) identifies tool output design as a workflow concern, not just a tooling detail. When agents run tools in the AFK phase, the output those tools produce directly affects context consumption. Verbose output from a type checker or package manager floods the context window, degrading subsequent reasoning.

The fix is [[tool-design-for-agents|designing tools for agentic consumption]]: machine-readable output with built-in context reduction, verbose logs persisted to files instead of returned inline, and schemas that let agents request only the data they need. This isn't a nice-to-have — as inference gets faster, tools become the bottleneck.

## Know Thy Machine

The workflow assumes you understand *what the machine actually does*. Treating the LLM as a black box that "just works" leads to bad planning, bad tool choices, and bad verification strategies. Several sources converge on a shared mental model of LLM internals that should inform every workflow decision:

### The Machine Is Lossy Compression
An LLM is ~10TB of training data squeezed into ~140GB of weights. It does not contain facts — it contains statistical patterns that *resemble* facts. This has two consequences:

1. **Extrinsic hallucination**: When the model "remembers" something, it's reconstructing a compressed approximation, not retrieving a record. It invents npm packages that don't exist, cites papers that were never written, and fabricates APIs with plausible signatures.
2. **Fluency over accuracy**: The training objective is next-token prediction — producing the most *plausible* continuation, not the most *true* one. RLHF exacerbates this by rewarding confident, helpful-sounding answers over hedging or admitting ignorance.

### Attention Degrades Quadratically
The [[smart-zone-dumb-zone]] isn't a vague metaphor — it's a consequence of the transformer architecture. As context fills, the model's ability to connect distant pieces of information degrades. This is why:
- Long sessions produce worse code than fresh ones with minimal, high-quality context.
- "Compacting" (summarizing history) preserves the vibes but loses the precision needed for implementation.
- The Memento Strategy works: clear everything, reload only what matters.

### Intrinsic vs. Extrinsic Tasks
A practical distinction from [[matt-pocock|Matt Pocock]]:
- **Extrinsic tasks** ask the model to reach into its weights for knowledge. "What's the API for React hooks?" — high hallucination risk.
- **Intrinsic tasks** give the model everything it needs in context. "Given this file and these types, add a function that..." — much lower risk.

The entire RAG strategy, the emphasis on providing source files in context, and the [[verification-loop]] all follow from this distinction: **engineer the workflow to make tasks intrinsic whenever possible.** Don't ask the model to remember; give it the reference.

### The Agent Can't Self-Assess Quality
Agents cannot reliably judge their own output. They don't experience confusion, they don't notice when they've drifted from the design concept, and they confidently produce code that looks right but is wrong. This is why:
- [[backpressure]] must be mechanical (test failures, type errors), not vibes-based ("this looks good").
- [[verification-loop|Verification loops]] are non-negotiable infrastructure, not optional quality gates.
- The human's role in HITL isn't to read every line — it's to own the tests and types that automate the assessment.

## Planning Depth: The Plan-Vs-Review Axis

[[louis-knight-webb|Louis Knight-Webb]] adds a crucial operational dimension: **how much planning depth should you invest before executing?** The two modes exist on a spectrum:

- **Plan-heavy**: Write a comprehensive spec. Interrogate the agent until it exhausts all questions. Produces fewer review rounds, but requires more upfront thinking.
- **Review-heavy**: Give the agent a rough goal. Let it iterate. More back-and-forth, higher total human time because review is interrupt-driven.

The quantified heuristic: **5 minutes of planning saves 30 minutes of reviewing.** Switching back and forth with a half-finished agent output is more taxing than doing the thinking upfront.

### The Feature Type Matrix

Knight-Webb provides concrete guidance for which approach works where:

| | Features | Refactoring / Migrations |
|---|---|---|
| **Frontend** | Review-heavy — too stateful, too many edge cases | Plan-heavy — well-defined transformations |
| **Backend** | Plan-heavy — TDD works naturally | Plan-heavy — fully hands-off |

Frontend feature development is the hardest case for plan-heavy because stateful UIs resist exhaustive specification. The human stays in the loop, reviewing outputs iteratively. Everything else can and should be plan-heavy.

## Managing Context

Context management is the operational challenge nobody anticipated. The [[smart-zone-dumb-zone]] heuristic describes the problem: LLMs reason best in the first ~100k tokens of context. Beyond that, attention degrades quadratically. The model starts ignoring constraints, hallucinating APIs, and losing track of the design concept.

The fix isn't bigger context windows — it's **ruthless context hygiene**:

- **The Memento Strategy**: Instead of summarizing a long session (which preserves the "vibes" but loses precision), clear the context and start fresh with minimal, high-quality context: the current file, relevant interfaces, and the specific task.
- **Deep modules as context boundaries**: A well-designed deep module is naturally context-complete — the agent needs the interface, not the entire call graph.

[[mario-zechner|Mario Zechner]] designed [[pi]] around this insight. Pi's minimal core (four tools: `read`, `write`, `edit`, `bash`) and session-based model make it easy to reset context and stay in the Smart Zone. The design philosophy — [[malleable-agents|malleability]] — means the agent itself can create new tools mid-session to reduce its own context load.

## Model Switching Strategy: Stick With One

[[dex-horthy|Dex Horthy]] makes a strong case against tool-switching: people who constantly swap between Claude Code, Cursor, Codex, and Deep Research "are only going to get to like 80% of the possible level of intuition" compared to focused practice. The engineers who get the best results have spent 1-2 months intensively with a single model family and tool.

The intuition isn't about prompt syntax — it's about behavioral nuance:
- Different models respond differently to instruction style (all caps helps Opus but de-tunes Codex)
- Opus follows 6-step workflows; Sonnet forgets steps 4-6 mid-workflow
- Prompts optimized for one model need complete rework for another
- Maintaining multiple prompt sets means updating all of them every time models change

This creates a tension with multi-model architectures: if specialization across models is valuable, but deep intuition requires focus, the right strategy may be to develop deep intuition with one primary model/tool, and only bring in secondary models for well-defined, eval-gated sub-tasks.

### Fast Orchestrator + Smart Oracle Pattern

The AMP Code team pioneered an architecture that resolves the multi-model tension differently: instead of switching models across different sessions, delegate within a single session. The fast model (Sonnet) handles navigation, tool calling, and routing. When heavy reasoning is needed — 50 files to analyze for a race condition — the fast model batches the context and hands it to a slower, smarter "oracle" (Opus, o3) as a single prompt.

Key insight: **smart models are bad at tool calling.** If you have the fast orchestrator determine relevance, then batch everything into one prompt for the oracle, you avoid the oracle wasting time on tool calls. The oracle gets a dense, curated context — the essence of [[context-engineering]].

## The Agent Harness Architecture

The [[multi-tier-action-space]] pattern has emerged across Claude Code, Manis, AMP, and Deep Agents as a shared agent harness architecture. It has two tiers:

1. **Tool calling layer**: A thin set of atomic, general-purpose tools (~12) — glob, grep, file read/write, bash. These control the computer but don't encode domain logic.
2. **Computer**: A shell, file system, and code execution environment where the actual actions happen via bash commands, scripts, and file operations.

The key insight: **n actions ≠ n tools**. Instead of binding every action as an individual tool (each consuming context tokens), push actions out to the computer where the agent can compose them via bash pipes and code. This keeps the tool layer from bloating context and confusing the model.

This architecture is supported by a family of [[context-engineering]] techniques:

- **Progressive disclosure**: Pull context (tools, skills, SOPs) on demand rather than preloading everything. Tool search, file-based skills, and MCP-to-filesystem sync.
- **Context offloading**: Save tool results to the file system instead of accumulating them in chat history. Avoids both context bloat and the destructiveness of compaction.
- **Sub-agent isolation**: Spawn sub-agents with clean context windows for atomic, parallelizable tasks. The [[ralph-loop]] extends this to serial tasks — each loop iteration is a fresh context window.
- **KV caching**: Cache the invariant portion of chat history. Cache hit rate directly affects speed and cost.

### The MCP Lesson

MCP (Model Context Protocol) made it easy to add tools, which created a tool-bloat problem — the GitHub MCP server is 35,000 tokens across 35 tools. The resolution: push MCP servers out of the tool calling layer and into the computer tier. Cursor syncs MCP tool definitions to the file system as files; Manis built a CLI for MCP. The principle: MCP servers are a capability source, but their definitions don't belong in the system prompt.

## The Evolving Context Frontier

[[evolving-context]] — continual learning in token space — is the major unsolved problem in agent workflows. Currently, all context management is hand-tuned heuristics: "offload after N turns," "spawn sub-agents for these task types." The emerging vision is agents that improve their own context over time:

- **Task-specific prompt evolution**: Reflect over agent trajectories, score outcomes, and iteratively refine prompts (a paper Lance references as "Jeepa" from DSPy/Omar).
- **Memory and preference learning**: Accumulate preferences across sessions — coding style, PR conventions, durable vs. temporary preferences. [[lance-martin|Lance Martin]]'s Claude Diary is a crude prototype.
- **Skill learning**: When an agent discovers a reusable SOP, capture it as a skill file for future tasks (Let paper).

> [!warning] Open Frontier
> All three categories are currently "super hacky" — custom prompts and manual reflection loops. RLM (Recursive Language Models, trained to manage their own context) is an exciting direction, but the classifier heuristic (articulated by the host, Dex Horthy, and elaborated by Martin) suggests some decisions (user-specific preferences, nuanced memory salience) will always need user-supplied guardrails. The mechanics of storage and retrieval can be learned; the *values* for what to keep may stay external.

## Tracer Bullets

Within the Journey phase, [[tracer-bullets]] are the first thing to ship: thin vertical slices that hit every layer of the stack (DB → API → Frontend). They serve three purposes:

1. **Proof of concept**: Validates that the layers fit together before building them out.
2. **Context scaffold**: Gives the agent a concrete end-to-end reference for subsequent tasks.
3. **Design validation**: Tests whether the [[shared-design-concept]] actually works in practice, not just on paper.

## What Makes a Good Agent Task

[[mario-zechner|Mario Zechner]] provides a crisp checklist from his blog post:

1. **Scopable**: The agent doesn't need to understand the full system.
2. **Closable loop**: The agent has a way to evaluate its own work.
3. **Not mission-critical**: Nobody's life or revenue depends on the output.
4. **Exploratory**: Trying things you'd otherwise not have time for.

Karpathy's auto-research is a good example — you give it a narrow evaluation function (startup time, loss), and it optimizes. But beware: the evaluation function only captures a narrow metric. The agent will happily ignore code quality, complexity, or correctness if your evaluation function doesn't capture them. The human is always the final quality gate.

## The Day-to-Day Loop

Putting it together:

1. **Design** (HITL): Define the Destination. Articulate the shared design concept. Use `grill-me` or equivalent to stress-test your thinking.
2. **Plan** (HITL): Break the Destination into a Kanban. Each task should be completable within a single Smart Zone session.
3. **Ship a tracer** (AFK): Build the thinnest vertical slice first. Verify it end-to-end.
4. **Execute** (AFK): Work through the Kanban, one task per session. Clear context between tasks.
5. **Review** (HITL): After each task, verify via tests and types. Adjust the plan if needed.
6. **Repeat** from step 4 until the Journey is complete.

## Architecture Review Cadence

Separate from the feature-building loop, [[matt-pocock|Matt Pocock]] identifies a slower, architectural rhythm: running the [[improve-codebase-architecture]] skill **every couple of days**, especially in fast-moving codebases.

This is not feature work — it's structural triage:

1. **Scan** (HITL): The skill explores the codebase and surfaces deepening candidates — parallel implementations without a shared [[seams-and-adapters|seam]], concepts scattered across files with low [[locality-and-leverage|locality]], [[deep-vs-shallow-modules|shallow modules]] with poor leverage.
2. **Grill** (HITL): The human picks a candidate. The skill enters a grilling session, probing the human's intent for the module (What should the interface be? What invariants must hold? What adapters will satisfy it?). The human is an active design partner, not a passive reviewer.
3. **Propose** (HITL): The skill produces a concrete module design — interfaces, method signatures, invariants — that becomes a GitHub issue for an [[afk-agent]] to implement.

The key difference from the feature loop: architecture review is **proactive entropy prevention**. It doesn't respond to a feature spec — it scans for structural decay and proposes fixes before the decay becomes [[the-slop-problem|slop]].

AI-accelerated development means architecture drifts faster than human-written codebases. Small, frequent deepening (every few days) is cheaper than occasional large refactors.

## Research Phase: Going From Zero to Greenfield

Before an existing project has features to build, the workflow must start with **research**. [[matt-pocock|Matt Pocock]]'s Slop Watch stream is the most detailed real-time demonstration of how to go from a vague idea to a buildable concept.

The process mirrors the feature pipeline but at a higher level of abstraction — instead of grilling a concrete feature, you're grilling the idea itself:

1. **Constraint gathering**: Start with a few loose constraints (useful, complex, some front-end + back-end, AI-coding-related). Let the chat or audience validate the idea space.
2. **Parallel research via sub-agents**: Launch multiple Claude Code sessions simultaneously — each investigates a different dimension of the problem. For Slop Watch, sub-agents researched five coding agents' observability surfaces (Claude Code, Codex, [[pi|Pi]], Copilot CLI, Open Code). The results are compacted into a research document.
3. **Domain modeling**: Use a Grill Me or domain-model skill to define the project's ubiquitous language before writing any code. This is where the core entities (session, turn, model request, listener, server) are discovered and locked in.
4. **Context compaction**: Create research documents that preserve the session's findings. Clear the context window and start fresh for the next phase. Matt creates these documents and immediately resets — he doesn't review them.
5. **Ub-lang locking**: Review and edit the `context.md` glossary. This is the one artifact Matt reads personally — it's the boundary between "AI-owned research" and "human-owned design."

### Trusted vs. Untrusted AI Artifacts

A key procedural distinction revealed by the stream: Matt **does not read** the research documents. He trusts the AI to have compacted key findings correctly. But he **does read and edit** the ubiquitous language glossary (`context.md`).

This split is an operational principle:
- **Research documents** are AI-owned reference material — created by AI for AI. The human doesn't need to verify them because they're consumed by the implementing agent later, not by the human.
- **Ubiquitous language** is human-owned design — the glossary defines the system's shared concepts. The human must verify and own this because every subsequent decision flows from it.

### The "Bored of Talking" Signal

When the domain modeling session starts producing diminishing returns — Matt's phrase was "I'm sort of sick of talking about the app now" — that's a signal to stop deciding and start building. "You can only make meaningful decisions when you're working with an actual asset. Working in this abstract space is not good." The stream ended with 8 resolved decisions, clear language, and a known architecture — precisely at the point where further abstraction would be wasteful.

## [[matt-pocock|Pocock]]'s Full Pipeline

Once a project has been established, [[matt-pocock|Matt Pocock]] demonstrates the most operationally detailed version of this workflow in a real feature build:

1. **Grill Me**: A 22-minute Q&A session where the agent asks increasingly precise questions about the feature. The agent explores the codebase via subagents (token-efficient — the parent only gets a summary). The human dictates rough ideas; the agent challenges framing, identifies gaps, and forces specificity.
2. **Update Ubiquitous Language**: New terms from the grilling session are added to the glossary before proceeding. This ensures the vocabulary for the PRD and implementation is already agreed upon.
3. **Write PRD**: The agent generates a Product Requirements Document as a GitHub issue. The PRD includes user stories, implementation decisions, module boundaries, and testing decisions.
4. **PRD to Issues**: A separate skill breaks the PRD into individual GitHub issues with blocked-by relationships. The PRD is still in context from writing it, making decomposition token-efficient.
5. **Ralph Loop (AFK)**: An [[afk-agent]] runs in a Docker container, implementing issues sequentially, committing, and closing them. Tests and type-checks run on every commit.
6. **QA in Parallel**: While the agent implements, the human tests the application manually, filing bugs as GitHub issues. The next Ralph iteration picks these up.
7. **Repeat**: Ralph loop after Ralph loop until issues are exhausted.

The key insight: **steps 5 and 6 happen concurrently**. The human doesn't wait for the agent to finish before starting QA. This is the "**day shift / night shift**" pattern (coined by Jamon on Twitter) — the human designs and QA's during the day, the agent implements at night.

### Interface Review, Not Code Review

A critical discipline in [[matt-pocock|Pocock]]'s pipeline: during the PRD phase, he reviews **module interfaces**, not implementations. When the agent proposes adding a new `materializeCourseAndLesson` method to the course write service, [[matt-pocock|Matt]] evaluates whether it should be a new method or a parameter on an existing one — an interface decision. He doesn't care how it's implemented.

During QA, he reviews **outputs** (does the feature work?), not code. Bugs are filed as GitHub issues with enough context for the AFK agent to fix them. This is [[grey-box-engineering|Grey Box Engineering]] in practice.

## Ronacher's Concrete Practices

[[armin-ronacher|Armin Ronacher]] grounds the workflow in specific tooling and language choices:

- **Go as the workflow language**: Go's test caching means the agent doesn't need to decide which tests to run — the tool handles it. Fast compilation keeps the AFK loop tight. Explicit context passing eliminates the "where does this data come from?" confusion.
- **Makefiles as workflow interfaces**: `make dev`, `make tail-log` — simple, deterministic targets that the agent can invoke without understanding the underlying process manager.
- **Parallelization frontier**: Ronacher identifies shared state (filesystem, databases) as the bottleneck for running multiple agents. Tools like container-use and background agents are early attempts at solving this.
- **Refactor timing**: Don't refactor too early (wastes agent effort) or too late (complexity overwhelms the agent). Extract component libraries when Tailwind classes splinter across 50 files.

## Huntley's Ralph Loop

[[geoffrey-huntley|Geoffrey Huntley]]'s [[ralph-loop|Ralph Loop]] provides the most operationally detailed AFK implementation in the wiki. A dumb bash loop feeds a prompt to Claude; the agent reads a plan file, picks one task, implements, commits, exits. Fresh context each iteration. [[backpressure|Backpressure]] rejects wrong outputs. [[plan-disposability|Plans are disposable]]. See [[ralph-loop]] for full mechanics.

The Ralph Loop is a concrete instantiation of the HITL/AFK cycle: Phase 1 (Requirements) is HITL, Phase 2 (Planning) is automated gap analysis, Phase 3 (Building) is AFK with backpressure.

## The Adoption Learning Curve

[[armin-ronacher|Armin Ronacher]]'s interviews with ~30 engineering teams reveal a consistent pattern: agent adoption follows a 2-3 week learning curve that can't be mandated from above. Teams that adopted during vacation periods (summer, Thanksgiving, Christmas) developed genuine proficiency. Mandates ("you must use Cursor") didn't stick. The honeymoon period lasts ~2 months before engineers start feeling the complexity they introduced. This suggests patience rather than urgency in adoption strategy.

## The "Prompt Request" Pattern

Peter Steinberger's idea: instead of sending code (pull requests), send the prompt that generated it. [[armin-ronacher|Armin Ronacher]] refines this: the prompt is valuable because the act of creating clarifies what you really wanted to build. Once intent is understood, the senior engineer often starts fresh rather than fixing the agent's implementation. [[mario-zechner|Mario Zechner]] values seeing the terrible implementation anyway — it reveals the problem space without costing his own time ("valuable garbage").

## Focus Maxing / Parallel Agent Management

As agents run for longer — Copilot (seconds per line) → Cursor (~30s per file) → Claude Code (1-2 min in 2024, 5-10 min in 2025) — the 5-minute mark is a behavioral threshold. Below it, humans can wait and watch. Above it, they must change how they work.

[[louis-knight-webb|Louis Knight-Webb]] calls the new operating mode **"focus maxing"**: run multiple agents in parallel, review one output while others are still running. The pattern:

1. Send off several agent tasks simultaneously
2. When one finishes, review the output (tests, diff, preview)
3. Send corrections or approve while others keep running
4. Repeat

This is a fundamentally different mode from traditional software engineering, where the human locks into one piece of deep work at a time. Focus maxing treats the human as a manager of multiple concurrent streams of work, each in different stages of the plan-execute-review lifecycle.

The key design constraint: agents must run for **long enough** that context-switching doesn't fry the human. Shifting attention every 30 seconds between agent outputs is unsustainable. The ideal is sessions of 5+ minutes where the agent produces a complete, reviewable unit — not incremental partial outputs that require constant mid-stream intervention.

This parallels the "day shift / night shift" pattern (Jamon) from [[matt-pocock|Pocock]]'s pipeline: the human runs multiple agents during the day (each in different stages), not just one overnight batch. The [[verification-loop]] becomes a parallel concern — different streams may need different verification gates.

## Concepts in this thread

- [[hallucination]] — The machine's failure mode: lossy compression masquerading as knowledge
- [[smart-zone-dumb-zone]] — Why context hygiene matters, grounded in transformer architecture; managing LLM reasoning quality
- [[afk-agent]] — Agents that implement features in the background
- [[ai-design-loop]] — Iterating with an agent to refine plans
- [[tracer-bullets]] — Vertical slices for early end-to-end validation
- [[ubiquitous-language]] — Shared terminology to align human and agent
- [[malleable-agents]] — Agents that can be modified on the fly by users or themselves
- [[verification-loop]] — Automated feedback for each execution step
- [[peak-programmer]] — The shift from manual implementation to high-level design and verification
- [[tool-design-for-agents]] — Tool output design as workflow infrastructure
- [[backpressure]] — Engineering the environment to reject wrong outputs
- [[ralph-loop]] — The canonical AFK loop implementation
- [[improve-codebase-architecture]] — The skill for periodic architecture scans and deepening
- [[seams-and-adapters]] — Missing seams are the primary deepening candidates found by architecture scans
- [[locality-and-leverage]] — The two evaluation criteria for every deepening candidate
- [[deliberate-friction]] — Intentional friction at high-stakes decision points in the HITL phase
- [[document-degradation]] — Silent document corruption undermines AFK delegation viability
- [[comprehension-debt]] — Teaching mode as inquiry-based workflow; the cognitive cost of delegation-only workflows
- [[plan-disposability]] — Plans as ephemeral coordination state, regenerated each iteration to prevent drift
- [[plan-vs-review]] — The quantified tradeoff between planning depth and review burden
- [[shared-design-concept]] — The theory of the code that must be shared between human and agent for effective delegation
- [[context-engineering]] — The practice of maximizing information-per-token density; the infrastructure of the workflow
- [[multi-tier-action-space]] — The thin-tool-layer + computer architecture that dominates current agent harnesses
- [[evolving-context]] — Continual learning in token space; the unsolved frontier of agents improving their own context over time
- [[lance-martin]] — Catalogued the agent harness architecture and evolving context categories
- [[agent-friendly-tooling]] — Fast, observable, misuse-resistant tools as the operational infrastructure of the workflow
- [[deep-vs-shallow-modules]] — Deep modules as context boundaries and delegation units within the workflow
- [[grey-box-engineering]] — The core HITL/AFK handoff pattern that structures the workflow

## Related

- [[the-slop-problem]] — What happens when you skip the planning phase
- [[the-human-lever]] — The design authority that underpins the whole workflow
- [[tool-design-for-agents]] — The tool layer that makes this workflow possible
- [[agent-friendly-tooling]] — Fast tools keep the AFK execution loop tight and the agent in the Smart Zone
- [[unblocked]] — A context engine that operationalizes the workflow at organizational scale; pre-curates context to prevent doom loops
- [[peter-werry]] — Context engine architecture as workflow infrastructure; satisfaction of search as a design constraint on the planning phase

## Sources

- `raw/yt-ai-coding-for-real-engineers.md` — HITL/AFK, tracer bullets, Smart Zone
- `raw/yt-building-pi-in-a-world-of-slop.md` — Context management, malleability, minimalism
- `raw/Software Fundamentals Matter More Than Ever — Matt Pocock - youtube.com.md` — AI design loop, shared design concept, outrunning headlights, software entropy, code is not cheap
- `raw/yt-dhh-ai-pilled.md` — DHH on the shift from manual implementation to agentic workflows
- `raw/yt-claude-code-feature-build.md` — Ubiquitous Language, AFK agents (Ralph), PRD to Issues pipeline
- `raw/yt-how-agents-use-dev-tools.md` — Tool design as workflow infrastructure, scale effects, context reduction
- `raw/agentic-coding-recommendations.md` — Go for agents, Makefile interfaces, parallelization, refactor timing
- `raw/how-to-ralph-wiggum.md` — Ralph Wiggum loop: one task per iteration, backpressure, plan disposability
- `raw/ralph-wiggum-playbook.md` — paddo.dev summary of the Ralph methodology
- `raw/How To De-Slop A Codebase Ruined By AI (with one skill) - youtube.com.md` — Architecture review as a distinct, cadenced workflow phase.
- `raw/slowing-the-fuck-down.md` — Good agent task criteria; Karpathy auto-research as example; agentic search recall problem.
- `raw/Building Pi, and what makes self-modifying software so fascinating - youtube.com.md` — Context management, malleability, Pi origin story, one-task-per-iteration sidesteps Dumb Zone.
- `raw/Software Engineering Is Becoming Plan and Review — Louis Knight-Webb, Vibe Kanban - youtube.com.md` — Plan-vs-review tradeoff, feature type matrix, time horizon shift, focus maxing / parallel agent management.
- `raw/Chroma Context Engineering Episode 1 - Dex Horthy (@dexhorthy) - youtube.com.md` — Context engineering definition, model switching strategy, fast orchestrator + smart oracle pattern, personal productivity systems.
- `raw/Chroma Context Engineering Episode 3 - Lance Martin - LangChain - youtube.com.md` — Multi-tier action space architecture, evolving context categories, MCP lesson, context management techniques catalog, Ralph Loop context isolation framing.
- `raw/yt-slop-watch-ideation.md` — Research phase workflow: parallel sub-agents, domain modeling, trusted vs. untrusted AI artifacts, the "bored of talking" signal.
- `raw/Mergeable by default Building the context engine to save time and tokens — Peter Werry, Unblocked - youtube.com.md` — Context engine architecture as workflow infrastructure; satisfaction of search as a design constraint on the planning phase; benchmark data showing 10× improvement in wall-clock time.

