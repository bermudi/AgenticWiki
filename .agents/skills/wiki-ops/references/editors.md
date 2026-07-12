# Editor Reference

Specialized subagents for wiki quality. Keep the active set small: mechanical editors fix safe invariants, while the theory editor handles high-judgment semantic health and compression.

| Editor | Agent | Beat | When to invoke |
|---|---|---|---|
| Structural | `structural-editor` | Copy desk — frontmatter, source-list sync, index accuracy, orphan pages | Post-ingest verification, periodic lint |
| Link | `link-editor` | Weaver — bidirectional links, thread↔concept coverage, dangling refs | Post-ingest verification, when cross-references feel sparse |
| Source Verifier | `source-verifier` | Fact-checker — hallucinations, omissions, misattributions (read-only) | Post-ingest verification, when fidelity is uncertain |
| Theory | `theory-editor` | Semantic health — page quality, thread coherence, temporal drift, contradiction pressure, ontology compression | Periodic deep audit, after several ingests, or when the theory feels bloated |

Retired compatibility shims:

| Retired agent | Replacement |
|---|---|
| `temporal-editor` | `theory-editor` |

Do not add more high-judgment editors unless the existing `theory-editor` becomes too broad to produce useful reports. The wiki's risk is not lack of editors; it is editors preserving every distinction they notice.

## Mechanical Editors

Run `structural-editor` and `link-editor` after filing and during lint. They are narrow, safe, and allowed to fix directly.

- `structural-editor`: frontmatter, source-list sync, broken wiki-links, index accuracy, orphan detection
- `link-editor`: bidirectional refs, `## Related`, thread↔concept links, dangling mentions

## Theory Editor — Deep Semantic Pass

The theory editor is the wiki's compression and coherence layer. It replaces the old content and temporal passes.

**Beat:**
- **Page quality and scope fit**: thin pages, summary/body mismatch, stale sections, over-broad pages
- **Thread coherence**: thesis support, cross-thread tensions, unfalsifiable arguments, thread rewrites
- **Temporal drift**: stale pages, contradiction aging, evolution narratives from git history
- **Ontology compression**: merge candidates, demote-to-section candidates, split candidates, category drift
- **Theory gaps**: missing concepts or threads that would reduce repeated prose or connect accumulated evidence

**When to invoke:**
- After several ingests have accumulated
- When `index.md` or concept pages feel bloated
- When a thread has absorbed multiple departures/contradictions
- When the user asks for wiki health beyond mechanical validation
- On a monthly-ish cadence if the wiki is actively growing

**Output:** A structured report with: thread coherence, page quality/scope issues, temporal drift, ontology compression proposals, theory gaps, direct safe fixes made, and clean areas.

## Retired Editors

`temporal-editor` remains as a compatibility shim so old references fail softly. It should not be invoked for new work.
