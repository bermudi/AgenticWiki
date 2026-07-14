---
title: MCP (Model Context Protocol)
created: 2026-06-07
updated: 2026-07-14
sources:
  - raw/yt-al-harris-amazon-kiro-faang-spec-driven.md
unaudited_marginal: 0
tags: [project, protocol, tool-surface, kiro]
---

# MCP (Model Context Protocol)

> Model Context Protocol — the standard interface for connecting agents to external tools and data sources. Used by [[kiro|Amazon Kiro]] and most major agentic IDEs as the tool-surface expansion mechanism: per-installation MCP servers extend what the agent can see and do (fetch URLs, search the web, query Asana / GitHub / AWS docs, etc.).

## Role in Kiro's SDD Pipeline

[[al-harris|Al Harris]]'s 200-grit sharpening recommendation: "use your MCPs when building specs." Demonstrated integrations include Asana (pull task metadata to seed a spec), GitHub (code search, PR review), Fetch (pull examples from similar products), AWS documentation (ground the agent in AWS service specifics, added by users not bundled), and Brave / Tavily (web search).

A caching note from Harris: "changing MCP and changing tools in general is a caching operation. So if you're very deep into a long session, maybe don't tweak your MCP config because it will slow you down dramatically." MCP changes invalidate the prompt cache.

## Why This Matters

MCP is what makes an agent's tool surface *user-extensible* without a vendor release. Kiro is intentionally not pre-bundled with cloud-specific tools — "I don't want to ship this to customers who don't need it" — so each customer adds the integrations they need (AWS docs MCP for AWS customers, GCP equivalents otherwise).

## Related

- [[kiro]] — The product that uses MCP pervasively
- [[al-harris]] — The Kiro engineer who demonstrated the per-phase MCP integration
- [[tool-design-for-agents]] — MCP is the tool-level interface for shaping agent capability
- [[agent-friendly-tooling]] — Speed, observability, and misuse resistance as practical craft; MCP is the integration layer
- [[harness-monoculture]] — Custom MCP tools lose invocation share when models are RL-trained on a harness with different built-in tools (effect #4)

## Sources

- `raw/yt-al-harris-amazon-kiro-faang-spec-driven.md` — AI Engineer talk. MCP integration across the SDD pipeline; 200-grit capability; prompt cache invalidation on tool changes; AWS docs MCP as a per-customer add-on.
