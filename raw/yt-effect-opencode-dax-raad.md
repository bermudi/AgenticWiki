---
title: "Effect at OpenCode | Dax Raad | Effect Miami 🇺🇸 2026"
author: "Effect | TypeScript at Scale"
source: "youtube.com"
url: "https://www.youtube.com/watch?v=hY279-A2fC4"
date_saved: "2026-05-31T18:04:41.726Z"
---

# Effect at OpenCode | Dax Raad | Effect Miami 🇺🇸 2026

[0:00] Uh, okay. Hi everybody. Um, well, sounds like  nobody has ever tried to use effect or some of you

[0:06] have used effect. Some of you in production. Um,  I'm showing you guys my slack screen. [laughter]

[0:16] Uh, anyway, uh, so yeah, I'm I'm still somewhat  new to effect. I have production experience

[0:24] because we have kind of carelessly deployed a beta  version of effect into production to millions of

[0:30] users. But uh it's gone well so far. Um I'll  tell you a little bit about how we got there,

[0:37] why we got there. Um so again, my name is  Dax. I work at a company called Anomaly.

[0:41] Uh we make a coding agent called  OpenCode. Um and a couple months ago,

[0:47] we made a crazy decision to rewrite all  of Open Code using effect. Um, you know,

[0:53] rewrites are something you're never supposed  to do. Everyone tells you it's a bad idea.

[0:56] It definitely feels like a bad idea every day that  we're doing it. Um, but we did decide to do this

[1:03] and I want to talk a little bit about like what  led us to that decision. Um, so for context,

[1:08] OpenCode is a coding agent like Claude code.  Um, it's like that, but it's open source,

[1:13] works with any model. Um, it got to this it got  to a pretty big scale. I think we'll probably hit

[1:19] uh 8 million monthly active users this month. Um  and at that scale, thank you. Um at that scale,

[1:30] any little thing, any little shortcut that you've  taken in the process to get there, you're like,

[1:35] and we all do this, you go to implement something  and you remember there's kind of an edge case,

[1:40] but you're like, I can deal with that edge case  later. Um we hit that growth faster than anything

[1:45] I've ever worked on. So all of our  judgment around those corners that we cut

[1:51] really just reared their heads in a very ugly way.  So there's a lot of bugs in OpenCode that just

[1:55] impact a lot of people, right? You know, something  that affects 1% of sessions is now affecting

[2:00] thousands, ten thousands of people every  single day. Um so that was the first

[2:06] sense that it felt like hey you know writing  correct JavaScript is actually pretty hard.

[2:11] Um most of us get away with it because  it doesn't matter in a lot of cases.

[2:15] Um, but almost none of us use things like  abort signals. You know, when we spawn an

[2:21] async task, we're never thinking about, oh,  how do we cancel it? How do we interrupt that?

[2:25] What happens if there's a case where it needs  to cleanly shut down? How do we clean up all

[2:29] the in-process work? Most of us just kind of  skip those because we may be working on stuff

[2:33] that is short-lived or stateless, like an HTTP  server. Um, but even in those cases, you know,

[2:37] you might have staple things that plug into  that. Uh I think a lot of us, even with years

[2:42] of JavaScript experience or years of programming  experience, were not actually writing correct

[2:46] uh JavaScript code, like fully correct JavaScript  code. Um so we just had a lot of bugs at the scale

[2:53] and it felt like our software wasn't stable. It  wasn't. It wasn't really high quality. Um that

[2:58] was the first thing, where okay, let's maybe try  to look for something. How can we improve this?

[3:02] Maybe we do need to rely on on a framework that  kind of guarantees correctness a little bit more.

[3:07] The next thing that happened was kind of the  wave of AI code. Uh, we obviously ship an AI.

[3:17] Good. I thought you were like what I was saying.  They told me to shut up. Stop talking. Um,

[3:27] Am I sharing the screen? Oh,  it's I thought I did this.

[3:37] I don't have anything on the screen yet. So,  or anything important on the screen yet. Um,

[3:43] all the AI code we are shipping. Uh, so our team,  I would say, for a company in the AI space, we're

