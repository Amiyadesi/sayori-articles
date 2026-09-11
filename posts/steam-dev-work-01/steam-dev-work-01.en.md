---
title: "Steam Developer Registration Pitfalls: My Real Notes from Tax Forms to Getting Paid"
published: 2026-09-10
created: 2026-09-10
updated: 2026-09-11
lastEdited: 2026-09-11
updateCount: 1
description: "A practical record of registering as a Steam developer, filling out tax forms, passing verification, and choosing a payout method."
image: ""
tags:
  - Creator
  - Tutorial
category: Game Development
draft: false
alias: ""
lang: en
---

# Steam Developer Registration Pitfalls: My Real Notes from Tax Forms to Getting Paid

Many indie developers want to bring their games to Steam, but get stuck at the first step: registering as a developer. There are a lot of forms to fill out and other things to deal with, so it is easy to tell yourself that you will do it later.

If you want to manage your own game, it is better to do this early. After registering, you still need to build the store page, set the game's ratings, create a developer account and organization, create the app, and so on.

If you plan to work with a publisher, you may not need to register yourself. The trade-off is that you will have less control over your project. You can also register first and then work with a publisher later, while keeping your own developer account and retaining some ability to adjust the project.

The process itself is not complicated, but there is a lot of information that is easy to miss. One wrong detail can send you back through the review process again and again.

Today, based on my own registration experience, I will share the preparation, tax forms, review quirks, and payout options.

## 1. Checklist: $100, an ID, and a Steam Account

Before registering, prepare these three things:

1. **$100 USD:** This is the Steam Direct registration fee. It is not refundable at first, but Valve refunds it after the total revenue of that app reaches $1,000. The threshold applies per app: if your first game earns $500 and your second earns $1,500, only the $100 fee for the second game is refunded.
2. **A national ID card:** You need it for identity verification and tax-form information.
3. **A regular Steam account:** Use the account you normally use to buy games. You do not need to create a separate account.

## 2. Registration and Identity Verification Pitfalls

The entry point is [https://partner.steamgames.com](https://partner.steamgames.com). Sign in with a regular Steam account and click “Register as a developer.”

- **Use a romanized name for identity information:** When entering your name, use pinyin, such as `San Zhang`, rather than Chinese characters. Later, banks and payout services—whether a US card, WorldFirst, or another provider—usually require the romanized name. Keeping it consistent avoids another review problem.
- **Enter the address from your ID:** Write the address in English or pinyin. It is better to translate it carefully with AI than to improvise, so the address remains accurate.

## 3. Tax Forms: How to Reduce the Rate from 30% to 10%

This is the most important step for saving money. When filling out the W-8BEN tax form, pay attention to the following:

1. **Tax status:** Select that you are not a US tax resident.
2. **Foreign TIN:** Select that you have a foreign TIN. For an individual developer in China, the TIN is your 18-digit national ID number, so enter it directly; you do not need to apply for another number.
3. **Tax treaty benefits:** Select the benefits under the US-China tax treaty.

Doing the above correctly reduces Steam's withholding rate from the default 30% to 10%.

### My Tax Information Was Rejected Several Times

Even though the steps above sound clear, I had a rough time with them. This “Your tax information is invalid” email shows how frustrating it can be.

![[Screenshot_20260911_090317_com.tencent.androidqqmail.jpg|width=460|align=center|caption=The “tax information is invalid” notice I received from Steamworks]]

Steam's tax review is outsourced to a third-party company, Lilaham / TaxIdentity. Sometimes they do not explain exactly what is wrong. After my information was rejected, I did not know what to fix, so I could only submit it again and again.

If you receive an “invalid tax information” email too, do not panic. It does not necessarily mean that you entered something incorrectly.

As long as you have confirmed the four core points above—non-US tax residency, the ID number as the foreign TIN, the tax-treaty benefit, and an address matching your ID—submit it again. There is a good chance it will eventually pass review.

## 4. Identity Verification

Many tutorials say that you need a utility bill with your address, but that is not always true.

I did not have a bill showing my address, so I went to an Industrial and Commercial Bank of China branch, withdrew RMB 100, and asked the teller to print a withdrawal receipt with the bank's official service stamp.

![[IMG_20260504_124358_edit_5024691644024.jpg|width=460|align=center|caption=A stamped withdrawal receipt printed at an ICBC counter]]

The receipt only showed my name, card number, and transaction record; it did not include an address. I uploaded it together with my ID card. Even though it was rejected several times, it eventually passed.

Steps:

1. Go to a bank counter and withdraw RMB 100.
2. Make sure the receipt includes your name, card number, transaction record, and the bank's official service stamp. The stamp is the key part.
3. Use a recent date. A receipt printed and stamped at the counter is best.
4. If the review rejects your material, do not rush to replace it. Wait a few days and submit the same material again.

## 5. Payout Options: From Strongest to Weakest, Plus a Compliance Note

For developers in mainland China, getting the money back is a major concern. Based on real-world experience and compliance costs, I would rank the options as follows:

| Method | Fee / cost | Arrival speed | Compliance requirements | Best for |
| :--- | :--- | :--- | :--- | :--- |
| **US bank account** | Lowest, using local ACH | Fast | Handle tax and foreign-exchange matters yourself | People with a US card |
| **Third-party platform (WorldFirst)** | 0.7% withdrawal fee cap | RMB arrives within seconds | Upload transaction details regularly | Most individual developers |
| **Foreign-issued Visa / Mastercard (direct wire)** | SWIFT transfer; intermediary banks may take USD 15–30 per transfer | Slow and more likely to be returned | The bank may ask for paper documents | People with stable income who do not mind manual work |
| **UnionPay with international transfers enabled** | High fees | Slowest | Paper documents are often required | Not recommended |

Here is an objective look at the hassle and advantages of WorldFirst:

- **What you need to do:** After registering, you usually need to upload Steam payment records or transaction statements to the WorldFirst dashboard each month to obtain a foreign-exchange settlement quota. This is one extra step compared with entering a card number and doing nothing else.
- **What it solves:** If you receive a SWIFT transfer directly through a Chinese bank, an intermediary bank may deduct USD 15–30 from every payment. The bank may also return the payment because it cannot identify the nature of Valve's transfer, creating fees on both sides. Uploading transaction details to WorldFirst is essentially a way to complete the foreign-exchange compliance declaration, so you can convert the dollars to RMB smoothly without using your personal annual USD 50,000 settlement quota.
- **How to choose:** If your monthly income is small, perhaps only a few hundred dollars, or you hate paperwork, a direct wire can still be an option if you accept the fees and the risk of a returned payment. If your income is growing, or you want to avoid repeatedly explaining to a bank what a payment is, WorldFirst remains the lowest-cost and least troublesome overall option.

If you decide to use WorldFirst, you can register through my referral link:

👉 [WorldFirst registration link](https://s.worldfirst.com.cn/3M7iMD?default_source=WF-Vk00000xX1cr&referral_id=WF-Vk00000xX1cr)

## 6. Summary

Registering as a Steam developer is mainly a test of patience and attention to detail. The financial and tax steps look complicated, but once you remember the key points—use a romanized name, enter your ID number as the TIN, reduce the withholding rate to 10%, and keep trying with a stamped bank receipt—you can get through the process.

I hope your game sells well and you can bring those dollars home smoothly!

# Coming Next

Store pages, app IDs, rating requirements, developer accounts, and the community? Once I get to building those, I will write another post about them, haha.
