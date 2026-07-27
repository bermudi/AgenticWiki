---
title: Deterministic-Picker Pattern
created: 2026-07-26
updated: 2026-07-26
sources:
  - raw/all-agentic-architectures-deterministic-picker.md
  - raw/all-agentic-architectures-readme.md
  - raw/all-agentic-architectures-benchmarks.md
unaudited_marginal: 0
tags: [concept, llm-as-judge, scoring, verification, agentic-architecture, constructible-verifiability]
---

# Deterministic-Picker Pattern

> Fareed Khan's [[all-agentic-architectures]] library names this pattern the *deterministic-picker* and frames it as an escape from what he calls the *LLM-as-Scorer flat-band pathology* — the tendency of instruction-tuned LLMs to collapse numeric scores to a narrow band regardless of input quality. The pattern: instead of asking the LLM to emit a numeric quality score, constrain it to commit to categorical features (booleans, bounded ints, enums) and let Python compose the deciding signal (beam search, MCTS, ranked retrieval, accept/reject loops). The wiki presents this as the author's design discipline, not an independently verified finding.

## The Problem: The Flat-Band Pathology

The repo author documents a specific failure mode. Ask an instruction-tuned LLM (e.g. Llama-3.3-70B) to emit a single numeric quality score on a 1–5 or 1–10 scale, and the output collapses to a narrow band regardless of rubric strictness:

```
sample 1: score=4/5
sample 2: score=4/5
sample 3: score=4/5
sample 4: score=4/5
```

The author names this the *LLM-as-Scorer flat-band pathology*. It is a specific manifestation of the LLM-as-judge unreliability the wiki tracks elsewhere: where [[llm-as-code-judge|Bias in the Loop]] documents 40+ point swings from prompt framing and [[rubric-evaluation|RUBRICEVAL]] finds 55.97% accuracy on hard rubric judgments, the flat-band pathology is the failure mode that bites when an architecture *depends on* the score to pick something (beam search, MCTS, ranked retrieval, accept-or-reject loops) — the picker becomes arbitrary because there is no discriminative signal to rank on.

## The Fix: Categorical Commitment + Python Composition

The author's move: don't ask the LLM for a number. Ask it for categorical features the score will be composed from, then have Python compose the deciding signal:

```python
class _EditorCritique(BaseModel):
    is_on_brief: bool                          # LLM commits to a bool, not a number
    word_count: int
    has_concrete_imagery: bool
    avoids_cliches: bool
    is_engaging: bool

def _composite_score(features: dict, wc_range: tuple) -> int:
    score = 4 * features["is_on_brief"]
    score += 2 if wc_range[0] <= features["word_count"] <= wc_range[1] else 0
    score += 2 * features["has_concrete_imagery"]
    score += 1 * features["avoids_cliches"]
    score += 1 * features["is_engaging"]
    return score  # 0-10, with REAL SPREAD
```

The LLM cannot flat-band five categorical commitments (four booleans — `is_on_brief`, `has_concrete_imagery`, `avoids_cliches`, `is_engaging` — plus a bounded integer, `word_count`, constrained by a Python range check) the way it flat-bands one number; Python's `score` now ranges over `[0, 10]` honestly because it depends on five separate commitments. Per the author, the pattern works for three reasons: (1) granular commitment — saying "yes, this avoids clichés" is a different cognitive operation than "this is a 6/10"; (2) auditability — the user can see *which* features drove the score; (3) Python computes the number — the LLM never emits the deciding signal directly.

## Coverage

In the [[all-agentic-architectures]] library, the pattern is applied in 13 of 35 architectures (Mental Loop, Ensemble, Dry-Run, RLHF Self-Improvement, Reflexive Metacognitive, Self-Consistency, LATS, Corrective RAG, Self-RAG, Adaptive RAG, Debate, Constitutional AI, BrowserAgent). The README reports that **9 architectures are architecturally immune by design**; the deterministic-picker tutorial explicitly enumerates **8** (Reflexion, Self-Discover, CoVe, GraphRAG, Voyager, MemGPT, SWE-Agent, AWM). The wiki does not resolve the ninth — see the sourcing note below. The author frames the pattern as *architectural, not a hyperparameter*: once built in, the architecture is immune to the flat-band pathology for the lifetime of the codebase.

> [!note] Sourcing: Two sources disagree on the count of architecturally-immune architectures. The README claims "9 architecturally immune by design"; the deterministic-picker tutorial's "Architecturally immune by design" section explicitly enumerates 8 (Reflexion, Self-Discover, CoVe, GraphRAG, Voyager, MemGPT, SWE-Agent, AWM). The wiki does not bridge the difference.

## Relation to Constructible Verifiability

The deterministic-picker is a *constructible-verifiability* move — it restructures the artifact so the deciding signal becomes verifiable. But it occupies a distinct position relative to the wiki's existing techniques:

| Technique | What's restructured | LLM role in the deciding signal |
|---|---|---|
| [[contextcov\|ContextCov]] | instructions → executable checks | **removed** from verification |
| [[property-based-testing-as-spec\|PBT-as-spec]] | requirements → falsifiable properties | **removed** from verification |
| Deterministic-picker | scorer's output contract → categorical features | **demoted** (judges features; doesn't emit the deciding number) |

The distinction matters. [[contextcov|ContextCov]] and [[property-based-testing-as-spec|PBT-as-spec]] *remove* the LLM from the verification loop, replacing its judgment with deterministic checks. The deterministic-picker is a *hybrid*: the LLM still makes judgments, but its output shape is constrained so Python — not the LLM — composes the deciding numeric signal. This is a third position between full LLM-as-judge ([[llm-as-code-judge]]) and full deterministic check. It echoes [[dex-horthy|Dex Horthy]]'s "never send an AI to do a linter's job," but where Horthy would replace the LLM with a linter, the deterministic-picker keeps the LLM for the judgment while denying it the deciding number.

> [!note] Attribution
> The "flat-band pathology" naming, the "universal escape" framing, and the categorical-feature-then-Python-compose pattern are Fareed Khan's, codified in the [[all-agentic-architectures]] library (2026). They are a practitioner's design discipline, not independently verified. The wiki's placement of the pattern within the constructible-verifiability family and its connection to LLM-as-judge unreliability is the wiki author's synthesis.

## Boundaries

- **Operationalizable features only.** Like PBT-as-spec's properties, the categorical features must be things the LLM can commit to (`is_on_brief: bool`, not `is_elegant: bool`). Feature design is where the human's judgment moves upstream.
- **Fixes flat-band, not bias.** The pattern removes the numeric-collapse failure (the score now has real spread), but it does not immunize against the systematic-judgment failures the LLM-as-judge literature documents — the LLM's boolean commitments can still be directionally wrong ([[llm-as-code-judge]]). It removes one failure mode (non-discrimination), not the verifier-reliability problem ([[rubric-evaluation]]) entirely.
- **Pattern-fit failure is the inverse.** The library's benchmark documents architectures failing *not* because the picker is broken but because the architecture's overall shape doesn't fit the task (LATS on arithmetic, Debate on the Sally trick, Reflexion on raw-fact recall). 

> [!note] Synthesis: The deterministic-picker makes the picker reliable; it cannot make a wrong-shape architecture fit the task. This separation between picker reliability and architecture-task fit is the wiki author's framing — neither source states it verbatim.

## Thread

- [[agent-quality-engineering]] — the deterministic-picker is a hybrid LLM-as-judge technique: it keeps the LLM judging but constrains its output so Python composes the deciding signal — a third position between full LLM-as-judge and the full deterministic checks the thread's eval layer centers on
- [[the-verifiability-thesis]] — the deterministic-picker is a constructible-verifiability move: restructure the scorer's output contract so the deciding signal becomes verifiable (Python-composed, auditable) rather than LLM-emitted

## Related

- [[all-agentic-architectures]] — the library that codified the pattern; applied in 13 of 35 architectures
- [[contextcov]] — the "remove the LLM from verification" pole; the deterministic-picker is the hybrid middle ground
- [[property-based-testing-as-spec]] — the "remove the LLM from verification" pole applied to the spec→code step; the deterministic-picker is the analog for the scorer step
- [[llm-as-code-judge]] — the unreliability the flat-band pathology is a specific manifestation of
- [[rubric-evaluation]] — RUBRICEVAL's 55.97% on hard rubrics is the controlled-lab version of the verifier-reliability problem the flat-band finding instantiates at the picker step
- [[verifiability]] — the constructible-verifiability family the pattern belongs to
- [[dex-horthy]] — "never send an AI to do a linter's job"; the deterministic-picker keeps the LLM for judgment while denying it the deciding number
- [[backpressure]] — Python-composed scoring is a mechanical gate that rejects wrong outputs before they propagate

## Sources

- `raw/all-agentic-architectures-deterministic-picker.md` — Primary source. The flat-band pathology, the categorical-feature + Python-compose fix, the code example, the 13-architecture application table, the eight explicitly enumerated architecturally-immune architectures (Reflexion, Self-Discover, CoVe, GraphRAG, Voyager, MemGPT, SWE-Agent, AWM), and the "architectural not hyperparameter" claim.
- `raw/all-agentic-architectures-readme.md` — The "13 of 35 architectures / 9 architecturally immune" framing, the "central technical discipline" claim, and the library's uniform `Architecture` contract. The "9 architecturally immune" count is the README's; the tutorial enumerates 8.
- `raw/all-agentic-architectures-benchmarks.md` — The pattern-fit failures (LATS on arithmetic, Debate + Ensemble on the Sally trick, Reflexion + Agent Workflow Memory on raw-fact recall) as the inverse case: architectures whose overall shape doesn't fit the task, which a reliable picker cannot rescue.
