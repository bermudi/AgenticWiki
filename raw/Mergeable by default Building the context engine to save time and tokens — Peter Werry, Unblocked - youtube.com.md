---
title: "Mergeable by default: Building the context engine to save time and tokens — Peter Werry, Unblocked"
author: "AI Engineer"
source: "youtube.com"
url: "https://www.youtube.com/watch?v=5ID22ACI7IM&t=1477s"
date_saved: "2026-05-05T01:41:06.289Z"
---

# Mergeable by default: Building the context engine to save time and tokens — Peter Werry, Unblocked

[0:00] All

[0:14] right, thanks everyone. Sorry about the

[0:16] wait. Um, this is going to be a a bit of

[0:19] a strange session because um there is a

[0:22] workshop component to this. So, uh I

[0:24] guess everyone will be coding on their

[0:26] laps. Sorry. Um but anyways, sorry. I'm

[0:30] Peter and uh this is my colleague

[0:32] Brandon. Um so we're we're going to

[0:34] break this this session into two

[0:36] different parts. One is a um sort of a

[0:38] talk that I'm going to give about what

[0:40] context engines are are useful for and

[0:43] and how you might go about building one,

[0:44] what to think about. Um and then we'll

[0:47] we'll launch into the u the second part

[0:50] of it. So um just briefly

[0:53] um quick quick agenda. We're going to

[0:56] talk about three myths that are

[0:58] circulating uh right now about about

[1:00] context engines and then I'll go over a

[1:03] couple of less or a few lessons uh that

[1:05] we learned along the way building one of

[1:07] these things. Um and then finally we'll

[1:10] do this. So we're going to build a

[1:13] social engineering graph. Uh this is a

[1:16] component that is super useful in a

[1:19] context engine. And first just a show of

[1:22] hands. Does everyone know what I mean by

[1:23] context engine or does anyone want

[1:25] clarification on that?

[1:27] >> Okay. So uh in the world of AI agents

[1:32] uh you have agents that uh when you

[1:35] start off and you start coding they are

[1:37] basically at ground zero. They have no

[1:40] context about your code, your

[1:41] organization, nothing. Okay. So

[1:44] typically what happens is the first

[1:46] thing they do is they start to rip

[1:47] around your codebase uh based on the

[1:49] task that you give them to try to gain

[1:52] some understanding uh sort of background

[1:54] understanding before they start to do

[1:55] their task. So context engineering is is

[1:59] kind of the art of supplying uh all the

[2:02] context that you need and most

[2:04] importantly none of the context that you

[2:06] don't need in a highly optimized way so

[2:09] that when the agent starts to run it

[2:12] executes the task uh in a streamlined

[2:15] way that's in line with your

[2:17] organization's best practices and

[2:19] expectations and so on. Okay, so we'll

[2:22] get to this after.

[2:26] So, not long ago,

[2:29] as in like four years ago or less, uh

[2:32] you were the context engine. Okay? So,

[2:35] when when your agent needed something,

[2:37] um you would prompt it, you'd grab the

[2:40] the issue ticket, you'd hand it all of

[2:42] the information that it needed to start

[2:44] its task. And in many cases, even when

[2:47] it was ripping around getting background

[2:49] contexts, when it got to the end of its

[2:51] task, sometimes it it got it wrong. In

[2:53] fact, many times it did. and you'd have

[2:55] to kind of like reset it. Um, reguide it

[2:58] towards the solution that you were

[3:00] thinking of. Um, or if it completely

[3:02] missed the mark, you'd have to be like,

[3:03] "No, not the not the JavaScript dummy.

[3:06] It's the Python source code that I want

[3:08] you to look at." Um, so

[3:13] let's just remember how you built

[3:15] context in an organization. Uh, so we're

[3:18] taking AI out of the picture for it for

[3:20] for just a sec. And I just want you to

[3:22] pretend that pre- AAI uh you just joined

[3:25] an organization, let's remember how we

[3:28] built it up. So

[3:30] over time, you would accumulate this

[3:33] kind of context through experience,

[3:34] right? You would start a job, maybe

[3:36] start code splunking a little bit to

[3:38] figure out um uh how things work. You'd

[3:43] maybe latch on to a mentor. Um, and

[3:48] eventually you'd you'd experience real

[3:50] things like incidents and outages and

[3:52] things like that. Those are sort of the

[3:54] the pain things that stick with you.

[3:56] Those are the battle scars, right? And

[3:59] that is what constitutes organizational

[4:02] context. It's the um it's the learnings

[4:06] along the way, the why did we do things

[4:09] the way we did it.

[4:13] And now you're good at your job because

[4:15] uh after all of that experience of pain,

[4:19] now you know what questions to ask. You

[4:21] know where to look when an incident

[4:23] happens. And this is the goal. This is

[4:26] what we want to get for our AI agents.

[4:31] So um I'm going to just lift this

[4:34] adoption curve from Vimath. And uh I I

[4:38] may have butchered his last name, but

[4:39] sorry uh Vim if you see this. Um so

[4:44] let's let's start at the beginning here.

[4:46] This was like four years ago in 2022.

[4:49] Everyone everyone remembers fancy

[4:51] autocomplete, right? Um so back in those

[4:55] days context windows and AI were pretty

[4:58] limited. I'm not sure if everyone even

[5:00] remembers this, but it was like 8

[5:01] kilobytes or or 8k tokens I should say.

[5:04] And that's not a ton. And so tokens were

[5:08] highly optimized and um agentic idees

[5:11] like cursor focused just on the code

[5:14] that surrounded uh the code that you

[5:17] wanted to go in and autocomplete. So

[5:19] basically they took some code before

[5:21] they took some code after they put it

[5:22] into a model and they said this user is

[5:25] working on this piece of code what's the

[5:26] most likely next thing and that's what

[5:28] was printed out. Um it got progressively

[5:32] better than that. as were uh were

[5:35] integrated uh language servers and then

[5:37] it you you were able to basically pull

[5:39] like collers of source code and pull all

[5:42] that into context and then the LLMs were

[5:44] really good at at completing uh code. Um

[5:49] so

[5:50] at those levels you were the context

[5:53] engine and uh in in many in many

[5:56] circumstances here this is kind of where

[6:00] most people are here. They're at the uh

[6:03] uh parallel agents hooked up with MCP

[6:06] and skills. Okay. Just super curious,

[6:11] has anyone gone beyond curated context

[6:14] into the the last uh few degrees of of

[6:18] agentic freedom, shall we say, where you

[6:21] have background agents running in the

[6:23] cloud doing stuff in YOLO mode. Is

[6:26] anyone anyone experimenting with that?

[6:28] Okay, cool. That's that's very cool.

[6:30] That's bleeding edge. Um, but let's just

[6:33] take a moment to recognize that bleeding

[6:36] edge today is like yesterday's news in

[6:38] six months. Okay. So, the the puck I'm

[6:42] Canadian, so I'm going to say this, the

[6:43] puck is going down down the line towards

[6:46] background agents for sure. Um, and one

[6:50] of the things that we run into right now

[6:52] is this. Uh, we're becoming the

[6:54] bottleneck as humans, right? I'm not

[6:56] sure if if people have tried managing

[6:58] parallel agents and uh working on

[7:01] several tasks at once, but everyone's

[7:02] starting to feel this like cognitive

[7:04] disconnect because you're context

[7:06] switching all the time and it's just

[7:07] it's just really really painful. Um, it

[7:10] is very difficult to move from that mode

[7:13] where you're the human managing context

[7:16] into the background agents mode unless

[7:18] you have some kind of context engine

[7:21] that knows how your code operates, how

[7:23] your organization works and understands

[7:25] the motivations for historical changes

[7:27] and things like that.

[7:31] So, Andrew, Andre, he nailed it. Um,

[7:35] systems are intelligent. We're reaching

[7:37] the exponential on on intelligence for

[7:40] code pretty soon. Everyone's seen the

[7:42] the release about Mythos. Um even though

[7:45] we all haven't had a chance to really

[7:47] try it out yet. Uh the promise is that

[7:49] from a code intelligence perspective,

[7:51] this thing is like pretty much close to

[7:53] to perfect. Um but so now the bottleneck

[7:57] is context. Of course,

[8:00] without um without context, I'm just

[8:02] going to re-emphasize this point. you'll

[8:04] probably end up in doom loops. Does

[8:07] everyone know what a doom loop is? A

[8:09] doom loop is like when you're uh you're

[8:12] struggling with the agent. It's it's not

[8:14] quite doing what you want and you have

[8:15] to keep iterating on it. The worst case

[8:18] scenario is you run this thing in yolo

[8:20] mode and it finishes the entire task and

[8:22] it's completely wrong. You have to go

[8:24] back and correct, you know, various

[8:26] stages. Um so when you have a context

[8:29] engine, you can get there faster. The

[8:31] problem is that access doesn't equal

[8:35] understanding.

[8:36] So we have customers that are on various

[8:39] parts of I'm just going to go back to

[8:40] here. We have customers that are on

[8:42] various parts of this journey.

[8:44] Um and one of the one of the interesting

[8:47] things that we've noted is that uh

[8:49] people feel that you know they're

[8:51] they're they understand their

[8:53] organization best. So when it comes to

[8:56] feeding the right context to these

[8:58] agents, people will try to build some

[9:00] semblance of what a context engine

[9:02] actually is. They'll maybe build a rag

[9:05] system or they'll build some way to like

[9:07] feed organizational data to an agent. Um

[9:11] so unfortunately though, uh access

[9:13] doesn't mean understanding. So, what

[9:15] that means is you could just wire up a

[9:17] bunch of MCP servers. Um, and it's not

[9:21] going to be able to understand what the

[9:23] relationships are uh between all that

[9:26] data, how it was, how it got there, and

[9:29] how why it is the way it is. Um, and

[9:31] then there's another problem which I'll

[9:32] talk about a little bit later called

[9:35] satisfaction of search. So, just

[9:36] remember that term. I'll come back to

[9:37] it. Um, okay.

[9:43] So I just wanted to show you this. Um

[9:45] this was something that uh we actually

[9:48] implemented and we did it in in two

[9:51] parts. One was just without any context

[9:54] engine but wired up to a bunch of MCP

[9:56] servers. It did a pretty good job. Um

[9:58] but then when we reached the end um it

[10:02] it it missed the fact that we had some

[10:05] legacy stuff that depended on this old

[10:08] um method of um of intelligence size to

[10:12] to anthropics. So they have adaptive

[10:14] thinking now but it used to be you had

[10:16] to supply a a token budget and that's

[10:19] how like you could increase the size of

[10:21] the thinking window. Um, so we we had

[10:24] some code that kind of like depended on

[10:26] this and there were reasons for that um

[10:29] that the agent didn't understand or see

[10:31] and so it just basically clogged all

[10:33] that code. Um, but when we added the

[10:35] context engine then it saw all those

[10:37] reasons and implemented it the right

[10:40] way. So it made the appropriate changes

[10:41] in the right places, included backwards

[10:43] compatibility for the code that was

[10:44] using the old method.

[10:48] Okay, so now for the myths.

[10:51] Myth one, naive rag over my docs is a

[10:54] context engine. Um, so

[10:58] if you implement um say like vector

[11:01] search um or just a couple of search

[11:03] methods

[11:05] uh you're going to run into this you're

[11:06] going to run into a few issues. One is

[11:08] this satisfaction of search problem

[11:10] where uh the agent will search like

[11:12] crazy consume your tokens and then in

[11:14] the worst case you'll reach compaction.

