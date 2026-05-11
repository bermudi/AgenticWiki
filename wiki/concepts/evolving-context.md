---
title: Evolving Context
created: 2026-05-02
updated: 2026-05-10
sources:
  - raw/yt-chroma-context-engineering-episode-3-lance-martin-langchain.md
  - raw/yt-what-ai-agent-skills-are-and-how-they-work.md
tags: [concept, context-engineering, agents, memory, continual-learning]
unaudited_marginal: 0
---

# Evolving Context

> Continual learning in token space — the practice of agents progressively refining their own context (prompts, skills, memories, preferences) based on experience, without retraining model weights. An emerging frontier that is currently "super hacky" but represents one of the most important unsolved problems in agent engineering.

## What It Is

Evolving context is the idea that an agent's external context — its system prompt, skills, memories, and preferences — should improve over time based on what the agent encounters and does. This is distinct from updating model weights (traditional continual learning). Instead, the learning lives in natural language files on disk, human-readable and human-editable.

The driver: without evolving context, agents are brittle across tasks and sessions. Every session starts from scratch. Preferences learned in one session don't carry to the next. Standard operating procedures discovered during one task aren't available for similar tasks later.

## Three Categories

[[lance-martin|Lance Martin]] identifies three emerging threads:

### 1. Task-specific prompt evolution
Agents reflect over their own trajectories (what they did, what worked, what didn't), then propose improvements to the prompt for that specific task. A paper Lance references as "Jeepa" from Omar (DSPy) formalizes this: agents generate trajectories, those trajectories are scored against evaluation criteria, and the system iteratively refines task prompts. Key insight: prompts are population-based — multiple variants compete, and the best survive.

### 2. Memory and preference learning
Agents accumulate memories and preferences across sessions — things like coding style conventions, PR review preferences, and other durable patterns. Martin's **Claude Diary** is a crude but functional example: after each session, a plugin summarizes key decisions and preferences into a diary entry file. A reflection loop periodically reads all diary entries and proposes updates to CLAUDE.md (the agent's system prompt). The human can review and edit the proposed updates — a key advantage of token-space learning over weight-space.

### 3. Skill learning
When an agent discovers a reusable standard operating procedure — a sequence of steps that solves a recurring problem — it should capture that as a skill file. This is the practical mechanism for agents to accumulate [[procedural-knowledge|procedural knowledge]]. The **Let paper** describes this: reflect over agent trajectories, identify patterns that look like SOPs, save them as skills to the file system. The skill is then available for future tasks via progressive disclosure.

## The Classifier Heuristic

The host (Dex Horthy) articulates a useful rule of thumb for predicting which context management tasks will be absorbed into models vs. remain external (Martin agrees and elaborates):

| Can you build a classifier? | → | Absorbed into model (RLM) |
|---|---|---|
| Verifiable, cross-domain task | | Sub-agent delegation, offloading rules, caching decisions |
| User-specific, nuanced, subjective | | Which memories to keep, which preferences are durable, when to retrieve what |

The intuition: if the task can be framed as "given X, should I do Y?" with a ground-truth answer, it's an RL-able classification problem. Model labs will RL it, and it'll show up in the next generation. If the answer depends on personal taste, context, and time-varying preferences, it stays external — though the *mechanics* of storage and retrieval can still be model-learned. Martin extends this by noting that sub-agent delegation, offloading rules, and caching decisions fall into the learnable bucket, while which memories to keep and which preferences are durable fall into the personal/contextual bucket.

## RLM: Recursive Language Models

Currently, all context management is hand-tuned: "offload tool results after N turns," "spawn sub-agents for these types of tasks," "save this to memory if it matches these criteria." These are heuristics prompted by the agent designer.

**RLM** (from Omar, Alex, and others now at MIT; also Prime Intellect with Will Brown) proposes training models to manage their own context. The model learns:
- When to offload context
- When to spawn a sub-agent
- How to manage memory — what to save, when to retrieve

The advantage: learned context management replaces brittle, hand-tuned heuristics with adaptive behavior trained on outcomes. The model can optimize for cache hit rate, task success, or cost — whatever the training objective encodes.

> [!warning] Open Question
> RLM can learn *mechanics* (how to save, how to retrieve) but may still need user-supplied *preferences* for what matters. Memory management especially — the classifier heuristic suggests some decisions are inherently personal and won't be fully absorbed into model weights.

## Why Token Space?

Martin argues token-space learning has several advantages over weight-space (LoRA, fine-tuning):

1. **Human legibility**: You can read the evolved prompt, skill, or memory. You can edit it if the agent got it wrong.
2. **Hackability**: Anyone can write a reflection loop with custom prompts. No GPU cluster required.
3. **Editability**: If an automated reflection loop saves a bad rule, the human can just delete it. Weight updates are opaque and hard to surgically correct.
4. **Fast iteration**: Changing a markdown file takes seconds. Retraining takes hours or days.

The tradeoff: token-space learning is crude. Current implementations are "custom man" — bespoke prompts for reflection, manual rules for what to save. But the barrier to entry is near zero.

## Thread

- [[the-agent-workflow]] — Evolving context closes the loop between agent sessions, making the workflow improve with use

## Related

- [[context-engineering]] — Evolving context is context engineering applied over time: curating the agent's persistent context, not just its per-session context
- [[context-files]] — Context files are evolving context at the repository level: maintained, updated AGENTS.md reflects the evolving context principle; stale context files become doc rot
- [[agent-skills]] — Skill learning is a category of evolving context; the skill.md format is the practical mechanism for agents to capture and reuse procedural knowledge
- [[multi-tier-action-space]] — Skills and memories live on the file system; the computer tier hosts evolving context
- [[lance-martin]] — Claude Diary, skill learning experiments, and the three-category breakdown
- [[dex-horthy]] — His snapshot-based eval approach and model intuition philosophy are complementary: evals measure whether evolution is helping
- [[ralph-loop]] — The plan file is a primitive form of evolving context — it's modified by each iteration and read by the next
- [[chris-parsons]] — Worker loop skills evolved via post-session reflection; skill learning as evolving context in practice

- [[procedural-knowledge]] — Capturing procedural knowledge from experience is a form of evolving context

## Sources

- `raw/yt-chroma-context-engineering-episode-3-lance-martin-langchain.md` — Full interview detailing the three categories of evolving context, RLM, the classifier heuristic, and the token-space vs. weight-space tradeoff
- `raw/yt-what-ai-agent-skills-are-and-how-they-work.md` — IBM Technology video on the skill.md open standard, validating and extending the skill learning category of evolving context
