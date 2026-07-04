---
title: Recursive Agent Harness
created: 2026-06-16
updated: 2026-07-04
sources:
  - raw/2606.13643.md
tags: [concept, agent-harness, harness-recursion, multi-agent, code-as-action, long-context]
unaudited_marginal: 0
---

# Recursive Agent Harness

> A pattern in which the **full agent harness** — with filesystem tools, code execution, and planning — rather than a bare model call is the recursive unit. The parent agent writes executable code that spawns subagent harnesses in parallel for fine-grained workloads, and uses structured function calls for small subtasks. The pattern is the natural extension of recursive language models (RLMs): where RLMs recurse over model calls without tools, Recursive Agent Harness (RAH) recurses over full harnesses with tools. On Oolong-Synthetic, RAH improves the Codex coding-agent baseline from 71.75% to 81.36% with the backbone held fixed — the gain is attributable to the harness, not the model.

## The Question the Paper Names

When an agent recurses over a long-context task, **what should the recursive unit be**?

- A **model call with no tools** (RLM): composes LLM invocations recursively over sub-slices of long inputs. Performs reasoning that scales with the number of slices. Cannot open files, run code, or call external services.
- A **full agent harness** (RAH): composes full harnesses — each with its own context window, filesystem, code execution, and planning — recursively. Can apply regex, reasoning, or both; cross-check the two rather than committing to regex alone.

Each approach has a different blind spot. Coding agents reduce per-entry reasoning to regex heuristics. Even with full filesystem access, their context windows cannot accommodate thousands of entries simultaneously, forcing them to skip entry-level LLM reasoning entirely. RLMs compose reasoning over sub-slices but lack tool access. RAH is the synthesis: harness-as-recursive-unit gets you both per-entry LLM reasoning and full tool access, scaled through code-driven parallel spawning.

## How It Works

### Parent Agent Decision
A parent agent receives the full task and inspects the document to determine workload size. It selects between two spawning paths based on entry count:

- **JSON tool-call spawning** (1–5 entries): the parent calls a Task tool directly. The harness runs the subagent.
- **Code-execution spawning** (>5 entries): the parent writes an executable script in which each subagent task is instantiated as a `Task()` object and all tasks are collected into a single `asyncio.gather` call. The script runs all subagents in parallel through the parent agent's shell tool.

The code-execution path bypasses the per-turn parallel tool-call budget. JSON tool calling is bounded by the API's per-turn limit; a script executed in a subprocess carries no such restriction. Spawning scale is controlled by the workload, not by the provider's protocol.

### Subagent Architecture
Each subagent is a **full harness** equipped with `read_file`, `write_file`, `ls`, `glob`, `grep`, `execute`, and web search, plus a planning step before execution. The recursive unit is the harness, not the model call:

- Each subagent operates in an isolated workspace with no access to the parent context or peer subagents
- No shared memory or communication channel between sibling subagents — each reasons independently
- A subagent that meets a complex entry can write its own script and spawn **grandchild harnesses** — the decomposition is genuinely recursive, not one level of fan-out
- Recursion depth is bounded by a configurable limit (default 3) to prevent unbounded tree growth
- The output of each subagent is a structured JSON record written to a designated path; the parent script aggregates into a final answer after all subagent tasks resolve

### Aggregation Without Coordination Cost
The parent collects results by reading a shared output file that all subagents write to upon completion. This avoids inter-process communication overhead. The deterministic aggregation path is what makes the result auditable and testable: the parent can re-aggregate the same way on every run.

## Empirical Results on Oolong-Synthetic

199 samples from Oolong-Synthetic, stratified across all 13 context-length buckets from 1K to 4M tokens (average 629K tokens per instance), scored with the Oolong protocol.

| Method | Oolong Score | Backbone | Notes |
|---|---|---|---|
| Full-context baseline | 59.22% | (frontier) | Cao et al. [4] |
| RLM | 64.38% | GPT-5 | Zhang et al. [31] |
| Coding agent (Codex, no retriever) | 71.75% | GPT-5 | Cao et al. [4] |
| **RAH** | **81.36%** | **GPT-5** | Lumer et al. (this paper) |
| **RAH** | **89.77%** | **Claude Sonnet 4.5** | Lumer et al. (this paper) |

