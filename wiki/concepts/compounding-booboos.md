---
title: Compounding Booboos
created: 2026-04-25
updated: 2026-05-01
sources: [raw/yt-building-pi-in-a-world-of-slop.md, raw/slowing-the-fuck-down.md]
tags: [concept, ai, reliability]
---

# Compounding Booboos

> The phenomenon where small, unchecked errors introduced by AI agents accumulate into significant system failures or unmaintainable code.

## Overview

Because AI agents often lack a deep understanding of the entire system architecture, they may introduce minor bugs or stylistic inconsistencies ("booboos"). If these are not caught during human review, subsequent agent actions are built upon this flawed foundation, leading to a cascade of errors.

## The Human Bottleneck

[[mario-zechner|Mario Zechner]] identifies the key asymmetry: humans are bottlenecks. A human can only produce so many booboos per day. Usually, when booboo pain gets too big, the human (who hates pain) fixes them. With agents, there is no bottleneck and no pain. The tiny harmless booboos compound at an unsustainable rate. You've removed yourself from the loop, so you don't even know they've formed a monster until it's too late.

An agent also has no learning ability — it will continue making the same errors over and over. You can teach it via AGENTS.md or memory systems, but that requires observing the errors in the first place.

## Mitigation

- **Frequent Verification**: Running tests and linting after every agent action.
- **High-Quality Review**: Humans must review agent outputs rigorously — though the wiki's dominant thesis ([[grey-box-engineering]], [[the-human-lever]]) argues this review should focus on **outputs and interfaces**, not line-by-line code reading. The verification loop automates the line-level checking that humans can no longer scale to.
- [[grey-box-engineering]] — Maintaining a mental model of the system to spot "booboos" early.

> [!warning] Contradiction
> This page's original guidance — "treat agent-generated code with the same (or more) scrutiny as human-written code" — implies line-by-line human review. The wiki's dominant thesis ([[grey-box-engineering]], [[the-human-lever]], Matt Pocock's workflow) argues the opposite: humans should review **outputs and interfaces**, not implementation lines, because the speed asymmetry makes line-level review impossible at scale. The verification loop (tests, types, linters) automates the scrutiny humans can no longer provide manually. Both agree on *rigor*; they disagree on *who provides it* for line-level details.

## Thread
- [[the-slop-problem]] — Compounding booboos as the mechanism of degradation

## Related

- [[slop]] — The accumulation of booboos results in slop.
- [[verification-loop]] — The primary defense: catch booboos before they compound.
- [[pi]] — Designed to provide observability so booboos are visible before they cascade.
- [[vibes-based-engineering]] — The approach that lets booboos slip through unverified.
- [[agent-experience]] — Poor AX causes errors to compound faster.
- [[hallucination]] — Hallucinated code that passes review becomes invisible booboos.
- [[mario-zechner]] — Coined the term and warned about compounding errors in AI-assisted code.
- [[backpressure]] — Backpressure catches booboos before they compound.
- [[agent-quality-loop]] — The quality flywheel catches production booboos and turns them into permanent eval cases
- [[grey-box-engineering]] — Grey box engineering catches booboos at the interface boundary.
- [[deliberate-friction]] — Deliberate friction interrupts the compounding cycle.
- [[plan-disposability]] — Stale plans compound booboos across AFK iterations.

## Sources

- `raw/yt-building-pi-in-a-world-of-slop.md`
- `raw/slowing-the-fuck-down.md`
