---
title: Colin Eberhardt
created: 2026-06-07
updated: 2026-06-08
sources:
  - raw/yt-spec-driven-dev-hype-or-future.md
unaudited_marginal: 0
tags: [author, practitioner, scott-logic, spec-driven-development, benchmark]
---

# Colin Eberhardt

> CTO of Scott Logic. Ran a head-to-head benchmark comparing GitHub Spec Kit to a plain iterative approach: Spec Kit took 33 minutes of agent time producing 2,500 lines of markdown for 689 lines of code, requiring 3.5 hours of human review. The iterative approach took 8 minutes, produced 1,000 lines of code, and needed 24 minutes of review — with no bugs. Result: 10× faster without SDD, on the test problem Eberhardt used. The benchmark is the strongest empirical counter-evidence to the SDD productivity claims as of late 2025.

## The Benchmark (per `raw/yt-spec-driven-dev-hype-or-future.md`)

| Metric | Spec Kit | Iterative | Ratio |
|---|---|---|---|
| Agent time | 33 min | 8 min | 4.1× slower with SDD |
| Markdown generated | 2,500 lines | 0 lines | — |
| Code generated | 689 lines | 1,000 lines | — |
| Human review time | 3.5 hours | 24 min | 8.75× more review with SDD |
| Bugs | (not stated) | 0 | — |

The result is "hard to wave away" — Eberhardt's iterative approach was 10× faster end-to-end on this test problem. The test problem is not characterized in the source, so the benchmark's external validity to other problem types is unknown.

## Why It Matters

This is the cleanest empirical counter-evidence to the practitioner claims from [[cian-clarke]] (Near Form) and [[al-harris]] (Amazon Kiro), both of whom report SDD paying off. The contradiction is not necessarily a refutation — Eberhardt's test problem may have been a poor fit for SDD, or the iterative approach may have been done by a senior engineer who already had mental specs in their head. But the wiki takes the tension seriously: the [[intent-to-code]] thread has positions 2-4 (plan-as-contract, alignment-first, formalized specs) all predicated on SDD paying off. Eberhardt's benchmark is the strongest argument that the predicate can fail.

The full wiki treatment of Eberhardt's benchmark and its implications is captured on the author page and in the [[the-slop-problem]] thread's spec-slop departure callout.

## Related

- [[spec-driven-development]] — The methodology Eberhardt benchmarked
- [[spec-driven-development]] — The methodology Eberhardt benchmarked; see the [[the-slop-problem]] thread for the spec-slop framing of the 2,500:689 spec-to-code ratio
- [[intent-to-code]] — The thread whose position 2-4 predictions Eberhardt's benchmark challenges
- [[cian-clarke]] — Reports SDD "unquestionably orders of magnitude better" — opposite finding to Eberhardt
- [[al-harris]] — Reports PBT-as-spec accuracy lift — a different empirical claim about SDD

## Sources

- `raw/yt-spec-driven-dev-hype-or-future.md` — Devsplainers video citing the Eberhardt benchmark numbers; the test problem is not characterized in the source.