Holding the backbone fixed at GPT-5 to match the Codex baseline, RAH improves the strongest prior result by 9.61 points (95% CI [4.2, 14.8]). The gain is attributable to the harness rather than the model — the same model that scores 71.75% with a regex loop scores 81.36% when the recursive unit is a full harness. With a stronger backbone, the same design reaches 89.77%, suggesting that harness recursion **compounds with model quality** rather than substituting for it.

### Per-Context-Length Performance
RAH remains above 86% through 524K tokens and above 76% through 4M tokens on Sonnet 4.5, with no monotone degradation. Every RAH instance produced a `Task()` script — all samples followed the code-execution path, reflecting that Oolong-Synthetic workloads uniformly exceed the five-entry threshold for the JSON tool-calling path.

### Per-Answer-Type Performance
Semantic answer types (USER, COMPARISON, LABEL) all exceed 86%, confirming that subagents produce reliable reasoning regardless of where in the 4M-token context the relevant key–value pairs reside. NUMERIC performance degrades to 69.33% because the 0.75|^| scoring function penalizes off-by-one and off-by-two counts compoundingly — small counting errors are amplified into visible score gaps.

## Recursion Strategies by Recursive Unit

The paper's taxonomy distinguishes four strategies by what the recursive unit is:

| Strategy | Recursive unit | Strengths | Limitation |
|---|---|---|---|
| Coding agent | none (single harness) | navigation over modest entry counts | per-entry reasoning reduces to regex |
| Model recursion (RLM) | model call, no tools | decomposition without tools | no file access, code execution, or external services |
| Dynamic workflows | subagent from a script | repeatable orchestration at scale | schema-defined tool primitives, less flexible than code |
| **Harness recursion (RAH)** | **full agent harness** | **per-entry reasoning at scale, with tools** | depends on parent reliably generating spawning scripts |

The pattern is already in production: Anthropic's dynamic workflows let a coding agent write a script that orchestrates subagents at scale, executing the orchestration as code rather than turn-by-turn. The paper frames RAH as the conceptualization of this pattern and provides the controlled benchmark comparison that a product feature does not.

## Failure Modes Reported

Three patterns account for most lost score:

1. **The parent answers directly without writing a spawning script** on a small number of instances, collapsing RAH to a single coding agent and discarding per-entry reasoning. These concentrate at longer context lengths, where the parent is more likely to treat the task as retrieval.
2. **NUMERIC questions lose score even when subagent reasoning is sound** because the 0.75|^| function penalizes off-by-one counts to 0.75 and off-by-two to 0.5625.
3. **DATE answer types with few instances (n=5)** show high variance — a single incorrect response moves the reported score by a large amount.

The dominant mode is the first: harness recursion fails when the parent decides not to recurse. The mechanism depends on the parent reliably choosing code-driven spawning at workload scale.

## Why Code as Action

The paper's commitment to "code as a first-class action" follows from [[code-as-agent-harness|CodeAct]] (Wang et al., 2024): writing and running a program is a more expressive way to orchestrate tools than emitting one structured call at a time. RAH applies this insight to parallel document processing rather than sequential exploration:

- The parent writes ordinary program code that instantiates subagents and runs them in parallel
- The same language used for all other reasoning (data manipulation, file I/O, output formatting) is the language used for orchestration
- Concurrency, parametrization, and output paths are ordinary program parameters, not fixed tool-schema parameters

This is the practical bridge between [[code-as-agent-harness|the code-as-harness framework]] and [[multi-agent-code-orchestration|multi-agent orchestration]]. Code is the medium; subagents are the units; the parent is the orchestrator that writes code.

## Relationship to the Wiki

