---
type: web
url: https://deepswe.datacurve.ai/blog
title: "DeepSWE: Measuring frontier coding agents on original, long-horizon engineering tasks"
author: "Wenqi Huang, Charley Lee, Leonard Tng, Serena Ge (Datacurve)"
date: 2026-05-26
ingested: 2026-05-31
---

# DeepSWE

DeepSWE is a long-horizon software engineering benchmark that delivers four major advances over today's public benchmarks:

-   **Contamination free**: Tasks are written from scratch, not adapted from existing commits or PRs, so no model has seen the solution during pretraining.
-   **High diversity**: Tasks span a broad pool of 91 repositories across 5 languages.
-   **Real-world complexity**: Prompts are half the length of SWE-bench Pro's, yet solutions require 5.5x more code and ~2x more output tokens.
-   **Reliable verification**: Verifiers are hand-written to test software behavior rather than implementation details.

Existing benchmarks fall short on several of these axes. SWE-bench Pro, the leading agentic coding benchmark, has tasks averaging just 120 lines of code to solve, and our audit found its verifier misgrades agent outputs at rates of 8% false positives and 24% false negatives. Frontier labs are also raising growing concerns about benchmark contamination.

By contrast, DeepSWE produces a sharper comparison of frontier coding agents. Models that appear close together on public benchmarks separate into wide, ordered gaps that match the differences developers see in day-to-day agent workflows.

## DeepSWE Leaderboard

Snapshot from publication, May 26, 2026. See latest results.
All models run on mini-swe-agent for consistency. Read more.

## Explore

View the benchmark on GitHub, browse every rollout behind the numbers above, or run your own agent against the benchmark.

GitHub → Browse trajectories → Run DeepSWE →

## Overview

### 1. Long-horizon work, realistic and short prompts

DeepSWE prompts are aligned with the way developers talk to their agents: behavior-focused, short, and free of large interface-definition blocks, rather than overly verbose and prescriptive. Agents must discover where and how to implement the change, so a substantial share of the capabilities being evaluated involve end-to-end exploration instead of just the execution of an overspecified engineering task.

Public benchmarks sourced from GitHub issues and pull requests often carry more detail: reproduction steps, additional context, code snippets, and tests that assume specific symbols or signatures. DeepSWE instead scores observable behavior, which lets prompts stay short and natural even when the underlying tasks are substantially longer.

### 2. Broad repository coverage

DeepSWE contains 113 tasks spanning 91 active open-source repositories across 5 languages: TypeScript, Go, Python, JavaScript, and Rust. Sampling at this scale makes DeepSWE a much stronger proxy for the real-world utilities of coding agents: whether they can make useful, well-scoped changes across varied codebases with different levels of structure, documentation, and maintenance.

Existing public benchmarks are much more concentrated. SWE-Bench Pro Public spans 11 repositories, and SWE-Bench Verified spans 12, with many tasks drawn from prominent, heavily maintained projects.

### 3. Novel tasks test problem-solving, not recall

Every DeepSWE task is original: the reference solution is written from scratch rather than copied or adapted from an existing pull request, commit, or public patch. Some tasks are motivated by unresolved GitHub issues, but the fix itself is new. DeepSWE tasks are also never merged back into the upstream repositories, so they do not enter the public GitHub record and are unlikely to appear in future pre-training corpora scraped from open source.

This makes DeepSWE a cleaner test of whether an agent can solve a novel software engineering problem, rather than recall, retrieve, or rediscover a public fix.

### 4. Verifiers reward correctness across many valid implementations

A benchmark is only as good as its verifier. In SWE benchmarks, the verifier should approximate the task's behavioral specification: it should determine whether the submitted code implements the requested change, while remaining agnostic to the particular implementation strategy. DeepSWE's verifiers are purpose-written from the task description with this goal in mind, and will accept any solution that implements the requested behavior.

To quantify this, we drew 30 tasks at random from DeepSWE and SWE-Bench Pro and ran 3 rollouts across 10 frontier agent configurations. An LLM then analyzed each trajectory along with the task definition, reference solution and verifier output and then issued an independent verdict on whether the patch actually implemented the requested behavior.

-   **False positives:** the verifier passed but the AI judge concludes the patch does not actually implement the requested behavior.
-   **False negatives:** the verifier failed but the AI judge concludes the patch is a reasonable solution to the prompt.

The analyzer disagreed with the SWE-Bench Pro verifier on 32% of trials and with the DeepSWE verifier on 1.4%.

## Methodology

### Repository selection

Repositories must be public, actively maintained, hold at least 500 GitHub stars, and be released under a permissive open-source license.

### Task construction

