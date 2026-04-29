---
title: "You're logging wrong"
author: "Theo - t3․gg"
source: "youtube.com"
url: "https://www.youtube.com/watch?v=wFYdok_YWq8"
date_saved: "2026-04-29T00:05:58.902Z"
---

# You're logging wrong

[0:00] If you ever ask my co-workers what it's

[0:02] like to work with me, they'll have a lot

[0:04] to say. But if you specifically ask for

[0:06] any weird things or bad habits I have,

[0:08] there's one in particular almost every

[0:10] engineer will bring up after working

[0:11] with me. I leave a lot of logs around,

[0:13] like far too many. In the T3 chat

[0:16] codebase alone, I think we had to clean

[0:18] up over a thousand log statements that I

[0:20] just left around. I love just dropping a

[0:22] console log to figure out what's going

[0:24] on. And I can't tell you how many times

[0:26] one of these random logs made it way

[0:28] easier for us to debug something going

[0:30] weird or just not how we expected. That

[0:33] said, I need to be honest with you guys.

[0:35] Logging sucks. And I'm not the only one

[0:38] saying this. Boris just wrote an

[0:39] incredible article all about the

[0:41] problems with logging in and how we do

[0:43] it today. And as somebody who is known

[0:45] for logging way too much, I couldn't

[0:48] agree more. I'm so excited to break all

[0:50] of this down and explain the ins and

[0:53] outs of how logging at scale works and

[0:56] all of the problems with the traditional

[0:58] way that we log data. Since we're about

[1:00] to go deep on something that sucks, we

[1:02] should take a quick break for something

[1:03] that's awesome. Today's sponsor. 2025

[1:05] was the year AI started writing the

[1:07] majority of our code. I think 2026 is

[1:09] going to be the year where AI starts

[1:10] running a lot of that code, too. You

[1:12] need somewhere safe to run it. You can't

[1:14] just let AI write a bunch of code and

[1:15] execute it all over your machine.

[1:17] Certainly not on your production servers

[1:19] either. So where are you going to put

[1:20] it? I think Daytona is going to be a

[1:22] hard place to beat. Daytona deeply

[1:23] understands infrastructure and they've

[1:25] found the right combination of servers

[1:27] and serverless and SDKs to make

[1:29] something that is really, really good

[1:30] for running AI code. I'm just going to

[1:32] grab the snippet from their homepage to

[1:34] explain this to you. You instantiate a

[1:36] Daytona SDK. You create a sandbox by

[1:39] calling Daytona.create where you can

[1:40] optionally pass a specific programming

[1:42] language. You then get a response by

[1:44] simply executing the code.

[1:46] sandbox.process.code

[1:47] run this console log and now you get a

[1:50] response. It's that easy to execute code

[1:54] remotely safely. You can even control

[1:56] what access it has, what permissions it

[1:57] has, can it browse the web, can it do

[1:59] all these types of things trivially. You

[2:00] could even expose your own stuff to it

[2:02] if you want to give it some MCPS or

[2:04] random SDKs that it has access to. You

[2:06] have full control over all of that.

[2:08] Anything you can do on a real server,

[2:09] you can do on Daytona. There's a reason

[2:11] lang chain, browser use, samba, and

[2:13] process all are using Daytona for their

[2:16] agents. It's so much easier to manage.

[2:18] My own channel manager, Ben, has been

[2:20] using Daytona to run open code in the

[2:22] cloud so we can have a bunch of

[2:23] background agents just tackling random

[2:25] tasks. If I was building a background

[2:27] coding agent tool, you bet your ass I

[2:28] would be building it entirely on top of

[2:30] Daytona. The reason why is simple. It's

[2:32] fast, scalable, and stateful. The

[2:33] stateful part is what's so cool. When

[2:35] it's waiting for tokens to be generated,

[2:37] you're not being bu on the wait time.

[2:39] you're just being build on execution

[2:40] time and the state just stays there when

[2:42] you're waiting for the update from the

[2:44] LLM. It's so hard to balance this out

[2:46] where you can write a file and expect it

[2:47] to still be there the next time the

[2:49] thing spins up while also not charging

[2:51] you for the entirety of the time that

[2:53] server exists. It's so nice and it

[2:55] really feels tailor made for the use

[2:56] cases that we have with generating code

[2:58] and running it through stuff that agents

[3:00] are trying to spit out. And if you spin

[3:02] it up now, you'll get $200 in free

[3:03] credit. What are you waiting for? Check

[3:04] them out now at sodv.link/tona.

[3:07] Let's dive into why logging sucks and

[3:10] also how to make it better. I love this

[3:12] opener. Your logs are lying to you. Not

[3:15] maliciously. They're just not equipped

[3:17] to tell the truth. You've probably spent

[3:20] hours grepping through logs trying to

[3:22] understand why a user couldn't check

[3:23] out, why the web hook failed, or why

[3:25] your P99 latency spiked at 3:00 a.m. You

[3:28] found nothing useful, just timestamps

[3:30] and vague messages that mock you with

[3:32] their uselessness. This isn't your

[3:34] fault. Logging as it's commonly

[3:36] practiced is fundamentally broken. And

[3:39] no, slapping open telemetry on your

[3:42] codebase won't magically fix it. Shout

[3:44] it from the mountain tops. I have so

[3:46] many issues with hotel. I don't want to

[3:48] just make this a rant about hotel. I

