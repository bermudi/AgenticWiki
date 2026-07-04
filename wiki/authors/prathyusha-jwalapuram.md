---
title: Prathyusha Jwalapuram
created: 2026-06-18
updated: 2026-07-03
sources:
  - raw/the-illusion-of-multi-agent-advantage.txt
tags: [author, researcher, salesforce-research, multi-agent-evaluation, mas-audit]
unaudited_marginal: 0
---

# Prathyusha Jwalapuram

> Project lead on *The Illusion of Multi-Agent Advantage* (arXiv 2606.13003v2, 13 Jun 2026), a Salesforce Research audit of six representative automated Multi-Agent System (MAS) frameworks against single-agent Chain-of-Thought with Self-Consistency. Co-authored with Hehai Lin (HKUST-GZ) and a team spanning UBC, NTU, and Salesforce Research.

## Contribution

Lead author of the first systematic, cost-controlled audit of automated MAS frameworks. The paper's core finding — that automated MAS do not consistently outperform single-agent CoT-SC, often at up to 10× the cost — is a methodological correction to a literature where prior MAS-vs-SAS comparisons rarely controlled for inference budget.

The paper introduced three concepts now in the wiki:

- [[multi-agent-illusion]] — the umbrella finding (the gap between theoretical MAS advantage and measured cost-quality Pareto)
- [[smfr]] — a diagnostic benchmark (Synthetic Multi-Hop Financial Reasoning) that exposes the gap under conditions where MAS *should* help
- [[architectural-bloat]] and [[functional-collapse]] — the two named failure modes that explain the gap (complex MAS structures that collapse to single-agent execution)
- [[expert-mas]] — a hand-designed, deterministic, code-driven multi-agent baseline that demonstrates the multi-agent paradigm *can* work — the experimental lever for the claim that the failure is in automated search, not in multi-agent coordination itself

## Significance to the Wiki

The audit is one of the strongest negative results in the agent engineering literature to date. The wiki's existing pages on multi-agent coordination ([[multi-agent-code-orchestration]], [[recursive-agent-harness]], [[harness-mechanisms]]) catalog the topology taxonomy optimistically; this paper is the empirical correction. The contrast between automated MAS failure and [[expert-mas|hand-designed]] success refines the wiki's understanding of when multi-agent coordination actually works.

The paper also connects to [[the-benchmark-crisis]]: SMFR is a benchmark built to *avoid* the standard benchmark failure modes (contamination, verifier failure, prompt distortion) and still exposes the MAS cost-inefficiency. The benchmark crisis and the multi-agent illusion are connected — the same evaluation methodology that fails to detect benchmark contamination also fails to detect [[architectural-bloat|architectural bloat]].

## Co-Authors

- **Hehai Lin** (HKUST-GZ) — equal contribution first author
- **Chuyuan Li** (UBC)
- **Fangkai Jiao** (NTU)
- **Sudong Wang** (HKUST-GZ)
- **Yifei Ming** (Salesforce Research)
- **Zixuan Ke** (Salesforce Research) — project lead
- **Chengwei Qin** (HKUST-GZ)
- **Giuseppe Carenini** (UBC)
- **Shafiq Joty** (Salesforce Research) — project advisor

## Methodological Significance

The paper's most replicable contribution is its evaluation protocol:

- **Cross-backbone**: GPT-4o, GPT-5, GPT-OSS-120B, Gemini-2.5-Pro
- **Cross-benchmark**: HLE-Math, GPQA-Diamond, SWE-Bench Lite, BrowseComp-Plus, SMFR
- **Cross-framework**: 6 representative frameworks spanning inference-time and pre-optimized approaches
- **Cost-controlled**: cost multipliers reported per result, not just accuracy
- **Architecturally deconstructed**: motif analysis, ablation, positional-bias audit, operator activation distribution

The future MAS evaluation the paper implies is one that controls for inference budget, ablates for structural contribution, and reports the cost-quality Pareto position — not just the accuracy number.

## Thread

- [[the-benchmark-crisis]] — the SMFR diagnostic is built to avoid the standard benchmark failure modes
- [[the-verifiability-thesis]] — the paper's mechanistic-interpretability criterion for MAS is verifiability at the architecture level

## Related

- [[multi-agent-illusion]] — the paper's central finding
- [[smfr]] — the diagnostic benchmark introduced
- [[expert-mas]] — the hand-designed baseline
- [[architectural-bloat]] and [[functional-collapse]] — the named failure modes
- [[the-verifiability-thesis]] — the broader principle the paper's "structural fidelity" proposal extends
- [[multi-agent-code-orchestration]] — the topology taxonomy the paper audits
- [[the-multi-agent-theory]] — the thread that traces the full six-paper theory; Jwalapuram's work is Layer 1 (the audit)

## Sources

- `raw/the-illusion-of-multi-agent-advantage.txt` — Salesforce Research + HKUST-GZ + UBC + NTU (2026). *The Illusion of Multi-Agent Advantage.* arXiv 2606.13003v2, 13 Jun 2026. Correspondence: pjwalapuram@salesforce.com, hlin709@connect.hkust-gz.edu.cn, zixuan.ke@salesforce.com, sjoty@salesforce.com.
