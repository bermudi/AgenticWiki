---
title: Proactive Service
created: 2026-06-18
updated: 2026-06-18
sources:
  - raw/2606.16707v1.md
tags: [concept, agent-memory, proactivity, alert, constraint, agent-initiation]
unaudited_marginal: 0
---

# Proactive Service

> The capability tier in which an agent surfaces an unsolicited alert, recommendation, or action — driven by a state change in the user's data, not by a user query. The defining property is the **initiation asymmetry**: the system must generate the alert without being asked, triggered by a constraint violation rather than a question.

## Origin

The framing is from Bojie Li's *User as Code* (Pine AI, June 2026; arXiv 2606.16707), which introduces the **Active Service** benchmark specifically to test this capability. Prior benchmarks (LOCOMO, LongMemEval) test retrieval-when-asked; Active Service tests memory-triggered alerting in the absence of a user query.

The motivating example: a user is prescribed amoxicillin in January 2025 for a sinus infection. Ten months earlier, in March 2024, she told the agent she was deathly allergic to penicillin (anaphylaxis). Amoxicillin is a penicillin-class drug. The agent should flag this — without the user asking about drug interactions, without the user re-stating the allergy, possibly without the user even knowing the drug is in the penicillin family.

A retrieval-based system would need to know amoxicillin is a penicillin-class drug (uncertain under retrieval pressure) and to rank a year-old allergy turn highly against a current prescription query. Neither is reliable. An executable constraint over typed state fires deterministically: `med.drug_class == allergy.drug_class` is a one-line boolean check the interpreter runs at every state change.

## The Initiation Asymmetry

The defining property of proactive service. Standard agent tasks are *reactive*: a user asks, the agent answers. Proactive service is *agent-initiated*: a constraint fires on a state change, the agent surfaces the alert in the next session, possibly before the user knows there's a question to ask.

This is the missing tier in the standard recall/retrieval taxonomy. Existing benchmarks collapse proactivity into "did the agent retrieve the right fact when asked?" — but the alert never gets asked. The system must notice the constraint violation across facts surfaced in different sessions, by different people, possibly months apart.

## Why Retrieval Cannot Serve It

Top-k retrieval ranks documents by similarity to a query. Proactive alerts are not query-driven — the user never asked. The mechanism must be a *check*, not a *search*. Three structural reasons retrieval fails:

1. **No query to retrieve against.** A constraint fires on a state change (`new_medication.drug_class == existing_allergy.drug_class`). Retrieval has no anchor.
2. **Cross-temporal matching is hard.** The drug-allergy link requires the system to remember the March 2024 allergy turn while processing the January 2025 prescription turn, ten months and many sessions apart.
3. **Domain-knowledge dependencies.** A simple retrieval baseline may not know that amoxicillin is a penicillin-class drug. The constraint encodes this knowledge once; retrieval would need to encode it at every fact.

The UaC paper's Analytical Inference result is the same structural argument, applied to a different tier: any question whose answer depends on every relevant record (counts, sums, group-bys, time-window filters) is structurally outside what top-k retrieval can solve. Proactive alerts are a stricter case: not only does the system need every relevant record, it needs to fire the check without being asked.

## Constraint-Based Alerting

The mechanism: **executable constraints over typed state**. Constraints are ordinary Python functions that read the typed user state and return a list of `Alert` objects. The interpreter runs them deterministically. Alerts surface in the manifest's `ACTIVE_ALERTS` at the start of every conversation.

A worked example: drug-allergy interaction.

```python
def check_drug_allergy(profile: MedicalProfile) -> list[Alert]:
    alerts = []
    for med in profile.current_medications:
        for allergy in profile.allergies:
            if med.drug_class == allergy.drug_class:
                alerts.append(Alert(
                    severity="critical", domain="health",
                    message=f"DRUG-ALLERGY CONFLICT: {med.name}..."))
    return alerts
```

The constraint is **written once** by the coding agent when it first sees the user's medical profile. The interpreter runs it on every state change. When the user starts a new medication, the constraint fires. The alert appears in the next session's manifest, before the user asks anything.

## Five Categories of Active Service

The Active Service benchmark covers 40 standard + 20 hard scenarios across five categories. Each is a real-deployment risk: a missed alert is a real harm avoided, not a ranking-list position.

| Category | Example alert |
|---|---|
| **Travel document validity** | Passport expires within 180 days of an international trip |
| **Drug interactions** | Newly prescribed drug conflicts with a logged allergy |
| **Financial authorization conflicts** | Two wire-transfer instructions for the same recipient from different family members with different destination accounts |
| **Scheduling conflicts** | Two meetings booked at overlapping times for a single person |
| **Warranty/deadline expirations** | Mortgage rate-lock window expires before closing date |

The hard scenarios (n=20) require multi-step date arithmetic (business days, leap years, timezones), compound multi-domain constraints (4–5 domains), precise numerical thresholds (tax brackets, compound interest, DTI), and temporally ambiguous facts.

## Results on the Active Service Benchmark

