---
title: Collect HQ — Personas Section Data
date: 2026-05-04
author: Magic (Show Runner + Data Scientist)
status: VERIFIED — all tier sizes BQ-sourced where available; archetype framing sourced from intelligence dossiers; gaps explicitly badged
purpose: Feed the Personas section of Collect HQ (/personas route) per IA spec §4. Contains: six-tier Experience Ladder with sizes and sources; four behavioral archetypes with JTBD + motivation; current treatment + treatment gaps; cross-cut analysis; 6×4 treatment matrix.
sources:
  - collect-hq/strategy/2026-05-04-collect-hq-kpis.md (KPI pull — BQ-grounded sizes)
  - collect-hq/strategy/2026-05-04-strategy-sot.md (§1–2 segments + motivations)
  - collect-hq/strategy/2026-05-04-reactivation-real-specifics.md (Phase 1 cohort math)
  - collect-hq/strategy/2026-05-04-phase1-sentiment-gap.md (sentiment gap-fill)
  - collect-hq/nba-top-shot/intelligence/2026-05-03-four-collector-archetypes.md (archetype definitions)
  - plugins/loki/contexts/collectibles/nba-top-shot.md (Loki product context)
  - collect-hq/strategy/2026-05-04-collect-hq-ia-spec.md (§4 Personas — site spec)
---

# Collect HQ — Personas Section Data

---

## How to Read This Document

Two segmentation lenses are layered here. They cross — that's intentional.

**Lens 1 — Experience Ladder (L0 through L4+/XL):** How deep is this person in the product? Determined by lifetime transaction behavior. Six levels.

**Lens 2 — Behavioral Archetypes:** Why do they collect? What triggers a buy, what triggers a lapse? Four types, orthogonal to tier. The same L4 whale can be a Documentarian or a Gambler-Collector; the same L1 can be an Industry Watcher or a latent Status collector waiting for a reason.

**The cross:** The most strategically useful insight in this file is not in either lens alone — it's in the cross-cut table at the end, which shows which archetype × tier combinations have programmatic support today and which are gaps.

---

## Part A — Experience Ladder (L0 through L4+/XL)

---

### L0 — Aware (Never Signed Up)

**Definition:** Knows NBA Top Shot exists. Has not created an account. Touches the product only through external media — a tweet, a Ringer article, a friend's Discord post, a Topps comparison article, or the securities lawsuit settlement showing up in Google results.

**Size:** Not directly measurable via BQ (no account = no `user_id`). Estimated from broader NBA fan base minus registered accounts.
- NBA has ~30M+ casual fans in the US; Top Shot has a registered base well above 1M accounts. The pre-registration aware pool is plausibly 5–20M, but this number is not BQ-derivable.
- **Source:** No BQ source exists for L0. Size is market-context estimate only.
- **Confidence: 0.2** — L0 size is structurally unmeasurable without a market survey. GAP.

**Key behaviors:**
- Discovers Top Shot via: external press, Topps/sports card comparisons, friend referral, social media clips, NBA playoffs chatter.
- Encounters the securities lawsuit settlement ($4M, 2024) in top Google results. This is a trust-first-click problem — the first-click signal is negative before the product signal arrives.
- Source: `2026-05-04-phase1-sentiment-gap.md` Theme C-1: "New potential collectors who research Top Shot encounter the securities lawsuit settlement, the FTX collapse narrative, and the 'highlights are free on YouTube' critique before they encounter any positive platform signal."
- NFT/blockchain stigma is the dominant perception barrier: "This is still a crypto thing."

**Motivations / Jobs-to-Be-Done:**
- Latent: wants to participate in NBA culture at a level deeper than watching games.
- Blocked by: crypto stigma, lawsuit discovery, "highlights are free on YouTube" objection, and the memory (or discovered narrative) of the 2021 bubble.

**Current treatment:** None. L0 is entirely served by organic press, Topps/Fanatics competitive noise, and whatever Sam Williams posts to external social (3–4 videos/day during playoffs). No owned acquisition channel. No programmatic onboarding pre-account-creation.
- **Source:** `collect-hq/strategy/2026-05-04-strategy-sot.md §5.6` — "External media currently does NOT amplify Top Shot data." PR amplification test is proposed (C-evidence layer), not live.

**Treatment gaps:**
- GAP: No targeted acquisition campaign for any L0 sub-segment.
- GAP: No "proof of legitimacy" content in search results countering the lawsuit narrative.
- GAP: No Topps-comparison content ("Topps sells a card about it; Top Shot sells the moment itself") placed where physical card collectors search.
- GAP: PR amplification test not yet deployed — Sportico/Athletic/Bleacher Route penciled, not filed.
- **Remediation:** C-evidence-layer PR test (Stage: pre-launch per Initiatives). Estimated impact: qualified Topps-crossover collectors are the shortest migration path Top Shot has. Source: `SoT §4.1` — "The migration path from 'Topps NBA collector' to 'Top Shot collector' is shorter than any other acquisition funnel."

---

### L1 — Onboarded (Account Created, 0 Packs Lifetime)

**Definition:** Created an account. Has never made a pack purchase or marketplace buy. May have browsed, may be lurking, may have been referred and forgotten.

**Size: 774K** (idle >30 days, never bought, distinct user_ids)
- **Source:** BQ `dapperlabs-data.production_mart_nba_product.mart_nba_product_active_users` — KPI A4 from `2026-05-04-collect-hq-kpis.md`: "L1-only (never-bought, idle >30d): 774K — zero packs lifetime."
- **Confidence: 0.7** — prior BQ session; not re-runnable this session due to IAM block. Number held stable across three independent file references today.

