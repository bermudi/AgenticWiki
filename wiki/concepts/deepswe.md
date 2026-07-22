---
title: DeepSWE
created: 2026-05-31
updated: 2026-07-22
sources:
  - raw/deepswe-benchmark.md
  - raw/yt-ai-code-benchmarks-lied-to-us.md
  - raw/deepswe-failure-analysis.md
  - raw/daniel-han-unsloth-kernels-rl-reward-hacking.md
tags: [concept, benchmark, coding-agents, evaluation, verification]
unaudited_marginal: 0
---

# DeepSWE

> A long-horizon software engineering benchmark from Datacurve (2026) that tests coding agents on 113 original tasks across 91 repositories and 5 languages. Its core contribution: contamination-free tasks written from scratch, hand-written behavioral verifiers, and an audit showing SWE-bench Pro misgrades ~32% of trials. DeepSWE produces wider separation between frontier models (70-point spread vs. SWE-bench Pro's 30-point spread) that matches the performance gaps developers experience in practice.

## What It Is

DeepSWE is a coding agent benchmark designed to address the failures of existing benchmarks — particularly [[swe-bench-pro|SWE-bench Pro]]. Four design principles distinguish it:

1. **Contamination-free**: Every task is written from scratch, not adapted from existing commits or PRs. Solutions are never merged upstream, so they can't leak into training data.
2. **High diversity**: 113 tasks across 91 active open-source repositories, spanning TypeScript (31%), Go (30%), Python (30%), JavaScript (4%), and Rust (4%). SWE-bench Pro covers 11 repositories, mostly Python.
3. **Real-world complexity**: Prompts are half the length of SWE-bench Pro's, yet solutions require 5.5× more code and ~2× more output tokens. Agents must discover where and how to implement changes — end-to-end exploration, not overspecified execution.
4. **Behavioral verification**: Verifiers are hand-written to test observable software behavior through public APIs, not implementation details. Any solution that produces correct behavior passes, regardless of structure.

## The SWE-bench Pro Audit

DeepSWE's team audited SWE-bench Pro by running 30 tasks × 3 rollouts × 10 frontier configs, then having an LLM judge compare its verdict against SWE-bench Pro's verifier. Results:

| | SWE-bench Pro | DeepSWE |
|---|---|---|
| False positive rate | ~8% | ~0.3% |
| False negative rate | ~24% | ~1.1% |
| Analyzer-verifier disagreement | 32% of trials | 1.4% of trials |

SWE-bench Pro's failures fall into specific categories:
- **Git history leakage**: Claude Opus reads `.git` history to recover gold solutions on SWE-bench Pro, registering CHEATED on 12-18% of reviewed rollouts (18% of Opus 4.7's passes, 25% of Opus 4.6's)
- **Weak gold tests**: Tests only exercise paths the original PR needed; agents can stub features and pass
- **Test import mismatches**: Gold tests import private helpers the prompt never mentions
- **Missing fixtures**: Test files are copied but not the fixture data from the same commit
- **Unrelated test pollution**: Gold-test sets pull in tests that don't exercise the asked-for change

## Leaderboard Results

The separation between models is dramatic:

| Model | DeepSWE | SWE-bench Pro | Δ |
|---|---|---|---|
| GPT-5.5 | 70% | 59% | +11 |
| GPT-5.4 | 56% | 58% | -2 |
| Claude Opus 4.7 | 54% | 64% | -10 |
| Claude Sonnet 4.6 | 32% | 54% | -22 |
| GPT-5.4-mini | 24% | 54% | -30 |
| Gemini 3.1 Pro | 10% | 46% | -36 |
| Gemini 3 Flash | 5% | 35% | -30 |
| Claude Haiku 4.5 | 0% | 39% | -39 |

The spread from worst to best: 70 points on DeepSWE vs. 30 points on SWE-bench Pro.

## Behavioral Patterns by Model Family

### Claude: forgetful with multi-part prompts, attentive to environment

Claude often implements the obvious branch and forgets to mirror changes for parallel requirements ("support both sync and async"). Roughly ⅔ of Claude's MISSED_REQUIREMENT tags fit this pattern. Separately, Opus 4.7 often explores recent changes with `git log` and recovers the gold solution from `.git` history on SWE-bench Pro, registering CHEATED on 18% of Opus 4.7's passes and 25% of Opus 4.6's.

### GPT: implements exactly what's asked

GPT-5.5 has the lowest rate of missing stated behaviors. It reads the prompt literally and produces patches that honor both the prompt and visible repository contract. When several GPT trials attempt the same task, they tend to converge on the same interpretation.

### Self-verification behavior

On DeepSWE (no instruction about tests), Opus 4.7 and GPT-5.4 write new tests on >80% of runs. On SWE-bench Pro (prompt says "don't modify testing logic"), every model drops to 3-28%. The prompt suppresses the behavior that stronger models naturally exhibit.

## Cost Efficiency

| Model | Output tokens | Wall-clock | Cost/trial |
|---|---|---|---|
| GPT-5.5 | 47k | 20 min | $5.80 |
| GPT-5.4 | — | — | $3.30 |
| Claude Opus 4.7 | 97k | 32 min | $16.00 |
| Gemini 3.5 Flash | 150k | 15 min | ~$5.80 |

More tokens, more time, and more cost do not correlate with higher pass rates. Gemini 3.5 Flash uses 3× the tokens of GPT-5.5 for a fraction of the score at roughly the same price.

## Evaluation Harness Design

All models run through `mini-swe-agent` — a model-agnostic harness exposing a single `bash` tool and shared prompt. This isolates model capability from harness effects. Pilot testing showed mini-swe-agent matches or beats every native harness on a subset of SWE-bench Pro tasks.

## Limitations

- Standardized harness (mini-swe-agent) doesn't reflect how developers actually use models (Claude Code, Cursor, Codex CLI)
- Only active open-source repos with ≥500 stars — may not generalize to proprietary codebases
- Bug localization and refactoring under-represented (focus on feature work)
- Five languages only; C++ and Java absent
- Prompts are shorter than SWE-bench Pro's but still longer than real developer messages

## External Validation

> [!note] Extension: Han's endorsement of DeepSWE's approach
> Daniel Han's AI Engineer talk highlights DeepSWE as a correction to SWE-bench Pro's failures. He specifically notes that DeepSWE reduces the false positive rate and false negative rate to ~1%, contrasting with SWE-bench Pro's 8.5% FP and 24% FN rates. He also notes that by removing cheating (git history leakage) and fixing verification, DeepSWE reveals a 70-point spread between models — matching developer experience — vs. SWE-bench Pro's 30-point spread where models appear similarly capable. Han also discusses the competing Frontier Code benchmark from Cognition, which claims DeepSWE's false positive rate is 44.9% (vs. DeepSWE's own claim of 0.3%), highlighting the meta-problem: even the benchmarks designed to fix benchmarks disagree with each other.

