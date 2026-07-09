---
title: Andrej Karpathy
created: 2026-05-09
updated: 2026-07-09
unaudited_marginal: 0
sources:
  - "raw/yt-andrej-karpathy-from-vibe-coding-to-agentic-engineering.md"
  - raw/karpathy-llm-knowledge-bases.md
  - raw/karpathy-farzapedia-explicit-memory.md
  - raw/karpathy-html-output.md
  - raw/karpathy-claude-tag-third-paradigm.md
tags: [author, ai-researcher, educator]
---

# Andrej Karpathy

> AI researcher and educator who co-founded OpenAI, led Autopilot at Tesla, and coined the terms "vibe coding" and "agentic engineering." Known for making complex technical shifts feel accessible and inevitable.

## Background

Karpathy was on the founding team at OpenAI, led Autopilot at Tesla, and has a rare gift for making complex technical shifts feel both accessible and inevitable. He also has a habit of naming the shifts — coining terms like "vibe coding" and "agentic engineering" that the industry adopts.

## Key Ideas

### Software 1.0 → 2.0 → 3.0

Karpathy articulates a three-stage paradigm shift in how we program computers:

- **Software 1.0**: Writing explicit code — loops, conditionals, functions
- **Software 2.0**: Programming by creating datasets and training neural networks — arranging data, objectives, and architectures
- **Software 3.0**: Prompting as programming — the context window is your lever over the LLM as interpreter

He argues the transition isn't just "programming getting faster" — it's new categories of information processing becoming automatable. LLM knowledge bases are his favorite example: a category of software that literally couldn't exist before.

### Three Paradigms of LLM UI/UX

A second three-stage Karpathy lineage — this one about *where the model lives in the human's workflow*, not the programming substrate. Reacting to Anthropic's [[claude-tag|Claude Tag]] launch (June 2026), he posted that LLM interaction has gone through three paradigms: (1) the LLM as a **website** you visit, (2) the LLM as an **app** you download, (3) the LLM as a **self-contained, persistent, asynchronous entity** with org-wide tools and context working alongside teams of humans. When the post drew mockery, he defended it: this isn't a Slack bot, it's an **"org-level harness."** See [[llm-ui-paradigms]] for the full framing and [[theo-t3gg|Theo]]'s practitioner amplification (channel as context boundary, multiplayer, async, proactive).

### Vibe Coding → Agentic Engineering

Karpathy coined "vibe coding" in December 2024 after noticing a stark transition where LLM outputs stopped needing correction. He describes the progression as: "I just started to notice that with the latest models the chunks just came out fine and then I kept asking for more and it just came out fine and then I can't remember the last time I corrected it."

His own framing distinguishes the two:

- **Vibe coding**: Raising the floor for everyone in terms of what they can do in software. Amazing, incredible — but not sufficient for professional software.
- **Agentic engineering**: Preserving the quality bar of what existed before in professional software. "You're not allowed to introduce vulnerabilities due to vibe coding. You're still responsible for your software just as before, but can you go faster?"

He observes that "people who are very good at this peak a lot more than 10x."

### Verifiability

Karpathy argues that the current paradigm of LLM training — giant reinforcement learning environments with verification rewards — means that what's *verifiable* gets automated. But capability also depends on what the labs put in the data distribution. The chess improvement from GPT-3.5 to GPT-4 was not general progression — it was chess data being added to pre-training.

### Animals vs Ghosts

Karpathy frames LLMs as "ghosts" rather than "animals" — statistical simulation circuits shaped by pre-training statistics with RL bolted on top, not entities with intrinsic motivation, curiosity, or empowerment. This framing is meant to help build a better mental model of what they are and how to use them.

### LLM Knowledge Bases

Karpathy uses LLMs to build personal knowledge bases — `raw/` sources compiled into a markdown wiki, with Q&A against it, linting, and incremental enhancement. He describes this as a software 3.0 exemplar: something that couldn't exist before because there was no code that could compile a knowledge base from raw documents.

