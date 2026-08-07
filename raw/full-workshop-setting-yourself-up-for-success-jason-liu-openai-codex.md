---
type: youtube
url: https://www.youtube.com/watch?v=il1c1a2FufU
title: "Full Workshop: Setting Yourself Up for Success — Jason Liu, OpenAI Codex"
channel: AI Engineer
date_saved: "2026-08-01T23:31:18.362Z"
speakers:
  - Jason Liu
---

# Full Workshop: Setting Yourself Up for Success —Jason Liu, OpenAI Codex

[0:01] [music]

[0:13] All right, let's just uh kick things

[0:14] off. How many people here already saw

[0:17] the keynote that I gave? Okay, not

[0:20] everyone. That's good. This talk is

[0:22] effectively going to be a stretched

[0:24] version of what I had given in the main

[0:26] stage except two things. One, I want to

[0:28] give you some time to try to set things

[0:30] up yourself, you know, Wi-Fi gods

[0:32] permitting. And then also two, be a

[0:34] little more interactive. I I had to be

[0:36] very high level when I was talking about

[0:37] what I use Codex for, but here if you

[0:39] have any questions, we have like 70

[0:41] minutes. If you have any questions, just

[0:43] raise your hand and we can start

[0:44] answering some of these things,

[0:45] especially because not a lot of the

[0:46] workflows have been really well

[0:48] documented. And so if you if you're very

[0:49] curious on how things work, I'm really

[0:51] happy to uh answer any questions we have

[0:53] here.

[0:55] Um,

[0:57] yep. I'm Jason. I work at OpenAI. I

[0:58] don't really know what my job is

[1:00] anymore. We do a lot of things. Um,

[1:02] clearly the slides are already in the

[1:04] wrong order as well. But generally, you

[1:06] know, I've done things like doing a lot

[1:08] of prototyping work and just writing

[1:09] lots of code and just having a goal run

[1:11] for two days to build a game or some

[1:14] kind of web application, right? We've

[1:16] also looked at things like running evals

[1:18] and hill climbing things. Uh I also use

[1:21] computer use to edit iMovies and make

[1:23] little videos. I do partnerships and

[1:25] education and operations by taking my

[1:27] meeting notes, turning them into

[1:29] documents, working with other vendors,

[1:31] and also working with different

[1:34] foundations and programs to get funding.

[1:36] And all of this work is done effectively

[1:38] in the Codeex app. Uh I don't know if

[1:40] you can tell, but right now the slide is

[1:42] being served on local host in the inapp

[1:44] browser of the Codeex application. And

[1:47] so anytime I find something I don't

[1:48] like, I might just hit the annotate

[1:50] tool, give a comment, and have codeex

[1:52] clean up these slides. Um,

[1:55] I'm not the biggest token token maxer.

[1:58] Uh, I I think I'm doing all right. I see

[2:00] some folks doing like, you know, a

[2:02] couple couple billion every day. Uh, the

[2:05] goal of this talk isn't just to like

[2:06] waste all your tokens, but really help

[2:08] you avoid wasting your tokens by telling

[2:10] you what has actually worked and in

[2:12] particular sort of the tricks I use to

[2:13] make these things productive.

[2:16] Um, and again, the goal, like I said

[2:18] earlier today, was to catch you up on

[2:19] what's changed in the Codeex app, uh,

[2:22] give you some time to set things up. So,

[2:23] if you have time right now and you

[2:25] haven't downloaded Codex, just go ahead

[2:26] and do that. And then we can go a little

[2:28] bit deeper into setting things up. And

[2:29] so, I've actually prepared a little

[2:31] monor repo that you can use to clone in,

[2:33] get all the skills that you need, get

[2:35] all the setup that you need, and go from

[2:38] there. So, let's go a little bit deeper.

[2:40] Um, if you're new, feel free to set

[2:42] things up. If you're pretty experienced,

[2:44] just like chill out, try some of the

[2:46] things I'm talking about and then, you

[2:48] know, I think every 15 minutes we'll

[2:50] have some time for questions and we can

[2:52] go into the more like what feels like AI

[2:54] psychosis but maybe actually works kind

[2:56] of uh domain of using these systems,

[2:59] right? A lot of the work in knowledge

[3:02] work now because the coding is solved,

[3:03] because a lot of this operations work is

[3:04] solved is really just understanding what

[3:06] you can do. Right? In a world without

[3:08] AI, maybe I have 10 teammates. Each

[3:11] teammate is working on one thing. So, I

[3:13] need to have like 10 things I'm keeping

[3:15] track of. Now, we live in a world where

[3:17] like everyone I'm working with has 10

[3:19] projects. I now have to keep track of

[3:21] like 200 things and I don't know what's

[3:23] important. There's definitely a Slack

[3:24] message I've missed. There's probably

[3:26] some email I've missed somewhere by some

[3:27] foundation. And Codeex helped me

[3:29] organize all of this stuff. And so,

[3:31] again, the things I really want you to

[3:33] take away from this workshop is the fact

[3:34] that compaction works really, really

[3:37] well. Like I have threads now that are

[3:40] like five weeks old that have you know

[3:44] 400 sub aents in them and they generally

[3:47] just know what they need to do. They

[3:48] know what their job is. I also want you

[3:50] to become really comfortable with

[3:51] talking your computer. Uh earlier today

[3:53] I said that Tony Stark is not texting

[3:56] Jarvis, right? And there's really no

[3:59] future when text input is the thing that

[4:02] matters.

[4:04] I basically use a foot pedal. So I like

[4:05] I have a button that is transcribe and a

[4:07] button that says enter. And so I'll just

[4:09] come by my desk with my hands behind my

[4:11] back and I just go like you know fix

[4:13] this make this change also like message

[4:15] this guy on Slack and then I just go

[4:18] back to you know talking to my

[4:19] co-workers and trying to figure out what

[4:20] is like the human side of actually

[4:22] working at OpenAI rather than just like

[4:24] monitoring Slack all day. Uh appshots is

[4:28] my favorite feature of all time. It's

[4:29] like very satisfying. If any of you just

[4:32] like are on Codex right now, just press

[4:34] the command button side by side. You're

[4:36] gonna get this real nice animation or

[4:38] you're gonna get a modal to tell you to

[4:39] install computer use, just do that. It's

[4:42] amazing. Uh, invest in your personal

[4:46] memory, right? I at this point when

[4:48] someone asks me what I'm doing, I don't

[4:50] even have any idea. I kind of have to

[4:52] like look at my threads and look at the

[4:53] conversations to figure out how much

[4:54] I've delegated away and how much has

[4:56] been automated. And if you can then

[4:58] invest not only in skills for yourself

[5:00] but also plugins for your entire team,

[5:02] you can become the superhero that

[5:04] actually sort of augments the rest of

[5:06] your company. It's one thing to say, "Oh

[5:08] man, like I can use all these tokens and

[5:10] look how many tokens I'm using." But

[5:12] actually, if you're rewarded by how

[5:13] often the plugins you've built are being

[5:15] used by your teammates, that's a huge

[5:18] win, right? How are we doing like

[5:20] implementation? Like one of the most

[5:21] popular skills is just the like finalize

[5:24] the codeex app skill. and anyone who

[5:26] makes a pull request basically triggers

[5:28] the skill before review and basically

[5:30] everyone at the company uses it and it's

[5:32] always been able to find things that

[5:33] I've done wrong or is against the style

[5:35] guide. Um, one of the skills I have is

[5:38] just like reviewing docs and it's

[5:40] basically just copying the poll requests

[5:42] of uh the PR reviews of our friend

[5:45] Charlie over here. And so I just have

[5:46] like a review my code like Charlie based

[5:49] off the past year of like feedback he's

[5:50] given on poll requests. Review my code

[5:52] like Dominic. And these things are

[5:54] incredibly valuable. And then lastly,

[5:58] once you get more comfortable with all

[5:59] those first four things, your pinned

[6:02] threads with automations, these things

[6:04] that wake up these threads over time,

[6:05] they're going to feel like teammates.

[6:08] And more interestingly, now that threads

[6:10] can talk to each other, so every thread

[6:12] has the ability to list other pin

[6:13] threads, has the ability to rename

[6:15] threads, and it has the ability to send

[6:17] messages to each other. Not only can you

[6:19] have teammates, but you can have

[6:20] teammates that work together and you can

[6:23] effectively start having managers,

[6:25] right? And so you you went from an IC

[6:27] enabled by an IDE, then you have pin

[6:29] threads that feel like a team where

[6:30] you're the manager. And very quickly in

[6:32] the future, as models get better, this

[6:34] is where the the puck is going to skate

[6:36] to. You're going to start having your

[6:38] like manager threads and then your IC

[6:40] threads. And I'm sure in the future

[6:41] there's going to be some other crazy

[6:43] orchestration, right? And all of this

[6:46] really is due to the fact that

[6:49] compaction works. Even six months ago, I

[6:52] don't know like how many people here

[6:53] have been told this, but you were always

[6:55] told if a conversation goes very long,

[6:58] start a new thread, right? After 20

[7:00] messages, it's it's not going to be that

[7:02] good. Um, every feature should be its

[7:05] own its own uh conversation. If you do a

[7:08] code review, start a new session. Those

[7:10] things basically aren't true anymore.

[7:11] And a lot of it has to do with

[7:12] compaction. just pin the thread, rename

[7:15] it to the project ID, and that project

[7:18] thread should be able to delegate to sub

[7:20] agents, create new threads, and have

[7:21] conversations, and then write to your

[7:23] memory vault, which will allow you to

[7:25] just log what's happening. And then with

[7:28] automations, you can just wake them up.

[7:32] And so there's really three acts of

[7:34] working with AI, right? Working in

[7:35] codecs. You bring the context in, and

[7:37] I'll talk about how you do that and what

[7:39] are the ways you can bring context in.

[7:40] Then you work on it, right? For example,

[7:42] the slide deck is just in the Codex app

[7:44] and then you take actions out in the

[7:46] real world.

[7:47] [snorts]

[7:49] So I asked this during the keynote, but

[7:51] I'm also curious what the audience here

[7:53] is doing, but how many people use

[7:54] dictation when they interact with an AI?

[7:59] Nice. How many use dictation even at

[8:01] work?

[8:04] Yeah, I think we I think we should all

[8:05] be a little bit more shameless, you

[8:07] know, uh in doing these kinds of things.

[8:10] uh you generally talk about three times

[8:12] faster than you type and it's just

