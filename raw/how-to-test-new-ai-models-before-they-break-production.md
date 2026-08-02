---
type: youtube
url: https://www.youtube.com/watch?v=Y-I9m5YsAcs&t=2348s
title: "How to Test New AI Models Before They Break Production"
channel: Boundary
date_saved: 2026-08-01T23:51:21.765Z
speakers:
  - Dex Horthy
  - Kevin Gregory
---

# How to Test New AI Models Before They Break Production

[0:00] They had announced the deprecation for

[0:02] 2.5 flash before they had even released

[0:05] 2.5 flash. Keeping up with constant

[0:08] model deprecation became a real headache

[0:10] for us.

[0:10] >> One day like one test case was working

[0:13] and then a week later like three of them

[0:15] were broken and there was three other

[0:16] ones that were now working and you're

[0:18] just kind of like flailing a little bit.

[0:20] >> You know these things are going to get

[0:21] deprecated. Build your system in a way

[0:23] that expects [music] it and makes it

[0:25] easy to to upgrade.

[0:26] >> No, this is great. I mean this is this

[0:28] is the proper engineering right? Okay,

[0:31] so today on A that works, we got

[0:32] producer Kevin on talking about how he

[0:34] builds evals for models because

[0:36] sometimes the model you're using gets

[0:38] deprecated and you need to know if a new

[0:40] model or a different model is going to

[0:42] solve your needs. And ideally, you don't

[0:45] want this to become a fire drill in your

[0:46] company. And the way you do that is you

[0:48] set up your product in your deployment.

[0:50] You have production, you have your

[0:51] codebase, you collect data, you look at

[0:52] user reports, and the most important

[0:54] thing you do is you want to build up a

[0:56] test case. So when the new model comes

[0:58] out, you can have your 2,00 test cases.

[1:01] You can look at the outputs from the old

[1:02] and the new one. You can diff them. You

[1:04] can see where they're the same. You can

[1:05] see where they're different. You maybe

[1:06] even review them manually and reabel

[1:08] them and keep growing your test case.

[1:10] Um, almost all of this ends up being

[1:11] structured output. So you have raw data

[1:13] or documents or images and then you know

[1:16] that some structured output should come

[1:18] out of it. Um, we talked about some like

[1:20] kind of prior art here and API

[1:22] migration. And then Kevin showed off a

[1:24] bunch of cool code of generating

[1:25] basically a matrix of scores on cost and

[1:28] latency and accuracy for a bunch of

[1:31] different models versus a baseline. And

[1:33] then we did some riffing with Claude at

[1:34] the end to visualize the data which was

[1:36] also super fun. Um so a lot of good

[1:38] alpha in this one. Uh I hope you guys

[1:39] enjoy it. Kevin, thank you so much for

[1:41] coming and uh let's get into it. What's

[1:43] up y'all? This is AI that works. We got

[1:45] uh producer Kevin on for a very spec

[1:48] special episode.

[1:49] >> I'm on

[1:50] >> I'm Dex. I'm the CEO and co-founder of

[1:52] Human Layer. Uh we build the world's

[1:53] best uh way to use AI agents to solve

[1:56] hard problems and complex code bases uh

[1:59] called Human Layer. We got Kevin over

[2:00] here who is one of the best AI engineers

[2:02] that I know. Um he's done a couple

[2:04] episodes with us before. His uh eval

[2:07] project in uh what was it? A Streamllet

[2:09] app?

[2:09] >> Streamlet app. Y

[2:11] >> super sick. Like just like one of the

[2:14] cleanest, tightest, like no fluff just

[2:16] like here's how to get your make your AI

[2:18] pipelines better. um and all the way

[2:21] down to the like labeling of the data

[2:23] set. So, uh very esteemed. Uh Kevin runs

[2:26] all the AI automations that make this

[2:28] show work. Uh including putting out the

[2:30] emails, uh including setting up all the

[2:33] all the release notes, including writing

[2:35] scripts for the shorts, like he's just

[2:37] he's done he's done all of it. Um and

[2:40] so, uh we're super stoked to have him

[2:41] here. And every once in a while he pops

[2:42] in and does an episode and drops some uh

[2:44] drops some great knowledge on us from

[2:46] his work in the fields as kind of an ICI

[2:49] engineer solving like production

[2:51] problems at like how how big is

[2:52] Evolution IQ?

[2:54] >> Gosh, we've got I think something like

[2:56] 150 engineers or 150 employees somewhere

[2:58] between 150 to 200 employees and most of

[3:01] us are engineers maybe half to 70%.

[3:04] >> Real real software teams not me and

[3:07] Viob's tiny uh you know 5 10 5 10 15

[3:10] person startups. That's right. That's

[3:12] right. Big big company. Yeah. And we

[3:13] were acquired gosh a year and a half ago

[3:16] at this point for 730 million. So that

[3:19] was a fun

[3:21] >> Yeah, that was a fun uh

[3:22] >> Did you get paid on that?

[3:24] >> Uh a little bit. Little bit.

[3:26] >> Little bit. Nice.

[3:27] >> Yeah.

[3:27] >> I wasn't I wasn't mad. It was a good

[3:29] year, I got to say.

[3:30] >> Yep. [laughter]

[3:31] >> Yeah. Um cool. Uh I don't know. I don't

[3:34] know if that was the full intro or if

[3:36] you got anything else. um maybe give us

[3:38] some context about why we're talking

[3:39] about what we're talking about and then

[3:40] we can get into it.

[3:42] >> Yeah. So what we're talking about today

[3:44] is essentially model deprecation and

[3:46] model obsolescence. So something that we

[3:48] dealt with a lot at evolution IQ is we

[3:51] use our we use Gemini models very very

[3:53] heavily in our all of our workflows.

[3:55] We're a Google shop. Everything's to GCP

[3:58] and and Vert.Ex AI and because we deal

[4:00] with we work so what EIQ does is we

[4:03] build claims guidance systems for

[4:04] disability and workers comp insurance

[4:06] carriers. So we see a lot of PII and PHI

[4:08] come through our systems and so we need

[4:10] to have a really secure environment

[4:12] where LLMs can process that and our

[4:15] answer to that has been keep everything

[4:16] in Google Cloud via Vert.ex AI. So we've

[4:19] done

[4:20] pretty much all of our production

[4:22] workflows are in either Gemini Pro or

[4:24] Gemini Flash. Most of most of which are

[4:26] in Gemini Flash and

[4:29] we initially started when we first

[4:31] started building these workflows, it was

[4:33] late 2023 and we were using Tech Spyson.

[4:36] Um, and then Gemini 1.5 Flash came out

[4:39] and so we migrated everything to Gemini

[4:41] 1.5 Flash and then I think it was

[4:44] September of

[4:47] last year when or thereabouts maybe it

[4:50] was July sometime last year Gemini 1.5

[4:53] flash was deprecated and you had to

[4:55] switch to Gemini 2 and 2.5

[4:59] and then I remember distinctly there was

[5:01] a moment where Google had announced they

[5:03] that they were they had announced the

[5:05] deprecation ation for 2.5 flash before

[5:09] they had even released 2.5 flash. So

[5:11] they had a plan release date and a

[5:13] planned deprecation date that was they

[5:15] were both in the future and

