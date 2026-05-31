---
title: Knowledge Triplet
created: 2026-05-26
updated: 2026-05-31
sources:
  - raw/yt-llms-are-killing-agent-harness.md
tags: [concept, context, agent-harness, prompt-engineering, hallucination]
unaudited_marginal: 0
---

# Knowledge Triplet

> [[thorsten-ball|Thorsten Ball]]'s observation: the model can only draw from three knowledge sources. Either you know what you want and express it, it's in the codebase, or it's in the training data. If it's none of these, the model will make something up. The wiki formalizes this as a framework for understanding when and why agent output quality degrades.

## The Framework

Ball describes discovering this through a concrete failure: he was working on a feature with a non-standard runtime. The code looked normal, but the runtime behavior was different. He wasn't clear about how the runtime behaved. The model would have known if he'd told it — but nobody said anything, so it made up plausible but wrong behavior. Nothing worked until he dug himself out and realized the root cause.

The insight crystallized: there are exactly three sources the model can draw from:

| Source | What it provides | Failure mode |
|---|---|---|
| **What you know and express** | Intent, requirements, domain knowledge, runtime behavior, edge cases | If you don't express it, the model can't use it |
| **The codebase** | Existing patterns, conventions, architecture, business logic | If it's not in the code, the model defaults to training data patterns |
| **The training data** | Standard frameworks, common patterns, well-documented libraries | Only works for well-trodden territory; novel or custom domains fall through |

If knowledge exists in none of these three sources, the model will come up with something — and it might not be what you want. This is the [[hallucination]] problem reframed: the model doesn't fail randomly, it fills gaps from its training distribution.

## Standard vs. Novel Applications

Ball makes a crucial distinction. For standard web applications (Next.js, Remix, etc.), the training data covers most of the territory. There's a web application, a request, a client, a response — "you don't have to spell this out." The knowledge triplet is satisfied by the codebase + training data alone.

But for novel applications — non-standard runtimes, unique UIs, domain-specific logic — the training data doesn't cover it. If you also don't express the requirements, the model fills in from its training distribution. The output looks plausible but doesn't match what you need.

The wiki connects this to the [[jagged-frontier]]: model capability degrades precisely where the knowledge triplet is weakest — in novel domains where neither codebase nor training data provides the signal.

## Relationship to Context Engineering

The wiki reads the knowledge triplet as a practical framing for [[context-engineering]]. Context engineering asks: "what information should be in the context window?" The triplet suggests: "exactly the information from these three sources that the model can't find elsewhere."

The practical implication: if knowledge exists in the training data or the codebase, the model will find it (given good tools). If it exists only in the engineer's head, **the engineer must express it** — through prompts, context files, specifications, or conversation. The model can't read minds.

This also explains why [[context-files|context files]] (AGENTS.md, CLAUDE.md) work when well-written: they push knowledge from "what you know" into "what's in the codebase," making it available to the model without requiring explicit expression each time. Ball doesn't make this connection himself — the wiki draws it.

## The Signal Problem

Ball frames this as a product design problem: AI's UI is a text box where you can throw any magic wish, and there's "absolutely zero product feedback about what you did is wrong." Nothing in the product tells you that you're going off track — even when the knowledge triplet isn't satisfied.

The wiki connects this to [[synthetic-truth]]: when the triplet fails, the model doesn't just err randomly — it constructs what it infers the user wants, not what is true.

## Thread

- [[tool-design-for-agents]] — The knowledge triplet frames what the tool layer must preserve: access to all three knowledge sources
- [[the-human-lever]] — "What you know" is the human's irreducible contribution; the model can't generate it from the other two sources

## Related

- [[context-engineering]] — The knowledge triplet as an information-theoretic framing of context engineering
- [[hallucination]] — The triplet explains when and why hallucination occurs
- [[context-files]] — Context files push "what you know" into "what's in the codebase"
- [[synthetic-truth]] — Fabrication when the triplet isn't satisfied
- [[jagged-frontier]] — The triplet explains where the frontier is jaggedest
- [[thorsten-ball]] — The originator of the framework
- [[agent-experience]] — AX design should maximize the codebase's contribution to the triplet
- [[peak-programmer]] — The shift from implementation to conceptualization means "what you know and express" becomes the engineer's primary contribution
- [[domain-expertise-as-moat]] — Domain expertise as the highest-value form of "what you know"; the career response to implementation commoditization

## Sources

- `raw/yt-llms-are-killing-agent-harness.md` — Ball's original articulation: the runtime failure story, the three sources, standard vs. novel applications, the signal problem