[3:50] legitimately prefer console log to hotel

[3:52] for most things, but uh we'll get there

[3:54] as we get there. Let's see what's wrong

[3:56] and more importantly how to fix it. Core

[3:58] problem. Logs were designed for a

[4:01] different era. an era of monoliths,

[4:03] single servers, and problems you could

[4:05] reproduce locally. Today, a single user

[4:08] request might touch 15 services, three

[4:10] databases, two caches, and a message

[4:13] cue. Your logs are still acting like

[4:15] it's 2005. There are a lot of things

[4:18] like this in tech. I have been resisting

[4:20] the urge to do like a 2 to three hour

[4:22] skitso rant about everything I hate

[4:24] about file systems. The idea that files

[4:27] should exist in folders that are nested,

[4:30] hierarchal, and have no ability to share

[4:32] content between them instead of

[4:34] something like a logical tagging system

[4:36] is so rudimentary and wrong that the way

[4:39] file systems actually work entirely

[4:42] ignores the paradigm of how they're

[4:43] exposed. Most file systems are just a

[4:46] list of files with the folder as a tag

[4:48] or name key in it somewhere that you use

[4:51] to create the hierarchal system that

[4:53] users expect. We have just been

[4:55] pretending files and folders are the

[4:57] right way to organize things on our

[4:58] computer for like four decades now. And

[5:01] logs are a similar thing. Logs were made

[5:03] a long ass time ago. People mostly

[5:06] understood them. So nobody's bothered to

[5:08] challenge the fundamentals of them. We

[5:11] still use computers the same way that

[5:13] UIs were invented with the original

[5:15] Macintosh. The same three buttons in the

[5:17] corner, the same mouse with the same

[5:19] click behaviors. We don't like change

[5:21] unless we really need it. And that's how

[5:22] we end up places like this where logs

[5:25] still work as though everything's

[5:26] running on one server that the database

[5:27] is actually running on top of. That's

[5:29] not how anything works anymore. So this

[5:31] system sucks. Just as a silly example

[5:33] from literally earlier today, I was

[5:35] filming a video about how we built the

[5:37] wrapped feature at T3 Chat. And this

[5:39] feature was only debuggable because of

[5:42] ways that I added logging in and how

[5:44] good of a platform Convex is. But this

[5:47] one was complex because things existed

[5:49] in a lot of different places. There was

[5:50] the UI state, what the user was seeing

[5:52] in what state their like device was in.

[5:55] There was the feature flag which was

[5:57] coming from post hog which actually

[5:59] would be blocked if you had an ad

[6:00] blocker on which is really annoying.

[6:02] There is the convex database where the

[6:05] data gets put and stored. There's the

[6:07] convex like query layer where you're

[6:09] querying for what the data is and if you

[6:11] have it. And then there's the convex

[6:13] workflows that actually run the

[6:15] generations all being run on top of the

[6:17] post hog data sets. So we have like five

[6:20] parts of convex the user experience the

[6:23] back end on Verscell which thankfully we

[6:26] didn't have to touch too much that was

[6:27] like basically written out of this one

[6:29] unlike for everything else in the

[6:30] product and then post hog as a source of

[6:32] data and then convex again is the

[6:34] location the data goes when it's done

[6:36] that's a lot of different places with a

[6:37] lot of different things and I honestly

[6:39] can't tell you what's going on in some

[6:40] of them at all I have no idea if there's

[6:42] a place in post hog where you can see

[6:44] logs for attempted queries and their

[6:46] success and failures I couldn't find it

[6:48] so all of the logging had to happen in

[6:50] this control plane. So I built a bunch

[6:52] of logging for this to figure out what

[6:54] was going wrong. But now it's scattered

[6:56] across a bunch of different things. And

[6:58] then if another user was to do this at

[7:00] the same time, the logs get all mixed up

[7:02] together. The prod logs look way worse

[7:05] than the dev logs do because different

[7:08] requests get intermingled. If two things

[7:10] happen at the same time, it logs them

[7:12] when they happen. You can't clearly see

[7:13] what happened for a given request.

[7:16] Obnoxious. And this is just some of the

[7:19] problems that are about to be discussed,

[7:21] I'm assuming at least. But I couldn't

[7:22] agree more. When your single request is

[7:25] touching all of this different [ __ ]

[7:27] just logging step by step is not giving

[7:29] you the experience you need. Here's what

[7:31] a typical logging setup looks like. We

[7:33] have a log chaos simulator. I hit

[7:35] process order and all of the logs for

[7:37] this come through. It received the

[7:39] request for the checkout. It parsed the

[7:41] body. It validated the JWT token for

[7:43] that user. Confirmed that it's valid.

[7:45] Created the order. validated the cart.

[7:48] Checking for stock of the items. Once

[7:50] it's confirmed, the stock's all good. It

[7:52] processes the payment. Calls the stripe

[7:54] API. Takes a while. Declined because of

[7:57] insufficient funds. Attempt again.

[7:59] Successful order confirmed. Response

[8:01] sent. That makes sense for one user.

[8:04] This is easy to follow. Watch what

[8:06] happens when we bump the number of users

[8:08] up.

[8:10] Now, it is impossible to know which user

[8:13] we're looking at at any given time. This

[8:15] is just 13 users and it's impossible to

[8:18] see which user did what where because

[8:20] the logs are just coming in as the

[8:22] things happen. Hell, sure you can add

