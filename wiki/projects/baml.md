---
title: BAML
created: 2026-07-15
updated: 2026-07-15
sources:
  - raw/yt-stop-reading-code-start-understanding-systems.md
tags: ["project", "observability", "tracing", "type-safety", "llm"]
unaudited_marginal: 0
---

# BAML

> BAML is a programming language for the AI era, created by Boundary ML (co-founded by [[vibv|Vibv]]). Its distinguishing feature is **compiler-level automatic instrumentation**: the compiler knows which functions call LLMs and automatically captures their inputs and outputs, with environment variables redacted, headers omitted, and repeated values deduplicated. The argument is that the fundamental flaw in most tracing systems is that users have to opt in — BAML makes tracing automatic for the parts that matter.

## Compiler-Level Auto-Instrumentation

BAML's tracing approach is architectural, not opt-in. The compiler has knowledge of which functions interact with LLMs (since BAML is a language designed for LLM interaction), and it uses that knowledge to automatically:

1. **Capture inputs and outputs** for any function that calls an LLM — no manual instrumentation required
2. **Redact environment variables** — any environment variable value is automatically omitted from traces
3. **Omit HTTP headers** — headers may contain authentication tokens, so they're excluded by default
4. **Deduplicate repeated values** — if the same image is passed around, it's not copied 60 times in the trace

This is the opposite of the traditional observability model where every function needs manual `@trace` decorators or OpenTelemetry span creation. The argument: "If you're writing LM's writing all your code, then like maybe an LM will write a trace here. But is it really also going to write trace there? Probably not. And now you just have a missing tracing system."

## Type-Safe Tracing

Because BAML is a typed language designed for LLM interactions, the tracing data carries type information. The compiler knows that `generate_image` returns an object with a `b64` field, and that its input `thing` is a string. This enables type-safe queries against trace data — you can write queries like:

```
User.images.generate_image where orgs.thing.length > 50 and latency > 1
```

with full type safety. This is the vision for agents as trace consumers: the agent can query its own execution history using the same type system it uses to write code. Queries against traces are as type-safe as the code that produced them.

## The OTEL Critique

Vibv critiques OpenTelemetry's type system as insufficient for rich tracing. OTEL accepts only: string, boolean, int, float, and sequences of each. The result:

- People JSON-serialize rich data into string attributes
- This bloats wire size by approximately 8x
- The JSON strings can't be queried — you can't write SQL-like queries against serialized JSON
- Performance suffers: 100 bytes of real data becomes 800 bytes on the wire
- You're forced to make tradeoffs about what to trace and what to skip

BAML's approach avoids this by embedding type information in the trace data itself. The compiler knows the shape of every value, so traces carry structured, queryable data without JSON serialization.

## Thread

- [[the-human-lever]] — BAML's compiler-level auto-instrumentation operationalizes the human lever: tracing is automatic, not dependent on the agent remembering to instrument
- [[agent-quality-engineering]] — BAML's type-safe tracing enables the quality loop by making traces queryable

## Related

- [[agent-observability]] — BAML provides the compiler-level tracing infrastructure that agent observability needs
- [[tracing-spectrum]] — BAML enables the code-time and post-execution layers of the tracing spectrum through auto-instrumentation
- [[wide-events]] — BAML's approach addresses the OTEL type-system limitation that wide events face
- [[tool-design-for-agents]] — BAML is designed from the ground up for AI-era tooling
- [[fighting-slop-with-slop]] — Boundary ML's "fighting slop with slop" philosophy: channel AI-generated slop into disposable tooling while keeping design docs rigorous
- [[vibv]] — Co-founder and CEO of Boundary ML

## Sources

- `raw/yt-stop-reading-code-start-understanding-systems.md` — Vibv's description of BAML's compiler-level auto-instrumentation, type-safe tracing, and the OTEL critique