[3:47] pretty conservative about our use of AI.  We obviously use it probably more than

[3:50] most companies because that's our product.  We need to push it to where it goes. But

[3:54] my sense of our culture was, you know, we  aren't a company that's like the code doesn't

[4:00] matter. We care about the code. uh we try to  foster that that point of view. Despite that,

[4:07] just bad code gets out anyway. You know, you have  a button, it's like a lazy button, you can push

[4:10] it, you can get your work done. Um the cats like  the genie's out of a bottle kind of situation,

[4:15] where even a team like ours, where we talk a lot  about code quality and we kind of try to enforce

[4:20] that. Uh there was still just a lot of not great  code getting out there. Um and the reason for that

[4:25] is when AI AI can be really powerful. The models  are getting better and better, but they're roughly

[4:30] just kind of mirroring patterns they know about,  mirroring patterns they see in your codebase. So

[4:35] if you don't, we had some patterns in our codebase  that kind of grew over time. We try to codify ways

[4:39] to do things, and you know, every time we did  that, AI benefited from that. Um, but the more

[4:46] of that you have, the better the AI  code is. So it kind of goes from this,

[4:51] I think our judgment historically is now inverted.  Um, historically, we kind of see really heavy

[4:56] boilerplatey frameworks, and we would hate it.  It would make you be uh, like in the last talk,

[5:02] be super explicit about everything to do  something basic. It was like 100 lines of code,

[5:08] and we kind of spent a lot of time trying  to figure out how to make like beautiful

[5:11] APIs uh terse APIs. How can you express something  complex or something that's not as verbose,

[5:17] because when you type it out, you don't want to  type out all that boilerplate over and over. Um,

[5:20] but with AI, it's kind of the opposite. We're not  doing the typing as much. So, I don't really care

[5:25] that much that the framework is boilerplate.  Effect is produces a lot of code. Like every

[5:30] file is three times bigger than than you normally  expect. Uh, but if I'm not typing it out anymore,

[5:36] maybe I don't care about that as much. And it  provides a crazy amount of guardrails for the LLM.

[5:42] When I ask the LLM to do something in an effect  codebase, it almost always does it correctly. And

[5:46] we kind of saw a shift in um our own usage of AI  pre and post us moving to effect. Uh the amount of

[5:56] tokens we're spending just went up as as  our codebase got more effectified because

[6:00] we were seeing better results uh with effect.  Um unfortunately, that means we're now paying

[6:05] a lot of money to OpenAI, and mostly OpenAI.  Um I think our team of 20 is now spending uh

[6:15] probably like 30,000 a month, which is  like another, one other engineer. So,

[6:18] in the scope of, from that point of view,  it's like one extra engineer's worth of uh

[6:22] worth of spend. It's not that crazy, but it's not  even distributed to our team. If all of our team

[6:28] kind of sort of use it as much as the top users,  you know that spend goes up a lot, but point being

[6:34] we're looking for something that would give  AI more guardrails. So effect kind of is that

[6:40] um it is a very I I joke it's like a it's like  one of those enterprisey frameworks that you

[6:45] historically hate to work in. It kind  of looks like that upfront, I would say.

[6:49] Uh kind of like how those crazy Java frameworks  looked. But it gives the AI such art, such

[6:55] like explicit ways of doing things. When the  AI reads a file, it has such explicitness in

[7:00] the file, such strict patterns that when it goes  to do something new, it likely looks very much

[7:04] like what what you'd expect. Um so given all those  things, we decided to start doing this migration.

[7:11] Uh thankfully it was something we could  do somewhat progressively. Of course,

[7:14] always to the point, we have to do a hard cut  over. We're kind of approaching that now. Um

[7:19] but yeah so the past three months or so,  we've been moving more of our stuff to effect,

[7:23] both OpenCode and also any supporting services uh  that we build. Um, and just for fun, I was like

[7:30] what what can I talk about? I'm still  like technically an effect beginner. Um,

[7:34] I think I sent a message like last  week to my team, being like, "Okay,

[7:39] I think I'm like good at effect now." So, it's  very recent that I feel somewhat confident. Um,

