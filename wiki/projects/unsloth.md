---
title: Unsloth
created: 2026-07-22
updated: 2026-07-22
sources:
  - raw/daniel-han-unsloth-kernels-rl-reward-hacking.md
tags: [project, open-source, quantization, model-distribution, kernels]
unaudited_marginal: 0
---

# Unsloth

> An open-source AI organization co-founded by [[daniel-han|Daniel Han]] and his brother. One of the largest model distributors on Hugging Face with 300M+ total downloads. Specializes in dynamic quantization, kernel optimization, bug fixes for open-source models, and training stack improvements.

## What They Do

Unsloth operates across several areas of the open-source AI ecosystem:

### Model Distribution and Quantization
- Upload quantized versions of models (DeepSeek, GLM, Qwen, and others) to Hugging Face
- **Dynamic quantization**: selectively quantize layers to 1-bit while keeping important layers (linear attention, vision, audio) at 8-bit or 16-bit
- A 1-bit GLM 5.2 model is 86% smaller than the full 1.5TB version and retains significant capability
- Published research showing which layers can be safely quantized (language model layers) vs. which cannot (vision layers, linear attention layers)

### Bug Fixes
- Fix bugs in open-source models before release (Gemma 1/2, Llama, Mistral, OpenGPTSS, DeepSeek, and others)
- Fix bugs in the training stack itself — notably a gradient accumulation bug that increased accuracy by 1-3% across the entire training stack

### Training Infrastructure
- Introduced async gradient checkpointing (widely adopted)
- Contributed to flex attention
- Long context fine-tuning (500k context length) with Snowflake
- 12× faster MLU training

### Open Source Philosophy
- Collaborate with hardware providers and model labs worldwide
- Fix bugs for free and post findings on Twitter for community benefit
- Advocate for self-hosting open-source models (llama.cpp, Unsloth Studio) over inference providers to avoid accuracy degradation

## Thread

- [[the-benchmark-crisis]] — Unsloth's quantization research reveals how inference providers degrade accuracy
- [[the-verifiability-thesis]] — Dynamic quantization as a case where verification (accuracy benchmarks) determines quality

## Related

- [[daniel-han]] — Co-founder; the primary speaker representing Unsloth
- [[reward-hacking]] — Han's talk covers reward hacking extensively; relevant to Unsloth's model evaluation work
- [[benchmark-contamination]] — Unsloth's bug-fix work touches on model reliability

## Sources

- `raw/daniel-han-unsloth-kernels-rl-reward-hacking.md` — Han's AI Engineer talk describing Unsloth's work and positions
