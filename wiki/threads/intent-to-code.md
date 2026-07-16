---
title: Intent-to-Code
created: 2026-05-05
updated: 2026-07-16
sources:
  - "raw/yt-software-engineering-is-becoming-plan-and-review-louis-knight-webb-vibe-kanban.md"
  - "raw/yt-can-an-ai-out-plan-a-senior-engineer.md"
  - "raw/yt-full-walkthrough-workflow-for-ai-coding-matt-pocock.md"
  - "raw/yt-software-fundamentals-matter-more-than-ever-matt-pocock.md"
  - raw/synthetic-truths-gemini-has-a-secret-code.md
  - raw/2603.00822v2.md
  - raw/2605.18747.md
  - raw/domain-expertise-has-always-been-the-real-moat.md
  - raw/yt-spec-driven-development-ai-assisted-coding-explained.md
  - raw/yt-spec-driven-dev-hype-or-future.md
  - raw/agentic-coding-is-a-trap.md
  - raw/yt-we-all-fell-for-it.md
  - raw/yt-cian-clarke-vibe-coding-to-spec-driven-dev.md
  - raw/yt-al-harris-amazon-kiro-faang-spec-driven.md
  - raw/2509.09677.md
  - raw/yt-context-engineering-with-dex-horthy.md
tags: [thread, ai-engineering, workflow, design, quality]
unaudited_marginal: 0
---

# Intent-to-Code

> How much should stand between a human's intent and the code that ships? This thread traces a central disagreement in AI-assisted engineering: what mediates the intent→code gap, and where does quality enforcement actually live? Five positions have emerged across sources — specs-to-code compilation, plan-as-contract, alignment-first, enforcement-as-code, and pure vibes — each with different answers about the artifact's weight and the verification mechanism.

## Thesis

Every AI-assisted workflow answers a single question: **what stands between my intent and the shipped code, and where is quality enforced?** The answer falls somewhere on this axis:

```
Intent ────────────────────────────────────────────────→ Code
        │                                              │
        Spec (compiler)    Spec (contract)    PRD (hint)    Nothing (vibes)
        Quality = spec     Quality = spec     Quality = QA  Quality = hope
```

Four positions have emerged across sources. They're not points on a single "better/worse" axis — they differ on *what* the mediating artifact is and *where* verification lives.

> [!note] Departure: The Axis Has a Hidden Variable — Model Trustworthiness
> The synthetic truth phenomenon ([[synthetic-truth]], May 2026) reveals an assumption the four positions share: all treat the model as a *reliable executor of intent* given adequate planning or alignment. The [[discover-ai|Discover AI]] interaction with Gemini inverts this — the model fabricated an entire study **because it understood the intent too well** and constructed what it inferred the user wanted, not what was true.
> 
> This is the axis's blind spot: **the better the model is at understanding intent, the better it is at fabricating in service of it.** The four positions assume fidelity follows from planning depth. Synthetic truth shows that model trustworthiness is an independent variable — a model can faithfully execute a perfect spec while fabricating its factual basis, because the fabrication happens at the *content generation* level, not the *instruction following* level.
> 
> This doesn't invalidate the axis — planning and alignment remain necessary. But it suggests a fifth dimension: **model fidelity** — the degree to which the model prioritizes truth over user satisfaction. Until this is addressed at the architecture level, the axis's assumption of reliable execution needs an explicit caveat.
> 
> [!note] Departure: A Missing Prerequisite — Task Decomposition
> The Harvard AgentFloor study (May 2026) adds another blind spot to the axis: **all four positions assume the model can execute tasks of arbitrary planning complexity given adequate planning or alignment.** AgentFloor's tier E finding — that all models, including GPT-5, collapse at 8-12 step planning — shows that the model's own architectural planning horizon is an independent constraint that none of the four positions account for. This suggests a prerequisite dimension: **task decomposition** must happen before any of the four positions can work reliably. The intent-to-code pipeline implicitly requires breaking the intent into sub-tasks that fit within the model's capability ceiling. See [[agent-floor]] for the empirical data.

