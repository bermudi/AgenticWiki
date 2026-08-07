---
title: Pinned Threads
created: 2026-08-06
updated: 2026-08-06
sources:
  - raw/full-workshop-setting-yourself-up-for-success-jason-liu-openai-codex.md
unaudited_marginal: 0
tags: [concept, openai-codex, threads, automations, compaction, memory, orchestration]
---

# Pinned Threads

> In OpenAI Codex, a **pinned thread** that is renamed to a project ID becomes the project's long-lived owner — delegating to sub-agents, writing to the memory vault, waking on a heartbeat, and messaging other pinned threads — so a set of pinned threads feels like a team of teammates.

## Summary

[[jason-liu|Jason Liu]] (OpenAI Codex, 2026) describes his core organization loop in one sentence:

> Pin the thread, rename it to the project ID, and that project thread should be able to delegate to sub-agents, create new threads, and write to your **memory vault**.

This is Codex's distinctive answer to context management. The old guidance — "after ~20 messages, start a new thread; every feature needs its own session; new thread for each code review" — is, in his claim, no longer true. His longest threads are **five weeks old with ~400 sub-agents** and "generally just know what they need to do," which he attributes to Codex's compaction. The pinned thread is therefore not a chat log but a **durable workstream owner** that outlives any single sub-agent session.

## The Pattern

### 1. Pin + Rename + Delegate

- **Pin** a thread in the Codex sidebar.
- **Rename** it to the project ID (the act-one/act-two/act-three split for his slides is his demo: one thread per act, each pinned and emoji-color-coded by readiness).
- From there the thread **delegates** — spawning sub-agents and creating new threads — and **writes back** to the personal monorepo vault. The code itself is not saved inside the pinned project's directory: a one-line `AGENTS.md` rule offloads it ("save all code under `/dev`; the monorepo is the vault, not the workspace"). Review happens on GitHub.

Only one project is pinned in the sidebar at a time (the monorepo itself); Codex is free to manage files anywhere on the filesystem. The pin is for *you*, not the computer: "the computer doesn't know the folders, but the folders are for me."

### 2. Compaction Holds It Together

The reason the pattern works — per Liu — is that **compaction works**. He is deliberately vague about the mechanism ("it might have to do with how Codex memories are set up; I've not dug in") and offers no controlled metric, only lived experience: he "never experienced" context collapse, doesn't use `@-mention` anymore, and his `check_notes` skill (150,000 invocations) has not been triggered in 2–3 months because the memory system handles it.

For the wiki this is theory pressure on the canonical guidance:

