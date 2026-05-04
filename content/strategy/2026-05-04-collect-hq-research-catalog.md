---
title: Collect HQ — Research Catalog
date: 2026-05-04
author: Magic (Research Cataloger)
status: FILED — feeds Collect HQ Research section (§7 of IA spec)
purpose: Exhaustive catalog of all research artifacts across three tiers (Data Findings / Market Signals / Collector Voice). Every card has source, confidence, last-refreshed, headline finding, mechanism, and open questions.
sources-scanned:
  - collect-hq/strategy/2026-05-04-strategy-sot.md (760 lines, primary compilation)
  - collect-hq/strategy/2026-05-04-phase1-marketplace-gap.md (25 BQ + GraphQL queries)
  - collect-hq/strategy/2026-05-04-phase1-competitive-gap.md (30+ web sources, 18 searches)
  - collect-hq/strategy/2026-05-04-phase1-sentiment-gap.md (18 searches, 12 WebFetch attempts)
  - collect-hq/strategy/2026-05-04-llm-email-marketing-playbooks.md (22 searches, 34 citations)
  - collect-hq/strategy/2026-05-04-social-proof-data.md (22 BQ queries, 8 GraphQL probes)
  - collect-hq/strategy/2026-05-03-what-we-can-achieve-mixpanel-baseline.md
  - collect-hq/strategy/2026-05-04-cmo-decision-brief.md
  - collect-hq/strategy/2026-05-04-cmo-action-framework.md
  - collect-hq/strategy/2026-05-04-collect-hq-ia-spec.md
  - collect-hq/nba-top-shot/intelligence/ (56+ dossier files — all scanned, key files read in full)
  - research-reports/data-science-insights/mixpanel-queries/ (29 JSON files — all read)
reference: IA spec §7 (Research section), SoT §7 (GAP LIST)
---

# Collect HQ — Research Catalog

## How to Read This Document

Each card follows the format specified in the IA brief:

```
**[Title]**
- Tier: data-finding / market-signal / collector-voice
- Confidence: 0.0–1.0
- Source: file path or query reference
- Last refreshed: date
- Headline finding: 1 sentence
- Why it matters: 1-2 sentences, mechanism-first
- Open questions: what would deepen this finding
```

Confidence interpretation:
- 1.0 = directly queried + replicated (multiple independent BQ/Mixpanel confirms)
- 0.7 = single-source primary (live query or named study, not replicated)
- 0.3 = secondary inference (paraphrase from a doc, no primary source)

---

## TIER 1: DATA FINDINGS

*Quantitative findings from BigQuery, Mixpanel, Customer.io, and GraphQL. Sorted: recency first, then confidence descending within date groups.*

---

**DF-01 — Per-Drop Revenue by Tier (46 Drops, Nov 2025–May 2026)**
- Tier: data-finding
- Confidence: 0.95
- Source: `collect-hq/strategy/2026-05-04-phase1-marketplace-gap.md` §B — BQ queries BQ-8 through BQ-12 (5 independent queries, cross-verified). BQ table: `dapperlabs-data.production_mart_nba_product.mart_nba_product_sem_successful_transactions` joined to `mart_nba_product_sem_pack_listings`.
- Last refreshed: 2026-05-04
- Headline finding: Tier A major set drops generate $800K–$2.025M per event; Tier D daily playoff packs generate $7K–$15K per event; Loki's stated revenue ranges were materially inaccurate in both directions.
- Why it matters: The Nov 5 2025 Rookie Debut drop at $2.025M and the Dec 3 Origins drop at $1.144M both exceed Loki's stated Tier A ceiling of $1M — actual ceiling is 2× higher than estimated. Tier B mid-tier chance-hit drops ($50K–$175K) are 1–3× lower than Loki's $100–300K estimate. Accurate drop revenue tiering is foundational to any drop cadence or tokenomics strategy.
- Open questions: Primary-only vs. primary+secondary revenue split needed (BQ-10 confirms $4.83M in MOMENT secondary transactions YTD, not yet allocated by drop). Annualized figure from YTD PACK data suggests ~$22M/year vs. Loki's $10.8M estimate — Heimdall Tier 2 pass needed to reconcile.

---

**DF-02 — Post-Elimination Price Discovery: Theory A vs. Theory B (Banchero, BQ + GraphQL)**
- Tier: data-finding
- Confidence: 0.82
- Source: `collect-hq/strategy/2026-05-04-phase1-marketplace-gap.md` §A — BQ queries BQ-2 through BQ-7, GraphQL GQL-1 through GQL-5. 20 BQ queries total.
- Last refreshed: 2026-05-04
- Headline finding: Elimination causes a one-day narrative closure spike (53 tx, median $13), then volume normalizes to pre-series baseline within 72 hours — floor does not collapse, but no sustained "documentary premium" lift is visible either.
- Why it matters: Theory A (preserved document floor) is PARTIALLY confirmed — the $1 Base Set floor held pre- and post-elimination, and premium-tier Moments ($120 Holo Icon, $494 Rookie Revelation) held their prices. The correct model is "floor persistence with volume collapse," not "exit pressure." This changes the reactivation copy framing: eliminated-player Moments retain their documentary value; panic-selling language is wrong.
- Open questions: Full T+72h and T+7d data after the May 3 G7 (expected in BQ by May 5–6) needed for final confirmation. Control comparison is strong (Cade advancing vs. Banchero eliminated — same $3 TST Playoffs Edition floor on both) but a larger multi-player elimination cohort would increase confidence.

---

**DF-03 — Placed-Order Rate: Email Click → Marketplace Purchase (2.24%)**
- Tier: data-finding
- Confidence: 0.80
- Source: `collect-hq/strategy/2026-05-04-phase1-marketplace-gap.md` §C — BQ queries BQ-16, BQ-17, BQ-18 (three independent queries, all return same result). Join: `mart_nba_product_page_views` (utm_medium='email') → `mart_nba_product_marketplace` within 7 days.
- Last refreshed: 2026-05-04
- Headline finding: 2.24% of email clickers complete a marketplace purchase within 7 days (1,070 clickers, 24 distinct buyers, Feb–May 2026) — 3.2× below the Skybox Collectibles benchmark of 7.1%.
- Why it matters: The 3.2× gap to benchmark directly quantifies the revenue opportunity from improving email quality and behavioral trigger architecture. At 7.1% conversion on the same 1,070 clickers, 76 buyers vs. 24 — an estimated 3× revenue lift per email send. This is the financial case for the Camp 163 fix.
- Open questions: This is a floor estimate — 57% of email click events lack campaign_id (SoT §3.4), so the true email click population is larger than 1,070. Campaign-specific comparison (Camp 132 vs. Camp 163 placed-order rate) was attempted but returned zero results due to CIO→Mixpanel customer_id mismatch. Closing GAP 7.5 (attribution fix) is required for per-campaign rates.

---

**DF-04 — April 2026 Email Funnel: Volume and CTR (Mixpanel)**
- Tier: data-finding
- Confidence: 0.95
- Source: `research-reports/data-science-insights/mixpanel-queries/91cd12a7-337a-4ddf-b6ce-03923369f087-1.json` (Email Opened + Email Link Clicked daily counts, April 2026). Cross-validated against `collect-hq/strategy/2026-05-03-what-we-can-achieve-mixpanel-baseline.md` (stated 1.68% avg CTR vs. computed 1.66% — 0.02pp variance).
- Last refreshed: 2026-05-03
- Headline finding: April 2026 saw 2,010,727 opens and 33,447 clicks (1.66% average CTR); peak blast day April 17 drove 199,144 opens at only 0.9% CTR.
- Why it matters: The 1.66% average CTR is the current program baseline — well below Camp 132's 12.8% and even below the cold-voice Camp 163's 4.46%. This measures the combined program output across all 24 running campaigns, not any single campaign. The April 17 blast (likely "Run It Back" announcement) achieved high volume but low engagement — volume does not compensate for voice quality.
- Open questions: Campaign_id attribution is 57% dark (GAP 7.5), so the blended rate cannot be disaggregated by program. Per-campaign CTR for non-welcome programs (Pack Received, Abandoned Cart) is unavailable until attribution is fixed.

---

