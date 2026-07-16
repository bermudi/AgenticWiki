---
title: Factory Maintenance
created: 2026-07-12
updated: 2026-07-16
sources:
  - raw/yt-steve-yegge-youll-never-write-code-the-same-way-again.md
  - raw/yt-context-engineering-with-dex-horthy.md
unaudited_marginal: 0
tags: [concept, factory, maintenance, harness, hygiene, sweeps, organizational-adoption]
---

# Factory Maintenance

> The ongoing-hygiene problem of a [[software-factory|software factory]]: skills drift, systems change, and the factory itself bit-rots faster than it gets used. [[steve-yegge|Yegge]]'s framing: every interaction with the factory should leave it slightly better than you found it (the "fix the harness" instinct), with explicit maintenance roles ("sweeps" or "dogs" agents) built into the factory's design. The procedural rule — *before* leaving a comment on a PR, rewind and make changes that would have prevented the mistake — is from [[dru-knox|Dru Knox]] at [[tessl|Tessl]] in the same panel; the underlying principle is shared across the panel. The craftsman's workshop metaphor: a mechanic keeps their tools clean or they stop working.

## The Problem

A factory is a living system. Its components — skills, system prompts, hooks, deterministic checks, [[context-engineering|context files]], the [[beads-work-ledger|ledger schema]] — drift:

- Skills evolve to new documentation. The skill that worked last month references a moved page.
- The underlying system (model, CLI, library) changes behavior. A check that fired reliably now misses.
- New failure modes appear. A previously-unused code path becomes a frequent trip wire.

Every time you use the factory, you notice it's slightly bit-rotted somewhere. The aggregate drift is invisible per-interaction but compounds — the same pattern as the [[document-degradation|degradation]] finding in [[delegate-52|DELEGATE-52]]: rare, invisible, catastrophic cumulatively.

Yegge's observation from running Gas Town in production: "every time you use the factory, you're going to notice it's slightly bit rotted somewhere." A dedicated role (the "dogs" in Gas Town's case) was the original answer; the current pattern is to build sweeps into the factory.

## The Rule: Fix the Harness Before Leaving the Comment

[[dru-knox|Dru Knox]]'s procedural rule (Tessl's team practice), from the same panel:

> "Before you leave any comments on the PR, at least once, you have to rewind and make changes to either skills in the code base or add some unit tests, change the architecture, do something that you think could have fixed it and try again. And then if it doesn't one-shot the second time, then you can just leave comments on the PR."

The motivation: every comment on a PR is a marker that the factory's verification surface is incomplete. If the agent made a mistake, the question is *why the harness let it through* — and the answer is almost always something that could have been hardened. Each comment is a chance to make the factory's next run better.

