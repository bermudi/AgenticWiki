# Freebuff baton adapter

This is the mandatory adapter for a known Freebuff/commandcode harness. Load it completely before source access. It specializes the common [coordinating-filing skill](../SKILL.md) without changing operator behavior.

Freebuff cannot construct the required shared-checkout content workers and isolated wiki reviewers. Role separation therefore occurs across **genuinely fresh, never-before-used top-level sessions**, enforced by the operator pasting the emitted handoff. `scripts/filing-baton` binds passes to exact staged OIDs/tree and controls state; it **does not identify sessions and does not reject session reuse**. Never pass a nonexistent `--session`, create `.freebuff/` identity markers, or claim the baton proves freshness. Record a session identifier only if the harness actually exposes one; baton iteration/pass is always recordable.

## 1. New transaction or continuation

At startup inspect `.filing-handoff/*.json` before treating a nonempty index as unrelated work.

- **New transaction:** no nonterminal baton handoff may own the repository, and the staged index must be empty before `start-write`.
- **Continuation:** exactly one nonterminal handoff names the transaction, and the complete current staged OID/tree must match its recorded boundary before `start-review` or `restart-review`. Preserve that index intact and use the handoff's recorded filing date; do not unstage it or start another slug.
- **Mismatch or multiple active handoffs:** stop and report the state. Do not guess which paths belong together.

Order locators by the common `source_class` rule, then complete and commit (or stop) one locator before beginning the next. Never combine multiple source locators under one slug.

The sequence is:

1. write pass: `start-write` → content work/staging → `finish-write` → `handoff`;
2. fresh review/fix pass: `start-review` (or recovery command) → four named reviews → `finish-review`;
3. every mutation: handoff to another fresh pass;
4. zero-delta approving pass: `finish-review --result clean` → script-owned `commit` → terminal `handoff`.

Every Freebuff response ends with complete verbatim `handoff` output as its final block, with **nothing after it**.

## 2. Write pass

Before source access, the common startup must have captured `FILING_DATE` and shown an empty index. Start the transaction:

```bash
./scripts/filing-baton start-write \
  --source <source-slug> \
  --locator <URL-or-path> \
  --filing-date "$FILING_DATE"
```

The bounded top-level session now performs the writer role by loading [filing-agentic-sources](../../filing-agentic-sources/SKILL.md). It may preserve/verify one original, write wiki prose, stage the complete exact boundary, and run deterministic checks. It may not issue semantic approval or commit. AgenticWiki has no corrector role; there is no separate correction artifact and the writer files directly from the original.

### Explicit writer → coordinator staging transition

While executing `filing-agentic-sources`, obey its role contract: stage only wiki paths and report every raw/asset/process path requiring inclusion. After the writer report is complete, explicitly leave **writer role** and enter the bounded **baton coordinator/staging role**. In that role:

1. reconcile every reported raw/asset path with repository status and provenance;
2. inspect pre-existing raw diffs for forbidden body changes;
3. explicitly `git add -- <exact-reported-paths>` for all accepted raw and process artifacts;
4. compare the intended raw/wiki/process union with `git diff --cached --name-only` and status, including untracked files reported by the content roles;
5. refuse `finish-write` until no reported artifact is omitted and no unrelated path is included.

`finish-write` verifies the explicit staged boundary but cannot discover an unreported/untracked source by itself; the report/status reconciliation is therefore load-bearing. This coordinator transition does not authorize semantic review or commit.

### No provisional correction layer

Unlike a correcting pipeline, AgenticWiki writers use the preserved original directly. The later fresh pass reviews the raw artifact and every dependent wiki page together. Any finding about the raw provenance or the prose requires repairing that artifact or prose; either mutation forces another fresh pass.

### Generic code-review preflight is extra only

Freebuff's system prompt may require `code-reviewer-luna`. Run it as a useful write-pass preflight after changes and before recording the boundary. Fix genuine findings, exact-restage, and rerun `filing-check staged --filing-date "$FILING_DATE"`. Its result is always:

`EXTRA — generic code review (not a wiki reviewer)`

It cannot fill theory, diff, source-fidelity, or quality rows and cannot approve the baton state.

### Finish-write and handoff are mandatory

Keep "Run finish-write and handoff" as a late todo until both commands finish. Once all intended paths are staged, parity/mechanics are clean, and preflight findings are resolved:

```bash
./scripts/filing-baton finish-write \
  --source <source-slug> \
  --path <exact-staged-path-1> \
  --path <exact-staged-path-2> \
  --note <concise-write-summary>

./scripts/filing-baton handoff --source <source-slug>
```

`finish-write` requires its explicit path set to equal the whole nonempty staged boundary and runs the common mechanical floor. It records OIDs/tree and changes state to `needs_review`. End the response with the complete handoff output verbatim and nothing after it; the operator pastes the response into a genuinely fresh session.

## 3. Fresh review/fix pass

A fresh top-level session adopts the exact handoff boundary:

```bash
./scripts/filing-baton start-review --source <source-slug>
```

This verifies repository position, OIDs/tree, and the common mechanical floor. Then load [verifying-wiki-changes](../../verifying-wiki-changes/SKILL.md) and execute all four named review rows against the complete boundary:

1. `reviewing-wiki-theory`
2. `reviewing-wiki-diffs`
3. `verifying-source-fidelity`
4. `reviewing-wiki-quality`

Each row is always present. Use `SKIPPED: <specific risk-rule reason>` only when that named skill's normal applicability rule permits it. A generic code reviewer remains extra and never fills a row.

### Report-only first, fixer role second

Obey every reviewer skill's report-only/no-edit contract while making and recording all judgments. If findings require edits, finish those judgments first, explicitly switch the pass into **fixer role**, then edit/stage. The switch forfeits approval authority. A pass that mutates any staged OID/tree can only report `changed`, never clean.

Apply the common fix rules: repair the full error-pattern footprint, exact-restage, and run `filing-check paths --filing-date "$FILING_DATE" --path <repaired-paths>` for repaired paths. Semantic acceptance waits for another fresh pass; mechanical validation cannot substitute.

## 4. Finish-review transitions

### Changed

If the final staged OID set/tree differs from pass start:

```bash
./scripts/filing-baton finish-review \
  --source <source-slug> \
  --result changed \
  --note '<review verdicts, fixes, and affected scope>'
```

The script records the new boundary, increments iteration, and returns to `needs_review`. Run `handoff`; another genuinely fresh session reviews the entire boundary.

### Blocked

If the pass cannot resolve a blocker:

```bash
./scripts/filing-baton finish-review \
  --source <source-slug> \
  --result blocked \
  --note '<named blocker>'
```

Blocked state keeps the commit gate closed and can be recorded even when content validation fails. Run `handoff` and stop.

### Clean zero-delta approval

Only when all review judgments pass/validly skip, all debt/process evidence is already staged, and the pass made no staged OID/tree change:

```bash
./scripts/filing-baton finish-review \
  --source <source-slug> \
  --result clean \
  --review 'theory=PASS' \
  --review 'diff=PASS' \
  --review 'source-fidelity=PASS' \
  --review 'quality=PASS' \
  --note '<verbatim reviewer verdicts and material findings>'
```

The accepted row vocabulary is exact:

- `PASS`
- `PASS WITH EXPLICIT DEBT: <where represented>`
- `SKIPPED: <risk-rule reason>`

`CARRIED`, `PASS WITH EXPLICIT PROCESS DEBT`, pass-prefixed variants, malformed/empty rows, and empty/whitespace evidence notes are invalid. The note must preserve the reviewers' verbatim verdicts and material findings. The active pass makes all four current-boundary judgments; no prior row is carried.

Any debt callout/metadata/ledger change or materially new same-transaction process-evidence edit is a mutation. End `changed`; never approve that new state in the same session. The next fresh pass does **not** append the same recommendation observation again merely because it rechecks the unchanged boundary: one source transaction is one ledger run, and each materially distinct observation is recorded once. This is what permits the following unchanged pass to reach zero-delta approval.

