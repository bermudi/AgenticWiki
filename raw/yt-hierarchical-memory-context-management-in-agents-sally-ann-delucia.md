---
type: youtube
url: https://www.youtube.com/watch?v=esY99nYXxR4
title: "Hierarchical Memory: Context Management in Agents — Sally-Ann Delucia"
channel: AI Engineer
date: 2026-05-10
ingested: 2026-05-10
---

# Hierarchical Memory: Context Management in Agents — Sally-Ann Delucia

[0:00] All

[0:15] right, welcome. Thanks so much for

[0:16] coming today. Um, I'm here to talk a

[0:18] little bit about context windows and I'm

[0:19] really excited because I get to talk

[0:21] about something that my team and I have

[0:23] been building for honestly close to a

[0:25] year now, uh, which is RA agent Alex.

[0:27] Um, so I'm going to talk a little bit

[0:29] about some of the lessons we learned

[0:30] about context management and uh,

[0:32] escaping the context window. So who am

[0:35] I? I'm Salian. I am the head of product

[0:37] at Arise. I have a technical background.

[0:39] I started out in data science and now I

[0:41] build products for teams. Um, I'm

[0:43] hands-on. I'm a core contributor of

[0:44] Alex. I'm not only a PM, but I also

[0:47] function a little bit as a part-time AI

[0:48] engineer as well. So I know the pain of

[0:50] building these products firsthand, and

[0:52] it is not easy to build a successful

[0:54] agent. Uh, my job today really is to

[0:56] turn those pains into tools that may

[0:58] actually help AIG and AIPMs.

[1:01] I'm going to talk a little bit about

[1:02] Alex. I don't want to spend a lot of

[1:03] time on Alex. If you want to know more

[1:05] about what we built, come find me in the

[1:06] booth downstairs. I'll give you a demo.

[1:08] But basically, what Alex is is an AI

[1:10] harness. It's here to help you build

[1:12] your AI applications. We have advanced

[1:14] planning, 40 plus skills built into it,

[1:16] core workflows across prompt engineering

[1:19] like prop optimization, data gen, data

[1:21] augmentation, annotations, etc. Uh

[1:24] that's just a screenshot from our

[1:25] product, but yeah, come find me if you'd

[1:27] like a demo.

[1:29] For today's talk, I'm going to talk a

[1:30] little bit about the problem of context

[1:32] engineering, context management, tell

[1:34] you a little bit about a vicious loop

[1:35] that we got stuck in, how we escaped

[1:37] that loop, and then how long

[1:38] conversations can break agents, a little

[1:40] bit about what we learned about sub

[1:42] agents, and then I'll tell you a little

[1:43] bit about what we're still working on

[1:44] because we certainly haven't figured

[1:46] everything out. So, the problem I think

[1:48] like mid last year, this term context

[1:50] engineering started to become more and

[1:52] more popular. This is an X from Andre

[1:54] Kaparthy about plus one in context

[1:56] engineering over prompt engineering. I

[1:59] think very early on everybody was really

[2:00] really focused on the prompts. But we

[2:02] started to realize that the context is

[2:04] what really made an agent fail or

[2:05] succeed. Um and so the stack has really

[2:08] changed. We're no longer really focused

[2:09] just on the prompts. We're focused on

[2:10] the new engineering problem which is

[2:12] context. So my little perspective is the

[2:16] best context strategy is one that lets

[2:17] your agents remember what it needs to um

[2:20] and forget what it doesn't. We got a

[2:21] little bit of thing. And so we're going

[2:23] to talk a little bit about how you do

[2:24] that. But first, let's talk about why

[2:26] context management even matters. So I

[2:29] think a lot of folks think um like

[2:31] context management is just like what

[2:32] fits in the window. But context

[2:34] engineering is really choosing

[2:35] strategically what the model sees. It's

[2:37] really important that you think about

[2:38] what the data is that is most important

[2:40] and not just think about, oh, I only

[2:42] have x amount of tokens. Let's shove as

[2:43] much as I can in there and see how it

[2:45] does. So it's not just saying under that

[2:48] token limit. It's being strategic about

[2:50] it. And that's why it really matters.

[2:52] All these different applications, a lot

[2:53] of times it's running on top of your

[2:55] context. And so what you choose to let

[2:57] the model see really matters. It can

[2:58] make or break the experience there. And

[3:00] so our reality with Alex is Alex is

