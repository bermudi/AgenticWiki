---
title: Orchestration Loop
created: 2026-07-01
updated: 2026-07-02
sources:
  - raw/wtf-is-a-loop-peter-steinberger-vs-boris-cherny.md
  - raw/yt-wtf-is-loop-engineer-how-to-setup-for-real.md
  - raw/yt-i-guess-were-writing-loops-now.md
unaudited_marginal: 0
tags: [concept, agent-loops, orchestration, multi-agent, durability, cron]
---

# Orchestration Loop

> Stage 5 of the [[agent-loop|agent-loop]] lineage: a loop whose unit of work is other loops. It dispatches and supervises multiple agent loops concurrently and on a schedule (cron / infrastructure time), with explicit durability — git-backed shared state and crash recovery — so the system survives a restart. The genuinely new layer that [[boris-cherny|Boris Cherny]] and [[peter-steinberger|Peter Steinberger]] mean when they say "designing loops that prompt your agents."

## What Changed From the Ralph Loop

The single-agent [[ralph-loop|ralph loop]] (Stage 3) assumed your terminal stayed open. The 2026 orchestration loop assumes it does not. Four things changed to produce a genuinely new pattern, not just a renamed one:

1. **The loop became the unit of work, not the task.** Ralph's unit was one task per iteration; the orchestration loop's unit is a whole loop.
2. **Loops started supervising other loops**, concurrently and on a schedule. One loop dispatches and oversees many.
3. **Scheduling replaced the human kickoff.** The loop runs on infrastructure time (cron) instead of your attention — it does not need you to start it.
4. **Durability became explicit.** Git-backed shared state and crash recovery are first-class, because these systems have to survive a restart.

> [!note] Orchestration Loop vs. Babysitter Agent
> The [[babysitter-agent|babysitter agent]] is a different persistence mechanism. The babysitter is *invisible* to a single master orchestrator and manages that one master's context across session boundaries — a subconscious mind. The orchestration loop supervises *many* loops on a schedule and owns durability at the system level. Babysitter = single-master context care; orchestration loop = multi-loop supervision on infrastructure time.

### The Orchestration Layer *Is* the Harness

[[ai-jason|AI Jason]] gives the cleanest reframing of what Stage 5 actually is. He splits agent optimization into two parts: (1) the **agent loop itself** — Claude Code, Codex, a custom harness — all the techniques for completing one task well; and (2) the **outer environment** that decides *what should be worked on*, triggers agents, and tracks state and logs so the system improves. That outer part is "loop engineer." The orchestration loop is not a fancier prompt; it is the harness/environment layer — everything non-model wrapped around the agent runtime. This is why the [[multi-agent-illusion]] audit does not touch it: it indicts auto-searched model-side topologies, not the deterministic harness that schedules and supervises.

### Supervision vs. Cooperation

There are two ways loops multiply, and they are easy to blur. **Hierarchical supervision** (this page): one loop dispatches and oversees others. **Lateral cooperation** ([[compounding-loops]]): peer loops share a durable file system — signals, artifacts, logs — and compound through shared state without anyone supervising anyone. The two compose: a supervising orchestration loop can dispatch work into a shared-state substrate where cooperating loops pick it up. But cooperation through shared files is a distinct coordination mechanism, and it is the one that produces the "compounding" effect practitioners report.

### Dynamic Loop Generation: Loops That Make Loops

The frontier of Stage 5 is not a fixed supervisor dispatching fixed sub-loops — it is loops that *generate their own sub-loops* to fit the work. [[theo-t3gg|Theo]] hit this accidentally: he asked the model to build a workflow that files a PR, spins up a review thread, loops on comments until approvals, then merges and triggers the next piece. It built it — and ran overnight, producing four stacked PRs, "reviewed to hell and back, all merged."

> "I asked the model if I could make this loop and it made a loop that makes sub loops dynamically. This isn't a hard-coded 'every time I make a change, I spin up one reviewer'... My loops created loops."

The consequence: **the shape of the loop is generated from the shape of the work.** Instead of forcing work into a static agile-sprint skeleton, the orchestration topology is synthesized to fit the specific multi-stage problem. This is a real step beyond hardcoded Stage-5 supervision — and it is also where runaway cost lives: one of these generated workflows ran eight hours and burned over three million tokens to address three review comments.

## Canonical Implementations

### Boris Cherny's Setup

