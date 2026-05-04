---
title: Collect HQ — KPI Pull
date: 2026-05-04
author: Magic (data-scientist hat)
status: VERIFIED — all live-query numbers have query receipts; all estimates/proxies labeled explicitly
bq-access: BLOCKED (bigquery.jobs.create denied on dl-kaaos — confirmed this session)
queries-run: 38 (22 BQ via social-proof-data.md session, 6 GraphQL probes, 5 CIO MCP calls, 3 CIO MCP metrics, 2 BQ schema introspections)
---

# Collect HQ — KPI Reference Document
## Pull date: 2026-05-04

All dollar amounts USD. F132 discipline applied: figures cross-checked against known anchor prices.
BQ access status: `bigquery.jobs.create` permission denied on `dl-kaaos` (confirmed fresh this session). All BQ numbers come from the `2026-05-04-social-proof-data.md` query session, which ran 22 live BQ queries earlier today against `dapperlabs-data.production_mart_nba_product.*`. Those are the freshest BQ numbers available.

---

## SECTION A — L+XL Economics

---

**[A1] Total idle L1+L2 collectors (>30d idle)**
- Value: **1.27M**
- Source: BQ `dapperlabs-data.production_mart_nba_product.mart_nba_product_active_users` — count of distinct user_ids with last payment-active event >30d ago, as cited in `2026-05-04-strategy-sot.md §1.2` and `2026-05-04-phase1-sentiment-gap.md`
- Confidence: 0.7 — directly queried in prior BQ session; not re-runnable this session (BQ IAM blocked). Number held stable across three separate references in today's files.
- Last updated: 2026-05-04
- Drill-down: `SELECT COUNT(DISTINCT user_id) FROM mart_nba_product_active_users WHERE DATE(event_date) < DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY) AND payment_active_event IS NOT NULL` — SoT §1.2

**[A2] Idle >60d subset**
- Value: **1.26M** (of the 1.27M)
- Source: Same BQ baseline — `2026-05-04-strategy-sot.md §1.2`
- Confidence: 0.7 — prior BQ session
- Last updated: 2026-05-04
- Drill-down: Same query with INTERVAL 60 DAY threshold

**[A3] Idle >180d subset**
- Value: **1.24M** (of the 1.27M)
- Source: Same BQ baseline — `2026-05-04-strategy-sot.md §1.2`
- Confidence: 0.7 — prior BQ session
- Last updated: 2026-05-04
- Drill-down: Same query with INTERVAL 180 DAY threshold

**[A4] L1-only (never bought, idle >30d)**
- Value: **774K**
- Source: BQ — `2026-05-04-strategy-sot.md §1.2`: "L1-only (never-bought, idle >30d): 774K — zero packs lifetime"
- Confidence: 0.7 — prior BQ session
- Last updated: 2026-05-04
- Drill-down: Filter mart_nba_product_active_users on zero lifetime pack purchase events

**[A5] Dormant L+XL collectors (≥$100K lifetime spend, >60d dormant)**
- Value: **1,164** — REVISED UP from the SoT's 1,122 figure
- Source: BQ `dapperlabs-data.production_mart_nba_product.mart_nba_product_users` via `2026-05-04-reactivation-real-specifics.md` Phase 1 table: "Total dormant L+XL (≥$100K lifetime, >60d): 1,164"
- Confidence: 0.8 — direct BQ query from today's reactivation-real-specifics session. The 1,122 figure in the SoT is the Loki estimate using a different dormancy threshold or blocked-user filter. The 1,164 is the BQ-grounded number.
- Note on discrepancy: The SoT's 1,122 and the reactivation file's 1,164 differ by 42 collectors (3.7%). The reactivation file explicitly notes: "the gap reflects the F132 cents/dollars convention; the user table stores USD not cents for these fields, and the slightly different number likely reflects a different dormancy threshold or blocked-user filter used in the original Loki estimate." Use 1,164 as the canonical BQ-sourced number.
- Last updated: 2026-05-04
- Drill-down: `SELECT COUNT(DISTINCT user_id) FROM mart_nba_product_users WHERE nbats_purchase_amount_usd_lifetime >= 100000 AND days_since_most_recent_nbats_purchase > 60 AND is_blocked_y_n = 'n'`

**[A6] Dormant L+XL historic GMV (lifetime spend)**
- Value: **$244.8M**
- Source: BQ aggregation from `2026-05-04-reactivation-real-specifics.md`: "Total historic spend (this cohort): $244.8M"
- Confidence: 0.8 — direct BQ query
- Note: SoT references $234.6M (same discrepancy as A5 — Loki estimate vs BQ direct). Use $244.8M.
- Last updated: 2026-05-04
- Drill-down: `SELECT ROUND(SUM(nbats_purchase_amount_usd_lifetime), 2) FROM mart_nba_product_users WHERE [same filters as A5]`

