---
title: All Agentic Architectures
created: 2026-07-26
updated: 2026-07-26
sources:
  - raw/all-agentic-architectures-readme.md
  - raw/all-agentic-architectures-deterministic-picker.md
  - raw/all-agentic-architectures-benchmarks.md
unaudited_marginal: 0
tags: [project, agentic-architecture, langgraph, llm-library, open-source]
---

# All Agentic Architectures

> An open-source Python library and "living textbook" by Fareed Khan (2026) that, per the README, packages 35 production-grade agentic AI patterns from the literature as runnable `Architecture` classes with a uniform `.run(task)` contract. Built on LangGraph, multi-provider (9 LLM providers per the README), with a 17-task benchmark leaderboard the author reports. The README names the [[deterministic-picker]] pattern as the central technical discipline, applied in 13 of 35 architectures.

## Repository

- **GitHub**: https://github.com/FareedKhan-dev/all-agentic-architectures
- **Author**: Fareed Khan
- **License**: MIT
- **Built on**: LangGraph state machines
- **HEAD commit**: `cf9d620a8cc55d59589399c30f305e6dfaa428ec` (2026-05-28)
- **PyPI**: `agentic-architectures`

The README presents itself as a launch post — badges and hero metrics ("35 ARCHITECTURES / 283 PASSING TESTS / 17 BENCHMARK TASKS / 9 LLM PROVIDERS / 0 MOCKED RUNS"). It is a recent repository (May 2026). Treat its benchmark results and its "deterministic-picker is the universal escape" claim as the author's, not independently verified findings.

## What It Is

A single Python library that the README describes as packaging every major agentic AI pattern from the literature as a runnable `Architecture` class with a uniform contract (`ArchitectureResult` return shape). Each pattern ships with a fully executed Jupyter notebook whose theory is written *against* the captured run — not synthetic examples. Multi-provider via an `LLM_PROVIDER` env var; swap providers with no code changes. The same `.run(task)` interface holds across all 35 architectures (per the README).

## The 35-Architecture Taxonomy

The library organizes 35 patterns into 8 families, each mapped to its primary paper reference. This is the repo author's synthesis of existing literature — a comparative reference, not new theory:

### Reasoning & Reflection — self-critique loops that drive answer quality up through iteration

| Architecture | Pattern | Reference |
|---|---|---|
| Reflection | Generate → critique → refine | Madaan 2023 |
| Reflexion | Verbal reflections in episodic memory | Shinn 2023 |
| Chain-of-Verification (CoVe) | Verify each baseline claim independently | Dhuliawala 2023 |
| Self-Discover | SELECT → ADAPT → IMPLEMENT → SOLVE | Zhou 2024 |
| Constitutional AI | Per-rule pass/fail → revise | Bai 2022 |

### Sampling & Search — sample many paths or grow a tree with rewards

| Architecture | Pattern | Reference |
|---|---|---|
| Self-Consistency | Sample N paths, majority-vote | Wang 2022 |
| Tree of Thoughts | Beam search over thoughts | Yao 2023 |
| LATS | MCTS tree with reward backup | Zhou 2024 |
| Mental Loop | Simulate → score (deterministic-picker) | this repo |
| Ensemble | N voters, weighted aggregation | this repo |

### Retrieval (RAG) — ground every claim; five retrieval shapes

| Architecture | Pattern | Reference |
|---|---|---|
| Agentic RAG | Agent decides when & what to retrieve | LangGraph reference |
| Corrective RAG (CRAG) | Grade docs, fall back to web | Yan 2024 |
| Self-RAG | Per-doc reflection tokens | Asai 2024 |
| Adaptive RAG | Pre-route by query complexity | Jeong 2024 |
| GraphRAG | KG + community summaries | Microsoft 2024 |

### Memory — learn across calls; pick the storage shape

| Architecture | Stored unit | Reference |
|---|---|---|
| Episodic + Semantic | Conversation turns + triples | Park 2023 |
| Graph Memory | (subject, predicate, object) triples | this repo |
| MemGPT | OS-style context + archival tiers | Packer 2023 |
| Voyager | Reusable Python skills (real subprocess) | Wang 2023 |
| Agent Workflow Memory | High-level workflow recipes | Wang 2024 |

### Tools & Actions — from one search tool to a real Chromium browser

| Architecture | Pattern | Reference |
|---|---|---|
| Tool Use | Agent with one tool | LangChain reference |
| ReAct | Thought → Action → Observation | Yao 2022 |
| Planning | Decompose → execute → replan | Wei 2022 |
| Plan-Execute-Verify (PEV) | Post-execution verification per step | this repo |
| SWE-Agent | Sandboxed file-system agent | Yang 2024 |
| BrowserAgent | Real Playwright + safety gate | Anthropic Computer-Use 2024 |

### Multi-Agent — specialists, debate, multi-perspective research

| Architecture | Pattern | Reference |
|---|---|---|
| Multi-Agent | Supervisor + specialists | LangGraph reference |
| Blackboard | Shared workspace + agents | classical AI |
| Debate | N agents × K rounds | Du 2023 |
| STORM | Multi-perspective research → article | Shao 2024 |
| Meta-Controller | Router over architectures | this repo |

### Safety, Routing & Specialty — categorical actions through deterministic Python gates