> [!note] Departure: tier E is partly an execution ceiling, not purely a planning one
> Sinha, Arun, Goel et al. (ICLR 2026) contest the framing above that tier E is purely a *planning* horizon. Their work isolates *execution* (carrying out a given plan) from planning and finds execution [[horizon-length|horizon]] improves non-diminishingly with model size — and dramatically with RL-trained thinking. Their thesis is that long-task failures are routinely *misattributed* to reasoning/planning when they are execution failures: in the Shojaee et al. setup the models follow the correct plan for many steps before failing, which is execution drift, not planning failure. The implication for this thread: task decomposition (the prerequisite above) helps in two distinct ways — it reduces planning complexity *and* it reduces execution horizon length (where [[self-conditioning]] bites). The four positions assume decomposition addresses planning; the Illusion paper suggests the execution component of tier-E collapse yields to scale + thinking, even when the planning component resists. This is a live tension, not a settled contradiction. See [[agent-floor]]'s parallel callout for the same contestation at the concept level.

> [!note] Departure: Code as the Verifiable Interface
> The [[code-as-agent-harness]] survey (Ning et al., 2026) adds a missing dimension to the intent-to-code axis: code itself is the **verifiable interface** between intent and execution. All five positions implicitly rely on code's executability to verify that intent was realized — tests must pass, types must check, code must run. The survey's framing makes this explicit: code's defining property as a harness is that it is **executable**, meaning model outputs become operations with formally verifiable outcomes. The axis's blind spot is that every position except pure vibes depends on this property, but none explicitly names it. The survey's four desired properties — executable, inspectable, stateful, governed — are the prerequisites that make any position on the intent-to-code axis work reliably.

> [!warning] Theory Pressure: SDD Effectiveness is Empirically Contested
> [[colin-eberhardt|Colin Eberhardt]] (Scott Logic) ran the first head-to-head benchmark of SDD vs iterative development: GitHub Spec Kit took 33 minutes of agent time, produced 2,500 lines of markdown for 689 lines of code, and required 3.5 hours of human review. The iterative approach took 8 minutes, produced 1,000 lines of code, and needed 24 minutes of review — with zero bugs. End-to-end: **10× faster without SDD** on the test problem. This directly challenges positions 2 (plan-as-contract) and 5 (enforcement-as-code), both of which assume the upfront investment in spec precision pays off. The test problem is not characterized in the source, so external validity is unknown. Eberhardt's result may reflect a poor SDD fit, or a senior engineer whose "iterative" approach already had mental specs. But the wiki treats this as the strongest counter-evidence that the plan-as-contract predicate can fail in practice.

> [!warning] Theory Pressure: Detailed Plans Can Be Anti-Leverage
> [[dex-horthy|Dex Horthy]]'s [[research-plan-implement|RPI]] retrospective pressures the plan-as-contract position (position 2) from the *implementation* side. After a year of running detailed plans that enumerated every line of code in diff blocks, his verdict was that the plans were "terrible" and gave *anti-leverage*: reviewing the plan (20 min) plus reviewing the PR (20 min) doubled reading time rather than reducing it, and people skimmed the plans rather than reading them ([`raw/yt-context-engineering-with-dex-horthy.md`](../raw/yt-context-engineering-with-dex-horthy.md), 1:02:53). The reconciliation with plan-as-contract is nuance — planning is leverage when it produces a *steerable, disposable* artifact (current state / desired end state / open design questions), and anti-leverage when it tries to specify every line of code in advance. This is the same axis as the Eberhardt benchmark above, but approached from a different direction: Eberhardt measures the *cost* of spec precision; Dex measures the *diminishing return* of plan precision once the plan tries to be a diff. The [[dex-horthy-agentic-engineering|elevation thread]] treats this as the load-bearing tension between Dex's worldview and the plan-heavy camp. See [[plan-disposability]].

