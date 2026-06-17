# Editor Reference

Specialized subagents for wiki quality. Each owns a narrow beat — invoke them via `delegate` when their domain is relevant. All editors except Theory inherit project context and the wiki-ops skill. Theory-editor gets fresh context to avoid anchoring on the editing pass.

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

## Theory Editor — Deep Dive

The theory editor is the wiki's cross-thread intelligence layer. It doesn't check mechanical correctness — it reasons about the theory as a whole.

**Beat:**
- **Thread thesis support**: Does each thread's thesis still hold given all accumulated sources? Or has evidence shifted?
- **Cross-thread tensions**: Do threads contradict each other? Are there claims on one thread that undermine another?
- **Unfalsifiable arguments**: Has a thread hardened into unfalsifiable territory — claims that can't be disproven because they're too vague or too broad?
- **Emerging thread candidates**: Are there concepts or claims accumulating across multiple pages that don't belong to any existing thread?
- **Coverage gaps**: Are there important ideas with multiple sources but no thread to synthesize them?

**When to invoke:**
- After temporal-editor surfaces stale or drifting pages (chained)
- When the wiki has accumulated several new sources and you suspect the theory needs re-grounding
- When you notice concepts that seem related but aren't linked to any common thread

**Output:** A structured report with: thread health assessments, cross-thread tension map, emerging theme candidates, and recommended actions (merge threads, split threads, create new threads, update thread theses).