[7:45] but I figured for people that are maybe less  familiar, even less familiar than I am, uh,

[7:50] I was going to kind of walk through some some  files and code that, uh, we have in OpenCode

[7:55] where we use different effect features so  you can kind of see how it comes together.

[7:59] Um, so in the last talk, you know, we talked  about schema. Um so one of the nice things about

[8:04] effect is a lot of stuff that you need to glue  together three or four different libraries for

[8:10] it tends to be out of the box in the effect uh  standard library. So if we look at schema, um,

[8:17] so you know, I think all of us you should be  using a data validation schema framework. Um

[8:23] you know before this, we were all using Zod. You  know, Effect has one that comes out of the box,

[8:27] which works with everything else. And so we define  all shapes of data in our codebase using schema.

[8:33] Um when we collaborate as a team, oftentimes we  just talk in terms of types in terms of schemas

[8:38] to define, you know, we try to like model reality  using uh using what you can do with with schema

[8:44] and we kind of align on what makes sense, and then  the implementation kind of AI does. Um but yeah so

[8:49] you know schema is not nothing crazy. If you're  using a data validation library you've probably

[8:53] seen this before. uh you can define shapes of  objects you know you can say that so this is um

[9:00] the schema that represents uh  a model like an LLM model um

[9:05] so you know it has fields it's got some fields  can be objects, some fields can be primitives,

[9:09] uh as you can see you know this cost field where  we model cost uh there's an input cost which is

[9:15] a finite number output cost etc uh you know  nothing too crazy you know in strings you can

[9:21] make them optional you can do things like that  one of the things here that I really like is

[9:26] branded types. So effect schema has a concept of  branded types. The idea behind a branded type is

[9:31] typically you would say an ID is a string. So  if you have this uh you know ID field here,

[9:39] you would probably typically model this uh and  and you can do this in effect just as a string. Um

[9:44] but this is not just any string. It is a model ID  string specifically. So effect has this concept of

[9:50] branded types where you know this is just a string  string and but it also has a specific brand saying

[9:57] this is a model ID. So any function that's trying  to receive a model ID, it says I receive model ID.

[10:03] You can't accidentally send it another string  that represents something else. You can't send

[10:07] it a provider ID. You can't send it any other  ID that's in your system or any other string. um

[10:12] it'll kind of force you to enforce that  what's going in there is definitely um

[10:17] the type of the specific instance of the string  that you want. Uh a version of this that I really

[10:22] like, which saves our butt in a bunch of places,  is we use this for pads. So you have pads all over

[10:29] your codebase, probably, but is it an absolute  path or relative path? A bunch of bugs comes

[10:33] from mixing this up. A function that expects  an absolute path expects a relative path. Um

[10:38] but we can be very explicit. we can say hey this  function expects a relative path this function

[10:43] expects an absolute path and when you look at the  function signature you can kind of see that um

[10:48] so schema branded types super useful uh again  the schema part is not that unique you had

[10:53] it before with the branded types thing I don't  really think I've seen it implemented super well

[10:57] in uh in other other libraries um one other thing  that's fun here is if I go to provider um again

[11:08] like there's patterns here to help you deal with  magic strings. So, we have an ID that represents

[11:12] a provider ID. There's some well-known provider  IDs like Anthropic, OpenAI, some of these others.

[11:18] Um, you know, typically you would probably have  some code that's like if ID equals OpenAI. Um,

[11:25] in this case, we can do something like uh  ID OpenAI. So, like you know, you you don't

[11:30] have these magic strings all over the  place. Again, this isn't anything that

[11:33] crazy. It's just a constant, but it's nice. nice  pattern to use with uh with a branded type. Um

[11:42] okay, so that's uh that's schema. Let's  see if there's anything else I forgot.

[11:48] Okay, next thing uh core to effect is  a concept of services and layers. Um

[11:53] even prior to effect we were roughly building  things using domain-driven design. The idea

[11:58] behind domain-driven design uh you can implement  it in like a very explicit, crazy way. You can

[12:02] implement in a light way. It's pretty simple. Your  application decomposes into a bunch of different

