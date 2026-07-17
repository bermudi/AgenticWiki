---
title: Matt Pocock Skills
created: 2026-07-17
updated: 2026-07-17
sources:
  - raw/yt-mattpocockskills-learn-the-whole-flow-end-to-end.md
tags: [project, skill-set, ai-engineering, agent-workflow, matt-pocock]
unaudited_marginal: 0
---

# Matt Pocock Skills

> [[matt-pocock|Matt Pocock]]'s public skill set (`mattpocock/skills`), distributed via `npx skills add mattpocock/skills` and built around a single end-to-end idea-to-ship pipeline: `setup` configures the repo, `grill-with-docs` aligns on a destination, `to-spec` and `to-tickets` decompose the destination into per-session slices, and `implement` runs each ticket and auto-runs `code-review` in subagents. The whole flow is 38 user-invoked skills weighing about 660 tokens of context — proof that the [[agent-skills#Pocock's Skill Design Checklist|user-invoked progressive-disclosure tradeoff]] can carry a full workflow at minimal context cost.

The repo is the operational realization of every concept on the [[matt-pocock|author page]]. Where [[improve-codebase-architecture]] solves one recurring problem (architecture triage), this repo solves the meta-problem: how a developer goes from a vague idea to a shipped change with the agent in a single coherent loop.

## The Flow

The end-to-end pipeline, in order:

1. **Install**: `npx skills add mattpocock/skills` — Vercel's `skills.sh` CLI fetches the repo and copies/symlinks the skills into the agent's directory.
2. **Setup**: `/setup-matt-pocock-skills` — configures the repo for the flow. Three decisions: which issue tracker to use (GitHub Issues, Linear, Jira, or local markdown), which triage labels to apply, and whether the repo has a single domain context or multiple bounded contexts. The setup also writes pointers into the project's `CLAUDE.md` so future sessions discover the configuration.
3. **Ask Matt**: `/ask-matt` — a meta-skill that knows the whole flow and answers "how do I get started?" style questions. The recommended entrypoint for new users.
4. **Grill With Docs**: `/grill-with-docs` — the [[ai-design-loop|grilling phase]]. Asks the user clarifying questions until shared understanding is reached, writing the destination into `context.md` and `ADRs`. The `prototype` skill bridges in and out by handoff for questions that need a runnable answer.
5. **Fork**:
   - **If the work fits one Smart Zone session (~140k tokens)**: `/implement` directly. The implement skill runs the work, then auto-runs `code-review` in subagents.
   - **If the work spans multiple sessions**: `/to-spec` first, then `/to-tickets`.
6. **To Spec**: `/to-spec` — compresses the discussion into a destination document (problem statement, solution, user stories, implementation decisions, testing decisions). Saved to the configured issue tracker.
7. **To Tickets**: `/to-tickets` — slices the spec into tickets, each sized to fit in a single context window. This is the explicit per-session context budget: one ticket, one [[smart-zone-dumb-zone|smart zone]], one `implement` invocation.
8. **Implement**: `/implement <ticket>` — runs the ticket, then auto-runs `/code-review` in a subagent.
9. **Code Review** (subagent): runs in a fresh context window. Compares the work against the original spec (every acceptance criterion cross-checked) and against coding standards ([[martin-fowler]]'s defaults, or the repo's own standards if they exist). The reviewer is a subagent because the main agent "is often really bad at editing code or improving code they've just written" — it sees its own work as already correct.

Each ticket is implemented one at a time, with context cleared between tickets. The implementer does not run all tickets in one go — the per-session context budget is the unit of execution.

## Design Properties

### User-Invoked Across the Board

