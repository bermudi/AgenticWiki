---
title: "LLMs are killing Agent Harness"
author: "Mayank Gupta"
source: "youtube.com"
url: "https://www.youtube.com/watch?v=thMFsqe8kbQ&t=3163s"
date_saved: "2026-05-26T22:59:04.299Z"
---

# LLMs are killing Agent Harness

[0:00] Software as we know it is dead.

[0:03] >> That's quite a bold statement.

[0:05] >> My internal title is dictator.

[0:08] Everything that I've done before now

[0:10] looks like a black and white movie to

[0:11] me. Spend a decade getting good at whim.

[0:13] I'm pretty fast. But then I realized

[0:16] none of this stuff matters anymore.

[0:18] >> Everyone is trying to give it their own

[0:20] definition of what right agent harness

[0:23] is.

[0:24] >> With AI, you basically have to rebuild

[0:26] everything from the ground up every

[0:28] couple of months. model can figure out

[0:30] where the parentheses go. You know,

[0:32] that's over. Human produced code is

[0:34] precious. That's why you have a

[0:35] contribution graph. Who gives a [ __ ]

[0:37] about the contribution graph in 2026? AI

[0:40] is an incredibly weird and rare and

[0:44] never before product and I had this

[0:46] moment of holy [ __ ] you got to rip out

[0:50] everything. No second model, no

[0:52] restrictions. Just give the models the

[0:54] tokens, give it the tools, and get out

[0:57] of the way, and we'll do it.

[1:04] Uh, hey, hi host. Thank you so much for

[1:06] making it. Uh, finally, uh, I already

[1:09] had a pod with somebody from AMP itself.

[1:12] You know that guy, Quinn Slack. And we

[1:15] had a good chat. We talked about agentic

[1:17] coding and all things around tech that

[1:19] are going on in last one year. you be

[1:22] mobile west have heard about uh all the

[1:24] things uh that you know you you I have

[1:27] heard you basically there is there's a

[1:28] wrong statement that I'm saying I have

[1:30] heard you talking about a lot of things

[1:31] in last one year uh I tried AMP around

[1:35] August or September 205 and that's when

[1:38] I started following you and the other

[1:39] teammates uh at AMP and the perspective

[1:43] shift that you guys had given me in

[1:45] terms of my coding style my development

[1:48] workflow has been huge Right. So, we'll

[1:52] talk about that later. But first, I

[1:54] would like to understand from you.

[1:56] >> I wanted to hear about that first, but

[1:58] no worries. Yeah, we'll talk about it

[1:59] later.

[2:01] >> We'll talk about that later.

[2:03] >> Good teaser for everybody.

[2:06] >> Awesome. So, I would first like to know

[2:08] more about your you because I figured

[2:12] this sometime back you had that you also

[2:14] written two books, one on interpreter,

[2:16] one on compiler. And that actually made

[2:19] me your fan because these are these are

[2:21] some topics which I believe are very

[2:23] core. And when I first got introduced to

[2:26] these topics, I was like in awe of

[2:28] understanding all of this. And when I

[2:31] found out that okay this guy has written

[2:33] books on these topics, I was like what

[2:36] books like dig books are available on

[2:38] such topics like a pure understanding of

[2:41] how you can go about it and I became a

[2:43] fan that day. uh but I would like to

[2:46] know from you what all you have done in

[2:47] last

[2:49] >> say 6 years I think that's that's not

[2:51] fair to summarize the whole journey for

[2:54] you so far but still if you would like

[2:55] to give a highlight of your whole career

[2:57] so far

[2:58] >> how would you like to start

[3:00] >> yeah six years I mean six years is good

[3:02] I think the second book I published in

[3:05] 2018 so that's cut off that's not in the

[3:09] in the time frame anymore but in 2000

[3:14] 9 so 7 years ago now. Um I started

[3:18] working at Scraft um which you know back

[3:21] then also CEO Quinn Slack. Um that was

[3:25] my first

[3:27] US startup or Silicon Valley startup. Um

[3:32] and that started a lot of things for me.

[3:34] Um before that I worked for German

[3:36] startups and um always been in startups,

[3:39] always been in product teams, always

[3:41] been in teams where you know every

[3:44] person does everything was the same with

[3:46] SourceCraft but the mentality of a US

[3:49] startup is completely different than a

[3:51] German startup. Um, so I did that and

[3:58] I don't want to draw the timeline but I

[4:00] would think

[4:02] there was quite the um not typical but

[4:06] if you look back at the last say 10

[4:08] years of the tech industry

[4:10] what we went through with SourceCraft is

[4:14] relatively typical in that we got

[4:16] funding we when I joined we were around

[4:17] 20 people at some point we had like 300

[4:20] something Um and then we went down we

[4:23] had to do layoffs all like this is over

[4:25] the next four four or five years. Um,

[4:28] and I was an engineer, then a staff

[4:31] engineer, then

[4:34] manager, then at some point something

[4:36] like reporting directly to Quinn. Um if

[4:39] then again like em that I did all of

[4:43] everything and you know um helped out a

[4:47] bunch of teams like I did a lot of stuff

[4:48] at sgraph and after 4 and a half years

[4:52] um having done go um mostly full-time

[4:56] worked with language servers worked on

[4:58] the back end worked on other stuff code

[4:59] intelligence

[5:01] um I you know realized and yeah also

[5:05] sorry before we hop on like even back

[5:07] then I was under Kodi team at Sgraph. So

[5:09] this was 2023 even. Yeah. Start of 2023.

[5:14] Um the one of the first coding a

[5:17] assistants back then, right? Assist. You

[5:19] haven't heard that word in a long time.

[5:21] Uh we used cloud. We were one of the

[5:23] first enterprise customers of anthropic

[5:26] using claude when actually nobody knew

[5:29] what claude is. Um so I was on that

[5:32] project.

[5:33] Yeah, I was on that project and then I I

[5:38] don't know like I I I decided I need to

[5:40] do some more programming like I

[5:43] I haven't you know seen the the limits

[5:47] of what I could do as a programmer maybe

[5:49] and I went to Zed the text editor

[5:52] >> um and I was there for a year and did

[5:54] Rust and this was hardcore Rust

[5:56] programming and the team at Zed

[6:01] probably I don't I don't want to offend

[6:03] anybody, but it's some of the best

[6:05] programmers I've worked with, I would

[6:06] say. Um, incredible technical team,

[6:12] highly technical, beautiful code base,

[6:15] beautiful technology, and you know, I

[6:19] just I realized, yeah, I've I've seen

[6:22] it. I think I reached the top you know

[6:23] that like I the I don't think there's a

[6:26] company maybe in in terms of scale like

[6:28] a Google or meta or something like this

[6:30] where you can see more but in terms of

[6:32] raw technical ability by IC's or

[6:36] codebase and whatnot I don't think you

[6:38] can find something that tops this and

[6:40] then I don't know something in me

[6:44] was checked off and at the same time AI

[6:46] got bigger and bigger and bigger and

[6:50] I've realized that you know there were

[6:52] multiple things I I can't dissect it but

[6:55] I I decided I don't want to keep working

[6:58] on text editor so I looked around and I

[7:00] funnily enough I ended up you know

[7:02] talking with Quinn again and we realized

[7:05] we're both AI pill in the same sense I

[7:09] at Zed I worked on the tab completion

[7:11] for Zed in the last two or three months

[7:13] with Antonio and I did fine-tuning and

[7:16] kind of got I got really

[7:19] a lot of stuff clicked for me when I did

[7:21] fine-tuning and and looked into how tab

[7:23] completion is implemented and I had the

[7:26] feeling that

[7:28] there was a distinct moment where

[7:31] I'm pretty good at Vim. Like I'm I spent

[7:33] years and years and years getting good

[7:35] at Vim. I the practical Vim book I wrote

[7:38] blog post like I spent a decade getting

[7:40] good at Vim. I'm pretty fast. I know it

[7:41] well. But then once I then fine-tune the

[7:46] model and then back then used

[7:48] state-of-the-art cursor,

[7:51] you know, tab completion, I realized

[7:54] none of this stuff matters anymore. Like

[7:56] this is even before agent, you know, but

[7:58] it was this moment of

[8:01] you know, you have vim key bindings and

[8:03] and uh ways to like easy navigate to

[8:07] jump to this stuff and move this and

[8:09] then you realize well if the model can

[8:12] just predict it and I hit tap tap tap

[8:14] tap tap why do I need to do all of this?

[8:16] And I really like it everything that

[8:18] I've done before now looked like a black

[8:20] and white movie to me and that was kind

[8:24] of going on. And so I went to source

[8:26] graph and then Quinn and I started

[8:29] you know working with these models and

[8:31] we were like well the newest claude I

[8:33] think was free five it's really good at

[8:35] tool calling and back then we still had

[8:37] Cody but Cody um

[8:41] like I don't know if you you've probably

[8:42] heard this like with AI and people say

[8:45] this now but what we said back then this

[8:47] was one and a half years ago was radical

[8:50] people don't understand that with AI you

[8:53] basically have to rebuild everything

[8:56] from the ground up every couple of

[8:58] months like recheck your assumptions and

[9:00] to paint the picture and I know this is

[9:02] going on a little bit but to paint the

[9:03] picture back then cursor had like it's a

[9:07] system pan right it's cyber composer

[9:09] right they were top of the world and

[9:12] they had this model where the way it

[9:15] would work is and so that's also how

[9:17] Cody worked you would ask the assistant

[9:19] it wouldn't use any tools you would just

[9:21] have a chat and say like how would you

[9:23] modify this file and you give it the

[9:25] context, it would come back with

[9:26] proposals or a diff and you would really

[9:29] push it to reply with a diff or

[9:31] something or in a specific format,

[9:33] specific diff format. And then you would

[9:36] ask another model and say given this

[9:39] diff and given these file contents,

[9:41] what's the, you know, what's the file

[9:43] output? And you would have these

[9:44] multiple models and cursor was and is

[9:46] really good at this. So much so that

[9:49] people thought

[9:51] this is this is how it should be. Like

[9:53] you have these multiple mods, you chain

[9:55] them together, blah blah blah. And then

[9:56] Claude came along, the newest version of

[9:58] Claude, and you just gave it a tool

[10:00] called, you know, apply patch or

[10:03] something or edit file, and it takes old

[10:05] string, new string, a string

[10:06] replacement, and it blows everything out

[10:09] of the water. And then in March last

[10:11] year, this is before cloud code was even

[10:13] released, Quinn and I had this moment of

