---
type: youtube
title: "\"Software engineering is not about writing code\" — Benoit Schillings, Google DeepMind VP of Research"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=1P1hJ36rxM0"
date_saved: "2026-07-27T04:31:12.246Z"
ingested: "2026-07-27"
speakers:
  - Benoit Schillings
---

# "Software engineering is not about writing code" — Benoit Schillings, Google DeepMind VP of Research

[0:01] [music]

[0:13] Please welcome to the stage the vice

[0:16] president of research [music] at Google

[0:18] DeepMind, Benois Schillings.

[0:22] [music]

[0:30] >> [music]

[0:49] >> All right, good morning. Uh this is

[0:51] really quite exciting to be here and

[0:52] have a chance to to speak with all of

[0:54] you. Uh my name is Benois Shellings. I'm

[0:57] actually a bit of a noob when it comes

[1:00] to to machine learning. Till a year and

[1:03] a half ago, I was working for Google X

[1:06] which some of you may know. We've done

[1:09] things like Whimo, which seems to be at

[1:11] every street corner now. Uh we also do

[1:14] things like Glass. So, you know, we we

[1:16] had a mix of hit and success. But in

[1:19] many ways this was for me an interesting

[1:21] formative experience on how to run a

[1:24] research team in a place like deep mind.

[1:27] I do have an incredible team. Uh my team

[1:32] goal in deep mind is basically to

[1:34] develop whatever technology will be

[1:37] needed to make Gemini incredible between

[1:40] one months and one year from now. So one

[1:43] month because if you start to work on

[1:45] what is needed in one week that's a very

[1:48] different type of job and one year

[1:50] because I don't think anybody can really

[1:52] predict anything that far. So that's

[1:55] already pretty ambitious in my opinion

[1:57] to think about things that would happen

[1:59] one year in the future.

[2:02] We do many things under that role. Uh a

[2:06] lot of it is related to code which will

[2:08] be the main subject of my talk today. uh

[2:11] but we also do a lot of research on what

[2:13] is the evolution of reasoning for models

[2:15] for instance or we do topology research

[2:19] what are new type of network that might

[2:22] bring better performance uh we do

[2:24] fundamental work in the science of

[2:26] reinforcement learning which is so

[2:29] fundamental to what we're doing today

[2:31] with ML

[2:35] let's do a bit of an origin story Um,

[2:40] we started the project at X named

[2:43] Pitchfork uh in 2018

[2:47] which was aimed at looking at how ML

[2:50] could really improve the way code is

[2:52] being written. And this was very

[2:55] interesting because in 2018 when we

[2:57] presented that at Google honestly nobody

[3:01] would give us the time of day. uh there

[3:03] was that point like why would you ever

[3:06] need ML to to write code. Um at the same

[3:10] time I think that we totally

[3:12] underestimated how fast this could go.

[3:14] When we did that project originally the

[3:16] idea was to look at how we could speed

[3:20] up the evolution of a piece of code. How

[3:22] could we make many of those small

[3:24] changes which slows down code speed

[3:27] development? you know the small edit

[3:29] which requires a review that takes three

[3:31] days and how we could compress that

[3:33] cycle.

[3:35] Some people were talking about vibe

[3:36] coding writing code in English and at

[3:39] the time honestly I totally dismissed

[3:41] that. I was that's why we have

[3:42] programming language. English is not a

[3:44] programming language. Well I I guess I

[3:47] was pretty wrong on that front. But the

[3:51] resistance we felt at the time reminded

[3:53] me of how my own career was pretty

[3:56] resistive to to change. Um I've been

[3:59] writing code for

[4:01] 45 years. Uh I started by writing video

[4:05] game for Apple 2 and Commodore 64. So uh

[4:08] my formation was to write assembly

[4:10] language. And when you spend a long time

[4:14] writing assembly language, you look at

[4:16] compilers with a lot of suspicion,

[4:18] right? are those things really working

[4:20] correctly? And then when you switch to

[4:22] C++ and use compiler, you lose you look

[4:24] at garbage collected languages as this h

[4:28] that's not real programming. You need to

[4:30] manage your memory. Well, today I use

[4:32] Python and V coding. So even old dogs

[4:35] can learn new tricks. So uh but I I I do

[4:39] understand what happened there.

[4:43] I think that we have a number of eras in

[4:45] what happened with software and and the

[4:48] first one was you know the one where I

[4:50] started writing code where the

[4:52] fundamental limit was really the machine

[4:55] and there was a lot of work to go and

[4:58] extract the last ounce of power out of

[5:01] those machine and that was the days of

[5:05] assembly language where you really

[5:08] needed to be incredibly accurate in the

[5:09] way you were writing code computing

[5:12] became much cheaper and we switched to

[5:14] the modern cloud era where getting the

