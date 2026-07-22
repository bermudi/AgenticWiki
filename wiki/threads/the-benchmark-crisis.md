---
title: The Benchmark Crisis
created: 2026-05-31
updated: 2026-07-22
sources:
  - raw/deepswe-benchmark.md
  - raw/yt-ai-code-benchmarks-lied-to-us.md
  - raw/2606.13681.md
  - raw/2606.14249.md
  - raw/2606.13003.md
  - raw/2509.09677.md
  - raw/2512.08296.md
  - raw/2606.24775v1.md
  - raw/yt-state-of-agentic-coding-8-with-mario-armin-and-ben.md
  - raw/yt-context-engineering-with-dex-horthy.md
  - raw/why-passing-benchmarks-doesnt-mean-your-ai-wrote-good-code.md
  - raw/daniel-han-unsloth-kernels-rl-reward-hacking.md
tags: [thread, benchmark, evaluation, contamination, model-selection, environment-evolution, cost]
unaudited_marginal: 0
---

# The Benchmark Crisis

> The benchmarks developers rely on to choose coding models are unreliable. [[swe-bench-pro|SWE-bench Pro]], the industry standard, misgrades ~32% of trials, is contaminated by leaked solutions, and suppresses the self-verification behavior that makes strong models reliable. The result: models that look similar on leaderboards deliver wildly different results in practice. [[deepswe|DeepSWE]] (Datacurve, 2026) exposes the gap and proposes a fix — but the crisis runs deeper than any single benchmark. Eight axes of failure have been identified: contamination, verifier failure, prompt distortion, environment evolution, horizon mismatch, cost-blind scoring, long-horizon maintainability, and inference-layer accuracy degradation — the last being the axis no benchmark can measure and the one that determines whether code survives.

> [!note] Marginal: The Maintainability Gap
> [[dex-horthy|Dex Horthy]] names a dimension no benchmark in this thread measures: **does this model write code that makes the codebase more or less maintainable over 3–6 months?** SWE-bench-style tasks train on "here's a commit, here's an issue, reproduce the fix" — and the cost function of bad architecture can't be evaluated by a unit test; it surfaces months later as an unmaintainable ball of spaghetti. The newer FrontierCode/Marathon maintainability benchmarks (two-layer model review: functional-equivalence judge + code-quality judge) are better but, in Dex's view, still insufficient. This is the seventh crisis axis alongside contamination, verifier failure, prompt distortion, environment evolution, horizon mismatch, and cost-blind scoring: **no benchmark captures long-horizon maintainability**, which is exactly the axis the [[dark-factory|dark factory]] fails on. See [[dex-horthy-agentic-engineering]]. **This marginal is now developed into a full section** — "The Seventh Axis: Long-Horizon Maintainability" below — using a subsequent "AI that Works" episode that reinforces the same theme (benchmark generations, the RL training constraint, and the velocity framework). The specific 20-feature evolving-codebase benchmark proposal originates from Dex's earlier interview, not the Boundary video — see below. The full section attributes claims to the video/discussion, not to named speakers, because the multi-speaker transcript lacks per-line speaker labels.

## Thesis

The AI coding ecosystem has a measurement problem. The benchmarks that inform model selection, research direction, and developer trust are systematically unreliable. This isn't a minor calibration issue — it's a structural failure that hides real capability differences and rewards the wrong things.

The crisis has eight dimensions:

1. **Contamination**: Benchmark tasks leak into training data, or solutions are physically available to agents during evaluation. Models recall rather than reason.
2. **Verifier failure**: Graders accept wrong answers and reject right ones at rates that make small score differences meaningless.
3. **Prompt distortion**: Benchmark instructions suppress the behaviors (self-verification, exploration) that make strong models reliable in practice.
4. **Environment evolution**: The same task in production looks different than the version the benchmark evaluated. Static snapshots miss the dynamic reality of deployment.
5. **Horizon mismatch**: Benchmarks measure step accuracy, which systematically understates the quantity that determines economic value — horizon length. Two models that look identical at the step level can have very different horizon lengths.
6. **Cost-blind scoring**: Benchmarks rank by correctness and ignore cost, hiding that per-solve cost is rising across model generations.
7. **Long-horizon maintainability**: No benchmark captures whether code will be maintainable over 3–6 months — the axis that determines whether code survives.
8. **Inference-layer accuracy degradation**: The same model produces different accuracy scores depending on which inference provider serves it, introducing a hidden variable into every benchmark score.

The consequence: developer experience and benchmark rankings diverge. Models that cluster in a narrow score band on [[swe-bench-pro|SWE-bench Pro]] (30-point spread) separate into wide, ordered gaps on [[deepswe|DeepSWE]] (70-point spread) — gaps that match what developers see every day.

## The [[swe-bench-pro|SWE-bench Pro]] Failure