[11:17] Okay. So, um without being able to find

[11:20] the the endgame,

[11:23] um there are a few different other

[11:25] techniques like you you need to have

[11:27] personalization when you build a

[11:29] retrieval system because if you just rag

[11:32] all your data, especially for very large

[11:34] organizations, there's going to be

[11:36] things like conflicts that you have to

[11:38] resolve in the data. Um it won't be

[11:40] focused on the task that you're trying

[11:42] to perform. it might pull in, you know,

[11:45] relevant code from other parts of your

[11:47] organization that especially if if you

[11:49] have a really big org and you've got

[11:51] tons of different repos. Um, it's it's

[11:53] just going to create a huge mess. So,

[11:55] you need to have some element of

[11:56] personalization.

[11:59] And then here again, connect a bunch of

[12:01] MCPs. I'm just going to reiterate this

[12:03] point. I'm done. Nope, definitely not.

[12:05] Um, so that that is the thing that that

[12:08] really um puts an emphasis on the

[12:10] satisfaction of search point. And I'll

[12:12] explain that in a sec.

[12:15] And finally, a bigger context window

[12:18] will solve this. Um, so way back, you

[12:22] know, when the models were starting to

[12:24] get big, people were really excited

[12:25] about a million tokens in your context

[12:28] window. Uh, the first models that tried

[12:30] this, I think it might have been Claude,

[12:32] actually. Was it Claude?

[12:33] >> I think it was

[12:36] >> or OpenAI. Okay. Okay. Gemini.

[12:37] >> Gemini. Yes. Sorry. I'm so sorry. Um, so

[12:40] yeah, Gemini first first model to try

[12:43] this and it was really good at finding

[12:44] needle in the hay stack. So you could

[12:46] feed like a huge document to it and as

[12:49] long as you you knew what you were

[12:51] looking for ahead of time, it could find

[12:53] it. Um, but it wasn't good at all at

[12:57] reasoning across different data sources,

[13:00] um, understanding the real meaning

[13:02] behind a problem and then recommending

[13:04] the appropriate solutions. So none of

[13:06] that was possible. Um, obviously things

[13:09] have things have gotten much better.

[13:11] Now, the problem is most organizations

[13:13] have more than a million tokens worth of

[13:15] context. So, trying to fit all that into

[13:18] the context window isn't going to work

[13:19] anyways. Let's project out to the future

[13:21] and imagine that you could fit like 10

[13:23] million tokens, 50 million tokens. Um,

[13:26] at the current uh rate of memory

[13:29] consumption um just to operate the

[13:31] models, that's not going to be possible

[13:32] for a really long time. even if it was

[13:35] and you fit all that context in your

[13:37] context window, you're still going to

[13:39] run into problems with understanding

[13:41] what's true, what's false, um how to

[13:45] select the right information. Okay, so

[13:47] now I'm going to come back to this

[13:49] second point here, satisfaction of

[13:51] search. This is a a term that actually

[13:55] comes out of uh the medical field in

[13:57] radiology. And the idea is that um when

[14:00] techs are looking at x-rays uh and

[14:03] they're looking for uh the cause of of

[14:05] of symptoms, they might find something

[14:08] on the x-ray that explains those

[14:10] symptoms and then they stop. Um and

[14:15] that's that's kind of like a dangerous

[14:16] thing medically because uh there might

[14:19] be other indicators for things like

[14:21] cancer that get missed. So, uh,

[14:24] satisfaction of search is a is a real

[14:25] problem in radiology and there's lots of

[14:27] protocols to prevent just stopping as

[14:30] soon as you find the first thing. Um,

[14:32] this is what happens with agents when

[14:35] they search around in say uh, notion and

[14:38] your code uh, confluence, they'll

[14:41] stumble across what looks like the the

[14:43] thing they're looking for and they'll

[14:45] stop and then they'll they'll proceed.

[14:47] But the the real like golden nuggets of

[14:49] information might be in a different

[14:51] place that the agent wouldn't think to

[14:52] look like in a in a past Slack

[14:55] conversation or in an incident report,

[14:57] something like that.

[15:00] So here's the the classic iceberg meme.

[15:03] Um

[15:05] code that compiles. That's like the

[15:06] baseline. Does the agent produce code

[15:09] that compiles? Um but everything that

[15:11] that is actually important is happens

[15:14] underneath here. So understanding the

[15:16] user's original intent um what was

[15:19] rejected in the past by the team and

[15:21] tried before but failed. Uh how are you

[15:24] going to surface that kind of content

[15:26] just by looking at docs and and code and

[15:28] stuff? Um so you need to understand that

[15:31] somehow.

[15:34] Um and even worse like it it's it's

[15:37] sometimes hard to know uh when things

[15:40] were deleted like in the absence of

[15:41] information. So you need history as well

[15:43] leading up to decisions.

[15:48] So this is why we think you need a

[15:51] context engine. Uh a context engine

[15:54] understands who you are, what team you

[15:57] work on, who you work with, who the

[16:00] experts are in your organization,

[16:03] um and and what the decisions were that

[16:05] led up to the current iteration of your

[16:08] codebase. it's able to resolve

[16:11] conflicts. Uh so this is like a truth

[16:13] and false type situation. What's true,

[16:15] what's not. Um sometimes that truthiness

[16:19] is a gray area, right? So the context

[16:21] engine needs to also understand when to

[16:24] instruct the agent um that it wasn't

[16:27] able to resolve a conflict and then uh

[16:30] learn from additional user input.

[16:34] Um this third point is super important

[16:36] of course in any large organization or

[16:38] enterprise. Um there's often you know

[16:41] repositories that not everybody can

[16:43] access secret projects that sort of

[16:45] thing. So uh it's really important that

[16:47] you flow the access controls up. We have

[16:50] I'll give you an example that everyone

[16:52] will appreciate which is Slack. Um our

[16:55] contact engine integrates with Slack or

[16:58] Microsoft Teams. Um, and when you have

[17:01] uh private channels that that's really

[17:03] highly sensitive, right? Like you could

[17:05] be discussing HR information or uh maybe

[17:08] something that you just really don't

[17:09] want um everyone else to see. And so

[17:13] when when unblocked answers questions,

[17:16] uh it will use private channel

[17:17] information, but it won't it it will

[17:19] only use that information if the person

[17:21] that's asking the question has access to

[17:23] it. And then those answers are not

[17:25] public. Okay? So they're they're private

[17:28] to you.

[17:30] Um, and then finally, of course,

[17:33] delivering the right contest at the

[17:34] right time. And this is about token

[17:36] efficiency. It's about getting to the

[17:38] answer as quickly as possible.

[17:41] So, here's a kind of a highlevel

[17:43] overview of how how a context engine

[17:46] might work. Um, on the left we've got

[17:48] data source inputs. So, things like

[17:51] planning tools, docs, conversations,

[17:52] code, PRs, basically like anything

[17:54] that's relevant to getting work done at

[17:57] the engineering level. Um and then on

[18:00] the right side we have the outputs. So

[18:02] you know th this all can flow to coding

[18:05] agents CP or CLI tools. Um you can

[18:10] custom build apps through the API. We've

[18:12] got a we have a code review uh component

[18:15] that just plugs right into your SCM and

[18:17] provides code reviews and of course uh

[18:19] integrations with social messaging apps.

[18:24] So the these are the kind of like broad

[18:27] six requirements that we think are

[18:29] important. There's actually much more

[18:31] than this but these are the highle

[18:32] things. So again unified system contexts

[18:37] um this is about

[18:39] building relationships between data.

[18:41] Okay. But it's more than just um

[18:45] recognizing when uh one piece of data is

[18:49] related to another. Like for example, in

[18:51] in Slack, you might have conversations

[18:52] about PRs. That's an easy linkage

[18:55] because posting links back and forth. So

[18:58] that's easy. Um what's less easy is

[19:00] understanding uh the reason why

[19:02] decisions were made or your

[19:05] organization's best practices, right? So

[19:08] to understand that you have to go a

[19:10] little deeper. um do do things like

[19:12] distill um historical poll request

[19:16] comments on PRs and uh try to distill

[19:20] those down to the their core essence and

[19:22] then when you see repeated patterns uh

[19:25] you can pull those patterns together and

[19:27] store them as you know quote unquote

[19:29] memories so that when uh someone is

[19:32] working on a similar piece of code you

[19:34] can load those memories and then the

[19:36] agent can see that and go oh yeah right

[19:38] uh this is the way this organization

[19:40] does this particular thing.

[19:43] Um, conflict resolution super important.

[19:47] Um, we took a initially kind of a naive

[19:51] approach to this at first and based it

[19:54] just on recency, right? So, we we would

[19:56] bias towards newer stuff. Uh,

[19:59] unfortunately, when you have in the

[20:02] fullness of all your context, recency is

[20:04] not enough. Um, often you have people

[20:08] um, writing documents or chatting in in

[20:12] in their messaging platforms and they

[20:15] might be saying things that are not like

[20:18] completely aligned with uh, how the the

[20:20] system works. Um, uh, so you know then

[20:24] we started to bias towards code. So, we

[20:26] had recency and we're like the main

[20:28] branch is definitely your source of

[20:30] truth, but not always because sometimes

[20:34] um what's important is what happens

[20:36] next, not the way a system currently

[20:38] works. Like when when you're working on

[20:40] a task um what you really want is for

[20:44] the agent to understand where you're

[20:46] going, not necessarily where you've

[20:48] been. Where you've been helps it

[20:51] understand what not to do. where you're

[20:53] going helps it understand what you

[20:55] should do. Okay. So, in in the Slack

[20:58] case, looking at the conversations that

[21:00] your organization's experts are having

[21:03] is more important than just

[21:05] understanding what you know, every

[21:07] random engineer is talking about.

[21:10] Um, targeted retrieval and personal

[21:13] relevance are very related. So, I'll

[21:15] just talk about them uh together

[21:17] briefly. So, um, again, like when you're

[21:23] pulling context in, it's important that,

[21:25] uh, you're only pulling context in for

[21:27] the relevant task at hand and probably

[21:30] relevant to you. So, here's a technique

[21:32] that's kind of interesting. um you can

[21:34] understand what repos a person works on

[21:37] most by the number of PRs they submit

[21:40] contributions and then if you do a if

[21:43] you're doing vector retrieval you can do

[21:45] a uh deep retrieval on those focused

[21:48] repositories and then a wider retrieval

[21:51] on you know the rest of the source code

[21:53] and then sort of bias the the selection

[21:56] towards uh the focused repositories

[21:58] because that's more likely where

[21:59] someone's going to be working and

[22:01] spending their

[22:03] Um, and then you know, we've talked

[22:06] about data governance, so I don't think

[22:07] I need to go over that again. Super

[22:09] important though.

[22:13] This was just a a little experiment that

[22:16] we ran uh with a larger task. Um, I'm I

[22:20] fully admit that some of these numbers

[22:21] are a bit wonky. This is basically like

[22:23] Claude outputting numbers. So, don't

[22:25] don't trust it. Just trust the the vibe

[22:28] of the thing and not necessarily the

[22:29] numbers. Um, basically what it's saying

[22:32] is that when we started out uh without

[22:35] the MCP server act or sorry without the

[22:38] context engine active um it it really

[22:40] missed the mark on a lot of stuff. Uh

[22:43] and that's just because it didn't

[22:44] understand how um the existing

[22:47] implementation really worked and why it

[22:49] was the way it was, what was tried

[22:51] before and failed. Um and so it made a

[22:54] lot of those same mistakes. uh with a

