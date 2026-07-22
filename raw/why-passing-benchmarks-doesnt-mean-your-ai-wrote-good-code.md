---
type: youtube
url: https://www.youtube.com/watch?v=X5mI1ZVxaIc
title: "Why Passing Benchmarks Doesn't Mean Your AI Wrote Good Code"
channel: Boundary
date_saved: 2026-07-22T06:27:29.069Z
speakers:
  - Vibv
  - Dex Horthy
---

# Why Passing Benchmarks Doesn't Mean Your AI Wrote Good Code

[0:00] Both Dexter and I feel that it's

[0:02] inevitable that all code will turn to

[0:04] [ __ ] unless we do something about it and

[0:06] something drastically [music] different

[0:07] than what we're doing today.

[0:09] >> Some of the things these new benchmarks

[0:10] do is they get more towards what can we

[0:13] verify deterministically or with models

[0:15] to get better than this just did it fix

[0:18] the tests.

[0:18] >> It's [music] really important to think

[0:19] about if these benchmarks actually model

[0:21] your own workload and if it doesn't then

[0:23] it doesn't matter how good the models

[0:24] are. It's funny because like I think

[0:26] about this and like there are no

[0:27] benchmarks for human engineers. I mean,

[0:29] there are, but like, let's be real,

[0:31] those don't really mean anything to me.

[0:33] Like,

[0:33] >> all right, y'all. So, today on AI that

[0:35] worked, we talked about the basic uh

[0:37] loop in software. We talked about early

[0:39] benchmark patterns and how we used to

[0:41] grade and judge models. We looked at a

[0:43] bunch of examples of couple different

[0:45] generations of benchmarks, including

[0:47] some new ones. In 2026, we actually had

[0:49] a nice little side tangent on how to

[0:51] measure software velocity and how like

[0:54] the importance of being able to move

[0:55] fast is more important than like

[0:57] shipping anyone individual thing. And

[0:59] then we talk about what makes these

[1:00] modern benchmarks better. Um, how

[1:02] Frontier Code from Cognition invokes a

[1:05] bunch of extra verification things to

[1:07] score the model's code and the test that

[1:09] it wrote. Uh, and then we talk about

[1:11] kind of like where modern benchmarks

[1:12] fall short and what they still can't

[1:14] measure, including long horizon

[1:16] penalties like, hey, you wrote something

[1:18] six months ago and it turned out to be a

[1:20] bad decision and 6 months later it's

[1:22] causing tons of problems. Very hard to

[1:24] evaluate that. Um, and so, uh, hopefully

[1:27] you learn a lot about, uh, software

[1:30] benchmarks and how models are evaluated

[1:32] and it helps you reframe your workflows

[1:35] and think about, uh, how you work with

[1:37] AI on a deeper level. So, I'm excited to

[1:40] get into it. Cool. What's up, guys? I'm

[1:41] Dex. I'm the CEO and co-founder of Human

[1:43] Layer. Uh, we build a IDE and platform

[1:47] for using coding agents to solve hard

[1:49] problems. I'm joined by my co-host,

[1:51] Vibb.

[1:51] >> What's up, guys? I'm Vibb and we make a

[1:54] programming language which is designed

[1:55] to be agent first instead of just

[1:57] optimizing for human convenience. And

[1:59] today on the AI that works show, we are

[2:02] going to talk about um

[2:06] state-of-the-art coding agent benchmarks

[2:08] and how do we know that coding agents

[2:10] are good and how do they work under the

[2:12] hood and what is what is deficient about

[2:16] benchmarks in the past? Uh what are the

[2:19] new benchmarks doing? Uh and uh I'm

[2:22] curious to hear from BBO if he thinks uh

[2:25] it's enough. I mean, you've shared a lot

[2:26] of your thoughts with me and you already

[2:28] know how much I agree. So, sadly, this

[2:30] is not going to be an agree an episode

[2:31] of arguing.

[2:32] >> Nah, we'll find something to argue

[2:34] about.

[2:34] >> I mean, obviously,

[2:35] >> I'm just getting the whiteboard.

[2:36] >> I think uh just to while Dexter does

[2:38] that, just to catch everyone up like why

[2:40] are we talking about benchmarks? Why are

[2:41] we talking about coding agents and

[2:42] harnesses? It really goes from like this

[2:45] meta point that I I I have been feeling

[2:47] I know Dexra has been feeling and I

[2:48] suspect many of you have been feeling as

[2:50] well, which is our code is turning to

[2:53] [ __ ] [ __ ] It's like it it's

[2:55] asmmptoically approaching like total

[2:58] slop no matter what you do, where you do

[3:00] it. And I think a lot of what we want to

[3:03] talk about today has to deal with some

[3:06] of the post-training loop and the system

[3:08] that goes into it and the way that we're

[3:10] measuring code and why both Dexter and I

[3:12] feel that it's

[3:15] effectively inevitable that all code

[3:17] will turn to uh turn to [ __ ] unless we

[3:19] do something about it and something

[3:21] drastically different than what we're

[3:23] doing today.

[3:24] Is that a good summary for what we're

[3:26] going to try and approach at today?

[3:27] >> Yes. Um, yeah. So, we can we can zoom

[3:30] out a little bit and, uh, talk about the

[3:31] problem.

[3:32] >> That's so funny. Uh, I've been tweeting

[3:34] about this on, uh, Twitter a little bit

[3:35] and like every single person is the

[3:38] thing that I find most funny is like

[3:39] there's these people that have

[3:40] acknowledged that the code is going to

[3:41] turn to slop and we need to do something

[3:43] about it. And there's these people that

[3:44] are in denial that are like, "No, we

[3:46] should still be artisally writing code

[3:48] and using agents to write code is

[3:50] wrong."

[3:51] >> Yep. And like it doesn't matter how you

[3:54] feel about it. The world will take the

[3:55] path of least resistance. You are a

[3:58] software engineer because you are lazy.

[4:00] That is what makes phenomenal engineers.

[4:02] And a coding agent is the laziest way to

[4:04] produce code. So we will use them.

[4:07] >> Yep. Cool. So like this is kind of the

[4:09] basic idea of like this is what the

[4:11] future should look like, right? And uh

[4:13] you have this like closed loop and then

[4:15] you have like people over here, right?

[4:17] And so as a person, you decide what you

[4:19] want to build because like you know uh

[4:21] otherwise we're I don't know you can't

[4:24] just say AI go make something right you

[4:26] have to tell it what you want uh and you

[4:28] create some description document

[4:30] whatever it is uh of like what you want

[4:33] to do give it to an agent goes to

[4:35] production uh while it's running you get

[4:37] feedback in and the idea is basically

[4:39] like when AI gets smart enough you will

[4:42] just ask for stuff and this whole loop

[4:44] will run and you will get production

[4:45] grade software and it will work great

[4:47] and people will pay you money for it uh

[4:50] etc. Does that make sense? Very

[4:51] simplified. We've talked about this a

[4:53] lot. I talk about this at AI engineer.

[4:54] I'm not going to go into more detail

