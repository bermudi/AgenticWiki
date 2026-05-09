#!/usr/bin/env node
// pdf-hybrid.mjs — Hybrid PDF parsing: liteparse + LlamaParse fallback
//
// Usage:
//   node pdf-hybrid.mjs prepare <pdf> [--ocr] [--dpi <n>]
//   node pdf-hybrid.mjs reparse <pdf> <workspace>
//   node pdf-hybrid.mjs merge <workspace> [--output <file>]

import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { execSync } from "node:child_process";
import path from "node:path";

const LLAMA_BASE =
  process.env.LLAMA_CLOUD_BASE_URL || "https://api.cloud.llamaindex.ai";

// ---------------------------------------------------------------------------
// CLI dispatch
// ---------------------------------------------------------------------------

function usage() {
  const me = path.basename(process.argv[1]);
  console.error(`Usage: ${me} <command> [args]

Commands:
  prepare <pdf>                 Parse with liteparse, split pages, screenshot
  reparse <pdf> <workspace>     Re-parse flagged pages with LlamaParse
  merge <workspace>             Merge good pages + LlamaParse replacements

Prepare options:
  --ocr               Enable Tesseract OCR (default: off)
  --dpi <n>           Rendering DPI (default: 150)

Merge options:
  --output <file>     Write to file instead of stdout
`);
  process.exit(1);
}

function parseFlags(args) {
  const flags = { dpi: "150" };
  const positional = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--ocr") {
      flags.ocr = true;
    } else if (args[i] === "--dpi" && args[i + 1]) {
      flags.dpi = args[++i];
    } else if (args[i] === "--output" && args[i + 1]) {
      flags.output = args[++i];
    } else if (!args[i].startsWith("--")) {
      positional.push(args[i]);
    }
  }
  return { flags, positional };
}

const command = process.argv[2];
if (!command) usage();