| System | Standard (n=40) | Hard (n=20) |
|---|---|---|
| UaC + constraint pipeline | **100%** (CI [91.2, 100.0]) | **85%** (CI [64.0, 94.8]) |
| Mem0 (live, mem0ai 1.0.5) | 90% | 80% |
| Mem0 (simulated, perfect recall) | 92.5% | 65% |
| A-MEM (live) | — | 30% |
| Full Context (live) | — | 55% |
| UaC (no pre-computed alerts) | 52.5% | 45% |

The decisive factor is the **pipeline, not the representation**. UaC without pre-computed alerts drops to 52.5% on standard scenarios — losing the constraint runner costs 47.5pp. The typed state alone doesn't fire alerts; the constraint runner does.

The hard-scenario gap is genuinely hard. On hard arithmetic, UaC drops 15pp (100% → 85%); live Mem0 drops 10pp (90% → 80%); simulated Mem0 drops 27.5pp (92.5% → 65%); A-MEM falls to 30%. The one comparison the paper cannot resolve is live Mem0 at 80% on hard scenarios — CIs overlap heavily and McNemar gives p=0.69; n≈200 would be needed to resolve the 5pp effect at α=0.05. The headline claim is that the pipeline separates UaC from four of five baselines at p<0.01; the fifth (live Mem0 on hard) remains inconclusive at n=20.

## Constraint Generation

Constraints are not pre-defined. The coding agent writes them when it sees a check that's worth running. The pattern is the **generate-verify-review loop** applied to memory:

1. **Generate**: The coding agent writes a constraint against the typed state.
2. **Verify**: Execute in a sandbox — results are deterministic.
3. **Review**: The agent reviews results. If the check proves useful, promote it to a persistent constraint in `constraints/`.

Constraints emerge from the LLM's reasoning about the user's life. The system does not need to be told which checks to write; the agent discovers them. Over time, the constraint library accumulates — drug-allergy, passport-renewal, mortgage-rate-lock, birthday-reminders, tax-deadlines — whatever the user actually needs.

## The Manifest Pattern

Proactive alerts only fire if they are *visible*. The mechanism: a compact manifest (~200–300 tokens) loaded at the start of every conversation, containing a domain summary and an `ACTIVE_ALERTS` list. The constraint runner overwrites `ACTIVE_ALERTS` on every state change. The agent reads the manifest before responding to anything; outstanding alerts are surfaced proactively with no retrieval.

This is the same progressive-disclosure pattern as the broader [[context-engineering]] literature, but the manifest's payload includes not just context but also *obligations to act*. The agent is told: "before responding to the user, check the alerts."

## Relationship to Existing Wiki Concepts

- [[executable-memory]] — The substrate. UaC is the implementation; the Active Service benchmark is its distinctive capability tier.
- [[agent-quality-loop]] — The generate-verify-review loop applied to memory. Ad-hoc checks get promoted to persistent constraints.
- [[backpressure]] — Constraints as mechanical rejection: a firing constraint blocks the agent's plan or routes it.
- [[procedural-knowledge]] — Persistent constraints are procedural knowledge in executable form. The agent accumulates checks as it discovers them.
- [[verifiability]] — The interpreter is the verification boundary. The LLM is not in the verification loop at check time.
- [[jagged-frontier]] — Concrete empirical evidence: retrieval is fine for recall, code-exec is required for constraint checking. Capability is jagged across representation.
- [[context-engineering]] — The manifest as always-loaded compact context; alerts as context-bound obligations.
- [[verification-loop]] — The constraint runner is a continuous verification loop running over user state.
- [[failure-modes]] — Missing proactive alerts is a class of agent failure: "the agent didn't notice the constraint violation." UaC's pattern is a counter-move.

## Thread

- [[the-verifiability-thesis]] — The interpreter is the verification boundary; constraint checking is a form of memory verification. The model is not in the loop at check time.
- [[the-agent-workflow]] — The workflow includes proactive checks: the agent surfaces alerts in the manifest before processing the user's request.
- [[agent-quality-engineering]] — Constraints accumulate over time; the generate-verify-review loop is a concrete quality loop for memory.

## Related

- [[executable-memory]] — The substrate; the User as Code paradigm
- [[agent-quality-loop]] — Generate-verify-review applied to memory
- [[backpressure]] — Constraints as mechanical rejection of unsafe actions
- [[procedural-knowledge]] — Persistent constraints as procedural knowledge in executable form
- [[verifiability]] — The interpreter as the verification boundary
- [[jagged-frontier]] — Concrete empirical evidence that retrieval cannot serve constraint checking
- [[context-engineering]] — Manifest as always-loaded compact context
- [[verification-loop]] — Continuous verification loop over user state
- [[bojie-li]] — Author of UaC, Pine AI

## Sources

- `raw/2606.16707v1.md` — Bojie Li, Pine AI (June 2026). *User as Code: Executable Memory for Personalized Agents.* Sections 1, 3.3.2, 4.4, and Appendix F.2–F.4. The five Active Service categories, the 40 standard + 20 hard scenarios, the constraint pipeline as the decisive factor (no-alerts UaC at 52.5%), and the drug-allergy + wire-transfer worked examples.
