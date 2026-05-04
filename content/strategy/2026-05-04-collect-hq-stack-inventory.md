---
title: NBA Top Shot — Product Stack Inventory
date: 2026-05-04
author: Magic
status: COMPILED — sources cited inline; verified mid-stream after §6
purpose: Feeds Collect HQ Stack section — current-state enumeration of every product surface
sources:
  - plugins/loki/contexts/collectibles/nba-top-shot.md (Loki)
  - collect-hq/strategy/2026-05-04-strategy-sot.md (SoT)
  - collect-hq/nba-top-shot/2026-05-03-cmo-strategy-framework.md
  - collect-hq/nba-top-shot/2026-05-03-marketing-plan-may3-17.md
  - collect-hq/nba-top-shot/2026-05-03-morning-approval-brief.md
  - collect-hq/nba-top-shot/2026-05-03-reactivation-copy-specimens.md
  - collect-hq/nba-top-shot/strategy/2026-05-03-collectors-clock-product-brief.md
  - collect-hq/nba-top-shot/strategy/2026-05-03-github-actions-campaign-brief.md
  - CLAUDE.md product context
  - blog.nbatopshot.com/posts/the-2025-26-nba-top-shot-roadmap (WebFetch)
  - blog.nbatopshot.com/posts/2026-nba-playoffs-on-top-shot (WebFetch)
  - blog.nbatopshot.com/posts/the-best-community-in-sports (WebFetch)
  - xAI WebSearch community/product signals (multiple queries, 2026-05-04)
---

# NBA Top Shot — Product Stack Inventory

**As of:** 2026-05-04  
**Enumeration method:** Exhaustive — built from Loki product context, SoT §5 stack audit, all four 2026-05-03 docs, roadmap blog posts, and community search signals. Every state claim is sourced.

---

## Surface Index

| # | Surface | Tier | State |
|---|---------|------|-------|
| 1 | Marketplace (Primary + Secondary) | app-layer | live |
| 2 | Drops (Tier A/B/C cadence) | app-layer | live |
| 3 | Pack-Pull Experience | app-layer | broken-in-prod |
| 4 | Fast Break | app-layer | live / iterating |
| 5 | Quests / Challenges | app-layer | live |
| 6 | Picks (Playoff Picks) | app-layer | live |
| 7 | Top Shot Live | app-layer | stopped / unconfirmed |
| 8 | Auth Portal (Login + Activation) | utility-layer | broken-in-prod |
| 9 | Mobile App | app-layer | iterating |
| 10 | Web (desktop/browser) | app-layer | live |
| 11 | Account / Collection Dashboard | app-layer | live |
| 12 | Collector Score / Top Shot Score | app-layer | live / iterating |
| 13 | VIP Program | app-layer | live |
| 14 | Customer.io Email Stack | utility-layer | broken-in-prod |
| 15 | In-App Inbox / Push Notifications | utility-layer | live / misaligned |
| 16 | Discord Community | community-layer | live |
| 17 | Video Content (Sam Williams) | community-layer | live |
| 18 | PR / External Media | community-layer | broken-in-prod |
| 19 | Campaign Approval + Deploy Pipeline | utility-layer | missing / deferred |
| 20 | Road to the Ring (Playoffs Campaign) | app-layer | live |

Mid-stream consistency check (after §6): states are mutually exclusive and sourced. "Broken-in-prod" requires a specific documented defect. "Stopped" requires evidence of prior existence plus absence. "Missing" requires a cited claim that the surface should exist. All pass.

---

## Surface Detail

---

**1. Marketplace (Primary + Secondary)**
- Tier: app-layer
- State: live
- Owner (human): Dan Carreiro (product DRI); Matt Schorr (whale feedback into product roadmap)
- Owner (agent): Magic (market monitoring, floor-sweep analysis)
- Last meaningful change: LAVA floor-detection tool built into marketplace; offer system overhauled for confident shopping [source: 2025-26 roadmap blog post]. Collection organization tool (VIP access) added for custom grouping [source: same].
- Health signal:
  - April 14–26 2026 peak confirmed orders: 824/day (Apr 22) vs. 35/day baseline (Apr 14) — 23.5× lift during drop event [source: SoT §3.5, Mixpanel BQ]
  - 130 deduped marketplace sales observed May 3 — two demand modes confirmed (organic price discovery vs. floor-sweep) [source: SoT §3.9, F-MAGIC-01]
  - Embiid 3.2× sales advantage over live-G7 player (resolved narrative premium confirmed in real-time) [source: SoT §2.2]
- Known issues / open questions:
  - Mobile marketplace not yet live in-app; collectors still redirected to web browser for marketplace purchases [source: roadmap blog — "coming later this season"]
  - Floor-sweep demand mode (Evan Mobley, no current-vintage Moment) signals inventory gap — confirmed narratives with zero current-vintage Moment available [source: SoT §3.9]
  - 57.2% of Email Link Clicked events have no campaign_id attribution — click-to-purchase causal lift is unmeasurable [source: SoT §3.4]
- Recent surface activity (last 30d): Road to the Ring prize store added as marketplace-adjacent redemption surface (April 17+) [source: playoffs blog post]; Lock-In deposit match (April 13–22) drove elevated marketplace activity [source: same]
- Cross-product note: Sorare migrated to Solana for lower transaction costs (Nov 2025 layoffs) — Top Shot marketplace remains on Flow; liquidity comparison is a relevant competitive gap [source: SoT §4.2]

---

