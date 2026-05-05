---
title: "Ralph Loops: Build Dumb AI Loops That Ship — Chris Parsons, Cherrypick"
author: "AI Engineer"
source: "youtube.com"
url: "https://www.youtube.com/watch?v=2TLXsxkz0zI"
date_saved: "2026-05-05T02:25:08.314Z"
---

# Ralph Loops: Build Dumb AI Loops That Ship — Chris Parsons, Cherrypick

[0:14] Welcome. So, this workshop is on Ralph

[0:20] loops. Uh, hands up here who knows what

[0:22] a Ralph loop is. That's almost everyone.

[0:25] I'm guessing that the other folks who

[0:27] came in were just here because they

[0:28] thought that sounded weird or or maybe

[0:31] looking for a quiet place to work. I

[0:32] don't know, but you're very welcome. So,

[0:35] what we're going to do today, this is a

[0:36] two-hour workshop. We're going to uh if

[0:39] you could just kind of um make a little

[0:41] bit of space if you need to as people

[0:42] are coming in, that would be really

[0:43] helpful. Thank you. This is a two-hour

[0:44] workshop. We're actually going to build

[0:45] Ralph Loops together. We're going to do

[0:47] this together on our own laptops in

[0:49] order to uh to make some stuff happen

[0:52] and get some things done. So, so it's

[0:54] not just about theory. This is a very

[0:56] practical thing. So, if you've got a

[0:57] laptop, you're welcome to get it out in

[0:58] a second. We're actually going to try

[1:00] and do this ourselves. Uh, so, uh, I I

[1:03] have a few slides, but not many. Most of

[1:04] this is going to be live demos and kind

[1:06] of interaction, um, points as well. Um,

[1:08] and the idea is at the end of this, you

[1:11] should be able to leave with something

[1:12] that works that we'll uh, we'll apply it

[1:14] to a kind of toy codebase uh, just for

[1:16] fun uh, to create a Pomodoro timer. But

[1:20] uh but hopefully the idea is that you'll

[1:22] be able to use this on your real work

[1:23] when we get uh when we get done. So

[1:26] another show of hands. Okay. Who is

[1:29] using Claude code or codeex specifically

[1:32] to write code? Hands up. Oh, quite a lot

[1:35] of people specifically to write code.

[1:37] Okay. Who is using it to write all their

[1:39] code? Who is no longer writing any code?

[1:43] That's quite a lot of people. Look

[1:44] around for a minute. That that is a huge

[1:46] change. If I'd asked a bunch of

[1:48] programmers six months ago who was not

[1:49] writing any more code, you'd get a very

[1:51] different answer. Uh so next question,

[1:53] who is using either claude code or

[1:55] codeex? Um and I'll include cursor here

[1:57] as well in their non-coding work.

[2:01] Okay, quite a lot of you. What about for

[2:03] all your normal non-coding work?

[2:06] Okay. Interesting. Interesting. So can

[2:09] you just see the future um in the room?

[2:11] Right. There's a few people who are

[2:13] starting but we're still on that journey

[2:15] for sure. And who has built Ralph Loops

[2:17] before? Last show of hands. One or two

[2:20] people. Okay, great. I'm going to be

[2:21] looking to you for all the answers. Um,

[2:23] so that's great. So, uh, just a little

[2:26] bit about me. My name is Chris Parsons.

[2:28] Um, these days I spend most of my time

[2:30] trying to help, uh, teams like the team

[2:32] I used to run figure out what on earth

[2:33] to do with AI mostly. So, uh, I'm a CTO

[2:36] by background. I've done a couple of BC

[2:38] back startups and scaleups and uh this

[2:40] has taken uh me and my friends by storm

[2:43] rather and we are trying to still all

[2:45] figure it out professionally together in

[2:47] terms of how to help our teams adopt and

[2:49] use AI. So that's what I do for a living

[2:51] these days. I have about 30 years or so

[2:53] of building software professionally been

[2:54] the CEO of an agency. I've done a lot of

[2:57] agile consulting remember that uh and

[2:59] that kind of training as well back in

[3:01] the day. And uh and funnily enough all

[3:03] of those it's a whole another talk. all

[3:05] of those uh principles and practices

[3:07] that we taught for years and no one

[3:08] really listened were are still very much

[3:11] applicable um to AI. So, so there we go.

[3:14] Um so these days I'm actually running

[3:17] Ralph loops all the time, 24 hours a day

[3:20] to get my work done. So I'm I'm using

[3:22] them to write my emails. I'm using them

[3:24] to check my calendar. I'm using them to

[3:26] write content and newsletters. I'm using

[3:28] them to help me do my client work. So

[3:30] I'm using them in absolutely everything.

[3:32] I also use them for code which is what

[3:33] we're focusing on today but they are

[3:35] very much applicable to every part of

[3:38] our lives. So by the end of the day the

[3:40] idea is that you will be in the position

[3:42] where you can do that too. Uh so this is

[3:44] how I used to work with AI until quite

[3:46] recently. Uh you probably can't see that

[3:48] very well. This is an N10 workflow uh

[3:51] that I used in order to create my weekly

[3:53] newsletter. It took me uh probably a

[3:56] week to write let alone actually test

[3:58] and debug. Uh, it's got a huge number of

[4:01] different things in here. This this is

[4:02] like a a featured article flow which

[4:04] would read various different articles

[4:06] from my blog and figure out whether I

[4:08] posted it before, summarize it using AI

[4:10] and put it there. And then there's

[4:11] another one for grabbing uh links that

[4:14] I'd posted into a particular list and it

[4:16] kind of did a bit of commentary on that.

[4:17] It was really quite complicated and and

[4:20] difficult to run and maintain. And it

[4:22] kind of worked okay, except that 2 p.m.

[4:26] on a Monday, pretty much every Monday, I

[4:28] would get the dreaded notification from

[4:30] NA10 that my workflow had failed. And I

[4:31] was just like, "Oh, no." And then I'd

[4:33] have to go in and figure out in here

[4:36] what whatever had broken and try and run

[4:38] it and fix it. Now, this is nothing

[4:40] against NA10. NA10 is a really cool tool

[4:42] and it can do some really cool things.

[4:44] And I'd never have been able to

[4:45] orchestrate AI in the way that I was

[4:48] doing before without a tool like N810.

[4:50] despite being a coder, it's just so much

[4:52] easier to manage in here. And you can

[4:54] manage all the API keys really easily,

[4:56] and it's it's a nice tool to to stick

[4:58] things together, but it was so brittle

[5:01] to use at this kind of level of

[5:02] complexity. And I didn't get a huge

[5:04] amount of value out of it. Um, and then

[5:06] every time I fixed it, I would do

[5:08] something else. And so, honestly, it was

[5:10] probably easier for me to just write the

[5:12] newsletter than it would have been to

[5:14] maintain the thing that wrote the

[5:15] newsletter. And I probably had a

[5:17] slightly better newsletter. Uh, so this

[5:19] wasn't great. Um but but this was to my

[5:21] mind a few months ago the really the

[5:23] only way to use AI. You had to kind of

[5:25] orchestrate it and manage it, give it

[5:27] the right data and kind of handle all

[5:28] the context. And I thought that this was

[5:30] the future of automation, but it isn't

[5:33] really the future of automation. The

[5:35] future of automation is a lot more like

[5:36] something like this uh running in clawed

[5:39] code. So this is obviously not the

[5:41] actual skill, but um I have now in

[5:43] clawed code a skill that writes

[5:45] newsletters for me and it has all of

[5:47] those instructions. In fact, I copied

[5:48] and pasted the NA10 JSON code from there

[5:51] into claw code and said, "Write a skill

[5:54] based on this flow, and it did a great

[5:55] job." Um, and then what it does is it

[5:57] goes through and does all of the things.

[5:59] But what's interesting about that is how

[6:01] does claw code work? Well, it reads the

[6:03] first thing, it decides on the next

[6:04] step, and then it reads the next bit,

[6:06] and then it decides on the next step,

[6:07] and it kind of works through over some

[6:09] minutes to actually write and produce

[6:12] the newsletter that I was writing. And

[6:14] it's the same for code. It's the same

[6:15] for anything that we want to build using

[6:18] claw code. Claw kind of just takes care

[6:20] of it. You describe the kinds of things

[6:22] you want and it does it. Now what's

[6:24] interesting is that clawed code

[6:26] fundamentally is running on a loop,

[6:28] isn't it? It just reads the skill, calls

[6:31] a tool, goes back to the beginning,

[6:33] reads the skill again, calls a tool,

[6:34] calls a tool, and then at some point it

[6:36] figures out that it's done and it stops

[6:37] and it gives you your newsletter in

[6:39] whatever form you want it in. Um, so

[6:42] what's interesting is that this ships

[6:44] much better, more coherent newsletters

[6:47] than the previous uh the previous

[6:49] workflow. I still have to change them,

[6:51] write them, screw around with them, but

[6:53] but they are uh they are a much better

[6:55] first draft than they ever were. And I

[6:57] haven't really touched this skill. All I

[6:58] really do with this skill is I say at

[7:00] the end of a newsletter writing process,

[7:02] please just update the skill with

[7:03] anything you can figure out from the

[7:04] session you should have done

[7:05] differently. And it makes the odd tweak

[7:07] here and there. Um so that's a loop that

[7:11] is this kind of form of working in loops

[7:14] with AI. So so agents that originally

[7:18] start in workflows where you have quite

[7:21] complicated orchestration that looks a

[7:23] bit like something hellish like this end

[7:26] up in quite a simple loop perhaps with a

[7:28] bit better context. Now this didn't work

[7:31] for the longest time but it's now

[7:32] beginning to work with the latest models

[7:34] and by latest model I really mean GPT

[7:37] 5.8. X really GPT 5.12 onwards uh and

[7:42] Claude Opus 4.6 or Sonnet 4.6 upwards.

[7:45] So those models uh started emerging

[7:47] around about uh the end of November. Uh

[7:50] I have no idea about Mythos by the way.

[7:52] I I've spoken to people who've used it

[7:54] and they say it's it's it's good, but

[7:56] it's mostly marketing, but we'll see. Uh

[7:58] but um but yes, uh we'll see what that

[8:01] where that takes us. Maybe we won't even

[8:02] need skills. Maybe we'll just say write

[8:03] a newsletter and it'll do it. Who knows?

[8:05] Um, but what what I'm trying to my my

[8:07] point is is that rather than using

[8:09] complicated workflows, we're actually

[8:11] using skills and loops much more in

[8:14] context and loops. And any kind of agent

[8:16] that we run is in some way a loop

[8:19] already. Okay. And this kind of powerful

[8:22] looping construct is something that you

[8:25] can more generally apply. Um so what

[8:27] happens when we take loops a little bit

[8:30] further? So um the first stage um is

[8:35] this idea or the first idea came from

[8:37] Jeffrey Huntley uh a little while ago

[8:40] you know ancient times in AI which means

[8:42] probably about last June and he said

[8:45] basically what we should do is whenever

[8:47] we finish using an AI to do anything we

[8:49] should just try the thing again in some

[8:52] way we should just uh just give it

[8:54] exactly the same prompt and see what

[8:56] happens see what it does again uh and it

[8:59] sounds it sounds a bit stupid and it's

[9:00] based on. Does anyone know where this

[9:02] story comes from? Who knows why it's

[9:04] called a Ralph loop? Like two people.

[9:07] It's called a Ralph loop because of

[9:08] Ralph Wigum, which is a Simpsons

[9:10] character who basically says um the uh

[9:14] he just tries the same thing over and

[9:15] over and over again and eventually it

[9:17] works. Um and it's all it is really. All

[9:19] all that a Ralph loop is is uh build

[9:23] this thing or do this thing inside a

[9:25] prompt. Then the AI goes away and does

[9:26] the thing and then it finishes and says,

[9:28] "Okay, I've done the thing." And then it

[9:30] says, "Okay, great. Go and build this

[9:32] thing." And you know, and do all of the

[9:33] things I said to build this thing. And

[9:34] it goes, "Oh, okay. I'll do it again."

[9:36] And and the the groundbreaking nature of

[9:39] what that meant was that the uh AI would

[9:43] often review its code and realize it had

[9:46] missed something in some way, right? So,

[9:48] it figured out that uh there wasn't it

[9:52] wasn't quite finished. And this is quite

[9:53] a common problem with AI coding tools

[9:55] last year. It wasn't quite done. it

[9:58] didn't quite get to the end and

[9:59] therefore it go oh yeah I should have

[10:00] fixed that bit and then does it again

[10:02] and then and then when it stops and says

[10:04] right I'm definitely finished now 100%

[10:06] it's done it's finished and then what do

[10:08] you do you give it another prompt again

[10:09] say go away and build the feature it's

[10:10] like I've built the feature and tries

[10:11] and looks again oh yeah there was

[10:12] actually this tiny thing that I should

[10:14] have done I really am now finished and

[10:16] so on and so on so you can kind of see

[10:17] the utility of kind of going through

[10:20] that loop um where you just build the

[10:22] feature and just then ask it to build

[10:24] the feature and then you ask it to build

[10:25] the feature um So, so that's kind of the

[10:28] first stage of RF loops. And what I'd

[10:29] like us to do is I'd like us to try

[10:31] that. So, firstly, I'm going to uh do a

[10:33] bit of live coding. Hold on to your

[10:34] hats. Uh we'll see how that goes. And uh

[10:37] we're going to try and do that process

[10:39] using claude code to see where that

[10:41] takes us. So,

[10:43] um let me

[10:47] start change what I share.

[10:54] Sorry, just takes a moment.

[10:58] Okay,

[11:00] great.

[11:02] Uh, this one, can everybody see that?

[11:04] Okay, can people see that in the back?

[11:06] Okay, do you want me to increase the

[11:08] size? Got thumbs up. Great. Okay, so

[11:11] this is a piece of code that I vibe

[11:13] coded in about three minutes last night.

[11:15] So, it's not good, but we'll that's the

[11:16] whole point. We're going to fix it. Um,

[11:18] so it is literally a Pomodoro timer, and

[11:20] you can see how it works. So, if I go to

[11:21] Python and type Pomodoro

[11:24] start, woohoo, we've got a Pomodoro

[11:26] timer. Uh, that's all it does. It

[11:28] literally just does start. There is no

[11:30] way of finding out whether it's finished

[11:32] or complete or anything like that, but

[11:34] that's what we're going to change. Um,

[11:36] the other cool thing which is very

[11:37] important for any self-respecting

[11:39] vibecoded AI project is that it has

[11:41] tests. So, look, it's got a test.

[11:44] There's one test and the check to see

[11:46] whether it starts. So, that's great. So,

[11:47] if we just have a quick look, and you'll

[11:49] have to forgive me if you're not a Vim

[11:50] fan because I am. Um, we although I

[11:53] hardly use it now, it's quite sad, you

[11:55] know, 20 years of muscle memory just

[11:56] gone. But, um, but yes, so all it does

[11:58] is it literally just runs a start

[12:00] command and then it saves in your

[12:02] Pomodoro uh Pomodoro in your home

[12:04] directory. It saves the time in which

[12:06] you started. Really, really simple. So,

[12:08] this is a very simple, quite

[12:11] straightforward project. The difference

[12:13] is that it has a new folder with

[12:15] different things in it. And these are

[12:17] tickets. So there are a whole bunch of

[12:19] ways in which we could improve this

[12:21] pomodoro timer. Um and the first ticket

[12:24] is it would be really nice to know how

[12:26] long is left on our pomodoro rather than

[12:28] just starting it. Um so I' what I've

[12:30] done is I've created a very simple

[12:32] ticket system to allow us to just kind

[12:34] of capture some changes. These are not u

[12:37] this was oneshotted. So I have no idea

[12:38] if these tickets are actually good. In

[12:39] fact, I haven't looked at some of them.

[12:41] So we'll see how that goes. But um but

[12:43] the idea is that uh we can use these in

[12:46] order to start building a loop of work

[12:48] in order to get something done. So um

[12:51] what I'm going to do to start with is

[12:52] I'm going to start Claude and I'm

[12:54] literally going to say write the first

[12:56] ticket. So bear with me while Claude

[12:59] fires up.

[13:02] In some ways I'm quite glad they didn't

[13:04] actually release Mythos yesterday

[13:05] because I think I don't think it would

[13:07] be working today if they did. Uh that is

[13:10] really not working, is it? That's

[13:11] frustrating.

[13:18] >> Wow.

[13:22] Let's try again.

[13:30] >> There's a problem with Wi-Fi.

[13:32] >> Oh, okay. I mean, that could cause some

[13:35] problems to my talk, but we'll have to

[13:36] see how that goes. I don't have one of

[13:38] those fancy new um Macs that allow you

[13:40] to run. No, this has actually locked up

[13:42] my computer. Can you believe that? It

[13:44] was working literally 10 minutes ago.

[13:46] Uh let me just have a look. Uh bear with

[13:49] me while I debug my machine.

[13:53] >> Um there is um I've got I think I'm on a

[13:57] different Wi-Fi, so it should

