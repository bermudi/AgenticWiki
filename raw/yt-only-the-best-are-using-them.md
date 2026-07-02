---
type: youtube
url: https://www.youtube.com/watch?v=dMrm2jAyrKM
title: "Only the best are using them..."
channel: Matthew Berman
date: 2026-07-02
ingested: 2026-07-02
---

# Only the best are using them...

[0:00] A new coding meta just dropped. Over

[0:02] this past weekend, everybody started

[0:05] talking about loops. The two main

[0:07] characters in the world of AI coding

[0:08] talked about it at the same time. Peter

[0:11] Steinberger and Boris Cherny. Here is an

[0:14] interview from Boris that went

[0:15] absolutely viral.

[0:16] >> I don't prompt Claude anymore. I have

[0:18] loops that are running. They're the ones

[0:20] that are prompting Claude and kind of

[0:21] figuring out what to do. My job is to

[0:23] write loops.

[0:24] >> And here's Peter's tweet sitting at 5

[0:26] million views in less than 24 hours.

[0:28] Here's your monthly reminder that you

[0:29] shouldn't be prompting coding agents

[0:31] anymore. You should be designing loops

[0:33] that prompt your agents. So, what is a

[0:36] loop? Why is suddenly everybody talking

[0:39] about it and why are there only a

[0:41] handful of people in the entire world

[0:43] who know actually what it is and how to

[0:45] use it. This is the future of software

[0:48] engineering, but most people won't be

[0:50] able to do it today. But if you want to

[0:52] be at the absolute frontier of coding,

[0:56] I'm going to show you how. And if you

[0:57] like when I explain the latest in

[0:59] engineering strategy, like this video

[1:02] and subscribe. It very much does help.

[1:04] Thank you in advance. And by the way,

[1:06] this video is sponsored by here.now.

[1:07] More on them later. All right, so what

[1:09] is a loop? If you've ever done agentic

[1:12] engineering or vibe coding before, you

[1:14] know the workflow. You prompt your

[1:16] agent, your agent writes the code for

[1:19] you, you wait for it to be done, and

[1:21] then you prompt it again. Loops are what

[1:23] change this. Rather than you telling

[1:26] your agent what to do, you are designing

[1:28] the loop, which really just means

[1:31] specifying some end state, a goal.

[1:34] You're giving your agent a goal, and the

[1:36] agent will not only start itself, but

[1:38] will continue until that goal is met.

[1:41] And I know this sounds very theoretical,

[1:43] but stick with me. I'm going to show you

[1:45] actual loops. So, a loop really only

[1:47] needs two things. It needs some kind of

[1:49] trigger and some kind of goal. The goal

[1:53] must be verifiable in some way. That

[1:56] verification can come in the form of

[1:58] test passing, or for more abstract

[2:01] goals, you can have an LLM determine if

[2:03] it reached the goal or not. And if

[2:05] you're thinking this sounds a lot like

[2:07] reinforcement learning, exactly. With

[2:09] reinforcement learning, you need some

[2:11] kind of verifiable reward, meaning the

[2:13] agent, or the AI, or the model, it knows

[2:17] when it successfully reached that goal.

[2:19] And just like RL, it can be done with

[2:23] deterministic goals, so when all the

[2:25] tests pass, or this function executes

[2:28] properly and there are no errors, or

[2:30] non-deterministic goals, when an agent

[2:33] or an AI decides, "Hey, I think the goal

[2:36] has been completed." Okay, so we have

[2:39] the trigger, and we have the goal. Let

[2:41] me show you what it actually looks like

[2:43] in practice. In Cursor, there's this tab

[2:46] called Automations. Click that, and you

[2:48] can set up a new automation. I've

[2:50] already set one up, and I've said,

[2:52] "Every time I open up a PR in Astro Hub,

[2:54] which is my new project that I've been

[2:55] working on, more on that soon, I want

[2:57] this automation to trigger." Now, there

[2:59] is a difference between an automation

[3:01] and a loop, and I'll explain that in a

[3:02] moment. But, when that trigger happens,

[3:04] whenever a PR opens, then I give the

[3:07] agent the instruction to review the PR

[3:10] and look for any potential issues, fix

[3:12] them automatically, and commit back to

[3:14] the same PR. Make sure all tests pass,

[3:16] and if they don't, fix them. Make sure

[3:19] all other CI is green. So, those are the

[3:23] goals of this loop. And that's it.

[3:25] That's my loop. And loops are really as

[3:28] simple as that. Loops get more

[3:30] complicated when the goal becomes more

[3:33] amorphous.

[3:35] Rather than all the tests passing, which

[3:37] is a very deterministic and clean way to

[3:40] know if the goal has been achieved or

[3:42] not, you might want to say, "Okay, the

[3:44] goal is build this feature in my

[3:47] product." But, how do you actually

[3:48] define what the end state of that

[3:51] feature is? You basically have to write

[3:54] all of it. You have to determine the

[3:56] full spec up front. And for a lot of

