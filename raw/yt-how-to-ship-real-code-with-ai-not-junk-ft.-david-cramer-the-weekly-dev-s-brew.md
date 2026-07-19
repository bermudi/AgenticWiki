---
type: youtube
url: "https://www.youtube.com/watch?v=l8yqPwRQXHI"
title: "How To Ship Real Code With AI (Not Junk) ft. David Cramer - The Weekly Dev's Brew"
channel: "Jan-Niklas Wortmann"
date_saved: "2026-07-18T06:40:14.427Z"
speakers:
  - David Cramer
  - Jan-Niklas Wortmann
---

# How To Ship Real Code With AI (Not Junk) ft. David Cramer - The Weekly Dev's Brew

[0:00] because we went from my tab complete to

[0:01] instantly we just don't write code

[0:03] anymore. And it's like maybe we should

[0:04] have stopped somewhere in between. So

[0:06] this 100x thing is BS. But the only way

[0:08] you get more done is when you generate

[0:09] junk that you don't need.

[0:10] >> This is David Kramer, co-founder of

[0:12] Sentry and one of the few people on a

[0:14] sea level who's actually using air to

[0:16] ship production software at scale.

[0:18] >> But but the reality is like if I ship

[0:19] something that has massive

[0:21] vulnerabilities in Sentry that could

[0:23] cause the company to disappear. You want

[0:24] to flex that you can generate all of

[0:27] your code and have hundreds of things

[0:30] going in parallel. I will flex and show

[0:32] you how broken the code is 100% of the

[0:35] time.

[0:35] >> If you if you hang out there, you see

[0:37] like, oh, software engineering as a

[0:38] craft is completely changing, yada yada

[0:40] yada.

[0:41] >> There is nobody that is credible that

[0:44] says that LM are not making it faster

[0:46] for me to build software. Despite what

[0:48] the internet would like to say, I'll sit

[0:49] here all day long on a single pash. This

[0:52] is David Kramer on how to ship real code

[0:54] with AI.

[0:56] >> I built a scanner inside of Sentry that

[0:58] identified a ton of security

[0:59] vulnerabilities in our like active

[1:01] codebase, which is a little bit

[1:04] borderline hobby project, but it's like

[1:06] real world production software that we

[1:07] use every day now. And then I went and I

[1:09] patched some of those security

[1:10] vulnerabilities for us. And so, you

[1:12] know, I'd like to think that I have

[1:14] enough experience in the space, plus I'm

[1:15] pretty grounded about my experience.

[1:17] Plus, I do not care at all that I'm

[1:19] willing to share my opinion about what I

[1:21] see.

[1:22] >> Okay. So, one thing, and I I'm glad you

[1:25] bring up that security scanner because I

[1:26] read the blog post that I think you

[1:28] published like February or something

[1:29] like that. Uh I'll link it in the show

[1:31] notes and like in one of the first

[1:34] introduction sentence, you said

[1:35] something like we literally have

[1:37] virtually infinite money for AI.

[1:40] Something along the line. Is that

[1:42] something that you still stick to? uh

[1:44] because I see a lot of people like uh

[1:46] companies Uber recently introducing an

[1:48] AI limit that walk back on statements

[1:50] like that

[1:51] >> like I would say it's not infinite but

[1:53] for reasonable use it does it doesn't

[1:57] it's very easy to waste a lot of money

[1:59] you see this from the labs like the labs

[2:01] just spend money because like whatever I

[2:03] don't know that's got to stop at some

[2:05] point right but it's really hard to do

[2:08] something useful and spend say like

[2:11] $1,000 a week on a coding agent or more

[2:13] than at let alone um and stuff does add

[2:17] up but as soon as stuff adds up you

[2:18] quickly realize you're doing things in

[2:19] an inefficient way like LLMs are not the

[2:21] solution to inefficiency and so I don't

[2:25] know here here's my favorite analogy

[2:26] that I think people still don't worry

[2:29] about even though they should if you're

[2:32] going to build a web crawler in 2026

[2:35] you're going to use an LLM but the bad

[2:38] way to do it would be have an LLM run

[2:41] through every single page that it gets

[2:43] Right? The right way to do it would be

[2:45] to have an LLM when the pages change

[2:47] generate a new script that can parse the

[2:49] page and then just run that script over

[2:50] and over until it stops working. Right?

[2:52] Because one's much more efficient than

[2:54] the other. And I think that's true in a

[2:56] lot of things, you know, and it can't be

[2:57] true in everything obviously like our

[2:59] our scanner tool for example. I think

[3:01] there are ways to bring determinism to

[3:03] it and and make it more efficient, but

[3:05] not necessarily true. But when we look

[3:08] at like that particular example cuz it's

[3:10] finding security vulnerabilities, we

[3:11] look at like our bug bounty program and

[3:12] how much that costs us whenever anybody

[3:14] finds any of these. And I think the

[3:16] first run or one of the first runs was

[3:18] like $1,500 to scan one of the core code

[3:21] bases or a part of the core codebase and

[3:24] we found two highst vulnerabilities in

[3:26] that that more than covered I think you

[3:29] know the monthly spend of that thing

[3:30] that month. Um and so

[3:32] >> well and and that doesn't even include

[3:34] the fact that someone could have

[3:36] exploited that

[3:37] >> brand damage and all those things.

[3:39] >> But I do think the money has to come

[3:40] from somewhere I would say. So I think

[3:42] people shouldn't be foolish with it and

[3:44] they should have rational expectations.

[3:46] But at least what we have seen is right

[3:49] now to be fair like $1,000 a week is

[3:52] still quite a lot from a budget point of

[3:54] view. But right now we feel like it's

[3:56] somewhat okay and we expect like the

[3:58] baseline to get a little bit cheaper in

[4:00] time. Maybe not a lot, but a little bit.

[4:02] >> It's funny that you say that in the week

[4:03] where Fable, which is just like

[4:05] ridiculously expensive, come out, but I

[4:07] I get what you're saying. Um, on that,

[4:10] how do you treat AI budget within Sentry

[4:13] though, like more on a IC level? Because

[4:16] that is a thing that I think is really

[4:17] difficult and we see this also at Jet

[4:19] Brains where we have people that just

[4:22] burn through like tokens ridiculously

[4:24] and then some people just use it very

[4:26] moderately and it's very hard. We're

[4:28] nowhere near yet really evaluating like

[4:30] an RI on something where I'm very

[4:32] curious to see how companies are doing

[4:33] that, but how's that from your

[4:35] perspective?

[4:36] >> Yeah, honestly, like people ask this a

[4:38] lot and there's a lot of companies

[4:39] trying to build solutions around this.

[4:41] It's too early. So, like we look at it,

[4:43] we set a budget that we thought was

[4:44] reasonable and I think it's it's not

[4:47] $1,000 a week to be clear. It's much

[4:49] less. Um, but we said it roughly what it

[4:52] amounted to was $15,000 a year a

[4:54] developer, which math that out, it's

[4:57] it's actually close to Uber. Um, it's

[5:00] close to $1,500 a month. Uh, but what

[5:03] you find is that's like blended across

[5:05] across and and if you look at

[5:07] engineering or any job function, you're

[5:09] gonna have people that are high

[5:11] throughput, high volume, and people that

[5:13] are not. And some of that is like a

[5:16] performance of individuals thing. Some

[5:18] of that is just the way they work. Some

[5:19] of that is what they're working on. All

[5:21] these things. Um I don't think $1,500 a

[5:24] month is enough, at least right now. But

[5:26] when we look at it, we're like, we're

[5:28] okay with that spend. And we're okay

[5:29] with that spend in the same way we are

[5:32] okay doing R&D work that might not be

[5:35] successful, right? And so we think we

[5:37] think it will be valuable in the future.

[5:40] And actually, I think it's pretty

[5:41] obvious that you do have to learn how to

[5:43] use LLM. And you see this from people

[5:44] that are on different cycles of the

[5:46] learning curve and they're I don't know

[5:47] they still think they're magic or

[5:48] something like this. Um and so we're

[5:51] mostly just okay with it. Now I think

[5:53] that's like year one. Um but it just

[5:56] wasn't I mean we're like 200 engineers.

[5:57] It wasn't that expensive at the end of

[5:59] the day. It's not nothing, right? Like

[6:00] money money is like there's not an

[6:02] infinite budget for everything if you

[6:03] just keep stacking it. But I'm like I

[6:05] could definitely delete some tools from

[6:07] the company that don't cost that much

[6:08] unfortunately. But um but it it felt

[6:11] justified and from an ROI point of view,

[6:13] we just don't care like like the ROI.

[6:15] And so this is my decision-m process. If

[6:18] I believe in it, that's it. Like I don't

[6:20] need any other evidence beyond that. And

[6:22] I think this is also where me being sort

[6:24] of in the weeds to to some degree or to

[6:26] a large degree helps a lot because I can

[6:29] make those judgmental calls where and

[6:31] this wasn't I didn't even come up with

[6:32] this budget item. Our CTO did and I'm

[6:34] like done. 3 million sounds fine. Um,

[6:37] but but I see the incremental value and

[6:40] I see some things, not everything, some

[6:42] things that you definitely get done much

[6:44] more easily or much more quickly. And

[6:46] then other things where we're probably

[6:47] wasting our time and wasting our money

[6:48] right now to be honest with you. Um, but

[6:51] it's probably not like crazy

[6:53] efficiencies. Like it's probably on

[6:54] average, I bet it's like low tens% kind

[6:58] of like like boost in actual output.

[7:01] >> You're not expecting 100x developers.

[7:04] How come? No, I mean, you know what's

[7:06] insane? I I was talking to somebody

[7:08] about this. I have a uh the kind of

[7:10] personality that's really good at

[7:11] context switching. Um ADD or something.

[7:13] I don't who knows. But I'm usually

[7:16] pretty good about jumping around and I'm

[7:17] usually I'm pretty impatient and I'm

[7:19] pretty fast about doing things. And you

[7:20] know what what's really annoying these

[7:22] days is it's not like LM's are not

[7:24] making it faster for me to build

[7:26] software despite what the internet would

[7:27] like to say. I'll sit here all day long

[7:30] on a single pach. Now, I might work on

[7:33] five different single patches at the

[7:34] same time, but to get one quality piece

[7:37] of code in any sufficiently complicated

[7:39] software, it's not it's not any easier

[7:41] than it used to be. And in fact, in some

[7:43] cases, it's harder because you're cuz I

[7:46] I'm sort of I forced myself to stop

[7:50] writing code by hand almost a year ago

[7:52] at this point. Um, and that constraint,

[7:55] whether useful or not, it just it's just

[7:57] harder, right? And so, so I'd like to

[8:00] believe I could get more done. So, this

[8:01] 100x thing is BS. Uh, but the only way

[8:04] you get more done is when you generate

[8:05] junk that you don't need, when it's like

[8:06] brand new projects or something like

[8:08] this, which is almost always something

[8:09] that was not actually going to add that

[8:11] much value.

[8:11] >> On that, I I am curious what are what is

[8:14] your opinion on like uh Peter

[8:16] Steinberger's way of developing because

[8:18] as an engineer, I have a lot of respect

[8:19] and I also appreciate him being like

[8:22] very much on the forefront. I still

[8:23] think like no company anywhere near will

[8:26] kind of money on development efforts. So

[8:29] I'm curious to hear your opinion on

[8:30] that.

[8:31] >> I think Peter is a sharp guy and he's

[8:33] certainly insane. Um I mean

[8:38] you are not generating the amount of

[8:39] output they are generating for real

[8:42] world software that has liabilities.

[8:44] Like I mean it's impressive what they've

[8:46] done, don't get me wrong, but it's a

[8:48] damn chatbot where they've decided to

[8:50] accept all risk and they try to derisk

[8:52] it. Again, they're they're they're not

[8:53] just in intentionally doing bad things,

[8:55] but but they basically accepted that

[8:58] it's it's junk code. And I think there's

[9:00] a and I don't know, I haven't talked to

[9:02] Peter about this personally, but like I

[9:03] think there's a type of person, and I

[9:05] can understand this, that inherently

[9:06] believes that LLM will get better enough

[9:08] that they will go back and fix this

[9:10] stuff, that it will be able to clean up

[9:12] all the junk that's been stacked up

[9:13] along the way. I don't think that's

