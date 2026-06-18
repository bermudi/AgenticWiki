---
title: Evolving Context
created: 2026-05-02
updated: 2026-06-18
sources:
  - raw/yt-chroma-context-engineering-episode-3-lance-martin-langchain.md
  - raw/yt-what-ai-agent-skills-are-and-how-they-work.md
  - raw/self-harness-harnesses-that-improve-themselves.txt
  - raw/recursive-agent-harnesses.txt
  - raw/2606.16707v1.txt
  - raw/memrefine-llm-guided-compression-for-long-term-agent-memory.pdf
tags: [concept, context-engineering, agents, memory, continual-learning, self-evolution, harness-recursion, executable-memory, memory-compression]
unaudited_marginal: 0
---

# Evolving Context

> Continual learning in token space — the practice of agents progressively refining their own context (prompts, skills, memories, preferences) based on experience, without retraining model weights. An emerging frontier that is currently "super hacky" but represents one of the most important unsolved problems in agent engineering.

## What It Is

Evolving context is the idea that an agent's external context — its system prompt, skills, memories, and preferences — should improve over time based on what the agent encounters and does. This is distinct from updating model weights (traditional continual learning). Instead, the learning lives in natural language files on disk, human-readable and human-editable.

The driver: without evolving context, agents are brittle across tasks and sessions. Every session starts from scratch. Preferences learned in one session don't carry to the next. Standard operating procedures discovered during one task aren't available for similar tasks later.

## Three Categories

[[lance-martin|Lance Martin]] identifies three emerging threads:

### 1. Task-specific prompt evolution
Agents reflect over their own trajectories (what they did, what worked, what didn't), then propose improvements to the prompt for that specific task. A paper Lance references as "Jeepa" from Omar (DSPy) formalizes this: agents generate trajectories, those trajectories are scored against evaluation criteria, and the system iteratively refines task prompts. Key insight: prompts are population-based — multiple variants compete, and the best survive.

### 2. Memory and preference learning
Agents accumulate memories and preferences across sessions — things like coding style conventions, PR review preferences, and other durable patterns. Martin's **Claude Diary** is a crude but functional example: after each session, a plugin summarizes key decisions and preferences into a diary entry file. A reflection loop periodically reads all diary entries and proposes updates to CLAUDE.md (the agent's system prompt). The human can review and edit the proposed updates — a key advantage of token-space learning over weight-space.

### 3. Skill learning
When an agent discovers a reusable standard operating procedure — a sequence of steps that solves a recurring problem — it should capture that as a skill file. This is the practical mechanism for agents to accumulate [[procedural-knowledge|procedural knowledge]]. The **Let paper** describes this: reflect over agent trajectories, identify patterns that look like SOPs, save them as skills to the file system. The skill is then available for future tasks via progressive disclosure.

## The Classifier Heuristic

The host (Dex Horthy) articulates a useful rule of thumb for predicting which context management tasks will be absorbed into models vs. remain external (Martin agrees and elaborates):

| Can you build a classifier? | → | Absorbed into model (RLM) |
|---|---|---|
| Verifiable, cross-domain task | | Sub-agent delegation, offloading rules, caching decisions |
| User-specific, nuanced, subjective | | Which memories to keep, which preferences are durable, when to retrieve what |

The intuition: if the task can be framed as "given X, should I do Y?" with a ground-truth answer, it's an RL-able classification problem. Model labs will RL it, and it'll show up in the next generation. If the answer depends on personal taste, context, and time-varying preferences, it stays external — though the *mechanics* of storage and retrieval can still be model-learned. Martin extends this by noting that sub-agent delegation, offloading rules, and caching decisions fall into the learnable bucket, while which memories to keep and which preferences are durable fall into the personal/contextual bucket.

## RLM: Recursive Language Models

Currently, all context management is hand-tuned: "offload tool results after N turns," "spawn sub-agents for these types of tasks," "save this to memory if it matches these criteria." These are heuristics prompted by the agent designer.

**RLM** (from Omar, Alex, and others now at MIT; also Prime Intellect with Will Brown) proposes training models to manage their own context. The model learns:
- When to offload context
- When to spawn a sub-agent
- How to manage memory — what to save, when to retrieve

The advantage: learned context management replaces brittle, hand-tuned heuristics with adaptive behavior trained on outcomes. The model can optimize for cache hit rate, task success, or cost — whatever the training objective encodes.

> [!warning] Open Question
> RLM can learn *mechanics* (how to save, how to retrieve) but may still need user-supplied *preferences* for what matters. Memory management especially — the classifier heuristic suggests some decisions are inherently personal and won't be fully absorbed into model weights.

