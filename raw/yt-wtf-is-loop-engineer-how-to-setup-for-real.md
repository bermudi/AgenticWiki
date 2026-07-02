---
type: youtube
url: https://www.youtube.com/watch?v=W6x-hb44C0c
title: "wtf is Loop Engineer & how to setup for real"
channel: AI Jason
date: 2026-07-02
ingested: 2026-07-02
---

# wtf is Loop Engineer & how to setup for real

[0:00] Thanks HubSpot for sponsoring this

[0:02] video.

[0:03] It was about 1:00 a.m. yesterday and

[0:05] there were a whole bunch of PRs keep

[0:07] submitting to our codebase. And that's

[0:09] not because we work extremely hard. It

[0:11] was all the different agent loops that

[0:13] is automatically finding issues and

[0:15] picking up the work. And I even have

[0:16] this Go loop has been running for past 2

[0:18] days straight where every day is

[0:20] outputting 20 to 40 extremely

[0:22] high-quality page that's driving traffic

[0:24] to my company without me looking at it.

[0:26] And this is what I want to talk about

[0:27] today, the loop engineer. It is the

[0:29] hottest thing everyone was talking about

[0:30] last week that you shouldn't no longer

[0:32] prompting the coding agent anymore.

[0:34] Instead, designing loops that

[0:36] automatically prompts agents. And in

[0:38] this video, I want to explain what loop

[0:40] engineer actually is, what are core

[0:41] components and tips to making sure the

[0:44] loop actually works well, as well as how

[0:46] my team has designed loop in a way that

[0:48] it actually compounds. Before we go

[0:50] deeper, I want to quickly mention

[0:51] something useful, especially if you

[0:53] haven't built any agent before, because

[0:55] what I'm talking about today is the loop

[0:56] engineering harness share memory can

[0:58] sound a bit advanced. But, underneath

[1:00] all this, the basic pattern is actually

[1:02] quite simple. Every agent still comes

[1:04] back to three things: a programming

[1:05] language agent loop, the memory layer,

[1:07] and tool access. And HubSpot has these

[1:09] free video courses that walk you through

[1:11] the foundation in very practical way. It

[1:13] shows you how to build an agent from

[1:15] scratch using different type of tools,

[1:17] including personal assistant agent that

[1:19] reads email and check your calendars,

[1:20] and support style agent that connect to

[1:22] real business workflow. And through

[1:24] those examples, you get much better

[1:25] understanding about how the agent memory

[1:27] works, how to effectively manage

[1:28] context. So, if you never built an agent

[1:30] before or you're still trying to

[1:32] understand difference between normal

[1:33] automation and actual AI agent, I think

[1:36] this is a great place to start. Because

[1:38] once you understand the basic pattern,

[1:40] what I'm talking about in this video

[1:41] becomes much easier to understand. I

[1:43] have put the link in the description

[1:44] below, so you can check out for free.

[1:46] And thanks HubSpot for sponsoring this

[1:47] video. Now, let's get back to what loop

[1:50] engineer actually is. So, past one year,

[1:52] there are a lot of new terms that

[1:53] popping up and might feel confusing, but

[1:55] in fact, each one of those terms are

[1:57] cluster of techniques that has been

[1:59] introduced for different level usage of

[2:01] large language model. If we go back to

[2:03] 2023, when GPT-3.5 or 4 API just show

[2:06] up, majority of tasks we get large

[2:08] language model do is pretty simple. It's

[2:10] mostly the task completion. You give it

[2:11] API input and use large language model

[2:13] to pretty much output text, so it can be

[2:15] useful extracting structured data or

[2:17] writing blocks. The nature of model is

[2:19] undeterministic, and that's where the

[2:21] term prompt engineering show up. It was

[2:22] basically techniques about how to

[2:24] engineer right context in the large

[2:26] language model call to steer the

[2:27] behavior. Like, you can tell it always

[2:29] return text in all caps, then it will

[2:31] write article in certain style. But very

