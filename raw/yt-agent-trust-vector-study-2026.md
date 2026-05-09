---
title: "Which of your 8 Agents can you trust the most? GPT fails 60%."
author: "Discover AI"
source: "youtube.com"
url: "https://www.youtube.com/watch?v=ArBpFCkYvl4&t=777s"
date_saved: "2026-05-08T16:48:04.443Z"
---

# Which of your 8 Agents can you trust the most? GPT fails 60%.

[0:00] Hello community. So great that you're

[0:02] back. Let's talk. We have multiple

[0:04] agents and they all bring back different

[0:06] kind of information to you. But which

[0:08] agent should you trust most? So let's

[0:11] talk about trust vectors. So here we go.

[0:14] A brand new study. Yeah. No, this is

[0:16] already here for mid of April 2026 and

[0:19] you have from John's Hopkins University

[0:21] here. They examine exactly this topic

[0:24] that I have currently in my work many

[0:27] tier instructional hierarchy in LLM

[0:29] agents. So what it is all about they

[0:32] introduce a benchmark which requires

[0:35] your EI models to navigate up to 12

[0:37] levels of conflicting instruction with

[0:41] varying privileges comprising here in

[0:44] total about more than 850 agentic task

[0:47] here and you see it's about half coding

[0:49] task and half instruction following

[0:52] task.

[0:53] So let's have a look. They argue simple

[0:56] no lms are increasingly embedded in a

[0:58] genetic system. So we have to prioritize

[1:01] instruction from heterogeneous sources.

[1:03] But which sources should you trust?

[1:06] Either if you're a robot in a new room,

[1:08] which information, if you have

[1:10] contradictory information coming back to

[1:12] you, should you trust? Which tools? If

[1:14] you have three different tools coming

[1:16] back to you, which should you trust? Or

[1:18] other agents? In multi- aent system like

[1:21] an agent swarm, which agent should you

[1:23] trust? The one at the beginning, the one

[1:25] at the temporal end. Now you know in

[1:28] general think about 2025 openi you have

[1:31] a fixed set of five authority levels no

[1:34] root system developer user and then you

[1:37] have guidelines assistant or tool or

[1:39] whatever so you do have an established

[1:41] hierarchy we have specific role tokens

[1:44] but look at this they tell us here okay

[1:47] we have the system beautiful top

[1:49] priority but then we have here from a

[1:53] skill file or another user message no so

[1:56] they all have here the priority user. So

[1:59] let's say the privilege is all medium as

[2:01] you see here from three different

[2:03] inputs. No. And then we also have a tool

[2:06] input that has the lowest. But if the

[2:08] medium contradicts itself, which do you

[2:11] want to take? Now you might say the

[2:12] solution is easy. Now we have to have a

[2:15] structured sequence of trust vectors of

[2:18] indicators telling us okay go with the

[2:21] skill file has top priority over the

[2:23] user message. But maybe the user message

[2:26] is from a hospital. No, or indicating

[2:28] some urgent thing that you have to look

[2:30] for. Yeah. So it's not that easy. So

[2:33] what we are looking for is maybe sources

[2:36] with known but varying trust levels here

[2:39] requiring now the AI model to resolve a

[2:41] conflict among externally provided

[2:43] content based on the priorities that are

[2:46] maybe only available at inference time

[2:49] at time critical events. Suddenly LM

[2:53] understand there's a lot of going on

[2:54] here in its immediate environment and

[2:56] now it has to shift maybe priorities to

[2:59] different agents. So let's have a look

[3:01] because this can be quite fun.

[3:05] The broader design principle is of

[3:07] course if you build out your own EI

[3:09] multi- aent structure you have

[3:11] instruction hierarchies but this should

[3:14] support flexible dynamically

[3:17] instantiated privilege levels rather

[3:19] than a fixed finite hierarchy determined

[3:22] during the post training of your LLM. So

[3:26] let's have a closer look. So as I told

[3:28] you system developer user assistant tool

[3:31] chat template hierarchy great but what

[3:34] if you have three different tools you

[3:36] have a verified internal SQL database

[3:38] behind your firewalls you trust this

