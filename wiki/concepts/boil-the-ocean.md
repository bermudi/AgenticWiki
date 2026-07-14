---
title: Boil the Ocean
created: 2026-07-10
updated: 2026-07-14
sources:
  - raw/gstack-garry-tan-software-factory.md
unaudited_marginal: 0
tags: [concept, agentic-engineering, completeness, ai-productivity]
---

# Boil the Ocean

> "Don't boil the ocean" was the right advice when engineering time was the bottleneck. AI-assisted coding makes the marginal cost of completeness near-zero, so the old caution has quietly turned into an excuse. When the complete implementation costs minutes more than the shortcut — do the complete thing. Every time. Coined by [[garry-tan|Garry Tan]] as the first principle of the [[gstack]] builder ethos.

## The Inversion

For decades, "don't boil the ocean" was engineering pragmatism: human time was the bottleneck, so shipping the 90% solution was rational. AI-assisted coding inverts the economics. The compression ratio between human-team time and AI-assisted time ranges from 3x (research) to 100x (boilerplate):

| Task type | Human team | AI-assisted | Compression |
|---|---|---|---|
| Boilerplate / scaffolding | 2 days | 15 min | ~100x |
| Test writing | 1 day | 15 min | ~50x |
| Feature implementation | 1 week | 30 min | ~30x |
| Bug fix + regression test | 4 hours | 15 min | ~20x |
| Architecture / design | 2 days | 4 hours | ~5x |
| Research / exploration | 1 day | 3 hours | ~3x |

The last 10% of completeness that teams used to skip? It costs seconds now. "Ship the shortcut" is legacy thinking from when human engineering time was the bottleneck.

## Ocean, Lakes First

The ocean is the destination — 100% test coverage for a module, full feature implementation, all edge cases, complete error paths. You get there one lake at a time: each lake is a boilable unit, not the ceiling. "That's boiling the ocean" is no longer a reason to ship a shortcut — boiling the ocean is the goal. The only thing still out of scope is genuinely unrelated work: a multi-quarter platform migration that has nothing to do with the task at hand.

## Anti-Patterns

- "Choose B — it covers 90% with less code." (If the complete solution is 70 lines more, choose the complete solution.)
- "Let's defer tests to a follow-up PR." (Tests are the cheapest lake to boil.)
- "This would take 2 weeks." (Say: "2 weeks human / ~1 hour AI-assisted.")

## Relationship to Existing Concepts

Boil the Ocean is a productivity ethos, not a workflow prescription. It complements [[the-agent-workflow]]'s verification discipline: the workflow ensures you're building the right thing, Boil the Ocean ensures you're building the complete thing. It stands in productive tension with [[strategic-vs-tactical-programming|strategic programming]]'s caution against over-engineering — the resolution is that completeness (full edge cases, full tests, full error paths) is not the same as [[over-engineering]] (speculative features, unnecessary abstraction). The [[spec-kit]] constitution's anti-abstraction articles (VII and VIII) make the same distinction: do the complete thing, but don't add complexity that isn't needed.

## Thread

- [[the-agent-workflow]] — Boil the Ocean is the completeness ethos that sits on top of the workflow discipline
- [[the-slop-problem]] — Boil the Ocean is the anti-slop stance: the last 10% that teams used to skip is where slop accumulates

## Related

- [[garry-tan]] — Coined the principle as part of the [[gstack]] builder ethos
- [[gstack]] — The framework where this principle is injected into every skill's preamble
- [[strategic-vs-tactical-programming]] — The tension: completeness vs. over-engineering, resolved by distinguishing "complete" from "speculative"
- [[over-engineering]] — The failure mode Boil the Ocean is defined against: speculative abstraction and unnecessary indirection, not completeness
- [[verifiability]] — Boil the Ocean assumes the verification infrastructure exists to check the complete implementation

## Sources

- `raw/gstack-garry-tan-software-factory.md` — ETHOS.md. The Boil the Ocean principle, compression ratio table, ocean/lakes framing, anti-patterns.
