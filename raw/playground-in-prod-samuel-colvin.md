---
title: "Playground in Prod: Optimising Agents in Production Environments — Samuel Colvin, Pydantic"
author: "AI Engineer"
source: "youtube.com"
url: "https://www.youtube.com/watch?v=A48uhxfxbsM"
date_saved: "2026-05-09T02:06:44.775Z"
---

# Playground in Prod: Optimising Agents in Production Environments — Samuel Colvin, Pydantic

[0:14] I'm Samuel. I'm probably best known as

[0:16] the creator of Pyantic, the the open

[0:18] source library. Now I run Pyantic, the

[0:20] company. We do a bunch of stuff. Um,

[0:23] Pantic, we still maintain Pyantic

[0:25] validation, of course. We have Pantic AI

[0:27] the agent framework and then we have

[0:28] pidantic logfire our observability

[0:30] platform. How many people coming into

[0:32] this know have heard the word pyantic

[0:34] just just to okay that's reassuring um

[0:37] and how many people have at some point

[0:38] played with panti yeah pyance kai and

[0:42] logfire

[0:44] okay so most people um logfire is

[0:47] fundamentally under the hood a general

[0:48] observability platform open telemetry

[0:50] logs metrics traces I don't really

[0:53] believe in AI observability I think it's

[0:55] a feature not a category and it will get

[0:56] eaten by either observability or AI at

[0:58] some point but today we sell is AI

[1:01] observability because that is

[1:03] understandably the thing that people

[1:04] want um one of so we go beyond like the

[1:08] standard observability of logs metrics

[1:10] traces we do stuff like eval which I'll

[1:12] talk about a bit today and managed

[1:14] variables is one of the one of the newer

[1:16] features um and then the step beyond

[1:19] manage managed variables which we're

[1:21] working on at the moment is then

[1:23] optimizing your agent uh autonomously

[1:25] effectively from the platform that's not

[1:27] what I'm going to demonstrate today I'm

[1:29] going to talk about Jepper and how you

[1:30] can use it with managed variables kind

[1:32] of in a somewhat Heath Robinson way

[1:35] until we have the full end to- end all

[1:37] singing or dancing. You give us uh your

[1:38] money and we magically optimize your

[1:40] agent. Probably also more interesting

[1:42] than the like magically we make your

[1:44] agent better argument. Anyway, um so

[1:48] yeah, there are two there are two um

[1:50] core subjects I'm going to talk about

[1:52] and then I'm going to try and put them

[1:53] together at the end. So Jepper um is a

[1:56] library. How many people here have heard

[1:57] of have heard of Jepper and and sort of

[2:00] feel like they understand what it does?

[2:02] Okay. Well, that that that probably

[2:04] includes me to an extent. Um so it the

[2:06] name comes from uh genetic paro. So it's

[2:09] a genetic algorithm in the sense that it

[2:12] uh looks for the best um value of some

[2:16] kind. Um and then once it's found a good

[2:18] value, it kind of mixes it with some

[2:20] other values that appear to be good and

[2:22] produces a new um candidate and tries to

[2:26] uh optimize that. So it's ultimately an

[2:28] optimization library. It optimizes a

[2:30] string. Now that string can be a simple

[2:32] text prompt or it can be some JSON data

[2:35] which ultimately contains whatever you

[2:37] want. Um and the paro bit comes from it

[2:39] basically takes candidate from the kind

[2:42] of paro frontier of the best uh examples

[2:45] it has. So it is effectively if you're

[2:46] imagine you're breeding raceh horses,

[2:49] you take the best raceh horses and you

[2:50] breed them each time. You don't for the

[2:52] most part go and take some really slow

[2:53] horse and like add it into the mix to

[2:55] see what happens. You take all of the

[2:56] like best resources and breed them and

[2:58] hope to get to to better better

[3:00] resources and it does a similar thing.

[3:02] And then the second is managed

[3:03] variables. So

[3:06] lots of platforms including ours have

[3:08] prompt management. So basically the idea

[3:09] that you can have uh your text prompt in

[3:12] the platform and you can edit it from

[3:14] there. We take uh managed variables one

[3:16] step further. Uh sorry, we take prop um

[3:19] prompt management one step further and

[3:20] we have managed variables. So they don't

[3:22] have to be just text. They can be

[3:23] effectively any object that you can

[3:25] define with a pyantic model can be uh

[3:29] managed inside inside logfire. And so

[3:31] we're going to we're going to kind of

[3:32] try and com combine those two things

[3:34] today. I will say at the beginning of

[3:37] this due to some family situations I

[3:39] wrote most of this talk overnight. So uh

[3:42] maybe in keeping with the rest of this

[3:44] conference, it may be slightly uh

[3:46] chaotic. If I if what I'm saying doesn't

[3:48] make sense or I go to sleep at any point

[3:50] in this talk, please throw something at

[3:51] me and I will endeavor to make more

[3:54] sense.

[3:55] Um so I'm going to talk quickly about

[3:59] the subject that we're going to go and

[4:01] optimize. It has to do with politics.

[4:04] Don't worry, it's not particularly

[4:05] controversial politics relative to

[4:06] what's going on at the moment. But um

[4:09] how many people actually I won't do the

[4:10] how many people. There's a there's a um

[4:12] podcast called um The Rest is Politics,

[4:15] which I'm a big big fan of and a big

[4:16] listener to. They were having a

[4:18] conversation back in April last year,

[4:20] almost exactly a year ago in fact, about

[4:22] how many politicians basically come from

[4:25] like political um dynasties, families of

[4:27] of politicians. And there was a lot of

[4:30] like bluster about what the answer might

[4:31] be. And I used padantic AI to go and

[4:34] analyze the Wikipedia article for each

[4:36] MP to basically look for references to

[4:40] um their relations who were also

[4:41] politicians. And therefore was able to

[4:42] come up with some percentage. I think it

[4:45] might have been 24% of MPs have uh some

[4:48] kind of ancestor who is a who is a

[4:50] politician. But at the time I basically

[4:52] just ran it with whatever model I could

[4:54] get. Got an answer, submitted my

[4:56] question to the rest is politics. They

[4:57] read it out. That was very nice. But

[4:58] like I didn't actually go and check how

[5:00] well it had done. And so here we're

[5:02] going to take um that challenge and try

[5:05] to optimize it to improve the prompt

[5:08] that we use uh the the subtlety. Let me

[5:11] let me go into some code here and and

[5:13] talk through the task. So hopefully this

[5:16] is a scale you can read.

[5:20] Um

[5:21] there's a bunch of uh fluff here. In

[5:23] particular, there's a there's a um

[5:25] archive file here that will be

[5:26] automatically downloaded if you run the

[5:28] script. So you don't have to go and do

[5:29] all the scraping from Wikipedia which

[5:31] just contains the the basically the raw

[5:33] HTML of the Wikipedia pages. Um we then

[5:37] have some schema for for the for the

[5:40] MP's data and then we have schema for

[5:42] their relations. So in particular so

[5:45] this is obviously the name the role they

[5:46] might have had in particular their

[5:47] relations. So whether they're a like

[5:49] sibling or a spouse or a grandparent and

[5:53] in particular with regard to the

[5:54] question that we're trying to answer

[5:56] about

[5:57] uh kind of um political dynasties, it

[6:00] isn't really relevant if someone has a

[6:02] child or a spouse or a sibling who is

[6:05] also a politician. It's to do with their

[6:07] like parents' generation or parents

[6:09] parents basically ancestors. And this is

[6:11] something that I found really hard to

[6:13] get models to

[6:15] um to respect. Once you said relations,

[6:17] it just couldn't help but add spouse or

[6:21] children or uh sister-in-law into the

[6:24] into the mix. And so the way I actually

[6:26] went and solved this last year was I

[6:27] basically said include the relation

[6:29] whatever it is and then afterwards I

[6:31] went through and scanned and removed the

[6:32] ones which were obviously um the same

[6:35] generation or beneath as it were. So

[6:37] here one of the things we're trying to

[6:39] optimize is finding a prompt which will

[6:41] get the agent to efficiently discount uh

[6:46] yeah non non- ancestors.

[6:49] Um so this is a schema we have um we got

[6:52] a task input which is which is relevant.

[6:54] We have some some very basic um initial

[6:56] instructions u for the agent. We have

[6:59] some slightly more advanced instructions

[7:00] so we can kind of see how the two

[7:02] perform. And then ultimately we're going

[7:04] to try to optimize to find an even

[7:07] better prompt.

[7:10] So

[7:12] uh the the core of this is this this

[7:13] pyantic AI agent. Uh it's actually just

[7:16] using a hard-coded model. It's a

[7:17] variable because in theory you can

[7:19] substitute it with the command line, but

[7:21] I don't think we need to today. Um the

[7:24] most interesting bit is that the way

[7:26] that we're doing this is effectively a

[7:27] structured output question. So this

[7:29] could be this is equivalent to any other

[7:31] structured output. find the address in

[7:33] this email, um, find the invoice lines

[7:36] in this PDF, whatever it might be, but

[7:38] we're using the same idea of structured

[7:40] outputs to go and find this this

[7:42] political relation. So, we're just we're

[7:45] just substituting in uh yeah, so we're

[7:47] just we're just setting the output type

[7:49] to be list of uh political relations.

[7:52] Um,

[7:54] we set the instructions from above. Um,

[7:57] and then ultimately when we go and run

[7:58] the agent, all we're doing is taking the

[8:00] HTML, doing a little bit of processing

[8:02] with Beautiful Soup to strip to get out

[8:04] the text. So we don't have to take all

[8:05] of the like other crap going on in the

[8:08] HTML page, and then we're passing it to

[8:10] the agent. And this works surprisingly

[8:12] surprisingly well. If you go and if you

[8:13] go and read through the the cases, you

[8:16] will see that it is pretty damn accurate

[8:17] at finding all political relations. Even

[8:19] the relatively dumb models do a pretty

[8:22] good job. The main place where they get

[8:24] confused is are their relations

[8:26] political versus like otherwise uh like

[8:30] public figures and this idea of a

[8:32] relation being an ancestor seem to

[8:34] really confuse the models.

[8:37] Um you will see if you look in the rest

[8:40] of uh the files here I'm sorry if the if

[8:43] the file explorer is small but um once

[8:46] you run it once you'll have this MPs

[8:48] directory which contains uh a JSON file

[8:51] with um the MPs and the URLs and the the

[8:55] the raw data um and most importantly of

[8:58] all the pages which is the the HTML

[9:00] pages as I say that will just be

[9:02] downloaded and put into that directory

[9:03] the first time you run it. Um

