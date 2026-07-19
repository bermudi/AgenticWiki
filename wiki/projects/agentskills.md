---
title: Agent Skills (open standard)
created: 2026-07-19
updated: 2026-07-19
sources:
  - raw/agentskills-specification.md
unaudited_marginal: 0
tags: [project, agent-skills, skill-md, open-standard, procedural-knowledge]
---

# Agent Skills (open standard)

> Agent Skills is an open standard for extending AI agents with specialized knowledge and workflows: a folder containing a `SKILL.md` (see [[skill-md]]), loaded on demand via progressive disclosure. Originally developed by Anthropic and released as an open standard, it is now stewarded by a growing cross-vendor ecosystem and supported by a large number of agent clients.

## What It Is

Agent Skills package procedural knowledge and team-/user-specific context into **portable, version-controlled folders** agents load on demand. The canonical specification lives in the `agentskills/agentskills` GitHub repository (docs built with Mintlify); the standard is open to contributions via GitHub and Discord.

The format solves the gap between capable-but-context-poor agents and the domain expertise they need to do real work: it gives agents **domain expertise** (legal review, data pipelines, formatting), **repeatable workflows** (consistent, auditable procedures), and **cross-product reuse** (build once, run on any compatible agent).

## How It Works

Agents load skills through three stages of progressive disclosure:

1. **Discovery** — at startup, only each skill's `name` + `description` load (a handful of tokens).
2. **Activation** — when a task matches a description, the full `SKILL.md` body loads into context.
3. **Execution** — the agent follows the instructions, optionally running bundled `scripts/` or loading `references/`.

Full instructions load only when a task calls for them, so an agent can keep many skills on hand with a small context footprint.

## Adoption

The standard is supported by "a large number of AI tools and agentic clients" (the docs' Client Showcase), including Claude Code and OpenAI Codex among others. A skill built for one platform works on any spec-compatible client. Supporting tooling from the ecosystem:

- **`skills-ref`** — validation library (`skills-ref validate ./my-skill`) that checks frontmatter and naming conventions.
- **`skills` CLI / `.skill` packaging** — zip a skill folder and rename `.zip` → `.skill` for drag-and-drop install into compatible clients.
- **`eval.json` format** — packages test cases (prompt + expected output + assertions) alongside the skill for eval-driven development.

## Stewardship Note

> [!note] Departure: where the standard lives
> The wiki's [[agent-skills]] concept previously cited `agent-skills.io` as the standard's home and Apache 2.0 as its license. The current canonical source is the `agentskills/agentskills` repository, described as "originally developed by Anthropic, released as an open standard." The spec's own `license` frontmatter field (per [[skill-md]]) lets individual skills carry their own license (the `skill-creator` skill uses Apache-2.0); the *format* is an open standard, not a single-vendor product.

## Thread

- [[tool-design-for-agents]] — The open standard is a tool-interface contract: a predictable way for agents to acquire procedural capability.
- [[the-agent-workflow]] — Skills are the reusable "how" units dispatched inside the agent workflow.

## Related

- [[skill-md]] — The concrete file format/spec this standard defines.
- [[agent-skills]] — The concept/mechanism: why skills exist, knowledge-type comparison, design craft.
- [[claude-code]] — A primary reference client for the standard; supports `disable-model-invocation` user-invoked skills.
- [[procedural-knowledge]] — Skills are procedural memory for agents.
- [[open-knowledge-format]] — Parallel minimal-open-format precedent (Google Cloud's OKF); both bet on speaker count over ownership.

## Sources

- `raw/agentskills-specification.md` — The `agentskills/agentskills` docs: overview (Anthropic-origin open standard, cross-client support), specification (directory structure, frontmatter, progressive disclosure, validation), and client showcase.