[3:58] people, including myself, that is very

[4:00] difficult because part of building a

[4:02] feature is exploring it, figuring out

[4:05] what parts I need, what parts I don't,

[4:08] building it, iterating. That entire

[4:11] process I am extremely involved in. And

[4:14] with loop engineering, you're basically

[4:17] saying, "I'm removing myself. I'm giving

[4:19] the loop the end goal of this completed

[4:22] feature, and then I'm walking away."

[4:24] Now, let me show you some other possible

[4:26] triggers because it's not just if a PR

[4:29] is opened. One very common trigger for

[4:31] loops is a schedule. So, if I click

[4:34] here, we can look at a schedule. This is

[4:36] also known as a cron job. Basically,

[4:39] some recurring thing that happens on

[4:42] some given time frame. So, every 30

[4:44] minutes, every hour, every day, every

[4:46] week, whatever it is, you want something

[4:49] to run, a loop to start on that

[4:52] schedule. All of these other ones are

[4:53] based on certain actions that happen.

[4:56] So, there really are only three total

[4:58] types of triggers. One, some kind of

[5:00] action happens like a PR opens. Two,

[5:03] it's a schedule that happens, so every

[5:05] 30 minutes. And three, a human kicks it

[5:09] off. That is still very much a trigger.

[5:12] So, you can type out everything that you

[5:14] want in that end state and just say go,

[5:17] and it'll continue to loop, continue to

[5:19] write code, continue to iterate until it

[5:22] reaches that end goal. And that's it.

[5:23] You can get very complex with your

[5:25] loops. You can give skills to your

[5:28] loops. You can even code it to get

[5:30] smarter as it iterates through the loop.

[5:33] All of these things are possible and

[5:35] just add complexity to looping. But, the

[5:37] most basic definition of a loop is still

[5:41] some trigger

[5:42] and some goal. And by the way, with

[5:45] loops, you're going to be producing so

[5:47] much more code and so many more software

[5:50] products than you ever thought possible.

[5:51] And you need a way to publish them just

[5:54] as quickly, and that's where the sponsor

[5:55] of this video comes in, here.now.

[5:58] here.now is one of my favorite products

[6:00] to tell you about because one, it is

[6:03] awesome and I actually use it, and two,

[6:05] it has actually inspired the way that I

[6:07] think about the future of the internet.

[6:09] So, if you haven't heard about it

[6:10] before, here.now is the easiest way to

[6:13] give publishing ability to your agent.

[6:16] Whether you use Claude Code or Codex or

[6:18] OpenClaude or Hermes, all you have to do

[6:21] is tell your agent to go to here.now and

[6:24] install the skill. Or you just come to

[6:26] this page right here, click the copy

[6:28] setup button, paste it into your agent,

[6:30] and it just knows how to do it. Then at

[6:32] that point, your agent can publish

[6:34] anything to the web on your behalf. And

[6:37] they also recently launched private

[6:39] storage, so you don't need to always

[6:41] just publish everything publicly. You

[6:43] can have your agent store pretty much

[6:45] anything on here.now. And then even more

[6:47] recently, they launched custom URLs. So,

[6:50] rather than only having a here.now URL,

[6:52] you can use your custom domain with

[6:54] here.now and publish directly to it. And

[6:57] the best part? It's completely free

[6:59] right now. So, go check it out. I'm

[7:01] going to link all of it down below, but

[7:03] it's here.now. It's super easy. So, now

[7:05] back to the video. All right, so if

[7:06] you're using Claude Code, here is how to

[7:09] use loops. And they literally have a

[7:11] feature called {slash}loop. So, you just

[7:13] start typing {slash}loop, and it says,

[7:15] "Run a prompt or {slash}command on a

[7:18] recurring interview." So, loop 5

[7:19] minutes, and then whatever you want. So,

[7:21] you can say loop every 5 minutes, "Reach

[7:24] feature parity with Google." Obviously,

[7:27] that's ridiculous, and I'm going to have

[7:28] a trillion-dollar token bill at the end

[7:30] of the month, but that's how you do it.

[7:32] And you can set any goal you want. So,

[7:34] here's a more realistic example:

[7:35] {slash}loop every 5 minutes, "Compare

[7:38] what we have built with our full spec,

[7:40] spec.md." It could be anything, whatever

[7:42] product you have a vision for,

[7:44] and continue building until we complete

[7:47] the full spec. So, every 5 minutes it's

[7:49] going to kick off an agent. That agent

[7:50] is going to determine what is left to

[7:54] build and start building it. And it's

[7:55] just going to keep kicking off agents

[7:57] and keep looping

[7:59] until it finally reaches that goal. Now,

[8:01] we can have a single loop that does

[8:03] that. We can remove every 5 minutes and

[8:05] just say loop, just continue until you

[8:08] reach that final goal. And that would be

[8:10] the human kicking off the loop. Now,

[8:12] there are lots of caveats to loops, and

[8:16] really a lot of criticism that at least

