---
title: Mastra
created: 2026-04-27
updated: 2026-04-27
sources: ["raw/The Quality Loop Your AI Agent Is Missing (Evals + Tracing) - youtube.com.md"]
tags: ["project", "agent-framework", "typescript", "observability", "evals"]
---

# Mastra

> Open-source TypeScript framework for building AI agents with built-in observability, evals, and scoring. Includes Mastra Studio for local trace inspection and agent interaction.

Mastra provides the full quality infrastructure for agents: tracing (spans, OpenTelemetry), evals (LLM-as-judge, code-based, custom scorers), and a studio for inspecting traces and scores. It is the implementation platform used in [[damian-galarza|Damian Galarza's]] three-part agent quality series.

## Architecture

- **Agents**: Defined with [[agent-evals|scorers]], tools, and instructions. Supports sub-agent delegation.
- **Tools**: Schema-typed input/output, can delegate to sub-agents internally.
- **Observability**: Traces structured as spans (agent runs, tool calls, LLM calls, memory, workspace). Supports the default exporter (local storage for Mastra Studio), a cloud exporter (hosted Mastra Studio), and external exporters (Arize Phoenix, Braintrust, Datadog, generic OpenTelemetry).
- **Evals**: Built-in scores (answer relevancy, faithfulness, hallucination, completeness, content similarity, tool trajectory, prompt alignment, context quality) plus custom scores with pre-process, analyze, generate score, and generate reason steps.
- **Sampling**: Per-scorer sampling rates (e.g., 100% in dev, 25% in production) to control eval cost.

## Mastra Studio

A local and hosted UI for:
- Interacting with agents during development
- Inspecting traces as span trees (inputs, outputs, attributes, timing)
- Viewing eval scores per run with justifications
- Debugging agent decision chains

## Key Design Decisions

- **OpenTelemetry-native**: Traces use standard spans, trace IDs, parent-child relationships. Not a proprietary format.
- **Scorers attached to agents**: Evals live alongside agent definitions, not in a separate pipeline.
- **LLM-as-Judge as first-class**: Custom scores define judge model, instructions, and scoring logic in the same codebase as the agent.

## Related

- [[agent-evals]] — Mastra's eval system operationalizes the eval framework
- [[agent-observability]] — Mastra's tracing implements the observability layer
- [[agent-quality-loop]] — Mastra Studio enables the full flywheel in practice
- [[damian-galarza]] — Uses Mastra as the implementation platform for his quality series
- [[pi]] — Contrast: pi is a minimalist harness (4 tools); Mastra is a full-featured agent framework with built-in observability

## Sources

- `raw/The Quality Loop Your AI Agent Is Missing (Evals + Tracing) - youtube.com.md` — Walkthrough of Mastra's observability, evals, and scoring