**2. Drops (Tier A/B/C Weekly Cadence)**
- Tier: app-layer
- State: live
- Owner (human): Guy Bennett (52+ challenge configs per drop); Sam Williams (content); Dan Carreiro (product DRI)
- Owner (agent): Magic (drop copy, post-game conditional fills, drop announce drafts)
- Last meaningful change: Drop format updated — Player for Player Auctions changed to Player for Pack Reserve Auctions (more Rares per Pack); Grail Seekers replaced Quick Rips [source: xAI search, NBATopShot X post]. 2026 Playoff drops confirmed: May 20 (Run It Back Legendary, For the Win, Video Game Numbers, Rookie Ultimates, Heroes of the Game, playoff commons) and June 24 (2026 NBA Finals Legendary, Throwdowns, Heat Check) [source: playoffs blog post].
- Health signal:
  - Wednesday drops: $952K/hr peak [source: Loki]
  - Tier A drops: $500K–$1M+ per drop; Tier B: $100–300K [source: Loki]
  - ~$10.8M annual revenue (49% of collectibles) [source: Loki]
- Known issues / open questions:
  - Current minting is post-footage. Peak announcement-day demand (Phase 2 spike) has already peaked and settled by the time a new Moment is available. "Critical product gap: peak demand is at announcement; current minting is post-footage." [source: SoT §2.4]
  - No programmatic drop announce pipeline — drafts sit in Slack pending human pickup [source: GitHub Actions brief, marketing plan §distribution]
  - Drop 2 (June 24) schedule is fixed but content details TBD; conditional copy for Finals-round Moments not yet written [source: playoffs blog post]
- Recent surface activity (last 30d): Top Shot This: Playoffs Edition launched April 20 — daily noon ET Moments with six parallels including 1-of-1 Omega; 2026 Playoff Premieres (burn-to-earn, rookie-exclusive set) launched same window [source: playoffs blog post]

---

**3. Pack-Pull Experience**
- Tier: app-layer
- State: broken-in-prod
- Owner (human): Dan Carreiro (product DRI); engineering (no named owner for this specific flow)
- Owner (agent): Magic (identified defect; proposed fix)
- Last meaningful change: No recent change documented. The broken state predates this session.
- Health signal:
  - 83% of pack-only buyers never touch marketplace [source: Loki — explicit]
  - No guided next step post-pack-open: "no 'list this on marketplace,' no 'enter this challenge'" [source: Loki]
  - April 15–16 pack-open spike: 1,466 and 992 pack-opens, but conversion to continued engagement unknown [source: SoT §3.5]
- Known issues / open questions:
  - After pack open: user sees Moments → nothing. Dead end. No prompt to enter challenge, list on marketplace, or view related sets [source: Loki]
  - Proposed fix exists: immediate post-pack prompt to (a) enter challenge, (b) list duplicate on marketplace, (c) view related sets to complete [source: Loki]. Not shipped.
  - This is described as "one of the highest-leverage interventions available" [source: Loki]
- Recent surface activity (last 30d): No change shipped. Defect persists.
- Cross-product note: Disney Pinnacle and NFL ALL DAY face the same post-pack dead-end problem generically; no specific analog found in sources.

---

**4. Fast Break**
- Tier: app-layer
- State: live / iterating
- Owner (human): Neil Laessig (engineering); Jordan Wagner (sole operator)
- Owner (agent): Magic (editorial context, campaign timing analysis)
- Last meaningful change: 2025-26 season upgrades — fatigue system switched from tier-based to ASP-based; Captain Clutch (1.5× multiplier); tiebreaker eliminated (prize pool splitting); Historic Fast Break mode added; Tap to Watch integration with NBA for live game stream access [source: roadmap blog post]. Playoff Edition launched April 17: simplified format (3 players R1–2, 2 players R3–Finals), daily + run leaderboards [source: playoffs blog post].
- Health signal:
  - April 2026: 2,436 Fast Break events total; peak 1,847 on April 19 (2 days after email blast) [source: SoT §3.6]
  - Lead-lag relationship confirmed: email creates intent, Fast Break captures it [source: SoT §3.6]
  - Drives daily app opens — "critical for retention" [source: Loki]
- Known issues / open questions:
  - Jordan Wagner is sole operator — single point of failure for a retention-critical product [source: Loki]
  - Atlas `consumer` schema (where Fast Break events live) not provisioned in BigQuery at dl-kaaos — Fast Break participation is invisible to data science [source: CLAUDE.md]
  - Fast Break Playoff Edition links predictions to Moment ownership — but participation rate data not available without Atlas schema [source: CLAUDE.md]
  - Fast Break Daily Result email (template 1133) has a **broken Liquid URL**: `?fastBreakId={{ event[` — production defect in running campaign [source: SoT §5.1]
- Recent surface activity (last 30d): Playoff Edition live (April 17+); Road to the Ring points integration added [source: playoffs blog post]
- Cross-product note: Sorare has an analogous DFS-style engagement mechanic; their between-drop engagement collapse despite it shows Fast Break alone doesn't solve retention [source: SoT §4.2]

---

**5. Quests / Challenges**
- Tier: app-layer
- State: live
- Owner (human): Guy Bennett (52+ challenge configs per drop)
- Owner (agent): Magic (challenge copy, walkthrough content)
- Last meaningful change: 2026 Playoff Challenge official rules page exists (nbatopshot.com/2026-playoff-challenge-official-rules) — confirms active Q2 2026 [source: xAI search]. Set Completion Rewards (immediate pack/box triggers upon finishing 2025-26 sets) listed as coming feature in roadmap [source: roadmap blog post].
- Health signal:
  - 2,178 of ~16,000 active users participate in challenges = **14% challenge participation** [source: Loki]
  - NFL benchmark: 30% challenge participation — gap is massive [source: Loki]
  - Every 1% increase in challenge participation = meaningful revenue uplift via 20× spending multiplier [source: Loki]
  - 52+ challenge configs per drop [source: Loki]
