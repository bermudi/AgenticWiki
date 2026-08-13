---
type: youtube
url: https://www.youtube.com/watch?v=5FcHP22u0zs
title: What Actually Gets You 2-3x With AI Coding (ft. Dex Horthy)
channel: Jan-Niklas Wortmann
date_saved: 2026-08-13T22:09:15.761Z
speakers:
  - Dex Horthy
  - Jan-Niklas Wortmann
---

# What Actually Gets You 2-3x With AI Coding (ft. Dex Horthy)

[0:00] I don't give two damns how your spec is shaped.

[0:03] It should give you leverage. Because you can give it a really good architecture

[0:06] doc, and the model can follow it to the letter. Everything you asked for in

[0:10] your system design, Mermaid charts, here's the modules, here's the new endpoints,

[0:15] is exactly as specified.

[0:17] But somehow the code is still garbage, and you can do a lot of steering,

[0:21] and you can get 99% of human-quality code, like very good code as if you had

[0:26] written every character by hand,

[0:29] but two to three times faster. You can't get 10x. It can't be done. Not today.

[0:35] That's Dex Horthy. He's the founder of Human Layer and godfather of context engineering.

[0:40] So not just prompting models, but deliberately designing what information goes

[0:44] into an agent, when humans should steer it, and how teams can ship with AI without

[0:50] watching their codebase burn to the ground.

[0:52] I think abandoning code quality and system quality, giving engineers permission

[0:57] to ship slop, I don't think that's correct.

[1:01] I think that's going to collapse your codebase into ash much faster than you think.

[1:05] I have not seen someone nail the abstraction yet to a point where I would use

[1:10] that instead of hand crafting my own memory so I can control every single token

[1:15] that goes into the context window for every prompt in every agent of my system.

[1:19] So if you're trying to use AI for real production software, not just site project

[1:23] slop, this one is for you.

[1:27] We're out here shipping value and helping users and helping people ship value

[1:31] today while everyone who is like bitter lesson pilled is basically just like

[1:36] yoloing prompts into the best model they can find sitting around waiting for

[1:39] GPT-7 to come out because they're just like

[1:42] oh it's not worth doing anything because the models are just going to get smarter

[1:45] lots of people are out there telling you code is free and build every single thing you can and it's

[1:50] It's not free.

[1:51] It's not because if you don't care about it you will be throwing it out in six

[1:55] months. If you're a manager and you are not trying to help your people adopt

[2:01] AI, you are failing them.

[2:03] In this episode, we talk about why software engineering is not going away,

[2:06] why code review might actually become more important, why just let the agent

[2:10] run is not a strategy, and how serious teams should think about planning,

[2:15] context windows, subagents, cheaper models, and AI adoption.

[2:19] I think the core insight behind context engineering is that Um,

[2:23] the AI, like the space of people building on LLMs

[2:28] There are a lot of buzzwords and concepts and ideas around

[2:34] memory and context graphs and rag and agentic systems and multi-agent and sub-agents

[2:43] and cross-it. There's all these ideas.

[2:47] And everyone wants to sell you a product or sell you an open source thing that

[2:51] kind of abstracts away something.

[2:54] And the idea behind context engineering is like it's not that thick a layer

[2:57] and you should really just understand that you're assembling everything is assembling

[3:01] context windows under the hood

[3:02] and do stuff yourself before you go reach for abstractions because i don't think

[3:08] we've figured i haven't seen a single all the memory companies are really smart

[3:11] people doing really interesting stuff they're getting really good results on benchmarks

[3:15] i have not seen someone nail the abstraction yet

[3:19] to a point where i would use that instead of hand crafting my own memory so

[3:23] i can control every single token that goes into the context window for every

[3:27] prompt in every agent of my system

[3:29] So you brought up benchmarks and i gotta say this is such a pain point for me

[3:33] because they're all kind of trash to be super honest in general around ai.

[3:39] And they get worse over time Well,

[3:42] Over time, agents, models, whatever, are just gaming the system where it's like,

[3:47] oh, yeah, I have like 5% point more than the last model. I'm so cool.

[3:50] That doesn't mean jack shit at this point.

[3:53] Depending on where we get to today, I have two benchmarks that I'm actually

[3:56] interested in that we can dig into, but...

[3:59] I do think the DeepSWE looks, it at least seems realistic enough with my own

[4:07] experience where I have like a certain sense of trust in that.

[4:11] DeepSWE, this is the, I actually haven't gone too deep on DeepSWE.

[4:15] I pulled up SWE-Marathon and FrontierCode right now is the ones I've been digging

[4:20] into, but I have to check out DeepSWE.

[4:22] So like, if you look at like, what is it called? Terminal-Bench Pro is something

[4:27] that a GPT-5.5 and a GPT-5.4 Mini are like 2 percentage points far from.

[4:32] It's completely delusional. Completely delusional. I don't understand how people

[4:36] are like, oh, yeah, this is a great model.

[4:38] I mean, it is a great model for its purpose. Don't get me wrong.

[4:41] But those benchmarks are completely useless at this point.

[4:46] Yeah, people are accidentally training on test. And then you have specifically

[4:50] with Terminal-Bench, you have people straight up cheating at all the problems

[4:54] by like putting secret things in the system prompt. So it's even worse than we thought.

[4:58] It's so bad. Okay, sorry, I got off on a rant. So context engineering.

[5:03] Yes.

[5:04] I have a somewhat maybe provocative question, but do you think,

[5:08] as I fully agree, it is very relevant right now that you intentionally steal

[5:12] the context and be very mindful of what you put in, what you expect to get out of it, etc.

[5:17] Do you think this will be a thing in the somewhat near future?

[5:21] Do you think LLMs and agents are just getting good enough to do this themselves

[5:25] entirely autonomously.

[5:27] They keep getting better. Can I share two slides? This is from a talk I gave at AI Engineer Miami.

[5:35] But basically it's like you have some task and you have the default model out

[5:40] of the box has some ability with naive prompting. If you just YOLO the prompts

[5:43] in, there's some set of tasks and it can do those tasks at some quality.

[5:47] And then you can do a little bit of context engineering for the tasks you care

[5:50] about and make it a little bit better at those tasks. Right.

[5:53] Right. This is the, and then the bitter lesson basically says,

[5:56] uh, or bitter lesson or whatever you want to call it. Um, um,

[6:01] Is that eventually a new model will come along.

[6:05] And so you'll have this and then a new model will come and it will just blow

[6:08] all your, it will make half of your work irrelevant.

[6:10] But then you can immediately turn around and do more context engineering.

[6:14] And like the goal is like, hey, we have to make these models solve these tasks.

[6:18] I mean, this is engineering at its core.

[6:21] It's like, how do we get smart about boundaries and testing and evals and all

[6:24] this stuff so that we can take the off the shelf thing and make it perform better

[6:30] than what somebody, and we spend

[6:33] weeks and or months of time making the off-the-shelf model perform better than

[6:37] what you can get just with naive prompting, and people are willing to pay for that.

[6:41] And so if you're building products, you're building systems,

[6:43] you're solving problems for yourself, I think it will always be relevant.

[6:46] I mean, there may be a world where GPT-9 is so smart that it's 100% on every

[6:52] benchmark we as humans can ever come up with,

[6:55] but I don't see the trajectory going there anytime soon and

[7:00] I think there's a lot of interesting problems to solve and a lot of value to

[7:03] be created in investing and making these models better and in pushing the frontier

[7:07] on the tasks that we care about and I think anyone seriously building AI and

[7:10] building AI for enterprise is doing this and thinking in this way You

[7:14] Touched on something and I just want to be 100% clear because again,

[7:19] I'm terminally online and therefore you easily get into this narrative oh software

[7:23] engineering is completely solved,

[7:25] we don't basically need software engineers or you have like i i don't know who

[7:30] mediocre CEO it was it was like talking about 100x engineers.

[7:34] I remember who it was but i won't i won't i won't say who it was it was probably more than one anyways

[7:41] Do you think software engineering as a craft is going to disappear?

[7:48] Nope. Not anytime soon.

[7:51] I do want to preface this because I also didn't expect it a year ago to be where we are right now.

[7:59] So the speed of change this way is tremendous.

[8:03] At the same time, software engineering has never about writing code from my perspective.

[8:08] I i was never the best coder i i'm i'm good at writing software don't get me wrong but um,

[8:16] the skills that may be valuable to the companies i worked at were usually more

[8:21] soft skills like i can facilitate i can coordinate work i have like the bigger picture

[8:26] i can architect systems like that is what companies value in my skills not that

[8:31] i can crank out 100 words a minute or whatever.

[8:34] Or you can nail a bubble sort algorithm at first pass or whatever it is.

[8:39] I'm completely useless with lead code. I was very fortunate.

[8:43] So I grew up in Germany where this whiteboard test is not as much of a thing.

[8:49] So I was always like, I would fail every one of these.

[8:53] Must be nice.

[8:54] It's not bad, not going to lie.

[8:56] Yeah, there's a couple layers to this in terms of, like, is software engineering dead?

[9:04] And I think about this in terms of, like, the new software factory and the old

[9:10] software factory, which was before we had AI and before we had the notion of lights off.

[9:14] We still had software factories. If you go back to, like, 2021,

[9:18] and this isn't even when the term came out, but, like, the Department of Defense,

[9:22] there's this guy, Nicolas Chaillan, the, like, chief software officer for the Air Force.

[9:26] And he said, he came in, he said, we need to start building software like every other enterprise.

[9:31] And, like, not the, like, big banks of the world, but he's looking at,

[9:35] like, what we call, like, these, like, hipster enterprise, right?

[9:38] Your Airbnbs, your Ubers, your Instacarts, whatever it is.

[9:42] And they have really high security. They have really high throughput.

[9:45] But they have incredibly high quality. They deal in crazy systems.

[9:48] They ship hundreds of times a day.

[9:50] And they're using this whole stack of tools of Jenkins and code scanning and

[9:55] security and like all of these things that like, there's like a hundred tools

[9:59] that touch every single release that goes out. And it's like,

[10:01] we need to do this so that we can move faster.

[10:04] Whatever the reasoning is, but like this was the concept of Software Factory

[10:07] before AI. So AI is just a new layer on top of it.

[10:11] And I'm going down a little bit of a tangent here. So bring me back to what

[10:14] the question was, and we could go deeper on that, maybe.

[10:17] Well, actually, now you got me down there, so I'm right there with you.

[10:21] Yeah, okay, let's go.

[10:22] So in Germany, we have this concept of dual studies program.

[10:25] So I studied something that is kind of like a mix between economics and computer

[10:28] science. So nothing really. I know jack shit, but like a little bit of everything.

[10:32] And there we went into production. And I think, honestly, like looking into

[10:36] like how a Toyota or something structures their production sites and factories

[10:42] is super interesting. And software engineering as a craft can learn so much from that.

[10:47] As a whole.

[10:48] I remember being like a year or two into my software career and I was in my

[10:53] boss's office for a one-on-one, um, incredible manager.

[10:56] And, uh, he, uh, I was like, we have this inefficiency, like,

[11:00] you know, it just, it was something with like the QA process and we kept having

[11:03] regressions and like, and he's like, okay, Dex, there's a thing that we're going

[11:07] to have to learn right now. I'm going to give you a book to read.

[11:09] It's called the goal by Eli Goldratt.

[11:11] And the big takeaway is there will be inefficiencies that are not bottlenecks.

[11:16] And if the inefficiencies are not blocking the main through line,

[11:19] then you just have to hold your nose and be okay with them.

[11:23] And the mistake we're making right now with the loops and the token maxing is

[11:28] like, we're all I forget who said this first.

[11:30] It was on Twitter, like a couple months ago, it was like, we are doing the primary

[11:34] mistake of like what factories were doing in the 60s and 70s,

[11:38] which is they would bring in these MBAs.

[11:40] And the NBA's job was to pick like one station in the factory of the hundred

[11:43] different stations to make a part.

[11:45] And they would optimize the hell out of it and make sure it was always at full

[11:48] utilization. We're trying to saturate utilization of the key parts of the factory

[11:54] rather than focusing on the end to end and fixing the bottlenecks.

[11:58] I think this is interesting because on the one hand, I very much think it is

[12:03] a good thing that right now we're still a little bit in like this infinite pot

[12:07] of gold for where companies just like throw money at AI. hoping to see like

[12:10] that 10x return on investment.

