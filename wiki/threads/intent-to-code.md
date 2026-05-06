---
title: Intent-to-Code
created: 2026-05-05
updated: 2026-05-05
sources:
  - "raw/Software Engineering Is Becoming Plan and Review — Louis Knight-Webb, Vibe Kanban - youtube.com.md"
  - "raw/Can an AI Out-Plan a Senior Engineer - youtube.com.md"
  - "raw/Full Walkthrough Workflow for AI Coding — Matt Pocock - youtube.com.md"
  - "raw/Software Fundamentals Matter More Than Ever — Matt Pocock - youtube.com.md"
tags: [thread, ai-engineering, workflow, design, quality]
---

# Intent-to-Code

> How much should stand between a human's intent and the code that ships? This thread traces a central disagreement in AI-assisted engineering: what mediates the intent→code gap, and where does quality enforcement actually live? The answers define four distinct philosophies — specs-to-code compilation, plan-as-contract, alignment-first, and pure vibes — each with different answers about the artifact's weight and the verification mechanism.

## Thesis

Every AI-assisted workflow answers a single question: **what stands between my intent and the shipped code, and where is quality enforced?** The answer falls somewhere on this axis:

```
Intent ────────────────────────────────────────────────→ Code
        │                                              │
        Spec (compiler)    Spec (contract)    PRD (hint)    Nothing (vibes)
        Quality = spec     Quality = spec     Quality = QA  Quality = hope
```

Four positions have emerged across sources. They're not points on a single "better/worse" axis — they differ on *what* the mediating artifact is and *where* verification lives.

## The Four Positions

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

## Why This Matters

The intent-to-code axis isn't academic. It determines:

- **How you spend your first hour on a feature** — writing a spec or grilling the agent
- **What you review** — the document or the running app
- **What you keep** — the spec as living documentation or the code as the sole source of truth
- **How you handle bugs** — "the spec didn't capture this edge case" vs. "the QA cycle caught it, file an issue"

Different projects and teams will land at different points. The wiki's job is to make the options explicit and traceable.

## Concepts in this thread

- [[plan-vs-review]] — The plan-heavy camp: Knight-Webb's quantified heuristic, the feature type matrix, the BEEPs validation
- [[ai-design-loop]] — The alignment-first camp: Grill Me, PRD as destination hint, don't review the PRD
- [[vibes-based-engineering]] — The pure-vibes camp and specs-to-code as vibe coding's cousin
- [[verification-loop]] — The quality mechanism that replaces trust in every position (except vibes)
- [[grey-box-engineering]] — Both plan-as-contract and alignment-first are expressions of grey box engineering, applied differently
- [[doc-rot]] — Pocock's specific argument against plan-as-contract: specs left in the repo become stale and mislead agents
- [[backpressure]] — QA-as-backpressure is the alignment-first quality mechanism; spec-precision-as-backpressure is the plan-heavy one

## Related

- [[the-agent-workflow]] — The operational thread where both positions are practiced
- [[the-human-lever]] — Both are applications of the human lever, differing on where to aim it
- [[the-slop-problem]] — Both positions exist to prevent slop; they disagree on the best mechanism
- [[plan-disposability]] — Aligns with alignment-first: plans as ephemeral, not contracts
- [[fighting-slop-with-slop]] — The BEEPs workflow is the strongest empirical evidence for plan-as-contract

## Sources

- `raw/Software Engineering Is Becoming Plan and Review — Louis Knight-Webb, Vibe Kanban - youtube.com.md` — Plan-heavy framework: quantified heuristic, feature type matrix, focus maxing
- `raw/Can an AI Out-Plan a Senior Engineer - youtube.com.md` — Empirical validation: 50%+ design time at Boundary ML, one-shot implementation from thorough design docs
- `raw/Full Walkthrough Workflow for AI Coding — Matt Pocock - youtube.com.md` — Alignment-first in practice: Grill Me → PRD → Kanban → Sandcastle AFK → QA; "don't review the PRD"
- `raw/Software Fundamentals Matter More Than Ever — Matt Pocock - youtube.com.md` — Specs-to-code critique: vibe coding by another name, code is the battleground