[22:56] context engine turned turned on

[22:58] obviously it it um it nailed it. The the

[23:01] key numbers though are the the time and

[23:03] the tokens that it took. So without um

[23:08] the context engine took two and a half

[23:09] hours to finish this task with 21

[23:12] million tokens which is a lot of tokens.

[23:15] Um but with the context engine it took

[23:17] only 25 minutes and 10 million tokens.

[23:20] So it's it's a pretty dramatic

[23:22] difference.

[23:23] Um okay so the hard lessons these are

[23:26] just samples by the way but the these

[23:29] are ones that we thought were kind of

[23:30] interesting. So first of all uh

[23:33] initially we optimized for access not

[23:36] understanding. So we our our first

[23:38] premise was if we just wire up a bunch

[23:39] of tools

[23:41] um and provide a a knowledge graph it

[23:44] will be able to traverse the knowledge

[23:46] graph and uh execute a bunch of

[23:49] retrieval specific tools for particular

[23:51] integrations and so on and figure

[23:54] everything out. Um that does not work.

[23:57] So uh you'll have to go a little bit

[24:00] deeper than that.

[24:04] Uh second one is we hid conflicts

[24:06] instead of surfacing them. So um by con

[24:09] by hiding conflicts I don't mean that we

[24:11] just ignored the conflicts. What we did

[24:14] instead was we tried to resolve those

[24:17] conflicts using those naive strategies

[24:20] and we didn't surface the conflicts that

[24:23] we weren't able to resolve. So this was

[24:25] a really good learning is that um a

[24:28] context engine I mean we'll get there

[24:30] eventually probably but uh it can't

[24:32] always tell uh what the truth elements

[24:35] are and when it can't you should surface

[24:37] that and learn from it. That's the key

[24:39] thing.

[24:42] And then finally I think a lot of folks

[24:45] tried this. This is a really bad idea.

[24:48] So when when a context engine supplies

[24:50] an answer um do not cache the answer and

[24:54] try to serve that same answer up again

[24:56] uh to a similar question. The reason is

[24:58] obvious is is fairly obvious in

[24:59] retrospect but um everything changes

[25:02] constantly right code changes docs

[25:05] change the reason for things change. So

[25:07] this just doesn't work. Um the other

[25:10] thing is if you try to uh use the the

[25:15] previous answers as context for new

[25:17] answers, you regress towards a mean. So

[25:20] if the model is like misbehaving or

[25:22] doing something bad and you continuously

[25:25] bring that into context, you're

[25:26] obviously going to pollute uh the

[25:28] context.

[25:32] And this is what happens.

[25:36] Okay. So let's now talk about where AI

[25:39] forward teams like like those that are

[25:41] doing this like cloud-based agent thing

[25:43] are are using and taking advantage of

[25:45] context engines.

[25:47] Um definitely and especially during the

[25:49] planning phase. Okay, this is where you

[25:52] get the biggest bang for buck

[25:54] unquestionably. Um get the context

[25:57] engine involved, use a skill to bring it

[26:00] in. Um connect it to the MCP server and

[26:03] and watch it do its thing. it. This is

[26:05] where you get the biggest bang for buck.

[26:07] It's also useful to do this during

[26:09] review. So you get planning and review

[26:11] at the end. Um because you know if if

[26:14] you get an agent to do review, it's

[26:17] basically just going to pay attention to

[26:19] the code and try to understand where the

[26:21] break points are um security concerns,

[26:24] that kind of thing. But without the

[26:26] organizational context, it doesn't

[26:28] understand the motivation for it. So

[26:29] that's the really important thing.

[26:32] Pick enrichment. Um, this is a a super

[26:35] cool use case. So, you create a ticket

[26:38] for a new feature and then you just ask

[26:40] the agent that's connected to a context

[26:42] engine to fill in the blanks. Works.

[26:47] Triage. Uh, I use this all the time.

[26:49] When I see an issue in production, I

[26:51] just whack it into an agent connect to

[26:53] the context engine and it just like

[26:55] instantly brings up all the past issues

[26:58] related to this and um, starts operating

[27:01] right away.

[27:04] Increasingly we're seeing this one

[27:05] incident management. Okay. So we we just

[27:08] uh wired up data dog and this sorry

[27:13] >> sentry and data dog sorry. Um and this

[27:16] is already proving like super cool use

[27:18] case. It uh it can see the signals and

[27:23] then it can act on all the signals and

[27:25] relate that to code uh relate it to past

[27:28] incidents that you and discussions that

[27:30] you've had in Slack. Having all those

[27:32] things come together at once is is

[27:34] almost like magical. And finally, I

[27:36] think this one's actually my favorite

[27:37] one and it's the one that customers use

[27:40] the most is uh customer success and

[27:42] sales and engineering support. So what

[27:46] what a lot of big teams do is they have

[27:48] engineering support channels where other

[27:50] teams can come in and ask questions. If

[27:52] you put a context engine into one of

[27:54] these things, you can have it

[27:56] automatically answer a lot of questions

[27:58] and save engineers a ton of time.

[28:02] All right. So, how teams make a context

[28:05] engine their own skills. So, definitely

[28:08] build uh skills that you can use to

[28:11] curate context in a GitHub repo.

[28:14] Um and you can build other skills around

[28:16] it like typing ticket enrich give it the

[28:20] issue ID and then it it can use the

[28:23] context engine to build the enrichment.

[28:28] uh workflows like this one prepare

[28:29] prepare an incident timeline um and then

[28:32] you can just send it off to your agent

[28:34] again context engine blah blah blah

[28:35] brings everything together magical

[28:39] and this thing here um you can wire this

[28:42] up to all kinds of agents I've got um uh

[28:45] one one of the things that a lot of

[28:47] customers like to do is wire this up to

[28:49] claude code in their CI system um we

[28:52] actually do have a code review component

[28:54] so you don't have to do this if you're

[28:55] using unblocked Um, but people use this

[28:59] for other things, not just code review.

[29:00] As soon as you wire up a context engine

[29:02] in the background, give it an API key,

[29:05] let it let it run on its own, it it can

[29:07] do some pretty insane stuff. Um, so I'm

[29:10] just going to show a quick

[29:12] um

[29:15] example of what wiring up a context

[29:18] engine can do. So this is a PR that uh

[29:21] my colleague wrote and uh it it

[29:25] unblocked like went through and provided

[29:27] a a kind of review to this thing and at

[29:30] the bottom of this review here's the

[29:32] review part. Um you can see that Richie

[29:36] who was the author of this PR was like

[29:38] very cool this is something I would say.

[29:40] Uh now the reason for the comment which

[29:42] was you've basically duplicated a bunch

[29:44] of tests you can you can kind of dry

[29:46] that up a little bit is because um this

[29:50] was a best practice that was distilled

[29:52] from a bunch of other PRs and the the

[29:55] funny part is that the author of those

[29:57] PRs was Richie. So he's the one that

[30:00] actually instilled the best practice in

[30:02] the organization. Uh so that was that

[30:05] was just a cool little moment when we

[30:06] discovered that. Um, here's another

[30:09] example. So, this was a it's a fairly

[30:11] long transcript. I'm not going to like

[30:13] show the whole thing, but we we sent it

[30:15] on a on a mission to do a big large

[30:18] task. Without uh unblocked, it it uh

[30:21] took quite a while. Like you can see

[30:23] transcripts quite long. Um, and it it

[30:26] missed a whole bunch of stuff. With

[30:29] unblocked, uh, it was a lot more

[30:31] compact. It it got to the answer like

[30:34] very quickly and correctly. And just

[30:36] because we're now AI forward and lazy,

[30:40] um, we took both of those transcripts

[30:42] and ran them into Claude and just said,

[30:44] "Hey, Claude, why don't you just do a an

[30:46] analysis of both these things and give

[30:48] us your give us your result." Um, so it

[30:50] it went through I won't, you know, bore

[30:53] you with the details, but just to say

[30:55] that at the end, the verdict is that uh

[30:57] the context engine plan is is what I'd

[31:00] ship with. This other one is good for a

[31:03] prototype, but it's missing a whole

[31:04] bunch of stuff that is important to this

[31:06] organization. It was previously

[31:08] discussed. Okay,

[31:14] so this is essentially what what I've

[31:18] been trying to say. Uh AI generated code

[31:21] should just feel like it was written by

[31:22] someone that's been in your team for

[31:24] like 20 years. Okay. Um it doesn't if it

[31:28] doesn't yet, that's fine. Um it will um

[31:33] you're if you wire up unblocked you'll

[31:35] you'll see like a a huge difference in

[31:37] performance of agents and if you're

[31:39] building one of these things absolutely

[31:41] like take all these things and and build

[31:43] and and let's see where that goes.

[31:47] So just before we get into the workshop

[31:49] component um maybe we'll just have like

[31:52] five 10 minutes of Q&A.

[31:57] >> I'm Brandon

[31:58] >> and this is Brandon. So he'll he'll help

[31:59] with

[32:00] >> this.

[32:06] >> Thanks. Um, so it's clear what it does

[32:08] for you and what kind of problems it

[32:10] solves? But to me, a big question mark

[32:12] is what is the thing? What is the

[32:14] artifact that that fits the bill? Is it

[32:18] like a program you install, an API

[32:20] that's hosted remotely, or an MCP

[32:23] server? What is it?

[32:25] >> It's it's all of those things. So, a a

[32:27] context engine, I'll explain what

[32:29] unblocked is. Maybe I can just show a

[32:31] quick demo of it. Um, so broadly

[32:34] speaking, there's a bunch of different

[32:36] surfaces to a context engine. You want

[32:39] to get it into your agent flow, and you

[32:41] can do that with an MCP server. You can

[32:43] do that with a CLI tool, for example.

[32:47] Um, we also have this dashboard surface

[32:50] where you can ask questions about your

[32:52] code. Um, this is a pretty basic one,

[32:54] but you can see it understands who I am

[32:56] and what I've been working on. Um, and

[32:59] then, uh, we have a Slack, we have Slack

[33:02] connectivity as well. So, you can bring

[33:04] unblocked into Slack. Um, drive it in

[33:07] conversations and have it auto answer

[33:09] things. Does that make sense? Did I

[33:11] answer your question or

[33:18] >> Okay.

[33:19] >> Yes. API, CLI, MC.

[33:21] >> Yeah.

[33:24] Yeah,

[33:26] >> sorry.

[33:29] >> Thank you. Um, so my question is, so as

[33:33] far as I understand is like a knowledge

[33:35] management and retrieval um application.

[33:39] >> Yeah. And does this relate somehow to

[33:42] things like um LLM wiki like it was made

[33:46] popular recently by Andre Karpati or the

[33:50] decision traces and context graphs

[33:53] >> which was discussed a lot a few months

[33:56] ago.

[33:56] >> Yeah. So you can think of all of those

[33:58] things as kind of uh useful components

[34:02] to a context engine. A context engine

[34:05] has to do much more than that because um

[34:07] so agents are really good at recursing

[34:09] through a wiki for example. Depends on

[34:12] how you build this wiki because there's

[34:13] a bunch of things like organizational

[34:15] memories, best practices, you know,

[34:18] experts in your organization and that

[34:20] are used as pivot points for context

[34:23] retrieval. So a a wiki doesn't solve

[34:26] those problems unless it has like a you

[34:28] know you could build a structure with

[34:30] it. And I think uh Carpathy discovered

[34:33] that if you treat a wiki as um kind of

[34:37] like a file system, you can break it

[34:38] down and have the agent uh whack through

