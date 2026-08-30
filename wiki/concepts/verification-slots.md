---
title: Verification Slots
created: 2026-08-30
updated: 2026-08-30
sources:
  - raw/harness-engineering-ai-literacy-superpowers.md
unaudited_marginal: 0
tags: [concept, verification, harness, enforcement, constraints, progressive-hardening, loops, practitioner]
---

# Verification Slots

> Defined moments in the development workflow where a check runs and either passes or blocks progress — the enforcement points of a codebase harness for AI-assisted development. Each slot's core design choice is a deterministic tool (fast, cheap, reliable within its specification) versus an agent-based review (judgment over intent and semantics). Constraints mature along a progressive-hardening ladder (unverified → agent → deterministic), run on three loops at different timescales (edit-time advisory, PR-time strict, scheduled investigative), and are bookkept in a self-referential harness document that records its own enforcement status.

## Origin

The frame comes from [[birgitta-boeckeler|Birgitta Boeckeler]]'s harness-engineering article on martinfowler.com (ThoughtWorks context), as transmitted by the ai-literacy-superpowers plugin's explanation doc (`raw/harness-engineering-ai-literacy-superpowers.md`). Boeckeler's analogy: the test harness. Tests do not make code correct by construction — they detect when code stops being correct. A test harness does not trust the programmer; it verifies. AI-assisted development needs the same posture, but aimed at something broader than functional correctness: does the codebase still embody the architectural decisions, naming conventions, security constraints, and structural rules the team agreed on? Functional tests are necessary but not sufficient.

Boeckeler's model has three components, and the source is explicit about which parts are hers and which are the plugin's extensions:

