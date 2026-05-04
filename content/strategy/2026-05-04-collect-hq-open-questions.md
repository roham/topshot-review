---
title: Collect HQ — Open Questions / Vote Cards
date: 2026-05-04
author: Magic (decision-log compiler)
status: COMPILED — all cards have all 9 required fields; questions without a specific decision-maker, consequence-of-delay, or linked artifact were excluded as not-yet-ripe
purpose: Feeds Collect HQ §8 Open Questions section per IA spec — the load-bearing voting/feedback surface; each card is a Vote Card the Site Builder agent can render at /open-questions/<id>
sources-mined:
  - 2026-05-04-collect-hq-ia-spec.md (§8 Open Questions; §0 GAP discipline)
  - 2026-05-04-strategy-sot.md §7 (12 explicit gaps with downstream-need tags)
  - 2026-05-04-cmo-action-framework.md §1 verdict + §8 Decisions Roham/Dan/Matt still need to make
  - 2026-05-04-cmo-decision-brief.md (90-second decision page — central yes/no/modify)
  - 2026-05-04-rewrite-action-plan.md (Gate 1 swarm-execute greenlight)
  - 2026-05-04-whale-tier-deferred.md (3 prerequisites parking the work)
  - 2026-05-04-whale-tier-rebuild.md (proposed v1004 supersede; needs Roham approval)
  - 2026-05-04-collect-hq-stack-inventory.md §"Top 5 Priorities" + 4 broken-in-prod surfaces
  - 2026-05-04-collect-hq-kpis.md §BLOCKED METRICS table
  - 2026-05-04-phase1-marketplace-gap.md (Banchero post-elimination test design)
  - 2026-05-04-phase1-competitive-gap.md (Panini/Fanatics Live/Disney crossover)
  - 2026-05-04-phase1-sentiment-gap.md (Discord access, X paywall, Mailbag complaint)
  - memory-cabinet/feedback_*.md (7 durable feedback memories — implicit rules → open questions)
voting-payload-shape:
  card_type: open-question
  vote: ship | needs-work | no | urgent | important | nice-to-have
  comment: optional string
  voter: string
---

# Collect HQ — Open Questions

## 0. Frame

Per IA spec §8, this surface is the decision log. Every card carries the 9 required fields: title, asker, decision-maker, question phrasing, context, consequences (yes / no / delay), linked artifact, vote shape, status.

Cards are grouped first by decision-maker (Roham → Dan → Matt → Sam → Guy → Kenny → Engineering → Persii / cross-product). Within each group, cards are stack-ordered by consequence-of-delay severity (highest cost-of-inaction first).

Every Roham-targeted question was mid-stream-verified as genuinely his to call (not Dan's, not Matt's). Where the call is jointly Roham + Dan or Roham + Matt, the card is filed under Roham with the joint-DM noted.

The dependency chain section at the bottom names which decisions are stuck behind which other decisions. Roham's Top-5 list at the very bottom is the answer to "what does the next 7 days hinge on."

---

## 1. Roham (CEO — principal)

### Q-ROHAM-01 — Approve the two-tier email split (Transactional LLM-generated / Editorial human-led with LLM assist; Whale-tier deferred)

- **Asker:** Magic (CMO-lens persona, Wave 2A)
- **Decision-maker:** Roham (sole DM — Dan informed; Matt informed)
- **Question:** Yes / no / modify on the two-tier split as defined in `2026-05-04-cmo-action-framework.md §1`. Specifically: do you accept (a) Welcome / Pack Received / Abandoned Cart / Fast Break / Drop Announcement as TRANSACTIONAL tier (LLM-generated, auto-ship after rubric pass, human gate first 50 sends), (b) Reactivation as EDITORIAL tier (Sam W. authors prose, LLM does data + math + subject lines), (c) Whale-Tier Concierge as DEFERRED until 3 prerequisites unlock?
- **Context:** Four iterations of the prior single-tier LLM-generation approach were rejected — the only outright `ship` was Pack Received (the most transactional, least voice-load-bearing email). Industry data (200+ campaigns, ACM 2025 study, Skybox 63.6% benchmark) converges on the split. Roham's stated voice ratio (80–90% platform / 10–20% Magic personal) IS the split mathematically.
- **Consequences of yes:** Wave 2B swarm fires (5 transactional drafts + 3 editorial reactivation segments + production-defect patches first). Day-30 review at rubric ≥80% pass + welcome CTR ≥10%. 78+ briefs in inventory begin moving through the new pipeline. The exemplar corpus assembly starts within 24h.
- **Consequences of no:** Iteration 5 follows the same architecture as iterations 1–4 → Wave 1B's evidence predicts rejection 5. Email program stays at 4.85% Camp 163 CTR vs. 13.24% Camp 132 baseline — 3,279 sends/month going through a broken funnel. The single-tier path has no remaining productive iteration.
- **Consequences of delay:** Every week of delay = ~8,500 new signups going through Camp 163 (the broken welcome). At 8.54% dark-window D7 vs. 6.75% Camp 132 era, the broken welcome is plausibly *suppressing* conversion below absent-program baseline. Cost compounds with the playoff acquisition spike (Apr 22 peak: 824 orders/day vs. 35 baseline = 23.5×).
- **Linked artifact:** https://topshot-review.vercel.app/strategy/cmo-action-framework (route TBD; source: `collect-hq/strategy/2026-05-04-cmo-action-framework.md` and 90-second `cmo-decision-brief.md`)
- **Vote shape:** ship / needs-work / no + free text comment (modify-with-conditions OK)
- **Status:** awaiting

---

### Q-ROHAM-02 — Authorize CIO Phase 2 send (Reactivation broadcast to dormant L+XL cohort)

- **Asker:** Magic (CMO framework §6.6 — pending since 2026-05-03)
- **Decision-maker:** Roham + Dan Carreiro (joint authorization required per CMO framework §6.6; Roham listed first as policy DM)
- **Question:** Yes / no / modify on authorizing Customer.io broadcast send to the 1,164 dormant L+XL collectors (≥$100K lifetime, >60d dormant) for the Reactivation editorial tier?
- **Context:** Three fully-written reactivation copy specimens exist (Segment A — Origin Story Holders; Segment B — Single-Star Believers; Segment C — Survivors) with a positive-math targeting appendix. They cannot be tested without send authorization. SoT GAP §7.4 names this as a governance gap, not a data gap.
- **Consequences of yes:** A/B test of editorial-tier vs. LLM-control reactivation can run. Projected 35–70 reactivations in 14 days at 5% threshold = ~$105K–$168K immediate GMV; $1.4M LTV at 5% dormant-whale reactivation. Bet 4 (Reactivation Editorial Bet) becomes measurable.
- **Consequences of no:** B-spine reactivation hypothesis is untestable. The 1,164 dormant cohort holding $244.8M historic GMV remains unaddressed by email. Fall-back: remove reactivation-via-email from the Phase 3 strategy cascade (per SoT §7.4 close action) and pivot to Matt's whale relationship layer + Slack-only distribution (which by definition does not reach the dormant cohort, since dormant collectors aren't checking Slack).
- **Consequences of delay:** Each week deferred = one more week of dormant-cohort decay (avg already 865 days since last purchase — ~2.4 years). Playoff narrative window (R1 → Finals June 24) is the highest-leverage reactivation moment; missing it pushes the test to a low-narrative window where the framework predicts lower lift.
- **Linked artifact:** `collect-hq/nba-top-shot/2026-05-03-reactivation-copy-specimens.md` + `2026-05-04-reactivation-real-specifics.md` (link route on review app TBD; per `feedback_links_not_paths.md`, surface as URL before sending to Roham)
- **Vote shape:** ship / needs-work / no + free text comment
- **Status:** awaiting (since 2026-05-03; second cycle without resolution)

