# "What Good Looks Like" — NBA Top Shot Email Scoring Rubric
**Version:** 1.0  
**Date:** 2026-05-04  
**Grounded in:** Roham Gharegozlou feedback log (topshot-review v1001–v1004), memory feedback files (voice, design system, funnel lens), and direct quotes from the 2026-05-04 review session.  
**Use:** Apply this rubric to any draft email before it enters the customer-facing review queue. Score each dimension 1–5. A draft must score ≥3 on ALL 12 dimensions to proceed. Any single dimension scoring 1 is a blocking failure.

---

## How to Apply

Score each dimension independently. Do not average. A 5-4-5-5-5-1-5-5-5-5-5-5 draft fails because of the single 1. The rubric is a gate, not a grade.

After scoring: note which dimension(s) scored below 3. That is the edit brief. Fix those dimensions and re-score before submitting for review.

---

## Dimension 1 — Real Specificity

*Does the email contain real, user-specific data — or is it generic placeholders dressed up as personalization?*

| Score | Signal |
|-------|--------|
| 5 | Pulls actual user moments, serials, entry prices, current floors, and dates. Liquid variables point to real BQ-synced profile attributes that exist and are populated. Math, if present, is per-user and has been verified positive for this cohort before sending. |
| 4 | Most data points are real and user-specific; one or two are set-level (shared across all recipients) but still accurate. |
| 3 | Mix of user-specific data and platform-level data. No fabricated numbers. Liquid variables exist in the schema. |
| 2 | Generic platform claims ("your collection is moving") with no per-user data. Liquid placeholders present in the template but not populated from verified sources. |
| 1 | Fabricated data, unverified statistics, or Liquid that renders as an empty string. E.g., citing "$1.2M T30" without source verification. |

**Grounding:** Roham, verbatim: *"We need to look up specific moment purchases. We need to do the math for specific users, because in a lot of cases the math might not be positive."* Also: memory file `feedback_email_design_system.md` §7: "Real user-specific math, or don't bother."

---

## Dimension 2 — Positive Math Gate (Reactivation / Portfolio emails only)

*For any email that implies a collector's holdings have appreciated — has the math been verified positive for this cohort?*

| Score | Signal |
|-------|--------|
| 5 | Cohort has been pre-filtered by BQ to confirm the portfolio-appreciation claim is true for every recipient. Negative-math users routed to a different email or suppressed. |
| 4 | Math is positive for ≥80% of the cohort; negative-math tail is small enough that the claim holds in aggregate. Risk flagged and accepted by the DRI. |
| 3 | Math is positive for the majority; negative tail exists but is explicitly noted in the campaign brief. |
| 2 | Math has not been checked. The email assumes appreciation without verification. |
| 1 | Math is known or likely negative for a significant share of recipients (e.g., all 1,000-day dormant holders of early 2021 packs). Email still sent with positive-appreciation framing. |

**Grounding:** Roham, verbatim: *"In a lot of cases the math might not be positive. In that case, then it won't be convincing — if it is positive, then I like the idea."* Also: *"If math isn't positive, don't try to spin it."*  
**Note:** Score this dimension N/A for emails that make no portfolio-appreciation claim (welcome, fast break wins, drop announcements). An N/A does not count against the draft.

---

## Dimension 3 — Voice Fit for Surface

*Does the voice register match the email's surface type — or is personal voice applied where chronicler is required, or vice versa?*

| Score | Signal |
|-------|--------|
| 5 | Voice is explicitly chosen for the surface type. Transactional / pack / abandoned cart / drop: platform-chronicler (no personal sign-off, no "I"). Whale concierge: Magic-observational but only in the 10–20% allocation. Welcome: platform-definition register. The voice feels like the right person for the room. |
| 4 | Mostly correct register with minor slips. E.g., one "I" in an otherwise chronicler email that can be edited out. |
| 3 | Register is defensible but not optimized. E.g., using slightly more personal language in an abandoned-cart email than needed. |
| 2 | Wrong register for the surface. Personal-letter framing on a mass broadcast. Concierge voice on a transactional email. Newsletter-author voice on a concierge surface. |
| 1 | The "Matt writing some bullshit to you" anti-pattern: a named individual's personal letter framing applied to a broadcast audience. Or: Magic-personal voice on all 7 cards regardless of surface. |

**Grounding:** Roham, verbatim: *"80–90% platform voice, 10–20% Magic personal."* Memory file `feedback_voice_fits_surface.md`: "For customer-facing email copy, pick voice based on the surface, NOT the writer's identity."

---

## Dimension 4 — Social Proof Presence

*Does the email use real on-platform behavior — what others are doing — as a signal?*

