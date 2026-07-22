---
title: Vibv
created: 2026-07-15
updated: 2026-07-22
sources:
  - raw/yt-stop-reading-code-start-understanding-systems.md
  - raw/why-passing-benchmarks-doesnt-mean-your-ai-wrote-good-code.md
tags: ["author", "observability", "tracing", "type-safety", "programming-languages"]
unaudited_marginal: 0
---

# Vibv

> CEO and co-founder of [[baml|Boundary ML]], the company building BAML — a programming language for the AI era. Deeply focused on observability and tracing as the foundation for understanding systems in an age where humans don't read every line of code. Advocates for compiler-level automatic instrumentation, type-safe tracing, and agents as first-class trace consumers.

## Key Ideas

- **The tracing spectrum**: Observability operates at three layers — design-time (type signatures, call stacks), code-time (visualization), and post-execution (flame graphs, waterfall diagrams). All three close a feedback loop: design → code → execution → agent feedback → improved design.
- **Compiler-level auto-instrumentation**: The BAML compiler knows which functions call LLMs and automatically captures their I/O, with security-sensitive data (env vars, headers) redacted by default. "The fundamental flaw in most tracing systems is users have to opt in."
- **Type-safe tracing**: Because BAML is typed, traces carry type information. Queries against trace data are as type-safe as the code that produced them. This enables agents to be first-class trace consumers.
- **The expectation gap**: As systems get more capable, user expectations grow faster. More capability → more unmet expectations. Tracing isn't a cost you pay when things go wrong — it's an investment in understanding a system whose failure modes are expanding.
- **OTEL critique**: OpenTelemetry's type system (string, bool, int, float + sequences) forces JSON serialization of rich data, causing ~8x wire bloat and killing queryability.

## Related

- [[baml]] — The company and product Vibv co-founded
- [[tracing-spectrum]] — The three-layer tracing model Vibv advocates
- [[agent-observability]] — The broader observability context
- [[dex-horthy]] — Co-speaker on the "AI that Works" episode

## Sources

- `raw/yt-stop-reading-code-start-understanding-systems.md` — "AI that Works" episode with Dex Horthy on observability, tracing, and understanding systems
- `raw/why-passing-benchmarks-doesnt-mean-your-ai-wrote-good-code.md` — "AI that Works" episode (Boundary, 2026): co-hosted with [[dex-horthy|Dex Horthy]] on coding agent benchmarks — benchmark generations, the maintainability gap, the RL training constraint, the velocity framework, and a proposed evolving-codebase benchmark. **Note:** Multi-speaker source whose transcript lacks per-line speaker labels; attribution of specific claims to Vibv could not be verified against the audio. Claims are attributed to the video/discussion in [[the-benchmark-crisis]], not to Vibv individually.
