---
type: youtube
url: https://www.youtube.com/watch?v=VrpEyglYgeU
title: "In the Land of AI Agents, the Verifiers Are King — Tariq Shaukat, Sonar"
channel: AI Engineer
date_saved: 2026-07-27T23:32:52.711Z
---

# In the Land of AI Agents, the Verifiers Are King — Tariq Shaukat, Sonar

[0:01] [music]

[0:12] Please join me in welcoming the chief

[0:14] executive officer at Sonar, Tariq Sha.

[0:19] [music]

[0:27] [music]

[0:34] Morning everyone. Did you enjoy that

[0:37] last talk? That was amazing. Um, you

[0:40] particularly love the end the being

[0:41] unreasonable part. I thought that was

[0:43] awesome. Um, I also want to just I'm

[0:46] trying to calculate the odds of t

[0:48] following tar as the first two sessions

[0:50] in the morning. Uh, I think the odds are

[0:52] pretty low on this one, but uh, thrilled

[0:55] to be here today. Um, as as we just

[0:57] mentioned, I am with Sonar. We are in

[1:00] the code verification space and I'm here

[1:02] today to talk about verification. And I

[1:05] think we're all here uh in large part

[1:07] because we believe to some extent that

[1:10] AGI is here. It's coming. The models we

[1:13] just heard about Fable. It's really

[1:15] incredible what is going on in the world

[1:18] today. And yet we work almost

[1:20] exclusively with enterprises around the

[1:22] world. And the conversation that we have

[1:25] more is the question mark version. Is

[1:27] AGI here? And why are they asking these

[1:30] questions? It's because you can read the

[1:33] news every day. And I'm not trying to

[1:36] name and shame here, but if you look at

[1:38] KPMG putting out reports that they have

[1:41] to uh retract because of hallucinations,

[1:46] uh EY doing the same thing, law firms

[1:49] getting into lots and lots of trouble

[1:51] because of madeup citations, madeup case

[1:55] law, things like this. I think we can

[1:57] really start to question how do we get

[1:59] value out of AI? The models are amazing

[2:02] as we just heard, but the hard part as

[2:05] the other target just said is getting

[2:07] value out of it.

[2:09] The struggle is that AI slop is

[2:13] everywhere. I'm sure you all see this

[2:15] inside of your organizations. I'm sure

[2:16] you see this in your everyday life. That

[2:20] AI is amazing. The models are incredible

[2:22] at generating very plausible output.

[2:25] They're incredible at generating things

[2:27] that sound correct. But are they

[2:29] correct? And how do you know that

[2:31] they're correct is a big problem. And

[2:33] it's a big problem in professional

[2:35] services as we saw. It's a big problem

[2:37] in legal. But really, I think if we're

[2:39] honest, it's it's a big problem in every

[2:41] sector, in every field, whether it's

[2:44] marketing or finance or you name it. You

[2:47] have this question of how do you

[2:48] actually know if it's true? How do you

[2:50] know if it's good or if it is slop? And

[2:53] the question that we we deal in the

[2:56] coding space in particular, we deal with

[2:58] software development. And the question

[3:00] we get as we talk to I'm sure many of

[3:02] the people here in the room and a lot of

[3:04] our customers is, isn't software

[3:07] development different?

[3:09] And we can look at the data on this and

[3:13] uh the mythos models. Um this is data

[3:16] from um meter. Uh you may have seen this

[3:19] mer. Um the coding agents are getting

[3:21] better uh very quickly. They're getting

[3:24] a lot better very quickly. And you can

[3:26] see uh the progression, the exponential

[3:28] curve here. What this shows on this

[3:30] chart is how capable are the models at

[3:33] completing tasks that humans would take.

[3:36] So can they complete a task that takes 1

[3:38] hour, 2 hours, whatever it is. the

[3:40] latest Mythos model, at least per the

[3:42] benchmarking which was done a month or

[3:44] so ago in the preview mode was you're

[3:47] getting to 16 to 18 hours. So they're

[3:50] actually able the agents are able to

[3:52] complete longunning tasks and it really

[3:55] is starting to transform how work is

[3:58] happening. But the critical caveat when

[4:01] you read the data is this is at a 50%

[4:03] success rate. Okay. So it is again able

[4:07] to complete tasks but is it able to

[4:09] complete tasks correctly is the

[4:12] question. So if you start looking at

[4:14] let's dial up the accuracy rate you dial

[4:18] it up to 80%. And there's still progress

[4:20] but it is much slower progress. Instead

[4:23] of 18 hours you're at about 3 and a half

[4:25] hours or something along these lines.

[4:27] And by the way this is still at 80%

[4:31] accuracy. And as I was presenting this

[4:32] to the CTO of one of my uh large