[[boris-cherny|Boris Cherny]] does not prompt Claude at all anymore. He writes loops that prompt Claude, and a couple hundred agents read his GitHub, Slack, and Twitter and decide what to build next. He runs his loops on cron. The on-ramp is Claude Code's `/loop` command — his canonical starter, paste-and-change-the-nouns:

```
/loop babysit all my PRs. Auto-fix build issues, and when comments come in, use a worktree agent to fix them.
```

His fuller recipe (five tips for running Opus autonomously for hours or days): use auto mode for permissions so Claude doesn't ask for approval; use dynamic workflows to have Claude orchestrate hundreds or thousands of agents; use `/goal` or `/loop` to nudge Claude to keep going until it's done; use Claude Code in the cloud so you can close your laptop; and make sure Claude has a way to self-verify its work end to end. Tip five is the one the hype skips and the practitioners obsess over: a loop is only as good as its ability to check its own work.

### Gas Town (Steve Yegge)

[[gas-town|Gas Town]], launched January 2026 (per the article's June 2026 chronology) and open source, is the deep-end instantiation: 20–30 Claude Code instances coordinated by a **Mayor agent**, with **patrol agents** that run continuous loops. State is stored in git so work survives a crash. This is the continuous orchestration loop that supervises other threads — shipped, not theoretical.

## The Multi-Agent Tension

> [!note] Departure: This Is the Hand-Designed Case That Works
> The source presents orchestration loops ("hundreds or thousands of agents") with enthusiasm. The [[multi-agent-illusion]] audit is the empirical correction to *automated* multi-agent optimism: across 6 auto-searched MAS frameworks, multi-agent systems do not consistently outperform single-agent CoT-SC and cost up to 10× more. The reconciliation is that the audit vindicates **hand-designed, deterministic** orchestration (the [[expert-mas]] baseline: GPT-5 57.0% → 96.5%) and only indicts architectures discovered by automated search. Gas Town and Cherny's setups are hand-designed/deterministic orchestration loops — the case that works — not auto-searched topologies. The orchestration loop is therefore not contradicted by the audit, but its enthusiasts should not read it as license for unconstrained agent multiplication: every added loop is added cost and coordination overhead, and the cost-quality Pareto position is a first-class metric.

The orchestration loop inherits the [[agent-loop|hard-stops discipline]]: maximum iteration count, no-progress detection, a token-or-dollar budget ceiling. Without them, the supervising loop is the failure mode — the loop that does not stop, at scale.

## Thread

- [[the-agent-workflow]] — The orchestration loop is the AFK execution substrate scaled to multi-agent, scheduled, durable operation
- [[multi-agent-code-orchestration]] — The architectural vocabulary (roles, topologies, artifact-mediated communication) that orchestration loops instantiate
- [[the-verifiability-thesis]] — The orchestration loop inherits hard stops as the loop's economic verification feedback channel; the cost-shift thesis frames the dollar cost as a third axis on the verifiability causal chain

## Related

- [[agent-loop]] — The umbrella concept and five-stage lineage; this is Stage 5
- [[ralph-loop]] — Stage 3, the single-agent loop that orchestration loops supervise
- [[compounding-loops]] — Sibling pattern: lateral cooperation via shared state rather than hierarchical supervision
- [[babysitter-agent]] — Different persistence mechanism (invisible single-master context care)
- [[multi-agent-code-orchestration]] — The code-as-harness framework's multi-agent layer
- [[multi-agent-illusion]] — Tempers orchestration enthusiasm; vindicates hand-designed, indicts auto-search
- [[gas-town]] — Canonical open-source implementation
- [[verification-loop]] — The self-verification that makes an orchestration loop trustworthy
- [[afk-agent]] — Orchestration loops are AFK execution at system scale

## Sources

- `raw/wtf-is-a-loop-peter-steinberger-vs-boris-cherny.md` — The four changes that define Stage 5, Cherny's setup (hundreds of agents, cron, the `/loop` on-ramp, five tips), and Gas Town (Mayor + patrol agents, git-backed state, open source).
- `raw/yt-wtf-is-loop-engineer-how-to-setup-for-real.md` — The "loop engineer as outer harness" reframing (Stage 5 is the harness/environment layer, not model-side topology) and the shared-state cooperation that motivates [[compounding-loops]].
- `raw/yt-i-guess-were-writing-loops-now.md` — Dynamic loop generation ("my loops created loops"), the overnight four-stacked-PR run, the /goal-vs-dynamic-workflow distinction, and the runaway-cost cautionary data.