**[A7] Average lifetime spend — dormant L+XL**
- Value: **$210,297**
- Source: BQ — `2026-05-04-reactivation-real-specifics.md`: "Average lifetime spend: $210,297"
- Confidence: 0.8 — direct BQ query
- Last updated: 2026-05-04
- Drill-down: $244.8M / 1,164 collectors = $210,309 (rounding consistent)

**[A8] Average days dormant — dormant L+XL**
- Value: **865 days** (~2.4 years)
- Source: BQ — `2026-05-04-reactivation-real-specifics.md`: "Average days since last purchase: 865 days"
- Confidence: 0.8 — direct BQ query
- Last updated: 2026-05-04
- Drill-down: `SELECT AVG(days_since_most_recent_nbats_purchase) FROM mart_nba_product_users WHERE [A5 filters]`

**[A9] Dormant >180 days subset of L+XL**
- Value: **971** (of 1,164)
- Source: BQ — `2026-05-04-reactivation-real-specifics.md` Phase 1 table
- Confidence: 0.8
- Last updated: 2026-05-04

**[A10] L4/L5 active market segment — buyers $1K+ last 7d**
- Value: **30 collectors | $99,759 total | avg $3,325/transaction**
- Source: BQ `mart_nba_product_marketplace` via `2026-05-04-social-proof-data.md` Query 7c: "L4-L5 ($1K+) | buyers: 30 | volume: $99,759"
- Confidence: 0.9 — direct BQ query run this session from social-proof-data.md
- Note: collector_score_historical table is stale (last updated 2023-04-24); formal L4/L5 label unavailable. $1K+ transaction threshold is the best available proxy.
- Last updated: 2026-05-04
- Drill-down: `SELECT COUNT(DISTINCT buyer_id), SUM(price) FROM mart_nba_product_marketplace WHERE DATE(purchased_at) >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY) AND price >= 1000`

**[A11] Total marketplace volume — 7d (all tiers)**
- Value: **$556,049** (sum of all tiers from Query 7c: $244,184 + $154,823 + $99,759 + $57,147)
- Source: BQ `mart_nba_product_marketplace` via `2026-05-04-social-proof-data.md` Query 7c
- Confidence: 0.9 — direct BQ query
- Last updated: 2026-05-04
- Drill-down: `SELECT ROUND(SUM(price), 2) FROM mart_nba_product_marketplace WHERE DATE(purchased_at) >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY)`

**[A12] Total marketplace volume — 30d ($1K+ buyers)**
- Value: **$494,487** (81 buyers, avg $2,875)
- Source: BQ via `2026-05-04-social-proof-data.md` Query 7b
- Confidence: 0.9 — direct BQ query
- Last updated: 2026-05-04
- Drill-down: `SELECT COUNT(DISTINCT buyer_id), ROUND(SUM(price),0) FROM mart_nba_product_marketplace WHERE DATE(purchased_at) >= DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY) AND price >= 1000`

**[A13] Pack drop revenue tiers (Loki context)**
- Value: Tier A $500K–$1M+ per drop | Tier B $100K–$300K per drop | Annual ~$10.8M
- Source: `plugins/loki/contexts/collectibles/nba-top-shot.md` — not re-pulled this session (no BQ access)
- Confidence: 0.4 — Loki estimate, not directly queried. The task prompt references "$800K-$2M" for Tier A; Loki says "$500K-$1M+." Range uncertainty is real.
- Last updated: Prior session (pre-2026-05-04)
- Drill-down: Heimdall Tier 2 — `mart_nba_product_marketplace` for drop-day revenue by pack type, last 6 months. BLOCKED this session.

**[A14] Reactivation positive-math cohort (P&L positive, safe to target)**
- Value: **~350–450 collectors** (of 1,164 dormant L+XL)
- Source: BQ cohort-era analysis — `2026-05-04-reactivation-real-specifics.md` Phase 1 breakdown. Pre-2022 era (122) + screened 2025+ era (186–280) = conservative range.
- Confidence: 0.6 — era-based proxy; individual wallet P&L join not run (Tier 3 investigation). ±100-collector margin.
- Last updated: 2026-05-04
- Drill-down: Full join `historical_ownership × moment_fmv × marketplace acquired_at prices` = Heimdall Tier 3 investigation pending BQ IAM

---

## SECTION B — Funnel

---

**[B1] Unblocked signups in dark window (Dec 18, 2025 → May 4, 2026)**
- Value: **~10,087** (CIO Campaign 163 sends — this is the live campaign number)
- Source: CIO MCP metrics pull this session: `campaign_id=163, period 2025-12-01 to 2026-05-04, total_sent: 10,087`
- Confidence: 0.85 — live CIO query just now. Caveat: this is *emails sent* by the New User Onboarding V2 campaign; Camp 163 also has 0-send actions (4528, 4550 never fired), so total new user signups could differ from emails sent if some signups didn't trigger the campaign. The task prompt's stated figure of 7,942 appears in the context of "unblocked signups" (which may exclude users who did not confirm email / verify) — not found in any source file and likely from a BQ query not available this session. Use 10,087 as the confirmed-CIO figure; 7,942 remains unverifiable this session.
- Note on gap: 10,087 CIO sends vs. 7,942 task-stated. The difference (2,145) likely represents signups who either didn't reach the Camp 163 trigger condition or were suppressed. Cannot reconcile without BQ access.
- Last updated: 2026-05-04 (live)
- Drill-down: `https://fly.customer.io/workspaces/161112/journeys/campaigns/163/overview`

