---
title: Harness Mechanisms
created: 2026-05-21
updated: 2026-07-04
sources:
  - raw/2605.18747.md
  - raw/2606.09498.md
  - raw/2606.13643.md
  - raw/2606.16707v1.md
  - raw/2606.13177.md
  - raw/2606.13681.md
  - raw/2606.14249.md
tags: [concept, agent-harness, planning, memory, tool-use, control, optimization, self-evolution, harness-recursion, executable-memory, memory-compression, harness-co-evolution]
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

### Post-Construction Memory Compression ([[memrefine]])
The memory taxonomy above covers **construction** — how new information enters the store and is organized for retrieval. The inverse problem — **shrinking an already constructed store under a fixed storage budget** while preserving information useful for future interactions — was largely unaddressed in the survey literature. The [[memrefine]] paper (Kim et al., Korea U / KAIST / DeepAuto.ai, June 2026) formalizes this as [[storage-budgeted-memory|storage-budgeted memory management]]: a query-agnostic max-min program that the compressor solves by iterating a pairwise [[llm-guided-compression|LLM judge]] over the store. The judge decides whether each pair of similar entries is redundant (DELETE), complementary (MERGE), or distinct (PRESERVE), iterating until the store meets the target budget or all sufficiently similar pairs have been judged preserve.

Empirically, MemRefine preserves downstream utility across moderate compression (70–50% of base size) and degrades gracefully under tight budgets (30% of base size), with LLM-guided judgment decisively outperforming fixed rule-based baselines (similarity threshold, PageRank-style preservation) as the budget tightens. The framework is framework-agnostic — it works on A-MEM-style graph memory (pruning dangling edges on DELETE, inheriting the union of links on MERGE) and Mem0's non-graph entry store (operating directly on entries and embeddings) — and is inserted after memory construction and before retrieval, leaving the host pipeline unchanged.

The contribution to the memory taxonomy: a **compression primitive** that complements the construction primitives above. Where the survey covers working, semantic, experiential, long-term, and multi-agent memory *as the store grows*, MemRefine addresses the regime where the store has outgrown a fixed budget. The two regimes share the same retrieval downstream but are governed by different objectives: construction maximizes recall, compression maximizes the worst-case query utility at a fixed size.

### Context Compaction and State Offloading
Techniques to manage context growth: summarizing completed portions, offloading tool results to the file system, KV caching, progressive disclosure. These are the engineering practices that make long-horizon execution feasible. See [[multi-tier-action-space]] for the architecture.

### Memory Evolution via [[evomem]]
A new memory mechanism: instead of maintaining only the latest consolidated memory, augment the construction pipeline with an **append-only patch history** that records every non-additive memory update. The [[evomem]] paper (Xu et al., NUS + collaborators, June 2026, arXiv 2606.13681) formalizes this as a structured patch per non-additive change:

> πₜ = ⟨τₜ, Cₜ⁻, Cₜ⁺, rₜ, zₜ, eₜ⟩

The patch captures the affected content before and after the update, the rationale, a semantic summary, and the triggering evidence. At inference time, the agent's context is `Concat(c_mem, P_q)` — the latest memory evidence plus the top-k relevant patches. In ordinary cases the latest memory suffices; when the query depends on overwritten states, temporal changes, or version-specific behavior, the patches supply versioned evidence.

The contribution to the memory taxonomy: a **version-aware retrieval primitive** that complements the construction primitives (working, semantic, experiential, long-term, multi-agent memory) and the compression primitive ([[memrefine]]). The three are orthogonal:

- Construction primitives (this section, §3.2) — how new information enters the store and is organized for retrieval.
- Compression primitives ([[memrefine]]) — how the store is shrunk when it has outgrown a fixed budget.
- Evolution primitives ([[evomem]]) — how the store's change history is preserved as retrievable evidence.

EvoMem is **memory-system-agnostic**: the paper instantiates it across A-Mem (graph memory), Memento-Skill (skill file), Terminus2 (terminal trajectories), and OpenHands (software-engineering context) with the same patch schema. The base construction pipeline is unchanged; the patch layer is a non-invasive annotation that monitors non-additive updates.

The empirical claim: EvoMem improves chain accuracy +6.1pp on Terminal-Bench-Evo (largest single gain in the paper), +2.9pp on SWE-Chain-Evo, +3.0pp on PersonaMem-Evo. Mechanism analysis isolates that the gain jumps from +2.6% to +8.3% when the agent operationalizes retrieved patches (uses prior-state terms in reasoning/commands). The mechanism is genuine, not "more context."

The boundary with [[executable-memory]] (also in this section): Executable memory structures the *current* user model as typed Python; EvoMem structures the *evolution history* of any memory as append-only patches. They are complementary primitives — an executable-memory agent could use EvoMem to track how its typed Python state has been regenerated across structuring cycles.

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