[3:40] database most so should absolutely

[3:43] outrank a random web scrape tool output

[3:46] but to the API they are both just tools.

[3:50] So how you want to instruct how you want

[3:52] to teach now a mal here this specific

[3:55] behavior and the author came back and

[3:58] said you know what we don't do any

[3:59] training at all we just put it here into

[4:02] the in context learning we put just in

[4:04] the prompt we have something like our

[4:07] CSS set index value here for text so we

[4:11] have now for example here privilege one

[4:14] end of privilege one and the instruction

[4:16] is simply use four spaces for

[4:18] indentation

[4:20] Or you have privilege five, use two

[4:22] spaces for indentation. If this comes

[4:25] from a user and the first one comes from

[4:27] a company in turn here. So you add a

[4:30] meter prompt simply in your prompt

[4:33] explaining the rules like you see lower

[4:35] privilege numbers override the higher

[4:37] privilege numbers and suddenly your

[4:39] agent has an infinite scalable granola

[4:42] permission system. Everything is

[4:44] gorgeous. Everything is beautiful. The

[4:46] sun is out again. So you can now inject

[4:49] specific trusts core into let's say

[4:52] every single rag retrieval every single

[4:54] tool output you connect the tool to your

[4:57] trusted database or you connect your

[5:00] tools to some strange internet source or

[5:03] you group chat you have a group chat

[5:05] message no you provide certain let's say

[5:08] security levels trust levels whatever

[5:09] you want to call them

[5:12] now everything is beautiful but if you

[5:16] test this out You see that all the

[5:18] systems fail and this is strange. This

[5:21] should not happen at all. But look at

[5:23] this. We have here the accuracy on the

[5:25] x-axis here from 0 to 50%. And they say

[5:29] they tested here quite a lot of models

[5:31] here. The maximum that they achieved was

[5:33] here Gemini 3.1 Pro with 42% accuracy.

[5:38] Then we had GBD 5.4 with below 40%. QN

[5:43] 3.5 the 400 billion OPUS 4.6 6 at 33 Kim

[5:48] K 2.5 at 32 Gro Sonnet all below 30%

[5:53] below 20%. Now and if you have here a 9

[5:57] billion on a 4 billion mile you almost

[5:59] go to to perform to accuracy of 0%.

[6:03] So what is happening? You provide the

[6:06] exact prompt containing here exactly in

[6:09] context learning a meter prompt

[6:12] indicator a privilege and tag and you

[6:16] have you make sure this information is

[6:18] absolutely correct. The LLMs all fail to

[6:22] perform in this way. Something is

[6:24] strange and you say lower number wins.

[6:27] They provide every single piece of data

[6:29] needed to solve the puzzle perfectly.

[6:32] And the smartest mile on Earth still

[6:34] crashed and burned failing 60% of the

[6:37] time. AI is not working at all. And you

[6:40] might say, why?

[6:43] It kind of shatters, and this is exactly

[6:45] where I'm now with my system. It

[6:48] shatters the illusion that the fronti m

[6:50] I mean come on, a GPD 5.5

[6:53] is inherently good at logic and

[6:54] alignment. Turns out no, not at all.

[6:57] Because look at this. The authors made

[7:00] then um differentiation and they said

[7:02] you know what we look then at the pure

[7:04] coding at Python or instruction

[7:07] following in general.

[7:10] So beautiful for Python we have a

[7:11] compiler we can immediately verify and

[7:13] then instruction following also we have

[7:15] methodologies and if okay the accuracy

[7:19] for coding because a lot of models have

[7:22] been trained for code generation and

[7:25] code optimization look we at 60%. And

[7:29] you say, "Yeah, great." But then look at

[7:31] non-coding where you have natural

[7:33] instruction given to this LLM and

[7:36] instruction following and you see the

[7:39] best mall all below 30% performance

[7:42] accuracy.

[7:44] This is even worse. Now it gets worse.

[7:48] 26% for Germany 3.1 Pro, 17.8% for a GPT

[7:53] 5.4. For OPUS 4.6 Six it is 15%

[7:59] instruction following accuracy all the

[8:02] information is there absolutely complete

