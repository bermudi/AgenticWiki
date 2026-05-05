---
title: Unblocked
created: 2026-05-04
updated: 2026-05-04
sources:
  - raw/Mergeable by default Building the context engine to save time and tokens — Peter Werry, Unblocked - youtube.com.md
tags: [project, context-engine, tool, agent-infrastructure]
---

# Unblocked

> A context engine for engineering organizations: an always-on system that ingests data from every tool engineers use (code, PRs, Slack, docs, incident reports) and surfaces the right organizational context to AI coding agents at the right time. Built by [[peter-werry|Peter Werry]].

Unblocked sits between the organization's data sources and the agent, acting as a **curated context pipeline**. It doesn't just retrieve — it understands who the user is, what team they're on, who the experts are, what decisions led to the current state, and resolves conflicts between sources before the agent sees them.

## Architecture

Unblocked surfaces through multiple interfaces:

- **MCP server** — Plugs directly into agent tool loops (Claude Code, Cursor, etc.)
- **CLI tool** — For scripted and CI integrations
- **API** — For custom application integrations
- **Dashboard** — Question-and-answer interface over the knowledge graph
- **Slack/Teams bot** — Auto-answer engineering support questions in chat
- **Code review component** — Plugs into SCM to provide organizational-context-aware PR reviews

## Core Capabilities

### Unified System Context
Builds relationships between data sources. Easy linkages (Slack conversations referencing PRs) are procedurally generated. Hard linkages (understanding *why* decisions were made, distilling organizational best practices) require deeper processing — mining historical PR comments to find repeated patterns, then storing those as organizational memories.

### Conflict Resolution
Multiple sources (docs, Slack, code) frequently conflict. Unblocked's approach evolved:
1. **Recency bias** (initial approach) — Not enough. Old information can still be authoritative.
2. **Code bias** — Main branch as source of truth. Better, but misses where the organization is *going*.
3. **Expert-weighted** — What the organization's experts are saying in Slack matters more than random chatter. When an expert says "that's not correct," it gets more weight and a memory is distilled.

Conflicts that can't be resolved are surfaced to the human — a key lesson from early development.

### Targeted Retrieval & Personalization
Uses a layered retrieval strategy: deep search over the user's primary repositories (determined by PR contribution volume), wider search over the rest of the org's code. This biases context selection toward where the user actually works.

### Data Governance & Access Control
Access controls flow up from the source systems. Private Slack channel information is only used when the person asking has access to that channel. Answers are private to the user. Synthesis across organizational boundaries is compartmentalized — graph-based approaches (like GraphRAG) that unavoidably cross permissions boundaries are avoided in favor of compartmentalized pockets.

## Social/Expert Graph

A core component is the **social graph builder** — a distillation of SCM and communication data that produces: team clusters (who reviews whose PRs), expert maps (who works on what, weighted by contribution and review impact), and coverage analysis (which code areas have good expert coverage).

The graph isn't just a visualization — it's a **retrieval pivot**. Knowing who the expert is for a code area enables "bottling" that expert's historical context: decisions they've made, PR comments they've left, Slack conversations they've been in. When a new developer works on that code, the expert's distilled learnings are loaded into context.

The graph is built procedurally (SCM contribution analysis) and then refined with LLM distillation (labeling teams, summarizing expertise areas). An incremental update mechanism avoids full rebuilds.

## Performance Data

In a benchmark implementing Anthropic's adaptive thinking mode:

| Metric | Without Unblocked | With Unblocked |
|---|---|---|
| Wall clock time | 2.5 hours | 25 minutes |
| Total tokens | 21 million | 10 million |
| Task success | Missed legacy dependencies, wrong implementation | Correct implementation with backwards compatibility |

The dramatic improvement comes from eliminating doom loops — the agent gets the right context upfront and doesn't need to iterate through multiple wrong approaches.

## "Bottling Experts"

Unblocked distills expert context as a multi-layer retrieval strategy:
1. **Vector search** over code — layer one
2. **Pre-built organizational memories** — layer two
3. **Bottled expert context** — the expert's distilled learnings for the relevant code area — layer three

The expert context provides directional guidance: it helps the agent understand *where to go next* and which decisions have been made before.

## Common Use Cases

- **Planning phase** (biggest bang for buck) — Use a skill/MCP to bring context engine into planning
- **Code review** — Context engine provides organizational motivation behind the code
- **Ticket enrichment** — Agent fills in the blanks on new feature tickets
- **Triage** — Instant correlation of production issues with past issues and discussions
- **Incident management** — Connects monitoring signals (Sentry, DataDog) to code, past incidents, and Slack discussions
- **Engineering support channels** — Auto-answer cross-team questions

## Adopted Agents

Usage breakdown across Unblocked's user base: **Claude Code** (most used), **Cursor** (second), **Claude Desktop** (unexpectedly popular), VS Code and Codex (smaller share).

## Thread

- [[tool-design-for-agents]] — Unblocked is a concrete product architecture for tool design at the context layer
- [[context-engineering]] — Unblocked productizes context engineering: it's the automated curation of information-per-token density
- [[the-agent-workflow]] — Context engines are workflow infrastructure that make the HITL/AFK cycle viable at organizational scale

## Related

- [[peter-werry]] — Creator and speaker
- [[satisfaction-of-search]] — Core design constraint for Unblocked's retrieval system
- [[context-engineering]] — The practice Unblocked productizes
- [[code-intelligence]] — Related: understanding code semantics to provide context
- [[sourcegraph]] — Another engineering context system, though Unblocked focuses more on organizational dynamics (people, decisions, Slack) than pure code intelligence

## Sources

- `raw/Mergeable by default Building the context engine to save time and tokens — Peter Werry, Unblocked - youtube.com.md` — Full talk transcript covering architecture, hard lessons, social graphs, and benchmark results
