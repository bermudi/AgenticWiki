---
title: "AI Agents Need Workflows, Not Bigger Prompts"
author: "Damian Galarza"
source: "youtube.com"
url: "https://www.youtube.com/watch?v=wxCiVB99kso"
date_saved: "2026-06-18T19:15:40.894Z"
---

# AI Agents Need Workflows, Not Bigger Prompts

[0:00] Something I've been thinking about a lot lately is where the boundary should be between an

[0:03] agent loop and a workflow.

[0:06] Systems like OpenClaw or Hermes agent often try to keep more and more of the process inside

[0:10] the agent,

[0:10] and sometimes that's exactly the right call.

[0:13] But sometimes the path is already known.

[0:15] You don't need more reasoning,

[0:16] you actually just need more structure.

[0:19] That's where I think workflows are still really useful.

[0:21] So in this video,

[0:22] I want to walk you through a real-world example of combining LLM judgment

[0:26] with deterministic workflow steps.

[0:28] And I don't mean just wiring something up like n8n.

[0:31] I mean building it directly into the agent system in a way that's typed, inspectable,

[0:35] and production-friendly.

[0:37] I get a decent number of sponsor emails.

[0:39] A lot of them are noise,

[0:40] but some are worth taking seriously.

[0:42] So what we're going to build is a workflow that triages an incoming email,

[0:45] classifies

[0:46] whether it looks like a sponsorship inquiry,

[0:48] routes it into a sponsor-specific workflow,

[0:51] extracts the relevant details,

[0:53] does some outside research,

[0:54] and applies a few guardrails.

[0:56] And then it drafts a reply in a structured internal brief.

[0:59] So the point here isn't to make one giant agent prompt, have it do everything.

[1:03] And it's also not to just capture a loose process as an agent skill.

[1:07] It's to be explicit about which parts should be model calls,

[1:10] which parts should be deterministic,

[1:12] and how the whole thing fits together in a system you can actually inspect.

[1:15] If you're new here,

[1:16] my name is Damian.

[1:17] I've been a software engineer for over 15 years.

[1:19] And over the last year and a half,

[1:20] I've been spending a lot of time building AI systems

[1:23] and sharing what I'm learning along the way.

[1:25] I've also been using Mastra quite a bit over the last six months to build production AI systems.

[1:30] If you haven't come across it before,

[1:31] Mastra is a TypeScript framework for building AI agents

[1:34] and workflows with things like memory,

[1:35] evals, and observability built in.

[1:38] They're also sponsoring this video,

[1:39] so thanks to Mastra for making this possible.

[1:42] All right,

[1:42] let's go build it.

[1:44] So what we're going to do is build a Mastra workflow for handling this sponsor triage.

[1:49] So here's an diagram that shows what we are going to go ahead and build.

[1:53] So it outlines essentially two workflows that we're going to create.

[1:57] We're going to have one main workflow for classifying the inbox.

[2:01] So what that means is every time an email comes in or we see an email,

[2:04] we're going to

[2:04] run it through this classifier,

[2:06] normalize it, extract some data,

[2:07] and determine where it

[2:08] should be routed to if it needs to be involved in another workflow or an agent or something

[2:12] like that.

[2:13] If it is identified as a sponsor,

[2:15] we're going to route to a sub workflow that is dedicated

[2:19] to handling that piece.

[2:20] So in Mastra with workflows,

[2:23] you can basically break down one workflow into multiple so that you can route things appropriately.

[2:29] And once we've identified that it is a sponsor email, we're going to go ahead and extract some details,

[2:34] send that to a local LLM,

[2:36] have it extract some data like what the company is, maybe a sponsor URL if there is one,

[2:41] do some search and research on it,

[2:43] have some deterministic guardrails applied,

[2:46] and draft a response as well as a brief.

[2:49] And so all of that is going to be split between a couple of different models, which we'll explain a little later,

[2:54] as well as some deterministic guardrails and the actual LLM doing some processing for us.

[3:00] And to do this,

[3:01] I've made a fictitious AI platform that is going to be kind of like our base for trying this out.

[3:08] This is a fictitious company for turning product specs into implementation.

[3:12] So we're going to use this as our demo for building this out.

[3:16] So what we're going to do is we're going to look at the workflow that I've started defining

[3:19] and introduce pieces step by step.

[3:21] So what is a workflow?

[3:23] As described by the Mastra docs, a workflow lets you essentially define complex sequences

[3:28] of tasks into clear structured steps rather than having to rely on the reasoning of one

[3:33] single agent.

[3:34] So you can pull in multiple agents, you can combine deterministic code, you can use different

[3:38] models, things like that to break apart the work in different ways.

[3:43] And so they are typically made up of multiple steps

[3:47] along the way.

[3:48] You can choose two route steps,

[3:50] do different things like suspending and resuming

[3:52] and things like that.

[3:53] So let's go ahead and look at what I have

[3:55] for the initial workflow.

[3:58] So here I've defined an inbox triage workflow.

[4:02] So we're gonna start with that outer loop of,

[4:04] I have an email and I want to figure out

[4:07] what to do with it, if anything.

[4:09] And so you can see we've defined a inbox triage workflow.

[4:12] We're just calling create workflow.

[4:14] We're giving it an ID.

[4:15] It's called the inbox triage workflow.

[4:17] We have a description.

