---
title: Model Routing
created: 2026-05-06
updated: 2026-06-19
sources:
  - raw/yt-when-to-use-small-lm-for-ai-agents-new-insights.md
  - raw/gpt-55-vs-claude-vs-gemini-nate-b-jones.md
  - raw/2504.21625v6.txt
  - raw/yt-ai-agents-need-workflows-not-bigger-prompts.md
tags: [workflow, cost-optimization, architecture, model-selection]
unaudited_marginal: 1
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

## Walkthrough: Sponsor Email Triage Pipeline

Galarza (2026) demonstrates model routing in a concrete workflow: triaging a sponsor inquiry email through Ministral 3.8B (local, lightweight) for classification and extraction, then routing the compiled evidence to Qwen 3.5 35B for reasoned scoring. The pipeline:

1. **Normalize** (deterministic): Parse raw email into structured fields — no model needed
2. **Classify** (Ministral 3.8B): Narrow judgment — "is this a sponsor inquiry?" — with structured JSON output
3. **Reconcile** (deterministic + LLM): Combine the model's classification with keyword-based signal checks before trusting the routing decision
4. **Extract** (Ministral 3.8B): Pull sponsor details, claims, URLs from email text
5. **Research** (Tavily search API, deterministic): External corroboration via web search — no model needed for the fetch
6. **Score** (Qwen 3.5 35B): Take compiled evidence (normalized email + classification + extraction + research) and evaluate sponsor fit across audience relevance, product credibility, content naturalness, reputation safety, and commercial clarity
7. **Guardrails** (deterministic): Validate that scores and extracted claims are internally consistent before generating output

The routing logic: Ministral handles steps 2 and 4 (classification and extraction — tier A-B complexity) because they're narrow, single-model-call tasks with structured output schemas. Qwen only enters at step 6, when the task requires synthesis across multiple evidence sources (tier D). This keeps the frontier model off the critical path for 4 of 6 non-deterministic steps, and the deterministic steps (1, 3, 7) need no model at all.

> [!note] Marginal: This walkthrough is a Mastra-based demonstration and serves as a practical instantiation, not an empirical benchmark.

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

## Routing by Reasoning Requirement

Meeseeks ([[iterative-self-correction]]) reveals a distinct routing signal: **reasoning models improve more over multiple self-correction turns**. The gap between reasoning and non-reasoning models *widens* with iteration — non-reasoning models suffer from [[overcorrection-bias|catastrophic overcorrection]] (wild oscillation on precise constraints like word count), while reasoning models dampen the oscillation by pre-calculating required content length and proportions in their reasoning traces —

Practical routing rule: **for constraint-dense prompts, route to reasoning models.** The payoff compounds — what starts as a small advantage on turn 1 becomes a significant gap by turn 10. This is distinct from the complexity-tier routing above: a prompt can be simple (tier A-B) but involve precise word counts or proportion constraints, and the routing signal from Meeseeks is constraint type, not planning depth.

Conversely, for single-constraint or loose-constraint prompts where the model has high base accuracy, the reasoning overhead provides no benefit and the cheaper model is the correct route.

## Thread
- [[the-human-lever]] — Task decomposition and model routing are the escape valve when the planning ceiling exceeds model capability
- [[the-agent-workflow]] — Model routing is the cost optimization layer of the decomposition workflow
- [[tool-design-for-agents]] — Model selection as a tool design input; different routing tiers may need different tool interfaces

## Related

- [[agent-floor]] — The benchmark that provides the empirical basis for model routing
- [[agent-evals]] — Evals are needed to measure whether a routing decision was correct
- [[tool-design-for-agents]] — Tools must be designed for agentic consumption to make routing practical at scale
- [[the-agent-workflow]] — Task decomposition is the workflow foundation; routing is the execution layer
- [[context-files]] — Context files affect how different models respond to instruction styles; the empirical evidence shows that context file design must account for model-specific behavior differences
- [[execution-apathy]] — The failure mode that frontier models exhibit at model-routing's upper bounds
- [[blind-panic]] — The failure mode that open-weight models exhibit at model-routing's upper bounds
- [[jagged-frontier]] — Model routing is a practical application of the jagged frontier: exploit model strengths, route around weaknesses
- [[afk-agent]] — Model routing enables cheaper, more scalable AFK execution
- [[discover-ai]] — The source that presented the model routing framework
- [[dynamic-trust]] — Parallel concept: model routing routes to the cheapest capable model; dynamic trust routes authority to the most verifiable output
- [[verifiability]] — Model routing depends on knowing which domains are verifiable for which models; verifiability is the economic driver behind the capability heat map

- [[ralph-loop]] — The Ralph loop decomposes tasks into routable sub-tasks
- [[iterative-self-correction]] — Meeseeks shows reasoning models improve more over multiple turns; constraint-type (word counts, proportions, mixed-language) is a routing signal distinct from complexity tier

## Sources

- `raw/yt-when-to-use-small-lm-for-ai-agents-new-insights.md` — Discover AI's walkthrough of the AgentFloor results, the cost comparison framework, the capability heat map, and the practical guidance for sorting tasks by complexity tier
- `raw/gpt-55-vs-claude-vs-gemini-nate-b-jones.md` — Task-shape routing table (execution vs taste vs research vs data), the "inventing taste is hard, implementing to a target is easier" insight, and the system-over-model argument that execution environment multiplies model capability
- `raw/2504.21625v6.txt` — Meeseeks (Wang et al.): reasoning vs. non-reasoning model divergence over self-correction turns; routing signal for constraint-type tasks (word counts, proportions, mixed-language)
- `raw/yt-ai-agents-need-workflows-not-bigger-prompts.md` — Galarza's sponsor email triage workflow: Ministral/Qwen routing split, deterministic reconciliation, and guardrail steps
