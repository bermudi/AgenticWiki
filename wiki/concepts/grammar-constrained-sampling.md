---
title: Grammar-Constrained Sampling
created: 2026-07-13
updated: 2026-07-14
sources:
  - raw/yt-state-of-agentic-coding-8-with-mario-armin-and-ben.md
tags: [concept, failure-mode, tool-calling, llm-behavior, decoding, harness-lock-in]
unaudited_marginal: 0
---

# Grammar-Constrained Sampling

> A decoding technique — restricting the token sampler to sequences that keep tool-call output grammatically valid (e.g. always-emitting valid JSON) — that produces a subtle, reproducible tool-call corruption in agentic LLMs. When the sampler commits to a grammatically-valid-but-schema-invalid path (a stray comma inside a JSON object), the grammar constraint *forces* it to emit fabricated object keys that no tool schema defines. The malformed call stays in context and, via in-context learning, poisons subsequent calls. [[mario-zechner|Mario Zechner]] measured ~20% edit-tool failure rates in affected session states and traces the regression to frontier models being RL-trained on Claude Code's lenient harness.

## The Technique

When an LLM emits a structured tool call, the sampler can be constrained so that only tokens producing grammatically valid output are eligible. The canonical example is JSON: if the model must return a JSON object, the first token pulled from the GPU is forced to be an opening brace `{` — any other character is rejected at the sampler regardless of its probability. This is variously called grammar-constrained decoding, structured/JSON-mode decoding, or regex-guided sampling, and it is standard practice for forcing valid function-call output.

The representation differs by vendor ([[mario-zechner|Zechner]], from the episode):

- **GPT-style models** represent tool calls as JSON objects end to end.
- **Anthropic-style models** represent top-level tool-call arguments as strings, but represent complex parameters (arrays, nested objects) as JSON objects — and apply grammar-constrained sampling to *those*.

This is where the failure mode lives: in the complex, JSON-encoded parameters of a tool call.

## The Failure Mechanism

Consider an edit tool whose input is an **array of edit objects**, each with `old_string` and `new_string` (this is the shape of [[pi]]'s and [[claude-code|Claude Code]]'s edit tools). The model has just emitted:

```
"old_string": "<some value>"
```

Two grammatically valid tokens can follow: a comma `,` (begin another key in the *same* object) or a closing brace `}` (end the object). If the sampler commits to the comma, the grammar constraint now bites hard: **JSON forbids trailing commas**, so the only grammatically-valid continuation is *another key-value pair*. But the tool's schema has no more valid keys. The sampler is now trapped between two constraints:

- The grammar constraint demands another string key (to satisfy JSON syntax).
- The schema offers no valid key to emit.

The resolution: **the sampler emits a fabricated key name** — `require_unique`, `tools`, or an entirely random string — because the grammar constraint only enforces JSON *shape*, not schema *validity*. The tool call that lands is structurally well-formed JSON and semantically nonsense.

> [!note] The crux: grammar vs. schema
> Grammar-constrained decoding enforces *syntactic* validity (valid JSON). It does not — and cannot, at the decoding layer — enforce *semantic* validity against a tool's input schema. When the sampler commits to a syntactic path that has no valid semantic completion, it is forced to produce semantic garbage to keep the output grammatical. The defect is invisible to a lenient consumer that ignores unknown keys, and fatal to a strict consumer that validates against the schema.

## Context Poisoning and the Reproduction Problem

The malformed tool call does not vanish. It enters the conversation history, and because models do in-context learning, **subsequent calls condition on it**: the model sees that an earlier call carried a `require_unique` key and emits one again. The corruption becomes self-sustaining within the session.

This explains why the failure is hard to reproduce on demand: you need a session that has *already entered* the poisoned state. A fresh session with the same model and same tool looks fine. Zechner could not reproduce the regression until another user handed him a session trace that exhibited it — at which point he measured **~20% of continuing edits failing**, each emitting completely random, schema-invalid keys.

## Measured vs. Hypothesized

What is directly observed:

- ~20% edit-tool failure rate in affected session states (measured by [[mario-zechner|Zechner]] on newer Anthropic models via [[pi]]'s strict edit tool).
- Fabricated keys (`require_unique`, `tools`, random strings) forced by the grammar constraint.
- In-context propagation: a single malformed call increases the rate of subsequent malformed calls.
- [[claude-code|Claude Code]]'s leniency: Zechner inspected the deminified client and found it accepts schema-invalid output — e.g. a parameter literally named `new str new old string new`, or keys the schema never defined. It silently swallows the garbage the model emits.
- The regression is real relative to older models: older Anthropic models did not exhibit this behavior on the same tool.

> [!note] Hypothesis: the root cause is RL on a lenient harness
> The attribution to *RL training on Claude Code's lenient harness* is a hypothesis, not a measurement. Zechner's reasoning: newer frontier models are trained against Claude Code (or a harness behaving like it) as the reference. Because Claude Code accepts schema-invalid tool calls without error, the model receives **no negative reward signal** when it emits a stray comma or a fabricated key during RL. It never learns to avoid the mis-sampled comma, because the reference harness never punished it. Older models — trained against a stricter or different harness — did not develop the habit. This is plausible and internally consistent, but the training-side claim is not directly observable from outside a lab. Treat the *mechanism* (grammar-vs-schema mismatch + context poisoning) as established and the *root cause* (RL-on-lenient-harness) as the leading explanation. See [[harness-monoculture]] for the broader thesis.

## Why Strict Harnesses Surface It

The failure is only visible to a harness that **validates tool calls against their schema**. [[pi]] does — it errors back to the model when a tool call references a string not present in the file, and (for this tool) does not silently accept unknown keys. Claude Code does not — it is "incredibly lenient and a little bit sloppy," accepting essentially whatever the model emits.

The implication is uncomfortable for third-party harness authors: **the strictness that makes your tool safe is also what exposes you to a regression the dominant harness masks.** A tool that fails closed on invalid input will surface a 20% failure rate that the reference harness hides entirely. The leniency is not benign; it is what lets the defect ship in the model.

## Relation to Adjacent Failure Modes

- Distinct from [[self-conditioning]]: self-conditioning is the model degrading on its own *error-laden* history; this is the model degrading on its own *malformed-tool-call* history. Both are in-context-learning pathologies, but the trigger here is a grammar-forced fabrication, not a reasoning error.
- Distinct from [[hallucination]] proper: the fabricated keys are not the model "believing" a false fact — they are *forced* by the decoder to satisfy a syntactic constraint the model's own sampling walked into. The model is a victim of its own grammar constraint as much as the author of it.
- Reinforces [[backpressure]]: a strict tool that rejects malformed calls *is* backpressure, and this case shows backpressure surfacing a defect that leniency conceals — but at the cost of a visible failure rate the user must then tolerate or work around.
- A concrete instance of the broader [[harness-monoculture]] thesis: the dominant training harness's leniency propagates as a regression in every harness that is not equally lenient.

## Thread

- [[tool-design-for-agents]] — Grammar-constrained sampling is a tool-reliability factor the thread did not previously account for: the model's reliability on a given tool is now a function of *which harness it was RL-trained on*, independent of the tool's own design
- [[the-slop-problem]] — Leniency that masks defects lets them ship in the model; strictness that surfaces them is punished with visible failure rates

## Related

- [[harness-monoculture]] — The ecosystem thesis this failure instantiates: training on a single dominant lenient harness propagates regressions to every stricter harness
- [[pi]] — The strict harness that surfaced the 20% failure rate
- [[claude-code]] — The lenient reference harness whose permissibility is hypothesized to have removed the negative reward signal during RL
- [[self-conditioning]] — Kindred in-context-learning pathology, triggered by error-laden rather than malformed history
- [[backpressure]] — Strict schema validation as backpressure, and its double-edged consequence here
- [[hallucination]] — Adjacent but mechanistically distinct: forced-by-grammar vs. model-believed

## Sources

- `raw/yt-state-of-agentic-coding-8-with-mario-armin-and-ben.md` — [[mario-zechner|Mario Zechner]]'s deep technical explanation (~24:50–31:50; the edit-tool-array mechanism at [27:47]): grammar-constrained sampling concept, the comma-traps-sampler mechanism, ~20% edit failure in affected session states, fabricated keys (`require_unique`), in-context propagation and the reproduction problem, Claude Code's leniency (inspected deminified client; accepts `new str new old string new`), and the hypothesis that RL training on Claude Code's lenient harness removed the negative reward signal.
