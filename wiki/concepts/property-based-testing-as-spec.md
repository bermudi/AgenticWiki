---
title: Property-Based Testing as Spec Verification
created: 2026-06-07
updated: 2026-06-08
sources:
  - raw/yt-al-harris-amazon-kiro-faang-spec-driven.md
unaudited_marginal: 0
tags: [concept, testing, verification, kiro, spec, property-based-testing]
---

# Property-Based Testing as Spec Verification

> Property-based testing (PBT) generates a single test case that attempts to falsify an invariant the system should hold. When used as a verification layer for [[ears-notation|EARS]] requirements, PBT becomes the bridge between stochastic LLM code generation and deterministic verification of spec compliance — the system generates code, PBT checks that the code meets the invariants derived from the spec, and the LLM is removed from the verification loop. This is the GA feature of [[kiro|Amazon Kiro]].

## The Approach

A property is "an invariant that you want to deliver." A property-based test is an attempt to produce a single test case that falsifies the invariant. If it can, the requirement is not met. If it cannot (across many generated cases), you have "a high degree of confidence" the requirement holds.

This is the same PBT pattern used in established libraries:

- **Hypothesis** (Python)
- **fast-check** (Node)
- **closure spec library**

The new contribution is using EARS requirements as the source of correctness properties. The pipeline is: spec → EARS requirements → correctness properties → property-based tests → verify generated code against tests.

## Why It Matters

The architectural move: verification is the part of the pipeline that should be *deterministic*. LLM-based code review (LLM-as-judge) has known bias and variance issues ([[overcorrection-bias]]). PBT is reproducible, falsifiable, and runs without the LLM in the loop.

Harris: "if the properties of the code meet the initial requirements, we have a high degree of confidence that you have re uh reliably shipped the the software you expected to ship."

The "high degree" is the soft spot — PBT is only as good as the property definitions, which are only as good as the EARS requirements, which are only as good as the original natural-language prompt. The pipeline is verifiable, not infallible.

## The Tradeoff in SDD Pipelines

Most SDD pipelines stop at "the code looks like it implements the spec" — a visual or LLM-as-judge check. PBT-as-spec adds a step that:

- **Costs** more to set up (writing property definitions)
- **Pays off** by catching invariant violations the LLM-as-judge would miss
- **Removes** the LLM from the verification step, so the verification is reproducible across model versions

The user-facing experience in Kiro: the user writes EARS requirements, Kiro derives properties and generates PBTs, the agent runs the tests, and the user gets a pass/fail signal that is independent of the model.

## Limitations

- **Properties must be operationalizable.** "The system shall be elegant" is not a property you can test. "The system shall return a 200 on valid credentials" is. The strength of PBT-as-spec is the strength of EARS — operationalizable invariants.
- **Property quality tracks requirement quality.** A vague EARS requirement produces a vague property, which produces a vacuous PBT.
- **Doesn't cover non-functional requirements** out of the box. Latency, throughput, cost are properties of the system but not typically subject to property-based testing in the falsification sense.

## Relationship to the Wider Wiki

- [[ears-notation]] — The structured natural language format PBT reads
- [[verifiability]] — Karpathy's framework: PBT is verifiability applied to the spec-to-code step
- [[llm-as-code-judge]] — PBT is the deterministic alternative to LLM-as-judge for the verification step
- [[overcorrection-bias]] — PBT sidesteps the systematic overcorrection issue with LLM code review
- [[backpressure]] — PBT is a backpressure mechanism: wrong code is mechanically rejected at the test gate
- [[verification-loop]] — PBT-as-spec is one concrete instantiation of the broader verification loop
- [[agent-evals]] — PBT for generated code is structurally similar to evals for generated text — both are probabilistic CI for AI outputs

## Thread

- [[intent-to-code]] — PBT-as-spec makes the plan-as-contract position reproducible by moving verification out of the LLM
- [[verifiability]] — PBT is verifiability applied to the spec-to-code step, not just the model's training distribution
- [[agent-quality-engineering]] — PBT-as-spec is the test layer of a quality infrastructure for SDD pipelines

## Related

- [[kiro]] — The product that uses PBT as the verification layer
- [[al-harris]] — The principal engineer who presented the feature
- [[ears-notation]] — The input format
- [[semi-formal-reasoning]] — A related but different approach: structured prompting that requires explicit reasoning traces

## Sources

- `raw/yt-al-harris-amazon-kiro-faang-spec-driven.md` — AI Engineer talk. The PBT pipeline: EARS requirements → correctness properties → property-based tests → code verification; example libraries (Hypothesis, fast-check, closure spec library); "high degree of confidence" caveat; reproducibility argument (LLM removed from verification step).