[14:00] uh No. Yeah, the Wi-Fi has gone down.

[14:04] fun

[14:05] >> tethering time

[14:06] >> might have to be. Okay, hang on a second

[14:08] while I tether to my phone, which I

[14:11] think has decent 5G, so we should be

[14:13] good. Okay, let's see if that's any

[14:15] better.

[14:19] >> Hooray.

[14:22] Okay, let's try again. Uh, not that one.

[14:24] Um, cool. So, uh, code Pomodoro

[14:27] workshop. Okay, is that big enough?

[14:30] >> Okay, good. Let's try this Claude via

[14:33] the power of 5G. Look at that. It works.

[14:36] Fantastic. Okay. So, um, what I'm going

[14:38] to do is we have, as I said, a very,

[14:41] very simple, stupid Pomodoro timer. And

[14:45] we're going to implement a ticket. So,

[14:47] what I'm going to do is I'm going to say

[14:48] implement

[14:50] this ticket. So, it's in doc tickets

[14:53] 001.

[14:55] Great. And I'm just going to say that.

[14:57] See what happens. So, what's going to do

[14:59] is going to read the ticket, which I

[15:01] showed you briefly earlier. It's it's um

[15:03] very straightforward. And all it does is

[15:04] it implements a status to see how far

[15:07] we've got. Um and then what I would like

[15:09] it to do, what I'm going to do after

[15:11] this is I'm then going to say when it's

[15:13] done because it will literally be two

[15:14] files. It's not going to be difficult

[15:15] for it to do. And then I'm going to say,

[15:17] you know, implement it again and see

[15:19] what happens.

[15:21] So, there's a few different ways that

[15:22] you can do this. Um and there is no kind

[15:25] of one set way of doing a Ralph loop.

[15:27] It's really about the concept, not about

[15:29] anything else. Great. So, it's done the

[15:31] ticket. If I just quickly do a quick get

[15:33] diff, you can see that what it did is it

[15:35] added a status command. I think when I

[15:37] had a show of hands earlier, most of you

[15:38] are coders. So, hopefully this is not

[15:40] tricky to follow. And then we've got a

[15:42] new test. Look at that. We've added a

[15:43] test. It didn't even ask it to. It added

[15:45] a test. Oh my gosh, what is the world

[15:46] coming to? So, um, now what I'm going to

[15:49] do is I'm literally going to say the

[15:50] same thing. Now, a year ago, this would

[15:52] have been really important step because

[15:53] it would have definitely missed

[15:55] something. Um whereas now it's like you

[15:58] already done it. It's fine. Right? So

[16:00] Opus is now much better at at noticing

[16:02] when things are done. Now a traditional

[16:04] Ralph flute would just keep doing this,

[16:05] right? And it would keep going with this

[16:07] kind of implement this ticket, implement

[16:08] this ticket, implement this ticket. And

[16:10] um and this is kind of boring and it's

[16:13] not really going to do very much else.

[16:15] Um and at some point actually when I

[16:17] tried this earlier, uh it's interesting.

[16:19] It's done something different. It

[16:20] actually noticed that what it should

[16:21] have done is it actually should have

[16:23] updated the status to done. So the

[16:24] process worked that didn't work earlier.

[16:26] Uh so that's great. So it's actually

[16:28] noticed something that it didn't do. So

[16:30] there you can see the fundamental early

[16:32] principle of early Ralph loops, right?

[16:34] The idea that you can just zoom through

[16:36] and and do something and it will find

[16:38] things eventually that it missed.

[16:39] Because it missed that. I'm just going

[16:40] to try once more, but I don't think it

[16:42] will come up with anything else. Um like

[16:44] I said, latest models really don't need

[16:46] this step in quite the same way. Um they

[16:49] they tend to just kind of get it done.

[16:50] In fact, this time it's just like, um,

[16:52] oh, if you're running a Ralph loop that

[16:54] picks up the next ticket.

[16:57] Oh, that's hilarious. It's literally

[16:59] giving away my presentation. Um,

[17:03] that's fantastic. Okay. Um, what I'd

[17:05] like us to do is I think as a starting

[17:07] point, the other thing you can do is you

[17:09] can just kill the context and then you

[17:11] can do the same thing again and you can

[17:12] say implement doc tickets 001. And I

[17:15] can't bother to spell it. It'll find it.

[17:17] Um, and then, um, so now, uh, what I'm

[17:21] doing is basically doing the same thing,

[17:22] but without it knowing about the

[17:23] previous context. So, it' be quite

[17:25] interesting to see what it does with

[17:26] this. I'm assuming it'll find assuming

[17:29] it found the ticket. Yeah, it did find

[17:30] the ticket. That was easy enough for it

[17:32] to do. It's just running the test to

[17:33] make sure that they work. And it all

[17:35] passes. Okay. So, it's happy. So, some

[17:37] people when we when we first started

[17:39] using Ralph Loops is that they weren't

[17:41] doing it within the same status. And uh

[17:43] there was an early claw code plugin that

[17:45] just on the stop hook which is which is

[17:47] what runs right now when it stops

[17:49] running it would just do the same

[17:50] command again. And so rather like me

[17:52] just typing the same thing in each time

[17:54] but that didn't really work very well

[17:55] because it didn't get very far. Whereas

[17:57] uh now what's um more useful or or what

[18:00] people started doing was just running

[18:01] claude code in a kind of loop. So they

[18:03] would do something like while true um

[18:06] and then do claude

[18:08] um implement ticket 001,

[18:13] right? And then done. And then that will

[18:15] just go through. Uh not quite actually

[18:16] because I didn't do claude P, but

[18:18] effectively that's that's what they were

[18:20] doing. Um oh no, now I've really screwed

[18:22] it up. I really shouldn't have press hit

[18:24] enter on that, should I? Okay, there we

[18:26] go. So that's but that's effective what

[18:29] people were doing. The dumbest Ralph

[18:30] loop is literally that just a while loop

[18:33] and it just goes through and implements

[18:34] stuff super super easy. Um so um what is

[18:39] the next step in a RA loop? Well, in

[18:41] fact what we're going to do now is I'm

[18:43] going to get you to get to that point

[18:45] and then I'm going to take questions

[18:46] from other folks. So um let me just

[18:49] switch to

[18:50] back to here. I'm hoping. There we go.

[18:52] Yeah, great. Um, so what I'd like you to

[18:55] do if you could crack open your laptops

[18:58] and um, grab the code from here. So, um,

[19:00] it's just on my GitHub uh, as Pomodoro

[19:02] workshop. You should be able to find

[19:03] that quite easily. Um, and you saw how I

[19:06] ran it. It's very simple. Uh, you might

[19:08] need to set up Python in your machine.

[19:10] So, there's hopefully that won't be too

[19:11] hard or you just run bare Python.

[19:14] Pomodoro.py will give you the command

[19:16] you can type and then it's um, just a

[19:18] unit test thing to run the test

[19:20] pomodoro. Super easy. And then in step

[19:22] four, I want you to fire up Clawed Code

[19:24] or Codeex and I want you to try and

[19:26] build that ticket and make sure that

[19:27] it's working. Um, and that will be a

[19:30] great starting point. Um, but don't

[19:31] build any more tickets yet. Don't don't

[19:33] let it take you too far. And then, uh,

[19:35] if you are really used to that and that

[19:37] is just like a literal no-brainer for

[19:39] you, try in codeex, try in something

[19:41] else. Try in maybe try setting up

[19:44] something similar in one of your own

[19:46] projects. Um, so something different.

[19:48] So, I'm I'm going to take questions now

[19:49] while people are typing away on that.

[19:51] I'm going to give you maybe a few

[19:52] minutes just to get that set up and then

[19:53] we'll kind of move on to the next step.

[19:55] Does anyone have any questions or

[19:57] comments or thoughts? I have a

[19:59] microphone here.

[20:01] Uh if people would like to ask anything.

[20:03] Yeah,

[20:07] there we go.

[20:10] >> It should come on in a second.

[20:13] >> Hopefully,

[20:15] the guys at the back are

[20:18] It may not be on. Is it on?

[20:21] >> Yeah, you could shout and I repeat.

[20:23] Yeah, that could work.

[20:24] >> Is it? Can I just check it's on first?

[20:29] >> Yeah, it looks on. That's weird. Shout

[20:30] and I repeat. Anyway, oh, there we go.

[20:32] There we go.

[20:33] >> Great.

[20:33] >> Um, I've I've played a bit around with

[20:36] the BMAD method, which I don't know

[20:38] whether you've seen that. Um he's got a

[20:40] guy a guy who's basically written a

[20:42] whole load of skills and commands for

[20:45] following a full agile process from

[20:48] >> you know and he's got an agent for build

[20:51] it test it

[20:53] >> you know everything and and I I guess

[20:56] >> so

[20:58] um have have you done anything where

[21:01] sort of using this kind of Ralph loop

[21:03] process you go through that cycle you go

[21:05] through the full software development

[21:07] life cycle of each stage and then Yes.

[21:10] Um I I might get as far as that at the

[21:13] end. Um but yes, I have tried some of

[21:15] that stuff. Um it's really interesting

[21:17] and it answer it asks some really very

[21:20] good questions both around context and

[21:25] and actually the value of the work. It's

[21:27] really interesting. So yeah, we'll talk

[21:29] about maybe that a bit more at the end.

[21:30] So ask again if I haven't got to it,

[21:32] just ask the same question again and

[21:33] we'll get there in a raffle.

[21:35] >> Okay. Thank you.

[21:35] >> Um anybody else got any questions?

[21:38] How are people getting on with setting

[21:40] that up? Have has anyone managed to set

[21:41] it up? You know, kind of wave at me if

[21:43] you've managed to get it running. Great.

[21:44] Great start. Has anyone managed to

[21:45] implement the first ticket? Hooray. A

[21:48] few people. You got a question?

[21:50] >> Oh, go. You've done it. Great. Fab.

[21:51] Yeah, I probably should have given

[21:52] different directions for asking a

[21:54] question versus having finished. That's

[21:56] great. So, a few people have got

[21:57] started. Fantastic. Great. So, you can

[22:01] probably tell where this is going. And

[22:02] if you were paying attention to the live

[22:03] demo, you'll already know the answer.

[22:05] I'll grab the mic from you so you don't

[22:06] have to keep holding that. Thank you.

[22:08] Um, but yes, you don't have to just stop

[22:12] at one ticket. Now, is Matt PCO happen

[22:15] to be in the room? I know that he's

[22:18] doing the workshop after this one. He is

[22:19] the person I got this from. So, if he's

[22:21] watching the video, thank you, Matt. Uh,

[22:23] this was a this was a a revelation to me

[22:25] back in sort of September last year.

[22:26] Posted a brilliant YouTube video just

[22:28] about exactly how to kind of take Ralph

[22:30] loops to the next level because when

[22:32] they first came out, I spotted it on the

[22:34] internet. I played with it and I was

[22:35] like, "Yeah, this is fine. It's kind of

[22:37] cool. It kind of spots things that AI

[22:39] can do where where it's missed things

[22:41] and it can maybe do a slightly better

[22:43] job of things, but it's not going to

[22:44] change everything that I do. Um, and

[22:48] then the answer is actually it does

[22:49] change the entire way that I work and

[22:52] approach code now. So, um, I guess the

[22:56] the really interesting thing is not how

[22:58] do I make sure Claude has finished this

[23:00] one thing. It's what happens if I point

[23:02] this kind of loop at a whole pile of

[23:05] things to do, right? What happens when

[23:07] we point at a whole list of things? Now,

[23:10] I tried this. I I wrote a blog post

[23:13] about this, which was a bit depressing

[23:14] because it just showed abject failure in

[23:16] the entire post to be honest, but it was

[23:18] more about I tried what I tried to do is

[23:20] I tried to get um Claude, I think it was

[23:23] Claude at the time, to break up a big

[23:25] project into a lot of different tickets.

[23:27] And then I got it to break down all of

[23:29] those tickets into smaller tickets. And

[23:30] then I got it to to figure out what all

[23:32] the dependencies were between those

[23:34] tickets and write them all down really

[23:35] carefully. And then I got it to figure

[23:38] out how I it could use like a ton of

[23:40] different agents. Sorry. Did you have a

[23:41] question?

[23:52] Uh one, two, one, two. Okay. I have a

[23:54] problem with I had a problem with Wi-Fi

[23:56] and I didn't do the clone.

[23:58] >> Oh, I'm sorry. Go to this one.

[23:59] >> Yeah. Yeah. Couple of minutes. Yeah.

[24:00] Thank you.

[24:01] >> Yeah, that's fine. I'll leave it on

[24:02] there. That's fine. Um has everyone

[24:04] appreciated the slide. Okay, good. Okay,

[24:06] there we go.

[24:07] >> Um so, um these slides, by the way, are

[24:10] created using a slide skill using Nano

[24:12] Banana Pro. It's absolutely incredible

[24:13] at making slides. Um, I didn't I haven't

[24:16] apart from like the tiniest thing like

[24:19] adding a QR code, I haven't added any

[24:21] text to these slides. They're just flat

[24:23] images in Google Slides. Um, they're

[24:25] actually it's incredible at making

[24:27] slides. Um, what was I saying? Yeah. So,

[24:29] uh, so the idea of just creating

[24:33] uh a a Ralph loop to just do one thing

[24:35] seemed a bit pointless and and it was

[24:37] just working around a few limitations.

[24:39] If you point this loop on a whole pile

[24:42] of work, then it becomes incredibly

[24:45] uh powerful. And as I was saying before,

[24:48] I created this huge complex dependency

[24:51] graph with a whole ton of different

[24:52] tickets about how I was going to build

[24:54] this really complex system for me. And

[24:56] then I got I fired up like six or seven

[24:59] parallel agents and I was like, "Right,

[25:00] you do one stream and you do that stream

[25:02] and you pick up this ticket." And it

[25:04] just failed horribly because the the

[25:06] system just couldn't figure out what had

[25:08] been done and what hadn't been done.

[25:09] Picked up there was lots of contention

[25:10] between tickets like well I can't do

[25:12] anything until you until I get that

[25:13] share ticket done so I'm going to do it.

[25:15] And another Claude was like well I can't

[25:16] do anything until that share tickets

[25:17] done so I'm going to do that too. And

[25:18] then they both implemented the same

[25:20] thing and it was a huge mess. So that

[25:22] was really very depressing and I wrote a

[25:24] whole thing about it and I was basically

[25:25] like it's impossible to orchestrate

[25:28] large numbers of agents you know you

[25:29] just can't do it which was obviously

[25:31] nonsense but um that's how I felt at the

[25:33] time and what was interesting was that

[25:35] what I'd done effectively was recreate

[25:39] the waterfall processes that were seen

[25:40] in some of the worst companies back when

[25:43] I was starting to code for myself in the

[25:45] 90s where people would write

[25:47] requirements documents that you had to

[25:48] stagger to carry into the the

[25:50] requirements meetings.

[25:51] uh where the the entire project was

[25:54] specified up front with all the

[25:55] intricate dependencies handed to the

[25:57] development team and then given two

[25:58] years to build. I can see some perhaps

[26:01] um slightly more seasoned people in the

[26:03] room sort of nodding and smiling at me

[26:05] when when they hear me talk about this

[26:07] but yeah I thankfully managed to avoid

[26:09] working on any of those teams but I some

[26:11] of my friends did and it was absolutely

[26:13] awful. And what I had done is basically

[26:15] I had given that to Claude to do. I'd

[26:17] given that waterfall process to Claude

[26:20] to to um to organize and figure out as

[26:23] as it went, which was really bad. So no

[26:25] wonder it didn't work. If humans can't

[26:27] do that, how was how is AI supposed to

[26:28] do any better? Um however, if instead of

[26:32] saying with all of your tickets, right,

[26:35] the first one is the most important,

[26:36] then this one, and then you should do

[26:38] this one, but don't think about this one

[26:39] until you've done that one. Instead of

[26:40] doing that, I'm going to go back for

[26:42] just a minute. Are we all good with this

[26:43] slide? By the way, does anyone still

[26:44] need the slide? Okay. Okay, we're good.

[26:47] Right. Uh instead of doing that, you can

[26:50] just run a loop where you say something

[26:52] like, "Hey, just pick the next most

[26:55] important ticket."

[26:57] It's as simple as that. Just figure out

[26:58] here are all the tickets. Just figure

[27:00] out what is the most important next one

[27:02] to run. Okay? You don't have to worry

[27:04] about the dependencies. You don't have

[27:05] to figure it out yourself. the AI is

[27:07] quite capable of looking at all of them,

[27:09] figuring out the dependencies on the fly

[27:10] based on what's just been done and

[27:13] figuring out what the next most

[27:15] important thing to do is. That's

[27:16] actually quite easy for an AI to do. The

[27:19] one thing it cannot do so easily is

[27:21] manage that process in parallel. But to

[27:23] be honest, when we're running these kind

[27:25] of loops, if you're running them

[27:26] continually, the bottleneck is usually

[27:28] not the number of agents. It's usually

[27:29] you just keeping up with the AI just

