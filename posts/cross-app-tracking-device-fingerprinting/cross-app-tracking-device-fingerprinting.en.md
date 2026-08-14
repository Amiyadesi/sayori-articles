---
title: "(Repost) Why do other apps immediately know what you just searched for? (Including iOS)"
published: 2026-07-23
created: 2026-07-23
updated: 2026-08-14
lastEdited: 2026-08-14
updateCount: 1
description: "Reposted with original author's permission. Using Loupe to demonstrate what mobile apps can read from your device, photo album, and local network, and how ad SDKs piece together device fingerprints."
image: ""
tags:
  - Privacy & Security
  - Device Fingerprinting
  - iOS
category: Internet & Community
draft: false
author: "I love sweet and sour pork ribs (aichitangcupaigu)"
licenseName: "Reposted with author's permission"
alias: ""
lang: en
translationKey: posts/cross-app-tracking-device-fingerprinting/cross-app-tracking-device-fingerprinting
---
<details class="repost-source">
<summary>Original Article & Authorization</summary>
<p>Original article: <a href="https://linux.do/t/topic/2598156">https://linux.do/t/topic/2598156</a></p>
<p>Permission granted by the original author.</p>
</details>

Why do other apps immediately know what you just searched for?
![原文配图 1](https://cdn3.ldstatic.com/original/4X/8/c/e/8ce2acacfb6433a493af0eda03104ce6b84cbefb.jpeg)

**Have you ever experienced this:**
One day you search for a pair of Crocs on a social media app, and the very next day, you're scrolling through a completely unrelated shopping app and see recommendations for those exact Crocs...
**You start to panic, trying to remember if you ever mentioned those Crocs in the second app.**
After confirming you hadn't, you start to guess: either "these two companies are definitely secretly swapping my data," or "oh no, my phone's microphone is eavesdropping on me."
While both of those scenarios are pretty wild, especially microphone eavesdropping (which is easy to expose with a packet capture), considering the low bar for internet companies these days, I wouldn't dare vouch for them.

![原文配图 2](https://cdn3.ldstatic.com/original/4X/c/c/d/ccdbc57292e1e5c15f523593cbae7690e8bd4688.jpeg)

However, advertisers actually have a more covert and secure way to push a pair of Crocs across apps right in front of you:

For example, if a phone searches for Crocs in app A, that preference is recorded under the device's name.
Switch to app B, and if it recognizes the same device, it can continue pushing that preference. It recognizes the machine; it doesn't necessarily need to know your name or who you are.
So the question is, how do advertisers record this information, and how does it leak out?
Recently, I discovered an app made by a security team: Loupe.
It has only one function: to tell users how much data a mobile app can actually get from you? And what exactly gets exposed every time you "allow" an additional permission?

![原文配图 3](https://cdn3.ldstatic.com/original/4X/2/d/6/2d6554fe54f68ceed0d214f5b2d3f2122f7db455.jpeg)

### For example, the moment I opened Loupe, without granting any permissions, it immediately gave me a rude awakening.

![原文配图 4](https://cdn3.ldstatic.com/original/4X/7/8/e/78e4f9f01d7cbd5baf7dbe38d311798a5c479853.jpeg)

It knew I set my phone's region to Singapore, use a mixed Chinese-English keyboard, activated the device in September 2023, have copied 29,034 times since then, and last booted 8 days, 3 hours, and 44 minutes ago.
It even went ahead and drew a profile of me. Knowing I have Steam and Discord installed, it deduced I'm likely a gamer. Then, seeing GitHub and Slack, it inferred I work in the tech industry.

![原文配图 5](https://cdn3.ldstatic.com/original/4X/b/2/3/b236a61889f780c2baec80132a40731de84f8039.jpeg)

The above is just what's displayed in the app. If you check the more detailed report, you'll find it knows even more.

![原文配图 6](https://cdn3.ldstatic.com/original/4X/9/f/9/9f90e4fdaa228e500b670e4f56fbb875d2ed0d2d.jpeg)

> **For example, it knows my iPhone 15 Pro currently has 105GB of storage left, is in dark mode, screen brightness is over half, battery is at 60%, not plugged in; it's dual SIM, both cards are on 5G, and it even knows how the phone is tilted and in which direction at this very moment.**

You might still think, "So what if it knows these bits and pieces? Can it really pinpoint us?"
Indeed, it can't.

Besides, this is still just information Loupe sees based on public APIs:
**What if, like with other apps, I grant Loupe access to my photo album, location, and other permissions? What information would it then know?**

![原文配图 7](https://cdn3.ldstatic.com/original/4X/b/9/3/b935c1139826d4ca05e1ced72acb9b93ff4ecd93.jpeg)

**I tried granting photo album permission. Loupe quickly told me I have 1,119 videos and 9,371 photos in my gallery, with 3,033 of them containing geolocation data, and it listed the places I've visited most frequently.**

![原文配图 8](https://cdn3.ldstatic.com/original/4X/8/7/f/87fecc780d3fbbd4b3ac5d60adb23722d7795c85.jpeg)

Don't be fooled by the app only pinpointing "Yuhang District"; this is just for Loupe's display convenience.
You should know that EXIF data in photos contains latitude and longitude accurate to about ten meters. An app just needs to analyze the frequency and timestamps of each location to roughly guess where I live, where I work, and that some obscure small town I occasionally pop up in during holidays is likely my hometown.

I recommend setting all apps to use the system's photo picker, which pops up and lets you select a few photos to authorize. In this case, iOS defaults to not sending photo location data to the app.

![原文配图 9](https://cdn3.ldstatic.com/original/4X/d/2/4/d24bb924f7cbd8381b583cf2e5ec8786db8aa8d3.png)

**Oh, and when you encounter those pop-ups asking if you want to enable all permissions for "convenience," remember to select 'Keep Current Settings'.**

![原文配图 10](https://cdn3.ldstatic.com/original/4X/3/7/d/37d95477ca9bb8d97434e7dbb5ccb0e87da815ce.jpeg)

#### Next, let's grant Loupe local network permission and see what it can get.

Honestly, who would think much about this permission normally? It's just for connecting to a printer or casting a screen, right?
But after I tapped 'Allow,' all my colleagues' computers on the local network, an HP laser printer, and two Ugreen NAS devices all showed up.

![原文配图 11](https://cdn3.ldstatic.com/original/4X/e/2/6/e260c50f19840d11607940d77b903b103c9149dc.jpeg)

Of course, it's reasonable for this permission to see all nearby devices; otherwise, it wouldn't be able to find them.
I just don't understand, shouldn't this permission only pop up when I actually need to cast my screen?

**Why do many apps, simply by being opened, reach out and ask for it?**

![原文配图 12](https://cdn3.ldstatic.com/original/4X/d/c/2/dc2e3deecc238db396040613fa1e429b2b0aaecc.jpeg)

I won't go into detail about location, Bluetooth, and calendar permissions; you can see the information in the screenshots.
In short, every time you tap 'Allow,' the app understands you more deeply, and your device fingerprint becomes clearer and more diverse.

![原文配图 13](https://cdn3.ldstatic.com/original/4X/b/f/8/bf8c7d05a0a890f8c54d02a18b6fdfbcb4f65925.jpeg)

### So how does App B know the fingerprint and preferences calculated for me in App A?

The answer is advertisers.
Many apps don't build their own ad systems; instead, they integrate an existing ad SDK. The splash screen ads and in-feed ads you see in an app are all fetched by this code from an ad platform and then displayed to you.
At the same time, the SDK sends your phone's characteristics back to the ad platform.

### Logically, an SDK shouldn't need to go through all this trouble to identify your phone.

Apple originally issued a legitimate identifier called IDFV, which means "several apps from the same company share one ID." So, if you have several apps from the same developer installed, it's effortless for them to recognize you as the same person.

But once you cross company boundaries, IDFV isn't universal. That's where IDFA comes in. IDFA is one ID per phone, universal across all apps, specifically designed to help the advertising industry identify people across apps.
But then another problem arose.
In 2021, Apple launched App Tracking Transparency (ATT), putting the IDFA switch back in the user's hands. For an app to use it, it first has to pop up and ask you. If you tap 'Ask App Not to Track,' that ID is immediately zeroed out.

![原文配图 14](https://cdn3.ldstatic.com/original/4X/6/6/7/667faaa7428c6b527a54c4fa1e90c081eb6bc9b8.jpeg)

### So in the end, advertisers had to take matters into their own hands, using this device fingerprinting tactic.

So, are apps really secretly using this tactic?

Loupe's development team is called Mysk. They previously packet-captured Facebook, Instagram, Threads, Chrome, and Spotify, and found that even though these apps promised in Apple's privacy manifest, "I read this information, but I will never transmit it," they still secretly sent out the user's phone uptime.
Seriously, guys, what do you need uptime for? Is your taste more unique than Walmart plastic bags or attack helicopters...?

> The truth is, there's only one reason: piecing together device fingerprints.

![原文配图 15](https://cdn3.ldstatic.com/original/4X/4/7/0/4705d3165cdb9ae055ee87c7e82945e99b5662fe.jpeg)

Similar things have happened in the Android camp.
In 2025, a Google research team published a paper where they analyzed 180,000 Android apps and 220,000 SDKs. They found that among popular apps in app stores, 39.4% contained SDKs that collect device fingerprints. If categorized into dating and comic apps, this number soared to 82% and 88% respectively.

Currently, Loupe is completely free and open-source. I think all iPhone users should give it a try (Android users might have to wait a bit longer).
Of course, after trying it, there's no need to be overly paranoid.
After all, advertisers have many ways to guess what you like to watch or buy, besides device fingerprinting, such as similar audiences, account linking, and collaborative filtering.
I believe Loupe's biggest value is that it lets you know what data of yours is exposed, and under what circumstances, thereby raising your security awareness. Just be more careful in your daily life.

**Currently, Loupe is completely free and open-source. I think all iPhone users should give it a try (Android users might have to wait a bit longer).**
![原文配图 16](https://cdn3.ldstatic.com/original/4X/2/6/2/26205297cb564a9cfa5f784886884928b1d370ad.png)

> **If you're interested in this topic, you can check out my previous articles:**
>
> [(Repost) An insider reveals how rogue apps trap and hunt users](/posts/rogue-app-advertising-user-traps/)

> [(Repost) How your phone is treated differently by them](/posts/mobile-app-ad-targeting-device-profiling/)

**Related articles, images, data, and code sources:**

1. https://mysk.blog/2024/05/03/apple-required-reason-api/
2. https://mp.weixin.qq.com/s/fR_GTcbEg84GOcQ5XXcyCw
3. https://apps.apple.com/cn/app/loupe-app能看到什么/id6766152470
4. https://github.com/mysk-research/loupe
5. https://nopj.cn/d/7382-loupekai-yuan-xiang-mu-shi-shi-jian-kong-iosyuan-sheng-appshu-ju-quan-xian