[4:55] here, but this is the basic kind of loop

[4:57] that we are playing with. Does it make

[4:59] sense? Would you add anything here?

[5:00] >> Yep.

[5:01] >> No.

[5:02] >> Um, cool. So, I want to talk about the

[5:04] agent part, right? Um, because we've got

[5:07] a lot of like

[5:08] >> I'll add one last bit of color, which is

[5:10] if you go back to that dashboard,

[5:12] >> we put agent there. That is still true

[5:14] with humans. Nothing is different. The

[5:16] loop is the same whether it's a human

[5:18] writing the code or it's a agent. It's

[5:21] the same system. It's just that it

[5:22] happens a lot faster when it's an agent.

[5:25] So we need to do more things about it.

[5:27] >> Yes. And this includes all of your

[5:29] testing, code review, etc. Something

[5:32] that happens that gets new code into

[5:34] production basically.

[5:35] >> Yeah.

[5:36] >> Um so this is not a Yeah. This is spans

[5:38] DevOps and all these all these different

[5:39] things. Um, so I want to look at um,

[5:43] basically like we're going to look at a

[5:44] leaderboard for terminal bench. So

[5:46] terminal bench is a benchmark that is

[5:49] basically the way these benchmarks work

[5:51] is you give the model a challenge. So

[5:53] you have some challenge like you know

[5:56] >> right on my computer if you want to if

[5:59] you want me to pull it up. I have a

[6:00] couple benchmarks loaded.

[6:03] >> Um, you have the you have the data.

[6:06] >> Yeah. Let me let me do the high level

[6:07] and then and then and then and then we

[6:09] can do it.

[6:09] >> Um so you give this to an agent.

[6:13] Um

[6:14] >> the agent writes code

[6:18] and then uh actually we'll make this

[6:20] yellow.

[6:22] Uh and then you have a verifier,

[6:25] right?

[6:27] So there's something that is built into

[6:28] the challenge that is basically um did

[6:32] it pass or fail? And so this will either

[6:34] say, okay, it passed, right?

[6:39] Or or or

[6:45] we're getting there or it failed. And

[6:48] then you take all these scores on, you

[6:50] know, I think Terminal Bench is like a

[6:52] couple thousand challenges and you see

[6:54] what percent did it pass on. Um, and so

[6:57] here is all of the basically like the

[6:59] agents and the models and how they

[7:01] scored on terminal bench. Um,

[7:06] terminal bench hugging phase. Do they

[7:09] have the data set here?

[7:11] Yeah. So I just want to look at like

[7:12] what is one of these um

[7:16] Oh my god, there's so many of these. All

[7:18] right, we'll look at uh instructions. So

[7:21] this is configure get server that I can

[7:22] run on my computer. get clone.

[7:25] Um so this is yeah um so the solution

[7:29] here we have like basically like here is

[7:31] the correct way to do this. Um here's

[7:34] like the script that a model should run

[7:36] basically this is benchmark data. Uh we

[7:39] put a we put a gooid in here basically

[7:41] so that uh this gooid gets sent to all

[7:43] the labs and so all the labs know if you

[7:45] see this gooid in a in a piece of data

[7:47] do not train models on it because it's

[7:49] going to ruin the benchmark. Um there's

[7:52] a lot that happens under the hood. This

[7:54] is like interesting is like because if

[7:55] you train the models on the benchmark

[7:56] code, right? Uh SweetBench is based on

[7:59] Django and most of the models have seen

[8:01] the Django codebase. So it's not a very

[8:03] good way to evaluate whether the models

[8:05] are smart versus whether they can just

[8:06] remember the solutions.

[8:08] >> Um and then we have our test. So here's

[8:11] our verified [ __ ]

[8:15] server and then we output whether it

[8:18] worked or not. Um so here's the test.

[8:20] There's like the make sure it has the

[8:22] out here's the outputs and then the

[8:24] verify. And so basically the the flow is

[8:26] we do this for a thousand challenges and

[8:28] then the model gets a score. Does this

[8:30] make sense so far by Bob?

[8:31] >> Yep.

[8:32] >> Yep. Um

[8:34] >> I think you're describing it really

[8:35] well.

[8:35] >> Cool. Um and so uh Lench is fairly new.

[8:40] I'm going to kind of talk through kind

[8:42] of like what I will call like gen zero

[8:45] which was this thing called Swebench and

[8:48] uh which was just you know problems from

[8:50] Django.

[8:53] >> Yeah, they expanded it but roughly it's

[8:55] still the same concept.

[8:57] >> Yeah,

[8:57] >> it like tries to find a GitHub issue

[8:59] that is open basically replays and like

[9:01] sweeten was the simplest version goes

[9:03] back to that version of the commit and

[9:05] sees if the model is able to solve the

[9:06] commit.

[9:07] >> The pass. Yeah. So we take a GitHub

[9:09] issue from the past. We give it to the

[9:10] agent. Um and we basically take the

[9:12] issue and we take the like code base

[9:14] checked out to that shock.

[9:17] >> Yeah.

[9:19] >> And we give we put the agent in the

[9:20] codebase before the issue was fixed. It

[9:22] writes some code and then the verifier

[9:24] is some logic of like

[9:26] >> did it solve the problem in the way the

[9:29] human solved it.

[9:31] >> Yeah. And I think they use humans in the

[9:33] beginning, right?

[9:36] >> What do you mean

[9:36] >> or was it always agentic? Like they used

[9:38] humans to evaluate it in the beginning

[9:40] and now they used an agent loop or was

[9:41] it always agent?

[9:43] >> So human humans would handcurate this

[9:45] list of issues basically they would go

[9:47] through all the issues and they would go

[9:48] understand what the solution was and

[9:50] what the change was and turn it into

[9:52] this data set. So like you have the

[9:55] actual Django like GitHub history and

[9:58] we're saying Django obviously like we

[10:00] train on lots and lots of repos now but

[10:01] this is just like the very first version

[10:03] of this from like 2024.

[10:06] Um

[10:09] >> uh and then this goes into here and

[10:10] there was Sweetbench and then there was

[10:12] a thing called SweetBench verified which

[10:13] was like a little bit like it was it was

[10:15] actually human like better human curated

[10:21] >> and actually I was going to try to get

[10:23] Rishi on here. He's the author of Sui

[10:25] Marathon. Um but he's in Korea right

[10:27] now. So if this episode goes off and you

[10:29] guys want to do more on this we can do a

[10:31] follow-up with Rishi.

[10:33] Um, is this tracking so far?

[10:36] >> Yeah.

[10:37] >> Cool. Um, the kind of like next

[10:40] generation I would call it like gen

[10:43] oneish is like swbench multilingual. So

[10:47] this is like what a lot of like new like

[10:50] opus and and and codeex and and and all

[10:53] these models are kind of checked

[10:54] against. And again like it's important

[10:55] to know that like verifiers are

[10:57] different from training and we'll get

[10:58] into how the training works as well. But

[11:00] it's like the first thesis is like the

[11:02] benchmarks cannot evaluate whether this