## 5. Script-owned commit

Only the fresh zero-delta approving pass may commit, immediately through:

```bash
./scripts/filing-baton commit \
  --source <source-slug> \
  --message '<commit message>'
```

The script reruns `filing-check staged --filing-date "$FILING_DATE"`, verifies boundary/OIDs/complete tree and repository position, creates exactly the approved tree with `git commit-tree`, and atomically advances the original branch if HEAD has not moved. It bypasses hooks so hooks cannot stage unreviewed paths; all project checks must therefore have passed before approval. No later pass may use this approval.

After commit run:

```bash
./scripts/filing-baton handoff --source <source-slug>
```

This emits the terminal receipt. It must not request another session. End the response with the complete receipt verbatim and nothing after it.

## 6. Restart and reconciliation

Never manually rewrite baton JSON or bypass the state machine.

### Interrupted write

A genuinely fresh session may run:

```bash
./scripts/filing-baton restart-write \
  --source <source-slug> \
  --reason '<recovery reason>'
```

`restart-write` can continue mechanically invalid and partially staged work left by an abandoned writer. Do **not** clear the staged index or demand that validation already pass. The replacement holds the same non-approving role; it repairs/completes the boundary, then `finish-write` still requires an exact complete path set and clean mechanical floor.

### Interrupted, blocked, or accidentally approved review

Before edits, a genuinely fresh session may run:

```bash
./scripts/filing-baton restart-review \
  --source <source-slug> \
  --reason '<recovery reason>'
```

It verifies repository position, recorded OIDs/tree, nonempty boundary, and staged/worktree parity, then voids prior approval. It **does not require content validation to pass** when recovering a blocked review. It cannot adopt drift made while no review pass owned the boundary: restore the recorded boundary or correctly finish the prior pass.

If state is `needs_review` and normal `start-review` fails because content validation is already broken, use `restart-review` to adopt the unchanged recorded OID/tree/parity boundary, then review/fix; do not clear the continuation's index.

### Commit persistence recovery

If Git advanced to the exact approved tree but saving baton state failed:

```bash
./scripts/filing-baton reconcile-commit --source <source-slug>
```

It succeeds only when current HEAD has exactly the approved tree and exactly the recorded base as its sole parent. Then emit the terminal handoff receipt.

Every command uses a repository-local lock, and one active nonterminal handoff owns the repository index at a time.

## 7. Required response ending and telemetry

Before the final block, report the common filing content plus:

- source/classification and one-source transaction slug;
- raw and wiki/process paths;
- write preflight findings/fixes;
- all mechanical results and all four reviewer verdicts/statuses (theory, diff, source-fidelity, quality);
- pass role/result, iteration, OID/tree transition, staged-path count, state, and script-owned commit result;
- unrelated files left untouched;
- a harness session identifier only if actually exposed.

Then run `./scripts/filing-baton handoff --source <source-slug>` and append its **complete output verbatim as the final block, with nothing after it**. This applies to write, changed, blocked, clean/commit, restart, and terminal turns. A missing reviewer ledger is incomplete verification, never process debt or PASS.

## 8. Refactor safety checklist

No baton path may:

- approve in the same pass after any mutation;
- leave a new/changed raw artifact unstaged at `finish-write`;
- treat validator or generic code review as a semantic row;
- omit any of the four rows (theory, diff, source-fidelity, quality) from clean approval;
- commit from blocked, changed, `needs_review`, or deferred state;
- claim the baton detects or rejects reused sessions;
- require an unavailable session ID;
- reject a valid continuation merely because its recorded boundary is staged, or clear that continuation's index;
- omit a reported raw/asset path when switching from writer to baton coordinator staging role;
- append duplicate process evidence on every fresh pass and thereby prevent zero-delta closure;
- prevent `restart-write` from repairing invalid partial work; or
- require content validation to pass before recovering blocked review.