[27:31] doing things over and over again. So

[27:33] let's forget parallelism just for a

[27:34] minute and just start with a loop. See,

[27:36] if you can keep up with an AI, just one

[27:38] AI that's running continuously, you're

[27:40] fine. Don't worry about parallelism just

[27:41] yet. Don't worry about gas town, any of

[27:42] that stuff just yet. As impressive as

[27:44] those projects are, you can just start

[27:46] with a simple loop. It is okay. So, um,

[27:48] what I'd like you to do again at this

[27:50] point is I'm going to quickly show how

[27:53] this works for those of you um, who

[27:55] don't have your laptops, but then I'd

[27:56] like you to just try it on your

[27:58] computer. So again, let me find my mouse

[28:03] and then move to

[28:08] sharing my screen again. Okay,

[28:13] great. So if I go back to Claude, in

[28:16] fact, I'll go back to Vim first and look

[28:17] at the tickets folder. So I've got a

[28:19] whole bunch of tickets here. I've got a

[28:21] status command, I've got a stop command,

[28:23] I've got custom durations. Never use

[28:25] that anyway. I use um other things like

[28:28] you know labels and all of that. Um I

[28:30] could try and figure out the

[28:31] dependencies myself but I really just

[28:32] don't need to. I can just simply go into

[28:34] Claude and say implement the next most

[28:39] important ticket using

[28:42] uh TDD

[28:45] principles

[28:48] from doc tickets.

[28:52] um commit

[28:55] when done. Something like that. Okay.

[29:02] So, let's see what it does.

[29:08] So, it's now reading a whole bunch of

[29:09] tickets. As you can see, it's read

[29:11] number one, two, and three, and it's

[29:13] decided that the next one is number two.

[29:14] It's just going to do it. That's great.

[29:16] So, it's going to work on it. Um, now

[29:19] the interesting thing now is that once

[29:21] this is finishes, now it's using TDD, so

[29:23] it read the test first. Uh, when it

[29:25] finishes, hopefully, yeah, it's marked

[29:28] it as done. Very good. Remembered that

[29:30] time

[29:33] and then it should commit. Let's see if

[29:35] it does.

[29:41] >> Sorry.

[29:44] >> No, this is a brand new session.

[29:46] Although I think it probably had the

[29:48] working directory from the previous one

[29:50] still. So um in fact I think it has. So

[29:53] what it hasn't done is committed those

[29:55] atomically which is definitely something

[29:56] I could improve in my prompt but we can

[29:58] cover that in a minute. Um so then

[30:01] hopefully it's just going to do that

[30:04] and then it's going to finish.

[30:07] Yeah, great. It's done it. Fantastic.

[30:10] Now what I can do is I can either do

[30:12] that again uh as a row loop or I can

[30:14] just restart a new session. Just do the

[30:17] same thing and this time it will pick

[30:18] something else and then it will keep

[30:19] working. Now you can imagine that if I

[30:21] put this inside a while loop then it

[30:24] should in theory work through all of the

[30:26] tickets in some way. Now whether what I

[30:29] get at the end is actually what I want

[30:31] is a whole different question. Um but it

[30:34] will definitely get a lot of work done

[30:36] in a row. So I'd love you to try it. So,

[30:39] if you're if you've got the um app

[30:40] working on your computers, um see if you

[30:43] can get it to work through just as many

[30:46] tickets as you want to within that

[30:48] amount of time. Um so, it should be able

[30:51] to just carry on. See if you can get it

[30:52] to to actually um uh maybe write a

[30:56] little bash script um just like I've

[30:58] done where you do a while, true, and

[30:59] then claude. I'll show you how to do

[31:01] that briefly. In fact, if I just quickly

[31:03] get reset so it can start just from the

[31:05] beginning. Um, and in fact, I'm actually

[31:07] going to go up one more

[31:11] hard

[31:13] head. There we go. Great. Yeah, that's

[31:15] the right place to start. Um, so, uh, if

[31:19] you can get it to do that, then that's

[31:20] great. The other thing that you can do

[31:22] is instead of using claude like this,

[31:24] you can do claw-p. Can you all see that?

[31:27] Okay. By the way, I'm not sure how I can

[31:28] make that. Um,

[31:32] >> yeah. Yeah, clear is a good one. Yeah.

[31:35] clear

[31:37] claude. There we go. So, what we can do

[31:39] is actually use claude.p like this. And

[31:41] you can get it to output by just doing

[31:43] stream JSON or something like that.

[31:44] What's it called? Something like stream

[31:46] JSON.

[31:47] Um, hang on a second.

[31:52] Let's see.

[31:56] Um,

[32:00] I think they've removed it. That's

[32:01] annoying. Never mind.

[32:04] which won't see any output.

[32:07] So there's nothing to stop you setting

[32:09] it up like this and then you can just do

[32:12] that.

[32:14] >> You got to set up CL to have full

[32:15] permission so it doesn't properly.

[32:17] >> Yes. So the only way that this works is

[32:19] if you want to run this properly and for

[32:21] it to not stop, you have to be quite

[32:23] selective about the permissions that you

[32:24] give it. Um so the question was

[32:26] presumably you have to run claw with

[32:28] full permissions for this to work. Yes.

[32:30] Yes, you do. Um

[32:32] >> it depends on what you're doing. Yeah,

[32:33] if you're working in a little sandbox

[32:35] project like this, the chances of it

[32:36] going elsewhere to find stuff out is is

[32:38] very small. Um, I have a project called

[32:40] lockbox and the sole purpose of that is

[32:42] to try and stop it doing stupid stuff um

[32:45] by why when it reads untrusted tokens

[32:47] which could potentially send it off

[32:49] track, it um it basically just prevents

[32:51] any kind of file system access or

[32:53] anything after that. So, there are ways

[32:54] of of kind of managing it. Um, so what

[32:56] this is doing in the background is you

[32:57] can't actually see it doing anything um

[33:00] because I don't have that that output

[33:02] mode, but you can figure out basically

[33:05] that to to run this in in some kind of

[33:07] script. And if I in fact if I quit that

[33:10] um hopefully it will stop.

[33:13] There we go. No,

[33:15] let's just keep going. Sorry. Clearly

[33:18] clearly a more productionready Ralph

[33:20] loop would not look like this. But you

[33:21] can see it's done a bunch of work. So if

[33:23] I go to here, you can see it's already

[33:24] started on the status command. Um, and

[33:27] it's just working through that at the

[33:28] moment. So it started at the beginning

[33:29] again. It was just working. So um,

[33:32] there's a few things to be aware of

[33:33] here. One is that feedback is really

[33:35] really important with Ralph loops. Um,

[33:38] you know, you need to be able to have it

[33:39] run uh um in a uh in a way that you can

[33:44] tell what it's doing and how it's doing

[33:45] it. So this kind of super basic one that

[33:47] I've given you there isn't very good.

[33:49] That's not one that I would recommend

[33:51] running in production. Um, equally, you

[33:54] need to um figure out exactly what the

[33:58] prompt is for Ralph. And that's a

[33:59] really, really important point. And I

[34:01] think what I'd like you to do when

[34:02] you're trying this is yes, it's going to

[34:04] be building a bunch of tickets in a row,

[34:06] but equally, it's going to be um uh it's

[34:10] going to be doing them in a way that you

[34:11] don't like. Um so for example if we go

[34:15] if I'm if I'm running this test which is

[34:17] literally just implement the next most

[34:19] important thing uh let's start with this

[34:21] one

[34:23] um I would probably do something like um

[34:27] run simplify

[34:30] which is a really useful skill from

[34:31] Claude from the anthropic team uh when

[34:34] finished and ensure you refactor to

[34:39] reduce duplication you can imagine

[34:42] Imagine that you could create quite a

[34:44] complicated um skill for this. And I'll

[34:46] show you I'll show you my kind of actual

[34:48] skill for this at the end. But as you're

[34:50] kind of working through this, do try and

[34:53] figure out um if there's ways that you

[34:57] can improve what it's doing. So give it

[34:58] a go, let it make a decision, and then

[35:01] let it write some code and then read the

[35:04] code and think, okay, what could I have

[35:05] actually improved about that process?

[35:06] And then reset everything and then

[35:08] improve the prompt after that. um have a

[35:10] go at that and see how that works.

[35:12] Whilst people are kind of working

[35:13] through that on their machines, I'm

[35:15] happy to take questions.

[35:19] >> Yeah.

[35:23] >> Have you used the skills like

[35:25] superpowers? Uh

[35:27] >> which one? Sorry.

[35:28] >> Superpowers one.

[35:29] >> Uh the superpowers one. I what I did is

[35:31] I pointed Claude at the entire

[35:33] repository and said figure out anything

[35:35] that isn't currently in my skill set and

[35:37] um implement them for me with my own

[35:39] context and that worked quite well. So I

[35:40] haven't used those ones particularly but

[35:42] I've basically rip them off.

[35:44] >> That's great. Um then because I use

[35:47] superpowers a lot and then I just give

[35:50] tasks like this and then ask it to like

[35:52] >> run multiple agents in the background.

[35:54] Yeah. And have you done that is what I

[35:56] >> Yeah. Yeah. So what you can do is there

[35:57] is an agent teams version which I think

[35:59] I've got turned off in this particular

[36:01] instance of cla code but what can happen

[36:03] is you can get uh claude to um use uh

[36:07] sub aents within team. So in fact I

[36:10] think I might be able to turn that on if

[36:11] I can find the agent teams. There it is.

[36:14] Claude code experimental agent teams. So

[36:16] if I grab that

[36:19] and then run Claude with that on

[36:24] then you should be able to say use an

[36:26] agent team to implement the dock tickets

[36:30] in this repo or something like this. And

[36:33] I don't this isn't actually running

[36:35] within T-Max. So um so actually maybe

[36:38] this won't work. So I might just try

[36:40] this again.

[36:42] Bear with me a second. So if I grab that

[36:46] and then paste that there. And then grab

[36:49] that and then run T-Max.

[36:53] And then

[36:55] run that in theory. In theory, um this

[37:00] should uh start pulling up other agents

[37:03] and it and because like I said trying to

[37:06] orchestrate uh Ralph loops or

[37:08] orchestrate agents myself to try and

[37:10] organize all of the dependencies and

[37:11] complexities is actually really really

[37:13] difficult to do. But um what you can do

[37:16] is just give the job to Claude to do and

[37:18] it does a much better job of managing

[37:20] that for it. So as you can see it's

[37:22] already decided to print out the entire

[37:24] thing, the file name and the the ticket

[37:26] for each and it's got a whole bunch

[37:28] there. So it's actually decided that

[37:30] they're all sequential. So therefore it

[37:33] should run it should run none of them in

[37:34] parallel which is kind of interesting.

[37:36] Um and then it should in theory start an

[37:38] implementation agent. Let's see if it's

[37:40] going to uh

[37:43] I think it's just running as a sub

[37:45] agent. Never mind. I'm not sure that's

[37:48] going to work. Never mind. If you can

[37:50] get it to do it, then let me know. But

[37:51] but but basically, it's an experimental

[37:53] feature that only came out a few weeks

[37:54] ago that allow um it to kind of start

[37:57] sub agents include as well um in order

[37:59] to do things.

[38:01] Any other questions while people are

[38:02] working through that? Yeah.

[38:04] >> You said you built a rough with

[38:07] automation, right? So what was the

[38:10] feedback criteria? So like what decides

[38:13] if it's a good newspaper article like a

[38:17] website

[38:18] framework but what good looks like if

[38:21] that's dynamic if that's static do you

[38:23] put that in the cloud MD file?

[38:25] >> Yeah great question how does that how

[38:26] does that work? So, so um the question

[38:28] is just to to repeat the first half of

[38:30] that is when I used the NA10 workflow in

[38:32] order to build a Ralph flute for a

[38:33] newsletter creator, uh how did I know

[38:35] how did how did the agent know what good

[38:37] was when it come?

[38:39] >> How did I define good? Okay, great

[38:41] question. So, so in terms of

[38:43] newsletters, I had already been writing

[38:44] my newsletter manually. So, I knew

[38:47] roughly what I wanted it to read like

[38:49] and sound like. I also did a bunch of

[38:51] research um using a research skill which

[38:54] was something like which I built which

[38:56] is something like um great newsletters

[38:59] and I've also did things like that. I

[39:01] also said things like um this is a

[39:04] fantastic

[39:06] written new in fact I'm just going to

[39:08] this is not what I do I actually do this

[39:10] is a fantastic newsletter that I've

[39:11] written or that I've read somewhere

[39:13] could you please figure out why this is

[39:14] so good and what are the kind of

[39:16] editorial principles that go went into

[39:18] this newsletter for it to to work really

[39:20] really well and then I would just paste

[39:22] that into paste the newsletter in get it

[39:25] to figure out what what was good about

[39:27] the newsletter and then and then I would

[39:29] check it and then I would say yes

[39:30] there's still is an element of human

[39:32] taste here. You can't entirely get away

[39:34] with that. Having said that, I do also

[39:35] have a simulate audience skill which um

[39:38] basically uses a whole bunch of

[39:40] different personas uh for different

[39:42] clients or or prospective clients that I

[39:44] work with. And then I would run it run

[39:46] the finished newsletter through that and

[39:48] say run all of these in parallel um and

[39:51] then once you have finished that figure

[39:53] out ways that I can improve this

[39:55] newsletter or newsletter skill in order

[39:57] to do that. So there's a number of

[39:58] different ways you can do that. the kind

[39:59] of audience simulation is super

[40:00] experimental, but it's actually really

[40:02] effective and and often will will

[40:04] surface insights I just hadn't thought

[40:06] of. Um I'm u my my personality as I'm a

[40:10] bit slightly all over the place,

[40:11] slightly kind of the way that I talk and

[40:13] and communicate um often my clients are

[40:15] not like that. So um I tend to barge

[40:18] people with information and sometimes my

[40:19] skill will say okay there's a lot of

[40:21] ideas in this Chris you just need to

[40:23] focus on one main point that makes sense

[40:24] and I'm like that's so helpful. So um so

[40:27] yes what's quite helpful and interesting

[40:29] is that you can use AI to give feedback

[40:31] on AI like that. The great thing about

[40:33] this particular

[40:35] um project that we're writing this

[40:37] little pomodoro thing that people are

[40:38] writing is that it's a command line tool

[40:40] and it's really simple to know whether

[40:42] it works. So it's perfect for a Ralph

[40:44] loop and in fact these little tools that

[40:46] we build for ourselves like for example

[40:48] the newsletter skill perfect for this

[40:50] kind of loop. I I will often say, "I

[40:52] want to improve this skill. Could you

[40:54] please back and forth and and write the

[40:57] content, then use another agent to read

[40:58] the content, decide if it's any good,

[41:00] come up with things to improve, then

[41:02] send that back in and just run that as a

[41:03] loop. Um there's a really cool um I

[41:07] wasn't going to tell you about this

[41:07] until the end, but I'll tell you now."

[41:09] Um there's a really cool uh feature

[41:11] inside code called loop where is instead

[41:14] of um creating, in fact, I'll start this

[41:16] in a new session. Instead of just doing

[41:19] this thing where you have to create your

[41:20] own while loop, you can say loop every

[41:23] minute um build the next ticket

[41:28] from doc tickets basically. And then

[41:31] what will happen is um the loop will set

[41:34] up a um a kind of almost like a a repeat

[41:37] timer. And as you see it's it's got a

[41:39] cron create tool which for the

[41:41] uninitiated just means do something

[41:43] every minute. This is what those five

[41:44] stars mean. And um what it's going to do

[41:46] is it will literally just build the next

[41:47] ticket. It when it finishes it will then

[41:50] check the chron again, build the next

[41:51] ticket. When it finishes it will check

[41:53] the chron again and keep going. So

[41:55] that's great for working through a bunch

[41:57] of tickets, but it isn't just applied to

[42:00] a set of things that you've got from

[42:02] before. If you think about it, I'll just

[42:04] leave that running up there. You could

[42:05] have a loop that does something like

[42:07] this. loop every one hour check linear

[42:11] for new bug reports from test.

[42:17] Um and then

[42:22] I just leave that running. Um, oh yeah,

[42:34] can't spell.

[42:38] Um, just leave that running and um,

[42:40] you're going to get you're going to

[42:40] annoy your testing team. But but anyway,

[42:42] the point is is that you can run these

[42:44] kinds of loops in order to get work done

[42:48] in a in a in a quite an interesting,

[42:52] I guess, dynamic way. Even though it's

[42:54] quite a simple loop, it's just find the

[42:55] next thing, do the next thing. If you

[42:57] think about it, heck of a lot of our

[42:59] work is just loops. If we're software

[43:01] developers, what do we do? We look at

[43:02] the backlog. We pick the top thing from

[43:04] the backlog. We pull it over to, you

[43:07] know, in progress. We assign it to

[43:08] ourselves. We check on the architecture.

[43:10] We figure out whether there's other

[43:12] contexts we need. We uh look at the

[43:14] change. We we make the change. We submit

