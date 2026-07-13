---
title: Steve Yegge
created: 2026-07-12
updated: 2026-07-12
sources:
  - raw/yt-steve-yegge-youll-never-write-code-the-same-way-again.md
  - raw/wtf-is-a-loop-peter-steinberger-vs-boris-cherny.md
unaudited_marginal: 0
tags: [author, practitioner, agentic-engineering, orchestration, factory, claude-code]
---

# Steve Yegge

> Veteran engineer (Amazon, Google, Sourcegraph) whose "Welcome to Gastown" essay (January 2026) launched [[gas-town|Gas Town]] — 20–30 [[claude-code|Claude Code]] instances coordinated by a Mayor agent — and gave the [[orchestration-loop|orchestration-loop]] pattern its shipped proof. Continues to push the frontier as a practitioner: [[beads-work-ledger|Beads]] as a work-ledger, [[factory-maintenance|factory maintenance]] as a first-class concern, and the [[intelligence-tier-routing|intelligence-tier routing]] thesis for combining frontier and local models.

## Background

Yegge has 40+ years in the industry (Amazon, Google, Sourcegraph). He is the author of the original "Google Platforms rant" and several widely-circulated engineering essays. In 2026 he became one of the most visible practitioner voices on agentic engineering: his January 2026 "Welcome to Gastown" post established the orchestration-loop vocabulary that the field now uses, and his follow-on work has been a continuous stream of new patterns as the substrate ([[claude-code|Claude Code]]) evolves.

## Key Contributions

- **Gas Town (Jan 2026)** — The shipped proof that the orchestration loop is a production pattern, not theory. 20–30 Claude Code instances coordinated by a Mayor agent, with patrol agents running continuous loops and state in git for crash recovery. See [[gas-town]].
- **Beads (work-as-first-class-entity)** — A work-ledger for parallel agents: tickets, design docs, and to-dos tracked in a graph with git and database access, with three distinct views (future → in-progress → finished). Born from the practical need to keep parallel agents from getting lost in markdown files. See [[beads-work-ledger]].
- **Software factories as bespoke, not framework-shaped** — A practitioner's correction to the framework-driven factory framing: every project needs its own factory, not a one-size-fits-all solution. Common components recur (a "brain" for context, per Yegge; an issue-tracker-to-source-control bridge and deterministic boundary checks, per Tessl) but the assembly is per-project. See [[software-factory]].
- **Factory maintenance as ongoing hygiene** — The craftsman's-workshop metaphor: a mechanic keeps their tools clean or they stop working; every interaction with the factory should leave it slightly better than you found it, because skills and systems drift faster than the factory gets used. (The specific "fix the harness before leaving the comment" procedural rule is [[dru-knox|Dru Knox]]'s, from the same panel — see [[factory-maintenance]].)
- **Swarming as the answer to the bitter lesson** — Don't try to make one agent paint a wall perfectly on the first coat. Multiple passes, adversarial reviews, consensus. Quality is a token-spend dial, not a one-pass guarantee.
- **Deterministic orchestration as brittleness** — Every piece of deterministic code that tries to orchestrate becomes a source of brittleness. Tessl reports having built six orchestrators and "everyone starts with a lot of plumbing and ends with no plumbing" — the agent, given the GitHub CLI, was better than the orchestrator. Lean on hooks, not orchestrators.
- **The intelligence-tier routing thesis** — Tag work with intelligence tiers so it can be routed across Claude and local models. The endgame: one Claude Max account for planning, open-source models for implementation. The bottleneck is "intelligence arbitrage" — finding the local model that can carry enough of the load.
- **The token-maxing training problem** — Industry went through a love affair with token-maxing (Jan–Apr 2026). The next challenge is teaching people to *not* spend tokens once they know how. A separate enablement problem from raw AI literacy.
- **The Flat Curve Society** — Yegge's medium post on the formula Netflix used to flip people into AI literacy: ~5 hours of instructor-led work with their actual manager, on their real work, in cohorts of ≤10. After this, people hit 4M tokens/day and "start having real conversations with you."
- **The orchestration-loop pattern** — Gas Town / the orchestration loop sits atop the now-old-hat single-agent ralph loop. The "new layer" / "old hat" lineage framing is the WTF article's synthesis (a cited source below), not Yegge's own vocabulary; his panel is a primary source for the [[orchestration-loop]] pattern itself.

## Recent Position (mid-2026)

Yegge reports he has not been using Gas Town itself recently — it's "really overkill if you really want to run 60 agents." He still builds bespoke factories continuously, because the habit of building them is now muscle memory. His current preferred shape: a "crew" of agents for deep design work (heavy context, deep review) plus a stream of well-specified throwaway work thrown at ephemeral agents. The two-mode pattern recurs across his projects.

The retrospective position: software factories are real, they require ongoing maintenance, and the right mindset is the craftsman's workshop — keep your tools clean, spend a fraction of your time on tool care, build maintenance roles into the factory.

## Thread

- [[the-agent-workflow]] — Yegge's work is the practitioner instantiation: plan, parallelize, verify, maintain
- [[the-multi-agent-theory]] — Gas Town is the hand-designed case the [[multi-agent-illusion]] audit vindicates; swarming as the quality-focused variant of engineered decomposition
- [[the-human-lever]] — The "fix the harness before leaving the comment" rule relocates the human lever from individual PRs to factory infrastructure
- [[the-cognitive-cost]] — Yegge's factory as the shipped maximal-delegation frontier: the 40-year-vet exception that confirms the population problem
- [[the-slop-problem]] — Beads as structural slop defense; the three-view ledger hides intermediate noise until it converges
- [[the-verifiability-thesis]] — Swarming as stochastic multi-pass verification; verifier-tier independence from the agent tier
- [[prompts-in-code-review]] — Swarming as anti-bitter-lesson reframes LLM code review from single-pass bias to stochastic multi-pass

## Related

- [[gas-town]] — Yegge's open-source orchestration loop
- [[orchestration-loop]] — The Stage-5 pattern Gas Town implements
- [[software-factory]] — Yegge's practitioner view of the software factory (bespoke, maintenance-heavy)
- [[beads-work-ledger]] — Yegge's work-as-first-class-entity tool
- [[factory-maintenance]] — Yegge's ongoing-hygiene principle
- [[intelligence-tier-routing]] — Yegge's routing thesis for frontier + local model stacks
- [[claude-code]] — The substrate Yegge's factories run on
- [[multi-agent-illusion]] — The audit that vindicates Gas Town as the hand-designed case
- [[eero-alvar]] — The complementary theorist (mapping analogy, chaos property) whose framing Yegge's practice grounds

## Sources

- `raw/yt-steve-yegge-youll-never-write-code-the-same-way-again.md` — "You'll Never Write Code the Same Way Again" (AI Native Dev panel — Tessl's own channel — with Dru Knox, July 2026). Source for: bespoke-factories-not-frameworks, factory maintenance / ongoing-hygiene (the craftsman's-workshop metaphor and the Gas Town "dogs" role are Yegge's; the "fix the harness before leaving the comment" rule is Dru Knox's), the Flat Curve Society training formula, the crew-vs-throwaway pattern, intelligence arbitrage and tier routing, swarming as anti-bitter-lesson, deterministic-orchestration-as-brittleness (Tessl's six-orchestrator lesson), the token-maxing training problem, the retrospective position on Gas Town ("really overkill if you really want to run 60 agents")
- `raw/wtf-is-a-loop-peter-steinberger-vs-boris-cherny.md` — Gas Town primary source: 20–30 Claude Code instances, Mayor agent, patrol agents, git-backed state