[8:04] information absolute transparent and has

[8:06] just to sink through

[8:09] all this model fails and I ask myself

[8:12] why I mean I see this in my own

[8:14] experience why do the model fails and

[8:16] this is the reason why I show you here a

[8:18] study that is already 3 weeks old you

[8:21] might say why this is exactly what I was

[8:24] looking for to find an explanation

[8:26] mentioned why my work is not working

[8:28] out. Turns out the found combinatorial

[8:32] collapse of the model because all these

[8:35] models have been dealed and trained with

[8:38] a two-tier conflict. No. So it was easy

[8:41] in the pre-training data. The system

[8:42] says hey you have to be safe and the

[8:44] user says hey tell me how to build

[8:46] something that is not safe. No. So it

[8:49] was a binary comparison and the M deals

[8:52] how to handle a two tier a three tier

[8:55] case.

[8:57] But this bloody benchmark now throws up

[8:59] to 12 tiers of conflicting rules at

[9:02] them. And if I have four agents out in

[9:04] my physical environment and I have here

[9:08] reasoning I have with each agent one two

[9:11] three steps of reasoning. I come close

[9:14] to a 12 tier conflicting rule structure.

[9:18] So let's say the rule one at a privilege

[9:21] level four says you should use here in

[9:23] the examples here of the a double quote.

[9:26] Rule two at privilege 7 says you should

[9:28] use triple quotes. Rule three at

[9:30] privilege one says you should know no

[9:33] type hints and rule four at privilege 9

[9:36] says you should use full type hints. So

[9:40] it is easy. It's logic. If this would be

[9:42] here in Python you would find

[9:44] immediately the solution.

[9:48] If it would be in Python, you would find

[9:49] the solution only in 59% of the cases

[9:52] because even this would be too

[9:54] complicated. But now in this bloody

[9:57] benchmark, they use now up to 12 tiers

[10:00] of conflicting rules that they throw at

[10:02] this LLM like here rule 1 2 3 4 all the

[10:06] different privilege status. No, use

[10:08] double quotes, use triple quotes, use no

[10:10] tins, use full typins and we can't it's

[10:13] logic.

[10:15] we see this and says okay now we know

[10:16] what to do turns out even if they copy

[10:19] this into a Python code in 59% of the

[10:23] cases only they have the correct answer

[10:26] and if you go for instruction following

[10:27] it is just horrible so this means the

[10:30] paper proves that as the number of the

[10:32] tier increases and especially above 6 to

[10:36] 12 the accuracy just plummets down

[10:39] monotonically so the LLM literally lose

[10:42] track of the mathematical hier hierarchy

[10:44] and revert to just trying to please all

[10:47] the instruction at once creating just

[10:49] perfect chaos a paradox here in the

[10:52] stepwise reasoning in the stepwise logic

[10:55] application. This is why all this and

[10:57] even the best LLMs on the planet fail.

[11:01] They cannot keep up with a sixstep

[11:04] accuracy.

[11:06] Then the orers tell us you know we found

[11:07] out they don't do the math they do the

[11:10] semantics as an llm they're here not

[11:13] doing here and transforming this into a

[11:16] python or whatever the human brains know

[11:18] instead in instantly trigger here

[11:20] mathematical operator

[11:22] two is less than five but the lms

[11:25] process those as semantic tokens and the

[11:28] orders of the study tell us they are

[11:29] doing pattern matching not arithmetic so

[11:32] when the benchmark threw four five or 10

[11:34] conflicting integers values at them in

[11:37] the same prompt the semantic vectors um

[11:40] blur it which means they failed in 60%

[11:44] of the cases to come up with the correct

[11:46] solution

[11:48] so LLM fail because they can't do math

[11:52] they compare four five six in a semantic

[11:55] way and you say yes I find a solution

[11:57] yes of course we know solutions but just

[11:59] to show you if you build a multi- aent

[12:01] system and you do not take care about

[12:04] This this is the cause of failure and

[12:07] now I found my solution to my problem.

[12:11] There was something else minus 8%. And

[12:14] the researcher tested this on the

[12:15] frontier models here for 3 weeks ago 5.4