[8:25] some clever ID system to track what

[8:27] request all of this is coming from and

[8:29] then make a custom UI to group based on

[8:31] that. Good luck.

[8:35] Let's see where this goes. Now multiply

[8:37] this by 10,000 concurrent users. You've

[8:40] got 130,000 log lines per second. Most

[8:43] of them saying absolutely nothing

[8:44] useful. But here's the real problem.

[8:46] When something goes wrong, these logs

[8:48] won't help you. They're missing the one

[8:49] thing you need. Context. String search

[8:52] is broken. We have no way of checking

[8:55] for a specific user. Here we receive a

[8:57] request to check out or a user checking

[8:59] out. Another one comes in later. We have

[9:01] no idea which one is for which user. You

[9:03] could tag this in some way, which you

[9:05] have to do. Yeah, it can help. Andel can

[9:09] help for one box, but if these different

[9:11] things are happening on different boxes,

[9:12] like the gateway is the layer in front,

[9:14] but then inventory is a different system

[9:16] running on a lambda or something.

[9:18] Getting the logs from there back to the

[9:20] main box to be grouped as one cohesive

[9:22] thing. Good luck. Hotel does not solve

[9:25] any of these problems other than looking

[9:27] at a trace on one box. So, here's why

[9:30] string search does not solve our

[9:31] problems here. When a user reports, I

[9:33] can't complete my purchase, your first

[9:34] instinct is to search your logs. You

[9:36] type their email or maybe their user ID

[9:38] and then you hit enter. User one two

[9:40] three. Search. Now we got a handful of

[9:44] the logs. The ones that we remembered to

[9:45] put the user ID on. But any logs that

[9:48] don't include the user ID, we don't get.

[9:50] And they're also all in different

[9:52] formats. User space the user ID. User ID

[9:55] equals user ID object user col user ID.

[9:59] This is something I'm guilty of. I log

[10:01] aggressively and will log a ton of [ __ ]

[10:04] Yeah, very common. And here is context

[10:06] that existed in the code, but we didn't

[10:08] get we didn't get the card declined

[10:10] errors. We didn't log a user ID. We

[10:12] didn't get the last four of the card. We

[10:14] didn't get the retry attempts, the user

[10:15] subscription tier, or the cart value. We

[10:17] couldn't see any of that. It does exist

[10:19] in the code, but we didn't log it

[10:20] properly. String search treats logs as

[10:23] bags of characters. It has no

[10:25] understanding of structure, no concept

[10:27] of relationships, no way to correlate

[10:29] events across services. Yep, we already

[10:33] solved this problem. and then naming two

[10:35] things that sound like you just made

[10:37] them up in chat right now. Zipkin and

[10:40] sleuth. If those work for you, awesome.

[10:42] But I've never heard any of those words

[10:44] before, as we were. When you search for

[10:46] the user ID, you find that it's logged

[10:48] so many different ways across your

[10:49] codebase. And these are just the logs

[10:51] that you remember to include it. What

[10:52] about downstream services that only log

[10:54] the order ID? Now you need a second

[10:55] search and a third. You're playing

[10:57] detective with one hand tied behind your

[10:59] back. And this is the fundamental

[11:00] problem. This is such a banger. Logs are

[11:02] optimized for writing, not for querying.

[11:06] Yes, logs are great because it's a

[11:07] loweffort way to give you some insight

[11:10] in the moment. They are not good for

[11:13] reading because they are not optimized

[11:15] for that. They are meant to be as easy

[11:16] as possible to dump data, not to find

[11:19] data. And the problem is that if you

[11:21] want to have good logs, you to put way

[11:22] more care in. But nobody wants to put

[11:25] care into something like logging when

[11:27] they could just put a console log, like

[11:28] I'm very guilty of. Developers write

[11:30] console.log log payment failed because

[11:32] it's easy in the moment. Nobody thinks

[11:34] about the poor soul who will be

[11:36] searching for this during an outage at 2

[11:38] a.m. Yep. Yep. So, let's define some

[11:41] terms. Before I show you the fix, let me

[11:43] define these terms. They get thrown

[11:45] around a lot, often incorrectly. First,

[11:47] we have structured logging. Logs emitted

[11:49] as key value pairs, usually in JSON,

[11:52] instead of plain strings like event

[11:54] colon, payment failed, user ID 1 2 3

[11:56] instead of just a string. Structured

[11:58] logging is necessary but not sufficient.

[12:01] Totally agree. Then we have cardality,

[12:03] the number of unique values a field can

[12:06] have. User ID has high cardality because

[12:08] there are millions of unique values.

[12:10] HTTP method has low cardality because

[12:13] there's only a handful of them. I love

[12:15] the etc. There are technically more but

[12:17] nobody uses them. And high cardality

[12:19] fields are what make logs actually

[12:21] useful. These ones barely matter. And

[12:24] then there's dimensionality. the number

[12:26] of fields in your log event. A log with

[12:28] five fields has low dimensionality. A

[12:31] log with 50 fields has high

[12:32] dimensionality. More dimensions means

[12:34] more questions you can answer. Then

[12:36] there are wide events. A single

[12:38] contextrich log event emitted per

[12:40] request per service. Instead of 13 log

[12:43] lines for one request, you emit one with

[12:46] 50 plus fields containing everything you

[12:48] might need to debug. And then we have

[12:50] canonical log lines, which is another

