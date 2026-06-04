---
title: Failure Modes
created: 2026-06-01
updated: 2026-06-03
sources:
  - raw/yt-when-to-use-small-lm-for-ai-agents-new-insights.md
  - raw/yt-building-pi-in-a-world-of-slop.md
  - raw/slowing-the-fuck-down.md
  - raw/2604.15597v1.pdf
  - raw/synthetic-truths-gemini-has-a-secret-code.md
  - raw/2407.08440v4.txt
  - raw/yt-mergeable-by-default-building-the-context-engine-to-save-time-and-tokens-peter-werry-unblocked.md
  - raw/yt-building-pi-and-what-makes-self-modifying-software-so-fascinating.md
  - raw/yt-the-comprehension-debt-trap-every-ai-dev-falls-into.md
  - raw/2311.04235v3.txt
  - raw/2603.00822v2.txt
  - raw/bias-in-the-loop-llm-judge-code.md
  - raw/2603.25133v1.txt
  - raw/2605.18747.pdf
  - raw/yt-no-vibes-allowed-dex-horthy.md
tags: [concept, ai-engineering, failure-modes, playbook, quality]
---

# Failure Modes

> A playbook mapping the known failure modes of AI-assisted engineering to their detection signals and countermeasures. Every entry links to the wiki page where the phenomenon is defined and sourced. The table is a navigational tool, not a replacement for the full analysis.

## The Master Table

| Failure mode | What it looks like | How to detect it | Countermeasure |
|---|---|---|---|
| [[slop]] | Working but architecturally poor code that degrades the codebase | PRs get larger and more frequent; code doesn't look like what an engineer would produce; "curse word metric" rises | [[verification-loop]] + [[grey-box-engineering]] + periodic [[improve-codebase-architecture]] review |
| [[compounding-booboos]] | Small errors accumulate into systemic failure | Document fidelity drops 25% after 20 interactions; short-term performance doesn't predict long-term | Frequent mechanical verification; [[deliberate-friction]] at delegation boundaries |
| [[execution-apathy]] | Model plans multi-step solution but resigns before executing | Trace shows detailed plan, zero tool calls; 39% early resignation at tier E | Decompose to ≤8 steps; require evidence bundle; never trust a plan without execution proof |
| [[blind-panic]] | Model loops and hallucinates tools when stuck | Repeated failed tool calls; step budget exhausted; invented tool names | Smaller task + fresh context; treat step budget exhaustion as [[backpressure]] signal |
| [[synthetic-truth]] | Authoritative, coherent content built on real elements with fabricated conclusions | Claim is "too perfect"; lacks source/timeline grounding; built on real grant/paper but with invented results | Source verification; timeline checks; apply friction — the human as last-mile defense |
| [[hallucination]] | Plausible but false facts, APIs, or citations | npm package that doesn't exist; citation to non-existent paper; API signature that looks right but isn't | Make tasks intrinsic (give refs in context); [[verification-loop]] |
| [[smart-zone-dumb-zone|Context degradation]] / [[smart-zone-dumb-zone|Dumb Zone]] | Model ignores constraints and hallucinates APIs as context fills | Long sessions get worse; model forgets design concept; attention degrades quadratically | Memento strategy (clear + reload minimal context); [[deep-vs-shallow-modules|deep modules]] as context boundaries |
| [[satisfaction-of-search]] | Agent stops retrieving after finding first plausible context | Agent proceeds with surface-level understanding; misses Slack decisions, incident reports, rejected PRs | Expert graphs as pivot points; layered retrieval; pre-built organizational memories |
| [[rule-following]] failure | Model violates persistent constraints despite explicit instructions | "Never reveal secret key" ignored; system messages provide negligible benefit | [[contextcov|ContextCov]] mechanical enforcement: PATH shims, Tree-sitter checks, graph validators |
| [[instruction-hierarchy]] collapse | Model fails to resolve conflicts among >3 privilege tiers | Multi-agent outputs contradict; style rules from different sources clash | Keep tiers ≤3 per resolution; decompose swarms; mechanical enforcement where possible |
| [[vibes-based-engineering]] | Accepting AI output without verification | No tests run; "looks right" acceptance; no [[verification-loop]] | Deterministic checks first; [[agent-evals]]; never ship on vibes |
| [[comprehension-debt]] | Human loses mental model of the codebase despite high velocity | Can't explain architecture; debugging skill degraded; bare-editor interview failure | Inquiry-mode sessions; teaching mode; periodic architecture review |
| automation bias | Lowering guard after one good output, missing errors in subsequent ones | Review quality degrades over session; less scrutiny after initial success | [[deliberate-friction]] at decision points; never skip verification regardless of prior success |
| [[llm-as-code-judge|LLM-as-judge]] unreliability | Judge says yes to everything; scores swing 25+ points with framing | Same code gets different scores based on prompt phrasing; checklist-level evaluation | Deterministic checks where possible; [[rubric-evaluation|rubric-level]] + reasoning; bias sensitivity analysis |
| oracle inadequacy | Tests pass but behavior is wrong; weak test suites exploited | Agent passes visible tests while breaking implicit invariants; false acceptance | Verification stack with explicit scope; evidence bundles declaring what is and isn't verified |
| agentic search low recall | Agent misses existing code, duplicates implementations | Code duplication increases; inconsistencies across similar features; agent can't find relevant code | Better indexing; [[code-intelligence]]; explicit codebase maps; [[unblocked|context engines]] |
| prompt-induced bias | Eval scores depend on candidate order and prompt framing | Swapping candidate order changes winner; 40+ point swings from ordering | Neutral prompt templates; candidate order randomization; structured rubrics |