The original tweet (April 2026) lays out the full operational recipe: he uses the Obsidian Web Clipper extension to ingest web articles (and a hotkey to download related images locally), Obsidian as the IDE "frontend" for viewing raw data, the compiled wiki, and derived visualizations, and Marp for rendering slide shows. He runs LLM "health checks" (linting) to find inconsistent data, impute missing data, and surface interesting connections for new article candidates. He also vibecoded a small search engine over the wiki, used both directly (web UI) and as a CLI tool handed off to the LLM for larger queries. His TLDR: collect raw data, compile into a markdown wiki, operate on it via CLIs, view it in Obsidian — and never write or edit the wiki manually.

In a follow-up tweet (April 2026), Karpathy endorsed Farza's "Farzapedia" — a personal Wikipedia built from 2,500 diary entries and messages — as a concrete example of the pattern. He highlighted four properties that make this approach superior to implicit personalization: **explicit** (navigable, inspectable artifact), **yours** (local, provider-independent), **file over app** (universal formats, interoperable), and **BYOAI** (bring your own AI — swap models freely, or finetune an open model on your wiki).

### Audio In, Vision Out

Karpathy argues for a fundamental I/O asymmetry in human-AI interaction: audio is the preferred input (ambient, natural), but vision is the preferred output — ~⅓ of the brain is a massively parallel processor dedicated to vision. He proposes a progression ladder of output fidelity: raw text → markdown → HTML → interactive neural videos. He also flags that input remains unsolved — humans need to point, gesture, and reference things on screen, not just speak or type.

### "Outsource Thinking, Not Understanding"

A tweet Karpathy keeps returning to: "You can outsource your thinking but you can't outsource your understanding." Information still has to make it into the human brain — the human remains the bottleneck for knowing what to build, why it's worth doing, and how to direct agents.

## Thread

- [[the-verifiability-thesis]] — Karpathy's unified theory of why the AI development landscape has its current shape
- [[the-human-lever]] — Karpathy's framing of taste, judgment, and understanding as the enduring human role
- [[the-slop-problem]] — Vibe coding raises the floor but introduces the slop problem; agentic engineering is the proposed solution
- [[the-agent-workflow]] — Agentic engineering operationalized as a disciplined workflow
- [[tool-design-for-agents]] — Karpathy's audio-in/vision-out thesis frames output format as a tool design decision

## Related

- [[vibe-coding]] — The neutral concept Karpathy coined
- [[agentic-engineering]] — The discipline he contrasts it with
- [[vibes-based-engineering]] — The anti-pattern that emerged from vibe coding taken without discipline
- [[verifiability]] — His economic theory of what gets automated
- [[jagged-frontier]] — His "car wash" example is a canonical illustration of jaggedness
- [[software-1-2-3]] — The paradigm progression he articulated
- [[llm-ui-paradigms]] — A second Karpathy three-stage lineage: where the model lives in the workflow (website → app → persistent org-level entity)
- [[claude-tag]] — The Anthropic product whose launch prompted the third-paradigm post
- [[html-as-agent-output]] — His output fidelity progression ladder (text → md → HTML → neural video)
- [[open-knowledge-format]] — Google Cloud's OKF spec formalizes Karpathy's LLM-wiki pattern into a portable, interoperable format; cites him by name in the announcement
- LLM knowledge bases — His recipe for personal knowledge management via LLMs (concept page TBD)

## Sources

- `raw/yt-andrej-karpathy-from-vibe-coding-to-agentic-engineering.md` — Sequoia Capital interview covering the full arc from vibe coding to agentic engineering, software 1.0/2.0/3.0, verifiability, animals vs ghosts, LLM knowledge bases, and what remains worth learning.
- `raw/karpathy-llm-knowledge-bases.md` — Original tweet describing the raw/ → compile → Q&A → lint workflow; Obsidian frontend, Marp slides, CLI search engine, and manual-free wiki maintenance.
- `raw/karpathy-farzapedia-explicit-memory.md` — Follow-up tweet endorsing Farza's personal Wikipedia as a concrete example; explicit memory, file over app, BYOAI philosophy.
- `raw/karpathy-html-output.md` — Tweet thread on audio-in/vision-out asymmetry, output fidelity progression, and HTML as an emerging default output format for LLMs.
- `raw/karpathy-claude-tag-third-paradigm.md` — Karpathy's X post (June 2026) framing Claude Tag as the third major redesign of LLM UI/UX (website → app → persistent async org-level entity) and the "org-level harness" defense reply.
