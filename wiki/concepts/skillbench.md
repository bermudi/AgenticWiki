---
title: SkillBench
created: 2026-08-02
updated: 2026-08-02
sources:
  - raw/dont-ship-skills-without-evals-philipp-schmid.md
unaudited_marginal: 0
tags: [concept, benchmark, agent-skills, evaluation, skill-efficacy]
---

# SkillBench

> A benchmark for evaluating agent skills across coding and productivity tasks. SkillBench 1.1 reports ~15% average improvement from skills across ~100 tasks, and finds that human-written skills outperform AI-generated ones — which can actively hurt performance. The benchmark indexes over 50,000 skills and found that almost none had evals.

> [!warning] Evidence gap: single-source summary
> The claims on this page are sourced from [[philipp-schmid|Philipp Schmid]]'s talk summary of SkillBench, not from the benchmark's own paper or documentation. The ~15% figure, the ~100-task count, the 50,000-skill index, and the human-vs-AI-generated comparison are all Schmid's characterizations. The benchmark has a public website and leaderboard (not yet ingested); a future source should verify these figures against the primary artifact.

## What SkillBench Measures

[[philipp-schmid|Schmid]] (AI Engineer, 2026) describes SkillBench as a benchmark that evaluates open and closed models across different harnesses on skill-augmented tasks. Key characteristics:

- **Scope**: ~100 tasks spanning coding and productivity across different languages.
- **Skill index**: over 50,000 skills indexed (from "it up" — likely a skill repository), with almost none carrying evals and most being AI-written and untested.
- **Availability**: openly available with a website, leaderboard, and community contributions.

## Headline Finding: Skills Work (~15%)

SkillBench 1.1 shows that skills improve performance by roughly **15% on average** across the ~100-task suite. This is the empirical baseline for the claim that [[agent-skills|skills work]] — moving the question from "do skills help?" to "which skills help, and how much?"

## AI-Generated vs Human-Written Skills

Schmid reports a second SkillBench analysis comparing AI-generated skills (produced by asking a coding agent to write a `skill.md`) against human-written skills:

- **Human-written skills are the best** — the strongest performers in the benchmark.
- **AI-generated skills can hurt performance** — they are not merely weaker; they can actively degrade agent outcomes.
- **`skill.md` files should be below 500 lines** — longer skills correlate with worse performance.

This finding corroborates the [[skill-efficacy|popularity-is-not-efficacy]] warning from [[kun-chen|Kun Chen]] (the Android Skills example: 177k stars, 5% more tokens, worse results) and the [[agent-skills#The Anti-Pattern: Over-Prescription|over-prescription anti-pattern]] documented by Nisi (his Next.js installer skill made Claude 30% less accurate). The mechanism Schmid identifies is distinct: AI-generated skills tend to include [[agent-skills#4. Pruning — No-Ops, Sediment, Single Source of Truth|no-ops]] — instructions that do nothing to change agent behavior — and these accumulate because the agent-author pads the skill with plausible-sounding directives.

## Relationship to the Skill-Efficacy Debate

SkillBench provides the empirical anchor for several claims already in the wiki:

| Existing wiki claim | SkillBench contribution |
|---|---|
| [[skill-efficacy|Popularity is not efficacy]] (Kun Chen) | Corroborates: most popular skills are AI-written, untested, and can hurt |
| [[agent-skills#The Anti-Pattern: Over-Prescription|Over-prescription hurts]] (Nisi) | Corroborates: AI-generated skills (which tend to over-prescribe) can hurt |
| [[skill-md]] < 500 lines guidance | Provides the empirical source for the specific line count |
| [[skill-hell|Skill hell]] diagnosis (Pocock) | Quantifies the problem: 50,000 skills, almost none evaled |

## Thread

- [[agent-quality-engineering]] — SkillBench is the benchmark layer for skill-specific quality engineering; the ~15% figure is the evidence that skills are worth evaluating
- [[the-benchmark-crisis]] — SkillBench is a domain-specific benchmark (skills) rather than a general coding benchmark; its findings are in-distribution for skill evaluation

## Related

- [[agent-skills]] — The concept SkillBench benchmarks; the ~15% improvement and human-vs-AI findings are cited there
- [[skill-efficacy]] — SkillBench provides the empirical basis for the popularity-vs-efficacy warning
- [[skill-md]] — The < 500-line guidance originates from SkillBench findings
- [[skill-hell]] — SkillBench quantifies the skill-hell problem (50,000 skills, almost no evals)
- [[philipp-schmid]] — The source who cited SkillBench in his talk
- [[agent-evals]] — SkillBench is the benchmark; Schmid's eval harness is the practitioner-level instantiation

## Sources

- `raw/dont-ship-skills-without-evals-philipp-schmid.md` — [[philipp-schmid|Schmid]] (AI Engineer, 2026) cites SkillBench 1.1: ~15% average improvement across ~100 tasks, 50,000+ indexed skills with almost no evals, human-written > AI-generated (which can hurt), < 500-line guidance. **Note:** These are Schmid's summary characterizations from a talk, not the benchmark's own publication. The benchmark has a public website and leaderboard not yet ingested as a source.