[4:18] Start by making some raw inbox input structured

[4:21] and predictable.

[4:23] And we've defined an input schema

[4:25] and a normalized email schema.

[4:28] So these schemas are just the inputs

[4:31] for what is coming into the workflow

[4:33] and they are using Zod,

[4:34] similar to other pieces inside of Mastra.

[4:36] And then the output is what is gonna be returned

[4:39] out of the workflow at the end.

[4:41] And so we can see that we have a raw input schema,

[4:45] raw email input schema.

[4:47] It's made up of the raw email,

[4:48] a received at timestamp, which is optional,

[4:50] and the mailbox,

[4:51] which is also optional.

[4:52] Then we have the output,

[4:54] which is going to be the sender name,

[4:56] the sender email,

[4:58] the subject of the email,

[4:59] the body,

[5:00] some links that were extracted,

[5:02] and then any metadata that was found.

[5:05] And the next thing we can see is that

[5:07] we've chained a call to then,

[5:10] which is going to call the normalize email step.

[5:12] So let's go take a look at what that looks like.

[5:16] So I've got to head here and open the normalize email step.

[5:18] So we're using create step from the Mastra package.

[5:23] And again,

[5:24] we have an ID,

[5:25] a description,

[5:26] parse raw email text into structured fields.

[5:28] The rest of the workflow can trust.

[5:30] Then we have the input schema,

[5:31] output schema and a state schema.

[5:33] So the state is data that is then used throughout the workflow.

[5:37] So you don't have to keep passing it around.

[5:39] you can store reusable state for the entire workflow to reference over time.

[5:44] And then we have execute.

[5:45] So this is what's actually the function that's going to run as part of this specific step.

[5:50] So we're taking the email and then we're calling a separate normalized email function.

[5:56] And once that returns back the normalized email,

[5:59] we're going to go ahead and set state

[6:01] so that future steps now have access to the normalized email data and we'll return it back

[6:06] as well.

[6:07] So now why did we extract a normalized step function?

[6:10] So the reason for that is so that then inside of email,

[6:14] we can have the actual deterministic code here.

[6:17] And it also allows us to go ahead and write some tests.

[6:20] So on the right,

[6:21] I have some tests written for normalized email.

[6:24] I can go ahead and practice test-driven development,

[6:26] things like that,

[6:27] and have that broken out so that it's easily reusable and testable as I build this.

[6:33] If we go to Mastra Studio,

[6:34] we can actually go to the Workflows tab and we can see all

[6:37] the workflows that we have available to us.

[6:39] We can see the name,

[6:40] the description that we provided earlier,

[6:42] as well as the number

[6:43] of steps.

[6:44] And if we click into here, we can actually see a visual representation of the workflow.

[6:49] Nothing too interesting right now because we only have one step,

[6:51] but we can see the Normalize

[6:52] Email step is here,

[6:54] where the description again,

[6:55] parse raw email text into structured

[6:57] fields.

[6:58] I'm going to go ahead and paste a fixture that I prepared for this to represent an email that's

[7:03] coming in.

[7:04] I'm going to go ahead and hit run.

[7:05] And so that ran pretty quickly in about two

[7:08] milliseconds.

[7:09] We can click input. We can see the input that was provided.

[7:12] And we can also click

[7:13] output and see what was extracted.

[7:15] Our deterministic step was able to extract the sender name,

[7:18] the sender email,

[7:19] a subject,

[7:20] the actual body,

[7:21] and extracted some links from there as well as

[7:23] some metadata.

[7:24] So step one is complete and works pretty well.

[7:27] We can also open the execution,

[7:30] workflow execution as well.

[7:31] And we can see the full body of what happened. We can see the input,

[7:35] the status,

[7:35] and all of the steps here if there were multiple steps.

[7:38] So the next thing we'll do

[7:39] real quick before we dive into more steps here is taking a look at how we would use this, right?

[7:44] So

[7:44] for now,

[7:45] we're going into Mastra Studio,

[7:46] we're going into the workflows to actually execute this,

[7:49] but how would you use this actually in practice?

[7:51] Well,

[7:51] what I've done is I've created a new agent

[7:53] in here called the sponsor inbox agent.

[7:56] And it's just kind of generic actually,

[7:57] where it has an ID,

[7:58] sponsor inbox agent.

[8:00] It has the instructions,

[8:02] your helpful assistant,

[8:03] and we provided some

[8:05] providers for the model.

[8:06] Now, one of the other attributes that we can pass to this is a workflows

[8:10] property where you can actually pass in any workflows that should be available to the agent.

[8:14] And when you do this,

[8:15] this will be exposed to the agent. So if we go back to Mastra Studio,

[8:18] dive into our agent here,

[8:20] we can see workflows right here are presented and available to the

[8:24] agent.

[8:25] So these actually expose tools to the agent for the workflows for them to execute.

[8:31] So

[8:31] if you had, say, instead of having to run through the workflow,

[8:34] let's say I had a conversation where

[8:36] I wanted to invoke this workflow,

[8:38] I could do that with my agent,

[8:40] or again,

[8:41] route it through something

[8:42] like webhooks, anything like that to actually categorize this.

[8:45] So workflows can be exposed to

[8:46] agents as well.

[8:48] So the next thing we're going to do is move on to step two of the classification

[8:51] workflow.

[8:52] And so what that is to then now take the normalized email step and the results from that,

