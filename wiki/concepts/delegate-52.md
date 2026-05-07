---
title: DELEGATE-52
created: 2026-05-02
updated: 2026-05-04
sources:
  - raw/2604.15597v1.pdf
tags: [benchmark, eval, agents, delegation, long-horizon]
---

# DELEGATE-52

> A benchmark of 310 work environments across 52 professional domains that simulates long delegated workflows to measure how LLMs corrupt documents over repeated editing interactions.

## Overview

DELEGATE-52 was introduced by [[philippe-laban|Laban]] et al. (Microsoft Research) to study the readiness of AI systems for delegated work — the emerging interaction paradigm where knowledge workers supervise LLMs as they complete tasks on their behalf (e.g., "vibe coding"). It substantially differs from prior benchmarks by spanning multiple domains and simulating long-horizon interaction.

## Structure

The benchmark organizes 52 professional domains into five categories (Figure 3):

- **Code & Configuration** (11 domains): DB Schema, DNS, Docker, Filesystem, Graphviz, Infra, JSON, Makefile, Malware, Python, Translation
- **Science & Engineering** (11 domains): Aviation, Circuit, Crystal, MathLean, Molecule, Protein, Quantum, Robotics, Satellite, StarCatalog, Weather
- **Creative & Media** (11 domains): AudioSyn, Fiction, FontEng, LaTeX, MusicSheet, OBJ3D, Screenplay, Slides, Subtitles, Vector, Weaving
- **Structured Records** (11 domains): Accounting, Calendar, EDIFact, Emails, Genealogy, GeoData, GeoTrack, HamRadio, LibCatalog, Spreadsheet, TreeBank
- **Everyday** (8 domains): Chess, EarnCall, FoodMenu, JobBoard, Landmarks, Playlist, Recipe, Transit

## Work Environments

Each domain contains six work environments. Every environment consists of:

1. **Seed document** — a real document found online (2–5k tokens), with a permissive license. No synthetic data, exemplars, or templates.
2. **Edit tasks** — 5–10 pairs of forward and backward instructions defining invertible transformations. Tasks require in-depth, non-trivial transformation beyond simple expansion or concatenation.
3. **Distractor context** — topically related documents (8–12k tokens) that do not interfere with editing tasks, simulating imperfect retrieval precision in realistic work settings.

## Evaluation Method

DELEGATE-52 uses the [[round-trip-relay]] method for reference-free evaluation. Each editing task is reversible; applying a forward edit then its inverse should recover the original document. Degradation is measured via domain-specific parsing and semantic equivalence scoring calibrated per domain.

## "Ready" Threshold

A model is defined as **"ready"** for delegated work in a domain if it achieves a reconstruction score (RS@20) of 98% or higher after 20 interactions.

Key results: Python is the **only domain** (out of 52) where most models (17 of 19) are ready. The top model (Gemini 3.1 Pro) is designated as ready in only **11 of 52 domains**.

## Public Release

- GitHub: `microsoft/DELEGATE52`
- Hugging Face: `datasets/microsoft/DELEGATE52`

## Thread
- [[agent-quality-engineering]] — DELEGATE-52 as a long-horizon eval for agent readiness
- [[the-slop-problem]] — Benchmark quantifies the slop accumulation mechanism

## Related
- [[round-trip-relay]] — The evaluation methodology powering DELEGATE-52
- [[document-degradation]] — The core finding measured by this benchmark
- [[agent-evals]] — DELEGATE-52 extends evals into long-horizon, multi-domain delegation
- [[jagged-frontier]] — Capability varies sharply across the 52 domains
- [[philippe-laban]] — Lead author
- [[compounding-booboos]] — Quantified empirical evidence for compounding errors
- [[critical-failure]] — Critical failures explain ~80% of the degradation measured by this benchmark
- [[deliberate-friction]] — The compounding degradation supports preserving friction at delegation boundaries
- [[verification-loop]] — Evidence that current tool-based verification is insufficient for long delegation
- [[vibes-based-engineering]] — DELEGATE-52 quantifies the failure mode of accepting outputs that look correct per step
- [[chris-parsons]] — Sub-agent validation mirrors DELEGATE-52's finding that separate verification sessions are more reliable
- [[ralph-loop]] — Fresh-context-per-iteration is a practical response to same-context degradation
- [[the-agent-workflow]] — DELEGATE-52's findings on long-horizon degradation inform the HITL/AFK handoff
- [[hallucination]] — Document corruption shares structural mechanisms with hallucination: lossy compression driving plausible-but-wrong content

## Sources
- `raw/2604.15597v1.pdf` — Full benchmark design, domain list, work environment construction, and evaluation protocol