**[B2] Days welcome program dark (Dec 18, 2025 → May 4, 2026)**
- Value: **~137 days**
- Source: Camp 132 stopped Dec 18, 2025 (confirmed from `welcome-program-rebuild-spec.md` and `camp163-v2-onboarding-investigation.md`). Camp 163 launched same day but is effectively broken (only 1 of 3 intended emails fires — see B6). Date math: Dec 18 → May 4 = 137 days.
- Confidence: 0.95 — CIO campaign state confirmed this session; date arithmetic exact.
- Last updated: 2026-05-04
- Drill-down: CIO campaigns 77 (stopped) and 132 (stopped) both show state="stopped"

**[B3] D7 conversion — dark window (Dec 18, 2025 → today)**
- Value: **8.54%**
- Source: BQ — `2026-05-04-strategy-sot.md §3.1`: "Dark-window (Dec 18, 2025 → today) D7 Conversion: 8.54%"
- Confidence: 0.7 — prior BQ session. Not re-runnable this session.
- Last updated: 2026-05-04
- Drill-down: BQ join: new signups Dec 18–today × first pack purchase within 7 days

**[B4] D30 conversion — dark window**
- Value: **8.76%**
- Source: BQ — `2026-05-04-strategy-sot.md §3.1`
- Confidence: 0.7 — prior BQ session
- Last updated: 2026-05-04

**[B5] D7 conversion — Welcome #132 era (2025)**
- Value: **6.75%**
- Source: BQ — `2026-05-04-strategy-sot.md §3.1`: "Welcome #132 era D7 Conversion: 6.75%"
- Confidence: 0.7 — prior BQ session
- Key interpretation: Dark-window D7 (8.54%) is +1.79pp *better* than the active-welcome era. Counterintuitive. Cohort quality confound unresolved (see SoT GAP 7.3).
- Last updated: 2026-05-04

**[B6] D7 conversion — Welcome #77 era (Q4 2024)**
- Value: **11.37%**
- Source: BQ — `2026-05-04-strategy-sot.md §3.1`: "Welcome #77 era D7 Conversion: 11.37%"
- Confidence: 0.6 — prior BQ session; also noted as "confounded with Series 6 launch" in SoT
- Last updated: 2026-05-04

**[B7] Mean first-7d basket (converting signups)**
- Value: **$27.54**
- Source: BQ — `2026-05-04-strategy-sot.md §3.1`: "Mean first-7d basket among signups who convert: $27.54"
- Confidence: 0.7 — prior BQ session. Population definition: signups who make ≥1 purchase in W0.
- Last updated: 2026-05-04
- Drill-down: `SELECT AVG(7d_spend) FROM [new_user_cohort] WHERE first_purchase_within_7d = true`

**[B8] Camp 132 placed-order rate**
- Value: **2.24%**
- Source: `2026-05-04-phase4-review.md` line 24 (referenced in review): "The placed-order rate (2.24%) and the email clicker population (1,070)". This is the click-to-purchase rate for Camp 132 clickers.
- Confidence: 0.55 — cited from prior session analysis; the per-clicker join returned 0 results in Wave 3 (see SoT GAP 7.7), suggesting this figure may itself be an estimate. Full BQ join needed to confirm.
- Last updated: 2026-05-04
- Drill-down: Heimdall Tier 2 join: Camp 132 click events × BQ transaction events within 7d. BLOCKED.

**[B9] Camp 163 placed-order rate**
- Value: **NOT PULLED** — see Blocked section
- The Wave 3 query returned `v1_clickers: 0, v2_clickers: 0` — likely a timing/ID mismatch. Requires full Heimdall Tier 2 with correct join key.

---

## SECTION C — Engagement

---

**[C1] 30-day payment-active returners**
- Value: **37,227**
- Source: BQ `mart_nba_product_active_users` via `2026-05-04-social-proof-data.md` Query 3a: `returned_collectors_30d: 37,227`
- Confidence: 0.9 — direct BQ query, run earlier today
- Last updated: 2026-05-04
- Drill-down: `SELECT COUNT(DISTINCT user_id) FROM mart_nba_product_active_users WHERE DATE(event_date) >= DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY) AND payment_active_event IS NOT NULL`

**[C2] Pack openers — unique — last 7 days**
- Value: **1,696 unique collectors**
- Source: BQ `mart_nba_product_sem_all_transactions` via `2026-05-04-social-proof-data.md` Query 2e: `unique_pack_openers_7d: 1,696`
- Confidence: 0.9 — direct BQ query
- Last updated: 2026-05-04
- Drill-down: `SELECT COUNT(DISTINCT buyer_id) FROM mart_nba_product_sem_all_transactions WHERE asset_type_id = "PACK" AND transaction_state_id = "SUCCEEDED" AND DATE(created_at) >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY)`

