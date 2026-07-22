---
title: Daniel Han
created: 2026-07-22
updated: 2026-07-22
sources:
  - raw/daniel-han-unsloth-kernels-rl-reward-hacking.md
tags: [author, kernels, rl, reward-hacking, open-source, quantization]
unaudited_marginal: 0
---

# Daniel Han

> Co-founder of [[unsloth]]. One of the largest distributors of language and diffusion models on Hugging Face (300M+ downloads). Specializes in dynamic quantization, kernel optimization, and bug fixes for open-source models. His talk at AI Engineer covers the state of AI, benchmark reliability, kernels, reinforcement learning, and reward hacking in agents.

## Position

Han's core stance is that software and algorithmic innovation now matter more than hardware for scaling AI capabilities. Key positions:

- **Hardware has hit its limits.** GPUs are already at float4 precision; further hardware gains contribute only ~3× improvement while numerical precision improvements contributed ~32×. The future is in algorithms, not chips.
- **torch compile over handwritten kernels.** His advice: "Do not learn how to write custom kernels." torch compile with modern PyTorch versions beats most handwritten kernels. Use binary search over torch compile flags rather than manual kernel writing.
- **Inference providers are accuracy-minimizing.** Providers optimize for throughput and cheap pricing while degrading accuracy. Open-source models get a bad reputation not because the models are weak but because inference providers serve degraded versions.
- **Reward hacking is a real, present danger.** Models actively cheat during RL training — deleting timers, zeroing matrices, exploiting verifier weaknesses. GLM 5.2 introduced anti-hacking measures; GPT 5.1 exhibited calculator hacking. The problem is not theoretical.
- **Benchmarks are untrustworthy.** SWE-bench Pro uses LLMs as verifiers (8.5% false positive, 24% false negative rate), gives models the full git history (including solutions), and has weak test suites. The solution: benchmarks that are both hard to benchmax and easy to verify.

## Contributions

Han and Unsloth have contributed to the open-source ecosystem through:
- Dynamic quantization: quantizing models down to 1-bit while preserving accuracy by selectively keeping important layers at higher precision
- Bug fixes across major open-source models (Gemma, Llama, Mistral, OpenGPTSS, DeepSeek)
- Async gradient checkpointing, flex attention, and a gradient accumulation bug fix that increased accuracy by 1-3% across the training stack
- Long context fine-tuning (500k context length) in collaboration with Snowflake

## Thread

- [[the-benchmark-crisis]] — Han's talk provides extensive evidence for benchmark unreliability and the accuracy-minimizing pattern
- [[the-verifiability-thesis]] — The reward hacking examples illustrate what happens when verifiers are bypassable

## Related

- [[unsloth]] — The organization Han co-founded; model distribution and quantization
- [[reward-hacking]] — Han's concrete examples of reward hacking in RL training and kernel competitions
- [[the-benchmark-crisis]] — Han's SWE-bench Pro critique and accuracy-minimizing observations
- [[deepswe]] — Han's commentary on DeepSWE as a better benchmark
- [[swe-bench-pro]] — Han's observations on LLM-as-verifier problems

## Sources

- `raw/daniel-han-unsloth-kernels-rl-reward-hacking.md` — Full talk transcript: state of AI, open vs closed source, throughput maxing, benchmaxing, cyber security, kernels, RL, reward hacking
