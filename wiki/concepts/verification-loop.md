---
title: Verification Loop
created: 2026-04-25
updated: 2026-04-25
sources: ["raw/yt-no-vibes-allowed-dex-horthy.md"]
tags: ["ai-workflow", "testing", "rigor"]
---

# Verification Loop

> A structured process of verifying AI-generated code through automated feedback mechanisms.

## Steps in the Loop

1. **Propose**: The AI suggests a code change based on context.
2. **Execute/Compile**: The code is integrated into the environment.
3. **Verify**:
    - **Static Analysis**: Linters and type checkers verify correctness of syntax and types.
    - **Dynamic Analysis**: Unit and integration tests verify behavior.
4. **Refine**: Errors from verification are fed back to the AI for iterative improvement.

## Importance

The verification loop is the primary defense against [[vibes-based-engineering]] and [[hallucination|hallucinations]]. It shifts the burden of proof from the human "vibing" the code to the machine proving the code meets the system's requirements.

- [[grey-box-engineering]] — Emphasizes the loop as a replacement for trust.
- [[ai-design-loop]] — The broader process of which the verification loop is a part.
- [[tracer-bullets]] — A technique often used within a verification loop to prove a vertical slice works.
- [[aesthetics-is-truth]] — The qualitative counterpart to the mechanical verification loop.

## Thread
- [[the-human-lever]] — Verification as the contract between human design authority and agent implementation
- [[the-slop-problem]] — The verification loop as the primary defense against slop

## Sources

- [[src/no-vibes-allowed-dex-horthy]]