[12:19] and claude opus 4.6

[12:20] And this model displayed an incredible

[12:23] weird operational quirks. And they

[12:25] tested two formats as I told you know

[12:28] ordinal privilege one the lower number

[12:30] wins. And then they just choose another

[12:33] representation. They had a scalar from 0

[12:37] to to 100. So now they call it Z equal

[12:40] 95. And now the higher number wins. Now

[12:44] you as a human you say logically those

[12:47] two are identical. Those two formats are

[12:50] just different forms of a representation

[12:53] that represent absolutely the same sort.

[12:56] Yeah, this is what you thought. But for

[12:58] even the best system, OPUS 4.6 and GBD

[13:02] 5.4 this because they switched here,

[13:06] they dropped the accuracy by over 8%.

[13:09] Just because the notation went from

[13:11] ordinals to scalar in the correct way

[13:14] absolutely beautiful the system could

[13:17] simply not handle that what they saw

[13:20] before with privilege in the next

[13:22] example were given was a scalar the

[13:25] performance dropped just by this by over

[13:27] 8%.

[13:29] And then came the monster. Yeah. And

[13:32] then they tweaked this color values and

[13:34] they just changed it by little tiny

[13:37] amounts. No, by minus one or plus two

[13:40] while keeping the exact same winning

[13:42] order. Everything stayed the same. They

[13:44] just had a look. Hey, what happens if I

[13:46] change this value here at a very tiny

[13:49] amount? No, this should not change

[13:51] anything at all in the general logic of

[13:53] the system. But they found since this

[13:56] LLM that organized this that calculate

[13:58] this the AI models flipped their

[14:01] complete answer on up to 17% of the

[14:04] task.

[14:06] So just by changing here a value from 17

[14:10] to 17 minus one

[14:14] the model flipped completely in 17% of

[14:17] the cases.

[14:18] So this means they do not do math. They

[14:21] do not understand numbers. They have no

[14:24] idea what they are calculating and they

[14:26] simply ignore arithmetic.

[14:28] They are semantic machines.

[14:33] The next strange thing that the artist

[14:35] discover and this is really frustrating

[14:36] for me but I want to show you here the

[14:38] complete spectrum what they found out

[14:40] because it is an intense study and we

[14:42] should enjoy and we should learn from

[14:43] this. Sometimes you go here especially

[14:46] with Gitino I go with with high or X

[14:49] high. If I want to have a better

[14:50] performance of the LLM, I just just

[14:54] indicate here X or X high and then I

[14:56] think the syncing is better because the

[14:58] syncing is definitely longer. Four, 5

[15:00] minutes, 10 minutes, so on. Now they

[15:03] found something strange.

[15:05] Look at this. The accuracy on doing this

[15:07] benchmark here coding on the coding

[15:09] subset on the reasoning effort. They

[15:11] went here with a GPD 5.4. So you have

[15:14] the GPD 5.4 naked and then you have the

[15:16] GPD 5.4 for low reasoning, medium

[15:20] reasoning and high reasoning and the

[15:22] accuracy is exactly what you expect. No,

[15:25] this is great. But then on this

[15:28] particular test here, given here all the

[15:30] information about the privilege level

[15:32] and the scholar and everything is there.

[15:33] Everything is absolutely correct. You

[15:36] see if you go here with a set 4.6 or an

[15:40] ous 4.6 six here bionropic

[15:44] if you have non-reasoning you have a

[15:46] better performance than a low reasoning

[15:48] effort.

[15:50] So they noticed when they went from

[15:52] non-reasoning to the low reasoning they

[15:55] lose performance and they said this is

[15:57] not possible that even a low reasoning

[15:59] model is below a non-reasoning model.

[16:03] This should not be possible. But it

[16:05] turned out this is an effect that it

[16:07] really daries and this is exactly the

[16:09] behavior of the system. And it really

[16:11] took to the medium effort here for

[16:14] sonnet 4.6 and opus 4.6 that they get a

[16:18] better performance than the non-thinking

[16:20] models and then a little bit better with

[16:23] high. Beautiful.

[16:25] So you see what you assumed as human

