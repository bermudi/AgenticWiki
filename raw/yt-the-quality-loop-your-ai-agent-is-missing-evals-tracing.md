---
title: "The Quality Loop Your AI Agent Is Missing (Evals + Tracing)"
author: "Damian Galarza"
source: "youtube.com"
url: "https://www.youtube.com/watch?v=2QWbsEr87QQ&t=145s"
date_saved: "2026-04-28T04:28:15.908Z"
---

# The Quality Loop Your AI Agent Is Missing (Evals + Tracing)

[0:00] I've covered what evals are, I've covered what observability looks like for agents.

[0:03] Today, I'm going to walk you through how to apply it all.

[0:06] We'll add an eval to the meeting assistant, run it in Mastra Studio, and watch it catch a failure that the agent shipped quietly.

[0:12] Then we'll fix it and watch the full flywheel turn.

[0:14] We'll take a look at what observability looks like, inspect some traces, and see some spans in real practice.

[0:20] This video is a paid partnership with Mastra.

[0:22] They're an open source framework for building AI agents with TypeScript.

[0:25] I'll leave a link in the description below.

[0:28] This is the Mastra meeting assistant.

[0:30] The same agent we've been building in the personal AI assistant and the Mastra workspace videos.

[0:35] It does pre-meeting prep for me, researching based off calendar invites, drafts a brief,

[0:40] and posts it to Slack.

[0:42] I'll link to the original videos in the description below.

[0:46] Now I've added some new functionality to it for us to look at today, and that is to build

[0:51] out some post-meeting work.

[0:53] So what happens is I want to take a meeting transcript and pass it in and let the agent

[0:59] pull out some action items for me. So to do that, I have the Mastra Meeting Assistant Agent right

[1:05] here, and we've added a new tool. It's called Extract Action Items. So let's go ahead and take

[1:11] a look. We can see here that we've added the Extract Action Items to the available tools that

[1:16] the agent has. So let's go ahead and take a look at the actual tool definition itself

[1:24] and walk through it. So we can see here that we are importing create tool from the Mastra core

[1:30] tools, and we're defining the action item schema. So this is what an individual action item should

[1:35] look like. It is an object which has a description as well as an owner. Then we define the output

[1:43] schema for the tool itself, which is going to be a object which has a field called action items,

[1:49] And it is an array of those action item schemas that we defined earlier.

[1:54] If we go ahead and look at the actual definition for the tool,

[1:56] we can see here that it's pretty straightforward.

[1:59] We have a description, extract action items from a meeting transcript,

[2:03] returns a list of action items with descriptions.

[2:06] And the input schema is the transcript string.

[2:09] So the actual body of the transcript itself.

[2:12] From there in the execute,

[2:14] we can see we're doing something a little different from the other runs.

[2:17] In this case, we're actually delegating out

[2:18] to a separate agent called the action item extractor.

[2:22] So let's go ahead and take a look at that.

[2:26] So this is the action item extractor.

[2:28] It is an agent similar to the meeting assistant,

[2:30] but a lot simpler.

[2:32] So we've extracted some instructions at the top,

[2:35] V1 instructions, they're pretty vague.

[2:37] Extract action items from this meeting transcript.

[2:40] We are being intentionally vague here

[2:42] so that we can iterate on the results.

[2:45] So we have the ID for the agent, action item extractor,

[2:50] the name, action item extractor,

[2:52] and we're using Claude Sonnet 4.5.

[2:56] Now, before we actually run this,

[2:57] I want to set up some observability

[2:59] so we can demonstrate what that looks like

[3:00] and take a look at the results.

[3:03] If we go to the Mastra index,

[3:06] we can see that I've added a new key

[3:07] called observability on line 29.

[3:10] It is being extracted out into another file,

[3:12] which we'll take a close look at,

[3:14] but this is how you can configure observability

[3:16] for your Mastra instance.

[3:18] Observability requires a storage,

[3:21] which we already have on line 25, so we're all set,

[3:24] but just a heads up.

[3:26] If we go ahead and look at the Mastra docs,

[3:31] we can take a look at what the tracing docs mentioned.

[3:33] So observability for Mastra supports tracing,

[3:36] that's the thing that we really care about right now.

[3:39] And in it, we can configure the various settings.

[3:42] So we can see here that's instantiating

[3:44] a new observability instance,

[3:46] and we have some configs inside of it.

[3:48] So in this case for default,

[3:50] it's giving it a service name and then defining an exporter.

[3:53] So you can use one or more exporters

[3:55] when you're doing traceability,

[3:56] you're not limited to just one.

