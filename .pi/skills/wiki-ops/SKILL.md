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

Detailed operational procedures for the three core wiki operations: ingest, query, and lint.

Read this skill when performing wiki maintenance tasks. For wiki structure and conventions, see `AGENTS.md` in the project root.

## Ingest

Processing a new source into the wiki. The core operation.

### Step 1: Read and understand the source

1. Read the source file from `raw/` (or process inline content the user shared)
2. Identify: key entities (people, orgs, projects), key concepts, key claims, relationships to existing wiki pages
3. **Read existing threads.** Before creating anything, read the current thread pages to understand the wiki's accumulated theory. Identify where the new source fits, reinforces, or contradicts.
4. Discuss the source with the user — highlight what you found interesting, flag contradictions with existing threads, ask about emphasis

### Step 2: Create/update wiki pages

For each ingest, you will typically touch 5-15 pages. Work through this checklist:

- [ ] **Source file**: If the source is a YouTube video, create `raw/yt-<descriptive-slug>.md` first — a metadata stub with key points extracted during processing. This is the durable record (see AGENTS.md for format)
- [ ] **Source page**: Create `wiki/src/<source-name>.md` with full summary and key takeaways
- [ ] **Entity pages**: Create or update a page for each significant entity mentioned. If updating, add new information and note how it relates to existing content
- [ ] **Concept pages**: Create or update a page for each significant concept. Connect to related concepts already in the wiki
- [ ] **Contradictions**: If the source contradicts existing wiki content, add a `> [!warning] Contradiction` callout on the relevant page **and** on the thread page. Surface the contradiction in your ingest summary so the human can decide which direction to take. Do not silently overwrite or reconcile.
- [ ] **Departures**: If a source takes a novel position that doesn't contradict but departs from the established theory (a new frame, a different emphasis, a dissenting view), note this explicitly in the thread page as a departure. Use a `> [!note] Departure` callout.
- [ ] **Cross-references**: Add `[[new-page]]` links to at least 2-3 existing pages' `## Related` sections
- [ ] **Threads**: After creating/updating concepts, update existing thread pages to incorporate new evidence or nuances from the source. If the source introduces a coherent argument that doesn't fit any existing thread, propose a new thread page to the human — explain how it relates to existing threads (supports, contradicts, extends).
- [ ] **Thread backlinks**: When adding a concept to a thread, add a `## Thread` section to the concept page linking to the thread. When a concept appears in multiple threads, list all of them.

### Step 3: Theory summary

Before finalizing, synthesize the impact on the wiki's accumulated theory:

- Which threads gained support? Which took a hit?
- Were any contradictions or departures introduced?
- Does the overall picture shift meaningfully?
- Are there emerging themes that might warrant a new thread?

Present this to the human as part of your ingest summary. **Don't just list what was added — tell them how the theory changed.**

### Step 4: Update index, log, and commit

- [ ] Add all new pages to `wiki/index.md` under the correct category
- [ ] Update one-line summaries for any pages that changed significantly
- [ ] Append an entry to `wiki/log.md` following the format:
  ```
  ## [YYYY-MM-DD] ingest | Source Title

  - Created: [[page-1]], [[page-2]]
  - Updated: [[page-3]], [[page-4]]
  - Sources: `raw/filename.md`
  - Notes: brief observations including contradictions/departures
  ```
- [ ] **Commit**: Stage and commit all changes with a descriptive message:
  ```bash
  git add -A
  git commit -m "ingest: <source title> — <brief summary>"
  ```
  Mention contradictions in the commit message if any were flagged.

### Batch ingest

If the user wants to process multiple sources at once, repeat the full checklist per source but batch the index and log updates — update `index.md` once at the end and write one log entry covering all sources.

## Query

Answering questions using wiki knowledge.

### Step 1: Search the wiki

1. Read `wiki/index.md` to find relevant threads and pages
2. Read the relevant **thread pages** first — they provide the narrative context and show how concepts connect
3. Drill into individual concept and source pages as needed
4. If pages link to other pages that seem relevant, follow the links
5. Check `wiki/log.md` (last 10 entries) for recent activity that might be relevant

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
- [ ] Append a `query` entry to `wiki/log.md`

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
- [ ] **Log recency**: Last log entry matches the most recent file modification in the wiki

### How to check

```bash
# List all wiki pages
find wiki/ -name "*.md" ! -name "index.md" ! -name "log.md" | sort

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
  grep -qL "Thread" "wiki/concepts/${clean}.md" 2>/dev/null && echo "  MISSING: ${clean} has no ## Thread section"
done

echo '=== Threads referenced from concepts but not found ==='
grep -rh 'Thread' wiki/concepts/ | grep -oP '\[\[([a-z0-9-]+)\]\]' | sort -u | while read link; do
  clean="${link//[[/}"; clean="${clean//]]/}"
  [ ! -f "wiki/threads/${clean}.md" ] && echo "  MISSING: thread ${clean} does not exist"
done

# Recent log entries
grep "^## \[" wiki/log.md | tail -10
```

### Report and fix

1. Report findings as a structured list
2. Fix what you can (broken links, missing frontmatter, index drift)
3. For judgment calls (merges, reorganizations, contradiction resolutions), propose changes and ask the user
4. Suggest new pages to create and new sources to look for
5. Append a `lint` entry to `wiki/log.md`

## Gotchas

- **Wiki-links don't include `.md`**: Use `[[page-name]]`, not `[[page-name.md]]`
- **Source pages go in `wiki/src/`**: Not in `raw/`. `raw/` is immutable originals. `wiki/src/` is your processed summaries of those originals.
- **One source can touch many pages**: A single YouTube video about distributed systems might update pages on consistency models, a specific engineer, a specific paper, and the overview. That's expected. The value is in the cross-referencing.
- **Don't over-split**: A page should cover one coherent topic. If it's getting long (>200 lines), consider splitting. If it's under 10 lines, consider merging into a related page.
- **Dates in frontmatter are ISO 8601**: `YYYY-MM-DD`. No exceptions.
- **YouTube videos need a source stub**: After processing a YouTube video, create a `raw/yt-<slug>.md` stub with key points extracted during ingest. This is the only case where you write to `raw/`. Without the stub, future sessions can't re-read the source.
