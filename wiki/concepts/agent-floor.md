---
title: AgentFloor
created: 2026-05-06
updated: 2026-05-06
sources:
  - raw/When to use Small LM for AI Agents New Insights - youtube.com.md
tags: [benchmark, agent-evals, tool-use, model-evaluation]
---

# AgentFloor

> A 6-tier benchmark from Harvard (May 2026) that evaluates LLM tool-use capability across increasing cognitive demands, from simple instruction following to long-horizon planning. It was designed to isolate core tool-use ability from real-world confounds like API drift, network latency, and data contamination. Testing 16 open-weight models against GPT-5, it revealed that small models (3B-8B) match frontier performance on simple-to-moderate tool use, but all models collapse at tier E — suggesting an architectural ceiling in long-horizon planning that scale alone cannot fix.

## The Benchmark Design

The authors identified "three curses" of real-world AI benchmarks that AgentFloor was designed to eliminate:

1. **Chaos (environmental variability)**: Real API endpoints go down, rate limits trigger, schemas update. On ToolBench, 44.4% of API calls fail when re-running the same benchmark a day later. AgentFloor uses a deterministic, abstract, in-memory environment — no network, no filesystem, no external servers.
2. **Data contamination / memorization**: SW-bench verified that close to 60% of audited problems had flawed test cases or were contaminated. AgentFloor strips away any connection to real-world data the model may have seen during training.
3. **Entangled modalities**: HTML parsing, GUI navigation, and web noise are eliminated. Models receive perfect, clean native JSON tool schemas — testing pure tool-calling control independent of any environment fluctuation.

The result is a perfectly reproducible environment that isolates one thing: how far up the cognitive ladder of tool use a model can climb.

## The Six Tiers

Each tier introduces a new cognitive demand, with 5 tasks per tier (30 total):

| Tier | Cognitive Demand | Description |
|------|-----------------|-------------|
| A0 | Instruction following | Follow instructions without tools |
| A | Single tool call | Use one tool to complete a task |
| B | Sequential two-tool chain | First tool output feeds into the second |
| C | Branching | Branch on intermediate results |
| D | Multi-source synthesis | Pull data from multiple tools, resolve contradictions |
| E | Long-horizon planning | 8-12 sequential steps while maintaining system constraints across the entire reasoning trajectory |

## Key Findings

### The Tier E Ceiling

Tier E is where "all the models suddenly die." Even GPT-5 achieves only ~10% task completion rate at tier E. Gemma 4 26B drops to 0%. The failure is not a matter of scale — it is a fundamental architectural limitation of auto-regressive LLMs for long-horizon, multi-step contingent planning.

The authors demonstrated that this collapse occurs **even in a perfectly clean, deterministic environment**. This proves that the limitation in agentic workflows is not just that "the real world is messy" — even when the world is perfectly clean, the fundamental architecture of auto-regressive LLMs breaks down after about 5-7 sequential contingent steps.

### Small Models Can Match Frontier Performance

On aggregate task completion rate (TCR) across all tiers, Gemma 4 26B achieved 60% vs GPT-5's 59.6%. The cost difference is significant — up to 15x cheaper when self-hosted, and 2-12% faster.

On individual tiers, multiple small models **outperform** GPT-5:
- Gemma 4 26B: Outperforms GPT-5 on tiers A0, A, and C
- Ministral 38B: Outperforms GPT-5 on tier B
- Qwen 3.5 2B: At tier B, achieves 80% TCR — almost identical to GPT-5's performance

### The Sweet Spot

There appears to be a sweet spot around 3B-8B parameters for simple-to-moderate tasks. A 2B model at A0 achieves 44%, while a 3B model jumps to 84%. But model performance is not strictly a function of size — Qwen 3.5 2B outperforms much larger models on certain tiers, suggesting pre-training data domain overlap matters more than raw parameter count.

## Failure Mode Distribution

At tier E, models fail differently (see [[execution-apathy]] and [[blind-panic]]). The failure taxonomy includes:
- F1: Hallucinated a tool (making up an API)
- F4: Step budget exhausted (running out of allowed moves)
- F5: Early resignation (the LLM decides to give up)
- Plan without execute (writes a detailed plan but never makes a single tool call)

GPT-5's dominant failure mode is **execution apathy** — it plans but resigns before executing. Gemma 4's dominant mode is **blind panic** — it executes dutifully but loops in local minima and hallucinates tools. Gemma almost never resigns (0%).

## System Prompts Don't Fix the E Collapse

The authors tried structured prompting — telling models to plan first and then execute. It didn't help. For Gemma 4 26B, it **actively hurt** performance by pushing it into the resignation failure mode. The system prompt could not override the model's internal parametric constraints.

## Thread
- [[tool-design-for-agents]] — Isolates tool-use capability from tool design; model capability as a tool design constraint
- [[the-agent-workflow]] — Provides the complexity tier vocabulary for task decomposition
- [[agent-quality-engineering]] — Demonstrates the tier E quality ceiling; eval methodology for isolating cognitive complexity

## Related

- [[execution-apathy]] — GPT-5's failure mode: early resignation and plan-without-execute
- [[blind-panic]] — Gemma 4's failure mode: dutiful execution degenerating into looping and tool hallucination
- [[model-routing]] — The practice of decomposing task complexity and routing to the cheapest capable model
- [[agent-evals]] — AgentFloor is an eval benchmark designed for reproducibility and cognitive isolation
- [[hallucination]] — F1 (tool hallucination) as a specific failure sub-type
- [[jagged-frontier]] — AgentFloor demonstrates the jaggedness: small models can match frontier on some tiers, but all collapse at the same ceiling
- [[tool-design-for-agents]] — The benchmark isolates tool-use capability from tool design confounds
- [[discover-ai]] — The source that covered the Harvard AgentFloor study

## Sources

- `raw/When to use Small LM for AI Agents New Insights - youtube.com.md` — Discover AI's summary of the Harvard AgentFloor study, including the tier framework, comparative results, failure mode analysis, and cost implications