[2:33] quickly, as we move into the mid-2024,

[2:36] that's where the model not only get much

[2:38] smarter, but also way bigger context

[2:40] window. Back then, the context window is

[2:42] somewhere around 4,000. And when 128k

[2:45] tokens show up, it was mind-blowing

[2:47] advancement. Then Google just raised the

[2:49] bar to every model default have 1

[2:51] million token context window. And the

[2:52] bigger context window here means the use

[2:54] case of how we use large language model

[2:56] has changed. We start building those

[2:57] system where the model is equipped with

[3:00] different tools like MCP, so it can

[3:02] decide what to do. And we include both

[3:03] the tool call and tool response as part

[3:06] of conversation, so the large language

[3:07] model can continue this loop until it

[3:09] thinks the task is completed. And what

[3:11] this really change is that the context

[3:12] window actually getting eat up more and

[3:15] more as the model is capable to do more

[3:16] and more tasks. And as we all know, even

[3:18] though it has 1 million context window,

[3:20] the effective window is somewhere

[3:22] between 128k to 200k. Whether you can

[3:25] feed most relevant information within

[3:27] this context window directly impact the

[3:29] agent's performance. And this is where

[3:30] people start introduce a whole bunch of

[3:32] techniques around this, like what to

[3:34] keep in the system prompt that can

[3:35] trigger the prompt cache better, and how

[3:37] to handle the long conversation

[3:38] regarding compaction strategy. And also

[3:41] new concepts like skill were introduced

[3:43] as a way to extend agent's capability

[3:45] without blow up context window. But one

[3:46] thing really change as we proceed to the

[3:48] end of 2025, which is that are getting

[3:51] model to do way longer and bigger tasks.

[3:53] From beginning of this year, it start

[3:55] becoming common that people are one-shot

[3:57] cloud code to finish 30 minutes, even 2

[3:59] hours amount work. And this is also a

[4:01] time where we start experimenting a lot

[4:04] about loops and workflows. In the

[4:06] beginning, people were trying rough

[4:07] loop, which is simple while loop to run

[4:09] cloud infinitely with the same prompt.

[4:11] And later, cloud code introduced the

[4:12] concept go and also loops and reasoning

[4:14] workflow. And also since I point to one

[4:16] thing, we are getting model to do this

[4:18] kind of cross-session work. Meaning

[4:20] we're no longer just getting one agent

[4:21] to finish the whole task. Instead, we

[4:23] can have multiple different agent

[4:25] sessions where each is handling one task

[4:27] and running in the loop until everything

[4:29] is finished. And this means we need a

[4:31] way to track the state or kind of file

[4:33] system across those different sessions

[4:35] so that each agent session can actually

[4:36] understand where things are at and

[4:38] continuously doing the work. And those

[4:40] are things actually happening outside

[4:42] agent runtime itself, but also including

[4:43] the environment where the agent is

[4:45] operating in. And this is where this

[4:46] agent harness concept was introduced. It

[4:48] was initially mentioned by from

[4:50] LangChain. And the definition back then

[4:51] was pretty straightforward. Basically,

[4:53] harness means anything that is

[4:54] non-model. And this is why the harness

[4:57] concept is so confusing because it just

[4:58] includes so many different things from

[5:00] prompt engineer and how you manage

[5:02] contacts, as well as those orchestration

[5:04] logic and hooks. But one useful way it

[5:06] always in my mind was there are two

[5:08] parts of optimization that can happen.

[5:10] One is agent loop itself, which can be

[5:12] cloud code or Codex if you're building

[5:13] your own Pi agent. There's whole bunch

[5:15] of optimization you can do. But all

[5:16] those techniques is around how do you

[5:18] making sure when you give one task to

[5:20] agent, it can finish the task pretty

[5:21] well. But on the other hand, there's

[5:23] whole bunch of techniques that is not

[5:24] just about how to get agent complete a

[5:26] task well, but around how to get this