## Why Token Space?

Martin argues token-space learning has several advantages over weight-space (LoRA, fine-tuning):

1. **Human legibility**: You can read the evolved prompt, skill, or memory. You can edit it if the agent got it wrong.
2. **Hackability**: Anyone can write a reflection loop with custom prompts. No GPU cluster required.
3. **Editability**: If an automated reflection loop saves a bad rule, the human can just delete it. Weight updates are opaque and hard to surgically correct.
4. **Fast iteration**: Changing a markdown file takes seconds. Retraining takes hours or days.

The tradeoff: token-space learning is crude. Current implementations are "custom man" — bespoke prompts for reflection, manual rules for what to save. But the barrier to entry is near zero.

## Two Extensions to Evolving Context

Two recent papers extend evolving context beyond prompts, memories, and skills into the harness substrate itself. They are not contradictory; they target different layers of the agent's operating context.

### 4. Harness Self-Evolution ([[self-harness]])
The [[self-harness]] paper (Zhang et al., Shanghai AI Lab, 2026) extends evolving context to the **harness surface** — the system prompt, tools, runtime policies, verification rules that mediate the agent's behavior. The same fixed model proposes bounded edits to its own harness based on verifier-grounded failure signatures; edits are regression-tested on a held-out split the proposer never sees, and only promoted if they improve at least one split without degrading the other. This is **in-place evolution**: the harness's identity persists, but the executable protocol through which the model observes tasks, takes actions, and checks artifacts is rewritten iteratively.

Compared to the three Lance Martin categories, harness self-evolution is *more constrained* in some ways (edits must target a specific mechanism, modify only the relevant surface, and not rewrite the control architecture) and *more powerful* in others (the editable surface includes tools, runtime policies, and verification rules — not just prompts, memories, and skills). Empirically, it produces held-out gains of 14.2–21.4 pp absolute on Terminal-Bench-2.0 across three diverse base models. The central design property is the conservative acceptance rule: the system can reject a promising edit if it would regress on a held-out task. This is a learned "what to keep" property, but enforced at the harness level rather than the prompt level.

### 5. Harness Recursive Instantiation ([[recursive-agent-harness]])
A different direction. The [[recursive-agent-harness]] paper (Lumer et al., PwC, 2026) doesn't evolve the harness at all — it spawns fresh harness instances per sub-task and aggregates their results. The parent agent writes executable code that instantiates subagent harnesses and runs them in parallel via `asyncio.gather`. This is **evolution by instantiation**: rather than improving one harness over time, the system spawns many harnesses per task and aggregates their output.

This pattern complements evolving context rather than extending it. The harness is treated as a reusable execution unit, not a tunable artifact. The system is a *factory* of harness instances, each with its own context window, filesystem, and tool access. On Oolong-Synthetic, holding the backbone fixed at GPT-5, this pattern improves the Codex coding-agent baseline from 71.75% to 81.36% — the gain is attributable to harness architecture, not the model.

### How the Two Extensions Differ

| Dimension | Harness Self-Evolution ([[self-harness]]) | Harness Recursive Instantiation ([[recursive-agent-harness]]) |
|---|---|---|
| Object evolved | The single harness's editable surfaces | The set of harness instances spawned per task |
| Mechanism | Bounded edits, regression-tested, conservative acceptance | Code-driven parallel spawning, deterministic aggregation |
| Identity | Same harness, modified iteratively | Many fresh harnesses, aggregated at the parent level |
| Token-space legibility | High — every edit is a logged, auditable change | Lower — the harness is unchanged, but the orchestration script is the artifact |
| Cost structure | Many evaluation runs to test candidate edits | Many subagent invocations per task |
| Empirical claim | Held-out gains of 14.2–21.4 pp on Terminal-Bench-2.0 | Held-out gains of 9.6 pp on Oolong-Synthetic (71.75% → 81.36%) |
| Failure mode | Stochastic promotion of edits that regress | Parent decides not to recurse, collapses to single coding agent |

Both approaches are **empirically grounded**: gains attributable to the harness, not the model. Both rely on trustworthy verification (held-out regression tests, programmatic answer extraction). Both are model-agnostic in principle but empirically demonstrated on a small set of base models. The open question is whether they compose: a self-evolving harness whose spawned subagents are also self-evolving.

### 6. Schema Evolution via the User Model ([[executable-memory]])