[8:57] and now go through and try to classify this email and to understand whether or not it is actually a

[9:03] partnership email.

[9:04] And so if we look back at the workflow,

[9:07] we've now added a second chain then call

[9:10] to the classify email step.

[9:13] So let's dive into what the classify email step

[9:17] actually looks like.

[9:18] So here we are creating another step

[9:20] using the create step function.

[9:22] And very similar to the first step,

[9:23] we're giving an ID,

[9:24] a description,

[9:25] some input schema and some output schema.

[9:28] And the input that's coming into this step

[9:30] is the return value of the previous step.

[9:32] So the previous step was taking the raw email

[9:35] and basically then going ahead

[9:37] and normalizing it,

[9:38] extracting some data.

[9:39] We're now taking that and passing it along into the classification step.

[9:45] Then if we jump to the classification step itself,

[9:48] we can see that it's very similar to the previous step,

[9:51] which is it has an ID,

[9:52] a description,

[9:52] an input schema,

[9:53] and some output schema.

[9:55] And the next piece is the state schema.

[9:58] So it's picking out the classification true piece from that.

[10:03] And one new piece we've done here is we've attached some scores.

[10:06] So scorers are the system that Mastra provides for running evals against these things.

[10:12] So that's one of the nice pieces.

[10:14] We can go ahead and start decomposing this whole process and attaching individual scorers to how it proceeds.

[10:22] So we'll dive in and take a little closer look at what that score looks like.

[10:25] But we are attaching a classified email score and we have a type of ratio of one.

[10:30] So that means that every time this step gets called, we're going to run it through that score to see how it's been performed.

[10:36] So then the next piece is the actual execution.

[10:39] So here we're extracting the input data and set

[10:42] state from params.

[10:43] And we're going to go ahead and run the classify email function,

[10:46] which we'll

[10:47] dive into.

[10:48] And of course, we're then setting the state.

[10:50] So storing that classification on the state

[10:52] and then returning that classification.

[10:55] So if we go into classification,

[10:57] we can take a look at what

[10:58] classify email actually does.

[11:00] And what I'm going to do is actually I'm going to scroll up here

[11:02] and we're going to focus on the email classifier.

[11:05] So we've defined a new agent in here.

[11:07] And so the agent is the email classifier agent.

[11:10] It's going to be an individual agent

[11:11] that's sole responsibility is to take the email,

[11:14] the normalized email,

[11:15] and identify what type of email it is.

[11:18] So if we take a look at the instructions for the agent,

[11:21] we can see that classify creator inbox email

[11:23] into exactly one category,

[11:25] sponsor inquiry,

[11:26] client lead, existing client,

[11:28] newsletter reply,

[11:29] personal,

[11:30] automated noise,

[11:31] or unknown.

[11:32] And so we have a category boundary where sponsorship inquiry is a brand partnership,

[11:37] a sponsorship,

[11:38] a dedicated video,

[11:39] integrated mention,

[11:40] media kit, things like that.

[11:41] And if an email mentions both a partnership and creator deliverables pricing kit,

[11:46] that it should choose the sponsor inquiry rather than client lead.

[11:51] And as part of that, it's going to return some JSON with a confidence and a reason along with its category.

[11:58] And one of the things we're doing here is we're specifying the model.

[12:01] And for the model for this, I'm actually using a local model,

[12:05] Ministral 3.8B.

[12:07] This is another beneficial piece of workflows is you can,

[12:10] again,

[12:10] decompose what your system

[12:12] is doing into individual pieces and choose which models you're using.

[12:16] So why is that useful?

[12:18] Well,

[12:18] one is cost control.

[12:20] So for categorizing or classifying this email,

[12:24] I don't really need a frontier model or a

[12:26] very expensive or slower model to do this.

[12:28] I can rely on a smaller lightweight model to do the classification and then pass off that

[12:33] classification to the next step.

[12:35] The next step might then involve a frontier model or a bigger

[12:38] model or something like that,

[12:40] that might be slower or just require more resources and pass that along.

[12:44] So we can decompose the effort that's needed to do this whole workflow.

[12:50] Classify email is the

[12:51] actual function that is getting called as part of the step.

[12:53] And we're just calling the classifier

[12:55] agent with generate,

[12:56] and we're giving it the JSON as a string for the email. So remember,

[13:01] that is the normalized email input.

[13:04] Then we have the structured output.

[13:05] So we're defining a schema

[13:07] for what should come back. So what structured output means is we don't want prose back from the

[13:12] agent. We actually want a JSON object back from the agent that we can then work with.

[13:17] On line 40,

[13:18] we're saying draft is we're basically pulling out the classification schema that we

[13:23] defined. So that's a zod schema representing what that structured JSON looks like.

[13:27] And then we parse

[13:28] the response.

[13:29] So parse the response means we're taking the object or JSON that was returned from

[13:32] the LLM, the agent,

[13:34] and parsing it and making sure that it actually does match that schema.

[13:38] Then on line 41,

[13:39] we call reconcile sponsor signals.

[13:42] So what reconcile sponsor signals does

[13:44] is it essentially takes the response from the LLM as well as the raw email,

[13:49] combines the two to

[13:51] establish a determination on whether or not this is a sponsor email.

[13:55] So we're not solely relying on

[13:57] the LLM's judgment.