[43:16] a PR. We um uh you know wait for

[43:20] reviews. We uh comment on the reviews.

[43:23] We reject the reviews. We implement the

[43:24] changes occasionally. We submit the PR.

[43:26] We merge the PR. We then go through the

[43:27] release process. Then we start again,

[43:29] pick up the next ticket, and so on. That

[43:31] is a loop. It's quite a complicated one.

[43:33] Um like we were talking about just a

[43:35] minute ago, but but it is still a loop.

[43:36] It is possible to get an AI to run that

[43:38] entire loop. there's no reason not to.

[43:41] Um, and that's effectively what's

[43:42] happening here when when um you can set

[43:45] up in fact you would never actually

[43:46] write this. You would much more likely

[43:48] to write something like this where you'd

[43:50] say every one hour

[43:54] uh linear

[43:56] bug finding and you'd have a skill that

[43:59] encoded all of those um those chunks of

[44:03] information that I just gave it in a way

[44:04] that would work for you and your

[44:06] particular team. Does everyone does

[44:07] anyone not know what skills are before I

[44:09] go any further? No. I think pretty much

[44:12] almost everyone knows what skills are.

[44:13] If you haven't figured out what a skill

[44:15] is yet, then then this is your homework.

[44:16] Go and understand how skills work. They

[44:18] are the best uh way that we have at the

[44:21] moment of packaging up useful little

[44:24] parcels of context and scripts and

[44:26] moving them to different places or or

[44:28] creating different things. So, for

[44:30] example, I mean, I have about 50 of them

[44:31] that I've written. Um, and then they

[44:33] just do lots of different things. The

[44:35] great thing about skills is that you can

[44:37] pull them into your context whenever you

[44:40] need them. So, for example, and I'll

[44:42] just do this. I could say, "Do you know

[44:45] how to create images using

[44:49] uh nano banana?" And I can ask um the AI

[44:53] the question, and the answer is, well, I

[44:54] could kind of look this up um but it

[44:56] actually knows that I have an image

[44:57] skill for this, funny enough. But if you

[44:59] hadn't got one, it wouldn't know. But if

[45:00] I then do images and say uh how do you

[45:04] create images? Give me the step by step.

[45:10] Then and what it's going to do is it's

[45:11] going to pull in that images skill. Um

[45:14] and then it tells me exactly how it does

[45:15] it. And I've actually written in fact I

[45:17] will make that bigger so you can see

[45:19] I've actually written a script within

[45:21] that skill that actually does the

[45:22] generation for me. Um, so it's codified

[45:25] the process of doing that and it just

[45:27] picks whichever um, uh, model it wants

[45:30] to and it gives it content and I have

[45:32] these specific templates that I use in

[45:34] order to create specific Nanabanana um,

[45:37] skills. Nanaban is brilliant. Um, this

[45:39] is how I created the presentation that

[45:41] you're looking at. I have a slide skill

[45:42] and an image skill that work in tandem

[45:44] in order to create these presentations.

[45:47] Cool. So let's see what the other thing

[45:49] has done. As you can see, it's already

[45:50] on ticket six. Um, the great thing about

[45:52] Ralphs is you just keep working and keep

[45:54] talking about something else and it's

[45:56] done a whole ton of stuff here. And it's

[45:58] just stopped at this point, but in a

[45:59] second, um, hopefully if we just wait,

[46:04] it will start the whole process again.

[46:06] There we go. It's got the scheduled task

[46:07] to run and it's going again. Um, so you

[46:10] can just you you can just leave claw

[46:12] code sessions uh running with these kind

[46:15] of loops in them. They last about three

[46:16] days, so you do have to keep refreshing

[46:18] them. Um, but you can you can just do

[46:20] that and keep it running even before you

[46:23] get to a more complicated write a script

[46:25] that wraps claw to do a thing and all of

[46:27] those kinds of things. Um, any other

[46:30] questions?

[46:33] Anyone got anything interesting or

[46:34] surprising out of their Ralph loop? Has

[46:36] anyone tried this on their real work

[46:37] yet? This would be the interesting

[46:39] thing. Yeah. How what was your

[46:42] experience? Have you still got the mic?

[46:44] >> Yeah.

[46:44] >> Yeah. Yeah.

[46:46] I just made a screenshot Ralph loop for

[46:48] a website context engineing framework.

[46:50] So Claude just takes the screenshots and

[46:52] then looks at the layout because it has

[46:53] problems with geometric like spacing.

[46:56] >> It works well.

[46:57] >> Nice. Cool. So you're actually using

[46:59] Claude Claude screenshotting to to get

[47:01] feedback. Yeah.

[47:01] >> Yeah. That's pretty advanced. Not many

[47:03] people are doing that. The um people are

[47:04] trying to use um uh like um playright

[47:08] and things like that as well to take

[47:10] screenshots and the claudin chrome

[47:11] plugin that comes with claude as well.

[47:13] can use that in order to get it to drive

[47:15] Chrome and then take screenshots of

[47:16] what's going on. I've had mixed success

[47:18] with that because it it's quite a

[47:19] complex thing for it to manage. But but

[47:21] for just basic screenshots, it works

[47:23] really well. For my um images and

[47:25] content uh that I write, um I when it

[47:29] runs those images skills, it will always

[47:31] look at the images first to see whether

[47:33] there's any kind of a weird AI garble

[47:35] text or whatever and it will reject them

[47:37] without even showing me if there's a

[47:38] problem with an image. Um was there

[47:40] another question or comment? Yeah,

[47:41] there's a question just back here. Can

[47:43] you just pass the mic? Is that okay?

[47:45] Thank you so much.

[47:51] >> Um I think it's it's close to a question

[47:53] that has been already asked. Um because

[47:55] I'm not quite familiar with Rough Loops.

[47:58] If I ask the agent to implement task one

[48:02] that has already been implemented, would

[48:04] it actually check the quality of what

[48:06] was implemented or only check if it was

[48:08] done or not or marked or not? Yeah, it

[48:11] very much depends on what you set it up

[48:13] for. So, so there's no kind of magic to

[48:16] a Ralph loop. It's just a loop. So, this

[48:18] loop that I'm running at the moment, in

[48:19] fact, I probably should just say loop

[48:20] stop. Otherwise, it's going to keep

[48:21] going. Use my quotota. I think I think

[48:24] you can just stop like that. We've got a

[48:26] quite a fully featured pomodoro setup

[48:29] now.

[48:31] Come on. Time to stop. Um, so it depends

[48:34] on it entirely depends on what you

[48:35] write. So, if you um if you go through

[48:39] to what was the loop that I set up? I

[48:41] think it was this one. I just said build

[48:43] the next ticket. That's very ambiguous

[48:45] and not very helpful. So, it might not

[48:48] actually finish it. It may just decide

[48:50] to build it and not ship it. It may not

[48:52] actually be very helpful. So, what's

[48:54] more interesting is if you go to um let

[48:58] me probably the easiest thing to do. If

[49:00] I load my my Ralph skill,

[49:05] this is my actual skill that I use um

[49:07] for Ralph loops. So um and what I'm

[49:09] doing actually this is slightly out of

[49:11] date. Um but the one that I've got here

[49:13] is actually using a doc changes folder.

[49:16] Uh you can see that there, but um I

[49:18] using a doc tickets in this example, but

[49:20] I've changed it on the the latest one.

[49:22] Um but um but ultimately you don't have

[49:24] to use a ticketing system like a flat

[49:27] file in a in a um in the GitHub

[49:29] repository. You could use beads which is

[49:31] Steve Yaki's version of of this kind of

[49:33] approach which is quite cool. I've used

[49:35] it. Um you could use linear, you could

[49:38] use Jira, you could you know as long as

[49:39] you can get access to it from the AI,

[49:41] you can use whatever uh ticketing system

[49:44] you want. uh for this for the purposes

[49:46] of this exercise that you're working

[49:47] through I tend just to use uh flat files

[49:51] because they just work you know it's not

[49:53] you don't really need anything

[49:54] sophisticated um in the same way um the

[49:58] uh the Ralph loop is entirely what you

[50:00] make it in terms of its effectiveness so

[50:03] so for example um in this particular one

[50:06] um I've given it a proper kind of role

[50:08] in the sense that you are one engineer

[50:09] in a relay team do exactly one change

[50:12] then drop the context and stop start

[50:14] Again, that's the idea. So, for this

[50:15] one, it's designed to be run in a shell

[50:17] script where it has an entirely fresh

[50:18] context each time because I didn't want

[50:20] the context to pollute each time. These

[50:22] days, I care much less about that

[50:24] because context is so much larger than

[50:26] it used to be. But, um, but when I wrote

[50:27] this, that was very important. As you

[50:29] can see, it's specifically for code that

[50:31] doesn't need human review before

[50:33] shipping. Um and then basically um it

[50:38] tells you about when work should go in

[50:39] there. Uh what the right time for the

[50:41] tool is read the claw.md change the

[50:44] format. This is the format of a ticket.

[50:47] Um this is all of the rationale. These

[50:49] are the different status values. Um I

[50:52] ask it to check git state um to make

[50:54] sure that it hasn't got a working

[50:55] directory. Um it's also got you know

[50:57] recovery states. So if it crashed, it

[51:00] knows that if there's a a dirty working

[51:02] tree, but the tests are passing, but

[51:04] you're probably done, um, but you might

[51:05] not be, so just double check. If the

[51:08] tests are failing, um, then it's

[51:10] probably just mid-flight, but broken, so

[51:12] you should probably just throw it away

[51:13] or or just treat it differently. So, so

[51:15] you can you can imagine that this was

[51:17] built up over time of trying to trying

[51:19] to get this working, trying to

[51:20] understand what the user wants, make

[51:21] sure test passing is not enough, verify

[51:24] the actual behavior works, run things in

[51:26] parallel, mark it done, blah blah blah

[51:28] blah blah. There's an awful lot going

[51:29] on. Um, so with a real Ralph loop, you

[51:32] want to be building up over time for

[51:33] your specific project exactly how to

[51:35] check something is working, exactly how

[51:37] to run the test in your particular

[51:39] framework and dialect, how you submit

[51:41] things to the test team, how you want to

[51:44] uh comment on particular changes, what

[51:46] style you want to use, whether you want

[51:49] to um pull off the thing that feels most

[51:52] obvious to you or the thing that's

[51:53] highest priority or a mixture of both

[51:55] depending on how you're feeling that

[51:56] day. whatever whatever you want needs to

[51:58] be coded in it. So when you're writing a

[52:00] Ralph loop, um I'll show you a link to

[52:03] grab this one at the end, but there's no

[52:04] need to use just mine or or something

[52:07] else. Just start with mine and then say

[52:09] fix this for my project and and and

[52:11] allow it to change and morph and evolve.

[52:14] Couple of questions. So um just come

[52:16] forward. Thank you.

[52:19] >> Hi. Um thanks for the talk. Um could you

[52:22] expand a bit more on the topic of

[52:24] sandboxing because that would be the

[52:26] thing uh stopping me from running this.

[52:28] Uh

[52:29] >> yeah, it makes sense. Yeah. Yeah,

[52:30] absolutely. So there's a number of

[52:32] different ways to sandbox this. For this

[52:33] particular small project, I'm not doing

[52:35] that. Um most of my work happens on a

[52:37] VPS which is away from my main machine.

[52:40] It has a few keys on it that are

[52:42] specific to what I want it to do. And um

[52:45] it can access developer tools. Uh a lot

[52:48] of them it can only access them

[52:49] readonly. Um, it can also access my

[52:51] email, but again, it has quite strict

[52:53] fine grain claw permissions for not

[52:55] sending emails because that's quite

[52:56] important. It I don't let it ever send

[52:58] an email. I only ever let it draft them.

[53:00] So, um, so I use a combination of uh

[53:04] positioning the code physically, not

[53:05] physically, but like away from the

[53:07] machine on a different machine on a VPS.

[53:10] Uh, I use clawed permissions for that as

[53:12] well. The permission system is a bit

[53:13] broken, but it it mostly works. Um, I'm

[53:16] trying you to build lockbox to make it

[53:18] even better. Um I use um what else do I

[53:22] do? Uh so the keys that I use are

[53:24] separate keys. So um the AI has it

[53:27] access to its own keys which I don't use

[53:28] for my other stuff. So I can I can see

[53:31] the kind of audit trail of what it's

[53:32] done. So there's a number of different

[53:34] ways of doing it. Um if you want to just

[53:36] run things simply on your own machine,

[53:38] there's Docker sandbox which is quite

[53:39] cool. It's a new feature in Docker which

[53:41] just allows you to do Docker sandbox cla

[53:43] and a run claw within that sandbox. Um,

[53:45] so you can kind of isolate it within a

[53:48] specific container. That's quite

[53:50] powerful because it allows you to only

[53:52] change things within that specific place

[53:53] in the file system. The challenge with

[53:56] that is that it can still leak data from

[53:58] one of your systems to another of your

[54:00] systems. Uh there's a thing called the

[54:02] lethal trifecta. I don't know if you've

[54:04] heard of that. Simon Wilson uh coined

[54:06] it. um an idea that if you have

[54:09] untrusted tokens, uh internet access and

[54:13] access to secret important data you

[54:16] don't want to lose, you're going to lose

[54:17] that data. Basically, that's that's the

[54:19] the um the bottom line of it. Uh so you

[54:22] have to kind of minimize the amount of

[54:24] times that those things collide in the

[54:25] same context. Um so yeah, lots to say

[54:28] about security and sandboxing

[54:29] specifically. Um, I tend to run I don't

[54:32] run with dangerously skip permissions.

[54:34] Uh, but I do run with with um a number

[54:37] of things turned on by default, but not

[54:39] everything basically. And you kind of

[54:40] have to go through and figure out what

[54:42] what your risk profile is and how much

[54:44] you care about those things. And

[54:45] certainly as you're giving, the main the

[54:47] main things to to read up if you're

[54:49] interested is to read up about the

[54:51] lethal trifecta if you didn't already

[54:52] weren't already aware of it. And um kind

[54:55] of be thoughtful about how much power

[54:58] and permission you're giving to your

[55:00] agents, especially if you're using

[55:01] something like OpenClaw, which is

[55:03] unfortunately insecure by default. Um I

[55:06] know that they've been doing a huge

[55:07] amount of work um on OpenClaw to make it

[55:09] more secure, but it is still a challenge

[55:11] for those kinds of agents. They do have

[55:13] access to a lot of things. Any

[55:16] other questions? Yeah.

[55:19] >> Uh yeah, you had a validation step in

[55:22] the loop.

[55:24] >> Uh this might be anecdotal evidence, but

[55:26] as soon as I changed mine to use sub

[55:29] agents here now for the validation step,

[55:31] it started finding things.

[55:33] >> Ah, interesting.

[55:34] >> Whereas as long as you're doing the

[55:36] validation in the same step with the

[55:38] same context, it just pats itself on the

[55:40] back and like Yeah, it

[55:41] >> that's a really that's a really good

[55:42] point. Um there's definitely uh

[55:45] confirmation bias going on with agents

[55:46] where they're like, "Oh yeah, of course

[55:47] I wrote it fine. It was fine. I checked

[55:48] it a minute ago." Uh yeah, using sub

[55:50] agents is really powerful because a sub

[55:52] agent starts with only a small chunk of

[55:54] context. It doesn't start with the full

[55:56] context, right? So so you can get much

[55:58] more uh power from it. So as a good

[56:01] example from this particular project, um

[56:04] a really useful um skill which I

[56:06] mentioned earlier is simplify.

[56:07] Simplifies a claw coding bundled skill

[56:10] and what it does is it will look at the

[56:12] most recent changes and it will run

[56:14] three sub aents to try and figure out

[56:16] what whether your code should improve.

[56:18] So you you can see here what it's doing.

[56:20] So hopefully this will run these will

[56:22] load and it will probably find a bunch

[56:24] of problems.

[56:25] Yeah, great point.

[56:29] >> Great presentation. Thank you. Uh did

[56:31] you try open spec or combined with

[56:34] openspec or any other spec driven? No,

[56:36] I'm I if I'm honest, I'm not a huge fan

[56:38] of spec driven development. I know

[56:39] that's that's um controversial and I'll

[56:42] qualify that. I'm I worry that spec

[56:45] driven development is taking us at the

[56:48] extreme is taking us back to the bad old

[56:50] days of waterfall where we would specify

[56:53] the entire or try and overspecify a

[56:55] project. Even these little set of

[56:57] tickets I'm not that comfortable with. I

[56:59] feel like spec should be much more

[57:01] iterative um and things that we can see

[57:05] it's already fixing a bunch of things

[57:07] that's quite cool. So it found just to

[57:08] finish off that point it found a bunch

[57:10] of issues there um and it's got some

[57:12] fixes. Uh yes so specs um I like just in

[57:17] time specs. I like the idea of building

[57:19] or thinking through what you're trying

[57:20] to build creating some kind of plan and

[57:22] claw code and then executing it. That's

[57:24] fine. I'm happy about that and I think

[57:26] that's a useful step. What I worry about

