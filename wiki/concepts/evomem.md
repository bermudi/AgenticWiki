---
title: EvoMem
created: 2026-06-18
updated: 2026-06-18
sources:
  - raw/evoarena-tracking-memory-evolution-for-robust-llm-agents-in-dynamic-environments.md
tags: [concept, agent-memory, memory-evolution, version-aware-memory, harness-mechanism, patch-history, code-as-agent-harness]
unaudited_marginal: 0
---

# EvoMem

> A patch-based memory paradigm that augments a base memory system with an append-only patch history. Each non-additive update is recorded as a structured patch — pre-update content, post-update content, rationale, semantic summary, and triggering evidence — turning memory from a single mutable store into a versioned evolution trace. At inference time, the agent retrieves from the latest memory by default and selectively pulls relevant patches when the query depends on overwritten states, temporal changes, or version-specific behavior.

## Origin

**EvoArena paper** — Xu, Li, Wu et al. (NUS + SMU + UW + UCL + UPenn + NTU + Recursive + MIT, arXiv 2606.13681, June 2026). Project page: aiden0526.github.io/EvoArena. Code: github.com/Aiden0526/EvoArena. Dataset: huggingface.co/collections/Aiden0526/evoarena.

Introduced alongside [[evoarena]], which it improves by an average of +2.6% step accuracy and +3.7% chain accuracy across eight base models. The paradigm is **memory-system-agnostic**: instantiated over A-Mem (graph memory), Memento-Skill (skill file), Terminus2 (terminal trajectories), and OpenHands (software-engineering context) with the same patch schema.

## The Patch

For each non-additive memory update — one that revises, overwrites, or reinterprets existing memory — EvoMem materializes a structured patch:

> πₜ = ⟨τₜ, Cₜ⁻, Cₜ⁺, rₜ, zₜ, eₜ⟩

Where:

| Field | Meaning |
|---|---|
| τₜ | Temporal metadata: turn, session, or timestamp |
| Cₜ⁻ | Affected memory content **before** the update |
| Cₜ⁺ | Affected memory content **after** the update |
| rₜ | Update rationale: why the change happened |
| zₜ | Concise semantic summary of the change |
| eₜ | Supporting evidence: the triggering interaction, task context, execution feedback, or environment snapshot |

Purely additive updates (new notes appended without modifying existing memory) **do not** trigger a patch — the latest memory state already preserves them. The trigger condition is non-additive: rewrite, overwrite, or reinterpretation of an existing memory entry.

The patch history is stored separately from the latest memory, append-only, and indexed for retrieval. It is the **evolution trace** — every meaningful change to the agent's memory is logged with full before/after context.

## The Two Components

### 1. Patch Recording (write-time)

EvoMem is non-invasive. It does not replace the base memory updater; it monitors the transition Mₜ₋₁ → Mₜ and computes Δₜ = Diff(Mₜ₋₁, Mₜ). When Δₜ is non-additive, EvoMem writes a patch to the append-only history. The base memory updater runs unchanged; the patch layer is an annotation, not a modification of the construction path.

### 2. Patch-Augmented Retrieval (read-time)

Given a query q, EvoMem concatenates two retrieval streams:

> c(q) = Concat(c_mem, P_q)

- **c_mem** = the standard retrieval from the latest memory M_T (whatever the base retriever produces).
- **P_q** = top-k patches retrieved from the patch history, scored for relevance to q.

In ordinary cases the latest memory suffices. When the query depends on temporal changes, overwritten information, or update rationales, the retrieved patches supply versioned evidence that the consolidated memory state has lost.

This is the **version-aware reasoning primitive**: the agent can answer "what was the previous rule, and when does it still apply?" without a separate query to the patch history — patches are automatically surfaced when the retriever judges them relevant.

## Instantiation Across Four Memory Systems

EvoMem's value is that it composes with existing memory harnesses rather than replacing them. The paper instantiates it across four heterogeneous bases:

| Base memory | M_T representation | What counts as non-additive | Where patches live |
|---|---|---|---|
| **A-Mem** (graph memory) | Notes V_t with attributes + links E_t | Note content/metadata rewrites; edge rewires (link_rewrite_update, overwrite_update) | Separate patch retriever (BM25 over patch documents, embedded with all-MiniLM-L6-v2) |
| **Memento-Skill** (skill file) | TIP.md as global skill memory | TIP.md revisions — task-specific tip updates with triggering failure | Versioned tip family F_T; children inherit parent lineage |
| **Terminus2** (terminal agent) | Distilled task-solving knowledge from prior terminal trajectories | Strategy changes from evolving terminal environments (dependencies, interfaces, paths, validation rules) | Chain-scoped terminal memory; transition-patch schema |
| **OpenHands** (SWE agent) | Distilled software-engineering context (files, symbols, constraints, execution outcomes) | Superseded implementation strategies; revised logic; observed cause of change | Feature-level patch records; semantic-structural retrieval score |