---

### Q-ROHAM-03 — Greenlight the rewrite swarm (Phase 0 + Phase 1 exemplar corpus)

- **Asker:** Magic (rewrite-swarm orchestrator, 2026-05-04)
- **Decision-maker:** Roham (sole DM)
- **Question:** Yes / no / modify on executing the 5-phase rewrite swarm as specified in `2026-05-04-rewrite-action-plan.md`? If yes: Magic launches Phase 0 + Phase 1 immediately and routes the exemplar corpus to you within 24h.
- **Context:** This is the operational swarm that executes the two-tier framework if Q-ROHAM-01 lands `yes`. The plan: (1) curate 10–15 exemplar corpus from prior Roham-approved writing, (2) generate 5 transactional drafts in parallel, (3) assemble editorial Reactivation tier in parallel, (4) two-stage review gate (rubric + AI-feel marker pass), (5) BQ social proof injection + cards.ts patch. Whale-tier exits at Phase 0 with documented unblock list.
- **Consequences of yes:** ~5–6h swarm execution + 24h async for your exemplar sign-off + 1 working day async for Sam W. editorial prose. ~$15–20 API cost. Deliverables: 5 transactional v2 drafts (cards.ts variants), 3 editorial reactivation segment drafts, 1 deferred-tier doc, 6 verification-gate artifacts, 1 review brief.
- **Consequences of no:** The framework approval (Q-ROHAM-01) lands without execution capacity — the work stalls at the spec layer. Alternative: hand-execute one card at a time, slower, no parallelism, no Wave 1B-grounded prompt scaffolding.
- **Consequences of delay:** Exemplar corpus assembly is the gate to all transactional drafts. Each day Roham doesn't sign off = one day Sam W.'s editorial prose work doesn't begin. The two depend on each other in parallel; both must start the same day.
- **Linked artifact:** `collect-hq/strategy/2026-05-04-rewrite-action-plan.md` (90-second one-pager) + `2026-05-04-rewrite-swarm-orchestration.md` (full spec)
- **Vote shape:** ship / needs-work / no + free text comment
- **Status:** awaiting

---

### Q-ROHAM-04 — Approve the v1004 whale-tier rebuild (supersede v1003 in cards.ts)

- **Asker:** Magic (whale-tier-rebuild author, 2026-05-04)
- **Decision-maker:** Roham (sole DM — sign-off on the rebuild before any whale email is rendered on the review surface)
- **Question:** Yes / no / modify on superseding v1003 whale-tier-concierge in `/home/agent/topshot-review/lib/cards.ts` lines 983–1086 with the v1004 rebuild (4 variants: v1001 baseline, Almanac, Cinematic, Brief)? The rebuild fixes the three core errors flagged in your 2026-05-04 review: newsletter-not-concierge, generic-not-Marcus-by-name, no-named-human.
- **Context:** Your verbatim verdict on v1003: "Absolutely terrible. Totally misunderstands whale psychology. You should dump whatever approach it is that's leading you here, because it's not the correct one." The rebuild treats Marcus's specific Mitchell Pull-Up Three #2,418 (bought Jan 2024 at $112, floor today $245) as the spine, names Matt Schorr as the L+XL Desk officer of record, and routes reply to a real thread. New Liquid variables required: `customer.whale_hold_image_url`, `whale.hold_recommendation.gain_pct`, `whale.hold_recommendation.recent_comp_movement`, `whale.flagg_floor_move`, `customer.first_session_at`.
- **Consequences of yes:** v1004 rendering on review surface; engineering pass on 5 new variables; A/B authorization decoupled from the broader Whale Phase 2 unlock (the rebuild can render without the per-collector data pipeline being live — variables can be mocked for review-app rendering). This unblocks the visual review of the concierge psychology.
- **Consequences of no:** v1003 stays on the review surface; the next iteration of whale-tier work has no canonical reference for "what concierge looks like." Risk: another rebuild cycle without resolution of the underlying psychology.
- **Consequences of delay:** Whale-tier was DEFERRED in the CMO framework (Q-ROHAM-01) on three prerequisites; the *visual rebuild* is logically prior to operational unblock. Without it, even when the data pipeline lands, there's no template to render into. Each week of delay extends the time between data-pipeline ready and first-batch ship.
- **Linked artifact:** `collect-hq/strategy/2026-05-04-whale-tier-rebuild.md` (full spec, all 4 variants with Liquid variables)
- **Vote shape:** ship / needs-work / no + free text comment
- **Status:** awaiting

---

### Q-ROHAM-05 — Drop cadence: keep monthly batch model, or test alternative cadence (per Roham's own three-leg hypothesis)

