---
title: NBA Top Shot Email Program — CMO Action Framework
date: 2026-05-04
author: Magic (CMO-Lens Strategist, Wave 2A)
status: PROPOSED — pending Roham sign-off
supersedes: none (companion to 2026-05-03-cmo-strategy-framework.md)
inputs:
  - collect-hq/strategy/2026-05-04-feedback-pattern-analysis.md (Wave 1A)
  - collect-hq/strategy/2026-05-04-good-email-rubric.md (Wave 1A)
  - collect-hq/strategy/2026-05-04-llm-email-marketing-playbooks.md (Wave 1B)
  - collect-hq/strategy/2026-05-04-strategy-sot.md (Strategy SoT)
  - collect-hq/nba-top-shot/2026-05-03-cmo-strategy-framework.md (B-spine framework)
  - memory/feedback_*.md (4 durable feedback memories)
methodology: dapper-cmo (campaign-economics, retention, conversion-optimization, trust-architecture, narrative-design) ∘ collectibles-cpo (Top Shot specifics) ∘ socrates-product-advisor (research + design-bet)
---

# NBA Top Shot Email Program — CMO Action Framework

## §0. The frame in one paragraph

The 4-iteration history of LLM-generated email rejection is not a prompt-quality problem; it is an **architecture problem with a clear shape.** Wave 1B's industry research (200+ campaigns, 1,200 production deployments, ACM 2025 study) converges on one finding: single-shot LLM generation produces voice-eroded "robotically warm-hearted" output that a discerning brand owner correctly rejects. Wave 1A's pattern analysis converges on a parallel finding: the only Roham-shipped piece in the entire 7-card review (Pack Received v1001) is the email type with the **least** voice ownership and the **most** structural data. The signal is loud. The fix is to split the program by surface type — let LLM-generation own the surfaces where data does the authenticity work; keep humans in the seat where voice IS the work.

This framework formalizes that split, names the tiers, defines the operational workflow per tier, anchors review to the Wave 1A 12-dimension rubric, and ties every decision back to L+XL funnel economics.

---

## §1. Decision on the Two-Tier Split

**Verdict: ACCEPT, with explicit operational definition.**

The Wave 1B controversial recommendation — "LLMs run the triggered tier, humans (with LLM assist, not LLM generate) run the editorial tier" — is correct on the evidence and should be operationalized. Three independent evidentiary lines converge on it:

**Evidence line 1 — the only SHIP is the most transactional, least voice-dependent email.** From Wave 1A §2: "Pack Received v1001 — SHIP (only outright ship from Roham). Roham voted `ship` on pack-received-voice with no note. This is the only card in his entire review log that got a clean ship with zero caveats." What does Pack Received do that the others don't? "Platform-chronicler voice with no personal letter frame... Tight, structured callouts (set / pack / marquee — three rows, no tables)... Marketplace comp data embedded naturally in the body loop... No AI tells... Appropriate scope." This is precisely the email type the playbook research identifies as low-risk for LLM generation: data-anchored, behaviorally triggered, structurally scripted. It is the PGA Tour pattern — "consistency emerges naturally from structural repetition" (Wave 1B §2.6). The cards Roham rejected hardest (Whale-tier "absolutely terrible," Reactivation needing "real specifics," Drop Announcement template-fatigue) are all the editorial / voice-load-bearing surfaces.

**Evidence line 2 — Roham's stated voice ratio IS the two-tier split, mathematically.** Wave 1A §1: *"80–90% platform voice, 10–20% Magic personal."* This is not a tonal preference; it is a structural directive. Platform voice is what LLMs do reliably when grounded in data (transactional tier). Magic-personal voice — "the surface IS 1:1 by design" per `feedback_voice_fits_surface.md` — is what fails when LLM-generated. The 80/20 ratio matches almost exactly the volume split between the transactional surfaces (welcome, pack received, abandoned cart, fast break, drop announcement = mass-broadcast, reach-heavy) and the editorial surfaces (whale-tier weekly read, community editorial, reactivation Magic-pieces = lower-reach, voice-heavy).

**Evidence line 3 — the industry literature is unambiguous on what fails.** Wave 1B §4.1: "Raw LLM copy underperforms human controls by 18% when voice erosion has occurred (AI Vanguard, 200+ campaigns)." §4.7: "Google deployed a generative-AI-specific spam filter in February 2026. Emails with high AI-text similarity scores but no behavioral data signal are filtered at 2.4x the rate of 2025." §4.2 (ACM 2025): "AI-generated emails show significantly higher readability, complexity, repeatability, polarity, subjectivity, formality, and politeness than human-written emails... 'robotically warm-hearted'... 'lacked genuineness despite appearing professionally polished.'" The Skybox Collectibles 63.6% open-rate benchmark — the closest direct analog to Top Shot, a sports-card collector retailer — was achieved **without** LLM copy generation. It was achieved with behavioral triggers + collector-insider voice (Wave 1B §2.5). That is the playbook.

