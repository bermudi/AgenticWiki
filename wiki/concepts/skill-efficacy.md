---
title: Skill Efficacy
created: 2026-07-09
updated: 2026-07-09
sources:
  - raw/yt-l8-principal-s-agentic-engineering-workflow.md
unaudited_marginal: 0
tags: [concept, agent-skills, evals, quality, agent-tooling]
---

# Skill Efficacy

> The empirical claim that a skill's popularity (GitHub stars, viral adoption) is not a reliable proxy for whether it makes an agent perform better. Skills should be evaluated by their measured effect on agent tasks, not by their popularity.

## The Popularity Trap

Kun Chen argues that the agent ecosystem is replicating a pattern where widely shared skills become perceived as good because they are widely shared, not because they have been rigorously tested. Two reasons this matters:

1. **Security risk** — Skills can instruct agents to run arbitrary code on the user's machine. A popular skill that exfiltrates API keys or credentials is a mass-exploitation surface.
2. **Performance risk** — A skill can degrade the agent's output while still costing more tokens.

## Example: Android Skills

Kun cites the "Android Skills" repository (177,000 GitHub stars) as a caution. He reports evaluating one skill from that repo with Program Bench and finding that the agent used **5% more tokens and produced worse results** when using the skill. He also notes the repo is not authored by the person it is popularly associated with (Andrej Karpathy). The point is not to attack the repo, but to show that star count is a measure of popularity, not of efficacy.

## Heuristic

Kun's rule of thumb: do not install a skill from the internet that claims to "magically make your agent perform better" unless it has published rigorous evidence supporting the claim.

## Thread

- [[agent-skills]] — Skill efficacy is the eval/evaluation side of the skills concept; it complements the format and progressive-disclosure design.
- [[agent-evals]] — The eval pattern for skills is a concrete A/B test with and without the skill.
- [[agent-quality-engineering]] — Untested skills are a quality risk that the quality infrastructure must catch.
- [[the-benchmark-crisis]] — The benchmark-crisis thread documents why popular evals and signals can be unreliable; skill popularity is a sibling case.

## Related

- The concept is named here as skill efficacy (not "skill popularity fallacy").
- [[context-files]] — Like skills, context files can be well-designed or poorly-designed; the same empirical discipline applies.
- [[agent-friendly-tooling]] — AXI tools are an example of agent tools that are evaluated by efficiency metrics rather than adoption.
- [[kun-chen]] — Source of the heuristic and the Android Skills example.

## Sources

- `raw/yt-l8-principal-s-agentic-engineering-workflow.md` — Warning against installing random skills, the Android Skills benchmark, the 177k-star / Program Bench result, and the popularity-vs-efficacy distinction.