Across all four, EvoMem follows the same principle: **monitor the base memory's non-additive updates, preserve the meaningful transitions as patches, retrieve them when version-specific reasoning is required**. The instantiation specifies three things per base — the memory state M_T, the non-additive triggers, and the retrieval function over patches.

## Empirical Results

### On EvoArena (evolving environments)

| Subset | Step accuracy (base → +EvoMem) | Chain accuracy (base → +EvoMem) |
|---|---|---|
| Terminal-Bench-Evo | 43.6% → 46.0% (+2.4%) | 21.5% → 27.6% (+6.1%) |
| SWE-Chain-Evo | 27.9% → 28.3% (+0.4%) | 10.0% → 12.1% (+2.1%) |
| PersonaMem-Evo | 47.3% → 49.0% (+1.7%) | 40.0% → 43.2% (+3.2%) |

**The chain-level gain is consistently larger than the step-level gain.** EvoMem helps most when success requires consistent behavior across dependent task sequences. Average across EvoArena: +2.6% step / +3.7% chain.

### On standard benchmarks

| Benchmark | Agent | Base | +EvoMem | Δ |
|---|---|---|---|---|
| GAIA | Memento-Skill | 65.8% | 72.3% | **+6.5%** |
| LoCoMo | A-Mem | 39.7% | 43.0% | **+3.3%** |

EvoMem helps on static benchmarks too — it is not just a recovery mechanism for evolving environments. The likely reason: real conversation and tool-use trajectories do contain version-dependent updates even when no formal "environment evolution" is present.

### Mechanism: where EvoMem actually helps

The paper stratifies gains by whether the agent **operationalizes** the retrieved patch (uses terms from the patch in subsequent reasoning or commands):

| Condition | Baseline | +EvoMem | Δ | Gain gap |
|---|---|---|---|---|
| No patch example retrieved | 46.6% | 49.7% | +3.1% | — |
| Patch example retrieved | 87.1% | 93.5% | +6.5% | **+3.4%** |
| No patch uptake in reasoning | 46.8% | 49.4% | +2.6% | — |
| Patch uptake > 0 | 80.6% | 88.9% | +8.3% | **+5.7%** |

EvoMem is not "more context." It helps specifically when the agent carries retrieved transition information into its reasoning or commands — the reusable part of the old strategy is preserved while the part invalidated by evolution is revised.

### Where EvoMem fails to help

EvoMem's gains are **not uniform**. On PersonaMem-Evo, conflict resolution and single-pattern transfer both **decrease** slightly (–0.9pp, –1.8pp) — categories that require more than evidence recovery (priority arbitration, counter-stereotypical transfer). On SWE-Chain-Evo, Gemini-3.1-Pro and Kimi-K2.6 step accuracy drop (–2.4%, –2.6%) even as chain accuracy rises — patches can introduce noise when the agent treats them as overriding the latest memory instead of supplementing it. The mechanism is genuine but bounded.

## Design Implications

### Memory as evolution trace, not single state

The conventional design pattern (RAG over a single latest-memory store) is a useful default but erases the evidence of how memory came to be. EvoMem's claim: in any environment where the same setting evolves across versions, the agent needs to know **what was valid before, when it was valid, and why it was revised**. The patch history is that evidence. Without it, the latest memory state is a snapshot with no provenance.

### The "before/after" pair as the atomic unit

A patch is not just "this fact changed" — it is the tuple ⟨before-state, after-state, rationale, evidence⟩. The before-state is what makes the patch useful: it preserves a version that may still be valid for older deployments, other organizations, or future rollbacks. The after-state is what makes the patch testable: the agent can see what the new rule is. The rationale is what makes the patch reviewable: a human can audit why the change happened. The evidence is what makes the patch falsifiable: the agent can re-derive the change from the trace if needed.

### Non-additive is the trigger

The choice to patch **only** non-additive updates is principled. Additive updates (new notes) are already preserved in the latest memory state — adding patches for them would inflate the history without adding signal. The non-additive filter is what keeps the patch history from becoming a duplicate of the latest memory.

## Relationship to Existing Wiki Concepts

