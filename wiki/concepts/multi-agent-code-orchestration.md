---
title: Multi-Agent Code Orchestration
created: 2026-05-21
updated: 2026-05-21
sources:
  - raw/2605.18747.pdf
tags: [concept, multi-agent, orchestration, code-harness, collaboration]
unaudited_marginal: 0
---

# Multi-Agent Code Orchestration

> Scaling the [[code-as-agent-harness|code-as-harness]] framework from single agents to multi-agent systems: the harness becomes a shared substrate where specialized agents with distinct roles (manager, planner, coder, reviewer, tester) coordinate through shared code artifacts, execution feedback, and structured workflow topologies. A defining property of code-centric multi-agent systems is **artifact-mediated communication**: agents observe and modify shared code artifacts, and their interaction is grounded in objective state exposed by execution results.

## Why Multi-Agent?

Single-agent systems face three fundamental limitations that multi-agent systems address:

1. **Context window constraints**: No single agent can hold an entire codebase, long interaction history, and execution trace in working memory
2. **Specialization requirements**: Using one generalist agent for planning, synthesis, testing, review, and debugging simultaneously is inefficient
3. **Absence of independent verification**: Without separate coordination and verification channels, an agent cannot reliably detect and correct its own errors during long-horizon execution

Multi-agent systems distribute responsibilities across specialized roles, making the harness itself more modular, inspectable, and adaptable. Pioneering systems — ChatDev (2023), MetaGPT (2023), AgentCoder (2023) — demonstrated this by dividing software-development responsibilities among architect, programmer, tester, reviewer, and executor roles.

## Agent Roles (§4.1.1)

The survey identifies five functional role categories:

### Program Synthesis Agents
Generate or transform code from specifications, plans, or feedback. The most common role across systems. Includes the Coder in Self-Collaboration, Programmer in AgentCoder, Engineer in MetaGPT, Developer in ChatDev, and RTL Generation Agent in MAGE.

### Program Understanding Agents
Analyze existing code or specifications to produce higher-level representations. They own *interpretation* — what the code means, not what it does. Includes the Repository Custodian in MAGIS, Navigator in HyperAgent, and Column-type Annotator in CleanAgent.

### Verification Agents
Evaluate code quality through test generation, static analysis, or simulation. The Test Designer in AgentCoder generates test cases independently to avoid circular reasoning. The Panelists in CANDOR audit oracle correctness against natural language specs. AutoSafeCoder's Fuzzing Agent uses type-aware mutation to generate crash-inducing inputs.

### Execution Agents
Interface directly with the program runtime. Critically, the Test Executor in AgentCoder is a **deterministic Python script**, not an LLM — cleanly separating reasoning from execution. HyperAgent's Executor runs tests via interactive bash. MAGE's Judge Agent interfaces with RTL simulation for per-clock-edge waveform snapshots.

### Planning Agents
Decompose the overall task into subtasks and assign them to synthesis agents. Includes the Architect and Project Manager in MetaGPT, the Manager in MAGIS, and the Scrum Master in FlowGen. The Mother agents in SoA dynamically spawn Child agents at runtime based on inferred subfunction complexity.

EvoMAC introduces two novel meta-roles that operate at the MAS level itself: the **Gradient Agent** (reads execution logs to identify which agents caused failures) and the **Updating Agent** (revises agent prompts and restructures the workflow DAG accordingly).

## Interaction Modes (§4.1.2)

Unlike general MAS where interaction is primarily message-passing, code-centric interaction is **artifact-mediated** — grounded in the objective state of shared code artifacts. Four modes:

### Collaborative Synthesis
Two agents jointly construct a program component. The Navigator–Driver pairing in PairCoder is the most direct instantiation: Navigator generates and selects solution plans, Driver implements them.

### Critique and Repair
The dominant mode. A verification agent inspects code and produces structured feedback; a synthesis agent revises in response. Key design decisions: whether critique is LLM-simulated or execution-grounded, richness of the feedback signal (binary pass/fail vs. structured execution logs), and number of repair iterations.

### Adversarial Validation
One agent actively tries to *break* the code rather than review it. AutoSafeCoder's Fuzzing Agent generates crash-inducing inputs using type-aware mutation. MAGE uses simulation mismatch as an adversarial signal — the Debug Agent receives the exact waveform around the first clock-edge failure.