[13:59] We're going to also use some deterministic checks against the email to see if

[14:03] we believe that via those checks,

[14:05] it is a sponsorship email. So we're combining both the LLM, the

[14:09] non-deterministic check,

[14:10] and the deterministic check to come up with the final answer or solution.

[14:16] So next, let's take a look at that score that I mentioned earlier that we attached to the workflow

[14:20] step.

[14:21] So our score is basically taking a look at the input,

[14:24] which is the email,

[14:25] and checking based

[14:26] off what was given,

[14:28] was it supposed to be classified as a sponsorship email or not?

[14:33] And so if it's a

[14:34] score of one, that means clear sponsorship inquiry was classified correctly.

[14:38] Or if it's not,

[14:39] then it

[14:40] was not classified as a sponsorship inquiry like it should have been.

[14:43] And to take a better understanding

[14:45] of what that means, let's take a look at the test.

[14:47] So this test is testing the score itself,

[14:49] not the

[14:50] agent.

[14:51] So we're saying here on the first scenario,

[14:53] it passes when a clear sponsor inquiry is provided.

[14:57] So we have a score, we call score.run,

[15:00] we give it the input,

[15:01] which is the email fixture that I've

[15:04] been working on,

[15:05] and then the output.

[15:06] So we're stubbing basically the output to verify how the

[15:09] score behaves.

[15:10] So the output from the model we're saying was sponsor inquiry,

[15:14] the confidence was 0.92,

[15:16] Email asks about a partnership,

[15:18] and the routing is,

[15:19] it's expecting to be routed to the route sponsor.

[15:23] No,

[15:23] and no warnings.

[15:24] And so we expect that given that input and output,

[15:27] the score should be one.

[15:28] Because we've given it a sponsor email,

[15:30] the output was that it categorized it as a sponsor email,

[15:34] so therefore it should be a one,

[15:35] and the reason should contain classified correctly.

[15:38] Then on line 24,

[15:39] if we take a look at the next case,

[15:41] this is the failing case where it doesn't properly tag it,

[15:44] where we say,

[15:45] again, same sponsor email,

[15:46] where we expected it to be categorized in that manner,

[15:49] but the output was actually client lead,

[15:51] and it says 0.93 for confidence,

[15:53] and it says the reason

[15:55] email asked about a partnership.

[15:57] And instead, it routed to action,

[15:59] review required.

[16:00] And here,

[16:00] it was a score of zero because it didn't actually flag it as the correct kind of classification.

[16:06] And so one of the things I forgot to mention as part of the step for classifying is that

[16:12] one of the pieces of that classification in that schema is the routing.

[16:18] One thing we didn't take

[16:18] a closer look at was the classification schema. So what we're expecting to return back from that step.

[16:23] So let's take a quick look at that, which is going to be the category.

[16:26] So what type of category was

[16:27] established? So was it a partnership email?

[16:29] A confidence,

[16:30] like we saw in the score,

[16:31] which is

[16:32] showing what the confidence level the LLM had for that piece,

[16:36] the reason,

[16:37] and then routing.

[16:37] The routing

[16:38] is what's going to be used later on in the following steps to understand where to go from here. So if it

[16:44] is a sponsor,

[16:45] route it to the sponsor piece.

[16:47] Or does it require review or is it just something we're

[16:49] going to ignore altogether?

[16:51] So if we go back to workflows in Mastra Studio,

[16:53] we can see that now

[16:55] number of steps is two for our triage workflow.

[16:58] If we click into it, we can now take a look and we

[17:01] see that there is now the additional step in our visual representation.

[17:04] We have classified email.

[17:05] So use a small local model for one narrow judgment,

[17:08] then attach deterministic routing.

[17:11] Let's go ahead and run that workflow with our fixture and see what happens.

[17:15] So it ran through

[17:16] and normalized the email that happened in about one millisecond. And then we ran classified email

[17:21] and passed it along. So again,

[17:23] if we take a look at the input here, we can see that the input to

[17:27] the classified email was the parsed email from the first step.

[17:32] And then if we take a look at the

[17:34] output,

[17:35] we can see that yes, it identified it as a sponsorship inquiry and it has a confidence

[17:39] level of 0.99 and didn't really provide a reason,

[17:43] but has a route sponsor as the routing step.

[17:48] So let's go ahead and take a look. I've also have Mastra Studio running with the traces and

[17:53] observability.

[17:54] We can jump into the actual call for the classify email step. So we can see here

[18:00] that the classify email score ran.

[18:03] And if we take a look at the triage workflow,

[18:07] we can actually see a breakdown of these steps.

[18:09] So normalize email was here

[18:11] and I can click into the classify email

[18:15] and take a look at what the tracing ended up showing,

[18:18] the input and the output.

[18:20] So we can also see the attached scoring that happened.

[18:23] So our eval ran on this run

[18:25] and it came back with a score of one.

[18:28] And we can always save this item as a data set item for proving that this is one of the pieces.

[18:33] So we can go ahead and create a data set if we wanted to for future running of,

[18:37] say, future scores.

[18:40] And so there we have a look at the observability piece that also ties into here as part of the scores and the workflows and the steps.

[18:51] So let's move on to the next step and decide what to do based off the result of that classification.

[18:57] Okay,

[18:58] the next thing we're going to do is look at the next step of the workflow where things kind of get interesting.

