---
title: Round-Trip Relay
created: 2026-05-02
updated: 2026-05-02
sources:
  - raw/2604.15597v1.pdf
tags: [eval-methodology, backtranslation, long-horizon, benchmarking]
---

# Round-Trip Relay

> A reference-free evaluation method that chains reversible editing tasks into long workflows, measuring document fidelity by how well an LLM recovers the original document after a sequence of forward and backward transformations.

## The Round-Trip Primitive

Inspired by backtranslation from machine translation (Sennrich et al., 2015; Somers, 2005), the round-trip primitive assumes every editing task is reversible. Given a seed document *s*, a pair of instructions defines:

- **Forward edit** (*x*→): transforms *s* into *t* = σ(*s*)
- **Backward edit** (*x*←): transforms *t* back into ŝ = σ⁻¹(*t*)

Under a perfect model, the reconstructed document ŝ equals the original *s* exactly. Each step is conducted as an independent, single-turn session.

## The Relay

Since each round-trip is designed to return to the seed document, round-trips can be chained into longer workflows. An *n*-relay applies *n* round-trip edits in sequence:

ŝₖ = (σ₁ ∘ σ₁⁻¹ ∘ ⋯ ∘ σₙ ∘ σₙ⁻¹)(*s*)

The main metric is the **reconstruction score after *k* interactions** (i.e., *k*/2 round-trips):

**RS@k(*s*) = sim(*s*, ŝₖ/₂)**

## Why It Works for Evaluation

The method enables large-scale, automated evaluation without requiring:
- Human reference solutions
- Manual annotation
- Domain experts to verify every output

It reduces evaluation to measuring **semantic equivalence** with the original document. Domain-specific parsing functions convert documents into structured representations, and similarity functions compare parsed outputs with calibrated per-domain weights.

## Experimental Setup

In [[delegate-52|DELEGATE-52]], the main experiment uses *N* = 10 consecutive round-trips per environment, simulating **20 delegated interactions**. Edits are repeated in round-robin fashion (shuffling order each epoch) to reach the target interaction count.

## Key Properties

- **Compounding sensitivity**: Errors from early interactions compound, making the metric sensitive to long-horizon degradation.
- **Short-term blindness**: Performance after 2 interactions is not predictive of long-horizon performance (20 interactions), validating the need for extended relays.
- **Realistic scheduling**: Round-robin scheduling is more realistic and leads to more degradation than repeating the same edit.

## Limitations

- Tasks must be reversible
- Evaluation favors structured domains where parsing is tractable
- Single-turn sessions; multi-turn clarification and refinement are not simulated

## Thread
- [[the-slop-problem]] — Round-trip relay reveals the quantitative mechanism of slop accumulation
- [[agent-quality-engineering]] — Reference-free eval methodology for long-horizon agent workflows

## Related
- [[delegate-52]] — The benchmark built on round-trip relay evaluation
- [[document-degradation]] — The failure mode this method is designed to measure
- [[agent-evals]] — A novel eval methodology for long-horizon agent workflows
- [[compounding-booboos]] — The relay method captures error compounding quantitatively
- [[philippe-laban]] — Co-developer of the round-trip relay evaluation method

## Sources
- `raw/2604.15597v1.pdf` — Formal definition, mathematical formulation, validation, and experimental setup
