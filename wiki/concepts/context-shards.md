---
title: Context Shards
created: 2026-07-25
updated: 2026-07-25
sources:
  - raw/boundary-context-shards-shared-memory.md
unaudited_marginal: 0
tags: [concept, agent-memory, memory-sourcing, human-in-the-loop, context-engineering, team-memory, anti-slop]
---

# Context Shards

> A volume-based, team-aggregated, human-in-the-loop memory-sourcing pipeline for coding agents, designed live on Boundary's "AI that Works" podcast as a feature in [[humanlayer|HumanLayer]] (Dex Horthy's company). The "non-memory memory": instead of letting an agent append memories ad hoc, a supervisor agent mines *what the whole team keeps telling the agent*, surfaces candidates for human triage, and injects approved shards into the agent loop — fighting the additive-only "memory becomes slop" failure mode.

## The Problem: Memory Systems That Become Slop

The design (presented by Dex Horthy, HumanLayer) starts from a critique of existing agent memory. Claude's memory feature "aggressively adds memories," and once a memory exists the agent tries to follow that pattern in *new* codebases — "often not what I want." The stream describes disabling memory entirely inside HumanLayer ("when you run Claude and HumanLayer, the memory is just off") because the agent had, for example, learned from one offhand instruction to add an environment variable and then tried to attach environment-variable flags to *every* subsequent feature.

The deeper failure is **additive-only growth**. CodeRabbit and Claude memories both start clean, but after ~2 months they converge into "an ever-growing" list of 300+ items the user must manually audit — "they've all effectively converged into being the same as Claude memories." The signal-to-noise ratio collapses because nothing is ever retired and everything is captured at the same low bar.

## Volume-Based Memory: The Lagging Indicator

The proposed alternative is a **volume-based / lagging-indicator** memory philosophy. Rather than a single decision ("update my memory file"), memory is populated by *analytics over time*: the system watches what users say to the agent across many sessions and slowly surfaces the recurring patterns. The explicit trade-off, stated on the stream:

> "I'd rather have 20% useful memory — 20% of the possible memories, but all really useful and applied at the right time — way better than everything you might want to remember applied all the time."

The lagging indicator buys **usefulness over completeness**: by the time a pattern is surfaced, it has been observed often enough that it is almost never wrong, and it arrives at the moment it is relevant. This is the ingestion-time complement to the maintenance-time consolidation the wiki already tracks under [[dreaming]] and module U of [[agent-memory-systems]].

## The Context-Shards Design

### Extraction: A Supervisor Agent Over Session Transcripts
A separate subsystem — explicitly *not* a full agent, "just a bunch of little inference calls" with structured output — reads session transcripts and produces candidate memories. It mostly needs the user and assistant messages (token-efficient; tool calls and file contents are excluded because "all we're looking at is what does the user keep freaking saying"). This is the same externalized-context-management shape as the [[babysitter-agent]]: a dedicated process micro-analyzes the conversation so the main agent stays on task.

### Data Model: Session Statements and Citations
The extraction output is an array of **session statements**, each carrying:
- a **fact**;
- an array of **citations**, where each citation has a `who` (person ID), the verbatim `quote`, and a `conversation context` summary of why the thing was said;
- the citation array's length is the **prevalence count** — how many times the same statement was observed.

Prevalence is the core signal: "if five people on my team are doing the same thing, probably the sixth person should also do that."

### Team-Volume Aggregation: One Version of Truth
The design aggregates over the *whole team*, not one person. The stated goal is "one version of truth for my whole team" — a shared library that every team member benefits from, sourced from the volume of what everyone tells the agent. Personal shards are explicitly collapsed into the team library: "everything should be automatically shared," with users able to turn shared shards on/off for themselves (personal enablement on top of one canonical team library).

> [!note] Departure: Team-only vs. personal+shared context files. The wiki's [[context-files]] and [[agents-md]] pages present personal-vs-shared as a first-class dimension of context management. Context shards collapses it: there is one shared team library, and the only personal layer is *enablement* (turn a shared shard on or off). The design rationale is that a low bar for personal context files is what lets memory "turn to slop"; a single high-standard team library keeps the bar where it belongs. This is a product opinion, not a wiki consensus.

### Staged, Human-in-the-Loop Adoption
Candidates move through a staged pipeline before they ever reach an agent:
- **Triage** — a human reviews each candidate and decides good/bad. "You have to triage them. You have to decide if they're good or not. Otherwise it's useless."
- **Dismiss / snooze** — rejecting a candidate hides it for ~30 days, then re-checks ("remind me later if this is still true"). Persistent repetition re-surfaces the suggestion.
- **Bake-in** — once a shard is trusted, it can be committed as a file in the repo (a JSON or markdown file, "not owned by the SaaS"), making it durable and reviewable like any other code change.
- **Always-on vs. conditional** — shards can be injected into every session (always-on) or activated per-task by a fast classifier prompt over the conversation/artifacts.

### Injection and Triggers
Approved shards are injected into the agent's system prompt programmatically (HumanLayer "owns this ecosystem," so it need not edit `AGENTS.md` directly), or checked in as a config file the user's coding agent can modify. The system has **many triggers to the same pipeline**: a nightly **cron** (batch mode, laggy but cheap), a **Slack message** ("hey can you make a memory about this"), and **memory feedback** (marking a shard good/bad re-runs the supervisor). The user explicitly wants the HITL surface to live in Slack — "give me the inbox I already use" — rather than a new inbox.