[5:28] whole agentic system decide what should

[5:30] be worked on. And this outer part is

[5:32] actually what we currently talk about

[5:34] loop engineer. It's more like this kind

[5:36] of environment that you're setting up to

[5:38] both triggering the agent runtime, but

[5:40] also keep track of a state and logs so

[5:42] that it can continuously improve. And

[5:43] the reason this critical is is then it

[5:45] actually free you from prompting the

[5:48] agent itself. The agent can actually be

[5:50] a lot more autonomous and triggered by

[5:51] our different things. Like it could be

[5:53] Chrome job or it could be another agent

[5:55] and even web hooks of like incident that

[5:57] happened in your server. All those

[5:58] things can just trigger the agent, get

[6:00] it to deliver meaningful piece of work

[6:02] without you involved. And this is a core

[6:04] mechanism for the loop engineer. Is that

[6:06] you will set up the right trigger so the

[6:07] agent can be wake up in random time and

[6:09] scenario. And every time normally agent

[6:11] will do some sort of investigation and

[6:13] action, which will produce a list of

[6:15] backlogs or ideas that main agent can

[6:17] prioritize and assign tasks to others if

[6:19] needed. So next time it can review and

[6:21] learn. Let's take one example. Assume

[6:22] you are trying to create a loop for

[6:24] agent to handle the support. You can

[6:25] actually build a simple loop where every

[6:27] 30 minutes the agent will be just wake

[6:29] up by the Chrome to review all support

[6:31] tickets, respond to one that haven't

[6:33] been handled automatically, and also log

[6:35] the frictions and ideas. So you can pick

[6:37] that up as a product improvement later.

[6:39] And this loop itself is absolutely

[6:41] valuable. What's even more powerful is

[6:43] what if it not only log those ideas and

[6:46] frictions, but actually trigger a coding

[6:48] agent to directly implement some of the

[6:50] ideas. So you can actually monitor

[6:52] performance or even tell the customer

[6:53] those fix has been in place and monitor

[6:56] if any other people still experience

[6:57] those type of issues. And those two

[6:59] loops, they both provide huge value. The

[7:01] second one is a lot more powerful. And

[7:03] in my own experience, you can actually

[7:05] define multiple different loops that

[7:06] compound on each other if you can define

[7:08] a good logging system. So those are the

[7:10] loops that actually happening in my own

[7:12] company. We have one support loop that

[7:14] every 30 minutes it will just trigger

[7:16] the agent handling all support tickets

[7:17] and also log the frictions and ideas

[7:20] into one folder what do we call signals.

[7:22] Signal is like a folder where it will

[7:23] capture either the product ideas, the

[7:25] friction it found, the opportunities

[7:27] that we might be missing. Like in one

[7:29] round it might identify a few people all

[7:31] asked about how to export files. Then it

[7:34] will create one signal about export file

[7:36] to hidden as MD file. And inside this MD

[7:38] file it will log which user experienced

[7:40] that and every time when saw this issue

[7:42] happen, it would just log and add to the

[7:44] same file system. Similarly, we also

[7:46] have this SEO loop that is running.

[7:48] Every day 9:00 a.m., it would just go

[7:50] pull all data and research about topics,

[7:52] then publish relevant SEO page. But

[7:54] during this data analysis, it might find

[7:56] interesting insights, like one page is

[7:58] actually getting a lot of clicks, but

[8:00] there's not enough conversion from this

[8:02] funnel. Then it can add a signal as a

[8:04] conversion gap for this specific route.

[8:06] And what it really do is that making

[8:07] sure each agent loop both read and write

[8:10] from those shared folder systems. So

[8:12] therefore, we put our loops where before

[8:14] it would just watch some post-hoc

[8:15] sessions and analytics to prioritize and

[8:18] ideate some growth experiment. But

[8:20] because we have this shared file system,

[8:22] it will analyze data but also look at

[8:23] what are all the other signals that has

[8:25] been identified from other different

[8:27] loops or departments. So that it can

