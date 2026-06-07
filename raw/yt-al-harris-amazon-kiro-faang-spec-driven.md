---
title: "Spec-Driven Development: Agentic Coding at FAANG Scale and Quality — Al Harris, Amazon Kiro"
author: "AI Engineer"
source: "youtube.com"
url: "https://www.youtube.com/watch?v=HY_JyxAZsiE&t=3139s"
date_saved: "2026-06-07T02:08:38.135Z"
---

# Spec-Driven Development: Agentic Coding at FAANG Scale and Quality — Al Harris, Amazon Kiro

[0:20] For those of you who haven't heard of

[0:22] us, Kira is an agentic ID. Um, we

[0:25] launched generally available this most

[0:27] recent Monday, I think the 17th, but we

[0:29] launched public preview on, uh, in July,

[0:32] >> uh, I think July 14th. So, out there for

[0:35] a few months getting customer feedback,

[0:37] um, all that good stuff. We're going to

[0:38] talk a little bit about using Spectriven

[0:40] development to sharpen your AI toolbox.

[0:42] I did a show of hands. About a quarter

[0:43] of the people here familiar with

[0:44] Spectrum and Dev. My name is Al Harris.

[0:46] Um, principal engineer at Amazon. I've

[0:48] been working on Curo for the last. Uh,

[0:50] and we're a very small team. We were

[0:52] basically three or four people sitting

[0:54] in a closet doing what we thought we

[0:56] could do to improve um the software

[0:58] development life cycle for customers. So

[1:01] we were ch we were charged with building

[1:03] a development tool that's that answered

[1:05] um that improved the experience for

[1:07] spectrum and development. We were

[1:09] theoretically funded out of the org that

[1:11] supported things like QDV but we were

[1:13] purposefully a very different product

[1:14] suite from the QE system to just take a

[1:17] different take on these things. So we

[1:19] wanted to work on scaling, you know,

[1:20] helping you scale AI dev to more complex

[1:22] problems. Uh improve the amount of

[1:24] control you have over AI agents and

[1:26] improve the code quality and maintain uh

[1:28] reliability, I should say, of what you

[1:30] got out the other end of the pipe. Now

[1:32] we're back to new content. Um so our

[1:35] solution was specri. We took a look at

[1:37] some existing stuff out there and said,

[1:38] "Hey, vibe coding is great, but vibe

[1:40] coding relies a lot on me as the

[1:42] operator getting things right. That is

[1:44] me giving guardrails to the system. And

[1:45] that is me uh putting the agent through

[1:48] a uh kind of a strict workflow. We

[1:50] wanted Spectri driven dev to sort of

[1:52] represent the holistic SDLC because

[1:54] we've got you know 25 30 years of

[1:56] industry experience um building uh

[1:59] software building it well and building

[2:01] it with different practices right we've

[2:03] gone through waterfall at XP um we have

[2:06] all these different ways that we

[2:07] represent what a system should do and we

[2:09] want to effectively respect what came

[2:11] before.

[2:12] So uh this animation looked a lot

[2:15] better. It was initially just the left

[2:17] diamond but I the idea was hey you know

[2:19] you basically are iterating on an idea.

[2:21] I think like half of software

[2:23] development is discovery requirements.

[2:25] Um and that discovery doesn't just

[2:26] happen by sitting there and thinking

[2:28] about what what should the system do?

[2:29] What can the system do? We we realized

[2:32] though kind of working on this that the

[2:33] best way to make these systems work is

[2:35] to actually synthesize the output and be

[2:37] able to feed that back really quickly.

[2:38] things like your input requirements um

[2:41] to actually do the design and feedback

[2:43] you know realize oh actually if we do

[2:45] this there's a side effect here we

[2:46] didn't consider we need to feed that

[2:47] back to the input requirements and so

[2:50] this compression of the SDLC evolved to

[2:52] bring structure into the software

[2:54] development flow we wanted to take um

[2:58] the artifacts that you generate as part

[2:59] of a design that's the requirements that

[3:01] maybe a product manager or developer

[3:03] writes that's going to be the acceptance

[3:04] criteria what does success look like at

[3:07] the end of this and then we want to the

[3:08] design artifacts that you might review

[3:10] with your dev team, you might review

[3:11] with you know stakeholders and say this

[3:13] is what we're going to go build and

[3:14] implement the thing and we want to make

[3:16] sure that you can do this all in some

[3:17] tight inner loop. Um and ult that was

[3:20] initially what spectriven dev was

[3:23] um what spectriven development in hero

[3:27] is today or at least was before it went

[3:29] g was uh you give us a prompt and we

[3:32] will take that and turn it into a set of

[3:34] clear requirements with acceptance

[3:35] criteria. We represent these acceptance

[3:37] criteria in the EARS format. EARS stands

[3:39] for the easy approach to requirement

[3:41] syntax. Um, and this lets you really

[3:44] easily uh it's effectively a structured

[3:46] natural language representation of what

[3:48] we you want the system to do. Now, for

[3:51] the first four and a half months this

[3:52] product existed, the ears format looked

[3:54] like kind of an interest decision we

[3:56] made, but just that sort of interesting.

[3:58] Um and with our launch, our general

[4:00] availability launch on Monday, we have

[4:02] finally started to roll out some of the

[4:03] side effects of which is property based

[4:06] testing. Um so now your ears

[4:08] requirements can be translated directly

[4:10] into properties of the system which are

[4:12] effectively invariants that you want to

[4:13] deliver. Um, for those of you who have

[4:16] or like have not I guess done property

[4:19] based testing in the past using

[4:20] something like I think it's a hypothesis

[4:23] in Python or fast check and node um

[4:27] closures spec library is another

[4:29] example. These are uh approaches to

[4:32] testing your software system where

[4:34] you're effectively trying to produce a

[4:35] single uh test case that that falsifies

[4:38] the invariant that you want to prove.

[4:40] And if you can find any uh contraositive

[4:44] then you can say this requirement is not

[4:45] met. If you cannot you have some high

[4:47] degree of confidence where the word high

[4:50] there is doing a little bit of heavy

[4:51] lifting because it depends on how well

[4:52] you write your tests but you can say

[4:56] with a high degree of confidence that

[4:57] the system does exactly what you're

[5:00] saying it does. Um yeah, so a property

[5:05] we we'll get a little bit more into

[5:07] property based testing and PBTs a little

[5:08] later, but this is the first step of

[5:11] many we're taking to actually take these

[5:13] structured natural language requirements

[5:15] and then tie this with a throughine all

[5:17] the way to the finished code and say if

[5:19] your code if the properties of the code

[5:22] meet the initial requirements, we have a

[5:25] high degree of confidence that you have

[5:27] re uh reliably shipped the the software

[5:29] you expected to ship.

[5:31] So with spectriven dev, we take your

[5:34] prompt, we turn it into requirements, we

[5:36] pull a design out of that, we define

[5:38] properties of the system and then we

[5:40] build a task list and we go and you can

[5:42] run your task list. Effectively the spec

[5:45] then becomes the natural language

[5:46] representation of your system. It has

[5:48] constraints, it has concerns um around

[5:52] functional requirements, non-functional

[5:53] requirements and it's this set of

[5:55] artifacts uh that you're delivering. So

[5:57] I don't think I have the slide in this

[5:59] deck, but ultimately the way I look at

[6:00] spec is that it is one a set of

[6:02] artifacts that represent sort of the

[6:04] state of your system at a point in time

[6:05] t. It is two a structured workflow that

[6:08] we push you through to reliably deliver

[6:10] high-quality software and that is the

[6:12] requirements design um and execution

[6:15] phases. And then three it is a set of

[6:18] tools and and um systems on top of that

[6:20] that help us deliver reproducible

[6:22] results where one example of that is

[6:24] property based testing. Another example

[6:26] of that which is a little less obvious

[6:28] but we can talk about later is going to

[6:29] be um I don't even know what to call it

[6:33] uh requirements verification. So we scan

[6:35] your requirements for over ambiguity. We

[6:37] scan your requirements for um invalid

[6:41] constraints eg uh you have conflicting

[6:44] requirements and we help you resolve

[6:46] those ambiguities using sort of classic

[6:48] uh automated reasoning techniques. Um

[6:51] and I could talk a little bit more about

[6:52] sort of the the features of Kira. I

[6:55] think that's maybe less interesting for

[6:56] this talk because we want to talk about

[6:57] spectrum and dev. We have all the stuff

[6:59] you would expect though. We have

[7:01] steering which is sort of memory and

[7:02] sort of cursor rules. We have MCP

[7:05] integration. We have you know image yada

[7:08] yada. Um so we have ways to and we have

[7:10] software hooks. Um so let's talk a

[7:13] little bit about sharpening your tool

[7:15] chain. And I'm going to take a break

[7:16] really quick here. Uh just pause for a

[7:18] moment for folks in the room who had

[7:20] maybe tried downloading Curo um or

[7:24] something else and just say are there

[7:25] any questions right now before we dive

[7:27] into how to actually use spec to achieve

[7:29] a goal?

[7:32] No questions. It could be a good sign.

