---
title: Improve Codebase Architecture
created: 2026-04-29
updated: 2026-05-02
sources:
  - raw/How To De-Slop A Codebase Ruined By AI (with one skill) - youtube.com.md
tags: [project, skill, ai-engineering, refactoring, architecture]
---

# Improve Codebase Architecture

> A skill created by [[matt-pocock|Matt Pocock]] that systematically scans a codebase for deepening opportunities — places where modules can gain [[locality-and-leverage|locality and leverage]] — and guides the human through a grilling session to design the refactored module shape.

## What It Does

The skill operates in three phases:

1. **Explore**: Scans the codebase for architectural weaknesses — parallel implementations of the same concept, untested [[seams-and-adapters|seams]], concepts scattered across multiple files with low locality, or [[deep-vs-shallow-modules|shallow modules]] with poor leverage. Returns a list of deepening candidates with rationale.

2. **Grill**: Once the human picks a candidate, the skill enters a structured Q&A session. It probes the human's intent for the module (What should the interface look like? What adapters will satisfy it? What invariants must hold?) and challenges fuzzy answers. This is the [[ai-design-loop]] applied to architecture.

3. **Propose**: Produces a concrete module design — TypeScript interfaces (or equivalent), method signatures, and invariants — that can be filed as a GitHub issue for an [[afk-agent]] to implement.

## Design Philosophy

The skill is explicitly **not AFK**. It demands judgment from the human:

> "This is not an AFK skill that you can just sort of run and rely on to continually improve your codebase. This requires a judgment call from you, the programmer, sitting above the LLM."

Matt uses the general/sergeant metaphor: the skill is the sergeant scouting the terrain and reporting opportunities, but the human general decides which battles to fight and how.

## Operational Rhythm

Matt recommends running this skill **every couple of days**, especially in fast-moving codebases. The rationale:

- AI-accelerated development means architecture drifts faster than human-written codebases.
- Frequent small deepening is cheaper than occasional large refactors.
- The skill itself becomes more valuable as it learns the codebase's domain language and patterns.

## Relationship to Other Tools

- Feeds into the [[the-agent-workflow|HITL/AFK cycle]]: the skill produces a GitHub issue (Destination), which is broken into tasks (Journey), implemented by an AFK agent.
- Pairs with [[ubiquitous-language]]: the glossary established by the skill's grilling phase becomes the vocabulary for the implementing agent.
- Complements [[grey-box-engineering]]: the skill identifies where grey box boundaries should be drawn.

## Related

- [[matt-pocock]] — Created the skill.
- [[locality-and-leverage]] — The two criteria the skill evaluates deepening candidates by.
- [[seams-and-adapters]] — The skill hunts for concepts without a single seam.
- [[deep-vs-shallow-modules]] — The skill finds shallow modules to deepen.
- [[afk-agent]] — The skill produces GitHub issues for AFK agents to implement.
- [[ai-design-loop]] — The skill applies the design loop to architecture: explore, grill, propose.
- [[ubiquitous-language]] — The grilling phase establishes vocabulary for the implementing agent.
- [[slop-watch]] — Slop Watch represents the third leg of Matt's quality triage: alignment + architecture awareness + automated review.

## Thread

- [[the-agent-workflow]] — The architecture review cadence within the day-to-day workflow.
- [[the-human-lever]] — The human general's operational tool for owning design boundaries.
- [[the-slop-problem]] — Systematic scan for slop-prone module boundaries.

## Sources

- `raw/How To De-Slop A Codebase Ruined By AI (with one skill) - youtube.com.md` — Full walkthrough of the skill in action on the course-video-manager repo.