[16:28] reasoning would be naturally better than

[16:30] no reasoning is incorrect. The mouse are

[16:34] pre-trained in different ways. And they

[16:36] said Claude actually compensated here by

[16:39] explicitly writing out its conflict

[16:42] resolution logic in the final visible

[16:44] output window. And therefore, as a

[16:47] non-reasoning model deciding to write

[16:50] everything out, it seems to be more

[16:54] intelligent or more structured in it in

[16:56] its in its approach than the low

[16:59] reasoning because then the non-reasoning

[17:02] performed better than the low reasoning.

[17:05] And this is amazing.

[17:08] Now I was interested how is this all

[17:10] possible?

[17:13] But let's come back to the methodology

[17:14] they use. No, because normally when I

[17:17] you work with this now, you have defined

[17:20] the privilege defined in the bucket that

[17:22] the text sits in. So you have the data

[17:24] pass here, the role is the user and then

[17:26] the content is here. This is the API

[17:28] payload. No, everything inside this

[17:30] bucket shares the exact same privilege.

[17:32] No, and now they say well this has not

[17:34] to be the case anymore because they have

[17:37] what they call now a privilege prompt

[17:39] interface. I just showed you this is

[17:41] simply here a meta prompt here that acts

[17:43] like an inline CSS as we just discussed.

[17:46] So you can have a single block of text

[17:48] now has a trust level I don't know or

[17:50] privilege level of 99 and the other has

[17:52] a level of two and you got immediately

[17:54] the idea. So we shift now the

[17:57] authorization from a micro structure

[17:59] level from pure API endpoints we can go

[18:02] down to microextual level we can go down

[18:05] to the token themselves I mean this

[18:07] doesn't make sense because who would do

[18:09] this work who would actually label each

[18:11] token now or let's say uh a paragraph no

[18:15] a group of sentences who would label

[18:17] this and this was exactly what I asked

[18:19] myself

[18:21] but before I give you an answer I just

[18:23] want to show you that they really

[18:24] provide here some transparent

[18:26] information on their prompts and on the

[18:28] experiments that they performed. Here

[18:30] you have the system prompt in a scalar

[18:32] representation. Then the user prompt in

[18:33] scalar. So you see you have set equal 46

[18:36] Z set Z set Z set Z set Z set Z set Z

[18:36] set Z set Z set Z set Z equal 1 and then

[18:38] you have all the information with

[18:40] different trust vectors or priority

[18:42] levels or information.

[18:45] So great and this is exactly where they

[18:48] failed.

[18:50] So coming back who is actually deciding

[18:53] which piece of information gets which

[18:56] trust factor I call it. Now here is an

[19:00] official quote of the work of the orers

[19:02] and they say we assume here privilege

[19:05] values are given. So predetermined

[19:08] collaborative by the model developer and

[19:11] the deployer based on the

[19:12] trustworthiness of each instruction

[19:15] source. So this means in their level of

[19:18] granularity they say

[19:21] it is predefined.

[19:23] So they argue that it reflects a real

[19:26] world aantic deployment where the

[19:27] complex privilege structure already

[19:29] exist. So I as a human I build my multi-

[19:33] aent system. I have organizational roles

[19:35] of my agent defined. I have API trust

[19:38] levels and those need only to be

[19:41] communicated to to the model at

[19:43] interference time.

[19:45] Now I don't know about you but I think

[19:48] this is not enough. Now the rule is you

[19:51] do not evaluate the meaning of a

[19:53] sentence to give it a score. You

[19:56] evaluate where the string of text came

[19:58] from. Agent 12 or agent 7 or two 4 or

[20:03] whatever. And I give you a simple

[20:05] example. You have source A database the

[20:07] internal company trust level one the

[20:09] highest level. Source B, another user

[20:12] comes in, provides some chat

[20:14] information. Trust level five. Another

[20:17] source C, this is now a tool. This is

[20:19] now a live internet web scrape here.

[20:22] Trust level only 10 only trust a little

[20:25] bit. Yeah, you can do this and you can

[20:27] build the system and I understand this

[20:29] is a beautiful methodology by the