[11:05] loop will produce slop. They can

[11:07] evaluate whether an agent can solve a

[11:09] one-off ticket and and like make the

[11:11] test pass, but they cannot evaluate like

[11:14] long term is the code getting worse in

[11:16] terms of maintainability. And the

[11:18] Frontier ones are getting better there,

[11:20] but they're not quite there yet.

[11:21] >> So, I'm going to look at Sweetbench

[11:22] multilingual. We'll look at a couple of

[11:24] um

[11:26] >> I've got um I've got a benchmark, too,

[11:28] if you want to check it out. you want me

[11:29] to show?

[11:30] >> Yeah. You want to you want to take over

[11:30] the screenshot and show us?

[11:32] >> And this one I know really well so it's

[11:33] easy for me to talk about. So like this

[11:35] was one benchmark that went a little

[11:36] viral. It's called like program bench.

[11:38] And like I think this is a post that

[11:39] like launched it. Where is it? Was Max.

[11:41] This is a post that launched it. And I

[11:43] was like uh the creators of Sweet Bench

[11:44] actually made a new benchmark called

[11:46] Program Bench. And at first glance

[11:47] you're like it's built by Meta. It's

[11:49] built by the same Sweet Bench. It's a

[11:50] good benchmark. But and it's

[11:52] fascinating. All the models go zero at

[11:54] it. And like obviously this this stuff

[11:56] goes viral because people start looking

[11:57] at this. like, "Oh, it looks legit." Uh,

[11:59] and then most recently, there's another

[12:01] tweet that talked about how like um soul

[12:03] crushes sweep uh crushes uh program

[12:06] bench. But the thing I want you guys to

[12:08] think about is it's really important to

[12:10] think about if this if these benchmarks

[12:12] actually model your own workload. And if

[12:14] it doesn't, then it doesn't matter how

[12:15] good the models are. And to give you an

[12:17] example for what this benchmark does,

[12:19] it's actually in my opinion the silliest

[12:20] thing. And the way it's implemented is

[12:23] again like it yes, it measures

[12:24] something, but what it measures is

[12:26] questionable. What it does is it takes

[12:28] like open source repos,

[12:30] it anonymizes them. So it changes the

[12:32] binary name to be like some default

[12:34] random binary name and it tells an agent

[12:37] mimic this binary like write a program

[12:40] to mimic this binary one to one and

[12:43] that's it. That's the only instruction

[12:44] that it goes with. Uh no additional

[12:47] context, no additional goal, just mimic

[12:49] the binary. Um and it tries in various

[12:53] languages. It has different containers.

[12:54] So it tries to if if this is written in

[12:57] lazy git is written in go then it tries

[12:59] to match go to go and it says type is

[13:02] written in rust so it recommends that

[13:03] the agent use rust. So it does have some

[13:05] sort of synergy,

[13:08] but at least in my opinion, a lot of

[13:10] these benchmarks, they kind of they're

[13:11] measuring the wrong thing. Like Dexter

[13:13] says, they're really measuring like an

[13:15] incredibly short-term outcome,

[13:17] >> which is the hard part about

[13:19] >> they treat it like a black box, right?

[13:20] They treat it as like, okay, let's get

[13:22] to the solution and like it doesn't

[13:23] matter if it's like easy to maintain

[13:26] afterwards.

[13:27] >> Yeah. And I think the thing that a lot

[13:29] of this misses out on is this whole

[13:30] concept that like software is actually

[13:32] not about mimicking software. Software

[13:35] is not about can you get to the result.

[13:37] Software is about can you continuously

[13:39] solve the problem that the users are

[13:41] going to have with your software and

[13:44] like adapt your software and like have a

[13:46] long-term perspective on your software

[13:48] that is not going to require you to

[13:49] rewrite everything and reinvent

[13:51] everything from scratch every single

[13:52] day.

[13:52] >> Yeah. And I I will add like this as

[13:55] usual. This is AI that works. This is

[13:56] going beyond the demo. This is not about

[13:59] vibe coding. Um,

[14:00] >> yeah,

[14:01] >> if you are building a side project that

[14:03] 12 people will ever touch.

[14:04] >> Uh, you probably have very

[14:07] >> you probably have very little in common

[14:08] with like a team working on an

[14:10] enterprise system trying to keep a

[14:11] 10-year-old codebase alive for another

[14:13] quarter or even a 2-year-old codebase

[14:14] alive [laughter] and get it to the next

[14:16] thing and adapt to the latest changes

[14:18] and everything's moving really quickly.

[14:19] And so like this is a thing we've talked

[14:20] about in software uh maybe not out loud

[14:23] on this show but like the goal is not

[14:26] position the goal is velocity and maybe

[14:29] acceleration is like how fast like the

[14:31] whole point is that software will change

[14:33] so good software is constantly changing

[14:36] and moving and when you use bad software

[14:39] it's probably because it's not changing

[14:41] fast enough. When you use Salesforce it

[14:44] feels like a bad application. Uh sorry

[14:47] Salesforce but everyone agrees on this.

[14:49] >> Hey and that's

[14:51] >> but it it has lasted for 20 plus years

[14:53] because it's deeply entrenching.

[14:56] >> It's deeply entrenching. They have all

[14:57] kinds of hooks and lock in and ecosystem

[14:59] stuff. Great business, not great

[15:00] software. But it's like the reason why

[15:02] it feels bad is because they can't move

[15:04] fast anymore. Whether like yeah they

[15:06] they either chose not to or like it's

[15:08] like you your ability to innovate will

[15:10] impact the quality of your software. And

[15:12] if it is slow for you to make changes to

[15:15] it then it will get worse over time

[15:18] instead of getting better. So you have

[15:19] to you have to maintain visibility on

[15:22] not just your position of like where are

[15:24] you what is the current state of the

[15:25] software but your velocity how fast and

[15:28] how safely can you change it without and

[15:30] again like lots of things slow down

[15:31] software. It's like oh we every time we

[15:33] change that module uh we have a we have

[15:35] an incident. It's like cool people are

[15:37] going to be less likely to change it.

[15:38] it's going to change less and they're

[15:39] going to be more careful and they're

[15:40] going to be spending their time fixing

[15:42] incidents instead of the other things.

[15:43] Vampsy asked a really good question like

[15:45] what metrics are you folks considering

[15:46] for coding performance velocity these

[15:48] days and I think that's a really great

[15:50] way to think about this and I think the

[15:52] way I think about this is actually like

[15:54] before AI so my first work experience

[15:57] was at Microsoft uh I'd never worked on

[15:59] a large team before that I mean I'd

[16:00] worked like intern meta so they had

[16:02] different build systems meta's whole

[16:04] philosophy was break things move fast

[16:06] like move fast break things right like

[16:08] they I put break things first because

[16:09] you know you break things all the time

[16:11] but um Microsoft was when I first joined

[16:13] like real like corporate software and we

[16:16] had like real and like we were still

[16:17] working like a research group so

[16:18] slightly different but even then like

[16:21] there were days when I walked in

