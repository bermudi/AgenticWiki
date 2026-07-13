---
title: "Steve Yegge: 'You'll Never Write Code the Same Way Again'"
author: "AI Native Dev"
source: "youtube.com"
url: "https://www.youtube.com/watch?v=Rgwu9nF_Xok&t=2283s"
date_saved: "2026-07-12T00:00:04.118Z"
---

# Steve Yegge: 'You'll Never Write Code the Same Way Again'

[0:01] You run a swarm to do code review, file a bunch of bugs.

[0:05] whatever.

[0:05] You're generating work by spending tokens.

[0:09] And then you've got a bunch of work, and then you just swarm it to fix it,

[0:12] and then you swarm it to review it, and then you start over it again.

[0:15] Right.

[0:15] And so the factory is pushing the work through.

[0:19] So when you start talking about software factories, it's the moment

[0:23] that you start thinking about work as a first class entity,

[0:33] Oh, no. Oh!

[0:35] and I'll just

[0:36] introduce our guest speakers today.

[0:39] So we're going to have a chat.

[0:41] And we've got through some amazing speakers with us today.

[0:45] First group Dru Knox who is the head of product at AI at Tessl.

[0:50] So he's a former Chrome and web platform PM.

[0:55] He's worked deep in the web standards, and he's a former research scientist

[0:59] at Grammarly.

[1:00] He started his own startup as well and that was very exciting.

[1:05] And he is an incredible product team.

[1:09] And if you have if you want to find anyone

[1:12] that can come up with insane ideas and also execute them using them

[1:18] and see, I don't think he needs to much of an introduction,

[1:23] but if you want a small city of the things that he's

[1:27] he spent over 40 years in the engineering and industry.

[1:31] He's worked in some incredible companies like Amazon,

[1:35] Google and most recently at Sourcegraph.

[1:38] He is a famous essays.

[1:40] I'm sure some of you have come across some of the work that he's done.

[1:44] The author of the original Google Platforms rant,

[1:48] and many other incredible articles that have come come forward,

[1:51] and also some amazing and frontier level software

[1:56] like Gastown and Beats

[2:00] for your external memory issue for agents. So.

[2:06] I'm going to let them tell everyone

[2:09] a little bit about themselves as well, and then we'll kick on with the subject.

[2:13] Thank you very much.

[2:14] Thank you Simon.

[2:20] Again, secondary.

[2:21] Thank you for subbing in 5 or 10 minutes notice.

[2:24] So welcome everybody.

[2:27] Glad to have you all here.

[2:28] So I'll serve as a little bit of MC conversation

[2:32] partner though I don't kid myself who everybody's here to to hear from.

[2:36] So I'll try to leave as much time for Steve as possible to to chat.

[2:39] We're going to go over a few things today, I think, all largely

[2:43] around the topic of harness engineering and factory building.

[2:47] So eagle eyed viewers may have noticed the slides.

[2:52] The title is changed just ever so slightly,

[2:54] a sign of how fast our industry moves.

[2:56] Terms have emerged in the three weeks from when we finalize the title to now.

[3:01] So we want to talk about a little bit what is harness engineering?

[3:05] What are software factories? What do they look like?

[3:08] Give a couple examples.

[3:09] From what we've seen just in our own building

[3:11] as well as from customers, and then we'd love to just talk about

[3:15] what kind of impact it's going to have on software

[3:17] development, on the role of being a software engineer.

[3:21] You know, where should we be afraid?

[3:23] Where should we be happy, all of these things.

[3:26] And then we'll leave a bunch of time at the end for questions.

[3:28] So if you have thoughts, things you'd like to ask, please

[3:31] be thinking of them now.

[3:32] Nothing is worse than asking for questions and getting silence.

[3:35] So please, please come up with questions.

[3:37] Now before we get started though, Steve, is there anything you'd like

[3:40] to say add to your introduction or anything like that?

[3:43] Thanks all for coming. Looking forward to this.

[3:47] Awesome.

[3:48] So I will kick us off with what is a software factory?

[3:53] Some of you may or may not have heard the term emerging.

[3:56] It's kind of becoming the new trend we fun thing to build.

[4:00] So I thought maybe we could start off with probably one of the more notable

[4:04] first incarnations of something

[4:06] that looked factory like, which would be Gastown.

[4:09] Love to hear. Steve.

[4:10] Just from your perspective, what, in your words, is a software factory?

[4:15] What does it look like?

[4:16] What does it feel like to build one? How?

[4:18] How AI psychosis inducing is it?

[4:22] Yeah.

[4:23] So it's a little  a little amorphous, right?

[4:28] I mean, like we're still defining these words, but

[4:32] I mean, kind of the way I think about it is you get into factories when you start

[4:36] getting into trying to be a puppeteer for agents

[4:39] in any sort of capacity.

[4:42] So if you're using the agent directly, it's not a factory, it's pair

[4:46] programing with agents. Right.

[4:48] And if you're writing code that's making agents do stuff.

[4:54] Yeah. Then you've entered factory territory.

[4:57] That's that's what I think.

[4:58] Yeah. Yeah, I think that aligns

[5:03] I think that

[5:03] aligns pretty well with at Tessl we view it similarly.

[5:07] Like there's no one specific definition of a factory.

[5:10] Right.

[5:11] It is largely of are you building a system that gets humans out of the loop.

[5:15] And I think it tends to emerge most obviously as soon as you really start

[5:21] kind of cooking with agents, like you're a few parallel sessions,

[5:25] you're putting up PR's much faster than you have previously.

[5:28] You sort of find that anywhere a human is in the process,

[5:32] a bottleneck emerges, and it sort of drives you towards a world

[5:36] where, how can I get the end to end product delivery to be handled by agents?

[5:42] Yeah.

[5:42] It's like it's like the moment that you get AI psychosis,

[5:45] that's when you start thinking about software and batteries, right?

[5:48] Because that's like they can do it.

[5:51] They they can do it, you know like unsupervised.

[5:54] Right. And then you're like, well, they probably need a little supervision.

[5:57] And then you're like, well, I can't have another agent look over their shoulder.

[6:00] And then you got yourself an adversarial pod and it's already in a mini factory.

[6:05] Right. And, you know, we're fine.

[6:08] I mean, also, you know, like there's

[6:09] a whole bunch of different surfaces where factories are showing up.

[6:13] And we first noticed them when we were doing development.

[6:17] Right. And that's how Gastown came about. Right?

[6:19] Which was, well, what if I want to run 20 agents at once, right.

[6:24] You know, I mean, you're not probably like

[6:27] interacting with 20 directly, like, and guiding them.

[6:30] You know, the cognitive overhead gets really hard at like 4 or 5, right?

[6:34] But you have a lot of tasks that can be paralyzed.

[6:37] You need to do a refactoring or any sort of a sweep, you know.

[6:42] And and what I found, like, I don't know, it was it last year.

[6:49] Yeah.

[6:49] Gastown was gosh, time is fine.

[6:51] Gastown was January 1st.

[6:53] So I spent all last year

[6:54] trying to get agents to like, you know, like run agents, right.

[6:58] And what I found was that you just you, you frequently needed basically do

[7:05] there's a there's a, there's a,

[7:08] there's a rhythm to it.

[7:10] Right.

[7:11] You run a swarm to say generate a bunch of reports, a bunch of issues.

[7:17] Okay.

[7:17] You run a swarm to do code review, file a bunch of bugs.

