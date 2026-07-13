---
title: Gas Town
created: 2026-07-01
updated: 2026-07-12
sources:
  - raw/wtf-is-a-loop-peter-steinberger-vs-boris-cherny.md
  - raw/yt-steve-yegge-youll-never-write-code-the-same-way-again.md
unaudited_marginal: 0
tags: [project, multi-agent, orchestration, agent-loops, claude-code, open-source]
---

# Gas Town

> [[steve-yegge|Steve Yegge]]'s open-source [[orchestration-loop|orchestration-loop]] implementation (launched January 2026, per the article's June 2026 chronology): 20–30 [[claude-code|Claude Code]] instances coordinated by a **Mayor agent**, with **patrol agents** running continuous loops and state stored in git so work survives a crash. The deep-end, shipped instance of the continuous orchestration loop that supervises other threads.

## Architecture

Gas Town is the concrete instantiation of Stage 5 of the [[agent-loop|agent-loop]] lineage — the multi-agent orchestration loop, not the single-agent [[ralph-loop|ralph loop]]:

- **20–30 Claude Code instances** running as the worker population.
- **A Mayor agent** coordinates them — the supervising loop that dispatches work.
- **Patrol agents** run continuous loops, the always-on oversight layer.
- **Git-backed state** so work survives a crash. Durability is explicit and first-class — the system assumes it will be restarted, unlike a ralph loop that assumes your terminal stays open.

## Why It Matters

Gas Town is the proof that the orchestration loop is "shipped and open source," not theoretical. It is the continuous orchestration loop that supervises other threads/agents — the thing one practitioner called the "new layer" on top of the now-old-hat single-agent ralph loop.

> [!note] The Hand-Designed Case
> Gas Town is a hand-designed, deterministic orchestration topology — the case the [[multi-agent-illusion]] audit vindicates (cf. the [[expert-mas]] baseline: GPT-5 57.0% → 96.5%). It is not an auto-searched architecture, which the same audit shows largely fail and cost up to 10× more. Its existence supports orchestration loops as a viable pattern *when engineered*, not as a license for unconstrained agent multiplication.

## Yegge's Mid-2026 Retrospective

In a July 2026 panel, Yegge reports he has not been using Gas Town itself recently. "It's really overkill if you really want to run 60 agents." The lessons from building and running it still hold — and the [[beads-work-ledger|Beads-style]] work-ledger idea emerged from Gas Town's pain points — but the production pattern that has stuck is the **bespoke, smaller-scale factory**, not the 20–30-instance mega-deployment.

Two patterns that emerged from the Gas Town era and persist in his current practice:

- **Beads as work-ledger** — agents getting lost in markdown files was a Gas Town-era problem. The work-as-graph solution has stuck.
- **The "dogs" role** — a dedicated agent class that kept the factory clean. The current best-practice framing is "sweeps" agents (architecture, test-quality, documentation) run on a cadence. See [[factory-maintenance]].

The retrospective takeaway: Gas Town is the *proof of concept* that the orchestration loop is real, and the *forcing function* for the practical patterns (work-ledger, sweeps, deterministic boundary checks) that have since become load-bearing in every factory Yegge builds. The current factory is bespoke, smaller, and uses the patterns — but is not a 30-instance Gas Town.

## Thread

- [[multi-agent-code-orchestration]] — Gas Town instantiates the hierarchical topology (Mayor over workers) and artifact-mediated communication (git-backed shared state) from the code-as-harness framework
- [[the-agent-workflow]] — Gas Town is the shipped proof that the orchestration loop (Stage 5 of the agent-loop lineage) is production-ready, not theoretical
- [[software-factory]] — Gas Town is the deep-end factory; the current practitioner pattern is the smaller bespoke factory that inherits its lessons

## Related

- [[orchestration-loop]] — The Stage-5 pattern Gas Town implements
- [[agent-loop]] — The umbrella lineage
- [[multi-agent-code-orchestration]] — The architectural vocabulary (roles, topologies, durability)
- [[ralph-loop]] — The single-agent Stage-3 loop Gas Town supervises
- [[claude-code]] — The worker agent each instance runs
- [[multi-agent-illusion]] — Vindicating context: hand-designed orchestration works; auto-searched does not
- [[steve-yegge]] — Yegge's full practitioner position
- [[beads-work-ledger]] — Work-as-graph, the load-bearing pattern that emerged from Gas Town's pain points
- [[factory-maintenance]] — The "dogs" → "sweeps" lineage, the ongoing-hygiene pattern Gas Town pioneered

## Sources

- `raw/wtf-is-a-loop-peter-steinberger-vs-boris-cherny.md` — Gas Town (Steve Yegge, launched January 2026 per article chronology, open source): 20–30 Claude Code instances, Mayor agent, patrol agents, git-backed state, crash recovery. Described as the deep-end continuous orchestration loop.
- `raw/yt-steve-yegge-youll-never-write-code-the-same-way-again.md` — Yegge's mid-2026 retrospective: "really overkill if you really want to run 60 agents"; current pattern is smaller bespoke factories; Beads and the "dogs" → "sweeps" lineage as the durable lessons