[5:19] keeping up with all like all of our

[5:21] workflows dependent on these models and

[5:23] keeping up with constant model

[5:26] deprecation became a real headache for

[5:28] us because we had all these workflows

[5:29] based in these models. So we had to come

[5:31] up with a way to build a system that can

[5:35] easily swap models and give you the eval

[5:39] that you need on the dimensions that you

[5:40] need and just a harness where you can

[5:42] kind of throw new models at it and see

[5:46] uh like how does this actually perform?

[5:48] Can I just swap it in or do I have more

[5:50] work that I need to do? So that's kind

[5:52] of the um

[5:54] that is the the the inspiration for this

[5:57] episode. And so what we're going to be

[5:59] talking about today is uh kind of a

[6:02] another way to do that. I know we did it

[6:04] our way. This is kind of a different way

[6:05] to do that that's I think um really

[6:07] flexible and kind of answers uh um a lot

[6:11] more questions that that we didn't that

[6:14] we couldn't really we just had some um

[6:17] organizational constraints kind of just

[6:18] the way our things work that we weren't

[6:20] able to to implement kind of this this

[6:22] solution. And I think this really kind

[6:24] of pays for itself in three ways. when

[6:26] you have basically the question that you

[6:28] want to answer is you want to say okay

[6:31] um if a new model comes out

[6:34] can I use it right and so you need a

[6:36] harness that you can just throw a new

[6:37] model at and essentially get a yes no on

[6:40] and if it's a no what do I need to do to

[6:43] get it to a yes and that kind of pays

[6:45] for itself in I think three ways one is

[6:48] these like every model that we are using

[6:51] in all of our workflows now will be

[6:52] deprecated at some point in the future

[6:54] we're living in a world where there are

[6:55] There's so many new models coming out

[6:57] and you know you can't just in the olden

[7:01] days you could have an XG boost and that

[7:02] XG boost as long as it was still

[7:04] performing well you could just keep it

[7:05] going. You can't do that anymore. The

[7:08] deprecations are coming and if our

[7:10] workflows depend on whatever models they

[7:12] depend on at some point we will have to

[7:14] change and we will be forced to change

[7:16] unless you're self-hosting.

[7:17] >> I was going to say uh the the the

[7:20] headline for the last week has been uh

[7:22] open source solves this doesn't it? It

[7:24] does and that's actually something that

[7:25] we're switching to now specifically

[7:27] because it has been such a headache.

[7:28] we're switching to self-hosting um open

[7:31] source models, but but open source does

[7:33] solve this, right? But the there's still

[7:35] the other two pieces. Another is, hey, a

[7:37] new model came out. Will it improve my

[7:39] workflow? Right? And so the same harness

[7:41] can answer that question. And then the

[7:43] third question is say you're running

[7:46] Opus or Sonnet,

[7:48] will Haiku work? Right? It's cheaper.

[7:50] It's faster. Like is it good enough? How

[7:52] much cheaper? How much faster? So you

[7:54] need a harness that can answer all these

[7:57] questions. And it's it's the same

[8:00] question just kind of phrased three

[8:01] different ways, right? The question of

[8:03] how will a new model perform in my

[8:06] workflow

[8:07] has three different applications.

[8:10] >> Yeah, that's great. Tell us about your

[8:12] uh your recipe. How do we uh how do we

[8:14] cook with this?

[8:15] >> So the the first thing that you need to

[8:17] do is you need to define like what you

[8:21] care about, right? What the obvious one

[8:24] is accuracy, right? Like does it

[8:26] actually perform well? So, but you need

[8:28] to define the the dimensions along which

[8:31] you're going to uh grade these models.

[8:34] The I think the obvious three are

[8:37] accuracy,

[8:39] cost, and latency. I'd say those are the

[8:42] the big ones. So, you define those three

[8:46] and then you build up a series of test

[8:49] cases. And again, this is all just like

[8:50] really high level. You'll build you

[8:52] build up a series of test cases to

[8:55] uh to measure those three

[8:58] and then

[9:01] you run your incumbent on you have a

[9:03] harness that runs your incumbent on

[9:06] those test cases and you can just swap a

[9:08] new model in and it compares against

[9:10] your your current or the incumbent

[9:13] performance and it can tell you

[9:14] performance or accuracy did this cost

[9:17] did this latency did this. Um,

[9:20] >> okay. So, the slop code bench thing was

[9:22] actually kind of a nice amuse boost to

[9:24] what we're talking about of, hey, Opus 5

[9:26] came out. I want to see compared to the

[9:29] other models that we were using before.

[9:31] >> Well, that's the that's the thing that

[9:32] like, you know, it's it's funny because,

[9:34] you know, we we've been talking about

[9:35] this episode for a while

[9:37] >> and when we first talked about it, I I

[9:40] looked at the models that had come out.

[9:41] I'm like, oh, like it's a shame we can't

[9:43] do this now. And this was a couple

[9:44] months ago. was like cuz all these

[9:46] models have come out you know recently

[9:47] and now here we are and that is even

[9:50] more true now than it was then right in

[9:52] the past month I mean soul has come out

[9:56] um Grock 4.5

[9:59] uh Gemini 36

[10:01] cyber um I'm I'm forgetting a bunch opus

[10:05] 5 sonnet 5 right all these new models

[10:07] have come out in the past just in the

[10:09] past month and I mean Haiku 5 I imagine

[10:13] is going to come out at any point now

[10:14] because that's so on 4.5, but new models

[10:17] are coming out all the time and we need

[10:20] some sort of easy way to say hey like

[10:22] like one like is my agent or my workflow

[10:25] better with this model and then two like

[10:28] if I'm still running Sonnet 4 or Sonnet

[10:30] 4.5 like that is going to get deprecated

[10:33] sooner rather than later and so every

[10:35] time a new model comes out that's a sign

[10:37] that hey my I need to I need to keep up.

[10:41] Mhm.

[10:43] So,

[10:44] um yeah, so it's funny that you started

[10:47] with Opus 5, right? Uh cuz that is

[10:50] exactly the kind of problem that uh

[10:52] we're we're looking at. And I think

[10:55] another thing, one thing that's

[10:58] important about the harness is swapping

[11:01] out the model is pretty easy, right?

[11:04] It's that's easy to do in general.

[11:06] What's hard is defining what success

[11:09] looks like, right? So maybe you say I

[11:13] want this to be strictly at least as

[11:15] good as my incumbent model. Maybe you

[11:18] allow a 5% like okay well if it goes

[11:20] from 95% to 90% that's still okay. So

[11:24] that definition of figuring out what

[11:27] does the acceptable bar look like that

[11:29] is the hardest part of this I think. And

[11:32] so that is the easy you should make that

[11:36] the easiest thing to change in your

[11:37] harness. So you can just easily change

[11:39] out these different uh thresholds, run

[11:43] it and you get your answer.

[11:45] >> Well, and this was also I think we

[11:46] talked about this in vibe. I was talking

[11:48] about like image gen, right? Is like you

[11:49] don't just want to know like to start

[11:52] you want to see one number, right? This

[11:54] is why all these things like even if you

[11:55] look at the um I'll grab a screenshot

[11:58] from uh slop codebench and drop it on

[12:01] here. Um let's see, right? Like usually

