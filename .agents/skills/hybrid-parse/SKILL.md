---
name: hybrid-parse
description: >
  Two-pass PDF parsing: fast local extraction with liteparse first, then cloud-backed
  LlamaParse fallback for pages that parse poorly (tables, figures, complex layouts).
  Use when parsing complex PDFs where liteparse alone may produce garbled output on some
  pages, when the user wants maximum extraction accuracy, or when they mention
  "hybrid parse", "two-pass parse", "liteparse with fallback", "re-parse bad pages",
  or "fix garbled pages". Not for simple text-native PDFs — use liteparse directly for those.
compatibility: Requires lit CLI globally available. LlamaParse reparse step requires
  LLAMA_CLOUD_API_KEY env var. Node 18+ (uses built-in fetch, FormData).
---

# Hybrid Parse

Two-pass PDF extraction: liteparse for speed, LlamaParse for troubled pages. The agent judges
page quality; the script handles all mechanical work.

## Workflow

- [ ] Step 1: Prepare — liteparse the PDF, split into per-page files, screenshot all pages
- [ ] Step 2: Score — read each page, write bad page numbers to `bad-pages.txt`
- [ ] Step 3: Reparse — send flagged pages to LlamaParse (skip if all pages are good)
- [ ] Step 4: Merge — combine good liteparse pages + LlamaParse replacements

All steps use the same script:
```
.agents/skills/hybrid-parse/scripts/pdf-hybrid.mjs
```

## Step 1: Prepare

```bash
node .agents/skills/hybrid-parse/scripts/pdf-hybrid.mjs prepare <pdf-path>
```

Options:
- `--ocr` — enable Tesseract OCR (default: `--no-ocr` for speed; use this for scanned PDFs)
- `--dpi <n>` — rendering DPI (default: 150; use 300 for better screenshot quality)

The script prints the workspace path. Inside the workspace:

```
workspace/
├── full.json              # Raw liteparse JSON output
├── manifest.json          # Per-page stats (chars, words, lines)
├── pages/
│   ├── page_01.txt        # Per-page text from liteparse
│   ├── page_02.txt
│   └── ...
└── screenshots/
    ├── page_01.png        # Page screenshots for visual inspection
    ├── page_02.png
    └── ...
```

## Step 2: Score

Read `manifest.json` first to spot outliers — unusually short pages, very low word count
relative to neighbors. Then read those pages' text files to confirm.

**What makes a page "bad":**
- Garbled text (random characters, broken words, nonsensical concatenation)
- Tables rendered as jumbled text where columns are mashed together
- Multi-column layouts where columns appear interleaved rather than sequential
- Missing content — the screenshot shows body text but the text file has only a few lines
- Figure-heavy pages where captions or callouts are lost

> A short page with a clean figure caption is fine. A dense-looking page with 3 lines is busted.

If uncertain, compare the text file against the screenshot:
```
read workspace/screenshots/page_07.png
```

Once you've identified bad pages, write them to `workspace/bad-pages.txt`, one per line:
```
3
7
12
```

If all pages look good, skip to Step 4 (merge). The script will use liteparse output for
every page without needing LlamaParse.

## Step 3: Reparse

```bash
node .agents/skills/hybrid-parse/scripts/pdf-hybrid.mjs reparse <pdf-path> <workspace-path>
```

Reads `workspace/bad-pages.txt`, uploads the PDF to LlamaParse (agentic_plus tier), and
extracts per-page markdown for the flagged pages into `workspace/llamaparse-pages/`.

**Prerequisites for this step:**
- `LLAMA_CLOUD_API_KEY` must be set in the environment
- No npm packages required beyond `lit` — uses Node's built-in `fetch` for the API

Override the API base URL with `LLAMA_CLOUD_BASE_URL` if needed.

The script polls until LlamaParse completes (may take 30–120 seconds depending on
document size). Progress is printed to stderr.

On completion, `workspace/llamaparse-pages/` contains:
```
llamaparse-pages/
├── page_03.md
├── page_07.md
└── page_12.md
```

If LlamaParse fails or times out, the script exits with a non-zero code and prints the
error. The merge step will still work — it simply won't have replacements for those pages.

> [!warning] Each reparse call uploads the full PDF to LlamaParse. You pay for the full
> document even if only a few pages are bad. Don't invoke this step unless there are
> genuinely problematic pages.

## Step 4: Merge

```bash
node .agents/skills/hybrid-parse/scripts/pdf-hybrid.mjs merge <workspace-path> [--output <file>]
```

For each page 1..N: uses the LlamaParse version if `llamaparse-pages/page_NN.md` exists,
otherwise uses the liteparse version from `pages/page_NN.txt`. Concatenates everything
into a single output file (or stdout if no `--output`).

Output includes page markers for traceability:
```
## Page 1
[liteparse text...]

## Page 3
[llamaparse markdown...]
```

## Step 5: Verify

Spot-check the output — especially the replaced pages. Read sections near page
boundaries to check for artifacts. If anything looks off, re-run from Step 2 with
adjusted bad page selections.

## Gotchas

- **liteparse page numbers may be null.** The prepare script assigns page numbers by
  array position (1-indexed). If liteparse merged or skipped pages, page counts won't
  match the original. Check `manifest.json` length against the PDF's actual page count.
- **LlamaParse costs money.** Only invoke Step 3 when there are pages that liteparse
  genuinely garbled. For text-native academic PDFs, liteparse with `--no-ocr` is often
  sufficient for all pages and the hybrid approach is unnecessary.
- **OCR vs. no-OCR.** The prepare script defaults to `--no-ocr` for speed. If the PDF is a
  scanned document (images, not embedded text), pass `--ocr` to the prepare command.
- **Large workshops.** Screenshots at 150 DPI are ~200KB per page. A 50-page PDF
  produces ~10MB of screenshots. Use `--dpi 72` for quick review of long documents.