[7:35] Could mean I'm not uh talking about

[7:37] anything that's particularly

[7:37] interesting. So um I actually want to

[7:40] like talk in some concrete detail here.

[7:43] Uh this is a talk I gave a few months

[7:45] ago on how to use MCPS in Kira. And so

[7:48] one of the challenges that people who

[7:49] had tested out Kira had that might be a

[7:52] little easier to see was that they

[7:56] um they felt that the flow we were

[7:58] pushing them through was a little bit

[8:00] too structured like you don't have

[8:02] access to external data, you don't have

[8:04] access to the to all these other things

[8:05] you want. And so one thing that we said

[8:07] on our journey here towardsing your um

[8:12] oh you know what this out of order

[8:13] here's my nice AI generated image. So

[8:16] you can use MCP. Everybody here I assume

[8:18] is familiar with MCP at this point. But

[8:20] uh Curo integrates MCP the same way all

[8:23] the other tools do. Uh but what I think

[8:26] people don't do enough is use their MCPs

[8:28] when they're building their specs. And

[8:30] so you can use your MCP servers in any

[8:33] phase of the specdriven development

[8:34] workflow. That's going to be

[8:36] requirements generation, design, um, and

[8:38] implementation. Um, and you can use,

[8:42] we'll go through an example of each. So,

[8:45] first of all, to set up a spec in Kuro

[8:47] is fairly straightforward. We have the

[8:48] Kuro panel here, which there's a little

[8:51] ghosty um, and then you can go down to

[8:54] your MCP servers and click the plus

[8:56] button. You can also just my favorite

[8:57] way to do it is to ask Kirro to add an

[9:00] MCP uh and then give it some some

[9:03] information on where it is and it can go

[9:05] figure it out usually from there or you

[9:07] just give it the JSON blob and it'll

[9:08] figure it out. Once you have your MCP

[9:10] added, you'll see it in the control

[9:11] panel down here and you can enable it,

[9:13] disable it, allow list tools, disable

[9:15] tools, etc. So you can manage context

[9:17] that way. Worth noting changing MCP and

[9:20] changing tools in general is a caching

[9:22] operation. So if you're very deep into a

[9:24] long session, maybe don't tweak your MCP

[9:26] config because it will slow you down

[9:28] dramatically. But let's talk about um

[9:31] MCP inspect generation. So something I

[9:34] the Curo team uses a um for reasons I

[9:38] don't know, but it's our task tracker of

[9:41] choice. Uh but so one thing I want to do

[9:43] is uh maybe go and say I don't want to

[9:46] write the requirements for a spec from

[9:47] scratch. My product team has already

[9:49] done some thinking. We've iterated in a

[9:50] sauna to kind of break a project down.

[9:52] This is not always how things work, but

[9:54] sometimes how things work. So in this

[9:55] case, I have I have a task in a sauna.

[9:58] Oh no, I did the wrong thing.

[10:02] That's what I get for zooming. So I have

[10:05] this task in in a sauna that says add

[10:07] the view model and controller to this

[10:08] API. In this case, this was a demo app

[10:11] that I can figure in a few minutes. And

[10:13] we even had like it's kind of peeking

[10:16] under here, but we had some details

[10:17] about what we wanted to have happen. Now

[10:19] I can go into Kira and just say start

[10:21] executing task XYZ URL from ASA and Kira

[10:25] is going to recognize this is an Asana

[10:27] URL. I had the ASAN MCP installed. It

[10:29] goes and pulls down all the metadata

[10:31] there. Um da da da. So it's going to

[10:33] break out and from there start um

[10:36] start determining what to work on. Um

[10:43] oh it's funny these titles are

[10:44] backwards.

[10:46] basically create a spec for my open

[10:48] asauna tasks. Again, go pull from a

[10:50] sauna all the tasks and then for each

[10:52] one generate um requirements based on

[10:55] those tasks. So I think I had like six

[10:56] tasks assigned to me. One is do user

[10:59] management, do some sort of um

[11:04] uh property management da da da it

[11:06] pulled them in generated the

[11:07] requirements and then in this case title

[11:10] is wrong apologies start executing task.

[11:13] this is I want to go and do the code

[11:14] synthesis for this um and I will take a

[11:17] quick break here to talk about how you

[11:20] can do this in practice. So for those of

[11:21] you who are you know following along in

[11:23] room uh feel free to fire up your curo

[11:26] open a project and then picking a an MCP

[11:29] server. I'll share a few repos here

[11:31] really quick that you can play around

[11:32] with.

[11:35] So

[11:37] I have an MCP server implemented.

[11:41] I have

[11:48] this lofty views which I think

[11:50] implements the asauna. Um and then these

[11:53] should all be public. Let me just double

[11:55] check.

[11:57] Yeah. Okay. So for example, if you

[11:59] wanted to extend my I have a Nobel Prize

[12:01] MCP which curls perhaps unsurprisingly

[12:05] there is a Nobel Prize API. Um, so you

[12:07] can use UVX to install it or you can get

[12:10] clone this Al Harris at Nobelmcp.

[12:13] Uh, this is just one example. Another

[12:15] one here is if you want to play around

[12:16] with the sample that's in the video. Um,

[12:18] I have Al Harris atlofty Views. Um, I'll

[12:21] leave these both sort of up on the

[12:23] screen for a few moments for folks who

[12:25] do want to copy the uh the URLs.

[12:31] But while that is happening,

[12:34] oh no, let's put you on the same window.

[12:48] So what I'll demo quick is the usage of

[12:51] an MCP to make like spec generation much

[12:54] easier or more reliable. So here I have

[12:58] let's see Got

[13:01] a lot of MCPs. Which ones do I actually

[13:04] want to use?

[13:11] Let's use the GitHub MCP.

[13:15] Oh, no.

[13:18] Ignore me.

[13:23] That's better. Okay. Well, I have the

[13:24] fetch MCP. So in this case I could for

[13:27] example come in here and say hey I've

[13:30] generated a bunch of tasks lofty views

[13:33] app. This is basically a very simple

[13:34] CRUD web app. Um but I want Kira to

[13:41] uh use the fetch MCP to pull examples

[13:44] from similar products that exist on the

[13:47] internet. You could also use you know

[13:48] Brave search or Tavlet search MCP

[13:50] servers but in this case I'll just use

[13:52] fetch because I've got it enabled. Um,

[13:54] so let's say,

[13:57] oh actually we can run the web server

[13:59] and use fetch. That's a good example.

[14:20] This is one example of you can at any

[14:22] point in the workflow generating a spec

[14:24] go through and um you know use your MCP

[14:27] servers to get things working. No, this

[14:31] is what I get for not using a project in

[14:32] a while.

[14:36] We'll cancel that. We can actually do

[14:38] something a little more interesting

[14:39] which is a separate project I've been

[14:41] working on. Um, so I've been working on

[14:43] a an agent core agent and that might be

[14:47] I I know the project works, which is the

[14:49] reason I'll fire it up here. Should I

[14:51] call it?

[15:04] Well, maybe we'll do live demos at the

[15:05] end.

[15:07] So that's sort of like the most basic

[15:09] thing you can do with Kira is just use

[15:11] MCP servers, but any tool uses MCP

[15:13] servers. I actually don't think that's

[15:15] particularly interesting. So let's say

[15:17] in sort of this process of trying to

[15:19] sharpen our our spec dev toolkit, we've

[15:21] finished up with the 200 grit. We've

[15:23] added some capabilities with MCP. It's

[15:25] useful, but it's not going to be a

[15:26] gamecher for us. I want to come in here

[15:28] and actually get up to the 400 grit.

[15:30] Let's get start to get a really good

[15:31] polish on this thing. I want to

[15:33] customize the artifacts produced because

[15:35] you've got this task list, you've got

[15:37] this requirements list and I don't agree

[15:38] with what you put in there, Al. Um, you

[15:41] could say that a lot of people do and I

[15:43] that's a a great starting point. So,

[15:46] here's something I heard earlier in the

[15:48] week at um, you know, earlier in the

[15:50] conference is that people like to do

[15:51] things like use wireframes in their

[15:53] mocks. Um, use wireframe mocks because

[15:55] in your specs are natural language,

[15:58] you're using specs as a control surface

[16:00] to explain what you want the system to

[16:01] do. Uh therefore I want to be able to

[16:03] actually put UI mocks in here. So the

[16:06] trivial case is that I just come in here

[16:07] and say Kuro's asked me here does does

[16:10] the design look good? Are you happy? And

[16:12] I said this looks great but could you

[16:13] include wireframe diagrams and ask you

[16:15] for the screens we're going to build

[16:17] here. I'm adding this is again from that

[16:20] lofty views thing. I'm adding a user

[16:21] management UI but I want to actually see

[16:24] what we're sort of proposing building

[16:25] not just the architecture of the thing.

[16:27] So your cure is going to sit here and

[16:28] churn for a few seconds, but you can add

[16:30] whatever you want to any of these

[16:31] artifacts because they're natural

[16:32] language. So they're structured, which

[16:34] means we want some re um some sort of

[16:38] reproducibility in what they look like,