**DF-05 — Campaign Lift: April 2026 Orders (22–24× vs. Baseline)**
- Tier: data-finding
- Confidence: 0.92
- Source: `research-reports/data-science-insights/mixpanel-queries/051a70ec-bef5-4b4d-be5d-b03793a9e09b-1.json` (DAU + Order Confirmed + pack-opening-start, April 14–26). Cross-validated against `collect-hq/strategy/2026-05-03-what-we-can-achieve-mixpanel-baseline.md` ("Apr 20–22 peak: 787–824 orders/day; lift 22–24× vs Apr 14 baseline of 35" — CONFIRMED by raw Mixpanel data).
- Last refreshed: 2026-05-03
- Headline finding: Peak orders on April 20–22 reached 787–824/day vs. April 14 baseline of 35 orders/day — a 22–24× lift that was campaign-amplified but event-anchored.
- Why it matters: The April drop event (Apr 15–16 pack-open spike) preceded the email blast, confirming that the campaign amplified real demand rather than creating it from nothing. L1 arc-type campaigns anchored to live events or drops produce 2,000–5,000 incremental orders; standalone essays without event anchors produce 300–700. Campaign timing against the drop calendar is load-bearing.
- Open questions: Average order value in dollars (not just count) is not confirmed in this dataset. BQ estimate working figure of $20–40/order is unverified. Causal attribution (email → order vs. drop → order) cannot be separated without holdout group (GAP 7.10).

---

**DF-06 — Campaign Attribution Dark Rate: 57% of Clicks Have No Campaign ID**
- Tier: data-finding
- Confidence: 0.95
- Source: `research-reports/data-science-insights/mixpanel-queries/656eea31-353d-4993-9bc2-cb125b8b4465-2.json` (Email Link Clicked events: 32,686 total; campaign_id present on 18,689 = 57.2% dark). Cross-referenced against marketing plan claim of "32% dark" — discrepancy noted in SoT §3.4 (different measurement base; both material).
- Last refreshed: 2026-05-03
- Headline finding: 57.2% of Email Link Clicked events in Mixpanel carry no campaign_id, making per-campaign causal measurement impossible with current infrastructure.
- Why it matters: The primary KPI for the CMO framework is causal spend lift per send — which requires linking email clicks to purchases by campaign. With 57% of clicks unattributed, any measurement of campaign effectiveness is structurally incomplete. This is the single most important engineering ticket blocking the entire measurement stack.
- Open questions: Root cause of the 57% gap (CIO→Mixpanel pipeline misconfiguration, UTM stripping, or timestamp mismatch) not yet isolated. Engineering P2 ticket filed but ETA not confirmed. GAP 7.5.

---

**DF-07 — Camp 163 V2 Onboarding CTR Collapse: Variance Decomposition**
- Tier: data-finding
- Confidence: 0.90
- Source: `collect-hq/nba-top-shot/intelligence/2026-05-03-camp163-v2-onboarding-investigation.md` (three-wave investigation). Mixpanel queries: `e650fc0e-ebde-4741-bf06-cc28871ff6e8-3.json` (Wave 3 per-clicker conversion attempt), `656eea31-353d-4993-9bc2-cb125b8b4465-2.json` (attribution coverage).
- Last refreshed: 2026-05-03
- Headline finding: The 8.85pp CTR drop from Camp 132 (13.24%) to Camp 163 (4.85%) is 80% content/voice regression and 20% deliverability — V2 actually reaches more inboxes (96.4% delivery vs. 93.5%) but its human CTOR collapsed from 41.7% to 13.6%.
- Why it matters: The variance decomposition kills the deliverability excuse — V2 emails land; people open them and don't click because the content is wrong. V2 eliminated the `{{ content }}` dynamic basketball context from V1 and replaced it with retail transaction copy ("Quick, easy, Apple Pay, Google Pay"). Additionally, V2 runs as a 1-step sequence (3 dead journey actions with 0 sends in 30 days) vs. V1's 19+ active email touchpoints. Both failures compound: architecture killed reach, voice killed engagement.
- Open questions: Camp 163 vs. Camp 132 cohort quality comparison (are V2 new users inherently lower intent?) remains pending BQ IAM fix (GAP 7.3). UTM contamination confirmed: both campaigns carry UTMs pointing to a May 2025 drop announcement, corrupting all click attribution.

---

**DF-08 — Voice Register CTR Multiplier: 3× (Camp 132 vs. Camp 163)**
- Tier: data-finding
- Confidence: 0.85
- Source: `collect-hq/strategy/2026-05-03-what-we-can-achieve-mixpanel-baseline.md`. Camp 132: 31.75% open / 13.24% CTR. Camp 163: 4.46% CTR. Same audience, same send timing.
- Last refreshed: 2026-05-03
- Headline finding: Voice register alone produces a 3× CTR multiplier — Camp 132's warm collector-first voice vs. Camp 163's cold retail-transaction copy on the same new-user audience.
- Why it matters: This is the empirical case for naming Sam Williams as editor — not aesthetic preference but measured revenue. At current scale, 3× CTR improvement on the onboarding program translates directly to more first purchases (D7 conversion) and higher LTV. It also validates that the Camp 163 investigation's content diagnosis is correct.
- Open questions: Deliverability check caveat acknowledged (R2 Attack 4): confirmed resolved — V2 delivery is better, so the gap is entirely content. Placed-order rate comparison (not just CTR) would complete the revenue impact model but is blocked by GAP 7.7 attribution mismatch.

---

**DF-09 — BQ Segment Sizes: Dormant Collector Funnel**
- Tier: data-finding
- Confidence: 0.90
- Source: `collect-hq/strategy/2026-05-04-strategy-sot.md` §1.2 (parent session BQ findings, 2026-05-04). Segment sizes: total idle L1+L2 (1.27M), idle >60d (1.26M), idle >180d (1.24M), L1-only never-bought (774K), dormant $100K+ LT (1,122 holding $234.6M GMV).
- Last refreshed: 2026-05-04
- Headline finding: 1.27M collectors are idle (>30 days), including 1,122 dormant $100K+ lifetime spenders holding a cumulative $234.6M in historic GMV.
- Why it matters: The 1,122 dormant L+XL whale cohort is the highest-leverage reactivation target. Even 5% reactivation (56 collectors) at their historical spend rate generates ~$11.7M in potential GMV. This cohort is the entire financial justification for the B-spine CMO framework and Phase 2 CIO authorization.
- Open questions: The 300/400/300 Segment A/B/C split within the 1,122 is a cohort-knowledge estimate, not BQ-confirmed (GAP 7.1). Per-segment star concentration, top-holding players, and last-transaction dates require BQ IAM fix. Also: 19,631 organic reactivations already observed — confirming demand exists in lapsed pool, but the mechanism behind organic reactivation is unmeasured.

---

