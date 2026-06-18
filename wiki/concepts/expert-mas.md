---
title: Expert-MAS
created: 2026-06-18
updated: 2026-06-18
sources:
  - raw/the-illusion-of-multi-agent-advantage.pdf
tags: [concept, multi-agent, orchestration, mas-baseline, code-driven, deterministic-orchestration]
unaudited_marginal: 0
---

# Expert-MAS

> A hand-designed, deterministic, code-driven multi-agent baseline built per Anthropic's guidelines for MAS architectures. The architecture separates linguistic processing (LLM agents) from logical control (Python executor) and uses a structured schema (produced by a Meta-Agent) to dispatch specialized sub-agents in parallel. The Expert-MAS result on the [[smfr]] benchmark (GPT-5: 57.0% → 96.5% at comparable cost) is the experimental lever for the [[multi-agent-illusion]] paper's claim that *automated* MAS design is the problem, not multi-agent coordination itself.

## Architecture

The Expert-MAS pipeline has three layers:

1. **Meta-Agent** (LLM, runs once per task): parses the problem text into a structured schema that captures question type, investor names, target percentage, and aggregation logic. The schema is a typed data structure, not free-form text.
2. **Python Executor** (deterministic code): reads the schema, dispatches the appropriate number of sub-agent chains (one per investor), runs them in parallel, and collects their outputs.
3. **Specialized Sub-Agents** (LLM, run in parallel per investor):
   - **ExtractorAgent**: searches the stock haystack for the investor's transactions, retrieves open/close prices and dates.
   - **CalculatorAgent**: receives the Extractor's output, computes P&L amount, derives target price, finds matching dates.

A final **Aggregator** (deterministic code) sorts the qualifying dates across investors and selects the winner per the schema's aggregation criterion (earliest or latest).

## Why It Works

Three design properties, each addressing a specific [[functional-collapse|functional-collapse]] failure mode:

### Separation of Contexts
Each sub-agent receives the *subset* of the haystack relevant to its investor. The contexts are genuinely different — there is no single model re-prompted with the same context. This is the structural reason automated MAS fail: they have only one context window and a strong prior toward a single coherent answer.

### Deterministic Orchestration
The Python executor is not an LLM. It does not have a prior to converge on a single answer. It runs the sub-agents in parallel, collects their outputs, and passes them to a deterministic aggregator. The coordination overhead is not stochastic.

### Typed Decomposition
The Meta-Agent produces a *schema* — a structured data object — that drives the executor. The architecture is data-driven, not prompt-driven. This means the architecture is inspectable: the schema can be logged, the dispatch logic can be unit-tested, the aggregator's decision can be explained.

## Performance on SMFR

| Backbone | CoT-SC | Best automated MAS | **Expert-MAS** |
|---|---|---|---|
| GPT-4o | ~26% | no significant gain | bottlenecked (retrieval/calculation failures) |
| GPT-OSS-120B | 26.1% | +6.6pp (DyLAN, 5× cost) | **36.1%** |
| GPT-5 | 57.0% | +6.0pp (MAS-Orchestra, 1.9× cost) | **96.5%** |

The Expert-MAS achieves substantial performance improvements at cost comparable to CoT-SC. The contrast with automated frameworks is the diagnostic: same backbone, same task, same benchmark — only the architecture changes.

## Why GPT-4o Bottlenecks

The Expert-MAS exposes the [[the-verifiability-thesis|capability floor]] directly. On GPT-4o, the Extractor and Calculator agents have persistent calculation and retrieval failures regardless of orchestration. The architecture is correct; the components are not capable. The Expert-MAS is bottlenecked by base-model reasoning limits.

This is the cleanest evidence in the paper for the capability floor: *even a perfectly engineered multi-agent architecture cannot elevate a backbone that lacks the underlying reasoning capability.* The Expert-MAS provides the orchestration; the backbone provides the reasoning.

## Relationship to the Wiki

### Compared to [[recursive-agent-harness]]
RAH is the same pattern at a different scale. Both are hand-designed, code-driven multi-agent patterns where the parent writes executable code that instantiates sub-agents. The difference: RAH recurses over *full harnesses* (filesystem, code execution, tools) for long-context reasoning tasks; Expert-MAS uses single LLM calls with structured contexts for a multi-step financial reasoning task. The shared principle: code is the medium, sub-agents are the units, the parent is the orchestrator that writes code.

### Compared to [[harness-engineering]]
The Expert-MAS is a worked example of harness engineering. The harness has:
- A typed decomposition (the schema)
- Deterministic control flow (the Python executor)
- Specialized sub-roles with different tool surfaces (Extractor vs Calculator)
- Verifiable convergence (deterministic aggregation)

This is what the [[harness-engineering]] survey §5.2.3 (self-evolving harnesses) and §5.2.4 (transactional shared program state) describe, instantiated for a specific task.

### Compared to [[backpressure]]
The Expert-MAS succeeds because the deterministic Python orchestrator provides [[backpressure|backpressure]] that LLM-based orchestrators cannot. The schema, the dispatch logic, and the aggregator are all verifiable. An LLM-based orchestrator cannot verify its own coordination; a Python executor can.

### Compared to [[multi-agent-code-orchestration]]
The Expert-MAS instantiates the "star" topology ([[multi-agent-code-orchestration|§4.1.3]]): a hub (the Python executor) coordinates parallel workers (the Extractor/Calculator pairs per investor). The wiki's existing taxonomy has the topology; the Expert-MAS is a concrete example with measurements.

## What Expert-MAS Doesn't Address

The paper notes that the Expert-MAS design is most applicable to "reasoning-heavy agentic workflows" — environments where the bottleneck is internal coordination, not external interaction. It does not address:

- Long-horizon memory across sessions (covered by [[evoarena]]'s EvoMem)
- Open-ended tool use with many tools
- Real-world deployment constraints (latency, cost budgets, error recovery)
- Backbone selection (Expert-MAS is architecture; the backbone must be capable)

The Expert-MAS is a *baseline*, not a production architecture. Its value is as experimental evidence for what hand-designed multi-agent can do — and as the foil that exposes what automated search fails to discover.

## Thread

- [[the-verifiability-thesis]] — Expert-MAS is verifiability applied at the multi-agent level: every component is inspectable, every aggregation is deterministic
- [[the-agent-workflow]] — multi-agent coordination is one of the strategies the workflow thread advocates; Expert-MAS is the proof that the strategy can work when the architecture is engineered

## Related

- [[multi-agent-illusion]] — the umbrella finding; Expert-MAS is the experimental lever
- [[smfr]] — the diagnostic benchmark
- [[recursive-agent-harness]] — the larger-scale, hand-designed code-driven multi-agent pattern
- [[harness-engineering]] — the broader discipline; Expert-MAS is a worked example
- [[backpressure]] — the principle that Expert-MAS exemplifies
- [[multi-agent-code-orchestration]] — the broader taxonomy; Expert-MAS instantiates the star topology
- [[variant-isolation]] — HarnessX's alternative escape from automated MAS failure: K simple harnesses routed per task

## Sources

- `raw/the-illusion-of-multi-agent-advantage.pdf` — Jwalapuram, Lin et al. (2026). §3.3 SMFR Expert-MAS construction; Figure 4 architecture diagram; Table 4 head-to-head results; Appendix D full configuration (Meta-Agent system prompt, Extractor/Calculator prompts, executor logic).