[8:29] prioritize and fix a bug that has been

[8:31] reported a few times or grab opportunity

[8:33] that marketing or SEO team is

[8:35] optimizing. Similarly, if a ads loop is

[8:38] finding a certain keyword that it

[8:40] actually has pretty good clicks rate,

[8:42] but we don't have organic content around

[8:43] it. This signal information can also

[8:45] feed back to the SEO loop, so it'll be

[8:48] aware of the situation and prioritize on

[8:50] organic content for this specific

[8:51] keywords. All those different loops are

[8:53] happening every hour or every day share

[8:55] the same brain. And this is where this

[8:57] component effect really taking off. And

[8:59] people are also writing this on the

[9:00] tweets where the login system can

[9:02] actually be the agent, which sounds very

[9:04] similar to what I see here. But how do

[9:05] you actually getting started with those

[9:07] crazy compounding loops for your own

[9:08] business? So therefore, core components

[9:10] or ingredients that is needed. One is

[9:12] that you need to set up triggers. As I

[9:14] mentioned, it can be multiple different

[9:15] type of triggers. And second one, which

[9:17] is the most important one, is design of

[9:18] the file structure. I do have some best

[9:20] practice that I will take you through.

[9:22] But you do need to give agent different

[9:23] tools and connectors so you can do

[9:25] meaningful work. And fourth is actually

[9:27] the most important one that a lot of

[9:28] people miss. You want to making sure

[9:29] your code base or environment is set up

[9:31] in a way that allows us parallel and

[9:33] autonomous work happening where many

[9:35] different agent can work at same time

[9:36] and each of verifies on work. I will

[9:38] quickly talk you through each one of the

[9:40] setup. Firstly, how do you set up your

[9:42] code base harness so the agent can write

[9:44] environment to do work autonomously? The

[9:46] core point here is that you want to

[9:47] making sure your code base is actually

[9:49] legible, which means agent can easily

[9:50] understand where to change what. And it

[9:52] should also be executable so the agent

[9:54] can easily spin up the dev server

[9:55] locally as well as the right tooling to

[9:57] verify its work. So firstly, legible

[10:00] code base is actually not that

[10:01] complicated. Open AI keeps their

[10:02] agents.md file to be indexed roughly

[10:06] which point to all sorts of other

[10:07] documentation system that they have for

[10:09] agent progressively discover

[10:10] information. And these two things I

[10:12] believe a lot of you already doing that.

[10:14] But there's also one part I think is

[10:15] actually very useful is that you can set

[10:17] up custom links because you can't really

[10:19] rely on agent to find relevant

[10:21] information for all sorts of different

[10:22] tasks. But you can actually inject those

[10:24] rules into programmatic link check. So

[10:26] every time when agent is not doing the

[10:28] things right, warning will be

[10:30] automatically surfaced. Like in our

[10:31] case, we have a pretty complicated mono

[10:33] repo and we don't want agent to use

[10:35] certain repo. So every time when agent

[10:37] write a file they import from those

[10:38] legacy folders, it will just surface

[10:40] those type of errors. And there's

[10:41] probably list of custom links that you

[10:42] can bake in to your code base. But the

[10:44] core idea here is that you want to do

[10:46] the context engineering for your agent.

[10:48] So it doesn't always rely on it to find

[10:50] the relevant information to do the task.

[10:52] And second one is that you want to

[10:53] making sure your code base is

[10:54] executable, which means your agent

[10:56] should start to work with the just dev

[10:57] server up running. Ideally, cost no

[10:59] token or cognitive load for it. So it

[11:01] can actually focus on the work well. In

[11:03] our code base, we have a dev.local

[11:04] script that is written so the agent can

[11:06] just run the script to get whole dev

[11:07] server up running. And meanwhile, you

[11:09] also want to making sure your code base

[11:10] is actually work tree friendly so that

[11:12] when there are five different parallel

[11:14] agents, it's all working on its work