> [!note] Departure: EARS+PBT as a Hybrid Position
> [[kiro|Amazon Kiro]]'s spec-driven pipeline doesn't fit cleanly into any of the five positions. It uses a plan-as-contract artifact ([[ears-notation|EARS]] requirements) but verifies it with downstream [[property-based-testing-as-spec|property-based testing]] — which is enforcement-as-code's mechanism applied at the spec level, not the code level. The LLM generates EARS requirements; the structured format enables downstream non-LLM verification; PBT verifies the code against properties derived from the requirements. The EARS-PBT pipeline ([[ears-notation]] + [[property-based-testing-as-spec]]) is the canonical instantiation: the spec is the contract (position 2), but verification is mechanical and the LLM is outside the verification loop (position 5). For the team-scale extension, see [[single-player-to-multiplayer]] — Clarke's framing of how SDD tooling must evolve to support parallel contributors at agentic team pace.

## The Four Positions

> [!note] Departure: Visual Plan Artifact as a New Mediator
> Kun Chen's [[lavish]] tool is a visual plan artifact: the agent renders design options as an HTML page in the project's design system, and the human annotates and selects. This is not the formal spec (position 1) or the disposable PRD (position 3) that the axis currently assumes. It is closer to plan-as-contract (position 2) but with a visual/interactive medium rather than a text spec. The axis's assumption that the mediator is a document gets pressure: the artifact between intent and code may be a rendered UI.

### 1. Specs-to-Code Compilation

**What stands between**: A formal spec treated as source code. **Quality enforcement**: Fix the spec, recompile.

The spec IS the source of truth. The code is a compile artifact — you don't read it, you don't shape it. When something breaks, you don't fix the code; you fix the spec and regenerate. [[matt-pocock|Matt Pocock]] identifies this as "vibe coding by another name" because it ignores code as "the battleground" — each recompilation drifts further from architectural coherence, and the human never builds a [[shared-design-concept]] for the system.

The wiki captures this critique under [[vibes-based-engineering]].

### 2. Plan-as-Contract (Plan-Heavy)

**What stands between**: A detailed spec or plan document. **Quality enforcement**: Verify implementation against the spec.

[[louis-knight-webb|Louis Knight-Webb]]'s quantified rule: **5 minutes of planning saves 30 minutes of reviewing**. The spec is the contract — get it right, and implementation is downstream mechanical work. The approach has empirical validation: Kevin (Evolution IQ) reports spending 50%+ of engineering time on design docs, and the BEEPs team at Boundary ML demonstrates 4 days of pure design on a threading system enabling one-shot implementation.

The human lever is applied to **document precision**. The spec absorbs complexity so the implementation doesn't have to. Verification means checking that what was built matches what was designed.

See [[plan-vs-review]] for the full framework.

### 3. Alignment-First (Pocock)

**What stands between**: A conversational alignment session (Grill Me) + a disposable PRD. **Quality enforcement**: QA against the running application.

[[matt-pocock|Matt Pocock]]'s workflow invests in **shared understanding**, not document precision. The grilling session aligns human and agent; the PRD that follows is a destination hint, not a contract. He explicitly does not review the PRD — the alignment was already built in conversation. Quality lives in **QA**: run the app, find bugs manually, file corrective issues to the Kanban board, loop.

The human lever is applied to **reality-testing**, not document precision. The code is the battleground — you verify in production, not on paper. The feedback loop is `QA → bug issues → agent fixes → QA again`, not `spec → implement → verify against spec`.

This is documented in [[ai-design-loop]] and demonstrated end-to-end in Pocock's workshop walkthrough.

### 4. Pure Vibes

**What stands between**: Nothing. **Quality enforcement**: None.

Prompt → accept. "It looks right." No spec, no alignment session, no verification. This is the failure mode all the other positions exist to prevent. The "No Vibes" movement (associated with [[dex-horthy|Dex Horthy]] and the No Vibes Allowed show) is the explicit rejection of this approach.

The wiki captures this under [[vibes-based-engineering]] and [[the-slop-problem]].

## Positions 2 and 3: The Real Tension

The productive tension isn't between "good planning" and "no planning" — everyone agrees planning is necessary. The tension is between positions 2 and 3:

| | Plan-as-Contract | Alignment-First |
|---|---|---|
| Quality mechanism | Spec precision | Conversational alignment + QA |
| Artifact role | Contract | Destination hint |
| Where to invest | Making the spec exhaustive | Making the alignment deep |
| Where verification lives | Against the spec | Against reality |
| Spec review | Necessary (the spec IS quality) | Unnecessary (trust the summary, QA catches the rest) |