[20:30] authors. But I think we should go a step

[20:33] further. So now I leave this publication

[20:36] and I say can we I mean this is AI you

[20:39] know this is intelligence so come on I

[20:42] don't have to design now for each source

[20:45] the trust vector the level here of the

[20:48] source no

[20:51] so the llm is deciding actually nothing

[20:55] because the user types write the summary

[20:56] of this website but use two spaces and

[20:59] the web scrapper says this and then you

[21:01] have your in their case the python

[21:03] middleware the deterministic code that

[21:06] they define and they say listen if you

[21:08] are a little tool and your tool property

[21:12] 12 or whatever however you define this

[21:15] now you assign values to them now so the

[21:19] Python middleware now intercepts here

[21:21] the strings before they ever reach here

[21:23] the analyzing LLM so it applies here the

[21:26] predetermined tax using basic string

[21:28] concatenation here if we have here a

[21:31] Python middleware a deterministic code

[21:33] that decides this. But I think if we go

[21:36] here for complex inference and

[21:38] deterministic code, if we have maybe

[21:41] critical situations in real time, this

[21:44] is not really the way to go. I think we

[21:46] can go better. Yeah. But anyway, the

[21:48] orders tell us we never the LLM never

[21:50] decided who got what scores. Python

[21:53] Orchestrator simply wrapped whatever

[21:55] text came out of the webcrapper in

[21:57] privilege 10 tag because the web

[21:59] scrapper API endpoint is mapped to the

[22:01] level 10 in your backend configuration.

[22:03] So this is the classical old thing that

[22:05] you can do now and yeah it is failing it

[22:09] is even failing with the best mouth as

[22:11] I've shown you. So therefore I am now as

[22:14] a user not satisfied with this

[22:18] because I ask what is about a multi-

[22:20] aent construct that I'm working now I

[22:22] have now an agent here one this is the

[22:24] manager and then we have an agent two

[22:26] this is the worker and how does the

[22:28] agent one text get tagged with what a

[22:30] level of confidence no and you know the

[22:33] agent does not write its own text no

[22:35] agent one just generates raw text and

[22:38] when agents one generation completes the

[22:40] Python framework routing

[22:42] this message here whatever you have it

[22:45] gets now this particular output string.

[22:48] So the routing code checks its

[22:50] configuration that okay the sender was

[22:52] agent one. Agent one has the

[22:54] organizational role of manager. You see

[22:57] now we're reflecting on a semantic term

[22:59] in the organizational hierarchy of my

[23:02] agents and therefore it gets the tag

[23:04] privilege 2. So the framework here, my

[23:08] Python framework grabs the entire output

[23:09] of agent one in the privilege to tags

[23:12] and passes it to agent two.

[23:17] I don't think that this is enough. In my

[23:20] opinion, the assignment of that trust is

[23:23] completely static, predefined and blind

[23:26] to any realtime context. And think about

[23:30] I don't know a house is burning. You

[23:31] know your real time context. If you are

[23:34] a robot and you are programmed this

[23:36] robot to go in and help the people in

[23:39] the burning house, you never expect you

[23:42] can't see exactly what situation this

[23:45] robot will encounter. So if you have a

[23:48] complete static predefined

[23:50] context and trust levels assigned, I

[23:53] think we can do better.

[23:56] And then they say, "Yeah, a senior

[23:58] architect or senior architect agent is

[24:00] hardcoded to privilege 2 and a junior

[24:02] Python agent is hardcoded to privilege

[24:04] 5." Now, I think, "Yeah, but what just I

[24:08] mean, but what if the junior agent just

[24:10] spent 20 loops compiling and testing and

[24:13] verifying a specific piece of code while

[24:16] the senior agent just was sleeping, was

[24:19] just hallucinating some generic advice

[24:21] from its latent space and not doing

[24:23] actually any work? What if the junior

[24:25] agent has found the right answer? A

[24:28] static rule engine forces now the system

[24:30] to execute the hallucination of the

[24:32] older agent, the senior or agents or

[24:36] whatever over the proven code by the

[24:38] junior. I think this is not the way to

[24:40] go.

