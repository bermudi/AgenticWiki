---
title: Agent Observability
created: 2026-04-27
updated: 2026-05-02
sources:
  - raw/The Observability Layer Your AI Agent Is Missing - youtube.com.md
  - raw/The Quality Loop Your AI Agent Is Missing (Evals + Tracing) - youtube.com.md
  - raw/yt-slop-watch-ideation.md
tags: ["agents", "observability", "tracing", "monitoring", "opentelemetry"]
---

# Agent Observability

> The ability to see inside an agent's decision-making process — not just whether it ran, but why it did what it did. Built on three pillars: logs, traces, and metrics. A concrete instantiation of this is Slop Watch: sessions as DAGs of turns, a per-session listener collecting events, and a self-hosted server for review.

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

## Concrete Architecture: Slop Watch

Matt Pocock's streamed ideation of Slop Watch produced a concrete data model and architecture for agent observability that illustrates the concepts above in practice.

### Session → Turn → Model Request Hierarchy

The core modeling insight: observability data is not flat. It has three nested levels:

1. **Session**: One logical run of a coding agent, attached to one developer, one working directory, one agent version. The top-level unit of observability.
2. **Turn**: One user message plus the full assistant response. Each turn may trigger multiple model requests (e.g., an agent that makes tool calls between reasoning steps).
3. **Model Request**: One HTTP call to the model provider. The atomic cost unit.

Sessions contain a **directed acyclic graph (DAG)** of turns, not a linear list. This accounts for branching and rewinding — when an agent rewinds to try a different approach, the abandoned branch is still part of the session's DAG, with real costs and artifacts.

### Listener/Sidecar Pattern
The capture component is a **per-session listener** (subprocess spawned by a hook), not a machine-wide daemon. Each listener:
- Captures events via the agent's hook payloads (where available)
- Tails the agent's JSONL output on disk
- Normalizes into the internal schema
- Posts events to the server
- Is cheap and independent — multiple can run concurrently

### Per-Agent Adapters
Different coding agents expose observability data differently. The research phase for Slop Watch surfaced:
- **Claude Code**: Hooks exist but payloads don't include message content → must also read JSONL
- **Pi**: Hook surface via extension/skill API; JSONL output on disk
- **Codex**: Hooks flag-gated, Windows excluded
- **Copilot CLI**: Thin hooks, JSONL output
- **Open Code**: Plugin system

No single OpenTelemetry-based ingestion path exists across agents. Per-agent adapters are unavoidable.

### Development Identity
Observability events must be attributable to a person. Slop Watch V1 uses **admin-minted tokens**: the org admin creates a user record and provides a one-time token. The developer authenticates with it. Git config is trivially spoofable and insufficient.

### Team UX
Slop Watch is designed for a **team/org** context, not solo developers. The primary consumer is the DRI (Directly Responsible Individual) who reviews team sessions. Features include:
- Session listing per developer
- Live spectate (polling-based, ~5s refresh)
- Session cost breakdown by turn and model request
- Child session tracking for sub-agent delegations
- Admin plane for user management

## Related

- [[agent-evals]] — Evals run on trace data; observability is the substrate evals depend on
- [[agent-quality-loop]] — Traces → evals → scorers → code: observability is the first step in the flywheel
- [[wide-events]] — Same primitives (spans, structured data), different target: service request processing vs. agent decision chains
- [[axiom]] — Observability platform that can host agent decision-chain traces alongside service logs
- [[verification-loop]] — Traces as the input to the verification loop for agentic systems
- [[agent-experience]] — Designing for observability is an AX principle
- [[compounding-booboos]] — Tracing catches booboos in their decision context, not as isolated log lines
- [[tool-design-for-agents]] — Tool output design determines what's observable
- [[matt-pocock]] — Slop Watch stream: real-time observability platform ideation from DDD domain modeling through architecture decisions.

## Thread

- [[agent-quality-engineering]] — Observability as the visibility layer of the quality framework

## Sources

- `raw/The Observability Layer Your AI Agent Is Missing - youtube.com.md` — The Emma/invoice story, logs vs traces vs metrics, OpenTelemetry connection
- `raw/The Quality Loop Your AI Agent Is Missing (Evals + Tracing) - youtube.com.md` — Mastra Studio traces in practice: span trees, agent runs, tool calls
- `raw/yt-slop-watch-ideation.md` — Slop Watch architecture: sessions as DAGs of turns, per-session listener pattern, per-agent adapters, DRI-first UX
