---
name: coordinating-filing
description: "Coordinates AgenticWiki filing through either shared-checkout workers plus isolated reviewers or Freebuff's fresh-session baton state machine, then holds the applicable theory and commit gates."
---

# Coordinating Filing

You coordinate the filing pipeline: order sources, arrange preservation and writing, stage the complete raw/wiki/process boundary, run verification, route fixes, and hold the commit gate. You own the process, not editorial content.

## Interface and mandatory startup

**Input:** one or more source documents, URLs, transcripts, or media items, plus explicit scope or commit instructions.

**Output:** preserved and staged raw sources, a verified wiki changeset, and a reconciled filing report.

Before fetching, opening, or reading any source body:

```bash
FILING_DATE=$(date +%F)
git status --short
git diff --cached --name-only
```

`FILING_DATE` is the local calendar date and remains fixed throughout a new filing. Record the complete status and staged boundary before acting on it.

### Select and load exactly one adapter

Select the adapter **before source access** and load its entire reference:

- A known Freebuff/commandcode session **must** load [Freebuff baton](references/freebuff-baton.md).
- Every other harness **must** load [Full worker topology](references/full-topology.md). That adapter begins with a capability probe; inability to supply it is handled there, not by inventing another workflow.

There is no third topology, and a capable harness may not choose baton mode merely to avoid worker dispatch. [Harness notes](references/harness-notes.md) are an observational inventory, not a normative adapter.

A **new** filing starts from an empty staged boundary. If paths are already staged, stop unless the selected Freebuff adapter confirms they exactly match one nonterminal baton handoff being continued. A valid baton continuation preserves that index intact and inherits the handoff's recorded filing date; it never unstages its boundary. Any other pre-existing staged paths require human authorization to unstage those exact paths. Never use broad `git reset`, `git restore --staged .`, or any operation that absorbs or clears unrelated worktree/index changes.

Read `meta/pipeline-recommendations.md` before work. Report relevant rows tested; never close one without its required dated commit/session evidence. One source filing transaction—including all of its fresh baton review/fix passes—is one run for ledger purposes. Record materially new evidence once inside that transaction; a later pass over unchanged evidence does not append the same observation again or mutate the boundary merely because it rechecked it.

## Shared role boundary

The common interface is always the staged Git artifact. Content roles may build it, reviewers may inspect it, and only the selected gate may authorize committing it. No role may redefine success around an unstaged worktree copy.

In full topology the coordinator never fetches or reads source bodies, reads wiki page bodies, writes wiki prose, or writes raw artifacts. It passes locators to shared-checkout content workers and inspects only process evidence, paths, metadata/provenance, status, diffs needed for immutability, and staged OIDs.

In baton topology the bounded top-level write role may perform content work only as authorized by its adapter. This does not grant the later review role same-state approval after mutation.

The first applicable content role owns source-body access and preservation: the writer. Existing `raw/` bodies are immutable. Writers create/verify raw artifacts but do not stage them in full topology; the filing coordinator role (the full coordinator or bounded baton write role) performs exact raw staging. AgenticWiki has no corrector role; there is no correcting-sources step and no correction review row.

Canonical content and verification contracts live in:

- [filing-agentic-sources](../filing-agentic-sources/SKILL.md)
- [verifying-wiki-changes](../verifying-wiki-changes/SKILL.md)
- [reviewing-wiki-theory](../reviewing-wiki-theory/SKILL.md)

Load them when their role begins. Do not duplicate or weaken their report, risk, evidence, or verdict contracts here.

### Role limits

The coordinator does not choose page scope, framing, evidence posture, or narrative structure; those are writer judgments. It does not repair wiki content, even for links, frontmatter, `## Sources`, or `wiki/index.md`; it routes defects to the owning writer. It does not perform reviewer judgment or infer that a silent worker completed work. In full topology these limits are absolute. Baton grants the bounded write/fixer role only the edits described in its adapter, never approval of bytes that role changed.

## Source order