[7:21] Right.

[7:21] Run a swarm to do an audit to see how, you know, whatever.

[7:24] Convert all your to do whatever.

[7:25] You're generating work by spending tokens.

[7:29] And then you've got a bunch of work, and then you just swarm it to fix it,

[7:32] and then you swarm it to review it, and then you start over it again.

[7:35] Right.

[7:36] And so the factory is pushing the work through.

[7:39] So when you start talking about software factories, it's the moment that you start

[7:44] thinking about work as a first class entity,

[7:47] as a substance that you're manipulating.

[7:51] Right?

[7:51] The work, the tickets, the design documents,

[7:54] the to dues, whatever they are, however, you're representing your work.

[7:57] And so I sort of backed into this, stumbled into this when I was trying to.

[8:02] I was running a bunch of parallel

[8:04] agents by hand, and they were getting just lost and markdown files.

[8:08] And that's where Beads came from. Right?

[8:09] Which was just like, okay, what if we just like,

[8:12] tracked the work in a graph with git and database access and,

[8:17] and just had a way to like just, just store it all away and watch it

[8:19] and go through its life cycle of its to do work.

[8:22] Now it's in progress work

[8:24] and now it's finished work, which is like a ledger, right?

[8:27] Those are three very different like views of the work.

[8:30] When it's future work, it's usually very public.

[8:33] Anyone can claim it, you know, anyone can debate it and modify it.

[8:37] Once somebody claims it, it gets exploded out, like the car goes into the shop

[8:43] and goes up on the stilts and, you know, it's all over the place.

[8:45] There's lots of maybe little intermediate tickets you're working on.

[8:48] You usually don't want to see people to see you working in that.

[8:51] We'll come back to that.

[8:53] And then and then at some point you actually turn it into a nice digest

[8:57] and you submit it, it gets reviewed, it gets accepted.

[9:01] And now it's your now it's your finished work which becomes your resume.

[9:05] I mean, these are like ants rights, which is like your curated view

[9:08] of what you've accomplished.

[9:10] I mean, that's the world that we're headed to.

[9:11] And Beads formalizes this in a way, right?

[9:14] I mean, it's like a you can use any issue tracker you want,

[9:17] but I see a lot of people like defaulting to GitHub issues or linear or something.

[9:21] And those things are those things are designed to be super heavyweight.

[9:23] But we're doing software factories.

[9:26] I mean, did did you all read Welcome to Gastown when I wrote that on January 1st?

[9:30] I mean, like the core idea was that it's shoveling a lot of work through, right?

[9:36] To so much to where like in a software factory, you can, like,

[9:39] accidentally do the same work twice.

[9:43] Yeah, at the same time you get different outcomes and then somebody has to judge

[9:46] which one to pick, you know, or you can you can just lose work.

[9:51] You can do a whole bunch of work, spend the tokens and then where to go.

[9:54] Right. Somebody deleted it, you know, it's gone. Right.

[9:56] So like work becomes almost like an uncountable.

[10:00] Right. And so it's I don't know, right.

[10:02] I mean, like, it's incredibly expensive to work that way.

[10:06] But Gastown was me kind of trying to figure out how to push forward.

[10:09] The funny thing is, though, like, you guess town is, like really overkill

[10:14] if you really want to, like, you really want to run 60 agents, right?

[10:18] Recently I haven't been using Gastown, but I've still been building my own

[10:22] software factories.

[10:23] You just you get into the habit of building them all the time.

[10:27] They're bespoke.

[10:28] You don't have, like, one factory fits, all right?

[10:32] Like, there are some commonalities.

[10:34] Like, I'm finding that for each project, you need to build a brain.

[10:39] Right?

[10:39] Who use obsidian for that?

[10:41] It's a really good default. Right.

[10:42] But you can use whatever.

[10:44] Anything else for a brain.

[10:46] What do you use?

[10:48] G brain?

[10:50] Is that a Google open source thing or.

[10:51] No, it's a get help.

[10:53] From Mary Tam that directly gates obsidian brain.

[10:56] But Gary tend to the thing.

[11:00] Wow. Okay, I'll check it out.

[11:03] I was sure it was no shame in that.

[11:06] All right.

[11:07] Yeah, the brain and there's some other components that you put together.

[11:10] But I mean, largely your factory is like you shaping the

[11:13] how the work's going to go through your agents. Right.

[11:15] And the one just to finish it, like the one, the one that I'm working on

[11:18] right now, the one that you should all be working on right now, is okay

[11:25] for the next six days.

[11:27] You want to do a bunch of design work

[11:31] and file implementation work.

[11:33] That's that's clear enough that Opus can do it right

[11:37] for who knows how long, right?

[11:40] You need. Right. So.

[11:41] So this is a factory shape.

[11:44] You're producing work to be consumed later.

[11:46] Right.

[11:47] So how you choose to set that up like or later on

[11:50] if you're going to need Fable occasionally and maybe you'll be stuck with API

[11:54] access only.

[11:54] So you need to like basically tag your work with intelligence

[11:57] tiers in a way so you could route it and know what you stable.

[12:01] Right.

[12:01] And so that the setup that you have on your local machine or with your team

[12:06] or in your org for having these agents swapped

[12:09] in and out for the appropriate work so that you can save tokens.

[12:12] That's your that's your factory, right?

[12:15] Whether you've been explicit about it or not, that's that's what you've got.

[12:20] I think there's a lot of great topics in there.

[12:22] Maybe I will put the one about building your own factory.

[12:26] Everything is bespoke to it later.

[12:28] Something that has great touches on what is the sort of future of software

[12:32] engineering if we move into a world of factories.

[12:35] But you also, I think you outlined a few of those,

[12:38] the commonalities, the things where when you're building a factory,

[12:42] you're always going to touch on some of the same topics.

[12:44] And so maybe to make this concrete within Tassell,

[12:48] we have been embarking on a bit of a I think it felt at first

[12:53] like an overambitious goal to see what the limit was and has quickly

[12:57] become the way we're building now of moving towards a factory.

[13:01] So I'll walk through some of the main components.

[13:04] How we're building at tehsil.

[13:06] I will withhold doing too much of a product pitch, though.

[13:09] I will just say once we've built most of it with tassels.

[13:11] So if you're interested, take a look.

[13:13] That'll be it.

[13:14] So it started with two core goals that we wanted to get done.

[13:20] The first is no human written code

[13:24] and the second was no interactive coding agent sessions.

[13:28] Sort of like just those two goals pretty much forces you to move into

[13:32] software factory territory.

[13:34] So the flow that we've settled on,

[13:36] I think it'll touch on some of the pieces you talked about.

[13:39] First thing is everything starts as an issue.

[13:42] And so I think pretty much immediately, if you're thinking about building

[13:45] a factory, the first question you have to ask is how are you going to track work?

[13:49] How are you going to define it? How are you going to manage it?

[13:51] How are you going to sort of  sling it around in Gastown parlance?

[13:56] So for us we use linear within within heavyweight.

[14:00] You are right.

[14:00] Sometimes we wonder if it's if we need all of it.

[14:03] So what we do is we file tickets.

[14:05] Those tickets, we then have a background orchestrator that is polling linear.

[14:10] Basically every time I take it as created, it will pick up anything that you

[14:15] delegate to the dark factory agent,

[14:18] what we've called it built internally.

[14:21] And then an agent picks up that work.

