---
title: Agent Skills
created: 2026-05-04
updated: 2026-05-04
sources:
  - raw/what-ai-agent-skills-are-and-how-they-work-youtube.md
tags: [concept, agents, skills, procedural-knowledge, progressive-disclosure]
---

# Agent Skills

> A skill is a `skill.md` file in a folder that teaches an AI agent procedural knowledge — how to execute specific workflows, tasks, or jobs. Skills use progressive disclosure (metadata → instructions → resources) to stay context-efficient, and the format is an open standard (Apache 2.0) adopted across Claude Code, OpenAI Codex, and other major platforms.

## The Problem Skills Solve

LLMs are strong reasoners with extensive semantic knowledge (they know facts like Kubernetes architecture or SQL history), but they **lack procedural knowledge** — the step-by-step "how" of executing work. Without skills, an agent facing a task like generating a compliant financial report has two options:

1. Be prompted with every step (all 47 of them), every single time
2. Guess at the procedure, which introduces errors

Skills fill this gap by providing the procedural knowledge as a reusable, version-controlled file.

## Format

A skill is deceptively simple: a `skill.md` file inside a folder.

### Minimum structure

```yaml
---
name: Skill Name
description: When to use this skill, what it does, and the trigger condition
---
```

- **name** — Identifies the skill (mandatory)
- **description** — Tells the agent what the skill does and **when to apply it** — this is the trigger condition (mandatory)
- Optional frontmatter: `author`, `version`

Below the frontmatter, the body contains the step-by-step instructions, rules, examples, and output format — all in plain markdown. Whatever the agent needs to know to do the job.

### Optional directories

| Directory | Contents |
|---|---|
| `scripts/` | Executable JavaScript, Python, or bash scripts the agent can run |
| `references/` | Additional documentation loaded on demand |
| `assets/` | Static resources like templates and data files |

## Progressive Disclosure

Skills use **three-tier progressive disclosure** to keep context windows lean even with hundreds of installed skills:

- **Tier 1 (metadata only)**: At startup, the agent loads only the `name` and `description` from each skill — a handful of tokens per skill. This is the table of contents.
- **Tier 2 (full instructions)**: When the agent encounters a task matching the skill's description, it reads the complete `skill.md` body into context. The matching happens through the LLM's own reasoning, which is why a good description is critical.
- **Tier 3 (resources)**: The optional directories (`scripts/`, `references/`, `assets/`) are loaded only when a specific task needs them.

This keeps overhead minimal: a lightweight index at startup, detailed instructions only when relevant, and resources at the point of need.

## Knowledge Type Comparison

Skills serve a distinct role in the knowledge ecosystem for agents:

| Method | Provides | Limitation |
|---|---|---|
| **MCP** (Model Context Protocol) | Tool access — ability to call external APIs and services | Doesn't tell the agent when or how to use the tool |
| **RAG** (Retrieval Augmented Generation) | Factual knowledge — retrieves relevant chunks from a knowledge base | Reference material, doesn't teach how to do something |
| **Fine-tuning** | Knowledge baked into model weights | Permanent but expensive; must be redone when the model changes |
| **Skills** | **[[procedural-knowledge|Procedural knowledge]]** — how to do things, in what order, with what judgment | Designed for repeatable workflows, not open-ended fact retrieval |

In practice, skills compose with other forms. MCP provides the reach (call an API), and the skill provides the judgment (when to call it and what to do with the response).

## Cognitive Science Analogy

Human memory has three distinct types:

| Human Memory | Agent Architecture |
|---|---|
| **Semantic** (facts — "Rome is the capital of Italy") | RAG, knowledge bases |
| **Episodic** (experiences — "I went to Rome last summer") | Conversation logs, interaction history |
| **[[procedural-knowledge|Procedural]]** (skills — "how to ride a scooter") | **Skill files** |

Agent architectures are starting to mirror this cognitive taxonomy. Skills are procedural memory for agents.

## Open Standard

The `skill.md` format is an open standard published at [agent-skills.io](https://agent-skills.io), licensed under Apache 2.0. It was adopted across major AI platforms including:

- Claude Code
- OpenAI Codex
- Many other agent tools

A skill built for one platform works on any platform that supports the spec.

## Security

Skills can include executable scripts with access to file systems, environment variables, and API keys — this is what makes them powerful but also introduces trust concerns. Audits of publicly available skills have found:

- Prompt injection
- Tool poisoning
- Hidden malware

> [!warning] Security
> Treat skill installation with the same rigor as any software dependency. Review what the skill does before running it on your local machine.

## Thread

- [[tool-design-for-agents]] — Skills are the procedural complement to tool access; MCP provides reach, skills provide judgment
- [[the-agent-workflow]] — Skills operationalize the "how" of agent execution within the workflow

## Related

- [[context-engineering]] — Progressive disclosure is a core context engineering technique, and skills are its canonical implementation
- [[evolving-context]] — Skill learning (agents capturing SOPs as skills from their own trajectories) is a category of evolving context
- [[lance-martin]] — Built the skill system for Deep Agents; his work on evolving context includes skill learning
- [[pi]] — This wiki's own skill system follows the skill.md pattern
- [[malleable-agents]] — Skills being just files means agents can create and modify them, making agents self-extending
- [[multi-tier-action-space]] — Skills live on the file system tier, loaded on demand into the tool tier
- [[hallucination]] — Skills reduce hallucination by replacing guesswork with defined procedures

## Sources

- `raw/what-ai-agent-skills-are-and-how-they-work-youtube.md` — IBM Technology video explaining skill format, progressive disclosure, knowledge type comparison, cognitive science analogy, and the open standard
