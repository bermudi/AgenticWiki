---
title: Code Clarifies Spec
created: 2026-06-07
updated: 2026-06-07
sources:
  - raw/yt-learnings-from-a-no-code-library-keeping-the-spec-driven-development-triangle-in-sync.md
tags: [concept, spec-driven-development, design, feedback-loop]
unaudited_marginal: 0
---

# Code Clarifies Spec

> Implementing code improves the spec. Just like software doesn't truly work until it meets the real world, a spec doesn't truly work until it's implemented. The act of writing code generates new decisions that weren't anticipated in the spec, and these decisions should feed back into it. This is the core insight behind the [[spec-code-triangle|spec-code triangle]]. Articulated by [[drew-breunig|Drew Breunig]].

## The Core Claim

> "Implementing the code helps us improve our spec."

No spec is perfect before implementation begins. The act of implementing generates:

- **New decisions** that weren't in the spec (trade-offs, dependencies, subtle choices)
- **New behaviors** that need to be tested
- **Clarifications** of ambiguous requirements

This challenges the linear framing (spec → code) that underlies much of [[spec-driven-development|spec-driven development]] theory.

## Evidence

Breunig observed this across multiple spec-driven projects:

- GitHub issue threads with 20+ comments debating the right way to implement — "Please refer to our code to figure out what's the right way to implement"
- Even with comprehensive test suites (750+ tests), implementation generates choices the spec didn't anticipate
- None of the spec-driven projects surveyed (Vercel's just-bash, Pyantic's Monty, Anthropic's C compiler) were complete — they all hit walls where implementation outpaced the spec
- Contributors to [[onewords]] submitted PRs that surfaced test-vs-spec mismatches Breunig himself hadn't caught

## The Implication

If code clarifies spec, then:

1. **Specs can't be exhaustive before implementation** — the spec is a starting point, not a final contract
2. **The spec must evolve** as implementation decisions are made
3. **[[decision-extraction|Decision capture]]** is the mechanism for feeding implementation knowledge back into the spec
4. **"No-code libraries"** (specs without implementation) are "toys" because they are unproven — the spec hasn't been tested against reality

## Connection to Existing Theory

- [[al-harris|Al Harris]]'s bidirectional spec sync in [[kiro|Amazon Kiro]]: "if I come back and change the requirements down the road, we will mutate a previous spec. So I'm looking at really just a diff of requirements." This is the same feedback loop, operationalized differently.
- [[matt-pocock|Matt Pocock]]'s [[ai-design-loop]]: iterate to reach shared understanding before delegating. The design loop is the planning phase; code-clarifies-spec is the implementation phase.
- [[shared-design-concept]]: The design concept evolves through implementation. Peter Naur's "theory of the code" is built through the act of programming, not just through documentation.
- [[tracer-bullets]]: Shipping thin vertical slices validates the design concept early, surfacing spec gaps before they compound.

## Thread

- [[spec-driven-development]] — Code-clarifies-spec challenges the spec-first linear framing
- [[the-agent-workflow]] — Implementation as a feedback mechanism in the agent workflow

## Related

- [[spec-code-triangle]] — The model this insight drives
- [[drew-breunig]] — Articulator
- [[decision-extraction]] — The mechanism for capturing what implementation clarified
- [[plum-dev]] — The tool that operationalizes the feedback loop
- [[shared-design-concept]] — The design concept evolves through implementation
- [[tracer-bullets]] — Early implementation as spec validation
- [[onewords]] — The project that demonstrated the limits of spec-only approaches
- [[al-harris]] — Harris's bidirectional spec sync is the same insight
- [[kiro]] — Kiro operationalizes the feedback loop with EARS + PBT

## Sources

- `raw/yt-learnings-from-a-no-code-library-keeping-the-spec-driven-development-triangle-in-sync.md` — Breunig's talk; the "code clarifies spec" claim is his most emphasized takeaway