[3:58] And in this example here, they're actually using two.

[4:00] So they're using the default exporter,

[4:02] which is going to persist traces to storage

[4:04] for Mastra Studio for a locally run instance,

[4:07] or the cloud exporter,

[4:09] which is for sending observability data

[4:11] to the hosted Mastra Studio, which is a recent feature.

[4:15] And if we scroll down,

[4:16] we can see that they also support external exporters.

[4:19] So things like Arize, Braintrust or Datadog.

[4:22] It also supports generically OpenTelemetry.

[4:25] So any service that supports OpenTelemetry,

[4:27] you can send your traces to as well.

[4:29] Now let's take a look

[4:30] at the observability file I have configured.

[4:32] So at the top, you can see we are importing observability

[4:36] and the default exporter from Mastra observability.

[4:39] we are configuring our instance of the observability,

[4:42] very similar to what we saw in the docs.

[4:44] We're keeping it pretty straightforward,

[4:46] configs, default, and a service name.

[4:47] So we're using the service name of Mastra

[4:49] and we're only setting up the default exporter for now.

[4:53] So if we go back to Mastra Studio,

[4:55] we're gonna go ahead and interact with our meeting assistant.

[4:58] I'm gonna go ahead and ask,

[5:00] what was my last meeting?

[5:05] And so here it should go through the workspace,

[5:07] which is configured that has the Obsidian Vault

[5:10] to read through any previous notes and things like that.

[5:13] If you missed that video,

[5:15] I'll go ahead and link it right here

[5:16] so you can check it out.

[5:18] So we can see here that the agent said,

[5:20] I'll search through your notes and find something.

[5:22] So it did list files.

[5:24] We can see where it did it.

[5:26] We can see the results

[5:27] and we can see the context of the meeting itself

[5:30] and what it found.

[5:32] Now on the left here,

[5:33] we can see that there's an observability section

[5:36] inside of the studio.

[5:38] And if we go to traces, we can actually see various runs.

[5:41] So we're gonna go ahead and click the one that I just did,

[5:44] which is when, what was my last meeting?

[5:47] If I bring this open, you can see here

[5:49] that we have a lot of details about what happened.

[5:53] So at the top here, we can see an outline of,

[5:56] there's an agent, model, tool, memory, workspace, and other.

[6:00] So let's start at the top.

[6:01] This is the agent run for the meeting assistant.

[6:04] If we click that, we can see some details

[6:07] about the individual span.

[6:08] So if you remember, traces are made up of individual spans

[6:12] of everything that happened inside of the trace.

[6:15] So this span has an ID,

[6:17] and we can see that the name of it is the agent run,

[6:20] meaning assistant, the type is an agent run,

[6:23] and when it happened.

[6:25] We can see here the input, all the details that went in.

[6:28] So the role of the message was user.

[6:30] So this was my message to the agent,

[6:32] which says it's type text and what was my last meeting.

[6:36] Then if we scroll down,

[6:37] we can see the final output from the agent,

[6:39] which is I'll search through your notes and find things.

[6:44] And then we have some metadata such as the run ID,

[6:46] the resource ID and the thread ID.

[6:50] We can go ahead and take a look at the attributes

[6:52] so we can see everything that was provided to the agent.

[6:55] So here's the instructions for the agent itself,

[6:58] telling it that it has access to the Obsidian Vault

[7:01] and the list of available tools that the agent can see.

[7:05] Now, if we go through the traces,

[7:07] I'm gonna close this out.

[7:08] We can see all of these are more spans.

[7:11] So we can see the working memory span happening.

[7:14] So it has various steps inside of here, phase input,

[7:19] and it goes ahead and here's the output.

[7:21] So again, showing you the message list.

[7:24] Messages is the array and it is just this one.

[7:27] What was my last meeting?

[7:29] as well as the message here from the system.

[7:32] So we can see the collection of messages

[7:35] from the system that came in.

[7:37] The first one is the actual system prompt for the agent,

[7:40] your personal meeting assistant.

[7:42] The next one is instructions on the working memory.

[7:45] So these are the instructions

[7:47] that when you add the working memory package to your agent,

[7:50] it is instructing it how that works.

[7:52] So we can see here all the various meeting memory instructions

[7:56] that come along with it.

[7:58] And here we have the message history.

[8:00] So that's the memory recall

[8:02] where it goes through to look at messages.

[8:06] And then we can see the LLM call.

[8:09] So here's where it actually called the LLM Sonnet 4.5.

[8:13] And that took about 9.8 seconds.

[8:15] So about 10 seconds when it ran.

