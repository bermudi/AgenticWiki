---
type: youtube
url: https://www.youtube.com/watch?v=0vphxNt4wyk
title: "Don't Ship Skills Without Evals — Philipp Schmid, Google DeepMind"
channel: AI Engineer
date_saved: 2026-08-01T23:31:11.636Z
---

# Don't Ship Skills Without Evals — Philipp Schmid, Google DeepMind

[0:01] [music]

[0:12] >> Yes, so hi everyone. My name is Philip.

[0:14] I'm based out of Germany. I'm part of

[0:16] the Google DeepMind team mostly working

[0:18] on Gemini API and agents. And we are

[0:20] going to talk about why you should not

[0:22] ship skills without eval. And maybe

[0:25] before we start, I need a little bit of

[0:27] your help. So if you could raise your

[0:28] hands if you use coding agents to write

[0:31] code.

[0:32] So yeah, hopefully every every hand goes

[0:34] up, right? And do you use skills with

[0:37] it?

[0:38] Okay.

[0:39] Do you have evals for those skills?

[0:41] Okay, yeah, that's um not a lot of

[0:43] hands. Everyone uses skills, no one has

[0:45] evals. Hopefully we can fix that today.

[0:47] And like very important is like why

[0:49] checks fail in productions. And um Skill

[0:52] Bench is a very popular and nice like

[0:54] eval or benchmark which um index like

[0:57] over like 50,000 skills from like it up

[1:00] and like try to look into him and almost

[1:02] none of those skills had evals. Most of

[1:04] them were AI written um not really

[1:07] tested and it's very hard to know if

[1:10] your skill is good or bad because like

[1:12] agents are really non-deterministic. So

[1:15] you might not know if your uh task fails

[1:17] because your skill is bad or if your

[1:18] task fails because it's way too

[1:20] challenging for the model. So

[1:22] um very important um before we go into

[1:25] it there's I want to like really make

[1:26] sure that we know the difference between

[1:28] the agents we use and the agents we

[1:30] build. Um most of us use agents for

[1:33] writing code, doing productivity work.

[1:35] That's the agents we use. It's like

[1:37] anti-gravity, cursor, Claude code. And

[1:40] there are you are the engineer and you

[1:41] have context about skills, right? If you

[1:44] write some prompt to I don't know, like

[1:46] help me build a new Gemini API feature.

[1:49] And if your agent does not invoke the

[1:51] skill on the first time, you will notice

[1:53] it very quickly. You stop your your task

[1:56] and reprompt it or like use slash

[1:58] commands for for triggering those

[1:59] skills. When you build an agent inside

[2:02] your application for consumer or

[2:04] customers, they have no idea about what

[2:06] a skill is. They don't start their

[2:08] prompt with use customer support skill

[2:11] to like help me refund or use refund

[2:14] skill to help me solve my problem. So,

[2:17] there's a big difference between the

[2:18] agents we use and how we use skills and

[2:21] the agents we build and how our

[2:22] customers might want to use skills in

[2:25] like the context there. And what is a

[2:28] skill? I mean, every one of us knows

[2:30] hopefully in by now what a skill is.

[2:31] It's like basically really a folder with

[2:33] a skills.md file in it and then some

[2:35] additional assets to make that skill

[2:37] really work. And the big difference with

[2:39] skills is that they work on progressive

[2:42] disclosure. So, most of the skills start

[2:45] very small. So, you have the title and a

[2:47] description. The description is normally

[2:49] part of

[2:51] the model's context. So, the model knows

[2:52] when to use the skill. Second layer is

[2:54] we have a skills body with more

[2:56] instructions, more details, and

[2:58] hopefully more references to external

[3:00] files. And then you can really go deep

[3:02] in those reference files where there's

[3:04] all of the context the model needs to

[3:05] discover to to solve the task.

[3:07] And I like to differentiate between two

[3:10] kinds of skills. So, they are capability

[3:12] skills and preference skills. Capability

[3:14] skills teach models something they

[3:16] cannot do consistently at the moment.

[3:19] Maybe it's like, I don't know, like