[16:40] but ultimately what they look like

[16:41] doesn't matter because we've got the the

[16:43] any machine here, the agent sitting that

[16:45] can help translate it to what it needs

[16:46] to be. So Kira's churning away here.

[16:49] It's thinking thinking and then it's

[16:51] going to spit out these uh text wrapped

[16:54] asy diagrams. I'll fix the wrapping here

[16:56] in a second in the video, but ultimately

[16:58] like

[17:01] you know it does whatever you want. So

[17:03] if you want additional data in your

[17:06] requirements, you can do that. If you

[17:08] want additional data in the design like

[17:10] this, uh you can easily add that. Here

[17:13] we've got sort of these wireframes in

[17:14] ASKI that help me sort of rationalize

[17:16] what we're actually about to ship. Um,

[17:18] and then I can again continue to chat

[17:20] and say actually in the design I don't

[17:22] want um, you know, maybe I don't want

[17:25] this add user button to be up at the top

[17:26] the entire time in which case I could

[17:28] chat with it to make that change easily

[17:30] and now we're on the same page up front

[17:32] instead of later during implementation

[17:34] time. So we've again sort of left

[17:35] shifted some of the concerns. Um, so

[17:38] that's one example. You know, I want to

[17:39] add UI mocks to the design of a system.

[17:42] Another example though could be this.

[17:43] Um, oh, this is a just a quick snapshot

[17:46] of the end state there where now my

[17:48] design does have these UI mocks.

[17:51] Um, but another example that I actually

[17:53] like a little bit more is this uh

[17:55] including test cases in the definition

[17:57] and tasks. So today the tasks that cure

[18:00] will give you will be kind of the bullet

[18:02] points of the requirements and the

[18:03] acceptance criteria you need to hit. But

[18:06] I want to know that at the end state of

[18:08] this task being executed, we have a

[18:10] really crisp understanding that it is

[18:12] correct. It's not just like done because

[18:14] the a anybody who's used an agent can

[18:16] probably testify that um the LMS are

[18:18] very good at saying I'm done. I'm happy.

[18:20] I'm sure you're happy. I'm just going to

[18:22] be complete. Oh, yeah. The tests don't

[18:23] pass but they're annoying. I tried three

[18:26] times them to work. I'm just going to

[18:27] move on. Um no, I don't want that. I

[18:30] want to actually know that things are

[18:31] working. So, in this case, I've asked

[18:32] Hero to um include explicit unit test

[18:35] cases that are going to be covered. So

[18:37] my task here for example in create

[18:38] creating this agent core memory checkp

[18:40] pointer is going to have all the test

[18:42] cases that need to pass before it's

[18:43] complete and then I can use things like

[18:45] agent hooks to ensure those are correct.

[18:47] We'll run this uh sample a little later

[18:48] in the talk. Um this is the thing I'm

[18:51] ready to little demo.

[18:53] Uh yeah, so this is another example

[18:55] where you can again you're you're

[18:57] working on your toolbench. You're sort

[18:58] of you have all these capabilities and

[19:00] primitives at your control and you can

[19:03] tweak the process to work for you, not

[19:05] just the process that I think is the

[19:07] best one. And then sort of last but not

[19:09] least, the 800 grit. At this point,

[19:11] we're getting a final polish on the

[19:13] tool. Uh we might be stropping necks,

[19:15] but we want to, you know, you can

[19:17] iterate on your artifacts, but you can

[19:18] also iterate on the actual process that

[19:21] runs. So, one thing you might have, and

[19:24] I do this a lot, is I'll I'll be

[19:25] chatting with Kira, and I say, "Hey, I

[19:28] want to um in this case, I want to add

[19:31] memory to my agent in agent core. Um,

[19:35] let's dump conversations to an S3 file

[19:37] at the end of every execution." Cur is

[19:39] going to say, "That's great. I know how

[19:40] to do that. I'm going to research

[19:41] exactly how to do that thing. I will

[19:43] achieve this goal for you." But

[19:45] ultimately what I've done is actually

[19:47] introduce a bias up front which is I'm

[19:49] steering the whole agent using S3 as

[19:51] this storage solution just because maybe

[19:53] I'm familiar with it but it's probably

[19:55] not the best way to go about it. So then

[19:57] after it had synthesized the design and

[19:59] all the tasks and all this stuff I came

[20:01] back and said well like we don't need to

[20:03] stick to this rigid spectriven dev

[20:04] workflow that I've that has been defined

[20:06] by Kirao. I can ask for alternatives

[20:08] like is this the idiomatic way to

[20:09] achieve session persistence? I don't

[20:12] know maybe there's a better way. Maybe

[20:14] if we're talking AWS services, it's not

[20:16] S3, it's Dynamo or yada yada. Uh Kira's

[20:19] going to come in here and say, you know,

[20:21] good question. Uh da da da. Let me

[20:23] research. It's going to go through call

[20:25] a bunch of MCP tools that I've given it

[20:27] access to. This kind of ties back to

[20:29] that you should be using MCP. And then

[20:31] it comes back with this recommendation

[20:32] that I didn't know was a feature, which

[20:34] is Asian core memory. Um it says it's

[20:37] more idiomatic and future proof that

[20:39] maybe is TBD and should be checked a

[20:41] little closer. Um, but uh or you could

[20:44] use S3, which is the thing you

[20:46] recommend. Now, actually, I I bet

[20:48] there's far more than two options here.

[20:50] So, you could probably keep asking the

[20:51] agent, are there other options, yada

[20:53] yada, and it would go and continue to

[20:54] investigate, but you should not lock

[20:56] yourself into the rigid flow that is

[20:58] sort of the starting point here. Um,

[21:01] yeah. So, that that's actually I think

[21:03] it for my deck. Um what I will talk

[21:06] about

[21:08] is let's just run through that sample I

[21:10] just had up there which is that um

[21:15] so

[21:17] basically let me delete delete it and

[21:20] I'll just do a live demo of sort of

[21:21] specs in Curo and how we can fine-tune

[21:24] things a little bit. So this project is

[21:27] a Node.js app. It is a um it's a CDK.

[21:32] Again, I'm not trying to sell more AWS.

[21:36] This is just the technologies I'm

[21:37] familiar with, so I can move a lot more

[21:38] quickly. So, I wanted to know a little

[21:40] bit about agent core, which is a new AWS

[21:42] offering. And as somebody building an

[21:44] agent, I should probably be familiar

[21:45] with it. So, and I'm not familiar enough

[21:48] with it. So, I've got we've got some

[21:49] other people here who know a lot about

[21:50] it. So, put my hand up a little bit and

[21:53] you know, you caught me. So, I set up a

[21:55] CDK stack, which is just um you know, IA

[21:58] technology to deploy software. I'm

[22:00] familiar with it and I love it. Uh, so I

[22:03] have a stack here that lets me deploy

[22:05] whatever an agent core runtime is. I

[22:07] don't know. I asked Kira to do it. We

[22:09] vibe coded this part. So we vibe coded

[22:11] the general structure. We got an agent.

[22:13] We got IA set up. I then vibe code added

[22:15] commit lint. I added husky. A few things

[22:18] like this that I like for my own

[22:19] TypeScript projects. Um, prettier and

[22:21] eslint I think. So we have a basic

[22:23] product here or like a basic project

[22:25] here that I know I can deploy to my

[22:27] personal AWS account. Um, now I'm going

[22:30] to come in here and oh, and then

[22:32] importantly, this is super important

[22:34] because I don't know how the hell agent

[22:36] core works. And I could go read the

[22:38] docs, but the docs are long and they're

[22:40] complicated and I'm really just trying

[22:41] to build out a PC to to like learn about

[22:43] it myself. So, I added two MCP servers.

[22:49] Oh, no, maybe I didn't. Let me check.

[22:53] Oh, okay. Yes, sorry. Buried down here

[22:55] at the bottom. So this is my Kira MCP

[22:58] config. I added one important MCP server

[23:01] here which is the AWS documentation one.

[23:03] There's other ways to get documentation.

[23:05] You can use things like um Tessle level

[23:08] 7 but in this case this is vended by

[23:10] AWS. So I have some confidence that it

[23:12] might be correct. So I used this to help

[23:16] the agent have knowledge about sort of

[23:18] what technologies exist. And I think I

[23:19] used fetch quite a bit as well. So these

[23:21] are the two sets of um

[23:24] these are the two step sets of uh MCP

[23:27] servers I provided the system. That's

[23:29] great. Move on.

[23:32] Confirm. So

[23:34] and I'll just rerun this from scratch.

[23:37] So what I had done yesterday evening or

[23:39] maybe the evening before was I sat down

[23:42] and I have this system sort of basically

[23:46] working and now I want to start doing

[23:47] specri development. So, I want to add

[23:49] this uh session ID concept and then I

[23:52] want to read conversation to an S3 file

[23:54] blah blah blah. This is the whole sort

[23:56] of bias thing I showed you earlier.

[23:58] We're going to fire that off through

[23:59] Curo. It's going to start running uh

[24:01] chugging away and then it's going to,

