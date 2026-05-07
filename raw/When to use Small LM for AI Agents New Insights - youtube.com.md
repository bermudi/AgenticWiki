---
title: "When to use Small LM for AI Agents: New Insights"
author: "Discover AI"
source: "youtube.com"
url: "https://www.youtube.com/watch?v=wOPd-eNppoA"
date_saved: "2026-05-07T02:50:45.254Z"
---

# When to use Small LM for AI Agents: New Insights

[0:00] Hello community. So great that you are

[0:03] back. Today we compare the cost of LLMs

[0:05] and I show you which LLM you can use to

[0:08] the absolute limit. Pay less and when it

[0:11] is really time to pay up here for the

[0:13] corporate malls. So we will climb up

[0:15] here the cognitive lighter to more and

[0:17] more complex things. But the beautiful

[0:19] thing is our little local LLM can do a

[0:23] lot of things for us. So let's have a

[0:24] look. This is the study May 1st 2026

[0:27] Harvard University Boston and they call

[0:29] it agent floor. How far up the tool use

[0:32] ladder can small open white models go.

[0:36] So which part of an agent workflow truly

[0:38] requires here this huge GPD 5.5 XI X

[0:41] whatever and can it be handled by

[0:44] smaller models maybe by local models.

[0:47] Now in they tell us hey a gentic LM

[0:48] system of make many model calls for a

[0:51] single user visible action and a

[0:54] substantial fraction of those calls are

[0:55] short structured and if you're honest

[0:58] operational real simple so in production

[1:02] they frequently take the form of a

[1:04] search a lookup a record extraction or a

[1:07] single submission and now the question

[1:08] is hey do we really have to pay GPT for

[1:11] this or maybe we can handle this locally

[1:13] no so they said okay we introduced And

[1:16] we have here a new benchmark an agent

[1:19] floor and this is a six-tier benchmark

[1:21] for controlled evalation of tool use

[1:23] capability plus and now this is the nice

[1:26] thing they have a capability and cost

[1:28] comparison of 16 open weight models they

[1:32] compared to GBD5 and this is now nice.

[1:36] So of course you might say like I did

[1:39] say hey why another toolbased benchmark

[1:41] my goodness we really have enough no and

[1:44] they say yeah but all these agentic

[1:46] suits like toolbench tow bench mint

[1:47] agent bench agent board gaia web arena

[1:50] was world and s sw s sw s sw s sw s sw s

[1:51] sw s sw s sw s sw s sw s b b b b b b b b

[1:51] b b b b b b b b b b b b benchen are

[1:53] closer to the real workflows, but they

[1:54] also entangle the core tool usability

[1:57] with confounds such as the API drift,

[2:00] the web or the GUI grounding and

[2:01] possible contaminations and capability

[2:04] scaling studies typically relate

[2:06] aggressive performance to model size

[2:08] without decomposing here distinct

[2:11] cognitive demands within multistep tool

[2:13] use. So here we say listen we do this

[2:16] here to have here the perfect ladder. We

[2:19] have 30 task across six different tiers.

[2:21] We start very simple with an a zero. We

[2:24] go up to the E level. We have five task

[2:27] by tiers. And this is now a clinical

[2:29] neutral and perfect experiment we can

[2:32] repeat. So let's do this. They tell us

[2:35] here each tier introduces a new

[2:37] cognitive demand. So a zero instruction

[2:40] falling without tools. Guess what? A

[2:42] single tool call B sequential two tool

[2:46] chain where the first tool output feeds

[2:48] into the second C branch on intermediate

[2:51] results. And let's have a look at this

[2:53] because this is much nicer. So here we

[2:56] have it. A zero is an instruction. A is

[2:58] a one tool. B is a two tool chain. C is

[3:00] the branching. D is now multi source

[3:03] synthesis and conflict and recovery

[3:05] pulling data from multiple tools and

[3:07] resolving contradictions. And E is now

[3:09] the most heavy planning long horizon

[3:12] planning 8 to 12 sequential steps while

[3:15] maintaining the system constraints

[3:17] across the entire reasoning trajectory

[3:19] by our model and we will see that there

[3:22] is a threshold there is here a cliff

[3:25] where all the models suddenly die. So

[3:28] they created here a perfect

[3:29] deterministic abstract in-memory

[3:31] environment to test exactly one thing.

[3:34] How far the cognitive flatter of tool

[3:36] use can a small maybe local openweight

[3:39] model go before we really forced to use

[3:42] massive frontier models like a GBD 5.5.

