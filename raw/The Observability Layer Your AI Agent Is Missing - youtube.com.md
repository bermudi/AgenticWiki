---
title: "The Observability Layer Your AI Agent Is Missing"
author: "Damian Galarza"
source: "youtube.com"
url: "https://www.youtube.com/watch?v=JZsJ_BX1Vew"
date_saved: "2026-04-28T04:29:35.125Z"
---

# The Observability Layer Your AI Agent Is Missing

[0:00] AI agents aren't like the software you're used to monitoring.

[0:03] They don't just follow instructions, they make decisions.

[0:06] And that fundamental difference means that the tools you've relied on to understand your systems don't necessarily transfer cleanly.

[0:12] You need a different approach to observability, one built around decision-making, not just execution.

[0:18] I'm Damian, and I've been building software for over 15 years.

[0:22] And recently, I've been running a multi-agent system.

[0:25] My agent, Emma, handles my business operations.

[0:27] invoicing, CRM updates, scheduling, and client communications.

[0:32] Everything I'm about to show you comes from debugging that system.

[0:36] To see inside a running agent, you need three things.

[0:39] Logs, traces, and metrics.

[0:41] This video breaks down what each one gives you and why you need all three.

[0:46] Observability for an agent means being able to see inside its decision-making process.

[0:51] Not just whether it ran, but why it did what it did.

[0:54] That starts with the logs, the foundation of any observability practice.

[0:59] They are the raw record.

[1:00] Every event, every tool call, every model response, time-stamped and stored.

[1:05] But a log entry is isolated.

[1:07] It tells you what happened at that moment.

[1:09] It doesn't tell you why one step led to the next.

[1:12] What the agent was reasoning about.

[1:14] What context it was carrying.

[1:17] What made the tool call the logical next move?

[1:20] Logs give you the individual moments.

[1:22] What you're missing is the thread that connects them.

[1:24] To make this concrete, let me walk you to a real example.

[1:27] I've been experimenting with giving Emma the ability to handle invoicing via the Stripe agent toolkit through a subagent called Ledger.

[1:34] I was onboarding a new consulting client, so I asked Emma in Slack to draft an invoice, have me review it, and then send it.

[1:41] She pulled the client contacts from the CRM, delegated it to Ledger, and came back with a clean draft.

[1:46] Line items, amount, payment terms, everything.

[1:49] I reviewed it in the Stripe dashboard, and everything looked good, so I asked Emma to send it.

[1:54] Emma replied that the invoice was sent successfully with the invoice ID, the amount, and the payment URL.

[2:00] Everything looked good.

[2:01] Three hours later, I realized the client never actually got the invoice.

[2:04] It was finalized, which means it was moved from draft to open, but never actually sent.

[2:09] In Stripe, those are two different states.

[2:11] The invoice was sitting there, open, with no email delivered.

[2:15] When I checked the logs, the Slack message was there.

[2:17] The tool calls were there.

[2:18] There were no errors, no 500s, nothing indicating that something went wrong.

[2:22] If you looked at the logs, every piece of the system said the task was done.

[2:26] The logs did contain the answer, though.

[2:28] Every tool call was recorded.

[2:30] If I'd gone digging, I could have found that Ledger called the finalized invoice tool

[2:34] and never the send invoice tool.

[2:36] But finding it meant scrolling a flat feed of tool calls across three different agents,

[2:40] and then noticing the absence of a call I'd have to already know should have existed,

[2:44] and then piecing together why Emma interpreted the finalization as delivery.

[2:49] The logs had the data, but what I needed was the story behind it all.

[2:52] Logs tell you what happened. Traces tell you why.

[2:56] A trace isn't a more detailed log. It's a different shape entirely.

[3:00] The shape is that of a tree.

[3:02] The root is the top-level task, the thing that the user asks for.

[3:06] Every decision, every tool call, every sub-agent delegation becomes a node in a tree called a span.

[3:12] A named, timed unit of work, with its own inputs, outputs, and status.

[3:17] The connections between spans show you why, not just what the agent did, but how it decided to do it.

[3:23] When something goes wrong, you don't scroll a feed, you walk down the tree.

[3:27] Back to the invoice.

[3:28] I collect traces from my agents using Arize Phoenix, an open source LLM tracing and evaluation platform.

[3:34] When I opened a trace for that send request, I saw Emma at the root.

[3:38] Her first few spans looked normal.

[3:40] Reading the request, deciding to delegate to Ledger.

[3:43] Ledger becomes a child span, and I expand it.

[3:46] Ledger's subtree shows the work that it did for that send request. There's a span for looking up

[3:51] the invoice, a span for checking its status, then Ledger calls Finalize Invoice. That span succeeded.

[3:59] But there's no next step, no send invoice call. The tree just stops. In a log feed,

