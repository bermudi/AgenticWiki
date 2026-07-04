---
title: Execution Apathy
created: 2026-05-06
updated: 2026-07-03
sources:
  - raw/yt-when-to-use-small-lm-for-ai-agents-new-insights.md
tags: [llm, failure-mode, agent-quality, planning]
---

# Execution Apathy

> A failure mode identified in the Harvard AgentFloor study where an LLM — typically a larger frontier model like GPT-5 — plans out a multi-step solution but then fails to execute it. The model "looks at the 10-step horizon, perfectly formats a plan, realizes the cognitive load required to execute it step by step, and simply resigns." It outputs a polite text response claiming what should be done without doing it.

## Characteristics

On AgentFloor's tier E (long-horizon planning, 8-12 sequential steps), GPT-5's dominant failure pattern is execution apathy:

- **39%** of GPT-5's E-tier failures were early resignation — the model decided to stop mid-task and output text instead of continuing
- **24%** were "plan without execute" — the model wrote a detailed strategy but never made a single tool call
- Combined, **63%** of GPT-5's failures at the highest complexity tier involve the model consciously or implicitly **stopping work**

The source video describes this as the model looking at the required effort and deciding it wasn't worth completing — a form of model-level metacognitive avoidance.

## Contrast With Blind Panic

Execution apathy is one of two distinct failure modes at the planning ceiling:

| | Execution Apathy | Blind Panic |
|---|---|---|
| **Model** | GPT-5 (frontier) | Gemma 4 26B (open-weight) |
| **Behavior** | Plans then resigns | Executes but degenerates |
| **Failure type** | Early resignation, plan-without-execute | Step budget exhausted, tool hallucination |
| **Persistence** | Gives up easily | Almost never resigns (0%) |
| **Root cause** | Cognitive load assessment → avoidance | Local minima entrapment → desperation |

The two modes are mutually reinforcing evidence that the tier E ceiling is not a model-specific quirk but a structural limitation: different architectures reach it via different paths, but none escape it.

## Why It Matters for Agent Systems

Execution apathy is particularly insidious because it is **silent**. The model produces a plausible-looking output — a plan, a summary, a suggestion — that appears to be work product but is not actual execution. In an [[afk-agent]] workflow, this would manifest as the agent reporting task completion without having done the work. Traditional system monitoring sees the output; only trace-level observability would reveal the missing execution steps.

The AgentFloor study found that system prompts designed to prevent this (e.g., "plan first then execute") **did not fix execution apathy** and in some cases made it worse for other models. The behavior appears to be a deep architectural property, not a surface-level prompting issue.

## Thread
- [[agent-quality-engineering]] — Execution apathy is a quality failure mode quantified by the AgentFloor benchmark
- [[tool-design-for-agents]] — Emerges at the upper bounds of tool-use capability; tool design cannot fix it
- [[the-agent-workflow]] — Prevents successful HITL-to-AFK handoff at high planning complexity

## Related

- [[blind-panic]] — The complementary failure mode: persistent but dysfunctional execution
- [[agent-floor]] — The benchmark that identified and quantified this failure mode
- [[hallucination]] — The mechanism by which blind panic manifests (tool hallucination) vs execution apathy's resignation
- [[agent-observability]] — Why trace-level observability is needed to detect execution apathy in production
- [[verification-loop]] — Mechanical verification as the defense against unexecuted plans
- [[compounding-booboos]] — How execution apathy can compound when agents report fake completion
- [[synthetic-truth]] — Execution apathy has a similar structure: the model produces what looks like a correct output but hasn't done the underlying work
- [[model-routing]] — The upper bounds of model routing are defined by where execution apathy emerges
- [[discover-ai]] — The source that documented GPT-5's execution apathy failure mode

- [[afk-agent]] — AFK agents may exhibit execution apathy: plausible plans with no real work behind them
- [[failure-modes]] — Master playbook: execution apathy mapped to detection signals and countermeasures
- [[self-conditioning]] — Distinct from execution apathy: the model is trying correctly but gets dragged down by its own error-laden context, rather than resigning

## Sources

- `raw/yt-when-to-use-small-lm-for-ai-agents-new-insights.md` — Discover AI's breakdown of GPT-5's failure distribution at tier E, including the "execution apathy" characterization and the contrast with Gemma 4's "blind panic"