[3:45] So this is nice and they tested as I

[3:48] told you 16 openw rate malls and what we

[3:52] want is we don't have to pay these huge

[3:54] corporate miles here for the simple task

[3:56] for a simple tool use and they built

[3:59] this ladder to show us which model will

[4:02] go up to which ladder level and we can

[4:06] pay just a fraction of what we would

[4:08] have to pay jet GPT because what we want

[4:11] is not a melting pot but here a clean

[4:13] precision here solution. solution for

[4:16] our tasks. So let's have a look at the

[4:17] results.

[4:19] This here is what they found gamma 426

[4:22] billion models here the closest model to

[4:25] a GBD5 model. So they published this

[4:28] here and they say look this here is the

[4:30] row here for our the line for our tiers

[4:33] here from a z to e. Then we have here in

[4:36] I marked it here yellow for you the

[4:38] gamma 426b and the performance of GBD5.

[4:42] You have the delta and percentage points

[4:44] here and something else. And you see you

[4:48] have the first two A Z and A. The GP the

[4:52] gamma 4 26B even outperforms the GBD5.

[4:56] Then close C even closer, even better

[5:00] with gamma 4. D, yeah, a little bit

[5:03] behind GBD5, but E is really where it

[5:06] happens. The gamma 426B goes down to 0%

[5:10] performance and GBD5 is at 10%.

[5:14] But they argue if you take this as a

[5:16] complete test suite in total we have

[5:19] overall performance of 60% of Jamma 426B

[5:23] and GPD5 only comes up to 59.6%.

[5:27] Now they say the price difference

[5:29] between those two models is significant.

[5:31] No. So now let's have a closer look.

[5:34] They have here the open wide matches of

[5:36] the frontier overall and the TA and

[5:37] outperforms whatever. So again from ACR

[5:41] down to E and overall the task you see

[5:44] here the delta the delta of TCR the task

[5:47] completion rate and you see here a here

[5:52] beautiful plus 20 percentage points plus

[5:54] 2 percentage points then here in the

[5:56] middle you have this zero uh line you

[5:59] see it is yeah a little bit oscillating

[6:02] around zero E is then of course here uh

[6:05] GD5 with minus 10 significant better But

[6:09] at overall we are back to about zero in

[6:12] the performance of our delta t0. So this

[6:15] mean why should you pay jp here much

[6:19] more money for the same result.

[6:22] And here we have now all the other

[6:23] model. So you see they go here from a

[6:26] QN3 QN 3.5 unfortunately only one 3.5

[6:32] granite Mistral Ministral Neotron 3

[6:36] GPT OSS here and here you have all the

[6:40] data and they go here really from below

[6:43] a 1 billion parameter size model to 32

[6:46] billion with the QN3 32B and they

[6:49] compared here to GBD5 and here again you

[6:51] have our A0 to E

[6:54] now this is interesting now let's see

[6:57] gamma 4 you know this no 100 E before a

[7:00] z 96 and you always compare this to the

[7:03] GBD5 in the last line and you see bold

[7:06] is outperforming GBD5

[7:09] so even here you see what we have here a

[7:11] ministral 38B is for the category B

[7:14] outperforming a GBD5 or for the category

[7:19] C we have a gamma 426B outperforming a

[7:22] GBD5 five. So you see in total we have

[7:25] here exactly this.

[7:28] Now if you look here you clearly see

[7:30] here let's go here with let's say a QN

[7:33] 3.52B here. This is a 2 billion. This is

[7:37] tiny. This you can have almost on your

[7:39] watch. No a two billion. Well okay now

[7:42] of course if you compare this 80 GBT and

[7:45] 44% with the Q3.5. Yes of course. But

[7:49] look at the size. No. But here at A we

[7:52] are already close to 70%, where GPT is

[7:55] at 98%.

[7:57] But here at B we are now at 80%, and

[7:59] this is almost identical to the GPT5

[8:02] performance. So you see it really

[8:05] heavily depends on your task complexity.

[8:08] So what I do now is I sort my task into

[8:12] A to E. I want to understand what

[8:14] complexity do I have. If I have a

[8:17] complex prompt, I decompose the prompt

[8:19] now in multiple simpler complexity

[8:22] classes and then I try to allocate here

[8:25] and then I know exactly which model

[8:27] would serve here best for the lowest

[8:29] cost.

[8:31] Yeah, you see E here is really where

[8:33] almost all the models have zero except

[8:36] one and this is here a mist a ministral

[8:39] 38B and it outperforms a GBD5 here on

