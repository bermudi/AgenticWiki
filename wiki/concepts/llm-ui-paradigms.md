---
title: Three Paradigms of LLM UI/UX
created: 2026-07-09
updated: 2026-07-09
sources:
  - raw/karpathy-claude-tag-third-paradigm.md
  - raw/yt-the-next-paradigm-shift-according-to-karpathy.md
  - raw/yt-l8-principal-s-agentic-engineering-workflow.md
unaudited_marginal: 0
tags: [concept, llm, ui-ux, agent-design, context-management, agents]
---

# Three Paradigms of LLM UI/UX

> Andrej Karpathy's three-stage model of how humans interact with LLMs: (1) the LLM as a **website** you visit, (2) the LLM as an **app** you download, (3) the LLM as a self-contained, **persistent, asynchronous entity** with org-wide tools and context working alongside teams of humans. The third paradigm — instantiated by Anthropic's [[claude-tag|Claude Tag]] — is the live thesis: the agent lives where work already happens, scoped to a channel, rather than in a dedicated session you context-switch into. Karpathy calls this an **"org-level harness,"** not a Slack bot.

## The Three Paradigms

Karpathy posted this framing on X in June 2026, in response to Anthropic's Claude Tag launch:

1. **Website** — You navigate to a chat interface (early ChatGPT, Claude web). The model lives at a URL you visit and leave.
2. **App** — A dedicated desktop/mobile application brings the model closer to your local machine, files, and workflow.
3. **Persistent async org-level entity** — A self-contained agent that lives inside the tools and conversations where work already happens (Slack, etc.), with org-wide tools, context, and asynchronous execution. It doesn't require context-switching or a dedicated session; it is already present where the team works.

Karpathy's phrasing: *"This third one is that it is a self-contained, persistent, asynchronous entity with org-wide tools and context, working alongside teams of humans. It really takes a while to wrap your head around it, but it works and it is awesome."*

This is a UI/UX lineage **parallel to** Karpathy's [[software-1-2-3|Software 1.0/2.0/3.0]] model of how we program — both are three-stage "where does the intelligence live" framings by the same author. Here the axis is the *location and persistence* of the model in the human's workflow, rather than the programming substrate.

## The "Org-Level Harness"

When the post drew mockery (Karpathy "got clowned on" for hyping what looked like a Slack bot), he pushed back that the framing matters:

*"This isn't a feature like some crappy Slack bot and it's certainly not a claw, though it has some aspects of it. It's an org level harness. The difference will become clearer over time."*

The distinction this gestures at: where a **bot** is a thin feature layered on top of chat, an **org-level harness** is a first-class deployment boundary where the agent's tools, context, memory, identity, and permissions are scoped and managed at the organizational/team grain rather than the individual-session grain. (Karpathy himself leaves the term undefined beyond "the difference will become clearer over time"; the structural reading here is the wiki author's.)

## Defining Properties of Paradigm 3

[[theo-t3gg|Theo]] (t3.gg), amplifying Karpathy, isolates the properties that make the channel-scoped entity more than a bot.

### Channel as the Context Boundary
See [[context-engineering]] → "Channel as Context Boundary." The channel — not the session, not the global account, not the project — is where context lives. Different channels hold different knowledge, so two teams working with Claude in two channels can have entirely different experiences. This maps naturally to how teams and work are already structured. Theo frames existing tools (Claude Code) as offering only "global or project-specific" scoping — a granularity too coarse for the real mess of people, projects, teams, and tasks.

### Multiplayer
Within a channel there is one Claude that interacts with everyone. Anyone can see what it's working on and pick up the conversation where the last person left off — "much more like interacting collaboratively with a teammate." Theo contrasts this with the de facto multiplayer story for coding agents today: PR review bots (`@bugbot`, `@greptile`, `@codex`, `@claudecode`, `@coderabbit`) on GitHub. His verdict: "If your multiplayer story is GitHub, then you don't have a multiplayer story. You have a bunch of really slow load times and a website that crashes all the time."

### Asynchronous & Self-Scheduling
You can send Claude a task and focus on other work; it can schedule tasks for itself, pursuing a project autonomously over hours or even days. Anthropic reports internally spending much more time delegating to many Claudes in parallel.

### Proactive / Ambient
With ambient behavior enabled, Claude proactively keeps the team updated, flags relevant information from across channels and tools, and follows up on threads or tasks that have gone quiet. This is a real-world instance of [[proactive-service]]: agent-initiated, driven by state change, not by a user query.

## Tensions