[10:17] holy [ __ ] you got to rip out

[10:19] everything. No second model, no

[10:22] restrictions, no being fancy on top of

[10:25] the model. Just give the models the

[10:27] tokens, give it the tools, and get out

[10:29] of the way and we'll do it. And so

[10:32] that's how AMP started. And then we

[10:35] launched AMP. And you know now I've been

[10:40] my internal title is dictator. Um but it

[10:44] basically means you know it's not a

[10:47] derogatory term but it means that I kind

[10:49] of as one of the co-creators of AMP that

[10:51] I'm kind of

[10:52] >> responsible or like the person making

[10:55] >> I think the soft word would be either

[10:57] right.

[10:58] >> Yeah. Yeah. Yeah. Basically I make a lot

[11:00] of I I you know make decisions I guess

[11:02] and um yeah we've been doing that and

[11:05] then spun out of source graph separate

[11:06] company last year and yeah

[11:09] >> awesome awesome I think you you kind of

[11:12] >> though you gave a brief I think you kind

[11:15] of expedited the whole journey of what

[11:17] all has happened so I I bring you back

[11:20] to where you started I guess. So I read

[11:24] that you your education is in philosophy

[11:26] right if

[11:27] >> yeah well yeah I dropped out I don't

[11:29] have really

[11:31] >> okay but how did it all started for you

[11:33] how did you became uh or you fell in

[11:37] love with programming and computer

[11:39] science at all like how did it all how

[11:40] did it all started

[11:43] >> as a teenager you know like I've always

[11:45] liked computers and sitting in front of

[11:47] the computer and then as a teenager

[11:51] um you know I started building websites.

[11:53] I by chance I walked into my older

[11:56] sister's computer science class and

[11:58] somebody

[12:00] um you know we're building a website

[12:02] with Microsoft front page and you know

[12:04] whatever something like this and that

[12:05] there was this specific moment and I

[12:07] wrote about this before where

[12:11] when the teacher explained to us like

[12:14] how website works and then I realized

[12:17] like how do I get it on the internet and

[12:18] it was yeah you sign up for free

[12:21] webspace And then you can upload it via

[12:24] FTP. And then you have, yeah, you have a

[12:26] shitty domain, but still like your

[12:29] website and Coca-Cola.com or New York

[12:32] Times.com or whatever it is are next to

[12:36] each other. It's the same. It's like

[12:38] you're on the same street as the big

[12:40] players and and all you have to do is

[12:43] write code and you can make it look as

[12:45] good as this and you can view source.

[12:47] You can figure out how the others do it.

[12:49] And there's no you don't need a

[12:52] license or degree or permission. It's

[12:55] you know that was so incredibly

[12:58] empowering that you can you and your

[13:00] computer can just keep digging and

[13:02] figure this out and teach it yourself.

[13:04] Like all of the information is on the

[13:06] internet if you're willing to read. And

[13:08] that kind of got me started with a lot

[13:10] of this stuff. And then at some point

[13:12] you do you start doing HTML and then you

[13:14] want to write some bots and Python and

[13:16] whatnot. And then your friend gives you

[13:18] like a Linux CD and you start getting

[13:20] into Linux. And I think that was, you

[13:23] know, teenage years. And then I stopped

[13:25] for a couple years, got into music. And

[13:28] then when I was, I think like 20, I

[13:31] don't know, 23, 24, something like this.

[13:32] I studied philosophy to to be a musician

[13:35] on the side. And then I got back into

[13:39] programming because for my dad-in-law, I

[13:42] made a website again. And this was me

[13:45] dusting off, you know, like my folder on

[13:48] my computer with like my website stuff

[13:51] and it all PHP and whatnot. And then I I

[13:54] realized, well, isn't there this new

[13:56] thing now? Isn't it called isn't it HTML

[13:58] 5 now? What's jQuery? And you know

[14:02] what's what's what's Ruby on Rails? And

[14:05] and then I bought a book on Ruby Rails

[14:06] and it got started and fell in love with

[14:08] this.

[14:09] >> Asked a friend like how do I get

[14:10] started? Do you a friend who knew me

[14:13] from before from when I was a teenager

[14:15] and I said, "Do you think I without a

[14:18] degree would have a chance to to do this

[14:21] professional?" And he he says, "Well,

[14:23] all you have to be is good. Like nobody

[14:25] cares about your degree." And and we're

[14:28] talking not about, you know, me asking

[14:31] how do I can how can I work at Facebook?

[14:33] Like,

[14:33] >> right,

[14:34] >> it was just like, can I earn money doing

[14:38] this or can I have a career doing this?

[14:40] It's not even a career job. And he's

[14:42] like, "Yeah, if as long as you can show

[14:44] that you can do it.

[14:46] >> Yeah, you can do it." And that lit a

[14:49] fire under me because then it's like,

[14:50] "Yep, I'll just keep buying these books

[14:52] and reading them and doing this." And I

[14:55] enjoy sitting in front of the computer

[14:56] and getting better at using it. And I

[15:00] realized that

[15:02] practicing guitar

[15:05] is not as enjoyable to me as is

[15:08] practicing programming. Like

[15:10] >> all right,

[15:12] >> so if you give me a bug or like say I

[15:14] write a compiler and it doesn't work, I

[15:17] will go through the depth of despair.

[15:20] Sure. But ultimately

[15:23] I do like sitting in front of the

[15:25] computer and trying to figure things

[15:27] out. And I do like the binary

[15:31] answer the computer gives you that is it

[15:33] works or it doesn't work you to some

[15:35] degree right for for certain things like

[15:37] if I write a bot the chatbot like back

[15:40] then like a IRC chatbot you know whether

[15:43] it works or not

[15:44] >> and for music it's always fuzzy like is

[15:47] it a good song did you play cleanly if

[15:50] you don't have the ear you can't even

[15:52] tell if you don't have the rhythm you

[15:54] don't know whether you're off rhythm

[15:56] >> if you know when you offer you know like

[15:58] >> it's a different thing so so practicing

[16:01] in front of the computer or getting good

[16:02] at programming was something that I felt

[16:05] was good you know like

[16:07] >> sometimes painful but it's the pain that

[16:09] I could endure so I don't know like that

[16:12] just you know made me run twice as fast

[16:15] and then I got an internship was this

[16:17] natural in a way it was this natural

[16:19] inclination of yours like you

[16:23] >> I think it's it's what you it I I truly

[16:26] think it's what you endure like some

[16:28] people

[16:31] you know the say I don't know

[16:34] salesperson oh I'm picking a random

[16:36] example but

[16:37] >> some people

[16:40] they might say it's awkward or they

[16:42] might say they don't it's not easy but

[16:46] their profile or whatever you want to

[16:48] call it is different in that they can

[16:49] talk to a lot of people and and get

[16:51] rejected and try again other people

[16:53] can't do it

[16:55] >> and for me the sitting in front with the

[16:56] computer. I enjoy it. I like software. I

[16:59] like products. I like the web. I like

[17:00] the internet. I like writing. I like you

[17:04] know reading things. So yeah

[17:08] >> since you mentioned writing uh also so I

[17:11] will I will go to that and I would like

[17:15] to bring this to your notice as well

[17:17] that u whenever I read something that

[17:20] you have written be it on X be through

[17:23] your newsletter.

[17:26] I feel like most of the things that we

[17:28] as programmers or developers think while

[17:31] doing our work or while dealing with a

[17:34] coding agent or while thinking about

[17:36] development in general.

[17:39] Those things you just say it out like

[17:42] these things are mostly in our head

[17:44] itself. We are either thinking about it.

[17:46] We either discussing this with one of

[17:48] our closest friends who's also into

[17:49] development or engineering that okay do

[17:52] you do do this this or do you do it like

[17:54] that? How how do you take the decision?

[17:56] How do you do this? Like all the nitty-g

[17:58] gritties of how we navigate as a

[18:00] programmer. You just say out all those

[18:03] things loud in your newsletter either or

[18:07] to your expose. I think that's why it

[18:09] resonates a lot with me because whenever

[18:11] I try to read a piece that you have

[18:13] written, I find a lot of me in that. I

[18:17] find a lot of

[18:18] >> Oh yeah. Even I also was thinking

[18:20] somewhat along these lines. So this is

[18:23] my reaction to whenever I read something

[18:24] that you write, right?

[18:26] >> Yeah.

[18:28] >> In

[18:28] >> I mean,

[18:29] >> yeah,

[18:30] >> I think it comes

[18:34] in a sense.

[18:39] I've never

[18:42] ever in any writing

[18:45] do I consider myself above the audience

[18:49] or something or

[18:51] even smart, you know, like one of the

[18:54] things that drives you, if not the main

[18:56] thing that drives me is to learn, to

[19:00] understand, to kind of figure out the

[19:02] next puzzle that's in the world.

[19:05] Um,

[19:07] so a lot of programming for me, you

[19:09] know, mention compilers. I'm not a,

[19:13] you know, how in gaming there's

[19:15] completionists like people who who get

[19:17] like every side quest and every, you

[19:20] know, like every check mark and whatnot.

[19:21] I'm the opposite. Like if I if I figure

[19:24] out, oh yeah, I got one out of 10, I can

[19:27] see how the other nine how I would get

[19:29] them, then I lose interest. Like it's

[19:30] it's about figuring the thing out. And

[19:33] for me, writing

[19:36] and what you see in my writing is often

[19:39] me trying to figure things out. And and

[19:42] and I don't think you can figure things

[19:44] out when you come from a place of

[19:49] not I don't want to say arrogance, but

[19:50] there's no hubris if you want to figure

[19:52] things out. So often I also don't try to

[19:55] pretend and I don't use I've I've never

[19:58] written scientifically. I've never

[19:59] written.

[20:01] I can't write in third person or

[20:03] something or you know it's always it's

[20:05] egocentrically it's always me. I can't

[20:08] help it. So if I write that's how I see

[20:10] it and there's no

[20:12] >> yeah there's nothing. It's just me how I

[20:16] figure things out. And yes like I uh if

[20:19] you read me throughout the years there's

[20:21] a bunch of stuff. It's always questions.

[20:23] There's a lot of questions in my writing

[20:25] I would say and not a lot of answers.

[20:27] And I don't know, it seems to resonate

[20:29] with like especially with like the books

[20:31] that I wrote. Um, it's not textbooks,

[20:35] right? It's not like this is how you

[20:36] should build the the best compiler or

[20:38] this is how all the compilers should

[20:40] work. I say this even in the intro. It