## By Category

### Execution Failures

These occur when the model cannot complete the planned task:

- **[[execution-apathy]]** — The model recognizes cognitive load and avoids it. Silent, expensive in trust, cheap in tokens. Countermeasure: decompose before the model hits the ceiling. Evidence from [[agent-floor|AgentFloor]]: structured prompting telling models to "plan first then execute" didn't help GPT-5 and actively hurt Gemma 4.
- **[[blind-panic]]** — The model never gives up but degenerates into loops and tool hallucination. Expensive in tokens, detectable in traces. Countermeasure: step budget as [[backpressure]]; fresh context when loops emerge.
- **[[instruction-hierarchy]] collapse** — Different model architectures, same structural limit: too many privilege tiers break resolution. Countermeasure: design swarms so any single decision involves ≤3 tiers.

### Quality Failures

These degrade the artifact (code, document, decision) without crashing:

- **[[slop]]** — The umbrella term. Mechanisms: agents don't feel pain, training data converges to median, speed-review asymmetry. Countermeasure: [[verification-loop]] as the primary mechanical defense.
- **[[compounding-booboos]]** — The quantitative mechanism behind slop. [[delegate-52|DELEGATE-52]]: 25% content loss after 20 interactions for frontier models, 50% average. Countermeasure: [[deliberate-friction]] at delegation boundaries interrupts the compounding.
- **[[synthetic-truth]]** — Intent-aware fabrication, structurally perfect but unmoored from reality. Countermeasure: human verification — checking sources and timelines is the only defense.

### Context Failures

These occur when the model has the wrong information or too much of it:

- **Context degradation** — Attention degrades quadratically; long sessions produce worse code. Countermeasure: Memento strategy — clear everything, reload minimal high-signal context.
- **[[satisfaction-of-search]]** — Agent finds first plausible context and stops. Misses Slack decisions, incident reports, rejected PRs. Countermeasure: expert graphs as pivot points; don't cache answers.
- **Agentic search low recall** — Agent cannot find all relevant code in large codebases. Countermeasure: deep code intelligence over naive search; explicit maps.

### Human-in-the-Loop Failures

These are failures of the human's role, not the model's:

- **[[vibes-based-engineering]]** — Accepting output without verification. The root cause of most slop. Countermeasure: deterministic checks for everything that can be checked deterministically.
- **[[comprehension-debt]]** — Human outsources thinking but not understanding. Countermeasure: inquiry-mode sessions; teaching mode over delegation mode.
- **Automation bias** — One good output lowers guard. Countermeasure: [[deliberate-friction]] at decision points; treat every output as independent.

### Verification Failures

These occur when the quality infrastructure itself is compromised:

- **[[llm-as-code-judge|LLM-as-judge]] unreliability** — RUBRICEVAL: GPT-4o achieves 55.97% on hard rubric judgments. Countermeasure: deterministic checks where possible; rubric-level evaluation with reasoning when LLM judge is unavoidable.
- **Oracle inadequacy** — Tests pass but don't capture the real requirement. Countermeasure: verification stacks with explicit scope; evidence bundles.
- **Prompt-induced bias** — 40+ point accuracy swings from candidate ordering. Countermeasure: neutral templates; order randomization; structured rubrics.