[3:21] tracing some logs, creating a new React

[3:23] app. And those capability skills are

[3:26] temporary. So, the better our model

[3:28] gets, the more likely it is that we can

[3:31] remove those skills. And Evals will tell

[3:33] us when we can retire skill and when

[3:35] not. And then we have preference skills.

[3:37] Those are more durable, mostly encode

[3:40] some references. So, if you have a

[3:42] specific workflow in your team or a

[3:44] specific style language or other

[3:47] preferences which are very

[3:49] specific to your company,

[3:51] Um will have or create preference skills

[3:54] and those uh preference skills are then

[3:56] protected with e-walls where because

[3:59] most of like the foundation models might

[4:01] not uh integrate the knowledge which is

[4:03] very specific to your use case or your

[4:05] domain. And preference skills are very

[4:07] valuable, so we really want to make sure

[4:09] that those are working and we don't like

[4:11] update our agents to uh degrade

[4:14] performance.

[4:15] So, do skills work? Yes, they do work

[4:18] and I going back to a skills bench which

[4:20] has an update of 1.1 which has evaluated

[4:24] all kinds of open and closed models in

[4:26] different harnesses showing that skills

[4:29] on average improve the performance by

[4:30] roughly 15%. Skills bench covers around

[4:34] 100 different tasks uh based on like

[4:36] coding and also productivity across

[4:39] different languages. It's uh openly

[4:41] available and they have a very nice

[4:42] website, a very nice leaderboard, are

[4:44] also very open for uh community

[4:46] contributions. And then they did a

[4:49] second analysis on self-generated or

[4:52] AI-generated skills, right? It's very

[4:54] easy if you are in a coding agent and

[4:55] you work on something, tell the model

[4:58] create a skill and then it writes a

[4:59] skill.md file. We maybe look at it very

[5:01] closely. It roughly covers what we want

[5:04] to do and then we just accept it and

[5:07] start using it. And what I found out is

[5:10] that

[5:11] human-written skills are the best we can

[5:14] provide.

[5:15] Uh AI-generated skills can uh impact

[5:18] performance negatively. And that skills

[5:21] or skills.md files should be below 500

[5:24] lines of words. So, if you have your

[5:26] laptop open and have a skill available,

[5:29] if you open that and if it's above 500

[5:31] lines, you should definitely look at the

[5:32] skill after our session.

[5:34] And um

[5:36] the last topic about what is a skill and

[5:39] how a skill works, uh we have different

[5:41] ways of triggering our skill, right? We

[5:43] can have a model-triggered skill meaning

[5:45] uh based on the context and the

[5:46] description, the model decides to use or

[5:48] read a skill to, uh uh,

[5:50] get more context to solve a task. And

[5:52] then there are user-invoked skills. And

[5:54] I think people underestimate how

[5:57] powerful user-invoked skills are. Um,

[6:00] and they most of the time just accept,

[6:02] uh,

[6:03] the

[6:04] overhead by pro- like adding it into the

[6:06] context. I have like many user-invoked

[6:08] skills for more workflow type of tasks

[6:11] like creating a pull request, uh,

[6:13] staging documentation, and all like of

[6:15] the very

[6:17] uh,

[6:18] normal dev work which could be run in a

[6:20] script should most likely be a

[6:22] user-invoked, uh, skill. And when you

[6:25] build agents for customer, you don't

[6:27] have those user-invoked skills. We are

[6:29] only working in the model-invoked

[6:30] skills, and that's where we are like

[6:32] focusing on for the small eval section

[6:34] we are going to look in a second. So,

[6:37] writing skills, um, is an important

[6:39] topic. Uh, we're going to look at eight,

[6:42] um,

[6:43] examples on how or tips on how you can

[6:46] write good skills. And most importantly,

[6:49] if you work with model-invoked skills is

[6:51] the description because the description

[6:53] are most of the time two sentences we

[6:55] provide to the system instruction to

[6:57] help the model

[6:58] know when it should use a skill or not.

[7:00] And it's bad if your

[7:03] description is too weak because then it