[20:41] is me

[20:43] figuring out I wanted to figure out how

[20:45] this works. Here, I'll take you along

[20:47] like look, we can figure this out

[20:48] together and here's what I found. And

[20:50] it's luckily for me it seems that the

[20:54] way I perceive the world or figure

[20:56] things out and then try to explain them

[20:59] to make sense of them for myself seems

[21:02] to resonate with a lot of people and and

[21:05] I and that's lucky because I can see

[21:07] that

[21:08] you know sometimes you read a textbook

[21:10] and and maybe that makes sense to some

[21:12] people but what I learned over time is

[21:14] that if you have 10 pieces of writing on

[21:16] the same subject those 10 pieces of

[21:19] writing will resonate ate differently

[21:21] with different people and sometimes

[21:23] you know I think I have a good overlap

[21:25] with a good audience. Yeah

[21:27] >> I mean that's amazing and just keep at

[21:30] it because we just love reading that so

[21:33] >> keep being yourself. I think that's

[21:35] enough.

[21:36] >> Yeah.

[21:37] >> Coming to a tricky question now um

[21:39] because a lot of your takes and ports as

[21:43] a company's take and Quinn's take are

[21:46] quite radical in nature. I think there

[21:48] is no doubt about it.

[21:50] But at the same time I have a question

[21:52] that now at this point when somebody is

[21:56] pursuing their engineering or they have

[21:58] just graduated from their engineering

[22:01] how should they navigate their path in

[22:03] all this chaos of this is the future or

[22:07] that is a future or no there is no

[22:09] future for engineering as a human layer.

[22:12] A lot of chatter is there and a lot of

[22:14] groups have been invited into saying or

[22:17] bringing up their narrative of what the

[22:19] future is

[22:20] >> and I believe this makes a lot of

[22:22] confusion with all the new covers who

[22:24] are entering the tech industry.

[22:27] >> What would be your perspective on that

[22:29] side because I personally haven't read

[22:31] any piece where you have mentioned this

[22:32] thing. I'm not sure if I'm wrong about

[22:34] this but I would love to know that today

[22:38] like how do you think about this because

[22:39] this is also an important question in my

[22:41] opinion we will grow out and we will be

[22:44] just 50 60 and after that somebody has

[22:46] to there who will be figuring things out

[22:49] so so we should also give a path or at

[22:52] least give a narrative to the people who

[22:55] are looking forward to our writings or

[22:57] our videos right

[22:58] >> yeah I guess I haven't written about

[23:01] this because

[23:03] I don't know, you know, I I think a lot

[23:07] of people don't know if I go back.

[23:11] I don't know. I I think the pendulum has

[23:13] swung back a little bit in that people

[23:15] are now saying there will be software

[23:16] engineers in the future. Um,

[23:20] what I would say is

[23:25] what's dead and what's over

[23:28] is

[23:30] the approach to building software that's

[23:33] purely about programming.

[23:35] Um, where

[23:38] oh I want to

[23:40] I want to be a programmer so I can write

[23:42] Rust or pick your language. um

[23:47] that is something

[23:50] the writing of a given language that's

[23:52] not the important thing anymore. Even

[23:54] the skill in writing that language is

[23:56] not the important thing anymore. And

[23:58] some people say well it never was. And

[24:00] it yeah it never was like it never was.

[24:02] If you were a senior engineer or staff

[24:05] engineer, it always should have been

[24:07] about what's the business impact, what's

[24:10] the product, what customer problem are

[24:13] you solving, what value do you bring to

[24:15] the customer, what what's the business

[24:17] even, but I think we would kid ourselves

[24:20] if we wouldn't admit that a lot of

[24:22] programming jobs, a lot of passionate

[24:25] programmers did not care about the

[24:27] business nor the customer. They just

[24:29] liked programming and figuring out

[24:32] little puzzles every day. And they would

[24:34] go home and think at the end of the day,

[24:38] this was a good day because I ran into a

[24:40] borrow checker problem and then I

[24:42] researched this and then I built my

[24:44] types and then the types and then the

[24:47] borrow checker and I used this and this

[24:48] and this. And if if this is what you get

[24:52] out of program or want to get out of it,

[24:55] I don't think it's worthwhile to to do

[24:58] this. It's to me that's

[25:01] that's not something that there's going

[25:03] to be a lot of demand for like the only

[25:05] this.

[25:07] That being said, I do think there's

[25:09] going to be demand for people who are

[25:13] software engineers slashtechnologists,

[25:15] people who know how things work, who can

[25:20] build and conceptualize and understand

[25:22] and debug and maintain and um you know

[25:25] enhance complex systems and who also

[25:29] know what the business is know what

[25:32] their customers are, who their customers

[25:34] are, what they want and why they want

[25:36] and how their business can help solve

[25:38] those values and

[25:41] helping the business move forward with

[25:45] by building software. That's the

[25:47] software engineers job, not by typing

[25:49] code and putting the semicolons on the

[25:51] right line. Um, so I would say if you're

[25:56] interested in software, if you're

[25:58] interested in products, if you're think

[26:00] interested in in expressing something

[26:03] through software, if you have something

[26:05] to say, if you are interested in

[26:07] business, if you um,

[26:11] you know, are interested in solving

[26:14] problems

[26:15] with a business or with software

[26:17] business, then I think that's going to

[26:19] have a future. But the days of

[26:24] um you know

[26:27] I at its peak right 2019 um you go to a

[26:31] boot camp you do 8 weeks.

[26:35] This sounds horri but there was a lot of

[26:37] you know like we need but bots in the

[26:38] seat where hey like we just need like

[26:43] brute for like we need engineers so we

[26:45] can the PM can go and write tickets and

[26:48] and the designer can design the stuff

[26:50] and we give it to the engineer and build

[26:51] it and that sounds so bananas to say but

[26:54] that's a lot of what the I was on teams

[26:56] like this I was that guy you know where

[26:59] you would get a ticket yeah I'll

[27:01] implement it but that's that that that

[27:05] that work is getting smaller and smaller

[27:07] and smaller. Um so I think that we're

[27:10] moving up a higher level and the

[27:13] question is what will the demand for

[27:16] these people be and

[27:19] on one hand I do think that software as

[27:23] we know it I'm underlining as we know it

[27:27] is dead. I think that

[27:32] a lot of the software that we're still

[27:34] using

[27:37] that that that's not a thing anymore in

[27:38] a few years where if you think about the

[27:42] trajectory of these models, if you think

[27:44] about the trajectory of the data center

[27:46] buildouts, the speeds, a lot of stuff

[27:49] will will change and a lot of enterprise

[27:53] software will change. um

[27:57] the whole build versus buy and whatnot

[27:59] like I don't think it's going to be a

[28:02] binary. It's everybody will do this and

[28:04] everybody will do this but a lot of

[28:06] stuff will change and software will look

[28:08] completely different and how they will

[28:11] look I don't know but you know

[28:15] yeah it's definitely

[28:18] people will be needed to build those

[28:20] products and to have technical

[28:22] understanding I think but

[28:26] if you look at other professions

[28:28] um I use the example of fashion you know

[28:31] fashion designer

[28:32] a fashion designer who's sitting in

[28:34] Paris knows the textiles involved and

[28:38] knows the colors involved and knows the

[28:41] manufacturing process like if we order

[28:43] this color and get a thousand of these

[28:46] the colors going to come out like this

[28:48] blah blah blah they know you know they

[28:51] know how to manufacture something

[28:53] without being the person who cuts the

[28:55] cloth um and I think that's you there's

[28:59] multiple examples in other you know like

[29:01] a guy who works at BMW to design an

[29:03] engine is not necessarily the guy who

[29:06] puts the engine together or the machine

[29:08] or something like this. Um, so I think

[29:10] we're moving up and I think the demand

[29:12] is going to go up for software too, but

[29:15] the software as we know it, I think

[29:17] that's I think that's changing.

[29:21] >> You concluded that software is dead.

[29:22] That's that's a

[29:24] >> software as we know it is dead. you

[29:26] know,

[29:28] there will be there will be there will

[29:30] be CPUs running that run software. There

[29:32] will be GPUs emitting tokens.

[29:35] >> Um, there will be a lot of both of them.

[29:39] How what software will look like is is

[29:42] is question. I give you just how I think

[29:46] about this.

[29:48] If you look at the last few years of

[29:52] well fundamentally these models bring

[29:55] something entirely new to software which

[29:58] is they are fuzzy. They are non-binary.

[30:01] They can deal with language in a way

[30:05] that computers have not been able to do.

[30:08] And they can now use computers

[30:12] in a way that computers haven't been

[30:14] able to do. And they can generate

[30:16] images. they can understand images

[30:20] understand for everybody who's who's a

[30:23] the hater or you know whatever. Um so

[30:26] that is a fundamental thing that that

[30:29] changed about computing. Um and then

[30:32] when you look at the graph of where

[30:34] these models are going and basically in

[30:36] the last 3 4 years

[30:40] relatively stable

[30:42] the high points of one model generation

[30:46] will then become the base level of the

[30:48] next generation meaning oh the tool

[30:51] calling of claw 35

[30:54] amazing okay 37 that's a given then the

[30:57] next generation oh this is really smart

[30:58] it's really good at this next generation

[31:00] yeah that's a given. If we just project

[31:04] this out for 2 years,

[31:07] we're going to have a really like I've

[31:09] been using Opus 47 a lot lately. I've

[31:11] been using the newest GBT model a lot

[31:14] lately. And yesterday, to give you an

[31:16] example, I was

[31:19] working on a feature where basically a

[31:22] client would download data from a

[31:23] server, flip a thing, and then send it

[31:26] back up to server. It was a leftover,

[31:28] you know, like it was legacy thing where

[31:31] at some point we had to upload data. Now

[31:33] we don't have to because data is up and

[31:36] I explained this and I knew what the

[31:38] issue was on a high level and I don't

[31:40] type any code basically anymore. So I

[31:43] described it and it came back and it did

[31:45] like a perfect analysis like it the the

[31:47] thing it wrote was incredibly good and I

[31:51] remember if you had shown me this even

[31:52] last year I would have said this that's

[31:54] crazy and that's not a baseline. Um, so

[31:57] what's the next baseline? So if you take

[31:59] this

[32:00] >> and then you look at something like um I

[32:03] don't know if you've seen this Jack

[32:05] Jimmy where they they basically built

[32:07] like a big big chip for one model. I

[32:10] think it was a llama model and it can