[9:15] true. Um but but the reality is like if

[9:18] I ship something that has massive

[9:20] vulnerabilities in the century that is a

[9:23] that is a very serious dilemma um that

[9:26] could cause the company to disappear. If

[9:28] you ship something that [ __ ] up the

[9:29] chatbot what happens? Nothing. Like a

[9:32] bunch of hobbyists maybe get mad, you

[9:34] know. I I don't know. So it's it's just

[9:36] like it's a science experiment. It's

[9:38] interesting. It's not worth a seven

[9:40] figure compute bill, that's for sure.

[9:42] But but yeah, so I don't know. But

[9:44] nobody nobody does that in enterprise if

[9:46] you will. I don't like the word

[9:47] enterprise but you get what I mean. I

[9:49] >> I do get what you mean. At the same time

[9:50] anthropic seems to be operating on a

[9:53] similar scale. Again also similar or

[9:55] very similar circumstance with like

[9:56] working on the lab where inference is

[10:00] actually free for them more or less. So

[10:03] I I'm wondering if this is as you said a

[10:06] science experiment which I I like the

[10:08] metaphor or just like a glimpse in the

[10:10] future. And I'm definitely more leaning

[10:12] on the science experiment. I don't think

[10:14] it's reasonable.

[10:16] >> So I think it's a science experiment and

[10:18] this is no shade. I like a lot of people

[10:20] at Anthropic, but the software is broken

[10:22] all the time. And so you want to flex

[10:25] that you can generate all of your code

[10:27] and have hundreds of things going in

[10:29] parallel. I will flex and show you how

[10:32] broken the code is 100% of the time and

[10:34] how the entire industry has made a meme

[10:37] and a mockery out of that. And that's

[10:38] like it's not a flex. I'm like that's

[10:40] cool, but like that's not the world I

[10:42] live in. I want like quality software

[10:43] and so do a lot of people. So do our

[10:45] customers and I as a customer of

[10:47] Anthropic. I mean I stopped using cloud

[10:48] code more than a month ago. I haven't

[10:50] touched I haven't touched Fable. I'm

[10:51] like yeah it's probably interesting to

[10:53] see. I just don't care because I'm like

[10:54] I'm going to be annoyed about all the

[10:56] random things that keep breaking daily

[10:57] in it. And they seem to it's like forest

[11:01] from the trees. I'm like I'm like people

[11:02] do not see the the community sentiment

[11:05] here that's like hey slow down. Um and

[11:08] and software verification is the hardest

[11:09] problem. It's always been one of the

[11:10] hardest problems.

[11:12] We've not we've not made it any

[11:14] [laughter] better. Like we have code

[11:15] review bots and they help a little bit,

[11:16] but if you if you were honest with

[11:17] yourself, we're spending inference to

[11:19] fix all the other stuff that was from

[11:22] inference and and I mean that's fine,

[11:25] but it's really expensive and it doesn't

[11:27] actually fix it cuz it's

[11:28] nondeterministic. And so and so I I

[11:30] don't know. So I think a little bit of

[11:32] this yes is probably the future. I don't

[11:36] think to the degree that everybody would

[11:37] like to believe it is unless some new

[11:39] technology comes into existence. I don't

[11:41] think transformers are um and I think

[11:44] it's mostly a science experiment. I

[11:46] think it's mostly living in their bubble

[11:48] kind of forgetting. It's easy to let

[11:50] success go to your head. You know, they

[11:51] say PM product market fit fixes

[11:53] everything. Well, cloud code has great

[11:54] product market fit. It fixes the fact

[11:57] that the software is broken all the

[11:58] time, that it's wildly inefficient, that

[12:00] you know, I don't know. There's a it's

[12:03] there's no causation is what I would

[12:04] tell you. I think it's purely

[12:06] correlation that they generate all the

[12:08] like massive amounts of code and that

[12:12] the product is successful.

[12:14] >> To be fair also like I I'm still on the

[12:16] fence whether Anthropics marketing is

[12:18] just entirely next level or pure luck

[12:20] all the time. It's insane. They're they

[12:22] they keep being successful with their

[12:24] marketing for no obvious reason and it's

[12:27] completely infuriating. But you

[12:29] mentioned one thing that um LLMs are not

[12:33] a great solution for a lot of things.

[12:34] Where do you think LLMs are a great

[12:35] solution for?

[12:36] >> I think search is the greatest greatest

[12:38] thing and I think it's still

[12:40] underleveraged. Like the most valuable

[12:42] thing I've done at our company this year

[12:45] is build this Slackbot which has been

[12:47] very fun to build because what it did

[12:49] was it took sort of there's this thing

[12:51] and I'm guilty of this too where you

[12:53] will ask the question of your peers

[12:55] because you're being lazy instead of

[12:56] going to answer it yourself. And I like

[12:59] this is my model in life. Like if

[13:01] somebody else will solve the problem

[13:02] faster for you, then why solve it

[13:03] yourself kind of thing. So I I do this

[13:05] too. But but at scale it's actually like

[13:08] a big time waster. And with Slack, it

[13:10] actually makes it worse cuz people just

[13:11] broadcast these questions all over the

[13:12] place. And so I'm like, why are people

[13:15] still not using LM? And the sort of

[13:17] answer was like the interfaces are not

[13:20] great for some of this. Anyway, so we

[13:21] built the Slack bot. We gave it access

[13:22] to all the stuff like a bunch of people

[13:23] have at this point. And people now asked

[13:26] the bot or tag the bot in to answer

[13:27] these questions and it does it so damn

[13:29] well because it searches so much

[13:30] information. And when you see that

[13:32] you're like that is genuinely like an

[13:35] improvement. It's like a behavioral

[13:36] improvement. It's an efficiency

[13:37] improvement. Now I don't know how much

[13:38] it is obviously u but I I think it's

[13:41] like still undervalued and underinvested

[13:44] in. And then but and I think there's

[13:46] lots of versions of that right like

[13:47] summarization all these other techniques

[13:49] are basically the same. I think code

[13:52] generation is the harder like one of the

[13:54] hardest problems we could pick. Um and

[13:56] somehow we've decided that's the most

[13:57] important problem or the most valuable

[13:59] problem even if it's unsolvable. Um

[14:03] but then beyond that I think I don't

[14:05] know like a lot of things are not

[14:07] they're not the solution like for

[14:09] verification of software for example I'd

[14:11] be hardressed to say LLMs are like the

[14:13] the right tool for the job

[14:15] >> just because of the nature of what they

[14:17] are. But and then yeah I I don't know I

[14:20] think we get surprised in where you can

[14:22] leverage them to augment other

[14:24] mechanisms right

[14:26] >> them a lot for like paralyzing things as

[14:28] you also kind of said of like jumping

[14:29] around those kind of things or I have a

[14:31] meeting so I send an LM on like a quest

[14:34] to find information prepare some work or

[14:39] something you you wrote the sentry MCP

[14:41] is that right?

[14:42] >> Yeah.

[14:43] >> How do you feel about MCP these days?

[14:45] >> It's great.

[14:46] >> Tell me how you really feel. I'm going

[14:47] to I'm going to publish something later

[14:48] actually cuz like there's still nothing

[14:50] that compares. I think there's flaws.

[14:52] Like the protocol is a pain in the ass.

[14:53] Like it should have been stateless. I

[14:54] think it's still not fully stateless but

[14:56] it's going to be but it should have been

[14:57] stateless from default. It should have

[14:58] just been HGP. It isn't. We are where we

[15:01] are. It's not so in a way. Um there's

[15:03] some other things that are kind of

[15:04] annoying but like most of the things you

[15:06] can work around if you just critical

[15:08] thinking. Um, but like one of the one of

[15:10] the the problems. So So I'll give you

[15:13] the reason I like it is because it just

[15:15] I care about user experience. I care

[15:17] about what is the lowest friction best

[15:19] user experience I can create. And when I

[15:21] have a effectively a plugin that drops

[15:23] in has native authentication which means

[15:26] it can do a lot of things. It can do

[15:28] like like scaled authentication and all

[15:30] these things which reduces friction,

[15:32] makes it more secure. It can do all

[15:33] that. Hypothetically has controls around

[15:35] which tools, permission systems, all

[15:36] this stuff which is very valuable. Um,

[15:38] and I I mean this in the contrast with

[15:40] something like arbitrary shell commands,

[15:42] CLI, etc. don't um, and when it's baked

[15:45] into the interpreter or the agent where

[15:48] I can actually steer the agent a little

[15:49] bit, like reverse steer it, you actually

[15:51] can create like a really really good

[15:52] experience. So, I like it for all those

[15:53] things. It has its challenges with like

[15:55] I don't know, I I I'm forever trying to

[15:57] figure out why our MCP server gets

[16:00] deauthenticated all the time. Um,

[16:02] because it's, you know,

[16:03] >> I had that with notion too if that makes

[16:05] you feel better. I I think it's common

[16:07] and I I still can't figure out if

[16:08] there's a bug and I'm gonna like I'm

[16:10] actually going to write a new transport

[16:11] for it to see if the bug goes away

[16:13] because I you have no how no idea how

[16:15] many hours I've spent trying to get rid

[16:17] of this behavior and I'm not sure if

[16:18] it's the clients or if it's us. Um but

[16:22] but you'll hit all these things and

[16:23] people don't consider you can just work

[16:24] around them. So we always constrain the

[16:27] tools for example because you don't want

[16:29] to like cause too much pollution in the

[16:30] context environment. That said, Century

[16:32] is like the only FCP I use in my coding

[16:34] agents because it's the only one I use

[16:35] like daily with them and there's no

[16:37] point in keeping stuff loaded. Um, but

[16:40] for example, we would constrain the

[16:41] tools because you don't want to overload

[16:42] it and and you need steering and all

[16:44] this stuff. Uh, we shipped something

[16:46] earlier this month that just puts like

[16:48] like if you're familiar with code mode,

[16:49] it has like the concept is a search and

[16:51] execute function that does like

[16:52] progressive discovery and then it writes

[16:54] code. But if you ignore the code part,

[16:56] all we did was add a search and execute

[16:57] tool to our MCP and we buried a bunch of

[17:00] other tools behind them and it still

[17:01] works like exceedingly well. We didn't

[17:03] do it for everything, but we're like,

[17:05] "Oh, now we have another solution. Like

[17:07] now we can expose more once again and we

[17:09] can increase the amount of behavior and

[17:10] all this And so I think people wrongly

[17:13] wrote it off because they just simply

[17:15] don't understand what the market looks

[17:17] like or what the value of these things

[17:19] are or they they didn't understand how

[17:21] to build a good product in the space

[17:23] where when I saw it I'm like this is

[17:25] clearly going to be a useful way to get

[17:28] sentry into agents you know in a way

[17:29] where otherwise we can't you know like a

[17:32] CLI is not the solution to me to that

[17:33] problem because you still have to like

[17:35] bundle some other stuff get them to

[17:36] install this you know etc. Um, and it's

[17:38] been really it's been really good for

[17:40] us. Like we have a lot of daily active

[17:41] users on the MCP, even with them getting

[17:44] logged out all the time, which is absurd

[17:45] to me. And I think that that tells you

[17:47] just how like useful it is. And and I

[17:49] dog food it all the time. I use it

[17:50] myself. And so I I recognize some of

[17:52] that value. Um, but yeah. No, I think

[17:54] it's I think it's very it's the first

[17:56] time in my career that I've seen like a

[17:58] reverse integration like this where you

[18:00] actually can build a plugin and it's

[18:03] not, you know, designed for like a

[18:05] single partner. it just like you build

[18:07] it and like it just works for all future

[18:09] partners kind of thing and I don't know

[18:11] it ends up being like very very high

[18:12] value. Do you think the protocol was

[18:15] published too early as a standard

[18:17] though? Because some of the problems you

[18:19] mentioned particularly around AO

[18:21] if you have a concrete use case in mind

[18:24] which I mean enterprise software is like

[18:27] kind of the obvious for those kind of

[18:28] things usually you should think about

[18:30] all at least

[18:31] >> the version of O they're using obviously

[18:33] like uh most of it's still the DCR the

[18:35] dynamic client registration or whatever

[18:36] it's called. Um I had never heard of

[18:38] before MCP which I'm sure is the true

[18:40] for the entire internet. Um it's