[12:13] I highly doubt there is a 10x return on investment, but different conversation.

[12:17] Where I'm going with this is I think this like exploration phase,

[12:20] like getting the engineers into the state of AI psychosis and out of that as

[12:24] quickly as possible is super important.

[12:27] Super important.

[12:30] You have thoughts. You force people into AI psychosis or like you encourage

[12:34] them to go crazy with it. And then you encourage them to kind of pull back.

[12:38] I think it's a natural, like in software engineering, we tend to do this thing where we overcorrect.

[12:43] On the last episode of this podcast, I was talking to David Cramer and we were

[12:46] also talking about like microservices, like 2016, 17, 18. Like everyone was

[12:51] like, oh, we need microservices for everything.

[12:54] Figured out like, oh, microservices are maybe not the best way.

[12:57] Uh maybe some parts where we want scalability or something should be microsoft

[13:01] etc so we have this like swinging and as an industry we keep doing the same

[13:04] stupid thing where it's like oh ai all the things oh maybe,

[13:09] uh or uh who was it now,

[13:11] like one company was basically like,

[13:14] uh yeah it was Uber who spent their entire ai budget in like the first three four months.

[13:20] Yeah a million dollars lots that's like every company i talked to who got ai

[13:24] pilled in December they built their budget in September before Opus 4.5,

[13:28] so they had no idea that suddenly every engineer was gonna be addicted to this

[13:31] fucking crack cocaine that is Claude Code, basically.

[13:35] That is such an interesting word. I never thought about it.

[13:39] That's not my, I read that on Twitter too, but I think that's 100% correct.

[13:43] You need to have that exposure to figure out this is what it's good at because

[13:46] there are things that AI is fantastic at and I don't want to lose that.

[13:50] But there are also parts where AI is absolutely trash for.

[13:52] Yep. And I don't know, my current evolving thesis on all of this is basically

[13:58] like some people are, there's like levels to this.

[14:02] There's the lights off factory where you say, cool we're just going to write

[14:05] specs this was the strong dm thing that came out in like january or february other

[14:10] companies have posted about this of like we're going to stop reading the code

[14:13] it's the bottleneck we're just going to throw more tokens at the problem and like

[14:17] yes throwing more tokens at the problem does give you better results but it

[14:20] does not guarantee to give you correct results and i think there's like level

[14:24] one is you care about the specs and you're like okay i define the behavior really

[14:27] really well and i define like okay if

[14:31] if it is working these things will be true and hope that the model will find

[14:34] a way to test and assert those things are true, right?

[14:37] And modern models are pretty smart about this. You give it a browser,

[14:39] you give it a bash shell. It can do a lot of poking from the outside and make

[14:43] sure it does what you want.

[14:45] The next level is like architecture. And a lot of people are like down this path now.

[14:50] People who used to be full vibe coders never read the code are now like,

[14:54] well, I understand the system and the layout and the architecture.

[14:56] This is like Peter Steinberger talks about this a lot as well.

[14:59] It's just like, well, I don't read every line of code, but I know how the systems

[15:01] work and I understand kind of the interfaces between them.

[15:04] And I think a lot of people there, I think what we have learned in the last

[15:08] six months working with customers and working internally is that's like actually

[15:12] not enough because you can give it a really good architecture doc and the model

[15:16] can follow it to the letter.

[15:18] Everything you asked for in your system design Mermaid charts,

[15:21] here's the modules, here's the new endpoints is exactly as specified,

[15:26] but somehow the code is still garbage.

[15:28] Somehow there's still like leaky abstractions, tramp data everywhere.

[15:33] And like, I'll get into why I think this is, but like the next step that we

[15:36] need to do is actually get into like program design, like not system design,

[15:42] but actually like, what are the interfaces?

[15:43] What are the test seams? Where are we doing dependency injection?

[15:46] Like how do these things, this is especially crazy on the front end,

[15:49] which is weird because as a backend engineer, my whole career,

[15:52] I always thought that what front end engineers, it's actually one of the most complex things.

[15:56] Models got really good at writing api endpoints and crud systems and even like

[16:00] really complicated algorithms and write-ahead logs and sophisticated storage

[16:04] mechanisms they still can't do reason about React very well

[16:08] That cracks me up every time when i see like oh yeah front-end development is

[16:11] cooked and i'm like i have never gotten good results with front-end development

[16:15] and part of that is probably also the way i work uh with llms but we will touch on that in a bit i,

[16:21] depending on At least it's looking like that.

[16:24] So I'm always wondering when I see these things on Twitter and something like

[16:29] a Peter Steinberger saying, I'm not looking at code anymore,

[16:31] whatever, if that is just a glimpse in the future because he's,

[16:35] a little bit ahead of the curve in that sense, or if that is just like his way

[16:39] of working and we're more drifting into establishing different ways of working the same way,

[16:44] like a couple of years back, people were like discussing TDD versus TDD.

[16:49] Not TDD, right? Like, are we more talking about like different approaches for

[16:53] different problems, different constraints, whatever?

[16:56] Or is this really, is this where the industry is heading? From my perspective,

[17:00] I think it's more different workflows. I think there are, if we're talking about

[17:03] spectrum development, for instance, I think they're very valid scenarios and

[17:06] very characters where this works really well.

[17:10] I'm personally not such a character because I'm not as structured in my approach.

[17:14] I'm more of like a fuck around and find out person.

[17:19] Yes.

[17:22] Yes. Very small chunks. That's why I was always also skeptical of like,

[17:28] oh, yeah, we wrote the C compiler with a two-week running long-term agent. I'm like, I don't know.

[17:38] I don't know. I don't know how I feel about this.

[17:41] Well, compilers themselves is like the one thing that is very well suited to

[17:46] hands-off running agents. like lights off, you know, just let it go.

[17:50] This is Ralph Wiggum. Like a year ago, you say, I didn't know.

[17:53] Uh, I didn't know a year ago that we would be here.

[17:57] I got a peek actually, uh, a year ago tomorrow is, uh, is the day that I met

[18:03] Geoff Huntley in San Francisco.

[18:05] And he showed us all the like early demo of Ralph Wiggum and the programming

[18:09] language he created for $5,000 by running Sonnet in a loop for six weeks.

[18:14] Uh, and it works in and in all of this. And it's just like, so program managers

[18:18] themselves are actually like incredibly verifiable. So it's very easy for the

[18:21] model to just like go through a checklist.

[18:26] But yeah, I think the zooming out again, like I think the thing to think about

[18:30] the most is leverage. Our job is to ship software end to end that is good,

[18:34] which means shipping code that's going to pass review.

[18:37] It means, in my opinion, reviewing the code. You can throw more tokens at the

[18:41] problem and, you know, BugBot and Codex reviewing Claude's code or vice versa.

[18:45] A you will find some things and you will raise the floor but like you're not

[18:49] gonna get if you're shipping really high quality production code and you're

[18:53] not reading it and caring about it or you are reading it and caring about it

[18:56] but you haven't like cultivated a deep intuition about like

[19:00] what and i don't want to gatekeep here but the bottom line is like you know

[19:03] a bad pattern because you debugged it at three in the morning this is jake from

[19:06] netflix and a couple other people and so it's like

[19:08] if you don't have the sense of what good looks like it's really really hard

[19:12] to build systems that are going to last.

[19:15] Okay, there's so many different paths right now where I kind of want to go down with you.

[19:21] Let's talk about that review piece a little bit. Because I look at any kind

[19:26] of automation that we can integrate in a review, like even if it's just like

[19:29] automating tests and stuff, those are signals that tell me a certain amount

[19:33] of, like a bigger picture piece about the quality.

[19:36] Are those fully extensive signals? Absolutely not, right?

[19:40] Like code can be garbage even though the tests pass. And vice versa,

[19:43] the code can be great even though the tests fail.

[19:46] So and this is like looking at the most deterministic tests can also be flaky but fundamentally,

[19:52] you know what i mean um and the same way i also think if you have this spending

[19:57] budget on saying hey let's run Codex on every pr to get like that signal get

[20:02] like a first summary of the review what the code quality is

[20:06] absolutely would i treat this as a strict quality gate these need to be fix

[20:09] everything this needs to be included in everything this is this is the,

[20:14] the base or i treat it more as a baseline,

[20:17] or like a starting point for a human to look at oh okay this might be something

[20:22] we should explore more something.

[20:23] And it's a little blurry it is like yeah you shouldn't spend really valuable

[20:27] human hours on catching like small issues like if Codex can catch it let Codex

[20:31] catch it and fix it for sure

[20:33] I see these stories and maybe this is just the environments that I worked with,

[20:37] but I've seen these stories where people are like, oh, I'm now just reviewing

[20:40] code where I'm like, well, if you're just spending hours reviewing code,

[20:43] you're doing something wrong.

[20:45] That's my thesis. There are absolutely difficult pieces of code where you need

[20:51] to carve out like 30 minutes or something to digest it properly,

[20:55] grab yourself a cup of coffee and zone everything out.

[20:59] But if you need that much time to review a PR, I don't know what level of review

[21:05] you're doing I've reviewed PRs with hundreds of files and never spend I don't,

[21:15] my wife is working for a medium sized company and they,

[21:20] are so distracted by PR reviews where they're effectively saying we don't do

[21:24] them. And I'm like, A, if you're distracted by them, you're not understanding why they're valuable.

[21:30] B, the code quality aspect is nice. I'm still, my biggest aspect of PR reviews

[21:36] is more of like the knowledge transfer, but again, different conversation.

[21:41] But I don't understand this notion of like, oh, there's not so much code,

[21:44] we cannot review it anymore. Like, what are you doing?

[21:47] Like, are you, it's not a novel.

[21:49] Like yeah and this is Dax from OpenCode has said this and i forget who else

[21:55] notable said it recently but it's basically like there is a ton of

[21:59] things you could build and the fact that you can just like prompt a feature

[22:03] into existence and like they basically my take is like lots of people are out

[22:08] there telling you code is free and build every single thing you can and it's

[22:13] It's not free.

[22:13] It's not because if you don't care about it you will be throwing it out in six months i

[22:19] Like I said, maybe GPT-7 or GPT-9 will be able to solve the current model's

[22:23] problems, but if you want to have a functioning company, if you're 0-1 and you're

[22:28] trying to find stuff that works and you're throwing shit against the wall,

[22:30] you're basically in prototyping mode, amazing. Don't read the code.

[22:34] If you're a fintech with hundreds of engineers and you get fined millions of

[22:37] dollars if something is done incorrectly, you have to read the code.

[22:41] You literally like it is existential to your company, bordering,

[22:44] it's borderline existential to your company to make sure that things are correct.

[22:48] And bugs still happen and humans make mistakes too, but they don't make the

[22:51] types of mistakes that models make.

[22:54] And this is probably the thing that bothers me the most in this online conversation

[22:58] because it is more nuanced and Twitter is not great for nuance.

[23:01] It's actually horrible.

[23:02] But there are scenarios where wipe coding is completely valid and I would probably

[23:06] even, I do it myself, I would encourage.

[23:08] I do it all the time.

[23:09] If I write a tool myself for my little, I want to track how well this podcast

[23:14] is doing, why should I pay a company if I have some clock tokens floating around, right?

[23:20] Did you watch for a launch video?

[23:22] The laundry was fantastic.

[23:25] So every single animation in there, all of the motion graphics,

[23:29] vibe-coded, like Opus 4.7, it's like 2,000 line React files.

[23:35] I have not read a single line of them, completely vibe-coded.

[23:38] But that is also something that is easily verifiable. You put it in the video,

[23:42] figure out, oh, yeah, it's great, and you're good to go.

[23:45] Yep.

[23:47] If we have software that affects users, maybe even on a very regular basis,

[23:52] like daily, you should absolutely care about what you're shipping to them.

[23:55] Yeah. And so here, I can, can we do some drawing? Yeah. Hell yeah. Okay.

[24:02] So this will also be an audio version, so I'll try my best to describe it very accurately.

[24:09] I can put the end picture somewhere. Oh, sweet. Yeah, let's do that.

[24:13] And we can post it with the show notes or something.

[24:15] Yes. Um, but like the like classic, like software factory SDLC is you have actually,

[24:21] let me get a classic, uh, SDLC.

[24:25] There's like, it's like the infinity sign with like the eight nodes or whatever. Right.

[24:29] All right. We can just copy this one. Uh, so you have, yeah.