[12:52] term for a wide event that was

[12:53] popularized by Stripe. one log line per

[12:55] request that serves as the authorative

[12:57] record of what happened. Good. This is a

[13:00] cool view. Ranking random pieces of data

[13:03] by how essential they are when you're

[13:05] debugging against how cardinal they are.

[13:07] So like how unique can a value be?

[13:09] Something like the environment like

[13:10] knowing if it's prod or dev. Critical

[13:12] for filtering, but you know what you're

[13:14] in when you're checking the logs. HTTP

[13:16] method, you know, by the URL and what

[13:17] they're doing. Region, cool. status code

[13:21] kind of, but the only reason you're

[13:23] checking is if it's a 400 or a 500,

[13:25] let's be real. Then things like endpoint

[13:27] and error code are limited subsets, but

[13:30] much more useful information. And the

[13:32] things that are really essential, but

[13:34] also large cardality values like session

[13:37] ID, user ID, request ID, trace ID, those

[13:39] types of things. The irony, most logging

[13:41] systems charge by volume and choke on

[13:43] high cardality fields. This is

[13:45] backwards. High cardality is exactly

[13:47] what you need for debugging. Yep. And

[13:50] now the open tal rant. Open telemetry

[13:53] will not save you. I see this take

[13:54] constantly. Just use OTEL and your

[13:56] observability problems are solved. No,

[13:59] open telemetry is a protocol and a set

[14:01] of SDKs. It standardizes how telemetry

[14:04] data like logs, traces, and metrics are

[14:06] collected and exported. This is

[14:07] genuinely useful. It means you're not

[14:09] locked into a specific vendor's format.

[14:11] But here's what it won't do. It does not

[14:13] decide what's a log. You still have to

[14:15] instrument your code deliberately. It

[14:16] doesn't add business context. If you

[14:18] don't add the user subtier, their cart

[14:20] value, or the feature flags enabled,

[14:22] hotel doesn't know that. And it doesn't

[14:24] fix your mental model. If you still

[14:26] think in terms of log statements, you

[14:28] just emit bad telemetry in standardized

[14:30] formats. Yep. So, here is one example of

[14:35] an endpoint using OEL. We create the

[14:37] active span. They try an order and if

[14:40] there's an error, we record the error.

[14:42] Here's a better example where we get the

[14:44] span, we get the request, we immediately

[14:46] set attributes on the span for the user

[14:49] ID, subscription, lifetime value, item

[14:51] count, total sense, feature flags, and

[14:53] these other things that might be useful

[14:54] with the events we're about to log. And

[14:57] then when the order is created, we add

[14:59] the order information to the span. And

[15:02] if the order fails, we set error types

[15:04] on the span instead and record the

[15:06] exception. And let's see the difference

[15:07] in the logs. Here is the log for the

[15:09] first example using hotel. You get a

[15:11] span name, a duration, a status, an

[15:14] exception message. We don't know who

[15:16] this failed for. We get nothing still.

[15:18] When we look at the hotel logging that

[15:19] we actually put attributes on properly,

[15:22] we get the same first three fields.

[15:24] Cool. But a bunch of other useful data,

[15:26] too, like the user's ID, their

[15:28] subscription tier, are they a premium

[15:29] sub or not? The lifetime value of this

[15:31] customer. So we can filter things out,

[15:33] see how often they're happening for a

[15:35] user of a certain level of usage. Cart

[15:37] item count, cart total sense, feature

[15:39] flags, what feature flags they had on.

[15:41] And in this case, they had the new

[15:42] checkout on, which might be why this

[15:44] failed. But also, it was a payment

[15:46] declined error, which we have here from

[15:48] the error type in code from when the

[15:50] error happened. Now we can actually

[15:52] understand what happened. Same library,

[15:54] same protocol, widely different

[15:56] debugging experience. Hotel is just

[15:58] plumbing. You decide what flows through

[16:00] it. Yes, hotel is a delivery mechanism.

[16:03] It doesn't know that user 789 is a

[16:05] premium customer who's been with you for

[16:07] 3 years and just tried to spend 160

[16:08] bucks. You have to tell it that. And

[16:11] here is the fix. You need wider events

[16:13] and canonical log lines. The mental

[16:15] model shift that will change everything.

[16:17] Instead of logging what your code is

[16:19] doing, log what happened to the request.

[16:22] Instead of logging at every step, like

[16:24] if we go back here, we could log at the

[16:27] start what user we're doing things for.

[16:29] Then we could log that the order

[16:30] succeeded or log that the order failed.

[16:32] That's a thing I do a lot. You use OTEL

[16:34] properly. Instead of logging, you're

[16:36] tagging for this request, you are adding

[16:38] the additional context to the request at

[16:41] each of those steps. Instead, stop

[16:43] thinking about logs as a debugging

[16:44] diary. Start thinking about them as

[16:46] structured records of business events.

[16:48] For each request, emit one wide event

[16:51] per service hop. This event should

[16:53] contain every piece of context that

[16:54] might be useful for debugging. not just

[16:57] what went wrong, but the full picture of

[16:59] the request. If we have time at the end,

[17:01] I'll show you guys how we do this in T3

[17:02] chat because Julius went hard to get all

[17:04] of this working for us abusing hotel and

[17:07] effect and Axiom. It's really cool

[17:09] stuff. So hopefully I'll remember and

[17:10] hopefully I can do it in a way that's

