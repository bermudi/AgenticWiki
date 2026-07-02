---
title: Gas Town
created: 2026-07-01
updated: 2026-07-01
sources:
  - raw/wtf-is-a-loop-peter-steinberger-vs-boris-cherny.md
unaudited_marginal: 0
tags: [project, multi-agent, orchestration, agent-loops, claude-code, open-source]
---

# Gas Town

> Steve Yegge's open-source [[orchestration-loop|orchestration-loop]] implementation (launched January 2026, per the article's June 2026 chronology): 20–30 [[claude-code|Claude Code]] instances coordinated by a **Mayor agent**, with **patrol agents** running continuous loops and state stored in git so work survives a crash. The deep-end, shipped instance of the continuous orchestration loop that supervises other threads.

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

## Thread

- [[multi-agent-code-orchestration]] — Gas Town instantiates the hierarchical topology (Mayor over workers) and artifact-mediated communication (git-backed shared state) from the code-as-harness framework
- [[the-agent-workflow]] — Gas Town is the shipped proof that the orchestration loop (Stage 5 of the agent-loop lineage) is production-ready, not theoretical

## Related

- [[orchestration-loop]] — The Stage-5 pattern Gas Town implements
- [[agent-loop]] — The umbrella lineage
- [[multi-agent-code-orchestration]] — The architectural vocabulary (roles, topologies, durability)
- [[ralph-loop]] — The single-agent Stage-3 loop Gas Town supervises
- [[claude-code]] — The worker agent each instance runs
- [[multi-agent-illusion]] — Vindicating context: hand-designed orchestration works; auto-searched does not

## Sources

- `raw/wtf-is-a-loop-peter-steinberger-vs-boris-cherny.md` — Gas Town (Steve Yegge, launched January 2026 per article chronology, open source): 20–30 Claude Code instances, Mayor agent, patrol agents, git-backed state, crash recovery. Described as the deep-end continuous orchestration loop.
