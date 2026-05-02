---
type: web
url: https://paddo.dev/blog/ralph-wiggum-playbook/
title: "The Ralph Wiggum Playbook"
author: Emergent Minds (paddo.dev)
date: 2026-01-11
ingested: 2026-04-26
---

Title: The Ralph Wiggum Playbook

URL Source: https://paddo.dev/blog/ralph-wiggum-playbook/

Published Time: Sun Jan 11 2026 00:00:00 GMT+0000 (Coordinated Universal Time)

Markdown Content:
# The Ralph Wiggum Playbook
[Skip to content](https://paddo.dev/blog/ralph-wiggum-playbook/#main-content)
## [Emergent Minds | paddo.dev](https://paddo.dev/)

[Home](https://paddo.dev/)[About](https://paddo.dev/about)[Search](https://paddo.dev/search)

[GitHub](https://github.com/paddo)[RSS Feed](https://paddo.dev/rss.xml "RSS Feed")

![Image 1: The Ralph Wiggum Playbook](https://paddo.dev/_astro/ralph-wiggum-playbook.DNQjQUQZ_uu0RT.webp)

11-JAN-26[5 MIN]

[claude-code](https://paddo.dev/tags/claude-code/)[ai-coding](https://paddo.dev/tags/ai-coding/)[automation](https://paddo.dev/tags/automation/)[workflow](https://paddo.dev/tags/workflow/)[productivity](https://paddo.dev/tags/productivity/)

# The Ralph Wiggum Playbook

[Previously](https://paddo.dev/blog/ralph-wiggum-autonomous-loops), I covered Ralph Wiggum as a Claude Code plugin: install it, run `/ralph-loop`, wake up to working code. That post covered Anthropic’s official plugin. This one covers the underlying bash-based methodology - same technique, different implementation.

Geoffrey Huntley originated the technique. Clayton Farr documented and refined it into a [full playbook](https://github.com/ClaytonFarr/ralph-playbook). Huntley [forked it](https://github.com/ghuntley/how-to-ralph-wiggum), signaling endorsement.

## The Core Philosophy

Three principles drive the methodology:

*   **Context is scarce**: With ~176K usable tokens from a 200K window, you can’t afford bloated prompts. Keep each iteration lean.
*   **Plans are disposable**: A plan that drifts is cheaper to regenerate than to salvage. Don’t fight stale state.
*   **Backpressure beats direction**: Instead of telling the agent what to do, engineer an environment where wrong outputs get rejected automatically.

> Human roles shift from “telling the agent what to do” to “engineering conditions where good outcomes emerge naturally through iteration.”
> 
> — Clayton Farr

## Three-Phase Workflow

### Phase 1: Requirements

Human and LLM conversation. Identify jobs to be done. Break them into topics of concern. Create a spec file for each topic in `specs/`.

No code yet. Just requirements documented clearly enough that an agent can gap-analyze against them.

### Phase 2: Planning

The agent reads specs, examines existing code, and generates `IMPLEMENTATION_PLAN.md`: a prioritized task list with no implementation. Pure gap analysis.

This happens in “planning mode” with its own prompt (`PROMPT_plan.md`). The agent exits after writing the plan.

### Phase 3: Building

The agent picks the top task from `IMPLEMENTATION_PLAN.md`, implements it, runs validation, updates the plan, commits, and exits. Fresh context for the next iteration.

One task per iteration

This is the key insight. Each iteration processes exactly one task. Context stays lean. The agent stays in the [smart zone](https://paddo.dev/blog/12-factor-agents) instead of accumulating cruft.

## File Structure

Five files make it work:

```
project/
├── loop.sh                    # Bash orchestrator
├── PROMPT_plan.md             # Planning mode instructions
├── PROMPT_build.md            # Building mode instructions
├── AGENTS.md                  # Build/test/lint commands (~60 lines)
├── IMPLEMENTATION_PLAN.md     # Shared state between iterations
└── specs/
    └── *.md                   # One file per topic of concern
```

**loop.sh**: The outer loop. Feeds prompts to Claude, manages modes, enforces iteration limits. Simple bash.

**PROMPT_plan.md / PROMPT_build.md**: Mode-specific instructions loaded each iteration. Planning mode generates the plan. Building mode executes from it.

**AGENTS.md**: Operational guide. Build commands, test commands, validation steps. Keep it under 60 lines. Everything the agent needs to verify its work.

**specs/***: Source of truth for requirements. One markdown file per topic. The agent references these during gap analysis and implementation.

**IMPLEMENTATION_PLAN.md**: Persistent state. The agent reads it, picks a task, implements, updates it, exits. Next iteration reads the updated plan.

## Backpressure Mechanisms

Autonomous loops converge when wrong outputs get rejected. Three layers:

*   **Downstream gates**: Tests, type-checking, linting, build validation. If these fail, the agent knows to retry or adjust.
*   **Upstream steering**: Existing code patterns guide the agent’s approach. It discovers conventions through exploration rather than explicit instruction.
*   **LLM-as-judge**: For subjective criteria (tone, UX feel, aesthetics), use another LLM call with binary pass/fail. Eventually converges through iteration.

Start with hard gates

Tests and builds are deterministic. Start there. Add LLM-as-judge for subjective criteria only after the mechanical backpressure is working.

## Context Efficiency

The [dumb zone](https://paddo.dev/blog/12-factor-agents) hits around 40% context utilization. Past that, reasoning degrades.

Ralph’s one-task-per-iteration structure sidesteps this. Each iteration starts fresh. The agent loads only what it needs: the prompt, the plan, relevant code. Context stays in the sweet spot.

Additional tactics:

*   **Spawn subagents** for expensive exploration instead of consuming main context
*   **Keep AGENTS.md lean** - 60 lines, not 600
*   **Trust code patterns** over exhaustive prompt instructions

## Plan Disposability

Plans drift. Requirements change. The agent misunderstands something early and compounds the error.

The fix: regenerate. Switching back to planning mode and rerunning gap analysis is cheap. Fighting a stale plan wastes more iterations.

Treat `IMPLEMENTATION_PLAN.md` as coordination state, not a contract. When it’s wrong, throw it away.

## Advanced Patterns

The playbook proposes five enhancements beyond the core loop:

*   **Acceptance-driven backpressure**: Derive test requirements from acceptance criteria during planning. Connect specs → required tests → implementation. Prevents “cheating” - can’t claim done without passing the tests that prove it.
*   **LLM-as-judge for subjective criteria**: Binary pass/fail reviews for tone, aesthetics, UX quality. Create a fixture pattern (`llm-review.ts`) that Ralph discovers and learns to apply.
*   **Work-scoped branches**: Create a scoped `IMPLEMENTATION_PLAN.md` per branch upfront with a `plan-work` mode. Scope at plan creation (deterministic) rather than runtime filtering (probabilistic).
*   **JTBD → Story Map → SLC releases**: Reframe specs as user journey activities. Slice horizontally through the story map to identify Simple, Lovable, Complete releases rather than building everything at once.
*   **AskUserQuestionTool for requirements**: Use Claude’s interview capabilities during Phase 1 to systematically clarify edge cases and acceptance criteria before writing specs.

### Prompt Structure

The playbook’s prompts follow a phase structure:

*   **0a-0d**: Orientation (read files, understand context)
*   **1-4**: Main instructions (what to do this iteration)
*   **999+**: Guardrails (what not to do, safety rails)

Key language patterns that improve agent behavior: “study the codebase first,” “don’t assume not implemented,” “ultrathink before acting,” “capture the why in commits.”

### Topic Scope Test

How do you know if a spec file covers one topic or several? Try describing it in one sentence without “and.” If you need conjunctions, split it.

Example JTBD: “Help designers create mood boards”

*   Topics: image collection, color extraction, layout, sharing
*   Each topic → one spec file → multiple implementation tasks

## What This Doesn’t Solve

*   **Bad specs**: Garbage in, garbage out. The methodology assumes you’ve done Phase 1 properly.
*   **Architectural decisions**: Novel abstractions still need human judgment. Ralph handles execution, not design.
*   **Cost**: Each iteration burns tokens. 50 iterations on a large codebase can hit $50-100+. Set limits.

## Try It Yourself

This post summarizes the methodology. For the full details, read [Farr’s complete playbook](https://claytonfarr.github.io/ralph-playbook/) - it covers advanced patterns, edge cases, and working examples that go beyond what’s here.

Source repos:

*   [ralph-playbook](https://github.com/ClaytonFarr/ralph-playbook) - Farr’s documentation
*   [how-to-ralph-wiggum](https://github.com/ghuntley/how-to-ralph-wiggum) - Huntley’s fork

Start with a small project and clear requirements. Write specs. Let it plan. Let it build. Watch what breaks and add backpressure accordingly.

The [official plugin](https://paddo.dev/blog/ralph-wiggum-autonomous-loops) handles the loop mechanics with CLI ergonomics. The bash playbook gives you full control.

Share This Article

×
### Share this article

 My previous post covered Ralph Wiggum as a Claude Code plugin. This covers the methodology behind it. Geoffrey Huntley originated the technique. Clayton Farr documented the playbook. The core insight: autonomous loops need structure to converge. Three phases: Requirements (specs), Planning (gap analysis), Building (one task per iteration with fresh context). Five files: loop.sh orchestrates. PROMPT_plan.md and PROMPT_build.md give mode-specific instructions. AGENTS.md holds build commands. specs/ defines requirements. IMPLEMENTATION_PLAN.md tracks state. The secret sauce is backpressure. Tests gate incomplete work. Code patterns guide agent behavior. LLM-as-judge handles subjective criteria. Plans are disposable - regenerating is cheap. 

 Full analysis: [https://paddo.dev/blog/ralph-wiggum-playbook/](https://paddo.dev/blog/ralph-wiggum-playbook/)

Copy Full Summary✓ Copied!Copy Title + Link✓ Copied!

## Related Posts

[![Image 2: Claude Skills: The Controllability Problem](https://paddo.dev/_astro/claude-skills-controllability.DtSnrQGL_1JhgNX.webp)](https://paddo.dev/blog/claude-skills-controllability-problem/)

04-NOV-25[8 MIN]

### [Claude Skills: The Controllability Problem](https://paddo.dev/blog/claude-skills-controllability-problem/)

Skills are auto-invoked by Claude's judgment. For engineering workflows that need predictability, slash commands give you explicit control.

[claude-code](https://paddo.dev/tags/claude-code/)[dev-tools](https://paddo.dev/tags/dev-tools/)[ai-coding](https://paddo.dev/tags/ai-coding/)

[![Image 3: Boring Agents Ship: The Triage Lane Nobody Is Writing About](https://paddo.dev/_astro/boring-agents-ship.3cGIL0rp_Z2q0z6P.webp)](https://paddo.dev/blog/boring-agents-ship/)

01-MAY-26[6 MIN]

### [Boring Agents Ship: The Triage Lane Nobody Is Writing About](https://paddo.dev/blog/boring-agents-ship/)

Most agent discourse is about coding agents. The agents quietly running in production right now are simpler, dumber, and more useful: stale-ticket sweepers, board monitors, three-line incident explainers, leadership briefs from a fixed template. Different species. Different shape. Already shipping.

[claude-code](https://paddo.dev/tags/claude-code/)[automation](https://paddo.dev/tags/automation/)[workflow](https://paddo.dev/tags/workflow/)

[![Image 4: Claude Code Auto-Fix: The PR That Fixes Itself](https://paddo.dev/_astro/claude-code-auto-fix-pr-lifecycle.BsH-_SP6_Z2qyTHp.webp)](https://paddo.dev/blog/claude-code-auto-fix-pr-lifecycle/)

27-MAR-26[7 MIN]

### [Claude Code Auto-Fix: The PR That Fixes Itself](https://paddo.dev/blog/claude-code-auto-fix-pr-lifecycle/)

Claude Code can now watch your PRs in the cloud, fix CI failures, and address reviewer comments while you're away. It's the logical next step after auto mode - and it raises the same trust questions, harder.

[claude-code](https://paddo.dev/tags/claude-code/)[ai-coding](https://paddo.dev/tags/ai-coding/)[automation](https://paddo.dev/tags/automation/)

 © 2026 paddo.dev. All rights reserved. •[Privacy Policy](https://paddo.dev/privacy)•[Games 🎮](https://paddo.dev/games)

[GitHub](https://github.com/paddo)[RSS Feed](https://paddo.dev/rss.xml "RSS Feed")

>_ CTRL+K

▣ NAVIGATION TERMINAL v2.0 

×

0% READ

>_

AVAILABLE SECTIONS:

────────────────────────────────────────

*   →[01]The Core Philosophy
*   →[02]Three-Phase Workflow
*   [03]Phase 1: Requirements
*   [04]Phase 2: Planning
*   [05]Phase 3: Building
*   →[06]File Structure
*   →[07]Backpressure Mechanisms
*   →[08]Context Efficiency
*   →[09]Plan Disposability
*   →[10]Advanced Patterns
*   [11]Prompt Structure
*   [12]Topic Scope Test
*   →[13]What This Doesn’t Solve
*   →[14]Try It Yourself

────────────────────────────────────────

RELATED POSTS:

────────────────────────────────────────

*   [→[R1]Claude Skills: The Controllability Problem](https://paddo.dev/blog/claude-skills-controllability-problem/)
*   [→[R2]Agent Teams: The Switch Got Flipped](https://paddo.dev/blog/agent-teams-the-switch-got-flipped/)
*   [→[R3]Beads: Memory for Your Coding Agents](https://paddo.dev/blog/beads-memory-for-coding-agents/)

────────────────────────────────────────

 TYPE TO SEARCH | ↑↓ NAVIGATE | ENTER SELECT | ESC EXIT