Ordering is an evidence discipline: stronger/direct material establishes the factual spine before interpretation and aggregation are layered onto it.

Use a simple heuristic from locator metadata only — primary sources (arXiv papers, original blog posts, conference talks, official docs) before commentary or aggregation. If ordering is unclear, use the order supplied. Do not read a source body to classify it. Baton mode uses one source locator per transaction; its adapter defines the multi-source sequence.

## Shared filing flow

### Prepare locator records

For each source retain only the supplied URL/local path, class inferable from locator metadata, and explicit user scope until a content role starts. Do not prefetch, extract, move, open, or verify a body. The first content role chooses the canonical slug/path and follows `meta/wiki-conventions.md`: truthful provenance, `filed: $FILING_DATE` for a new artifact, historical `filed:` preserved for an existing artifact, and move—not copy—when consuming a supplied Downloads file. The role reports every resulting raw/asset path for exact staging.

### Execute the pipeline

1. **Preserve the original before dependent prose.** Writers preserve or verify the immutable original first. Articles and text-native primary documents need no separate correction step; AgenticWiki files from the original directly.
2. **Run writers sequentially.** Use one source at a time in source-class order so each writer sees earlier staged wiki contributions. The writer decides the page set, updates `wiki/index.md` when pages change, stages only intended wiki paths, and never commits. Capture authoritative before/after index state rather than trusting a self-report.
3. **Stage every raw/process artifact exactly.** Explicitly `git add -- <path>` every new/changed original, asset, permitted raw-frontmatter mutation, writer-retrieved durable source, and coordinator-owned ledger. Never use `git add -A`. The reviewed union is writer-staged wiki paths plus coordinator-staged raw and process paths; no raw artifact may remain unstaged.
4. **Run the common mechanical floor.** Immediately before semantic review and again before commit:
   ```bash
   ./scripts/filing-check staged --filing-date "$FILING_DATE"
   ```
   Route content errors to the owning writer. A clean check is necessary but is not a semantic verdict.
5. **Verify the complete staged changeset.** Load `verifying-wiki-changes` in `staged-changeset` mode and supply the complete wiki/raw/process boundary, scope, `FILING_DATE`, and media records. Follow the selected adapter for reviewer construction. Generic code review is extra only and cannot fill a wiki-review row.
6. **Remediate once, then close out.** Route every CRITICAL (including out-of-scope CRITICALs), every IN-SCOPE warning carrying a fix spec, accepted theory suggestions, and Rule-9 callout representations for known-unrouteable reader-facing warnings to one fresh writer as ONE batched pass; the writer repairs each finding's whole error pattern within it and dispositions any spec it adjusted or declined. Re-stage only the exact repaired paths and run `filing-check paths` with the same repeated paths. Then run the verifier's single close-out round: mechanically verify exact fix specs against staged bytes, re-review the remediation delta (fixes and callouts) with the diff reviewer, targeted fidelity for semantically adjusted fixes, theory/quality only under the verifier's convergence conditions. There is no third round — residual warnings become Rule-9 debt representation (page callouts ride in the reviewed batches; ledger rows are coordinator-owned meta — staged by the coordinator in full topology, inside the fixer switch in baton mode, with round-1 rows alongside the batch and round-2 rows via the bounded meta-only mutation). Validator-only closure of semantic findings is forbidden; mechanical closure applies only to exact fix specs proven against staged bytes. Media questions follow the verifier's Tier-1 route and return to the writer; the media call alone never closes fidelity review.
7. **Represent debt and process evidence before approval.** Any accepted evidence gap must already exist as honest in-page posture or a staged `meta/tech-debt.md` row. Materially new recommendation evidence is recorded once per filing transaction in staged `meta/pipeline-recommendations.md`; subsequent fresh passes do not duplicate unchanged evidence. Re-run the mechanical floor and verification aggregation; reviewer reports may be reused only under the verifier's same-run, ledger-only, content-OID-identical rule plus its aggregation reuse exception for round-1 theory/quality rows whose close-out trigger did not fire.
8. **Commit through the adapter gate.** Commit only after `PASS` or `PASS WITH EXPLICIT DEBT`, with all loops closed and no unresolved CRITICAL or question. Full topology uses the coordinator's normal commit after the final mechanical rerun; baton uses only the script-owned zero-delta commit path. "Stop before commit" overrides filing authorization.
9. **Reconcile and report.** Compare the report with `git diff --cached --stat`, or after commit with `git show --stat --oneline HEAD`.

