---
title: MCP (Model Context Protocol)
created: 2026-06-07
updated: 2026-07-18
sources:
  - raw/yt-how-to-ship-real-code-with-ai-not-junk-ft.-david-cramer-the-weekly-dev-s-brew.md
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

## Cramer's MCP Experience

[[david-cramer|David Cramer]] built Sentry's MCP server and uses it daily in his own coding agents. His practical experience adds a practitioner-level perspective:

- **High-value for UX**: A plugin that drops in with native authentication, tool controls, and permission systems creates "a really, really good experience" compared to arbitrary shell commands or CLIs. "I care about what is the lowest friction best user experience I can create."
- **Protocol flaws**: It should have been stateless from default, should have been just HTTP. The OAuth (DCR) is "suffocated" and not fully secure — "it's not insecure, but from security includes a lot of things." Transport mechanism issues cause persistent deauthentication that Cramer has spent "hours trying to get rid of."
- **Progressive discovery pattern**: Sentry shipped a search-and-execute tool (inspired by "code mode") that buries other tools behind it. "We just added a search and execute tool to our MCP and we buried a bunch of other tools behind them and it still works exceedingly well." This is context engineering applied to MCP tool design — constrain the tool surface to avoid context pollution.
- **Most of the spec doesn't survive**: Resources were never used. Prompts are dead. Tools are great. Skills are coming but not there yet. The UI part is "neat, not market demand." Cramer expects some of the spec to be trimmed over time.
- **Reverse integration value**: "It's the first time in my career that I've seen a reverse integration like this where you can build a plugin and it just works for all future partners." Despite the flaws, MCP is "clearly going to be a useful way to get Sentry into agents."

Sentry has "a lot of daily active users on the MCP, even with them getting logged out all the time, which is absurd to me" — signaling that the value proposition outweighs the protocol's rough edges.

## Related

- [[kiro]] — The product that uses MCP pervasively
- [[al-harris]] — The Kiro engineer who demonstrated the per-phase MCP integration
- [[david-cramer]] — Built Sentry's MCP server; practitioner critique of the protocol
- [[tool-design-for-agents]] — MCP is the tool-level interface for shaping agent capability
- [[agent-friendly-tooling]] — Speed, observability, and misuse resistance as practical craft; MCP is the integration layer
- [[harness-monoculture]] — Custom MCP tools lose invocation share when models are RL-trained on a harness with different built-in tools (effect #4)
- [[context-engineering]] — Progressive discovery pattern as context engineering applied to MCP tool design

## Sources

- `raw/yt-how-to-ship-real-code-with-ai-not-junk-ft.-david-cramer-the-weekly-dev-s-brew.md` — [[david-cramer|Cramer]]'s MCP experience: built Sentry's MCP server, daily user, progressive discovery pattern (search-and-execute tool burying other tools), protocol critiques (statelessness, OAuth, transport), and the reverse-integration value proposition.
- `raw/yt-al-harris-amazon-kiro-faang-spec-driven.md` — AI Engineer talk. MCP integration across the SDD pipeline; 200-grit capability; prompt cache invalidation on tool changes; AWS docs MCP as a per-customer add-on.