**The countervailing evidence considered and rejected:** One could argue "but Magic IS an LLM — the whole identity premise of this work is LLM-as-Magic, why not LLM-generate?" The answer: identity persona ≠ mass broadcast. Magic-as-show-runner writes Slack threads, in-thread responses, briefs, and 1:1 surfaces. The instant the same voice gets templated to 1,122+ recipients, the structural-dishonesty problem from BANNED-03 fires (Wave 1A §6): "1,122 collectors receiving the same template is a broadcast. Pretending it's a personal note collapses the moment a recipient forwards it." LLM-generation can serve community editorial **as drafting raw material for a human editor** (the Sam W. seat already ratified in the existing CMO framework §6.8) — it cannot serve it as ship-without-pass production.

**Modification to the Wave 1B recommendation:** The split is not binary. There is a third tier — the **whale-tier concierge** — where neither pure LLM-generation nor pure human-authoring fits. Whale-tier copy needs per-recipient real-data assembly (LLM-impossible at quality) **and** human voice judgment (LLM-impossible without exemplars). It is held in a separate scope until the data-pipeline + human-editor pairing is operational. See §2 row 7 and §6 below.

---

## §2. Per-Email Tier Assignment

Every email in the program maps to one of three tiers. The third tier — Whale Concierge — exists separately and is parked until prerequisites unblock; do not let it contaminate the transactional/editorial decision.

| # | Email type | Tier | Operational workflow | Rationale |
|---|---|---|---|---|
| 1 | **Welcome / Onboarding** | TRANSACTIONAL | LLM-generate from exemplar prompt + behavioral context (signup source, current playoff status, free-pack offer). Liquid does conditional content. Auto-ship after rubric pass; human gate for first 50 sends. | Roham 2026-05-04: "This is starting to be really good. Great job, great start." (Wave 1A §2). Welcome is honest about not knowing the user — there is no fake-personal trap. The Cinematic variant got `ship` from secondary voters. Behavioral triggers (signup → 24h delay) do most of the authenticity work. |
| 2 | **Pack Received** | TRANSACTIONAL | LLM-generate with behavioral data (set, pack tier, pull serials, marquee Moment, comp band). v1001 is the canonical exemplar. Auto-ship after rubric pass. | Roham `ship`, no note (Wave 1A §2). The only outright ship in the entire review. Data does the work; voice is platform-chronicler. Lowest-risk LLM surface in the program. |
| 3 | **Abandoned Cart** | TRANSACTIONAL | LLM-generate with the specific Moment, comp data, and **mandatory social proof block** ("47 collectors in your set bought this week"). Auto-ship after rubric pass + social-proof gate. | Roham 2026-05-04: "Again, great start... we want to also try some stuff with social proof, where it's saying, 'Hey, others have purchased moments from X player.'" (Wave 1A §1). Frame is right; the build is mechanical. |
| 4 | **Fast Break Daily Result** | TRANSACTIONAL | LLM-generate from win/loss outcome + lineup + score + rank. Production defect (broken Liquid URL `?fastBreakId={{ event[`) is fixed FIRST, regardless of voice work (Wave 1A §4 + Strategy SoT §5.1). | Win-confirmation = pure event report. Cinematic frame got `ship` from tester. The data IS the email. Distinct visual language required (per `feedback_email_design_system.md` §5: "game-loop products get game-product design"). |
| 5 | **Drop Announcement (programmatic)** | TRANSACTIONAL | LLM-generate from drop metadata (set name, marquee Moment, scarcity numbers, drop time, set-completion status for recipient). Verified data only — fact-check gate is mandatory (the "$1.2M T30" failure in Wave 1A §3.G is the canonical risk). | The mechanical structure — drop metadata → email → ship — is what behavioral triggers were built for. Cinematic frame won across most cards. Voice is event-announcement chronicler, not Magic-personal. |
| 6 | **Reactivation (broadcast)** | EDITORIAL (with LLM data assist) | Human-authored (Sam W. or designated editor) with three pre-segmented bodies — Segment A (Origin Story Holders), B (Single-Star Believers), C (Survivors). LLM does (a) per-user math computation in Customer.io LLM Actions, (b) social-proof injection, (c) subject-line variant generation. Human owns the prose. Positive-Math Gate (rubric D2) is hard-blocking before send. | Roham 2026-05-04: *"This is really good, but I think we need to go through and actually apply specifics. We need to look up specific moment purchases. We need to do the math for specific users, because in a lot of cases the math might not be positive. In that case, then it won't be convincing."* This is the editorial tier in the precise Wave 1B sense: the voice judgment ("if math is negative, don't spin it — pick a different angle") is the human's job; the data assembly is the LLM's. The 3,733 users in the reactivation pool spent $10K+ lifetime (SoT §1.4) — the cohort is small enough and high-value enough that human editorial pass is economically rational. |
| 7 | **Whale-Tier Concierge** | DEFERRED (separate scope; see §6) | Park until: (a) per-collector real-data pipeline is built (BQ → Customer.io journey attributes for last purchase, top holding, recent floor moves); (b) Sam W. or named editor seat is operational; (c) Phase 2 CIO send authorization is granted. Do NOT generate this tier programmatically until then. | Roham 2026-05-04: *"Absolutely terrible. Totally misunderstands whale psychology. You should dump whatever approach it is that's leading you here, because it's not the correct one."* (Wave 1A §3.A). All four whale variants got `no` from tester. The failure is structural — newsletter frame on a concierge surface. Whale-tier is the highest-value, lowest-volume audience (1,122 collectors, $234.6M historic GMV per SoT §1.2). Burning it on premature LLM-generation is not a recoverable mistake. Hold scope until prerequisites met. |