[4:05] a missing call is invisible. It's the absence of a line. And you'd have to already know it should be

[4:10] there. In a trace tree, you can see everything that Ledger did and can see exactly where it stopped.

[4:17] Next, I walk back up the tree to Emma.

[4:19] Her next span is the tool call where she composes the Slack response.

[4:23] I can read the input, Ledger's result with the status of open.

[4:26] And I can read the output, invoice sent successfully.

[4:30] That's where the trace gave me something to work with.

[4:32] Not necessarily an answer, but a clear thread to follow.

[4:35] Emma had read open as completion, which meant that the question became,

[4:39] what did Ledger actually return and why did it stop where it did?

[4:43] That reasoning step where the model receives an input, interprets it, and generates an output

[4:47] is also a span that you can read in a trace. In logs, it doesn't exist. There's no log entry for

[4:53] model interpreted this field to mean x. The logs had the data, the trace had the story.

[4:59] One is an archaeology project, while the other is a narrative that you can read.

[5:04] If you've instrumented production applications before, none of this is necessarily new.

[5:08] Traces aren't a new concept. OpenTelemetry has been the standard for observability across

[5:13] cloud-native software for years. The same primitives, the same tooling, now apply to

[5:18] agent decision chains. The primitives map directly. The spans, trace IDs, the parent-child

[5:25] relationships, it's all the same vocabulary, just applied to a different object. Instead of tracing

[5:30] a request as it moves through services, you're tracing a task as it's executed by an agent.

[5:35] The structure is the same. What you're looking at is different.

[5:40] The tooling exists and works. Arize Phoenix, Langfuse, Braintrust, Mastra, they all speak OpenTelemetry.

[5:47] They all render to the tree. What's new isn't necessarily the infrastructure, it's what you're looking at.

[5:52] Not a request path, but a decision chain.

[5:55] Once you have the trace, debugging changes shape.

[5:58] You're not searching through events trying to reconstruct what happened.

[6:01] The story is already written. You can open it, walk down a tree, and find a scene where the plot diverged.

[6:07] The leverage isn't more data, it's a better story.

[6:11] Debugging one trace tells you what went wrong in one task, but at scale you're running thousands. That's where metrics come in.

[6:18] Logs and traces answer questions about one task. One run. One invoice.

[6:24] Metrics answer questions about all of them, computed over windows of data, aggregated across thousands of runs.

[6:30] but metrics are derived. They're only as good as the layer underneath them.

[6:35] Metrics built on logs can only tell you system level stories. Metrics built on traces can tell

[6:40] you the story. There are two categories of metrics. The first is what your dashboard

[6:46] already shows you, the health of infrastructure running your agent. The second is what tells you

[6:51] whether the agent is actually doing its job. System metrics include latency, error rate,

[6:57] token costs, uptime. These watch the server that hosts your agent. During Emma's invoice failure,

[7:03] every one of them was green. Latency was normal. The HTTP response from the Slack API came back as

[7:09] a 200. There is nothing for a system metric to flag. Quality metrics tell you the agent is making

[7:15] good decisions. Correctness, trajectory adherence, whether the output actually matched the task

[7:20] required. These are second order. You don't read them off a raw span, but you compute them by

[7:25] running evals against your trace data. If you're not familiar with evals, I covered that framework

[7:29] in part one. I'll link the video here. System metrics watch the machine, while quality metrics

[7:35] watch the agent itself. If you're only watching the system metrics, you're not watching the agent.

[7:41] You're watching the server that the agent runs on. This is where individual traces can become a

[7:46] data set. One trace tells you what went wrong in one task. Quality metrics computed across thousands

[7:52] of traces tell you how your agent is behaving overall, whether correctness is declining after

[7:57] a deploy, and whether certain task types are consistently underperforming, whether the agent

[8:01] is drifting from the behavior you intended. I found that failure because I happened to check,

[8:07] three hours later by chance. Without quality metrics, that's how agent failures get discovered,

[8:12] after the fact. Manually, when someone notices something soft. Aggregate metrics would have

[8:17] caught this pattern across every run, not just the one I stumbled onto. The evals framework only works

[8:24] if you can see what your agent did. Quality metrics are computed from trace data. Evals run on quality

[8:30] metrics. The entire measurement loop, the thing that tells you whether your agent is actually

[8:34] getting better, depends on the observability layer underneath it. You can only measure what you can

[8:39] see. Traces are how you see it. In the next video, I'll walk you through what this looks like in

[8:45] practice. Real code, real traces, and evals tied together with the observability layer.

[8:51] If you found this video useful, give it a like and subscribe so you don't miss the next one.

[8:55] I also have a weekly newsletter where I write about building with AI. Link is in the description.

[9:00] And if you're working through problems like this one on a team,

[9:02] I can help with that too. Everything's linked below. I'll see you in the next one.