[9:07] yeah, and then there's also

[9:10] this golden relations. So this is

[9:12] supposedly the exactly correct answer

[9:14] for each politician. So

[9:17] um uh Steven Kinnuk has

[9:21] uh I mean for anyone who's British will

[9:22] know a like reasonably famous political

[9:24] name. He has a bunch of political

[9:26] relations. Um

[9:29] uh you see here that again it's included

[9:31] his wife who was the prime minister of

[9:33] Denmark. Even though um I'm seeing some

[9:36] question questions there. I believe

[9:37] that's true. Um even though we we said

[9:40] don't include relations, that's why I've

[9:42] used this technique of basically

[9:44] including those relations and then

[9:45] stripping them out based on what the

[9:47] relation is um

[9:50] etc etc. And this um I believe this is

[9:53] pretty accurate. Truth is we ran it we

[9:55] just ran a similar script with the with

[9:57] the like with Opus 4.6 to get that data.

[10:00] But I've I've checked it quite a lot and

[10:01] it appears to be pretty much correct.

[10:03] And so in terms of the the first step

[10:05] here is to run some evals against this

[10:08] and um

[10:11] uh demonstrate that it's the the like

[10:13] performance relative to the golden data

[10:15] set. But before we do that, I'm just

[10:17] going to run it um

[10:20] run a single case in the terminal and

[10:24] show what's going on just so that you

[10:26] have some feeling for what we're doing

[10:28] here. So I think if I look in task here,

[10:33] uh yeah, if I go um UV run task

[10:39] uh two is the ID of the the first

[10:41] politician for some reason, Steven

[10:43] Kennock, we'll go and run the model

[10:46] and successfully find the two relations.

[10:49] And in this case, we've prompted it and

[10:50] said uh don't include only include

[10:53] ancestors. So it's done that correctly

[10:54] and it's excluded his wife. Um

[10:58] do I mean I guess people want to kind

[11:01] would prefer to to like run along with

[11:03] this and and try this themselves. Is

[11:04] that is that true? Okay. So you will to

[11:07] do that you will need and um

[11:11] you ideally you'd have a logfire account

[11:13] that will allow you to do the managed

[11:14] variable stuff. You can use a free

[11:16] logfire account. The the free tier is

[11:18] extremely generous. So everything you're

[11:19] doing there is free. The other thing you

[11:21] need is obviously an API key to connect

[11:23] to the models. You have two choices

[11:25] there. either in the code we'll

[11:27] basically be using

[11:30] uh padantic gateway as a simple way of

[11:32] being able to access all of the models.

[11:33] So you just see gateway prefix in front

[11:35] of the model name. Uh if you have your

[11:38] own open AI or anthropic key and you

[11:39] want to use that just remove the gateway

[11:41] prefix and it will work. Um if you want

[11:43] to use pantic gateway so that everything

[11:45] just works. I'm just going to generate

[11:47] an API key in Logfire and share it with

[11:49] you all, hence that channel, and put a

[11:53] put a limit on it and hope you don't no

[11:55] one goes and uses it all up before we

[11:56] finish the lesson, finish the finish the

[11:58] workshop. So,

[12:00] um I'm in in Logfire here. I'm going to

[12:03] go into gateway.

[12:05] Um if I had set this up more formally,

[12:08] we could basically invite you all and

[12:09] you could all go and generate your own

[12:10] keys and you'd all have your own limits.

[12:12] I have not prepped that and so I'm just

[12:14] going to generate one key uh with a

[12:16] $1,000 limit and hope we that does the

[12:19] does the job today uh and then delete it

[12:21] after after the workshop. Uh

[12:32] so I'm just going to copy that into

[12:36] this channel here.

[12:38] Um, so you should just be able to uh

[12:40] export that environment variable. Um,

[12:43] and then when you run your code, for

[12:45] example, this this task here, you've

[12:47] rerun task two. Um, you should get get

[12:51] an output there. Um,

[12:55] should I wait a couple of minutes for

[12:57] everyone to the other thing you'll need

[12:58] to do is set up log fire for when you

[13:00] run um the evals. And the the simplest

[13:03] way of doing that is once you've run uv

[13:06] sync in this so you'll be in this

[13:09] directory you'll run uv sync. So note

[13:12] we're in the we're in the subdirectory

[13:13] for this this talk we'll run u sync

[13:17] um and then to connect it to your your

[13:19] project you'll see here my project is

[13:21] called uh demo. So, I'm going to run uv

[13:25] uh run logfire project

[13:30] use demo. Demo being the name of the

[13:33] project that I want to connect it to.

[13:34] And that will go and connect logfire in

[13:36] this directory to the demo. So, when I

[13:37] go and run stuff, it will output uh

[13:40] record uh traces to logfire and use the

[13:43] manage variables from there.

[13:45] Um, I'll wait a couple of minutes

[13:48] because I'm sure people want to get a

[13:49] bit set up and get that kind of like

[13:51] very simple hello world thing thing

[13:53] working. Um, and then we can move on.

[13:55] Anyone got any any questions while we're

[13:57] just getting that set up.

[14:00] >> What does gateway mean?

[14:03] >> Uh, so AI gateways, we have one, but

[14:05] we're by no means the only ones. Uh the

[14:08] idea is uh you can basically make

[14:10] requests to

[14:12] most models through through our gateway

[14:14] with one API key. And in particular, we

[14:16] we have observability. So if you're if

[14:18] you're using the the production version,

[14:19] you can see requests that your team are

[14:22] making or that your agents are making.

[14:24] Um we have things like caching and

[14:26] fallback. So if one model fails, we can

[14:28] fall back to another one. Uh etc., etc.

[14:31] But in this context, it just means you

[14:33] can have one API key and connect to

[14:34] Anthropic or OpenAI or Grock with a Q or

[14:39] Gemini models.

[14:41] >> So Gateway is your own.

[14:43] >> Yes.

[14:45] But as I said, you don't have to use it

[14:46] here, but it might just make things

[14:47] easier to to get all of the models

[14:49] working.

[14:57] I'll wait a couple of minutes, but any

[14:59] any questions or should I go on?

[15:04] >> Sorry.

[15:06] >> Uh, so it's it's uh the the repo itself

[15:09] uh

[15:11] is um

[15:14] github paidantic talks and then the

[15:16] directory is 20264

[15:19] AI engineer.

[15:38] Have you logged in with logfire before?

[15:40] >> No.

[15:41] >> Okay. So, you'll need to do that so that

[15:42] you have the um machine key.

[15:49] So I think it's UV run logfire off.

[15:51] Sorry, I've done that.

[16:51] So, I'm going to keep going just to to

[16:55] keep things moving, but like unless

[16:56] anyone has any any questions. So, we now

[16:59] have the the very basic case working.

[17:01] What we want to do is run an eval to see

[17:03] how

[17:05] um uh our model with this with our

[17:08] prompt is per performing relative to our

[17:10] golden data set. So you will see if we

[17:12] go into evals here we have um

[17:17] uh where's the data set defined? Sorry.

[17:22] Um

[17:24] you'll see at the top um we have the

[17:26] load data set which is going to

[17:27] basically create our um our data set

[17:31] which is the the object that we can then

[17:32] call eval on. Um this is going to load

[17:35] um

[17:37] the the

[17:39] um the cases which um and and basically

[17:44] create one case for each of the each of

[17:47] the MPs that we're that we're going to

[17:48] run. Um and then it's going to create

[17:50] yeah go through and uh generate these

[17:53] cases and ultimately return this data

[17:55] set data set object and we're going to

[17:57] register one custom evaluator here which

[18:01] um in turn actually generates a whole

[18:03] bunch of metrics or assertions for like

[18:06] how accurate this um uh this run is. Um

[18:12] I don't think I mean you can go and read

[18:13] through the logic. I'm not going to go

[18:14] through each individual bit. I'm not

[18:15] claiming here that these are the perfect

[18:17] set of evals in terms of the actual

[18:18] evaluators, but they're they're a useful

[18:21] start. Um the point is if you go I can

[18:24] you can look through the docs, but we

[18:25] have a bunch of pre-built evaluators

[18:28] like LLM as a judge. Um and then we

[18:30] allow you to uh define your own. And

[18:32] generally defining your own is far

[18:33] better than LLM as a judge because the

[18:36] LLM as a judge is effectively the kind

[18:38] of you know I don't know if it's

[18:39] politically acceptable but the kind of

[18:40] lunatics running the asylum and it can

[18:43] lead to lead to slight issues. So if you

[18:45] can have a like deterministic eval like

[18:47] this where we're comparing what the

[18:49] result is versus a golden data set

[18:50] that's much better. Um

[18:54] u and so if you look in main where we're

[18:57] going to go and run this ultimately main

[18:59] is really just a CLI. So we set up a

[19:02] bunch of CLI cases and then in the case

[19:04] of eval we run the run evaluation

[19:07] function. If you look in here,

[19:09] ultimately what we're doing, we print

[19:11] our better stuff and then we're just

[19:12] going to call this evaluate function.

[19:14] We're using Pantic AI's override

[19:16] functionality to override uh the prompt

[19:19] that is set by default with um with the

[19:22] custom prompt that we're using for that

[19:24] particular that we're evaluating and a

[19:26] model that we're evaluating. We're not

[19:27] actually going to change model in this

[19:28] case. Um

[19:32] and so we're yeah we're going and we'll

[19:34] then go and call so ultimately we're

[19:36] calling data set evaluate which takes a

[19:39] function which is the actual function

[19:41] we're going to go and um perform the

[19:43] evaluation on and that will in parallel

[19:46] with a

[19:48] uh max concurrency of five go and run uh

[19:51] all of our cases um which we will you

[19:53] will see in a minute um and then we're

[19:55] going to give it some name um so that we

[19:58] can look at it in log log fire. Now you

[20:01] will also see here we've set up log fire

[20:03] at the at the top here. If token present

[20:06] just means it would run without causing

[20:07] an error if you don't have the the token

[20:09] set. Um we set an environment service

[20:11] name. We're not going to print to the

[20:13] console because uh in these complex

[20:15] cases it's actually very quite tricky to

[20:17] see what's going on in the terminal. It

[20:19] doesn't really help to have logire kind

[20:21] of printing to the terminal. And then

[20:23] we've switched off scrubbing because

[20:24] occasionally something like the word

[20:26] password or or something will appear in

[20:28] an output and we we're happy to for that

[20:30] to go to logfire. And then we're going

[20:32] to instrument pantic. We don't actually

[20:34] need it now. So I won't instrument

[20:36] prints but when we get to using jeer