[19:04] So I've gone ahead and set up a few different steps here so that we can kind of walk through what it all is going to look like and where things are going.

[19:12] So what's interesting is now we're going to actually introduce some conditional logic into our workflow where we start doing some branching.

[19:19] So the first thing that's been added to the InboxTriage workflow is this step where we are mapping over the input data and extracting the get step results helper that is provided to us.

[19:32] So we're doing that so that we can get the original email from the normalized email step.

[19:36] So this is a helper that Mastra provides inside of steps like this,

[19:41] where you can actually say, I want to reference a piece of data from or the result from a previous step.

[19:47] So we're getting that.

[19:48] Then we're going to take that and basically combine that with the classification,

[19:51] which was returned as the classified email step,

[19:55] and combine them together into the classified email schema and parsing it with Zod to make sure that it fills that schema.

[20:03] From there, we're going to move on to the branching step.

[20:05] So here's where we start branching and doing some switching based off the results.

[20:11] So Mastra workflows provide a branch helper.

[20:14] And what this does is it lets you,

[20:16] as the name kind of indicates, it lets you do some branching logic based off the results of, say, other steps.

[20:22] In this case, we have two different versions of a branch where we can go in one of two directions.

[20:27] This is an array of branches,

[20:30] and you can have as many as you want.

[20:32] In this case, we're just having two.

[20:33] But as you can imagine, if I wanted to do different things based off the type of classification an email has,

[20:38] So instead of a sponsor,

[20:39] maybe it's a client email,

[20:41] I could add another branching step here to do something else in that manner.

[20:45] So the branch takes an array and each item in the array should then be also an array or a tuple where it is a function which should return true or false to evaluate.

[20:56] And the other piece is what should happen if that branch or if that function returns true.

[21:03] So what's going to happen when this gets to this branch is the first one that returns true is going to be the one that's evaluated on the right.

[21:09] So to make that a little bit more concrete, the first example here is it's going to take the input data,

[21:14] which was passed in from the previous step, and it's going to grab that classification.

[21:19] And from there, there are a couple of properties called routing and action.

[21:22] And if the action is equal to route sponsor,

[21:25] what it's going to do is it's going to send it down into a nested workflow.

[21:30] So the nested workflow here is the sponsor triage workflow,

[21:33] which we'll dive into a little later.

[21:34] But that's where actually all of the pieces for what should happen when it is a sponsor email should start happening.

[21:40] So it's going to go through there and actually start handling the classification or generating response,

[21:45] doing some research,

[21:46] things like that.

[21:47] So that's if this piece is true.

[21:49] Now, our next branch is basically what happens if it's not true.

[21:52] So in our case right here, it's just going to move to a review required step.

[21:56] And so before we dive into what those steps actually look like,

[21:59] let's go ahead and look at Mastra Studio

[22:01] so we can kind of visualize what this looks like.

[22:03] So here we are in Mastra Studio,

[22:06] and we can see our workflow,

[22:08] and it's gotten a little bit bigger, right?

[22:09] So we have normalized email,

[22:11] we have the classify email,

[22:13] we have the mapping that I mentioned,

[22:15] and then we have our branching.

[22:17] So you can see these when blocks.

[22:19] So the first one, when the input classification routing action

[22:23] is route sponsor,

[22:24] It's gonna go ahead and move down this chain,

[22:27] which is the sponsor triage workflow.

[22:28] And you can see here it's labeled as a workflow.

[22:30] So sponsor triage workflow could be run as its own workflow

[22:34] or can be a sub workflow.

[22:35] And that's how we're using it in this case.

[22:38] And then there's the review required

[22:40] if it's not equal to that.

[22:41] And then lastly, we have a final step

[22:42] that basically takes the results of either one of them

[22:44] and basically compiles them for use.

[22:46] So if we go back to the workflows,

[22:49] you can see we have the sponsor triage workflow here.

[22:52] We'll dive into that a little bit more,

[22:53] but you can see each of these workflows is there.

[22:55] And if we go back to our agent here,

[22:58] only the inbox triage workflow is part of that

[23:01] 'cause that's the only one I've exposed to the agent.

[23:03] The sponsor workflow is not really meant

[23:05] for consumption by the agent,

[23:07] it's meant to be a sub workflow.

[23:08] So that's why we're not gonna go ahead and add that there.

[23:12] So we dive back in and let's take a look

[23:14] at the sponsor triage workflow.

[23:19] So inside the sponsor triage workflow,

[23:21] very similar to what we had before,

[23:22] we have some schemas defining like what the input's

[23:24] gonna look like,

[23:25] what the output's gonna look like,

[23:26] and what the state looks like.

[23:28] Then we have already one step and a map.

[23:31] So the first step is going to be to extract

[23:34] the sponsor detail step.

[23:36] Up until this point,

[23:37] we've taken an email,

[23:38] we've normalized it, and we've classified it

[23:40] to potentially be a sponsor email.

[23:42] Now what we wanna do is in the case

[23:44] where it is a sponsor email,

[23:45] we wanna actually try to extract the sponsor details

[23:48] out of the email so that we can do something with it.

[23:50] And so that's what this step is going to do.

[23:53] So if we dive into that step,

[23:54] it's a little bit similar to the classification step

[23:57] where we are going to take the params,

[23:59] which is input data and set state,

[24:01] and then we're gonna call this extract sponsor details.