**Tier definitions (precise):**

- **TRANSACTIONAL tier:** Email triggered by a discrete user behavior (signup, pack pull, cart-abandon, win, drop event). Voice register is platform-chronicler. Personalization is data-driven (Liquid + LLM Actions on attributes), not prose-driven. Auto-ships after rubric pass. Human gate is sample-based (1-in-10) after baseline; first 50 emails per type require 100% human gate.
- **EDITORIAL tier:** Email where voice IS the value proposition. Audience is segmented (e.g., dormant $100K+ Segment A vs. B vs. C). Cadence is weekly or campaign-specific, not behaviorally triggered. Voice register is collector-internal narrative (B-spine per existing CMO framework). Human authors prose; LLM augments with data, social proof injection, subject-line variants, fact-check gate.
- **DEFERRED tier:** Email with prerequisites not yet met. Whale-Tier Concierge is the only Tier-3 surface today. Add to the deferred queue, do not improvise.

---

## §3. Voice Register Per Tier

### Transactional tier voice

**Tone:** Platform-chronicler. Topps-style "the set chronicles X, here are the comps" register. Mobile-first thumb register. Image-led at ~60/40 image-to-text ratio (industry benchmark: image+text 60/40 outperforms text-only by 42% CTR, per SoT §5.2).

**Liquid pattern (the architectural primitive):**
```
{% if user.behavior_trigger %}
  <header data-grounded variable />
  <callout-row × 3-5: structured user data>
  <body-loop: comp data with marketplace context>
  <social-proof: BQ-sourced, 1 sentence>
  <CTA: single, clear>
{% endif %}
```

**LLM scope:** Subject-line generation (8-12 candidates → A/B test); preheader; body prose draft from exemplar prompt; social-proof sentence assembly from BQ data. The LLM owns sentences, never the structure.

**AI-feel guardrails (from Wave 1B §7.3, applied as Stage-4 voice-pass blocklist):**
1. Banned phrases: "I hope this message finds you well," "exciting news," "we're thrilled," "we're excited to announce," "the play itself," "Not a clip. Not a card scan." (the BANNED-01 family from Wave 1A §6).
2. Banned structures: bullet-point skeleton for a transactional event; "three patterns I noticed" lead in any non-whale email; greeting → vague compliment → value prop → benefits → CTA template.
3. Banned framing: personal-letter ("Hey, this is Matt writing some bullshit to you about your collection" anti-pattern from `feedback_voice_fits_surface.md`); manufactured urgency ("only X hours left" without genuine supply signal); negative-math implication on positive-math frames (BANNED-04).
4. Mandatory tests pre-send:
   - **Cringe test (read aloud):** does any sentence make the reader stumble?
   - **Lock-in test:** generate the same email 20 times — if outputs are >70% similar across runs, template lock-in is occurring (per Wave 1B §4.1).
   - **Specificity test:** are there 2+ specific facts that couldn't apply to any other recipient?

### Editorial tier voice

