---
title: Peter Werry
created: 2026-05-04
updated: 2026-05-04
sources:
  - raw/yt-mergeable-by-default-building-the-context-engine-to-save-time-and-tokens-peter-werry-unblocked.md
unaudited_marginal: 0
tags: [author, context-engine, unblocked]
---

# Peter Werry

> Founder and engineer behind **Unblocked**, a context engine that supplies organizational context — who the experts are, what decisions were made, why code is the way it is — to AI coding agents. Speaker on context engine architecture, hard-won lessons building one, and the future of autonomous agent workflows.

## Key Contributions

### Context Engine Architecture
Peter's talk at AI Engineer London (2026) is one of the most detailed public treatments of what a context engine is and how to build one. He distinguishes context engines from three common misconceptions: naive RAG over docs, wiring up MCP servers, and relying on ever-larger context windows.

### Social/Expert Graph
His team developed a **social graph builder** that distills who the experts are in an organization from SCM data (PR reviews, contributions) and Slack/Teams activity. The graph serves as a pivot point for context retrieval — knowing who the expert is enables "bottling" their historical context (decisions, PR comments, Slack conversations) into agent-accessible memories.

### Hard Lessons
Werry is candid about what went wrong during development:

- **First pass**: Wire up tools + knowledge graph — optimized for access, not understanding. Didn't work.
- **Hid conflicts**: Tried to naively resolve conflicts between sources (recency bias, code bias) instead of surfacing unresolved ones to humans.
- **No answer caching**: Everything changes too fast. Caching answers regresses towards the mean and pollutes future context.

### Satisfaction of Search
Borrowed the concept from radiology: agents find the first plausible answer and stop, missing richer context in Slack conversations, incident reports, or past rejected PRs. This became a core design constraint for Unblocked's retrieval system.

## Thread

- [[context-engineering]] — Werry's context engine architecture is a productized instantiation of context engineering principles
- [[tool-design-for-agents]] — The context engine as a tool that pre-curates context before agents touch it
- [[the-agent-workflow]] — Context engines as planning-phase infrastructure that prevent doom loops

## Related

- [[unblocked]] — The context engine product he built
- [[satisfaction-of-search]] — The concept he introduced from radiology
- [[context-engineering]] — The practice his architecture productizes
- [[dex-horthy]] — Co-creator of context engineering; both operate in the same problem space
- [[lance-martin]] — His operational techniques (progressive disclosure, context offloading) are part of the context engine's mechanical layer

## Sources

- `raw/yt-mergeable-by-default-building-the-context-engine-to-save-time-and-tokens-peter-werry-unblocked.md` — Full talk transcript covering context engine architecture, myths, social graphs, satisfaction of search, and hard lessons
