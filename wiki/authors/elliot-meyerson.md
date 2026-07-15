---
title: Elliot Meyerson
created: 2026-07-03
updated: 2026-07-14
sources:
  - raw/2511.09030.md
tags: [author, researcher, multi-agent, scaling, error-correction, cognizant-ai-lab]
unaudited_marginal: 0
---

# Elliot Meyerson

> Lead author of *Solving a Million-Step LLM Task with Zero Errors* (arXiv 2511.09030v1, Nov 2025) and the [[massively-decomposed-agentic-processes|MDAP]] framework. Researcher at Cognizant AI Lab (with UT Austin affiliation). Corresponding author on the MAKER paper; co-author of the position paper on asymptotic analysis with LLM primitives (ICML 2025 Position Paper Track) that motivates the MDAP framework.

## Work

- **[[massively-decomposed-agentic-processes|MDAPs]] / [[maker|MAKER]]** (Meyerson, Paolo, Dailey, Shahrzad, Francon, Hayes, Qiu, Hodjat, Miikkulainen, 2025): the framework and first implementation of massively decomposed agentic processes. First system to solve a >1M-step LLM task (Towers of Hanoi, 20 disks) with zero errors. Establishes log-linear cost scaling under maximal decomposition and the role of subtask-level voting + red-flagging in breaking the [[compounding-booboos|compounding]] ceiling on long-horizon LLM execution.
- **Position paper on asymptotic analysis with LLM primitives** (Meyerson & Qiu, ICML 2025 Position Paper Track, ref [6] in the MAKER paper): argues that scaling LLM agents requires asymptotic analysis in terms of LLM primitive operations (AALPs), analogous to classical algorithm analysis. This is the theoretical foundation MDAPs instantiate — the cost model in the MAKER paper is an AALPs analysis.

## Affiliations & Collaborators

Cognizant AI Lab (Babak Hodjat, Risto Miikkulainen, Xin Qiu, Conor F. Hayes, Olivier Francon, Giuseppe Paolo, Roberto Dailey, Hormoz Shahrzad) with UT Austin (Miikkulainen's dual affiliation). The lab's lineage is in evolutionary computation and neuroevolution (Miikkulainen); the MDAP work extends that tradition's emphasis on modularity and scaling into the LLM-agent substrate.

## Related

- [[massively-decomposed-agentic-processes]] — the framework
- [[maker]] — the implementation and million-step result
- [[horizon-length]] — the inverse-face of compounding that MDAPs exploit
- [[multi-agent-illusion]] — the apparent counter-thesis; on the wiki's read, MDAPs reinforce the illusion's corollary (engineered decomposition works)
- [[the-multi-agent-theory]] — the thread that traces the full six-paper theory; Meyerson's work is Layer 5 (the engineered escape)

## Sources

- `raw/2511.09030.md` — Meyerson et al. (Cognizant AI Lab + UT Austin, arXiv 2511.09030v1, 12 Nov 2025). Lead author and corresponding author. Co-designed the MDAP framework and MAKER implementation; co-authored the AALPs analysis (§3.2) and the scaling-law derivations (Eqs. 9–19).
