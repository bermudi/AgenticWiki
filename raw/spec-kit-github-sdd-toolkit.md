---
type: web
url: https://github.com/github/spec-kit
title: Spec Kit — GitHub's Open Source SDD Toolkit (README + spec-driven.md)
author: GitHub
date: 2026-07-10
ingested: 2026-07-10
---

# Spec Kit

An open source toolkit that allows you to focus on product scenarios and predictable outcomes instead of vibe coding every piece from scratch.

## What is Spec-Driven Development?

Spec-Driven Development flips the script on traditional software development. For decades, code has been king — specifications were just scaffolding we built and discarded once the "real work" of coding began. Spec-Driven Development changes this: specifications become executable, directly generating working implementations rather than just guiding them.

## Get Started

1. Install Specify CLI: `uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@vX.Y.Z`
2. Initialize a project: `specify init my-project --integration copilot`
3. Establish project principles: `/speckit.constitution`
4. Create the spec: `/speckit.specify`
5. Create a technical implementation plan: `/speckit.plan`
6. Break down into tasks: `/speckit.tasks`
7. Execute implementation: `/speckit.implement`

## Available Slash Commands

### Core Commands

| Command | Description |
|---------|-------------|
| `/speckit.constitution` | Create or update project governing principles and development guidelines |
| `/speckit.specify` | Define what you want to build (requirements and user stories) |
| `/speckit.plan` | Create technical implementation plans with your chosen tech stack |
| `/speckit.tasks` | Generate actionable task lists for implementation |
| `/speckit.taskstoissues` | Convert generated task lists into GitHub issues |
| `/speckit.implement` | Execute all tasks to build the feature according to the plan |
| `/speckit.converge` | Assess the codebase against spec/plan/tasks and append remaining work as new tasks |

### Optional Commands

| Command | Description |
|---------|-------------|
| `/speckit.clarify` | Clarify underspecified areas (recommended before /speckit.plan) |
| `/speckit.analyze` | Cross-artifact consistency & coverage analysis |
| `/speckit.checklist` | Generate custom quality checklists ("unit tests for English") |

## Supported AI Coding Agent Integrations

Spec Kit works with 30+ AI coding agents — both CLI tools and IDE-based assistants.

## Extensions, Presets, and Bundles

Spec Kit can be tailored through two complementary systems — extensions and presets — plus project-local overrides:

| Priority | Component Type | Location |
|----------|----------------|----------|
| 1 (highest) | Project-Local Overrides | `.specify/templates/overrides/` |
| 2 | Presets — Customize core & extensions | `.specify/presets/templates/` |
| 3 | Extensions — Add new capabilities | `.specify/extensions/templates/` |
| 4 (lowest) | Spec Kit Core — Built-in SDD commands & templates | `.specify/templates/` |

- **Extensions** add new commands and templates — domain-specific workflows, external tool integration, new development phases.
- **Presets** override templates and commands that ship with the core — compliance-oriented spec formats, domain-specific terminology, organizational standards.
- **Bundles** package a curated set of extensions, presets, steps, and workflows into a single, versioned, role-oriented setup (product manager, business analyst, security researcher, developer).

Templates are resolved at runtime — Spec Kit walks the stack top-down and uses the first match.

## Core Philosophy

Spec-Driven Development is a structured process that emphasizes:
- Intent-driven development where specifications define the "what" before the "how"
- Rich specification creation using guardrails and organizational principles
- Multi-step refinement rather than one-shot code generation from prompts
- Heavy reliance on advanced AI model capabilities for specification interpretation

## Development Phases

| Phase | Focus | Key Activities |
|-------|-------|----------------|
| 0-to-1 Development ("Greenfield") | Generate from scratch | Start with high-level requirements, generate specifications, plan implementation steps, build production-ready applications |
| Creative Exploration | Parallel implementations | Explore diverse solutions, support multiple technology stacks & architectures, experiment with UX patterns |
| Iterative Enhancement ("Brownfield") | Brownfield modernization | Add features iteratively, modernize legacy systems, adapt processes |

---

# Specification-Driven Development (SDD) — Methodology Deep Dive

## The Power Inversion

For decades, code has been king. Specifications served code — they were the scaffolding we built and then discarded once the "real work" of coding began. Code was truth. Everything else was, at best, good intentions. Code was the source of truth, and as it moved forward, specs rarely kept pace.

