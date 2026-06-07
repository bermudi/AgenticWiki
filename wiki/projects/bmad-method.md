---
title: BMAD Method
created: 2026-06-07
updated: 2026-06-07
sources:
  - raw/yt-cian-clarke-vibe-coding-to-spec-driven-dev.md
unaudited_marginal: 0
tags: [project, open-source, spec-driven-development, multi-agent, role-definition]
---

# BMAD Method

> Open-source spec-driven development methodology that installs into Claude Code or Cursor. Strong on specialized role definition (technical director, QA tester, backend engineer) and detailed workflow. Recommended by [[cian-clarke]] for developers who want to "go really really deep" on SDD and see "maybe a little preview of the future."

## Overview

BMAD is one of the three dominant SDD tooling stacks as of late 2025 / early 2026, alongside GitHub Spec Kit and [[kiro|Amazon Kiro]]. The distinction per [[cian-clarke]]: where Kiro is "a great place to start, um, if you've got a couple of hours to spare in building something... and you want to move relatively quickly, its user interface makes it a really, really easy on-ramp," BMAD is for users with "a couple of days to devote and you really want to go deep on this stuff and see what maybe a little preview of the future might look like."

Clarke: "It does a lot of that specialized role definition um and allows you to follow a really detailed workflow for your your spec driven methodology."

## Where It Fits in the Near Form Stack

[[cian-clarke|Near Form]] uses two foundation tools: Kiro for project structure (specs, design docs, task lists), and BMAD for role definition. Near Form is "incorporating into the bad method some of our own roles as near form. So people who we have in near form being represented by a very hypers specialized role definition with a series of commands in each role."

The role definitions are the conceptual foundation for the [[single-player-to-multiplayer]] transition — they let different agent instances take on different specialized roles within a team workflow.

## Open-Source Future

Clarke: "I have great faith in the fact that the best approximation of what specri development is going to look like in the future right now is living in the open source. I think that's freaking awesome um in the form of BMAD."

## Related

- [[spec-driven-development]] — The methodology BMAD codifies
- [[kiro]] — The other foundation tool Near Form uses
- [[single-player-to-multiplayer]] — Clarke's framing; BMAD's role-definition pattern is the foundation
- [[cian-clarke]] — The Near Form engineer who recommends BMAD for deep SDD work
- [[spec-kit]] — The third major SDD tooling stack (GitHub's open source)

## Sources

- `raw/yt-cian-clarke-vibe-coding-to-spec-driven-dev.md` — DevCon Fall 2025 talk. BMAD as the open-source deep-dive SDD methodology; role-definition strength; Clarke's recommendation for developers with time to invest; Near Form's incorporation of custom roles.
