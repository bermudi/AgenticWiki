---
title: Satisfaction of Search
created: 2026-05-04
updated: 2026-05-04
sources:
  - raw/yt-mergeable-by-default-building-the-context-engine-to-save-time-and-tokens-peter-werry-unblocked.md
unaudited_marginal: 0
tags: [concept, agents, context-retrieval, cognitive-bias]
---

# Satisfaction of Search

> A cognitive bias, originally identified in radiology, where a searcher finds the first plausible explanation for a set of symptoms and stops looking — missing other important findings. Applied to AI agents, it describes the tendency of agents to stop context retrieval as soon as they find *something* that looks relevant, rather than continuing to search for the *best* context.

## Origin

The term comes from medical radiology. When technicians examine X-rays for the cause of symptoms, they may find *something* on the X-ray that explains those symptoms and then stop. This is dangerous because other indicators — for things like cancer — get missed. Radiology has protocols specifically designed to prevent satisfaction of search.

## Application to AI Agents

[[peter-werry|Peter Werry]] (Unblocked) identified this as a fundamental problem in agent context retrieval. When agents search through code, docs, and communication tools (Notion, Confluence, Slack), they:

1. Stumble across content that *looks* like what they're searching for
2. Stop searching and proceed with that context
3. Miss the real "golden nuggets" — richer information in a different place the agent wouldn't think to look

The worst context sources to miss: **past Slack conversations** (where real decisions were debated), **incident reports** (which encode hard-won operational knowledge), and **rejected PRs** (which encode what was tried and failed).

## Why It Matters

Satisfaction of search compounds [[context-engineering|context engineering]] challenges in three ways:

1. **Token waste**: The agent burns tokens searching across many sources and consuming sub-optimal context, then produces wrong output and enters a doom loop
2. **Surface-level understanding**: The agent gets the "what" without the "why" — it sees code but not the historical decisions, rejected alternatives, or organizational debates that shaped it
3. **False confidence**: Finding *something* plausible gives the agent (and the human) a false sense of progress

## Mitigation Strategies

Unblocked's approach to mitigating satisfaction of search in context retrieval:

- **Expert graphs as pivot points**: Instead of searching all sources indiscriminately, identify the expert for a code area and "bottle" their context — the distilled decisions, PR comments, and Slack conversations that represent the deepest signal
- **Layered retrieval**: Deep retrieval over primary repositories (where the user/team works) + wider retrieval over the rest, with bias toward the focused repositories
- **Pre-built organizational memories**: Patterns distilled from historical PR comments and Slack conversations, loaded as seed context so the agent doesn't need to discover them through search
- **Don't cache answers**: Every query produces fresh context because everything changes constantly — caching answers regresses towards the mean and reinforces stale patterns

## Thread

- [[tool-design-for-agents]] — Satisfaction of search is a cognitive bias that context engines (a tool design concern) are designed to mitigate

## Related

- [[context-engineering]] — Satisfaction of search is a retrieval failure that context engineering mitigates
- [[unblocked]] — The context engine that designs for this problem explicitly
- [[peter-werry]] — Introduced the concept from radiology to agent context retrieval
- [[code-intelligence]] — Related: deep code understanding as an alternative to naive search
- [[slop]] — Satisfaction of search produces slop when agents accept plausible-sounding but wrong context
- [[the-slop-problem]] — A downstream failure mode when satisfaction of search feeds wrong context to agents

## Sources

- `raw/yt-mergeable-by-default-building-the-context-engine-to-save-time-and-tokens-peter-werry-unblocked.md` — Introduction and treatment of satisfaction of search as an agent context retrieval problem