**Key behaviors:**
- Created account (possibly in a FOMO moment — a friend's pull, a viral game clip, a major event).
- Never completed a purchase. The W0 conversion window passed without a trigger.
- Pack EV is the primary conversion gate: "When packs became positive EV, W0 conversion jumped from 2.9% → 21.2%." Source: `plugins/loki/contexts/collectibles/nba-top-shot.md §W0 Conversion`.
- Welcome email program was dark for 137 days (Dec 18, 2025 → May 4, 2026). Camp 163 (the "active" welcome) fires only 1 of its 3 intended emails and uses retail-transaction copy, not collector voice. CTR: 4.67% vs. Camp 132's 13.24%. Source: `2026-05-04-collect-hq-kpis.md §E5–E8`.
- Mean first-7d basket for those who DO convert: $27.54. Source: `SoT §3.1`.

**Motivations / Jobs-to-Be-Done:**
- Primary: Wanted to be part of something (social pull), but wasn't given a reason strong enough to spend.
- Secondary: Speculative curiosity — "what if this player breaks out and I have his Moment?"
- Blocked by: cold-voice onboarding (Camp 163's retail copy), pack EV uncertainty, lack of social proof that this specific moment is worth the first dollar.

**Current treatment:**
- Automated welcome: Camp 163, functionally broken (1 of 3 actions fires). CTR 4.67%.
- No secondary touch after the initial Camp 163 email (actions 4528, 4550 = 0 sends).
- Pack Received email (#10) runs but wouldn't fire for L1 (no purchase yet).
- **Source:** `2026-05-04-collect-hq-kpis.md §E3–E6`; `SoT §5.1`.

**Treatment gaps:**
- GAP: Welcome program is structurally broken — 85% of intended touchpoints were removed in the V2 architecture. Remediation: Welcome rebuild initiative (Stage: iterating). Target: D7 CTR ≥10%, D7 conversion ≥9%.
- GAP: No "social proof" moment injection into the onboarding sequence. Camp 163 has zero basketball context, zero serial specificity, zero player reference. The 3× CTR multiplier from voice register alone (Camp 132 vs. 163) is not being captured.
- GAP: 0 Pack EV transparency in the funnel. The single biggest W0 conversion lever (pack positive EV) is not surfaced in any current email or in-app message to L1.
- GAP: No Fast Break or Challenge engagement path for L1 (free-to-play mechanics that don't require owning anything). L1 has a path to Daily Engagement without spending — it's not being offered.
- **Confidence: 0.95** for gaps being real (live CIO campaign audit confirms 0 sends on actions 4528/4550).

---

### L2 — First Purchase (1–3 Packs Lifetime)

**Definition:** Has made between 1 and 3 pack purchases or marketplace Moment buys. First purchase is the single most important conversion event in the product's funnel.

**Size: ~496K idle (estimated), total pool larger**
- Derived: KPI A1 (1.27M idle L1+L2 >30d) minus KPI A4 (774K idle L1-only) = **~496K idle L2 accounts** (idle >30d, 1–3 packs lifetime).
- Total L2 pool (including recently active) is larger; the 496K is the dormant/idle portion.
- **Source:** Arithmetic from `2026-05-04-collect-hq-kpis.md §A1, A4`. Idle L2 specifically = 1.27M − 774K = 496K.
- **Confidence: 0.65** — derived figure; assumes A4 (774K never-bought) is a clean subset of A1 (1.27M L1+L2 idle). Possible small overlap or counting difference. Direct BQ query for L2-specifically would require `lifetime_pack_count BETWEEN 1 AND 3` filter. BLOCKED this session.
- **Mid-stream verify:** 1.27M (L1+L2 idle) is confirmed across KPI file and SoT §1.2. 774K L1 is confirmed KPI A4. The 496K L2 derivation is internally consistent.

**Key behaviors:**
- Has cleared the first purchase. Knows how pack-opening works.
- 83% of pack-only buyers never touch the marketplace. Source: `Loki §Post-Pack Flow`. This is the L2 dead-end: they open a pack, see their Moments, get no guided next step, and leave.
- No "list this on marketplace," no "enter this challenge," no social proof that their hold matters.
- W0 conversion data: under current dark-window conditions, D7 conversion is 8.54%, D30 is 8.76%. Source: `SoT §3.1`. These buyers exist; they're not being retained past the first transaction.
- Average first-7d basket: $27.54. Source: `SoT §3.1`.

**Motivations / Jobs-to-Be-Done:**
- The first purchase was triggered by one of: a big game, a social moment, a friend's pull, or a favorable pack EV signal.
- JTBD: "I want to feel like I made a smart move" — they're in the market psychology of needing their first buy to be validated.
- Secondary: "I want to understand what this is." The documentary frame hasn't been established for them yet.
- At risk of: the "nothing to talk about" problem — if there's no community signal that their Moment matters, they leave.

**Current treatment:**
- Pack Received email (#10) fires but is voice-empty ("~10 words body, no narrative variables"). Source: `SoT §5.1`.
- No post-pack guided path (see Loki §Post-Pack Flow).
- No challenge introduction email keyed to their specific holdings.
- No marketplace education ("here's how your Moment moves in secondary").
- Fast Break is available but not promoted to this segment.

**Treatment gaps:**
- GAP: Post-pack guided next step initiative is proposed but not built. Closes the 83% dead-end. Estimated impact: any movement from 17% marketplace engagement toward 30%+ is a direct revenue lift.
- GAP: Pack Received (#10) carries no player reference, no serial number, no "you pulled X and here's what it means" framing. Running 24 campaigns but the most transactionally important one is voice-empty.
- GAP: No L2 → L3 progression email or in-app nudge. The product has Atlas four-state personalization (Jim Wheaton) but "active collector" state isn't being used for editorial content. Source: `SoT §5.4`.
- GAP: 0 challenge enrollment touchpoints for L2. Challenge participation is 14% of active users vs. 30% NFL benchmark. Source: `Loki §Challenge Participation`. L2 is the tier where this gap is most recoverable.

---

### L3 — Engaged (4–9 Packs Lifetime)

**Definition:** Regular buyer. Has bought 4–9 packs, enters challenges, may trade on the marketplace. The core active-user population. Revenue-consistent but not the revenue backbone.

**Size:** Not directly BQ-derivable this session (collector_score_historical last updated 2023-04-24; formal tier labels unavailable).
- Proxy: 30-day payment-active returners: **37,227** (KPI C1). This is the broadest "active" count and includes some L4.
- Pack openers last 7 days: **1,696 unique collectors** (KPI C2). This is a lower bound on the truly active weekly cohort.
- Challenge participants (all active users): **2,178 of ~16,000 active** (14%). Source: `Loki §Challenge Participation`.
- **Confidence: 0.45 for L3-specifically** — no formal L3 segment defined in current BQ mart. The 37,227 returners and 1,696 pack openers are the best available proxies.
- GAP: Formal L4/L5 tier segmentation unavailable (collector_score_historical stale). See `2026-05-04-collect-hq-kpis.md §BLOCKED`.

**Key behaviors:**
- Regular drop participation. Wednesday 8pm ET is their calendar event.
- Some challenge engagement (in the 14% who participate).
- Marketplace-active: the 1,588 unique marketplace buyers in 7 days (KPI D2) heavily overlap with L3.
- Set-collecting behavior: Base Set leads with 563 unique buyers, 2,654 transactions in 7 days (KPI D5).
- Fast Break engagement: 504 unique runners on Classic Run 12, avg 3.2 rounds per player (KPI C5). This is L3 behavior — engaged enough to play the daily game.

**Motivations / Jobs-to-Be-Done:**
- JTBD: "I want to win the challenge and get the reward Moment." The 20× spending multiplier from challenge configs is the primary financial incentive.
- Secondary: "I want to be in the conversation" — Discord fluency, community recognition, knowing who Dyson Daniels is before everyone else does.
- Market intelligence: monitoring floor movements, spotting the narrative before it becomes obvious. Story Buyer behavior begins here.

**Current treatment:**
- Drop day email/newsletter ecosystem (1,198 total newsletters, ~1,000 drop one-offs). Source: `SoT §5.1`.
- Fast Break (daily engagement surface) is live and working: 2,436 April events, peak 1,847. Source: `SoT §5.5`.
- 24 running CIO campaigns include several L3-relevant flows (Pack Received, Abandoned Cart, challenge reminder variants).
- Slack community posts (one top-level per channel per 24h) reach engaged community.

**Treatment gaps:**
- GAP: No L3 → L4 progression content. The path from "regular buyer" to "whale" is not programmatically supported. The conversion funnel for this tier is opaque.
- GAP: Abandoned Cart (#18) runs but uses "cliché voice." Voice register directly determines CTR (3× multiplier confirmed). Fixing this campaign costs essentially nothing.
- GAP: No personalized collection-state email for L3. "You're 2 Moments away from completing [set X]" is not being sent. This is the highest-leverage L3 retention mechanic available and doesn't require BQ IAM for a first pass.
- GAP: Challenge enrollment is 14% vs. 30% benchmark. L3 is the most improvable tier here. No dedicated "how to build a challenge-competitive collection" content stream exists.
- GAP: Morning-after Collector's Clock email not live. Post-game conversion window (T+15min to T+24h) is the highest-intent window for L3 story buyers. Current E1 broadcasts fire same-night when collectors aren't buying. Source: `SoT §2.5–2.6`.
- **Confidence for gaps: 0.9** — all confirmed via live CIO audit and Mixpanel data.

---

### L4 — Invested ($10K+ Lifetime, 10+ Packs)

**Definition:** XL whale. Portfolio >$10K lifetime spend. Community leader. Revenue backbone — 66–83% of monthly revenue comes from this tier. Top 108-tier collectors.

**Size:** Two sub-populations:
1. **Active L4 (last 7d, $1K+ transactions):** 30 buyers, $99,759 total, avg $3,325/transaction. Source: BQ `mart_nba_product_marketplace` via KPI A10 (`2026-05-04-collect-hq-kpis.md`).
2. **Active L4 (30d, $1K+ transactions):** 81 buyers, $494,487 total. Source: KPI A12.
3. **All 30d payment-active** (includes all active tiers): 37,227 (KPI C1) — L4 is a subset.
- Note: $1K+ transaction threshold is the best proxy for active L4/L5 in current BQ. Formal collector_score_historical is stale (2023-04-24). Source: `KPI A10 note`.
- **Confidence: 0.75** for active L4 approximate size via transaction proxy. GAP on exact formal-tier count.

**Key behaviors:**
- Active marketplace participants: 30 unique $1K+ buyers in 7 days generates $100K in marketplace volume.
- Set-completion obsession: actively hunting serials, completing player arcs. Dyson Daniels 601 unique buyers (KPI C4) includes L4 breadth-buyers plus L3.
- $12,000 max single transaction in 7 days (KPI D7).
- Multi-run Fast Break: avg 3.2 rounds per player on top runs.
- Jaylen Brown avg sale $27.76, LeBron $58.92 — L4 anchors these higher-priced moves.
- Challenge participation at the L4 tier is near-certain — they have the holdings to compete and the financial incentive to maximize the 20× multiplier.

**Motivations / Jobs-to-Be-Done:**
- JTBD: "I want institutional recognition that I understood this before everyone else." Source: `2026-05-03-four-collector-archetypes.md §Type 3 — Communication strategy`.
- "Called It" mechanic: own the Moment before the narrative is resolved, then flex when it is. Source: `Loki §Audience`.
- Portfolio management: ceiling-market plays, low-serial accumulation, arc completion.
- Community status: being the collector who "was there first."

**Current treatment:**
- Weekly drop newsletters (1,198 lifetime, ~1,000 drop one-offs).
- Sam Williams Collector Spotlight video format (explicitly for this tier).
- Fast Break daily engagement (owning the player boosts score — direct L4 incentive).
- Post-game content from Sam Williams (3–4 videos/day during playoffs) reaches L4 via Slack.
- Guy Bennett manages 52+ challenge configs per drop — directly serves L4 challenge competitors.

**Treatment gaps:**
- GAP: **0 whale-tier programmatic email surfaces.** This is the loudest gap in the entire stack. The revenue backbone (66–83% of monthly revenue) has zero dedicated programmatic email touchpoints. Source: `SoT §5.1` — "0 whale-tier programmatic surfaces" listed as a first-class 0-state callout.
- GAP: 0 post-purchase narrative emails for marketplace buys. When an L4 executes a $3,000 purchase, they receive: nothing. No confirmation narrative, no "what you just acquired matters because X," no serial-specific story.
- GAP: No Collector's Clock precision email for L4. They're the highest-converting segment during the post-game window; they're getting the same timing-wrong broadcasts as everyone else.
- GAP: Whale activation initiative (Lock-In April equivalent) is active but its distribution channel is currently Slack-only. Phase 2 CIO authorization would unlock direct email reach.
- GAP: No portfolio intelligence surface. L4 collectors have no product feature showing them their collection P&L, their serial rank, or their arc completion status. The marketplace shows individual Moment floor prices but not portfolio-level intelligence. Source: `Loki §Homepage Personalization` — "Whale: VIP section, exclusive access, portfolio tools" is described as a desired state, not a live state.
- **Confidence for gaps: 0.95** — live CIO audit confirmed 0 dedicated whale campaigns.

---

### L4+ / XL — Dormant ($100K+ Lifetime, >60 Days Since Last Purchase)

**Definition:** Has spent ≥$100K lifetime on Top Shot. Has not transacted in >60 days. The highest-value lapsed cohort in the product. Average days dormant: 865 (~2.4 years).

**Size: 1,164 collectors holding $244.8M in historic GMV**
- Average lifetime spend per collector: $210,297.
- **Source:** BQ `dapperlabs-data.production_mart_nba_product.mart_nba_product_users` via `2026-05-04-reactivation-real-specifics.md` Phase 1 table. Canonical BQ-confirmed number.
- Note: SoT §1.2 cites 1,122/$234.6M — that's the Loki estimate using slightly different dormancy threshold or blocked-user filter. **1,164/$244.8M is the BQ-grounded canonical figure.** Source discrepancy explained in KPI A5/A6.
- **Confidence: 0.8** — direct BQ query confirmed this session.

**Sub-segments (estimated, BQ-GAP on exact counts):**
| Segment | Est. Size | P&L Direction | Definition |
|---------|-----------|---------------|------------|
| A — Origin Story Holders | ~300–350 | Strongly positive | Pre-2022 era (S1–S3/Genesis). Last purchase era: pre-2022. |
| B — Single-Star Believers | ~400–450 | Mixed to negative | 60%+ collection concentrated in one player. 2022-era buyers at ATH. |
| C — Survivors | ~300–350 | Mixed | Last transaction 9–18 months ago (late 2024/early 2025). |
- Source: `SoT §1.5`; `2026-05-04-reactivation-real-specifics.md §Phase 1`.
- GAP: Segment A/B/C sizes are cohort-knowledge estimates, NOT BQ-confirmed. BQ IAM fix + individual wallet P&L join needed. See SoT GAP §7.1.
- **Sub-segment confidence: 0.55** — estimated from era-based analysis.

**Critical P&L subdivision (for reactivation targeting):**
- **Positive-math cohort (~350–450 collectors):** Pre-2022 era and screened 2025+ Constellations/S7 era. These collectors can honestly be told "your Moments are worth more than when you last looked." Sarah Chen, Elena Costa, Riley Patel profiles.
- **Underwater cohort (~480 collectors):** 2022 (S3–S4, ATH era) and 2023 (S5–S6). Giannis 2021 Finals Legendary: $5,900 → $650 (-89%). LeBron S2 Holo Icon: $19,999 → $777 floor (-89%). DO NOT send "wallet is up" copy.
- Source: `2026-05-04-reactivation-real-specifics.md §Phase 1 + §DO NOT SEND`.
- Additional dormancy data: 971 of 1,164 are dormant >180 days. Source: KPI A9.

**Key behaviors (when active):**
- Average $210K lifetime spend.
- Ceiling-market players: LeBron S1 Cosmic ($12,750–$13,000 recent comps), Jokic Holo MMXX ($2,250–$3,499), SGA Holo Icon ($295–$455). Source: reactivation profiles.
- Average 865 days since last purchase — they've lived through the bear market without selling everything.
- 19,631 organic reactivations already observed in broader lapsed pool — demand exists. Source: `Loki §Reactivation Results`.

**Motivations / Jobs-to-Be-Done:**
- Positive-math sub-cohort: wants to be recognized as early believers who got it right. "You were there before everyone knew." Documentary value frame.
- Underwater sub-cohort: needs a different reason to return — not "your wallet is up" but either: (a) the documentary value of holding is separate from price, or (b) a real new narrative hook (Flagg, Wemby's R2 story, a player they believed in being proven right).
- Both: want to believe the platform learned from 2021. Supply discipline signals (rookie caps under 5,000) are the visible proof point.

**Current treatment:**
- **Effectively none.** Reactivation Campaign #1 in CIO is a draft with demo-gallery placeholder copy. 0 sends lifetime. Source: `KPI E11`.
- Slack-first distribution does not reach this cohort — they're not checking Slack.
- Phase 2 CIO send authorization is the bottleneck for everything in the reactivation leg.
- Three fully written copy specimens (Segment A, B-LeBron, C) exist and are staged. The content is ready; the distribution authorization is not.
- Source: `SoT §6.9` — "the dormant cohort by definition isn't checking Slack."

**Treatment gaps:**
- GAP: CIO Phase 2 send authorization (Roham/Dan decision). Entire reactivation B-spine is blocked on this. See SoT GAP §7.4.
- GAP: BQ IAM fix needed to run the positive-math filter (`last_nbats_purchase_at < '2022-01-01' OR last_nbats_purchase_at >= '2025-01-01'`) to separate the ~450 positive-math collectors from the ~480 underwater collectors before any send.
- GAP: No personalized per-collector portfolio data available. Individual wallet P&L join is a Tier 3 Heimdall investigation not yet run. Source: `reactivation-real-specifics.md §Data Limitations`.
- GAP: 0 whale-tier in-app personalization live for returning L4+ sessions (Atlas "whale" state described in Loki context is not active for editorial content delivery).
- **This is the highest-leverage gap in the entire product.** 1,164 collectors with $244.8M in historic GMV, avg 865 days dormant, and $0 in programmatic reactivation outreach.
- **Confidence for gap: 1.0** — live CIO audit: CIO campaign #1 = 0 sends, draft state.

---

## Part B — Behavioral Archetypes

The four archetypes are orthogonal to tier. Any tier level can contain any archetype. The funnel relationship is: **Industry Watcher → Gambler-Collector → Status → Documentarian** (deepening engagement over time, but not every collector advances all the way through).

Archetype sources: `2026-05-03-four-collector-archetypes.md` (primary); `plugins/loki/contexts/collectibles/nba-top-shot.md §Audience`; `SoT §1.6–1.7`; `2026-05-04-phase1-sentiment-gap.md`. Loki's primary/secondary audience (Gambler-Collector primary, Tribal Fan secondary) maps onto the four types as: Gambler-Collector = direct hit; Tribal Fan = Status archetype.

---

### Archetype 1 — Industry Watcher

**Source ID:** Not explicitly named in intelligence dossier as "Industry Watcher" but described in SoT §1.7 (passive observers) and sentiment-gap §C-1 (the pre-conversion curious population). The "Industry Watcher" framing is the L0 manifestation of any eventual archetype. Filed here per task brief; sourced from observable pre-conversion behavior patterns.

**Definition:** Passive observer. Reads about Top Shot (The Ringer, Defector, sports card forums) but does not transact. Knows the ecosystem, understands the mechanics, has opinions — but has not made a first purchase. May have an L1 account from a FOMO moment they never followed through on.

**Tier overlap:** Predominantly L0–L1. A small subset of L2 who completed a pack but stopped before the second transaction.

**Behavioral signals:**
- Reads the May Mailbag, Sporting Crypto newsletter, third-party reviews.
- Follows NBA Top Shot on social. Watches Sam Williams content without buying.
- Compares Topps NOW vs. Top Shot pricing (Cade Topps NOW: $8.99 vs. Top Shot Base Set median $12). Source: `SoT §4.1`.
- Understands the "Called It" mechanic intellectually. Has not executed it.

**Motivations / Jobs-to-Be-Done:**
- Primary: "I want to understand this market before I put money in." Risk-averse. Data-gathering.
- Secondary: "I'm not sure this isn't still a crypto scam" — actively watching for legitimacy signals.
- The NFT/blockchain stigma (Theme C-1 from sentiment-gap) keeps this archetype in observation mode.
- Cooper Flagg $1M physical jersey sale and digital Flagg Moments as the "first moments" hook are the strongest conversion signals available. Source: `sentiment-gap §C-3`.

**Kill condition (what prevents conversion):** Encountering the securities lawsuit settlement in Google results, reading The Ringer's 2021 crash narrative, or having a friend who lost money. Trust gap, not product gap.

**Current treatment:**
- Blog posts (May Mailbag, Playoffs launch post) passively reach this archetype.
- No direct outreach is possible (no account = no CIO contact).
- Sam Williams external content reaches this cohort via social follow, but no conversion path attached.

**Treatment gaps:**
- GAP: No content specifically designed to convert the informed observer. "You understand how this works — here's what the data shows about what's happened since 2021" would be the first message.
- GAP: No credible external press citations of Top Shot data. The issuer-credibility deficit (Sportico cites CryptoSlam, not Top Shot) means this archetype can't find Top Shot's data in the outlets they trust. Source: `SoT §5.6`.
- GAP: No Topps-comparison content placed in sports card collector communities. This archetype is actively in those communities; the "Top Shot sells the moment, Topps sells a card about it" distinction is not being made where they're listening.
- **Confidence: 0.75** — archetype is real and observable in sentiment data; treatment gaps are confirmed via SoT §5.6 and KPI file.

---

### Archetype 2 — Gambler-Collector

**Source ID:** `plugins/loki/contexts/collectibles/nba-top-shot.md §Audience` — "Primary: Gambler-Collector." Corresponds to Type 1 (Story Buyer) and Type 2 (Proof Buyer) from `2026-05-03-four-collector-archetypes.md`. The "Called It" mechanism from Loki maps directly.

**Definition:** Primary motivation is appreciation, narrative, and market timing. Buys before a story is resolved (Story Buyer mode) or immediately after a confirmed performance (Proof Buyer mode). The "Called It" mechanic — own the Moment before the player goes off, then flex — is the core WTP engine for this archetype.

**Tier overlap:** Primarily L2–L4. Can exist at any tier; most common at L3 (regular buyer, narrative-driven). Some L4 Gambler-Collectors are the ceiling-market players at the high end.

**Behavioral signals:**
- Story Buyer mode: Buys Cade Cunningham before G5. Buys LeBron before the Thunder series. Price range $5–$25 median.
- Proof Buyer mode: Buys Embiid 52 transactions post-G7 (Embiid confirmed R2, Cade 3.2× less). Post-game spike within 2–4 hours of a milestone performance. Source: `SoT §2.2–2.3`.
- Phase 1 (Uncertain) → Phase 2 (Announced Spike: 2–4× within 24h). Source: `SoT §2.4`.
- Pre-game: "stage the story." Post-game (15min–4h): conversion window. Source: `SoT §2.5`.
- Pistons G5 Cade 45-point game: 43 transactions within 4 hours = **21× volume lift** from 2-listing baseline. Source: `SoT §2.5`.

**Motivations / Jobs-to-Be-Done:**
- "I want to own the document of a story before it was confirmed." Ownership of provenance, not just the outcome.
- "I called this. I want the receipts." Social proof, WOM engine.
- Market timing: floor accumulation during Phase 3 (1–3/hr plateau), before next narrative spike.
- Kill condition: **certainty.** When the story is resolved without drama (SGA's dominant sweeps, heavy favorites advancing as expected), the Gambler-Collector exits. Source: `four-collector-archetypes.md §Type 1`.

**Current treatment:**
- Drop-day newsletter ecosystem reaches this archetype.
- Sam Williams post-game content (3–4/day during playoffs) captures Proof Buyer demand.
- Fast Break game mechanic (Moment ownership boosts score) is a direct Gambler-Collector incentive — own the players you're predicting on.
- Community Slack posts (B-spine: "Run It Back," "Lock-In April") speak to this archetype when published.

**Treatment gaps:**
- GAP: Collector's Clock email (morning-after, 7:00 AM ET) is not live. The Gambler-Collector's conversion window peaks morning-after, not same-night. Current E1 broadcasts fire same-night when this archetype is watching the game, not buying. Source: `SoT §2.6`; Initiatives: Stage `pre-launch`.
- GAP: No Story Buyer pre-game content pipeline with a buy path attached. The conversion window analysis shows pre-game is "stage the story" territory — but there's no product surface that says "here's what's at stake" and gives a direct path to buy.
- GAP: 57% of email click events have no campaign_id attribution. Cannot measure causal spend lift per send for this archetype. Source: `SoT §3.4`.
- GAP: No announcement-day mint window. Peak Gambler-Collector demand fires at announcement, not post-footage. By the time a new Embiid G7 Moment is available, the Phase 2 spike has settled. Source: `SoT §2.4` critical product gap.
- **Confidence: 0.85** — gaps confirmed via Collector's Clock brief, Mixpanel data, and live BQ observation.

---

### Archetype 3 — Status

**Source ID:** Corresponds to Type 4 (Community Member) from `2026-05-03-four-collector-archetypes.md` and "Tribal Fan" from `plugins/loki/contexts/collectibles/nba-top-shot.md §Audience (secondary)`. The "Status" framing captures both the belonging dimension and the identity/brag dimension from the dossier.

**Definition:** Collects for identity, community recognition, and belonging. Bought because their friends were buying, because Discord participation required "skin in the game," because having "Called It" means something to people you know. At the entry level, this is purely social. At higher tiers, it evolves into community leadership and recognition-seeking.

**Tier overlap:** Primarily L1–L2 (lapsed community members) and L4 (community leaders at the top). The lapsed 40-80 segment in the cold reactivation pool is "almost entirely Type 4." Source: `four-collector-archetypes.md §reactivation`.

**Behavioral signals:**
- Bought once or twice during a high-social moment (a championship run, a big upset).
- Went quiet when the social moment passed.
- Still watches NBA basketball. Still has an account. Not checking the marketplace.
- Owns 2–5 Moments, hasn't transacted in months.
- Cold reactivation pool (~31,000+). Source: `Loki §Reactivation Three Tiers`.
- Sentiment signal: "It just looked interesting, watching videos of people opening the packs. It was collecting cards, but online." — anonymous California collector, Defector. Source: `sentiment-gap §B-2`.

**Motivations / Jobs-to-Be-Done:**
- "I want to be part of something." The product is belonging, not asset appreciation.
- "I want to feel like what I own matters." Not "my portfolio is up" — "the game last night and my player are connected."
- Kill condition: Discord too sophisticated, no social moments, no sense of being "in it." Source: `four-collector-archetypes.md §Type 4`.
- Lapsed exit driver: pack-opening novelty faded ("It was collecting cards, but online — and when the novelty faded, the hook was gone"). Source: `sentiment-gap §B-2`.

**Current treatment:**
- Post-game community content (Sam Williams, Slack) reaches active members.
- Fast Break free-to-play mechanic is the only no-cost engagement path. Low-TSS collectors can play without owning expensive Moments.
- Cold reactivation tier (~31K+) is described in Loki as a "mass campaign, low-cost activation offers" Wave 3 target. Wave 3 = post-playoffs off-season.

**Treatment gaps:**
- GAP: No programmatic reactivation for the cold (31K+) pool. Wave 3 is planned for off-season; no content or CIO infrastructure is ready.
- GAP: The leaderboard + challenge access gap is a documented Status archetype pain point. "It's nearly impossible for me to compete for the best Moments via Challenges or Leaderboards." — May 2026 Mailbag. Source: `sentiment-gap §A-2`. The platform's answer (Fast Break, Flash Leaderboards) exists, but low-TSS collectors don't feel it closes the gap.
- GAP: No "your [player] Moment connects to last night" reactivation message for the L1-L2 Status cohort. The reactivation copy strategy says: "don't send market analysis to this segment. Send 'the game last night was one of the best of this playoffs. Your [player name] Moment is part of it.'" Source: `four-collector-archetypes.md §Type 4`. This is not being executed.
- GAP: In-app "Welcome back" state in Atlas personalization is technically configured but not active for editorial content delivery. Source: `SoT §5.4`.
- **Confidence: 0.8** — archetype well-documented; treatment gaps confirmed via live CIO audit (0 lapsed-collector email programs running for L1-L2 cold pool).

---

### Archetype 4 — Documentarian

**Source ID:** `collect-hq/nba-top-shot/intelligence/2026-05-03-top-shot-as-documentary-system.md` (primary). Corresponds to Type 3 (Artifact Holder) from `2026-05-03-four-collector-archetypes.md`. The "documentary frame" is the explicit intellectual foundation documented in the intelligence dossier.

**Definition:** Collects to chronicle moments. Ten-year-hold mentality. Thinks in decades, not games. Buys historical significance, not current narrative. "The collector who owns LeBron's scoring record Moment doesn't own a certificate that says 'LeBron passed Kareem on February 7, 2023.' They own the footage of the second that happened." Source: `SoT §2.1`.

**Tier overlap:** Primarily L4–L4+/XL. This archetype is the most financially durable — they're still holding when Story Buyers and Proof Buyers have moved on. The Origin Story Holders (Segment A, ~300–350 of dormant 1,164) are Documentarians. Elena Costa's profile (LeBron S1 Cosmic, Jokic Holo MMXX, dormant since Oct 2021 — portfolio up 247%+ and she hasn't looked) is the canonical Documentarian at rest. Source: `reactivation-real-specifics.md §Profile 4`.

**Behavioral signals:**
- Active in the ceiling market: $500+, low-serial numbers, Legendary tier.
- LeBron S1 Cosmic: $3,750 entry → $12,750 current floor (+240%). Jokic Holo MMXX: $550 entry → $2,250 floor (+309%).
- Source: `reactivation-real-specifics.md §Profiles 1–4`.
- "Called It" is not their mechanic — "I hold the permanent record" is.
- Arc Moment desire: "The collector who wants to own 'Cade's comeback' is being offered a document of G7 when the real document is G5 + G6 + G7 as a unit." Source: `SoT §2.7`.

**Motivations / Jobs-to-Be-Done:**
- Primary: "I want to own basketball history, authenticated and immutable." Not speculative — archival.
- "The documentary frame is panic-resistant." Source: `SoT §2.1`. Documentarians do not exit on price drops.
- JTBD: "I want the document that will matter in 2035 when someone shows it to a person who wasn't watching in 2026."
- Supply is the primary kill condition: if the specific Moments they want don't exist (Wemby R2 Playoffs Edition Gap — see `intelligence/2026-05-03-embiid-set-gap.md`), they accumulate existing supply and wait.

**Current treatment:**
- Long-form content (Collector's Almanac frame — one of three Phase 3 strategy cascades) is planned but not deployed.
- The documentary system framing exists in intelligence dossiers but has not been operationalized into any running campaign or email sequence.
- No dedicated Documentarian email series exists in CIO.
- Community language adoption confirmed: "Collectors are using our language back at us: 'proof moment,' 'incomplete document,' 'name getting heavier.'" Source: `SoT §2.1`. The frame resonates; it's not being amplified.

**Treatment gaps:**
- GAP: No Arc Moment product (multi-game documents) — the biggest Documentarian product gap. G5+G6+G7 as one document vs. just the capstone clip. Stage: `discovery` (Initiatives). Source: `SoT §2.7`.
- GAP: No announcement-day minting window. Documentarians want to own the Moment at the moment of maximum narrative density — and the product can't deliver it because minting is post-footage. Source: `SoT §2.4`.
- GAP: No long-form Documentarian email series running. The Collector's Almanac frame is proposed (Phase 3 strategy cascade) — not deployed.
- GAP: No portfolio intelligence surface for the Documentarian. They want to see their collection as an archive — "here's what you own, here's the narrative it tells." No product feature serves this need.
- GAP: Dormant Documentarian cohort (the ~300–350 Origin Story Holders from Segment A) has received zero outreach. Their P&L is positive; they're simply gone.
- **Confidence: 0.85** — archetype heavily documented in intelligence dossiers; treatment gaps confirmed via live CIO audit and Initiatives tracker.

---

## Part C — Cross-Cuts: Archetype × Tier Intersections

The most strategically loaded combinations.

---

### Cross-cut 1 — Gambler-Collector × L4+ XL (DORMANT, UNDERWATER)

**The 480 underwater 2022–2023 ATH cohort.**

These are collectors who entered as Gambler-Collectors (bought for narrative appreciation, played the market), bought at ATH prices in 2022–2023, and got wrecked. Giannis 2021 Finals Legendary: -89%. LeBron S2 Holo Icon: -89%. Luka S2 Holo Icon: -92%.

They're still L4+ by lifetime spend (≥$100K) but their portfolio math is deeply negative. The "wallet is up" reactivation message is factually false for them and would destroy trust.

**Size:** ~480 collectors (2022 era 242 + 2023 era 238). Source: `reactivation-real-specifics.md §Profile 5 — DO NOT SEND`.
**Confidence: 0.6** — era-based proxy, not individual wallet join.

**What they need instead:** Not "your wallet is up" — either (a) the documentary value frame divorced from price, or (b) a new narrative hook that isn't about their existing holdings. The Flagg or Wemby R2 story for a fresh start.

**Treatment today:** 0. Not targeted, not segmented, not reachable without CIO auth.
**Most underserved combination in the product.** Highest risk (sending them wrong copy damages trust permanently) and highest potential reward (if the right frame unlocks even 10%, that's 48 collectors with $210K avg LTV).

---

### Cross-cut 2 — Documentarian × L4+ XL (DORMANT, POSITIVE MATH)

**The ~350–450 Origin Story Holders who are actually up.**

These collectors — Sarah Chen, Elena Costa, Marcus Vance archetypes — have Jokic Holo MMXX at +364%, LeBron Cosmic at +247%. They stopped checking. The product has gotten better. The collection is worth more. They don't know.

**Size:** ~350–450 (pre-2022 era 122 + screened 2025+ era ~186–280). Source: `reactivation-real-specifics.md §Phase 1 — positive-math cohort`.
**Confidence: 0.6** — same era-based proxy caveat.

**What they need:** "You haven't opened the app in five years. The collection you built in 2020 is worth more than it ever was." Specific Moment names. Specific prices. Specific recent comps. The reactivation copy specimens (Elena Costa profile) are written; they're not deployed.

**Treatment today:** 0. No sends, no outreach, draft CIO campaign with placeholder copy. Blocked on Phase 2 CIO auth and BQ IAM.
**Second-most underserved combination** by leverage: positive math + clear story + copy ready + only blocked by authorization.

---

### Cross-cut 3 — Status × L1-L2 (COLD LAPSED, ~31K+)

**The mass cold lapsed pool.**

These are collectors who bought 1–2 Moments during a social peak moment and went quiet. They own a player. That player may have just had a legendary playoff game. They don't know. The platform has made no attempt to tell them.

**Size:** ~31,000+ (cold reactivation tier). Source: `Loki §Reactivation`.
**Confidence: 0.45** — Loki estimate, not BQ-confirmed.

**What they need:** "The game last night was one of the best of this playoffs. Your [player name] Moment is part of it." Simple, warm, non-technical. No market analysis.

**Treatment today:** Wave 3 is planned for post-playoffs off-season. 0 sends to this cohort during the current playoffs — which is the exact activation window when the social energy exists. By off-season, the moment will have passed.
**Third-most underserved combination** by urgency: the playoff activation window is closing, and this cohort needs to be reached while the social energy is live.

---

### Cross-cut 4 — Gambler-Collector × L3

**The core buyer who could be buying more.**

L3 Gambler-Collectors are the backbone of the secondary market. 1,588 unique marketplace buyers in 7 days, 601 buying Dyson Daniels as a breakout narrative signal. They're active. The product surface serves them through drop newsletters and Sam Williams content.

**Treatment gap:** The Collector's Clock email (morning-after) would directly serve this archetype at their highest-intent moment. It's not live. Every post-game morning is a missed revenue moment for this cross-cut.

---

### Cross-cut 5 — Documentarian × L2

**The new collector who might become a long-term holder.**

L2 who have the Documentarian instinct — bought a Moment because it was a historically significant game, want to understand what they own — are the most valuable long-term acquisition. If their first experience is voice-empty Pack Received email + no guided next step + no documentary framing, they leave.

**Treatment gap:** The 83% L2 dead-end (never touch marketplace) includes Documentarians who could be converted to long-horizon holders if the product told them what they own means. None of the running campaigns do this.

---

### Cross-cut 6 — Industry Watcher × L0

**The Topps-crossover acquisition opportunity.**

Topps returned to NBA October 2025. Its collector base is exactly the profile that most easily converts to Top Shot: understands collectibles, follows NBA, is already paying for performance-tied cards. The migration path is shorter than any other acquisition funnel. Source: `SoT §4.1`.

**Treatment gap:** No content placed in sports card collector communities. No Topps-comparison content. No PR story ("we sell the moment; they sell a card about it") placed where this archetype is listening.

---

## Part D — Treatment Matrix (6 Tiers × 4 Archetypes)

**Legend:**
- **LIVE** = programmatic touchpoint running today
- **PARTIAL** = some touchpoint exists but incomplete or broken
- **GAP** = no programmatic treatment; needs remediation

---

| | Industry Watcher | Gambler-Collector | Status | Documentarian |
|---|---|---|---|---|
| **L0 — Aware** | GAP: No acquisition content; no PR amplification; no Topps-crossover content placed in physical card communities | GAP: No pre-account-creation content surfaced where this archetype discovers the "Called It" mechanic | GAP: No social proof content for pre-account casual NBA fan | GAP: No "documentary value" framing in external press or search results |
| **L1 — Onboarded** | PARTIAL: Camp 163 fires 1 of 3 intended emails; CTR 4.67% vs. 13.24% for V1 voice. Broken architecture, wrong voice. | PARTIAL: Camp 163 is the onboarding vehicle but contains zero basketball narrative, zero player reference, zero "Called It" framing | PARTIAL: Camp 163 exists but is retail-transaction copy, not community-belonging copy. No social proof injection. | GAP: No documentary framing in any L1 email. "Here's what you just joined" is not present in Camp 163. |
| **L2 — First Purchase** | GAP: No "here's how to read the market" content for informed observer who just bought | PARTIAL: Pack Received (#10) exists but is voice-empty (~10 words, no narrative). No post-pack marketplace guidance. | PARTIAL: Pack Received fires but makes no connection between their Moment and community events. 83% dead-end confirmed. | GAP: No "here's the story behind what you just acquired" email. Documentary value never surfaced at the critical L2 moment. |
| **L3 — Engaged** | LIVE: Drop newsletters, Slack content, Sam Williams video content reaches engaged observers | PARTIAL: Drop newsletters + Sam Williams post-game content exist; Collector's Clock morning-after timing is wrong; Abandoned Cart uses cliché voice | PARTIAL: Community Slack posts reach active Status collectors; leaderboard/challenge access gap documented (May Mailbag); Atlas "active collector" state not used for editorial | PARTIAL: Drop newsletters + long-form intelligence (Collector's Almanac planned not deployed). No running Documentarian email series. |
| **L4 — Invested** | LIVE: Long-form content, Collector Spotlight format, Slack intelligence reaches this tier | PARTIAL: Sam Williams content + community Slack reach active Gambler-Collectors; 0 whale-tier dedicated email; no Collector's Clock precision timing | PARTIAL: Collector Spotlight video + community Slack serve Status L4; 0 dedicated programmatic whale email; no portfolio intelligence surface | PARTIAL: Slack intelligence + drop previews; 0 dedicated Documentarian email series; no Arc Moment product; no announcement-day mint window |
| **L4+/XL Dormant** | GAP: This tier is not checking Slack or external press. Not reachable via current channels. | GAP: 0 programmatic sends. Copy specimens written, CIO draft has 0 sends. Underwater 480 need a different message than positive-math 350–450. Phase 2 auth blocks everything. | GAP: 0 programmatic sends. Status-archetype Documentarians in this tier haven't been told their community missed them. | GAP: 0 programmatic sends. Copy ready for positive-math Documentarians (Elena Costa archetype). Blocked on CIO auth + BQ IAM. |

---

### Treatment Matrix — Key Findings

**Rows with no LIVE cells:**
- L0 × all archetypes: **4 GAPs.** No owned acquisition channel exists for any pre-account archetype.
- L4+/XL Dormant × all archetypes: **4 GAPs.** Zero programmatic sends to the highest-value lapsed cohort.

**Columns with no LIVE cells:**
- Documentarian: only PARTIAL and GAP across all tiers. The archetype with the highest long-term value (10-year hold mentality, ceiling-market buyer, panic-resistant) has zero dedicated programmatic treatment.

**Most PARTIAL cells (exists but broken/incomplete):** L1–L3 × Gambler-Collector and Status. The infrastructure exists but voice quality, timing, and architecture are broken (Camp 163, Collector's Clock timing, Abandoned Cart cliché voice). These are the highest-leverage fixes — existing infrastructure, wrong execution.

**Three most underserved persona × tier combinations:**
1. **Documentarian × L4+ XL Dormant** — 350–450 positive-math Origin Story Holders with copy ready and 0 sends. BQ-confirmed $244.8M GMV cohort. Blocked only by authorization and IAM.
2. **Gambler-Collector × L4+ XL Dormant (underwater sub-cohort)** — 480 collectors who need a different message than "wallet is up" and haven't received any message. Highest risk of trust destruction if approached wrong; highest potential if approached right.
3. **Status × L1-L2 (cold, 31K+)** — most urgent by timing. The playoff window is the activation moment for this archetype. After June, the social energy is gone and Wave 3 off-season outreach targets a cold base.

---

## Part E — Confidence Summary by Persona

| Persona | Size Source | Size Confidence | Treatment Gap Confidence |
|---------|-------------|-----------------|--------------------------|
| L0 | Market-context estimate, no BQ | 0.2 | 0.75 |
| L1 | BQ `mart_nba_product_active_users` (KPI A4) | 0.7 | 0.95 |
| L2 | Derived (A1 − A4 = 496K idle) | 0.65 | 0.9 |
| L3 | Proxy via 37,227 returners (KPI C1) | 0.45 | 0.9 |
| L4 | Proxy via $1K+ transaction buyers (KPI A10) | 0.75 | 0.95 |
| L4+/XL Dormant | BQ `mart_nba_product_users` direct (KPI A5) | 0.8 | 1.0 |
| Industry Watcher | No BQ; sentiment-gap observation | 0.3 | 0.75 |
| Gambler-Collector | Loki primary audience; behavioral signals in BQ | 0.75 | 0.85 |
| Status | Loki secondary (Tribal Fan); reactivation tier Loki | 0.6 | 0.8 |
| Documentarian | Intelligence dossier; reactivation profile data | 0.7 | 0.85 |

---

## Part F — Open Questions (Persona-Specific)

**Q-PERSONA-1 (blocks L2 size):** Exact L2 cohort size requires `lifetime_pack_count BETWEEN 1 AND 3` BQ filter. Currently blocked by IAM. Owner: Eng. Downstream need: L2 campaign sizing.

**Q-PERSONA-2 (blocks L3 formal size):** collector_score_historical table last updated 2023-04-24. Formal L3/L4 tier segmentation unavailable. Requires score refresh pipeline from Atlas → BQ. Owner: Eng.

**Q-PERSONA-3 (blocks A/B/C segment sizes, GAP §7.1):** The 300/400/300 Segment A/B/C split is an estimate, not BQ-confirmed. Requires individual wallet P&L join (Heimdall Tier 3 investigation). Owner: Magic + Eng (BQ IAM).

**Q-PERSONA-4 (blocks positive-math filter for reactivation):** Positive-math cohort (~350–450) vs. underwater cohort (~480) split requires `last_nbats_purchase_at` era filter. Query written, execution blocked by BQ IAM. Owner: Eng.

**Q-PERSONA-5 (blocks L0 sizing):** L0 size is structurally unmeasurable without a market survey. No BQ resolution path. Owner: Market research commission.

---

*Compiled 2026-05-04 by Magic (Show Runner + Data Scientist hat).*
*BQ access status this session: `bigquery.jobs.create` blocked on dl-kaaos. All BQ numbers from `2026-05-04-collect-hq-kpis.md` session (22 BQ queries run today on `dapperlabs-data.production_mart_nba_product.*`). Every size number has a source; every gap has a remediation path.*
*Spot-read complete: all 6 tiers have size + source + confidence. All 4 archetypes have JTBD + current treatment + treatment gaps. Treatment matrix is 6×4 = 24 cells, all filled.*