[32:12] output 17,000 tokens per second. So if

[32:16] you use this and you say give me a long

[32:18] prompt and it's and the prompt is there

[32:20] like there's nothing. So,

[32:23] even if the Frontier models get to half

[32:26] this speed,

[32:28] right now they're at 40 tokens per

[32:29] second or 60 tokens per second or

[32:31] something like under 100 tokens a

[32:33] second, right? Imagine they get to

[32:37] 5,000 tokens a second. Imagine an Opus

[32:40] 47 at 5,000 tokens a second. And I don't

[32:43] think there's any physical limit from

[32:45] this that that says this should should

[32:48] not be possible. The only thing that's

[32:50] holding us back is that right now

[32:52] they're trying to pour more money into

[32:54] this and energy. But the whole thing

[32:57] that people don't understand is that

[33:00] these companies can't stand still. They

[33:03] can't say, "Look, we're going to stop

[33:04] and we're going to optimize 47 and make

[33:06] it five times as faster because the race

[33:08] is not there. The race is to get to AGI

[33:11] or to build a better model." So they

[33:13] can't they're like sharks. They can't

[33:15] stand still. They have to keep racing.

[33:17] the the optimizations only the bare

[33:19] stuff that saves them money in training

[33:21] runs. But even then, if an Robic were to

[33:24] say, "We're not going to train another

[33:25] model for a year to optimize our

[33:27] training pipeline," they would be dead

[33:28] in the water. Like that race is on

[33:30] because OpenAI would eat their lunch and

[33:32] the other way around. And then you have

[33:34] the Chinese models trying to catch you.

[33:36] So

[33:37] >> that's that's very true.

[33:38] >> So that race is crazy. And if you if you

[33:41] just

[33:43] think about like these different

[33:45] mechanics at play of the models getting

[33:47] better and better even even if it would

[33:49] stagnate say in 2 years which we there's

[33:51] no reason to believe it's going to

[33:53] stagnate by now

[33:54] >> even then imagine

[33:57] imagine there's a truth and like open AI

[34:00] and the Chinese model writers and and

[34:02] and they say stop it that's enough like

[34:05] we're not going to you know the mods are

[34:07] good enough then you got the people

[34:09] coming who's going who are going to

[34:10] optimize this. So, and then you have

[34:13] like 10,000 tokens per second, 5,000

[34:15] tokens per second or whatever, even

[34:16] 2,000 tokens per second. Imagine what

[34:19] you can do then because then you have

[34:20] this fuzzy machine that can understand

[34:22] your screen, but you can now run it 10

[34:25] times as fast and that means you can run

[34:27] it in a loop and it can be

[34:28] self-correcting and

[34:31] computing then is is different, right?

[34:32] Like it it it's crazy. And then the

[34:34] prices if they go down and

[34:37] >> Yeah. So I think that's going to be the

[34:41] next 10 years is going to change

[34:44] software fundamentally. I I don't I'm I

[34:46] don't know if the frontier will be

[34:49] jagged as they say or as I said where

[34:52] you know obviously in coding it's crazy

[34:54] good. Um well whether you know like some

[34:58] stuff will look old or whether it's like

[35:00] you know in a sci-fi movie where

[35:03] uh you know people aren't in spaceships

[35:05] but have an old rifle or so you know

[35:06] like where you can see that the

[35:08] centuries of technologies mix like I

[35:10] don't know if that's the case maybe

[35:12] software will be like this maybe

[35:15] maybe we still have I don't know what

[35:17] like a word processor but at the same

[35:20] time I can talk to Siri and it can do

[35:23] anything that I can do but I hype in Vim

[35:25] or something. Um I don't know but

[35:30] yeah and that and that's just the mod

[35:32] right. The other thing is

[35:35] the whole software industry and and the

[35:39] the practice of software engineering

[35:42] besides others was built on foundational

[35:45] pillars like software engineering is

[35:47] expensive.

[35:49] >> Software engineering is is slow. Oh, it

[35:51] takes humans and code is hard to

[35:53] produce. Correct code is hard to

[35:55] produce. Like I've been working on

[35:56] developer tooling for the last 7 years.

[36:00] And

[36:01] I just realized today while I was in the

[36:04] kitchen how and I love this stuff, but

[36:06] how uninteresting are language servers

[36:08] now. Like back then, five years ago,

[36:11] four years ago, everybody wanted to work

[36:12] everybody who was a little bit into

[36:14] hacking and programming like no

[36:16] compilers. Yeah, I want to work on

[36:17] language server. That's cool. we can

[36:19] suggest this and autotap this and now

[36:22] you're like

[36:24] who cares like the model can figure out

[36:26] where the parentheses go you know it's

[36:29] that's over

[36:32] wow

[36:34] that was like a lot to consume because

[36:38] >> no I mean that that was a really deep

[36:41] answer to this question that I asked you

[36:43] but at the same time I was thinking

[36:46] about a lot of topics that you kind of

[36:49] touched upon but still we are not there

[36:53] and a lot of people are talking about

[36:56] these topic these days on X as well. Uh

[36:59] so you must have heard agent harness and

[37:02] the discussion over agent harness over

[37:03] last two three weeks. Now

[37:06] everyone is after it. Everyone is trying

[37:08] to give it their own definition of what

[37:11] right agent hardness is. If agent

[37:14] hardness plus something should be there

[37:16] or if it should be thick or thin. In the

[37:20] similar way I think we have had

[37:21] discussions in last one year about

[37:23] prompt engineering and context

[37:24] engineering as well.

[37:25] >> Yeah. Yeah. Yeah. I have I've had a lot

[37:28] already.

[37:30] >> Yeah.

[37:30] >> So, so in that in that perspective, I

[37:33] would like to ask you that I believe

[37:36] prompt engineering was here to stay and

[37:38] is still here. Like when you think about

[37:40] even age and hardness, a a very big part

[37:42] of it, not even big part, I would say a

[37:44] very significant part of it is figuring

[37:47] out how you go about writing your

[37:48] prompts, your system prompts and

[37:49] everything else.

[37:52] >> Yeah. But it's becoming less and less

[37:54] important, I would say.

[37:56] >> I get it. as the models are evolving.

[37:57] Yes, you can say it is becoming less and

[37:59] less important,

[38:01] >> but it is still there. It has been.

[38:04] >> But I mean I mean look like

[38:08] I said this even last year. said with

[38:10] AMP the the job of a harness is

[38:15] and because we went through this with

[38:16] Cody Cody was in that sense of harness

[38:19] and we couldn't see how good the models

[38:22] have gotten because the harness was

[38:24] around it and we wouldn't you know

[38:27] there's an apply model there's another

[38:29] model there's an intent detection model

[38:30] there's this there's that what you have

[38:33] to do as a harness is

[38:36] it has to basically fall away the better

[38:40] the model gets. And the most

[38:43] >> fall away. Okay, that's a word.

[38:45] >> Yeah, it's it's kind of like the way I

[38:47] you I described it is like a wooden

[38:49] scaffolding. You have the model and you

[38:51] build your wooden scaffolding around the

[38:53] model gets bigger or better in that

[38:55] sense and it should fall away like a

[38:57] wooden cast in your leg. Once it's

[38:59] healed, it should fall away, right? And

[39:02] to give you an example, last year

[39:06] at the start of last year, if you wanted

[39:09] to give a model tool calls and to so it

[39:12] can edit files, um what you would do is

[39:16] um I have this I wrote this blog post

[39:18] last year that blew up how to build an

[39:20] agent. And yes, you know, if you're

[39:21] interested in agents, you should read

[39:22] it. um you would give it this function

[39:26] string replace or edit file and then you

[39:29] would say old string new string and you

[39:30] would just replace it and sometimes it

[39:33] would get it wrong um because it would

[39:36] uh uh you know do if the string was in

[39:39] the file multiple times you had to throw

[39:40] an error in some point and sometimes it

[39:42] didn't know where the line numbers are

[39:44] and it didn't know where to look in the

[39:46] file. So it had multiple tools to read

[39:48] files. So you had a file to say read

[39:50] file give me the whole file or just

[39:53] numbers and turns out that 35 wasn't

[39:56] good with numbers like if you put line

[39:57] numbers in it was confused 37 comes

[40:00] along suddenly it understands line

[40:02] numbers put line numbers in and then it

[40:04] can read based on the line numbers so if

[40:06] you say here's here's the first part of

[40:08] this file line 1 to 50 it will then go

[40:11] and think okay I now got to read 50 to

[40:13] 99 or whatever and it will figure this

[40:15] out. So the mom got good at numbers and

[40:18] at some point you had like smart there's

[40:22] bunch of GitHub projects you had smart

[40:24] edit file tools where like yeah we find

[40:26] semantic matches and the model only has

[40:28] to do this and it only has to do this

[40:31] >> and then at some point people yeah use a

[40:33] custom diff format that's more token

[40:35] efficient and you know like the it got

[40:37] clever and clever the the the harness

[40:39] like the tools right and now with 53

[40:44] like juby 53 three.

[40:47] It does not care one bit about any of

[40:49] your tools. It will just run shell

[40:51] commands. It will run cat. It will run

[40:54] WCL. It will run zed. It will it will,

[40:58] you know, write a Python script to

[41:00] replace something in a file. And all you

[41:03] have to give it basically is a shell

[41:05] execute like shell bash.

[41:07] >> That's it. You don't need anything else.

[41:09] And you get

[41:10] >> nearly the best performing thing. It's

[41:13] the same thing. I've I've ran this a

[41:15] bunch of times. I've worked with a bunch

[41:16] of people. They're like, "Oh, yeah." So,

[41:19] if it wants to um uh rename a symbol,

[41:23] shouldn't we give it like an language

[41:25] server tool so it can talk to a language

[41:26] or find references or something like

[41:29] this? And then you build it. And

[41:31] everybody goes through this. I I told

[41:33] people go and do it. Go and do it.

[41:36] Because the issue is the it's not only

[41:38] that the model got smarter. It's also

[41:39] that the model is has a grain. I called

[41:42] it like certain things it likes to do

[41:45] and certain things it doesn't like to

[41:46] do. I don't know if you remember this

[41:48] but I think this was in maybe around

[41:51] this time last year or in May last year

[41:53] where Claude instead of when it deleted

[41:55] code it would leave a comment to say

[41:57] deleted code.

[41:58] >> Yes.

[41:58] >> And then and then people would put in

[42:00] their harness things like every time you

[42:02] spot a comment that says deleted let's

[42:04] delete the comment. You know stuff like

