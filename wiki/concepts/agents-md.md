---
title: AGENTS.md
created: 2026-07-19
updated: 2026-07-19
sources:
  - raw/agents-md-standard.md
  - raw/create-project-agentsmd-skill.md
unaudited_marginal: 0
tags: [concept, agents-md, context-files, configuration, open-format]
---

# AGENTS.md

> AGENTS.md is an open, plain-markdown convention for giving coding agents project context — a "README for agents" placed at a repo root (and optionally in subdirectories), now used by 60k+ open-source projects and stewarded by the Agentic AI Foundation under the Linux Foundation. The `create-project-agentsmd` skill distills the practical authoring craft: encode stable intent, not volatile implementation detail.

## The Convention

AGENTS.md is deliberately **not a spec with required fields** — it is standard Markdown the agent parses as text. The format emerged from collaboration across the AI-SWE ecosystem (OpenAI Codex, Amp, Google's Jules, Cursor, Factory) and is now an open format stewarded by the Agentic AI Foundation (Linux Foundation). Its pitch: a predictable, dedicated place for the build steps, tests, and conventions that would clutter a human-facing README.

Common sections (all optional):

- Project overview
- Build and test commands
- Code style guidelines
- Testing instructions
- Security considerations / PR conventions

## Discovery and Precedence

- **Nested files:** a monorepo can place an `AGENTS.md` in each subproject; agents automatically read the *nearest* file in the directory tree, so the closest one takes precedence. (At time of writing the main OpenAI repo reportedly carried 88 of them.)
- **Conflict resolution:** the closest `AGENTS.md` to the edited file wins; an explicit user chat prompt overrides everything.
- **Cross-agent compatibility:** the same file works across Codex, Claude Code, Cursor, Aider (`.aider.conf.yml` → `read: AGENTS.md`), Gemini CLI (`.gemini/settings.json` → `context.fileName`), Factory, and others. Migration from legacy names is a rename plus a symlink (`mv AGENT.md AGENTS.md && ln -s AGENTS.md AGENT.md`).

This "nearest file wins" rule is the mechanism behind the empirical finding in [[context-files]] that context-file instructions are scoped to the file being edited.

## Authoring Craft (from the create-project-agentsmd skill)

The skill codifies a design philosophy that, tellingly, converges with the empirical minimalism consensus in [[context-files]]:

- **Goals over mechanism.** Encode *what matters and why*, not *how everything is wired*. Implementation details rot; goals, constraints, and quality standards stay stable.
- **Stable reference facts are not noise.** Keep things the agent *cannot* reliably discover from code: external data sources / API endpoints, data contracts and schemas, domain vocabulary, required workflows/commands, and known gotchas. Cut things that change on refactor (file paths, function names, line numbers, component inventories).
- **Litmus test (two questions):** (1) Could the agent discover this from code alone? → if yes, cut it. (2) Would rediscovering it cost real time or risk error? → if yes, file it — just not in the root file.
- **File it, don't delete it.** Niche but hard-won knowledge belongs in `docs/adr/`, per-directory `AGENTS.md`, or `docs/agent-context/` — referenced from the root file by path (agents `read` on demand). This mirrors the [[evolving-context]] principle of incrementally filing operational learnings.
- **Ruthless length discipline.** Keep the whole file under 200 lines; every line is a token tax on every interaction. Omit empty sections. A focused 50-line file beats a diffuse 300-line one.
- **Anti-patterns:** file paths/function names, rules tooling already enforces, generic advice ("write clean code"), long prose paragraphs, implementation-specific rules where abstract ones survive, and over-pruning until the file says nothing.

The skill's skeleton: Project → Stack → Architecture → Conventions → Workflow → Constraints & Red Lines → Quality Bar. It adapts per tool (Pi walks up parent directories with no inline imports; Cursor wants one `.cursorrules` file; `AGENTS.md` is the generic default). Maintenance rule: update when *patterns* change, not when *files* move.

> [!note] Convergence: practice meets evidence
> The create-project-agentsmd guidance — encode stable reference facts, cut volatile implementation detail, keep it short — is practitioner-level convergence with the [[context-files]] minimalism consensus (Gloaguen et al.'s "only minimal requirements"; the [[ralph-loop]] ~60-line file). It also explains *why* the `/init`-style auto-generated dumps degraded performance in the Gloaguen study: those dumps duplicate existing documentation (redundancy), which is exactly the "volatile implementation detail" the skill says to cut. The format is not implicated; redundant generation is.

## Relationship to the Empirical Record

The convention itself is format-neutral about content, so its value tracks entirely on *what authors put in it*. The wiki's [[context-files]] page carries the contested evidence (Gloaguen: `/init` dumps hurt on complex tasks; Lulla: context files *help* on small PRs) and the minimalism consensus. Treat AGENTS.md as the container; the open question is filling it well. [[contextcov]] takes a different tack — making the instructions *executable* rather than optimizing their prose.

## Thread

- [[the-agent-workflow]] — AGENTS.md is operational infrastructure in the agent workflow (build/test commands, constraints); workflow outcomes are sensitive to its design.
- [[tool-design-for-agents]] — Context files are a tool-level interface for shaping agent behavior; their design quality directly impacts agent effectiveness.
- [[the-slop-problem]] — Context files can reduce slop by constraining agents, but poorly-designed ones can increase slop by encouraging unnecessary exploration.
- [[agent-quality-engineering]] — The tension in the empirical studies motivates context-file A/B evals as agent-quality infrastructure.

## Related

- [[context-files]] — The umbrella concept: AGENTS.md / CLAUDE.md / copilot-instructions.md as repository-level instruction artifacts, with the empirical evaluation.
- [[agent-skills]] — Complementary: context files provide *what to know about this project*; skills provide *how to do things*.
- [[contextcov]] — Transforms passive AGENTS.md instructions into executable guardrails (Documentation as Code).
- [[ralph-loop]] — Operationalized AGENTS.md as build/test infrastructure (~60 lines, minimal by design).
- [[evolving-context]] — Filing hard-won context incrementally; stale context files become [[doc-rot]].
- [[open-knowledge-format]] — Parallel precedent: a minimal open-format spec betting that speaker count beats ownership; the AGENTS.md family is a related bespoke instance.
- [[doc-rot]] — AGENTS.md is living documentation; neglect rots it.

## Sources

- `raw/agents-md-standard.md` — The agents.md/ site: the convention's motivating rationale, no-required-fields format, nested-file discovery, cross-agent compatibility, and Agentic AI Foundation stewardship.
- `raw/create-project-agentsmd-skill.md` — Local `create-project-agentsmd` skill: the authoring craft (goals over mechanism, stable facts vs volatile details, file-it-don't-delete-it, <200-line discipline, anti-patterns, per-tool adaptation).