[12:05] you get a table like this, right? which

[12:07] is like

[12:08] >> okay you have a bunch of different

[12:09] categories like they have strict pass

[12:11] isolated pass core pass partial pass

[12:14] >> um and then you can see okay like GPT

[12:17] 5.5 got a 14.8%

[12:19] you can see opus opus 4.7 got an 8.2% 2%

[12:23] and like this like for me this first

[12:25] column is the most interesting one of

[12:27] like can the model ace the problem and

[12:30] actually get everything correct and what

[12:32] percentage of of the problems can it do

[12:33] that

[12:34] >> because all these other data like cost

[12:36] and time and also they have these like

[12:38] quality metrics here um

[12:41] >> and so I guess like

[12:43] >> the the the general idea is is is this

[12:46] one around like okay cool like what is

[12:48] our what is our like north star right

[12:51] because if if you if you drop in a model

[12:53] and you were getting 20% or let's say

[12:55] you were getting 90%. And you drop in a

[12:57] new model, you get 50%. That's a very

[12:59] easy like, nope, weird. It is whatever

[13:01] the amount of work it might take to make

[13:03] this thing get back to 90%. Is probably

[13:06] not not not worth it.

[13:09] >> Right. Right. And

[13:13] um you know that's something else that's

[13:15] interesting is when a new model comes

[13:18] out I mean I'm I also just glance at the

[13:21] benchmarks to see is it is it generally

[13:24] better than the other model but I mean

[13:27] you and Vivov just did an episode about

[13:29] the state-of-the-art benchmarks

[13:32] having um let's say limited purchase

[13:35] power right

[13:36] >> well and it's also the the thing about

[13:38] benchmarks is like every model now can

[13:40] get a 99% on sweepbench and every model

[13:43] now can get like an 80 to 90% on on

[13:46] frontier frontier code or not frontier

[13:48] code on on sweet bench multilingual and

[13:50] the frontier code averages I think for

[13:52] opus 5.5 was like 55% and like soul is

[13:56] like 60% or something like this like I

[13:58] don't I don't know the exact numbers but

[14:00] the idea is like for some benchmarks we

[14:02] want them to be truly unsaturated right

[14:05] which means like hey look like there is

[14:08] a lot of room for improvement And in

[14:10] Slap Codebench, it's like, oh, most

[14:11] models get in the 10 to 20% range. If

[14:14] you're a model builder or you are

[14:16] someone who cares about like, okay, what

[14:18] is the frontier? What is the hardest

[14:19] problem we can solve? Then you want an

[14:21] unsaturated benchmark. But when you're

[14:23] building your evals for yourself, you

[14:25] probably actually want a very saturated

[14:28] benchmark because your whole goal is to

[14:30] get to 99% accuracy or 99.9% accuracy,

[14:34] >> right? And even looking at the

[14:36] state-of-the-art benchmarks or the

[14:38] release benchmarks that only has limited

[14:40] utility because you don't care you don't

[14:42] actually care about the performance of

[14:43] those benchmarks. They care about the

[14:44] performance in your workflow.

[14:46] >> Right. Exactly.

[14:47] >> General benchmarks are very rarely to

[14:49] like likely to give like good enough

[14:52] signal on on the exact work that you're

[14:54] doing which is

[14:55] >> out of distribution and is necessarily

[14:58] almost like eval become very proprietary

[15:00] to your company like they're an

[15:02] important part of your IP, right? your

[15:03] intellectual property,

[15:05] >> right? And another interesting question

[15:09] here is how how do we get our test

[15:12] cases, right? Um, and so I think I mean

[15:17] there the obvious answer is just label a

[15:20] bunch of data, right? You get data, you

[15:22] label data, you sample data from

[15:23] production to make sure as your system,

[15:26] you know, as time goes on, the data the

[15:28] shape of the data doesn't change.

[15:31] >> Um, yeah, let's let's talk about that.

[15:32] like what is what is your actual actual

[15:34] loop for doing that in in this method?

[15:36] So you have like some app running in

[15:39] production

[15:41] and you have some like codebase

[15:45] and then you have some users somewhere

[15:48] using your thing. Right.

[15:49] >> Right. Right.

[15:51] >> Um I don't know why these are going to

[15:53] be these colors but um I love it. And

[15:55] you kind of have this loop of like,

[15:57] okay, you you you manage and then I

[15:59] guess like we can add one more. We can

[16:01] have your like engineering team.

[16:04] >> Yeah.

[16:04] >> What color did they get? I guess they

[16:06] can be blue. And so you have users using

[16:09] production and giving you feedback. And

[16:12] then you probably also have some kind of

[16:14] thing where like you're just pulling

[16:16] data from production on some regular

[16:17] basis. And all of these things happen to

[16:20] be like changes in your codebase which

[16:22] contains you know your prompts your

[16:25] pipelines and your evals.

[16:29] >> Exactly.

[16:30] >> I'll call them test cases since eval is

[16:32] a little bit but yeah. Okay.

[16:35] >> But something that I think and I'm

[16:36] curious to get your take on this Dex.

[16:38] You can kind of cheat a little bit with

[16:40] this because label data is expensive. um

[16:43] you do need a golden set and you need to

[16:45] evolve that golden set over time. But

[16:48] when you're doing something like

[16:50] changing out a model because of a

[16:52] deprecation or an improvement or

[16:53] whatever,

[16:55] the question that you're trying to

[16:56] answer is not actually how accurate this

[16:59] model is. It is how does it compare to

[17:03] the current model in production.

[17:05] >> Yep. So for instance, so you can just do

[17:08] essentially a diff, right? So, if you

[17:11] have a model where say you're running, I

[17:15] don't know, Sonnet 4 or Gemini 2.5.

[17:17] Let's say Sonnet 4 because it's easier

[17:18] to say Sonnet 4 and you run Sonnet 5

[17:21] against it.

[17:23] If the results agree one to one, you

[17:27] don't if because Sonnet 4 is in your

[17:29] production system right now and if it's

[17:31] good enough and Sonnet 5 agrees, you can

[17:33] run these diffs on

[17:36] thousand cases really really really

[17:38] easily or 2,000 or whatever because you

[17:40] don't actually need to handle label any

[17:42] of the data,

[17:43] >> right? All right. So you can get a very

[17:44] very quick Yeah, you can get a very

[17:46] quick signal about

[17:50] >> is this really how similar is this to my

[17:52] current system? And if it's the answer

[17:54] is very very similar again the once

[17:57] you've defined what good enough is

[18:00] right. So you say it it's okay if it

[18:01] differs in 2% 5% whatever the case is

[18:04] you have to decide that and then once

[18:05] you decide that like just checking those

[18:09] diffs is really fast and really cheap

[18:12] and the ons

[18:16] >> so looking at

[18:20] the difference in

[18:22] output from your incumbent model with

[18:25] your candidate model if they're the same

[18:28] right if all the results are the same

[18:31] then there are no diffs, right?

[18:33] >> What what does our output look like in

[18:35] this case? Is it a is it a structured

[18:37] object? Is it a plain text summary? Like

[18:41] like help help me understand like just

[18:43] like a little bit more the the shape of

[18:44] the inputs and the outputs to this

[18:46] problem like what is what is a what does