[24:04] you know, see if the spec exists. Uh,

[24:06] okay, the folder does exist. It's

[24:08] probably going to realize there's no

[24:09] files there and start working away. But,

[24:12] um, from here I'll sort of live demo.

[24:14] It's going to read through require. It's

[24:16] going to read through existing docs.

[24:17] It's going to read through existing

[24:18] files, gather the context it needs.

[24:20] Sure, in a way. Um,

[24:23] but in a moment once it generates sort

[24:25] of the initial requirements and design,

[24:27] I am going to challenge it to use its

[24:28] own, you know, MCQ servers. I want you

[24:31] to go and do some research on the best

[24:32] way to do this and provide me some

[24:33] proposals. Um, and this is why I was

[24:36] hoping to get the clip on mic working

[24:38] because I've got to set this down for a

[24:39] moment.

[25:05] Okay. So, you know, I don't know if this

[25:08] is the best way to do this. Um, go read

[25:10] docs, go use fetch. D. It's going to

[25:12] keep kind of churning away here and then

[25:14] come back to me after it's probably got

[25:16] a few ideas and proposed it. But, um,

[25:18] this is an example of me just using

[25:21] additional capabilities. uh use fetch,

[25:23] use the docs MCP, use whatever you can

[25:26] to get the best information and don't

[25:27] take at face value the things that I

[25:29] said. These are usually things we have

[25:31] to prompt pretty hard to get the agent

[25:32] to do, but if you're doing it in real

[25:34] time, it works fairly well. Um, again,

[25:37] the agent, all of these agents are going

[25:39] to be very easy to please. So, you know,

[25:41] just cuz I said something in the stupid

[25:43] docs, it may or may not actually be the

[25:45] most important thing from the agents

[25:46] perspective down the road. So, you know,

[25:49] okay, so it's done a little bit of

[25:50] research. It understands the lang graph

[25:52] which is the agent framework we're using

[25:54] already has this knowledge of

[25:55] persistence

[25:57] um da da da and actually in this case it

[26:01] didn't find it did not use the mcp for

[26:03] uh agent core docs who didn't find that

[26:05] agent core has this knowledge of

[26:06] persistence um so maybe you like let's

[26:10] assume I don't I still don't know that

[26:11] exists because I didn't dry run this a

[26:13] few days ago um we might have to find

[26:15] that later the design phase so first

[26:18] thing it's going to do is kind of

[26:19] iterate over all my requirements

[26:20] requirements here. Um, you know, it's

[26:23] changed the requirements based on what

[26:24] it now knows about Langraph and how it

[26:26] can natively integrate with the uh

[26:28] checkpointing, but it's still really

[26:30] crisply bound to this like S3 decision

[26:32] that I made implicitly in the ask. Um,

[26:35] so that is just something to be aware

[26:36] of. Anything you put in the prompt is

[26:39] effectively rounding the agent. Um, for

[26:42] better or for worse. I see it's still

[26:44] iterating. So, yeah, comes through says,

[26:47] does this look good? We changed duh. I'm

[26:49] going to say looks great. Let's go to

[26:50] the design phase. So now Curo is going

[26:52] to take my requirements and take me into

[26:53] the design phase of this project. I can

[26:55] make this

[26:58] so things are a little bit bigger.

[27:00] But

[27:02] um here's an example of what I meant by

[27:04] these ears requirements. So the user

[27:07] story here is as a dev I want to

[27:08] implement a custom S3based checkpoint so

[27:10] the agent can use Langraph's native

[27:12] persistence mechanism with S3. Great.

[27:14] That sounds reasonable to me as a person

[27:16] you know sort of co-authoring these

[27:18] requirements.

[27:19] This here, this sort of when then shall

[27:22] syntax. This is the years format and the

[27:25] structured natural language is really

[27:26] important for us to pass this through

[27:27] non LLM based models and give you more

[27:30] deterministic results when we parse out

[27:32] your requirements because ultimately our

[27:33] goal is to actually use the LM for as

[27:35] little not as little as possible but

[27:36] less and less over time. We want to use

[27:38] classic automated reasoning techniques

[27:40] to give you high quality results not

[27:42] just you know whatever the latest model

[27:44] is going to tell you. Um, so here's gone

[27:48] through spits out a design doc. Let's

[27:50] actually just look at this in markdown.

[27:53] This sure you got a server da da checkpo

[27:57] pointer ghost s3 that makes sense pseudo

[28:00] code again in a real scenario. Maybe I

[28:02] read this a little bit more closely

[28:05] and what's actually this is the new

[28:07] thing we shipped in um on the 17th is

[28:10] that now cur is going to go through and

[28:11] do this formalizing requirements for

[28:13] correctness properties. Um and so right

[28:16] now what the system is doing is it's

[28:18] taking a look at those requirements you

[28:19] generated uh the requirements we agreed

[28:21] upon with the system earlier. These look

[28:23] good. I agree with them. yada yada. It's

[28:25] taking a look at the design and it's

[28:27] extracting correctness properties about

[28:28] the system that we want to run property

[28:30] based testing for down the road. This is

[28:32] something that may or may not matter for

[28:33] you in the prototyping phase but should

[28:35] matter for you significantly when you're

[28:37] going to production. because these

[28:38] properties are correct and these

[28:40] properties are all met. The system

[28:42] aligns one to one with the input

[28:44] requirements you provided. Um yeah, so

[28:48] while this is chugging away, any

[28:49] questions yet? Any folks kind of curious

[28:53] about this?

[28:55] >> Um yeah,

[28:57] >> we're here and then there.

[28:58] >> Um what would you say is the main

[29:01] difference between

[29:03] that has?

[29:05] Uh I haven't used the planning mode in a

[29:07] couple of weeks. So it's I'm things move

[29:09] so fast it's a little wild. Um but I

[29:11] think ultimately uh what we would say is

[29:14] that Kuro's spectrum and dev is not just

[29:18] LLM driven but it is actually driven by

[29:20] like a structured system. Um and so

[29:22] planning mode I'm not sure if there's

[29:24] actually like a workflow behind it that

[29:25] takes you through things but um yeah

[29:28] this is our take on it for sure.

[29:31] >> I'm not familiar enough to give like a

[29:32] more concrete example unfortunately.

[29:34] similar I mean it doesn't give you like

[29:36] this I think that this document is cool

[29:39] is bringing you the school but uh what

[29:42] Cer does is to basically create you a

[29:44] plan that's

[29:46] >> just an execution plan okay

[29:48] >> oh I see so I think that the fundamental

[29:51] difference there uh does that plan get

[29:54] committed anywhere or is it just

[29:56] ephemeral

[29:57] >> uh it's kind of

[29:59] >> okay so what I want over time is not is

[30:02] not just how we make the changes we care

[30:05] about but it is actually the

[30:06] documentation and specification about

[30:07] what the system does. Um so the

[30:09] long-term goal I have is that as Kira we

[30:12] were able to do sort of a birectional

[30:13] sync that is as you continue to work

[30:16] with Kira you're not just acrewing these

[30:19] sort of task lists uh and so I'm just

[30:22] going to say go for it to go to the

[30:23] tasks um but we're not just acrewing

[30:25] task list but actually if I come back

[30:27] and let's say change the requirements

[30:29] down the road we will mutate a previous

[30:31] spec. So I'm looking at really just a

[30:33] diff of requirements which as you go

[30:36] through the green field process you're

[30:37] going to produce a lot of green in your

[30:38] PRs which is maybe not the best because

[30:41] I'm just reviewing three new huge

[30:42] markdown files but on the next time or

[30:46] the subsequent times that I go and open

[30:47] that doc up I want to be seeing oh

[30:50] you've actually you know you've relaxed

[30:52] this previous requirement you've added a

[30:53] requirement that actually has this

[30:55] implication on the design doc um that is

[30:57] the process the curo team internally

[30:59] uses to talk about changes to the curo

[31:01] So we review our design docs have in

[31:04] general been uh replaced by spec

[31:08] reviews. So we will you know somebody

[31:10] will take a spec from markdown they'll

[31:13] blast it into our wiki basically using

[31:14] an MCP tool we use internally and then

[31:17] we'll review that thing and comment on

[31:18] it in sort of a design session as

[31:20] opposed to you know I wrote this

[31:22] markdown file or a wiki from scratch. Um

[31:25] so it becomes sort of if uh well it's

[31:28] actually not like an ADR because it's

[31:29] not point in time. It is like this

[31:31] living documentation about the system.

[31:34] Um but yeah thanks for the question.

[31:37] There's one over here.

[31:39] >> Um

[31:41] this may be more a spectrum development

[31:43] question but are there like like is

[31:45] there like a template for a set of files

[31:48] that you fill out? Like right now you're

[31:50] in the design.md.

[31:52] >> Are there like

[31:53] >> is this is the designd the spec and it's

[31:56] a single doc or are there

[31:59] >> oh great question. So the yeah the

[32:01] question was um are there and correct me

[32:04] if I'm wrong here but question is are

[32:05] there a set of templates that are used

[32:07] for the system and is the question

[32:09] you're driving at can you change the

