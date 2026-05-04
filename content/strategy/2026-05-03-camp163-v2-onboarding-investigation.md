---
type: investigation
date: 2026-05-03T20:30Z
tick: 2030
topic: Camp 163 vs Camp 132 — New User Onboarding CTR Collapse
tier: investigate (Wave 2 complete; Wave 3 pending BQ IAM fix)
status: ACTIONABLE — sufficient findings to brief Roham/Dan/Guy
---

# New User Onboarding V2 Investigation
## Why the CTR dropped 2.74× from Camp 132 to Camp 163

---

## Original Question

Is the CTR collapse from V1 (Camp 132, 13.7% CTR) to V2 (Camp 163, 4.85% CTR) primarily:
- (A) Voice / content quality — emails say the wrong things
- (B) Deliverability — emails aren't reaching inboxes
- (C) Journey architecture — wrong emails, wrong timing, wrong branching

Answer: **(A) Voice + (C) Architecture. Not (B).**

---

## Wave 1 Findings (prior session — corrected framing)

### Framing correction
Camp 132 and Camp 163 are NOT parallel voice tests on the same audience. They are **V1 vs V2 of the same New User Onboarding journey** running in different time windows (Camp 132 = 2025 era, Camp 163 = launched Dec 18, 2025, currently running).

### Variance decomposition of the 8.85pp CTR drop

| Component | Contribution | Share |
|---|---|---|
| CTOR change (response per opener) | 7.05pp | **80%** |
| OR change (inbox / subject / timing) | 1.80pp | **20%** |

**80% of the CTR collapse is people opening the email and not clicking.** This is content/voice/CTA quality, not deliverability.

### Deliverability: V2 is BETTER than V1
| Metric | Camp 132 (V1) | Camp 163 (V2) |
|---|---|---|
| Delivery rate | 93.5% | **96.4%** |
| Bounce rate | 5.5% | **3.5%** |
| Human CTOR | 41.7% | 19.9% |

V2 reaches more inboxes. The problem is entirely what the emails say.

---

## Wave 2 Findings (this session)

### Finding 1: Journey Architecture Collapse

| | Camp 132 | Camp 163 |
|---|---|---|
| Total email actions | **19+** | **3** |
| Emails actively sending (last 30 days) | Multiple | **1** |

Camp 163 emails and their send status:
- **Action 4525 "Buy Your First Pack" (T3428)** — 3,279 sent in 30 days. **The only active email.**
- **Action 4528 "Use $10 In Credits" (T3414)** — **0 sends** in 30 days
- **Action 4550 "Use Your $10 Of Credits" (T3422)** — **0 sends** in 30 days

Camp 132 had emails for: free pack claimed, free pack available (×2), free pack in account, has user claimed, purchased $2 pack (×3), used $10 credits (×4), use your credits (×2), used buyback offer (×3), has user purchased. Multiple targeted re-engagement nudges at different funnel stages.

**Impact on CTOR:** When CTOR is computed at the campaign level, Camp 132's aggregate benefits from many high-intent emails (credits nudges, buyback offers) that are sent AFTER the user has already shown purchase intent. These have naturally higher CTOR because the user is warm. Camp 163 has only the cold-traffic first touch.

### Finding 2: The Dead Email Problem

Actions 4528 and 4550 are conditional on:
1. User buying a $2 pack (`nbats_team_pack_purchase_y_n = y`)
2. User NOT using $10 credits (`nbats_dapper_credit_purchase_after_conversion_y_n != y`)

**Zero sends means one of three things:**
- (a) Primary email (4525) isn't converting — 13.6% CTOR means <1-2% of recipients click and buy, so almost nobody reaches the purchase-triggered path
- (b) `nbats_team_pack_purchase_y_n` isn't being set by the product integration
- (c) Credits are auto-applied after any pack purchase, so condition (2) is always false

The V2 journey was designed as a 3-step funnel. It is running as a **1-step sequence**. Two-thirds of the intended touch points are dark.

### Finding 3: Voice and Content Quality

**Camp 163 primary email (T3428) — "Buy Your First Pack"**

Subject: `Buy your first pack, get $10 back`

Key copy:
> "When you do, we'll instantly credit your account with $10 to spend on more moments. It's quick, easy, and you can pay with Apple Pay, Google Pay, or your card."
> CTA: **"Grab My Pack"** → `nbatopshot.com/welcome/choose-your-pack`

**Camp 132 welcome email (T2297) — "Free Pack Redeemed"**

Subject: `Welcome to Top Shot! Claim your free pack today`

Key copy:
> "Claim your pack now and start discovering moments that could become part of your legacy."
> `{{ content }}` [dynamic content injection — see Finding 4 below]
> CTA: **"Claim My Free Pack"** → `nbatopshot.com/`

