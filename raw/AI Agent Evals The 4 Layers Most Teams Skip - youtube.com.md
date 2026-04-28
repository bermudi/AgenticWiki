---
title: "AI Agent Evals: The 4 Layers Most Teams Skip"
author: "Damian Galarza"
source: "youtube.com"
url: "https://www.youtube.com/watch?v=Kleu3ROhpvY"
date_saved: "2026-04-28T04:29:50.238Z"
---

# AI Agent Evals: The 4 Layers Most Teams Skip

[0:00] How to know if your AI agents actually work.

[0:02] When you're building AI agents, the hardest part isn't getting them to work.

[0:06] It's knowing whether they actually do.

[0:08] You spend time building your agent, you test it yourself,

[0:11] maybe with a few different scenarios, and things look good.

[0:14] So you ship it, but running it and checking the output

[0:17] isn't the same as knowing it works.

[0:20] There's a specific practice that's emerged for exactly this.

[0:23] It's called evals, and it works differently than the testing you already know.

[0:28] Agents don't fail in the same way that deterministic software fails.

[0:32] Things can seem fine when in fact they are not.

[0:35] The output can look correct.

[0:37] The logs can look clean.

[0:39] But the agent made the wrong decision somewhere in the middle.

[0:43] Running it a few times and checking the output will catch the obvious problems,

[0:47] but it won't tell you whether the agent is making good decisions,

[0:50] and that's a harder problem to solve.

[0:52] Unit tests are built around one assumption.

[0:55] Given the same input, you'll get the same output every time.

[0:59] Agents don't work that way.

[1:01] Integration tests assume predictable interfaces, but an agent's interface is natural language.

[1:06] There's no schema to assert against.

[1:09] End-to-end tests assume a fixed happy path.

[1:12] An agent might take 3 steps or 25 to reach the same goal.

[1:16] The natural instinct is to reach for testing tools you already know.

[1:20] The problem is, those tools weren't built for this kind of system.

[1:24] So if they don't fit, what does?

[1:26] The word eval sounds like grading, and grading sounds like a pass or fail.

[1:30] But that's not quite what this is.

[1:32] You can think of it more like a manufacturing QA.

[1:35] You don't test one widget at a time.

[1:37] You sample the batch and measure the defect rate over time.

[1:41] An eval works the same way.

[1:43] It scores on a spectrum, 0 to 1, across dozens or even hundreds of inputs.

[1:49] A response could be 0.7 correct.

[1:51] You're not asking, did it pass?

[1:53] You're tracking whether quality is holding, improving, or degrading across every change that you make.

[1:58] That's essentially what evals are, CI for probabilistic systems.

[2:02] In practice, three things make this work.

[2:05] First, you start with a benchmark set, a curated collection of inputs with known good reference outputs.

[2:11] Next is scoring functions, automated judges that evaluate each response against your criteria.

[2:18] Lastly, there's tracking over time.

[2:20] You'll look at trends rather than snapshots.

[2:23] That's the framework. But what specifically do you score?

[2:27] There are four layers to think about, from the component level all the way up to the system level.

[2:33] The first is the component layer, your tools and functions.

[2:37] These are deterministic. You can test them normally with unit tests.

[2:41] A tool that parses JSON either parses it correctly or it doesn't.

[2:45] Your existing testing instincts can work fine here.

[2:48] The second is trajectory. Did the agent take the right steps? Did it select the right tools? Construct the right parameters? Follow a reasonable reasoning chain?

[2:59] An agent that gets the right answer in 25 tool calls, when 3 would do, has a trajectory problem.

[3:05] And an agent that calls the wrong tool but happens to get the right answer, that's also a trajectory problem, but it will likely become an outcome problem.

[3:14] The third layer is the outcome.

[3:17] Is the final answer from the agent correct, helpful, grounded, and complete?

[3:22] This is the hardest layer to evaluate, because those questions are subjective.

[3:26] You can't write an assertion for helpful.

[3:29] That's where LLM-as-Judge comes in.

[3:31] The idea is straightforward.

[3:32] You use a second language model to evaluate your agent's output.

[3:36] You give it a set of criteria that defines what a good answer looks like for this task.

