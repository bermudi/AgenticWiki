---
name: wiki-ops
description: |
  Operate on the personal LLM wiki — ingest new sources, query existing knowledge,
  and run lint/health checks. Use when the user wants to process a new source (article,
  paper, YouTube video, podcast notes), asks a question about accumulated knowledge,
  wants to explore connections between topics, asks to check wiki health, or mentions
  "ingest", "add source", "process this", "lint the wiki", "wiki health", or "update the wiki".
---

# Wiki Operations

Three operations: ingest new sources, query accumulated knowledge, and lint the wiki.

For wiki structure and invariants, see `AGENTS.md` in the project root.
For page formats, naming, and source templates, see `meta/wiki-conventions.md`.
For ingest philosophy and theory principles, see `references/ingest-philosophy.md`.
For editor descriptions and invocation patterns, see `references/editors.md`.

## Mission Context

This wiki is a collection of unproven suggestions about disciplined AI-assisted development. When you ingest a source, you're adding hypotheses to a living theory — not canonizing truth. Flag contradictions loudly. Surface uncertainty. Track what people are saying and how ideas connect. Don't declare winners.

For the full design principles, see `references/ingest-philosophy.md`.

## Ingest

Processing a new source into the wiki. Three phases, each gated — don't skip ahead.

```
Pre-step: Source Acquisition → Step 0: Triage (GATE) → Phase 1: Filing → Phase 2: Analysis → Phase 3: Verification → Commit
```

Progress checklist:

- [ ] Source acquired in `raw/` (pre-step)
- [ ] Triage approved by human (step 0)
- [ ] Filing summary presented to human (phase 1)
- [ ] Theory summary presented to human (phase 2)
- [ ] Verification passed — no CRITICAL findings (phase 3)
- [ ] Committed

### Pre-step: Source Acquisition

Get the source into `raw/` before anything else. A source not in `raw/` is invisible to future sessions. Follow the detailed procedure in [ingest-flow.md](references/ingest-flow.md), "Pre-step: Source Acquisition."

Three cases: local file path (slugify and `mv` to `raw/`), URL (fetch with web-content skill, save to `raw/`), or already in `raw/` (skip). After acquisition, confirm the file arrived (`ls raw/`).

### Step 0: Relevance Triage (GATE)

**Before any wiki editing begins**, read the source and evaluate whether it's worth ingesting. Follow the detailed procedure in [ingest-flow.md](references/ingest-flow.md), "Step 0: Relevance Triage."

Three outcomes:

- **Full ingest** — New idea, framework, or empirical result. Would create at least one page that stands on its own. Proceed to Phase 1.
- **Marginal** — Adds color to existing pages but no new pages warranted. Fold into 1-2 existing pages, increment `unaudited_marginal`, commit. Done.
- **Skip** — Product demo, surface-level rehash, or outside the wiki's domain. File stays in `raw/` as archive. Done.

Be opinionated. The default is to protect the wiki from dilution — the human can always override.

### Phase 1: Filing

Extract knowledge from the source and file it into the wiki. Read [ingest-flow.md](references/ingest-flow.md), "Phase 1 — Filing" for the full procedure: creating/updating pages with proper frontmatter, summaries, sections, and cross-references; running the three editors (structural, link, content) in parallel; and presenting the filing summary.

**Do NOT commit.** After the filing summary is approved, proceed to Phase 2.

### Phase 2: Analysis

Switch to critical mode. Re-read every thread page — not just the ones you touched — and ask: does this source support, contradict, or depart from each thread's thesis? Then re-read related concept pages for the same questions. Classify any theory pressure by scope (local callout, thread tension, or panorama reframe).

The output is a **theory summary** presented to the human: which threads gained support, which took a hit, what contradictions and departures were found, and what theory action is recommended. This summary gates Phase 3.

Load [analytical-pass.md](references/analytical-pass.md) for the full procedure, including epistemic callout formats.

**Do not skip Phase 2.** It is not optional.

### Phase 3: Verification

Audit the ingest for errors before they become permanent. LLMs silently corrupt documents during delegated editing — verification as a separate judgment pass is architecturally more reliable than self-review.

The phase runs four checks: mechanical diff audit (bash), semantic diff reasoning (delegate), source verification (parallel delegates), and a final mechanical re-check. Report findings with severity (CRITICAL / WARNING / INFO). Fix CRITICALs, re-verify, then commit.

Load [verification-pass.md](references/verification-pass.md) for the full procedure.

**Do not skip Phase 3.** It is not optional.

### Batch ingest

If processing multiple sources, complete all three phases per source. Batch index updates — update `index.md` once at the end, not after each page. This avoids merge conflicts and keeps the index coherent.

## Query

Answering questions using wiki knowledge.

### Step 1: Search

1. Read `wiki/index.md` — it's the content catalog organized by threads, concepts, authors, and projects
2. Start with **thread pages** — they provide narrative context and show how concepts connect
3. Drill into individual concept/author/project pages as threads lead you
4. Follow `## Related` links when a page references something relevant
5. Check recent `git log` for activity that might be relevant