[24:34] Planning analysis, design, implementation, testing, maintenance,

[24:38] some, some, some, this is where we were like 20 years ago. No one,

[24:41] no one does this. I hope you have like ticket ticket. This is like,

[24:45] you know, what are we going to build?

[24:49] I'll call it like PRDs, right? And then at some point you have like doing the

[24:55] code and then you have, you know, code review and maybe you have,

[25:00] I'll put code review and like testing in one block.

[25:03] It's just like, make sure it's correct. And then it goes to prod,

[25:07] Right? Sounds reasonable. Yeah.

[25:10] And then customers use it.

[25:13] Hopefully.

[25:15] Hopefully. Hopefully you have users. And then by some process,

[25:18] this makes it back into your team, their feedback and whatever it is.

[25:23] And you make new PRDs or bug reports or whatever it is, right?

[25:26] But like requests for changes in the product, right?

[25:29] And this is how a lot of teams go. And then as you get a little bit bigger,

[25:32] you kind of introduce two stages here. Most teams start doing this pretty early.

[25:35] We have kind of like a design meeting, not like visual design,

[25:40] but I mean, like, how are we going to build this?

[25:42] Usually this happens like you have design meeting and then you have like break it down into tickets

[25:47] Yep yep yep yep yep.

[25:49] And then those are what go into the coding and so like we've all been in here

[25:52] uh sit in a room full of four or five software engineers you look at the things

[25:55] we want to build this week you say cool how are we gonna you align on how we're

[25:58] gonna do it and then you break it down into small stories and then everyone

[26:01] just goes and gets to work you create the tickets out the backlog um

[26:05] What a lot of and so like this is this is the old way the things that change

[26:09] here for the AI software factory is basically like you have,

[26:13] you know, some tech in here, which is like sandbox orchestration.

[26:18] Uh, you maybe have like a, what we call like an outer harness,

[26:21] which is like giving it like feedback and testing and a browser and stuff like this.

[26:26] Um, and then you have your like inner harness, which is, you know,

[26:30] Claude Code, Codex, app server, whatever it is. Uh, any of the model.

[26:34] And this is going to like push things into your code review and testing loop.

[26:38] Maybe you have like manual human testing if no one's reading the code i hope

[26:43] someone's at least trying it and

[26:44] seeing if it works before we merge it uh you may have automated testing i'm

[26:49] gonna assume you're gonna do as much automated testing as possible here and

[26:51] so you're gonna catch all the things that automated testing could catch so you

[26:54] might have manual human testing you probably have like ai code review bots

[27:00] Um, and the question is, is like, can we skip the like actual,

[27:05] like important thing of like, you know, human code review?

[27:10] Uh, and if you just throw AI in the places we have it so far,

[27:16] essentially what happens is you get, does it make sense so far?

[27:20] Yes, yes, yes, yes, absolutely. Yeah.

[27:22] So you can throw AI in here and then this thing is like, cool,

[27:26] you're going to spend all, literally this is the only human step.

[27:28] So you're going to spend six hours a day reviewing code, basically.

[27:34] Or let's say you're going to spend, it's a giant PR with six features or whatever

[27:38] it is, because the AI is on goal mode and it's shipping the entire thing.

[27:41] And you could go read the code for six hours.

[27:43] I don't think anyone can do a good job of reviewing code for six hours straight.

[27:46] And I don't think we should ask software engineers to do that.

[27:48] And I don't think anyone wants this.

[27:50] Uh and so like the thing that we've seen working in a lot of really good teams

[27:55] is actually like using ai plus human to do design

[28:00] and do like breakdown breakdown and ordering right this is this is kind of our

[28:06] bread and butter is like hey if you do this really well and you spend 20 minutes here

[28:12] or maybe let's say we spend an hour here to do the design to break it down into

[28:16] steps where it's going to be verifiable along the way uh maybe you even have

[28:21] a human for really complex things you have like a human like spot checking in between

[28:27] because you've ordered things correctly then your code review goes from six

[28:30] hours to like 20 minutes because like the prs that take a long time to review

[28:35] are the ones that are bad a perfect pr or a pr that is like okay i gotta change

[28:39] some variable names and maybe move things across files

[28:42] it's easy it's almost a joy to review uh

[28:46] especially if you already went through this process and you understand it.

[28:50] So that brings me kind of to a somewhat related question, because I've read

[28:55] that at Human Layer, you'd kind of change the way you're developing by focusing

[28:58] more on having a very extensive spec. And you might, I think you have a,

[29:02] you call it a little bit different. It's not quite a spec.

[29:05] So we can talk about where you differentiate there, but you have a very extensive,

[29:12] research and plan that is then getting reviewed before it's,

[29:16] going into the coding part of things. Yeah. Is that a fair summary? Okay.

[29:22] Fair enough. I mean, I actually, I think the word spec is pretty, like, what is the word?

[29:28] Yeah, it's just, it means too many things to too many different people.

[29:31] And for some people, it's like writing a detailed ticket. And for some people,

[29:34] it's writing 30 Markdown files with, like, 80 architectural decision records.

[29:40] And, like, everything is numbered. You have acceptance criteria and all this

[29:44] stuff. And like, I don't, the, the goal of all of this, I don't give,

[29:48] I don't give two damns how your spec is shaped.

[29:51] It should give you leverage. It should let you read a 200 line markdown file

[29:56] and re-steer rather than having to read 2000 lines of code and re-steer later

[30:01] where it's like more work for you to build it, load it into context,

[30:04] more work for the model to debug or make changes. Cause it's already kind of

[30:08] committed down one path.

[30:09] And so we actually have, yeah, these two phases where you have like,

[30:12] okay, what is the overall system architecture?

[30:14] And then what is the program? If you care a lot about program design,

[30:17] what is the program design going to look like?

[30:19] You want to basically give the model every opportunity to give you a zoomed

[30:23] out version of the code so that you can resteer that. Because the more detailed

[30:28] the thing is, the harder it is to resteer.

[30:31] And so the more, if you can do a pass at the 50,000 foot view and at the 25,000

[30:36] foot view and at the 10,000 foot view,

[30:40] you save yourself a lot of time at the live view on the ground reviewing the code itself.

[30:47] No, I appreciate that. How do you make sure that...

[30:53] Because, I mean, like, effectively, models are not deterministic.

[30:56] Agents don't make this slightly better by having tools to make it a little bit more deterministic.

[31:01] But fundamentally, still, building on non-deterministic software doesn't help

[31:06] with making it deterministic. So where I'm going with this, you can have the

[31:10] same prompt, perform it twice, and based on the time of the day,

[31:12] you will get different results.

[31:14] Yeah. how how do you make sure then that you have a plan whatever you want to

[31:20] call it in place that is detailed enough to prevent that drift,

[31:26] but also not over detail where you're basically like exceeding the context window

[31:30] with just one markdown file that is 5,000.

[31:32] Lines long right and this is the i forget there's some haskell person posted

[31:37] this and um Mario Zechner the pi agent guy, he talks about this all the time.

[31:41] It's like, people say, oh, but I have a very detailed spec.

[31:44] And it's like, if you are at a level of detail that you are guaranteeing that

[31:48] every line of code is written in a particular way, you haven't written a spec.

[31:51] You've written code. A program is a detailed spec.

[31:55] So the last episode of this podcast went out with Mario and we talked about

[32:00] spec-driven development and enterprise-wide coding. So, still very fresh in my mind. Yeah.

[32:07] So again,

[32:09] We're looking for leverage, right? I coach people, actually,

[32:12] the first time people start spectrum development, they kind of,

[32:14] like, have it in their head. It's like, oh, if I just get this perfect,

[32:18] then I won't have to recode ever again.

[32:20] I won't have to do this. It will just, the model will just handle it.

[32:22] We're all looking for, like, an easy button or a way out of,

[32:25] like, thinking about the systems and designing the code and,

[32:28] like, cultivating taste.

[32:30] And it's right. It's like the friction in the building is where you learn,

[32:33] and people try to avoid friction.

[32:35] And so for me, I see people try to get, they spend an hour getting a spec perfect.

[32:39] And I'm like, no, spend, spend 10 minutes, get it like 80% of the way there,

[32:44] get it close enough that when you zoom into the next level, it is easy to re-steer

[32:49] if you left things out or if you forgot things or you want to change things.

[32:53] And so that's from the system design down to the program design down to the actual code.

[32:58] It's all about how do I make this directionally correct enough so that when

[33:04] I get down into the weeds, the likelihood that I'm making big changes is really

[33:08] small and that I can quickly recover in one session.

[33:11] So I assume these markdown files that you prepare as part of that are getting

[33:16] checked into the code as well as part of the project or what you're working

[33:20] on or how you're handling this.

[33:21] The thing we landed on like a year ago was that these shouldn't be checked into

[33:25] the code because they they work separately because we don't maintain specs in

[33:32] the sense of like there's this

[33:33] there's this school of spec driven development where people say like,

[33:36] cool, we maintain a set of specs that describes the program state.

[33:40] And then we change the specs. And as we change the code, we update the specs to match.

[33:46] I am on a GitHub issue thread somehow i'm subscribed to that is a year old that

[33:51] is people on the spec kit repo like complaining that this is a really keeping

[33:55] these things in sync is really really hard

[33:57] And and that's where i was going like we have so nuanced bugs sometimes that

[34:01] are like part of maybe several specs and like how do you reflect that properly

[34:05] that's kind of where i was going with this oh.

[34:07] Yeah but okay and you have bugs that have nothing to do with the specification

[34:11] of the software they're about the internals and so how do you capture that in

[34:14] a spec no well you have to document the program design but if you try to document

[34:18] it's the same thing it's like you try to document in comments and in function

[34:22] names and you have developer docs of how does this module work

[34:25] and it's it's out of date immediately and so we actually treat all of our specs

[34:29] we we do store them but we store them the original version was it was a

[34:33] symlinked repo into your current repo that every time a file was written we

[34:38] would sync it to a separate GitHub repo so just like no commits no merge it

[34:42] was technically a git repo but we were treating git basically like google docs

[34:45] or like s3 where every time someone makes a change you push a new version

[34:48] uh and so they were accessible and you could pull them in and you could link

[34:51] them in but they're really like tactical docs for the tasks that i'm on and

[34:56] when i'm done shipping whatever feature or bug fix i'm shipping they kind of

[34:59] get archived and like we rarely go pull them back out

[35:03] Okay that makes a lot more sense at least thinking about the way that i work

[35:07] and i mean we talked about this where I'm like more explorative where it's like, oh,

[35:12] Let's start here and then find my way around the software, right?

[35:16] That makes a lot more sense because then you can, like, start with a good enough

[35:19] plan, as you described it, and take it from there.

[35:24] Whereas, like, otherwise, if you check it in, then it feels like,

[35:27] to some extent, more final, approved. This is what's going to happen. Yeah.

[35:32] Now I'm committed to this. And if I get halfway down the implementation,

[35:35] I'm like, oh, that's not going to work because we forgot about this thing.

[35:38] Like, I can just finish.

[35:41] If it's close enough, I can just fix it and re-steer because we're going to throw that dock out.

[35:45] But if we change and I own that dock and other people are going to be using

[35:49] it, now I have to change my code and then I have to remember to go update the

[35:52] plan. And you're actually just giving yourself more work. Yes.

[35:56] And that's the way that I, with this traditional approach of spectrum development,

[36:01] how I always felt about it.

[36:02] Because effectively, again, what the software developers most of the time are

[36:07] doing is finding out what they need to build to some extent.

[36:11] We have a good enough ticket that we know vaguely what we need to build,

[36:15] but how it exactly looks, what exactly are the constraints.

[36:18] I've never yet seen a ticket that has all the level or all the details that

[36:21] I needed to know to just be like, oh yeah, let me throw this at GPT-5.5.

[36:26] It will take care of this.

[36:27] Completely delusional from my perspective. But like, you need to have enough

[36:30] details, some kind of acceptance criteria that you as an engineer are confident, okay, I can build this.

[36:36] Once you have that level of confidence, You'll figure out the roadblocks along

[36:39] the way. That's at least how I've been working.

[36:42] And this approach never really clicked with like a traditional spectrum approach.

[36:47] So I always looked at it more as like, okay, what are people doing here?

[36:51] Why are they thinking this is good? But I like your approach a lot more.

[36:55] It seems kind of like a middle ground in that sense.

[36:58] Yeah. You got to be comfortable rewinding. You got to be comfortable throwing