[8:43] the most complex topic. It is

[8:46] unbelievable. You never know what those

[8:48] models have been pre-trained on on what

[8:50] complexity class they have been

[8:52] pre-trained. But this gives us now a

[8:55] beautiful visualization or if you want

[8:58] to have here an capability heat map. So

[9:01] we start here with a zero in this column

[9:03] and we go over to the right hand side

[9:05] here to the column E and you see the QN

[9:10] 3.5 2B it's a strong performer. Look,

[9:12] it's dark, dark, dark till almost

[9:14] hitting here at the end. But you see

[9:16] also the Neatron 3, the Nano 4B is a

[9:19] strong contender and the Gamma 4 26B

[9:23] also a strong contender. So you see this

[9:25] gives you here a very good overview. And

[9:28] you might say, but what about a GPD OSS

[9:30] 20 billion, a huge one compared to 3

[9:32] billion? It is not so much better. Look

[9:35] at the performance data. I would rather

[9:37] go here with a QN 3.52B

[9:40] that I have locally and has a better

[9:42] performance. So this gives us here some

[9:45] beautiful insight. But as I told you the

[9:47] performance is only one thing the cost

[9:49] differencing. So they give us here just

[9:51] as an example. No the GD5 parameter

[9:55] unknown have here an aggregate TCR close

[9:58] to 60% and the cost per pass task is

[10:01] about this and you have to wait about 40

[10:03] seconds. No, but please the prices will

[10:06] fluctuate daily. This is not the price

[10:07] you pay in your region. This is you just

[10:10] for a snapshot in time in one region. I

[10:13] just wanted to show you you have here a

[10:15] factor of 10 difference here. If you go

[10:18] from one mile here for one price segment

[10:20] to the other and you see you have with a

[10:23] gamma 426B the identical TCR like a

[10:27] GBD5.

[10:29] Or if you go even with a smaller less

[10:31] performant model with a granite here 43B

[10:35] okay you only have 40% aggregate TCR I

[10:39] don't know if this is enough for you but

[10:41] let's come back granite where is it here

[10:44] a granite 4 so if you are only here in a

[10:47] zero and a granite with 84 and 80% might

[10:51] be absolute enough for your particular

[10:54] task if you do have simple task that are

[10:58] decomposed down to simple complexities.

[11:00] So why pay more? So I think this gives

[11:03] you here beautiful oversight. Although

[11:05] you might ask, okay, if you have a here

[11:08] 96% with a gamma 4, so maybe this would

[11:11] be a better model, but this gives you

[11:13] now a beautiful overview. Now they tell

[11:16] us here if you go here with a gamma 426p

[11:20] can be up to 15 times cheaper,

[11:21] self-hosted, and 2 and 12% faster.

[11:26] Now just to remind you this is the tier

[11:28] A and B and [snorts] compare here the Q1

[11:32] 3.5 2B with the granite 43B

[11:36] and you see okay at 2B A Z at 44% a 3B

[11:41] already at 84%. So yeah, it is maybe not

[11:45] the best idea to go really tiny tiny but

[11:48] yeah about 3B8B for a very simple task.

[11:52] There seems to be a sweet spot but also

[11:55] you can have here the Q1 3.5 here in the

[11:58] B having 80% performance and here the

[12:01] bigger M only 56% performance. So it

[12:03] really depends on the individual

[12:06] pre-training data set that they provided

[12:08] and about your specific task. if there

[12:11] is an almost onetoone mapping between

[12:13] the pre-training and your task

[12:16] but I think yeah if you go for the class

[12:18] D for example yeah there's only one

[12:20] option no a QN 3.5 2B that has here an

[12:23] outperformance everything else in this

[12:25] class so real nice have a look at this

[12:28] get familiar this maybe you can save

[12:30] some money now let's come to the point

[12:32] that I critiqued in my last video and at

[12:36] first yeah notice that there are eight

[12:38] deterministic tools search record,

[12:40] lookup record, get attribute, list

[12:43] option, check the constraint, compare

[12:45] the records, compute the value, and

[12:46] submit the decision. And all of this is

[12:49] done not in real world. This is done

[12:51] also in a simulation because they do

[12:54] this in an in-memory fixture database.

[12:57] There's no real file system. There's no

[13:00] real external servers. Everything is

[13:01] simulated. And I heavily criticized this

[13:04] approach in my last video.

[13:07] But the authors here argue that this

[13:09] gives them a benefit over the real

[13:11] thing. This is control, reproducibility.

[13:15] Because they prove that the limitation

