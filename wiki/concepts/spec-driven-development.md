---
title: Spec-Driven Development
created: 2026-06-07
updated: 2026-07-10
sources:
  - raw/yt-spec-driven-development-ai-assisted-coding-explained.md
  - raw/yt-cian-clarke-vibe-coding-to-spec-driven-dev.md
  - raw/yt-al-harris-amazon-kiro-faang-spec-driven.md
  - raw/yt-spec-driven-dev-hype-or-future.md
  - raw/yt-learnings-from-a-no-code-library-keeping-the-spec-driven-development-triangle-in-sync.md
  - raw/spec-kit-github-sdd-toolkit.md
  - raw/gsd-core-opengsd-spec-driven-framework.md
unaudited_marginal: 0
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

## The Power Inversion

[[spec-kit|Spec Kit]]'s primary-source methodology document (`raw/spec-kit-github-sdd-toolkit.md`) articulates the core SDD thesis as a power inversion: for decades, code has been king and specifications were scaffolding. SDD inverts this — specifications don't serve code, code serves specifications. The PRD isn't a guide for implementation; it's the source that generates implementation. Technical plans aren't documents that inform coding; they're precise definitions that produce code.

In this framing, maintaining software means evolving specifications. Debugging means fixing specifications that generate incorrect code. The entire development workflow reorganizes around specifications as the central source of truth, with implementation plans and code as the continuously regenerated output. The process is 0 → 1, (1', ..), 2, 3, N — each new feature or parallel implementation revisits the specification.

This is the strongest statement of the spec-first position in the wiki. It goes beyond Clarke's "spec as PRD stack" and Harris's "spec as EARS + PBT" by making the spec the *generative source* of code, not just a guide for it. The [[spec-code-triangle]] feedback loop (Breunig) and the [[code-clarifies-spec]] principle are the counterweight: the act of implementation generates decisions that feed back into the spec.

## The Dominant Tooling Stacks

As of mid-2026:

- **GitHub [[spec-kit|Spec Kit]]** — open source, works with 30+ AI coding agents. The "constitution" model with nine immutable articles (library-first, CLI mandate, test-first, simplicity, anti-abstraction, integration-first testing). Adds [[template-driven-quality|template-driven quality]] — seven mechanisms by which templates constrain LLM output. Extensions/presets/bundles customization system. Friction: low. Tooling agnostic.
- **Amazon [[kiro|Kiro]]** — full agentic IDE with spec-driven development baked into the interface. First IDE to codify SDD primitives. Adds EARS, property-based testing, MCP integration, and steering docs. Harris: "Probably the first ID in my eyes to really codify a lot of the techniques of spec driven driven development into an interface."
- **BMAD Method** — open source, installs into Claude Code or Cursor. Heavy on specialized role definition (technical director, QA tester, backend engineer) and detailed workflow. Clarke: "if you've got a couple of days to devote and you really want to go deep on this stuff and see what maybe a little preview of the future might look like, the BMAD method... is a fantastic place to start."
- **[[gstack]]** — Garry Tan's open-source software factory. 23 specialist slash-command skills chaining Think → Plan → Build → Review → Test → Ship → Reflect. Sprint-workflow enforcement layer with cross-model review and real-browser QA. Designed for 10-15 parallel sprints.
- **[[gsd-core|GSD Core]]** — Open GSD's spec-driven workflow engine. Five-step phase loop (Discuss → Plan → Execute → Verify → Ship) with [[fresh-context-subagents|fresh-context subagents]] and a `.planning/` directory of persistent artifacts. 65+ slash commands, least-privilege agent permissions, context monitor hook. Solves context rot, session amnesia, and verification gaps.

The 2025-2026 trajectory is convergence: Kiro shipping in mid-2025, Google Antigravity shipping spec-driven features "two days ago" as of Clarke's November 2025 talk, and BMAD in the open source ecosystem. "The best approximation of what specri development is going to look like in the future right now is living in the open source" (Clarke).

## Spec Drift and Maintenance

A live problem the community has not solved. Clarke's stack treats specs as living artifacts: requirements can be amended over time, the agent should detect existing relevant specs and mutate them rather than creating new ones, and work logs preserve context across tasks. Harris (Kiro) emphasizes bidirectional sync: "if I come back and, let's say, change the requirements down the road, we will mutate a previous spec. So I'm looking at really just a diff of requirements." But the open-source SDD tools (Spec Kit, BMAD) are mostly "spec first, vague about spec maintenance" (Boeckler, paraphrased in `raw/yt-spec-driven-dev-hype-or-future.md`).

[[drew-breunig|Drew Breunig]]'s [[spec-code-triangle]] reframes the entire SDD model as a feedback loop rather than a one-way equation. The original SDD framing was `Spec + Tests + Agent → Code` — Breunig walked this back: "I got this wrong. This isn't a one-way equation. This is a feedback loop." The act of writing code improves the spec and the tests ([[code-clarifies-spec]]). This is the same feedback loop Harris identifies with bidirectional spec sync, but Breunig grounds it in the observation that even with comprehensive test suites (750+ tests for [[onewords]]), implementation generates decisions the spec didn't anticipate. [[decision-extraction]] — Breunig's mechanism for capturing these decisions at commit time via [[plum-dev]] — is one way to operationalize the feedback loop.

> [!note] Departure:
> The linear SDD framing (spec → code) and the triangle framing (spec ↔ code ↔ tests) coexist in the wiki. Clarke and Harris's stacks treat the spec as the primary artifact with bidirectional sync as an enhancement. Breunig treats the feedback loop as the fundamental insight — "no-code libraries are toys because they are unproven." The wiki currently holds both positions; the tension is whether SDD is fundamentally spec-first (with feedback as correction) or loop-first (with the spec as a starting point that must evolve).

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
- [[template-driven-quality]] — How Spec Kit's templates constrain LLM output through seven mechanisms
- [[kiro]] — Amazon's agentic IDE that codifies SDD with EARS, property-based testing, and steering
- [[ears-notation]] — The structured natural language format Kiro uses for requirements, designed for downstream automated reasoning
- [[property-based-testing-as-spec]] — Kiro's approach to translating EARS requirements into invariants
- [[steering-docs]] — Kiro's branded equivalent of context files, treated as accumulated learnings
- [[gstack]] — Sprint-workflow enforcement layer; complementary to SDD's spec-generation focus
- [[gsd-core]] — Fresh-context subagent SDD framework with persistent `.planning/` artifacts
- [[fresh-context-subagents]] — GSD Core's architectural solution to context rot in long SDD pipelines
- [[single-player-to-multiplayer]] — Cian Clarke's framing of where SDD tooling needs to go: from individual to multi-contributor parallel work
- [[intent-to-code]] — Plan-as-contract position, of which SDD is the most explicit practitioner instantiation
- [[vibe-coding]] — The position SDD is positioned against
- [[plan-vs-review]] — The underlying tradeoff: 5 minutes of planning saves 30 minutes of review
- [[cian-clarke]] — Near Form engineer; primary practitioner report on SDD workflow at team scale
- [[al-harris]] — Amazon Kiro principal engineer; primary technical source on EARS, property-based testing, and the Kiro SDD pipeline
- [[drew-breunig]] — Creator of onewords and plum-dev; coined the spec-code triangle that reframes SDD as a feedback loop
- [[birgitta-boeckler]] — ThoughtWorks writer on SDD methodology; identified the spec drift problem and the "sledgehammer to crack a nut" critique
- [[colin-eberhardt]] — Scott Logic CTO; ran the head-to-head Spec Kit vs iterative benchmark that is the strongest empirical counter-evidence to SDD productivity claims

## Sources

- `raw/yt-spec-driven-development-ai-assisted-coding-explained.md` — IBM Technology's introductory explainer; defines SDD as the SDLC components added to AI coding; positions it as TDD/BDD "on steroids" (marginal ingest)
- `raw/yt-cian-clarke-vibe-coding-to-spec-driven-dev.md` — Cian Clarke, DevCon Fall 2025: practitioner report on SDD at Near Form; PRD + architecture + task backlog stack; single-player-to-multiplayer transition; empirical fit (greenfield MVP, modernization) and miss (brownfield, legacy langs, prototypes); BMAD and Kiro recommendations
- `raw/yt-al-harris-amazon-kiro-faang-spec-driven.md` — Al Harris, Amazon Kiro: EARS structured natural language for requirements; spec as artifacts + workflow + tools for reproducibility; property-based testing from EARS; steering docs as accumulated learnings; 200/400/800-grit sharpening model; bidirectional spec sync; neurosymbolic hybrid (LLM + automated reasoning); brownfield separation-of-concerns finding
- `raw/yt-spec-driven-dev-hype-or-future.md` — Devsplainers: [[colin-eberhardt|Colin Eberhardt]] head-to-head benchmark of Spec Kit vs iterative development (10x faster without SDD on the test problem); [[birgitta-boeckler|Birgitta Boeckler]] on spec drift ("spec first, vague about spec maintenance") and the sledgehammer-to-crack-a-nut critique
- `raw/yt-learnings-from-a-no-code-library-keeping-the-spec-driven-development-triangle-in-sync.md` — [[drew-breunig|Drew Breunig]] (Computer History Museum): the spec-code triangle critique of linear SDD; onewords postmortem (no-code library limits); decision extraction via plum-dev; software history framing (Hamilton, NATO crisis, waterfall/agile oscillation); "no-code libraries are toys because they are unproven"
- `raw/spec-kit-github-sdd-toolkit.md` — Primary source for Spec Kit: Power Inversion thesis, nine constitutional articles, template-driven quality (7 constraint mechanisms), extensions/presets/bundles, 30+ agent integrations
- `raw/gsd-core-opengsd-spec-driven-framework.md` — GSD Core: five-step phase loop, spec-driven pipeline with requirement-to-verification traceability, fresh-context subagents, `.planning/` artifact directory