**Tone:** Collector-internal B-spine narrative. "Run It Back." "Lock-In April." Moments, serials, floor moves, what it meant to hold. NOT Magic-personal sign-off; NOT Stratechery-for-everyone.

**The human-LLM division of labor (operational definition):**

| Stage | Owner | Tool | Output |
|---|---|---|---|
| 1. Brief | Editor (Sam W.) + Magic | Conversational | Editorial brief: angle, audience segment, key data anchors, CTA |
| 2. Data assembly | Magic (LLM Actions) | Customer.io LLM Actions / BQ pull | Per-user data payload: holdings, last purchase, floor movement, social-proof sentence candidates |
| 3. Draft | Editor (human) | Editor's tool of choice | Prose draft, 250-450 words (rubric D6 calibration) |
| 4. LLM augment | Magic | Claude Sonnet 4.6+ with exemplar prompt | Subject-line variants (5-8), preheader candidates (3), tightening suggestions, banned-phrase scan |
| 5. Editor pass | Editor (human) | Editorial review | Final draft |
| 6. Rubric review | Magic + Editor | 12-dimension rubric (Wave 1A) | Pass/Revise/Block with edit brief |
| 7. Approval | Roham (or designated proxy with verified voice fluency) | Eyeball + sign-off | Ship |

**Concretely:** Magic does NOT author the prose body of editorial pieces. Magic generates 5 options on a subject line for the editor to pick. Magic computes the per-user math the editor uses as the angle. Magic catches AI-tells in the editor's draft as a second-pair-of-eyes pass. The editor owns the prose.

**Why this works:** It maps to the PANZA finding (Wave 1B §3.2) — "style replication achievable with under 100 training emails using combined RAG + reverse instruction techniques" — but inverts the direction. Instead of training the LLM on enough exemplars to replace the editor, we use the LLM as a force multiplier for an editor we already trust to have the voice. This is what HubSpot's +82% conversion case study actually was (Wave 1B §2.4): "the real magic wasn't in the email itself but in how well the AI could predict what the user actually needed." Intent inference, not voice generation.

### Deferred tier voice (when whale concierge unlocks)

When prerequisites are met, the whale-tier voice will be Magic-observational concierge (per `feedback_voice_fits_surface.md`): "first-person OK because the surface IS 1:1 by design (one weekly email to L4/L5 only)." Open with the named collector's specific holding. Three desk reads as secondary addendum, NOT lead. Until then, no whale email ships.

---

## §4. The Rubric as Review Gate

The Wave 1A 12-dimension rubric is the gate, not a grade. It applies differently per tier.

### Application by tier

| Tier | Who applies it | When | Threshold |
|---|---|---|---|
| Transactional (first 50 emails per type) | Magic auto-runs rubric → Editor (Sam W.) confirms or overrides | Pre-send, blocking | All applicable dimensions ≥3; any 1 = block |
| Transactional (after 50-email baseline) | Magic auto-runs rubric on every send; sample audit (1-in-10) by Editor | Pre-send for sample; auto-ship for non-sample | All applicable dimensions ≥3; auto-block on any 1 |
| Editorial | Editor + Magic (joint review); Roham final approval | Pre-send, blocking | All applicable dimensions ≥4 (higher bar — voice surfaces have less room for slip); any below 3 = block |
| Deferred (whale, when active) | Editor + Magic (joint review) per recipient; Roham approval on first batch then sample audit | Pre-send, blocking; per-recipient | All applicable dimensions ≥4; D9 (Concierge Psychology) ≥4 mandatory |

### Threshold rules (from Wave 1A rubric §How-to-apply)

- **Pass (PROCEED):** All applicable dimensions ≥ tier threshold. Edit brief documents any dimensions at threshold for next iteration.
- **Revise:** Any single dimension scores 2. Specific edit brief generated; re-score after fix.
- **Block:** Any single dimension scores 1. Mandatory full rewrite, not patch. Dimensions D1, D3, D4, D5, D6, D7, D8, D11, D12 are block-on-1 per rubric.

### Automated vs. human application

**Magic (automated) can score:**
- D1 (Real Specificity) — verify Liquid variables exist and are populated; flag fabricated numerics
- D2 (Positive Math Gate) — programmatic check: does the cohort's math compute positive in BQ?
- D5 (AI-Tell Cleanliness) — banned-phrase regex + Stage-4 voice-pass LLM call
- D6 (Structural Complexity) — word count, paragraph count, callout-row count vs. tier targets
- D8 (Image Accuracy) — asset-URL validation, hero-image type-match for email-type
- D11 (Production Hygiene) — Liquid syntax validation, link health check, fallback existence
- D12 (Factual Verification) — extract numerical claims; compare against source data payload