[12:07] domains. Uh a domain is an area uh or like a  feature, and it exposes a bunch of functions.

[12:13] Your application composes those functions together  to to be your whole application. Um effect has

[12:19] a first-class way of representing that in terms  of services um and and layers. So again, this is

[12:26] historically this would have been like annoyingly  verbose, but nowadays it's totally worth it. So

[12:32] we have this concept. We have this uh service  called the git service. Um and the git service

[12:38] does some useful git operations. There's not a lot  here because this is something that's in progress.

[12:42] Um but we start by defining the interface. The  git service can find a git repo given an absolute

[12:48] path. So the job of this service is to take an  absolute path, traverse it upwards, and figure out

[12:54] uh the repository for it. And repository  is a the actual directory that lives at. Um

[13:00] it can find a remote for a given uh repo. It can  find all the different routes for the given repo.

[13:07] Um you can imagine you know that this could  be like no commit. You represent all the

[13:11] functionality that you need in git as a commit.  So you need in the git service in this interface.

[13:17] Then you have an implementation of interface and  this is like our default current implementation

[13:22] and this is like a kind of shitty implementation.  This just spawns git. It spawns a git process. uh

[13:29] and uh it it does the work that it has to and  it basically implements each function like

[13:35] spawn the git process to get the remote to  get the roots to get uh to find the repo.

[13:42] The rest of our application doesn't really know  about this implementation. It really only knows

[13:46] about this interface. Uh the reason this is nice  is because we have plans in the future to make our

[13:52] code better. I'm sure we have plans to make our  better that we hope to eventually get to one day.

[13:56] Um, we want to switch this out from  spawning git to using libgit 2,

[14:00] which is a native implementation of git and c.  We can embed this into our application. That way,

[14:05] we're not spawning it every time. We're  just kind of calling a native function.

[14:09] We can then do like a another implementation  of this that's like native git or something.

[14:14] Uh, and this can have its own way of uh doing git  stuff, but it'll still adhere to this interface.

[14:22] So the rest of our codebase, any other service  that needs git functionality uh which uh you

[14:31] know we use git functionality in a lot of places  um is not aware of this. It's also super useful

[14:36] for testing. If you have some implementation  that is very side effecty. It impacts the world

[14:42] too much where it makes testing hard or slow. You  can implement the test layer of this this service

[14:48] and you can swap that out. Again, these are all  things you probably already do or you do to some

[14:53] degree. We were kind of already doing some of  these things before, but this is like a nice

[14:58] cottified if someone sat down and thought  through that for like years and thought of

[15:01] the best way to do all these things, you probably  eventually arrived at at something like this. Um,

[15:06] which is kind of classic thing with using a  framework versus rolling everything yourself. Uh,

[15:13] some other little goodies that are in uh the  effect center library is pretty big. Um there's

[15:18] a lot of like stuff in there. Like I said, it's  very rare that you need to reach outside of it. Um

[15:23] in our uh application, we have an internal event  system. So inside OpenCode, there's events that

[15:30] get emitted. They get subscribed by other services  and they do things. They go over WebSocket. Um

[15:36] you know, classic typical event system. You  define your event event shape, you admit it.

[15:41] Effect natively has something called PubSub.  So this implements a uh a PubSub oops

[15:49] this implements a a PubSub service right so you  can um initialize that and then you can uh yeah

[15:57] there's different versions of it there's different  implementations of it this is one where you can

[16:01] kind of publish infinite stuff into it it's got  other nice functionality you can see here where

[16:07] uh if someone subscribes late maybe they get  the last 10 events that they would they miss

[16:12] if they subscribed earlier so it's like any  like thing that would be minimal otherwise

[16:16] you could probably implement a PubSub especially  with AI very quickly. Um but this is you know

[16:21] like a fully featured one that has all the  things that you probably will eventually need.

[16:25] Um and this is the like the root system we  use to publish events uh all over our uh

[16:32] our codebase. So we have publish event that just  calls uh publish on the PubSub with the event

[16:38] um and you know, subscribing uh effect  has these really nice stream APIs.

