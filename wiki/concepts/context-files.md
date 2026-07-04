---
title: Context Files (AGENTS.md, CLAUDE.md)
created: 2026-05-10
updated: 2026-07-03
sources:
  - raw/2602.11988v1.md
  - raw/2601.20404v1.md
  - raw/2603.00822v2.md
  - raw/yt-cian-clarke-vibe-coding-to-spec-driven-dev.md
  - raw/yt-al-harris-amazon-kiro-faang-spec-driven.md
unaudited_marginal: 0
tags: [concept, context-files, agents-md, agentic-engineering, configuration]
---

# Context Files (AGENTS.md, CLAUDE.md)

> A context file (AGENTS.md, CLAUDE.md, copilot-instructions.md) is a repository-level artifact that provides AI coding agents with project-specific instructions, conventions, and structural overview. Despite widespread adoption (>60,000 repositories), rigorous evidence shows their impact is ambiguous: they can improve efficiency on simple tasks but degrade performance and increase costs on complex ones.

## Overview

Context files are the "README for agents" — markdown files placed at the root of a repository that codify project-specific knowledge for AI coding agents. They were formalized around August 2025 and have been adopted across major agent platforms including OpenAI Codex (AGENTS.md), Anthropic Claude Code (CLAUDE.md), and GitHub Copilot (copilot-instructions.md).

The concept was anticipated by the [[ralph-loop]] pattern, where an AGENTS.md file holds build/test commands and operational instructions for autonomous agents — treating it as machine-readable infrastructure rather than human documentation.

### Typical Contents

- Repository overview and directory structure
- Build and test commands
- Coding conventions and style guides
- Design patterns and architecture notes
- Operational constraints (e.g., "do not modify certain directories")
- Tooling preferences (e.g., "use uv for Python package management")

## Empirical Findings

Two concurrent studies published in early 2026 provide the first rigorous, at-scale evaluation of context file effectiveness. Their results point in partially conflicting directions — a productive tension the wiki tracks rather than resolves.

### Gloaguen et al. (2026) — "Evaluating AGENTS.md"

This study introduces AGENTBENCH (138 instances across 12 repositories with developer-written context files) and evaluates four coding agents (Claude Code/Sonnet-4.5, Codex/GPT-5.2, GPT-5.1 Mini, Qwen Code/Qwen3-30B) across two benchmarks.

**Key findings:**

| Finding | Detail |
|---|---|
| LLM-generated context files (`/init`-style dumps) | Reduce task success rate by 0.5–2% across benchmarks |
| Developer-provided context files | Marginal improvement (~4%) on AGENTBENCH, not consistent across agents |
| Cost impact | Increases inference cost by >20% on average |
| Behavioral change | Context files encourage broader exploration — more testing, more file traversal, more grep |
| Instruction following | Agents faithfully follow context file instructions (e.g., using `uv` when mentioned, file reading patterns) |
| Redundancy with docs (**the key explanation**) | The `/init`-generated files duplicate existing documentation. When all other docs are removed, those same files *improve* performance by 2.7% and even outperform developer-written docs — so the degradation tracks with redundancy, not with generation as such |
| Reasoning overhead | Context files increase reasoning tokens by 14–22%, suggesting they make tasks harder, not easier |
| Overview ineffectiveness | The "repository overview" section, recommended by agent developers, does not help agents find relevant files faster |

**Recommendation:** "Omitting LLM-generated context files for the time being" and including only minimal requirements (e.g., tooling commands) in human-written files.

> [!warning] Scope — what was actually generated matters
> The "LLM-generated" files here were produced by each agent's recommended `/init` initialization command, and are overwhelmingly overview-heavy: the paper found repository overviews in **100%** of Sonnet-4.5-generated files and **95–99%** of GPT-5.2 / Qwen-generated ones — the very section shown not to help agents find relevant files. Crucially, the degradation tracks with **redundancy**, not with generation as an act: when the authors stripped all other documentation, those same `/init` files *improved* performance by **+2.7%** and even outperformed developer-written docs. The finding therefore indicts **auto-generated `/init` dumps that duplicate existing documentation** — not LLM-assisted generation per se. Curated, non-redundant generation (human-guided, or the [[evolving-context]] pattern of incrementally filing operational learnings) was not tested and is not implicated by these results.

### Lulla et al. (2026) — "On the Impact of AGENTS.md Files on the Efficiency of AI Coding Agents"

This study evaluates 10 repositories and 124 pull requests using Codex (GPT-5.2-codex), comparing agent runs with and without AGENTS.md on small-scope tasks (≤100 LoC, ≤5 files).