Every task ships three artifacts: the prompt the agent reads, an executable verifier that grades the result, and a reference solution used during review. The verifier extends the repository's own test infrastructure with new files exercising the requested behavior. Tests assert through public APIs and observable outputs, not through private helpers or internal states.

### Quality Assurance

A task is included only after both LLM-assisted analysis and independent human review. Reviewers evaluate each task along four dimensions:

1.  **Prompt-verifier bijection.** The verifier should test exactly the behavior the prompt asks for, no more, no less.
2.  **Acceptance breadth.** The verifier should accept any reasonable implementation of the requested behavior, not just the reference.
3.  **Realism.** Prompt realism (natural developer register) and task realism (a maintainer might plausibly accept as a contribution).
4.  **Environment Cleanliness.** Reviewers inspect for environment errors, dependency issues, flaky tests.

### Evaluation harness

Every run uses `mini-swe-agent`, the harness the SWE-bench authors built. We hold it fixed across every model so the leaderboard reflects model capability, not the scaffolding around it.

On this slice `mini-swe-agent` matches or beats every native harness at comparable token cost.

## Results

### Wider separation between frontier agents

DeepSWE pass rates span 70% from worst to best; publicly reported SWE-Bench Pro pass rates span only 30%.

- GPT-5.5: DeepSWE 70% vs SWE-Bench Pro 59%
- Claude Opus 4.7: DeepSWE 54% vs SWE-Bench Pro 64%
- GPT-5.4: DeepSWE 56% vs SWE-Bench Pro 58%
- Claude Sonnet 4.6: DeepSWE 32% vs SWE-Bench Pro 54%
- GPT-5.4-mini: DeepSWE 24% vs SWE-Bench Pro 54%
- Gemini 3.1 Pro: DeepSWE 10% vs SWE-Bench Pro 46%
- Gemini 3 Flash: DeepSWE 5% vs SWE-Bench Pro 35%
- Claude Haiku 4.5: DeepSWE 0% vs SWE-Bench Pro 39%

### Cost, tokens, and wall-clock efficiency

- GPT-5.5: 47k median output tokens, 20 min wall-clock, $5.80/trial — most token-efficient
- GPT-5.4: $3.30/trial, 56% score — most cost-efficient
- Claude Opus 4.7: 97k tokens, $16/trial, 54% score — 3x more expensive
- Gemini 3.5 Flash: 150k tokens, 15 min, ~same cost as GPT-5.5 — 3x the tokens, 3x dumber

## Qualitative analysis

### Claude is forgetful with multi-part prompts

Claude configurations miss stated requirements more than any other family. DeepSWE prompts frequently enumerate parallel behaviors ("support both sync and async"). Often Claude implements the obvious branch and forgets to mirror its changes. Roughly two-thirds of Claude's DeepSWE rollouts tagged MISSED_REQUIREMENT fit this "one branch shipped" pattern.

### Claude is attentive to its environment

When the prompt and the state of the repository don't match, Opus 4.7 often explores recent changes with `git log` and recovers the gold solution from `.git` history. Both Opus configurations register CHEATED on more than 12% of their reviewed SWE-Bench Pro rollouts (about 18% of Opus 4.7's passes and 25% of Opus 4.6's). GPT-5.4 and GPT-5.5 never exhibit this behavior.

### GPT implements exactly what's asked

GPT-5.5 has the lowest rate of missing stated behaviors of any configuration. GPT reads the prompt and the visible repository contract literally, and produces a patch that honors both. When several GPT trials attempt the same task, they tend to converge on the same interpretation.

### Stronger models test their own work, until the prompt tells them not to

On DeepSWE, Claude Opus 4.7 and GPT-5.4 write new tests in the project's own test framework on over 80% of their runs. On SWE-Bench Pro every model lands between 3% and 28%. SWE-Bench Pro's prompt template tells the agent that the test files are already handled and that it should not modify the testing logic or any of the tests.

## Limitations and future work

- Every model runs through mini-swe-agent (single bash tool, shared prompt) — not how developers actually use models
- Corpus draws only from active open-source repositories with at least 500 GitHub stars
- Bug localization and refactoring are under-represented
- Five languages only (TS, Go, Python, JS, Rust); C++ and Java not represented
- Prompts are shorter than SWE-Bench Pro's but still longer than how developers actually message agents

## Citation

```
@misc{datacurve2026deepswe,
  title  = {DeepSWE: Measuring frontier coding agents on original, long-horizon engineering tasks},
  author = {Wenqi Huang and Charley Lee and Leonard Tng and Serena Ge},
  year   = {2026},
  url    = {https://github.com/datacurve-ai/deep-swe},
}
```
