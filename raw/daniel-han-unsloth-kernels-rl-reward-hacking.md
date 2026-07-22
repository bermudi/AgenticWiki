---
type: youtube
url: https://www.youtube.com/watch?v=uIiA6DquRiE&t=6472s
title: "Special Topics in Kernels, RL, Reward Hacking in Agents — Daniel Han, Unsloth"
channel: AI Engineer
date_saved: 2026-07-22T17:41:39.874Z
---

# Special Topics in Kernels, RL, Reward Hacking in Agents — Daniel Han, Unsloth

[0:13] Hello everyone. Um yeah, thanks so much

[0:15] for coming today. Much appreciated. Um

[0:18] yes, I'm Daniel. I'm from Anslaf. My

[0:20] brother is also here today. Um but yeah,

[0:23] like you know, thanks for coming. Um,

[0:26] so for you folks who don't know us, um,

[0:28] so we actually, you know, we're one of

[0:30] the largest distributors of language

[0:32] models and diffusion models as well. So

[0:33] we don't just do language models. We

[0:35] upload our models to hugging face. Um,

[0:37] and you know, we're on the I think we're

[0:39] number 10 or something on the Oh, no, I

[0:41] don't I don't remember. But anyways,

[0:43] we're on the list of the top

[0:44] organizations on Hugging Face. Um, we

[0:46] have over 300 million total downloads.

[0:48] Um, so definitely check us out on that.

[0:50] Um you can run like you know Deepseek,

[0:52] GLM, many other models and we quantize

[0:54] them down using dynamic quantization. Um

[0:57] so you can run them on your local

[0:58] computer.

[1:00] Um we also do many bug fixes for open

[1:02] source models. Um so you know we you

[1:05] know fix many bugs in you know OpenAI's

[1:07] GPUs um you know Meta's models um

[1:10] Google's models deepseas many other

[1:12] models we fix bugs in them. Um and so

[1:14] like you know they have many issues

[1:16] sometimes and then we post about them on

[1:17] Twitter. um you know we post about our

[1:20] findings um so you know m most of the

[1:23] open source models that you probably

[1:24] guys have used um are most likely fixed

[1:27] by us um and yeah like we collaborate

[1:29] with everyone in the entire world um on

[1:31] you know model releases um yeah we also

[1:34] collaborate with hardware providers and

[1:36] you know we really appreciate the

[1:37] collaborations with everyone

[1:40] we also don't just do model fixes and

[1:42] bug you know bugs we also introduce new

[1:44] features and we also like you know do

[1:46] fixes for the entire trading stack. Um

[1:48] for example, we introduced something

[1:50] called async gradient checkpointing

[1:52] which is used by many organizations. Um

[1:54] we also introduced flex attention which

[1:56] is used by many folks. Um and we also

[1:58] fixed a gradient accumulation bug fix um

[2:00] which increased accuracy by 1 to 3% um

[2:03] across the entire training stack. Um so

[2:05] we don't just like you know do bug fixes

[2:07] for models um it's also like you know

[2:09] whole training stack um fixes and stuff

[2:12] like that.

[2:14] So today, you know, the workshop is

[2:16] quite long. Um, so there will be

[2:18] multiple sections in the workshop. Um,

[2:20] and so after each section, anyone can

[2:22] ask a question. Um, and so, you know,

[2:24] please, I guess, if I'm not sure if

[2:26] there's a microphone, but if you could

[2:27] raise your voice and you ask a question,

[2:29] you know, I'm more than happy to answer

[2:30] them. Um, but you know, the first

[2:32] section we're going to be talking about

[2:34] is the state of AI. So, where is

[2:36] currently language models, AI models,

[2:38] where are they at currently? Um

[2:42] so I'm not sure if everyone knows the

[2:43] meter plot. Um so this meter plot shows

[2:46] the time horizon of uh models. Um if you

[2:49] can you know every single task if it

[2:51] takes a human 16 hours can a model you

[2:54] know finish that task. Um and you can

[2:57] see on this plot you know cloud mythos

[3:00] you know preview is very good. It can do

[3:03] tasks that humans can do that take you

[3:05] know human 16 hours. Um you know opus

[3:07] 4.6 is also there. you know all the

[3:09] other models are also there and so you

[3:11] know this plot is very good because it

[3:13] symbolizes the AI models are getting

[3:15] better and better and better over time

[3:18] you know recently with the launch of you

[3:20] know GPD 5.6

[3:22] um you know just well their preview

[3:24] model um you know just on Friday um you

[3:27] know I put the plot so they didn't so me

[3:29] didn't actually update their plot um

[3:31] because they said that the results were

[3:32] not trustworthy enough um but you know I

[3:35] just put it on the plot um and so you

[3:37] can see that GBD 5.6 you know is around

[3:40] you know opus 4.6 sixth level I guess

[3:42] with large confidence bounds um so it's

[3:45] very you know uncertain about the

[3:47] capabilities of the model um however if

[3:49] you include cheating so if you include

[3:52] that the model sometimes likes to cheat

[3:54] on some of the tasks then it actually

[3:56] goes to 270 hours um so we're directly

[3:59] and you know if you look at the y-axis I

[4:01] actually did a disjoint graph um so the

[4:04] y-axis is 50 hours skipped to 250 hours

[4:08] um so if you can imagine the graph is

[4:10] actually very skewed Um when I like made

[4:12] the graph, um GBD 5.6 was like a very

[4:14] big outlier. Um so I had to like

[4:16] compress the graph. Um but this only you

[4:19] know this graph only works if you

[4:21] consider that GBD 5.6 cheated on some of

[4:23] the tasks. Um and so we'll be talking

[4:25] about you know why AI models cheat and

[4:28] how do we like you know solve these

[4:29] issues. Um but yeah this plot is very

[4:31] useful to showcase the capabilities of

[4:33] these models.

[4:35] So previously this is 50%. you know if

[4:38] you could if a model can complete the

[4:39] task with 50% of the ch you know of the

[4:42] time to 50% accuracy if you want to

[4:44] actually oneshot the model so you just

[4:46] ask the model you know implement X or

[4:48] implement Y um and you want the model to

[4:51] do very well then you want to look at

[4:52] the 80% success rate if you look at the

[4:55] 80% success rate it kind of drops quite

[4:58] a lot um so you can see that previously

[5:01] mythos is around 16 17 hours um now it

[5:05] only can do three hours so if you prompt

[5:07] a model and you want to have like a

[5:09] oneshot example, you know, you just

[5:11] trust the model by just or asking it,

[5:13] you know, implement, I don't know, page

[5:15] rank or something, you know, implement

[5:17] some sort of rag system, you know,

[5:18] fine-tune a model or something like

[5:20] that. Um, it can only do a task that

[5:21] will take a human three hours to do. Um,

[5:23] and so the so that is a problem with AI

[5:26] models. Um, generally speaking, if you

[5:27] want to use AI models very well, you

[5:29] need to prompt it at least like, you

[5:31] know, five times or something. Um and

[5:33] each of those times assuming they're

[5:34] independent um the success rate is much

[5:37] higher if you're prompted many many

[5:39] times right you can't just call the

[5:40] model once and expect it to do work to

[5:42] do well um you need to call it multiple

[5:45] times um and you can also work out the

[5:47] probability of it like succeeding you

[5:49] know if the model is 50% accurate um

[5:51] then it will be 50% failure then it's 1

[5:54] minus 0.5 to the power of five or

[5:56] something like that you know if you do

[5:57] five turns and then your success rate

[5:59] jumps to like 97% or something um so you

[6:01] need call the model at least five times

[6:04] for it to be very effective.

[6:08] So previously these are linear you know

[6:11] this is a linear trend you know on the

[6:14] y-axis it's just it's not you know it's

[6:16] just linear um if we log it you know if

[6:19] we log the y-axis you can see that it's

[6:22] more exponential progress um so it's

[6:25] actually a straight line fit to the

[6:27] entire progress of AI models on the

[6:29] meter time horizon um you know benchmark

[6:31] you can see that you know it's very

[6:32] clear that AI models are getting better

[6:34] and better over time um I als We also

[6:36] added you know GBD 5.6 six with the

[6:38] cheating and no cheating and also claude

[6:41] mythos are you know accentuated that and

[6:43] you can see I you don't need now you

[6:44] don't need to like you know fake the

[6:46] y-axis you know you don't need to do

[6:47] like a disjoint y-axis um if you do that

[6:50] you can see that you know models are

[6:52] getting better over time um and

[6:54] supposedly you know if this trend

[6:56] continues these models will get better

[6:58] and better and better better and much

[7:00] better um yeah so so the question is if

[7:03] the trend continues you know that's the

[7:05] fundamental question Um and it's not

[7:08] just you know one specific task for this

[7:11] benchmark that you can see that models

[7:12] are getting better over time across all

[7:14] benchmarks models are getting better

[7:16] over time right so like you know GPQA

[7:18] diamond you know it's kind of plateau

[7:20] you know it's kind of already saturated

[7:21] as a benchmark but over time you know it

[7:23] does very well you know every single

[7:25] benchmark you see models are getting

[7:27] better right live code bench you know

[7:29] maths algorith maths tests um you know

[7:32] even Tesla's you know you know

[7:34] self-driving I guess is also has like a

[7:36] doubling time of 17 months. Um so every

[7:38] single 17 months the models will get

[7:40] better and better. Um you know double

[7:42] double their capabilities. Um so over

[7:44] time all these models in every single

[7:47] subject you know every single

[7:50] area it will get better. Um so I guess

[7:53] the main question is you know if we

[7:55] assume every single subject every single

[7:57] area the models get 100% like you know

[8:00] approaching 100% accuracy is this AGI?

[8:03] Um so that is one of the fundamental

[8:05] questions that people ask you know if we

[8:06] just get better on benchmarks um is this

[8:10] AGI um what happens if we get better on

[8:12] all benchmarks you know every single

[8:14] benchmark that human humanity has

[8:15] created it just gets better on all of

[8:17] them. Um yeah but so this is a you know

[8:20] very good plot show well I guess chart

[8:23] showing all of the different types of

[8:24] benchmarks and they all get better over

[8:26] time.

[8:28] everyone's favorite I guess artificial

[8:30] intell uh you know artificial analysis

[8:32] benchmark showing you know artificial

[8:34] intelligence getting much much better

[8:35] over time as well you know fable I guess

[8:37] is I guess the best for now um although

[8:41] not everyone can access it currently but

[8:42] anyways it's for now it's the best um

[8:45] and you can see over time that you know

[8:46] these models are getting better over

[8:48] time as well um and you know like this

[8:50] plot showcases um a very useful

[8:53] indication you know like how do we like

[8:55] you know benchmark you know is this

[8:56] benchmark actually good um in terms of

[8:58] like you know showcasing the

[8:59] capabilities of models as well. Um and

[9:01] we'll be also discussing about that as

[9:03] well. Um on the other hand yes models

[9:08] are getting better over time. Um but

[9:09] there are some things which models are

[9:10] not very good at still for example long

[9:12] context is not doing very well. Um so

[9:15] you know most models you might say okay

[9:17] Gemini has 1 million context length. You

[9:18] know GBD has 1 million context length.

[9:20] Claude has 1 million context length. But

[9:22] should you actually use all of the 1

[9:24] million context length? Um so there are

[9:26] actually benchmarks to showcase that if

[9:28] you use for example GBD 5.5 um you know

[9:32] if you use 512 context your accuracy

[9:34] reduces to 50%. Um so if you use you

[9:37] know 512 context you will only remember

[9:40] 50% of the facts that you wrote in the

[9:42] previous context. Um so maybe that's not

[9:44] a good idea to use the full context. Um

[9:47] you can see opus 4.7 um 4.6 4.7 is the

[9:51] very last orange line. Um so at the

[9:54] context length of 256K it goes to 0%. Um

[9:57] so this might be a benchmark flaw. Um so

[10:00] maybe don't trust the benchmark too

[10:02] much. Um but it's good to look at the

[10:03] benchmark overall. You know where is the

[10:05] model's capabilities for long context.

[10:07] Um the blue lines I highlighted are open

[10:10] source models. You know deepseek gl 5.1

[10:13] other models. Green is Google's models.

[10:16] Um but you can see in general you know

[10:18] models are models definitely do degrade

[10:21] over long context. Um so if you you know

[10:23] for example if you set like a you know

[10:25] automatic compaction area I would not

[10:28] suggest you to use all 1 million context

[10:30] maybe maximum 600k or something um and

[10:33] then compact it and then continue your

[10:35] you know coding session um but I would

[10:37] yeah but in general you know this plot

[10:39] shows that long context still has a very

[10:42] long way to go um and if we want to have

[10:44] long context you know capabilities um

[10:48] labs I guess will have a lot of time to

[10:51] fix this problem.

[10:53] Yeah. So another plot is you know just

[10:55] showing open source versus closed

[10:57] source. So open source still has some

[10:59] way to go for this you know long

[11:01] context. Um so open source is blue line

[11:04] and the black lines are like you know

[11:05] closed source models. Um and you can see

[11:07] in general open source does okay but

[11:10] there's definitely much more room for

[11:11] improvement. Um I guess compared to Opus

[11:14] 4.7 it's better. Um but you know maybe

[11:16] this benchmark does need maybe there are

[11:18] some flaws in the benchmark as well. Um

[11:20] yeah, but overall you know this plot

[11:22] shows that long context definitely still

[11:24] has more room for improvement.

[11:28] And also you know like if you looked at

[11:30] the plot previously you know this meter

[11:32] plot um I'm not sure if you can see that

[11:35] before 01 preview there is actually a

[11:38] plateau of performance. Um and so if you

[11:40] can see you know GBD4 to GBD40 there's

[11:43] not that much performance improvement.

[11:45] Um and so this time frame around one

[11:47] year um was when you know the labs were

[11:51] confused on what is next um you know

[11:54] before 01 preview which showed that

[11:55] reasoning was very important they didn't

[11:57] actually know what to pursue next um and

[11:59] so for one year the models kind of

[12:01] plateaued um and so I call this the

[12:03] intelligence plateau the hypothesis that

[12:05] you know you know assume that we never

[12:08] have discovered reasoning

[12:11] then maybe air models would have like

[12:13] plateaued um but because we have

[12:15] discovered reasoning you know we have

[12:16] shown that models can do reasoning

[12:18] capabilities we have continued the trend

[12:20] continuously um and so normally I don't

[12:22] know if this is like luck um or if this

[12:25] is a self fulfilling prophecy um so I

[12:27] don't know if you guys you know the moor

[12:29] law um you know mos law has continued um

[12:32] not because of the law but because

[12:34] people know that it must continue and so

[12:36] people invest money into the resources

[12:38] to make the law continue um and so this

[12:40] kind of like shows that you know we

[12:43] might have been in of the world where

[12:45] models have stopped improving. Um but

[12:47] you know with the launch of 01 preview

[12:49] you know I guess models have went back

[12:51] to trend.

[12:53] In fact I made a plot showcasing you

[12:56] know assuming we did not discover

[12:59] reasoning or 01 preview. Um then the

[13:02] black line was the supposed you know

[13:05] capabilities of the models. You can see

[13:06] I made it into a S shape um like a you

[13:08] know a sigmoid type shape. Um and if you

[13:12] know if we didn't discover reasoning

[13:14] then models definitely will taper off in

[13:16] terms of capabilities right we'll only

[13:17] have a model that's as capable as claw

[13:20] 3.7 sonnet I guess or 01 or something

[13:22] like that um but you know luckily

[13:24] because of reasoning and this new

[13:26] paradigm of scaling you know the green

[13:28] line is the new scaling law um and you

[13:31] can see previously the black line the

[13:33] doubling time was actually around seven

[13:34] months so every single seven months the

[13:36] capabilities of the models double um but

[13:39] now it has shrunk to 3.5 months. So

[13:42] every single 3.5 months you just need to

[13:43] wait 3.5 months and the models will get

[13:46] double better, right? Better by two

[13:48] times. Um and that's quite striking I

[13:51] guess. Um so the main question though is

[13:53] will the green line continue as a

[13:55] straight line? Um that is a fundamental

[13:57] question that labs are still struggling

[13:58] on. you know what happens if the green

[14:00] line again you know the green line again

[14:03] goes as a S shape you know that's

[14:06] possible um but you know we don't

[14:08] actually know if this will happen you

[14:10] know if the green line will continue

[14:11] scaling you know going all the way up to

[14:13] infinity I guess or would it be like an

[14:16] S shape um and this is you know many

[14:18] researchers are you know I guess have

[14:20] sleepless nights you know what is the

[14:22] next you know what is the next thing

[14:23] afterwards after reasoning after 01 you

[14:26] know what is the next thing afterwards

[14:27] um and you know Many researchers will

[14:29] need to like you know I guess think

[14:31] about this. Um yeah but you know this

[14:34] plot is very you know this is one of my

[14:35] favorite plots because it shows that you

[14:37] know AI progress can continue over time

[14:40] with new ideas and innovation.

[14:43] Oh yes. So does anyone have any

[14:45] questions for the first section? Um yes.

[14:48] >> So we came all the way to one trillion

[14:51] right? Do you think the next jump if we

[14:53] need do we need like 10 trillion

[14:56] parameters when we'll see the jump or

[14:58] hardware will be the limitation that

[15:00] >> yes that's a great question. So the

[15:01] question was you know models we're

[15:03] currently at one trillion parameters do

[15:05] we need to go to 10 trillion parameters

[15:07] or more for models to be even more

[15:09] capable? Um so the scaling laws does say

[15:11] that you know if you multiply the

[15:13] parameters and the data size um

[15:15] generally speaking this number if you

[15:17] increase the number you will get the

[15:19] models become more capable. So yes you

[15:21] can increase the parameters by 10 times

[15:23] and in general your performance will

[15:25] increase. Um however the view is there

[15:29] is going to be diminishing returns. Um I

[15:31] feel like you know it's not just the

[15:33] model size times the data set size. It's

[15:35] actually a ratio um some sort of like

[15:37] power law when you multiply them. So you

[15:39] actually get diminishing returns over

[15:41] time. So yes, you're right. If you want

[15:42] to have actually I'm not sure the exact

[15:44] law, but if you want to have double

[15:46] capabilities, you do need to 10 times

[15:48] the parameters. Um and then if you want

[15:49] another double, you have to 10 times it

[15:51] again. So it's 1 to 10 to 100 trillion

[15:55] parameters. um if you want maybe that's

[15:58] not a good way to scale. Um maybe

[16:00] instead you know instead of making a 100

[16:03] trillion parameters some sort of new

[16:05] algorithm or new architecture could

[16:08] solve that problem. Um but you're right

[16:10] like if you're a lab you want to do

[16:13] something easy and so the easiest path

[16:15] is to just make a 10 trillion

[16:16] parameters. Um but I would say like you

[16:18] know maybe a new algorithm will be

[16:22] better. Um yeah

[16:25] any other questions? Yes.

[16:27] >> So you do think that we are approaching

[16:30] the limitation of next token prediction.

[16:33] >> That is a good question. I would say

[16:35] that for next token prediction it's very

[16:38] powerful because you can essentially

[16:41] the human language is extremely powerful

[16:43] and it doesn't have to be human

[16:44] language. It can be you know maths

[16:46] coding you can just predict the next

[16:47] word and in order to predict the next

[16:50] word or token you need to know

[16:52] everything about that token or that word

[16:54] right so like I think IA was talking

[16:56] about like you know Ilia Satska he was

[16:57] saying like you know you need to have

[16:59] you need to make a weld model in the

[17:01] model in order to like predict the next

[17:03] word so I still think next word

[17:05] prediction still has a lot of way to go

[17:07] for example if you see this plot you

[17:08] know if we didn't have reasoning

[17:11] I guess okay maybe it would have

[17:13] plateaued But because we have discovered

[17:15] this new methodology you know reasoning

[17:17] and trying to like scale even more on

[17:19] next word you know next word prediction

[17:21] we have you know went back to trend um I

[17:23] feel like so the main question is if we

[17:25] don't have next word prediction what is