[42:05] this. But now these models are so good

[42:09] they don't need any anything of this it

[42:12] they can just edit they write code to to

[42:15] do this. But but Thawson do you think in

[42:17] this way agent harness is somewhat also

[42:20] dead because as I

[42:22] >> mean it depends on it depends on how you

[42:24] define harness right

[42:26] >> but the point here is that uh in that

[42:29] blog itself you almost signified

[42:32] building an agent as if you know you

[42:34] just do these two three things and you

[42:36] are good with your basic code editing

[42:38] agent

[42:40] >> I mean that's what pi is

[42:42] >> I mean that's what

[42:43] >> you know I I think what people on What

[42:45] people

[42:47] I mean it depends on how you define

[42:49] harness, right? Like

[42:51] the the the reason for the blog post or

[42:54] wrote it was the subtitle is the emperor

[42:56] has no clothes, right? And that was

[42:58] because people were like, "How does clot

[43:00] code work? How do they do this? How does

[43:02] cursor do this?" And you're like, "It's

[43:04] nothing, dude. It's just a loop." Like,

[43:07] >> yes,

[43:07] >> yes, you can you can add stuff like uh

[43:10] uh uh what is it,

[43:12] >> by the way? prompt history, metadata,

[43:15] tell it, you know, whatever what files

[43:17] you have open, give it a bunch of

[43:19] specialized tools. But the magic is this

[43:21] loop and the magic is that the model

[43:24] knows how to, you know, do this. And the

[43:26] thing is, the magic is getting smaller

[43:29] and smaller and smaller because if you

[43:31] look at, you know, the news models, it's

[43:33] computer use. And now you're like, okay,

[43:36] just click around my computer and they

[43:39] can emit text and whatnot. So

[43:42] I think that in that sense the harness

[43:44] as in the thing around the model that um

[43:48] say it's his feelers or sensors to the

[43:51] real world like you know the thing the

[43:53] tools that gives it to the real world I

[43:56] think that's becoming

[43:58] less it's it's still important you need

[44:00] you need eyes and ears

[44:02] >> but as as we will end this year do you

[44:05] think this will torn apart into just few

[44:08] things as a harness Yes,

[44:10] >> I think

[44:12] I think it I mean I'm talking you know

[44:14] this is what we're doing with AMP like I

[44:16] think AMP itself we've deleted so many

[44:19] features

[44:21] >> over the last and it's because the model

[44:24] got better and better and we're going to

[44:25] delete more but I think the big thing

[44:27] this year is

[44:30] you need to figure out

[44:33] where and how you want to run those

[44:36] agents. not the specific of the tools

[44:38] and not

[44:40] >> not like

[44:43] oh yeah I'm at 70% context window I

[44:46] don't think that's going to be that

[44:47] important and it's more about working

[44:50] with artificial intelligence if that

[44:52] makes sense it's

[44:54] >> what do you mean when you say that

[44:55] >> well imagine imagine

[44:59] imagine you you have a factory and

[45:01] imagine

[45:03] somebody um

[45:08] somebody how do I phrase this somebody

[45:10] gives you work or say humans and they

[45:12] don't know how to do the job to stand in

[45:14] front of whatever and put this piece

[45:16] into this and this and this. So you got

[45:18] to teach them and you got to show them

[45:20] um and that's a big bottleneck. You have

[45:23] to figure out how these people perform

[45:25] in your factory. So now imagine instead

[45:28] of humans coming into your factory,

[45:30] somebody gives you robots that can do

[45:31] all of the movements that you require.

[45:34] So now what you have to figure out is

[45:37] okay, I have an infinite amount of

[45:39] robots. They can work day and night. How

[45:42] do I organize this business to make use

[45:45] of this? How do I keep track of what

[45:48] they're doing? How do I make sure I do

[45:51] not lose what they've done? So we're

[45:53] zooming out. We're stepping again one

[45:55] level higher up.

[45:56] >> It's like orchestrating

[45:57] >> the

[45:58] >> Yeah. It's not even It's not even

[46:00] >> It's not even orchestrating. Imagine you

[46:02] have a company and you're like, "Oh,

[46:03] [ __ ] I need more people to help me do

[46:05] this." Like just humans. And then

[46:06] somebody's like, "Yep, here's 20 humans.

[46:09] Uh they can do they they're smart. They

[46:11] all have PhDs. They're good. Um they can

[46:14] do anything you ask them to do." Like

[46:16] what do you do? Like you got to figure

[46:17] out if I have 20 humans available to me

[46:19] as a business, how do I put them to use

[46:21] and when and how do I get information?

[46:24] >> I get it.

[46:25] >> From you know, and that's I think the

[46:27] big riddle or the big problem to solve.

[46:30] I don't think it's, and I said this in a

[46:33] bunch of other videos too, like I think

[46:34] a lot of the software development life

[46:36] cycle is pretty outdated. The idea that

[46:40] people write linear tickets and assign

[46:42] them to an agent and then the agent

[46:46] opens a PR and then some other agent

[46:48] reviews it. But it's that's insane. Like

[46:50] that's I don't think that's it. I think

[46:53] >> the whole workflow development will will

[46:55] change with this.

[46:57] >> Yeah. I mean the whole development Yeah.

[46:58] The whole SDLC is built on the

[47:01] assumption that humans are using it and

[47:04] humans are if you I I had a video where

[47:07] I said and people this was two or three

[47:09] months ago I said like GitHub is dead in

[47:11] a video and I don't think it sounds as

[47:13] crazy now as it did two or three months

[47:15] ago

[47:16] >> and I said well what they don't and I

[47:19] think they do understand it Mackie

[47:20] Appleton she's at GitHub next and she

[47:22] understands this but the product itself

[47:25] is built on the assumptions that humans

[47:27] are using and and

[47:29] >> human produced code is precious. That's

[47:31] why you have a contribution graph. Who

[47:33] gives a [ __ ] about the contribution

[47:34] graph in 2026?

[47:36] >> Who you have the pull requests where you

[47:38] can emoji react to pull requests?

[47:42] >> Have you done this for an agent? Like

[47:44] emoji react with a heart to what your

[47:46] agent did. It's not it's it's that's

[47:48] over. And you can see this in a lot of

[47:51] things like and the idea that you assign

[47:54] something and it has an account and it

[47:56] has a label like that's that's crazy.

[48:00] Like that's not you know it's it's pack

[48:02] versus cattle. It's like yeah we now

[48:06] know now we have a farm and 5,000 cows

[48:08] or whatever. You're not going to give

[48:09] every cow a name but that's how people

[48:13] treat it. Like we're moving from pet to

[48:15] cattle like code is cattle now. It's

[48:18] cheap. It's cheap to produce. If you had

[48:20] five interns in your company,

[48:22] >> yeah.

[48:22] >> And you ask them to build a prototype.

[48:24] You don't you don't go, I got five

[48:26] interns. I'm going to ask them all to do

[48:28] the same thing and then I'm going to

[48:29] throw four out of five away because

[48:31] you're going to hurt feelings. But with

[48:33] agents, you're going to do it.

[48:34] >> And if you look at all of the software

[48:35] that we use, it's built on the

[48:38] assumption that people are using it and

[48:39] it's built for humans. And that's that's

[48:43] how I think that stuff changes. Give you

[48:45] a concrete example. If

[48:48] look at CI it's

[48:52] CI system I mean obviously obviously

[48:55] large enterprises blah blah blah but

[48:59] I think CI is also going to

[49:01] fundamentally change because the way an

[49:04] agent figures out whether their stuff

[49:06] works is by running the tests right now

[49:08] and they're pretty good at figuring out

[49:10] what tests to run and they're getting

[49:11] better at it. So what are you going to

[49:13] do? You're going to have the agent run

[49:15] somewhere and run the test and then you

[49:17] have the agent push it somewhere else

[49:18] and run the tests again

[49:20] >> and then wait for that other thing to

[49:22] run again

[49:24] >> and then have another agent do it again.

[49:26] Like why not compress this into the same

[49:28] thing? Like if the agent has run if the

[49:30] agent is your CI push it somewhere else

[49:33] like

[49:34] >> if the agent is running somewhere it can

[49:36] and it it's the reason why we have CI is

[49:39] also that the human isn't blocked on

[49:40] things but if you can spawn multiple

[49:42] copies of the same human it does not

[49:44] matter if one agent waits for for

[49:46] running the tests

[49:48] >> right so the bottlenecks are shifting

[49:53] how the whole software engineer human

[49:56] layer will adapt to this because for

[49:59] last one year they first got started

[50:02] with and I'm not talking about these

[50:03] enterprise oriented developers because I

[50:06] think they are years behind with what

[50:08] all is going I mean I'm very serious

[50:10] about when I say that I'm very serious

[50:13] about this because I have talked to some

[50:15] other friends who are working with

[50:16] companies like Walmart AEL douche

[50:19] telecom like all these other companies

[50:22] that are there big companies and when I

[50:24] talk to these friends when I talk to

[50:26] them about okay did you you know when

[50:28] you know cloud code released this new

[50:29] feature and it it it lets you do this

[50:31] and they're like

[50:33] >> uh we will try clot code we have heard

[50:35] about it

[50:36] >> I'm like what

[50:38] >> and this is not 25 I'm talking about 26

[50:41] >> they're still into the thing that yeah

[50:44] we'll buy a cloud subscription we have

[50:46] tried pulser so far and it's pretty good

[50:49] and we are liking it um and I literally

[50:52] feel that there is a separate audience

[50:54] to talk about so we'll first focus on

[50:56] what all is going with this whole

[50:58] startup community as far as developers

[50:59] are concerned. They have been trying

[51:02] code, codex, cursor, they have tried

[51:06] windup and everything else in the past.

[51:08] They then hopped on to AMP. Uh

[51:10] especially me I hopped onto AMP last

[51:12] year only in August September I

[51:14] mentioned already.

[51:16] Then this year we we brought PI coding

[51:19] agent as well though it was like we

[51:21] developed last year only I believe. Uh

[51:25] and with all these new tools coming into

[51:27] the picture, we all are trying to build

[51:29] something. We all have our unique

[51:32] workflows. We all have our unique habits

[51:35] of how we do things, how we ride the

[51:37] guard rails, how we go about the skills

[51:39] that we're giving to our agent.

[51:41] So with all this

[51:44] uniqueness with all the developers who

[51:46] are trying these tools these coding

[51:48] agents Austin

[51:50] how would you figure that this

[51:52] particular use case will be a mass use

