---
title: Agent Quality Loop
created: 2026-04-27
updated: 2026-04-27
sources: ["raw/yt-the-quality-loop-your-ai-agent-is-missing-evals-tracing.md"]
unaudited_marginal: 0
tags: ["agents", "quality", "evals", "observability", "feedback-loop"]
---

# Agent Quality Loop

> The flywheel that makes AI agents shippable: code produces traces, traces feed evals, evals produce scores, scores send you back to code. Every production failure becomes an eval case, and the eval set compounds into the most accurate picture of what the agent needs to handle.

The quality loop ties [[agent-evals|evals]] and [[agent-observability|observability]] into a continuous improvement cycle. It is the mechanism through which agents get better over time — not from one-off fixes, but from a growing corpus of real failures turned into regression tests.

## The Flywheel

```
code → traces → evals → scorers → back to code
```

1. **Code produces traces**: The agent runs, emitting structured spans for every decision, tool call, and sub-agent delegation.
2. **Traces feed evals**: Scoring functions (LLM-as-judge or code-based) evaluate the agent's output against quality criteria.
3. **Evals produce scores**: Each run gets a 0–1 score. Sampling controls how many runs go through evals (100% in dev, 25% in production).
4. **Scores send you back to code**: Low scores reveal prompt deficiencies, tool design problems, or model behavior changes. You iterate.
5. **Production failures become eval cases**: Annotated failures join the benchmark set, which becomes a living record of everything the agent has struggled with.

## The Groundedness Example

Damian Galarza demonstrates the full loop with an action item extraction agent:

**V1 prompt** (vague): "Extract action items from this meeting transcript."
- Result: 6 action items, one hallucinated ("create a CLAUDE.md" — suggested by a participant, never committed to)
- Eval score: 0.83 (5/6 grounded)

**LLM-as-Judge rubric** defines "grounded" precisely:
- Score 1: participant explicitly committed to a specific task
- Score 0: conditional ("we might"), discussion topic without commitment, plausible inference, or something nobody actually said

**V2 prompt** (specific): Includes the groundedness criteria *in the tool instructions* — "do not include advice or suggestions that the participant never committed to act on," "only new commitments made in this meeting," "the transcript must contain an explicit commitment from the owner."
- Result: 5 action items, all grounded
- Eval score: 1.0

The loop worked: vague prompt → eval caught the problem → specific prompt → perfect score.

## Why the Flywheel Matters

- **Model upgrades**: Every model change can alter agent behavior. The eval set gives you a test bench to measure before shipping.
- **Tool changes**: New tools or refactored tool interfaces can be validated against historical failures.
- **Regression prevention**: The eval set grows with every production failure, making it harder to regress on edge cases you've already encountered.
- **Confidence to ship**: Without evals, you ship on intuition. With evals, you ship on evidence.

## Sampling Strategy

Not every production run needs to go through full LLM-as-judge evals. Sampling (e.g., 25% of runs) controls cost while still providing aggregate quality signals. In development, 100% sampling gives tight feedback.

## Related

- [[agent-evals]] — The measurement layer the loop depends on
- [[agent-observability]] — Traces as the input to the loop
- [[mastra]] — Mastra implements the quality loop: traces → evals → groundedness scores → prompt iteration
- [[wide-events]] — Same feedback loop shape: production gaps → add missing data → next time you have it
- [[verification-loop]] — The deterministic sibling: test → fail → fix → retest
- [[compounding-booboos]] — The quality loop catches booboos before they compound in production
- [[tracer-bullets]] — The quality loop as tracer bullets for agent quality
- [[backpressure]] — Quality scores as soft backpressure: degrading scores prompt investigation

## Thread

- [[agent-quality-engineering]] — The quality loop as the feedback mechanism in the quality framework

## Sources

- `raw/yt-the-quality-loop-your-ai-agent-is-missing-evals-tracing.md` — The Mastra walkthrough: groundedness eval, prompt iteration, the flywheel