[17:26] next um that is the fundamental question

[17:29] most

[17:31] I mean I'm not sure like you know I'm

[17:33] not certain what's what's the next thing

[17:35] I feel like next word prediction is just

[17:37] extremely powerful because it's very

[17:39] easy to formulate and you can just like

[17:41] you know you can have like you know

[17:43] because attention is very powerful as

[17:45] well. You can have, you know, this

[17:46] special cause of attention mechanism and

[17:48] it's very efficient to train. So, I'm

[17:50] not sure I think the main question is

[17:51] I'm not sure what's next. Um, I guess

[17:54] researchers will like, you know, they're

[17:55] trying to scratch their heads, you know,

[17:57] what is next afterwards? Um,

[18:00] yeah. I I Yeah. Yes.

[18:02] >> Just a follow up on it. Do you feel like

[18:03] we are in the same era like how we

[18:07] attention came out?

[18:09] >> Right. So, attention like we don't know

[18:11] what's next.

[18:16] Yes, that's a fair followup. So, um, you

[18:18] were mentioning how it's kind of like

[18:19] LSTMs or the old AI world. We don't know

[18:21] what's next afterwards. Um, that's a

[18:24] fair point. I feel like

[18:27] so like, you know, previously this

[18:29] example, right? So, after GBD4, it was

[18:32] just pre-training, some, you know,

[18:33] supervised fine tuning, some ROF, you

[18:35] know, some RL um, and they waited one

[18:38] year until 01 preview. So in this one

[18:41] year of fog you know the fog of war we

[18:43] don't know what what was next and so

[18:45] researchers you know were scrambling you

[18:46] know do we do the reasoning process do

[18:49] we make pre-training better do we make

[18:51] the model bigger and bigger and bigger

[18:52] you know they tried all these

[18:53] experiments um and

[18:57] reasoning was the one that won I guess

[18:59] um but I think like I think the main

[19:01] question is is the green trend going to

[19:03] continue at the current time it looks

[19:06] like it's continuing once we see models

[19:08] starting to taper out in intelligence,

[19:10] you know, in capabilities, then we'll go

[19:12] back to the, you know, olden days of

[19:14] like, you know, this one year waiting

[19:16] period. But I think for now, these

[19:17] models seem very powerful. Um,

[19:20] yeah. So, like I'm not sure if this

[19:22] will, I mean, if you look, okay, if you

[19:23] squint at the plot, I guess maybe we're

[19:25] tapering out. Maybe um let's not

[19:28] consider the GBD 5.6 cheating example,

[19:30] right? Let's remove that from the plot.

[19:31] Um, but you can see the GBD 5.6 Mythos,

[19:34] you know, 4.6. They're kind of all I

[19:38] guess they're kind of tapering. Um so

[19:40] maybe as a I mean I don't know if we

[19:42] someone wants to bet on this but you

[19:43] know maybe models have tapered out but

[19:46] we're not sure. So we shall wait a few

[19:47] more months and see. So let's wait 3.5

[19:50] months. If we wait 3.5 months and see

[19:52] the models do not improve then we have

[19:54] tapered out. Um but remember we only

[19:56] need to wait 3.5 months. Um so then this

[19:58] law will fail. In fact, if you wait

[20:00] seven months, if you wait seven months,

[20:01] so double the time and models have, you

[20:04] know, just assume you know that dotted

[20:06] line that if if the models just follow

[20:08] the dotted line, okay, then we have tape

[20:09] it out. And I would agree that, you

[20:11] know, we'll have to design something new

[20:13] in, you know, make some new invention or

[20:15] something like that. Um, but for now,

[20:17] you know, for now looks like it's doing

[20:18] fine. Um, yeah. Okay, next section. Um,

[20:22] so every single section we can have

[20:24] questions, so you can ask as many

[20:25] questions as you like. Um the next

[20:26] section we're going to talk about is

[20:28] open versus closed models. Um so

[20:31] artificial analysis has this very cool

[20:33] plot showcasing the performance of open

[20:35] source. So open source is the blue line.

[20:37] Um so open source is the blue line and

[20:39] closed source models is the black line.

[20:41] Um and you can see that open source does

[20:44] lag. You know open source definitely

[20:46] lags over time. Um another very good

[20:48] benchmark is called the weird ML

[20:50] benchmark. Um this also shows that open

[20:53] source models lag closed source models

[20:55] right the blue line is open source

[20:57] models the green line is closed source

[20:58] models um and you can see over time you

[21:02] know the x-axis is release date of the

[21:05] model and the y-axis is performance and

[21:07] you can see that open source models kind

[21:09] of lag close source models

[21:12] and why the weird ML benchmark I'm not

[21:14] sure if you folks actually know about

[21:15] this why the weird ML benchmark um it

[21:18] seems like the weird ML benchmark is a

[21:20] very good indicator

[21:21] better than other benchmarks and the

[21:23] reason the reason why is you know

[21:25] previously I mentioned you know

[21:27] previously this graph right reasoning

[21:29] the reasoning models are the green line

[21:30] and in the black models are the

[21:32] non-reasoning models and you can see

[21:34] that reasoning models double you know

[21:36] reduce the time of doubling time to 3.5

[21:39] months previously it was 7 months um

[21:42] interestingly on the weird ML benchmark

[21:45] these reasoning models didn't actually

[21:46] do better it didn't actually change the

[21:48] trend um all it did was make slightly

[21:51] better. Um and so this weird ML

[21:53] benchmark seems to be more robust. Um

[21:56] and that is why you know this benchmark

[21:57] is very useful. Um in fact if you go on

[22:00] the Twitter bus um before GLM 5.2 got

[22:03] released um most you know most of the

[22:05] Twitter people said oh you know deepseek

[22:08] you know deepse if you see very if you

[22:09] squint okay I think I have a plot. Oh

[22:11] yes if you squint deepseek and Kimmy are

[22:14] in that little corner over there. um you

[22:16] know deepseek those three models the

[22:18] three whales are deepseek you know flash

[22:20] deepseek pro I think one of them's max

[22:23] mode or something like that um and also

[22:24] Kim's over there as well so before GLM

[22:27] 5.2 two got released, you know, on the

[22:29] Twitter verse, everyone kept saying that

[22:31] open source models are much worse than

[22:32] closed source models, right? They're not

[22:34] lagging, you know, they're not just

[22:35] lagging, they're much worse because of

[22:37] this benchmark. Um,

[22:40] in fact, if you look very closely of the

[22:43] weird ML benchmark, all of the top

[22:45] models are closed source labs, you know,

[22:47] like Fable, you know, GPD 5.5, whatever,

[22:50] you know, all of these are just very,

[22:51] you know, it shows very clear that open

[22:54] source models are not doing very well in

[22:55] terms of this benchmark. um until GPD

[22:58] 5.2 came along um you know number 15 is

[23:01] GPD 5.2 and it shows that actually open

[23:04] source has came back um and GPD 5.2 too

[23:07] kind of shocked the world. Um that you

[23:09] know I guess open source has not died.

[23:11] Um and you know deep yeah so in general

[23:15] this worked very well you know deepse

[23:17] you know GLF2 showed that you know open

[23:19] source does very well still.

[23:23] You can also filter out by country. So

[23:25] by country you can see that the black

[23:27] line is United States you know the US

[23:29] models. Um the dark red line is the

[23:33] Chinese labs. Um and you know there's

[23:35] other labs as well. um you know French,

[23:37] South Korean labs and stuff like that.

[23:39] Um but you know over time it shows that

[23:41] these models um you know the US labs

[23:43] seem to do very well over time. You know

[23:45] they they're always at the frontier and

[23:47] then the Chinese labs like to catch up

[23:48] over time.

[23:52] Previously you know I mentioned you know

[23:53] the um you know the plateau before you

[23:56] know before 01 preview got released. If

[23:58] you actually look at this plot um there

[24:01] is something called the open source

[24:02] draft. Um so after 01 preview got

[24:06] released open source labs did not know

[24:09] how to replicate 01 preview. They have

[24:11] never you know they don't know what is

[24:13] reasoning. So I'm not sure if you okay

[24:15] this is a few years back um but on

[24:16] Twitter you know open kept talking about

[24:18] oh you know 01 preview was extremely

[24:20] powerful um you know every single tweet

[24:22] you see every single day you know they

[24:24] show that 01 preview was very powerful.

[24:26] Um and so for one I think it was six

[24:28] months to eight months um open source

[24:30] models open source labs they got

[24:33] confused on what to do next. Um but then

[24:36] as everyone knows deepseek R1 came along

[24:38] um and they showed that even for open

[24:40] source models you can train these models

[24:42] to do reasoning gpo um reinforcement

[24:45] learning and it does very very well.

[24:48] In fact, if you take this plot, you

[24:50] know, the the black line minus the blue

[24:52] line, if you just minus it, you get this

[24:54] plot. Um, and you can see this is how

[24:56] many months behind open source is. Um,

[24:59] and you know, over time, um, you can see

[25:02] like, you know, after 01 preview got

[25:04] released, um, you know, it kind of

[25:06] skyrocketed. Um, you know, the open

[25:09] source models were very, very lagging in

[25:11] terms of, you know, behind closed source

[25:13] models. Um and so like when Deepseek R1

[25:15] got released then the open source labs

[25:18] knew okay we can also do uh 01 type

[25:21] reasoning. Um and that is why recently

[25:23] you know the the time between closed

[25:26] source labs and open source labs have

[25:28] started decreasing again. Um

[25:31] yeah so this is slightly outdated. This

[25:33] is like May. Um so I think now it's

[25:35] actually four months with the release of

[25:36] GLM 5.2. It's around four months now. Um

[25:39] so open source labs lag behind closed

[25:41] source labs by around four months.

[25:45] There was actually a very nice plot you

[25:46] know doing some sort of regression. So

[25:48] some sort of like trend extrapolation.

[25:50] Um according to this plot um if you

[25:53] extrapolate the trend by December this

[25:55] year open source models will 100% catch

[25:58] up to closed source models by this year

[25:59] December. Um but you know who knows I

[26:03] guess maybe maybe open source maybe we

[26:06] can have an open source model as

[26:08] powerful as the best closed source model

[26:11] by December um you know if this trend

[26:13] continues um so I guess the question is

[26:15] will the trend continue um it's always

[26:16] about will the trend continue um

[26:21] and you know may most of you maybe may

[26:24] know that you know open source some of

[26:26] the open source improvements in

[26:27] technology you know improvements in

[26:29] capabilities are via distillation you

[26:31] know so some of the open source labs

[26:33] what they like to do is they like to

[26:34] call the models you know core the

[26:36] frontier models like opus or GPD and

[26:39] then use the traces to train your model

[26:41] um so this is a common methodology that

[26:44] labs like to do um I wouldn't say this

[26:46] is a bad method um but it is a method

[26:48] that you know some closed source labs

[26:50] like to look down upon you know they

[26:51] like to stop you know their view is you

[26:54] know we should not allow these open

[26:55] source labs to like do this training um

[26:57] and you know get away for free I guess

[27:00] in terms of training cost. Um but you

[27:02] don't actually have to do this approach.

[27:04] Um so most labs when you do distillation

[27:06] there are two different types of

[27:07] approaches. Um the first approach is you

[27:10] need to have the logits. You need to

[27:12] actually have access to the full logs.

[27:14] Um and unfortunately most labs do not

[27:17] actually have that right. So like labs

[27:18] will not give you the full logs. Um

[27:21] instead you only get the reasoning

[27:22] traces that are summarized um and the

[27:25] final output. Um, and so these, you

[27:27] know, these open source labs, they're

[27:28] not just, you know, they're not just

[27:30] training on the, you know, Opus output,

[27:32] right? That's just, that's silly. What

[27:34] they do is they use GRPO or

[27:36] reinforcement learning to recreate the

[27:38] traces. Um, and so because you you have

[27:40] the final output, which is the answer.

[27:42] All you need to do is use GPU and RL to

[27:45] create the reasoning trace

[27:46] automatically. Um, and so that's kind of

[27:48] how they train these models. Um, and so

[27:51] you don't actually need to like access

[27:52] the logits or the weights of the model.

[27:55] um that's not necessary. Um yeah,

[27:59] and you know, one of the most important

[28:01] factors of you know, these large models

[28:03] is, you know, as models get bigger and

[28:05] bigger and bigger, you can't run them on

[28:07] your local device anymore. Um it's

[28:09] extremely complicated to run. Um and so

[28:11] we do something called dynamic

[28:12] quantization where essentially you take

[28:14] a model, you quantize them down to one

[28:17] bit. Um but the trick is you don't

[28:20] quantize every single layer to one bit.

[28:22] you quantize some important layers to 16

[28:25] bit or 8 bit or something like that. Um

[28:28] and so if you quantize the whole model

[28:30] down to one bit you will get 0% accuracy

[28:33] right 0%. Um but the trick is if you do

[28:35] dynamic quantization so if you look on

[28:37] the you know this is a three-bit

[28:39] Deepseek model um a three-bit one you

[28:41] get 75.6% 6% accuracy, a three-bit one.

[28:45] In fact, if you do dynamic one bit, um

[28:47] you get 57% accuracy. Um so we show that

[28:50] you know if you do something called

[28:51] dynamic quantization where you quantize

[28:53] the model down smartly, you can recover

[28:56] accuracy. Um and this methodology will

[28:58] become even more important when models

[29:00] get larger and larger and larger and

[29:01] larger.

[29:04] if you plot the paro you know efficiency

[29:07] um there if you don't do dynamic if you

[29:08] do you know some other dynamic

[29:11] quantization methods it does okay um but

[29:13] we showed that if you smartly choose the

[29:15] layers it does even better

[29:17] um I'm not sure if you folks have

[29:19] followed but GLM 5.2 we also released

[29:21] dynamic quantizations for that we showed

[29:23] that GLM 5.2 2 can quantize very well.

[29:25] So if you look I think this is oh this

[29:27] is an animation. Oh it works. Um but yes

[29:30] you can show the animation you you can

[29:31] see the animation a one bit GLM 5.2

[29:34] model and this is one bit um and the one

[29:37] bit model is literally 86% smaller. Um

[29:42] so it's 86% smaller than the full 1.5

[29:45] terabytes. Um and it still managed to do

[29:48] very well on one of the prompts. Um so

[29:50] it shows that the models are not dumb.

[29:52] Right? If you make the model 86%

[29:54] smaller, it does not get 86% dumber. Um,

[29:58] it only gets 14% less dumb. Um, and so

[30:01] it shows that, you know, if you do

[30:03] special tricks to compress the model,

[30:06] the model still works very well. Um, and

[30:08] we also compared to Opus, you know, we

[30:10] compared to Opus 4.8, we compared to GBD

[30:13] 5.5. And also, you have to notice that

[30:17] for G 5.2, I use high reasoning mode.

[30:20] You know, for Opus, it's extra high. And

[30:22] for you know GPD 5.5 is also extra high.

[30:25] Um and so like you know there are

[30:26] different reasoning modes as well which

[30:28] we can also um see. Um and all of these

[30:31] are oneshot um so we do not like prompt

[30:32] the model like you know 50 times or

[30:34] something. Um this is just one shot

[30:37] directly.

[30:39] Okay so the next I guess the open source

[30:42] versus close source section is done. I

[30:44] guess any other questions?

[30:47] Yes. Um so the question was which parts

[30:49] of the model do we quantize to lower

[30:51] bits versus higher precision. Um so in

[30:54] general um we did actually a lot of

[30:56] research on this. So if you look at the

[30:58] quen the quen 3.5 architecture there are

[31:01] some layers which is the linear

[31:02] attention layers. Um the linear

[31:04] attention layers should never be

[31:06] quantized. If you quantize the linear

[31:08] attention layers down you will

[31:10] definitely suffer in long context. Um so

[31:12] in general the linear attention layers

[31:15] need to be left in 8 bit or 16 bit. Um

[31:18] that's for example um another like if

[31:21] you look at the model layers um some

[31:23] layers can be quantized down heavily to

[31:26] one bit. Um and the reason why is

[31:28] because these layers are kind of like

[31:30] filler layers. Um and so they don't

[31:32] actually do anything. Um and in order to

[31:35] check whether a layer does something or

[31:37] not, you do need some sort of

[31:38] collaboration data set. So you need you

[31:40] need to have some sort of like

[31:41] representative data and pass it into the

[31:44] model um and you can get you can get the

[31:48] um outputs after each layer and then you

[31:50] can see okay does this model at this

[31:53] specific layer you know does it change

[31:55] that much um and if it doesn't change

[31:57] that much okay maybe just quantize a

[31:58] layer to one bed um but if it does

[32:00] change dramatically then you need to be

[32:02] careful um you you cannot quantize that

[32:04] down to like one bed or whatever um so

[32:06] there are actually many we actually

[32:08] publish a lot of like blog

[32:10] research on this. Um we show I think

[32:12] there was we also show for example you

[32:14] cannot quantize the vision layers down.

[32:16] If you quantize the vision layers down

[32:19] you will make the model really bad. Um

[32:21] if you give it a you know if you give it

[32:22] a picture of a train it will say it

[32:24] looks like a beach for example. Um and

[32:27] so it's you should never quantize the

[32:29] vision layers, the audio layers. Um and

[32:32] only the language the language model

[32:34] layers you can like quantize. Um but

[32:36] there are many tricks in order to do

[32:38] that. Um yeah

[32:41] >> correct. So the question was if you do

[32:42] distillation um you you might have done

[32:46] worse on other topics um but you know

[32:48] only if you for example if you just do

[32:50] coding it will just do good encoding and

[32:52] then the rest gets very dumb. Um so

[32:54] that's a fair point. Um so I think that

[32:56] the main trick is you will need to do

[32:59] many many many examples. You will call

[33:01] the model like you know 10 million

[33:02] times. Um and so like the trick is once

[33:05] you call the middle model 10 million

[33:06] times with high diversity of questions

[33:10] in general um by using the pre-training

[33:12] argument um the model will do well on

[33:15] other tasks. Um so the reason why

[33:17] pre-training does very well um is

[33:19] because it has learned so many tasks

[33:22] that it can interpolate the missing

[33:24] holes. Um for example, if you just train

[33:26] if you just pre-train a model with just

[33:28] maths questions um assume you do only

[33:31] maths. Okay, maybe it's not going to do

[33:33] very well, right? And it's not going to

[33:34] do very well on every other task. But

[33:36] the trick of pre-training is it does

[33:38] maths, coding, law, you know, every

[33:41] single imag, you know, every single

[33:43] topic you can imagine. And the trick is

[33:45] because it has so much knowledge, it

[33:47] feels the holes of the things that it

[33:49] doesn't know. Um, and so for

[33:50] distillation, you also need to do the

[33:52] same approach. You need to sample, you

[33:55] need to sample well. Um so for example

[33:57] instead of doing 10 trillion tokens

[33:59] sample you know like 1% um and then call

[34:02] the model. Um yeah so that's kind of how

[34:05] the labs are doing that. Um that is a

[34:07] very good question. So instead of doing

[34:08] one big quantization can you instead

[34:10] prune the model like you know delete

[34:12] some layers entirely. Um so in general

[34:16] from our research pruning does work.

[34:18] There is a very big problem though. You

[34:20] need to retrain the model. you need to

[34:23] continuously train a model after pruning

[34:25] because you have deleted an entire

[34:27] layer. Um and so if you delete an entire

[34:29] layer, you will need to do like you know

[34:31] qat or further fine-tuning to push the

[34:35] other to push the other weights to have

[34:37] more knowledge. So that is the only

[34:39] problem where if you delete layers um if

[34:42] you don't delete layers when you do you

[34:44] know dynamic dynamic quantization it's

[34:46] called post training quantization. So

[34:48] PTQ you do not need to do any training

[34:50] at all. if you do you know quantization

[34:53] um but if you do prove the layers you do

[34:56] need to train um so that is one of the

[34:57] problems um yeah

[35:00] yes that's a great question so the

[35:02] question was you know because open

[35:04] source labs you know they use closed

[35:05] source models the gap will never