[20:38] instrument print just as a nice way of

[20:40] getting the output from jer into logfire

[20:42] as well. Um and so if I look the and the

[20:46] as you may have realized the help file

[20:48] has help. MD has some useful examples of

[20:50] what we're going to run. So we're going

[20:52] to go and run um this script

[20:56] here. So we're going to UV run main.py.

[20:59] We're going to call with the arguments

[21:01] eval. We'll split. So we're we're

[21:03] splitting it based on just the test set

[21:05] that we're running. And then the prompt

[21:07] is the the initial one. So the very

[21:09] simple prompt um

[21:12] kind of oneliner

[21:14] description of what the agent uh should

[21:16] do rather than the more complex prompt.

[21:19] And if we go and run this eval, you

[21:22] won't see that much in the terminal

[21:23] because we we uh uh switched off tonal,

[21:26] but you will see it running through the

[21:28] cases. And if we go and look in logfire,

[21:30] you can see um those cases running and

[21:33] their their costs, etc. We can dive into

[21:35] what an individual case looks like. So

[21:38] if you look here, we're running um

[21:42] uh the agent. And I guess that's

[21:44] probably quite small, but I will try and

[21:46] zoom in to let you see what's happening.

[21:49] Here we have the system input again

[21:50] that's the very the um simple

[21:52] instructions that we talked about and

[21:54] then we have the input which is the the

[21:56] contents of the Wikipedia page as text

[21:58] then we have the final output and in

[22:00] this particular case it found no no

[22:02] relations

[22:03] um

[22:05] that has now finished and so as well as

[22:08] this view of the individual cases here

[22:10] we can go into evals in logfire and you

[22:14] will see um this case here and you

[22:19] Sorry, this data set. And then within

[22:20] the data set, you will see that most

[22:22] recent case from one minute ago.

[22:26] If we go in and look at that,

[22:28] we should get a view of what's going on.

[22:30] So again, this is pretty small on the

[22:32] big screen, I guess, but it'll look much

[22:34] clearer on your screen. We can see um

[22:37] where um the cases have the mo most most

[22:41] relevant metric is um accuracy where

[22:44] you'll see there are ones where it's

[22:45] correct and zeros where it's incorrect.

[22:47] And you'll see a few values where it's

[22:49] lower where the output from the golden

[22:53] data set is slightly different to the

[22:55] output from um the from the model that

[22:59] we're running here. So you see here this

[23:01] guy has a father who is a um something

[23:04] to do with UKIP and it's it's got it

[23:07] correctly his name but there's a slight

[23:09] difference in the description. Hence,

[23:11] it's like got a 0.9 score

[23:14] and you can see the overall performance

[23:15] of 85%. So 85% of the time it got it got

[23:19] all of the stuff uh right. That's not

[23:21] particularly good. It's also not

[23:24] particularly interesting in its um until

[23:27] we go and compare it to running with a

[23:28] with a better prompt. So um how many

[23:32] people are up to kind of being able to

[23:33] run that run that eval?

[23:36] A few people. Okay, I'll wait a couple

[23:38] of minutes because I think it's probably

[23:40] a slightly more entertaining for us to

[23:43] Yeah, we're 20 minutes in. We got quite

[23:44] a lot of time. I'm gonna wait a couple

[23:45] of minutes.

[23:46] >> Can you show the command again, please?

[23:48] >> Yeah.

[23:50] So, it's it's this command. It's if you

[23:52] look in um help.md. We're basically

[23:55] running the the eval command.

[24:03] >> Y

[24:07] running EVO.

[24:08] >> Yeah,

[24:09] >> it took

[24:15] >> it ran really quickly for me. Um,

[24:20] >> I think it should take about 30 seconds.

[24:21] So, I don't know whether

[24:24] you're on a different internet or

[24:28] changed a changed the model. Um

[24:34] >> ah yeah that will be much slower than I

[24:36] think we're using

[24:38] >> well a anthropic was down this morning

[24:40] when I was trying to use it a lot so

[24:42] it's being really really slow and GPT4.1

[24:46] is flying because not many people are

[24:47] using it and it's doing a reasonable

[24:48] job. That's why I'm using one of those

[24:50] models is partly to like show the eval

[24:52] performance but also bluntly to get the

[24:54] answers more quickly.

[25:16] While people are are getting there, I'm

[25:18] just going to run this the the next one,

[25:19] which is compare. If you go and look at

[25:21] what this is doing, it's basically just

[25:22] running the eval twice with the with the

[25:24] like bad prompt and the good prompt. And

[25:26] then we'll be able to uh compare those

[25:29] outputs in in logfire and kind of see

[25:31] where the differences are coming from.

[25:33] Um and then we can go on to the full jer

[25:36] optimization step. I'll just run the

[25:39] compare which should be take a little

[25:41] bit more time but still still hopefully

[25:43] relatively quick here with these models.

[25:46] You see, we're just running the 65 uh

[25:49] test cases here rather than the full 650

[25:52] MPs as we'll use when we get to the full

[25:55] um optimization.

[26:03] >> If you accidentally run the same twice,

[26:07] you'll just create a new

[26:08] >> you'll create a new obviously you'll

[26:09] have more spans in log file and you'll

[26:11] get another um run in the logfire evals

[26:14] view. you can archive them when you've

[26:16] when you've got confused by how many

[26:17] different ones you've got. So, if you

[26:19] come over here to evals, come into that

[26:21] most recent case, you'll see I've now

[26:23] got a bunch. Uh I could go and archive

[26:27] uh so yeah, archive the older ones.

[26:29] Well, do the other way around just to

[26:32] keep things uh clear.

[26:35] But if I take the those so I've now got

[26:37] two new new runs here uh two new

[26:40] experiments and I'm going to select them

[26:42] and um

[26:46] compare

[26:49] and now we have a bunch of different uh

[26:51] metrics um uh in particular and you will

[26:56] see that like ultimately accuracy being

[26:58] kind of the most important one here

[26:59] slightly higher 92% versus 87%

[27:02] for the like expert prompt versus the

[27:05] initial prompt and we have the like

[27:07] possibly slightly useless graph of

[27:09] different metrics and how they've

[27:11] performed. Um with with fewer um metrics

[27:16] or assertions, this can be more useful.

[27:18] Um and again, what what's probably most

[27:20] interesting though is to look into

[27:21] individual cases where the performance

[27:22] differs. So you see here um with this MP

[27:29] uh Joe White that the initial prompt um

[27:33] found one match um

[27:37] relation spouse which obviously it

[27:39] should not have found because we're not

[27:41] looking for spouses whereas the expert

[27:43] prompt correctly ignored that one. Um

[27:46] and then if you look in this case Laura

[27:48] Kyle um you will see that the the

[27:51] expected output is no matches at all

[27:54] both um of the these most recent runs.

[27:58] They found a match um because they had

[28:02] some four times great-grandfather who

[28:04] was the governor of Hudson Bay which is

[28:05] not a politician but is a like public

[28:07] figure. So you can kind of start to see

[28:09] where where the differences are coming

[28:12] from and the kinds of things you might

[28:13] want to do in the prompt to to improve

[28:15] the performance. That's ultimately the

[28:17] kind of data that Jepper is going to use

[28:20] to like um inform it

[28:24] uh generating a next the next like paro

[28:27] frontier prompt for it to go and try.

[28:36] I didn't manage to see the graphs.

[28:38] >> You you will see the graphs only if

[28:40] you're comparing two cases. So if you

[28:42] open a single case, it doesn't show the

[28:44] graphs.

[28:48] >> So I've run compare. Once I had run

[28:50] eval, I then ran compare with this uh

[28:53] command here.

[28:55] >> And then um

[28:58] here I've taken two cases.

[29:00] >> Oh,

[29:02] sorry.

[29:03] >> And then you hit compare. And then you

[29:05] see uh see the graphs um comparing the

[29:08] performance.

[29:23] >> So there are if you look in the um task

[29:26] uh pi there are two prompts uh as a kind

[29:29] of starting point. So one is a very

[29:30] simple oneliner and then the second is a

[29:35] bit more detailed description of the

[29:36] kinds of things you should be looking

[29:37] for. Still not kind of optimized but

[29:39] like what you might get if you as a

[29:41] human wrote out a decent prompt or as a

[29:43] model like write me a better prompt. So

[29:46] you can see we've like improved the

[29:47] performance from 87 to like 92% with

[29:49] this model through doing that

[29:51] approximately

[29:53] and we should with Jeopard be able to

[29:54] get better. We I think I got 96% when I

[29:56] was running it earlier. um by no means

[30:00] perfect but this is you know but you I

[30:02] you know there are examples of using

[30:04] jeopard to like I suppose what what

[30:06] people generally do is they either hold

[30:07] one variable constant like we need the

[30:09] following quality and now we want to

[30:11] reduce time or reduce cost or we need to

[30:13] like drive up the quality. So there was

[30:15] an example from Shopify using Jepper.

[30:18] They were using they were basically

[30:19] looking at um Shopify sites and looking

[30:23] for things like whether they were

[30:24] fraudulent or which which tax category

[30:26] they fell into. And they switched from

[30:30] basically just giving the entire website

[30:32] to GPT5 and saying what is this to using

[30:35] an agent and using a Quen model and

[30:37] Jeeper to optimize the prompt. and they

[30:40] got the price down from $5 million a

[30:41] year to 60 60 $73,000 a year. Um, and

[30:46] improved performance over time. So

[30:48] that's obviously also that's not just

[30:51] optimizing the prompt. That's like some

[30:52] mixture optimizing the prompt and moving

[30:54] to aantic and yada yada.

[30:58] But in this case, we're just trying to

[30:59] kind of improve performance whilst using

[31:01] the same relatively fast model for the

[31:03] sake of for the sake of uh the demo.

[31:08] Um, so now we've done the comparison. I

[31:10] guess it's time to look into well,

[31:12] anyone want me to wait a bit longer or

[31:14] shall I keep going?

[31:16] I'll take the no one asking me to wait

[31:18] as a signal to keep going. So we now get

[31:21] to the kind of jeer jer phase of this.

[31:24] So I'm going to reenable that while I

[31:26] remember. And then ultimately if you

[31:28] look here where we are going to run the

[31:32] uh optimize um case you'll see we have

[31:35] this run optimization function run

[31:37] optimization here.

[31:40] It's going to load in the the the the

[31:42] training and the validation data sets

[31:45] um error if it's not there. We're then

[31:48] going to go and create this JPE adapter.

[31:51] So the Jepper adapter is is effectively

[31:53] like Jepper is not it's an amazing it's