[14:24] It creates a PR all effectively.

[14:27] We started with some orchestration,

[14:28] like trying to do automatically put up the PR for the agent.

[14:32] We found that frequently broke.

[14:33] So instead we just give the agent GitHub CLI.

[14:36] It puts up the PR when it's done.

[14:38] Then we as an engineering team engage at the PR level.

[14:43] So we review.

[14:44] So that brings in another one talking about code review both

[14:47] from humans and from agents.

[14:50] It's going to be another area that you're quickly going to find is crucial.

[14:53] You guys do the same.

[14:54] No human code review either.

[14:56] Say again no human code review.

[14:58] That's a long term goal.

[14:59] Long term goal, but takes a little bit more work than the first two pieces.

[15:03] We do have a general.

[15:06] When you review the code before you directly leave comments

[15:10] and try to correct the agent immediately, you take a step back and you think about,

[15:15] how could I have fixed the harness, fix the overall system

[15:19] that the agent is acting in so that it wouldn't have made this mistake?

[15:23] And so we had one requirement.

[15:25] We asked of people before you leave any comments on the PR

[15:29] at least once, you have to rewind and make changes to either

[15:34] skills in the code base or add some unit tests.

[15:38] Change the architecture,

[15:39] do something that you think could have fixed it and try again.

[15:42] And then if it doesn't one shot

[15:43] the second time, then you can just leave comments on the PR.

[15:47] That's I mean, a really interesting observation

[15:49] is that no matter how you build yourself or factory, it

[15:53] basically has an ongoing hygiene and maintenance component.

[15:57] This was a big deal in Gastown.

[15:59] It's what the dogs wound up being being for.

[16:01] They were a dedicated role.

[16:03] But I mean, like, it doesn't matter how you do it, you're

[16:05] just going to have to spend some tokens on maintaining the factory.

[16:11] And so if you can I mean, like if you can build it into your your process

[16:16] so that everybody leaves it a little better than when they found it.

[16:19] Right?

[16:20] So like, you know, because every time you use the factory

[16:23] you're going to notice that it's slightly bit rotted somewhere, right?

[16:27] It's just like it's just the natural.

[16:29] The skills evolve, the systems change, and the skills are effectively

[16:32] to the new documentation.

[16:33] So they need updates and things like that. Right.

[16:35] And we'll talk about how Tessl can help there.

[16:38] Right.

[16:38] But it's a really interesting sort of like a mindset.

[16:42] Right. Which is you have to it's like a workshop.

[16:45] Like a mechanics workshop, right.

[16:47] Or a craftsman's workshop.

[16:50] They got to keep it clean, and they got to spend

[16:52] a certain amount of time on their tools.

[16:53] And many of these are going to be totally turnkey.

[16:56] You're going to you're going to want to build

[16:59] the maintainer roles into your factory, I think is what I'm saying.

[17:03] Yeah, yeah.

[17:03] And that's a great point.

[17:05] So I think getting started

[17:08] issue tracker that can immediately delegate into an agent.

[17:11] It puts up a PR you can leave feedback on.

[17:14] The PR agent will address those and put up changes.

[17:18] That's kind of like your core unit.

[17:20] Every factory is going to want something that looks like that.

[17:23] And it it might sound, I don't know, to to some folks as

[17:28] an advanced place to start, but I actually find that agents are pretty good now.

[17:33] So it's not like you're going to be constantly correcting every single

[17:36] PR that comes up.

[17:38] The important piece, though, is starting to work in this way.

[17:41] All of your interactions with the agent become very legible.

[17:44] So you have the ticket, you have all of your PR

[17:47] comments, you have the PR like the commits themselves.

[17:50] As a result, it becomes very easy to

[17:52] then start building these kinds of maintenance agents or sweeps,

[17:55] which is kind of like the next thing that usually emerges within a factory is

[17:59] that no matter how good your code review is, something slips through somewhere.

[18:04] And this is probably true of humans as well.

[18:06] And so you want to set up a set of,

[18:09] let's call them just like outside of a diff.

[18:12] But just like general scan the code base once a day, once a week,

[18:16] you had any sort of cadence you one and just look for ways to improve.

[18:20] So ones that will typically show up that we have

[18:23] internally at Tessl are an architecture agent.

[18:27] So one that just looks for areas of code duplication or week.

[18:31] Seems that might be hard to test something

[18:34] that looks through your test quality.

[18:36] So how's your coverage looking?

[18:38] Maybe does mutation testing or looks to see?

[18:41] Are there any new areas of the code base that could be tested better?

[18:45] Documentation?

[18:46] There's the list can kind of go on and in fact probably will go on.

[18:49] Like you'll just keep adding things as you find issues.

[18:53] And then probably the last one that I'll say, and this maybe

[18:55] we'll complete the intro to software factories we can go into.

[18:58] Some of the other topics are code review.

[19:01] In general, you're going to quickly develop a whole slew of solutions there.

[19:06] You're going to have general code review that just looks for things

[19:09] you haven't thought to catch.

[19:11] Claude has a code review tool that can do this.

[19:14] There's Code Rabbit.

[19:15] You can build your own Tessl's tools to help you set one up with a skill.

[19:20] And then you also want to have more targeted code

[19:22] review to look for the things that basically the philosophy should be.

[19:26] Anytime you find a mistake with the agent,

[19:28] you should never have to correct it again.

[19:29] There should be something that looks for that specifically.

[19:33] And this actually I'm curious, Steve, if this resonates with you.

[19:36] This was like a big change for me was how pedantic your linting

[19:40] can get in a software factory world, because you're asking agents to write.

[19:44] It doesn't actually matter if it's you're spending, you know,

[19:47] 50 lines of code to write a linting rule that just checks to see.

[19:51] Did they make sure that this file never imports from that file

[19:53] because agents frequently invert the architecture?

[19:56] An example of this on a side project,

[19:59] I was building my own agent orchestration tool.

[20:03] Who hasn't at this point,

[20:06] and I had a client for working with anthropic and a client

[20:09] for running the agent turn loop, and I said the harness

[20:14] should call anthropic, and anthropic should not know about the harness,

[20:17] and instead the harness implemented its own anthropic client.

[20:23] And then the anthropic client imported that and exported it

[20:26] to the rest of the code base.

[20:27] So I just wrote a linting rule that said, like

[20:29] the anthropic module should never import from the harness module.

[20:33] It's not really the kind of thing I would have written

[20:35] as a linting role in the past, but it feels much more natural to do now.

[20:39] So I'm curious, have you seen anything like that in the past, like in the way

[20:42] that you verify the code that is created, any changes

[20:45] from sort of like historical, like what you would have done, hand coding?

[20:51] Yeah.

[20:52] I mean,

[20:54] so like one of the one thing you got to worry about is

[20:56] if you just put don't do this, don't do that, you know, over and over again,

[21:00] then you're going to really want to set a evals that like

[21:03] tell you, do you still need that when the next model drops.

[21:06] Right. Yeah.

[21:08] Otherwise you're going to accumulate forever and kind of be useless.

[21:12] So I think that's just another another example of another sweep.

[21:17] You're probably going to want to set up regularly to go and basically

[21:21] reevaluate every single rule that you put in. Yep.

[21:24] Yeah, yeah. Another kind of core competency.

[21:28] And maybe this is a good a good segue into how the profession is changing.

[21:33] Thinking through like  as models are released,

[21:38] do they solve problems that you couldn't solve before?