[51:56] case for all these developers out out

[51:58] there when I say use case I I say I'm

[52:00] trying to say the user experience that

[52:02] you're going to provide to these

[52:04] developers how are we trying to shape up

[52:07] that image in our mind how are we trying

[52:09] to aim for that future where these

[52:11] developers would be looking forward to

[52:13] this type of user experience.

[52:16] >> Yeah.

[52:17] >> I hope I I was making sense when I when

[52:19] I asked this.

[52:20] >> Yeah. Yeah. It's a good question. I I

[52:24] >> I one thing.

[52:27] >> Yeah, please. You go.

[52:28] >> Yeah. Go ahead. Go ahead. No, you go

[52:29] ahead. And I also came across this

[52:31] question because when I talked to Quinn,

[52:33] when I read your things, when I talked

[52:35] to Mario, you all sound very similar to

[52:39] how you try to imagine the future.

[52:42] >> Yeah. And when I try to imagine the same

[52:45] future being in your shoes, try to think

[52:47] like how you guys think. I then think in

[52:51] this way that if I had to take a

[52:53] decision of okay this should be the best

[52:55] user experience for all the developers

[52:57] out there at least the mass

[52:59] then what would help me to make that

[53:01] decision what all parameters are there

[53:03] that are letting me decide okay this is

[53:06] it guys let's try this for next six

[53:08] months and then we'll figure out

[53:10] >> yeah I mean

[53:14] I can only speak for myself I don't know

[53:16] I I'm I

[53:19] make and have made a lot of product

[53:21] decisions here. But

[53:24] for me, it comes down to

[53:27] we want with AMP, we want to get

[53:29] software builders

[53:32] leverage the full power of artificial

[53:34] intelligence. That's that's our mission.

[53:37] And to me

[53:41] back a year ago and still the most

[53:44] important thing is get out of the way

[53:47] between the model and the user and not

[53:51] paper over a lot of stuff and don't try

[53:53] to hide it. You will lose. You will that

[53:56] won't fly. Um

[54:00] that's one thought. The other thought is

[54:02] AI is an incredibly

[54:05] weird and rare and never before product

[54:09] because

[54:12] previously before AI the product would

[54:15] tell the user whether they were doing

[54:16] something wrong or right you know like

[54:18] you a user uses word to create a

[54:21] document they would know whether they

[54:24] have opened the document that they were

[54:26] looking for you know they were they

[54:29] would No,

[54:31] I clicked here. I found the file. I open

[54:33] it. I changed the heading to be bigger.

[54:35] I I I see that I did the thing. The

[54:38] problem with AI is that the UI is a text

[54:41] box and you can throw any magic wish you

[54:44] want in there and there's absolutely

[54:46] zero product feedback about what you did

[54:48] is wrong. People ask the models, are you

[54:51] Opus 46 or 47? And the models say

[54:53] whatever. And they ask, can you do the

[54:56] how do you work? and they don't

[54:58] understand that introspection is not

[55:00] something these models can do. But

[55:03] nothing in their product tells you that

[55:05] you're going off that you're doing

[55:06] something wrong. Nothing in that

[55:08] textbook says so. And it's a marvel that

[55:12] a chat GPT and it's, you know,

[55:14] reinforcement learning. We've gotten to

[55:16] the point where you can throw any typo

[55:19] whatsoever, a single word, a query, a

[55:22] question, a essay. You can throw all of

[55:24] this in the chat box and it will kind of

[55:26] come back with an answer. And we'll kind

[55:28] of say, you know, you can write hide

[55:31] polar bear and it will come back with

[55:33] the a polar bear is, you know, whatever.

[55:35] If you say, explain to me how big a

[55:38] polar bear is, it will come back with

[55:39] the same thing. It will understand this.

[55:40] The problem is is with coding,

[55:45] you cannot pull the information out of

[55:47] the air. There the there's a signal you

[55:50] have to provide. There's nothing that

[55:53] the product can do if you don't provide

[55:55] the signal of what you want. And you

[55:59] can, you know, let's not do this. But

[56:02] back a year ago, people had this [ __ ]

[56:04] dumb ideas of, well, we should prompt

[56:06] the model to ask bunch of questions. And

[56:09] I think that's a waste of time. there's

[56:10] like Q&A mode and like intent detection

[56:13] are you doing this and doing this and

[56:15] >> I think that's not going to lead to good

[56:17] results and I don't know what the future

[56:21] of these products will look like. I

[56:22] think there is

[56:24] you know the issues of diffusion where

[56:27] you know power users are getting a lot

[56:29] out of these models and non-power users

[56:32] don't understand even how they work. I

[56:34] think that's going to take a lot of

[56:36] training and whatnot and maybe that's

[56:39] you know everything we talked about the

[56:41] end of software maybe that's the big

[56:43] multiplier here where a multiplier in

[56:45] with a positive and a negative value

[56:47] where

[56:49] the different expertise levels around

[56:52] the world and different companies and in

[56:53] different setups and whatnot will you

[56:57] know multiply with the value of these

[57:00] models and that means that some

[57:02] companies it might take a long long time

[57:03] to be adopted The question is will the

[57:05] market will the market decide that this

[57:08] was a wrong move by the company or not?

[57:09] Like will they go out of business or

[57:10] not? And then the question is you could

[57:13] argue that you know people are I don't

[57:16] know AI skeptics they're like well well

[57:18] if AI is so good why are why don't we

[57:21] see blah blah blah right and the thing

[57:24] is

[57:27] actually you do see it like open AI and

[57:29] anthropic are making a lot of money and

[57:31] they are shipping a lot of good stuff

[57:32] and I think we also ship a lot of good

[57:35] stuff with them and a lot of AI native

[57:37] companies ship a lot of good stuff but

[57:38] if you want to ignore all of is there's

[57:42] also the point of yeah because maybe it

[57:44] turns out that software wasn't the thing

[57:46] that made this company successful or

[57:48] not. It was the per people writing the

[57:51] software, not the act of executing the

[57:53] code or writing the code.

[57:54] >> Yeah, I can write you now the most the

[57:58] best MP3 player of all time,

[58:02] >> but it won't be a good business and it

[58:04] won't be valuable. You know what I mean?

[58:06] And I think

[58:07] >> previously

[58:10] software is the way software is done in

[58:12] businesses around the world is not the

[58:14] same. If you compare a German company

[58:16] that's in in the industrial company how

[58:19] it uses software even if it has software

[58:21] team completely different on Silicon

[58:23] Valley. So if you take AI and throw it

[58:26] in two of them the business impact will

[58:27] be completely different. One is an

[58:29] industrial company the other is a

[58:30] software company and there's different

[58:32] different gradients in the middle. Um so

[58:35] the way first of the diffusion of the

[58:38] technology and then obviously like the

[58:40] effect and one thing that we've done

[58:42] over the last 20 years I blogged about

[58:43] this even 10 years ago is whenever

[58:46] software engineers were talking to each

[58:47] other they would all treat it as if they

[58:48] were doing the same job but they're not

[58:51] like somebody who works at Google is not

[58:52] a game designer or game engineer who is

[58:55] not a web agency web developer in

[58:59] >> exactly

[59:00] >> Germany. Yeah. So yeah, we all use

[59:03] software but that's like you know like

[59:05] the internet has also had different

[59:06] effects on different places in the world

[59:08] and I think AI will will be similar but

[59:11] yeah I don't I don't know

[59:15] I don't know what the future product

[59:17] will look like but I think

[59:20] um

[59:21] >> I think it's all hit and test based on

[59:22] the signals.

[59:24] >> Yeah. Yeah. But it's

[59:27] the need to provide information to this

[59:30] system is not going away. I don't think

[59:34] you know you cannot

[59:36] say well I want to build this and then

[59:39] it just

[59:41] I guess if you don't care but like I

[59:44] don't if you know what you want but you

[59:46] cannot express this

[59:49] then there will be

[59:51] >> work with an experienced engineer they

[59:53] will kind of pull it out of you and ask

[59:55] you

[59:57] >> and then AI maybe they will do this

[59:59] maybe they will do this in the future

[1:00:01] And and it so happens Austin when I try

[1:00:04] to build something out of curiosity

[1:00:06] let's say and I'm not really clear about

[1:00:08] the feature that I'm trying to build I'm

[1:00:09] just assuming that okay

[1:00:11] >> probably it's like this but I'm not sure

[1:00:13] about the technicality of how to go

[1:00:14] about it

[1:00:15] >> it just so happens that I get into a

[1:00:17] rabbit hole of doing something else

[1:00:19] building something else completely

[1:00:20] different from what I was assuming in my

[1:00:22] mind and I think that's where your

[1:00:26] statement really resonates with me that

[1:00:28] if you're clear about what we are trying

[1:00:29] to build. If you have that fear in your

[1:00:31] mind, you as an operator are going to

[1:00:34] dominate the overall agent that you're

[1:00:36] going to use. Eventually, agent can help

[1:00:38] you do those things, but you have to

[1:00:40] make sure that you know what you are

[1:00:41] expecting that to do.

[1:00:43] >> Yeah. And there's another thing I I I

[1:00:45] wrote about this in my newsletter which

[1:00:47] is that um

[1:00:50] either you know

[1:00:53] what you want or what how it should work

[1:00:56] or it's in your codebase you know or

[1:00:58] it's in the training data

[1:01:00] >> but if it's not in the codebase and not

[1:01:02] in the training data and you don't

[1:01:03] express it then the model will come up

[1:01:06] with something and that might not be

[1:01:08] what you want and the the way I found

[1:01:10] this out is but working on something

[1:01:12] with like a different tricky runtime and

[1:01:16] it wasn't it wasn't in the code it looks

[1:01:18] like normal code but the runtime is

[1:01:22] different and I I wasn't super clear

[1:01:25] about how exactly the runtime behaves

[1:01:27] the model would know how the runtime

[1:01:29] behaves if I had told it to

[1:01:32] >> but nobody said anything about this so

[1:01:34] it just made up stuff and we ended up in

[1:01:36] this weird thing where nothing would

[1:01:38] work and then once I dug myself out of

[1:01:42] the hole you realize. Yeah, because if

[1:01:44] you're building a standard web

[1:01:45] application with Nex.js or 12Kit or

[1:01:48] whatever it is, there's a lot of stuff

[1:01:50] baked in. It's there's a web

[1:01:52] application, there's a request, there's

[1:01:53] a client, there's a response, there's

[1:01:55] blah blah blah blah blah. You don't have