[16:24] literally at like 9:00 a.m. And I would

[16:26] be like, "Oh, shoot. My build is my

[16:28] build didn't build overnight." And I

[16:30] would just go home because it was going

[16:31] to take eight hours to build like sync

[16:33] and merge and build. So, I'd just go

[16:34] home. There's literally nothing for me

[16:35] to do at that time on the whole day. Um,

[16:38] and it was a massive codebase and like

[16:40] engineering studio was slow. And I

[16:41] honestly thought that was like the state

[16:43] of software. And then I went to Google

[16:46] and Google is this magical land of

[16:49] software development. And I don't know

[16:50] how else to put it because nothing will

[16:53] ever get in your way of producing code.

[16:56] They have like a whole org whose only

[16:58] job it is to make sure that every other

[16:59] engineer produces code. So when I think

[17:01] about like this coding perform coding

[17:03] performance and velocity for me it's

[17:05] about how fast can you continuously

[17:07] release and merge code to production.

[17:09] That is the only gate that you should

[17:12] measure and like how fast are your

[17:14] customers able to see like live changes.

[17:16] Is that how you think about it? Yeah,

[17:18] that sounds that sounds great. I

[17:20] actually just started writing this down.

[17:22] Um, yeah. So, how fast can you

[17:25] >> uh

[17:26] >> write and release changes

[17:29] >> to customers?

[17:30] >> Specifically to customers like

[17:32] >> Yeah. It's not done when the code is

[17:33] done. It's not done when it's merged.

[17:35] It's not done when it's deployed. It's

[17:37] done when it's in users hands shipping

[17:39] value.

[17:39] >> Exactly.

[17:40] >> We'll change release value to users.

[17:44] >> I'll say users just in case we're doing

[17:45] free stuff, but

[17:46] >> Yeah. Exactly. It's still useful to make

[17:48] free stuff fast.

[17:50] >> And then we'll get into acceleration uh

[17:52] in a bit, but you know, if you know

[17:54] basic physics, you see where we're

[17:56] going.

[17:57] >> In my mind, uh I can see your Riverside

[18:00] by the way. Can you hide that?

[18:01] >> Oh, yeah. Sorry.

[18:02] >> Yeah. In my mind, this is like the only

[18:05] thing to measure um as a software

[18:07] engineering team.

[18:08] >> That means like if your CI/CD takes like

[18:10] an hour, fix that. If your testing is

[18:15] flaky and you have no confidence in your

[18:18] system, fix that.

[18:20] >> Yep.

[18:20] >> And then eventually, Go ahead.

[18:23] >> Measuring velocity has gone through its

[18:25] own kind of like generations of of what

[18:28] it means, right? It used to be like

[18:30] lines of code shipped, [laughter] right?

[18:33] And then eventually it was like pull

[18:35] request shipped because that like is

[18:36] maps a little bit better. But these are

[18:38] all kind of like legacy ways of like

[18:40] which teams are moving. Oh, and then we

[18:42] got story points, right?

[18:44] >> Oh my god, please stop. [laughter]

[18:47] Um

[18:49] yeah, the the old way

[18:54] >> we did eventually find this like product

[18:56] metrics which I think is a better way

[19:00] >> like things like post hog and stuff

[19:02] >> because that's actually like trying to

[19:04] get to measuring the outputs like so

[19:06] like the way I think about it is is like

[19:08] inputs

[19:09] outputs

[19:11] outcomes right and so an an input would

[19:14] be like you

[19:17] Inputs is like lines of code shipped.

[19:21] Outputs is like new features shipped.

[19:25] >> Yeah.

[19:25] >> And then outcomes is like customer can

[19:28] do XYZ workflow

[19:31] >> or retention or revenue.

[19:34] >> Yeah.

[19:35] >> Yeah.

[19:35] >> Instead. Yeah. And then it's like

[19:37] basically like it's like customer

[19:38] outcomes drive business outcomes, right?

[19:41] >> Exactly. Yeah. And like the only thing

[19:44] at least there's if you're a business

[19:46] writing software the top of the line is

[19:48] business outcomes. If you're a person

[19:50] putting software into the open source

[19:52] then you stop at customer outcomes.

[19:54] >> Yep.

[19:55] >> But like you effectively also have

[19:56] business outcomes. I just don't think

[19:57] it's fair to call it the same thing

[19:59] because you're looking for different

[20:00] it's a different kind of thing. Like rip

[20:02] grip is a customer outcome but I would

[20:04] say it's actually a business outcome.

[20:06] Like RipGraph is an amazing piece of

[20:07] software.

[20:08] >> Yeah. But who gets No one makes money

[20:10] off of RipGraph. That's okay though. It

[20:12] might

[20:12] >> I mean makes money off of rip grap

[20:15] technically. [laughter]

[20:18] >> Yeah, they get to turn more TPS because

[20:20] of rip crap instead of crap. [laughter]

[20:22] >> Exactly. Um, exactly. Less time waiting

[20:25] for grap, more time waiting for

[20:27] inference.

[20:28] >> Exactly.

[20:28] >> Um, I want I want to talk about

[20:30] something that happened kind of like in

[20:32] the mid2010s.

[20:35] Um, we got this thing called Dora.

[20:38] um which is like DevOps research

[20:42] something I don't remember.

[20:44] >> Yeah.

[20:44] >> Uh

[20:45] >> I don't remember what it stands for

[20:47] >> but basically they came with these four

[20:48] they looked at like you know 30,000

[20:50] 30,000 30k plus developers now I think

[20:53] now it's way up over over 100 thousand.

[20:55] They do this survey every year. It was a

[20:57] team. It started a puppet. They got

[20:59] acquired by Google at some point. Now

[21:01] they all work for Google Cloud. Uh and

[21:03] the original authors of the book have

[21:05] been have have moved on. But basically

[21:07] they found these like four key metrics

[21:09] that like every like fang company was

[21:13] good at

[21:15] basically like every company you look at

[21:17] and like holy crap they are just

[21:19] printing money like the darling children

[21:22] of the of the like 2010s like software

[21:25] era. Uh so this I think the the book

[21:27] came out in 2018. Um but you have

[21:30] basically four metrics which is like

[21:32] batch size and we actually take this as

[21:35] like deployment frequency.

[21:37] Um companies that ship a lot of small

[21:40] things faster do better than companies

[21:42] that ship large things less often.

[21:46] Um so it's like small batch size or high

[21:49] deploy frequency. So like how often are

[21:51] you actually shipping changes to

[21:53] production? Um it was like short lead

[21:56] time. So, it's like time from X to

[22:01] deployed in prod. And this one's a

[22:03] little iffy, right? So, so lead time can

[22:05] be uh I'm getting a little off topic

[22:08] here, but this is great to go over. Uh

[22:10] lead time can be either like time from

[22:12] PR merged to deployed in production or

[22:14] it could be like time from I have an

[22:16] idea to it is built into a feature and

[22:19] shipped to production. The idea is like

[22:21] teams that are really really good are

[22:22] really good at taking things from