[57:28] is a I I worry about things like Kira

[57:30] where they've codified that into the to

[57:33] the tool. I worry that that will almost

[57:36] fossilize that that one approach with

[57:38] with AI that works today but may not

[57:41] work again when mythos eventually comes

[57:42] out. Right? So I worry that the tools

[57:45] are being too quick to jump to a

[57:48] specific structure of work that may not

[57:50] be the right thing in the future. So I'm

[57:52] I'm cautious about that. Um, I think it

[57:55] is obvious. It's a it's a truism that AI

[57:57] needs more context in order to do well.

[57:59] So, we should try and give it more

[58:00] context. But I think the idea of

[58:03] overdoing that and and oversp specking a

[58:05] project is one to be careful of as well

[58:07] as overstructuring our process based on

[58:10] what we know about agents today because

[58:11] then we'll end up with working on with a

[58:14] a new kind of AIdriven process that

[58:16] worked best with agents that came out in

[58:18] 2025 or 2026. You know, when we'll still

[58:21] be using that in 2030 and that'll be a

[58:22] pointless waste of time. So those are

[58:24] the kind of concerns I have with it.

[58:27] Any other questions?

[58:32] >> Yeah, great talk. So uh you mentioned

[58:34] that you don't like spec driven and you

[58:36] use Ralph. So basically there is no

[58:38] human in the loop. So the question

[58:40] arises does clo actually need you there.

[58:44] Where where is your input there?

[58:46] >> Great question. Um so I've been thinking

[58:48] about this quite a lot recently and

[58:49] having a bit of an existential crisis. I

[58:51] don't know about anyone else. Um but um

[58:53] but yes, what what value am I adding

[58:55] here to this thing? Um certainly not

[58:57] with writing a Pomodoro timer. I'm not

[58:58] sure I'm adding much value at all. I

[59:00] mean, I literally said I oneshotted

[59:02] those specs and and there was no point

[59:03] there at all. I'm not saying that I

[59:06] don't I don't like planning out a

[59:08] system. What I'm what I'm interested in

[59:10] at this point and I don't have the

[59:12] answers is the fact that AI often will

[59:15] pick better specs and and write better

[59:18] specs than I can write and will often

[59:20] have a better idea of the kinds of

[59:21] direction my software should go in than

[59:23] I necessarily will have. So I like the

[59:26] idea of actually having Ralph loops that

[59:28] create other Ralph loops um potentially

[59:31] or having Ralph loops that track whole

[59:34] um uh customer engagements or even whole

[59:37] startups. So, I have a a skill that I'm

[59:40] working on. Should I show this? I'm

[59:42] going to show it. It'll be fine. What

[59:44] could go wrong? Um, which is called

[59:47] startup.

[59:49] It's pretty ambitious, but the idea is

[59:52] that it should um basically guide a

[59:55] product through an entire startup

[59:57] framework. Um, so it is it is meant to

[1:00:00] be run as a loop. The idea is that it

[1:00:02] Oh, I see you all taking pictures now.

[1:00:03] Now I'm owning this thing.

[1:00:06] >> Damn it. Um but with great thanks to Ash

[1:00:09] Maru who writes some brilliant stuff on

[1:00:10] this. I should say that for the for the

[1:00:12] for the tape. Um so really really

[1:00:15] helpful um to me. So I built this out of

[1:00:17] um basically all of the cool books I

[1:00:19] I've read about stuff. So I I'm I'm a

[1:00:21] startup founder, co-founder CTO. So so

[1:00:23] this is a near and dear to my heart. And

[1:00:25] what I'm trying to do here is I'm trying

[1:00:27] to give the AI enough context such that

[1:00:30] it could run my startup for me and

[1:00:33] potentially figure out what the next

[1:00:34] most important thing to work is and then

[1:00:36] do that in a loop, you know, and then it

[1:00:38] then there's a big outer loop that runs

[1:00:39] that says, "Okay, well, what's the next

[1:00:41] most important thing to do? Let's do

[1:00:42] that." Um, so it doesn't work, but it

[1:00:45] it's it's interesting and it's getting

[1:00:47] somewhere and um it will often um the

[1:00:50] first thing it does I don't think I've

[1:00:51] got it to show. Um but um Oh yeah, I

[1:00:53] will show it because it is hilarious.

[1:00:55] Hang on just a second. Um, there's a it

[1:00:58] I asked it how it was doing uh on one of

[1:01:01] its loops and it produced a a startup

[1:01:04] update deck as an investor memo which

[1:01:07] was I didn't even ask it to do this.

[1:01:09] I'll show you the the demo. Hang on a

[1:01:11] second. Um because it's absolutely

[1:01:13] brilliant.

[1:01:15] Uh let's see if I can just show this

[1:01:17] window.

[1:01:20] There we go. Air skills startup update.

[1:01:23] Um, and so yeah, it said, "Yeah, I need

[1:01:25] to give him an update." So what I did is

[1:01:27] it said basically this is how far we've

[1:01:28] got. These are the problems nobody has

[1:01:30] solved. This is what we know that's

[1:01:31] real. These are the number of this is a

[1:01:33] skills management tool that I'm working

[1:01:35] on in the background. Um, this is these

[1:01:37] are all the kind of issues. And it came

[1:01:39] up with all of this cool stuff that

[1:01:40] could go into an investor deck. Um, to

[1:01:42] be honest, that's not bad. It's it's not

[1:01:45] a bad I think it's actually the GitHub

[1:01:46] for AI skills, but there we go. And um,

[1:01:48] you know, who's going to pay for this

[1:01:49] thing? How much will they pay? Those

[1:01:50] numbers are definitely not right. But um

[1:01:52] but what's interesting is that it

[1:01:53] decided that it wanted to do this uh and

[1:01:57] figure out all of these numbers based on

[1:01:58] based on this um which is I think was

[1:02:00] hilarious and it was quite proud of this

[1:02:02] deck to be honest and I had to kind of

[1:02:03] be like hang on a minute we haven't you

[1:02:05] there's some serious thinking you need

[1:02:07] to do before you kind of go to that um

[1:02:09] will will or pay for skills government

[1:02:11] would your all pay for skills governance

[1:02:13] great question um not sure yet so anyway

[1:02:16] um the reason for showing that is more

[1:02:17] to kind of point out that that AI can do

[1:02:21] a heck of a lot and and it doesn't do

[1:02:24] startups well yet, but that's probably

[1:02:26] down to my skill file, not down to the

[1:02:30] um agent itself. I I have a feeling that

[1:02:33] there are an awful lot of things that

[1:02:35] potentially will be um will be loops in

[1:02:38] the future. Um I only got that far on my

[1:02:40] slides. Oh my gosh. Um hang on a second.

[1:02:43] Um so we've done that. We've done that.

[1:02:46] If you are still if you're not just

[1:02:47] listening to me and are still working on

[1:02:48] this demo, I've got a couple of

[1:02:49] challenges for you if you'd like to do

[1:02:51] this. One is is um you could try

[1:02:53] upgrading your ticket format. Um if you

[1:02:56] like the raw markdown file, the doc

[1:02:58] tickets is fine. If you wanted to just

[1:03:00] type bd install or or install beads,

[1:03:02] it's super easy to do that. And you

[1:03:04] wanted to kind of get Ralph loop to work

[1:03:05] with your beads, try that out. See if

[1:03:06] that works. You know, no there's no

[1:03:07] pressure on you to achieve anything in

[1:03:09] this little folder. Uh beads is great

[1:03:11] because it only works within your

[1:03:12] folder. So um and it just installs a

[1:03:14] little tool. So it's quite a useful

[1:03:16] thing to to to try it on. So if you

[1:03:18] wanted to try a different ticket format

[1:03:19] or you wanted to kind of move this into

[1:03:22] your main project and connect your your

[1:03:24] Ralph loop to your um ticketing system

[1:03:26] to see how that feels. Yeah, maybe not

[1:03:29] submit tickets yet, but you know, you

[1:03:30] potentially could you could try that and

[1:03:32] see where that takes you. Um so that's

[1:03:34] an option. The other is is the skill. Uh

[1:03:37] you you're going to need to keep

[1:03:38] upgrading and working on your loop. Uh

[1:03:40] the loop basically contains all of the

[1:03:42] knowhow about how you as a person will

[1:03:45] go through that. You can take it all the

[1:03:47] way through from do the next ticket and

[1:03:48] you can take it all the way up to do the

[1:03:50] next step in the world dominating

[1:03:52] startup you're trying to build or

[1:03:54] whatever it is. Um you know it works for

[1:03:56] all of those kind of things. What's

[1:03:58] super interesting about this is that I'm

[1:04:01] I'm more and more convinced that

[1:04:03] everything in fact is a loop. Maybe

[1:04:06] maybe as an engineer I'm definitely on a

[1:04:08] loop on and a lot of the work that I do.

[1:04:10] Uh maybe as a project manager or or

[1:04:12] project manager I'm on a loop. Maybe as

[1:04:14] a CEO I'm on a loop. Who knows? Um maybe

[1:04:19] uh certainly uh a lot of the kind of

[1:04:21] cadences that I work on um run in loops

[1:04:24] too. So um I have a skill and if you're

[1:04:27] running an open claw bot, you're doing a

[1:04:28] similar thing uh that that just runs a

[1:04:31] heartbeat every 15 minutes. Um, it just,

[1:04:34] um, on my, uh, VPS, it just fires up

[1:04:36] Claude, checks a few things, checks my

[1:04:38] calendar, see if I've got anything

[1:04:39] happening, and, um, sends me telegram

[1:04:41] messages. Um, maybe that's on a loop,

[1:04:43] and that is, it's definitely on a loop.

[1:04:44] It's 15 minutes. Um, I have a worker

[1:04:46] loop, which I'll show you in a minute.

[1:04:48] And I have a morning loop where every

[1:04:49] morning at at 6:00 a.m. it comes up with

[1:04:51] a full briefing of my day, figures out

[1:04:54] exactly what I should be doing, um, and,

[1:04:57] uh, just gives me all the information

[1:04:58] that I need that's happened overnight,

[1:04:59] all the emails that come in, all of that

[1:05:01] stuff. Um the the worker loop is

[1:05:04] particularly interesting because it

[1:05:06] basically I'm not sure I can actually

[1:05:09] show this. Uh let's see if I can find

[1:05:12] find something that I can show.

[1:05:15] Um

[1:05:18] let's see.

[1:05:22] No, the reason I can't is because it's

[1:05:23] got a bunch of client information in it.

[1:05:25] So I can't show you that. But um what I

[1:05:27] can show you is for example this screen

[1:05:30] I can show you. So if I quickly switch

[1:05:33] to this

[1:05:35] um

[1:05:41] so this is an app I'll make that

[1:05:42] slightly bigger. This is now how I run

[1:05:45] my worker loop. So this is an app that I

[1:05:48] wrote um uh to manage projects. So I

[1:05:52] don't have tickets inside my my work

[1:05:54] vault. I have project files and each of

[1:05:56] the projects is a is a set of work that

[1:05:58] I need to do. And then every so often I

[1:06:00] have a I basically vibe coded a cambban

[1:06:02] system and a worker will pick up and do

[1:06:04] the next step on the project. So if the

[1:06:06] next step on the project is writing an

[1:06:07] email because it has a an overview or

[1:06:09] it's checking things or uh it's

[1:06:12] producing the slides for my project, it

[1:06:13] will do the next step. So this for

[1:06:15] example is the uh workshop uh prep spec

[1:06:19] uh uh project that it's working on. And

[1:06:21] it's it's got a bunch of front matter

[1:06:23] that is just looking like that. Um and

[1:06:26] um it's got some questions for me. I

[1:06:27] haven't updated this. it needs to be

[1:06:28] updated. It's got the context. It's got

[1:06:30] a decision trail of things that it's

[1:06:31] done and why it's done them. Um and so

[1:06:35] basically for every different thing

[1:06:36] that's happening um it it just is

[1:06:39] figuring out the next one. Um it's also

[1:06:42] got um notes on um other talks that I

[1:06:46] might be giving um that didn't happen in

[1:06:48] the end. Um it's got feedback from a

[1:06:50] previous workshop I did on a similar

[1:06:51] topic um which you can click on.

[1:06:53] Actually, I can't click on that. There's

[1:06:54] a bug. But um it will basically show the

[1:06:56] notes from a feedback session. So so

[1:06:58] this project pulls everything together

[1:07:00] from all of the context you can find and

[1:07:02] then does the next step in a loop. So

[1:07:04] you can run everything in a loop. Uh you

[1:07:06] can run all of your work in a loop. When

[1:07:08] I wake up in the morning, normally I

[1:07:10] have about 15 or 16 draft emails where

[1:07:12] people have got back to me and it's had

[1:07:13] a go at replying them replying to them.

[1:07:15] I always have to edit them. They're

[1:07:17] always okay. But um but it definitely

[1:07:19] has a go at at getting getting on with

[1:07:22] trying to schedule some of my work. I

[1:07:24] have very specific rules about what it

[1:07:26] can and can't do. My basic rule is is

[1:07:28] this reversible without embarrassment to

[1:07:30] me. And um if the answer is no, don't do

[1:07:34] it. Um and but just make a little note

[1:07:36] in the project and hand it back to me.

[1:07:37] Um so sending emails is not allowed to

[1:07:39] do. Creating a slide deck like for

[1:07:41] example this one that's reversible. It

[1:07:43] doesn't cause me any embarrassment. So

[1:07:44] it just gone on and did it um and gave

[1:07:46] it to me. Uh for example, uh it doesn't

[1:07:49] post on LinkedIn for me. It doesn't um

[1:07:51] it doesn't send emails. It doesn't send

[1:07:53] messages. It uh but it does it does get

[1:07:56] everything ready for me to review. To

[1:07:58] your point earlier, which is a very long

[1:07:59] answer to your question, um it um it has

[1:08:03] caused me to genuinely question what I'm

[1:08:06] good at and what I'm here for. Quite a

[1:08:07] lot of the time I've got to a point

[1:08:10] where I'm just the email person who just

[1:08:13] checks emails and send check emails,

[1:08:14] send check. That doesn't sound like a a

[1:08:16] proper job. That doesn't feel good. So,

[1:08:18] so therefore, what does that mean for my

[1:08:20] work? And I've had to make a conscious

[1:08:22] decision. Which bits of my work do I

[1:08:25] want to do and which bits of my work

[1:08:26] don't I want to do. I don't want to be

[1:08:28] the email reviewer, but I do want to be

[1:08:30] the strategist. I do want to be helping

[1:08:32] organizations think through what on

[1:08:34] earth is going on with AI and how to

[1:08:36] kind of fix it for their organization.

[1:08:37] Now, I could get AI to do a bad first

[1:08:39] draft, but I don't want to be reviewing

[1:08:41] AI's draft. I actually want to be doing

[1:08:42] that thinking myself. So therefore, I

[1:08:45] basically said, don't do any of that

[1:08:46] work. I want to do that work. just give

[1:08:48] me all the information I need and I'll

[1:08:49] do the work because I enjoy that work

[1:08:50] and I'm good at it. So, um, AI can do

[1:08:54] all of the rubbish work, but it can't

[1:08:56] and it shouldn't do the work that I'm

[1:08:58] uniquely good at. But because everything

[1:09:00] is a loop and Ralph, this is getting so

[1:09:01] existential because Ralph loops are are

[1:09:03] so um really everything and can be used

[1:09:07] for everything. We have to start asking

[1:09:08] hard questions about which of our bits

[1:09:10] of work we actually want to do. What do

[1:09:12] we want to do um out of this work? It's

[1:09:15] not just about what AI can do or can't

[1:09:17] do anymore.

[1:09:19] Um, yes, there's a question. There's

[1:09:21] like loads of questions, but let's go at

[1:09:22] the back. I think your hand was up

[1:09:24] first. I think the um chat's coming with

[1:09:25] the mic.

[1:09:28] >> Well, we just for the recording, it's

[1:09:30] really helpful. Thank you. So, with the

[1:09:33] open-ended tasks, yeah, how do you think

[1:09:36] about sort of when to stop? So, do you

[1:09:39] set KPIs up at the beginning or how do

[1:09:43] how do you how do you know when it's

[1:09:44] done?

[1:09:45] >> Yeah, great question. Um, I ask it to so

[1:09:48] again this is this comes down to if I

[1:09:50] just go back to sorry different window

[1:09:57] uh this one it comes down to upgrading

[1:09:58] your loop and you have to basically tell

[1:10:00] it when to stop. So, uh I don't just

[1:10:02] have one Ralph loop file that works for

[1:10:05] all of those different loops that I

[1:10:06] showed you earlier. Um, I have different

[1:10:08] ones for each. And for example, the

[1:10:10] worker says, "When you get to a point

[1:10:12] where you've either running out of

[1:10:14] context or you've got to a point where

[1:10:15] there's an irreversible thing to do,

[1:10:17] then I want you to stop and and report."

[1:10:20] And what report means is in this case

[1:10:22] update the project file, which is just a

[1:10:24] file in a repository with what where

