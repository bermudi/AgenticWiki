---
title: Slop Watch
created: 2026-05-02
updated: 2026-05-02
sources:
  - raw/yt-slop-watch-ideation.md
tags: [project, observability, coding-agents, self-hosted, matt-pocock]
---

# Slop Watch

> A self-hosted, on-premises observability platform for coding agents — sessions, tokens, traces, and quality metrics — designed to give teams visibility into how their developers and agents are actually spending time and tokens. Named by Eddie on Matt Pocock's live stream: "Slop Watch."

Slop Watch (also referred to as "Stopwatch" during the stream) is the project Matt Pocock conceived and began designing live during a 1h47m brainstorming and domain-modeling session. By the end of the stream, he had: a name, a research document compiling per-agent ingestion surfaces, a `context.md` establishing ubiquitous language, and basic architectural decisions for V1.

## Architecture

The system has two deployable units:

### The Listener (per-session capture process)
Runs on each developer's machine. A per-session subprocess **spawned by a hook**, not a long-running daemon. This dissolves the "people forget to run it" problem — the hook configuration IS the install. The listener:
- Tails the agent's JSONL output on disk
- Captures events via hook payloads where available
- Normalizes into the internal event schema
- Posts events to the server
- Authenticates via a bearer token (admin-minted)

The listener takes different physical forms per agent: a sub-process spawned by a hook (Claude Code), in-process code as a TypeScript extension (Pi), or a JS plugin (Codex). The umbrella term is **listener** (after rejecting "capturer," "adapter," "sidecar," "watcher," "tap," "spy"). Matt settled on "listener" as pragmatically good enough.

### The Server (self-hosted backend)
A single-binary backend (TypeScript/Bun or potentially Rust) with:
- Postgres database storage
- Auth management (admin-minted tokens in V1, OIDC deferred)
- Dashboard for session review
- Admin plane (one per organization)
- Live spectate via polling (every ~5s, or on tab focus)

The server is the canonical "Slop Watch" deployment. It is explicitly **not** a centralized SaaS — the core philosophy is that organizations own their own data.

## Data Model

The data model emerged from a DDD-driven language definition session:

| Entity | Definition |
|--------|-----------|
| **Coding Agent** | The tool being observed (Claude Code, Codex, Pi, Copilot CLI, Open Code) |
| **Session** | One logical run of one coding agent attached to one developer, one CWD, one agent version. Contains a directed acyclic graph (DAG) of turns. |
| **Turn** | One user message plus the full assistant response. May contain multiple model requests. |
| **Model Request** | One HTTP call the agent makes to the model provider during a turn. |

### Edge cases surfaced during domain modeling

- **Forks / Branching**: When an agent rewinds and branches (common in Pi), the session becomes a DAG. The middleware branch costs real tokens and produces real artifacts that were written then rewound. The DAG model resolves this: each turn has a parent_turn_id, and most agents produce a degenerate DAG (a straight line).
- **Sub-agents**: Delegated sub-tasks are **child sessions** with a parent_session_id — not turns within the parent. This ensures their cost and decisions are separately attributable.
- **Resumes**: Left open until real data is available. Is a resumed session the same session with a resume-marker turn, or a new session with a parent_session_id? The answer depends on how compacted context behaves in the UX.
- **Concurrent sessions**: Two listeners can run simultaneously; they're cheap, independent processes.

## Key Design Decisions (V1)

- **Team org, self-hosted**: Primary user is an organization (not a solo dev). The org admin owns deployment.
- **DRI-first UX**: The primary consumer is the Directly Responsible Individual — the team member responsible for making the AI better. They need to dive into any developer's session, debug it, review sessions live or retrospectively.
- **Per-agent adapters**: Each agent has a different hook surface and JSONL schema. Per-agent adapters are unavoidable. The research phase confirmed: Claude Code has hooks (but payloads don't include message content), Pi has hooks/skills/extensions, Codex has hooks (flag-gated, no Windows), Copilot CLI has thin hooks, Open Code has a plugin system. Schemas all differ and all evolve. There is no single "use OpenTelemetry" answer.
- **Auth V1**: Admin-minted tokens. The admin opens a page, types the developer's name and email, gets a one-time token string. The dev runs `stopwatch login` and pastes it. De-provisioning works by revoking the token. Upgrade path to OIDC is clean.
- **Auth V2**: Full OIDC integration with the org's identity provider (supported by a device authorization flow for CLI login).
- **Live spectate**: Polling-based (every ~5s or on tab focus), not WebSocket streaming. Deferred complexity.
- **Storage**: Postgres, external to the application process. "The database needs to outlive changes to the application."
- **Language**: Likely TypeScript (Bun executable). Rust considered for the binary. Matt: "I've never written Rust before, I'm really intrigued by it."
- **Not a SaaS**: Centralized service explicitly ruled out. "I'm not interested in handling people's data."

## The Discovery Process

The stream provides a rare real-time view of how Matt Pocock approaches a greenfield project:

1. **Idea brainstorming**: Starting from vague constraints (useful, complex, some front-end + back-end, AI-coding-related)
2. **Chat validation**: Asking the streaming audience for project ideas
3. **Research via sub-agents**: Launching parallel Claude Code sub-agents to investigate each coding agent's observability surface (hook systems, JSONL output, OpenTelemetry support)
4. **Grill Me session**: Deep exploration of core architecture questions with Claude's "Grill Me" skill — session sharing consent, ingestion mechanism, user model, storage decisions
5. **Domain modeling**: Using a "domain model" skill (Grill Me variant) to define ubiquitous language before writing any code
6. **Context compaction**: Creating research documents to preserve context and reset before the next phase
7. **Ub-lang locking**: Reviewing and approving `context.md` glossary entries

The entire stream was ideation and domain modeling — no code was written. As Matt put it: "until you get to code, until you see your ideas reified into code, you're really just working with research."

## Naming

The name "Slop Watch" came from a viewer named Eddie during the live stream. The naming process was itself chaotic: Matt asked Claude for names (Agent Scope, Telescope, Yardstick, Quanta, etc.), then the chat chimed in with Slop Watch, which immediately crystallized the concept. The name also naturally suggests "Stopwatch" — a happy homophone that emerged during later discussion.

## Thread

- [[the-slop-problem]] — Slop Watch is the solution space: what you build when you realize unobserved agent output degrades codebases
- [[agent-quality-engineering]] — Concrete architectural contribution to the observability layer
- [[the-agent-workflow]] — Demonstrates Matt's workflow for starting a new project
- [[tool-design-for-agents]] — The per-session listener pattern and per-agent adapters are tool design for agent observability

## Related

- [[matt-pocock]] — Creator of Slop Watch; the stream reveals his development methodology in detail
- [[agent-observability]] — The conceptual foundation Slop Watch is built on
- [[slop]] — The problem Slop Watch is designed to measure and combat
- [[ubiquitous-language]] — The stream demonstrates DDD-driven language definition for a greenfield project
- [[context-engineering]] — Research compaction, session resume, and context.md demonstrate context hygiene
- [[pi]] — A complementary agent harness; Slop Watch would observe Pi sessions too
- [[claude-code]] — The primary agent Matt uses; Slop Watch's first adapter target
- [[improve-codebase-architecture]] — The third leg of Matt's quality triage (alignment + architecture awareness + automated review)

## Sources

- `raw/yt-slop-watch-ideation.md` — Full live stream transcript: idea→research→domain model→ubiquitous language→architecture decisions