**Key findings:**

| Metric | Without AGENTS.md | With AGENTS.md | Change |
|---|---|---|---|
| Median wall-clock time | 98.57s | 70.34s | **−28.64%** |
| Mean wall-clock time | 162.94s | 129.91s | −20.27% |
| Median output tokens | 2,925 | 2,440 | **−16.58%** |
| Mean output tokens | 5,744.81 | 4,591.46 | −20.08% |

**Caveat:** No full correctness evaluation — only a manual sanity check on a random sample of 50 PRs. Higher efficiency does not guarantee better outcomes.

### The Contradiction

The two papers disagree on cost impact in a way that is informative rather than disqualifying:

| Dimension | Gloaguen | Lulla |
|---|---|---|
| Cost impact | **+20% increase** | **−20% decrease** |
| Task complexity | Full SWE-bench (large, multi-file changes) | Small PRs (≤100 LoC, ≤5 files) |
| Agents tested | Claude Code, Codex, Qwen Code | Codex only |
| Success metric | Test pass rate (correctness) | Raw efficiency (no correctness check) |
| Dataset | 138 AGENTBENCH + 300 SWE-bench Lite | 124 PRs across 10 repos |

> [!warning] Theory pressure
> These results may be reconcilable: context files help agents find the right path faster on simple, well-defined tasks (Lulla), but the overhead of processing additional instructions outweighs benefits on complex tasks requiring extensive reasoning (Gloaguen). However, this hypothesis has not been tested directly. The wiki treats both findings as unproven suggestions in tension.

### Points of Convergence

Despite the tension, several findings are consistent across both studies:

1. **Context files are not neutral** — they measurably change agent behavior (more testing, more exploration, instruction following)
2. **Quality varies dramatically** — LLM-generated files consistently underperform developer-written ones
3. **Redundancy is a problem** — when the codebase already has good documentation, context files add noise, not signal
4. **Minimalism is underrated** — Gloaguen et al. explicitly recommend "only minimal requirements"; the [[ralph-loop]] pattern independently converged on an AGENTS.md of ~60 lines focused on operational commands
5. **Efficiency ≠ quality** — reducing wall-clock time or tokens doesn't guarantee correct output
6. **Agents follow instructions** — agents faithfully execute context file directives, so what you put in them directly shapes agent behavior

## Implications for Practice

The evidence supports a minimalist, human-written approach to context files:

- **Avoid `/init` dumps on documented repos.** Each agent's `/init` command produced verbose, overview-heavy files that performed worse than none — but this tracks with **redundancy**, not with generation itself (stripping all docs flipped the result to +2.7%). What the evidence condemns is regurgitating existing documentation into a context file. Curated generation — human-guided, non-redundant, or incrementally built per [[evolving-context]] — is a different artifact and was not what the study tested.
- **Keep them short.** Include build commands, test commands, and critical constraints. Skip the repository overview — it is redundant with the code itself and does not help agents find relevant files faster.
- **Avoid prescriptive instructions.** Context files that mandate specific tooling or workflows increase reasoning overhead and may lead agents astray.
- **Remove them to debug.** If an agent is over-exploring or over-testing, try removing the context file and see if performance improves.

> [!note] Cross-Source Convergence: Minimalism
> Three independent paths have converged on the same conclusion about context file design: **keep them short, operational, and human-written.** The [[ralph-loop]] pattern (~60-line AGENTS.md with build/test commands only) arrived at this through practice. The Gloaguen et al. evaluation recommended "only minimal requirements" through empirical testing. The [[context-engineering]] framework advocates high signal density through theory. This triangulation — practice, evidence, and theory pointing in the same direction — is stronger than any single source and makes minimalism the most defensible design principle for context files as of 2026.

## ContextCov: From Passive to Executable

[[contextcov|ContextCov]] (Sharma, 2026) approaches the context-file problem from a different angle: instead of optimizing the content of the instruction file, it makes the instructions *executable*. Rather than asking "what should we put in AGENTS.md?", it asks "how do we make what's already there actually binding?"

This reframing has several implications for context file design:

