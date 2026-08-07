---
title: Jason Liu
created: 2026-08-06
updated: 2026-08-07
sources:
  - raw/full-workshop-setting-yourself-up-for-success-jason-liu-openai-codex.md
unaudited_marginal: 0
tags: [author, openai, openai-codex, agent-skills, appshot, pinned-threads]
---

# Jason Liu

> Works at OpenAI on the Codex app and its prototyping, eval, and partnerships surfaces. In his 2026 "Setting Yourself Up for Success" workshop he argues that **compaction actually works** — which unlocks long-lived pinned threads, thread-to-thread messaging, and a memory-vault + loops operating model — and that the fastest setup is voice + appshot + skills/plugins + automations.

## Overview

Jason Liu is on the OpenAI Codex team (he jokes he "doesn't really know what his job is anymore"). His work spans rapid prototyping (two-day game/web-app goals), hill-climbing evals, computer-use editing, partnerships/education/operations via meeting-note → document transforms, and — most relevant for the wiki — the **Codex app** as his daily operating system. His slides for the workshop were themselves served from `localhost` inside the Codex in-app browser and annotated live.

His workshop is a practical "how I actually work" talk, not a model-release talk. The through-line: most knowledge work is now tracking ~200 things instead of 10, and Codex threads + memory + automations are how he keeps the map in his head from collapsing.

## Key Contributions — The Codex Operating Model

Liu frames the model in three acts — **bring context in → work on it → take actions out** — and gives a concrete setup for each:

### 1. Context In: voice, connectors, appshot, skills