[1:10:26] you've got to and in a way that where

[1:10:29] you present it to me for review. So, I'm

[1:10:31] working quite hard at the moment about

[1:10:32] about that kind of presentation step

[1:10:34] because I I definitely don't want to be

[1:10:35] reviewing a diff and just reading text I

[1:10:38] find really difficult um just because

[1:10:40] there's often a huge wall of it and it's

[1:10:42] hard to pause. So, I'm getting it to

[1:10:44] start giving me things step by step in

[1:10:45] slide format. I'm trying to get it to

[1:10:48] that interface I showed you before. You

[1:10:50] can kind of see a little bit how I'm

[1:10:51] trying to get it to show things in

[1:10:52] different places in different ways uh to

[1:10:55] to for it to um uh to get to uh what I

[1:11:00] need to uniquely do next. I suppose so

[1:11:02] it so to the answer your question it

[1:11:04] depends on what you're doing. I think

[1:11:06] the most important bit is that you

[1:11:08] figure out what the edges are for

[1:11:10] yourself and and and have that real you

[1:11:13] know moment of you know what do I

[1:11:14] actually want to be doing? How do I want

[1:11:16] to be involved in this work here? not

[1:11:18] just uh you know AI is helping me do my

[1:11:21] work and a companion to me it's much

[1:11:23] more now which bits do I not even need

[1:11:25] to know about you know uh next question

[1:11:29] there's one here there's a mic just at

[1:11:31] the front somewhere I think yeah great

[1:11:32] thank you

[1:11:36] >> uh hi so since you brought up this topic

[1:11:38] of our involvement right so at what

[1:11:40] stage

[1:11:42] we really get involved I mean you

[1:11:43] mentioned you don't really review the

[1:11:45] diff um I guess the most important part

[1:11:48] of our work now is creating the tickets,

[1:11:50] right? I mean, first identifying what

[1:11:51] the most useful feature to implement is

[1:11:53] and then

[1:11:55] >> describing in a way that you foresee all

[1:11:57] the different edge cases or um just

[1:11:59] explain it the best way possible so that

[1:12:01] the outcome is what you desired in the

[1:12:03] first place.

[1:12:04] >> Yeah.

[1:12:05] >> What's your process of creating this

[1:12:06] tickets? Yeah, great question. And uh

[1:12:08] >> so like like my concern is sometimes you

[1:12:10] don't really know yourself until you

[1:12:13] start implementing. I mean the way we

[1:12:14] used to do it, right? So during the

[1:12:16] development process you encounter

[1:12:18] certain um different cases where you

[1:12:21] need like a custom logic you need to

[1:12:23] it's just difficult to foresee these

[1:12:24] things from the get go and do you like

[1:12:27] iteratively improve the tickets and you

[1:12:29] reimplement them or what's your process?

[1:12:31] >> Yeah great question. So um in terms of

[1:12:34] how I work there are two modes of work

[1:12:36] that is done on my behalf. One is the

[1:12:38] fully automatic work that we're talking

[1:12:40] about here where the I would just get

[1:12:41] something done. I don't need when I've

[1:12:43] got a decent spec that I trust and and

[1:12:45] there's a way of feeding back so that

[1:12:47] the AI knows that it's good. I don't

[1:12:48] need to be involved in that work. That

[1:12:50] can just happen. For every other piece

[1:12:51] of work I do, I have a uh I I work on it

[1:12:56] with and in Claude code. So um I uh with

[1:13:00] that um system I showed you earlier, um

[1:13:03] in fact, I'll go back to it so I can

[1:13:04] show you. Um

[1:13:08] let me just change back to this window.

[1:13:16] Where is it? There it is.

[1:13:22] With this one, at the very bottom of any

[1:13:24] of these kind of projects that it's

[1:13:25] running for me, there's a little thing

[1:13:26] here, which I this is just a vioded app

[1:13:28] that I've written for me. Nobody else

[1:13:29] has access to this. Um, it has a little

[1:13:31] vCP command which if I take that and I

[1:13:34] type this into a terminal window. Um, so

[1:13:38] if I go back to this one for example, I

[1:13:41] think this is okay.

[1:13:43] Um,

[1:13:46] yeah, I can't I can't easily show that

[1:13:48] just because my internet is not going to

[1:13:49] be able to connect to my VPS. But the

[1:13:51] point is is that I'm able to go back to

[1:13:55] um,

[1:13:57] yeah, I'll go back to that.

[1:14:04] The point is is that I'm able to um type

[1:14:08] that in and just paste that into my VPS.

[1:14:10] What that does is it starts a new clawed

[1:14:11] code session. That session grabs knows

[1:14:14] where to find that project and it pulls

[1:14:16] in all of the project context. So rather

[1:14:17] like loading a skill, it loads it as it

[1:14:19] loads the project. It reads the entire

[1:14:20] project file and knows where everything

[1:14:21] else is. At that point, it's loaded in

[1:14:24] everything it needs in order to

[1:14:25] supercharge that session with me and

[1:14:27] then we work together on it. So if I'm

[1:14:29] for example to your point about specking

[1:14:31] tickets, I'd have a ticket I don't know

[1:14:33] probably a project for that particular

[1:14:35] feature and then I would say okay load

[1:14:37] in everything you know about that and it

[1:14:38] would load them all in and then we would

[1:14:39] work back and forth on specking out

[1:14:41] those tickets and then the output would

[1:14:42] be um whatever I needed to get done in

[1:14:44] order to get that done. So if I'm

[1:14:46] working on something that where I I want

[1:14:48] to usefully and uniquely do that myself

[1:14:51] that's when I would jump into a project

[1:14:53] with claw code. And when I say do it

[1:14:54] myself, I don't mean typing it myself or

[1:14:57] I don't mean doing all the thinking. I

[1:14:58] normally mean I get Claude to interview

[1:15:00] me to ask questions so that I can uh

[1:15:04] give it the information it needs to

[1:15:05] formulate to do the writing because I

[1:15:07] don't like doing the typing, but I get

[1:15:09] it to pull the information out of me in

[1:15:11] order to to get that work done. So those

[1:15:12] are the two modes. It's the the back and

[1:15:14] forth iterating and then it's the it

[1:15:17] just the automatic stuff. And I should

[1:15:19] also point out that I don't I don't like

[1:15:21] reading diffs, but ultimately that's the

[1:15:23] only way that you can review code. Um

[1:15:25] when I'm when I'm reading a newsletter

[1:15:28] item, I don't want to read the diff. I

[1:15:29] want to read the newsletter. Whereas if

[1:15:31] I'm reviewing code that's important um

[1:15:33] that is for other people, then yes, I

[1:15:35] read the diffs. I don't like doing it.

[1:15:36] Nobody likes reading diffs, but I I

[1:15:38] check to make sure it's working. And I

[1:15:40] will I can't see myself not doing that

[1:15:42] for a while, especially not with

[1:15:44] security um like conscious code. Maybe

[1:15:47] with mythos or just delegate it. That'd

[1:15:49] be nice. Any other questions?

[1:15:52] Yes, one here.

[1:15:54] >> Um, how do you deal with context rot?

[1:15:56] So, for example, uh your example where

[1:15:59] you have a loop and it takes one task

[1:16:01] after the other. Is it the same cloud

[1:16:03] code session that takes all those tasks?

[1:16:06] >> We'll have to experiment with that with

[1:16:07] the with the slash loop command. Yes, it

[1:16:09] is. Um, it's the same session. Um, I

[1:16:11] when you run it as a kind of while loop

[1:16:13] outside claw, then it's a different

[1:16:14] session. um you have different

[1:16:16] trade-offs uh with that. With the same

[1:16:19] session, you have all the context of the

[1:16:20] previous tickets and the previous

[1:16:21] changes. That might be useful. In

[1:16:24] practice, I've not found that so useful

[1:16:25] because it can just pull the files as it

[1:16:27] goes. Um if you're not typing anything

[1:16:29] into to the session, you're not really

[1:16:32] adding anything to that. So, there's

[1:16:33] nothing really in there that's useful.

[1:16:35] So, I tended I've tended in the past to

[1:16:37] prefer starting a fresh context for each

[1:16:39] new session. Um, but the loop is very

[1:16:41] the slash loop is very easy to run and

[1:16:43] it just works and especially opus is

[1:16:47] very very good at long context

[1:16:48] retrieval. So it's less much much less

[1:16:50] of an issue.

[1:16:52] >> Okay.

[1:16:55] >> Uh, sorry. Yeah, there's a there's one

[1:16:57] at the back as well. Is there a

[1:16:58] microphone as well? Okay, great.

[1:17:01] >> Um, are you reviewing sessions that are

[1:17:03] done by by your loops or or are you just

[1:17:06] reviewing diffs on on the GitHub? Great

[1:17:09] question.

[1:17:10] >> I don't allow any of my workers to close

[1:17:13] a project. Um, so uh I I would always

[1:17:17] say if you think you're done, tell me

[1:17:20] what's finished and I will close I will

[1:17:21] I will close that off. Um, so it could

[1:17:25] it could be that there's a a big list of

[1:17:27] completed things that I need to check

[1:17:28] off check off for myself, but I I want

[1:17:30] to be that kind of final step of

[1:17:32] verification. The reason that I've added

[1:17:34] that is because I worry that I'll miss

[1:17:36] something. There's a thing uh that

[1:17:38] someone coined recently called cognitive

[1:17:40] debt uh which is the idea of just not

[1:17:42] being up to speed with everything that

[1:17:44] your codebase can do or or all of the

[1:17:46] code in your codebase. And that that

[1:17:47] worries me. So so I tend to want to to

[1:17:50] at least understand how the code fits

[1:17:52] together and and how or how the piece of

[1:17:55] work that I'm working on fits together.

[1:17:56] So I don't let AI get away with just

[1:17:59] putting something, you know, out of my

[1:18:01] sight without me having a chance to look

[1:18:02] at it. Otherwise, I feel like I'd lose

[1:18:05] track of what's happening.

[1:18:06] Yeah, because I I mean uh for example, I

[1:18:10] I'm using sessions to to track uh

[1:18:13] tickets.

[1:18:14] >> So, so instead of reviewing the code or

[1:18:17] diffs in the code, I'm just reviewing

[1:18:19] what the particular session was doing

[1:18:21] >> and I even have like a marking system

[1:18:24] which which session is on which status.

[1:18:27] >> Yeah.

[1:18:27] >> Is there any way how how you do it

[1:18:29] similarly?

[1:18:30] >> Um similar. Yeah, I think the sessions

[1:18:32] and the status I I I think that can

[1:18:35] work. Um, I I haven't tended to use

[1:18:38] sessions like that. What I've tended to

[1:18:39] do with sessions is I get Claude to

[1:18:41] every night go through all of the

[1:18:43] previous sessions that I've run that day

[1:18:45] across all the machines I run. Claude,

[1:18:46] it saves them all into a JSON file for

[1:18:48] me. And then I get it to uh both figure

[1:18:51] out how my system could improve uh and

[1:18:53] also just what I did so that I haven't I

[1:18:55] don't forget um what happened. And so it

[1:18:57] writes a little paragraph for how much I

[1:18:59] did. And um and I use that in order to

[1:19:03] uh to kind of track work, but it's not

[1:19:05] quite the same as one ticket per

[1:19:07] session. I quite like the idea of having

[1:19:09] like one context per session. I think

[1:19:11] that's quite a nice idea and one sorry

[1:19:13] one um like by per unit of work. I I

[1:19:17] just haven't made that work. But that's

[1:19:18] >> I I found it really useful because then

[1:19:20] then I can go back to the particular

[1:19:22] session when the particular thinking was

[1:19:24] happening.

[1:19:24] >> Yes. And I do do that for sometimes when

[1:19:27] I've got a project that's running over

[1:19:28] multiple sessions, I can go back to the

[1:19:30] previous session. Um, instead of uh the

[1:19:32] VCP command I showed you, I could type

[1:19:34] VCR and it'll do the same thing. But um

[1:19:36] in practice though I I like the

[1:19:38] discipline of it having to pick up again

[1:19:41] because it mean if it has to pick up

[1:19:43] again from a fresh context it means that

[1:19:45] all of the information that was in that

[1:19:46] session has actually been codified into

[1:19:48] other places that any claude code

[1:19:50] session or human could find which means

[1:19:52] that you end up with a a much more um I

[1:19:57] guess richer kind of repository of

[1:19:59] knowledge that you're working in. So, so

[1:20:01] there's a question mark around if if

[1:20:04] session if you if sessions are truly not

[1:20:06] ephemeral and you've got them as a

[1:20:07] store, are they accessible uh as future

[1:20:10] context? If you treat them as ephemeral

[1:20:12] and make sure you capture everything

[1:20:13] within them into your repository anyway

[1:20:16] or into documentation files or whatever,

[1:20:18] I think that could be more powerful. So,

[1:20:20] worth thinking through for sure.

[1:20:24] Any other questions? Feels like we've

[1:20:26] come a long way from just write this

[1:20:28] ticket, but there we go. It's good. It's

[1:20:29] all good. Yeah,

[1:20:30] >> thank you so much for the talk. I have a

[1:20:32] questions. It seems like uh in the loop

[1:20:34] some of the steps might not be necessary

[1:20:37] like you might go to the code and then

[1:20:38] find nothing there. Y

[1:20:40] >> and would you consider to optimize it

[1:20:43] somehow or you just let the token burn?

[1:20:46] >> No, just burn the tokens. They're not

[1:20:47] that expensive. Depends what you're

[1:20:49] doing. Um I think we're at the point I

[1:20:51] should this is a whole another thing. Um

[1:20:54] we're basically in the era of free

[1:20:56] tokens right now. Um, you know, I I have

[1:20:58] a max 20 subscription. Um, I definitely

[1:21:02] use more than the average person

[1:21:03] probably who is is paying for one of

[1:21:05] those. Um, so I I think at this point I

[1:21:08] would optimize for for freeing your own

[1:21:11] time up as opposed to optimizing for for

[1:21:14] burning a few more tokens. I don't think

[1:21:16] tokens will ever get that expensive. I

[1:21:18] think that the frontier models

[1:21:19] potentially will be very expensive, but

[1:21:21] we have really good uh cheaper or freer

[1:21:24] alternatives just around the corner. Not

[1:21:27] quite as good for the latest kind of

[1:21:29] work that we're trying to do, but

[1:21:30] they're really really good. So, um you

[1:21:32] know, I think um uh there was at least

[1:21:35] one that just came, the GLM one that

[1:21:36] just came out looks really promising. Um

[1:21:39] that's the ZAI one. I think it just came

[1:21:40] out this week. Really, really

[1:21:42] interesting. I'm still running Claude,

[1:21:44] but that won't necessarily always be the

[1:21:45] case. So, I think I I would just burn

[1:21:48] them. I would, like I said at the very

[1:21:50] beginning, um you know, I I spent a long

[1:21:53] time doing the whole optimization thing

[1:21:55] where I was doing this, if you weren't

[1:21:57] here at the beginning, this thing, you

[1:21:59] know, I spent a lot of time trying to to

[1:22:00] screw around with with all of this, but

[1:22:02] but ultimately, I just now let it run.

[1:22:04] It's much simpler. I do get quite close

[1:22:07] to the end of my max subscription

[1:22:08] sometimes, though. I'm slight slightly

[1:22:10] nervous about what that means. I have to

[1:22:11] figure out how to get another account.

[1:22:14] 200.

[1:22:15] >> Yeah, max to the $200 a month one. Yeah.

[1:22:18] Yeah, I get pretty close to that every

[1:22:19] week. I'm quite I'm about 80% now.

[1:22:22] Getting the jitters. Um yeah, you had a

[1:22:24] question. Do you want to bring the mic

[1:22:25] back down? Is that okay? Thank you.

[1:22:35] >> I'm not looking at that anymore.

[1:22:36] >> Hello.

[1:22:38] Is this uh I wanted to ask you about

[1:22:41] Thank you so much for the presentation.

[1:22:42] Yeah, sure.

[1:22:43] >> About fine-tuning for for the prompt,

[1:22:46] >> do you version it? Do you have data sets

[1:22:48] that you use to fine-tune your entire

[1:22:51] loop?

[1:22:52] >> Uh, so in terms of um versioning the

[1:22:54] Ralph loop specifically, like the prompt

[1:22:56] for the Ralph loop.

[1:22:57] >> Yeah.

[1:22:58] >> So I use skills for that. So um as I

[1:23:00] pointed out before um uh everything like

[1:23:04] that goes into the skill and I get

[1:23:06] Claude to write the skill for me. Um,

[1:23:08] and that saves in either your your docu

[1:23:11] skills folder within your project or it

[1:23:13] goes into your home directory under

[1:23:14] doclaude skills. Uh, I use GitHub to

[1:23:16] version all of those for myself. I don't

[1:23:18] think git is the right skills format for

[1:23:21] this long term. I think we need a new

[1:23:23] thing. Hence trying to build skills in

[1:23:25] fact um which is this idea of trying to

[1:23:28] um make skills much more portable and