[8:14] incredibly productive to be able to give

[8:16] the messy version of what you're

[8:19] thinking about to the AI and take that

[8:21] extra time and just try to be even more

[8:22] thoughtful to the people you work with,

[8:25] right? It's like now like I don't want

[8:27] to send my coworker like a 15-minute

[8:30] voice memo, but I should be I should

[8:31] feel very comfortable sending an AI a

[8:34] 15minute voice memo because you're going

[8:35] to include some random tangents. You

[8:37] might just say, "I'm pretty sure I had a

[8:40] meeting with Charlie sometime last week

[8:42] about

[8:44] the agents SDK

[8:46] and it will go and read like 35 meeting

[8:48] messages to figure out which one it was

[8:50] and make it relevant." And now all of a

[8:51] sudden like whatever memo you're going

[8:53] to write or some project tracker that

[8:54] you're trying to do uh is going to work,

[8:57] right? But I would never do that with

[8:58] with um AI.

[9:02] So as you guys are doing and uh just

[9:04] listening to this talk like try to just

[9:06] sort of set up codecs the way that I've

[9:08] been describing these things right.

[9:11] So once you have your ability to just

[9:13] have you input into the machine a lot

[9:15] more effectively you can start thinking

[9:16] about using things like skills and

[9:18] plugins. Um skills is a very simple

[9:21] construct. It's just a couple of files

[9:23] and some scripts. A plug-in is a library

[9:25] of these things. And as you are just

[9:28] doing things many many times, you can

[9:30] start thinking about creating your own

[9:31] skills. And as you package a bunch of

[9:33] skills, you might start thinking about

[9:34] building out a plugin.

[9:37] If you want to install the plugins, we

[9:38] have a pretty good ecosystem now.

[9:40] Something I'm really proud of. If you

[9:41] just go in the sidebar, click plugins.

[9:44] You can just search whatever plugins

[9:45] make sense for you. So if you use Slack,

[9:46] you can install Slack. If you use Gmail,

[9:49] Teams, most of these things are pretty

[9:51] built out. If there's something that you

[9:53] feel like you are missing, just at me on

[9:55] Twitter and I'm sure one of my Twitter

[9:57] monitors will pick it up and send a

[9:59] message to someone in the connectors

[10:00] team.

[10:03] If you're already actually looking at

[10:04] the plugins panel, I also really

[10:06] recommend just starting the process of

[10:08] setting up the Chrome extension as well

[10:10] as computer use. We'll talk about this a

[10:12] little bit later, but like computer use

[10:16] was the first time in a long time I

[10:18] really sort of felt the AGI of being at

[10:20] work, right? Right. I was in iMovie for

[10:22] the first time. I didn't know how to use

[10:23] it and it was just teaching me how to

[10:26] like export the movie. It was able to

[10:28] like figure out where the sound effects

[10:29] were and it placed it in the right

[10:30] timestamps. Really small things like

[10:32] this that really make using a computer

[10:34] very fun again, right? Like I don't

[10:35] really have the time to like learn new

[10:36] software. But if code if Codex can just

[10:38] show me what's going on, it's it's it's

[10:40] pretty awesome. And as you can see the

[10:42] cursor move oftent times we're like

[10:43] cheering for it to to do the right

[10:45] action.

[10:46] If you don't have a link for the Chrome

[10:47] extension, you can just click this

[10:48] button here. The difference between

[10:50] computer use is computer use can work

[10:53] behind the scenes to control any

[10:54] application, right? So whether it's

[10:56] Slack or some, you know, trading

[10:59] software, god forbid, uh it can control

[11:01] all of those things. With the Chrome

[11:03] extension, it just controls everything

[11:05] in the Chrome app. But the cool thing

[11:08] here too is again it doesn't take over

[11:10] your screen, right? Sometimes I'll just

[11:13] be working on my computer. I'll go to

[11:14] the Chrome browser and I'll realize that

[11:16] like Codex has just opened up three tabs

[11:18] to just look at my Twitter DMs and then

[11:21] just closes them back up as I'm just,

[11:23] you know, responding to some other

[11:24] email. It's really cool to watch these

[11:26] things work in the background.

[11:29] You can connect a bunch of other

[11:30] plugins. I use things like Notion

[11:31] Linear. I also use Obsidian. It's just a

[11:34] good time.

[11:36] Once you do this, what you're going to

[11:39] find is just by asking really vague

[11:41] questions about your day and just

[11:43] tagging the right plugins, you're going

[11:45] to realize the AI can learn a lot about

[11:47] you, right? The AI does not a system now

[11:49] where it does like one search request

[11:51] and try to come up with an answer,

[11:52] right? It might check your emails and

[11:54] find a loose thread. It might check

[11:55] Slack or some meetings and figure out

[11:57] what's actually going on. Who are these

[11:58] people? I had I had one of my loops

[12:02] basically realize I was meeting with

[12:04] somebody look at their LinkedIn and

[12:06] realize that uh we went to the same

[12:07] university at the same time and so the

[12:10] moment I jumped on my call I was like

[12:11] hey you were also from water you know do

[12:13] you remember this this and this person

[12:14] and immediately we had a we had a

[12:17] connection right and obviously I didn't

[12:18] tell him it was AI but that's kind of

[12:20] some of the small things that you can do

[12:21] by just improving your automation you

[12:23] know it can make you closer to people

[12:26] um as you build out your memory system

[12:28] right as as you build up the codeex

[12:30] memory system and your your ability to

[12:31] trigger plugins, maybe day one, you have

[12:34] to tag everything,

[12:36] but I've become like a worse and worse

[12:38] manager over time. Right now, I'll just

[12:40] open up the composer and just say like

[12:42] what has changed about the launch and

[12:44] it'll be able to do a good job, right?

[12:46] And it it's that's possible because you

[12:49] have this long history, you have all

[12:50] these pin threads, you have these

[12:51] memories, right? It's the same thing

[12:54] with an employee. day one you have to

[12:55] show them every standard operating

[12:57] procedure you know but at some point you

[13:00] have an employee that has been here for

[13:01] seven years and you can just say hey I

[13:03] think you should make the company more

[13:04] money and they can figure it out but

[13:06] it's only because they have this context

[13:10] um one thing you can just do for example

[13:11] if you want to try it out is you can

[13:12] just say hey check out the schedule find

[13:14] all the sessions organize them in a

[13:16] markdown file put them in a spread

[13:17] spreadsheet and you'll just realize that

[13:20] we can do these things and maybe it'll

[13:22] do it with web search maybe you can do

[13:24] it with Chrome home. Um,

[13:27] lots of fun things here.

[13:29] If you want to get inspired by just

[13:31] looking at what kind of skills exist, we

[13:33] have two really great sources. One is if

[13:35] you just run the skill installer skill,

[13:37] it will actually list out all of the

[13:39] OpenAI curated skills. These include

[13:41] ones for things like GitHub, uh, best

[13:44] practices when writing playright code,

[13:47] you know, reotion for example. But you

[13:49] can also check out websites like skill

[13:50] set.sh SH or use uh I think this is like

[13:54] Versel's skills uh tool and then you

[13:57] just find other skills, right? So if I'm

[13:58] thinking about doing some more motion

[14:00] design or web design or I know that like

[14:03] someone told me I shouldn't do like use

[14:05] memo in React but I don't really know

[14:06] what that means. I can now go install

[14:08] the React best practices skill, right?

[14:11] But again, internally, one of the

[14:12] highest impact things I think I think

[14:14] you can do as like the AI champion in

[14:17] your company is to figure out what the

[14:19] team needs and build out those skills,

[14:22] right? I have a lot of skills on doing

[14:24] things like triage and how how do you do

[14:25] comms, right? If there's an outage on

[14:27] Twitter, how do you like convert that?

[14:29] Figure out who who needs to hear this,

[14:32] how do you like start the SEV, what stat

[14:34] sig gates do you need to check? All

[14:35] these things are now just automated.

[14:39] And that's exactly what I just said in

[14:41] this slide. Um, we also have a really

[14:43] good plug-in creator and a skills

[14:44] creator skill. So if you just ask Codex

[14:46] to trigger it, it will try to interview

[14:48] you to figure out what's going on. And

[14:50] even in a more useful way, you can also

[14:52] just do it yourself once, document

[14:55] everything, and just tell Codex to make

[14:57] a skill from what you've learned, right?

[14:59] And as long as you tell it, hey, by the

[15:01] way, every time you run this skill,

[15:02] you're allowed to edit yourself. If you

[15:04] learn something new, you can edit the

[15:05] skill file. These things will also

[15:07] improve over time. And a big theme

[15:10] that's happening over this talk really

[15:13] is just you kind of have to just get

[15:16] really comfortable with asking. Like

[15:17] we'll obviously try to make more of

[15:19] these things like more slash commands,

[15:20] but more and more like I'm just not

[15:22] touching a computer. So it doesn't even

[15:23] make sense for me to like run a slash

[15:25] command. I just want to say what's

[15:28] launching this week, check Twitter, you

[15:30] know, look at what I'm seeing in the

[15:32] browser.

[15:34] Um the example I've been developing

[15:36] internally has just been this like

[15:37] developer experience triage skills,

[15:39] right? So again this skill just

[15:41] documents like every Slack channel that

[15:43] should be uh you should be aware of. It

[15:46] knows which engineers have worked on

[15:48] what projects. It knows what Slack

[15:50] channels are taking in feedback. I know

[15:52] that if you DM me on Slack and you tell

[15:55] me that some regression has happened, I

[15:57] need to ask for a feedback ID. Right

[15:59] now, the agent does this automatically

[16:02] and it does it automatically with

[16:04] appshots.

[16:06] So again, I don't know how many times

[16:07] I'm going to say this, but appshots is

[16:09] one of my favorite features. How many

[16:11] people here have just like sent a

[16:12] screenshot to Slack to Codeex, right?

[16:17] Like almost everybody. But the issue is

[16:19] the screenshot does not have that much

[16:20] information, right? The model has to

[16:22] then do OCR. And if you send a

[16:24] screenshot of like a Slack thread, the

[16:27] model has to like read the Slack thread

[16:29] and then do a list Slack channels

[16:31] function and then realize like there's a

[16:33] guy named Charlie and then do like a

[16:35] list persons. It takes a lot of hops.

[16:38] But with appshots, it takes not only the

[16:40] image but the entire accessibility tree

[16:42] of the app. And so when I give it an

[16:45] appshot of a Slack channel, it knows the