[37:03] stuff out. You got to become same thing with code. I don't know.

[37:06] I used to do this thing when I was a software engineer writing code all day.

[37:10] It's crazy to think of this.

[37:14] If I was writing a PR and I didn't like the design, I

[37:20] did all this work. I spent two hours on this. But it's like,

[37:23] I tried to cultivate the habit of like, look, the hard part is actually understanding.

[37:27] I'm going to get reset, start over and build the feature from scratch again.

[37:31] And it would always be better code. It would take a little bit longer,

[37:34] but I'd be so much happier with it once you've gone through and figured out

[37:38] what all the constraints are.

[37:39] And so like you have to leave space for surprises and you have to basically

[37:43] like the spec is not about getting it perfect.

[37:46] It's about optimizing like optimizing your chance of success and the amount

[37:52] of changes you have to do while not getting too attached so that you can be

[37:56] flexible and squishy and kind of like re-steer as you go, as you learn things.

[38:01] I think this attachment to code is one thing that is a little bit weird to me.

[38:05] And I think also where a lot of this anti-AI sentiment is coming from.

[38:13] I absolutely enjoyed coding as an activity and stuff.

[38:16] It's fun. It's a challenge in some way. So it's like very stimulating in that sense.

[38:21] But at the same time, the overall goal is to, is always to, I mean,

[38:28] like this traditional Silicon Valley thing, make lives better, right?

[38:32] Like whatever it is, like at the end of the day, you want to build something

[38:35] that is used by people in some way and makes them more productive,

[38:39] makes it something easier for them, gives them some kind of value in that sense.

[38:44] And code is just a means for that value.

[38:48] I mean, like in the same, I like DIY woodworking, right? if I could,

[38:53] code in that sense it's just the same thing as like if i build a bird house

[38:56] and my daughters love that easy win.

[38:58] I could buy hands sometimes it's it's great but i do it on on saturday and it's

[39:02] like a side project where i'm like i just want to play with interfaces and do

[39:05] do the do the red green tdd loop by hand and like

[39:11] i don't know i so i read a book when i was 22 i'm sure you've heard of it is uh

[39:16] Bob Martin Clean Code uh and i had been using at that point i've been using

[39:21] JetBrains IDEs for like a year and I had just got started to get really handy with like

[39:26] a lot of the more advanced refactoring tools and I don't know I'm not gonna

[39:30] pull up the quote there's like

[39:30] extract function rename variable like inline method of like you weren't really

[39:35] thinking at the level of the individual characters anymore you were like moving

[39:39] things around and you were like restructuring the the program design and and

[39:43] Bob wrote this quote he was using re-sharper when he wrote this but it's like

[39:46] visual studio whatever uh and he's just like

[39:49] this is the best tool it is like it knows exactly what you want and everyone

[39:55] is saying for 40 years that we're going to have drag and drop things and code

[39:59] is dead and people software engineers are just going to use like WYSIWYG things

[40:02] to design their programs and like

[40:04] we're kind of getting there but it's not a serious thing that anyone uses for serious work uh

[40:09] But uh I I this spoke to me so much of just like the the

[40:15] the the joy and the flow state of like molding the clay at like a higher level

[40:20] um as i did not really answer your question but yeah this idea of like there

[40:25] is a there's there's a lot of like joy to writing the things by hand and designing the system

[40:30] Absolutely um at the same time i think there is also okay do you think,

[40:38] it is reasonable at this point for a company to require ai or mandate ai usage for writing software.

[40:47] I think from a like radical candor perspective, if you love your employees and

[40:51] you want them to grow and be prospective, sorry,

[40:55] if you love your employees and you want them to grow and be successful in this

[40:59] new world and they really, really don't want to do AI, you should find a way to get them to learn.

[41:06] It's like, it's like the, the engineer who's stuck in text edit and they're really good engineer.

[41:11] And you're like, look, I know you don't want to learn Vim key bindings,

[41:14] or I know you don't want to like fire up this clunky IDE every time you start to work.

[41:20] But I promise you, you will, if you, if you stick with it and you do the like two to three works of

[41:26] two to three weeks of pain, and you commit to learning more about this every

[41:30] week, you will be, you will have superpowers and you will thank me.

[41:35] And it's it's hard to do but i think it's a man if you're a manager and you

[41:40] are not trying to help your people adopt ai you are failing them

[41:45] I i'm a little bit torn because if i if i take like a couple steps away then

[41:49] ai is just a tool right if you can guarantee me the same level of performance

[41:53] quality etc without that tool at the end of the day i don't care,

[41:57] at this point someone to make that statement i think that is a very bold statement

[42:01] to say i can deliver the same quality in the same time without using AI. Yes.

[42:08] But I mean, this is a really good point about, because even if it's using AI,

[42:14] well, which AI, which system, which spectrum development kit,

[42:17] which skills, which coding agent, which harness, which IDE, all of these things.

[42:21] And it's very easy to become a very qualitative discussion. And I think like,

[42:24] if you want to drive meaningful AI adoption in your org, you kind of need like, you need two things.

[42:30] You need a metric and you need like social proof.

[42:34] You need to be able to point to a team over there that is like,

[42:36] hey, those people over there, we all agree, they're shipping like crazy and

[42:41] they're not descending into slop.

[42:42] They're not having more bugs. Their project is on track. Everyone thinks in

[42:46] general the code quality is good and they're crushing the metric because then

[42:51] you can go around. You have some hypothesis or you have six.

[42:54] We're going to have this team over here do Cursor and this and this and this.

[42:57] And metrics are hard. We can't measure engineering productivity.

[42:59] We've been trying for 50 years.

[43:02] Okay, that's where I wanted to go with this, because every engineering metric

[43:06] that I've seen around productivity, I'm like, that's garbage,

[43:09] that's garbage, that's garbage.

[43:11] You don't like weighted PRs per dollar token spend as a metric?

[43:19] No, it's really hard. I mean, I think you could pick a metric that's directionally

[43:23] correct, where it's like, okay, yes, you can cheat this and game this.

[43:28] But if that person over there has double this number than that person over there,

[43:31] I would reasonably assume they're shipping more and they're more productive.

[43:34] That's true. That's fair. That's a fair point.

[43:36] But then you get to have the conversation with everyone on your team,

[43:38] right? Once you have that social proof and you have a metric that is like at

[43:42] least defensible, then you get to go and like talk to other teams and you say,

[43:47] look, I don't care how you do it.

[43:48] I don't care what tools you use. I'm not telling you to use an IDE.

[43:51] I'm not even telling you to use AI, but you have to hit that level.

[43:56] They have proven it can be done while maintaining a high quality bar and they

[44:00] have proven they can double your numbers if you want to go

[44:04] if you figure out you can deliver more shareholder value by running three gas

[44:08] towns in the corner and throwing more polecats at the problem great

[44:13] but you have to get there and we're going to help everybody get to that bar or get close to it

[44:18] So one thing that I see all the time is that level of usage with AI is very different.

[44:26] If we look at total token consumption within companies, the top 10 spenders

[44:31] have 90% of token consumption and the rest of the company usually share the rest of that.

[44:39] Do you think... I mean, part of that is we're now starting in this phase where

[44:43] there is an AI budget that is strict.

[44:46] Do you think... Because a lot of these workflows like Gas Town, Loops, etc.

[44:50] Are based on the premise that AI tokens are infinite and companies don't care

[44:55] how much you spend on that.

[44:58] How do you see this going to change?

[45:01] I mean, my thesis is basically like the best thing you can do today if you need

[45:05] to maintain high quality and you're shipping to production, all the things we've

[45:08] talked about is you can probably get to like two to three X for most types of work.

[45:15] And 10 X or 100 X is like reserved for very specific, very verifiable domains.

[45:22] Where you know like the the the the bun rewrite is like okay cool they already

[45:26] had you know tens of thousands if not hundreds of thousands of unit tests very

[45:30] verifiable if it's working or not

[45:34] And i i think two to three x is great and i think people are i've already talked

[45:38] to teams who measure if you know dx that company that got bought by atlassian

[45:43] they they do a like they have a kind of proprietary productivity metric and

[45:47] you can just look at that metric or you can look at it divided by dollars spent

[45:50] on tokens and i think that's going to become an

[45:53] interesting thing and like again i hate metrics but at the end of the day like

[45:57] the things that motivate engineers are like

[46:00] building beautiful code and probably getting paid and so if like

[46:04] if the company has agreed that oh this metric is directly correct and if you

[46:07] do well at it you are going to get promoted you are going to get a raise whatever

[46:11] it is like you as a you as a leader have to figure out how do we create pull

[46:15] towards new ways of working

[46:18] um and i think probably like using tokens efficiently using tokens as many tokens

[46:24] as you can is a great way to get to push people into ai psychosis and get them

[46:27] completely obsessed with it and then pull them back out and it's like cool now

[46:30] figure out how to do this cheaply

[46:33] or we'll call it efficiently more efficiently

[46:36] We're slowly now starting to look at like the ri and like the obviously infinite

[46:40] tokens are nowhere near a reasonable RRI because I can use infinite tokens.

[46:46] I can have 15 goal Codex loops running, doing jack shit, right?

[46:53] But having like this,

[46:57] Okay, on that, do you think being more selective with the model is going to

[47:02] be one way that developers are going to tweak that? Because if I look at my

[47:06] workflow, I use usually the most frontier model.

[47:12] Fable was fantastic.

[47:14] I don't have time to fix Sonnet's work. It's faster and better use of my time

[47:18] to just use the smart one, right?

[47:20] That's exactly.

[47:23] I was trying to give it the benefit of it the other day. I used Sonnet for something

[47:26] and I was like, I had to multiple times do it where I'm like,

[47:29] you're factually wrong here.

[47:31] And not even like just off a little bit, you're literally wrong.

[47:35] And that happens with Opus too, but like proportionally, nowhere near that.

[47:41] So I usually just, I don't even mess dramatically with reasoning levels,

[47:45] if I be honest with myself.

[47:46] I set it to high or extra high and call it a day.

[47:49] It's slower, but I usually do other things while the AI is running anyway,

[47:53] because it helps my adhd to keep going so give me one last answer what is the

[47:59] one mistake companies are making right now with ai's usage biggest mistake.

[48:03] I think abandoning code quality and system quality giving engineers permission

[48:08] to ship slop i don't think that's correct i think that's going to i think that's

[48:13] going to uh collapse your codebase into ash much faster than you think

[48:17] We actually had to stop the first recording right there, which was super annoying

[48:21] because we had just gotten into the practical part.

[48:24] When should you spend money on the frontier model?

[48:26] When does it make sense to use something cheaper? And what does planning even

[48:30] mean once agents are doing more of the implementation?

[48:33] So a few days later, Dex came back and we picked it up exactly there.

[48:37] We had to cut it off last time a little bit short, so I'm glad we are able to continue it here.

[48:43] And we were talking about cheaper models and that it's kind of tedious to fix

[48:47] the mistakes that they make and instead usually, at least both of us,

[48:51] we're kind of resorting to just using a bigger, more frontier model.

[48:57] But you also said there are a couple nuances to that where you would resort

[49:00] to using something like a solid model. So let's continue there.

[49:06] So this comes down to, I think, a concept that I've been

[49:12] shipping back and forth with developers for a decade now which is make it run,

[49:16] make it right, make it fast and maybe make it cheap you know I think designers taught me this

[49:24] The idea of, like, prototyping and getting so, like, I don't know,

[49:26] we talked about this on our podcast a lot of, like, before you go try to optimize,

[49:32] because there's some techniques you could do. This was a year ago,

[49:34] so the landscape was different, but at the time, it was, like,

[49:37] 01 or 03 had just come out.

[49:39] It was a really smart, beefy reasoning model, but it was flow and it was expensive.

[49:44] And the advice basically came

[49:45] down to, like, cool, get it working with the smartest, best model you can.

[49:51] Figure out what the frontier can do.

[49:54] And then as you need to, if your volume goes way up or you need to optimize

[50:00] for latency or price or whatever it is, then go try to make it work on GPT-4o.

[50:06] Then go try to make it work on 4o Mini or whatever it is.

[50:10] Does that make sense?

[50:11] Yes. And like the Fable release, that was the first time where I was,

[50:17] actually the first time was probably Opus 4.7.

[50:21] I think they changed the tokenizer where they said like oh the model is technically