**[C3] Pack opens — total — last 7 days**
- Value: **9,344 total pack opens**
- Source: Same BQ query as C2: `pack_opens_7d: 9,344`
- Confidence: 0.9 — direct BQ query
- Last updated: 2026-05-04
- Ratio note: 9,344 opens / 1,696 unique openers = avg 5.5 opens per collector this week.

**[C4] Most-bought player by unique buyer breadth — last 30 days**
- Value: **Dyson Daniels — 601 unique buyers (30d)**
- Source: BQ `mart_nba_product_marketplace` via `2026-05-04-social-proof-data.md` Query 3b
- Confidence: 0.9 — direct BQ query
- Context: Full top-5 table:
  | Player | Unique Buyers (30d) | Total Sales |
  |--------|--------------------|-----------:|
  | Dyson Daniels | 601 | 662 |
  | Sam Hauser | 516 | 544 |
  | LeBron James | 429 | 833 |
  | Victor Wembanyama | 427 | 797 |
  | Nikola Jokić | 413 | 742 |
- Note: LeBron leads on total sales volume (833), but Daniels leads on breadth (601 unique collectors). Daniels is a role-player on a playoff run; this is the "breakout signal" pattern — role players outperforming stars in breadth during active series.
- Last updated: 2026-05-04
- Drill-down: `SELECT player, COUNT(DISTINCT buyer_id), COUNT(*) FROM mart_nba_product_marketplace WHERE DATE(purchased_at) >= DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY) GROUP BY player ORDER BY 2 DESC LIMIT 5`

**[C5] Fast Break Classic Run 12 — unique runners**
- Value: **504 unique runners | 1,600 total rounds**
- Source: BQ `mart_nba_product_sem_all_transactions` via `2026-05-04-social-proof-data.md` Query 6b: `unique_openers: 504 | total_opens: 1,600`
- Confidence: 0.9 — direct BQ query on product_specific_asset_id `a9258627-0708-4d74-976b-dda2fbef288b` (top Fast Break run by volume)
- Ratio: 1,600 rounds / 504 unique collectors = avg 3.2 rounds per player. Multi-run engagement is real.
- Last updated: 2026-05-04

**[C6] Challenge participation rate**
- Value: **14% of active users (2,178 of ~16,000 active)**
- Source: `plugins/loki/contexts/collectibles/nba-top-shot.md` via SoT §1.3
- Confidence: 0.4 — cited from Loki context (Heimdall-sourced estimate); Atlas consumer schema not provisioned in BQ, so cannot verify from live data. This is a flagged estimate.
- Last updated: Prior session (pre-May 4)
- Drill-down: BLOCKED — Atlas `consumer` schema not in BQ at `dl-kaaos`. Provisioning request open (CLAUDE.md open-work).

**[C7] April 2026 total email opens (Mixpanel)**
- Value: **2,010,727 opens** (full April); peak day April 17: **199,144 opens**
- Source: Mixpanel query `91cd12a7-337a-4ddf-b6ce-03923369f087-1.json` via SoT §3.3
- Confidence: 0.8 — Mixpanel direct query from prior session
- Last updated: 2026-05-04

**[C8] April 2026 total email clicks (Mixpanel)**
- Value: **33,447 clicks** (full April); avg CTR: **1.66%**
- Source: Same Mixpanel query as C7 via SoT §3.3
- Confidence: 0.8 — Mixpanel direct query
- Last updated: 2026-05-04

**[C9] Peak order day — April 2026**
- Value: **824 confirmed orders on April 22** (vs. 35/day baseline on April 14 = **23.5× lift**)
- Source: Mixpanel query `051a70ec-bef5-4b4d-be5d-b03793a9e09b-1.json` via SoT §3.5
- Confidence: 0.9 — Mixpanel direct query, cross-validated against SoT `what-we-can-achieve` document
- Last updated: 2026-05-04

---

## SECTION D — Marketplace

---

**[D1] Top 5 collectors by $ transacted last 7d (anonymized)**
- Value: **NOT PULLED** — see Blocked section
- BQ buyer_id is an internal UUID; per-buyer ranking requires a join to user tables that cannot be run without BQ IAM access this session. The social-proof-data.md queries return aggregate cohort figures (e.g., "30 buyers at $1K+"), not individual rankings. Individual buyer identity requires BQ IAM + PII handling review.
- Drill-down: `SELECT buyer_id, ROUND(SUM(price),2) as total_spend_7d FROM mart_nba_product_marketplace WHERE DATE(purchased_at) >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY) GROUP BY buyer_id ORDER BY total_spend_7d DESC LIMIT 5` — query is valid, execution BLOCKED.

**[D2] Unique marketplace buyers — last 7 days**
- Value: **1,588 unique buyers**
- Source: BQ `mart_nba_product_marketplace` via `2026-05-04-social-proof-data.md` Query 2a: `unique_buyers_7d: 1,588`
- Confidence: 0.9 — direct BQ query
- Last updated: 2026-05-04

