---
title: Agent Observability
created: 2026-04-27
updated: 2026-04-27
sources: ["raw/The Observability Layer Your AI Agent Is Missing - youtube.com.md", "raw/The Quality Loop Your AI Agent Is Missing (Evals + Tracing) - youtube.com.md"]
tags: ["agents", "observability", "tracing", "monitoring", "opentelemetry"]
---

# Agent Observability

> The ability to see inside an agent's decision-making process — not just whether it ran, but why it did what it did. Built on three pillars: logs, traces, and metrics.

AI agents don't just follow instructions; they make decisions. Traditional monitoring tools — built around request paths and service health — don't capture decision chains. Agent observability requires a different approach, though it uses the same primitives (OpenTelemetry spans, trace IDs, parent-child relationships) applied to a different object: a task being executed by an agent rather than a request moving through services.

## Logs, Traces, and Metrics

### Logs: The Raw Record
Every event, tool call, model response — timestamped and stored. Logs tell you **what** happened at a single moment. But a log entry is isolated: it doesn't tell you why one step led to the next, what the agent was reasoning about, what context it was carrying, or what made a tool call the logical next move.

**The invoice failure:** Every log entry said the task was done. No errors, no 500s. The tool calls were recorded — `finalize_invoice` was there, `send_invoice` was not. But finding this meant scrolling a flat feed of tool calls across three agents, noticing the *absence* of a call you'd have to already know should exist, and piecing together why the agent interpreted finalization as delivery. The logs had the data. They didn't have the story.

### Traces: The Decision Tree
A trace is not a more detailed log — it's a different shape entirely: a **tree**. The root is the top-level task. Every decision, tool call, and sub-agent delegation becomes a node (a **span**) with its own inputs, outputs, and status. The connections between spans show you **why**.

When something goes wrong, you don't scroll a feed — you walk down the tree:
- Root span: the user's request
- Child spans: decisions, tool calls, sub-agent delegations
- Each span: named, timed unit of work with inputs, outputs, and status
- The tree structure shows the reasoning chain

**The invoice failure, revisited:** In the trace tree, `ledger`'s subtree shows `lookup_invoice` → `check_status` → `finalize_invoice`. Then the tree stops. In a log feed, a missing call is invisible (the absence of a line). In a trace tree, you can see everything the agent did — and exactly where it stopped. Walking back up to the root agent's span revealed the misinterpretation: the agent read the `open` status as "completed" and composed a "sent successfully" Slack message.

One is an archaeology project. The other is a narrative you can read.

### Metrics: Aggregate Patterns
Logs and traces answer questions about **one run**. Metrics answer questions about **all of them**, aggregated across thousands of traces.

Two categories:
- **System metrics**: Latency, error rate, token costs, uptime. These watch the server. During the invoice failure, every system metric was green.
- **Quality metrics**: Correctness, trajectory adherence, whether outputs match the task. These watch the agent. They're computed by running [[agent-evals|evals]] against trace data.

> System metrics watch the machine. Quality metrics watch the agent. If you're only watching system metrics, you're not watching the agent.

Without quality metrics, agent failures get discovered manually, after the fact, when someone happens to notice something's off.

## The OpenTelemetry Connection

The same primitives that trace requests through microservices trace decisions through agents: spans, trace IDs, parent-child relationships. Tools like Arize Phoenix, Langfuse, Braintrust, and Mastra all speak OpenTelemetry. What's new isn't the infrastructure — it's what you're looking at: a decision chain instead of a request path.

## Designed In, Not Added Later

Designing for observability from the start is an architectural decision. If your agent doesn't emit structured traces, you can't evaluate trajectory. If it doesn't log tool calls with parameters, you can't measure efficiency. If it doesn't expose intermediate reasoning, you can't diagnose failures.

## Related

- [[agent-evals]] — Evals run on trace data; observability is the substrate evals depend on
- [[agent-quality-loop]] — Traces → evals → scorers → code: observability is the first step in the flywheel
- [[verification-loop]] — Traces as the input to the verification loop for agentic systems
- [[agent-experience]] — Designing for observability is an AX principle
- [[compounding-booboos]] — Tracing catches booboos in their decision context, not as isolated log lines
- [[tool-design-for-agents]] — Tool output design determines what's observable

## Thread

- [[agent-quality-engineering]] — Observability as the visibility layer of the quality framework

## Sources

- `raw/The Observability Layer Your AI Agent Is Missing - youtube.com.md` — The Emma/invoice story, logs vs traces vs metrics, OpenTelemetry connection
- `raw/The Quality Loop Your AI Agent Is Missing (Evals + Tracing) - youtube.com.md` — Mastra Studio traces in practice: span trees, agent runs, tool calls