[18:48] an average test case look like?

[18:50] >> Yeah, I mean that's a great point. Uh

[18:53] what I what we do is all not all

[18:57] a lot of what we do is structured

[18:58] extraction. So um because we're

[19:01] extracting medical facts, we're

[19:03] extracting surgeries, we're extracting

[19:05] doctor's names, stuff like that. So it's

[19:06] structured extraction. Um and so

[19:11] that's a pretty straightforward case of

[19:13] you know right versus wrong or these two

[19:15] are equal. Free text summary is a lot

[19:19] more challenging,

[19:21] >> right?

[19:22] Because in JSON data you can have you

[19:24] can have an object and you can say you

[19:26] know like patient name something

[19:30] >> uh you know uh you diagnosis

[19:35] is some like enum or whatever it is I I

[19:38] don't know and so you can take this like

[19:40] long like sort of like unstructured

[19:44] maybe it's an image or a scan of a

[19:46] doctor's notes or whatever. I'm I'm

[19:48] being very very loose here, but you want

[19:50] to see can I turn this if I if I take

[19:52] this input document, does it generate

[19:54] this structured JSON? And you basically

[19:56] just have like a thousand of these you

[19:58] said, right?

[19:59] >> Yeah. Or however many you want,

[20:00] >> right? Yeah.

[20:04] >> And

[20:06] handlabeling those, getting a golden

[20:08] data set from those is expensive, right?

[20:11] That's hard,

[20:12] >> right? having a human read it and then

[20:14] go fill out a form and then you save

[20:16] that somewhere and then it becomes a

[20:18] test case.

[20:19] >> Exactly. That's that's timeconuming and

[20:22] expensive.

[20:22] >> Yep.

[20:24] >> Running two LLMs in parallel on a

[20:27] thousand documents and just comparing

[20:28] the JSON output

[20:31] is very fast and cheap. And that gives

[20:33] you your initial answer of how similar

[20:37] is the output from these. Right? So that

[20:39] gives you that answer. It doesn't tell

[20:40] you about like latency and speed and

[20:42] cost. I mean, you can you can do that

[20:44] analysis, but that is kind of a a a

[20:47] shortcut for test cases. And in ones

[20:50] where they disagree,

[20:52] those are the ones I I think are

[20:54] probably the most interesting cases that

[20:55] I would kick to a human or an engineer

[20:58] or an ex a SME, have that person label

[21:01] it, and then add that to your golden

[21:03] data set for like future.

[21:05] Oh, so you look at where Sonnet 4 and

[21:08] Sonnet 5 disagree and you hand those to

[21:11] a human or some subset of them to like

[21:13] confirm whether it's like, okay, is

[21:15] Sonifi actually worse at this or did Son

[21:17] 5 actually do a better job, but it just

[21:19] didn't match what we wanted to extract.

[21:22] >> Exactly. Cuz my

[21:25] instinct is that those are the

[21:28] interesting cases, right? Those are the

[21:30] hard problems that we need to make sure

[21:32] kind of all of our future models are

[21:33] able to solve correctly as well. Okay,

[21:36] cool. So, we have our outputs old, we

[21:37] have our outputs new,

[21:41] and then we have by looking at both of

[21:43] these, we have like basically like

[21:45] three, we have like two sets. We have

[21:47] the ones where like same answer

[21:51] and then we have ones where we have like

[21:52] a different answer.

[21:56] Um,

[21:59] and so we can then, so the pass rate

[22:01] gives us a very like gut check like are

[22:02] these about the same? But then these

[22:05] actually give you you take these like

[22:06] this set of different answers and you

[22:09] kind of like can go through and like

[22:10] relabel it or like confirm label it or

[22:12] something,

[22:15] >> right? And then that gets added to your

[22:17] kind of ongoing golden data set. And

[22:20] that's a good way to build a golden data

[22:21] set over time.

[22:23] >> And then this goes into your we'll do

[22:24] this. We'll do the 2,00 test cases as

[22:27] like one thing that gets used across

[22:28] both of them, right?

[22:30] >> Mhm.

[22:31] >> The theory makes sense. I'm curious like

[22:34] what have you found that works really

[22:35] well to kind of operationalize this,

[22:37] right? Because like I have a bunch of

[22:39] prompts in our system and you know

[22:41] they're all use specific models to look

[22:44] at coding agent sessions and then decide

[22:46] if they are um

[22:50] decide if they are sorry I was going to

[22:52] write diff

[22:56] uh decide decide if they are whatever it

[22:58] is the next step is being suggested or

[23:00] whatever guidance we need to give the

[23:02] user and like I could go make another

[23:04] version of them and like run the tests

[23:07] and get a pass number or a list of

[23:09] things but like nothing there is

[23:11] actually like snapshotting the outputs I

[23:13] think I think that's what makes like

[23:15] eval

[23:16] from from a lot of like like we like to

[23:19] say like eval are basically just unit

[23:20] tests right and it's the same concept of

[23:23] like Hey, look, like you want to be able

[23:24] to push a button and know in some amount

[23:27] of time like, hey, all of the things

[23:29] that worked last week still work this

[23:31] week. Um, without having to go test a

[23:34] thousand different prompts, like type

[23:36] them into the app, literally.

[23:38] >> Yeah. No, I would I would I've never

[23:40] thought about it framed that way, but I

[23:42] would I would definitely agree.

[23:44] >> Yeah, we used to do we did a we did a

[23:46] migration project uh when I was at

[23:49] Sprout. I wasn't like on this project

[23:50] but they presented it at like the

[23:52] engineering meeting where we had this

[23:53] like old API in Django which is a Python

[23:57] framework and we had like moved some

[24:01] like 10 endpoints to Java right and so I

[24:06] was like okay the highest volume

[24:07] endpoints we want to use a like a higher

[24:09] performance programming language that

[24:10] easier to optimize and easier to

[24:12] maintain and has like strict type

[24:14] checking. This was in 2015. So like

[24:16] there was no there was no types in

[24:17] Python. It like it was like basically a

[24:19] research paper that no one had done

[24:21] anything with yet. Uh and so we had this

[24:24] and and we did this and basically what

[24:25] we did was we like took a sample of real

[24:28] production traffic. So like in in your

[24:31] log you have like git slashendpoint and

[24:33] the response.

[24:35] Uh actually you just had git/endpoint

[24:37] postendpoint

[24:39] etc etc. You had like you know thousands

[24:41] of requests. You could just pull these

[24:42] from the log. So like when the app is

[24:44] being used, pull a ton of examples of

[24:46] this. And then what we would do is this

[24:49] was our data set.

[24:51] >> Mhm.

[24:53] >> And then what we would do is we would we

[24:54] wrote a script that would basically

[25:00] it was like step one was like replay the

[25:02] requests

[25:03] against the Python.

[25:07] to replay the same requests

[25:12] against the Java.

[25:16] Uh, and you would get out of this, you

[25:18] would get like basically you would get a

[25:20] like progressive diff where it was like

[25:23] if the like HTTP status was different,

[25:27] we would kind of like abort any more

[25:29] like diffing. Basically like, okay, if

[25:31] one of them got a 200 and one of them

[25:32] got a 500, then like cool, we have to

[25:35] like go fix that. And then it was like

