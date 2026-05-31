---
title: DeepSWE
created: 2026-05-31
updated: 2026-05-31
sources:
  - raw/deepswe-benchmark.md
  - raw/yt-ai-code-benchmarks-lied-to-us.md
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

## Sources
- `raw/deepswe-benchmark.md` — Full benchmark description, methodology, results, and qualitative analysis from Datacurve
- `raw/yt-ai-code-benchmarks-lied-to-us.md` — Theo (t3.gg): developer perspective on DeepSWE results, SWE-bench Pro criticism, and the call for community-built benchmarks