[16:43] So, a stream again, if you sat really hard and  thought about what a stream is. A stream is just

[16:48] uh well I'm going to say a stream is a stream  of data [laughter] but you know that's what it

[16:54] is. There's it's useful to have a stream of data  that you can consume um and all the stuff that

[17:01] that relates to that like back pressure  again like catching up on missed events.

[17:06] It implements that once and guess what a PubSub  benefits from being consumed as a stream. So

[17:12] whether we're streaming our events, whether  we're streaming responses from LLM calls,

[17:16] or just using this stream API. So again ,  very good standard library uh that has these

[17:22] well thought through concepts. Um I would say like  it reminds me a little bit of I don't like Go the

[17:27] language really that much. Um but Go standard  library is really really good. They spent a lot

[17:34] of time thinking through like the IO interfaces  like the reader writer IO interfaces which means

[17:39] you can now apply them to like such a wide range  of things. Stream is is very similar to that. Um

[17:48] okay. Oh this is one of my favorite ones. This is  one of the biggest reasons we moved over, tracing.

[17:52] So if you look here again is verbose, and you're  probably looking at this, you're probably like,

[17:56] this is scary. And it is, and you know I'm sure we  can kind of all remember when we first saw React,

[18:02] we first saw JSX, we're probably like, that  doesn't look right, but sometimes it's okay.

[18:07] I think it's one of those cases where where  it is okay um so again if we go back to that

[18:12] uh we have an npm service, so this is a service  that lets us run npm-related functionality, so

[18:17] add uh a package, install packages in a directory,  get the binary that a package exposes. Again, this

[18:26] uh this implementation we embed the same  packages that npm use uses underneath,

[18:32] but you know, we can swap this out with like I  don't know a rust implementation or something.

[18:37] That's cool lately. Um so if you look at the  functions that we've implemented, you can see that

[18:44] we annotate them with a string. Um the nice thing  about effect is everything, pretty much everything

[18:50] you define is kind of wrapped in this wrapper. Um  and given that it's wrapped in a wrapper, it can

[18:56] start to inject functionality in there. So the  reason we do this, where we add these like extra

[19:01] things, is because every time this function is now  called, it's going to emit an open telemetry span.

[19:08] Uh so you can observe this. So it becomes  very easy to add instrumentation to your

[19:13] application. we if you don't use a framework that  kind of natively encourages this, our applications

[19:18] are pretty under instrumented. Um, and if we look  at what this gets us, um, is super expensive. It's

[19:27] like a very, uh, it's a very waste that you would  never turn it on for all of your all of your, uh,

[19:34] all of your traffic. Uh, but we do turn it on for  our team. So whenever a team says something like,

[19:39] "Hey, I started OpenCode, and it took like a  really long time to start up, uh, all of our

[19:46] team's traces are going into, uh, so we're using  Sentry. It doesn't matter what we use really.

[19:52] Um, and we can go [clears throat] in there and  go look at basically every single function call

[19:58] that is uh, in our entire codebase. So we can  see that, oh, this thing took eight seconds to

[20:04] boot up. That's weird." And we can kind of go  in there and see like, oh, which parts of it

[20:08] took super long. Like, hey, this get called  maybe like took longer than we expected.

[20:12] I'm zoomed in, so this was horrible, but  Sentry is not this bad, trust me. Um,

[20:19] so like this just comes out of the box. Like  the normal code that you write kind of gets

[20:23] auto auto instrumented. Um, and occasionally here  and there you might want to augment it with some

[20:27] extra stuff, but you know, typically you don't  have to in most cases. uh the npm the reason I

[20:33] I showed the npm one is there's like a  million ways to resolve npm dependencies and

[20:40] it ranges from being really not performant to very  performant but not correct and this is impacting

[20:45] a lot of our starter performance. Uh so moving  we like very quickly moved our npm stuff into

[20:50] effect so we can instrument it properly and then  we got to seeing the traces and we figured out a

[20:54] bunch of optimizations that we could make. Um and  what's cool is that uh you don't have to do this

[21:01] work actually. Um the way we use it in OpenCode  is OpenCode knows how to query the otel stuff.