[25:37] the response body.

[25:39] >> Uh, and then we would diff that. And

[25:41] then there was literally just like a

[25:43] giant table of cases of all of this data

[25:46] of like status.

[25:49] Oh my god. Okay, let's do this. Status

[25:54] body. And then we also had like a

[25:56] latency number, right?

[25:58] >> Mhm.

[26:02] >> Um, so we skipped the manual labeling

[26:04] part of this. We just like took real

[26:05] production traffic and like pushed it

[26:07] through the system after there was like

[26:08] manual labeling but it was like someone

[26:10] wrote five test cases for like they

[26:12] wrote one happy path test case for each

[26:14] endpoint. Uh and so like this would be

[26:17] like a pass, this would be a fail and

[26:21] then we would have like latency old,

[26:23] latency new.

[26:27] Um

[26:29] and so like obviously if this was slower

[26:32] it would fail. Mhm.

[26:34] >> Or I guess I guess we can have like

[26:36] latency. We can have like also like a

[26:37] latency pass, right?

[26:43] >> And if there was a body failure, you

[26:45] could like expand this row and you would

[26:47] actually see like the the actual diff. I

[26:51] don't know if I'm going to be able to

[26:52] draw a diff, but you would be able to

[26:55] see basically like, hey, cool. The old

[26:57] one had uh

[27:01] uh how are we going to do this?

[27:05] You know, this a bunch of stuff was the

[27:06] same.

[27:08] >> Mhm.

[27:08] >> And then you would have like okay, the

[27:10] old one has, you know,

[27:15] the old one had this stuff in it

[27:19] and and then the new one had uh this is

[27:22] really dumb to try to do this in Excal,

[27:25] but you get where I'm going with this.

[27:26] Yeah, I'm impressed how fast you're

[27:28] coming up with this on the fly.

[27:31] >> Uh I mean, like I said, I didn't come up

[27:32] with this. I just watched some someone

[27:34] smarter than me.

[27:35] >> No, I mean come up with a way to do this

[27:37] in Excala draw on the fly.

[27:40] >> Uh you know, it's one of my one of my uh

[27:44] lame superpowers.

[27:46] Uh and so you could go any engineer

[27:48] could go and look at this and they could

[27:49] say like, "Okay, that's a false. I don't

[27:51] care if the time stamps are different."

[27:52] Like we actually don't care. We actually

[27:54] ended up building systems to like strip

[27:55] out all the things that like

[27:57] >> didn't need to be diffed. basically was

[28:00] like okay if these two things are

[28:01] different basically just like slurp all

[28:03] the fields we don't care about out of

[28:04] the JSON and just diff the meaningful

[28:06] stuff

[28:07] >> and then you know you would have a giant

[28:09] table of these things right so you have

[28:11] pass fail you would have you know

[28:14] hundreds or thousands of cases here of

[28:16] like different things that an engineer

[28:18] could go in and uh you know go inspect

[28:22] and they literally just did this they

[28:24] just ran this and they pulled in new

[28:26] traffic every week and when it was all

[28:29] green. Then they did the cut over and

[28:31] then they moved all the traffic to the

[28:32] new service. But they basically got to

[28:34] like ghost test this thing

[28:36] >> in uh I don't I don't know how they did

[28:38] the post request, right? Because you

[28:40] can't take customer traffic and like

[28:41] redo because it it was like sending

[28:43] tweets and you don't actually want to

[28:44] like resend a tweet. So there's some

[28:46] there's some art here of like how do you

[28:48] how do you give the system under test

[28:50] kind of like

[28:51] >> make sure it's not actually interacting

[28:52] with the outside world because otherwise

[28:54] you're like doubling the amount of

[28:55] traffic.

[28:57] Um,

[28:57] >> yeah.

[28:58] >> But, uh, yeah, this was this was how we

[29:00] did it. And I imagine doing this with AI

[29:02] is like very similar where you basically

[29:03] get a big table full of diffs.

[29:07] >> Yeah. Yeah. That's that's how I would

[29:09] continually kind of build my golden data

[29:12] set.

[29:13] >> Um, yeah. So, I've got so I built kind

[29:17] of a really slow version of this. I have

[29:20] a demo, Dex.

[29:21] >> Amazing. I don't know why you're letting

[29:22] me share the screen the whole time.

[29:24] because you're just you're you're just

[29:25] that good at Excaladraw.

[29:27] >> I hope that's not what I end up being

[29:28] known for.

[29:29] >> So, what we have is this is structured

[29:32] extraction. I've got a bunch of test

[29:35] cases just pretending to extract

[29:37] receipts. This is all this is all made

[29:39] up data. And the point here is not which

[29:42] model is better because again, this is

[29:44] made up data. So, when one model is is

[29:48] it says it's wrong, it might actually be

[29:50] correct. So it's this isn't a lesson on

[29:52] which model would I um suggest using.

[29:55] This is just how do you build a system

[29:57] that can answer these questions. So we

[29:59] have a bunch of test cases here, right?

[30:01] I think there are 30 test cases

[30:05] and

[30:07] then in our clients

[30:09] we have where we can see so a lot of

[30:12] what's interesting is when I was kind of

[30:13] playing around with this our a lot of

[30:14] our repo uses GPT40

[30:17] which is not deprecated technically the

[30:20] endpoint is still alive but it is

[30:23] disappeared from OpenAI's website the

[30:25] pricing information is really hard to

[30:27] find it it like they pretend it doesn't

[30:30] exist even though it still does for now.

[30:33] I'm sure it'll be deprecated eventually.

[30:35] >> So, if we're pretending that we have a

[30:37] system that's running on GPT40 and we

[30:39] say, "Hey, like I know it's going to be

[30:40] deprecated or there are a bunch of new

[30:42] models that have come out. Let's see how

[30:44] they perform."

[30:46] >> Can you code a little bit by the way?

[30:48] >> Yeah. Yeah, definitely.

[30:50] >> Thanks.

[30:50] >> I forget I forget how big my screen is.

[30:53] >> Yeah.

[30:53] >> Okay. Is that good?

[30:55] >> Yep.

[30:56] >> All right. So we see here's our

[30:58] incumbent

[30:59] and then we have a bunch of candidates,

[31:02] right? So we have 40 mini which you

[31:05] would just replace if if you want you

[31:07] know faster or cheaper. We have more

[31:10] GBT55 and then we have a bunch of you

[31:12] know sonnet 36 flash 35 flash and then

[31:15] 35 flash light right and you can just

[31:18] make whatever clients you want.

[31:20] Um

[31:22] and so then we have our actual prompt

[31:25] which is just essentially extract the

[31:29] expenses from this receipt

[31:33] and we have the expense policy that gets

[31:35] dumped into the prompt,

[31:37] >> right?

[31:38] >> Very straightforward

[31:39] >> instructions and then you got your your

[31:40] output schema,

[31:42] >> right? And then so going back to kind of

[31:44] what we decided what we talked about

[31:46] before of like

[31:50] what do we care about and what do we

[31:52] consider failure or success to look

[31:54] like, right? I said

[31:57] I care about accuracy, the cost and

[32:01] latency. Those three dimensions are what

[32:03] I want to measure all these new models

[32:04] against.

[32:06] And I created a budget class that has