[32:11] templates or is just are there okay so

[32:14] the yeah question is are there a set of

[32:15] templates um there are implicitly in our

[32:18] system prompts for how we take care of

[32:20] your specs so you'll see here at the top

[32:22] navbar here right now we're really rigid

[32:24] about this requirement design task list

[32:26] phase but we know that doesn't work for

[32:28] everybody for example if you're starting

[32:30] we get this feedback from a lot of

[32:31] internal Amazonians actually that I want

[32:33] to start with a I have an idea for a

[32:34] technical design and I don't necessarily

[32:36] know what the requirements are yet but I

[32:38] know I want to make maybe design is even

[32:39] the wrong word I want to start with a

[32:41] technical note like I want to refac this

[32:44] comes up a lot for refactoring actually

[32:47] um so I want to refactor this to no

[32:50] longer have a dependency on

[32:52] um here's a good example here we use a

[32:54] ton of mutxes around the system to make

[32:56] sure that we're locking appropriately

[32:57] when the agent is taking certain actions

[32:59] because we don't want different agents

[33:00] to step on each other's toes. But maybe

[33:02] I want to challenge the requirements of

[33:04] the system so I can remove one of these

[33:05] mutexes uh or semaphors I should say. Um

[33:09] so I might start with something like a

[33:12] technical note and then from there sort

[33:14] of extract the the requirements that I

[33:16] want to share with the team and say hey

[33:17] you know I had to kind of play with it

[33:18] for a little while to understand what I

[33:20] wanted to build but I still want to

[33:21] generate all these rich artifacts. So

[33:24] today it's this structured workflow.

[33:25] We're playing a lot around with making

[33:26] that a little bit more flexible. But the

[33:28] the structure is important because the

[33:30] structure lets us build reproducible

[33:31] tooling that is not just an L. So I

[33:35] think that that's an important

[33:36] distinction we make is that our agent is

[33:37] not just an LLM with a workflow on top

[33:40] of it. The backend may or may not be an

[33:42] LLM or it may or may not be other

[33:44] neurosymbolic reasoning tools under the

[33:46] hood. Um, and so we we try to keep that

[33:49] distinction a little bit clear, uh, that

[33:51] you're not just talking to like Sonnet

[33:53] or Gemini or whatever. You're talking to

[33:55] sort of an amalgam of systems based on

[33:56] what type of task you're executing at

[33:58] any point in time. Um, although when

[34:00] you're chatting, you are talking to just

[34:02] an LLM.

[34:04] Um, but yeah, so we have a template for

[34:05] the requirements. We have a template for

[34:07] this design doc because there's sections

[34:08] that we think are important to cover. Um

[34:11] and again like if you disagree and

[34:13] you're like I don't care about the

[34:15] testing strategy section just ask the do

[34:18] it and similarly the task list has is

[34:21] structured because we have sort of UI

[34:23] elements that are built on top of it as

[34:24] well like task management and um do we

[34:28] have we'll get there when we do some

[34:30] property based testing but um there's

[34:32] some additional UI we'll add for things

[34:35] like optional you can have optional

[34:36] tasks and stuff like that and so we we

[34:39] need the structure there for our uh

[34:41] taskless LSP to work for example. Um

[34:44] yeah, thank you for the question.

[34:46] Anything else before we truck on?

[34:50] Cool. Uh I may need somebody to remind

[34:52] me what we were doing. Oh, that's right.

[34:55] So, we went through and we synthesized

[34:58] the spec for adding memory and some

[35:00] amount of persistence to my agent. By

[35:02] the way, I didn't introduce you to this

[35:04] project. This project is called Gramps.

[35:06] It is uh it is an agent that I'm

[35:09] deploying to agent core to learn about

[35:10] it. I mentioned that. But what I didn't

[35:12] tell you is that is it is uh a dad joke

[35:16] generator.

[35:17] A very expensive one since we're

[35:19] powering it via LLMs, but effectively

[35:22] you're a dad joke generator. Jokes

[35:25] should be clean. They should be based on

[35:26] puns, you know, obviously bon bonus

[35:28] points if they're slightly corny but

[35:30] endearing. Um yada yada. So we're

[35:32] deploying this to the back end. So, the

[35:34] reason I want memory is because every

[35:35] time I ask the dad joke generator for a

[35:37] joke, it gives me the same damn joke and

[35:40] that's just super boring and my kids are

[35:41] not going to be excited about that. So,

[35:43] I want memory so that as I come back for

[35:44] the same session, I get different jokes

[35:46] over and over again. Um, that's the

[35:49] context on the project. So, we've come

[35:51] through here and we actually said we

[35:52] generated this thing, we did the task

[35:54] list. I said, "Hey, is this the

[35:56] idiomatic way to do it?" But what I know

[35:58] is that we didn't actually uh we're not

[36:01] using Agent Core's memory feature, which

[36:03] is probably a big oops. Um, and so, you

[36:06] know, quick show hands. Do we want to

[36:07] make the mistake and go all the way to

[36:08] synthesis and deployment, or should we

[36:10] fix it now?

[36:11] >> Who wants to fix it now because we know

[36:12] better?

[36:14] >> No, I want to make the mistake. Let's

[36:16] keep on trucking. I I had three yeses in

[36:18] a room full of nothing. So, we're going

[36:19] to make the mistake and then come back

[36:21] and fix it later. So, uh, let's say run

[36:26] all tasks

[36:29] in order.

[36:33] Uh, the reason I mention in order, which

[36:35] seems very specific, is because this is

[36:36] a preview build of Kira. Um, and so

[36:39] somebody just added to the system prompt

[36:40] I should only do one task at a time. And

[36:42] I found that if I say run all tasks, it

[36:44] thinks I somehow mean do them all in

[36:45] parallel. So, we'll that'll be fixed

[36:47] before these changes get out to

[36:49] production. So Kira's going to keep kind

[36:52] of going through here and chewing away

[36:53] on the system in the back end. Um, it

[36:55] has steering docs that explain how to do

[36:57] its job. It has, which I guess I should

[37:00] show you guys. Steering again is like

[37:01] memory. So I have some steering how to

[37:04] do commits. Uh, you know, how I like to

[37:06] have commits, but also steering on

[37:07] things like how do you actually deploy

[37:09] this thing? Um, how do you deal with

[37:11] agent core? And then how do you run the

[37:13] commands that are necessary for you to

[37:14] deploy this to my local dev account. Um,

[37:17] and then those are mostly just an

[37:19] example again of sharpening your tools

[37:21] like uh I went through this kind of

[37:22] painful process of figuring out oh you

[37:25] know you have to use this parameter on

[37:26] the CDK

[37:28] the CDK command you have to use this lag

[37:31] otherwise it doesn't work correctly and

[37:32] so once I go through that pain of

[37:34] learning I just say kira write what you

[37:36] learned into a steering doc and it will

[37:37] usually do a very good job of

[37:38] summarizing um and so it generated

[37:40] automatically this Asian core langraph

[37:42] workflow MD file um yeah so I mean it's

[37:46] just going to kind of go away here and

[37:48] truck truck on and do its job and we can

[37:51] watch it in the background. But in the

[37:52] interim, um I think at this point we're

[37:54] at a pretty flexible spot. Uh so for

[37:56] folks who want feel free to use Kira,

[37:59] try out Spectriven Dev on your own. I'm

[38:01] going to keep just kind of running this

[38:02] in the background and taking questions

[38:04] and comments. But that's kind of it for

[38:06] the scheduled part of today.

[38:09] >> Yep.

[38:10] >> How does Carol work for like existing

[38:12] large code bases or this?

[38:14] >> Yeah.

[38:16] >> Yeah. question was how does cure work

[38:17] for large and existing code bases

[38:19] basically the brownfield use case uh and

[38:21] the answer is it depends on what you're

[38:23] trying to do um for spec driven dev you

[38:25] can ask cure to do research into what

[38:26] already exists so when you start a new

[38:28] spec it will usually start by reading

[38:29] through the the working tree um but the

[38:33] agent is generally starting from a a

[38:35] scratch perspective right it needs to

[38:36] understand the system um in practice

[38:39] what that means is that you're going to

[38:40] end up with a bunch of things like if

[38:42] your system already had good separation

[38:44] of concerns uh your the components in

[38:47] your system are highly cohesive and

[38:49] they're sort of highly coherent and

[38:51] highly cohesive, it's going to have a

[38:53] great job, right? It's going to be able

[38:54] to say this is the module that does this

[38:56] thing. I don't need to keep 18 things in

[38:58] my context to do my job and it's going

[39:00] to do well. Um if you let's just take an

[39:04] example that's off the top of my head.

[39:06] if you were trying to launch an IDE very

[39:08] quickly uh leading up to an AWS launch

[39:11] and you um you know took a lot of tech

[39:13] debt along the way that you need to

[39:14] unwind and you know nobody here would do

[39:17] that I'm sure but um in case you did

[39:19] that like me then your agent might

[39:21] actually have a much harder time

[39:23] traversing the codebase in the same way

[39:24] that a dev would right so uh from just

[39:28] kind of that perspective the more