[1:01:57] to spell this out. But if you're

[1:01:59] building say a truly novel application,

[1:02:02] um, where it's not clear what the UI

[1:02:04] interface is, then you have to kind of

[1:02:08] get this specify this. You know, if if

[1:02:11] you want a standard Mac OS UI, it's you

[1:02:13] got this. Like that's what you get if

[1:02:15] you don't specify it. But if you want a

[1:02:17] unique UI, you have to spell this out.

[1:02:20] And when you talk about UI, it sounds

[1:02:22] frivol, but what I'm talking about is

[1:02:24] like

[1:02:24] >> domain logic and business logic. And you

[1:02:28] have to put that in somehow.

[1:02:30] >> And and still right now

[1:02:35] >> you still have to translate

[1:02:38] those business requirements

[1:02:42] in something that's engineerable or in

[1:02:45] in in in chunks of work or something. I

[1:02:48] realized that everything I learned over

[1:02:50] the years as a you know senior engineer,

[1:02:54] staff engineer, whatnot where you're

[1:02:56] like, okay, we this is this is where we

[1:03:00] are. This is where we want to get with

[1:03:02] our project. Software engineering is not

[1:03:05] let's do it all right now. software

[1:03:07] engineering is okay if if if we're here

[1:03:10] and we want to get this done in two

[1:03:12] weeks what's the best way to ship this

[1:03:15] incrementally so that we can test and

[1:03:17] debug and build on top of each other

[1:03:19] maybe parallelize some stuff so that the

[1:03:21] end it comes together like that's

[1:03:23] software engineering to me you know

[1:03:24] Google book programming integrated over

[1:03:26] time you have to take this into account

[1:03:29] and while models don't have a concept of

[1:03:32] time and they you know like that's maybe

[1:03:35] besides the point this act of seeing

[1:03:38] okay these are the requirements this is

[1:03:39] the engineering I don't care about the

[1:03:41] typing I don't care about the code

[1:03:42] itself but I can roughly see the big

[1:03:45] steps we have to take and this is the

[1:03:47] order in which I would take them and in

[1:03:49] which direction where I would switch

[1:03:50] directions that's still right now

[1:03:53] necessary and I think that'll that'll be

[1:03:57] necessary for longer but maybe I'm wrong

[1:04:01] like so yeah

[1:04:02] >> how how has emails changed for agents in

[1:04:06] last one year since models are also

[1:04:08] evolving and we are acknowledging the

[1:04:09] fact that a lot of harness layer is

[1:04:12] being you know torn out because of the

[1:04:14] evolution of models does it also is it

[1:04:17] also improving

[1:04:19] how evolves were being done in 225

[1:04:22] versus now

[1:04:24] >> I mean back a year ago everybody would

[1:04:27] say you need evals you need evals you

[1:04:29] need evals and we would say we don't

[1:04:31] have evals it's vibes based and Then

[1:04:35] it turns out that wasn't that dumb. Like

[1:04:37] everybody did this it turns out because

[1:04:40] the evals if you're building a coding

[1:04:42] agent, if you're building say an agent

[1:04:43] for customer support request or email or

[1:04:46] whatever but where you have a specific

[1:04:48] >> type of input,

[1:04:50] >> yeah, then that's a lot easier. But if

[1:04:54] you're building a coding agent that's

[1:04:55] supposed to work in any codebase,

[1:04:59] >> how do you even say what's correct? Like

[1:05:01] how do you even say what's good? And

[1:05:04] >> these models got better and better. So

[1:05:06] you're wasting not wasting time, but

[1:05:08] look at the last year what has happened.

[1:05:11] You could have spent months just

[1:05:12] tweaking the evals and it would tell you

[1:05:15] this model is clearly better than this

[1:05:17] model you know and yeah what if you get

[1:05:22] and now we're doing eval

[1:05:26] but at the end of the day

[1:05:29] using that stuff a lot still counts I

[1:05:32] think for more than the evals like the

[1:05:34] evals is like

[1:05:36] you know safety lines or guard rails or

[1:05:39] whatever you want to call it. Yeah.

[1:05:41] >> To get an impression and put some

[1:05:42] numbers on things. But

[1:05:47] sometimes you you can't write an eval

[1:05:49] where you go,

[1:05:51] >> "Oh, wow. This explanation is the best

[1:05:54] I've seen." Or, "Yes, it ran for many

[1:05:58] more turns, but the solution is actually

[1:06:00] a lot better." And if you have 500 eval

[1:06:03] cases,

[1:06:05] you're not going to look through all of

[1:06:06] them with, you know, you're not going to

[1:06:08] do this. And I'm saying this as

[1:06:10] somewhere we built evals. I fell in love

[1:06:12] with eval when we did like the autocomp

[1:06:13] completion stuff at Zed and I we had a

[1:06:16] lot of evals and we couldn't have done

[1:06:17] it without evals. But tab completion is

[1:06:19] a different thing than a tool using

[1:06:21] coding agent in any codebase.

[1:06:24] >> It's very different.

[1:06:27] >> A light question for you. Uh we have

[1:06:29] been talking a lot of code things so

[1:06:31] far.

[1:06:32] You mentioned in the newsletters a lot

[1:06:35] of things that you are you have been

[1:06:37] consuming. What are you doing? What type

[1:06:40] of experience?

[1:06:41] My curiosity comes asking this question

[1:06:44] is that how do you get this most time to

[1:06:47] read all of these things? Because I

[1:06:49] struggle a lot with managing a lot of

[1:06:52] reading. I hardly follow two three

[1:06:54] newsletters. Uh I follow like

[1:06:57] technically I follow a lot but

[1:06:59] eventually the one that I give dedicated

[1:07:02] attention to are only two three. How do

[1:07:05] you get the time to read things? Not

[1:07:07] just technical but I I think in last

[1:07:09] last you were talking about some other

[1:07:11] type of content as well not just core

[1:07:14] tech you were talking about some other

[1:07:15] philosophy related and other books that

[1:07:18] were there. How do you get this much

[1:07:20] time? How do you manage your time?

[1:07:23] >> I mean

[1:07:24] >> by the way before answering uh if you

[1:07:25] want to grab some water then please

[1:07:27] because we have been

[1:07:28] >> Yeah. Yeah. Yeah. Yeah. I got I got

[1:07:30] water here. I had a sip. Um

[1:07:34] I don't know. I I first of all I think

[1:07:36] it's not if you look through my

[1:07:37] newsletter it looks like a lot but

[1:07:40] sometimes there's YouTube videos there's

[1:07:42] a podcast there's some tweets you know

[1:07:45] and if I that's maybe I don't know what

[1:07:48] 50% in that last issue or something it's

[1:07:51] sometimes I have things where there's

[1:07:53] like six seven blog posts in it that are

[1:07:56] long and then you know reading six seven

[1:08:00] blog posts over the course of a week is

[1:08:02] not that crazy And I don't

[1:08:07] I don't know like I don't do a lot of I

[1:08:09] don't play video games. I don't do I

[1:08:12] don't I I try to read. It's it's the

[1:08:16] issue is like my book reading has gone

[1:08:19] down a lot like a lot because I I it's

[1:08:22] now a thing where I'm like oh I got to

[1:08:24] read for the newsletter. So it's it's

[1:08:26] kind of it's pushing me. But to just to

[1:08:28] give you an example like previously I

[1:08:30] was eating a dinner and I read like one

[1:08:33] blog post by Ay Maggie Appleton and I

[1:08:37] don't know like I've read a bunch of two

[1:08:39] things you know it's like on lunch break

[1:08:41] and then what you read like three four

[1:08:43] five things a day. I think the secret is

[1:08:45] to be

[1:08:47] selective or something. Not, you know,

[1:08:49] like I don't read things to the end

[1:08:52] where I'm like, I don't like this or I'm

[1:08:53] not interested in this. And

[1:08:56] yeah, I don't know. I It's just I I make

[1:08:59] it a priority. And I think it's not that

[1:09:03] it's not that much. Like if you look

[1:09:05] through I have some issues like some

[1:09:07] weeks where I read a lot and then it's

[1:09:09] like yeah, like today's Thursday. I

[1:09:11] might just lie on the couch the next two

[1:09:13] hours and read three posts or something,

[1:09:16] right? And maybe one of them will make

[1:09:18] it in newsletter or two.

[1:09:19] >> How does typical day look like over the

[1:09:20] week?

[1:09:21] >> Yeah,

[1:09:23] over the Yeah, typical day is I work a

[1:09:26] lot nowadays, but basically I get up at

[1:09:29] 5:45. I started kind of working at like

[1:09:33] 610 or something when I got my coffee or

[1:09:36] >> Okay.

[1:09:36] >> And then I work. Okay.

[1:09:39] >> Yeah. Then I work for an hour or

[1:09:41] something. Then I drop my then we have

[1:09:45] breakfast as a family. Drop the kid off

[1:09:46] at school. I go to the gym. And then I

[1:09:48] work from like 9 to

[1:09:51] I don't know 7:00 p.m. or something with

[1:09:53] like a lunch break. And yeah, and yeah,

[1:09:57] that's kind of it. and and I I go to the

[1:10:00] gym in the morning and I

[1:10:03] and that's I don't have,

[1:10:05] you know, it's not like I I watch I I

[1:10:08] don't binge watch TV shows. I don't

[1:10:11] watch a lot of movies anymore or, you

[1:10:14] know, I I work out, I work a lot, I read

[1:10:17] and yeah,

[1:10:19] >> that's

[1:10:22] >> that's so me also. I mean I am not

[1:10:24] really into reading a lot and that's why

[1:10:26] I I believe I my struggle with uh

[1:10:29] managing my time with reading stuff but

[1:10:32] uh I also try not to because eventually

[1:10:36] you don't get time if you're working on

[1:10:37] something like yourself you are you're

[1:10:40] completing build mode and I understand

[1:10:42] that you you guys are releasing

[1:10:43] something big uh in coming days also. So

[1:10:46] when you're in that build mode, you

[1:10:48] really do not prioritize anything else

[1:10:50] apart from some basic

[1:10:52] >> tick mark that you have to put in

[1:10:54] family, health

[1:10:55] >> and food. That's it.

[1:10:57] >> Yeah.

[1:10:57] >> So So yeah, I agree.

[1:11:00] >> I think I I would like to ask more

[1:11:03] questions, but I would also like to wrap

[1:11:06] this up here because I think we can do

[1:11:08] one more.

[1:11:10] >> Yeah. I have a lot of random thoughts uh

