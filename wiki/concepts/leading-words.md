---
title: Leading Words
created: 2026-07-06
updated: 2026-07-06
sources:
  - raw/yt-building-great-agent-skills-the-missing-manual.md
unaudited_marginal: 0
tags: [concept, skills, steering, context-engineering, prompt-engineering]
---

# Leading Words

> A steering technique for agent skills: pack a desired behavior into a short, evocative phrase ("vertical slice") and repeat it throughout the skill so the agent echoes the phrase in its own reasoning traces, which then shapes its behavior.

## The Mechanism

[[matt-pocock|Matt Pocock]] introduces leading words as the primary steering lever inside a skill. The technique exploits a structural property of LLMs: the model re-emits tokens from its context into its reasoning traces and output. If the skill text repeats a carefully chosen phrase that *encodes* the desired behavior, the agent tends to repeat that phrase back to itself while working — and the repetition is what changes behavior.

The phrase does not need to be a literal two-word command. It needs to be **dense**: a short expression that triggers the model's prior on a well-known concept so the agent supplies the surrounding procedure itself. "Vertical slice" works because the model has a strong prior on what vertical slicing means in software development; the skill author does not need to spell out the full doctrine.

> [!note] Synthesis: leading words as compressed context
> Leading words are a compression trick that sits at the boundary of [[context-engineering]] and [[procedural-knowledge]]. The phrase is a high-density token sequence that unpacks, via the model's prior, into a much larger procedural context the author never had to write. The skill stays small (see [[agent-skills]] → small skill.md) while the effective procedural coverage stays large.

## The Verification Signal

The distinctive property of leading words is that you can *observe* whether they worked. [[matt-pocock|Pocock]]'s test: write "vertical slice" into the skill, then read the agent's reasoning traces. If the agent is saying "okay, we're going to do this as a thin vertical slice" in its thinking tokens, the leading word took. If the traces show layer-by-layer planning, the leading word did not land and needs to be made more consistent, more prominent, or replaced with a stronger candidate.

This makes leading words one of the few steering techniques with a built-in observability signal — you do not need a separate eval to know whether the technique fired. The reasoning trace is the eval.

## Relationship to Other Steering Levers

- **vs. prescriptive steps**: A long step-by-step procedure tells the agent *what to do*. A leading word tells the agent *how to think about what to do*. The two compose — most skills use both — but leading words are far cheaper in tokens and survive context pressure better than long procedures.
- **vs. [[ubiquitous-language]]**: Ubiquitous language aligns human and agent vocabulary around the domain. Leading words align the agent's *self-talk* around the desired execution posture. They share the underlying insight (naming is leverage) but operate on different surfaces.
- **vs. [[steering-docs]]**: Steering docs inject persistent constraints into the system prompt. Leading words inject posture-shaping phrases into the skill body. Steering docs are always-on; leading words fire when the skill fires.
- **vs. [[tracer-bullets]]**: Overlapping. "Vertical slice" is Pocock's canonical leading word *and* the wiki's canonical tracer-bullet technique — the same phrase doing double duty (a repeated phrase that shapes self-talk; a thin end-to-end build). That overlap is a wiki-level observation; Pocock discusses leading words only, not tracer bullets.

## Failure Modes

> [!note] Extension: these failure modes are wiki inferences, not Pocock's
> Pocock names the leading-words technique and its verification signal but does not enumerate failure modes. The four below are the wiki's inferences from the mechanism (leading words work by borrowing density from the model's prior), not claims from the source.

- **The phrase has no prior**: If the model has no strong prior on what the phrase means, repeating it does nothing. A made-up term ("zygomatic slicing") carries no procedural payload. Leading words work because they borrow density from established terminology.
- **The phrase is too generic**: "Be careful" repeats in traces but changes nothing because it does not encode a specific behavior. The phrase must pick out a *particular* way of working.
- **The phrase never reaches the traces**: If the skill mentions the phrase once in a preamble the agent skips, it will not echo. [[matt-pocock|Pocock]]'s prescription is repetition throughout the skill, not a single invocation.
- **Over-reliance**: A skill that is *only* leading words with no steps or reference material leaves the agent to reconstruct the procedure from prior alone. On familiar territory this works; on novel territory the agent guesses and the skill provides no guardrail.

## Thread

- [[the-agent-workflow]] — Leading words are the in-skill steering mechanism; the workflow is the outer structure that decides which skill fires when
- [[the-verifiability-thesis]] — Leading words have a built-in verification signal: the agent's reasoning trace IS the eval, making them a novel verifiability mechanism the thesis predicts should outperform techniques requiring separate evals
- [[the-cognitive-cost]] — Leading-word selection is taste work that demands more of the human; the cognitive-cost thesis flags this as another load-shift onto shrinking human capacity
- [[tool-design-for-agents]] — Leading words are a design lever for the skill-as-tool: how the skill's text shapes the agent's behavior without prescribing every step

## Related

- [[agent-skills]] — Leading words are the steering technique inside Pocock's four-part skill checklist (trigger → structure → steering → pruning)
- [[tracer-bullets]] — "Vertical slice" is both the canonical leading word and the tracer-bullet technique; the overlap is a wiki-level connection (Pocock discusses leading words only)
- [[ubiquitous-language]] — Both exploit naming as leverage; ubiquitous language aligns human-agent vocabulary, leading words align agent self-talk
- [[context-engineering]] — Leading words are compressed context: high information-per-token density via prior-priming
- [[steering-docs]] — Complementary steering lever; steering docs are persistent system-prompt constraints, leading words are in-skill posture phrases
- [[ai-design-loop]] — The split-skill technique (grill-with-docs → 2prd) uses leading words as the companion steering lever to increase leg work on the current step
- [[matt-pocock]] — Originator of the technique as an explicit named practice
- [[agent-observability]] — The reasoning trace is the verification signal for whether a leading word fired
- [[procedural-knowledge]] — Leading words are the densest form of procedural knowledge encoding: a phrase that unpacks a procedure via the model's prior

## Sources

- `raw/yt-building-great-agent-skills-the-missing-manual.md` — Pocock's "Building Great Agent Skills: The Missing Manual" talk (AI Engineer World's Fair 2026). Introduces leading words as the primary steering technique in the four-part skill checklist; the "vertical slice" example; the reasoning-trace verification signal.
