---
title: Sentry
created: 2026-07-18
updated: 2026-07-18
sources:
  - raw/yt-how-to-ship-real-code-with-ai-not-junk-ft.-david-cramer-the-weekly-dev-s-brew.md
unaudited_marginal: 0
tags: [project, error-monitoring, observability, mcp, open-source]
---

# Sentry

> Error monitoring and observability platform co-founded by [[david-cramer|David Cramer]]. One of the few production-scale companies with a CTO shipping AI-assisted software at scale — Sentry spends ~$3M/year on AI tooling across ~200 engineers ($15K/year per developer) and built its own [[mcp|MCP server]]. Cramer's practitioner experience from Sentry is a recurring source in the wiki's slop, human-lever, and discourse threads.

## AI at Sentry

Cramer forced himself to stop writing code by hand almost a year before his 2026 interview — not because AI is better, but to build first-person experience with the tools his engineers use. His conclusion: LLMs produce junk, but the junk is useful enough to justify the spend at low-tens-percent productivity improvement.

Sentry treats AI spend as R&D, not a line item with expected ROI. The per-developer budget (~$1,500/month) is blended — some engineers burn through tokens, others use it moderately. Cramer considers it too early to evaluate ROI per individual. The important thing is that engineers learn how to use LLMs.

## MCP Server

Cramer built Sentry's MCP server and uses it daily. The server implements a progressive discovery pattern — a search-and-execute tool that buries other tools behind it — which is [[context-engineering]] applied to MCP tool design. Sentry has "a lot of daily active users on the MCP, even with them getting logged out all the time" — signaling that the value proposition outweighs the protocol's rough edges.

Cramer sees MCP as "the first time in my career that I've seen a reverse integration like this where you can build a plugin and it just works for all future partners." See [[mcp]] for the full treatment of his protocol critiques and experience.

## Security Scanner

Cramer built a scanner inside Sentry that identified security vulnerabilities in their active codebase. "If I ship something that has massive vulnerabilities in Sentry, that could cause the company to disappear." This is the liability asymmetry that distinguishes production slop from hobby-project slop — and a concrete instantiation of verification-as-engineering-discipline at production scale.

## Open Source Model

Sentry uses a fair source model (delayed open source — after 2 years it becomes permissibly licensed). Cramer despises open core ("crippleware") and advocates for fair source as a way to protect the codebase from being stolen while keeping the product good whether people pay or not.

## Related

- [[david-cramer]] — Co-founder and CTO
- [[armin-ronacher]] — Co-creator of Sentry (different perspective on tooling)
- [[mcp]] — The protocol Sentry built a server for
- [[context-engineering]] — Progressive discovery pattern as context engineering in MCP
- [[the-slop-problem]] — Sentry's security scanner as verification at production scale
- [[the-human-lever]] — Cramer on accountability and unchanged engineering practices

## Sources

- `raw/yt-how-to-ship-real-code-with-ai-not-junk-ft.-david-cramer-the-weekly-dev-s-brew.md` — Cramer on Sentry's AI budget (~$3M/year, ~200 engineers), MCP server, security scanner, and fair source model.