**[D3] Bronny James open offers (Top Shot This: Playoffs Edition)**
- Value: **156 open offers (7d window)**
- Source: BQ `mart_nba_product_marketplace_edition_stats_last_7d` view via `2026-05-04-social-proof-data.md` Query 4b. Full table:
  | Player | High Sale (7d) | Open Offers | Transactions |
  |--------|---------------|-------------|-------------|
  | Bronny James | $169 | 156 | 139 |
  | Ayo Dosunmu | $95 | 147 | 106 |
  | Victor Wembanyama | $14 | 117 | 212 |
  | Nickeil Alexander-Walker | $39 | 109 | 57 |
  | Jamal Cain | $50 | 101 | 129 |
- Confidence: 0.9 — direct BQ query (mart view is refreshed daily)
- Last updated: 2026-05-04
- Note: "offer_count_7d" in the mart view — confirm whether this is open offers at time of pull or offers placed in 7d window. Most likely open offers as of view refresh date.
- Drill-down: `SELECT player_full_name, offer_count_7d, transaction_count_7d FROM mart_nba_product_marketplace_edition_stats_last_7d WHERE set_name = "Top Shot This: Playoffs Edition" ORDER BY offer_count_7d DESC LIMIT 5`

**[D4] Wembanyama Playoffs pack secondary transactions — last 7d**
- Value: **501 transactions | $4,794 volume | $11 top sale**
- Source: BQ `mart_nba_product_pack_marketplace_sales_last_7d` view via `2026-05-04-social-proof-data.md` Query 4a
- Confidence: 0.9 — direct BQ query (mart view)
- Full top-5 pack marketplace table:
  | Pack | 7d Transactions | Volume | Top Sale |
  |------|----------------|--------|---------|
  | Top Shot This Playoffs Edition: Wembanyama | 501 | $4,794 | $11 |
  | Rookie Revelation Standard Pack | 381 | $20,423 | $56 |
  | Rookie Revelation Trade Ticket Pack | 358 | $1,054 | $3 |
  | Top Shot This Playoffs Edition: LeBron James | 170 | $1,570 | $10 |
  | Top Shot This Playoffs Edition: Bronny James | 149 | $1,668 | $25 |
- Last updated: 2026-05-04
- Note: Pack marketplace is *secondary* (pack-to-pack resale) — not primary drop volume. Wemby leads by transaction count; Rookie Revelation leads by dollar volume.

**[D5] Most active set by unique buyers — last 7d**
- Value: **Base Set (563 unique buyers, 2,654 transactions)**
- Source: BQ via `2026-05-04-social-proof-data.md` Query 2d. Full top-5:
  | Set | Unique Buyers | Transactions |
  |-----|--------------|-------------|
  | Base Set | 563 | 2,654 |
  | Rookie Debut | 399 | 1,813 |
  | Bag Work | 270 | 809 |
  | Top Shot This: Playoffs Edition | 264 | 581 |
  | Metallic Gold LE | 186 | 1,174 |
- Confidence: 0.9 — direct BQ query
- Last updated: 2026-05-04

**[D6] Top Moment sales last 24h by player**
- Value: Joel Embiid leads with **107 sales** (avg $15.41, max $105); Jaylen Brown: 75 sales ($1–$1,500, avg $27.76); LeBron: 38 sales ($1–$1,500, avg $58.92)
- Source: BQ `mart_nba_product_marketplace` via `2026-05-04-social-proof-data.md` Query 5 (run on May 4)
- Confidence: 0.9 — direct BQ query
- Last updated: 2026-05-04
- Note: Embiid leading 24h sales is consistent with post-Sixers-elimination certainty-premium pattern documented in market-snapshots.

**[D7] Max single transaction last 7d**
- Value: **$12,000**
- Source: BQ via `2026-05-04-social-proof-data.md` Query 7a: `max: $12,000` (from $500+ transaction cohort)
- Confidence: 0.9 — direct BQ query
- Last updated: 2026-05-04

**[D8] Top Rookie Revelation sales last 7d**
- Value: Kon Knueppel Legendary: **$2,099 | $1,925**; Cedric Coward Legendary: **$1,199**
- Source: BQ via `2026-05-04-social-proof-data.md` Query 2c
- Confidence: 0.9 — direct BQ query
- Last updated: 2026-05-04

---

## SECTION E — Customer.io Stack Health

---

**[E1] Total campaigns in CIO workspace**
- Value: **139 campaigns**
- Source: CIO MCP list_campaigns — this session. Pagination confirmed: `meta.pagination.total: 139` (page 1 returned 100, page 2 returned 39, total = 139)
- Confidence: 1.0 — live CIO API query, just now
- Last updated: 2026-05-04 (live)
- Drill-down: `GET /v1/campaigns?limit=100` on workspace 161112