[1:23:30] sharable within teams which I'm trying

[1:23:31] to figure out. So yes, I do um I do

[1:23:35] version control them and I treat them as

[1:23:37] quite important code and I don't

[1:23:38] actually I do share some of them uh but

[1:23:41] I don't share all of them routinely

[1:23:42] because they there it's a lot of my own

[1:23:44] IP in there and actually a lot of my

[1:23:45] customers IP is in there too.

[1:23:48] >> Yeah, the question was more with regards

[1:23:49] to the performance of the prompts. Mh.

[1:23:51] >> So um you were saying that in the

[1:23:54] beginning you as you go along you

[1:23:56] improve the prompts as you go along and

[1:23:59] but are you versioning the that going

[1:24:01] along and are you versioning the the

[1:24:03] performance of the prompt overall?

[1:24:05] >> So when you say prompt do you mean the

[1:24:08] um the skill itself that I'm using?

[1:24:11] >> Yes. Yes. Yes. Yes.

[1:24:12] >> Yes. So yes. So the skill so the prompt

[1:24:15] lives within the skill. So when I type

[1:24:17] slashbug tracking or slashalph uh that

[1:24:21] that is the prompt that that um that

[1:24:23] gets written by claude um and managed by

[1:24:26] claude which means that the um

[1:24:30] uh that whole file is is is the prompt

[1:24:35] and therefore that is version

[1:24:36] controlled. So I I always I have a git

[1:24:39] running within that setup and then every

[1:24:41] time I change it I update um update. But

[1:24:44] you but but you remain subjective how

[1:24:46] you mention you have improved. Let's say

[1:24:48] that you have your data set will be an

[1:24:50] issue. I say that and the expected uh

[1:24:54] output would be the new feature added to

[1:24:57] the repo.

[1:24:57] >> Yeah.

[1:24:58] >> So you could

[1:24:59] >> is it more how do I evaluate whether

[1:25:00] it's any good or how

[1:25:01] >> Yeah, exactly. How do you know you're

[1:25:02] actually improving?

[1:25:03] >> I see. So how do you know if you're

[1:25:04] improving? That's a really good

[1:25:05] question. Um I do um stress test my

[1:25:08] skills. So with other skills uh and I

[1:25:10] say you know is this skill any good?

[1:25:11] Could you improve it? Could you write

[1:25:12] it? Um, I do

[1:25:15] I I spend quite a lot of my time

[1:25:17] tinkering with my system and my skills,

[1:25:18] probably more than I should. Um, I

[1:25:20] think, um,

[1:25:23] it's a bit subjective at the moment.

[1:25:25] What I haven't done, and this would be a

[1:25:26] really good exercise, is to try running,

[1:25:30] um, blind testing where you would run a

[1:25:32] set of tickets with one skill and a set

[1:25:33] tickets with another. Ultimately,

[1:25:36] because Claude is non-deterministic

[1:25:37] anyway, I think there's a high level of

[1:25:39] variability with any of those kinds of

[1:25:41] tests. So, it's it's really difficult to

[1:25:43] think about how to

[1:25:46] to construct a useful test in that way

[1:25:49] to know whether you're actually

[1:25:50] improving or not. Um, in general, the

[1:25:53] more context you give um into your

[1:25:55] prompt, the better it will do up until a

[1:25:58] point which isn't very easy and obvious

[1:26:00] to figure out where it becomes worse.

[1:26:02] So, um it's about kind of balancing that

[1:26:04] ultimately. But yeah, I haven't done a

[1:26:05] kind of objective improvement process. A

[1:26:07] great question though. It's a question

[1:26:08] just behind you.

[1:26:11] How are you version controlling the

[1:26:12] skills?

[1:26:13] >> I'm using GitHub at the moment. Um I do

[1:26:16] have a a product that I'm trying to

[1:26:18] build which is I mean this thing here.

[1:26:20] So if you want my skill by the way

[1:26:21] that's what how you get it. Um it's a

[1:26:23] project called air skills which you saw

[1:26:24] a brief preview of earlier from my my uh

[1:26:27] slide deck that my agent put together

[1:26:29] for me. But the idea is that um you uh

[1:26:33] can package and manage those skills as a

[1:26:35] unit. So you can create skills for your

[1:26:37] organization, you can create skill

[1:26:38] bundles. you can um create a skill set

[1:26:42] for your org that works for different

[1:26:43] teams within your org. Um and then that

[1:26:46] all gets versioned and updated for you

[1:26:47] without everyone having to learn how to

[1:26:48] use git and github. That's the idea. Um

[1:26:50] it is a real pain at the moment. I found

[1:26:52] it really really difficult to manage.

[1:26:54] Just for myself even just putting a

[1:26:55] skill on GitHub. Uh you know I can't

[1:26:58] imagine anyone from there that's quite a

[1:27:00] lot of friction for for a coder like me.

[1:27:02] It's I can't imagine non-coders using

[1:27:04] that. So so yeah trying to trying to

[1:27:05] build this. Um, so yeah, run that

[1:27:07] command on your machine. You'll have my

[1:27:09] skill.

[1:27:12] >> Um, sorry, there's a question just here

[1:27:14] first and then go next. Yeah.

[1:27:15] >> Um, how do you, you sort of touched on

[1:27:17] this a little bit, but sort of around

[1:27:18] the edges. How do you do knowledge

[1:27:20] management? So, I guess, you know, I use

[1:27:24] Claude for

[1:27:26] why is my VPN not working? And then I

[1:27:28] learn something and I want to record

[1:27:29] that and then I'm like I've got some a

[1:27:31] meeting with somebody with a

[1:27:32] transcription and I have that somewhere

[1:27:34] else and I've got a bit of code that I'm

[1:27:36] writing and all all I've got all of

[1:27:38] these different contexts but they're

[1:27:40] sort of very disorganized. Do do you

[1:27:42] have a way of thinking about how you

[1:27:44] organize all of that?

[1:27:45] >> Yeah. So I have a code directory and I

[1:27:48] have a vault directory and those are the

[1:27:49] two directories I work in. So the code

[1:27:52] directory contains a few different

[1:27:54] projects um that I work in a more

[1:27:56] classic way. The vault directory is

[1:27:58] where I do all of my other work and and

[1:28:00] frankly I I mostly start working in

[1:28:03] there even if I'm working on code and

[1:28:04] just tell it where the code is. Uh

[1:28:06] because the vault contains several

[1:28:08] thousand files with all of the different

[1:28:10] stuff that I have picked up learn um

[1:28:14] worked on with Claude over the last

[1:28:16] several years. Well, not with Claude for

[1:28:17] that long, but you know what I mean. Um,

[1:28:19] I started with uh Obsidian a long time

[1:28:21] ago and I've been working on that vault

[1:28:23] for for a long time. Um, and and with

[1:28:27] Claude now it just works on that for me.

[1:28:29] So when I do some research on how to fix

[1:28:31] my VPN or whatever it is, it just saves

[1:28:33] a file in there. I have some specific

[1:28:35] rules for how to kind of structure and

[1:28:37] manage that. Um, if you're interested

[1:28:39] more, I haven't written a lot about

[1:28:40] this, but I know Andre Kapathy's just

[1:28:42] written about it using LM as a wiki.

[1:28:43] That's a great article if you haven't

[1:28:44] seen it already. Um I know there's a

[1:28:47] Minjovich actually funnily enough has

[1:28:49] done a thing on me palace yesterday.

[1:28:51] That's another version of this. Um uh

[1:28:54] you can you can use that too. There's

[1:28:55] lots of different systems for that that

[1:28:57] out there. The best way to get started

[1:28:59] is it's markdown files in a file system

[1:29:02] and use it like a wiki. So run obsidian

[1:29:05] in one window and um claude in the other

[1:29:08] and just kind of work with it and and

[1:29:09] save things as you go. And so do you

[1:29:11] have an agent that then structures and

[1:29:14] puts those fault into folders or

[1:29:15] something like that?

[1:29:15] >> Yes. So it depends on your method. I use

[1:29:17] the zetlecast approach which is the one

[1:29:19] where you have one note per thought. So

[1:29:20] any thought of all just goes into a flat

[1:29:23] folder. Then I have a slash projects uh

[1:29:26] thing which has all of the projects that

[1:29:27] you saw um including one for this

[1:29:29] presentation. Um which which is my kind

[1:29:31] of unit of work for an agent that we

[1:29:33] work on together. It does a lot and then

[1:29:34] I do some and then it does some. Uh I

[1:29:36] have um transcripts in there. all of the

[1:29:38] the calls that I've ever recorded go in

[1:29:40] there. Um, and I use a tool called

[1:29:42] Leanne, uh, which is a command line

[1:29:46] embeddings tool. So, it basically just

[1:29:47] runs embeddings across the entire all of

[1:29:50] the text in the repository, all of the

[1:29:51] transcripts, all of the links I've ever

[1:29:52] saved, including all of the content.

[1:29:54] It's huge. Um, and um, then it can find

[1:29:56] things usefully and easily in there. Um,

[1:29:58] so you you the best time to start that

[1:30:01] is today because it just takes years to

[1:30:03] put together.

[1:30:05] I need to write more about that. Any

[1:30:07] other questions? Yes, one here.

[1:30:09] >> You said you had friction while

[1:30:11] versioning your skills. I've been using

[1:30:13] skills only for last month, so I'm not

[1:30:15] aware of this friction. Can you explain

[1:30:17] what the friction is?

[1:30:18] >> Um, I can I'm sure there are Has anyone

[1:30:20] here had had any kind of friction with

[1:30:22] my kind of managing and using skills

[1:30:23] yet? Has anybody else? Yeah, quite a few

[1:30:25] different people. So, yeah, it's it's a

[1:30:27] it's an emerging thing. It's not

[1:30:28] surprising you haven't experienced it

[1:30:29] yet if you're not using it for very

[1:30:31] long. What I found is that if you're

[1:30:33] just using them on your own, creating a

[1:30:35] file of skills and managing them is is

[1:30:37] quite straightforward. Putting them in

[1:30:39] GitHub is quite straightforward. It's

[1:30:40] sim links and and GitHub repository.

[1:30:42] It's fine. What where it becomes

[1:30:44] difficult is how you share that. So, how

[1:30:45] would you share a skill? Okay. Well, if

[1:30:48] you want to use MPX skills, you have to

[1:30:50] then put it in its own GitHub

[1:30:51] repository. That feels quite heavy

[1:30:53] weight just for one skill. I'd have to

[1:30:54] have 50 of them in order to share all my

[1:30:56] skills. So, that doesn't really work.

[1:30:57] Then it's more like, okay, if I don't

[1:30:59] want to do that, I just do I just send

[1:31:00] them the skill file? Do I send them a

[1:31:02] zip file? I mean, I can't think of a

[1:31:04] better way of doing it. Um, do I have to

[1:31:06] have a subm module in my skills folder

[1:31:07] for every single Git repository I share

[1:31:09] a skill with? It just doesn't make any

[1:31:11] sense. So, I think I think the idea of

[1:31:15] Claude has got some stuff in there

[1:31:16] around plug-in marketplaces where you

[1:31:18] can have a plugin which has a bunch of

[1:31:20] skills. That's the best way, but then

[1:31:21] you're versioning the plug-in, not the

[1:31:22] skills. So, that's probably the most

[1:31:24] seamless way. it just it just doesn't

[1:31:26] work that well. Also, there's a

[1:31:28] challenge around if you if somebody

[1:31:31] contributes to your skill, do you want

[1:31:33] their changes or not? It will depend on

[1:31:34] what the contribution is. Are they local

[1:31:36] to just them or are they um uh changes

[1:31:40] that could be generally incorporated and

[1:31:42] that depends on the skill and depends on

[1:31:43] them. So, you have to then manage that.

[1:31:45] So, do you run a backlog for each skill

[1:31:47] where you have tickets to improve the

[1:31:49] skills? Do you see do you see the kind

[1:31:50] of I think these are all unsolved

[1:31:52] problems. I'm trying to my contribution

[1:31:54] is trying to solve some of those. But

[1:31:55] these these are big problems we haven't

[1:31:57] figured out yet.

[1:31:59] Um other questions?

[1:32:02] There's one right at the back. Um if

[1:32:03] there's a mic that would be amazing.

[1:32:05] Thank you.

[1:32:09] One, two, one. Okay, it's working. Uh my

[1:32:12] question is about how we can uh scale up

[1:32:15] this approach with Ralph loop but like

[1:32:18] for the actual production team like I I

[1:32:20] don't know three engineers how to

[1:32:23] coordinate how to cooperate do you have

[1:32:25] any idea how we can organize it? Do you

[1:32:28] have any experience?

[1:32:29] >> That's a big question. How so just to

[1:32:32] make sure I've understood it. How do you

[1:32:34] scale this up so that you can coordinate

[1:32:36] whole teams using this kind of looping

[1:32:38] approach?

[1:32:39] >> Is that Yeah.

[1:32:41] with all the tickets and the skills.

[1:32:42] Yeah.

[1:32:45] >> 100%. Yeah, it's difficult. I think the

[1:32:47] teams that are where I've seen this work

[1:32:48] well is where they are proactive about

[1:32:51] updating tickets. The great thing is if

[1:32:52] you connect your ticketing system to the

[1:32:54] AI, it's really good at updating it. So,

[1:32:56] you should definitely do that. Um, make

[1:32:58] sure that you claim the ticket and move

[1:32:59] it into the doing column before it

[1:33:01] starts work. Um, and make sure that

[1:33:03] somebody else hasn't just done that

[1:33:04] before you start work. Do you see what

[1:33:05] I'm saying? That's really important to

[1:33:07] avoid contention. Those have always been

[1:33:08] issues with with bigger teams. Um, just

[1:33:12] in the same way, a couple of

[1:33:13] controversial things. Just in the same

[1:33:15] way that Ralph loops work really well by

[1:33:17] just doing one thing in a loop and quite

[1:33:19] sequentially. Um, you know, it could

[1:33:21] well be that the coordination overhead

[1:33:24] in our teams is caused by the fact we've

[1:33:26] got too many people in our teams and

[1:33:27] maybe we should have smaller teams and

[1:33:29] just more of them, right? So maybe maybe

[1:33:31] if you're trying to get 10 people to

[1:33:33] coordinate and using AI and Ralph loops

[1:33:35] and all of that, that's just not going

[1:33:36] to work. maybe you need three and maybe

[1:33:38] that's the way to to kind of run that

[1:33:40] project and then you split it down and

[1:33:41] then you have another the other seven

[1:33:43] people doing something else or or

[1:33:44] whatever. Does that make sense? So, so

[1:33:46] making the problem go away is the first

[1:33:48] step and making sure that you're already

[1:33:50] using your coordination mechanisms is

[1:33:52] the second step. Um and then just try it

[1:33:55] and and figure out what what the

[1:33:58] bottlenecks are. Be really, you know, be

[1:34:01] really good at retrospectives uh with

[1:34:03] this stuff. I think retrospectives and

[1:34:05] teams are often pretty anemic. It's like

[1:34:07] what should we do less of? What should

[1:34:08] we do more of? That's just a recipe for

[1:34:10] the same, more of the same. Um, and just

[1:34:12] changing tiny increments, which can be

[1:34:14] good, but ultimately this requires a

[1:34:17] radical rethink. So, be really conscious

[1:34:21] in making sure that your retrospectives

[1:34:24] are changing actual things about how you

[1:34:26] actually work or or have space to try.

[1:34:29] Let's just try using a RA flip on all of

[1:34:31] our work for a week and see what

[1:34:32] happens, you know? And if it doesn't

[1:34:33] work after two days, that's fine, you

[1:34:35] know. And then if you are someone here

[1:34:37] who's in a leadership capacity and is

[1:34:39] able to sponsor that kind of work, this

[1:34:41] is what it means to try and move to AI.

[1:34:43] If you want to transform your team, you

[1:34:45] are going to have to sponsor these kind

[1:34:46] of experiments and be okay with failure

[1:34:48] because so I was speaking to the leaders

[1:34:49] in here for a minute because it's going

[1:34:50] to be messy and it's going to it's going

[1:34:52] to fail a lot. But if you want real

[1:34:54] transformation, that's the only way to

[1:34:55] get it. You've got to give um your team

[1:34:57] space to try a whole bunch of different

[1:34:58] things. So give them air cover. Um so

[1:35:00] yeah it's it that's a big and

[1:35:02] complicated question. Um I think if

[1:35:06] you're able to and have the agency to

[1:35:07] just try it and see where it gets to.

[1:35:09] There's a whole um uh separate thing

[1:35:13] called uh theory of constraints which I

[1:35:15] haven't talked about at all which is the

[1:35:17] idea that within any team in any system

[1:35:20] there is always a bottleneck. There's

[1:35:21] always one bottleneck that's the big

[1:35:22] bottleneck. If you don't work on that

[1:35:25] one bottleneck, all of the other work

[1:35:27] that you might do to optimize and

[1:35:28] improve the system is pointless and

[1:35:30] actually probably counterproductive. So

[1:35:33] this is why some teams when using AI