[3:02] built on on top of Arise, which is our

[3:04] observability platform. So we have to

[3:06] deal with all of the traces that come

[3:08] with AI agents. And so we have one

[3:10] trace, we are getting, you know, the

[3:12] input from the user. There's prompts.

[3:13] There's all of this metadata. Then the

[3:15] user is interacting with Alex. And so it

[3:17] becomes really large. And that's just

[3:18] when we're talking about one trace. But

[3:20] what happens when they want to see

[3:21] patterns across all of their traces?

[3:22] Well, this just continues to multiply

[3:24] and multiply and multiply. Um, so being

[3:26] strategic about context was a

[3:28] non-negotiable for us. We really had to

[3:29] figure out, okay, what was most

[3:31] important for Alex to see and how do we

[3:32] handle when it needs to kind of see

[3:34] everything. Um, and so this is the

[3:36] problem that we really aim to solve. And

[3:39] so I, as a product person, like to say

[3:41] that context management is a product and

[3:43] a UX problem, not just an engineering

[3:45] one. It's certainly one that the

[3:46] engineers are going to try to solve.

[3:47] There's going to be a lot of different

[3:48] strategies that people try, but

[3:50] ultimately it comes back to the product

[3:51] and the UX because uh if an agent

[3:54] doesn't have the right data, it doesn't

[3:55] have the right context, it's going to

[3:56] give bad answers. And if you give bad

[3:58] answers, nobody's going to want to use

[3:59] your product, right? Um and so that's

[4:01] why it really becomes a product problem

[4:03] and not just an engineering one.

[4:06] And this is the vicious loop that we got

[4:08] stuck in. So when we were building Alex,

[4:10] basically what we decided to do is like

[4:11] if we can build an agent that makes our

[4:13] lives easier in building our

[4:14] application, we'll know we'll have

[4:15] something that our users really want to

[4:17] use. And so we built Alex using Alex.

[4:19] And this is the vicious loop that we

[4:21] kept getting stuck in where Alex would

[4:22] run on our tra our trace and span data.

[4:25] The spans would grow. There would be too

[4:26] much data. We'd hit a context limit.

[4:28] Alex would fail and the span has that

[4:30] data. So it would try again. We'd add

[4:31] more data to it. It would run and then

[4:33] it would fail. So we kept getting stuck

[4:34] in this loop where our context was

[4:35] growing and growing. we couldn't get

[4:37] Alex to actually perform on it. And so

[4:39] we knew that we needed to come up with

[4:40] some kind of strategy.

[4:43] So the system analyzing the data was

[4:44] constrained by the data and that was a

[4:46] major problem for us. Alex was never

[4:48] going to be able to succeed unless it

[4:49] could understand and take in all of this

[4:51] data. So how did we solve that? Well,

[4:54] it's kind of a three-part thing, three

[4:56] things that we really learned here to

[4:57] escape this loop. So how to actually

[4:59] control context? Uh separating the

[5:01] context from memory. I think there's

[5:03] something that's really important about

[5:04] building them together, but they are

[5:05] kind of separate. And then moving heavy

[5:07] work out of one agent into another. That

[5:10] was another lesson we learned. So, I'm

[5:11] going to walk through each of these and

[5:13] tell you a little bit about how we

[5:14] approach them.

[5:16] So, I think the the very first thing

[5:18] that came to mind was some very naive

[5:20] truncation where it's like, okay, we

[5:22] have this long long context blob. Uh,

[5:24] can we just take the beginning of it? Is

[5:25] just the beginning important? Is that

[5:27] enough information to give Alex for it

[5:29] to actually perform the analysis that's

[5:30] needed? So, we started off just taking

[5:32] the first 100 characters and then we

[5:34] just dropped the rest. Pretty pretty

[5:35] naive. Um, and it worked until it

[5:37] didn't. So, um, in the beginning it

[5:40] seemed like for really simple things

[5:41] that this would work out, but the agent

[5:43] ultimately just forgot everything. Uh,

[5:45] follow-ups looked like new

[5:46] conversations. If I asked one question,

[5:48] Alex would respond. And then I said, you

[5:50] know, ask a follow-up like, you know,

[5:52] what are the most common inputs? Okay,

[5:54] these are the most common inputs. Okay,

[5:55] can you tell me a little bit more about

[5:56] input B? It didn't understand what I was

[5:59] talking about. So we learned pretty

[6:00] quickly that this was not going to be

