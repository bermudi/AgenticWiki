---
title: Seams and Adapters
created: 2026-04-29
updated: 2026-04-29
sources:
  - raw/yt-how-to-de-slop-a-codebase-ruined-by-ai-with-one-skill.md
unaudited_marginal: 0
tags: [software-architecture, testing, hexagonal-architecture, ai-engineering]
---

# Seams and Adapters

> A seam is where a module's interface lives in the dependency graph — the location where you test in isolation. An adapter is the concrete implementation that satisfies the interface at that seam. Together they define where and how modules can be substituted, which is the foundation of testable, AI-friendly architectures.

## Seams

A **seam** is the boundary between two modules — the location in the codebase where one module's interface meets another's dependency. [[matt-pocock|Matt Pocock]] defines it as "the location at which the module's interface lives inside the application" — the place where testing and substitution happen.

In a well-architected codebase:
- Seams are explicit and documented.
- Seams are where you insert mocks, fakes, or stubs for testing.
- Seams are where you swap implementations (e.g., real database → in-memory database for tests).

In a sloppy codebase, seams are implicit or nonexistent — modules are tightly coupled, making isolated testing impossible. [[matt-pocock|Matt Pocock]]'s [[improve-codebase-architecture]] skill specifically hunts for "concepts without a single seam" — parallel implementations that should be unified behind one interface.

## Adapters

An **adapter** is the concrete module that satisfies the interface at a seam. The term comes from hexagonal architecture (ports and adapters). The interface is the port; the adapter plugs into it.

Example: a `Clock` interface defines a seam. Two adapters satisfy it:
- `RealClock` — uses the system clock (production).
- `FakeClock` — returns predetermined times (tests).

Adapters make deep modules testable without coupling tests to infrastructure. The [[verification-loop]] depends on this: you need seams to isolate behavior and adapters to provide controlled test environments.

## Why It Matters for AI

- **Untested seams are slop generators**: When two implementations of the same concept live in parallel (frontend + backend) with no shared interface, changes to one silently break the other. AI agents, being tactical, won't notice the desync.
- **Seams define the verification boundary**: The [[grey-box-engineering|grey box]] contract between human and agent lives at the seam. The human owns the interface; the agent owns the implementation. If the seam doesn't exist, the contract can't be enforced.
- **Adapters enable parallel work**: An AFK agent can work on one adapter while the human tests another, as long as both respect the shared seam.

## Thread

- [[the-human-lever]] — Seams are the boundary where human design authority meets agent implementation.
- [[the-slop-problem]] — Missing or untested seams accelerate entropy.
- [[the-agent-workflow]] — Architecture review scans for missing seams as deepening candidates.

## Related

- [[deep-vs-shallow-modules]] — Deep modules have clear, minimal seams; shallow modules have leaky or absent seams.
- [[locality-and-leverage]] — Good seams concentrate changes (locality) and maximize capability per interface unit (leverage).
- [[grey-box-engineering]] — The seam is the grey box boundary.
- [[verification-loop]] — Testing at seams is how the verification loop proves correctness.
- [[matt-pocock]] — Primary advocate of seam-aware architecture for AI workflows.

## Sources

- `raw/yt-how-to-de-slop-a-codebase-ruined-by-ai-with-one-skill.md` — Seams and adapters as the architectural vocabulary for de-slopping.