| Score | Signal |
|-------|--------|
| 5 | Real, BQ-sourced social proof naturally woven in. "47 collectors in your set bought this week." "Others have purchased Moments from [player]." Specific transaction counts, floor moves, cohort behavior — not invented. |
| 4 | Social proof present and directionally correct; one data point may be set-level estimate rather than exact BQ pull. |
| 3 | Social proof attempted but generic ("collectors are active on the Marketplace"). Still directionally honest. |
| 2 | Social proof absent on an email type where it was explicitly requested (abandoned cart, drop announcement, reactivation). |
| 1 | Fabricated social proof ("thousands of collectors...") or social proof that contradicts known platform data. |

**Grounding:** Roham, verbatim: *"We want to also try some stuff with social proof, where it's saying, 'Hey, others have purchased moments from X player.' That's both personalized and social proof. In general, you should really emphasize much more social proof in the emails that we're sending... you have access to all that data, so pull it and use it completely."*

---

## Dimension 5 — AI-Tell Cleanliness

*Does the copy contain phrases that read as AI-generated — over-explaining, abstract justification, or hollow-intensifier language?*

| Score | Signal |
|-------|--------|
| 5 | No AI tells. Copy uses specific nouns, specific numbers, and assumes the reader knows what the platform is. No abstract platform philosophy in the first three sentences. Every sentence earns its place. |
| 4 | One minor AI-adjacent phrase that could be cut ("the play itself" → just delete the sentence). Doesn't undermine the email. |
| 3 | A few explainer phrases present but not in high-visibility positions (subject line, first sentence, CTA). |
| 2 | AI tells in the subject line, preheader, or first body sentence. "Every Moment is a play that actually happened — pulled from the live broadcast, minted on its own serial" opening in a non-welcome context. |
| 1 | The copy reads like an AI wrote a summary of what an email about this topic should contain. "Way too summarized, way too AI like." Teller signs: bullet-point skeleton where sentences should be; abstract platform-benefit explanations where specifics should be; three-pattern newsletter structure in a concierge context. |

**Grounding:** Roham, verbatim: *"Also definitely remove 'The play itself.' — The entire sentence is reading like AI."* Tester, verbatim: *"Way too summarized, way too AI like. Terrible copy."* Banned list items BANNED-01 through BANNED-03 and BANNED-08.

---

## Dimension 6 — Structural Complexity Calibration

*Is the amount of text / data / structure right for the email type — not too long, not too stripped?*

| Score | Signal |
|-------|--------|
| 5 | Callout rows: 3–5. Body: 3–6 lines (can include a Liquid loop). CTA: 1 clear action. Total reads in under 45 seconds. Emotional emails (wins, pack receipt, welcome) use cinematic brevity. Informational emails (reactivation, cart recovery) use structured narrative. |
| 4 | Slightly longer or shorter than ideal but not in a category that fails on scan. One extra paragraph that could be trimmed. |
| 3 | Readable with effort. Either 1–2 excess paragraphs OR slightly too sparse for the email's function. Still delivers the core message. |
| 2 | Wall of text (Almanac failure mode: 500+ words in a pack-received email) OR bullet-point skeleton (Brief failure mode: "Pack delivered. Set is live." with no narrative). |
| 1 | Either requires sustained reading to understand a transactional event OR delivers a single skeleton line for an email type that needs context and warmth. "Very weird. It's like unfinished copy, like a summary or bullet points. Really terrible." |

**Grounding:** Roham, verbatim: *"Your simpler options are the best. Just don't go too far in the direction of bullet point summaries."* Tester on Welcome Almanac: *"This is just a wall of text with a table. Very terrible."* Tester on Pack Received Brief: *"Very weird. It's like unfinished copy."*

---

## Dimension 7 — Design Uniqueness Per Email Type

*Does this email have its own visual identity — or does it look identical to every other email in the stack?*

| Score | Signal |
|-------|--------|
| 5 | Distinct visual grammar for this email type. Fast Break win confirmation does not look like a reactivation. Drop announcement does not look like a welcome. Tables only where genuinely tabular data exists. Visual hierarchy (hero placement, callout density, CTA weight) fits the emotional register of the email type. |
| 4 | Mostly distinct. One borrowed visual element (e.g., same callout count as another email) that doesn't collapse the identity. |
| 3 | Uses a shared component (e.g., header format) but the content assembly is differentiated enough to read as its own type. |
| 2 | Same callout-table layout, same body structure, same CTA format as 3+ other emails in the stack. "Looks a little too similar to the others." |
| 1 | Indistinguishable from another email type. Spreadsheet-feel applies to every email. Design system is a single template applied to all contexts. |