[6:03] successful. So we needed to start

[6:05] considering some other options. Um so

[6:07] the the main takeaway from this was that

[6:10] over truncation broke the reasoning. It

[6:12] couldn't remember.

[6:14] We then thought, okay, well

[6:15] summarization, we have all these LLMs,

[6:17] they're pretty good at summarizing. Can

[6:18] we just summarize all the context into a

[6:20] shorter um amount of tokens so that we

[6:23] can send that to the LLM and have um a

[6:26] better result? And that really sounded

[6:27] like the obvious solution, but it was

[6:29] too inconsistent. There was no control

[6:31] over what was important. You know, we're

[6:32] just leaving it to the LLM to look at

[6:33] the data, decide what to do with it. Um,

[6:36] and that was pretty unreliable. So, we

[6:37] learned pretty quickly that

[6:38] summarization was not going to work

[6:40] either. This was the second thing we we

[6:42] tried. Um, and so next solution was this

[6:46] smart truncation memory. This is what we

[6:47] actually use in Alex today. Um, it is

[6:49] kind of this combination of truncation

[6:52] with a little bit I guess of of

[6:53] compression here and storing in memory.

[6:55] Um, so we take the beginning still 100

[6:57] characters. We also take a 100 off of

[6:59] the tail. Um, and then we we take out

[7:01] the middle and we basically store that.

[7:03] So the agent still has access to this.

[7:05] So if there's any duplicate messages,

[7:07] um, tool calls can be really really long

[7:09] and Alex is making a lot of tool calls.

[7:11] Um, and so we're keeping the latest

[7:13] result. We don't reset the system prompt

[7:14] and we truncate the middle. Uh, keep the

[7:16] head in the tail. And then at any point

[7:18] if Alex feels like there's a tool call

[7:20] that was important or a message from the

[7:22] the previous conversation that's

[7:24] important, it can always go back and

[7:25] grab that context. And so it gives Alex

[7:27] a little bit more control uh over what

[7:29] context is actually important. Um and we

[7:31] found this to be really really

[7:32] successful. Um we haven't had to to

[7:35] touch this in a few months. We are

[7:36] getting to the point I'll talk about a

[7:38] little bit later that we are revisiting

[7:39] our strategy. Uh but we've we've found

[7:42] that this combination of truncation and

[7:43] memory has been really really uh

[7:45] successful.

[7:47] So context decides what the model sees,

[7:49] memory decides what survives. And so

[7:51] this is kind of the system we've built

[7:52] with the um smart truncation there. Um

[7:54] and again this is working quite well for

[7:56] us. But we had another problem as we

[7:59] were kind of deciding how to to handle

[8:02] context management which is long

[8:03] sessions. And I think that this is

[8:04] something that a lot of people run into

[8:06] which is users don't usually restart

[8:08] their chats. Um you know I I think there

[8:11] are different approaches to this. Some

[8:12] people I know like if you're using cloud

[8:13] or cursor you know you pull everything

[8:15] in one chat. Some people like to have

[8:16] other ones, but we've really learned

[8:17] with Alex, everybody kind of wants to

[8:19] stay in one chat as they're traveling

[8:21] pages to pages. So, our conversations

[8:23] grow and our failures appear late. So,

[8:25] when we first did the smart truncation,

[8:27] it seemed like it was working. Um, but

[8:29] then as we saw these longer and longer

[8:30] conversations, there were failures

[8:33] happening and we didn't know about them

[8:34] too late until like a user reported it

[8:35] or I was looking at the data and I

[8:37] realized that Alex kind of started to

[8:39] forget things way late into the

[8:41] conversation. And so, the solution that

[8:43] we came up here is long session evals.

[8:44] And I wanted to include this because,

[8:46] you know, it's maybe not um related

[8:48] exactly to how you handle context

[8:50] management, but it's a really helpful

[8:51] signal on understanding how your context

[8:53] management is doing. Uh because I think

[8:55] long sessions are something that

[8:56] naturally happen with these

[8:57] applications. Um and so what we end up

[9:00] doing is we load 10 turns and then we

[9:01] test the 11 to understand how the

[9:04] context is doing. And so these bugs

[9:05] really become testable. I don't have to

[9:06] wait till I find it or a user reports

[9:08] it. So, uh wanted to share a little bit

[9:11] um about that. And even still with the

[9:13] testability and um the uh truncation

[9:16] here um there is still you know too much

