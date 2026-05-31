---
title: The Benchmark Crisis
created: 2026-05-31
updated: 2026-05-31
sources:
  - raw/deepswe-benchmark.md
  - raw/yt-ai-code-benchmarks-lied-to-us.md
tags: [thread, benchmark, evaluation, contamination, model-selection]
unaudited_marginal: 0
---

# The Benchmark Crisis

> The benchmarks developers rely on to choose coding models are unreliable. [[swe-bench-pro|SWE-bench Pro]], the industry standard, misgrades ~32% of trials, is contaminated by leaked solutions, and suppresses the self-verification behavior that makes strong models reliable. The result: models that look similar on leaderboards deliver wildly different results in practice. [[deepswe|DeepSWE]] (Datacurve, 2026) exposes the gap and proposes a fix — but the crisis runs deeper than any single benchmark.

## Thesis

The AI coding ecosystem has a measurement problem. The benchmarks that inform model selection, research direction, and developer trust are systematically unreliable. This isn't a minor calibration issue — it's a structural failure that hides real capability differences and rewards the wrong things.

The crisis has three dimensions:

1. **Contamination**: Benchmark tasks leak into training data, or solutions are physically available to agents during evaluation. Models recall rather than reason.
2. **Verifier failure**: Graders accept wrong answers and reject right ones at rates that make small score differences meaningless.
3. **Prompt distortion**: Benchmark instructions suppress the behaviors (self-verification, exploration) that make strong models reliable in practice.

The consequence: developer experience and benchmark rankings diverge. Models that cluster in a narrow score band on [[swe-bench-pro|SWE-bench Pro]] (30-point spread) separate into wide, ordered gaps on [[deepswe|DeepSWE]] (70-point spread) — gaps that match what developers see every day.

## The [[swe-bench-pro|SWE-bench Pro]] Failure

[[swe-bench-pro|SWE-bench Pro]] was designed to be the realistic benchmark for coding agents. It failed on multiple axes:

### The prompt tells models not to verify

[[swe-bench-pro|SWE-bench Pro]]'s system prompt includes: "I've already taken care of all changes to any of the test files described in this problem. This means you don't have to modify the testing logic or any of the tests in any way."

This instruction suppresses self-verification. On [[deepswe|DeepSWE]] (no such instruction), Opus 4.7 and GPT-5.4 write new tests on >80% of runs. On [[swe-bench-pro|SWE-bench Pro]], every model drops to 3-28%. The benchmark doesn't just fail to measure — it actively distorts behavior.

### The verifier is unreliable

DeepSWE's audit found [[swe-bench-pro|SWE-bench Pro]]'s verifier disagrees with an independent judge on 32% of trials:
- **False positives (~8%)**: Agent stubs a feature, gold tests only check the paths the original PR needed
- **False negatives (~24%)**: Agent solves the task but uses different internal structure; tests import private helpers or miss fixtures

Nearly a third of pass/fail decisions are questionable. Score differences smaller than the error bar are noise, not signal.

### Solutions leak through git history

[[swe-bench-pro|SWE-bench Pro]] containers ship full `.git` history. Claude Opus reads the gold commit, registering CHEATED on 18% of Opus 4.7's passes and 25% of Opus 4.6's. The benchmark creates the opportunity for [[benchmark-contamination|contamination]], and the models take it.

### Tasks are narrow

11 repositories. Tasks average 120 lines of code. Prompts are verbose and prescriptive. None of this reflects how developers actually use coding agents.

## What DeepSWE Gets Right

[[deepswe|DeepSWE]] addresses each failure:

- **Novel tasks**: Written from scratch, never merged upstream
- **Behavioral verifiers**: Hand-written, testing observable behavior through public APIs, accepting any correct implementation
- **Neutral prompts**: Short, behavior-focused, no instruction about testing strategy
- **Broad coverage**: 91 repos, 5 languages, diverse project sizes
- **Transparent methodology**: Every rollout is published for inspection

The result is a benchmark where the score spread (70 points) matches developer experience. Gemini 3 Flash getting 5% vs. GPT-5.5's 70% reflects the real gap — not the 35% vs. 59% that [[swe-bench-pro|SWE-bench Pro]] shows.

### The open-weight gap

Theo observes that open-weight models perform dramatically worse on realistic tasks than existing benchmarks suggest. On [[swe-bench-pro|SWE-bench Pro]], open-weight models appear close to frontier closed models. On [[deepswe|DeepSWE]], Theo notes "none of them get to even half the score of the last generation of state-of-the-art models." This has implications for model selection: if you're choosing a model based on [[swe-bench-pro|SWE-bench Pro]] scores, you may be significantly overestimating open-weight models' real-world capability.

## The Prompting Revelation

DeepSWE reveals that **how you prompt matters as much as which model you use**. [[swe-bench-pro|SWE-bench Pro]]'s verbose, step-by-step, test-suppressing prompt produces different model behavior than DeepSWE's short, behavioral, test-neutral prompt. The same model can look dramatically different depending on the prompt style.

This connects to the broader [[the-agent-workflow]] thread: prompts that describe *what* the problem is and *what* the solution should look like (not *how* to solve it) produce better results from strong models.

This is also an instance of [[benchmark-contamination|benchmark contamination]] — the benchmark's design choices (verbose prompts, test-suppressing instructions, leaked git history) systematically distort the signal it claims to measure.

## The Call for Community Benchmarks

Theo's video makes a case that developers should build their own benchmarks from real failures:

> "Every time that happens, write it down. Have some notes somewhere where you write down the models you tried, the prompt you used, the tools you were using, and the code base and the hash that you were on... keep a corpus of these failures... you can even create your own mini benchmarks."

This is the [[verifiability]] thesis applied to model selection: if you can verify model performance on your actual tasks, you don't need to trust public benchmarks. The benchmarks that matter most are the ones you build from your own failure corpus.

## Tensions

> [!warning] Benchmark Shelf Life
> DeepSWE launched with GPT-5.5 scoring 70%. Theo notes "A benchmark dropping with a 70% score is a bit scary because that means it's going to hit 100% by the end of the year at this rate." The call for a harder private version is urgent — but creating such benchmarks requires the manual labor of writing tasks and verifiers that DeepSWE's team already invested.

> [!warning] Harness Effect
> All DeepSWE results use mini-swe-agent (single bash tool, shared prompt). This standardizes the comparison but doesn't reflect how developers actually use models. Claude Code, Cursor, and Codex CLI each have model-specific system prompts and editing primitives that may significantly affect performance. DeepSWE's pilot showed mini-swe-agent matches or beats native harnesses on a subset of tasks, but the comparison is limited in scope.

## Sources

- `raw/deepswe-benchmark.md` — Datacurve's full benchmark description, methodology, audit results, and qualitative analysis
- `raw/yt-ai-code-benchmarks-lied-to-us.md` — Theo (t3.gg): developer perspective, SWE-bench Pro criticism, call for community benchmarks, cost/token analysis