[50:26] at the same price but it was consuming 30 more tokens so that was the first

[50:30] time where i started to be really like,

[50:32] okay do i really get more bang for this for the buck here or not Fable then

[50:38] kind of elevated that where it was like okay it's twice as expensive as Opus

[50:42] now do i really always need to spend the big dollars,

[50:46] or but like most of the time i still think like and for most developers i talk

[50:52] to it's like okay using something like Opus GPT-5.6,

[50:57] um is for most developers i know at the way they work at least like the average

[51:02] developer they get fine with the budgets that they have in that sense i'm not

[51:07] talking about like running crazy loops parallelizing things like crazy crazy.

[51:11] But right now, I don't see this anywhere near. At the same time,

[51:16] though, tokens are getting so much more expensive that I, at the same time,

[51:20] also think companies will eventually put in restrictions like that.

[51:24] Oh, I've talked to enterprise customers who have gotten guidance from leadership

[51:30] of like, okay, we're going to use Opus for planning, but then I want you to

[51:33] switch to Sonnet for implementation.

[51:35] Is that something where you see negligible quality difference, if that makes sense?

[51:43] I think it depends. I mean, I think, number one, there's a huge question here

[51:49] of like, are you on a subscription or are you paying per token?

[51:53] Fair enough.

[51:55] And for the subscription people i will say if you were maxing out your subscription

[52:00] on Claude and you're not using Fable obviously Fable ate through it really fast

[52:03] but if you're just using Opus for everything and you're maxing out your subscription

[52:09] like you're probably doing too much um

[52:12] and again there's two categories right there's the vibe coders and then there's

[52:15] the people building production software and like i vibe code all the time but

[52:19] there's a time and a place for it

[52:21] and yes you can vibe code the entire universe of software if you get good at

[52:25] paralyzing but i don't think it's actually like

[52:29] productive in terms of like creating value in the world

[52:33] I that's how i like to separate i think there's like a huge area where web coding

[52:37] is fun even also productive like writing an internal tool or something that

[52:42] just you and a couple colleagues are using completely viable to just vibe code it not look at it.

[52:46] As long as we call this a couple times call this fight slop with slop you vibe

[52:51] code the tools that help you like improve the code quality of your actual code

[52:56] I i do that a lot for the for partners here for like post-processing and stuff

[53:00] like as long as the result looks good i don't really care for the code quality

[53:04] as long as it works i'm the only one using it so totally cool but,

[53:11] I'm always wondering, okay, because the plan is for me the part where I want

[53:17] to like involve more of my personal thinking. So I'm always wondering,

[53:23] okay, and that's kind of where my original question was coming from.

[53:26] Am I getting a better, or do you see getting better results of using an,

[53:31] expensive model for planning and a cheap model for the execution,

[53:35] where my thinking would more be the vice versa having like,

[53:39] a cheap model kind of act more as like my sparing partner to like encourage

[53:43] me think through a couple edge cases and stuff use that for planning and as

[53:46] long as i green light the plan i would want an expensive model to cover the edge cases properly.

[53:53] It depends.

[53:55] What you mean by plan, I think. I think there are...

[53:59] That's a great question because I already remember from last time that I think

[54:02] we had a slight different differentiation or like way of looking at plan.

[54:08] And a lot of the things that you're doing at Human Layer, also you're constantly

[54:11] describing this concept of plan or questions.

[54:15] Research, design, structure, plan, implement, work tree, whatever.

[54:19] I don't, yeah, there's... I think I'm done with acronyms.

[54:24] The point is is you're building a prompt like you're building a pipeline of

[54:27] prompts and you're being in the loop like a plan is just a prompt and so your

[54:30] prompt can be every single line of code that should be changed which feels like

[54:34] overkill or your prompt can be

[54:37] the two sentences you typed in in the first place and there's this whole spectrum

[54:41] between i rambled about a thing i want and a highly like detailed technical doc

[54:48] and this like process of refining various levels of detail in those you go from

[54:53] two sentences to a page you go from a page to a

[54:58] like you know essay the three-page essay you go from three pages to like a detailed

[55:02] outline it's just like writing anything right

[55:05] I think for me the sweet spot is usually where i feel i have a good enough understanding

[55:11] where i don't hit too many edge case or like uncover too many edge cases but also have,

[55:17] enough understanding that i can share with an agent or whatever in form of verification

[55:23] steps that these edge cases could be uncovered while the agent is.

[55:26] Running yeah i think i think it's not about getting a perfect plan that perfectly

[55:31] documents your intent that's kind of like

[55:34] I don't know what the analogy is, but it's like, you don't need to get it perfect.

[55:40] You need to get it good enough that you'll be able to address any deviations

[55:45] without having to do a lot of manual work to rebuild context or start a new

[55:50] session or whatever it is.

[55:51] It's like you build this intuition for how much can I do in a context window?

[55:55] How much can I do in a context window where I'm using sub agents?

[55:57] And then you say, cool, the plan has to be good enough that if it's 20% wrong,

[56:02] I know I'll be able to recover, but if it's 50% wrong, I'm probably,

[56:06] it's probably going to be easier for me to throw it all out and fix the plan.

[56:11] And if the, if the plan is so it'll come back and I realized the plan was actually

[56:15] 50% wrong or 80% wrong, then it's like, okay, cool.

[56:19] I'm also going to throw out the plan and I'm going to rewind even further.

[56:21] And so it's like, you're constantly getting, the more comfortable you can get

[56:24] with zooming in and out of these levels of abstraction

[56:28] the more comfortable you can get with okay this is close enough that i'll be

[56:32] able to recover and there's only a 10 chance that i'll have to rewind it's like

[56:36] all these like stacking of probabilities in your head of like okay i don't this is why i think like

[56:42] have you heard this thing that like people who play starcraft are really good

[56:45] startup founders or like rts games

[56:48] Is because you're basically taking a bunch of incomplete information.

[56:51] There's fog of war. Matt Pocock talks about the fog of war and the frontier.

[56:55] There's stuff that you don't know. You only know what you've seen.

[56:59] And so there's like a 30% chance this is going to happen and a 10% chance this is going to happen.

[57:04] And how do I get more information at some level of abstraction to help me recalculate

[57:10] the probabilities of how the thing works today and how it's going to be built when I build it?

[57:16] And then you're like, I don't know. I think this is what people talk about,

[57:20] LLM intuition. It's like being able to, without thinking about it,

[57:23] naturally hold all these probabilities

[57:25] in your head and then combine them into what's the best path.

[57:28] One thing that I've seen more and more being talked about on social media is

[57:31] that people interact with different models differently.

[57:34] So I think Theo is talking about that a lot, that he's using Opus fundamentally

[57:39] different than GPT-5.6, more on a prompt level than anything else.

[57:44] And I have this level of intuition where...

[57:47] I experiment with these tools way too much so that I say like,

[57:51] okay, I get better results in this area by using that model and better results by using this model.

[57:57] That is the level of intuition that I have. I don't think, because usually I

[58:01] share my thinking with the model in a way, in the prompt, I don't think I drastically,

[58:06] change the shape of the prompt based on the model. Is that something you're doing?

[58:11] I think Calvin French-Owen, who is one of the people on the Codex launch, and now he's doing

[58:17] like some EIR thing but he was the found he was the founder of Segment like

[58:20] he's been building shit for a decade plus

[58:23] uh a decade and a half probably and he his his take was like the at the highest level is like

[58:29] GPT is more literal Opus is more expansive GPT will take your instructions and

[58:33] do them Opus is a little more likely to be like okay you said this but based

[58:37] on what i know and based on everything i've seen you probably want this and

[58:40] this whereas GPT will like just do the thing.

[58:45] So as far as prompting them differently,

[58:47] it's like the energy and the conversation I think is different.

[58:50] And we actually had to update a bunch of our prompts. So we primarily support

[58:55] Claude Code, but we have Codex now and like it's now in GA, but we've had to

[58:59] adapt our system because Claude naturally writes docs in the way that we want them.

[59:03] And Codex in our research phase, it would literally just give you a bulleted

[59:07] list of 200 individual bullets of like this happens in this file on this line,

[59:12] this happens in this file on this line.

[59:13] It was like, wasn't readable for a human, which is if you think of these as,

[59:17] Oh, I'm building the prompt for the next session. And sometimes I want to be

[59:20] in the loop and iterating. And sometimes I don't even read it. Then, uh,

[59:24] then yeah you see you see what i'm saying we have to update all our prompts

[59:27] to make Codex write like Opus basically

[59:30] I totally get what you're saying because i had this huge moment of revelation

[59:35] with GPT-5 when it came out first where it was like,

[59:40] very to the point whereas Opus or like Claude at that time in general felt more

[59:44] like flowery and like describing so and still to this day for like creative

[59:48] writing i like Claude models Anthropic models in general so much more they are

[59:52] just way more natural to read,

[59:55] but like for my German way of communicating GPT is just like exactly what i need.

[1:00:01] GPT is very German i haven't said this before and i haven't heard it before

[1:00:06] but you're you're absolutely right

[1:00:08] I was immediately like oh i i feel like talking to one of my people here. It's fantastic.

[1:00:18] You touched on managing context windows a little bit a second ago with different

[1:00:24] techniques of how much you can fit into a context window, when do you want to use subagents.

[1:00:29] So I have huge reservations with 1 million token context window.

[1:00:35] I don't think it dramatically improved anything.

[1:00:37] I still have the same reservation of going somewhere across the 60% a very imaginary

[1:00:43] bar but it's for me a bar so i usually do this thing where i get near this have

[1:00:48] like created have the agent create a summary of some kind,

[1:00:53] usually in a markdown format and then either start start a new,

[1:00:56] agent entirely or before if i imagine okay this is a bigger scope uh spawn have

[1:01:02] it spawn separate separate sub agents how do you feel about this whole thing of okay one million,

[1:01:10] context window and the techniques that we have in place right now to manage that.

[1:01:15] Plus compaction. How do you feel about compaction?

[1:01:17] So we used to say the dumb zone was like 40% of your context window.

[1:01:22] For a lot of models, that was like 80 to 100K tokens. I think it has gotten

[1:01:27] better, but I still, you know, we build a product that tries to help you do

[1:01:30] better context engineering.

[1:01:32] And if you're using a 200K token like model context window, then we will give

[1:01:38] a warning around 100K tokens.

[1:01:39] Like, hey, start thinking about, you're not, it's not going to break and become

[1:01:43] really dumb, But like start thinking about wrapping it up. And there's certain

[1:01:46] scenarios where I will happily go to 300K for the million context window,

[1:01:51] by the way, our warning is at 200K.

[1:01:53] So for slightly smarter models, better models, we know they have more data to

[1:01:57] train on long context. So it's getting a little bit better. We still warn you

[1:02:00] around 200K is like, OK, you're getting into a place where like your mileage may vary.

[1:02:06] I have regularly gone 300 plus, but that's like your intuition and your decisions

[1:02:11] and based on what's happening.

[1:02:13] The biggest tell for me when it's like, all right, kill it now and just go do

[1:02:18] a new context window is if the model is struggling to get tests to pass.

[1:02:22] If it's like, oh, I got to do this. Okay, let me try doing this.

[1:02:24] Oh, I got to do an end because that's what it's going to start trying weird,

[1:02:26] crazy stuff. It doesn't have as much intelligence going to forget things that

[1:02:30] have happened before. It might even forget how it got the test running.

[1:02:34] 100,000 tokens ago. So depending on what you're doing, also compaction has gotten a lot better.

[1:02:39] So your idea of like, hey, I write to a markdown file and then I use that to resume my next session.

[1:02:45] Compaction can now well capture most of that. And I know the Claude compaction

[1:02:51] now also points it to the conversation history. So the model can go grep through

[1:02:56] the old one if it needs to.

[1:03:00] But you're not in the loop. The nice thing about the markdown file you can go

[1:03:04] edit it and I'm what do you think is missing when you do like compaction I guess

[1:03:10] my question is like you keep some information but what do you lose

[1:03:15] It is a huge black box to me. That is the thing that is difficult for me to,

[1:03:19] deal with because at the point of compaction, I lose the information,

[1:03:23] okay, what information are now in the context window or not.

[1:03:26] Till the point of compaction, it's pretty much like I assume,

[1:03:29] it's also not completely realistic, but I assume everything of that is in the

[1:03:34] context window and will be considered.

[1:03:36] Well, so if you build a custom wrapper, a custom client, you do get a user message

