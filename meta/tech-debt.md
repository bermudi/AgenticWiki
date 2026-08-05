---
title: Technical Debt Registry
created: 2026-07-20
updated: 2026-08-05
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

| Page | Debt | Resolution | Date |
|------|------|------------|------|
| the-verifiability-thesis.md | Extension callout ("widens over time") extrapolates beyond Schillings' source material | Verify against future sources or soften to "may widen" | 2026-07-27 |
| discourse-slop.md | Slop Family table lists 5 categories (code, information, benchmark, spec, discourse); the-slop-problem now enumerates 7 (adds skill slop + foundation-layer) — cross-page ordinal mismatch: "sixth category" in the thread reads as "fifth" against the table | Align the table with the thread's 7-category enumeration (add skill slop and foundation-layer rows) | 2026-08-05 |

## Audit History

| Date | Auditor | Scope | Resolved Rows |
|------|---------|-------|---------------|
| 2026-07-20 | Devin | Migration schema commit | Created registry; seeded archived ingest-notes row |
| 2026-07-22 | MiMo | Full audit | Resolved 2 warning rows: MemRefine ingest-note (all 5 recommended updates verified in wiki), validate-page contract drift (fixed in 6c3771a). Registry clean. |