[22:24] somebody's head and getting them in

[22:26] customer hands as quickly as possible.

[22:29] Um, and then we have low change failure

[22:32] rate. So that's like the odds, you know,

[22:35] percent chance, percent of PRs that

[22:39] caused bugs, incidents,

[22:42] and then time to recover.

[22:45] Dex, I'm gonna This is very fascinating,

[22:48] but I think you have something much more

[22:50] interesting to say, which is different

[22:51] ways to measure these benchmarks. I I

[22:54] want to make sure we get to cover that.

[22:55] >> Yeah. Yeah.

[22:56] >> Because that is actually I think the

[22:57] most interesting part about this.

[22:59] >> Listen, you're the one who grabbed the

[23:00] question out of the chat. But yes, uh

[23:02] when we talk about velocity, it's

[23:03] important to kind of have an idea of

[23:05] like what does this mean? Because I

[23:06] think like

[23:07] >> these are coming back to the questions

[23:09] like these are things that we can't

[23:10] measure models on today. like we don't I

[23:13] mean I guess we can measure the size of

[23:15] their change and how fast they got it

[23:17] into production but like the benchmarks

[23:19] don't measure this

[23:21] >> there's this other thing that I think

[23:23] you told me at least um which is the

[23:27] feedback time in which you can measure

[23:28] certain cycles is like the feedback time

[23:31] for this is like seconds to get this

[23:33] data point up here

[23:35] >> same for the and for this it's like

[23:37] minutes because agents write code now

[23:40] >> right so like minutes We measure in the

[23:42] order of like let's say like even long

[23:45] running agents are running for two hours

[23:46] 3 hours it's still like 360

[23:49] it's like less than 360 minutes usually

[23:52] right lines of code you can get in like

[23:54] less than like 50 less than less than

[23:57] one minute basically to go get uh to go

[24:01] get this stat even for like giant code

[24:03] bases customer outcomes take like

[24:08] like days to weeks

[24:12] to go measure

[24:13] >> to get like real data on

[24:15] >> business outcomes take like quarters.

[24:18] >> Yeah, exactly.

[24:19] >> Quarters to years.

[24:21] >> Yeah, it's a lot easier to measure near

[24:23] the top than it is near the bottom.

[24:25] Yeah. But um anyways, I want to I want

[24:27] to talk about our our our benchmarks

[24:29] here. Um

[24:32] >> and the basic idea here is like you have

[24:34] so so you have bench multilingual and

[24:36] terminal bench. And I actually want to

[24:37] look at one of these. So this is um this

[24:39] is Sweetbench multilingual. This is the

[24:41] table of all of the problems. And so

[24:44] each of these comes off of a random uh

[24:47] repo. Uh Golang projects, Ruby projects,

[24:50] um all kinds of stuff. Um so yeah, if

[24:52] you go to uh docuaurus is a typescript

[24:56] project. And so you have a problem

[24:57] statement here which is like hey there's

[24:59] incomp like problems with the broken

[25:02] links checker. Um and there's hints here

[25:04] as well which are sometimes passed to

[25:05] the models. This is like the issue

[25:07] thread. This is other humans commenting

[25:08] on the GitHub issue before the PR gets

[25:11] made. Um

[25:13] and then fail to pass is basically so so

[25:17] going down a little one more level of

[25:18] detail. Um the verifier is basically we

[25:22] have fail to pass

[25:25] which is like did it fix the did it fix

[25:27] the bug

[25:30] and then we have um

[25:36] pass to pass

[25:39] which is something like uh did it not

[25:42] break anything else right and so this is

[25:45] like the very basic like set of

[25:47] validations and then I think here We

[25:49] also have yeah so we have the patch that

[25:51] the model did. Uh this is like the

[25:53] golden patch. This is like the correct

[25:55] answer to the problem and then we have a

[25:57] test patch basically. And we're actually

[25:59] going to get into some of the things

[26:00] these new benchmarks do is they get more

[26:03] towards what can we verify

[26:05] deterministically or with models to get

[26:08] better than this just did it fix the

[26:10] tests.

[26:11] Um

[26:13] does that make sense? Um and so I want

[26:15] to talk about kind of like three new

[26:17] approaches. um or they're they're all

[26:19] kind of similar. Um so one of them is

[26:21] SWE marathon which is like we're kind of

[26:24] measuring the the model's ability to uh

[26:28] to um to to solve hard problems over

[26:31] time. um it's like rewrite all of

[26:34] Kubernetes in Rust and then we asked the

[26:36] model to work on this for like

[26:39] uh I want to say like some of these are

[26:42] like 400 hour challenges and so you're a

[26:45] little bit getting closer to like okay

[26:48] it's going to run this loop a bunch of

[26:49] times and like make sure that like after

[26:52] it's written thousands of lines of code

[26:54] that it can still maintain its own code

[26:56] base. Um so I think that's pretty useful

[26:59] and interesting. Um, so just longer. So

[27:02] we have like a couple dimensions, right?

[27:03] So we can have like um what makes modern

[27:09] benchmarks [clears throat] better?

[27:16] Um, so you can have longer tasks.

[27:20] Um, the other thing that we're doing

[27:22] also is like more blackbox testing. If

[27:26] you look at some of these Sweetbench

[27:27] multilingual ones, uh, some of these

[27:29] test patches are very opinionated. So,

[27:31] they're not just validating the

[27:32] behavior. They're actually validating

[27:34] that the model solved it in exactly the

[27:37] way that like the human would have

[27:39] solved it. Um, and I'm going to find,

[27:43] let's see.

[27:45] Yeah. So,

[27:48] um, so here's our test patch. it like

[27:50] asserts the exact attribute that it

[27:52] actually there was this like null

[27:54] pointer exception in uh in a Ruby

[27:56] project basically. Um and so this is the

[27:59] exact fix that we wanted to happen um

[28:02] because we had some like undefined

[28:03] method empty. There's a hundred ways you

[28:05] could have fixed this null pointer

[28:07] exception. This was the one that the

[28:09] human chose. Does that make sense?

[28:10] >> Yep. Yep.

[28:11] >> And so like you're you're really not

[28:13] just evaluating did the model solve the

[28:15] problem, but did the model solve the

[28:16] problem in the way the human did. And so

[28:18] a lot of these benchmarks do a little

[28:19] bit more blackbox. They're just like

[28:21] cool make this thing from scratch and

[28:22] we're going to poke it from the outside

[28:23] and we don't care about the code.

[28:26] >> Yeah. And then I think the most

[28:27] fascinating thing is actually like the

[28:29] next level of this which is if you go

[28:32] from taking it from like a blackbox

[28:34] longer running task, you end up in this

[28:37] really interesting world where you're no

[28:40] longer trying to solve one problem.

[28:45] Like software is actually like basically

[28:48] discovering problems as you go, right?

[28:50] Like when we started to build BAML, we

[28:52] didn't know every feature that we're

[28:53] going to add up front,

[28:55] >> but we discovered them. And the the

[28:59] interesting part is how much work

