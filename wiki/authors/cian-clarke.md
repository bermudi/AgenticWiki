---
title: Cian Clarke
created: 2026-06-07
updated: 2026-06-08
sources:
  - raw/yt-cian-clarke-vibe-coding-to-spec-driven-dev.md
unaudited_marginal: 0
tags: [author, practitioner, near-form, spec-driven-development, multi-agent]
---

# Cian Clarke

> Engineer at Near Form; DevCon Fall 2025 speaker. Primary practitioner source on taking spec-driven development from a single-player workflow to a multi-player team process. Reports empirical fit (greenfield MVP, modernization, cross-service migrations) and miss (brownfield at scale, legacy languages, simple prototypes).

## Background

Clarke works at Near Form, a company headquartered in southeast Ireland with global presence. Near Form came of age in the Node.js event-driven programming era, and has been looking at "what's the next 10 years going to look like for us" — particularly the world of AI native engineering and where specs can move the team "much quicker." The SDD work reported in the November 2025 DevCon talk covers 6-9 months of internal experience at Near Form.

## Key Contributions

### The single-player-to-multiplayer framing

Clarke borrows this frame from another DevCon speaker's keynote. The current state of SDD tooling (Kiro, BMAD, Spec Kit) is centered on the single-player mode: one individual contributor driving a sequence of stories, executed serially. Clarke's bet is that "most of the tools for doing spectrum development right now being centered around that single player mode of operation is probably the biggest challenge that we're having right now."

The fix is two-layered: (1) decompose the backlog by *contributor specialization* (frontend, backend, DevOps) so stories target a unique area of the architecture, reducing merge conflicts; (2) introduce a *staging gate* to prevent any contributor from moving on without committing, pushing, and rebasing — because at agentic team pace, the codebase is "moving along not at the pace of regular work but at the pace of an agentic team," so the consequences of forgetting to commit are magnified.

### The PRD + Architecture + Task Backlog stack

The Near Form project-level spec structure is three documents: PRD (the what and why), architecture doc (the how), and task backlog (decomposed work). Each task gets its own "story spec" with just enough context. The agent writes a work log to its story spec, so the next task has explicit context about what was done previously. "Very very very very often that previous story is going to dictate what the model's going to do next."

The framework is built on top of Kiro (for project structure) and BMAD method (for role definition). Near Form is incorporating its own roles — technical director, QA tester, backend engineer — "as a very hypers specialized role definition with a series of commands in each role."

### The empirical fit/miss map

Where SDD pays off (Near Form's experience):

- **Greenfield MVPs** that are actually going to ship, not prototypes.
- **Modernization** work (node version upgrades, framework migrations).
- **Challenging business cases** — projects where the business won't commit to a 5-6 month build but will commit if the timeline can be cut in half or quartered.

Where SDD doesn't pay off (Near Form's experience):

- **Large brownfield projects** — "struggled to date... early early experiments, not the best."
- **Proprietary or legacy languages** the model isn't fluent in.
- **Simple prototypes** — "the specd driven workflow is actually quite a heavyweight thing for building that really simple prototype. Probably better off to use, you know, some sort of vibe coding tool, be it KO in vibe mode or bolt new or or whatever."

### "The hyperparameter race might not be the path to success"

Clarke's forward-looking claim: "I sort of reckon the hyperparameter race might not be the path to success here now and what we're going to see over the next 6 to 12 months. It's probably going to be more of a refinement of the techniques and ways that we interact with foundation models." The "best approximation of what specri development is going to look like in the future right now is living in the open source" — specifically BMAD.

## Demo Content

The talk's live demo used Kiro to build a 3D unicorn rendering engine, comparing vibe coding to spec-driven mode. In vibe mode, the demo produced "sausage dogs" and "rhinoceroses" — failed to use React, didn't complete a feature, got stuck retooling the test runner. In spec mode, the same prompt produced a "much more plausible unicorn" with configurable mane color, body color, etc. The point: bounded context windows (one task per spec) + decomposed backlog + grounding in architecture doc solved both the overeagerness problem (agent doing things not asked) and the undercompleteness problem (agent not finishing requirements).

## Related

- [[spec-driven-development]] — The hub concept page; Clarke is the primary practitioner source for the team-scale SDD view
- [[single-player-to-multiplayer]] — Clarke's framing of where SDD tooling needs to evolve
- [[kiro]] — One of the two tool foundations Near Form uses (the other being BMAD)
- [[bmad-method]] — The other tool foundation; heavy on specialized role definition
- [[intent-to-code]] — Clarke's stack is the most explicit practitioner instantiation of the plan-as-contract position
- [[near-form]] — The consultancy where Clarke works
- [[birgitta-boeckler]] — ThoughtWorks writer on SDD methodology; recommended by Clarke as further reading
- [[al-harris]] — Kiro principal engineer; complementary technical depth on EARS and property-based testing

## Sources

- `raw/yt-cian-clarke-vibe-coding-to-spec-driven-dev.md` — DevCon Fall 2025 talk. Practitioner report on SDD at Near Form: PRD + architecture + task backlog stack; single-player-to-multiplayer transition; specialized role definitions; empirical fit (greenfield MVP, modernization) and miss (brownfield, legacy languages, simple prototypes); Kiro and BMAD as foundation tools; unicorn rendering engine demo; "hyperparameter race might not be the path" forward-looking claim.
