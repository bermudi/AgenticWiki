---
title: OpenAI Codex
created: 2026-08-06
updated: 2026-08-06
sources:
  - raw/full-workshop-setting-yourself-up-for-success-jason-liu-openai-codex.md
unaudited_marginal: 0
tags: [project, openai, agent, codex, harness, skills, appshot, memory-vault]
---

# OpenAI Codex

> OpenAI's agentic coding application — a desktop app (with CLI + iOS remote), an in-app browser and artifact renderer, and a harness for **pinned threads**, **thread-to-thread messaging**, **heartbeat automations**, **skills/plugins**, **appshot** (accessibility-tree capture), and **computer use** / Chrome extension — described in 2026 by [[jason-liu|Jason Liu]] as his daily operating system.

## Overview

Codex is OpenAI's answer to [[claude-code|Claude Code]]: not just a CLI but a **desktop app** that you live in. Liu's workshop is the best single practitioner source because he uses it for everything — two-day game prototypes, eval hill-climbing, iMovie editing via computer use, partnerships/education/operations from meeting notes, and the workshop's own slides (served from `localhost` inside Codex's in-app browser).

The public surface Liu describes in mid-2026:

| Surface | What it does |
|---|---|
| **Desktop app** | Thread list/sidebar, pin/rename, permissions, plugins panel, computer-use toggle (including `locked use` for closed-lid operation) |
| **In-app browser** | Treat it as your main browser; Codex can read/control tabs; artifacts (sheets, docs, slides) render there |
| **Chrome extension** | Controls Chrome without screen takeover — Codex opens/closes tabs in the background while you work |
| **Computer use** | OS-level cursor control for any Mac app (Safari, iMovie, Slack, trading software, faxing a medical record after DocuSign) — the first "feel the AGI" moment for many users |
| **CLI** | Used occasionally for speed, but Liu prefers the app because most of his work is an appshot |
| **iOS / remote control** | Scan a QR code in the sidebar, then cue any thread from your phone — including while the laptop is closed and plugged in (with `locked use`) |
| **Plugins & skills** | Two-layer system: a **skill** is a few files + scripts; a **plugin** is a library of skills. The `skill installer` skill lists OpenAI-curated skills; community sources like `skillset.sh` and Vercel's skills tool surface more |

Liu's mental model for working in Codex is three acts — **bring context in → work on it → take actions out** — which maps onto the features below.

## The Operating Model

### Codex as Operating System, Not IDE

The progression Liu sketches:

- **Stage 1:** IC enabled by an IDE (single session).
- **Stage 2:** A team of **pinned threads** where you are the manager.
- **Stage 3:** Manager threads supervising IC threads — each pinned thread can `list_threads`, `rename_threads`, and `send_message_to_thread`. Orchestration beyond that is "where the puck is going to skate."

This is Codex's distinctive wedge versus CLI-only agents: the sidebar is the coordination layer. Sub-agents are shapeless background entities; **pinned threads are visible, named, and message-addressable**, so new work streams announce themselves.

### The Personal Monorepo Vault

Liu keeps a single pinned project — his **personal monorepo** — and lets Codex touch the rest of the filesystem:

```markdown
# In AGENTS.md
don't save any of the code in the monorepo. Save it in /dev.
```

The template is at **`jxml/personal-monorepo-template`** on GitHub (directory tree + skills + vault). It follows the now-familiar [[context-files]] pattern, but with a CRMs twist:

- `projects/<workstream>/` — one directory per workstream (voice launch video, agents SDK, open-source grant program, etc.), each with its own README, `AGENTS.md`, and frontmatter links to every relevant Slack channel. The agent sees the links and reads those channels without being told.
- `people/` — every person who has DM'd him, with email/Slack handles and multi-address metadata and what they're working on.
- `daily summaries`, `notes`, `agent summaries`, `to-do list` — the to-do is maintained by a heartbeat that verifies via a sub-agent that no one has already done the task.

The vault is a **git repo** — Liu periodically runs `git diff` to see what the model updated (notes, loop closures, new people). That `git diff` is his review surface, echoing the [[dreaming]] and [[context-shards]] maintenance patterns: memory as something you garden, not something you append to blindly.

