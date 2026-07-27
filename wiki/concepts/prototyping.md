---
title: Prototyping (High-Fidelity)
created: 2026-07-27
updated: 2026-07-27
sources:
  - raw/yt-dont-waste-time-on-specs-prototype-instead.md
tags: [concept, ai-engineering, design, workflow, prototyping]
unaudited_marginal: 0
---

# Prototyping (High-Fidelity)

> A technique for resolving design questions by writing throwaway code at high fidelity instead of over-investing in text specs. Introduced by [[matt-pocock|Matt Pocock]] as his `/prototype` skill: when "how should it look / behave?" can't be answered in discussion, build a cheap, rough, concrete artifact to react to, then let an [[afk-agent]] re-implement it against the spec.

## Body

[[matt-pocock|Matt Pocock]] argues that a common failure mode in AI-assisted development is over-investing in a detailed spec or plan up front, on the assumption that precise text will make the agent's output match the intent. His counter: **you can write code while working toward a spec**, and because the cost of *producing* code has dropped sharply, building a quick throwaway prototype is now the cheapest and most effective way to resolve design questions. He partially dislikes the "code is cheap" slogan but accepts its kernel — the marginal cost of generating code has collapsed, so the cost of a prototype is negligible compared to the cost of a wrong spec.

### The Fidelity Framework

Pocock frames the choice between "discuss it" and "prototype it" using a **fidelity** axis:

- **Low-fidelity questions** — basic framing ("the modal should have cancel and confirm buttons"). Resolved in discussion; a spec or grilling session suffices.
- **High-fidelity questions** — "how should it look / how should it behave under these circumstances?" These resist resolution in text. The only way to answer them is to *see it working*. Producing a prototype is now cheaper than ever, so Pocock pushes for "more of my discussions at a higher fidelity."

The leap from discussion-plus-spec to production code is large; the leap from a working prototype to production code is small. The prototype compresses the feedback loop: react to a concrete artifact, not a description of one.

### The Prototype Skill

The technique ships as `/prototype` in [[mattpocock-skills|Pocock's skills repo]]. A prototype is **throwaway code that answers a question** — not production code, not a spec. Mechanics from Pocock's walkthrough:

- The agent generates 2–3 candidate implementations (options A/B/C), each encoding different design decisions the human can react to and iterate on.
- The session runs against the **live route** when possible (not a throwaway route) — "a more honest representation of how the code is actually going to work."
- It is saved on a **throwaway branch**. When complete, an [[afk-agent]] deletes the prototype code and re-implements the design against the original spec, copying the real front-end logic out of the prototype.
- Cost is explicit: Pocock's search-bar prototype took ~100k tokens. Higher fidelity = more tokens, but more useful answers than a lower-fidelity discussion.

### UI vs Logic Prototypes

The technique is not only for front-end work:

- **UI prototypes** answer "how should it look / behave?" — the dominant case, because visual/interactive questions are hardest to resolve in discussion.
- **Logic prototypes** answer "does this state model / logic feel right?" Pocock builds a tiny interactive terminal app that pushes a state machine through cases hard to reason about on paper — a pure-logic prototype.

Both produce a reference artifact the implementer can read.

### Wayfinder

`/prototype` is one ticket type in Pocock's **Wayfinder** skill — a skill for planning a huge chunk of work by splitting it into planning sessions, each with its own ticket. The two relevant ticket types are **grilling** (chatting with the agent to resolve basic scope) and **prototype** (raising the fidelity of the discussion with a cheap, rough, concrete artifact to react to). Wayfinder gives a clear criterion for when to reach for a prototype regardless of whether you use the larger planning system. Pocock credits Ryan Singer's *Shape Up* (free online) as the influential book behind this way of working.

## Relationship to Existing Theory

Prototyping is the high-fidelity cousin of two wiki concepts:

- [[tracer-bullets]] — thin vertical slices shipped to validate early. Prototypes differ in that they are **explicitly throwaway**: the goal is to resolve a design question, not to ship the first slice. A prototype may become the basis for the shipped code (copied out by the AFK implementer), but its primary job is to make the discussion concrete.
- [[code-clarifies-spec]] — implementation generates decisions the spec didn't anticipate. Prototyping is the deliberate, upfront application of that insight: rather than discovering spec gaps late, build a rough version early to surface them.
- [[ai-design-loop]] — the grilling/alignment phase. `/prototype` is the handoff skill that raises the discussion's fidelity when "how should it look/behave?" is the open question.

It also pressures the [[spec-driven-development|spec-first]] position: for questions about look-and-feel or behavior-under-load, a prototype answers faster and more reliably than a more precise spec. See [[intent-to-code]] — prototyping is the alignment-first position (position 3) operating at higher fidelity than discussion alone.

## Thread
- [[intent-to-code]] — Prototyping is alignment-first (position 3) at higher fidelity; pressures the spec-precision positions (1 & 2).
- [[the-agent-workflow]] — The prototype → throwaway branch → AFK re-implement cycle is a concrete instantiation of the HITL/AFK split.

## Related

- [[matt-pocock]] — Originator of the `/prototype` skill and the fidelity framework.
- [[mattpocock-skills]] — The skill set that ships `/prototype` and Wayfinder.
- [[ai-design-loop]] — The grilling phase that `/prototype` hands off from and back to.
- [[tracer-bullets]] — The shipped-slice sibling; prototypes are throwaway, tracer bullets are production.
- [[code-clarifies-spec]] — Prototyping is the deliberate upfront version of this feedback loop.
- [[afk-agent]] — The agent that re-implements the prototype against the spec on a throwaway branch.
- [[spec-driven-development]] — The position prototyping pushes against for look/behavior questions.
- [[intent-to-code]] — Prototyping sits at position 3 (alignment-first) but at higher fidelity than discussion.
- [[plan-disposability]] — The prototype and its branch are disposable; the design decisions extracted from it are the durable output.

## Sources

- `raw/yt-dont-waste-time-on-specs-prototype-instead.md` — Pocock's video introducing the `/prototype` skill and the fidelity framework. Defines prototype as throwaway code that answers a question; high vs low fidelity discussions; Wayfinder as the planning container (grilling + prototype ticket types); UI vs logic prototypes; the ~100k-token cost of a prototype session; the throwaway-branch → AFK re-implement handoff; the Shape Up lineage.