[32:10] the max. So these are our like our

[32:12] gates, our thresholds, right? So max

[32:16] accuracy drop allowed is zero.

[32:18] >> Yep.

[32:19] >> Max cost multiple 20% more and latency

[32:22] uh P95 latency 50% more.

[32:26] And again like you can this is the hard

[32:29] part of deciding what good enough looks

[32:31] like I think right I think that's the

[32:32] hardest part of this because you can

[32:34] change this to whatever you want right

[32:36] you can change this to 0.9 and the point

[32:39] is that is I would argue kind of the

[32:42] most important part of this and also the

[32:44] hardest and so you make it really really

[32:46] easy to change things and to swap other

[32:49] numbers in.

[32:51] Okay,

[32:51] >> so this is the budget and then

[32:55] if we go to our the gate.

[32:58] >> Okay, so this is your Python harness

[33:00] that is actually like executing these

[33:02] evals.

[33:03] >> Yes, exactly. And what you can do is you

[33:07] can create a gate that has these checks.

[33:11] So here we've got a data class called

[33:13] check. And you can see okay, if I go up

[33:16] to the definition of the data class,

[33:18] right, we have

[33:21] the name, okay, which is essentially

[33:23] pass or fail, and then details. And then

[33:26] we have the overall result of the the

[33:29] gate, so to speak.

[33:32] >> And all you have to do is

[33:36] you have the accuracy check and then you

[33:38] define okay as less than equal to that

[33:41] max accuracy drop that we just looked

[33:42] at.

[33:44] >> Okay.

[33:44] >> And you have the same for latency. And

[33:47] then cost. I had to create a little

[33:51] helper function for cost because if I

[33:54] just did it like the other two an

[33:57] unpriced model would have passed and we

[33:59] don't we don't want that. So this has a

[34:00] little kind of right if cost per call is

[34:03] none or uh baseline cost per call. So if

[34:07] either of the models cost per call is

[34:09] none then you know we fail it

[34:11] essentially.

[34:13] >> So

[34:14] >> this is just three checks. And what's

[34:16] what's nice about this is

[34:17] >> surfacing to the person who's reviewing

[34:19] the results like by the way we can't

[34:21] give you any info on cost here. We

[34:22] cannot tell you that. Yeah. Okay.

[34:25] >> And and this works really really well

[34:28] because you can see how easy it is to

[34:30] add another check. Right. If you wanted

[34:32] to check I I don't know like uh the

[34:37] median latency and in addition to P95,

[34:40] you would just add another check. you

[34:42] would add it to the budget and then you

[34:45] would have then added it to your gate.

[34:49] >> Okay.

[34:50] >> Um and so the CLI actually runs it and

[34:56] we can I can show you what that looks

[34:59] like. So let's see. So uh let's see.

[35:03] I've got a couple commands. Let's see.

[35:05] It's UV around Python.

[35:12] So this is when I ran everything

[35:14] >> inspecting the data.

[35:16] >> I'm sorry.

[35:17] >> This is inspecting the data you already

[35:19] collected.

[35:20] >> Yes. So this I mean it's cached. So I

[35:23] wouldn't wouldn't have to sit here and

[35:25] watch it run, right?

[35:26] >> Yeah.

[35:27] >> But

[35:29] if it's not cached, it would run all the

[35:32] different models that we had as our

[35:33] candidates. it would run them against

[35:36] the gates we just looked at, right? And

[35:39] so we can see here this is our

[35:40] candidate, right? Obviously latency and

[35:43] cost 1x that's a good check, right?

[35:47] >> Um and we can look at all everything

[35:49] else here, right? So we can look at

[35:50] okay, so sonnet got a perfect accuracy,

[35:54] but the latency is two it's it's 2x

[35:59] latency and 1.6 times the cost. That's

[36:04] too expensive,

[36:05] >> right? And we can and and there's

[36:08] another command that'll

[36:09] >> and slow. It's twice the uh it's twice

[36:12] the time, half the speed.

[36:14] >> Not worth a 3.3% accuracy increase,

[36:20] >> right? Or maybe it is, right? I would I

[36:24] would say it's not. And it's probably

[36:25] not, but that's the kind of thing like

[36:27] you know your system. If you're running

[36:29] a BTOC company with millions of users

[36:32] and a 1% difference means a million

[36:34] dollars, then maybe it does make sense.

[36:36] >> Exactly. Maybe it does make sense. And

[36:38] that's that's the hard part. And that's

[36:40] why this is so interesting, right?

[36:41] Because you can easily swap these

[36:43] numbers out and you can get you'll this

[36:46] entire table will change. Um, and for

[36:48] this instance, 3.5 flashlights, it only

[36:51] won that one. It it's it's faster,

[36:54] cheaper, and better. So it wins on all

[36:57] three dimensions.

[36:59] >> But incredible.

[37:00] >> Again, these are just madeup numbers, so

[37:01] it might actually be worse. Who knows?

[37:03] >> Um, but the latency is real.

[37:06] >> I did run it, but I didn't handle label

[37:09] all the test cases.

[37:10] >> I see. Okay. Okay.

[37:11] >> So, yeah, the test cases are generated.

[37:14] >> Yeah.

[37:15] >> Um, but the latency and cost numbers are

[37:18] real.

[37:19] >> Yeah. Cool. How many test cases is this?

[37:23] >> 30.

[37:24] >> 30 test cases. Nice. Yeah. Yeah. But

[37:26] what's neat is if you do this, right, if

[37:28] you run uv run python

[37:33] harness dot uh yeah dot show gate and

[37:38] then you do you can change the latency.

[37:42] Actually, let's just run show gate. And

[37:45] that shows

[37:47] everything that passed or failed. Right?

[37:49] So I've got two two gates that I defined

[37:52] in the budget. One is survive the swap,

[37:56] which is yes, we can kind of just swap

[37:59] it in. Another is does it actually drop

[38:01] our costs, right? Like if you know

[38:04] that's the that answers the question,

[38:05] can we replace things with haiku or

[38:07] flashlight?

[38:09] >> So, uh where was I? Doesn't matter. Um

[38:13] >> okay, so you could and that's useful if

[38:15] you want to run this against a 100

[38:16] models basically with a small test set

[38:18] and just basically say like cool, I

[38:20] don't want to I don't want to read a

[38:21] table of 100 results. just filter it to,

[38:24] you know, max latency is x or y.

[38:27] >> Mhm.

[38:28] >> Or max cost is, you know, 50% or less of

[38:31] the baseline.

[38:32] >> Right. Right.

[38:35] Uh and then what you can do is you can

[38:39] just change one of the variables. So you

[38:41] can do latency

[38:43] 3.0 and say actually I'm okay with the

[38:46] latency being three. And you see life,

[38:50] >> right? Three times as slow.

[38:53] here Gemini 3.5 flash and 3.6 six flash

[38:57] now pass, right? So you can change that

[38:59] >> really rich data for every single

[39:02] execution to be able to do this. Huh?

[39:06] >> Because you need P95, right?

[39:09] >> Yeah, but that's not that hard. It's not

[39:11] that hard to get those.

[39:12] >> Can we look at what the data looks like?

[39:14] Like is this just like a big JSON blob?

[39:17] >> Uh