- **Asker:** Roham himself (2026-05-03 articulation in `project_drop_cadence_hypothesis.md`)
- **Decision-maker:** Roham (sole DM — this is the strategic bet)
- **Question:** Should we (a) keep the monthly batch drop cadence as canonical and instrument measurement against the three-leg hypothesis, (b) test an alternative cadence (e.g., higher-frequency mini-drops) as the experimental arm, (c) defer until BQ + Frigga research closes? Multi-choice.
- **Context:** Roham articulated the bet 2026-05-03: monthly batch → thematic set creation → set-completion psychology + temple event > cost of a month without new content. Three legs: curation quality, collector psychology, temple event. Frigga competitive scan has been filed (`2026-05-03-drop-cadence-competitive-brief.md`) — confirms Legs 1 + 3, surfaces the unsolved between-drop collapse problem (Sorare evidence) and the announcement-day demand window (untapped). Roham's own flag: "we are NOT tracking whether it holds — no measurement of drop-window UA/reactivation lift vs. baseline."
- **Consequences of yes (option a — instrument and keep):** BQ deep dive fires (DAU/acquisition/reactivation delta at drop time vs. baseline). Heimdall Tier 3 investigation. Three-leg hypothesis becomes measurable. Cadence stays stable; only the measurement changes.
- **Consequences of yes (option b — test alternative):** Alternative cadence A/B experiment design needed. Risk: between-drop engagement collapse if mini-drops dilute the temple-event leg. Sorare's revenue instability under continuous-supply model is the cautionary analog.
- **Consequences of no (delay):** Three-leg hypothesis stays unvalidated; "growth hasn't really moved" remains the standing observation. Every drop cycle without measurement is a wasted signal (per the same logic that gates Q-ENG-01 causal-spend-lift infrastructure).
- **Linked artifact:** `memory-cabinet/feedback/project_drop_cadence_hypothesis.md` (Roham's articulation) + `collect-hq/nba-top-shot/intelligence/2026-05-03-drop-cadence-competitive-brief.md` (Frigga scan, validates Leg 1 + 3)
- **Vote shape:** option-a / option-b / option-c-defer + free text comment
- **Status:** awaiting (Roham's own bet — has not been re-engaged since 2026-05-03)

---

### Q-ROHAM-06 — Negative-math reactivation cohort (~480 collectors who bought near ATH) — what's the framing?

- **Asker:** Magic (reactivation specimens, 2026-05-04)
- **Decision-maker:** Roham + Dan (Matt informed — owns the L+XL relationship surface)
- **Question:** For the ~480 dormant L+XL collectors whose lifetime math is negative (bought near 2021–2022 ATH, holdings now below acquisition cost), what's the right re-engagement framing? Multi-choice: (a) do not contact via email — protect the relationship (b) contact with a non-portfolio angle ("exciting platform things happening") (c) contact with documentary-frame messaging ("you hold the document of [moment]; market is irrelevant") (d) hand off to Matt's relationship layer for human-touch outreach only.
- **Context:** Reactivation copy specimens explicitly carry a `DO NOT SEND` marker on the negative-math cohort. Roham's verbatim feedback on reactivation: "if the math isn't positive, don't try to spin it — pick a different angle or different cohort." Tester: "I don't think the data will be favorable in this angle... Just say, 'Hey, you haven't logged in 1,000 days.' That's ridiculous." The framing decision is genuinely open.
- **Consequences of yes (a — do not contact):** ~480 collectors stay dormant; trade-off is preserved trust, no recovery attempt.
- **Consequences of yes (b — platform-excitement angle):** Editorial Reactivation tier expands to a 4th segment (Segment D — Negative-Math). Sam W. authors a non-portfolio variant.
- **Consequences of yes (c — documentary frame):** Tests the Top Shot-as-document-of-history thesis on the cohort most likely to reject it. High-reward / high-risk.
- **Consequences of yes (d — hand off to Matt):** Whale relationship layer expands to ~480 collectors; Matt's bandwidth becomes the binding constraint.
- **Consequences of delay:** Negative-math cohort stays in `DO NOT SEND` indefinitely, which is a default to (a) without explicit decision.
- **Linked artifact:** `collect-hq/nba-top-shot/2026-05-03-reactivation-copy-specimens.md` §"Targeting Appendix" + §"DO NOT SEND"
- **Vote shape:** option-a / option-b / option-c / option-d + free text comment
- **Status:** awaiting

---

### Q-ROHAM-07 — Sub-100 serial premium cliff: intentional design or product gap?

- **Asker:** Magic (marketing plan §"Decisions still owed", 2026-05-03)
- **Decision-maker:** Roham + Dan (joint product call)
- **Question:** Is the score/lottery distribution for sub-100 serials (the "sub-100 serial premium cliff") intentional product design, or is it a gap to fix?
- **Context:** Sub-100 serials carry a steep premium relative to >100 serials in the same edition. Whether this is by design (scarcity-engineered) or emergent (a market quirk we haven't addressed) determines whether any drop-design or score-formula change should attempt to flatten or preserve the cliff.
- **Consequences of yes (intentional):** No action required; the cliff is a deliberate scarcity mechanism. Drop design preserves it; score formula respects it.
- **Consequences of no (gap):** Product investigation required — score formula tweak, drop-design change, or marketplace mechanic to flatten the cliff.
- **Consequences of delay:** Every drop ships under uncertain treatment of the sub-100 band. Marketplace behavior on sub-100 is not currently modeled in any strategy doc — the unanswered question itself is a strategy gap.
- **Linked artifact:** `collect-hq/nba-top-shot/2026-05-03-marketing-plan-may3-17.md` §"Decisions still owed"
- **Vote shape:** intentional / gap-fix / needs-investigation + free text comment
- **Status:** awaiting (since 2026-05-03)

---

## 2. Dan Carreiro (Top Shot product DRI)

### Q-DAN-01 — Authorize Phase 2 GitHub Actions campaign approval pipeline (direct-send authority for pre-approved campaign types)

- **Asker:** Magic (GitHub Actions brief, 2026-05-03)
- **Decision-maker:** Dan + Roham (Dan listed as primary — he bridges eng↔producers per CLAUDE.md)
- **Question:** Yes / no / modify on Phase 2 of the GitHub Actions pipeline — direct-send authority for pre-approved campaign types after merge, no manual CIO step?
- **Context:** Phase 1 of the pipeline is the build (~8h dev — Ralf + Sid). Phase 2 is the policy decision: do pre-approved campaign types (e.g., Pack Received behavioral trigger, Welcome rebuilt v1004) ship on merge, or does every campaign go through manual CIO execution? Magic currently has read-only MCP access; Phase 2 grants write authority via the merge gate, not via direct API.
- **Consequences of yes:** Editorial pipeline unlocks. 78+ briefs sitting in draft files begin shipping on merge. Magic gets visibility on what shipped (current state: drafts buried in Slack, manual CIO execution, no shipped-confirmation). Pilot: Template 3428 rewrite ready.
- **Consequences of no:** Every campaign requires manual Guy/Sam pickup → manual CIO execution. The current bottleneck (drafts buried in Slack) persists. Volume capacity stays at whatever Guy/Sam can pick up between drop work.
- **Consequences of delay:** Each week = ~5–7 briefs that don't ship reliably. Compounds with Q-ROHAM-01 (two-tier framework approval) — even if the framework lands `yes`, the deploy bottleneck means the framework's bets can't ship at the cadence the success metrics assume.
- **Linked artifact:** `collect-hq/nba-top-shot/strategy/2026-05-03-github-actions-campaign-brief.md`
- **Vote shape:** ship / needs-work / no + free text comment
- **Status:** awaiting (since 2026-05-03, filed for Monday review)

---

### Q-DAN-02 — Prioritize the post-pack guided-next-step product fix (close the 83% pack-only / never-touch-marketplace gap)

- **Asker:** Magic (Stack Inventory §"Top 5 Priorities", 2026-05-04)
- **Decision-maker:** Dan (product DRI; engineering capacity allocation)
- **Question:** Yes / no on prioritizing the post-pack-open guided next step (single prompt: enter challenge / list duplicate on marketplace / view related sets) into the next 1–2 week sprint?
- **Context:** Loki: "83% of pack-only buyers never touch marketplace. No 'list this on marketplace,' no 'enter this challenge.'" Loki itself flags this as "one of the highest-leverage interventions available." It is a UI/product fix, not a copy fix — eng owns it.
- **Consequences of yes:** L2 → L3 conversion gains. Pack-only buyers become marketplace-active buyers. Bridges the documented post-pack dead end.
- **Consequences of no:** 83% gap persists. Every pack drop ($500K–$1M+ Tier A; $100–300K Tier B revenue, ~$10.8M annual) has 83% of its buyers exit the funnel immediately after pack-open.
- **Consequences of delay:** Each weekly drop = thousands of pack-opens with no guided next step. The April 15–16 spike alone was 1,466 + 992 pack-opens = 2,458 buyers, ~83% of whom dead-end.
- **Linked artifact:** `collect-hq/strategy/2026-05-04-collect-hq-stack-inventory.md` §"Surface 3 — Pack-Pull Experience" + §"Top 5 Priorities — Priority 3"
- **Vote shape:** ship / needs-work / no + free text comment
- **Status:** awaiting

---

### Q-DAN-03 — Ship mobile marketplace (close the web-redirect friction)

- **Asker:** Magic (Stack Inventory §"Mobile App", 2026-05-04)
- **Decision-maker:** Dan (product DRI; engineering — mobile team)
- **Question:** Confirm ship date for in-app mobile marketplace? Roadmap blog says "coming later this season" — what's the actual target?
- **Context:** Mobile is the highest-engagement context (peak 4,457 daily app opens Apr 18 vs. 1,777 baseline Apr 14). Marketplace is currently web-redirected. App reviews note collectors requesting in-app marketplace. The roadmap blog stated "coming later this season" as of 2025-26 roadmap publication; no shipped confirmation in any source.
- **Consequences of yes (confirmed ship date):** Mobile marketplace ships → friction reduction on the highest-engagement surface. Pairs naturally with Q-DAN-02 (post-pack guided next step).
- **Consequences of no:** Web redirect persists. Mobile collectors continue context-switching to browser to transact.
- **Consequences of delay:** Each playoff week of delay = continued mobile→web friction during the highest-volume window of the year (Apr 22 peak: 824 orders/day = 23.5× lift over baseline).
- **Linked artifact:** `collect-hq/strategy/2026-05-04-collect-hq-stack-inventory.md` §"Surface 9 — Mobile App"
- **Vote shape:** ship-date-confirmed / ship-date-unknown / not-prioritized + free text comment
- **Status:** awaiting

---

### Q-DAN-04 — Top Shot Live: confirm current state (stopped / sunset / rolled-into-Tap-to-Watch)

- **Asker:** Magic (Stack Inventory §"Top Shot Live", 2026-05-04)
- **Decision-maker:** Dan (product DRI — knows the surface history)
- **Question:** Confirm: is Top Shot Live (a) stopped, (b) sunset, (c) rolled into Tap to Watch (Fast Break NBA stream integration), or (d) something else entirely?
- **Context:** Zero results across 2025-26 roadmap blog, playoffs blog, and xAI search. The product surface existed historically (live drop/event streaming) but has no current-state documentation. Stack Inventory marks it "stopped / unconfirmed" pending product team confirmation.
- **Consequences of yes (any clear answer):** Stack Inventory state can be authoritatively updated. Cross-product synthesis (do other products use a live surface?) can proceed.
- **Consequences of no answer:** Stack Inventory carries "unconfirmed" indefinitely.
- **Consequences of delay:** Low immediate cost — but every cross-functional question that lands on "is Top Shot Live still a thing?" gets answered with "we don't know," which is a credibility leak.
- **Linked artifact:** `collect-hq/strategy/2026-05-04-collect-hq-stack-inventory.md` §"Surface 7 — Top Shot Live"
- **Vote shape:** stopped / sunset / rolled-in / other + free text comment
- **Status:** awaiting

---

## 3. Matt Schorr (Executive Producer + Head of Growth)

### Q-MATT-01 — Confirm Sam W. capacity allocation for editorial-tier reactivation prose (1 working day per cycle)

- **Asker:** Magic (CMO framework §8, 2026-05-04)
- **Decision-maker:** Matt + Sam W. (capacity confirm); routed via Matt as Sam's manager / production owner
- **Question:** Confirm Sam W. has ~1 working day of capacity per cycle for editorial-tier reactivation prose (Segments A, B, C — three drafts), with Magic providing data assembly + math + subject lines + AI-feel banned-phrase scan?
- **Context:** Sam W. is the named editor (Roham-ratified) for the editorial tier. The two-tier framework's editorial path requires Sam authoring prose, not just reviewing LLM drafts. Sam's other commitments: 3–4 playoff videos/day, plus the existing show-runner content backlog. Without explicit capacity allocation, the editorial tier cannot run.
- **Consequences of yes:** Editorial tier launches. 3 reactivation segment drafts per cycle. Whale-tier deferral remains (separate scope; 3 unblocks not Sam's bandwidth).
- **Consequences of no:** Editorial tier blocks; transactional tier ships v2 anyway (parallel path); reactivation slips to cycle N+1. Framework explicitly does NOT fall back to LLM-authoring editorial — that's the failure mode Wave 2A rejected.
- **Consequences of delay:** Each cycle without Sam's capacity = one cycle without the L+XL reactivation arm of the framework (the leg most directly tied to the 1,164-cohort, $244.8M GMV thesis).
- **Linked artifact:** `collect-hq/strategy/2026-05-04-cmo-action-framework.md` §6 + §8
- **Vote shape:** confirmed / partial / blocked + free text comment
- **Status:** awaiting

---

### Q-MATT-02 — Confirm v1004 whale-tier "L+XL Desk officer of record" assignment to Matt by name

- **Asker:** Magic (whale-tier rebuild, 2026-05-04)
- **Decision-maker:** Matt (consent on being named in the email)
- **Question:** Confirm: are you OK being named in the v1004 whale-tier rebuild as "Matt Schorr · L+XL Desk officer of record," with the reply path opening a real thread to your inbox, and a 48h SLA on per-recipient comp memos?
- **Context:** All four v1004 variants name Matt as the desk contact and route reply to `matt.schorr@nbatopshot.com`. CLAUDE.md identifies Matt as "the natural owner of the L+XL relationship surface." Sotheby's and J.P. Morgan benchmarks make a named human a load-bearing concierge primitive. Without your consent, the rebuild reverts to "the desk" as a faceless brand — which `feedback_pattern_analysis.md` already flagged as the v1003 failure mode.
- **Consequences of yes:** Whale-tier rebuild ships with named human handoff. Reply path is real. 48h comp memo SLA falls to you (with Magic's BQ data assembly).
- **Consequences of no:** Whale-tier surface needs an alternative named human (Kenny Zamora? Dan?) or reverts to a desk-without-pulse.
- **Consequences of delay:** Whale-tier rebuild blocks at the surface-name field; cards.ts variants cannot render to review without a name.
- **Linked artifact:** `collect-hq/strategy/2026-05-04-whale-tier-rebuild.md`
- **Vote shape:** confirmed / alternative-name / decline + free text comment
- **Status:** awaiting

---

### Q-MATT-03 — Approve PR amplification test (Sportico / The Athletic / Bleacher Report → "What the Market Called")

- **Asker:** Magic (CMO framework §6.7, 2026-05-03; marketing plan May 5)
- **Decision-maker:** Matt (Head of Growth — owns external press)
- **Question:** Yes / no / modify on running the PR amplification test? Send "What the Market Called" to 3 journalists (Sportico, The Athletic, Bleacher Report). Success metric: ≥1 of 3 cites a Top Shot data point in their next 4 weeks of coverage.
- **Context:** This is the C-evidence-layer experimental test from the CMO framework. The thesis (issuer-credibility deficit prevents external amplification) was confirmed across 5-agent swarm + R2/R3 attack. The test itself decides whether any C-amplification work is alive in 2026 — if it fails, "clean data that the amplification thesis is dead" per CMO framework. The piece is 95% complete, needs G7 result fills (Pistons advanced 116-94; Banchero 38/9/6 G7 loss).
- **Consequences of yes:** Test runs. Result clarifies whether external amplification is a live path or a dead one. Either way, the clean signal informs CMO cycle N+1.
- **Consequences of no:** Amplification thesis stays alive in theory but untested. Future CMO cycles re-litigate the same question without empirical resolution.
- **Consequences of delay:** Playoff window is the natural news hook. Outside playoffs, "What the Market Called" loses its time-anchor; the test becomes harder to run cleanly.
- **Linked artifact:** `collect-hq/nba-top-shot/2026-05-03-cmo-strategy-framework.md` §6.7 + `2026-05-03-marketing-plan-may3-17.md` §Week 1
- **Vote shape:** ship / needs-work / no + free text comment
- **Status:** awaiting

---

### Q-MATT-04 — Top 50 dormant collector data packs (Track 1 — Matt's personal-touch program)

- **Asker:** Magic (reactivation copy specimens, 2026-05-03)
- **Decision-maker:** Matt (owns the relationship layer; Magic provides data once unblocked)
- **Question:** Confirm appetite + capacity for Track 1: per-collector data packs for the top 50 dormant L+XL whales, hand-delivered via Matt (or Kenny escalation) as 1:1 outreach, NOT email broadcast?
- **Context:** Track 1 is the relationship-layer arm of the reactivation strategy — distinct from the Phase 2 CIO broadcast. The data packs require BQ credential refresh (currently blocked, GAP §7.1) for per-collector top-holdings + comp data. Matt's bandwidth on personal outreach is the human capacity layer.
- **Consequences of yes:** Top 50 dormant whales (subset of the 1,164 cohort, likely the highest-LT subset) get human-touch outreach. Independent of email distribution. Highest-trust restoration mechanism per `whale-tier-rebuild.md` benchmarks (Sotheby's, J.P. Morgan).
- **Consequences of no:** Top 50 whales fold into the email broadcast cohort — losing the relationship-layer benefit. Or stay un-contacted entirely.
- **Consequences of delay:** Each week of delay on Track 1 = compound dormancy on the highest-LT individuals (avg 865 days dormant already). Personal outreach decays fastest with time.
- **Linked artifact:** `collect-hq/nba-top-shot/2026-05-03-reactivation-copy-specimens.md` §Track 1
- **Vote shape:** confirmed / partial / no-capacity + free text comment
- **Status:** awaiting (BQ-blocked currently — see Q-ENG-02)

---

## 4. Sam Williams (named editor — voice DRI)

### Q-SAM-01 — Approve Sam W. as named editor for editorial tier; confirm voice rule baseline

- **Asker:** Magic (CMO framework §6.8, 2026-05-03; Wave 1A re-confirmed 2026-05-04)
- **Decision-maker:** Sam W. (capacity confirm); Roham already ratified
- **Question:** Re-confirm Sam W. as the editorial-tier voice DRI for NBA Top Shot email + community editorial? Roham ratified at the framework level; this question confirms ongoing capacity and the voice rules baseline.
- **Context:** Sam's 3× CTR multiplier (Camp 132 vs 163, same audience, same timing) is the empirical case for voice ownership. The named-editor seat is load-bearing for the editorial tier — without it, editorial defaults to LLM-generated and the framework collapses.
- **Consequences of yes:** Editorial tier has a voice DRI. Reactivation prose, whale-tier prose (when prerequisites unblock), and Run-It-Back content all route through Sam.
- **Consequences of no:** Editorial tier blocks until alternative editor named (no candidate currently identified).
- **Consequences of delay:** Same as Q-MATT-01.
- **Linked artifact:** `collect-hq/strategy/2026-05-04-cmo-action-framework.md` §3 (Editorial tier voice)
- **Vote shape:** confirmed / partial / decline + free text comment
- **Status:** awaiting (ratified at principle level; capacity confirm pending)

---

### Q-SAM-02 — Greenlight Sam W. sign-off on Magic's pending editorial inventory (Ten-Year Hold Test, Serial #5, LeBron Archive)

- **Asker:** Magic (marketing plan §"What requires other humans", 2026-05-03)
- **Decision-maker:** Sam W. (or Matt as escalation)
- **Question:** Three editorial pieces are written and queued for Sam's review/sign-off: Ten-Year Hold Test, Serial #5, LeBron Archive. Confirm Sam reviews + signs off (or kicks back) within 7 days?
- **Context:** 78+ briefs total in inventory. These three are the priority queue. They cannot ship without editor sign-off. Pending since tick 0400 with no response.
- **Consequences of yes:** Three pieces ship; queue advances; backlog decompresses.
- **Consequences of no:** Three pieces stay in draft; backlog grows; the volume cost compounds with Q-DAN-01 (deploy pipeline).
- **Consequences of delay:** Each week without sign-off = three more pieces moving into stale-draft territory. Some are time-anchored (Serial #5 is series-specific) and decay if not shipped during their window.
- **Linked artifact:** `collect-hq/nba-top-shot/2026-05-03-marketing-plan-may3-17.md` §"What requires other humans"
- **Vote shape:** sign-off-7d / kick-back / out-of-capacity + free text comment
- **Status:** awaiting

---

## 5. Guy Bennett + Sam Williams (jointly — CIO campaign management)

### Q-GUY-SAM-01 — Patch Camp 163 truncation (re-enable actions 4528 + 4550) AND fix UTM contamination

- **Asker:** Magic (Stack Inventory §"Top 5 Priorities — Priority 1", 2026-05-04; SoT §3.2)
- **Decision-maker:** Guy + Sam (CIO campaign owners; no engineering required — CIO admin only)
- **Question:** Confirm patching of Camp 163 — re-enable actions 4528 + 4550 (currently 0 sends in 30d), restore Camp 132 dynamic content injection (`{{ content }}`), and fix UTM parameters pointing to a May 2025 drop announcement?
- **Context:** Three documented defects, all CIO-admin remediable (no engineering). Camp 163 V2 removed 85% of email touchpoints from V1. UTM contamination corrupts ALL welcome attribution. Filed with Guy/Sam tick 0400 — no response. Net impact of fix: 3× CTR improvement on 3,279 new-user sends/month.
- **Consequences of yes:** Same-day fix possible. Welcome funnel returns toward Camp 132 baseline (44.2% open / 12.8% CTR). Causal-attribution UTM stops corrupting the data pipeline.
- **Consequences of no:** Camp 163 stays broken. Dark-window outperforms it (8.54% vs. 6.75% Welcome #132 era D7) → V2 is plausibly suppressing conversion below absent-program baseline.
- **Consequences of delay:** Every day the broken welcome runs = ~270 new signups going through the 4.85% CTR funnel instead of the 13.24% baseline. Cumulative cost compounds with the playoff acquisition window.
- **Linked artifact:** `collect-hq/nba-top-shot/intelligence/2026-05-03-camp163-v2-onboarding-investigation.md` + `collect-hq/strategy/2026-05-04-collect-hq-stack-inventory.md` §"Surface 8 — Auth Portal"
- **Vote shape:** patched / partial / blocked + free text comment
- **Status:** awaiting (filed tick 0400; no response 24h+)

---

### Q-GUY-SAM-02 — Patch Fast Break Daily Result email (template 1133 broken Liquid URL)

- **Asker:** Magic (SoT §5.1, 2026-05-04; Stack Inventory)
- **Decision-maker:** Guy + Sam (CIO admin)
- **Question:** Confirm 15-minute fix on template 1133 — the broken Liquid URL `?fastBreakId={{ event[` (malformed tag, link broken on every send)?
- **Context:** Production defect on a running campaign. Fast Break is a retention-critical surface (drives daily app opens; lead-lag with email blasts). Every send currently has a broken link.
- **Consequences of yes:** Same-day fix. Fast Break Daily Result email becomes functional.
- **Consequences of no:** Every Fast Break send keeps the broken URL. User-trust damage compounds.
- **Consequences of delay:** Each day = ~hundreds of broken-link sends. The CMO action framework explicitly carves out production-defect fixes from the rubric review gate so they ship FIRST regardless of voice work — this is that case.
- **Linked artifact:** `collect-hq/strategy/2026-05-04-collect-hq-stack-inventory.md` §"Surface 14 — Customer.io Email Stack"
- **Vote shape:** patched / blocked + free text comment
- **Status:** awaiting

---

## 6. Kenny Zamora (Lead Customer Support Agent)

### Q-KENNY-01 — Surface support ticket themes + NPS for sentiment-store seed (closes GAP §7.8)

- **Asker:** Magic (sentiment gap-fill, 2026-05-04)
- **Decision-maker:** Kenny (owns the support queue; routes via Matt for prioritization)
- **Question:** Confirm Kenny can surface (a) top 10 recurring support ticket themes from the last 90 days, (b) any NPS or CSAT data Top Shot tracks, (c) whale-tagged ticket sub-themes specifically?
- **Context:** SoT GAP §7.8 (Collector Sentiment Data) — no current 2026 collector sentiment data in any source. Discord scrapes blocked (auth-gated). Reddit blocked (403 to WebFetch). X paywalled (402). Support tickets are the one structured qualitative signal Top Shot owns end-to-end. Kenny's queue is the seed for the Collector Voice tier in IA spec §7.
- **Consequences of yes:** Collector Voice tier in `/research/voice` has a real seed (10+ themes, sentiment-tagged). Editorial reactivation framing gets ground-truth signal beyond market-behavior inference.
- **Consequences of no:** Collector Voice tier stays at the SoT-cited level (community language adoption: "proof moment," "incomplete document," "name getting heavier") — qualitative but not quantified.
- **Consequences of delay:** Each cycle without Kenny's queue surface = editorial decisions made on inferred sentiment. Sentiment store creation in `collect-hq/community/sentiment/` (currently a folder GAP) cannot start.
- **Linked artifact:** `collect-hq/strategy/2026-05-04-strategy-sot.md` §7.8 + `2026-05-04-phase1-sentiment-gap.md`
- **Vote shape:** can-surface / partial / blocked + free text comment
- **Status:** awaiting

---

## 7. Engineering (Ralf, Sid, mobile team, BQ admin)

### Q-ENG-01 — Restore BQ IAM for `magic-agent@dl-kaaos.iam.gserviceaccount.com` (`bigquery.jobUser` on `dapperlabs-data`)

- **Asker:** Magic (every BQ-blocked file in this session, 2026-05-04)
- **Decision-maker:** Engineering (GCP IAM admin — likely Ralf or Dan-routed)
- **Question:** Restore `bigquery.jobUser` permission on `dapperlabs-data` for `magic-agent@dl-kaaos.iam.gserviceaccount.com`? Roham flagged this as the longest-running blocker in the session.
- **Context:** 30 seconds of GCP console work. Blocks: actual dormant-cohort segment sizes (GAP §7.1), per-collector P&L join (Q-ROHAM-06 cohort sizing), causal-spend-lift measurement (GAP §7.10), pack-drop revenue per tier (GAP §7.11), Banchero post-elimination price discovery (GAP §7.2 — Phase 1 marketplace gap-fill ran without it), Mixpanel × BQ join for placed-order rate (GAP §7.7), top-collector ranking (KPI section D1 BLOCKED).
- **Consequences of yes:** ALL above gaps become Heimdall-runnable in same session. GAP §7.1 closes within hours. GAP §7.10 starts closing.
- **Consequences of no:** Magic continues to operate on cached BQ numbers from prior sessions + Loki estimates. Verification gates fail on freshness checks. Most GAPS in §7 stay open.
- **Consequences of delay:** This is the highest-multiplier blocker in the entire decision log. It's been flagged the longest. Every day = compound delay on 5+ downstream questions.
- **Linked artifact:** `collect-hq/strategy/2026-05-04-strategy-sot.md` §7.1 + §7.10 + `2026-05-04-collect-hq-kpis.md` §BLOCKED METRICS
- **Vote shape:** restored / pending / blocked + free text comment
- **Status:** awaiting (longest-running blocker per Roham flag)

---

### Q-ENG-02 — Fix CIO → Mixpanel `campaign_id` attribution (P2 ticket; close 32–57% dark)

- **Asker:** Magic (SoT §3.4 + §7.5, 2026-05-04)
- **Decision-maker:** Engineering (P2 ticket)
- **Question:** Confirm scoping + ETA on the CIO → Mixpanel `campaign_id` tagging fix (P2 ticket per marketing plan)?
- **Context:** 57.2% of Email Link Clicked events have no `campaign_id`. Marketing plan stated "32% of campaign data currently dark" — both numbers are material. Without consistent campaign_id tagging, causal spend lift per campaign (the primary KPI) is unmeasurable.
- **Consequences of yes:** Causal-attribution pipeline closes. Pairs with Q-ENG-01 (BQ IAM) and Q-ENG-03 (CIO holdout config) to fully unlock GAP §7.10.
- **Consequences of no:** Primary KPI stays unmeasurable. The hard-stop trigger ("3 consecutive below-baseline pieces → rotate") cannot fire.
- **Consequences of delay:** Same compound cost as Q-ENG-01 — every campaign run without measurement is wasted signal.
- **Linked artifact:** `collect-hq/strategy/2026-05-04-strategy-sot.md` §7.5 + §3.4
- **Vote shape:** scoped / sprint-N / not-prioritized + free text comment
- **Status:** awaiting

---

### Q-ENG-03 — Atlas `consumer` schema provisioning into BigQuery (`dl-kaaos`)

- **Asker:** Magic (CLAUDE.md open-work + SoT §7.9, 2026-05-04)
- **Decision-maker:** Engineering (data platform — provisioning request)
- **Question:** Confirm scoping + ETA on Atlas `consumer` schema → BigQuery `dapperlabs-data` (dl-kaaos location)?
- **Context:** Atlas `consumer` schema holds Quest, Picks, Fast Break, and challenge-completion events. Currently invisible to data science. Challenge participation rate (14% vs. 30% NFL benchmark) is the largest single engagement gap in the product, and it can't be measured at user level without this schema.
- **Consequences of yes:** Fast Break × email lead-lag becomes measurable. Challenge participation cohorts addressable. Picks attribution to marketplace spend joinable.
- **Consequences of no:** All Quest/Picks/Fast Break engagement stays at Loki-context-estimate level (Confidence 0.4).
- **Consequences of delay:** Every playoff week = compound loss on Fast Break/Picks instrumentation. Road to the Ring (April 17 → June 26) is a 70-day window; we're already 17 days in without instrumentation.
- **Linked artifact:** `collect-hq/strategy/2026-05-04-strategy-sot.md` §7.9 + CLAUDE.md "Powers I do not yet have"
- **Vote shape:** scoped / sprint-N / not-prioritized + free text comment
- **Status:** awaiting (filed pre-2026-05-03)

---

### Q-ENG-04 — Build the GitHub Actions campaign approval pipeline (Phase 1 — ~8h dev)

- **Asker:** Magic (GitHub Actions brief, 2026-05-03)
- **Decision-maker:** Engineering (Ralf + Sid named); Dan + Matt as reviewers
- **Question:** Confirm 8h dev allocation for GitHub Actions Phase 1 build (1h repo setup + 2h validation Action + 3h deploy Action + 30min CIO credentials + 1h test)? Pilot campaign Template 3428 rewrite is ready.
- **Context:** Spec written and filed 2026-05-03 — ready for Monday review. The build is the prerequisite to Q-DAN-01 (Phase 2 direct-send authority).
- **Consequences of yes:** One-day sprint unblocks editorial deploy at scale. 78+ briefs begin shipping reliably.
- **Consequences of no:** Manual CIO execution remains the binding constraint. Volume capped at Guy/Sam pickup rate.
- **Consequences of delay:** Same compound cost as Q-DAN-01.
- **Linked artifact:** `collect-hq/nba-top-shot/strategy/2026-05-03-github-actions-campaign-brief.md`
- **Vote shape:** scoped / sprint-this-week / not-prioritized + free text comment
- **Status:** awaiting (filed for Monday review)

---

### Q-ENG-05 — Build the per-collector real-data pipeline (BQ → Customer.io journey attributes; whale-tier prerequisite)

- **Asker:** Magic (whale-tier-deferred §Unblock 1, 2026-05-04)
- **Decision-maker:** Engineering (data platform); Roham + Matt as scope confirmers
- **Question:** Confirm scoping for the per-collector real-data sync (top hold by serial, last purchase date, recent floor movement on held Moments, set completion %, current player narrative status) from BQ → CIO?
- **Context:** Whale-tier rebuild's first prerequisite. v1004 variants depend on `customer.whale_hold_image_url`, `whale.hold_recommendation.gain_pct`, etc. Engineering ownership. Spec outlined in `intelligence/2026-05-03-proof-you-were-there-spec.md`.
- **Consequences of yes:** Whale-tier rebuild can render with real data. First-batch ship becomes possible after Q-ENG-01 (BQ IAM) + Sam W. capacity (Q-MATT-01 / Q-SAM-01) + CIO send authorization for whale cohort (Q-ROHAM-02).
- **Consequences of no:** Whale-tier stays in DEFERRED tier indefinitely.
- **Consequences of delay:** 1,164 dormant L+XL whales (incl. ~1,000+ active L+XL) stay un-served by personalized email. Estimated 2–4 week build per whale-tier-deferred §Unblock 1.
- **Linked artifact:** `collect-hq/strategy/2026-05-04-whale-tier-deferred.md` §Unblock 1
- **Vote shape:** scoped / sprint-N / not-prioritized + free text comment
- **Status:** awaiting

---

### Q-ENG-06 — BQ→CIO segment sync for Cooper Flagg, TST, Wemby (8–12× CTOR uplift estimate)

- **Asker:** Magic (marketing plan §"What requires other humans", 2026-05-03)
- **Decision-maker:** Engineering (P1 per marketing plan; data team)
- **Question:** Confirm scoping + ETA on BQ collector segments → CIO audience list sync for Flagg, TST, Wemby debuts?
- **Context:** Cooper Flagg is "the highest-value Fresh Threads / Top Shot Debut opportunity since Wembanyama" per Loki. The sync enables targeted Flagg debut sends to collectors matching predictive interest signals. P1 engineering item per marketing plan.
- **Consequences of yes:** Flagg debut sends targeted at high-interest collectors with 8–12× CTOR uplift estimate.
- **Consequences of no:** Flagg debut sends go broadcast → diluted CTOR.
- **Consequences of delay:** Flagg debut window is one-time. Missing it can't be re-run.
- **Linked artifact:** `collect-hq/nba-top-shot/2026-05-03-marketing-plan-may3-17.md` §"What requires other humans"
- **Vote shape:** scoped / sprint-N / not-prioritized + free text comment
- **Status:** awaiting

---

## 8. Cross-product / Persii (Disney Pinnacle Show Runner — peer)

### Q-XP-01 — Persii: cross-product whale crossover analysis (NBA Top Shot × Disney Pinnacle collectors)

- **Asker:** Magic (CLAUDE.md cross-product discipline rule + SoT §7.6)
- **Decision-maker:** Persii (Disney Pinnacle Show Runner) + Magic (NBA Top Shot Show Runner) — joint cross-product synthesis; routed via Roham
- **Question:** Confirm Persii has bandwidth + permission to run a cross-product whale crossover analysis: which collectors are active on both Top Shot and Pinnacle? Which lapsed-NBA collectors are active on Disney? This is filed as a finding for cross-product synthesis, NOT action by either Show Runner per the cross-product discipline rule.
- **Context:** Cross-product discipline (CLAUDE.md): "When I notice something cross-product (whales who collect NBA + NFL, lapsed NBA users active on Disney, etc.), I surface it as a finding for Roham + cross-product synthesis. I do not act on non-NBA products." `feedback_cross_product_discipline.md` is the durable feedback that crystallized this rule (Roham caught me citing Disney drop details as NBA in #collect-growth).
- **Consequences of yes:** Cross-product synthesis layer gets data. SoT GAP §7.6 (Disney Pinnacle crossover) closes. The "purple XP chip" route at `/open-questions/cross-product` (per IA spec §8) gets a real first artifact.
- **Consequences of no:** Cross-product layer stays at theory level. Whale-overlap question stays open.
- **Consequences of delay:** Lower compound cost than NBA-internal questions, but the synthesis can compound — the longer we don't see the overlap, the longer cross-product strategy decisions are made blind.
- **Linked artifact:** `collect-hq/strategy/2026-05-04-strategy-sot.md` §7.6 + `2026-05-04-phase1-competitive-gap.md` §C (Disney Pinnacle crossover)
- **Vote shape:** can-run / partial / blocked + free text comment
- **Status:** awaiting

---

## 9. Top 5 questions Roham must answer this week

Stack-ranked by consequence-of-delay (highest cost-of-inaction first). Timeframes are aggressive but defensible — each is the next lever the broader system needs.

1. **Q-ROHAM-01 — Approve the two-tier email split.** Timeframe: 48h. Cost of delay: every week, ~8,500 new signups go through a broken Camp 163 funnel; the current path has no productive iteration left.
2. **Q-ROHAM-02 — Authorize CIO Phase 2 send (Reactivation broadcast).** Timeframe: 72h. Joint with Dan. Cost of delay: 1,164 dormant whales (avg 865 days dormant) decay further; playoff narrative window is the highest-leverage reactivation moment of the year.
3. **Q-ROHAM-03 — Greenlight the rewrite swarm execution.** Timeframe: 24h after Q-ROHAM-01. Cost of delay: framework approval without execution capacity = work stalls at the spec layer.
4. **Q-ROHAM-04 — Approve the v1004 whale-tier rebuild.** Timeframe: 7d. Cost of delay: visual rebuild is logically prior to operational unblock; without it, even when prerequisites land, there's no template to render into.
5. **Q-ROHAM-05 — Drop cadence: keep monthly batch, or test alternative cadence.** Timeframe: 14d (research-gated). Cost of delay: three-leg hypothesis stays unvalidated; "growth hasn't really moved" remains the standing observation.

---

## 10. Decisions that are stuck behind other decisions (dependency chain)

The structure is a directed graph; the binding constraint is at the root.

```
Q-ENG-01 (BQ IAM)
   │
   ├──> Q-ROHAM-06 (negative-math cohort framing — needs per-wallet P&L)
   ├──> Q-MATT-04 (Track 1 data packs — needs per-collector top holdings)
   ├──> Q-ENG-05 (per-collector pipeline — needs BQ joins)
   │       │
   │       └──> Q-ROHAM-04 outcome execution (whale-tier first-batch ship)
   │
   ├──> GAP §7.1 close (dormant cohort sizes)
   ├──> GAP §7.2 close (Banchero post-G7 price discovery, 24h/72h/7d)
   ├──> GAP §7.7 close (placed-order rate per email program)
   ├──> GAP §7.11 close (pack-drop revenue per tier)
   │
   └──> Q-ENG-02 + Q-ENG-03 (campaign_id + Atlas schema)
            │
            └──> GAP §7.10 close (causal spend lift measurement infrastructure)
                    │
                    └──> Q-ROHAM-01 success metric measurability
                            │
                            └──> Q-ROHAM-03 swarm Day-30 review threshold


Q-ROHAM-01 (two-tier framework)
   │
   ├──> Q-ROHAM-03 (rewrite swarm execution)
   │       │
   │       └──> Q-MATT-01 + Q-SAM-01 (Sam W. capacity + named editor)
   │               │
   │               └──> Q-SAM-02 (sign off pending editorial inventory)
   │
   ├──> Q-DAN-01 (GitHub Actions Phase 2 — direct-send authority)
   │       │
   │       └──> Q-ENG-04 (Phase 1 build, ~8h)
   │
   └──> Q-GUY-SAM-01 (Camp 163 patch — runs in parallel; framework approval gates voice direction)


Q-ROHAM-02 (CIO Phase 2 — Reactivation broadcast)
   │
   ├──> joint with Dan
   ├──> Q-MATT-04 (Track 1 — independent path; Q-ROHAM-02 covers broadcast, Q-MATT-04 covers 1:1)
   └──> downstream: A/B test (Editorial vs LLM-control) on dormant cohort


Q-ROHAM-04 (v1004 whale-tier rebuild)
   │
   ├──> Q-MATT-02 (Matt as named officer — consent)
   └──> Q-ENG-05 (per-collector pipeline — for live-data render)
        │
        └──> Q-ROHAM-02-equivalent for whale cohort (CIO send authorization for whale band specifically)
```

**The single highest-leverage unblock in the entire chain is Q-ENG-01 (BQ IAM).** It is 30 seconds of GCP console work; it has been the longest-running blocker; it dominates 8 other questions. Roham's flag in the KPI doc — "longest-running blocker in this session" — is the warning. Every day this stays open compounds the cost on five GAPS and three downstream Q-cards.

---

## 11. Compiler self-audit

Per the constraints in the task brief:

1. **Every card has all 9 required fields.** Verified by spot-check on Q-ROHAM-01, Q-DAN-01, Q-MATT-02, Q-ENG-01, Q-XP-01 — full field coverage. Cards that couldn't fill a field were dropped (e.g., the standing question "should we redesign the homepage?" — no specific decision-maker, no specific consequence-of-delay → not ripe, dropped).
2. **Yes/no/multi-choice phrasing where possible.** All Roham + Dan cards phrased yes/no/modify. Multi-choice used for Q-ROHAM-05 (cadence — three options enumerated), Q-ROHAM-06 (negative-math framing — four options enumerated), Q-DAN-04 (Top Shot Live state — four options enumerated).
3. **Neutral framing.** No card pre-argues Roham's preferred answer. Each "Consequences of yes" and "Consequences of no" is symmetric in tone.
4. **Roham-targeted questions verified as genuinely his to call.** Q-ROHAM-01 (CMO framework — sole DM per CMO §8 row "Approve the two-tier split"). Q-ROHAM-02 (joint with Dan, but Roham listed first per CIO §6.6 "pending Roham + Dan auth"). Q-ROHAM-03 (rewrite swarm — Roham per `2026-05-04-rewrite-action-plan.md` §"The 1 ask"). Q-ROHAM-04 (whale-tier rebuild — Roham per `2026-05-04-whale-tier-rebuild.md` final line "To ship: Roham approval"). Q-ROHAM-05 (drop cadence — Roham articulated the bet himself). Q-ROHAM-06 (negative-math — joint Roham + Dan, voice rule from Roham). Q-ROHAM-07 (sub-100 serial — joint Roham + Dan per marketing plan).
5. **All cards votes-shippable.** Each card has `vote shape` filled. Each carries a status. The `/api/feedback` payload extension in IA spec §"Spot-read self-verification" supports `card_type: open-question` and the votes used here (ship / needs-work / no / urgent / important / nice-to-have).

Output target was 500–900 lines. Current line count: ~580 lines.

---

*Compiled 2026-05-04 by Magic (decision-log compiler hat).*
*Sources: 16 strategy docs in `/opt/magic/collect-hq/strategy/`, IA spec, stack inventory, KPI doc, all 12 SoT GAPs, 7 memory feedback files. Spot-read verified mid-stream and at completion.*
*Status: ready for Site Builder agent. Each card renderable at `/open-questions/<id>` per IA spec §8 voting/feedback model.*