[31:56] a kind I guess the state-of-the-art now

[31:58] in agent optimization Lakshai who

[32:01] created it is a first year PhD student

[32:03] at Berkeley. He is not perhaps the most

[32:06] experienced kind of engineering Python

[32:08] developer and so Jeopard doesn't do

[32:10] async that nicely. It's not as type safe

[32:12] as I would like it to be. I'm like

[32:14] itching to go and either fix it for him

[32:16] or fork it bluntly but I have so far uh

[32:20] not done so but um yeah so so Jeppa has

[32:23] this concept of adapters which are

[32:25] basically how you define the agent that

[32:27] is going to propose the next case and so

[32:31] we have a we have this function here to

[32:33] create the adapter

[32:35] um which in turn generates one of the

[32:37] this adapter here which which we've

[32:39] defined which subclasses

[32:41] um their adapter type.

[32:46] It's a data data class, so it takes a

[32:48] bunch of arguments, but ultimately the

[32:49] bit that matters is build propos agent

[32:52] um which is obviously their their method

[32:55] name. And what we're going to what we're

[32:58] going to do here is return a pyantic AI

[33:00] agent u in turn. So we're using a we're

[33:03] using a pyantic AI agent to propose new

[33:06] cases to optimize a pyantic AI agent.

[33:10] Um, and we're going to

[33:12] uh use again GPT4.1 for the sake of

[33:15] speed. In this case, there is a slightly

[33:17] annoying characteristic where Jepper is

[33:19] sync, not async. And so if you try and

[33:22] run each time it runs the proposer

[33:24] agent, it runs it in a new

[33:27] um

[33:29] async context. And so we have to go and

[33:30] make sure we create a new HTTP

[33:32] connection, HTTPX connection, otherwise

[33:35] we get a bunch of errors. Hence this

[33:36] like slightly weird formulation. Here we

[33:39] have again a prompt. Obviously, you can

[33:41] get a bit uh going around in circles on

[33:43] optimizing the prompt of optimizing the

[33:44] prompt, but we're basically saying uh

[33:47] you're an expert prompt engineer,

[33:49] improve the um system prompt for this

[33:52] agent, yada yada yada. Here are the

[33:53] things to consider. Um and then we're

[33:56] going to um call the ultimate evaluate

[33:58] function which is going to

[34:01] um generate this bunch of cases generate

[34:03] a pyantic AI eval run that eval and that

[34:07] is what we're going to use to basically

[34:08] test the performance of our new proposed

[34:11] prompt.

[34:13] This will probably make some more sense

[34:15] when I actually go and run it. Um yeah,

[34:18] and then we

[34:21] uh apply skills for the for the failures

[34:23] and then we um return this evaluation

[34:25] batch which kind of is a summary of how

[34:27] it's performed which is what Jeppa will

[34:29] then use as to whether or not this is a

[34:30] new paro frontier or whether to to

[34:32] propose a new a new prompt. Um

[34:37] uh and so I think the simplest thing to

[34:39] do is just go and run this. It will take

[34:40] a little bit longer um and it will cost

[34:43] a little bit more but that's fine. I'm

[34:45] going to run it. If you run it with 50,

[34:47] it basically dies before it gets

[34:48] anywhere. But if I um

[34:53] run this with 400 calls,

[34:58] um

[35:00] you will see um Jeeper starts to has a

[35:05] has a similar kind of progress bar and

[35:07] I, as I said, I've switched off um log

[35:09] fire printing so that you don't see

[35:10] what's going on in the background here

[35:12] because it basically just becomes

[35:13] impossible to view. But if you look

[35:16] inside logfire, you will see already

[35:17] this optimization is going on. So you

[35:20] can see that we um evaluate um the the

[35:25] agent and then we call the proposer

[35:27] agent here. So the proposer agent, if

[35:29] you look at this step here, this is what

[35:31] we just had the system prompt. I said

[35:33] for the proposer agent

[35:35] um and then the input which is basically

[35:39] Jeepper's description of the context for

[35:41] the proposer agent to enable it to come

[35:43] up with a new prompt and then from there

[35:47] the proposer agent is going to propose a

[35:49] new system prompt um

[35:53] and we're going to then evaluate that

[35:55] see how it performs and iterate towards

[35:57] towards finding a better solution. So

[36:00] that's what's going on here. You see why

[36:02] I did the instrument print um is so that

[36:06] um we can get the the print output from

[36:08] Jeepper um nicely viewable inside

[36:11] logfire. There may be a neater way of

[36:14] doing this, but this worked for me this

[36:15] morning. Um and it's going to work

[36:18] through you can see it's a little bit

[36:20] more expensive. We've already spent $2.

[36:23] Um

[36:25] uh so I guess if everyone runs it, we

[36:27] will spend a few hundred dollars. uh

[36:29] OpenAI will no doubt appreciate it. Um

[36:33] uh and that's going to work through, but

[36:34] you see we're already like um 50% of the

[36:37] way through the optimization and it is

[36:38] proposing these new prompts and then um

[36:43] uh evaluating them and and using the the

[36:47] feedback from the evaluation to decide

[36:48] where to go next. And I would encourage

[36:50] you if you have some time to go and have

[36:53] a read through how the these traces

[36:56] because they're quite interesting. I

[36:56] think they're quite illuminating in

[36:58] terms of how the how the optimization is

[37:00] working. I think one of the things to

[37:02] note is people love to say that anything

[37:05] to do with AI is incredibly

[37:06] sophisticated and complicated and

[37:08] advanced. This optimization technique

[37:10] whilst the state-of-the-art is not

[37:12] actually that groundbreaking relative to

[37:14] the complexity of the model itself. It's

[37:16] a like relatively crude sense of like

[37:19] ask an agent to generate a new prompt.

[37:21] If it does better, take bits of that,

[37:22] put it into a new prompt, keep doing

[37:24] that until you either run out of time or

[37:26] get to some prescribed score.

[37:29] >> Yeah.

[37:30] >> Questions

[37:32] are

[37:37] >> uh how big the batches are. So we have

[37:41] >> the process

[37:47] of the

[37:53] So I think you can see it here where

[37:54] it's running the evals. So it's running

[37:57] I think it is running all of the cases

[37:59] in the test data set.

[38:01] >> Um but I I think I've seen it run fewer.

[38:03] So I think Jeepper is clever enough to

[38:05] like alter the number of cases based on

[38:07] how they performed but I honestly not

[38:09] not that sure.

[38:11] >> Not one.

[38:12] >> Yeah. So in terms of skill, what was the

[38:15] what was the question?

[38:17] >> I was thinking how to use that.

[38:23] I was thinking

[38:27] that

[38:28] >> I mean I I think we we will make this

[38:31] much easier with open source. We will

[38:34] also make it something where you just

[38:35] plug in logfire and it just happens in

[38:36] the background. Um but we also want to

[38:39] make it super easy to do it locally or

[38:40] open source as well as like we don't

[38:42] just want to say oh you must plug it

[38:44] into logfire to get optimization.

[38:49] Y

[38:50] >> now you just said the max goals, right?

[38:52] Which is I think max calls open.

[38:54] >> Y is there a smarter way to do this?

[38:57] Like if you don't improve for 10

[38:59] iterations, just stop.

[39:00] >> I'm sure there is. I haven't looked into

[39:02] it. Like I say, I did this in a bit of a

[39:04] hurry. Totally. And like presumably for

[39:06] the most part, you're saying reach this

[39:08] threshold or as you say like run out of

[39:10] optimization or whatever it might be.

[39:13] >> I don't quite understand how you see the

[39:16] prompt optimization.

[39:19] So if you look here in the proposer

[39:21] agent run uh you will see

[39:25] effectively what um what input this is

[39:30] the this is the input to the agent that

[39:32] is that is um

[39:35] uh proposing a new prompt and it is

[39:37] being told based on this information

[39:38] propose a new prompt and then if you if

[39:41] you look the the the principle of the

[39:42] like paro frontier is this contains

[39:45] components of previous prompts that have

[39:48] done well uh and effect you know it's a

[39:50] bit like the

[39:51] >> it's not like a div it's a whole new

[39:54] >> yes it is propo proposing a whole new

[39:56] new div

[40:01] >> so so I think if you have multiple so so

[40:03] I think jpa operates on the idea of a

[40:05] kind of object or dict of known keys and

[40:08] so here we only have basically one a

[40:10] dict with one key value pair eg like

[40:13] system prompt value if you have multiple

[40:17] different keys then you can optimize by

[40:19] basically combining the best values from

[40:21] multiple different keys. So you could

[40:22] have like you could imagine e you could

[40:25] have imagine model and system prompt or

[40:27] model and some set of tools or even like

[40:31] different lines from a system prompt

[40:32] that you're basically

[40:35] uh allowing it to the the proposal would

[40:38] just be choosing different values from

[40:39] your set of different lines. That's the

[40:41] kind of standard way of doing this in in

[40:43] DSPY is like basically take all of my

[40:46] different examples and choose which ones

[40:48] to include in the prompt.

[40:50] >> DSP.

[40:52] >> So DSPY is another agent framework uh

[40:55] somewhat similar to pyantic AI. Um it

[40:58] comes from a very um machine learning

[41:00] background. I find it hideous to use

[41:03] because it's not type safe but the

[41:05] caliber of people using it is generally

[41:06] very high. Um and it it has has had this

[41:09] concept of optimization for a long time.

[41:11] For a long time it was basically the

[41:12] only agent framework that had this idea.

[41:14] Now Jeppa has come along and is like

[41:16] available within DSPY but is not only

[41:19] available within DSPY.

[41:22] >> Yeah. Uh what's your personal take on

[41:24] JPA and those type of algorithm like

[41:27] from your personal experience have have

[41:30] they worked well in practice? Have you

[41:32] all like used more home builds uh

[41:36] optimizers? Yeah, curious on on this

[41:39] informal take.

[41:40] >> So I think that in the case where you're

[41:42] trying to basically get a dumber model

[41:46] or a faster model or a cheaper model to

[41:48] be able to do some task, they make a lot

[41:50] of sense. If you go and take the

[41:52] state-of-the-art models are like Opus

[41:54] 4.6 and you ask it most questions, it

[41:57] will just if it has all the information

[41:59] it needs, it will just go and get it

[42:00] right for the most part. And so the

[42:01] optimization is slightly less relevant.

[42:04] I think one of the subtleties here is

[42:05] that the statistic is that 98% of data

[42:09] is private. I don't know if that number

[42:10] is is correct or not, but like let's say

[42:12] even if it's off by miles and it's 50/50

[42:14] data. When you have a private set of