**Voice gap:** Camp 163's primary email reads like a checkout page — payment methods, credit mechanics, "quick and easy." Zero basketball. Zero collector context. Zero specificity about what the user is about to own. The word "moment" appears once in the context of spending $10.

Camp 132's welcome email is weaker than it could be, but ends with "become part of your legacy" and crucially has...

### Finding 4: The Dynamic Content Injection ({{ content }})

Camp 132's templates use `{{ content }}` at the bottom — a Liquid variable injection point for personalized basketball-contextual content. Camp 163's templates have no equivalent. The `{{ content }}` placeholder in V1 suggests the journey was designed to inject current basketball context (featured players, live drops, series highlights) into every email. Camp 163 eliminated this entirely.

If `{{ content }}` was being populated in Camp 132, that's the voice lift. If it was empty, it wasn't helping — but the template structure at least preserved the intent.

### Finding 5: UTM Attribution Contamination

**Both** Camp 132 and Camp 163 email templates contain UTM parameters pointing to:
`utm_campaign=%5BCopy%5D+05.19.25+Playoffs+Second+Round+Drop+announce`

This is a May 19, 2025 drop announcement campaign. **All clicks from both onboarding campaigns are being attributed to a playoff drop from a year ago.** This means:
- UTM-based analytics cannot tell onboarding email performance from drop announcement performance
- Click performance is understated in any UTM-filtered reporting
- CIO's own action-level metrics are the only reliable source (what we're using here)

---

## Key Numbers Summary

| Metric | Camp 132 | Camp 163 | Delta |
|---|---|---|---|
| Email actions in journey | 19+ | 3 | −84% |
| Emails actively sending (30d) | Multiple | **1** | |
| Human CTOR | 41.7% | 19.9% → 13.6% (primary only) | −28pp |
| Delivery rate | 93.5% | 96.4% | V2 better |
| Primary email subject | "Welcome! Claim your free pack" | "Buy your first pack, get $10 back" | |
| Primary email CTA | "Claim My Free Pack" | "Grab My Pack" | |
| Dynamic content injection | Yes (`{{ content }}`) | No | |
| Correct UTM attribution | No | No | Both broken |

---

## Root Cause Assessment

The CTR collapse has **two independent causes** that compound each other:

**Cause 1 — Journey truncation (architecture):** V2 removed 85% of the email touchpoints in V1. The aggregate CTOR benefit of having multiple targeted nudges (credits, buyback, repurchase) was eliminated. New users get one chance and exit.

**Cause 2 — Voice regression (content):** The primary email in V2 is written as retail transaction copy, not collector community voice. The `{{ content }}` dynamic injection that allowed personalized basketball context in V1 was eliminated entirely. Users are being asked to buy a pack with Apple Pay, not invited to hold a piece of basketball history.

These aren't competing explanations. Both are true and both need fixing.

---

## Recommendations

### Immediate (no engineering required)
1. **Rewrite Template 3428** — replace retail voice with collector voice. Lead with basketball context (current playoff moments, what they just claimed in the free pack). Kill the Apple Pay line. New CTA: something that connotes ownership, not checkout.
2. **Fix UTM parameters** in both campaigns — critical for any attribution analysis going forward.
3. **Restore `{{ content }}` injection** or define a static but contextually relevant fallback.

### Short-term (Guy/Sam + engineering)
4. **Diagnose the dead emails** — determine why actions 4528 and 4550 have 0 sends. Is `nbats_team_pack_purchase_y_n` being set? Is the credit auto-applied? This is a monitoring gap.
5. **Restore journey depth** — V2 doesn't need 19 emails, but 5-7 targeted nudges (welcome, pack nudge, first purchase confirmation, credits reminder, 7-day reactivation) would recover most of the CTOR gap.

### Wave 3 (pending BQ IAM)
- Pull cohort quality comparison: are V2 new users inherently lower quality (less basketball-engaged) than V1 users? This could be a confound. BQ needed.
- Estimate forecast impact: if CTOR improves from 13.6% → 25%, what's the downstream pack purchase lift?

---

## Confidence

**High confidence:** Journey truncation and voice regression are both real. The data is clean.

**Open question:** Whether cohort quality (V2 users being newer/less engaged independent of email) accounts for any of the remaining CTOR gap. Wave 3 would address this. Directionally, I don't think it's the primary factor — the 80/20 decomposition points strongly at content. But it's worth validating before committing resources to a V3 journey rewrite.

---

*— Magic, tick 2030, 2026-05-03T20:30Z*
*Based on CIO MCP metrics, campaign structure, and template analysis. BQ IAM fix needed for Wave 3.*