[39:19] we uh yeah.

[39:23] Okay. Okay, cool. So it's actually just

[39:25] aggregate for the run. You're not you're

[39:26] not storing the result of every single

[39:28] case, right?

[39:29] >> No, no, no, no.

[39:30] >> Okay. And you're not catching the actual

[39:33] like logic failures basically.

[39:35] >> Mhm.

[39:37] >> Yeah.

[39:39] >> Nice.

[39:39] >> So, um but again, right,

[39:44] this is what makes this really nice is

[39:47] you can play with these parameters and

[39:48] you can instantly see which ones pass,

[39:50] which ones fail.

[39:52] Have you tried uh plotting this in in in

[39:55] 3D space or 4D space?

[39:58] >> No, I haven't. I have not.

[40:00] >> Do you have uh do you have Opus 5 on

[40:03] here? Do you have a Do you have a Cloud

[40:04] Code shell?

[40:06] >> Oh, do I?

[40:08] >> This is always my favorite. I They've

[40:10] gotten quite uh surprisingly good at

[40:12] data visualization.

[40:14] >> That is surprising. All right.

[40:15] >> Can you build?

[40:16] >> Yeah, go for it.

[40:19] What should I what should I ask?

[40:22] >> Let's uh let's say uh can you build me a

[40:25] visualization of matri you do like

[40:28] atmatrix.json

[40:33] uh JSON like in 3D on a on a grid I

[40:39] don't know in 3D as an HTML as a static

[40:42] HTML file.

[40:46] Yeah, let's try it.

[40:48] So while it's doing this, another thing

[40:49] that you can do that I tried and that

[40:52] didn't work for my specific case

[40:55] is

[40:56] BAML has a prompt optimizer built in. So

[41:00] if you so one of the things I played

[41:02] with was, you know, like we said, Sonnet

[41:04] 5 was perfectly accurate but a lot

[41:07] slower and more expensive. So you can

[41:10] run the optimizer on just the token

[41:13] input, the input and output tokens. And

[41:16] so what you you can build into your

[41:18] harness like because in our case 3.5

[41:22] flashlight wins on all axes. So you're

[41:24] like great just swap it out.

[41:25] >> Drop it in

[41:26] >> right.

[41:27] >> Oh but if you have like uh what is it

[41:28] they call it like the paro frontier of

[41:30] like one of them is the cheapest but

[41:32] another one is the fastest and the other

[41:33] one is the most accurate then you can

[41:35] kind of try to optimize across those.

[41:38] >> Exactly. And

[41:40] if you're stuck in a situation where

[41:42] your model is deprecating

[41:45] >> Yep. and you have to switch a model and

[41:48] so you have to decide between

[41:51] you know these different situations

[41:52] where no one strictly wins. You can run

[41:55] that Jeepa optimizer and it can take the

[41:58] different pieces of the frontier and

[42:00] create what is you know ideally an

[42:02] optimized prompt that that is your kind

[42:04] of your best of all three. So that's a

[42:07] really neat thing that you can do and

[42:09] the whole point of this is model

[42:11] deprecations are announced far in

[42:13] advance and that can either be

[42:18] uh a two week scramble where you're

[42:20] trying to change everything it can be a

[42:22] P0 or it can be

[42:26] 30 minutes or an hour on a Tuesday

[42:29] morning right so

[42:32] >> you it's you know these things are going

[42:34] to get deprecated and So you build your

[42:37] systems in a way that expects it and

[42:39] makes it easy to to upgrade is is the

[42:42] lesson of this whole thing.

[42:44] >> Yeah. No, this is great. I mean this is

[42:46] this is the proper engineering, right? I

[42:48] don't know. I've worked with some teams

[42:50] in uh early human layer days. We did a

[42:53] we did some more like forward deployed

[42:55] of like working with larger companies of

[42:56] like hey how do we figure out our AI

[42:58] problem and it was like

[43:00] >> the the engineers were just like kept

[43:02] trying new prompts and new models and

[43:04] new tricks. I just like can we get this

[43:06] to work well does it work over here and

[43:08] it was like okay one day like one like

[43:10] of the product managers like test cases

[43:12] was working and then a week later like

[43:14] three of them were broken and there was

[43:16] three other ones that were now working

[43:18] and you're just kind of like flailing a

[43:20] little bit. Um,

[43:23] >> all right. Tell it to open it in your

[43:24] browser.

[43:26] >> Um, and what I did was I was like, you

[43:28] need to label some data. You need

[43:30] someone to like make a spreadsheet of

[43:32] like 30 of these cases. Not that it's

[43:34] going to take you a day or two. It's

[43:36] going to suck.

[43:37] >> But then anytime anyone makes a change,

[43:39] you'll be able to get one number that

[43:42] says this is crazy. [laughter]

[43:44] >> Wow. Oh,

[43:45] >> yeah. I think you can drag it around

[43:47] too. And there may be like hover.

[43:48] >> That is bananas.

[43:50] >> Yeah.

[43:52] So there's flash right all the way up in

[43:54] the very top corner.

[43:56] >> Oh yeah. Yeah. You can see that. That is

[43:58] so cool.

[43:59] >> I mean this is this is not that useful

[44:01] of of a visualization because they're

[44:03] all kind of clustered together. But

[44:04] yeah, this is the this is the

[44:06] >> these are some of the things you can do.

[44:08] >> But they're they're not though. All

[44:09] right. I mean these all are. But you can

[44:11] see 5.5 is way over here.

[44:13] >> Yep.

[44:14] >> Flashlight is up here and 4 point or 40

[44:17] mini is way down here because we don't

[44:18] have the costs. So it kind of just

[44:20] doesn't measure on that axis. But still

[44:22] like this is really cool.

[44:24] >> And if I were presenting this to um a

[44:28] non-engineer or a PM or you know a a

[44:32] engagement manager or solution, someone

[44:34] who's not in the code every day, this is

[44:37] how I would present it. Absolutely.

[44:39] >> Yeah. I would probably say there is a

[44:42] there's a projection of this of like

[44:45] okay just take the ones that got 100%

[44:47] accuracy and show them on a 2D grid

[44:49] versus yeah

[44:50] >> whatever else you're looking at. But

[44:51] like yeah in general like uh the the

[44:54] models have gotten good and so it's like

[44:56] again you can't you can't build this

[44:58] visualization if you don't have the data

[44:59] and you can't generate the data unless

[45:01] you know what accuracy looks like. I

[45:02] mean latency and costs are easy right?

[45:04] Those get basically like any any any

[45:06] programming language, any model can just

[45:08] like vibe out latency and cost stats,

[45:10] but like the accuracy stats is the

[45:12] really hard part. And like without that,

[45:14] none of this is really that useful,

[45:16] >> right? And I think

[45:18] >> my temptation as an engineer is to just

[45:22] is to not want to label data because

[45:25] it's boring and it takes a while.

[45:27] >> Yeah. But it is very very important to

[45:30] have a golden label data set. Yep.

[45:33] Someone says, "Uh, try do a 2D viz on

[45:35] accuracy versus cost with P95 boundary

[45:38] lines."

[45:46] >> What else we got in the chat? What else

[45:48] do you guys want to see? We're going to

[45:49] play uh we're going to play spend spend

