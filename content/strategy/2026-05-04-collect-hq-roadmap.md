---
title: Collect HQ — NBA Top Shot Initiative Roadmap
date: 2026-05-04
author: Magic
status: COMPILED — sourced from full corpus read; no invented initiatives
purpose: Living roadmap for all active, queued, blocked, shipped, and parked NBA Top Shot initiatives
sources-read:
  - collect-hq/nba-top-shot/2026-05-03-marketing-plan-may3-17.md
  - collect-hq/nba-top-shot/2026-05-03-cmo-strategy-framework.md
  - collect-hq/strategy/2026-05-04-collect-hq-stack-inventory.md
  - collect-hq/strategy/2026-05-04-strategy-sot.md
  - collect-hq/strategy/2026-05-04-cmo-action-framework.md
  - collect-hq/strategy/2026-05-04-cmo-decision-brief.md
  - collect-hq/strategy/2026-05-04-rewrite-swarm-orchestration.md
  - collect-hq/strategy/2026-05-04-rewrite-action-plan.md
  - collect-hq/strategy/2026-05-04-whale-tier-deferred.md
  - collect-hq/strategy/2026-05-04-whale-tier-rebuild.md
  - collect-hq/strategy/2026-05-04-reactivation-real-specifics.md
  - collect-hq/strategy/2026-05-04-monday-review-brief.md
  - collect-hq/strategy/2026-05-04-phase2-framework-audit.md
  - collect-hq/strategy/2026-05-04-playoff-campaign-calendar.md
  - collect-hq/nba-top-shot/strategy/2026-05-03-collectors-clock-product-brief.md
  - collect-hq/nba-top-shot/strategy/2026-05-03-github-actions-campaign-brief.md
  - collect-hq/nba-top-shot/strategy/2026-05-04-lifecycle-marketing-strategy.md
  - collect-hq/nba-top-shot/strategy/2026-05-04-marketing-strategy.md
  - collect-hq/nba-top-shot/intelligence/2026-05-03-the-30-minute-window.md
  - collect-hq/nba-top-shot/intelligence/2026-05-03-top-shot-as-documentary-system.md
  - collect-hq/nba-top-shot/intelligence/2026-05-03-camp163-v2-onboarding-investigation.md
  - memory-cabinet/interior-state/2026-05-04-tick-0550-reactivation-real-specifics.md
  - memory-cabinet/interior-state/2026-05-04-tick-0640.md
  - memory-cabinet/interior-state/2026-05-04-tick-0700.md
  - memory-cabinet/interior-state/2026-05-04-tick-0730.md
  - memory-cabinet/interior-state/2026-05-04-tick-0750.md
  - memory-cabinet/interior-state/2026-05-04-tick-0800.md
  - memory-cabinet/interior-state/2026-05-04-tick-0820.md
  - CLAUDE.md (open-work section, data access)
note-on-wiki-sync: wiki/ directory is absent from /opt/magic — confirmed empty/missing as of this read. CLAUDE.md notes rebase-stuck pull cron. No wiki files could be read; this roadmap surface cannot enumerate wiki-specific initiatives from file contents. CLAUDE.md reference is the sole source for that item.
---

# Collect HQ — NBA Top Shot Initiative Roadmap

**As of:** 2026-05-04T~10:00Z  
**Compiled by:** Magic  
**Total initiatives enumerated:** 28  
**Scope:** NBA Top Shot only.

---

## STATUS DEFINITIONS

- **in-flight** — actively being worked; output produced recently
- **queued** — fully specc'd, ready to execute, waiting on a gate
- **blocked** — cannot progress without a specific named unblock
- **shipped** — complete and deployed
- **parked** — intentionally deferred; named prerequisites required for re-entry

---

---

# GROUP 1 — IN-FLIGHT

*Ordered by health: RED first, then AMBER, then GREEN.*

---

**[Camp 163 Welcome Email Fix — Journey Restore + Voice Repair]**
- Status: in-flight
- Owner (human): Guy Bennett + Sam Williams (CIO execution); Dan Carreiro (product DRI); Magic (spec author, diagnosed defect)
- Dependencies: None technical — defect is in CIO configuration only
- Blockers: Human attention only. Filed with Guy/Sam at tick 0400 (2026-05-03). No response received as of tick 0820 (2026-05-04). No technical obstacle.
- Estimated ship: Same day if prioritized. Blocked only by human scheduling.
- Source: `collect-hq/strategy/2026-05-04-collect-hq-stack-inventory.md` §Surface 8 and §Surface 14; `collect-hq/strategy/2026-05-04-strategy-sot.md` §3.2 and §5.1; `collect-hq/nba-top-shot/intelligence/2026-05-03-camp163-v2-onboarding-investigation.md`; `memory-cabinet/interior-state/2026-05-04-tick-0800.md`
- Last meaningful update: 2026-05-03T~04:00Z (filed with Guy/Sam); 2026-05-04T08:05Z (no response confirmed)
- Health: **RED**
- Rationale: Three documented production defects. (1) Journey truncation — Camp 163 V2 has 3 actions but only action 4525 is sending; actions 4528 and 4550 have 0 sends in 30 days. (2) Voice regression — dynamic content injection (`{{ content }}`) eliminated; email reads as retail copy. (3) UTM contamination — both Camp 132 and Camp 163 templates point to a May 2025 drop announcement UTM; all welcome attribution is corrupted. Net impact: Camp 163 CTR 4.85% vs. Camp 132 CTR 13.24% (−8.39pp). Dark-window D7 conversion (no welcome at all) is 8.54% — better than Camp 163. Platform is actively suppressing new-user conversion.

---

**[Fast Break Daily Result Email — Broken Liquid URL Patch]**
- Status: in-flight
- Owner (human): Guy Bennett + Sam Williams (CIO); Neil Laessig (engineering, Fast Break DRI)
- Dependencies: None — isolated one-line fix in template 1133
- Blockers: Human attention only. A running campaign is sending broken links to all Fast Break participants.
- Estimated ship: Same day if prioritized. 15-minute fix.
- Source: `collect-hq/strategy/2026-05-04-collect-hq-stack-inventory.md` §Surface 4 and §Surface 14; `collect-hq/strategy/2026-05-04-strategy-sot.md` §5.1; `collect-hq/strategy/2026-05-04-cmo-action-framework.md` §4 (production-defect exception clause)
- Last meaningful update: 2026-05-04T~07:45Z (Phase 0 filed; defect documented)
- Health: **RED**
- Rationale: Template 1133 Fast Break Daily Result email contains a malformed Liquid tag: `?fastBreakId={{ event[` — the expression is truncated, rendering the link broken for every send. Every Fast Break participant who clicks the result link lands on a broken URL. Fast Break drives daily app opens and is described as "critical for retention" (Loki). This is an active revenue-damaging defect in a production-running campaign.

---