[35:08] actually go to zero um and so I

[35:11] partially agree and so the main argument

[35:13] was labs open source labs the easiest

[35:16] way is to do distillation however you

[35:19] know if you for example if you were an

[35:20] open source app you will only use that

[35:23] approach to firstly enter the market but

[35:25] as longterm you know as long-term safety

[35:28] as a long-term safety net you will not

[35:29] do this approach um instead as a you

[35:32] know instead you will do you know for

[35:33] example generate the answer get the

[35:36] question for example you know you will

[35:38] get data from a call or scale whatever

[35:39] you know have some sort of like large

[35:41] data labeling army or something I don't

[35:44] know um and so like in general because

[35:47] currently some of the labs so they don't

[35:49] just do distillation right so they're

[35:50] not just going to call the model 10

[35:52] trillion times you know and just do

[35:54] distillation. They also augment the

[35:56] training data with their own approach.

[35:57] So I will be talking about the GLM

[35:59] approach maybe like later um but they

[36:01] did invent some new approaches to do

[36:03] very good reinforcement learning and

[36:04] GRPO um and because GRPO and

[36:08] reinforcement learning um you know is

[36:10] open source these labs just use these

[36:12] methodologies to make the models better.

[36:14] So you don't so distillation is only one

[36:16] part of the training system. Um and it's

[36:19] not I would say that assume distillation

[36:21] disappeared. Okay, maybe open source

[36:24] labs maybe increase you know it's not

[36:26] four four months maybe eight months um

[36:28] but but that's fine because you know we

[36:32] always have some sort of innovative and

[36:33] new approach you know deepseek might

[36:35] invent something new um and so like you

[36:37] know GLM ki all of them Google you know

[36:40] even the American open source lab

[36:42] they'll have some new innovation um and

[36:44] so like I think like yes if you stop

[36:46] distillation it will increase you know

[36:48] the you know four months to eight months

[36:50] but I still think that is fine Um it's

[36:53] just a delay you know and then the delay

[36:55] will go back to like four months. Um

[36:57] yeah

[37:00] good question. So the question is if

[37:01] dynamic quantization is always better

[37:03] why do people not always do dynamic

[37:05] quantization? Um so

[37:08] it depends on the definition of dynamic

[37:10] quantization. So for every single lab

[37:13] they will have different approaches to

[37:14] dynamic quantization. In fact, I'm

[37:16] actually going to talk about that. Um, I

[37:17] was going to talk about that in the

[37:19] benchmaxing and accuracy minimizing

[37:22] session. So, I'll be talking about that.

[37:24] Um, so I will your question will be

[37:27] answered later. Um, yes. Okay. One more

[37:30] question. Yes. Yes. So, the question was

[37:32] for consumer grade GPUs, you know, what

[37:35] are the open source models in terms of

[37:37] like, you know, the parameter size

[37:38] capabilities and stuff like that. Um, so

[37:40] for the open source community, you know,

[37:42] the most popular models are probably

[37:43] Quen 3.6 6 35 billion um 27 billion GMA

[37:47] you know Gemma's 26 billion um GLM 4.7

[37:51] flash the smallest type models um and I

[37:55] feel like these small models are

[37:57] actually very powerful um so okay I

[38:00] don't have wait I don't think so I have

[38:01] a plot um but essentially these small

[38:04] models the biggest problem oh actually

[38:05] I'm going to talk about this as well the

[38:07] biggest problem of these small models

[38:08] are they fail very bad at tool calling

[38:11] because they have tool calling issues um

[38:13] they loop continuously um and the

[38:16] biggest problem is because they're small

[38:18] and that is why they have these problems

[38:20] um but we can counteract this um and so

[38:23] one of the things I'm going to talk

[38:24] about later is the model becomes not

[38:26] important anymore it's the harness or

[38:28] the tool that is actually the most

[38:30] important thing um how do you actually

[38:32] call the model um that actually affects

[38:34] the most accuracy of the model um so not

[38:36] actually the model itself um but I'll be

[38:39] talking about that as well um yeah okay

[38:42] I will continue on. Um, there were

[38:44] always questions after each section. Um,

[38:49] uh, yes. Oh, yes. The next section, the

[38:51] fun section, throughput maxing. Oh,

[38:53] actually, I think I did. It's supposed

[38:54] to be 2x. I don't know. Whatever.

[38:56] Throughput maxing and and accuracy

[38:59] minimizing. I thought it was like

[39:00] accuracy mining, but there's no such

[39:02] thing. So, it's called accuracy

[39:03] minimizing for now. Um, yes.

[39:08] So, this part actually I really like.

[39:11] Okay. I'm not sure if you guys can see

[39:12] it's a bit oh whatever. Um this shows

[39:15] the parade efficiency of cost of the

[39:18] cost of the model. So cost is um cost is

[39:21] the x-axis. Um and the y-axis is the

[39:24] arena score. So this is like you know

[39:26] Ella Marina's arena score. Um and this

[39:29] part I really like. So I don't really

[39:31] you know maybe you see like arena scores

[39:33] you know Ella Marina scores between each

[39:35] model. I don't really like that. It's

[39:36] not it's not very easy to see. Instead

[39:39] the better approach is to plot every

[39:40] single model on two axes cost versus

[39:45] accuracy. Um and you can see Fable does

[39:48] very well right so Fable does very very

[39:49] well on that plot. Um but you can see

[39:51] there is a paro trend you know like

[39:54] Gemini 3.1 preview is over here you know

[39:56] Opus 4.6 is over there as well. There

[39:59] are some other models as well

[40:03] when Fable got released. Okay. Well, now

[40:05] it's banned, but anyways, when Fable was

[40:07] released, when you know when people

[40:09] tried it, they noticed that it's not

[40:11] that much better in terms of actual

[40:14] capabilities. Um, you can see, you can

[40:17] see, but however, people really liked

[40:19] the front-end design. You know, they

[40:22] said if you called Fable, it was very,

[40:24] very good for UI UX front end. Um and in

[40:29] fact if you look at the LM Mariners

[40:30] chart you can see it it was a very big

[40:32] shift in terms of front-end design. Um

[40:35] GLM 52 is also there if you can see you

[40:38] know it was part of the par paro trend.

[40:40] Um but in general for these large models

[40:44] they seem to have they're not going to

[40:45] be do they're not going to be doing that

[40:47] much better on general tasks. Um however

[40:51] for UI and designing Fable seems to have

[40:54] done very very well. Um, and so you

[40:56] should use Fable for your designing. You

[40:57] you should use Fable for designing, for

[40:59] UI, for UX, whatever, HTML, JavaScript,

[41:03] but you should probably not use Fable

[41:05] for the rest of the tasks because it is

[41:07] very expensive. Um, so you know, use

[41:09] some other models instead.

[41:12] Um, and you know, however, yes, okay,

[41:16] you know, some other models, you know,

[41:19] like, okay, this, you know, this shows

[41:21] that Fable does very well on UI and UX.

[41:23] Um but how about over time um you know

[41:26] how what do you know anthropic their

[41:29] view is we need to maximize throughput

[41:32] right maximize throughput but also

[41:33] maximize accuracy um you know they want

[41:36] to like you know serve more people um

[41:38] but sometimes it doesn't actually work

[41:40] um sometimes they actually reduce

[41:42] accuracy um and so you can see there is

[41:45] a I don't know if you folks know margin

[41:47] labs um they have this very cool they do

[41:49] they do su bench they benchmark codecs

[41:52] they benchmark codecs and clawed code

[41:54] with the models. Um, and this is

[41:56] accuracy over time for these models. Um,

[42:00] and the dotted lines are the release of

[42:02] the new models. Um, so there's actually

[42:05] another um, there was actually a dip in

[42:07] Wait, can you is there Oh, okay. The

[42:08] mouse is there. Um, I I think it was

[42:10] over here. Um, I think it was over here

[42:12] that feeble got released. Um, so there

[42:14] was actually another dotted line. Um,

[42:15] there was actually very interesting

[42:16] trends you can see. The first one is um

[42:20] every single time there is a new model

[42:21] release

[42:23] this this you know daily tracker seems

[42:27] to decrease in accuracy. Um and so if

[42:31] you want to predict when a model gets

[42:33] released from anthropic you can use this

[42:35] as an indicator um of when the model

[42:38] gets released. it worked very very well.

[42:39] Right? So like essentially if you were

[42:41] over here the dipped in accuracy over a

[42:43] very long period of time was because

[42:44] fable got released. Um and over here I

[42:47] think that's opus 4.8 I think. Um I

[42:50] think yeah I think that's opus 4.8. This

[42:53] is opus 4. Uh 7 and so on. That's 4.6 I

[42:57] think. I whatever um I don't remember

[42:59] exactly but um but you can also see that

[43:02] there is ginormous dips of accuracy. Um,

[43:05] and it's not just like one day or two

[43:07] days, it's for a very long period of

[43:09] time.

[43:12] This is also Codex. Um, so they also do

[43:14] codeex benchmarks. Um, and you can also

[43:17] see that over time. I don't know if you

[43:18] can squint, but you can see that

[43:20] actually Codeex has been getting worse

[43:22] if you plot the trend, right? If you can

[43:24] I don't know if you can squint, but if

[43:26] you draw a line, it seems to be getting

[43:27] worse. Um, so I'm assuming OpenAI is

[43:30] investigating this as well. Um, okay.

[43:32] >> So this is different model.

[43:34] This is codeex.

[43:37] >> So this is using 5.5.

[43:39] >> This is using

[43:40] >> model.

[43:43] >> Correct. It's the same. So what this

[43:45] benchmark does is you randomly sample

[43:48] 50bench questions. Sweet bench is very

[43:51] large. So you just sample 50 of them and

[43:53] then you call the model to answer it. Um

[43:56] and then you record accuracy. Um and so

[43:58] obviously you know every single day

[43:59] there's like you know daily variations.

[44:02] Oh, it's not it's not that useful

[44:03] because you're only calling 50

[44:04] questions. Um, so the trick is to look

[44:06] at the trend. Um, and the trend uh h

[44:10] maybe open should investigate this. Um,

[44:12] and you can see the trend for you know

[44:14] anthropic is also not very good. Um, in

[44:17] general oh so sorry this is not the same

[44:19] model. Um, these models change my bad.

[44:22] Um, so it's the same harness but the

[44:25] model changes. Um, so this dotted line

[44:27] is GBD 5.5. Um, so everything over here

[44:30] is GBD 5.5. Everything over here is GBD

[44:33] 5.4. Um I think this is 5.3. Um and so

[44:36] on. Um but it seems like the model's

[44:38] getting worse. So I don't know. This is

[44:42] probably just on this benchmark, right?

[44:43] On the Sweet Bench Pro benchmark, it's

[44:46] getting worse. Um but you know, I

[44:49] wouldn't really trust these benchmarks.

[44:51] The best way is to look at the

[44:52] degradation. You know, the sudden drops.

[44:54] You know, for example, Codex

[44:56] dramatically dropped over here. I don't

[44:58] know why. Um and you know clawed you

[45:01] know clawed code was very bad for a few

[45:04] weeks over here or over here right.

[45:08] Okay. Yes.

[45:12] >> Yes there is a confidence interval. I

[45:14] did not plot it but this is 50 tasks. So

[45:17] every single day they call a 50 tasks

[45:19] randomly. So they will sample 50 tasks.

[45:22] Um and so you you should not look at

[45:23] this daily. This is daily. So every

[45:25] single day is 50 questions. Another 50

[45:27] questions. another 50 questions and so

[45:28] on. Instead, you should do like a

[45:30] rolling average, you know, some sort of

[45:32] rolling, you know, 7-day average. Um,

[45:35] that's a better number. Yeah,

[45:40] >> really. I can see it from here. It's

[45:42] like decreasing.

[45:46] >> It's it's

[45:52] >> if you look at the if you do the seven

[45:54] moving average, I I'll probably get the

[45:56] pot later. It actually is decreasing.

[45:57] You can see it um if you can see I don't

[46:00] know if you look at the top peaks of the

[46:02] you look at the top peaks and the peaks

[46:04] are decreasing.

[46:09] >> Okay, how about the bottom peaks?

[46:17] >> Okay, I agree there is random noise. So

[46:18] the trick is you need to the moving

[46:20] average and if you look at the moving

[46:21] average you can actually see it's

[46:22] decreasing. I I'll probably I'll get the

[46:24] plot later. Um you can you can search

[46:26] it. It's so go to Margin Labs, search in

[46:29] Margin Labs codeex claw code benchmarks

[46:32] and they do show weekly the weekly trend

[46:35] but I'm just saying this is not this is

[46:37] not to say that the model is getting

[46:38] worse. This is just to show that

[46:41] accuracy that you know the sudden dips

[46:44] the accuracy of these models can

[46:46] decrease. Um and the question is why you

[46:49] know for example why did claude code

[46:52] over a few weeks why did the performance

[46:55] decrease like why that's the fundamental

[46:58] questions.

[47:03] So that is one theory. A theory is they

[47:06] might have accident you know that before

[47:08] the model release they are doing testing

[47:12] and so they might have like you know act

[47:13] you know some of the some of the queries

[47:16] they route to opus 4.8 eight

[47:18] >> or fable or whatever. And the problem is

[47:21] they did not.

[47:23] So the main question is if you do route

[47:25] to another model, why did the accuracy

[47:27] decrease? It should actually get better.

[47:29] And so one of the theories is theory

[47:31] one, they forgot to edit the system

[47:33] prompt. And so the system prompt for

[47:35] Fable was different, but then they used

[47:37] the wrong system prompt for, you know,

[47:40] for Opus 4.8, and that is why the

[47:42] accuracy decreased. Um and then after

[47:44] the model got released the accuracy went

[47:46] back up because they used the correct

[47:48] system prompt. That is one theory. Um

[47:51] the other theory is the other theory is

[47:54] okay we're actually going to talk about

[47:55] this is it's actually they're doing

[47:57] tricks. You know they did quantization

[48:00] but they didn't do dynamic quantization.

[48:02] They did some dumb quantization. Um you

[48:04] know they some GPUs are broken for

[48:07] example. You know they use the wrong

[48:08] GPUs. Some of them have like you know

[48:09] bit flips or something. I don't know. um

[48:11] they have like a new data center and

[48:13] then that data center just by chance has

[48:16] lower accuracy. Um in fact there is

[48:20] actually okay I'm going to talk about

[48:21] this actually. Um

[48:24] yeah but there are many many theories

[48:25] like you know possibilities why this

[48:27] could reduce an accuracy. Um actually I

[48:29] I think it's the next plot. Yes the next

[48:31] plot. Um oh well the next slides. Um so

[48:35] actually when was this? I don't

[48:37] remember. Um it was a few months ago.

[48:40] Someone from AMD actually made an issue

[48:42] on chord code you know during this dip.

[48:45] I think it was during the before um a

[48:47] very large dips in accuracy and they

[48:49] actually asked Claude, you know, they

[48:50] asked the Claude team, why is there a

[48:53] noticeable dip in accuracy? You know,

[48:54] why why is that?

[48:57] And Claude actually wrote a in April 23,

[49:01] they actually provided details on why

[49:04] they had reduced in accuracy, right? So

[49:06] they did a postmortem on what happened

[49:08] with Claude. Um and the reason why is

[49:12] because the thinking trace got deleted

[49:14] after the second you know when you when

[49:15] you ask call the second time the

[49:17] thinking trace got deleted. Um and it

[49:20] had a bad system prompt. Um and they

[49:23] found out that that that was why the

[49:24] accuracy got deleted. Um so somehow in

[49:28] claude code

[49:30] the second time you ask a question the

[49:32] previous thinking trace got erased. Um

[49:36] and I don't know I don't even know how

[49:38] they did not find this but oh wow um

[49:40] according to them now is claude now has

[49:42] this internal benchmark so they will use

[49:44] more internal investigations to test

[49:46] okay next time if there's a new model

[49:48] this won't happen ever again um and you

[49:51] know like these things do happen over

[49:53] time um and so like for this specific

[49:54] example you know cloud code the harness

[49:57] the harness itself was the problem not

[50:00] the actual model right the harness the

[50:02] thinking trace got deleted and they had

[50:04] a very not a very good system prompt. Um

[50:06] and that is why the accuracy actually

[50:08] degra um degraded.

[50:10] So that okay so we found one answer why

[50:14] these models got worse.

[50:19] They also released in September 2025

[50:22] right in September 2025 they showed that

[50:25] it was due to okay I didn't okay I

[50:27] didn't put the slide but anyways they

[50:28] showed it was actually due to a hardware

[50:30] problem. Um so in their compiler um they

[50:33] used TPUs. So so Anthropic likes to use

[50:36] TPUs and GPUs. Um they showed that the

[50:39] same software stack for GPUs and TPUs um

[50:42] actually produced different results. Um

[50:45] and so for the TPUs it actually was

[50:48] different sampling. Um and for the GPUs

[50:50] it was a different sampling mechanism.

[50:52] Um and so that is actually why they had

[50:53] decrease in accuracy during September

[50:55] sometime. Um because they actually had

[50:57] different hardware. And so you need to

[50:59] like Yeah. So like once you have

[51:01] different hardware accuracy also

[51:03] changes.

[51:06] So I think the main point is the harness

[51:10] the implementation the tool is now the

[51:13] most important. It's not the model right

[51:15] the model is useless. Most models you

[51:17] know if you look at the model of you

[51:19] know open source versus closed source

[51:21] models are generally the same. The

[51:23] difference is how clawed code is made

[51:26] you know how codec is made and used. Um

[51:29] and so that is actually the most

[51:30] important factor. It's not the model

[51:32] anymore. Um and so like you know as we

[51:35] have seen if they have accidentally

[51:38] botched you know if they accidentally

[51:40] botched the harness you will get reduced

[51:42] accuracy. Um and so like you know

[51:44] definitely you know for large labs as

[51:46] you know I'm sure they are they know

[51:49] these problems and they're working on

[51:50] it. Um but I feel like you know these

[51:52] are probably you know these are still

[51:53] very hard to fix. Um yeah so hopefully I

[51:56] answered some of people's questions on

[51:58] the harness you know the accuracy um so

[52:00] there's actually reasons why accuracy

[52:02] got degraded

[52:05] but you know it's not just closource

[52:07] labs during bad

[52:10] across open-source model providers the

[52:13] accuracy changes so if you look at this

[52:16] plot so this is from open router um this

[52:18] is deepseek v4 pro um so most labs what

[52:22] they want to do most inference providers

[52:24] what they want to do is they want to

[52:25] serve you the highest throughput, right,

[52:28] with the cheapest price. They want to

[52:30] give you, you know, 60 tokens, 120

[52:33] tokens, 1,000 tokens per second, right?

[52:35] They want to give you the fastest. Um,

[52:38] but did you but did people actually

[52:40] bother to check accuracy? So, that is

[52:42] the fundamental question. You know, you

[52:44] might be getting 10,000 tokens per

[52:45] second and there is no model. Um, so the

[52:49] main question is you need to be careful

[52:50] of what you use from these inference

[52:53] providers. Um and so for DeepS v4 you

[52:56] know there are two benchmarks which open

[52:58] router ran you know

[53:01] yeah it's like sorted it's sorted I

[53:03] think on the gray I think it's sorted on

[53:04] tower bench um so it's sorted on tower

[53:06] bench um and the green one is GPQA and

[53:09] you can see that in general some of the

[53:11] labs are not you know some of the sorry

[53:13] not labs some of the inference providers

[53:15] are not doing very well um so you need

[53:17] to like before you before you use a open

[53:21] source model please check the accuracy

[53:23] before you use the open source model. Um

[53:25] and also one of the biggest problems of

[53:26] this is every single time you know for

[53:29] example a cloud code you know claude

[53:32] code and codeex you can benchmark

[53:35] accuracy over time. Um and the good

[53:38] thing about closed source labs is they

[53:40] control the supply chain. Um the biggest

[53:42] problem of open source is there are so

[53:44] many suppliers and providers of these

[53:47] models um that sometimes what happens is

[53:50] people get turned off and they get very