[1:11:13] that came because of the things that I

[1:11:15] read from your things but Mr. Nin I

[1:11:18] think this is this should be wrapped

[1:11:20] here. Uh so I would like to ask you one

[1:11:22] last question and if you have a minute

[1:11:25] then we can just uh end the recording

[1:11:27] after that and can chat. All right.

[1:11:30] And that question is that now that we

[1:11:32] have discussed okay and this question I

[1:11:34] also asked P as well. So I would love to

[1:11:36] see that how would you respond to this?

[1:11:39] I was the question is that in this ever

[1:11:44] evolving phase of agentic coding

[1:11:47] technically since the beginning of file

[1:11:50] I would say

[1:11:52] you guys are chasing the next big thing

[1:11:54] in terms of the future of agent decoding

[1:11:58] in my personal opinion if this is going

[1:12:02] to be ever evolving in a way that it's

[1:12:04] going to be there the evolution for next

[1:12:07] five 6 years then would you keep

[1:12:09] breaking things building it once again

[1:12:12] or would you stick to something as okay

[1:12:15] this is the base year now we will build

[1:12:17] upon this and why I'm asking this

[1:12:19] question because

[1:12:23] this is just my pure technical curiosity

[1:12:25] I believe but also when I look at any

[1:12:27] tool I expect that tool to

[1:12:32] sustain with some part of it as its

[1:12:34] basics and then they're trying to figure

[1:12:35] out okay if if this is the right feature

[1:12:37] or that is the right feature or if we

[1:12:39] should put this or we should remove

[1:12:40] that. Is AMP going to be in that lane

[1:12:44] also or will AMP go completely radical

[1:12:47] with how it is currently operating with

[1:12:49] you know uh thinking about the whole

[1:12:52] idea of doing things. Yeah, this is the

[1:12:53] question.

[1:12:54] >> I mean I can predict the future but I

[1:12:56] would say no we're going to keep

[1:12:58] breaking things. We have to we have to

[1:13:01] stay in the frontier. The reason why you

[1:13:05] can't

[1:13:08] stop and do things is

[1:13:10] the last 30 years in software, the

[1:13:12] playbook was

[1:13:15] try a bunch of things, find product

[1:13:17] market fit, find something that works,

[1:13:19] build it up, hire salespeople, and build

[1:13:21] up the company. And that's that was the

[1:13:23] playbook for a long long long time. The

[1:13:27] problem right now is that nearly

[1:13:29] everything in software

[1:13:32] is basically ruck pulled every three

[1:13:34] months with these models. So if you took

[1:13:37] that old playbook,

[1:13:39] the way I described it before is imagine

[1:13:41] you're like, "Yeah, here's a piece of

[1:13:43] software. That's cool." And then 3

[1:13:45] months later, here's the personal

[1:13:47] computer. 3 months later, here's the

[1:13:48] internet. 3 months later, here's the

[1:13:50] mobile phone. So yes, you could you

[1:13:53] could make money by standing still and

[1:13:56] saying this is a good piece of mainframe

[1:13:59] software,

[1:14:02] but which customers do you want to

[1:14:04] attract? Do you want to attract the

[1:14:06] people who are going to the mobile phone

[1:14:08] or do you want to attract the people who

[1:14:09] stay with the main frame? And it's not

[1:14:12] just about quantity as in the bat would

[1:14:16] be that the people going to mobile for

[1:14:17] like that's where everybody's going but

[1:14:20] what you're what you're pulling in is is

[1:14:23] people who are skeptical of new things.

[1:14:26] So you're attracting people who value

[1:14:28] stability and that ties you down. So if

[1:14:31] you then notice half year later oh

[1:14:34] everybody's on the mobile phone now I'm

[1:14:36] still on my mainframe thing.

[1:14:38] >> What do you have? like you have

[1:14:39] customers that pay you to not go to the

[1:14:42] mobile phone. So you're tied down. You

[1:14:43] cannot change things. So what we've been

[1:14:47] saying with AMP is we want users who

[1:14:49] want to go with us on the frontier, who

[1:14:51] don't want to stay on the current thing.

[1:14:54] And the the the weird thing is people

[1:14:57] keep telling us things that we should do

[1:14:59] that would tie us down. Like last year,

[1:15:02] build a PRD based workflow.

[1:15:05] I want I want a workflow where I I I do

[1:15:08] this and then I get a PRD that should be

[1:15:10] first class and then sub agents. Now

[1:15:12] nobody talks about that stuff anymore.

[1:15:15] >> So now companies came up with this whole

[1:15:18] logic of you know we are just providing

[1:15:19] you the

[1:15:20] >> PRD it's dumb and then so you attract a

[1:15:23] bunch of people who do this

[1:15:25] >> and then what and then you got to make

[1:15:26] the next breaking change and then you

[1:15:28] have these users who complain to you. We

[1:15:30] we killed autocomplete, right? We we had

[1:15:33] autocomplete in AMP and we said it's not

[1:15:36] the future. And people were pissed off

[1:15:38] some people, but a lot of other people

[1:15:40] went that makes total sense. It's

[1:15:43] definitely not the future. So the

[1:15:46] question is what who do you want your

[1:15:47] customers to be? You want in the times

[1:15:49] of massive technical change in the times

[1:15:52] where you you know you can be left

[1:15:55] behind you know you can miss the train

[1:15:58] because everything is changing you know

[1:16:00] you have to keep up if you do not want

[1:16:02] to miss the train because it's not like

[1:16:05] oh yeah I I sit here and I have a cushy

[1:16:07] life and it's comfortable and I just

[1:16:09] ignore the drain train you know that's

[1:16:11] not it's usually not an option it's not

[1:16:13] like yeah I can build a good business by

[1:16:14] building [ __ ] mainframe software no

[1:16:16] the business is going somewhere else

[1:16:18] that's how technology works. So you got

[1:16:19] to keep up. And if if your if your

[1:16:23] principle is you have to keep up, which

[1:16:26] customers do you want? The ones holding

[1:16:27] you back or the ones who will go with

[1:16:29] you?

[1:16:30] >> Good. Good.

[1:16:34] >> Did he say the same thing?

[1:16:37] >> I mean he was not that descriptive about

[1:16:39] it, but I think he was also on the

[1:16:41] similar lines. He was also stating I

[1:16:42] mean this is more of a principle thing I

[1:16:44] think the ideology thing than you know

[1:16:47] anything else. So he he hold it to the

[1:16:49] same ideology that we are going to break

[1:16:51] and make things and that's going to be a

[1:16:54] thing that

[1:16:54] >> and and I think one point that was quite

[1:16:57] not completely similar that he also said

[1:16:59] he also mentioned was that we are not

[1:17:01] chasing to get if say a company has 100

[1:17:04] developers we are not building for all

[1:17:06] those 100 we're building those for those

[1:17:08] 10 developers who actually

[1:17:10] >> who actually value this piece of

[1:17:11] software

[1:17:12] >> so I think you also mentioned that and

[1:17:16] >> uh you don't If I mean

[1:17:21] the the funny thing is

[1:17:24] it seems like the trajectory keeps

[1:17:26] going. We cannot predict the future.

[1:17:29] But imagine if in 2000 or in

[1:17:34] 2004 somebody would have told you the

[1:17:37] iPad the iPhone is coming. you know,

[1:17:40] would you

[1:17:43] have built your business on desktop

[1:17:45] computers

[1:17:47] or would you think the iPhone is coming?

[1:17:49] I got to be ready for this. Um,

[1:17:53] >> the desktop business would be a good

[1:17:56] business still, you know, but what we

[1:17:58] know is

[1:17:59] >> the models are getting better. we know

[1:18:01] this and we trust this and so we can

[1:18:05] kind of peek into the future because we

[1:18:07] know that we are on this slope at least

[1:18:09] that's the belief right that's what we

[1:18:10] believe it we don't know the future but

[1:18:12] so the question is do I want to build

[1:18:14] for that part of the curve or that part

[1:18:17] concrete example somebody mentioned this

[1:18:18] on Twitter yesterday um most people

[1:18:22] don't realize when they build all the

[1:18:23] correlation stuff it doesn't work with

[1:18:25] like the oss models or the local models

[1:18:28] they're like

[1:18:31] Why would I aim like if I'm not

[1:18:33] specifically interested in making things

[1:18:35] work for local models and the frontier

[1:18:37] models are here, why would I basically

[1:18:40] aim for the thing that's already in the

[1:18:42] past? You know, again, we're in a period

[1:18:45] of technological change. You the prim

[1:18:47] that the principle is you have to keep

[1:18:48] up. So if the frontier is over there,

[1:18:51] why would I go and aim for the thing

[1:18:53] five steps behind it if I should aim at

[1:18:56] the frontier?

[1:18:58] Well, I think that sums up the overall

[1:19:01] conversation and the takeaway that I got

[1:19:03] from this uh this last question

[1:19:06] especially the answer from this last

[1:19:08] question is that if you want to build

[1:19:10] the future you have to have that strong

[1:19:12] belief into what next and you have to

[1:19:14] keep building and seeing what's sticking

[1:19:16] around and what's falling apart.

[1:19:18] >> Yeah.

[1:19:19] >> And then again do it again and then

[1:19:21] that's how you build future. I I think

[1:19:22] this is the process of how you build the

[1:19:25] future for anything and device of

[1:19:27] building one for the developer and

[1:19:29] software industry. So uh really really

[1:19:32] happy that somebody is there who is

[1:19:34] caring about all the developers who

[1:19:37] actually care about engineering at the

[1:19:38] end of the day. So thank you so much on

[1:19:41] their behalf and thank you so much for

[1:19:43] all the insights that you have brought

[1:19:44] today. uh to my knowledge also pastor

[1:19:47] though if anybody wants to know you they

[1:19:49] can just read all your newsletters and

[1:19:50] they would be like I think I I know this

[1:19:52] man now at least technically how he

[1:19:54] tells

[1:19:56] >> so yeah so this is the hack but u yeah I

[1:20:01] mean I learned a lot and I still had a

[1:20:03] lot of questions and I think we will be

[1:20:05] taking them some other day uh maybe in a

[1:20:09] different setting all together and then

[1:20:11] I believe you all liked it if you want.

[1:20:14] I don't care. I just got the value that

[1:20:16] I wanted. So, I'm happy. I think first

[1:20:19] time you also enjoyed it. I believe you.

[1:20:22] >> So, thank you once again for meeting me.

[1:20:24] Thankfully. Thank you so much.