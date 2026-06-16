---
title: Onewords
created: 2026-06-07
updated: 2026-06-07
sources:
  - raw/yt-learnings-from-a-no-code-library-keeping-the-spec-driven-development-triangle-in-sync.md
tags: [project, no-code, spec-driven-development, proof-of-concept]
unaudited_marginal: 0
---

# Onewords

> A software library with no code — a GitHub repository containing only a markdown spec, 750 conformance tests in YAML, and an install.md paragraph for agent setup. Converts Unix timestamps into human-readable relative time ("about 12:00", "5 hours ago"). Created by [[drew-breunig|Drew Breunig]] as a proof of concept for spec-driven development. Over 1000 GitHub stars.

## What It Is

Onewords is a deliberately simple library: it takes a Unix date stamp and converts it into something human-readable. The entire repository contains:

- A markdown file detailing what the library is supposed to do (the spec)
- ~750 conformance tests in YAML — given this input, expect this output
- `install.md` — a single paragraph you paste into the agent of your choice, specifying the language and save location

There is no implementation code. The spec and tests ARE the library. You bring the agent, the agent writes the code.

## What Happened

The project "blew up" — 1000+ GitHub stars, community engagement that looked like a normal open-source project:

- Stars, issues, pull requests
- PRs were good: "In this test you are expecting this result, but this violates the rounding rule that you detail in the spec. You need to chew these two things up."
- Contributors surfaced test-vs-spec mismatches that Breunig himself hadn't caught

## What It Proved (and Didn't)

Onewords proved that specs + tests can drive agent-generated code, and that the community can contribute to spec-driven projects by fixing spec/test mismatches. But Breunig later called it "a toy":

- It was constrained and small (750 tests, single-purpose function)
- The spec was exhaustive for its scope — not representative of real-world complexity
- Other spec-driven projects (Vercel's just-bash, Pyantic's Monty, Anthropic's C compiler) were larger but **none were complete**
- The "low-hanging fruit" problem: all these projects used large existing testing libraries from existing projects (Bash, Python, C)

The SQLite joke: "Pretty soon anyone who wants to protect themselves is going to be like SQLite where the code is free but you got to pay for the tests."

## Significance

Onewords is the original inspiration for the broader [[spec-driven-development]] movement. It demonstrated that the approach works for constrained problems and generates genuine open-source engagement. But its limitations — constrained scope, borrowed test suites, incompleteness at scale — are the problems that the [[spec-code-triangle]] was designed to address.

## Related

- [[drew-breunig]] — Creator
- [[plum-dev]] — The tool Breunig built after learning from onewords
- [[spec-driven-development]] — onewords as the original SDD proof of concept
- [[spec-code-triangle]] — The conceptual model that emerged from onewords' limitations
- [[intent-to-code]] — onewords as position 2 (plan-as-contract) in action
- [[kiro]] — Amazon's spec-driven IDE that applies the same principle at larger scale

## Sources

- `raw/yt-learnings-from-a-no-code-library-keeping-the-spec-driven-development-triangle-in-sync.md` — Breunig's talk; all claims derive from this source