[13:16] in a gentic workflow isn't just the real

[13:18] world is messy. They showed that even

[13:20] when the world is perfectly clean, the

[13:23] fundamental architecture of auto reagive

[13:25] LLM breaks down after about five to

[13:27] seven sequential contingent steps. And

[13:30] now by isolating here the cognitive

[13:32] limit they proved that throwing a bigger

[13:34] model at the problem is not going to fix

[13:36] it. And for this they had to be

[13:38] absolutely reproducible. They could not

[13:42] afford that maybe on a Monday morning

[13:44] the network was fast and on on Tuesday

[13:46] afternoon the API would not respond

[13:49] immediately. So to eliminate all of this

[13:52] [clears throat]

[13:53] they called here the three courses of a

[13:55] real world AI benchmark. And they said

[13:58] what we really have is the chaos

[14:00] variable if fig will go real world

[14:02] because real API changes no the end

[14:05] points go down maybe the rate limit

[14:07] triggers and adjacent schema update and

[14:09] the orers noted that on tool pench here

[14:11] you have 44.4% of the API fail when you

[14:14] try to rerun the benchmark just maybe a

[14:17] day later. So you have 44% my goodness

[14:20] this is such an important factor.

[14:23] You have to build a reproducible

[14:25] environment and this is a simulation

[14:27] because you want to compare apples to

[14:29] apples. No, and not on Monday this model

[14:32] and on Tuesday when you have 44% less

[14:36] network then you try another model. No

[14:38] way.

[14:40] Then they tell us here there's a data

[14:42] contamination problem what they call a

[14:44] memorization problem. There was a 2025

[14:47] study devastating that showed here that

[14:50] SWbench verified that close to 60% of

[14:53] audited problems had flawed test cases

[14:56] or were essentially contaminated. No.

[14:58] Yeah, you want to get rid of this. No.

[15:00] And lastly here you have entangled

[15:03] modalities sometimes. No, this HTML

[15:05] parsing confound

[15:08] and they found a solution in their agent

[15:10] floor. It strips away all HTML or GUI

[15:13] navigation and web noise. The models

[15:15] receive perfect clean native JSON tool

[15:18] schemas and it tests you the pure native

[15:20] tool calling control. It is independent

[15:23] from any fluctuations of the external

[15:25] environment. So therefore okay it is not

[15:28] a real world test. It is absolutely a

[15:32] pure simulation in memory but it has

[15:35] absolute reproducible environmental

[15:38] condition every time.

[15:40] So therefore okay maybe a simulation can

[15:44] also be a good thing if you want to have

[15:46] comparable results of the models. Now

[15:48] what they did is beautifully because

[15:50] they also asked themselves hey why did

[15:53] those malls all fail at the level E at

[15:57] the highest level and the most

[16:00] fascinating part is here they fail the

[16:02] taxonomy so when the malls hit here this

[16:05] tire this tier E wall they just don't

[16:08] fail no they fail through entirely

[16:10] different mechanisms and they had a look

[16:12] at this

[16:14] and they classified here at least those

[16:16] failure elements ments here. F1 they

[16:20] called hallucinated a tool making up an

[16:22] API. Okay, we know everybody

[16:24] hallucinates. F4 was a step budget

[16:27] exhausted running out of allowed moves.

[16:30] Or F5 was early resignation. Yeah. Yeah.

[16:33] I started executing but then the LLM the

[16:35] core just decided okay now I give up and

[16:38] I output some text. Hey, I don't want to

[16:41] do it yourself. I just resign. EI

[16:44] resigned from its job or there was a

[16:47] plan without execute. It wrote a

[16:49] beautiful strategy, a beautiful plan.

[16:51] No, everything was absolutely targeted

[16:54] and planned and but it never executed a

[16:57] single tool call. So it was just doing

[17:00] the planning and then it decided I stop.

[17:02] I don't execute. So this is not what you

[17:05] want from your multi- aent system. Yeah.

[17:07] So let's have a look.

[17:10] They give us here at a match TCR the

[17:12] open weight ceiling and the front fail

[17:14] differently. And as you see here, you

[17:17] have now for a zero to E again our gamma

[17:21] 4 26B and our cheap5. And you see this

[17:25] here for all the different A B C D and E

[17:30] tiers. Now let's focus here on the E

[17:33] tier the planning where there is here

[17:35] this much the problem really happening.

[17:38] Yeah. So if you look here at the GPD5

[17:40] failures here, you see here in dark blue

[17:42] 39%. What is it? 39% is