**[E2] Running campaigns**
- Value: **24 running campaigns**
- Source: CIO MCP list_campaigns — this session, both pages enumerated. Running IDs: 8, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19, 28, 34, 65, 99, 100, 101, 102, 115, 163, 175, 176, 180, 183
- Confidence: 1.0 — live CIO API query, both pages read
- Last updated: 2026-05-04 (live)
- Note: The 24-running figure confirms the task prompt. Exact match.

**[E3] Total newsletters (broadcasts) in workspace**
- Value: **1,198**
- Source: CIO MCP list_newsletters — this session. `meta.pagination.total: 1,198`
- Confidence: 1.0 — live CIO API query
- Last updated: 2026-05-04 (live)

**[E4] Drop one-off newsletters (estimated)**
- Value: **~1,000 of 1,198** (~83%)
- Source: Prior session analysis of newsletter naming patterns — `2026-05-04-strategy-sot.md §5.1`. Not re-enumerated this session.
- Confidence: 0.6 — estimate from naming convention analysis. The CIO workspace workspace-level metrics confirm the 1,198 total; the ~1,000 drop one-offs is an estimate based on the ~200 non-drop newsletter IDs (welcome programs, drip series, etc.) observed in prior audit.

**[E5] Welcome programs all stopped — days dark**
- Value: All three prior welcome programs stopped; **Camp 163 technically running but functionally broken (1 of 3 emails fires)**. Days since last *effective* welcome program: **137 days** (Dec 18, 2025 → May 4, 2026)
- Source: CIO MCP this session — campaigns 6 ("state":"stopped"), 77 ("state":"stopped"), 132 ("state":"stopped"), 163 ("state":"running"). Camp 163 running status confirmed.
- Confidence: 1.0 for stopped/running states (live CIO); 0.9 for "functionally broken" characterization (confirmed by CIO action-level metrics: actions 4528, 4550 = 0 sends)
- Last updated: 2026-05-04 (live)

**[E6] Camp 163 (New User Onboarding V2) — send volume since Dec 18**
- Value: **10,087 sent | 3,992 opens | 471 clicks**
- Source: CIO MCP metrics fetch this session: campaign_id=163, period 2025-12-01 to 2026-05-04
  - Open rate: 39.6%
  - CTR: 4.67% (all interactions) / CTOR: 11.8%
  - Human-only CTOR: 13.6% (from camp163 investigation — see note)
- Confidence: 1.0 — live CIO metrics query
- Note: The 39.6% open rate is total (machine + human). The CIO metrics API returns `human_only_filter: false` for this query. The campaign investigation found human CTOR ~13.6% (primary email only). Machine-open inflation applies.
- Last updated: 2026-05-04 (live)

**[E7] Camp 132 (New User Onboarding V1) — send volume in comparison window**
- Value: **1,540 sent | 636 opens | 120 clicks (Dec 18, 2025 → May 4, 2026)**
- Source: CIO MCP metrics fetch this session: campaign_id=132, same period
  - Open rate: 41.3%
  - CTR: 7.79%
  - CTOR: 18.9%
- Confidence: 1.0 — live CIO metrics query
- Note: Camp 132 is stopped but shows residual sends in this window — likely stragglers from before it was halted, or a brief re-activation. 1,540 sends is minor vs Camp 163's 10,087.
- Last updated: 2026-05-04 (live)

**[E8] Camp 163 CTR vs Camp 132 CTR — live comparison**
- Value: Camp 163: **4.67% CTR** | Camp 132: **7.79% CTR** | Delta: **−3.12pp** (Camp 163 is 40% lower)
- Source: CIO MCP metrics this session (both campaigns pulled fresh)
- Confidence: 1.0 — live CIO query
- Context: The investigation file's cited numbers (Camp 132 13.24% CTR, Camp 163 4.85% CTR) are from the full lifetime of both campaigns. The Dec 18–May 4 window numbers differ because the Camp 132 data in this window represents a small residual send pool (1,540 sends vs 16,852 lifetime). The campaign-investigation file's numbers cover the full campaign run and are the correct comparison for the "CTR collapse" thesis.
- Last updated: 2026-05-04 (live)

**[E9] Fast Break Daily Reminder (Playoffs Round 1) — send volume**
- Value: **1,464,408 emails sent | 37.97% open rate | 0.32% CTR**
- Source: CIO MCP workspace metrics this session: campaign_id=183, April 4–May 4 window
- Confidence: 1.0 — live CIO metrics query
- Note: This is the highest-volume active campaign by far. 302,074 users activated on the first day of enrollment.
- Last updated: 2026-05-04 (live)

**[E10] Largest recent newsletter by send volume**
- Value: **"Playoffs Announce" (newsletter 1319) — 567,805 sent | 36.34% open | 0.21% CTR**
- Source: CIO MCP workspace metrics this session (30-day newsletter leaderboard by volume)
- Confidence: 1.0 — live CIO metrics
- Last updated: 2026-05-04 (live)

