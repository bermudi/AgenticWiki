---
title: Yizhe Xie
created: 2026-07-03
updated: 2026-07-03
sources:
  - raw/2603.04474-spark-to-fire-error-cascades.md
tags: [author, researcher, multi-agent, error-propagation, security, graph-dynamics]
unaudited_marginal: 0
---

# Yizhe Xie

> Lead author (with Congcong Zhu and Xinyue Zhang, equal contribution) of *From Spark to Fire: Modeling and Mitigating Error Cascades in LLM-Based Multi-Agent Collaboration* (arXiv 2603.04474v2, May 2026). Researcher at the Faculty of Data Science, City University of Macau (with Minzu University of China affiliation). Co-authored the [[error-cascades|propagation-dynamics model]] for LLM-MAS and the [[genealogy-governance|genealogy-based governance layer]].

## Work

- **[[error-cascades|Error Cascades in LLM-MAS]]** (Xie, Zhu, Zhang, Zhu, Ye, Qi, Chen, Zhou, 2026): the propagation-dynamics model that abstracts LLM-MAS collaboration as a directed dependency graph and shows that a single atomic falsehood becomes system-level false consensus under iterative context reuse. Identifies three endogenous vulnerability classes (cascade amplification, topological fragility, consensus inertia) and the risk criterion R ≈ βρ(A)/δ. Demonstrates a single-injection attack reaching up to 100% false consensus across six mainstream frameworks.
- **[[genealogy-governance|Genealogy-Based Governance Layer]]** (same paper): the message-layer defense — atomic-claim decomposition, Lineage Graph, tri-state screening, blocking with rollback — that prevents final infection in ≥89% of runs without altering the collaboration architecture.

## Affiliations & Collaborators

Faculty of Data Science, City University of Macau (with Wanlei Zhou, Tianqing Zhu, Dayong Ye, Minfeng Qi, Huajie Chen). Co-authors include Congcong Zhu and Xinyue Zhang (Minzu University of China, joint affiliation). The work sits in the security-and-privacy tradition applied to LLM-MAS — extending single-agent adversarial and provenance techniques to the multi-agent collaboration layer.

## Related

- [[error-cascades]] — the propagation-dynamics model
- [[genealogy-governance]] — the defense layer
- [[mast]] — the failure taxonomy the propagation model supplies the mechanism for
- [[multi-agent-illusion]] — the audit the propagation model mechanistically explains
- [[the-multi-agent-theory]] — the thread that traces the full six-paper theory; Xie's work is Layers 4 and 6 (the mechanism and the defense)

## Sources

- `raw/2603.04474-spark-to-fire-error-cascades.md` — Xie, Zhu, Zhang, Zhu, Ye, Qi, Chen, Zhou (City University of Macau + Minzu University of China, arXiv 2603.04474v2, 11 May 2026). Lead author (equal contribution with Congcong Zhu and Xinyue Zhang). Co-designed the propagation-dynamics model (§II), the threat model (§III), the endogenous-vulnerability analysis (§IV), the attack instantiation (§V), and the governance-layer defense (§VI).