[16:47] channel ID. So it knows exactly what

[16:49] function to call to post there. It has

[16:51] the user ids of every single person in

[16:53] that channel. So if I take an appshot

[16:55] and say do some research and reply, it's

[16:58] only one function call. It knows to send

[17:00] the send a message to channel like

[17:02] U12725

[17:05] and then because you know it knows that

[17:08] Charlie is like U425, it can do that in

[17:11] a very fast hop. So, not only is it a

[17:14] very quick way of getting context into

[17:15] your system, it just gives so much more

[17:18] context that these subsequent tool calls

[17:20] do a really good job. I have not like

[17:23] filled out a form in like two weeks

[17:25] because I just now tell Codeex to fill

[17:27] out this form, right? It it knows all

[17:29] the fields. It then figures out that

[17:31] it's in Chrome and so it'll use the

[17:32] browser extension. If it's in Safari,

[17:34] it'll use computer use. The model has

[17:36] become really really intelligent.

[17:39] And so just like you might have a

[17:41] manager that gets an email and they

[17:43] forward the email to me with like three

[17:44] question marks and is your job to figure

[17:46] out what's going on. You can kind of

[17:48] start doing that with your AI as you

[17:50] start investing in these skills. And

[17:52] most of this is because of the fact that

[17:54] you've built out your memory system. So

[17:57] if if you guys are are taking a look at

[17:59] these these slides, JXML/personal

[18:03] monorreo template that is actually the

[18:05] template I use on my personal computer.

[18:08] It's basically just a directory tree and

[18:09] a bunch of skills that I use to sort of

[18:11] grow out my memory.

[18:14] I'll also make one call out which is uh

[18:16] if you open this in your browser just

[18:19] press appshots and tell Codus to set

[18:22] this up for you and then you can pay

[18:23] attention to the rest of the talk.

[18:30] Yeah. Yeah. Yeah.

[18:33] You can just tell Codeex, Jason has

[18:35] written a personal monorreo template on

[18:37] GitHub. Please find it and install it.

[18:43] >> All right.

[18:44] >> Yep.

[18:51] >> Yeah. So, this is this is a really good

[18:53] point. So like for example on the DX

[18:56] team I make a lot of demos and so I have

[18:58] like 16 repos like you know real time

[19:01] demo one like real time demo two like

[19:03] funny right you have all these demos I

[19:06] don't create new projects for them right

[19:08] the only project that exists on my

[19:10] sidebar is the like personal monor repo

[19:13] sidebar

[19:15] but codeex is able to still manage files

[19:18] outside of that project directory and so

[19:21] in my agents MD file I just say,

[19:24] don't save any of the code in the monor

[19:26] repo. Save it in like slashdev.

[19:28] And just by that one line, if I tell it

[19:30] to clone a new project, it saves it in

[19:32] /dev. If I tell it that I want to work

[19:34] in my slides, it knows that there's like

[19:35] a slashdev slides directory. But it's

[19:38] just an easier way of managing

[19:39] everything, right? Like I want to start

[19:41] all my projects from my personal vault

[19:43] and then it can touch the file system in

[19:46] any way that it wants to. um one column

[19:49] it kind of breaks uh like git review

[19:51] sometimes in the sidebar but generally

[19:52] it's been a pretty good experience for

[19:53] me because I just re I just review my

[19:55] code in in GitHub.

[19:59] >> Sweet.

[20:01] Um these are some of the skills I have

[20:02] just installed there. Uh there's no need

[20:06] to take a photo just ask codeex

[20:08] afterwards. But um the assistant plugin

[20:11] basically has the ability to uh onboard

[20:13] you. It will interview you. It will

[20:15] figure out what plugins you need to

[20:16] install and then it will actually go

[20:18] create the threads it thinks it needs.

[20:20] It'll create the automations. It's a

[20:22] pretty fun one. I have a bunch of skills

[20:23] on like auditing AI code and AI writing.

[20:27] Um, I don't include this, but one of the

[20:29] my favorite skills of all time is called

[20:30] write like me.

[20:33] And if you want to make one like that,

[20:34] all you had to tell Codeex is, "Hey,

[20:36] Codex, I want you to read all the emails

[20:39] I've written in the past six months, all

[20:40] the Slack messages I've written the past

[20:42] six months, and write a style guide for

[20:44] how to message just like me."

[20:47] And then that's it. And then anytime I

[20:48] tell it to send a Slack message or write

[20:50] an email, it'll go, "Okay, this is an

[20:52] email. Clearly, this is just like a

[20:54] customer support form, so I will be much

[20:56] more stern in my messaging. Let me go

[20:58] draft this email." Hasn't failed me yet.

[21:01] Um, one thing I've also added that I

[21:04] think are are really valuable to call

[21:06] out is I've made my own loop skill just

[21:08] because I I do like having a slash

[21:10] command every once in a while. I'll talk

[21:11] about this in in part two. And I also

[21:13] have a skill called simple HTML artifact

[21:16] that just designs artifacts the way I

[21:18] like them. I want my backgrounds to be

[21:20] white. I want some uh certain style

[21:22] guides. And an Ultra Goal, which is like

[21:24] a super version of Goal that we'll also

[21:26] talk a little bit more about. Um, and

[21:29] then if anyone's curious, like new

[21:30] person, new project. That's just a way

[21:32] of like writing a script to bootstrap a

[21:34] new person. I kind of have like a palunt

[21:36] here for my personal life now. It's just

[21:37] like a CRM. And basically, anytime my AI

[21:40] agent like finds a new person that's

[21:42] emailed me or messages me on Slack or on

[21:44] iMessage, I just keep track of these

[21:46] things. And the new project is the same

[21:48] way.

[21:51] Let me just double check. Yeah, cool.

[21:53] Um, and so I'll give you maybe like 10

[21:56] minutes to try to try to set this up and

[21:58] we can go in a little bit of a Q&A. I'm

[22:00] happy to answer any questions about like

[22:02] how we bring context into our systems,

[22:04] how I've organized my personal memory

[22:05] vault and uh, you know, some other crazy

[22:08] uses of app shots if anyone has any

[22:10] questions. Yeah. What's your question?

[22:12] >> Does this get rid of the need for like

[22:14] an

[22:16] [snorts]

[22:20] >> Yeah. Um, so the question was, do I

[22:22] still basically use Obsidian Brain? The

[22:24] answer is yes, because I still want to

[22:26] sort of like keep track of everything.

[22:28] Um, one thing I actually really like

[22:31] doing is I make my monor repo vault like

[22:34] a git repo. And so maybe it'll work on

[22:37] it for like a couple of days and I'll

[22:39] come back and I'll just run git diff.

[22:41] And by running git diff, I can just see

[22:43] like what the model has updated and what

[22:45] the model has not updated. And I can

[22:47] just confidently review that over time

[22:49] and just realize that, oh yeah, like I

[22:51] guess Charlie did respond to this person

[22:53] and close the loop. And I didn't realize

[22:54] that, but now I know, right? And and

[22:57] oftentimes that's relevant in another

[22:58] conversation.

[23:00] More than that, it's also very helpful

[23:02] for when other people are asking me

[23:04] questions, right? Codeexes will feel

[23:06] very good about reading my memory vault,

[23:08] drafting a response, and then ask me for

[23:10] permission to send that message off. And

[23:13] so if someone messaged me on Slack a

[23:15] question that the AI could have

[23:16] answered, the AI will just try to answer

[23:18] it. Um, and it might be simple things

[23:21] like, oh, like who should I talk to

[23:22] about this project, right? And the model

[23:24] knows because it's it's in the memory

[23:26] vault. Um, one thing I also call is if

[23:29] you want to use more tokens, you can

[23:31] also have like custom automations where

[23:33] the job is to maintain and manage and

[23:35] garden your memory vault. Um, but

[23:38] generally that has not been a big issue

[23:40] for me.

[23:42] One question over there.

[23:55] Yeah,

[23:59] >> honestly I generally go down the path of

[24:02] like yolo one shot only because

[24:04] >> Oh, that's scared the hell out of me.

[24:08] Um, only because I know that like the

[24:12] way I build my skills is that they they

[24:14] self-improve all the time, right? Like I

[24:18] think the difference would be if I make

[24:20] a skill that I share with my team, I

[24:22] think about that a little bit more,

[24:24] right? Because it's like okay, do do

[24:26] does the does the triage plugin know

[24:28] that like who is working on what

[24:30] feature? Can it route correctly? For my

[24:32] personal work, I generally just build a

[24:35] skill as quickly as possible and every

[24:37] time it makes a mistake, I just correct

[24:38] it and I tell it to to move on. And then

[24:41] generally what happens is if I've used a

[24:43] skill for two months, I just generally

[24:44] feel pretty good about sharing with my

[24:46] team because I I've just experienced it

[24:47] working. Um yeah, most of my skills

[24:52] connect to so many other plugins and

[24:53] connectors that uh

[24:56] I just don't know how to eval because I

[24:58] can't like snapshot my Slack at any

[25:00] given time. There's a question over

[25:03] there.

[25:09] Sometimes I'll use the codec cli every

[25:11] once in a while if I want to like

[25:15] like

[25:17] be a little bit faster, but generally

[25:19] the desktop app has pretty good has a

[25:23] pretty good experience primarily because

[25:24] everything I do is an appshot.

[25:28] Like if I'm watching a video, I'll just

[25:30] like appshot like summarize this and

[25:31] I'll continue to watch the video. I'll

[25:33] just watch a video with like the LLM

[25:35] like summary, right? Or it's like if I

[25:37] see some kind of form or someone asked

[25:39] me to sign something, I go like appshot

[25:40] use docuign like sign this and save it

[25:42] to my desktop. Uh like last week it like

[25:45] docu signed something then like found a

[25:47] faxing service and like fax my medical

[25:49] records. Like that's awesome, but the

[25:51] CLI can't really do that. Um yeah,

[25:56] any other questions?

[26:00] >> Yep.

[26:02] Why?

[26:04] >> Like I'm like learning to juggle. I'm

[26:06] like I'm like learning to play the

[26:07] drums. Um well, I think it's like two

[26:10] things. Like in the office, what I'm

[26:12] trying to do is I'm trying to like talk

[26:13] to more people, right? It's like it's

[26:16] like I'm just the AI's assistant to get

[26:18] more context that the AI can't get. Uh

[26:20] no, I think my job when I'm at work

[26:22] really is just when the AI is running, I

[26:24] should be talking to somebody. I should

[26:25] be like learning about what they're

