---
title: Technical Debt Registry
created: 2026-07-20
updated: 2026-07-20
last_audit: 2026-07-20
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

| Date | Page | Issue | Severity |
|------|------|-------|----------|
| 2026-07-20 | `archive/ingest-notes/2026-06-18-memrefine-phase2.md` | Archived Phase 2 MemRefine theory summary. Verify its recommended updates (post-construction memory compression in `harness-mechanisms`, store-level compression axis in `evolving-context`, `executable-memory`/`memrefine` cross-link, `llm-guided-compression` judge-reliability ceiling, `storage-budgeted-memory` query-aware compression question) are reflected in the relevant thread/concept pages; integrate or resolve. | warning |
| 2026-07-20 | `scripts/validate-page` / `meta/tech-debt.md` | Debt status contract drift: `validate-page` never emitted a `STATUS:` line, and the `OVER_BUDGET` axis (registry-driven budget) was unimplemented — the registry's machine-readable contract (status values + "exit code and status line always agree") was false. Fix: emit `STATUS:` line, read `warning_budget`/`critical_blocks` from this file's frontmatter, evaluate `OVER_BUDGET` in full-repo mode. | warning |

## Audit History

| Date | Auditor | Scope | Resolved Rows |
|------|---------|-------|---------------|
| 2026-07-20 | Devin | Migration schema commit | Created registry; seeded archived ingest-notes row |