[53:53] annoyed that the open source models do

[53:55] not work very well. Um so everyone you

[53:57] know in the in the ecosystem people keep

[53:59] saying that closed source labs do much

[54:01] better than open source but it's not

[54:04] because of the model it's because of the

[54:05] inference provider right the inference

[54:07] provider is to blame that they are

[54:09] causing the downfall of open source

[54:11] because they're giving a bad name for

[54:13] open source um so I would like check you

[54:15] know

[54:17] whatever favorite inference provider you

[54:20] have um so this this benchmark was run I

[54:22] think yesterday um by open router so

[54:24] this is this is daily data by open

[54:27] router. Um so whatever favorite

[54:30] inference provider you have please tell

[54:32] them not to you know reduce accuracy

[54:35] that much. Um this is GLM 5.2. Um so you

[54:39] know GLM 5.2 as well shows different

[54:42] accuracies. Um you can see so the plot

[54:45] on the right shows most model you know

[54:48] most inference provide okay I keep

[54:49] saying model apps most inference

[54:51] providers are throughput maxing but they

[54:54] are accuracy minimizing that's where the

[54:56] phrase comes from okay so they do not

[54:57] care about in fact look like you know

[55:00] the highest accuracy is 76.4% and the

[55:02] lowest is 62.4%. So there is a 10% gap

[55:07] between the back you know between the

[55:08] highest accuracy and the you know lowest

[55:10] accuracy. Um and so like you need to you

[55:13] know as a as a you know as a call out to

[55:16] inference providers you know please

[55:18] increase accuracy you know before trying

[55:21] to make things faster right you do not

[55:22] want a model to be very dumb um and it's

[55:25] like you know 10,000 tokens per second

[55:27] right we can make it 1 million tokens

[55:28] per second and there is no model um you

[55:31] know just call a human or something you

[55:33] know make a fake or something so yeah so

[55:36] the main point is we need inference

[55:38] providers to do good in terms of

[55:41] accuracy otherwise this will make open

[55:43] source have a very bad look um yeah oh

[55:47] okay that's the end of the the second

[55:49] section I guess that was a bit of a rant

[55:51] um any other questions for this yes

[55:55] >> for a new organization that's that wants

[55:57] to use like the open source model do you

[56:00] suggest using a you know inference

[56:03] service provider or do you suggest

[56:05] downloading from hugging face and then

[56:07] using like model or you know some kind

[56:09] server to you know implement yourself

[56:13] like what do you suggest if any new

[56:14] organization comes and asks you like how

[56:16] do you use open source model

[56:18] >> that's a great question so when an open

[56:20] source model gets released you know how

[56:22] should you use it in terms of accuracy

[56:24] throughput or whatever um so in general

[56:27] um in general open source has come a

[56:30] long way so for example we did report

[56:32] bugs in Jamaa 1 ja 2 llama mistro you

[56:35] know open gdosss every single of those

[56:37] models had bugs Um and so the good thing

[56:40] is you know as we will help the labs

[56:43] before they release a model to fix some

[56:45] of the issues. So every single model you

[56:47] now have has some of our fixes. So

[56:50] that's a good thing. Um but in general

[56:53] if you have a open source model I would

[56:55] use Llama CPP for example. I think Llama

[56:58] CPP and Llama server is probably the

[56:59] most bugfree system. So I would like

[57:03] suggest yes you should download from

[57:05] hugging face. use Llama server, use

[57:07] Llama, you know, CLI, I don't know, you

[57:10] can use Unsoft Studio, whatever,

[57:11] whatever is your favorite tool. But you

[57:14] should, yes, you should download from

[57:15] Hugging Base. Um, in terms of like, you

[57:18] know, if you're a large enterprise,

[57:19] generally speaking, what they like to do

[57:21] is they like to wait one week. So most

[57:24] enterprises, they'll wait one week for

[57:26] all the problems to be fixed. Um, and

[57:29] then, you know, then they will use the

[57:30] model. But in my view, that is not a

[57:32] good approach. I would say if you okay

[57:34] if everyone waits one week then like how

[57:38] do we fix the bugs? Um because only at

[57:40] scale only at scale then we can see the

[57:43] bugs. Um and so like in general we need

[57:46] everyone to start trying these models

[57:48] earlier. Um and not like you know wait

[57:50] one week wait one month you know don't

[57:52] do don't do the waiting approach. Um but

[57:55] I would say like in general the

[57:56] enterprises what they like to do is just

[57:58] wait one week. Um yeah that's like

[58:01] common practice. Um, yes.

[58:14] >> So, okay, the question was why would the

[58:17] model performance degrade before a model

[58:19] release? Um,

[58:22] these are just hypothetical question

[58:24] hypothetical theories. So, every single

[58:26] model has a different system prompt. So,

[58:29] opus 4.8 8 Opus 4.8 system prompt is

[58:32] very short. Um but Opus 4.7 system

[58:35] prompter was extremely long. Um so the

[58:37] theory was this is just a theory that

[58:40] anthropic via claude code accidentally

[58:43] routed some of the models to Opus 4.8

[58:46] right they use opus 4.8 as testing right

[58:49] they need to test opus 4.8

[58:51] But they used Opus 4.7 system prompt. So

[58:54] they used the wrong system prompt and

[58:56] that is why accuracy degraded. That's

[58:58] one theory. Um, another theory is

[59:02] actually I think that's the actually I

[59:04] thought about it. That's probably the

[59:05] only theory I had. I'm like thinking hm

[59:07] is there another theory? Um,

[59:12] >> I guess the harness itself like you know

[59:14] sometimes the harness itself the harness

[59:16] was was designed for Opus 4.7. Um and

[59:21] during when they were going to release

[59:24] 4.8,

[59:25] they need to collaborate the harness,

[59:28] right? They need to change the harness

[59:29] um for 4 4.8 to make it work. But the

[59:32] problem is

[59:34] you're not allowed to publish it, right?

[59:36] You're not allowed to publish it and

[59:37] give it to people because otherwise

[59:38] people will like, you know, go into

[59:39] Twitter on LinkedIn, you know,

[59:41] everywhere. Oh, I can see 4.8 is going

[59:44] to be released. You know, everyone's

[59:45] going to be screaming, you know, 4.8's

[59:47] coming. 4.8's, eights, you know, were

[59:48] getting released and so maybe that's why

[59:50] accuracy decreased. It's they update

[59:52] they did not update the harness. Um or

[59:55] the other option is they up they already

[59:56] up they silently they silently updated

[59:59] the harness before the new model got

[1:00:01] released and it regressed you know it

[1:00:04] reduced accuracy. Um I don't know like

[1:00:07] to be honest I you should probably ask

[1:00:08] anthropic that question. Um or but I

[1:00:11] think in general in general the dips the

[1:00:13] dips don't always correspond to like new

[1:00:15] model releases. Some of the dips are

[1:00:17] actual issues like you know the thinking

[1:00:19] trace got deleted um the system prompt

[1:00:23] they wrote a wrong I think for the

[1:00:24] system it's funny I think for the system

[1:00:26] prompt they said um

[1:00:29] they tried to reduce verbosity so they

[1:00:31] tried to make the model less talkative

[1:00:34] um and it actually made the model dumber

[1:00:36] um and so I think it was just one word

[1:00:38] they added one word no one sentence I

[1:00:41] think one sentence in the system prompt

[1:00:43] that made the model dumber Um,

[1:00:46] yeah, I don't know if that helps, but I

[1:00:48] don't know if anyone else has any like

[1:00:49] theory. I don't I don't think so anyone

[1:00:51] even has that many theories on this. Um,

[1:00:54] obviously the anthropic engineers will

[1:00:55] know, but I, you know, they're not going

[1:00:57] to tell. So, it's just based on

[1:00:58] hypotheticals. Something to do with the

[1:01:01] system problems, something to do with

[1:01:02] the harness. Yeah. But I think in

[1:01:04] general, you can also use this plot. You

[1:01:05] know, if the performance decreases, most

[1:01:07] likely a new model is going to be

[1:01:08] coming. Um, yeah. Any other qu? Yes.

[1:01:12] >> Just to add on that

[1:01:18] Yes, correct.

[1:01:26] >> Correct.

[1:01:32] >> Yes. Exactly.

[1:01:33] >> Exactly. So before a model release, they

[1:01:36] use a different system prompt for that

[1:01:38] new model for the old model. And so that

[1:01:40] is probably why there are some decrease

[1:01:42] in accuracy. they switch the system

[1:01:43] prompts around or something like that.

[1:01:45] Um and also you know the model itself

[1:01:47] you know I think 4.8 system prompts is

[1:01:50] very short. Um it's yeah I think it's

[1:01:53] like very very short and 4.7 was

[1:01:54] ginormous. Um and the reason is 4.7 was

[1:01:57] like you know I don't know what I don't

[1:01:58] know what happened but they have this

[1:01:59] ginormous system prompt and the 4.8 just

[1:02:01] shrunk it a lot. Um so maybe maybe they

[1:02:04] used the 4.7 system prompt I don't know

[1:02:08] or 4.8 system the short system prompt

[1:02:10] for 4.8 eight and then they use it for

[1:02:11] 4.7 and that's why it decreased

[1:02:13] accuracy. I don't know. Um but yeah,

[1:02:15] you're correct. Um they do release

[1:02:17] although I think the system prompt they

[1:02:18] released on the website is for claw.ai.

[1:02:21] So the online chat system um the clawed

[1:02:24] code system prompt is actually

[1:02:25] different.

[1:02:26] >> Yeah. So I think you need to actually

[1:02:28] call you need to call claude code you

[1:02:30] know what is my system prompt and then

[1:02:33] you print it to like a text file um and

[1:02:36] then you can like in investigate what

[1:02:38] the system prompt is and then you can

[1:02:39] also override it if you want um yes but

[1:02:43] it's a different system prompt most

[1:02:44] likely um yeah

[1:02:47] last question if anyone

[1:02:51] no okay continue on

[1:02:58] Okay, the next section we're going to be

[1:03:00] talking about is benchmaxing and

[1:03:02] cheating. Um,

[1:03:06] I'm not sure if you folks have seen the

[1:03:08] deep SWE benchmark. Um, the deep SWE

[1:03:11] benchmark is a very popular recent

[1:03:13] benchmark that shows, you know, the cost

[1:03:16] is on the X-axis and the Y-axis it is a

[1:03:20] deep SWE benchmark. It's a new benchmark

[1:03:22] based on like you know a better

[1:03:23] uncontaminated version of Swebench Pro.

[1:03:26] Um and in general you can see that you

[1:03:28] know GBD 5.5 does very well with Fable

[1:03:31] um you know GLM Opus 4.8 in general

[1:03:33] right it shows you know this plot shows

[1:03:36] that models are getting you know um

[1:03:39] these the dots are different reasoning

[1:03:41] modes um I think this is maximum

[1:03:44] reasoning I think um high extra high you

[1:03:47] know these are actually different

[1:03:48] reasoning um reasoning times as well um

[1:03:51] but in general you can see that there is

[1:03:53] a parto efficiency trend right the best

[1:03:56] model is the one you know to the right

[1:03:59] to the top right the better the model to

[1:04:01] the right to the top is the better the

[1:04:02] model. Um, so you want the models to do

[1:04:04] better and better over time to that to

[1:04:05] the top right corner.

[1:04:09] And you know, I just learned I didn't

[1:04:11] actually know this. I just learned that

[1:04:13] Sweetbench Pro when you run this

[1:04:16] benchmark you use LL you use language

[1:04:19] models as a verifier. Um, and I was like

[1:04:22] confused because like for most

[1:04:24] benchmarks,

[1:04:25] for most benchmarks, you should never

[1:04:28] call another language model to check

[1:04:31] whether your answer is right or wrong.

[1:04:33] And so for Swedebench Pro, you actually

[1:04:36] call a language model to verify if your

[1:04:38] language model was right. Um, and so

[1:04:42] that is why SweetBench Pro is not a very

[1:04:44] good benchmark. Um, one of the problems

[1:04:47] is is do we need to do sampling? Like

[1:04:51] how many verification runs do you need

[1:04:53] to run to verify if your answer is

[1:04:55] correct? Do you run it one time? Do you

[1:04:58] run it five times? You run it 100 times

[1:05:00] and take like an average. Um, so I was

[1:05:02] actually quite shocked that this is

[1:05:04] actually what happens. I was quite

[1:05:06] surprised actually. Um, the next

[1:05:07] question is which model is the verifier?

[1:05:10] You know you ask for example you ask

[1:05:12] opus you know you you benchmark opus 4.8

[1:05:15] on swbench pro but which what do you use

[1:05:19] as a verifier do you use opus 4.8 eight

[1:05:21] as the verifier to using the same model

[1:05:24] itself to verify itself. Um and so like

[1:05:26] this I was like quite surprised actually

[1:05:29] that this is how benchmarks work. Um and

[1:05:31] actually quite disappointed. Um but

[1:05:34] anyways obviously you can go the other

[1:05:36] approach. You can do human verification.

[1:05:39] Um you know everyone in the room I'll

[1:05:42] give you the bench you know and just

[1:05:44] tell you guys to verify it. Um you could

[1:05:46] do that I guess. Um and also what

[1:05:48] happens if the verification changes

[1:05:50] every day? Um you know remember

[1:05:52] previously models you know every single

[1:05:55] day models get better or worse. um what

[1:05:58] happens what happens if you run what

[1:06:00] happens if you run the verification when

[1:06:02] the model was doing very bad right you

[1:06:05] will actually have different SWE numbers

[1:06:07] um and so like I'm actually quite

[1:06:08] surprised this is what the industry does

[1:06:10] um you know run bench pro but using

[1:06:13] anonymous is verifies that is definitely

[1:06:16] not a good idea um but anyways people do

[1:06:18] it whatever um

[1:06:20] in fact according to deepu um if you do

[1:06:24] if you do verification using language

[1:06:26] models

[1:06:27] Sweet Bench Pro has a 8.5%

[1:06:30] false positive rate. Um, and a false

[1:06:34] positive rate means that the LLM

[1:06:36] verifier said that the model was

[1:06:37] correct, but it was actually wrong. Um,

[1:06:40] and so 8.5% of the time it would do

[1:06:42] this. Um, the false negative rate is

[1:06:46] even worse at 24%. Um, this means that

[1:06:50] the verifier said that the model was

[1:06:52] wrong, but it was actually right. Um and

[1:06:55] so you can see that SweetBench Pro is a

[1:06:57] very bad benchmark. Um and so Deep Sweet

[1:07:00] showed that they have in you know they

[1:07:02] fixed the problem you know um by

[1:07:05] reducing the false positive rate and the

[1:07:07] false negative rate to you know 1%.

[1:07:10] Um in fact some examples of cheating um

[1:07:15] I you know this is actually quite

[1:07:17] surprising um but in the bench pro

[1:07:20] benchmark you get you get like a GitHub

[1:07:23] question you know a GitHub issue you

[1:07:25] call the model to solve that GitHub

[1:07:28] issue

[1:07:29] but did you know that in Swebench Pro

[1:07:31] you get the full Git history so you get

[1:07:34] the you get the actual answer as well um

[1:07:37] so I'm like I'm actually quite I was

[1:07:38] actually quite shocked to learn this um

[1:07:40] that during these models you give the

[1:07:43] answer and the question like obviously

[1:07:46] the model will cheat. Um and so like

[1:07:48] this is definitely a very bad benchmark.

[1:07:51] Um you know you should never ever ever

[1:07:53] ever give the model the answer. Um and

[1:07:57] so very silly. Um but yes this happens a

[1:08:01] lot. Um and you do not want the model to

[1:08:03] literally see the solution, right? That

[1:08:05] is a terrible approach. Um the other

[1:08:08] problems that you get get like false

[1:08:09] positives is you know the PR tests you

[1:08:13] know the the GitHub the GitHub issue

[1:08:16] tests are very weak. Um so you know at

[1:08:18] the final conclusion you know when the

[1:08:19] GitHub when the GitHub issue is closed

[1:08:22] with a pull request the tests that the

[1:08:24] maintainer wrote are not very good. Um

[1:08:27] and so the problem of that is you know

[1:08:29] if you have tests which are very weak

[1:08:31] then you know the model does very well

[1:08:32] not very good. Um and obviously the

[1:08:34] worst part is the model will like bypass

[1:08:37] some tests. It will skip some um and

[1:08:39] that is not a very good approach.

[1:08:42] In fact um deep suite actually showed

[1:08:45] how many times a model cheats by looking

[1:08:48] at the full git history you know

[1:08:51] directly going to the answer. Um you can

[1:08:53] see opus 4.7.

[1:08:55] So the purple bars show cheating by

[1:08:58] models. Um ah it looks like Jubilee 5.5

[1:09:02] never cheats. It looks like it um h okay

[1:09:04] maybe we should use GP 5.5. Um you know

[1:09:07] actually this is actually very

[1:09:08] interesting. There are some people which

[1:09:10] think that if you cheat that's actually

[1:09:13] good. Um and the reason why it's good is

[1:09:16] it means that Opus 4.7 already know like

[1:09:19] if you give it the full Git history you

[1:09:21] should be able to like you gave it to

[1:09:23] them right you gave Opus the full Git

[1:09:25] history it should find the solution

[1:09:27] there right it should just directly skip

[1:09:28] over to the solution. So it's that's

[1:09:30] what people think you know people have a

[1:09:32] view that

[1:09:34] the humans gave Opus 4.7 the full gate

[1:09:36] history so it should cheat right you you

[1:09:39] you designed it to cheat um so in

[1:09:42] general cord models seem to cheat more

[1:09:46] um and open AI models seem to cheat less

[1:09:48] in general um so it depends on you you

[1:09:52] know if you want a model to cheat or not

[1:09:54] um and the definition of the word cheat

[1:09:56] is also very you know charged so I guess

[1:09:58] it depends on what the word cheating

[1:10:00] means

[1:10:02] um you know for false negatives remember

[1:10:05] Swebench Pro calls a language model to

[1:10:08] verify if your answer is correct um and

[1:10:11] so sometimes it's not very good you know

[1:10:14] sometimes you have unrelated tests that

[1:10:15] fail um you forgot you know sometimes

[1:10:18] when you write tests you forgot about

[1:10:20] the tests which have helpers you know

[1:10:22] helper functions and you just skip that

[1:10:24] um so there are many issues and this I

[1:10:27] think this was 20 yeah so 24% % of the

[1:10:29] time, 24% of the time, the model says,

[1:10:32] the verifier says your model was wrong,

[1:10:35] but it was actually correct. So, this is

[1:10:37] another problem.

[1:10:40] And even worse, the harness itself can

[1:10:43] change accuracy. So, when you benchmark

[1:10:46] using Swebench Pro, like you need to

[1:10:49] have one agent or one harness for all

[1:10:52] models, right? How do you create a

[1:10:54] generalized control environment for

[1:10:57] these models? Um and so you can see like

[1:10:59] you know for example DeepSu showed if

[1:11:02] you use clawed code you get 40% accuracy

[1:11:05] but then if you use their own so it's a

[1:11:07] special harness you can get 50% accuracy

[1:11:10] um Gemini for example right if you use

[1:11:13] Gemini CLI you get 20% accuracy but if

[1:11:16] you use their one you know the the

[1:11:18] control environment you can get 40%

[1:11:20] accuracy um and so in general

[1:11:25] for these benchmarks you also need to

[1:11:27] have a controlled environment. Um, and

[1:11:30] that is also another problem.

[1:11:32] And with Deep Suite, they showed by

[1:11:34] using this benchmark, by solving, you

[1:11:36] know, by stopping cheating, you know,

[1:11:38] by, you know, if we remove cheating, if

[1:11:41] we remove, you know, these other issues,

[1:11:44] you can see the models, you know, the

[1:11:47] models are not saturated anymore, right?

[1:11:49] You can see the models are very

[1:11:51] different in terms of the capabilities.

[1:11:52] According to this benchmark, GBD 5.5 is

[1:11:55] the best according to this one. Um I