**Grounding:** Roham, verbatim: *"We can't just reuse the exact same template table in every single email. I think we need to have a design system of different kinds of emails... They need to sort of sing together but also be individually unique."* Also: *"Tables in general, I think, are dangerous, because using them too much makes the whole thing look like a spreadsheet."*

---

## Dimension 8 — Image Accuracy and Match

*Does the hero image match the email's content — and is it the correct official asset?*

| Score | Signal |
|-------|--------|
| 5 | Hero image is the correct official NBA Top Shot asset for this email type. For personalized emails (pack receipt, whale tier): the user's own Moment or pack art. For drop announcements: curator-provided drop art. Image is not stretched, corrupted, or from a different card's context. |
| 4 | Correct image category; may use a placeholder that will be replaced before send. Placeholder is clearly labeled as such. |
| 3 | Generic platform image (safe but not ideal). Does not actively mismatch the email content. |
| 2 | Image from a different context applied to this email (e.g., onboarding image on a Fast Break result). Creates dissonance but not a trust collapse. |
| 1 | Wrong image that actively undermines trust. "The image is broken... just a Top Shot logo that's super stretched out." Or: "I think it's the new user onboarding image. What the fuck? That's a big mistake. Big trust buster." |

**Grounding:** Tester, verbatim: *"The image is about something else. I think it's the new user onboarding image. What the fuck? That's a big mistake. Big trust buster."* Also tester on Abandoned Cart Almanac: *"THE IMAGE IS WRONG AGAIN."*

---

## Dimension 9 — Concierge Psychology (Whale-Tier Only)

*For whale-tier emails only: does the email open with the specific collector's specific holdings as the subject — not with a newsletter's curated patterns?*

| Score | Signal |
|-------|--------|
| 5 | Email opens with the named collector's actual holding: player, set, serial, entry price, current floor. The collector is not addressed as a subscriber to a publication; they are addressed as a specific person whose portfolio is being specifically discussed. "Three things the desk knows" is a secondary addendum after the specific holding review. |
| 4 | Holding is the lead; one element of newsletter-structure appears later but doesn't dominate. |
| 3 | Mix of specific holding data and broader desk patterns. The specific holding is present but not the clear lead. |
| 2 | Opens with desk patterns or "three things I noticed" structure. Specific holding data appears later, not as lead. Newsletter frame applied to concierge surface. |
| 1 | No specific holding data. Pure newsletter/publication format. "Absolutely terrible. Totally misunderstands whale psychology. You should dump whatever approach it is that's leading you here, because it's not the correct one." |

**Grounding:** Roham, verbatim: *"Absolutely terrible. Totally misunderstands whale psychology."* Memory file `feedback_email_design_system.md` §6: "Whale-tier psychology cannot be Stratechery-for-everyone."  
**Note:** Score N/A for non-whale-tier emails.

---

## Dimension 10 — L+XL Funnel Relevance

*Does the email's design, targeting, and CTA serve the L+XL segment and the funnel that feeds it — or is it optimized for raw conversion volume that doesn't trace to L+XL economics?*

| Score | Signal |
|-------|--------|
| 5 | Audience is defined against L+XL funnel logic. Email targets L2→L3 activation, L3→L4 progression, or L+XL retention. KPI in the brief traces explicitly to L+XL economics. |
| 4 | Audience is broad (all dormant users, all new signups) but the KPI framing acknowledges L+XL impact as the primary measure. |
| 3 | Audience is broad; KPI is stated in aggregate (conversion rate, click rate) without explicit L+XL trace. Acceptable for transactional emails (pack receipt, welcome) where the L+XL implication is indirect. |
| 2 | Email is explicitly optimized for volume metrics (raw M→L conversion) without any L+XL lens. Brief doesn't mention whale or L+XL anywhere. |
| 1 | Email targets a cohort known to have low L+XL representation (e.g., never-bought trial users only) and treats their activation as the headline win, without noting L+XL as the goal. |

**Grounding:** Memory file `feedback_top_shot_funnel_lens.md`: "L+XL segment economics first. L and XL collectors drive disproportionate Marketplace volume and platform revenue. Strategy, retention, reactivation, and product decisions get measured against L+XL behavior, NOT raw conversion rates across all signups."

---

## Dimension 11 — Production Hygiene

*Are there any broken Liquid variables, grammar errors, mismatched fields, or production defects?*

| Score | Signal |
|-------|--------|
| 5 | All Liquid variables verified as populated in the production schema. Subject line grammar correct. No leading/trailing spaces. CTA URLs valid and tested. Image URLs resolve. Liquid loops tested with edge cases (empty array, null values). |
| 4 | All critical path Liquid (subject, CTA URL, hero image) is verified. One or two non-critical variables have a sensible `| default: ""` fallback. |
| 3 | Main flow verified; fallbacks on some variables missing but not in high-visibility positions. |
| 2 | Known Liquid variable that may not be populated in all cases, in a visible position (subject, preheader, callout). |
| 1 | Production defect already known and unaddressed. E.g., truncated Liquid mid-expression (`?fastBreakId={{ event[`). Grammar error in a subject line sent at volume ("a NBA"). "Defect has been live for ~14 months." |