[5:18] best performance is not the most

[5:19] critical aspect. You can actually brute

[5:22] force many problems but really what

[5:25] became the limiting factor was the

[5:28] ability for us to design in a modular

[5:31] way. You know this was the era where

[5:33] software was write it only once and this

[5:36] was this whole idea of how are you going

[5:38] to build libraries? How are you going to

[5:41] write functions? How are you going to

[5:43] break down that problem into something

[5:45] that is long-term manageable?

[5:47] The limitation there and that determine

[5:50] a lot of how our software process are

[5:52] working where actually the human brain.

[5:55] Uh a traditional human typical human is

[5:58] able to get the context between seven

[6:01] and nine tokens. I mean we have very

[6:04] rich tokens but you compare that to

[6:06] modern ML where the context is basically

[6:09] going to be infinite pretty soon. uh

[6:12] that fundamental limitation of human

[6:14] determined a lot of how software was

[6:16] being written. This is over and we're

[6:19] switching now to that AI frontier where

[6:23] really writing the code is not the

[6:25] challenge anymore. Uh I'll speak some

[6:27] more about it. But the bottlenecks are

[6:29] really how do you ensure that that code

[6:32] is what you really wanted because

[6:33] writing the code is easy but getting

[6:35] what is needed for a specific problem

[6:38] can be much harder to to specify.

[6:41] So humans at least in the near future

[6:43] will be that role of architecture or

[6:46] thinking of what are really the

[6:47] implication of that piece of code. I'm

[6:50] getting the ML to to design. Inductive

[6:53] thinking is another category where I

[6:55] think humans still have a very clear

[6:58] edge which is to look at a system in a

[7:01] much wider context and to be able to

[7:03] detect patterns and from those pattern

[7:05] take some decision.

[7:08] So where are we today? Um, superhuman

[7:12] syntax generation.

[7:15] When is the last time I got Gemini to

[7:17] write a function for me? And I looked at

[7:19] the function and I was like, I can do

[7:21] that better.

[7:23] It's over. Uh, I think that the minutia

[7:26] of code writing, I mean, you can fight,

[7:28] you can argue, you can find counter

[7:29] example, but that time is is gone. Where

[7:34] we still have a lot of work to do is

[7:36] multi-step code base. Uh software

[7:39] engineering is not about writing code.

[7:42] Software engineering is the first time

[7:44] you join a company and you realize that

[7:47] there are 35 million lines of PHP in the

[7:50] codebase and that you need to make some

[7:52] changes. That that's the day you

[7:54] understand what software engineering is

[7:56] and that's a place where our models

[7:58] today or frontier models are

[8:00] progressing. But this ability to manage

[8:02] that extreme complexity and break it

[8:05] down into man manageable pieces is a

[8:07] place where the frontier is still

[8:09] moving.

[8:11] Um it goes all the way to architecture.

[8:15] You look at I don't know the Google

[8:17] architecture.

[8:19] Thanks God we have Jeff Dean which was

[8:21] you know the the key architect there.

[8:23] But that's the level of thinking which

[8:25] has many implication which can go from

[8:28] how do you do hardware optimization? How

[8:30] do you manage security? How do you build

[8:32] a system so that 10 years later you're

[8:35] not full of regrets? And I think this is

[8:37] really the the range of progress we are

[8:40] working on today. So code is over but

[8:43] there's plenty to do. There's plenty of

[8:45] progress to be made.

[8:48] Now code is a very unique problem and in

[8:51] some way that's the reason we we did

[8:53] pitchfork on this. Um,

[8:57] first of all, code is a lot of data.

[9:00] There are other domains where you can

[9:01] find a lot of data to train your model,

[9:03] but code was so incredible. You could go

[9:06] and go on GitHub and start to to scrape

[9:09] GitHub. So, this was one of those

[9:11] problem where the amount of training

[9:12] data was a very unique situation.

[9:16] It is also a domain where doing

[9:18] verification is reasonable. You can run

[9:21] a piece of code, you can compile it, you

[9:23] can have unit test. So the ability to

[9:26] figure out is the model generating

[9:28] something correct was something that was

[9:30] pretty reasonable to do. That brought us

[9:33] where we are today. But today what

[9:36] happened is that we run out of training

[9:38] data. I think that 80% of the new code

[9:42] added to GitHub today is machine

[9:44] generated. So the notion of human

[9:47] bringing some knowledge that can be used

[9:49] for mining and to train model is

[9:52] reaching an end. But the good news is

[9:55] that we can do selfplay and selfplay is

[9:58] something we always liked a lot at deep

[10:00] mind. I suppose all know Alpha Zero.

[10:03] Alpha Zero became a superhuman go and

[10:06] chess player without any human knowledge

[10:09] just by playing against itself. We are

[10:12] now at that stage where Frontier model