[29:02] do we actually have to do and how

[29:04] flexible and how good was our initial

[29:06] insight to make sure that the core

[29:08] system we built allows us to not have to

[29:09] rebuild everything all the time.

[29:12] >> Yeah. And this actually gets to a key

[29:13] like challenge what like like where

[29:16] where even modern benchmarks fall short

[29:22] is like in real software like you've

[29:24] done you've basically like you're you're

[29:26] figuring out the problems as you go.

[29:28] Whereas all these benchmarks because

[29:30] there's no human in the loop because

[29:31] we're not changing the pro we're not

[29:32] evolving the problem as the model is

[29:34] working. It already knows the end state.

[29:37] So it doesn't have to make its code base

[29:39] like adaptable to changes.

[29:42] >> Does that make sense?

[29:44] >> Yep. Exactly. Cuz it's not and it's not

[29:46] optimizing for that. And like just like

[29:48] for example like for example when we add

[29:50] certain features sometimes we're like oh

[29:52] crap we might do this in the future. So

[29:54] therefore we should maybe do like 10%

[29:57] more work. So doing that in the future

[29:59] is not 100% more work.

[30:01] >> Yep. Um, and that's a really, and if I

[30:04] think about like the best software

[30:05] engineers, what makes someone really

[30:06] good is that level of that intuition is

[30:09] just good. I I don't know how to measure

[30:11] that. There's no

[30:13] there's no objective truth to it. But

[30:15] when you've ever met a great software

[30:16] engineer, you're like, "Holy crap, how

[30:18] do they think of that in that way?"

[30:20] >> Yeah.

[30:21] >> How did they how do they know how did

[30:22] they have the intuition to know that

[30:23] like this was the right way to build the

[30:25] thing to make it so that we'd be able to

[30:28] evolve it and change it later? Yeah.

[30:30] >> Yeah.

[30:30] >> Um there's also a lot of software

[30:32] engineers who overdo that of course but

[30:34] [snorts]

[30:34] >> yeah and that's why I said the best ones

[30:36] are the ones that don't like for example

[30:39] example is git.

[30:40] >> Think about how much the core principle

[30:42] of git has changed. It hasn't. That's

[30:43] what makes minus a freaking legend.

[30:46] >> Yeah.

[30:46] >> Right.

[30:49] >> Yes. There's not a lot of software in

[30:51] the world that lives up to that level of

[30:54] like rigor.

[30:55] >> Yeah. So like if you want to be a legend

[30:57] like if you and like if you want to

[30:59] build software at agent speed the

[31:00] problem is you just took 30 years of

[31:02] software development and now you have to

[31:04] be like we're going to learn the same

[31:06] amount over 30 years in one year.

[31:09] That's the problem with shipping fast

[31:11] and like shipping at agent speed in my

[31:12] opinion.

[31:14] >> And I think that's what you were trying

[31:15] to describe the benchmark problem as

[31:18] >> that that's part of it. Um so there's

[31:20] there's other things that make these

[31:22] modern benchmarks better. Um, and I

[31:23] actually want to jump to a slide we have

[31:25] on um, Frontier Code. And the idea is

[31:29] like the reason the models all they're

[31:31] graded on is like did the test pass,

[31:32] which is why you get things like this.

[31:34] You get like weird like double type

[31:36] cast. You get like wrapping things in

[31:38] error exceptions because like

[31:41] >> in a one-shot problem, there's no

[31:42] penalty. There's not even a good way to

[31:44] penalize it. Like I couldn't write a

[31:45] llinter determinist. I mean, you could

[31:47] if you tried really hard, but it would

[31:48] be very specific. Like you can't write a

[31:50] llinter that generally finds patterns

[31:52] like this and says no that's wrong and

[31:55] gives back pressure to the model.

[31:57] >> Also very well could be right in many

[31:59] scenarios. This might be the right

[32:00] thing.

[32:01] >> Sometimes this is right. Exactly. You

[32:02] have a lot of false positives or false

[32:04] negatives on on either side of that.

[32:06] >> Um there's a really interesting one

[32:08] called Frontier Code. Um they do two

[32:11] interesting things. Uh actually I'll say

[32:13] three interesting things. So we talked

[32:14] about like the problem with this like

[32:16] Sweetbench multilingual is like a lot of

[32:18] the test cases require the model to not

[32:20] just make the test pad but like write

[32:22] the code in the way that the human would

[32:25] have written it without knowing what's

[32:26] in the test, right? Because you can't

[32:28] tell the model what the tests are. Um

[32:31] and so like a thing that the the

[32:33] Frontier Code folks did that's really

[32:34] interesting is um

[32:38] one they have like an adjudicator I call

[32:40] the adjudicator model. uh read the

[32:44] written code.

[32:46] >> Okay. Um for the simpletons like me, can

[32:49] you tell me what adjudicator means

[32:50] really fast?

[32:51] >> We'll just call it judge model.

[32:52] >> Okay, cool. Thank you. [laughter]

[32:54] >> Thank you. Sorry. Look, they picked the

[32:57] name. Okay, we'll we'll we'll we'll uh

[32:59] we'll dumb it down for all the smart

[33:00] people here. [laughter]

[33:02] Um so, compared to the golden patch,

[33:05] right? So, we take we take the the code

[33:07] the model wrote in addition to So, let's

[33:09] Yeah, let's go back over here. We'll get

[33:11] the uh the better one here. Um and so

[33:15] like Frontier Code looks a lot like

[33:20] um

[33:22] shoe history. We're still like checking

[33:24] out a codebase to a Shaw or starting a

[33:26] sometimes it's starting a project from

[33:28] from scratch. But like humans curate

[33:31] this data set. The agent goes and writes

[33:32] code. We still do this verify, right?

[33:34] Did it solve the problem? We have the

[33:36] regressions which is like did you do it

[33:38] without breaking in anything else?

[33:46] Oh my god.

[33:49] Then you have the um

[33:52] what do we call it? Um

[33:55] we have the judge model.

[33:58] It kind of matched the solution. And

[34:01] instead of all these be like pass fail,

[34:02] these all give you just like a score.

[34:06] Right. So all these contribute to your

[34:08] score. Um

[34:15] and then we also have a uh quality

[34:18] judge, right? So in here we actually

[34:21] have uh so as part of the as part of the

[34:24] benchmark you have the like golden

[34:26] solution that doesn't go to the agent,

[34:28] but it's used here. You also have like a

[34:31] list of code quality rules. So like

[34:33] something like oh you know you have like

[34:35] C++ like memory things or whatever it's

[34:37] like written rules a prompt or a skill

[34:39] that goes into the quality judge

[34:41] >> and the quality judge also looks at that

[34:43] code right so this goes into all these

[34:44] steps and then they have a very cool

[34:46] thing which is like we haven't talked

[34:47] about mutation testing on this show

[34:49] before um

[34:51] >> but we also have a like did do the uh

[34:56] new tests fail on the pre patch code.

[35:00] Um, so the agent writes code and it

[35:02] writes tests. Um,

