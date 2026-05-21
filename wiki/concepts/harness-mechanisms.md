---
title: Harness Mechanisms
created: 2026-05-21
updated: 2026-05-21
sources:
  - raw/2605.18747.pdf
tags: [concept, agent-harness, planning, memory, tool-use, control, optimization]
unaudited_marginal: 0
---

# Harness Mechanisms

> Once code is placed inside the agent loop, the harness must decide what to execute next, preserve useful state, expose the right tools, and convert failures into corrective actions. Harness mechanisms — planning, memory, tool use, control, and optimization — turn the [[harness-interface|harness interface]] into an operational system capable of long-horizon execution and adaptive improvement.

## Planning (§3.1)

Planning methods organize long-horizon software tasks by determining the sequence and structure of actions. The survey identifies four paradigms:

### Linear Decomposition Planning
Sequential step decomposition: the plan is a linear sequence of steps or subtasks. Tree-of-Thoughts, ReAct, and Plan-and-Solve decompose tasks breadth-first. Tool-Augmented Planning (RAP, LLM-Planner) interleaves planning with tool execution. The [[ralph-loop]] is a practical instantiation — one task per iteration, plan file as shared state.

### Structure-Grounded Planning
Plans are grounded in program structure: abstract syntax trees, control-flow graphs, call graphs, dependency graphs, and repository structure. CodeGraph, RepoGraph, and Agentless use code structure to inform planning granularity and scope. The code structure constrains the planning space to what's architecturally coherent.

### Search-Based Planning
The agent explores multiple planning trajectories and selects the best. Tree-Search (RAP, rStar, LATS), Monte-Carlo planning (TS-LLM), and beam search methods have been adapted for agentic planning. The compute cost is high, but search-based methods are the only reliable approach for open-ended tasks where the optimal plan isn't obvious.

### Orchestration-Based Planning
A meta-policy or orchestration layer coordinates the planning process itself. AutoAgents, MetaGPT, and ChatDev use manager agents to decompose tasks and assign subagents. Orchestrator-based approaches (OpenAI's Orchestrator pattern, AMP's fast + slow model delegation) are the multi-agent extension of planning — the orchestrator plans at the agent level.

## Memory and Context Engineering (§3.2)

Memory methods maintain working state, retrieve repository evidence, store reusable experience, and support shared interaction histories. The survey organizes memory into the cognitive-science taxonomy:

### Working Memory
State and context maintained within a single session: conversation history, current file pointers, tool call traces. Context compaction and state offloading are the core engineering challenges — the [[smart-zone-dumb-zone]] problem mapped to memory management.

### Semantic Memory
Factual knowledge about the codebase, environment, and tools, typically stored in retrievable form: vector databases, structured knowledge graphs, repository maps. [[context-engineering]] and [[code-intelligence]] are the practice of designing semantic memory for agent consumption.

### Experiential Memory
Past agent experiences that inform future behavior: successful tool-use patterns, common failure modes, learned preferences. Skill learning (agents capturing SOPs from trajectories) is the primary mechanism. [[evolving-context]] and [[agent-skills]] are the wiki's existing treatments.

### Long-Term Memory
Persistent state that survives across sessions: user preferences, project conventions, architectural decisions. [[context-files]] (AGENTS.md, CLAUDE.md) and skill files are the current practical forms. Long-term memory is an open problem — current implementations are "super hacky" custom prompts and manual reflection loops.

### Multi-Agent Memory
Shared state across multiple agents: blackboards, shared logs, repository state, belief-state synchronization. This is a frontier problem — current systems rely on sequential handoff or file-only state, which doesn't provide transactional semantics or assumption-level consistency.

### Context Compaction and State Offloading
Techniques to manage context growth: summarizing completed portions, offloading tool results to the file system, KV caching, progressive disclosure. These are the engineering practices that make long-horizon execution feasible. See [[multi-tier-action-space]] for the architecture.

## Tool Use (§3.3)

How agents connect to APIs, repositories, execution environments, and verification tools. The survey organizes four paradigms:

### Function-Oriented Tool Use
Classic tool-calling where the model selects from a predefined set of functions. MCP-based tools, OpenAPI-spec tools, and LangChain tools follow this paradigm. The challenge is tool bloat — too many tools confuse the model. The [[multi-tier-action-space]] pattern addresses this by keeping the tool layer thin (~12 tools).

### Environment-Interaction Tool Use
Tools that interact with environment state: file system operations, shell commands, repository operations, database queries, browser manipulation. Bash is the canonical environment-interaction tool — SWE-agent demonstrated that a minimal shell interface is sufficient for complex repository-level tasks, leveraging models' abundant training data for Unix utilities.

