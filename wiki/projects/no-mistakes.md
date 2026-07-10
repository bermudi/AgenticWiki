---
title: No Mistakes
created: 2026-07-09
updated: 2026-07-09
sources:
  - raw/yt-l8-principal-s-agentic-engineering-workflow.md
unaudited_marginal: 0
tags: [project, agent-harness, workflow, verification, pr-pipeline]
---

# No Mistakes

> An open-source autonomous PR pipeline built by Kun Chen. It takes an agent's first-pass code and runs it through a bounded sequence of validation, review, testing, and documentation steps before raising a PR and babysitting it until merge.

## Pipeline

1. **Create a branch** if one does not exist.
2. **Commit** the change.
3. **Run in an isolated git worktree** so validation does not affect the current working directory.
4. **Infer the real intent** behind the change by analyzing the agent session.
5. **Rebase onto latest remote main** and resolve merge conflicts up front.
6. **Adversarial review** in a fresh context window — most problems are caught here.
7. **End-to-end testing** against the original intent, with recorded evidence (screenshots, video, logs, or similar artifacts).
8. **Documentation pass** — update relevant docs to reflect the change.
9. **Lint and format checks** before pushing.
10. **Push branch and raise PR**, then continue "babysitting" the PR through review comments and CI until merged.

## Human Role

The human does not review every diff. Instead, they review the **PR summary** and the **risk assessment** and look at the recorded evidence. For low-risk changes the human may not inspect the diff at all; for higher-risk changes the human applies more judgment. The human's time is spent at the beginning (planning) and the end (quality gating), while the middle of the pipeline is automated.

## Trigger Modes

No Mistakes is invoked as a skill. The user types `no mistakes` in the agent chat, and the pipeline runs the same steps.

## Thread

- [[agent-quality-engineering]] — No Mistakes is a concrete autonomous quality pipeline that turns first-pass code into a shippable PR.
- [[the-agent-workflow]] — The pipeline is the AFK execution phase of the workflow, with human gating at the end.
- [[the-human-lever]] — It shifts the human from line-by-line review to risk-based judgment and evidence inspection.

## Related

- [[verification-loop]] — The pipeline operationalizes propose-execute-verify-refine at scale.
- [[afk-agent]] — No Mistakes is the canonical AFK automation that follows implementation.
- [[good-night-have-fun]] — Often used together: overnight loops run into the no-mistakes pipeline.
- [[first-mate]] — First-mate dispatches tasks into the no-mistakes pipeline.
- [[treehouse]] — Uses isolated worktrees for validation and parallel work.

## Sources

- `raw/yt-l8-principal-s-agentic-engineering-workflow.md` — Pipeline description, human review/risk assessment heuristic, and skill invocation.
