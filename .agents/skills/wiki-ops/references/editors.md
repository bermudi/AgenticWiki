# Editor Reference

Specialized subagents for wiki quality. Each owns a narrow beat — invoke them via `delegate` when their domain is relevant. All editors inherit project context and the wiki-ops skill.

| Editor | Agent | Beat | When to invoke |
|---|---|---|---|
| Structural | `structural-editor` | Copy desk — frontmatter, broken links, index accuracy, orphan pages | Post-ingest verification, periodic lint |
| Content | `content-editor` | Developmental editor — summary quality, thin pages, section completeness, contradictions | Post-ingest verification, when pages feel shallow |
| Link | `link-editor` | Weaver — bidirectional links, thread↔concept coverage, dangling refs | Post-ingest verification, when cross-references feel sparse |
| Source Verifier | `source-verifier` | Fact-checker — hallucinations, omissions, misattributions (read-only) | Post-ingest verification, when fidelity is uncertain |
| Temporal | `temporal-editor` | Diachronic guardian — stale pages, thread drift, contradiction aging, coverage gaps over git history | Weekly, surfaced via session nudge |
| Theory | `theory-editor` | Cross-thread theorist — thesis support, cross-thread tensions, unfalsifiable arguments, emerging thread candidates | Chained from temporal-editor; also invocable standalone |

All editors except Theory run during the wiki-ops lint phase. Theory-editor is triggered by temporal-editor after its own passes. You can also invoke editors individually for targeted checks.

## Temporal Editor — Session Nudge

The temporal editor runs on a weekly cadence, but there's no cron. Instead:

1. At session start, read `.agents/state/temporal-editor-last-run`.
2. If the date is 7+ days ago, suggest running `temporal-editor` via delegate.
3. If the user agrees, delegate to `temporal-editor`. It will update the state file on completion.
4. If the user declines or is mid-task, don't block — just note it.

Don't be pushy. One mention per session is enough.
