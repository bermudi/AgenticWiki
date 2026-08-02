---
title: Philipp Schmid
created: 2026-08-02
updated: 2026-08-02
sources:
  - raw/dont-ship-skills-without-evals-philipp-schmid.md
unaudited_marginal: 0
tags: [author, google-deepmind, agent-skills, evals, gemini]
---

# Philipp Schmid

> Engineer on the Google DeepMind team working on the Gemini API and agents. His talk "Don't Ship Skills Without Evals" (AI Engineer, 2026) introduces the capability-vs-preference skill taxonomy, the agents-we-use-vs-agents-we-build distinction, and Google DeepMind's internal practice of regression-gating every skill diff against an eval suite.

## Overview

Philipp Schmid is based in Germany and is part of the Google DeepMind team, primarily working on the Gemini API and agents. His AI Engineer talk (2026) is a practitioner-focused argument that skills without evals are unshippable, grounded in [[skillbench|SkillBench]] empirical results and Google DeepMind's internal skill-evaluation practice.

## Key Contributions

### Capability vs Preference Skills

Schmid introduces a two-kind taxonomy of agent skills (see [[agent-skills]]):

- **Capability skills** teach models something they cannot yet do consistently (e.g., tracing logs, creating a React app). These are *temporary* — as models improve, the skills become retirable. Evals tell you when.
- **Preference skills** encode team- or company-specific knowledge (workflows, style, domain conventions). These are *durable* — foundation models are unlikely to integrate knowledge specific to your use case, so the skills persist and must be protected with evals against agent degradation.

This distinction maps onto the retirement question: capability skills have a natural end-of-life; preference skills do not.

### Agents We Use vs Agents We Build

Schmid draws a sharp line between two deployment contexts that determine which skills matter:

- **Agents we use** (Cursor, Claude Code, etc.): the engineer has skill context. If the agent fails to invoke a skill, the engineer notices, stops, and reprompts or uses slash commands. User-invoked skills are viable here.
- **Agents we build** (customer-facing agents): customers have no skill awareness. They do not start prompts with "use the refund skill." Only model-invoked skills matter, and the skill description is the sole trigger mechanism — making description quality the critical failure surface.

This sharpens the [[agent-skills#Pocock's Skill Design Checklist|model-invoked vs user-invoked]] distinction already in the wiki: Pocock's preference for user-invoked skills is valid for "agents we use"; for "agents we build," the model-invoked path is the only option, and its unreliability must be managed through evals, not avoided through user invocation.

### SkillBench Empirical Results

Schmid cites [[skillbench|SkillBench]] 1.1 as evidence that skills work: ~15% average improvement across ~100 tasks. He adds two findings from SkillBench's analysis of AI-generated skills: human-written skills outperform AI-generated ones, and AI-generated skills can *hurt* performance. He also reports the < 500-line guidance for `skill.md` files as a SkillBench finding.

### Skill-Specific Eval Practices

Schmid details a practical eval harness built for the Gemini Interactions API skill: 117 test cases in a JSON file (prompt, language, `should_trigger`, expected checks), run through a Python script invoking Gemini CLI, with regex assertions for deterministic checks (correct SDK, model, methods; no old patterns) and [[llm-as-code-judge|LLM-as-judge]] for complex cases. The skill improved valid-code generation to ~90%.

### Google DeepMind Internal Practice

Schmid describes Google DeepMind's internal skill-evaluation practice: evals alongside every skill, run on every skill diff, regression-gated — a change to a skill is not merged unless it improves the eval or adds new ones. This is the skill-level instantiation of the [[agent-quality-engineering|quality engineering]] thread's regression-prevention principle.

### Ten Best Practices for Skill Evals

Schmid's ten best practices (see [[agent-evals]]): the skill description is critical (~50% of failures from mis-triggering); directives over passive information; include negative tests; start small (10–20 samples); test outcomes not paths (don't test whether the skill loads on turn 1); isolated runs (agents cheat by reading prior context); run >1 trial (2–6, non-determinism); test across harnesses (Cursor vs Claude vs Gemini vs Codex); keep evals after retiring skills (to detect degradation and reintroduce); ablation tests (with/without skill).

## Related

- [[agent-skills]] — The capability-vs-preference taxonomy and the agents-we-use-vs-build distinction extend the skill design craft
- [[skillbench]] — The benchmark he cites for skill efficacy evidence
- [[agent-evals]] — His skill-specific eval practices and the ten best practices
- [[agent-quality-engineering]] — Google DeepMind's regression-gated skill diffs are a skill-level quality loop
- [[skill-hell]] — His "don't ship skills without evals" message is the eval-first corollary to Pocock's design-rubric diagnosis
- [[matt-pocock]] — Schmid credits "Matt" for the no-ops skill work; the wiki identifies this as Matt Pocock (TypeScript educator, already attributed for no-ops in [[agent-skills]])

## Sources

- `raw/dont-ship-skills-without-evals-philipp-schmid.md` — "Don't Ship Skills Without Evals" (AI Engineer, 2026). Single-speaker talk. Introduces the capability-vs-preference skill taxonomy, the agents-we-use-vs-agents-we-build distinction, SkillBench 1.1 results (~15% improvement, human-written > AI-generated, < 500 lines), eight writing tips, the Gemini Interactions API eval harness (117 test cases, regex + LLM-as-judge), Google DeepMind's regression-gated skill-eval practice, and ten best practices for skill evals.