| Component | Attribution | What it does |
|---|---|---|
| Context engineering | Boeckeler | Maintains a knowledge base for the AI (`HARNESS.md` in the plugin's conventions) — stack, decisions, conventions, constraints, and the rationale behind each |
| Architectural constraints | Boeckeler | Enforces the declared rules at **verification slots** |
| Garbage collection | Boeckeler | Fights entropy on a schedule; produces reports, not blocked PRs |
| Progressive hardening ladder | plugin extension | Promotes constraints from unverified → agent → deterministic |
| Three enforcement loops | plugin extension | Schedules slots at edit time, PR time, and calendar time |
| Self-improving dimension | plugin extension | Feeds the harness's own violation history back into its design |

> [!note] Evidence gap: the primary article is not in the wiki
> The three-component model and the verification-slot framing are attributed to Boeckeler's martinfowler.com article, which is not preserved in `raw/`. Everything on this page about her frame is known through the plugin's explanation doc — a secondary source that credits her article as its primary reference. Filing her actual article would sharpen the attribution lines drawn here.

## The Slot Design Choice: Deterministic Tool vs. Agent Review

Knowing the rules and enforcing the rules are separate problems. The context document reduces violations but does not eliminate them — the model is a probabilistic system optimizing for plausibility, not a rule-following machine. Verification slots are where enforcement actually happens, and each slot's key design decision is the enforcement mechanism:

- **Deterministic tool** — a linter, script, regex check, or file-structure assertion: pass/fail without judgment. Preferable when the constraint can be expressed precisely; fast, cheap, and completely reliable within its specification.
- **Agent-based review** — a language model judging code against a constraint description. Necessary when the constraint involves intent, semantics, or patterns hard to express mechanically. More expensive, less deterministic, but able to catch what no script can.

Both belong in a harness. The stated goal over time is to migrate constraints from agent-based to deterministic as understanding of the constraint sharpens — which is the ladder below.

## Progressive Hardening: The Promotion Ladder

The plugin's extension of Boeckeler's frame. Not all constraints are ready for deterministic enforcement from the start; the ladder describes how they mature:

1. **Unverified** — the constraint is declared in `HARNESS.md` and believed important, but no checking mechanism exists yet. This is honest accounting, not failure: a commitment to build enforcement, not a claim that enforcement exists.
2. **Agent** — an agent prompt checks the constraint as part of PR review or a scheduled inspection. Enforcement exists, but by model judgment. It catches most violations most of the time, is not perfectly reliable, and requires human review of the agent's output.
3. **Deterministic** — the constraint is expressed precisely enough to encode as a script, linter rule, or structural check running in CI. It passes or blocks the merge; no judgment, no possibility of the check being confused or misled.

The direction of movement is always toward deterministic. When an agent repeatedly catches the same class of violation, that repetition is the signal: the pattern is understood well enough to automate. Write the script, retire the agent check for that constraint, update the status entry.

The ladder prevents two failure modes: trying to enforce everything deterministically from the start (impossible for novel or semantically complex constraints), and accepting agent-based enforcement as a permanent state (expensive and unreliable).

[[backpressure]]'s "start with hard gates" rule is not contradicted by the ladder's unverified starting state: backpressure's rule governs loop convergence on mechanically verifiable problems, while the ladder governs the maturation of newly declared constraints that are not yet mechanically expressible — different objects, same deterministic endpoint.

> [!note] Synthesis: reconciling backpressure with the ladder
> This reconciliation is the wiki's interpretation, not a claim either source makes: it aligns two practitioner heuristics that address different objects — [[backpressure]]'s "start with hard gates" rule (loop convergence on mechanically verifiable problems) and the plugin's progressive-hardening ladder (newly declared constraints that are not yet mechanically expressible). The shared deterministic endpoint is the wiki's reading of their convergence, not a property either framework states.

> [!note] Synthesis: the ladder's endpoint is the wiki's final-gate finding
> The ladder's destination — deterministic checks as the disposition of record — independently matches what the [[agent-quality-engineering|quality-engineering]] thread converges on from measurement: LLM judges are unreliable as final arbiters (RUBRICEVAL's 55.97% on hard rubric judgments; SWE-bench Pro's 8.5% false-positive / 24% false-negative verifier rates), so deterministic checks belong at the gate and agent judgment at the signal layer. The ladder supplies the migration path; the empirical findings supply the reason the endpoint is where it is.

One honest gap the source itself flags: the ladder is one axis. **Reach** — whether a constraint is required on every PR or only complete-if-present — is a second axis, and the plugin's `Enforcement` field does not record it.

## The Three Enforcement Loops

The plugin structures verification slots into three loops operating at different timescales and with different tolerances for false positives:

| Loop | Mode | When | Authority | Serves |
|---|---|---|---|---|
| Inner | Advisory | Edit time / session end | Suggestions, never blocks | Context engineering — keep the AI informed in the moment |
| Middle | Strict | PR time | Can block a merge | Architectural constraints — enforce standards at integration |
| Outer | Investigative | Scheduled (daily/weekly/cadence) | Reports, not blocks | Garbage collection — detect slow entropy between integration events |

The outer loop's findings feed back into the harness as potential new constraints or updates to existing ones — the loop where the harness learns.

> [!note] Cross-source convergence: three loops, articulated twice
> [[agent-centric-development-cycle|Shaukat's AC/DC framework]] independently structures verification into three loops at the same three cadences — in-loop, pull-request, and maintenance. Neither source cites the other. The wiki's further parallel — advisory in-loop, blocking at integration, reporting on maintenance — is the wiki's interpretive mapping, not a property both frameworks state: Shaukat names the three loops and cadences but characterizes authority only for the CI loop (its quality gates); his in-loop verification explicitly includes fixing problems, which is stronger than advisory; and his maintenance loop's output form is never characterized (the AC/DC wiki page describes remediation agents, not report-only). The wiki treats the three-cadence structure as convergent practitioner consensus, not a validated result: both articulations are framework proposals, and neither is empirically measured against alternatives.

## The Living Harness: Self-Referential Status Tracking

The plugin's most distinctive property: the harness document is itself a target of enforcement. `HARNESS.md` does not only declare what constraints are in force — it tracks each constraint's status (unverified / under agent review / enforced deterministically). A scheduled **harness auditor** reads the results of the checks and updates the status entries to reflect reality. The document is both a specification and a health record: reading it tells you not just what the team agreed should be true, but how well those agreements are being maintained.

Because the harness audits itself, neglecting the harness becomes visible rather than invisible. The everyday entry point is `/harness-sync`, which runs the audit's detection logic and presents a unified drift table — misalignment between the declared harness and reality, without requiring the user to remember a separate diagnostic.

This is the document-side answer to a problem the wiki tracks elsewhere: [[doc-rot]] makes declared context silently stale, and [[contextcov]] makes declared constraints executable. The living harness attacks the same failure from the bookkeeping side — the declaration carries its own verification status, so staleness is surfaced by the audit rather than discovered by the next agent session that trusts it.

## Bounded Trust

No agent in the plugin's design has unilateral authority to modify production code or merge changes. Agents review, suggest, report, and flag; humans decide. The source states the design rationale directly: the harness amplifies human judgment; it does not replace it. This is the [[the-human-lever|human-lever]] thesis rendered as an enforcement architecture — the slots define where agent judgment is allowed to act, and the ladder defines which judgments are still on probation.

## The Self-Improving Dimension

The plugin extends the (static) Boeckeler frame with a layer that treats the harness's own operational history as input data:

- **`/reflect`** — after each coding session, captures what went well, what failed, which conventions were violated, and what new patterns emerged into a learnings log that harness agents read when making decisions.
- **Regression detection** — the harness auditor examines the violation history, not just current state: the same constraint violated repeatedly signals either a needed stronger enforcement mechanism, an unclear rationale in the context document, or a constraint that is itself wrong and needs reconsideration.
- **Harness-init bootstrapping** — rather than specifying everything from scratch, the agent infers constraints already present in the codebase and proposes a candidate `HARNESS.md`; the developer confirms, rejects, or refines each entry. The human remains the authority; the initial cost drops.
- **Incremental adoption** — teams configure features (context, constraints, GC, CI, observability) selectively and re-run later; existing configuration is preserved. The harness grows with the team's maturity rather than demanding full commitment upfront.

> [!note] Extension: single-plugin practitioner craft, not a measured result
> The progressive-hardening ladder, the three-loop model, and the self-improving dimension are the plugin doc's own extensions of Boeckeler's frame — the source says so explicitly — and everything here is reported by one plugin's explanation page. No adoption numbers, no comparative evaluation. Treat the whole mechanism family as practitioner craft consistent with the wiki's other findings, not as evidence about what works at scale. The [[self-harness]] and [[harnessx]] research line is the measured counterpart at the agent-runtime layer; this page's counterpart measurement does not exist yet.

## Thread

- [[the-slop-problem]] — the quiet-drift mechanism (plausible code, green tests, eroding coherence) is the slop problem's codebase-level form; slots and the GC loop are the structural defense the thread calls verification infrastructure
- [[the-human-lever]] — bounded trust and the slot ladder institutionalize the verification contract: agent judgment allowed, human disposition required
- [[agent-quality-engineering]] — the three loops are quality infrastructure at three cadences; the self-improving dimension is the quality flywheel reading its own violation history

## Related

- [[harness-engineering]] — the term's research sense (agent-runtime harnesses, self-evolution, open problems); this page is the practitioner sense's mechanism family, and the term collision is documented there
- [[birgitta-boeckeler]] — originator of the three-component frame and the verification-slot framing (via her martinfowler.com article)
- [[factory-maintenance]] — the outer loop's garbage collection is the declared-standards variant of Yegge's sweeps pattern
- [[context-files]] — `HARNESS.md` as a member of the context-document family, with the README-vs-context-document audience distinction
- [[agent-centric-development-cycle]] — the independent three-loop articulation (agentic / CI / maintenance) converging with the inner/middle/outer loops
- [[backpressure]] — a slot that blocks progress is backpressure: wrong outputs mechanically rejected at a defined point
- [[verification-loop]] — the general pattern; slots are where verification loops attach to the workflow's structure
- [[contextcov]] — makes declared constraints executable; the living harness's status tracking is the document-side analogue of the same enforceability push
- [[doc-rot]] — the failure mode the self-referential status tracking is designed to make visible
- [[dreaming]] — the same scheduled-reviewer family on the memory side: Anthropic's out-of-band consolidation job reviews session transcripts against the memory store and proposes changes for human disposition, as the harness auditor reviews check results against `HARNESS.md`

## Sources

- `raw/harness-engineering-ai-literacy-superpowers.md` — ai-literacy-superpowers plugin explanation doc (habitat-thinking.github.io, saved 2026-08-30). Source for the entire page: Boeckeler's three-component model and verification-slot framing (attributed to her martinfowler.com article), the deterministic-vs-agent slot design choice, the progressive-hardening ladder (including the reach-axis gap), the three enforcement loops, the living harness / harness auditor / `/harness-sync`, bounded trust, and the self-improving dimension (`/reflect`, regression detection, harness-init, incremental adoption). The doc itself credits Addy Osmani's Agent Harness Engineering for the model-plus-harness distinction and the "every line earned" discipline.
