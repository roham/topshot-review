---
title: NBA Top Shot — Strategy Source of Truth
date: 2026-05-04
author: SoT Compiler (Magic subagent)
status: COMPILED — all claims cited; verified against source files
purpose: Feeds Phase 2 framework audit → Phase 3 strategy cascade (Collector's Almanac / Trading Card Cinematic / Live Market Brief)
sources-read:
  - collect-hq/nba-top-shot/2026-05-03-cmo-strategy-framework.md
  - collect-hq/nba-top-shot/2026-05-03-marketing-plan-may3-17.md
  - collect-hq/nba-top-shot/2026-05-03-morning-approval-brief.md
  - collect-hq/nba-top-shot/2026-05-03-reactivation-copy-specimens.md
  - collect-hq/strategy/2026-05-03-what-we-can-achieve-mixpanel-baseline.md
  - collect-hq/strategy/2026-05-03-cmo-spine-validation/06-final-synthesis.md
  - collect-hq/synthesis/2026-05-03-cross-loop.md
  - collect-hq/nba-top-shot/intelligence/ (56 files; 10 read in full, remainder scanned for taglines — see §4, §7)
  - collect-hq/nba-top-shot/strategy/2026-05-03-collectors-clock-product-brief.md
  - collect-hq/nba-top-shot/strategy/2026-05-03-github-actions-campaign-brief.md
  - plugins/loki/contexts/collectibles/nba-top-shot.md
  - research-reports/data-science-insights/mixpanel-queries/ (29 JSON files; 18 sampled in detail)
  - collect-hq/data-reports/findings/F-MAGIC-01-floor-sweep-vs-organic-2026-05-03.md
  - parent-session findings, 2026-05-04 (BQ baselines + CIO stack audit provided in task prompt)
---

# NBA Top Shot — Strategy Source of Truth

## Document Purpose

This is a compilation-only document. It contains no recommendations or strategy. Every fact has an inline citation. Facts not in any source are explicitly labeled `(NOT IN SOURCES — see GAP §7.X)`. The GAP LIST in §7 is specific and actionable.

---

## 1. Collector Segments (Known)

### 1.1 Experience Ladder (L0–L4)

Source: [source: plugins/loki/contexts/collectibles/nba-top-shot.md]

| Level | Definition | Behavior |
|-------|-----------|----------|
| **L0 — Aware** | Knows Top Shot exists | Has not created account |
| **L1 — Onboarded** | Account created, browsing | No purchase yet |
| **L2 — First Purchase** | Bought first pack or marketplace Moment | W0 conversion critical here |
| **L3 — Engaged** | Regular buyer, enters challenges, trades | Core active user |
| **L4 — Invested** | XL whale, 108-tier, portfolio >$10K, community leader | Revenue backbone — protect at all costs |

### 1.2 BQ-Derived Segment Sizes

Source: [source: parent-session findings, 2026-05-04]

- **Total idle L1+L2 collectors:** 1.27M (>30d idle). Of these:
  - **>60d idle:** 1.26M
  - **>180d idle:** 1.24M
- **L1-only (never-bought, idle >30d):** 774K — zero packs lifetime
- **Dormant $100K+ lifetime spend (L+XL whale tier):** 1,122 collectors holding $234.6M in historic GMV

### 1.3 Loki-Defined Revenue Concentration

Source: [source: plugins/loki/contexts/collectibles/nba-top-shot.md]

- **XL whales:** ~66–83% of monthly revenue
- **Challenge participants:** 2,178 of ~16,000 active users (14% challenge participation vs. 30% NFL benchmark)
- **Pack-only buyers who never touch marketplace:** 83% (post-pack dead end)

### 1.4 Reactivation Tiers (Three-Tier Structure)

Source: [source: plugins/loki/contexts/collectibles/nba-top-shot.md]

| Tier | Pool Size | Definition | Approach |
|------|-----------|-----------|----------|
| **Hot** | ~737 leads | Spent $10K+, lapsed 6–12 months | Personal outreach, VIP re-onboarding |
| **Warm** | ~3,000 | Former L/XL, lapsed 12–24 months | Email sequence + exclusive pack access |
| **Cold** | ~31,000+ | Any lapsed user | Mass campaign, low-cost activation offers |

Additionally: 19,631 organic reactivations already observed — confirms demand exists in lapsed pool. [source: plugins/loki/contexts/collectibles/nba-top-shot.md]

3,733 users in reactivation pool spent $10K+ lifetime. [source: plugins/loki/contexts/collectibles/nba-top-shot.md]

### 1.5 CMO-Defined Growth Segments (Reactivation Campaign)

Source: [source: collect-hq/nba-top-shot/2026-05-03-reactivation-copy-specimens.md]

The 1,122 dormant L+XL collectors subdivide into three campaign segments:

| Segment | Definition | Estimated Size | Behavioral Signal |
|---------|-----------|---------------|-------------------|
| **A — Origin Story Holders** | Largest holds are S1–S3 or Genesis Moments, pre-2023 acquisitions | ~300–350 (~30% of dormant LTV cohort) | Left because market softened; did not stop believing |
| **B — Single-Star Believers** | Collection 60%+ concentrated in one player | ~400–450 (most common LTV cluster) | Star is on court now; stopped transacting, not caring |
| **C — The Survivors** | Last transaction 9–18 months ago (late 2024 / early 2025) | ~300–350 | Held through bear market, went quiet; waiting for a reason |

NOTE: Segment sizes are estimates from internal cohort knowledge. BQ credential needed for exact counts. [source: collect-hq/nba-top-shot/2026-05-03-reactivation-copy-specimens.md]

### 1.6 Four Collector Archetypes (Behavioral)

Source: [source: collect-hq/nba-top-shot/intelligence/2026-05-03-four-collector-archetypes.md]

| Archetype | Who | Buy Trigger | Price Range | Kill Condition |
|-----------|-----|-------------|-------------|----------------|
| **Type 1 — Story Buyer** | Buys when narrative is live and unresolved | Compelling uncertainty remaining | $5–$25 median | Certainty — if player becomes favorite/certain, Story Buyer exits |
| **Type 2 — Proof Buyer** | Buys after dramatic confirmed performance | Post-game, performance exceeded expectations | $8–$25 median | Nothing to prove; consistent dominant play (SGA sweeps) |
| **Type 3 — Artifact Holder** | Long-horizon; 10-year clock | Historical significance, not current narrative | $500–$10,000+ ceiling | Supply absence — they wait for the specific Moments |
| **Type 4 — Community Member** | Bought for belonging; lapsed | Social pressure, shared experience, peak national attention | $1–$5 floor | Feeling "not in it"; Discord too sophisticated; no social moment |

**Funnel relationship:** Type 4 → Type 2 → Type 1 → Type 3. Collectors enter as Type 4 and deepen over time. [source: collect-hq/nba-top-shot/intelligence/2026-05-03-four-collector-archetypes.md]

**Reactivation implication:** "The 40–80 segment (lapsed users) is almost entirely Type 4." [source: collect-hq/nba-top-shot/intelligence/2026-05-03-four-collector-archetypes.md]

### 1.7 Primary Audience Identification (Loki Product Context)

Source: [source: plugins/loki/contexts/collectibles/nba-top-shot.md]

- **Primary:** Gambler-Collector
- **Secondary:** Tribal Fan
- **NBA audience skews speculation-driven.** "Called It" moments — owning a Moment before the player goes off, then flexing — is the core WOM engine.

---

## 2. Collector Motivations / Jobs-to-Be-Done

### 2.1 The Documentary Frame (Collector Psychology)

Source: [source: collect-hq/nba-top-shot/intelligence/2026-05-03-top-shot-as-documentary-system.md]

> "A Moment is a document of something that happened. The video clip is the record. The serial number is the provenance. The blockchain is the registry. The collector is the archivist."

> "The collector who owns LeBron's scoring record Moment doesn't own a certificate that says 'LeBron passed Kareem on February 7, 2023.' They own the footage of the second that happened."

> "The documentary frame is panic-resistant. Not because it changes the price — but because it changes the emotional relationship with the holding. Collectors who understand they hold documents of basketball history don't behave the same way in down markets as collectors who think they're holding a speculative asset."

Community language adoption confirmed: "Collectors are using our language back at us: 'proof moment,' 'incomplete document,' 'name getting heavier.'" [source: collect-hq/nba-top-shot/intelligence/2026-05-03-top-shot-as-documentary-system.md]

### 2.2 The Certainty Premium — What Drives Buying

Source: [source: collect-hq/nba-top-shot/intelligence/2026-05-03-certainty-premium-observation.md]

Empirical observation: At T+0 (19:30Z, May 3, tip-off of Pistons/Magic G7):

| Player | 24h Sales | Status |
|--------|-----------|--------|
| Joel Embiid | 52 | Confirmed for R2 (announced) |
| Cade Cunningham | 18 | Live G7 in progress |
| Donovan Mitchell | 0 | Live G7 in 4h |

**"The market chose the closed story over the open one. Embiid 53, Cade 18, 11 minutes into G7."**

At T+40min, Cade's count dropped to 17 (rolling window). Embiid ratio held at **3.2× advantage for the resolved story over the live G7 player.** [source: collect-hq/nba-top-shot/intelligence/2026-05-03-certainty-premium-observation.md]

### 2.3 Narrative Density as the Premium Driver

Source: [source: collect-hq/nba-top-shot/intelligence/2026-05-03-asymmetric-certainty-premium.md]

> "The certainty premium isn't binary (uncertain → certain = buy). It scales with narrative density — how much happened on the path to confirmation."

Both Embiid and Brunson were confirmed for R2. Embiid: 54 transactions ($14 median). Brunson: 0 transactions.

Embiid's path: appendectomy → returned 9 days post-surgery → 34/12/6 in G7 at Boston → 7-seed road win over defending first round.

Brunson's path: 2-seed Knicks advanced as expected.

> "The collector market [is] effectively a market's real-time ranking of which playoff runs have the most narrative weight."

**Corrected demand model by narrative density:** [source: collect-hq/nba-top-shot/intelligence/2026-05-03-asymmetric-certainty-premium.md]

| Narrative Density | Phase 2 Spike | Phase 3 Plateau |
|-------------------|---------------|-----------------|
| Extraordinary (appendectomy comeback) | 3× baseline | High activity |
| Meaningful (upset, comeback) | 1.5–2× baseline | Moderate activity |
| Expected (top seed advances) | Minimal or zero | Low activity |

### 2.4 Three-Phase Demand Model

Source: [source: collect-hq/nba-top-shot/intelligence/2026-05-03-three-phase-demand-model.md]

> "Collector demand doesn't correlate with drama. It correlates with resolved narrative. The mechanism isn't 'exciting game = more buying.' It's 'confirmed story = more buying.'"

- **Phase 1 (Uncertain):** Story open. Low daily transaction volume. Wide bid-ask spread. "I can't buy what isn't certified."
- **Phase 2 (Announced Spike):** Narrative certified. Transaction volume spikes 2–4× within 24h. Trigger is **announcement** not game footage. "Now I know what I'm buying."
- **Phase 3 (Between Chapters Plateau):** Story confirmed and stable. Steady trickle (1–3/hr). "The Embiid story is real. I'll buy now at the current floor."
- **Phase 4 (Closed):** Season over. Two competing theories — Theory A: floor holds (document preserved); Theory B: exit pressure. (NOT YET CONFIRMED — data pending 24h post-G7. [source: collect-hq/nba-top-shot/intelligence/2026-05-03-three-phase-demand-model.md])

**Critical product gap revealed:** "Peak demand is at announcement. Current minting is post-footage. By the time a new Moment from Embiid's G7 performance is available, the announcement-day spike has already peaked and settled." [source: collect-hq/nba-top-shot/intelligence/2026-05-03-three-phase-demand-model.md]

### 2.5 Conversion Window — When Collectors Buy

Source: [source: collect-hq/nba-top-shot/intelligence/2026-05-03-the-conversion-window.md]

Evidence from three consecutive days of pre-game monitoring:

- **Pistons/Magic G5 (Cade's 45-point game):** Pre-game baseline 2 listings, $12 median. Post-game within 4 hours: 43 transactions — **21× volume lift.**
- **All G7 players, May 3 pre-game 7-hour window:** Dead flat. Zero net new transactions across all 5 monitored players.

> "We are communicating on the wrong side of the conversion window. Right now, our pre-game content is designed to create excitement and drive potential buys before games. The data says: nobody's buying before games."

Conversion timing by phase: [source: collect-hq/nba-top-shot/intelligence/2026-05-03-the-conversion-window.md]
- Pre-game: "stage the story" — NOT a call to buy
- Post-game (15 min–4 hours): THIS is the conversion window
- Post-game (4–48 hours): Extended second conversion wave

### 2.6 Collector Clock (Timing of Market Activation)

Source: [source: collect-hq/nba-top-shot/strategy/2026-05-03-collectors-clock-product-brief.md]

From 15+ market snapshots across two G7s and post-game windows:

| Time (ET) | Market Activity |
|-----------|----------------|
| 6–9 AM | Active — morning recap window, collectors buying |
| 9 AM–5 PM | Moderate baseline |
| 5–10 PM | Declining — pre-game suppression |
| 10 PM–12 AM | Near-zero — T+40min post-G7 still flat |
| 12–6 AM | Zero |

"The collector doesn't buy when the game is exciting. They buy when the story is processed. 'Processed' means: slept on it, read the recap, seen the highlights, understood what it means." [source: collect-hq/nba-top-shot/strategy/2026-05-03-collectors-clock-product-brief.md]

### 2.7 Arc Moment Framing — What Collectors Want to Own

Source: [source: collect-hq/nba-top-shot/intelligence/2026-05-03-arc-moments-mint-case.md]

> "The collector who wants to own 'Cade's comeback' is being offered a document of G7 when the real document is G5 + G6 + G7 as a unit. That's a different thing."

Collector wants "the story is complete" Moment, not just the capstone game clip. Verbatim collector psychology on arc value: "In 2035, a collector showing this Moment to someone who wasn't following basketball in 2026 can say: 'That's the three games that made a comeback. All three are described right here.'" [source: collect-hq/nba-top-shot/intelligence/2026-05-03-arc-moments-mint-case.md]

### 2.8 W0 Conversion — First Purchase Psychology

Source: [source: plugins/loki/contexts/collectibles/nba-top-shot.md]

> "When packs became positive EV: W0 conversion jumped from 2.9% → 21.2%. Proves: if the first purchase feels like a win, the user stays. Pack EV positive is non-negotiable."

---

## 3. Customer Journey + Funnel Facts

### 3.1 BQ Conversion Baselines (Signup → First Purchase)

Source: [source: parent-session findings, 2026-05-04]

| Era | D7 Conversion | D30 Conversion | Notes |
|-----|--------------|----------------|-------|
| Dark-window (Dec 18, 2025 → today) | **8.54%** | **8.76%** | No active welcome program |
| Welcome #132 era | 6.75% | 6.99% | Lower conversion despite better voice |
| Welcome #77 era | 11.37% | — | Confounded with Series 6 launch |

**Dark-window is +1.79pp BETTER than Welcome #132 era on D7 conversion.** Critical interpretation note: this shows that suppressing a broken welcome program did not hurt conversion — but the cohort quality confound (dark-window users may be more self-selected) is unresolved. [source: parent-session findings, 2026-05-04]

- **Mean first-7d basket among signups who convert:** $27.54 [source: parent-session findings, 2026-05-04]

### 3.2 Campaign 163 Investigation — Funnel Drop-Off at Onboarding

Source: [source: collect-hq/nba-top-shot/intelligence/2026-05-03-camp163-v2-onboarding-investigation.md]

**CTR collapse: Camp 132 → Camp 163 decomposition**

| Metric | Camp 132 (V1) | Camp 163 (V2) | Delta |
|--------|--------------|--------------|-------|
| CTR | 13.24% | 4.85% | −8.39pp |
| Human CTOR | 41.7% | 13.6% (primary only) | −28pp |
| Delivery rate | 93.5% | 96.4% | V2 better |
| Journey email actions | 19+ | 3 | −84% |
| Emails actively sending (30d) | Multiple | **1** | |

**Root cause — two independent causes that compound:**

1. **Journey truncation (architecture):** V2 removed 85% of email touchpoints from V1. Actions 4528 and 4550 have 0 sends in 30 days. The V2 journey was designed as a 3-step funnel but runs as a 1-step sequence.
2. **Voice regression (content):** Camp 163 primary email reads as retail transaction copy, not collector voice. "Quick, easy, Apple Pay, Google Pay" — zero basketball, zero collector context. Dynamic content injection (`{{ content }}` — personalized basketball context injected in V1) was eliminated entirely.

**Variance decomposition of the 8.85pp CTR drop:** 80% is CTOR (content quality), 20% is OR (deliverability). "Deliverability is NOT the problem." [source: collect-hq/nba-top-shot/intelligence/2026-05-03-camp163-v2-onboarding-investigation.md]

**UTM contamination:** Both Camp 132 and Camp 163 templates contain UTM parameters pointing to `utm_campaign=%5BCopy%5D+05.19.25+Playoffs+Second+Round+Drop+announce` — a May 2025 drop announcement, not the onboarding campaign. All click attribution is corrupted. [source: collect-hq/nba-top-shot/intelligence/2026-05-03-camp163-v2-onboarding-investigation.md]

### 3.3 April 2026 Email Funnel (Mixpanel Data)

Source: [source: research-reports/data-science-insights/mixpanel-queries/91cd12a7-337a-4ddf-b6ce-03923369f087-1.json]

April 2026 Email Opened total (computed from daily Mixpanel series): **2,010,727 opens**

Peak Email Opened day: April 17 — **199,144 opens** [source: research-reports/data-science-insights/mixpanel-queries/91cd12a7-337a-4ddf-b6ce-03923369f087-1.json]

Total April 2026 Email Link Clicked: **33,447 clicks** (computed from same series)

Peak Email Link Clicked day: April 1 — **1,977 clicks** [source: research-reports/data-science-insights/mixpanel-queries/91cd12a7-337a-4ddf-b6ce-03923369f087-1.json]

**Average CTR (clicks/opens, April 2026):** 33,447 / 2,010,727 = **1.66%**

VALIDATION: This aligns closely with the 1.68% average CTR stated in `what-we-can-achieve-mixpanel-baseline.md`. [source: collect-hq/strategy/2026-05-03-what-we-can-achieve-mixpanel-baseline.md]

Source: [source: research-reports/data-science-insights/mixpanel-queries/1b677c79-2738-4929-ab32-862aad2f4fd6-1.json]

April 14–26 2026 daily opens and clicks (from Mixpanel, campaign lift window):

| Date | Email Opened | Email Link Clicked |
|------|-------------|-------------------|
| Apr 14 | 25,928 | 576 |
| Apr 15 | 58,219 | 1,173 |
| Apr 16 | 75,116 | 1,502 |
| **Apr 17** | **199,144** | **1,791** |
| Apr 18 | 95,384 | 1,474* |
| Apr 19 | 46,418 | — |
| Apr 20 | 60,299 | 1,328 |
| Apr 21 | 82,190 | 1,383 |
| Apr 22 | 109,140 | 1,662 |
| Apr 23 | 119,188 | — |
| Apr 24 | 101,419 | — |
| Apr 25 | 52,532 | — |
| Apr 26 | 39,518 | 846 |

*Apr 17 is the email blast day (likely "Run It Back" announcement). CTR on Apr 17 blast: 1,791/199,144 = **0.9%**. [source: collect-hq/strategy/2026-05-03-what-we-can-achieve-mixpanel-baseline.md]

### 3.4 campaign_id Attribution Gap (Mixpanel)

Source: [source: research-reports/data-science-insights/mixpanel-queries/656eea31-353d-4993-9bc2-cb125b8b4465-2.json]

Email Link Clicked events: 32,686 total records. `campaign_id` field present on only **18,689 of 32,686** records = **42.8% of click events have campaign_id**. The remaining **57.2% of clicks have no campaign attribution.**

NOTE: The marketing plan states "32% of campaign data currently dark" [source: collect-hq/nba-top-shot/2026-05-03-marketing-plan-may3-17.md]. The Mixpanel raw query shows 57% missing `campaign_id` on click events. Discrepancy may reflect different measurement bases. Both are material. See §7 GAP 7.5.

### 3.5 DAU and Order Lift — Campaign vs Baseline

Source: [source: research-reports/data-science-insights/mixpanel-queries/051a70ec-bef5-4b4d-be5d-b03793a9e09b-1.json]

April 14–26 2026 daily Application Opened, Order Confirmed, pack-opening-start:

| Date | App Opens | Orders Confirmed | Pack Opens |
|------|-----------|-----------------|-----------|
| Apr 14 (baseline) | 1,777 | **35** | 37 |
| Apr 15 | 3,107 | 239 | 1,466 |
| Apr 16 | 2,168 | 240 | 992 |
| Apr 17 (email blast) | 2,790 | 315 | 381 |
| Apr 18 | 4,457 | 526 | 287 |
| **Apr 19** | 3,492 | 485 | **207** |
| **Apr 20** | 3,251 | **787** | 225 |
| **Apr 21** | 3,558 | **685** | 584 |
| **Apr 22** | 3,187 | **824** | 887 |
| Apr 23 | 2,980 | 612 | 311 |
| Apr 24 | 4,152 | 717 | 235 |
| Apr 25 | 3,014 | 731 | 346 |
| Apr 26 | 3,253 | 441 | 414 |

Peak orders: Apr 22 — **824 confirmed orders** vs. Apr 14 baseline of **35 orders**. Lift: **23.5×**.

The `what-we-can-achieve` document states "Apr 20–22 peak: 787–824 orders/day; lift 22–24× vs Apr 14 baseline of 35." [source: collect-hq/strategy/2026-05-03-what-we-can-achieve-mixpanel-baseline.md] — CONFIRMED by Mixpanel data. [source: research-reports/data-science-insights/mixpanel-queries/051a70ec-bef5-4b4d-be5d-b03793a9e09b-1.json]

Note from baseline doc: "The April drop event (Apr 15–16 pack-open spike) preceded the email blast. The campaign amplified something real — it didn't create demand from scratch. L1 arcs perform best when anchored to live events or drops." [source: collect-hq/strategy/2026-05-03-what-we-can-achieve-mixpanel-baseline.md]

### 3.6 Fast Break Reactivation Events (April 2026)

Source: [source: collect-hq/strategy/2026-05-03-what-we-can-achieve-mixpanel-baseline.md]

- 2,436 total Fast Break events in April
- Peak April 19: 1,847 events
- Fires 2 days after the email blast → "suggests a lead-lag relationship: email creates intent, in-product mechanic captures it"

### 3.7 Per-Layer Conversion Benchmarks

Source: [source: collect-hq/strategy/2026-05-03-what-we-can-achieve-mixpanel-baseline.md]

- **L1 tentpole (anchored to live event/drop):** 2,000–5,000 incremental orders per arc
- **L2 always-on essay (Camp-132 quality, no event anchor):** 300–700 incremental orders per piece
- **L3 reactivation (dormant cohort touch):** 22–37 purchases per send, $11–18.5K immediate lift; $1.4M LTV potential at 5% dormant-whale reactivation rate

### 3.8 Voice Register Conversion Multiplier

Source: [source: collect-hq/strategy/2026-05-03-what-we-can-achieve-mixpanel-baseline.md]

- **Camp 132** (warm onboarding voice): 31.75% open / 13.24% CTR
- **Camp 163** (cold-voice replacement): 4.46% CTR
- **3× CTR multiplier from voice register alone.** Same audience, same send timing.

Caveat filed: "before assuming the gap is purely copy-driven, run a deliverability check on Camp 163 (inbox placement, sender reputation, list freshness)." [source: collect-hq/strategy/2026-05-03-cmo-spine-validation/06-final-synthesis.md]

### 3.9 Floor-Sweep vs. Organic Demand — Market Funnel Behaviors

Source: [source: collect-hq/data-reports/findings/F-MAGIC-01-floor-sweep-vs-organic-2026-05-03.md]

Two demand modes observed across 130 deduped marketplace sales (May 3):

- **Mode A — Organic price discovery (Cade Cunningham TSPE):** Player in live current-playoff narrative + current-vintage Moment available. Dispersed buying across $3–$25, 9 distinct prices.
- **Mode B — Floor-sweep (Evan Mobley, LeBron, Embiid):** Either player in narrative with NO current-vintage, OR post-narrative player. Buying pools at single price point (modal concentration 47–80%).

Mobley: 18 of 20 sales within $1 of the $13 Base Set floor (80% modal concentration) — NO 2026 playoff-vintage Moment available. This is the confirmed-gap demand mode. [source: collect-hq/data-reports/findings/F-MAGIC-01-floor-sweep-vs-organic-2026-05-03.md]

---

## 4. Competitive Landscape (Collector-Side)

### 4.1 Topps Returns to NBA — Direct Competitive Brief

Source: [source: collect-hq/nba-top-shot/intelligence/2026-05-03-topps-nba-returns-competitive-brief.md]

**What happened:** Topps acquired official NBA card license for 2025–26 after a 15-year absence. Products: Topps Basketball, Topps Hoops (May 14), Bowman Basketball (May 7, prospect angle with Cooper Flagg), **Topps NOW NBA** (same-day print-on-demand performance cards).

**Topps NOW mechanics vs. Top Shot Instant:**

| Dimension | Topps NOW | Top Shot Instant |
|-----------|-----------|-----------------|
| Format | Physical card | Digital Moment |
| Price | $8.99 base | $9–$25+ |
| Availability window | 24 hours | Variable |
| Scarcity | Print run closes after window | Minted count fixed |
| Visual experience | Static image + stats | Video highlight |
| Provenance | Print run # on card | Serial # on-chain |
| Grading upside | PSA/BGS grading adds premium | No grading analog |
| Liquidity | eBay, COMC, shows | Top Shot marketplace |

**Observed data point:** Cade Cunningham Topps NOW card #287: $8.99, print run 1,150. Cade Top Shot Base Set median that day: $12, 40 transactions. Price gap: $3. [source: collect-hq/nba-top-shot/intelligence/2026-05-03-topps-nba-returns-competitive-brief.md]

**Top Shot's stated moat:** "Top Shot sells the moment that actually happened. Topps sells a card about it." Video proof of the play vs. illustrated record of the stat line. [source: collect-hq/nba-top-shot/intelligence/2026-05-03-topps-nba-returns-competitive-brief.md]

**Category development gift framing:** "Topps will introduce millions of casual sports fans to the idea of owning NBA performance-tied collectibles... The migration path from 'Topps NBA collector' to 'Top Shot collector' is shorter than any other acquisition funnel Top Shot has." [source: collect-hq/nba-top-shot/intelligence/2026-05-03-topps-nba-returns-competitive-brief.md]

### 4.2 Competitive Drop Cadence — Frigga Scan of Four Analogs

Source: [source: collect-hq/nba-top-shot/intelligence/2026-05-03-drop-cadence-competitive-brief.md]

**Magic: The Gathering (strongest analog):**
- ~6 sets/year, each a distinct product experience. Schedule recently spread to keep each release feeling like an event.
- "Bloomburrow drove sequential upticks in new-player acquisition rates and weekly average user counts." [Q3 2024]
- 2025 revenue: +60%, powered by Universes Beyond IP crossovers (marquee batch events with cultural anchors).
- Key lesson: "MTG's sustainable growth comes from treating every set launch as a mainstream-entry moment."
- Gap identified: MTG uses Secret Lair limited drops, promotional cards, and Arena events to sustain between-set engagement. The gap doesn't close on its own. [source: collect-hq/nba-top-shot/intelligence/2026-05-03-drop-cadence-competitive-brief.md]

**Nike SNKRS (drop mechanics):**
- 170M users across Nike app family. Evolved 2025: SNKRS Reserve (preorder to reduce anxiety), SNKRS Link (social-gated drops for true fans), lifecycle CRM.
- "DAU spikes during drops with high sell-through — the in-app event is the business event."
- "Engineered scarcity + community rituals = higher lifetime value."
- Nike is deliberately moving AWAY from shock drops toward intentional gating — "confident anticipation, not FOMO panic." [source: collect-hq/nba-top-shot/intelligence/2026-05-03-drop-cadence-competitive-brief.md]

**Sorare (digital sports collectibles peer):**
- 378K cardholders (33% jump YoY) but revenue unstable.
- 35% staff layoff November 2025; CTO stepped back.
- Migrated to Solana for lower transaction costs.
- "Revenue still depends heavily on card sales, which fluctuate with sports seasons, player hype, and market sentiment."
- Introduced "Card Factory" crafting (burn old cards) to create between-drop engagement.
- Key lesson: "Continuous/diffuse supply model does NOT solve the between-drop engagement problem." [source: collect-hq/nba-top-shot/intelligence/2026-05-03-drop-cadence-competitive-brief.md]

**Fanatics / Topps — Festival Model:**
- Fanatics Fest: in-person festival with exclusive drops. Three exclusive Topps products available only in-person or day-of. London flagship store with in-store breaking area.
- "Product drop feature with fairness mechanism (not first-come-first-serve)."
- "The 'temple event' concept is real and Fanatics is betting on it with physical retail."
- Key challenge: Fanatics Fest is once-a-year; data on sustained acquisition (vs. existing-fan excitement) unclear. [source: collect-hq/nba-top-shot/intelligence/2026-05-03-drop-cadence-competitive-brief.md]

**Frigga synthesis — what Roham's hypothesis gets right vs. missing:**

Gets right:
- **Leg 1 (curation quality):** Supported by MTG. Thematic coherence matters.
- **Leg 3 (temple event):** Strongly supported by SNKRS and Fanatics Fest. "The drop IS the event."

Missing from hypothesis:
- Between-drop collapse is unsolved. Sorare shows what happens without bridging it.
- Supply visibility/calendar opacity creates anxiety. MTG players know 18 months ahead what sets are coming.
- Announcement-day demand window is untapped. None of these analogs face this exact problem — the underlying game creates demand BEFORE the product is available. [source: collect-hq/nba-top-shot/intelligence/2026-05-03-drop-cadence-competitive-brief.md]

### 4.3 What Was NOT Found in Competitive Sources

Searched sources: [source: collect-hq/nba-top-shot/intelligence/2026-05-03-topps-nba-returns-competitive-brief.md], [source: collect-hq/nba-top-shot/intelligence/2026-05-03-drop-cadence-competitive-brief.md], all intelligence files (56 files listed; full folder scan). Not found:

- Disney Pinnacle / Sorare platform-specific collector sentiment data
- Panini NBA card market share figures (only Topps return price point cited)
- Fanatics Live (separate from Fanatics Fest) competitive brief
- Sports card LCS aggregator data
- Any Frigga output from collect-hq/data-reports/ beyond drop-cadence brief (data-reports folder contains only INDEX.md and F-MAGIC-01 findings file)

These represent competitive intelligence gaps — see §7 GAP 7.6.

---

## 5. Stack Delivery Audit

### 5.1 Customer.io Stack Audit (Email)

Source: [source: parent-session findings, 2026-05-04]

**Workspace:** 161112

| Metric | Value |
|--------|-------|
| Total campaigns | 139 |
| Running campaigns | 24 |
| Lifetime newsletters | 1,198 |
| Drop one-off newsletters | ~1,000 (of 1,198) |

**Welcome Programs — All Three Stopped:**

| Campaign | Sends | Open Rate | CTR | Status |
|----------|-------|-----------|-----|--------|
| Welcome #6 | 15,390 | 33.2% | 3.8% | Stopped |
| Welcome #77 | 206,786 | 38.6% | 1.7% | Stopped |
| Welcome #132 | 16,852 | 44.2% | 12.8% | Stopped |

Currently active welcome: **Welcome #163** — single active action (4525 "Buy Your First Pack"), 3,279 sends/30d. Actions 4528 and 4550 have 0 sends in 30 days (dead path). [source: parent-session findings, 2026-05-04; source: collect-hq/nba-top-shot/intelligence/2026-05-03-camp163-v2-onboarding-investigation.md]

**Critical Running Campaigns with Known Issues:**

| Campaign | Status | Issue |
|----------|--------|-------|
| Pack Received (#10) | Running | ~10 words body, voice-empty, no narrative variables |
| Abandoned Cart (#18) | Running | Cliché voice |
| Fast Break Daily Result (template 1133) | Running | **BROKEN Liquid URL** `?fastBreakId={{ event[` — production defect |
| Reactivation campaign #1 | Draft (empty) | Customer.io demo-gallery placeholder copy |

**Programmatic gaps:**
- 0 whale-tier programmatic surfaces [source: parent-session findings, 2026-05-04]
- 0 post-purchase narrative emails for marketplace buys
- 0 personalized collection-state emails

### 5.2 Email Channel Benchmarks vs. Competitors

Source: [source: parent-session findings, 2026-05-04]

| Platform | Open Rate | CTR | Placed-Order Rate |
|----------|-----------|-----|-------------------|
| Top Shot (Camp 132, V1 welcome) | 44.2% | 12.8% | (NOT IN SOURCES — see GAP §7.7) |
| Top Shot (Camp 163, V2 welcome) | ~32% | 4.46% | (NOT IN SOURCES — see GAP §7.7) |
| Skybox Collectibles welcome series | 63.6% | 8.3% | 7.1% |

Industry benchmarks: [source: parent-session findings, 2026-05-04]
- Image+text 60/40 outperforms text-only by 42% CTR
- Personalization lifts conversion 6× and CTR 41%
- Programmatic flows: 5.3% of sends → 41% of email revenue (ARPU 18×)

### 5.3 Slack / Community Surface

Source: [source: collect-hq/nba-top-shot/2026-05-03-cmo-strategy-framework.md; source: collect-hq/synthesis/2026-05-03-cross-loop.md]

Current distribution is Slack-first (Phase 1). All community editorial content posts here. One top-level post per channel per 24h, with threads underneath.

**Critical constraint:** "The dormant cohort by definition isn't checking Slack. Without Customer.io send authorization, we can build the content but can't deliver it." [source: collect-hq/nba-top-shot/2026-05-03-cmo-strategy-framework.md]

**Editorial volume produced but not yet distributed:** 78+ briefs written in prior sessions; conditional copy ready for both game paths in G7s. Distribution is the constraint, not inventory. [source: collect-hq/nba-top-shot/2026-05-03-marketing-plan-may3-17.md]

### 5.4 In-App Surface

Source: [source: plugins/loki/contexts/collectibles/nba-top-shot.md]

- **Atlas campaign builder (Jim Wheaton):** Enables per-user homepage personalization. Four states: New user / Active collector / Lapsed user / Whale.
- **Homepage personalization:** Technically available but not cited as active for editorial content delivery.
- **Post-pack flow:** 83% of pack-only buyers never touch marketplace. No guided next step post-open — "no 'list this on marketplace,' no 'enter this challenge.'" [source: plugins/loki/contexts/collectibles/nba-top-shot.md]
- **In-app editorial delivery:** Not yet a distribution surface for show-runner content. [source: collect-hq/nba-top-shot/2026-05-03-marketing-plan-may3-17.md]
- **Push notifications:** Referenced in Collector's Clock brief as current asset but timing is misaligned — same-night push fires when collectors aren't buying. [source: collect-hq/nba-top-shot/strategy/2026-05-03-collectors-clock-product-brief.md]

### 5.5 Fast Break (Daily Engagement Surface)

Source: [source: plugins/loki/contexts/collectibles/nba-top-shot.md]

- Daily prediction game. Neil Laessig engineering; Jordan Wagner sole operator.
- Free to play, earns points toward rewards.
- Drives daily app opens — "critical for retention."
- Links predictions to Moment ownership (owning the player boosts score).
- **April 2026:** 2,436 events, peak 1,847 on April 19 (2 days after email blast). [source: collect-hq/strategy/2026-05-03-what-we-can-achieve-mixpanel-baseline.md]

### 5.6 Social / External Channels

Source: [source: collect-hq/nba-top-shot/2026-05-03-cmo-strategy-framework.md]

- PR amplification test planned: "What the Market Called" piece to 3 journalists (Sportico, The Athletic, Bleacher Report) — C-amplification thesis test.
- External media currently does NOT amplify Top Shot data: "Sportico, The Athletic, Bleacher Report cite CryptoSlam for floor data, not Top Shot — even when they know we have better data. Issuer-credibility deficit." [source: collect-hq/nba-top-shot/2026-05-03-cmo-strategy-framework.md]
- During playoffs Sam Williams produces 3–4 videos per day. Templates: Hype/Countdown, Pack Opening, Collector Spotlight, Moment of the Day, Challenge Walkthrough. [source: plugins/loki/contexts/collectibles/nba-top-shot.md]

### 5.7 GitHub Actions Campaign Approval Flow (Infrastructure, Not Yet Built)

Source: [source: collect-hq/nba-top-shot/strategy/2026-05-03-github-actions-campaign-brief.md]

Current state: Magic writes drafts → buried in Slack → Matt/Dan finds it (sometimes) → manually approves → manually executes in CIO → Magic has no visibility on whether it shipped.

Proposed: Git-based approval flow (drafts as PRs → Approve + Merge → GitHub Action fires CIO API). Estimated build: ~8h dev. Status: Spec written, filed for Monday review. Not yet built. [source: collect-hq/nba-top-shot/strategy/2026-05-03-github-actions-campaign-brief.md]

---

## 6. Existing CMO Framework — Verbatim Claims

Source for all verbatim quotes in this section: [source: collect-hq/nba-top-shot/2026-05-03-cmo-strategy-framework.md]

**STATUS FLAG:** This framework is explicitly `status: RECONSTRUCTED — original written tick 0150, lost when collect-hq symlink was empty until tick 0450. This rebuild uses interior states 0150 + 0200 + 0430 as canonical source.`

### 6.1 The Spine Decision (Verbatim)

> **"B-spine primary. C as embedded evidence layer. A as warmth."**

Voice register definitions (verbatim):

> "**A — warmth.** 'I held this from 2021. Here's why it still hits.' First-person collector. Rare on the surface; ambient inside every piece."

> "**B — collector-internal narrative.** 'Run It Back.' 'Lock-In April.' Moments, serials, floor moves, what it meant to hold. Crowded externally (Athletic, Ringer, ESPN do narrative); ours is collector-specific and they cannot run our version."

> "**C — market signal / data.** Ceilings, sweep trades, accumulation velocity. Used to be the proposed spine. Now embedded as evidence inside every B-piece."

### 6.2 Why Not C as the Spine (Verbatim)

> "Structural amplification failure. Sportico, The Athletic, Bleacher Report cite CryptoSlam for floor data, not Top Shot — even when they know we have better data. Issuer-credibility deficit. Time and investment do not fix this. Confirmed across 5-agent swarm + R2 hostile attack + R3 red-team."

### 6.3 The Two B-Spine Audiences (Verbatim Table)

From the framework:

| Leg | Audience | Mechanic | Reference campaign | Primary KPI |
|-----|----------|----------|-------------------|-------------|
| **Reactivation** | 1,122 dormant $100K-LT | "You were there. You were right. Here's what's happening next." | Run It Back | Dormant-cohort spend lift, causal |
| **Whale activation** | Active XL, wallet-funded | Acceleration of intent that's already there | Lock-In April | Active-cohort spend lift, causal |

> "Both work. They work for different audiences with different KPIs. **Stop conflating them in pipeline labeling.**"

### 6.4 Primary KPI (Verbatim)

> "**Causal spend lift on the targeted cohort, per send.**"

> "Not opens. Not clicks. Not engagement. Engagement-first is the Goodhart trap (R2 Attack 3 — valid mechanistically). Free-pack campaigns produce massive engagement and zero spend lift; the July 2025 Kemba Walker free-pack spike (newsletters 899+900) is the canonical engagement trap."

### 6.5 Voice Rules (Verbatim)

> "- 'Moment' not 'copy' — never 'your copy.' Always 'your Moment #N' or 'your specific one.'
> - 'highlight' not 'video' on fan surfaces. Video is for lawyers.
> - Mobile-first thumb register. Desktop is the superset.
> - Collector-internal voice. 'Pick a task on your phone' is banned framing.
> - Allowed: pack / pull / serial / drop / set / tier / Flowscan / dweb.link / Moment / verify / receipt / own.
> - Banned: NFT in hero / Web3 / dApp / DeFi / 'revolutionize' / 'end-to-end authenticated' / 'trustless' / 'digital asset' / 'crypto-native'."

### 6.6 Distribution Phases (Verbatim)

> "**Phase 1 (now):** Slack-first. We don't have a dedicated content surface. Slack is what we have. Posts thread under one top-level per channel per 24h."
> "**Phase 2 (pending Roham + Dan auth):** Customer.io broadcast for Reactivation leg specifically."
> "**Phase 3 (later):** owned content surface (newsletter? collector blog? TBD)."

### 6.7 6-Week Success Metrics (Verbatim)

> "- Reactivation leg: ≥5% of dormant $100K-LT cohort places ≥1 transaction in the 6 weeks → validates B-spine reactivation mechanism. Below 2% → rotate.
> - Whale activation leg: ≥10% MoM spend lift on active XL cohort over baseline → validates Lock-In mechanic. Below baseline → rotate.
> - C-evidence test (PR): ≥1 of 3 journalists cites a Top Shot data point in their next 4 weeks of coverage → validates partial amplification thesis."

### 6.8 Implementation Requirements (Verbatim)

> "1. **Named editor.** One person owns the voice. Sam W is ratified (Roham confirmed). 3× CTR multiplier from voice quality alone (Camp 132 vs 163, same audience, same timing) is the empirical case.
> 2. **Pre-built pipeline.** 12-week conditional copy framework. Sustained voice requires inventory.
> 3. **KPIs.** Causal spend lift primary; per-cohort engagement secondary; amplification potential is a parallel test (PR outreach), not a spine KPI.
> 4. **Hard-stop trigger.** 3 consecutive below-baseline pieces → rotate to a different leg and reassess. Prevents drift.
> 5. **C-layer discipline.** Every piece passes a 'show the data' gate. Floor moves, sweep trades, ceilings, serial-specific pricing — concrete numbers inside the narrative."

### 6.9 What the Framework Does NOT Solve (Verbatim)

> "- The reactivation distribution gap: the dormant cohort by definition isn't checking Slack. Without Customer.io send authorization, we can build the content but can't deliver it. Phase 2 auth is the bottleneck.
> - Matt's whale relationship program: the L+XL distribution channel for Reactivation outside of broadcast is still undefined.
> - Run It Back timing: Week 10–11 content held pending product-side decision."

### 6.10 Internal Inconsistencies Noted (Compiler Observation — Not Critique)

The following are factual observations about the framework's internal state — not recommendations:

1. **RECONSTRUCTED status is material.** The framework was written from interior states at ticks 0150/0200/0430, not from the original file. The R1.1/R1.2/R1.3/R2/R3 working files that fed the swarm were explicitly "lost when the symlink target was empty." The final-synthesis file itself states it is "RECONSTRUCTED." Both the framework and the spine-validation document carry this flag. [source: collect-hq/nba-top-shot/2026-05-03-cmo-strategy-framework.md; source: collect-hq/strategy/2026-05-03-cmo-spine-validation/06-final-synthesis.md]

2. **Corrected reasoning vs. original reasoning.** The original reasoning for B-spine was "our base prefers narrative" (survivor bias). The corrected reasoning is "B-voice is the reactivation engine for 1,122 dormant $100K-LT collectors." The framework notes this change explicitly. Both are present in the document. [source: collect-hq/nba-top-shot/2026-05-03-cmo-strategy-framework.md]

3. **Deliverability caveat status.** The framework states "Refinement (R2 Attack 4 — tick 0430): before assuming the gap is purely copy-driven, run a deliverability check on Camp 163." The Camp 163 investigation file closes this: "V2 reaches more inboxes. The problem is entirely what the emails say." [source: collect-hq/nba-top-shot/intelligence/2026-05-03-camp163-v2-onboarding-investigation.md]. However the framework and spine-validation files still list the deliverability check as a refinement "to run," not as resolved. This is a potential source of confusion in downstream use.

4. **Phase 2 authorization loop is unresolved.** The framework names "Phase 2 (pending Roham + Dan auth)" as a distribution unlock. As of the most recent session, this authorization has not been granted. The entire Reactivation leg of the B-spine cannot be tested experimentally without it. [source: collect-hq/nba-top-shot/2026-05-03-marketing-plan-may3-17.md]

---

## 7. Explicit Gap List

Each gap below states: what's missing, what would close it, which Phase needs it.

---

### GAP 7.1 — Actual Dormant Cohort Segment Sizes

- **Gap:** The 300/400/300 Segment A/B/C split within the 1,122 dormant L+XL whale cohort is a cohort-knowledge estimate, not a BQ-derived count. Per-segment star concentration, last-transaction dates, and top-holding players are also unavailable without BQ.
- **What would close it:** BQ credential refresh (`magic-agent@dl-kaaos.iam.gserviceaccount.com` needs `bigquery.jobUser` on `dapperlabs-data`). Then: query `dapperlabs-data.production_mart_nba_product` for dormant $100K+ LT collectors, group by holding concentration and last-transaction date.
- **Downstream need:** Phase 3 (all three strategy cascades) — precise segment targeting for Reactivation campaign. Also needed for Matt's per-collector data packs (Track 1).

---

### GAP 7.2 — Post-G7 Price Discovery (Theory A vs. B)

- **Gap:** The Three-Phase Demand Model (§2.4) has Phase 4 (Post-Elimination) documented as a hypothesis only. "Theory A — Preserved Document: floor holds or rises" vs. "Theory B — Exit Pressure: floor drops." No empirical resolution as of May 4 file dates. The T+24h window for Banchero (eliminated) and Cade (eliminated) had not yet been captured.
- **What would close it:** Pull Banchero and Cade marketplace data 24h, 72h, 7d post-elimination from public GraphQL or BQ marketplace transactions table. Test floor drop magnitude.
- **Downstream need:** Phase 3 (Live Market Brief) — critical for copy framing around eliminated-player Moments and the "documentary value survives loss" thesis.

---

### GAP 7.3 — W0 Conversion Cohort Quality Confound

- **Gap:** Dark-window D7 conversion (8.54%) is better than Welcome #132-era D7 conversion (6.75%). This is counterintuitive and could reflect: (a) V2 welcome program being actively harmful, (b) dark-window users being self-selected higher-intent, or (c) other cohort quality differences. Camp 163 investigation Wave 3 ("pull cohort quality comparison: are V2 new users inherently lower quality?") is explicitly pending BQ IAM fix. [source: collect-hq/nba-top-shot/intelligence/2026-05-03-camp163-v2-onboarding-investigation.md]
- **What would close it:** Heimdall Tier 2 or 3 analysis on cohort quality: new user acquisition source, Day 1 app actions, first-session depth — comparing dark-window cohort vs. Camp 132-era cohort.
- **Downstream need:** Phase 2 (framework audit) — is the conversion gap from voice/journey problems or cohort quality? Changes the priority of email fixes vs. acquisition source improvements.

---

### GAP 7.4 — CIO Send Authorization (Operational)

- **Gap:** The entire Reactivation leg of the B-spine — including the three fully-written copy specimens (Segment A, B-LeBron, C), the E1 broadcast, and the L3 reactivation flow — is blocked on Dan/Roham authorization to send via Customer.io. This is not a data gap; it is a governance gap that prevents any experimental test of the B-spine reactivation hypothesis.
- **What would close it:** Explicit yes/no from Roham + Dan on CIO send authorization. If no: document the decision and remove reactivation-via-email from the Phase 3 strategy cascade options.
- **Downstream need:** Phase 2 (framework audit) and Phase 3 (all cascades) — strategy choices are different depending on whether email distribution exists.

---

### GAP 7.5 — CIO → Mixpanel Attribution (32–57% Dark)

- **Gap:** 32% of campaign data currently dark per marketing plan; Mixpanel raw query shows 57% of Email Link Clicked events have no `campaign_id`. Attribution of clicks to campaigns is unreliable. Cannot measure causal spend lift per campaign (the primary KPI) until this is fixed.
- **What would close it:** Engineering: P2 ticket for consistent `campaign_id` tagging in the CIO → Mixpanel pipeline. Per marketing plan: "BQ→CIO sync" is also pending as P1. [source: collect-hq/nba-top-shot/2026-05-03-marketing-plan-may3-17.md]
- **Downstream need:** Phase 3 execution and all post-campaign measurement.

---

### GAP 7.6 — Competitive Intelligence: Panini, Fanatics Live, Disney Pinnacle

- **Gap:** No competitive data found for: (a) Panini NBA card market behavior (Panini lost the NBA license to Topps — no brief filed on Panini's collector migration or competitive response), (b) Fanatics Live (separate from Fanatics Fest; the live break/auction marketplace that competes directly with Top Shot's marketplace), (c) Disney Pinnacle collector crossover with NBA Top Shot (specifically: lapsed NBA users active on Disney). Cross-product discipline rule applies — flagging for synthesis, not action.
- **What would close it:** Frigga scan on Fanatics Live (live pack breaks, competitive pricing, user overlap with Top Shot). xAI x_search pull on Panini NBA collector community response to license loss. Disney Pinnacle DAU/crossover data via cross-product synthesis signal.
- **Downstream need:** Phase 3 (Trading Card Cinematic and Collector's Almanac cascades) — both frames need competitive landscape grounding beyond Topps.

---

### GAP 7.7 — Placed-Order Rate for Email Programs (Conversion to Transaction)

- **Gap:** No placed-order rate (email click → purchase) is in any source file for NBA Top Shot's own programs. Skybox Collectibles benchmark is 7.1% placed-order rate (from parent session findings). Top Shot's equivalent number — what % of email clickers complete a marketplace purchase within 7d — is not in Mixpanel files (Mixpanel click data exists; purchase-per-clicker join requires BQ or a Mixpanel cohort analysis not yet run). The Camp 163 investigation Wave 3 explicitly attempted this join: "Per-clicker pack-purchase conversion within 7 days, V1 (camp 132) vs V2 (camp 163)" returned `[{'v1_clickers': 0, 'v2_clickers': 0, ...}]` — query returned no results, likely due to timing/ID mismatch. [source: research-reports/data-science-insights/mixpanel-queries/e650fc0e-ebde-4741-bf06-cc28871ff6e8-3.json]
- **What would close it:** Heimdall Tier 2 analysis: join Mixpanel email click events (with `customer_id` field) to BQ transaction events within 7d. Camp 132 vs Camp 163 comparison.
- **Downstream need:** Phase 3 (all cascades) — needed to size the revenue opportunity of email voice improvement.

---

### GAP 7.8 — Collector Sentiment Data (Current)

- **Gap:** No current (2026) collector sentiment data is in any source. No qualitative survey, NPS score, community sentiment analysis, or structured collector interview findings appear in any source file. The cross-loop synthesis file notes AI-generated content contamination in search results ("Bane-as-Magic in a search result"). The intelligence dossiers are market-behavior observations, not collector-voice qualitative research. [source: collect-hq/synthesis/2026-05-03-cross-loop.md]
- **What would close it:** xAI x_search pull on collector sentiment in NBA Top Shot Discord / X / Reddit over the last 30 days. Structured search queries for: "Top Shot collectors feeling about platform," "Top Shot lapsed users reddit," "NBA Top Shot community satisfaction." Separately: any NPS or support ticket theme analysis from Kenny Zamora (Lead Customer Support Agent) would provide qualitative signal.
- **Downstream need:** Phase 3 (Collector's Almanac cascade especially) — collector voice is the primary input for narrative strategy and should be grounded in actual expressed sentiment, not inferred from market behavior.

---

### GAP 7.9 — Atlas Consumer Schema (Quest + Picks Events)

- **Gap:** Atlas `consumer` schema (where Quest and Picks events live) is not in BigQuery at the `dl-kaaos` location. Engineering provisioning request is open. This means: Fast Break participation, Quest completion, and Picks prediction events are invisible to data science. Challenge participation rate (14%, cited from Loki) is the only engagement metric available outside of marketplace transactions and email opens. [source: CLAUDE.md (project instructions)]
- **What would close it:** Engineering provisioning of Atlas `consumer` schema into BigQuery `dapperlabs-data`. Filed as open request. No ETA in sources.
- **Downstream need:** Phase 3 (all cascades) — any strategy involving Fast Break, Quest, or challenge mechanics cannot be measured or informed without this data.

---

### GAP 7.10 — Causal Spend Lift Measurement Infrastructure

- **Gap:** The primary KPI for the CMO framework is "causal spend lift on the targeted cohort, per send." As of the cross-loop synthesis: "we have no instrumentation to measure causal spend lift even when distribution unlocks (BQ IAM still pending; Atlas consumer schema not provisioned)." [source: collect-hq/synthesis/2026-05-03-cross-loop.md] This means the stated primary KPI is currently unmeasurable even if all content is deployed.
- **What would close it:** (1) BQ IAM fix, (2) CIO → Mixpanel `campaign_id` tagging (P2 engineering ticket), (3) Holdout group configuration in CIO for any live campaign. All three needed in combination.
- **Downstream need:** Phase 3 execution — without causal measurement infrastructure, all Phase 3 strategy cascades will produce engagement data (opens, clicks) but not the primary KPI (causal spend lift). The hard-stop trigger ("3 consecutive below-baseline pieces → rotate") cannot fire without baseline measurement.

---

### GAP 7.11 — Pack Drop Revenue Data (Quantified)

- **Gap:** The Loki context states weekly drops produce "$100–300K per drop" (Tier B) and "$500K–$1M+ per drop" (Tier A), and annual revenue is ~$10.8M. No per-drop actual revenue data appears in any source file in this session. The BQ baseline from the parent session covers transaction counts but not dollar volume per drop. [source: plugins/loki/contexts/collectibles/nba-top-shot.md]
- **What would close it:** Heimdall Tier 2 query: `dapperlabs-data.production_mart_nba_product` for drop-day revenue by pack tier, last 6 months.
- **Downstream need:** Phase 3 (all cascades) — any strategy involving drop cadence changes needs baseline revenue per drop to evaluate tradeoffs.

---

### GAP 7.12 — Morning-After vs. Same-Night Email Timing (Not Yet Tested)

- **Gap:** The Collector's Clock brief proposes moving E1 email from same-night to 7:00 AM ET morning-after. The data anchor is 15+ G7 market snapshots showing near-zero transaction volume in the first 40+ minutes post-buzzer. However: "Embiid's spike (16 → 52 transactions) was triggered by the announcement... by the time I measured (morning of May 3), the actual spike likely happened the morning of May 3, not the night of May 2." This observation is backward-inferred; no controlled test of morning vs. same-night email timing exists in any source. [source: collect-hq/nba-top-shot/strategy/2026-05-03-collectors-clock-product-brief.md]
- **What would close it:** A/B test on E1 or equivalent broadcast: 50% sent same-night, 50% sent next-morning at 7:00 AM ET. Measure opens, clicks, and 7d causal spend lift per arm.
- **Downstream need:** Phase 3 (Live Market Brief cascade especially) — the conversion timing thesis is central to this frame.

---

*Compiled 2026-05-04 by SoT Compiler subagent.*
*Sources read: 30+ files across 7 source categories. 29 Mixpanel JSON files sampled (18 in detail). 56 intelligence files listed; 10 read in full.*
*Self-audit: all sections have cited facts. No "approximately" without a number+source. No fabricated claims. Section 6 quotes CMO framework verbatim. Output file exists at specified path.*