[1:11:56] don't Oh, this is not updated. Um for

[1:11:58] 4.8 I think is over here or something.

[1:12:00] Um but yes, this benchmark shows core

[1:12:03] taiku is 0%.

[1:12:06] Um accuracy, right? It's terrible, I

[1:12:09] guess. Um but yeah, this benchmark just

[1:12:11] show okay the main question is do you

[1:12:12] trust this benchmark? That is another

[1:12:14] question. Um

[1:12:16] there is other benchmarks, right? So

[1:12:18] cognition released a frontier code

[1:12:20] benchmark which also tries to solve the

[1:12:22] same questions for benchm you know for

[1:12:24] cheating and benchmarks. Um and what

[1:12:26] they showed is you can fix

[1:12:28] contamination. And how do you fix

[1:12:30] contamination? You ask, you know, you

[1:12:32] ask Cognition's team, which is full of

[1:12:34] like, you know, national Olympiads and,

[1:12:36] you know, international Olympiads. They

[1:12:39] manually checked every single question

[1:12:41] um themselves, you know, and removed bad

[1:12:44] questions, you know, bad examples. Um

[1:12:47] and they also showed that their

[1:12:48] questions are much more diverse, right?

[1:12:50] So, Frontier Code has many different

[1:12:52] other languages. Um and they showed with

[1:12:55] diversity you know with more diverse

[1:12:57] programming languages um and by reducing

[1:13:00] contamination

[1:13:02] they also have a benchmark um and

[1:13:04] according to their benchmark

[1:13:06] opus 4.8 is the best right for 14.5%

[1:13:10] accuracy juby 5.5 is 7.2 to accuracy.

[1:13:13] Um, and this is the diamond one, right?

[1:13:17] So, this is the 50 the 50 hardest

[1:13:19] questions. Um, the main benchmark is 100

[1:13:22] questions and the extended is 150. Um,

[1:13:25] and so according to them, you know,

[1:13:28] Claude does the best according to them.

[1:13:32] But also according to them, Frontier

[1:13:35] code seems to be better than Deep Suite.

[1:13:38] Right? The benchmark that I showed

[1:13:39] previously, Deepswuite, this one um you

[1:13:42] know according to Frontier Code, so the

[1:13:44] cognition team, their benchmark is

[1:13:46] better than Deepswuite, right? According

[1:13:48] to them, according to them, Deep SW's

[1:13:51] false positive rate is 44.9%.

[1:13:54] But remember what did Deepswu say? They

[1:13:57] said the false positive rate was I don't

[1:13:59] remember what what did they say? Um they

[1:14:03] said that it was 0.3%.

[1:14:06] Right? So deep said deep said their

[1:14:09] false positive rate is 0.3%. But

[1:14:11] Frontier code said that Deep SWE's false

[1:14:13] positive rate was 44.9%.

[1:14:16] Um so you know there is some competition

[1:14:19] I guess between

[1:14:21] benchmarking labs um well cognition is

[1:14:24] not a benchmarking lab but like you know

[1:14:26] between companies um so the main

[1:14:28] question is who do we trust you know do

[1:14:30] we trust Frontier codes benchmarks? Do

[1:14:33] we trust Deep Swiss benchmarks? Do we

[1:14:36] trust Bench? You know, who do we trust?

[1:14:39] And that is a very important question.

[1:14:42] Um, you know, my take is like, you know,

[1:14:45] like let's just take an average of

[1:14:46] everyone. Take an average of everyone

[1:14:48] and you'll probably get the best answer.

[1:14:50] You know, who is actually doing the

[1:14:51] best. Um, yeah, but this is actually

[1:14:53] very interesting. Um, you know, it show

[1:14:55] Okay, so according to them, the false

[1:14:56] negative rate for Deep Suite is correct.

[1:14:58] You know, 1.2%. But my interest, you

[1:15:00] know, I probably, you know, my main

[1:15:03] question is why is the false positive

[1:15:05] rate so high for deep according to

[1:15:07] according to Frontier Bench, Deep Sweet

[1:15:10] is even worse than Sweet Bench Pro.

[1:15:12] That's what they're trying to say, I

[1:15:14] guess, for for the false positive rate.

[1:15:16] Um, yeah.

[1:15:19] And even worse, there is another

[1:15:21] benchmark called Frontier Math. Um, so

[1:15:24] Frontier Math is by Epoch AI. Um so they

[1:15:28] they have this math benchmark with

[1:15:30] different tiers you know tier one, tier

[1:15:32] two, tier three, tier four. So tier four

[1:15:34] is the hardest. Um but the benchmark

[1:15:37] itself was botched. Um and so they

[1:15:40] actually had to release a corrected

[1:15:41] version of their benchmark. Um I think

[1:15:44] this was one month ago um or something.

[1:15:48] Um so they showed that their benchmark

[1:15:51] questions were fully wrong. Um, and you

[1:15:55] can see that if you correct the

[1:15:56] benchmark, if you correct the benchmark,

[1:15:58] the accuracy for GBD 5.5 jumps from 50%

[1:16:01] to 80% or something. Um, and so now you

[1:16:03] kind of trust the benchmark.

[1:16:06] And they showed in a tweet, oh, it's

[1:16:08] June 12. Oh, it's only two weeks ago.

[1:16:11] Um, so in June 12, they showed that the

[1:16:14] reason why they did bad on the

[1:16:15] benchmarks is they they did the answer

[1:16:17] extraction incorrectly. For example,

[1:16:19] they did, you know, they had unclear

[1:16:20] questions. They had the incorrect sign.

[1:16:23] So, for example, they said the model

[1:16:24] said 12, but it should be actually minus

[1:16:26] 12 and they forgot to cut the minus

[1:16:29] sign. Um, they have one-off errors. Um,

[1:16:33] yeah, there's many problems with the

[1:16:34] benchmark. Um, and so they fixed their

[1:16:37] benchmark um, just recently.

[1:16:41] In fact, you know, it's actually quite

[1:16:43] funny. This was just two weeks ago.

[1:16:47] Have you guys heard of hugging faces

[1:16:49] math verify which was one year ago? Um

[1:16:53] and hugging base showed that in fact

[1:16:55] these benchmarks when you do math

[1:16:57] questions they always do bad and the

[1:16:59] reason why is because there's many

[1:17:01] problems right the formatting is

[1:17:03] incorrect um you know the extraction of

[1:17:05] the fraction is wrong um you know the

[1:17:07] sign is failed extraction there's many

[1:17:10] many many problems of mathematical

[1:17:12] extraction and to be honest I feel like

[1:17:13] it's like kind of a reinventing the

[1:17:15] wheel or you know rediscovery um but

[1:17:18] hugging base actually published this one

[1:17:20] year ago and epoch just fixed it 2 weeks

[1:17:22] ago. Um so you know benchmarking labs

[1:17:26] definitely need more you know they need

[1:17:28] to investigate literature more I think.

[1:17:31] Um in fact according to hugging face

[1:17:34] math verify you know if you use if you

[1:17:38] the green bar the green bar is if you do

[1:17:41] not use hugging faces's verification

[1:17:43] system you know to fix the benchmark. If

[1:17:45] you do fix the benchmark, you can see

[1:17:47] accuracy dramatically increases, right?

[1:17:49] For example, for Quen, for Quen, the

[1:17:51] accuracy was 10%, now it's 25%. Um, and

[1:17:54] so you need to, so that means the open

[1:17:56] source models are not dumb. They just

[1:17:58] have different they output a different

[1:18:01] format. Um, and so one of the problems

[1:18:03] is how do we actually actually like, you

[1:18:05] know, pass these different formats?

[1:18:08] In fact, it's even worse. Um, no, I

[1:18:11] think I tweeted, oh, I tweeted this in

[1:18:13] August 2024. Um, that if you if you use

[1:18:16] different tokenization, you can also

[1:18:18] have different accuracy. Um, in fact,

[1:18:20] for MLOU, if you use spaces, you

[1:18:24] increase accuracy by 0.4%. Um, it might

[1:18:27] not sound like a lot, but the point is

[1:18:29] by these very dumb things like, you

[1:18:32] know, using spaces or, you know, minus

[1:18:36] 12 becomes 12. Um and all of these like

[1:18:38] dumb little small things, the accuracy

[1:18:41] of these benchmarks can change over

[1:18:43] time. Um and so like the main question

[1:18:45] is you know how do we make benchmarking

[1:18:48] labs and benchmarking companies you know

[1:18:50] how do we make them more reliable um and

[1:18:53] you know more trustworthy.

[1:18:57] Oh okay that's I guess the section for

[1:18:59] the benchmarking part. Any other

[1:19:01] questions for that section? Um

[1:19:04] questions. Yes.

[1:19:40] That's a great question. So the question

[1:19:42] is how do we how can we trust these

[1:19:44] benchmarking companies or like what

[1:19:46] other types of benchmarks can we do to

[1:19:49] make it trustworthy? Um so that is

[1:19:51] actually a very good question. The main

[1:19:53] question for benchmarks is you need to

[1:19:54] satisfy two conditions. The first

[1:19:56] condition is the benchmark must not must

[1:19:59] not be benchmaxable. Right? How do you

[1:20:01] make a benchmark that is extremely hard

[1:20:04] to benchmark, right? How do we like not

[1:20:06] get 100% accuracy? And the second

[1:20:09] question is how do we make the benchmark

[1:20:11] um verifiable, right? So how do we make

[1:20:13] the benchmark you can you can also

[1:20:15] verify that the answer is in fact

[1:20:17] correct, right? You remember Swebench

[1:20:19] Pro is dumb because you call the

[1:20:22] language model itself to verify itself.

[1:20:25] Um so that is not good. Um so the main

[1:20:27] question is those two questions. Um, and

[1:20:30] so one good example, this is just a dumb

[1:20:32] example.

[1:20:36] Randomly create maths questions.

[1:20:39] Sample for example. Okay, this is okay,

[1:20:41] this is probably not a good benchmark.

[1:20:44] You automatically create maths

[1:20:45] questions. Um, we can sample infinity,

[1:20:49] right? We can sample infinite maths

[1:20:50] questions, right? 2+ 2, 4 plus 4, you

[1:20:53] know, any single number added together.

[1:20:56] That's one question. Can you verify

[1:20:59] this? Yes, you can. Right? You can call

[1:21:01] a calculator to verify what is 2 plus

[1:21:03] two. Can this be benchmaxible?

[1:21:07] Hard. And the reason why hard is because

[1:21:09] the sampling space is infinity, right?

[1:21:11] It can be 2 plus 2, 1,00 plus 101,

[1:21:14] right? It can you you don't have to do

[1:21:16] plus, right? You can do 1,00 times 1,00.

[1:21:19] And so that's one way make a benchmark

[1:21:22] which is very hard to cheat but also

[1:21:25] easy to verify. So some sort of math

[1:21:27] question. Um, the other one, for

[1:21:28] example, is um,

[1:21:31] okay, maybe this is not a good example.

[1:21:33] I'm just making this one up on the spot.

[1:21:35] Tell the model to create a poem in 70

[1:21:39] words and you must use the word happy.

[1:21:44] Can you verify this? Yes, you can. Is

[1:21:46] happy in the, you know, generation? If

[1:21:49] yes, plus one. Also, you can count how

[1:21:52] many words, right? You can count, okay,

[1:21:54] is there 70 words? Um, so you can do

[1:21:57] these type of approaches. And is this

[1:21:58] benchmaxable? No. It's it's very hard to

[1:22:01] benchmark because you can say 70 words,

[1:22:04] 69 words, 68 words, 102 words, 1,000

[1:22:08] words, right? It doesn't have to be

[1:22:10] happy. It can be you must have two

[1:22:12] words, you must have three words. Um, so

[1:22:14] some some sort of benchmark where it's

[1:22:17] very hard to benchmark. Um

[1:22:21] yeah, in my view I think that's that's

[1:22:23] probably going to be the most important

[1:22:24] benchmark and I don't I don't think so

[1:22:26] anyone has actually made this yet. Um I

[1:22:28] don't know maybe someone in the audience

[1:22:30] or you know you guys can go as teams I

[1:22:31] don't know make a startup or something

[1:22:33] you know do that. Um and I feel like

[1:22:35] that benchmark will be very very

[1:22:36] important. Um yeah

[1:22:45] >> benchmarks we can trust today none of

[1:22:48] them. take an average of all of them. To

[1:22:51] be honest, probably the best approach is

[1:22:52] just vibe uh vibe checking. Try all of

[1:22:56] them and see which one you like the

[1:22:57] best. Um to be completely honest, I just

[1:22:59] you know like these benchmarks h like

[1:23:02] the main the main issue I have with

[1:23:04] benchmarks is for example um you know

[1:23:09] I mean like this one right

[1:23:11] this one I mean even every single day

[1:23:14] the benchmark can change. So we can't

[1:23:16] trust the benchmarks anymore. So my

[1:23:18] fundamental view is do not trust any

[1:23:20] benchmarks.

[1:23:22] Take an average and then okay then main

[1:23:24] question is who's taking the average? I

[1:23:25] guess artificial artificial analysis has

[1:23:27] some average. The only problem is they

[1:23:30] have some weightings for the weight. Um

[1:23:31] you know each benchmark has a weight. So

[1:23:34] now the question is you know what is the

[1:23:35] waiting of each benchmark. You know you

[1:23:37] can't just take like a dumb average. Um

[1:23:39] you know you can't just say you know

[1:23:42] 10 benchmarks divided by 10. Um that's

[1:23:44] probably not going to work. So the main

[1:23:46] question is how do you even do the

[1:23:47] waiting? That's another problem. Um, so

[1:23:49] I think in general it's based on vibe

[1:23:52] checking, I guess. Yeah, I guess I don't

[1:23:55] have an answer for that. Um,

[1:23:57] any other questions? Yes.

[1:24:43] question.

[1:24:54] >> Yes.

[1:24:55] >> So that way

[1:24:58] Good matter.

[1:25:03] >> You're correct. So the question was in

[1:25:06] terms of because we bench pro for

[1:25:07] example you call a model. The question

[1:25:10] is what model? Could it be 4.8? Could it

[1:25:12] be GB 5.5 and you call this model to

[1:25:15] verify the benchmark? Um you and so the

[1:25:19] question was can you use an open source

[1:25:20] model instead? So then now you you have

[1:25:23] a controlled environment. So yes you

[1:25:25] can. But remember there is a problem

[1:25:27] because even open source models itself

[1:25:29] have bugs times you know the inference

[1:25:32] engines have bugs times the inference

[1:25:34] providers have bugs and accuracy

[1:25:37] degradation. So it's you're correct. Um

[1:25:40] so the main question is we need to have

[1:25:42] some one or some organization

[1:25:46] you know some person or some whatever

[1:25:48] committee

[1:25:50] that we can investigate you know which

[1:25:52] engine did you use do not update the

[1:25:54] engine you know the engine must be the

[1:25:55] same you know the weights must have not

[1:25:57] changed so there's many many many

[1:25:59] problems with this approach um but I do

[1:26:01] agree as open you can use an open source

[1:26:03] model but it's not it doesn't solve the

[1:26:06] other problems um yeah does that Okay.

[1:26:10] Um, so the next section I'm going to be

[1:26:12] talking about is cyber security and

[1:26:13] regulation. Um, this is a interesting

[1:26:16] topic. Um, so I'm not sure if you have

[1:26:18] all folks have seen this plot. It shows

[1:26:20] the AI security institutes. Um, I think

[1:26:23] this is from the UK. Um, they show the

[1:26:25] performance of models based on some

[1:26:27] cyber security task. Um, and they show

[1:26:30] that mythos preview seems to be the

[1:26:32] best. Um, you know, with GBD 5.5 cybar,

[1:26:35] you know, preview and so on. Um, they

[1:26:37] show this benchmark. Uh

[1:26:41] and again previously as I mentioned

[1:26:44] weird ML is a better ben in my view okay

[1:26:47] this is just my take weird ML is a

[1:26:49] better benchmark in general for

[1:26:51] benchmarking intelligence on models and

[1:26:53] the reason why is because it doesn't

[1:26:54] actually it doesn't actually follow the

[1:26:56] trend of reasoning versus non-reasoning

[1:26:58] remembering reasoning previously I think

[1:27:01] I okay I don't have it um reasoning um

[1:27:04] the reasoning models doubling time

[1:27:06] reduced by half to 3.5 months

[1:27:09] So remember, you just need to wait 3.5

[1:27:11] months and the models capabilities will

[1:27:12] double. Um and the non-reasoning was 7

[1:27:15] months. Um so you need to wait seven

[1:27:17] months for the models to double in

[1:27:19] capability. Um but weird ML did not

[1:27:21] actually have this trend. Um the weird

[1:27:23] ML benchmark showed that actually the

[1:27:25] trend was like there is no trend. Um,

[1:27:29] and I think I'll just talk about this,

[1:27:31] you know, like one of the biggest

[1:27:32] problems of benchmarks is you need to

[1:27:34] constantly reinvent yourself and do

[1:27:37] reweings of combinations of benchmarks.

[1:27:40] For example, artificial analysis just

[1:27:41] recently released, you know, their new

[1:27:43] v4.1 benchmark and they showed the

[1:27:46] waiting of the benchmarks. Um, you know,

[1:27:48] GDP vow is 20%, terminal bench is 16%

[1:27:51] and so on. Um and so they they designed

[1:27:54] these numbers as waitings for each of

[1:27:56] those benchmarks and then they've

[1:27:57] averaged it up together. Um so the main

[1:28:00] question is how do you actually

[1:28:01] determine these numbers? Um and so this

[1:28:03] is more like a human approach. You know

[1:28:04] you have to determine these numbers. um

[1:28:07] you know arc AGI

[1:28:09] kind of saturated on ARC AGI 1 and so

[1:28:12] that's why we have ARC AGI 2 and that is

[1:28:14] also why we have ARC AGI 3 and my you

[1:28:17] know I guess once ARC AGI 3 is saturated

[1:28:19] then we have ARC AGI 4 5 6 7 whatever um

[1:28:22] and the main point is once you have

[1:28:24] benchmarks is it called good art I don't

[1:28:27] remember um the good the benchmark

[1:28:28] itself becomes useless because you know

[1:28:30] models will start benchmarking on this

[1:28:34] so one of the biggest problems of these

[1:28:36] larger models for cyber security for

[1:28:38] example um is mythos actually

[1:28:40] dramatically went out of the trend um

[1:28:44] and that is why you know many people are

[1:28:46] afraid of these you know mythos you know

[1:28:48] GPD 5 point 5.6 you they're afraid of

[1:28:51] these models because it went out of

[1:28:54] trend um you can see that mythos

[1:28:56] dramatically went out of trend um and

[1:28:59] you know even you know you know GP 5.6

[1:29:01] didn't really release that many

[1:29:02] benchmarks because it was in preview

[1:29:04] mode. Um, so this is from their system

[1:29:05] card. They showed for cyber security

[1:29:07] that Guby 5.6 does very very well.

[1:29:10] Um, in fact because Guby because Guby

[1:29:14] 5.6 they I think they only did terminal

[1:29:16] bench as their benchmark. They did not

[1:29:18] benchmark on anything else. Um, they did

[1:29:21] have in their system card they did have

[1:29:23] one benchmark which is very important.

[1:29:25] Um, and this is called the internal

[1:29:26] research debugging evaluation. Um, and

[1:29:29] this is OpenAI's own set of set of

[1:29:32] questions. So, you know, the custom open

[1:29:34] source, you know, if you want to, it's

[1:29:36] their own set of 10 questions or

[1:29:38] whatever that they benchmarked GBD 5.6

[1:29:41] on. Um, and according to them, it does

[1:29:43] very very it does better. Okay, I was

[1:29:45] going to say very, very well, but it's

[1:29:46] not. Um, it does better. Um, and you can

[1:29:49] see that GBD, it's actually kind of

[1:29:50] interesting. GBD 5.5 did worse than GBD

[1:29:54] 5.5 a four um for OpenAI's own internal

[1:29:58] um research evaluation um and you know

