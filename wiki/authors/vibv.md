---
title: Vibv
created: 2026-07-15
updated: 2026-08-05
sources:
  - raw/fighting-slop-with-slop-vaibhav-gupta-boundary.md
  - raw/yt-stop-reading-code-start-understanding-systems.md
  - raw/why-passing-benchmarks-doesnt-mean-your-ai-wrote-good-code.md
  - raw/boundary-context-shards-shared-memory.md
  - raw/yt-can-an-ai-out-plan-a-senior-engineer.md
tags: ["author", "observability", "tracing", "type-safety", "programming-languages"]
unaudited_marginal: 0
---

# Vibv

> CEO and co-founder of [[baml|Boundary ML]], the company building BAML — a programming language for the AI era. Deeply focused on observability and tracing as the foundation for understanding systems in an age where humans don't read every line of code. Advocates for compiler-level automatic instrumentation, type-safe tracing, and agents as first-class trace consumers. Originator of the [[fighting-slop-with-slop]] concept.

> [!note] Identity
> This page is titled "Vibv" (the name used in Boundary's "AI that Works" podcast), but the AI Engineer conference talk credits the speaker as **Vaibhav Gupta, Boundary** — the same company, product, and role (CEO/co-founder of BAML). The wiki treats these as the same person; the rename question (`vibv.md` → `vaibhav-gupta.md`) is flagged for human decision.

## Key Ideas

- **The tracing spectrum**: Observability operates at three layers — design-time (type signatures, call stacks), code-time (visualization), and post-execution (flame graphs, waterfall diagrams). All three close a feedback loop: design → code → execution → agent feedback → improved design.
- **Compiler-level auto-instrumentation**: The BAML compiler knows which functions call LLMs and automatically captures their I/O, with security-sensitive data (env vars, headers) redacted by default. The argument: the fundamental flaw in most tracing systems is that users have to opt in and write the tracing code themselves, per function — which agents won't reliably do ([35:11]–[35:29]).
- **Type-safe tracing**: Because BAML is typed, traces carry type information. Queries against trace data are as type-safe as the code that produced them. This enables agents to be first-class trace consumers.
- **The expectation gap**: As systems get more capable, user expectations grow faster. More capability → more unmet expectations. Tracing isn't a cost you pay when things go wrong — it's an investment in understanding a system whose failure modes are expanding.
- **OTEL critique**: OpenTelemetry's type system (string, bool, int, float + sequences) forces JSON serialization of rich data, causing ~8x wire bloat and killing queryability.
- **Originator of "fighting slop with slop"** (AI Engineer conference talk, 2026): the engineering triad (no code reviews, parallel work, no AI standardization) backed by invariant tooling — `architecture.md` instead of `CLAUDE.md`, design docs that must be read, dependency-graph CI guarantees, and agent-transcript inspection as review. The livestream referenced "a talk on this at the AIN conference… soon on YouTube" ([5:24]–[5:32]); identifying the AIN conference with the AI Engineer channel is the wiki's inference, not stated in either source. The phrase is his title, so the talk is the primary origin; the livestream's "Fib" ([2:36]: "my name's Fib. I work on a programming language called BAML") is likely the transcript garbling his own name — the dichotomy is source precedence (talk primary, livestream secondary), not two distinct people (see [[fighting-slop-with-slop]]).
- **Reading-relative slop definition**: "Slop is just any code you don't read." Slop is monotonic — "this is the least amount of slop that your code base will ever have." See [[slop]].
- **Trust, not review**: "Code is a matter of trust" — we trust compilers we don't understand; ML code isn't trusted yet because "the systems underneath them don't have enough rigidity." Rigidity (compiler-proven invariants) is the substitute for reading.
- **Foundation-layer critique ("lose the war")**: TypeScript's design goal balances correctness against *human* productivity, so "slop [is] baked into the language" (`sort` → strings; the slide's second example, which the wiki reads as `any`); JavaScript's layering (CoffeeScript → TypeScript → …) patches a broken substrate. The fix is new foundations: "we do need a new Git. I think we do need a new database, and yes, I think we need a new programming language."
- **Compiler-proven error handling**: BAML infers which errors a function throws and propagates that through the call graph, so the compiler can prove exhaustive error handling — "no more guessing. There's no unknowns. It's guaranteed to be proven." See [[baml]].
- **Agent-first tooling**: "describe calculate for me" returning docstrings + source + usages in one tool call; every function available as a standalone CLI binary; code visualization with opt-in reading ("let that be slop"). "The code cannot lie" — docs may lie, code is the source of truth. See [[agent-friendly-tooling]].
- **Data-driven language design**: agents constantly generate BAML programs, transcripts are inspected for tool-call efficiency, humans triage real vs. hallucinated vs. no-taste issues, and language features are AB-tested by tool calls / errors / correctness — "data-driven systems without ever writing a single line of code." See [[agent-evals]].

## Related

- [[baml]] — The company and product Vibv co-founded
- [[tracing-spectrum]] — The three-layer tracing model Vibv advocates
- [[agent-observability]] — The broader observability context
- [[dex-horthy]] — Co-speaker on the "AI that Works" episode
- [[context-shards]] — Guest on the livestream where Dex Horthy designed the context-shards feature
- [[the-slop-problem]] — The "AI that Works" episode sharpens the additive-only memory failure as a slop source; the conference talk adds the foundation-layer slop argument
- [[fighting-slop-with-slop]] — The concept Vibv originated in his AI Engineer conference talk

## Sources

- `raw/fighting-slop-with-slop-vaibhav-gupta-boundary.md` — Vaibhav Gupta's AI Engineer talk: origin of the fighting-slop-with-slop concept; the engineering triad and invariant toolchain; the reading-relative slop definition; trust-not-review; compiler-proven error handling; agent-first tooling; data-driven language design; the foundation-layer "lose the war" critique. Solo talk, so speaker attribution is direct.
- `raw/yt-stop-reading-code-start-understanding-systems.md` — "AI that Works" episode with Dex Horthy on observability, tracing, and understanding systems
- `raw/why-passing-benchmarks-doesnt-mean-your-ai-wrote-good-code.md` — "AI that Works" episode (Boundary, 2026): co-hosted with [[dex-horthy|Dex Horthy]] on coding agent benchmarks — benchmark generations, the maintainability gap, the RL training constraint, the velocity framework, and a proposed evolving-codebase benchmark. **Note:** Multi-speaker source whose transcript lacks per-line speaker labels; attribution of specific claims to Vibv could not be verified against the audio. Claims are attributed to the video/discussion in [[the-benchmark-crisis]], not to Vibv individually.
- `raw/boundary-context-shards-shared-memory.md` — Boundary "AI that Works" livestream (July 2026): guest on the episode where Dex Horthy designed the context-shards feature live; the memory-slop critique of additive-only systems. **Note:** Multi-speaker livestream; transcript lacks per-line speaker labels, so quotes are attributed to the discussion, not to Vibv individually.
- `raw/yt-can-an-ai-out-plan-a-senior-engineer.md` — Boundary "AI that Works" episode (Fib/Vibv + Kevin Gregory): the AIN-conference talk reference ([5:24]–[5:32]) and the "my name's Fib" self-introduction ([2:36]) cited in the Originator bullet. Multi-speaker source; attribution not verified against audio.