[4:34] customers, his response was, "Butic, I

[4:37] would still put someone who gave me 80%

[4:40] accurate information on a performance

[4:42] review probably, right? This isn't

[4:44] necessarily enterprise grade. The

[4:47] problem is that the models themselves,

[4:51] and full disclosure, we have not yet uh

[4:53] done this benchmarking on the Fable

[4:56] models obviously because they are just

[4:58] being released. But as you look at the

[5:00] models, the models are getting smarter,

[5:02] but they still produce a lot of problem

[5:05] problematic code. This is benchmarking

[5:08] that we do. We give the models a series

[5:11] of over 4,000 problems and we basically

[5:14] ask it to generate the response to the

[5:16] problems and then we analyze both the

[5:18] functional correctness which is critical

[5:20] and they all do extremely well on this

[5:23] notion of functional correctness, right?

[5:25] Um, but then we look at how complex is

[5:27] the code, how buggy is the code, how

[5:30] secure is the code. And what you see

[5:33] with even the state-of-the-art models is

[5:35] that complexity is still high. It's

[5:37] actually quite variable as you can see

[5:39] here. Um, GPT55 has done particularly

[5:42] well on the complexity side of things.

[5:44] It still generates bugs. It doesn't

[5:46] generate massive amounts of bugs, but it

[5:49] still generates bugs and it still

[5:51] generates security issues. So this is

[5:54] the output of the models that are going

[5:56] into the agentic workflows. And again,

[6:00] this is not, you know, I'm at the AI

[6:02] engineer conference. This is not me

[6:03] saying AI is fake or or um incorrect,

[6:07] but it is um trying to address this

[6:11] question of how do you really get value

[6:14] in a production setting out of AI? This

[6:17] is a study that was done in Carnegie

[6:20] Melon uh University and it looked at

[6:23] what is the actual productivity benefit

[6:26] that you see from the use of AI coding

[6:29] agents. And what you see I think really

[6:31] resonates with a lot of what I see

[6:34] firsthand in the market which is you

[6:36] have a initial just amazing boost of

[6:41] productivity of velocity in particular.

[6:44] what you see is a three to 5x boost in

[6:46] productivity or in in velocity. Um that

[6:50] dissipates in three months. At the end

[6:52] of three months, it starts to come back

[6:54] to the the normal before you were using

[6:57] the agents. And if you ask why, it is

[7:00] because of the two pieces in red here

[7:01] that you start to see there's an

[7:03] increase in velocity, but there's an

[7:06] increase in security issues, there's an

[7:08] increase in maintainability issues,

[7:10] there's an increase in reliability

[7:13] issues, and there's an increase in

[7:14] complexity. So essentially, you're

[7:16] building the technical debt as quickly

[7:19] as you are generating the code or maybe

[7:22] even more quickly. And that creates a

[7:24] different set of work. it creates a

[7:25] different bottleneck. And so to us, this

[7:29] is now the critical question in AI,

[7:34] which is in a world in which code is

[7:36] provable. And there's sessions that um

[7:39] I'm actually very much looking forward

[7:41] to attending about formal methods and

[7:43] proofs and things like this, code is

[7:45] provable, but when you start dealing

[7:47] with large code bases, software is not.

[7:49] It's still very complex. It is still

[7:51] very messy. there's lots of um

[7:54] dependencies. There's lots of uh

[7:56] technical debt already in most code

[7:58] bases. And so this question of

[8:01] verification

[8:02] is actually key. And what I'm going to

[8:04] be arguing is that you can treat

[8:07] verification as an afterthought or you

[8:09] can bake verification into the process.

[8:12] And if you bake it into the process of

[8:14] generating code, of doing software

[8:16] development, you can actually start to

[8:18] get materially better outcomes from the

[8:21] coding agents than if you view it as an

[8:23] afterthought. If you view it as just the

[8:25] old school code review.

[8:28] So as we've been thinking through this,

[8:30] we basically have constructed a

[8:32] framework and there's lots of competing

[8:33] frameworks around this, but I'll just

[8:35] talk you through uh ours. We call it the

[8:37] agent centric development cycle. for

[8:40] shortand we call it AC/DC sometimes and

[8:42] the idea here is how do you get

[8:44] verification powered to Gentic loops at

[8:47] the center there's a lot of focus on the

[8:50] code generation piece like how do you

[8:52] actually get the models and the agents

[8:54] to generate the code that you need to

[8:57] solve the problem and what we argue is

[8:59] that you should surround this with the

[9:03] right disciplines the right tools the

[9:05] right processes to do three things to

[9:07] guide the agents and t is talking a lot

[9:10] about different aspects of this

[9:11] actually. Guide the agents, verify the