### Step 2: Synthesize

- Cite wiki pages using `[[page-name]]` links with a brief note on the relationship
- If the wiki doesn't cover the topic, say so explicitly: "The wiki doesn't cover X yet"
- Suggest sources that could fill the gap

### Step 3: File valuable outputs

If the answer is substantial (a comparison, an analysis, a connection not yet in the wiki), offer to create a wiki page for it:

- [ ] Create the page following standard format (see `meta/wiki-conventions.md`)
- [ ] Add to `wiki/index.md` under the correct category
- [ ] Add `## Related` links from 2-3 existing pages
- [ ] If it traces a theme across sources, create it as a thread page under `wiki/threads/`

The user may decline — that's fine. But always offer.

## Lint

Health-checking the wiki. Run when asked, or when you notice issues during other operations.

### Checklist

- [ ] **Broken links**: All `[[wiki-links]]` resolve to existing pages
- [ ] **Orphan pages**: Every page is linked from at least one other page besides index
- [ ] **Missing pages**: Concepts/entities mentioned across multiple pages but without their own page
- [ ] **Thread coverage**: Concept pages that discuss a thread have a `## Thread` section linking back
- [ ] **Contradictions**: Claims on different pages that disagree
- [ ] **Stale claims**: Information superseded by newer sources (check `updated` dates and source timelines)
- [ ] **Thin pages**: Pages under 10 lines that could be merged or expanded
- [ ] **Missing frontmatter**: Pages without title, created, updated, sources, tags
- [ ] **Raw provenance**: Every `raw/*.md` carries provenance frontmatter (`type`/`url`/`arxiv_id`); arXiv sources use `<arxiv-id>.md` filenames. `./scripts/validate-page` now checks `raw/` too.
- [ ] **Index accuracy**: Every wiki page is in `index.md`; every `index.md` entry points to an existing page
- [ ] **Unaudited marginal accumulation**: Pages where `unaudited_marginal >= 5` need a source verification audit

### How to check

Run the unified validator first:

```bash
./scripts/validate-page      # Frontmatter, links, sources, structure, orphans — now incl. raw/ provenance
./scripts/validate-page wiki/concepts/some-page.md  # Single page
```

Then do judgment checks yourself. Thread↔concept bidirectional coverage can be partially checked mechanically:

```bash
echo '=== Concepts missing Thread section ==='
for f in wiki/concepts/*.md; do
  name=$(basename "$f" .md)
  if ! grep -q "## Thread" "$f"; then
    if grep -rq "\[\[${name}\]\]" wiki/threads/; then
      echo "  MISSING: ${name} is linked from a thread but has no ## Thread section"
    fi
  fi
done

echo '=== Pages needing marginal audit (unaudited_marginal >= 5) ==='
for f in $(find wiki/ -name '*.md' ! -name 'index.md'); do
  count=$(grep -oP '^unaudited_marginal: \K\d+' "$f" 2>/dev/null || echo 0)
  [ "$count" -ge 5 ] && echo "  AUDIT NEEDED: $f (unaudited_marginal: $count)"
done
```

Contradictions, stale claims, and thin pages require human judgment — read and reason.

### Report and fix

1. Report findings as a structured list
2. Fix what you can (broken links, missing frontmatter, index drift)
3. For judgment calls (merges, reorganizations, contradiction resolutions), propose and ask
4. Suggest new pages and new sources
5. Commit fixes with a descriptive message

## Gotchas

- **Source-anchored claims only**: Every factual claim must be supported by a source in the page's frontmatter. Synthesis and cross-page connections are fine — but specific factual assertions need a source. The verification pass will flag unsourced claims as hallucinations.
- **One source can touch many pages**: A single video about distributed systems might update pages on consistency models, a specific engineer, a specific paper, and the overview. The value is in the cross-referencing.
- **Don't over-split**: One coherent topic per page. >200 lines → consider splitting. <10 lines → consider merging.
- **Dates are ISO 8601**: `YYYY-MM-DD`. No exceptions.
- **YouTube inline content needs a stub**: When video content arrives via an extension with no file on disk, create `raw/yt-<slug>.md` with key points. If a transcript file already exists in `raw/`, it IS the source — don't create a stub.

## Reference files

| Read when you need... | File |
|---|---|
| The full ingest pipeline: triage, filing, analysis, verification, commit | `references/ingest-flow.md` |
| How to think about sources, theory pressure, thread emergence | `references/ingest-philosophy.md` |
| Phase 2 critical analysis: contradictions, departures, tensions | `references/analytical-pass.md` |
| Phase 3 verification: diff auditor, source-verifier, mechanical re-check | `references/verification-pass.md` |
| Subagent editor descriptions and invocation patterns | `references/editors.md` |
| Page formats, frontmatter spec, web/YouTube source templates | `meta/wiki-conventions.md` |
