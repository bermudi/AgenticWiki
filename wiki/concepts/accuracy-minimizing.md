---
title: Accuracy Minimizing
created: 2026-07-22
updated: 2026-07-22
sources:
  - raw/daniel-han-unsloth-kernels-rl-reward-hacking.md
tags: [concept, inference, throughput, accuracy, open-source, reliability]
unaudited_marginal: 0
---

# Accuracy Minimizing

> The pattern where inference providers optimize for throughput and cost at the expense of model accuracy. Providers serve degraded versions of open-source models — through bad quantization, hardware mismatches, or system prompt errors — producing high token-per-second numbers with lower quality outputs. The result: open-source models get a bad reputation not because the models are weak, but because the inference layer is unreliable.

## How It Manifests

Han's talk documents several mechanisms:

### Quantization Without Dynamic Selection
Inference providers apply uniform quantization (e.g., quantizing all layers to 3-bit) instead of dynamic quantization (selectively keeping important layers at higher precision). The result: a 3-bit DeepSeek model gets 75.6% accuracy, but dynamic 1-bit quantization can achieve 57% — showing that *smart* compression outperforms *uniform* compression even at lower total bits.

### Hardware Mismatch
Different hardware (GPUs vs. TPUs) produces different sampling results from the same software stack. Anthropic's September 2025 accuracy degradation was traced to TPU vs. GPU sampling differences in their compiler. Inference providers deploying on heterogeneous hardware without verifying consistency produce variable accuracy.

### System Prompt Errors
Before new model releases, providers may route traffic through models with mismatched system prompts. Han hypothesizes that accuracy dips before model releases (observed in Margin Labs' daily SWE-bench tracking) result from using the wrong system prompt for a test model — e.g., using Opus 4.7's verbose prompt with Opus 4.8's shorter-context model.

### Throughput-First Deployment
OpenRouter benchmarks show 10%+ accuracy gaps between the best and worst inference providers serving the same model (e.g., DeepSeek V4 Pro: 76.4% vs. 62.4% on Tower Bench). Providers competing on tokens-per-second rather than accuracy produce the illusion that open-source models are worse than they actually are.

## The Open-Source Reputation Problem

> [!note] Synthesis: accuracy minimizing is the hidden variable in the open-source vs. closed-source debate
> Han argues that the perceived gap between open-source and closed-source models is partly an inference-quality artifact. Closed-source labs control their entire supply chain; open-source models pass through dozens of inference providers, each potentially degrading accuracy. The "open source lags closed source" narrative is partially a measurement error caused by accuracy minimizing at the inference layer.

## The Fix

Han's recommendation: self-host open-source models using llama.cpp or Unsloth Studio rather than relying on third-party inference providers. For organizations that must use providers: verify accuracy against benchmarks before deploying, and push providers to prioritize accuracy over throughput.

## Thread

- [[the-benchmark-crisis]] — Accuracy minimizing is the eighth axis of benchmark unreliability: the same model produces different scores depending on the inference provider
- [[the-verifiability-thesis]] — If you can't verify that an inference provider is serving the model correctly, you can't trust the output

## Related

- [[unsloth]] — Han's organization; research on dynamic quantization that addresses accuracy minimizing
- [[daniel-han]] — The speaker who identified and named this pattern
- [[benchmark-contamination]] — Accuracy minimizing compounds contamination: even clean benchmarks produce unreliable scores when the inference layer varies
- [[deepswe]] — DeepSWE's standardized harness (mini-swe-agent) partially controls for this variable
- [[swe-bench-pro]] — SWE-bench Pro's LLM-as-verifier problem is compounded by inference-layer accuracy variation

## Sources

- `raw/daniel-han-unsloth-kernels-rl-reward-hacking.md` — Han's talk: OpenRouter accuracy benchmarks for DeepSeek V4 Pro and GLM 5.2 across providers, quantization research, hardware mismatch analysis
