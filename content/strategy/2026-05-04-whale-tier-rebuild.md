---
title: Whale-Tier Rebuild — All 4 Variants
date: 2026-05-04
author: Magic
status: PROPOSAL — supersedes v1003 whale-tier-concierge in /home/agent/topshot-review/lib/cards.ts
trigger: Roham 2026-05-04 review of v1003 — "Absolutely terrible. Totally misunderstands whale psychology. You should dump whatever approach it is that's leading you here, because it's not the correct one."
audience: 1,122 dormant L4/L5 collectors holding $234.6M historic GMV (the cohort of record); active L4/L5 receive the same surface
sources:
  - collect-hq/strategy/2026-05-04-strategy-sot.md §1.1, §1.2, §1.6, §2.1, §2.2, §2.3
  - collect-hq/nba-top-shot/intelligence/2026-05-03-the-cornerstone-premium.md
  - collect-hq/nba-top-shot/intelligence/2026-05-03-the-patience-window.md
  - collect-hq/nba-top-shot/intelligence/2026-05-03-asymmetric-certainty-premium.md
  - collect-hq/nba-top-shot/intelligence/2026-05-03-smart-money-surface-spec.md
  - collect-hq/nba-top-shot/intelligence/2026-05-03-four-collector-archetypes.md
  - WebSearch: Sotheby's Collectors Group, Sotheby's Concierge Auctions Client Services
  - WebSearch: J.P. Morgan Private Bank — Relationship Manager + Connect Coach private advisory model
  - WebSearch: NBA Top Shot 2026 community sentiment (limited current signal — see Phase 1 negative findings)