[7:04] might trigger too often or the it might

[7:07] not be triggered if you need it. So,

[7:09] very important is the the why and the

[7:12] how for the model. So, why it should use

[7:13] that skill and then how it should use

[7:15] that skill. Um, very common is like use

[7:17] that skill if you are working on a React

[7:19] application, for example. And then, of

[7:21] course, the when.

[7:23] And we should write directives instead

[7:25] of essays. So, we should not say

[7:28] something like, "Hey,

[7:29] the Interactions API is recommended for

[7:32] multi-chat, um,

[7:34] multi-chat because it handles like

[7:35] session state and it's like where you

[7:37] should be way more directive like use

[7:39] the Interactions API if you're working

[7:41] on like a chat application. So, you need

[7:43] to give the model like clear

[7:45] instructions and directives on when it

[7:47] should use the skill and how it should

[7:49] use the skill. And

[7:51] similar to what we have seen in the

[7:52] skills bench results, we should keep the

[7:55] skill lean and layer information. So,

[7:57] the description is the cost you always

[8:00] pay on every model invocation. So, on

[8:02] every model call, the description is

[8:04] part of the model context. So, you

[8:06] always pay that 100 200 tokens cost and

[8:09] you don't want to have a super long

[8:10] description because then you always have

[8:12] to pay that. When you have a very long

[8:14] skill MD file, it will be always read

[8:16] into context when the model decides to

[8:18] read the the skill or to use the skill.

[8:20] Uh which can be expensive as well.

[8:22] That's why we want to keep it as concise

[8:24] as possible, but still include all of

[8:26] the reference and details for the model

[8:28] to solve the task. And then of course,

[8:29] the layer three is like we can have

[8:31] those reference files where the model

[8:33] needs to like um go really deep into a

[8:35] very specific task. And a good example

[8:37] for this is like if you are working in

[8:39] like maybe a multi-cloud environment and

[8:41] you have a skill to deploy your

[8:43] application, you might need instruction

[8:45] to deploying to AWS and deploying to

[8:47] Google Cloud. Those should not be part

[8:49] of your skill MD file. Those should be

[8:51] references. That you have a reference

[8:52] for AWS, reference for Google Cloud,

[8:55] maybe a reference for Azure so that the

[8:56] model can basically explore based on the

[8:59] context where it should go to get all of

[9:01] that information.

[9:03] Then we should set the right level of

[9:04] freedom. Um I see many people

[9:07] very clearly describing the exact

[9:10] workflow in a skill. Step one, go there.

[9:12] Step two, do this. Step three, do this.

[9:14] If you have those type of use cases, you

[9:16] should not use skills. You maybe you

[9:18] should write a script because if the the

[9:20] process or the workflow is always the

[9:22] same, you don't need to waste models and

[9:24] tokens for that exercise. You can create

[9:27] a script. You can tell the model use

[9:29] that script to run a specific workflow.

[9:31] So, rather define goals and constraints.

[9:34] So, if you need to like deploy to your

[9:37] update or stage your documentation,

[9:39] describe how the model can do that. Or

[9:42] like for your database updating a

[9:44] config, you should not say like read the

[9:46] config, update the port, and then like

[9:48] deploy again. The model knows what to

[9:50] do. Just like hey, if we need to change

[9:52] the config, here's the file, make the

[9:54] change. Then uh don't skip negative

[9:56] cases. So, we always look at the when we

[10:00] want to use this skill, but most of the

[10:01] time we don't look at when we don't want

[10:03] to use this skill. So, if we have a

[10:05] description for our skill which says use

[10:07] it for

[10:09] web development tasks, it might over

[10:11] trigger. Maybe you work with React,

[10:14] maybe you also work with Angular, and

[10:16] the model always loads the skill if you

[10:18] are working in like a web development

[10:19] environment, but if you are very

[10:21] specific for like hey, only use that

[10:23] skill for React components or for

[10:26] Tailwind CSS, then the model knows hey,

[10:28] that's very specific for one to use. And

[10:31] with Evals, we can also identify those.

[10:34] Um