Every skill in the set is `disable_model_invocation: true` — the user invokes each one explicitly with `/skill-name`. The aggregate footprint is 660 tokens of context across all 38 skills. This is the empirical proof of the [[agent-skills#Pocock's Skill Design Checklist|user-invoked tradeoff]]: cognitive load shifts to the user, but the context load on the agent is bounded by design.

> [!note] Synthesis: Skills as Orchestrator, Not Library
> The set is not a toolbox the agent browses. It is an **orchestrator the user conducts**. The user picks the next skill, decides whether to fork to `to-spec`, decides how many tickets to run before clearing context. The agent never decides which skill fires next — that decision lives outside the agent's context. This is a different design point than the [[multi-tier-action-space]] tool layer (which the agent *does* navigate), and it is why 38 skills cost only 660 tokens.

### Subagent Code Review

Code review runs in a subagent by design. The main agent that wrote the code cannot review it well — its own reasoning traces are anchored to the implementation choices. The reviewer subagent starts with a clean context window and reads only the spec, the standards, and the diff. This is the same [[fresh-context-subagents|fresh-context-subagents]] principle that GSD Core uses for its execute phase, applied to the specific failure mode of self-review.

> [!note] Synthesis: Where the Subagent Boundary Belongs
> The wiki already documents subagent boundaries at two places: [[fresh-context-subagents]] for general sub-skill execution, and [[spec-code-triangle]] for the spec/code/test triangle's separation of concerns. The Pocock skills add a third: the **implementation/review boundary** within a single ticket. Each implement → review cycle is a two-agent interaction where the reviewer intentionally knows nothing about the implementer's reasoning process. The fresh context is the audit mechanism.

### Spec = Destination, Tickets = Path

The split between `to-spec` and `to-tickets` is structural. The spec is the *destination* — what the system looks like when the work is done. The tickets are the *path* — the ordered slices that get there. Two consequences:

- The spec is the comparison surface at the end. The reviewer's job is to check the implementation against the spec, not against the tickets. The spec is the truth; the tickets are the plan.
- Tickets are disposable artifacts. The spec is durable. This mirrors the [[plan-disposability]] finding from [[dex-horthy-agentic-engineering]] (detailed plans are *anti-leverage*) while preserving the durable destination.

### One Ticket = One Smart Zone

Every ticket is sized to fit in a single context window. Pocock's working number is ~140k tokens as the smart-zone ceiling — beyond that, attention degrades and the model produces "weird hallucinations." The per-ticket sizing rule is the operational form of [[smart-zone-dumb-zone]]: ticket granularity is the unit at which context hygiene is enforced.

### Issue Tracker as Configuration

The `setup` skill makes the issue tracker (GitHub Issues, Linear, Jira, or local markdown) a configuration choice rather than a hardcoded assumption. The same flow works on any of them. The skill reads local configuration to decide where to file specs and tickets, and the `to-spec` and `to-tickets` commands adapt to whatever backend is configured. This is the same pluggable-target pattern as the [[open-knowledge-format]]'s portable frontmatter: a workflow that does not bind to a specific vendor survives model and tooling churn.

## What the Skills Set Doesn't Do

The repo deliberately does not address a few areas that other workflow tooling handles:

- **Parallel execution across tickets**: the flow is sequential per-ticket. [[sandcastle]] is the parallelized version, but it is a separate TypeScript library, not part of the skills set.
- **Long-running background agents**: there is no built-in "start an AFK agent and check back later" mode. The flow assumes a developer in the loop, clearing context between tickets.
- **Eval infrastructure**: there is no built-in eval framework. The flow's verification is the `code-review` skill, which is a one-shot LLM check, not a probabilistic CI gate. The [[agent-quality-engineering]] thread covers the eval gap with a different architecture.
- **Multi-agent coordination**: each skill is a single-agent flow. There is no built-in routing, no orchestrator agent, no role-specialized sub-agents (other than the code-review subagent). The [[multi-agent-illusion]] audit and [[the-multi-agent-theory]] thread cover the territory the skills set does not.

## Relationship to Other Pocock Work

- [[improve-codebase-architecture]] — A single-purpose skill (architecture triage) that fits inside the flow as a possible `grill-with-docs` target.
- [[ai-design-loop]] — The theory the skills set operationalizes. The grilling, the destination/journey split, the no-PRD-review philosophy, the push vs pull instruction strategy all live in the theory page; the skills set is what the human actually runs.
- [[sandcastle]] — The parallelized implementation pipeline. The skills set produces the spec and tickets; Sandcastle runs them in parallel across Docker sandboxes.
- [[slop-watch]] — The observability platform. The skills set has no observability layer; Slop Watch provides one.

## Thread

- [[the-agent-workflow]] — The skills set is the most concrete shipped instantiation of the workflow's HITL/AFK + per-session context model.
- [[the-slop-problem]] — The 38-skill / 660-token footprint is the anti-slop argument: progressive disclosure + user-invoked skills let a workflow scale without context pollution.
- [[agent-quality-engineering]] — The `code-review` subagent is the only verification step. The skills set does not provide the evals or production tracing layer the thread requires.
- [[the-cognitive-cost]] — User-invoked skills shift load to the human's memory and discipline. The skills set makes the cognitive cost explicit by hiding the flow behind explicit `/`-commands.

## Related

- [[matt-pocock]] — Author of the skill set.
- [[agent-skills]] — The skill design theory; the repo is the empirical demonstration.
- [[ai-design-loop]] — The theory the flow operationalizes.
- [[improve-codebase-architecture]] — A single skill from the set, broken out as its own project page.
- [[sandcastle]] — The parallel execution layer for the tickets this set produces.
- [[slop-watch]] — The observability layer the set does not include.
- [[smart-zone-dumb-zone]] — Per-ticket context budget is the operational form of the smart zone.
- [[fresh-context-subagents]] — The pattern the code-review subagent implements.
- [[plan-disposability]] — The tickets are disposable; the spec is the durable artifact.
- [[open-knowledge-format]] — Pluggable issue tracker is the same portability principle.
- [[leading-words]] — The skills set is built on the same steering technique.
- [[pi]] — The wiki's own skill system follows the same `skill.md` pattern; the structure of this page's parent repo is the reference implementation.

## Sources

- `raw/yt-mattpocockskills-learn-the-whole-flow-end-to-end.md` — Pocock's own end-to-end tutorial of the skills set. Walks through install, setup, the full idea-to-ship flow, and the code-review-in-subagent pattern. Provides the 660-token footprint figure, the ~140k smart-zone threshold for ticket sizing, and the explicit spec = destination / tickets = path framing.