[8:19] In step zero, we can see that it went ahead

[8:21] and had the workspace instructions processor.

[8:26] And if we go, we can see the skills processor.

[8:31] So this was step zero by the LLM.

[8:34] And we can see where it chunks some texts and does a tool calls.

[8:38] So if we look here inside of workspace list files, we can see this was a tool call that

[8:42] the agent requested.

[8:44] And then we can see the actual output.

[8:46] So we can see here that it found the vault and then everything inside of it as well.

[8:50] So we can see that there were seven directories and eight files.

[8:53] So that was step zero.

[8:54] Step one here is again, some more pieces of the puzzle.

[8:58] So we can see here that it called the read file.

[9:01] It found Vault Daily Notes 2026 0325.

[9:06] And that was the input.

[9:07] And we can see here what it found,

[9:09] the actual output, the file contents itself.

[9:12] So here we can see what happens

[9:14] when Mastra is interacting with files

[9:16] inside of the workspace.

[9:18] So you can see we get plenty of information

[9:21] about what our agent does to help us debug.

[9:24] So if you're ever seeing something that doesn't really make sense,

[9:26] or you're trying to understand why the agent did what it did or what it was working with,

[9:31] traces are a great way of being able to do that.

[9:34] So let's go ahead and bring in an actual meeting transcript and see what happens.

[9:42] So I have added to the repo a fixture for a fake transcript from a call,

[9:49] and we can go ahead and test that out.

[9:52] So I'm going to go ahead and in the meeting assistant, can you extract action items from this meeting?

[10:03] Go ahead and hit that.

[10:06] And so now this should delegate out to the new tool.

[10:10] If we look on the right, we can see here that part of the tools that it has is extract action items.

[10:17] So we can see here it pulled out some action items for us from that call.

[10:20] Jane has four and I have two, as well as some additional context. So now let's take a look at

[10:29] writing some evals. So I want to be able to test the results of this output and see if this was

[10:36] actually accurate. So now let's go ahead and take a look at what Mastra has to offer for evals.

[10:42] So if we go to the docs, we can see there's lots of information of how evals work. So

[10:50] to define scoring of how a prompt or iteration ran.

[10:56] The scores go from zero to one,

[10:58] and Mastra provides several different types of scores out of the box.

[11:03] So if you take a look, they talk about different types of scores

[11:05] and how you might use them.

[11:06] So textual scores, they're used to evaluate accuracy,

[11:10] reliability, and context understanding of agent responses.

[11:13] Classification scores measure the accuracy in, say, categorizing something,

[11:17] or classification scores,

[11:19] handle measuring the accuracy in categorizing data

[11:21] based off predefined categories,

[11:23] and prompt engineering scores are there

[11:25] for exploring the impact of different instructions

[11:28] that you've provided to your agent and how they perform.

[11:31] So there are a built-in set of scores

[11:35] that Mastra provides as well.

[11:37] So there's answer relevancy, answer similarity,

[11:40] faithfulness, hallucination, completeness,

[11:43] content similarity, tool trajectory,

[11:46] All of these, as well as prompt alignment, context quality, and things like that.

[11:51] These are all the different types of scores that Mastra provides out of the box.

[11:55] Of course, you can also build your own custom scores as well.

[11:59] So there are various steps that you can provide, such as pre-process, analyze, generate score, and generate reason.

[12:06] The only one that's actually required is generate score.

[12:11] So now we're back in our Mastra meeting assistant and we are going to define a new score.

[12:17] So we're going to use the create score to build our own custom score.

[12:21] And we're going to need to use some of the tools that they provide.

[12:25] So we're going to import create score and we're going to get get user message from run input and get assistant message from run output.

[12:33] Next thing we're going to do is we're going to define our per item judge schema.

[12:37] So this is the schema for the agent itself, for the judge agent that we're going to run.

[12:41] So we're using LLM as judge here, which means that given the input or output from one agent,

[12:48] we're actually going to pass that over to another agent to evaluate the results and tell us whether it thinks it worked.

[12:55] And so we could see here that for this per item judgment schema, it is an array of items.

[13:02] And for each item, it's going to have the original description for the action item, as well as a score from 0 to 1 and a justification.

[13:10] Let's jump down the line 25, and we can see the judge instructions.

[13:13] So these are instructions that the LLM will have when it's doing its evaluation of how well the run ran.

[13:19] So we can see here the first part is you evaluate whether action items extracted from a meeting transcript are grounded in what the participants actually committed to.

[13:29] And the next piece, we're going to actually define what grounded actually means.