> [!note] Departure: Terminal-First Workflow as a Parallel UI Path
> Kun Chen's "terminal-first" workflow is a significant departure from the paradigm-3 direction. His stack — Western, tmux, and Neovim — treats the terminal as the primary management surface for many parallel agents. Paradigm 3 (persistent async org-level entity) lives in Slack/channels; Kun's workflow lives in tmux tabs. The two are not incompatible (a terminal can host many channels), but the *primary interface* is different: Kun's is session/tile-based; paradigm 3's is channel/conversation-based. This suggests the "right" UI may be task-dependent: high-throughput parallel coding may favor the terminal dashboard; persistent team collaboration may favor the channel. The [[lavish]] HTML artifact is a point of convergence: rich output can be rendered in either substrate.

> [!warning] Contradiction: Model Lock-In vs. the Paradigm
> Theo's sharpest critique is that Claude Tag hard-binds paradigm 3 to a single lab. His own equivalent — a "Hermes agent" running in Discord, one Docker isolate per channel/purpose — lets him **switch models freely** (GLM, GPT-5.5, Claude, Fable) and even instruct one model to call another (he has Codex/GPT-5.5 call Claude for API design and UI work, where GPT-5.5 is weak). Claude Tag offers none of that control. Theo frames the choice as a fork: full custom isolation where you build every channel's skills/context yourself and can swap models, versus Claude Tag where most of it works by default but you're locked to Anthropic's models and boundaries. He explicitly wants competitors to clone the pattern so users aren't "reliant on just one lab." The tension — channel-scoped org-level entity as a *paradigm* versus as a *vendor product* — is unresolved.

> [!note] Departure: Adoption Asymmetry
> Theo argues most people won't build what he built (per-channel isolated agents with bespoke configs) and won't even realize they need different configurations per channel. Claude Tag's contribution is making "most of the cool things I did there" accessible without the user thinking about tools, context, and boundaries themselves. Wiki-author synthesis: paradigm 3 may be correct as an architecture while still premature as something individuals can assemble — the value is in the *default* scoping the product provides.

> [!note] Synthesis: Paradigm 3's Marquee Feature Lives on the Unverifiable Side of Karpathy's Own Frontier
> Karpathy's [[the-verifiability-thesis|verifiability thesis]] holds that what's *verifiable* gets automated, and that capability clusters on the verifiable side of the [[jagged-frontier|jagged frontier]]. Yet the differentiating property of paradigm 3 — the [[proactive-service|ambient/proactive]] mode where Claude decides what to flag and which quiet threads to revive — is **LLM-mediated judgment**, not mechanically verifiable behavior (the deterministic-vs-judgment split is flagged on [[proactive-service]]). By Karpathy's own theory, that is precisely where capability should be thinnest and least reliable — so paradigm 3 stakes its claim on the side of the frontier his other work predicts is hardest. This is a wiki-author synthesis, not a claim either source makes.

## Thread

- [[the-agent-workflow]] — Paradigm 3 is a workflow/UX evolution: the agent moves from a session you drive into a persistent teammate embedded in the team's coordination substrate; async and proactive modes reshape the HITL/AFK split.

## Related

- [[claude-tag]] — Anthropic's Slack-based instantiation of paradigm 3
- [[claude-code]] — Paradigm 2 (app): the solo/synchronous coding agent that paradigm 3 extends into multiplayer, async, and proactive
- [[context-engineering]] — Channel as context boundary is the paradigm-3 context-scoping primitive
- [[software-1-2-3]] — Karpathy's parallel three-stage lineage (programming substrate, not UI/UX)
- [[proactive-service]] — Ambient behavior is a real-world instance of agent-initiated alerting
- [[afk-agent]] — Async, self-scheduling tasks over hours/days
- [[harness-engineering]] — The "org-level harness" framing
- [[andrej-karpathy]] — Originator of the three-paradigm framing
- [[theo-t3gg]] — Amplified it with practitioner experience and the model-lock-in critique
- [[the-human-lever]] — Paradigm 3 shifts the human from driving sessions to delegating to a persistent teammate
- [[lavish]] — HTML artifact editor as another example of richer agent output media

## Sources

- `raw/karpathy-claude-tag-third-paradigm.md` — Karpathy's original X post defining the three paradigms and the "org-level harness" defense reply (June 2026).
- `raw/yt-the-next-paradigm-shift-according-to-karpathy.md` — Theo (t3.gg) reacting to Karpathy's post; isolates the defining properties of paradigm 3 (channel as context boundary, multiplayer, async, proactive), provides the model-lock-in critique and the per-channel isolate practitioner experience.
- `raw/yt-l8-principal-s-agentic-engineering-workflow.md` — Kun Chen: Lavish as another example of richer agent output media (HTML artifacts instead of terminal text).
