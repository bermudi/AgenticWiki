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

Detailed operational procedures for wiki operations: ingest, query, and lint.

For wiki structure and conventions, see `AGENTS.md` in the project root.

## Ingest

Processing a new source into the wiki. **Two-phase operation: filing, then analysis.**

### Phase 1: Filing

The mechanical work of extracting knowledge from the source and filing it into the wiki.

#### Step 1: Read and understand the source

1. Read the source file from `raw/` (or process inline content the user shared)
2. Identify: key entities (people, orgs, projects), key concepts, key claims
3. Read existing thread pages to understand the wiki's accumulated theory
4. Discuss the source with the user — highlight what you found interesting, ask about emphasis

#### Step 2: Create/update wiki pages

Work through this checklist:

- [ ] **Source stub**: If YouTube video, create `raw/yt-<descriptive-slug>.md` (see AGENTS.md for format)
- [ ] **Source page**: Create `wiki/src/<source-name>.md` with full summary and key takeaways
- [ ] **Entity pages**: Create or update a page for each significant entity mentioned
- [ ] **Concept pages**: Create or update a page for each significant concept. Add `## Thread` section linking to relevant threads. Connect to related concepts via `## Related`
- [ ] **Thread updates**: Update existing thread pages to incorporate new concepts and claims. If the source introduces a coherent argument that doesn't fit any existing thread, propose a new thread to the human
- [ ] **Bidirectional cross-refs**: For each new page, edit at least 2-3 **existing** pages to add backlinks in their `## Related` sections. New→old AND old→new.
- [ ] **Index**: Add all new pages to `wiki/index.md` under the correct category.

#### Step 3: Present filing summary to the human

Show what was created and updated. **Do NOT commit yet.**

Then read [the analytical pass instructions](references/analytical-pass.md) and complete Phase 2 before committing.

### Phase 2: Analysis

After filing is complete, load [analytical-pass.md](references/analytical-pass.md) and follow those instructions. This is a separate cognitive pass — you re-read existing wiki pages critically to find contradictions, departures, and gaps.

**Do not skip Phase 2.** It is not optional.

### Batch ingest

If processing multiple sources, complete both phases per source. Batch index updates — update `index.md` once at the end.

## Query

Answering questions using wiki knowledge.

### Step 1: Search the wiki

1. Read `wiki/index.md` to find relevant threads and pages
2. Read the relevant **thread pages** first — they provide the narrative context and show how concepts connect
3. Drill into individual concept and source pages as needed
4. If pages link to other pages that seem relevant, follow the links
5. Check recent git history for activity that might be relevant

### Step 2: Synthesize an answer

- Cite wiki pages using `[[page-name]]` links
- If the answer requires information not in the wiki, say so explicitly: "The wiki doesn't cover X yet"
- Suggest sources that could fill the gap if you can

### Step 3: File valuable outputs

If the answer is substantial (a comparison, an analysis, a connection discovered), offer to create a wiki page for it:

- [ ] Create the page following standard format
- [ ] Add to `wiki/index.md` under the correct category (threads, concepts, etc.)
- [ ] Add `## Related` links from existing pages
- [ ] If it traces a theme across sources, create it as a thread page under `wiki/threads/`

The user may decline — that's fine. But always offer.

## Lint

Health-checking the wiki. Run when asked, or when you notice issues during other operations.

### Checklist

Work through each item and report findings:

- [ ] **Broken links**: Check all `[[wiki-links]]` resolve to existing pages
- [ ] **Orphan pages**: Pages with no inbound links from other wiki pages (check index — every page should be linked from at least one other page besides index)
- [ ] **Missing pages**: Concepts or entities mentioned across multiple pages but without their own page
- [ ] **Thread coverage**: Every concept referenced in a thread's `## Concepts in this thread` section must have a `## Thread` section linking back. Check both directions.
- [ ] **Contradictions**: Claims on different pages that disagree
- [ ] **Stale claims**: Information that has been superseded by newer sources (check the `updated` dates and source timelines)
- [ ] **Thin pages**: Pages with only a few sentences that could be merged or expanded
- [ ] **Missing frontmatter**: Pages without proper frontmatter (title, created, updated, sources, tags)
- [ ] **Index accuracy**: Every page in the wiki directory is listed in `index.md`, and every entry in `index.md` points to an existing page

### How to check

```bash
# List all wiki pages
find wiki/ -name "*.md" ! -name "index.md" | sort

# Check for wiki-links that don't resolve (searches subdirectories)
grep -roh '\[\[[a-z0-9-]*\]\]' wiki/ | sort -u | while read link; do
  clean="${link//[[/}"; clean="${clean//]]/}"
  found=$(find wiki/ -name "${clean}.md")
  [ -z "$found" ] && echo "BROKEN: $link"
done

# Check thread↔concept bidirectional links
echo '=== Concepts missing Thread section (but linked from a thread) ==='
grep -roh '\[\[[a-z0-9-]*\]\]' wiki/threads/ | sort -u | while read link; do
  clean="${link//[[/}"; clean="${clean//]]/}"
  if [ -f "wiki/concepts/${clean}.md" ]; then
    grep -q "## Thread" "wiki/concepts/${clean}.md" || echo "  MISSING: ${clean} has no ## Thread section"
  fi
done

echo '=== Threads referenced from concepts but not found ==='
grep -rh 'Thread' wiki/concepts/ | grep -oP '\[\[([a-z0-9-]+)\]\]' | sort -u | while read link; do
  clean="${link//[[/}"; clean="${clean//]]/}"
  [ ! -f "wiki/threads/${clean}.md" ] && echo "  MISSING: thread ${clean} does not exist"
done
```

### Report and fix

1. Report findings as a structured list
2. Fix what you can (broken links, missing frontmatter, index drift)
3. For judgment calls (merges, reorganizations, contradiction resolutions), propose changes and ask the user
4. Suggest new pages to create and new sources to look for
5. Commit fixes with a descriptive message

## Gotchas

- **Wiki-links don't include `.md`**: Use `[[page-name]]`, not `[[page-name.md]]`
- **Source pages go in `wiki/src/`**: Not in `raw/`. `raw/` is immutable originals. `wiki/src/` is your processed summaries of those originals.
- **One source can touch many pages**: A single YouTube video about distributed systems might update pages on consistency models, a specific engineer, a specific paper, and the overview. That's expected. The value is in the cross-referencing.
- **Don't over-split**: A page should cover one coherent topic. If it's getting long (>200 lines), consider splitting. If it's under 10 lines, consider merging into a related page.
- **Dates in frontmatter are ISO 8601**: `YYYY-MM-DD`. No exceptions.
- **YouTube videos need a source stub**: After processing a YouTube video, create a `raw/yt-<slug>.md` stub with key points extracted during ingest. This is the only case where you write to `raw/`. Without the stub, future sessions can't re-read the source.