## How to Use This Table

1. **When something goes wrong**, scan the "What it looks like" column for your symptom.
2. **Confirm the diagnosis** with the detection signal.
3. **Apply the countermeasure** — every entry links to a wiki page with full context and sources.
4. **When adding a new failure mode**, update this table and link to the defining concept page.

## Thread

- [[the-slop-problem]] — The thread that traces how failure modes compound into systemic quality degradation
- [[the-human-lever]] — The human's role as the last-mile defense against most of these failure modes
- [[agent-quality-engineering]] — The quality infrastructure that catches failure modes in production before they ship
- [[the-agent-workflow]] — Where deliberate friction, context hygiene, and verification loops fit in day-to-day operations
- [[harness-engineering]] — The emerging science of building harnesses that are executable, inspectable, stateful, and governed
- [[the-verifiability-thesis]] — Verifiability is the structural precondition for catching failure modes; unverifiable domains accumulate them silently
- [[the-benchmark-crisis]] — Benchmark gaming is itself a failure mode: the eval infrastructure is compromised, not just the models

## Related

- [[verification-loop]] — The primary mechanical countermeasure for most output-quality failure modes
- [[backpressure]] — The convergence mechanism that stops autonomous loops from spiraling
- [[deliberate-friction]] — Cognitive slowdown at decision points, before the change
- [[context-engineering]] — Keeping the model in the Smart Zone to prevent context degradation failures
- [[tool-design-for-agents]] — Well-designed tools prevent satisfaction-of-search and context-degradation failures
- [[agent-observability]] — Traces are how you detect execution-apathy, blind-panic, and compounding-booboos
- [[model-routing]] — Route tasks to models below their failure-mode ceiling
- [[grey-box-engineering]] — Own interfaces and verification, trust internals only to the degree the loop proves them
- evidence bundle — A proposed artifact that makes verification scope explicit
- verification stack — Composed verification artifacts with known scope and confidence
- inquiry mode — The human lever applied to comprehension-debt recovery
- Memento strategy — Clear context and reload minimal signal to escape the Dumb Zone
- expert graphs — Structured retrieval that bypasses satisfaction-of-search
- [[rubric-evaluation]] — How to structure LLM-as-judge to minimize bias and variance
- friction — The human verification step that catches synthetic truth
- [[critical-failure]] — Sparse catastrophic errors that explain most observed degradation in DELEGATE-52
- [[vibe-coding]] — Vibe coding without verification is the failure mode that most of this table is organized against

## Sources

- `raw/yt-when-to-use-small-lm-for-ai-agents-new-insights.md` — AgentFloor: execution apathy and blind panic quantified
- `raw/yt-building-pi-in-a-world-of-slop.md` — Slop concept, agents don't feel pain, compounding booboos
- `raw/slowing-the-fuck-down.md` — Merchants of learned complexity; training data ceiling
- `raw/2604.15597v1.pdf` — DELEGATE-52: quantitative compounding booboos; deliberate friction as circuit breaker
- `raw/synthetic-truths-gemini-has-a-secret-code.md` — Synthetic truth discovery and analysis
- `raw/2407.08440v4.txt` — RuleBench: inferential rule-following collapse; same narrative-priority mechanism as synthetic truth
- `raw/yt-mergeable-by-default-building-the-context-engine-to-save-time-and-tokens-peter-werry-unblocked.md` — Satisfaction of search in agent context retrieval
- `raw/yt-building-pi-and-what-makes-self-modifying-software-so-fascinating.md` — Deliberate friction; automation bias; comprehension debt
- `raw/yt-the-comprehension-debt-trap-every-ai-dev-falls-into.md` — Comprehension debt: inquiry mode vs delegation mode
- `raw/2311.04235v3.txt` — RuLES: system messages don't enforce rules; alignment tuning degrades rule-following
- `raw/2603.00822v2.txt` — ContextCov: executable verification vs LLM reflection; mechanical enforcement architecture
- `raw/bias-in-the-loop-llm-judge-code.md` — Prompt-induced bias in eval pipelines: 40+ point swings from ordering
- `raw/2603.25133v1.txt` — RUBRICEVAL: quantified LLM-as-judge unreliability
- `raw/2605.18747.pdf` — Code-as-Agent Harness survey: oracle adequacy and semantic verification (§5.2.1–5.2.2)
- `raw/yt-no-vibes-allowed-dex-horthy.md` — Verification loop as the vibes antidote