[18:43] suffocated.

[18:44] It's not super secure in the sense of

[18:46] it's not insecure, but from security

[18:49] includes a lot of things. It's not just

[18:50] like um is it logically secure. It's

[18:53] also like does it prevent like fraud and

[18:55] abuse and all this stuff and so it

[18:56] doesn't really do that. Um but I don't

[18:59] know that there's a solution to the

[19:00] problem to be honest with you. Uh and so

[19:03] I don't know. I think it works okay. I'm

[19:05] glad it's OOTH if you will and I'm and

[19:07] I'm glad that because it's oath you can

[19:09] implement it natively in a lot of flows.

[19:11] But yeah, it does feel rough. I actually

[19:14] think the O is less of an issue than

[19:17] sort of the way the transport mechanism

[19:19] works. But I do agree that it was like a

[19:22] standard right off the bat. And whenever

[19:24] you do this and especially when there's

[19:26] a lot of money involved in the in sort

[19:27] of AI is one of those faces. All the big

[19:31] companies are like, "Yeah, standards. We

[19:33] love spending time on standards. Let's

[19:34] like let's get a committee together and

[19:36] go argue about standards." And I will

[19:38] say to MCP's credit, it at least is

[19:40] making progress where most of those go

[19:42] like I love to rag on open telemetry. So

[19:44] like most of them get stuck, you know.

[19:46] >> I was just about to say that like the

[19:49] for standard it's still very fast

[19:50] moving. I other than I think VS code no

[19:53] one has really is even aiming to be like

[19:56] 100% spec compliant. Uh which tells a

[20:00] lot about the pace of the product or the

[20:02] protocol

[20:03] >> or the value of some of the protocol to

[20:04] be fair. though.

[20:05] >> That's also true. [laughter]

[20:07] >> Like most of the things like resources,

[20:09] they were never used. Why were they why

[20:11] do they exist? Prompts have been dead a

[20:13] long time. They didn't get implemented

[20:15] everywhere. Tools are great, don't get

[20:16] me wrong. Uh I think skills are coming,

[20:18] but they're not there yet.

[20:20] >> I didn't even know that. I think the U

[20:22] part UI part is interesting, but I I

[20:24] cannot see quite fore uh the use case of

[20:27] that other than like visualizing a

[20:29] diagram or something, which most of the

[20:31] at least those check clients can do

[20:32] these days anyway. So I'm not quite sure

[20:34] how I feel about that.

[20:36] >> Here's my analogy for the UI. I I agree.

[20:38] I think it's interesting, but I don't

[20:39] know if it's practical. Like we have two

[20:41] in all this and it can't work, right?

[20:42] But Sentry has a lot of data, right? And

[20:44] so we have traces which you could render

[20:47] visually much more interestingly if you

[20:48] could embed like a React component,

[20:50] right? Okay. Is that a big deal? No. We

[20:53] have video replay session replays. Okay.

[20:56] That one is like wildly different if you

[20:58] could embed like an interactable

[20:59] component. And so do you need that

[21:01] though? uh you can click the link and go

[21:03] into the UI. It's not actually that

[21:05] useful. So, so I think and this is how

[21:07] all these things go. There's a lot of

[21:10] this is neat, not this this had market

[21:12] demand and thus we built it kind of

[21:14] thing. And so, so yeah, I don't know.

[21:16] Maybe maybe it'll it'll become more

[21:18] valuable, but we actually haven't

[21:19] shipped any of the MCP apps, I think, is

[21:20] the the core of the spec because it just

[21:23] doesn't work in most places and it's

[21:26] kind of it's like it has trade-offs to

[21:29] ship it. like you you end up bundling

[21:31] more information over the wire even if

[21:32] it's not used and and so I I don't know

[21:34] I I have mixed feelings on the whole

[21:36] thing right now but it does feel like

[21:38] there's a bunch of this stuff that

[21:40] probably doesn't survive in the spec

[21:42] >> I think that is a good thing I think

[21:44] kind of weird for a spec how do you feel

[21:47] about the so if you're I spend way too

[21:50] much time online but if you are online

[21:52] there you see like oh software

[21:54] engineering as a craft is completely

[21:55] changing yada yada yada do you think

[21:57] that

[21:58] >> somebody says that I click their bio And

[21:59] I'm like, "Okay." And that's that gives

[22:02] you all the information you need. There

[22:03] is nobody that is credible that says

[22:06] that. I've not found a single human.

[22:09] Like obviously the way we're writing

[22:10] code is a little bit different, but

[22:12] software engineering, the way you design

[22:13] systems, the knowledge you need, all

[22:14] these things. It's not gotten any

[22:16] easier. The the LM is not magically

[22:18] going to give you like like decisions

[22:21] are not a math equation in in things

[22:23] like software and products. It may not

[22:24] be a creative expression, but it's it's

[22:27] somewhere in between. There's no binary

[22:28] right answer for a lot of things. And

[22:31] even on top of that, they're not that

[22:32] capable of machines. And I I think any

[22:35] of us that actually like use them

[22:37] dayto-day like see this. You give them a

[22:39] hard test and they go they go haywire.

[22:41] And that's even on like binary problems

[22:43] because like yeah, you can run them in a

[22:45] loop and verify to some degree on some

[22:47] problems, but not most things. They

[22:49] can't even write CSS today. Like they

[22:51] can't do anything in UI without it being

[22:53] wrong all the time, right? And so I I

[22:56] feel like sometimes you have to be like

[22:58] remind yourself that

[23:01] a lot of stuff is people attempting to

[23:03] do marketing but not understanding that

[23:05] one that's what they're doing and that

[23:06] two they're doing it poorly. Um and

[23:08] Twitter incentivizes the rage bait [ __ ]

[23:11] Um,

[23:12] and so I I I I know a lot of people that

[23:15] are like

[23:17] sort of like just tired of these

[23:20] conversations at this point and they're

[23:21] like, I'm I'm just like checking out of

[23:23] Twitter because it's this like echo

[23:25] chamber of people that aren't actually

[23:26] even in the industry talking about

[23:28] things that aren't true, trying to get

[23:30] like clicks, you know, things like this

[23:32] and and it's like you can ignore it, but

[23:34] it's frustrating to ignore it. At least

[23:36] for like a lot of us, right?

[23:38] >> It drains a lot of energy also. That's a

[23:40] because you're if you spend too much

[23:41] time in this echo chamber, you start to

[23:44] lose like perspective to some extent.

[23:46] >> Yeah. And I think it's it's it's like

[23:48] actually really unfortunate. It's the

[23:49] same with like startups and whatnot.

[23:50] Like I'll post something on the internet

[23:53] and I'm never looking like for somebody

[23:55] to sell me a thing. I'll like have a

[23:56] genuine technology interest about

[23:58] something. I'm like, "Oh, I wonder if

[24:00] anybody else has done this at all or

[24:02] XYZ." And I'll just get like 20. They're

[24:04] not even startups. They're like little

[24:06] sloped together projects that kind of

[24:09] look like a startup in yesterday world.

[24:11] Um, and I'm like, what is going on here?

[24:14] And I think just people are out of touch

[24:17] with a lot of things. And because

[24:19] there's so much noise, it's really hard

[24:21] to find signal in it as like somebody

[24:24] consuming it like like I can keep

[24:26] grounded in my opinions of like what I'm

[24:27] doing and what is good and what isn't

[24:29] good. But knowing what is good from

[24:31] other people that I just like is sort of

[24:33] beyond my domain or I haven't

[24:34] experienced. I'm like I don't know

[24:35] what's real and what's not real. And and

[24:37] you're sort of back to this thing which

[24:38] is good. You're back to this thing where

[24:40] there's like like reputational value

[24:41] where well there's a handful of people I

[24:44] know. I recognize their names cuz I've

[24:46] interacted with them a bunch. I know

[24:47] what they do. I know they're real.

[24:48] They're not just like one of these

[24:50] randoms on the internet producing slop.

[24:51] And so I'm like well if they're talking

[24:53] about something I will probably like

[24:54] paid more attention now. But the mental

[24:56] load of like keeping this context and

[24:59] then figuring out who's who and all

[25:00] this, it's it's a lot. I don't know.

[25:02] >> I think it's also difficult because you

[25:03] get a lot of shitty noise from like

[25:05] these big companies like Facebook still

[25:08] having like their token leaderboard

[25:09] where I'm just like, well, this is the

[25:10] dumbest idea I ever heard.

[25:13] >> Yeah.

[25:13] >> Or like the Nedia guy who who was like,

[25:16] well, an engineer making 500,000 should

[25:18] at least spend 250,000 a year in tokens.

[25:21] Like where are we talking about the

[25:22] value that this produced? I can easily

[25:24] spend that much money on tokens. No

[25:26] problem.

[25:27] >> I don't I don't know. Some of this is

[25:28] and like

[25:30] there are a lot of people in

[25:31] high-profile. So I I believe in this

[25:33] sort of moral duty thing. If you if you

[25:35] have power, you have a responsibility.

[25:37] Full stop. I just don't care. Um and I

[25:40] don't have a lot of power, but I have

[25:42] enough like influence, if you will. I

[25:43] have enough influence that I feel like

[25:46] more responsibility to be like that is

[25:48] [ __ ] is, you know, that's not

[25:49] necessarily what I mean. Um, but I do

[25:52] feel like I have a duty to not just feed

[25:54] people BS. Um, and a lot of people

[26:00] I don't know. There's like some of it I

[26:02] think people don't know. They're so out

[26:03] of touch. Like CEOs and stuff, they're

[26:05] so out of touch. And then other people I

[26:08] think they know what they're doing and

[26:09] they choose to do it anyway. And I'm

[26:11] like all of you are to blame. And and

[26:13] you'll have somebody So like I think

[26:15] Jensen Wong is like a good example of

[26:16] somebody who's generally pretty

[26:18] grounded. He's not running around being

[26:19] like AI is replacing all jobs or

[26:20] anything. He'll he'll say stuff once in

[26:22] a while that's like a little absurd to

[26:24] me. Like there was that quote from him

[26:25] like you know engineers should be

[26:26] spending like a quarter mill a year in

[26:28] inference or something. I'm like no. Um

[26:31] but so the most part he's granted but

[26:33] then you hear all these other people

[26:34] especially like Daario. It's like the

[26:35] most absurd [ __ ]

[26:36] >> I was just about to say that. I was just

[26:39] about to say

[26:40] >> he he is just frankly he's bad at public

[26:42] coms. He should not do it. It'd be my

[26:44] honest advice if you ever heard me or if

[26:46] I ever saw him and be like, "You should

[26:47] stop posting anything in public ever

[26:50] because you don't know what you're

[26:51] doing." And that's just simply it's the

[26:52] truth. And I think it's turning out okay

[26:55] because they have such good product

[26:57] market fit. But in any other situation,

[26:59] they're just burning goodwill of

[27:00] customers. And it's like why? What do

[27:02] you gain out of burning a good like you

[27:04] know it doesn't make sense. The thing is

[27:06] like at at the start when Anthropic got

[27:09] big, they primarily targeted developer

[27:12] for their marketing and then saying like

[27:14] ah in 6 months developers won't write

[27:16] code anymore. Who thought this was a

[27:18] good idea? Besides the fact that it's

[27:19] blindly untrue. It's just

[27:22] and like I I I'm sure he means well, but

[27:26] in in that role, you've got to step back

[27:27] and be like, okay, I actually do have to

[27:29] consider the message I'm putting out.

[27:30] I'm not just like sort of having a think

[27:32] piece with my friends or anything of

[27:34] like, oh, will it maybe look like that

[27:36] or something? If like if you go to a

[27:38] journalist and you say that, what do you

[27:40] think happens? It's bad. It's bad for

[27:42] everybody. And and I just wish people

[27:44] would like check themselves a little

[27:46] bit. And a lot of people do this. It's

[27:47] not just like people that are

[27:48] high-profile like him that are people

[27:49] that are like my peers that also

[27:51] constantly are doing things like this

[27:53] and they know they know what it does.

[27:55] And I find it quite frustrating. But

[27:57] there's an increasingly

[27:59] there's a there's a growing population I

[28:01] think also of people

[28:04] that are kind of like bothered by that

[28:06] that are also in positions like mine

[28:08] that are sort of being more grounded in