[10:35] And then test early. So, that's what we

[10:36] are going to look at. We should really

[10:38] try to test when you create a new skill.

[10:40] Always try to create 10 of 20 prompts. I

[10:43] like to create five for like the happy

[10:45] path. So, when do I want to use that

[10:47] skill? Five when I don't want to use

[10:49] that skill just to make sure the model

[10:51] is not over triggering the skill and

[10:53] confusing itself. And then if you have

[10:55] already some customer or production

[10:58] traces, try to include those as well

[11:00] because nothing is better than than

[11:01] real-world data.

[11:03] And then

[11:04] tip seven which is quite new and I have

[11:06] to give all credits to Matt. So, if you

[11:07] don't know Matt, he's a great AI

[11:09] educator and you should definitely

[11:10] follow him. He published a tweet and

[11:12] also a skill on like killing all of the

[11:14] no-ops. And what he found is that AI

[11:17] generated skills tend to include a lot

[11:20] of no-ops. And no-ops basically is an

[11:22] instruction which does nothing to change

[11:25] the agent's behavior. It's like before

[11:27] making an implementation easy to read.

[11:29] Like the model knows how it when it

[11:32] should make something easy to read or

[11:34] write clear high-quality code. I mean,

[11:36] like that's what we expect from the

[11:37] model to do without telling it really.

[11:39] So, um definitely look at those no-ops.

[11:41] He have has published a very good skill

[11:43] in in his like skills repository. Uh and

[11:46] then last but not least, uh know when

[11:49] you should retire skill. Um skills are

[11:52] not

[11:53] there to live forever. Models get

[11:55] better, behaviors change, expectation

[11:58] change, um the environment changes. So,

[12:01] um always try to run evals with and

[12:04] without the skill enabled. And if the

[12:06] model achieves the performance without

[12:08] even like triggering the skill, you know

[12:10] you can retire that skill, save the cost

[12:12] uh for your tokens, and then also um

[12:16] don't keep like it redundant. So, save

[12:19] cost at the end and maintenance also as

[12:20] well. And to look at a little bit of a

[12:23] practical example and also how you can

[12:25] create your own small eval or eval

[12:28] harness for skills. Um earlier this year

[12:31] we wanted to create a new skill for the

[12:33] Gemini Interactions API. So, the Gemini

[12:35] Interactions API is our new interface

[12:37] for working with Gemini models and with

[12:39] agents. And the Interactions API was

[12:42] released after the last training of

[12:44] Gemini. So, the model or Gemini 3 and

[12:47] like 3.1 or even 3.5 has no context

[12:50] about what is the

[12:52] the Gemini Interactions API. So, we

[12:54] decided, "Okay, let's look

[12:57] uh at creating a skill to help the model

[12:59] create good code for the Interactions

[13:01] API, to use the latest models." And to

[13:03] do that, we created 117 test cases.

[13:07] Those are uh based on like data we see

[13:10] uh from real users trying to generate uh

[13:12] Gemini code from um synthetic generated

[13:15] uh test cases, and also from like

[13:18] feedback we see people like, "Hey, the

[13:19] model is like using Gemini 2.0 even if

[13:22] we are already on 3.0." And the the end

[13:25] result was that we improved the the

[13:27] performance up to like almost 90% for

[13:31] generating valid interactions API code

[13:34] with the latest Gemini models. And to do

[13:37] this, we

[13:38] basically only needed like two very

[13:41] simple uh assets. So, one of that was a

[13:45] JSON file with all of our test cases.

[13:49] And it's very like no clear structure.

[13:51] It's like, "Hey, we have a prompt."

[13:53] That's basically what we expect the user

[13:54] to provide. We have a language because

[13:56] we wanted to test the skill against

[13:58] TypeScript and Python.

[14:00] Uh we have a should trigger. That's

[14:01] basically there to tell us if the agent

[14:04] should read the skill or not read the

[14:06] skill. And then we have different

[14:08] expected checks. Uh we look at them in a

[14:10] little bit. Those are basically uh very

[14:13] simple asserts