[11:15] tree. You can still spin up the dev

[11:17] server and test it without conflicting

[11:19] with each other. And ideally, you can

[11:21] also set up some useful scripts to allow

[11:23] agent to jump to a specific state like

[11:25] all state or on all state to test

[11:27] specific scenarios. And all those things

[11:29] is providing shortcut for agent to

[11:31] verify its work easier. And the last one

[11:33] is verifiable. You basically want to

[11:34] give agent the right tools to actually

[11:36] test and log the result. And the what I

[11:38] found best is this Playwright CLI. It

[11:41] not only allow agent to effectively use

[11:43] the browser, but also it can record a

[11:45] video clips that can be uploaded

[11:47] attached to the GitHub PR. So it's very

[11:49] easy for you to review whether things

[11:51] are working or not. Along that a few

[11:52] end-to-end tests for critical flows that

[11:54] we actually care about and want to

[11:56] making sure never breaks like upgrade

[11:58] flow, sign up flow or in Supermetrics

[12:00] case create design effectively. And we

[12:01] also provide a PR skill which define the

[12:04] list of steps that agent have to do

[12:06] before it can submit a PR. And one of

[12:08] the important thing here is that don't

[12:09] get agent to self-verify its own work.

[12:12] It just generally didn't work that well.

[12:13] That's why in our PR skill we always

[12:15] tell agent to spawn a read-only verifier

[12:18] agent with a detail spec. And if you're

[12:20] interested, I've created a skill called

[12:22] setup codebase harness encapsulating the

[12:24] critical setup that I have done for my

[12:26] own codebase. So you can just give to

[12:27] your own cloud code or codex. They're go

[12:29] set up those useful scripts and docs as

[12:32] skills. So your codebase will be much

[12:33] more agentic friendly. I have posted a

[12:35] link in the description below so you can

[12:36] try out for free. If you want even

[12:38] deeper dive, I have walked through the

[12:40] whole setup from scratch step-by-step in

[12:42] AI builder couple workshop. So you can

[12:43] click and go follow as well. So this

[12:45] first thing that you should really do,

[12:46] making sure your codebase is in a state

[12:48] that agent can self-verify its work.

[12:50] This is going to be helpful even though

[12:52] you don't write loops. And second part

[12:54] that I'll just quickly talk you through

[12:55] is some of the best practice I found

[12:57] regarding the file and logging system.

[12:59] And there's three main type of files

[13:00] that I thought is good abstraction

[13:02] level. One is the artifacts. Those are

[13:04] the output of each agent work or

[13:05] findings. This is like shared knowledge

[13:07] layer. And there can be many different

[13:09] artifact types like docs, the signals,

[13:12] the tasks, or many other type of

[13:14] artifacts that is relevant to the loops.

[13:16] Like if I'm running ads, it might even

[13:17] have campaign as a artifact we can use

[13:20] to log and track the campaign

[13:22] performance. In my specific setup, we

[13:24] have the SEO loop, is loop, a product

[13:26] growth loop that is running on the

[13:28] pricing itself as well as red loop. So

[13:30] for each artifact I have its own

[13:32] artifact folder and in the artifact

[13:34] folder are defined a read me where it

[13:36] will clearly explain what goes into it,

[13:38] what does not goes into it, what's the

[13:40] process for adding a new item and the

[13:42] schema for this artifact. Then for each

[13:44] red command it draft, it just has this

[13:46] metadata front matter as well as main

[13:48] body about the content itself and also a

[13:50] timeline to log any change that we did

[13:52] for this artifact. Same logic can be

[13:54] applied for like a signals, which in our

[13:56] case is like a product feedback, ideas,

[13:58] anything that any loop observed. They

[14:00] can create a signal and link to

[14:02] different sources detailing the raw

[14:03] customer feedback or even support the

[14:05] kit artifact. And the purpose of those

[14:07] artifact is that those became the shared

[14:09] library or shared files that any loop

[14:11] can just read and write towards it. And