### Decay
A further supervisor reads the active shards for a session and figures out "which ones haven't actually been used in a while," retiring stale shards. Decay is the maintenance-time counterpart to the volume-based ingestion filter: the system both *raises the bar on entry* and *lowers it on exit*.

## How It Relates to the Wiki's Memory Theory

> [!note] Synthesis: Context shards is a write-time slop filter that complements [[dreaming]]'s maintenance-time cleanup. Dreaming (Anthropic) is an *out-of-band* process that surveys a fleet's transcripts and proposes memory changes for human accept/reject — consolidation after the fact. Context shards applies the same out-of-band, human-in-the-loop, fleet-visible pattern at the *ingestion* layer: it raises the entry bar via volume/prevalence so that low-value memories are never stored in the first place. The two are orthogonal and compose — one prevents slop at write time, the other removes it at maintenance time.

> [!note] Extension: Team-volume aggregation is the novel twist over single-user fleet dreaming. Dreaming's "fleet" is the set of one user's (or one org's) agent sessions; its consolidation is driven by *recurrence across sessions*. Context shards is driven by *recurrence across people* — the unit of aggregation is the team, not the user. This is the same architectural move (supervisor + structured output + HITL + fleet visibility) aimed at a different source of signal: interpersonal consensus rather than intra-session repetition. Whether team-volume aggregation generalizes beyond HumanLayer's opinionated "one version of truth" posture is an open question.

> [!note] Extension: A product-level instantiation of module U with a volume-based twist on module S. Under [[agent-memory-systems]]' M = ⟨R,S,Q,U⟩ decomposition, context shards is a concrete, shipped-shaped example of the **maintenance** module (U) — triage, dismissal, decay, bake-in — and adds a *volume-gated* variant to the **extraction** module (S): rather than schema-free or schema-constrained extraction on a single stream, extraction is gated by cross-session/cross-user prevalence before a candidate is even stored.

## Anti-Slop Mechanism

Context shards is, explicitly, a memory-layer answer to [[the-slop-problem]]. The additive-only memory failure (CodeRabbit, Claude memories) is slop accumulation at the memory layer: every captured instruction is an unreviewed line, and the list grows faster than any human audits it. Context shards counters this with three slop-specific mechanisms:
- **Ingestion filter** — volume/prevalence gates what is stored, so low-value memories never enter.
- **Human triage + decay** — a human accepts/rejects and stale shards are retired, keeping the set small and high-signal.
- **High bar for entry** — the team library is held to "extremely high" standards ("there's only one context shard for your whole team. Only put things in here that are truly forever").

This is the memory-layer analog of the "containment" principle the slop thread documents elsewhere: bounded, human-reviewed, high-standard context instead of unbounded, auto-appended memory.

## Thread

- [[the-slop-problem]] — Context shards is a memory-layer anti-slop mechanism: volume-gated ingestion + human triage + decay against the additive-only "memory becomes slop" failure
- [[construction-time-memory]] — The nightly extraction + human review is offline memory-as-quality-substrate: invest off the agent's critical path to produce a better-maintained artifact

## Related

- [[dreaming]] — The out-of-band, fleet-wide, HITL memory-consolidation pattern context shards parallels; single-user fleet vs. team-volume aggregation
- [[agent-memory-systems]] — Context shards instantiates module U (maintenance) with a volume-gated twist on module S (extraction)
- [[agents-md]] — The "one version of truth for the whole team" is a team-level AGENTS.md/CLAUDE.md sourced by volume
- [[context-files]] — Same as above; the team library collapses personal+shared to a single shared context file with personal enablement
- [[babysitter-agent]] — The supervisor-agent extraction externalizes context/memory management to a dedicated process
- [[humanlayer]] — The product building context shards (Dex Horthy's company)
- [[dex-horthy]] — Presenter of the context-shards design on the stream (Dex Horthy, HumanLayer founder)
- [[vibv]] — Guest on the "AI that Works" podcast (Boundary) where the feature was built live
- [[claude-code]] — The Claude-memory failure mode (aggressive, cross-codebase, additive) that context shards reacts against
- [[the-slop-problem]] — Context shards as a memory-layer anti-slop mechanism

## Sources

- `raw/boundary-context-shards-shared-memory.md` — Boundary's "AI that Works" podcast, "Building a Shared Memory System for AI Coding Agents" (livestream, July 2026). Source for the full context-shards design: the critique of Claude/CodeRabbit additive-only memory, the volume-based/lagging-indicator memory philosophy, the supervisor-agent extraction pattern, the session-statement/citation data model, team-volume aggregation ("one version of truth"), staged HITL adoption (triage/dismiss/decay/bake-in), programmatic injection + Slack/cron/feedback triggers, and the anti-slop framing. **Note:** Multi-speaker livestream (hosts "Live" and "Dex" [Dex Horthy, HumanLayer]; guest "Vibe" [Vibv, Boundary]); the transcript carries `[mm:ss]` timestamps but no reliable per-line speaker labels, so specific quotes are attributed to the discussion/video rather than to a named speaker. The design is presented by Dex Horthy (HumanLayer founder), consistent with the video topic.
