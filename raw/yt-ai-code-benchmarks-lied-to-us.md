---
type: youtube
url: https://www.youtube.com/watch?v=JpSHyEIZ_bo
title: "AI code benchmarks lied to us"
channel: "Theo - t3.gg"
date: 2026-05-31
ingested: 2026-05-31
---

# AI code benchmarks lied to us

[0:00] It's getting harder and harder to know which models are actually good for the work we do as developers. That's what we have benchmarks for though, right? We have all these cool benches like SWbench Pro and Arena that are here to tell us what models are actually good at coding, right? Well, about that.

[0:16] While it is cool to see Mythos kill it on SWEBench Pro, I personally don't believe that Quen 37 Max or GLM 5.1 are meaningfully better than state-of-the-art models from OpenAI. I also don't believe that Gemini 35 Flash is just spitting distance away from GPT 54 and 55. That's just obviously not true. The numbers on this bench have been nonsense for a while, and that sucks because SWB Pro was meant to be the realistic bench for realistic coding problems. But not only are the problems kind of [__] they're also contaminated. So much of the info on how to solve these problems has leaked that models will regularly cheat and the cheating is barely even measured by the people verifying the results.

[0:58] To be a bit frank, this bench kind of sucks. And the fact that it's lasted this long, especially postcontamination, is frustrating. And while artificial analysis has been trying their best to pull together a bunch of things to make their own better suite of coding measurements, it's still not great. And to be clear, the artificial analysis coding agent bench is less their own bench and more a combination of other benchmarks that already exist that they're running with various harnesses and models.

[1:34] The issue here is almost misleadingly simple. The problems that are being benched against aren't realistic representations of the things we do in the problems that we try to solve using agents every day. The prompts are a bit nonsensical. The structure of the tools they're using doesn't make sense. The repos already have solutions so the models can cheat.

[1:58] DBSE is pretty much exactly what I've begged every person I know in the data and research side to make for years now. I wanted a bench that accurately reflects how we actually build things in our real projects with agents. And now we have it. And the results are so damning that I'm going to be accused of bias.

[2:25] I am an investor in data curve. It's part of why I bullied them into doing this and why I'm so happy that they made it. I've also given this company more [__] than almost any other company I've invested in in my life.

[6:08] OpenAI slaughtered in this bench. GBT 55 did the best by far at a 70% success rate. The next highest was 54 at a 56%. Then we finally get an anthropic model with Opus at a 54%. Then there's a huge drop, and this is the most notable thing here from Opus 47 to Sonnet 46, the next highest. We went from 54 to 32, nearly 50% drop.

[7:27] Data Curve's job is to sell data to labs to help them get better curation for code data to train the models to be better at coding. The issue they were encountering is that the labs would report their models were really good at code and then they would go look at the models and look at the results and they saw a ton of [__] because they were so confused about the gap between these models and how they were reported to be at code versus the actual experience using them.

[8:12] Their audit found that SWE Pro misgrades about 8% of false positives and 24% false negatives. And when you combine that with the contamination going on, the bench kind of sucks.

[9:00] If you've ever used a model like Gemini 3 Flash to try and code, you understand the fact that it getting a 35% when Sonnet got a 54% is nonsense. Those models aren't within 30% of each other. They're different worlds. Sonnet 46 can actually do work and Gemini 3 cannot do [__]. Their bench sees Sonnet 46 as six times better than Gemini 3 Flash. That is a massive jump and shows just how much better this bench is.

[10:06] What makes this test so different? They made it more realistic. All of the tasks are written from scratch. They're not using existing commits or PRs. There's way more diversity in the tasks that they're doing. The prompts are half the length of SVB Pro prompts, but the solutions require five times more code and two times more output tokens. But the most important part is the verification layer. Verifiers are handwritten to test software behavior rather than implementation details.

[10:42] Strong models will test their own work unless the prompt tells them not to. This is one of the biggest problems with SEB Bench Pro is that it tells the models to not write their own tests to verify results. So the models will write the code and then hope it works because certain models will do what you tell them to, certain ones won't. And since Opus models and claude models in general tend to just kind of ignore what you ask a lot of the time and do things they probably shouldn't, they'll cheat more.

[12:01] To put it bluntly, SWB Pro tests how good are models at contaminated Python repos that they're allowed to cheat in and told explicitly to not write tests and how likely they are to ignore it.

[15:40] Every time that happens, write it down. Have some notes somewhere where you write down the models you tried, the prompt you used, the tools you were using, and the code base and the hash that you were on when you tried the prompt. Maybe fiddle around with the prompt a bit and see if making slight adjustments can get you the result that you're looking for. But most importantly, keep a corpus of these failures. Keep track of the times the agents couldn't do the work that you wanted them to do and keep that around because when new tools come out, you can measure it yourself. You can even create your own mini benchmarks.

[16:08] We need benches so badly. And if you are experiencing models not doing what they should in your day-to-day work, you have something that I don't, the data to make one of these benchmarks. Do it. It's not that hard to do. And you'd be amazed how quickly the research community notices when you put together a small, seemingly shitty benchmark.

[18:40] This one line should invalidate SDW bench by itself. This is so bad. Like why is snitch benchmark like shitty benchmark checking if models are willing to hit the government up when you're doing medical malpractice better architected and better designed than this [__].

[22:01] All of this [__]'s obvious. This isn't them doing some crazy novel thing with the bench. They just sat and put in the work that nobody else wanted to do because you have to verify these results. And that's a shitload of reading shitty code. Nobody wants to do that.

[23:41] GPT 55 did 47K tokens per trial on average. 35 Flash did 150,000. 3x the tokens. Opus did 2x at 97K again compared to 47K. double the number of tokens and a lower score. This goes even further with the cost comparisons where Opus ends up being more than 3x more expensive than any other option.

[25:21] Gemini 35 Flash: it scored less than half as well as GBD55 did, and it used comically more tokens. It finished in 15 minutes versus 20 minutes. So it was like 20% faster and it was 3x dumber and roughly the same price. Why would you use 35 flash for like anything?

[26:43] This is probably the most damning bench for open weight models ever because none of them get to even half the score of the last generation of state-of-the-art models.

[29:06] This bench isn't perfect. Ideally, we would have more tests comparing the official harnesses versus the one that they built with Mini SWE. It would also be really cool if they included things that are a little more annoying to put in stuff like Composer 25 from Cursor. It would also be cool if they made a way harder version with more private data.

[29:44] A benchmark dropping with a 70% score is a bit scary because that means it's going to hit 100% by the end of the year at this rate. So I would love a version of this benchmark that like knocks a zero off of everything. What if 55 got a seven instead of a 70?
