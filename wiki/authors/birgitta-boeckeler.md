---
title: Birgitta Boeckeler
created: 2026-06-07
updated: 2026-08-30
sources:
  - raw/yt-spec-driven-dev-hype-or-future.md
  - raw/harness-engineering-ai-literacy-superpowers.md
unaudited_marginal: 0
tags: [author, practitioner, thoughtworks, spec-driven-development]
---

# Birgitta Boeckeler

> Writer on spec-driven development methodology for ThoughtWorks / Martin Fowler's blog. Identified the spec drift problem ("most SDD workflows today are spec first, but vague about spec maintenance") and the "sledgehammer to crack a nut" critique of using full SDD for small bug fixes. Recommended by [[cian-clarke]] as further reading on SDD methodology. She is also the originator of the harness-engineering frame (three-component model, verification slots).

## Key Contributions

- **The spec drift problem.** Per `raw/yt-spec-driven-dev-hype-or-future.md`: most SDD workflows are "spec first, but vague about spec maintenance. You write a clean spec, ship the feature, then 6 months later the code has evolved, and the spec is fiction. Nobody has solved this." Tessel's response — forbid code edits — and the open-source tools' response — treat specs as disposable history — are both unsatisfying.
- **The "sledgehammer to crack a nut" critique.** For small bug fixes, using a full SDD pipeline (Kiro in particular) is overkill. The cost of the workflow exceeds the cost of the change.
- **The harness-engineering frame (originator).** Per `raw/harness-engineering-ai-literacy-superpowers.md` (the ai-literacy-superpowers plugin's explanation doc, which credits her martinfowler.com article as its primary reference): Boeckeler observed that AI assistants produce plausible code that quietly drifts — eroding conventions and internal consistency while tests stay green — and proposed the test-harness analogy as the fix: the harness does not trust, it verifies. Her three-component model: context engineering (a maintained knowledge base for the AI), architectural constraints (enforced at "verification slots"), and garbage collection (scheduled entropy-fighting). The wiki files the mechanism family at [[verification-slots]] and the term collision at [[harness-engineering]].

> [!note] Evidence gap: primary articles not preserved
> Both load-bearing Boeckeler positions in the wiki are known through secondary sources: the SDD critiques through the Devsplainers video, the harness-engineering frame through the plugin's explanation doc. Her actual martinfowler.com articles are not in `raw/`. Attribution here follows the secondary sources' crediting of her. The two filed sources also render her name differently — the video transcript phonetically as "Buckler" and the plugin doc as "Boeckeler" — and external confirmation against primary sources (martinfowler.com bylines, thoughtworks.com profile, birgitta.info, GitHub) gives the canonical byline as Birgitta Böckeler (ASCII: Birgitta Boeckeler); the wiki uses the ASCII form.

## Related

- [[spec-driven-development]] — The methodology Boeckeler critiques; see the [[spec-driven-development#Spec Drift and Maintenance|Spec Drift and Maintenance]] section for the thread's coverage of the open-source-SDD-tools "spec first, vague about spec maintenance" observation
- [[cian-clarke]] — The Near Form engineer who recommends Boeckeler's writing
- [[verification-slots]] — The mechanism family from her harness-engineering frame: verification slots, the deterministic-vs-agent choice, progressive hardening
- [[harness-engineering]] — The term her practitioner sense now collides with; the collision is documented there

## Sources

- `raw/yt-spec-driven-dev-hype-or-future.md` — Devsplainers video citing Boeckeler's writing on SDD methodology, the spec drift problem, and the sledgehammer-to-crack-a-nut critique.
- `raw/harness-engineering-ai-literacy-superpowers.md` — ai-literacy-superpowers plugin explanation doc (2026) crediting her martinfowler.com article as the primary reference: the harness-engineering frame, the test-harness analogy, the three-component model, and the verification-slot framing.
