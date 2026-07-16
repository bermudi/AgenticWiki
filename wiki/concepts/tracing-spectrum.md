---
title: Tracing Spectrum
created: 2026-07-15
updated: 2026-07-15
sources:
  - raw/yt-stop-reading-code-start-understanding-systems.md
tags: ["observability", "tracing", "design", "verification", "closed-loop"]
unaudited_marginal: 0
---

# Tracing Spectrum

> Observability operates at three layers, not just one: **design-time tracing** (type signatures, call stacks, architecture diagrams), **code-time tracing** (visualization of code structure without reading every line), and **post-execution tracing** (flame graphs, waterfall diagrams, span trees). All three layers close a feedback loop: design → code → execution → agent feedback → improved design. The argument is that post-execution tracing alone is insufficient — you need all three layers to build systems you can understand without reading every line.

The traditional observability story ends at post-execution: logs, metrics, traces. But [[vibv|Vibv]] (Boundary ML) argues this is only one-third of the picture. In a world where agents write most of the code and humans don't read every line, you need tracing at every stage of the development lifecycle.

## The Three Layers

### Design-Time Tracing

Before code is written, you need to understand the **shape** of the system: type signatures, function call graphs, sequence diagrams, architecture overviews. This is tracing in the sense of "tracing the outline" — sketching the structure before filling it in.

Dex Horthy references a colleague (Dylan, a principal engineer at Cloudflare) whose workflow is essentially design-time tracing: "Show me the call stack." He doesn't need to see every line of code, but he needs to understand the type signatures, the objects being created, and how they fit together. Mermaid diagrams, sequence diagrams, and architecture docs serve the same purpose.

This connects directly to the [[the-human-lever|human lever]]: the human owns the design layer, and design-time tracing is the tool that makes design authority practical. You can't own the interfaces if you can't see them.

### Code-Time Tracing

Once code is written, you need to understand its structure without reading every line. This is the "visualization" layer — dynamically rendering what the code does, showing call stacks, function relationships, and data flow at a glance.

Vibv describes this as the ability to "zoom out of the code and get the shape of everything." The Human Layer colleague shared a pattern: generating an HTML file per folder that explains changes at a high level, allowing the developer to digest 2,000 lines of code in a minute. If you want to drill in, you can — but first you get the overview.

This is the grey box in action: you don't read the internals, but you can see the boundaries and relationships. The BAML compiler contributes here by knowing which functions call LLMs and automatically capturing their I/O — the tracing is embedded in the code structure, not bolted on after.

### Post-Execution Tracing

The traditional observability layer: flame graphs, waterfall diagrams, span trees. After the code runs, you can see exactly what happened — which functions were called, where time was spent, where errors occurred.

This is what [[agent-observability]] covers in depth: OpenTelemetry spans, trace IDs, parent-child relationships. The difference from traditional distributed-systems tracing is the object being traced: a decision chain (agent) rather than a request path (service).

Vibv demonstrates this with a flame graph of an image generation pipeline — you can see that the bulk of time is spent in the HTTP send request, that the loop runs more iterations than expected (a bug — `attempts` wasn't incremented), and exactly where the execution diverged from the design. "Without any guessing, without digging through the codebase, without understanding the code ahead of time."

## The Closed Loop

The three layers form a feedback loop:

```
design → code → execution → agent feedback → improved design
```

The critical insight: post-execution tracing feeds back into design. When an agent runs and produces unexpected behavior, you can ask: "What's missing in the design that made the actual trace differ from the call site you drew me?" The agent can then refine the design — not just fix the code, but fix the *understanding* that produced the code.

This is the full-circle version of the [[agent-quality-loop]]: the existing quality loop is `code → traces → evals → scorers → back to code`. The tracing spectrum extends it to include the design layer:

```
design → code → traces → evals → scorers → back to design
```

The loop means you're not just debugging code — you're debugging the design assumptions that produced the code. Each iteration aligns what you expected with what actually happened.

## Why This Matters for Agentic Systems

In traditional software, the developer writes code and reads code. The tracing spectrum assumes a different workflow: the human designs, the agent writes, and both use tracing to understand what happened. This is the workflow [[the-human-lever|the human lever]] thread describes — the human owns design boundaries, the agent implements, and observability bridges the gap.

The spectrum is especially important for non-deterministic systems (LLM-based agents, probabilistic pipelines) where the same design can produce different execution paths. You can't rely on reading the code to understand what happened — the code is deterministic, but the model's behavior isn't. Tracing at all three layers is the only way to maintain understanding.

## Agents as Trace Consumers

A key requirement for the tracing spectrum: traces must be queryable by **agents**, not just visualizable for humans. Vibv argues for type-safe, schema-aware queryability — the ability to write queries like:

```
find everything where latency > 1s and the prompt contained "generate image"
```

with full type safety on the query. The BAML compiler knows the shape of data flowing through functions, so queries against traces can reference function names, parameter types, and return types. This turns traces from human-readable artifacts into machine-queryable data — the agent can introspect its own execution history.

This connects to [[tool-design-for-agents]]: observability infrastructure is tooling, and agents need tools that make traces queryable, not just viewable.

## The Expectation Gap

Vibv introduces a model for why tracing becomes more important as systems improve. The argument:

- As your system gets more capable, users build "insane expectations" about what it can do
- User expectations grow faster than system capability
- The delta between expected and actual is the real problem — not that the system is bad, but that the gap is widening
- More capability → more "reds" (unmet expectations)

This is a reframing of the observability imperative. The traditional argument for tracing is "debug failures." The expectation gap argument is "the better your system, the more you need tracing — because the failure surface grows with user expectations."

The implication: tracing isn't a cost you pay when things go wrong. It's an investment in understanding a system whose failure modes are expanding as it improves.

## Relationship to OpenTelemetry

The tracing spectrum uses OpenTelemetry as infrastructure but goes beyond it. OTEL provides the plumbing (spans, trace IDs, parent-child relationships, SDKs). The tracing spectrum adds:

1. **Design-time tracing** — not an OTEL concern (OTEL is runtime-only)
2. **Code-time tracing** — not an OTEL concern (requires compiler/language integration)
3. **Type-safe querying** — not an OTEL concern (OTEL's type system is limited; see [[wide-events]] for the OTEL critique)

OTEL is necessary but not sufficient. The tracing spectrum requires language-level and design-level integration that OTEL alone doesn't provide.

## Thread

- [[agent-quality-engineering]] — The tracing spectrum extends the quality loop to include the design layer
- [[the-human-lever]] — Design-time tracing is the tool that makes design authority practical

## Related

- [[agent-observability]] — Post-execution tracing for agent decision chains; the tracing spectrum extends this to design and code layers
- [[wide-events]] — The OTEL type-system critique; tracing spectrum requires richer type systems than OTEL provides
- [[agent-quality-loop]] — The quality loop is `code → traces → evals → code`; the tracing spectrum extends it to `design → code → traces → evals → design`
- [[grey-box-engineering]] — Code-time tracing is the grey box in action: see boundaries without reading internals
- [[tool-design-for-agents]] — Agents as trace consumers requires tooling that makes traces queryable
- [[baml]] — BAML's compiler-level auto-instrumentation enables type-safe tracing
- [[the-human-lever]] — Design-time tracing makes the human's design authority practical
- [[verification-loop]] — The tracing spectrum is the observability layer of the verification loop

## Sources

- `raw/yt-stop-reading-code-start-understanding-systems.md` — Vibv (Boundary ML) and Dex Horthy (Human Layer): the three-layer tracing model, the closed loop, the expectation gap, agents as trace consumers, OTEL type critique, compiler-level auto-instrumentation