try {
  switch (command) {
    case "prepare":
      await cmdPrepare(process.argv.slice(3));
      break;
    case "reparse":
      await cmdReparse(process.argv.slice(3));
      break;
    case "merge":
      await cmdMerge(process.argv.slice(3));
      break;
    default:
      usage();
  }
} catch (err) {
  console.error(`Error: ${err.message}`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// prepare
// ---------------------------------------------------------------------------

async function cmdPrepare(args) {
  const { flags, positional } = parseFlags(args);
  const pdfPath = positional[0];
  if (!pdfPath) {
    console.error("Missing PDF path");
    process.exit(1);
  }

  // Check lit is available
  try {
    execSync("lit --version", { stdio: "pipe" });
  } catch {
    console.error("lit CLI not found. Install: npm i -g @llamaindex/liteparse");
    process.exit(1);
  }

  // Check PDF exists
  await access(pdfPath);

  // Create workspace
  const pdfName = path.basename(pdfPath, path.extname(pdfPath));
  const workspace = path.join(
    process.cwd(),
    `hybrid-parse-${pdfName}-${Date.now()}`
  );
  await mkdir(workspace, { recursive: true });
  await mkdir(path.join(workspace, "pages"), { recursive: true });
  await mkdir(path.join(workspace, "screenshots"), { recursive: true });

  // liteparse
  const ocrFlag = flags.ocr ? "" : "--no-ocr";
  const jsonPath = path.join(workspace, "full.json");

  console.error(`Parsing ${pdfPath} with liteparse...`);
  execSync(
    `lit parse "${pdfPath}" --format json ${ocrFlag} --dpi ${flags.dpi} -q -o "${jsonPath}"`,
    { stdio: "inherit" }
  );

  // Split into per-page text files
  const full = JSON.parse(await readFile(jsonPath, "utf8"));
  const pages = full.pages || [];
  const manifest = [];

  for (let i = 0; i < pages.length; i++) {
    const pageNum = i + 1;
    const text = pages[i].text || "";
    const words = text.split(/\s+/).filter(Boolean);
    const lines = text.split("\n").filter((l) => l.trim());

    const fileName = `page_${String(pageNum).padStart(2, "0")}.txt`;
    await writeFile(path.join(workspace, "pages", fileName), text);

    manifest.push({
      page: pageNum,
      chars: text.length,
      words: words.length,
      lines: lines.length,
      file: fileName,
    });
  }

  await writeFile(
    path.join(workspace, "manifest.json"),
    JSON.stringify(manifest, null, 2)
  );

  // Screenshot all pages
  console.error(`Screenshotting ${pages.length} pages...`);
  try {
    execSync(
      `lit screenshot "${pdfPath}" --dpi ${flags.dpi} -o "${path.join(workspace, "screenshots")}"`,
      { stdio: "inherit" }
    );
  } catch {
    console.error(
      "Warning: screenshot failed (non-fatal). Install libreoffice if this is not a PDF."
    );
  }

  console.log(workspace);
}

// ---------------------------------------------------------------------------
// reparse  (direct REST API — no SDK)
// ---------------------------------------------------------------------------

async function cmdReparse(args) {
  const { positional } = parseFlags(args);
  const pdfPath = positional[0];
  const workspacePath = positional[1];

  if (!pdfPath || !workspacePath) {
    console.error("Usage: pdf-hybrid.mjs reparse <pdf-path> <workspace-path>");
    process.exit(1);
  }

  // Read bad pages
  const badPagesFile = path.join(workspacePath, "bad-pages.txt");
  let badPages;
  try {
    const contents = await readFile(badPagesFile, "utf8");
    badPages = contents
      .trim()
      .split("\n")
      .map((s) => Number(s.trim()))
      .filter((n) => !isNaN(n) && n > 0);
  } catch {
    console.error(`No bad-pages.txt found in ${workspacePath}`);
    console.error("Run the prepare step first, then create bad-pages.txt");
    process.exit(1);
  }

  if (badPages.length === 0) {
    console.error("No bad pages specified in bad-pages.txt");
    process.exit(1);
  }

  const badSet = new Set(badPages);
  console.error(`Re-parsing pages: ${badPages.join(", ")}`);

  // Check API key
  const apiKey = process.env.LLAMA_CLOUD_API_KEY;
  if (!apiKey) {
    console.error("LLAMA_CLOUD_API_KEY environment variable is not set");
    process.exit(1);
  }

  const auth = `Bearer ${apiKey}`;

  // 1. Upload + start parse in one call (v2 API)
  console.error("Uploading + starting parse (agentic_plus)...");
  const fileBuffer = await readFile(pdfPath);
  const fileName = path.basename(pdfPath);
  const configuration = JSON.stringify({
    tier: "agentic_plus",
    version: "latest",
    // expand goes in the poll request, not here
  });

  const boundary = `----FormBoundary${Math.random().toString(36).slice(2)}`;
  const body = multipartBody(boundary, [
    { name: "configuration", value: configuration },
    { name: "file", file: fileBuffer, filename: fileName, contentType: "application/pdf" },
  ]);

  const createRes = await fetch(`${LLAMA_BASE}/api/v2/parse/upload`, {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": `multipart/form-data; boundary=${boundary}`,
    },
    body,
  });

  if (!createRes.ok) {
    const err = await createRes.text();
    console.error(`Parse request failed (${createRes.status}): ${err}`);
    process.exit(1);
  }

  const createJson = await createRes.json();
  const jobId = createJson.id;
  if (!jobId) {
    console.error("No job ID in response:", JSON.stringify(createJson, null, 2));
    process.exit(1);
  }
  console.error(`Job: ${jobId}, status: ${createJson.status || createJson.job?.status}`);

  // 2. Poll until complete, requesting page-level markdown
  let result;
  for (let i = 0; i < 120; i++) {
    await sleep(2000);
    const pollRes = await fetch(
      `${LLAMA_BASE}/api/v2/parse/${jobId}?expand=markdown`,
      { headers: { Authorization: auth } }
    );

    if (!pollRes.ok) {
      const err = await pollRes.text();
      console.error(`Poll failed (${pollRes.status}): ${err.slice(0, 500)}`);
      continue;
    }

    result = await pollRes.json();
    const status = result.job?.status || result.status || "unknown";

    if (i % 5 === 0) console.error(`  status: ${status}`);

    if (status === "COMPLETED" || status === "SUCCESS" || status === "completed") {
      break;
    }
    if (status === "FAILED" || status === "CANCELLED" || status === "failed" || status === "error") {
      console.error(`Parse job ${status}:`, JSON.stringify(result).slice(0, 1000));
      process.exit(1);
    }
  }

  if (!result) {
    console.error("Timed out waiting for parse to complete");
    process.exit(1);
  }

  console.error("Parsing complete.");

  // 3. Extract flagged pages
  // v2 response shape: result.markdown.pages = [{ page_number, markdown, success }, ...]
  const markdownObj = result.markdown;
  const pages = markdownObj?.pages || markdownObj; // also handle flat array (v1 compat)

  const outputDir = path.join(workspacePath, "llamaparse-pages");
  await mkdir(outputDir, { recursive: true });

  // Iterate pages — use page_number and markdown fields from v2 API
  let savedCount = 0;
  let idx = 0;
  for (const item of pages) {
    const pageNum =
      typeof item === "object" && item !== null
        ? (item.page_number ?? item.page ?? idx + 1)
        : idx + 1;
    idx++;

    const text =
      typeof item === "object" && item !== null
        ? (item.markdown ?? item.text ?? item.content ?? "")
        : String(item);

    if (badSet.has(pageNum) && text) {
      const outFile = `page_${String(pageNum).padStart(2, "0")}.md`;
      await writeFile(path.join(outputDir, outFile), text);
      console.error(`  Saved page ${pageNum}`);
      savedCount++;
    }
  }

  if (savedCount === 0) {
    console.error(
      `WARNING: No flagged pages found. Expected [${badPages}], received ${pages.length} entries.`
    );
    if (pages.length > 0 && typeof pages[0] === "object") {
      console.error("Sample entry keys:", Object.keys(pages[0]).join(", "));
    }
  }

  console.error(
    `Done. ${savedCount}/${badPages.length} pages saved to ${outputDir}/`
  );
}

// -- helpers --

function multipartBody(boundary, fields) {
  // fields: [{ name, value? } | { name, file, filename, contentType }]
  const CRLF = "\r\n";
  const chunks = [];

  for (const field of fields) {
    if (field.file) {
      // File field
      chunks.push(
        Buffer.from(`--${boundary}${CRLF}`),
        Buffer.from(
          `Content-Disposition: form-data; name="${field.name}"; filename="${field.filename}"${CRLF}`
        ),
        Buffer.from(`Content-Type: ${field.contentType}${CRLF}${CRLF}`),
        field.file,
        Buffer.from(CRLF)
      );
    } else {
      // Value field
      chunks.push(
        Buffer.from(`--${boundary}${CRLF}`),
        Buffer.from(
          `Content-Disposition: form-data; name="${field.name}"${CRLF}${CRLF}`
        ),
        Buffer.from(`${field.value}${CRLF}`)
      );
    }
  }

  chunks.push(Buffer.from(`--${boundary}--${CRLF}`));
  return Buffer.concat(chunks);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ---------------------------------------------------------------------------
// merge
// ---------------------------------------------------------------------------

async function cmdMerge(args) {
  const { flags, positional } = parseFlags(args);
  const workspacePath = positional[0];

  if (!workspacePath) {
    console.error("Usage: pdf-hybrid.mjs merge <workspace-path> [--output <file>]");
    process.exit(1);
  }

  // Get total page count from pages/ directory
  const pagesDir = path.join(workspacePath, "pages");
  const llamaparseDir = path.join(workspacePath, "llamaparse-pages");

  let pageFiles;
  try {
    pageFiles = (await readdir(pagesDir)).filter(
      (f) => f.startsWith("page_") && (f.endsWith(".txt") || f.endsWith(".md"))
    );
    pageFiles.sort();
  } catch {
    console.error(`No pages/ directory found in ${workspacePath}`);
    process.exit(1);
  }

  if (pageFiles.length === 0) {
    console.error("No page files found in pages/");
    process.exit(1);
  }

  const totalPages = pageFiles.length;
  const outputParts = [];

  for (let i = 1; i <= totalPages; i++) {
    const paddedNum = String(i).padStart(2, "0");
    const llamaFile = `page_${paddedNum}.md`;

    let content;
    let source;

    // Prefer LlamaParse version if it exists
    try {
      const llamaPath = path.join(llamaparseDir, llamaFile);
      content = await readFile(llamaPath, "utf8");
      source = "llamaparse";
    } catch {
      // Fall back to liteparse version
      const litFile = `page_${paddedNum}.txt`;
      try {
        content = await readFile(path.join(pagesDir, litFile), "utf8");
        source = "liteparse";
      } catch {
        content = `[Page ${i} not found in either liteparse or llamaparse output]`;
        source = "missing";
      }
    }

    if (source !== "missing") {
      outputParts.push(`## Page ${i}\n\n${content.trim()}\n`);
    }
  }

  const finalOutput = outputParts.join("\n");

  if (flags.output) {
    await writeFile(flags.output, finalOutput);
    console.error(`Written to ${flags.output}`);
  } else {
    process.stdout.write(finalOutput);
  }
}

// ---------------------------------------------------------------------------
// readdir helper (we use the fs/promises one but with a fallback)
// ---------------------------------------------------------------------------

async function readdir(dirPath) {
  const { readdir: fsReaddir } = await import("node:fs/promises");
  return fsReaddir(dirPath);
}
