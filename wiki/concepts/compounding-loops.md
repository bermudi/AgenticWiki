---
title: Compounding Loops
created: 2026-07-02
updated: 2026-07-02
sources:
  - raw/yt-wtf-is-loop-engineer-how-to-setup-for-real.md
unaudited_marginal: 0
tags: [concept, agent-loops, orchestration, shared-state, agent-harness, production]
---

# Compounding Loops

> A coordination pattern for [[orchestration-loop|orchestration loops]]: independent agent loops (support, SEO, growth, ads) that cooperate *laterally* through a shared durable file system — a "signals" layer of artifacts, contracts, and logs that every loop both reads and writes — so that insight from one loop compounds into the work of the others. Distinct from hierarchical loop-supervising-loop orchestration: here the loops are peers, and the filesystem is the shared brain.

## The Pattern

[[ai-jason|AI Jason]] runs several loops in production at his company — a **support loop** (every 30 minutes), an **SEO loop** (daily), a **growth/ads loop** — and the thing that makes them more than the sum of their parts is a shared file system. Each loop does investigation and action, and *also* writes what it noticed into shared folders. The next loop reads those folders before it acts.

> "Making sure each agent loop both read and write from those shared folder systems... all those different loops are happening every hour or every day share the same brain." Jason calls the result the "compounding" effect (the transcript's auto-caption renders it "component," but he names the pattern "compounding loops" elsewhere in the same video).

Concrete example of the compounding: the support loop notices several users asking how to export files and creates a **signal** ("export to MD file," logging which users hit it). The SEO loop, doing its daily analysis, reads that same signals folder and prioritizes organic content for the export feature. The ads loop finds a high-CTR keyword with no organic content and writes a signal; the SEO loop picks it up. None of these loops supervise each other — they share state.

## Compounding vs. Supervision

This is the key distinction from [[orchestration-loop]]:

| | [[orchestration-loop]] | Compounding loops |
|---|---|---|
| **Topology** | Hierarchical — one loop supervises many | Lateral — peer loops |
| **Coordination medium** | Direct dispatch / control | Shared durable file system |
| **What flows** | Tasks and results | Signals, artifacts, logs |
| **Failure coupling** | Supervisor failure cascades | A loop failing leaves stale signals, not a crash |

The two patterns compose: an orchestration loop can sit on top of compounding peer loops, dispatching work into a shared-state substrate. But the substrate is the load-bearing idea here — it is what lets independent loops compound without anyone orchestrating them directly.

## Three File Types

Jason's setup rests on three categories of durable file:

1. **Artifacts** — the output of each loop's work: docs, signals (product ideas / frictions / opportunities), tasks, tickets. Each artifact type has its own folder with a README defining what goes in, what doesn't, the process for adding items, and a schema. Each artifact carries metadata frontmatter, a body, and a **timeline** logging every change.
2. **Contracts** — per-loop. A README capturing the loop's **goal, workflow, boundaries, outstanding backlog, and timeline**. On each wake the loop reads its contract, understands the goal and what happened before, and takes its next action. The contract is the loop's memory and steering wheel.
3. **Logs** — a global `work-log.md` each agent appends to after a big chunk of work and reads the last 5–10 entries of before starting. This captures cross-domain context and ad-hoc information that doesn't fit a typed artifact.

> [!note] Synthesis: The Filesystem as Shared Memory
> The shared artifact/signal/log layer is, in effect, a [[procedural-knowledge|procedural]] and episodic memory substrate implemented as plain files — the same impulse behind [[code-as-agent-harness]] (state lives in the filesystem, not in the model) and [[evolving-context]]. The compounding-loops pattern is that idea applied to *coordination between loops* rather than persistence within one. This framing is the wiki author's synthesis, not stated by the source.

## Codebase Prerequisites: Legible, Executable, Verifiable

Before any of this works, the codebase itself has to be loop-ready. Three properties, in Jason's framing:

- **Legible** — the agent can find where to change what. An indexed `AGENTS.md` pointing to documentation, *plus* custom lint rules that inject context: in his monorepo, any import from a legacy folder surfaces an automatic warning. You cannot rely on the agent to find the right information for every task — bake the rules into programmatic checks. (See [[context-files]] and [[backpressure]].)
- **Executable** — the agent spins up the dev server with near-zero cognitive load. A `dev.local` script, worktree-friendly so five parallel agents don't collide, and scripts to jump to specific states (on/off states) to test scenarios.
- **Verifiable** — the agent gets tools to test and log results. [[agent-friendly-tooling|Playwright CLI]] (records video clips attachable to PRs), e2e tests for critical flows (signup, upgrade), and a PR skill defining mandatory pre-PR steps.

> [!warning] Never Let an Agent Self-Verify
> The load-bearing rule in the verifiability layer: *"Don't get agent to self-verify its own work. It just generally didn't work that well."* The PR skill always tells the agent to **spawn a read-only verifier agent with a detailed spec** instead. This is the [[verification-loop]] principle restated at the loop level — and it is the same architectural rule this wiki's own ingest pipeline uses (editing and verification must be separate sessions). A loop that grades its own homework is the failure mode.

## Thread

- [[orchestration-loop]] — The sibling coordination pattern: hierarchical supervision vs. this page's lateral cooperation. The two compose.
- [[the-agent-workflow]] — Compounding loops are the AFK substrate scaled to a fleet of cooperating loops; the codebase prerequisites belong to the workflow's production layer
- [[multi-agent-illusion]] — This is hand-designed, deterministic multi-loop coordination — the case the audit vindicates, not the auto-searched topology it indicts. Every added loop is still added cost.

## Related

- [[orchestration-loop]] — Hierarchical sibling; loops supervising loops
- [[agent-loop]] — The unit each compounding loop is built from
- [[verification-loop]] — The read-only-verifier rule is verification-loop discipline at loop scale
- [[code-as-agent-harness]] — State in the filesystem as the coordination medium
- [[backpressure]] — Custom lint rules that mechanically reject wrong agent output
- [[agent-skills]] — The PR skill and setup-codebase-harness skill are the procedural units
- [[ai-jason]] — Originator of the pattern

## Sources

- `raw/yt-wtf-is-loop-engineer-how-to-setup-for-real.md` — The compounding-loops-via-shared-signal-file-system pattern, the loop contract (goal/workflow/backlog/timeline), the three file types (artifacts/contracts/logs), the codebase prerequisites (legible/executable/verifiable), and the read-only-verifier rule.