[10:15] for code are able to do the same where

[10:18] they can create their own challenge.

[10:20] They can judge the validity of the

[10:22] answer. they can even to some extent

[10:24] judge the architecture. So that ability

[10:27] to do those hundreds of millions of

[10:30] hours of selfplay writing code is the

[10:33] thing that will bring us to the to the

[10:35] next layer. You know, it's interesting.

[10:37] Um

[10:38] do the experiment. Take a a brilliant

[10:40] software engineer, lock him in a room,

[10:42] lock him or her in a room for two years

[10:45] and feed pizza and give the mission you

[10:48] need to become a better software

[10:49] engineer. What do you do as a person?

[10:52] you you give yourself some challenges,

[10:54] challenges that you can verify and you

[10:56] keep working and coding on those

[10:58] challenges. We can do the same here. So

[11:01] this is an issue of how much compute,

[11:03] how much selfplay time we can have. But

[11:06] that will bring the horizon of how far

[11:08] we go in superhuman coding.

[11:13] So the economics of code are changing

[11:15] dramatically. You know, as I say, we

[11:18] developed a whole software engineering

[11:20] culture and infrastructure and set of

[11:22] companies based on the assumption that

[11:25] writing code was the hard part. That

[11:27] this was the expensive part. We're now

[11:29] in a world where writing code is free or

[11:32] nearly free. That's why I've got the

[11:34] tilda there.

[11:37] That means that the amount of code that

[11:39] we're going to see produced is going to

[11:42] explode. And there are some hard

[11:44] implications to that. First is the

[11:46] question of design and adequacy. How in

[11:49] front of that mountain of code which

[11:51] will be written or written dynamically,

[11:54] how do we keep systems which works and

[11:56] are reliable at the microscopic level?

[11:59] Great role for human.

[12:01] It is also the issue that you know we're

[12:05] writing code and we're not reading it

[12:07] very much anymore. I mean I know we

[12:09] still have code review but I would

[12:12] predict that in one year we'll let

[12:14] Gemini or other model generate the code

[12:17] and nobody will actually look at it. You

[12:20] know it's similar to compilers who still

[12:22] check the assembly output of their

[12:24] compiler and maybe someone there but

[12:29] that's probably the end of it. So the

[12:31] same thing is going to happen to code

[12:33] and that brings some question of what

[12:35] are the new process that we need to put

[12:37] in place to keep that manageable

[12:40] and that's where I've got a

[12:41] [clears throat] a bit of a list active

[12:44] guard rails. I mean you've all seen the

[12:47] news of mythos looking at a piece of

[12:50] code and detecting a unreasonable number

[12:53] of vulnerability in that code.

[12:57] there is a rush to go and patch those

[12:59] vulnerability but I think that's going

[13:02] to be a neverending process you know

[13:04] we're going to get a certain layer of

[13:06] vulnerability discovered by models we're

[13:10] going to fix those models will get

[13:12] smarter they will go a bit deeper and

[13:14] find even more subtle vulnerability so I

[13:17] think that the first aspect is that we

[13:19] need to think at least as much about

[13:21] code security and the implication of a

[13:24] piece of code than on the code writing

[13:26] itself and the grail and you know

[13:29] something my team is working actively on

[13:31] is instead of detecting the

[13:34] vulnerability and then suggesting some

[13:37] fix how about teaching model to write

[13:40] correct things from the start

[13:43] and that is very very hard to do because

[13:45] it is very context dependent

[13:48] the other aspect is that you know that's

[13:50] what I call inductive architecture

[13:53] uh I think that models today are still

[13:56] not very good at transferring knowledge

[13:58] of taking knowledge from one domain and

[14:01] applying it to another one or taking two

[14:04] concepts and finding the intersection of

[14:07] those context to be those context to be

[14:10] able to do deductive thinking. If we

[14:12] really want to write those very complex

[14:14] software system using ML that is a skill

[14:17] that we need to teach and you know one

[14:19] aspect of that is to really teach models

[14:22] how to do correct planning in front of a

[14:24] problem. How do you look at a very

[14:26] complex problem and decide what is the

[14:28] right decomposition of that problem that

[14:30] will bring the best clarity or

[14:33] correctness to the to the problem.

[14:36] We also need to change the way we do

[14:38] evaluation. I mean u threebench is

[14:42] infamous in in my book because

[14:44] threebench

[14:46] verifies if a piece of code runs and

[14:49] produce the right output. That's only a

[14:51] small part of as I mentioned earlier of

[14:55] code engineering. So for instance, I

[14:57] think that we need some problems much

[14:59] more in those benchmarks that we use

[15:02] which are open-ended problem. I I'll

[15:04] give an example. Uh I love the question

[15:07] of text compression. How many bits per

[15:10] character do you need and how far can

