# Ingest Philosophy

> Cognitive reference for how knowledge enters the wiki. Load this when deciding what to ingest and how to synthesize it. For the procedural pipeline these principles operationalize, see [`ingest-flow.md`](ingest-flow.md).

## Pipeline Mapping

These principles apply at specific phases of the ingest pipeline:

| Principle | Applies at |
|---|---|
| 1. Discuss before you write | Triage (Step 0) |
| 2. Actively look for theory | Filing (Phase 1) + Analysis (Phase 2) |
| 3. Track theory pressure | Analysis (Phase 2) |
| 4. Propose new threads | Analysis (Phase 2) |
| 5. Present the state of the theory | Analysis (Phase 2) → gates Phase 3 |
| 6. Constraints over prescription | Filing (Phase 1) — when writing page content |

## 1. Discuss Before You Write

After reading the source, pause and tell the human what you found — key claims, where it fits, anything surprising. Let them guide emphasis before you touch any wiki pages. The human owns what matters; you own the filing.

## 2. Actively Look for Theory

Don't just extract concepts — identify recurring claims, workflows, and principles across sources. When multiple sources converge on the same idea, that's a thread. When a new source reinforces an existing thread, deepen it.

## 3. Track Theory Pressure, Not Just Contradictions

When a source stresses the existing theory — by contradicting a claim, reframing a failure mode, shifting a human/agent boundary, or suggesting a framework is transitional — don't silently reconcile it. Classify the pressure:

- **Local caveat**: add a `> [!warning] Theory pressure` or `> [!note] Departure` callout on the affected page.
- **Thread-level tension**: add or update the thread's `## Tensions` section.
- **Panorama-level reframe**: propose a new thread or major thread section if the source reorganizes multiple existing pages.

Surface the pressure in the ingest summary so the human can decide whether to preserve, deepen, or resolve it.

## 4. Propose New Threads When Themes Emerge

If a source introduces a coherent argument that doesn't fit any existing thread, propose a new one. Explain how it relates to existing threads (supports, contradicts, extends).

## 5. Present the State of the Theory

After ingestion, summarize not just what was added but how the overall picture changed — which threads gained support, which took a hit, where the tensions are. This is the theory summary that gates Phase 3.

The summary should be specific: name the thread pages, quote the conflicting claims, and propose a concrete action (local callout, thread tension, new thread, or merge). Vague summaries like "the theory got stronger" are useless — tell the human *which* theory and *how* it changed.

## 6. Constraints Over Prescription

When writing wiki pages, prefer constraints and boundaries over step-by-step prescriptions. The wiki is a map of hypotheses, not a manual. Tell the reader what to be careful about, what conventions to follow, what boundaries to respect — and let their judgment fill the gaps. Over-specification makes pages brittle and invites [[comprehension-debt]].

This applies to wiki page content, not to the skill's own procedures (which need to be prescriptive because the agent follows them mechanically).
