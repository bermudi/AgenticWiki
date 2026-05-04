---
title: Fighting Slop With Slop
created: 2026-05-04
updated: 2026-05-04
sources:
  - "raw/Can an AI Out-Plan a Senior Engineer - youtube.com.md"
tags: [concept, tool-design, workflow, ai-engineering]
---

# Fighting Slop With Slop

> The intentional, controlled use of AI-generated code (slop) for internal tooling and non-customer-facing infrastructure — accepting disposability in the toolchain to produce higher quality where it matters. Slop is a spectrum, not a binary: the question isn't "is there slop?" but "where is the slop, and what does it buy you?"

## The Idea

The term "fighting slop with slop" comes from a Boundary AI livestream about BAML's design doc process, hosted by Fib (BAML language engineer at Boundary ML) with guest Kevin Gregory (EvolutionIQ). The phrase appears in both speakers' contributions, with Kevin attributing it to Fib's framing: "when you say fighting like this is how you fight AI slop with slop." Fib also references a talk on the concept at the AIN conference. The core insight: if AI-generated code is inevitably sloppy, instead of fighting that across the entire codebase, **channel the slop into places where it doesn't matter** — internal tooling, throwaway scripts, glue code — and use that leverage to produce clean, rigorous output where it *does* matter (design docs, product code, customer-facing interfaces).

Kevin Gregory frames it explicitly:

> "The key thing here is when you say fighting — this is how you fight AI slop with slop, right? You're using slop to build these internal tools that make it really easy to get a really high quality document."

The slop isn't the enemy; it's the raw material. The question is where you aim it.

## The BEEPs Case Study

The Boundary ML team built a complete design doc system called **BEEPs** (BAML Enhancement Proposals) — a markdown-based system with a custom web UI for browsing, commenting, and versioning design docs, integrated with Slack for notifications, and a CLI for syncing local markdown with the web system. The entire codebase is AI-generated, and nobody on the team has ever read a line of it:

> "I have never even opened Claude myself to add features into beeps because it's not worth it."

Features are added by tagging coding agents on Slack. Fib, the BAML language engineer, has never read the code himself and describes it as "a pure AI slop mess." The code is effectively disposable — no human on the team has needed to read or maintain it. The entire system is treated as means-to-an-end infrastructure.

And yet the output of this disposable toolchain is remarkably thorough design docs with: explicit design decisions called out one-by-one, subpages for prior art, version snapshots instead of in-place edits, cross-references to other BEEPs, code examples across multiple languages, and explicit scope boundaries ("what we're NOT doing").

The tradeoff: extreme slop in the tooling → high quality in the design doc that ultimately gets implemented.

## Contrast: Existing Slop Narratives

The existing wiki consensus ([[the-slop-problem|The Slop Problem thread]]) treats slop as uniformly harmful — code that rots the codebase, compounds into technical debt, and accelerates software entropy. "Fighting slop with slop" introduces a productive tension:

| Frame | Slop is... | Response |
|-------|-----------|----------|
| The Slop Problem | A threat | Backpressure, verification loops, deliberate friction |
| Fighting Slop With Slop | A resource | Channel it where damage is contained, reap quality where it matters |

These aren't contradictory. They're the same principle applied at different scopes: **containment**. The existing thread argues for containing slop's damage through engineering discipline. The fighting-slop-with-slop approach argues for containing slop to a bounded, disposable context so it doesn't infect the valuable output.

The same containment principle appears in [[mario-zechner|Mario Zechner]]'s practice: he accepts slop in [[pi|Pi]]'s HTML export (which he has never read) but guards the agent loop through deliberate, repeated engagement. The BEEPs workflow extends this principle to organizational scale — an entire team's design doc toolchain is the "HTML export," and the design docs themselves are the "agent loop."

## Risks

The approach is not without failure modes:

- **Creep**: Slop tooling that was supposed to be disposable becomes institutionalized. Features get requested, hacks pile on hacks, and suddenly the tooling needs maintenance that nobody wants to do.
- **Verification contagion**: If the AI-generated tooling produces incorrect output (wrong diffs, corrupted versions), the design docs themselves degrade. The disposable tooling must still be *observationally correct* even if its internals are garbage.
- **Team friction**: If a human eventually *does* need to understand or fix the tooling (unexpected scaling, security issue), the lack of any intentional design makes the fix expensive. The bet is that this never happens — a bet that may not hold at scale.
- **Sunk cost**: The easier it is to add features via agent tags, the more features accumulate. The tooling grows in scope while staying sloppy, until replacing it becomes as painful as maintaining it.

## Thread

- [[the-slop-problem]] — Fighting slop with slop introduces a productive tension into the thread's claim that slop is uniformly harmful
- [[the-human-lever]] — The BEEPs workflow is a concrete case study of the human owning design boundaries while AI generates the infrastructure around the design process

## Related

- [[slop]] — The general concept, now with an internal-vs-external dimension
- [[slop-watch]] — The observability approach to measuring slop; fighting slop with slop is a complementary production-side strategy
- [[the-slop-problem]] — The thread that documents the threat; this concept documents the controlled-use case
- [[verification-loop]] — The BEEPs workflow complements the verification loop: the design doc is the verification target, the tooling is the throwaway means
- [[plan-vs-review]] — The 50%+ design time allocation in the BEEPs workflow empirically validates the plan-heavy approach
- [[ai-design-loop]] — The BEEPs workflow is a structured ai-design-loop applied at organizational scale

## Sources

- `raw/Can an AI Out-Plan a Senior Engineer - youtube.com.md` — Full discussion of the "fighting slop with slop" concept, the BEEPs design doc workflow, and the threading design process