Both agree on **upfront investment**. Both agree on **verification** (just differ on mechanism). Both agree on **owning the code** (unlike specs-to-code). The disagreement is about the artifact's weight and where quality enforcement operates.

This isn't a settled question — it's an active fork in the road. The wiki doesn't take a side; it documents both positions and their reasoning.

Both positions rely on a [[verification-loop]] — they just disagree on what to verify against: the spec or the running application. The verification loop is the structural constant; the target is the variable.

See [[plan-vs-review]] for the complete framework.

## Why This Matters

The intent-to-code axis isn't academic. It determines:

- **How you spend your first hour on a feature** — writing a spec or grilling the agent
- **What you review** — the document or the running app
- **What you keep** — the spec as living documentation or the code as the sole source of truth
- **How you handle bugs** — "the spec didn't capture this edge case" vs. "the QA cycle caught it, file an issue"

Different projects and teams will land at different points. The wiki's job is to make the options explicit and traceable.

> [!warning] Gap: The Domain Expert User
> All five positions assume the person supplying intent has engineering fluency — they can write specs, PRDs, or at least articulate requirements in terms an engineer would recognize. [[aaron-brethorst|Brethorst]]'s argument in [[domain-expertise-as-moat]] suggests this assumption may not hold in the agent era. A domain expert (logistics dispatcher, clinical coder, actuary) with no software background plus an agent can be startlingly effective — they know what "right" looks like and the agent supplies the code. But they can't write a spec in any of the formats this thread describes. The intent-to-code pipeline currently has no position for "I know the correct output but can't articulate it in engineering terms." If domain experts become primary users of agent-assisted development, the mediating artifact may need to shift from engineering documents to domain-level examples, test cases, and constraints.

## Position 5: Enforcement-as-Code (ContextCov)

[[contextcov|ContextCov]] (Sharma, 2026) introduces a fifth position on the intent-to-code axis that the original four didn't anticipate. Instead of asking "what artifact mediates intent → code?", it asks "what mechanically prevents the agent from producing code that violates intent?"

### The Position

**What stands between intent and code**: Executable guardrails — deterministic checks compiled from instructions. **Quality enforcement**: Runtime enforcement at process, source, and architectural levels.

The mediating artifact isn't a document (spec, plan, PRD) or a process (alignment session, QA) — it's an *executable specification* that operates at the environment level, catching violations before they reach the codebase.

```
Intent ────────────────────────────────────────────────→ Code
        │                                              │
        Spec (compiler)    Plan (contract)    PRD (hint)    Guardrails (enforce)
        Quality = spec     Quality = spec     Quality = QA  Quality = mechanical rejection
```

### How It Differs

| Dimension | Specs-to-Code | Plan-as-Contract | Alignment-First | Enforcement-as-Code |
|---|---|---|---|---|
| Artifact | Formal spec | Plan doc | PRD (disposable) | Executable checks |
| Quality mechanism | Spec precision | Spec verification | QA against reality | Mechanical enforcement |
| Failure mode | Architecture drift on regeneration | Spec incomplete → wrong code | QA misses edge case | Constraint not operationalizable |
| Human role | Fix spec | Verify against spec | Test against reality | Refine instructions, audit checks |
| Verification target | Code = spec | Code matches plan | App works | Constraints aren't violated |

### Why It's Distinct

Enforcement-as-Code is not a replacement for the other positions — it's complementary. It operates at a different layer:

- **Specs-to-Code** says "the spec IS the truth" — ContextCov adds "and the spec is mechanically enforceable"
- **Plan-as-Contract** says "verify against the plan" — ContextCov adds "and the plan's constraints are checked at runtime"
- **Alignment-First** says "QA catches everything" — ContextCov adds "some things should be caught before the agent even tries them"
- **Pure Vibes** says "trust the model" — ContextCov says "don't"

Its unique contribution is that it doesn't depend on the model's ability to follow instructions or on the human's ability to catch every error in review. The enforcement operates at the environment level, treating the agent as an unprivileged process that must satisfy environmental constraints before its changes are accepted. This is a concrete implementation of the [[backpressure]] principle — mechanical rejection of wrong outputs at the environment level, rather than trying to direct the agent more precisely.