[21:08] Uh so often times we can when we prompt it, we  say like hey here is an issue we're facing. Um

[21:17] you can add some extra logs to the codebase if  you need with your hypothesis on why you think

[21:20] it's happening. Try to figure out what's going on.  It'll add those into the codebase. It'll run your

[21:26] application, then it can query the OTEL traces  directly and kind of look into what happened

[21:31] and it can on its own figure out what's going on.  So the feedback loop, you don't have to use coding

[21:35] agents with a feedback loop, but adding a feedback  loop makes them like really really powerful. Um,

[21:40] so this otel feedback loop has been uh super super  cool. Um, and we we even built like a otel that we

[21:47] use uh to explore our our otel stuff internally.  Um the last thing I'm going to show is the HTTP

[21:55] server. So I think most of you probably are going  to have some kind of HTTP server somewhere in your

[21:59] codebase. Uh we OpenCode itself is a server. You  can run it headlessly. Um and I want to show you a

[22:07] little real quickly how we do uh HTTP stuff in in  uh in effect. So this is like the model endpoint,

[22:16] kind of what I was showing you guys before.  That schema we defined earlier for the model,

[22:20] we can now reuse to define our uh our endpoints.  So we have all of our endpoints defined here. And

[22:27] so these are just, these are just types. These  are not indentations. So we actually put in

[22:31] the effort to sit down together and think, hey  what's the best possible API design we can do.

[22:36] We don't have to worry about implementation.  We still have to think about the endpoints,

[22:39] uh what query parameters they take what they  return. So in this case, it's returning that same

[22:43] schema that I showed you earlier. Um, and we just  define all of our, what our API should look like

[22:49] using this. Um, once our team aligns on this, once  we all agree, you know, you can add your open API

[22:55] annotations here. You don't need to. It'll  automatically generate whatever it can. Um,

[23:01] this is basically a pure schema type  representation of uh of your API.

[23:08] Then you can go actually implement it. So we have  a matching implementation of the model endpoint.

[23:16] Uh you know this this this group only has one  endpoint. We say we're going to handle this uh

[23:21] we're going to handle this uh this endpoint.  Again, that's type safe. Um and this handler, if

[23:28] you get the query parameters, they'll be correctly  validated, correctly typed at that point.

[23:32] If you read the body again, correctly validated,  correctly type at that point, it won't let you

[23:37] return something that, that's invalid. So again,  you probably have seen some of this like in hono,

[23:41] you know, hono has been on this too. A lot of  frameworks support uh open API definitions.

[23:46] I will say that I've tried a bunch of, we deployed  with a bunch of them. This one even though it's

[23:50] more, again more verbose uh we and you don't  have to do the separation where you do the type

[23:55] separately from implementation, but we really much  like we really benefit from that. Um and then you

[24:01] can derive a full open API uh specification from  those definitions. Uh what's cool about this is

[24:08] now that we have that uh whenever we push any  changes, we regenerate the open API specification,

[24:15] it's very easy to accidentally change that by  accident. If you like add a field or move stuff

[24:20] around, you don't realize you're breaking your  API. You have a process that ensures that uh that

[24:26] JSON that's generated is only additive or it's not  like it doesn't have any unexpected changes. Um

[24:33] so again it gives more stability and more  explicitness to something that is kind of loose

[24:39] uh otherwise. Um and yeah so that that's it. So  those are like five places that we use it. Uh

[24:47] again so if you're like you you hear this a lot.  Um it's definitely super weird to use at first,

[24:56] especially if you're new to functional  programming. um most of our team has

[24:59] not so we've been able to kind of pick  up on that pretty quickly but it's one

[25:03] of those things where you have to shut off  your brain like turn off all your opinions

[25:07] and kind of do things the way it wants you to  do it, and after a couple months it'll kind of

[25:12] click, uh and you'll start to get some some of the  benefits. So like I said, for us, you know, we are

[25:17] doing a fairly risky migration and kind of  betting our whole company around building

[25:21] on top of effect, uh, but it's been, it's been  great so far. So yeah, that's all I had. Thanks,