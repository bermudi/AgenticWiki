---
title: Melissa Z. Pan
created: 2026-09-16
updated: 2026-09-16
sources:
  - raw/harnesstax-how-much-does-the-harness-matter-for-coding-agents.md
  - raw/2503.13657.md
unaudited_marginal: 0
tags: [author, researcher, uc-berkeley, evaluation, multi-agent-systems]
---

# Melissa Z. Pan

> Researcher at UC Berkeley (Sky Lab, with Ion Stoica and Matei Zaharia). Co-equal first author (with [[mert-cemri|Mert Cemri]] and Shuyi Yang) of *Why Do Multi-Agent LLM Systems Fail?* — the [[mast]] failure taxonomy — and lead author of *HarnessTax* (2026), the controlled 21-pair study measuring what harness choice does to coding-agent cost and success. Her recurring move is the controlled audit of what the field assumes: whether multi-agent architectures beat simple baselines, and whether harness choice meaningfully changes what the same model costs and achieves.

## MAST: Why Multi-Agent LLM Systems Fail

As co-equal first author of the MAST paper (NeurIPS 2025 Datasets & Benchmarks, with [[mert-cemri|Mert Cemri]] and Shuyi Yang), Pan co-created the first empirically grounded taxonomy of multi-agent system failures — 14 failure modes in 3 categories across 1642 traces from 7 MAS frameworks, with system design responsible for the largest share (44.2%). See [[mast]] and [[mert-cemri]] for the full treatment and the [[multi-agent-illusion]] empirical corroboration.

## HarnessTax: How Much Does the Harness Matter?

Pan leads *HarnessTax* (Pan, Yang, Arabzadeh, Chiang, Stoica, Zaharia — UC Berkeley + Arena, 2026), the study behind [[harness-tax]]. Its three findings: harness choice moves cost up to 5× while moving success only ±2–5% ([[claude-code|Claude Code]] ≈ 2.0× [[pi|Pi]]'s cost at similar success); a minimal four-tool open-source harness reaches the cost-success Pareto frontier on both benchmarks tested; and models most often score their highest outside their own provider's harness (9 of 12 provider-model comparisons). The paper cites her earlier retrieval-agent work (Natural Language Query to Configuration for Retrieval Agents, arXiv 2605.27361) as prior evidence that models and system configurations should be chosen together, frames harness selection as an even more pressing instance of that problem given coding agents' usage volume, and argues users should not have to make these configuration decisions themselves.

## Thread

- [[the-multi-agent-theory]] — MAST is the thread's "why they fail" pillar; Pan is a co-equal first author of that taxonomy
- [[the-benchmark-crisis]] — HarnessTax gives the cost-blind-scoring axis a controlled cross-harness measurement
- [[tool-design-for-agents]] — HarnessTax measures the harness layer's true leverage: cost, not correctness

## Related

- [[mert-cemri]] — Co-equal first author on MAST; the taxonomy's lead co-creator
- [[mast]] — The failure taxonomy Pan co-created
- [[harness-tax]] — The concept and study this author page is anchored on
- [[pi]] / [[claude-code]] — The harness pair at the extremes of the HarnessTax cost measurement
- [[mario-zechner]] — Creator of Pi, whose minimalism thesis HarnessTax confirms with controlled multi-model data

## Sources

- `raw/harnesstax-how-much-does-the-harness-matter-for-coding-agents.md` — Lead authorship, UC Berkeley + Arena affiliation, the three HarnessTax findings, and the retrieval-agents prior work (ref [13]).
- `raw/2503.13657.md` — Co-equal first authorship of MAST with Mert Cemri and Shuyi Yang (NeurIPS 2025 Datasets & Benchmarks).