### Reasoning Debate
Agents argue over correctness before reaching consensus. ChatDev's communicative de-hallucination has agents ask clarifying questions before committing. CANDOR implements majority-vote panelist evaluation. FlowGen's Scrum sprint meetings enable disordered multi-agent discussion around a shared context buffer.

## Workflow Topologies (§4.1.3)

The topology of agent interaction — who communicates with whom, in what order, and how many times — is the most consequential design decision.

### Pre-defined Heuristic Topologies
- **Chain (Waterfall)**: Strict linear order — planning → synthesis → verification. ChatDev, MetaGPT, FlowGen's FlowWater, L2MAC.
- **Cyclic (Iterative)**: Back-edges for revision. AgentCoder (programmer → test → programmer cycle, ≤5 iterations), Self-Collaboration (coder ↔ tester, ≤4 iterations), PairCoder (multi-plan exploration with dead-end detection).
- **Hierarchical**: Manager agents above worker pools. MAGIS (Manager dynamically instantiates Developer agents), HyperAgent (planner above navigation and editing workers), SoA (recursive Mother→Child spawning).
- **Star**: Hub agent coordinates parallel workers. CANDOR's panel (Requirement Engineer fans out to three Panelist pipelines), MetaGPT's publish-subscribe message pool.

### Objective-driven and Adaptive Topologies
- **Dynamic agent pool scaling**: Agent count scales with task complexity, topology type fixed. SoA, MAGIS, BOAD (bandit-optimized sub-agent selection).
- **Feedback-driven DAG restructuring**: EvoMAC's Gradient Agent reads execution logs to attribute failures, Updating Agent modifies prompts and graph structure — topology structurally modified in response to execution feedback.
- **Runtime self-reorganization**: SEW generates and mutates entire workflow specifications using evolutionary operators. FlowReasoner trains a meta-agent to generate tailored multi-agent systems per input problem.

## Execution Feedback Integration (§4.2.1)

Types of execution feedback used in multi-agent code systems, by granularity:
- **Compiler/syntax**: Structural errors, used by ChatDev and L2MAC
- **Test pass/fail**: Most common, used by AgentCoder, QualityFlow (also introduces *Imagined Execution* — LLM-simulated Python interpretation, 98%+ precision on MBPP)
- **Fuzzer crash traces**: Concrete failing inputs with exit codes, used by AutoSafeCoder
- **Static analysis warnings**: CWE-mapped vulnerability detection, used by AutoSafeCoder
- **Performance profiling**: Execution time, memory, FLOPS, used by MACRO
- **Fine-grained simulation**: Per-clock-edge waveform snapshots, used by MAGE (the finest granularity in the literature)

## Shared-Harness Synchronization (§4.2.2)

### Sequential Handoff
Most common: each agent receives its predecessor's output. Simple but creates invisible state divergence when multiple agents modify the codebase in parallel.

### Shared Blackboard
Persistent, globally accessible state. L2MAC's file store D (never overwritten, extended and revised). MAGIS's repository evolution memory (key-value store of file summaries). Self-Collaboration explicitly invokes the blackboard metaphor.

### Parallel Branches with Merge
Multiple agents modify independent components simultaneously. MAGIS (one Developer per candidate file), HyperAgent (Redis queue for parallel Navigator/Editor instances).

### Structured Context Scheduling
Explicit management of what each agent sees and when. L2MAC's Control Unit resets context between instruction steps. MetaGPT's publish-subscribe message pool gives each agent a filtered view.

### Hierarchical Memory
Short-term working context + long-term accumulated knowledge. ChatDev (phase-level dialogue vs. cross-phase solutions), Cogito (neurobiological three-tier memory), HyperAgent (LLaMA-3.1-8B log summarizer).

## Shared Harness Representation (§4.3.1)

The survey distinguishes four levels of how multi-agent systems represent the shared code state:

| Representation | Description | Examples |
|---|---|---|
| **Implicit/File-only** | No persistent, queryable representation; state reconstructed from conversation | ChatDev, MetaGPT, FlowGen, CodePori |
| **Repository-based** | File system with dependency graphs, version history | MAGIS, HyperAgent, Lingma SWE-GPT |
| **Execution-based** | State represented through code *behavior* — compiles, tests, profiles | AgentCoder, AutoSafeCoder, QualityFlow, MAGE |
| **Blackboard/Shared-state** | Explicit, globally accessible data structure | L2MAC, Self-Collaboration, Cogito, GameGPT |

> [!warning] The Central Gap
> The majority of surveyed systems operate at the implicit/file-only level, lacking any formal model of the shared harness substrate. Code is uniquely executable among multi-agent domains — it produces objective, non-linguistic signals — yet most systems fail to exploit this at the architectural level. The implicit-harness-state constraint is, per the survey, "the technical root of system brittleness rather than a scalability convenience."

## Convergence Patterns (§4.3.2)

Convergence determines when to stop iterating. Code-centric MAS have distinctive advantages because execution provides objective signals:

- **Correctness (test-gated)**: All tests pass — AgentCoder, L2MAC, SyncMind, CANDOR
- **Security**: No CWE vulnerabilities and no fuzzer crashes — AutoSafeCoder
- **Performance**: Runtime/memory thresholds met — MACRO
- **Score-based**: Quantitative quality scores — MAGE (simulation mismatch), CodeCoR (four-criteria binary), Trae Agent (search-and-selection)
- **Consensus**: Multi-reviewer aggregation — CANDOR (majority voting), MAGIS (LLM judgment)
- **Implicit**: Fixed iteration budget — ChatDev, MetaGPT, Self-Collaboration (most prevalent, also the most significant gap)

## Key Patterns and Trends (§4.4)

1. **Implicit-harness-state constraint**: Most systems lack explicit shared state, relying on agents to reconstruct state from conversation history. This is the root of system brittleness.
2. **Code ≠ automatic coordination**: Files, diffs, tests, and logs are all partial channels. Each trades off fidelity, latency, and scope. The design question is which artifacts are authoritative and how conflicts are resolved.
3. **Execution feedback bridges linguistic and formal reasoning**: Execution provides objective, non-hallucinatable signals. But LLM-simulated execution achieves 98%+ precision on some tasks — suggesting a fast-path/slow-path hybrid.
4. **Topology complexity inversely correlates with harness-state formality**: Systems with formal shared substrates use simpler topologies. Systems without formal state develop elaborate adaptive topologies as a structural workaround.
5. **Context management is the tax of implicit state**: Sophisticated context mechanisms (Control Units, publish-subscribe, agent-pool scaling, three-tier memory) are responses to the same problem: agents need coherent views of code that's too large for one context window.
6. **Agent specialization increases the criticality of shared state**: As more roles are added, shared substrate becomes urgent — without it, agents operate from outdated snapshots and verification misfires.

## Thread

- [[code-as-agent-harness]] — Multi-agent orchestration is the third layer of the code-as-harness framework
- [[the-agent-workflow]] — Multi-agent patterns (orchestration, focus maxing, parallel agents) operationalize the scaling of the workflow
- [[agent-quality-engineering]] — The convergence patterns (test-gated, security, consensus) are quality mechanisms for multi-agent systems

## Related

- [[harness-mechanisms]] — Orchestration-based planning (§3.1.4) is the single-agent foundation that multi-agent orchestration extends; multi-agent memory (§3.2.5) extends the memory taxonomy
- [[harness-engineering]] — Transactional shared program state (§5.2.4) is the open problem at the frontier of multi-agent coordination
- [[backpressure]] — Multi-agent shared state as semantic backpressure: conflicting assumptions are mechanically detected and rejected
- [[model-routing]] — Orchestration-based planning routes subtasks to optimal agents, an extension of model routing
- [[ralph-loop]] — Linear decomposition planning scales to multi-agent via orchestration-based topologies
- [[plan-vs-review]] — Agent role delegation (planner, reviewer, coder) operationalizes the plan-vs-review tradeoff at the multi-agent level

## Sources

- `raw/2605.18747.pdf` — Ning, Tieu, Fu et al. (2026). *Code as Agent Harness.* §4: Scaling the Harness — Multi-Agent Orchestration over Code (pages 34–48).