[14:15] uh for that prompt if it should trigger

[14:17] or not. And then we have a very basic

[14:18] Python script which runs a coding agent.

[14:20] In this case, it was the Gemini CLI

[14:22] which uh passes the output and returns

[14:25] runs it so we can like take a look at

[14:26] the the outcome whether we have valid

[14:29] code for the interactions API or not.

[14:32] And uh most of the tests or evals for

[14:36] skills can be

[14:38] regex. It's like very amazing how good

[14:42] of regex you can write using coding

[14:44] agents. And it's really for us it was

[14:46] all about, "Okay, do we use the correct

[14:48] SDK? Do we use the correct um model? Do

[14:51] we use the correct methods? Do we use

[14:54] any old patterns?" And we created um

[14:57] very basic asserts for all of those

[14:59] cases, which are very cheap to run. So,

[15:01] we can run our skill against the evals

[15:04] many times. So, if a new model releases,

[15:06] we have a very easy way to update those

[15:08] asserts to the latest model IDs. And

[15:10] it's very cheap to run for it well

[15:12] because we don't need to use like LLM as

[15:14] a judge. But of course, you can use LLM

[15:16] as a judge if you have like more complex

[15:18] skills which need to look at the whole

[15:21] traces or the whole steps taken. And a

[15:24] very easy case is like you just create

[15:26] LLM as a judge with a rubric on like

[15:29] what you want to look at, and then like

[15:31] take the output, put it through the LLM

[15:33] as a judge, try to get a pass or a fail,

[15:35] and then if it fails, look at the data,

[15:37] and then like try to um improve your

[15:40] skill based on that.

[15:41] And that's also how we now uh eval

[15:44] skills at Google DeepMind. So, the

[15:47] we don't use YAML, but it's like just as

[15:49] like uh an example. Uh we have um

[15:53] tests or evals alongside every skill we

[15:56] have internally at Google DeepMind.

[15:59] Um every test has multiple cases with

[16:01] like a prompt. Uh we all run them in

[16:04] like clear workspaces, so you can define

[16:07] your workspace or environment if it

[16:08] should include additional files like

[16:10] your application environments. You have

[16:13] uh startup commands, which basically

[16:16] preloads or installs libraries into the

[16:18] environment. And then you have script

[16:20] evals or data. Those are those regex

[16:22] where we look at all of the traces to

[16:24] see what the skill triggered, was a

[16:26] certain command run, was a certain CLI

[16:28] run. And then we also have LLM as a

[16:30] judge where we have some expectations,

[16:32] which are basically matched against like

[16:34] hey, did it trigger the skill, did it

[16:37] run a certain bash command to like

[16:39] also evaluate it. And we run them on

[16:42] every change to the skill. So, if a

[16:44] change happens to or like a diff to the

[16:47] skill file, the eval will be run, and

[16:50] there will also be a result, and the

[16:52] change will not be merged if it is not

[16:54] improving the test cases. So, we always

[16:57] have those regression tests for every

[16:59] change to the skill, and you can only

[17:02] change the skill if it improves the eval

[17:04] or add new evals. And um

[17:08] yeah, that that's how we we we basically

[17:10] manage it. And then last but not least,

[17:12] uh 10

[17:14] examples for best practices for skills.

[17:16] You don't need to take photos. They are

[17:18] in the blog post I can share later. So,

[17:21] um

[17:22] the I mean, we had it many, many times.

[17:24] The the skill skill description is very

[17:26] important. Uh we have seen 50% of the

[17:27] failures uh because the skill was not

[17:30] triggered correctly because the prompt

[17:31] of the user was not uh detailed enough

[17:34] for the model to understand, "Hey, I

[17:35] need to use that skill to solve that

[17:37] task." And especially if you build

[17:39] agents for others, they are not aware of

[17:42] the skill descriptions you have for your

[17:45] model and for your skill. So, they might

[17:47] write something very um shallow and then

[17:51] the model needs to know, "Okay, I need

[17:53] to trigger that skill."

[17:54] Um we should write directors over

[17:56] passive information. So, we should