[17:12] PII free enough. We'll get there. So

[17:14] let's take a look at a example of a wide

[17:16] event. The request context includes data

[17:19] like your trace ID, span ID, parent span

[17:22] ID. So if this is a subspan because

[17:24] you're going down some other path and

[17:25] you want to log that separately, you can

[17:26] track where this one came from. The

[17:28] method, the path, the query params. Why

[17:30] are you not logging query params? You

[17:32] should always log query params. Come on,

[17:34] guys. Why are query params such as a

[17:36] [ __ ] third class citizen? The status

[17:38] code, duration, timestamp, and then

[17:40] these things are a little PI, so I don't

[17:42] love having them, but it can be useful

[17:44] to have like the IP if they're in an

[17:45] area that's being blocked or the content

[17:47] type if you have certain image types

[17:49] that are failing, stuff like that. not

[17:51] as useful overall. Then we have user

[17:53] context. Things like the user ID,

[17:54] session ID, subtier, account age,

[17:56] lifetime value of the account, org ID,

[17:59] team ID, all useful things to decide

[18:01] about. We should probably start

[18:02] including lifetime value in our events.

[18:04] That could be really useful now that I

[18:05] think about it. Then we have the

[18:06] business context. These are things that

[18:08] are specific to our business and to a

[18:10] given endpoint like your order ID, card

[18:12] ID. You can add these to have them in

[18:15] the span. infrastructure context like

[18:17] what git hash is this on? What

[18:19] deployment ID is it running on? What

[18:20] region availability zone? All these

[18:22] types of things. The error context like

[18:24] what pieces of the error do we want to

[18:26] log. The stripe decline code is a really

[18:28] useful one. And then the performance

[18:29] context, how many DB queries did it do?

[18:32] How much time did those queries take?

[18:34] How many caches were hit or missed? All

[18:36] really useful stuff. And I like this

[18:38] view a lot. I just checked a bunch of

[18:40] random things that I thought are useful.

[18:42] And now it's asking, can we answer the

[18:44] questions about an event? Why are the

[18:46] users checkout fail? We didn't include

[18:47] payment methods, so we don't know. Are

[18:49] premium users experiencing more errors?

[18:51] We do know this because we have the

[18:52] users tier as well as the error types.

[18:54] So, we know if it's an error or not.

[18:56] What deployment caused the latency

[18:58] regression? We don't know cuz I didn't

[19:00] include deployment ID. Now, we do.

[19:02] What's the error rate for the new

[19:03] checkout feature? We don't know because

[19:05] we don't have the feature flags added.

[19:07] This is a really cool example of how to

[19:10] do this. And the harsh reality is no

[19:12] matter how good you get at this, you

[19:13] will still miss things. you will have

[19:14] some outage where you can't figure out

[19:16] what's going wrong because you didn't

[19:17] log one of the fields you need and now

[19:19] you can go add that log and hope that

[19:21] the next time it happens you're good

[19:23] because you're not adding a log. You're

[19:24] adding a value to the log.

[19:27] Here's an example of a good wide event.

[19:29] We have a ton of [ __ ] in here. This is

[19:32] one event with all of this stuff. One

[19:34] event, everything you need. When the

[19:36] user complains, you search for user ID

[19:38] equals whatever their ID is. And then

[19:40] you know that they're a premium

[19:41] customer. They've been with you for 2

[19:42] years. The payment failed on the third

[19:44] attempt. The actual reason is

[19:45] insufficient funds and they were using

[19:47] the new checkout flow. No grapping, no

[19:49] guessing, no second search. Yes, the

[19:51] queries you can now run with wide

[19:54] events. You're not searching text

[19:55] anymore. You're querying structured

[19:57] data. The difference is night and day.

[19:59] And if you have this all in SQL, you can

[20:01] write SQL where we can select error code

[20:05] count for events where the type is

[20:06] payment error. And now we can know how

[20:08] many times we are hitting this type of

[20:11] error. This is the superpower of wide

[20:12] events combined with high cardality,

[20:14] highdimensionality data. You're not

[20:16] searching logs anymore. You're running

[20:17] analytics on your production traffic.

[20:19] Yes, implementing wide events. Here's a

[20:23] practical implementation pattern. The

[20:24] key insight is that you should build the

[20:26] event throughout the request life cycle,

[20:27] then emit once at the end. So, we have

[20:30] this event that we create and then we

[20:32] add things to it over time. We set a

[20:35] context value of wide event so that this

[20:37] can be hit other places in the

[20:39] application. other things in this tree.

[20:43] So we adjust values on this event that

[20:45] we defined at the top change the event

[20:48] error in the error case all these things

[20:49] and at the end in the finally call

[20:52] logger.info info event when we finally

[20:54] emit it. There are a lot of caches with

[20:56] finally, so I don't love love this, but

[20:59] I get it. Ideally, you're using some

[21:01] better tooling for managing this that is

[21:04] slightly higher level or a lot more

[21:07] overhaul. Again, this is one of the

[21:09] things that is really easy with effect.

[21:11] I guess we can look at T3 chat code.

[21:13] Now, here is our actual production chat

[21:16] endpoint for T3 chat, which is where a

[21:18] lot of our errors happen. So, we have a

[21:20] lot of things in here for that.

[21:23] And here we see for example the

[21:25] validated input call where we're

[21:27] validating the request you made and

[21:29] tapping if any errors happen. And if we