[26:26] working on, try to make connections and

[26:28] then figure out what are the, you know,

[26:31] points of connection, right? It's like I

[26:33] should be talking to more people in real

[26:35] life as AI works. Like someone had a

[26:39] question over there. Oh,

[26:51] [snorts]

[26:53] >> yeah.

[26:54] So the question is like when do I think

[26:56] 55 is overkill versus 53 spark

[27:01] I think this is colored by two things

[27:03] like because I have unlimited tokens I I

[27:06] don't really make those decisions and

[27:07] then secondly because I'm not watching

[27:09] my AI work like most of these things are

[27:10] automations that run in the background

[27:12] the latency has not really affected me

[27:14] the times where I use Spark is primarily

[27:17] when there's a very simple uh

[27:21] there's a really simple computer use

[27:23] task

[27:24] Like I just wanted to like click all the

[27:25] buttons and fill out this form like uh I

[27:28] think I think I have a thing that just

[27:29] checks me into flights and that is like

[27:32] a spark agent. And so now like anytime

[27:35] there's an email that's that's like a

[27:36] flight check in my agent will check me

[27:39] in, download the boarding pass and then

[27:40] send the boarding pass to myself on

[27:42] iMessage,

[27:44] right? And like I just never do that

[27:46] kind of stuff anymore. Uh again, it is

[27:50] really weird when you're just like

[27:51] working all of a sudden you check your

[27:52] you check your Chrome desktop and it's

[27:54] just like you know JetBlue is just like

[27:56] the first page but again it's it speaks

[27:58] to the fact that like having access to

[28:00] your computer is uniquely powerful

[28:02] because it has your O and your

[28:03] credentials and and your your um your

[28:07] file system. Yeah.

[28:09] Over there.

[28:16] >> Yeah.

[28:20] Sorry, you're you're really quiet. Do

[28:21] you mind just speaking up?

[28:22] >> Yeah.

[28:26] >> Yeah.

[28:33] >> Yeah.

[28:41] >> Yeah. So I have we'll talk about this

[28:44] basically in the next section but um

[28:48] with remote control I can control both

[28:50] my local computer and like a remote

[28:52] computer. I think the difference is

[28:54] computer use is tricky because it has to

[28:56] be on your computer. That's one thing.

[28:58] The second thing too is if you go into

[29:00] settings computer use there's a flag

[29:03] called locked use. And if you enable

[29:07] that, as long as your laptop is plugged

[29:09] in, even if the monitor is closed, you

[29:11] can still trigger computer use commands

[29:13] through your phone. Um, that also gets

[29:16] really weird because like go on.

[29:22] >> Yeah,

[29:31] >> you're you're really quiet. I can't hear

[29:33] you.

[29:34] >> Okay. Okay, cool. Um, yeah, like if you

[29:37] have multiple computers, you can still

[29:38] connect both your your your iPhone to

[29:41] both those devices, right? Like some

[29:43] people just have a Mac mini. Uh, I think

[29:45] the difference is do you want to control

[29:46] your codecs or specifically computer use

[29:48] because that that requires like an

[29:49] operating system with a guey. Um, but we

[29:51] can talk about this in in a little bit.

[29:54] Cool.

[29:58] Like I said before, were there any more

[30:00] questions? I don't know if someone just

[30:01] raised their hand. Go ahead.

[30:05] risk

[30:06] and how do you control that?

[30:08] >> Yeah,

[30:11] I mean there's always some kind of risk

[30:13] like

[30:15] like I think earlier versions might like

[30:17] edit a document a little too eagerly,

[30:20] right? Um, but realistically

[30:23] I think we've done I I think these

[30:25] models have done a really good job of

[30:26] being very precautious and more often

[30:29] than not it's me going like no please

[30:31] just just do it like just just like just

[30:33] sign the document like this is like

[30:35] please just like send this message. Um I

[30:38] found that uh the 55 models are pretty

[30:41] reluctant to take these like destructive

[30:43] actions. That's one thing. The second

[30:45] thing is if you look at the sidebar here

[30:51] you have the ability to change your

[30:53] permissions. And so as a show of hands,

[30:57] like how many people use like uh ask me

[31:00] for every permission?

[31:02] Yeah. Yeah. Exactly. Okay. How many

[31:05] people use like full auto full

[31:08] permissions yolo mode?

[31:11] Okay. I don't like that. Um and then how

[31:14] many people have used auto review?

[31:17] >> Yeah. So, I think auto review is

[31:19] actually has been really really great.

[31:21] And again, I'm usually annoyed by the

[31:23] fact that my models won't do more than I

[31:25] want them to do. Um, and so generally

[31:28] has not been as big of an issue. The

[31:31] only times the only examples where I'm

[31:33] really annoyed is it will like edit

[31:35] documents it shouldn't be editing, but I

[31:38] just like add something with the HSMD

[31:40] and it's never really messed with me too

[31:42] much. Yeah, I know that's not a real

[31:45] answer, but I think with a combination

[31:46] of auto review and agents MD file, I

[31:49] have generally felt pretty safe. Yeah.

[31:52] And then if you're also at an

[31:53] organization, there's different admin

[31:55] settings that you can have. So, for

[31:56] example, at OpenAI, uh you can't use an

[31:59] MCP server to send an email if any of

[32:02] the people in that email is a non OpenAI

[32:05] email, right? Or like you can't uh send

[32:08] a Slack message to external Slack

[32:10] channels. Um,

[32:12] that's when things get dangerous, right?

[32:14] But these are some things that you can

[32:16] control.

[32:19] One question over there.

[32:20] >> Yeah.

[32:29] >> Do you have any concerns regarding

[32:31] either security and or privacy?

[32:36] >> That's not because I work here. Um,

[32:41] I think that

[32:43] I think that's hard to answer because I

[32:45] don't really know what are like data

[32:46] retention policies for like individual

[32:47] versus enterprise. But Charlie, do you

[32:50] have any thoughts there? I'm just gonna

[32:53] throw over to you.

[32:59] >> Privacy.

[33:00] >> Let's say you get a I don't know email

[33:03] offering you a job at a competitor

[33:05] company.

[33:07] >> [snorts]

[33:09] >> Uh I mean I I think a lot of it goes

[33:12] back to we do want to make like the

[33:14] models are fallible, right? I don't

[33:15] think anybody in this room would be

[33:16] shocked to understand that like you can

[33:18] still jailbreak a model for example. Uh

[33:20] but both the the models themselves are

[33:23] getting smarter and better at not you

[33:25] know doing silly things and at the same

[33:27] time we're figuring out like Jason

[33:29] mentioned what are those bigger you know

[33:31] limitations around the sandbox. We we

[33:33] started with very simple sandboxes where

[33:35] it was like you can just run this

[33:37] command and nothing else. And slowly the

[33:39] sandbox has grown to the entire computer

[33:41] and I think we're figuring out what are

[33:43] the like computer level or organization

[33:45] level you know edges to that sandbox

[33:48] that we need to build.

[33:52] This is me using the delegate skill.

[33:57] Great answer. Any more questions before

[33:59] we jump into act two?

[34:02] Sweet. Awesome. So, we just talked about

[34:04] a bunch of different ways of bringing

[34:06] context into the system, right? You can

[34:08] use your voice, you have plugins, you

[34:10] can use appshots, and then you can also

[34:12] design different skills and plugins to

[34:14] figure out how to do more system

[34:16] systematic work. So, now we can talk a

[34:18] little bit more about the work itself.

[34:21] So, like I said before, like every

[34:23] pinned thread effectively is a teammate

[34:25] in my mind. I have my chief of staff

[34:27] thread. I have uh you know, Swix prefers

[34:29] to call it like, you know, the god

[34:30] thread. uh I I have a thread to manage

[34:33] the agency SDK whether that's

[34:34] implementation and documentation. It has

[34:37] two sub agents that it delegates to uh

[34:39] the CLI, the open source program and uh

[34:44] Twitter.

[34:49] But if you want to make it wake up,

[34:51] right, all you have to say is keep an

[34:53] eye on this until sometime, you know,

[34:56] keep an eye on this every 30 minutes. If

[34:58] you remember those like secret words,

[35:00] you can effectively automate like about

[35:01] everything in your life at this point.

[35:03] Um, and what this does, it will trigger

[35:06] a heartbeat automation, a thread

[35:08] automation. You should think of it as a

[35:11] way of scheduling a message back into

[35:13] the thread. Right? In the beginning when

[35:15] we set up automations, it was very much

[35:17] the case that a automation would create

[35:19] a new thread every time. So it might be

[35:22] give me a morning brief and it would

[35:23] create a new thread and then it would do

[35:24] this kind of work. But as these models

[35:26] got better, I think the right design is

[35:28] scheduling these messages into the same

[35:30] thread. So for example, because if you

[35:33] if you download the monor repo, we have

[35:35] a loop skill. If you just do loop,

[35:37] right, this is the equivalent of just

[35:38] saying keep an eye on this. Uh keep an

[35:40] eye on this pull request anytime there's

[35:43] feedback fix it. Make sure it's always

[35:45] mergeable. Make sure it's always rebased

[35:47] on master. Make sure that CI is always

[35:49] passing. And it'll just do that. And

[35:52] then maybe you make a pull request in in

[35:54] on a Monday, you get really busy.

[35:56] Thursday afternoon, all the feedback has

[35:58] been integrated. You know, CI is passing

[36:02] and uh you know, you're not like 4,000

[36:04] commits behind uh the main thread.

[36:08] [snorts] I also do this with support,

[36:10] right? Again, if if someone is like

[36:12] dealing with some issues on on Twitter,

[36:14] on Slack,

[36:15] Appshot, right? you know like at like at

[36:19] developer experience skill figure this

[36:21] out and it'll say okay this was an issue

[36:24] on the browser side like James is the

[36:26] one that works in a browser the channel

[36:28] is called like browser feedback I'm

[36:30] going to post in that channel DM James

[36:34] and then I'll use computer use to open

[36:36] up Twitter to let them know that I've

[36:38] like escalated this internally and then

[36:40] I will check every hour to figure out if

[36:43] James on that channel has responded and

[36:45] then let the user No. And then sometime

[36:48] later in the future, you're like

[36:50] checking your computer and all of a

[36:51] sudden like Twitter opens up and it's

[36:53] just like hey so and so this has been

[36:55] resolved and then you just you you just

[36:57] hit enter and then you check your thread

[36:59] it's like oh yeah pull request has been

