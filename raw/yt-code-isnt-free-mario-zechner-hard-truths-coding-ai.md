---
type: youtube
title: "Code Isn't Free — Mario Zechner on the Hard Truths of Coding With AI (creator of Pi)"
channel: "Jan-Niklas Wortmann"
url: https://www.youtube.com/watch?v=GhjU-KvXtT0
date_saved: 2026-07-18
speakers:
  - Jan-Niklas Wortmann
  - Mario Zechner
---

# Code Isn't Free — Mario Zechner on the Hard Truths of Coding With AI (creator of Pi)

[0:00] Code is never free because the consequences of your actions will eventually

[0:04] hit you. And if you think that any amount of code is good now,

[0:09] you just delayed the punishment.

[0:12] I have seen people who shit out like 500,000 lines of code via a bunch of agents

[0:16] in a week. And guess what the outcome of that is?

[0:19] That's Mario Zechner, the creator of Pi, a coding agent that's blown up in open

[0:24] source after Claude Code stopped fitting his workflows.

[0:27] And this conversation went places i didn't expect

[0:30] No actually it's fucking 30 years ago holy shit people figured out that waterfall

[0:35] is bad waterfall doesn't work and now we're back to hyper waterfall yeah.

[0:40] That's completely ridiculous to me

[0:41] And it's worse because now you're not even writing the spec anymore you just

[0:44] vibe prompt your agent to write a very detailed spec inevitably every time i

[0:49] do this i end up in a corner crying because nothing is good anymore and everything falls apart.

[0:55] The Vibe Coder will just sit there with his voice dictation app and dictate

[0:59] what app they want at a very high level.

[1:01] And the Enterprise Vibe Coder will first write a very detailed spec.

[1:05] We talked about why spec-driven development might be repeating a 30-year-old

[1:09] mistake, how Mario actually works, and it's not an army of agents.

[1:14] And why he thinks running serious AI fully local on a normal MacBook is closer

[1:20] than most people might think.

[1:22] So for 14 gigabytes of unified memory on macOS, or an equivalent NVIDIA setup

[1:28] on Windows, I could have a pretty good local inference machine. And that is affordable.

[1:34] He also tells me what running a popular open source project looks like in 2026.

[1:39] The number of AI-generated pull requests he gets per day is genuinely absurd.

[1:44] Instead of getting like one or two PRs per week for a very successful pre-agent

[1:48] open source project, I get 50 to 60 PRs per day by Clankers.

[1:54] And each PR has a description that is kind of like a full Harry Potter book.

[2:00] And then usually has about 10 to 1,000 file changes.

[2:06] This one is for everyone who's tired of AI hype, but still wants to figure out

[2:10] what actually works. Grab a coffee and let's get into it.

[2:13] Pi is a minimal extensible coding agent that can modify itself.

[2:17] So it fits your workflows instead of the other way around.

[2:21] I do like that aspect of modifies itself.

[2:25] So do you consider it more, I think you also said coding agent in there.

[2:29] So do you treat it more as an agent intentionally for developers so that they

[2:34] can kind of build their own tool set? Or how do you look at it?

[2:37] I mean, there's different layers to Pi. There's some underlying low-level things

[2:42] that abstract providers and LLMs, kind of like Vercel's AI SDK,

[2:48] terminal user interface library and stuff like that.

[2:51] And also more general agent loop abstraction.

[2:56] And then there is pi the coding agent which is currently mostly focused on coding

[3:00] but i i personally use it for finances and research and,

[3:06] a little bit of my Hetzner server administration is not so done with it which

[3:13] is kind of coding related obviously but um i noticed very early on that a coding

[3:17] agent is basically all you need to do other,

[3:20] other knowledge work as well um and it seems like the rest of the industry is

[3:23] also thinking that way Because if you look at things like,

[3:26] Claude Design or Claude Cowork or whatever you have, they're basically all just coding agents.

[3:32] I've heard a little bit on the backstory that you basically tried a couple other

[3:36] coding agents and didn't really like any of them out there. So you felt like

[3:40] this developer itch of like, oh, I can do better.

[3:43] Which admire that attitude

[3:46] Obviously we we we all usually suffer from not invented here syndrome but honestly

[3:52] initially i was super happy with Claude Code it just over time didn't fit my

[3:57] workflows anymore and i had no way to,

[4:00] to change that um because Claude Code doesn't let me do the things i need to do for

[4:05] it to fit my workflows that was basically the reason.

[4:08] That is actually the thing that i'm so much more interested in like benchmarks

[4:13] and those kind of things i think we're now at this early stage of ai development

[4:18] where talking about workflows is

[4:20] like the interesting at least for me interesting so when you say it didn't fit

[4:24] your workflow what you mean with that

[4:26] They have a very high frequency release cadence which means you get,

[4:32] one two three releases per day even sometimes and with all of these releases

[4:36] come changes to things like the tool definitions the system prompt and so on

[4:40] and so forth so if i have a bunch of,

[4:43] um let's say prompt templates or slash commands or whatever you say,

[4:48] or skills even um or i have workflow descriptions that the model is supposed

[4:52] to follow and the changes to the system prompt and tool definitions mess around

[4:56] with that so my workflows don't work anymore defined in prompt templates then that is bad,

[5:02] if the model becomes dumber because they are injecting system reminders left

[5:06] and right behind your back that are not surface to the user interface and i

[5:10] am wondering why the the model doesn't behave anymore like it behaved yesterday

[5:15] even though it's the same model supposedly,

[5:17] then that is bad so i i'm a developer i like my tools to be stable and cloud

[5:23] code is not something that is very stable which doesn't mean it's bad obviously

[5:26] it's not like millions of people use it productively so,

[5:31] more power to everybody who's happy with Claude Code is just i'm an old man i'm

[5:34] used to simpler tools that do just what I need them to do and not more than that.

[5:40] The fact that the model gets dumber arbitrarily, I noticed the most with Claude for some reason.

[5:48] Um i i feel like i i don't know if open ai handles it better or where this is coming from but

[5:56] I think that's true for various technical reasons and infrastructure reasons um,

[6:01] definitely the harness has an effect on how the model behaves how the same model behaves,

[6:06] and since they're changing the harness a lot and since actually testing effects

[6:10] of harness changes on model quality on model output quality is really really hard,

[6:15] um because it's an open-ended kind of question that you need to answer for which

[6:19] you can't really write deterministic tests um,

[6:23] i think a lot of that can be attributed to changes in the harness um so i don't

[6:28] know why why gpt models seem to behave better it might all just be vibes and.

[6:35] I think this is mind-blowing to me to be super honest because like usually developers

[6:40] have like very valid reasons of why they like tool y more than tool x most of

[6:46] the time i feel i can give you

[6:49] Which is now completely obsolete but i don't think there's oh.

[6:53] Really no i could give you like exact reasons of why i like uh my ide more than

[6:58] vs code i could give you a reason why i preferred angular over react why

[7:04] Sure but you will always find people in the opposite camp that's that's That's

[7:06] my point. So if it were objectively measurable, if something is better than

[7:12] something else, then there wouldn't be camps, right?

[7:15] That's true. But usually they have reasons, whereas I feel like this conversation

[7:20] between what coding agents is usually like,

[7:23] it feels right or and like also when i look at models like it's it's so much

[7:29] vibe based based on like how i talk to the model and how i feel it responds to me

[7:35] But i think that's kind of similar to when you,

[7:39] prefer a specific abstraction over a different abstraction like if you have

[7:43] for example Solid versus React um kind of doing this a similar thing,

[7:49] just entirely different yeah,

[7:52] I personally, I'm a Solid guy. I love Solid.

[7:56] It's exactly down my alley.

[7:59] But that is not because React sucks. Obviously, it doesn't because it's like

[8:04] the most successful framework there is.

[8:07] It's just that it kind of feels better using it. And my brain more easily adjusts

[8:12] to the way it works and its abstraction work. And I think it's very similar with models.

[8:18] I personally, for example, like the Claude models or Claude-distilled models much

[8:25] more for prose and things that involve human-like writing than code.

[8:31] On the other hand, I like GPT for code so much more than Claude.

[8:37] So none of this I have evaluated in any kind of,

[8:43] let's say, scientific kind of way or an American way. It's just,

[8:47] this is my experience with those models, and it kind of burned itself into my

[8:50] brain to use Claude for prose and GPT for code.

[8:54] Funnily enough, I do the same thing. I'm wondering, for Pi, what,

[9:00] I mean, like, this has now grown into a very successful project with various

[9:07] parties being interested in.

[9:09] But I'm curious, what do you consider