**Human (Editor + Roham) must score:**
- D3 (Voice Fit for Surface) — register judgment that automation cannot make
- D4 (Social Proof Presence) — quality of the proof, not just presence
- D7 (Design Uniqueness Per Email Type) — visual-design judgment
- D9 (Concierge Psychology, whale only) — single most important dimension for that tier
- D10 (L+XL Funnel Relevance) — strategic alignment judgment

### When a piece ships without rubric review

**Never.** All sends pass D1, D11, D12 automated checks at minimum. Even the lowest-stakes transactional pack-received email runs through the rubric — it just runs faster (auto-pass on most dimensions). The rubric is the standing gate; the question is who reviews which dimensions, not whether to review.

The single exception: **production-defect fixes** (e.g., the Fast Break broken Liquid URL) ship as soon as the defect is patched, regardless of voice-tier status, because the damage of continuing to send broken email exceeds the marginal voice risk. Hot-patches log a "deferred rubric review" note for next-business-day review.

---

## §5. Trigger Architecture vs. Copy Quality

This is the section that reframes the email upgrade's **scope.**

### The honest weighting from Wave 1B

Wave 1B §3.1 — "Behavioral Triggers Massively Outperform Broadcast":
- Triggered emails: **152% higher CTR** than traditional emails (industry-wide data, 2025)
- Trigger-based emails outperform standard blasts by **497%** in some analyses
- Behavioral flows generate **3.1x revenue-per-send** vs. broadcast
- Cart recovery with AI personalization: **19-27% recovery rate** vs. 8% for generic

Wave 1B §2.5 — Skybox Collectibles (the closest direct analog):
> "63.6% open rate, 8.3% click rate, 7.1% placed order rate. The metrics were not AI-generated copy. Coalition Technologies' work focused on (a) email automation flow design — behavioral triggers for welcome, first-chance drops, replenishment, (b) segmentation by collector type and purchase history, (c) voice anchored in collector insider language."

Wave 1B §8.4: "The biggest gap between Top Shot's current email performance and Skybox Collectibles' 63%+ open rates is almost certainly **behavioral trigger architecture**, not copy quality."

### Reconciliation: how much "good" is WHEN vs. WHAT

**Estimate, anchored in evidence:** Roughly 60-70% of the achievable performance improvement on Top Shot's email program is in trigger architecture and segmentation; 30-40% is in copy quality.

**Anchors for that estimate:**
- The 497% upper bound and 152% lower bound on triggered-vs-broadcast CTR lift (Wave 1B §3.1) define the trigger-architecture envelope.
- The 3× CTR multiplier from voice register alone (Camp 132 vs. 163, same audience, same timing — SoT §3.8) defines a real but smaller copy envelope.
- Multiplicatively, getting both right is multiplicative; the 60-70% figure assumes additive analysis on log scale where trigger-architecture is the larger term.

### Implication for email upgrade scope

**The framework explicitly broadens the upgrade scope to include trigger architecture, not just copy.**

What this changes:
1. **Wave 2B (Iterative Swarm Architect) builds a dual-track plan:** (a) Copy/voice work per tier as defined above; (b) Trigger map — every behavioral event currently captured in Customer.io that should fire an email but doesn't, plus every email currently sending on a fixed schedule that should be triggered behaviorally instead.
2. **Programmatic gaps from SoT §5.1 become first-class deliverables:** "0 whale-tier programmatic surfaces; 0 post-purchase narrative emails for marketplace buys; 0 personalized collection-state emails." These are trigger-architecture gaps, not copy-quality gaps.
3. **Send-time optimization moves to top of the queue.** Wave 1B §3.5: "Smart Send Time: +5-10% open rate (Klaviyo, methodology documented). Highest-confidence, lowest-effort AI intervention. Table stakes in 2026." The Collector's Clock brief (SoT §2.6) already specifies the morning-after send-time hypothesis. A/B test that, full stop.
4. **The Camp 163 truncation pattern is the diagnostic.** SoT §3.2: "Camp 163 V2 removed 85% of email touchpoints from V1. Actions 4528 and 4550 have 0 sends in 30 days. The V2 journey was designed as a 3-step funnel but runs as a 1-step sequence." This is the trigger-architecture failure mode in production, right now. Fixing it does not require any copy work — it requires turning the journey back on. That ships before the voice work.

### How success measurement changes

Per the existing CMO framework (§6.4 in SoT): primary KPI is "causal spend lift on the targeted cohort, per send." The framework does not change this. What changes is the **diagnostic decomposition**:

