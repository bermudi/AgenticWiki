---
title: Lamis Mukta
created: 2026-07-14
updated: 2026-07-14
sources:
  - raw/yt-learning-while-you-sleep-beyond-memory-to-dreaming.md
unaudited_marginal: 0
tags: [author, memory, context-engineering, anthropic, agent-memory, dreaming]
---

# Lamis Mukta

> Member of technical staff on Anthropic's applied AI team — the group that sits between research, product, and go-to-market, working on internal projects and directly with customers building agents at the frontier. Works specifically with startups and founders. Described **dreaming** — Anthropic's out-of-band memory consolidation paradigm — and its production architecture at AI Native DevCon (June 2026).

## Contributions

- **Dreaming — out-of-band memory consolidation** ([[dreaming]]). Described the production architecture behind Anthropic's memory infrastructure for managed agents (Anthropic introduced the concept; it predated this talk via an internal leak): an orchestrator + subject-agent fleet that reviews session transcripts (including tool-call metadata) against the memory store, identifies fleet-wide failure patterns, and proposes evidence-backed memory changes for a human to accept or reject. Articulated the load-bearing **in-band vs out-of-band** distinction — the structural limits of in-band memory (split focus, fleet-blindness, staleness) and the dedicated-capacity, fleet-visibility case for an asynchronous consolidation process.
- **Production memory guardrails.** Enumerated the engineering practices that make autonomous agent memory safe at fleet scale: versioning (with session/transcript provenance), concurrency via optimistic locking (hash-before-edit, hash-before-commit, re-read on mismatch), tiered permissions (read-only org-wide context vs writable agent scratchpad), and portability via a clean API. When challenged that this reinvents databases, framed it as proven primitives being codified into the harness deterministically as signal accumulates.
- **The memory-primitives timeline.** Recapped Anthropic's year-long path on context engineering: CLAUDE.md ("unreasonably effective") → in-band memory tools (autonomous read/write/update) → skills ([[agent-skills]], progressive disclosure) → file-system-as-memory (markdown + ordinary tools like bash/grep), the perceived state of the art as of mid-2026.
- **Context engineering at Anthropic.** Member of the applied AI team; works directly with founders pushing models against the boundary of what is possible, "riding the exponential together."

## Related

- [[dreaming]] — her out-of-band memory consolidation paradigm
- [[context-engineering]] — the discipline her talk situates memory systems within
- [[agent-memory-systems]] — the production guardrails harden the maintenance module (U)
- [[evolving-context]] — the in-band/out-of-band temporal axis her work introduces
- [[episodic-memory-for-agents]] — dreaming realizes the CLS consolidation and default-mode after-action framing her term borrows

## Sources

- `raw/yt-learning-while-you-sleep-beyond-memory-to-dreaming.md` — Lamis Mukta (Anthropic), "Learning while you sleep: Beyond memory to dreaming," AI Native DevCon, June 2026. Solo talk (single speaker) with Q&A. Channel: AI Native Dev.