[42:16] data where the models have not been

[42:17] trained on it, you have some massive

[42:20] internal spec for how you're supposed to

[42:21] operate as a bank, let's say, adding the

[42:24] right bits of context into the system

[42:27] prompt or into the instructions is

[42:28] incredibly valuable. And the

[42:30] optimization really matters. The problem

[42:32] we have when we're trying to give demos

[42:34] like this is by definition there isn't

[42:36] private data that we can use because if

[42:38] someone lets us use their private data,

[42:39] they're not like, "Oh yeah, can we go

[42:40] and talk about it at AI engineer?" And

[42:42] so I've got this like slightly weird

[42:44] example of MPs, but actually you'll see

[42:46] in cases stuff I'm going to show you in

[42:49] the middle in a in a minute, the model

[42:50] actually just goes and like figures out

[42:52] who the MP for some some burough is even

[42:55] if it hasn't looked at the data because

[42:56] actually this is all public data that it

[42:58] knows. So, I think that one of the

[42:59] subtleties is that optimization matters

[43:01] way more where you have large amounts of

[43:03] private data. And honestly, we're still

[43:05] trying to figure this out as a company.

[43:07] One option for us is to use stuff that

[43:09] is public, but new enough that it's not

[43:11] in the training data. So, one option

[43:13] would be like news, but then that could

[43:15] get slightly politically dicey if we

[43:17] were using current news as our like

[43:20] source of stuff to optimize on. So,

[43:21] another option is to use like what's

[43:23] going on in sports because whether you

[43:25] find it interesting or not, at least

[43:26] it's not controversial. we would, you

[43:28] know, ask it which footballer has done

[43:30] well in this Premier League season over

[43:31] the last five matches. And that might be

[43:34] public data, but equivalent to private

[43:36] in the sense that it does not exist

[43:38] within the model, but it's not a really

[43:40] good example. It's something we're

[43:41] trying to figure out.

[43:43] >> Uh, yes, I have a question regarding

[43:46] Japa. Does it

[43:48] um

[43:51] >> I think it's not working your mic, but

[43:53] if you just speak up, I think we can

[43:54] keep going. Yeah, I'm just trying to

[43:56] understand if there is a um way where it

[43:58] prioritizes kind of optimizing and

[44:01] adjusting the system prompt rather than

[44:03] kind of appending to it because I feel

[44:04] like that's a

[44:06] >> recurrent issue. You find new edge cases

[44:08] and you're like appending and adding

[44:10] more information. Y

[44:11] >> so does it strike that balance of okay

[44:13] this we append and this we adjust. So I

[44:16] was using GPT5 mini this morning and the

[44:19] one of the problem a it was slower in

[44:20] general but also it was just producing

[44:21] this enormous system prompt which then

[44:24] meant that the agent was slower. I don't

[44:25] know if it did better or not. I think it

[44:26] it did roughly similarly well. Um so

[44:29] that definitely is a problem. I think

[44:30] the solution to that is the thing I was

[44:32] talking about earlier where ultimately

[44:34] Jepper wants a key value store key add a

[44:36] dict of keys and values and then instead

[44:40] of basically saying instead of the

[44:42] proposer agent being like go just

[44:44] generate me a new system prompt you're

[44:46] basically saying choose a new subset of

[44:48] our list of different inputs available

[44:50] for like you would go and basically

[44:51] split your system prompt up into like

[44:53] 200 sentences and say which is the best

[44:55] 20 sentences to use and now by

[44:57] definition if it can only choose 20

[44:59] sentences it's not going to get verbose.

[45:01] In this case, we're using a pilance AI

[45:03] agent to basically summon up a whole new

[45:05] system prompt, which is probably better

[45:07] at finding the edge cases, but but does

[45:09] result in a verbose prompt.

[45:15] Um, so in fact on that very point, it

[45:17] has now finished. It has given us this

[45:19] optimal prompt. It has achieved a

[45:22] performance score of 96 uh.7%. So

[45:25] significantly above the 92 we got from

[45:27] our like best case before. Um and at the

[45:32] expense of a relatively verbose prompt.

[45:34] Um

[45:36] uh so you can see where it's gone

[45:37] through in relative detail and in

[45:41] particular it's banged on about like

[45:42] what relation to use, when to when to

[45:44] include a relation, what sort of things

[45:46] count as a relation. Um

[45:50] uh yeah.

[45:53] Um okay so so that that that is is

[45:56] jeoper working. Uh the other bit I was

[45:58] going to talk about is the managed

[46:00] variables. So I will now switch on to

[46:02] the managed variables. But before we go

[46:03] on to that any other questions on this

[46:05] bit of of the the talk or on jer.

[46:10] >> Yep.

[46:11] >> This is just being hard but you got the

[46:14] validation scores compared to like a

[46:16] golden set.

[46:17] >> Do you want to take that?

[46:19] >> The validation scores comparing to like

[46:21] a golden set right? Yep.

[46:23] >> Um is the golden set in this repository?

[46:28] It it is here, right?

[46:29] >> Yep.

[46:29] >> Oh, okay. Okay. So,

[46:30] >> yeah. So, if you look in um if you look

[46:32] in the uh cases directory, you will see

[46:36] golden relations and there's a y as a

[46:38] JSON file with the the supposedly golden

[46:41] set. Now, I'm sure it's not 100%

[46:44] perfect. As I say, we generated it with

[46:45] Opus 4.6 using a similar similar script,

[46:48] but like um

[46:51] >> I just I had a silly thought like if you

[46:53] didn't have that golden set then things

[46:56] get quite difficult doesn't it?

[46:58] >> Yeah. Yeah. So evals are much easier if

[47:00] you have some like golden reference

[47:01] against what it's supposed to be doing.

[47:03] Uh in general what people end up doing

[47:06] is they have some subset of data that's

[47:09] been like human annotated that works.

[47:11] But you can also have cases where for

[47:12] example if you have an agent that's

[47:14] writing code you go run the code and

[47:16] check whether or not the code fails for

[47:18] example. Um or if you can have a like

[47:20] feedback, if you can have a a full loop

[47:23] of like

[47:25] uh basically returning that data to the

[47:27] original source and seeing how accurate

[47:28] it is, something like that. Working out

[47:30] what your what your judges is always is

[47:32] the hard bit of evals.

[47:34] >> But like just for the your example where

[47:37] the if you're running the code, that

[47:40] would be like a like like it either runs

[47:43] or doesn't, right? It's not like a How

[47:45] do you do a percentage then? I'm a

[47:46] little bit confused there. Uh well you

[47:49] could check for example whether or not

[47:51] it was going to generate invalid code or

[47:53] use libraries that weren't available.

[47:54] That would be a like first step of like

[47:56] how performance is going. But yes I mean

[47:59] this is that this is the hard bit of

[48:00] evals is like what is what is right and

[48:04] and as models get more intelligent

[48:06] figuring out what right looks like is

[48:08] harder and harder. If you I mean the

[48:09] ultimate case right is like you have an

[48:11] agent whose job it is to persuade people

[48:13] to stop smoking. The ultimate eval is

[48:15] wait 40 years and see when they died.

[48:17] But obviously you can't have an eval

[48:18] where you wait 40 years to see if they

[48:19] died. So your eval is probably like does

[48:22] it include the like the correct words

[48:24] does it not include some bad words that

[48:26] you definitely don't want it to suggest.

[48:28] um like you know take up a cigar

[48:30] instead, right? So text does not include

[48:33] cigar would be one of your evals perhaps

[48:34] and not like that sounds dumb but that

[48:36] is what an awful lot of evalu

[48:44] >> can I yeah sorry um

[48:47] two two questions uh one is a very short

[48:49] one um with panici you kind of break up

[48:51] the structure a lot of the time in the

[48:53] prompt does this just jam everything

[48:54] together and you just get one prompt at

[48:56] the back at the end

[48:58] >> so you always have one in one one set of

[49:00] instructions Yeah.

[49:01] >> Um, so it is building one set of

[49:03] instructions,

[49:04] >> right? Okay, that's fine. Um, so the the

[49:06] the real question was, uh, you know,

[49:09] variance is huge with this. I mean, you

[49:12] showed your results. I ran it, I got

[49:14] results.

[49:15] >> Is there a way of like having this

[49:17] having the variance be part of the

[49:19] actual optimization?

[49:20] >> Uh, I wouldn't say that. So, so there's

[49:22] a when you run EVAs, I'm just looking

[49:24] for where we call run. You can basically

[49:26] set the number of times you run each

[49:28] case. And the best way of reducing

[49:30] variance is to run them lots and lots of

[49:31] times. I know a bunch of hedge funds who

[49:34] are spending about $20,000 a night

[49:36] running their whole set of evals uh to

[49:38] see if they can improve over time. And

[49:40] if you have your own GPUs, you're like,

[49:41] well, it's sort of free to go and run

[49:43] them. So, we should run them more and

[49:44] more times. We should run everything 100

[49:46] times and look in the morning. It's

[49:48] definitely one of the challenges. And

[49:49] then do you like create a cost function

[49:51] or do you have like you can point it out

[49:53] like I want you to optimize

[49:56] like both accuracy and minimize variance

[49:59] like do you write your own cost function

[50:00] then within

[50:01] >> yeah so so if you look in the in the

[50:03] adapter code here you will see

[50:07] I mean have a look through it but like

[50:08] where am I looking um evaluate is

[50:12] returning this like um evaluation batch

[50:16] type which where you can basically

[50:18] include whatever score scores is uh a

[50:22] list of floats, right? So ultimately you

[50:24] can return whatever floats you you know

[50:25] you want in there.

[50:27] >> Okay.

[50:29] >> And just just in case people are

[50:31] wondering trajectories is effectively

[50:33] similar to traces. It is the like

[50:35] sequence of different steps that agents

[50:36] went through to get to a particular

[50:37] point.

[50:40] >> Um so how how do you handle systematic

[50:44] errors? Like I ran the optimization and

[50:47] it got a high value of accuracy 96% but

[50:52] it got wrong ons and uncles. So the

[50:55] final prompt excludes explicitly aunts

[50:57] and uncles even though they are in the

[51:00] golden relation. So do you suggest

[51:03] running and like crude code spotted this

[51:06] immediately?

[51:07] >> Yeah.

[51:08] >> So maybe one could have a harness where

[51:10] there is another check at the end. I I

[51:12] think what it's doing is it's using a

[51:14] small set of test cases and then a

[51:16] bigger set of evaluation cases and so

[51:18] that the subset of cases that

[51:21] the optimizer agent has gets exposed to

[51:24] maybe doesn't include a uncle and aunt

