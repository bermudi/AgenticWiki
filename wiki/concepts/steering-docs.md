---
title: Steering Docs
created: 2026-06-07
updated: 2026-07-06
sources:
  - raw/yt-al-harris-amazon-kiro-faang-spec-driven.md
unaudited_marginal: 0
tags: [concept, configuration, kiro, context-files, agentic-engineering]
---

# Steering Docs

> Steering docs are [[kiro|Amazon Kiro]]'s branded equivalent of context files (AGENTS.md, CLAUDE.md, .cursorrules). Treated as *accumulated learnings* — operational notes, code style preferences, and project-specific gotchas the agent should always know — rather than static configuration. The system prompt makes steering available to the agent at every turn, in contrast to context files which are typically read once at session start. Steering and AGENTS.md-class context files are functionally similar; the Kiro framing emphasizes learning over configuration.

## The Three Demonstrated Use Cases

[[al-harris|Al Harris]] shows three concrete steering use cases in the AI Engineer talk:

### 1. Commit style preferences

Steering can encode rules the agent must follow every time. Harris's example: "very specifically my requirement for Curo is just use the UI attributed to the co-author of Kuro agent um which is trivial but also I want it to happen every time." The agent generated a commit co-authored by "Kiro agent" automatically.

This is the [[inferential-rule-following]] problem solved: the rule is concrete, the trigger is well-defined, and the agent reliably executes it.

### 2. Code style and coverage minimums

Steering can encode engineering standards: "whenever you add a spec or you're adding a new module, make sure that you annotate it with coverage minimums that are 90% because that's the thing I care about."

The mechanism: the steering doc is in the system prompt, so the constraint is part of the agent's context for every task — not something the agent has to remember or look up.

### 3. Operational learnings

The distinctive Kiro pattern: as the agent works, write what it learns into steering. Harris: "I went through this kind of painful process of figuring out oh you know you have to use this parameter on the CDK the CDK command you have to use this lag otherwise it doesn't work correctly and so once I go through that pain of learning I just say kira write what you learned into a steering doc and it will usually do a very good job of summarizing."

This is [[evolving-context]] in practice: the agent improves its own operating context over time. The hard-won operational knowledge from one task (CDK command requires a specific flag) becomes available to all future tasks via steering.

## Why This Matters

Steering is the operational layer of Kiro's spec-driven pipeline:

- **Specs** capture *what* the system should do
- **Design** captures *how* the system should be built
- **Tasks** capture *what work to do*
- **Steering** captures *how the agent should work* — the persistent context

Without steering, the agent re-learns the same operational gotchas every session. With steering, the learnings accumulate. The agent becomes a more reliable operator over time on the same project.

## The Synonymy Problem

Cian Clarke ([[cian-clarke]], [[spec-driven-development]]) names the annoyance: "the project constitution as it's called in spec kit or I suppose you could view this as synonymous with um the claw MD file or a cursor rules file... Annoyingly it's called a different thing in every single IDE. And it'd be great if we could all centralize on what we're going to call this, but we'll get there."

The pattern: every SDD tooling vendor has its own term for the same artifact. The wiki tracks them as [[context-files]] with vendor-specific instances (steering, constitution, rules, etc.).

## Empirical Position

The empirical evidence on [[context-files]] (Gloaguen et al. and Lulla et al., 2026) suggests steering docs sit on the right side of the design space: short, developer-written, minimal-by-design, and operational. The broader context-file literature is tracked on [[context-files]] rather than duplicated here, but the relevant findings are that **`/init`-style auto-generated dumps** *reduce* task success rate by 0.5-2% and *increase* cost by >20% — an effect driven by redundancy with existing documentation (stripping all docs flipped it to +2.7%), not by LLM generation as such. Kiro's "write what you learned into a steering doc" pattern is curated, incremental generation of operational learnings — exactly the kind of non-redundant generation the study did *not* test and does not implicate. Developer-written minimal files are neutral-to-positive on simple tasks, and reasoning overhead increases by 14-22% with verbose context files. The "accumulated learnings" framing is the agent-side answer to "what should go in a context file" — operational knowledge the agent discovers, with the human in the loop curating what makes it in.

## Relationship to the Wider Wiki

- [[context-files]] — The general category; steering is Kiro's specific instance
- [[evolving-context]] — The principle of agents improving their own context over time
- [[agent-skills]] — Skills provide procedural knowledge (how to do things); steering provides operational context (what to know about this project)
- [[leading-words]] — Complementary steering lever: steering docs inject persistent constraints into the system prompt; leading words inject posture-shaping phrases into the skill body. Steering docs are always-on; leading words fire when the skill fires.
- [[inferential-rule-following]] — Steering is one mechanism to compensate for the model's weak rule-following by making rules concrete and persistent
- [[kiro]] — The product that uses steering

## Thread

- [[tool-design-for-agents]] — Steering is a tool-level interface for shaping agent behavior; its design directly impacts agent effectiveness
- [[the-agent-workflow]] — Steering is the persistent layer of the agent workflow; the rest of the session builds on it
- [[the-slop-problem]] — Well-designed steering can constrain agent output and reduce slop; poorly designed steering can encourage unnecessary exploration
- [[context-engineering]] — Steering is concrete context engineering: high signal density, persistent, always available
- [[evolving-context]] — The principle steering instantiates in practice

## Related

- [[kiro]] — The product that uses steering
- [[al-harris]] — The principal engineer who presented the steering pattern
- [[context-files]] — The general category
- [[agent-skills]] — Complementary: skills are procedural, steering is operational
- [[leading-words]] — Complementary steering lever: steering docs inject persistent constraints into the system prompt; leading words inject posture-shaping phrases into the skill body
- [[inferential-rule-following]] — The problem steering helps solve
- [[cian-clarke]] — Names the synonymy problem across SDD tools

## Sources

- `raw/yt-al-harris-amazon-kiro-faang-spec-driven.md` — AI Engineer talk. Steering as accumulated learnings; three use cases (commit style, code style, operational learnings); available to the agent across sessions; complements EARS requirements and design artifacts.