The onboarding stance: don't expect good results on day one. For the first 2–3 months you are onboarding an employee — give lots of context, let it fail, then tell it "remember this for next time; update the skill / the AGENTS.md." Over time you tag fewer plugins because the accumulated memory already knows where to look.

## Core Features

### Compaction That Actually Holds

> Old advice (pre-2026): "After ~20 messages, start a new thread. Every feature needs its own session."

Liu argues this is no longer true *for Codex*. His evidence: threads five weeks old with ~400 sub-agents that "generally just know what they need to do." **Pin the thread, rename it to the project ID**, let it delegate to sub-agents and create new threads, and let it write to the memory vault. He cannot prove it with a timing metric and is "pretty happy" without fine-grained numbers; the underlying mechanism may be in Codex's memory system, not just window summarization.

For the wiki this is **theory pressure** on the prevailing context-rot guidance ([[the-agent-workflow#Managing Context|context rot]], [[smart-zone-dumb-zone]], [[context-engineering]]): not all harnesses degrade at the same rate, and Codex's deployment may have solved long-horizon coherence for its own client before the open literature has characterized how.

### Appshot — Accessibility-Tree Capture

See [[appshot]] for the full definition. In brief:

- A **screenshot** requires OCR plus multiple tool hops: read the thread → `list Slack channels` → realize there's a guy named Charlie → `list persons` → finally `send message`.
- An **appshot** ships image + full accessibility tree, so Codex already knows `channel = U12725`, `Charlie = U425`, every form field name, etc., and can reply in **one function call**.

Liu's heuristic: "Everything I do is an appshot." Watching a video → "summarize this" appshot; form on screen → "fill out this form" (Codex picks Chrome extension vs computer use based on which app the form is in); DocuSign → find a faxing service and fax medical records.

### Voice / Dictation

A foot pedal with two buttons (transcribe + enter). He approaches his desk with hands behind his back and says: "fix this, make this change, also message this guy on Slack." The model receives a messy 15-minute voice memo that would be rude to send a coworker, and does the untangling: read 35 meeting messages, find the one with Charlie about the agents SDK, draft the tracker. The speed claim is ~3× faster than typing, but the real leverage is **thoughtfulness-per-minute**: you spend the saved time being more thoughtful with humans, not monitoring Slack.

### Plugins, Skills, and the Team Hero Pattern

- **Installation:** sidebar → Plugins → search (Slack, Gmail/Teams, Notion, Linear, Obsidian). The skill-installer skill lists OpenAI-curated skills (GitHub, Playwright best practices, etc.); `skillset.sh` is the community index.
- **Self-improving skills:** Include the line "every time you run this skill, you're allowed to edit yourself — if you learn something new, edit the skill file." Skills then compound over weeks.
- **Team plugins as leverage:** The biggest impact is not for yourself but for your team. One `finalize the codex app` skill triggers before every PR review and catches style-guide violations for the whole company; a `review my code like Charlie` skill replays a year's worth of Charlie's PR comments. If you are rewarded by how often teammates use a plugin you built, you become the team's hero rather than just a token-maxer. This is the [[agent-skills#Skills at Team Scale|plugin-hero]] pattern.
- **Creator skills:** The `plugin creator` and `skills creator` skills interview you ("tell me what you do repeatedly") or watch you do it once ("document everything and make a skill from what you learned").

### Heartbeats, Goals, and Monitors

See [[pinned-threads]] for the integrated pattern. The primitives:

- **Heartbeat / thread automation** — scheduling a message *back into the same thread* (`keep an eye on this every 30 minutes` / `keep an eye on this until <time>`). Early automations made a new thread each time (morning brief); same-thread heartbeats became the design as compaction improved. Controls: per-thread frequency, weekday vs weekend vs afternoon schedules, stopping criteria ("if no updates, reply with one word: no updates"), and sleep ("it's 9 p.m., haven't seen Jason in two hours — sleep five hours"). Liu's heuristic: edit the heartbeat text file directly — the heartbeat *is* a file.
- **`/loop`** — the "keep an eye on this PR" skill (rebase, fix CI, respond to feedback, keep mergeable) with the magic phrase `keep an eye on`.
- **`/goal`** — runs until a verifier says done (`migrate Python backend to Rust, ensure all unit tests pass` — which Liu used to rewrite the rich terminal library in Rust and to port `uv` to TypeScript at 100% coverage). **Ultra-goal** (`goal.md` + `plan.md` + optional `state.md`/work log in the monorepo) lets you widen scope mid-run as the model learns.
- **Chief-of-staff thread:** pinned, wakes daily at 8 a.m., checks all connectors, produces a formatted update with links and Slack deep-links, drafts replies, optionally opens a Chrome tab per email needing a reply so the human can review drafts between meetings.
- **Monitor → subthread spawning:** one long-lived monitor watches Twitter/Slack/connectors for new issues, creates one pinned thread per issue for triage (post in the right Slack channel, DM the owner, tweet via computer use that it was escalated, then check hourly until the owner responds), and links recurrences back to the existing downstream thread ("third time this issue has been live — should we do something?").

### Artifacts and Annotation

Excel/Word/PDF/slides render in the in-app browser. The **annotation tool** (select a slide region → "fix the whitespace / split this into two slides" → Enter) is Liu's slide-writing loop: dictate a blog post out loud, generate material, annotate what you don't like, keep moving while Codex cleans. Wednesday-night "what's shipping this week" decks (auto-generated then posted to Slack) and Google Sheets project trackers (updated by loops) are the recurring-cadence version.

### Remote Control and Determinism

`locked use` (Settings → Computer Use → `locked use`) keeps computer-use commands triggerable from the phone while the laptop is closed and plugged in. With remote control, the phone can cue any thread, including remote threads. Liu flags the safety corollary: if a connector fails (Slack MCP can't upload a file; Gmail connector can't email), the model may be **determined** to fall back to computer use ("open Chrome and hit send") — the wish-willow problem. The mitigations he relies on are `AGENTS.md` guardrails + `auto review` + org-level admin caps (no MCP email to non-OpenAI addresses, no external Slack messages).

## Usage Advice Liu Gives

- Download Codex now, enable computer use + Chrome extension, try the `jxml/personal-monorepo-template` monorepo. Then: **try appshot, try computer use, try the weird stuff.**
- Don't be an X-high maximalist — low/medium thinking is plenty for most non-generation work and saves the context/limits budget.
- Get shameless about dictation; send the AI the messy version.
- Invest in personal memory and in plugins for your team — that's where leverage compounds.
- Develop taste by consuming more: try every app's onboarding, learn the vocabulary for slop, so you can complain precisely.

## Thread

- [[the-agent-workflow]] — Codex's pinned threads + heartbeats + monitor-subthread pattern are the 2026 productized instantiation of the workflow's HITL/AFK cycle
- [[the-slop-problem]] — Codex's multi-verifier loop pattern (verification gate before PR) sits in the anti-slop section
- [[tool-design-for-agents]] — Codex is the second independent convergence (with Claude Code / Manis / AMP / Deep Agents) on the thin-tool-layer + computer architecture, extended with the accessibility-tree primitive

## Related

- [[jason-liu]] — the workshop speaker and practitioner source
- [[appshot]] — the accessibility-tree capture primitive
- [[pinned-threads]] — pin / rename / delegate / automate / message the full pattern
- [[agent-skills]] — skills (= files + scripts) vs plugins (= library of skills) and self-improving skills
- [[agent-memory-systems]] — the personal monorepo vault as a product-level memory instance
- [[agent-loop]] — Codex's loop primitives (loop, goal, ultra-goal, heartbeat)
- [[orchestration-loop]] — monitor → subthread spawning as orchestration
- [[context-engineering]] — compaction claim and its tension with context-rot guidance
- [[agentic-engineering]] — Codex as the harness for Jason's prototyping/eval/operations work
- [[claude-code]] — the canonical CLI-only comparison point

## Sources

- `raw/full-workshop-setting-yourself-up-for-success-jason-liu-openai-codex.md` — Liu (AI Engineer, 2026). Primary source for the entire page: operating-system framing, personal monorepo template and /dev offloading, compaction claim, appshot mechanics, plugins/skills distinction, heartbeat/goal/monitor loops, artifacts + annotation, computer use / Chrome extension / remote control, model-choice and permissions advice.