**Grounding:** cards.ts diagnosis for Fast Break: *"URL Liquid (verbatim, truncated): https://nbatopshot.com/fastbreak/onboarding/claim?fastBreakId={{ event[ — defect appears 2× in template — last template update 2025-03-12 — defect has been live for ~14 months."* Production defects ship on Day 0, before any voice upgrade.

---

## Dimension 12 — Factual Verification

*Are all cited statistics, superlatives, and data claims verified against a named source before customer-facing use?*

| Score | Signal |
|-------|--------|
| 5 | Every claim with a number is sourced. BQ-pulled data is cited with query reference or pull date. Superlatives (e.g., "most anticipated rookie since...") are scoped correctly and account for intervening players/events. Social proof numbers match the BQ pull that generated them. |
| 4 | Most numbers verified; one directional claim made without exact source but stated carefully ("approximately," "around"). |
| 3 | Numbers are roughly right and internally consistent; specific BQ source not cited but plausible given known platform data. |
| 2 | At least one number in the email has not been verified. Reviewer spotted it during review ("where is '$1.2M T30' from — is that accurate?"). |
| 1 | Fabricated statistics, unverified comparisons (e.g., "Cooper Flagg most anticipated since LeBron" without accounting for Wemby), or data that directly contradicts the documented platform record. Trust-busting if noticed by a collector. |

**Grounding:** Tester, verbatim: *"Also where is '$1.2m t30' from is that accurate?"* Tester, verbatim: *"You would say Cooper Flagg is the most anticipated rookie since LeBron? What about Wemby?"* Memory file `feedback_email_design_system.md` §9: "Avoid AI tells in copy... Strip them."

---

## Scoring Sheet Template

```
Card ID: _______________
Variant: _______________
Reviewer: ______________
Date: _________________

D1  Real Specificity                    [ 1 | 2 | 3 | 4 | 5 ]  [ BLOCK if 1 ]
D2  Positive Math Gate (if applicable) [ 1 | 2 | 3 | 4 | 5 | N/A ]
D3  Voice Fit for Surface               [ 1 | 2 | 3 | 4 | 5 ]  [ BLOCK if 1 ]
D4  Social Proof Presence               [ 1 | 2 | 3 | 4 | 5 ]  [ BLOCK if 1 ]
D5  AI-Tell Cleanliness                 [ 1 | 2 | 3 | 4 | 5 ]  [ BLOCK if 1 ]
D6  Structural Complexity Calibration   [ 1 | 2 | 3 | 4 | 5 ]  [ BLOCK if 1 ]
D7  Design Uniqueness Per Email Type    [ 1 | 2 | 3 | 4 | 5 ]  [ BLOCK if 1 ]
D8  Image Accuracy and Match            [ 1 | 2 | 3 | 4 | 5 ]  [ BLOCK if 1 ]
D9  Concierge Psychology (whale only)   [ 1 | 2 | 3 | 4 | 5 | N/A ]
D10 L+XL Funnel Relevance               [ 1 | 2 | 3 | 4 | 5 ]
D11 Production Hygiene                  [ 1 | 2 | 3 | 4 | 5 ]  [ BLOCK if 1 ]
D12 Factual Verification                [ 1 | 2 | 3 | 4 | 5 ]  [ BLOCK if 1 ]

BLOCKING FAILURES (any 1): _____________________
DIMENSIONS BELOW 3: ____________________________
VERDICT: [ PROCEED | REVISE | BLOCK ]
EDIT BRIEF: (note which dimensions need work and what specifically)
```

---

## Reference: The Goldilocks Standard

For quick calibration — the closest real examples to a "5 across the board" score in the current card deck:

- **Pack Received v1001** — Roham SHIP. No AI tells. Structured callouts + comp data loop. Platform-chronicler voice. Correct image. No over-explanation. This is the baseline the other 6 cards should be measured against.
- **Welcome Cinematic** — "Starting to be really good." Three callouts, three declarative beats, one CTA. Cooper Flagg era as the arrival wedge. Brief enough that it doesn't require reading. Strong enough that it doesn't feel like a skeleton.
- **Reactivation v1001** — Strong frame (portfolio appreciation with real floor data), needs real BQ math cohort-gate before shipping. The structure is right; the verification step is the remaining gate.

---

*Rubric version 1.0. Update when new feedback produces a new blocking pattern not covered above. Any rubric update requires a note of the source feedback and date.*