[51:26] and so it just made it simpler to

[51:28] exclude it. So one of the other things

[51:30] you end up needing is like a kind of uh

[51:32] at least 2x the amount of data that

[51:35] covers all of the different space so

[51:37] that you can have one full set of data

[51:39] that you train on and one set of full

[51:41] data that you evaluate on. This is like

[51:44] classic problems of machine learning of

[51:45] like how do we go about like we need an

[51:48] awful lot of data to build something

[51:49] that's really reliably you know yeah

[51:52] really reliable because ultimately you

[51:54] know you're already getting to the point

[51:56] with the agent where you're kind of

[51:57] encouraging it to overfitit and I

[51:58] suspect the uncle and aunt thing is it

[52:00] overfitting

[52:01] >> okay thanks

[52:05] >> there's a question behind you

[52:06] >> this is probably a very silly question

[52:07] but but surely the the prompts are and I

[52:11] assume that the prompt

[52:13] only works with the particular model

[52:15] that you tr you you would

[52:17] >> that is that is people's take is that

[52:19] you would need to run this all over

[52:20] again if you changed your model

[52:22] >> that's going to happen all the time

[52:23] isn't it

[52:24] >> yep and that's one of the reasons that

[52:25] eval are hard and that's one of the

[52:26] reasons that most people don't run evals

[52:28] and don't run optimization they write

[52:30] out a decent prompt they ask their

[52:33] coding agent of choice does this prompt

[52:34] look good if it says yes they kind of

[52:36] eyeball it and then they put it into

[52:37] prod and they worry about other things

[52:40] because probably the model that comes

[52:42] comes out in a month's time is going to

[52:43] go and supersede whatever optimization

[52:46] you did in some cases. Now, if you are a

[52:49] private equity firm who have uh 200

[52:52] million invoices from across your

[52:54] portfolio that you want to go and

[52:55] analyze, it's worth going and optimizing

[52:57] for a particular version of Quen 3.5

[53:00] light mini to go and do that job instead

[53:02] of just throwing GBD5 at it because the

[53:05] difference is like $10 million and it

[53:07] costs you you have your one analyst who

[53:09] earns half a million dollars and you put

[53:10] them on it for three weeks and you

[53:11] solved it. So, it like depends on the

[53:13] question that you're that you're trying

[53:14] to solve. But the ultimate example of

[53:16] this is the coding agents where the like

[53:19] the trajectories are extremely sparse as

[53:21] in there's an extremely wide range of

[53:23] things that they're doing and for the

[53:25] most part we are told that those

[53:28] companies don't have very many evals or

[53:29] don't have any evals at all. If you go

[53:31] and ask Boris Cheney how does he work on

[53:35] uh claude code he says mostly vibes

[53:37] mostly we just like see what works and

[53:38] tweak it a bit.

[53:40] So this is not a like I'm not claiming

[53:43] this is a panacea in all cases but there

[53:45] are definitely situations where being

[53:47] able to optimize your prompt or your

[53:49] agent choice is valuable. The other

[53:51] thing that we we don't have a demo of

[53:53] here but there's an awful lot more than

[53:54] just the prompt you can go and optimize.

[53:56] So there's the model, there's things

[53:57] like the compaction strategy, there is

[53:58] how you register tools, there is things

[54:01] like including code mode in this. And

[54:03] the next step, what we want to allow is

[54:05] basically for you to go and optimize

[54:06] across the full range of things you can

[54:08] do within your agent to find the optimal

[54:10] choice where perhaps the particular

[54:12] model choice doesn't doesn't matter so

[54:14] much.

[54:17] And it just makes me think that we you

[54:20] evaluate the prompt here, but could we

[54:22] just switch a bit and start evaluating

[54:25] different models or that would be silly?

[54:27] >> Yes. So that would that that would be

[54:28] something you could totally go and do is

[54:30] try different models. I mean given that

[54:31] there are maybe you have 10 models you

[54:33] want to try, you probably just run all

[54:35] those 10 models and see which one

[54:36] performs best and and pick that one or

[54:38] which one optimizes for your particular

[54:40] subset of like performance, price, time,

[54:42] etc. I think there was another question

[54:45] behind you.

[54:45] >> Yeah. Uh thanks. I already got the mic.

[54:48] Um so what you've shown is a task which

[54:50] is relatively narrow in what should be

[54:53] achieved and I'm wondering uh how you

[54:55] would approach it if the task is more

[54:56] open-ended. I I think that my suspicion

[55:00] is that

[55:02] that is a case where this optimization

[55:04] technique is harder to do because B like

[55:06] I say the coding agent cha case you

[55:09] could imagine you end up with 5,000

[55:13] distinct tests for a coding agent and

[55:17] you go and optimize as much as possible

[55:18] in those 5,000 cases and it turns out

[55:20] that they are like drop in the ocean of

[55:22] different things people do and now your

[55:24] agent is over optimized for your

[55:26] thousand cases or 5,000 cases. is I

[55:28] think the bigger the breadth of the task

[55:30] your agent is performing the harder it

[55:33] is to do this and the more you end up

[55:34] just having a like clever agent.

[55:38] Thanks.

[55:40] The other thing to say is that my point

[55:42] earlier about where you have large

[55:44] amounts of private data and so you have

[55:46] to put masses of context into the system

[55:48] prompt for like understanding our

[55:51] specific domain then choosing the right

[55:54] examples from that to put in which

[55:55] basically cover the full data set is

[55:57] more and more relevant.

[56:01] Did you have another question?

[56:05] Thank you.

[56:07] >> So if I understand correctly, um if

[56:10] you're a company and you would use this

[56:15] JPA optimization technique and if you

[56:17] had more money and maybe more expertise,

[56:20] you could decide to fine-tune a model.

[56:22] So they are kind of competing uh

[56:24] strategies. Correct.

[56:27] >> Yeah. And in answer to your pre the

[56:28] previous question about oh but isn't it

[56:30] isn't it made obsolete by the next

[56:32] model? The main reason that the big

[56:34] model labs say don't bother fine-tuning

[56:36] is that there you really are spending

[56:38] tens of thousands of dollars to go and

[56:39] fine-tune a model and actually for the

[56:41] most part improve the harness, wait for

[56:43] the next model, like show a nicer

[56:45] loading icon to your users is probably

[56:47] better than fine-tuning. But that misses

[56:49] the cases in particular in places like

[56:51] finance where they have enormous numbers

[56:53] of runs where they really do care about

[56:55] that optimization and fine-tuning

[56:56] applies.

[56:58] >> Thanks.

[57:01] So, I'm going to go on to talk about um

[57:04] managed variables. Uh as I say said

[57:06] earlier, this is a this is a somewhat um

[57:10] uh it's not going to be a particularly

[57:12] sophisticated answer I've got here, but

[57:13] I'm going to kind of show the example

[57:15] just just to explain how it works. So,

[57:18] we have here a very simple fast API web

[57:20] server. Um you will see that it has

[57:23] ultimately two endpoints. One returns

[57:26] some HTML um and the other one is a form

[57:30] submission um endpoint. And if I go and

[57:33] run this um um

[57:39] where have I had it running before?

[57:43] Here we are. It was in fact running. So

[57:44] if I if you want to run it, you'll

[57:46] probably want to use this command here

[57:47] to run it. I'll put that into Slack as

[57:50] well in case anyone

[57:53] wants to run it.

[57:56] And if you run this web server, you will

[58:00] not you'll see logfire which is not so

[58:02] interesting yet, but you will also see

[58:05] the server running locally. And this is

[58:07] just a very simple basically form where

[58:09] you can ask questions about the same

[58:10] bunch of MP data. Um and um I can go and

[58:15] ask a question like

[58:18] we'll see how well this performs.

[58:23] Hammersmith where I live.

[58:27] It will run for quite a long time

[58:28] because what it what it's got in the

[58:29] background is basically one tool which

[58:31] lets it gp through through the mark the

[58:33] the the HTML pages and it has replied

[58:36] relatively quickly on this occasion. And

[58:40] uh if I load this here, you will see the

[58:43] HTTP request coming in in logfire and

[58:45] then you will see the agent run and it

[58:49] um it ran a rather the the you know a

[58:52] good good sequex

[58:55] got back the the data and was able to

[58:57] correctly identify Andy Slaughter is the

[58:59] MP for Hammer Smith where I live. um all

[59:02] very well, but if you look in how this

[59:05] code is defined,

[59:08] we have here this logfire variable. And

[59:12] so this allows us to basically go and

[59:13] change the behavior of this agent

[59:16] without redeploying. Um now obviously

[59:18] redeploying in this particular case

[59:20] where I'm running locally is very very

[59:21] simple. But where I've got some big

[59:24] production CI stack to go and run and

[59:26] deployment takes hours, being able to go

[59:28] and change variables in production or in

[59:30] staging very quickly is extremely

[59:32] valuable. So the way that that log five

[59:34] variables work is that we have have a

[59:36] type here a pyantic model um which takes

[59:40] has in turn three strings the

[59:41] instructions the model um and um the max

[59:45] tokens which is an integer and then

[59:47] we've given it a default value um here

[59:50] um some very simple prompt and then

[59:52] we've given it we we've chosen the model

[59:54] and we've chosen the temperature and

[59:56] what I have run here is I've run uvun

[1:00:01] web and then there's a there's a

[1:00:04] basically there's a like CLI command for

[1:00:06] this which just pushes the variable

[1:00:08] ultimately we're just calling logfire

[1:00:10] push variables in this case when I run

[1:00:12] that I'll get asked do I want to

[1:00:14] overwrite this variable which I don't

[1:00:16] but if you if you're running it for the

[1:00:17] first time you you won't be asked and

[1:00:18] you'll you'll create a new variable now

[1:00:20] it's worth saying to do this we need to

[1:00:23] make the the experience of using these

[1:00:26] variables slightly easier in logfire at

[1:00:28] the moment they're not configured with

[1:00:29] the logfire um projects use command that

[1:00:32] you did before. So you need to go and

[1:00:34] set a a separate um API key to use

[1:00:38] variables. That will be solved soon. But

[1:00:39] if you want to do it today, the way to

[1:00:41] do that is to go into settings uh API

[1:00:44] keys within logfire. You see I've

[1:00:47] created uh I can create I could show you

[1:00:49] the form. I can create a new API key and

[1:00:51] I just need to give it the three

[1:00:52] variables permissions.

[1:00:55] Well, or or whichever ones you want. And

[1:00:57] now you can go and like you and we're

[1:01:00] ultimately using that API key to push

[1:01:02] the variables uh from local development