[17:57] always think about it. You should tell

[17:59] the agent what to do or not what to do

[18:02] and not just like, "Hey, if you feel

[18:03] happy today, please use the skill." Um

[18:06] include negative tests. Uh we always

[18:08] forget negative tests. Start small. Even

[18:11] like 10 to 20 skill eval samples are

[18:14] better than nothing. You will be

[18:16] surprised on how much you will find even

[18:18] from like five to 10 examples. And then

[18:21] like definitely create outcomes, not

[18:22] paths. Uh we don't want to test if the

[18:25] model loads the skill on like the first

[18:26] turn. We really want to test if it can

[18:29] achieve the task based on the prompt.

[18:31] And if it loads the skill, it loads the

[18:32] skill. If not, then not. If it um loads

[18:35] the skill after five turns, that's also

[18:37] okay. Then we want to have isolated runs

[18:40] because

[18:42] coding agents are very good at finding

[18:45] or cheating. So, if you run inside uh

[18:49] your existing environment, it might look

[18:50] up previous chats or it might look up

[18:53] some other executions and then like try

[18:55] to cheat it and get the context from the

[18:57] skill without even using the skill. Then

[18:59] definitely run more than one trial when

[19:02] running evals. Like agents, our models

[19:04] are non-deterministic.

[19:06] Maybe the first one works, the second

[19:08] one doesn't. So, always run the to six

[19:11] uh trials per case and to measure

[19:13] reliability Uh um test across different

[19:16] harnesses if you work with like or if

[19:18] you have employees or

[19:19] um people working with like different

[19:21] harnesses, not only just evaluate

[19:23] against Claude or anti-gravity. If you

[19:25] have people working with cursor, try to

[19:27] include them as well because agent

[19:29] harnesses behave differently and of

[19:31] course model behaves differently. So,

[19:33] maybe your skill is very good with a

[19:35] Gemini but very bad with Codex and then

[19:37] you have uh customers, consumers using

[19:39] your harness with Codex and then it

[19:41] fails. And then um create your evals.

[19:43] So, if your um

[19:45] model is

[19:47] good enough that it doesn't need the

[19:48] skill anymore, keep that eval. You don't

[19:50] need to throw that eval away because you

[19:52] throw the skill away. You can keep that

[19:53] eval to make sure that the model or the

[19:55] agent keeps the performance and as soon

[19:57] as you start seeing some degradation,

[19:59] you can reintroduce the skill. You can

[20:01] maybe tweak some other tools or pieces

[20:03] to keep like the the performance up and

[20:06] then really detect when you can retire

[20:09] skill and you will be very surprised

[20:10] with all of the model updates how fast

[20:13] you can retire skill which you might

[20:14] need it like six months ago but not

[20:16] today anymore. And I have some homework

[20:20] for you. So, if you are back from

[20:22] holiday on Monday,

[20:23] um

[20:24] pick

[20:25] uh the most used skill and write five

[20:27] test prompts. Uh you can also use your

[20:29] coding agent and ask it to see look at

[20:31] your trajectories which are my most used

[20:33] skills and then try to create some some

[20:36] skills. It's you have seen it's like

[20:37] very easy to write your eval harness.

[20:40] It's like a JSON or YAML file and then

[20:42] like some Python script which runs your

[20:44] coding agent or your agent harness and

[20:45] then like look at the outcome.

[20:48] Definitely uh try to look at the

[20:50] removing no-ops. Maybe it does not

[20:52] change the eval performance but it helps

[20:54] you save cost because all of the tokens

[20:56] which are not helpful or not changing

[20:59] the agent behavior are money you will

[21:02] like spend. So, look at um writing great

[21:05] skills uh from Matt. It's you can find

[21:08] it on on GitHub and then also run

[21:11] ablation test. So, run always evals with

[21:13] your skill loaded and without your skill

[21:15] loaded. Only that way you will know when

[21:17] you can retire skill or if a skill is

[21:19] really helpful for your performance. So,

[21:22] don't ship skills without evals.

[21:25] Thank you.

[21:25] >> [applause]
