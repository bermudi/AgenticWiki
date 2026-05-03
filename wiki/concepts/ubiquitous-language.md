---
title: Ubiquitous Language
created: 2026-04-25
updated: 2026-05-03
sources:
  - raw/yt-claude-code-feature-build.md
  - raw/How To De-Slop A Codebase Ruined By AI (with one skill) - youtube.com.md
  - raw/yt-slop-watch-ideation.md
  - "raw/Software Fundamentals Matter More Than Ever — Matt Pocock - youtube.com.md"
tags: [concept, ddd, ai-native, design]
---

# Ubiquitous Language

> A shared, common language used by both humans and AI agents to ensure a common understanding of the domain model and system behavior. When applied to greenfield projects, the process of defining the language IS the process of designing the system — every term discovered is a table, a module boundary, or a deployable unit.

## Context

Originally a core tenet of Domain-Driven Design (DDD), Ubiquitous Language takes on new importance in the age of AI. In an AI-native workflow, it serves as the "source of truth" for terminology that bridges the gap between the human's mental model and the agent's code generation.

## In AI-Native Engineering

- **Glossary as Context**: Maintaining a `UBIQUITOUS_LANGUAGE.md` file in the codebase allows the agent to ground its reasoning in specific, pre-defined terms (e.g., "Ghost Course" vs. "Real Course").
- **Reducing Ambiguity**: By forcing a shared vocabulary, the developer prevents the agent from introducing conflicting concepts or "slop" that doesn't align with the project's architecture.
- **Shared Design Concept**: It is the textual representation of the [[shared-design-concept]].
- **Precision Protocol**: [[matt-pocock|Matt Pocock]] emphasizes that a shared glossary is the protocol for precision between human and AI — it's how you ensure the agent uses the same language you do, avoiding the drift that produces [[the-slop-problem|slop]].

## Practical Example: Greenfield DDD — Slop Watch

[[matt-pocock|Matt Pocock]]'s Slop Watch stream provides the most detailed real-time demonstration of DDD-driven ubiquitous language definition for a **greenfield project** — starting from vague brainstorming and ending with a precise glossary that maps directly to the data model and architecture.

### The Process

1. **Vague idea**: "An observability platform for coding agents" — 4 words that could mean anything.
2. **Grill Me session**: Claude asks increasingly precise questions about the concept, surfacing forks the human hadn't considered (Who's the user? Individual or team? Self-hosted or SaaS?).
3. **Research via sub-agents**: Parallel Claude sessions investigate each coding agent's observability surface. Results are compacted into a research document.
4. **Domain modeling session**: A "domain model" skill (a Grill Me variant) focuses specifically on defining terms. Each term gets precisely defined, then road-tested with concrete scenarios.
5. **Glossary locked in `context.md`**: The agreed terms become the project's ubiquitous language file. Matt reviews and edits this — it's the one artifact he doesn't trust the AI to own.

### Terms Emerged

| Term | Definition | Data Model Impact |
|------|-----------|-------------------|
| **Session** | One logical run of one coding agent attached to one developer, one CWD, one agent version | Parent entity in the data model |
| **Turn** | One user message plus the full assistant response | Child of session; forms a DAG |
| **Model Request** | One HTTP call to the model provider during a turn | Atomic cost unit |
| **Listener** | The per-session capture process on the developer's machine | A deployable unit (subprocess) |
| **Server** | The self-hosted backend storing and displaying session data | Another deployable unit |
| **Coding Agent** | The tool being observed (Claude Code, Pi, etc.) | A configuration entity |

### Edge Cases Forced by Language Precision

The act of defining terms revealed hard edge cases that a vague spec would have missed until implementation:

- **Forks / Branching**: When an agent rewinds, is it still the same session? The DAG model (parent_turn_id) emerged from trying to describe Pi's branching behavior precisely. "If session is fuzzy, the whole data model is fuzzy."
- **Sub-agents**: Delegated tasks — are they turns within the parent session or separate entities? They became **child sessions** with parent_session_id, not turns. This was a design decision forced by language precision.
- **Resumes**: A compacted-and-restored session — same session or new one? Left open. "I feel like I'm going to need to see a basic version of this working first before I can make any reasonable calls."
- **Concurrent sessions**: Two agents running at once — two listeners, two separate sessions. The language made this clean.

### Road-Testing Via Scenarios