[21:41] I think you've heard

[21:42] you use the term like pocket evals or something of your hard tasks

[21:46] that the best model can't currently do, but maybe the next one can.

[21:50] But there's the inverse to there's may be glue work that you've done

[21:55] to get the current generation of models working that is no longer needed.

[21:59] How are you going to tell when that happens?

[22:01] How are you going to strip out the context, the rules,

[22:05] the hooks that you had added that are no longer needed?

[22:08] Yeah.

[22:09] So like that's the new job, right?

[22:12] I mean, like software factories ultimately are going to install 24 over

[22:17] seven autonomous agents that are performing all of the business

[22:20] processes that that the company is performing now.

[22:24] And we're going to babysit them. Right.

[22:28] And that kind of maintenance is exactly part of the stuff that we're going to make

[22:32] sure it gets done.

[22:33] And as our ambition grows and our factories grow, right,

[22:39] those those things that we're doing by hand

[22:42] get skills, get built, they get pushed down into the infrastructure.

[22:45] We're looking at higher level concerns. Right.

[22:48] And and the whole thing has to be it has to be growing constantly.

[22:53] But it also has to be forgetting constantly.

[22:56] Right.

[22:58] Like mathematically, it's becoming really clear that

[23:00] forgetting is an intrinsic part of any functioning memory store.

[23:04] Otherwise they get dementia and go insane, right?

[23:07] Or just become wrong.

[23:09] So. So yeah, you're building almost a living system.

[23:13] Do you think that as we build factories, they'll ever be a stable point,

[23:18] like a moment where you're like,

[23:19] your factory is done and it just produces the work for you? Or.

[23:24] I mean, I think the

[23:25] ceiling just keeps going up for what a factory can build for you.

[23:28] And then above that ceiling

[23:30] enters engineering and craftsmanship and taste and.

[23:34] Right.

[23:35] I mean, until we've built

[23:36] the actual literal Death Star, there will always be more work to do.

[23:40] You know, like, I just like, you know, it's funny, the guy that

[23:44] the guy at anthropic that I saw from talking to you on Monday,

[23:49] who was saying that internally they feel that they are ambition bound

[23:52] now, right?

[23:55] It's just like it's getting incredibly hard to even just think what to do.

[23:59] Right.

[23:59] So yeah, I mean, the job is, is is changing super, super fast.

[24:04] Will it ever get stable at this point?

[24:07] It wouldn't bank on it.

[24:10] What do you think?

[24:11] If you had to sketch out like two years from now,

[24:16] a day in the life of a software engineer, what do you think they're

[24:18] what are they doing?

[24:19] What are the skills they should be building?

[24:23] Well, hopefully they have very good work

[24:25] life balance.

[24:28] And they come in with their coffee in the morning and they look at their team

[24:33] of 200 agents and go, all right, let's get started.

[24:38] How did everyone do? Right.

[24:40] I mean, it's kind of what we do right now and where we sort of their.

[24:44] So yeah, I mean like look,

[24:50] roles are collapsing.

[24:52] Maybe ideal company sizes are shrinking a little bit.

[24:55] Right.

[24:56] But I mean like ultimately

[25:00] everybody's scared that the introduction of these software factories

[25:03] is going to reduce the workforce because the factories are doing

[25:06] a bunch of work that we were doing by hand.

[25:08] But there's really two

[25:10] kinds of companies in the world, and I think most of them are the

[25:13] the ambitious kind.

[25:14] There's the kind that have one thing to do,

[25:16] and all they care about is making it more efficient.

[25:19] Right.

[25:20] And those those companies can probably shrink.

[25:23] But I think most companies secretly want to do a lot more than they're doing now.

[25:27] And they're just going to realize that once all these things are deployed

[25:31] and they've got all that yak

[25:33] shaving out of the way, that they can finally, like, set their sights high.

[25:37] Yeah.

[25:37] And I'm personally feeling this right now just with my own,

[25:40] my video game that I've been working on for 30 years.

[25:43] I counted up my bug backlog during Covid and I had 100 years of work.

[25:50] This is from players and bug reports, feature requests,

[25:54] and me, my own things that I wanted to do.

[25:55] And eventually the backlog backed up to 100 years and I gave up.

[25:58] Right.

[25:59] And now, you know, I have ambition to spare, right?

[26:04] So, yeah, I mean, I just never lose sight of that, right?

[26:08] Because you'll get really depressed if you start thinking about,

[26:11] oh, God, they're doing all the work now.

[26:12] What even value do I bring?

[26:14] Don't think about it that way.

[26:15] Think Death Star, right.

[26:18] Or whatever your North Star is.

[26:23] I heard a couple things in there that definitely resonate,

[26:26] like collapsing roles.

[26:27] So probably folks who were more specialist, like,

[26:32] I just write really good code, or I just know how to talk to users.

[26:37] Going to be a little bit more general purpose.

[26:39] You're going to want to be able to self-serve a little bit of design,

[26:42] a little bit of product, probably a lot of engineering discipline.

[26:46] Also, you mentioned what sounded like maybe backlogs are kind of gone, right?

[26:51] So you're pushing a lot more parallel features,

[26:56] task switching, multitasking.

[26:59] I'm kind of curious, how do you feel?

[27:01] I don't know what kind of engineer you were before agents,

[27:05] but it does feel like the I'm just going to go sit in a cave for a while

[27:08] and just think really hard about this one problem.

[27:12] Nobody's going to talk to me for three days, and I'm going to emerge

[27:14] with this beautiful, pristine piece of scalable architecture.

[27:19] It feels like some of that's gone away now.

[27:20] It's a lot more

[27:22] juggle five features at once, sort of checking in on them as they go.

[27:26] Do you?

[27:26] Does that make you happy? Make you sad?

[27:30] Indifferent?

[27:33] I mean, it's all about the dopamine, isn't it?

[27:35] In the end, what are you going to get it from?

[27:38] Right.

[27:38] I used to get dopamine hits from implementing Bresenham's algorithm.

[27:42] I'm not making this up.

[27:43] All right.

[27:44] I'd see a line draw a pixel at a time on this ancient CRT.

[27:48] And, you know, 1991, in University of Washington.

[27:51] And I'd be like, yeah, I'm a programmer, right?

[27:54] But I didn't really want to draw a line.

[27:56] I wanted a video game. Right.

[27:58] And so graphics programing has changed dramatically.

[28:01] Right?

[28:01] And now we do the stuff that we really wanted to do.

[28:05] So I mean, I see yeah, I wrote a lot of beautiful code in my game.

[28:09] I wrote a really nice implementation of a star search,

[28:12] which is a really fantastic search algorithm, especially for games.

[28:16] And I wrote a really lovely kernel and scheduler and property system.

[28:20] And, you know, I locked myself up for days at a time and.

[28:24] Right.

[28:25] And that's a wonderful kind of aspect of the job that's kind of gone now.

[28:30] Right?

[28:32] But I didn't want to write a star search.

[28:34] I wanted monsters to chase me.

[28:37] Yeah.

[28:37] I mean, you got to, like, remember what you're in it for, right?

[28:41] And you're in it for outcomes.

[28:42] You're in it for experiences, you know, you're in it for delivery.

[28:46] And ultimately, that kind of fun that we were having along the way

[28:51] was, you know, temporary.

[28:55] I still get some of the buzz from coding just by like

[28:58] making the making the A's go rewrite it, you know, to be better.

