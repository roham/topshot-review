---
title: Collect HQ — Information Architecture Spec
date: 2026-05-04
author: Magic (Information Architect)
status: SPEC — feeds Site Builder agent for Vercel deployment
purpose: Define the 9 sections (8 proposed + Home), their content, data sources, layouts, voting model, and confidence treatment for Collect HQ — a strategy/intelligence hub for Dapper's collectibles portfolio (NBA Top Shot primary; Disney Pinnacle + NFL ALL DAY siblings)
reference: https://finance-hq-seven.vercel.app/ (Sinbad's Dapper Consumer Finance Studio — bar to clear)
companion: 2026-05-04-collect-hq-design-system.md (visual)
---

# Collect HQ — Information Architecture

## 0. Premise

Collect HQ is **not a marketing site**. It is a living intelligence artifact that anyone at Dapper (and ultimately Roham, Dan, Matt, Sam, Guy, Kenny — plus the rest of the company) can open mid-meeting to settle a question with a sourced answer. Every claim points to a query, a file, a finding, or a flagged gap. Nothing is stylized prose without provenance.

The reference bar is Sinbad's Consumer Finance Studio. We honor what it gets right and surpass it where Top Shot's product specifics let us — particularly: a richer two-tier evidence stack (data + narrative + collector-voice, not just data + market), a louder gap-discipline pattern (Roham's hard rule that missing data is a badge, never silence), and a per-section voting model that turns the site itself into the review apparatus.

### What finance-hq does well — preserved

1. **Hub-and-spoke nav with thematic clustering.** Top-bar links to seven peer sections, no hierarchy implied. Adopted as-is.
2. **Two-tier research separation.** Internal *Data Findings* (Heimdall) vs. external *Market Signals* (Frigga) — distinct, both visible, both confidence-scored. Adopted and extended (we add a third tier: **Collector Voice** — qualitative, sourced from Discord/X/support tickets/community posts. Top Shot has a community surface that finance doesn't; surfacing the collector's own words is load-bearing here in a way it isn't there.)
3. **Mechanism-first storytelling.** "30–60% capital-efficiency claim on Flow's unique stack" ties yield to on-chain activity. Same discipline here: every Top Shot claim translates to a mechanism (e.g., the Embiid 3.2× ratio is "narrative density × certainty premium × supply availability" — not a vibe).

### What we do better — and how

1. **Gap badges are first-class, not implicit.** finance-hq uses staged labels (In dev, Testing) to *imply* incomplete data. Per Roham's hard rule, we make the gap explicit: every section that should have data but doesn't carries a `GAP` badge with a remediation path (BQ IAM fix, Frigga scan, Heimdall query, x_search). The 12 documented gaps in the SoT (§7.1–7.12) become first-class citizens with their own routes under `/gaps`. Site Builder agents render `GAP` consistently and Open Questions surfaces them at the top of the queue.
2. **Per-card voting with structured payload.** finance-hq has no visible vote primitive. We extend the existing topshot-review.vercel.app `/api/feedback` endpoint to every card type. Three actions: `ship` / `needs-work` / `no`, optional comment. Roham's voice already routes through this app; making the whole site vote-native means every section is a review surface, not a static read.
3. **Three-tier research, not two.** Adding the Collector Voice tier (qualitative, sentiment-tagged, sourced from x_search and Discord scrapes) closes GAP §7.8 by giving us a place to put it. Without this, the two-tier system erases the community — wrong for a collectibles product.

The eight proposed sections plus a meta `Home` are kept. Two additions are made *underneath* the eight rather than as new top-level peers: a `/gaps` index (children of Open Questions) and a `/glossary` (children of Home) — both required for the site to be self-explanatory to a Dapper employee who doesn't live in the show-runner thread.

---

## 1. Home / Landing

### Purpose
First impression: convey instant authority. A visitor at `collect-hq.vercel.app` should know within five seconds that this is the collectibles portfolio's living intelligence layer — not a marketing brochure, not a wiki dump.

### What it contains
- **Hero band** — single-sentence mission line + portfolio thesis: "Collect HQ tracks the three products that turn sport, story, and Disney IP into owned digital collectibles — NBA Top Shot (primary), Disney Pinnacle, NFL ALL DAY."
- **Three product tiles** — NBA Top Shot (rich card), Disney Pinnacle (sibling card), NFL ALL DAY (sibling card). Each tile shows: product wordmark, lifecycle stage badge (`live` / `iterating` / `early-iteration` / `dormant`), a single anchor metric (Top Shot: monthly revenue tier; Disney Pinnacle: most recent drop GMV; NFL: status). Tiles link into a `/portfolio/<product>` deep page (see §2 Initiatives).
- **Now-band ("today on the floor")** — three live cards pulled from the most recent finds: most recent Data Finding, most recent Market Signal, most recent Collector Voice quote. Each shows date, confidence (or sentiment for voice), and source citation.
- **The five hats grid** — a small infographic explaining what Collect HQ *is*: Show Runner / Data Scientist / Market Researcher / Product Strategist / Tokenomics Designer. Each hat tile links to the corresponding section (Show Runner → Personas + Stack; Data Scientist → KPIs + Research; Market Researcher → Research/Market Signals; Product Strategist → Initiatives + Roadmap; Tokenomics Designer → an Initiatives sub-route).
- **Source-and-cadence footer** — refresh cadence per section ("KPIs refresh weekly via Heimdall; Research stream live; Roadmap Mondays"), GitHub source link, last commit timestamp.

### Data sources
- Hero copy is canonical (this file).
- Product tiles read from `/data/portfolio.json` (compiled from `plugins/loki/contexts/collectibles/<product>.md` plus the most recent BQ revenue tier query — Heimdall Tier 1 `/quick-answer` for the anchor metric).
- Now-band reads from the same JSON streams that feed `/research` (see §6).

### Page layout
Vertical scroll, no fold-and-collapse. Top to bottom: nav-bar → hero (white space generous, single line of copy + two-button CTA) → three product tiles in a row (responsive: stack on mobile) → now-band (three cards in a row) → five-hats grid (2×3, last cell holds a "what is this site" link) → footer. Hero is image-light: a single illustrated mark, not a stock-photo collage.

### Voting / feedback integration
Home has a single `vote on the site as a whole` ghost link in the footer (`how should we improve Collect HQ?` → opens a `site-feedback` form posting to `/api/feedback`). Per-card votes live on each section's pages.

### Confidence treatment
Now-band cards show numeric confidence (0.0–1.0) in the same chip style as the Research section. Product tiles do not show confidence — they show lifecycle status badges instead.

### Cross-product behavior
Disney Pinnacle and NFL ALL DAY tiles render with the same template as Top Shot. When the anchor metric is unavailable for a sibling product, the tile shows a `GAP` badge in the metric slot with a one-line remediation ("Pinnacle BQ schema not yet in dl-kaaos location — Eng provisioning open"). Never a silent "—".

---

## 2. Stack

### Purpose
"What's in production, what's broken in production, what's stopped, what's deferred." A single page that anyone at Dapper can open to know the state of every NBA Top Shot delivery surface (and sibling-product stubs). Replaces the buried-in-Slack hunt for "is the welcome program live or not."

### What it contains
- **Stack-by-surface accordion** — six surface groups, expandable:
  1. **Email (Customer.io workspace 161112)** — 139 total campaigns, 24 running, 1,198 lifetime newsletters. Sub-rows: Welcome programs (#6 / #77 / #132 stopped; #163 active with one live action), Pack Received (#10 running, voice-empty), Abandoned Cart (#18 running, cliché voice), Fast Break Daily Result (template 1133 — broken Liquid URL flagged), Reactivation #1 (draft, demo-gallery placeholder).
  2. **In-App (Atlas + homepage)** — Atlas campaign builder (Jim Wheaton, four-state personalization), homepage personalization (technically available, not active for editorial), post-pack flow (83% pack-only buyers never touch marketplace), push notifications (timing misaligned — same-night push fires when collectors aren't buying).
  3. **Slack / Community** — Phase 1 distribution, one top-level post per channel per 24h. 78+ briefs produced, distribution is the constraint.
  4. **Fast Break** — Daily prediction game, Neil Laessig eng / Jordan Wagner sole operator. April 2026: 2,436 events, peak 1,847 on Apr 19.
  5. **Social / External** — Sam Williams playoff video output (3–4 per day, five templates). PR amplification test pending (Sportico/Athletic/Bleacher). Issuer-credibility deficit: external press cites CryptoSlam, not Top Shot.
  6. **GitHub Actions Campaign Approval Flow** — proposed infrastructure, ~8h dev, spec written, not built.
- **Per-campaign card** for each running or recently-stopped campaign — campaign name, status badge, last-30d sends, open rate, CTR, known issues (e.g., "broken Liquid URL on template 1133"), link to the source intelligence file.
- **The "0-state" callouts** — three loud red cards: 0 whale-tier programmatic surfaces, 0 post-purchase narrative emails for marketplace buys, 0 personalized collection-state emails. These are first-class artifacts because they're the highest-leverage gaps.
- **Stack benchmark strip** — Top Shot Camp 132 (44.2% open / 12.8% CTR) vs Camp 163 (~32% / 4.46%) vs Skybox Collectibles welcome (63.6% / 8.3% / 7.1% placed-order).

### Data sources
- Customer.io API via MCP read (`mcp__claude_ai_Customer_io__list` for campaigns, `metrics` for rates) — refresh weekly.
- Mixpanel queries cached in `research-reports/data-science-insights/mixpanel-queries/` (per-campaign opens / clicks / placed-order joins).
- Source-of-truth file: `collect-hq/strategy/2026-05-04-strategy-sot.md` §5 (compiled stack audit).
- Loki context: `plugins/loki/contexts/collectibles/nba-top-shot.md` (in-app surface descriptions).

### Page layout
Two columns on desktop. Left rail (sticky): six surface-group anchors ordered by leverage (Email → In-App → Fast Break → Slack → Social → GitHub Actions). Right pane: the expanded surface group, with per-campaign cards stacked vertically. Above the columns: the three 0-state callouts as full-width red strips. Below: the benchmark strip.

### Voting / feedback integration
Per-campaign card has `ship` / `needs-work` / `no` voting (Roham's voice on which campaigns to invest in vs cut). Per-surface group has a single vote (does this surface deserve more investment?). Aggregated votes feed the Roadmap section's prioritization.

### Confidence treatment
Stack data is mostly factual (campaign existed, sent N times) — no confidence score. Where a *claim* is made about cause (e.g., "Camp 163 CTR collapse is 80% content, 20% deliverability"), the card shows the `0.85` confidence chip and links to the source investigation file.

### Cross-product behavior
Disney Pinnacle and NFL ALL DAY each get a Stack stub. When data is sparse, render: the surface accordion frame with an empty sub-state and a `GAP` banner: "Disney Pinnacle stack audit not yet performed — Persii owns this context. Frigga teardown filed for week of May 11." Never hide.

---

## 3. Initiatives

### Purpose
The set of in-flight bets the team is making — what we're trying to ship, what's been shipped, what's been killed. The portfolio of *active product moves*, not the historical product description.

### What it contains
- **Initiative card grid** — each card is a discrete bet with a goal, a mechanic, a stage badge, a primary KPI, an owner, and a confidence band. Initial set:
  1. **Reactivation B-spine** — 1,122 dormant $100K-LT collectors. Goal: 5%+ place ≥1 transaction in 6 weeks. Owner: Magic (drafts) → Matt (relationship) → Dan + Roham (CIO send authorization). Stage: `blocked` (Phase 2 CIO auth pending). KPI: causal spend lift on cohort. Confidence: 0.78 (mechanism well-grounded; size estimate 300/400/300 split pending BQ — see GAP §7.1).
  2. **Whale activation (Lock-In April / equivalent)** — Active XL cohort. Goal: ≥10% MoM spend lift over baseline. Stage: `iterating`. KPI: causal spend lift. Confidence: 0.72.
  3. **Welcome rebuild (Camp 132 voice resurrection)** — Replace Camp 163 with template-system v1004 (7 distinct templates, 3 frames each). Stage: `iterating` (specs written, not deployed). KPI: D7 conversion ≥9%, CTR ≥10%. Confidence: 0.84.
  4. **Collector's Clock timing fix** — Move E1 broadcast from same-night to 7:00 AM ET morning-after. Stage: `pre-launch`, A/B design ready. Confidence: 0.71 (data backward-inferred — see GAP §7.12).
  5. **GitHub Actions campaign approval flow** — Spec written, ~8h dev. Stage: `proposed`, awaiting Monday review.
  6. **Pack EV positivity restoration** — Loki: when packs were positive EV, W0 conversion went 2.9% → 21.2%. Tokenomics initiative; recurring health check. Stage: `monitoring`.
  7. **Post-pack guided next step** — close the 83% pack-only / never-touch-marketplace gap. Stage: `proposed`.
  8. **Arc Moment minting (multi-game documents)** — collectors want G5+G6+G7 as one document, not just the capstone clip. Stage: `discovery`.
  9. **Announcement-day mint window** — peak demand is at announcement, current mint is post-footage. Stage: `discovery`.
  10. **PR amplification test (C-evidence layer)** — three journalists, one Top Shot data point cite within 4 weeks. Stage: `pre-launch`.
- **Initiative detail page** at `/initiatives/<slug>` — full design rationale, mechanism, evidence trail, current owner, blockers, next-action checklist, supporting findings.
- **"Killed" carousel** at the bottom — initiatives that were tried and stopped, with the kill rationale. (Camp 163 V2 onboarding architecture is initial entry: "killed because journey truncation removed 85% of touchpoints; V1 voice will be restored.") Following finance-hq's approach of staged progression but making the kill explicit.

### Data sources
- Initiative metadata is curated (this file feeds the JSON; future commit lands schema in `/data/initiatives.json`).
- Each card's KPI value is pulled fresh: Heimdall Tier 1 for "what's the latest D7 conversion" type questions; cached file references for static rationale.
- Source files in `collect-hq/strategy/` and `collect-hq/nba-top-shot/intelligence/`.

### Page layout
Three-column responsive grid (4 / 3 / 2 / 1 by viewport). Cards are equal-height, stage badge top-right, mechanism beneath title, KPI + confidence band at the bottom. Filter chips at the top: stage (proposed / discovery / pre-launch / iterating / live / blocked / killed), surface (email / in-app / community / product / pricing), owner (Magic / Matt / Dan / Sam / Guy / Eng).

### Voting / feedback integration
Per-card voting (`ship` / `needs-work` / `no`). The initiatives carousel is the most-voted surface — Roham reviews each Monday and his vote pattern drives the Roadmap order.

### Confidence treatment
Every initiative shows a 0.0–1.0 confidence band derived from: (a) mechanism strength (data-grounded, theory-only, or vibes), (b) cohort sizing certainty, (c) measurement infrastructure (can we see if it worked?). Confidence below 0.6 forces a `GAP` badge calling out what would close it.

### Cross-product behavior
Initiatives is NBA Top Shot–led but the route is `/initiatives/<product>/<slug>`. Pinnacle and NFL stubs render the route shape with a placeholder card: "No Pinnacle initiatives currently tracked here — Persii's review surface is canonical for Pinnacle. Filed cross-product synthesis findings link below."

---

## 4. Personas

### Purpose
Who actually buys, holds, lapses, and reactivates. Personas are the lens for every Initiative ("which persona does this serve?") and every Research finding ("which persona does this describe?"). Without a shared persona spine, downstream copy and product decisions drift.

### What it contains
The Top Shot persona spine has two layers — the **Experience Ladder** (L0–L4) and the **Behavioral Archetypes** (Type 1–4) — and they cross. Both are surfaced.

- **Lifecycle ladder** (top of page) — five-step ladder visualization from L0 (Aware) → L4 (Invested). Each step shows: cohort definition, current size where known (L1+L2 idle: 1.27M, dormant $100K+: 1,122 holding $234.6M GMV), and the dominant transition mechanic from level to level (e.g., L1 → L2 is "first pack purchase, gated by pack EV" with the 2.9% → 21.2% W0 conversion datapoint).
- **Archetype card grid** (4 cards):
  1. **Story Buyer** — buys when narrative open. $5–$25 median. Kill condition: certainty.
  2. **Proof Buyer** — buys post-confirmation. $8–$25 median. Kill condition: nothing left to prove.
  3. **Artifact Holder** — 10-year horizon. $500–$10,000+ ceiling. Kill condition: supply absence.
  4. **Community Member** — bought for belonging. $1–$5 floor. Kill condition: not feeling "in it."
  Funnel relationship: Type 4 → Type 2 → Type 1 → Type 3.
- **Reactivation tier breakdown** (3 cards with cohort sizes):
  1. **Hot** (~737, $10K+ spend, 6–12mo lapsed) — VIP re-onboarding.
  2. **Warm** (~3,000, former L/XL, 12–24mo lapsed) — email sequence + exclusive pack.
  3. **Cold** (~31,000+) — mass campaign, low-cost activation.
- **Dormant whale segment cards** (3 cards — A/B/C from CMO framework):
  - **A — Origin Story Holders** (~300–350) — S1–S3 / Genesis pre-2023.
  - **B — Single-Star Believers** (~400–450) — 60%+ collection in one player.
  - **C — Survivors** (~300–350) — last txn 9–18 months ago.
  Each card carries `GAP §7.1` because the split is cohort-knowledge-estimated, not BQ-confirmed.
- **Primary audience identification panel** — Gambler-Collector primary, Tribal Fan secondary, with the Loki-sourced "Called It" mechanism explanation.

### Data sources
- `plugins/loki/contexts/collectibles/nba-top-shot.md` (Experience Ladder + Audience Identification).
- `collect-hq/nba-top-shot/intelligence/2026-05-03-four-collector-archetypes.md` (Archetypes).
- `collect-hq/nba-top-shot/2026-05-03-reactivation-copy-specimens.md` (A/B/C dormant subdivision).
- BQ Heimdall Tier 2 query for current cohort sizes (refresh monthly).

### Page layout
Top-to-bottom narrative flow:
1. **Lifecycle ladder** (full-width horizontal visual; clickable steps reveal the cohort).
2. **Archetype grid** (2×2).
3. **Crossover panel** — short visualization of "L3 collectors are mostly Type 1 + Type 2; XL whales are mostly Type 3; lapsed Community Members are the Type 4 reactivation pool" — three sentences plus a small lattice diagram. (This crossover is what makes the page hang together vs. reading as two disconnected segmentations.)
4. **Reactivation tier strip** (three tiles).
5. **Dormant whale segment cards** (three richer cards, GAP-flagged).
6. **Primary audience panel**.

### Voting / feedback integration
Per-archetype card voting (`is this archetype real / sharp enough?`). Per-segment card voting on the dormant whales (A/B/C). Per-tier voting on reactivation.

### Confidence treatment
- Lifecycle ladder cohort sizes: 0.95 (BQ-derived).
- Archetype definitions: 0.80 (theory-grounded, validated by market behavior in §2 Research findings; not survey-validated).
- Dormant whale segments A/B/C: 0.55 with explicit `GAP §7.1` badge.
- Primary audience identification: 0.75 (Loki-sourced, not currently survey-validated — see GAP §7.8).

### Cross-product behavior
Pinnacle and NFL get the same lifecycle ladder template. When sub-cohort data isn't there, the ladder steps render with `GAP` badges and a one-line remediation. The Behavioral Archetype layer is intentionally NBA-specific (the Story/Proof/Artifact/Community types are basketball-narrative-driven). Pinnacle's archetype layer should be designed by Persii, not extrapolated from here. The page renders a "this layer is product-specific — see [Persii's surface] for Pinnacle archetypes" callout where the grid would be on sibling products.

---

## 5. Roadmap

### Purpose
Time-ordered view of what's about to ship, what's coming, what's deferred. Reads against the Initiatives section: Initiatives are "the bets we're making"; Roadmap is "when each lands." The two should feel like the same data viewed two ways.

### What it contains
- **Time-banded swimlane** — three columns:
  1. **Now (this week / next 2 weeks)** — concrete deliverables. May 5 team review session, GitHub Actions brief decision, Welcome rebuild template freeze, Collector's Clock A/B configuration.
  2. **Next (3–8 weeks)** — sized initiatives with target dates. Reactivation E1 broadcast (gated on Phase 2 CIO auth), Welcome rebuild deploy, PR amplification test, Whale concierge weekly read.
  3. **Later (8+ weeks / discovery)** — Arc Moment minting, Announcement-day mint window, post-pack guided next step, owned content surface (Phase 3 distribution).
- **Time-anchored event spine** — playoff dates that anchor the calendar (R2 dates, Conference Finals, Finals, Draft Lottery May 12). Each event is a card in the swimlane that affects ALL initiatives.
- **Dependency arrows** — visual: Reactivation E1 depends on (CIO Phase 2 auth + BQ IAM fix). Welcome rebuild depends on (template-system v1004 deploy). Drawn lightly; do not let dependencies dominate the visual.
- **Killed/deferred carousel** at the bottom — Whale-Tier email design (`2026-05-04-whale-tier-deferred.md`) is initial entry. Items moved here have a `deferred` or `killed` status badge plus rationale.

### Data sources
- Editorial roster: `collect-hq/strategy/2026-05-04-playoff-campaign-calendar.md`.
- Initiative dependency map: cross-references to `collect-hq/strategy/` files plus the SoT.
- BigQuery `dapperlabs-data.product_calendar` if exposed (currently not — flagged).

### Page layout
Three-column kanban-style swimlane. Cards within each column are stack-ordered by date. Top-strip: timeline ribbon showing playoff event anchors. Sticky filter at top: by surface (email / in-app / community / product), by stage (proposed / pre-launch / iterating / blocked), by owner.

### Voting / feedback integration
Per-card voting on roadmap items (`accelerate this` / `de-prioritize` / `kill`). Aggregated to Initiatives. Per-column votes are NOT shown — voting is always per-deliverable.

### Confidence treatment
Each card carries an `ETA confidence`: how likely is this to ship on the stated date. Three levels: solid (>0.8), wobble (0.5–0.8), aspirational (<0.5). Roadmap items in `Later` are aspirational by default. Cards with blockers show the blocker icon and link to the blocking GAP or Open Question.

### Cross-product behavior
Three swimlanes per product on the home roadmap; OR per-product roadmap pages. Recommended: one combined swimlane with product-color-coded cards (Top Shot flame; Pinnacle indigo; NFL forest). When a product has no items in a band, render `Pinnacle: no Now items currently tracked` instead of empty space.

---

## 6. KPIs

### Purpose
Numbers, not narratives. The single page where current health of the NBA Top Shot funnel and the sibling-product equivalents lives. Auto-refresh weekly via Heimdall + Mixpanel pipelines.

### What it contains
- **Lifecycle-tier KPI tiles (5)** — one per L0–L4. Each tile shows current cohort size, week-over-week delta, anchor metric (e.g., L2 tile shows W0 conversion %, current vs. Welcome #132 era vs. dark-window). Critical: tiles frame against the L+XL funnel lens — every metric explicitly states "this matters because it shifts the funnel into L by X" per the user feedback rule.
- **Funnel visual (Signup → First Purchase → Engaged → XL)** — horizontal bar with conversion percentages between stages: signup → D7 first purchase 8.54% (dark-window) / 6.75% (Camp 132 era). D30: 8.76% / 6.99%. First purchase → engaged (challenge participation): 14% (vs. 30% NFL benchmark). Engaged → XL: not currently measured (GAP).
- **L+XL retention chart** — XL whale share of revenue (66–83%); count of active L+XL whales over rolling 30d; dormant L+XL pool (1,122 holding $234.6M).
- **Email channel benchmarks card** — Top Shot Camp 132 (44.2% / 12.8% / GAP placed-order rate) vs Camp 163 (~32% / 4.46% / GAP) vs Skybox (63.6% / 8.3% / 7.1%). Highlighted: voice-register 3× CTR multiplier.
- **Demand-mode tiles** — Phase 1 (Uncertain) / Phase 2 (Announced Spike: 2–4× within 24h) / Phase 3 (Plateau: 1–3/hr) / Phase 4 (Closed: theory-only, GAP §7.2).
- **Pack drop revenue band** — Tier A ($500K–$1M+), Tier B ($100–300K), with dotted line and `GAP §7.11` ("per-drop revenue not yet pulled").
- **Stack delivery KPIs** — number of running campaigns, broken-in-prod count (currently 1: Fast Break Daily template 1133), 0-state counts.
- **Causal spend lift readout (when available)** — currently ALL `GAP §7.10` (no measurement infrastructure). The page is loud about this absence — a single full-width red strip at the top: "Primary KPI — causal spend lift — currently unmeasurable. Three blockers: BQ IAM, CIO→Mixpanel campaign_id, holdout group config. Owner: Eng + Magic." This is the most important communication on the page.

### Data sources
- BigQuery `dapperlabs-data` (Heimdall Tier 1/Tier 2 — refresh weekly cron).
- Mixpanel project 2160283 (`research-reports/data-science-insights/mixpanel-queries/` — cached + live).
- Customer.io API (campaign metrics).
- NBA Top Shot public GraphQL (marketplace floor / volume per player).

### Page layout
Top: the causal-lift red strip (full width, can't be missed). Then two rows of 5 lifecycle tiles each (or 1 row of 5 with collapsed sub-tiles on mobile). Then the funnel visual (full width, horizontal). Then a 2-column grid: left column = L+XL retention chart + dormant whale callout; right column = email channel benchmarks + voice-multiplier card. Then demand-mode tiles (4 across). Then pack drop revenue band. Then stack delivery KPIs at the bottom as a small chip strip.

### Voting / feedback integration
Per-tile, the `is this the right metric?` vote — three options (`yes, primary` / `secondary` / `cut`). Roham's votes here directly drive what's shown most prominently. New metrics can be requested via a `propose a metric` ghost link at bottom.

### Confidence treatment
finance-hq's three-tier circle legend (green / yellow / red, plus unfilled = unknown) is adopted directly, with one extension: `GAP` badge replaces the unfilled circle when there's a documented remediation path. This makes "we don't know" actionable instead of just absent.

### Cross-product behavior
Sibling products get the same tile-template but with `GAP` badges where the BQ schema doesn't reach (e.g., Disney Pinnacle BQ schema is per Persii, not in Top Shot's purview; the Pinnacle KPI tab renders the template and links to Persii's surface). The cross-product synthesis tile lives at the bottom of the Top Shot KPI page: "Cross-product whale overlap — collectors active on both Top Shot and Pinnacle: not yet measured. Filed for cross-product synthesis."

---

## 7. Research

### Purpose
The intelligence stream — every finding, every signal, every collector quote, sourced and dated. The two-tier system from finance-hq, extended to three tiers because Top Shot has a community.

### What it contains
- **Three-tier feed**:
  1. **Data Findings** — internal, Heimdall-derived (BQ + Mixpanel). Examples: F-MAGIC-01 floor-sweep vs. organic; Camp 163 V2 onboarding investigation; Embiid 3.2× certainty premium; Pistons G5 21× volume lift.
  2. **Market Signals** — external, Frigga-derived (xAI x_search / WebFetch / news triggers). Examples: Topps NBA license return; MTG Bloomburrow new-player uptick; Sorare 35% layoff and Solana migration; Nike SNKRS Reserve mechanic; Fanatics Fest exclusive drops.
  3. **Collector Voice** — qualitative, sentiment-tagged. Examples: "proof moment" / "incomplete document" / "name getting heavier" — community language adoption observations from `2026-05-03-top-shot-as-documentary-system.md`. Future: Discord scrapes, X mentions, support ticket themes (Kenny Zamora's queue).
- **Per-card structure** — each card shows: title, date, tier (Data / Market / Voice), confidence (0.0–1.0) for Data and Market; sentiment (positive / negative / neutral) plus volume estimate for Voice. Body: a 2–3 line mechanism statement (NOT a vibe — what activity produced this?). Footer: source citation (file path renders as link to GitHub blob + summary; never as raw path).
- **Filter / sort chips** — by tier, by date range, by confidence threshold, by surface (email / marketplace / drops / community), by tag (playoffs / reactivation / drop-cadence / competitive).
- **"Commission a finding" form** — extending finance-hq's Commission a Report. Anyone at Dapper can post a research request: "I want a Heimdall analysis of X" or "I want a Frigga teardown of Y." Lands in Open Questions.
- **Stream sub-pages** — `/research/data` (Data Findings only), `/research/market` (Market Signals only), `/research/voice` (Collector Voice only), `/research` (combined feed sorted by date).

### Data sources
- File scan: `collect-hq/data-reports/findings/` for Data Findings.
- File scan: `collect-hq/nba-top-shot/intelligence/*competitive*` and Frigga briefs for Market Signals.
- xAI x_search live for fresh sentiment in Collector Voice; cached Discord/X scrapes in `collect-hq/community/sentiment/` (folder TBD — currently a `GAP §7.8` for the canonical sentiment store).
- Mixpanel cached queries for Data Findings backed by event-level evidence.

### Page layout
Default view: combined feed, reverse-chronological. Each card is full-width on mobile, half-width on desktop. Three filter chip rows at the top. Toggle between "feed" and "tier-grouped" views. Hover state on cards reveals the source-of-truth file path link and a confidence breakdown (what's the 0.86 made of: mechanism 0.9, sample 0.8, replicability 0.85).

### Voting / feedback integration
Per-card voting (`actionable` / `interesting but not actionable` / `disagree with the finding`). Card-level comment thread (Roham's review patterns shape future research priorities). Aggregated votes on `disagree` >2 trigger a Heimdall re-run or a Frigga re-scan.

### Confidence treatment
Numeric 0.0–1.0 score with three components on hover: mechanism strength, sample size adequacy, replicability. Below 0.6 → card gets a yellow tint and a `low confidence — what would close this?` ghost link. Collector Voice cards don't carry numeric confidence; they carry source count (`23 community posts`, `5 Discord mentions`) and a sentiment chip.

### Cross-product behavior
Tier-1 (Data) cards are NBA-specific because BQ data is product-segregated. Tier-2 (Market) cards are explicitly cross-product when relevant — a Topps Hoops finding might be tagged `nba-only`, while a Sorare layoff is tagged `cross-collectible`. Tier-3 (Voice) is product-tagged. Sibling products: Pinnacle and NFL each have their own `/research/<product>` index with `GAP` badges where their feeds are sparse.

---

## 8. Open Questions

### Purpose
The decision log. Questions that block work, questions that we're watching, decisions that landed. The single place to file "we need X to know Y" — and the single place to celebrate when X arrives and Y unlocks.

### What it contains
Three sub-sections (adopted from finance-hq):

- **Top blockers** — questions blocking active work. Each card: question ID (Q-DORMANT-SIZE / Q-CIO-AUTH / etc.), question text, owner, status (`in-flight` / `open` / `awaiting`), due date, what's blocked. Cards are stack-ranked by leverage. Initial set maps to SoT §7 GAPS:
  - Q7.1: Actual dormant cohort sizes (BQ IAM fix — Eng).
  - Q7.4: CIO send authorization (Phase 2) — Roham/Dan decision.
  - Q7.10: Causal spend lift measurement infrastructure — Eng + Magic.
  - Q7.5: CIO → Mixpanel campaign_id attribution — Eng P2.
  - Q7.9: Atlas consumer schema in BQ — Eng provisioning.
- **Watch list** — questions we're monitoring but don't block immediate work. Q7.2 (Post-G7 price discovery), Q7.6 (Panini / Fanatics Live / Disney Pinnacle competitive), Q7.8 (Collector sentiment store), Q7.11 (Pack drop revenue), Q7.12 (Morning vs. same-night email timing A/B).
- **Recent wins** — questions that landed. Initial seed: Camp 163 root cause resolved (variance decomposition: 80% content / 20% deliverability). The Three-Phase Demand Model documented through Phase 3.
- **`/gaps` index** — a child route listing all 12 documented gaps from SoT §7, each as its own page with: gap statement, what would close it, who owns the close, current blockers, downstream-need (which Phase 3 cascade depends on it).
- **Commission form** — file a new question. Posts to `/api/feedback` with type `commission` and routes to the appropriate owner.

### Data sources
- SoT §7 (GAP LIST) is the seed.
- File scan of all `collect-hq/**/*.md` for content matching `(NOT IN SOURCES)` or `GAP §` or `pending` to surface emerging questions.
- GitHub issue cross-link: any `gh` issue tagged `collect-hq-gap` mirrors here.

### Page layout
Three vertical sections stacked: blockers (top, biggest cards), watch list (middle, narrower cards), recent wins (bottom, slim cards in a stripped-back style). Filter chips: by owner, by phase-blocked, by ETA. Sticky `commission a question` button.

### Voting / feedback integration
Per-card voting (`urgent` / `important` / `nice-to-have`). Aggregated leverage score reorders the blocker stack. Per-question comment thread.

### Confidence treatment
Each blocker shows a `time-to-close` confidence: how confident are we that this gets resolved by ETA. Three states: tracking (green), at-risk (yellow), stuck (red). Stuck blockers escalate visually — a red border + a `who's unblocking this?` callout.

### Cross-product behavior
Questions are product-tagged. Cross-product questions (e.g., whale crossover analysis) get a special purple `XP` chip and live on a `/open-questions/cross-product` sub-route, recognized by the Roham + cross-product synthesis flow described in CLAUDE.md.

---

## 9. Team

### Purpose
Who's working on what. Replaces the "who do I ask about Pack Received?" Slack hunt. Reads as the relationship-layer index — Top Shot's relationship surface is distributed across humans (per CLAUDE.md), so the Team page makes that distribution legible.

### What it contains
- **Roster card grid** — one card per human partner. Initial set:
  - **Roham Gharegozlou** — CEO. Role: principal / coach. Decision authority: org-wide.
  - **Dan Carreiro** — Top Shot product DRI. Role: bridge eng↔producers; whale feedback into roadmap.
  - **Matt Schorr** — Executive Producer + Head of Growth. Role: L+XL relationship surface, 104 Card.
  - **Sam Williams** — Named editor. Role: voice. 3× CTR multiplier.
  - **Guy** — Producer (content + economy).
  - **Sam (other Sam)** — Producer (content + economy).
  - **Kenny Zamora** — Lead Customer Support Agent. Role: reactive support, fast-resolution escalation, whale-tagged ticket triage.
  - **Jim Wheaton** — Atlas campaign builder owner.
  - **Neil Laessig** — Fast Break engineering.
  - **Jordan Wagner** — Fast Break sole operator.
  - **Persii** — Disney Pinnacle Show Runner (cross-product peer).
  - **Magic** — Show Runner + Intelligence Agent. (Self-card; declared.)
- **Per-card content** — name, photo (where licensed), role, what they own, current focus (latest IDP entry summary or a fresh "currently working on" line), preferred contact channel, link to their IDP at `projects/people/idps/<slug>.md`.
- **Org diagram strip** — lightweight visual showing Top Shot's pod structure (Eng / Producers / Growth / Support) with Roham as the principal.
- **"Who do I ask?" decision tree** — short Q&A: "Ask Sam W about voice. Ask Dan about roadmap. Ask Matt about whale relationships. Ask Kenny about escalating a support ticket. Ask Magic about — well, anything; route from there." Mirror of `wiki/for-everyone/team-structure.md`.

### Data sources
- `wiki/for-everyone/team-structure.md` (source of truth).
- `projects/people/idps/<slug>.md` for individual IDPs.
- `gws sheets query Team Roster A-Z` for live roster (refresh weekly).

### Page layout
Card grid (3-wide on desktop, 2 on tablet, 1 on mobile). Above the grid: a horizontal pod-strip showing the four pods. Below the grid: the "who do I ask?" decision-tree block.

### Voting / feedback integration
Team cards do NOT have voting. (Voting on people is the wrong primitive.) They DO have a `request a 1:1` ghost link → opens a calendar suggestion form (uses Google Calendar MCP for availability).

### Confidence treatment
Not applicable — roster data is canonical, not probabilistic. The "currently working on" line carries a freshness timestamp; if older than 14 days, it shows a faint `data may be stale` chip with a refresh trigger.

### Cross-product behavior
Persii is a sibling Show Runner. Other product producers (Pinnacle, NFL) get cards on this page when known, with the role marked `(Pinnacle)` / `(NFL ALL DAY)` so cross-product context is legible. Anyone working only on a non-NBA product is shown faded — visible but not a full card — to keep the page Top-Shot-led.

---

## Mid-stream verify (sections 1–4 read against each other)

After drafting Home / Stack / Initiatives / Personas, the four read as a coherent hub:
- **Home** is the entry point; it links into the other three with concrete tiles.
- **Stack** answers "what are we shipping THROUGH right now?"
- **Initiatives** answers "what are we trying to ship NEXT?"
- **Personas** answers "WHO is each Initiative for, and through which Stack surface?"

The connective tissue is consistent: every Initiative card carries a persona tag (which lifecycle tier? which archetype?) and a stack tag (which surface delivers it?). Every Persona card lists the Initiatives currently aimed at it. Every Stack surface lists the Initiatives shipping through it. This means the four pages cross-link cleanly; a visitor doesn't read them as four separate pages, they read them as one product viewed from four angles.

The remaining four (Roadmap / KPIs / Research / Open Questions / Team) extend this:
- **Roadmap** is Initiatives × time.
- **KPIs** is Personas × measurement.
- **Research** is the evidence base feeding Initiatives + Personas.
- **Open Questions** is what blocks Initiatives + KPIs from being measured.
- **Team** is who owns each.

The hub-and-spoke holds.

---

## Spot-read self-verification (Site Builder readiness)

A Site Builder agent can take this spec and produce working Next.js routes because:
1. Each section names its **route** (`/`, `/stack`, `/initiatives`, `/initiatives/<slug>`, `/personas`, `/roadmap`, `/kpis`, `/research`, `/research/data`, `/research/market`, `/research/voice`, `/open-questions`, `/open-questions/cross-product`, `/gaps`, `/gaps/<id>`, `/team`).
2. Each section names its **data source** at file or query level.
3. Each section specifies **layout primitives** (column counts, sticky elements, card grids).
4. Each section specifies **interaction primitives** (per-card vote payload, comment, commission form).
5. Each section specifies **cross-product fallback** so sibling products don't render as broken pages.

Outstanding for the Site Builder (filled here so they aren't gaps):
- **`/data/portfolio.json` schema** — defined (product, lifecycle stage, anchor metric, anchor metric source, last-updated timestamp).
- **`/data/initiatives.json` schema** — defined (id, slug, title, mechanism, stage, kpi, kpi-target, owner, confidence, persona-tags, stack-tags, blocking-gap-ids).
- **`/api/feedback` payload extension** — extend existing endpoint with: `card_id`, `card_type` (one of: `initiative`, `kpi-tile`, `research-data`, `research-market`, `research-voice`, `open-question`, `roadmap`, `persona`, `archetype`, `stack-campaign`, `stack-surface`), `vote` (one of: `ship`, `needs-work`, `no`, `urgent`, `important`, `nice-to-have`, `accelerate`, `de-prioritize`, `kill`, `actionable`, `interesting`, `disagree`, `yes-primary`, `secondary`, `cut`), `comment` (optional string), `voter` (string).
- **Glossary route** at `/glossary` — child of Home, defines: L0–L4, Type 1–4, Archetype, Lifecycle Tier, A/B/C dormant segments, Phase 1–4 demand model, B-spine / C-evidence-layer, GAP §7.X.
- **Refresh cadence cron** — declared per section; Site Builder ships a stub `cron.ts` with the cadence wired (KPIs weekly Sun 0200 UTC; Stack weekly Mon 0200 UTC; Research live; Initiatives + Roadmap on commit).

---

*Compiled 2026-05-04 by Magic (Information Architect persona).*
*Reference: https://finance-hq-seven.vercel.app/ — six routes inspected (home, research, personas, open-questions, kpis, plus inferred portfolio/teams/roadmap from nav).*
*Companion: `2026-05-04-collect-hq-design-system.md` (visual / brand / component grammar).*
*Status: ready for Site Builder agent. All sections specify route, data source, layout, interactions, confidence treatment, cross-product fallback. Outstanding open question: should `/gaps` and `/glossary` become top-level peers (10 sections instead of 8)? Recommendation: keep them as children to honor the "no invented sections" constraint; promote to peers only if reviewers vote for it.*