[28:10] voices of reason, you know, trying to

[28:13] literally trying to just be grounded,

[28:14] not be like super negative or like

[28:17] overly optimistic about things. And I

[28:19] think that is like really valuable, but

[28:20] again, signal the noise is still a

[28:22] really hard problem. One thing I like to

[28:24] discuss because I I got into the

[28:26] industry what 15 years ago something

[28:28] like that uh where the easiest way to

[28:32] learn from you was like just like facing

[28:34] a problem heads on and struggling with

[28:36] it for days. That's that's how I

[28:37] learned. How do you think people will

[28:40] get into the industry these days where

[28:41] the bar to entry to some extent is so

[28:44] much lower because you can just

[28:45] outsource your problem and not go

[28:47] through the motion of like learning by

[28:49] repetition, learning by I like to call

[28:51] it learning by pain just struggling with

[28:53] problems for days. Yeah, this I actually

[28:56] don't know because I agree like you know

[28:59] I think one so I think two things I

[29:02] think academics are so important because

[29:03] they give you theory. Um even if it's

[29:05] not applied most of the time knowing

[29:06] that theory is actually still useful. Um

[29:08] and I say this as somebody who's like

[29:10] I'm a high school dropout. Um but I I

[29:12] recognize I saw the value later career

[29:15] where these things would come into play

[29:16] and whatnot. So, I I do think that still

[29:18] helps, but I I don't know how you learn

[29:20] if you don't actually if you're not

[29:22] doing the thing because you need at

[29:25] minimum even if the LMS or whatever,

[29:28] even if technology can generate code and

[29:30] verify and some stuff like this, you

[29:32] still need systems design.

[29:34] And like the the problem is there's like

[29:36] an impatience that I think is amplified

[29:39] with these things. It's like gambling.

[29:41] And are you going to read the output

[29:43] that says this is a bad design and

[29:44] actually consume it and then guide it

[29:46] correctly next time? You're probably

[29:48] not. You're probably going to go in and

[29:49] do the same thing where you're like, I

[29:50] want to build this thing. You're not

[29:52] going to give it to the design of the

[29:53] system. You're going to let it do

[29:54] whatever it's going to do and it will

[29:55] often do it wrong anyways, which doesn't

[29:57] help the situation. Um, and I don't

[30:00] actually know

[30:02] it. It's hard to I don't have like um an

[30:06] instinct on what the solution is because

[30:07] I don't I just don't think you're going

[30:08] to be able to learn that way. And then

[30:10] so does is a solution you shouldn't be

[30:12] using LM that doesn't seem practical

[30:14] either. So I I don't actually know it.

[30:15] It seems complicated to be honest.

[30:17] >> I I don't think like the this saying of

[30:19] like oh yeah while learning you

[30:20] shouldn't use LMS that that is not

[30:22] realistic. That is not how you're going

[30:24] to work long term. At the same time I

[30:26] think this accountability piece of like

[30:28] at the end of the day it's still your

[30:30] name tied to that piece of code. If

[30:31] there's a bug causing like a production

[30:33] outage you're to some extent accountable

[30:36] for that. I'm not trying to establish

[30:37] like fingerpointing culture by no means,

[30:39] but at the same time that that's how

[30:41] things work if I cause a production

[30:43] outage.

[30:44] >> Yeah. I think there's got to be

[30:45] accountability. Um, and I I want to

[30:48] believe cuz like we're not in a world

[30:49] we're not like I don't think we ever get

[30:52] to this to be quite honest with you.

[30:54] Like humans are going to stay in the

[30:55] loop if nothing else because there has

[30:56] to be accountability. There has to be

[30:58] liability. And so so at the very minimum

[31:00] there's code review and good engineering

[31:03] practices are exactly the same as they

[31:05] were before. So like smaller chain sets,

[31:07] all this. The problem is everybody wants

[31:08] to go fast now and you can't necessarily

[31:10] go faster. And if you still practice all

[31:12] those things, which I think will

[31:13] continue to enforce, maybe you learn

[31:15] more through like that peer review

[31:17] process and stuff than you would before

[31:18] because you did learn a lot through that

[31:19] in the past or or through pre-esign sort

[31:23] of whether it's building specs or some

[31:24] other systems design exercise. But yeah,

[31:26] I'm not sure. One one thing you brought

[31:28] up that is kind of insane to me is like

[31:30] this whole conversation of like oh we

[31:32] need to push out more code faster always

[31:35] just assumes that writing code was the

[31:37] bottleneck where I'm like I in every

[31:39] company I've worked writing the code is

[31:41] never the issue. I can write code all

[31:43] day if I didn't had meetings for

[31:45] instance which I try to prioritize

[31:47] important meetings for instance like

[31:49] that whole conversation doesn't make

[31:51] sense and I'm not reading code just for

[31:54] the sake of reading it because it's such

[31:55] a fun activity because it actually

[31:57] prevents issues like what are we even

[32:00] discussing here? It's interesting

[32:01] because I don't know if you kind of step

[32:03] back and you look

[32:05] if you really look at things and try to

[32:07] be like very critical things don't look

[32:09] like they've changed that much in terms

[32:11] of how we produce software like like all

[32:13] the mechanisms look exactly the same and

[32:16] so

[32:17] but but there's these other things that

[32:20] are kind of breaking with I'll give you

[32:21] mine I'm very much like I am super high

[32:25] throughput like if you went back in time

[32:26] like the 10x engineer persona nobody

[32:28] would question that that is me. Um, and

[32:30] it's mostly because my output is so so

[32:33] extreme and it still is with LLMs. But

[32:37] one challenge I have now, and this might

[32:39] get solved for what it's worth, is a lot

[32:41] of

[32:43] learning, if you will, but it wasn't

[32:44] necessarily learning how to code, but it

[32:45] is it is it is connected. I would build

[32:48] a a first version of something. I didn't

[32:50] build a spec. I would build the software

[32:51] and then I would iterate on it as my

[32:53] idea got more refined, as it got more

[32:55] solid, and sometimes I'd come up with

[32:56] better technology choices in that idea.

[32:58] And I think that's pretty common for

[33:00] folks. Um,

[33:02] and that was everything. And that's

[33:03] actually quite hard to do with LLMs.

[33:05] One, because they're slow. Um, and I I I

[33:08] actually want to run like an experiment

[33:09] of using like Composer 2 regularly. I

[33:11] have a feeling I'm not going to be happy

[33:12] because I'm going to have to like course

[33:13] correct it too often, but but I think

[33:16] it's also because you're not one of the

[33:18] things I would do regularly is you kind

[33:20] of refactor as you go. It's this like

[33:22] constant cleanup thing. And and and

[33:25] nobody's found a solution for this. And

[33:26] I don't know if there is one when using

[33:28] agents and whatnot, but um but a lot of

[33:30] that is subjective. It's like very hard

[33:34] to have an objective like this is

[33:36] definitely correct because you have sort

[33:38] of a vision in your head or or a set of

[33:40] things you've built on top of that you

[33:42] believe in and they've worked well for

[33:43] you or you know something like this and

[33:45] you also develop those things by sitting

[33:47] in there and going through the problems

[33:48] and whatnot. And we still have some of

[33:50] that same thing. And so there's one

[33:52] version that you could believe in that's

[33:53] like well doing that now will become

[33:56] refinement on the tools on top of agents

[33:59] rather than the code itself and getting

[34:01] them to output the right code. But

[34:03] another version says well there there's

[34:05] still language models and they're still

[34:08] going to be non-deterministic and that

[34:09] might not work and we're going to have

[34:11] to do something else differently. Like

[34:13] there's a lot of people I know that have

[34:14] tried different experiments around this

[34:15] like oh maybe they'll by hand draft out

[34:17] the interface or something like just

[34:19] pseudo code or something and then have

[34:21] the LM fill it in. Um or they'll try to

[34:24] do some crazy spec thing or something

[34:26] which I I don't find works at all for

[34:28] what it's worth because the spec's never

[34:30] correct. But um but yeah, I don't know.

[34:33] I I I kind of wonder I was talking to

[34:35] some other folks about this who are, you

[34:37] know, rational and very good. Um,

[34:41] and then kind of the shared sentiment

[34:42] was like, did we just jump to a put like

[34:45] a pretending that the end state was

[34:49] already here or something like this cuz

[34:51] we went from like tab complete to

[34:52] instantly we just don't write code

[34:54] anymore. And it's like maybe we should

[34:55] have stopped somewhere in between.

[34:57] >> That's very much where I'm leaning

[34:59] towards like yes, the LMS are good at

[35:04] generating the necessary characters that

[35:06] make up code. It's also a lot faster

[35:09] than if I would write type it by hand if

[35:12] I don't know exactly what I need right

[35:14] like this explorative work

[35:16] >> but at the same time like you still need

[35:18] to read code you still need to maintain

[35:19] systems usually you're also not working

[35:21] on a system yourself where everything

[35:22] just lives in your head like if I look

[35:24] at uh intelligj that is 20 years of

[35:27] institutional knowledge that lives

[35:29] somewhere

[35:30] certainly not in my head one thing you

[35:32] brought up that I'm uh would like to ask

[35:34] you um do you think vibe coding will

[35:39] replace no code solutions.

[35:40] >> At the very least, I think those

[35:42] solutions are going to change, but

[35:45] not everybody's an engineer and that the

[35:48] the delta between generating software

[35:52] and using some kind of block system or

[35:55] something is like very different, you

[35:57] know, and so are they going to be able

[36:00] to debug the problems with it? Do they

[36:02] have to now all of a sudden? And so I

[36:04] don't know. I I think generative

[36:08] interfaces which I would not call the

[36:10] same thing probably do like there's

[36:13] probably a lot more dynamic interfaces

[36:14] and things people can do and I think

[36:16] some of them will probably become more

[36:20] true code generation like without

[36:22] constraints whereas I think a lot are

[36:24] actually just going to be constrained uh

[36:25] interface generation um like I don't

[36:28] know imagine a design system or

[36:30] something like this and it'll be able to

[36:31] build lots of different blocks or I'm

[36:32] not totally sure um it definitely

[36:34] changes

[36:35] But I don't like does does Squarespace

[36:37] become lovable or something like that?

[36:39] I'm like I'm not sure because I think

[36:42] the one thing I do believe in with

[36:44] absolute certainty is the market has

[36:46] expanded. That there are more people

[36:48] doing engineering work that were not

[36:51] previously engineers and are not great

[36:53] engineers now, but they're better than

[36:54] they were and they will probably

[36:56] continue to get better. But they may not

[36:57] like they may stop at like like an entry

[37:00] level engineering role, but all they're

[37:02] doing is building little websites for

[37:03] their I don't know their brick and

[37:05] mortar store or something like this,

[37:06] right? And so we we have like this

[37:09] conviction around market expansion

[37:10] because we see it in numbers and we're

[37:11] trying to figure out how do we address

[37:12] that as a as a company because we only

[37:15] target developers. We've never targeted

[37:17] say like WordPress uh admins or anything

[37:19] like this, right? Um,

[37:22] and these are like sort of new

[37:24] developers that we do we feel are close

[37:26] enough that they are part of our

[37:27] audience I guess if you will. And so

[37:29] that I think that's a truth. Uh, but

[37:31] that's not everybody either. And so I

[37:33] don't know where that delta is in

[37:34] between. But it is it is interesting

[37:36] like our CFO he has like some

[37:38] application he's built and it's totally

[37:40] reasonable. And when you realize he's

[37:42] like he's a finance guy. He thinks like

[37:44] an engineer. It kind of makes sense that

[37:46] he'd be capable of doing this. He just

[37:48] didn't know the syntax and he doesn't

[37:49] know systems design to be fair either.

[37:51] But he's definitely more capable than a

[37:53] lot of people would be. Um, and so I

[37:56] don't know I don't know what that

[37:57] translates to though over a long period

[37:59] of time.

[38:00] >> For what it's worth, I also think vibe

[38:01] coding is very viable if you're just

[38:03] doing something for yourself. Just like

[38:05] you write a tool for yourself, you don't

[38:07] really care about the code quality or

[38:09] something and if it breaks, you just ye

[38:11] it through a prompt one more time. I I'm

[38:13] cool with that and I do that too for

[38:15] some things, but like the minute you

[38:17] send like customers or friends or

