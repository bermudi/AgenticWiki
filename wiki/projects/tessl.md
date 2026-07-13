---
title: Tessl
created: 2026-07-12
updated: 2026-07-12
sources:
  - raw/yt-steve-yegge-youll-never-write-code-the-same-way-again.md
  - raw/yt-systems-building-systems.md
unaudited_marginal: 0
tags: [project, factory, verifiers, harness, ai-native]
---

# Tessl

> AI-native development platform; productized version of a [[software-factory|software factory]]. Provides Linear / GitHub bridges, [[verifiability|verifier]]-as-focused-linting rules powered by LLMs, and the practitioner lessons (determinism at the boundary, not in the middle; built six orchestrators, ended with no plumbing) cited by [[steve-yegge|Steve Yegge]]'s 2026 panel.

## Key Components

- **Tessl app for Linear** — delegates work to the GitHub app
- **Tessl app for GitHub** — receives delegated work, kicks off CI jobs
- **Verifiers** — "very, very focused linting rules that are powered by LLMs. So it allows you to do slightly more broad, vague things, but still targeted to a specific file and a very focused check. Like every JSX element must have Aria attributes on it."

## The Orchestrator Lesson

Tessl reports having built **six different orchestrators**. "Everyone starts with a lot of plumbing and ends with no plumbing, because we always realized that it was more hassle than it was worth." The conclusion: pull back from deterministic orchestration in the middle. Give the agent the GitHub CLI and let it act; put deterministic checks at the boundaries (CI, pre-commit hooks, pre-stop-session checks) instead. See [[harness-engineering]] §"Determinism at the Boundary, Freedom in the Middle."

## Why Tessl Matters

Tessl is the practitioner complement to [[software-factory|the software factory concept]]: the wiki's synthesis: where [[eero-alvar|Eero Alvar]] (per his own source) frames the factory as a mapping from specs to software, Tessl ships the tools that make that mapping concrete. The two streams (theorist and practitioner; framework and tools) converge on the same shape: deterministic checks at boundaries, agent freedom in the middle, verifiers as the load-bearing verification layer.

## Thread

- [[the-verifiability-thesis]] — Tessl's verifier-as-focused-lint illustrates verifier-tier independence: the verifier can run on a lower capability tier than the agent

## Related

- [[steve-yegge]] — The panel co-host whose practitioner framing Tessl exemplifies
- [[software-factory]] — The factory concept Tessl productizes
- [[verifiability]] — Tessl's verifiers are the productized verifiability pattern
- [[verification-loop]] — The general verification pattern Tessl's hooks instantiate
- [[harness-engineering]] — The boundary-vs-middle determinism principle is a harness-engineering pattern
- [[factory-maintenance]] — Tessl's "find one thing each week and make it better" is the maintenance pattern in product form
- [[gsd-core]] — Another shipped factory; complementary to Tessl on the artifact-shape axis
- [[gstack]] — Garry Tan's shipped factory; complementary to Tessl on the workflow-shape axis

## Sources

- `raw/yt-steve-yegge-youll-never-write-code-the-same-way-again.md` — [[dru-knox|Dru Knox]] (head of product at Tessl) on stage at the AI Native Dev panel with Yegge (July 2026; AI Native Dev is Tessl's own channel). Source for: Tessl apps for Linear and GitHub, the verifier-as-linting concept, the six-orchestrators-then-no-plumbing lesson, the “find one thing each week” maintenance principle
- `raw/yt-systems-building-systems.md` — [[eero-alvar|Eero Alvar]]’s framing of the software factory as a mapping from spec-like inputs to finished software; the theorist complement to Tessl’s practitioner tools (referenced in the “Why Tessl Matters” synthesis)