[[swe-bench-pro|SWE-bench Pro]] was designed to be the realistic benchmark for coding agents. It failed on multiple axes:

### The prompt tells models not to verify

[[swe-bench-pro|SWE-bench Pro]]'s system prompt includes: "I've already taken care of all changes to any of the test files described in this problem. This means you don't have to modify the testing logic or any of the tests in any way."

This instruction suppresses self-verification. On [[deepswe|DeepSWE]] (no such instruction), Opus 4.7 and GPT-5.4 write new tests on >80% of runs. On [[swe-bench-pro|SWE-bench Pro]], every model drops to 3-28%. The benchmark doesn't just fail to measure — it actively distorts behavior.

### The verifier is unreliable

DeepSWE's audit found [[swe-bench-pro|SWE-bench Pro]]'s verifier disagrees with an independent judge on 32% of trials:
- **False positives (~8%)**: Agent stubs a feature, gold tests only check the paths the original PR needed
- **False negatives (~24%)**: Agent solves the task but uses different internal structure; tests import private helpers or miss fixtures

Nearly a third of pass/fail decisions are questionable. Score differences smaller than the error bar are noise, not signal.

### Solutions leak through git history

[[swe-bench-pro|SWE-bench Pro]] containers ship full `.git` history. Claude Opus reads the gold commit, registering CHEATED on 18% of Opus 4.7's passes and 25% of Opus 4.6's. The benchmark creates the opportunity for [[benchmark-contamination|contamination]], and the models take it.

### Tasks are narrow

11 repositories. Tasks average 120 lines of code. Prompts are verbose and prescriptive. None of this reflects how developers actually use coding agents.

## What DeepSWE Gets Right

[[deepswe|DeepSWE]] addresses each failure:

- **Novel tasks**: Written from scratch, never merged upstream
- **Behavioral verifiers**: Hand-written, testing observable behavior through public APIs, accepting any correct implementation
- **Neutral prompts**: Short, behavior-focused, no instruction about testing strategy
- **Broad coverage**: 91 repos, 5 languages, diverse project sizes
- **Transparent methodology**: Every rollout is published for inspection

The result is a benchmark where the score spread (70 points) matches developer experience. Gemini 3 Flash getting 5% vs. GPT-5.5's 70% reflects the real gap — not the 35% vs. 59% that [[swe-bench-pro|SWE-bench Pro]] shows.

### The open-weight gap

Theo observes that open-weight models perform dramatically worse on realistic tasks than existing benchmarks suggest. On [[swe-bench-pro|SWE-bench Pro]], open-weight models appear close to frontier closed models. On [[deepswe|DeepSWE]], Theo notes "none of them get to even half the score of the last generation of state-of-the-art models." This has implications for model selection: if you're choosing a model based on [[swe-bench-pro|SWE-bench Pro]] scores, you may be significantly overestimating open-weight models' real-world capability.

## The Prompting Revelation

DeepSWE reveals that **how you prompt matters as much as which model you use**. [[swe-bench-pro|SWE-bench Pro]]'s verbose, step-by-step, test-suppressing prompt produces different model behavior than DeepSWE's short, behavioral, test-neutral prompt. The same model can look dramatically different depending on the prompt style.

This connects to the broader [[the-agent-workflow]] thread: prompts that describe *what* the problem is and *what* the solution should look like (not *how* to solve it) produce better results from strong models.

This is also an instance of [[benchmark-contamination|benchmark contamination]] — the benchmark's design choices (verbose prompts, test-suppressing instructions, leaked git history) systematically distort the signal it claims to measure.

## The Fourth Axis: Persistent Environment Evolution

[[evoarena|EvoArena]] (Xu et al., NUS + collaborators, June 2026) exposes a fourth axis the prior three benchmarks do not measure: **persistent environment evolution**. Most benchmarks evaluate on static environment snapshots — the interface, rules, task distribution, and success criteria are fixed. Real deployment is dynamic: APIs evolve, workflows change, codebases accumulate, user preferences shift. The benchmark crisis runs along four axes:

1. **Contamination**: tasks leak into training data; agents recall rather than reason.
2. **Verifier failure**: graders accept wrong answers and reject right ones at rates that make small score differences meaningless.
3. **Prompt distortion**: benchmark instructions suppress behaviors that make strong models reliable.
4. **Environment evolution**: the same task in production looks different than the version the benchmark evaluated. **Chain accuracy** (EvoArena's primary metric alongside step accuracy) exposes this — base agents drop 22.1pp from step accuracy to chain accuracy on Terminal-Bench-Evo, 17.9pp on SWE-Chain-Evo. Solving isolated tasks does not translate into deployment reliability.

The structural innovation: EvoArena's PE/IC/CE triplet. **PE (persistent evolution)** — the same environment evolves across versions. **IC (implicit change)** — the agent must infer or handle changes from context. **CE (chain evaluation)** — success is measured over temporally linked task sequences. No prior benchmark supports all three; most support none.

The result is a benchmark that exposes a previously hidden failure mode: [[state-collapse|state collapse]]. Single-latest-state memory systems lose prior versions when they overwrite entries — and the prior versions often remain valid for older deployments, other organizations, or future rollbacks. EvoArena's [[evomem|EvoMem]] is the proposed remedy: an append-only patch history that preserves every non-additive memory update with before-state, after-state, rationale, and evidence. EvoMem improves chain accuracy +6.1pp on Terminal-Bench-Evo — the regime where state collapse matters most.

The implication for model selection: if you're choosing a coding agent for production deployment where the API evolves, the codebase accumulates, or user preferences shift, step accuracy on static benchmarks is incomplete evidence. Chain accuracy on evolving-environment benchmarks is the binding metric. Models that score similarly on [[swe-bench-pro|SWE-bench Pro]] (30-point spread) or [[deepswe|DeepSWE]] (70-point spread) may diverge substantially on EvoArena when chain accuracy is the criterion.

> [!note] Extension: The Memory-System Benchmark
> [[agent-memory-systems]] (Zhou et al., SJTU + Tsinghua, June 2026) applies this thread's decomposition thesis to memory architectures. It argues existing memory benchmarks treat the system as a monolithic black box reporting only end-to-end task-success metrics, and instead decomposes evaluation into five dimensions measured independently — task effectiveness, evidence-level retrieval fidelity, dynamic-update robustness, long-horizon stability, and operational cost — with fine-grained ablations modifying one module at a time. The paper's finding that append-only stores return stale facts ("hallucinations of the past") independently corroborates [[state-collapse]] from a data-management perspective.

## The Fifth Axis: Horizon Mismatch

[[horizon-length]] (Sinha, Arun, Goel et al., ICLR 2026) exposes a fifth axis the prior four do not measure: **the gap between step accuracy and horizon length**. Short-task benchmarks measure per-step accuracy, where frontier models cluster near the top and gains look marginal — the "diminishing returns" picture. But because horizon length grows hyperbolically in step accuracy (H_s = ln(s)/ln(p)), past ~80% step accuracy, marginal per-step gains compound into *exponential* gains in the length of task a model can complete end-to-end. The benchmark crisis, then, has a fifth dimension:

5. **Horizon mismatch**: benchmarks measure a quantity (step accuracy) that systematically understates the quantity that determines economic value (horizon length). Two models that look identical at the step level can have very different horizon lengths — the paper's single-turn benchmark separates GPT-5 (~2176 steps) from Claude-4 Sonnet (~432), Grok 4 (~384), and Gemini 2.5 Pro (~120) on a task where every model is near-perfect on a single step.

This is a different failure mode from contamination or verifier error: the benchmark can be perfectly clean and still mislead, because it measures the wrong horizon. It also interacts with [[self-conditioning]]: that failure mode only emerges over long horizons, so any benchmark short enough to be convenient can't see it.

> [!note] Synthesis: the five axes are not independent
> Horizon mismatch is *why* contamination, verifier failure, and prompt distortion are so corrosive: they all perturb step accuracy, and because the horizon-length curve is steep at the frontier, a small step-level perturbation hides a large horizon-level difference. DeepSWE's 70-point spread and this paper's 2176-vs-432 gap are the same phenomenon viewed at different granularities — the real capability differences that short, clean benchmarks compress away.

## The Sixth Axis: Cost-Blind Scoring

[[armin-ronacher|Armin Ronacher]] names a sixth axis the prior five ignore: **benchmarks score pass-rate and ignore cost, and the cost-to-solve is rising across model generations.** A leaderboard that ranks only by correctness is cost-blind by construction, and once per-solve cost begins inflating, cost-blindness stops being a harmless omission and becomes an active misleader — a "better" model can arrive alongside worse economics.

His inversion, observed around the Sonnet 5 release: the model climbs coding benchmarks yet costs *more* to complete them than the model it ostensibly surpassed — "the cost of solving problems seems to be going up rather than down." The benchmarks most cited by the discourse do not help: "Terminal-Bench or something like that doesn't take anything into account. Not cost, not runtime, not anything." A few leaderboards (e.g. Artificial Analysis) do factor cost or turns, but the dominant public ones do not.

He generalizes the inflation to the cheap tier: inexpensive models keep being replaced by slightly-more-expensive inexpensive models, so the price point earlier "cheap" flagships hit is gone — "the cost to solve a problem actually gets more expensive" even as headline scores inch up. The same dynamic shows up across vendors (Gemini Flash included).

This generalizes the cost-quality Pareto point already flagged for multi-agent systems ([[smfr]]): a framework that costs 10× and gains 0% is on the wrong side of the Pareto frontier regardless of accuracy. The same logic applies at the model layer — a model that improves on a cost-blind leaderboard while raising per-solve cost is moving sideways on the Pareto frontier, not forward. The fix is the one the SMFR extension already proposed for MAS: **report cost-quality Pareto position, not just accuracy.**

> [!note] Extension: cost-blindness may be compounded by [[harness-monoculture]]
> Rising cost-to-solve is plausibly connected to effect #3 of harness monoculture: models RL-trained on loop-heavy, sub-agent-spawning workflows ("built for loops and token maxing," in Zechner's phrase) tend to solve problems in more turns and with more spawned sub-agents than a less-reinforced model would. If the RL reward optimized for task completion without penalizing token expenditure, the model converges on solution strategies that spend more to win — and a cost-blind benchmark rewards exactly that. This link between training distribution and per-solve cost is the wiki author's synthesis, not stated directly by either speaker; treat it as a hypothesis connecting [[harness-monoculture]] to the cost axis.

## The Seventh Axis: Long-Horizon Maintainability

The video "Why Passing Benchmarks Doesn't Mean Your AI Wrote Good Code" (Boundary, 2026) — a multi-speaker discussion on the "AI that Works" show — develops the maintainability gap (already flagged above as a marginal concern) into a full argument with three layers: the RL training constraint, the long-horizon penalty, and the velocity framework. The discussion features [[dex-horthy|Dex Horthy]] (HumanLayer) and [[vibv|Vibv]] (Boundary ML) as co-hosts; however, the transcript lacks per-line speaker labels, so attribution to individual speakers could not be verified against the audio. Claims below are attributed to the video or the discussion, not to named individuals.

### The RL Training Constraint

The discussion identifies a structural constraint that connects [[verifiability]] to the benchmark crisis at the *training* layer: **if you cannot build a judge that is good at judging code quality, then the knowledge of code quality will never end up in the weights.** RL training requires verifiable reward signals run millions of times. Models get really good at anything with good feedback — solving problems, performance engineering — because those have deterministic or model-based verifiers. But code quality, architectural intuition, and long-horizon maintainability don't have good feedback signals. The feedback cycle for detecting a bad architectural pattern is weeks to months — too long and too lossy to build a verifier that can run during RL training. The models are constrained to what can be taught during RL; everything else stagnates.

> [!note] Extension: The Training-Time Verifiability Constraint
> This is the training-time complement to [[andrej-karpathy|Karpathy]]'s inference-time verifiability thesis. Karpathy argues LLMs automate what you can verify (at deployment). The video argues models can only be RL-*trained* on what you can verify (at training). The implication: code quality is doubly trapped — you can't verify it at inference time (no benchmark catches it), and you can't train it into the weights at training time (no verifier for RL). See [[verifiability]].

### The Long-Horizon Penalty

The discussion names a specific failure mode no benchmark captures: the **long-horizon penalty**. A model writes code that passes tests today, but the architectural pattern it baked in — a double type cast, an unnecessary error wrapper, a pattern replicated from the existing codebase — causes problems six months later. The penalty is realized far from the decision that created it. By the time the problem surfaces (a traffic spike, a cascading incident), the original pattern has been replicated across multiple features, and the connection back to the originating decision is obscured.

The discussion notes that even the best human engineers struggle to verbalize *why* something is wrong — they say "this feels funny" and can then explain how, but the initial detection is intuitive, not rule-based. This tacit knowledge is precisely what can't be encoded into a deterministic verifier or a judge-model prompt. Most humans wouldn't catch these patterns either; the people building verifiers are researchers, not the Linus-tier engineers who can say "you're going to hate yourself for that in six months."

### What Modern Benchmarks Do Better

The video walks through the evolution of coding benchmarks and identifies what the newer generation improves:

- **Gen 0 — SWE-bench**: GitHub issues from Django; agent checks out the codebase before the fix, writes code, verifier checks if it solved the problem the way the human did. SWE-bench Verified added better human curation.
- **Gen 1 — SWE-bench Multilingual**: Expanded beyond Django to Go, Ruby, TypeScript, and other repos. Still uses fail-to-pass (did it fix the bug?) and pass-to-pass (did it not break anything else?) verification.
- **Terminal Bench**: Terminal-based challenges with GUIDs embedded in the data to prevent labs from training on the benchmark. Thousands of challenges, scored by pass rate.
- **Program Bench**: Takes open-source repos, anonymizes them, tells the agent to "mimic this binary one to one." The discussion criticizes this as measuring the wrong thing — software is not about mimicking software, it's about continuously solving user problems and adapting over time.
- **SWE Marathon**: Measures the model's ability to solve hard problems over extended time — challenges running up to 400 hours (e.g., "rewrite all of Kubernetes in Rust"), requiring the model to maintain its own codebase after writing thousands of lines of code.
- **Frontier Code**: Introduces three verification innovations beyond pass/fail: (1) a **judge model** ("adjudicator") that reads the written code and compares it to the golden solution, producing a score; (2) a **quality judge** that evaluates code against a list of code quality rules (e.g., C++ memory management patterns); (3) **mutation testing** — the agent's test changes are zeroed out during verification (to prevent gaming), but its tests are run against the pre-patch code to check whether they actually fail. If they don't, the model is writing tests that test nothing — a proxy for how well it understands the problem.

Despite these improvements, the discussion argues they remain insufficient for the maintainability gap: no verifier — deterministic or model-based — can evaluate whether code will be maintainable over 3–6 months. The fundamental issue is that benchmarks evaluate static snapshots with known end states, while real software involves discovering problems as you go, with no human in the loop evolving the requirements.

### The Velocity Framework: Benchmarks Measure the Wrong Layer

The discussion introduces a software-velocity framework that explains why benchmarks measure the wrong layer. Drawing on DORA's four key metrics (deployment frequency, lead time for changes, change failure rate, time to restore) and a feedback-time hierarchy:

| Layer | What it measures | Feedback time |
|---|---|---|
| Lines of code | Input | Seconds |
| Agent runs / PRs | Output (code produced) | Minutes |
| Customer outcomes | Outcome (user can do X) | Days to weeks |
| Business outcomes | Outcome (revenue, retention) | Quarters to years |

Benchmarks measure at the "agent runs" layer — did the code pass the tests? — with a feedback time of minutes. But the quality signal that matters (customer and business outcomes) has a feedback time of days to years. The maintainability penalty lives at the outcome layer, not the output layer. The discussion's framing: "the goal is not position, the goal is velocity, and maybe acceleration" — how fast can you continuously release and merge code to production, and how safely can you change it without incidents. A benchmark that runs in minutes cannot capture a penalty that surfaces in months.

> [!note] Synthesis: Velocity as the Missing Benchmark Dimension
> The velocity framework connects the benchmark crisis to [[the-slop-problem]]: slop accumulates because the generation layer (minutes) is measured and the consequence layer (months) is not. The right benchmark would measure not whether the model solved a single ticket, but whether the codebase's change velocity is sustained or degrading over a sequence of tasks. This is the wiki author's synthesis connecting the velocity framework to the slop thesis, not stated directly by the video.

### The Proposed Evolving-Codebase Benchmark

[[dex-horthy|Dex Horthy]] originated this benchmark design in his earlier interview (`raw/yt-context-engineering-with-dex-horthy.md`, ~56:55): "can you build a benchmark where the model builds 20 features in a row and maintains the codebase the whole time and it doesn't know what features are coming. You treat it like a real product team where you don't know what you're going to build next week until you get there." The model receives a roadmap of 20 features delivered one ticket at a time, and must evolve the codebase over time, making decisions about extensibility and architectural flexibility without knowing future requirements. The Boundary video discussion later echoes the same proposal (43:23) and contributes the key instruction: "just think really fast if I need to model for other things that might be relevant in the future. Don't do the work. Just make it possible to extend it if we need to." But the specific 20-feature evolving-codebase proposal originates with Dex, not the Boundary video; the Boundary video's distinctive contributions are the RL training constraint and the velocity framework above, which reinforce the maintainability gap rather than introduce the benchmark design.

This is distinct from [[evoarena|EvoArena]]'s persistent environment evolution (which evolves the *environment*) — this proposal evolves the *task sequence* while keeping the codebase persistent. The model must maintain architectural coherence across an unknown future, which is precisely what real software engineering demands and what no current benchmark tests. The proposal acknowledges the risk: a model told to "make it extensible" may over-engineer into Java-style abstraction layers — the same [[over-engineering|over-engineering]] failure mode DeepSWE's trajectory analysis quantified.

### No Benchmark for Human Engineers Either

The discussion argues the benchmark problem isn't unique to AI — there are no good benchmarks for human engineers either. HackerRank and LeetCode are bad proxies: they measure constrained algorithmic problem-solving, not the ability to build and maintain products. The only reliable signal for engineering quality is peer recommendation — "if someone I trust has recommended someone, that is pretty much an instant yes." The discussion suggests models have gotten good enough that the same approach may work for model selection: crowdsourced recommendations from trusted practitioners may be more reliable than benchmark scores. This echoes the call for community-built benchmarks from [[theo-t3gg|Theo]] above, but from a different angle — not "build your own benchmark from failures" but "trust the social signal over the metric."

## The Eighth Axis: Inference-Layer Accuracy Degradation

[[daniel-han|Daniel Han]] ([[unsloth|Unsloth]]) identifies a dimension the prior seven axes do not measure: **the same model produces different accuracy scores depending on which inference provider serves it.** The benchmark crisis isn't just about the benchmark itself — it's about the entire pipeline from model weights to measured score.

### The Evidence

OpenRouter's daily benchmarks show accuracy gaps of 10%+ between providers serving the same model. For DeepSeek V4 Pro, the highest-scoring provider achieves 76.4% on Tower Bench while the lowest achieves 62.4% — a 14-point spread from the *same model weights*. For GLM 5.2, the spread is similarly large. Providers compete on tokens-per-second and cost, not accuracy.

### The Mechanism

Han identifies several mechanisms by which inference providers degrade accuracy:

1. **Uniform quantization**: Providers apply 3-bit quantization uniformly across all layers instead of using dynamic quantization (selectively preserving important layers at higher precision). Unsloth's research shows that a smart 1-bit dynamic quantization can outperform a dumb 3-bit uniform quantization.
2. **Hardware mismatch**: Different hardware (GPUs vs. TPUs) produces different sampling results from the same software stack. Anthropic's September 2025 accuracy degradation was traced to TPU vs. GPU sampling differences.
3. **System prompt errors**: Before model releases, providers may route traffic through models with mismatched system prompts — using a verbose prompt designed for one model with a different model that expects a shorter prompt.
4. **Throughput-first deployment**: Providers prioritize tokens-per-second over accuracy, and users rarely verify accuracy before deploying.

### The Open-Source Reputation Problem

> [!note] Synthesis: accuracy minimizing is the hidden variable in open-source vs. closed-source comparisons
> Closed-source labs control their entire inference supply chain. Open-source models pass through dozens of providers, each potentially degrading accuracy. The "open source lags closed source" narrative is partly a measurement artifact caused by inference-layer degradation. Han argues the gap between open-source and closed-source models would narrow significantly if inference providers prioritized accuracy over throughput.

### Implications for the Thread

This axis compounds every prior axis: even a perfectly clean, well-designed benchmark produces unreliable scores when the inference layer varies. It also compounds [[accuracy-minimizing]]: providers optimizing for throughput create a race to the bottom on accuracy. The fix is partially architectural (standardized evaluation harnesses like DeepSWE's mini-swe-agent) and partially cultural (developers verifying accuracy before deploying, providers publishing accuracy metrics alongside throughput numbers).

## The Call for Community Benchmarks

> [!note] Departure: Skill Popularity as a Benchmark-Crisis Analog
> The [[skill-efficacy]] concept argues that GitHub stars are not a proxy for whether a skill improves agent performance. This is a benchmark-crisis-like problem at the skill layer: the signal developers use to select a skill (social proof) is not aligned with the signal they should use (measured task impact). Kun Chen's example — the "Android Skills" repo with 177,000 stars, evaluated with Program Bench as using 5% more tokens and producing worse results — is a sibling case to SWE-bench Pro's verifier misgrading. The metric is wrong, not the underlying capability.

Theo's video makes a case that developers should build their own benchmarks from real failures:

> "Every time that happens, write it down. Have some notes somewhere where you write down the models you tried, the prompt you used, the tools you were using, and the code base and the hash that you were on... keep a corpus of these failures... you can even create your own mini benchmarks."

This is the [[verifiability]] thesis applied to model selection: if you can verify model performance on your actual tasks, you don't need to trust public benchmarks. The benchmarks that matter most are the ones you build from your own failure corpus.

## Tensions

> [!warning] Benchmark Shelf Life
> DeepSWE launched with GPT-5.5 scoring 70%. Theo notes "A benchmark dropping with a 70% score is a bit scary because that means it's going to hit 100% by the end of the year at this rate." The call for a harder private version is urgent — but creating such benchmarks requires the manual labor of writing tasks and verifiers that DeepSWE's team already invested.

> [!warning] Harness Effect
> All DeepSWE results use mini-swe-agent (single bash tool, shared prompt). This standardizes the comparison but doesn't reflect how developers actually use models. Claude Code, Cursor, and Codex CLI each have model-specific system prompts and editing primitives that may significantly affect performance. DeepSWE's pilot showed mini-swe-agent matches or beats native harnesses on a subset of tasks, but the comparison is limited in scope.

> [!note] Extension: Benchmark substrate must be trace-rich to support harness evolution
> The [[harnessx|HarnessX]] paper (Darwin Agent Team, arXiv 2606.14249v1, 12 June 2026) sharpens the thread's "[[benchmark-contamination|benchmark contamination]]" concern into a *runtime contamination* problem: if the harness can be evolved against the benchmark trace, the benchmark itself becomes the optimization target, and the [[reward-hacking|reward-hacking]] pathology becomes possible. The paper's §7.2 finding — "the richness of the feedback signal bounds the sophistication of evolution that can be safely performed. From scalar reward alone, none of the three pathologies is detectable" — is a *benchmark-design principle*: **benchmarks with only scalar rewards cannot be safely evolved against**. A new class of *evolution-safe* benchmarks is required, with rich traces, behavior-level verifiers, and multi-channel feedback. DeepSWE's "transparent rollouts" and [[evoarena|EvoArena's]] "chain accuracy" metric are steps in this direction; the wiki should consolidate them.
>
> The [[variant-isolation|variant isolation]] result (Global 49.5% → Ensemble 87.4% on GAIA GPT-5.4) is also relevant: ensemble routing scopes the per-task set each variant sees, allowing K harnesses to evolve in parallel without cross-task interference. This is a *form of environment-aware evolution* — the system implicitly recognizes that no single harness is optimal across heterogeneous task sets, paralleling [[evoarena|EvoArena's]] "fourth axis" (persistent environment evolution). The wiki should note that [[harnessx]] inherits the same "no held-out evaluation" limitation as [[deepswe|DeepSWE]] and [[evoarena|EvoArena]]: all reported gains are measured on the adaptation set, with potential overfitting. The benchmarks are not just broken; they are *substrates* for an optimization loop that is also constrained by the same measurement problem.

> [!note] Extension: SMFR as a benchmark that resists the typical failure modes
> The [[multi-agent-illusion]] paper (Jwalapuram, Lin et al., Salesforce Research + HKUST-GZ + UBC + NTU, arXiv 2606.13003v2, 13 June 2026) introduces [[smfr|SMFR]] — a procedurally generated diagnostic benchmark designed to *avoid* the standard benchmark failure modes (contamination, verifier failure, prompt distortion, static snapshots). SMFR is built from real yfinance data, balanced across transaction types and aggregation logic, and immune to data contamination because it is programmatically generated. It is the only major 2026 benchmark explicitly designed for multi-step agentic reasoning with parallelizable sub-tasks. The paper's most important finding: even on a benchmark built to *help* MAS succeed, automated MAS frameworks do not outperform single-agent CoT-SC, and where they do, the cost premium is up to 10×. The implication for the thread: the benchmark crisis is not just about contamination and verifier failure — it is also about the cost-quality Pareto position. A framework that costs 10× and gains 0% is *on the wrong side* of the Pareto frontier regardless of its absolute accuracy. Future MAS evaluations need to report cost-quality Pareto position, not just accuracy. The Expert-MAS result on SMFR (GPT-5: 57.0% → 96.5%) is the control: the same benchmark, the same backbone, the same task — only the architecture changes — and the cost stays comparable to CoT-SC. This is the kind of result that the [[smfr|SMFR]] benchmark enables and that the thread's future iterations should hold the field to.

> [!note] Extension: Agentic vs Non-Agentic Benchmark Design
> The [[scaling-agent-systems|Kim et al. scaling study]] (260 configurations, 6 benchmarks, 3 LLM families) sharpens the benchmark crisis by drawing a sharp distinction between agentic and non-agentic benchmarks. A task is agentic when it requires sequential interdependence, partial observability, and adaptive strategy formation — properties that static reasoning benchmarks (GSM8K, MMLU, HumanEval) lack. The study finds that MAS shows monotonic improvement through ensemble effects on non-agentic benchmarks (89% on HumanEval with 5 agents) because voting corrects errors without sequential compounding. On agentic benchmarks, the dynamics invert: coordination overhead scales with interaction depth and errors cascade. The implication for the thread: MAS evaluations on non-agentic benchmarks produce misleading guidance about agentic tasks. Future benchmarks must explicitly test the agentic properties (sequential interdependence, partial observability, adaptive strategy) or risk measuring the wrong thing. §1 introduction (agentic task definition); §4.2 main results (MAS deltas on agentic vs non-agentic benchmarks).

## Sources

- `raw/deepswe-benchmark.md` — Datacurve's full benchmark description, methodology, audit results, and qualitative analysis
- `raw/yt-context-engineering-with-dex-horthy.md` — Dex's "maintainability gap": no benchmark measures whether a model writes code that improves or degrades codebase maintainability over 3–6 months; SWE-bench trains on reproduce-the-fix, and the cost function of bad architecture can't be caught by a unit test (43:18–43:56, 54:25–56:22). Also the origin of the proposed 20-feature evolving-codebase benchmark — "build a benchmark where the model builds 20 features in a row and maintains the codebase the whole time and it doesn't know what features are coming" (~56:55).
- `raw/yt-ai-code-benchmarks-lied-to-us.md` — Theo (t3.gg): developer perspective, SWE-bench Pro criticism, call for community benchmarks, cost/token analysis
- `raw/2606.13681.md` — Xu et al. (NUS + collaborators, June 2026). *EvoArena.* Exposes the fourth axis: persistent environment evolution. PE/IC/CE triplet. Chain accuracy metric. State collapse failure mode. EvoMem patch-based memory paradigm. Base agents drop 22.1pp from step to chain on Terminal-Bench-Evo; EvoMem recovers 6.1pp of that drop.
- `raw/2606.14249.md` — Chen, Lu, Zhao, Meng, Shao, Luan et al. (Darwin Agent Team, 2026). *HarnessX.* Source for the "trace-rich benchmarks required" extension. §4.2 (the [[operational-mirror|operational mirror]]'s [[reward-hacking|reward-hacking]] pathology is enabled by scalar-reward benchmarks), §4.5 ([[variant-isolation]] ensemble routing as environment-aware evolution on heterogeneous task sets), §6.3 (Global 49.5% vs. Ensemble 87.4% on GAIA GPT-5.4), §7.2 ("the richness of the feedback signal bounds the sophistication of evolution that can be safely performed"), §7.7 (no held-out evaluation; same measurement limitation as DeepSWE and EvoArena).
- `raw/2606.13003.md` — Jwalapuram, Lin et al. (2026). Source for the "SMFR as a benchmark that resists typical failure modes" extension. §3 (cost-quality Pareto position, not just accuracy, as the right MAS evaluation criterion); §3.3 (SMFR procedural generation, immune to contamination); §3.3 (Expert-MAS GPT-5: 57.0% → 96.5% on SMFR, cost comparable to CoT-SC); §6 (the cost-efficiency gap as the central finding).
- `raw/2509.09677.md` — Sinha, Arun, Goel, Staab, Geiping (ICLR 2026). Source for the "Fifth Axis: Horizon Mismatch" section. Proposition 1 (§2.1, H_s = ln(s)/ln(p)); frontier single-turn execution benchmark separating GPT-5 ~2176 / Claude-4 Sonnet ~432 / Grok 4 ~384 / Gemini 2.5 Pro ~120 on a task near-trivial at one step (§3.3); horizon-mismatch as a benchmark failure mode distinct from contamination and verifier error.
- `raw/2512.08296.md` — Kim, Gu, Park et al. (Google Research + DeepMind + MIT, arXiv 2512.08296v3, 8 Apr 2026). Source for the "Agentic vs Non-Agentic Benchmark Design" extension. §1 introduction (agentic task definition: sequential interdependence, partial observability, adaptive strategy formation); §4.2 main results (MAS deltas on agentic vs non-agentic benchmarks; 89% on HumanEval with 5 agents via ensemble effects; inverted dynamics on agentic benchmarks).
- `raw/2606.24775v1.md` — Zhou, Zhou et al. (SJTU + Tsinghua + MemTensor, arXiv 2606.24775, June 2026). *Are We Ready For An Agent-Native Memory System?* Source for the decomposition-thesis callout: argues existing memory benchmarks treat the system as a monolithic black box reporting only end-to-end task-success metrics, and decomposes evaluation into five independently-measured dimensions (task effectiveness, evidence-level retrieval fidelity, dynamic-update robustness, long-horizon stability, operational cost) with single-module ablations — the benchmark-crisis thesis applied to memory-system evaluation. Also independently corroborates [[state-collapse]] ("hallucinations of the past").
- `raw/yt-state-of-agentic-coding-8-with-mario-armin-and-ben.md` — [[armin-ronacher|Ronacher]] on the sixth axis (cost-blind scoring): the cost-of-solving inversion (a model climbs benchmarks yet costs more per solve, observed around the Sonnet 5 release; "the cost of solving problems seems to be going up rather than down"), Terminal-Bench ignoring cost/runtime entirely, and the cheap-tier replacement inflation (price points earlier "cheap" flagships hit are gone; cheap flagships getting more expensive per solve). Source for the "Sixth Axis: Cost-Blind Scoring" section and its [[harness-monoculture]] synthesis callout.
- `raw/why-passing-benchmarks-doesnt-mean-your-ai-wrote-good-code.md` — "AI that Works" episode (Boundary, 2026) with [[dex-horthy|Dex Horthy]] and [[vibv|Vibv]]: full benchmark-generations walkthrough (SWE-bench → Verified → Multilingual → Terminal Bench → Program Bench → SWE Marathon → Frontier Code), the RL training constraint (can't train what you can't verify), the long-horizon penalty, the velocity framework (DORA metrics, feedback-time hierarchy), and the "no benchmark for human engineers" argument. The discussion echoes Dex's earlier 20-feature evolving-codebase benchmark proposal (43:23) and contributes the "think fast … make it possible to extend it" instruction, but does not originate the proposal itself. Multi-speaker source; speaker attribution not verified against audio — claims attributed to the video/discussion, not named individuals.
- `raw/daniel-han-unsloth-kernels-rl-reward-hacking.md` — Han's AI Engineer talk: OpenRouter accuracy benchmarks for DeepSeek V4 Pro and GLM 5.2 across inference providers, dynamic quantization research, SWE-bench Pro LLM-as-verifier critique (8.5% FP, 24% FN), intelligence plateau hypothesis, hardware vs. software optimization thesis, reward hacking examples (timer deletion, GPU mode hack, calculator hacking, GLM 5.2 anti-hacking). Source for the "Eighth Axis: Inference-Layer Accuracy Degradation" section.