[45:52] Kevin's tokens.

[45:54] >> My favorite game.

[45:56] and P95.

[46:05] >> This is fun.

[46:06] >> Anyways, um yeah, this is super helpful.

[46:08] I mean, like it's kind of the same thing

[46:09] we say every two or three months. We

[46:11] come back on the show and be like, "Look

[46:13] at your data, label your data, test your

[46:16] stuff." And like again like we said even

[46:18] on the very early evals episode um

[46:22] uh exactly what Vonyy said, is there an

[46:24] intuitive way to know which models would

[46:25] work for your use case instead of going

[46:26] through evals every time? Like yes,

[46:28] before you go build a giant label data

[46:30] set, you should do a little bit of

[46:31] vibes. you just like paste the same

[46:33] paste one one case that you care about

[46:35] of like hey let me just drop this photo

[46:37] of a driver's license and do the same

[46:39] prompt with five different models and

[46:41] just read the outputs

[46:43] >> and see what's different or like diff

[46:44] the outputs across the models and like

[46:46] that intuition is always useful uh and

[46:49] it's always worth like building up and

[46:51] then again we did with the with the with

[46:53] the JP Morgan like emails or the the

[46:55] Enron emails thing of like we did one to

[46:57] test it and then we did 10 and then we

[46:59] refined it a little bit and then we did

[47:00] a hundred and we refined mind a little

[47:02] bit more. And so it's like, yeah, you

[47:04] should always start from vibes and you

[47:05] should always look at the actual data

[47:07] and then you slowly grow your leverage

[47:09] as you get more confidence and you go

[47:11] from 50% to 80% to 90% to 95% to 99%.

[47:16] >> Well, one other thing is when you say go

[47:18] on vibes, right, the as you continue

[47:21] doing this, the cases where the models

[47:23] have disagreed in the past become

[47:25] really, really good cases to check vibes

[47:28] on it at the beginning when you have a

[47:29] new model come out. Yep. Um, Ram has a

[47:33] question. Any advice on how to do this

[47:35] with summaries instead of structured

[47:36] data? Like if the outputs of your model

[47:38] are unstructured?

[47:41] >> That's a great question. Summaries are

[47:43] hard. I mean, you can do

[47:46] there there are a couple of of ways you

[47:48] can do it, I think, depending on

[47:52] the goal of your summary.

[47:55] Um, and one and the most obvious thing

[47:57] to do is an LLM as a judge. So, you have

[47:59] an LLM as a judge. just pick which is a

[48:03] quote unquote better summary and you

[48:05] make sure that you have a really fleshed

[48:06] out definition of what makes a summary

[48:08] better for your use case and then you

[48:11] just have it essentially pick which you

[48:13] know which model is better.

[48:16] Um, and then the second one is

[48:20] depending on, and this is kind of I

[48:21] think rare and maybe more kind of niche,

[48:24] but if you have a summary that has a lot

[48:27] of structured information in the

[48:28] summary, you can then ex have another

[48:32] layer that just extracts the summar the

[48:34] the structured information and that is

[48:37] what you check. So you make sure none of

[48:39] the important information is

[48:40] hallucinated or lost.

[48:43] And again, that's more specific, but I

[48:47] have seen that use case before where you

[48:49] have um you know, you're writing, say

[48:51] you're writing emails where you have

[48:54] information pulled in from a lot of

[48:55] different contracts or things like that.

[48:58] >> Yeah. Um that's essentially a summary,

[49:01] but what you really care about is that

[49:02] the structured information in that email

[49:05] is correct.

[49:06] >> Right.

[49:07] >> But I'm I'm curious to hear, Dex, if you

[49:08] have any other thoughts as well.

[49:09] >> Yeah, I mean it's something basically

[49:11] along those lines, right? I mean, and we

[49:12] did this in the like uh doing evals on a

[49:16] on a on the email data set too is like

[49:18] you will want to

[49:21] turn it into structured data at some

[49:23] point. Um I think some people have for I

[49:27] think most people understand that asking

[49:28] a model to score something on like a 1

[49:30] to 10 scale like doesn't really work

[49:33] that well. Um yeah, but that but that if

[49:37] you can tell the model like okay does it

[49:38] have this characteristic? Does it have

[49:40] this characteristic? Does it include

[49:42] this data point? Okay, how many times

[49:44] does this thing is this thing mentioned?

[49:47] And you can basically turn the even if

[49:49] the answer is is is free text and the

[49:51] thing your product exposes to users is

[49:53] free text, you can still do structured

[49:55] output on that unstructured data so that

[49:57] you can process it in a program. Um, and

[49:59] we do this for ranking algorithms. All

[50:01] the way we run the AI tinkerers website,

[50:03] right, is like everybody who signs up

[50:04] for an AI tinkerers event gets a zero to

[50:07] a,000 score across a bunch of different

[50:09] dimensions. And it's like how often like

[50:11] are you pushing to GitHub and like do

[50:13] you have like software engineering in

[50:15] your LinkedIn and all this stuff to try

[50:17] to tell like are you an active builder

[50:19] who's going to have interesting things

[50:21] to share and interesting things to teach

[50:23] the other people. But it's all comes

[50:24] down to like take this giant blob of

[50:27] data of like unstructured and structured

[50:29] and this whole mix and turn it into like

[50:31] a like scores on a giant rubric, right?

[50:35] yes or no, boolean or like enum

[50:37] classifiers, uh maybe counting, um

[50:41] things like that. Some of it you don't

[50:42] even need a model for, right? You can

[50:44] take, hey, cool, like go get this

[50:46] person's commit history, turn that all

[50:48] into a number completely deterministic,

[50:50] and then just include that in the score.

[50:52] Um, but you want to make the actual

[50:54] output of the the accuracy score be as

[50:56] deterministic as possible. Whether the

[50:58] model's output is structured or whether

[51:00] you do structured output on top of what

[51:02] the model output.

[51:05] Yes. I think this is how like the very

[51:07] early days of like generic eval

[51:09] platforms for chat bots would do is like

[51:11] they would always give you like a a

[51:13] sentiment score and it's just like if

[51:15] the user seems angry you get you get you

[51:18] get one enum and if they seem happy you

[51:20] get another enum and like that goes into

[51:22] the score of how is the chatbot doing.

[51:25] >> Yeah. Yeah.

[51:27] >> Um so that's the name of the game.

[51:29] That's the same show the same show every

[51:32] single week is uh do structured outputs.

[51:34] There is no magic. Everything in AI

[51:36] engineering is structured outputs. Uh

[51:38] everything else is just uh more

[51:41] abstractions that you might not need.

[51:43] >> That's right. Just window dressing

[51:44] around that. That's how you make that

[51:46] works.

[51:47] >> Amazing. Thank you all so much for

[51:49] coming. Uh next week's episode, we might

[51:51] talk about slop code bench. We might

[51:53] talk about something else. We got a lot

[51:54] of fun topics in the hopper. Uh Kevin

[51:57] will be yelling at me and Vibb on Slack

[51:59] to get us to pick something and then we

[52:01] will publish it and we will tell you

[52:02] what it is. But I guarantee you it's

[52:03] going to be dope. So, thank you all for

[52:05] coming and we'll see you next week. Bye

[52:07] everyone.