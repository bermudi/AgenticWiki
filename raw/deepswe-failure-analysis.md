---
type: web
url: https://cozy-bienenstitch-17a1b6.netlify.app
title: DeepSWE Failure Analysis — Where Open-Weight Coding Models Fail
author: bermudi
date: 2026-06-03
ingested: 2026-07-14
---

# DeepSWE Failure Analysis — Where Open-Weight Coding Models Fail

> Original empirical analysis of where open-weight coding models fail on the [[deepswe]] benchmark, compared against GPT-5.5. Identifies the 98 tasks where GPT-5.5 passes but open-weight models (deepseek-v4-pro, glm-5.1, kimi-k2.6) fail — 284 model-pair comparisons — and provides structured, human-annotated analysis of *why*, mined from agent trajectories, patches, and verifier output. This file is a source digest of that analysis; the live viewer and raw artifacts are linked under Sources below.

## Method

The analysis compares, per task, the trajectory + patch + verifier output of each failing open-weight model against GPT-5.5's passing reference. Trajectories (500KB–5MB each) are parsed into behavioral telemetry: step counts, first-edit step, first-test step, edit-command counts (sed vs heredoc/cat), test-command counts, fix-attempt clusters. Patches are parsed into structural anatomy: files changed, lines added/removed, whole-file rewrites, blast radius. Commentary is human-authored per task→model with a confidence level (high = read verifier output + both patches/trajectory excerpts).

Two categories are distinguished explicitly, and the distinction is load-bearing:

- **Benchmark conditions** — structural constraints every agent faces, not model flaws.
- **Behavioral responses** — how a model behaves *under* those constraints; where passing and failing trajectories diverge.

## Benchmark Condition: Hidden Oracle / Test-Blindness

The DeepSWE harness applies `test.patch` at grading time. The challenge tests it adds are not present in the repo the agent works against, and **no agent — including GPT-5.5 — discovers or runs them during its loop.** Every agent iterates against the *visible* repo tests only.

This reframes the central question. It is not "why didn't the failing model test better?" All models are equally test-blind. The discriminating question is: **given the same hidden-oracle constraint, which models write changes that *generalize* beyond the visible surface, and which only satisfy it?** GPT-5.5 passes not because it is less test-blind but because its implementations happen to satisfy the stricter hidden behavior. Open-weight models fail because their implementations have subtle bugs (env precedence, stderr routing, field delimiters) that the visible tests do not exercise.

Canonical case — `abs-module-cache-flags` (all three open models fail, GPT-5.5 passes): every model spends 100–220 steps building debug-trace / cache-visibility features and iterating until all *existing* tests pass, then submits. None ever runs the challenge tests (`TestChallengeRequireDebugTraceOutput`, `TestChallengeRequireOSEnvFallback`, `TestChallengeRequireDebugWritesToRuntimeStderr`). GPT-5.5 also never runs them — but its env-resolution ordering is correct enough that they pass anyway. The open models' env-precedence and stderr-routing bugs are almost certainly fixable in 10–20 steps of iterative debugging *if the model could see the failing challenge test*. High confidence.

This is the empirical instance of the [[aiming-problem]]: the visible test suite is a gameable proxy; the hidden oracle is the real property. "All visible tests pass" is not "done."

## Behavioral Response: Late Testing

The single largest behavioral delta between passing and failing trajectories is *when the agent first closes a verification loop*. Telemetry on `firstTestStep`:

| Model | First test step | Notes |
|---|---|---|
| GPT-5.5 | ~30–40 | tests early and often |
| kimi-k2.6 | 18–130 | earliest of open models on some tasks, but 120+ on others |
| deepseek-v4-pro | 80–150 | |
| glm-5.1 | 60–220 | defers verification longest |

Case — `effect-sse-httpapi-streaming`: GPT-5.5 tests at step 36 and finishes in 113 steps with 5 file-writes. GLM runs its first test at step 220, discovers compilation errors, and submits anyway — 296 steps. The ~200-step gap between writing code and first testing it is where most bugs get baked in. The [[tracer-bullets]] / [[verification-loop]] principle — close the loop early and often — is not aesthetic advice; it is the strongest correlate of pass/fail in this dataset.

## Behavioral Response: Fix-Flailing

Many edit attempts against failing tests without root-cause isolation. Each fix addresses one symptom and breaks another; the loop amplifies error rather than converging.

Case — `tengo-destructuring-bindings` (kimi-k2.6): tests at step 18 (excellent early feedback) but makes **78 fix attempts**. The root cause — destructuring defaults should fill only explicitly-specified positions; absent positions should be `nil`, not the default — is never isolated. Each tweak fixes one test and breaks another. GPT-5.5 tests at step 38 with ~20 fix attempts and converges. Early testing is necessary but not sufficient; without root-cause analysis the iteration count explodes. This is the agent-code instance of [[iterative-self-correction]]'s ceiling and the [[overcorrection-bias]] analogue: correction that does not converge.

Related sub-pattern — **local-optimum lock-in**: a model finds a partial fix, visible tests pass, the hidden case fails, and the model never backtracks or rethinks the approach. Structurally the same mechanism Meeseeks documents as "once a model commits to an interpretation, it struggles to pivot."

