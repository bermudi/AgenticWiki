---
title: Claude Tag
created: 2026-07-09
updated: 2026-07-15
sources:
  - raw/karpathy-claude-tag-third-paradigm.md
  - raw/yt-the-next-paradigm-shift-according-to-karpathy.md
unaudited_marginal: 0
tags: [project, agents, anthropic, slack, ui-ux]
---

# Claude Tag

> Anthropic's Slack-native agent, launched June 2026 in beta for Claude Enterprise and Team plans. Claude joins a workspace as a team member scoped to selected channels, tools, data, and codebases; team members tag it in and delegate work asynchronously while it builds per-channel context over time. Internally Anthropic reports it writes ~65% of the product team's code. [[andrej-karpathy|Karpathy]] framed it as the [[llm-ui-paradigms|third major redesign of LLM UI/UX]] — an "org-level harness," not a Slack bot.

## What It Is

Claude Tag integrates Claude into team workflows as a collaborator rather than a chat tab. Setup: connect a Slack workspace and grant Claude scoped access to selected channels, tools, data sources, and even codebases. Then anyone in a channel can `@Claude` to delegate a task.

Key mechanics:

- **Channel-scoped membership** — Claude is a team member with access only to selected channels.
- **Asynchronous delegation** — Tag Claude in, delegate, focus on other work; Claude breaks the task down, uses tools/context, and can run for hours or days.
- **Multiplayer** — One Claude per channel; any team member can see what it's working on and pick up the conversation where the last person left off.
- **Per-channel learning** — Claude accumulates context from the channels it's in, so users don't re-explain from scratch. It does not report from private channels.
- **Ambient / proactive mode** — When enabled, Claude proactively flags relevant information, follows up on quiet threads, and surfaces updates driven by channel activity rather than a user query (a real-world instance of [[proactive-service]]).

Theo draws a clean line to [[claude-code|Claude Code]]: where Claude Code is solo and synchronous, Claude Tag is the team-oriented, async, proactive counterpart.

## Internal Usage

Anthropic reports that tagging Claude is now "one of the main ways we get things done at Anthropic," and that an internal version writes ~65% of the product team's code. Theo notes the experience reads as "interacting collaboratively with a teammate" rather than driving a single-task chat. These are Anthropic's own characterizations (relayed via Theo), not externally validated productivity measurements.

## Availability

At launch (June 2026): beta, for Claude Enterprise and Team plans, on Slack — which Anthropic frames as the first surface. Theo, a self-described "Slack hater," is "excited for this to come to other things."

## The Karpathy Framing

[[andrej-karpathy|Karpathy]]'s post celebrated Claude Tag as the [[llm-ui-paradigms|third paradigm of LLM UI/UX]] — a persistent, asynchronous, org-wide entity — and, when mocked, defended it as an **"org-level harness"** rather than a bot. See [[llm-ui-paradigms]] for the full framing and its defining properties (channel as context boundary, multiplayer, async, proactive).

## Tension: Model Lock-In

[[theo-t3gg|Theo]]'s sharpest critique: Claude Tag binds the paradigm to a single lab. His own equivalent — a "Hermes agent" running in Discord, one Docker isolate per channel/purpose — lets him switch models freely (GLM, GPT-5.5, Claude, Fable) and delegate across models (Codex/GPT-5.5 calling Claude for API/UI work). Claude Tag offers none of that. He wants competitors to clone the pattern so teams aren't locked to one lab's models and boundaries. See [[llm-ui-paradigms#Tensions]].

## Thread

- [[the-agent-workflow]] — Claude Tag instantiates the move from session-driven agent use to a persistent, async, proactive teammate embedded in the team's coordination layer.

## Related

- [[llm-ui-paradigms]] — Karpathy's three-paradigm framing; Claude Tag is the paradigm-3 instance
- [[claude-code]] — The solo/synchronous sibling; Claude Tag is its team-oriented, async, proactive counterpart
- [[notion]] — Notion's collaborative workspace and embedded coding agents provide a similar shared-space pattern for human/agent collaboration, but in a document-centric rather than chat-centric substrate
- [[shared-understanding]] — Both Claude Tag and Notion are infrastructure for team-level shared understanding
- [[context-engineering]] — Channel-scoped context is Claude Tag's context boundary
- [[proactive-service]] — Ambient mode is agent-initiated, state-change-driven alerting
- [[afk-agent]] — Async, self-scheduling task execution over hours/days
- [[andrej-karpathy]] — Originated the third-paradigm / org-level-harness framing
- [[theo-t3gg]] — Practitioner analysis and model-lock-in critique

## Sources

- `raw/karpathy-claude-tag-third-paradigm.md` — Karpathy's original X post (June 2026): the three-paradigm framing and the "org-level harness" defense.
- `raw/yt-the-next-paradigm-shift-according-to-karpathy.md` — Theo (t3.gg): Claude Tag's mechanics (multiplayer, per-channel context, ambient/proactive, async), the model-lock-in critique, and the per-channel isolate practitioner experience.