- **The constraint taxonomy provides structure**: ContextCov classifies instructions as process (commands, tools), source (coding style, naming), or architectural (module boundaries, dependency direction). While the paper uses this taxonomy for internal routing, it suggests a practical question for authors: are all three constraint types covered in your instruction file?
- **Underspecification becomes visible**: When ContextCov generates a check that's too narrow or too broad, the developer sees exactly how their natural-language instruction was interpreted. This surfaces underspecification that passive context files hide.
- **The quality feedback loop rewards precision**: When a blocked action forces the developer to refine an instruction, the context file improves iteratively. The paper also describes how agents can autonomously propose fixes to the Agent Instructions when they hit enforcement blocks (Section 5.2), transforming agents from passive consumers into active maintainers of project specifications. Minimalism is still desirable — but precise minimalism beats vague minimalism.
- **Documentation becomes prescriptive**: The paper's "Documentation as Code" paradigm (Section 5.1) argues that context files must shift from descriptive (written for humans who use common sense) to prescriptive (serving as literal execution context). Stale or ambiguous AGENTS.md becomes a build-breaking defect, not a minor annoyance.

The paper doesn't contradict the minimalism consensus — ContextCov works best with clear, precise instructions. But it adds a new dimension: **enforceability**. The paper's fail-closed philosophy means ambiguous or imprecise instructions are interpreted strictly (blocking broadly), creating a practical incentive for authors to be more precise over time.

## Thread

- [[tool-design-for-agents]] — Context files are a tool-level interface for shaping agent behavior; their design quality directly impacts agent effectiveness
- [[the-agent-workflow]] — AGENTS.md serves as operational infrastructure in the agent workflow (build/test commands, constraints); the empirical evidence shows workflow outcomes are sensitive to context file design
- [[the-slop-problem]] — Context files can reduce slop by constraining agents, but poorly-designed ones can increase slop by encouraging unnecessary exploration and adding reasoning overhead
- [[agent-quality-engineering]] — The tension between these two studies motivates the need for evals (context file A/B testing) as part of agent quality infrastructure
- [[context-engineering]] — Context files are a concrete instantiation of context engineering at the repository level; the empirical evidence validates the discipline's core concern that information density matters more than information volume
- [[contextcov]] — Proposes making context files executable rather than passive; introduces Documentation as Code paradigm and the instruction quality feedback loop
- [[the-verifiability-thesis]] — The empirical findings on context files (verifiable enforcement > passive instructions) are a direct instantiation of the verifiability thesis applied to documentation design

## Related

- [[agent-experience]] — Context files are part of the AX surface area; their design directly affects how easily agents can navigate a codebase
- [[ralph-loop]] — The Ralph Loop operationalized AGENTS.md as build/test infrastructure (~60 lines, minimal by design) before the empirical evidence caught up
- [[agent-skills]] — Skills and context files are complementary: skills provide procedural knowledge (how to do things), context files provide repository context (what to know about this project)
- [[model-routing]] — Different models respond differently to context file instructions; instruction style (ALL CAPS) works on some models but de-tunes others
- [[evolving-context]] — Context files that are maintained and updated reflect the evolving context principle; stale context files become [[doc-rot]]
- [[thibaud-gloaguen]] — Lead author of the Gloaguen et al. evaluation paper
- [[christoph-treude]] — Senior author of the Lulla et al. efficiency study
- [[contextcov]] — Framework for transforming passive context file instructions into executable guardrails; constraint taxonomy (process/source/architectural); Documentation as Code paradigm
- [[system-prompt-effects]] — System prompt effects are the mechanism by which context files influence agent behavior; the non-monotonic relationship explains why more detailed context files don't always help
- [[knowledge-triplet]] — Context files push "what you know" into "what's in the codebase," making knowledge available to the model without explicit expression each time
- [[open-knowledge-format]] — OKF standardizes the broader knowledge-as-markdown pattern that context files are one instance of; the AGENTS.md / CLAUDE.md family is named in the OKF announcement as a related bespoke instance

## Sources

- `raw/2602.11988v1.md` — Gloaguen et al. (2026). Introduces AGENTBENCH and evaluates context file impact on task completion, finding LLM-generated files reduce performance and increase costs.
- `raw/2601.20404v1.md` — Lulla et al. (2026). Evaluates AGENTS.md impact on agent efficiency, finding reduced wall-clock time and token consumption on small-scope PRs.
- `raw/2603.00822v2.md` — ContextCov (Sharma, 2026). Proposes executable guardrails for passive instruction files; introduces constraint taxonomy, Documentation as Code paradigm, and instruction quality feedback loop.
- `raw/yt-cian-clarke-vibe-coding-to-spec-driven-dev.md` — Names the synonymy problem across SDD tools (constitution / CLAUDE.md / .cursorrules / steering).
- `raw/yt-al-harris-amazon-kiro-faang-spec-driven.md` — Steering docs as accumulated learnings; three demonstrated use cases (commit style, code style, operational learnings); available in system prompt at every turn.