[9:11] success for Pi? That's a very big question, a very loaded question.

[9:16] When people stop sending pull requests and issues, I'm sick and tired.

[9:22] Now, success is relative. Obviously, there's an economic perspective to that

[9:27] because otherwise I wouldn't have joined Earendil.

[9:30] But it is kind of only superficially related to Pi itself. I mean,

[9:34] Pi is and will stay open source just because the cost to copy is probably very low.

[9:40] The mode here is that I am in control of it and I dictate its design.

[9:45] And even if it doesn't take a long time to copy design, like Cloudflare took

[9:50] a lot of Pi's design and kind of translated it into the new think abstraction and,

[9:56] that's hilarious i i'm i'm friends with those folks and it's just hilarious so,

[10:02] obviously if your code is in the open there's no mode because people can now

[10:05] even more easily clone whatever you've built right but while they are cloning

[10:12] i keep working on pi and changing things and,

[10:16] trying out new abstractions trying to find better fits for the problems I'd like to solve.

[10:20] So that's where the mode is in terms of open source software and in terms of

[10:23] business, you want to add some value, right? So for me, success is just.

[10:31] For me, success would be if I can figure out an additional value that I can

[10:37] sell for money with which I can basically keep a tiny team alive.

[10:42] That for me is success.

[10:45] Bigger success is if I can go full vertical and kind of own the entire stack.

[10:51] But that's a long-term kind of...

[10:54] Tell me through that. What would that look like on the full stack?

[10:57] What do you mean with that?

[10:58] You can think about it as layers. like at the top there's the application layer

[11:02] right and pi coding agent would be application layer you could,

[11:07] kind of consider OpenClaw as an application layer kind of application of Pi

[11:11] even though they are now mostly on codex app server which makes a lot of sense

[11:14] since Peter joined OpenAI um,

[11:19] and there's other applications that don't yet exist in neither in the open source

[11:23] space nor in the commercial space except for anthropic and now increasingly

[11:28] also OpenAI with Codex app,

[11:32] that try to not only hit coding agents, but try to hit all kinds of agents or

[11:36] agentic needs, let's say, like Cowork, Design, Chrome, Claude, whatever.

[11:41] Those were all experiments or even successful products at this point.

[11:45] And there doesn't seem to be a lot that's not tied to a model lab in that direction.

[11:51] There's a bunch of startups that try to do things and then they get immediately

[11:55] bought up by Facebook who then don't know what to do with them.

[12:00] But there are no open-source solutions for that.

[12:04] At least I'm unaware there might be.

[12:08] So that kind of layer is super interesting, and I'd like to explore it more.

[12:11] I built this kind of shitty robot here.

[12:14] I saw the tree.

[12:15] And that is just part of me experimenting, what if I stuff an agent,

[12:20] a coding agent in this case again, inside a shitty little toy robot with a smartphone

[12:26] for the MCU, basically the microcontroller.

[12:30] And I'd like to go in directions like that a little bit more on the application layer.

[12:34] I find it super interesting including local inference like this thing as of

[12:38] today as of last night midnight works fully locally and it's very nice it's very super cool,

[12:46] because now i can expose it to my boy without any second thoughts apart from

[12:51] this little llm that is then running on the bigger beefy machine,

[12:55] um being a sycophant and telling my boy wrong things but it's a problem and

[13:01] I can solve in another way that's non-technical.

[13:03] But yeah, this is what excites me. And success for me would mean that I can

[13:07] contribute to this local inference future a little bit as well.

[13:11] So not just economical success.

[13:13] I would be curious to talk about that a little bit more because in the AI scene,

[13:20] even though everything kind of feels sick saying it like that,

[13:26] Every conversation that I see is like everyone wants local AI,

[13:30] but it's just not nowhere consumer ready.

[13:34] And with consumer ready, I mean already like developers who are like ready to

[13:40] mess with it. What is your experience?

[13:43] Yeah, I mean, that is definitely true. And I'm not even talking about the local model quality.

[13:52] The setup alone and the cost involved is still usually not worth it like if

[13:57] you actually buy a beefy i don't know dgx station workstation that costs you 100k,

[14:05] that's a single b300 with i think 500 or 700 gigabytes of vram that's beefy

[14:11] and you can run a really good model on that but nobody has the money for that so um,

[14:16] ultimately so i've been playing for this I've been for this robot I've been

[14:20] playing around with smaller ones Gemma 4 and Qwen 3.6 I think,

[14:27] some mixture of experts model and you I didn't believe it but they for for this application.

[14:36] A chatbot with motor and camera that is being,

[14:40] talked to by a kid they're more than perfectly fine like they're actually really

[14:45] really good and really really fast and i think there's a lot of applications

[14:49] out there that are not just toys but also real world tasks,

[14:54] that could be served by these models today and you do not need need hardware that's,

[15:00] that's that's expensive like this thing runs on a run-of-the-mill macbook m1

[15:06] for example not even a beefed out one with 32 gigs,

[15:11] And there's the speech to text with Parakeet,

[15:16] text to speech with Qwen3 TTS, those take about 10 gigabytes.

[15:21] And then I have Qwen 3.6, which takes another 4 gigabytes, so for 14 gigabytes

[15:27] of unified memory on macOS or an equivalent NVIDIA setup on Windows,

[15:34] I could have a pretty good local inference machine. And that is affordable.

[15:38] Again, not for the entire world, obviously, but for a lot of people.

[15:42] And you also see a bunch of companies pushing in that direction.

[15:45] Like Google is really, really big on edge inference. And I like that.

[15:49] Do you think we will see a rise in the smaller models?

[15:56] And in that, so we at JetBrains, we have been doing the, so basically we ship

[16:01] like tiny models I can literally just do like CSS auto-completion.

[16:04] It's completely offline and it doesn't work if you have like a big-ass project.

[16:08] But for like completing tailwind classes, which I'm at least not capable of

[16:12] remembering all the fucking time, this is nice.

[16:14] So I'm wondering, do you think there will be, we will see a shift from these

[16:20] frontier models, which are like massively big?

[16:24] If we're being realistic, also for a lot of these things, like,

[16:27] so I, with my microphone, I had a delay.

[16:31] So I was trying to troubleshoot that with Claude because I'm just too stupid for audio-video stuff.

[16:37] You have clearly seen before this recording that I failed because I'm using

[16:41] my old microphone again.

[16:43] But if we're being realistic, for these kind of scenarios, big-ass models like

[16:48] Claude are completely overkill.

[16:50] Do you think we will see a rise in small expert, very specially trained?

[16:55] And to some extent, we already see this with examples, as you mentioned,

[16:58] like text-to-speech, where it's just like this is this one thing that you're doing

[17:02] I i i'm not involved in model training so i can't speak from expertise but what i'm hearing.

[17:10] Maybe no if you look if you if you listen to people like denise asaves for example from DeepMind um,

[17:19] his thoughts are that the current gigantic models actually don't need all these

[17:24] parameters they have and that you can actually distill that down to much,

[17:28] much, much smaller models without losing a lot of output quality.

[17:33] So my hope not my my let's say uh knowledge is that um this is the future we

[17:41] try to take these we will always need to train,

[17:44] no sorry not not speaking in absolute currently at least as i understand it

[17:49] we do have to train these big models for various reasons related to how training

[17:53] works and so on and so forth but once you have such a big model you can distill

[17:57] it rather easily down to something that's,

[18:00] an order of magnitude or more um

[18:02] smaller while still retaining most of the capabilities and my hope is that,

[18:07] we are heading to a future where,

[18:10] we don't necessarily have specialized models i don't think specialized models,

[18:15] i think they can be um abandoned eight for now if you want to kind of be.

[18:20] Sovereign and and and have some small tests but ultimately you want And the

[18:25] same bang for the buck that you get for a big model locally.

[18:29] And I think we are very close to that actually. antirez from Redis,

[18:33] Salvatore, he started working on a very custom inference engine just for DeepSeek

[18:39] V4 called ds4, obviously implemented it in C because it's the best language.

[18:46] Someone is biased

[18:49] And and and he is uh he's running DeepSeek V4 Flash on,

[18:54] uh i i on on 128 gig laptop for example armin my partner in crime at Earendil

[19:02] also does the same now he's also started contributing to that,

[19:05] and it's a really really capable model like really like i probably it probably

[19:11] could handle like 60 to 70 percent of the issues i'm i'm handling with pi,

[19:16] um so i don't think we are far away from models that that are as good as the

[19:22] current frontier models obviously the frontier models will always be frontier,

[19:26] um but the question is do i need more intelligence.

[19:31] That is kind of where i wanted to go with this um because i think it's very

