---
title: gstack
created: 2026-07-10
updated: 2026-07-10
sources:
  - raw/gstack-garry-tan-software-factory.md
unaudited_marginal: 0
tags: [project, open-source, agent-workflow, software-factory, claude-code, skills]
---

# gstack

> Garry Tan's open-source "software factory" — 23 specialist slash-command skills and 8 power tools that turn Claude Code into a virtual engineering team. Sprint workflow: Think → Plan → Build → Review → Test → Ship → Reflect. MIT licensed, works across 10 AI coding agents, designed for 10-15 parallel sprints.

## Overview

gstack is [[garry-tan|Garry Tan]]'s personal software factory, open-sourced. It packages a complete sprint workflow as Claude Code slash commands, each embodying a specialist role: `/office-hours` (YC-style product interrogation), `/plan-ceo-review` (strategic challenge), `/plan-eng-review` (architecture lockdown), `/review` (staff-engineer code review), `/qa` (real-browser testing), `/cso` (OWASP + STRIDE security audit), `/ship` (release engineering), and more. The skills chain: each produces an artifact the next skill consumes, so nothing falls through the cracks.

The pitch is a compression ratio: Tan reports shipping 3 production services and 40+ features in 60 days, part-time, while running YC full-time. His 2026 run rate is ~810× his 2013 pace on logical code changes. The framework is the mechanism.

## The Sprint Structure

gstack is a process, not a collection of tools. The skills run in the order a sprint runs:

**Think → Plan → Build → Review → Test → Ship → Reflect**

Each skill feeds into the next. `/office-hours` writes a design doc that `/plan-ceo-review` reads. `/plan-eng-review` writes a test plan that `/qa` picks up. `/review` catches bugs that `/ship` verifies are fixed. The sprint structure is what makes parallelism work — without a process, ten agents is ten sources of chaos; with a process, each agent knows exactly what to do and when to stop.

## Key Skills

| Skill | Role | What it does |
|-------|------|-------------|
| `/office-hours` | YC Office Hours | Six forcing questions that reframe the product before code. Pushes back on framing, challenges premises. |
| `/plan-ceo-review` | CEO / Founder | Rethink the problem. Four modes: Expansion, Selective Expansion, Hold Scope, Reduction. |
| `/plan-eng-review` | Eng Manager | Lock architecture, data flow, diagrams, edge cases, tests. |
| `/plan-design-review` | Senior Designer | Rates each design dimension 0-10, explains what a 10 looks like, edits the plan to get there. AI Slop detection. |
| `/review` | Staff Engineer | Find bugs that pass CI but blow up in production. Auto-fixes obvious ones. |
| `/qa` | QA Lead | Real Chromium browser, real clicks, real screenshots. Auto-generates regression tests for every fix. |
| `/cso` | Chief Security Officer | OWASP Top 10 + STRIDE. Zero-noise: 17 false positive exclusions, 8/10+ confidence gate. |
| `/ship` | Release Engineer | Sync main, run tests, audit coverage, push, open PR. Bootstraps test frameworks if needed. |
| `/autoplan` | Review Pipeline | One command, fully reviewed plan. Runs CEO → design → eng review automatically. |
| `/codex` | Second Opinion | Independent code review from OpenAI Codex CLI. Cross-model analysis when both `/review` and `/codex` have run. |
| `/learn` | Memory | Manage what gstack learned across sessions. Learnings compound so gstack gets smarter on your codebase over time. |

## The Builder Ethos

Three principles are injected into every workflow skill's preamble automatically:

1. **[[boil-the-ocean|Boil the Ocean]]** — AI-assisted coding makes the marginal cost of completeness near-zero. "Don't boil the ocean" was right when engineering time was the bottleneck; that era is over. Do the complete thing, every time.
2. **Search Before Building** — The 1000x engineer's first instinct is "has someone already solved this?" Three layers of knowledge: tried-and-true (Layer 1), new-and-popular (Layer 2), first-principles (Layer 3). Prize Layer 3 above all.
3. **User Sovereignty** — AI models recommend. Users decide. The user always has context that models lack. Even when two models agree on a change, the user's "no" is final. This is the generation-verification loop: AI generates recommendations, the user verifies and decides.

## Parallel Sprints and the Software Factory

gstack is designed for 10-15 parallel sprints via Conductor, each in its own isolated workspace. This is the most concrete shipped instantiation of the [[software-factory]] concept: one person managing a virtual engineering team, checking in on decisions that matter, letting the rest run. The sprint structure is what makes this safe — each agent has a defined role, a defined stopping point, and artifacts that the next skill consumes.

## Cross-Model Review

`/codex` gets an independent review from OpenAI's Codex CLI — a completely different AI looking at the same diff. Three modes: code review with pass/fail gate, adversarial challenge, and open consultation. When both `/review` (Claude) and `/codex` (OpenAI) have reviewed the same branch, a cross-model analysis shows which findings overlap and which are unique to each. This is a concrete instance of the multi-model verification pattern.

## GBrain — Persistent Agent Memory

gstack integrates with GBrain, a persistent knowledge base for AI agents. `/setup-gbrain` offers four paths (Supabase existing, Supabase auto-provision, PGLite local, remote MCP). `/sync-gbrain` re-indexes repo code into the brain and writes a `## GBrain Search Guidance` block to CLAUDE.md so the agent prefers `gbrain search` over Grep. Per-remote trust policy (read-write / read-only / deny) controls whether the agent can write back to the shared brain.

## Thread

- [[the-agent-workflow]] — gstack is the most detailed shipped instantiation of the sprint workflow: Think → Plan → Build → Review → Test → Ship → Reflect
- [[software-factory]] — gstack is a concrete software factory: 23 specialist roles, parallel sprints, persistent memory, cross-model review
- [[the-human-lever]] — User Sovereignty is gstack's explicit human-lever principle: AI recommends, user decides
- [[the-slop-problem]] — gstack's `/review`, `/qa`, and `/cso` skills are verification infrastructure against slop

## Related

- [[garry-tan]] — Creator of gstack; President & CEO of Y Combinator
- [[boil-the-ocean]] — gstack's first ethos principle; completeness is cheap with AI
- [[spec-kit]] — The other major open-source SDD toolkit; gstack is the workflow-enforcement layer, Spec Kit is the spec-generation layer
- [[gsd-core]] — The other major open-source spec-driven workflow framework; GSD Core uses fresh-context subagents, gstack uses sprint-chained skills
- [[agent-skills]] — gstack's 23 skills are a large, coherent skill ecosystem
- Conductor — Parallel sprint runner that gstack is designed for (10-15 isolated workspaces)
- [[claude-code]] — gstack's primary target agent
- [[context-files]] — gstack's team mode bootstraps CLAUDE.md with skill routing

## Sources

- `raw/gstack-garry-tan-software-factory.md` — README + ETHOS.md. Full sprint workflow, 23 specialist skills, builder ethos (Boil the Ocean, Search Before Building, User Sovereignty), parallel sprints, cross-model review, GBrain integration, 10-agent support.