[21:31] do tap an error then we annotate the

[21:33] current span with HTTP request error

[21:36] message as this error message. Now when

[21:38] we validate the input if we get an error

[21:41] we now have that and can use it

[21:44] afterwards. We annotate with the chat

[21:46] thread ID. So this is the thread that

[21:47] you're adding data to that you're

[21:49] generating message for. This is a

[21:50] message ID. So the message ID that this

[21:52] is going to be written to and the

[21:54] message ID that the user used when they

[21:56] sent this up. So we can figure out what

[21:58] the user sent in the DB where the

[22:00] results going to be written and what

[22:02] thread this was on at any point during

[22:04] this effect and its sub calls. Anything

[22:07] going on in this specific runtime

[22:09] effectively pun not intended. It is

[22:12] trivial now for us to add things to the

[22:14] span which is why we do it 42 times

[22:17] across 15 files.

[22:19] And this is the fun. And you can just

[22:20] click any example and see when an image

[22:23] is uploaded, we add the attachment key,

[22:25] the URL, and the type to the span so

[22:28] that we know what type of file you're

[22:30] trying to attach. And now if we get an

[22:32] error, and we see the errors only happen

[22:34] if the type is a webp, we have really

[22:36] useful information. And if the error

[22:38] happens somewhere much further along, we

[22:41] don't have to pass all of this info all

[22:43] the way down the chain. And I've seen

[22:44] this, too. I've seen people make a god

[22:46] object that they just pass down every

[22:48] path simply so they can log from it if

[22:51] something goes wrong and that so they

[22:53] have enough context in their logs if you

[22:55] this is where something like hotel is

[22:57] good is a standard for how you attach

[22:59] things instead so that you can just pin

[23:02] more things to an event before it fires

[23:04] that said the DX around it is bad unless

[23:07] you're using tools like effect to change

[23:09] how execution happens to make it easier

[23:12] to do things like attach data to a span

[23:14] Here's another fun one. There are some

[23:16] models that can't handle PDFs. So, we

[23:18] convert the data to markdown. But if a

[23:21] certain model fails when you give it a

[23:23] PDF, we want to know is it using the

[23:26] native model PDF parsing or is it using

[23:28] our custom parsing? Here we log whether

[23:31] or not we use the native version. Not as

[23:33] a log, but as an annotation to the span

[23:36] that we now have access to in the

[23:38] future. But that's not all we do. We

[23:40] also have effect.log log calls where we

[23:42] can log success and log error. And these

[23:45] are super super useful for how we have

[23:47] the hotel set up. Let me see if I can

[23:48] safely find an event to showcase. I just

[23:51] thought you guys should know that our T3

[23:53] chat prod instance has 5.8 billion

[23:56] records and 7.3 terab of raw text, 7.3

[24:03] terab of logs. That's not the message

[24:06] data. This does not include the messages

[24:08] users send or the responses that the LMS

[24:10] give. This is just our logs of things

[24:13] that are happening in our production

[24:15] services. 5.8 billion [ __ ] rows. Wish

[24:18] me luck not clicking things that expose

[24:20] PII. Always a fun challenge. Here's the

[24:23] hotel dashboard that Julius and Mark set

[24:25] up for keeping track of what's going on

[24:27] on T3 chat. You can see some very

[24:30] interesting things just here already,

[24:32] which is that we're getting 12,000 spans

[24:34] per minute. Absurd. But also that

[24:37] certain events are way slower. The

[24:39] average time for a generate image call

[24:41] is 60 seconds. The P95 is 1.25 minutes.

[24:45] And the P99 is nearly identical. Very

[24:48] interesting. We can click through and

[24:50] see way more information. Looks like we

[24:52] only get one of these every few minutes,

[24:54] which is good because image genen cost

[24:56] us a lot of money. But we can look at a

[24:58] specific trace and see all of the things

[25:00] that we are logging as we showed before

[25:03] in the back end. Here we see the create

[25:05] message call. This one actually started

[25:07] on the front end and we pass the span ID

[25:09] to the back end so that we can log

[25:11] between the two some data for this

[25:13] request cuz remember we're trying to get

[25:14] the whole picture for when the user hits

[25:16] the send button to the database it

[25:18] writes to to Stripe being checked to the

[25:21] result being on their screen. So we need

[25:24] to have the trace work in all of the

[25:26] places and pull it all together as this

[25:29] one event. This is just one trace in the

[25:31] end. Everything got grouped together for

[25:33] one singular event here. starts on the

[25:36] front end, the create message call, all

[25:38] of it together took a minute 17. We can

[25:41] see all of these other pieces and

[25:42] specifically we see here where it passed

[25:44] from client to backend. Here is where

[25:46] the server got the post request. It

[25:48] verified the request which only took 73

[25:50] milliseconds. It called oservice get

[25:53] user info to check the user's

[25:55] information. Get sub by user ID. This is

[25:57] us checking their subscription status

[25:59] making sure it's valid. And once we had

[26:00] done all of that, we could start

[26:02] generating the response which takes a

[26:03] lot longer. We have to resolve the API

[26:05] key if they have one. We have to get the

[26:06] model messages to get the message

[26:08] history so that we can actually generate

[26:10] the thing that they're expecting and

[26:12] then do the stream to send the data

[26:14] back. And we get all of this because

[26:15] again we are passing the span ID from

[26:17] the front end to the back end

