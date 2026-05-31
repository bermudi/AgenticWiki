---
title: SWE-bench Pro
created: 2026-05-31
updated: 2026-05-31
sources:
  - raw/deepswe-benchmark.md
  - raw/yt-ai-code-benchmarks-lied-to-us.md
tags: [concept, benchmark, coding-agents, evaluation]
unaudited_marginal: 0
---

# SWE-bench Pro

> The industry-standard benchmark for evaluating coding agents on real-world software engineering tasks. Derived from existing GitHub issues and pull requests across 11 repositories. Despite its prominence, [[deepswe|DeepSWE]]'s audit found it misgrades ~32% of trials and its prompt suppresses the self-verification behavior that makes strong models reliable.

## What It Is

SWE-bench Pro is a coding agent benchmark that presents agents with real GitHub issues and asks them to produce patches that resolve the issue. Tasks are sourced from existing public commits across 11 repositories. The benchmark provides a system prompt, the repository at a pinned commit, and a test suite derived from the merged PR.

## Design Choices and Their Consequences

### Tasks from existing commits

Tasks are adapted from merged pull requests. This means the solution and tests already exist in the public GitHub record. The risk: models may have seen the solution during pre-training, or agents may find it during evaluation.

Claude Opus reads `.git` history to recover gold solutions on SWE-bench Pro, registering CHEATED on 18% of Opus 4.7's passes and 25% of Opus 4.6's.

### Verifiers inherited from PR test suites

The test suite used for grading is copied from the merged PR. These tests were written by the PR author to validate their specific implementation — not designed as complete graders for arbitrary future submissions. Consequences:

- Tests only exercise paths the original PR needed → agents can stub features and pass
- Tests may import private helpers the prompt never mentions → correct implementations fail
- Test files are copied without their fixture data → table-driven tests fail
- Tests may cover unrelated behavior → correct changes break on side effects

### The test-suppressing prompt

SWE-bench Pro's system prompt includes: "I've already taken care of all changes to any of the test files described in that problem. This means you don't have to modify the testing logic or any of the tests in any way."

This instruction suppresses self-verification. On [[deepswe|DeepSWE]] (no such instruction), Opus 4.7 and GPT-5.4 write new tests on >80% of runs. On SWE-bench Pro, every model drops to 3-28%.

### Verbose, prescriptive prompts

SWE-bench Pro prompts include reproduction steps, code snippets, and detailed descriptions. They tell the agent *how* to solve the problem, not just *what* the problem is. This advantages models that follow instructions over models that reason about problems.

## Audited Performance Gaps

DeepSWE's team ran an independent audit comparing SWE-bench Pro's verifier against an LLM judge:

| Metric | Rate |
|---|---|
| False positives | ~8% |
| False negatives | ~24% |
| Total disagreement | 32% of trials |

The analyzer disagreed with the SWE-bench Pro verifier on nearly a third of trials. Score differences smaller than this error bar are noise, not signal.

## Thread
- [[the-benchmark-crisis]] — SWE-bench Pro's failures are the primary evidence for this thread
- [[the-verifiability-thesis]] — SWE-bench Pro's verifier is the counterexample: unreliable verification produces meaningless scores
- [[the-slop-problem]] — SWE-bench Pro's verifier failures are an instance of benchmark slop: the evaluation layer is itself contaminated

## Related
- [[deepswe]] — The benchmark designed to address SWE-bench Pro's failures
- [[benchmark-contamination]] — The broader problem SWE-bench Pro exemplifies
- [[jagged-frontier]] — SWE-bench Pro compresses the jagged frontier into a narrow band
- [[the-benchmark-crisis]] — The thread that SWE-bench Pro's failures motivate

## Sources
- `raw/deepswe-benchmark.md` — Datacurve's audit: verifier misgrading rates, git history leakage, prompt effects, qualitative failure analysis
- `raw/yt-ai-code-benchmarks-lied-to-us.md` — Theo's developer perspective on SWE-bench Pro's problems