[19:37] interesting to to hear the people that build coding agents, how they also use that. And

[19:46] if you listen to Anthropic, I get kind of PTSD, to be super honest.

[19:50] I don't think it's a sustainable way of working, architecting.

[19:54] I don't even know where to start. It seems to work for them,

[19:56] so I don't want to criticize it.

[19:58] If I look at my workflows, I think the maximum was that I had five coding agents

[20:05] running in parallel and I had never faced such a mental fatigue after two, three hours of work.

[20:13] So I'm curious, how do you work?

[20:17] And I don't mean this in any negative way. There definitely was a certain connotation.

[20:23] How do you work on features for Pi? How's your day structured in that sense?

[20:29] I'm an absolute caveman.

[20:31] I have.

[20:34] There are two types of tasks I have. The first task is going through the issue

[20:38] tracker and picking off things that need to be fixed or implemented.

[20:42] Um these usually have an issue that is descriptive enough that i can give it

[20:47] to my agent with an additional prompt template that says,

[20:53] pull down all the information from this issue including any reference code any

[20:56] reference pull requests and so on and so forth ignore the analysis in the issue

[20:59] and do your own analysis based on the goals that we want to achieve here with this issue,

[21:04] and then i usually get a pretty good analysis of what this issue is about and,

[21:09] options on how we could fix it either by pulling in a pull request that already

[21:13] exists or taking what's in there and modifying it or doing a from scratch implementation of fix,

[21:19] and this analysis step usually per issue takes like five minutes for the LLM

[21:23] for the agent to kind of go through so,

[21:26] I queue up one of these in one session I open a second session pull in the next

[21:30] issue I open a third session pull in the next issue and have kind of like a,

[21:35] parallel pre-processing of

[21:36] all the issues I want to work on today And then I just go to each session,

[21:41] check what the agent suggested, go into the code myself, ensure it makes sense,

[21:45] try to reproduce things manually if they're hard to test automatically.

[21:50] And then it's just a classic back and forth until I agree with myself,

[21:55] using the agent as a rubber duck, that this is the way I want to implement this.

[22:00] And at that point, the context usually already contains so many guardrails in

[22:07] terms of what will the interfaces look like, which specific modules will we

[22:10] modify, which tests will we write, and how should they work exactly.

[22:14] Because just telling your agent to write tests is never a good idea.

[22:19] Yeah at least so at the end of this process of an analysis planning i just say

[22:25] go implement and once it starts implementing which also takes another 10 to

[22:29] 30 minutes depending on what it is i do the same at the next session,

[22:33] and once something pings and says i'm done i have a little pi extension where

[22:38] i can basically pull up a diff of all the changes that were made,

[22:43] and annotate individual lines inside that diff viewer with feedback.

[22:50] And then i click finish review it gets fed back into the agent automatically

[22:54] and that's how i iterate on the thing until i think the code is good um for

[23:00] some pieces of code i don't care i just say fine.

[23:05] For other pieces specifically core mechanics i i usually review every every

[23:09] change that's being made like i would with a human,

[23:13] and that that's the one thing that's like my day-to-day thing fixing bugs adding

[23:17] features and then there are other tasks like refactoring and building new things um,

[23:25] for building new things i just slop, like this robot thing the the software

[23:31] for the robot thingy is not super complicated but,

[23:35] um it has complexity already because the speech to speech pipeline has many

[23:40] services that need to get involved um i actually took the the Python MLX implementations

[23:46] and converted them to rust last night,

[23:49] because i hate python as a dependency and i want to have a single package people

[23:52] can download onto their mac or onto their windows machine with an nvidia card

[23:56] and just start it and and have everything running out of the box,

[24:00] um so but in this case i'm just basically vibe coding uh i i do not look at

[24:06] the code at all i have a very good idea of what needs to be done i can specify

[24:10] that really well and then I do a lot of manual testing,

[24:14] and not even bothering with a test suit because it doesn't matter in this case.

[24:17] That said, eventually I realized this will probably not be a unique project just for my son.

[24:24] After showing it to kids in the hood, they also want one.

[24:28] So I spent last night and the night before refactoring the vibe slop,

[24:33] which is the third kind of workflow.

[24:37] Once you fucked yourself by vibe slopping, by vibe coding, and once you realize

[24:41] that the thing you built is actually valuable and should probably have a better

[24:46] fundamental so you can extend it more easily in the future,

[24:50] you got to go in and refactor your vibe slop. And there's two ways to do it.

[24:53] You take what you learned and just built from scratch, or you start picking

[24:58] off individual refactoring tasks from this ball of vibe slop.

[25:04] And that is what I did for the robot. And the way I do this is I go in and read

[25:08] it myself or I let the agent explain to me how things work in specific parts of the code base.

[25:13] For the robot, it was basically two files, one 3,000 lines of code file called

[25:18] server.ts and another 3,000 lines of code file called client.ts that runs in the browser.

[25:25] And yeah, you can imagine that wasn't fun.

[25:29] But I basically just started like I would manually pulling things out into individual

[25:34] modules, defining interfaces, boundaries, and those I define by hand.

[25:38] I would, for example, I can ask the agent to propose a bunch of options for

[25:43] an interface or a module boundary.

[25:45] Then I take one or I let it write example apps or tiny little scripts where

[25:49] I can go in and manually feel how the interface, I still need to be kind of

[25:54] in the code to feel if an interface feels good, if an API feels good.

[25:56] So I let the agent write the examples. I go in and play around with it.

[26:00] And if I like it, that becomes my plan basically. But yeah, that's the refactoring

[26:04] work. I use the agent to explain what exists.

[26:06] I use the agent to write options for how that could be refactored.

[26:12] Then I go in manually and kind of feel things out. typing up a little code or

[26:16] using the api myself by hand and if i'm happy with the refactoring plan for

[26:22] pulling out 500 lines out of the 3 000 lines into a separate module and,

[26:26] defining a boundary then it's just let the agent do the thing again at which

[26:30] point again we have enough context so the agent is very guard railed in terms

[26:35] of where it can go in in case in terms of the implementation.

[26:38] I'm having somewhat similar workflows so i'm um but that just works for me at

[26:46] least and i assume it's similar for you because i have 10 plus years of experience working

[26:53] in the nitty-gritty details of a code base having that manual experience um also learning by heart

[27:04] learning the hard way what works and what doesn't work uh every developer i

[27:08] know has patterns that they would absolutely not do again because they tried

[27:11] it once thought it was great and it turned out to be horrible how do you think this will

[27:18] develop moving forward for people that are now just coming out of college

[27:23] I honestly don't know like if i were if i were a kid today i if i were an actual

[27:29] kid today like i used to be in the 90s right when i started programming,

[27:35] i would probably not learn programming i would probably just ask an agent to write me a program,

[27:41] i mean we already see this at schools kids use gpt to do the homework and i

[27:46] would have done that as well because i hate our homework that um,

[27:51] so i'm i'm not sure i don't know so for the young people um good luck my condolences,

[28:00] for for old people like us um,

[28:04] they are definitely agents are definitely a force multiplier but there is a

[28:07] risk of atrophy and a risk of loss of discipline and agency.

[28:12] That's something I have struggled with as well over the last year or two.

[28:18] Just finding the discipline to not delegate all the things to the machine because,

[28:22] inevitably, every time I do this, I end up in a corner crying because nothing

[28:26] is good anymore and everything falls apart.

[28:29] That is also the biggest issue that I have with this narrative that I've seen

[28:33] this a couple times online where it's like, well, we have too much code now,

[28:37] we cannot review it anymore.

[28:38] Where I'm like, well, then how are you expecting to maintain it if you cannot read it?

[28:43] That doesn't make any sense what you're saying.

[28:46] That is just a little bit more sophisticated approach to vibe coding, but not much.

[28:52] Exactly. That's basically, it's like the vibe coder will just sit there with

[28:55] his voice dictation app and dictate what app they want at a very high level.

[28:59] And the enterprise vibe coder will first write a very detailed spec.

[29:04] But essentially it's the same fucking thing.

[29:08] I i had a little bit of like a ram i think it was like two weeks ago where i

[29:12] was like i don't get why people are doing spec driven development i either it

[29:18] just doesn't click with with me or it's like my way of working doesn't work

[29:24] but like i i have struggled to get meaningful information from business people

[29:27] for ever what is now different like there's no reasonable way that i could write a complete prompt that

[29:35] that even like i could give this to another developer and they would develop

[29:39] it flawlessly neither a coding agent doesn't make any sense to me no

[29:43] Yeah it's crazy it's like we forgot the lessons of the last 30 years.

