---
title: Dark Factory
created: 2026-07-16
updated: 2026-07-16
sources:
  - raw/yt-context-engineering-with-dex-horthy.md
unaudited_marginal: 0
tags: [concept, software-factory, automation, failure-modes, agentic-engineering]
---

# Dark Factory

> A fully-automated [[software-factory]] in which no human reads the code — raw materials (tickets, alerts) go in, PRs come out, and the system is treated as a black box verified only by user complaints and crashes. Borrowed from manufacturing, where a "lights-out factory" is fully robotic and has no light switches because no humans work the floor. [[dex-horthy|Dex Horthy]] built one, ran it for ~4 months, and shut it down — making him the wiki's strongest *first-person* source on its failure mode.

## The Term

From manufacturing: a robotic car factory with no lights because there are no humans on the floor. The software analogue — "raw materials go in, cars come out," no human input — is the maximal [[token-harder-vs-token-smarter|token-harder]] bet. Dex distinguishes a *micro* dark factory (a single loop with no human in it — e.g. a code-review agent that loops a bad PR back to the builder agent until it passes) from the *full* dark factory (nobody reads any code, ever). The micro version is fine; the full version is the cautionary tale.

## The Failure Account

HumanLayer built a lights-off factory in **July 2025** and shut it down by **November 2025**. Dex's retrospective estimate: it takes about **3–6 months** of shipping with nobody reading the code before the codebase becomes easier to rewrite from scratch than to fix ([`raw/yt-context-engineering-with-dex-horthy.md`](../raw/yt-context-engineering-with-dex-horthy.md), 41:55).

The mechanism, in his telling:

1. Agents ship far faster than humans can review, so PR review becomes the bottleneck.
2. To keep throughput up, you replace human review with agentic code review and agentic testing.
3. But those reviewers have no intuition for software architecture — models are trained on [[the-benchmark-crisis|SWE-bench-style]] tasks ("here's a commit, here's an issue, reproduce the fix"), and the cost function of bad architecture can't be caught by a unit test. It surfaces 3–6 months later as unmaintainable spaghetti.
4. When something finally breaks badly enough, no amount of expert prompting can get the model to find the root cause, because nobody understands the code it wrote. Dex's concrete instance: a primary key being routed through the whole system as the wrong object type. They spent **three weeks re-onboarding** into a codebase they had stopped reading three months earlier.

He frames the systemic risk in a tweet that "did a lot of numbers": a 1–3 year period in which things break at 3 a.m., loops are relied on to fix them, nobody understands what's under the hood, and that is an existential threat to the company.

## The Contradictory Update

Dex initially believed the trade was worth it: accept the occasional two-week manual fix in exchange for not reading code most of the time. He has retracted that: the volume of code teams can now produce (10–100×) has made the problem worse, not stable. His current position is that you should keep humans in the loop, use loops for [[factory-maintenance|codebase improvement]] (which humans review), and never for "ship the features and stop reading."

## Relation to the Factory Lineage

The dark factory is the terminal node of the pre-AI [[software-factory]] → agentic-factory ramp: replace the human builder with an agent (build time drops from hours to minutes) → code review becomes the bottleneck, so add agentic review → testing becomes the bottleneck, so add agentic testing → finally, take the human testing/review steps out entirely and declare "if users don't complain, it works." Each step is locally rational; the cumulative result is the lights-off collapse.

## Thread

- [[dex-horthy-agentic-engineering]] — The dark factory is the cautionary tale at the center of Dex's token-smarter argument
- [[the-slop-problem]] — The dark factory is the maximal slop-generating architecture; quality is unverifiable until users complain
- [[the-benchmark-crisis]] — The dark factory fails partly because no benchmark trains models on 3–6-month maintainability

## Related

- [[software-factory]] — The general concept; the dark factory is its fully-automated limit
- [[token-harder-vs-token-smarter]] — The dark factory is the token-harder endgame
- [[slow-loops]] — The "lights-on" alternative Dex advocates: incremental, human-reviewed loops
- [[factory-maintenance]] — The dark factory assumes the factory maintains itself; the reality is it bit-rots faster than autonomous repair can keep up
- [[comprehension-debt]] — A dark factory manufactures comprehension debt as its primary output
- [[the-verifiability-thesis]] — The dark factory treats "users didn't complain" as the verification signal — the weakest possible oracle
- [[compounding-booboos]] — Why the rewrite-from-scratch endpoint is reached: errors compound unobserved

## Sources

- `raw/yt-context-engineering-with-dex-horthy.md` — The July→November 2025 build-and-shutdown account and the 3–6-month estimate (41:55), the SWE-bench-can't-evaluate-maintainability argument (43:18), the primary-key root-cause story and the three-week re-onboarding (45:42–46:33), the existential-threat tweet (41:11), the micro-vs-full distinction (1:15:28), the retraction of the "worth it" trade (46:26).
