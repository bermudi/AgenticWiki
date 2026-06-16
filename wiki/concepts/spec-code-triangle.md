---
title: Spec-Code Triangle
created: 2026-06-07
updated: 2026-06-07
sources:
  - raw/yt-learnings-from-a-no-code-library-keeping-the-spec-driven-development-triangle-in-sync.md
tags: [concept, spec-driven-development, workflow, feedback-loop]
unaudited_marginal: 0
---

# Spec-Code Triangle

> The [[spec-driven-development|spec-driven development]] equation (spec + tests + agent → code) is wrong. The correct model is a triangle: spec, tests, and code form a bidirectional feedback loop. As each node moves forward, the job is to keep all three in sync. Coined by [[drew-breunig|Drew Breunig]].

## The Equation Was Wrong

Breunig's initial framing of [[onewords|onewords-style]] spec-driven development was a one-way equation:

```
Spec + Tests + Agent → Code
```

He later walked this back: "I got this wrong. This isn't a one-way equation. This is a feedback loop."

The act of writing code improves the spec and the tests. Just like software doesn't truly work until it meets the real world, a spec doesn't truly work until it's implemented.

## The Triangle

Three nodes, each informing the others:

- **Spec** defines what tests need to be written
- **Spec** defines what code needs to be written
- **Tests** validate the code
- **Implementing code** generates new decisions → informs the spec
- **Spec updates** require new tests
- **Code** surfaces new behaviors that need testing

The feedback loops are the key insight. The equation treats spec → code as a compilation step. The triangle treats implementation as a *learning* process that retroactively improves the spec.

## Why the Feedback Matters

Breunig observed that even with great specs and comprehensive test suites, implementation generates decisions that weren't anticipated:

- GitHub issue threads with 20+ comments debating the right way to implement — "Please refer to our code to figure out what's the right way to implement"
- No spec is perfect — "Implementing the code helps us improve our spec"
- Sometimes it's not new decisions but dependencies or subtle choices

This directly challenges the idea that specs can be exhaustive before implementation begins. The [[code-clarifies-spec|code clarifies the spec]] — implementation is a form of specification refinement.

## The Job

> "As each node moves forward, it's our job and our job of our tooling to keep these nodes in sync. That is the job."

[[plum-dev|Plum]] is Breunig's concrete tool for keeping the triangle in sync. It extracts decisions from code diffs and agent traces at commit time, forces approval, and updates the spec accordingly.

## Connection to Existing Positions

The triangle reframes the [[intent-to-code]] axis:

- **Position 2 (Plan-as-Contract)** treats the spec as the contract — implementation verifies against it. The triangle says implementation *changes* the contract.
- **Position 3 (Alignment-First)** treats QA as the quality mechanism. The triangle says the quality mechanism is *spec-tests-code synchronization*, not just QA.
- **Position 5 (Enforcement-as-Code)** uses executable checks. The triangle adds that the checks themselves need updating as implementation reveals new behaviors.

The triangle is closest to [[al-harris|Al Harris]]'s vision for [[kiro|Amazon Kiro]]: "if I come back and change the requirements down the road, we will mutate a previous spec. So I'm looking at really just a diff of requirements." Harris's bidirectional spec sync is the same feedback loop Breunig identifies, operationalized differently.

## The "Keeping It Simple" Constraint

Breunig emphasizes that the system for managing the triangle must be simple. "If it creates developermental overhead, it just moves the problem somewhere else." Complex orchestration infrastructure (like Gas Town) moves complexity rather than solving it.

## Thread

- [[intent-to-code]] — The triangle reframes the plan-as-contract position as necessary but not sufficient
- [[spec-driven-development]] — Direct theory pressure on the equation framing
- [[the-agent-workflow]] — The triangle as a workflow discipline

## Related

- [[drew-breunig]] — Originator
- [[plum-dev]] — The tool that operationalizes the triangle
- [[code-clarifies-spec]] — The insight at the triangle's core
- [[decision-extraction]] — The mechanism for keeping the triangle in sync
- [[spec-driven-development]] — The theory the triangle extends and challenges
- [[al-harris]] — Harris's bidirectional spec sync is the same feedback loop
- [[kiro]] — Kiro's EARS + PBT pipeline is one way to operationalize the triangle
- [[verification-loop]] — The triangle extends verification from test-level to spec-level
- [[backpressure]] — Commit-level backpressure as the enforcement mechanism

## Sources

- `raw/yt-learnings-from-a-no-code-library-keeping-the-spec-driven-development-triangle-in-sync.md` — Breunig's talk; the triangle is his central contribution
