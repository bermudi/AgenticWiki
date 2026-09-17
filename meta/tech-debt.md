---
title: Technical Debt Registry
created: 2026-07-20
updated: 2026-09-16
last_audit: 2026-07-22
warning_budget: 5
critical_blocks: true
---

# Technical Debt Registry

Machine-readable registry of deferred wiki issues. Each row is a debt item that must be resolved by an audit.

## Status values

`./scripts/validate-page` emits a `STATUS:` line and an exit code that always agree. Precedence: `ERRORS_FOUND` > `OVER_BUDGET` > `WITHIN_BUDGET`.

- `WITHIN_BUDGET` (exit 0): Clean to file. No mechanical errors, no open `critical` rows, and open `warning` rows ≤ `warning_budget`.
- `ERRORS_FOUND` (exit 1): Mechanical errors (broken links, source desyncs, missing sections). Fix before filing.
- `OVER_BUDGET` (exit 1): Accumulated registry debt too high — either an open `critical` row (when `critical_blocks: true`) or `warning` rows exceeding `warning_budget`. Run audit before filing.

Budget is read from this file's frontmatter (`warning_budget`, `critical_blocks`); tuning the threshold does not require editing the validator. In changed-scope mode (paths supplied), `OVER_BUDGET` is not evaluated — the status reflects only the supplied paths, and repo-wide debt is reported as informational.

## Current Debt

Schema (asserted by `./scripts/validate-page`): `| Date | Page | Issue | Severity |` — severity must be the last column. Changing this header is a schema change requiring human approval, coordinated with the validator.

| Date | Page | Issue | Severity |
|------|------|-------|----------|
| 2026-07-27 | the-verifiability-thesis.md | Extension callout ("widens over time") extrapolates beyond Schillings' source material. Fix: verify against future sources or soften to "may widen". | warning |
| 2026-08-05 | discourse-slop.md | Slop Family table lists 5 categories (code, information, benchmark, spec, discourse); the-slop-problem now enumerates 7 (adds skill slop + foundation-layer) — cross-page ordinal mismatch: "sixth category" in the thread reads as "fifth" against the table. Fix: align the table with the thread's 7-category enumeration (add skill slop and foundation-layer rows). | warning |
| 2026-08-30 | factory-maintenance.md / gas-town.md | "The current best-practice framing is 'sweeps' agents…" (gas-town.md:39; same phrasing removed from factory-maintenance.md:50 in the 2026-08-30 fix pass) states a best-practice certainty Yegge's filed transcript does not make (17:52–17:59: "the next thing that usually emerges within a factory"). Fix: soften to the source's "usually emerges" phrasing with attribution, matching the factory-maintenance fix. | warning |
| 2026-08-30 | birgitta-boeckeler.md | INFO-level source-fidelity notes left unapplied at filing: "Tessel" spelling (line 18) vs wiki-canonical "Tessl"; "Others" resolved to "the open-source tools" (line 18, wiki interpretation); sledgehammer bullet merges the video's solo-weekend-project cost rationale (line 19); Clarke recommendation (lede) is sourced from a raw file not listed in this page's `sources:`. Fix: normalize spelling/attributions on next marginal edit to the page. | warning |
| 2026-09-16 | harness-tax.md (raw: harnesstax-how-much-does-the-harness-matter-for-coding-agents.md) | Figures 1–4 of the HarnessTax study are interactive widgets whose extracted text is garbled in the raw artifact; only prose-stated statistics are citable. Per-model cost/success values appearing only inside figure widget text (e.g. the full 21-pair Pareto data, Figure 3 context statistics) are unverifiable from raw/. Fix: when the authors' promised profiling-trace release lands, re-verify figure-level numbers cited on harness-tax.md, pi.md, claude-code.md, and the two thread pages. | warning |

## Audit History

| Date | Auditor | Scope | Resolved Rows |
|------|---------|-------|---------------|
| 2026-07-20 | Devin | Migration schema commit | Created registry; seeded archived ingest-notes row |
| 2026-07-22 | MiMo | Full audit | Resolved 2 warning rows: MemRefine ingest-note (all 5 recommended updates verified in wiki), validate-page contract drift (fixed in 6c3771a). Registry clean. |
| 2026-09-12 | ZCode | Health report + debt resolution | Found schema drift: ingest 6cdb4be (2026-07-26) rewrote the Current Debt header without the Severity column, so the validator counted 0 debt across five subsequent filings. Restored the schema, re-tagged the 4 open rows as warning; validate-page now asserts the header. Tracked as AG-013. |