[34:41] it like a file system. They're by the

[34:43] way, agents are like highly optimized

[34:45] for file system traversal.

[34:47] >> Yeah. The compilation step. Exactly.

[34:50] >> Yeah. Yeah, sorry.

[34:54] Sorry, maybe the same question, but is

[34:56] it is it a general purpose context

[34:59] engine or is it targeted against uh code

[35:02] because will it be useful as a say uh as

[35:06] a business domain expert uh or sort of

[35:10] building up a business domain and then

[35:12] having this context engine use my so I

[35:15] could all my other I agents could use

[35:18] this as context for the business. uh or

[35:21] would you say that is more like just for

[35:23] the code part of it?

[35:24] >> Uh so it it's definitely engineering

[35:27] focused the the integrations are focused

[35:29] on engineering activities. So you know

[35:32] SCM integrations and other other tools

[35:35] that engineers use um we are

[35:39] increasingly seeing customers using it

[35:41] for other purposes. So business

[35:43] intelligence is a key thing. Uh and

[35:46] that's usually useful when uh people in

[35:49] in business functions are trying to get

[35:51] an understanding of the product and its

[35:53] function. Um we don't have uh like say

[35:57] Salesforce integrations wired up for

[35:59] that. So you couldn't use it to

[36:02] understand um you know any anything

[36:05] that's salesreated. It's it's really

[36:07] primarily an engineering focused context

[36:09] engine. That's not to say that that

[36:10] won't change.

[36:17] Yeah,

[36:19] >> on the governance thing, if you're

[36:21] >> um respecting access rights, how can it

[36:24] do sort of synthesis across stuff and

[36:27] then develop new knowledge inter

[36:30] internally that it could then surface to

[36:32] people?

[36:33] >> So that yes, you're correct to point

[36:34] that out. The the synthesis um is

[36:37] compartmentalized.

[36:39] So there are, you know, places that are

[36:41] compartmentalized like individual

[36:43] repositories. That's kind of the level

[36:45] of access. So if you can synthesize uh

[36:48] historical data based off of that um and

[36:51] then correlate that with public Slack

[36:54] information, then that's that's one way

[36:56] to do synthesis without crossing the the

[36:58] organizational boundaries. Um so

[37:03] uh the you know the other way is to look

[37:05] at and tag when um synthesized

[37:10] information crosses those organizational

[37:12] boundaries and you can take something

[37:14] like a group ID approach to that problem

[37:17] where you attach group ID tags to the

[37:20] synthesized information and then only

[37:22] retrieve it if the person that uh has

[37:25] access to that can can build it out. So

[37:28] first take the compartmentalized

[37:29] approach because that's the where you'll

[37:31] get the the most mileage and then you

[37:33] kind of build up from there. I mean this

[37:35] is the core problem with using a

[37:37] technology like graph rag right because

[37:40] graph rag is like a pyramid where it

[37:43] builds up in layers and then basically

[37:45] summarizes each layer but that like

[37:48] unavoidably crosses uh permissions

[37:50] boundaries. So you have to be you have

[37:52] to create compartmentalized pockets.

[37:55] Yeah.

[37:58] It's a good question.

[38:03] >> Yeah.

[38:04] >> Yes. You've talked a lot about like all

[38:07] the different sources of information

[38:08] that you consume and putting them all

[38:10] together. When it's like synthesizing

[38:12] those down, is that still sort of like

[38:15] naive rag, vector search, all that stuff

[38:17] under the hood? Or is it like agents

[38:19] deciding what is appropriate? like what

[38:21] what or probably like combinations of

[38:23] all of them, but what is that sort of

[38:25] step?

[38:26] >> Um yeah, you're right. It is a

[38:28] combination of all of them. So knowledge

[38:30] graph like knowledge graph buildup

[38:32] happens in a bunch of different ways.

[38:34] >> Um the the PR thing that I showed you

[38:36] for example is like a first you build a

[38:40] a naive knowledge graph procedurally and

[38:42] then from there you can use an LLM to

[38:44] distill down and summarize and build up

[38:46] um those types of techniques. Um our

[38:51] context engine builds first like a

[38:54] knowledge graph from the base uh using

[38:57] trying to leverage like all the

[38:58] different entities. It's kind of like a

[38:59] page rank thing where it builds up the

[39:02] relationships procedurally and then of

[39:04] course it vectorizes data. Um and then

[39:07] there are procedural tools that fetch

[39:10] data at runtime. Um a lot of the

[39:13] distillation for uh you know conflict

[39:16] resolution happens in two places. So one

[39:19] is like during data ingestion time

[39:22] there's there are tags that relate data

[39:25] to each other so that we can see if we

[39:26] can deconlict at that level and then

[39:28] like rank against each other at that

[39:30] level and then of course at runtime you

[39:32] have to pass the things to a judge with

[39:35] the criteria um and then it does

[39:38] additional deconliction in real time.

[39:41] >> Does that make sense?

[39:42] >> Yeah.

[39:42] >> Okay.

[39:43] >> One more question. So uh I was curious

[39:46] you said conflicts but at some point you

[39:48] get conflicts that something means

[39:49] revenue for one company and means

[39:51] revenue for another company isn't a

[39:52] totally different meaning how you can

[39:55] recognize that so how do you get humans

[39:58] in the loop how how do you use their

[39:59] ontologies and how can you do you use it

[40:03] when you run into it so I'm very curious

[40:05] about that actually how how

[40:07] >> yeah so if you I can show you just a

[40:09] quick thing here so um you'll notice

[40:11] that at the bottom the the references

[40:13] that were used for answers are delivered

[40:16] both like to the human in this interface

[40:18] but also to the agent. So um if the

[40:22] agent if the context engine isn't able

[40:25] to do the deconliction then at this

[40:27] point here the human can step in and

[40:30] guide the agent when there are enough s

[40:35] >> so you can you can literally just reply

[40:36] and say like that's not correct or you

[40:38] can come here

[40:40] >> and

[40:41] >> oh yeah sorry

[40:42] >> yeah or you can you can do this like not

[40:45] helpful and and give the reason why um

[40:47] like it is a bit of a manual process at

[40:50] this stage, but the signals that build

[40:52] up over time,

[40:54] >> it's funny, right?

[40:56] You might have catch a lot of human

[40:59] intelligence by this, right?

[41:00] >> Yeah, that's amazing.

[41:03] >> Yeah, for a typical customer, how much

[41:06] do you have that metric?

[41:08] >> Oh, it's huge. It's it's it's amazing.

[41:10] Like I I was actually really surprised

[41:12] by how willing people are to give

[41:15] feedback. Um, yeah. No, it's

[41:17] >> can you

[41:20] thousands or hundreds

[41:22] of

[41:25] >> I mean at at small team size it's you

[41:28] know in the hundreds at so small team

[41:30] size being like 20 30 people at large

[41:33] team size 100 to 200 people it's like

[41:36] hundreds and hundreds of

[41:37] >> oh wow

[41:38] >> of feedback. Yeah

[41:40] >> people just really like to interact with

[41:42] agents and tell them in natural language

[41:44] what's wrong. It's It's just a totally

[41:46] natural thing to do.

[41:48] >> Yeah.

[41:51] >> Cool. All right. Um are we are we good

[41:55] for Q&A

[41:57] >> and then we can get on

[41:57] >> ask questions as we hack. But

[41:59] >> yeah, let's let's get on to the let's

[42:01] get on to the workshop part of this. So

[42:03] um we have created a um for actually

[42:07] what I'll do is I'll just do this first.

[42:10] So you can do this now if you'd like. Um

[42:13] I will come back to this slide in a sec.

[42:15] So the idea here is we're going to get

[42:17] everyone to join a Slack workspace that

[42:19] we created and then we're going to get

[42:22] uh everyone into a repo where this um

[42:25] where this sample code lives and then

[42:27] we'll just start hacking away on it

[42:28] together. Okay.

[42:37] >> Yeah.

[42:50] I got some people coming.

[42:52] >> Nice.

[42:52] >> When you drop in, you'll see an AI

[42:54] engineering London channel. Hopefully

[42:58] there's a link to

[43:02] this drop

[43:06] and

[43:07] >> the unblocked link will not work until

[43:09] you do step two. Yes.

[43:11] >> To get into the GitHub or

[43:17] >> Oh, no.

[43:18] >> I've got I've got many people coming in.

[43:20] So, I'm really hopeful that

[43:22] >> is it network? Yeah.

[43:25] >> We will find out.

[43:26] >> Um, okay. While while folks are doing

[43:27] that, I'm just going to show you what

[43:29] we're getting into here. So, this is the

[43:32] uh GitHub organization. Um, what we're

[43:34] what we're working on is a social graph

[43:36] builder. So, what this is going to do is

[43:40] look at a source code repository. So,

[43:42] you can run this on your own repo. It's

[43:44] not going to upload anything. It's all

[43:46] local. Um, so that you can see this

[43:48] thing building up against your own

[43:50] organization.

[43:52] Um, and it's going to do a bunch of

[43:55] things. We're going to get basically a

[43:57] social graph out of it, and I'll show

[43:58] you what that looks like. And we're

[44:00] going to understand who the experts are

[44:02] and which parts of the code they work

[44:04] on. Um, and then there's going to be a

[44:06] little like interactive visualization

[44:08] thing. So, what what the goal of this

[44:10] exercise is is to get this thing up and

[44:12] running and start just start hacking

[44:14] away on it. So, like start submitting

[44:15] PRs as soon as uh we get this going. Um,

[44:22] so this is what it looks like.

[44:25] This graph here is our organization

[44:27] unblocked. And uh what you're seeing

[44:30] here is a a relationship graph that

[44:32] shows who's reviewing whose PRs um and

[44:36] who's who's getting reviewed.

[44:37] Essentially

[44:40] the uh this thing is

[44:44] a distillation of all the different

[44:46] teams within on blocks. So this is

[44:48] roughly accurate actually. Well, not

[44:50] roughly, it is pretty accurate. Um,

[44:53] we've got I I did this all the way back

[44:55] to the start of 25, 2025. When you run

[44:58] the thing, I'd recommend maybe doing it

[45:00] for a shorter timeline because it will

[45:02] be a little bit slow uh if you go all

[45:05] the way back to 25. Could take like 15

[45:07] minutes. Um, but it's effectively

[45:10] distilled who the teams are and um you

[45:14] the only AI step in this is to label the

[45:17] teams. You don't have to run the AI step

[45:19] if you don't want to. it'll just use the

[45:21] the parts of the code that people work

[45:22] on the most. Um, this tab here will show

[45:27] the experts in the organization and what

[45:29] they work on. So, this is just broken

[45:31] down by uh project area and path um and

[45:35] shows like what areas of the code have

[45:38] good coverage. coverage is defined

[45:40] mostly by whether a a high contributing

[45:43] organizational expert is present and

[45:46] whether uh it's it's an actively

[45:48] contributed to part of the code.

[45:50] And then finally uh we'll have this

[45:52] interactive graph that um breaks things

[45:55] down by team area and we'll show like

[45:59] you know who the major contributors are.

[46:01] I'm over here on the AI team. Um yeah,

[46:07] so that's it. Let's get everybody in and

[46:09] we'll start hacking away at this.

[46:13] >> Yes, absolutely.

[46:15] >> Yeah,

[46:17] >> many of you should have an invite who

[46:19] have put your GitHub already in. So,

[46:21] please give it a check. GitHub is the

[46:24] worst.

[46:26] >> Yeah,

[46:27] >> we will. It is an MIT license. We will