- [[the-agent-workflow#Managing Context|The Agent Workflow — Managing Context]] and [[smart-zone-dumb-zone]] teach that long sessions degrade reasoning and that summarization is lossy. Liu's claim is that Codex's deployment has materially raised that ceiling — whether through better summarization, an auxiliary memory store, or both is unstated.
- The practical corollary: **don't prematurely shard**. Try keeping the project in one thread before inventing a multi-thread workflow. If the thread can still route ("what has changed about the launch?" with no tags), you are still inside the compaction horizon.
- The counter-argument still stands for other harnesses. Liu's claim is client-specific; the open literature ([[agent-memory-systems]] Finding 4, [[context-engineering#Compaction]]) still reports general compaction as blunt and lossy.

> [!note] Extension — Codex-specific, not harness-general
> Liu's compaction claim is self-reported, from a single practitioner with unlimited tokens on a single client (Codex, gpt-5 family). The wiki holds it as a Codex-conditional finding, not a retraction of the broader context-rot diagnosis. Other clients (Pi, Claude Code, Cursor) and the benchmarked memory systems still show distance-dependent degradation. Treat it as "Codex + gpt-5 manages 5-week/400-sub-agent coherence in Liu's vaulted workflow" and test before generalizing.

### 3. Threads Talking to Threads

Every thread can call three primitives:

- `list_pin_threads` / `list_threads`
- `rename_thread`
- `send_message_to_thread`

The design implication is a **ladder**:

| Stage | Who manages whom |
|---|---|
| IC + IDE | You prompt one session at a time |
| Manager + ICs | You manage a team of pinned threads; each thread manages sub-agents/IC threads |
| Manager of managers | Threads manage each other — the monitor thread (below) is the first real instance |

Liu's hands-free demo: "Sometime last week I was working on slides — go find that thread, rename it, pin it for next time" — all by voice + appshot, without typing a slash command.

### 4. Heartbeats — Scheduling a Message Into the Same Thread

A **heartbeat** or **thread automation** is just a scheduled message back into *the same* pinned thread:

```
keep an eye on this every 30 minutes
keep an eye on this until <deadline>
```

Early Codex gave each automation a fresh thread (morning brief in a new thread). As compaction improved, the design shifted to **same-thread heartbeats** — the message wakes the thread, the thread does work in its accumulated context, and the next heartbeat re-enters that context.

Common heartbeats Liu runs:

- **Loop / PR babysitter:** "Keep an eye on this PR — fix feedback, keep it rebased on master, keep CI green." By Thursday afternoon the PR is merged.
- **Support triage:** appshot → DX triage skill → post in `browser-feedback`, DM James, reply on Twitter via computer use, then check hourly until James responds and close the loop with the reporter.
- **Chief of staff:** pinned, fires daily at 8 a.m. (or "every 30 minutes" during intense weeks), checks Gmail/Slack/Linear/meetings, produces a formatted brief with deep-links, drafts replies, and — in Liu's favorite variant — opens a Chrome tab per email needing a reply so the human can review drafts between meetings.
- **Flight check-in:** a Spark agent watching for check-in emails, downloading boarding passes to iMessage.

Sleep and quiet controls: "if no updates, reply with one word: no updates"; "it's 9 p.m., haven't seen Jason post in two hours — sleep five hours"; weekday/weekend frequency files (the heartbeat itself is just a text file you can edit mid-run). The hard-wiring promise of [[orchestration-loop]] (max iteration count, no-progress detection, dollar ceiling) is inherited here as well.

### 5. Goals and Ultra-Goals

- **`/goal`** — run until a small verifier model confirms done. Liu's demo: "migrate the Python backend to Rust, ensure all unit tests pass" — producing a Rust port of the rich terminal library and a TypeScript port of `uv` at 100% coverage.
- **Ultra-goal** (`goal.md` + `plan.md` + optional `state.md`/work log in the monorepo) — the same primitive but persisted to the filesystem so you can **edit the goal while the loop runs** as the plan changes. Long-running (day-or-two) tasks log to `state.md` for the human to skim via a side chat instead of reading a 4 GB session JSON.

### 6. The Monitor Pattern — Orchestration Over Heartbeats

The newest and most "agentic" piece:

- One long-lived **monitor thread** watches all signals (Twitter, Slack, connectors).
- When it spots a novel issue it **creates a new pinned thread** per issue. That thread owns triage, waits on humans and PRs, and checks back hourly.
- If the same issue recurs, the monitor **messages the existing downstream thread** rather than creating a duplicate ("this is recurring") and nudges the main thread: "third day this issue has been live — should we do something?"

Why pinned threads and not sub-agents? Sub-agents are shapeless background entities in a JSON blob; pinned threads are **named and visible in the sidebar**. The sidebar becomes the workstream hub — new issues announce themselves by appearing there.

The progression is deliberately framed as `[[orchestration-loop]]` and `[[compounding-loops]]`: monitor loops supervise loops, and lateral loops cooperate through shared signals/artifacts/logs.

## Why It Matters

- **For memory:** Pinned threads are the execution substrate that makes the personal monorepo vault (see [[openai-codex#The Personal Monorepo Vault|OpenAI Codex — Personal Monorepo Vault]] and [[agent-memory-systems]]) durable. The thread is the writer; the vault is the store; the heartbeat is the maintenance schedule; `git diff` is the audit.
- **For workflow:** This is the productized instantiation of the [[the-agent-workflow]] HITL→AFK cycle and of [[orchestration-loop]] Stage 5. The "keep an eye on this" phrase is the user-facing syntax for what the framework calls an orchestration loop.
- **For tool design:** Thread-to-thread messaging plus pinning is a visibility choice: make orchestration *legible* rather than hidden, so the human can audit the factory without reading traces.
- **For costs:** Liu's variant is explicitly tuned for token abundance (unlimited tokens, Chief of Staff on medium thinking, looser permission posture, heartbeats that would be token-expensive for others). The pattern transfers, but the frequency/verbosity budget likely does not for cost-constrained teams.

## Limitations and Open Questions

- **Memory bleed across projects.** Multiple questioners pushed Liu on cross-project bleed (npm vs pnpm, etc.). His mitigation is per-project `AGENTS.md` and README discipline, but he treats it as a light problem ("I'd be curious what's so bad about the bleeding"). The wiki's [[agent-memory-systems]] Finding 3 ("hallucinations of the past" / update robustness) suggests bleed is structural, not just a prompt fix.
- **Generality of compaction.** See the Extension callout above — this may be Codex-specific and model-family-specific (gpt-5 low/medium). Other harnesses and the benchmarked memory systems still degrade with distance.
- **Permission posture.** His `auto review` (not YOLO, not ask-every-time) and org-level MCP caps suit OpenAI's environment; a team without those caps may need stricter guardrails before running monitor loops that DM owners and tweet escalations.

## Thread

- [[the-agent-workflow]] — Pinned threads + heartbeats provide the 2026 productized form of the HITL→AFK loop; monitor → subthread spawning is the orchestration-loop instantiation
- [[the-human-lever]] — The human's job moves from driving threads to curating pinned workstreams (folders-for-the-human, git-diff-as-review)
- [[tool-design-for-agents]] — Visibility-via-pinning as a design choice (legible orchestration)

## Related

- [[openai-codex]] — the project that ships these primitives
- [[appshot]] — the capture primitive that typically triggers a pinned-thread workflow
- [[jason-liu]] — the practitioner source
- [[agent-loop]] — heartbeat/goal/ultra-goal in the loop lineage
- [[orchestration-loop]] — monitor as orchestrator of loops
- [[compounding-loops]] — monitor vs subthreads as lateral cooperation through shared state
- [[agent-memory-systems]] — the vault + `git diff` + heartbeat as a full M = ⟨R,S,Q,U⟩ instance
- [[context-engineering]] — compaction claim and its tension with Smart Zone guidance
- [[dreaming]] — the out-of-band maintenance analogue; Liu's `git diff` review is the human-in-the-loop version
- [[context-shards]] — volume-gated HITL memory maintenance; Liu's per-project AGENTS.md scoping is a lighter sibling
- [[afk-agent]] — heartbeat-driven threads as persistent AFK agents with a self-wake schedule

## Sources

- `raw/full-workshop-setting-yourself-up-for-success-jason-liu-openai-codex.md` — The sole source for this page: Liu's workshop defines pinned-thread semantics (pin + rename to project ID, delegate to sub-agents, write to vault, `/dev` offloading), the compaction claim (five weeks / 400 sub-agents vs old 20-message sharding), thread-to-thread primitives (list/rename/send), heartbeat phrasing and controls (frequency, no-updates, sleep), goal vs ultra-goal (goal.md/plan.md/state.md), the monitor → per-issue-subthread + recurrence-message pattern, sidebar-as-hub visibility rationale, and the bleed/generalization caveats (per-project AGENTS.md, `check_notes` skill atrophy, "it just kind of knows").
