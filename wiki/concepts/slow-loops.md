---
title: Slow Loops
created: 2026-07-16
updated: 2026-07-16
sources:
  - raw/yt-context-engineering-with-dex-horthy.md
unaudited_marginal: 0
tags: [concept, agent-loops, factory-maintenance, incremental, human-in-the-loop]
---

# Slow Loops

> [[dex-horthy|Dex Horthy]]'s preferred flavor of autonomous loop engineering: a cron job runs nightly (typically in GitHub Actions), fixes exactly *one* thing — one anti-pattern, one lint rule, one narrowing of an optional prop — commits, pushes, and opens one small pull request. The team wakes up to a codebase slightly better than they left it; a human still reviews and approves. The deliberate inverse of the [[dark-factory|dark factory]]: loops that are *incremental, scoped, and lights-on*.

## The Pattern

The loop structure is deliberately boring:

1. A scheduled trigger (cron in GitHub Actions) fires — not a human pressing a button.
2. The agent fixes exactly one well-defined thing (e.g. one [[factory-maintenance|anti-pattern]], one React component's prop narrowing).
3. It commits, pushes, and opens a PR.
4. A human reviews and merges in the morning.

Two scaling dimensions, applied as confidence grows:

- **Add more feedback conditions** — a new "fix one thing" condition for each deterministic or taste-based check. Dex's examples: a React Doctor for frontend anti-patterns; a prop-narrowing pass that turns unnecessary optional props into required ones. Each new condition yields its own morning PR, so the team wakes up to N PRs for N conditions.
- **Increase scope per PR** — once a condition is trusted, let a single loop iteration fix four things instead of one.

The triggering philosophy generalizes: anything that doesn't require a human to press a button — a Sentry alert, a support ticket, a failing test, a PM-written ticket, a cron schedule — is a valid loop trigger, so long as the loop has a defined workflow and makes things a little better.

## Why Slow, Not Fast

Dex's contrast is the [[ralph-loop|Ralph Wiggum]] extreme: run a loop for three days, get a 60,000-line PR that "fixed every lint error in the codebase," and then ask who will review and sign off on merging and deploying it with no bugs. Answer: nobody. Big autonomous PRs are unreviewable, which collapses back into the dark-factory failure mode.

The slow loop keeps every PR inside what a human can meaningfully review over coffee. That is the whole point: the loop does the tedious work of continuous improvement; the human supplies the taste and the merge authority. Dex's summary of the entire loops space: *"everything except stop reading the code is really good advice."*

## Relation to Maintenance and the Ralph Lineage

Slow loops are the human-reviewed, incremental cousin in the [[agent-loop]] lineage. Where the [[ralph-loop|Ralph loop]] is serial-but-long-running (one big plan, many tasks, fresh context per iteration) and [[orchestration-loop|orchestration loops]] supervise fleets of loops, the slow loop is intentionally low-stakes and high-cadence: it is [[factory-maintenance]] distilled into a nightly cron. It is also the "lights-on" answer to the [[dark-factory]] — the proof that loop engineering and human code review are complements, not substitutes.

> [!note] Synthesis: Slow loops as the productized sweep
> The slow loop is the concrete, shippable form of the [[factory-maintenance]] "sweep agent" pattern — a scheduled scan that looks for one class of improvement and proposes it for human approval. Where the sweeps literature describes the role, Dex's nightly cron is the minimum viable implementation any team can adopt today.

## Thread

- [[dex-horthy-agentic-engineering]] — Slow loops are Dex's affirmative loop-engineering answer, positioned against the dark factory
- [[the-agent-workflow]] — Slow loops are the AFK substrate for continuous codebase improvement
- [[the-slop-problem]] — Incremental human-reviewed loops are the structural slop defense that dark factories lack

## Related

- [[factory-maintenance]] — Slow loops are the productized form of the sweep/maintainer agent
- [[ralph-loop]] — The long-running serial cousin; slow loops are the small-PR alternative to big Ralph PRs
- [[orchestration-loop]] — The fleet-supervision layer above; slow loops are a single scheduled instance
- [[dark-factory]] — The lights-off opposite; slow loops are explicitly "lights on"
- [[backpressure]] — Each PR condition is a backpressure signal converted into autonomous corrective work
- [[token-harder-vs-token-smarter]] — Slow loops are a token-smarter practice
- [[dex-horthy]] — Originator

## Sources

- `raw/yt-context-engineering-with-dex-horthy.md` — The nightly-cron / one-PR-per-morning pattern and the two scaling dimensions (36:56–38:01), the "everything except stop reading the code" summary (58:28–58:37), the contrast with unreviewable 60,000-line Ralph PRs (36:31–36:54).
