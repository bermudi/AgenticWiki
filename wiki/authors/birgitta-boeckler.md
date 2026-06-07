---
title: Birgitta Boeckler
created: 2026-06-07
updated: 2026-06-08
sources:
  - raw/yt-spec-driven-dev-hype-or-future.md
unaudited_marginal: 0
tags: [author, practitioner, thoughtworks, spec-driven-development]
---

# Birgitta Boeckler

> Writer on spec-driven development methodology for ThoughtWorks / Martin Fowler's blog. Identified the spec drift problem ("most SDD workflows today are spec first, but vague about spec maintenance") and the "sledgehammer to crack a nut" critique of using full SDD for small bug fixes. Recommended by [[cian-clarke]] as further reading on SDD methodology.

## Key Contributions

- **The spec drift problem.** Per `raw/yt-spec-driven-dev-hype-or-future.md`: most SDD workflows are "spec first, but vague about spec maintenance. You write a clean spec, ship the feature, then 6 months later the code has evolved, and the spec is fiction. Nobody has solved this." Tessel's response — forbid code edits — and the open-source tools' response — treat specs as disposable history — are both unsatisfying.
- **The "sledgehammer to crack a nut" critique.** For small bug fixes, using a full SDD pipeline (Kiro in particular) is overkill. The cost of the workflow exceeds the cost of the change.

## Related

- [[spec-driven-development]] — The methodology Boeckler critiques
- [[spec-driven-development]] — The methodology Boeckler critiques; see the [[spec-driven-development#Spec Drift and Maintenance|Spec Drift and Maintenance]] section for the thread's coverage of the open-source-SDD-tools "spec first, vague about spec maintenance" observation
- [[cian-clarke]] — The Near Form engineer who recommends Boeckler's writing

## Sources

- `raw/yt-spec-driven-dev-hype-or-future.md` — Devsplainers video citing Boeckler's writing on SDD methodology, the spec drift problem, and the sledgehammer-to-crack-a-nut critique.