| Architecture | Pattern | Reference |
|---|---|---|
| Dry-Run | Propose → simulate → approval gate | this repo |
| Reflexive Metacognitive | Self-aware capability routing | this repo |
| RLHF Self-Improvement | Multi-dim deterministic scoring + archive | this repo |
| Cellular Automata | LLM rules over a grid | this repo |

Patterns marked "this repo" are the author's own compositions (often combining the [[deterministic-picker]] discipline with an existing shape). The remaining 26 map each pattern to its primary paper.

## Provider Compatibility

Nine providers, switched via the `LLM_PROVIDER` env var with no code changes: Nebius (default; Llama-3.3-70B + Qwen3-Thinking), OpenAI, Anthropic, Groq, Ollama (local), Together, Fireworks, Mistral, Google.

## The Deterministic-Picker Discipline

Every LLM-as-Scorer surface in the library has the LLM commit to categorical features (booleans, enums) and lets Python compose the deciding signal. The author frames this as the universal escape from the LLM-as-Scorer flat-band pathology. It is applied in 13 of 35 architectures (per the README); the README also claims 9 more are architecturally immune by design, but the [[deterministic-picker]] tutorial enumerates 8 (Reflexion, Self-Discover, CoVe, GraphRAG, Voyager, MemGPT, SWE-Agent, AWM). See [[deterministic-picker]] for the full pattern, the code shape, the count discrepancy, and its relation to the wiki's constructible-verifiability family.

## Benchmarks

A 17-task suite runs every architecture and scores results. The author reports **33 / 42 correct (78%)** on a single run: real Nebius Llama-3.3-70B, ~25 min, ~$1.50 in tokens. The 42 attempts figure is the sum of per-architecture attempt counts in the benchmark leaderboard (e.g. Reflection's 3/3 + Self-Consistency's 2/2 + … summing to 42 denominator across 36 rows). The 33/42 ratio is consistent with the README's overall table.

> [!note] Attribution
> These are the author's reported results on his own benchmark — single-model, single-run, ~$1.50, 17 tasks, 42 attempts. They are not independently verified, and the benchmark is small. Treat as a practitioner's self-report, not established finding. The README's "0 MOCKED RUNS" hero metric is a freshness signal, not a validation signal.

> [!note] Count discrepancy (35 vs. 36): The README reports 35 architectures ("35 ARCHITECTURES" hero metric, "35 production-grade" framing). The benchmark leaderboard lists 36 rows — it counts `BrowserAgent` and `ComputerUse` as separate architectures, whereas the README's architecture-families table lists `BrowserAgent` once and `Computer Use` once under different families. The benchmark file's header claim of "36 architectures × 17 tasks = 42 attempts" has incorrect math (36 × 17 ≠ 42); the 42 figure is the sum of attempt denominators, not a product of architectures × tasks. The 33/42 figure itself is consistent with both sources.

The benchmark's most useful contribution is its **named pattern-fit failures** — architectures that ran but failed scoring for identifiable shape-mismatch reasons. Per the README's own framing:

- **LATS on arithmetic (labeled "wrong shape")** — the MCTS/tree-search architecture doesn't fit a straightforward arithmetic problem; the search has no useful branching structure to exploit.
- **Debate + Ensemble on the Sally trick (labeled "group-think")** — the multi-agent aggregation amplifies the wrong answer rather than correcting it. (This is a small-scale practitioner instance of the [[error-cascades|consensus-amplification]] mechanism.)
- **Reflexion + Agent Workflow Memory on raw-fact recall (labeled "wrong memory shape")** — verbal-reflection and workflow-recipe memory shapes don't store raw facts, so recall fails on a question whose answer is a single stored value.

These labels are the README's own taxonomy. The benchmark file confirms which architectures failed which tasks; the explanation of *why* each architecture-task pair failed is the repo author's interpretation, not an independent finding. They are consistent with the broader wiki thesis (see [[the-multi-agent-theory]]) that system design, not model quality, is the binding constraint — though this is a single-author practitioner benchmark, not a rigorous audit.

## Related

- [[deterministic-picker]] — the central technical discipline codified by this library
- [[memgraphrag-project]] — the closest existing project-page analog (an open-source implementation filed alongside its concept)
- [[the-multi-agent-theory]] — the pattern-fit failures (esp. Debate/Ensemble group-think) echo the thread's "system design is the binding constraint" thesis
- [[agent-quality-engineering]] — the deterministic-picker is a hybrid LLM-as-judge technique relevant to the thread's eval/scoring discussion
- [[the-verifiability-thesis]] — the deterministic-picker is a constructible-verifiability move
- [[contextcov]] — the deterministic-picker is the hybrid middle ground between full LLM-as-judge and this "remove the LLM from verification" pole

## Sources

- `raw/all-agentic-architectures-readme.md` — README: overview, the 35-architecture taxonomy with per-pattern paper references, the 8 family structure, the provider compatibility matrix, the benchmarks summary (33/42, 78%), learning paths, and the library's uniform `Architecture` contract.
- `raw/all-agentic-architectures-deterministic-picker.md` — The deterministic-picker tutorial: the central technical discipline of the repository.
- `raw/all-agentic-architectures-benchmarks.md` — The 17-task benchmark leaderboard with per-task answer excerpts and the named pattern-fit failures (LATS, Debate + Ensemble, Reflexion + AWM). The benchmark leaderboard lists 36 rows (splitting `BrowserAgent` and `ComputerUse`), where the README claims 35 — see the count-discrepancy note in §Benchmarks.
