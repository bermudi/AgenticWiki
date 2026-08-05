---
title: BAML
created: 2026-07-15
updated: 2026-08-05
sources:
  - raw/fighting-slop-with-slop-vaibhav-gupta-boundary.md
  - raw/yt-stop-reading-code-start-understanding-systems.md
  - raw/boundary-context-shards-shared-memory.md
  - raw/how-to-test-new-ai-models-before-they-break-production.md
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

## The "AI that Works" Podcast

BAML's co-founder [[vibv|Vibv]] appears as a recurring guest on Boundary's "AI that Works" podcast. A July 2026 episode — "Building a Shared Memory System for AI Coding Agents" — featured [[dex-horthy|Dex Horthy]] (HumanLayer) designing the **[[context-shards]]** memory-sourcing feature live: a volume-based, team-aggregated, human-in-the-loop pipeline that mines recurring instructions from agent sessions. The episode is a primary source for the context-shards concept and for the slop critique of additive-only memory systems (Claude memory, CodeRabbit). See [[the-slop-problem]] and [[agent-memory-systems]] for how the design maps onto the wiki's memory theory.

## Compiler-Proven Error Handling

Vaibhav's conference talk ([`raw/fighting-slop-with-slop-vaibhav-gupta-boundary.md`](../raw/fighting-slop-with-slop-vaibhav-gupta-boundary.md)) demonstrates a first-principles error model: the compiler **infers which errors a function throws** and propagates that knowledge through the call graph. `divide` throws a division-by-zero error; the `calculate` function that calls it "also knows it throws division by zero error" — "without you having to write any code" ([15:44]–[16:08]). Consequences:

- **Exhaustive guarantees**: "if you catch or handle errors, we can do exhaustive guarantees, and the compiler can prove that you have handled the error or not handled the error. It's no more guessing. There's no unknowns. It's guaranteed to be proven" ([16:10]–[16:22]).
- **Constraint checking at the API boundary**: an API that "guarantees that it never throws" is rejected as broken when the inferred error set is non-empty ([16:23]–[16:35]).
- **Handling as proof**: catching an exception and returning a sentinel value transforms the function's inferred error set — the caller is then "guaranteed to no longer throw the division by zero error" ([16:53]–[17:05]).

The framing is explicitly a trust argument: we trust compilers whose internals we don't know, so code we don't read is acceptable when the underlying system is rigid enough; ML code isn't trusted yet precisely because "the systems underneath them don't have enough rigidity" ([17:06]–[17:26]).

## Agent-First Tooling and Functions as CLI

The talk positions BAML's tooling around agents rather than humans reading code:

- **Description over search**: instead of ripgrep, ask "can you describe `calculate` for me?" and get docstrings, source, and every usage site in a single tool call — "something that used to be multiple tool calls a single tool call all of a sudden" ([12:07]–[12:46]); external libraries answer the same way, no web search needed ([12:49]–[13:00]). The underlying principle: "the code is always the source of truth... The docs may lie... but the code cannot lie" ([13:01]–[13:19]).
- **Every function is a CLI command**: `add` becomes a runnable command with `A`/`B` parameters; functions bundle into standalone CLI binaries that run without executing the program — "type safe, deterministic, and actually guessable," cross-platform including WASM ([13:36]–[14:44]).
- **Code visualization with opt-in reading**: navigating the codebase as an interactive map that expands to exact lines — "instead of having to understand all the code, I can opt into what parts of the code I want to read" and consciously leave the rest: "Nope, that's too much slop. Let's let that be slop" ([9:38]–[10:33]).
- **Execution tracing at near-zero cost**: because tracing is designed in from first principles, "you can make this effectively zero performance cost," and every file carries a tracing system "Claude can navigate through" to find bugs, errors, and inefficiencies without the human ([10:34]–[11:24]).

## ML From Any Language

BAML functions are callable from existing languages — "Python to TypeScript to Rust to Go to Ruby to Java" — with full type safety, including async variants, and with lambdas, generics, and closures passing across language boundaries (e.g., a `with_timeout` function receiving a Python lambda) ([18:02]–[19:08]). The stated payoff: "so when the agent does something, the type system never lies. The type system becomes the absolute center of truth that prevents invariants from entering your codebase" ([19:09]–[19:18]).