[9:14] outcomes and then solve the problems.

[9:16] And you have to make this part of the

[9:19] discipline, part of the process, part of

[9:21] the new software development life cycle

[9:23] if you want to be successful in the AI

[9:26] world. So if I double click on some of

[9:29] these pieces, what do we mean by guide?

[9:31] We've done a lot of experimenting around

[9:33] guide. We've just launched a product um

[9:36] yesterday I think called sonar vortex

[9:38] that starts to get into this area. What

[9:40] we find is critically important is to

[9:42] think about guide as context and

[9:45] constraints and we separate out context

[9:47] and constraints very deliberately

[9:50] because context is you have your code

[9:52] repositories. How do we make it easier

[9:54] for the agents to understand for the

[9:56] models to understand what is in your

[9:59] codebase? If you have a million lines of

[10:02] code, if you have a hundred million

[10:03] lines of code, you have a billion lines

[10:05] of code, the agents work better if they

[10:07] understand your codebase. So, how do you

[10:08] give it architectural awareness? How do

[10:10] you provide uh semantic navigation uh

[10:13] maps um and uh and help them understand

[10:16] the territory to borrow what Tar was

[10:18] just talking about and we find it

[10:20] equally valuable and I don't think this

[10:22] part is talked enough about to provide

[10:25] the constraints as well. You have

[10:28] guidelines that you want your code to

[10:31] follow. You have dependencies you are

[10:33] okay using. You have dependencies that

[10:36] you are not okay having. You have coding

[10:38] standards. You have guardrails. You have

[10:40] intended architecture. We spend a lot of

[10:42] time talking about existing

[10:43] architecture. But what about where you

[10:45] want to go? And so this idea of context

[10:48] and constraints uh we've found in our

[10:51] testing generates a massive improvement

[10:55] in agent effectiveness and a massive uh

[10:57] improvement in token consumption o over

[11:01] 30% reduction in tokens being used to

[11:04] solve a given problem. And and if you

[11:06] ask why it's because you're actually

[11:08] making the life of the agent easier.

[11:10] You're helping it navigate better.

[11:13] So then we get into the heart of this

[11:14] and we really think of guide as

[11:16] preemptive verification. How do you make

[11:18] sure there's less to verify, less to

[11:20] fix, this sort of thing. Then you get to

[11:22] the heart of verification and what we

[11:25] believe quite strongly and what we've

[11:27] seen work in practice is this idea of

[11:30] zero trust multi-layered verification.

[11:33] Zero trust. Every model has biases.

[11:36] Every model produces has a character has

[11:38] a personality. So, let's make sure we

[11:40] use different models and different

[11:41] techniques to make sure your code is

[11:43] safe, to make sure it's reliable, to

[11:45] make sure it's secure. And multi-layered

[11:48] really speaks to the earlier point that

[11:51] software is complex. Software is very

[11:54] messy. Software has lots of of of

[11:57] intricacies involved with it. And so

[11:59] what we believe and again have found to

[12:02] be quite um impactful here is that a

[12:06] combination of algorithmic verification

[12:08] looking at things like data flows,

[12:10] control flows, known patterns, secrets,

[12:13] these areas combined with what is now

[12:15] possible with agentic verification

[12:18] looking at intent, business logic, the

[12:20] unknown unknowns. Actually again to

[12:23] borrow from the last uh presentation the

[12:26] fusion of these things the the

[12:28] deliberate multi-layered fabric that you

[12:31] put in place can actually you can see

[12:34] the results of this in production. So as

[12:37] we look at our partners and customers

[12:39] who use a multi-layered verification

[12:42] approach they are reporting AI derived

[12:46] production outages being 44% less

[12:49] frequent than the ones who do not. So

[12:51] you can start seeing a material

[12:52] improvement in reliability, in security

[12:55] and in maintainability.

[12:58] And then the last point I mentioned is

[13:01] technical debt does explode. Right? As

[13:03] you generate code, technical debt is

[13:06] also generated. And again, this is not

[13:09] stop doing it. This is be aware and

[13:12] let's start controlling it. And so what

[13:15] we um have seen be super effective is to

[13:19] have an active process to have an active

[13:22] discipline again around code maintenance

[13:25] and thinking about how you do verified

[13:28] code maintenance. Um I won't walk

[13:30] through every step of this but a the

[13:32] agents whether that is a set of

[13:35] remediation agents whether it's a strong

[13:37] discipline around verification does keep

[13:40] your codebase clean

[13:42] and a lot of people have asked me all

[13:45] right but do agents care about clean

[13:47] code human developers care about clean

[13:49] code do agents care about clean code and

[13:51] what we find again is they absolutely do

[13:54] because the agents have to understand

[13:56] the codebase if they're going to operate