Matt and Claude road-tested the language with concrete scenarios (DDD's equivalent of Event Storming):
- **Scenario A (The Explorer)**: Alice refactors, branches to try middleware, doesn't like it, branches back, ships in-place. Is this three sessions or one session with a DAG?
- **Scenario B (The Reroll)**: Bob rewinds two turns to rephrase a prompt. Pi treats this as a branch.
- **Scenario C (The Spectator)**: Carol (DRI) is watching Dave's session live. Dave branches. What does Carol's tab show?

Each scenario revealed language gaps. The fork question was particularly contentious — the DAG model resolved it, but only by acknowledging it's not how most agents behave ("most agents produce a degenerate DAG, a straight line").

### The Calcification Moment

A notable phenomenon during the stream: when Claude started using the term "sidecar" consistently to describe the capture process, Matt noticed and paused to capture it. "One thing to notice when you start doing grilling sessions is when language starts to calcify. When you start seeing different terms be used here. So the sidecar is now our terminology." This is the real-time emergence of shared language. (The term later evolved: [[slop-watch|Slop Watch]] ultimately settled on **"listener"** as the umbrella term, explicitly rejecting "sidecar" after further refinement.)

### Language Before Code

Matt's rule: the ub-lang glossary is reviewed and locked **before** the PRD is written. The PRD uses the established vocabulary, so the implementing agent encounters the same terms. After the PRD, the ub-lang guides `context.md` for the implementation sessions. Matt also explicitly does **not** review the research documents (he trusts the AI), but he **does** review and edit the ub-lang file — it's the one artifact he owns personally.

### Practical Example: The Materialization Cascade

[[matt-pocock|Matt Pocock]] demonstrates the power of ubiquitous language during a feature build for his course-video-manager. The grill-me session produces a new term — **"materialization cascade"** — describing the chain reaction when materializing a lesson inside a ghost course: assign file path to course → materialize section → materialize lesson.

The value compounds immediately:
1. **During grilling**: Precise language enables cleaner questions. "Should direct create work inside ghost courses?" is unambiguous when "ghost course" and "materialize" are defined.
2. **During PRD writing**: The PRD uses the established vocabulary, so the implementing agent encounters the same terms.
3. **During implementation**: A bug report saying "there's a bug in the materialization cascade" is immediately precise — no ambiguity about what subsystem failed.
4. **During debugging**: The glossary includes aliases to avoid (e.g., "create on disk" and "realize" are listed as informal synonyms), preventing the agent from inventing competing terminology.

Matt updates the ubiquitous language document after each grill-me session, adding new terms before proceeding to the PRD. This ensures the vocabulary is fresh and agreed-upon before any implementation begins.

[[matt-pocock|Pocock]] also reports a practical benefit: by reading the AI's thinking traces, a shared ubiquitous language makes the AI think in a less verbose way and produces implementation more aligned with the plan. The terminology acts as a compression mechanism — dense, agreed-upon terms replace lengthy explanations in the agent's reasoning.

## Thread

- [[the-human-lever]] — Defining the language is a high-leverage human task.
- [[the-agent-workflow]] — Using the language to guide the agent through complex implementations.

## Related

- [[shared-design-concept]] — The internal mental model that the language describes.
- [[ai-design-loop]] — The process of refining the language through interaction.
- [[the-human-lever]] — Defining the language is a high-leverage human task.
- [[grey-box-engineering]] — The language defines the boundaries of the grey box.
- [[matt-pocock]] — Primary advocate of ubiquitous language in AI workflows.
- [[improve-codebase-architecture]] — The skill's grilling phase establishes the vocabulary for the implementing agent.
- [[slop-watch]] — Greenfield DDD project where ubiquitous language was defined from scratch via domain modeling.
- [[context-engineering]] — Context compaction via research documents preserves context; ub-lang file is the human-trusted artifact.

## Sources

- `raw/yt-claude-code-feature-build.md` — Matt Pocock's use of a Ubiquitous Language document to guide a feature build.
- `raw/How To De-Slop A Codebase Ruined By AI (with one skill) - youtube.com.md` — Glossary as the protocol for precision between human and AI.
- `raw/yt-slop-watch-ideation.md` — Greenfield DDD: domain modeling from scratch, terms emerged and road-tested via scenarios, ub-lang locked before PRD.
- `raw/Software Fundamentals Matter More Than Ever — Matt Pocock - youtube.com.md` — Ubiquitous language as a compression mechanism for AI reasoning; shared terms reduce verbosity and align implementation with planning.