[37:00] made it will get merged by next Thursday

[37:02] and like this is a crazy experience to

[37:06] witness right this is this actually

[37:08] allows us to do way more support without

[37:10] making it like the worst part of my job.

[37:16] And then with a chief of staff thread,

[37:18] oh this is this is I remember this is

[37:19] where my slides get really messed up

[37:21] thanks to a codeex. So I can't do

[37:22] everything just yet. Um you can also

[37:25] just do a loop that says check all my

[37:27] connectors and give me an update as to

[37:30] what is the most important thing I

[37:31] should be thinking about. You know give

[37:33] it give it to me in a nice format. You

[37:35] know make sure you have links to every

[37:36] email that you read. Make sure you have

[37:38] a Slack link so you can deep link into

[37:40] the application. And now just it's been

[37:42] really really helpful to track these

[37:44] random things. And again I think in my

[37:46] chief of staff thread I had that line

[37:48] that says check into all my flights if

[37:51] you can like send me the book the uh the

[37:54] boarding pass on iMessage and it just

[37:57] works. And again it's really weird when

[37:59] you start seeing your computer doing

[38:00] doing stuff while you're while you're

[38:02] working because again most of these

[38:04] tasks run in the background and because

[38:06] I've had my permissions on it's not like

[38:08] it needs to tell me that it's using

[38:09] Safari. I just like find out that it's

[38:11] using Safari that might be scared to

[38:14] some people, but you know, it's pretty

[38:17] great. And then lastly, this is

[38:19] something that happens really a lot at

[38:21] at OpenAI, which is I don't even know

[38:23] what's what what's launching, right? Is

[38:26] something delayed? Has something landed?

[38:29] Is it, you know, going to happen at

[38:30] 11:00 a.m.? Is it happen at 4 p.m.? I

[38:33] have no idea.

[38:35] We've actually made a ton of progress on

[38:36] this and I'm pretty sure this is also

[38:38] just automation and AI, but I actually

[38:40] used to have codeex make me a PowerPoint

[38:43] every Wednesday night of what's shipping

[38:45] for the rest of the week, right? And

[38:48] that's useful. And then you just say,

[38:49] "Great, it's useful for me. Now, let me

[38:51] make sure I can just post this on the

[38:52] channel as a Slack message." And now

[38:54] you're again using your skills not only

[38:56] to benefit yourself, but benefit your

[38:58] entire team. That's kind of like the

[39:00] plug-in hero mindset.

[39:03] And this one's pretty funny too. Uh I

[39:05] have an example. Let me just double

[39:06] check the slide. Yeah, I have another

[39:08] example which has also been pretty crazy

[39:10] which is the one I gave during the

[39:12] keynote which is I had been editing like

[39:15] a short film in iMovie and on my bike

[39:18] ride someone gave me feedback about the

[39:21] video. So I just went on my phone and I

[39:22] just like sent told the like, "Okay,

[39:24] there's a file somewhere. Can you just

[39:26] like find it in iMovie? There's only one

[39:27] iMovie project. Read the Slack message.

[39:29] Export the video. If you can't, if the

[39:32] Slack MCP server does not allow file

[39:35] upload, use computer use to upload the

[39:37] file and then watch that thread every

[39:39] hour and if they have any feedback,

[39:41] reexport the video and reshare it and

[39:44] then like bite home. And by the time I

[39:46] got home, it was like, oh, by the way,

[39:47] it was actually way easier to use a

[39:49] Google Drive connector. So, I've just

[39:50] been uploading the same file on Google

[39:51] Drive instead. So, they only have like

[39:53] one URL to manage. And uh yeah, we like

[39:57] fixed a bunch of stuff in the typography

[39:59] and then we shipped it again like kind

[40:02] of mind-blowing stuff. It's very simple

[40:04] but mind-blowing, right? But that's what

[40:06] a heartbeat is, right? A heartbeat is

[40:08] just a way of waking up your thread over

[40:09] time to take some actions. The other

[40:12] thing you can do is set goals. So slash

[40:14] goal is pretty amazing. It basically

[40:17] defines a verification step and says,

[40:20] "Okay, as long as this is running, check

[40:22] this verification step.

[40:25] if if it's not done, keep going, right?

[40:28] Very simple idea. Um, and as long as

[40:31] there's a verifier, it does really

[40:33] really well.

[40:35] For example, I've just been uh migrating

[40:38] a bunch of software into Rust,

[40:41] right? It's like if this is a Python

[40:42] project that is amendable to be

[40:44] rewritten in Rustgo,

[40:48] migrate the back end to Rust, make sure

[40:49] all the unit tests pass. And I was able

[40:52] to not only rewrite the rich terminal

[40:55] library in Rust, I also rewrote UV and

[40:58] TypeScript um just to see if I could and

[41:01] uh we're like 100% test coverage. It's

[41:04] it's pretty amazing. Obviously, you

[41:06] should not be doing this in your work,

[41:07] but it's it's very helpful to just

[41:08] understand that as these systems have

[41:09] better verification, you can make a lot

[41:11] of progress.

[41:14] In the in the monor repo, I've also

[41:16] included a skill called ultra goal. And

[41:19] all it does is instead of setting the

[41:22] goal in the app, we set it in a file,

[41:25] right? So we have a goal MD file. And

[41:27] what that means is you can edit the goal

[41:29] while it's being run. So you can add

[41:31] more scope uh just like many many real

[41:33] projects do. We also define a plan again

[41:37] that we can reference. But the benefit

[41:39] of this is as you're learning more about

[41:40] the projects and you're changing the

[41:42] plan and the goal as these as these

[41:45] models are just like looping uh it can

[41:47] update it understanding of the system

[41:50] and then sometimes I have like a state

[41:51] MD file or a work log just to track

[41:53] these like longer running tasks like if

[41:55] if things are running for like a day or

[41:56] two I want to know what's going on and

[41:59] I'm never going to read this like 4

[42:01] gigabyte like you know session JSON

[42:03] object but I can look at the work log

[42:05] have it have another model summarize it

[42:06] using like a side chat and go from

[42:08] there.

[42:11] This meant to say remote control, but

[42:14] again, if folks are just like on their

[42:16] computers, I also recommend trying that

[42:18] out. In the sidebar, there should be a

[42:19] button that says remote control,

[42:21] especially if you have the iOS app. This

[42:22] is the thing where we talked about being

[42:24] able to control your phone. So, control

[42:26] your computer through your phone, right?

[42:28] So if you go on the iOS app, you enter

[42:31] codecs, you can you can do this like

[42:33] flow where you can scan a QR code and

[42:35] all of a sudden your your your uh touchp

[42:38] can message and cue any thread in the in

[42:42] the application including I think remote

[42:44] threads. Uh this is super powerful

[42:46] because again oftent times you know

[42:49] every time I try to leave the house

[42:50] someone's like asking me for something

[42:52] and now I can just ask codecs. Uh really

[42:55] I should just be having something that

[42:56] monitors Slack and just does it. But

[42:58] like I you know I'm not there yet.

[43:01] But again this is one of those big uh

[43:03] you know feel the AGI moments,

[43:06] right?

[43:09] Yeah. And again like I said the chief of

[43:11] staff threat effectively is like the

[43:13] single source of truth for basically

[43:15] what's going on in in in my life on my

[43:17] personal computer. I have a different

[43:18] one. Uh lots of good stuff.

[43:22] This is all I wrote for mine. Create a

[43:25] create and pin a cha staff thread every

[43:27] day at 8 am. Check all these connectors,

[43:30] figure out what's going on, and then uh

[43:33] you know, do a good job. And again,

[43:35] you'll just start you'll start editing

[43:36] it over time, right? Maybe you don't

[43:37] like the formatting or you wish you

[43:39] included links. Uh for a while, what I

[43:41] made it do was if it found all the

[43:44] emails, not only to ask it to draft the

[43:46] responses, but I would make it open a

[43:47] Chrome tab for every email I need to

[43:49] reply to in Chrome. And so I'll open my

[43:52] computer, I'll take a meeting, I come

[43:54] back and on my computer is just like

[43:56] seven Chrome tabs and I can just review

[43:57] the drafts and send each one like small

[43:59] things like this just to prepare your

[44:01] computer while your meetings are

[44:03] happening. Uh really productive. So now

[44:05] we talked a little bit more about like

[44:06] just like doing the work itself, right?

[44:08] We haven't really gone into things like

[44:10] artifacts just yet, but I'm also curious

[44:11] if anyone has any questions on how I've

[44:13] been doing things so far

[44:15] >> over here.

[44:16] >> So I notic so I do a lot of

[44:19] >> Yeah.

[44:20] I notic.

[44:25] >> Yeah.

[44:27] >> I get a lot of stuff.

[44:29] >> Yeah.

[44:30] >> So, what's your advice?

[44:32] >> I generally always prefer to have the

[44:35] model write the goal or write the write

[44:37] the prompt itself.

[44:39] >> Like more and more of these models are

[44:41] just getting better at doing that. And

[44:43] it's like more in distribution to what

[44:45] they want. Um, in reality, I just I will

[44:48] send like a 10-minute voice memo, right?

[44:50] I'm just like like, you know, this is

[44:53] some issue that's happening. I think

[44:54] there's a project about some thread. Uh,

[44:57] I don't know if they got back to me. I

[44:59] think their name is Dylan. Uh, please

[45:01] look in Gmail. Like, take it's like a

[45:05] really really messy.

[45:07] And then it's like, okay, well, do I

[45:08] want to make a set of gold? Do I want it

[45:10] to create a new thread? Do I want to

[45:11] make a new skill?

[45:13] Like that's really sort of where my

[45:15] taste lies now. It's like, okay, how do

[45:17] I want to organize what the work product

[45:19] is, you know? Do I tell it to then do

[45:21] all this work and put it into a index

[45:24] HTML to share it? Do I want to make a

[45:26] word doc? That's basically it. But I

[45:29] generally just send very long messages.

[45:32] Yeah, like for example here, like this

[45:34] is not the prompt for the chief of staff

[45:37] thread. This is the prompt so the model

[45:39] can make the cha staff thread, right?

[45:42] And that model will be much that output

[45:44] will be much better at determining how

[45:47] verbose the the automation is or how

[45:49] often it should check or what

[45:50] connectors. Um and then because I have

[45:53] this monor repo, one of the things I do

[45:55] is every project file has

[46:00] a link to every slack channel this

[46:01] project is relevant for. And the model

[46:03] will just see that and you go read those