[9:20] data sometimes for for one agent. So uh

[9:23] one big realization that we also had is

[9:25] that not all context belongs in the same

[9:27] agent. Um so I'm going to give an

[9:29] example here our search task. So this is

[9:31] where Alex is trying to search over data

[9:33] in Arise. Um this happens within like

[9:35] our main chase or even when we're just

[9:37] looking at you know one trace stack. you

[9:38] know there can be hundreds of spans

[9:40] within it and Alex needs to figure out

[9:41] what data it should look at. So there's

[9:43] multiple queries happening, tons of

[9:44] data, lots of intermediate reasoning

[9:46] happening step by step and we really

[9:48] came to the conclusion that not all this

[9:50] needs to live in the main conversation.

[9:52] So once we had one kind of main agent uh

[9:54] for our traces uh skills and we decided

[9:57] that that was not really necessary. So

[10:00] the solution that we had was sub agents

[10:02] and I think this is also something

[10:03] really important when we were talking

[10:05] about context and how we manage across

[10:07] uh these agents that need to have a lot

[10:09] of data uh which is offload the heavy

[10:10] task. The main conversation can stay

[10:12] small. Um so before we had the main

[10:14] conversation we had chat history heavy

[10:16] data search all in one context. This was

[10:18] all handled in one agent and then after

[10:19] basically what we have is these this

[10:21] main agent plus a sub agent. So we have

[10:23] the main conversation with the chat and

[10:25] light context only. We keep it pretty

[10:27] light. what it can do is it can delegate

[10:29] to the sub agents um and that's where

[10:31] the heavy data stays. So we can keep all

[10:33] the heavy data context in our sub agent

[10:35] and then once it gets the result we can

[10:36] kind of pass that over to the main ch uh

[10:38] main agent again and then the user can

[10:40] kind of share um or keep the

[10:43] conversation going and of course it can

[10:44] always retrieve from the memory store as

[10:46] well if it ever feels like it needs more

[10:48] context there. So I think this is

[10:50] something that was a game changer. we've

[10:51] uh rolled out a lot of sub aents now

[10:53] that we kind of figured out this is the

[10:55] right way to handle all the really you

[10:57] know data intensive operations.

[11:01] So that's a lot of what we figured out

[11:02] in terms of context management. It's

[11:04] working really well. I I think I was

[11:05] surprised the most by the fact that

[11:07] summarization didn't work. I think that

[11:08] was again like the obvious choice for

[11:10] us. But uh the combination of truncation

[11:12] along with being able to store it in

[11:15] memory uh is something that we found to

[11:17] be really successful. So what are we

[11:19] still figuring out? because there's

[11:20] quite a lot uh huge context still can

[11:22] still break things I think it's still a

[11:23] problem for us very large prompts or

[11:25] inputs still hit provider limits so

[11:27] because we're operating we have an agent

[11:29] operating on agent data you can imagine

[11:30] all the system prompts the user message

[11:32] the conversation history that is all

[11:34] what our customers are trying to use

[11:35] Alex to understand and so as their

[11:38] context is growing we have a bigger

[11:39] context issue because we have to figure

[11:41] out how um to to handle that and the

[11:44] pattern we keep returning to is sub

[11:46] aents we just keep breaking things up

[11:48] and having context handled by different

[11:50] parts. Um, and that is something that we

[11:52] are still um, kind of learning about and

[11:54] and seeing if there's anything that we

[11:56] need to do to evolve that strategy even

[11:58] more. Long memory is still hard. This is

[12:01] something actually that my engineers are

[12:02] working on right now. So, long sessions

[12:04] are tricky. We are seeing conversations

[12:06] grow more and more. I think when we

[12:08] started, I was seeing like less than 10

[12:09] turns per conversation with Alex and now

[12:12] I'm seeing folks really go, you know,

[12:14] push the limits up to like 20 plus. Uh

[12:16] what's really happening there is they're

[12:17] traveling across our application using

[12:19] Alex. And so as they're trying to do

[12:21] these longer workflows, they're

[12:22] obviously asking more questions and

[12:24] they're finding Alex to be helpful, but

[12:25] that's a problem for us because we need

[12:27] to figure out how um to handle this. So

[12:30] I think what we're really focused on

[12:31] right now is like real long-term memory.

[12:33] It's not something that Alex has. The

[12:34] memory is really just that um kind of

[12:36] context with the memory store uh that

