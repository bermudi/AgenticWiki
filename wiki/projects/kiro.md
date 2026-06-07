---
title: Kiro
created: 2026-06-07
updated: 2026-06-07
sources:
  - raw/yt-al-harris-amazon-kiro-faang-spec-driven.md
  - raw/yt-cian-clarke-vibe-coding-to-spec-driven-dev.md
unaudited_marginal: 0
tags: [project, ide, amazon, spec-driven-development, agentic-ide]
---

# Kiro

> Amazon's agentic IDE, launched public preview July 14, 2025 and generally available November 17, 2025. First IDE to codify spec-driven development primitives into the interface: structured natural language requirements in EARS format, a requirements → design → tasks workflow, property-based testing as the verification layer, MCP integration for tool-surface expansion, and steering docs as accumulated learnings. Positioned by Cian Clarke ([[cian-clarke]], DevCon Fall 2025) as "the first ID to codify a lot of the techniques of spec driven development into an interface" — a claim about the tool's place in the ecosystem, not Amazon's own marketing.

## Overview

Kiro is built on a code-OSS fork, the same base as Cursor and Windsurf. The team is small (3-4 people at launch, per [[al-harris|Al Harris]]) and was "theoretically funded out of the org that supported things like QDV but [is] purposefully a very different product suite from the QE system." The product is sold to all customers regardless of cloud provider — Harris is explicit that "we are sort of purposefully we're in we are brought to you by AWS, which so you know, uh, Andy Jasse and Jeffy B pay my check, but um, we're not like an AWS product that's deeply deeply integrated with the rest of the AWS ecosystem."

## Architecture (Spec-Driven Development Pipeline)

The Kiro SDD pipeline has three phases:

1. **Requirements** — generated from a prompt, with acceptance criteria in EARS format. EARS lets the system parse requirements deterministically (no LLM in the loop) for downstream translation to property-based tests.
2. **Design** — generated from the approved requirements, can include custom artifacts like wireframe diagrams, test case definitions, or anything else the user requests. Because the artifacts are natural language, the user can ask for additions or changes at any point.
3. **Tasks** — decomposed from the design, with each task having just enough context. Each task can be run as a separate session, with the spec as the seed context.

The pipeline is structured but not rigid. Harris: "we have a template for the requirements. We have a template for this design doc because there's sections that we think are important to cover. Um and again like if you disagree and you're like I don't care about the testing strategy section just ask the do it and similarly the task list has is structured because we have sort of UI elements that are built on top of it."

## The Three Things a Spec Is

Per Harris's framework (covered in detail on [[al-harris]]):

1. **A set of artifacts** representing the system state at time t.
2. **A structured workflow** — requirements → design → execution.
3. **A set of tools and systems on top** that help deliver reproducible results. The canonical example is property-based testing; the less obvious example is requirements verification (scanning for ambiguity, conflicting constraints, using automated reasoning tools).

The third is the architectural commitment: Kiro is not "an LLM with a workflow" but "an amalgam of systems based on what type of task you're executing at any point in time."

## Property-Based Testing from EARS

The shipping GA feature (November 17, 2025): EARS requirements are translated into correctness properties of the system. These are then used as the basis for property-based tests, similar to:

- **Hypothesis** (Python)
- **fast-check** (Node)
- **closure spec library**

The key insight: "if the properties of the code meet the initial requirements, we have a high degree of confidence that you have re uh reliably shipped the the software you expected to ship." This is reproducibility from spec through to verified code, with the LLM used in the generation step but not the verification step.

## Steering Docs

Kiro's branded equivalent of context files. Three demonstrated use cases:

- **Commit style preferences** (e.g., co-author by "Kiro agent" for traceability)
- **Code style / coverage minimums** (e.g., "annotate new modules with coverage minimums of 90%")
- **Operational learnings** (write what the agent learns into steering)

Steering is treated as *accumulated learnings*, not static configuration. Harris describes steering as "sort of memory" available to the agent across sessions (the exact loading mechanism — system prompt vs. per-turn injection — is not specified in the source).

See [[steering-docs]] for the dedicated concept page.

## MCP Integration

Kiro integrates with MCP servers at every phase of the SDD workflow — requirements generation, design, and implementation. Demonstrated integrations:

- **Asana** — pull open task metadata to seed a spec
- **GitHub** — use for code search, PR review, etc.
- **Fetch** — pull examples from similar products
- **AWS documentation** — ground the agent in AWS service specifics (added by users, not bundled)
- **Brave / Tavily** — web search