[13:32] So for each action item, decide whether it is grounded in the transcript.

[13:36] An action item is grounded, score of one, if a participant explicitly committed to a specific task during the meeting.

[13:44] Direct quotes or clear paraphrases count.

[13:47] On line 31, we're going to specify what action item is not grounded, score of zero.

[13:51] So an action item is not grounded if any of the following are true.

[13:55] It describes a conditional, like we might, if we have time, we should probably consider.

[14:00] It's a topic of discussion without a clear commitment.

[14:02] It's plausible, but no one actually said it in the transcript.

[14:06] Or it's an inference about what someone should do rather than what someone actually committed to do.

[14:10] For each action item, return its description verbatim, a score of 1 or 0,

[14:15] and a one-sentence justification, quoting or referencing the relevant transcript passage,

[14:20] or nothing if it's absent.

[14:24] Now we're going to go ahead and create the score.

[14:27] So like our agents and tools, it has an ID, it has a name, and it has a description.

[14:32] We're mentioning that this is a type agent, so you can either have for scores, they can be

[14:36] agent-based or they can be code-based instead. In our case, we're going to use LLM as judge.

[14:42] Now we can configure what the judge looks like. So the judge is using model

[14:46] Claude Sonnet 4.5 and the instructions that we were looking at earlier.

[14:51] Now, like we were looking at the docs, one of the things we can do as part of a custom score

[14:54] is run a pre-process step.

[14:56] The reason we're going to do this

[14:57] is so that we can extract

[14:58] some of the information about the call.

[15:00] So here we can see on line 51,

[15:02] we are getting the user message from input.

[15:05] So that's what we can actually extract

[15:06] the transcript that was sent.

[15:08] Then we're going to get the assistant text.

[15:09] So the actual output from the agent itself

[15:11] to evaluate against.

[15:13] And then we're going to go ahead

[15:14] and compile the list of action items.

[15:17] So we can see if we have some assistant text,

[15:19] we're going to parse the JSON

[15:20] because it should have been a JSON response

[15:22] and bring out all of the action items.

[15:25] Then we return that back, the transcript and the action items.

[15:28] Next is the analyze step.

[15:30] So here we can specify per item groundedness judgment.

[15:33] So what we're going to do is go ahead and take those action items and

[15:37] build a string concatenated for each one, including its owner, and

[15:41] include the transcript and extract the item list as well.

[15:47] Now we go ahead and define the generate score part.

[15:50] So here's where we define how the score is going to be done.

[15:53] So what we're doing here is for each individual item, we're going to go ahead and we're going to generate a mean of all the scores that we've given it.

[16:00] So in this case, what I mean by that is that there are, say, five action items.

[16:04] Maybe three of them are accurate or four of them are accurate.

[16:07] But there might be one that was hallucinated and should not be there and it was scored zero.

[16:10] So we want to get the average or the mean in this case of the score.

[16:15] Then we generate a reason.

[16:16] So that's going to go ahead and give a final reason for the score based off all the action items.

[16:20] and include whether which ones were ungrounded and the details about that.

[16:25] So if we go back to our extractor agent, we're going to go ahead and import the score.

[16:30] And we can see here, we're going to add on line 11, the scorers field. So here we can specify a set

[16:36] of scores that are passed as part of the agent. And in this case, this one's going to be the

[16:39] groundedness score. And here, we're going to check and say that the score is the action item

[16:45] groundedness and provide a sampling. So for sampling, we can actually specify when or how

[16:49] how often it runs.

[16:50] In this case, we're using a ratio type.

[16:52] So for us, we're using a rate of one.

[16:54] Every single call will go through the eval.

[16:56] If we wanted to say in production,

[16:58] only run it against a subset,

[17:00] we could specify a sample of say maybe 0.25.

[17:03] So a quarter of the results are run through the score.

[17:07] If we go back to Mastra Studio,

[17:08] I've actually gone ahead and re-asked

[17:10] about the same meeting transcript

[17:11] and let's take a look at what happened.

[17:13] So on the left here, we have our scores

[17:16] and we can see the list of scores available.

[17:18] So here's our action item score.

[17:21] If we click it, we can see some different runs.

[17:24] And if we click this one, we can see the score.

[17:26] So for this run, we got a 0.83 repeating four.

[17:32] So one of the six action items that were generated

[17:35] are actually not grounded in the transcript.

[17:37] One of the action items was create or update a CLAUDE.md

[17:39] to reflect the chosen architecture.

[17:41] And it specified that the owner is Jane.

[17:44] The reason why it got flagged as this