### Ownership routing

The content role that created a defect repairs it: writers own wiki prose/frontmatter/index/source declarations and writer-retrieved source preservation. The coordinator owns only process ledgers, exact raw/process staging, mechanical reruns, review dispatch, and commit. Do not let convenient write access blur those boundaries.

A writer blocker stops later writers and verification. Sequential writing is deliberate: later sources build on earlier staged wiki state rather than racing shared pages.

### Complete staged boundary

The stable review boundary is the union of all cumulative writer-staged wiki paths, coordinator-staged raw/assets, and staged process ledgers. Report the raw subset, wiki subset, and process subset separately. Check cached/worktree parity through `filing-check`, and inspect pre-existing raw diffs specifically for body hunks. A reviewer reads the complete stable artifact, not a writer's cumulative-path claim.

### Verification and remediation details

The verifier, not this common skill, classifies changes as mechanical/substantive/high risk and decides which named reviews apply. Preserve all four rows — theory, diff, source-fidelity, quality — including justified `SKIPPED`, and same-run ledger-only reuse where allowed. An unavailable row is incomplete verification. The common skill only ensures the verifier ran; it does not second-guess which rows the verifier required.

When a reviewer reports a deterministic defect, rerun the named mechanical command before accepting or diagnosing the claim. When a fix lands, the owning content role reports it, but authoritative checkout evidence controls. The writer repairs the whole error pattern inside the single remediation pass — all instances of a wrong date, all desynchronized source declarations, all affected Related sections — while re-review stays scoped to the convergence close-out: an exact fix spec proven against staged bytes closes its own finding, and everything else is re-reviewed once over the remediation delta.

Tier-1 media adjudication is narrow evidence for the verifier's structured Audio Attribution or Exact Quote question, never as proper-noun spelling authority.

## Common phase records

Maintain these compact records while the selected adapter runs. They make a filing inspectable after the workers disappear and are the basis for the final report.

### Startup record
- captured `FILING_DATE`;
- pre-existing status and cached-path output;
- selected adapter and why it applies;
- ordered locator/class list;
- pipeline-recommendation rows inspected.

### Content record
- writer identity or baton pass/iteration;
- authoritative path/OID delta for each role;
- original/assets and provenance result;
- blockers, contradictions, gaps, and media questions;
- triage outcomes (full/marginal/skip) and scope decisions.

### Boundary record
- cumulative wiki paths;
- exact coordinator-staged raw/process paths and commands;
- complete stage-0 OID set/tree where the adapter uses it;
- `filing-check` results and parity state;
- explicit `git add --` inventory versus `git diff --cached --name-only`.

### Review record
- all four named rows with dispatch/pass identity and verdict;
- carried/reused/skip basis where canonically allowed;
- each finding → owner → repair → closure chain (mechanical fix-spec match, close-out rerun verdict, or Rule-9 debt representation);
- debt/process representation and content-OID identity proof;
- media questions and their structured results.

### Closure record
- final verdict or named non-committing stop;
- authorization, final mechanical result, commit mechanism/hash;
- Git stat reconciliation and complete disclosure;
- handoff or deferred-verification artifact when applicable.

## Core invariants

These are hard gates, not guidance. The adapter may add controls but cannot relax them. When a reference and this section appear to conflict, choose the interpretation that preserves role separation, exact staged identity, and semantic reruns, then stop for clarification rather than weakening a gate.