[24:04] So we're inside the sponsor details module

[24:09] and we have a new agent that we're defined.

[24:11] So again,

[24:11] very similar to the classification step,

[24:13] we're now going back to leveraging an LLM

[24:16] to do one very specific task.

[24:18] We're going to use Ministral again,

[24:20] 3.8B,

[24:22] and point to my local model.

[24:24] Because again, it's kind of a classification set.

[24:26] We're trying to extract some data from a text email.

[24:29] So that's something that should be very straightforward for a model like this to handle.

[24:33] And so we've given our instructions to the agent.

[24:35] Extract sponsor inquiry details from a creative partnership email.

[24:38] Return only grounded facts from the email.

[24:41] Budget status must be not provided unless an actual budget or range appears.

[24:44] Do not invent customers,

[24:46] case studies,

[24:46] security proof,

[24:47] or funding.

[24:48] put missing commercial proof or information in missing information,

[24:52] and keep notable claims as sponsor provided claims,

[24:54] not verified facts.

[24:56] So very similar to the classify email stuff,

[24:58] we're going to go ahead and call the generate function on that agent,

[25:01] pass it the stringified version of the email,

[25:04] and get back some structured output.

[25:06] So we're telling it we want some JSON back

[25:08] following the schema for sponsor detail schema.

[25:12] jsonPromptInjection: true.

[25:14] What that tells that is for the,

[25:16] when it's calling it,

[25:17] it's gonna actually inject the JSON schema

[25:19] into the actual prompt as well.

[25:21] And then from there,

[25:22] we're gonna go ahead and return the results.

[25:25] So back to our extract sponsor details step,

[25:28] we're taking that and we're extracting all the data.

[25:31] We're taking the original input data that we were given.

[25:34] Then we're going to extract a sponsor intent,

[25:37] which is gonna take the classification category

[25:40] and the confidence and the reason

[25:42] and put it inside of sponsor intent.

[25:44] And then we're gonna return the sponsor details

[25:46] inside of that object too.

[25:47] So we're compiling all of that data into one object

[25:50] to be passed on to the next piece.

[25:54] Then we have a map if we go back

[25:56] to the sponsor triage workflow

[25:58] where we basically parse that data from it

[26:01] and go from there.

[26:02] We just return that out.

[26:03] So we're just kind of confirming that.

[26:04] That's a bit of a placeholder for now

[26:06] until we move on to the next step.

[26:10] So if we go back to Mastra Studio,

[26:11] we'll look at that.

[26:12] If we click into the workflow,

[26:14] we can hit the view nested graph.

[26:16] And here on the right, we can see the details

[26:19] of what that looks like.

[26:21] So again,

[26:21] if I wanted to, I could just go here

[26:23] and look at that and it's the same thing.

[26:26] Now we're gonna go through and run our sample email

[26:29] and see what happens.

[26:30] So we can see here that it normalized email

[26:32] just like before,

[26:33] classified it, classified it correctly,

[26:36] and we can see the routing happening in progress.

[26:39] So we can see that it ran through the entire thing.

[26:42] We can look at the sponsor triage workflow

[26:45] and the nested piece all around.

[26:47] And on the right here, we can see every step.

[26:49] And if we open the workflow execution,

[26:51] again, we can see all of the steps that happened

[26:54] where it goes from normalized email to classified email

[26:59] to the mapping and continues down

[27:02] to the sponsor triage workflow and the sub steps.

[27:07] So you can see it kind of prefixes the rest of these

[27:10] for the nested workflow.

[27:10] So sponsor triage workflow extract sponsor details there.

[27:14] So the whole body of everything that we've had going through.

[27:19] So let's dive into here and look at the output

[27:22] from the sponsor triage workflow.

[27:24] We can dive in, we see the normalized email,

[27:26] we see the classification,

[27:28] and there's no sponsor brief though.

[27:30] So let's take a look at what might have happened there.

[27:35] We go back,

[27:36] we can bring this up

[27:38] and we can actually see the run from before.

[27:42] So if we need to see more details

[27:43] bit more closely we can go back to the workflows view and dive in and so here we can see that it

[27:49] did extract the sponsor details so it found the brand DevFlow AI my fictional brand we can see who

[27:55] the sender was with their name their email what the product category seems to be some sponsor

[28:00] intent create partnership for educational concept deliverables what they are a budget status which

[28:06] is not provided a timeline status not provided they did offer a demo and it extracted the url

[28:11] for their website,

[28:13] as well as some notable claims.

[28:14] So we can see right now,

[28:15] the sponsor details are getting extracted

[28:17] and we can now use that in our next step

[28:19] to do some research and things like that.

[28:22] So let's move to the next piece of the workflow

[28:24] inside the sponsor triage workflow.

[28:26] Okay, now that we've gone through all those steps

[28:28] and now's the time to wire it all together

[28:30] to do the actual interesting part for the sponsor.

[28:34] So I've broken this down into a few steps here

[28:36] to put it together so we can kind of close things out.

[28:39] And what we're gonna do

[28:40] is we're gonna be using a service called Tavily.

[28:43] And if you're not familiar,

[28:44] it is a search provider

[28:46] that you can give agents to connect them to the web.

[28:48] They're not sponsored or anything,

[28:49] but I have used them a bit in the past.

[28:51] And so for example,

[28:52] if I go here and I give them

