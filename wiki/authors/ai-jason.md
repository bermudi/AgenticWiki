---
title: AI Jason
created: 2026-07-02
updated: 2026-07-02
sources:
  - raw/yt-wtf-is-loop-engineer-how-to-setup-for-real.md
unaudited_marginal: 0
tags: [author, ai-engineering, youtube, agent-loops, production, agent-harness]
---

# AI Jason

> YouTube creator and practitioner running agent loops in production at his own company (SEO/content product). The source of the [[compounding-loops]] pattern and the "loop engineer as outer harness" framing. Distinguished from explainer-commentators by shipping real loops — a support loop triaging Intercom tickets every 30 minutes, a daily SEO loop generating traffic-driving pages — and distilling the setup into reusable skills and a repo template. His contribution is operational: *how* to make loops that compound rather than burn money in isolation.

## Key Contributions

**Loop engineer as the outer harness.** Jason splits agent optimization into two parts. (1) The **agent loop itself** — Claude Code, Codex, a custom Pi — all the techniques for making sure that when you hand one task to an agent, it finishes well. (2) The **outer environment** that decides *what should be worked on*, triggers agents, tracks state and logs so the system continuously improves. That outer part is "loop engineer." This reframes [[orchestration-loop]] as the harness/environment layer rather than a prompt-engineering artifact.

**Compounding loops via shared state.** See [[compounding-loops]]. The genuinely novel pattern in his work: independent loops (support, SEO, ads) cooperating laterally through a shared signals/artifacts/logs file system rather than through supervision — each loop both reads and writes, so one loop's observations compound into another's priorities.

**The codebase-harness prerequisites.** Before loops work, the codebase must be **legible** (indexed AGENTS.md + custom lint rules that inject context and reject wrong output), **executable** (a `dev.local` script, worktree-friendly for parallel agents), and **verifiable** (Playwright CLI, e2e tests for critical flows, a PR skill). He packaged this as a `setup-codebase-harness` skill.

**The read-only verifier rule.** Never let an agent self-verify its own work — it "generally didn't work that well." The PR skill always spawns a read-only verifier agent with a detailed spec. This is [[verification-loop]] discipline applied at the loop level.

## Position

Practitioner first, educator second. He runs an "AI builder community" with step-by-step courses and ships a `loop-engineer-setup` repo template capturing his team's best practices. His framing is more operational and architectural than the explainer-commentators — he thinks in terms of file structures, contracts, and shared state, not prompts.

## Related

- [[compounding-loops]] — His signature pattern; the shared-signal coordination substrate
- [[orchestration-loop]] — His "loop engineer as outer harness" reframes this page's Stage 5
- [[agent-loop]] — The unit his loops are built from
- [[verification-loop]] — His read-only-verifier rule restates this at loop scale
- [[backpressure]] — Custom lint rules that mechanically reject wrong agent output
- [[matthew-berman]] — Explainer counterpart; Berman explains the loops Jason ships

## Sources

- `raw/yt-wtf-is-loop-engineer-how-to-setup-for-real.md` — Loop engineer as outer harness, compounding loops via shared signals, the codebase prerequisites (legible/executable/verifiable), the read-only verifier rule, and concrete production loops (support, SEO, growth).