[29:03] And then I look at the output and I'm like, yeah,

[29:05] you know, you get them vibes a little bit, right? Yeah.

[29:07] But you know, it's it's a new it's a new world, right?

[29:11] I mean, I liken it to a dog sticking their head out the window.

[29:14] You get the smells way faster. Right.

[29:16] You know it's nice.

[29:18] It's also nice to have one smell and, you know, kind of like it, you know.

[29:23] Right.

[29:24] But I don't know, it's just we're headed towards a faster a faster world.

[29:27] Yeah I've definitely noticed to that.

[29:31] Like dopamine hit a lot of times.

[29:34] Some I get just from crafting the system.

[29:36] I'm sure there's lots of folks in here who love the

[29:39] I've built my beautiful little worlds that this agent talks to that agent,

[29:43] and then this check runs and all of that is like,

[29:46] everybody wants to build their own workflow engine.

[29:49] At least at Tessl we do.

[29:50] We love workflow engines.

[29:52] There were 50 of them at Google when I left.

[29:55] I was keeping an inventory of workflow engines that engineers

[29:58] had built at RGB for Grube Goldberg machines.

[30:03] Yeah, yeah.

[30:05] Yeah yeah.

[30:06] You also get to spend a lot of time thinking

[30:08] about architecture, technical design in some sense.

[30:12] Some of the more I don't know what people might have called,

[30:15] like the elevated parts of the job, the senior architect,

[30:19] the visionary aspects kind of everybody gets to work on those now,

[30:23] like the drudgery of writing code, I call it

[30:27] call it drudgery to dig up the architecture.

[30:29] I know some people really enjoy just the actual crafting of good code,

[30:33] but it allows all of us to move up a level,

[30:36] probably the things that we aspired to and move it to your point,

[30:39] keeping a focus on that, on where you had wanted to go in your career,

[30:43] probably was moving to some of the things that now

[30:45] we get to work on more with, with the coding agents.

[30:49] Yeah.

[30:49] I'm curious though, do you think there are any, any risks,

[30:53] any things that we should be

[30:54] particularly vigilant as we move into this world of factory

[30:58] building and more agent review of code, less human review of code.

[31:03] Like anything we should hold on to.

[31:06] Yeah.

[31:06] I mean, yeah, I mean, I don't know, we,

[31:09] we got we got to learn the lessons by, by doing it.

[31:12] Right. So you know, go burn tokens.

[31:16] The big lesson I think we all learned is from January through April.

[31:21] You could argue that Gastown kicked it off in a way was token maxing.

[31:25] Right.

[31:26] And the industry just went through a love affair with token maxing.

[31:29] That was a lesson that we had to learn, which is that

[31:32] first you have to teach people to spend tokens like their token spend

[31:37] will go through some step functions, but then when they once they actually

[31:41] know how they become pigs and you have to teach them to not spend tokens, right?

[31:45] It becomes like the new challenge.

[31:47] So you know, yeah, if you enable copilot for your whole org,

[31:52] you run the risk of blowing your AI budget for the year by two months later, right?

[31:57] Two weeks later.

[31:59] So so we've noticed, actually, drew and I independently came

[32:02] to this conclusion is that there's a there's a training problem ahead.

[32:06] Right.

[32:06] There's an enablement problem.

[32:08] Yeah. Like orgs like people.

[32:11] People don't know how to do a coding let alone build software factories.

[32:15] Right.

[32:16] But I would argue that

[32:20] every knowledge worker in the next 12 months

[32:24] has to level up to at least the baseline level

[32:28] of AI literacy, of being able to use an agent to help them with their work.

[32:32] Right. And that's a huge it's not that bad.

[32:35] It only takes five hours,

[32:36] according to Netflix, of good training for the light bulb to go on.

[32:40] Until then, they're all terrified that AI is going to take their job,

[32:45] and after that, they're excited to have the conversation about how they can.

[32:50] They and their agent can help. Right.

[32:52] So so this this is what we run into is we talk about

[32:55] software factories to companies who haven't even started using agents yet.

[32:59] Right.

[33:00] And and we're talking kind of talk and past them.

[33:03] So there's a huge I think we would call it a risk.

[33:06] But the risk is that we don't train people.

[33:08] And all of a sudden there's a big train wreck, right?

[33:10] Companies don't operate properly anymore.

[33:13] Yeah, I think with factories in particular,

[33:16] to your point, it can often be presented as this frontier,

[33:21] this thing for the people who are like some greenfield startup that's just

[33:24] getting started working 996 totally AGI pilled.

[33:28] But really, at the end of the day, it's

[33:30] just a matter of finding repeated workflows and automating them.

[33:33] Like it can be a very just, piece by piece task.

[33:36] It doesn't have to be scary.

[33:37] It doesn't have to require a lot of advanced capabilities as you go.

[33:43] It's just a dedication to working in a particular way,

[33:46] taking a step back and automating things.

[33:49] And I think that's a lot of the training you want to do, right?

[33:51] You want to show people how to view the problems that they're working

[33:56] on, show them, get them to at least a couple points of success.

[33:59] I think with token maxing, obviously it's become a bit of a meme

[34:03] now, as everybody saw the bills that sort of came due at the end of it.

[34:06] Of course, I'm sure there was a way we could have gotten a lot

[34:09] of these success stories without quite so many zeros on the end of the bill,

[34:13] but there is a certain amount of you kind of have to just let it rip first,

[34:17] find some things that work and get people excited and then reign it back in.

[34:21] If you try to start from the beginning of being prudent,

[34:24] you'll sort of undershoot the mark every time.

[34:27] Yeah, let it rip.

[34:28] And with that, maybe we should do questions.

[34:30] Yeah, let's do some questions.  Let him rip.

[34:32] So we don't have microphones for folks.

[34:35] So just shout them out.

[34:36] Raise your hand. I'll call on you

[34:37] and then I'll repeat the question for everybody we can go through.

[34:40] So question for everybody.

[34:41] What's our favorite recent factory technique or

[34:44] something that you've tried that was really impactful or cool.

[34:48] You want to take a first TV? You want me? Yes.

[34:50] Fable lashing together a sled dog team of Opus.

[34:54] Yeah, yeah.

[34:56] It's going to be the new one, right?

[34:58] I mean, I mean, for real, the technique

[35:01] of getting smarter models to manage lower tier models,

[35:05] that's going to be a game changer if you can dial that in.

[35:08] Right. Because yeah. Yeah, yeah..

[35:11] I think probably maybe a very specific one for me.

[35:14] So I have developed a sort of recurring harness

[35:19] that I'll for every new project that I work on, I'll put together

[35:23] a big part of it.

[35:24] A sweep, to use your parlance, is on test quality.

[35:26] And I've added in mutation testing as a very particular.

[35:30] So if folks aren't familiar, mutation testing is where you go in

[35:34] and you permute the code in ways that should be breaking.

[35:37] So you change boundary conditions on conditionals, or you will

[35:40] change sort of magic numbers within the within the code.

[35:44] And then you look to see if any of your tests.

[35:46] We caught the what should have been a breaking change.

[35:50] You can do this in two ways.

[35:52] You can do it on a diff and it'll only make changes within the

[35:56] effectively the PR you've put up.

[35:58] Or you can do it across the whole code base.

[36:00] And I swear by this now.

[36:02] So I have it set up where every PR.

