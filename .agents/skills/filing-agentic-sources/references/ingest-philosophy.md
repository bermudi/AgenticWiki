# Ingest Philosophy

> Cognitive reference for how knowledge enters AgenticWiki. Load this when deciding what to ingest and how to synthesize it. For the procedural pipeline these principles operationalize, see `coordinating-filing/SKILL.md` and `filing-agentic-sources/SKILL.md`.

## Pipeline Mapping

These principles apply at specific phases of the filing pipeline:

| Principle | Applies at |
|---|---|
| 1. Discuss before you write | Triage (`filing-agentic-sources` step 2) |
| 2. Actively look for theory | Filing (`filing-agentic-sources` step 5) + Theory review (`reviewing-wiki-theory`) |
| 3. Track theory pressure | Theory review (`reviewing-wiki-theory`) |
| 4. Propose new threads | Theory review (`reviewing-wiki-theory`) |
| 5. Present the state of the theory | Theory review (`reviewing-wiki-theory`) → gates verification |
| 6. Constraints over prescription | Filing (`filing-agentic-sources` step 5) — when writing page content |

## 1. Discuss Before You Write

After reading the source, pause and tell the coordinator what you found — key claims, where it fits, anything surprising. In `filing-agentic-sources` this takes the form of a triage classification (`full` / `marginal` / `skip`) and, for marginal sources, a concrete scope. Let the human guide emphasis before you touch wiki pages. The human owns what matters; you own the filing.

## 2. Actively Look for Theory

Don't just extract concepts — identify recurring claims, workflows, and principles across sources. When multiple sources converge on the same idea, that's a thread. When a new source reinforces an existing thread, deepen it.

## 3. Track Theory Pressure, Not Just Contradictions

When a source stresses the existing theory — by contradicting a claim, reframing a failure mode, shifting a human/agent boundary, or suggesting a framework is transitional — don't silently reconcile it. Classify the pressure:

- **Local caveat**: add a `> [!warning] Theory pressure` or `> [!note] Departure` callout on the affected page.
- **Thread-level tension**: add or update the thread's `## Tensions` section.
- **Panorama-level reframe**: propose a new thread or major thread section if the source reorganizes multiple existing pages.

Surface the pressure in your report so the human can decide whether to preserve, deepen, or resolve it.

## 4. Propose New Threads When Themes Emerge

If a source introduces a coherent argument that doesn't fit any existing thread, propose a new one. Explain how it relates to existing threads (supports, contradicts, extends).

## 5. Present the State of the Theory

After filing, summarize not just what was added but how the overall picture changed — which threads gained support, which took a hit, where the tensions are. This is the theory summary that `reviewing-wiki-theory` produces and that gates verification.

The summary should be specific: name the thread pages, quote the conflicting claims, and propose a concrete action (local callout, thread tension, new thread, or merge). Vague summaries like "the theory got stronger" are useless — tell the human *which* theory and *how* it changed.

## 6. Constraints Over Prescription

When writing wiki pages, prefer constraints and boundaries over step-by-step prescriptions. The wiki is a map of hypotheses, not a manual. Tell the reader what to be careful about, what conventions to follow, what boundaries to respect — and let their judgment fill the gaps. Over-specification makes pages brittle and invites [[comprehension-debt]].

This applies to wiki page content, not to the skill's own procedures (which need to be prescriptive because the agent follows them mechanically).