[39:30] reliable things like your test suite are

[39:31] and the more understandable things like

[39:33] module separation and sort of

[39:35] decomposition of concerns are the better

[39:37] the agent will do. Um and versus true of

[39:41] course. Now for things like uh

[39:44] understanding the code base, this is a

[39:46] bad example because this is a very small

[39:48] code base, but uh we do have things like

[39:52] you know code search and workspace. Um

[39:56] uh I don't know what to call these

[39:58] context providers. Um, so you can come

[40:00] in here and just say I want to do code.

[40:03] Uh, what is it?

[40:06] I might have turned this off actually.

[40:08] Oh, I did turn it off because the code

[40:10] base isn't big enough. We'll do things

[40:11] like indexing in the background so the

[40:13] agent like you can do semantic search

[40:15] over what you've got um if you're just

[40:17] chatting. But in general, uh, Cur should

[40:20] go in and do sort of background search

[40:22] to figure out how to do its job. like as

[40:24] the codebase scales up, it's going to be

[40:26] less do probably less well overall. But

[40:28] that's one thing we're working on as a

[40:30] team.

[40:31] Did that answer your question or did I

[40:33] kind of glance off the side a bit?

[40:35] >> Yeah, I think I got it.

[40:36] >> Okay, cool.

[40:38] >> Anybody else?

[40:44] >> Uh, how long are you willing to wait for

[40:46] indexing to complete?

[40:48] Uh so one example I have is that the

[40:52] code OSS um if it's not supremely

[40:55] obvious by looking at it cur is a code

[40:56] OSS fork just like you know cursor winds

[40:59] surf um

[41:01] one of the challenges we've had is the

[41:03] code OSS codebase is very large fairly

[41:05] large there's other big ones out there

[41:07] but that's kind of my large code base

[41:09] because I'm not forced get to work in it

[41:12] fairly frequently um and so there

[41:14] there's definitely some perceived

[41:17] slowdown when you're dealing with

[41:18] something large like that, especially

[41:20] when you talk about codebased indexing.

[41:21] It's a very active area of work for us

[41:23] though. So, we're trying to do things

[41:24] like um either remove indexing from the

[41:27] critical path so that you're not waiting

[41:29] there on some kind of slowed down render

[41:32] thread because indexing is running. Um

[41:34] but in practice, there should not be. I

[41:37] mean, again, the agent may practically

[41:39] do less well, but we're going to be

[41:41] talking in a couple weeks at reinvent

[41:42] about how some of the temple features in

[41:45] Curo were built via spec in a codebase

[41:47] we did not understand particularly well

[41:48] because we're just not VS code devs. Um,

[41:52] and Curo did a fine job of it. But

[41:54] again, that's a testament to the fact

[41:56] that codebase is reasonably well um

[41:58] structured

[42:00] >> and like if you've taken the time to

[42:02] understand how it works, it's very

[42:04] understandable. If you have not, it will

[42:05] might be a little bit opaque to stare

[42:07] at.

[42:09] >> Yeah.

[42:10] >> Uh in terms of indexing, is it like just

[42:13] just putting um um as much information

[42:16] from the code base into context or it

[42:18] just

[42:19] >> is there a way to like create some kind

[42:21] of like vector database of all the

[42:25] code base and then like query it? I just

[42:30] >> Yes. Um so the question was what do you

[42:35] mean by indexing? Um because indexing

[42:36] can mean a bunch of different things and

[42:38] what I mean is that um the agent is

[42:41] actually not provided the

[42:43] >> I'm going to keep the agent context as

[42:44] small as possible. We use the uh the

[42:46] index for most like secondary effects

[42:48] things like if you're doing a uh a code

[42:52] search or if I do something like search

[42:53] for um pound uh what the file in here

[42:58] http server like we use it more for

[43:01] these types of UI um than giving it to

[43:03] the agent because the agent does this is

[43:05] sort of anecdotal and based on our

[43:07] benchmarks does better when given less

[43:10] context but given the tools to

[43:11] understand where to go find things. Um,

[43:13] something we've heard a lot about is

[43:14] sort of incremental disclosure here at

[43:16] this conference. And that's again, we

[43:18] don't want to load too much at the

[43:19] beginning of the context and

[43:20] conversation with the agent. We want the

[43:22] agent to self-discover the right context

[43:23] for the task. Yeah.

[43:26] >> Thank you.

[43:28] >> Yeah.

[43:28] >> You guys managing session length like is

[43:30] there any kind of compression or

[43:32] pruning?

[43:36] >> Yeah. So, um, question was how do we

[43:38] manage session length? We have no

[43:40] incremental pruning today or incremental

[43:42] summary. Um you basically just accrete

[43:44] context until you hit your limit which I

[43:46] think right now I'm on auto which has

[43:49] like a 200k token limit um similar to

[43:53] the sonnetss. Um uh so we don't have a

[43:57] very sophisticated algorithm here yet.

[43:58] We've looked at a few things but our

[44:00] number one concern actually is um prompt

[44:03] caching hit rate. And so in a normal use

[44:06] case, I can achieve something like 90

[44:08] 95% cash token usage here on per turn,

[44:11] which means that my interactions are

[44:12] very fast. And that's or they're much

[44:14] faster than the alternative, which is

[44:16] I'm sending 160k tokens to to bedrock

[44:19] cold. Um, so that's one of the reasons

[44:22] we've actually not done much

[44:23] experimentation with incremental

[44:24] summary. Um, our summarization feature

[44:27] exists. When you hit the cap, it's not

[44:30] great. It's something we're trying to uh

[44:31] ship an improved version very very

[44:33] shortly. Um eg in the next couple of

[44:36] weeks which should be faster. Today it's

[44:38] like a one-off operation that can take

[44:41] up to 30 or 45 seconds which is a

[44:42] horrendous experience. We're hoping to

[44:44] fix that here and make it sort of a

[44:46] real-time experience.

[44:48] The follow

[44:50] >> managing stapleness between sessions

[44:52] then is that how why you're relying on a

[44:54] stereopated

[44:56] spectrum.

[45:01] >> So sort of um

[45:05] that is not the only reason I mean the

[45:06] spect the spectrum of dev is less to do

[45:08] with performance and more to do with

[45:10] reproducibility and accuracy of the

[45:11] agent. Um because if we can give you the

[45:16] right result,

[45:17] the the the way I and I think that we

[45:20] talk about it internally as this team is

[45:22] if I spend 10 seconds giving a prompt to

[45:24] the agent and then it goes off and it

[45:26] gets it wrong, it's like it's kind of no

[45:28] skin off my back, right? I burned

[45:30] however many tokens and you know, a

[45:32] couple cents of credit usage with

[45:34] whoever my LM provider is, but I spent

[45:36] 10 seconds generating a prompt. If I

[45:39] spend five to 10 minutes with the system

[45:42] producing a detailed design doc or let's

[45:44] just say even a detailed set of

[45:45] requirements I wanted to do a fairly

[45:47] good job. If I spend an hour generating

[45:50] a design doc reviewing it with my team

[45:52] and then synthesizing from that I wanted

[45:55] to get it right. So the goal necessarily

[45:57] is not just latency but actually

[45:58] accuracy when we talk about that. No,

[46:00] it's a both and. You need to do both.

[46:02] But um spec comes more from a uh the

[46:05] goal to have um highly reproducible

[46:08] output.

[46:12] I'm going to go over here first and then

[46:13] you

[46:14] >> Yeah. How did each of these task agents

[46:16] pass context to each other? And then are

[46:18] you only supposed to run this this

[46:20] parent task? Because it just finished

[46:22] all like 3.1 3.2 3.3 but then it still

[46:26] thought that 3.1 wasn't done and ran

[46:28] that in 3.2. too.

[46:30] >> Oh, did it?

[46:31] >> Yeah. Well, no, mine right.

[46:32] >> Oh, okay. Yeah. Yeah. Um, so

[46:36] if you

[46:39] the uh the question is if you're in the

[46:41] UI and you're like running tasks and I

[46:43] can just kind of pull up my task list

[46:44] here. Um, so if I just hit start, start

[46:47] start each of these is going to be a new

[46:49] session which means the context is

[46:51] completely unique. Um, personally I like

[46:53] to just if I can if I've got the context

[46:55] base to afford it, I just say do all the

[46:56] tasks because I find that more

[46:59] understandable and I think I actually

[47:00] get better performance. But by default,

[47:02] each task will be a new session that has

[47:04] no shared context with the previous

[47:05] ones. So the session is effectively just

[47:08] seated with your specification and then

[47:10] like here you're working on a spec that

[47:12] does all this stuff block of text um and

[47:16] you are doing this task da da da don't

[47:18] do any other tasks just do this. Um, so

[47:21] that sounds like a bug. Um,

[47:22] >> they ever spin up sub agents for certain

[47:25] things.

[47:25] >> We don't have sub agents yet in Caro,

[47:27] some we're working on.

[47:28] >> Yeah. Yeah. Because I mean, ideally,

[47:30] right, if we click on task three and

[47:33] I've got 31, 32, 33, and they're