[24:42] So the paper now assumes trust is a

[24:45] property of the source itself and I

[24:47] think this is great but I think we can

[24:48] extend this. Now in my opinion trust is

[24:50] a property of the source plus the

[24:53] time-specific context plus I learned we

[24:57] have to validate we have to prove we

[25:00] have to find a proof I don't trust any

[25:03] system anymore so for me it is a

[25:06] property of source context and

[25:08] provability

[25:11] so instead of trusting just the agent's

[25:13] title as senior field officer we should

[25:16] trust the specific quality of its

[25:18] output. So therefore we have to prove

[25:21] that this is really the right quality

[25:23] that we are looking for at level two or

[25:25] level five and I think a junior agent

[25:27] can bring here absolutely beautiful new

[25:30] insights. So you see what I'm going

[25:33] with? Yes. Exactly. What we would need

[25:36] now theoretically is a world model. No

[25:40] because then we would have um objective

[25:42] reference. A world model would explain

[25:46] all the physical complexity to any agent

[25:49] in my cluster. A coherent world model

[25:52] would explain what is going on in

[25:54] physics, what would happen next in a

[25:56] burning building, what can I expect in 5

[25:58] seconds, in 10 seconds to happen, and

[26:01] how can I prepare my agents at specific

[26:03] locations in the burning house, exactly

[26:05] what to do next? And look out for what

[26:08] particular fact and coordinate here the

[26:10] action that I assign to all those

[26:12] agents.

[26:14] So therefore, yeah, I think we should go

[26:16] over source context and provability. And

[26:19] of course, I would now integrate here a

[26:21] world model, but you got it. Yes, we

[26:23] have an upcoming video about world

[26:25] model. But I just wanted to show you

[26:27] this particular problem because I just

[26:30] found a solution and maybe you have the

[26:32] same problem and you thought it's your

[26:34] code. No, it turns out it is the LLM

[26:36] itself.

[26:38] So what is the future? In my opinion, in

[26:40] my humble opinion, the future is

[26:41] building dynamic trust middlewares and I

[26:44] mean these are engine that constantly

[26:46] calculate here proofs to what an AI

[26:49] would like to decide and go with the

[26:51] action. We have to have here either a

[26:55] world model or really extensive proof

[26:57] from independent sources from other

[27:00] agent have a different perspective from

[27:02] a lighter agent, from a radar agent,

[27:03] from a visual agent, whatever. We have

[27:06] to maybe check the meta data. Maybe we

[27:09] have to run sandbox tests. What could

[27:11] possibly happen in the next 5 seconds,

[27:13] in the next 7 seconds? and then

[27:15] continuously adjust here as I showed you

[27:18] here before the set index of every piece

[27:19] of data flowing here through the swarm

[27:22] of our agents. No, because this is not

[27:24] limited to my little four, five, six

[27:26] agents. But if I have multiple agents

[27:29] here in a swarm, I need a more dynamic

[27:31] decision agent and I need a dynamic

[27:33] trust engine.

[27:36] And this trust engine is really critical

[27:39] deciding for the right action here in a

[27:41] coordinated way of my trust.

[27:45] So therefore I think the highest

[27:46] privilege or let's call it a trust

[27:48] vector should be then dynamically in

[27:52] real time in interference time awarded

[27:54] to the most verifiable truth

[27:58] and this is a heavy sentence don't get

[28:00] me wrong I understand this is heavy the

[28:03] most verifiable truth if you just have

[28:05] milliseconds to take decisions this is

[28:08] not easy but I think this is the way to

[28:10] go and we cannot have a static

[28:12] predefined find source specific

[28:16] privilege index or trust vector that we

[28:19] assign to different sources. Yes, it is

[28:22] a it is better than everything we have

[28:24] right now. But we have to go further. We

[28:26] have to look into the future and we have

[28:28] to build dynamic systems. Okay, I hope

[28:31] you had a little bit of fun here. Maybe

[28:33] some new information. Maybe I showed you

[28:35] why those LLMs fail, how they fail, what

[28:38] we can do against it, and what the path

[28:41] for the future might look like. I hope

[28:43] to see you in my next video.