[13:58] on it so this is a oneshot view. Um, we

[14:01] think this is something that compounds.

[14:03] But if you just do the exact same

[14:05] agentic tasks on a typical codebase and

[14:09] then one that has been cleaned, you see

[14:11] a material reduction in the amount of

[14:13] tokens, reasoning, energy, etc. needed

[14:16] for those cleaner uh code bases versus

[14:19] the typical code bases. Right? If you

[14:22] make the life of the of the agent

[14:23] easier, if you maintain your codebase,

[14:26] then you'll actually see compounding

[14:28] effects. Now, the important thing in our

[14:31] mind is to construct the system. This is

[14:34] how I started is saying, you know, I'm

[14:36] sure all of us do code reviews, you may

[14:38] use static analysis tools, you may use

[14:39] AI code uh review tools, a whole range

[14:42] of things. And we believe that you have

[14:45] to put this in a system. And again, uh,

[14:47] we're happy to in our booth downstairs

[14:50] talk through what this looks like, but

[14:52] we really believe that the construction

[14:54] of the software development life cycle

[14:57] in an AI world um, needs to embed this

[15:00] notion of guide, verify, and solve

[15:02] inside of it. And you need to do it in

[15:04] three loops. And you need to think about

[15:06] these three loops. There's the agentic

[15:08] loop, which I think is the key buzzword

[15:10] of the conference. Um now but how do you

[15:12] provide the agents as it's generating

[15:15] the code as it's doing the work with the

[15:17] context and constraints

[15:20] with the inloop verification so that the

[15:22] agent is getting verification as it's

[15:24] working and how do you fix problems

[15:26] that's that's the blue loop here what we

[15:28] what we talk about is the inner loop

[15:30] verification piece. There's a second

[15:33] which is your continuous improvement

[15:34] process and how do you really combine

[15:37] the power of algorithmic and agentic to

[15:41] generate your your pull request review

[15:45] the code and by the way the velocity of

[15:47] this has to go up massively so to review

[15:49] the code using agents and to do this

[15:52] multi-layered verification and then you

[15:55] have your evals and I think the opening

[15:57] speaker talked about how eval may be the

[15:59] buzzword of the um conference you have

[16:02] your EV valves and you have your quality

[16:03] gates to check are you actually passing.

[16:06] So you have your your code maintenance

[16:08] loop, agentic loop, CI verification loop

[16:11] and deliberate design of these loops

[16:15] with verification at the center is a

[16:18] compounding system. It's a system that

[16:21] reinforces itself and it reinforces

[16:23] itself in the positive and it reinforces

[16:25] itself in the negative. And we've seen

[16:28] customers who uh have kind of neglected

[16:32] as they've rolled out AI coding tools,

[16:34] they've neglected verification, they've

[16:36] neglected this idea of code quality, of

[16:39] code um maintenance, things like that,

[16:42] and you get into a downward spiral

[16:44] pretty quickly. This is what the

[16:45] Carnegie Melon uh case study uh or study

[16:48] actually shows is that you actually have

[16:50] all the benefits start to dissipate or

[16:53] you can get into the self-reinforcing

[16:55] loop. And one of the tests we did with

[16:57] one of the large banks who are using

[16:59] some of the cutting edge the folks who

[17:02] are all around here today um cutting

[17:04] edge agentic coding tools they can get a

[17:07] 92%

[17:08] reduction in issues if you actually take

[17:11] this guide verify solve approach inside

[17:14] of those agentic loops. If again this

[17:16] compounds it's not that each loop is 92%

[17:20] better. that as you go through solving

[17:22] the problem over minutes and hours that

[17:25] you actually see a compounding benefits.

[17:29] So that is uh essentially how we see the

[17:33] benefit here. The how we see the

[17:35] controlled um value creating use of AI

[17:40] in enterprise settings and when I say

[17:42] enterprises people with existing code

[17:44] bases people with with you know millions

[17:47] of lines of code already. There's the

[17:49] agentic loop, there's a CI verification

[17:52] loop, there's the code maintenance loop.

[17:55] I'm required by my marketing team to put

[17:57] up a version of this that has our

[17:59] products on here. So these are our

[18:00] products and you can come and see us

[18:01] later. But the most important thing is

[18:04] really to say our recommendation is this

[18:07] agent the AC/DC agentcentric development

[18:09] cycle. The core part is deliberate

[18:12] verification built into the system. So

[18:15] if you'd like to learn more um we have a

[18:17] booth. It's the big red booth

[18:18] downstairs. We'd love to talk more. We

[18:20] have some doubleclick sessions coming

[18:22] up. So, please do uh join those and uh

[18:25] have a great conference. Thank you all.

[18:51] >> [music]
