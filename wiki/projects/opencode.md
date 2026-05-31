---
title: OpenCode
created: 2026-05-31
updated: 2026-05-31
sources:
  - raw/yt-effect-opencode-dax-raad.md
tags: [project, coding-agent, typescript, effect, open-source]
unaudited_marginal: 0
---

# OpenCode

> An open-source coding agent (like [[claude-code|Claude Code]]) that works with any model, built by Anomaly. Approaching ~8M monthly active users when the team made the decision to rewrite the entire codebase using the [[effect|Effect]] framework in TypeScript — driven by correctness bugs at scale and the need for AI-friendly guardrails.

## The Rewrite

At ~8M MAU, every shortcut taken during rapid growth became a bug affecting thousands of users. [[dax-raad|Dax Raad]] describes the trigger: "Something that affects 1% of sessions is now affecting thousands, ten thousands of people every single day." The team discovered that "writing correct JavaScript is actually pretty hard" — most developers never handle abort signals, cancellation, or cleanup properly.

The decision to rewrite in [[effect|Effect]] was driven by two converging forces:

1. **Correctness at scale**: Edge cases that didn't matter at small scale became critical bugs at 8M MAU
2. **AI code quality**: Despite a culture that cared about code quality, "bad code gets out anyway" — AI mirrors patterns in the codebase, so vague patterns produce vague code

## Architecture in Effect

The rewrite is organized around Effect's service layer pattern:

- **Git service**: Interface defining git operations (find repo, find remote, find routes). Current implementation spawns git processes; planned future implementation uses native libgit2 bindings.
- **NPM service**: Embeds the same packages npm uses internally for dependency resolution, with full OpenTelemetry instrumentation to diagnose startup performance.
- **Event system**: Built on Effect's PubSub with late-subscriber catch-up and stream APIs for event consumption.
- **HTTP server**: Type-safe API definitions using Effect's schema system, with auto-generated OpenAPI specs and CI checks for breaking changes.

## Thread

- [[the-slop-problem]] — Correctness bugs at scale drove the rewrite; explicit frameworks constrain LLM output to prevent slop
- [[the-human-lever]] — Schema-first design as the human lever; the team aligns on data shapes before implementation
- [[the-agent-workflow]] — OTEL feedback loop where the agent queries its own traces to diagnose issues autonomously

## Related

- [[dax-raad]] — The engineer who led the rewrite
- [[effect]] — The framework used for the rewrite
- [[ai-boilerplate-paradox]] — The insight that drove the framework choice
- [[context-engineering]] — Effect's verbosity as context engineering for LLMs; explicit patterns maximize information-per-token density
- [[claude-code]] — A similar coding agent (proprietary)

## Sources

- `raw/yt-effect-opencode-dax-raad.md` — Effect Miami 2026 talk: the rewrite decision, architecture, and Effect features in practice