[1:30:01] GBD 5.6 definitely does much better

[1:30:03] right you can see that the G GBD 5.6

[1:30:05] soul, you know, if you extend it, it

[1:30:07] does much better. Um, but interestingly,

[1:30:09] Terara does better um somewhat

[1:30:12] sometimes. Um, yeah.

[1:30:17] And, you know, one of the biggest

[1:30:18] problems of these models that are

[1:30:20] getting getting better and better and

[1:30:21] better is I don't know if you guys know

[1:30:24] that, you know, open-source exploits are

[1:30:27] getting worse and worse and worse. Um

[1:30:29] and so the high exploit ratio you know

[1:30:31] number of critical vulnerabilities that

[1:30:33] were discovered has skyrocketed you know

[1:30:36] recently you know every single week or

[1:30:38] day some sort of open source package

[1:30:40] gets compromised um and they actually

[1:30:44] you know this plot shows that it's

[1:30:46] getting very problematic um and so you

[1:30:49] know claude mythos was released at this

[1:30:51] dotted line where you know most people

[1:30:52] they're not sure if it's because of

[1:30:54] claude mythos that these vulnerabilities

[1:30:56] are increasing most likely it's because

[1:30:58] open source you know we use lots of

[1:31:00] models call them many many many many

[1:31:02] times and we can you know automatically

[1:31:04] find exploits in these models

[1:31:08] but you know there is actually another

[1:31:09] point so in hacken news someone posted

[1:31:11] about this um is it just mythos and juby

[1:31:16] 5.6 six that do good on finding cyber

[1:31:19] security issues. It's not actually open

[1:31:22] source models also do very well. Um open

[1:31:25] source models do extremely well in

[1:31:27] finding cyber security threats and

[1:31:29] issues. Um you know there is some

[1:31:31] discussion on hacker news you know is

[1:31:33] this actually true or false? Um but you

[1:31:35] know according to some you know some

[1:31:37] researchers and cyber security people

[1:31:39] the main reason why you know mythos

[1:31:43] looked like it was very good on cyber

[1:31:45] security is because they bothered to

[1:31:46] actually check the open source code. Um

[1:31:48] and so if you actually give the open

[1:31:50] source models the full code base of

[1:31:52] these open source libraries they will

[1:31:55] find the bugs you know they will find

[1:31:57] cyber security issues. Um and all you

[1:31:59] need to do is core the model. Um and so

[1:32:02] I feel like you know that's the

[1:32:03] fundamental problem is mythos seems very

[1:32:05] powerful not because the model is

[1:32:07] powerful but because they actually

[1:32:09] bothered to test on all open source

[1:32:11] repos. Um and so if you do you know if

[1:32:14] you call all these open source models to

[1:32:16] detect for bugs for cyber security

[1:32:18] issues you will find bugs

[1:32:23] and you know as as you know recently you

[1:32:25] know as everyone knows fable is still

[1:32:28] banned for the majority of everyone. Um,

[1:32:30] and GBD 5.6, you know, is delayed a

[1:32:33] staggered release, right? So like Guby

[1:32:35] 5.6 preview was on Friday, right? So

[1:32:37] like a few days ago, and they said

[1:32:39] they're not going to be releasing to

[1:32:40] everyone. Um, and the main questions

[1:32:43] are, you know, in the open source world,

[1:32:45] in the clos world, people are asking, do

[1:32:48] we need a license to use these AI models

[1:32:51] for everyone? You know, like everyone in

[1:32:53] this room now, we have to have a license

[1:32:55] to use the models, like a driver's

[1:32:57] license. Um, do we need to get that? um

[1:33:00] is there going to be a delay in all of

[1:33:02] these releases? So every single time

[1:33:03] when a new model gets released only the

[1:33:06] trusted providers get these models. Um

[1:33:10] the next most important question how

[1:33:13] about open-source models you know okay

[1:33:16] the government the US government

[1:33:17] currently is like you know trying to

[1:33:18] like control Fable GPD 5.6

[1:33:21] The main question now is what do we do

[1:33:24] about open source models? You know, open

[1:33:25] models, open weight models. What will

[1:33:28] the government do to control the open

[1:33:31] source space? To be completely honest, I

[1:33:33] was quite surprised the government acted

[1:33:35] this early um in doing GBD 5.6 and fable

[1:33:38] control, right? I thought it was like

[1:33:39] maybe the end of the year or next year,

[1:33:41] but it seems like it's now. Um so the

[1:33:43] next question is what will happen to

[1:33:44] open source models? Will the government

[1:33:46] start controlling open source models? Um

[1:33:50] and the fundamental question is what

[1:33:52] defines frontier intelligence like the

[1:33:55] reason why the government is you know

[1:33:57] they're controlling these models is

[1:33:58] because they're very very powerful. Um

[1:34:00] so the main question is what actually

[1:34:02] defines intelligence? You know which

[1:34:04] benchmark do we use? Is it just based on

[1:34:07] one trillion parameters like you know

[1:34:09] how do we define whether a model can be

[1:34:11] banned or unbanned? Um and that is a

[1:34:13] very very important question. Um and we

[1:34:15] will we have a dark web of open models

[1:34:18] now you know do we need to torrent open

[1:34:21] models? Um and the most important

[1:34:23] question what is inference what are

[1:34:25] inference providers going to do now you

[1:34:27] know assuming assuming that the

[1:34:29] government has some sort of regulation

[1:34:30] on even open models. Um what is the

[1:34:34] inference prov what are they going to

[1:34:35] do? You know what are the inference

[1:34:36] providers going to do? Do they need to

[1:34:38] have license? Do they need to check that

[1:34:40] everyone has a license before you can

[1:34:42] use the model? Um or something like

[1:34:44] that. Um and so like you know these are

[1:34:46] very important questions that you know

[1:34:48] the government is currently like you

[1:34:50] know and the industry you know the

[1:34:51] entire AI ecosystem and industry we are

[1:34:54] trying to like you know what are the

[1:34:55] answers to these questions. Um and

[1:34:58] obviously you know if you were the

[1:34:59] government if I was the government it

[1:35:00] makes sense you know they do not want

[1:35:02] their critical infrastructure to be

[1:35:04] hacked. You know, remember open- source

[1:35:06] exploits are skyrocketing. If you change

[1:35:09] that y-axis, you know, not open source

[1:35:11] exploits, but like critical

[1:35:12] infrastructure exploits, you know,

[1:35:14] obviously the government's scared. Um,

[1:35:15] so it makes sense for them to like

[1:35:17] stagger the release. Um, but the main

[1:35:19] question is, you know, we're still in

[1:35:20] this we're still in this fog of war type

[1:35:23] approach, you know. Okay, not fog of

[1:35:25] war, just fog, a foggy, you know, we

[1:35:27] don't know what will happen for

[1:35:29] regulation. Um, yeah, that's very

[1:35:32] problematic. Um yeah. Oh okay. Anyone

[1:35:35] have any questions for cyber security

[1:35:38] regulation policy or whatever? Um or any

[1:35:41] takes as well

[1:35:44] questions?

[1:35:45] >> Yes.

[1:36:02] That is a good question. So is it is

[1:36:04] open source so the scare of open source

[1:36:06] models is it because you know anthropic

[1:36:09] keeps screaming about open source is bad

[1:36:11] open source is bad you know every single

[1:36:13] day open source is bad um

[1:36:16] yes

[1:36:18] and no I feel like it's true that you

[1:36:21] know there are some players in the

[1:36:22] closed source industry they want to shut

[1:36:23] down the open source ecosystem their

[1:36:26] view is if you give open source to

[1:36:27] anyone they will start hacking you know

[1:36:31] critical infrastructure they will start

[1:36:32] doing bad behavior. Um, and so that's

[1:36:35] kind of their view. Um, so yes, I agree

[1:36:38] that some of the closed source labs have

[1:36:41] caused this problem. Um, but it's

[1:36:44] actually kind of funny because currently

[1:36:45] the government is regulating them first

[1:36:48] and open source is still a question

[1:36:50] mark. Um, and so like it's kind of like

[1:36:52] I don't know, they probably stabbed

[1:36:53] themselves in the foot or something. I

[1:36:54] don't know whatever whatever the phrase

[1:36:55] is. Um but I feel like it's they did

[1:36:59] cause some controversy in terms of like

[1:37:01] saying open source is bad but in general

[1:37:03] open source models are actually good. Um

[1:37:06] so you could I mean theoretically you

[1:37:11] can use an open source model and you

[1:37:13] know run this on all repos and you will

[1:37:17] be able to find exploits and you can

[1:37:19] exploit. So they're not wrong. Um but I

[1:37:22] feel like you know who has the

[1:37:24] infrastructure to do this? um you know,

[1:37:26] GitHub might automatically detect you

[1:37:27] and ban you or something. I don't know.

[1:37:29] There's many there's many um layers of

[1:37:33] security for each section. Um and so

[1:37:35] like I I don't know. I I feel like it's

[1:37:37] somewhat overblown, but it is it is it's

[1:37:40] not 0% probability. So it is a problem.

[1:37:42] Um yeah, if that answers your question,

[1:37:45] but okay. Yes. So now we're going to be

[1:37:49] talking about kernels. Um

[1:37:51] so previously you know this is my

[1:37:53] favorite plot as usual. Um you know if

[1:37:57] we were in a different future you know

[1:37:59] if we were in a different timeline that

[1:38:01] we did not discover 01 preview models

[1:38:04] would have plateaued. I think that's the

[1:38:06] fundamental point of this plot. It shows

[1:38:08] that if we have never discovered

[1:38:09] reasoning we have never discovered 01

[1:38:12] whatever

[1:38:13] we will have plateaued. We will have

[1:38:15] plateaued in terms of accuracy. Um and

[1:38:17] that is not good. Um and because we have

[1:38:19] discovered this new paradigm of scaling,

[1:38:21] you know, models have continuously

[1:38:23] scaled even further. Um but my take is

[1:38:28] the reason why we have stopped scaling

[1:38:31] um based on you know the old approach is

[1:38:33] because the old approach only focused on

[1:38:35] hardware optimizations.

[1:38:37] We now have to move over to software

[1:38:39] optimizations and algorithmic

[1:38:41] optimizations. Um we you know we need to

[1:38:43] have new inventions of how do we scale

[1:38:46] AI even further. Um and we can't just

[1:38:48] rely on doing 10 trillion parameters or

[1:38:50] you know making the model bigger and

[1:38:51] bigger and bigger bigger. Um for example

[1:38:53] you know we have to do float a

[1:38:55] reinforcement learning. Um so if pytorch

[1:38:57] has this methodology where you can do

[1:38:59] floatate float for different precisions

[1:39:01] to make training faster. Um and that is

[1:39:04] one way. Um another way for example as a

[1:39:06] software approach for example as I

[1:39:07] previously said we found some bit you

[1:39:09] know issues in gradient accumulation. Um

[1:39:11] so when you do gradient accumulation um

[1:39:13] it was actually it was not calculated

[1:39:16] correctly during the loss calculation.

[1:39:18] Um and you can actually increase

[1:39:19] accuracy by 1 to 3% if you fix this

[1:39:21] small little issue.

[1:39:24] Yeah. So like you know the universal

[1:39:26] gradient accumulation bug fix was a

[1:39:28] software fix. It is not a hardware fix.

[1:39:30] Um and so the fundamental view is you

[1:39:33] need to do more and more software

[1:39:35] changes. Right? Another one for example

[1:39:37] Snowflake we collaborated them to make

[1:39:38] context long context fine-tuning 500k

[1:39:41] contact length this was all software

[1:39:43] improvements um another one is you know

[1:39:45] 12 times faster MLB training this is

[1:39:47] another software improvement um

[1:39:50] deepseeek you know they released

[1:39:52] something called deep spark which was

[1:39:53] just a few days um and they showed that

[1:39:56] they can make inference you know 50 50

[1:39:59] to 600% faster so six times faster than

[1:40:02] just normal MTP um and so this is a

[1:40:05] software ware methodology, right? Not a

[1:40:07] hardware methodology.

[1:40:09] And you know, diffusion Gemma, right?

[1:40:12] Gemma released a new diffusion model

[1:40:14] showcasing that you can get 2,000 tokens

[1:40:16] per second by using a new architecture,

[1:40:18] right? So using diffusion LLMs to do

[1:40:21] faster inference and again this is a

[1:40:24] software change. And my main point is is

[1:40:27] that in general, hardware innovations

[1:40:30] are getting less and less important. Um

[1:40:33] and hardware innovations are actually

[1:40:34] slowing down. Um so it's actually kind

[1:40:38] of interesting intelligence you know the

[1:40:40] scaling of you know intelligence in

[1:40:43] general it's kind of like Mo's law um

[1:40:45] it's kind of like a there is a

[1:40:47] relentless progress relentless approach

[1:40:49] to increase intelligence and the same

[1:40:51] with Mo's law um and so like in general

[1:40:54] you can see that you this is Mo's law

[1:40:56] over here the number of transistors has

[1:40:58] continuously increased um but you know

[1:41:01] single performance is not increasing it

[1:41:03] has staggered Um and so this is kind of

[1:41:06] like you know this kind of reminds me of

[1:41:09] you know this plot right scaling

[1:41:13] intelligence in terms of parameters

[1:41:14] probably has plateaued most likely you

[1:41:16] know hardware performance pre-training

[1:41:18] whatever we now need to go into this new

[1:41:20] reasoning paradigm to scale even further

[1:41:23] um so it kind of is like similar to the

[1:41:25] moors law type graph um kind of um and

[1:41:29] you can see if you see on this side the

[1:41:32] number representation of GP so my GPU is

[1:41:35] getting faster and faster and faster,

[1:41:36] right? It's not actually the GPU itself

[1:41:38] that's getting faster and faster and

[1:41:39] faster. Um, it's the represent number

[1:41:41] representation, right? So like they

[1:41:43] changed from float 32 all the way to

[1:41:45] float 4. Um, and this made GPUs 32 times

[1:41:49] faster. Um, so it's not eight times

[1:41:52] faster, right? It's not 32 divided by 4

[1:41:54] is eight times faster. It's 32 times

[1:41:56] faster. And the reason why is because of

[1:41:58] tensores, um, you know, the smaller

[1:42:00] mantesses, um, and so on. Um, and so

[1:42:03] like you can actually see, you know,

[1:42:04] even tensors with the introduction of

[1:42:06] tensores, it made the GPUs 12 times

[1:42:09] faster

[1:42:10] and so on. Actually, if you made the GPU

[1:42:13] smaller and smaller and smaller, it only

[1:42:14] made it three times faster. It's not

[1:42:16] even that important anymore. Um, and if

[1:42:19] you look at this plot, we are now at

[1:42:21] float 4. So most of the GPUs that we

[1:42:24] have now are at float four. What is

[1:42:27] next? Are we going to be having float

[1:42:29] three, float two, float one? Are we

[1:42:33] going to have float zero? Okay, no such

[1:42:34] thing. But anyways, the point is

[1:42:36] hardware is kind of at its limits,

[1:42:38] right? We're already at float 4. What is

[1:42:41] next? There is nothing next. Um, and so

[1:42:44] the so the answer to this question is

[1:42:46] there is nothing next. Um, and so now we

[1:42:48] need to move over to software, right?

[1:42:49] How do we make new algorithms? How do we

[1:42:51] make new methodologies to continue

[1:42:53] scaling? Um, I also made this table,

[1:42:56] right? I previously said why is you know

[1:42:58] you use float 32 um we change it to

[1:43:01] float 4 why is it why is it not eight

[1:43:04] times faster um and instead it's 32

[1:43:07] times faster right why is it 32 times

[1:43:08] faster and the reason is because when

[1:43:11] you use when you do floatingoint

[1:43:13] precision you have an exponent and a

[1:43:15] menta um and the transistor space the

[1:43:18] transistor space is the exponent plus

[1:43:21] the menta squared um and so the trick is

[1:43:25] if you make them in Tesla smaller and

[1:43:26] smaller and smaller,

[1:43:28] you square their number of improvements,

[1:43:31] right? So, float 32, float 32, you

[1:43:34] needed 537 transistors around, right?

[1:43:37] 537 transistors. Um, to go from float 32

[1:43:40] to float 16, you only need 105

[1:43:43] transistors. So, actually you made you

[1:43:46] made the number of transistors five

[1:43:48] times more, right? So, not two times,

[1:43:51] it's five times. Um, and so on so on so

[1:43:54] on. Um, so you know, I guess you can go

[1:43:57] to 1.58 bit. I guess you can do that.

[1:44:00] Um, but it's actually kind of

[1:44:01] interesting because 1.58 bit um is

[1:44:03] actually not that much faster. Um, so

[1:44:05] 1.58 bit is actually not that much

[1:44:07] faster um than float 8. Um, if you use

[1:44:10] um, you know, seven seven exponent and

[1:44:13] Messa 2. Um, there is another 1.58 bit

[1:44:15] which you use float 4. Um, so float 4 is

[1:44:18] 179 times faster than float 32. Um and

[1:44:21] the main question is we are already at

[1:44:23] three transistors right we are already

[1:44:25] around three transistors what are we

[1:44:27] going to do next two transistors or like

[1:44:30] one transistor so don't like you know

[1:44:33] most likely GPUs are not going to be

[1:44:34] getting faster um that's the fundamental

[1:44:36] question of this plot so GPUs are not

[1:44:38] going to be getting faster

[1:44:42] instead we need to focus on kernels

[1:44:44] right how do we make better kernels

[1:44:46] better algorithms how do we scale this

[1:44:49] instead right don't do don't do hardware

[1:44:51] optimizations anymore. Instead, how do

[1:44:54] we do, you know, these optimizations?

[1:44:57] Um, and so one of my favorite tools to

[1:44:59] use, you know, everyone should use this

[1:45:00] is just use torch compile. Um, so in my,

[1:45:04] you know, it's the modern, you know, the

[1:45:06] modern time, do not, as advice, do not

[1:45:10] learn how to write custom kernels. That

[1:45:13] is advice. Do not do kernel writing. Um

[1:45:16] and the reason why is because torch

[1:45:18] compile will take over all of kernel

[1:45:20] writing. Um so you can see for example

[1:45:23] this plot um torch compile was a red

[1:45:26] line right performance it doesn't look

[1:45:29] like it's doing very well right it does

[1:45:30] not look like it's doing very well

[1:45:32] versus handwritten kernels right

[1:45:34] handwritten kernels are the other ones

[1:45:36] right so torch compile doesn't look like

[1:45:37] it's doing very well but that's because

[1:45:40] that's an old PyTorch version if you

[1:45:43] have a newer PyTorch version torch

[1:45:45] compile wins dramatically right that's

[1:45:48] the orange line um and all of these are

[1:45:50] handwritten kernels. Oh, the okay the

[1:45:53] black line is torch compile plus no

[1:45:55] fusion. Um so that's another torch

[1:45:56] compile method. Um but the red line, the

[1:45:59] green line and the blue line okay the

[1:46:00] the blue line is just no torch compile

[1:46:03] just normal PyTorch. Um but the green

[1:46:06] line and the black the green line and

[1:46:08] the red line are handwritten kernels and

[1:46:11] you can see it does even worse than

[1:46:13] torch compile. So like my viewers like

[1:46:15] what's the point of writing kernels?

[1:46:17] Torch compile does even better than you.

[1:46:19] Um so the main point is you should

[1:46:21] always firstly look at torch compile

[1:46:24] right before you write a kernel use

[1:46:26] torch compile first do not start

[1:46:29] learning how to do triton or you know

[1:46:31] cuda or whatever is your favorite coding

[1:46:33] language for kernels don't do that

[1:46:36] instead use torch compile

[1:46:39] um even worse like you know this this

[1:46:41] was RMS norm um you know this is layer

[1:46:44] norm torch compile wins dramatically um

[1:46:47] you know versus handwritten kernels. So

[1:46:49] I would not you know definitely only use

[1:46:52] torch compile as your first try. Um do

[1:46:55] not write kernels first. Use torch

[1:46:57] compile.

[1:47:00] So the main takeaway is algorithms are