[38:19] families on it, they should maybe know a

[38:21] little bit what you're doing there.

[38:23] One thing you brought up, do you think

[38:26] the distinguishment between product work

[38:30] or like product development,

[38:33] product management, design is somewhat

[38:36] growing closer together with the use of

[38:38] LMS? because I can see at least like a

[38:41] designer or product manager to create a

[38:44] prototype not production ready but at

[38:46] least like a prototype which is usually

[38:48] easier to discuss than user spec. I

[38:50] don't see anything that suggests for

[38:53] example that we're collapsing roles like

[38:55] that an engineer is now also a PM not in

[38:58] any any version that was is different

[39:00] than before if you will um same with

[39:02] design I do see people having more

[39:05] access to do things especially at a

[39:08] prototype stage um and like some people

[39:11] hate this for what it's worth like our

[39:12] design team hates when I you know slop

[39:14] together some generative artwork um but

[39:17] it but it does allow me to get more

[39:18] prototypes out the door and stuff like

[39:20] Yeah. And so I think I I think it is

[39:23] giving us it's it's a new set of tools,

[39:24] right? It it's like we're still trying

[39:26] to solve the same problems. We've

[39:28] expanded tools. Like I my my analogy

[39:30] here and I'm not I'm not an expert on

[39:32] this, so take it for what it is, is once

[39:34] upon a time there was uh my my um mom

[39:37] was an accountant growing up and she

[39:41] started in the era of Lotus Notes, which

[39:43] I know nothing about, but it was

[39:44] originally like some accounting software

[39:46] or something. Yeah. And and I only know

[39:49] this story because she stopped being an

[39:50] accountant when when she got pregnant

[39:52] and had me as a kid. And there was that

[39:53] gap where they went from Lotus Notes to

[39:56] I don't know if it was Excel, but

[39:57] whatever came after it, right? And it

[39:58] was a big technology change, right? It

[40:00] was a tool chain change, but accounting

[40:02] didn't really change. It was just like

[40:03] there was new software. And at least

[40:05] back then, there wasn't like this thing

[40:06] where you could easily pick up the new

[40:08] software, whatever. It was like you

[40:10] actually had to learn it. Um, this is

[40:12] just that to me. It's just another set

[40:13] of tools that are going to be used in

[40:15] certain ways. except right now we're

[40:16] pretending it's used in every single

[40:18] way. Um, and it changes. We're we're

[40:21] sort of there's a lot of we is like not

[40:23] necessarily representative, but a lot of

[40:25] people are sort of jumping to the

[40:26] conclusion that

[40:28] a bunch of jobs no longer exist. They

[40:30] are now LLM. And I'm like I haven't seen

[40:33] a single job like there are there are

[40:35] real uh roles that are at risk. I think

[40:37] things in like um especially like with

[40:39] big companies like customer service

[40:40] centers and things like this, those are

[40:41] going to change drastically.

[40:44] engineering. I don't know. I still need

[40:46] just as many engineers. I need them to

[40:47] be just as capable. Designers, PMs,

[40:50] salespeople, like all this stuff. I I

[40:53] don't know. I I don't see a lot of it

[40:54] changing in terms of people doing the

[40:58] work. Just the way they do the work is

[41:00] probably going to some of them will

[41:01] change more than others, I guess, if you

[41:03] will.

[41:03] >> I am curious about these things when

[41:05] like I think Anthropic has like a proof

[41:08] of concept for claw for lawyers where

[41:10] I'm like that sounds insane to me.

[41:13] utterly insane.

[41:14] >> I mean, we use we use co-work for legal

[41:16] work essentially. Um, like we get

[41:19] >> by a lawyer. [laughter] I would hope so

[41:21] at least.

[41:22] >> Oh, yeah. Yeah. By a lawyer. Oh, yeah.

[41:23] Yeah. Sorry. Yeah. Yeah. I mean, again,

[41:26] once again, this is liability. Like,

[41:28] >> exactly.

[41:29] >> Choose if you want to go to jail. Um,

[41:32] and I think if you're like a oneperson

[41:34] business,

[41:36] okay, sure, you're going to cut corners.

[41:37] That's that's always been true, right?

[41:39] So, that doesn't change anything there.

[41:41] But if you're a oneperson business, you

[41:43] do not represent anything of substance

[41:45] in this world. And I think that's like a

[41:47] grounding truth people need to

[41:48] understand. Like companies with

[41:51] at minimum tens, but mostly thousands of

[41:53] employees are actually the ones that

[41:55] represent the economy um for the most

[41:58] part. And they're they're not going to

[42:02] outsource legal paperwork to a [ __ ]

[42:04] robot, right? And so I I don't know. I

[42:06] just that's the disconnect I see

[42:07] non-stop from people. I'm like, it's

[42:09] like just because you with your little

[42:11] hobby thing want to do this doesn't mean

[42:13] anybody in the in the sort of quote

[42:14] unquote real world is ever going to

[42:16] operate that way because we employ

[42:18] people to reduce liability. Not because

[42:21] they're necessarily doing add

[42:24] incremental value work all the time, you

[42:26] know. Do you

[42:29] think with LLMs and agents and you name

[42:33] it, the open-source scene is changing?

[42:37] And I mean to some extent we see a

[42:39] change already in the amount of pull

[42:40] requests we have. U before this episode

[42:43] an episode with Mario SA will go out on

[42:45] Pi. Uh and he said like he has so many

[42:47] garbage pull requests now. Um but and I

[42:52] we see also a lot of um open source

[42:54] project closing pull requests to

[42:56] non-nown contributors.

[43:00] So how do you think that that part of

[43:03] the industry is going to change?

[43:04] >> Yeah, it's definitely changing. So I

[43:06] don't know. It's it's weird because you

[43:07] would always get junk pull requests. Now

[43:09] there's more of it. Now there's a lot of

[43:10] accidental pull requests and stuff like

[43:12] we get these all the time on our

[43:13] projects. It's like oops I meant to open

[43:15] this on my fork and that I think is a

[43:17] worse signal. Um, and so this idea of

[43:20] like we have a shared problem there.

[43:21] There's all these different things

[43:22] actually happening in open source, but

[43:24] it used to be we have this shared

[43:26] problem. It is not our business and

[43:28] there is no business around it. We're

[43:30] going to open source something. And then

[43:32] other people had the shared problem and

[43:34] software is hard to build. You'd rather

[43:36] if you have the same problem work with

[43:38] somebody else to solve it, right? That

[43:40] should still be true. It is not true

[43:42] right now and it is not true for all

[43:44] these different reasons. One, everybody

[43:45] commercializes everything under the sun.

[43:48] We intentionally I I I kid you not. I

[43:51] consider it my life's goal now to open

[43:53] source people's businesses that should

[43:55] not be businesses in the first place.

[43:57] Like like this code review thing that I

[43:59] built. I mean, it's under fair source. I

[44:01] don't really care about that, but that's

[44:02] mostly because we had like a competing

[44:03] product. But I'm like, this is not that

[44:06] hard to build. It is not a product.

[44:08] Sure, you can you can sell it. That's

[44:10] totally fine. But what I mean is like

[44:12] there is no inherent sort of

[44:15] technology challenge to build this

[44:16] thing. There's no reason it shouldn't be

[44:18] open source infrastructure, right? And

[44:20] so there's a lot of stuff like that. So

[44:21] that that's going on. I think there's a

[44:23] second thing where a lot of people are

[44:25] exposed to this and don't really

[44:27] understand it or don't value the

[44:28] collaboration or the community aspect.

[44:30] Um Pi I actually think is on the counter

[44:32] side where like people do value it and

[44:33] Mario's done a great job there. Thus you

[44:36] get more of this slot. Um but yeah, we

[44:38] we see very little. Everybody just DIYs

[44:41] their own thing now because it's it's

[44:42] easy to get the v zero version out and

[44:46] so people do it and they sort of assume

[44:49] that's where it's complete. I spent this

[44:51] code review thing first day I had a

[44:54] prototype that worked and proved it

[44:55] worked right three weeks I spent making

[44:59] the sort of interface design good and

[45:02] functional and and and what I would call

[45:04] like high taste or something like that.

[45:06] And I think people forget that that

[45:07] actually matters to the long-term health

[45:09] of of a software project. Sure, you can

[45:11] slop together, but there's the same

[45:12] argument for SAS. SAS is not dead. It

[45:14] will never be dead. Um because I want

[45:16] good software, not not some slop that I

[45:18] have to maintain or will just be broken

[45:20] or have all these other problems, right?

[45:22] And so

[45:23] there there's that. And then there's a

[45:25] third version which is people sort of

[45:27] like theft, like IP theft, which is

[45:29] going to happen now more than ever,

[45:31] right? It was already a thing that

[45:32] happened that, you know, sometimes you

[45:34] would see, sometimes you wouldn't see. I

[45:36] don't know. I I want I want somebody, so

[45:38] if somebody listens to this and you have

[45:40] courage and are okay with us wrecking

[45:42] your life, I want somebody to go take an

[45:44] LLM, take our codebase, which is

[45:46] licensed under the functional source

[45:47] license, and reimplement it and try to

[45:50] violate our license and claim that it's

[45:52] some white room or what are they? Clean

[45:54] room. Clean room solution. We will sue

[45:57] the [ __ ] out of anybody that does that

[45:58] and we will win because that's not how

[46:00] the law works. That's not how IP

[46:01] protections are going to work. And

[46:03] people some again, people just like live

[46:05] in this little hallucination bubble that

[46:07] they think things are okay because they

[46:09] have some like conversation in their

[46:11] head with themselves that all of a

[46:12] sudden it is okay. And like and there's

[46:14] so much of this kind of junk like we had

[46:17] we had a company that was um mis happens

[46:20] to us somewhat regularly where somebody

[46:21] will take our software and not attribute

[46:22] us. Um and it's it's a lot of our stuff

[46:25] is totally open source. Whether we like

[46:27] that people use it or not is a different

[46:29] conversation, but it you can't, right?

[46:30] It's MIT license or something, but you

[46:32] have to respect the license. Otherwise,

[46:34] we have lawyers and we will enforce that

[46:36] license to no end. And all you got to do

[46:38] to respect it is put in the attribution

[46:40] clause. And we had somebody that didn't

[46:42] do it and they tried to avoid it by

[46:44] like, oh, we'll reimplement the code.

[46:45] I'm like, that's not how it works now.

[46:46] You already took the code and

[46:48] implemented it. You can't just

[46:49] reimplement it to remove the license.

[46:51] That's not how licenses work. Like,

[46:52] that's a clear breach. And I'm like,

[46:53] just add the attribution. What is wrong

[46:55] with you? And then they did like they

[46:57] did after like a second round of like no

[46:59] that's not good enough. But I'm like

[47:01] what are you doing? Like these are legal

[47:03] constructs. You have to follow the law.

[47:05] And so I I don't know. I I hate it

[47:07] because my entire career is because and

[47:10] the reason we do open source and I still

[47:11] do open source. I don't care about the

[47:13] freedoms or any of this stuff like the

[47:14] the FSF freedoms but I care about the

[47:17] access to software and I care that doing

[47:19] this sort of build public but like this

[47:21] open source stuff it gave me a lot in my

[47:23] career. And so it's very valuable to me.

[47:25] and I feel like you'd be back and things

[47:26] like this. That sounds kind of like

[47:28] obvious and there's no again there's no

[47:30] business behind most of it so it should

[47:31] just be but the sort of it does feel

[47:35] it feels like it's dead. It feels like

[47:38] the old version of open source which was

[47:40] this

[47:41] is never going to exist again. Um and

[47:44] some of that probably should die like

[47:46] the little npm packages and stuff but I

[47:49] don't know like

[47:52] Yeah.

[47:53] Yeah. But yeah, I don't I don't know.

[47:56] That's probably like the I'd say the

[47:58] least talked about

[48:00] most obviously something significant has

[48:03] happened to thing. And it's not just

[48:05] like the slot pull request either. It's

[48:06] just like the broad again and it's not

[48:08] just AI, but it's been over a course of

[48:10] like last decade of like everything's

[48:12] venture funded now. Uh open core is way

[48:16] more present than open source. Um and

[48:18] all these things. So yeah, I don't know.

[48:20] It's kind of sad, but I I my personal

[48:22] opinion is the old way of open source is