[36:04] I so like it finds a bunch of stuff that coverage doesn't exactly.

[36:07] Yeah. Yeah.

[36:08] So the combination you'll set like a minimum bar on coverage.

[36:12] Typically what I'll also do is set in PR like in CI, CD.

[36:18] The PR that went up needs to have within the diff itself near 100% coverage.

[36:23] So it's like you don't want to have a file that already has a lot of coverage.

[36:27] A change within that sort of sneaks past.

[36:30] But coverage can often be theater, so you want a way

[36:32] to actually prove that the tests are catching real behavior.

[36:36] So on every PR, I'll have mutation testing set up

[36:40] where you don't want it to run directly because there can be false positives.

[36:44] But I'll have an agent look at the results of a mutation testing report on the PR.

[36:49] We'll leave comments for anything that wasn't caught, and it pretty much

[36:53] always leads to an improvement in the test suite.

[36:55] And then once a week, I'll do the same thing over the whole code base.

[36:58] And that with that, I find my test suite is pretty reliable

[37:03] and allows me to sort of get much closer to not reviewing the code.

[37:06] What's like an example of coverage gap that have found where you're like, oh, I'm

[37:10] very glad about that.

[37:11] Probably the biggest one is in boundary conditions.

[37:15] So there will be a lot of there is business logic

[37:18] encoded in things like this list will never be empty.

[37:23] And your test agents love to test things like once or twice.

[37:26] So they'll do five and then 50 and they'll never check zero.

[37:30] And so that's probably the biggest area I see it catching over and over again

[37:35] is the little assumptions that you have baked

[37:38] into your product that need to be represented in the code.

[37:41] You want them to be in your test suite as well.

[37:43] So the question was

[37:45] how much of the factories that we build are deterministic versus

[37:49] just relying on the model to do the right thing?

[37:52] I call it the trust fall version of the of the factory.

[37:55] Within Tessl.

[37:57] We started very deterministic.

[37:59] So we tried to have clear phases where the agent would build something.

[38:03] And then we had our harness come in and create the PR and put it up.

[38:08] We would

[38:09] as comments were made, we would ferry them back down to the agent, at least for us.

[38:13] I found we found pretty much you want to rip that out?

[38:16] Like every piece of deterministic code you write that tries to orchestrate,

[38:21] it becomes a source of brittleness in the factory.

[38:25] And again, I'm saying this is from our perspective.

[38:27] So what we found, it becomes brittle.

[38:30] So it's pretty shocking the number of times

[38:34] you think this is the truth for every single feature we build.

[38:37] And then you realize,

[38:38] oh, actually, like 15% of the features don't follow this pattern.

[38:42] One simple one is like stacking PRS and you realize like,

[38:47] oh crap, our orchestrator has made that physically impossible at this point.

[38:51] So we've pulled back pretty aggressively to say,

[38:55] you give the agent the GitHub CLI, you tell it what to do.

[38:59] The main place we put deterministic checks are at the end.

[39:02] So we have a bunch of hooks.

[39:03] We have a bunch of like CI, CD like run the unit test suite, check to make sure

[39:09] certain skills were loaded before you can stop things of that nature.

[39:14] Yeah.

[39:14] So the question was do we just operate with the hooks of the basic harness?

[39:18] And I would say, yeah, like most of it is we will I'll use

[39:23] as an example for myself, anytime the agent tries to do a tool call

[39:28] to do a git push or a get commit,

[39:31] run the unit tests and linter, and if they don't pass,

[39:35] lock the tool, call and tell it.

[39:36] You need to run these first and go fix them.

[39:39] If it tries to stop session you check.

[39:41] Is all your work committed?

[39:42] Did you put up a PR?

[39:44] If not, you can't stop. You need to go do that.

[39:46] But otherwise my preference and Tessl were certainly a lot more.

[39:51] Just lean on the agent.

[39:53] I'm curious about you.

[39:55] Oh excuse me, I think there's a lot of different ways you can kind of

[39:58] like there's a couple of different ways you can like, think about determinism, but

[40:02] one, one axis is, you know, open

[40:05] claw versus gas town open claws.

[40:08] Give the agents a goal and let them go swarm off and do it.

[40:11] And Gas Town is break your work down into really small deterministic pieces

[40:15] that they're going to execute in a specific order, right?

[40:19] If the order matters.

[40:21] Otherwise they can do it whatever order. Right.

[40:22] But the idea is, is very different from open claw.

[40:25] Right.

[40:26] And so that's one way to look at it. Right.

[40:29] Which is how much leeway do you give the agents versus

[40:33] how much are you trying to like lay out what they're going to do.

[40:37] Right.

[40:38] There's another dimension to it, which is quality where you're trying to.

[40:43] And it sounded to me like you were focusing on the quality dimension,

[40:46] which is how do I make these things not make a mistake in one pass?

[40:52] If you're talking about Lang chain, you're talking about

[40:54] trying to keep things on the rails, trying to make them not skip one step.

[40:58] And you're thinking about it fundamentally in terms of

[41:00] how can I make it smarter in one pass?

[41:02] And the answer is you wait for the next model drop.

[41:04] I spent all of last year trying to code this.

[41:07] I have a repo up on GitHub called Vibe Coder or maybe VC.

[41:11] I have two of them where I tried

[41:12] to solve this problem, and I realized that the answer?

[41:15] You're just fighting the bitter lesson.

[41:17] The answer is you do multiple passes and the answer is always swarming.

[41:23] Swarm. Swarm. Swarm.

[41:24] Adversarial.

[41:25] Adversarial reviews consensus

[41:28] like just like painting these walls here, don't think about

[41:31] how can I build a machine that will paint the wall

[41:33] perfectly on the first coat every time?

[41:35] No multiple passes, multiple coats, right?

[41:39] That's how that's how we code. So.

[41:41] So factories have to be very stochastic and and quality becomes

[41:44] a dial that you choose how many tokens you're going to spend on it.

[41:49] Does that make sense?

[41:51] Cool.

[41:51] I think determinism of The Shape of Work is a good one too, though.

[41:55] Like breaking things down into  task trees.

[41:59] I like that for SOC two compliance.

[42:02] Yeah, exactly.

[42:03] When we go here.

[42:06] So the question was sort of philosophy to factory building.

[42:09] Do you start from a top down and I will reinterpret a bit.

[42:14] Tell me if I've gone too far off the rails, top down, sort of

[42:17] start from a vision of how the system

[42:20] should work from a central orchestrator that sort of builds outwards.

[42:24] Or are you more bottoms up?

[42:26] Like just start with a unit of work and then layer more on as you find what works.

[42:32] Steve, what do you think?

[42:35] Yeah.

[42:35] So I mean, like I'm always reworking mine, right?

[42:40] Like Gastown was like a perpetual rework until I got into a specific shape

[42:44] that I particularly like, which is on the one side, I have a handful of agents

[42:48] that I do deep design reviews with deep context.

[42:51] It's like I call them a crew.

[42:52] And on the other hand, there's the throwaway, ephemeral,

[42:55] really well specified work that we're just going to throw agents at.

[42:58] Right?

[42:59] And that shape keeps recurring in my work because like, the throwaway

[43:03] stuff is like, oh, I just have a big parallelizable thing.

[43:05] I'm just going to split a fleet up, right?

[43:07] So like, I keep making my way back to the Gastown shape.

[43:11] But I started from first Principles again

[43:13] recently, and I was building a software factory.

