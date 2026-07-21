---
title: Technical Debt Registry
created: 2026-07-20
updated: 2026-07-20
last_audit: 2026-07-20
---

# Technical Debt Registry

Machine-readable registry of deferred wiki issues. Each row is a debt item that must be resolved by an audit.

## Status values

- `WITHIN_BUDGET` (exit 0): Clean to file.
- `ERRORS_FOUND` (exit 1): Mechanical errors (broken links, source desyncs, missing sections). Fix before filing.
- `OVER_BUDGET` (exit 1): Accumulated debt too high. Run audit before filing.

`./scripts/validate-page` exits 1 for `ERRORS_FOUND` and `OVER_BUDGET`; the exit code and status line always agree.

## Current Debt

| Date | Page | Issue | Severity |
|------|------|-------|----------|
| 2026-07-20 | `archive/ingest-notes/2026-06-18-memrefine-phase2.md` | Archived Phase 2 MemRefine theory summary. Verify its recommended updates (post-construction memory compression in `harness-mechanisms`, store-level compression axis in `evolving-context`, `executable-memory`/`memrefine` cross-link, `llm-guided-compression` judge-reliability ceiling, `storage-budgeted-memory` query-aware compression question) are reflected in the relevant thread/concept pages; integrate or resolve. | warning |

## Audit History

| Date | Auditor | Scope | Resolved Rows |
|------|---------|-------|---------------|
| 2026-07-20 | Devin | Migration schema commit | Created registry; seeded archived ingest-notes row |
