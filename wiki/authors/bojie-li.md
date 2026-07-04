---
title: Bojie Li
created: 2026-06-18
updated: 2026-06-18
sources:
  - raw/2606.16707v1.md
tags: [author, pine-ai, agent-memory, executable-memory, personalization]
unaudited_marginal: 0
---

# Bojie Li

> Researcher at Pine AI; author of *User as Code: Executable Memory for Personalized Agents* (arXiv 2606.16707, June 2026). Argues that user memory should be executable — typed Python objects plus Python functions for rules, run by an interpreter — rather than a passive fact store consulted by retrieval.

## Core Contribution

The **User as Code (UaC)** paradigm: a personalized agent's model of the user is a living software project (typed Python state + Python functions encoding rules) maintained by a two-phase pipeline (append-only fact extraction + periodic code structuring). The result is competitive with full-context on standard memory benchmarks and decisively better on the two capability tiers retrieval cannot serve — analytical inference (99% vs 6–43% for retrieval baselines) and proactive alerting (100% on 40 standard Active Service scenarios).

## Key Claims

- **The representation is the lever.** "What can be recalled is bounded by how it was recorded." A record-side structure expressive enough that the recall side can read back what it needs with both high recall and high precision. Typed, executable code is the bet on what that structure should be.
- **Two-phase separation is decisive.** The ablation isolates that memorizing and structuring must be separate concerns: append-only extraction preserves coverage (+19pp on LOCOMO over a code-only baseline), periodic structuring adds the typed surface a Python interpreter can read (+12.3pp over incremental code rewrites).
- **No human-designed schema.** The data model is written by the LLM at structuring time and regenerated from the full fact corpus. This is a deliberate bet on Sutton's bitter lesson for memory.
- **The constraint pipeline is the proactive mechanism.** Ad-hoc checks get promoted to persistent constraints; alerts fire deterministically on every state change. Without pre-computed alerts, UaC drops to 52.5% on the Active Service benchmark — the pipeline is the decisive factor.

## Notable Empirical Results

- **LOCOMO (n=600):** 78.8% (vs. 79.8% full-context upper bound, p=0.65) — within 1.0pp of the ceiling.
- **LongMemEval (n=500):** 83.0% (vs. 85.4% full-context, p=0.19) — three-way top cluster with MemMachine and Full Context.
- **Analytical Inference (n=100):** 99% (vs. 6% Mem0, 43% MemMachine, 100% FC+REPL).
- **Active Service (n=40 standard, n=20 hard):** 100% / 85%.
- **Cost amortization:** Structure once, query many — 15.5× cheaper than FC+REPL amortized over 100 queries.
- **Cross-LLM portability:** GPT-5.4 substituted throughout yields a statistical tie with Gemini on a 120-QA LOCOMO subset (p=0.82).
- **Cross-judge robustness:** Rejudging all 7,700 predictions under Claude Opus 4.7 preserves the ranking with Cohen's κ ≥ 0.74 on every system.

## Open Questions and Limitations (Author's Own)

- **Write-time overhead.** UaC runs two LLM passes where flat-fact systems run one. Structuring costs ~7.6–101.8 m$/case at N∈{20, 500}.
- **Structured state is roughly neutral for pure recall.** The channel ablation shows typed Python state contributes only −1.3pp on LOCOMO QA (p=0.67). Its value is concentrated in analytical inference and the constraint pipeline.
- **Phase 2's all-at-once regeneration has a ceiling.** The 500K-character input cap binds at n≥100 sessions. The fix is hierarchical or incremental structuring.
- **Active Service depends on the pipeline.** Without pre-computed alerts, UaC drops to 52.5%. The representation alone doesn't fire alerts.
- **Cross-LLM coverage limited.** Verified on Gemini 3 Flash and GPT-5.4 only; smaller code generators may produce lower-quality structured code.
- **Sandboxing required.** Storing user state as executable code requires sandboxed execution and strict isolation to prevent cross-user leakage or code injection.

## Position in the Wiki

- Connects [[code-as-agent-harness]] to user memory: the most concrete case study of code as the operational substrate for an agent
- Extends [[evolving-context]] to the schema layer: the LLM writes its own data structures
- Operationalizes [[verifiability]] at the memory boundary: the interpreter is the verification mechanism
- Provides empirical evidence for [[jagged-frontier]]: capability is jagged across representation, not just across domain
- Is the canonical implementation of [[proactive-service]]

## Related

- [[executable-memory]] — The UaC paradigm
- [[proactive-service]] — The Active Service tier UaC makes possible
- [[code-as-agent-harness]] — The framework UaC is the most concrete application of
- [[harness-mechanisms]] — Memory as a first-class harness mechanism
- [[evolving-context]] — UaC extends evolving context to the schema layer
- [[verifiability]] — The interpreter as the verification boundary
- [[jagged-frontier]] — Empirical evidence UaC provides

## Sources

- `raw/2606.16707v1.md` — Bojie Li (Pine AI, June 2026). *User as Code: Executable Memory for Personalized Agents.* The full paper, 41 pages. Author-acknowledged: "Pine Copilot, Claude Code, and Claude Opus 4.8 were used during this research."