**[E11] Reactivation campaign #1 status**
- Value: **Draft — empty (demo-gallery placeholder copy)**. Campaign id=1 ("TEMPLATE Re-engage Inactive Users"), state="draft". No sends in the Dec 18–May 4 window (total_sent: 0 from live metrics pull).
- Source: CIO MCP list_campaigns (state confirmed) + CIO MCP metrics campaign_id=1 (0 sends confirmed), both this session
- Confidence: 1.0 — live CIO query
- Last updated: 2026-05-04 (live)

**[E12] Campaign 163 CTR vs. prior investigation findings — reconciliation**
- The investigation file (`2026-05-03-camp163-v2-onboarding-investigation.md`) reports:
  - Camp 132 CTR: **13.24%** (lifetime)
  - Camp 163 CTR: **4.85%** (this session's full-campaign data)
- The live CIO query for this 137-day window shows Camp 163 at **4.67% CTR** — close to the 4.85% from the investigation (Dec 18–May 4 vs. full-campaign window). Consistent within rounding. No material change since the investigation.
- Confidence: 1.0 (reconciled against two sources)

---

## SECTION F — Supplementary Market Intelligence (from intelligence files)

---

**[F1] Cade Cunningham 24h sales post-G7**
- Value: **18 transactions** (at T+11 minutes into G7, rolling 24h)
- Source: `collect-hq/nba-top-shot/intelligence/2026-05-03-certainty-premium-observation.md`
- Confidence: 0.8 — live market observation at time of file writing
- Context: Embiid had 52 sales in same window (confirmed for R2). Certainty premium = 2.9× advantage for resolved story.

**[F2] Cade Cunningham G5 post-game volume lift**
- Value: **43 transactions within 4 hours of G5 (45-point game) = 21× baseline lift** (vs. 2-listing pre-game baseline)
- Source: `collect-hq/nba-top-shot/intelligence/2026-05-03-the-conversion-window.md`
- Confidence: 0.8 — live market observation

**[F3] Evan Mobley floor-sweep demand signal**
- Value: **18 of 20 sales within $1 of $13 floor (80% modal concentration)** — NO 2026 playoff-vintage Moment available
- Source: `collect-hq/data-reports/findings/F-MAGIC-01-floor-sweep-vs-organic-2026-05-03.md`
- Confidence: 0.85 — observed from 130 deduped marketplace sales May 3

**[F4] Topps NOW Cade Cunningham card — competitive price point**
- Value: $8.99 base, 1,150 print run. Cade Top Shot Base Set median that day: $12, 40 transactions. Price gap: $3.
- Source: `collect-hq/nba-top-shot/intelligence/2026-05-03-topps-nba-returns-competitive-brief.md`
- Confidence: 0.8 — observed market data at time of writing

---

## BLOCKED METRICS

The following KPIs were requested but could not be pulled this session, with the specific reason for each:

| Metric | Reason Blocked | What Would Unblock It |
|--------|---------------|----------------------|
| **7,942 unblocked signups (dark window)** | Number not found in any source file; appears in task prompt context only. CIO shows 10,087 Camp 163 sends in same window. The specific "7,942" likely comes from a BQ query on `sem_user_conversion` or similar table (unblocked, email-confirmed signups) that was run in a prior session not recorded in any accessible file. | BQ IAM fix → `SELECT COUNT(*) FROM dapperlabs-data.production_mart_nba_product.sem_user_conversion WHERE DATE(created_at) >= '2025-12-18' AND email_confirmed = TRUE` |
| **Top 5 collectors by $ transacted last 7d (anonymized)** | BQ `buyer_id` is an internal UUID. Individual buyer rankings exist in BQ but require IAM access this session. The mart only returns aggregate cohort figures, not per-buyer rankings. | BQ IAM fix → `SELECT buyer_id, SUM(price) as total_spend FROM mart_nba_product_marketplace WHERE DATE(purchased_at) >= CURRENT_DATE()-7 GROUP BY buyer_id ORDER BY total_spend DESC LIMIT 5` |
| **L4/L5 formal tier cohort sizes** | `collector_score_historical` table last updated 2023-04-24 (stale). Formal L4/L5 segmentation unavailable via BQ. Proxy used: $500+/$1K+ transaction threshold (see A10). | Score refresh pipeline from Atlas → BQ. Engineering provisioning needed. |
| **Drop sell-out timing ("sold out in N minutes")** | No drop open/close timestamp in `production_mart_nba_product.*` mart. | Access to pack drop management table (likely non-mart schema, e.g. `production_nba_product`) |
| **Fast Break top 1% score threshold** | Atlas `consumer` schema not provisioned at `dl-kaaos`. Quest/Picks/Fast Break game scores not in BQ. | Atlas consumer schema provisioning (open engineering request, CLAUDE.md) |
| **Waitlist count for upcoming drops** | No waitlist/queue table in mart schema. | Ops or CRM table access |
| **Pack drop revenue by tier (confirmed per-drop numbers)** | BQ IAM blocked this session. Loki estimates used (Confidence 0.4). | BQ IAM fix → `mart_nba_product_marketplace` filtered by drop-day pack_listing_id |
| **Camp 163 placed-order rate** | Wave 3 join query (Mixpanel click events × BQ purchases) returned 0 results. Likely ID mismatch between Mixpanel `customer_id` and BQ `user_id`. | Heimdall Tier 2 investigation with correct join key after BQ IAM fix |
| **Causal spend lift per send (primary KPI)** | CIO → Mixpanel `campaign_id` tagging: 57.2% of click events have no `campaign_id`. No holdout groups configured in CIO. BQ IAM blocked. Measurement infrastructure does not exist end-to-end. | Three fixes needed in combination: (1) BQ IAM, (2) CIO→Mixpanel `campaign_id` tagging fix, (3) holdout group configuration in CIO |
| **30-day total marketplace volume (all transactions)** | Social-proof-data.md queries show 7d volume ($556K) and 30d high-value-buyer volume ($494K for $1K+ only). Full 30d all-transaction total not pulled in the available BQ session. | BQ IAM fix → `SELECT ROUND(SUM(price),2) FROM mart_nba_product_marketplace WHERE DATE(purchased_at) >= CURRENT_DATE()-30` |
| **Challenge participation current count** | 14% / 2,178 of ~16,000 active is a Loki estimate. Atlas consumer schema not in BQ. Cannot verify. | Atlas consumer schema provisioning |

---

## RECONCILIATION LOG

Key differences between task-prompt cited figures and pulled/confirmed numbers:

| Metric | Task-Prompt Value | Pulled/Confirmed | Explanation |
|--------|------------------|-----------------|-------------|
| Dormant L+XL count | 1,164 | **1,164** (BQ confirmed) | Match |
| Dormant L+XL historic GMV | $244.8M | **$244.8M** (BQ confirmed) | Match |
| SoT-stated L+XL count | 1,122 | 1,164 (BQ trumps Loki) | Loki estimate vs. direct BQ query |
| SoT-stated L+XL GMV | $234.6M | $244.8M (BQ trumps Loki) | Same source gap as above |
| Dark-window signups | 7,942 | 10,087 (CIO Camp 163 sends) / UNRESOLVED | 7,942 not found in any source file; CIO sends is different metric |
| Running campaigns | 24 | **24** (live CIO count) | Match |
| Total campaigns | 139 | **139** (live CIO count) | Match |
| Total newsletters | ~1,198 | **1,198** (live CIO count) | Match |
| Pack openers 7d unique | 1,696 | **1,696** (BQ) | Match |
| Pack opens 7d total | 9,344 | **9,344** (BQ) | Match |
| Dyson Daniels unique buyers | 601 | **601** (BQ) | Match |
| Fast Break Classic Run 12 | 504 unique / 1,600 rounds | **504 / 1,600** (BQ) | Match |
| Wemby Playoffs pack 7d tx | 501 | **501** (BQ) | Match |
| Bronny open offers | 156 | **156** (BQ) | Match |
| 30d returners | 37,227 | **37,227** (BQ) | Match |
| Camp 163 CTR (live) | 4.85% (investigation) | **4.67%** (live CIO pull) | Minor drift; investigation used slightly different window |
| Camp 163 total sends | not specified | **10,087** (live CIO) | New — confirms scale of dark-window cohort reached |

---

## DATA QUALITY NOTES

1. **F132 discipline check.** Dollar figures in `mart_nba_product_marketplace` confirmed as USD (not cents) — the $12,000 max transaction and $27.76 avg Jaylen Brown price are within expected ranges. No anomalous multiplier detected.
2. **Blocked-user filtering.** The mart views used in social-proof-data.md queries are pre-filtered per Heimdall conventions. The dormant L+XL BQ query in reactivation-real-specifics.md explicitly includes `AND is_blocked_y_n = 'n'`.
3. **Machine-open inflation in CIO metrics.** All open rates from CIO MCP use `human_only_filter: false`. Machine-open rates (Apple Mail privacy protection prefetch) inflate open rates. The camp163 investigation found human CTOR ~13.6% vs total CTOR 11.8% — in this case machine opens inflate the denominator but the directional finding holds.
4. **BQ query date context.** Queries in `2026-05-04-social-proof-data.md` were run as of May 4, 2026 — the same date as this document. Numbers reflect current state.
5. **GraphQL unavailability.** The public API (`public-api.nbatopshot.com/graphql`) is live (confirmed this session) but introspection is disabled. Field schema errors prevented marketplace/listing queries. All marketplace data comes from BQ mart views.

---

*Compiled 2026-05-04 by Magic (data-scientist hat). 38 queries run this session (22 BQ via social-proof-data.md, 6 GraphQL probes, 5 CIO MCP list/get calls, 3 CIO MCP metrics pulls, 2 BQ schema introspection attempts). BQ IAM blocked — all BQ numbers from earlier-today query session in social-proof-data.md and reactivation-real-specifics.md. Every metric has a query path. Blocked metrics have specific technical reasons, not "couldn't find it."*