[17:47] early resign.

[17:49] So in close to 40% of the cases here,

[17:51] GBD5 decided I don't continue my task. I

[17:54] don't like my job. I just stop now. I'm

[17:57] not finished. I know. But I just output

[17:59] no

[18:01] 24% here. This a little bit lighter blue

[18:05] is plan without execute.

[18:09] >> [laughter]

[18:10] >> So it was planning what it wanted to do

[18:12] but the very moment when it was time

[18:14] then to execute the plan 2D5 decided no

[18:18] I don't execute now ever which is

[18:21] interesting by itself but more about it

[18:23] later and at jamo 4 here you see

[18:26] different colors

[18:28] we have here a dominant orange 41% and

[18:30] what is it the step budget exhausted so

[18:34] this would mean that our little gamma 4

[18:37] would enter somehow a loop, a local

[18:39] minima and run around here inside this

[18:43] minimum of our manifold and not be able

[18:45] to escape to the global minimum or

[18:49] extremer and find the perfect solution.

[18:52] And then you see here for our gamma 426B

[18:56] 36% in red. And what is this? This is

[18:59] simple F1 hallucinated a tool. This

[19:03] would also support this. We run around

[19:06] in a local minima. We don't find a way

[19:08] out. And in order to provide helpful

[19:11] answers to the human user, it is now

[19:14] starting to hallucinate a solution

[19:16] because it cannot escape from its local

[19:18] minimum.

[19:20] And the order tell us this. The file

[19:22] fails from execution apathy. It looks at

[19:25] the 10step horizon, perfectly formats a

[19:28] plan, realizes the cognitive load

[19:30] required to execute this plan step by

[19:32] step and simply resigns. It outputs a

[19:35] polite text response claiming what

[19:38] should be done without doing it. The

[19:41] gamma 4 is different in its failing

[19:43] behavior. If it fails from blind panic,

[19:46] no, it dutifully tries to execute the

[19:49] task. It starts looping inside our local

[19:51] minima exhaust its token budget and then

[19:54] it gets confused running here more or

[19:56] less in circles if you want. It starts

[19:58] hallucinating tools or tool names that

[20:00] do not exist. It is just trying to find

[20:03] a way out and it has learned that

[20:05] hallucination or just inventing

[20:07] something is a valid way out. And now we

[20:11] see here with gamma 426P it almost never

[20:14] resigns 0%. It doesn't give up. It

[20:18] fights till the end. I like this.

[20:21] And Yoda said okay let's fix it with a

[20:23] system prompt. No, come on. We have

[20:25] system prompt prompt engineering

[20:26] everything. And they tried to do this.

[20:28] No. And they added here structure prompt

[20:30] telling you the different models. they

[20:31] plan first and execute a submit or

[20:33] whatever was the problem. But it turns

[20:36] out this helped nobody. In contrary, it

[20:39] actively hurt the gamma 426B because it

[20:42] pushed it into the resignation failure

[20:44] mode when it was forced to execute this

[20:47] particular sequence that was not

[20:49] incoherent here with its internal

[20:50] parametric knowledge. No. So therefore,

[20:53] what is the end? The end of this video

[20:55] today is an outlook. To build robust AI

[20:58] systems here, you must stop treating EI

[21:01] as a universal oracle that can only do

[21:03] one thing and you always have to go to

[21:05] the most expensive, let's say, GBD 5.5

[21:08] system. This is not the case anymore.

[21:11] You can save a lot of money if you map

[21:14] your specific workflow, your specific

[21:17] complexity to specific capable tiers

[21:20] like I showed you here. You saw here 16

[21:23] open-source model. You can choose the

[21:24] model that you like. you routier the

[21:27] base load to a high efficient let's call

[21:30] 3B to 26B model and then for

[21:32] [clears throat] the rest you know you

[21:34] have to develop some specific nonextual

[21:36] intervention and I will show you one of

[21:39] those models here in one of my next

[21:40] videos to simply overcome the planning

[21:42] horizon problems where all the current

[21:45] models currently collapse but there's an

[21:47] easy solution for this so I hope I've

[21:50] given you some help here choosing here

[21:52] the right model the right local more LLM

[21:56] that it has the power that it has the

[21:59] capability to solve your complexity task

[22:02] and it is significant cheaper than any

[22:04] propriatory model here by our global AI

[22:07] corporation. I hope I provided some new

[22:09] information. I hope you enjoyed it. You

[22:11] had a little bit of fun. Would be great

[22:12] to see you in my next