[43:15] And it's interesting because you build it up by adding agents

[43:18] and maybe letting them know about each other and you know,

[43:21] they share work,

[43:22] and it gets to a certain point and they're humming and you'll have like

[43:25] 12 agents run and you realize my factories the wrong shape.

[43:29] I finally you know what I mean?

[43:30] It's a stochastic process.

[43:32] Also discovering what your factory looks like.

[43:34] So you're like, God damn it,

[43:35] I got to shut the whole thing down now and stop all the agents, let them drain.

[43:40] Right, you know, and then, like, and then move all the directories around

[43:44] and reshape the factory scripts and stuff.

[43:46] So they all know where the new places are creating new clones or agents

[43:49] that I need, and then boot the whole thing back up again and see how I like it.

[43:54] Right.

[43:54] And it takes it takes a few iterations, right?

[43:57] And it seems I haven't figured out yet which parts are bespoke to the project

[44:01] and which parts are generic that I'm going to bring along with me.

[44:05] But boy, the faster

[44:08] you can kind of set up and tear

[44:09] down your factory, the better you're going to find your way to it.

[44:11] Yeah.

[44:13] Yeah, I think it's quite similar at Tessl.

[44:15] And I'll do a light pitch here for the Tessl agent,

[44:18] which tries to help you in building your software factory.

[44:22] We take a very bottoms up iterative approach,

[44:26] I think for two big reasons, or maybe three.

[44:29] The first is everything is changing so fast, it's really hard

[44:33] to just start from the top and get it all right as you go.

[44:37] And it's much easier to say, here is a unit of work that I like.

[44:41] Shape it around the work itself.

[44:43] Like this is a task I know I do every week.

[44:45] I just want to automate it.

[44:46] And then you sort of layer on piece by piece.

[44:49] You'll then have 4 or 5 automations that look kind of the same shape.

[44:52] And so you'll build a thing that makes it easier to make that kind of automation.

[44:56] And you sort of like a reverse jawbreaker, like you build up many layers

[45:00] on top of it.

[45:02] It's also the best way to  actually get unstuck and start working.

[45:05] I think anytime you try to ingest the entire software development lifecycle

[45:11] in your head at once and say like, yes, I will design everything perfectly,

[45:15] it's like a recipe

[45:16] for spending two months figuring out something that won't even work at the end.

[45:20] But again, if you just say, I do this every week,

[45:23] what if I didn't have to do it? What if an agent did it?

[45:26] What if agents bumped our versions every week?

[45:28] Or what if agents ran mutation testing and then made our tests

[45:31] a little bit better, or a little bit less flaky?

[45:34] We found that that works a fair bit better.

[45:36] And so that's the philosophy that our product takes

[45:38] is just find one thing each week and make it a little bit better.

[45:41] So the question was, how do you train people on

[45:46] AI native development, but in a way that stays relevant,

[45:51] doesn't grow out of date with the next model release or the next

[45:54] new technique or new new tool.

[45:57] I know you just had a post about this seat.

[45:59] Maybe you want to. Take it.

[46:00] I did, yeah.

[46:01] Not to toot my own horn honk, but actually Netflix solved this problem for us.

[46:06] Thank you Netflix. So I just posted about this.

[46:08] It's called the Flat Curve Society.

[46:11] It's a medium post I just did where I talk about a program

[46:14] that Netflix presented that shows that there's an exact formula

[46:19] for getting people over this hump, and it takes five hours,

[46:22] but it has to be their manager and their work on working hours.

[46:26] Blessed with a trainer, they were training our book as the curriculum.

[46:30] Although you could train anything right?

[46:32] They just have to be doing the real work and it's that immersion.

[46:36] It's not really training, it's more like instructor led work, real work

[46:40] and the whole the whole cohort.

[46:43] If it's no more than ten people,

[46:45] you can read all about it,

[46:46] but basically they will all flip into the 4 million tokens a day category,

[46:50] which is single agent synchronous throughout the work day.

[46:53] And that is actually the moment where they have become

[46:56] AI literate and they can start having real conversations with you.

[46:59] Yeah, yeah.

[47:01] I think probably the the most important thing is to get people

[47:05] to some kind of an moment, because for a lot of folks,

[47:10] it's not really that they need to be trained on AI.

[47:12] They need to get excited enough that they go start training themselves on.

[47:16] I like a lot of people are just afraid or they don't think it works,

[47:19] or they're just put off by the hype of it all.

[47:23] And so I think a lot of that Netflix training course is like, give people a day

[47:28] blessed with their team, with their manager,

[47:30] and just get them to a place where they are now excited to use agents.

[47:34] And then a lot of stuff will come for free from that, right?

[47:36] Like they'll just go do side projects, they'll try things.

[47:39] They'll they'll test. Out they know how to.

[47:42] They can now delete your database accidentally.

[47:45] Exactly, exactly. That's what I thought.

[47:46] Like I basically I feel like I do those trainings, I work at Google.

[47:50] So you know, the culture and the streets.

[47:53] I feel like I'm giving some people

[47:55] a hammer and some people are using it in ways hammer shouldn't be used.

[47:59] Well. Yeah, yeah, yeah.

[48:01] I mean, so getting them to literacy and then multi-agent

[48:05] literacy is like two steps of a ten step journey, right?

[48:09] So the question was, any common components

[48:11] that keep showing up, even if the factory itself is bespoke?

[48:15] There's sort of like stock units that you use within it.

[48:18] That's kind of your whole product, isn't it? Hopefully.

[48:21] Yeah. Did you pay him?

[48:23] Is that a show?

[48:23] Yeah, yeah you can.

[48:25] I'll pay PayPal you afterwards.

[48:26] Know the certainly at Tessl we think that there are some

[48:30] and we try to help with that.

[48:32] So maybe I'll start with the ones that we've been building.

[48:35] You want some way to connect your issue tracker to your source control.

[48:41] So we have a Tessl app for linear and for GitHub.

[48:45] Very basic.

[48:46] All they do is you can delegate work to the linear app, and it will forward it

[48:49] to the GitHub app so that you can kick off CI jobs

[48:53] that run workflows you need that.

[48:58] We didn't have that at first.

[48:59] And we found and this is surprisingly common.

[49:02] Maria shout out to Maria built our first orchestrator.

[49:06] And so there was a period

[49:07] where for like two weeks every PR and every comment was from Maria.

[49:11] And there's just like identity issues there.

[49:14] There's like nice UX pieces.

[49:16] So how do you hook that up?

[49:18] That's one thing that you're always going to want to build.

[49:21] Another is some kind of a cloud environment for running agents.

[49:25] So you can do it in GitHub actions.

[49:28] It's not the cheapest if you run a lot of automations through GitHub actions,

[49:32] and they're not the most suited for long running a genetic tasks.

[49:37] So you have to like set up

[49:38] sidecars, refresh your GitHub tokens, and it's not the best.

[49:42] So it's just like a hosted service like that.

[49:45] Somebody needs to build there.

[49:47] There are I think some folks,

[49:50] they tend to tie it to a broader like orchestration platform.

[49:52] But there are tons.

[49:53] There's factory, there's warp, there's Oz.

[49:56] There's lots of folks who try to help here.

[49:58] So there are ones you can pull off.

[50:00] Tessl's one that's very simple.

[50:02] It's just you use a skill to define a workflow,

[50:05] and then we'll just run that in a cloud sandbox with access to GitHub.