[29:48] I mean we literally introduced scrum some

[29:51] People we 30 years ago or 20 25 years ago no actually it's fucking 30 years

[29:57] ago holy shit people figured out that waterfall is bad waterfall doesn't work

[30:03] and now we're back to hyper waterfall where you kind of.

[30:06] It's faster it's

[30:07] Fast and it's worse because now you're not even writing the spec anymore you

[30:10] just vibe prompt your agent to write a very detailed spec and that's like a tower of turtles.

[30:18] Yeah that's that's completely

[30:19] Ridiculous but i mean there's a counter argument to that and the counter argument

[30:22] is that since code is now essentially free,

[30:25] and since iteration times are quicker like previously if you,

[30:28] wrote a waterfall spec and had the team of engineers implement that your turnaround

[30:32] time would have probably been months now it's maybe a day or even less depending

[30:36] on the size of your spec and then,

[30:38] so you just go in and manually test your way through this or whatever and i can see the appeal,

[30:45] of that i have yet to find evidence that this actually works for production

[30:51] software i have my reservations so,

[30:55] but i'm not i'm not ruling out that there's some magician out there who can

[30:59] actually make that work and not wake up uh,

[31:02] eventually and just try at night because everything is broken now.

[31:06] I like to like distance my grumpy self from it a little bit because i'm glad

[31:10] that we're now at least like looking okay how how can some workflows look like

[31:15] utilizing coding agents in a more approach instead of just like fuck around and find out

[31:21] um so if i distance myself a little bit i'm glad we're having conversations

[31:25] around and i don't think this is the right conversation

[31:28] I'm not convinced that army of agents works at the moment and the reason for

[31:31] that is just that if you if you i've said this a million times now i'm kind

[31:36] of sick of it but If you're writing a spec, what is the most detailed spec you can actually write?

[31:44] Like, what does that look like? The most detailed spec. It's basically your

[31:49] program, the program itself.

[31:51] Okay. So, assuming you are not writing the program by hand, because now you

[31:55] have agents, you're writing a human natural language prose-based spec.

[32:02] If you do that, the agent needs to translate that into architecture and code.

[32:08] If you are not specifying any of that on the absolute highest detail level which is the program,

[32:17] you are leaving planks in your spec and the agent fills that out and the question

[32:22] is with what does the agent fill out the planks that you're leaving out in your spec,

[32:26] with the garbage code that we put on the internet for the past 20 years so that

[32:30] is also exactly how a code base that's vibe coded or enterprise-wide coded with specs looks like.

[32:36] It's very bad. It's very bad.

[32:41] So I run an experiment. So full disclaimer, I know nothing about Kotlin,

[32:45] right? Everything in JetBrains runs on Kotlin. I know nothing.

[32:49] I was probably more like a quota high or something. I don't know.

[32:56] So when the Ralph loop was big, I was like, well, I should give this a try,

[32:59] right? Just to be like objective. I have my concerns, still have them.

[33:04] So I reached out to a developer owning our terminal integration.

[33:07] I was like, hey, there's this bug that bothers me.

[33:10] Do you mind if i use this vibe coded and you give me a review i i put a disclaimer

[33:16] because i don't want to put add more work to his plate right

[33:19] but at the same time uh i gave him this disclaimer the pull request was never

[33:23] even able to merge it was just utter trash

[33:26] um complete nonsense i didn't have any chance to like verify it because a i

[33:31] don't know the language i don't know the subsystem i don't i'm not that deep

[33:34] into the code base and i could justify or have any way to reason about it And he was just like,

[33:39] Fuck is that? Why are we even doing this?

[33:42] So I...

[33:45] Yeah, I have various concerns about Vibe coding.

[33:49] So here's the thing. We have a bunch of projects now that show us that something

[33:53] like a Ralph loop or an auto-research loop or a slash goal or whatever you have can actually work.

[33:59] Like Bun, the rewrite from Zig to Rust.

[34:04] I think there are, and that's what I mean with like, I'm excited to talk about

[34:08] Workforce because I think there are constraints where tools like that really make sense.

[34:13] BUN to RUST is a great example because you have an extensive test suite and

[34:18] you can establish a process where you can create or can have the agent verify

[34:23] the work itself to a certain extent.

[34:26] So things like that totally make sense. I was considering making that joke also

[34:30] to rewrite the IntelliJ codebase to Rust, but our marketing department was not happy about that.

[34:38] But that's exactly what I mean. If we're just looking at it and if you're terminally

[34:42] online like I am, And you think like, depending on the bubbles you're in around

[34:46] like February or something, I would say, Ralph was everywhere and everyone was

[34:50] like, oh, that's the shit.

[34:51] That's the best thing ever that happened to coding since coding agents two months before.

[34:56] Yeah, sure. If you have an infinite source of tokens or money.

[35:00] That is another, yeah. Okay.

[35:03] You mentioned earlier this thing that code is effectively free.

[35:07] Is that something you really think?

[35:09] No. Because I don't. Okay.

[35:11] Because the consequences of your actions will eventually hit you and if you

[35:15] think that any amount of code is good now,

[35:19] you just delayed the punishment. Because that, like, I mean,

[35:24] I have seen people who shit out like 500,000 lines of code via a bunch of agents

[35:28] in a week. And guess what the outcome of that is?

[35:32] I have so many thoughts on that because on the one hand, I think if the lines

[35:36] of code is really what you value now and used to be your bottleneck,

[35:40] apparently, then you never just really put your mind to that and you needed to, like, type faster.

[35:46] That argument just doesn't make sense to me. like if i want to i can also write

[35:50] thousand lines of code in an hour that's not the value

[35:55] It's gonna be hard to do it in an hour but yeah i mean i think as a human we

[35:59] max out at two to three k lines of code a day but for me the writing the lines

[36:04] of code was never ever fucking the problem but,

[36:10] so say i build software my software should have a new feature i want to solve

[36:13] a new problem with my existing software or write a bunch of new software the,

[36:18] most time i spend on that is thinking about it and designing the thing right,

[36:23] and then just writing it out obviously there are some classes of programming

[36:28] problems like i always hated writing gpu kernels for example i had to do that because i had to well,

[36:35] there's just hard really hard coding coding uh things where just your brain

[36:41] just clases out because you can't keep all of it in your head at one point.

[36:46] But let's assume it's not that, it's something else.

[36:50] Then exploring the solution space, the number of solutions you can explore is

[36:54] limited by your coding abilities.

[36:57] So basically when we complain about, hey, why are we doing waterfall now?

[37:01] Then this is kind of similar when we say, oh, previously I thought so much about

[37:07] things instead of coding.

[37:09] Because you had to think so hard to find that one solution that you then can

[37:14] actually spend resources on implementing.

[37:17] And I think there is a big, big, big uplift by using agents for that phase because

[37:22] now you don't have to initially, you don't have to perfectly zero in on that

[37:27] one solution of the lots of designing and thinking.

[37:30] You can actually explore things and that is super valuable. Doesn't mean that

[37:34] the results of those explorations that are partially or fully written by agents are reusable,

[37:38] but you can get a feeling for the solution space and the solution you want to

[37:42] have with agents way quicker because you can tell a bunch of agents go off and

[37:46] build it like this build like this build like this and then look at the results

[37:50] and that is what for me is the,

[37:54] biggest productivity increase the.

[37:56] Thing that i also like is the asynchronous nature of this i can now give my

[38:01] agent a task to explore something, evaluate something, research something and

[38:07] go in a meeting because we still have meetings.

[38:09] We still need to talk to people and then come back. And at least if I have the

[38:14] capacity to like pick up on that, I can, I saved a little bit of like time in

[38:19] that space that I otherwise couldn't have used in any other way.

[38:23] But again, I don't see it realistically any near time soon that I'll spin up

[38:28] 10 agents and 10x my output in that sense.

[38:31] Well, I mean, the asynchronous nature is a benefit for some tasks.

[38:37] Like if you have a review agent or whatever, obviously you don't want to sit

[38:42] there and wait for the agent to finish its review.

[38:45] But if you do too much of that at least for my old brain it's just it's like,

[38:51] i i probably need to start ketamine or something to to get to get through having

[38:57] 20 20 agents running and then,

[39:01] that it's not it's the task switching is the it's the context switching that's killing you um it's,

[39:08] previously i could focus on two to three things a day at tops now,

[39:13] on a good day i can go through 30 issues on pi fixing them and it is i couldn't

[39:18] do that before but i also only do this like once or twice a month,

[39:22] because after the day of doing that i'm so done with the world because my brain

[39:27] is just mush the context switch is what kills you and i also like there is tasks