MCP is the tool-surface expansion mechanism. Harris is explicit: "I don't want to ship this to customers who don't need it" — so AWS-specific tools are added per-customer rather than bundled.

A caching note: "changing MCP and changing tools in general is a caching operation. So if you're very deep into a long session, maybe don't tweak your MCP config because it will slow you down dramatically."

## Specs Are Per-Feature, Not Per-Project

Harris's mental model: "the spec sort of represents a feature or a problem area in the in the project." Examples from the Kiro extension:

- "Could we have a prompt registry? Could we have a prompt registry file loader?" — specs that "may or may not make it all the way to production"
- "I want telemetry on the chat UI" — a living spec
- "AGENTS.md support" — a spec the team is unlikely to revisit; will be deleted
- "Message history sanitizer" — a spec that has been amended over time as new validation rules are uncovered

The cross-functional case (one change updating multiple specs) is an open problem. Harris's example: changing the API public interface for PII redaction in logging affects security, API design, and logging specs. Today the operator makes the call about which spec to update.

## Brown's Note on Brownfield

Harris's constraint: "if your system already had good separation of concerns... it's going to have a great job. Um if you took a lot of tech debt along the way that you need to unwind... your agent might actually have a much harder time traversing the codebase in the same way that a dev would." The Kiro team validated this by building features via spec in the code-OSS codebase (which is "reasonably well um structured") even though the team "did not understand [it] particularly well because we're just not VS code devs."

## Limitations and Tradeoffs

- **Session length management** — no incremental pruning; context accretes until cap. Summarization is the workaround but breaks the prompt cache, losing the 90-95% cache hit rate that makes Kiro fast.
- **Sub-agents** — not yet in Kiro Desktop (in development as of November 2025). Custom agents exist in the Kiro CLI.
- **Brownfield at scale** — works well on well-structured codebases, struggles on tech-debt-heavy ones.
- **Cross-functional specs** — the operator currently decides which spec to update; no automated cross-spec mutation.

## Positioning vs. Competitors

As of late 2025 / early 2026:

- **GitHub Spec Kit** — open source, tool-agnostic, ~92,000 stars. "Constitution" model.
- **BMAD Method** — open source, installs into Claude Code or Cursor. Strong on specialized role definition. Clarke: "if you feel like you've got a couple of days to devote and you really want to go deep on this stuff... the BMAD method... is a fantastic place to start."
- **Kiro** — the only product that ships EARS + property-based testing as a unified SDD pipeline, and the only product that codifies SDD primitives into the IDE interface rather than as an external tool.
- **Google Antigravity** — launched "two days ago" as of Clarke's November 2025 talk; spec-driven features appearing.

## Thread

- [[intent-to-code]] — Kiro is the most explicit machine-parseable realization of the plan-as-contract position
- [[tool-design-for-agents]] — Kiro is the first IDE explicitly designed for the agent as primary consumer, not the human
- [[the-slop-problem]] — Kiro is positioned as the discipline that prevents vibe-coding slop from accumulating
- [[the-agent-workflow]] — Kiro is a workflow product; the spec pipeline is the workflow

## Related

- [[al-harris]] — Principal engineer on Kiro; primary technical source
- [[spec-driven-development]] — The methodology Kiro codifies
- [[ears-notation]] — The structured natural language format Kiro uses for requirements
- [[property-based-testing-as-spec]] — The verification layer that translates EARS into invariants
- [[steering-docs]] — Kiro's branded context files
- [[context-files]] — The general category
- [[mcp]] — The tool-surface mechanism Kiro uses
- [[cian-clarke]] — Practitioner source who recommends Kiro as a foundation tool
- [[bmad-method]] — Alternative SDD tooling with strong role-definition focus
- [[spec-kit]] — GitHub's open-source SDD tooling
- [[deep-vs-shallow-modules]] — Kiro's brownfield performance tracks module separation

## Sources

- `raw/yt-al-harris-amazon-kiro-faang-spec-driven.md` — AI Engineer talk. Full technical depth on Kiro's architecture: EARS, property-based testing pipeline, steering docs, MCP integration, 200/400/800-grit sharpening, brownfield separation-of-concerns finding, session length tradeoff (cache vs summarization), spec as three things (artifacts + workflow + reproducibility tools), neurosymbolic hybrid claim.
- `raw/yt-cian-clarke-vibe-coding-to-spec-driven-dev.md` — DevCon Fall 2025. Positioning vs competitors (Cian Clarke on Kiro as the IDE that codifies SDD primitives, BMAD vs Kiro recommendations, "first ID to codify a lot of the techniques of spec driven development into an interface").