[1:47:02] much more important than hardware or

[1:47:05] whatever handwritten kernels. Right?

[1:47:06] Remember deepseek released deep you know

[1:47:09] deep you know deep spark you know

[1:47:11] there's other algorithms for speculative

[1:47:13] decoding like MTP D flash DSpark

[1:47:16] whatever all of these are algorithmic

[1:47:19] improvements and these made inference

[1:47:22] two times to six times faster right it

[1:47:24] wasn't like new some new hardware it

[1:47:26] wasn't some new hardware which made

[1:47:28] inference faster it was algorithms which

[1:47:31] made inference faster right flash

[1:47:33] attention flash you know FA2 FA3 three,

[1:47:36] flash attention four, flash attention

[1:47:38] five, six, seven, whatever, right? All

[1:47:40] of these are algorithmic improvements,

[1:47:43] right? Flash attention was essentially a

[1:47:45] trick to do memory movement much better.

[1:47:48] Um, so how do we like orchestrate memory

[1:47:51] movement and use the caching structure

[1:47:52] of the GPUs much better? Um, and so

[1:47:54] flash attention is also a algorithm.

[1:47:57] Gradient checkpointing, you know, one of

[1:47:59] the most important algorithms for

[1:48:01] training is gradient checkpointing. Um,

[1:48:04] and all it does is you do not save all

[1:48:06] the activations. You do a trick where

[1:48:08] you only save the activations for every

[1:48:10] single layer. Um, and then you skip all

[1:48:13] the intermediate activations in each

[1:48:14] layer. Um, and then you recomp compute

[1:48:16] the activations. Um, and gradient

[1:48:18] checkpointing saves memory by dramatic

[1:48:20] amounts by like 70%. Um, 70% memory

[1:48:24] reduction with no change in accuracy.

[1:48:27] And okay, training is a little bit

[1:48:29] slower maybe by 10% to 15%. Um and you

[1:48:32] know grading check checkpointing was an

[1:48:34] algorithm. Um and you know like in

[1:48:37] general you should also try to

[1:48:39] understand you know what is the new data

[1:48:41] processing tricks you know how do we

[1:48:42] like you know stagger data you know do

[1:48:45] we do do we do curriculum learning or

[1:48:47] something like that I don't know um what

[1:48:49] you know how do we clean the data set

[1:48:51] before we actually pre-train the model

[1:48:53] there are many tricks you can employ for

[1:48:54] data processing um and obviously you

[1:48:56] know there is still a group of people

[1:48:59] I don't know I take an opposite view

[1:49:01] there is a group of people who think

[1:49:02] mega kernels are the latest and greatest

[1:49:05] for kernels. You know what is a mega

[1:49:07] kernel? A mega kernel is when you take

[1:49:09] an entire you take an entire

[1:49:11] implementation of a model and it's just

[1:49:13] one kernel like one large kernel. Um ah

[1:49:17] maybe it's useful who knows um you know

[1:49:20] you know Nvidia you know Nvidia has a

[1:49:23] acquired Grock or something um and you

[1:49:25] know their view is for example you have

[1:49:27] two different systems right the LPU

[1:49:30] which is the Grock system does the

[1:49:33] decoding right so like the MLP layers

[1:49:35] the layers does the decoding and then

[1:49:37] the GPU so the Nvidia GPUs does the

[1:49:40] attention and the prefield um and so in

[1:49:43] general you know we might even have a

[1:49:45] future We have different types of

[1:49:46] hardware systems you know we have asex

[1:49:49] which are you know specially designed

[1:49:51] chips for you know computation and we

[1:49:54] have generalized systems like GPUs. Um

[1:49:56] and these asex and GPUs will collaborate

[1:49:58] with each other. Um so for example the

[1:50:01] attention you know the the attention

[1:50:04] will be for the GPUs and they will

[1:50:06] transfer over to the LPU to do you know

[1:50:09] the MLPS and so on. Um and then this is

[1:50:12] like a dance you know between them and

[1:50:14] you can also do like pipelining right

[1:50:16] you can imagine that there's like many

[1:50:17] many many replicas of this and they can

[1:50:19] like you know serve you know 20 people

[1:50:22] or you know 1,000 people in one go. Um

[1:50:25] and yeah so this is like another

[1:50:27] approach and you know this in my view

[1:50:30] this is kind of an opposite approach of

[1:50:32] mega kernels. So as a mega kernel your

[1:50:34] view is you want to combine the goal is

[1:50:37] to make the goal of a mega kernel is to

[1:50:39] make one kernel for the full forward

[1:50:42] path of a language model. Um and once

[1:50:44] you make one once you once you are able

[1:50:48] to make the language model the forward

[1:50:49] path into one kernel you can now make

[1:50:52] the entire language model with 32 layers

[1:50:54] as one kernel. Right? You can extend

[1:50:56] this and because the whole language

[1:50:59] model is one kernel you can even further

[1:51:01] extend it. Right? the prediction of the

[1:51:03] second token, the third token, the

[1:51:04] fourth token, the sixth token can all be

[1:51:06] just one kernel. Um, and unfortunately,

[1:51:09] this is very hard to do. It's very hard

[1:51:12] because attention is the problem, right?

[1:51:14] Attention has to see the tokens in the

[1:51:17] future. See the tokens in the past, not

[1:51:19] the future. That's cheating. Um, you

[1:51:21] have to see the tokens in the past. And

[1:51:23] that is a fundamental problem. Um and

[1:51:24] it's very hard to you know it's very

[1:51:27] hard to make a mega kernel to combine

[1:51:29] attention and the MLE or MLP layers.

[1:51:32] It's extremely complicated. So in

[1:51:34] general what what people do is they will

[1:51:36] make two kernels right one kernel for

[1:51:39] the attention part and the other kernel

[1:51:41] for the rest. Um and so you will see

[1:51:43] there are two kernels. Um and yeah so

[1:51:46] it's very hard to make one mega kernel

[1:51:48] but you can make two kernels.

[1:51:52] Yes. Okay. Any other questions? Any

[1:51:54] questions for kernels? So the main

[1:51:56] takeaway for Yes, a question. Yes, that

[1:51:58] is a very good question. So the question

[1:52:00] was because there's so many knobs for

[1:52:01] torch compile like 1,00 or something.

[1:52:04] How do we reduce the experimentation

[1:52:06] time to like you know find which knob is

[1:52:07] the best? Um so luckily we have

[1:52:10] something called bisection or binary

[1:52:13] search. That's the trick. So what we'll

[1:52:15] do is instead of checking every single

[1:52:17] 10,00 combination randomly sample. So

[1:52:19] random you do randomize bisection. You

[1:52:22] randomly sample 50% of the, you know,

[1:52:25] flags. You turn it on versus turning it

[1:52:28] off and then benchmark which one is

[1:52:30] better. And whichever one is better, you

[1:52:33] then narrow down the search. You again

[1:52:35] do 50% and 50% and 50% and 50%. So it's

[1:52:39] actually log two of 10,00. I don't know

[1:52:41] what that what is log 2 of 10,000. I

[1:52:42] don't know what that is. Um

[1:52:46] two times I don't know. Anyways, log

[1:52:48] 200. I think you need to do 30 steps, I

[1:52:50] think. I don't know. I don't remember

[1:52:51] whatever 2 to the^ of something is equal

[1:52:53] to 1,00 then log it. Um so you you only

[1:52:56] need to do you don't need to do you

[1:52:57] don't need to check all 1,00 knobs. You

[1:53:01] only need to check a few steps and then

[1:53:03] you will know which flag is the best. Um

[1:53:06] so the trick is to use binary search or

[1:53:08] bisection to do this approach. Um yeah.

[1:53:13] Yeah. Any other questions?

[1:53:17] >> Yes.

[1:53:19] >> What are your thoughts on

[1:53:38] So your question was

[1:53:41] what do I think about asex like you know

[1:53:44] cerebras gro sanova

[1:53:46] I don't know even startups new chips

[1:53:48] they do design their own chips I I feel

[1:53:50] like so the problem of ASEX is is it AS6

[1:53:53] or ASX or whatever the problem of

[1:53:56] specialized chips is the architecture

[1:53:59] itself needs to be

[1:54:02] hardcoded in some of the chips and that

[1:54:04] is the problem. If you hardcode some of

[1:54:07] the chips you know hard code the infra

[1:54:09] hardcode the architecture labs always

[1:54:12] like to change the architecture and so

[1:54:14] every single time when the lab changes

[1:54:15] the architecture you need to update the

[1:54:18] chip. Um but as a GPU the G the trick of

[1:54:22] GPUs is Nvidia has made it you know

[1:54:24] Nvidia, AMD, Intel whatever the GPU is

[1:54:27] extremely powerful because it has

[1:54:29] generalized asex inside of the GPU right

[1:54:33] the GPU is in fact a combination of

[1:54:35] ASEX. Um and the ASICH is just one large

[1:54:39] ASICH. Um so I think like in general a

[1:54:41] GPU is much better because you can

[1:54:44] customize what goes inside the GPU. you

[1:54:47] can disable stuff that goes inside the

[1:54:48] GPU and such. Yeah. So on so my view is

[1:54:51] I don't know I don't I don't want to say

[1:54:54] anything but like in general I don't

[1:54:56] think

[1:54:58] like you know previously as I mentioned

[1:55:00] you know hardware there is nowhere else

[1:55:03] to go you know we are at float four

[1:55:06] unless if the hardware providers invents

[1:55:08] float I don't know float zero then maybe

[1:55:11] we get four you know another four times

[1:55:12] faster but in general I think I think

[1:55:14] just people are focused too much on

[1:55:16] hardware and they have not looked that

[1:55:18] actually the biggest improvements is not

[1:55:20] hardware, it's software, right?

[1:55:22] Numerical precision, numerical precision

[1:55:24] was 32 times faster. Hardware is only

[1:55:28] three times faster, right? So hardware

[1:55:30] only contributed three times faster. Um

[1:55:32] oh actually d okay the die size you make

[1:55:34] the you make the GPU bigger, you get two

[1:55:36] times faster. That's that's kind of

[1:55:38] cheating. So I wouldn't really say

[1:55:39] that's improvement. Um but essentially

[1:55:40] if you make the hardware faster, you

[1:55:42] only get three times faster. Um so in my

[1:55:45] view hardware is probably overblown. you

[1:55:48] know hardware is actually not that

[1:55:49] important. The software was the trick

[1:55:52] that Nvidia, you know, Nvidia, AMD,

[1:55:54] Intel, all of these, you know, hardware

[1:55:56] providers, they banked on the fact that

[1:55:59] numerical precision was a trick and

[1:56:00] tensor, tensor, numerical precision,

[1:56:03] sparsity, you know, these software

[1:56:06] tricks. Um, okay. Well, tensor is not

[1:56:08] really software trick, but you know, a

[1:56:10] tensor is kind of an ASICH inside of the

[1:56:12] GPU. Um, and so like I feel like that's

[1:56:15] Yeah. So my view is I don't I don't

[1:56:16] really see a future for ASEX. That's my

[1:56:18] view. Um I think that ASEX are like

[1:56:20] instead,

[1:56:22] you know, to be honest, I'm actually

[1:56:23] quite surprised. We have lots of asset

[1:56:26] companies, but we have very few

[1:56:27] algorithm companies. Um and the reason

[1:56:30] why is because ASEX you can sell, right?

[1:56:32] Every single year you can upgrade. You

[1:56:34] know, this year you pay $1,000 to ASICH

[1:56:38] version one and the next year you have

[1:56:40] to upgrade, right? The problem with

[1:56:42] algorithms is algorithms is very hard to

[1:56:46] you know force the user or whatever to

[1:56:48] pay again and so that is why hardware is

[1:56:50] very popular because hardware is a very

[1:56:52] easy business model but for algorithms

[1:56:54] it gets more complicated right how are

[1:56:55] we going to monetize grading

[1:56:57] checkpointing I don't know right that's

[1:56:59] very hard um so but the main point is

[1:57:03] the large labs themselves I think like

[1:57:05] open air announced collaboration

[1:57:07] broadcom and suras whatever you know

[1:57:09] each lab themselves are going to the

[1:57:11] hardware provider and designing the chip

[1:57:13] with them. Um, so my view is like maybe

[1:57:16] we'll have more of these like

[1:57:16] collaboration approaches, but I feel

[1:57:18] like standalone standalone assets, I

[1:57:21] don't think they're going to last. Um,

[1:57:23] yeah, that's my take, I guess. Any other

[1:57:27] questions? Yes.

[1:57:46] Oh, you mean what are the types of

[1:57:47] kernels or

[1:57:55] >> Oh, okay. Okay. Okay. Um, so the

[1:57:57] question was what are the you know what

[1:57:58] are the changes for kernels or

[1:57:59] optimizations or stuff that is like

[1:58:02] interesting I guess for kernels. Um so

[1:58:04] most kernels when you write kernels the

[1:58:07] majority of them are are focused on

[1:58:10] memory movement reduction. How do we

[1:58:13] reduce memory movement? That's the

[1:58:14] majority of kernels. Um for example

[1:58:16] there's there's a trick called um you

[1:58:19] know there's a trick called fuse cross

[1:58:20] entropy loss where instead of making

[1:58:23] instead of the last layer of cont

[1:58:25] instead of materializing the full logs

[1:58:27] there is a trick you can do it in

[1:58:29] batches right you can do rowby row

[1:58:31] materialization. Um and so this will

[1:58:33] reduce memory by like a lot by like I

[1:58:35] don't know 10 GB or something if you

[1:58:37] have long context or even more. Um

[1:58:39] that's one way. Um the other kernels

[1:58:42] most kernels are called kernel fusion

[1:58:44] where you you have this like long

[1:58:46] pietorch function

[1:58:49] and all you do is you just write one

[1:58:50] kernel to do this whole pietorch

[1:58:52] function and torch compile will do this

[1:58:55] for you. So torch compile is very very

[1:58:58] good at doing kernel fusion right you

[1:59:00] give torch compile a function it will

[1:59:02] write a kernel a try kernel or whatever

[1:59:04] kernel and it will just fuse everything

[1:59:06] um it's very very effective for that um

[1:59:08] but I think in general kernels are just

[1:59:12] reducing memory movement um and so like

[1:59:15] I you know to be honest I don't really

[1:59:16] like to call it kernels most algorithms

[1:59:19] so most algorithms you either make

[1:59:21] training faster or reduce memory usage

[1:59:24] um but kernels in my view kernels is

[1:59:26] reduce memory movement. Um, and so most

[1:59:29] kernels is just memory movement, you

[1:59:31] know, memory movement optimization,

[1:59:33] right? How do we how do we use the

[1:59:34] caching structure of the GPUs? Um, you

[1:59:37] know, how do we not load the same

[1:59:39] variable twice or three times or

[1:59:40] whatever? Um, yeah, I'm not sure if that

[1:59:43] answer your question, but next

[1:59:45] reinforcement learning. Um, and after

[1:59:47] this will be reward hacking the agents.

[1:59:49] Um, so as a primer to I'm assuming most

[1:59:52] people know, do most people know

[1:59:53] reinforcement learning or do I need to

[1:59:55] prime people? Okay, I'll give a very

[1:59:57] fast primer for reinforcement learning.

[1:59:59] Okay, fast primer for reinforcement

[2:00:01] learning. Um, what is reinforcement

[2:00:04] learning? You have this environment such

[2:00:06] as this Pac-Man game. Um, and your goal

[2:00:09] is as the player, you know, to maximize

[2:00:13] reward. You want to eat all of the

[2:00:14] cookies, right? You want to eat all of

[2:00:16] the cookies, but also escape away from

[2:00:18] your the monsters. I don't actually know

[2:00:19] what they're called. Enemies, monsters,

[2:00:21] whatever, whatever they're called. Um,

[2:00:23] and your goal as Pac-Man is you want to

[2:00:25] maximize the amount of cookies that you

[2:00:27] eat. Um, and that is your reward. The

[2:00:30] reward is the cookies. Um, and the

[2:00:33] action is whether you go up, left, down,

[2:00:35] or right. Um, and the environment is the

[2:00:38] game. Another good example, you know,

[2:00:42] another way I like to explain

[2:00:43] reinforcement learning is the goal of

[2:00:45] reinforcement learning is you want to

[2:00:47] have more good and less bad um during

[2:00:50] training. Um so for example, at the very

[2:00:52] beginning of training, you ask the model

[2:00:54] what is 2 plus two? Um the answer is

[2:00:57] clearly four. Um but when the model

[2:01:00] starts training, it will be very dumb.

[2:01:02] It will be very bad. it will see B, you

[2:01:05] know, the model would just say B, D,

[2:01:07] cat, dog, house, mouse, whatever. Um,

[2:01:11] and the trick is for all of the bad

[2:01:13] responses, you want to decrease, you

[2:01:16] don't want you want to like negatively

[2:01:17] reward this or penalize it. You want to

[2:01:19] penalize the model if it says something

[2:01:21] bad and you want to increase the reward

[2:01:24] if it says the correct answer. Um, so

[2:01:26] that is the trick of reinforcement

[2:01:28] learning. You just want more good

[2:01:29] answers, less bad answers. Um, and if

[2:01:33] it's like, you know, very close to the

[2:01:34] correct answer. So, you know, three is

[2:01:36] very close to the correct answer. Um,

[2:01:38] you want to reward, you want to

[2:01:40] negatively reward this a little bit

[2:01:41] less, right? Because three is much

[2:01:44] closer to four than B or D. Um, so if

[2:01:47] you do B or D, you want to negatively

[2:01:49] reward it massively.

[2:01:52] In reinforcement learning, the trick is

[2:01:54] you have a verification system, right?

[2:01:57] You have a verifier to verify if the

[2:01:59] model is doing good or bad. Um so you'll

[2:02:02] call the model many many many times. Um

[2:02:04] and each of these examples you give a

[2:02:06] verification number right? So for

[2:02:08] example um the first example is very

[2:02:10] good so you give it a plus 10 score. Um

[2:02:13] the next example is like okay so you

[2:02:16] give it a minus5 score. Um and then the

[2:02:18] last example is very bad so you give it

[2:02:21] a minus 100 score. Um and reinforcement

[2:02:24] learning allows you to assign scores to

[2:02:26] each of those answers and questions. Um

[2:02:29] and so that's kind of reinforcement

[2:02:30] learning verifies. Um and the trick of

[2:02:33] reinforcement learning is my favorite

[2:02:36] phrase is patience is all you need. Um

[2:02:39] at the very beginning of training your

[2:02:42] model will do very bad, right? Your your

[2:02:45] reward will be 0000

[2:02:47] you know 0000. You wait for a very long

[2:02:49] time and then you will get the correct

[2:02:52] answer. Right? So for example this

[2:02:53] example you ask the model what is 2

[2:02:55] plus2 right? You start pre-training the

[2:02:57] model. you start pre-training the model,

[2:02:58] the model doesn't know what is two plus

[2:03:00] two, but after 10 years it will say

[2:03:03] four. Um, okay, obviously not 10 years,

[2:03:05] I'm just exaggerating. But after 10

[2:03:07] years, you wait 10 years, the model will

[2:03:09] then say four. Um, and

[2:03:13] that is why my favorite phrase is luck

[2:03:16] is all you need for reinforcement

[2:03:17] learning. You know, maybe by chance you

[2:03:19] will get four very quickly. Um but you

[2:03:22] know maybe you just have to wait and

[2:03:23] wait and wait and wait for eternity

[2:03:26] until reinforcement learning works. Um

[2:03:28] and so in general your reward will be

[2:03:31] zero for a very long time and then you

[2:03:33] will get you know you will increase

[2:03:34] reward um after the zero

[2:03:38] and you know for reinforcement learning

[2:03:41] there is a very simple algorithm for

[2:03:43] reinforcement learning and the trick of

[2:03:45] reinforcement learning is remember you

[2:03:47] know the final answer you want to you

[2:03:50] for example you know what is 2 plus two

[2:03:53] you know the answer is four but the

[2:03:55] problem is you don't know what is the