[1:03:41] event out that has what was in the compaction. It's fair.

[1:03:46] So if you want to know what was in your compaction, you can always go look in

[1:03:48] the JSONL file and you can see the user message that it created.

[1:03:52] And that's how I know that compaction is getting better because now it has

[1:03:56] summary of what's happened and that it actually includes verbatim every user

[1:04:00] message that has been sent in the entire conversation,

[1:04:04] which is why now in compaction, if you give it some instructions pre-compaction

[1:04:07] and then it compacts, the chances a year ago that it was going to bring those

[1:04:11] instructions through verbatim

[1:04:13] was very, very low.

[1:04:15] And now it's going to see every single time you re-steered it or said,

[1:04:18] no, run the test like this, that all gets preserved now, which is,

[1:04:21] I think, a big improvement.

[1:04:23] I think we also talked about that last time briefly. How do you feel about sub-agents?

[1:04:28] I think we talked more about like using sub-agents for different roles,

[1:04:31] which sounds fancier than it actually is.

[1:04:34] But I think we didn't really talk about the aspect of like being able to utilize

[1:04:39] different context windows.

[1:04:40] I think of sub-agents, I think the best metaphor I heard is like sub-agents are map reduce.

[1:04:45] If you have something that is paralyzable and usually like read only where I

[1:04:49] like, I want to go read a million tokens of codebase context and then turn

[1:04:53] it into, combine it into, you know, 50,000 tokens of codebase context.

[1:04:57] Sub-agents are amazing.

[1:04:59] And then the other use case that I think they're really good for is we've been

[1:05:04] exploring what we call like an RLM mode. So we built our own custom harness

[1:05:07] and we just added one more depth of sub-agent. Claude Code, you can now configure

[1:05:11] this too, where you can allow sub-agents to call sub-agents.

[1:05:16] I think the main reason why for the last year you've only had two layers you

[1:05:19] had main agent and sub agents and that was it is mostly because uh

[1:05:25] it got very like the results just like couldn't be guaranteed to be good uh

[1:05:29] but i think adding one more layer is actually interesting where we actually have a

[1:05:35] or even just two layer rlm where the parent model can call sub agents but you

[1:05:38] prompt it to do everything through sub agents

[1:05:42] because you know the worst i'm i'm optimizing our cicd right now we have a pipeline

[1:05:46] the tests are slowly creeping up as they do i've got up to like seven minutes

[1:05:49] to run all the tests for the repo

[1:05:52] and this is a great use case for sub agents because you're like okay you have

[1:05:55] to go read a bunch of code you have to make a change you have to commit it you

[1:05:58] have to push it you have to kick off a ci run in GitHub Actions and then you

[1:06:02] have to sit in a loop and pull it and watch it

[1:06:05] and then all of that can be isolated to a context window and come back up to

[1:06:09] the main model and you basically i prompt the main model you are only allowed

[1:06:12] to use the agent tool you're not allowed to read any files you're not allowed

[1:06:15] to do any it's a little bit slower

[1:06:17] but you can get better results if you're we use this for debugging too if we're

[1:06:21] going to be reading like CloudWatch logs and Datadog data and Sentry traces and like user data like

[1:06:28] this is all we like we find this works much better with sub agents if there's

[1:06:32] if if the work is context intensive

[1:06:35] Do you think these,

[1:06:39] But workflows that are based on exposure and experience are going fade or just

[1:06:45] disappear because models are getting smarter that they can figure it out themselves.

[1:06:50] Listen, man. Okay. So here's like the biggest thing that I keep saying over

[1:06:55] and over again is like, there is a future where this is solved.

[1:06:59] Like, I'm want to focus on like, like all of this might get bitter lesson.

[1:07:04] You might just get a model with actual, like, infinite context,

[1:07:07] and you don't have to think about it, and, like, compaction is invisible and

[1:07:09] instantaneous and high fidelity.

[1:07:13] This might all get bitter-lessened. But, like, we're out here shipping value

[1:07:18] and helping users and helping people ship value today,

[1:07:22] while everyone who is, like, bitter-lessened-pilled is basically just,

[1:07:25] like, YOLOing prompts into the best model they can find sitting around waiting for GPT-7 to come out.

[1:07:30] Because they're just like, oh, it's not worth doing anything because the models

[1:07:33] are just going to get smarter.

[1:07:35] And no, the thing that gives you an edge as a product engineer is how do you

[1:07:40] get the model to be 20% better at solving a particular task?

[1:07:44] How do you find the thing that is, we said this a year ago, how do you find

[1:07:48] the thing that's right at the boundary of what the model can do and get it right

[1:07:53] consistently every single time?

[1:07:54] This is what made Notebook LM great. This is actually a, um,

[1:07:58] a, uh, a quote from one of the, the, the notebook alum guys that did late in space like a year ago.

[1:08:04] There's like the way you create magical experiences in AI is you make it better

[1:08:09] than what the YOLO prompter can do.

[1:08:12] And this is where all of the value unlock. This is where all of the interesting

[1:08:15] things you can do. And so like, yes, there is a future in two years or five

[1:08:19] years where this is all solved.

[1:08:21] And if you want to be a part of that future and contribute to it you have to

[1:08:24] fucking excuse me you have to go down a level and understand how this stuff

[1:08:28] works and build the intuition so that you can like push the frontier yourself

[1:08:32] So I'll cut this out but on cursing Apple always marks my podcast as explicit

[1:08:38] because I'm cursing. Before this there will be an episode with David Cramer I will,

[1:08:44] It won't be a lot too quick. Oh, it's a fantastic episode, but I think a couple

[1:08:49] people at JetBrains will be a little salty at me.

[1:08:52] Well, now the gauntlet has been cast. I'm going to have to catch up to David.

[1:08:56] I don't know how much more time we have, but we can certainly turn up the expletives.

[1:09:01] One thing I'm wondering is, because right now it feels pretty much like if we're

[1:09:09] looking at the big providers, right?

[1:09:11] With Anthropic, OpenAI, Google a little bit behind, and then xAI are probably

[1:09:15] a little bit more behind depending on how you look at things.

[1:09:17] But do you think there is a future where these difference will be negligible

[1:09:22] and kind of like right now,

[1:09:25] where honestly, like I prefer using a Mac, but I would also use like a framework

[1:09:30] computer or a good Dell machine.

[1:09:33] I would probably put Linux on it, but different conversation.

[1:09:36] So like these difference are getting negligible at some point.

[1:09:39] Do you think we'll look at these model providers in the near future where these

[1:09:44] differences are getting less relevant and companies are just,

[1:09:46] oh, I got a good deal with OpenAI because I know one of their salespeople.

[1:09:50] So our company is using OpenAI, whereas you switch jobs, you start to work for

[1:09:55] another company, and they're caring maybe a little bit more about security,

[1:09:58] and therefore they have their Claude deal or something.

[1:10:01] Do you think that is something? Because right now what I see,

[1:10:03] most companies I talk to have several subscription parallels,

[1:10:07] and you can use most of that, which you like, which I think is important right

[1:10:11] now because we're still in this exploration phase.

[1:10:13] Everybody's got a $200 plan, right? And you just pick which one you like.

[1:10:16] And if they're all the same, then yeah, pick the one that your buddy works at, right?

[1:10:23] Yeah, I don't know.

[1:10:24] Yeah.

[1:10:26] It would be interesting world. I mean, it doesn't seem like we're getting on

[1:10:30] that trajectory. The models are all good, but they're good in different ways.

[1:10:34] I would imagine that with

[1:10:38] the amount of relevance to national security that these models pose,

[1:10:42] it's unlikely that too much is going to get leaked and that people like labs

[1:10:46] will be able to maintain their moat because they have to keep everything super locked down either way.

[1:10:52] Uh so i don't know if i would like bet money on a world where all the models

[1:10:56] are exactly the same we'll see everyone says this is the year where open source

[1:10:59] models are going to catch up glm 5.2 is incredible

[1:11:02] it would be nice to see an open model win or at least be one of the options

[1:11:07] um because i think that gives people the ability and the freedom to

[1:11:10] open the box and play with it and change it and repair it and like all the all

[1:11:14] this stuff that tinkerers love to do and that like Like if

[1:11:17] I don't take an ethical stance on this, but like it is it is

[1:11:21] in a world where like, yes, you can go see the model and mess with it and change

[1:11:24] it and retrain it and all this stuff in a world where you can.

[1:11:27] Obviously, I want the world where I have that option because it could be interesting.

[1:11:30] It could be fun. It could yield different dimensions of kind of like wins as

[1:11:34] far as like what you can what you can do from a product perspective.

[1:11:37] I think this is also for so many aspects, super important, even if it's just

[1:11:41] like commodity to keep these big players also to some extent in check.

[1:11:45] At the same time, the convenience that you have by not hosting your own model

[1:11:49] is so big that most companies are not going to do this any time near,

[1:11:54] I assume at least, unless you have like crazy security concerns, which even like,

[1:12:01] I still talk to a lot of like German customers and even those at OpenAI or Anthropic, whatever.

[1:12:05] So I want, as you said, like for various reasons, I want open source models

[1:12:11] to succeed, be competitive in that space.

[1:12:15] But I mean, also every year since I'm in the industry, I've heard,

[1:12:18] oh, this is the year of Linux for desktop.

[1:12:21] It was every year and still it's nowhere near as popular as Mac OS or something,

[1:12:28] but different conversation.

[1:12:29] Yeah, I did Linux on the desktop a while ago. I was just riffing with somebody

[1:12:32] about window managers yesterday of like, hey, look, like actually it's a little

[1:12:36] bit better now than it was.

[1:12:37] Like with AI, it's like, cool, Claude can fix my Tmux config,

[1:12:40] Claude can debug my Wi-Fi thing. I don't have to go spend all day reading Stack

[1:12:44] Overflow once every two weeks because some random update broke my webcam or something.

[1:12:49] Getting Bluetooth and graphic card drivers working on Linux,

[1:12:53] at least the last time that I really messed with it, which was just at the beginning

[1:12:56] of the pandemic, was still utter trash.

[1:12:59] Yep, I believe it. Yeah, I saw Jeff posted there at some hacker house in Mexico

[1:13:06] doing a Nix hackathon and someone's like, oh yeah, I vibe coded a Chromecast

[1:13:10] plugin to cast my Ghostty tab to the TV from Linux.

[1:13:13] And it's like, no one would have, like, that would have been your only project

[1:13:18] and you would have been the sole maintainer and you would have spent 20 plus

[1:13:21] hours a week on that just to be the one guy who figured out how to Chromecast

[1:13:25] Ghostty to a smart TV from Linux.

[1:13:28] Coming back to this workflow of running 10 agents in parallel,

[1:13:34] doing like several side projects at the same time is,

[1:13:38] and to be precise, like Peter Steinberger from OpenClaw is very actively talking

[1:13:43] about that and not reading code a whole lot anymore.

[1:13:46] And I'm wondering how much of that is just a science experiment or like a look

[1:13:52] in the future, because they're very different constraints than an open claw has than what...

[1:13:57] An enterprise codebase deals with.

[1:14:01] Can I read a post from Addy Osmani? You probably saw it. I'm just going to read

[1:14:07] one quote from it that I really liked. It was from the Loop Engineering article.

[1:14:12] Here we can see this, agentic code review. So, A developer vibe coding a side

[1:14:16] project a dozen people will ever run and a team keeping a 10-year-old enterprise

[1:14:21] system alive for another quarter share almost no constraints worth naming.

[1:14:26] And most of the advice in circulation is really just one of those two people

[1:14:31] telling the other how to live

[1:14:32] that's that's my take is there's two very different worlds and like vibe coding

[1:14:37] is great if you want to vibe code 100 side projects that's fine but don't pretend

[1:14:42] you know what it's like to maintain a million line Kotlin codebase for a bank

[1:14:46] and if you maintain a million line Kotlin codebase for a bank and you have

[1:14:49] to be very careful and specific and you can't just yolo coat that's great but also like

[1:14:54] there's no reason to throw shade and shout at people who are vibe coding 100

[1:14:58] projects or think you're

[1:15:00] freaking smarter than everybody because you tell people like there's this like

[1:15:03] i don't know even my content i think sometimes comes off as a little bit like

[1:15:06] gatekeeping and i'm trying to like

[1:15:09] like shave the edges off of that because it's like