[48:25] is just gone.

[48:26] >> How how is your stance on open source

[48:28] versus open core? You kind of alluded on

[48:30] that just a minute ago.

[48:32] >> I despise open core. It's not open

[48:34] source.

[48:35] >> I I I would aging

[48:39] approach.

[48:40] >> Yeah. The problem is my belief system is

[48:43] sort of do the thing that

[48:46] if I want to build open source, it's

[48:47] open source first. It's not open source

[48:49] second. Even if I'm building a business

[48:50] out of it, that's that's not common for

[48:52] what it's worth and that's an irrational

[48:53] way to build a business. Open core

[48:56] always a business and almost always I

[48:58] refer to it as crippleware because

[49:00] almost always they're like okay we have

[49:02] to like save all the good stuff for the

[49:04] closed source version which you can

[49:06] never afford. The license is always

[49:08] absurd because it's some like enterprise

[49:10] thing. Um, and then usually the open

[49:12] source version kind of sucks and they'll

[49:14] claim it's like there were all these

[49:16] versions of this where like oh well like

[49:17] you need more than one core or

[49:19] something. It's like you have to use the

[49:20] the paid version or just some abs absurd

[49:23] limitations and I I just it's dumb. It's

[49:27] like it's not and that's why I say it's

[49:29] not open source. like cool you gave me

[49:31] junk free software and now I'm sure

[49:33] there's some that's that's not quite

[49:34] true but increasingly it becomes true as

[49:37] your thing becomes more successful and

[49:39] anything of value is going to become

[49:41] more successful and you're going to have

[49:43] a hard time monetizing it because it's

[49:44] open source already or some version of

[49:46] it open source thus you're going to find

[49:48] more ways to monetize it by making it

[49:49] less open source that's that's how it

[49:51] goes 100% of the time and so and we do

[49:53] the same like we no longer open source

[49:55] everything mostly because people keep

[49:56] stealing our [ __ ] but um but Even the

[50:00] core, it's like we're like, well, how do

[50:02] we protect it? Because we don't want to

[50:03] actually water down the product you're

[50:05] getting. We want the product to be good,

[50:06] period. Whether you pay us or not, but

[50:09] we need to be able to monetize it. And

[50:11] at very least, we need to protect

[50:13] ourselves from somebody else monetizing

[50:15] it. And that's quite hard to do with

[50:17] open source licenses. Like prey is not

[50:19] an answer basically. And trademarks are

[50:21] not a solution. We tried that. Um, and

[50:23] so our version was like this fair source

[50:24] thing, which is like delayed open

[50:25] source. um which is like after 2 years

[50:28] it becomes what I would describe as true

[50:30] open source which is permissibly

[50:31] licensed which means effectively no

[50:33] restrictions other than attribution

[50:34] right and that that I think there needs

[50:37] to be more of that software

[50:39] for things that are of sufficient

[50:41] complexity and and and this is where my

[50:44] fear around open source like is pi that

[50:46] I don't know is it of sufficient

[50:48] complexity well it's it's not simple and

[50:50] it has good design and that takes time

[50:52] and effort um but certainly databases

[50:56] like you're not going to I mean people

[50:58] are probably going to try but you you

[50:59] shouldn't be like vibe coding a database

[51:01] right and so I've got to believe some of

[51:03] it has to find a way to survive and and

[51:06] thrive again but I do worry we're

[51:08] leaning way too far the other direction

[51:10] right now one thing that blows my mind

[51:13] is the level of entitlement that open

[51:15] source created in developers where it's

[51:17] like well software is built by people

[51:20] that need to make a living like that

[51:22] parts can be altruistic like I don't or

[51:25] some utilities or something as open

[51:27] source. But at the end of the day, those

[51:28] are hopefully maintained by companies

[51:30] because otherwise it's just a even worse

[51:33] form of exploitation of human labor. But

[51:36] I I don't understand the level of

[51:37] cognitive dissonance where people are

[51:39] like, well, this should just be free.

[51:40] Like are you offering your work for

[51:43] free? Like what are you even talking

[51:45] about? Like that doesn't make any

[51:46] economical senses.

[51:49] >> Yeah. I I'm I'm a very big believer not

[51:52] in karma but in some version of this

[51:54] thing where like not everything needs to

[51:55] be an immediate reward like things need

[51:57] earned you know and open source will

[52:01] earn you rewards like I I I discriminate

[52:04] is probably the wrong liability here but

[52:07] I I specifically look for people with

[52:09] public profiles on GitHub that have

[52:11] public works for a lot of reasons. not

[52:13] not because of the open source thing,

[52:14] but because it shows me a bunch of

[52:15] signals often that I want for people on

[52:17] my team, which is like, well, are they

[52:19] curious? Do they actually like

[52:20] technology? Do they want to build stuff?

[52:22] Um, and you can argue not everybody can

[52:24] do that, and that's totally okay because

[52:25] the jobs I fill, I need people that can

[52:28] do that. Um,

[52:30] and so that is that's kind of what I

[52:32] mean. Like you will find the rewards

[52:34] like people value that kind like every

[52:35] company values that to be clear. Like

[52:37] that's actually high signal no matter

[52:38] what. Uh, now it's a little bit harder

[52:39] to parse as it AI slop or not these

[52:41] days, but but I I think like there's too

[52:43] many people that think you should just

[52:45] get like everything should just be

[52:47] handed to you like like things are easy,

[52:49] especially in tech for some reason. And

[52:51] so I don't know, I I worked hard for a

[52:53] long time in my career, did a lot of

[52:54] open source that gave me a lot of career

[52:56] opportunities that otherwise I there's

[52:57] no way I would have gotten. Um, and here

[53:00] I am. And so I'm like, see, if you just

[53:03] work hard and you do the things that

[53:04] will like build your your your career,

[53:07] you will get like the reward from it,

[53:09] you're not going to get it tomorrow. And

[53:10] you you don't deserve to get it

[53:11] tomorrow, you know.

[53:12] >> Well, it's also a lot harder if it's

[53:14] immediately rewarded.

[53:16] >> Yeah.

[53:16] >> I think Cotlin is for for me at least a

[53:19] good example of how we do open source

[53:22] very well. That's one of the things that

[53:23] I like is yes, the support it helps us

[53:26] internally because we use Cotlin all the

[53:28] time and Java just wasn't great for our

[53:29] purpose. It also helps that we build a

[53:32] product around it where people that want

[53:34] to use cotlin most likely want to use

[53:35] our product or the fork of our product

[53:38] in Android Studio. So that is a good

[53:40] example where like there's an

[53:41] immediately value for people. Hey, you

[53:43] have a much better version of Java for

[53:45] free. Here you go. Uh while at the same

[53:47] time there's also uh multiple levels of

[53:51] motivations for us to actively work and

[53:53] keep investing in it. So that is one

[53:55] example that I like and sentry is doing.

[53:57] Sentry is a great example for me because

[53:59] you have your codebase completely

[54:01] public. So every time when I need to

[54:03] check like a TypeScript quirk or

[54:04] performance issues, I pull up the Sentry

[54:06] codebase because it's one of the biggest

[54:08] open source code bases out there.

[54:09] >> I do wonder like and you know the other

[54:12] thing people don't talk about enough,

[54:13] some people do, but like models come

[54:15] from human knowledge. They're only

[54:17] possible today because of how much human

[54:19] knowledge has been shared. But things

[54:22] don't stop. Like like what if nobody

[54:25] ever builds a framework again? Certainly

[54:27] the ones that are out there are not

[54:29] perfect. Um especially in things like

[54:32] the JavaScript ecosystem where they're

[54:34] very rough at times

[54:37] and but like what if you what if what if

[54:41] nobody ever tries to solve the problem

[54:42] better or you know and and or there's no

[54:45] more programming languages or you know

[54:48] basically something stops there. Like

[54:50] the models are not necessarily going to

[54:52] create this stuff. Now, some people

[54:53] might try to create some of this with

[54:54] models, but like I'll give it like I

[54:56] don't actually pay attention to a lot of

[54:58] technology choices now. Like I'm not

[55:01] going down Google search and looking for

[55:03] the right library or um uh even the

[55:08] framework I actually just don't care.

[55:09] I'm like cool probably it's going to be

[55:11] React. That's good cuz that's the one I

[55:12] would choose. But I'm like is it going

[55:14] to like DIY a bunch of routing? Is it

[55:16] going to use React route? It's it's like

[55:18] the the choice I'm like they're less

[55:19] consequential now which I think is

[55:21] actually bad because it increases uh the

[55:24] brittleleness of software like and and

[55:26] for where some some runtimes have always

[55:28] had this problem but I I my early career

[55:30] was Django and the core value you get

[55:33] out of a a a fully baked framework like

[55:35] Django or Rails is things actually work

[55:37] and and like most importantly they're

[55:40] implemented in a in like a very reliable

[55:44] high quality way where I'm not having to

[55:46] stitch together everything or DIY

[55:47] everything and LM are like the extreme

[55:49] version of this where it's like no like

[55:51] don't even use libraries sometimes just

[55:53] like reinvent a new pattern of it now

[55:55] you got to maintain that pattern and all

[55:56] this stuff and I'm like that and that's

[55:58] always been bad in JavaScript because it

[55:59] was always glued together and this is

[56:02] just worse it just makes more brittle

[56:03] software and I this was always a pet

[56:06] peeve of mine I never understood why

[56:08] JavaScript

[56:09] operated this way um because the the

[56:13] fact that people are still like

[56:15] generically across the

[56:17] DIYing some parts of authentication. And

[56:19] I'm not talking about using a third

[56:20] party vendor. This should this is not a

[56:22] cloud service, but we still DIY all the

[56:25] time. We have some libraries that people

[56:26] use, of course, but the libraries aren't

[56:28] just like drop in and they work. It's

[56:29] like drop in and then glue together lots

[56:31] of different things. And maybe it

[56:34] outsources some of the harder problems,

[56:35] but not all of them. Whereas like Django

[56:37] or Rails or something, and I'm sure this

[56:39] exists in the Java communities, too.

[56:40] It's just like no, you just use this off

[56:43] adapter and it's solved all the

[56:45] complexity and it continues to keep the

[56:47] complexity solved and I I don't know

[56:49] like people forget about the maintenance

[56:51] of software I think and it's serious. So

[56:55] I I I don't I agree. So I grew up mostly

[56:57] in the JavaScript ecosystem so I

[56:59] couldn't agree more. At the same time

[57:00] I'm always surprised of how terrible the

[57:02] developer experience is with Django. I I

[57:05] used it a couple weeks back on one of my

[57:07] colleagues recommended UV to me and I

[57:09] was like, "Okay, this is much better

[57:10] than what I've used before, but it's

[57:12] still terrible." Like, how do you live

[57:13] like this?

[57:14] >> Yeah. And I think it's like some of

[57:16] those were like UV definitely like night

[57:18] and day better from what it was before.

[57:20] But it's it's the same for like

[57:21] JavaScript. You'll you'll go from like

[57:23] npm to PNPM and you're like, "Wow, they

[57:25] solved a bunch of problems." But like

[57:26] what if it what if it stops there and it

[57:28] doesn't continue solving the problems?

[57:29] Like supply chain is the big one right

[57:31] now. Like what if nobody invests in that

[57:33] ever again? and and or the investment is

[57:35] a cloud service and I have I have this

[57:37] big anti- cloud service thing because

[57:39] again I believe in this access to

[57:40] technology thing and and for core

[57:43] infrastructure there needs to at least

[57:45] be open source alternatives and whatnot

[57:47] and if we can't get on the same page of

[57:49] building like as a community like

[57:50] collaborating on things that need solved

[57:52] as a community it just it's bad and I I

[57:55] don't know like

[57:58] I don't know I could go on on this for

[58:00] days so

[58:02] >> do you think we'll will see a

[58:04] conversions in tools and those things

[58:07] though um because and we had this at at

[58:11] the very early days of LLMs there were

[58:13] at least like statistics that um these

[58:15] models generate better Java code because

[58:17] there's a lot of Java code out there

[58:19] than Rust code for instance like I think

[58:20] this got better from what I've heard not

[58:22] doing Rust a whole lot but um do you see

[58:25] this being and you said this the same

[58:27] like a model would most likely recommend

[58:29] react these days do you think for that

