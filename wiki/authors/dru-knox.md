---
title: Dru Knox
created: 2026-07-12
updated: 2026-07-12
sources:
  - raw/yt-steve-yegge-youll-never-write-code-the-same-way-again.md
unaudited_marginal: 0
tags: [author, practitioner, agentic-engineering, factory, verifiability, harness]
---

# Dru Knox

> Head of product at [[tessl|Tessl]]; the Tessl voice on [[steve-yegge|Steve Yegge]]'s July 2026 AI Native Dev panel. Former Chrome / web-platform PM, web-standards contributor, and former research scientist at Grammarly. On the panel he contributed the practitioner patterns now filed under [[factory-maintenance]], [[harness-engineering]], and Tessl's verifier-as-lint concept.

## Background

Introduced on the panel as head of product at Tessl, with a background as a Chrome and web-platform PM, deep work in web standards, a stint as a research scientist at Grammarly, and a startup of his own. The panel is the wiki's only source on him so far; this page is thin by design and will grow as his attributed work accumulates.

## Contributions (via the panel)

The panel transcript carries no speaker labels, so these are attributed to Dru as Tessl's representative voice — the practice is Tessl's, filed in detail under the concept pages below:

- **The "fix the harness before leaving the comment" rule** — Before leaving a comment on a PR, rewind at least once and make a change (a skill, a unit test, an architectural fix) that could have prevented the agent's mistake, then try again. Filed on [[factory-maintenance]].
- **The six-orchestrators-then-no-plumbing lesson** — Tessl built six different orchestrators; "everyone starts with a lot of plumbing and ends with no plumbing." Determinism belongs at the boundaries (CI, pre-commit, pre-stop hooks), not in the orchestration middle. Filed on [[harness-engineering]] and [[tessl]].
- **Verifier-as-focused-linting** — Tessl's verifiers are "very, very focused linting rules that are powered by LLMs": broader than a linter, but scoped to a single file and a single concern (e.g. "every JSX element must have Aria attributes"). The practitioner middle ground between [[dex-horthy|Horthy]]'s "never send an AI to do a linter's job" and unconstrained LLM-as-judge. Filed on [[tessl]].
- **"Find one thing each week"** — Tessl's maintenance philosophy in product form: pick one recurring task each week and ask whether an agent could do it (bump versions, run mutation testing, de-flake tests). Filed on [[tessl]].

## Thread

- [[the-human-lever]] — The fix-the-harness rule relocates the human lever from per-PR correction to factory infrastructure
- [[the-verifiability-thesis]] — Verifier-as-lint is the productized verifier tier; Tessl down-tiered verifiers relative to agents
- [[the-multi-agent-theory]] — The six-orchestrator lesson is practitioner evidence that deterministic orchestration is a brittleness source

## Related

- [[tessl]] — The product he represents; his contributions are filed here in detail
- [[steve-yegge]] — Panel host; the fix-the-harness rule is shared across the panel
- [[factory-maintenance]] — The ongoing-hygiene principle his fix-the-harness rule instantiates
- [[harness-engineering]] — The boundary-vs-middle determinism pattern from the six-orchestrator lesson
- [[dex-horthy]] — The "never send an AI to do a linter's job" principle Tessl's verifier-as-lint departs from

## Sources

- `raw/yt-steve-yegge-youll-never-write-code-the-same-way-again.md` — Dru Knox (head of product at Tessl) on the AI Native Dev panel with Steve Yegge (July 2026). Source for: his background (Chrome/web-platform PM, web standards, Grammarly research scientist, startup founder), the fix-the-harness rule, the six-orchestrators-then-no-plumbing lesson, verifier-as-focused-linting, the "find one thing each week" maintenance principle. Note: transcript carries no speaker labels; attributions are by panel role (Tessl's representative voice).
