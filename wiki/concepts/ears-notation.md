---
title: EARS Notation
created: 2026-06-07
updated: 2026-06-08
sources:
  - raw/yt-al-harris-amazon-kiro-faang-spec-driven.md
unaudited_marginal: 0
tags: [concept, spec, requirements, structured-nlp, kiro]
---

# EARS Notation

> Easy Approach to Requirements Syntax (EARS) is a structured natural language format for requirements with the canonical syntax `When <trigger>, the <system> shall <response>`. Designed for downstream automated reasoning, EARS lets a system parse requirements deterministically — without the LLM in the loop — for translation to property-based tests, conflict detection, and ambiguity scanning. Used by [[kiro|Amazon Kiro]] as the substrate for the GA property-based testing feature.

## The Format

EARS requirements use a constrained natural language pattern, the canonical form being:

```
When <trigger>, the <system> shall <response>.
```

The "When" trigger can be conditional, ubiquitous, or event-driven. The "shall" keyword is the obligation marker. The "system" is the entity under specification. The "response" is the expected behavior.

The format is restrictive enough to be machine-parseable but loose enough to read as natural language. [[al-harris|Al Harris]]: "this is the first step of many we're taking to actually take these structured natural language requirements and then tie this with a throughine all the way to the finished code."

## Why It Matters

The architectural insight is that *some parts of the SDD pipeline should not use the LLM*. EARS requirements are the input to:

- **Property-based test generation** — EARS requirements are translated to correctness properties. The properties are then the input to property-based testing frameworks (Hypothesis, fast-check, closure spec library).
- **Requirements verification** — scanning for ambiguity, invalid constraints, and conflicting requirements. Per Harris: "we scan your requirements for over ambiguity. We scan your requirements for um invalid constraints eg uh you have conflicting requirements and we help you resolve those ambiguities using sort of classic uh automated reasoning techniques."

The LLM is used to *generate* the EARS requirements from a natural-language prompt. The EARS format then *removes the LLM from the verification loop* — the requirements can be checked by deterministic parsing and automated reasoning tools.

## The Pattern in the Wider Wiki

EARS is a specific instance of the general principle: use structured natural language as a deterministic interface between stochastic LLM generation and deterministic verification. Related concepts:

- [[semi-formal-reasoning]] — Structured prompting that requires explicit premises, execution traces, and formal conclusions
- [[property-based-testing-as-spec]] — The verification layer that uses EARS requirements as the basis for invariants
- [[verifiability]] — Karpathy's framework: LLMs automate what you can verify. EARS is verifiability applied to the requirements artifact.

## Limitations

- **"High degree of confidence" is soft.** Harris is explicit: "where the word high there is doing a little bit of heavy lifting because it depends on how well you write your tests." Property-based testing is only as good as the property definitions, and the property definitions are only as good as the EARS requirements.
- **Natural language as a substrate.** EARS constrains but does not eliminate the ambiguity of natural language. The structure helps the parser, but a poorly written EARS requirement is still a poorly written requirement.
- **EARS for non-functional requirements is an open question.** Harris's demo focuses on functional requirements (the system shall respond with a 200). Non-functional requirements (latency, throughput, cost) need a different structure.

## Empirical Status

Adopted in production by [[kiro|Amazon Kiro]] as of GA (November 17, 2025). The verification pass — translating EARS to property-based tests and validating code against them — is the headline feature of the GA launch. No external benchmarks yet on whether EARS-formatted requirements produce better outcomes than free-form markdown requirements; the empirical case rests on Kiro's internal data, not independent studies.

## Thread

- [[intent-to-code]] — EARS is the substrate that makes plan-as-contract reproducible, by removing the LLM from the verification loop
- [[verifiability]] — Karpathy's framework applied to requirements artifacts
- [[tool-design-for-agents]] — EARS is a tool-level interface between LLM generation and deterministic verification

## Related

- [[kiro]] — The product that uses EARS as the canonical requirements format
- [[al-harris]] — The Kiro principal engineer who presented the EARS feature
- [[property-based-testing-as-spec]] — The verification layer that EARS feeds into
- [[semi-formal-reasoning]] — A general framework for structured prompting; EARS is one specific instance
- [[context-engineering]] — EARS is structured for information density; the requirements carry maximum information per token
- [[context-files]] — Steering docs in Kiro are the operational analog of EARS — structured, machine-readable, persistent

## Sources

- `raw/yt-al-harris-amazon-kiro-faang-spec-driven.md` — AI Engineer talk. EARS format introduction; structured natural language for downstream automated reasoning; the requirements → properties → property-based tests pipeline; ambiguity/conflict scanning via automated reasoning; "high degree of confidence" caveat.