A third direction: the LLM **writes its own data structures**, not just its prompts and skills. The [[executable-memory|User as Code]] paper (Bojie Li, Pine AI, 2026) extends evolving context to the schema layer. The dataclasses, domain partitioning, and constraints are all produced by the LLM at structuring time and **regenerated from the full fact corpus** as the user's life changes. The representation is flexible and self-evolving rather than fixed.

This is a strict extension of the Lance Martin categories:

| Lance Martin category | What evolves | UaC equivalent |
|---|---|---|
| Task-specific prompt evolution | The system prompt for a specific task | Schema regeneration — the data model is rewritten as facts accumulate |
| Memory and preference learning | Memories, preferences, durable patterns | Typed user state — facts become typed dataclass instances |
| Skill learning | Reusable standard operating procedures | Constraint generation — ad-hoc checks get promoted to persistent constraints |
| (new) Schema evolution | The data model itself | The dataclasses, domain partitioning, and types are LLM-generated |

The bitter-lesson framing: instead of encoding a fixed ontology, UaC leans on the single capability current LLMs are strongest at — code generation — and lets the model design the data structures that fit each user. The absence of a human-designed schema is a feature, not a pitfall: the only human contribution is the scaffolding, not the structure of the memory itself.

The legibility property holds: every schema regeneration is auditable as a diff in `domains/<x>/state.py`. A user can read what's stored about them, audit what's been added, and roll back changes. Compared to the other extensions, schema evolution is **more powerful** (the editable surface includes the entire data model — types, fields, domain boundaries) and **more dangerous** (a bad regeneration could drop facts — the audit found 0.18% drop rate, concentrated on the longest inputs).

The token-space advantage is sharpest here: the user model is a directory of human-readable Python files. A future session can read every line. Compare to opaque vector stores or knowledge graphs, where the user has no way to know what the agent "remembers" about them. This is the [[comprehension-debt]] counter-move at the schema layer: don't let the user model become unreadable.

### 7. Store-Level Compression via [[memrefine]]

A seventh axis: the agent's **memory store itself** is the evolving object. The [[memrefine]] paper (Kim et al., Korea U / KAIST / DeepAuto.ai, June 2026) extends evolving context to a new substrate: the append-only log is the storage, the compressed store is the materialized view, and the pairwise LLM judge is the regenerator. The framework solves a [[storage-budgeted-memory|query-agnostic max-min program]] — keep the store within a fixed size budget while preserving information useful for any plausible future query — and is framework-agnostic: it works on A-MEM-style graph memory and Mem0's ingested-entry store without modifying the host pipeline.