[14:13] we can even build some small mini apps

[14:15] like this one I built to track all the

[14:17] different artifacts so I can very easily

[14:19] view, let's say the product signal in

[14:21] every phone. And each one can link to

[14:23] another artifact that created. And it

[14:25] also became very easy for the humans in

[14:27] the loop experience. I can just keep

[14:29] track about what are things that

[14:30] actually needs my attention. But the

[14:31] core things here is that you can define

[14:33] those different artifact types and

[14:34] folders that is shared across the loops.

[14:36] And then for each loop itself I would

[14:38] normally define a contract which

[14:40] including things like what's the goal of

[14:41] this loop, what kind of workflow it

[14:43] should follow as well as book backlog

[14:45] list. So the next loop it can pick up

[14:47] the most important one or update and

[14:48] re-prioritize tasks as well as a list of

[14:50] timeline so you can remember what I did

[14:52] before. In my case since I have just a

[14:54] few different loops I have multiple

[14:56] different loop folder. In each loop I

[14:58] just have this simple read me file that

[15:00] is serve the purpose of this contract.

[15:02] It would talk about goal and the

[15:03] workflow. Then it list of timeline to

[15:05] log what happened to the specific

[15:07] domain. So every time when the loop

[15:08] triggered, it would just read this

[15:10] contract, understand the goal, the

[15:12] workflow and the what happened before.

[15:14] And based on those information takes

[15:16] mass back action. And this contract is

[15:17] extremely useful. A third one is the

[15:19] logs. So you might be confusing like

[15:21] there already time-lining the loop

[15:23] contract and also the artifact. Why do

[15:25] we still need a lock? So, the reason we

[15:26] need a lock is that I find my day's

[15:27] always a mix of those kind of review the

[15:30] output from the loop as well as

[15:31] executing some of the real difficult or

[15:33] creative work with agent in those kind

[15:35] of co-pilot state. And I want easy way

[15:37] for agent to firstly understand cross

[15:39] different domain what was happening as

[15:41] well as capture those ad hoc

[15:43] information. And this where we have this

[15:44] kind of global work log MD file. Each

[15:47] agent when they finish a big bulk of

[15:48] work, it will just write to this file.

[15:50] And also before they start the work,

[15:51] they will also read the last five or 10

[15:54] entries. So, those pretty much are the

[15:55] core ingredients. Let's just set up one

[15:58] together. Let's say this is easy one to

[16:00] start, the support loop. We want agent

[16:02] every 30 minutes it can pull all the

[16:04] recent support tickets we have, draft a

[16:05] response or reply directly to the

[16:07] customers where it has relevant

[16:09] information. And also log all the

[16:10] frictions and ideas they identify. First

[16:12] thing is that we need to create some

[16:13] skills. So, here I already pre-create a

[16:16] few skills that I know a support person

[16:19] need to access. One Intercom skills to

[16:21] fetch all the tickets and also Stripe so

[16:23] you can check the payment subscription

[16:24] data as well as Superbase access so you

[16:26] can debug payment information and render

[16:28] skill to actually fetch the backend

[16:30] logs. There's some scripts they've

[16:31] written as well to make it easier for

[16:33] agent to pull information. As well as

[16:35] skill for triage support ticket. So,

[16:36] this is part that you will kind of

[16:38] customize based on your own business. In

[16:40] my specific case, I wanted to practice

[16:41] all problems. I define workflow where it

[16:43] will fetch all tickets that has updates

[16:45] for past X hours and then investigate

[16:47] the issues the user mentioned. And also

[16:50] wanted to create a artifact of tickets

[16:52] to log the tickets I ever handled and

[16:54] even create engineer tickets, log the

[16:56] feedback ideas. In the end it should log

[16:58] what it did. So, those are skills. And

[16:59] meanwhile, you generally also want to

[17:01] create a cloud log MD file so the agent

[17:03] has a good understanding of our

[17:04] business. You can just prompt cloud code