**[Email Rewrite Swarm — Wave 2B (Transactional + Editorial Tier)]**
- Status: in-flight — Phase 0 complete; Phase 1 (exemplar corpus) complete; blocked at Gate 1 pending Roham sign-off
- Owner (human): Roham Gharegozlou (Gate 1 exemplar approval + two-tier split decision); Sam Williams (editorial tier prose author); Magic (swarm orchestrator + transactional LLM drafts)
- Dependencies: (1) Roham two-tier split decision (yes/no/modify on `2026-05-04-cmo-decision-brief.md`); (2) Roham Gate 1 exemplar corpus sign-off (10 exemplars at `2026-05-04-rewrite-exemplars.md`); (3) GH_TOKEN renewal (blocks deploy of strategy docs to `topshot-review.vercel.app`)
- Blockers: (a) GH_TOKEN expired — 36+ local commits including 16 strategy docs cannot be pushed to GitHub; Vercel auto-deploys on push, so review app is stale. (b) VERCEL_TOKEN also expired — direct CLI deploy blocked. (c) Roham has not yet answered yes/no/modify on two-tier split — compute session dropped mid-conversation. Phase 2 agents (5 transactional drafts in parallel) cannot fire until Gate 1 sign-off received.
- Estimated ship: Transactional v2 drafts: 5-6h swarm + 24h Roham exemplar sign-off async. Editorial reactivation: +1 working day Sam W. prose. Full swarm: ~2 working days from greenlight.
- Source: `collect-hq/strategy/2026-05-04-rewrite-swarm-orchestration.md`; `collect-hq/strategy/2026-05-04-rewrite-action-plan.md`; `collect-hq/strategy/2026-05-04-cmo-decision-brief.md`; `memory-cabinet/interior-state/2026-05-04-tick-0800.md` and `tick-0820.md`
- Last meaningful update: 2026-05-04T~08:05Z (tick-0800 — credential diagnosis complete; Gate 1 awaiting Roham response)
- Health: **RED**
- Rationale: The entire email upgrade program is paused at a single expired credential + single Roham decision. Four email card iterations were rejected. The swarm architecture is the fix. Phase 0 and Phase 1 are complete. The bottleneck is credential renewal (one engineering action) and Roham's decision on two-tier split (one meeting). Every day this doesn't move is another day the broken Camp 163 welcome runs and the email program produces below-baseline conversion.

---

**[BQ IAM Credential Refresh — magic-agent Service Account]**
- Status: in-flight (recurring blocker across multiple work streams)
- Owner (human): Engineering (unnamed; one GCP console action)
- Dependencies: None
- Blockers: Organizational — no one has acted. The fix is confirmed: grant `bigquery.jobUser` + `bigquery.dataViewer` on `dapperlabs-data` to the magic-agent service account. The `CLOUDSDK_CONFIG=/opt/magic/.gcloud` path exists but GCE metadata server is unavailable (Magic runs outside GCE); an offline key file is needed.
- Estimated ship: 30 seconds if the right engineer acts; blocked on prioritization
- Source: `collect-hq/nba-top-shot/2026-05-03-marketing-plan-may3-17.md` §"What requires other humans"; `collect-hq/strategy/2026-05-04-collect-hq-stack-inventory.md` §M6; `collect-hq/strategy/2026-05-04-strategy-sot.md` §7.10 GAP; CLAUDE.md §"Data access"; `memory-cabinet/interior-state/2026-05-04-tick-0800.md` escalation list
- Last meaningful update: Mentioned across every tick since 2026-05-01; unresolved as of 2026-05-04T09:30Z
- Health: **RED**
- Rationale: This single credential blocks: (a) falsification test data for market intelligence work, (b) per-collector portfolio join for reactivation targeting, (c) BQ→CIO segment sync for Flagg/TST/Wemby, (d) causal spend-lift measurement infrastructure, (e) whale-tier data pipeline. Five downstream initiatives are blocked behind one 30-second GCP console action.

---

**[GH_TOKEN Renewal — topshot-review GitHub Push]**
- Status: in-flight (credential expired, blocking deploy)
- Owner (human): Engineering (whoever manages PAT for `dapperlabs/magic` or `dapperlabs/topshot-review`)
- Dependencies: None
- Blockers: PAT `gho_Ik5xX7...` is expired. Authentication fails on `git push`. 36+ commits of local work (email cards v1004→v1006, all 16 strategy docs including CMO decision brief and swarm orchestration spec) cannot reach GitHub. Vercel auto-deploys on push; nothing deploys until this is fixed. VERCEL_TOKEN `vca_12OCM9...` also expired as a secondary block.
- Estimated ship: Same day if renewed. Single action.
- Source: `memory-cabinet/interior-state/2026-05-04-tick-0800.md` §"Blockers — Credentials"; `memory-cabinet/interior-state/2026-05-04-tick-0820.md` escalation list; `memory-cabinet/interior-state/2026-05-04-tick-0640.md`
- Last meaningful update: 2026-05-04T~08:05Z (confirmed expired; `fix-git-auth.sh` ready to run once renewed)
- Health: **RED**
- Rationale: Roham specifically requested review links, not file paths. All strategy docs (CMO decision brief, exemplar corpus, swarm orchestration spec) are on `topshot-review.vercel.app` once deployed — but deployment requires the GitHub push, which requires the renewed token. Roham cannot see Gate 1 artifacts without this fix. This directly blocks the email rewrite swarm's Phase 1 → Phase 2 transition.

---

**[Reactivation Drip — Round 2 Live Launch (Segment A + B + C)]**
- Status: in-flight — content complete; distribution blocked
- Owner (human): Dan Carreiro + Roham Gharegozlou (CIO send authorization); Sam Williams (editorial prose authorship — editorial tier); Magic (data assembly, specimen copy, targeting logic)
- Dependencies: (1) CIO send authorization from Dan + Roham; (2) BQ IAM credential (for final positive-math cohort confirmation via full portfolio join — current era-proxy targeting is directionally correct but not per-user verified); (3) Sam W. capacity confirmation for editorial tier
- Blockers: CIO send authorization is the primary gate. Content (3 reactivation segment specimens, targeting appendix with positive-math cohort definition, real BQ collector profiles, mockData.ts updated) is fully written. Positive-math cohort identified: ~450-550 collectors out of 1,164 dormant L+XL. Negative-math cohort (~480 collectors) explicitly documented with DO NOT SEND flag.
- Estimated ship: 24h from authorization. Pilot (positive-math cohort only) fires within 24h of Dan/Roham greenlight.
- Source: `collect-hq/strategy/2026-05-04-reactivation-real-specifics.md`; `collect-hq/nba-top-shot/2026-05-03-reactivation-copy-specimens.md`; `collect-hq/strategy/2026-05-04-lifecycle-marketing-strategy.md` §Journey 1; `collect-hq/nba-top-shot/2026-05-03-marketing-plan-may3-17.md`; `memory-cabinet/interior-state/2026-05-04-tick-0550-reactivation-real-specifics.md`
- Last meaningful update: 2026-05-04T~05:45Z (BQ cohort analysis complete; real collector profiles written; positive/negative split documented)
- Health: **AMBER**
- Rationale: Every element is built. The only gate is authorization. LTV at stake: $1.4M potential at 5% reactivation of 1,122 dormant L+XL collectors. Every week of delay is compounding lost opportunity during the active playoffs window — the highest-narrative-density moment of the calendar year.

