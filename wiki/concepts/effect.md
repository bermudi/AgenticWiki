---
title: Effect
created: 2026-05-31
updated: 2026-05-31
sources:
  - raw/yt-effect-opencode-dax-raad.md
tags: [concept, typescript, functional-programming, framework, ai-engineering]
unaudited_marginal: 0
---

# Effect

> A TypeScript framework that bundles schema validation, service layers, streams, PubSub, and OpenTelemetry tracing into a single standard library. Historically seen as verbose and "enterprisey," it gained relevance as an AI guardrail framework — its explicit patterns and strict typing constrain LLM output, producing better code from AI assistants. [[dax-raad|Dax Raad]]'s team at [[opencode|OpenCode]] (~8M MAU) rewrote their entire codebase in Effect after discovering that verbosity is a feature, not a bug, when AI does the typing.

## Why It Matters for AI Engineering

[[dax-raad|Dax Raad]] identifies a structural shift in how developers should evaluate frameworks:

> "Historically, we kind of see really heavy boilerplatey frameworks, and we would hate it. But with AI, it's kind of the opposite. We're not doing the typing as much. So, I don't really care that much that the framework is boilerplate."

Effect's verbosity means that when an LLM reads a file, it encounters **explicit patterns** — strict types, branded IDs, service interfaces — that constrain what the model produces next. The AI "almost always does it correctly" in an Effect codebase because the patterns are unambiguous.

### The Token Spend Signal

After migrating to Effect, OpenCode's team saw their OpenAI token spend increase — meaning they were using the AI *more* because the results were better. At ~$30k/month for a 20-person team, the cost is roughly one extra engineer's salary, which Raad frames as acceptable given the quality improvement.

## Core Features

### Schema Validation

Effect includes a built-in schema library that replaces external tools like Zod. All data shapes in the OpenCode codebase are defined using Effect's schema system. The team aligns on schemas collaboratively — defining types first, then letting AI implement against those contracts.

### Branded Types

A standout feature: **branded types** prevent mixing semantically different values that share the same underlying type. The canonical example is paths — a function expecting an absolute path vs. a relative path:

```typescript
// Without branded types: both are just `string`
// With branded types: compiler catches the mismatch
type AbsolutePath = string & Brand<"AbsolutePath">
type RelativePath = string & Brand<"RelativePath">
```

This prevents real bugs — a function expecting an absolute path won't silently accept a relative one. The same pattern applies to IDs (model ID vs. provider ID vs. any other string).

### Services and Layers

Effect formalizes domain-driven design with first-class services. A service defines an interface; implementations can be swapped:

```typescript
// Interface: what the service does
interface GitService {
  findRepo(path: AbsolutePath): Effect<Repository>
  findRemote(repo: Repository): Effect<Remote>
}

// Implementation: how it does it (spawns git process)
const GitLive = Layer.succeed(GitService, { ... })

// Future: native git implementation
const GitNative = Layer.succeed(GitService, { ... })
```

Benefits:
- **Testability**: swap in a mock layer without changing the rest of the codebase
- **Replaceability**: OpenCode plans to swap process-spawning git for native libgit2 bindings
- **Isolation**: the rest of the codebase depends on the interface, not the implementation

### PubSub and Streams

Effect has built-in PubSub with features like late-subscriber catch-up (new subscribers get the last N events they missed). Streams provide backpressure-aware data consumption. Both are used for internal event systems and LLM response streaming.

### Auto-Instrumented Tracing

Every Effect function can be annotated with a string label that automatically emits an OpenTelemetry span. This gives OpenCode full tracing across their entire codebase with minimal manual instrumentation — every function call becomes observable in tools like Sentry.

### Type-Safe HTTP APIs

Effect enables defining API shapes as pure schema types, separate from implementation. The team aligns on endpoint definitions collaboratively, then implements them with full type safety. An OpenAPI specification is auto-derived from the schema definitions, and CI checks for unexpected breaking changes.

## The Standard Library Argument

Raad compares Effect's standard library to Go's — both invest heavily in a small number of well-thought-out primitives (IO interfaces in Go, streams and services in Effect) that compose across many use cases. "It's very rare that you need to reach outside of it."

## The Learning Curve

Effect requires shutting off existing opinions and doing things its way. Raad describes a "couple months" before it clicks, especially for developers new to functional programming. His team — mostly without FP experience — picked it up, but the initial ramp is real.

## Thread

- [[the-slop-problem]] — Effect's explicit patterns prevent the kind of vague, ambiguous code that LLMs turn into slop. The strictness acts as a guardrail.
- [[the-human-lever]] — Schema/interface design is the human's job; Effect makes this design-first workflow first-class. The human defines schemas, the AI implements.
- [[the-agent-workflow]] — Effect's auto-instrumented tracing enables the OTEL feedback loop where agents query their own traces to diagnose issues.

## Related

- [[ai-boilerplate-paradox]] — Why verbose frameworks like Effect become preferable with AI
- [[dax-raad]] — The engineer who led OpenCode's Effect migration
- [[opencode]] — The coding agent rewritten in Effect
- [[context-engineering]] — Effect's verbosity as context engineering for LLMs
- [[agent-observability]] — Auto-instrumented tracing as observability infrastructure


## Sources

- `raw/yt-effect-opencode-dax-raad.md` — Effect Miami 2026 talk: schema, branded types, services/layers, PubSub, streams, tracing, HTTP APIs, and the AI boilerplate inversion
