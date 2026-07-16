---
title: Dex Horthy
created: 2026-04-25
updated: 2026-07-16
sources:
  - raw/yt-no-vibes-allowed-dex-horthy.md
  - raw/yt-chroma-context-engineering-episode-1-dex-horthy-dexhorthy.md
  - raw/yt-context-engineering-with-dex-horthy.md
unaudited_marginal: 0
tags: ["engineer", "agent-engineering", "context-engineering"]
---

# Dex Horthy

> Creator of [[12-factor-agents|12 Factor Agents]] and the person who coined [[context-engineering]] (days before Toby Lütke and Andrej Karpathy popularized it). Founder of [[humanlayer|HumanLayer]]. Advocate for agentic engineering over vibe coding — and the wiki's strongest first-person source on the failure mode of [[dark-factory|lights-off factories]], which he built and shut down. His worldview is traced as a coherent system in [[dex-horthy-agentic-engineering]].

## Overview

Dex Horthy is a software engineer, founder of HumanLayer, and a leading voice in agentic engineering. He authored the widely-adopted "research/plan/implement" workflow for Claude Code, authored the "12 Factor Agents" framework, and independently coined "context engineering" in April 2025 — days before Toby Lütke and Andrej Karpathy popularized the term.

## Philosophy

- **Context Engineering**: The practice of deabstracting every "AI feature" (RAG, memory, agentic history, structured output) back to what it is — *tokens into a model* — and engineering those tokens deliberately. The two budgets: an **information budget** (RAG chunks vs. the whole book) and an **instruction budget** (models follow ~150–250 instructions before attention spreads thin). See [[context-engineering]].
- **Token Smarter, Not Harder**: The [[token-harder-vs-token-smarter|dichotomy]] between maximizing token throughput (the [[dark-factory]]/max-out-the-cloud-sub posture) and seeking *leverage* — the points where an hour of human planning prevents four hours of rework. Dex advocates the latter; his calibration is 2–3× faster at ~99% of hand-written quality.
- **The Smart Zone and Trajectory**: The first ~100k tokens are the [[smart-zone-dumb-zone|Smart Zone]]; beyond it, quality degrades. The context window has four properties to manage — size, information quality, missing information, and [[context-trajectory|trajectory]] (the autoregressive history that conditions the next message; "you're absolutely right" is the tell to reset).
- **Model Intuition**: Advocates for picking one model family and one tool and developing deep intuition over 1-2 months rather than constantly switching between tools.
- **Markdown as Storage**: Pioneer of using markdown with front matter as a flexible, AI-friendly storage layer for CRM, task management, and personal knowledge bases. Agents can evolve their own schema.
- **Agentic Engineering Over Vibe Coding**: Rejects superficial "vibes-based" AI usage in favor of structured workflows with explicit phases.
- **Research/Plan/Implement Workflow**: His [[research-plan-implement|Claude Code workflow]] (research the codebase, plan the approach, implement) was adopted by thousands of engineers. A year on, his mature verdict is that the detailed plans were *anti-leverage* and should be treated as disposable tactical artifacts.
- **Slow Loops Over Dark Factories**: On autonomous loops, his line is "everything except stop reading the code is good advice" — favoring [[slow-loops|incremental, human-reviewed nightly loops]] over lights-off factories.
- **Protect Vocabulary**: Warns, via Martin Fowler, about *semantic diffusion* — useful words ("agents," "software factory") becoming meaningless through overuse. Adopted Fowler's [[harness-engineering|inner/outer harness]] distinction as the best available definition.

## Contributions

### Context Engineering Origins
Dex coined "context engineering" through the [[12-factor-agents|12 Factor Agents]] work in April 2025 (factor three, "own your context window," was the one that "blew up"). Weeks later, Toby Lütke (Shopify) and Andrej Karpathy independently popularized the term. Dex is candid that he learned the practice from interviewing ~100 engineers rather than inventing it — he just put a useful name on a thing builders were already doing.

> [!warning] Attribution correction
> Earlier versions of this page and [[context-engineering]] credited "Jeff Huber (Chroma CEO)" as context engineering's co-creator. **No `raw/` source mentions Jeff Huber.** Dex himself names Toby Lütke and Karpathy as the other figures associated with the term. The "Jeff Huber" attribution has been removed as unsourced.

### 12 Factor Agents
A framework for building robust agent systems, with factors including context engineering, tool selection, and workflow design.

### Claude Code UX Innovation
His work on prompting strategies — the research/plan/implement workflow, structured sub-agent delegation, and the insight that "oral tradition" in prompting could be baked into product opinions — influenced how thousands of engineers use code agents.

### Snapshot-Based Evals
Advocates for snapshot-based evals: run the workflow end-to-end, store the output, diff against previous runs. Like snapshot testing for agents. Skeptical of [[agent-evals|LLM-as-judge]] approaches — "never send an AI to do a linter's job."

> [!note] Role Clarification
> The current sources describe Dex Horthy in the context of HumanLayer (his own company) and his independent engineering practice. Previous wiki entries may have referenced a Sourcegraph affiliation that is not supported by the primary sources in this ingest.

## Related

- [[dex-horthy-agentic-engineering]] — A synthesized thread tracing his worldview as one coherent system
- [[12-factor-agents]] — His framework for reliable production agents
- [[research-plan-implement]] — His signature workflow (and its anti-leverage retrospective)
- [[humanlayer]] — His company; an agent-first IDE built on these principles
- [[dark-factory]] — The cautionary tale he lived: a lights-off factory built July 2025, shut down November 2025
- [[slow-loops]] — His preferred, human-reviewed flavor of loop engineering
- [[token-harder-vs-token-smarter]] — The dichotomy at the center of his posture
- [[context-trajectory]] — His four-property model of the context window
- [[context-engineering]] — The practice he named
- [[instruction-severity-inflation]] — Identified the phenomenon of competing emphatic formatting degrading instruction following
- [[sourcegraph]] — Associated with code intelligence
- [[cody]] — AI coding assistant
- [[vibes-based-engineering]] — The anti-pattern he argues against
- [[verification-loop]] — The structured process he champions
- [[the-agent-workflow]] — His workflows are a central example
- [[agent-quality-engineering]] — His eval philosophy connects here
- [[matt-pocock]] — Peer in AI-native engineering with a complementary focus
- [[lance-martin]] — Fellow context engineering practitioner; Martin catalogued the operational techniques and identified the multi-tier action space architecture
- [[peter-werry]] — Fellow context engineer; Werry's Unblocked productizes context engineering at organizational scale
- [[multi-tier-action-space]] — The fast orchestrator + smart oracle pattern is a specific instantiation of the thin-tool-layer architecture
- [[evolving-context]] — Dex's snapshot-based eval approach and model intuition philosophy provide the measurement framework for evolving context experiments

## Sources

- `raw/yt-no-vibes-allowed-dex-horthy.md` — Talk at the AI Engineer Code Summit on "No Vibes Allowed" engineering.
- `raw/yt-chroma-context-engineering-episode-1-dex-horthy-dexhorthy.md` — Full interview covering context engineering origins, model switching strategy, markdown storage, evals, and agent memory.
- `raw/yt-context-engineering-with-dex-horthy.md` — The Pragmatic Engineer interview: the deabstracting definition of context engineering, the two budgets, Smart/Dumb Zone physics, the RPI retrospective, slow loops, the lights-off factory build-and-shutdown, token-harder/smarter, Martin Fowler's inner/outer harness, and the HumanLayer product reveal.