[58:32] purpose we be a convergence to to a

[58:34] certain set of technologies where people

[58:36] are just like, "Well, that's good

[58:37] enough. I can roll with this."

[58:39] >> Yes. And so I think some of it's good

[58:41] for what it's worth. Um we don't need to

[58:43] reinvent React yet again. Um but

[58:48] here's my thesis cuz I'm I'm dumb enough

[58:50] to not know any better. Um, in my

[58:53] experience, if a model has not been

[58:56] heavily trained on a thing, like models

[58:58] will only give you the right answer if

[59:00] you give them the right answer first,

[59:02] right? And so people try to do that via

[59:04] pick any jargon, you want context

[59:05] engineering, but like passing it the

[59:07] right stuff. So like if I copy paste the

[59:09] right code into the model and ask it how

[59:11] to implement a thing, it will probably

[59:12] give me the right code back. And

[59:14] obviously I'm like I'm simplifying it,

[59:16] but and then when you take the training

[59:19] set, it's just macro compression at the

[59:21] end of the day um with a little bit of

[59:23] random number generator in the mix and

[59:25] then weights that do wacky things. And

[59:28] so and I look at all these experiences

[59:30] I've had. So like with those being

[59:32] roughly truths because that's how how LM

[59:35] work and I look at these experiences

[59:36] I've had with like iterations of models

[59:38] which are iterations of weights, right?

[59:40] um and changes in the data sets. And I

[59:43] there's like these periods of time where

[59:44] like one one that I always use as an

[59:46] example here is no matter what cloud

[59:49] models would stick the any type all over

[59:51] your JavaScript to work past concerns.

[59:53] You could not work around it. The only

[59:54] way you can work around it and I did

[59:55] this is every single prompt you would

[59:58] put in like don't use the any type and

[1:00:00] then it probably would not use it. But

[1:00:02] if you didn't put it in that prompt in

[1:00:03] that steering prompt, it would probably

[1:00:05] then just do it again. Like you couldn't

[1:00:06] put it in agents MD or anything like

[1:00:07] this, right? Um, I could, you know, I

[1:00:09] had like a quad code hook that injected

[1:00:12] this thing in every single prompt. Um,

[1:00:15] and I think about I use this example a

[1:00:16] lot because I'm like that was an issue

[1:00:18] with the weights and the training set

[1:00:19] and the only way you could fix it cuz a

[1:00:22] hook was not really a fix. The only way

[1:00:24] you generally fixed it was by fixing the

[1:00:26] model. You had to train it. And so

[1:00:28] that's one version of it. But then you

[1:00:29] look at other things where

[1:00:32] you know you might look up docs but it

[1:00:33] doesn't always want to look up docs and

[1:00:34] it go to web search and stuff. It's

[1:00:36] going to use the lossy compression. is

[1:00:37] going to use the old version of the

[1:00:38] code. Sentry has this problem.

[1:00:41] Set up Sentry logging. Good luck. Good

[1:00:44] luck trying to set up actual logs versus

[1:00:46] our error reporting. The model just goes

[1:00:48] haywire all the time. How do you fix

[1:00:50] that? You fix it by changing the weights

[1:00:52] of the model or updating the training

[1:00:54] set. And so, so where I'm going with

[1:00:56] this is I think if the data is not in

[1:00:58] the training set um and tuned, which is

[1:01:01] a constant chicken and egg thing, it

[1:01:03] will never work that well. And maybe

[1:01:05] fine-tuning becomes an answer here. So,

[1:01:06] for example, if you had a programming

[1:01:07] language or a library that wasn't in

[1:01:09] that training set, it's just going to

[1:01:11] perform drastically worse. And maybe I'm

[1:01:15] wrong here. Every piece of evidence I

[1:01:17] have suggests that this is truth. And

[1:01:20] where I usually bring this conversation

[1:01:22] is I think training is part of the cost

[1:01:24] of inference and it's not factored in

[1:01:27] the cost of inference today. Thus, the

[1:01:28] cost of inference is dramatically higher

[1:01:31] than we are led to believe and it's

[1:01:33] already expensive. And so I usually talk

[1:01:35] about this in the context I'm like what

[1:01:36] happens when these companies go public?

[1:01:38] Are we all doomed because they have to

[1:01:39] pay the bills? Because I think training

[1:01:41] has to be a constant thing for them to

[1:01:44] be reliable or or I mean fine tuning can

[1:01:47] still be very expensive to be fair or

[1:01:49] fine tuning is going to be a solution to

[1:01:50] some of this. But that seems it I I

[1:01:54] don't know enough and there's not a lot

[1:01:55] of evidence or prior art in the industry

[1:01:56] that says like oh we'll have a a model

[1:01:59] that's fine tuned for Cotlin or you know

[1:02:00] something like this, right? Um and it

[1:02:03] just seems odd if if that's the solution

[1:02:05] I'm a little bit suspect.

[1:02:06] >> So we do that on a very very small scale

[1:02:09] where we um have like specially trained

[1:02:11] models for cotlin that are really just

[1:02:14] for offline code completion. So a very

[1:02:17] niche use case where you can like

[1:02:20] provide a small model that is like

[1:02:21] capable enough to provide a user

[1:02:23] experience that users might want while

[1:02:25] working on an airplane. That is

[1:02:26] literally the scenario.

[1:02:27] >> Yeah. And I think they're great for that

[1:02:29] for what it's worth. all these like sort

[1:02:30] of it's it's an optimization at that

[1:02:32] point. It's an efficiency thing you can

[1:02:34] do. Um but like a macro scale like

[1:02:37] especially you think about libraries. I

[1:02:39] mean that's never h you're not going to

[1:02:40] have a a model for react. It's just it's

[1:02:43] absurd. You know

[1:02:44] >> the only place where I could see that

[1:02:46] would be Google to push Angular or or

[1:02:48] like Flutter.

[1:02:49] >> Don't give them any ideas.

[1:02:51] >> You brought up um those public companies

[1:02:54] going public which is they both publish

[1:02:56] their S1 or whatever it's called. I'm

[1:02:58] not super into the weeds weeds of how

[1:02:59] these things. What do you think is going

[1:03:01] to change with that? Because I'm sitting

[1:03:03] here kind of like I'm wondering how this

[1:03:05] is going down.

[1:03:06] >> Well, if you're paying $200 a month for

[1:03:08] a plan and expecting to get 10,000 in

[1:03:10] compute, I mean, that that bubble's

[1:03:12] already burst except um I don't know,

[1:03:15] OpenAI seems to still be targeting this

[1:03:17] growth. My my theory, by the way, on all

[1:03:19] that is they need the training data.

[1:03:20] It's not actually a pure growth

[1:03:22] technique because they're spending

[1:03:23] billions of dollars in subsidies. It's

[1:03:25] like absurd, right? And so you already

[1:03:27] should get comfortable paying token

[1:03:29] prices despite popular belief because

[1:03:32] the the models are still highly

[1:03:34] problematic. They're not nearly as good

[1:03:35] as we'd like them to be. They're not

[1:03:38] going to get cheaper anytime soon unless

[1:03:39] there's a compute architecture

[1:03:41] breakthrough. That that'd be sort of my

[1:03:42] again I'm dumb enough to not know any

[1:03:44] better. This is my analysis. Um but

[1:03:46] because I'm I'm dumb enough I also just

[1:03:48] look at like the the signals you can

[1:03:50] visibly see versus I don't know

[1:03:53] pretending this thing is going to have

[1:03:54] some unknown curve or something. And so

[1:03:56] I just I have I have a hard time

[1:03:58] believing one that the subsidies don't

[1:04:00] continue to drop cuz the money's got to

[1:04:02] come from somewhere, right? And you

[1:04:03] can't raise unlimited money. And one

[1:04:06] going public is kind of that stage where

[1:04:09] you know the money has to start making

[1:04:12] sense is what I would say. Now this is

[1:04:14] this is this is an unheard of time. So

[1:04:17] it's possible that they're able to

[1:04:19] continue to raise funds publicly by

[1:04:20] issuing more some you know the

[1:04:22] shenanigans. Um, but at least

[1:04:24] classically speaking,

[1:04:26] you go public when you no longer need to

[1:04:28] fund raise, generally speaking, like one

[1:04:30] more big fund raise or something. Um,

[1:04:32] now I don't think that'll quite be true

[1:04:33] here, but either way, the costs right

[1:04:34] now to operate them are so much higher

[1:04:36] than the revenue. And again, you can

[1:04:38] claim that inference is cash flow

[1:04:41] positive, even if you're like [ __ ] 5%

[1:04:43] margins or something, but training

[1:04:46] isn't. And if you stop training today,

[1:04:48] your company is dead. like the frontier

[1:04:50] like you would not use any of their

[1:04:52] models if they stopped training. And so

[1:04:54] so when you look at that I'm like the

[1:04:56] only rational belief you can have

[1:04:59] because math is still math and money is

[1:05:00] is hypothetically finite is they have to

[1:05:03] get more expensive or or we do something

[1:05:07] else or we stop pretending they're going

[1:05:08] to solve all problems and we we focus on

[1:05:10] efficiency. But you already see this

[1:05:12] it's kind of like this play right now

[1:05:13] where like people were sort of

[1:05:14] optimizing um like the models they kind

[1:05:18] of plateaued quite a while ago um in

[1:05:21] terms of like sort of maximum

[1:05:23] capabilities if you will um from running

[1:05:25] them in loops um

[1:05:28] and and it feels like

[1:05:32] it either they're going to get wildly

[1:05:33] more expensive because they're going to

[1:05:35] continue to try to push the state of the

[1:05:36] art for inc like minor incremental gains

[1:05:38] or there's going to become a focus on

[1:05:40] efficiency plays and they'll still get

[1:05:41] more expensive until or unless that gets

[1:05:44] solved. Um, and I mean it could be both,

[1:05:47] but I I feel like the latter has to

[1:05:49] happen. And I think it can't be like,

[1:05:51] well, maybe we'll figure out how to do

[1:05:52] local models better because local

[1:05:53] models, they're not that functional to

[1:05:55] like if you could choose between a local

[1:05:57] model and cla or uh OpenAI models, you

[1:06:01] would not choose the local model in any

[1:06:04] like no matter what. Like if if they had

[1:06:06] the same trade-offs, you would not

[1:06:07] choose the local model. It just performs

[1:06:08] drastically worse. So, so I don't know.

[1:06:11] We'll see.

[1:06:12] >> And and we see this also where like

[1:06:14] people willingly buy in software because

[1:06:16] they don't want to maintain it, don't

[1:06:18] want to host it, etc., etc., etc. That

[1:06:19] is the whole thing again just that it's

[1:06:21] like 10x more complicated because no one

[1:06:23] understands how to host a local model

[1:06:25] properly. That conversation I I'm glad

[1:06:28] we're doing that kind of research

[1:06:29] because I think it's important. Uh, and

[1:06:31] there are also very valid scenarios

[1:06:33] where again like smaller use cases and

[1:06:35] stuff, but like this like oh yeah, I'm

[1:06:37] using uh or we can fully host Gwen and

[1:06:40] don't need Opus anymore.

[1:06:41] >> Yeah, I mean if if you're not really

[1:06:44] doing anything, sure, but I mean Opus

[1:06:46] barely works like Opus is still not good

[1:06:50] enough. And and I mean I haven't used

[1:06:52] Fable. It's going to be the same outcome

[1:06:53] though. It's still not good enough or

[1:06:55] it's too slow or something. I think a

[1:06:57] couple month it was a couple months ago

[1:06:59] where Sam Alman implied that the US

[1:07:02] government could bail out the uh depths

[1:07:05] of open AI. What are your thoughts on

[1:07:07] that?

[1:07:07] >> We're in um unheard of times in America

[1:07:09] with massive visible corruption and sell

[1:07:14] yeah probably they'd be like sure we'll

[1:07:16] take we'll take ownership in the company

[1:07:18] and give you infinite money or some

[1:07:19] garbage like that. And I I'm I don't

[1:07:22] care about these debates of like should

[1:07:24] things like this be public utility? I

[1:07:26] don't know. We have like a monopoly of

[1:07:29] like I don't everything's a trade-off,

[1:07:31] right? I believe in parts of capitalism

[1:07:33] that force the competition that force

[1:07:34] progress, right? Um and something like