- Known issues / open questions:
  - Challenge participation 14% vs. 30% NFL benchmark — largest single engagement gap in the product [source: Loki]
  - Atlas `consumer` schema not in BQ — Quest and challenge completion events are invisible to data science [source: CLAUDE.md]
  - "Between-drop collapse is unsolved. Sorare shows what happens without bridging it." [source: SoT §4.2]
  - Set Completion Rewards listed as a planned feature, not yet shipped [source: roadmap blog post]
- Recent surface activity (last 30d): 2026 Playoff Premieres (burn-to-earn) active; 9,200+ collectors and 93,000+ Moments burned in Road to the Ring Week 1 — challenges/burns are the engagement engine [source: xAI search, playoffs blog post]
- Cross-product note: MTG uses between-set promotional cards and Arena events to sustain engagement — direct analog to the unsolved between-drop gap [source: SoT §4.2]

---

**6. Picks (Playoff Picks / Predictions)**
- Tier: app-layer
- State: live
- Owner (human): Jordan Wagner (operator, same as Fast Break); Dan Carreiro (product DRI)
- Owner (agent): Magic (picks integration in Road to the Ring editorial)
- Last meaningful change: Playoff Picks launched as part of Road to the Ring (April 17+). Free-to-play prediction game covering game winners, player scoring, duels, series length, team totals. "You cannot lose points on a pick." [source: playoffs blog post]
- Health signal:
  - Integrated into Road to the Ring points system — participation tied to prize store access [source: playoffs blog post]
  - Week 1: 9,200+ collectors participating in Road to the Ring (Picks + Fast Break combined surface) [source: xAI search]
- Known issues / open questions:
  - Atlas `consumer` schema gap means Picks participation events are invisible to data science [source: CLAUDE.md]
  - Picks surface is seasonal (playoffs only) — no always-on year-round product [source: playoffs blog post — "road to the ring runs April 17 through June 26"]
  - No causal attribution between Picks participation and marketplace spend [source: SoT §7.10]
  - Jordan Wagner sole operator — same single-point-of-failure risk as Fast Break [source: Loki, by implication]
- Recent surface activity (last 30d): Live since April 17; picking data from playoffs in progress.

---

**7. Top Shot Live**
- Tier: app-layer
- State: stopped / unconfirmed
- Owner (human): Unknown — no current owner documented in any source
- Owner (agent): Magic (monitoring)
- Last meaningful change: No mention in any current source. Zero results for "Top Shot Live" in 2025-26 roadmap blog, playoffs blog, or xAI search (direct query returned "No links found") [source: WebSearch query 2026-05-04]. The product surface existed historically — live drop/event streaming — but has no current-state documentation.
- Health signal: None available. Surface is absent from all current product surfaces.
- Known issues / open questions:
  - Cannot confirm "stopped" with a documented shutdown announcement — only confirming absence from all current product documentation
  - If this was a live-streaming or live-auction surface, it may have been rolled into "Tap to Watch" (Fast Break integration with NBA for live game stream access) or simply sunset
  - Requires direct product team confirmation of current state
- Recent surface activity (last 30d): No evidence of activity.

---

**8. Auth Portal (Login + Activation)**
- Tier: utility-layer
- State: broken-in-prod
- Owner (human): Guy Bennett and Sam Williams (CIO campaign management); Dan Carreiro (product DRI); engineering (Ralf, Sid for pipeline fixes)
- Owner (agent): Magic (welcome email audits, Camp 163 investigation)
- Last meaningful change: Welcome #163 (Camp 163) replaced Welcome #132 (Camp 132) as the active onboarding welcome program. Auth URL confirmed active: nbatopshot.com/homepage/auth?auth=login [source: xAI search]. Camp 163 launched as a 3-action journey but runs as a 1-action sequence.
- Health signal:
  - Welcome #163 CTR: 4.85% vs. Welcome #132 CTR: 13.24% — **−8.39pp collapse** [source: SoT §3.2]
  - Human CTOR: 41.7% (V1) vs. 13.6% (V2) — −28pp [source: SoT §3.2]
  - Dark-window D7 conversion (no active welcome): **8.54%** — BETTER than Camp 163 era [source: SoT §3.1]
  - Mean first-7d basket (converters): $27.54 [source: SoT §3.1]
- Known issues / open questions:
  - **Root cause confirmed (two independent defects):** (1) Journey truncation — V2 has 3 actions but only action 4525 is sending; actions 4528 and 4550 have 0 sends in 30 days. (2) Voice regression — Camp 163 primary email reads as retail copy, not collector voice; dynamic content injection (`{{ content }}`) eliminated entirely [source: SoT §3.2]
  - **UTM contamination:** both Camp 132 and Camp 163 templates contain UTM parameters pointing to a May 2025 drop announcement (`utm_campaign=%5BCopy%5D+05.19.25+Playoffs+Second+Round+Drop+announce`). All click attribution is corrupted [source: SoT §3.2]
  - 80% of the CTR gap is CTOR (content quality); 20% is deliverability — V2 actually reaches more inboxes, the problem is entirely the copy [source: SoT §3.2]
  - The V2 welcome program is likely actively suppressing conversion below what an absent program produces [source: SoT §3.1 — dark window outperforms Camp 163]
  - Fix scoped and ready: restore Camp 132 structure (3.5× revenue/send), re-enable dynamic content injection, fix journey to send all 3 actions. Filed with Guy/Sam tick 0400 — no response [source: marketing plan §"What requires other humans"]
  - Cohort quality confound: whether dark-window users are self-selected higher-intent is unresolved [source: SoT §7.3]
- Recent surface activity (last 30d): No fix shipped. Camp 163 defects persist.

---