[1:01:04] uh from from the code definition through

[1:01:07] into logfire and then pulling them to to

[1:01:09] update the values. And so because I have

[1:01:12] pushed that if I go into uh managed

[1:01:15] variables here you will see I have two

[1:01:17] variables set up. Um this MP search

[1:01:20] config is the one we were looking at.

[1:01:22] You see we have those three fields that

[1:01:23] we've set.

[1:01:25] um and we have um some history of some

[1:01:28] updates

[1:01:31] but we can in particular what we can do

[1:01:33] in targeting is we can basically define

[1:01:35] what percentage of calls are using which

[1:01:38] of our different values. So this is very

[1:01:40] much like uh AB testing in fact under

[1:01:43] the hood our managed variables use the

[1:01:46] open feature open standard for for doing

[1:01:49] this. So in theory you can connect to to

[1:01:52] logfire with anything that speaks open

[1:01:53] feature. Um

[1:01:56] but yes so at the moment we're using the

[1:01:58] code default. So you saw when I ran this

[1:02:00] now uh I got back this answer answer of

[1:02:02] Andy Slaughter. But now let's go and

[1:02:05] update the value here. Um I want to go

[1:02:08] and edit

[1:02:10] and I'm going to leave those values the

[1:02:12] same and I'm going to say uh reply in

[1:02:15] French to make it very clear what's

[1:02:17] happened. Save that.

[1:02:21] And I'm going to go into targeting and

[1:02:23] I'm going to dial up what use the use of

[1:02:25] latest to 100%. So it should now use

[1:02:31] uh that latest value. And now if I um

[1:02:34] come in here and I ask for example the

[1:02:38] same question again

[1:02:40] uh and I stop the server which was silly

[1:02:43] um

[1:02:45] but you could imagine the server is

[1:02:46] still running and it's going to pull the

[1:02:47] new variable each time that that that

[1:02:49] function is called and if the demo gods

[1:02:52] are with me and everything is hooked up

[1:02:53] correctly

[1:02:58] uh it has indeed gone and replied in

[1:03:00] French. So, we've managed to we've

[1:03:02] updated the server without redeploying.

[1:03:04] Obviously, I did in fact restart the

[1:03:05] server, but I could I could change it to

[1:03:07] not. So, just to prove that that works,

[1:03:09] let me come back over here, edit this

[1:03:12] again, and say

[1:03:14] reply in German.

[1:03:17] And oh, that's very annoying. Uh,

[1:03:24] and now if I ask the same question

[1:03:25] again,

[1:03:28] that variable defines a system prompt

[1:03:30] should be updated.

[1:03:37] It's taking its sweet time, but it is

[1:03:39] indeed replying in German. But the nice

[1:03:41] thing here is coming back to your point

[1:03:42] about like is it just a system prompt?

[1:03:44] We can set up our variables to not just

[1:03:46] be simple text values but be for example

[1:03:48] a pidantic model which allows us to edit

[1:03:50] multiple different fields. So I can

[1:03:52] switch here from gateway anthropic uh

[1:03:54] sonet 4.5 to

[1:03:57] open AAI uh GPT

[1:04:01] 4.1.

[1:04:04] I'll get rid of that because that's

[1:04:05] going to confuse me.

[1:04:10] uh save that

[1:04:12] 4.1

[1:04:14] and the point is that we we can update

[1:04:16] multiple different values. So if I

[1:04:17] instead ask you ask it uh

[1:04:23] hopefully it won't bother going off and

[1:04:24] running it said it's now chat GPT rather

[1:04:26] than anthropic. So we can use this to to

[1:04:30] change variables and ultimately go and

[1:04:32] like experiment with what new prompts or

[1:04:34] what new models or temperature or

[1:04:35] whatever it might be uh how they behave

[1:04:37] in production. Now of course the

[1:04:40] ultimate aim here is to be able to take

[1:04:41] this whole system wire it up and instead

[1:04:44] of us having to to basically

[1:04:47] tweak uh man the managed variables

[1:04:49] manually that we basically get like

[1:04:51] self-driving for managed variables. So

[1:04:53] given some set of evals, it can

[1:04:55] basically go and perform uh optimize

[1:04:57] towards like hill climb towards some

[1:04:59] peak without us having to do anything.

[1:05:01] That's the feature that we're that we're

[1:05:02] working on. But I can kind of prototype

[1:05:04] what that might look like here. So let

[1:05:07] me just reload this.

[1:05:10] You will see in manage variables I

[1:05:12] actually have two variables here. And

[1:05:13] the other one is uh MP relations

[1:05:16] instructions which is instructions for

[1:05:17] the the the task agent we were running

[1:05:19] before. Um and you will

[1:05:23] see we don't have any values in here yet

[1:05:25] but what we have in our code uh in the

[1:05:29] web server here is we have registered so

[1:05:32] we register with this main agent two

[1:05:35] different tools one was the MP search

[1:05:36] which it was using before to find out

[1:05:38] who the MP for Hammersmith was but it's

[1:05:40] also got this extract political

[1:05:42] relations which is basically running the

[1:05:46] same extraction logic and then

[1:05:49] uh should be I'm just looking through.

[1:05:51] Yeah, ultimately it's calling that same

[1:05:53] extract relations function that we were

[1:05:54] optimizing earlier. So we can now use

[1:05:56] this agent. This agent can be asked who

[1:05:59] are the political relations of a

[1:06:01] politician and with a bit of luck it

[1:06:03] will go and use this tool to go and do

[1:06:05] the calculation. At the moment it's

[1:06:07] going to use the simple done prompt but

[1:06:08] the point is we can go and alter that

[1:06:11] prompt based on the optimized value that

[1:06:12] we got um and thereby basically apply

[1:06:15] our new state-of-the-art prompt without

[1:06:17] having to redeploy. So, if I come over

[1:06:19] here,

[1:06:21] first thing I'm going to do actually is

[1:06:25] dial that that previous variable back

[1:06:27] down to zero because we don't want we

[1:06:28] want it to be told correctly what to do.

[1:06:31] Um, so I'm going to put that to zero.

[1:06:34] Um,

[1:06:39] and just to prove that something here is

[1:06:41] working, I'm going to say, um,

[1:06:46] uh, who are the political relations of

[1:06:51] what was he called? Stephven

[1:06:54] Kenn because I know he does have some.

[1:06:56] I'm going to go run this case and we can

[1:06:59] go and look in Log in a minute and see

[1:07:00] what it's done. But hopefully it has

[1:07:02] used that tool uh as the correct way of

[1:07:05] identifying who the who the relations

[1:07:06] are. So yes, so it's found them

[1:07:08] correctly. But more importantly, if we

[1:07:10] look in uh sorry, if we look in logfire

[1:07:13] here,

[1:07:16] um

[1:07:17] you'll see that most recent call here.

[1:07:20] Um, and you can see that the that the

[1:07:23] search uh agent run

[1:07:27] uh called the extract political

[1:07:29] relations tool with the input Steven

[1:07:32] Kinnick which is correct. Um, and so

[1:07:34] it's then

[1:07:36] uh gone and correctly output the value.

[1:07:38] But if you look inside the tool call, we

[1:07:40] then ran the other agent uh nested. Um,

[1:07:43] so it ran and it correctly extracted the

[1:07:46] right data. And so we're we're now using

[1:07:48] our agent and we can now basically

[1:07:51] uh click the value and improve the

[1:07:52] prompt now. And so I can come over here

[1:07:55] and to be fair, I'm not going to have a

[1:07:56] particularly good way of showing you

[1:07:57] that it's working better because it

[1:07:58] would seem to be working pretty well

[1:08:00] unless I can find an example where it

[1:08:01] where it wasn't. So let me actually try

[1:08:04] I've got a bit of time. Let me try and

[1:08:06] see if I can find an eval case where the

[1:08:10] dumb prompt was doing badly. Oh, we've

[1:08:11] got loads of runs now.

[1:08:15] Um,

[1:08:18] sorry. Let me I want this case here and

[1:08:21] I want

[1:08:23] to compare these two.

[1:08:30] And so if you look,

[1:08:33] so for example, this person here,

[1:08:37] uh, Paul Masky, it was like getting it

[1:08:40] wrong. the the done prompt was

[1:08:44] um no wrong way around.

[1:08:47] Um

[1:08:48] I want to find a case where it's done

[1:08:50] badly, where I can get it to do better.

[1:08:53] Okay, let's use Andrew Gwyn where the

[1:08:56] correct answer is no um political

[1:08:58] relations, but but the other but the two

[1:09:01] uh prompts both return suggested that

[1:09:03] they did have relations. And I'm sure

[1:09:04] that's because if we look it'll be

[1:09:07] because yeah they're a sports

[1:09:08] commentator their their father which the

[1:09:11] dumb prompt wrongly suggested was a

[1:09:13] political relation and so if I go and

[1:09:17] run

[1:09:19] this now with a bit of luck this is

[1:09:21] using the dumb or the poor prompt and so

[1:09:25] it should um find those relations and

[1:09:28] then conversely if I update it to the

[1:09:30] correct prompt it should find yeah so

[1:09:32] it's it's identified the sports

[1:09:33] commentator as a political relation. And

[1:09:36] now without redeploying, I can come over

[1:09:38] to manage variables, update the prompt

[1:09:41] that we're using. I think I may have a

[1:09:43] mistake here. Let me You didn't see me

[1:09:45] just go and tweak the code.

[1:09:49] Um,

[1:09:50] it's going to tweak the pro tweak the

[1:09:52] code to use this version of the task

[1:09:53] where we are using the instructions

[1:09:56] manage variable. Um,

[1:10:00] let me restart the server.

[1:10:04] Um, and now without redeploying, I

[1:10:06] promise you, uh, I'm going to go and

[1:10:08] create a new case here. And instead of

[1:10:10] the the simple prompt, I'm going to put

[1:10:12] in the best one we got back from, uh,

[1:10:17] running Jeepper.

[1:10:24] Save that.

[1:10:29] Um, and without further ado, without

[1:10:32] redeploying, I promise we go and run

[1:10:35] that again and it'll almost certainly go

[1:10:36] wrong because that's what things do. But

[1:10:38] we can hope

[1:10:42] and it's gone wrong. It's again

[1:10:43] identified it unfortunately. Um, but uh

[1:10:46] hopefully you get the get the principle

[1:10:48] here. Yes, there's a question

[1:10:52] >> this web interface where you search and

[1:10:54] get a response from the

[1:10:57] the

[1:10:58] what do you call this sub?

[1:11:02] >> Uh well the form and then the agent who

[1:11:03] I'm submitting to.