[46:05] slack channels, right? every like person

[46:07] file has their email address, their

[46:10] Slack connector, multiple work

[46:13] addresses, and they'll read all those

[46:14] things. I would never prompt that

[46:16] myself. Yeah.

[46:20] >> Yeah. Yeah. So, I think in that example,

[46:22] what I realized was when I mentioned the

[46:24] Slack channels that are relevant for a

[46:26] project, the results were better. So, I

[46:27] just added that in the front matter of

[46:29] like the markdown file. But these are

[46:31] the things that you grow over time.

[46:46] the only

[46:51] >> I mean I have not tried like the

[46:53] deepest. So the question is like what is

[46:55] the difference between this and like an

[46:56] open claw and a Hermes agent? Think I

[47:00] think I'm sure there's differences I'm

[47:01] not aware of right now, but I can

[47:03] imagine a world where it's going to get

[47:04] much like very very similar very

[47:06] quickly, right? Like most of my work and

[47:08] I'll talk about this later on is like my

[47:10] threads manage themselves, right? It

[47:13] could be the same thing as a sub agent.

[47:14] Um I don't know how many people use

[47:17] Hermes agents and open claw for like

[47:18] very wide work, right? Like I think I

[47:23] like I think I tried openclaw to do some

[47:24] like house automation stuff.

[47:29] Yeah.

[47:36] >> Yeah. So the qu the comments like yeah

[47:38] with with these models there's only one

[47:39] thread. I think that's very reasonable

[47:41] just in in reality there's just there's

[47:44] just like so many things that we work on

[47:45] that like I need the organization right

[47:47] it's like you know it's like is there a

[47:49] world where like my banker and my

[47:51] therapist and my personal trainer and my

[47:53] girlfriend is the same person like maybe

[47:55] but like my like you know tiny brain

[47:58] can't figure that out and like it's easy

[48:00] for me to understand what the work is by

[48:02] making folders right it's like the

[48:05] computer doesn't know the folders is but

[48:07] the folders are for me in some ways if

[48:09] that makes sense

[48:10] Yeah,

[48:12] cool. Great. No more. Yeah, one question

[48:17] that one.

[48:30] >> Yeah.

[48:38] >> Yeah. skills, but like I didn't know

[48:42] that it just automatically.

[48:45] >> Yeah.

[48:46] >> Um I think it depends. I think it

[48:48] depends on how proactive you are in like

[48:50] telling the AI to remember these things.

[48:53] So for example, like once I realized I

[48:55] should include Slack channel IDs in like

[48:57] project documents, the model's like,

[48:59] "Oh, there's a Slack channel. I should

[49:00] read the Slack channel." And that became

[49:02] really obvious. Now I I basically never

[49:05] tag things. I don't really know when

[49:06] that happened. Um but yeah, again a a

[49:11] lot of it is just getting the habit of

[49:13] remember this for next time, update the

[49:15] skill for next time, update the agent

[49:17] dot for next time. And that is the

[49:21] >> uh sometimes

[49:25] >> I mean I think it would be hard for me

[49:26] to like prove it. Like there's also a

[49:28] memory system that's like outside of the

[49:30] docs. Generally, I'm like pretty happy

[49:32] with the memory. I I don't know if if I

[49:34] can like give you like a time estimate,

[49:36] but I think I'll just try it out, right?

[49:38] Like use it for a couple weeks, have

[49:41] make sure memory is turned on, by the

[49:42] way. Like it's also in your settings. I

[49:44] know our settings panel is like pretty

[49:45] crazy right now, but um yeah, I think I

[49:48] would just turn memories on and just see

[49:49] whether or not these changes happen over

[49:51] time because like I basically never I

[49:54] don't remember a single time I've like

[49:55] you like at mentioned something. Um

[50:00] yeah,

[50:00] >> and the last part is pretty pretty fast,

[50:02] right? So we talked about reading

[50:04] context, we talked about working with

[50:05] the context. Now that the last thing to

[50:07] do is just like write context. Um most

[50:10] of this has been pretty pretty uh

[50:13] simple, right? You can draft emails, you

[50:14] can draft Slack updates. If you feel

[50:16] very brave, you can send them, but like

[50:17] be please be respectful. Like um I'm

[50:20] sure Charlie has gotten hundreds of sent

[50:22] from chatbt uh Slack messages from me

[50:25] over time. Uh but I hope they're they

[50:28] sound like me more now. Uh building one

[50:31] pages is also pretty good. Like this

[50:33] slide deck was made with uh codecs and

[50:35] soon we'll be able to do things like

[50:37] serve applications and now I think you

[50:39] know at least internally so much of the

[50:41] work that we do has just been sharing

[50:43] like apps rather than like full

[50:45] documents.

[50:49] I don't know how many people know about

[50:50] this but we also have a really good like

[50:51] artifacts ecosystem. like more and more

[50:53] uh codeex has become a tool for all of

[50:55] the work that I do. It can open and

[50:57] render like Excel spreadsheets, word

[50:59] documents, uh PDFs, slides and with the

[51:02] annotation tool uh editing things is

[51:05] like pretty fun. So even with these

[51:08] slides, this is this is actually served

[51:09] on the inapp browser of the Codex app.

[51:12] And what I'll do is I'll just give my

[51:13] talk and I'll press next and press next.

[51:16] And then when I don't like something, I

[51:17] just select it. It's like, hey, like fix

[51:18] this. I don't like the white space. Like

[51:20] these two slides need to be broken up

[51:21] two more slides. I hit enter. As Codex

[51:24] is working to clean this up, I'm just

[51:25] going down to get down the slides. And

[51:27] it's it's generally been a pretty

[51:29] natural way of working. Like this this

[51:31] deck really came from me reading my own

[51:34] blog post out loud and then generating

[51:36] the material as we go along. But, you

[51:39] know, it's still it's still like two or

[51:40] three skills to make the slides look

[51:42] this way.

[51:45] Yeah.

[51:47] Um Yeah. And then once you do that, you

[51:50] can do again again. It's the same

[51:51] concept over and over again, right? You

[51:53] can you can build out these loops that

[51:54] just touch other parts of the system.

[51:56] Like most of our project tractors are

[51:57] just Google Sheets updated with loops.

[51:59] Uh the slides are loops and the

[52:02] annotations. Yeah, I just said

[52:03] everything. My bad. Um

[52:07] and then one thing that's also very

[52:09] helpful is like as the company gets more

[52:11] like context dense, right? Maybe it's

[52:12] all OA agents, just the ability to like

[52:14] summarize things like over Slack has

[52:16] been incredibly useful.

[52:21] That was clearly like a slop slide that

[52:23] uh Chad GBT edited in.

[52:28] So once you can take actions on these D

[52:29] artifacts, I think the the biggest thing

[52:31] and the thing I really want people to

[52:32] try out is just computer use. Um again,

[52:36] it's like it's like the first time I had

[52:38] that like feel the AGI moment, right?

[52:40] Like a cursor is like trying to do some

[52:42] action. you can see like move across the

[52:44] screen and like when it does it really

[52:45] well like you really gain a lot of faith

[52:48] in the system. So we we obviously have

[52:51] like plugins, right? And this is for

[52:53] sending stack messages, but then the

[52:55] inapp browser is going to get even more

[52:57] powerful soon, right? We're going to be

[52:58] able to basically treat this like the

[53:02] browser that you use. Like I now try to

[53:04] use the in browser as much as possible.

[53:05] And then for everything else, use

[53:07] computer use. Um how many people have

[53:10] used computer use by the way? Very. Oh,

[53:13] it's like 10% of you. What's a crazy

[53:15] thing that you've done? What's like the

[53:17] craziest thing anyone's done? Any any

[53:20] volunteers?

[53:21] >> Managing my home.

[53:23] >> Home lab.

[53:24] >> Yes.

[53:24] >> What's a home lab?

[53:33] >> Nice.

[53:46] >> Wow. Any other like crazy computer use

[53:50] stories?

[53:53] Got to get AGI pill and try out computer

[53:56] use. Um

[53:59] yeah, one thing I'll say is like because

[54:01] computers are so powerful like you get

[54:02] like you mentioned before there is some

[54:04] like safety component. I am now

[54:05] remembering this example where like

[54:07] again because the slack connector was

[54:08] not able to upload files. If this model

[54:11] is really determined, right? Uh it could

[54:13] be like the one wish willow. it just

[54:15] says, "Okay, great. Well, if I can't add

[54:16] a Slack uh file, let me like go on

[54:19] computer use and press file upload and

[54:21] do that, right?" There will be some

[54:23] times where the model based on how you

[54:25] prompted becomes really determined and

[54:27] say, "Oh, like I I it seems like I can't

[54:29] email someone using the Gmail connector.

[54:32] Let me open up Chrome and hit the send

[54:34] button." So, those are the kind of

[54:36] things that you should be really wary

[54:37] about, right? These are like real

[54:38] security issues. And again, um,

[54:42] more than not, like having things in the

[54:44] agent MD file has been really, really

[54:46] helpful, especially if you do things

[54:47] like, uh, guardian mode or auto mode,

[54:49] excuse me.

[54:51] Um, and it has also really changed the

[54:53] way I think about uh doing work. I feel

[54:55] like now when I'm doing things like

[54:57] building an application, if it's a

[54:59] native application, most of my testing

[55:00] is just done by codeex using computer

[55:03] use. If it's a website, again, it's just

[55:05] using the inapp browser.

[55:08] Um, I think we talked a lot about this

[55:10] already, like handle service work, like

[55:13] it's kind of awesome just like being on

[55:15] a checkout page, app shot, you know,

[55:17] find me a coupon. Like, it's made me

[55:19] more money than than I I would have uh

[55:21] expected earlier. Uh, filling out forms,

[55:23] testing applications. Um, I haven't

[55:26] really had a good use of this just yet,

[55:27] but it can also control the iPhone

[55:29] through screen screen mirroring. So, uh,

[55:32] do with that what you will.

[55:35] And this is kind of sort of the

[55:36] escalation of the talk, right? Then the

[55:39] question is like what can the computer

[55:40] not do and like why can't it do it? And

[55:42] one of the things that like you can't do

[55:43] is control codecs. But you don't really

[55:46] need to because these codeex threads can

[55:50] already talk to each other. Uh you it

[55:53] can already control itself in very

[55:54] powerful ways, right? If you think of

[55:57] the example, this is not the slide I

[55:59] want.

[56:02] Damn. Okay. I think I think I messed up