[28:54] my Lovable app that I built for the fictional company,

[28:57] and I hit send a request,

[28:58] I can actually get the results back as a URL,

[29:02] the title,

[29:02] and then raw content,

[29:03] which is in this case,

[29:05] markdown for the page.

[29:06] So it turns the entire page into markdown

[29:09] that I can then use and feed into the LLM.

[29:11] So we're gonna use that.

[29:12] And we're also gonna use the search feature

[29:14] which allows us to just kind of run a query

[29:16] and get some results.

[29:18] And so we've added,

[29:21] after the extract sponsor details steps,

[29:22] we've added the Tavily extract sponsor URL step,

[29:27] Tavily search corroboration step.

[29:29] Then we're gonna do a score sponsor fit step

[29:32] and apply a guardrail step.

[29:33] From there, we basically take it all together

[29:36] and generate a JSON object using our parent workflow output schema to return it back,

[29:43] including the markdown of the decisions and a recommendation and all of that.

[29:48] So let's take a look at each of those steps a little bit quickly to see what they do.

[29:52] So the first one is the extract sponsor URL.

[29:55] So this one's just going to delegate out to extract sponsor provided claims.

[30:00] And that's in a module for Tavily.

[30:02] And here we have a couple things.

[30:03] So what we're looking at right now is the extract sponsor provided claims.

[30:08] So what that does is it takes that URL that we extracted from the email.

[30:11] So presumably the website for the company that is looking for a sponsorship.

[30:16] We fetch that website using the extract API that we mentioned and pull out the data to

[30:21] pass it back to the LLM.

[30:24] So what we're going to do is we're going to actually extract some of the contents in there

[30:27] to see if there was anything in there.

[30:29] So you see that the strength is moderate.

[30:32] And we put some notes that this is sponsor provided source.

[30:35] It's useful for claims, but it's not independent proof,

[30:37] right?

[30:37] This is data that's coming from their website.

[30:38] We can't just say that that is fully accurate.

[30:40] We need to do some diligent research.

[30:44] The next piece was the search corroboration step.

[30:47] So here is where we're going to take the details about the brand,

[30:51] like say their name,

[30:52] and do some research on them.

[30:53] So we're going to use the search API instead for this.

[30:56] So that's where the search external corroboration happens.

[31:00] So Search External Corroboration uses their search API,

[31:05] where we take the query and we

[31:08] basically send that request off to get some search results for that company.

[31:12] And then we can do some diligence on our own to compile that and make a decision,

[31:17] collecting

[31:17] a bunch of evidence based off what is found and what's in there.

[31:20] And so all that's going to come back as part of our research.

[31:24] Now,

[31:25] once that's all done, we've gotten the sponsor's website or the brand's website itself.

[31:29] And then we've gotten the corroboration step with the search results.

[31:32] Now we're going to go ahead and do a score for the sponsor fit step.

[31:37] So from here, we're going to call the score sponsor fit,

[31:40] which is inside of scoring.

[31:41] So here's where we spin up another agent dedicated to the scoring opportunity.

[31:47] So it says to score a sponsor opportunity for a creator using a provided email extraction

[31:51] and the research evidence.

[31:52] So what we're going to do is we're going to take everything we've gotten so far and pass that to a new LLM, to a new agent,

[31:58] to have it now do an evaluation based off all of the pieces of the content that we've gotten.

[32:03] We've gotten the normalized email.

[32:05] We've gotten a classification.

[32:06] We've done some research on the brand.

[32:08] We have their URL,

[32:09] and we have some supporting evidence.

[32:11] So we're going to take all of that.

[32:13] In this case, what I would likely do is put some details about, say, my YouTube channel or what I'm writing about so that then the LLM could also be like, okay, like,

[32:21] this is my audience.

[32:22] They care about X, Y, or Z.

[32:24] Does this actually match the fit?

[32:26] Is it a reputable brand?

[32:28] Things

[32:28] like that. But right now we've kind of kept it a little high level just for demonstration purposes.

[32:32] So,

[32:33] and then the next piece here is we've defined the model.

[32:35] So this is the first time we're using

[32:37] a different model. So we're going to use Qwen3.6 35B and use that as our model. So it's a more

[32:43] powerful model than the Ministral model because we're now taking this compiled data and we want

[32:48] to do some more advanced kind of reasoning over it.

[32:51] So again, we could use a frontier model,

[32:53] maybe Opus or Sonnet or Haiku or something like that.

[32:56] But I think that Qwen will be just fine to

[33:00] do what we need here and handle that.

[33:02] So in the score sponsor fit piece,

[33:05] we're just,

[33:05] you know,

[33:05] again,

[33:06] calling that agent,

[33:07] calling generate,

[33:08] passing in the stringify JSON for everything.

[33:11] So again, sponsor details,

[33:12] sponsor provided evidence and the external corroboration.

[33:15] And then we're going to get back some structured output from the agent.

[33:22] Next up is the apply guardrail step.

[33:25] So if we go back to scoring,

[33:26] applied guardrails is essentially where we're going to do a little bit of deterministic review of the results to make sure that everything kind of lines up the way that we expect it to.

[33:36] And we're not fully just relying on the LLM's output.

[33:39] So we're going to check on some core pieces and make sure that the scores kind of line up

[33:44] and make sense for our determination and kind of go from there for our evaluation determination.

