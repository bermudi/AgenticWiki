---
title: Procedural Knowledge
created: 2026-05-04
updated: 2026-05-04
sources:
  - raw/yt-what-ai-agent-skills-are-and-how-they-work.md
tags: [concept, knowledge, memory, agents, cognitive-science]
---

# Procedural Knowledge

> In agent architectures, procedural knowledge is the "how" — step-by-step workflows, rules, and judgment for executing tasks. Distinct from semantic knowledge (facts) and episodic knowledge (experiences), it maps to the cognitive science concept of procedural memory and is implemented practically through [[agent-skills|skill files]].

## The Knowledge Triad

Cognitive science identifies three types of human memory. Agent architectures are starting to mirror this taxonomy:

| Type | What it holds | Human example | Agent implementation |
|---|---|---|---|
| **Semantic** | Facts | Rome is the capital of Italy | RAG, knowledge bases |
| **Episodic** | Experiences | I went to Rome last summer | Conversation logs, interaction history |
| **Procedural** | Skills | How to ride a scooter through Roman traffic | [[agent-skills|Skill files]] |

## Why Agents Need It

LLMs are strong at semantic knowledge (trained on vast corpora of facts) and can reference episodic knowledge (conversation history). But they lack procedural knowledge — the specific, multi-step procedures for getting work done. When an LLM encounters a task with no defined procedure, it either guesses (introducing errors) or needs every step explicitly prompted.

This is the gap that [[agent-skills]] fill: they provide the procedural knowledge as a reusable, version-controlled file that the agent reads when needed.

## Relationship to Other Knowledge Methods

- **MCP** provides *reach* (ability to call external APIs) — it doesn't provide procedural knowledge about when or how to use that reach
- **RAG** provides *reference* facts — it doesn't teach the agent how to execute a procedure
- **Fine-tuning** bakes knowledge into weights — it's permanent but expensive to change
- **Skills** provide *procedural* knowledge — how to do things, in what order, with what judgment

These compose: MCP gives the tool reach, the skill provides the procedure for using it.

## Implications for Agent Design

Procedural knowledge being file-based (not weight-based) has several important properties:

1. **Version controllable** — Skills live in git alongside code
2. **Cross-platform** — The skill.md open standard means one skill works across platforms
3. **Human editable** — Anyone can read and modify a skill file
4. **Progressive** — Skills are loaded efficiently via [[context-engineering|progressive disclosure]] rather than all-at-once
5. **Evolvable** — Agents can write their own skills from their trajectories (see [[evolving-context]], which covers the skill learning category — agents reflecting over trajectories and capturing SOPs as skills)

## Thread

- [[tool-design-for-agents]] — Procedural knowledge (skills) is the complement to tool access (MCP) in the agent tooling stack
- [[the-agent-workflow]] — Procedural knowledge operationalizes tasks within the agent workflow

## Related

- [[agent-skills]] — The practical implementation of procedural knowledge for agents
- [[evolving-context]] — Skill learning as a mechanism for agents to capture procedural knowledge from experience
- [[context-engineering]] — Progressive disclosure of procedural knowledge
- [[hallucination]] — Lack of procedural knowledge is a key source of agent guesswork and hallucination

## Sources

- `raw/yt-what-ai-agent-skills-are-and-how-they-work.md` — IBM Technology video explaining the cognitive science framing of procedural memory, the knowledge type comparison, and how skills implement procedural knowledge for agents