[47:35] separated, there's no good reason I

[47:36] couldn't have different systems working

[47:37] on them. Yeah.

[47:40] >> Uh, right here,

[47:42] >> we do have in the Curo CLI custom agents

[47:45] that you can also run off.

[47:47] >> Yeah. Curli is a concept of custom

[47:49] agents. um which can be run sort of as a

[47:52] task um and it's something we're playing

[47:53] with right now in Curo Desktop um and I

[47:55] think you had another one

[47:57] >> yeah I'm sorry if I missed this but in

[47:59] the spec folder

[48:01] um as you do more and more of these

[48:03] tasks over time

[48:05] >> y is it just all in one design

[48:08] requirements tasks your whole project is

[48:11] defined there or did it group by

[48:13] >> that's a good question um yeah so I will

[48:16] have many I will have uh the question

[48:18] was as you do more you generate let's

[48:21] say more specs over time. Are you sort

[48:23] of just creating one massive spec and

[48:26] no? Uh let me open a different project.

[48:49] So this is for example the curo

[48:51] extension which is like a 1p extension

[48:53] inside the curo IDE. This is where the

[48:55] agent itself lives. And so we have

[48:57] pruned some specs but there are specs in

[48:58] here that we can talk through or I can

[49:00] just kind of demo. Um

[49:04] so these are the way I think about it is

[49:06] that the spec sort of represents a

[49:07] feature or a problem area in the in the

[49:09] project. And so for example, I can blast

[49:12] this a little larger. So for example, we

[49:15] have um like some of these are just

[49:19] tests. We've done things like oh could

[49:20] we have a prompt registry? Could we have

[49:22] a prompt registry file loader? They may

[49:24] or may not make it all the way to

[49:25] production. Um I want telemetry on the

[49:27] chat UI. So these are just like somebody

[49:29] will go off and spend maybe represents a

[49:32] few days of work for an SD. Um, agents

[49:35] MD support is a good one where we just,

[49:37] you know, I sort of said research what

[49:39] agents MD is and build it in the way you

[49:41] build steering in like support in the

[49:42] same way. This spec is fairly unlikely

[49:44] for us to come back and revisit in the

[49:46] future. So I may actually just delete

[49:47] it. Um, which is what we've done with

[49:49] some of the older ones. But a good

[49:50] example of one that we might come back

[49:51] to is our message history sanitizer. So,

[49:54] one thing we've had issues with or we

[49:56] had issues with early in the the

[49:58] development of Kira is that we would

[49:59] send these sort of invalid um sequences

[50:02] of messages because let's say the

[50:04] anthropic API required tools to be in

[50:08] the same order they were invoked and the

[50:09] responses but the system wasn't doing

[50:11] that. So we built this whole sanitizer

[50:12] system that has a bunch of requirements

[50:14] around um

[50:17] let's see very specifically

[50:20] yeah when conversation is validated the

[50:23] system shall verify that each user input

[50:24] is either non-MPT content or tool

[50:26] responses. So we had things where like

[50:28] empty strings would get passed in but

[50:30] there was a tool response. This is a

[50:32] good example where we've come in over

[50:33] time and actually just added maybe not

[50:35] to the requirements but to the to the

[50:37] acceptance criteria of the requirements

[50:38] as new validation rules are uncovered.

[50:42] >> Yeah.

[50:42] >> So how do you handle like that? So for

[50:45] example you have like

[50:47] >> telemetry up there y feature that needs

[50:50] telemetry is it going to go back and

[50:52] update that spec too or you're just

[50:53] >> it should. Yeah. So, if you usually

[50:55] you'll see and let me just ask uh

[50:58] a new chat here.

[51:05] No, that's a terrible idea.

[51:21] So here I've asked I've made a inspect

[51:24] mode I've made some requests to um add

[51:26] UI telemetry to the thing I'll help you

[51:28] add it let me first check if there's any

[51:30] relevant runbooks then explore the

[51:31] codebase and sand the implementation it

[51:34] might go do a little bit of research

[51:35] here and then flip of a coin again it's

[51:38] an LLM so it may or may not discover the

[51:41] existing uh spec but ideally it will

[51:44] after doing its research say there

[51:46] exists a spec already for things like UI

[51:49] telemetry, I'm going to go and amend

[51:50] that one. Um, and if it doesn't in this

[51:52] case, like I would come in and just ask

[51:54] it to um as sort of the operator of the

[51:57] system. But over time, again, we want

[51:58] that to be easier for you as a user to

[52:00] not have to think about so much.

[52:04] We can watch it while it chugs along.

[52:10] >> Is there anything reconfigured in Kira

[52:13] that makes it better to work with AWS?

[52:16] trans.

[52:18] >> No, not really. Um,

[52:21] >> was that a question?

[52:23] >> Oh, question was, uh, is there anything

[52:25] in Kira that that's preconfigured to

[52:27] make it work better with AWS? No. Um, we

[52:30] are sort of purposefully we're in we are

[52:33] brought to you by AWS, which so you

[52:35] know, uh, Andy Jasse and Jeffy B pay my

[52:38] check, but um, we're not like an AWS

[52:41] product that's deeply deeply integrated

[52:43] with the rest of the AWS ecosystem. Now

[52:45] that said, I still answer emails when

[52:47] somebody says, "Why is this other thing

[52:48] we built with AWS not working with

[52:50] Curo?" Yay. But um similarly like if

[52:53] you're building on GC or Azure, whatever

[52:56] um or you're running some on-rem system,

[52:58] the product should work just as well for

[53:00] you. That's our goal.

[53:02] >> Good a good answer potentially is the

[53:04] AWS documentation MCP server.

[53:07] >> Yes.

[53:08] >> So there are MCP servers that you can

[53:10] add into any of these things that will

[53:12] make better.

[53:14] Yeah, that's a good point. So, like in

[53:16] this case, I actually had to add the AWS

[53:20] MCP documentation here. We could of

[53:22] course have natively bundled this, but I

[53:23] don't want to ship this to customers who

[53:24] don't need it.

[53:26] Yeah, because again, AWS is not the only

[53:29] docs that we might care about. Um, by

[53:31] the way, coming back to your question,

[53:32] so it did find the existing spec for

[53:34] telemetry. It read it, it read different

[53:36] sections of it, and now it's actually

[53:38] making amendments to it. So, we can

[53:40] follow the diff as it shows up here. So,

[53:41] it's added new uh requirements. um to

[53:44] the pre-existing specs. So, this is

[53:46] effectively another case where we're

[53:48] mutating the system as opposed to just

[53:50] adding this sort of never- ending spiel

[53:52] of specs.

[53:53] >> I guess what I'm wondering is like how

[53:56] did it know or decide where to put the

[53:59] spec, you know, if you break down your

[54:02] project into these different categories?

[54:04] >> Y

[54:04] >> I would imagine like crossover.

[54:07] >> Yeah. I mean, it's that that's sort of

[54:09] like software development in a nutshell

[54:12] though, right? like how do you actually

[54:13] define the seams between different parts

[54:14] of your system different concerns the

[54:16] product

[54:17] >> right but if you want to like build

[54:18] something like I have a task and it's

[54:20] going to cost

[54:21] >> require changing like three or four

[54:22] things

[54:23] >> y

[54:23] >> it's going to change three or four specs

[54:25] and then run tasks across three or four

[54:27] >> oh yeah yeah no it should not do that it

[54:29] would probably so again I don't have a

[54:31] good example off hand that we can do for

[54:33] that but um my my perspective would be

[54:36] that if you're working on something that

[54:37] is a crossf functional uh by the way the

[54:39] question was um if I'm working on

[54:41] something that let's say I have a spec

[54:43] for security requirements and I have a

[54:46] spec for API design uh like the API

[54:50] shapes and I have a spec for

[54:52] logging and I am changing something in

[54:55] the API public interface that is a

[54:58] securityf facing concern because we're

[55:01] redacting logging PII um I think that's

[55:04] maybe a semi-tangible use case uh that

[55:07] we can all imagine coming down from our

[55:09] governance teams um I want to

[55:13] I would imagine that you either pick one

[55:15] of those to load the requirements into

[55:17] or you create sort of a cross functional

[55:19] spec, but that would come down to I

[55:20] think you as a as an operator making

[55:22] that decision in much the same way that

[55:24] if I how you actually implement it might

[55:27] be you you would not necessarily

[55:30] implement my PII API redaction module.

[55:33] It's a standalone thing. It's going to

[55:34] be a crosscutting theme across your

[55:36] codebase, I'd imagine. And it's also a

[55:39] good example. There's like multi group

[55:40] workspace came out when it went to G on

[55:42] Monday and now you can like drag

[55:45] different. So like in your example you

[55:46] just went through with like APIs and off

[55:48] and like even the front ending you can

[55:51] bring in those projects if you have them

[55:53] separately and then still work.

[55:58] >> Yeah. Thanks bro.

[56:04] the mental model the spec generates the

[56:07] code after that like what code you can

[56:09] specify how does that work

[56:12] >> yeah so um we have now synthesized

[56:16] effectively the spec so we we sat down

