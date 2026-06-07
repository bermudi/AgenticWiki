---
title: Spec-Driven Development
created: 2026-06-07
updated: 2026-06-08
sources:
  - raw/yt-spec-driven-development-ai-assisted-coding-explained.md
  - raw/yt-cian-clarke-vibe-coding-to-spec-driven-dev.md
  - raw/yt-al-harris-amazon-kiro-faang-spec-driven.md
  - raw/yt-spec-driven-dev-hype-or-future.md
unaudited_marginal: 1
tags: [concept, ai-engineering, workflow, spec, design]
---

# Spec-Driven Development

> Spec-Driven Development (SDD) treats a structured specification document as the primary artifact that drives downstream AI-assisted implementation. The spec replaces the prompt as the unit of work: it captures behavior, constraints, and acceptance criteria in natural language, and the agent generates code to match. Practitioners position SDD as the discipline that compresses the SDLC into a tight inner loop while restoring the quality bar that pure vibe coding loses.

## Overview

SDD emerged in 2025 as the explicit alternative to vibe coding for anything beyond throwaway prototypes. The basic shape:

1. **Spec first.** Write a high-level specification describing what the feature does, its constraints, edge cases, and acceptance criteria.
2. **AI asks clarifying questions.** The agent surfaces ambiguity before generating code.
3. **Plan generation.** The AI decomposes the spec into a task list. The human approves the plan.
4. **Implementation against the spec.** The AI implements each task; each implementation is verified against the spec, not just against "looks right."
5. **Tests from acceptance criteria.** Test cases are generated from the spec's acceptance criteria, locking the contract.

`raw/yt-spec-driven-development-ai-assisted-coding-explained.md` frames this as TDD and BDD "on steroids" — the spec drives both tests and code, replacing the prompt as the executable interface between intent and implementation. The user's job shifts from writing code to writing specs; the agent's job shifts from "guess what the user wants" to "execute against what the user specified."

## What the Spec Actually Is

Sources disagree on what counts as a spec. The live taxonomy across 2025-2026:

- **PRD + Architecture doc + task backlog** (Cian Clarke, Near Form): the spec is a stack of three documents — requirements, design, decomposed work. The "work log" each agent writes back to its own task spec creates a chain of context that the next task consumes.
- **Project constitution** (GitHub Spec Kit, Clarke's "synonymous with CLAUDE.md or .cursorrules"): golden rules the agent must not break. The annoying bit, per Clarke, is that "it's called a different thing in every single IDE."
- **EARS-formatted requirements** (Al Harris, Amazon Kiro): structured natural language with the syntax `When <trigger>, the <system> shall <response>` — Easy Approach to Requirements Syntax. EARS lets the system parse requirements deterministically (no LLM in the loop) for downstream translation to property-based tests and conflict detection.
- **Spec as living documentation** (Harris's longer-term vision): not a one-shot artifact but a bidirectional-sync state. Change the requirements and the design doc mutates; change the design and the requirements get re-derived.

The key divergence is **how structured the spec is**. Clarke's stack is human-readable markdown with a one-way flow (spec → tasks → code). Harris's stack is machine-parseable structured natural language with bidirectional sync and neurosymbolic reasoning (EARS for the LLM, automated reasoning tools for the determinism layer). The choice is not just stylistic — it changes what the system can verify without round-tripping through the model.

## What SDD Is For

Practitioners converge on a clear set of use cases where SDD pays off:

- **Greenfield MVPs** (Clarke: "definitely found spec driven as a methodology fantastic for MVP, true minimum viable product not prototypes").
- **Modernization projects** — node 10 → node 22, framework upgrades. "The type of work that's, you know, sort of toil for a developer" (Clarke).
- **Cross-service migrations** where intent must be captured before regeneration.
- **Compliance-heavy work** demanding an auditable paper trail.
- **Long agent sessions** where the model might forget what it's building.
- **Features where ambiguity will cost days of debugging.**
- **Challenging business cases** (Clarke): projects where the business is unwilling to commit to 5-6 months of build time but will commit if the timeline can be cut in half or quartered.

## What SDD Is Not For

The negative space is also clear, from Clarke's practitioner report:

- **Brownfield projects at scale.** "I've struggled to date with large brownfield projects... some of the tooling we use has a workflow for ingesting and building specs that would allow models to do great things on brownfield projects, but to date, like early early experiments, not the best."
- **Proprietary or legacy languages** the model isn't fluent in.
- **Simple prototypes.** "If you just want a front-end prototype, the specd driven workflow is actually quite a heavyweight thing for building that really simple prototype. Probably better off to use, you know, some sort of vibe coding tool."

The brownfield finding is a sharp contrast to vendor pitches. Harris (Kiro) explicitly says the spec agent will start by reading the working tree and can be augmented with MCP-based code search, but the practical limit is the codebase's separation of concerns: "if your system already had good separation of concerns, your components in your system are highly cohesive, and they're sort of highly coherent and highly cohesive, it's going to have a great job... versus if you took a lot of tech debt along the way that you need to unwind... your agent might actually have a much harder time traversing the codebase in the same way that a dev would."

## The Three Dominant Tooling Stacks

As of late 2025 / early 2026:

- **GitHub Spec Kit** — open source, ~92,000 stars on GitHub, works with any AI coding agent. The "constitution" model. Friction: low. Tooling agnostic.
- **Amazon Kiro** — full agentic IDE with spec-driven development baked into the interface. First IDE to codify SDD primitives. Adds EARS, property-based testing, MCP integration, and steering docs. Harris: "Probably the first ID in my eyes to really codify a lot of the techniques of spec driven driven development into an interface."
- **BMAD Method** — open source, installs into Claude Code or Cursor. Heavy on specialized role definition (technical director, QA tester, backend engineer) and detailed workflow. Clarke: "if you've got a couple of days to devote and you really want to go deep on this stuff and see what maybe a little preview of the future might look like, the BMAD method... is a fantastic place to start."

The 2025-2026 trajectory is convergence: Kiro shipping in mid-2025, Google Antigravity shipping spec-driven features "two days ago" as of Clarke's November 2025 talk, and BMAD in the open source ecosystem. "The best approximation of what specri development is going to look like in the future right now is living in the open source" (Clarke).

## Spec Drift and Maintenance

A live problem the community has not solved. Clarke's stack treats specs as living artifacts: requirements can be amended over time, the agent should detect existing relevant specs and mutate them rather than creating new ones, and work logs preserve context across tasks. Harris (Kiro) emphasizes bidirectional sync: "if I come back and, let's say, change the requirements down the road, we will mutate a previous spec. So I'm looking at really just a diff of requirements." But the open-source SDD tools (Spec Kit, BMAD) are mostly "spec first, vague about spec maintenance" (Boeckler, paraphrased in `raw/yt-spec-driven-dev-hype-or-future.md`).

## Determinism Problem

Writing natural language for a probabilistic system is structurally unsound. The same spec fed to the same model twice can produce different code. Property-based testing and EARS-format requirements are the attempt to make parts of the pipeline deterministic without the LLM in the loop — but the synthesis from spec to code remains stochastic. Harris is explicit: "the agent is not just an LLM with a workflow on top of it. The backend may or may not be an LLM, or it may or may not be other neurosymbolic reasoning tools under the hood."

## Relationship to Existing Positions on the Intent-to-Code Axis

SDD is the realization of the "plan-as-contract" position on the [[intent-to-code]] thread, with the artifact made explicit and the workflow formalized. The Cian Clarke / Near Form stack is a cleaner fit for position 2 (plan-as-contract) than the [[matt-pocock|Matt Pocock]] alignment-first approach, which does not invest in document precision. Harris's Kiro stack adds a machine-parseable requirements layer (EARS) and a property-based testing layer that positions it between plan-as-contract and specs-to-code compilation: the spec is the source of truth *and* it is the basis for invariant tests, but the code is not regenerated from spec on every change.

## Empirical Data (as of late 2025 / early 2026)

Two practitioners report time-savings ratios that are striking but anecdotal:

- Clarke: SDD "removes that ceiling of what you can accomplish with AI models. It does take a lot longer, like a lot lot longer, but the results are unquestionably orders of magnitude better."
- Harris (Kiro): on the lift from property-based testing alone, "I think part of that's in our blogs... we talk really crisply about some of the lift things like property based testing give to task accuracy."

A head-to-head benchmark from [[colin-eberhardt|Colin Eberhardt]] (Scott Logic) and a skeptic's case from [[birgitta-boeckler|Birgitta Boeckler]] are covered in detail in `raw/yt-spec-driven-dev-hype-or-future.md` and on the author pages.

## Thread

- [[intent-to-code]] — SDD is the most explicit realization of the plan-as-contract position; the Cian Clarke / Kiro stacks are practitioner reports of what that position looks like in production
- [[the-agent-workflow]] — SDD is a workflow discipline: spec → clarify → plan → implement → verify, with planning the highest-leverage stage
- [[the-slop-problem]] — SDD is positioned as the discipline that prevents vibe-coding slop from accumulating
- [[tool-design-for-agents]] — Spec-driven IDEs (Kiro, BMAD) are tooling shaped for the agent as primary consumer

## Related

- [[context-files]] — The "project constitution" pattern (Spec Kit) is functionally equivalent to AGENTS.md / CLAUDE.md / .cursorrules; Kiro's "steering" is its branded version
- [[kiro]] — Amazon's agentic IDE that codifies SDD with EARS, property-based testing, and steering
- [[ears-notation]] — The structured natural language format Kiro uses for requirements, designed for downstream automated reasoning
- [[property-based-testing-as-spec]] — Kiro's approach to translating EARS requirements into invariants
- [[steering-docs]] — Kiro's branded equivalent of context files, treated as accumulated learnings
- [[single-player-to-multiplayer]] — Cian Clarke's framing of where SDD tooling needs to go: from individual to multi-contributor parallel work
- [[intent-to-code]] — Plan-as-contract position, of which SDD is the most explicit practitioner instantiation
- [[vibe-coding]] — The position SDD is positioned against
- [[plan-vs-review]] — The underlying tradeoff: 5 minutes of planning saves 30 minutes of review
- [[cian-clarke]] — Near Form engineer; primary practitioner report on SDD workflow at team scale
- [[al-harris]] — Amazon Kiro principal engineer; primary technical source on EARS, property-based testing, and the Kiro SDD pipeline
- [[birgitta-boeckler]] — ThoughtWorks writer on SDD methodology; identified the spec drift problem and the "sledgehammer to crack a nut" critique
- [[colin-eberhardt]] — Scott Logic CTO; ran the head-to-head Spec Kit vs iterative benchmark that is the strongest empirical counter-evidence to SDD productivity claims

## Sources

- `raw/yt-spec-driven-development-ai-assisted-coding-explained.md` — IBM Technology's introductory explainer; defines SDD as the SDLC components added to AI coding; positions it as TDD/BDD "on steroids" (marginal ingest)
- `raw/yt-cian-clarke-vibe-coding-to-spec-driven-dev.md` — Cian Clarke, DevCon Fall 2025: practitioner report on SDD at Near Form; PRD + architecture + task backlog stack; single-player-to-multiplayer transition; empirical fit (greenfield MVP, modernization) and miss (brownfield, legacy langs, prototypes); BMAD and Kiro recommendations
- `raw/yt-al-harris-amazon-kiro-faang-spec-driven.md` — Al Harris, Amazon Kiro: EARS structured natural language for requirements; spec as artifacts + workflow + tools for reproducibility; property-based testing from EARS; steering docs as accumulated learnings; 200/400/800-grit sharpening model; bidirectional spec sync; neurosymbolic hybrid (LLM + automated reasoning); brownfield separation-of-concerns finding
- `raw/yt-spec-driven-dev-hype-or-future.md` — Devsplainers: [[colin-eberhardt|Colin Eberhardt]] head-to-head benchmark of Spec Kit vs iterative development (10x faster without SDD on the test problem); [[birgitta-boeckler|Birgitta Boeckler]] on spec drift ("spec first, vague about spec maintenance") and the sledgehammer-to-crack-a-nut critique