[17:06] or code X to research about your

[17:07] business and save the information to

[17:09] cloud log MD file. Then it will likely

[17:10] create cloud log MD file like this that

[17:12] including all the business context. And

[17:14] also something I generally include is a

[17:15] rules for responding agent for engineer

[17:17] work. And here's where I will explain

[17:19] the repos we have and ask it to get work

[17:22] straight every time. It also put some

[17:23] contract about how it should manage get

[17:25] work straight. And those are things that

[17:26] actually apply across any kind of loops.

[17:28] So I include in the cloud MD file. And

[17:30] meanwhile, I also have this

[17:31] architecture.md,

[17:32] which will be referred inside the cloud

[17:34] MD file. So this is like a general

[17:36] instruction based on the structure I

[17:38] define. So including structure that

[17:40] agent should define different artifact

[17:41] types and also define loop domains, as

[17:43] well as a convention for logs. So now I

[17:45] can just point to uh this file say,

[17:47] "Help me set up relevant artifacts."

[17:50] Which in my case would be like signal

[17:52] task, ticket, and doc plus a domain. And

[17:54] the agent should be able to just like

[17:56] read this architecture file and

[17:57] scaffolding the thing. Then it will set

[17:59] up different artifact types like one for

[18:01] docs and one for signal which covers

[18:03] things like feedback, idea, observation,

[18:05] as well as tickets. This also log to MD

[18:07] file which at beginning is empty. And

[18:09] then I create this kind domain/support

[18:12] folder. As I mentioned, for each loop I

[18:14] found it really useful if I would define

[18:16] a contract that is capturing the goal of

[18:19] the loop, the overall workflow and

[18:21] boundaries, and outstanding task list

[18:23] and timeline. Common workflow I would

[18:24] normally manually run once with the

[18:26] agent as a test run. Once a test run

[18:29] kind of finish, I will ask it to create

[18:30] a contract then set up loops. So as

[18:32] example, I want you to handle my

[18:34] support, which means fetch support

[18:35] tickets from past hour, do some

[18:37] analysis, review, and draft response

[18:39] saving tickets. And also save signal for

[18:41] product ideas, user frictions, and for

[18:43] clear bugs you can just spawn agent fix

[18:45] directly and create a task for engineer

[18:47] tickets. We run this every hour but

[18:49] let's do a test run first. Then agent

[18:51] will start doing the work. I can see it

[18:52] already handled a few tickets and each

[18:55] one it create artifacts about the result

[18:57] and also identify some potential

[18:59] customer feedback or frictions that will

[19:01] be useful for prioritize as products and

[19:04] also log some cleared engineer bugs. And

[19:06] this is kind of process where you can

[19:07] just kind of calibrate with agent to

[19:09] understand where the workflow is what

[19:10] you want or not. And once this looks

[19:12] right. This is where I will set up loop.

[19:14] Say, now help me set up a loop but

[19:16] create a read me first as a contract

[19:18] including the goal workflow timeline in

[19:20] this folder and then set up the loop to

[19:22] the session. This should create a proper

[19:24] read me file like this. It also set up

[19:26] the loops that will be triggering this

[19:28] session every hour. So I actually have

[19:30] to create this repo template called loop

[19:32] engineer setup. That's capturing some of

[19:35] the best practice learnings of all the

[19:36] loops that my team has been set up. So

[19:38] hopefully you can just copy this folder

[19:40] and structure to set up artifacts and

[19:42] spin up new loops. I put the link in the

[19:44] description below so you can use this

[19:46] for free as well. But if you're

[19:47] interested, we have hours of

[19:48] step-by-step showing me how do I set up

[19:51] those loops from scratch in real.

[19:52] Alongside 10 hours more deep dive on

[19:55] building agents and production AI

[19:56] codings. So if you want to set up your

[19:58] first loop for your business, definitely

[19:59] come and join. I hope you enjoy this

[20:01] video. Thank you and I'll see you next

[20:02] time.