[8:18] for now is quite valid. Number one, it

[8:21] is very difficult to set up. The most

[8:23] basic forms of loops, which I just

[8:25] showed you, are quite easy actually.

[8:27] But, if you start thinking that you're

[8:29] going to build this entire code factory

[8:31] that builds entire products for you, and

[8:33] continues to loop indefinitely, and

[8:35] shipping features at speeds you've never

[8:37] imagined, that part is very difficult.

[8:40] Defining what the end state of something

[8:42] that doesn't have a deterministically

[8:44] verifiable goal is much more difficult,

[8:47] and ripe for the agent to continue to

[8:50] burn tokens indefinitely. And you have

[8:52] to be really careful about that. And

[8:55] that leads to the second biggest

[8:57] criticism. Boy, is looping expensive.

[9:00] The more that you abstract the human

[9:03] away from writing the actual code, the

[9:06] more tokens you're using. The more

[9:08] tokens you're using, the more expensive

[9:10] your AI bill is going to be at the end

[9:12] of the month. Now, it's not always going

[9:13] to be that way. What's expensive today

[9:16] is cheap tomorrow. That has been proven

[9:18] time and time again throughout the

[9:20] history of technology. As tech diffuses,

[9:23] we find ways to make the production of

[9:25] that tech more efficient, and thus the

[9:27] price gets driven down. And that is

[9:30] definitely what we're going to see here.

[9:32] But, today, it is still very expensive.

[9:35] And at the same time that a lot of

[9:38] people are talking about how expensive

[9:40] it is and companies are trying to cut

[9:42] their bills, the idea of introducing

[9:46] loop engineering becomes completely

[9:48] crazy to most people. So, I know this

[9:51] stuff is very expensive, but it is also

[9:53] just as important to know what's going

[9:55] on even if you're not using it today.

[9:57] And that also brings me to the point

[9:59] that there is this huge bifurcation of

[10:02] people in engineering right now where

[10:06] only the top 1% of 1% are using these

[10:10] techniques like loop engineering.

[10:12] Because not only are they enabled to try

[10:14] these new techniques, but also they're

[10:17] given infinite or very high token

[10:19] budgets, which only a few companies in

[10:21] the entire world can really afford. Now,

[10:23] we talked about Peter Steinberger and

[10:25] Boris Cherny, respectively, from OpenAI

[10:28] and Anthropic. Both companies give their

[10:31] employees infinite tokens. That's why

[10:34] they're able to experiment. But that's

[10:36] also why Peter Steinberger showed about

[10:39] a few weeks ago he had 1.3 million

[10:41] dollars in monthly token usage. Not many

[10:45] people can afford that. So, loop

[10:47] engineering is definitely not for

[10:50] everybody and certainly not today. But

[10:53] this is absolutely the future of

[10:56] engineering. We will continue to build

[10:59] the software factory that builds the

[11:01] software. We as engineers will gradually

[11:04] and then suddenly no longer even be

[11:07] writing prompts to our agents to go

[11:09] write software for us. We will be

[11:11] designing these factories that allow the

[11:14] agents to run autonomously. Now, two

[11:16] last things I want to talk about. One, I

[11:18] mentioned earlier in the video there is

[11:20] a distinction between automation

[11:23] and loops. They're very related,

[11:25] but the difference between a loop and an

[11:28] automation is that a loop has some

[11:30] decision inside the loop. It is deciding

[11:33] if it reached the goal or not. It is not

[11:36] just executing a series of prompts. It

[11:37] is not just executing a few lines of

[11:39] code. With a loop, you are specifically

[11:42] giving the loop the ability to determine

[11:44] if it reached its goal or not. That's

[11:46] the difference. And once again, thank

[11:49] you to hear.now for sponsoring this

[11:51] video. I'm going to drop a link to them

[11:54] down below. Give your agent the

[11:56] instructions. It is so easy. Go check

[11:58] them out. They've been a fantastic

[12:00] partner. Now, here's where it gets wild

[12:02] to think about. Will the human be

[12:04] required in the loop forever or not?

[12:07] Right now, humans are required in the

[12:10] loop. That is because we are still

[12:11] deciding what the goal is. What

[12:14] direction should we be headed? And when

[12:16] I say we, I mean myself and my agents,

[12:19] my loops, whatever it is. I am saying,

[12:21] "Here's the direction we should go in.

[12:23] Go." But, there's a world in which we

[12:26] can imagine in which I am no longer

[12:28] setting the direction. I am no longer

[12:30] setting the goal. AI has taste and it's

[12:32] able to decide what features to build,

[12:36] what products to build, what companies

[12:38] to build. And really, what we're

[12:40] describing is AI is able to design its

[12:43] own factory. That is the point at which

[12:46] we have recursive self-improvement.

[12:49] A topic that I just made a long video

[12:52] about. Anthropic just put out a full

[12:54] essay all about recursive

[12:56] self-improvement. Check out the video

[12:58] right here.