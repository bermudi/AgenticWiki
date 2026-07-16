---
title: Wide Events
created: 2026-04-28
updated: 2026-07-15
sources:
  - raw/yt-youre-logging-wrong.md
  - raw/yt-stop-reading-code-start-understanding-systems.md
unaudited_marginal: 0
tags: ["observability", "logging", "production-engineering", "opentelemetry", "patterns"]
---

# Wide Events

> A logging pattern where a single context-rich event is built up throughout a request lifecycle and emitted once at the end, replacing scattered log lines with queryable structured data. One event per request per service, containing everything needed to debug — user context, business context, error details, performance data. When an agent ships code to production, it should be shipping wide events, not console.log.

Traditional logging is optimized for writing (easy `console.log`) but not for querying. In distributed systems where a single request touches 15 services, scattered string logs are archaeology. Wide events turn debugging into analytics: structured data you can query with SQL instead of grep.

## The Pattern

Instead of logging at every step — "received request," "parsed body," "validated JWT," "created order," "payment failed" — you:

1. **Create an event at the start** of the request
2. **Attach context as it becomes known**: user ID when authenticated, cart data when loaded, feature flags, subscription tier, error details when they occur
3. **Emit once at the end** — one event with 50+ fields covering the full picture

```
// NOT this — scattered, unqueryable
console.log("payment failed")
console.log("user:", userId)

// THIS — accumulated, emitted once
event.userId = userId           // attached when authenticated
event.paymentError = "insufficient_funds"  // attached when it fails
event.cartTotal = 142.50        // attached when cart loads
emit(event)                     // one emission at the end
```

The mental model shift: **don't log what your code is doing, log what happened to the request.**

## Why Traditional Logging Fails at Scale

- **Interleaving**: With concurrent users, log lines from different requests interleave. You can't trace one user's journey.
- **String search is broken**: User IDs logged in six different formats (`user=123`, `userId:123`, `user_id=123`) across services. Downstream services log order IDs, not user IDs — now you're playing connect-the-dots across three searches.
- **Missing context**: The code had the subscription tier, cart value, and feature flags in scope. They just weren't logged. String search can't surface what was never written.
- **Logs are write-optimized**: Easy to dump data, hard to find it later. The developer dropping `console.log("payment failed")` at 2pm doesn't suffer; the on-call engineer at 2am does.

## Wide Events vs. Structured Logging

**Structured logging** (JSON instead of strings) is necessary but not sufficient. You can have structured logs with five fields, no user context, scattered across 20 log lines — still useless. Wide events are a **philosophy**: one comprehensive event per request, not just JSON formatting.

## The Role of OpenTelemetry

OTEL is plumbing — a protocol and SDK for collecting telemetry. It standardizes format and avoids vendor lock-in. **It does not decide what to log.** You still instrument deliberately. OTEL without business context is just standardized noise.

### The Type-System Limitation

[[vibv|Vibv]] (Boundary ML) adds a sharper critique: OTEL's type system accepts only string, boolean, int, float, and sequences of each. The result is that people JSON-serialize rich data into string attributes — bloating wire size by approximately **8x** (100 bytes → 800 bytes) and rendering the data unqueryable. You can't write SQL-like queries against serialized JSON strings.

This is a structural limitation on wide events at scale. If you want 50+ fields per event with rich nested types, OTEL's type system forces you into a choice: either serialize to strings (losing queryability and bloating bandwidth) or flatten your data model (losing structure). [[baml|BAML]]'s approach — compiler-level type knowledge embedded in traces — is one escape from this constraint. The broader lesson: wide events need richer type systems than OTEL currently provides.

The right approach: use OTEL as the delivery mechanism, but attach wide-event context to spans. In practice with Effect (TypeScript), this means annotating the current span throughout the request:

```typescript
// Annotate as context becomes available
span.setAttribute("chat.threadId", threadId)
span.setAttribute("attachment.type", fileType)
span.setAttribute("user.subscriptionTier", tier)

// On error, attach error context
span.setAttribute("error.type", "payment_declined")
span.setAttribute("error.code", stripeDeclineCode)
```

The span accumulates context. When emitted, it contains everything. T3 Chat does this 42 times across 15 files — context is added wherever it naturally exists in the call tree, not passed down in a god object.