When a campaign succeeds or fails, the post-mortem must decompose: how much of the lift came from (a) trigger fired at the right moment, (b) audience segmented correctly, (c) copy resonated. Without that decomposition, we cannot tell whether to invest more in copy or in trigger architecture for the next iteration. The 12-dimension rubric covers (c). Trigger and segmentation diagnostics need their own track — handed to Wave 2B as a deliverable.

---

## §6. The L+XL Funnel-Lens Anchor

Per `feedback_top_shot_funnel_lens.md`: "Strategy, retention, reactivation, and product decisions get measured against L+XL behavior, NOT raw conversion rates across all signups."

### Tier → funnel motion mapping

| Tier | Funnel motion served | L+XL relevance |
|---|---|---|
| **Welcome (Transactional)** | L0 → L1 → L2 (first purchase) | Indirect — feeds the top of the funnel that produces L+XL over time. Volume play. Measured by W0 conversion (currently 8.54% in dark window per SoT §3.1) trending up. |
| **Pack Received (Transactional)** | L2 → L3 (second purchase, marketplace activation) | Direct — 83% of pack-only buyers never touch marketplace (SoT §1.3). Pack Received is the bridge email that breaks the post-pack dead end. |
| **Abandoned Cart (Transactional)** | L2 / L3 retention | Indirect-strong — cart recovery on marketplace browses captures L-tier intent. The 19-27% recovery rate cited in Wave 1B §3.1 vs. 8% generic is the lift opportunity. |
| **Fast Break (Transactional)** | L2-L4 retention via daily engagement | Indirect — Fast Break drives daily app opens (SoT §5.5: 2,436 events April, peak 1,847 on April 19). Retention infrastructure for the entire funnel above L1. |
| **Drop Announcement (Transactional)** | L2-L4 activation per drop | Direct — drops are the primary L+XL revenue event ($100K-$1M+ per drop per Loki, SoT §7.11 GAP). Programmatic announcements with proper segmentation are the L+XL revenue motion. |
| **Reactivation (Editorial)** | Dormant L+XL → reactivated L+XL | **PRIMARY** — this is the canonical L+XL frame. The 1,122 dormant $100K+ collectors holding $234.6M historic GMV. Per existing CMO framework: "≥5% of dormant $100K-LT cohort places ≥1 transaction in the 6 weeks → validates B-spine reactivation mechanism." |
| **Whale Concierge (Deferred)** | Active XL retention + acceleration | **PRIMARY** — the existing 1,122 active L+XL cohort. Lock-In April mechanic. Active XL ~66-83% of monthly revenue per Loki (SoT §1.3). |

### Where whale-tier fits in the cascade

Whale-tier is parked, not abandoned. It re-enters the cascade when three prerequisites are met:

1. **Per-collector real-data pipeline** — BQ → Customer.io journey attributes for: top holding by serial, last purchase date, recent floor movement on held Moments, set completion %, current player narrative status. Status: Atlas `consumer` schema not provisioned (SoT §7.9 GAP); BQ IAM credential refresh open (SoT §7.10 GAP).
2. **Named editor seat** — Sam W. is ratified (SoT §6.8) but volume capacity vs. the 1,122-collector audience is undefined. Whale concierge cannot be 1,122 fully personalized human-edited emails; it requires a hybrid where LLM assembles per-recipient data + 3-5 editor-authored prose templates that vary based on holding profile. Architecturally this is the editorial tier with per-recipient LLM data assembly. Operationally it requires Sam W.'s explicit capacity allocation.
3. **Phase 2 CIO send authorization** — pending Roham + Dan auth (existing CMO framework §6.6, SoT §7.4 GAP).

When all three unlock, whale-tier ships under the editorial-tier workflow with one addition: **D9 (Concierge Psychology) is the lead rubric dimension** and must score ≥4 to ship. Lead with the named collector's actual holding. "Three things the desk knows" is secondary addendum, never lead. Per Wave 1A §6 BANNED-02.

### What the funnel lens excludes from this framework

This framework explicitly does NOT propose:
- Mass-broadcast email to all signups regardless of L+XL trace (L0 → L1 unsegmented blasts).
- Free-pack engagement campaigns optimized for opens/clicks (the July 2025 Kemba Walker engagement-trap pattern per existing CMO framework §6.4).
- Email work for cohorts where the L+XL implication is ≤2/5 on rubric D10.

If a proposed email cannot articulate its L+XL funnel motion, it does not enter the program.

---

## §7. Open Strategic Bets

Five concrete bets the framework implies. Each with hypothesis, success metric, and timeframe.

