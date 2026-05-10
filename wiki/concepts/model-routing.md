---
title: Model Routing
created: 2026-05-06
updated: 2026-05-10
sources:
  - raw/When to use Small LM for AI Agents New Insights - youtube.com.md
  - raw/gpt-55-vs-claude-vs-gemini-nate-b-jones.md
tags: [workflow, cost-optimization, architecture, model-selection]
---

# Model Routing

> The practice of decomposing an agentic workflow into tasks of varying complexity and routing each subtask to the cheapest capable model. Rather than treating the LLM as a universal oracle that always requires the most expensive frontier model, model routing treats model selection as a cost optimization problem — matching cognitive demand to model capability tier.

## The Core Insight

The Harvard AgentFloor study demonstrated that small open-weight models (3B-8B parameters) can match or exceed GPT-5 performance on simple-to-moderate tool-use tasks (tiers A0 through C), at up to 15x lower cost. The critical finding is not just that small models are cheaper, but that **performance is not monotonic with model size** — a Qwen 3.5 2B model can outperform a much larger model on specific tasks depending on pre-training data distribution.

## How Model Routing Works

1. **Decompose**: Break a complex prompt or workflow into simpler complexity classes (A0 through E on the [[agent-floor]] ladder)
2. **Classify**: Determine which tier each subtask belongs to
3. **Route**: Send each subtask to the cheapest model known to perform well at that tier
4. **Recompose**: Aggregate results, routing only cross-cutting synthesis or planning-heavy steps to a frontier model

## Cost Impact

| Model | Aggregate TCR | Relative Cost |
|---|---|---|
| GPT-5 | ~60% | Baseline (1×) |
| Gemma 4 26B | ~60% | ~1/15× (self-hosted) |

The practical saving comes from routing the **base load** — the bulk of simple tool calls, lookups, extractions, and submissions — to a 3B-26B open-weight model, reserving the frontier model for only the planning-heavy or synthesis tasks that genuinely require it.

## The Capability Heat Map

The AgentFloor study produced a capability heat map showing which model sizes perform best at which complexity tier. Key patterns:

- **A0-A (no tools, single tool)**: 3B models suffice (~84% TCR for Granite 4 3B at A0)
- **B (two-tool chain)**: 2B models can match GPT-5 (~80% TCR for Qwen 3.5 2B)
- **C (branching)**: 26B models occasionally outperform frontier
- **D (multi-source synthesis)**: Mix of results — Gemma 4 26B trails GPT-5, but Qwen 3.5 2B outperforms all models including GPT-5 at this tier, demonstrating strong pre-training domain fit
- **E (long-horizon planning)**: All models fail (~10% GPT-5, ~0% open-weight)

The map reveals that **model routing works best when the task decomposition is aggressive** — splitting D and E tier tasks into composed sequences of lower-tier subtasks until each individual call stays within the capable range of a small model.

## Relationship to the Agent Workflow

Model routing integrates naturally with the [[the-agent-workflow|agent workflow]] pattern:

- **HITL phase**: The human decomposes the task into complexity tiers, specifying which model handles each
- **AFK phase**: The agent harness routes each subtask to the appropriate model
- The [[multi-tier-action-space|fast orchestrator + smart oracle]] pattern is a concrete instantiation of model routing — a fast, cheap model handles navigation and tool calling, routing only heavy reasoning to an expensive oracle model

## Practical Considerations

- **Pre-training domain overlap matters more than parameter count**: A small model trained on data similar to the task can outperform a much larger model with no domain overlap
- **Tier classification is itself a cognitive task**: Classifying subtask complexity may need a small, fast model or heuristic rules
- **The ceiling remains**: No amount of routing fixes tier E planning — that requires architectural changes or external scaffolding (decomposition, human-in-the-loop planning, [[ralph-loop]]-style one-task-per-iteration)
- **System prompts are not routing**: Telling a model to "plan first then execute" does not change its fundamental capability ceiling and can sometimes make things worse

## Routing by Task Shape

Beyond cost-optimized tier routing, there's a complementary routing dimension: **task shape**. Not just "how complex is this?" but "what kind of work is this?" Nate B Jones (2026) proposes a practical routing table based on three orthogonal tests:

| Task Shape | Route To | Why
|---|---|---|
| Complex multi-step execution | Strongest execution model | Carries more of the task before dropping the thread |
| Blank-canvas visual/front-end | Model with strongest taste | Inventing visual style from nothing is a distinct capability |
| UI implementation (with reference) | Execution model + reference image | "Inventing taste is hard; implementing to a target is easier" — generate a mockup first, then hand to the execution model |
| Data work / migration | Execution model with validation harness | Good at semantic intuition (catching obviously fake records), weaker at backend hygiene (enum normalization, schema completeness) |
| Planning / critique | Model strongest at reasoning about shape of work | Different from execution — this is about seeing the whole picture, not carrying the work through |

The key insight: **the system around the model matters as much as the model itself.** Tools, file access, browser control, memory, computer use, and execution environment combine with model weights into something that can actually get work done. A model this strong trapped inside a chat window is underused. This aligns with the [[multi-tier-action-space]] convergence on model + execution environment as the unit of value.

## Thread
- [[the-agent-workflow]] — Model routing is the cost optimization layer of the decomposition workflow
- [[tool-design-for-agents]] — Model selection as a tool design input; different routing tiers may need different tool interfaces

## Related

- [[agent-floor]] — The benchmark that provides the empirical basis for model routing
- [[agent-evals]] — Evals are needed to measure whether a routing decision was correct
- [[tool-design-for-agents]] — Tools must be designed for agentic consumption to make routing practical at scale
- [[the-agent-workflow]] — Task decomposition is the workflow foundation; routing is the execution layer
- [[execution-apathy]] — The failure mode that frontier models exhibit at model-routing's upper bounds
- [[blind-panic]] — The failure mode that open-weight models exhibit at model-routing's upper bounds
- [[jagged-frontier]] — Model routing is a practical application of the jagged frontier: exploit model strengths, route around weaknesses
- [[afk-agent]] — Model routing enables cheaper, more scalable AFK execution
- [[discover-ai]] — The source that presented the model routing framework
- [[dynamic-trust]] — Parallel concept: model routing routes to the cheapest capable model; dynamic trust routes authority to the most verifiable output
- [[verifiability]] — Model routing depends on knowing which domains are verifiable for which models; verifiability is the economic driver behind the capability heat map

## Sources

- `raw/When to use Small LM for AI Agents New Insights - youtube.com.md` — Discover AI's walkthrough of the AgentFloor results, the cost comparison framework, the capability heat map, and the practical guidance for sorting tasks by complexity tier
- `raw/gpt-55-vs-claude-vs-gemini-nate-b-jones.md` — Task-shape routing table (execution vs taste vs research vs data), the "inventing taste is hard, implementing to a target is easier" insight, and the system-over-model argument that execution environment multiplies model capability
