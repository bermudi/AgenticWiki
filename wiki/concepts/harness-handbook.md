---
title: Harness Handbook
created: 2026-07-23
updated: 2026-07-23
sources:
  - raw/2607.13285v1.md
unaudited_marginal: 0
tags: [concept, agent-harness, behavior-localization, code-understanding, progressive-disclosure, static-analysis, llm-assisted-structuring]
---

# Harness Handbook

> A behavior-centric representation of an agent harness that maps *what the harness does* to the exact source locations that implement it, so a human or coding agent can localize where a behavioral change must land before planning the edit. Built automatically from the codebase via static analysis plus LLM-assisted structuring, and kept in sync on every code change.

## Behavior Localization: The Bottleneck

Wang et al. (2026) argue that harness evolution has a **prerequisite** step that existing tooling leaves to the developer or coding agent to recover by hand: **behavior localization** — finding *every* code location that implements the behavior described in a modification request.

A modification request states *what* should change, not *where*. In production-scale harnesses a single behavior is distributed across files, execution stages, and shared state, so the relevant sites are often non-adjacent, rarely executed, or reachable only through indirect call paths. The authors frame this as the central bottleneck: "Whether the modification is performed by a human developer or a coding agent, the first step is therefore to locate all relevant implementation sites."

Existing aids — repository maps, code search, code summarization, repository memory, long-context editing — organize knowledge around **files, functions, and modules**, not behavior. They surface individual pieces of relevant code but do not show how those pieces cooperate to produce a behavior, nor whether *every* affected location has been found. The paper positions this gap as the thing it addresses: the missing explicit connection between a behavioral request and its distributed implementation.

> [!note] Synthesis:
> The framing reframes harness engineering's open problems. The *Code as Agent Harness* survey (Ning et al., 2026) treats self-evolving harnesses (§5.2.3) as the frontier, assuming evolution is the hard part. Harness Handbook argues the upstream problem is *localization*: you cannot reliably evolve a harness you cannot first map behavior-to-code for. This is the wiki author's synthesis from the paper's explicit positioning, not a claim the paper makes about the survey.

## Harness Handbook: The Representation

The Handbook reorganizes repository knowledge around runtime behavior while preserving links back to source. It has two coordinated views:

- **An L1–L3 document tree `D`** — progressive disclosure from system to detail:
  - **L1 (System Overview):** architecture, execution model, major stages, global data flow.
  - **L2 (Component Overview):** for a selected stage, its responsibilities, inputs/outputs, dependencies, local state.
  - **L3 (Unit Deep Dive):** source-grounded entries (a function or a file, depending on leaf mode) with locators, interface, behavior, relations, and source snippets.
- **A cross-stage state-register view `Z`** — records state relationships that cross stage boundaries (e.g., a flag written in one stage and consumed several stages later), which a top-down file read would miss.

Two rules keep the representation useful:

1. **Progressive disclosure** — readers move L1→L3 only when a task demands more detail, limiting irrelevant context.
2. **Behavior-implementation alignment** — every active L3 locator must still resolve to the *current* repository. If a locator cannot be revalidated, its entry is **frozen** and excluded from localization until refreshed. The repository stays the authority for implementation details; the Handbook is a navigable location index, not a cached copy of the code.

## Construction Pipeline

Construction builds a Handbook from a repository `R`. A fixed **leaf mode** `g ∈ {function, file}` sets the granularity of L3 entries and whether a trusted stage skeleton is supplied:

- **function-as-leaf** — used when a trustworthy seed skeleton reflecting the harness's execution stages exists and function-level entries fit the budget. Each L3 entry covers a whole function or one or more contiguous regions.
- **file-as-leaf** — used when no seed is available or function-level organization would exceed budget. Each L3 entry is a file; the stage skeleton is *inferred* from the files.

Three phases (function-as-leaf branch illustrated):

- **Phase I — Static Fact Extraction (deterministic, no LLM).** Language-specific adapters parse `R` and build a program graph `G`: functions/methods, named external boundaries, source locations, signatures, and call edges. Unresolved calls are logged, never guessed.
- **Phase II — Behavioral Organization.** Source units are mapped onto the execution-stage skeleton. In function-as-leaf mode, a propose–review loop assigns functions (whole or as contiguous regions) to stages; in file-as-leaf mode, file cards are summarized and grouped into an inferred skeleton. Uncovered or unassignable units stay explicitly recorded rather than forced.
- **Phase III — Hierarchical Synthesis & Packaging.** The skeleton and organization become the L1–L3 tree and the state-register view; each L3 entry is linked to a statically identified source location and **validated against the current repository** (unrevalidatable entries are frozen). The pipeline renders the reader-facing view and packages structured data for localization and future resynchronization.

## Handbook-Guided Modification (BGPD + Resync)

Given a request `q`, the workflow pairs the Handbook `H` with its repository `R` and runs four steps:

1. **Behavior-Guided Progressive Disclosure (BGPD).** Localize the requested behavior coarse-to-fine: start at L1/L2 to pick relevant stages, follow `Z` to add stages coupled through shared state, select the most relevant L3 entries, then expand the candidate set along call relations (function-call graph or file-call graph). Finally, *open `R`, resolve each candidate locator, and keep only sites still relevant to `q`* — yielding verified evidence `E_q`. The Handbook guides the search; the repository remains the basis for the edit plan.
2. **Plan.** A planner converts `E_q` into an edit plan `P` (per-site blocks with target file, anchor, supporting excerpt, intended change) plus action declarations `Γ` (modify/add/remove).
3. **Execute.** A separate executor applies `P` to `R`, producing `R'` and diff `Δ`.
4. **Resync.** Every non-empty `Δ` triggers `Resync_g`, which updates *only the affected parts* whenever possible (line-number-independent function fingerprints in function mode; file-set diffs + content hashes in file mode). Source that cannot be parsed or classified is frozen or recorded, never guessed. The pair `(R', H')` becomes the starting state for the next request.

The paper exposes the Handbook to the planner as a **SKILL.md manifest** — a skill the planner is told *when and how* to consult, pointing to reference files (overview, index, registers, per-stage leaves). The Handbook tells the agent *where* things live and how they connect; the agent still decides *what* the change should be and verifies every location against real code before planning.

## Empirical Results

Evaluated on two open-source harnesses that instantiate the two leaf modes: **Terminus-2** (Python terminal agent, 6 source files, function-as-leaf) and **Codex** (Rust coding-agent monorepo, 2,267 files, file-as-leaf). Each contributed 30 behavior-driven modification requests, balanced across three types and three difficulty levels:

- **Query (Q):** modify existing behavior without revealing target locations.
- **Cross-file (CF):** add an end-to-end capability spanning files/modules.
- **Search-Hostile (SH):** place relevant implementations in mirrored, fallback, or cold paths that keyword search struggles to recover.

Requests were also labeled Easy / Medium / Hard by localization difficulty. A read-only planner (NexAU + DeepSeek-V4-Pro) produced edit plans, scored by three independent judges (GPT-5.5, Opus 4.8, DeepSeek-V4-Pro). **Baseline** explored the repo directly; **Handbook-Assisted** used BGPD.

| Finding | Result |
|---|---|
| Overall win rate (Handbook-Assisted vs Baseline) | Codex 38.3% vs 28.3%; Terminus-2 45.6% vs 26.7% |
| Planner token cost (lower is better) | Codex 0.102M→0.089M (−12.7%); Terminus-2 0.058M→0.053M (−8.6%) |
| Weaker planner matches stronger models | All 24 file/symbol Recall, Precision, F1 comparisons higher vs Opus 4.8 & GPT-5.5 references; F1 gains 5.0–18.8 pts |
| Complete-miss rate (`Wrong`, zero overlap) | Falls by up to 25.9 points; never increases |
| Where gains concentrate | Scattered implementation sites, rarely executed paths, cross-module interactions; all 6 harness×type and 6 harness×difficulty slices positive |

The simultaneous rise in win rate and fall in token use shows the improvement is not explained by a larger planning budget. The authors conclude that making the behavior→implementation relationship explicit improves both modification planning and localization efficiency — and that evolving complex agentic systems depends not only on *generating* edits but on *determining where* they should be made.

## Relationship to Adjacent Work

The paper places itself against repository-understanding representations — structural repository representations, repository indexing, repository memory, natural-language artifacts (e.g., SWE-explore, Sherloc, repository memory, "Code isn't memory"). Its distinction: those are **implementation-centric** (organized around source, structure, or execution infrastructure), whereas the Handbook is **behavior-centric** — it explicitly bridges behavioral requirements to distributed implementation so localization can precede exploration.

The authors also position it as **complementary** to harness-evolution work (Agentic Harness Engineering, HarnessX, Self-Harness, HarnessForge): rather than modifying implementations, it solves the *prerequisite* of knowing where to modify. They sketch a next step of **harness self-evolution** — using the Handbook as shared behavioral memory so an agent closes the localization→planning→execution→resync loop autonomously.

## Thread

- [[harness-engineering]] — Behavior localization is the upstream prerequisite to the survey's self-evolving-harnesses open problem (§5.2.3)
- [[code-as-agent-harness]] — The Handbook is a behavior-centric instantiation of the harness's "inspectable" property, applied to evolution

## Related

- [[ruhan-wang]] — Lead author of the Harness Handbook paper (arXiv 2607.13285)
- [[harness-engineering]] — The discipline this paper reframes by adding a localization prerequisite before evolution
- [[code-as-agent-harness]] — The framework this paper operationalizes for harness *evolution* via a behavior-centric map
- [[harnessx]] — A co-evolution / foundry approach that assumes the harness can already be located and mutated; Harness Handbook supplies the localization layer beneath it
- [[self-harness]] — In-place self-improvement via bounded edits; depends on the same localization step Harness Handbook automates
- [[agent-skills]] — The Handbook is exposed to the planner as a SKILL.md manifest, reusing the agent-skills progressive-disclosure pattern
- [[skill-md]] — The SKILL.md manifest that exposes the Handbook reuses the three-tier progressive-disclosure format from the Agent Skills spec

## Sources

- `raw/2607.13285v1.md` — Wang, Shi, Li, Li, Yu, Yang, Panaganti, Mi, Zhou, Leoweiliang (Tencent HY LLM Frontier + Indiana University et al., 2026). *Harness Handbook: Making Evolving Agent Harnesses Readable, Navigable, and Editable.* arXiv 2607.13285v1 (14 Jul 2026). Defines behavior localization, the L1–L3 + state-register representation, the three-phase construction pipeline (two leaf modes), BGPD + automatic resync, and the Terminus-2 / Codex evaluation.