[3:40] And it scores each response against that rubric.

[3:43] The division of labor here is humans define what good means.

[3:47] The model applies that definition at scale.

[3:50] You get the judgment of a careful reviewer without the cost of reviewing everything manually.

[3:55] That said, automated evals don't catch everything.

[3:58] Regularly reading the production traces directly, reading the actual inputs and outputs,

[4:03] surfaces the subtle failures that no rubric has anticipated.

[4:06] The fourth layer is system monitoring, watching for quality degrading in production at scale.

[4:11] Not individual failures, but patterns across real usage over time.

[4:16] This is where evals and observability start to overlap, and it's where the next video will pick up.

[4:22] There's a specific order to how to use these layers.

[4:25] You want to start from the outside in.

[4:28] Start with the outcome.

[4:29] If it fails, you open the box.

[4:31] But even when it passes, trajectory is worth monitoring.

[4:34] An agent that takes 25 steps when 3 would do is leaving efficiency and reliability problems on the table.

[4:41] Now the layers tell you where to measure, but they don't tell you what quality actually means.

[4:46] For that, there are four dimensions.

[4:49] Effectiveness. Did the agent achieve what the user actually wanted? That's the baseline.

[4:54] Efficiency. Did it do it well?

[4:57] There's a real difference between 25 tool calls and 3, between 10 seconds and 2 minutes.

[5:02] And token costs add up fast when your agent is taking unnecessary steps.

[5:07] Robustness. Does it hold up under pressure?

[5:09] Malformed input, API failures, ambiguous instructions and edge cases.

[5:15] And lastly, safety and alignment.

[5:17] Does it stay within the bounds?

[5:19] Does it refuse to do things when it should refuse?

[5:22] That one's a non-negotiable.

[5:24] Which brings up the real challenge.

[5:26] You can only measure what you can see.

[5:28] You can't measure effectiveness if you only see the final answer.

[5:32] You can't measure efficiency if you don't count the steps.

[5:35] You can't diagnose a robustness failure if you don't know which API call failed.

[5:40] Quality requires visibility into what the agent is actually doing.

[5:44] And that visibility has to be designed in, not added later.

[5:49] Most teams build the agent, ship it, and then ask, how do we test this?

[5:54] That's the wrong order.

[5:55] If your agent doesn't emit structured traces, you can't evaluate trajectory.

[5:59] If it doesn't log tool calls with parameters, you can't measure efficiency.

[6:03] If it doesn't expose intermediate reasoning, you can't diagnose failures.

[6:07] Designing this from the start is an architectural decision, the same way observability and security are.

[6:13] You build it from day one.

[6:16] Design the agent so quality is measurable, then measure it continuously.

[6:21] There's one more dimension to this.

[6:23] What happens over time?

[6:25] Every production failure is a data point.

[6:27] When you capture it and annotate it, it becomes a regression test.

[6:31] The pattern looks like this.

[6:33] Production failures surface problems.

[6:35] You annotate them as eval cases.

[6:38] The eval set grows, and the agent improves.

[6:41] New edge cases surface, and you repeat.

[6:44] The eval set becomes a living record of everything your agent has struggled with.

[6:48] Real failures, real edge cases, real user interactions that didn't go well.

[6:54] Over time, it's the most accurate picture you have of what your agent actually needs to handle.

[6:59] You don't build quality in one pass.

[7:01] You build it incrementally, and it compounds.

[7:05] To recap, evals aren't tests.

[7:08] They're a way of measuring quality over time using scores and distributions rather than a simple pass or fail.

[7:15] Gauging quality has four layers and four dimensions.

[7:18] You measure from the outside in.

[7:22] And quality is something you designed for from day one, not something that you add after the fact.

[7:28] If you want to know where your system actually stands, I put together a one-page scorecard based on the four layers we've covered.

[7:35] Score yourself on each one and you'll know exactly where your gaps are.

[7:39] Link is in the description.

[7:40] The next video in this series covers observability, traces, metrics, and what it looks like when you can actually see inside a running agent.

[7:48] And if you found this useful, subscribe so you don't miss the next one.

[7:51] In the meantime, you can find more videos on building AI agents here.