- Raw source bodies are immutable; only permitted raw frontmatter may change.
- Exact staging is mandatory. Never absorb unrelated paths or leave a cited/new raw artifact unstaged.
- A writer cannot commit. A full-topology coordinator cannot perform a failed content role inline.
- Required workers/reviewers cannot be replaced by coordinator reading, same-context judgment, or a generic agent. Generic code review is not wiki review.
- `filing-check` is mechanical evidence, never a semantic `PASS`.
- Filing verification converges: one full review round, one batched remediation pass, one scoped close-out round — never a third round. An exact fix spec proven against staged bytes closes its own finding; the close-out re-reviews the remediation delta with the diff reviewer whenever remediation edited anything, adds targeted fidelity for semantically adjusted claim/source fixes, quality for structural changes, and theory for thread-touching remediation. Residual warnings terminate as Rule-9 debt representation, not as further rounds; the bounded closure mutations (a round-2 critical's single mechanical fix — on a fix hunk or on unchanged text, since fabricated claims never become debt rows — with a hunk diff review; a round-2 reader-facing warning's single representation edit plus hunk diff review; meta-only debt-row staging, which needs no content review) are the only exceptions.
- No commit on `FAIL`, `VERIFICATION DEFERRED`, unavailable reviewer rows, malformed/skipped-without-reason rows, deferred debt registration, deferred process evidence, an open retry/fix/media/review loop, or an unresolved human decision.
- Commentary remains attributed framing unless independently supported; never launder it into fact. Contradictions and fragile evidence are represented explicitly under wiki conventions.
- A staged boundary/OID check proves bytes, not command history; record exact staging commands when exposed and disclose when telemetry is unavailable.
- An empty/no-op worker return is failure: retry once after checking shape/scope, then stop. Transient rate limits/timeouts use bounded backoff; capability failures do not.
- Repository status and staged OIDs are authoritative after every dispatched edit; worker prose is only a report.
- Process ledger evidence and accepted content debt must be staged before the approval that relies on them; post-verdict appendages invalidate closure. A baton transaction records each materially distinct observation once—rechecking the same staged evidence in its next fresh pass is not a new ledger mutation.
- `wiki/index.md`, each new page's `## Related`, and every edited page's `updated: $FILING_DATE` remain writer obligations under project conventions.

## Process checklist

Use this short checklist together with the selected adapter's detailed gates. A checked mechanical row never compensates for a missing semantic row.

- [ ] For a new transaction, captured one local `FILING_DATE` and an empty staged boundary before source access; for a baton continuation, inherited the handoff date and preserved its exact nonempty staged boundary.
- [ ] Loaded exactly one mandatory adapter; full topology completed its pre-content capability probe.
- [ ] Ordered sources by `source_class`; baton transactions contain one source each.
- [ ] Preserved originals before dependent prose; no existing raw body changed.
- [ ] Ran writers sequentially; authoritative status/OID deltas match intended wiki scopes; `wiki/index.md` is included when required.
- [ ] Explicitly staged all raw, asset, and process paths; unrelated staged/worktree paths remain untouched.
- [ ] `filing-check staged` passed on the stable complete union before review.
- [ ] `verifying-wiki-changes` recorded all four reviewer rows (theory, diff, source-fidelity, quality); generic review appears only as `EXTRA`.
- [ ] Fixes ran as one batched remediation pass; each fix spec was mechanically closed against staged bytes or covered by the single scoped close-out round; no third review round occurred.
- [ ] Media questions, debt registration, and same-run process evidence are closed inside the reviewed boundary.
- [ ] Final mechanical check and topology-specific commit gate passed; no deferred/fail/open state was committed.
- [ ] Final report matches staged/committed Git evidence and discloses retries, stalls, empty returns, hard stops, and interventions.
- [ ] Writer self-reports were reconciled with authoritative status, diffs, and index OIDs.
- [ ] No process/debt edit was appended after the semantic verdict it supports.
- [ ] Commit authorization was confirmed and the adapter-specific final receipt/report contract was followed.