[33:52] Let's go ahead and do another run and run the entire classification piece.

[33:57] So we're going to normalize.

[33:58] We can see our steps here for classification and a bunch of steps that are going to have

[34:02] to run through for the sponsor triage workflow.

[34:06] And on the right, we can see all of them happening.

[34:08] So it's in the middle of that.

[34:10] It's gone and extracted the sponsor details.

[34:12] It's gone ahead and extracted the URL from the website that was found in the email.

[34:18] It's gone ahead and done the search corroboration,

[34:21] the sponsor fit,

[34:22] the guardrails,

[34:23] and finally

[34:24] returning back that mapping.

[34:26] And so if we go ahead and click into,

[34:29] say, sponsor fit,

[34:30] we can see the scores that were

[34:35] provided.

[34:36] So it said audience relevance was a five.

[34:38] Product credibility is a three.

[34:40] Content naturalness is a four.

[34:42] Reputation safety is a three.

[34:43] And commercial clarity is a one.

[34:45] Makes sense because it's a fictional brand that doesn't actually exist.

[34:48] So I think it did a pretty good job.

[34:50] It did note that the audience relevance is high because it's related to AI and targeting builders.

[34:55] But the creators,

[34:57] but the rest of it does not necessarily line up.

[35:03] So now we go back to the sponsor triage workflow.

[35:06] We can see the kind of final pieces of the puzzle.

[35:09] So we have two new steps, draft sponsor reply step and a render sponsor brief step.

[35:16] So if we take a look at the step for drafting the reply,

[35:19] we can see that it's going to go ahead and call the lib and reply policy.

[35:25] So here is a basically a string JSON template for the response.

[35:30] So nothing very specific.

[35:32] It's kind of just putting that together.

[35:34] Again, you could use an LLM here instead to basically take that data and generate a more

[35:39] customized email.

[35:40] That's probably what I would actually do in practice.

[35:42] But for this purposes, we can go ahead and kind of just use this as an example.

[35:47] And then we're going to render the sponsor brief step.

[35:51] So here's where we take all of the data that we got,

[35:55] and we're going to pass it into this

[35:56] render sponsor brief to put it together.

[35:59] And so what that looks like is it's,

[36:01] again, a JSON template,

[36:03] but basically a more structured report that can be then presented to the user,

[36:08] me,

[36:08] to understand what happened.

[36:10] So,

[36:11] again, might use more of a LLM to kind of generate this.

[36:14] It could maybe be combined into the score sponsor step.

[36:18] But this kind of shows you how you can break all of these pieces out into individual pieces and use different LLMs, different tools,

[36:26] and break it all apart.

[36:28] Let's go ahead and give it one more run with all of the pieces so we can kind of see at the end what we get back.

[36:36] So the map at the end here is going to take the final output and show us what we've been given.

[36:43] So taking everything that we've had and then including the external corroboration,

[36:50] everything like that.

[36:51] And we can see the draft reply and some markdown for the sponsor triage brief of all the information,

[36:59] including recommendations,

[37:00] what needs review,

[37:01] what it found, and everything using our template and that brief.

[37:06] So at the end here, you can now take those results from this workflow,

[37:09] present it to the user somehow.

[37:11] If it's a chat client,

[37:12] you know, in adding it to the content of the chat window or something like that or delivering it to Slack or some other mechanism.

[37:19] But basically,

[37:19] now the agent or your system can now take that and put it to good use in some place.

[37:26] So that's how we've gone ahead and taken a larger workflow,

[37:30] broken it up into multiple steps,

[37:32] used different models to accomplish that goal,

[37:35] and used some deterministic pieces.

[37:37] So we blended some deterministic ruling as well as routing with some LLMs in different calls to do very specific jobs altogether.

[37:46] So we kind of get the best of both worlds where we have the LLM to do things that are good,

[37:51] where it's good at, you know,

[37:52] analyzing some content, some freeform data,

[37:54] coming up with a brief,

[37:55] reporting that,

[37:56] and blending the deterministic pieces where it makes the most sense,

[37:59] where we know exactly what we want and how to kind of route it.

[38:03] Hopefully this gives you a feel for where workflows fit really well.

[38:06] In this case, we still wanted model judgment,

[38:07] but we didn't want one agent to be pulling the whole process in its head.

[38:11] We wanted explicit steps,

[38:12] some explicit routing,

[38:14] deterministic guardrails,

[38:15] and something we could actually inspect.

[38:17] That's what I like about workflows in Mastra.

[38:19] And to be clear,

[38:19] what we built here is pretty small slice

[38:22] of what Mastra workflows can actually do.

[38:24] We use sequential steps,

[38:25] nested workflow,

[38:26] scoring,

[38:27] and traces.

[38:27] There's a lot more there around control flow,

[38:29] agents,

[38:30] tools,

[38:31] snapshots,

[38:32] suspend and resume,

[38:33] human in a loop,

[38:34] time travel,

[38:34] and scheduled workflows.

[38:36] So if this clicked for you,

[38:37] I'd spend a little more time in the docs,

[38:38] which I'll link in the description below.

[38:40] And if you want more content from me on production AI systems

[38:43] and how I think about building them,

[38:44] I write about that a lot in my newsletter as well.

[38:47] I'll leave a link in the description.

[38:48] Thanks for watching and I'll see you in the next one.