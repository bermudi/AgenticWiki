---
title: Blind Panic
created: 2026-05-06
updated: 2026-05-06
sources:
  - raw/yt-when-to-use-small-lm-for-ai-agents-new-insights.md
tags: [llm, failure-mode, agent-quality, planning]
---

# Blind Panic

> A failure mode identified in the Harvard AgentFloor study where an open-weight model like Gemma 4 26B, when confronted with a task exceeding its planning horizon, dutifully continues executing but degenerates into looping behavior and tool hallucination. Unlike [[execution-apathy|execution apathy]], the model never gives up — it keeps trying, but its attempts become increasingly dysfunctional as it exhausts its step budget and invents non-existent tools.

## Characteristics

On AgentFloor's tier E, Gemma 4 26B's failure distribution reveals blind panic:

- **41%** — Step budget exhausted: the model enters a local minimum, cannot escape, and runs in circles until it runs out of allowed moves
- **36%** — Hallucinated a tool: the model invents tool names and APIs that don't exist in an attempt to find a way forward
- **0%** — Early resignation: Gemma 4 **never** gives up. It fights to the end.

The source describes this as the model running around inside a local minimum on the loss manifold, unable to find the global optimum. In its desperation to "provide helpful answers to the human user," it starts hallucinating — inventing tools, tool names, and APIs that don't exist, because it has "learned that hallucination or just inventing something is a valid way out."

## Contrast With Execution Apathy

Blind panic is the mirror image of execution apathy:

| | Execution Apathy | Blind Panic |
|---|---|---|
| **Model** | GPT-5 (frontier) | Gemma 4 26B (open-weight) |
| **Behavior** | Plans then resigns | Executes but degenerates |
| **Failure type** | Early resignation, plan-without-execute | Step budget exhausted, tool hallucination |
| **Persistence** | Gives up easily (39% early resignation) | Never resigns (0%) |
| **Root cause** | Cognitive load assessment → avoidance | Local minima entrapment → desperation |

The two modes demonstrate that different model families hit the same ceiling through entirely different mechanisms. GPT-5 recognizes the cognitive load and avoids it; Gemma 4 recognizes the difficulty and doubles down, with escalating dysfunction.

## System Prompts Can't Fix It

The AgentFloor authors attempted to mitigate blind panic with structured prompting — telling models to plan first and then execute. This intervention **actively backfired** for Gemma 4 26B. Instead of reducing blind panic, it pushed the model into the resignation failure mode it otherwise avoids entirely. The system prompt could not override the model's internal parametric constraints at the planning ceiling — and in trying, it destroyed the one thing Gemma did well (persistent execution). This reinforces the conclusion that the tier E ceiling is architectural, not prompt-level.

## Why It Matters for Agent Systems

Blind panic is more detectable than execution apathy — at least the model produces traces of its failed execution (repeated tool calls, invalid tool names). But it is also more expensive: the model consumes its entire step budget and token allocation before failing. In an [[afk-agent]] workflow, blind panic would manifest as an agent that runs for the maximum duration and produces a trail of confused tool calls, consuming resources without making progress.

The key insight: both failure modes consume roughly the same token budget, but in different ways. Execution apathy produces a cheap, convincing-looking fake output. Blind panic produces an expensive, obviously-failed trace. Neither is a good outcome, and both resist system-prompt-level intervention.

## Thread
- [[agent-quality-engineering]] — Blind panic is a quality failure mode quantified by the AgentFloor benchmark
- [[tool-design-for-agents]] — Emerges at the upper bounds of tool-use capability; different architectures fail differently
- [[the-agent-workflow]] — Persistent but dysfunctional AFK execution at the planning ceiling

## Related

- [[execution-apathy]] — The complementary failure mode: graceful-looking avoidance
- [[agent-floor]] — The benchmark that identified and quantified this failure mode
- [[hallucination]] — The specific mechanism of tool hallucination as a desperation behavior
- [[compounding-booboos]] — Blind panic's looping behavior as a compounding failure pattern
- [[agent-observability]] — Why trace-level observability distinguishes blind panic from execution apathy
- [[verification-loop]] — The defense against both failure modes: verify outputs mechanically
- [[backpressure]] — Step budget exhaustion as a form of built-in backpressure
- [[model-routing]] — The upper bounds of model routing are defined by where blind panic emerges
- [[discover-ai]] — The source that documented Gemma 4's blind panic failure mode

## Sources

- `raw/yt-when-to-use-small-lm-for-ai-agents-new-insights.md` — Discover AI's breakdown of Gemma 4's failure distribution at tier E, including the "blind panic" characterization and the contrast with GPT-5's "execution apathy"