[39:33] where asynchronous agents can be super beautiful,

[39:36] but also i find i find collaborative work with an agent really really really

[39:41] helpful because previously i would sit in my office and think through an issue

[39:45] and there might not be a human squishy part next to me sitting sitting next to me where,

[39:50] whom i can talk to or there might be remote and i can only chat to them which

[39:54] is kind of different from regular.

[39:58] So now I have this non-squishy, non-human, non-meatbag in my machine,

[40:02] which I kind of use to become my pair programming partner.

[40:07] And that is really great because it's kind of like a bicycle for the mind.

[40:14] Where I can think through the problem while talking to an agent or asking the

[40:19] questions or having it ask me questions like the Socratic method.

[40:24] Uh and and that helps me explore questions within the problem space a lot better

[40:30] so i i'm that's why that's why i don't like the army of agent things because,

[40:34] it takes away it takes me away from thinking about the problem.

[40:37] So last year pretty around the similar time i had Ryan Carniato on the podcast

[40:41] and he said a thing around um

[40:44] he's basically thinking about problems all the time so his wife is joking that

[40:49] one day will he will be hit by a bus because he's thinking about a problem not paying attention.

[40:55] I have that if I'm in that headspace where I want to think about a problem,

[41:00] but otherwise I'm good to zone out. Like if I'm with my kids,

[41:04] I don't think necessarily about work or something or like a problem that faced me.

[41:08] When my mind is going idle like when i try to sleep then i have that but like

[41:12] if i'm doing something and it can be as easy as like playing catch with the kids outside right

[41:18] how's that for you and now i'm wondering also do you think that will change

[41:24] in such a workflow where you can like have someone like some kind of sparing partner in form of an ai

[41:31] I so the the turning your brain off or or or stopping thinking about problems

[41:35] that i've never been good at that like i.

[41:37] Not good in sense that you have been doing that all the time

[41:40] Pre and post agents nothing changed for me with that in that regard because

[41:43] if i have something that is really enticing that is really capturing my attention,

[41:48] um and say i work on that for four hours and then i i have to go because i need

[41:52] to pick up the boy from from kindergarten or something like that it takes me

[41:55] about an hour for my brain to kind of let go,

[41:59] of that of that problem and there's really nothing you can do about it it's

[42:03] super it sucks so i i would like to be able to just step out and be like ah,

[42:08] my brain is now uh all good but you know like the what's it called one of the

[42:13] superheroes in in The Boys saga or so she would lobotomize herself just.

[42:17] Oh yeah yeah yeah

[42:18] Whenever she wants a little peace of mind and i i kind of wished i could do

[42:22] that because uh it sucks getting getting,

[42:25] stuck in this thinking loop um it is probably some i don't know mental condition

[42:30] so but a lot of my peers actually share I'm happy to hear that,

[42:34] you're not affected by that garbage because it sucks.

[42:38] I can imagine yeah i i'm not not envying you there oh

[42:42] And agents don't make it better they used to make it work worse like when all

[42:48] this started with the release of Claude Code i i did use all the other things

[42:51] before copilot yeah tap tap and cursor and whatever

[42:54] but Claude Code was just so enticing because it it kind of just worked in a way

[42:59] that makes sense for my brain um,

[43:01] and then i thought oh my god i'm a god now i can do all the projects i never

[43:05] had time for because this little machine cannot do most of the shitty work that

[43:08] takes a lot of time right so i was building,

[43:12] millions of projects and i couldn't stop thinking about how to finish this project

[43:16] where to start with this project and so on it was like,

[43:19] uh four months of not sleeping at all basically three to four hours a night,

[43:24] full AI psychosis,

[43:27] but eventually it's not that was it.

[43:31] So i think i didn't really have that because like uh in my work i kind of got

[43:38] pushed into that so i had like all day to experiment with that and

[43:42] uh i definitely have that time where i'm like oh okay i can now work on those

[43:47] projects but then i try to like cram that in my eight hours work day as like

[43:51] oh i'm experimenting with that i'm trying these two so what was it in the end

[43:56] that made you snap out of it

[43:58] Because i found that i'm producing things of no value neither for me nor for

[44:02] other people and just building for the sake of building is something i do if i learn something new,

[44:08] but not something i want to do if i don't learn anything and if i don't use

[44:12] the thing i built or nobody else has a use for the thing i built and so i just

[44:16] snapped out of it also i got kind of bored with with agents,

[44:23] yeah the lack of sleep didn't help but that that fixed itself eventually nature

[44:26] nature has its way to fix that um,

[44:30] Yeah, I don't know. I just found that I can produce a lot of shit now,

[44:34] but the art is actually picking what you actually want to build and build it

[44:38] so well that it actually has value. It actually gets used.

[44:43] There are so many things that you're saying that I would kind of like to pick

[44:46] up on, so I need to get my squirrel brain in check here.

[44:52] You said you like building things for learning. How is that learning experience with AI?

[44:57] Because if I, being realistic, and part of that is that I'm just crazy busy

[45:02] with other stuff, but that is probably one of my concerns.

[45:06] It's like, okay, I used to learn by pain.

[45:10] I've said this on the last episode, but the way that I learned was like,

[45:14] I don't understand this. I forced myself to build this, to just go through the

[45:19] emotion, to understand it, look through the source code or something.

[45:23] And with AI, there's just a very easy way out of that.

[45:27] Yeah, no, you're absolutely right.

[45:32] Great, thanks.

[45:34] Friction and pain is something I also promote as the one method to learn.

[45:39] And obviously, agents take away a lot of the friction and pain.

[45:42] That said, it's also an opportunity. For example, when I learned electronics

[45:46] that was pre-Claude Code that was with Cursor still,

[45:50] um i already knew how to fucking write programs for an MCU like ESP32 or you

[45:56] know i was learning electronics,

[45:59] so i wanted to focus my time on learning that and i still needed some code but

[46:03] i didn't think that writing the code for an mcu would,

[46:06] teach me anything i i've done so many some so much low-level programming in

[46:10] my life i don't i don't care so while learning electronics with microcontrollers as part of the circuit,

[46:17] i wouldn't care about the code at all and the APIs of,

[46:21] ESP-IDF or Arduino or whatever it is.

[46:24] And I would just have cursor or later Claude Code write that code for me because I don't care.

[46:30] I only cared in performance sensitive parts where I would go in and just fix it up.

[46:36] So I use the agent to do stuff that is part of learning where I don't learn anything but,

[46:43] that I still need to do to be able to learn the thing I actually want to learn

[46:46] so there it's great because it removes a part of the friction that doesn't help me learn something,

[46:52] in terms of coding it's hard because i'm so old and i have seen so many things

[46:58] and i don't learn a lot about coding anymore.

[47:01] I i used to read a lot about software design and architecture and learn a lot

[47:07] of different apis and build compilers and blah blah blah i'm kind of tired,

[47:14] i don't think there's a lot in in software that i still.

[47:19] Need to learn at least i have no interest in learning any of the things like

[47:23] um example typescript there is now this big uh effect ts uh hype,

[47:32] I don't fucking care, man. Like, I understand the problem you're trying to solve.

[47:36] The way you're solving it is cute, but it doesn't matter.

[47:40] It's just fucking, it doesn't matter. So previously I would have slurped it

[47:44] up and kind of read all about it, tried it out.

[47:47] I don't, I'm just tired. So,

[47:52] I don't have any advice for how

[47:54] to introduce that friction and pain when learning new things in software.

[47:58] I guess the classical answer is just do it by hand.

[48:02] That is a very important part for people coming into the industry,

[48:05] like focusing on the fundamentals and not getting like too quickly too fast or too quick too fast.

[48:13] Yeah, yeah. I understand what you mean. Like if a junior joins a big corp at the moment.

[48:21] There's a lot of pressure that will not force them but will make it more enticing

[48:27] for them to use agents because first of all as a junior i don't want to fail

[48:30] i don't want to fail i don't want to fail this is scary i'm i now have a job

[48:33] oh my fucking god i have a job for two i do,

[48:36] so now you're resorting to agents to help you be good at your job so nobody

[48:40] fires you or nobody screams at you because you're a stupid junior who doesn't yet know everything,

[48:44] um then the other thing is as a junior i don't know how it currently is but

[48:48] i would assume people who just finished their studies if they do cs or something similar,

[48:56] they probably are quite good with agents already but might lack the fundamentals,

[49:01] because during the formative years they already had a lot of assistance and

[49:07] then the question is did they did they learn how did they learn the fundamentals

[49:10] And to that, I don't have any answer.