### Verification-Driven Tool Use
Tools whose primary purpose is verification: test runners, type checkers, linters, static analyzers, debuggers. These provide the deterministic feedback that drives the [[verification-loop]] and [[backpressure]]. The survey emphasizes that verification tools must be domain-aware and semantic, not merely syntactic (see [[harness-engineering]] §5.2.2).

### Workflow-Orchestration Tool Use
Tools that orchestrate the agent workflow itself: scheduling sub-tasks, spawning sub-agents, managing queues, routing work. The orchestrator model (fast router → specialized tools) is the canonical pattern — a lightweight tool that delegates to heavier tools or models.

## Harness Control: The Plan-Execute-Verify Loop (§3.4)

The control loop is the operational core of the harness, managing the transition from planning through execution to verification and back.

### From Debugging to Harness-Level Control
Traditional debugging fixes code. Harness-level control fixes the *loop*: adjusting how the agent plans (decompose differently), what it executes (different tool), how it verifies (different oracle). The shift is from debugging output to debugging the harness.

### Sandboxed Execution and Permissioned State Transition
Execution happens in sandboxed environments with graded permission tiers. The harness mediates between model intent and environmental consequence — a safety layer that filters, vetoes, escalates, and records actions. This directly instantiates the [[backpressure]] principle at the harness level.

### Verification through Deterministic Sensors
Deterministic feedback — test results, type errors, static analysis violations — drives the [[verification-loop|verification loop]]. The survey finds that LLM-based reflection for verification is reliable only when it remains grounded in executable evidence. Ungrounded reflection can produce plausible but incorrect self-assessments. Deterministic sensors are the only reliable verification mechanism.

## Agentic Harness Engineering for Adaptive Optimization (§3.5)

The newest paradigm: using the automatic harness to improve the harness itself.

### Deep Telemetry as the Optimization Substrate
Agentic Harness Engineering (Lin et al., 2026) proposes observability-driven automatic evolution of coding-agent harnesses. The harness collects deep telemetry — computational cost, decision paths, tool-use traces, memory pressure, specific failure cases — and uses it as the optimization signal.

### The Evolution Agent
An evolutionary or optimization agent analyzes telemetry, proposes modifications to the harness itself, and validates them against held-out regression suites. The mutation targets include: replanning strategy, memory format, tool selection, retrieval policies, verification procedures, and agent topology.

### Governed Harness Mutation
Every harness edit is treated like a code change to a safety-critical runtime. Each proposed change carries a "change contract": which component is modified, which failure mode it targets, what improvement it predicts, which invariants it must preserve, what evaluation can falsify it, and how it can be rolled back. This prevents the harness from overfitting, weakening safety, or regressing on rare tasks.

## Relationship to Platform Concepts

- The [[multi-tier-action-space]] pattern maps to the tool use taxonomy (Tier 1 = function-oriented, Tier 2 = environment-interaction)
- The [[ralph-loop]] is a concrete instantiation of linear decomposition planning + verification-driven control
- [[context-engineering]] maps to memory and context compaction techniques
- [[evolving-context]] maps to experiential and long-term memory
- [[agent-skills]] map to grounded skill selection and semantic memory
- [[verification-loop]] maps to harness control through deterministic sensors
- [[backpressure]] is the principle behind sandboxed execution and verified state transitions

## Thread

- [[code-as-agent-harness]] — Harness mechanisms are the operational middle layer of the code-as-harness framework
- [[the-agent-workflow]] — Planning, memory, and control mechanisms operationalize the HITL/AFK workflow
- [[agent-quality-engineering]] — Harness engineering (deep telemetry, governed mutation) is quality engineering for the harness itself
- [[tool-design-for-agents]] — The tool use paradigm taxonomy provides a systematic framework for tool design
- [[the-verifiability-thesis]] — Verification-driven control and deterministic sensors instantiate the verifiability principle

## Related

- [[harness-interface]] — The interface layer that mechanisms operationalize
- [[harness-engineering]] — Self-evolving harnesses and the open problems in scaling mechanisms
- [[plan-vs-review]] — Planning depth as a design decision within harness planning
- [[model-routing]] — Orchestration-based planning routes sub-tasks to optimal models
- [[agent-observability]] — Deep telemetry as the optimization substrate
- [[ralph-loop]] — Minimal instantiation of planning + control mechanisms

## Sources

- `raw/2605.18747.pdf` — Ning, Tieu, Fu et al. (2026). *Code as Agent Harness.* §3: Harness Mechanisms — Planning, Memory, Tool Use, Control, and Optimization (pages 16–33).