[17:46] is it was that I suggested that this happens.

[17:50] No one actually explicitly committed to doing it,

[17:52] and that's why it's being flagged as a zero.

[17:55] So we can see everything that came through and what happened.

[17:59] Here's the transcript, as well as the individual action items

[18:02] that we extracted and passed into the judge prompt.

[18:05] So now that we have this,

[18:06] we actually have something that we can go against

[18:09] and try to improve our prompt.

[18:10] So let's do that next.

[18:13] So here we are back in the action item extractor,

[18:16] and I've gone ahead and updated the instructions

[18:18] so that we can actually give us some guidelines

[18:20] on how it should perform the extraction

[18:22] of individual action items,

[18:23] hopefully improving our score from the eval.

[18:26] So if we look at the new V2 instructions,

[18:28] it starts at extract action items

[18:30] from this meeting transcript.

[18:31] An action item is something a participant

[18:34] explicitly committed to during the meeting.

[18:36] Direct quotes or clear paraphrases count.

[18:38] Do not include advice or suggestions

[18:40] that the participant never committed to act on.

[18:43] ongoing work or things already on someone's plate, only new commitments made in this meeting,

[18:48] conditional or aspirational statements, things like we might if we have time, next quarter if budget

[18:53] allows, or plausible inferences about what someone should do. For each action item, the transcript

[18:59] must contain an explicit commitment from the owner. So with that in hand, I'm going to go ahead and go

[19:04] back to Mastra Studio, go into our meeting assistant, and have it rerun the action item

[19:09] extraction from that same meeting. So once this is done, we'll go ahead and we'll take a look at our

[19:14] score. And ideally we'll see that we've got a score of one. So the generation is done. Let's go ahead

[19:19] and go back to scores and grab our last run. And here we can see we have a score of 1.0. All five

[19:27] extracted action items are grounded in the transcript. So we no longer have the hallucinated

[19:32] item that was extracted from the previous run. So this was a clear example of what the

[19:39] flywheel for quality for an agent. The code produces some traces, the traces

[19:43] produce some evals, and then the evals produce scorers. The scorers send you

[19:48] back to the code where we can actually feed production failures into the evals.

[19:53] The scorers can send us back to the code so that we can iterate. It gives us

[19:56] something to actually iterate against and have a way to prove whether our

[20:00] results are working. Every production failure can feed into that eval set. So

[20:04] like I said, if you were using a ratio you might flag 25% of all your runs, go

[20:09] against them and see how they're performing. So that way, instead of just a one-off failure,

[20:13] you can see over time how your agent is performing. So the set can get stronger as more and more use

[20:19] cases are added to the system. This is also useful for other scenarios. So like, let's say you need

[20:24] to iterate on your tools, introduce some new ones. Maybe you also happen to upgrade a model because

[20:30] every model can change the behavior of how something's running. And sometimes with things

[20:33] like that, you don't have the confidence to necessarily ship without having something to

[20:37] back it up and test like how your system is actually running. With a system like evals in

[20:42] place, you can actually run and see and demonstrate how things are performing, whether you need to try

[20:46] to evaluate new performance benefits, trimming things, things like that. You have something to

[20:51] a test bench to actually run against and see how things are performing. So this was part three of

[20:56] the agent quality series. Part one was the framework for deciding what to measure, the four layers of an

[21:01] eval stack. Part two was observability, so understanding logs versus traces and metrics,

[21:06] and why you need all three.

[21:08] And here we actually did the loop

[21:09] and I just showed what traces look like

[21:12] inside of Mastra Studio,

[21:13] as well as evals and how you can use that as your flywheel

[21:16] to ensure that you have quality agents in production.

[21:20] All of these things come together to make agents shippable.

[21:23] Mastra Studio provides us all the tools

[21:24] that we need to actually do this

[21:26] from evals and scores to traceability

[21:29] and also extends to being able to use other services.

[21:32] So open telemetry, Phoenix, Langfuse, things like that.

[21:36] If you want to score your own team's agent quality practice

[21:38] against the framework from part one,

[21:39] the agent eval scorecard is live.

[21:41] I'll leave a link in the description below.

[21:44] Now you've seen the full process from one through three,

[21:47] you can go ahead and score yourself

[21:48] and figure out which layer you might have a gap in

[21:50] and what to work on next.

[21:52] If your team is building agents

[21:54] and the phrase we can't see what's happening in production

[21:55] sounds familiar, I work with engineering teams

[21:57] to help with these problems.

[21:59] I'll leave a link in the description below.

[22:01] I'll see you in the next one.