[49:14] One thing that I may be a little bit morbidly excited to see,

[49:18] but I think this year is going to be particularly painful for enterprises because

[49:25] there's this drive of like, oh, we need to adopt AI.

[49:27] I mean, the fact that Meta has their token leaderboard or whatever, insane to me.

[49:35] So I think we're going to see an abundance of sloppy software.

[49:43] We see an abundance of companies failing with that miserably for various reasons.

[49:50] So I'm curious to see how this plays out. I hope the outcome will be like,

[49:56] oh shit, there are limitations. That would be a great outcome.

[49:59] With the caveat that I also think that a lot of people don't realize how much

[50:04] lower quality they are actually willing to accept.

[50:08] Like, it's not like software has always been this brilliant star in the sky

[50:13] that's perfect. It's usually garbage.

[50:17] So then...

[50:19] Does it actually hurt if it becomes even more garbage because nobody cares anymore

[50:22] and it stops everything i think for specific,

[50:26] software that might be true that it hurts for other types of software it probably

[50:30] doesn't matter like if you have a TikTok client or an Instagram client on Android and iOS,

[50:36] sure but as long as the videos are playing you don't care if the buttons don't

[50:39] work or if if it takes three presses to to to like a thing you don't care because

[50:45] first of all you don't have anywhere else to go anyways because there's only one TikTok,

[50:50] And ultimately, you're just there to numb your brain.

[50:52] So I think there's a lot of software where it actually doesn't matter.

[50:56] But ultimately, I do hope that this is just one of these pendulum things where

[51:00] the industry is going like, whoa, what the fuck, we need to do this?

[51:03] Like with monolith versus microservices and all the garbage.

[51:07] Just on a way more, like, just like on a.

[51:12] Yeah. I have my thoughts on microservices too, so.

[51:17] There's a little time and place for everything but first i think the industry

[51:21] always has to swing in one extreme direction before we kind of end up at the

[51:26] middle and my hope is that this will actually play out like that just fine as well.

[51:31] The interesting conversation that we haven't really touched on i have yet to

[51:34] meet a developer who works in a code base and says oh this is perfect there's

[51:39] nothing that i could even optimize because we all operate within constraints

[51:42] and usually time is a very valid constraint

[51:45] budget is another one of those

[51:48] um so no code base is perfect already so

[51:53] the question is then also okay what are we aiming for are we aiming to maintaining

[51:56] the quality standard a lot of companies businesses can probably drop a couple

[52:01] percent points in terms of quality

[52:02] not that you can measure quality that easily but you know what i mean

[52:05] I mean we can measure it in uptime right and we've dropped quite a bit of of decimal places there.

[52:11] Tell me tell me how you feel about GitHub.

[52:15] To be honest, GitHub is in a very strange situation.

[52:20] Clankers are now submitting issues and pull requests en masse,

[52:24] creating repositories en masse without the human knowing, actually,

[52:29] that they're doing it, and GitHub gets the brunt of that and needs to just manage their info.

[52:35] It's really hard. So I don't think GitHub's outages are related to AI,

[52:39] although I heard some things through the grapevine.

[52:44] I think, could Microsoft probably maintain GitHub a little bit better as a product?

[52:48] Probably, yes. uh does it seem a little abandoned here and there also

[52:52] Yes i mean the guy who was the head of GitHub he was just fucking off into the sunset and was like,

[52:59] i'm now head of i don't know xbox whatever he didn't fucking care he he was

[53:03] like absent for months and shit was hitting the wall and he's like i exist i

[53:08] get a lot of money i don't know what the fuck i'm doing that's not good,

[53:12] um but the GitHub people themselves are actually very talented i think what's

[53:16] still killing them is the move to that since they started doing that move,

[53:20] you can actually look at the outage history and you see once they started going

[53:24] to Asia or our sewer or whatever it's called,

[53:29] it's not been pretty.

[53:32] So one thing I would be curious to touch on with you and you can tell me to go fuck myself.

[53:37] But you have a four year old kid, if I remember correctly, which is interesting

[53:41] because I have a three year old, so three and a half. So very in a very similar spot there.

[53:47] And I'm wondering two things.

[53:51] So, A, you have this massively successful open source project while also being involved with Earendil.

[53:59] How does this impact your personal life, positively and negatively?

[54:04] Let's say Q1 of 2026 was hard. Just because, not so much because of Earendil,

[54:10] actually. It's just a lot of companies and people wanted to talk to me all of a sudden.

[54:15] And that was a lot of calls like a lot of calls

[54:19] and that meant that i had to see my son i did less than i'm used to and that

[54:24] kind of sucks um since i've joined Earendil my work pace and the number of calls

[54:29] did decrease slightly not by a lot,

[54:33] but i've since found i've since found ways to manage um manage my free time better.

[54:39] Well that's good glad you hear that

[54:41] I have a calendar now i never had a calendar in my life i hate the fucking calendar yeah.

[54:46] What i could not function without my calendar

[54:49] No like anything that's important people will come up to you and remind you

[54:52] that something important is gonna happen it always works for me the world is my calendar.

[55:00] No i see i you're like outsourcing your calendar i like that

[55:03] No honestly like i have so much garbage on my calendar now that i know is could

[55:07] have been an email uh and i'm not talking about partners or Earendil,

[55:12] disclaimer um i like if i if i didn't have a calendar i it would probably all just be fine,

[55:21] it's just the calendar kind of gives me a structure where i can paint in the

[55:25] time that i do worky parts and time that i do the non-worky parts.

[55:30] Yeah this this is really important to me at least because so so i'm also in

[55:35] a very fortunate situation that we have a nanny who's taking care of the kids

[55:39] at home. So if I go grab a coffee or something, I can at least like hang out with them for a minute.

[55:43] And we also have like dedicated offices where they know, okay,

[55:47] Papa is working when he's in there. So this helps me very much be like,

[55:52] present dad when i'm downstairs where it's like okay i'm working when i'm upstairs

[55:56] and the nanny is here for a certain amount of time because we pay her by the

[55:59] hour obviously so it's very easy for me to be like ah okay that mode um

[56:05] but i'm was the did the

[56:11] success of pi except for like the calls aspect positively impact your work life

[56:20] balance or rather negatively

[56:23] Negatively no question about that i i've been fun employed for a very long time let's say uh,

[56:31] and uh i i used to be a free spirit and now i don't feel like a free spirit

[56:36] anymore because there are certain expectations,

[56:39] coming from a lot of people and i'm not talking about Earendil or or anyone with

[56:42] Earendil it's just once you put out something public like that and there's a

[56:46] lot of users, you can just fuck off into the sunset unless you really don't care about people.

[56:51] And sadly, apart from probably having something like OCD when it comes to problems

[56:57] and keeping them ahead, I also fucking like people. And that's a terrible combination

[57:02] for your work-life balance.

[57:05] Other than i know that Earendil um armin and others are also contributing to pi

[57:10] but do you have like a whole team

[57:12] that works on it or is this again you're running the show kind of thing

[57:15] Uh i'm calling the shots but i try to delegate and armin's become the best junior i've ever had um,

[57:25] so i can delegate a lot to him which is very nice but the reason for that is

[57:28] also that he should eventually be able to take on my role as well should should something happen to me,

[57:34] um apart from him there's a handful of people that have been with pi way earlier

[57:39] than the rest of the Earendil team uh just external contributors like and um.

[57:45] Um god damn it my brain uh Alio, he's a French developer is really really great

[57:51] he uses a lot of open weights models to do pi work it's always amazing to see uh and um,

[57:58] No, Nico Balin, a Canadian developer who has done a lot of amazing Pi extensions.

[58:06] Then there's mrexodia, who's actually been the developer of x64dbg,

[58:11] one of my most beloved reverse engineering tools. And he just showed

[58:16] up and started contributing.

[58:18] ParLens, lots of great people, old guard people, people like me who've seen

[58:23] some shit contributing to Pi.

[58:25] So that's great but most of that is on and off and ultimately in open source

[58:30] at least at this stage of an open source project there is usually only one or

[58:34] two people are actually calling the shots and coordinating things,

[58:38] because most people aren't reliable enough that you can say monday nine to five,

[58:43] uh sorry monday to friday nine to five you're working on this and this issue i i,

[58:48] i can't delegate like i could in a in a company so uh.

[58:52] Let's slowly wrap things up one thing i am still curious to talk to you.

[58:56] You have spent recently a lot of time on refactoring Pi.

[59:03] And maybe you have already talked about this more publicly and I just completely

[59:07] missed it, which would a little bit surprise me because I feel a little bit

[59:10] like a stalk on your Twitter timeline.