Spec-Driven Development (SDD) inverts this power structure. Specifications don't serve code — code serves specifications. The Product Requirements Document (PRD) isn't a guide for implementation; it's the source that generates implementation. Technical plans aren't documents that inform coding; they're precise definitions that produce code. This isn't an incremental improvement to how we build software. It's a fundamental rethinking of what drives development.

The gap between specification and implementation has plagued software development since its inception. We've tried to bridge it with better documentation, more detailed requirements, stricter processes. These approaches fail because they accept the gap as inevitable. They try to narrow it but never eliminate it. SDD eliminates the gap by making specifications and their concrete implementation plans born from the specification executable. When specifications and implementation plans generate code, there is no gap — only transformation.

In this new world, maintaining software means evolving specifications. The intent of the development team is expressed in natural language ("intent-driven development"), design assets, core principles and other guidelines. The lingua franca of development moves to a higher level, and code is the last-mile approach.

Debugging means fixing specifications and their implementation plans that generate incorrect code. Refactoring means restructuring for clarity. The entire development workflow reorganizes around specifications as the central source of truth, with implementation plans and code as the continuously regenerated output. Updating apps with new features or creating a new parallel implementation means revisiting the specification and creating new implementation plans. This process is therefore a 0 → 1, (1', ..), 2, 3, N.

## Why SDD Matters Now

Three trends make SDD not just possible but necessary:

First, AI capabilities have reached a threshold where natural language specifications can reliably generate working code. This isn't about replacing developers — it's about amplifying their effectiveness by automating the mechanical translation from specification to implementation.

Second, software complexity continues to grow exponentially. Modern systems integrate dozens of services, frameworks, and dependencies. Keeping all these pieces aligned with original intent through manual processes becomes increasingly difficult. SDD provides systematic alignment through specification-driven generation.

Third, the pace of change accelerates. Requirements change far more rapidly today than ever before. Pivoting is no longer exceptional — it's expected. Traditional development treats these changes as disruptions. SDD transforms requirement changes from obstacles into normal workflow. When specifications drive implementation, pivots become systematic regenerations rather than manual rewrites.

## Core Principles

- **Specifications as the Lingua Franca**: The specification becomes the primary artifact. Code becomes its expression in a particular language and framework. Maintaining software means evolving specifications.
- **Executable Specifications**: Specifications must be precise, complete, and unambiguous enough to generate working systems. This eliminates the gap between intent and implementation.
- **Continuous Refinement**: Consistency validation happens continuously, not as a one-time gate. AI analyzes specifications for ambiguity, contradictions, and gaps as an ongoing process.
- **Research-Driven Context**: Research agents gather critical context throughout the specification process, investigating technical options, performance implications, and organizational constraints.
- **Bidirectional Feedback**: Production reality informs specification evolution. Metrics, incidents, and operational learnings become inputs for specification refinement.
- **Branching for Exploration**: Generate multiple implementation approaches from the same specification to explore different optimization targets — performance, maintainability, user experience, cost.

## Template-Driven Quality: How Structure Constrains LLMs for Better Outcomes

The true power of Spec Kit's commands lies not just in automation, but in how the templates guide LLM behavior toward higher-quality specifications. The templates act as sophisticated prompts that constrain the LLM's output in productive ways:

### 1. Preventing Premature Implementation Details

The feature specification template explicitly instructs: Focus on WHAT users need and WHY, Avoid HOW to implement (no tech stack, APIs, code structure). This constraint forces the LLM to maintain proper abstraction levels.

### 2. Forcing Explicit Uncertainty Markers

Both templates mandate the use of `[NEEDS CLARIFICATION]` markers. This prevents the common LLM behavior of making plausible but potentially incorrect assumptions. Instead of guessing that a "login system" uses email/password authentication, the LLM must mark it as `[NEEDS CLARIFICATION: auth method not specified - email/password, SSO, OAuth?]`.

### 3. Structured Thinking Through Checklists

The templates include comprehensive checklists that act as "unit tests" for the specification. These force the LLM to self-review its output systematically, catching gaps that might otherwise slip through.

### 4. Constitutional Compliance Through Gates

The implementation plan template enforces architectural principles through phase gates. These gates prevent over-engineering by making the LLM explicitly justify any complexity. If a gate fails, the LLM must document why in the "Complexity Tracking" section, creating accountability for architectural decisions.

### 5. Hierarchical Detail Management

The templates enforce proper information architecture: implementation plans should remain high-level and readable. Any code samples, detailed algorithms, or extensive technical specifications must be placed in the appropriate implementation-details file. This prevents specifications from becoming unreadable code dumps.

### 6. Test-First Thinking

The implementation template enforces test-first development: Create contracts/ with API specifications, create test files in order: contract → integration → e2e → unit, create source files to make tests pass. This ordering constraint ensures the LLM thinks about testability and contracts before implementation.

### 7. Preventing Speculative Features

Templates explicitly discourage speculation: No speculative or "might need" features, all phases have clear prerequisites and deliverables. This stops the LLM from adding "nice to have" features that complicate implementation.

### The Compound Effect

These constraints work together to produce specifications that are: Complete, Unambiguous, Testable, Maintainable, Implementable. The templates transform the LLM from a creative writer into a disciplined specification engineer.

## The Constitutional Foundation: Enforcing Architectural Discipline

At the heart of SDD lies a constitution — a set of immutable principles that govern how specifications become code. The constitution (`memory/constitution.md`) acts as the architectural DNA of the system.

### The Nine Articles of Development

**Article I: Library-First Principle.** Every feature must begin as a standalone library — no exceptions. This forces modular design from the start.

**Article II: CLI Interface Mandate.** Every library must expose its functionality through a command-line interface. This enforces observability and testability. The LLM cannot hide functionality inside opaque classes — everything must be accessible and verifiable through text-based interfaces.

**Article III: Test-First Imperative.** The most transformative article — no code before tests. This is NON-NEGOTIABLE: All implementation MUST follow strict Test-Driven Development. No implementation code shall be written before: 1. Unit tests are written, 2. Tests are validated and approved by the user, 3. Tests are confirmed to FAIL (Red phase). This completely inverts traditional AI code generation.

**Articles IV, V & VI: Project-Defined Governance.** Intentionally defined by each project's constitution rather than prescribed by Spec Kit. The constitution template provides placeholder slots and example concerns such as integration testing, observability, versioning, and breaking changes, but teams replace those placeholders with the principles that match their system and organization.

**Articles VII & VIII: Simplicity and Anti-Abstraction.** These paired articles combat over-engineering: Maximum 3 projects for initial implementation, use framework features directly rather than wrapping them. When an LLM might naturally create elaborate abstractions, these articles force it to justify every layer of complexity.

**Article IX: Integration-First Testing.** Prioritizes real-world testing over isolated unit tests: Prefer real databases over mocks, use actual service instances over stubs, contract tests mandatory before implementation.

### Constitutional Enforcement Through Templates

The implementation plan template operationalizes these articles through concrete checkpoints (Phase -1: Pre-Implementation Gates). These gates act as compile-time checks for architectural principles. The LLM cannot proceed without either passing the gates or documenting justified exceptions.

### The Power of Immutable Principles

The constitution's power lies in its immutability. While implementation details can evolve, the core principles remain constant. This provides:
1. Consistency Across Time: Code generated today follows the same principles as code generated next year
2. Consistency Across LLMs: Different AI models produce architecturally compatible code
3. Architectural Integrity: Every feature reinforces rather than undermines the system design
4. Quality Guarantees: Test-first, library-first, and simplicity principles ensure maintainable code

### Beyond Rules: A Development Philosophy

The constitution isn't just a rulebook — it's a philosophy:
- Observability Over Opacity: Everything must be inspectable through CLI interfaces
- Simplicity Over Cleverness: Start simple, add complexity only when proven necessary
- Integration Over Isolation: Test in real environments, not artificial ones
- Modularity Over Monoliths: Every feature is a library with clear boundaries

By embedding these principles into the specification and planning process, SDD ensures that generated code isn't just functional — it's maintainable, testable, and architecturally sound. The constitution transforms AI from a code generator into an architectural partner that respects and reinforces system design principles.

## The Transformation

This isn't about replacing developers or automating creativity. It's about amplifying human capability by automating mechanical translation. It's about creating a tight feedback loop where specifications, research, and code evolve together, each iteration bringing deeper understanding and better alignment between intent and implementation.

Software development needs better tools for maintaining alignment between intent and implementation. SDD provides the methodology for achieving this alignment through executable specifications that generate code rather than merely guiding it.