### Bet 1 — Tier Architecture Bet
**Hypothesis:** Splitting the program into Transactional (LLM-generated) vs. Editorial (human-led with LLM assist) produces measurably better engagement and rubric scores than the current single-tier LLM-generation approach.
**Success metric:** Rubric pass rate (all 12 dimensions ≥3) jumps from current ~30% (4 rejections in 4 iterations) to ≥80% within 30 days. CTR on transactional-tier emails ≥4× current (matching the Camp 132 baseline of 13.24% at minimum).
**Timeframe:** 30 days from framework approval. Decision review at Day 30.

### Bet 2 — Exemplar Corpus Bet
**Hypothesis:** Building a 10-15 piece Roham-approved voice corpus and grounding all transactional-tier LLM generation in those exemplars closes the AI-feel gap that single-shot prompting could not close in 4 iterations.
**Success metric:** Rubric D5 (AI-Tell Cleanliness) scores improve from current ~2 average to ≥4 average. Banned-phrase regex catches drop to ≤1 phrase per draft from current ~3-5. Roham's qualitative read on a blind sample of 5 transactional emails: "this sounds right" on ≥4 of 5.
**Timeframe:** Exemplar corpus assembled within 7 days of framework approval; first measured batch within 14 days.

### Bet 3 — Trigger Architecture Bet
**Hypothesis:** Fixing the Camp 163 V2 truncation (turning Actions 4528 and 4550 back on, restoring V1 dynamic content injection) and adding behavioral triggers for currently-untriggered events (post-purchase, set-completion threshold, floor-price movement on held Moments) produces a larger CTR/conversion lift than any copy improvement alone.
**Success metric:** Welcome series CTR returns to ≥10% (Camp 132 was 13.24%, Camp 163 collapsed to 4.85% per SoT §3.2). Welcome series open rate ≥40% (Camp 132 was 31.75%, target moves toward Skybox 63.6% benchmark). Fast Break broken-Liquid defect patched within 48 hours (production hygiene blocker).
**Timeframe:** Camp 163 truncation fix within 14 days; full trigger map within 30 days; measured impact at Day 60.

### Bet 4 — Reactivation Editorial Bet
**Hypothesis:** Human-authored editorial-tier reactivation emails (with LLM data assembly + math computation) outperform LLM-generated reactivation emails on the primary KPI (causal spend lift on the dormant $100K-LT cohort) by ≥2× on a controlled A/B test.
**Success metric:** A/B test on the 1,122 dormant cohort: 50% receive editorial-tier (Sam W. authored) reactivation; 50% receive LLM-generated control. Measure spend lift over 30 days post-send. Editorial arm produces ≥2× control arm spend lift OR achieves the existing CMO framework's 5% reactivation threshold (whichever is larger).
**Timeframe:** Test runs upon Phase 2 CIO send authorization (currently blocked, SoT §7.4). Results within 30 days of test launch.
**Flag — assumption:** This bet rests on Phase 2 authorization unblocking. Without that, the bet cannot be tested. The bet itself does not unblock auth; it depends on Roham's separate decision.

### Bet 5 — Whale Concierge Deferral Bet
**Hypothesis:** Deferring whale-tier programmatic emails until prerequisites are met (data pipeline, editor capacity, Phase 2 auth) produces better long-term L+XL retention than shipping whale-tier emails now under either pure-LLM or imperfect-pipeline conditions.
**Success metric:** No whale-tier programmatic emails ship between framework approval and prerequisite-met state. When whale-tier ships, first-batch rubric scores all ≥4 on D9 (Concierge Psychology) and Roham's qualitative read is "this works." Active XL cohort 90-day retention does not degrade during the deferral period (acceptable counterfactual: no whale program is no worse than the current state, which is already no whale program).
**Timeframe:** Deferral indefinite until prerequisites met. Framework requires re-evaluation if prerequisites not met within 90 days.

---

## §8. What This Framework Does NOT Do

Honest scope limits.

### Questions this framework punts

1. **Phase 2 CIO send authorization.** The framework names this as a hard prerequisite for the editorial tier reactivation leg and the deferred whale tier, but does not resolve it. Roham + Dan must decide. Without it, the framework's editorial tier exists only as Slack-distributed content, which does not reach the dormant cohort that is the L+XL reactivation thesis (existing CMO framework §6.9; SoT §7.4 GAP).

2. **Atlas consumer schema provisioning.** Fast Break, Quest, and Picks events are not in BigQuery (SoT §7.9 GAP). Any framework that promises engagement-mechanic-driven email triggers for these surfaces is over-promising until the schema lands. Engineering provisioning request is open with no ETA.