[56:04] some slides.

[56:06] Earlier in the talk, I talked about this

[56:08] idea that if there was some kind of

[56:09] support issue, I could take an appshot

[56:11] and it'll call this like DX triage skill

[56:14] and I will it will rename the skill.

[56:16] It'll do the loop and it communicates

[56:18] like Slack and Twitter and it's very

[56:19] nice, but I still need to be the person

[56:21] that triggers these things, right?

[56:23] That's the same thing as me seeing an

[56:25] issue and making a polar request

[56:27] in the future. Well, I I mean the future

[56:30] for you it's happening already now here.

[56:31] But now what I just have is I just have

[56:34] a single like monitor thread and anytime

[56:37] it identifies any of these issues, it

[56:39] will go off and create a new thread and

[56:41] the thread's job is to do all this

[56:43] triage.

[56:45] And what might happen is maybe this

[56:47] triage is waiting on someone on Slack to

[56:49] acknowledge this issue. Maybe a pull

[56:50] request has been created but it has not

[56:52] merged. If someone else complains again

[56:54] in the future, the monitor thread just

[56:57] goes, "Oh, yeah. I think this is the

[56:58] same issue." Not only is the same issue,

[57:00] let me send a message to that, you know,

[57:02] downstream thread so that it's aware

[57:04] that this issue is recurring. Maybe that

[57:06] thread will send a Slack message, but in

[57:08] the main thread, I'll still see a

[57:09] message that says, "Hey, it's been like

[57:11] the third day this issue has been live

[57:13] uh based on Twitter feedback.

[57:16] Should we do something?" And like those

[57:19] are the things I'm I'm it's very hard

[57:22] for me to keep track of these things

[57:23] because I'm just like on Twitter all the

[57:24] time. But by the agent being able to

[57:26] just manage and consume all this

[57:28] information, it makes these things much

[57:30] more tractable. Um I definitely messed

[57:33] up the slides over here, so I'm going to

[57:34] skip a couple slides.

[57:39] Yeah, this is this is the example.

[57:42] Um

[57:43] and and I really want you I really

[57:45] really want you to play around with this

[57:47] idea. I don't think it's been fully

[57:49] baked yet, right? Most of my work is

[57:52] about just having monitors create

[57:54] subthreads. These threads are then

[57:55] managed and pinned onto the sidebar.

[57:57] Like that's also one of the best things,

[57:59] right? Like with a sub agent, the thread

[58:02] just has these like shapeless entities

[58:04] floating in the background. Uh like you

[58:07] know the JSON thread or like the Galileo

[58:10] thread or whatever. The difference with

[58:12] sub aents versus these threads is

[58:14] because they show up in the sidebar, you

[58:15] can kind of just notice that something

[58:17] has changed. You know, there's a new

[58:18] issue that's come up, right? And a lot

[58:20] of it too is like just using the sidebar

[58:22] as effectively like the hub of

[58:25] understanding like what are the ongoing

[58:26] like work streams. And this has been

[58:28] like super powerful for me. But it all

[58:31] just starts from pinning a thread,

[58:32] taking actions, having this monor repo

[58:34] to sort of manage all of your context

[58:36] and then having different ways of waking

[58:38] systems up. And earlier these systems

[58:40] wake up because you messaged it or you

[58:43] set up a heartbeat. And now these things

[58:45] can be woken up by another thread

[58:47] running somewhere else. And so more

[58:49] often than not like most of my

[58:50] automations just happen on the monitor

[58:53] level of threads and they trigger and

[58:55] create new threads and then manage

[58:56] themselves.

[58:59] Yeah. So I think we talked about a bunch

[59:02] of things, right? tal about computer use

[59:03] structured plugins

[59:05] and uh

[59:08] yeah, I think that's basically it. Try

[59:11] out some computer use stuff. I I know I

[59:13] can't really I'm like really worried

[59:15] about the Wi-Fi here. I'm going to try

[59:17] something too bad, but um

[59:19] yeah, try out app shots, try out

[59:21] computer use, and really play around

[59:22] with what uh these models are capable

[59:24] of. There's a question over there. I'll

[59:26] do that one next.

[59:35] I don't think I can show you on this

[59:37] computer. They're going to like take me

[59:39] away.

[59:40] Um I mean I I can talk about a little

[59:42] bit. So So basically my monor repo is

[59:45] set up so that it looks very much like

[59:47] the one over there. I have a projects

[59:50] directory and in that projects directory

[59:52] is a named directory for every

[59:54] workstream I'm working on. So maybe it

[59:55] is the you know voice launch video or it

[59:59] is the um like the the agents SDK right

[1:00:04] or it is uh the codeex open source grant

[1:00:06] program. So those are sort of some of

[1:00:09] the projects. Then I have a people

[1:00:11] directory which is just like every

[1:00:14] single person that's ever DM me, right?

[1:00:16] I know what they're working on. I know

[1:00:18] what kind of problems they're thinking

[1:00:19] about. I know what other like uh like

[1:00:22] Slack channels they're part of. And then

[1:00:24] I have a bunch of different like loose

[1:00:26] notes, agent summaries. I have like

[1:00:28] daily summaries of what I've done. This

[1:00:29] is mostly just to test the limits of AI.

[1:00:31] I don't think it's very useful for that

[1:00:33] kind of stuff. Mostly it's just the

[1:00:36] projects and the people, right? Um, and

[1:00:40] then I have a to-do list that an agent

[1:00:41] just maintains. So I have a single

[1:00:42] thread just like checks that to-do list.

[1:00:44] Oh, this says it was undone. Let me have

[1:00:46] a sub agent verify that like no one has

[1:00:48] done this task. Those things are pretty

[1:00:51] token token expensive. I don't really

[1:00:53] know if it would be worth people do

[1:00:55] setting this up for themselves unless

[1:00:56] they just like don't use that many

[1:00:58] credits. Um, but I think the biggest

[1:01:01] ones is just like the Shiva staff

[1:01:03] thread. 9:00 a.m. tell me what's

[1:01:05] happening today. Tell me what's

[1:01:06] happening this week. And I think if you

[1:01:07] just do that, you're going to get a lot

[1:01:09] of uh a lot of juice out of that.

[1:01:19] >> It's like honestly I just I've never

[1:01:22] experienced it. I think

[1:01:27] like I think I think the compaction is

[1:01:28] just like really really good. Um I know

[1:01:31] this not a very satisfactory answer, but

[1:01:34] like if I could improve parts of the

[1:01:36] model, I would rather improve like its

[1:01:39] writing tone rather than like its

[1:01:41] ability to search the context. Um,

[1:01:43] generally it's been it's been a pretty

[1:01:44] good I think it might have to do with

[1:01:46] like the way the codeex memories have

[1:01:48] been set up, but I have not dug in too

[1:01:51] much into those details. I think you had

[1:01:53] a question over here.

[1:01:56] >> Yeah.

[1:02:00] >> Yeah.

[1:02:09] >> Yeah.

[1:02:16] Yeah.

[1:02:22] >> Yeah. So I think the question was just

[1:02:23] like how do you deal with memories like

[1:02:26] bleeding across different projects?

[1:02:29] I don't think I have a good answer to

[1:02:30] that primarily because it's unclear to

[1:02:33] me what the downstream side effect would

[1:02:36] be. Maybe like one project uses like

[1:02:38] npm, another project uses like yarn or

[1:02:41] something. But I mean generally I just

[1:02:43] clean those up in the agent MD files for

[1:02:45] those specific projects, right? So

[1:02:47] another thing to mention is like every

[1:02:49] project directory has its own readme and

[1:02:51] its own agent MD files. And so yeah,

[1:02:53] like I think sometimes like one project

[1:02:55] I was working on was like

[1:02:57] npm and one was like PMP. I just clean

[1:03:00] that up in the agents MD. And I was I

[1:03:01] would be curious like how much of that

[1:03:02] can be cleaned up just by using those

[1:03:05] simple tools. But talk to me afterwards.

[1:03:06] I'm really curious like what's so bad

[1:03:09] about the the bleeding.

[1:03:12] Yeah, maybe that that would be a good

[1:03:14] example of like having project level

[1:03:16] scoping versus a single thread. But um

[1:03:20] yeah, I might have to look into more

[1:03:21] details about how the memory part is

[1:03:23] actually running.

[1:03:25] Any other questions over here?

[1:03:36] No. So I think um

[1:03:39] honestly at this point it just kind of

[1:03:41] knows. It's like such a it's such a bad

[1:03:43] answer but it's almost like an AGI like

[1:03:45] I feel like to me it feels like a very

[1:03:47] AGI pil. But I think generally in the

[1:03:49] beginning when I was working with it I

[1:03:51] would have a skill called like check

[1:03:52] notes and it's like hey if you feel like

[1:03:55] you need to check your notes like check

[1:03:56] the notes.

[1:03:57] All right. And so if I if I had a hunch

[1:04:00] or some intuition that the model might

[1:04:02] not be able to do this, I would just

[1:04:03] mention like, hey, check the notes. Um,

[1:04:07] but even like if you look at my like uh

[1:04:10] open profile, I think like my like check

[1:04:13] notes skill has been used like a 150,000

[1:04:16] times, but I've like never mentioned it

[1:04:19] in the past like two three months. It's

[1:04:20] because again, I think this the memory

[1:04:21] system has been uh doing a lot of the

[1:04:23] heavy lifting. But again it's it's like

[1:04:25] onboarding an employee in the in the

[1:04:26] first you know two three months of

[1:04:29] onboarding an employee. You have to give

[1:04:31] a lot of instruction. You have to give a

[1:04:32] lot of you have to give them a lot of

[1:04:33] context and you have to let them fail

[1:04:35] and when they fail you have to give them

[1:04:37] an opportunity like write down what

[1:04:39] they've learned and like clean up

[1:04:40] itself. Um I would be very surprised if

[1:04:44] you got good results in the first like

[1:04:45] day of setting this up. But I mean just

[1:04:48] yet maybe not to your surprise but now

[1:04:50] it's like I don't it kind of just works

[1:04:53] right. And that that's a great feeling

[1:04:54] to have, right? Because it it it lets me

[1:04:56] go back in the flow of just like doing

[1:04:57] my job.

[1:04:59] You a question?

[1:05:00] >> Yeah. Thanks so much for

[1:05:03] asking

[1:05:05] CSS and

[1:05:09] >> given that it's rapidly changing

[1:05:15] >> develop like just so not productivity

[1:05:17] but just like coding in general.