Before closing, explicitly challenge each forbidden path: no unstaged raw artifact, validator-only closure, generic reviewer row, deferred-verification commit, or cleared continuation index.

### Minimum process evidence

Retain the initial cached boundary, source-class order, content-role dispatch sequence, per-writer index delta, raw/process staging list, pre-review and pre-commit mechanical results, reviewer ledger, fix/rerun pairs, and final commit/stop state.

## Human decisions

Escalation keeps the gate closed and preserves the staged boundary unless the selected adapter explicitly describes recovery. Never clear unrelated or continuation state merely to make a blocker easier to restart.

Ordinary content findings, link/frontmatter failures, index maintenance, source desynchronization, and routine debt routing are not human decisions; route them to their owner and rerun the gate.

Stop and ask only when:

- the initial index is nonempty and continuation requires exact-path unstaging authorization;
- a required full-topology writer cannot be constructed after the applicable retry;
- a writer reports a gated source, schema change, merge/page-deletion decision, or another blocker reserved for the human;
- a CRITICAL finding cannot be resolved without human judgment;
- a role worker returns empty/no-op twice; or
- commit is expected but not authorized.

Never delete a page without approval. Do not ask the human to repair ordinary writer/reviewer findings that the selected topology can route and recheck itself.

## Failure and telemetry discipline

Never treat a worker's confident formatting as evidence that it read the repository. Full topology proves repository access before content work; baton proves artifact identity mechanically and relies on operator-enforced fresh context. In either topology, preserve the distinction between mechanical identity and semantic independence.

Classify dispatch outcomes as transient, shape/schema, capability, or ambiguous/empty. Retry only according to the adapter; do not hide stalls or interventions. Record worker/task identity and capability when exposed, every bounded retry and duration, authoritative OID/path transitions, exact coordinator staging commands, and worker staging commands only when harness telemetry exposes them. If command telemetry is unavailable, say so rather than inferring it from final state.

## Shared report contract

A useful report lets the human understand what became durable knowledge and audit how it passed the gate without reading hidden worker logs. Keep factual additions separate from attributed commentary and from process observations.

Report:

- sources preserved;
- writer count/order/blockers and pages created/updated;
- material facts, attributed frames, contradictions, evidence gaps, and narratives considered/updated/left untouched;
- mechanical checks, final verifier verdict, and the complete reviewer ledger;
- debt/process evidence recorded and relevant AG-xxx IDs tested;
- Tier-1 media calls and actions;
- exact raw/wiki/process staged inventory, retries/failures/stalls/interventions, and topology telemetry;
- commit state and hash when committed.

Also distinguish newly created pages from updated pages and identify deliberate omissions or archive-only outcomes. Surface contradictions rather than silently replacing old claims. State whether unrelated staged/worktree paths were left untouched.

Full topology records worker/task capabilities and dispatch results. Baton records pass role/result, iteration, OID/tree transition, reviewer rows, script commit result, and a session identifier only when the harness actually exposes one. The selected adapter adds its required deferred handoff or verbatim terminal/handoff receipt.

## Commit authorization and closure

The coordinator holds the gate even when all workers report success. Success means the exact staged artifact—not merely the worktree—passed the required mechanical and semantic controls.

A request to "file," "ingest," or "process" authorizes commit only after the selected adapter's complete gate returns `PASS` or `PASS WITH EXPLICIT DEBT`; an explicit stop-before-commit instruction wins. If authorization is absent but commit is otherwise ready, ask one concrete question rather than implying completion.

Do not end a turn at a phase boundary. Continue through the active retry, fix, deterministic check, semantic rerun, and verdict, or name the blocker/intervention and state that the commit gate remains closed. Reconcile counts, paths, raw inventory, reviewer rows, and commit status against Git before reporting.

If a final comparison exposes an unreported or unstaged path, reopen the appropriate gate. Do not edit the prose report to conceal artifact drift, and do not commit first in hopes that the post-commit stat will make the boundary easier to explain.