[46:29] be making it public later, but for now,

[46:31] we needed it locked down.

[46:35] Oh, did you still

[47:21] I'll show you.

[47:24] >> What have you done?

[47:39] I also slight.

[47:54] So, I think the the rest of this session

[47:56] is going to be now just like hacking

[47:58] away. So, um in a sec here, I think I'll

[48:01] I'll take this this down if everyone's

[48:04] got it. Um so, so that Brian and I can

[48:06] concentrate on working with you guys to

[48:08] build features.

[48:24] Oh, when you submit PRs, by the way,

[48:26] you'll notice that unblocked is sitting

[48:28] there as a code reviewer. So, don't

[48:29] don't feel badly if it uh sprays on your

[48:33] PR a little bit.

[48:36] >> Depends on how much

[49:10] You got one heck of username. Good work.

[49:21] >> Is Is everyone good with this? I take it

[49:23] down. Okay, cool.

[49:26] That is it.

[49:36] >> Brandon, you're you're on top of the

[49:38] invites. Okay, cool.

[49:39] >> There's a few more. I'm on to

[49:41] Chris

[49:45] has given two.

[49:48] >> That's okay. I'm gonna send both. Don't

[49:49] worry.

[49:52] >> That's just where I am in this list.

[50:41] Oh,

[50:42] forgot to mention a couple of things

[50:44] here actually.

[50:45] >> Yeah.

[50:53] >> Coming back live. Yeah, good. Um, just a

[50:56] couple of things. So if if uh you're

[50:59] looking for something to implement and

[51:04] starting with with any with coming up

[51:05] with ideas and stuff, there is a uh a

[51:08] set of sort of predefined issues that

[51:10] you can hack away on. So you can just

[51:11] grab one of these, whack it into Claude

[51:14] and see how it does when it's connected

[51:16] to the context engine.

[51:26] Um, the MCP server for unblocked is

[51:29] here. So, if you want instructions on

[51:31] how to wire this up to uh claw code or

[51:35] another agent, then you can grab it from

[51:37] the instructions from here.

[51:53] All right. So, I'm at Lars. There's two

[51:55] more in here. So, I'm still going, by

[51:56] the way, for those just adding

[53:21] What's going on, Brandon?

[53:23] >> Oh, sorry. Just one of the usernames is

[53:25] >> Oh, okay.

[53:37] You should have

[53:43] just behind

[53:47] Christopher, did you not get invited

[53:48] yet?

[53:49] >> No, I didn't.

[53:50] >> That's weird.

[53:51] >> Let me double check. You should have

[53:53] one, but

[53:57] >> yeah, I should. You should have an

[53:59] email. I'm up to like one of you. So

[54:03] hard.

[54:05] >> It's like five clicks to add a member.

[54:07] I'm like,

[54:11] >> I was going to say should be able to use

[54:12] the CLI for this. What's going on?

[54:15] >> That's right.

[54:16] >> No, they keep putting it in my PR and I

[54:18] don't want it there. Copilot's going to

[54:20] review for me

[54:23] >> very poorly, but it will

[54:42] question.

[54:43] >> Yeah, for sure.

[54:45] >> Do Hold on. Let me grab you the mic.

[54:54] >> Hopefully that's on.

[54:56] >> Does it work? Yes. Um, so I guess that

[54:59] context engine works very well for

[55:01] asynchronous agents so that you don't

[55:04] need to specify things on your keyboard

[55:07] because they can fetch what they need.

[55:09] That's one of the main uses I I guess.

[55:11] And

[55:12] >> um so it plays very well uh I think with

[55:16] agents like Copilot on GitHub. Do do you

[55:19] see uh if you can share it uh which

[55:23] agents are used most with unblocked

[55:26] whether it's more because on the wild as

[55:28] a developers with our laptops I think CL

[55:32] code is much more used than copilot but

[55:34] maybe you see a different picture.

[55:36] >> Okay so I'm going to take this off the

[55:38] screen for a secure

[55:41] >> and try to see if I can pull that up for

[55:43] you.

[55:45] Um, but the answer is yes, we do know

[55:49] roughly what that breakdown looks like.

[55:51] So, let me grab that.

[56:39] Okay.

[56:42] I think this gives you kind of the rough

[56:44] picture.

[56:55] >> Okay. So, this is kind of the rough the

[56:58] rough picture here. Um,

[57:01] unfortunately because of the way that

[57:03] this is I should probably like

[57:05] >> extend the screen, but I'll just step

[57:07] over here. So, uh, cloud code is by far

[57:12] the most used. Um, followed this is the

[57:15] the next one is cursor. So, that that

[57:17] seems fairly obvious. This last one here

[57:20] is kind of a catch-all, but what's

[57:21] really interesting is that a lot of

[57:22] people use cloud desktop, which which

[57:25] was very unexpected, but this is the

[57:28] case. Um, so, and then VS Code and

[57:31] Codeex account for a much smaller

[57:33] component, but yeah, it seems like

[57:34] everyone's using either cursor clog

[57:36] code. I would have expected more of, you

[57:39] know, totally a synchronous agent, like

[57:41] something that people would just run

[57:44] from a PR. Okay, you can run code from a

[57:47] PR, but it's less common. Maybe

[57:49] sometimes you use copilot because it's

[57:51] built in.

[57:52] >> Yeah, actually this this one here, cloud

[57:54] code, um may may capture some of that

[57:57] traffic. So that that's probably what

[57:59] you're seeing because people will wire

[58:00] up cloud code in CI

[58:03] >> and do things like that.

[58:04] >> Thanks.

[58:05] >> No problem.

[58:20] I've got a potentially dumb question.

[58:23] >> There's no dumb questions

[58:24] >> this. Well, we'll see.

[58:27] >> Actually, you know, you know,

[58:28] >> you soon.

[58:28] >> I I I had a teacher in grade three that

[58:31] used to tell me, "There are no dumb

[58:33] questions, only dumb people." Go on. I

[58:35] could I could be one of them. Um, how

[58:38] like from from your point of view,

[58:41] right, you've got you you can use like

[58:43] sub agents from like an exploratory

[58:45] standpoint.

[58:45] >> Yeah.

[58:46] >> How how how does like that plus memory

[58:51] plus just like storing snippets of

[58:54] information that might be able I I'm

[58:56] thinking of the like social graph that

[58:57] you just showed, right?

[58:58] >> Yeah.

[58:59] >> Even in an organization that's like

[59:00] several thousand people, you would be

[59:02] able to store that in a very small file.

[59:04] No.

[59:04] >> Um you you would as the graph that you

[59:07] showed.

[59:08] >> Uh oh, I see the social graph component.

[59:11] Yes. Yeah, it can be compact. I'm

[59:13] >> trying to understand how this compares

[59:15] like what's the kind of like USP

[59:17] compared to the exploratory agents and

[59:20] repeating that.

[59:21] >> I I see what you're saying. Okay. Um

[59:24] so there there are two there are two

[59:27] components to that. One is that uh an

[59:30] exploratory agent would have to do this

[59:32] every time. So when it starts from

[59:34] ground zero, yes, it might be possible

[59:36] for it to reconstitute

[59:38] a sort of social graph hierarchy, but it

[59:41] would have to do two things in order to

[59:43] do that. One is it would actually have

[59:45] to write code in order to constitute the

[59:48] the graph, at least the way that agents

[59:50] are today or the way that the models are

[59:52] today. You wouldn't be able to just have

[59:54] it like run basic tools around um the

[59:58] the organization and figure out the

[1:00:00] who's who. um it would have to write

[1:00:03] kind of like what that social graph

[1:00:05] algorithm is, run it and then get the

[1:00:08] distillation out the back end. So um at

[1:00:11] that point you're basically getting

[1:00:13] close to that component. Anyways, so

[1:00:15] that you short circuit it and just run

[1:00:18] it and use it. Um maybe I should explain

[1:00:20] some of the motivation for that thing.

[1:00:22] Actually I I realized now that I may not

[1:00:25] have done that effectively. Um, social

[1:00:27] graph is not just about conveying

[1:00:31] information about who the experts are.

[1:00:33] It's used within the context engine as a

[1:00:36] pivot point um into more like important

[1:00:39] context. So understanding who the

[1:00:42] experts are in a particular code area

[1:00:45] acts as a jump point because um another

[1:00:49] part of a context engine which happens

[1:00:51] at the ingestion and processing layer is

[1:00:55] um distilling the um we call it bottling

[1:00:58] the expert but it's essentially

[1:01:00] distilling what that individual has

[1:01:02] worked on in the past. uh where they sit

[1:01:05] in the in the kind of hierarchy of the

[1:01:07] organization um the the decisions that

[1:01:10] they've made based on Slack

[1:01:11] conversations that they've had based on

[1:01:13] their PR comments all this kind of stuff

[1:01:15] um when you distill that down it's and

[1:01:18] you pass it to the agent then what

[1:01:20] happens is like let's say that I'm a new

[1:01:23] employee and I'm coming to work on a

[1:01:25] particular area of code um there are a

[1:01:28] bunch of different ways of loading

[1:01:29] context for that code one is you know

[1:01:32] semantic search via vector vector

[1:01:34] search. Right? So that's kind of layer

[1:01:36] one. Another layer is uh pre-built

[1:01:40] memories. And then the the third layer

[1:01:42] is bottling unbottling the expert for

[1:01:46] that area of code. And getting that

[1:01:49] expert's learnings into context is is a

[1:01:52] really powerful mechanism. It helps

[1:01:53] drive the rest of the retrieval in an

[1:01:56] agentic loop and it helps um the agent

[1:02:00] uh directionally like where to go next.

[1:02:02] Does that make sense?

[1:02:03] >> Right. I think everybody's in now.

[1:02:05] >> Awesome.

[1:02:06] >> So, let's uh

[1:02:07] >> Okay. So, I think we're if we're all in

[1:02:10] then

[1:02:12] uh the next thing here is

[1:02:16] once I get this back up on the screen.

[1:02:18] >> I'm still I'm still sending invites. I

[1:02:20] saw someone just So, please keep coming

[1:02:22] and we can keep going.

[1:02:24] >> Yep. So, um, feel free to basically just

[1:02:29] fire this repo at your agent and get it

[1:02:32] to like run it. If you if you literally

[1:02:34] just say to Cloud Code, run this against

[1:02:37] my repo, um, be sure to give it a time

[1:02:40] range or a PR limit, otherwise it'll go

[1:02:43] off the rails and take a really long

[1:02:45] time to finish. So just say like process

[1:02:48] the last like 300 PRs or process up till

[1:02:52] you know September 2025 or something

[1:02:55] like that. Um there's enough information

[1:02:58] in the readme that it should be able to

[1:03:00] just do it and just run it against your

[1:03:02] repo.

[1:03:06] >> I get cloned said read the read me and

[1:03:09] make it happen.

[1:03:11] >> Yeah.

[1:03:13] >> Can I ask another what's your

[1:03:17] What's your plans for the coming year or

[1:03:20] something

[1:03:20] >> for for unblocked

[1:03:26] >> is it is it about unblocked or or about

[1:03:28] this this sort of side project

[1:03:32] >> this

[1:03:36] >> um so I mean I've I've sort of alluded

[1:03:39] to this before but like where the puck

[1:03:42] is going is with fully autonomous agents

[1:03:45] So we're very focused on making sure

[1:03:47] that autonomous agent flows are highly

[1:03:51] optimized. You, as I was saying at the

[1:03:53] beginning of the conversation, you