- [[state-collapse]] — EvoMem is the proposed remedy. Where state collapse is the failure mode (single latest state erases valid prior versions), EvoMem is the design pattern that prevents it (append-only patch history retains the evolution).
- [[executable-memory]] — Both address long-term memory for personalized agents, but at different layers. Executable memory structures the **current user model** as typed Python; EvoMem structures the **evolution history of any memory** as versioned patches. They are complementary, not competing: an executable-memory agent could use EvoMem to track how its typed Python state evolved across structuring regenerations.
- [[evolving-context]] — EvoMem is a specific implementation of evolving context at the **memory-evolution layer**: the agent's memory updates are the evolving object, and the patch history is the regenerated view. Sits alongside [[memrefine]] (store-level compression), [[self-harness]] (harness-surface evolution), [[executable-memory]] (schema evolution), and [[recursive-agent-harness]] (harness instantiation).
- [[memrefine]] — Complements EvoMem along a different axis. MemRefine shrinks an already-constructed store to fit a budget (a compression primitive). EvoMem preserves the evolution history of a growing store (a provenance primitive). An agent could use both: MemRefine for size control, EvoMem for change provenance. The combined regime — bounded, versioned memory — is unexplored by either paper alone.
- [[code-as-agent-harness]] — The patch is itself a code artifact: a structured record with typed fields (timestamp, before, after, rationale, evidence) that the agent inspects, indexes, and retrieves. The patch layer is a concrete instance of "code as the substrate for tracking harness state" applied to memory.
- [[harness-mechanisms]] — EvoMem is a memory mechanism that fits into §3.2 of the harness-mechanisms taxonomy: it operates on top of an existing memory system to add version-aware retrieval. The instantiations across four base systems (A-Mem, Memento-Skill, Terminus2, OpenHands) demonstrate that the mechanism is **base-memory-agnostic** — it does not require modifying the construction pipeline.
- [[verifiability]] — The patch is a verifiable artifact: the before-state, after-state, and evidence can be re-derived from the trace. An agent (or a human auditor) can verify that a memory update was justified by replaying the patch against the recorded evidence.
- [[jagged-frontier]] — The non-uniform gains across question types are a jagged-frontier pattern at the memory layer. EvoMem decisively helps when reasoning requires **temporal or dispersed evidence** (temporal trajectory +5.2%, multi-pattern synthesis +5.2%, regression avoidance). It does not help and can slightly hurt when reasoning requires **inferential operations beyond evidence retrieval** (conflict arbitration, counter-stereotypical transfer).
- [[benchmark-contamination]] — EvoMem is immune to one form of contamination: even if the latest memory has been polluted by overwrites, the patch history preserves the prior state and rationale. A contaminated memory state is still recoverable from the evolution trace.
- [[document-degradation]] — The append-only patch history is a defense against silent memory corruption. If an agent's memory has been silently degraded across long sessions, the patch log exposes every change that was made and lets the agent or human audit the regression.
- [[proactive-service]] — Patch history can surface stale prior rules that still apply to old versions, similar to how a constraint runner surfaces relevant alerts. The patch log is a richer substrate for proactive service than a single memory state.

## Thread

- [[the-benchmark-crisis]] — EvoArena exposes a new axis of benchmark failure (environment evolution), complementing contamination, verifier failure, and prompt distortion with persistent evolution (PE), implicit change (IC), and chain evaluation (CE)
- [[the-agent-workflow]] — Patch-augmented retrieval is a concrete memory mechanism for the workflow's long-horizon execution

## Related

- [[evoarena]] — The benchmark EvoMem improves
- [[state-collapse]] — The failure mode EvoMem is designed to prevent
- [[chain-accuracy]] — The evaluation metric where EvoMem's gains are largest
- [[executable-memory]] — A complementary structured-memory paradigm
- [[evolving-context]] — EvoMem as a memory-evolution-layer extension of evolving context
- [[memrefine]] — A complementary compression primitive for bounded memory
- [[code-as-agent-harness]] — Patches as code artifacts for harness state
- [[harness-mechanisms]] — Patch-augmented retrieval as a memory mechanism
- [[verifiability]] — Patches as verifiable memory-evolution artifacts
- [[jagged-frontier]] — Where EvoMem helps vs. doesn't help is jagged across question type
- [[document-degradation]] — Append-only history as defense against silent corruption
- [[proactive-service]] — Patch history as substrate for surfacing version-specific rules
- [[jundong-xu]] — Lead author of the EvoArena paper

## Sources

- `raw/evoarena-tracking-memory-evolution-for-robust-llm-agents-in-dynamic-environments.md` — Xu et al. (NUS + collaborators, arXiv 2606.13681, June 2026). *EvoArena: Tracking Memory Evolution for Robust LLM Agents in Dynamic Environments.* The full paper: EvoArena benchmark (Terminal-Bench-Evo, SWE-Chain-Evo, PersonaMem-Evo), EvoMem paradigm (patch schema, recording algorithm, retrieval algorithm), four-agent instantiation (A-Mem, Memento-Skill, Terminus2, OpenHands), main results across 8 backbones × 3 subsets × 5 benchmarks, mechanism analysis (operationalization stratification), efficiency analysis, regression analysis on SWE-Chain-Evo.