[1:15:12] i am focused on a very specific group of people which who produce incredible

[1:15:16] value in the world which is like software developers in companies building tools

[1:15:20] that are used by people that do tens or hundreds or

[1:15:25] hundreds of millions in revenue or billions in revenue, and

[1:15:29] The stakes are too high to risk things going wrong.

[1:15:34] And how in that world with that constraint, can you still move two to three times faster with AI?

[1:15:41] That leads me to a very interesting question. What do you think has the highest,

[1:15:45] net benefit in terms of like AI workflow.

[1:15:49] Like like products like end-to-end product throughput for like commercial applications

[1:15:54] and production that need to last is your question yes

[1:15:58] it comes down to one word man it's leverage it's kind of what we were talking

[1:16:01] about of like you start with two sentences and go to a page and get the page

[1:16:04] right and then you get the three pages right and then you get the 10 pages right and then you

[1:16:10] probably go ship it or you break it down into pieces you check it along the

[1:16:13] way but It's like, how do you, I think the problem is when you're back and forth with an AI model,

[1:16:19] it's really hard to, you're kind of like, you're being synchronous for things

[1:16:25] that don't need to be asynchronous.

[1:16:29] And then you're, you know what I mean? It's like, the model's really good at

[1:16:32] going and reading. Like, you should send an agent off to spend 10 minutes reading

[1:16:35] code and thinking about the problem. And then you should come back and riff with it.

[1:16:38] And then you should disappear for 10 minutes and let it go, like build the first part of it.

[1:16:44] And so it's like, okay, how do you pull yourself? How do you design your workflows?

[1:16:48] So humans are pulled into the parts where their time is the most valuable.

[1:16:53] And if you're optimizing for that and you really think about it and you get

[1:16:56] really good into LLM intuition, you can carve off enough time that you can do

[1:17:01] a little bit of paralyzing and you can do a lot of steering and you can get 99%

[1:17:06] of human quality code, like very good code as if you had written every character by hand

[1:17:12] but two to three times faster you can't get 10x it can't be done not today

[1:17:17] We talked about that i,

[1:17:19] don't see this 10x or 100x narrative anywhere realistic and that is just CEOs

[1:17:24] being delusional or gaming a system.

[1:17:28] Or burning their codebase to the ground and they're just they're not going

[1:17:30] to find out for three months

[1:17:32] Yeah most engineers that i know that work in like more traditional as you said

[1:17:38] like banks or something they have like very dedicated systems and they often

[1:17:42] lack like the time and resources to learn these things really.

[1:17:47] From my perspective, exposure is the best way to kind of say,

[1:17:51] okay, David in the last episode said that he's not writing a single line of

[1:17:55] code right now himself. He always uses an LM like that, that kind of forces

[1:17:59] him to get this intuition.

[1:18:03] What do you think? How can people build that intuition?

[1:18:05] You just got to use the thing all day and you got to watch other people use

[1:18:09] the thing. I think pairing with AI, like pair programming is actually really underrated right now.

[1:18:14] Uh, or it's, it's gotten a lot more powerful, um, for a number of reasons.

[1:18:18] Like we're all learning new ways of working. Like, I mean, look at JetBrains,

[1:18:23] for example, like I got a lot better at JetBrains when I sat with a senior engineer

[1:18:26] and watched them use all the shortcuts and all the refactoring tools and all of this stuff.

[1:18:31] It's, it's, it's, it's a thing where it's like a large complex tool.

[1:18:36] You can learn it by searching the web. You can learn it by sitting there,

[1:18:38] but most of times, like you don't know what questions to ask.

[1:18:41] There are unknown unknowns.

[1:18:43] And if you take 10 people who are all learning on their own trajectories and

[1:18:47] you have them mix and match around, you're going to spread that learning and

[1:18:50] everyone's going to move faster, faster.

[1:18:52] And so like, even though like, there's a couple of different ways you could

[1:18:55] work with, you could have one person working on one thing at a time and another

[1:18:58] person working on another thing.

[1:19:00] You could have, if that person gets really good, you can do two or three things

[1:19:02] in parallel, right? One person working two or three things in parallel,

[1:19:06] another person working two or three things in parallel.

[1:19:09] What I actually love is two people doing two things in parallel.

[1:19:13] Because you have enough work that you're mostly doing the work.

[1:19:18] Because when one thing is blocked, you jump to the other thing.

[1:19:21] And then when there's more downtime, you don't go check Twitter or check email

[1:19:27] or multitask or start more work.

[1:19:30] You sit there next in person with the person you're talking to and you engage

[1:19:34] with the problem. You whiteboard.

[1:19:35] You look ahead. You think about what's coming next. You like discuss.

[1:19:39] And I think that's just powerful on its own.

[1:19:42] Layer onto that the fact that you're both going to learn each other's ai tricks

[1:19:46] as you go like oh check out this prompt that i do i think i think that's the

[1:19:51] the answer is you have to try it and you have to try things and Simon Willison is always saying like

[1:19:56] every now and then you should try a thing that ai cannot do you know it you've

[1:19:59] tried it 10 times try it again when a new model comes out have your like personal

[1:20:04] eval that like helps you understand how much better is this model than the last

[1:20:07] time we tried this three months ago.

[1:20:10] So that's part of it. But if you can make a way for those things to merge and

[1:20:14] people to share all their versions of that while doing actual work, then you accelerate it.

[1:20:20] But the short answer is if it's just you, just use it as much as you can and

[1:20:24] pay attention and be thoughtful about what's working and what's not and build that intuition.

[1:20:30] The line to vibe coding and not reading the thing is very blurry right now because

[1:20:35] it can already do so much and you get very easily distracted of like,

[1:20:39] oh yeah, this seems to work fine. I don't need to bother about it.

[1:20:42] But I think as long as you're in this exploration stage and even afterwards,

[1:20:47] the degree just changes.

[1:20:48] But in that exploration stage, I would check,

[1:20:53] obviously every line of code, but also every text that is output,

[1:20:56] every line of thinking, any line of reasoning, anything that is going on to

[1:21:00] build that intuition and understanding. This is how the model operates. This is how...

[1:21:04] This is what I would have expected from the other model that I used last week

[1:21:07] to act here and build that understanding.

[1:21:11] It is so easy to be like, oh, this works.

[1:21:15] That's probably also the biggest concern that I have right now for people coming

[1:21:20] into the industry, being like,

[1:21:24] I learned software development by going through the motion, or as you said,

[1:21:27] pairing with a senior who taught me the tricks and I adapted them.

[1:21:32] One one more thing of like how do you learn software engineering is you read

[1:21:35] the code of really good software engineers yes when i was when i was stuck on

[1:21:40] a problem and i had to chew on it

[1:21:42] i would we used all these google libraries from like the guava library is this

[1:21:46] java library from google it's like really good collection and stuff and so when

[1:21:49] i was like stuck on a problem and i didn't want to think about it

[1:21:51] i would just click into the methods in the libraries and i would read oh here's

[1:21:55] how google writes their code oh here's how meta writes their code like reading

[1:21:58] other people's really good code.

[1:22:00] And there's not really a version of that for AI. You can't just go read Simon

[1:22:04] Willison's Claude traces.

[1:22:06] My concern is even more that from a junior perspective, the AI takes that role

[1:22:11] of the senior engineer kind of and like shape. But like realistically,

[1:22:16] if you don't steer AI properly, it just puts out garbage.

[1:22:20] So the only thing that you're creating is like a multiplier of garbage.

[1:22:25] Yes. Slop cannons, we call them.

[1:22:27] And that's what I'm really concerned about coming into the industry right now.

[1:22:32] Just to be clear, I'm not saying software engineering is going away.

[1:22:34] I don't think this at all. I'd rather think we're just going through a phase

[1:22:39] where companies are making questionable decisions. I think probably software

[1:22:43] engineering is super valuable right now.

[1:22:45] But how this coming into the industry how do we build now how do we ramp up

[1:22:50] juniors to build these necessary skills i have absolutely no idea and i would love to figure this out.

[1:22:57] Yeah i don't have an answer for you um

[1:23:00] Our current take in hiring is we would much rather hire someone with really

[1:23:07] good software engineering, fundamental systems, distributed systems,

[1:23:10] that's much harder to teach and, like, help them get really good at using AI

[1:23:15] than, I think you can get really good at using AI in a couple months.

[1:23:18] Or you can get to, like, 99th percentile. If you're thoughtful about it and

[1:23:22] you're consuming a lot of content, you're watching other people work and you're

[1:23:25] learning from people who know how to do it well, you can learn it in a couple months.

[1:23:28] You cannot get a cs undergrad degree in three months unless you're like a super

[1:23:32] genius i that's not an answer to your question no really really hard

[1:23:36] It's interesting because from that perspective i think mid-level and senior engineer,

[1:23:41] got to some extent more valuable for a company because they have that force multiplier now,

[1:23:46] and there's a perception issue because junior engineers are going to be perceived

[1:23:51] as more productive in a codebase because they can ship features but they're

[1:23:54] fundamentally lacking that understanding what they ship and then it's a matter

[1:23:58] of diligence to really be like,

[1:24:00] have that learning cycle so i i don't know i don't i wouldn't want to be in that position.

[1:24:06] Yeah i want one one way i frame this sometimes is like as as as leaders the

[1:24:11] the old like good pr review versus bad pr review was like the bad pr review was, this is wrong.

[1:24:20] Here's a code snippet on how I want it to look.

[1:24:23] The good PR review was, well, this isn't quite right. Can you go find how we

[1:24:26] do it over here and do it that way?

[1:24:29] The problem is that PR comment used to be good before AI because it made the

[1:24:34] person think and understand and transform the patterns and really learn how

[1:24:38] both parts of the codebase work and learn, okay, the next time I do this,

[1:24:41] I'm going to do it this way.

[1:24:43] But now if I put that comment on your PR, you're just going to paste it into

[1:24:45] Claude and Claude's going to do it for you and And you're not going to have to learn.

[1:24:48] And so I've seen Mitchell Hashimoto on comment threads on on Ghostty basically

[1:24:53] say, like, go ask Claude why this is wrong. It's not here's the here's where

[1:24:58] to look or here's what I would like it to look like. It's just like this is

[1:25:01] wrong. Go figure out why.

[1:25:03] And that's, and our challenge as like mentors and senior engineers and coaches

[1:25:08] and managers is now we have two jobs.

[1:25:10] We don't just have to teach people software engineering fundamentals and good program design.

[1:25:16] We also have to teach people good AI usage. And the two things are almost can

[1:25:20] like feel in conflict sometimes.

[1:25:21] Yeah, see what you're saying.

[1:25:23] And I don't know. I don't know how you develop that instinct for like,

[1:25:26] hey, this, this, this function has 40 variables. That's too many.

[1:25:29] I mean, you can enforce some of this with linters, but a lot of it, you can't.

[1:25:32] Have we struggled with like expressing code quality and metrics and stuff for,

[1:25:37] ever no one has really figured it out.

[1:25:40] For 30 years

[1:25:41] Yeah i absolutely i'm the biggest fan of linters you if you can express something

[1:25:45] as a linter you absolutely should even more so now because then agents can fix

[1:25:49] it themselves yes but at the same time some things are just well this worked

[1:25:53] bad in the past let's not do this again.

[1:25:56] If your plan yeah i mean the only the only way to learn that this is really

[1:25:59] bad is you were stuck at 3 a.m.

[1:26:01] Debugging it because a pager went off and somebody it's like oh my god why did

[1:26:05] we do it this way i'm never doing

[1:26:06] this way again i'm never letting anyone else do it this way again etc

[1:26:10] we used to have this like wall we had a mono repo at my first job at sprout

[1:26:14] social in chicago and there was a there was a like a note on the wall in the

[1:26:18] in the repo README this was Bitbucket we didn't we weren't even on GitHub back then we had

[1:26:22] mercurial we were like hipster vcs or whatever in uh

[1:26:26] 2013 2014 i had this list of rules and one of the rules was like when you're

[1:26:31] reviewing a pr you have to ask all these questions and one of them is like would

[1:26:35] you want to review would you want to debug this code at two in the morning

[1:26:39] and like an agent just can't decide that because at the end of the day like

[1:26:43] there will be problems that an

[1:26:44] agent can't solve and then a human's gonna have to deal with it and like

[1:26:51] It's hard to know unless you've had that pain before.

[1:26:55] The amount of conversation that I had with people on Twitter where I'm like,