Where the other extensions target *what gets written* (prompts, skills, harness surfaces, user schemas), MemRefine targets *what stays in the store* when it has outgrown a budget. The redundancy/complementarity/distinctness taxonomy is the memory-level analog of the structural pattern: just as UaC separates append-only storage from typed representation, MemRefine separates the cost-agnostic semantic of "what should remain" (the LLM judge's verdict) from the cost-agnostic semantic of "what should be proposed" (similarity ranking). The LLM judge decides on factual content; similarity only proposes candidates.

The empirical claim: the LLM judge is roughly tied with rule-based heuristics at loose budgets (where most decisions are obvious near-duplicates) and decisively outperforms them at tight budgets (where the hard cases are semantically related memories whose factual relationship must be interpreted). This is the [[jagged-frontier]] prediction confirmed at the memory layer: factual reasoning is a regime where simple heuristics fail and LLM judgment is necessary.

The relationship to the other extensions:

| Extension | Object evolved | What triggers a regeneration |
|---|---|---|
| Task-specific prompt evolution | The system prompt for a specific task | Reflected trajectory evaluation |
| Memory and preference learning | Memories, preferences, durable patterns | Session diary + reflection loop |
| Skill learning | Reusable SOPs as skill files | Successful trajectory pattern mining |
| Harness self-evolution ([[self-harness]]) | The single harness's editable surfaces | Verifier-grounded weakness mining + held-out regression test |
| Harness recursive instantiation ([[recursive-agent-harness]]) | The set of harness instances spawned per task | Parent writes a script that spawns fresh subagent harnesses |
| Schema evolution ([[executable-memory]]) | The user model's data structures | Periodic regeneration from full fact corpus |
| Store compression ([[memrefine]]) | The set of entries in the memory store | Storage budget exceeded |

All seven share the **decoupling of storage and representation**: the append-only log is the storage, the structured view is regenerated from it. The regenerated view is auditable as a diff. The regenerator is constrained (bounded edits, regression tests, factual judgment) rather than free.

## Thread

- [[the-agent-workflow]] — Evolving context closes the loop between agent sessions, making the workflow improve with use
- [[harness-engineering]] — Self-Harness is the "self-evolving harnesses" extension of evolving context applied to the harness surface; the §5.2.3 open problem

## Related

- [[context-engineering]] — Evolving context is context engineering applied over time: curating the agent's persistent context, not just its per-session context
- [[context-files]] — Context files are evolving context at the repository level: maintained, updated AGENTS.md reflects the evolving context principle; stale context files become doc rot
- [[agent-skills]] — Skill learning is a category of evolving context; the skill.md format is the practical mechanism for agents to capture and reuse procedural knowledge
- [[multi-tier-action-space]] — Skills and memories live on the file system; the computer tier hosts evolving context
- [[lance-martin]] — Claude Diary, skill learning experiments, and the three-category breakdown
- [[dex-horthy]] — His snapshot-based eval approach and model intuition philosophy are complementary: evals measure whether evolution is helping
- [[ralph-loop]] — The plan file is a primitive form of evolving context — it's modified by each iteration and read by the next
- [[chris-parsons]] — Worker loop skills evolved via post-session reflection; skill learning as evolving context in practice
- [[steering-docs]] — The canonical Kiro example of evolving context: agents write operational learnings (CDK flags, code style) back into steering, which is surfaced in the system prompt at every turn
- [[procedural-knowledge]] — Capturing procedural knowledge from experience is a form of evolving context
- [[babysitter-agent]] — The babysitter's handoff prompts are a form of evolving context — what survives across sessions
- [[self-harness]] — Extends evolving context to the harness surface: bounded edits, regression-tested, conservative acceptance
- [[recursive-agent-harness]] — A different axis: harness instances spawned per task via code-driven parallel orchestration, not evolving one harness
- [[harness-mechanisms]] — Self-evolution and recursive instantiation are the two harness-level optimization mechanisms
- [[executable-memory]] — Extends evolving context to the schema layer: the LLM writes its own dataclasses, domain partitioning, and constraints, regenerating the user model from the full fact corpus
- [[memrefine]] — Extends evolving context to the store layer: the LLM judge decides what stays in the memory store when it has outgrown a fixed size budget
- [[comprehension-debt]] — Schema evolution is a counter-move at the schema layer: the user model stays readable as Python files, not opaque vector stores
- [[bojie-li]] — Author of User as Code, the implementation of schema-level evolving context

## Sources

- `raw/yt-chroma-context-engineering-episode-3-lance-martin-langchain.md` — Full interview detailing the three categories of evolving context, RLM, the classifier heuristic, and the token-space vs. weight-space tradeoff
- `raw/yt-what-ai-agent-skills-are-and-how-they-work.md` — IBM Technology video on the skill.md open standard, validating and extending the skill learning category of evolving context
- `raw/self-harness-harnesses-that-improve-themselves.txt` — Zhang et al. (Shanghai AI Lab, 2026). Extends evolving context to the harness surface itself. Propose-evaluate-accept loop with verifier-grounded weakness mining, bounded proposals, and conservative acceptance on held-out regression tests. Held-out gains of 14.2–21.4 pp on Terminal-Bench-2.0.
- `raw/recursive-agent-harnesses.txt` — Lumer et al. (PwC, 2026). A different axis: harness as a recursive unit. Parent writes executable code that spawns fresh subagent harnesses in parallel. Held-out gain of 9.6 pp on Oolong-Synthetic (71.75% → 81.36%) with backbone held fixed.
- `raw/2606.16707v1.txt` — Bojie Li (Pine AI, 2026). *User as Code: Executable Memory for Personalized Agents.* Evolving context at the schema layer. The LLM writes its own dataclasses, domain partitioning, and constraints; the structured state is regenerated from the full fact corpus. Bitter-lesson framing: no human-designed schema, only human-designed scaffolding. Schema evolution is a strict extension of the three Lance Martin categories — a new fourth category where the *data model itself* evolves.
- `raw/memrefine-llm-guided-compression-for-long-term-agent-memory.pdf` — Kim (Korea U), Baek, Jeong, Hwang (KAIST; Hwang also DeepAuto.ai), June 2026. *MemRefine: LLM-Guided Compression for Long-Term Agent Memory.* A seventh axis: evolving context at the **store level**. The pairwise LLM judge decides what stays in the memory store when it has outgrown a fixed size budget. The redundancy/complementarity/distinctness taxonomy is the action space; similarity is the proposal mechanism; factual judgment is the decision mechanism. LLM judge decisively outperforms fixed rule-based baselines (RuleSim, RulePR) as the budget tightens. Framework-agnostic: A-MEM graph memory and Mem0.