[1:05:18] >> Yeah.

[1:05:22] Yeah,

[1:05:28] >> I'm so old. That's so long ago. Um,

[1:05:39] like I have a line that's like if you

[1:05:40] want to have good taste, you kind of

[1:05:41] have to eat, right? Like I think your

[1:05:44] job is to like consume a little bit more

[1:05:46] like try out different applications like

[1:05:48] you know like do you know what a good

[1:05:50] onboarding flow looks like? Do you know

[1:05:51] what that feels like? Have you built an

[1:05:53] app that makes you frustrated? And just

[1:05:55] like your ability just like consume more

[1:05:57] things and

[1:05:59] develop your vocabulary on like how to

[1:06:01] complain about things that are bad. How

[1:06:02] do you like complain about like the

[1:06:04] slop? Those are the things those are the

[1:06:06] skills I think will be very valuable.

[1:06:08] And specifically around vocabulary,

[1:06:10] right? like you can't really describe

[1:06:11] things that you don't really understand.

[1:06:13] Um, and this happens in like both like

[1:06:16] things like cooking, right? Like if you

[1:06:19] just don't know what the ingredients

[1:06:20] are, you can't describe that something

[1:06:21] is too salty or it could be it's like it

[1:06:23] lacks some acid. Like you just need to

[1:06:26] like consume a little bit more and then

[1:06:28] think critically about why you like

[1:06:29] something and why you don't like

[1:06:30] something. Um

[1:06:33] because I think I think taste is the is

[1:06:35] a big issue but I think a lot of it is

[1:06:37] because we are not consuming the right

[1:06:39] like stuff right like try out all the

[1:06:43] different apps if you're thinking about

[1:06:45] apps for example. Yeah.

[1:06:49] >> Any other questions?

[1:06:55] >> Yep.

[1:06:57] >> [snorts]

[1:06:59] >> Yeah.

[1:07:06] >> Yeah.

[1:07:13] >> Uh which part? So, so

[1:07:22] I understand

[1:07:25] aast

[1:07:40] >> Yeah. I mean like unironically that

[1:07:42] slide just says like threads can talk to

[1:07:43] each other just ask. Basically there is

[1:07:46] a list thread tool and a send message to

[1:07:49] thread tool that Codex has available.

[1:07:51] And so

[1:07:53] typing that is kind of awkward but

[1:07:55] really I just say

[1:07:58] like sometime last week I was working on

[1:08:01] slides. Can you go find that thread,

[1:08:03] rename it and pin it for next time?

[1:08:06] >> Right? Like I would never type that but

[1:08:07] again voice input makes it really easy.

[1:08:10] Um, sometimes I'll say for for example,

[1:08:12] this talk I I I think I messed up some

[1:08:14] slides. Basically, I had a main slide

[1:08:16] writing system. Uh, and I said, "Okay,

[1:08:18] like this slide could be split up in

[1:08:20] three acts. Make up a thread for each

[1:08:23] act. Pin it, rename it act one, two, and

[1:08:25] three, and uh, review each section. And

[1:08:28] then once it's done, review the whole

[1:08:30] slide." Um,

[1:08:32] and yeah, I generally like to just ask

[1:08:34] it. I mean, I think I'm going to try to

[1:08:36] add more like commands to be a little

[1:08:38] bit more explicit around thread control,

[1:08:39] but I think that will just come as the

[1:08:41] models get better and and as the model

[1:08:43] is like more aware of what codecs can

[1:08:45] do. Um, but yeah, it really is just like

[1:08:50] like I think one thing you should try to

[1:08:51] do is just have a thread and just say

[1:08:53] read all the other threads that are

[1:08:54] pinned and like rename them and like use

[1:08:58] an emoji to color code its like

[1:08:59] readiness. And just seeing it do that

[1:09:02] will be like a first step um to to just

[1:09:04] like understand how this thread control

[1:09:06] works. This feature is like very new,

[1:09:07] but it already has been pretty wild to

[1:09:10] just sort of have a single thread.

[1:09:11] You're just talking to it for like the

[1:09:13] entire afternoon.

[1:09:15] Yeah.

[1:09:17] >> Sweet. If there's no more questions.

[1:09:19] Yeah, one more.

[1:09:28] >> Don't say that name to me. No. No. Uh so

[1:09:30] the question was like do other coding

[1:09:32] systems um have these kind of tools? Not

[1:09:34] yet. I think I'm sure you know I'm sure

[1:09:38] they will soon.

[1:09:40] Uh but as far as I know, this goes back

[1:09:44] to the eating thing like I just have not

[1:09:46] tried like the latest versions of other

[1:09:47] tools like I don't know if like

[1:09:48] conductor has these skills but

[1:09:50] definitely um I'm sure again like very

[1:09:53] competitive space the these features

[1:09:55] will probably propagate very quickly.

[1:09:59] threads run on old models. Will you have

[1:10:01] the new threads go back and pull that in

[1:10:03] as context?

[1:10:05] >> It depends. Sometimes just say find the

[1:10:07] old thread and like update the model and

[1:10:10] it'll just update the model. Like for

[1:10:11] for example, I I I like so when when uh

[1:10:16] 45 54 came out and then we moved to 55,

[1:10:19] I realized all my old automations were

[1:10:21] just on 54 and it really bugged me and I

[1:10:25] was like, "Hey guys, like can we add a

[1:10:26] feature that like has like GPT latest so

[1:10:29] we can avoid this issue and someone was

[1:10:31] just like tell a thread to update the

[1:10:34] other threads

[1:10:36] and I was like yeah like so much of it

[1:10:38] is just ask you just have to like

[1:10:40] develop the language anguage to figure

[1:10:41] out what you want to do. But I think

[1:10:42] that's again like the most important

[1:10:44] most important thing.

[1:10:45] >> Yeah. So just ask it and then it'll

[1:10:47] automatically do it rather than you

[1:10:48] having to go through it.

[1:10:49] >> Yeah. Like I think I have an automation

[1:10:51] that just like cleans up old threads and

[1:10:52] like by like model ids. Um

[1:10:56] but uh yeah.

[1:10:59] >> What's up?

[1:11:01] >> Uh not yet. I'm not happy with the

[1:11:05] slides enough that I I'll publish them,

[1:11:07] but I have a blog post. just search if

[1:11:09] you just Google codeex maxing it's all

[1:11:11] there uh you know three x's I think

[1:11:16] uh but I I'll I'll share some more stuff

[1:11:18] on on Twitter go on

[1:11:19] >> yeah so you said that you work

[1:11:21] >> yeah [snorts]

[1:11:24] so do you have any

[1:11:29] loops you [snorts] get a lot

[1:11:34] into the limit

[1:11:38] advice

[1:11:43] share how we can

[1:11:45] limit.

[1:11:47] >> Yeah, I think the biggest misconception

[1:11:50] here is that like X high will give me

[1:11:53] the best results. And so there's like

[1:11:55] there's a lot of like X high maximalists

[1:11:57] here. I want everything on X high,

[1:11:58] right? Like uh like I was demoing the

[1:12:02] like getting a coupon thing and my

[1:12:03] friend like does an app shot and like

[1:12:04] hits enter. I'm like why did you turn it

[1:12:06] on X high? right? It ran for like two

[1:12:08] minutes like searching like every

[1:12:10] website available for like coupons. Um,

[1:12:14] obviously I I can't give that much

[1:12:15] advice because it's something like on my

[1:12:17] personal computer I don't really run

[1:12:18] into limits but really get comfortable

[1:12:21] with like low and medium thinking. Like

[1:12:24] these models are still very very smart,

[1:12:26] right? Like low thinking on five like

[1:12:28] five five is like still so much better

[1:12:31] than prior models. And for a lot of this

[1:12:34] work that's not just like you know make

[1:12:35] me a video game from scratch. You just

[1:12:38] don't need that kind of work. Like my my

[1:12:40] chief of staff I think is like default

[1:12:41] medium.

[1:12:43] >> That's very helpful advice. I agree.

[1:12:44] Just as a follow I guess in a few words

[1:12:48] how do I tell the thread to shut up same

[1:12:51] thing and

[1:12:52] >> oh uh

[1:12:56] I mean the answer is really bad but I

[1:12:57] just like I just say like if there's no

[1:12:59] updates just reply with like one word no

[1:13:02] updates.

[1:13:04] Uh that's one thing and the second thing

[1:13:05] too is um I would also play around with

[1:13:07] like how often these heartbeats are

[1:13:09] happening. You know are you running this

[1:13:10] thing every 30 minutes? are you running

[1:13:12] this every 9:00 am? That's one thing.

[1:13:14] And the second thing, too, it's like, do

[1:13:16] you have some kind of stopping criteria?

[1:13:18] Right? So, for example, like I was I had

[1:13:20] some argument with like Amazon and I'm

[1:13:23] just like great. Like they put me in a

[1:13:25] 75m minute wait list. Like check every

[1:13:28] five minutes if the queue is like

[1:13:31] better. And once you get to five minute

[1:13:32] wait time, check every one minute and

[1:13:34] keep replying until you get my money

[1:13:36] back. And I took a shower and when I

[1:13:38] came back, I had like $400 in my credit

[1:13:40] card.

[1:13:46] I've not tried too much there, but it's

[1:13:49] all possible, right? Because to create a

[1:13:51] heartbeat is just edit a text file. And

[1:13:54] so you should definitely be able to

[1:13:55] create your own heartbeat and then

[1:13:56] change how frequent or infrequent. Um, I

[1:14:00] might try to do that actually. I might

[1:14:01] just say like, "Hey, like during the

[1:14:03] weekdays like change your heartbeat to

[1:14:06] be more active and during weekends or in

[1:14:07] the afternoons change them to um

[1:14:11] be less active." Yeah. Like I've tried

[1:14:14] versions of the chief of staff thread

[1:14:15] where I just set a goal that says like

[1:14:17] never stop and you're only allowed to

[1:14:18] like set sleep. And that has also worked

[1:14:21] pretty well. It'll be like, "Hey, it's

[1:14:22] like 900 p.m. Jason like I haven't seen

[1:14:24] Jason post a Slack message in like two

[1:14:26] hours. I'm going to sleep for like five

[1:14:27] hours." Uh and that also kind of works.

[1:14:32] Yeah. But um I I think the biggest one

[1:14:35] honestly is just like people should not

[1:14:37] be afraid of low reasoning. Like X high

[1:14:40] is not like X high results. It's just

[1:14:42] like think more