---
title: Damian Galarza
created: 2026-04-27
updated: 2026-04-27
sources: ["raw/yt-the-observability-layer-your-ai-agent-is-missing.md", "raw/yt-ai-agent-evals-the-4-layers-most-teams-skip.md", "raw/yt-the-quality-loop-your-ai-agent-is-missing-evals-tracing.md"]
tags: ["author", "agent-quality", "observability", "evals"]
---

# Damian Galarza

> Software engineer with 15+ years of experience who runs a production multi-agent system (Emma) and produces educational content on AI agent quality engineering.

Galarza operates a multi-agent system named **Emma** that handles business operations: invoicing, CRM updates, scheduling, and client communications. His content draws from real debugging experiences with this system.

His three-part series on agent quality covers the full stack: [[agent-evals|what to measure]] (the 4-layer eval framework), [[agent-observability|how to see inside agents]] (logs/traces/metrics), and [[agent-quality-loop|the flywheel that ties them together]] (code → traces → evals → code).

## Key Contributions

- **The 4-layer eval stack**: Component → Trajectory → Outcome → System monitoring. Measure from the outside in.
- **Logs vs Traces vs Metrics**: Logs tell you what, traces tell you why (tree-shaped decision chains), metrics show aggregate patterns. All three are necessary.
- **Quality metrics vs System metrics**: System metrics watch the server; quality metrics watch the agent. If you're only watching system metrics, you're not watching the agent.
- **The quality loop**: Production failures → eval cases → prompt/tool iteration → improved scores. The eval set compounds into a living record of everything the agent has struggled with.
- **Observability as architecture**: Visibility must be designed in from day one, not added after the fact.
- **The invoice failure story**: A real-world debugging narrative where the agent finalized an invoice but never sent it, and every system metric was green — only trace inspection revealed the interpretation error.

## Related

- [[agent-evals]] — The eval framework Galarza articulated
- [[agent-observability]] — The observability layer from part two
- [[agent-quality-loop]] — The flywheel from part three
- [[agent-quality-engineering]] — The thread his series forms

## Sources

- `raw/yt-ai-agent-evals-the-4-layers-most-teams-skip.md`
- `raw/yt-the-observability-layer-your-ai-agent-is-missing.md`
- `raw/yt-the-quality-loop-your-ai-agent-is-missing-evals-tracing.md`