[15:12] you go? So that's a very simple eval to

[15:15] to write. You just take a piece of 10

[15:17] megabyte of code and you tell the model

[15:19] write the best compressor you can that

[15:21] is lossless and the loss function in

[15:24] that case will be you know the size of

[15:26] the compressed file plus the size of the

[15:28] source code that's never ending I mean

[15:30] those problems are I think what's going

[15:33] to force those model to do novel things

[15:36] like creating totally new algorithmic

[15:38] for instance and I I think we're now

[15:40] getting to that stage

[15:45] Writing code or doing software

[15:47] engineering is not thinking as a chain

[15:49] of tokens.

[15:51] Thinking and reasoning today is chain of

[15:54] code which has been you know very

[15:56] successful and improve models a lot. But

[15:59] humans of course are much more complex

[16:01] in the way they think about problems. I

[16:04] always think that code writing is a very

[16:06] visual activity and that can be I don't

[16:09] know the block diagram of what you're

[16:10] doing or the flow of data through your

[16:13] code. uh but saying that code will be

[16:16] just a set of token that you emit that

[16:19] are going to be the code I think goes

[16:21] only up to a certain point that's a very

[16:24] interesting aspect to what we do at

[16:26] Google Gemini we made that choice from

[16:29] the onset that this would be a

[16:31] multimodal model that you know text was

[16:34] only one of the modality that Gemini

[16:36] would be able to apply and we're

[16:38] starting to see you know how can a model

[16:41] start to think in term of spatial or

[16:44] dynamic representation to to solve

[16:46] problem and I think that's going to

[16:48] become a must have

[16:52] another interesting question is is this

[16:54] time to create a new language for models

[16:58] Python you name it have been invented

[17:01] for humans and those language are not

[17:05] very good to write safe or reliable code

[17:07] I mean they're great to write code but

[17:10] they're certainly not the the best thing

[17:12] I think We're getting to the point where

[17:14] since the pain of writing the code does

[17:17] not exist anymore. How about we make

[17:20] writing the code much harder by having

[17:23] you know very strongly typed languages

[17:25] or you know some inspiration from lean

[17:28] on how to write code that by design it's

[17:31] not going to be perfect. I mean program

[17:33] proof is something which has some limits

[17:35] but at least putting the burden of

[17:37] correctness on the model. So I don't

[17:40] know if we have some language designers

[17:41] here, but I I I think there's something

[17:43] really to be done there and it doesn't

[17:45] need to be human readable. I I don't

[17:47] think that that will matter anymore.

[17:51] So beyond code, um code is a universal

[17:55] language to solve problems. I think that

[17:58] what we're starting to see is this

[18:00] ability to experiment very quickly in

[18:02] code is impacting other domain very

[18:05] quickly because doing experiment becomes

[18:08] basically free. So I think that looking

[18:11] at that intersection of code writing and

[18:14] atoms or science is another big front

[18:17] that we are opening that is the place

[18:20] where true novelty is going to appear.

[18:24] two which are especially exciting for me

[18:27] is chemistry. Um you know as humans we

[18:31] do not understand chemistry or we

[18:32] understand a very very small sliver of

[18:35] chemistry. Once you have more than 20

[18:37] atoms in your molecule it's like wow we

[18:40] don't know what that thing is going to

[18:41] do. I think we're going to see

[18:43] incredible things emerging out of that.

[18:45] I mean once you are able to put 10,000

[18:48] atom together that starts to look like

[18:50] life. So what are all the other things

[18:52] you can do with 10,000 atoms?

[18:54] Biology. You probably heard plenty about

[18:57] it, but you know, biology is the case of

[19:00] nature did an incredible engineering job

[19:03] and terrible job at documentation.

[19:06] Um, but we can crack through that now.

[19:08] Models are able to find those

[19:10] relationship that might be elusive for

[19:12] us. So I think that that is something

[19:14] that will open incredible door. And then

[19:18] there is what I call the gold we cannot

[19:20] see. Humans are incredibly biased in

[19:23] what we feel is the correct solution. I

[19:26] mean, we're the result of an

[19:27] evolutionary training that help us

[19:29] survive in the jungle, right? Not doing

[19:32] quantum computing. So, I think that even

[19:35] though we can be brilliant and

[19:36] innovative, there are whole bunch of

[19:38] progress and breakthrough that can be

[19:41] done which we just cannot see or

[19:44] perceive. If I had more time, I would

[19:46] give some examples. I think that's one

[19:48] of the thing where ML is such a

[19:50] different viewpoint on many of those

[19:52] problems that we're going to get the oh

[19:55] my god this was in front of us the whole

[19:57] time and we could not see it. So

[19:59] exciting times ahead. Thank you very

[20:02] much. [applause]

[20:23] >> [music]