[56:19] we defined the requirements design and

[56:21] task list I've had Kira now go through

[56:23] and run all the tasks in this spec so it

[56:26] ran them one at a time it basically

[56:27] worked on small bite-sized pieces of

[56:28] work uh chunk by chunk and then uh now

[56:33] this is done So what we've actually

[56:35] produced is not just like the completed

[56:37] spec, but it went here into my agent and

[56:40] it did a few things in the CDK repo

[56:43] because it's doing persistence to S3.

[56:45] I'm sure it added a bucket. Yep. Some

[56:47] new bucket encryption and yada yada. It

[56:49] then went in to the agent, added the S3

[56:52] checkpoint saver. It looks like it, you

[56:55] know, created a checkpointer. It adds

[56:57] this to the graph and it kind of passes

[57:00] this all the way through the system. And

[57:02] the S3 checkpointer here I'm sure has

[57:03] some knowledge of how to write the

[57:05] checkpoints to and from S3. So like we

[57:07] have gone not just for defining the

[57:09] system but we've now um produced it end

[57:11] to end or we've uh delivered it end to

[57:13] end including property tests I believe.

[57:16] Um yeah.

[57:20] >> Oh, I have a answer to an earlier

[57:23] question related to like um some

[57:25] specific AWS related features like that

[57:28] makes it easier to work with. The Curo

[57:30] CLI comes with the use AWS tool which

[57:33] helps with the CLI.

[57:36] >> Yeah. Yep. So, uh, what Rob's pointing

[57:38] out is the Curo CLI, which we just

[57:39] rebranded, um, this week, has a use AWS

[57:42] tool, which is basically a wrapper over

[57:43] the AWS SDK, um, to make some of those

[57:46] things easy. Uh, but again,

[57:49] BYO use GCP tool as an FCP server if you

[57:52] were so inclined, if that's your uh,

[57:55] tool of choice. And I believe, don't

[57:57] quote me on this, um, because the CLI is

[58:00] kind of new to my new to me I should

[58:02] say. Um, but I believe you can turn off

[58:05] tools in the CLI as well. Let me know if

[58:07] that's not right, Rob.

[58:09] >> Yeah. So, that's like you're actually

[58:11] not strict. Uh, in the desktop product

[58:14] today, you can't control the tools, the

[58:16] native tools built in, but in CLI, you

[58:18] can.

[58:21] >> Um, so I I intuitively get the benefits

[58:24] of having a spec. Have you done any work

[58:26] to empirically see like how a project or

[58:31] a problem would have worked with or

[58:32] without?

[58:34] >> Yeah. Um we do have benchmarks uh

[58:36] covering the data off hand. Um I think

[58:39] part of that's in our blogs. So if you

[58:41] go to the cure.deblog

[58:43] or it's on the site, we we talk really

[58:45] crisply about some of the lift things

[58:46] like property based testing give to task

[58:48] accuracy.

[58:50] Science team's always working on that

[58:52] stuff.

[58:53] a blog about specs. I'm curious about

[59:00] >> Yeah. Distinguish engineer for

[59:02] databases. Yeah.

[59:03] >> His blog post really steps it up. I

[59:06] don't think it has the D specific that

[59:07] you are asking for, but I think it will

[59:09] be useful.

[59:10] >> Yeah. Yeah.

[59:14] >> How does it work? I understand the

[59:16] feature side of it, but how does it work

[59:18] in a nonfunctional site like agency

[59:21] dealing with, you know, a little bit

[59:23] more harder problems?

[59:25] >> Well, yeah. I mean, that is ultimately

[59:26] the goal here, right? Is we're saying

[59:28] you're making a slightly larger

[59:29] investment up front, but we believe that

[59:30] the uh the structure we're bringing is

[59:33] going to help you get increase the

[59:35] accuracy of your uh result. So, um,

[59:38] while we've got a team of people who are

[59:40] basically working on making spec better,

[59:41] my job when I fly back to Seattle is to

[59:43] make cur as a whole much faster. Um,

[59:46] one, execution time and like kind of

[59:48] like laggginess in the UI, but two, how

[59:50] do we get tokens through the system

[59:51] faster? How do we get responses to you

[59:53] faster so that like you're not syncing

[59:55] as much cost into KO to use a spec?

[59:58] >> Yeah. Yeah. I'm not talking about the KO

[1:00:00] tool itself, the code generated from the

[1:00:03] spec.

[1:00:04] >> Oh. Oh, yeah. Okay. Yeah. you mean like

[1:00:05] the non-functional requirements of the

[1:00:07] generated code? So, uh that's going to

[1:00:09] come down to I think what you're

[1:00:10] specifically trying to do. So, you could

[1:00:13] add uh one of the slides I had here was

[1:00:16] talking a little bit about how to tweak

[1:00:18] the process and tweak the artifacts for

[1:00:19] your use cases. Um again, you could very

[1:00:23] easily add something like I want

[1:00:24] non-functional requirements for speed

[1:00:26] and runtime and things like lock

[1:00:27] contention to be considered in the

[1:00:29] design phase. Um yeah, something you

[1:00:32] could certainly add. So you could

[1:00:34] generate a code in Rust or or Java.

[1:00:37] >> Yeah, totally. Yeah.

[1:00:39] >> And it will vary in the functional

[1:00:43] depending on what language you

[1:00:44] generated.

[1:00:45] >> I mean it would it would have to like

[1:00:46] yeah there's no other way I think to

[1:00:48] approach it. Um again I'm just I'm

[1:00:50] familiar with node so I'm doing

[1:00:51] everything here in node but you can use

[1:00:52] this with any language. I think

[1:00:54] technically we say we support Java,

[1:00:56] Python, JavaScript, um, and

[1:00:59] Jesus, JavaScript, TypeScript, Java, and

[1:01:03] Rust. But in practice, there's no reason

[1:01:05] that this doesn't work with any

[1:01:07] language. I mean, it's just an LLM. The

[1:01:09] there's nothing language specific or

[1:01:10] framework specific in the system. And

[1:01:12] for those of you um, so there was a

[1:01:14] conference earlier this week hosted by

[1:01:16] Tessle, which are doing sort of specs

[1:01:18] for knowledge base. um as long as you've

[1:01:20] got the right grounding docks in there

[1:01:22] and this is sort of uh their argument is

[1:01:25] that it should not matter what you're

[1:01:27] building like that's all just informed

[1:01:29] by the the context you're building for

[1:01:30] your system.

[1:01:32] >> This is also a really good point for

[1:01:34] steering. So steering you can get the

[1:01:36] agent to develop code in the way you

[1:01:38] want. Like being a developer is all

[1:01:39] about making trade-offs and the problem

[1:01:41] with your out of the box is it's like so

[1:01:43] polite because it's trying to be

[1:01:44] everything to everyone. U and especially

[1:01:46] like with latency and cost and other

[1:01:48] things like that, just tell it in

[1:01:50] steering what you want it to prioritize

[1:01:53] and then that will influence any code

[1:01:54] that gets generated.

[1:01:56] >> Yep.

[1:01:56] >> Even like how it designs based on that

[1:01:58] as well. So if there's something that's

[1:01:59] very specific to your use case or your

[1:02:01] industry or whatever, just shove it in

[1:02:02] that steering file and then

[1:02:05] >> Yeah, that's exactly right. So, for

[1:02:07] example, I I will have Kira generate um

[1:02:11] commits for me. And one of the things I

[1:02:13] care I personally care about is that I

[1:02:15] can track commits I generate versus

[1:02:17] commits that Kira generates being the

[1:02:18] ones that come from the system. And so

[1:02:20] my steering dock while short includes

[1:02:22] things like very specifically my

[1:02:25] requirement for Curo is

[1:02:28] just use the UI

[1:02:32] um

[1:02:34] attributed to the co-author of Kuro

[1:02:36] agent um which is trivial but also I

[1:02:40] want it to happen every time. So in this

[1:02:41] case it just generated a commit

[1:02:42] co-authored by Kirao agent D. So that's

[1:02:46] an example of like you could add

[1:02:47] whatever you want in there, not just

[1:02:49] something related to get commits, but

[1:02:51] you could do code style, you could do um

[1:02:53] uh you know code style, code coverage.

[1:02:56] Uh whenever you add a spec or you're

[1:02:57] adding a new module, make sure that you

[1:02:59] annotate it with coverage minimums that

[1:03:01] are 90% because that's the thing I care

[1:03:02] about. Um you can kind of put anything

[1:03:05] you want up in there. The good news is

[1:03:08] it looks like what we built works. Um,

[1:03:10] Cur is very happy with itself at least

[1:03:12] and it looks like all tests passed. But

[1:03:14] um, yeah, so we'll we can deploy this to

[1:03:17] the back end and see how things work.

[1:03:21] We're uh technically just about time.

[1:03:23] So, you know, if anybody has any other

[1:03:24] questions, I'm going to stick around

[1:03:26] here for a while. But uh, thank you all

[1:03:28] for joining, listening, and uh, learning

[1:03:30] a little bit more about Spectrum and

[1:03:32] Dev.

[1:03:48] Heat.