---
title: Code Economics
created: 2026-07-27
updated: 2026-07-27
sources:
  - raw/software-engineering-not-writing-code-schillings.md
unaudited_marginal: 0
tags: [concept, economics, ai-engineering, code-generation]
---

# Code Economics

> The fundamental shift in the economics of code production: when writing code becomes free or nearly free, the entire software industry's cost structure, quality assumptions, and organizational design invert.

## The Core Claim

[[benoit-schillings|Benoit Schillings]] frames the economic shift with precision:

> "We developed a whole software engineering culture and infrastructure and set of companies based on the assumption that writing code was the hard part. This was the expensive part. We're now in a world where writing code is free or nearly free."

The "nearly" matters — there's still a computational cost and an inference cost, but the marginal cost of producing one more line of code has collapsed to near zero. This inverts the economic logic that shaped every software company, every engineering workflow, and every hiring practice for the past 50 years.

## The Implosion of Code Volume

When code is free, the amount of code produced explodes. Schillings estimates that "80% of the new code added to GitHub today is machine-generated." This has several consequences:

1. **Design adequacy becomes the binding constraint.** In front of "that mountain of code which will be written or written dynamically, how do we keep systems which works and are reliable at the microscopic level?"
2. **Code review becomes impossible.** Schillings predicts that within a year, "we'll let Gemini or other model generate the code and nobody will actually look at it." The analogy: compilers still have an option to check assembly output, but nobody uses it.
3. **Security becomes a never-ending arms race.** Models discover vulnerabilities faster than they can be patched. "We're going to get a certain layer of vulnerability discovered by models we're going to fix those models will get smarter they will go a bit deeper and find even more subtle vulnerability."

## The Economic Logic Inversion

The old economics: code is expensive → minimize code written → careful design → code review → small teams of expensive engineers.

The new economics: code is free → maximize code useful → rapid experimentation → verification at scale → architecture and design become the scarce skills.

This isn't just a speed-up — it's a structural inversion. The skills that commanded premium compensation (implementation speed, syntax mastery, debugging intuition) are commoditized. The skills that were "soft" or "leadership" (architecture, design authority, system thinking, taste) become the binding constraint.

## Connection to Peak Programmer

The code-economics thesis is the economic driver behind [[peak-programmer]]. Where [[dhh|DHH]] argues from the demand side (demand for manual implementers has peaked), Schillings argues from the supply side (code supply has become nearly infinite). The convergence: when supply is infinite and the bottleneck is design, the implementer role contracts and the architect role expands.

The economic inversion also explains why [[thorsten-ball|Thorsten Ball]]'s "code as cattle" framing resonates: when code is cheap, treating it as precious (careful PR reviews, contribution graphs, line-by-line ownership) is economically irrational. The artifacts that matter shift from code to specifications, from implementations to architectures.

## Security as an Economic externality

The most dangerous consequence of cheap code is that security becomes an externality. When writing code was expensive, every line was implicitly reviewed by the person who wrote it. When code is free, the volume exceeds any human's ability to audit it. Schillings' "never-ending" vulnerability discovery cycle — models find flaws, patches are applied, models find deeper flaws — is the security externality playing out in real time.

> [!note] Extension: The vulnerability cycle as a verification arms race
> Schillings describes a pattern where models discover vulnerabilities, patches are applied, models find deeper vulnerabilities, and the cycle continues indefinitely. This is the [[verifiability]] thesis applied adversarially: the same verification capability that makes code automatable (tests, compilation) also makes vulnerability discovery automatable. The arms race is between offensive verification (finding bugs) and defensive verification (proving correctness). Defensive verification is harder because it requires proving the absence of bugs, not just finding one.

## Thread

- [[the-human-lever]] — The economic inversion explains why the human lever matters more: when implementation is free, design authority and verification become the scarce resources
- [[the-verifiability-thesis]] — Code economics is driven by verifiability: code became cheap because it's verifiable (tests, compilation), and the economic consequences follow from that verifiability
- [[the-slop-problem]] — Cheap code produces volume that exceeds review capacity, creating the conditions for slop accumulation

## Related

- [[peak-programmer]] — The economic consequence: demand for manual implementers peaks as implementation cost approaches zero
- [[benoit-schillings]] — Originator of the code-economics framing
- [[verifiability]] — The mechanism that makes code cheap: verifiable domains get automated first
- [[the-slop-problem]] — Cheap code without verification discipline produces slop
- [[agent-quality-engineering]] — The quality infrastructure needed when code volume exceeds human review capacity
- [[vibe-coding]] — The consumer experience of cheap code: trust the model, don't read every line
- [[software-factory]] — The industrial-scale response to cheap code: automated pipelines that produce and verify code at machine speed
- [[thorsten-ball]] — "Code as cattle" as the practical posture when code becomes cheap
- [[dark-factory]] — The logical endpoint of cheap code: fully automated production where no human reads the output

## Sources

- `raw/software-engineering-not-writing-code-schillings.md` — AI Engineer talk: code is "free or nearly free," 80% of GitHub is machine-generated, security vulnerability arms race, the economic inversion from implementation-value to architecture-value.