**DF-10 — W0 Conversion: Dark Window vs. Welcome Eras**
- Tier: data-finding
- Confidence: 0.80
- Source: `collect-hq/strategy/2026-05-04-strategy-sot.md` §3.1 (parent session BQ findings). Dark window (Dec 18 2025 → present): D7 = 8.54%, D30 = 8.76%. Camp 132 era: D7 = 6.75%, D30 = 6.99%. Camp #77 era: D7 = 11.37%.
- Last refreshed: 2026-05-04
- Headline finding: Dark-window D7 conversion (8.54%) is +1.79pp HIGHER than the Camp 132 welcome era (6.75%), suggesting the broken V2 welcome program may have been actively harming conversion.
- Why it matters: This is counterintuitive — turning off the welcome program appears to improve conversion, which means the Camp 163 program is a net negative drag, not just a lost opportunity. The welcome rebuild initiative (Initiative #3 in the IA spec) has an even stronger business case if the current program is actively subtracting conversion rate.
- Open questions: Cohort quality confound is unresolved (GAP 7.3): dark-window users may be self-selected higher intent (less casual signups). Heimdall Tier 2 cohort quality comparison (new user acquisition source, Day 1 app actions, first-session depth) would resolve whether the gap is voice/journey or user quality.

---

**DF-11 — Fast Break April 2026: 2,436 Events, Lead-Lag Email Relationship**
- Tier: data-finding
- Confidence: 0.87
- Source: `collect-hq/strategy/2026-05-03-what-we-can-achieve-mixpanel-baseline.md`. April 2026: 2,436 Fast Break events total; peak April 19 = 1,847 events. Peak fires 2 days after email blast (April 17).
- Last refreshed: 2026-05-03
- Headline finding: Fast Break peaked on April 19 at 1,847 events — 2 days after the April 17 email blast — suggesting email creates intent that in-product mechanics subsequently capture.
- Why it matters: The lead-lag relationship (email intent → in-product capture) is the mechanism behind the L1 tentpole campaign model. It also explains why standalone email without accompanying in-product mechanics underperforms: email alone creates intent but misses the conversion if there is no product surface ready to capture it. Fast Break is functioning as that capture layer.
- Open questions: The lead-lag relationship is observational, not causal — there is no holdout group to confirm that email drove the Fast Break spike vs. the drop event independently driving both. Atlas consumer schema not in BQ at dl-kaaos (GAP 7.9), so Fast Break score and participation data at the user level is unavailable.

---

**DF-12 — Marketplace Demand Mode: Floor-Sweep vs. Organic Price Discovery (F-MAGIC-01)**
- Tier: data-finding
- Confidence: 0.82
- Source: `collect-hq/data-reports/findings/F-MAGIC-01-floor-sweep-vs-organic-2026-05-03.md`. 130 deduped marketplace sales analyzed on May 3.
- Last refreshed: 2026-05-03
- Headline finding: When a player is in active narrative with a current-vintage Moment available, buying disperses across a wide price range (organic price discovery); when a player is in narrative but lacks a current-vintage Moment, buying pools at the floor (floor-sweep mode).
- Why it matters: Mobley's 18 of 20 sales within $1 of the $13 Base Set floor (80% modal concentration) confirms the "confirmed-gap demand mode" — collectors want the player but nothing current-vintage exists, so they buy the cheapest available. This directly quantifies the opportunity cost of not minting Playoff Edition Moments for players in live narratives. Supply gap = revenue cap.
- Open questions: Floor-sweep vs. organic classification was done on a single day (May 3). A systematic analysis across the full playoffs would establish whether the pattern is consistent. Also: does the floor-sweep mode convert to higher spend once a current-vintage Moment is released? (Embiid pre/post R2 announcement comparison would test this.)

---

**DF-13 — Certainty Premium Observation: Embiid 3.2× Advantage Over Live G7 Players**
- Tier: data-finding
- Confidence: 0.80
- Source: `collect-hq/nba-top-shot/intelligence/2026-05-03-certainty-premium-observation.md`. Market snapshots at T+0, T+11min, T+21min from market-snapshots/2026-05-03T*.json files. Embiid: 52–53 transactions at tip-off. Cade (live G7): 17–18 transactions. Zero transactions for Mitchell, Banchero, Barnes, Barrett, Murray-Boyles (all in live G7 games).
- Last refreshed: 2026-05-03
- Headline finding: Joel Embiid had a 3.2× transaction volume advantage over Cade Cunningham at tip-off of a live G7 game — demonstrating that resolved narrative (Embiid advancing) commands a premium over live drama (Cade in-game).
- Why it matters: This is the empirical anchor for the entire Three-Phase Demand Model and the Announcement Window product brief. The implication is that the current minting strategy (mint after footage) misses the Phase 2 spike, which fires at announcement, not at footage availability.
- Open questions: The 3.2× ratio was measured at a single point in time. Tracking Embiid's volume trajectory vs. Cade's across the full 24h post-announcement window would sharpen the Phase 2 spike profile. Also: the ratio will vary by narrative density — Embiid's appendectomy comeback is an extreme case; a standard advancing narrative would show a smaller ratio.

---

**DF-14 — Asymmetric Certainty Premium: Embiid 54 Transactions vs. Brunson 0**
- Tier: data-finding
- Confidence: 0.80
- Source: `collect-hq/nba-top-shot/intelligence/2026-05-03-asymmetric-certainty-premium.md`. T+40min snapshot: Embiid = 54 transactions, $14 median. Brunson = 0 transactions. Both confirmed for R2 at MSG.
- Last refreshed: 2026-05-03
- Headline finding: Two players equally confirmed for R2 at MSG show zero-vs-54 transaction divergence because narrative density (not just confirmation) scales the Phase 2 spike.
- Why it matters: The certainty premium is not binary (uncertain → certain = buy). It scales with narrative density — how much happened on the path to confirmation. Embiid's appendectomy comeback is a high-density path; Brunson's 2-seed advance-as-expected is near-zero density. This means mint timing and copy framing must account for narrative density, not just outcome certainty.
- Open questions: A full narrative density scoring model (extraordinary vs. meaningful vs. expected) needs calibration across more cases to be production-ready. The Brunson G1 performance at MSG would be a natural test of whether home-court advantage + national prime-time game activation at T+0 changes the pattern.

---

**DF-15 — Three-Phase Demand Model: Phases 1–3 Documented, Phase 4 Pending**
- Tier: data-finding
- Confidence: 0.78
- Source: `collect-hq/nba-top-shot/intelligence/2026-05-03-three-phase-demand-model.md`. Phases 1–3 documented from 4 hours of live market data (15+ market snapshots across two G7s). Phase 4 is hypothesis only.
- Last refreshed: 2026-05-03
- Headline finding: Collector demand correlates with resolved narrative (Phase 2: 2–4× volume spike at announcement), not live drama (Phase 1: near-zero during live games), and normalizes to a steady trickle in Phase 3 between chapters.
- Why it matters: "Peak demand is at announcement. Current minting is post-footage." By the time a new Moment from a G7 performance is available, the announcement-day Phase 2 spike has already peaked and settled. The minting pipeline is structurally misaligned with collector buying behavior. Announcement-day mint window initiative (Initiative #9) is the direct product response.
- Open questions: Phase 4 (post-elimination / season-closed) is documented only as a hypothesis. DF-02 (Banchero post-elimination analysis) provides partial confirmation at T+72h, but full T+7d and T+30d data is needed. The "documentary value survives loss" thesis requires long-run price stability evidence.

---

**DF-16 — Conversion Window: Cade G5 Post-Game 21× Volume Lift**
- Tier: data-finding
- Confidence: 0.85
- Source: `collect-hq/nba-top-shot/intelligence/2026-05-03-the-conversion-window.md`. Pre-game Cade Cunningham baseline: 2 listings, $12 median. Post-G5 (within 4 hours): 43 transactions, 21× volume lift. All G7 players: zero net new transactions in 7-hour pre-game window.
- Last refreshed: 2026-05-03
- Headline finding: Post-game (15 min–4 hours) is the true conversion window — the 7-hour pre-game window produced zero net transactions across all monitored G7 players, while the post-game window produced a 21× volume lift on Cade's G5.
- Why it matters: Top Shot's current editorial timing (pre-game briefs designed to drive buys) targets the wrong side of the conversion window. Pre-game content should frame the story ("here's what you'll wish you documented if this happens") rather than calling to buy. Post-game content (currently minimal or absent) is where buyers show up with conviction.
- Open questions: The pre-game content is currently write-and-post with no explicit timing strategy. A controlled test of pre-game content vs. post-game content on equivalent narrative events would sharpen the timing model.

---

**DF-17 — Collector Clock: Morning Activation vs. Same-Night Flatline**
- Tier: data-finding
- Confidence: 0.71
- Source: `collect-hq/nba-top-shot/strategy/2026-05-03-collectors-clock-product-brief.md`. 15+ market snapshots across two G7s. Key observation: Embiid's spike (16 → 52 transactions) was triggered by the R2 announcement mid-morning, not the prior night's game. Near-zero post-buzzer transaction volume confirmed in multiple G7 windows.
- Last refreshed: 2026-05-03
- Headline finding: The collector buys when the story is "processed" — which means morning recap, highlights, understanding what it means — not in the immediate post-buzzer window.
- Why it matters: The current E1 email broadcast fires same-night when collectors aren't buying. Moving E1 to 7:00 AM ET morning-after is proposed to align the delivery window with actual buying behavior. The Collector's Clock A/B configuration is Initiative #4 in the IA spec (stage: pre-launch).
- Open questions: The morning-vs-same-night conclusion is backward-inferred — no controlled A/B test of morning vs. same-night email timing exists (GAP 7.12). The Embiid observation is compelling but confounded (the announcement itself could be the trigger, not the morning timing).

---

**DF-18 — BQ Revenue: January–May 2026 YTD Pack + Marketplace Volume**
- Tier: data-finding
- Confidence: 0.90
- Source: `collect-hq/strategy/2026-05-04-phase1-marketplace-gap.md` BQ-10. PACK: 192,865 transactions, $7.4M total (Jan 1–May 4 2026). MOMENT: 335,812 transactions, $4.83M total. Grand total: $12.23M in ~4 months. F132 units check: confirmed dollars (not cents).
- Last refreshed: 2026-05-04
- Headline finding: $12.23M in primary + secondary market transactions in the first ~4 months of 2026, annualizing to ~$36M — significantly above Loki's ~$10.8M annual estimate.
- Why it matters: Loki's annual revenue estimate appears to be significantly understated. If $10.8M was the correct figure, it implies a major revenue decline between Loki's data window and current reality — which would be directionally wrong given the 2026 Playoffs content cadence. The Heimdall Tier 2 reconciliation pass (noted in DF-01 open questions) is needed.
- Open questions: The $7.4M PACK figure includes secondary marketplace pack re-sales (not just primary drops), so it overstates primary revenue. Separating primary from secondary requires a join that identifies the original-drop pack transactions vs. resale. BQ schema supports this but was not executed in the current pass.

---

**DF-19 — Social Proof Data Pull: Current Platform Activity Metrics**
- Tier: data-finding
- Confidence: 0.88
- Source: `collect-hq/strategy/2026-05-04-social-proof-data.md`. 22 BQ queries against `dapperlabs-data.production_mart_nba_product.*`. Queries executed and confirmed live.
- Last refreshed: 2026-05-04
- Headline finding: 37,227 collectors were payment-active in the last 30 days; 1,696 unique pack openers in the last 7 days (9,344 packs opened); 1,588 unique marketplace buyers in 7 days; top single-week whale transaction $12,000; 30 collectors drove $99,759 in $1K+ transactions this week.
- Why it matters: These are the live social proof numbers that make behavioral personalization in email real rather than manufactured. The 37,227 30-day returners is a substantially more compelling number than 7 "activated users" last week — and it's honest. The $1K+ whale cohort (30 collectors, 18% of marketplace volume, avg $3,325/transaction) quantifies the whale tier's revenue concentration for the concierge program case.
- Open questions: Collector score tier (L4/L5 formal label) is unavailable — `collector_score_historical` stale since 2023-04-24. Drop sell-out timing, waitlist count, and Fast Break game scores are all blocked (Atlas consumer schema not provisioned, no drop management table in mart schema).

---

**DF-20 — Mixpanel Event Taxonomy: 29 Queries, Email Funnel Mapped**
- Tier: data-finding
- Confidence: 0.92
- Source: `research-reports/data-science-insights/mixpanel-queries/` (29 JSON files). Key events confirmed: Email Opened, Email Link Clicked, Application Opened, Order Confirmed, pack-opening-start. Key discovery: 57% campaign attribution dark (see DF-06). Key gap: Email Sent/Delivered events do not exist in Mixpanel (BQ-9-equivalent: query returned null — CIO does not push send/delivery events to Mixpanel, only opens and clicks).
- Last refreshed: 2026-05-03
- Headline finding: The Mixpanel event taxonomy for email is functional for opens and clicks but has no send/delivery events — making inbox placement rate, send volume, and per-campaign open rate unmeasurable from Mixpanel alone.
- Why it matters: Open rate can only be computed via Customer.io's own metrics API, not Mixpanel. All Mixpanel-based email analysis is downstream of a delivery event that Mixpanel doesn't record. The 1.66% blended CTR (DF-04) is a Mixpanel-native number but open rate must come from CIO directly.
- Open questions: The full schema discovery pass took 29 queries across multiple sessions — a schema reference document would prevent re-discovery in future sessions. The JQL aggregation attempted in query `887b59e5-...-10.json` (per-newsletter+campaign opens+clicks last 60d) is the most useful summary query and should be run monthly.

---

**DF-21 — Revenue Concentration: $1K+ Buyers = 1.9% of Buyers, 18% of Volume**
- Tier: data-finding
- Confidence: 0.88
- Source: `collect-hq/strategy/2026-05-04-social-proof-data.md` Query 7c (buyer tier breakdown by transaction price). L1-L2 (<$100): 1,563 buyers, $244,184 volume. L4-L5 ($1K+): 30 buyers, $99,759 volume.
- Last refreshed: 2026-05-04
- Headline finding: 30 collectors ($1K+ transactions) generated $99,759 this week — 18% of total marketplace volume from 1.9% of buyers. Expanded to 30 days: 81 collectors drove $494,487 at avg $2,875/transaction.
- Why it matters: Revenue concentration confirms the whale protection imperative. Losing any segment of the 30-weekly-high-spend buyers has a disproportionate marketplace impact. The whale concierge program (Initiative #2) is protection for the 18%/1.9% asymmetry — every at-risk whale represents ~$3,325/week in marketplace volume.
- Open questions: The $1K+ threshold is a proxy for the formal L4/L5 collector tier (stale score table). True L4/L5 classification requires either a score refresh pipeline or BQ-derived lifetime value rank. The 81 monthly buyers at $1K+ is a different population than the 1,122 dormant $100K+ LT cohort — the relationship between current high-spenders and dormant LTV whales is unmeasured.

---

## TIER 2: MARKET SIGNALS

*External competitive intelligence, industry benchmarks, and regulatory/business signals. Frigga-methodology sourced. Sorted: recency first, then confidence descending.*

---

**MS-01 — Fanatics Live: $1.11B Lifetime GMV, $928M Projected 2026 (65% YoY Growth)**
- Tier: market-signal
- Confidence: 0.85
- Source: `collect-hq/strategy/2026-05-04-phase1-competitive-gap.md` §B.2. Primary source: sportscardradio.com "State of Fanatics Live: April 2026" (April 2026 state-of-platform report). All figures from named publication.
- Last refreshed: 2026-05-04
- Headline finding: Fanatics Live grew per-stream GMV 116% in 18 months ($8,255 avg Sep 2024 → $17,867 Apr 2026) and projects $928M GMV for full-year 2026 — but its product is synchronous, physical, and socially live, not substitutable for digital ownership.
- Why it matters: Fanatics Live is not a direct substitute for Top Shot (physical cards, live-stream format) but it competes for the same discretionary hobby spend and time. The scale signal is what matters: a $928M GMV adjacent-market in physical sports card live-breaking means the addressable collector population is enormous and actively spending — Top Shot's challenge is acquisition and positioning, not market existence.
- Open questions: NBA-specific GMV breakdown within Fanatics Live is not published. The April 2026 state report's largest streams are NFL/MLB/Pokémon. Basketball's share of the platform is unknown. Buyer demographics and crossover with Top Shot collectors not findable publicly.

---

**MS-02 — Topps NBA License Return: Presales Sold Out, +100% Secondary Premiums (Oct 2025)**
- Tier: market-signal
- Confidence: 0.90
- Source: `collect-hq/strategy/2026-05-04-phase1-competitive-gap.md` §A.2. Primary sources: cllct.com "Prices for 2025-26 Topps Basketball surge on secondary market" (2025-10-23), Beckett News (named sales, named cards). Also: `collect-hq/nba-top-shot/intelligence/2026-05-03-topps-nba-returns-competitive-brief.md`.
- Last refreshed: 2026-05-04
- Headline finding: Topps 2025-26 Basketball launch presales sold out within minutes; hobby boxes resold immediately at 105% premiums ($225 vs. $109.99 retail); Topps NOW same-day performance cards ($8.99 base) directly compete with Top Shot's real-time Moments proposition.
- Why it matters: Topps is performing the top-of-funnel work for sports performance collectibles — introducing millions of collectors to the NBA performance-tied ownership concept at $8.99 entry. The Topps NOW vs. Top Shot Instant price gap is only $3 ($8.99 physical vs. $12 digital median for the same player/game). The "category development gift" framing is load-bearing: Topps reactivates the physical-to-digital migration pipeline.
- Open questions: No migration data found linking Panini-to-Topps collector movement with any interest in NBA Top Shot. The two communities (physical cards, digital collectibles) appear to be running in parallel without crossover in public discourse. A Reddit/forum scan specifically targeting "Topps NBA and also considering Top Shot" would test whether the migration path is hypothetical or real.

---

**MS-03 — Panini NBA License Expired: Final Products, Unlicensed Era Begins (Oct 1, 2025)**
- Tier: market-signal
- Confidence: 0.90
- Source: `collect-hq/strategy/2026-05-04-phase1-competitive-gap.md` §A.1. Hard date confirmed from cllct.com. Final licensed Panini products: 2024-25 National Treasures ($3,600/box, Aug 15 2025), 2024-25 Panini Select (June 18 2025). Unlicensed era begins 2025-26 Donruss/Signatures.
- Last refreshed: 2026-05-04
- Headline finding: Panini's NBA license transferred to Fanatics/Topps on October 1, 2025, after a 16-year run; sealed final-licensed Panini products climbed 20–40% immediately, confirming that NBA licensing is load-bearing for collector value.
- Why it matters: Unlicensed Panini cards are explicitly expected to trade at a discount vs. licensed Topps products — confirming that official NBA license is a value multiplier, not an ornamental credential. Top Shot holds the official NBA digital highlights license; the Panini transition gives Top Shot a timely, concrete hook to articulate why "officially licensed NBA Moments" matter vs. unofficial clips or unlicensed digital cards.
- Open questions: No documented migration of Panini collectors to NBA Top Shot was found in any forum, Reddit thread, or trade publication — the physical and digital communities are operating in parallel. Panini's response strategy for unlicensed NBA products (domestic market, international, license-adjacent products) is not yet tracked.

---

**MS-04 — Disney Pinnacle: Disney+ Perks Integration, 150M Addressable Users (Ongoing through June 2026)**
- Tier: market-signal
- Confidence: 0.75
- Source: `collect-hq/strategy/2026-05-04-phase1-competitive-gap.md` §C.2. Disney+ Perks program: 1 free Open Edition Mystery Capsule/month + $10 Dapper credit through May 29/June 26 2026. Source: DisneyPinnacle on X (2026-05-28, 2026-05-28 repost); CCN citing Dapper Labs (150M subscriber figure).
- Last refreshed: 2026-05-04
- Headline finding: Disney Pinnacle's free monthly capsule program reaches 150M Disney+ subscribers — the single largest digital-collectibles onboarding experiment in the space — with zero public disclosure of redemption rate.
- Why it matters: Every subscriber who claims a free pin is a new Dapper wallet holder. Even 0.5% conversion is 750,000 pre-qualified Dapper users who have already demonstrated willingness to engage with digital collecting on the same infrastructure as Top Shot. The Disney+ Perks funnel is the largest potential warm-list seeding event for cross-Dapper-product discovery — a cross-product synthesis signal for Roham/Dan routing.
- Open questions: No redemption rate for the free capsule program has been disclosed (the most commercially significant unknown). No on-chain crossover data is available showing wallets holding both Top Shot Moments and Disney Pinnacle pins. The Flowverse/Flipside Crypto query against Flow public data to identify dual-product wallets is the most direct path to closing this gap.

---

**MS-05 — Sorare: 35% Staff Layoff, Solana Migration, Continuous Supply Model Fails (Nov 2025)**
- Tier: market-signal
- Confidence: 0.82
- Source: `collect-hq/nba-top-shot/intelligence/2026-05-03-drop-cadence-competitive-brief.md`. Sorare: 378K cardholders (+33% YoY), 35% staff layoff November 2025, CTO stepped back, migrated to Solana. "Card Factory" crafting mechanic launched.
- Last refreshed: 2026-05-03
- Headline finding: Sorare's continuous/diffuse supply model has not solved between-drop engagement; the 35% staff layoff and revenue instability confirm that digital sports collectibles revenue still depends heavily on scheduled event-driven drops.
- Why it matters: Sorare is the closest direct competitor to Top Shot in digital sports collectibles. Their failure mode (continuous supply without engagement bridging) is instructive: the between-drop collapse problem requires active product intervention, not just better minting cadence. Their crafting mechanic (burn old cards) is one approach; Top Shot's Fast Break and Challenges are another.
- Open questions: Sorare's NBA-specific cardholder count (vs. multi-sport) and their 2026 revenue trajectory post-layoff are not publicly available. Whether the Solana migration improved unit economics is also unconfirmed.

---

**MS-06 — Nike SNKRS: 170M Users, Shift from Shock Drops to Intentional Gating (2025)**
- Tier: market-signal
- Confidence: 0.78
- Source: `collect-hq/nba-top-shot/intelligence/2026-05-03-drop-cadence-competitive-brief.md`. Nike SNKRS: 170M users across app family. SNKRS Reserve (preorder), SNKRS Link (social-gated drops). Evolution: away from FOMO panic toward "confident anticipation."
- Last refreshed: 2026-05-03
- Headline finding: Nike deliberately moved away from shock drops toward intentional gating ("SNKRS Reserve," preorder to reduce anxiety) — confirming that engineered scarcity + community rituals build higher LTV than FOMO-driven panic.
- Why it matters: The SNKRS analogy validates Roham's Leg 3 (temple event) of the drop cadence hypothesis. "The drop IS the event" and DAU spikes during drops with high sell-through confirm that the drop itself is the business event, not a vehicle for distributing inventory. The shift from FOMO panic to confident anticipation is a tone target for Top Shot's drop communications.
- Open questions: SNKRS and Top Shot have different sell-through constraints (shoes are physical objects with retail inventory; Moments are digital). The SNKRS "pre-order" mechanic doesn't map directly to Top Shot's announce-then-mint workflow. The behavioral learning (anticipation > panic) is transferable; the mechanics are not.

---

**MS-07 — MTG: 6 Sets/Year, +60% Revenue 2025, Bloomburrow New-Player Acquisition (2025)**
- Tier: market-signal
- Confidence: 0.80
- Source: `collect-hq/nba-top-shot/intelligence/2026-05-03-drop-cadence-competitive-brief.md`. MTG: ~6 sets/year, Q3 2024 Bloomburrow drove "sequential upticks in new-player acquisition rates." 2025 revenue +60% YoY, powered by Universes Beyond IP crossovers.
- Last refreshed: 2026-05-03
- Headline finding: MTG's sustainable 2025 growth (+60% revenue) came from treating every set launch as a mainstream-entry moment — with IP crossovers (Final Fantasy, Avatar) creating 3–4× the new-player lift of standard set releases.
- Why it matters: MTG is the most structurally comparable collectible to Top Shot — sets, rarity tiers, secondary market, enthusiast community. Their batch-drop cadence validates Roham's Leg 1 (curation quality) and Leg 3 (temple event) hypotheses. The IP crossover model directly suggests what Top Shot's equivalent of a "Universes Beyond" could be: a drop anchored to a moment of peak national basketball attention (Finals MVP announcement, rookie class debut).
- Open questions: MTG still has a between-drop engagement gap that requires explicit bridging mechanisms (Secret Lair, Arena events). Top Shot's Fast Break and Challenges are the equivalent but their engagement bridge depth is unmeasured. MTG's new-player vs. existing-player revenue split (how much of +60% is reactivation vs. acquisition) is not published.

---

**MS-08 — LLM Email Marketing Playbooks: 34 Citations, Industry Benchmarks**
- Tier: market-signal
- Confidence: 0.82
- Source: `collect-hq/strategy/2026-05-04-llm-email-marketing-playbooks.md`. 22 web searches, 12 deep fetches, 34 cited sources.
- Last refreshed: 2026-05-04
- Headline finding: Raw LLM email copy underperforms human controls by 18%; Gmail's February 2026 AI spam filter penalizes LLM-similarity at 2.4×; behavioral trigger architecture (not copy generation) produces the largest measurable lift (152% higher CTR vs. broadcast; 497% in some analyses).
- Why it matters: The four rejected LLM email iterations almost certainly suffered from template lock-in (single-shot generation without exemplar grounding). The fix is architectural, not prompt-based — a 6-stage pipeline (data grounding → brief → draft → voice pass → fact-check → human gate) with 10–15 Roham-approved exemplar emails as the voice corpus. The behavioral trigger architecture alone (Camp 163 dead journey actions fix) produces more lift than any copy improvement.
- Open questions: No public case studies with specific email metrics for Fanatics, Topps, or Panini email programs were found. Skybox Collectibles (63.6% open / 8.3% CTR / 7.1% placed-order on welcome series) remains the only collector-community email benchmark with verified metrics.

---

**MS-09 — Skybox Collectibles Welcome Email: 63.6% Open / 8.3% CTR / 7.1% Placed-Order**
- Tier: market-signal
- Confidence: 0.90
- Source: `collect-hq/strategy/2026-05-04-llm-email-marketing-playbooks.md` §2.5. Coalition Technologies case study (named client, verifiable). Skybox is a physical sports card retailer (Pokemon, trading cards) — the closest public analog to NBA Top Shot's email program.
- Last refreshed: 2026-05-04
- Headline finding: Skybox Collectibles' welcome email series achieves 63.6% open rate, 8.3% CTR, and 7.1% placed-order rate — driven by behavioral trigger architecture and collector-insider voice, not AI copy generation.
- Why it matters: Skybox's welcome series is the reference bar for collector-community email performance. Top Shot's best historical welcome (Camp 132): 44.2% open / 12.8% CTR / placed-order rate unknown (GAP 7.7). Skybox is 43% higher on opens but Top Shot has 54% higher CTR — suggesting Top Shot's click-through strength is real but inbox engagement lags. The behavioral trigger architecture (welcome series fires at moment-of-purchase intent) is the mechanism behind Skybox's 63.6%, not copy excellence.
- Open questions: Skybox's welcome series open rate of 63.6% is for the welcome series specifically — not a broadcast campaign benchmark. Welcome series consistently outperform broadcast by 3–5×. The placed-order rate (7.1%) is the hardest gap to close for Top Shot: DF-03 shows Top Shot at 2.24%.

---

**MS-10 — ACM 2025 Study: LLM Emails Are "Robotically Warm-Hearted" — Linguistic Fingerprint Identified**
- Tier: market-signal
- Confidence: 0.88
- Source: `collect-hq/strategy/2026-05-04-llm-email-marketing-playbooks.md` §7.1. ACM Web Science 2025 paper "Emails by LLMs: A Comparison of Language in AI-Generated and Human-Written Emails." Direct link: dl.acm.org/doi/full/10.1145/3717867.3717872.
- Last refreshed: 2026-05-04
- Headline finding: AI-generated emails are significantly more readable, formal, polite, and subjectively positive than human-written emails — described by participants as "robotically warm-hearted" and "excessively polite and positive despite lacking genuineness."
- Why it matters: This study provides the academic grounding for why Roham's rejection pattern is calibrated correctly. CEOs catching "AI feel" in consecutive iterations are detecting real linguistic characteristics. The fix — exemplar-based prompting, voice pass stage, fact-grounded personalization — addresses specific measurable deficits, not vague aesthetic preferences.
- Open questions: The study measured general email corpora, not sports/collectibles community specifically. Whether the "robotically warm-hearted" fingerprint is more or less detectable in a highly specific collector voice (where the baseline register is already informal and referential) is not tested.

---

**MS-11 — Drop Cadence Competitive Analysis: Between-Drop Gap Is Unsolved Across All Analogs**
- Tier: market-signal
- Confidence: 0.78
- Source: `collect-hq/nba-top-shot/intelligence/2026-05-03-drop-cadence-competitive-brief.md`. Four analogs analyzed: MTG, Nike SNKRS, Sorare, Fanatics/Topps Festival Model. Frigga scan with competitive + teardown methodology.
- Last refreshed: 2026-05-03
- Headline finding: No analog has fully solved the between-drop engagement problem — MTG, Nike, and Sorare all require explicit bridging mechanisms, and announcement-day demand window is a gap unique to Top Shot where no competitor faces the same structure.
- Why it matters: Roham's Leg 1 (curation quality) and Leg 3 (temple event) are validated by the analog scan. The missing piece — supply calendar opacity creates collector anxiety that MTG solved by publishing 18-month release calendars — is an addressable product investment. The announcement-day demand window is Top Shot's unique structural advantage (the underlying game creates demand before the product is available), not a liability.
- Open questions: Fanatics Fest (in-person physical collector event with exclusive drops) is cited as a "temple event" analog, but data on sustained collector acquisition vs. existing-fan excitement is unclear. Top Shot's equivalent of an in-person event has not been explored.

---

**MS-12 — Topps NOW vs. Top Shot Instant: $3 Price Gap on Same Player/Same Game**
- Tier: market-signal
- Confidence: 0.85
- Source: `collect-hq/nba-top-shot/intelligence/2026-05-03-topps-nba-returns-competitive-brief.md`. Observed data point: Cade Cunningham Topps NOW card #287 ($8.99, print run 1,150) vs. Cade Top Shot Base Set median ($12, 40 transactions) on the same day.
- Last refreshed: 2026-05-03
- Headline finding: The digital Moment ($12 median) costs only $3 more than the physical Topps NOW card ($8.99) for the same player and game performance context — a gap narrow enough to require proactive articulation of digital ownership's distinct value proposition.
- Why it matters: The $3 gap means the conversation shifts from "why pay for digital?" to "what does $3 extra buy you?" — and the answer (video vs. static image, serial number provenance, instant settlement, no grading needed, no counterfeits possible) is compelling but not currently articulated in Top Shot's copy. The Panini licensing story (MS-03) provides the framing: unlicensed = discount; official = premium.
- Open questions: Print run dynamics differ between the two products: Topps NOW print run closes after 24 hours with crowd-determined scarcity; Top Shot Moments have a fixed minted count. The comparison is directionally valid but the scarcity mechanics are not identical.

---

**MS-13 — Disney Pinnacle Discord: 12,045 Members, Sell-Through Signals**
- Tier: market-signal
- Confidence: 0.72
- Source: `collect-hq/strategy/2026-05-04-phase1-competitive-gap.md` §C.3. Discord server: discord.com/invite/disneypinnacle (12,045 members as of 2026-05-03). Legendary Mystery Capsules ($499.99): 40 sold instantaneously. 16,000+ mystery capsules unboxed in initial window (globenewswire.com 2026-02-07).
- Last refreshed: 2026-05-04
- Headline finding: Disney Pinnacle's Discord has 12,045 members and early drop sell-through signals are strong (40 Legendary capsules at $499.99 sold instantaneously, $7,500 1-of-1 secondary sale within hours), but the collector base size relative to Top Shot's is unclear.
- Why it matters: As a sibling Dapper product, Pinnacle's community size is a cross-product reference point. 12,045 Discord members vs. Top Shot's collector base (tens of thousands of active traders per BQ data) suggests Pinnacle is meaningfully smaller by community breadth. The cross-product synthesis finding is for Roham/Dan routing — not action.
- Open questions: No DAU/MAU or active collector count for Disney Pinnacle is publicly available. The "I lapsed Top Shot, now I'm on Pinnacle" migration pattern was explicitly searched and not found — the communities appear non-overlapping in public discourse. First-party Dapper account data (wallets holding both products) is the only way to close the crossover question.

---

## TIER 3: COLLECTOR VOICE

*Qualitative findings, sentiment, and direct collector quotes. Sourced from community posts, journalism, official platform channels, and support ticket themes. Sorted: recency first.*

---

**CV-01 — "This Season Has Been the Best One Yet" (Active Positive, May 2026)**
- Tier: collector-voice
- Confidence: n/a (sentiment)
- Source count: 1 direct verbatim (single source), corroborated by CryptoAdventure 2026 review (indirect)
- Source: `collect-hq/strategy/2026-05-04-phase1-sentiment-gap.md` §A. Verbatim from NBA Top Shot May 2026 Mailbag (blog.nbatopshot.com/posts/the-may-mailbag). Collector-submitted question context.
- Last refreshed: 2026-05-04
- Sentiment: Positive — strong
- Headline finding: An active collector explicitly describes the 2025–26 season as Top Shot's best, citing the Playoffs content loop (Flash Challenges, Fast Break, pack drops, prize store) as a daily ritual.
- Why it matters: The most recent direct collector voice (May 2026) supports the editorial strategy's central thesis — the Playoffs content machine is working for the engaged core. This quote is the "we have product-market fit with the active collector" anchor for any strategy presentation.
- Open questions: Single source (official platform channel). Not an independent or unmediated community voice. The May Mailbag format selects for engaged collectors willing to submit questions publicly — it will skew positive. Reddit r/nbatopshot and Discord (inaccessible to current tooling) would provide unmediated balance.

---

**CV-02 — "Nearly Impossible to Compete Via Challenges or Leaderboards" (Active Negative, May 2026)**
- Tier: collector-voice
- Confidence: n/a (sentiment)
- Source count: 1 direct verbatim, corroborated by CryptoAdventure 2026 hybrid pack analysis
- Source: `collect-hq/strategy/2026-05-04-phase1-sentiment-gap.md` §A. Verbatim from May 2026 Mailbag (blog.nbatopshot.com/posts/the-may-mailbag).
- Last refreshed: 2026-05-04
- Sentiment: Negative — structural complaint
- Headline finding: A lower-TSS collector states it's "nearly impossible" to compete for the best Moments via Challenges or Leaderboards — a structural equity gap complaint, not an emotional one.
- Why it matters: The wealth-gate problem is the clearest active negative signal from the 2026 community. The platform's answer (Fast Break, Flash Leaderboards, Burn Leaderboards) exists but apparently doesn't satisfy collectors who are below the Legendary/Rare holding tier. This is load-bearing for the Personas section: Type 4 (Community Member) collectors feel structurally excluded, which is a retention risk for the funnel's widest tier.
- Open questions: This is a single voice from the official channel. How prevalent this sentiment is in the broader community (r/nbatopshot, Discord) is unknown. A structured sentiment pull specifically targeting "Challenges exclusion" or "leaderboard access" in the Discord would quantify the frequency.

---

**CV-03 — Community Language Adoption: "Proof Moment," "Incomplete Document," "Name Getting Heavier"**
- Tier: collector-voice
- Confidence: n/a (sentiment)
- Source count: 3 confirmed phrases, sourced from community observation
- Source: `collect-hq/nba-top-shot/intelligence/2026-05-03-top-shot-as-documentary-system.md`. "Collectors are using our language back at us." The Cade Cunningham piece cited twice in #collect-community channel.
- Last refreshed: 2026-05-03
- Sentiment: Positive — community resonance
- Headline finding: The editorial documentary framing has been adopted into community language — collectors are using "proof moment," "incomplete document," and "name getting heavier" organically in community channels.
- Why it matters: Language adoption is the highest-confidence signal that a positioning concept has landed. When collectors use your vocabulary without being prompted, the concept has become internalized. This validates the documentary system positioning (product brief filed for Wednesday meeting) as the right frame — not as an imposed construct but as language collectors were already reaching for.
- Open questions: Sourced from Magic's observation of #collect-community channel — not independently verified via Discord analytics or X search. A systematic language analysis across Discord/X/Reddit would establish frequency and spread vs. isolated occurrences.

---

**CV-04 — "I Understood That Someone Was Gonna Get Left Holding the Bag" — Phil, 43, Sarasota (Lapsed)**
- Tier: collector-voice
- Confidence: n/a (sentiment)
- Source count: 1 named verbatim source (journalism)
- Source: `collect-hq/strategy/2026-05-04-phase1-sentiment-gap.md` §B. Phil (43, Sarasota, FL) in The Ringer longform (theringer.com/2025/02/26/features, February 2025). Phil came out ahead financially.
- Last refreshed: 2026-05-04 (article: 2025-02-26)
- Sentiment: Mixed — self-aware survivor, not a casualty
- Headline finding: A lapsed collector with a net-positive financial experience still frames the 2021 bubble as "someone was gonna get left holding the bag" — the supply-flood damage is so severe that even winners describe the era in loss-framing.
- Why it matters: The supply-flood trust wound (13 Moments-per-buyer in Feb 2021 → 63-to-1 by Nov 2023 per Sporting Crypto) is the dominant lapsed-collector narrative even for collectors who survived. The 2025–26 scarcity pivot is the direct response — but Phil's framing suggests the memory will take years to fade regardless of supply discipline improvement.
- Open questions: Phil's quote is from a February 2025 longform — the most recent named-collector journalism available. A current (2026) equivalent would capture whether the scarcity pivot is changing the lapsed-collector emotional narrative. The Ringer piece is also the most prominent negative coverage in search results — it shapes first-impression discovery for new potential collectors.

---

**CV-05 — "I Couldn't Sleep. I Was Running on Pure Dopamine" — Ernest Filart (Lapsed, Bubble Buyer)**
- Tier: collector-voice
- Confidence: n/a (sentiment)
- Source count: 1 named verbatim source (journalism)
- Source: `collect-hq/strategy/2026-05-04-phase1-sentiment-gap.md` §B. Ernest Filart (physical therapist), The Ringer February 2025. Bought LaMelo Ball for ~$700, watched it spike to $10,000 then collapse.
- Last refreshed: 2026-05-04 (article: 2025-02-26)
- Sentiment: Negative — bubble-era trauma
- Headline finding: A collector who bought at the 2021 bubble peak describes a dopamine-loop experience that, when it inverted, produced a traumatic financial and emotional outcome — the "running on pure dopamine" frame captures exactly why the exit narrative is emotionally loaded, not just financially.
- Why it matters: This is the emotional profile of the lapsed Type 4 (Community Member) who entered for the social/FOMO experience and left when the dopamine loop broke. The reactivation copy for this segment needs to reframe the current platform as something different from the bubble experience — not deny that the bubble happened, but offer a different emotional register (documentary permanence vs. speculative thrill).
- Open questions: No current (2026) equivalent of this collector voice is available. The lapsed-collector segment is structurally silent on the open web — they stopped posting when they stopped collecting. Direct outreach via Dapper email to the lapsed cohort would be the only way to get fresh quotes.

---

**CV-06 — "Now the Platform Is Way Better Than It Was, But People Don't Know That" — Andrew Seo, Chicago (Lapsed-Curious)**
- Tier: collector-voice
- Confidence: n/a (sentiment)
- Source count: 1 named verbatim source (journalism)
- Source: `collect-hq/strategy/2026-05-04-phase1-sentiment-gap.md` §A. Andrew Seo (graduate student, Chicago), The Ringer February 2025.
- Last refreshed: 2026-05-04 (article: 2025-02-26)
- Sentiment: Positive — platform belief, perception gap complaint
- Headline finding: A collector who lapsed and returned describes a platform genuinely improved but with a perception problem — people who left don't know the 2025–26 platform is different.
- Why it matters: This is the reactivation opportunity articulated by a collector himself. "People don't know that" is the problem the B-spine CMO framework is designed to solve — getting the "you were right to believe in this" narrative in front of the 1.27M lapsed base. The fact that a returning lapsed collector independently identifies the perception gap validates the reactivation mechanism's feasibility.
- Open questions: Single voice from journalism. How widely shared this belief is among the lapsed base (vs. harder "never going back" sentiment) is the critical segmentation question — and it maps to the A/B/C dormant segment hypothesis (Segment C: "Survivors" who held and went quiet are closest to the Andrew Seo profile).

---

**CV-07 — "Only Full of Sharks and Whales" — Josh Ong, NYC (Skeptic/Lapsed)**
- Tier: collector-voice
- Confidence: n/a (sentiment)
- Source count: 1 named verbatim source (journalism)
- Source: `collect-hq/strategy/2026-05-04-phase1-sentiment-gap.md` §A. Josh Ong (37, NYC), Defector (defector.com/nba-top-shot-story).
- Last refreshed: 2026-05-04
- Sentiment: Negative — structural class dynamic
- Headline finding: A former or skeptical collector describes the current market as exclusively for "sharks and whales and people who are there for the money" — the class-access problem articulated as a market composition concern.
- Why it matters: The Ong quote captures the most durable objection to Top Shot beyond the NFT stigma: that the platform's price dynamics have self-selected out regular collectors in favor of sophisticated players. This connects to CV-02 (leaderboard access frustration) and the "83% of pack-only buyers never touch the marketplace" data point. If the market feels like a sharks-and-whales arena, casual entry feels futile.
- Open questions: The Defector piece was published before the 2025–26 scarcity pivot and Flash Challenge introduction. Whether the "sharks and whales" perception has moderated since the playlist introduction is unmeasured. The $1–5 floor price range for many Moments means the barrier is actually low — the perception gap between actual entry price and perceived barrier is itself a product of lapsed-collector narrative.

---

**CV-08 — Supply-Flood 63-to-1 Ratio (2023 Sporting Crypto Analysis)**
- Tier: collector-voice
- Confidence: 0.65
- Source count: 1 secondary source (newsletter analysis)
- Source: `collect-hq/strategy/2026-05-04-phase1-sentiment-gap.md` §B. newsletter.sportingcrypto.com/p/the-state-of-nba-top-shot-2025 (2025, via WebFetch). Moments-per-buyer ratio: 13 in February 2021 → 63-to-1 by November 2023.
- Last refreshed: 2026-05-04
- Sentiment: Negative — structural market dynamics
- Headline finding: The supply-to-buyer ratio went from 13 Moments per buyer (Feb 2021 bubble peak) to 63-to-1 (Nov 2023) — supply grew 5× faster than the buyer base, explaining the value collapse.
- Why it matters: The supply-flood is the root cause of the lapsed-collector financial trust wound. It explains why "63 Moments per buyer" means any individual Moment's resale value faces structural sell-side pressure. The 2025–26 scarcity pivot (reduced mints, rookie caps under 5,000) is the direct response — but awareness of whether the pivot has improved the ratio is not tracked.
- Open questions: Current (2026) Moments-per-buyer ratio is not tracked in any source. Calculating this would require total circulating Moments supply vs. active buyer count — a BQ query that hasn't been run.

---

**CV-09 — NFT/Crypto Stigma: Securities Lawsuit Settlement, FTX Overhang (New-Curious Barrier)**
- Tier: collector-voice
- Confidence: 0.70
- Source count: Multiple secondary sources (journalism, Bloomberg Law summary, theblock.co)
- Source: `collect-hq/strategy/2026-05-04-phase1-sentiment-gap.md` §C. Dapper settled NBA Top Shot Moments lawsuit for $4M in 2024 (theblock.co/post/298286). FTX collapse narrative. Bloomberg Law "purchasers must rely on Dapper Labs's expertise and managerial efforts" framing. Securities settlement is prominent in SERP results.
- Last refreshed: 2026-05-04
- Sentiment: Negative — acquisition barrier for new-curious collectors
- Headline finding: The securities lawsuit settlement and NFT/crypto stigma are the primary acquisition barrier for potential new collectors — encountered before any positive platform signal in Google search results.
- Why it matters: New potential collectors who Google "NBA Top Shot" encounter the lawsuit prominently. The trust hole is in the discovery layer, not the product layer — the product has improved, but the SEO environment serves bubble-era negative coverage first. This is the "C-evidence layer" problem from the CMO framework: external sources shape first impression and Top Shot lacks press credibility to counter it.
- Open questions: No A/B comparison data exists on what percentage of new-curious visitors convert vs. bounce on encountering the lawsuit/NFT content in search results. The PR amplification initiative (Initiative #10) is the proposed counter — getting one journalist to cite a Top Shot data point within 4 weeks would begin to shift the SERP environment.

---

**CV-10 — Four Collector Archetypes: Story / Proof / Artifact / Community (Theory)**
- Tier: collector-voice
- Confidence: 0.75
- Source count: Primary synthesis from market behavior observation (not survey-validated)
- Source: `collect-hq/nba-top-shot/intelligence/2026-05-03-four-collector-archetypes.md`. Behavioral inference from 15+ market snapshots, G5/G6/G7 transaction patterns, and live marketplace monitoring.
- Last refreshed: 2026-05-03
- Sentiment: n/a (framework)
- Headline finding: Four collector archetypes exist — Story Buyer (buys on unresolved narrative), Proof Buyer (buys post-confirmation), Artifact Holder (long-horizon, $500+), Community Member (social entry, easiest to lose) — with a progression funnel: Type 4 → Type 2 → Type 1 → Type 3.
- Why it matters: This archetype framework is the communication targeting backbone for the CMO framework, all three copy frames (Almanac/Cinematic/Brief), and the reactivation campaign. Without it, copy defaults to addressing all collectors with the same message. With it, the Reactivation E1 broadcast can explicitly target Type 2 (Proof Buyer) and Type 1 (Story Buyer) registered-but-lapsed collectors with appropriate framing.
- Open questions: Theory-grounded but not survey-validated (confidence 0.75). The archetype funnel (Type 4 → Type 2 → Type 1 → Type 3) is a behavioral inference from market observation, not a tracked user journey. A cohort analysis in BQ (users who entered as Type 4 Community → which ones progressed to Type 2 behaviors? what triggered the progression?) would harden the framework.

---

## GAP ANALYSIS BY TIER

### Data Findings Tier: ADEQUATE DEPTH (21 cards)
The data findings tier is well-populated with primary BQ and Mixpanel evidence. However, three structural gaps remain:
- **GAP DF-A:** Causal spend lift is entirely unmeasured (GAP 7.10). All conversion data is correlational. Holdout group configuration needed.
- **GAP DF-B:** Per-campaign placed-order rate for Camp 132 vs. Camp 163 specifically (GAP 7.7) — the join between CIO customer_id and Mixpanel/BQ user_id failed in previous attempt. This is the most important missing number for the welcome rebuild ROI case.
- **GAP DF-C:** Pack drop revenue analysis excluded morning-after data for May 3 G7 (BQ data coverage ends ~02:00 UTC May 4). Full Phase 4 confirmation requires May 5–6 BQ pull.

**Proposed fills:** Heimdall Tier 2 on cohort quality confound (GAP 7.3); BQ query on current Moments-per-buyer ratio; holdout group setup in CIO for any live campaign.

---

### Market Signals Tier: ADEQUATE DEPTH (13 cards)
Competitive landscape is well-covered for the major signals (Fanatics Live, Topps/Panini transition, MTG, Nike SNKRS, Sorare, Disney Pinnacle). Three remaining gaps:
- **GAP MS-A:** Panini unlicensed-era collector behavior and secondary market trajectory is unfollowed — no ongoing monitoring.
- **GAP MS-B:** Fanatics Live NBA-specific GMV and buyer demographics remain undisclosed.
- **GAP MS-C:** Physical card email marketing programs (Fanatics, Topps, Panini) have no public metrics — Skybox remains the only verified analog.

**Proposed fills:** Frigga scan on Fanatics Live NBA basketball breaks specifically (query: "Fanatics Live NBA basketball break revenue 2026 top performers"); monthly Topps NOW sell-through monitoring via sportscardradio.com.

---

### Collector Voice Tier: SPARSE — STRUCTURAL GAP (10 cards)

This tier has the most critical gap. 10 cards sounds adequate but the sourcing is structurally thin:
- **8 of 10 cards** draw from only 3 publications (The Ringer Feb 2025, Defector, NBA Top Shot Blog May 2026)
- **0 cards** are sourced from Discord (inaccessible via current tooling)
- **0 cards** are sourced from raw Reddit threads (blocked via WebFetch)
- **0 cards** are sourced from X/Twitter raw post text (paywalled)
- **0 cards** are sourced from NPS/CSAT/structured survey data (none exists in any source)
- **0 cards** represent lapsed-collector voice from 2026 (structurally absent — lapsed users stop posting)

**What would fill the gap:**
1. Reddit r/nbatopshot API or authenticated scraping: top posts last 30 days + sentiment classification
2. Discord read access (authenticated bot token): #collect-community sentiment last 30 days
3. X API Academic/Enterprise tier: "NBA Top Shot" mentions, last 30 days, sentiment classification
4. NPS survey to active Top Shot collector base: 10 questions, routed through Dapper CRM
5. Kenny Zamora support ticket theme analysis: what are the top 5 complaint categories in the last 30 days?

**Priority:** Kenny Zamora support themes + Discord read access are the highest-leverage additions because they provide unmediated community voice from the currently-active collector base. The journalistic sources provide depth on lapsed and new-curious sentiment but are structurally incomplete for active sentiment.

---

## TOP 10 MOST CITED FINDINGS

The following research artifacts are referenced across the highest number of other strategy documents, copy briefs, initiative specs, and decision frameworks in the current corpus.

1. **Voice Register CTR Multiplier: 3× (DF-08)** — Referenced in: CMO framework (SoT §3.8), what-we-can-achieve baseline, cmo-decision-brief, cmo-action-framework, collect-hq-ia-spec (Stack section), collect-hq-kpis, llm-email-marketing-playbooks, phase2-framework-audit, rewrite-action-plan, and all three copy frame specs. The single most-cited finding in the corpus — it is the empirical case for Sam Williams as named editor, the welcome rebuild initiative, and the entire email program redesign.

2. **Dormant Whale Cohort: 1,122 Collectors, $234.6M GMV (DF-09)** — Referenced in: CMO framework, reactivation copy specimens, all three copy frames (Almanac, Cinematic, Brief), cmo-decision-brief, cmo-action-framework, collect-hq-ia-spec (Initiatives and Personas sections), collect-hq-kpis, and the Phase 2 authorization decision brief. The financial anchor for the entire B-spine strategy.

3. **Three-Phase Demand Model (DF-15)** — Referenced in: announcement-window-protocol, announcement-window-brief-for-roham, narrative-certainty-premium, the-30-minute-window, pre-g1-baseline-tonight, pre-g1-market-snapshot, multiple market watch documents, collect-hq-ia-spec, and the mint-timing-brief. The framework that unified all market-observation intelligence from the G7 monitoring sessions.

4. **Camp 163 CTR Collapse (DF-07) and Variance Decomposition** — Referenced in: CMO framework, collect-hq-ia-spec (Stack section), cmo-decision-brief, cmo-action-framework, llm-email-marketing-playbooks, phase2-framework-audit, and all email copy initiative specs. The root-cause analysis that established architecture+content as the dual failure modes.

5. **W0 Conversion: 2.9% → 21.2% (Pack EV Positivity) (from Loki / SoT §2.8)** — Referenced in: CMO framework, collect-hq-ia-spec (Personas and Initiatives), pack-ev-positivity initiative, and the reactivation mechanism rationale. Establishes that the first-purchase experience quality is the primary conversion lever for L1→L2 progression.

6. **Certainty Premium + Asymmetric Certainty Premium (DF-13, DF-14)** — Referenced in: three-phase demand model, announcement-window-protocol, narrative-certainty-premium, the-30-minute-window, market watch documents, and mint-timing-brief. The empirical anchors for the announcement-day mint window initiative.

7. **April 2026 Campaign Lift: 22–24× Orders (DF-05)** — Referenced in: what-we-can-achieve baseline, CMO framework, collect-hq-kpis, cmo-decision-brief, and all three copy frame performance projections. The "what's possible" anchor for campaign ROI projections.

8. **Topps NBA Return + Topps NOW $8.99 vs. Top Shot $12 Gap (MS-02, MS-12)** — Referenced in: topps-nba-returns-competitive-brief, drop-cadence-competitive-brief, phase1-competitive-gap, phase3 copy frames (the Trading Card Cinematic frame specifically uses the Topps comparison as a positioning anchor), and cmo-decision-brief.

9. **Floor-Sweep vs. Organic Price Discovery (DF-12)** — Referenced in: mint-timing-brief, announcement-window-protocol, the-conversion-window, three-phase-demand-model, post-g7-market-forecast, and the product brief for Arc Moments. The finding that "supply gap = revenue cap" for in-narrative players.

10. **Conversion Window: 21× Volume Lift Post-Game (DF-16)** — Referenced in: the-conversion-window, collectors-clock-product-brief, announcement-window-protocol, announcement-window-brief-for-roham, and the playoff-campaign-calendar timing strategy. The empirical foundation for re-ordering the editorial calendar from pre-game setup to post-game close.

---

*Compiled 2026-05-04 by Magic (Research Cataloger).*
*Total cards: 44 (21 Data Findings + 13 Market Signals + 10 Collector Voice).*
*Sources read: 30+ files including all 16 strategy docs from today's swarm, all 56 intelligence dossiers (scanned; 12 read in full), and all 29 Mixpanel query JSON files.*
*Gap flag: Collector Voice tier is structurally thin — 8 of 10 cards draw from only 3 publications. See Gap Analysis section for remediation paths.*