> [!note] Evidence gap: single-source capability claims
> The capabilities in this section (compiler-proven error inference, near-zero-cost tracing, functions-as-CLI, describe-over-search, opt-in reading, cross-language lambdas) and the closing claim that "one of our engineers built a partial C compiler purely in BAML" ([19:53]–[19:55]) come from a single promotional conference talk and are not independently verified. Treat as vendor-reported claims, not measured results.

> [!note] Transcription artifact
> The talk's closing line is "I work on Bemo" ([21:11]) — almost certainly a transcription garble of "BAML"/"Boundary," consistent with the speaker's earlier references and the talk's title.

## Prompt Optimizer and the Pareto Frontier

BAML includes a built-in **prompt optimizer** that can tune prompts against input/output token pairs. In the [[model-swap-evals|model-swap eval]] context ([[kevin-gregory|Kevin Gregory]], Boundary "AI that Works," 2026), this addresses the case where no candidate model strictly wins on all three dimensions (accuracy, cost, latency) — the candidates sit on a Pareto frontier (one is cheapest, one is fastest, one is most accurate). The optimizer can take the different pieces of the frontier and produce an optimized prompt that is the best compromise across all three, useful when a model deprecation forces a switch and no single replacement dominates.

## Thread

- [[the-human-lever]] — BAML's compiler-level auto-instrumentation operationalizes the human lever: tracing is automatic, not dependent on the agent remembering to instrument

## Related

- [[agent-observability]] — BAML provides the compiler-level tracing infrastructure that agent observability needs
- [[agent-quality-engineering]] — BAML's type-safe tracing enables the quality loop by making traces queryable (one-way link; the thread itself does not reference BAML)
- [[agent-friendly-tooling]] — BAML's agent-first tooling (describe-over-search, functions-as-CLI, opt-in reading) directly instantiates this concept
- [[tracing-spectrum]] — BAML enables the code-time and post-execution layers of the tracing spectrum through auto-instrumentation
- [[wide-events]] — BAML's approach addresses the OTEL type-system limitation that wide events face
- [[tool-design-for-agents]] — BAML is designed from the ground up for AI-era tooling
- [[fighting-slop-with-slop]] — Boundary ML's "fighting slop with slop" philosophy: channel AI-generated slop into disposable tooling while keeping design docs rigorous
- [[vibv]] — Co-founder and CEO of Boundary ML
- [[context-shards]] — The memory-sourcing feature designed live on the "AI that Works" podcast (featuring Vibv as a guest)
- [[model-swap-evals]] — BAML's prompt optimizer handles the Pareto frontier case when no model strictly dominates
- [[kevin-gregory]] — Demonstrated BAML's prompt optimizer in the model-swap eval context

## Sources

- `raw/fighting-slop-with-slop-vaibhav-gupta-boundary.md` — Vaibhav Gupta's AI Engineer talk: the origin talk for the fighting-slop-with-slop practice at Boundary; compiler-proven error handling; agent-first tooling (describe-over-search, functions-as-CLI, opt-in reading, near-zero-cost tracing); ML-from-any-language with cross-boundary lambdas; the partial-C-compiler anecdote. Solo talk; attribution direct.
- `raw/yt-stop-reading-code-start-understanding-systems.md` — Vibv's description of BAML's compiler-level auto-instrumentation, type-safe tracing, and the OTEL critique
- `raw/boundary-context-shards-shared-memory.md` — Boundary "AI that Works" livestream (July 2026): context-shards feature designed live with Dex Horthy; the memory-slop critique of additive-only systems. Multi-speaker; quotes attributed to the discussion, not verified per speaker.
- `raw/how-to-test-new-ai-models-before-they-break-production.md` — Boundary "AI that Works" (2026): [[kevin-gregory|Kevin Gregory]] demonstrates BAML's prompt optimizer for the Pareto frontier case in model-swap evals. Multi-speaker; attribution based on contextual cues, not verified against audio.
