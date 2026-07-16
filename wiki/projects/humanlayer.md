---
title: HumanLayer
created: 2026-07-16
updated: 2026-07-16
sources:
  - raw/yt-context-engineering-with-dex-horthy.md
  - raw/yt-chroma-context-engineering-episode-1-dex-horthy-dexhorthy.md
unaudited_marginal: 0
tags: [project, ide, collaboration, software-factory, agent-harness]
---

# HumanLayer

> [[dex-horthy|Dex Horthy]]'s company — an AI IDE and collaboration platform, and "building blocks for your [[software-factory]]." The pitch: engineers solving hard problems in complex codebases move 2–3× faster without descending into [[the-slop-problem|slop]]. The thesis underneath the product: the IDE and the pull request were designed for humans typing code, and both need rethinking from the ground up for a world where agents do the typing and humans supply the judgment.

## Origin

HumanLayer began as an API platform for routing human-approval requests to agents ("who's on call to approve this, and can they escalate, delegate, or defer it") — a direct productization of the [[12-factor-agents|12 Factor Agents]] principle "contact humans with tool calls." That work, and Dex's deepening practice of [[context-engineering]] and [[harness-engineering]], evolved into a full IDE/company that came out of stealth. (The company is technically the same legal entity as an earlier data-engineering pivot, Metalytics.)

## The Product Thesis

Two intertwined bets:

### 1. The IDE, redesigned for agents
Most editors started as a text field and bolted on an agents tab. HumanLayer started from the opposite end — *what is an IDE designed to help a developer interact with and manage the work of agents?* — and built outward. The bet is that agent-first work needs a different primary surface than a file editor.

### 2. Kill the pull request
The PR is a discrete, high-latency review unit inherited from GitHub (itself a layer on top of Git, not part of Git). It forces all review into one batched moment after implementation is done, which is exactly the wrong time to steer — by then the direction is committed and it's often cheaper to restart than redirect. HumanLayer's alternative is **Google-Doc-style real-time collaboration on agent work**: a cloud platform where humans comment, agents surface mockups / mermaid / HTML, and review happens *during* the work rather than after it.

The architectural pieces that enable this: a sync engine, durable streams (Dex cites the Electric SQL team's work), agentic traces, documents, tasks/projects grouping them, and actual git diffs streaming everywhere. The data model question the company is working through: what does engineering work look like when everybody's agent sessions, traces, and diffs live in a shared environment anyone can interact with — the way Slack gave ambient visibility that email couldn't, and GitHub gave cross-team visibility that pre-GitHub trackers couldn't.

## What It Is Not

HumanLayer is explicitly *not* a [[dark-factory|dark factory]] — Dex built and shut down one of those. The product is built around [[token-harder-vs-token-smarter|token-smarter]] principles: keep humans in the loop at the leverage points (planning, design review), use AI for the SDLC's middle phases (spec → plan → implement), and make the human-agent checkpoints continuous rather than discrete.

## Thread

- [[dex-horthy-agentic-engineering]] — HumanLayer is the productized form of Dex's worldview: RPI as collaborative checkpoints, token-smarter as the default posture
- [[the-agent-workflow]] — The IDE is an attempt to rebuild the workflow's HITL phase as continuous collaboration rather than batched PR review
- [[intent-to-code]] — "Kill the PR" reframes where the intent→code handoff lives

## Related

- [[dex-horthy]] — Founder
- [[12-factor-agents]] — The framework the original product was built around ("contact humans with tool calls")
- [[software-factory]] — HumanLayer sells "building blocks for your software factory"
- [[research-plan-implement]] — The planning checkpoints the IDE productizes
- [[dark-factory]] — The failure mode HumanLayer is explicitly designed against
- [[token-harder-vs-token-smarter]] — The posture the product encodes
- [[single-player-to-multiplayer]] — The shared-environment collaboration model is the multiplayer-engineering vision
- [[claude-code]] / [[opencode]] / [[pi]] — The harness layer HumanLayer sits alongside/replaces

## Sources

- `raw/yt-context-engineering-with-dex-horthy.md` — The product reveal: agent-first IDE, "kill the pull request," Google-Doc-style collaboration, sync engine and durable streams, the Slack/GitHub visibility analogies (1:21:16–1:26:37); the Metalytics origin (13:50).
- `raw/yt-chroma-context-engineering-episode-1-dex-horthy-dexhorthy.md` — The earlier human-approval-as-tool API platform that preceded the IDE.
