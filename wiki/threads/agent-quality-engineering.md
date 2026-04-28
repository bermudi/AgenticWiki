---
title: Agent Quality Engineering
created: 2026-04-27
updated: 2026-04-27
sources:
  - "raw/AI Agent Evals The 4 Layers Most Teams Skip - youtube.com.md"
  - "raw/The Observability Layer Your AI Agent Is Missing - youtube.com.md"
  - "raw/The Quality Loop Your AI Agent Is Missing (Evals + Tracing) - youtube.com.md"
tags: [thread, agent-quality, evals, observability, feedback-loop]
---

# Agent Quality Engineering

> AI agents fail differently than deterministic software — outputs look correct while decisions are wrong. Making agents shippable requires a quality infrastructure built on three layers: evals (probabilistic CI that measures quality on a spectrum), observability (decision-chain tracing that tells you why), and a feedback flywheel (production failures → eval cases → continuous improvement). Quality must be designed in from day one, not bolted on after shipping.

## The Core Thesis

The wiki already covers [[the-agent-workflow|how to work with agents]], [[the-human-lever|the human's role]], and [[tool-design-for-agents|how tools must change]]. This thread covers the **fourth leg**: how you know whether your agents actually work.

The argument, drawn from Damian Galarza's three-part series, breaks into three layers that form a coherent quality infrastructure:

1. **Evals**: CI for probabilistic systems. Binary pass/fail doesn't work for agents. Evals measure quality on a 0–1 spectrum across benchmark sets, scoring trajectory and outcomes with LLM-as-judge.
2. **Observability**: Logs tell you what happened. Traces (tree-shaped spans) tell you why. Metrics aggregate across thousands of runs to surface patterns. Quality metrics (correctness, trajectory adherence) watch the agent; system metrics (latency, error rate) watch the server.
3. **The Quality Loop**: Code → traces → evals → scorers → back to code. Every production failure becomes an eval case. The eval set compounds into a living record of everything the agent has struggled with — the most accurate picture of what it needs to handle.

## Layer 1: Evals — Probabilistic CI

Traditional tests assume determinism: same input → same output. Agents reject that assumption. Unit tests can't judge "helpfulness." Integration tests can't assert against natural language. End-to-end tests can't handle variable step counts.

[[agent-evals|Evals]] replace binary assertions with spectrum scoring. The framework has four layers (measure from the outside in):
- **Component**: Deterministic tools, unit-testable
- **Trajectory**: Right steps, right tools, right parameters, reasonable reasoning
- **Outcome**: Correct, helpful, grounded, complete — evaluated by LLM-as-judge
- **System**: Quality patterns at scale in production

And four quality dimensions:
- **Effectiveness**: Did it achieve the goal?
- **Efficiency**: Steps, time, tokens
- **Robustness**: Malformed input, API failures, edge cases
- **Safety & Alignment**: Stays within bounds, refuses appropriately

> You can only measure what you can see. Quality requires visibility designed in from day one.

## Layer 2: Observability — The Decision Narrative

[[agent-observability|Agent observability]] uses the same primitives as distributed tracing (OpenTelemetry spans, trace IDs, parent-child relationships) but applies them to a different object: a decision chain instead of a request path.

The Emma/invoice failure is the illustrative case: an agent finalized an invoice but never sent it. Every system metric was green. Every log line looked correct. Only the trace tree revealed the truth — the agent called `finalize_invoice` but never `send_invoice`, then misinterpreted the `open` status as "completed" and reported "sent successfully." The logs had the data; the trace had the story.

This is why observability must be an **architectural decision**, not an afterthought:
- No structured traces → no trajectory evaluation
- No tool call parameter logging → no efficiency measurement
- No intermediate reasoning exposure → no failure diagnosis

System metrics watch the machine. Quality metrics watch the agent. If you're only watching system metrics, you're not watching the agent — and failures get discovered manually, after the fact, when someone happens to notice.

## Layer 3: The Quality Loop — The Flywheel

[[agent-quality-loop|The quality loop]] ties evals and observability into a continuous improvement cycle:

```
code → traces → evals → scorers → back to code
```

The groundedness example demonstrates the full cycle: a vague prompt produced a hallucinated action item (score 0.83). The LLM-as-judge rubric precisely defined "grounded" — explicit commitment vs. conditional suggestion. The V2 prompt incorporated those criteria directly into tool instructions, and the score jumped to 1.0.

This flywheel makes agents shippable because it provides:
- **Confidence for model upgrades**: Run the eval set against the new model before shipping
- **Safety for tool changes**: Validate against historical failures
- **Compounding regression prevention**: Every fixed failure becomes a permanent test case
- **Aggregate quality signals**: Sampling (25% in production) catches drift without full-cost evals on every run

## Relationship to Existing Threads

### Extends
- [[tool-design-for-agents]] — Observability is a tool design concern. If tools don't emit structured spans with parameters, quality measurement is impossible. Agent experience requires observable tools.
- [[the-agent-workflow]] — The quality loop is the feedback mechanism that makes AFK agents safe. Without it, the [[afk-agent|AFK agent]] pattern is just unsupervised failure.
- [[verification-loop]] — Evals are the probabilistic equivalent. The deterministic verification loop (test → fail → fix → retest) becomes the quality loop (trace → score → iterate → rescore) for agentic systems.

### Supports
- [[the-human-lever]] — Quality engineering operationalizes the human lever: define what "good" means (eval criteria), verify the agent is meeting it (scores), and intervene when it's not (prompt/tool iteration). The human owns the quality standard.
- [[shared-design-concept]] — "Design so quality is measurable" is a shared-design principle. If the human and agent don't share the quality concept, the eval scores become meaningless.
- [[grey-box-engineering]] — The eval/observability layer is how you maintain the grey-box model at scale. You can't read every trace, but aggregate quality metrics tell you where to look.

### Tensions
- [[vibes-based-engineering]] — Evals are the structural antidote to shipping agents on vibes. Galarza's core complaint: "Most teams build the agent, ship it, and then ask, how do we test this?" That's vibes-based agent engineering. The quality loop replaces "looks right to me" with "score 0.83, here's what failed."
- [[malleable-agents]] — The quality loop provides the guardrails that make malleability safe. If an agent can modify its own tools, the eval set catches regressions.

## Concepts in this thread

- [[agent-evals]] — The 4-layer eval stack: CI for probabilistic systems
- [[agent-observability]] — Logs/traces/metrics for agent decision chains
- [[agent-quality-loop]] — The flywheel: production failures → eval cases → continuous improvement

## Related

- [[verification-loop]] — The deterministic sibling; evals as the probabilistic equivalent
- [[vibes-based-engineering]] — The anti-pattern the quality framework replaces
- [[compounding-booboos]] — The quality loop catches booboos in production before they compound
- [[backpressure]] — Quality scores as soft backpressure
- [[tool-design-for-agents]] — Tool design determines what's observable
- [[damian-galarza]] — Author of the three-part series that forms this thread

## Sources

- `raw/AI Agent Evals The 4 Layers Most Teams Skip - youtube.com.md` — The 4-layer eval framework and 4 quality dimensions
- `raw/The Observability Layer Your AI Agent Is Missing - youtube.com.md` — Logs/traces/metrics, the Emma/invoice debugging story, OpenTelemetry
- `raw/The Quality Loop Your AI Agent Is Missing (Evals + Tracing) - youtube.com.md` — The flywheel in practice: groundedness eval, Mastra walkthrough
