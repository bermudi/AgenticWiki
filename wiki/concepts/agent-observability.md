---
title: Agent Observability
created: 2026-04-27
updated: 2026-07-15
sources:
  - raw/yt-the-observability-layer-your-ai-agent-is-missing.md
  - raw/yt-the-quality-loop-your-ai-agent-is-missing-evals-tracing.md
  - raw/yt-slop-watch-ideation.md
  - raw/2504.21625v6.md
  - raw/2603.04474.md
  - raw/yt-stop-reading-code-start-understanding-systems.md
tags: ["agents", "observability", "tracing", "monitoring", "opentelemetry"]
unaudited_marginal: 0
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

### The OTEL Type-System Limitation

[[vibv|Vibv]] (Boundary ML) critiques OpenTelemetry's type system as insufficient for rich agent tracing. OTEL accepts only: string, boolean, int, float, and sequences of each. The result:

- People JSON-serialize rich data into string attributes
- This bloats wire size by approximately **8x** (100 bytes of real data → 800 bytes on the wire)
- The JSON strings can't be queried — you can't write SQL-like queries against serialized JSON
- Performance suffers, forcing tradeoffs about what to trace and what to skip

This is the same pattern [[wide-events]] identifies: OTEL is plumbing, not semantics. The type-system limitation means that even when you have rich tracing data, the transport layer degrades it to unqueryable strings. BAML's approach (typed traces with compiler-level knowledge of data shapes) is one solution; the broader lesson is that tracing infrastructure needs richer type systems than OTEL currently provides.

## Compiler-Level Auto-Instrumentation

[[baml|BAML]] takes a different approach to instrumentation: the compiler knows which functions call LLMs and automatically captures their inputs and outputs. No manual `@trace` decorators, no opt-in span creation. Security-sensitive data (environment variables, HTTP headers) is redacted by default, and repeated values are deduplicated.

The argument: "The fundamental flaw in most tracing systems is users have to opt in." If agents are writing code, they won't consistently add tracing — you'll get partial coverage with gaps that are invisible until you need them. Compiler-level instrumentation makes tracing complete by default for the functions that matter most.

This is the [[tracing-spectrum|code-time tracing]] layer made concrete: the tracing is embedded in the code structure, not bolted on after. The compiler's knowledge of the code's shape becomes the tracing's knowledge of the execution's shape.

## Agents as Trace Consumers

A critical requirement for agent observability: traces must be queryable by **agents**, not just visualizable for humans. [[vibv|Vibv]] argues for type-safe, schema-aware queryability — the ability to write queries like:

```
find everything where latency > 1s and the prompt contained "generate image"
```

with full type safety on the query. This turns traces from human-readable artifacts into machine-queryable data. The agent can introspect its own execution history, asking questions like: "Did I call `send`? How many times was `http.send` called?"

This is the next evolution of agent observability: not just "can a human see what the agent did?" but "can the agent see what it did?" The agent becomes the primary consumer of its own traces, using them to close the [[tracing-spectrum|feedback loop]] between execution and design.

## The Expectation Gap

[[vibv|Vibv]] introduces a model for why observability becomes more important as systems improve. The argument:

- As your system gets more capable, users build expectations about what it can do
- User expectations grow faster than system capability
- The delta between expected and actual is the real problem — not that the system is bad, but that the gap is widening
- More capability → more "reds" (unmet expectations)

This reframes the observability imperative. The traditional argument for tracing is "debug failures." The expectation gap argument is "the better your system, the more you need tracing — because the failure surface grows with user expectations." Tracing isn't a cost you pay when things go wrong; it's an investment in understanding a system whose failure modes are expanding as it improves.

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

## Claim-Provenance Observability: The Lineage Graph