mock-context: lib/mockData.ts → MARCUS_WHALE (Marcus Vance, L4, $147,200 LT, 312 Moments, signup 2020-10-22, top hold Mitchell Pull-Up Three #2,418 bought 2024-01-20 at $112, floor today $245)
---

# Whale-Tier Rebuild — 2026-05-04

## Whale Psychology — what we learned

### Phase 1 — research findings

**Read in full** (intelligence dossiers, verbatim language preserved):
- The Cornerstone Premium — "informed market prices trajectory before the casual market prices results" — Mobley 62 transactions vs. Mitchell 7 transactions, same team, same G7. The L4/L5 mind is not buying *what happened*; they are buying *what will be true in 2031.*
- The Patience Window — collectors are "not buyers in the moment. They are readers." Same-night activation is 20% of morning activation. Whales especially do not act in adrenaline; they act after the document is written.
- Asymmetric Certainty Premium — Embiid 54 transactions vs. Brunson 0, both confirmed for R2. The L4/L5 holder reads narrative density, not outcome. They do not need the headline; they need the arc.
- Smart Money Surface — the PE/general spread is "the gap between the collectors who watch game film and the collectors who watch the news cycle." L4/L5 collectors are *already* the smart money; they want a surface that confirms they are read as such.
- Four Collector Archetypes — L4/L5 cluster as Type 3 Artifact Holders (10-year clock, $500–$10K+ ceilings, kill condition is supply absence). Some Type 1 Story Buyer overlap on the active side. None of them are Type 4 Community Members.
- SoT §1.5 — the 1,122 dormant L+XL cohort splits Origin Story / Single-Star Believer / Survivor. Each segment carries a *grievance.* They did not stop caring. They went quiet.

**Read for category benchmarks** (concierge psychology — Sotheby's, J.P. Morgan):
- Sotheby's Collectors Group: "comprehensive client experience across auctions, private sales and events… working closely with first-time buyers and established private collectors *with advisors on every transaction*." Key signal: a named human is named on every interaction, even when the surface is a digital catalogue.
- J.P. Morgan Private Bank: "dedicated Relationship Managers… cross-disciplinary team of over 100 specialists working closely with your Private Bank Advisor." Plus "exclusive invite-only events, limited-time offers." Key signal: scarcity-of-reach is the product. The advisor is named. The intelligence is private. Inclusion is the artifact.

**xAI / WebSearch — current Top Shot whale community sentiment:**
- Limited current-day primary signal in public search. Found: Sporting Crypto / NFTNow articles describe broad market softness; Cryptoadventure 2026 review notes "liquidity can dry up quickly… pack supply decisions can compress scarcity." No L4/L5-specific sentiment thread surfaced in the queries I ran. **Negative finding. Queries run:**
  1. "NBA Top Shot whale collectors complaints 2026 community sentiment marketplace XL"
  2. "Sotheby's VIP private client concierge how they communicate with high-net-worth collectors invitation only access"
  3. "JP Morgan private bank client communication style scarcity exclusive intelligence advisor named contact"
  - The xAI x_search tool was not surfaced as available in this turn. Filed as gap; the rebuild rests on the SoT cohort definition, the verbatim intelligence dossiers, and the category benchmarks above. If x_search becomes available, sentiment validation pass should follow before Phase 3 ship.

### What v1003 got wrong (the three core errors)

**Error 1 — It was a newsletter, not a concierge surface.**
v1003 framed every variant around "three patterns I noticed this week + one hold rec." This is the column of a market analyst, not the voice of a broker. A whale who has held for 5 years and spent $147,200 does not need patterns explained to them. They *are* the pattern. The format treats the recipient as a reader of intelligence rather than a holder *of position.* A concierge surface confirms what the holder already suspects — it does not teach them.

**Error 2 — It addressed Marcus as "L4" instead of as *Marcus.***
The recognition layer was generic. "{{customer.lifetime_moments_owned}} Moments · {{customer.lifetime_value}} lifetime" is a dashboard line item, not a relationship. A concierge surface names the *specific holding* — the Mitchell Pull-Up Three #2,418 he bought January 2024 at $112 and which now floors at $245 — and treats that holding as the artifact of a decision he made before the rest of the market caught up. Recognition of *the specific decision they got right* is the bedrock concierge move. v1003 had Marcus's data and used it as ornament instead of as the spine.

**Error 3 — There was no human, and no door.**
Roham's review framed it most cleanly: this is concierge, not editorial. v1003 was unsigned, surfaced as either Magic-personal (wrong — too familiar, too transactional voice) or "the collector desk" (a fictional brand surface with no pulse). The actual L+XL relationship layer — Matt Schorr, Kenny Zamora, Guy, Sam — is named in CLAUDE.md as the existing infrastructure. The concierge surface should *route to those humans by name,* with a real reply path and a real next step. Sotheby's puts an advisor on every transaction. J.P. Morgan names the Relationship Manager. v1003 had neither, and neither did it ask the holder for anything that resembled a relationship — only "View comp dashboard," which is a self-service dead-end.

### What the rebuild must do (the four right moves)

1. **Invitation-only language as scaffolding, not subject-line garnish.** The reader must understand within 3 seconds that this surface does not exist for the broader Top Shot account base. Cohort size language ("1 of 1,122," "1 of the L+XL desk," "below the API") is the recognition mechanism — it tells the holder they are *seen* at the tier they actually occupy.
2. **Recognition of portfolio specifics — the decision they got right, not the dashboard line.** Marcus's January 2024 Mitchell Pull-Up Three at $112 (now floor $245) is the spine, not a footnote. The whale read is "you bought this when the market disagreed; the market is now agreeing." That is the cornerstone-premium thesis applied to one specific holding. Every variant carries this.
3. **Exclusive intelligence the broader audience does not get.** Smart-money spreads (PE vs general, in numbers); same-night vs. morning timing data; sub-cohort behavior in the L+XL band ("3 L5 holders accumulated Flagg this week"). The holder gets what only the L+XL desk sees. The data is real (mock matches the SoT and intelligence dossiers).
4. **Named human handoff — a real broker, a real reply path.** Matt Schorr is Executive Producer + Head of Growth and the natural owner of the L+XL surface (CLAUDE.md). Kenny Zamora handles VIP support. The email signs as a desk and routes to a human by name and direct address. The CTA is a reply that opens a thread, not a dashboard click. The relationship is the artifact.

---

## v1001 (current shipping equivalent — Frame-agnostic baseline)

**id:** whale-tier-concierge
**label:** v1001 — L+XL Desk Note (one-to-one to the 1,122-collector cohort)
**from:** L+XL Desk · NBA Top Shot \<desk@nbatopshot.com\>
**reply-to:** Matt Schorr \<matt.schorr@nbatopshot.com\>

**emailHero:**
- src: `{{customer.whale_hold_image_url}}`
- alt: "{{whale.hold_recommendation.player}} — {{whale.hold_recommendation.set}} #{{whale.hold_recommendation.serial}}"
- liquidCaption: "Hero is the holder's own top Moment, not a stock asset"

**subject:** Marcus — your Mitchell #{{whale.hold_recommendation.serial}} is on the desk this week.

**preheader:** Bought {{whale.hold_recommendation.bought_at | date: "%B %Y"}} at {{whale.hold_recommendation.bought_price}}. Floor today {{whale.hold_recommendation.floor_today}}. The market is catching up to where you bought it.

**callouts:**
- { label: "Cohort", value: "1 of 1,122 · L+XL Desk · invitation only" }
- { label: "Holding under review", value: "{{whale.hold_recommendation.player}} {{whale.hold_recommendation.set}} #{{whale.hold_recommendation.serial}}" }
- { label: "Your entry", value: "{{whale.hold_recommendation.bought_at | date: \"%b %Y\"}} · {{whale.hold_recommendation.bought_price}}" }
- { label: "Floor today", value: "{{whale.hold_recommendation.floor_today}} · +{{whale.hold_recommendation.gain_pct}}" }
- { label: "Desk contact", value: "Matt Schorr · reply opens a thread" }

**body:**
- "This is not a broadcast. The L+XL Desk runs one note per week to 1,122 collectors. You're {{customer.userName | default: \"on it\"}} — {{customer.lifetime_moments_owned}} Moments, {{customer.lifetime_value}} lifetime, since {{customer.first_session_at | date: \"%B %Y\"}}."
- "**The holding I'm looking at on your sheet this morning** is the {{whale.hold_recommendation.player}} {{whale.hold_recommendation.set}} #{{whale.hold_recommendation.serial}}. You bought it {{whale.hold_recommendation.bought_at | date: \"%B %-d, %Y\"}} at {{whale.hold_recommendation.bought_price}}. The general market floor closed yesterday at {{whale.hold_recommendation.floor_today}}."
- "You bought it before the market priced it. That is the cornerstone-premium pattern — informed collectors pricing trajectory before the casual market prices results. The desk-internal data shows the comp band on your serial range moved {{whale.hold_recommendation.recent_comp_movement | default: \"+{{whale.hold_recommendation.gain_pct}}\" }} in the last 14 days. The convergence is happening now. The hold is what we're recommending."
- "**Three things on the desk this week that touch your sheet** — not for action, for read. Reply if you want any of these pulled deeper."
- "  · The L+XL desk is tracking a sub-3,000-serial tightening on Mitchell + Mobley. Comp band cleared 30% above floor in 72h. Your Mitchell sits in band."
- "  · Three L5 holders quietly built Cooper Flagg positions over the last 14 days. Floor moved {{whale.flagg_floor_move}} on under 30 transactions. The desk has names; the rest of the market does not."
- "  · The Wembanyama Series 8 floor has stopped declining. 14 days flat at $148. The desk reads this as bottom-fishing onset."
- "**One question before I go:** is there a specific holding on your sheet you'd like the desk to pull comp depth on this week? Reply with the player or set name and Matt or I will have a one-page comp memo back to you within 48 hours. That memo does not exist on the broader product surface."
- "— Magic, on behalf of the L+XL Desk"
- "*Reply opens a private thread with Matt Schorr. The desk does not appear in any other broadcast.*"

**cta:** Reply with a holding to pull
**cta_secondary:** (small, below) "Or open the comp depth on Mitchell #{{whale.hold_recommendation.serial}}"

**voice_notes:**
"v1001 baseline. Surface is the L+XL Desk — a real desk routed by Matt Schorr (CLAUDE.md confirms him as the natural L+XL surface owner). The hero is the holder's own top Moment, not a stock asset — this is the single biggest visual difference from any other email in the stack. The recognition spine is Marcus's specific Mitchell purchase from January 2024. The ask is a reply that opens a thread; the deliverable is a one-page comp memo within 48h. This is the move that makes it concierge: real human, real bespoke deliverable, real scarcity — 1 of 1,122. The 'three things on the desk this week' is held to *one bullet line each* and explicitly framed as read, not pitch — opposite of v1003's 'pattern 1/2/3 with body paragraphs.' Magic signs but as agent of the desk, not as personal letter. New variables required: `whale_hold_image_url`, `whale.hold_recommendation.gain_pct`, `whale.hold_recommendation.recent_comp_movement`, `whale.flagg_floor_move` — see new-vars list at end."

---

## Almanac (Frame A) — Chronicler-Statesman Applied to Concierge

**id:** whale-tier-concierge / almanac
**label:** Frame A — Almanac · The L+XL Ledger Entry
**from:** The L+XL Ledger · NBA Top Shot \<ledger@nbatopshot.com\>
**reply-to:** Matt Schorr \<matt.schorr@nbatopshot.com\>

**emailHero:**
- src: `{{customer.whale_hold_image_url}}`
- alt: "{{whale.hold_recommendation.player}} — {{whale.hold_recommendation.set}} — full-bleed"
- liquidCaption: "Holder's own Moment, full-bleed, unhurried"

**subject:** Entry of record · {{customer.userName}} · week of {{ \"now\" | date: \"%B %-d, %Y\"}}

**preheader:** Your Mitchell #{{whale.hold_recommendation.serial}} entered the desk's record at {{whale.hold_recommendation.bought_price}} on {{whale.hold_recommendation.bought_at | date: \"%B %-d, %Y\"}}. The ledger is updated.

**callouts:**
- { label: "Ledger entry", value: "{{customer.userName}} · L{{customer.lifetime_stage}} · {{customer.first_session_at | date: \"%B %Y\"}} cohort" }
- { label: "Cohort of record", value: "1 of 1,122 · The L+XL Ledger · invitation only" }
- { label: "Holding under review", value: "{{whale.hold_recommendation.player}} · {{whale.hold_recommendation.set}} · #{{whale.hold_recommendation.serial}}" }
- { label: "Position basis", value: "{{whale.hold_recommendation.bought_price}} · {{whale.hold_recommendation.bought_at | date: \"%B %-d, %Y\"}}" }
- { label: "Position state", value: "Floor {{whale.hold_recommendation.floor_today}} · band tightening" }
- { label: "Desk officer of record", value: "Matt Schorr · L+XL Desk" }

**body:**
- "**The L+XL Ledger is the desk's standing record on the 1,122 collectors who built the first $234.6M of historical Top Shot volume.** It is not a publication. It is a record. Once a week, the desk updates the entry on each holder it has something to say about. This week, the entry is yours."
- "**Holding under review.** {{whale.hold_recommendation.player}}, {{whale.hold_recommendation.set}} — serial number {{whale.hold_recommendation.serial}}. The ledger records that you acquired it on {{whale.hold_recommendation.bought_at | date: \"%B %-d, %Y\"}} at {{whale.hold_recommendation.bought_price}}. The general market floor closed yesterday at {{whale.hold_recommendation.floor_today}}. The position has appreciated by {{whale.hold_recommendation.gain_pct}} on a marked basis."
- "**Why the entry is updated this week.** The desk has been tracking the sub-3,000-serial band on the Mitchell Pull-Up Three set across the most recent 72 hours of marketplace activity. The band has cleared comparable transactions at thirty per cent above the general floor. Your holding sits inside that band. The convergence pattern is consistent with the cornerstone premium the desk has documented on three other Eastern Conference holdings this round — a pattern in which informed collectors price trajectory before the broader market prices the result. You priced the trajectory in January of 2024. The market is now arriving."
- "**Adjacent entries the desk has noted this week, in your cohort's neighborhood.**"
- "  · Three L5 ledger entries have been opened on Cooper Flagg pre-rookie positions in the last fourteen days. Floor has moved approximately eighteen per cent on fewer than thirty transactions. The desk holds the names; the broader market sees only the floor move."
- "  · The Wembanyama Series 8 floor has held flat at $148 for fourteen consecutive sessions, following three months of decline. The desk reads this as the first ledger-grade signal of bottom formation, consistent with the patience-window pattern the desk has documented on resolved-narrative holdings."
- "**The standing offer of the desk.** The L+XL Desk maintains a one-page comp memo service for holders of record. Reply to this entry with the name of any holding on your sheet, and the desk will return a comp memo within forty-eight hours. The memo is not part of the broader product surface and will not be reproduced elsewhere. It is the desk's standing offer to the cohort."
- "**The ledger remains open.**"
- "*Filed by Matt Schorr, L+XL Desk officer of record. The L+XL Ledger is delivered to 1,122 holders and to no other surface.*"

**cta:** Reply to keep the entry open
**cta_secondary:** "Open the standing comp memo on Mitchell #{{whale.hold_recommendation.serial}}"

**voice_notes:**
"Frame A reads like the entry of a private bank's chronicler-of-record. The Ledger is an institution — 'standing record,' 'entry of record,' 'officer of record,' 'remains open.' Statesman authority. Long-form sentences. Numbers spelled out where it makes them feel weighed (`thirty per cent`, `forty-eight hours`). Marcus is treated as *a holder the desk has been watching for years* — the cohort framing is `1,122 collectors who built the first $234.6M.` That phrase is load-bearing: it is the recognition that he is among the architects of the market. The hero is full-bleed, unhurried; layout is sparse and prose-heavy. CTA is `reply to keep the entry open` — the relationship metaphor is custodial, not transactional. The standing comp-memo offer is the bespoke artifact: 1-page memo within 48h, not on the public surface, pulled on request. This is what Sotheby's Collectors Group does with its named-advisor model, translated into Top Shot's idiom."

---

## Cinematic (Frame B) — Sensationalized Legend Applied to Concierge

**id:** whale-tier-concierge / cinematic
**label:** Frame B — Cinematic · Below the API
**from:** NBA Top Shot \<below-the-api@nbatopshot.com\>
**reply-to:** Matt Schorr \<matt.schorr@nbatopshot.com\>

**emailHero:**
- src: `{{customer.whale_hold_image_url}}`
- alt: "{{whale.hold_recommendation.player}} #{{whale.hold_recommendation.serial}} — full-bleed cinematic"
- liquidCaption: "Holder's own Moment, full-bleed, treated as legend object"

**subject:** Below the API. Marcus — entry confirmed.

**preheader:** {{whale.hold_recommendation.player}} #{{whale.hold_recommendation.serial}}. You bought the document. The market just signed it.

**callouts:**
- { label: "1 of 1,122", value: "Below the API · invitation only" }
- { label: "The document", value: "{{whale.hold_recommendation.player}} · #{{whale.hold_recommendation.serial}}" }
- { label: "You signed it at", value: "{{whale.hold_recommendation.bought_price}} · {{whale.hold_recommendation.bought_at | date: \"%b %Y\"}}" }
- { label: "Market signature", value: "{{whale.hold_recommendation.floor_today}} · {{whale.hold_recommendation.gain_pct}}" }
- { label: "The desk", value: "Matt Schorr · reply" }

**body:**
- "**Below the API.**"
- "There is a tier the rest of the product does not see."
- "1,122 names. $234.6M built. You among them since {{customer.first_session_at | date: \"%B %Y\"}}."
- "**The document on your sheet:** {{whale.hold_recommendation.player}} {{whale.hold_recommendation.set}} #{{whale.hold_recommendation.serial}}. {{whale.hold_recommendation.bought_at | date: \"%B %Y\"}}. **You signed it at {{whale.hold_recommendation.bought_price}}.**"
- "Yesterday the market signed it at **{{whale.hold_recommendation.floor_today}}.**"
- "**You were the cornerstone.**"
- "**Three things only the desk knows this week:**"
- "  · **Three L5 names on Flagg.** Floor +{{whale.flagg_floor_move}}, sub-30 transactions. The market sees the floor. The desk sees the names."
- "  · **Mitchell + Mobley sub-3K band.** Cleared +30% above floor in 72h. Your serial is in band."
- "  · **Wembanyama S8 floor: $148, 14 days flat.** Bottom-fishing has begun."
- "**Below the API runs one read per week to 1,122 collectors. The desk pulls bespoke comp memos on request, 48h, off-product. Reply with a holding.**"
- "*Matt Schorr · L+XL Desk · this surface does not appear elsewhere.*"

**cta:** REPLY · OPEN A MEMO
**cta_secondary:** "Or claim the Mitchell #{{whale.hold_recommendation.serial}} pull"

**voice_notes:**
"Frame B is sensationalized legend, translated into concierge as *mythologized scarcity-of-reach.* The frame name is Below the API — i.e. there is a layer of Top Shot the public product does not surface, and the recipient is in it. Short lines, bolded beats, poster-typography. 'You signed it at $112. Yesterday the market signed it at $245.' That couplet is the cinematic distillation of the cornerstone premium — the holder as the original signatory of the document, the market as the late co-signer. 'You were the cornerstone' is the single most concise possible recognition of L4/L5 psychology: not a customer, not a segment — the structural piece on which the market was built. Frame B has no sender persona by rule, so Magic is removed. The desk is named (Matt Schorr), but the voice is product-cinematic, not personal. The 'Three things only the desk knows' is each one line, each ending with the privileged-information beat ('the desk sees the names,' 'your serial is in band,' 'bottom-fishing has begun'). CTA is uppercase, two beats: REPLY · OPEN A MEMO. This frame is meant to make the holder feel they are inside a vault."

---

## Brief (Frame C) — Bloomberg Market Reporter Applied to Concierge

**id:** whale-tier-concierge / brief
**label:** Frame C — Brief · L+XL Desk Note · 0700 ET
**from:** L+XL Desk \<desk@nbatopshot.com\>
**reply-to:** Matt Schorr \<matt.schorr@nbatopshot.com\>

**emailHero:**
- src: `{{customer.whale_hold_image_url}}`
- alt: "Mitchell #{{whale.hold_recommendation.serial}} thumbnail"
- liquidCaption: "Holder Moment, small inline, position-record register"

**subject:** L+XL Desk · Marcus · 1 hold review · 3 desk reads · 7 May 0700 ET

**preheader:** Mitchell PUT #{{whale.hold_recommendation.serial}} · entry $112 · floor $245 · +119% · band tightening · reply opens memo.

**callouts:**
- { label: "Recipient", value: "Marcus · L4 · 1 of 1,122 L+XL · since Oct 2020" }
- { label: "Holding under review", value: "Mitchell · Pull-Up Three · #2,418" }
- { label: "Position", value: "Entry $112 · 20 Jan 2024 · floor $245 · +119%" }
- { label: "Band state", value: "Sub-3K serials · +30% above floor / 72h" }
- { label: "Desk read 1", value: "Flagg pre-rookie · 3 L5 holders accumulated · floor +18% / 14d / <30 tx" }
- { label: "Desk read 2", value: "Mitchell + Mobley sub-3K band tightening" }
- { label: "Desk read 3", value: "Wembanyama S8 · floor $148 · flat 14d · bottom-fishing onset" }
- { label: "Desk officer", value: "Matt Schorr" }
- { label: "Standing offer", value: "1-page comp memo on any holding · 48h SLA · off-product" }

**body:**
- "L+XL Desk · 1 of 1,122 · weekly note · 0700 ET. Hold under review: Mitchell PUT #2,418. Entry $112 (20 Jan 2024). Floor $245 (close). +119% marked. Sub-3K serial band cleared +30% above floor across 72h — convergence consistent with cornerstone-premium pattern documented on 3 other E.C. holdings R2. Three desk reads above. Memo SLA 48h on any holding you flag. Reply opens thread with Matt Schorr."

**cta:** Reply · flag a holding
**cta_secondary:** "Open the Mitchell PUT #2,418 comp page"

**voice_notes:**
"Frame C is a Bloomberg morning note compressed onto one screen. Density is the signal of seriousness — every callout carries a number. Subject line carries 4 facts (Marcus · 1 hold review · 3 desk reads · 7 May 0700 ET); preheader carries 5 (the position summary). Body is one paragraph of dense, abbreviated prose. No prose softeners. No 'three patterns' walk-through — those are callout fields, scannable in 4 seconds. The recognition layer is in the recipient callout: 'Marcus · L4 · 1 of 1,122 L+XL · since Oct 2020' — four facts, all of them affirming the desk knows him. The desk officer is named. The standing offer (48h memo SLA, off-product) is in the callouts as a contractual term. Frame C is the variant a CIO would forward to their assistant without reading twice — and the L+XL holder will recognize the register. Send time is 0700 ET, anchored to the patience-window finding (collectors are readers in the morning, not buyers at the buzzer)."

---

## Cohesion check — does each variant read as the same psychology in a different voice?

**Spot read after writing all four:** could a reader tell which is Almanac and which is Brief just from layout/voice/density?

- **v1001 baseline** — mid-density. Lead with personal-Marcus-by-name address. "L+XL Desk" institutional sender. Magic signs as agent. Three desk reads as one-line bullets, framed as read-not-pitch. Reply for bespoke comp memo. Mid-length sentences, conversational-but-not-chummy.
- **Almanac** — lowest density, longest sentences, most prose. "The Ledger" as institution. Phrases like "officer of record," "remains open." Numbers spelled out for weight. Custodial metaphor — `keep the entry open`. Designed to be read slowly, like a private-bank quarterly note.
- **Cinematic** — highest contrast (sparse + bolded). "Below the API" as mythological frame. Couplet structure ("You signed it at $112. The market signed it at $245.") No prose paragraphs longer than two sentences. Designed to feel like a vault opening.
- **Brief** — highest density per line. Subject-line and preheader carry the full position. Body is one paragraph of dense Bloomberg-register prose. Callouts are nine fields of numbers. Designed to be forwarded without reading twice.

All four share:
- Same recognition spine: Marcus, $147,200 LT, 312 Moments, 2020 cohort, Mitchell PUT #2,418 bought Jan 2024 at $112, floor today $245.
- Same scarcity-of-reach signal: `1 of 1,122`, "this surface does not appear elsewhere."
- Same exclusive intelligence: three L5 Flagg accumulators, sub-3K Mitchell/Mobley band, Wembanyama S8 floor flatlining.
- Same human handoff: Matt Schorr, L+XL Desk, reply opens a thread, 48h comp-memo SLA off-product.
- Same hero asset: `{{customer.whale_hold_image_url}}` — the holder's own top Moment, not a stock image. This single asset choice differentiates the whale stack from every other card.
- Same primary CTA shape: reply, not click-through to dashboard.

What is *deliberately* different by frame:
- Sender voice (`Magic on behalf of the desk` / `The Ledger` / `Below the API` / `L+XL Desk · 0700 ET`)
- Density (mid / low / contrast / high)
- Metaphor (desk note / ledger entry / vault / morning brief)
- CTA register (`Reply with a holding` / `Reply to keep the entry open` / `REPLY · OPEN A MEMO` / `Reply · flag a holding`)

If a reader can't tell which is Almanac and which is Brief at a glance: Almanac has the longest sentences and the lowest density and uses words like "remains open"; Brief has the densest callout block and a one-paragraph body and uses "SLA." That separation is real.

---

## New Liquid variables proposed

All proposals are essential to the recognition spine — each is justified below.

| New variable | Reason | Source | Build cost |
|---|---|---|---|
| `customer.whale_hold_image_url` | Hero is the holder's own top Moment image. This is the single most differentiating visual choice in the whole stack and underpins the "we know your specific holding" recognition move. | Already implied by mock data (top hold known); requires BQ → CIO derived field: top hold → moment image URL lookup. | Medium (1 BQ join + CIO sync; ~1 sprint) |
| `whale.hold_recommendation.gain_pct` | Used in subject/preheader/callouts/body across all 4 variants. Computed: `(floor_today - bought_price) / bought_price`. | Computed from existing fields. | Low (Liquid math or precomputed) |
| `whale.hold_recommendation.recent_comp_movement` | Used in v1001 body to describe band movement. Could be replaced by `gain_pct` if we want to compress; kept for the more nuanced read of *band* movement vs. point-position movement. | Requires comp-band aggregation (already in `event.recent_serial_band_sales` precedent from cards.ts). | Medium (reuses existing pattern) |
| `whale.flagg_floor_move` | Used in cinematic + v1001 desk reads. `+18%`-style preformatted string. | New BQ-derived weekly aggregate on Flagg pre-rookie set. | Low–Medium |
| `customer.first_session_at` | Already in MARCUS_WHALE mock; needs CIO profile attribute confirmation if not already present. Used to recognize cohort-of-origin ("since {{ … | date: \"%B %Y\"}}"). | Profile attribute, likely already exists from auth. | Low |

Variables already in scope (no new build):
- `customer.userName`, `customer.lifetime_moments_owned`, `customer.lifetime_value`, `customer.lifetime_stage`
- `whale.hold_recommendation.{player, set, serial, bought_at, bought_price, floor_today}`
- `whale.pattern_1/2/3.*` — present in mock; used in callouts but de-emphasized vs. v1003

Variables intentionally *removed* from v1003:
- `whale.pattern_1.body`, `whale.pattern_2.body`, `whale.pattern_3.body` — the long-form pattern paragraphs are the v1003 anti-pattern. Each pattern is now one line, framed as read-not-pitch.
- `whale.pattern_1.cohort_size`, `whale.pattern_1.player_concentration`, etc. — newsletter-style metadata, not concierge.

---

*Filed 2026-05-04 by Magic. Supersedes the v1003 whale-tier-concierge after-block in `/home/agent/topshot-review/lib/cards.ts` lines 983–1086. To ship: Roham approval → engineering pass on the 5 new vars → A/B authorization (note: send authorization for whale-tier surface is part of the broader Phase 2 CIO unlock per CMO framework §6.6).*