[59:14] I've seen things. No, I'm just kidding.

[59:18] A, where's the Refactoring coming from? B, what are you trying to get out of the Refactoring?

[59:23] Sure so you can actually follow it on the main branch because i refactor in

[59:28] main you motherfuckers i don't care about you and stability,

[59:32] um so pi obviously also has a lot of historic uh baggage it was never intended

[59:37] for public consumption uh quite a lot of parts are actually vibe coded,

[59:41] the html export that's available i have not looked at a single line of code

[59:46] for that garbage i don't care as long as the html renders when you export a

[59:50] session to html fine great,

[59:53] um there are a lot of handwritten things still because some parts of pi actually

[59:58] predate my use of agents um,

[1:00:01] and those are pretty solid but uh with,

[1:00:05] more time passing there's new things you want to try out and,

[1:00:10] a terminal user interface only takes it this far so one reason for the refactor

[1:00:14] is that i also want to expand into other types of user interfaces more easily,

[1:00:19] that is that is possible already with the existing sdk if you ignore extensions,

[1:00:25] but since pi is mostly a plug-in thingy i need to find a way how to make third-party

[1:00:32] extensions also work on the web for example or at least with.

[1:00:37] So that's one part of the refactor.

[1:00:39] The other part of the refactor is about remote ability.

[1:00:42] That is, I want to be able to run one Pi session on this machine and connect

[1:00:46] to it from another machine.

[1:00:48] And again, this could be possible already with the existing SDK.

[1:00:51] It's just not as clean as I'd like it to be, specifically with respect to durability

[1:00:57] and observability and all of that stuff you'd like to have if you can remote into agents.

[1:01:03] And yeah, the durability and observability are the other big parts that I want to tackle.

[1:01:09] And finally, I want to be able to use Pi's SDK and just deploy agents on Cloudflare

[1:01:15] workers or on Vercel and blah, blah.

[1:01:17] I want the agents itself to be adaptable for any kind of environment,

[1:01:22] not just a local computer with a bash, but basically anything.

[1:01:27] And again, this could already be possible with the current thing,

[1:01:30] but it can be so much nicer.

[1:01:32] Do you have a timeline in mind for yourself when you would like to accomplish

[1:01:37] that and i mean like ultimately refactoring should never be a done done thing right

[1:01:41] Right yeah so that's also why i'm doing it on main because just today i'm gonna

[1:01:45] start fucking up the Pi AI package so that the most lowest of packages that

[1:01:49] talks to providers and and.

[1:01:53] Transforms the context for the different provider formats and stuff like that

[1:01:56] so i'm gonna fuck that up tonight um and this is the reason why Yeah,

[1:02:01] and this is why I'm working on main.

[1:02:04] The new harness is contained in the agent package, and the coding agent package

[1:02:08] doesn't use the new harness yet, but piece by piece I will start switching that out.

[1:02:13] So then you will have a Pi that is using all the new infrastructure below it,

[1:02:19] but you still don't notice it, and all the extensions will still work.

[1:02:22] I hope to be able to be done with that in a week or two.

[1:02:26] It's been a slog because I still have a lot of calls, and I still have a lot of issues to try.

[1:02:32] And if I get a single day per week to refactor, then that's already a lot.

[1:02:38] So yeah, maybe a week, maybe two until that state where Pi coding agent itself

[1:02:42] still looks and works like the old Pi coding agent, but all the underlying bullshit

[1:02:47] is now clean and nice and reusable.

[1:02:51] And after that, I would think a couple more weeks to iron out the new extension

[1:02:56] mechanism where an extension has a server-side component and a UI-side component.

[1:03:01] So you have, I don't know, if you think about permission dialogues,

[1:03:05] which aren't built in, you have the server side that then spawns a UI component and the UI component.

[1:03:14] The server doesn't care if it's a Tui component or a web component or a native

[1:03:18] Android component or whatever, just says, show this component with this name

[1:03:23] in the UI and give me the result.

[1:03:26] That's basically it.

[1:03:27] You reminded me, so we're running now over because of you and what you're saying.

[1:03:32] I wanted to ask you why Pi is, as far as I'm aware, the only agent that runs YOLO mode by default.

[1:03:41] Do you think that tapping yes in the dialogue that asks you if the next operation...

[1:03:45] Oh, no, I think, I'm not saying you're wrong. I never said you're wrong.

[1:03:50] My thing is this. By telling people, this is YOLO mode, it's dangerous,

[1:03:53] you better think about this.

[1:03:55] I actually make people think about that. I actually hope to make people think about that.

[1:04:02] Because initially people come to Pi and they're like, oh, this is garbage because

[1:04:05] it doesn't have permissions. And I'm like, yeah, think about why it doesn't

[1:04:09] have permissions. and then think about how you fix that on your end.

[1:04:12] And the hope there is that people go inside themselves and look for this quiet,

[1:04:16] dark place that's called security awareness and think about real hard how within

[1:04:23] their environment, which is different to my environment,

[1:04:26] they would like to safeguard agentic work.

[1:04:29] And the answer to that is usually, if I don't want the computer that the agent

[1:04:33] is running on to be fucked, I containerize the agent.

[1:04:36] Or at least I containerize the tools the agent uses like read,

[1:04:39] write files, bash, in a container.

[1:04:42] That solves problem one. But I cannot decide this for you.

[1:04:46] I could probably install, could probably bundle something like the sandbox thing

[1:04:51] that Anthropic has or bubble wrap or whatever. But these are incomplete solutions.

[1:04:56] And I do not want, when it comes to security, provide you with an incomplete

[1:05:00] solution that you can fuck up configuring.

[1:05:04] So ideally within the enterprise, and I had a bunch of enterprise people come

[1:05:08] up to me about that, they actually eventually understand and like,

[1:05:11] yeah, this makes total sense because you don't fucking know our environment at Infra.

[1:05:15] Like if you use something like Gondolin, a QEMU thing as the container built

[1:05:20] in, this wouldn't work in our infrastructure because we don't have hardware

[1:05:23] virtualization for blah blah blah. So yeah.

[1:05:27] That's why that's not in there. Because I think what exists in Codex and Cloud

[1:05:30] Code is mostly security theater.

[1:05:32] It is now also, I mean, Claude Code now does what? It asks an LLM if a bash command is safe or not.

[1:05:39] In auto mode. Is that good? I don't think that's good.

[1:05:44] I'm curious to see, because I think like a couple weeks ago,

[1:05:48] Peter Steinberger's token consumptions made it online with like 1.3 million a month.

[1:05:55] Yeah, I don't even know.

[1:05:57] Good for him. No criticism there. And the thing that I thought was really interesting

[1:06:02] in that conversation is that he shared some of the tools that they integrated

[1:06:06] as automations for managing

[1:06:09] PRs and like the level of or the frequency of tickets that they get.

[1:06:14] You kind of alluded to the fact that you're doing that to some extent manually,

[1:06:19] but you also online talked about the fact that you declare PR vacation every

[1:06:24] so often, which I thought was an interesting approach.

[1:06:27] So talk me through how your open source process.

[1:06:33] So I've been in open source for 20 years and I had two other big projects in

[1:06:36] that space, so I know my way around.

[1:06:38] Previously, pre-agent, it would take people a lot of effort and time to create

[1:06:43] a pull request because they would have to understand everything with their human

[1:06:47] brain and write the code with their human hands.

[1:06:49] Nowadays, people would just ask their clanker to send a PR to fix a thing they think is broken in Pi.

[1:06:54] Usually, the results of that are really shitty and not reusable,

[1:06:58] and often they don't even identify something that's actually broken.

[1:07:02] It's usually just user error.

[1:07:04] So now what happens is, instead of getting like one or two PRs per week for

[1:07:09] a very successful pre-agent open source project, I get 50 to 60 PRs per day by clankers.

[1:07:16] And each PR has a description that is kind of like a full Harry Potter book.

[1:07:22] And then usually has about 10 to 1,000 file changes, depending on how the clanker felt.

[1:07:32] So what are you going to do with that? The default position is,

[1:07:35] you now declare every pull request garbage and auto-close it.

[1:07:40] So, how do I get meaningful pull requests? Well, you ask people to first write

[1:07:46] an issue in their human voice.

[1:07:50] No longer than a screen. And tell me exactly what it is you want to do and why

[1:07:54] you want to do it. And then I tell you, okay, that's good. Now you can send

[1:07:57] a PR. You have proven that you're human.

[1:07:59] You've proven that you understand the problem. And you've proven that you understand the solution.

[1:08:04] And once I get that, I type, looks good to me, and a little GitHub workflow