[1:11:04] >> Yeah.

[1:11:06] Do you have any thoughts about

[1:11:08] collecting feedback from from users like

[1:11:14] >> Yeah.

[1:11:15] >> And my number one piece of feedback is

[1:11:16] no one clicks them. And so there's a

[1:11:19] well maybe there's a mic but

[1:11:25] >> um um so

[1:11:28] >> also or or you could be like nefarious

[1:11:30] like myself and just click bad even

[1:11:33] though

[1:11:33] >> so so I'm uh my my experience is that if

[1:11:36] you're going to do it you do only thumbs

[1:11:37] up thumbs down. Um we have an annotation

[1:11:40] system that I'm I'm not demoing today

[1:11:41] where you can basically record

[1:11:43] annotations against prompts. That is

[1:11:44] another place to build your golden data

[1:11:47] set from or at least a starting point

[1:11:49] for your golden data set. Um the the

[1:11:53] best thing you can possibly do is

[1:11:55] something which is implicit in the

[1:11:56] users's exper the user's interaction. So

[1:11:59] if you have something that more advanced

[1:12:00] than this simple um text prompt but you

[1:12:03] have a you have a chat the single best

[1:12:06] way of getting of evaluating the

[1:12:08] performance of a given question response

[1:12:11] pair is to look at what the user did

[1:12:13] next. Because if the user says, "You

[1:12:14] idiot, try again." You can get pretty

[1:12:16] strong evidence that they've that the

[1:12:18] that the agent behaved badly. And if the

[1:12:20] user is like, "Thanks, that's great." or

[1:12:21] goes away, you assume it's right. And if

[1:12:23] they they probably don't, it's probably

[1:12:24] not as extreme as you idiot, try again.

[1:12:26] But it's probably like, "No, I mean X."

[1:12:28] And so, and that's that's how Google

[1:12:29] works, right? Like the way they identify

[1:12:31] how good a website is back in the old

[1:12:33] days when we used uh Google was to see

[1:12:36] how long you spent on a site. If you

[1:12:37] came straight back and searched, clicked

[1:12:39] on another link, they assumed the page

[1:12:40] was bad. And this form here is it a chat

[1:12:43] or is it if you

[1:12:44] >> this is just I honestly just asked

[1:12:46] Claude go build me a go build me a

[1:12:48] single pane chat

[1:12:48] >> like

[1:12:49] >> we have um we have uh an integration

[1:12:52] with Vel AI pro AI protocol so that you

[1:12:56] can basically build a full chat

[1:12:57] interface on a panaski agent in in like

[1:13:01] a few lines of code supposedly that I

[1:13:03] would try and demo if I had a bit more

[1:13:05] time but you this is just me trying to

[1:13:07] have like the simplest example to run in

[1:13:10] fact go on I'll have one try at doing it

[1:13:12] now since that one didn't

[1:13:12] >> work and just and a chat would mean that

[1:13:15] it kept its context somewhat right.

[1:13:18] >> Yeah. Yeah. So if I do if I um get rid

[1:13:22] of this single run and instead I do uh

[1:13:26] what what's the agent called?

[1:13:31] Uh relations agent

[1:13:33] dot uh to web.

[1:13:38] Um, and then I go and run. Uh, let me

[1:13:41] kill that web server to avoid confusion.

[1:13:44] Um,

[1:13:50] why is that not running?

[1:13:56] Uh, maybe I do need to call.run.

[1:14:01] Uh, maybe I'm forgetting exactly how to

[1:14:02] call it, but like the principle is that

[1:14:04] we basically one line of code here. If I

[1:14:05] remember what it is, you can basically

[1:14:07] turn that into a proper chat interface.

[1:14:09] Um

[1:14:11] um let me just see if the docs will tell

[1:14:15] me what it is quickly.

[1:14:17] Um,

[1:14:33] so I I define the app which gives you a

[1:14:35] stylet app and then I run

[1:14:38] uh UV run uvicorn task uh app

[1:14:44] and there's a typo. So,

[1:14:50] and that should give me a like nice

[1:14:52] interface now to go and ask questions

[1:14:54] where I can where I can inter where I

[1:14:55] can say like um

[1:15:03] uh maybe I

[1:15:07] I don't know if that's going to work,

[1:15:08] but we will try it.

[1:15:11] But the point is now I would um uh you

[1:15:14] would get back a final result of it

[1:15:16] would it would go and like you could use

[1:15:17] it like an agent and then you could ask

[1:15:19] follow-up questions. I mean this agent

[1:15:20] is designed to always reply with

[1:15:21] structured data. So it's not very chatty

[1:15:23] but you get the idea. Um I'm going to

[1:15:26] stop there. Um thank you very much.

[1:15:28] Happy to answer any questions

[1:15:30] afterwards.

[1:15:37] >> Sorry. Did you have a question?

[1:15:41] Go on.

[1:15:42] >> Thank you. Can you hear me? Yeah.

[1:15:44] >> Yep.

[1:15:44] >> Uh do you have cool use cases internally

[1:15:48] where you use your stack but like agents

[1:15:50] that you've built? Because I hear like a

[1:15:52] lot of u look how many tokens are we

[1:15:54] burning and look my but have you seen

[1:15:57] some like you mentioned the private

[1:16:00] equity firms earlier like those are

[1:16:02] classic old problems classifiers. Do you

[1:16:05] have use cases that internally you're

[1:16:07] really impressed by agents or what the

[1:16:10] team is using internally to ship faster

[1:16:12] or create more value for either you or

[1:16:15] your clients? So we have the there's a

[1:16:17] there's an agent inside logfire to

[1:16:19] basically you do free tech search and it

[1:16:21] converts to SQL and we optimize that

[1:16:23] agent a fair bit. Um we don't care

[1:16:26] particularly about token count in that

[1:16:27] case because it's not high enough

[1:16:28] volume. We do care about generating good

[1:16:30] SQL. The reason we can't use it is that

[1:16:33] it very often ends up with like private

[1:16:35] data within the SQL as in someone will

[1:16:37] say find me results for invoice 1 2 3 4

[1:16:40] 5 and we don't want to go and show

[1:16:41] people that. It's one of the reasons we

[1:16:42] can't use that example in in demos. Um I

[1:16:45] think there was another question. Does

[1:16:46] that answer the question?

[1:16:51] >> Right. So in logf fire is it possible to

[1:16:54] kind of offiscate or encrypt the input

[1:16:57] and the output and just evaluate against

[1:17:00] a golden set. Let's say if you have set

[1:17:02] up an application to work in a field

[1:17:05] with sensitive information like medical

[1:17:07] or

[1:17:08] >> so you can choose not to send the system

[1:17:10] prompt or anything to the agent and just

[1:17:12] basically record the the output could be

[1:17:15] for example the performance like good or

[1:17:17] bad and then you have the metrics. You

[1:17:19] can choose not to send the the raw data.

[1:17:21] It's obviously less valuable. My

[1:17:24] somewhat biased answer would be you can

[1:17:25] obviously enterprise self-host logfire

[1:17:27] and then you can have it inside your

[1:17:28] VPC. Um that's probably what people do,

[1:17:31] but yes, you can do it without without

[1:17:33] recording the like actual input and

[1:17:35] output.

[1:17:36] >> Great.

[1:17:36] >> What what people do in those cases. So

[1:17:38] for example the big like Lora and Harvey

[1:17:41] the like the legal tech companies where

[1:17:43] they are very strictly not allowed to

[1:17:45] exfiltrate the the data because it is

[1:17:48] their client's clients very private data

[1:17:50] is they record categorical performance.

[1:17:53] So like good bad whatever like you could

[1:17:55] have like 50 grades of how it performed

[1:17:57] but like and you can exfiltrate

[1:17:59] exfiltrate that data without actually

[1:18:01] exfiltrating like any um generated

[1:18:05] content where you might include private

[1:18:07] data.

[1:18:09] Any other questions? Yeah, there's one

[1:18:12] here.

[1:18:21] >> Thank you. This is uh a tiny bit of an

[1:18:23] internal question. I noticed that uh

[1:18:25] you're using data classes throughout.

[1:18:27] >> Y

[1:18:28] >> uh is that for speed reasons or any

[1:18:30] other reasons?

[1:18:31] >> I think they're just the canonical thing

[1:18:32] in in Python. And so they're like if

[1:18:34] you're not trying to perform validation

[1:18:36] I think that they're generally the kind

[1:18:38] of yeah the canonical choice over

[1:18:39] pyantic models it doesn't make any

[1:18:42] difference the performance of any of any

[1:18:43] of these cases the pantic validation or

[1:18:45] the data class construction time will be

[1:18:48] shrinking you know 0001% of the

[1:18:51] performance.

[1:18:52] >> Thank you.

[1:18:58] >> Thanks for the presentation. I had a

[1:19:00] quick question. So with the um prompt

[1:19:02] optimization obviously that's like a

[1:19:05] type of context engineering right. So I

[1:19:07] was wondering have you done evals where

[1:19:09] you've combined that with um essentially

[1:19:12] some because obviously when you there's

[1:19:14] context degradation even though the

[1:19:15] context windows are so big obviously

[1:19:17] after like five or so it'll still be

[1:19:18] less than or after 20 you know calls it

[1:19:22] will be less than very quickly. So

[1:19:23] combining prop optimization, we're just

[1:19:25] spinning up new um LLM calls and new

[1:19:29] context uh restarts as opposed to say

[1:19:32] compaction which still reduces as well.

[1:19:34] >> The compaction strategy is definitely

[1:19:36] one of the things you want to go and

[1:19:37] optimize in a more complex case. I think

[1:19:39] here we optimize for something that

[1:19:40] everyone can gro in a in a in a session

[1:19:42] rather than the most complex use cases.

[1:19:45] But yes, definitely that's that's

[1:19:46] relevant. So, for example, the the

[1:19:49] Shopify example of like uh how they were

[1:19:52] analyzing these sites with GPT5, you

[1:19:55] could just give it the entire content of

[1:19:56] the website and be like, "Hey, go figure

[1:19:58] out whether this is fraudulent." Using a

[1:20:00] Quen model, you couldn't do that. You

[1:20:02] needed to do something more agantic

[1:20:03] where it like performed a bunch of like

[1:20:05] queries to look for certain terms. And

[1:20:09] so that is a like variation on context

[1:20:11] engineering to basically allow a smaller

[1:20:13] model to perform the same task and be

[1:20:15] more deterministic.

[1:20:16] >> Great. Thank you.

[1:20:19] >> Stop. Apparently I have to stop. Thank

[1:20:20] you everyone.