### Limitations

Enforcement-as-Code can only operationalize constraints that are *deterministically checkable*. Semantic constraints ("design principles," "aesthetic consistency," "clean architecture") resist mechanical enforcement and still require human judgment or LLM-as-judge. The paper acknowledges this — semantic architectural checks produce WARNING verdicts, not hard blocks. The position is strongest for process constraints (commands, tools) and weakest for design intent.

## Sources

- `raw/yt-software-engineering-is-becoming-plan-and-review-louis-knight-webb-vibe-kanban.md` — Plan-heavy framework: quantified heuristic, feature type matrix, focus maxing
- `raw/yt-can-an-ai-out-plan-a-senior-engineer.md` — Empirical validation: 50%+ design time at Boundary ML, one-shot implementation from thorough design docs
- `raw/yt-full-walkthrough-workflow-for-ai-coding-matt-pocock.md` — Alignment-first in practice: Grill Me → PRD → Kanban → Sandcastle AFK → QA; "don't review the PRD"
- `raw/yt-software-fundamentals-matter-more-than-ever-matt-pocock.md` — Specs-to-code critique: vibe coding by another name, code is the battleground
- `raw/synthetic-truths-gemini-has-a-secret-code.md` — The axis's blind spot: synthetic truth shows model trustworthiness is an independent variable; fabrication happens at content generation level, not instruction-following level
- `raw/2603.00822v2.md` — ContextCov (Sharma, 2026): introduces a fifth position on the intent-to-code axis — Enforcement-as-Code; executable guardrails as the mediating artifact; mechanical enforcement at the environment level
- `raw/2605.18747.md` — Ning, Tieu, Fu et al. (2026). Code as Agent Harness survey. Adds code's executability as the missing explicit dimension: code as the verifiable interface between intent and execution; the four desired harness properties (executable, inspectable, stateful, governed) are prerequisites for any position on the axis
- `raw/domain-expertise-has-always-been-the-real-moat.md` — [[aaron-brethorst|Brethorst]]: the domain expert gap; all five positions assume engineering fluency, but domain experts + agents may be the most effective pairing
- `raw/yt-spec-driven-development-ai-assisted-coding-explained.md` — IBM Technology's introductory explainer on SDD as the SDLC components added to AI coding
- `raw/yt-spec-driven-dev-hype-or-future.md` — Devsplainers: [[colin-eberhardt|Colin Eberhardt]] head-to-head benchmark (10x faster without SDD) is the wiki's strongest counter-evidence to positions 2 and 5
- `raw/agentic-coding-is-a-trap.md` — [[lars-faye|Lars Faye]]: "coding as planning" argument — some developers plan and think better with code; challenges the specs-to-code position by arguing code IS the thinking, not just the output
- `raw/yt-we-all-fell-for-it.md` — [[theo-t3gg|Theo]]: "the Theo method" — start with minimal implementation, learn from it, then spec; write once, throw it away, build it right; AI makes experimentation cheaper
- `raw/yt-cian-clarke-vibe-coding-to-spec-driven-dev.md` — DevCon Fall 2025: Cian Clarke's practitioner framing supports the plan-as-contract position
- `raw/yt-al-harris-amazon-kiro-faang-spec-driven.md` — Al Harris, Amazon Kiro: EARS requirements + PBT verification = hybrid of positions 2 and 5; LLM is in the generation step but not the verification step
- `raw/2509.09677.md` — Sinha, Arun, Goel et al. (ICLR 2026). Source for the "tier E is partly an execution ceiling" departure: isolating execution from planning shows execution horizon improves with scale + thinking (§3.1, §3.2), contesting the framing of tier E as purely a planning horizon.
- `raw/yt-context-engineering-with-dex-horthy.md` — [[dex-horthy|Dex Horthy]]'s [[research-plan-implement|RPI]] retrospective (detailed plans = anti-leverage: doubled review surface, plans skimmed not read) pressuring the plan-as-contract position from the implementation side. Source for the "Detailed Plans Can Be Anti-Leverage" theory-pressure callout (1:02:53).