[35:05] >> we actually ignore the agents tests for

[35:08] these things because we don't want the

[35:09] model changing the test to make the

[35:11] stuff pass. And so when the when these

[35:13] verifiers run, we actually like zero out

[35:15] any changes the model made to the tests.

[35:18] But then for this step specifically, we

[35:21] actually take its tests and run it

[35:23] without the code that it changed and we

[35:26] see do those tests fail because

[35:27] otherwise the model is just writing

[35:29] tests that test nothing and that

[35:31] contributes to the score as well. So

[35:33] >> like basically how sorry go ahead.

[35:35] >> Yeah. It's like how good is it is it at

[35:38] both like assessing the true test cases

[35:40] that it should have tested.

[35:41] >> Exactly. How what what quality are the

[35:44] tests and like how well does it it's

[35:45] almost like a proxy like how well does

[35:47] it actually understand the problem?

[35:49] >> Um so

[35:50] >> yeah go ahead.

[35:51] >> No, go ahead. I had a totally

[35:52] >> I was going to say like nothing like it

[35:54] is not the only thing that will tank

[35:56] your code quality and maintainability

[35:58] but a bunch of tests that don't test

[35:59] anything meaningful and then you go to

[36:01] change something and those tests fail

[36:02] and you have to figure out okay do I

[36:04] need to change the test or did I

[36:05] actually break something? Like that is

[36:07] one of the main things that slows down

[36:09] both people and LLMs is having like

[36:11] meaningless [ __ ] tests.

[36:13] >> Uh you know what's really interesting

[36:14] about this?

[36:15] >> Yeah.

[36:16] >> And like maybe I'm just weird.

[36:19] >> Yeah.

[36:19] >> Every time I look at benchmarks, it I

[36:21] lose more and more faith in the whole

[36:23] loop.

[36:24] >> Yeah.

[36:25] >> And like and like and like it's funny

[36:28] because like I think about this and like

[36:29] there are no benchmarks for human

[36:31] engineers. I mean, there are like hacker

[36:33] rank and stuff, but like let's be real,

[36:35] those don't really

[36:38] mean anything to me. Like, no, I'm never

[36:39] like, "Oh, you're rank one and hacker

[36:40] rank. You must be able to make the best

[36:42] products in the world." I'm like, "Cool,

[36:43] you can solve hard algorithmic problems

[36:44] really fast in this constrained

[36:46] environment." Yeah.

[36:48] >> It doesn't solve the software

[36:49] engineering problem, which is very

[36:50] different,

[36:51] >> right? Um,

[36:53] >> and it obviously like some of the best

[36:55] are probably pretty good at hacker rank.

[36:56] I suspect like I suspect John Carmarmac

[36:59] would have been good at this. Uh,

[37:00] >> sure.

[37:01] regardless but like um when I there's no

[37:05] good benchmark for them and really the

[37:07] what's like what do I think of as the

[37:08] good benchmark for a software engineer

[37:11] the only benchmark for a good software

[37:13] engineer in my opinion is whether or not

[37:16] other people have recommended them and

[37:19] everything else pretty much is a really

[37:21] bad proxy

[37:23] >> okay

[37:23] >> like if someone I trust has recommended

[37:25] someone that is pretty much like an

[37:26] instant yes I trust them really well um

[37:30] but

[37:30] a leak code problem is a really bad

[37:32] proxy. A discussion over like and

[37:35] effectively like what do I really get

[37:37] when like why do I think Dexter is a

[37:38] great engineer? It's because we've spent

[37:40] hours together discussing systems

[37:42] together and I know the way you approach

[37:44] Yeah. And built we've also built things

[37:45] together but more so just like the way

[37:48] that we've talked the way that you've

[37:50] discussed problems and broken them down

[37:52] shows me that you know how to think at

[37:53] that layer. I'm like I would love to

[37:55] work with you and like discuss things

[37:56] with you. It makes me better. Yeah, we

[37:59] need thinking bench

[38:00] >> maybe. But really, I think what I want

[38:02] is I just want more people to tell me

[38:03] what model is good over time. And

[38:05] eventually, if someone I trust tells me

[38:07] a model is good, I'll just use it. And

[38:08] these models have gotten good enough.

[38:10] [laughter]

[38:11] >> These models have gotten good enough to

[38:12] where like we don't really need the same

[38:15] benchmarks. We just need other people to

[38:17] tell us what's good. And like you

[38:20] basically kind of can crowdsource.

[38:22] >> Why do you think I spend all day on

[38:23] Twitter, dude? Why do you think we do

[38:24] this show?

[38:25] >> [laughter]

[38:25] >> Yeah,

[38:27] we're just crowdsourcing. Uh PS, Soul is

[38:30] freaking amazing right now at design.

[38:32] >> Soul is great. It does use too many sub

[38:34] agents and skills, but

[38:35] >> uh it doesn't matter though. Like if you

[38:37] can burn the token, then you have the

[38:38] bandwidth. It is the best for doing

[38:40] design docs.

[38:42] >> Fable is still quite good at performance

[38:44] engineering though sadly it cannot come

[38:47] up with some of the ideas uh that I can.

[38:49] So I still have some value over the

[38:51] models. Maybe not in three months

[38:53] though. Anyways, I have I have two more

[38:55] points and then we can wrap this up. Um,

[38:57] >> number one is I don't think I think if

[38:59] LLMs were good judges of code quality uh

[39:02] outside of like obviously you can have a

[39:04] pull request bot and you can say like

[39:06] cool does it follow this pattern? Does

[39:08] it follow this pattern? Does it break

[39:09] this rule? Like you can explicitly

[39:11] encode your rules into a prompt or into

[39:14] a deterministic llinter that's great but

[39:17] I don't think that is sufficient. Um,

[39:19] and I don't think you can have a generic

[39:21] judge. Like I've I've asked LM so many

[39:24] times like how could we make this code

[39:25] quality better and the answers are all

[39:28] [ __ ] because basically the same way

[39:30] that these like benchmarks work is

[39:33] shaped very similar to how we do

[39:35] verifiers. Like to to to do an RL

[39:37] verifier to actually change a model to

[39:39] change its weights to be better at

[39:41] solving these sorts of problems, we need

[39:43] to be able to like evaluate the

[39:46] performance. And so like if you're going

[39:48] to do thousands and thousands and

[39:49] thousands of runs uh with millions of

[39:52] millions of nodes of compute to train a

[39:54] model like you cannot have a human

[39:56] scoring the architectability of the

[39:58] solution. You have to use these like

[40:00] judge type things you have to build

[40:01] these deterministic verifiers. And so if

[40:04] you cannot like build a judge that is

[40:07] that is good at judging code quality

[40:09] then the knowledge of code quality will

[40:11] never end up in the weights which means

[40:13] the LLMs we built in this way will never

[40:16] actually be able to jud like we are

[40:18] constrained to the things we can teach

[40:20] during RL basically like the models will

[40:22] keep getting really really good at

[40:24] anything we can teach during RL and so

[40:26] solving problems and doing performance