### Extension to RLM, not replacement
RAH is positioned as the code-first extension to RLM. Where RLM recurses over model calls without tools, RAH recurses over full harnesses. The two are complementary: model recursion decomposes long-context inputs into sub-slices; harness recursion decomposes them into per-entry sub-tasks with full tool access. RLM is the right choice when the task is reasoning-heavy and tool-light; RAH is the right choice when entries may need filesystem navigation, code execution, or external services.

### Mechanism, not invention
RAH is built from established primitives: code execution (CodeAct), subagent spawning (AutoGen, AgentVerse), parallel function calling (the LLM Compiler), and long-context reasoning (RLM, Oolong). The paper's contribution is **naming the pattern** and **measuring it** with the backbone held fixed. The primitives are not new; the controlled evaluation is.

### Tension with [[the-verifiability-thesis|verifiability thesis]]
Recursive decomposition scales reasoning by adding indirection, but each indirection layer is a place where the model's behavior is harder to verify. RAH is well-suited to the long-context reasoning benchmark because the answer is a structured value that can be extracted programmatically. For tasks where the harness is harder to verify (open-ended planning, creative writing), the same recursive structure may not pay off — the cost of decomposition may exceed the cost of single-harness reasoning.

## Limitations

- Evaluation is limited to Oolong-Synthetic. Generalization to Oolong-Real and to domains where per-entry evidence is ambiguous remains open.
- The parent occasionally skips spawning at long context lengths, collapsing RAH to a single coding agent.
- The NUMERIC scoring penalty understates reasoning quality on continuous-quantity tasks.
- RAH depends on the parent agent reliably generating syntactically correct spawning scripts.
- Exact token and wall-clock profiles for the GPT-5 configuration are uninstrumented.
- The paper does not ablate individual design choices such as recursion depth, the number of entries per subagent, or the code-execution vs. tool-call spawning path. Isolating their contributions is left to future work.

## Thread

- [[multi-agent-code-orchestration]] — RAH is the code-as-action extension of multi-agent orchestration: the parent writes executable code that spawns subagents rather than emitting structured tool calls
- [[code-as-agent-harness]] — RAH is the practical instantiation of "code as harness" applied to parallel document processing
- [[harness-engineering]] — RAH is harness recursion as an alternative to [[self-harness|self-evolving harnesses]] — same model, different strategies for the model's operational substrate
- [[the-agent-workflow]] — The parent agent's "decide whether to recurse" decision is a new instance of the focus-maxing workflow at the per-task level
- [[the-verifiability-thesis]] — RAH works when subagent outputs are programmatically verifiable; the verifiability thesis predicts exactly this constraint
- [[tool-design-for-agents]] — The Task() primitive that RAH relies on is a tool designed for the parent agent; the contrast with JSON tool calling is the tool design axis

## Related

- [[harness-mechanisms]] — Harness recursion is a harness mechanism (tool use / workflow-orchestration) extended recursively
- [[self-harness]] — The complementary self-optimization pattern: same model editing its harness rather than recursing over harness instances
- [[evolving-context]] — RAH does not improve the harness over time; it spawns fresh harness instances per task. Contrast with [[self-harness]]'s edit-in-place model.
- [[code-as-agent-harness]] — The broader framework; RAH is one specific instance of code as the orchestration medium
- [[multi-agent-code-orchestration]] — The broader multi-agent taxonomy; RAH is one topology (subagent from a script) within it
- [[plan-vs-review]] — The plan-vs-review tradeoff: RAH is a structural implementation of plan-vs-review, where the plan is a script and the review is per-subagent output aggregation
- [[context-engineering]] — Isolated subagent contexts (no shared memory, no communication) are an extreme form of context isolation
- [[verification-loop]] — The shared output file that all subagents write to is the verification substrate for the recursive decomposition

## Sources

- `raw/2606.13643.md` — Lumer, Sen, Paul, Subbiah (PricewaterhouseCoopers, 2026). *Recursive Agent Harnesses.* Full paper: §1 introduction, §2 related work, §3 RAH design, §4 experiments on Oolong-Synthetic, §5 limitations, §6 conclusion. Controlled evaluation with backbone held fixed at GPT-5 to match the Codex baseline.