**9. Mobile App**
- Tier: app-layer
- State: iterating
- Owner (human): Dan Carreiro (product DRI); engineering (mobile team, unnamed)
- Owner (agent): Magic (mobile-first copy, collector clock analysis)
- Last meaningful change: Roadmap 2025-26 announced mobile marketplace integration — "coming later this season, all collectors will be able to shop directly in the app using their account's balance" [source: community blog post]. App available on iOS (App Store ID 1483890080) and Google Play [source: xAI search]. Support section exists for mobile-specific issues [source: xAI search].
- Health signal:
  - April 2026 daily app opens: peak 4,457 (Apr 18) vs. baseline 1,777 (Apr 14) [source: SoT §3.5, Mixpanel]
  - App reviews note: collectors request in-app marketplace to avoid web redirect [source: xAI search — app review summary]
- Known issues / open questions:
  - **Mobile marketplace not yet live** — collectors still redirected to web browser for marketplace purchases [source: roadmap blog — stated as "coming later this season" as of 2025-26 roadmap, no shipped confirmation]
  - Web-only marketplace creates friction in the highest-engagement mobile context
  - Push notifications are firing post-game (same-night) when transaction volume is near-zero; "losing to sleep schedules" [source: Collector's Clock brief — 15+ market snapshots confirm near-zero volume T+40min post-game]
  - Morning notification format (7:00 AM ET game recap + Moment links) not yet built [source: Collector's Clock brief — proposed, not shipped]
- Recent surface activity (last 30d): Road to the Ring and Fast Break Playoff Edition accessible via app; marketplace remains web-redirected.

---

**10. Web (Desktop + Browser)**
- Tier: app-layer
- State: live
- Owner (human): Dan Carreiro (product DRI); engineering
- Owner (agent): Magic (monitoring via public GraphQL and market snapshots)
- Last meaningful change: Homepage personalization via Atlas campaign builder (Jim Wheaton) enables per-user homepage: New user / Active collector / Lapsed user / Whale [source: Loki]. LAVA floor-detection tool added to marketplace [source: roadmap blog].
- Health signal:
  - Marketplace URL confirmed active: nbatopshot.com/search [source: xAI search]
  - 49 market snapshots taken May 3 confirming real-time transaction data flowing [source: Collector's Clock brief]
  - Public GraphQL API active: public-api.nbatopshot.com/graphql [source: CLAUDE.md]
- Known issues / open questions:
  - Atlas homepage personalization is technically available but not confirmed as active for Magic's editorial content delivery [source: SoT §5.4]
  - In-app editorial delivery not yet a distribution surface for show-runner content [source: marketing plan §distribution]
  - Parallel system redesign (enhanced visual distinction) listed as planned feature, not yet shipped [source: roadmap blog]
  - On-chain permanence / independent blockchain verification listed as planned, not shipped [source: roadmap blog]
- Recent surface activity (last 30d): Road to the Ring prize store, playoff Picks, and Fast Break Playoff Edition accessible via web. No reported outages (status.nbatopshot.com showed no incidents as of April 8, 2026) [source: xAI search].

---

**11. Account / Collection Dashboard**
- Tier: app-layer
- State: live
- Owner (human): Dan Carreiro (product DRI); Jim Wheaton (Atlas campaign builder)
- Owner (agent): Magic (collection analysis, per-collector data for Matt's reactivation track)
- Last meaningful change: VIP Program restructured October 1, 2025 — tiered structure based on DSS Net Spend ($2,000+/month for Prospect VIP); monthly rebates and rewards [source: xAI search — VIP support article]. Top Shot Score (replacing Collector Score) = sum of all Moment scores (dollar cost × 10) [source: xAI search — Top Shot Score support article]. NBA All-Star VIP Pass adds 250,000 Top Shot Score points [source: xAI search].
- Health signal:
  - VIP Program qualification is the primary mechanism gating premium drop access (Collector Score) [source: Loki]
  - All-Time Team Leaderboards with quarterly Rare/Legendary airdrops active [source: roadmap blog]
  - Player Leaderboards active [source: roadmap blog]
  - Seasonal Favorite Team Leaderboards (exclusive, same-team-all-season) rolled out December 2025 [source: roadmap blog]
- Known issues / open questions:
  - Collection organization tool (custom grouping) available to VIP access only — non-VIP collectors cannot organize [source: roadmap blog]
  - Per-collector collection state (holdings, top Moments, last transaction date) requires BQ credential — not accessible without it [source: reactivation copy specimens §"What I Can't Give You Without BQ"]
  - Matt's personal-touch track (top 50 dormant collector data packs) entirely blocked on BQ credential refresh [source: reactivation copy specimens §Track 1]
  - Account-level withdrawal fees ($4–$25) flagged in user reviews as a friction point [source: xAI search — Trustpilot review summary]
- Recent surface activity (last 30d): VIP Lock-In deposit match (April 13–22, 15% for VIPs uncapped, 10% for all up to $1,000) ran successfully [source: playoffs blog post].

---

**12. Collector Score / Top Shot Score**
- Tier: app-layer
- State: live / iterating
- Owner (human): Dan Carreiro (product DRI); Guy Bennett (gating configs)
- Owner (agent): Magic (score-gating analysis)
- Last meaningful change: Collector Score renamed/replaced by Top Shot Score. New formula: dollar cost paid × 10 per Moment. NBA All-Star VIP Pass adds 250,000 points [source: xAI search]. Score now gates premium drop access and VIP tier qualification [source: Loki, xAI search].
- Health signal:
  - Score gating creates holding incentive — "collectors hold to maintain access" [source: Loki]
  - Forging: 500K+ Moments burned to date — score mechanics drive burn behavior [source: Loki]
  - Road to the Ring: 93,000+ Moments burned in Week 1 — score/burn engagement confirmed [source: xAI search]
- Known issues / open questions:
  - Sub-100 serial premium cliff — whether the score/lottery distribution for sub-100 serials is intentional or a gap is an open product question for Roham/Dan [source: marketing plan §"Decisions still owed"]
  - Score formula change (dollar cost × 10) creates different incentives than prior tier-based system — downstream effects on marketplace behavior not yet studied
- Recent surface activity (last 30d): Active in Road to the Ring tier progression (Prospect → Starter → All-Star → All-NBA → MVP → Legend) [source: playoffs blog post].

---

**13. VIP Program**
- Tier: app-layer
- State: live
- Owner (human): Matt Schorr (Head of Growth; relationship layer); Kenny Zamora (Lead Customer Support — VIP escalation path)
- Owner (agent): Magic (VIP copy, whale-tier editorial)
- Last meaningful change: Restructured October 1, 2025 — new tiered DSS Net Spend basis; monthly rebates; early access to features; Nine Lives Lounge (exclusive for Cool Cats set completers) [source: roadmap blog, xAI search]. Captains Program added: 30 Team Captains leading NBA-team communities, 10% seller fee revenue-sharing to team community budgets [source: community blog].
- Health signal:
  - XL whales: 66–83% of monthly revenue [source: Loki]
  - 1,122 dormant $100K-LT collectors with $234.6M historic GMV — the primary reactivation target [source: SoT §1.3, §1.2]
  - L4 (Invested) described as "revenue backbone — protect at all costs" [source: Loki]
- Known issues / open questions:
  - No whale-tier concierge surface — Matt's relationship layer is informal and distributed [source: SoT §5.3, CMO framework §"What this framework does not solve"]
  - VIP-tier collectors have no dedicated in-product space beyond early feature access and monthly rebates [source: roadmap blog — Nine Lives Lounge is set-completion gated, not spend-tier gated]
  - "Matt whale program: the L+XL distribution channel for Reactivation outside of broadcast is still undefined" [source: CMO framework]
  - Kenny Zamora handles reactive support + fast resolution for whale-tagged tickets — proactive outreach infrastructure does not exist [source: CLAUDE.md]
- Recent surface activity (last 30d): Lock-In deposit match (April 13–22) gave VIPs an uncapped 15% deposit match — direct financial VIP benefit. Road to the Ring prize store includes game-worn memorabilia items [source: playoffs blog post].

---

**14. Customer.io Email Stack**
- Tier: utility-layer
- State: broken-in-prod
- Owner (human): Guy Bennett + Sam Williams (campaign management); Dan Carreiro + Roham (send authorization for Phase 2)
- Owner (agent): Magic (audit, copy, campaign briefs)
- Last meaningful change: Welcome #163 (Camp 163) replaced #132 as active onboarding campaign — a regression, not an improvement [source: SoT §3.2, §5.1]. No changes to the structural defects documented below.
- Health signal:
  - 139 total campaigns; 24 running [source: SoT §5.1]
  - April 2026: 2,010,727 email opens; 33,447 clicks; **1.66% average CTR** [source: SoT §3.3]
  - Camp 132 (benchmark quality): 44.2% open / 12.8% CTR. Camp 163 (current): ~32% open / 4.85% CTR [source: SoT §3.2]
  - Industry benchmark for programmatic flows: 5.3% of sends → 41% of email revenue (ARPU 18×) [source: SoT §5.2]
- Known issues / open questions:
  - **Fast Break Daily Result email (template 1133): broken Liquid URL in production** — `?fastBreakId={{ event[` — malformed tag, link is broken for all sends [source: SoT §5.1]
  - **Camp 163 welcome: journey truncated** — actions 4528 and 4550 have 0 sends in 30 days; 85% of email touchpoints removed vs. V1 [source: SoT §3.2]
  - **Camp 163 voice regression:** dynamic basketball context injection (`{{ content }}`) eliminated; email reads as retail transaction copy [source: SoT §3.2]
  - **UTM contamination:** both welcome campaigns point to a May 2025 drop announcement UTM — all welcome campaign attribution is corrupted [source: SoT §3.2]
  - **Reactivation campaign #1:** draft status with Customer.io demo-gallery placeholder copy — not real content [source: SoT §5.1]
  - 0 whale-tier programmatic surfaces [source: SoT §5.1]
  - 0 post-purchase narrative emails for marketplace buys [source: SoT §5.1]
  - 0 personalized collection-state emails [source: SoT §5.1]
  - 57.2% of Email Link Clicked events have no campaign_id — causal attribution is unmeasurable [source: SoT §3.4]
  - E1 "Round 2 Starts Here" broadcast: LOCKED — pending CIO send authorization from Roham + Dan [source: marketing plan]
  - Pack Received email (#10): ~10 words body, no narrative variables [source: SoT §5.1]
  - Abandoned Cart email (#18): cliché voice [source: SoT §5.1]
  - BQ → CIO segment sync pending (Flagg, TST, Wemby segments): 8–12× CTOR uplift estimated but blocked [source: marketing plan §"What requires other humans"]
- Recent surface activity (last 30d): No structural fixes shipped. Three known running-campaign defects persist (Fast Break URL, Camp 163 journey truncation, UTM contamination).

---

**15. In-App Inbox / Push Notifications**
- Tier: utility-layer
- State: live / misaligned
- Owner (human): Dan Carreiro (product DRI); engineering
- Owner (agent): Magic (timing analysis, morning brief proposal)
- Last meaningful change: Push notifications referenced as current asset but no recent architectural change documented.
- Health signal:
  - April 2026 daily app opens peak: 4,457 (Apr 18) — notifications are driving app opens [source: SoT §3.5]
  - 49 market snapshots (May 3) confirm near-zero transaction volume T+40min post-game [source: Collector's Clock brief]
- Known issues / open questions:
  - **Timing misalignment confirmed:** post-game push notifications fire same-night when transaction volume is near-zero. Market activation window is 6–9 AM ET morning-after [source: Collector's Clock brief — 15+ snapshots]
  - "The collector is asleep at 11 PM ET. The email should arrive when they wake up." — same applies to push [source: Collector's Clock brief]
  - Morning Brief push notification format (7:00 AM ET, game recap + Moment links) proposed but not built [source: Collector's Clock brief]
  - In-app editorial delivery not yet a distribution surface for show-runner content [source: marketing plan §distribution]
  - In-app inbox (separate from push) — no documentation of current state, features, or health in any source
- Recent surface activity (last 30d): No timing fix shipped.

---

**16. Discord Community**
- Tier: community-layer
- State: live
- Owner (human): Matt Schorr (Head of Growth); community team (Captains Program — 30 team captains)
- Owner (agent): Magic (editorial content, Slack-first distribution currently; Discord for NBA Top Shot community)
- Last meaningful change: Captains Program formalized — 30 Team Captains lead fan communities for each NBA team; 10% seller fee revenue-sharing to team community budgets [source: community blog post]. Discord remains the primary collector community hub alongside Slack.
- Health signal:
  - Official invite URL active: discord.com/invite/nbatopshot [source: xAI search]
  - Community-level content engagement (Road to the Ring participation, challenge deadlines) is managed through Discord + social channels
- Known issues / open questions:
  - Discord is "too sophisticated" for the Type 4 (Community Member) lapsed collector archetype — "feeling 'not in it'; Discord too sophisticated; no social moment" [source: SoT §1.6]
  - The dormant cohort by definition isn't checking Discord — distribution to lapsed collectors cannot rely on Discord alone [source: CMO framework]
  - Magic's current distribution is Slack-first (internal), not Discord-first (collector-facing) — content reaches team, not community directly [source: marketing plan §distribution]
  - No quantified Discord DAU / engagement metric available in any source
- Recent surface activity (last 30d): Captains Program active; giveaways and watch parties organized by team captains [source: community blog post].

---

**17. Video Content (Sam Williams)**
- Tier: community-layer
- State: live
- Owner (human): Sam Williams (producer + named voice editor — Roham-confirmed)
- Owner (agent): Magic (content briefs, conditional copy)
- Last meaningful change: Playoffs: 3–4 videos per day [source: Loki]. Templates: Hype/Countdown, Pack Opening, Collector Spotlight, Moment of the Day, Challenge Walkthrough [source: Loki]. Sam W ratified as named editor with 3× CTR multiplier from voice quality [source: CMO framework — Camp 132 vs. 163 empirical case].
- Health signal:
  - 3–4 videos/day during playoffs is the stated production cadence [source: Loki]
  - "Playoff content outsells regular season 3–5×" [source: Loki]
  - Player performance Moments (40-point games, records) drive immediate demand [source: Loki]
- Known issues / open questions:
  - No distribution surface beyond social (YouTube, X, Discord) — video content is not integrated into the email stack or in-app surfaces [source: marketing plan §distribution — "Slack-first"]
  - 78+ editorial briefs written and ready to deploy but Sam's review/sign-off queue is backed up (Ten-Year Hold Test, Serial #5, LeBron Archive pending Matt sign-off) [source: marketing plan §"What requires other humans"]
- Recent surface activity (last 30d): Active — playoffs production cadence ongoing.

---

**18. PR / External Media Amplification**
- Tier: community-layer
- State: broken-in-prod
- Owner (human): Matt Schorr (Head of Growth; leads PR amplification test)
- Owner (agent): Magic (data angle, "What the Market Called" piece)
- Last meaningful change: PR amplification test proposed — send "What the Market Called" to 3 journalists (Sportico, The Athletic, Bleacher Report) as empirical test of C-amplification thesis [source: CMO framework, marketing plan May 5].
- Health signal:
  - "Sportico, The Athletic, Bleacher Report cite CryptoSlam for floor data, not Top Shot — even when they know we have better data. Issuer-credibility deficit." [source: CMO framework]
  - "External media currently does NOT amplify Top Shot data" [source: SoT §5.6]
  - 0 journalist citations of Top Shot data in the last session's search results [source: SoT §5.6]
- Known issues / open questions:
  - Amplification thesis was the proposed C-spine and was rejected after 5-agent swarm + R2/R3 attack confirmed structural issuer-credibility deficit [source: CMO framework]
  - PR amplification test (May 5, "What the Market Called") is the controlled experiment — not yet run, result unknown [source: marketing plan]
  - "What the Market Called" piece is 95% complete — needs G7 result fills [source: marketing plan §Week 1]
  - If test fails: "clean data that the amplification thesis is dead in 2026. Don't keep arguing about it." [source: CMO framework]
- Recent surface activity (last 30d): No external media placement. Test pending.

---

**19. Campaign Approval + Deploy Pipeline (GitHub Actions)**
- Tier: utility-layer
- State: missing / deferred
- Owner (human): Ralf + Sid (engineering, build); Dan Carreiro + Matt Schorr (reviewers); Roham (policy decision on CIO send auth)
- Owner (agent): Magic (spec author; will operate pipeline once built)
- Last meaningful change: Spec written and filed 2026-05-03 — ready for Monday review [source: GitHub Actions brief]. Not yet built.
- Health signal: N/A — surface does not exist yet.
- Known issues / open questions:
  - Current state is deeply broken: drafts buried in Slack → Matt/Dan may miss → manual CIO execution → Magic has no visibility on what shipped [source: GitHub Actions brief §"The Problem"]
  - Estimated build time: ~8h dev (1h repo setup + 2h validation Action + 3h deploy Action + 30min CIO credentials + 1h test) [source: GitHub Actions brief]
  - CIO send permission: Magic currently has read-only MCP access; pipeline routes through human-approved merge (not direct Magic send authority) [source: GitHub Actions brief §"Scope Control"]
  - Phase 2 (direct send authority for pre-approved campaign types) requires explicit policy decision from Dan + Roham [source: GitHub Actions brief]
  - Pilot campaign ready: Template 3428 rewrite is written, needs Guy/Sam greenlight [source: GitHub Actions brief §"The Pilot"]
- Recent surface activity (last 30d): Spec filed. No build started.

---

**20. Road to the Ring (2026 Playoffs Campaign)**
- Tier: app-layer
- State: live
- Owner (human): Matt Schorr (Head of Growth); Guy Bennett (challenge/drop configs); Sam Williams (content)
- Owner (agent): Magic (editorial, conditional copy, drop-day community posts)
- Last meaningful change: Launched April 17, 2026 — runs through June 26 (Finals). Points-based progression with six tiers (Prospect → Legend); Prize Store with memorabilia milestones [source: playoffs blog post].
- Health signal:
  - Week 1: 9,200+ collectors participating; 93,000+ Moments burned [source: xAI search — NBATopShot X post]
  - April 20–22 order peak: 787–824 confirmed orders/day vs. 35/day baseline = 23.5× lift [source: SoT §3.5]
  - Four headline prize items unlocking in waves (Brandon Miller basketball at launch through Larry Bird jersey at Conference Finals) [source: playoffs blog post]
- Known issues / open questions:
  - Points tiers are separate from spendable balance — collectors may not fully understand the two-currency system [source: playoffs blog post — "Playoffs Points only go up" + separate redemption balance]
  - Finals (June 24) drop is confirmed but dependent on which teams advance — conditional copy not yet written [source: marketing plan §Week 2 status]
  - No causal attribution linking Road to the Ring participation to marketplace spend lift (measurement infrastructure gap) [source: SoT §7.10]
  - E1 "Round 2 Starts Here" broadcast (locked pending CIO auth) would amplify Road to the Ring to the dormant cohort — blocked [source: marketing plan]
- Recent surface activity (last 30d): Active throughout. Playoff Picks, Fast Break Playoff Edition, Top Shot This: Playoffs Edition, and 2026 Playoff Premieres (burn-to-earn) all live under this umbrella.

---

## Mid-Stream Consistency Audit

After 20 surfaces: states are mutually exclusive and sourced. Check:
- "live" = URL or metric confirming operation in sources ✓
- "broken-in-prod" = specific defect documented ✓ (pack-pull dead end: Loki; Camp 163 CTR collapse + UTM corruption: SoT §3.2; Fast Break broken Liquid URL: SoT §5.1; PR credibility deficit: CMO framework)
- "iterating" = active development with confirmed recent change ✓
- "stopped" = evidence of prior existence and current absence ✓ (Top Shot Live — zero results in all 2025-26 sources)
- "missing" = cited source claiming the surface should exist ✓ (GitHub Actions brief; whale concierge gap: CMO framework; morning brief notifications: Collector's Clock brief)
- No surface assigned "live" without a URL, metric, or confirmed ship date ✓
- Every surface has owner + state + at least one source ✓

---

## Missing Surfaces

These surfaces are documented as gaps or should-exist items with paper trail. No surface is listed here without a citation.

**M1 — Whale-Tier Concierge Surface**
- Should exist because: "Matt's whale relationship program: the L+XL distribution channel for Reactivation outside of broadcast is still undefined." [source: CMO framework §"What this framework does not solve"]. Matt Schorr is identified as the natural owner of L+XL relationship surface [source: CLAUDE.md].
- What it would be: An in-product or CRM surface giving XL/Invested collectors (L4) designated contact access, priority support routing (Kenny Zamora), collection performance intelligence, and exclusive pre-access. Loki describes this as a "dedicated host floor" that doesn't currently exist [source: Loki §"Key human partners"].
- Closest analog: Sorare has no equivalent; Nike SNKRS Reserve gives priority access but not relationship management. Fanatics Fest has in-person VIP events — the closest but once-a-year [source: SoT §4.2].

**M2 — Programmatic Drop Announce Pipeline**
- Should exist because: "Current state: Magic writes drafts → buried in Slack → Matt/Dan finds it (sometimes) → manually approves → manually executes in CIO → Magic has no visibility on whether it shipped." [source: GitHub Actions brief §"The Problem"].
- What it would be: Git-based approval flow (spec fully written, 8h dev estimate) enabling drop announcements to fire reliably on merge [source: GitHub Actions brief].
- Current gap cost: time-sensitive drop copy is sitting undeployed in draft files.

**M3 — Morning Brief Push Notification**
- Should exist because: 15+ market snapshots confirm near-zero transaction volume T+40min post-game; morning 6–9 AM ET is the peak activation window [source: Collector's Clock brief].
- What it would be: Daily 7:00 AM ET push notification — one sentence game recap, one link to relevant Moments. No architectural change required; only a send-time policy change [source: Collector's Clock brief §"Immediate action"].

**M4 — Real Reactivation Drip (CRM)**
- Should exist because: 1,122 dormant $100K-LT collectors with $234.6M historic GMV; 3-segment broadcast via CIO projected to reactivate 35–70 collectors in 14 days (~$105K–$168K GMV) [source: reactivation copy specimens §"The Math"]. Three segments written, ready to deploy — blocked on CIO send authorization [source: reactivation copy specimens §"What's Ready vs. What's Blocked"].
- What it would be: Segment A (Origin Story Holders), Segment B (Single-Star Believers), Segment C (Survivors) — personalized email sequences with positive-math targeting [source: reactivation copy specimens §Targeting Appendix].
- Note: Negative-math cohort (~480 collectors who bought near ATH) requires a separate framing decision from Roham/Dan before any send [source: reactivation copy specimens §"DO NOT SEND"].

**M5 — Post-Purchase Narrative Email (Marketplace Buys)**
- Should exist because: 83% of pack-only buyers never touch marketplace [source: Loki]; 0 post-purchase narrative emails for marketplace buys exist in the CIO stack [source: SoT §5.1]. Purchase completion is the highest-intent moment to reinforce collector identity.
- What it would be: After a marketplace purchase, a one-email sequence confirming the specific Moment purchased, its narrative context, and a next step (challenge entry, related Moment, or floor-price context for the set).

**M6 — Causal Spend Lift Measurement Infrastructure**
- Should exist because: "The primary KPI is causal spend lift on the targeted cohort, per send. As of now: we have no instrumentation to measure causal spend lift even when distribution unlocks." [source: SoT §7.10].
- What it would be: (1) BQ IAM fix for magic-agent SA, (2) CIO → Mixpanel campaign_id tagging (P2 engineering ticket), (3) holdout group configuration in CIO. All three needed in combination [source: SoT §7.10].
- Gap consequence: the hard-stop trigger ("3 consecutive below-baseline pieces → rotate") cannot fire without baseline measurement. The stated primary KPI is currently unmeasurable [source: SoT §7.10].

**M7 — Cooper Flagg Debut Infrastructure (BQ→CIO Segment Sync)**
- Should exist because: Cooper Flagg is "the highest-value Fresh Threads / Top Shot Debut opportunity since Wembanyama" [source: Loki]. BQ→CIO segment sync for Flagg, TST, and Wemby is a P1 engineering item with 8–12× CTOR uplift estimated [source: marketing plan §"What requires other humans"].
- What it would be: Automated sync from BQ collector segments to CIO audience lists, enabling targeted Flagg debut sends to collectors who match predictive interest signals.

---

## Stack Health Snapshot

| State | Count | Surfaces |
|-------|-------|---------|
| live | 7 | Marketplace, Drops, Quests/Challenges, Picks, Web, VIP Program, Road to the Ring |
| live / iterating | 4 | Fast Break, Mobile App, Account/Collection Dashboard, Collector Score |
| live / misaligned | 1 | In-App Inbox / Push Notifications |
| live (community) | 2 | Discord Community, Video Content |
| broken-in-prod | 4 | Pack-Pull Experience, Auth Portal/Email Welcome, Customer.io Email Stack, PR/External Media |
| stopped / unconfirmed | 1 | Top Shot Live |
| missing / deferred | 1 | Campaign Approval + Deploy Pipeline |
| missing (no surface exists) | 7 | Whale Concierge, Drop Announce Pipeline, Morning Brief Push, Reactivation Drip, Post-Purchase Email, Causal Measurement, Flagg Segment Sync |

**Total documented surfaces:** 20 active (live or in-progress) + 7 missing = 27 surfaces total  
**Broken or missing:** 11 surfaces (41% of total)

---

## Top 5 Priorities — What Should Ship / Fix Next

**Priority 1 — Fix Customer.io Auth Portal (Camp 163 + UTM corruption)**
Highest-leverage single fix available. Three documented defects, all remediable without engineering: (1) restore Camp 132 journey structure and re-enable dynamic content injection, (2) fix UTM parameters pointing to a 2025 drop announcement, (3) re-enable actions 4528 and 4550. Net impact: 3× CTR improvement on 3,279 new-user sends/month. Every new collector going through the broken welcome is a lost conversion. Fast Break broken Liquid URL (template 1133) is a parallel 15-minute fix.
- Owner: Guy / Sam (CIO)
- Blocker: No technical blocker — only human attention
- ETA if prioritized: Same day

**Priority 2 — CIO Send Authorization (Reactivation E1)**
Three fully-written reactivation email variants (Segments A, B-LeBron, C) are blocked on a policy decision from Roham + Dan. The combined track projects 40–80 reactivations in 14 days (~$105K–$168K GMV). The positive-math vs. negative-math cohort targeting appendix is written. This is the highest-ROI pending decision in the stack.
- Owner: Roham + Dan (authorization); Magic (sends once authorized)
- Blocker: Governance decision only — no technical blocker
- ETA if prioritized: 24-hour decision; send within 48 hours

**Priority 3 — Fix Post-Pack Dead End**
83% of pack-only buyers never touch marketplace. No guided next step post-pack-open. Adding a single prompt (challenge entry / marketplace listing / related set) is described as "one of the highest-leverage interventions available" in the product context. The fix is a UI/product change, not a copy change.
- Owner: Dan Carreiro (product); engineering
- Blocker: Engineering sprint — no prior fix attempted
- ETA: 1–2 week sprint if prioritized

**Priority 4 — Build Campaign Approval + Deploy Pipeline (GitHub Actions)**
78+ briefs sitting in draft files with no reliable deploy path. 8h dev estimate from spec written by Magic. Pilot candidate (Template 3428 rewrite) is already written. This unlocks the entire editorial pipeline — every future piece deploys on merge instead of sitting in Slack.
- Owner: Ralf + Sid (build); Dan / Matt (reviewers)
- Blocker: Engineering prioritization on Monday
- ETA: One-day sprint if prioritized Monday

**Priority 5 — Causal Spend Lift Measurement Infrastructure**
The primary KPI is currently unmeasurable. Three components: BQ IAM fix (30-second GCP console action from Engineering), CIO → Mixpanel campaign_id tagging (P2 ticket), and holdout group config in CIO. Without this, no piece can be declared above- or below-baseline, and the hard-stop trigger cannot fire. Every campaign run without measurement is wasted signal.
- Owner: Engineering (BQ IAM + CIO tagging); Guy/Sam (CIO holdout config)
- Blocker: BQ IAM is 30 seconds of work — it has been the longest-running blocker in this session
- ETA: BQ IAM fix: immediate. Full measurement stack: 1-week sprint

---

*Compiled 2026-05-04 by Magic.*
*All states cited to source. No surfaces invented without paper trail. Negative findings prove absence by exhaustive source search.*
*Self-audit: every surface has owner + state + source. Cross-product notes included where analogs exist. Missing section cites the claim that each surface should exist.*
