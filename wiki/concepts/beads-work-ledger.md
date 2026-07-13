---
title: Beads Work Ledger
created: 2026-07-12
updated: 2026-07-12
sources:
  - raw/yt-steve-yegge-youll-never-write-code-the-same-way-again.md
unaudited_marginal: 0
tags: [concept, factory, work-tracking, multi-agent, state, durability]
---

# Beads Work Ledger

> [[steve-yegge|Steve Yegge]]'s framing of software work as a **first-class entity** tracked in a graph, with three distinct views across its lifecycle: public-claimable **future work**, hidden **in-progress work**, and curated **finished work**. Born from the practical problem of parallel agents getting lost in markdown files; evolved into the substrate that makes [[software-factory|software factories]] legible across human and agent participants.

## The Problem

Running many parallel agents by hand — or via a [[software-factory|software factory]] — runs into a tracking problem: where does the work actually live? Yegge's framing:

> "I was running a bunch of parallel agents by hand, and they were getting just lost in markdown files."

The work, the tickets, the design documents, the to-dos — these are *the substance you're manipulating*. They are not a byproduct of running agents; they are the input to and output of every decision in the factory. Treating them as a side effect of chat logs and PR descriptions loses the structure that makes the factory inspectable.

## The Three-View Ledger

Beads formalizes work as a graph tracked with git and database access. The same work passes through three distinct visibility regimes:

| View | Visibility | Properties |
|---|---|---|
| **Future work** | Public | Anyone can claim, debate, modify it. The shared backlog. |
| **In-progress work** | Hidden | Intermediate tickets, sub-tasks, debugging state. Owners work privately; outsiders don't see the mess. |
| **Finished work** | Public | Curated digest. Becomes "your resume" — the approved outcome. |

The middle view is load-bearing: when work is in progress, it is *deliberately* not exposed, because intermediate state is often noisy, contradictory, or wrong. The car "goes into the shop and goes up on the stilts" — outsiders see neither the in-progress work nor the failed attempts. Only when the work converges to a finished form does it become visible again.

## Why a Graph

A linear issue list does not survive in a factory with multiple agents. Work has dependencies, prerequisites, blockers, parallelizable branches, and retries. The graph representation makes the factory's state (the wiki's synthesis of Yegge's graph + git + database description):

- **Inspectable** — the human can see what every agent is doing at any moment
- **Recoverable** — git-backed state means a crash doesn't lose work
- **Routable** — work has identity that can be assigned, queried, and aggregated
- **Auditable** — every transition is recorded; the ledger is the factory's log

Yegge's framing: future work is the "ledger" of what's outstanding, in-progress is the live workspace, finished is the "ants rights" — the curated record of what shipped.

## The Factory Implication

The work-ledger is the factory's actual interface (the panel's framing; the implementation pipeline below is Tessl's, per [[dru-knox|Dru Knox]]):

- Issue tracker (Linear, GitHub Issues) → GitHub CLI → agent → PR → review → ledger update
- The factory's "core unit" is "an issue tracker that can immediately delegate into an agent, it puts up a PR, you can leave feedback on the PR, the agent will address those and put up changes"
- Every other component (orchestrator, brain, sweeps) is auxiliary; the ledger is the load-bearing element

The ledger may also address [[aiming-problem|Eero Alvar's aiming problem]] (cross-wiki synthesis, not from this source): if work is structured, tuning the factory means tuning how the ledger's three views are populated, not tuning an opaque generation process.

## Ledger vs. Chat History

A factory whose state lives in chat history is not inspectable. A factory whose state lives in a graph-backed ledger is. The ledger is what lets the human intervene at the right level of abstraction — picking up a ticket, re-routing a work item, killing an in-progress branch — without re-deriving intent from a transcript.

The Tessl implementation ([[software-factory|software factory]] pattern): a Tessl app for Linear, a Tessl app for GitHub; the linear app delegates to the GitHub app, which kicks off CI jobs. The two apps are the minimum viable bridge between the public ledger and the source control. [[dru-knox|Dru Knox]] reports this being "surprisingly common" — every factory ends up needing the issue-tracker-to-source-control bridge as a primitive.

## Open Question: Ledger Schema

Beads does not impose a fixed schema. Any issue tracker can serve as the substrate (GitHub Issues, Linear, a custom graph). The wiki does not yet have evidence for which schema wins at factory scale — Yegge's framing is structural (the three views) not syntactic (specific field requirements). This is an open empirical question.

## Thread

- [[the-agent-workflow]] — The work ledger is what makes parallel agent work legible to the human
- [[the-multi-agent-theory]] — Without a shared work substrate, multi-agent coordination is unverifiable ([[functional-collapse]]); the ledger is the artifact-mediated communication channel
- [[the-slop-problem]] — Intermediate work being hidden is the factory's defense against slop leakage; the finished view is the curated subset
- [[the-cognitive-cost]] — Yegge's Beads-ledger factory is the shipped maximal-delegation frontier the cognitive-cost thread examines for skill erosion

## Related

- [[steve-yegge]] — Originator of the Beads framing
- [[software-factory]] — Beads is the factory's interface layer
- [[gas-town]] — Gas Town stores state in git; Beads formalizes the work-graph part of that state
- [[aiming-problem]] — The ledger makes the factory's output space inspectable, addressing the tuning challenge
- [[claude-code]] — The substrate that consumes the ledger entries
- [[orchestration-loop]] — The pattern that runs against the ledger
- [[context-engineering]] — The "brain" component (Yegge uses Obsidian) is a complementary context store, not the work ledger
- [[fresh-context-subagents]] — GSD Core's `.planning/` directory is a different artifact-shape for the same work-tracking problem

## Sources

- `raw/yt-steve-yegge-youll-never-write-code-the-same-way-again.md` — Yegge's Beads origin story: agents getting lost in markdown files, the three-view ledger (public future / hidden in-progress / public finished), graph + git + database access, work as first-class entity; Dru Knox (Tessl)'s issue-tracker-to-source-control bridge as factory primitive