[50:09] And it can go as long as you want.

[50:11] And then probably the biggest one outside of

[50:15] those is a set of code review tools.

[50:18] And so you want ways to do a genetic code review.

[50:22] You want to know as I leave comments in addition to the agents comments,

[50:27] are those getting

[50:28] worked into the code review so that next time the agent will catch it,

[50:31] you're going to want ways to do more specific checks.

[50:34] So if Tessl, we have a thing called verifiers, which you can think of

[50:38] as very, very focused linting rules that are powered by LNS.

[50:43] So it allows you to do slightly more broad, vague things,

[50:48] but still targeted to a specific file and a very focused check.

[50:51] Like every JSX element must have Aria attributes on it,

[50:55] and you can check those kind of things.

[50:57] Follow up question was plumbing

[50:58] between I'm guessing like workflow steps or things like that.

[51:02] I would say for us, we found that those get in the way sooner than they like.

[51:08] They outgrow their welcome very quickly.

[51:10] And so we have moved to a world where most tasks are.

[51:13] Just the single agent runs to completion,

[51:17] and then you have a bunch of checks in CI that improve its quality.

[51:21] And besides that, you're just running the GitHub CLI for it to interact.

[51:26] Probably the main orchestration we run is in the task tracker itself.

[51:30] So you'll create a parent task with things that are blocks and then blocks.

[51:35] And that's like your that's effectively your Dag for execution.

[51:40] But at this point we've built like six different orchestrators in Tessl.

[51:44] And everyone starts with a lot of plumbing and ends with no plumbing,

[51:47] because we always realized that it was more hassle than it was worth.

[51:51] So the question was any unique challenges if you want to use local models

[51:55] instead of the API frontier providers for building a software factory.

[52:02] Steve, anything you want to jump with?

[52:04] I think it's a huge market opportunity here for somebody to come along with like

[52:10] hosted local models with a Claude Code

[52:12] like hosted turnkey offering.

[52:17] You know what I mean?

[52:18] I mean just just a drop in replacement for Claude Code

[52:21] that uses local models on on cheap inference, right?

[52:25] Or even ideally finds a way to use whatever GPUs you have around.

[52:29] Right?

[52:30] I mean, I think like like people want off the Claude Code train

[52:33] if they can find local models,

[52:35] especially if we can fix that intelligence arbitrage problem.

[52:38] Right.

[52:38] Because then you get one Claude Max account to do all the planning

[52:42] and you have the open source models do the implementation.

[52:45] I think we're what, seven months away in December?

[52:48] I think we should all have something there.

[52:51] I can't imagine

[52:52] we'll I'll still be paying anthropic for all of our tokens by next year.

[52:56] Yeah.

[52:58] Yeah, I think

[52:59] probably the two big things I'd add to that for a while.

[53:03] Folks have said like open source models haven't had their

[53:07] like Sonnet 4.5 moment yet where it's like agents really got good.

[53:11] I think some people think maybe GLM 5.2 might be

[53:14] that problem is that's still going to have to be hosted, right?

[53:18] Like GLM 5.2 is I think over a trillion parameters or something.

[53:21] It's yeah I've seen the rig you need.

[53:23] You need like. 20 or something.

[53:25] Yeah. Yeah, exactly.

[53:26] So probably the biggest thing you're going to face is just

[53:30] for the foreseeable future, if you want truly local,

[53:33] like I'm not renting anything, this is just sucking power from my outlet.

[53:38] You're going to be limited to like, much smaller models.

[53:42] And that's going to be tough as the distillation curve sort of brings

[53:46] knowledge down.

[53:47] But I think coming back to something you said, Steve,

[53:49] you can just throw more tokens at it.

[53:51] If anything, you can be even more gluttonous with tokens

[53:54] because it's just power.

[53:55] And so maybe connecting it back,

[53:58] maybe you do need more orchestration than where you need to run a task through

[54:01] like six, seven, eight review passes before you move on.

[54:06] You can basically make up a lot of that intelligence,

[54:09] so you might have more wiring than you have to do that.

[54:11] This is this is why factories are so important.

[54:14] It's because low tier models are always going to be important

[54:18] because they're cheap and they can get stuff done, but

[54:21] they need help being kept on the rails because they're low tier.

[54:25] Right.

[54:25] So the factories just they feel that space.

[54:27] For me, I think it's the higher tier models come along.

[54:30] You're going to use their

[54:31] you're going to use them to just keep your factories on the rails.

[54:33] But you're always going to use the lowest tier models you can.

[54:36] Right. Yeah.

[54:38] Yeah. The factory mindset I think

[54:42] brings you into one of process optimization and monitoring.

[54:45] Right.

[54:45] Like you could use I don't know, I'm obviously going

[54:50] to reveal a lack of physical knowledge about like real factories here.

[54:54] But you could use the most titanium platinum coded screws

[54:58] for every single thing and be like, okay, but I replace this piece of machinery

[55:02] every two months, so why would I spend all the money on it?

[55:05] I think one of the same thing with models, right, where maybe you use

[55:08] Fable to plan, you use Opus to break down into milestones and then.

[55:13] DeepSeek implements it. Yeah, exactly.

[55:15] And I think getting good at that is going to become

[55:18] a core competency of software engineering is you

[55:21] look at not a given PR but a system that produces PRS.

[55:25] How do I do that effectively.

[55:27] So how often are we changing models versus using the same

[55:31] maybe specifically for code review, but also just more generally.

[55:36] I'm making a

[55:38] push in that direction just because I don't really like

[55:42] telling my wife I have five Claude Max accounts.

[55:45] She's like, what is this?

[55:47] So you know.

[55:48] Yeah, right.

[55:49] I think.

[55:53] Because they're much better at reviewing than generating.

[55:55] So you can generally go with like

[55:57] a whole class lower and still get a pretty good review, right?

[56:01] I. I think similar for me anytime.

[56:05] And I think, Amy keep me honest in this as well.

[56:09] I think if you get into the game of trying to pick a specific model

[56:14] for your interactive

[56:15] sessions, it's kind of a losing game because it's hard to anticipate

[56:19] when a task is going to get complicated, when a mistake will be found.

[56:23] And so I find most people who go that route,

[56:26] they always end up doing the biggest, fastest model

[56:30] or like best model they can afford all the time.

[56:33] I think where it pans out a bit better is in the factory mindset.

[56:38] If you can find a recurring task and sort of draw a box around it

[56:42] and pull it out and say, here's a workflow that I do a lot, or here's a playbook

[56:47] for adding a feature to the CLI, or shipping a front end change, etc.

[56:53] once you have that now it's very fixed.

[56:55] Like, you know, the task is going to go through how often it's going to fail.

[56:59] That becomes a much better target for optimizing the right model.

[57:03] And because it's something

[57:05] you've put a box on, you're running all the time, it's worth it, right?

[57:07] So code review is a great example there where code review is pretty stable right?

[57:12] You can maybe have a few gates by complexity size of the diff.

[57:16] And then it is actually consistent enough

[57:19] that you can set a model for each type that you want to run.

[57:23] Same with any automations that you create.

[57:25] And so that, at least for me, is where I found more success.

[57:28] And then Opus or Fable for any interactive session is like

[57:33] it's my default at least.

[57:35] All right.

[57:36] Well thank you everybody. This is lovely.

[57:38] Thanks. Cheers.

[57:44] Oh, no. Oh!