This is the same architectural rule as [[fresh-context-subagents|read-only verifiers]] (Ai Jason's PR skill) and the wiki's own ingest pipeline (editing and verification in separate sessions): a loop that grades its own homework is the failure mode.

## The Sweep Agents

Once a factory is in steady state, the explicit answer to ongoing drift is a class of agents that scan the codebase on a cadence (daily, weekly) and look for improvements. The pattern, per Tessl ([[dru-knox|Dru Knox]]):

- **Architecture agent** — looks for areas of code duplication, weak abstractions, hard-to-test regions
- **Test-quality agent** — checks coverage, runs mutation testing, looks for new areas of the code base that could be tested better
- **Documentation agent** — keeps docs in sync with code, flags stale references
- **And more, as drift is found** — "you'll just keep adding things as you find issues"

The agents are not magical: they're regular agents with a scan-the-codebase prompt. Their value is *cadence* and *legibility* — a scheduled scan is more reliable than a human remembering to check.

In Gas Town, this role was originally called "dogs" — a dedicated agent class that kept the system clean. The current best-practice framing is "sweeps" or "maintainer" agents, run as scheduled scans rather than continuous loops.

## Why Determinism at the Boundary, Not in the Middle

Tessl's pattern ([[dru-knox|Dru Knox]], from the panel): put deterministic checks at the *boundaries*, not in the orchestration. Concretely:

- **Before `git push` / `git commit`** — run the unit tests and linter. If they don't pass, lock the tool call and tell the agent to fix them.
- **Before `stop session`** — check that all work is committed. If not, you can't stop; you have to go do that first.
- **In CI** — run the same checks the local hooks ran (Tessl runs the unit-test suite via CI/CD).

The principle: every point where the agent *commits* to a state is a place to put a deterministic gate. The middle of the workflow — the agent's reasoning, the choice of approach — should be left to the agent, because that's where flexibility matters. The boundaries are where consistency matters.

This is the same pattern as [[harness-engineering|harness engineering]]'s hook points (per the [[code-as-agent-harness|Code as Agent Harness]] survey) and the same insight that makes [[gsd-core|GSD Core]]'s phase gates work: deterministic checks at the boundary of every phase, agent freedom inside.

## The Organizational Layer

Factory maintenance is not just a technical problem. Yegge's observation: every knowledge worker in the next 12 months has to level up to baseline AI literacy. Without this, the factory is built by an elite and used by everyone else, and the maintenance burden falls entirely on the builders. With it, every user is also a maintainer.

The Flat Curve Society training formula (Yegge's medium post, citing Netflix's internal program): ~5 hours of instructor-led work with the employee's actual manager, on their real work, in cohorts of ≤10. The output metric: people reach 4M tokens/day and "start having real conversations with you" — at which point they self-train.

The training is *not* about tools or techniques (those change every model release). It is about getting people to a baseline where they can have a real conversation about what the factory can and can't do. The maintenance work follows from that literacy.

## Open Question: When to Refactor vs. Add Sweeps

The wiki has not yet seen evidence for when to refactor the factory's structure vs. when to add another sweep. Tessl's heuristic: "find one thing each week and make it a little better" — a soft principle, not a metric. The empirical question (does more sweeps = better maintenance, or do sweeps accumulate into a maintenance tax?) is open.

### Slow Loops: The Minimum Viable Sweep

[[dex-horthy|Dex Horthy]] ships the most concrete, adopt-today version of the sweep pattern: a [[slow-loops|slow loop]] — a cron job in GitHub Actions that runs nightly, fixes exactly one anti-pattern, and opens one small PR for human review. The team wakes up to a codebase slightly better than they left it. Two scaling dimensions match the sweep philosophy exactly: add more feedback conditions (wake up to more PRs), and increase scope per PR as confidence grows. Where the sweeps literature describes the *role*, Dex's nightly cron is the shippable implementation any team can adopt now — and the deliberate "lights-on" counter to the [[dark-factory|dark factory]].

## Thread

- [[the-agent-workflow]] — Maintenance is the recurring cost of running a factory; the workflow must budget for it
- [[the-slop-problem]] — Without maintenance, the factory's output drifts toward the undesirable subset; sweeps are the structural defense
- [[the-human-lever]] — The "fix the harness before leaving the comment" rule moves the human lever from PRs to infrastructure

## Related

- [[steve-yegge]] — Source of the craftsman's-workshop metaphor and the Gas Town "dogs" maintenance role
- [[dru-knox]] — Source of the "fix the harness before leaving the comment" rule
- [[software-factory]] — The system being maintained
- [[beads-work-ledger]] — The ledger is the substrate sweeps operate on
- [[harness-engineering]] — Hook points and the §5.2.3 self-evolution problem are the formalization of the sweeps pattern
- [[self-harness]] — Self-Harness is the formal version of the sweeps idea: bounded harness evolution with regression tests
- [[harnessx]] — The most complete harness-evolution system; AEGIS's Critic is an automated version of the "fix the harness" rule
- [[fresh-context-subagents]] — Read-only verifiers are the verification-layer analog of the sweeps pattern
- [[tessl]] — Tessl's verifier-as-focused-linting-rule is the productized version of the maintenance hook
- [[slow-loops]] — The minimum viable, adopt-today sweep: a nightly cron that fixes one thing and opens one PR
- [[dex-horthy-agentic-engineering]] — Dex's loop-engineering posture: incremental, human-reviewed, lights-on
- [[claude-code]] — The substrate whose hooks make boundary-gating easy
- [[verification-loop]] — The general verification pattern; maintenance sweeps are verification loops at the factory level

## Sources

- `raw/yt-steve-yegge-youll-never-write-code-the-same-way-again.md` — Yegge's craftsman's-workshop metaphor and Gas Town "dogs" role; Dru Knox (Tessl)'s "fix the harness before leaving the comment" rule, the sweeps pattern (architecture / test-quality / documentation agents), and deterministic checks at boundaries (git push → run tests; stop session → check committed); Yegge's Flat Curve Society training formula and the token-maxing → token-restraining training arc
- `raw/yt-context-engineering-with-dex-horthy.md` — Dex's slow-loop pattern as the minimum viable sweep: nightly cron, fix one thing, one PR, two scaling dimensions (36:56–38:01).