## Cardinality and Dimensionality

- **Cardinality**: number of unique values a field can have. User ID = high cardinality (millions of values). HTTP method = low cardinality (handful). **High cardinality fields are what make logs useful.** The irony: most logging systems charge by volume and choke on high cardinality fields.
- **Dimensionality**: number of fields in an event. More dimensions = more questions you can answer. A 50-field event tells you things a 5-field event can't.

The essential-but-high-cardinality quadrant: session ID, user ID, request ID, trace ID — these are what you search by. The essential-but-low-cardinality quadrant: error codes, endpoint paths. The non-essential fields (environment, HTTP method) are often redundant with where you're already looking.

## Tail Sampling for Cost Control

Storing 100% of wide events at scale is expensive. Naive random sampling (keep 10%) is dangerous — you have a 90% chance of missing any specific error.

**Tail sampling** decides after the request completes:
- Always keep **errors**
- Always keep **slow requests** (above P99)
- Always keep **VIP users** and internal test accounts
- Randomly sample **happy, fast requests** (1–5%)

Theo disagrees slightly — he'd prefer keeping all requests for 7 days and letting retention, not ingest, drive cost. Platforms that bill on retention (like Axiom: 500GB free, 1TB/30 days for $35/mo) make full capture viable.

## Why This Matters for Agent-Produced Code

When an [[afk-agent|AFK agent]] ships a feature to production, it's shipping its logging. If the agent defaults to `console.log("it broke")`, you get a production system you can't debug. Wide events should be a **non-negotiable pattern in agent-generated code**:

- Agents should instrument with structured context, not string logs
- Context that exists in scope (user data, feature flags, error details) must be attached to the event
- The emit-once-at-the-end pattern is teachable — it's a rule, not a judgment call
- Review (human or automated) should flag bare `console.log` in production paths as a defect

This connects directly to [[tool-design-for-agents]]: observability infrastructure is tooling, and agents need tools that make wide events easy (OTEL SDKs, Effect-style span annotation). It also connects to [[agent-quality-engineering]]: you can't improve what you can't see. Wide events make agent-shipped code debuggable.

## The Feedback Loop

The harsh reality: no matter how thorough your wide events, you'll still miss fields. Some outage will happen where the one piece of context you needed wasn't attached. **This is a feature, not a bug.** The loop is:

1. Outage happens → context is missing
2. Add the missing field to the event
3. Next outage → you have it

This is the same shape as the [[agent-quality-loop]] — production failures driving improvement, not one-off fixes. Each gap you fill makes the next incident faster to resolve.

## Thread

- [[agent-quality-engineering]] — Wide events as the production observability layer that agents must ship with their code
- [[tool-design-for-agents]] — Tool output design determines whether wide events are emitted at agent scale

## Related

- [[agent-observability]] — Same primitives (spans, trace IDs, structured data), different target: agent decision chains vs. service request processing
- [[agent-quality-loop]] — The same feedback loop shape: production gaps → add missing data → next time you have it
- [[tool-design-for-agents]] — Observability tooling is a tool design concern; agents need OTEL SDKs that make wide events easy
- [[afk-agent]] — AFK agents ship code to production; that code needs wide events
- [[backpressure]] — Wide events provide the data that backpressure decisions depend on
- [[axiom]] — Observability platform that makes wide events economically viable at scale (retention-based pricing, columnar backend)
- [[baml]] — BAML's typed tracing approach addresses the OTEL type-system limitation that wide events face
- [[vibv]] — Source of the OTEL type-system critique
- [[tracing-spectrum]] — Wide events address the post-execution layer; tracing spectrum extends to design-time and code-time layers
- [[the-human-lever]] — Wide events are the production observability layer that the human lever requires to verify agent-shipped code

## Sources

- `raw/yt-youre-logging-wrong.md` — Theo (t3.gg) reacting to Boris's article on wide events, canonical log lines, OTEL, and tail sampling
- `raw/yt-stop-reading-code-start-understanding-systems.md` — Vibv (Boundary ML): OTEL type-system critique (8x wire bloat, unqueryable JSON), compiler-level type knowledge as escape from OTEL constraints