## Behavioral Response: Infrastructure Blindness

The model locates the relevant code but **reimplements its machinery instead of calling it.** It found the module; it did not recognize the module as the tool to use, so it rebuilt a parallel, worse version.

Case — `csstree-shorthand-expansion-compression`: the csstree library already has a `lexer.match()` that returns a syntax tree mapping tokens to properties. GPT-5.5 uses it to expand shorthands. All three open models ignore it and write their own regex/token-splitting logic — which works for simple shorthands (margin, padding) and fails on complex ones (multi-layer `background`, mixed-type `font`).

Case — `dasel-html-document-format`: the codebase has an XML reader/writer with the same DOM-tree round-trip semantics. GPT-5.5 copies and adapts the XML format (~1279 lines, 45 steps). DeepSeek writes a standalone HTML parser from scratch (~2026 lines, 120 steps) and misses the nil-check patterns the existing format handles. The existing format already solved the round-trip problem; copying it is the move.

This is adjacent to but distinct from "agentic search low recall" (the agent couldn't *find* code) and [[satisfaction-of-search]] (the agent stopped at the first plausible hit). Here the agent *found* the infrastructure and chose not to use it.

## Behavioral Response: Over-Engineering / Patch Bloat

The patch adds far more than the task requires — new abstractions, wrapper types, indirection layers, whole-file rewrites — and the extra surface area is where the bugs live. More code is more bug surface, not more capability.

Case — `dasel-html-document-format` (glm-5.1): **2483 lines** added — nearly 2× GPT-5.5's 1279 — building a full HTML DOM with CSS-selector support, parent/child/sibling traversal, and entity decoding that no test requires. The same nil-pointer round-trip bug that bites the smaller patches bites this one too, with more paths to miss.

Case — `pebble-durability-wait-apis` (glm-5.1): +1347/-13 across 12 files adding wrapper structs and helper layers around the durability-wait logic. GPT-5.5 adds the logic directly to the existing commit pipeline (+987/-54 across 15 files, each change minimal). GLM's extra indirection layers introduce the race conditions and nil-pointer bugs that fail the task.

This is distinct from MAS [[architectural-bloat]] (structure that is causally inert in a multi-agent topology) and from [[boil-the-ocean]]'s *completeness* (full edge cases, full tests, full error paths — which the dataset rewards). Over-engineering here is *speculative abstraction and unnecessary indirection* — capability that was never asked for, adding bug surface that was never needed.

## Behavioral Response: Fragile Shell Editing

Repeated `sed -i` and multi-line inline shell edits for changes that demand whole-file rewrites. Each `sed` is fragile; failures cascade into repair cycles.

Case — `pebble-durability-wait-apis` (deepseek-v4-pro): 55 `sed` commands against Go code (which demands exact formatting and import ordering). The seds repeatedly break the build; ~50 steps go to repairing sed-induced syntax/import errors. GPT-5.5 writes complete files with `cat <<EOF` and runs `gofmt` — a single sed edit across the whole task. The 262-step duration is largely a consequence of the editing strategy, not the problem difficulty.

Case — `tengo-destructuring-bindings` (glm-5.1): 24 Python scripts written to patch files programmatically — read file, modify string, write back — adding ~50 steps of script-debugging overhead with no correctness gain over writing files directly. GPT-5.5 writes files with heredocs.

This is an editing-strategy pathology; the concept it transmits is "structural edits over string surgery."

## How These Combine

No failing trajectory exhibits just one. The typical failing open-weight run stacks several: it tests late (bakes in bugs), then flails against them (amplifies error), over-engineering the fix (more surface for more bugs), while editing fragily (more repair cycles) — all against a visible test suite that cannot tell it the hidden behavior is wrong. GPT-5.5's distinguishing behavior is not raw capability on any single axis but a workflow that closes loops early, edits structurally, and keeps patches minimal — which together produce changes that generalize to the hidden oracle.

## What This Is and Is Not

- **Empirical, not comprehensive.** 98 contrast tasks, 4 models, human-annotated commentary on a subset. Findings are patterns with concrete exemplars, not population statistics over all trajectories.
- **Test-blindness is a benchmark condition, not a model flaw.** The actionable lesson is generalization, not "run more tests" — the agent physically cannot run the hidden tests.
- **The numbers are artifacts of this harness.** "Step 36," "55 seds," "78 fix attempts" are measurement results under `mini-swe-agent` with a single bash tool. The concepts they evidence — early feedback, root-cause isolation, reuse over reinvent, minimality, structural editing — are what transfer.

## Data Sources

- Trial index: `https://deepswe.datacurve.ai/artifacts/trials.json`
- Per-trial web UI: `https://deepswe.datacurve.ai/data/trials/{trial_name}`
- Agent trajectories: `https://d3ujjcmjq6o8v6.cloudfront.net/trial-artifacts/{trial_name}/agent/trajectory.json`
- Model patches: `https://d3ujjcmjq6o8v6.cloudfront.net/trial-artifacts/{trial_name}/artifacts/model.patch`
- Verifier output: `https://d3ujjcmjq6o8v6.cloudfront.net/trial-artifacts/{trial_name}/verifier/test-stdout.txt`