[2:03:57] reasoning trace, you know, did was the

[2:03:59] reasoning trace good or bad? So, for

[2:04:00] example, this example is, you know, to

[2:04:02] tell the model to create a fast matrix

[2:04:04] multiplication algorithm. Um, and the

[2:04:06] trick is if the answer is right, you

[2:04:08] reward every single line as plus 10

[2:04:11] score. Um, and if it's wrong, you reward

[2:04:16] every single score as minus 100. Um, and

[2:04:20] you know, Andre said, you know, in a

[2:04:22] Darkash podcast, reinforcement learning

[2:04:24] is kind of like sucking supervision bits

[2:04:26] through a straw. um you know we actually

[2:04:27] have stickers for them if you like. Um

[2:04:29] so you can get one of your stickers

[2:04:31] which we can distribute at the end. Um

[2:04:33] so Audrey's quote is this um you know

[2:04:35] and the main point is reinforcement

[2:04:37] learning is terrible but everything else

[2:04:39] is even worse. Um and so like you know

[2:04:42] reinforcement learning is the only tool

[2:04:43] we currently have that just works. It

[2:04:46] works but it's not very efficient. Um

[2:04:48] and okay actually okay that's the next

[2:04:52] section. Um but the main point is okay

[2:04:53] that's a reinforcement learning primer.

[2:04:55] Um I guess does anyone have questions on

[2:04:57] reinforcement learning primer?

[2:04:59] No.

[2:05:01] Okay, I'll skip to Okay, one question.

[2:05:02] Yes.

[2:05:07] >> I will mention that in the next section.

[2:05:09] Um there is there is like you know

[2:05:12] better RL methods. Um but in general

[2:05:15] reinforcement learning seems to do very

[2:05:17] well for now. Last I think this is the

[2:05:19] last topic or maybe not. Reward hacking

[2:05:21] and agents.

[2:05:23] The most fun one I guess. Um so okay for

[2:05:26] reinforcement learning reinforcement

[2:05:29] learning can only work if the

[2:05:31] probability of a good answer is more

[2:05:34] than zero. If it is less than zero

[2:05:37] reinforcement learning will never work.

[2:05:38] So that is a fun that is a constraint of

[2:05:41] reinforcement learning. The probability

[2:05:42] of a good answer must be more than zero.

[2:05:44] It can never be zero. Um and there are

[2:05:47] many many many problems of reinforcement

[2:05:49] learning not working. You know the

[2:05:52] formatting could be wrong. you know, you

[2:05:54] need to do some sort of priming or warm

[2:05:56] up. So, you have to do like some sort of

[2:05:57] trick to teach the model a little bit

[2:06:00] about, you know, about the thing that

[2:06:02] you're trying to maximize. Um, you have

[2:06:04] to do supervised finetuning. So, one of

[2:06:07] the tricks of reinforcement learning is

[2:06:08] you actually need to do SFT or

[2:06:10] fine-tuning to make the model not dumb,

[2:06:12] right? To make the probability of zero

[2:06:14] not zero, the probability of a good

[2:06:16] answer not zero. Um, you need to do good

[2:06:18] pre-training. Um and then the other

[2:06:20] problem is that you know during

[2:06:22] reinforcement learning it's just way too

[2:06:24] out of distribution that reinforcement

[2:06:26] learning is just very bad. Um so there

[2:06:27] are many many problems of reinforcement

[2:06:29] learning

[2:06:31] and I think we just you know for the

[2:06:33] trajectories reinforcement learning can

[2:06:35] assign incorrect rewards to the

[2:06:38] trajectory right remember the simple

[2:06:40] trick of reinforcement learning is we

[2:06:42] assign the reward to every single line

[2:06:44] as the same number right either this is

[2:06:46] good or this is bad and this is not good

[2:06:51] because why right you ask the model I

[2:06:53] need to find what is 2 plus two the

[2:06:55] answer is correct Right? The answer is

[2:06:57] four. The model says it's four. So you

[2:07:00] reward this whole thinking trace as plus

[2:07:02] 10. But this is wrong because as you can

[2:07:05] see in the thinking trace it says 2 plus

[2:07:07] 2 is equal to 10.

[2:07:09] Imagine you know in all of training

[2:07:12] because the trick of reinforcement

[2:07:14] learning is we just literally assign 10

[2:07:15] to every single line or minus 100 to

[2:07:18] every single line. We missed this bad

[2:07:21] you know bad thing. Um so you can

[2:07:23] imagine when we keep training the model

[2:07:26] the model might hack or do reward

[2:07:28] hacking or you know make gibberish it

[2:07:30] will do gibberish in between do some do

[2:07:33] some sort of like new machine language

[2:07:35] which we can't read and it will assign

[2:07:38] high score to that. Um and so this is a

[2:07:40] very big problem of reinforcement

[2:07:42] learning

[2:07:44] and the way to solve this or fix this is

[2:07:47] something called process supervision. Um

[2:07:49] and process supervision what you do is

[2:07:52] you manually check every single line not

[2:07:54] you don't just assign plus 10 to the

[2:07:56] final you know the answer is correct

[2:07:58] right the answer is correct plus 10

[2:08:00] assign every single line as plus 10 you

[2:08:02] don't do this instead what you do is you

[2:08:04] assign every single line as a different

[2:08:06] number right you assign some lines as

[2:08:09] plus 30 some lines is plus zero whatever

[2:08:12] the bad lines is minus 100 right this

[2:08:15] works very very well um unfortunately

[2:08:20] process vision cannot scale and it's

[2:08:22] extremely expensive to do right who's

[2:08:26] going to label this it's the you know

[2:08:29] the humans I guess right we have to

[2:08:30] label this data right we have to

[2:08:33] manually label for the labs I guess

[2:08:35] that's why labs sometimes like you know

[2:08:37] they go to scale call whatever right

[2:08:39] they ask people to label the data you

[2:08:41] know is this good is this bad is this

[2:08:43] good is this bad um and so on um but the

[2:08:46] trick is you can also use a language

[2:08:48] model, right? You can use LLM as a

[2:08:50] judge. You can you can call a language

[2:08:52] model to label every single line. And

[2:08:57] you know, my view is like, you know,

[2:08:58] large labs are going to be doing this

[2:08:59] process more. They will call their own

[2:09:01] model iteratively to re-review itself.

[2:09:05] Um, and that is one way their view is

[2:09:07] they can reach AGI, right? Just by by

[2:09:09] re-reviewing itself, right?

[2:09:11] re-evaluating itself, re-checking, doing

[2:09:14] doing you know automatic LLM as a judge

[2:09:16] process supervision something like this.

[2:09:20] Um

[2:09:21] but remember there is a problem because

[2:09:24] even if you do process supervision the

[2:09:26] model you are using the same model to

[2:09:28] evaluate the model right the same

[2:09:31] problem as we bench pro right su bench

[2:09:33] pro you use the LLM as a verifier to

[2:09:35] verify the LLM which is definitely not

[2:09:37] good um and the reason why is because

[2:09:39] you can do reward hacking

[2:09:42] um a very good example of reward hacking

[2:09:45] is your model starts cheating um so for

[2:09:48] example when you want to make a fast

[2:09:50] matrix multiplication algorithm. All it

[2:09:53] does is it deletes the timer. Um right

[2:09:56] remember you give the goal to max to

[2:09:58] reduce the time. Right? Reduce the time

[2:10:00] of the matrix multiplication algorithm.

[2:10:02] Um so all it will do is just delete the

[2:10:04] timer. Let's delete the timer. Set the

[2:10:06] timer to be zero and then there we

[2:10:09] maximize a reward. Um obviously this is

[2:10:11] not correct, right? Because the trick is

[2:10:13] you also have a correctness check,

[2:10:15] right? You check if the matrix

[2:10:17] multiplication is actually correct. Um

[2:10:19] but there is another way the model will

[2:10:22] edit your two matrices to be just zero.

[2:10:24] Um and what is 0 time 0? Zero. Um and so

[2:10:28] the correctness checks also fail. Um and

[2:10:31] so reward hacking becomes a very very

[2:10:33] big problem because these models can

[2:10:36] cheat and do special tricks to go around

[2:10:39] your actual model um your intent of the

[2:10:41] reward function.

[2:10:43] Another very problematic example is it's

[2:10:46] not just about reward hacking. It can

[2:10:48] actually destroy your computer. Right?

[2:10:51] By bad luck your model might output you

[2:10:54] know some sort of corruption methodology

[2:10:56] you know deleting you know doing rm-rf

[2:10:59] on your entire computer and bye-bye your

[2:11:01] computer's dead. Um and so like you know

[2:11:03] sometimes this also does happen. Um so

[2:11:05] it's not just reward hacking also trust

[2:11:07] of your tool cause you know trust of

[2:11:09] whether the model is actually doing good

[2:11:10] or bad is also a very big problem

[2:11:14] and remember this plot that I showed you

[2:11:16] know if you include GPD 5.6 cheating on

[2:11:19] the benchmarks you know looking at the

[2:11:21] answer you know remember the previously

[2:11:22] su bench uh bench pro and deep show that

[2:11:26] models also cheat by looking at the

[2:11:28] final answer you know you can see that

[2:11:30] with GBD 5.6 If you cheat, it does very

[2:11:32] well. But if you remove the cheating

[2:11:34] examples, it does, you know, within

[2:11:36] trend.

[2:11:38] And then, you know, maybe you might be

[2:11:39] thinking, oh, this reward hacking thing

[2:11:41] is like, oh, it's like very rare, you

[2:11:43] know, very rare. It's not going to

[2:11:44] happen in real world. Um, well, GLM 5.2

[2:11:48] during its training methodology, they

[2:11:50] specifically mentioned they have this

[2:11:51] new methodology for reinforcement

[2:11:53] learning called anti-hacking. Um, so GLM

[2:11:55] 5.2 introduced a method to stop, you

[2:11:59] know, reward hacking. Um and what they

[2:12:01] do is they added a link checker. Um so

[2:12:04] remember previously we mentioned how

[2:12:06] SweetBench Pro um the model will cheat

[2:12:09] and look at the answer. Um and so what

[2:12:12] GLM did is they had this check. Um so

[2:12:14] during reinforcement learning they will

[2:12:16] check every single tool call you make.

[2:12:18] Um and if the website if the website

[2:12:21] went to the answer you would stop that

[2:12:24] from happening. Um and so like GLM

[2:12:26] essentially outed this like you know

[2:12:27] filtering system for the entire

[2:12:29] reinforcement learning process. Um and

[2:12:30] you know according to them it worked

[2:12:32] very well

[2:12:34] and remember this plot about cheating

[2:12:36] examples. Um you know opus it seems like

[2:12:38] claude's models like to always cheat. Um

[2:12:40] and Jubet's models don't like to cheat.

[2:12:42] Um but the main takeaway is models will

[2:12:45] cheat because you are you are telling it

[2:12:48] you know like you know I want to

[2:12:50] maximize reward AB CDE EFG. Um and so

[2:12:52] the model will it will maximize it but

[2:12:55] it won't actually follow your intent. Um

[2:12:57] so you have to be very careful on this.

[2:12:59] Um in fact for GBD 5.1 during its

[2:13:02] training OpenAI mentioned that they had

[2:13:04] something called calculator hacking. Um

[2:13:06] and so in GBD 5.1 when they were

[2:13:08] training um they wanted to reward web

[2:13:12] tool use right so like you want to

[2:13:13] reward the model to use the web tool. Um

[2:13:16] but instead it didn't use the web tool

[2:13:18] it used the calculator to fake the web

[2:13:20] tool. Um and so during the training of

[2:13:22] GBD 5.1 this happened. Um and so like

[2:13:25] you know there's many many many many

[2:13:27] problems. I think they show yeah they

[2:13:29] showed calculator hacking. You know you

[2:13:31] lie about which tool you used. Um you

[2:13:34] know you conceal uncertainty you make

[2:13:36] facts up. Um so there's many many many

[2:13:39] problems with um reward hacking. And

[2:13:42] this is not fake right? So reward

[2:13:44] hacking is already in large labs

[2:13:45] training runs right? This is just 5.1.

[2:13:48] Um I don't think so they mentioned GB

[2:13:49] 5.2 or whatever. Yeah, but in general

[2:13:52] they showed that you know this thing

[2:13:54] does happen in real world um you know I

[2:13:57] don't know if you guys know GPU mode um

[2:13:59] but GPU mode does you know this

[2:14:00] leaderboard um for you know making

[2:14:02] faster kernels so if you do want to

[2:14:04] write your own kernels definitely post

[2:14:05] on GPU modes hackathon challenges um

[2:14:08] they're very very helpful and very

[2:14:09] useful um but you know someone managed

[2:14:12] to hack reward hack the GPU mode kernel

[2:14:16] competition um and remember in the

[2:14:19] Matrix multiplication example. There are

[2:14:22] two there are two there are two checks

[2:14:24] that we need to do right make the matrix

[2:14:26] multiplication algorithm faster but also

[2:14:29] it needs to be correct right there are

[2:14:31] two checks the correctness check and the

[2:14:33] timing check. Um and GPU mode also had

[2:14:37] two checks the correctness check and the

[2:14:39] timing check. Um and so what do you

[2:14:41] think the model did when the model the

[2:14:44] model knew the model actually knew that

[2:14:47] it was being evaluated on the

[2:14:48] correctness check right it learned oh

[2:14:51] I'm being evaluated on the correctness

[2:14:53] check I will now make correctness

[2:14:56] correct right so it will output the

[2:14:57] correct kernel and then the model knew

[2:15:00] that it was getting timed and what it

[2:15:03] what did it do it just it just did the

[2:15:06] algorithm once and then saved it and it

[2:15:09] skipped all the another 15 um you know

[2:15:11] tests. Um and so that's what the model

[2:15:13] did. So essentially the model learned

[2:15:15] the model learned that there were two

[2:15:17] tests, the correctness check and the

[2:15:19] timing check. And the model only did the

[2:15:22] correctness check correctly and then

[2:15:24] once it went into the regime of timing,

[2:15:26] it cheated. Um to be honest, it's

[2:15:29] actually quite scary. So essentially the

[2:15:30] model learned that you're doing these

[2:15:32] tests and the model actually knows

[2:15:34] you're doing the benchmarks. Um and so

[2:15:36] this is actually very interesting. Um

[2:15:38] and you know, oh yeah, this is this is

[2:15:40] more an you know, larger example. The

[2:15:42] correctness check was fine, but the

[2:15:44] timing check it cheated. Um and all it

[2:15:47] did is it launch, you know, there was

[2:15:48] supposed to be 15 calls in the first

[2:15:51] call. In the first core, it did all 15

[2:15:54] of the entire process, right? It did all

[2:15:56] of the 15 runs. Um and then core two to

[2:15:58] 15, it just did a Python dictionary look

[2:16:00] up. Um, yeah.

[2:16:02] >> I don't know if you know about this.

[2:16:04] Reminds me of Volkswagen where they

[2:16:06] initi.

[2:16:08] >> Yes, I someone did tell

[2:16:10] >> someone told me about it. Um,

[2:16:12] >> this is very similar. It's like, oh, I'm

[2:16:13] not doing this. Turn this off and

[2:16:18] >> Yeah, exactly. So, like, you know, it's

[2:16:19] not just models, I guess, that cheat.

[2:16:20] Even humans cheat, I guess. Yes. But I

[2:16:23] think it's called Goodart's law. That's

[2:16:24] the one. Like, if you have a benchmark,

[2:16:26] then the benchmark becomes Is it good

[2:16:29] law? I don't remember. Yes. Okay. Yeah.

[2:16:31] The benchmark essentially becomes

[2:16:32] useless because people just cheat to

[2:16:34] maximize reward. Um yes, I guess humans

[2:16:36] also cheat. Um yeah. Okay. Oh, my

[2:16:41] favorite example is um so on other labs,

[2:16:45] you know, you see on Twitter, on

[2:16:47] wherever, they say they made kernels 10

[2:16:50] times faster. Um

[2:16:53] no, no, no, that's not correct. They did

[2:16:55] not make kernels 10 times faster. In

[2:16:57] fact, if you look through the code, they

[2:16:58] have no, you know, no ops, so no

[2:17:00] operations. They also edit the timer.

[2:17:03] You know, they, as I literally

[2:17:04] described, you know, I described, they,

[2:17:06] you know, over here, um, you know, they

[2:17:09] edit the timer, they made matrices go to

[2:17:12] zero, they cheated. Um, and so like, you

[2:17:15] know, this actually happened in real

[2:17:17] world. So some, you know, some of the

[2:17:18] labs, they published papers claiming

[2:17:21] that they made kernels 10 times faster.

[2:17:23] But actually if you read through the

[2:17:25] code and the examples they these

[2:17:27] examples all cheated. Um and so you know

[2:17:29] they you know this is not very good in

[2:17:32] terms of you know reward hacking. You

[2:17:34] know reward hacking is a very big

[2:17:35] problem. Um and you know for example

[2:17:38] what some of the examples of kernel

[2:17:40] reward hacking you know not generating

[2:17:42] real CUDA code instead it cause or some

[2:17:45] sort of like you know already written

[2:17:47] system. um you have no up kernels which

[2:17:49] is essentially making the you know

[2:17:51] making the A and B matrix just zero. All

[2:17:53] it does is just doesn't do anything,

[2:17:55] right? It just the kernel is empty. Um,

[2:17:57] and you have like memory reuse, so you

[2:18:00] reuse the same answer over and over

[2:18:02] again. Um, you have timing

[2:18:03] synchronization issues. So that's

[2:18:05] cheating on the timer. Um and my view is

[2:18:08] like you know if you do publish faster

[2:18:10] kernels or faster you know matrix if you

[2:18:13] think that your AI agent has made

[2:18:16] kernels 10 times faster please verify

[2:18:19] you know please look through the code

[2:18:20] before publishing because it is a very

[2:18:23] it's not a very good look um and so and

[2:18:26] also the biggest issue that I feel like

[2:18:28] people are getting forgetting is you

[2:18:31] know you made kernels 10 times faster

[2:18:33] you made matrix multiplication 10 times

[2:18:36] faster

[2:18:38] There is a theoretical limit for matrix

[2:18:40] multiplication, right? Matrix

[2:18:42] multiplication, you know, it's not you

[2:18:45] can't make a faster because there's

[2:18:46] mathematical limits on how to make a

[2:18:48] faster, right? And so like, you know,

[2:18:49] matrix multiplication at the very very

[2:18:51] very olden times, you know, it's O of N

[2:18:53] cubed. You know, every single time

[2:18:55] researchers have make it faster and

[2:18:57] faster and faster and faster and faster.

[2:18:58] You know, it's now O of N to the^ of

[2:19:00] 2.371339,

[2:19:02] I guess. you know researchers every

[2:19:04] single year are trying to like make this

[2:19:05] number smaller and smaller and smaller

[2:19:07] and smaller. Um you know I guess like

[2:19:09] you know 1 1552 to 1339 is not that

[2:19:12] small you know not that big I guess. Um

[2:19:14] but you know they're having progress but

[2:19:16] the main point is you know these

[2:19:18] researchers you know they show with

[2:19:21] mathematical limits you cannot go faster

[2:19:23] than this and so how can you do reward

[2:19:25] hacking that is even faster than that.

[2:19:27] Um and so like the fundamental point is

[2:19:29] please verify you know to like the

[2:19:31] people who do research papers and stuff

[2:19:32] like that please confirm your model is

[2:19:35] not reward hacking. It is a very big big

[2:19:37] big problem. Um and you can see oh I

[2:19:40] think I only had one plot. Um but yes in

[2:19:42] general please do not do please check

[2:19:44] your I guess models. Um I guess that's

[2:19:47] all for the talk. Um you know yeah thank

[2:19:51] you everyone for coming. Oh more

[2:19:53] questions as well. Um okay thank you.

[2:19:55] Thank you. We also have

[2:19:58] Oh, yes. We have a whole bunch of

[2:20:00] stickers that you can take in the box

[2:20:02] over there and some pins and stuff.