- **Voice first.** He uses a foot pedal (transcribe + enter) and talks with hands behind his back: "fix this, make this change, message this guy on Slack." The rationale is simple: you speak about three times faster than you type, and a messy 15-minute voice memo is cheap for the model to untangle (it will read 35 meeting notes to find the right one) but expensive to impose on a coworker. In his words: don't send a coworker a 15-minute voice memo — send it to the AI.
- **Plugins/connectors.** Installed from the Codex sidebar (Slack, Gmail/Teams, Notion, Linear, Obsidian, etc.). Day one you tag every plugin; over time, as pinned threads and memories accumulate, you can just ask "what has changed about the launch" without tagging. He also distinguishes **Chrome extension** (controls Chrome without screen takeover — three tabs open and close while you work) from **computer use** (controls any Mac app behind the scenes — first "feel the AGI" moment for him, watching the cursor place sound effects in iMovie).
- **Appshot.** His favorite feature. An appshot captures not just the image but the entire **accessibility tree**: channel IDs, user IDs, form fields. A screenshot of a Slack thread requires OCR + `list Slack channels` + `list persons` hops; an appshot knows `channel = U12725` and `Charlie = U425` and can reply in one function call. He hasn't filled out a form in two weeks — "just tell Codex to fill out this form; it figures out Chrome vs Safari and uses the right tool."
- **Skills vs plugins.** A **skill** is a few files + scripts; a **plugin** is a library of skills. Install via `skill installer` (curated OpenAI skills) and community sources like `skillset.sh`. His highest-leverage internal skills: `finalize the codex app` (triggered before every PR review, used by most of OpenAI), `review my code like Charlie` / `like Dominic` (built from the past year of Charlie's PR feedback), and a DX triage skill that knows every Slack channel to watch and which engineer owns what.

### 2. Work On It: compaction, pinned threads as teammates

Liu's headline claim — and the reason the talk exists — is that **compaction now works**. The old rule ("after ~20 messages start a new thread; every feature needs its own session") is, in his experience, no longer true:

> "I have threads now that are like five weeks old that have 400 sub-agents in them and they generally just know what they need to do."

The practical pattern:

- **Pin the thread, rename it to the project ID.** That thread becomes the project owner — it delegates to sub-agents, creates new threads, and writes to the **memory vault** (see below). You keep only one project pinned in the sidebar (the personal monorepo) and let the Codex agent write code outside it, in `/dev`, controlled by one line in `AGENTS.md`: "don't save any of the code in the monorepo; save it in /dev." Review happens on GitHub.
- **Threads talking to threads.** Every thread can `list other pin threads`, `rename threads`, and `send messages to each other`. Liu sketches the progression: IC enabled by an IDE → a team of pinned threads where you are the manager → manager threads supervising IC threads, with orchestration beyond that as models improve.
- **Personal monorepo template.** He publishes it at `jxml/personal-monorepo-template` on GitHub (directory tree + skills + vault). His own vault has `projects/<workstream>/`, `people/` (every person who DM'd him, with email/Slack/work addresses and relevant Slack channels in frontmatter), plus loose notes, daily summaries, and a to-do list that a heartbeat thread maintains. The vault is a **git repo**: he runs `git diff` after a few days to see what the model changed and review it.

### 3. Take Action Out: automations, goals, and the monitor pattern

Once the first two layers are in place, Liu extends them with **wake-ups**:

- **Heartbeats / thread automations.** "Keep an eye on this every 30 minutes" schedules a message back *into the same thread*, not a new thread. The morning version gave way to same-thread heartbeats as compaction improved. Examples:
  - `loop`: "keep an eye on this PR — anytime there's feedback fix it, keep it mergeable, rebased on master, CI passing. Thursday afternoon all the feedback has been integrated and CI is green."
  - `support triage`: appshot → DX triage skill figures out the owner (James, `browser-feedback` channel), posts in the channel, DMs James, opens Twitter via computer use to tell the reporter it has been escalated, then checks every hour until James responds and loops the reporter.
  - `chief of staff`: pinned daily at 8 a.m., checks all connectors, drafts summaries with links/email/Slack deep-links, and can open a browser tab for every email needing a reply.
  - `flight check-in`: a Spark agent watches for check-in emails, checks in, downloads the boarding pass, and sends it via iMessage.
- **Goals.** `/goal` runs until a verifier says done; **ultra-goal** (`goal.md` + `plan.md` + optional `state.md`/work log file) lets you edit scope while the loop runs — crucial for projects where the plan changes as the model learns.
- **Monitor threads spawning subthreads.** The newest pattern: one long-lived **monitor thread** watches all signals (Twitter, Slack, connectors). When it spots an issue it creates a dedicated thread per issue; that thread does triage, waits on humans/PRs, and posts back. If the same issue recurs, the monitor sends a message to the existing downstream thread so it knows the issue is recurring, and surfaces to the main thread ("third day this issue has been live — should we do something?"). Unlike shapeless sub-agents, these threads are **pinned in the sidebar**, so new work is visible.
- **Artifacts.** Codex's artifacts (in-app browser renderer) handle Excel, Word, PDF, slides. The annotation tool + `/comment` loop lets him fix slides hands-free. Scheduled artifacts include Wednesday-night "what's shipping this week" decks posted to Slack.

### 4. Self-Improvement and Taste

- **Three kinds of self-improvement:**
  - `write-like-me`: "read all emails/Slack messages I wrote in the past 6 months and write a style guide for how to message just like me" — then every draft email/Slack picks the right tone (stern for customer support, breezy internally).
  - `simple HTML artifact`: a preference for white backgrounds and specific style guides.
  - Self-editing skills: each skill includes "every time you run, if you learned something new, edit yourself." After two months of use he feels safe sharing it with the team (see [[agent-skills#Skills at Team Scale]] for the plugin-hero pattern: being rewarded by how often teammates use a plugin you built).
- **Taste development.** His answer to "how do you get good taste in an AI-everything world?" is to **consume more** — try every app, learn what good onboarding feels like, build a vocabulary for complaining about slop (parallel to learning to taste salt vs acid in cooking). The skill `simple HTML artifact` and the taste for artifacts are downstream of that consumption.

### 5. Risk, Permissions, and Model Choice

- **Permissions:** Liu is unusually permissive (`auto review` rather than "ask me for every permission" or full YOLO). He finds the `gpt-5` family already reluctant to take destructive actions; `AGENTS.md` rules and the `auto review` gate are enough in practice. At OpenAI, admin settings add org-level sandboxing (no MCP email to non-OpenAI addresses, no external Slack messages).
- **Model choice:** He is *not* an "X-high maximalist." Low/medium thinking on `gpt-5` is still far better than prior models and avoids burning limits; his chief of staff runs on medium. X-high only earns its keep on from-scratch generation (e.g., "make me a video game").
- **Determinism risk with computer use.** Because the model can fall back from a blocked connector to **computer use** (can't upload via Slack MCP → open file upload dialog and click), it can be more determined than intended. He treats `AGENTS.md` guardrails and `auto review` as the mitigation, and flags that orgs need explicit computer-level sandbox edges.

## Related

- [[openai-codex]] — the project this talk is the primary practitioner source for
- [[agent-skills]] — his skills-vs-plugins distinction, self-improving skills, and team plugin pattern
- [[appshot]] — his favorite feature, detailed here as the source definition
- [[pinned-threads]] — his pin-rename-delegate and monitor-subthread patterns
- [[agent-memory-systems]] — his personal monorepo vault as a product-level instance of persistent memory
- [[agent-loop]] — heartbeat/goal/ultra-goal as the Codex instantiation of the loop lineage
- [[orchestration-loop]] — monitor → subthread spawning as an orchestration loop
- [[dreaming]] — his vault maintenance via `git diff` and periodic automations echoes the dreaming maintenance mode
- [[the-agent-workflow]] — his workshop is an end-to-end workflow instantiation (voice → skills → pinned threads → heartbeat)

## Sources

- `raw/full-workshop-setting-yourself-up-for-success-jason-liu-openai-codex.md` — Full 70-minute workshop (AI Engineer, 2026; 3958 lines, timestamped transcript). Solo workshop by Jason Liu; audience Q&A passages included but primary speaker is Liu. Source for compaction claim (five weeks / 400 sub-agents), appshot/accessibility-tree mechanics, foot-pedal dictation, monorepo template (jxml/personal-monorepo-template), heartbeat phrasing ("keep an eye on this"), monitor-subthread pattern, and taste/consumption advice.
