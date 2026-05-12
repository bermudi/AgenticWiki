# Ingest Flow

> Procedural reference for the ingest pipeline. For the design principles behind these steps — how to think about sources, theory pressure, and thread emergence — see [`ingest-philosophy.md`](ingest-philosophy.md).

## Pipeline

```
Step 0: Triage (GATE)  →  Phase 1: Filing  →  Phase 2: Analysis  →  Phase 3: Verification  →  Commit
                             (editing)            (critical re-read)      (separate audit)
```

## Step 0: Relevance Triage (GATE)

**Who:** Main agent. **When:** After reading the source, before any wiki editing.

This step exists because not every source the human hands you is worth a full three-phase ingest. Some are product demos, some are surface-level rehashes, some are parallel interests that don't intersect with the wiki's theory. The default should be to protect the wiki from dilution — the human can always override upward.

### Procedure

1. Read the source fully.
2. Map it against the existing wiki: which threads does it touch? What pages exist already that cover this ground?
3. Classify into one of three outcomes:

| Outcome | Signal |
|---|---|
| **Full ingest** | Introduces a genuinely new idea, framework, or empirical result. Would create at least one new page that stands on its own (>10 lines of substantive content). Connects to existing threads. |
| **Marginal** | Adds useful color or anecdotes to existing pages but doesn't warrant new pages. A few sentences of source-backed context on 1-2 existing pages. |
| **Skip** | Product demo, surface-level summary, rehash of known territory, or entirely outside the wiki's domain. |

4. Present the triage to the human:
   - What the source is (1 sentence)
   - Where it fits (which existing threads/pages)
   - Your recommendation and why
   - What you'd do for each outcome (concrete scope)
5. Wait for approval. Do not proceed until the human says go.

### Marginal outcome procedure

If the human approves marginal:

1. Add `raw/<filename>` to the `sources` frontmatter of the target page(s)
2. Add an entry in the `## Sources` section annotating what the source contributed
3. Add a sentence or short paragraph to the body citing the source where it fits
4. Update the `updated` date
5. **Increment the `unaudited_marginal` counter** in frontmatter (add it if not present, starting at 1)
6. If `unaudited_marginal >= 5`, warn the human that this page has accumulated enough marginal ingests to warrant a verification audit
7. Commit with message: `ingest (marginal): <source title> — folded into <page-names>`

No new pages. No editors. No Phase 2 or 3. This is a lightweight operation.

### Marginal audit

Pages that accumulate 5+ marginal ingests without a verification pass carry unaudited claims. When `unaudited_marginal >= 5`:

1. Run `source-verifier` on the page (re-reads all `raw/` sources, checks all claims)
2. Fix any issues surfaced
3. Reset `unaudited_marginal` to 0 in frontmatter
4. Commit with message: `audit: <page-name> — source verification after N marginal ingests`

A full ingest that touches the page also resets the counter to 0 (Phase 3 verification already ran).

### Skip outcome

File stays in `raw/` as archive. No wiki changes. Done.

## Phase 1 — Filing (main agent + 3 editors)

**Who:** Main agent orchestrates, subagent editors auto-fix.

1. Read source, identify entities/concepts/claims
2. Determine thread fit (strengthen/contradict/new thread?)
3. Create/update pages. For **each** page created or updated:
   - Populate YAML frontmatter: `title`, `created` (new pages only), `updated` (always), `sources` (list of `raw/` filenames), `tags`
   - Write the blockquote summary (1-3 sentences immediately after the `# Title` heading)
   - For concept pages: add `## Thread` section linking to relevant threads
   - For thread pages: cross-references live in body wiki-links, no separate link section needed
   - Add `## Related` section (concept/author/project pages) with links to 2-3 existing pages
   - Add `## Sources` section with annotated entries (must match frontmatter `sources` list)
   - Update `wiki/index.md` with any new pages

   **Batch your edits.** Use the `edit` tool's `edits[]` array to make multiple changes to the same file in one call. A file needing a frontmatter fix, a new paragraph, and a source entry = one `edit` call with three entries in `edits[]`, not three separate calls. Files that don't share changes can be done in parallel calls, but never make sequential single-change calls to the same file.

   **Don't re-read what you just wrote.** After editing pages, you already know their content. Move directly to editors — they will re-read every page independently. Re-reading before invoking editors adds latency with zero additional signal.
4. Run editors in **parallel** via `delegate`. Scope each editor to recently changed/created pages only. The three editors are independent — structural checks frontmatter/links, link checks cross-references, content checks summaries. They can run simultaneously:

   ```
   delegate({
     tasks: [
       {
         prompt: "Check and fix structural integrity of recently changed wiki pages. Focus on: frontmatter completeness (title, created, updated, sources, tags), broken wiki-links, index accuracy, orphan detection. Only process pages changed in this ingest."
         agent: "structural-editor"
       },
       {
         prompt: "Check and fix cross-reference integrity of recently changed wiki pages. Focus on: bidirectional links, thread↔concept coverage, Related section completeness, dangling references. Only process pages changed in this ingest."
         agent: "link-editor"
       },
       {
         prompt: "Review substantive quality of recently changed wiki pages. Focus on: summary blockquote exists and is 1-3 sentences, section completeness (Thread, Related, Sources), thin page detection, content-structure alignment. Only process pages changed in this ingest."
         agent: "content-editor"
       }
     ]
   })
   ```

   Read all editor reports. Fix any issues surfaced before proceeding to Step 5.
5. Filing summary → human. Do NOT commit.

## Phase 2 — Analysis (main agent only)

**Who:** Main agent, switching to critical mode.

- Re-read every thread page
- Check: contradictions, departures, tensions, panorama-level reframes
- Present theory summary: what gained support, what took a hit, and recommended theory action

## Phase 3 — Verification (separate agents, separate sessions)

**Why:** LLMs silently corrupt documents during delegated editing (DELEGATE-52). Verification as a separate judgment pass is ~95% reliable even when editing chains degrade.

**Who:** Main agent orchestrates; `source-verifier` + editors run in fresh sessions.

1. **Diff auditor** (bash, no LLM) — catch deletions >20%, summary drift, source section changes
2. **Source-verifier subagents** (parallel, one per changed page) — check against `raw/` sources:
   - Hallucinations (claims absent from source)
   - Omissions (key source insights missing)
   - Misattributions (wrong person/source credited)
   - Summary accuracy (blockquote matches page + sources)
3. **Mechanical re-check** — structural-editor + link-editor on changed files
4. Aggregate → report to human with severity (🚨 CRITICAL / ⚠️ WARNING / ℹ️ INFO)
5. Fix CRITICAL → re-verify → commit

## Agents

| Agent | Role | Tools |
|---|---|---|
| main agent | Orchestrate filing, analysis, verification | all |
| structural-editor | Frontmatter, links, index, orphans | read, edit, write, bash |
| link-editor | Bidirectional refs, thread↔concept | read, edit, write, bash |
| content-editor | Summaries, thin pages, contradictions | read, edit, write, bash |
| source-verifier | Source fidelity (read-only) | read, bash |

## Key architectural rule

**Editing and verification must never be the same session.**

The source-verifier never inherits the editing agent's context. It gets: the wiki page (final state) + `raw/` sources (immutable) + one instruction. This is the pattern DELEGATE-52 shows is reliable — single-turn judgment at RS@2 scores ~95% even for weaker models.

## Commit criteria

- [ ] All 3 phases complete
- [ ] No 🚨 CRITICAL findings unresolved
- [ ] Human approved theory summary (Phase 2) AND verification report (Phase 3)
- [ ] All CRITICAL fixes re-verified
