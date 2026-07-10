---
title: Garry Tan
created: 2026-07-10
updated: 2026-07-10
sources:
  - raw/gstack-garry-tan-software-factory.md
unaudited_marginal: 0
tags: [author, practitioner, y-combinator, agent-workflow]
---

# Garry Tan

> President & CEO of Y Combinator. Creator of [[gstack]], an open-source software factory for Claude Code. Previously co-founded Posterous (sold to Twitter), was one of the first eng/PM/designers at Palantir, and built Bookface (YC's internal social network). Reports shipping at ~810× his 2013 pace using AI-assisted development.

## Background

Garry Tan has worked with thousands of startups — Coinbase, Instacart, Rippling — when they were one or two people in a garage. Before YC, he was one of the first eng/PM/designers at Palantir, co-founded Posterous (sold to Twitter), and built Bookface, YC's internal social network. He has been building products for twenty years.

## The Productivity Claim

Tan reports that in the last 60 days (as of mid-2026): 3 production services, 40+ shipped features, part-time, while running YC full-time. On logical code change — not raw LOC, which AI inflates — his 2026 run rate is ~810× his 2013 pace (11,417 vs 14 logical lines/day). Year-to-date (through April 18), 2026 produced 240× the entire 2013 year. Measured across 40 public + private `garrytan/*` repos including Bookface, after excluding one demo repo. AI wrote most of it. The point isn't who typed it, it's what shipped.

## gstack

Tan created [[gstack]] as his personal software factory, then open-sourced it (MIT license). The framework packages a complete sprint workflow as 23 specialist slash-command skills for Claude Code, designed for 10-15 parallel sprints. See [[gstack]] for the full treatment.

## The Builder Ethos

Tan articulates three principles that shape gstack's behavior, injected into every workflow skill's preamble:

1. **[[boil-the-ocean|Boil the Ocean]]** — "Don't boil the ocean" was right when engineering time was the bottleneck. AI-assisted coding makes the marginal cost of completeness near-zero, so the old caution has become an excuse. Do the complete thing, every time.
2. **Search Before Building** — The 1000x engineer's first instinct is "has someone already solved this?" Three layers of knowledge: tried-and-true, new-and-popular, first-principles. Prize first-principles above all.
3. **User Sovereignty** — AI models recommend. Users decide. The user always has context that models lack. Even when two models agree, the user's "no" is final. This echoes Karpathy's "Iron Man suit" philosophy: great AI products augment the user, not replace them.

## Related

- [[gstack]] — Tan's open-source software factory
- [[boil-the-ocean]] — Tan's first ethos principle
- [[the-agent-workflow]] — gstack is a concrete instantiation of the sprint workflow
- [[software-factory]] — gstack is a shipped software factory
- [[andrej-karpathy]] — Tan cites Karpathy's "Iron Man suit" philosophy and AI coding rules as influences

## Sources

- `raw/gstack-garry-tan-software-factory.md` — gstack README + ETHOS.md. Biographical details, productivity claims, sprint workflow, builder ethos principles, parallel sprints, cross-model review.