[1:07:39] the government owning a thing usually

[1:07:41] does not create progress. Um and I think

[1:07:44] that's roughly universally true

[1:07:46] everywhere. But at the same time,

[1:07:48] sometimes it does create more fairness

[1:07:50] and there's always this balance between

[1:07:51] fairness and sort of equality if you

[1:07:54] will and

[1:07:56] sort of innovation. Um, and so I don't

[1:07:59] know I I don't think that would be a

[1:08:01] good thing though if anything like look

[1:08:03] at France and Mistl um and I don't know

[1:08:07] the company exists but

[1:08:09] >> as a German I I want Europe to succeed

[1:08:12] in this and be successful with it.

[1:08:15] Germany does a a lot of good research in

[1:08:16] that space. So I'm not [ __ ] on

[1:08:18] Germany here. But

[1:08:19] >> yeah,

[1:08:19] >> on the counter side though, China

[1:08:21] crushing it. Like they're doing a really

[1:08:23] good job. It doesn't matter how they're

[1:08:25] crushing it, whether they use our data

[1:08:26] or not. Everybody steals from everybody.

[1:08:28] It's not like, you know, my hands are

[1:08:30] cleaner than their hands kind of. So,

[1:08:32] but they they're roughly

[1:08:33] governmentowned, like if you abstract it

[1:08:35] far enough away, right? And so but they

[1:08:38] also have a very different uh political

[1:08:40] ecosystem where it's like government

[1:08:42] owned by the same government over a very

[1:08:45] long period of time. So

[1:08:48] which is not the US and definitely not I

[1:08:50] think all of Europe but

[1:08:52] >> you you brought up an interesting point

[1:08:53] though with um everyone steals from

[1:08:55] everyone. Do you think there is a how is

[1:08:59] it I mean like no one can tell me

[1:09:01] otherwise that there are a license

[1:09:02] violation in these training data. I no

[1:09:05] one can convince me that that is not do

[1:09:07] you think that will be something that is

[1:09:08] going to be looked at cared even like

[1:09:11] considered at some point or it's just uh

[1:09:13] one of those things that we start to

[1:09:15] accept. I think the ship has sailed. And

[1:09:17] to be fair, I can I I probably more side

[1:09:20] with the argument of like if you had to

[1:09:22] solve for that problem, these models

[1:09:23] couldn't exist.

[1:09:26] And I I think that that doesn't mean you

[1:09:28] can just do whatever and not care about

[1:09:30] IP. But I do think from um from the

[1:09:33] perspective of like they do need

[1:09:34] training data. So I'm like I'm sort of

[1:09:36] like yeah, forgiveness is warranted

[1:09:38] here. It's kind of messed up that they

[1:09:40] have infinite money and it's just

[1:09:41] enriching people off of that. Um and so

[1:09:44] there's no there's no no world where

[1:09:46] that's right. Um, but I do think there's

[1:09:48] still I don't know. I I think there will

[1:09:51] have to be some at least reconciliation

[1:09:53] for future future concerns. Um, I don't

[1:09:57] know. It's it's tough cuz it's really

[1:09:58] hard to license content in general. Um,

[1:10:02] and obviously you have some industries

[1:10:03] where it's much more pronounced like the

[1:10:05] media industry with film and and

[1:10:07] whatnot. But I mean, even for books,

[1:10:09] like if I go to Claude and be like,

[1:10:10] "Hey, uh, give me a detailed uh

[1:10:12] walkthrough of the thought process of

[1:10:14] book book XYZ, it could do that."

[1:10:17] >> Yeah, I think it's tough. I don't know

[1:10:18] what the I don't think there's a

[1:10:20] solution to the problem to be honest

[1:10:21] with you, other than preventing them

[1:10:22] from infringing on IP as much as

[1:10:25] possible, but training, I think you're

[1:10:29] you know, it is what it is kind of

[1:10:30] thing. You not saying it's like it's

[1:10:32] it's not morally right, but it is what

[1:10:34] it is. I have one last maybe somewhat

[1:10:37] provocative question. You initially I

[1:10:41] think you created the open source

[1:10:42] pledge. Is that fair statement? You're

[1:10:44] at least heavily involved.

[1:10:46] >> Yeah, it came from like like that's my

[1:10:49] department. So yeah. Yeah.

[1:10:50] >> So what you're doing there I think is

[1:10:52] how much of that is open source goodwill

[1:10:55] versus brand marketing?

[1:10:58] >> Uh it's both. Um, it is a thing we do

[1:11:01] because we believe it's a good thing to

[1:11:03] do and we justify it, which is mostly us

[1:11:07] just like handwaving, pretending that

[1:11:09] there's sort of brand awareness um that

[1:11:11] connects to our brand in there or

[1:11:13] anybody that participates. Practically

[1:11:15] speaking, like a lot of this it's like

[1:11:17] always questionable. Um,

[1:11:20] and I think in this case

[1:11:24] it's it's probably less true that there

[1:11:26] is brand awareness from open source

[1:11:28] pledge. Um, to be fair, we were already

[1:11:31] effectively doing it. We just wanted to

[1:11:32] codify it. And I'm like, what if we just

[1:11:33] go like social activism like peer

[1:11:36] pressure some other people in doing it?

[1:11:37] And I I wouldn't call it successful.

[1:11:40] Like there's a few million a year that

[1:11:42] are contributed open source that some of

[1:11:44] that wasn't there before. So I think

[1:11:45] that's good. It's not the It's not the

[1:11:47] win we wanted. We were trying to get to

[1:11:49] 100 million. Maybe one day it will. Who

[1:11:51] knows? Probably not to be honest with

[1:11:53] you. Um we're going to keep doing it.

[1:11:55] Like we're doing a million this year. Um

[1:11:58] and I don't know. So, so, so like no

[1:12:01] matter what, we'll keep doing it. Um and

[1:12:02] so I think from that angle, this is 100%

[1:12:05] just like no, we believe in doing this

[1:12:06] thing. It's it's good for the world. Um

[1:12:10] but you do try to rationalize why you do

[1:12:13] a thing. And we we we always reverse

[1:12:15] engineer the thing we want to do into a

[1:12:16] business case. And so in this we're

[1:12:18] like, "Yeah, yeah, it's it's some like

[1:12:19] brand marketing stuff, but like top

[1:12:21] down, we all believe in the thing."

[1:12:22] We're like, "No, this is fine. It

[1:12:23] doesn't cost us that much money." Um,

[1:12:25] which is honestly the only way you can

[1:12:27] do it either is if it's like top down at

[1:12:28] that scale. So

[1:12:29] >> coming to an end here, what would be one

[1:12:33] strong opinions about AI and development

[1:12:36] that you would go tooth and nail for

[1:12:38] with everyone? that it is useful and it

[1:12:41] also produces absolute garbage and

[1:12:42] there's no way today today as of June

[1:12:46] 2026 there's absolutely no way to

[1:12:48] produce good software which is prompting

[1:12:51] LLM um no matter what it's going to be

[1:12:54] you know bloated overengineered complex

[1:12:58] Java everywhere Java factory patterns

[1:13:00] non-stop you can't avoid it but it just

[1:13:02] it just produces junk um sometimes

[1:13:06] that's okay you know uh but it is

[1:13:08] certainly

[1:13:09] There's no uh putting the what they say

[1:13:11] putting the thing back in the closet or

[1:13:13] whatever whatever the sayings are like

[1:13:15] like it has happened. It is it is here

[1:13:17] to stay. It will get better. We'll solve

[1:13:19] some of the problems at the very least

[1:13:22] but it doesn't necessarily mean it's a

[1:13:23] magic bullet to solve all the problems

[1:13:24] either. So and which I think I don't

[1:13:27] know I would go to the nail on this. I

[1:13:28] think it's a reasonable statement but a

[1:13:29] lot of people would disagree. So so I

[1:13:31] think it's you know controversial

[1:13:33] enough.

[1:13:35] >> Do you think AI is a bubble? It's 100% a

[1:13:38] bubble. [laughter]

[1:13:40] There's a lot of bubbles. Like crypto I

[1:13:42] think is no longer a bubble, but might

[1:13:43] still be a bubble. Doesn't necessarily

[1:13:45] mean it pops though is the thing.

[1:13:47] >> That's true. That said, there's a lot of

[1:13:48] money in a lot of companies that there's

[1:13:50] no way the investors get a return on and

[1:13:54] it's unclear if there will be a like if

[1:13:56] if something happens say like OpenAI

[1:13:58] failed.

[1:14:00] I don't know what happens like that that

[1:14:03] would cascade um or anthropic failed

[1:14:06] that would cascade. There's some of

[1:14:07] these smaller ones that like people are

[1:14:09] not super overleveraged in, but there is

[1:14:11] a lot of money out there that should

[1:14:13] have been debt that is venture that is

[1:14:16] done on low to like basically oh I burn

[1:14:19] a lot of money because I'm burning on

[1:14:20] inference which is a pyramid scheme by

[1:14:22] the way just like a couple people make

[1:14:23] all the money. Um but it's like oh I I

[1:14:27] spend 10 million a month on inference

[1:14:28] for my you know $2 revenue product. Thus

[1:14:32] I need to raise $100 million. Oh,

[1:14:34] because of the way legacy stuff works,

[1:14:37] we should take like, you know, 20%

[1:14:39] ownership in the company, but they need

[1:14:41] to raise, you know, $100 million, so it

[1:14:43] has to be valued at this. We make up an

[1:14:44] arbitrary valuation, even though it's

[1:14:46] not grounded anything. It's just

[1:14:47] grounded in spend. And there's FOMO and

[1:14:50] competition. It's like, oh, we can't

[1:14:52] even get 20%. So, we'll give the absurd

[1:14:54] valuation. We'll give it slightly more

[1:14:56] and we'll take less because they still

[1:14:57] need the same amount of money. And so,

[1:14:59] it's like, oh, we'll get 5% and we'll

[1:15:00] give them a billion dollar valuation or

[1:15:02] something. And it's like what it it

[1:15:03] there's no math involved. There's no

[1:15:05] sanity involved. And that will work for

[1:15:08] some people, you know, obviously

[1:15:09] anthropic and open AI hypothetically

[1:15:11] high value, worth lots of money. Um,

[1:15:14] a lot of them like thinking machines. I

[1:15:17] don't know. That's there's a lot of

[1:15:18] money in that company that uh was done

[1:15:20] at very low valuations. And when you

[1:15:22] look at this, it's it's not how venture

[1:15:23] has ever been done before, at least in

[1:15:25] in my lifetime when I've been involved.

[1:15:28] And a lot of these should just be debt.

[1:15:30] Like if all you're doing is spending

[1:15:32] money, you should have to loan that

[1:15:33] money. You shouldn't just be like,

[1:15:34] "Well, I only had to give up 5% of my

[1:15:36] company even though I'll never generate

[1:15:37] revenue ever in my lifetime." It just

[1:15:40] it's so absurd to me. And it's more

[1:15:42] absurd because of the scale of the

[1:15:43] money. And so

[1:15:46] if something happens, it's because the

[1:15:48] financial mechanics make no sense of the

[1:15:50] industry right now. And so as an I I

[1:15:52] hypothetically am an active angel

[1:15:55] investor. I have like 100 plus

[1:15:56] investments. I have more or less

[1:15:59] attempted to stop investing entirely

[1:16:02] because it makes no financial sense

[1:16:04] anymore. Like I I cannot make a bunch of

[1:16:07] investments and possibly expect to be

[1:16:09] successful as an angel right now. Even

[1:16:11] though I actually have pretty good

[1:16:12] network access, which means I could have

[1:16:13] good deal flow. It just the the numbers

[1:16:16] don't add up to me. And so again, it's

[1:16:19] not my domain. I don't care about it. I

[1:16:20] don't spend my time doing it. But that's

[1:16:22] my my take on the system. It just it

[1:16:23] seems very unhealthy. It seems like the

[1:16:26] most unhealthy you're a lot closer to

[1:16:28] that than I am. So, I'm very curious to

[1:16:30] hear your perspective. Um, thank you.

[1:16:33] That was fantastic. I had a great time.

[1:16:35] Thank you so much for joining me.

[1:16:36] >> Yeah. Yeah. This was fun. Yeah. Thanks

[1:16:38] for having me out.