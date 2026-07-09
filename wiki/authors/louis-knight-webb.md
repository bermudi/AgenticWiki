---
title: Louis Knight-Webb
created: 2026-05-02
updated: 2026-05-02
sources:
  - "raw/yt-software-engineering-is-becoming-plan-and-review-louis-knight-webb-vibe-kanban.md"
unaudited_marginal: 0
tags: [author, ai-engineering, agent-workflow]
---

# Louis Knight-Webb

> Founder of Vibe Canvas and creator of Vibe Kanban. Demonstrated that software engineering is becoming a cycle of planning and reviewing AI-generated code, with a quantified tradeoff: 5 minutes of planning saves 30 minutes of review.

## Expertise

Knight-Webb earned a spot on the SweeBench verified leaderboard ahead of OpenAI. He founded the London chapter of AI Tinkers, a community for AI engineering events. His thinking on how agents change the day-to-day work of software engineering — particularly the shift from writing code to planning and reviewing — provides concrete operational guidance for the [[the-agent-workflow|agent workflow]] and [[the-human-lever|human lever]] threads.

## Key Contributions

### The Plan-Vs-Review Tradeoff

Knight-Webb frames the agent era not as a binary (code vs. no code) but as a **displacement** of writing time into planning and reviewing time. The two modes are:

- **Plan-heavy**: Invest time upfront writing detailed specs, interrogate the model until it has no more questions → fewer review rounds, better first-pass outputs
- **Review-heavy**: Minimal planning, let the agent run, spend iterative rounds correcting → more back-and-forth, higher total human time

The quantified heuristic: **5 minutes of planning saves 30 minutes of reviewing**.

### Feature Type Matrix

Knight-Webb provides a practical decision matrix for which approach works where:

| | Features | Refactoring / Migrations |
|---|---|---|
| **Frontend** | Review-heavy — too stateful, too many edge cases (interactions, animations, styles) | Plan-heavy |
| **Backend** | Plan-heavy — test-driven development works naturally | Plan-heavy, should be fully hands-off |

### The Time Horizon Shift

As agents run for longer (Copilot: seconds → Claude Code 2025: 5-10 minute executions), the 5-minute mark is a behavioral threshold. Below it, humans can wait and watch. Above it, they must shift to managing multiple parallel agent streams — a fundamentally different mode of work that Knight-Webb calls **"focus maxing."**

## Thread

- [[the-agent-workflow]] — The plan-vs-review tradeoff is the central workflow decision
- [[the-human-lever]] — The quantified planning investment is an expression of human design authority

## Related

- [[the-human-lever]] — Planning as the human's strategic role
- [[the-agent-workflow]] — The operational context for the tradeoff
- [[tool-design-for-agents]] — Parallel agent management as a tool design frontier
- [[afk-agent]] — AFK execution at scale requires parallel management interfaces
- [[plan-vs-review]] — The framework he articulated: 5 min planning saves 30 min reviewing

## Sources

- `raw/yt-software-engineering-is-becoming-plan-and-review-louis-knight-webb-vibe-kanban.md` — Full talk transcript covering the plan-vs-review framework, feature type matrix, time horizon shift, and focus maxing.