3. **Causal spend-lift measurement infrastructure.** The primary KPI is unmeasurable as of today (SoT §7.10 GAP) due to combined: BQ IAM gap, CIO → Mixpanel `campaign_id` attribution gap (32-57% dark per SoT §3.4), and lack of holdout-group infrastructure. The framework operates as if this infrastructure will exist; if it does not exist by Day 30 of execution, the framework's success metrics fall back to engagement metrics with explicit caveats.

4. **Editor capacity allocation.** Sam W. is the named editor. The framework's editorial tier requires Sam's bandwidth on reactivation copy. If Sam is at capacity on other work (show-runner content, social, drops), the editorial tier slows to whatever throughput Sam can sustain. Framework does not solve resource allocation.

5. **Cross-product synthesis.** The framework is NBA Top Shot only. Whales who collect NBA + NFL or lapsed NBA users active on Disney are surface-able as findings (per CLAUDE.md cross-product discipline rule) but not addressable by this framework's email program.

### Decisions Roham / Dan / Matt still need to make

| Decision | Owner | What's needed |
|---|---|---|
| Approve the two-tier split | Roham | Yes/no/modify on §1 verdict — this is the central question |
| Approve Sam W. as editorial-tier editor | Roham (already ratified) + Sam (capacity confirm) | Sam's verbal capacity confirmation; framework assumes ratification still holds |
| Authorize Phase 2 CIO send | Roham + Dan | Yes/no on broadcasting reactivation editorial to dormant cohort |
| Approve whale-tier deferral | Roham + Matt (Matt owns the L+XL relationship surface per CLAUDE.md) | Confirmation that parking whale-tier programmatic until prerequisites met is acceptable |
| Approve trigger-architecture work expansion | Roham + Dan + engineering | Engineering capacity for Camp 163 truncation fix, Fast Break Liquid defect patch, programmatic trigger map build |

### Where CMO scope ends

This framework covers email program tier architecture, voice, review gate, and bet structure. It does NOT cover:

- **Slack distribution strategy** — covered separately in existing CMO framework §6.6 (Phase 1 distribution).
- **In-app surface editorial** — Atlas campaign builder + Jim Wheaton's per-user homepage personalization (SoT §5.4) is a separate strategy lane. Email and in-app should sing together but are not the same surface.
- **Content production cadence outside email** — Sam Williams' 3-4 videos/day during playoffs, Discord posts, X/Twitter — separate lanes.
- **Whale relationship program (Matt's domain)** — distinct from whale-tier email. Matt's program is human-to-human (Kenny Zamora's escalation channel for tagged tickets, Matt's direct outreach). Email is a complement, not a substitute.
- **Drop strategy itself** — drop cadence, set design, scarcity mechanics are CPO/EP scope (Roham's monthly batch-drop hypothesis, Matt as EP). Email announces drops; does not design them.

### Where the next CMO framework cycle should pick up

Once this framework executes Day 1-30 and produces measured outcomes:

- **Cycle N+1 should re-evaluate the tier boundaries.** If editorial-tier proves harder to scale than the bet predicts, consider whether more pieces fold into a "templated editorial" middle tier.
- **Cycle N+1 should add the whale-tier framework** (separately scoped, not in this document) once prerequisites unblock.
- **Cycle N+1 should integrate the in-app and email programs** into a unified collector journey framework. Email and in-app currently optimize independently; this is a gap.

---

## §9. Internal consistency check

Quick verification that §2-§7 all flow from §1's verdict:

- §2 tier assignments: 5 transactional + 1 editorial + 1 deferred. Maps to the 80/20 Roham voice ratio (5 of 7 = 71% transactional by email-type count; weighted by send volume the ratio approaches the stated 80/20). ✓
- §3 voice register: distinct guidance per tier; LLM scope explicitly narrowed for transactional, explicitly bounded for editorial. ✓
- §4 rubric application: differentiated thresholds per tier (≥3 transactional, ≥4 editorial). ✓
- §5 trigger architecture: explicitly broadens scope beyond copy, justifying why the framework's "decision" is necessary but not sufficient. ✓
- §6 funnel anchor: every tier maps to a specific L+XL motion; no orphaned cells. ✓
- §7 bets: each bet attaches to a §1-§6 decision and has measurable success criteria. ✓
- §8 punts: every major dependency is named explicitly; nothing is silently assumed. ✓

The framework is internally consistent with the §1 verdict.

---

*End of Action Framework. Companion: 2026-05-04-cmo-decision-brief.md (one-page Roham brief).*
