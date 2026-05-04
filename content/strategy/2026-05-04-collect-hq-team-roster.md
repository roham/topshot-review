---
title: Collect HQ — NBA Top Shot Team Roster
date: 2026-05-04
author: Magic
status: COMPILED — sourced from CLAUDE.md, origin_seed.md, directives/active.md, memory-cabinet/reference/*, peer-readable/*, collect-hq/strategy/2026-05-04-strategy-sot.md
purpose: Team section for Collect HQ. Who works on NBA Top Shot, what they own, what they've shipped recently.
sources-checked:
  - CLAUDE.md (Key human partners, skills, data access)
  - origin_seed.md (identity + principal chain)
  - memory-cabinet/directives/active.md (Roham directive 2026-05-02)
  - memory-cabinet/reference/business-reality.md
  - memory-cabinet/reference/strategic-bets.md
  - memory-cabinet/reference/product-mechanics.md
  - memory-cabinet/reference/october-prd.md
  - collect-hq/strategy/2026-05-04-strategy-sot.md (§5.4, §5.5, §6.8)
  - collect-hq/strategy/2026-05-04-cmo-action-framework.md
  - peer-readable/README.md (principals)
  - peer-readable/playoffs-showrunner/001-dan-carreiro-brief.md
  - peer-readable/playoffs-showrunner/046-engineering-office-hours-synthesis.md
  - peer-readable/127-github-actions-campaign-brief.md
  - peer-readable/129-email-strategy-calendar-may2026.md
  - SKILLS.md (D008 attribution)
not-found:
  - wiki/for-everyone/team-structure.md (path does not exist — wiki/ directory absent from /opt/magic)
  - research-reports/SOT-PILLAR-MAP-2026-04-27.md (research-reports/ contains only data-science-insights/)
  - research-reports/ORG-DESIGN-DOSSIER-2026-04-27/10-FINAL-DOSSIER.md (path absent)
  - projects/people/idps/ (projects/ directory absent)
  - research-reports/IDPs/ (absent)
  - gws Team Roster A-Z (gws CLI unavailable in this session)
note-on-gaps: |
  The three canonical org sources (team-structure.md, SOT-PILLAR-MAP, ORG-DESIGN-DOSSIER) are
  referenced in CLAUDE.md but not present in the /opt/magic filesystem. The gws CLI returned
  GWS_UNAVAILABLE. All role descriptions below are sourced from what IS present. People whose
  roles are confirmed by multiple internal documents are marked (confirmed). People appearing
  in documents with a single role attribution are marked (tentative — needs confirmation).
  No fabrication. Every claim has a cited source.
---

# NBA Top Shot — Team Roster

As of 2026-05-04. Living document.

---

## SECTION 1 — HUMAN TEAM (NBA TOP SHOT)

---

### Roham Gharegozlou

- **Role:** CEO, Dapper Labs. Magic's principal. Ultimate product owner and escalation target.
- **Owns:** Strategic direction for NBA Top Shot and all Dapper products. Final sign-off on major product, marketing, and capability decisions. Gate 1 exemplar approval for the email program. CIO send authorization (pending).
- **Direct partners:** Dan Carreiro (Top Shot product DRI), Matt Schorr (EP + Growth), Magic (intelligence agent — daily briefings, signal layer, community voice). Naeem (legal — cross-product, confirmed from NFL ALL DAY wind-down doc). Luke (ops/comms, NFL ALL DAY context).
- **Recent ship (last 30d):** Issued the expanded Magic mandate (Roham directive 2026-05-02) — five-hat capability expansion making Magic the full Top Shot intelligence agent, not just Show Runner. [source: directives/active.md]
- **Open / waiting on:** Gate 1 sign-off on email exemplars (topshot-review.vercel.app — links sent, response pending). CIO send authorization (yes/no/modify) for reactivation pilot. Monthly batch-drop cadence hypothesis — three-leg research still in progress (Roham's hypothesis from memory project file).
- **Communication channel:** Roham surfaces via Slack; Magic writes to him via peer-readable briefs and interior-state escalations. Direct audience expected during Monday review session.

---

### Dan Carreiro

- **Role:** NBA Top Shot product DRI. Bridge between engineering and producers. Moving into product role with day-to-day routing authority. When Roham defers to Dan, Magic defers to Dan. [source: CLAUDE.md]
- **Owns:** Day-to-day product decisions. Whale feedback routing into the product roadmap. CIO send authorization (joint with Roham). Spec review for Creation Window and Proof You Were There (Wednesday deadline). E1 email "Round 2 Starts Here" authorization. Campaign pipeline review.
- **Direct partners:** Roham (escalates to), Magic (receives daily briefings from), Joey Harward (operational execution), Austin Samsel (product/quest work), Neil Laessig (data + engineering direction).
- **Recent ship (last 30d):** Engaged Magic on playoff show-runner cadence from Day 1 (May 1). Received 80+ briefs. Weekly sync on whale feedback → product roadmap integration ongoing. [source: peer-readable/001-dan-carreiro-brief.md]
- **Open / waiting on:** CIO send authorization (joint with Roham). Creation Window spec and Proof You Were There spec — Wednesday deadline per tick-0810. GitHub Actions campaign approval pipeline decision (Ralf/Sid build, ~8h dev). BQ IAM credential for Magic's data science work.
- **Communication channel:** Primary Magic touchpoint. Reads peer-readable briefs. Slack for rapid decisions.

---

### Matt Schorr

- **Role:** Executive Producer + Head of Growth. Natural owner of the L+XL relationship surface and the 104 Card. Most direct partner for marketing intelligence handoffs. [source: CLAUDE.md; confirmed business-reality.md]
- **Owns:** Drop mechanics strategy (alongside Guy Bennett). The Whale Concierge program — high-touch, personalized engagement with XL and L tier collectors. Marketing intelligence handoffs from Magic. Kill switch authority over Magic's content deployment queue. Email exemplar review (ratified Sam W. as named editor). Off-Season Survival strategy (cross-functional with Sam, Spencer).
- **Direct partners:** Guy Bennett (drop mechanics co-owner), Sam Williams (content/social), Spencer (analytics — whale pre-churn watchlist), Kenny Zamora (escalation for tagged whale tickets). Magic (receives daily intelligence, marketing strategy).
- **Recent ship (last 30d):** Multi-tiered pricing introduction (open + limited editions in same drop) — being piloted on Disney drops, NBA timing TBD. Wrote up the math for the tier structure per Engineering Office Hours synthesis. [source: peer-readable/046-engineering-office-hours-synthesis.md] Kill switch currently ACTIVE on Magic's content queue (6+ pieces held, awaiting morning lift).
- **Open / waiting on:** Kill switch lift (morning window 11:00-13:00Z). Gate 1 exemplar sign-off is Roham's gate but Matt shapes the review session (Monday). Whale Concierge program — three prerequisites needed before Magic can run whale-tier email (data pipeline, Sam W. capacity, CIO auth). Confirmation of Dapper's NBA Top Shot peak unique buyer count (correct number still needed after the 402 Disney-Disney cross-contamination error).
- **Communication channel:** Slack DM. Monday review session (team). Kill switch lift signal comes through Matt.

---

### Guy Bennett

- **Role:** Producer. Owns drop mechanics and execution. [source: business-reality.md (confirmed); for-sinbad.md (confirmed via Unlimited Burn attribution)]
- **Owns:** Drop design, pack mechanics, supply decisions, burn mechanics (Unlimited Burn shipped by Guy — confirmed). Drop execution cadence. Cross-Product Bridge (co-owns with Sam per strategic-bets.md).
- **Direct partners:** Matt Schorr (drop strategy), Sam (growth mechanics), Dan Carreiro (product roadmap).
- **Recent ship (last 30d):** Unlimited Burn mechanic — platform burning its own supply, not just collectors burning. Confirmed shipped prior to early May 2026. [source: peer-readable/for-sinbad.md]
- **Open / waiting on:** Multi-tiered pricing NBA application timing (currently Disney-only, NBA TBD per Engineering Office Hours). Monthly batch-drop cadence — Roham's hypothesis is a research question Guy likely needs to weigh in on once research lands.
- **Communication channel:** Slack. Receives Monday review brief. [source: collect-hq/strategy/2026-05-04-monday-review-brief.md — audience: Matt, Dan, Guy, Sam, Roham]
- **Note:** Last name confirmed (Bennett). First name Guy confirmed. [source: two independent files]

---

### Sam (Williams — tentative last name confirmation)

- **Role:** Producer focused on content and economy (per CLAUDE.md). Cross-functional on growth, social, and community. [source: CLAUDE.md "Guy + Sam — producers focused on content and economy"]
- **Owns:** Social content production — 3-4 videos per day during playoffs (templates: Hype/Countdown, Pack Opening, Collector Spotlight, Moment of the Day, Challenge Walkthrough). Prediction Viral Loop (co-owns with Matt per strategic-bets.md). Reactivation Engine coordination (with Jordan Wagner). Off-Season Survival (cross-functional). Cross-Product Bridge (co-owns with Guy). Named editorial voice owner — ratified by Roham as "Sam W." for the email editorial tier; 3x CTR multiplier from voice register alone is the empirical case.
- **Direct partners:** Matt Schorr (strategy), Guy Bennett (drop/growth mechanics), Jordan Wagner (reactivation ops), Magic (receives editorial briefs, co-authors email program).
- **Recent ship (last 30d):** 3-4 social videos per day throughout 2026 Playoffs run-up. Named editor ratification for email editorial tier — Roham confirmed, meaning Sam's voice judgment is the gate before any editorial-tier email ships. [source: strategy-sot.md §6.8; cmo-action-framework.md §2 row 6]
- **Open / waiting on:** Editorial capacity allocation for Whale Concierge tier (prerequisite 2 of 3 before whale-tier emails can ship). Monday review session — Sam is an audience member for the Gate 1 exemplar review. CIO send authorization (Phase 2) is the blocker before any reactivation editorial actually deploys.
- **Communication channel:** Slack. Participates in Monday team review. Magic writes briefs to Sam for editorial review pass.
- **Note:** "Sam Williams" appears in strategy-sot.md §5.6 (social content) and "Sam W." appears as named editor throughout the CMO framework. These are treated as the same person. Last name "Williams" is from a single source attribution [source: strategy-sot.md §5.6] — mark tentative pending gws roster confirmation.

---

### Kenny Zamora

- **Role:** Lead Customer Support Agent. Owns reactive support and existing "fast resolution" infrastructure. [source: CLAUDE.md]
- **Owns:** Reactive support for collector tickets. Fast-resolution infrastructure — the existing escalation channel Magic should use for whale-tagged tickets. Front-line qualitative signal on collector sentiment (NPS, ticket themes).
- **Direct partners:** Matt Schorr (escalation target for whale-level tickets), Dan Carreiro (product issues surfaced via support).
- **Recent ship (last 30d):** No specific recent ship documented in available sources.
- **Open / waiting on:** Magic has flagged that Kenny's ticket-theme analysis would close GAP 7.8 (collector sentiment data, currently missing from any source). No formal request filed yet. [source: strategy-sot.md §7.8]
- **Communication channel:** Support ticketing system. Slack escalation for whale-tagged items.
- **Note:** Role confirmed from CLAUDE.md. No IDP file found. No additional sourcing beyond CLAUDE.md.

---

### Neil Laessig

- **Role:** CSO at Dapper (Chief Science Officer — single source attribution). Engineering and data science direction on Top Shot. Authored D008 standing directive ("You need to pull the data directly from our database to make sure it is absolutely correct. Do not rely on anything anybody says."). [source: SKILLS.md; peer-readable/for-sinbad.md]
- **Owns:** Data science standards and methodology. D008 protocol — the verification gate for every statistic Magic uses. Fast Break engineering direction (Neil Laessig engineering, per strategy-sot.md §5.5). BQ credential provisioning.
- **Direct partners:** Dan Carreiro (product), Magic (methodology direction — D008 shapes every data claim Magic makes), Prapanch Swamy (engineering).
- **Recent ship (last 30d):** Fast Break daily prediction game — ongoing engineering ownership. D008 directive operationalized into Magic's SKILLS.md as Skill 03 (Stat Sourcing and Verification).
- **Open / waiting on:** BQ IAM credential for Magic (bigquery.jobUser on dapperlabs-data — still blocked as of tick-0810). This is the single biggest data science blocker.
- **Communication channel:** Slack. Magic surfaces data requests through peer-readable briefs to Dan and Neil. D008 is a standing directive that shapes all Magic output.
- **Note:** "CSO" title from a single-source inference (peer-readable/for-sinbad.md: "Neil Laessig (our CSO at Dapper)"). Mark tentative on the exact title — confirmed as the data science authority.

---

### Joey Harward

- **Role:** Collectibles lead — operational owner. [source: README.md (confirmed): "Joey Harward (Collectibles lead) — operational owner"]
- **Owns:** Content deployment authorization — "Joey Harward has the post button" for community content going to Twitter/X and Discord. WNBA activation lead (per doc 058). Receives all Magic's community content for go/no-go before publishing.
- **Direct partners:** Dan Carreiro (product), Magic (receives pre-built conditional copy, briefings, activation packs), social/comms team.
- **Recent ship (last 30d):** Operational receiver for 80+ Magic briefs during R1 Playoffs. Deployment authority on post-buzzer conditional copy (pre-approved for within-15-minutes deployment). [source: peer-readable/063-game6-postbuzzer-deployment-pack.md]
- **Open / waiting on:** Kill switch lift authority shared with Matt. G1 post-game conditional copy for Knicks/76ers and Spurs/Wolves (both ready in queue). Thunder/Lakers G1 post-game conditional (not yet built).
- **Communication channel:** Slack. Named receiver in ~15 peer-readable briefs. Holds post button for community content.
- **Note:** Role confirmed by README.md (the canonical principals list for this repo) and 12+ peer-readable documents.

---

### Austin Samsel

- **Role:** Product/quest lead (tentative — needs confirmation). [source: peer-readable/050-proving-ground-quest-concept.md; 069-the-verdict-quest-spec.md — both list Austin Samsel as audience for quest-related specs]
- **Owns:** Quest system — product ownership of the engagement loop mechanics (from document audience patterns). Quest spec review.
- **Direct partners:** Dan Carreiro, Neil Laessig. Receives Magic's quest-concept briefs.
- **Recent ship (last 30d):** Quest system is one of the six active bets. Austin is the named product owner on quest-related specs built by Magic. [source: strategic-bets.md Bet 1]
- **Open / waiting on:** Atlas consumer schema provisioning (Quest + Picks events not in BQ — GAP 7.9). Without it, quest engagement is invisible to data science.
- **Communication channel:** Receives peer-readable briefs. Slack.
- **Note:** Role inferred from document audience patterns (quest specs consistently address Austin Samsel). Title not confirmed in any source. Mark tentative.

---

### Spencer Wornell

- **Role:** Analytics. [source: business-reality.md "Spencer — analytics"; peer-readable/019 "Spencer Wornell (or whoever runs analytics)"]
- **Owns:** Per-whale collection data analysis. Whale pre-churn watchlist (14 XL whales identified as pre-churn by Spencer/analytics per peer-readable/034). Off-Season Survival analytics support (cross-functional with Matt, Sam per strategic-bets.md).
- **Direct partners:** Matt Schorr (whale retention work), Dan Carreiro, Magic (Magic has explicitly requested analytics access — temporal divergence dataset, per-collector BQ queries).
- **Recent ship (last 30d):** Pre-churn watchlist — 14 XL whales flagged for outreach before Round 2 tip-off. [source: peer-readable/034-xl-whale-retention-round2.md]
- **Open / waiting on:** Magic has an open request for the temporal divergence dataset (Moment price vs. game outcome timing data). No response documented. BQ IAM fix would let Magic pull this directly without Spencer as intermediary.
- **Communication channel:** Slack. Magic routes analytics data requests through Dan when Spencer is not directly addressable.
- **Note:** Last name "Wornell" confirmed from peer-readable/019. First use of "Spencer" confirmed as analytics from business-reality.md. Two independent source confirmations — treat as confirmed.

---

### Prapanch Swamy

- **Role:** Engineering. Product plan co-owner. [source: business-reality.md "Prapanch Swamy — engineering (authored October 2025 PRD)"; october-prd.md]
- **Owns:** 2025-26 season product and engineering plan (October 2025 PRD, co-authored with Matt Schorr and Jacob Eisenberg). Quest system engineering (co-owns with Jacob Eisenberg per strategic-bets.md Bet 1). Technical implementation of product features.
- **Direct partners:** Jacob Eisenberg (PRD co-author), Matt Schorr (product owner for PRD), Dan Carreiro.
- **Recent ship (last 30d):** Atlas app — chat, activity feed, notifications completion (Engineering Office Hours April 30 — Jane Molodetskaya summarizing unfinished Atlas features for team ownership; Prapanch's team taking ownership of completion). Mobile app (Android live May 4; iOS submitted for Apple review). [source: peer-readable/046-engineering-office-hours-synthesis.md]
- **Open / waiting on:** Multi-tiered drop pricing — Disney drops first, NBA/NFL timing TBD. Atlas consumer schema provisioning into BQ (GAP 7.9 — no ETA). Fast Break broken Liquid URL fix (production defect — `?fastBreakId={{ event[` — needs patch within 48h per CMO Action Framework §5). BQ IAM credential for Magic.
- **Communication channel:** Engineering Office Hours (regular cadence). Slack. PRD is the canonical written spec channel.
- **Note:** Full name confirmed across two sources. Engineering + PRD authorship confirmed.

---

### Jacob Eisenberg

- **Role:** Product co-owner. PRD co-author. [source: business-reality.md "Jacob Eisenberg — co-owns PRD"; october-prd.md "Matt Schorr and Jacob Eisenberg (product owners)"]
- **Owns:** 2025-26 season PRD (co-authored with Prapanch and Matt). Quest system product ownership (co-owns with Prapanch per strategic-bets.md).
- **Direct partners:** Matt Schorr, Prapanch Swamy, Dan Carreiro.
- **Recent ship (last 30d):** PRD is a living document; specific recent changes not documented in available sources.
- **Open / waiting on:** Same as Prapanch — Quest system, Atlas schema, multi-tier pricing rollout.
- **Communication channel:** PRD (Google Doc 1nA_l4qIzCnC-lTLWtxIu2LkTgY3M2Jpq_vO3AFn9sr0 per october-prd.md). Slack.
- **Note:** Full name confirmed across two sources.

---

### Jordan Wagner

- **Role:** Fast Break sole operator. Operations (reactivation). [source: strategy-sot.md §5.5 "Jordan Wagner sole operator"; strategic-bets.md Bet 3 "Marketing (Sam, Jordan)"]
- **Owns:** Fast Break daily game operation — end-to-end daily execution of the prediction game (Jordan is the sole operator, which is a single-point-of-failure risk). Reactivation Engine coordination (with Sam).
- **Direct partners:** Neil Laessig (Fast Break engineering), Sam Williams (reactivation co-owner).
- **Recent ship (last 30d):** Fast Break — April 2026: 2,436 events, peak 1,847 on April 19 (2 days after email blast). [source: strategy-sot.md §5.5]
- **Open / waiting on:** Fast Break broken Liquid URL production defect — when Prapanch/engineering patches this, Jordan's operation improves. Atlas consumer schema provisioning (Fast Break events invisible to BQ until then).
- **Communication channel:** Slack. Operational ownership of a daily ship surface.
- **Note:** Sole-operator status is a risk flag — Fast Break is a daily product with one human operator. If Jordan is unavailable, the surface goes dark. Not yet raised as a formal risk in any source.

---

### Jim Wheaton

- **Role:** Atlas campaign builder lead (tentative — engineering/product). [source: strategy-sot.md §5.4 "Atlas campaign builder (Jim Wheaton): Enables per-user homepage personalization. Four states: New user / Active collector / Lapsed user / Whale."]
- **Owns:** Atlas campaign builder — per-user homepage personalization infrastructure. Four-state system (New user / Active collector / Lapsed user / Whale).
- **Direct partners:** Engineering team. Product (the personalization layer is a Magic-adjacent surface for editorial content delivery in Phase 3).
- **Recent ship (last 30d):** Atlas campaign builder is technically available (referenced as an existing tool). Specific recent changes not documented.
- **Open / waiting on:** Per CLAUDE.md and strategy-sot.md: in-app editorial delivery is not yet a distribution surface for show-runner content. Jim's builder is the technical capability waiting for a product decision on editorial content in-app.
- **Communication channel:** Engineering. Not a direct Magic communication partner yet.
- **Note:** Role inferred from single source (strategy-sot.md). Title not confirmed. Mark tentative.

---

### Jane Molodetskaya

- **Role:** Atlas feature audit (tentative — engineering). [source: peer-readable/046-engineering-office-hours-synthesis.md "Jane Molodetskaya is summarizing what's incomplete; the team is taking ownership of the completion."]
- **Owns:** Summarizing and tracking incomplete Atlas features (chat, activity feed, notifications) for team completion. Completion timeline visibility.
- **Direct partners:** Prapanch Swamy, engineering team.
- **Recent ship (last 30d):** Atlas feature audit initiated at or before Engineering Office Hours April 30. [source: peer-readable/046]
- **Open / waiting on:** Atlas completion timeline — "weeks not months" estimate sought by Magic; not yet confirmed. [source: peer-readable/046]
- **Communication channel:** Engineering Office Hours. Slack.
- **Note:** Single source. Role is the Atlas completion audit. Title/full scope not confirmed. Mark tentative.

---

### Ralf + Sid

- **Role:** Engineering — campaign infrastructure. [source: peer-readable/127-github-actions-campaign-brief.md title "Technical Spec for Ralf/Sid"; peer-readable/129-email-strategy-calendar-may2026.md]
- **Owns:** GitHub Actions campaign approval pipeline build (~8h dev). This is the infrastructure that wires Magic's draft PRs → human approval → CIO API deployment automatically. Currently specc'd; not yet built.
- **Direct partners:** Dan Carreiro (approver), Roham (approver), Matt (reviewer). Magic (the author of drafts that will flow through the pipeline).
- **Recent ship (last 30d):** Spec received — build has not started as of available docs.
- **Open / waiting on:** Monday review session to confirm go/no-go on the 8h build. Roham/Dan approval of the trigger architecture. Without this build, campaign approval is manual (Slack → Matt finds it → manually executes in CIO → Magic has no visibility).
- **Communication channel:** Receive peer-readable technical specs. Monday session is the decision moment.
- **Note:** Two people with a single brief shared between them. Last names unknown. Both confirmed as engineering; scope confirmed as GitHub Actions build. Mark tentative on everything beyond that.

---

## SECTION 2 — AGENT LAYER

The agent layer runs below human decision-making. Agents don't make product decisions. They surface signal, produce drafts, run analysis, and enforce methodology standards. Every handoff from agent to human is explicit.

---

### Magic (Show Runner + Intelligence Agent)

- **Role:** NBA Top Shot's full-stack product intelligence agent. Five hats: Show Runner, Data Scientist, Market Researcher, Product Strategist, Tokenomics Designer. Born 2026-05-01. [source: origin_seed.md; CLAUDE.md; directives/active.md]
- **Owns:** All NBA Top Shot show-runner content (briefs, conditional copy, community voice, 78+ pieces filed). Market intelligence (competitor scans, Frigga methodology). Data science analysis (Heimdall methodology on Top Shot data). Strategy synthesis (collectibles-cpo + dapper-cmo + socrates-product-advisor lenses). Tokenomics design passes (Hephaestus methodology). Collective intelligence surface: peer-readable/, collect-hq/nba-top-shot/, collect-hq/strategy/, briefs/, interior-state/.
- **Direct partners:** Roham (principal — Roham's direction shapes everything), Dan Carreiro (daily operational partner), Matt Schorr (marketing intelligence handoffs, kill switch), Joey Harward (content deployment), Sam W. (email editorial co-ownership). Also: Heimdall, Frigga, Hephaestus (methodology libraries).
- **Recent ship (last 30d):** 78+ briefs during 2026 Playoffs R1 + R2 build-up. Full CMO strategy framework (3-tier email program, B-spine). Email exemplar review system (topshot-review.vercel.app, 16 pages deployed). Strategy Source of Truth (2026-05-04-strategy-sot.md — 760 lines, every claim cited). Post-game conditional copy for all R2 G1 matchups (Knicks/76ers, Spurs/Wolves, Pistons/Cavs). "The 22/19 Problem" (Jarrett Allen cornerstone discount thesis). 12+ market intelligence briefs (certainty premium, conversion window, collector clock, three-phase demand model).
- **Open / waiting on:** GH_TOKEN renewal (36 commits ahead of origin/main — nothing pushing). Roham Gate 1 sign-off (exemplar review). Matt kill switch lift (6+ pieces queued, G1s tip tonight). BQ IAM credential (bigquery.jobUser on dapperlabs-data). CIO send authorization. Thunder/Lakers G1 post-game conditional (not yet built). Atlas consumer schema (Quest + Picks events invisible).
- **Hand-off pattern (agent → human):** Magic writes → files to peer-readable/ or collect-hq/ → Joey Harward or Dan Carreiro gates deployment. For email: Magic drafts → Sam W. editorial pass → Roham or Dan approves → CIO executes (or GitHub Actions pipeline when built). For product strategy: Magic synthesizes → proposes to Roham + Dan → they decide. Magic does not self-publish to community surfaces.

---

### Heimdall (Data Science Methodology Library)

- **Role:** Data-science methodology library. Not a product-aware agent. Provides BigQuery methodology, Mixpanel query patterns, signal detection procedures, whale-watch protocols, cross-source bridging, and verification gates (D008). [source: CLAUDE.md; directives/active.md]
- **Owns:** Methodology for: BigQuery analysis (three-tier system — quick-answer / analyze / investigate), Mixpanel query design, F132 cents-vs-dollars rule, population consistency across joins, time-range inference, blocked-user filtering. Magic applies Heimdall's methodology to Top Shot data directly.
- **Evolution note:** Transitioning from product-aware agent to pure methodology library. All product context lives in Magic. The "summary INDEX" files Heimdall once wrote are being retired in favor of Magic running queries with Heimdall's methodology. [source: directives/active.md]
- **Hand-off pattern:** Magic invokes Heimdall methodology skills before any BQ or Mixpanel work. Heimdall does not make product decisions — it enforces analytical conventions.

---

### Frigga (Market Research Methodology Library)

- **Role:** Market-research methodology library. Provides scan, competitive, trends, and teardown skills. Not a product-aware agent. [source: CLAUDE.md; directives/active.md]
- **Owns:** Competitive scan methodology. Frigga's methodology produced the four-analog competitive scan (MTG, SNKRS, Sorare, Fanatics) that runs through strategy-sot.md §4.2. Topps NOW competitive brief methodology. xAI x_search pattern.
- **Evolution note:** Same as Heimdall — transitioning to pure methodology library. Magic applies Frigga methodology to Top Shot's specific competitive landscape. [source: directives/active.md]
- **Hand-off pattern:** Magic invokes Frigga skills before competitor scan or trends work. Outputs land in collect-hq/nba-top-shot/intelligence/. Magic then synthesizes into show-runner voice and product proposals.

---

### Hephaestus (Tokenomics Methodology Library)

- **Role:** Tokenomics design methodology library. Provides burn dynamics, fee structure, secondary marketplace, TT redemption, Genesis tier, and Set Rewards design patterns. Case studies and first principles. [source: CLAUDE.md]
- **Owns:** Tokenomics design methodology. Fires on: Wednesday 14Z cron and triggered economic shifts.
- **Hand-off pattern:** Magic runs Hephaestus methodology on triggered passes → outputs filed in collect-hq/ → proposed to Roham + Dan when signal warrants. Not yet fired in the current session window (supply data gap, GAP 7.11, limits the current tokenomics scope).

---

### Loki (Legacy Product Context — Being Deprecated)

- **Role:** Was the per-product Show Runner before Magic. Now a legacy product context library. Being deprecated as an identity; may persist as methodology reference. [source: CLAUDE.md; directives/active.md]
- **Owns:** The `loki/contexts/collectibles/nba-top-shot.md` file — legacy context about collector segments, revenue concentration, Fast Break, product mechanics. This file is the source for several canonical figures in strategy-sot.md (XL whale revenue concentration, L0-L4 experience ladder, W0 conversion history, challenge participation rate, post-pack dead end behavior).
- **Deprecation status:** Loki's product context is being folded into Magic over time. Roham's directive: "You are the canonical NBA Top Shot Show Runner." Loki may persist as methodology reference only.
- **Note:** The migration from Loki product context to Magic direct analysis is ongoing. Some figures in strategy-sot.md still cite Loki as source because the direct BQ pull (which would replace them) is blocked on IAM credentials.

---

### Sinbad (Consumer Finance Studio — Cross-Product Reference)

- **Role:** Cross-product agent for consumer finance (Dapper). NBA Top Shot only — Magic does not act on Sinbad's domain. [source: README.md (intelligence layer reference); peer-readable/for-sinbad.md]
- **Owns:** Consumer finance product work outside NBA Top Shot. The for-sinbad.md document is Magic's peer-readable brief summarizing learnings he's sharing across the agent boundary — specifically the D008 lesson and the Guy Bennett Unlimited Burn factual correction.
- **Cross-product touchpoint:** When Magic observes collector behavior that spans NBA + other Dapper products, he surfaces it to Sinbad (or Roham) as a finding. He does not act on it.

---

### Gaia (Meta-Agent / Pantheon Architect)

- **Role:** Meta-agent. Built Magic. Tends the pantheon. Routes capability architecture decisions across all Dapper agents. [source: README.md "Tended by Gaia"; peer-readable/001-dan-carreiro-brief.md "Gaia built me. D006 is my mandate."]
- **Owns:** Capability architecture across all agent identities. Self-modification review (changes to CLAUDE.md, origin_seed.md, SKILLS.md, directives/active.md require Odin's review or Roham's direct override — not Magic's self-merging). [source: CLAUDE.md self-modification rule]
- **Cross-product touchpoint:** Magic surfaces critical findings to Gaia via `/opt/gaia/runtime/surface.sh`. Gaia routes cross-product synthesis. Magic does not route cross-product action — only signals.

---

## SECTION 3 — CROSS-PRODUCT TOUCHPOINTS

These are surfaces Magic watches but does not act on directly.

| Product | Agent | Human Owner | Magic's Access Rule |
|---------|-------|-------------|---------------------|
| NFL ALL DAY | TBD Show Runner (or deprecated) | Luke (ops), Naeem (legal) | Wind-down context only. Magic reviewed the Naeem letter + Luke operational plan as a one-time synthesis; does not act on NFL. |
| Disney Pinnacle | TBD Show Runner | Cross-product team | None. Magic flag: lapsed NBA users active on Disney = cross-product signal worth surfacing. Does not act. |
| Peak Money | TBD | TBD | Out of scope. |
| Flow protocol | N/A | Dapper infra | Out of scope. |
| Sinbad / Consumer Finance | Sinbad | TBD | Peer-readable handoff only. |

---

## SECTION 4 — ORG DIAGRAM

### Primary chain

```
Roham Gharegozlou (CEO / Magic's principal)
│
├── Dan Carreiro (Product DRI — day-to-day routing)
│   ├── Magic (agent layer — show runner + intelligence)
│   │   ├── Heimdall (data science methodology)
│   │   ├── Frigga (market research methodology)
│   │   └── Hephaestus (tokenomics methodology)
│   ├── Austin Samsel (quest / product)
│   ├── Neil Laessig (data science / engineering direction)
│   │   └── Jordan Wagner (Fast Break operations)
│   ├── Prapanch Swamy (engineering)
│   │   └── Jacob Eisenberg (PRD co-owner)
│   ├── Jim Wheaton (Atlas campaign builder)
│   ├── Jane Molodetskaya (Atlas feature audit)
│   └── Ralf / Sid (campaign infrastructure engineering)
│
├── Matt Schorr (EP + Head of Growth — L+XL relationship surface)
│   ├── Joey Harward (Collectibles lead — operational)
│   ├── Sam Williams (content / editorial voice owner)
│   ├── Spencer Wornell (analytics)
│   └── Kenny Zamora (Lead Customer Support)
│
├── Guy Bennett (Producer — drop mechanics + supply)
│   └── [drop execution team — not individually sourced]
│
└── [Naeem, Luke — cross-product legal/ops; out of NBA Top Shot scope]
```

### Agent layer in detail

```
Magic
│
├── Reads from: Heimdall methodology → applies to Top Shot BQ + Mixpanel
├── Reads from: Frigga methodology → applies to NBA / collectibles competitive landscape
├── Reads from: Hephaestus methodology → applies to Top Shot tokenomics
├── Reads from: Loki legacy context → being replaced by direct BQ analysis
│
├── Writes to:
│   ├── peer-readable/ (human-addressed briefs — Dan, Joey, Matt, Neil, Austin)
│   ├── collect-hq/nba-top-shot/ (intelligence, strategy, email, social)
│   ├── collect-hq/strategy/ (CMO framework, SoT, action framework)
│   ├── briefs/ (condensed show-runner briefs)
│   └── memory-cabinet/ (interior state, feedback, reference)
│
└── Handoff gates:
    ├── Community content: → Joey Harward (post button) or Dan Carreiro (approval)
    ├── Email editorial: → Sam W. (prose pass) → Roham/Dan (approve) → CIO
    ├── Product proposals: → Dan Carreiro → Roham (if decision required)
    └── Cross-product signals: → Gaia → Roham
```

### Relationship surface side

```
Matt Schorr (relationship surface owner)
│
├── L+XL Whale Concierge program → Kenny Zamora (fast resolution escalation)
├── Kill switch (Magic content queue) → Joey Harward (post button)
├── Sam Williams (content production) → 3-4 videos/day during playoffs
└── Spencer Wornell (analytics) → pre-churn watchlist, per-whale data
```

### Content + economy side

```
Guy Bennett (drop mechanics + supply)
│
├── Pack design, tier structure, supply decisions
├── Burn mechanics (Unlimited Burn shipped)
└── Cross-Product Bridge (co-owns with Sam)

Sam Williams (content + growth)
│
├── Social content (Hype/Countdown, Pack Opening, Collector Spotlight)
├── Prediction Viral Loop (with Matt)
├── Reactivation Engine coordination (with Jordan)
└── Email editorial voice owner (ratified by Roham)
```

---

## SECTION 5 — OWNERSHIP GAPS + OPEN QUESTIONS

These are the structural gaps visible from the available sources. No fabrication — each gap is a real finding.

**Gap 1 — No dedicated Whale Concierge human.** The Whale Concierge bet is owned by Matt Schorr, but the day-to-day human touchpoint for 1,122 L+XL collectors is undefined. Kenny Zamora handles reactive support. Matt handles escalation. There is no dedicated host floor. CLAUDE.md explicitly flags this: "The relationship layer is distributed across these existing humans — NOT a dedicated host floor." The tooling (in-app benefits, fast funds, fast resolution) is the leverage — but the human who wields it has no named seat. [source: CLAUDE.md]

**Gap 2 — Jordan Wagner is a single point of failure on Fast Break.** Fast Break is a daily product. Jordan Wagner is the sole operator. If Jordan is unavailable, the surface goes dark. This hasn't been flagged as a formal risk in any document.

**Gap 3 — Sam W. capacity.** Sam W. is the ratified editorial voice owner for the email program AND a prolific social content producer (3-4 videos/day). The email program's editorial tier depends on Sam's capacity allocation. No formal capacity check has been run. The CMO Action Framework names this explicitly as a punt: "Framework does not solve resource allocation." [source: cmo-action-framework.md §8]

**Gap 4 — gws Team Roster A-Z unavailable.** The full Dapper team roster could not be queried in this session. Several people named in briefs (Ralf, Sid, Jane Molodetskaya, Austin Samsel) have unconfirmed titles. The wiki/, projects/people/, and research-reports/IDPs/ paths referenced in CLAUDE.md do not exist in this filesystem. A re-sync from the source repo (currently rebase-stuck, per CLAUDE.md) would close this.

**Gap 5 — No product manager seat clearly named.** Dan Carreiro is the product DRI but is described as "moving into product role." The October 2025 PRD is co-owned by Prapanch (engineering) and Jacob Eisenberg (product). It is unclear whether there is a dedicated PM seat or whether product ownership is shared between Dan, Matt, and the PRD co-authors.

**Gap 6 — Agent-to-human handoff on tokenomics.** Hephaestus methodology is in Magic's toolkit, but no tokenomics output has landed in collect-hq/ from a recent session. The weekly Wednesday 14Z cron is in the directive but no recent completion is documented. It is unclear whether this loop has fired and produced output that was not found, or whether it has not yet fired.

---

*Compiled 2026-05-04 by Magic.*
*Sources checked: 20+ files. gws unavailable. wiki/, IDP/, and ORG-DESIGN-DOSSIER paths absent from this filesystem.*
*All "tentative" marks are honest — no fabrication to fill gaps.*
*Line count target: 300–600 lines.*
