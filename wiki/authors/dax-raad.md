---
title: Dax Raad
created: 2026-05-31
updated: 2026-05-31
sources:
  - raw/yt-effect-opencode-dax-raad.md
tags: [author, effect, typescript, opencode, anomaly]
---

# Dax Raad

> Engineer at Anomaly, the company behind [[opencode|OpenCode]] — an open-source coding agent (~8M MAU). Led the decision to rewrite OpenCode's entire codebase using the [[effect|Effect]] framework in TypeScript, driven by correctness bugs at scale and the need for AI-friendly guardrails. Self-described Effect beginner who only recently felt confident with the framework after three months of intensive migration.

## Key Contributions

- **The AI boilerplate inversion**: Raad articulated the [[ai-boilerplate-paradox|paradox]] that verbose, "enterprisey" frameworks become preferable once AI does the typing — because explicitness provides guardrails for LLMs, not just humans. "Effect produces a lot of code. Like every file is three times bigger than you normally expect. But if I'm not typing it out anymore, maybe I don't care about that as much."
- **Effect as AI guardrail**: Demonstrated that strict typing + explicit patterns improve LLM output quality. His team saw increased token spend post-migration because the AI was producing better results — spending ~$30k/month on OpenAI for a 20-person team.
- **Schema-first team collaboration**: His team aligns on data shapes using Effect's schema system before implementation, then lets AI fill in the details. "We try to model reality using schema and we kind of align on what makes sense, and then the implementation kind of AI does."
- **OTEL feedback loop**: Instrumented OpenCode with auto-instrumented OpenTelemetry spans, then built an agent workflow where the coding agent queries its own traces to diagnose performance issues autonomously.

## Thread

- [[the-slop-problem]] — The correctness bugs that drove OpenCode's rewrite; explicit frameworks as slop prevention
- [[the-human-lever]] — Schema/interface design as the human lever; the team aligns on data shapes then lets AI fill in the details
- [[the-agent-workflow]] — OTEL as agent feedback loop; the agent queries its own traces to diagnose performance issues autonomously

## Related

- [[effect]] — The framework Raad advocates for AI-native TypeScript development
- [[ai-boilerplate-paradox]] — The observation that verbose frameworks become preferable with AI
- [[opencode]] — The coding agent Raad's team rewrote in Effect
- [[context-engineering]] — Effect's verbosity as a form of context engineering for LLMs
- [[the-slop-problem]] — The correctness bugs that drove the migration decision

## Sources

- `raw/yt-effect-opencode-dax-raad.md` — Effect Miami 2026 talk: why OpenCode rewrote in Effect, the AI boilerplate inversion, schema/branded types, services/layers, PubSub/Streams, tracing, and HTTP server design
