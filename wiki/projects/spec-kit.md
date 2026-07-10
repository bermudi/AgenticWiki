---
title: Spec Kit
created: 2026-06-07
updated: 2026-07-10
sources:
  - raw/yt-al-harris-amazon-kiro-faang-spec-driven.md
  - raw/yt-cian-clarke-vibe-coding-to-spec-driven-dev.md
  - raw/yt-spec-driven-dev-hype-or-future.md
  - raw/spec-kit-github-sdd-toolkit.md
unaudited_marginal: 0
tags: [project, open-source, github, spec-driven-development]
---

# Spec Kit

> GitHub's open-source spec-driven development toolkit. Works with 30+ AI coding agents. The "constitution" model: a project-level file of golden rules the agent must not break, functionally equivalent to AGENTS.md / CLAUDE.md / .cursorrules (see [[context-files]]). The methodology inverts the traditional power structure: specifications don't serve code — code serves specifications.

## Overview

Spec Kit is one of the three dominant SDD tooling stacks as of late 2025 / early 2026, alongside [[bmad-method|BMAD Method]] and [[kiro|Amazon Kiro]]. Its distinguishing feature is *tooling agnosticism* — it works with 30+ AI coding agents, both CLI tools and IDE-based assistants. Install via the Specify CLI (`uv tool install specify-cli`), initialize a project, and the agent gets slash commands for the full SDD pipeline.