> [!note] Update: Self-Harness Empirically Instantiates Governed Mutation
> The [[self-harness]] paper (Zhang et al., Shanghai AI Lab, 2026) is the first concrete instantiation of the survey's "governed harness mutation" principle. Its three-stage loop operationalizes the change contract directly: the **Weakness Mining** stage provides the evidence (verifier-grounded failure signatures clustered by mechanism), the **Harness Proposal** stage generates bounded edits tied to specific mechanisms with audit records (the change contract), and the **Proposal Validation** stage enforces the invariant — an edit is promoted only if it improves at least one split without degrading the other (regression-tested on a held-out split the proposer never sees). Rejected edits are logged but do not change the active harness; this is the rollback semantic. Held-out gains of 14.2–21.4 pp absolute across three base models on Terminal-Bench-2.0 suggest that governed harness mutation, with the right acceptance rule, is a practical path to self-evolution — though bounded, narrow, and dependent on oracle adequacy. See [[harness-engineering]] §5.2.3 for the broader open problem this resolves.

### Recursive Harness Instantiation
A different axis of harness evolution: rather than editing the harness in place, **spawn fresh harness instances** for each sub-task and aggregate their results. The [[recursive-agent-harness]] paper (Lumer et al., PwC, 2026) shows this is a primary performance lever for long-context reasoning: holding the backbone fixed at GPT-5, recursing over full agent harnesses (vs. regex loops) improved Oolong-Synthetic scores from 71.75% to 81.36%. The recursive unit is the full harness, not the model call; code-execution spawning (parent writes a script that instantiates subagents and runs them in parallel via `asyncio.gather`) bypasses the per-turn tool-call budget and scales to thousands of subagents. The pattern is already in production (Anthropic's dynamic workflows) but the controlled evaluation is new. The two strategies are complementary: **in-place evolution** ([[self-harness]]) improves one harness over time; **recursive instantiation** ([[recursive-agent-harness]]) spawns many harnesses per task. See [[multi-agent-code-orchestration]] for the broader topology taxonomy.

### Typed Composition and AEGIS
A fourth axis: rather than editing the harness as an opaque string, **treat the harness as a first-class typed object** whose components can be inserted, replaced, or removed by name without affecting other components. The [[harnessx]] paper (Darwin Agent Team, arXiv 2606.14249v1, 2026) formalizes this with three mechanisms:

- **Processor abstraction** — every per-step behavior is a `Processor` with the protocol `async def process(self, event: Event) -> AsyncIterator[Event]`. A processor consumes one event and yields zero or more, producing exactly one of five outcomes: pass-through, transform, split, intercept, or interrupt. The restricted interface enables compositionality: every processor at a given hook consumes and yields the same event type, so processors compose by sequential application.
- **Eight hook points** with permitted-modification contracts (`task_start`, `step_start`, `before_model`, `after_model`, `before_tool`, `after_tool`, `step_end`, `task_end`). The run loop validates hook contracts after each invocation — a violation raises an exception immediately rather than silently propagating corrupted state. Three class-level metadata fields govern composition: `_singleton_group` (mutual-exclusion class), `_order` (PRE/NORMAL/POST ordering hint), and `_after` (soft dependencies on other singleton groups).
- **Nine-dimension taxonomy** — D1 model selection, D2 context assembly, D3 memory management, D4 tool ecosystem, D5 execution environment, D6 evaluation and reward, D7 control and safety, D8 observability, D9 training bridge. The substitution algebra allows AEGIS to insert, replace, or remove processors without touching other processors — the typed structure makes the *intended scope* of each edit explicit, the precondition for [[variant-isolation]].

The AEGIS four-stage pipeline ([[operational-mirror]]-grounded):
1. **Digester** compresses ~10M raw trace tokens into structured per-task summaries (binary outcome, failure category, implicated components, evidence excerpts); cross-iteration continuity links each task's summary to its prior outcomes and shipped edits
2. **Planner** constructs the adaptation landscape (which tasks fail, which edits attempted, which components implicated, which edit types untried) — the primary defense against under-exploration
3. **Evolver** produces K candidate harnesses via typed builder operations on H_t, each with a change manifest (edited components, intended effect, expected task flips)
4. **Critic + Gate** (mandatory) — Critic assesses non-local effects and may issue one revision request; deterministic gating layer enforces the **seesaw constraint** (no regression on previously-solved tasks) regardless of the Critic's recommendation

The design principle: **"Language-model subagents explore, hypothesize, and propose; typed structure and deterministic gates determine what ships."** This separation ensures safety properties (no regression, no unaudited edits) hold regardless of LLM subagent failure modes. Across 5 benchmarks and 3 model families, 14 of 15 model-benchmark configurations improve (average +14.5%, peak +44.0%) — gains largest where baselines are lowest (inverse scaling).

Three orthogonal extensions to §3.5's existing paradigm:
- **vs. [[self-harness]]** (propose-evaluate-accept): HarnessX adds typed composition (Harness is a first-class object, not an opaque string), an explicit pathology taxonomy with named defenses, and cross-harness grouping — Self-Harness remains the simpler, more model-agnostic option
- **vs. [[recursive-agent-harness]]** (spawn fresh harnesses per task): HarnessX edits one harness over time (in-place evolution); the two strategies are complementary axes, not competitors
- **vs. [[executable-memory|User as Code]]** (user model as typed code): the typed-composition principle generalizes from user state to harness structure — the same "executable, inspectable, stateful" property applied to the agent's runtime interface rather than its user model

### User Memory as a Harness Mechanism
A third axis: the user model itself is a harness mechanism. The [[executable-memory|User as Code]] paper (Bojie Li, Pine AI, 2026) treats the agent's memory of the user as a living software project maintained by a two-phase pipeline:

- **Phase 1 (Memorize)** is a per-session append-only fact extraction — every fact is logged, never overwritten. This is the sandboxed state transition pattern applied to memory: facts enter the system as immutable records.
- **Phase 2 (Structure)** is a periodic regeneration of typed Python from the full fact corpus — the schema and constraints are LLM-generated. This is the database write-ahead log + materialized view pattern, applied to LLM memory.
- **Constraint execution** is deterministic verification over the typed state — the [[verification-loop|verification-driven control]] pattern applied to user data. The interpreter runs constraints at every state change, and the resulting `ACTIVE_ALERTS` are surfaced in the manifest at the start of every conversation.

The decisive finding from the ablation: append-only extraction alone is +19pp on LOCOMO over a code-only baseline, and periodic regeneration is +12.3pp over incremental code rewrites. The two phases must be **separate** — incremental code editing drops facts because each session's code rewrite loses earlier facts. This is a concrete instantiation of the survey's general principle that memory mechanisms must distinguish **storage** from **representation**, with the representation regenerated from storage rather than edited in place.

The boundary with the other memory patterns: [[context-files|AGENTS.md]] is a static, hand-authored context file. [[evolving-context|Learned context]] is a prompt/skill that improves over time. Executable memory is a typed, code-represented user model that the LLM writes itself and the interpreter executes — a strict superset where storage and verification share a medium.

## Relationship to Platform Concepts

- The [[multi-tier-action-space]] pattern maps to the tool use taxonomy (Tier 1 = function-oriented, Tier 2 = environment-interaction)
- The [[ralph-loop]] is a concrete instantiation of linear decomposition planning + verification-driven control
- [[context-engineering]] maps to memory and context compaction techniques
- [[evolving-context]] maps to experiential and long-term memory
- [[agent-skills]] map to grounded skill selection and semantic memory
- [[verification-loop]] maps to harness control through deterministic sensors
- [[backpressure]] is the principle behind sandboxed execution and verified state transitions
- [[self-harness]] — A propose-evaluate-accept loop that edits the harness in place: governed mutation with regression testing
- [[recursive-agent-harness]] — The complementary pattern: spawn fresh harness instances per task rather than editing one in place
- [[executable-memory]] — User memory as a harness mechanism: a two-phase pipeline (append-only memorize + periodic structure) that makes the user model a living software project
- [[evomem]] — Memory evolution as a harness mechanism: an append-only patch history that records every non-additive update and is retrieved alongside the latest memory at query time
- [[harnessx]] — Typed composition + AEGIS four-stage evolution + [[operational-mirror]] pathology taxonomy + [[variant-isolation]] + [[harness-model-co-evolution]]; the most complete in-place evolution architecture
- [[operational-mirror]] — The RL ↔ symbolic-space correspondence that motivates AEGIS's three named defenses (Critic, gate, Planner)
- [[variant-isolation]] — The ensemble routing strategy that resolves the catastrophic-forgetting failure on heterogeneous task sets
- [[harness-model-co-evolution]] — The cross-harness GRPO loop that closes the harness–model optimization cycle (+4.7% over harness-only)

## Thread

- [[code-as-agent-harness]] — Harness mechanisms are the operational middle layer of the code-as-harness framework
- [[the-agent-workflow]] — Planning, memory, and control mechanisms operationalize the HITL/AFK workflow
- [[agent-quality-engineering]] — Harness engineering (deep telemetry, governed mutation) is quality engineering for the harness itself
- [[tool-design-for-agents]] — The tool use paradigm taxonomy provides a systematic framework for tool design
- [[the-verifiability-thesis]] — Verification-driven control and deterministic sensors instantiate the verifiability principle
- [[harness-engineering]] — Self-evolving harnesses (§5.2.3) and recursive harness instantiation are the two paths to harness-level optimization

## Related

- [[harness-interface]] — The interface layer that mechanisms operationalize
- [[harness-engineering]] — Self-evolving harnesses and the open problems in scaling mechanisms
- [[plan-vs-review]] — Planning depth as a design decision within harness planning
- [[model-routing]] — Orchestration-based planning routes sub-tasks to optimal models
- [[agent-observability]] — Deep telemetry as the optimization substrate
- [[ralph-loop]] — Minimal instantiation of planning + control mechanisms
- [[self-harness]] — Concrete instantiation of governed harness mutation with empirical results
- [[recursive-agent-harness]] — Code-driven parallel subagent spawning as a complementary self-optimization pattern
- [[multi-agent-code-orchestration]] — Topology taxonomy; recursive agent harness is the "subagent from a script" pattern

## Sources

- `raw/2605.18747.md` — Ning, Tieu, Fu et al. (2026). *Code as Agent Harness.* §3: Harness Mechanisms — Planning, Memory, Tool Use, Control, and Optimization (pages 16–33). Defines the four-paradigm planning taxonomy, memory taxonomy, four tool use paradigms, the plan-execute-verify control loop, and §3.5 introduces agentic harness engineering with deep telemetry and governed mutation.
- `raw/2606.09498.md` — Zhang et al. (Shanghai AI Lab, 2026). Empirically instantiates §3.5's governed mutation principle with a concrete propose-evaluate-accept loop. Three-stage algorithm: Weakness Mining (verifier-grounded failure signatures), Harness Proposal (same model in proposer role, bounded edits), Proposal Validation (conservative acceptance rule on held-out regression tests). Held-out gains of 14.2–21.4 pp on Terminal-Bench-2.0.
- `raw/2606.13643.md` — Lumer et al. (PwC, 2026). The complementary pattern: recursive harness instantiation. Parent agent writes executable code that spawns full subagent harnesses in parallel; the recursive unit is the harness, not the model call. Oolong-Synthetic gains from 71.75% (Codex) to 81.36% (RAH) with backbone held fixed.
- `raw/2606.16707v1.md` — Bojie Li (Pine AI, 2026). *User as Code: Executable Memory for Personalized Agents.* User memory as a harness mechanism: a two-phase pipeline (append-only memorize + periodic structure) plus constraint execution. Concrete ablation isolates that the two phases must be separate (append-only +19pp on LOCOMO; periodic structure +12.3pp over incremental code). The interpreter is the verification boundary. 78.8% on LOCOMO, 99% on Analytical Inference, 100% on Active Service.
- `raw/2606.13177.md` — Kim (Korea U), Baek, Jeong, Hwang (KAIST; Hwang also DeepAuto.ai), June 2026. *MemRefine: LLM-Guided Compression for Long-Term Agent Memory.* Adds a **post-construction memory compression** primitive to the memory taxonomy. The compressor solves a query-agnostic max-min program by iterating a pairwise LLM judge (DELETE/MERGE/PRESERVE on factual content) over the store. Framework-agnostic: A-MEM graph memory and Mem0. LLM judge decisively outperforms fixed rule-based baselines (RuleSim, RulePR) as the budget tightens. Modest degradation at 30% budget; A-MEM F1 holds to within 3.9pp on standard LoCoMo.
- `raw/2606.13681.md` — Xu et al. (NUS + collaborators, June 2026). *EvoArena.* Adds a **memory evolution primitive** to the memory taxonomy: an append-only patch history recording every non-additive memory update. The patch tuple ⟨τ, C⁻, C⁺, r, z, e⟩ captures before/after content, rationale, summary, and evidence. At query time, retrieved patches are concatenated with the latest memory. Memory-system-agnostic: instantiated over A-Mem, Memento-Skill, Terminus2, OpenHands. Improves chain accuracy +6.1pp on Terminal-Bench-Evo.
- `raw/2606.14249.md` — Chen, Lu, Zhao, Meng, Shao, Luan et al. (Darwin Agent Team, 2026). *HarnessX.* Adds a **typed composition** axis to §3.5: the harness is a first-class object `H = (M, C)` with a processor abstraction (one of five outcomes: pass-through, transform, split, intercept, interrupt), eight hook points with permitted-modification contracts, and a nine-dimension taxonomy (D1 model selection → D9 training bridge). The AEGIS four-stage pipeline (Digester → Planner → Evolver → Critic) implements [[operational-mirror]]-grounded harness evolution with three named defenses (Critic for reward hacking, deterministic gate for forgetting, Planner for under-exploration). Extends [[self-harness]] with typed composition, pathology taxonomy, and [[harness-model-co-evolution|cross-harness GRPO]] for joint harness-model training. +14.5% average / +44.0% peak across 5 benchmarks and 3 model families; 14/15 configurations improve.