[1:35:35] tools and using advanced AI tools like

[1:35:38] Ralph Loops, which is just, you know, AI

[1:35:40] or you know what we're doing now, but

[1:35:42] just on steroids, some teams when they

[1:35:44] implement it actually go slower. Some

[1:35:47] teams go amazingly fast, some teams go

[1:35:49] slow. Why is that? it's because they're

[1:35:52] not working on the constraint. The

[1:35:54] constraint in those teams might be the

[1:35:56] review process. If you or the release

[1:35:58] process, if you release your code once a

[1:36:00] month, um, and you're shipping 200 PRs,

[1:36:04] not 20 in that release, how do you think

[1:36:05] that's going to go, right? You know,

[1:36:07] it's not going to go well. So, that's

[1:36:09] why teams go slower because what they

[1:36:10] need to do is fix their release process,

[1:36:12] not their coding speed. Um, so always

[1:36:14] fix the thing that is the biggest

[1:36:16] bottleneck first. Then figure out where

[1:36:18] the bottleneck moves in the system and

[1:36:19] that's not predictable. It's random. So

[1:36:21] you have to figure that out. Then move

[1:36:22] and fix the next thing in the system.

[1:36:24] For more on that, read the gold by Elio

[1:36:26] Goldrat from 1984, no less. It's an

[1:36:29] amazing It's amazing book. Um, one more.

[1:36:33] Is there another question down here? Is

[1:36:35] there another mic? Where's the mic?

[1:36:36] >> I have a mic.

[1:36:37] >> Oh, you've got a mic. Great. Keep going.

[1:36:40] Um

[1:36:42] since you were asking about like talking

[1:36:43] about the constraints part this reminded

[1:36:45] me like I'm part of the AI team and we

[1:36:48] have an NI team and they write a lot of

[1:36:49] microservices and it's in different

[1:36:52] repositories.

[1:36:53] >> Okay.

[1:36:53] >> How do you deal with uh like coding now

[1:36:57] since is it like one big monor repo or

[1:36:59] is it like small small repos?

[1:37:01] >> Um you you have to try it different ways

[1:37:02] and see. Um, I don't think that the

[1:37:07] the GitHub or sorry, Git architecture,

[1:37:09] whether it's many repos or one repo

[1:37:11] really matters. You can always start

[1:37:13] your AI in um a folder above all of your

[1:37:16] other repos and just get it to work. It

[1:37:18] does a great job of that. So, that's

[1:37:19] okay. I think the bigger question is

[1:37:22] what are the coordination patterns

[1:37:24] within your teams and your services?

[1:37:26] Who's responsible for what? And how does

[1:37:28] that change with with AI? I think that's

[1:37:30] a more interesting challenge. The main

[1:37:33] reason I'm asking this was because like

[1:37:36] some of the microservices depend on

[1:37:38] others

[1:37:38] >> and then you have to release one of them

[1:37:40] you need to release a tag and then

[1:37:42] updating another and that's just

[1:37:44] >> yeah I think what AI will do is it will

[1:37:46] expose all of the places in which that

[1:37:48] process is inefficient because it will

[1:37:50] do everything faster which means that

[1:37:52] you if you're seeing those bottlenecks

[1:37:54] where you are getting dependencies

[1:37:56] between your microservatives guess what

[1:37:57] that's your biggest bottleneck um

[1:37:59] therefore you fix it. So how do you fix

[1:38:01] that bottleneck? Well, you might try

[1:38:03] atomic release system or you might build

[1:38:05] something that using claude that using a

[1:38:07] ra loop that um figures out a way of um

[1:38:11] uh coordinating releases across multiple

[1:38:12] repos more successfully. I don't know.

[1:38:14] But that's what you do. That's where you

[1:38:15] work. Don't work on anything else until

[1:38:17] that's fixed. If that's the bottleneck.

[1:38:20] >> Yeah, there's a question here. Do you

[1:38:21] want to pass the mic?

[1:38:21] >> Yes.

[1:38:23] >> I should say I'm kind of at the end of

[1:38:25] the content. There's if you which

[1:38:27] probably was was clear half an hour ago.

[1:38:29] Um, the only other thing I I mean I had

[1:38:31] a Q&A slide. If you are leaving, you're

[1:38:34] welcome to leave, but you're welcome to

[1:38:34] save for more questions. I would really

[1:38:36] appreciate some feedback though. So,

[1:38:37] this this QR code is the only thing that

[1:38:39] I manually added to these slides. Um, if

[1:38:42] you could just um fill that in, that

[1:38:45] would be lovely and amazing. Thank you.

[1:38:46] It's literally only three minutes, four

[1:38:48] questions. Um, it just helps me to

[1:38:50] improve and make sure that I do a good

[1:38:52] job of these workshops going forward.

[1:38:53] Um, that's also my LinkedIn. I post a

[1:38:56] lot of content on there. Do um do

[1:38:58] connect with me. you do um in case you

[1:39:00] mean some of this stuff, disagree with

[1:39:02] me. I love disagreement. I love it when

[1:39:03] people say, "Surely Chris, that's nuts.

[1:39:05] You shouldn't be doing that." Love those

[1:39:07] kind of comments. Uh because it really

[1:39:09] helps me to think and improve, which is

[1:39:11] what I love to do and because all

[1:39:13] because the Ralph Loops is doing all my

[1:39:14] other work. So, got no got nothing else

[1:39:16] to do.

[1:39:18] Uh great. Thank you. Um so, I just

[1:39:21] wanted to put that up there. Very happy

[1:39:22] to continue answering questions though.

[1:39:23] Um but if people wanted to drift away,

[1:39:25] then that might be a good time. Go for

[1:39:27] it. Um, my question is regarding multi-

[1:39:29] aent orchestration tools. My I'm curious

[1:39:31] if you've tried things like CVG's

[1:39:34] Gasttown or yes,

[1:39:36] >> there's another guy who does like MCP

[1:39:38] agent mail.

[1:39:39] >> Yeah, there's some really cool and

[1:39:40] interesting stuff. I still think we're

[1:39:42] in the wild west literally with Gasttown

[1:39:44] and things like that, but we we don't

[1:39:46] really know how how that's going to go.

[1:39:48] I have tried Gasttown. I couldn't really

[1:39:49] get it to work, but it was pretty early

[1:39:51] on. Uh for me I feel like the the agent

[1:39:55] orchestration side of things is I I

[1:39:58] think that we over complicate things by

[1:40:01] assuming that they need to be in

[1:40:02] parallel. I quite like the idea of just

[1:40:04] starting with a loop to start with. I

[1:40:06] don't feel the need to um have my AI um

[1:40:12] do lots of things at once before I can

[1:40:14] get just get it to to to do one thing.

[1:40:16] Well, it kind of goes back to the theory

[1:40:18] of constraints thing again. Um, I don't

[1:40:21] think speed of, you know, number of

[1:40:23] tokens per second is the bottleneck. I

[1:40:25] think that it's our ability to specify

[1:40:27] what we want and review what the AI has

[1:40:28] done. So, so if that's my bottleneck, I

[1:40:31] don't want to introduce more agents. So,

[1:40:32] I haven't spent lots of time with those

[1:40:34] tools kind of for that reason. I feel

[1:40:36] like they're solving a problem that not

[1:40:38] many people have yet.

[1:40:39] >> Yeah. So, so

[1:40:41] >> hello. Yeah.

[1:40:42] >> Yeah. Not just for speed, but for

[1:40:43] example, I don't know if you've

[1:40:45] experimented with MCP agent mail. So

[1:40:48] agents can uh lock files and speak to

[1:40:50] each other so they don't step on each

[1:40:52] other's toes and you can use different

[1:40:54] like cloud opus and codecs work on the

[1:40:57] same project so you get different brains

[1:40:59] working on the same project.

[1:41:00] >> Nice. Yeah. No, I haven't I think I've

[1:41:02] heard of it but I haven't tried it.

[1:41:03] Sounds like a super interesting idea

[1:41:04] rather like someone mentioned earlier

[1:41:06] about sub aents trying to look at things

[1:41:08] from a different perspective. I've had a

[1:41:10] lot of value for with doing that. I

[1:41:12] mentioned earlier my simulate audience

[1:41:14] um approach which takes um ultimately

[1:41:16] the way the way that it works by the way

[1:41:18] is it takes like um uh transcripts and

[1:41:20] also survey responses on my website and

[1:41:23] it it creates personas and has those

[1:41:26] personas think differently in parallel

[1:41:28] sub aents to take fresh looks at content

[1:41:31] from different perspectives. Um so that

[1:41:33] whole idea of having it um having two

[1:41:36] different things and two different

[1:41:36] models as well in that instance is a

[1:41:38] super interesting one. I think we'll see

[1:41:40] a lot more of that. I can see a lot of

[1:41:41] value in it. We definitely know that a

[1:41:44] they're pretty good at agreeing with

[1:41:45] themselves and you often get better a

[1:41:47] better contrarian take if you throw away

[1:41:48] the context and look at it again. So

[1:41:50] great principle. I think the the tooling

[1:41:53] is still super early which we all know

[1:41:54] but they're interesting ideas for sure.

[1:41:57] >> There's a question just behind you.

[1:42:06] >> Yeah, just keep going. They all turn on.

[1:42:08] >> So great talk by the way. Thank you. Um

[1:42:11] how much importance do you put on? So in

[1:42:13] terms of phases of how you develop

[1:42:15] you're spending a lot of time building

[1:42:17] out the context, creating the tickets

[1:42:19] and you have a system to run them in

[1:42:21] sequence

[1:42:23] gets pushed up. How much do you focus or

[1:42:25] emphasize on CI/CD running automated

[1:42:28] tests linting? Um does that give you the

[1:42:32] confidence to reduce the amount of code

[1:42:35] you're reviewing?

[1:42:36] >> Absolutely. Uh well yes and no. It

[1:42:38] depends what the code is. I think

[1:42:41] firstly I think CI/CD good testing is

[1:42:44] absolutely essential. Linting and all of

[1:42:46] those things. If you want an AI to do a

[1:42:48] good job for you, why wouldn't you give

[1:42:49] it those tools to to help it do a good

[1:42:52] job for you, right? Just the same way

[1:42:53] that humans do much better when they

[1:42:54] have linting and CI/CD and good tests.

[1:42:56] It's exactly the same. It's the same

[1:42:58] with clean code bases. You know, um you

[1:43:00] know, it's worth doing all of that work

[1:43:01] to make an AI do well. So, so that does

[1:43:04] give me more confidence in what I'm

[1:43:05] doing. The challenge is if the AI writes

[1:43:07] the tests then and also writes the code

[1:43:10] then there's a good chance that it's got

[1:43:12] something wrong about what you're trying

[1:43:13] to build. So often it doesn't make it

[1:43:16] doesn't make kind of obvious mistakes.

[1:43:18] The things that it gets wrong is it just

[1:43:19] completely misunderstands a feature,

[1:43:21] builds and says, "Yep, that's fine." And

[1:43:23] then ships it and then I'm like, "Oh my

[1:43:24] goodness, I don't I don't quite let it

[1:43:26] ship all the things." Only only with

[1:43:28] pre-release projects do I do that. But

[1:43:30] um but yes um it does give me confidence

[1:43:33] in in knowing that the thing uh is is I

[1:43:37] guess uh functionally acceptable for

[1:43:40] release or releasable. What I I still

[1:43:42] want to read the diffs because I still

[1:43:44] don't trust an AI with security. Um so

[1:43:48] um I don't know if I've lost uh lost the

[1:43:51] screen. There we go. Thank you. Um I

[1:43:52] think my computer went to sleep. I I I

[1:43:55] just don't quite trust the AI not to

[1:43:57] lose my customers data and I just won't

[1:43:59] compromise on that. So I will read the

[1:44:00] disc because I don't want to be

[1:44:03] responsible for that. Um it doesn't feel

[1:44:08] uh it doesn't feel like it feels like

[1:44:10] there are some problems for which you

[1:44:12] can trust AI fully like for example um

[1:44:15] linting uh testing. There are some

[1:44:17] problems which you can't really trust AI

[1:44:19] just because it's not responsible to do

[1:44:20] so. So maybe specific changes around

[1:44:23] security. If you're running production

[1:44:24] database migrations, you should probably

[1:44:25] check that they worked before running

[1:44:27] them in production. Um, and there are

[1:44:28] some that are a bit more fuzzy and hazy.

[1:44:30] So, uh, UI testing is quite interesting

[1:44:32] early. You know, the idea of having a a

[1:44:34] great feedback mechanism. If you're able

[1:44:36] to get an AI to click through your um

[1:44:39] project to check that it works, that's

[1:44:41] really powerful. It works 50% of the

[1:44:44] time in my experience, but it can be

[1:44:45] quite useful at least to have a first go

[1:44:47] at it. Uh having good endto-end tests is

[1:44:49] actually really helpful if you're using

[1:44:51] playright or something like that which

[1:44:52] it maintains for um for the skills

[1:44:55] project I showed you. Uh I have some

[1:44:57] very comprehensive end toend tests that

[1:44:58] set up full file systems of skills and

[1:45:00] get the AI to create two different um

[1:45:03] personas with running each you know a

[1:45:05] publisher and a creator and it just

[1:45:07] checks all the files are in the right

[1:45:08] places and that's really really useful

[1:45:10] um for those kind of full end to end

[1:45:12] tests. Um equally um uh if you're able

[1:45:16] to to build those kind of feedback

[1:45:18] mechanisms and give the AI a chance to

[1:45:21] um to really know whether it's done well

[1:45:23] that that's a brilliant place to be. And

[1:45:25] so I'm always looking to figure out how

[1:45:28] if an AI could tell whether something

[1:45:30] was good or not rather than me. And when

[1:45:32] I'm able to take myself out of that

[1:45:33] loop, it just massively improves the

[1:45:36] whole process. It's not always possible

[1:45:37] or desirable, but as much as I can, I

[1:45:40] do.

[1:45:41] You are designing the feedback uh

[1:45:44] process though you're you're

[1:45:45] >> you're deciding on the criteria and then

[1:45:47] letting AI execute on top of it.

[1:45:49] >> Yes. Um if if I'm working in a team of

[1:45:51] one, yes. If I am working with a product

[1:45:54] owner or product manager u or a

[1:45:56] designer, I'm really interested in in

[1:45:59] utilizing their skills and testers as

[1:46:01] well to to figure out ways to design

[1:46:04] those pro. This is what they this is the

[1:46:05] value that they bring to these

[1:46:07] processes, right? is how just in the

[1:46:09] same way that coders are thinking how

[1:46:10] could we avoid doing the typing

[1:46:12] ourselves now uh what about um if you're

[1:46:15] a product manager how do you um get the

[1:46:18] AI to do the easy stuff so that you

[1:46:20] don't have to do it you know how do you

[1:46:22] go through that process um same with

[1:46:24] testers uh super interesting area of

[1:46:26] research

[1:46:27] >> two things that come to mind on this

[1:46:29] have you what works well for in a small

[1:46:31] team what works what worked well for me

[1:46:33] is setting up adversarial reviews where

[1:46:36] you have spec

[1:46:37] The dev agent goes develops a reviewer

[1:46:40] that does an adversarial review. You

[1:46:42] pass that context back. The dev agent

[1:46:44] iterates generally catches a lot of

[1:46:46] things increases the amount of

[1:46:48] confidence I have to ship it. But even

[1:46:51] with that, the with the rate at which

[1:46:55] you can create specs and how much code

[1:46:57] you actually have to review, I end up

[1:47:00] being the bottleneck in the review

[1:47:02] process still.

[1:47:03] >> Yeah. Have you I'm always I'm always a

[1:47:06] bottleneck. I have 30 different things

[1:47:08] that I need to now review that my AI has

[1:47:10] done overnight or something and I'm just

[1:47:13] like oh my gosh, you know, and and the

[1:47:15] challenge for me is that a lot of that

[1:47:17] is not work that I should be doing. The

[1:47:19] only reason that it's given it to me is

[1:47:20] because I can't trust the AI with it,

[1:47:22] but any human could do that kind of

[1:47:24] work. So I'm now like, do I hire humans

[1:47:27] to just do the boring work? Is that

[1:47:30] ethical? You know, this is kind of an

[1:47:32] interest really interesting questions um

[1:47:35] for us to think through, but you're

[1:47:36] right. If we're able to design system, I

[1:47:38] love your adversarial point to to builds

[1:47:40] on something else somebody else was

[1:47:41] saying. Um if we're able to do that and

[1:47:43] design these systems such that we don't

[1:47:45] have to be in the loop, I think that is

[1:47:47] better for all of us because I don't

[1:47:49] just want to give a human a terrible

[1:47:51] job.

[1:47:52] >> Till then, we're employed. So,

[1:47:54] >> yeah, I guess.

[1:47:56] >> Thank you.

[1:47:57] >> No worries. Any other questions?

[1:48:03] Should we call it there? Folks, it's

[1:48:05] been a pleasure hanging out with you.

[1:48:07] Um, really, really fun.