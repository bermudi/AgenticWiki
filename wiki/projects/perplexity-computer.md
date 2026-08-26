---
title: Perplexity Computer
created: 2026-08-25
updated: 2026-08-25
sources:
  - raw/perplexity-local-first-agent.md
unaudited_marginal: 0
tags: [project, agent-harness, local-first, perplexity, knowledge-work]
---

# Perplexity Computer

> Portable Computer — Perplexity's local-first agent for private knowledge work. The model, harness, conversation, and trajectory run on-device by default (NVIDIA DGX Spark-class hardware); web search, connectors, and frontier-model advisor escalation cross the device boundary only when user-gated. Ships as a co-designed harness + post-trained model (PPLX 27B on Qwen 3.8 27B), with a hybrid local-server inference orchestrator previewed in June 2026.

## Overview

Perplexity frames Computer as the product answer to two converging trends: token spend and data movement becoming hard to govern as agents scale, and small open models plus local hardware becoming capable enough to handle real knowledge work. The pitch: private by construction (sensitive data never leaves the device without permission) and cost-effective by construction (local inference carries no per-token fee) — with explicit user control over when to pay the privacy/cost price of going to the cloud.

The company positions the work as a shift of capable agents from remote infrastructure to individual and local devices, with chip, model, and device advances continually expanding the local quality frontier.

## Architecture

- **Hybrid orchestrator.** A deterministic harness orchestrator maintains the loop, assembles context, and enforces policy; the local model proposes the next action; the orchestrator executes approved tool calls in an OS-level sandbox and returns results. Off-device services are optional and gated.
- **Harness tailored to small models.** Succinct core (minimal prompt + small tool set), on-demand skills for research/data-science/visualization/document-creation/software-engineering, context compaction for long trajectories, compact CLI tools in place of MCP servers for connectors (Gmail, GitHub, Outlook, Calendar), and verification hooks (self-triggered or health-monitored).
- **Security default.** OS-level sandbox restricts processes, filesystem paths, and network per policy; if unavailable, the harness disables itself rather than degrading to unsandboxed execution. Isolation is always on with no configuration — the inverse default to Pi/Hermes.
- **Connectors and search.** Most-used MCPs are reimplemented as compact CLI tools with custom skills; web research goes through Perplexity's Search as Code interface alongside its search engine.
- **Advisor escalation.** An optional advisor tool lets the local model consult a stronger frontier model (evaluated with Claude Opus 5) for planning, ambiguity resolution, failure recovery, or final verification. The orchestrator retains tool authority, applies a PII classifier, previews what would leave the device, and returns only text guidance — no direct file/tool/channel access for the advisor.
- **Model co-design.** Base model Qwen 3.8 27B (27B parameters, 260K nominal / ~100K effective window) post-trained as PPLX 27B via rejection fine-tuning then RL over synthetic Docker environments — each task is instruction + environment + verifier, with no real user documents. A held-out split forms the Local Knowledge Work Bench (53 tasks, seven categories).

## Evaluation Summary

All harness-isolation runs use Qwen 3.8 27B on DGX Spark so harness differences are isolated before post-training:

| Benchmark | Computer (Qwen 3.8) | Pi (Qwen 3.8) | Hermes (Qwen 3.8) | Note |
|---|---|---|---|---|
| **Local Knowledge Work Bench** (53 tasks) | **82.6%** (520K tok, 218s) | 77.6% (681K, 176s) | 74.0% (634K, 292s) | PPLX 27B lifts Computer to **85.4%** (678K, 250s) |
| **BrowseComp** (1,266 tasks) | **66.7%** (402s, 852K) | 50.2% (826s, 2.82M) | 43.9% (1,021s, 1.01M) | Confounds harness + search provider (Perplexity vs Brave) |
| **ParseBench-100** (100 multimodal tasks) | **65.1%** (60.6s, 20.1K) | 13.9% (410.5s, 829.1K) | 34.6% (108.3s, 32.1K) | Largest lead on charts (76.5% vs 29.3% vs 2.5%) |
| **Terminal Bench 2.1** (89 coding tasks) | **59.6%** local; **73.0%** with Opus 5 advisor ($0.415/rollout) | — | — | Frontier alone: 82.4% at $0.65/rollout |

Among latency/token-reporting benches, Computer is fastest on BrowseComp and ParseBench-100 and most token-efficient on all three; Pi is fastest on LKWB. Advisor escalation was not evaluated on Pi/Hermes — adding it would no longer be the off-the-shelf harness.

## Thread

- [[tool-design-for-agents]] — Sandbox always-on, CLI-over-MCP, and skill modularization as tool-design choices driven by a 100K effective window
- [[harness-engineering]] — Co-designed harness + model and PII-gated escalation as answers to the self-evolution and HITL-safety open problems

## Related

- [[local-first-agent]] — The architectural pattern Computer instantiates
- [[pi]] — General-purpose harness baseline in the same evaluations; no sandbox by default
- [[intelligence-tier-routing]] — The routing thesis that advisor escalation implements
- [[agent-skills]] — On-demand skills as the mechanism keeping the core succinct
- [[harness-model-co-evolution]] — The training-regime parallel for PPLX 27B's two-stage RFT + RL

## Sources

- `raw/perplexity-local-first-agent.md` — Product framing, architecture (orchestrator, sandbox, skills, CLI tools, compaction, verification), hybrid orchestrator (June 2026), advisor design and cost/performance, PPLX 27B training and LKWB composition, and all benchmark numbers. Plans to publish a technical report and open-source LKWB noted but not yet realized at publication time.