[40:28] engineering anything with good feedback

[40:30] is is really really like easy to train

[40:33] But is this ide

[40:47] going wrong like bug incident due to

[40:50] sloppy code?

[40:52] >> Well, yeah, because you had a traffic

[40:54] spike at that point. you had a traffic

[40:56] spike or just like the slop piled on uh

[40:59] week over week over week and then you

[41:01] had like actually a real problem but it

[41:02] was really like the pattern got set back

[41:04] here. This can be like

[41:07] >> weeks or months

[41:09] >> like the the basically like the feedback

[41:11] cycle of like did [ __ ] haiku think

[41:13] you broke the rules is really really

[41:15] fast. And really, I think what you're

[41:17] trying to say is like

[41:18] >> you the model baked in a core pattern

[41:21] here that it replicated in two other

[41:22] features downstream where it shouldn't

[41:24] have because it just modeled your

[41:26] existing codebase

[41:27] >> and then maybe even a human came in and

[41:29] tried to fix something scrappily. And

[41:31] the point is like the the thing the the

[41:33] thing we want to penalize is all the way

[41:34] back here. But the like the way we

[41:37] actually realize it was bad is such a

[41:40] complicated and like lossy process that

[41:43] one it's like it's hard to even notice

[41:45] in your real code in production. Let

[41:48] alone to build a verifier that can do it

[41:50] millions of times in a row on millions

[41:52] of test problems.

[41:53] >> Yeah. Also like most humans wouldn't

[41:55] have caught this. It's not even that.

[41:57] Like most like the people that are

[41:58] building these verifiers are

[42:00] researchers.

[42:01] >> Yeah. We don't all have Lionus reviewing

[42:03] our code being able to be like, "Oh,

[42:04] you're going to hate yourself for that

[42:06] in six months."

[42:07] >> Yeah. Like it and like there's a reason

[42:09] that not every engineer can like write

[42:12] like code that maint like most code dies

[42:14] after six months.

[42:16] >> Yeah.

[42:16] >> Right. Like like just it has a half life

[42:18] very that depreciates very fast.

[42:21] >> Very very few engineers can like have

[42:22] this level of foresight.

[42:24] >> Yep. So like even if we did want to

[42:27] build this sort of benchmark, you'd

[42:29] first need people that can recognize

[42:31] enough enough people that can recognize

[42:32] enough of this data and enough of these

[42:34] patterns to give it feedback. To then

[42:36] build software that can recognize these

[42:38] patterns is even harder because you have

[42:40] to be able to put into words. And like

[42:42] the as sad as it is, the best engineers

[42:44] that I've ever met that can do some that

[42:47] have incredibly long horizon skills,

[42:49] I've never had them be able to verbalize

[42:52] why something is wrong. They're just

[42:53] like, "This feels funny."

[42:55] >> Yeah.

[42:55] >> And then they can tell you exactly how.

[42:57] Yeah.

[42:58] >> And someday we will figure out how to

[43:00] bake that into the weights of models.

[43:02] >> And things like this are getting better.

[43:04] Like we've identified this is a pattern

[43:05] that causes problems. We've identified

[43:07] that like okay, we can try to verify or

[43:10] or or train models on various like

[43:12] quality heristics that can be like

[43:14] parsed and understood in a limited

[43:16] scope. But this whole idea, so this is

[43:19] like if I was going to build a

[43:20] benchmark, I'd build a benchmark where

[43:21] the model had, you know, a road map of

[43:23] 20 features to build, but it didn't know

[43:25] about each sequential. It just got one

[43:27] ticket at a time and had to evolve the

[43:29] codebase over time without knowing

[43:31] what's coming next.

[43:32] >> Yeah. And it it almost had to predict

[43:35] like it's almost like the harness and

[43:37] every task is told just think really

[43:39] fast if I need to model for other things

[43:41] that might be relevant in the future.

[43:43] Don't do the work. Just make it possible

[43:44] to extend it if we need to. and if we

[43:47] need to is the magic phrase and like I

[43:50] >> if you say that prompt I know what the

[43:52] model will do it'll just start up it'll

[43:53] turn it into Java

[43:55] >> and I don't want that in my codebase

[43:56] either. [laughter]

[43:57] >> Yep.

[43:59] So that was most of what I wanted to

[44:01] talk about is just like here's why this

[44:03] is farther off than maybe it feels like

[44:05] cuz the models are getting a lot better

[44:07] along the dimension of like solve a

[44:09] one-off problem.

[44:11] >> Yeah.

[44:13] But they are not getting much better at

[44:14] like maintain a codebase over time.

[44:17] >> Yeah. And also just to give people a

[44:21] little bit more hope. Uh I don't think

[44:22] we're saying that everything is doom.

[44:24] Stop using agents at all. We're not even

[44:26] close to saying that. If you think about

[44:28] like how many teams actually have the

[44:31] kind of engineer that like Linus on the

[44:33] team like

[44:34] >> how many distinguished engineers does a

[44:35] or at like Microsoft and Google have

[44:37] there's not that many of them. And it's

[44:40] okay. We survive. In fact, most teams

[44:42] are built of SD1s, SD2s, and a couple

[44:45] seniors. And we do pretty well at

[44:47] shipping software with that level of

[44:49] thing. So, I think we can go really far

[44:52] still. There's a lot of lowhanging

[44:53] optimizations for still solving one-off

[44:55] problems. That adds a lot of value.

[44:58] >> Oh, yeah. No, it's great. And if you

[44:59] know how to steer the model, it's like

[45:01] this is all about like understanding and

[45:02] building intuition of like what are the

[45:04] models really good at and what are they

[45:06] really bad at and how can you shape all

[45:08] of the problems and all the things you

[45:10] work on. So that you're doing the things

[45:12] that the models are bad at and the

[45:13] models are doing the things the models

[45:14] are good at. And that's how you get

[45:16] leverage. And that's how you that's like

[45:18] the real way to ship more at high

[45:20] quality is to continue like find the

[45:24] ways to insert yourself where you do a

[45:26] little bit of work and then the model

[45:28] can like you greatly increase the

[45:30] likelihood that the problem looks to the

[45:32] model like this thing that it's really

[45:33] good at.

[45:35] >> Yeah, you said it best, man. I mean, I'm

[45:38] really excited to get better benchmarks.

[45:39] I think some people out there will be

[45:42] thinking about this. I do hope some

[45:44] engineering folks decide to move more

[45:45] into research

[45:48] um and like think about how to

[45:49] transition some of the software

[45:50] knowledge into the research and

[45:51] benchmarking domain.

[45:52] >> Hit us up on Twitter uh if you liked

[45:54] this episode and maybe we'll do a little

[45:56] follow-up and go a little deeper on some

[45:57] of the other stuff. But uh hopefully

[45:59] this gave you some more intuition on how

[46:00] these things work and why they're bad at

[46:02] the things they're bad at and why

[46:03] they're good at the things they're good

[46:04] at and uh helps you use AI more

[46:06] effectively. All right, I will see you

[46:08] soon, Dexter.