[1:03:55] cannot run those things effectively

[1:03:58] without like um very finely tuned

[1:04:01] context.

[1:04:03] >> Yeah. So when you think about it

[1:04:10] at some point

[1:04:16] I read things like tracing what what do

[1:04:19] agents and you get run books out of

[1:04:20] those is that is that the path you're

[1:04:23] you're investing in or what what is it

[1:04:26] retrieval what what

[1:04:28] >> are you talking specifically about

[1:04:29] incident management then or

[1:04:31] >> sorry

[1:04:32] >> are you are you speaking specifically

[1:04:33] about incident management management,

[1:04:34] that sort of thing.

[1:04:35] >> No, I'm I'm speaking about your I'm

[1:04:38] thinking actually more from a business

[1:04:39] perspective. How can we extract business

[1:04:41] knowledge that's really deeply embedded

[1:04:44] into systems nobody knows anymore and

[1:04:46] some people know think they know but

[1:04:47] they don't know.

[1:04:48] >> Yeah.

[1:04:49] >> Uh and documents, human knowledge,

[1:04:52] right? Tested knowledge.

[1:04:53] >> Yep. So, I mean there's there's two ways

[1:04:56] of servicing that either at the product

[1:04:58] level or um through the context engine

[1:05:01] itself. And increasingly what we see is

[1:05:04] that people leverage uh agents to do

[1:05:07] their work even at that level. So

[1:05:08] they'll they'll go to cloud code,

[1:05:10] they'll connect the unblock context

[1:05:12] engine, it'll be like do this thing for

[1:05:14] me and then the context engine will find

[1:05:16] all the things that it needs to do that

[1:05:18] task and it it'll surface that data.

[1:05:20] >> Yeah.

[1:05:23] >> For us that means the first near-term

[1:05:25] road map is API.

[1:05:26] >> Yes. It's like CLI

[1:05:28] >> CLI API

[1:05:32] question

[1:05:48] or it's just good that

[1:05:58] Cool. I'm going to lift this off again.

[1:06:00] Hopefully people start submitting some

[1:06:02] PRs and we can

[1:06:03] >> Yeah,

[1:06:10] you're in that GitHub. Let me actually

[1:06:12] repost it in the Slack channel

[1:06:15] because that link will

[1:06:18] >> so this this org will stay up until the

[1:06:20] end of the week. Um at which point we'll

[1:06:22] basically bring it down and um release

[1:06:26] this uh as open source and uh everyone

[1:06:29] that contributes obviously is going to

[1:06:31] get credited. So um you your name will

[1:06:34] be on it.

[1:06:38] Should

[1:06:49] we like

[1:06:51] set up the repo locally and then start

[1:06:53] doing what's basically? So I just

[1:06:57] finished setting up

[1:06:57] >> Yeah, just just clone the repo. Um you

[1:07:00] the easiest thing to do is to take uh an

[1:07:03] agent like Claude and point it at um

[1:07:05] just launch it from that repo from that

[1:07:07] directory and just say please uh

[1:07:10] bootstrap and launch this this product

[1:07:13] and away it will go.

[1:07:16] If if you guys run into any kind of

[1:07:17] technical things, we'll we're here

[1:07:19] obviously. Yeah.

[1:07:25] >> Let's hold on. Let's get you the the

[1:07:27] mic. Oh, you got it. I've got a I've got

[1:07:28] a lapel now. So

[1:07:29] >> awesome. Cool.

[1:07:32] >> Yeah.

[1:07:32] >> Can you hear me? Yeah. Perfect. Um, so

[1:07:34] on the on the slide where you had like

[1:07:37] the performance and you guys were like

[1:07:39] 80% and without unblocked it was 20%.

[1:07:42] >> Yeah.

[1:07:43] >> Um, and now I see that well you are

[1:07:45] basically hooking up like unblocked to

[1:07:48] cloud cut. So in a way is it a fair

[1:07:51] comparison to say

[1:07:53] I will use vanilla cloud code with

[1:07:56] access to the MCP and to the skills.

[1:07:59] >> Yeah.

[1:07:59] >> And then I will use clo codes hooked

[1:08:02] with unblocked with the same MCPS and

[1:08:05] the same skills.

[1:08:06] >> Yeah.

[1:08:06] >> And here you can do the performance

[1:08:08] comparison. And here you still have a

[1:08:10] lot of alpha from I I guess whatever you

[1:08:14] are cooking inside unblocked. Is was it

[1:08:16] the comparison that was done or was it

[1:08:19] done without

[1:08:20] >> was it done with a vanilla cloud code

[1:08:22] but without context?

[1:08:23] >> No, it was done with MCP servers like

[1:08:25] GitHub and Slack wired up.

[1:08:26] >> I see.

[1:08:27] >> Yeah, cool.

[1:08:27] >> We we basically got parody with all the

[1:08:30] MCP servers of every SAS vendor in one.

[1:08:33] It was like vanilla clawed all MCPS and

[1:08:35] the other one was clawed with unblocked

[1:08:37] only

[1:08:39] >> and then do the task and

[1:08:40] >> same context like the same context file

[1:08:43] >> same same prompt

[1:08:44] >> and same access. Yeah. Yeah.

[1:08:47] >> It's it's pretty fun. Yeah. Oh, thank

[1:08:48] you.

[1:08:50] >> Um maybe two questions. So, one is uh I

[1:08:54] see that like a lot of these like social

[1:08:56] graphs are built with like the

[1:08:57] traditional network uh kind of

[1:08:59] calculation and statistical aspects of

[1:09:02] networks. Um, is this like the approach

[1:09:05] that you began with and it already

[1:09:07] worked the best or uh did you like

[1:09:10] because most of memory systems you work

[1:09:11] more on like filtering out like episodic

[1:09:13] memory something else something else

[1:09:15] something else and this is like really

[1:09:16] scoring really nice scoring system

[1:09:19] >> uh that's first question is it like also

[1:09:21] with the unblocked second question

[1:09:24] >> um you mentioned that it works with

[1:09:25] teams uh Microsoft environment I wonder

[1:09:29] what the differences did you observe

[1:09:31] between building social graphs for

[1:09:33] different environments because on GitHub

[1:09:34] I imagine it's very different than on

[1:09:37] SharePoint teams etc etc is it also like

[1:09:40] these network stats based or is it

[1:09:42] something different

[1:09:44] >> um so I mean our first implementation

[1:09:47] was was incredibly naive right it was

[1:09:50] just using uh the numbers of PR

[1:09:52] contributions and comparing that

[1:09:54] directly with uh the number of PRs

[1:09:57] reviewed by each person so just a simple

[1:10:00] like numbers game um with that that

[1:10:03] didn't produce accurate team clusters.

[1:10:06] So then we we got on to um the

[1:10:09] algorithms that you see here. Um Unblock

[1:10:11] does a little bit more than than this.

[1:10:13] So this is kind of like a middle road.

[1:10:15] Um another strategy that Unblock uses is

[1:10:19] um like experts by by vector clusters.

[1:10:23] So when we ingest the source code and

[1:10:25] vectorize it um we understand like who

[1:10:28] the the most contributors are for that

[1:10:30] piece of source code. So when we look up

[1:10:33] individuals, we can see what they've

[1:10:35] been working on and what the um the

[1:10:37] clusters in proximity are and then

[1:10:39] relate people based on their their

[1:10:41] cluster proximity. So that's more of

[1:10:42] like an ML type approach. And then

[1:10:45] there's a final layer which is um uh an

[1:10:49] sort of AI LLM heavy layer that does

[1:10:52] distillations of uh a whole bunch of

[1:10:56] different context elements, things that

[1:10:58] people have worked on in the past,

[1:11:00] conversations that they've been having

[1:11:01] in Slack. Um and then when when you take

[1:11:04] all that and you weigh it against uh the

[1:11:07] like procedurally generated graph, you

[1:11:09] get a much more accurate distillation

[1:11:12] there. This one here, you'll notice like

[1:11:14] some some people will get pulled into

[1:11:16] team clusters that you know are you know

[1:11:20] operating across many different teams

[1:11:22] for example and this won't account for

[1:11:24] that

[1:11:28] >> difference

[1:11:38] algorithms different let's say that you

[1:11:42] I don't want to take out

[1:11:44] >> this so no this algorithm is like purely

[1:11:47] SEM based. So the algorithms for you're

[1:11:49] you're right like um Slack teams they're

[1:11:53] quite a bit different because you don't

[1:11:54] have these review points.

[1:11:56] >> So then it becomes you know who's the

[1:11:58] most active in particular channels and

[1:12:01] then you need a distillation or a

[1:12:03] summary of what that channel is about

[1:12:05] and you need to vectorize that and then

[1:12:07] you need to score it against the the

[1:12:09] most frequent contributors. Um, but it's

[1:12:12] not enough. You have to relate that back

[1:12:14] to the SCM data in order to figure out

[1:12:17] who the real experts are. One one of the

[1:12:19] problems that I I've personally

[1:12:21] experienced in some organizations I've

[1:12:22] worked at is that you get like the noisy

[1:12:25] junior engineer, right? So, they're

[1:12:27] they're very noisy. They love to talk,

[1:12:29] but the signal to noise ratio is not

[1:12:31] great. And uh just because someone's not

[1:12:34] saying a lot of things doesn't mean that

[1:12:36] their messages are not impactful.

[1:12:39] So part of this game is about assessing

[1:12:41] the impact of uh when people say certain

[1:12:45] things, you know, how does that relate

[1:12:47] to the PRs that get spawned off as a

[1:12:50] consequence? How many of those PRs get

[1:12:52] merged? You know, that sort of thing.

[1:12:54] >> Yeah.

[1:13:06] >> Oh, is there not?

[1:13:07] >> There should be. Okay, check that.

[1:13:09] >> Well, you should be able to open a pull

[1:13:11] request. You can't push to main.

[1:13:12] >> Okay.

[1:13:13] >> So, if that if that's the situ we But I

[1:13:15] mean, we'll check.

[1:13:16] >> Yeah, you should you should be able to

[1:13:17] create a branch.

[1:13:18] >> Oh, uh, no. No. Can he can't fork the

[1:13:21] repo either.

[1:13:22] >> Oh. Um, yeah, forks might be disabled.

[1:13:26] >> This will be open source like at the end

[1:13:27] of the week. Um, and your all your

[1:13:29] contributions will be on it.

[1:13:39] What's really fun is using that social

[1:13:41] graph tool later against your own repo

[1:13:42] and like showing your team.

[1:13:44] >> Yeah.

[1:13:46] >> Oh, sorry.

[1:13:48] >> Oh, I'll

[1:13:55] come.

[1:14:12] I like that. Unblock tried to answer you

[1:14:14] for that question.

[1:14:21] >> Oh,

[1:14:27] you see that the Slack auto response?

[1:14:33] Sorry.

[1:14:35] Are you in here?

[1:14:38] That's a camera. Sorry.

[1:14:42] >> Oh, it's okay. I was just

[1:15:16] Oh, okay. Um, let me check to see. That

[1:15:19] should not be the case.

[1:15:29] Okay.

[1:15:31] Let me know if you still need a GitHub

[1:15:33] invite.

[1:15:35] >> Just check the members. I think there

[1:15:37] might Yeah, there might be an issue

[1:15:38] here. Just a second.

[1:16:02] Oh, these were direct assignments. So, I

[1:16:05] think we have to like pull people into

[1:16:07] the whole project because they're not

[1:16:10] they're not org assigned.

[1:16:12] >> Oh, GitHub, I love you.

