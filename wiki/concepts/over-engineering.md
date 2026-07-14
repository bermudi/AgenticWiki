---
title: Over-Engineering
created: 2026-07-14
updated: 2026-07-14
sources:
  - raw/deepswe-failure-analysis.md
unaudited_marginal: 0
tags: [concept, failure-mode, coding-agents, software-design, minimality, agent-quality]
---

# Over-Engineering

> A coding-agent failure mode where the patch adds far more than the task requires — speculative abstractions, wrapper types, indirection layers, whole-file rewrites — and the extra surface area is where the bugs live. More code is more bug surface, not more capability. Isolated and quantified in [[deepswe]] trajectory analysis, where the most over-built patches consistently failed tasks that more minimal patches passed.

## The Pattern

The agent reaches for abstraction and indirection by default: a new wrapper struct where a function would do, a parallel pipeline where extending the existing one would do, a general framework where a focused fix would do. Each added layer is another place an invariant can break, a nil can hide, a path can go untested. The patch grows; correctness does not. The failing behavior is not the abstraction itself but the *bug surface the abstraction introduces* — race conditions, nil-pointer dereferences, and unreachable code paths that a minimal change would never have created.

## Evidence from [[deepswe]]

Open-weight models (especially glm-5.1) consistently write 2–3× the code GPT-5.5 writes for the same task, and the extra code is where they fail.

**`dasel-html-document-format`** (glm-5.1) — **2483 lines** added, nearly 2× GPT-5.5's 1279, building a full HTML DOM with CSS-selector support, parent/child/sibling traversal, and entity decoding that no test requires. The same nil-pointer round-trip bug that bites the smaller patches bites this one too — with more paths to miss. GPT-5.5's focused read/write format passes.

**`pebble-durability-wait-apis`** (glm-5.1) — +1347/-13 across 12 files, adding wrapper structs and helper layers around the durability-wait logic. GPT-5.5 adds the logic directly to the existing commit pipeline (+987/-54 across 15 files, each change minimal). GLM's extra indirection introduces the race conditions and nil-pointer bugs that fail the task. More files touched, more abstraction, worse outcome.

**`adaptix-name-mapping-aliases`** — Models that create *new helper functions* for alias resolution instead of extending the existing name-lookup pipeline add indirection without adding the one thing the task actually needed (alias-collision detection). Width without depth.

## Why It Happens

The agent optimizes for "handles every conceivable case" rather than "satisfies this requirement minimally." Abstraction feels like thoroughness; the training signal rewards generating complete-looking, general solutions. But each layer of indirection is an invariant the agent now has to get right *and verify*, and the hidden-oracle tests check exactly the corners those layers open up. The over-built patch is harder for the agent itself to hold correct in context, which feeds [[compounding-booboos]] as the layers interact unexpectedly.

## Distinction from Adjacent Concepts

| Concept | Stance on code volume | Relationship |
|---|---|---|
| [[boil-the-ocean]] | *Pro*-completeness — full edge cases, tests, error paths | The productive opposite: completeness is not over-engineering. Boil the Ocean explicitly separates "complete" (do it) from "speculative abstraction" (don't) |
| [[architectural-bloat]] | Against inert structure | Different domain — bloat in a *multi-agent topology* (causally inert roles). Over-engineering is bloat in a *single patch* (causally *harmful* layers) |
| [[strategic-vs-tactical-programming]] | Strategic design over tactical cruft | The design-philosophy frame; over-engineering is its agent-side pathology |
| [[infrastructure-blindness]] | — | Frequent co-occurrence — reimplementing existing machinery is usually over-built |

The key separation from [[boil-the-ocean]]: Boil the Ocean says do the *complete* thing (every real edge case, every error path the task implies). Over-engineering says don't add the *speculative* thing (abstraction and indirection no requirement asks for). The dataset rewards the former and punishes the latter — they are not in tension, they are different axes.

## Countermeasures

- **Minimality as a target, not a constraint.** The smallest change that satisfies the requirement is the default; abstraction is earned, not assumed.
- **Watch the ratio.** If the patch is 2× a reference implementation's size for equivalent behavior, stop and ask what the extra code is for.
- **Prefer extending the existing path to building a parallel one.** New layers are the most expensive thing to get right; see [[infrastructure-blindness]].
- **Each new type/struct/wrapper is a question.** "What invariant does this enforce that the existing code did not?" If the answer is nothing, it is speculative surface.

## Thread

- [[the-slop-problem]] — Over-engineering is a generator of slop: more surface, more latent bugs, lower minimality
- [[agent-quality-engineering]] — A failure mode the quality infrastructure (review, minimality checks) must catch

## Related

- [[deepswe]] — The benchmark trajectory analysis that quantified the 2–3× code-volume gap and its correlation with failure
- [[boil-the-ocean]] — The productive counterpart; explicitly distinguishes completeness from over-engineering
- [[architectural-bloat]] — The multi-agent-topology analogue (inert structure); over-engineering is the single-patch analogue (harmful structure)
- [[infrastructure-blindness]] — Frequent co-occurrence; reimplementation tends to be over-built
- [[strategic-vs-tactical-programming]] — The strategic-design frame this pathology violates
- [[deep-vs-shallow-modules]] — Deep modules hide complexity behind a small interface; over-engineering exposes complexity through many shallow ones
- [[cognitive-debt]] — Over-built code is harder for humans and agents to hold correct in context
- [[failure-modes]] — Registered in the master playbook

## Sources

- `raw/deepswe-failure-analysis.md` — Definition, the dasel (2483 vs 1279 lines), pebble (+1347 indirection), and adaptix (helper-function proliferation) cases, and the distinction from architectural-bloat and boil-the-ocean