[26:18] immediately setting it for the logs

[26:20] we're doing and then attach the right

[26:22] data at the right time and notify the

[26:25] system of these specific events when

[26:26] they happen. So here we have the

[26:28] generate chat stream response effect and

[26:30] this effect is given the string name

[26:32] generate chat stream response and now

[26:34] that it has this as this optional name

[26:36] field. It knows when we call it to

[26:39] include that in the hotel data which

[26:41] makes it so easy to see what part of

[26:42] your request is fast and slow and where

[26:44] an error might have happened. This has

[26:46] made debugging so much easier. So much

[26:49] so that if an error happens on client,

[26:51] we log the span ID so that you can send

[26:54] it to us to go check in here and debug

[26:56] it. Also, Axiom [ __ ] kicks ass for

[26:58] all of this. I have been so happy with

[27:00] them. They were my first ever sponsor.

[27:02] They have not paid me in a long time. In

[27:03] fact, they stole multiple of my

[27:05] employees, so I'm a little salty, but

[27:06] Axiom has made our lives significantly

[27:08] easier for this type of stuff. They

[27:10] handle absurd amounts of data very, very

[27:12] well. to go back to the example in the

[27:15] article that isn't so effect. This is

[27:19] all on Cloudflare because Boris works at

[27:21] Cloudflare. So there's already this

[27:22] global context object that you're

[27:24] expected to pass around that gives you a

[27:26] really good place to attach these types

[27:28] of things. So that's really cool. I

[27:30] think that's awesome. That said, I like

[27:32] the way effect does this a lot more.

[27:36] They have this example here where we

[27:37] have a request that we received. Next

[27:39] step, we add more data because the user

[27:42] was authenticated. So we add the user

[27:43] data to the event, see the event

[27:45] changing as things happen. That's the

[27:47] key. You don't log when something

[27:49] happens. You add to the event when

[27:51] something happens. And then when the

[27:52] thing is complete, the request or

[27:54] whatever, you then log the whole event

[27:56] at the end. Once the cart loads, you

[27:58] attach all that data. Once the payment

[28:00] processes, you attach all of that data.

[28:02] And when the payment fails, you of

[28:03] course attach that error data. And then

[28:05] you emit the event at the end. Awesome.

[28:08] But here's an important key piece.

[28:10] Keeping cost under control. But Boris, I

[28:12] hear you saying, "If I log 50 fields per

[28:14] request at 10,000 requests per second,

[28:16] my observability bill will bankrupt me."

[28:19] Valid concern. This is where sampling

[28:21] comes in. Sampling means you only keep a

[28:22] percentage of your events. Instead of

[28:24] storing 100% of traffic, you might store

[28:26] 10% or even 1%. At scale, this is the

[28:29] only way to stay sane and solvent. So,

[28:31] you're telling me that my 5.8 billion

[28:34] rows in Axiom isn't the right way to do

[28:36] things? Look, to be fair, the personal

[28:40] free tier gives you 500 gigs of monthly

[28:43] ingest with a 30-day retention policy

[28:46] for free. 500 gigs of text data for free

[28:48] is stupid. And if you want more and more

[28:51] retention, let's say you want a year of

[28:53] retention with a,000 gigs, 35 bucks a

[28:55] month. That makes it a lot less bad.

[28:58] There are some limits on how many things

[29:00] you can attach to spans because they

[29:03] don't want to have to index hundreds of

[29:05] different fields. Sorry, I was wrong. It

[29:08] has up to 4,096 fields. And on the T3

[29:11] chat prod instance, we're only using 59

[29:14] of the 4,096 possible fields. An upload

[29:17] thing, we went over the limit a few

[29:19] times, but in other services, we've

[29:20] stayed under a 100. Stripe has a lot of

[29:22] weird fields. So, our Stripe logging has

[29:24] 791 different fields, but you get the

[29:27] idea. It's so good and surprisingly

[29:30] cheap. That said, sampling seems like a

[29:33] good idea. Naive sampling is dangerous,

[29:35] though. If you randomly sample 1% of

[29:37] traffic, you might accidentally drop the

[29:38] one request that explains your outage.

[29:41] So again, if we just randomly sample

[29:42] requests,

[29:44] we might not see the errors that matter.

[29:47] A 10% random sampling, you have a 90%

[29:49] chance of missing any specific error.

[29:51] That is bad. So what should we do? Tail

[29:53] sampling means you make the sample

[29:55] decision after the request completes

[29:56] based on the outcome. The rules are

[29:58] simple. One, always keep errors. Two,

[30:00] always keep slow requests, anything

[30:02] above your P99. Three, always keep

[30:05] specific users like VIP customers,

[30:06] internal testing accounts, flag

[30:08] sessions, and randomly sample from the

[30:10] rest. Happy fast requests, keep 1 to 5%.

[30:13] I don't fully agree here. I think

[30:15] retention is the more important thing. I

[30:16] wish platforms didn't bill on raw ingest

[30:18] and would bill on retention because

[30:20] that's where it matters. I would say you

[30:22] should keep all requests for 7 days. You

[30:25] get the idea, though. They even have

[30:26] some sample code for this here. I don't

[30:29] love that because you have to hardcode

[30:31] the duration for above P99. Not great.

[30:34] Ideally, you're doing this on the ingest

[30:36] plane, not on the outbound one. Let's

[30:39] see what misconceptions the author

[30:40] addresses. Structured logging is the