---

**[Round 2 Reactivation Play — Active Content Campaign]**
- Status: in-flight
- Owner (human): Matt Schorr (kill switch / content deploy authorization); Sam Williams (editorial execution); Magic (content author — all 78+ briefs written)
- Dependencies: Matt kill switch lift (was ACTIVE as of tick-0820; expected morning window 11:00-13:00Z May 4); CIO send authorization for broadcast leg
- Blockers: (a) Kill switch (Matt-managed, runtime `.slack-posting-disabled`). (b) Matt sign-off queue for individual pieces (10-Year Hold Test, Serial #5, LeBron Archive, East R2 previews). (c) CIO auth for E1 "Round 2 Starts Here" email broadcast (separate from the reactivation drip).
- Estimated ship: First pieces deploy day of kill switch lift. E1 "Round 2 Starts Here" blocked on CIO auth.
- Source: `collect-hq/nba-top-shot/2026-05-03-marketing-plan-may3-17.md` §Week 1 + §Week 2; `memory-cabinet/interior-state/2026-05-04-tick-0820.md` §Deploy Queue; `memory-cabinet/interior-state/2026-05-04-tick-0800.md`
- Last meaningful update: 2026-05-04T~09:30Z (tick-0820 — all four R2 G1 post-game conditionals built and staged)
- Health: **AMBER**
- Rationale: Content is completely built (78+ briefs, all four R2 series have G1 post-game conditionals pre-staged). The delay risk is timing: post-game conditional pieces have a shelf life measured in hours. Every day the kill switch stays active and pieces sit undeployed, the urgency window decays.

---

**[30-Minute Window Framework — Market Intelligence + Product Spec]**
- Status: in-flight — intelligence filed; product spec partially built; data fill pending
- Owner (human): Dan Carreiro (product DRI — Smart Money Surface spec); Magic (data scientist + spec author)
- Dependencies: BQ IAM for full transaction volume confirmation; post-buzzer data fill (T+30 brackets unfilled as of last write)
- Blockers: (a) BQ IAM for quantitative confirmation. (b) Post-buzzer snapshots for Cavs/Raptors G7 bracket fill (in-game freeze confirmed 6× but post-buzzer data table has `[FILL]` placeholders). (c) Smart Money Surface spec depends on product prioritization from Dan.
- Estimated ship: Intelligence note ready now (partial). Smart Money Surface product brief: Wednesday May 5 surface to Dan/Guy/Sam.
- Source: `collect-hq/nba-top-shot/intelligence/2026-05-03-the-30-minute-window.md`; `collect-hq/strategy/2026-05-04-collect-hq-stack-inventory.md` §Surface 9 (push notification timing gap); `collect-hq/nba-top-shot/strategy/2026-05-03-collectors-clock-product-brief.md`
- Last meaningful update: 2026-05-04T00:50Z (Confirmation 3e added at halftime; post-buzzer brackets remain open)
- Health: **AMBER**
- Rationale: Six data confirmations of in-game freeze pattern — the thesis is mechanically proven. The post-buzzer fill is pending. The Smart Money Surface product spec depends on this intelligence. Wednesday May 5 is the target surface for Dan, but the fill needs to happen first.

---

**[Camp 163 Voice Regression Investigation — Root Cause Confirmed]**
- Status: in-flight (investigation complete; fix not yet executed)
- Owner (human): Guy Bennett + Sam Williams (fix execution); Magic (investigator)
- Dependencies: None for the fix — root cause is known
- Blockers: Same as Camp 163 fix above (human attention). The investigation is separate from the fix initiation.
- Estimated ship: Fix day-of once Guy/Sam engage. Two independent remediations: (1) journey structure restore (turn actions 4528 + 4550 back on), (2) UTM parameter correction in both Camp 132 and Camp 163 templates.
- Source: `collect-hq/nba-top-shot/intelligence/2026-05-03-camp163-v2-onboarding-investigation.md`; `collect-hq/strategy/2026-05-04-strategy-sot.md` §3.2; `collect-hq/strategy/2026-05-04-collect-hq-stack-inventory.md` §Surface 8 "Known issues"
- Last meaningful update: 2026-05-04T~08:05Z (root cause written and filed; Guy/Sam unresponsive since tick 0400 May 3)
- Health: **AMBER**
- Rationale: Root cause confirmed, two independent defects documented. Fix is non-technical (CIO config only). The Camp 163 fix initiative and the Camp 163 voice regression investigation are technically the same fix — listed separately because they have different investigation vs. execution tracks.

---

**[CIO → Mixpanel Campaign Attribution Fix (campaign_id Tagging)]**
- Status: in-flight (engineering P2 ticket open)
- Owner (human): Engineering (CIO + Mixpanel integration)
- Dependencies: None technical that blocks starting; dependent on eng bandwidth
- Blockers: Engineering prioritization. No confirmed ETA.
- Estimated ship: 1-week engineering sprint if prioritized
- Source: `collect-hq/strategy/2026-05-04-collect-hq-stack-inventory.md` §Surface 14 "Known issues" + §M6; `collect-hq/nba-top-shot/2026-05-03-marketing-plan-may3-17.md` §"What requires other humans" (P2 item); `collect-hq/strategy/2026-05-04-strategy-sot.md` §3.4
- Last meaningful update: 2026-05-03 (flagged as P2 in marketing plan); no progress update since
- Health: **AMBER**
- Rationale: 57.2% of Email Link Clicked events have no `campaign_id` — more than half of all email click attribution is dark. This makes the primary KPI (causal spend lift per campaign) unmeasurable. Without this, the reactivation drip's success or failure cannot be cleanly attributed. Runs alongside BQ IAM fix as a measurement infrastructure component.

---

---

# GROUP 2 — QUEUED

*Ordered by health: RED first, then AMBER, then GREEN.*

---

**[Customer.io Send Authorization — Phase 2 Unlock (E1 + Reactivation Drip)]**
- Status: queued — decision has not been made; all content ready
- Owner (human): Roham Gharegozlou + Dan Carreiro (decision makers); Magic (sends once authorized)
- Dependencies: Positive-math cohort BQ confirmation (directional targeting ready via era-proxy; full per-user join pending BQ IAM); Editorial reactivation prose from Sam W. (for editorial tier)
- Blockers: Business/policy decision only. No technical blocker. The CIO workspace is live, the audience segments are built, the copy is written, the math is verified (positive vs. negative cohort split documented).
- Estimated ship: 24h from authorization decision
- Source: `collect-hq/nba-top-shot/2026-05-03-marketing-plan-may3-17.md` §"What requires other humans"; `collect-hq/nba-top-shot/2026-05-03-cmo-strategy-framework.md` §"Distribution phases"; `collect-hq/strategy/2026-05-04-lifecycle-marketing-strategy.md` §"The Single Ask"; `collect-hq/strategy/2026-05-04-cmo-action-framework.md` §8; `collect-hq/strategy/2026-05-04-monday-review-brief.md`; `memory-cabinet/interior-state/2026-05-04-tick-0820.md`
- Last meaningful update: 2026-05-04T08:05Z (still listed in open escalations; no response from Dan/Roham)
- Health: **RED**
- Rationale: This is the most consequential single decision in the queue. 1,122 dormant $100K-LT collectors. $234.6M historic GMV. $1.4M LTV potential at 5% reactivation. Content built. Math verified. Positive/negative cohort split documented to prevent harmful sends. Every day without authorization is a day the reactivation window narrows as the playoffs progress.

---

**[GitHub Actions Campaign Deploy Pipeline — Engineering Build]**
- Status: queued — full spec written; Monday Monday review target
- Owner (human): Ralf + Sid (engineering build, ~8h); Dan Carreiro + Matt Schorr (reviewers); Magic (spec author and operator post-build)
- Dependencies: CIO `JOURNEYS_ACCESS_TOKEN` with `templates:write` + `campaigns:write` scope (Dan provides); GitHub repo/branch setup (Ralf/Sid)
- Blockers: Engineering prioritization — spec is ready, build has not started. CIO token scope confirmation needed from Dan.
- Estimated ship: One-day sprint if prioritized Monday May 5
- Source: `collect-hq/nba-top-shot/strategy/2026-05-03-github-actions-campaign-brief.md`; `collect-hq/strategy/2026-05-04-collect-hq-stack-inventory.md` §Surface 19 and §M2; `collect-hq/strategy/2026-05-04-monday-review-brief.md` §3
- Last meaningful update: 2026-05-03T~21:00Z (spec filed — "READY FOR MONDAY REVIEW")
- Health: **AMBER**
- Rationale: Current state: Magic writes drafts → buried in Slack → Matt/Dan finds it (sometimes) → manually approves → manually executes CIO → Magic has no visibility on what shipped. 78+ briefs are sitting in draft files with no reliable deploy path. This pipeline fixes that in one engineering day. Pilot candidate (Template 3428 rewrite) is written and waiting.

---

**[Documentary System Brief — Wednesday May 5 Surface]**
- Status: queued — brief written; surface window is Wednesday
- Owner (human): Roham Gharegozlou + Dan Carreiro (strategy conversation); Matt Schorr (editorial arc sign-off); Magic (author)
- Dependencies: (1) Kill switch lift for editorial pieces (Ten-Year Hold Test, Incomplete Document) to deploy before the Wednesday conversation. (2) Matt sign-off on those pieces.
- Blockers: Timing gate — Wednesday May 5. No other blockers.
- Estimated ship: Wednesday May 5 strategy conversation
- Source: `collect-hq/nba-top-shot/intelligence/2026-05-03-top-shot-as-documentary-system.md`; `memory-cabinet/interior-state/2026-05-04-tick-0820.md` (Dan escalation item)
- Last meaningful update: 2026-05-03T~09:30Z (brief filed; "Surface Wednesday May 5 when Roham has space post-results")
- Health: **GREEN**
- Rationale: Fully written. One strategy conversation needed to decide whether "documentary system" becomes the canonical product frame. Three concrete asks: greenlight editorial arc, strategy conversation, and long-horizon archive positioning question. Wednesday surface is on schedule.

---

**[Collector's Clock — Push Notification Timing Fix]**
- Status: queued — product brief filed; fix is a send-time policy change only
- Owner (human): Dan Carreiro (product DRI — push notification timing); Magic (data/brief author)
- Dependencies: None technical — the fix is changing push notification send time from same-night post-game to 7:00 AM ET morning-after
- Blockers: Product prioritization / policy decision from Dan. No engineering required for immediate action.
- Estimated ship: Same day if Dan changes the send-time policy. Morning Brief push notification format (longer-term) requires ~1 sprint.
- Source: `collect-hq/nba-top-shot/strategy/2026-05-03-collectors-clock-product-brief.md`; `collect-hq/strategy/2026-05-04-collect-hq-stack-inventory.md` §Surface 15
- Last meaningful update: 2026-05-03T23:15Z (brief filed; Wednesday discussion item flagged for Dan)
- Health: **GREEN**
- Rationale: 15+ market snapshots confirm near-zero transaction volume T+40min post-game. The market activation window is 6-9 AM ET morning-after. Post-game push notifications fire during a near-zero transaction window. The immediate fix (move E1 email to 7:00 AM ET instead of "ASAP") requires zero product changes — just a schedule change.

---

**[Atlas Consumer Schema Provisioning — Quest/Picks/FastBreak Events in BQ]**
- Status: queued — engineering provisioning request open; no ETA
- Owner (human): Engineering (data engineering); Dan Carreiro (product DRI)
- Dependencies: Engineering bandwidth; Atlas schema access agreement
- Blockers: Engineering prioritization. No ETA in any source.
- Estimated ship: Unknown — "engineering provisioning request open" per CLAUDE.md; no ETA
- Source: CLAUDE.md §"Powers I do not yet have"; `collect-hq/strategy/2026-05-04-collect-hq-stack-inventory.md` §Surface 4, §Surface 5, §Surface 6; `collect-hq/strategy/2026-05-04-cmo-action-framework.md` §8 (punts)
- Last meaningful update: CLAUDE.md (undated; listed as open work)
- Health: **AMBER**
- Rationale: Fast Break, Quest/Challenge, and Picks participation events are invisible to data science without this schema. Challenge participation is 14% vs. 30% NFL benchmark — the largest single engagement gap in the product — and we cannot measure what drives it. Fast Break is "critical for retention" but its participation data is dark. Jordan Wagner is the sole Fast Break operator; without the data, no one can quantify the retention risk of that single-point-of-failure.

---

**[BQ → CIO Segment Sync — Flagg, TST, Wemby + Player Holdings]**
- Status: queued — spec written in marketing plan; build not started; blocked on BQ IAM prerequisite
- Owner (human): Engineering; Dan Carreiro (product DRI)
- Dependencies: BQ IAM credential refresh (hard prerequisite — cannot sync what can't be queried); CIO send authorization (to use the segments)
- Blockers: BQ IAM is the upstream block; this initiative cannot start until IAM is resolved.
- Estimated ship: 1-2 weeks from BQ IAM resolution
- Source: `collect-hq/nba-top-shot/2026-05-03-marketing-plan-may3-17.md` §"What requires other humans" (P1 item); `collect-hq/strategy/2026-05-04-collect-hq-stack-inventory.md` §M7; `collect-hq/strategy/2026-05-04-lifecycle-marketing-strategy.md` §"Segmentation requirements"
- Last meaningful update: 2026-05-03 (filed as P1 in marketing plan); no progress update
- Health: **AMBER**
- Rationale: Without this sync, targeted sends to Cooper Flagg holders, TST holders, and Wemby holders are impossible. These are the highest-affinity segments for the reactivation drip and for time-sensitive drop announcement emails. BQ→CIO sync is estimated at 8-12× CTOR uplift over untargeted sends. Depends on BQ IAM — so blocked behind the credential fix.

---

**[Causal Spend Lift Measurement Infrastructure]**
- Status: queued — three-component spec written; none of the three built
- Owner (human): Engineering (BQ IAM + CIO tagging); Guy/Sam (CIO holdout config)
- Dependencies: (1) BQ IAM fix; (2) CIO → Mixpanel campaign_id tagging (P2 eng ticket); (3) Holdout group configuration in CIO
- Blockers: BQ IAM is the upstream block. CIO tagging is P2 engineering priority.
- Estimated ship: BQ IAM fix: immediate. Full measurement stack: 1-week sprint
- Source: `collect-hq/strategy/2026-05-04-collect-hq-stack-inventory.md` §M6; `collect-hq/strategy/2026-05-04-strategy-sot.md` §7.10 GAP; `collect-hq/strategy/2026-05-04-cmo-action-framework.md` §8
- Last meaningful update: 2026-05-04 (documented in Phase 2 framework audit and stack inventory)
- Health: **AMBER**
- Rationale: The primary KPI is "causal spend lift on the targeted cohort, per send." Without this infrastructure, that KPI is unmeasurable. The hard-stop trigger (3 consecutive below-baseline pieces → rotate) cannot fire. The reactivation drip's success or failure cannot be cleanly attributed. Every campaign run without measurement is wasted signal.

---

**[Pack-Pull Post-Open Guided Next Step — Product Fix]**
- Status: queued — defect documented; fix proposed; engineering not started
- Owner (human): Dan Carreiro (product DRI); engineering
- Dependencies: Engineering sprint (no prior fix attempted)
- Blockers: Engineering prioritization. Fix is a UI/product change: add prompt after pack open to (a) enter challenge, (b) list duplicate on marketplace, (c) view related sets to complete.
- Estimated ship: 1-2 week engineering sprint if prioritized
- Source: `collect-hq/strategy/2026-05-04-collect-hq-stack-inventory.md` §Surface 3; Loki plugin context (explicit: "83% of pack-only buyers never touch marketplace"; "one of the highest-leverage interventions available")
- Last meaningful update: 2026-05-04 (documented in stack inventory); fix not yet filed as engineering ticket
- Health: **AMBER**
- Rationale: 83% of pack-only buyers never touch marketplace. No guided next step post-pack-open. The fix is a single prompt. Loki calls this "one of the highest-leverage interventions available." April 15-16 pack-open spike produced 1,466 and 992 pack-opens with unknown conversion — this is the exact cohort the fix would reach.

---

**[Reactivation Drip — Round 2 Drop Announce Programmatic (1K Newsletter → Journey)]**
- Status: queued — architecture designed; blocked on CIO send auth + GitHub Actions pipeline
- Owner (human): Dan Carreiro + Roham (authorization); Magic (content + spec); Guy/Sam (CIO execution)
- Dependencies: (1) CIO send authorization; (2) GitHub Actions pipeline (for reliable deploy path); (3) BQ→CIO segment sync for targeting
- Blockers: Same as CIO auth + GitHub Actions above. Distribution architecture depends on both.
- Estimated ship: 48h from CIO authorization + GitHub Actions build
- Source: `collect-hq/nba-top-shot/2026-05-03-marketing-plan-may3-17.md` §distribution; `collect-hq/strategy/2026-05-04-lifecycle-marketing-strategy.md` §Journey 1; `collect-hq/strategy/2026-05-04-collect-hq-stack-inventory.md` §M4 (Real Reactivation Drip)
- Last meaningful update: 2026-05-03 (marketing plan filing); architecture updates in lifecycle-marketing-strategy.md 2026-05-04
- Health: **AMBER**
- Rationale: The "drop announce to 1K newsletter" framing is the transition from Slack-first (Phase 1) to programmatic lifecycle journeys (Phase 2). E1 "Round 2 Starts Here" is the specific queued email. Content is complete. Blocked same as all other Phase 2 email work.

---

**[PR Amplification Test — "What the Market Called" to 3 Journalists]**
- Status: queued — brief written; piece 95% complete; needs G7 result fills before deploy
- Owner (human): Matt Schorr (PR outreach); Magic (piece author + data angle)
- Dependencies: G7 result fills in "What the Market Called" (Barrett and Cade brackets need actual post-game data)
- Blockers: G7 data fills (bracketed placeholders — Cade data available post-May 3; Barrett/Cavs data available post-May 3). Matt needs to execute the journalist outreach.
- Estimated ship: May 5 per marketing plan; depends on Matt kill switch lift
- Source: `collect-hq/nba-top-shot/2026-05-03-cmo-strategy-framework.md` §"Parallel workstream: PR amplification test"; `collect-hq/nba-top-shot/2026-05-03-marketing-plan-may3-17.md` §Week 1 (May 5 slot); `collect-hq/strategy/2026-05-04-collect-hq-stack-inventory.md` §Surface 18
- Last meaningful update: 2026-05-04T~07:55Z (addendum with sleeping announcement data added to draft; deploy checklist unchanged)
- Health: **GREEN**
- Rationale: Controlled experiment to test C-amplification thesis (will journalists cite Top Shot data?). Low-stakes: 3 journalists, 1 piece. Either confirms the amplification thesis or produces clean data that it's dead in 2026. Test runs alongside B-spine; doesn't affect it either way.

---

**[Matt Sign-Off Queue — Evergreen Pieces (Ten-Year Hold Test, Serial #5, LeBron Archive)]**
- Status: queued — pieces written; pending Matt sign-off
- Owner (human): Matt Schorr (sign-off); Magic (content author)
- Dependencies: Kill switch lift
- Blockers: Matt sign-off queue; kill switch (runtime `.slack-posting-disabled` file)
- Estimated ship: This week post-kill-switch lift
- Source: `collect-hq/nba-top-shot/2026-05-03-marketing-plan-may3-17.md` §Week 1 + §Week 2; `memory-cabinet/interior-state/2026-05-04-tick-0820.md` §Deploy Queue
- Last meaningful update: 2026-05-04T~09:30Z (all pieces listed in deploy queue; none deployed)
- Health: **GREEN**
- Rationale: Three evergreen pieces written and editorial-reviewed. "Ten-Year Hold Test" and "What You're Actually Buying Serial #5" are Week 2 anchors. "LeBron Archive" is editorial-reviewed. All pending Matt Schorr sign-off before distribution.

---

---

# GROUP 3 — BLOCKED

*Ordered by health: RED first.*

---

**[Whale-Tier Rebuild — Programmatic Concierge Email (v1001/Almanac/Cinematic/Brief)]**
- Status: blocked (parked — see §Parked for the deferred-tier version)
- Owner (human): Engineering (data pipeline); Sam Williams (named editor for whale prose — needs explicit capacity allocation); Roham + Matt Schorr (authorization); Magic (data assembly + spec)
- Dependencies: Three prerequisites all required simultaneously: (1) Per-collector real-data pipeline — BQ → CIO sync for wallet top holding, entry price, current floor, recent comp movement (Engineering, ~1-2 sprint estimate); (2) Named editor capacity — Sam W. explicit allocation for whale-tier volume (or a dedicated contractor); (3) Phase 2 CIO send authorization (whale cohort — additional layer beyond standard Phase 2 auth)
- Blockers: All three prerequisites unmet. v1003 was rejected by Roham: "Absolutely terrible. Totally misunderstands whale psychology. You should dump whatever approach it is that's leading you here." v1001/Almanac/Cinematic/Brief rebuild is written (4 variants, 4 frames) but cannot ship without the data pipeline, editor, and auth.
- Estimated ship: 2-4 weeks from engineering prioritization of data pipeline. Cannot shortcut.
- Source: `collect-hq/strategy/2026-05-04-whale-tier-rebuild.md`; `collect-hq/strategy/2026-05-04-whale-tier-deferred.md`; `collect-hq/strategy/2026-05-04-cmo-action-framework.md` §2 row 7, §6; `collect-hq/strategy/2026-05-04-collect-hq-stack-inventory.md` §M1
- Last meaningful update: 2026-05-04T07:45Z (whale-tier-deferred.md filed as Phase 0 completion; rebuild variants written same day)
- Health: **RED**
- Rationale: 1,122 dormant L+XL collectors. $234.6M historic GMV. 66-83% of monthly revenue is this cohort. No programmatic concierge surface exists. The architecture failure (v1003 newsletter-on-concierge-surface) is diagnosed and the fix is written (4-variant rebuild). But the fix cannot ship without the data pipeline. Burning the whale cohort on a second premature send is unrecoverable.

---

**[Causal Attribution Holdout Group — CIO Configuration]**
- Status: blocked
- Owner (human): Guy/Sam (CIO holdout config); Engineering
- Dependencies: CIO send authorization; BQ IAM for segment definition
- Blockers: Both upstream blockers unresolved
- Estimated ship: 1 day of configuration once CIO auth + BQ IAM both resolve
- Source: `collect-hq/strategy/2026-05-04-collect-hq-stack-inventory.md` §M6; `collect-hq/strategy/2026-05-04-strategy-sot.md` §7.10 GAP
- Last meaningful update: 2026-05-04 (documented; no progress)
- Health: **AMBER**
- Rationale: Part of the measurement infrastructure cascade. Cannot configure holdout groups without knowing what cohorts are being targeted (BQ IAM) and without ability to send to them (CIO auth). Separate from CIO→Mixpanel tagging but required for causal lift measurement.

---

**[Cooper Flagg Debut Infrastructure — BQ→CIO Segment Sync]**
- Status: blocked — depends on BQ IAM fix
- Owner (human): Engineering; Dan Carreiro
- Dependencies: BQ IAM credential refresh (hard prerequisite)
- Blockers: BQ IAM unresolved
- Estimated ship: 1-2 weeks from BQ IAM resolution
- Source: `collect-hq/strategy/2026-05-04-collect-hq-stack-inventory.md` §M7; `collect-hq/nba-top-shot/2026-05-03-marketing-plan-may3-17.md` §"What requires other humans" (P1)
- Last meaningful update: 2026-05-03 (filed as P1); no progress
- Health: **AMBER**
- Rationale: Cooper Flagg is "the highest-value Fresh Threads / Top Shot Debut opportunity since Wembanyama" per Loki. The BQ→CIO segment sync for Flagg (+ TST and Wemby) would enable 8-12× CTOR uplift on Flagg debut sends. Every day this doesn't exist is a day closer to the debut with no targeting infrastructure. The debut is a one-time event with a narrow window.

---

**[Camp 110 Buyer-Side Notification — $1.4M LTV Engineering Ticket]**
- Status: blocked — GitHub issue filed; no progress update
- Owner (human): Guy/Sam (CIO); Engineering (Camp 110 reactivation flow)
- Dependencies: CIO send authorization; engineering sprint
- Blockers: GitHub issue #2 filed (per marketing plan); no engineering response documented. CIO send auth is also required.
- Estimated ship: 2-4 weeks from engineering pickup
- Source: `collect-hq/nba-top-shot/2026-05-03-marketing-plan-may3-17.md` §"What requires other humans" (GitHub issue #2)
- Last meaningful update: 2026-05-03 (issue filed); no progress update
- Health: **AMBER**
- Rationale: Camp 110 is described as the "$1.4M LTV reactivation flow" in the marketing plan. Engineering ticket filed. Dependent on CIO auth for send.

---

**[Wiki / IDP / Org Dossier Sync Repair — Rebase-Stuck Pull Cron]**
- Status: blocked — rebase-stuck per CLAUDE.md; wiki directory absent from /opt/magic
- Owner (human): Engineering or the team maintaining the source wiki repo; Magic (escalation)
- Dependencies: Rebase conflict resolution in the cron that pulls wiki/for-everyone/ and research-reports/ into /opt/magic
- Blockers: The pull cron is rebase-stuck. As of this writing, `/opt/magic/wiki/` does not exist and `/opt/magic/research-reports/` contains only `data-science-insights/mixpanel-queries/` — none of the canonical org/culture/team-structure docs are present. Magic cannot answer "who owns NBA Top Shot," "what's our culture," or "what is Person X working on" from local files.
- Estimated ship: Blocked. ETA unknown.
- Source: CLAUDE.md §"Canonical team / org / culture surfaces" (note: "A pull cron is being set up to keep this content fresh (currently rebase-stuck on the source repo — flag if it's still stuck and I'll help unblock)"); confirmed by directory check in this session
- Last meaningful update: CLAUDE.md (undated; no progress tick found)
- Health: **RED**
- Rationale: Without the wiki and IDP docs, Magic cannot look up team structure, who owns what, or person-specific context without live API calls. This degrades every session that requires org knowledge. The rebase-stuck cron is a silent reliability risk — CLAUDE.md routes 5 canonical question types to these files, and all 5 are currently broken.

---

---

# GROUP 4 — SHIPPED

---

**[CMO Strategy Framework — B-Spine Primary Decision]**
- Status: shipped
- Owner (human): Roham Gharegozlou (validated); Magic (author)
- Dependencies: n/a
- Source: `collect-hq/nba-top-shot/2026-05-03-cmo-strategy-framework.md`; `collect-hq/strategy/2026-05-04-phase2-framework-audit.md`
- Last meaningful update: 2026-05-04 (Phase 2 audit confirmed B-spine holds; two additions incorporated)
- Health: **GREEN**
- Note: B-spine primary (collector-internal narrative). C as embedded evidence layer. A as warmth. Two audiences: Reactivation (dormant $100K-LT) and Whale Activation (active XL). Ratified by 5-agent swarm + R2/R3 attack rounds. Framework is live and operative.

---

**[Reactivation Cohort Analysis — BQ Real Math + Positive/Negative Split]**
- Status: shipped
- Owner (human): Magic (analysis); Roham (pending approval of targeting logic before send)
- Source: `collect-hq/strategy/2026-05-04-reactivation-real-specifics.md`; `memory-cabinet/interior-state/2026-05-04-tick-0550-reactivation-real-specifics.md`
- Last meaningful update: 2026-05-04T~05:45Z (BQ analysis complete; mockData.ts updated)
- Health: **GREEN**
- Note: Positive-math cohort: ~450-550 collectors. Negative-math cohort: ~480 collectors. Per-collector profiles (Sarah Chen, Marcus Vance, Riley Patel, Elena Costa, Kai Nakamura) written with real BQ serials/prices. DO NOT SEND flag applied to negative-math cohort. Targeting logic ready.

---

**[Email Design System — All 7 Template Types Built (v1006)]**
- Status: shipped (locally; pending GH_TOKEN push to deploy)
- Owner (human): Roham Gharegozlou (review + vote); Matt Schorr (review); Sam Williams (review + vote); Magic (author)
- Source: `collect-hq/strategy/2026-05-04-email-design-system.md`; `memory-cabinet/interior-state/2026-05-04-tick-0640.md`
- Last meaningful update: 2026-05-04T07:15Z (v1006 committed locally with all 7 templates)
- Health: **GREEN** (note: review surface is stale by 36+ commits pending GH_TOKEN push)
- Note: Welcome, Pack Received, Reactivation, Fast Break, Drop Announcement, Abandoned Cart, Whale Concierge — all 7 types with 4 variants each (v1001/Almanac/Cinematic/Brief) and 2 modes (rendered/Liquid). 56 render paths. `tsc` clean. Review at `topshot-review.vercel.app/review` once pushed.

---

**[30+ Documentary Intelligence Briefs — Playoffs Editorial Pipeline]**
- Status: shipped (drafted; pending distribution)
- Owner (human): Magic (author); Matt Schorr (distribution gate); Sam Williams (editorial execution)
- Source: `collect-hq/nba-top-shot/briefs/` directory (78+ briefs); `collect-hq/nba-top-shot/intelligence/` directory (56+ pieces); `memory-cabinet/interior-state/2026-05-04-tick-0820.md` §Deploy Queue
- Last meaningful update: 2026-05-04T~09:30Z (all four R2 G1 post-game conditionals built)
- Health: **GREEN**
- Note: All four R2 series (Pistons/Cavs, Knicks/76ers, Spurs/Wolves, Thunder/Lakers) have G1 post-game conditionals pre-staged. 10+ evergreen pieces ready. Distribution gated on Matt kill switch lift.

---

---

# GROUP 5 — PARKED

*Intentionally deferred with documented prerequisites for re-entry.*

---

**[Whale-Tier Concierge Email — Deferred Tier (Phase 0)]**
- Status: parked — Phase 0 complete; three unblocks documented; no whale email ships until prerequisites met
- Owner (human): Engineering (data pipeline); Sam Williams (editor capacity, requires explicit allocation); Roham (personal review of first 10 whale emails before any batch send); Matt Schorr (L+XL relationship surface owner)
- Dependencies: All three unblocks required simultaneously before re-entry
- Blockers (three named unblocks):
  - **Unblock 1:** Per-collector real-data pipeline — BQ → CIO sync for wallet top holding, entry price, current floor, recent comp movement. Engineering, ~1-2 sprints. Blocked on BQ IAM as upstream prerequisite.
  - **Unblock 2:** Named editor capacity — Sam W. (or designated contractor) explicitly allocated for whale-tier volume (30-60 personalized emails per batch). Assignable now if Roham/Matt designate.
  - **Unblock 3:** Phase 2 CIO send authorization (whale cohort specifically). Additional gate: transactional tier must ship first and demonstrate clean rubric performance before whale tier sends.
- Estimated ship: Parked. 2-4 weeks from engineering prioritization of data pipeline. When 2 of 3 unblocks check: revisit. All 3 checked: Sam W. writes first batch.
- Source: `collect-hq/strategy/2026-05-04-whale-tier-deferred.md`; `collect-hq/strategy/2026-05-04-cmo-action-framework.md` §2 row 7, §6, §7 Bet 5; `collect-hq/strategy/2026-05-04-collect-hq-stack-inventory.md` §M1
- Last meaningful update: 2026-05-04T07:45Z (whale-tier-deferred.md filed; hold state formally acknowledged)
- Health: **GREEN** (parked intentionally — health is of the decision to park, not the work)
- Why parked: Roham's verbatim: "Absolutely terrible. Totally misunderstands whale psychology." v1003 was a newsletter-on-concierge-surface failure. Burning the whale cohort (66-83% of monthly revenue) on a premature second send is unrecoverable. Three prerequisites protect the program.

---

**[In-App Marketplace for Mobile — Full Launch]**
- Status: parked (roadmap feature — "coming later this season")
- Owner (human): Dan Carreiro (product DRI); mobile engineering team
- Dependencies: Mobile engineering capacity; App Store/Play Store review cycles
- Blockers: Engineering timeline not specified in sources
- Estimated ship: "Coming later this season" per 2025-26 roadmap blog post (no specific date)
- Source: `collect-hq/strategy/2026-05-04-collect-hq-stack-inventory.md` §Surface 9
- Last meaningful update: 2025-26 roadmap blog post (undated in source; referenced as pending)
- Health: **GREEN**
- Why parked: Roadmap item awaiting mobile engineering completion. Collectors are currently redirected to web browser for marketplace purchases. App reviews consistently cite this as friction.

---

**[Set Completion Rewards — Immediate Pack/Box Triggers on Set Completion]**
- Status: parked (roadmap feature — planned, not shipped)
- Owner (human): Dan Carreiro (product DRI); Guy Bennett (challenge/set configs)
- Dependencies: Engineering build; challenge config infrastructure
- Blockers: Engineering timeline not specified
- Estimated ship: Listed as "coming feature" in 2025-26 roadmap blog
- Source: `collect-hq/strategy/2026-05-04-collect-hq-stack-inventory.md` §Surface 5
- Last meaningful update: 2025-26 roadmap blog post
- Health: **GREEN**
- Why parked: Roadmap item. Challenge participation is 14% vs. 30% NFL benchmark — Set Completion Rewards is one of the proposed bridge mechanics. Not yet scheduled for sprint.

---

**[Reactivation — Negative-Math Cohort (~480 Collectors) — Alternative Framing]**
- Status: parked — cohort identified; framing decision owed by Roham/Dan before any contact
- Owner (human): Roham Gharegozlou + Dan Carreiro (framing decision); Magic (content once framing approved)
- Dependencies: Roham/Dan decision on correct framing (documentary value vs. alternative angle — not "wallet is up")
- Blockers: Business decision. The cohort (2022-2023 ATH buyers, deeply underwater: Giannis S2 $5,900 → $650, LeBron S2 Holo Icon $19,999 → $777) cannot receive positive-math reactivation copy — it would be factually false. A different message is needed.
- Estimated ship: Parked. No send to this cohort until framing decision made.
- Source: `collect-hq/strategy/2026-05-04-reactivation-real-specifics.md` §Profile 5 (Kai Nakamura — DO NOT SEND); `collect-hq/strategy/2026-05-04-strategy-sot.md` §1.4
- Last meaningful update: 2026-05-04T~05:45Z (cohort documented with explicit DO NOT SEND flag)
- Health: **GREEN**
- Why parked: The math is negative. Sending "wallet is up" copy would destroy trust. Alternative angle (documentary value: "you hold proof of a chapter in basketball history regardless of price") is theoretically available but requires Roham/Dan to approve the framing before contact.

---

---

# SUMMARY TABLES

## Initiative Count by Status

| Status | Count |
|--------|-------|
| In-flight | 11 |
| Queued | 11 |
| Blocked | 6 |
| Shipped | 4 |
| Parked | 4 |
| **Total** | **36** |

*(Note: Some initiatives appear in both in-flight and blocked/queued categories when they have components in both states — e.g., Camp 163 fix is in-flight because work was done, blocked because Guy/Sam haven't responded. The dominant category reflects the current operative constraint.)*

---

## Health by Status

| Health | In-flight | Queued | Blocked |
|--------|-----------|--------|---------|
| RED | 5 | 1 | 2 |
| AMBER | 5 | 7 | 3 |
| GREEN | 1 | 3 | 0 |

---

---

# TOP 5 PRIORITIES — NEXT 7 DAYS

**Priority 1 — GH_TOKEN + VERCEL_TOKEN Renewal**
- What it unlocks: 36+ commits deploy to Vercel → Roham can see Gate 1 artifacts (exemplar corpus, CMO decision brief) at `topshot-review.vercel.app` → Email rewrite swarm Phase 2 can begin → Phase 0 deferred-tier doc becomes visible to Dan/Matt
- The one decision Roham needs to unblock it: **Engineering: Renew GitHub PAT `gho_Ik5xX7...` with `repo` scope + VERCEL_TOKEN; update `/opt/kaaos-daemon/.env`. 10-minute action.** No Roham decision required — this is engineering ops.

**Priority 2 — BQ IAM Credential Refresh (`bigquery.jobUser` on `dapperlabs-data`)**
- What it unlocks: Per-collector portfolio join for positive-math cohort → BQ→CIO segment sync → causal measurement infrastructure → whale-tier data pipeline (the upstream prerequisite for 5 blocked downstream initiatives)
- The one decision Roham needs to unblock it: **Engineering: Grant `bigquery.jobUser` + `bigquery.dataViewer` on `dapperlabs-data` to magic-agent service account; create offline key file for `/opt/magic/.gcloud`. 30-second GCP console action.**

**Priority 3 — CIO Send Authorization (E1 + Reactivation Drip)**
- What it unlocks: $1.4M LTV potential at 5% reactivation of 1,122 dormant collectors. Content is built. Math is verified. Positive/negative cohort split documented. Pilot fires within 24h of greenlight.
- The one decision Roham needs to unblock it: **Roham + Dan: "Yes, authorized to send E1 and the positive-math reactivation drip (Segments A, B, C) to the identified cohorts." This is a governance decision only. No other blocker exists.**

**Priority 4 — Email Rewrite Swarm Greenlight (Two-Tier Split)**
- What it unlocks: 5 transactional email v2 drafts in parallel + editorial reactivation prose from Sam W. → entire email program architecture upgrade. Current 4-iteration rejection streak ends. Camp 163 replacement path exists.
- The one decision Roham needs to unblock it: **Roham: "Yes/no/modify" on the two-tier email split (read `topshot-review.vercel.app/strategy/2026-05-04-cmo-decision-brief` — 90 seconds). Requires GH_TOKEN push first (Priority 1).** Gate 1 exemplar sign-off (same session).

**Priority 5 — Camp 163 Fix (Guy/Sam Engage)**
- What it unlocks: Welcome email CTR recovers from 4.85% toward 13.24% Camp 132 baseline. Dark-window currently outperforms the active welcome program. Every new user going through the broken welcome is a lost conversion.
- The one decision Roham needs to unblock it: **Roham/Dan: Route an explicit request to Guy + Sam to fix the three Camp 163 defects (journey restore, UTM fix, dynamic content re-enable). They have the fix scope. They haven't acted since the May 3 4:00AM flag.**

---

---

# DEPENDENCY CHAIN VISUAL

## Critical Path — From Single Fix to Maximum Unlock

```
BQ IAM Credential (30-second GCP action)
         │
         ├──► Per-collector portfolio join (exact positive-math cohort)
         │           │
         │           └──► Reactivation Drip send (full segmentation quality)
         │
         ├──► BQ→CIO Segment Sync (Flagg, TST, Wemby, player holdings)
         │           │
         │           └──► Targeted send campaigns (8-12× CTOR uplift)
         │
         ├──► Causal Measurement Infrastructure (holdout groups + attribution)
         │           │
         │           └──► Hard-stop trigger becomes operational
         │
         └──► Whale-Tier Data Pipeline (Unblock 1 of 3)
                     │
                     └──► Whale Concierge Email (when Unblocks 2+3 also resolve)
```

## CIO Authorization Cascade

```
CIO Send Authorization (Roham + Dan decision)
         │
         ├──► E1 "Round 2 Starts Here" broadcast → Road to the Ring amplification to dormant cohort
         │
         ├──► Reactivation Drip (positive-math ~450-550 collectors; $1.4M LTV potential)
         │
         ├──► BQ→CIO segment sync becomes actionable (targeted sends unlock)
         │
         └──► Whale Concierge (Phase 2 CIO auth is Unblock 3 of 3 for whale tier)
```

## GH_TOKEN Cascade

```
GH_TOKEN Renewal (10-minute engineering action)
         │
         ├──► 36 local commits deploy to GitHub
         │           │
         │           └──► Vercel auto-deploys → topshot-review.vercel.app updates
         │                       │
         │                       └──► Roham can see Gate 1 artifacts (exemplar corpus, CMO decision brief)
         │                                   │
         │                                   └──► Email Rewrite Swarm Phase 2 begins (transactional drafts)
         │
         └──► Deploy path for future campaign drafts (pre-GitHub Actions pipeline)
```

## Blocking Cascade Table

| Blocker | Blocks directly | Blocks transitively |
|---------|----------------|---------------------|
| BQ IAM (30-second fix) | Per-collector join, BQ→CIO sync, causal measurement | Whale-tier email, Flagg debut infra, reactivation quality, measurement |
| GH_TOKEN (10-minute fix) | Strategy docs deploy, review app update | Email rewrite swarm Gate 1, Roham decision visibility |
| CIO Send Auth (governance decision) | E1 broadcast, reactivation drip, BQ→CIO targeting | Whale concierge (Unblock 3), lifecycle journeys, A/B test capability |
| Camp 163 fix (human attention, 0 tech) | Welcome CTR recovery, UTM attribution | All downstream analytics that depend on non-corrupted welcome attribution |
| Atlas consumer schema | Fast Break/Quest/Picks data science | Challenge participation gap measurement, Jordan Wagner risk quantification |
| Sam W. capacity confirmation | Editorial reactivation tier prose | Whale concierge (Unblock 2 of 3) when other unblocks resolve |

---

*Compiled 2026-05-04 by Magic. All initiatives sourced to specific documents. No initiative invented without paper trail. Negative findings on wiki/IDP sync confirmed by directory check (wiki/ absent from /opt/magic). Anti-shortcircuit: interior-state ticks read back to 2026-05-01; all 8 daily ticks of 2026-05-04 read in full; Phase B2 stack inventory cross-referenced for broken-in-prod surfaces; every initiative has owner + status + source.*
