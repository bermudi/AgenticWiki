---
title: 12 Factor Agents
created: 2026-07-16
updated: 2026-07-16
sources:
  - raw/yt-context-engineering-with-dex-horthy.md
  - raw/yt-chroma-context-engineering-episode-1-dex-horthy-dexhorthy.md
unaudited_marginal: 0
tags: [concept, agent-framework, agentic-engineering, context-engineering, harness-engineering]
---

# 12 Factor Agents

> [[dex-horthy|Dex Horthy]]'s framework for building reliable production agents — a set of principles distilled from interviewing ~100 AI engineers about what actually works. Published April 2025 as a GitHub manifesto; it was factor three ("own your context window") that "blew up" and seeded [[context-engineering]]. The factors are unified by a single instinct: deabstract the agent stack down to tokens-in/tokens-out and *own* every layer rather than delegating to an off-the-shelf framework.

## Origin

Dex built the framework after talking to engineers shipping six-figure enterprise AI contracts. The pattern: they had all tried LangChain/CrewAI-style agent frameworks for a month or two, then thrown them out and written raw API calls by hand, building things that looked more like pipelines and workflows than "tools-in-a-loop" agents. 12 Factor Agents named what those practitioners were independently converging on.

The framework was posted to HackerNews (front page for two days), then Dex gave the talk at the AI Engineer summit (June 2025). A few weeks later Toby Lütke (Shopify) and Andrej Karpathy independently popularized "context engineering" — the term factor three pointed at.

## The Factors

The host of [`raw/yt-context-engineering-with-dex-horthy.md`](../raw/yt-context-engineering-with-dex-horthy.md) reads the factors aloud at 18:10. The transcript is auto-captioned, so exact wording is approximate; the grouping below is the wiki's, not Dex's.

**Ownership (own the stack, don't rent it)**
- Own your prompts
- Own your context window *(factor 3 — the one that became [[context-engineering]])*
- Own your control flow

**Tools & structured output (everything is tokens)**
- Natural language is the computer / natural language for tool calls
- Tools are just structured outputs
- Contact humans with tool calls

**State (deterministic backbone)**
- Unify execution state and business state
- Launch / pause / resume with simple APIs
- Make your agent a stateless reducer

**Context discipline**
- Compact errors into the context window

**Decomposition**
- Small, focused agents

**Integration**
- Trigger from anywhere
- Meet users where they are

> [!note] Correction: reducer → transducer
> Dex notes the "stateless reducer" factor was corrected after publishing: it is technically a **transducer**, because there are multiple steps in the workflow, not a single reduce. The distinction matters to the state-modeling purist; operationally the principle stands — model the agent as a stateless function of (state, event) → new state, so execution can be paused, resumed, and replayed.

## Why the Factors Matter

The unifying claim: an agent is not a magical autonomous thing — it is a loop in which you put tokens and get tokens out, and your job is to *own* enough of that loop to control the quality of the output. Renting the whole loop from a framework gets you to an 80% demo; owning it is how you cross from 80% to 95–99%.

Concretely:
- **"Own your context window"** is the [[context-engineering]] thesis — the only way to impact output quality is to care deliberately about inputs.
- **"Tools are just structured outputs"** and **"contact humans with tool calls"** flatten the ontology: calling a tool, asking a human for approval, and producing JSON are all the same operation (constrained generation), which is why [[dex-horthy|Dex]]'s company [[humanlayer|HumanLayer]] began by productizing human-approval-as-a-tool.
- **"Make your agent a stateless reducer/transducer"** is what makes launch/pause/resume and [[fresh-context-subagents|fresh-context subagents]] mechanically possible — and what the wiki's own ingest pipeline relies on (editing and verification in separate sessions).

## Thread

- [[dex-horthy-agentic-engineering]] — 12 Factor Agents is the framework from which Dex's whole worldview branches; factor 3 became context engineering
- [[the-agent-workflow]] — The factors are the design constraints the workflow must satisfy
- [[harness-engineering]] — "Own your control flow" and the inner/outer harness distinction are harness engineering at the framework level

## Related

- [[context-engineering]] — Factor 3, elaborated
- [[dex-horthy]] — Author of the framework
- [[humanlayer]] — The company building tooling around the factors (human-as-tool, stateful orchestration)
- [[smart-zone-dumb-zone]] — "Own your context window" operationalized as staying in the Smart Zone
- [[agent-loop]] — The loop the factors govern
- [[multi-tier-action-space]] — "Tools are just structured outputs" + thin tool layer is the action-space architecture
- [[fresh-context-subagents]] — "Stateless reducer" enables fresh-context execution
- [[vibv]] — Dex credits Vib for the tokens-in/tokens-out intuition underlying the factors

## Sources

- `raw/yt-context-engineering-with-dex-horthy.md` — Origin story (interviewing ~100 engineers, the framework→HackerNews→AI Engineer talk arc), the factors read aloud (18:10), the reducer→transducer correction, factor 3 seeding context engineering, Toby Lütke/Karpathy popularizing the term.
- `raw/yt-chroma-context-engineering-episode-1-dex-horthy-dexhorthy.md` — Earlier discussion of the factors and context engineering as the factor that resonated.