[30:42] same as wide events. No, structured

[30:44] logging means that your logs are JSON

[30:46] instead of strings. That's table stakes.

[30:48] Wide events are a philosophy, one

[30:50] comprehensive event per request with all

[30:52] of the context attached. You can have

[30:54] structured logs that are still useless,

[30:56] like five fields, no user context,

[30:58] scattered across 20 log lines. Totally

[31:00] agree. Just switching over to JSON for

[31:02] your logs does not solve anything here.

[31:05] We already use OTEL, so we're good. No,

[31:07] we've already discussed that. This is

[31:09] just tracing with extra steps. No, this

[31:11] is a philosophy. You want wide events,

[31:13] and if they are your traces, awesome.

[31:15] Similar to what I just showed for how we

[31:16] do it with T3 chat. Logs are for

[31:18] debugging. Metrics are for dashboards.

[31:20] This distinction is artificial and

[31:22] harmful. wide events can power both.

[31:25] Query them for debugging, aggregate them

[31:26] for dashboards. The data is the same,

[31:28] just different views. Remember that

[31:30] dashboard I was just showing? We have a

[31:32] bunch of similar ones. I have the hotel

[31:34] traces production dashboard that is

[31:37] really useful for seeing what different

[31:38] trace types have different request

[31:40] times, what the average span duration

[31:42] is, and all this other useful stuff. But

[31:44] I can go break down a specific trace.

[31:47] And if a user has an error and they get

[31:49] a trace ID in the UI, they can send it

[31:50] to one of my teammates and we can go

[31:53] paste it in the trace ID search and

[31:54] immediately see exactly what happened to

[31:57] that request. It is both. I'm actually

[31:59] pumped that we have hit all of the

[32:01] important points in this article. Good

[32:03] job team. I did none of this. This is

[32:04] all Julius and Mark. Mostly Julius to be

[32:07] totally clear. Then we have the high

[32:08] cardality data which is expensive and

[32:10] slow. Sure, it's expensive on legacy

[32:12] logging systems that are built for low

[32:14] carnality search strings. Modern

[32:16] columner bases like click house,

[32:17] bigquery, etc. are specifically designed

[32:19] for high cardality, highdimensionality

[32:21] data. The tooling has caught up. Your

[32:23] practices should too. Yes, totally

[32:27] agree. We use click house for all of our

[32:30] logs for analytics stuff. I just used

[32:32] our click house deployment on post hog

[32:34] for the T3 chat wrapped feature. Axium

[32:36] built their own crazy database

[32:37] technology that's incredible. There's a

[32:39] reason they can get the prices they get

[32:40] and the performance they get. It's

[32:42] because they built their own crazy

[32:43] solution for this in particular. And the

[32:45] payoff's incredible. When you implement

[32:47] wide events properly, debugging

[32:48] transforms from archaeology to

[32:50] analytics. This feels all written.

[32:52] Instead of the user said checkout

[32:54] failed, let me grap through 50 services

[32:56] and hope I find something. I've been

[32:58] there way too many times. I'm so

[32:59] thankful I don't have to be there

[33:00] anymore. Now you get, "Show me all

[33:03] checkout failures for premium users in

[33:04] the last hour where new checkout flow

[33:06] was enabled, grouped by error code. One

[33:09] query, subsecond results, root cause

[33:11] identified. Your logs stop lying to you.

[33:13] They start telling the truth. the whole

[33:15] truth. As a super generous offer, Boris

[33:17] closes this out with a crazy offer. Fill

[33:21] out this form and he will tell you

[33:23] what's working, what's not, and where

[33:25] you can save money with your stack. I

[33:27] consider doing a stack roast thing like

[33:29] this.

[33:31] But it's so much work. I wish him luck.

[33:35] So cool, though. Good questions, too.

[33:38] Like, how big is your team? What

[33:40] languages are you using? What platforms

[33:41] are you using for your compute? What

[33:43] databases are you using? If you check

[33:45] other, does it not have a field to put

[33:46] in convex? Come on. Convex is also my

[33:49] compute layer. What data are you

[33:50] collecting? What observability tools are

[33:52] you using? Look at that. Axiom made it

[33:53] in. Incident management with pager duty,

[33:56] data dog, all those. You get the idea.

[33:58] What coding agents do you use? And

[34:00] what's your monthly observability spend,

[34:02] log volume, number of services, etc.

[34:05] Super super cool. This article was

[34:08] incredible. And Boris is such a bro for

[34:11] writing it, sharing it, and making

[34:13] offers like this. I highly recommend

[34:14] giving him a follow if you haven't. A

[34:16] link to his Twitter and the article is

[34:17] in the description as always. That's all

[34:19] I have to say on this one, though.

[34:20] Curious how y'all feel. Was this as cool

[34:22] as I thought it was? I know logging is

[34:24] not the most popular topic, but doing it

[34:26] right is essential for building good,

[34:27] stable production services. And I think

[34:29] we can all learn something from this

[34:31] type of work. I'm so thankful for my

[34:33] team for getting this all right so my

[34:35] dumb bad console log practices aren't

[34:37] affecting us in production anymore.

[34:39] Curious how y'all feel though. Are you

[34:40] excited to go fix your logs or are you

[34:42] annoyed you just watched however long of

[34:43] a video this is all about logging? Let

[34:45] me know how you feel. And until next

[34:47] time, peace nerds.