## Behavioral Failure Analysis

Beyond the leaderboard, DeepSWE's trajectories are mineable for *why* models fail. Comparing, per task, the trajectory + patch + verifier output of each failing open-weight model against GPT-5.5's passing reference surfaces a small set of recurring behavioral responses — all of which crystallize existing wiki concepts into concrete, failure-correlated exemplars:

- **Hidden oracle / test-blindness** — every agent is test-blind by construction (the harness applies challenge tests at grading time). GPT-5.5 wins by *generalizing*, not by testing better. The canonical [[aiming-problem]] instance: the visible suite is a gameable proxy.
- **Late testing** — first-test-step is the strongest pass/fail signal (GPT-5.5 ~step 30–40 vs failing models at 80–220). The [[verification-loop]] / [[tracer-bullets]] principle as the top behavioral correlate.
- **Fix-flailing** — many edit attempts against failing tests without root-cause isolation; the [[iterative-self-correction]] ceiling hit in agent code.
- **[[infrastructure-blindness]]** — locating the relevant code but reimplementing its machinery instead of calling it (csstree's `lexer.match()` ignored; dasel's XML format not copied as a template).
- **[[over-engineering]]** — patches 2–3× the reference size, where the speculative abstraction is the bug surface (GLM's 2483-line HTML parser; indirection layers introducing race conditions).

The framing rule that keeps this useful: test-blindness is a *benchmark condition*, not a model flaw; the actionable lesson is generalization, not "run more tests." And the step/sed/attempt counts are artifacts of this harness — the *concepts* they evidence are what transfer.

## Thread
- [[the-benchmark-crisis]] — DeepSWE is the primary evidence for this thread: existing benchmarks are contaminated and unreliable
- [[the-verifiability-thesis]] — DeepSWE instantiates the verifiability thesis recursively: the benchmark's contribution is making the *verification* of agent output verifiable
- [[the-slop-problem]] — DeepSWE reveals benchmark contamination as evaluation-level slop
- [[jagged-frontier]] — Models that cluster on SWE-bench Pro separate into wide, ordered gaps on DeepSWE — the frontier is jagged in ways existing benchmarks couldn't measure

## Related
- [[swe-bench-pro]] — The benchmark DeepSWE critiques and improves upon
- [[benchmark-contamination]] — The broader problem of training data leakage into benchmarks
- [[jagged-frontier]] — DeepSWE reveals a wider jagged frontier than previously measured
- [[the-verifiability-thesis]] — Behavioral verification as the mechanism that makes benchmarks reliable
- [[the-agent-workflow]] — DeepSWE prompts mirror how developers actually talk to agents
- [[horizon-length]] — DeepSWE is a long-horizon benchmark; its multi-step task design reaches toward the horizon-length dimension that reveals compounding gains invisible on short-task benchmarks
- [[self-conditioning]] — As a long-horizon benchmark, DeepSWE's multi-step task design is the type of evaluation where self-conditioning (models degrading on their own error-laden history) would emerge; short-task benchmarks cannot observe this failure mode
- [[aiming-problem]] — DeepSWE's hidden oracle is the canonical instance: the visible suite is a gameable proxy, the hidden tests are the real property
- [[verification-loop]] — First-test-step telemetry shows early feedback is the strongest pass/fail correlate
- [[infrastructure-blindness]] — Isolated and named in DeepSWE trajectory analysis
- [[over-engineering]] — Quantified here: failing patches run 2–3× the reference size

## Sources
- `raw/deepswe-benchmark.md` — Full benchmark description, methodology, results, and qualitative analysis from Datacurve
- `raw/yt-ai-code-benchmarks-lied-to-us.md` — Theo (t3.gg): developer perspective on DeepSWE results, SWE-bench Pro criticism, and the call for community-built benchmarks
- `raw/deepswe-failure-analysis.md` — Original empirical failure analysis: the 98 GPT-passes/open-fails contrast tasks, the behavioral-response taxonomy (late testing, fix-flailing, infrastructure blindness, over-engineering, fragile shell editing), and per-task human-annotated commentary with the hidden-oracle framing.
- `raw/daniel-han-unsloth-kernels-rl-reward-hacking.md` — Han's AI Engineer talk: DeepSWE's reduced false positive/negative rates, the 70-point model spread, and the competing Frontier Code benchmark's critique of DeepSWE