[1:08:09] triggers that will put them in a file that says this account on GitHub can now

[1:08:12] open prs without them being autoclosed,

[1:08:15] and that's worked brilliantly because now i'm back to high quality prs that i used to use,

[1:08:21] that i used to get pre-clanker,

[1:08:24] um and i don't see the clanker prs anymore what i do see though is the issues

[1:08:29] because the issues i already autoclosed the issues um but that's mostly just

[1:08:34] for visual reasons um i still every day,

[1:08:38] go to the issue tracker to the closed issues find the issue that's labeled last

[1:08:42] read that's that's kind of like the marker up until which either me or armin have processed issues,

[1:08:50] and then i painstakingly read through 30 to 60 issues that have been submitted

[1:08:54] in the last whatever 12 or 24 hours and identify is this clanker is this not clanker,

[1:09:00] is it a good issue is it not a good issue and then i reopen the issues that

[1:09:05] are worth it and out of this like my last triage run was two days ago because

[1:09:08] thankfully armin is not doing that as well.

[1:09:12] I i think i ran through 50 issues and two survived two issues got opened out of 50 closed issues.

[1:09:20] But it works i mean i spent about half an hour going for 50 issues because most

[1:09:25] are very quickly to identify as garbage so that's not that's not hard,

[1:09:31] it sucks that i have to do it but it's not that bad for Peter and OpenClaw

[1:09:35] the scale is just orders of magnitude bigger and my version my my method would

[1:09:43] not work for that at all no chance,

[1:09:47] So that is why he is trying to combat that with automated tools.

[1:09:50] Actually, earlier in February, I wrote some things for the OpenClaw team,

[1:09:57] to visualize issues in the 3D space and be able to select clusters of issues

[1:10:02] that are very, very likely the exact same issue,

[1:10:07] just to bulk select them and close them and replace them with a summary of that cluster of issues.

[1:10:13] Um but that still didn't work because the number of issues just exploded and and even with that

[1:10:20] where you can select 50 issues that are the same and just say this is not one

[1:10:23] issue even with that they couldn't handle it so now peter's very aggressive

[1:10:25] in automating as much as possible and that is he's kind of living in the future.

[1:10:31] I i think it's very interesting to hear him talk and like his experiments and

[1:10:36] also experience i'm very fascinated by some of the things

[1:10:39] i still don't believe that most people or companies are anywhere near that

[1:10:48] No um Anthropic probably is with Claude Code it's probably.

[1:10:52] Very similar but i mean if i would now go so i uh you i worked in germany so

[1:10:59] i worked for energy and health i worked for siemens for a while oh

[1:11:01] Yeah that's not gonna fly there at.

[1:11:03] All if i would suggest i'm like hey how do you feel about like spending 1.3

[1:11:07] million for a development team of three people, I don't think they would be super amused by that.

[1:11:13] Yeah, I mean,

[1:11:17] it's hard to say. So first of all, the 1 million is API pricing, right?

[1:11:21] And if you're working for OpenAI, API pricing,

[1:11:28] is not really what OpenAI paid for Peter's work for that month. Let's put it that way.

[1:11:33] Okay but even if you assumed they had a margin of 90 percent and the actual

[1:11:37] cost was a hundred thousand dollars for that one month then the question is was it worth the money,

[1:11:45] And I cannot speak to that for OpenClaw at all.

[1:11:49] Like I would trust Peter enough to

[1:11:51] know what he's doing and that money was probably well spent in terms of,

[1:11:56] I'm not sure how far along he is with kind of automating a lot of this stuff,

[1:12:00] but I would assume a lot of that money was spent on building the automation infrastructure.

[1:12:04] So in the future, they do not have to spend as much anymore on that kind of thing.

[1:12:09] But again, I don't know enough about OpenClaw too.

[1:12:12] One thing you touched on though is, again, interesting to me because I think,

[1:12:16] I mean, we all know that the cost that we have right now for tokens is going to increase long-term.

[1:12:22] Long-term, hard to say, but at least like in some future there's a price hike going to come.

[1:12:28] So the subscription, yes.

[1:12:31] Yes.

[1:12:33] For the pay-as-you-go API tokens, you also think that there's going to be more price hikes?

[1:12:38] I'm not disputing that, I'm just asking.

[1:12:40] I'm not sure how...

[1:12:44] I have some trust issues with all of them, to be super honest.

[1:12:46] Yeah, me too. So I could still consider there like some kind of marketing budget

[1:12:52] being allocated to even those where you say like, okay, adoption is still important to us.

[1:12:57] We want to be a little bit more financially responsible, but still...

[1:13:00] I don't know about that, but like, I mean, subscription unknown fact that those

[1:13:03] are subsidized tokens, left and right.

[1:13:08] I think once those subscription costs are going to increase companies are going

[1:13:12] to question more at the ROI of certain initiatives

[1:13:16] and endeavors and usages of ai so i'm wondering and again it partially brings

[1:13:21] up the conversation around workflows and stuff like that but i would not be

[1:13:24] surprised if we see a future and this is just completely me speculating

[1:13:29] um where different seniority levels get a different budget allocation for AI.

[1:13:35] Oh, that's already the case. I know companies when this is already the case. Yeah.

[1:13:40] Same. But at the same time, then,

[1:13:44] if there's also the conversation, because right now it feels a little bit like

[1:13:48] an unlimited pot of gold that a lot of companies allocate to AI,

[1:13:52] which I think, to some extent, makes sense for people to experiment and get like

[1:13:56] get into the AI app psychosis and pass it.

[1:14:02] But with that, when we start the conversation of like, oh, do you really need

[1:14:06] to use Opus for centering that div now? Probably not.

[1:14:11] And I do that myself. I'm too lazy to switch models. So I usually pick one that

[1:14:15] works for me reliably. I usually use GPT 5.5 and call it a day.

[1:14:23] I also don't dramatically mess with different reasoning levels so

[1:14:28] I think that might be biased, but I think that's the case for most developers,

[1:14:33] but I don't think that would be the case long term just for price sensitivity. Thoughts?

[1:14:41] Yeah, I don't know. I mean, we were promised lower token pricing for the past

[1:14:46] two years, and I do not see that happening for the frontier models.

[1:14:50] Like the last couple of releases always increased pricing.

[1:14:54] Or they changed the tokenizer so that now for the same input text,

[1:14:59] they just count more tokens.

[1:15:02] Which is too far, extra sneaky. Yeah, same token price, but it's just like 1.4

[1:15:08] times more tokens for the same input.

[1:15:12] I mean, there's technical reasons why you want to switch out your tokenizer.

[1:15:16] But it's also kind of, I don't know, suspicious, but specifically pre-IPO.

[1:15:24] The thing that boggles my mind is you're marketing these things to developers right now because like

[1:15:30] They stopped marketing to developers they are now marketing to CIOs and enterprises,

[1:15:37] they don't care about developers anymore because you know what happened they

[1:15:39] marketed to developers for the past year,

[1:15:42] 2024, 2025 basically, from April to October they got all the training data for them in exchange for,

[1:15:48] paying Anthropic $200 for that privilege then they improved the models with

[1:15:53] that data then over Christmas they gave everybody ai psychosis in form of free

[1:15:58] coupons that you can share with your friends to try out Claude Code during Christmas break,

[1:16:03] and then in january every came everybody came back to the office and said,

[1:16:07] boss we need to buy the Claudes all the Claudes and then all the companies started

[1:16:11] buying the Claudes and this is what happened and at that point where the companies

[1:16:15] start requesting more Claudes,

[1:16:17] Anthropic doesn't have to cater to the developers anymore and you can see

[1:16:21] it in all their actions since February.

[1:16:24] Yeah, I think the token prices will not decrease.

[1:16:28] At least not from frontier models. But what's interesting is if you look at

[1:16:31] the token prices for open weights models at similar sizes than what's been published

[1:16:37] about the sizes of closed,

[1:16:40] frontier models, there's a lot of margin those motherfuckers make on inference.

[1:16:45] That's true.

[1:16:47] So yeah, I don't know.

[1:16:52] Thank you so much for joining me for this. I had a fantastic time being grumpy

[1:16:56] with you about certain things that I'm going to do right now.

[1:16:58] The grumpy show.

[1:17:01] Show me name this. Thank you so much. Really appreciate you.

[1:17:05] And thank you so much for doing the work that you're doing on Pi.

[1:17:08] It's definitely one of the agents.

[1:17:10] Well, I like using it myself. So thank you.

[1:17:15] Thanks for having me. And yeah, best of luck with the tokens and stuff.

[1:17:21] All right see you next time bye