[1:16:17] >> 09s of uptime.

[1:16:19] >> Yeah, we'll fix this one here. Yeah,

[1:16:22] slam everybody in.

[1:16:44] Come on.

[1:16:45] >> You got it up. I'm trying to because now

[1:16:49] we just need to add people.

[1:16:50] >> Go to settings collaborators.

[1:17:23] unblocked. You all have right access. It

[1:17:26] is the name of the company.

[1:17:26] >> Just just validate that for us if you

[1:17:28] would.

[1:17:29] >> Yeah, please let me know.

[1:17:44] >> Perfect.

[1:17:47] >> All right.

[1:17:59] All right, we're getting real PRs now.

[1:18:02] There we go. Nice. Nice.

[1:18:11] >> Hell yeah.

[1:18:21] Now let's do fun things.

[1:18:45] Okay, nice. Looks good to me.

[1:18:50] >> What?

[1:18:55] >> I think we we have our our first

[1:18:57] approved PR.

[1:19:09] I'm send I'm just sending ridiculous

[1:19:11] chats to unblocked so you can see it try

[1:19:13] to answer questions in Slack as as PRs

[1:19:16] come up.

[1:19:19] I'm going to see what it says about

[1:19:21] this.

[1:19:22] >> Ask it to

[1:19:23] >> It's like Oh, let me think about it.

[1:19:24] >> Oh, did you ask it about the PR?

[1:19:26] >> Yeah, but the PR I think you accepted.

[1:19:27] So, we'll see what happens.

[1:19:28] >> Yeah, I mean it did it did approve it.

[1:19:30] So, you know, unblocked was

[1:19:32] >> unblocked like this looks good to me,

[1:19:33] man. blocked was down.

[1:19:37] >> Only visible to you. Oh no.

[1:19:42] >> What was such a good answer though?

[1:19:47] >> Nice PR. Good job on block. Great

[1:19:50] answer.

[1:20:01] >> Yep. Oh,

[1:20:05] yeah. Yeah. I'll put it back up. I'll

[1:20:06] put it back up. One sec.

[1:20:09] >> Uh, where did it go? Actually, I lost

[1:20:11] the

[1:20:33] over here.

[1:20:35] >> Oh, yeah.

[1:20:48] handle the sources or maybe something.

[1:20:52] >> Do you want the app?

[1:20:53] >> Yeah, for sure. Yeah.

[1:20:55] >> Oh, yeah. Yeah.

[1:20:56] >> Yeah. Of course. We were focused on you

[1:20:59] building, but Yeah.

[1:21:01] >> What am I supposed to do?

[1:21:02] >> Oh, no. It's okay. I mean, let's go.

[1:21:04] >> Oh. Oh,

[1:21:06] >> I sorry. So this this uh this thing that

[1:21:09] I showed before it it is the project

[1:21:11] that exists in that repo.

[1:21:14] >> So the

[1:21:15] >> oh so the idea is like um think think

[1:21:18] about features that you want to add or

[1:21:20] things that you want to to fix or like

[1:21:22] new components and then just hack away

[1:21:26] at it and submit a PR.

[1:21:28] >> Sorry.

[1:21:29] >> Yeah, my bad.

[1:21:30] >> Um do you want to open up like a

[1:21:33] terminal session and show the MCP?

[1:21:35] >> Oh, sure. Yeah, because I'm like people

[1:21:37] can obviously use it but they don't have

[1:21:38] all our source. Yeah.

[1:21:42] >> Consultant

[1:21:45] wanted to try to propose it to a client.

[1:21:47] I cannot show the

[1:21:50] context or maybe get an ide.

[1:22:03] Well, I mean like one thing that you

[1:22:05] could do um if you're visiting clients

[1:22:09] is u you can ask them if they run the

[1:22:11] tool on their

[1:22:13] >> uh on their um repo and then it will

[1:22:15] generate this result for them so they

[1:22:18] can see on their own project what the

[1:22:20] value is. Right.

[1:22:21] >> I think Peter I think he's just asking

[1:22:23] about our product specifically not this.

[1:22:25] >> Oh unblocks. You're asking about

[1:22:26] unblocked.

[1:22:27] >> My bad man.

[1:22:30] >> We're driving this way.

[1:22:31] >> Sorry. Sorry, single track mind. Um,

[1:22:34] okay. So your your question is how can

[1:22:37] you demonstrate the value of unblock to

[1:22:40] customers or

[1:22:40] >> see the value?

[1:22:54] Yeah,

[1:22:59] >> sorry.

[1:22:59] >> Yeah,

[1:23:00] >> you can make conflicts emerge in in your

[1:23:02] app, but um and then there is the

[1:23:06] compliance layer which is very

[1:23:07] interesting for corporate clients.

[1:23:09] >> I was thinking how this um is translated

[1:23:13] to a UX because you know

[1:23:16] >> many people are known I understand it's

[1:23:19] mainly for coding. Yeah.

[1:23:21] >> And whether this is for technical people

[1:23:24] or maybe you know people overseeing some

[1:23:28] engineers or the engineer itself I mean

[1:23:30] just see how your platform works. But if

[1:23:33] it is is out of context I mean I it's

[1:23:36] it's okay. I

[1:23:37] >> no no that's that's totally fine. So

[1:23:39] this this dashboard is kind of like the

[1:23:43] um the sort of front-end customer

[1:23:45] interface to the product. So you know

[1:23:48] you come in here and you can ask any

[1:23:50] question about your codebase or your or

[1:23:53] your organization and get an answer for

[1:23:55] it here. Um this is right now you know

[1:23:59] attached to sorry I lost my cursor. This

[1:24:02] is attached to um this test or that we

[1:24:05] have but I could use it against

[1:24:06] unblocked and I could say like you know

[1:24:10] um I have a little hot thing here that I

[1:24:12] can show.

[1:24:16] Oops.

[1:24:19] >> So, the source mark engine is an

[1:24:21] internal component that we use to track

[1:24:23] source code changes through time,

[1:24:25] including like where

[1:24:27] um you know, changes move between files

[1:24:29] and so on. Um, so as a demonstration,

[1:24:33] you know, you can show off, I mean, you

[1:24:36] can book your your customers into a demo

[1:24:38] with us and we can demonstrate this or

[1:24:40] you can wire it up to your own

[1:24:41] organization and demonstrate this flow

[1:24:44] to customers um, and try to find, you

[1:24:47] know, use cases where data sources

[1:24:49] conflict and demonstrate that that the

[1:24:52] challenge with context engines is that

[1:24:54] it's really hard to demonstrate the

[1:24:56] value to someone without actually wiring

[1:24:58] it up. So there there is a little bit of

[1:25:00] overhead there where people have to

[1:25:03] connect it to all their integrations.

[1:25:04] Now the good thing is um unblocked has a

[1:25:08] free enterprise trial period so people

[1:25:10] can try out the product in its fullest

[1:25:12] form before um uh paying for it. Yeah.

[1:25:18] >> So if some of that information is

[1:25:19] incorrect, you can just reply in the

[1:25:22] chatbot or flag it in the references.

[1:25:24] >> Exactly. Yeah.

[1:25:29] So you can just you can reply here or

[1:25:31] you can say not helpful and explain why

[1:25:34] and then uh it will distill it for the

[1:25:36] next the next round.

[1:25:38] >> So it will adjust some weights or

[1:25:40] confidence scores internally.

[1:25:42] >> Uh well internally what it does is it

[1:25:44] constructs task memory.

[1:25:46] >> So um it looks for those kind of

[1:25:49] repeated signals and uh it this is

[1:25:52] actually where the experts graph comes

[1:25:53] in. It's used a lot. Um the experts

[1:25:56] graph provides like weight. So when an

[1:26:00] expert comes in and says that's not

[1:26:01] correct, it's going to get some some

[1:26:03] more weight and distill a memory for it.

[1:26:06] Um if uh if it's just a new engineer

[1:26:10] that says that's not right, then that's

[1:26:11] not really a trustworthy source yet. So

[1:26:14] uh you have to have a trustworthy source

[1:26:18] to to base that on. Does that make

[1:26:19] sense?

[1:26:20] >> Yeah, it makes a lot of sense. It's like

[1:26:22] social network.

[1:26:23] >> Exactly. somehow.

[1:26:24] >> Yeah. Yeah.

[1:26:25] >> Thanks.

[1:26:26] >> No problem.

[1:26:33] >> Cool.

[1:26:42] >> Oh, under the hood. Um, well, when it's

[1:26:46] presented to the AI, it's presented as

[1:26:48] as files. Um but under the hood we store

[1:26:51] it in you know database tables and

[1:26:53] stuff. Um like the memories are are are

[1:26:56] constituted from a bunch of different

[1:26:58] sources. So they're not just like flat

[1:27:00] file based you know they'll be the whole

[1:27:03] memory construct will be hydrated at

[1:27:05] runtime. So

[1:27:07] >> will you just give your tools to your

[1:27:10] database based on whatever criteria

[1:27:13] users?

[1:27:14] >> Yeah. Well for Yeah. So yes, um there

[1:27:16] are a bunch of tools for data retrieval.

[1:27:18] For memory specifically, um you can't

[1:27:22] really leave it up to the agent to do

[1:27:24] memory hydration because that's kind of

[1:27:27] like part of the seed context. In order

[1:27:29] to get the agent to go in the right

[1:27:31] direction, you have to seed it with the

[1:27:34] appropriate data and experts context is

[1:27:37] a good jump off point for the agent. So

[1:27:40] yeah.

[1:27:43] Yep.

[1:27:46] Uh is there any official benchmark that

[1:27:49] kind of track the type of value you try

[1:27:51] to bring like um yeah because I feel

[1:27:53] like it's not exactly coding or it is

[1:27:56] but yeah I'm curious if there's any uh

[1:27:58] public things that you're tracking

[1:28:00] yourself against.

[1:28:01] >> So we we we do have some internal

[1:28:02] benchmarks. Um you're right it's a

[1:28:04] little bit squishy.

[1:28:05] >> Um so anthro have you have you heard

[1:28:08] Boris Churnney talk um at cloud code?

[1:28:11] It's like the creator of cloud code.

[1:28:13] >> The creator of cloud code. Yeah. So he

[1:28:16] um did this interview where they were

[1:28:18] talking about like how they measure

[1:28:20] success uh for cloud code internally.

[1:28:23] This may have changed because there's a

[1:28:25] lot of benchmarks now that they have

[1:28:27] like they they have like the the

[1:28:28] talk benchmark. You guys have probably

[1:28:30] seen that one. Um but it but what that

[1:28:32] really distills down to is vibes. And so

[1:28:35] the most important thing in uh systems

[1:28:38] like this is to capture sentiment. And

[1:28:40] so if your sentiment is uh is trending

[1:28:43] upwards then um that's a good thing. Our

[1:28:46] our sentiment right now is uh on a scale

[1:28:49] of minus 100 to 100 somewhere around 60

[1:28:54] uh 60 score. So on a normalized scale

[1:28:56] that's like 0.75

[1:28:59] to 0.8. So, so the vibe would be

[1:29:01] captured by something like maybe less

[1:29:04] back and forth on the PRs or maybe um I

[1:29:06] don't know you having less back and

[1:29:08] forth with clothes to get your stuff

[1:29:10] done.

[1:29:12] >> Yeah. So the the vibes are like they're

[1:29:16] they're people satisfied, right? So

[1:29:18] satisfaction can come from a lot of

[1:29:20] different sources and dissatisfaction

[1:29:22] can come from a lot of different