The "constitution" pattern is its key conceptual contribution: "a series of golden rules for how we build software in this project that I do not want you as a model to break" (per [[cian-clarke]]'s paraphrase). This is functionally equivalent to context files (AGENTS.md, CLAUDE.md, .cursorrules, [[steering-docs]]), but the Spec Kit framing centers it as the binding governance document for the SDD pipeline.

## The Power Inversion

Spec Kit's methodology document articulates the core SDD thesis as a power inversion: for decades, code has been king and specifications were scaffolding. SDD inverts this — specifications don't serve code, code serves specifications. The PRD isn't a guide for implementation; it's the source that generates implementation. Technical plans aren't documents that inform coding; they're precise definitions that produce code.

In this framing, maintaining software means evolving specifications. Debugging means fixing specifications that generate incorrect code. Refactoring means restructuring for clarity. The entire development workflow reorganizes around specifications as the central source of truth, with implementation plans and code as the continuously regenerated output. The process is 0 → 1, (1', ..), 2, 3, N — each new feature or parallel implementation revisits the specification.

## The Slash Command Pipeline

| Command | What it does |
|---------|-------------|
| `/speckit.constitution` | Create or update project governing principles and development guidelines |
| `/speckit.specify` | Define what you want to build (requirements and user stories) |
| `/speckit.clarify` | Clarify underspecified areas (recommended before planning) |
| `/speckit.plan` | Create technical implementation plans with your chosen tech stack |
| `/speckit.analyze` | Cross-artifact consistency & coverage analysis |
| `/speckit.tasks` | Generate actionable task lists from the plan |
| `/speckit.implement` | Execute all tasks to build the feature |
| `/speckit.converge` | Assess the codebase against spec/plan/tasks, append remaining work |

## The Constitutional Foundation

The constitution (`memory/constitution.md`) is the architectural DNA of the system — a set of immutable principles that govern how specifications become code. Nine articles shape every aspect of development:

1. **Library-First** — every feature must begin as a standalone library. Forces modular design.
2. **CLI Interface Mandate** — every library must expose functionality through a CLI. Enforces observability and testability.
3. **Test-First Imperative** — no code before tests. Non-negotiable: tests written, approved, confirmed to FAIL (Red phase) before implementation.
4. **Articles IV, V, VI** — project-defined governance. Intentionally left to each project's constitution rather than prescribed.
5. **Simplicity (VII)** — maximum 3 projects for initial implementation; additional projects require documented justification.
6. **Anti-Abstraction (VIII)** — use framework features directly rather than wrapping them.
7. **Integration-First Testing (IX)** — prefer real databases over mocks, actual services over stubs, contract tests mandatory.

The constitution's power lies in its immutability: while implementation details evolve, core principles remain constant. This provides consistency across time, across LLMs (different models produce architecturally compatible code), and architectural integrity (every feature reinforces the system design).

## Template-Driven Quality

Spec Kit's templates are not just formatting aids — they are constraint mechanisms that channel LLM output toward higher-quality specifications. Seven mechanisms: preventing premature implementation details, forcing explicit `[NEEDS CLARIFICATION]` markers, structured thinking through checklists, constitutional compliance through phase gates, hierarchical detail management, test-first thinking, and preventing speculative features. See [[template-driven-quality]] for the full treatment.

## Extensions, Presets, and Bundles

Spec Kit can be tailored through a layered customization system:

- **Extensions** — add new commands and templates (domain-specific workflows, external tool integration)
- **Presets** — override existing templates and commands (compliance formats, domain-specific terminology, organizational standards)
- **Bundles** — package a curated set of extensions, presets, and workflows into a versioned, role-oriented setup (product manager, business analyst, security researcher, developer)

Templates resolve at runtime via a priority stack: project-local overrides > presets > extensions > Spec Kit core. The first match wins.

## Why It Matters

- **Lowest friction on-ramp.** Per `raw/yt-spec-driven-dev-hype-or-future.md`: "Run the init command, write a spec for your next feature, see if the output improves. That's the experiment."
- **Tool-agnostic.** Works with 30+ AI coding agents.
- **Open-source governance model.** Rules and specs are visible in the repo.
- **Template-constrained generation.** Templates act as sophisticated prompts that prevent known LLM failure modes.

## Position in the Ecosystem

Where [[kiro|Kiro]] ships EARS + property-based testing as a unified pipeline and [[bmad-method|BMAD]] ships specialized role definition, Spec Kit ships the *constitution* model — a binding rules document that the agent must follow. The three are complementary rather than competing: a team could use Spec Kit's constitution with BMAD's role definitions on top of Kiro's IDE.

The newer frameworks [[gstack]] and [[gsd-core|GSD Core]] take different approaches: gstack is a sprint-workflow enforcement layer (23 specialist skills chaining Think → Plan → Build → Review → Test → Ship), while GSD Core is a fresh-context subagent architecture (Discuss → Plan → Execute → Verify → Ship with persistent `.planning/` artifacts). Spec Kit remains the most established spec-generation-focused tool; the newer frameworks add workflow execution and context management layers that Spec Kit's core doesn't address.

## Related

- [[spec-driven-development]] — The methodology Spec Kit implements
- [[template-driven-quality]] — How Spec Kit's templates constrain LLM output
- [[context-files]] — The general category; Spec Kit's "constitution" is one instance
- [[kiro]] — The other major SDD tooling stack; first to codify SDD primitives into the IDE
- [[bmad-method]] — The other major SDD tooling stack; specialized role definition
- [[gstack]] — Sprint-workflow enforcement layer; complementary to Spec Kit's spec-generation focus
- [[gsd-core]] — Fresh-context subagent SDD framework; complementary to Spec Kit's constitution model
- [[cian-clarke]] — Names Spec Kit's constitution pattern as synonymous with CLAUDE.md / .cursorrules

## Sources

- `raw/yt-al-harris-amazon-kiro-faang-spec-driven.md` — AI Engineer talk. Reference to Spec Kit as one of the major SDD tooling stacks.
- `raw/yt-cian-clarke-vibe-coding-to-spec-driven-dev.md` — DevCon Fall 2025. Names Spec Kit's constitution pattern as synonymous with CLAUDE.md / .cursorrules.
- `raw/yt-spec-driven-dev-hype-or-future.md` — Devsplainers benchmark of Spec Kit vs iterative development (33 min agent time / 2,500 lines markdown / 689 lines code / 3.5h review vs 8 min / 1,000 LOC / 24 min review, zero bugs); 10x faster without SDD on the test problem.
- `raw/spec-kit-github-sdd-toolkit.md` — Primary source: README + spec-driven.md methodology. Power Inversion thesis, nine constitutional articles, template-driven quality (7 constraint mechanisms), extensions/presets/bundles system, 30+ agent integrations, slash command pipeline.