[12:38] Alex can leverage. So we don't really

[12:40] have long-term memory. Um, I also think

[12:42] it's important because people want to

[12:43] reference issues that they've previously

[12:45] discussed with Alex. And so if they're

[12:47] they do decide to start a new chat, Alex

[12:49] really doesn't have context for that.

[12:50] So, uh, we're in the process of adding

[12:52] long-term memory. And I think that's

[12:53] something that'll be a real gamecher for

[12:55] us.

[12:57] Context selection is also still a

[12:59] heristic for us. Deciding what context

[13:01] stays in um, is just that basic like I

[13:03] said like first 100, last 100. Um, but

[13:06] we do keep like asking ourselves, do we

[13:09] keep the right things? uh we don't

[13:10] really have a principled context budget

[13:12] or clear metrics for context quality

[13:14] yet. We use our evals a lot of the time

[13:16] to measure whether our context was right

[13:17] or not. Um but I think there's something

[13:19] a little bit more sophisticated that

[13:20] we're researching to figure out if this

[13:22] is the right heristic. Um something that

[13:24] was a little bit surprising to us is you

[13:26] know I don't know how many people read

[13:27] here but the the the cla code code was

[13:29] kind of released for all of us to read a

[13:31] little bit about. We were surprised that

[13:32] they're using kind of a similar

[13:33] truncation and compression strategy as

[13:35] we are. Uh, and we were kind of hoping

[13:36] to get a little bit of a secret from

[13:38] from them, but I guess we'll all just

[13:40] have to keep, you know, doing our own

[13:41] research there. Um, and just some

[13:44] takeaways because I wanted to leave some

[13:45] time for questions.

[13:47] Um, context management is iterative. Uh,

[13:50] we are still learning. I think everybody

[13:52] should continue to learn and lean in and

[13:54] try to optimize their context

[13:56] management. Um, the few things that I

[13:57] think are really clear is that context

[13:59] engineering really does matter. Memory

[14:01] matters and evaluation matters. If

[14:03] you're going to take anything away from

[14:04] me or us at Arise, it's those three

[14:06] things. And that's um from our

[14:08] experience as well as our experience

[14:09] with all of our user base.

[14:12] And finally, uh agents don't fail

[14:14] because of prompts, they fail, uh

[14:16] because of context. I think that's

[14:17] something that uh we've learned

[14:19] firsthand and that we're seeing more and

[14:20] more. In the early days, prompts were

[14:22] everything. Everybody was focused on

[14:23] prompt engineering, but ourselves and

[14:25] all of our users are really focused now

[14:27] on context engineering. Um and there's a

[14:29] lot of strategies uh that can go into

[14:32] that.

[14:33] If you want to try out Rise, just want

[14:34] to give a QR code to try it out, you can

[14:36] try out Alex, um, our agent. U, we're

[14:38] downstairs at the booth. If you'd like

[14:40] to see a demo, especially of Alex, I'd

[14:42] be happy to give it. But I wanted to

[14:44] just leave some time to honestly be able

[14:46] to have, you know, some Q&A and answer

[14:47] some questions.

[14:58] >> Yeah. Question.

[15:01] that

[15:03] came out.

[15:04] >> Hey, thank you. It was a great talk. Um,

[15:06] one of the things that came out with the

[15:08] claw code leak was how much effort

[15:09] they've put into not invalidating the

[15:12] cache with their context management? Are

[15:15] you doing work on that as well or how

[15:17] are you thinking about that?

[15:18] >> Yeah, I think right now we're really

[15:19] trying to focus on the long-term memory

[15:21] stuff. We haven't gone too much into the

[15:23] cache. Basically, we have it saved off

[15:24] in a database with IDs. And so, what

[15:26] Alex can do is it has a tool where it

[15:28] has all the IDs and like where in the

[15:30] conversation it needs to access. So, was

[15:32] it early on, how many messages, and it

[15:34] gets a little bit of a preview. Um, so

[15:36] that's how we've done it right now. I

[15:37] absolutely think we're going to have to

[15:38] get a little bit more sophisticated and

[15:39] invest in that. But right now, it's

[15:41] working. So, we're kind of focused more

[15:42] on the long-term memory because I feel

[15:44] like that's where I'm getting the most

[15:45] complaints.

[15:47] Yeah. Any other questions?

[15:53] All right. Well, come find me downstairs

[15:55] if you have any questions. Thanks so

[15:56] much for the the time.