[1:29:23] sources. So the way to think about that

[1:29:25] is that it encodes all of those things.

[1:29:28] Um, but you can capture specific metrics

[1:29:30] and we do how long things take and we're

[1:29:33] actually currently working really hard

[1:29:35] to bring the uh response times down

[1:29:38] because um

[1:29:41] uh you know even though agents are um

[1:29:44] here's the interesting thing as we move

[1:29:46] towards a more autonomous universe

[1:29:49] response times for MCP servers are

[1:29:51] actually less and less important. The

[1:29:54] more important thing is that they get

[1:29:56] the answer absolutely bang on.

[1:29:58] >> Yeah.

[1:29:58] >> And the reason is because um the the

[1:30:01] amount of time that a context engine

[1:30:03] spends collecting all that information

[1:30:05] and distilling it is a microcosm of what

[1:30:08] the full task takes to implement and to

[1:30:12] and to traverse. So if you can spend a

[1:30:15] little bit more time and cut the

[1:30:17] implementation down by like 60 70 80%

[1:30:20] that's a huge win, right? And go ahead.

[1:30:25] >> Sorry, very small followup. Actually,

[1:30:27] I'm curious. Do you have any uh rough uh

[1:30:30] numbers on how much time does it spend

[1:30:33] retrieving context versus executing the

[1:30:35] task to your point? Like is it 10% right

[1:30:38] now, 90%, or is it I have no idea. I

[1:30:41] mean, I have my own experience.

[1:30:42] >> It's like yeah um agent context

[1:30:46] collection is probably close to that

[1:30:49] number. It's like 90%. Um the actual

[1:30:51] code writing part is really really fast.

[1:30:54] If if you can even just watch what an

[1:30:56] agent is doing. Um when it writes the

[1:30:59] code that output tokens are by the way

[1:31:01] the the thing that drags down um the the

[1:31:05] performance. Everyone used to think it

[1:31:07] was input tokens. We've run tons of

[1:31:09] experiments with this. You can bring the

[1:31:10] input token size up and you know time to

[1:31:14] first output token now is is pretty

[1:31:16] pretty good. Like it's pretty highly

[1:31:17] optimized. The thing that really impacts

[1:31:19] performance is output tokens. So um you

[1:31:23] have to be like judicious with the way

[1:31:25] that you collect and supply context back

[1:31:28] to the agent uh so that it remains tight

[1:31:32] on its output loops as well.

[1:31:35] >> For um for one benchmark that Peter

[1:31:37] mentioned in the talk we we gave an

[1:31:39] ambitious task because obviously it's

[1:31:41] prompt dependent how much time you're

[1:31:42] adding and like with a context engine.

[1:31:44] Um but the ambitious task we gave was to

[1:31:46] implement the new adaptive thinking mode

[1:31:48] in anthropics tool chain when they

[1:31:51] introduced that which as mentioned it

[1:31:53] went from a 25m minute wall clock time

[1:31:56] to with with unblock with a context

[1:31:58] engine. The other case without was 2 and

[1:32:00] a half hours. It was 2 hours and 25

[1:32:02] minutes. But the main reason for that

[1:32:04] was we gave it all the data. We ran the

[1:32:06] prompt and then its first output was

[1:32:08] like totally wrong. So you had to the

[1:32:11] human had to loop again and be like no

[1:32:13] no no this this this and the next output

[1:32:15] was wrong and the next output. So once

[1:32:17] you do four loops you have like a two

[1:32:18] and a half hour wall clock time versus

[1:32:20] obviously the 25minut when it did not

[1:32:22] meet that when there's no corrections

[1:32:24] required.

[1:32:25] >> Um so as mentioned it's think of it as a

[1:32:27] waterfall. The more high quality correct

[1:32:30] like high signal context you have up

[1:32:32] front the better every single thing the

[1:32:34] agent's going to do until it says it's

[1:32:37] done whether it got it right or not.

[1:32:39] Yeah.

[1:32:42] >> Yeah.

[1:32:44] >> It's got it.

[1:32:47] >> You also mentioned that uh the token

[1:32:50] usage on tool calls and like just

[1:32:53] information search really decreased. So

[1:32:56] I know that a lot of these tools that

[1:32:58] provide uh or aggregators for tool use

[1:33:01] they have insane like uh token usage. So

[1:33:04] maybe have like some estimations on how

[1:33:07] like let's say I need a slack

[1:33:09] conversation some summary from one

[1:33:12] conversation to another or like how

[1:33:13] people interact there would be like 60k

[1:33:17] tokens on composio I wonder how many

[1:33:20] tokens it would be like using unblocked

[1:33:23] >> yeah

[1:33:25] lower we're still very vibes there like

[1:33:27] it's hard to get real data from other

[1:33:30] customer or people in the market um But

[1:33:33] the again with that same I'm going to

[1:33:35] keep talking to the same task as easy.

[1:33:36] That one went from 21 million token

[1:33:39] total usage to 10 million token with the

[1:33:42] context engine. So a part of that though

[1:33:44] is because you didn't have to doom loop.

[1:33:47] >> So when when the of course like that

[1:33:49] increased a lot of the tokens expense

[1:33:50] like so we did drop it by 50% on a large

[1:33:53] task. Again obviously if you're like yo

[1:33:55] center a div you're not going to get a

[1:33:57] lot of gain. It's like probably in the

[1:33:58] training data. Um, but yeah, like any

[1:34:02] feature uh fix like so a lot of like

[1:34:04] again a lot of what people are putting

[1:34:05] through unblocked are what an engineer

[1:34:07] is doing every day. It's very rare that

[1:34:08] you're doing a task that's like so I

[1:34:11] don't know minor that like I mean then

[1:34:13] again I've asked I've asked Claude to do

[1:34:14] git push so I'm not the only one I bet I

[1:34:18] was like you do it. It's like why did

[1:34:19] that cost me 30 cents?

[1:34:22] I don't know.

[1:34:23] >> Yeah, I put I did all the effort to put

[1:34:26] my GBG keys in the right place so I'm

[1:34:27] like cloud

[1:34:29] Go.

[1:34:33] Any more questions while you all ship?

[1:34:35] Any confusion? Anything I can unblock

[1:34:38] for you? It's my purpose in life.

[1:34:41] >> Sorry, you may have answered this

[1:34:42] question already, but um so you're are

[1:34:45] you using knowledge b knowledgebased rag

[1:34:48] on in unblocked or what exactly is the

[1:34:50] tech that you are surfacing?

[1:34:52] >> Oh, so many things. Uh I can come talk

[1:34:56] to you at the side. I'll take my mic

[1:34:58] off. I'm just gonna answer that

[1:34:59] question.

[1:34:59] >> Sure.

[1:35:00] >> That was just

[1:35:00] >> this

[1:35:07] talented

[1:35:24] Yeah.

[1:35:46] >> Oh, it's it's real time basically. So,

[1:35:49] um there I guess there's there's two

[1:35:52] parts to that question. one is like how

[1:35:54] much or how frequently unblocked updates

[1:35:57] the data on the back end. Um so it's

[1:36:00] it's real time for many of the

[1:36:02] integrations and then on a a cron job

[1:36:04] for others because for those for those

[1:36:06] particular integrations they don't have

[1:36:08] web hooks basically.

[1:36:10] >> Yeah. But the the dis so that means that

[1:36:13] rebuilding the graph data has to happen

[1:36:16] on a on a very frequent basis.

[1:36:23] Yeah.

[1:36:25] >> Yeah.

[1:36:40] >> Yeah.

[1:36:41] >> Yeah.

[1:36:43] >> Yeah.

[1:36:47] >> No, it's it's incremental.

[1:36:50] So our our like you know social graph

[1:36:53] builder algorithm has an incremental

[1:36:55] component to it. So we don't have to

[1:36:56] rerun the whole thing. Um but also uh

[1:36:59] social graphs are less sensitive to

[1:37:03] frequent changes in data because it's

[1:37:06] unlikely that you know a single change

[1:37:10] is going to make a huge impact on the

[1:37:12] experts graph unless your organization

[1:37:14] is brand new. So for

[1:37:21] Yeah.

[1:37:25] >> Yes. Yeah. So, as an example, um we do

[1:37:29] best practices distillation on a much

[1:37:32] lower cadence like basically uh week by

[1:37:35] week because uh yeah, it just doesn't

[1:37:38] change that much.

[1:37:41] >> Yeah.

[1:38:01] Um, well, the Oh, yeah.

[1:38:04] Repeat your question. That's a good

[1:38:06] question. So, I want to make sure we get

[1:38:07] that one down.

[1:38:10] Oh,

[1:38:12] >> in in terms of customer privacy, data

[1:38:15] retention

[1:38:16] um kind of

[1:38:17] >> yeah from from my point of view I'm

[1:38:19] thinking of like enterprise SAS or even

[1:38:21] like on premise type deployments which

[1:38:23] I'm I'm not suggesting that you I'm just

[1:38:25] thinking of that customer kind of

[1:38:27] modality.

[1:38:28] >> Um

[1:38:29] >> yeah, do you get do you get push back?

[1:38:31] Do you how do they feel about you

[1:38:32] holding data? It's another processor in

[1:38:34] the loop.

[1:38:36] Um well so the the the privacy

[1:38:39] discussions happen at the organizational

[1:38:41] level. So it um uh we don't actually run

[1:38:46] into a lot of friction. Um there are

[1:38:48] definitely environments like in

[1:38:50] government and at banks that have uh

[1:38:53] super sensitive needs and so for those

[1:38:55] needs we have an on-prem solution but

[1:38:58] it's definitely not the path that I

[1:39:00] would recommend like staying cloud-based

[1:39:03] like we we have very large enterprise

[1:39:06] organizations

[1:39:07] uh that are entirely cloud-based, like

[1:39:10] fully cloud-based. Um the you know the

[1:39:14] the secret sauce is kind of like less

[1:39:17] encoded in source code now and more

[1:39:19] encoded in um uh the reasoning. So,

[1:39:24] organizations tend to be a little bit

[1:39:25] more sensitive around things like Slack

[1:39:27] data for instance, but uh the way that

[1:39:30] we store uh data like we have a whole

[1:39:33] white paper about how we protect

[1:39:35] customer data um and it's never been a

[1:39:38] problem.

[1:39:40] >> Yeah.

[1:39:44] >> Pardon me. Can you run on prem?

[1:39:46] >> Yes, we we do have an on-prem solution,

[1:39:48] but as I say, like it's it's not the

[1:39:51] recommended approach, but for sensitive

[1:39:54] environments, for sure. Yeah.

[1:39:58] >> Oh, why it's not recommended? Um, well,

[1:40:01] the cloud-based integrations um,

[1:40:05] you know, get updated more frequently

[1:40:07] and so there's software patches. It's a

[1:40:10] little bit harder to maintain within an

[1:40:11] organization. Uh there's there's one

[1:40:13] customer it's a bank um where

[1:40:17] administering

[1:40:18] uh the platform becomes quite difficult

[1:40:21] because they have network isolation and

[1:40:23] so like now one of us has to you know

[1:40:27] sit within that network and administer

[1:40:29] the platform or we have to train uh

[1:40:32] individuals within the company to

[1:40:34] administer the platform. So it's just

[1:40:36] it's more of a a maintenance and um

[1:40:38] handholding exercise.

[1:40:41] But yeah.

[1:40:48] >> Yeah, exactly. That's exactly right.

[1:41:02] >> Yeah. Thank you. Thanks for coming.

[1:41:08] very much.