[[genealogy-governance|Xie, Zhu, Zhang et al. (2026)]] extend observability from the decision-chain layer (Slop Watch's session → turn → model-request DAG) to the **atomic-claim layer**. The governance layer maintains a directed **Lineage Graph** `L = (V, E)` recording the provenance of every atomic claim that flows through the MAS: which agent emitted it, which agents received it, whether it was confirmed (Green), contradicted (Red), or held unverified (Yellow), and the correction history if rollback was triggered.

This is observability applied to *claim propagation* rather than decision execution. Where Slop Watch answers "what did the agent do and why," the Lineage Graph answers "where did this belief come from, who propagated it, and was it ever verified?" The offline mode supports forensic analysis: auditors can replay historical logs through the pipeline to reconstruct the Lineage Graph, identify root or high-degree nodes that introduced corrupted beliefs, trace propagation across agents and time, and approximate the `S(t)` infection trajectory — the multi-agent analog of walking a trace tree to find where a single-agent decision went wrong.

The two layers are complementary: Slop Watch's session/turn/model-request hierarchy captures *execution* observability (what the agent did); the Lineage Graph captures *epistemic* observability (what the agent believed and whether the belief was justified). A complete MAS observability stack needs both.

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
- [[mastra]] — Mastra Studio provides agent tracing with span trees, cost breakdowns, and child session tracking.
- [[slop-watch]] — Slop Watch extends observability from plumbing to DRI-level accountability.
- [[execution-apathy]] — Execution apathy is invisible to system metrics; only trace-level observability can detect the missing execution steps
- [[blind-panic]] — Blind panic produces expensive failure traces that observability must distinguish from productive execution
- [[iterative-self-correction]] — Meeseeks's evaluation-feedback cycle requires per-constraint observability to identify which constraints fail across turns
- [[genealogy-governance]] — the Lineage Graph as claim-provenance observability: extends the session/turn/model-request hierarchy to the atomic-claim layer; epistemic observability (what was believed and whether it was justified) complementing execution observability
- [[error-cascades]] — the propagation model the Lineage Graph makes observable; `S(t)` infection trajectory as the multi-agent analog of walking a trace tree
- [[tracing-spectrum]] — extends observability from post-execution to design-time and code-time layers; the closed loop between execution traces and design refinement
- [[baml]] — compiler-level auto-instrumentation that makes tracing automatic for LLM-calling functions; addresses the "opt-in" problem
- [[vibv]] — advocate for agents as trace consumers and the expectation gap model

## Thread

- [[the-slop-problem]] — Observability catches slop in its decision context, not as isolated log lines; the concrete response to agent-driven quality degradation
- [[the-agent-workflow]] — The OTEL feedback loop where agents query their own traces is observability as workflow infrastructure
- [[agent-quality-engineering]] — Observability as the visibility layer of the quality framework

## Sources

- `raw/yt-the-observability-layer-your-ai-agent-is-missing.md` — The Emma/invoice story, logs vs traces vs metrics, OpenTelemetry connection
- `raw/yt-the-quality-loop-your-ai-agent-is-missing-evals-tracing.md` — Mastra Studio traces in practice: span trees, agent runs, tool calls
- `raw/yt-slop-watch-ideation.md` — Slop Watch architecture: sessions as DAGs of turns, per-session listener pattern, per-agent adapters, DRI-first UX
- `raw/2504.21625v6.md` — Meeseeks (Wang et al.): constraint-level evaluation requires observability at the individual constraint granularity across multiple self-correction turns
- `raw/2603.04474.md` — Xie, Zhu, Zhang et al. (City University of Macau + Minzu University, arXiv 2603.04474v2, 11 May 2026). §VI the Lineage Graph as claim-provenance observability; offline replay mode for forensic analysis of belief propagation. Source for the "Claim-Provenance Observability" section.
- `raw/yt-stop-reading-code-start-understanding-systems.md` — Vibv (Boundary ML): OTEL type-system critique (8x wire bloat, unqueryable JSON), compiler-level auto-instrumentation in BAML, agents as type-safe trace consumers, the expectation gap model