[1:27:00] if you open a PR before someone else sees it, you should look through it yourself.

[1:27:05] And people were like devastated by that is mind blowing to me.

[1:27:10] That's crazy.

[1:27:11] The audacity that you say, oh, I don't bother reading my own code or the code, but I expect you.

[1:27:17] But I'm going to ask someone else to spend an hour reading it.

[1:27:19] Yeah, I'm still shocked by it.

[1:27:23] To me, to some extent, this goes kind of in my mentality when you're late to

[1:27:26] a meeting, you're taking away everyone else's time.

[1:27:31] That is kind of the same mentality. If you're not looking through the code and

[1:27:35] finding the easy things yourself, then you're not respecting everyone else's work properly.

[1:27:40] I have another question for you, and that is going to be somewhat off topic.

[1:27:44] It's not super off topic, but in your Twitter bio, you say you're working on the post-IDE IDE.

[1:27:49] And for various reasons, I have a mutual interest in that. So I would love to

[1:27:53] hear everything you're thinking about that so that I can see that. I'm just kidding.

[1:27:57] Tell me your, because products like that need to have a fundamental vision.

[1:28:02] Tell me your vision for a Human Layer.

[1:28:06] The fundamental vision is basically that like the text pane should not be the

[1:28:12] primary editor experience. And we've been doing this for a year ago.

[1:28:15] I think Cursor 3 just did this too. It's like, you should have to work really

[1:28:18] hard to find where the file browser. I still haven't found it.

[1:28:22] I have a Cursor set as my editor for editing markdown files,

[1:28:25] and I had to change it to Zed because I'm like, I can't find the file editor.

[1:28:29] And I spent about two minutes. I spent two minutes. I was like, this is annoying.

[1:28:32] I need to edit a file. I'm quitting this and switching to Zed because that still

[1:28:35] opens a freaking text pane.

[1:28:36] But the primary interaction with the codebase is not going to be through files.

[1:28:44] You're still going to want to see files. You're still going to want to read

[1:28:46] diffs. You still might want to open code and edit it by hand.

[1:28:49] But what would happen if that was a, the same way that agents were bolted on

[1:28:54] to the IDEs of the pass in a sidebar, what if the agent experience was primary and

[1:29:01] The file interaction experience was kind of secondary or tertiary?

[1:29:05] And so build an app from the ground up for managing agents.

[1:29:09] And then the bigger piece is like everything should be collaborative.

[1:29:13] It shouldn't matter where the code is. It shouldn't matter where the agent is

[1:29:16] running. And it shouldn't matter like basically...

[1:29:20] We have these like, even the modern super agile SDLC is very waterfall.

[1:29:25] It's like, okay, we plan the thing. The ticket is ready.

[1:29:27] Someone goes and builds it for two hours or two days. And then we review what they did.

[1:29:32] And that's very discreet. And our thesis is like, that should all be spread

[1:29:36] out and continuous. I posted something yesterday. I was like,

[1:29:39] hey, should we kill the PR? I want to kill the pull request.

[1:29:42] I don't want people to stop reviewing code. I want it to be more continuous.

[1:29:45] And as the thing is being written, as the steps are there, the earlier you can

[1:29:49] get in the more you can shift left on sharing understanding of what's happening

[1:29:54] at the plan level at the design level at the code level the uh

[1:30:00] you're gonna have advantages i think it's it's the more you the more you remove

[1:30:05] synchronization points and the more you make it async but fluid and anyone can

[1:30:09] come and see what your agent is doing at any point you can

[1:30:14] And that, like, it should feel like Slack. Like, the thing that made Slack better

[1:30:18] than email was that everything happened in channels.

[1:30:21] And so even if you weren't in a conversation, it was happening and you could

[1:30:25] see it and you could see discussions that were happening.

[1:30:28] And so it's, like, this idea of, like, how do we help development work be more

[1:30:32] in the open and not stuck on somebody's workstation or even their remote dev box?

[1:30:36] How do we make working on code feel more like, I hate Slack,

[1:30:40] it's chaos. But like they did get this like sharing of information and like

[1:30:45] basically the sound of the woods at night. You have all these channels lighting

[1:30:48] up and kind of check on what's happening. You can decide to ignore it.

[1:30:50] But how do we basically put that in everybody's view?

[1:30:54] So when you're not working on your thing, you kind of see what else is happening

[1:30:57] and you can pull context in before the, whether it's a 20 line pull request

[1:31:01] or a 2000 line pull request.

[1:31:03] When you know what other people on your team are doing and you can see it and

[1:31:06] you can jump in and you say like, oh, I'm working on this over here and here's

[1:31:08] my thing and here's a link to my session and my diff where I'm solving this like this.

[1:31:14] I think it's the future. And so there's a lot of infrastructure.

[1:31:17] There's a lot of cloud and streaming and sync and all these like modern like

[1:31:21] database concepts. Yeah.

[1:31:23] Okay, so you're basically,

[1:31:29] the, I don't mean this in any dismissive way, but so therefore the IDE is more

[1:31:32] of a visualization layer over these information that you're having from your perspective.

[1:31:37] Yeah. Kind of like a command center pulling all the strings together.

[1:31:40] Yeah, and the core things are like, you have artifacts, which are like docs

[1:31:45] meant for humans, plans, designs, etc.

[1:31:48] You have agent sessions, which are like, kind of just like traces.

[1:31:51] You have like some grouping and organization projects, tasks that group those two things.

[1:31:57] And then you have like streaming code diffs of every time an agent makes a change, that's a data point.

[1:32:02] And then how do you create a good interface to do, to explore and understand

[1:32:07] all of that happening in real time across everybody in your team?

[1:32:11] For the IntelliJ codebase, we have, I think right now, the last time I checked,

[1:32:16] roughly 500 committers in the Mono repository.

[1:32:21] Don't you think that would create like a shit ton of noise so if i um if i not

[1:32:26] if i look at my Slack just in the matter of this conversation that we recorded

[1:32:30] here i have like 20 messages pop up on my left side.

[1:32:34] Yeah i mean organizing that this is the google mission right it's like how do

[1:32:37] you take all that that that information and organize it and make it useful

[1:32:41] and how do i scope to just my team how can we use ai to kind of like instead

[1:32:46] of i have to go check a big inbox and decide what's worth looking at,

[1:32:50] something more generative can tell me, hey, okay, cool, you're working over

[1:32:55] here just so you know that person's working over there. You might want to take a look.

[1:32:58] Maybe not the single source. At least most companies I know have also all data docs and stuff.

[1:33:03] If you move further away, how

[1:33:05] do you tackle building an understanding of architecture, decisions made,

[1:33:13] patterns that live throughout the codebase? How do you visualize that?

[1:33:17] Because I fundamentally agree with you that we're, and we've seen this,

[1:33:20] that we're very much moving away from this code writing experience more towards

[1:33:24] a code reading experience.

[1:33:27] Most companies, including us, haven't focused as much on code reading so far,

[1:33:31] because the code writing was the painful part.

[1:33:35] Not painful, but the time-consuming part for most people. And that just more or less solved itself.

[1:33:44] So now there's still this problem, okay, how do we build understanding?

[1:33:48] Particularly for people that join a project that is running for a couple of years.

[1:33:52] Like the the things with agent are super easy if you start on a greenfield project everything is,

[1:33:59] green and there's nothing there so you just start you you maybe have like an

[1:34:03] agents mb that say hey block every decision here in this architecture decision record,

[1:34:08] um you can be very diligent about documentation yada yada yada i have not seen

[1:34:14] a codebase in my 15 years of experience that is has all these information.

[1:34:19] So how do you build that understanding when the code reading or the code itself

[1:34:25] is a secondary artifact?

[1:34:26] I'll zoom out a little bit. I think Guillermo Rauch said something about this,

[1:34:30] which is like coding is different than shipping.

[1:34:33] Like coding is writing the actual code shipping is

[1:34:37] testing it deploying it like monitoring it fixing it take talking to users like

[1:34:42] shipping is like this whole big equation and this is

[1:34:46] like part of the software factor how do we get it so the models can ship not

[1:34:49] just code and they can read support tickets and go change stuff and they can

[1:34:53] read Sentry crashes and they can go change stuff and like continue evolving

[1:34:57] it um but basically the way i said it is like

[1:34:59] i don't think of it as like reading code versus writing code.

[1:35:02] I think the software engineer's job has evolved to write working code,

[1:35:08] uh, to produce working code.

[1:35:11] And so whether you write it by hand, whether the model writes it,

[1:35:15] however you test it, however you vet it, however you get it,

[1:35:17] like vetted by users, whatever it is, is like yours job is still to produce good software.

[1:35:23] Um, and so I, uh, I think the, the answer to your question of like,

[1:35:29] how do people onboard into it and like what there's so much truth beyond the docs and stuff is like

[1:35:35] Yes there is there is ways to take all these data points get diffs the current

[1:35:41] codebase agentic traces documents human comments on documents human comments on agentic traces

[1:35:49] and distill that into various levels of uh of of abstract things like okay the

[1:35:55] very high level one your CLAUDE.md or whatever it is is just like here's what

[1:35:58] this is and how it works the very basic is like

[1:36:00] cool that's not going to change that much and then you have layers of like the

[1:36:03] low the more detailed you get the more churn you're going to have and so you

[1:36:06] kind of like there's this like

[1:36:08] optimization problem of like how often are you streaming this like base set

[1:36:13] of data points into these views on the data and how often do those views need

[1:36:17] to be updated interesting okay

[1:36:20] So I don't know.

[1:36:21] We're getting into the weird part, I guess.

[1:36:23] No, I'm very interested in that because, I mean, we talked about this a lot,

[1:36:29] that the way that software developers work is changing and the tools are a fundamental part of that.

[1:36:34] So most people, from my perspective, are mostly just looking at like,

[1:36:38] okay, I use, I can now use a terminal and problem solved.

[1:36:43] This takes us to a whole nother level. So that's why I'm kind of excited to

[1:36:46] see what you're building there.

[1:36:48] Yeah.

[1:36:50] Last question for you. How or what tip would you give someone who's working

[1:36:55] for 20 years at the same company, maybe is still,

[1:36:59] right, like the level of like how they're educating building skills is much

[1:37:04] slower than the people that are like on Twitter every day.

[1:37:07] What is the single advice you would give this like very traditional engineer right now?

[1:37:14] Three things. One, find ways to use it as much as possible.

[1:37:19] Even if you throw out what you did, learn where the boundaries are,

[1:37:22] you will eventually be surprised of like, oh, this thing I used to hate doing it now can do.

[1:37:27] And like, so like build that intuition just by using AI as much as you can.

[1:37:31] Number two, find people that you respect that are three to six months ahead

[1:37:37] of you and talk to them as much as you can.

[1:37:39] I mean, I got pulled forward from where I was 18 months ago pretty quickly by

[1:37:44] being in like two very special group chats on special to me.

[1:37:49] They're just group chats where people bullshit about AI all day.

[1:37:52] But it's like find find a community that feels more people are way more willing

[1:37:56] to share their stuff in private.

[1:37:58] Everything you see posted on the TL, there's like 90 percent of it is like hype and slop and stuff.

[1:38:02] So like find a small group of like three to

[1:38:06] thirty to maybe a hundred people that you respect and trust and talk to them

[1:38:11] you know talk to your peers who are in the same space and

[1:38:14] find people who are a little bit ahead uh and talk about what really works with

[1:38:18] them um and i think private works better because people are more willing to share their secrets

[1:38:22] and then number three is uh

[1:38:26] I hate to say this, but like figure out the loops thing.

[1:38:30] Start trying to engineer like small loops into your system, like learn back pressure.

[1:38:35] Basically, that's the number one thing is like figure out how you can make it

[1:38:39] as easy as possible for the model to check its own work. That's the only way

[1:38:43] that you can leave things unattended for longer and actually get good results.

[1:38:47] Thank you so much for joining me twice for this. I've I had a great time talking

[1:38:50] to you. I very much appreciate you taking the time for this.

[1:38:53] Thank you so much. This is super fun, dude. I think you we have this

[1:38:59] there's like yeah it's almost like find people who are as skeptical as you are

[1:39:02] or live in the same like skepticism circle because it's a lot more fun because

[1:39:07] you all we all see the same problems in the world

[1:39:09] Awesome thank you so much and see you next time.

[1:39:11] Yeah and this was great thank you