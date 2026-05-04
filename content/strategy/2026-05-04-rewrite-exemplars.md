---
title: Phase 0 — Magic Voice Exemplars (Rewrite Swarm)
date: 2026-05-04
curator: Magic (Phase 0 Exemplar Curator agent)
status: PENDING ROHAM SIGN-OFF
methodology: Curated from existing collect-hq material only. No fabricated exemplars. 12-dimension rubric applied dimension-by-dimension to each candidate. BANNED-01..10 individually scanned per exemplar. Voice-mode taxonomy follows the Phase 0 prompt's 5-mode split (transactional, chronicler, drop-anticipation, reactivation, concierge) — distinct from the existing voice-exemplar-corpus.md's voice-register taxonomy.
companion: 2026-05-04-rewrite-swarm-orchestration.md (this is the corpus drafter agents will read as voice context)
decision-vote: true
decision-question: "Gate 1: Do these 14 exemplars represent Magic voice accurately enough to use as drafter context?"
decision-options: "approve,approve-with-notes,reject"
decision-piece-id: gate1-exemplar-approval
---

# Phase 0 — Magic Voice Exemplars

## Curation summary

- **Total exemplars:** 14
- **Per voice mode counts:** transactional 3, chronicler 3, drop 2, reactivation 4, concierge 2
- **Sources mined:**
  - `/home/agent/topshot-review/lib/cards.ts` (lines 240–504, Pack Received + Welcome v1001 + Cinematic)
  - `/opt/magic/collect-hq/nba-top-shot/2026-05-03-reactivation-copy-specimens.md` (Segments A/B/C + Matt specimen)
  - `/opt/magic/collect-hq/nba-top-shot/drafts/r2-transition-post.md` (Discord + X versions)
  - `/opt/magic/collect-hq/nba-top-shot/intelligence/2026-05-03-the-30-minute-window.md`
  - `/opt/magic/collect-hq/nba-top-shot/intelligence/2026-05-03-banchero-playoffs-edition-mint-case.md`
  - `/opt/magic/collect-hq/nba-top-shot/intelligence/2026-05-03-mitchell-playoffs-edition-mint-case.md`
  - `/opt/magic/collect-hq/nba-top-shot/briefs/2026-05-03-cmb-the-only-one.md`
  - `/opt/magic/collect-hq/nba-top-shot/briefs/2026-05-03-the-525-holder.md`
  - `/opt/magic/collect-hq/nba-top-shot/briefs/2026-05-03-thirty-five-at-thirteen.md`
  - `/opt/magic/collect-hq/nba-top-shot/briefs/2026-05-04-jarrett-allen-the-underpriced.md`
  - `/opt/magic/collect-hq/nba-top-shot/briefs/2026-05-04-karl-anthony-towns-the-other-side.md` (cross-referenced)
- **Banned patterns scanned (12-dim rubric):** all CLEAN. BANNED-01..10 individually scanned. AI-feel markers (Wave 1B §7.3) scanned per exemplar. One factual-error caveat noted on Exemplar 8 (Reactivation Segment B — LeBron variant). One scope caveat noted on Exemplar 11 (Mitchell PE community angle).
- **Gaps surfaced (voice modes where existing material is insufficient):**
  1. **Concierge mode is THIN — only 2 exemplars qualify, both written as community/Discord posts, neither in true 1-to-1 email register.** The "trusted curator with a real read on a specific Moment" voice exists in the briefs but as community-broadcast, not as collector-direct surface. Recommendation: commission 1–2 fresh writes from Magic in true concierge surface format before the swarm runs at full scale on a concierge-style email type.
  2. **Drop-anticipation mode** — the 2 exemplars curated are internal mint-case documents reframed as community angles. They demonstrate the voice register but are not currently formatted as a customer-facing drop email. Drafter agents should read them for register and fact-density, not for structural copy.

---

## Exemplar 1 — Transactional/receipt — Pack Received v1001 (THE Ship Benchmark)

**Source:** `/home/agent/topshot-review/lib/cards.ts` lines 252–278 (the only outright SHIP from Roham, no caveats)

**Subject:** Your {{event.packTitle}} just landed. Here's the set inside.

**Preheader:** {{event.set_marquee_player}} headlines. {{event.setTier}} tier. {{event.setMomentCount}} Moments across the run.

**Callouts:**
- The set: {{event.setName}} · {{event.setTier}} tier · {{event.setMomentCount}} Moments
- Your pack: 3 Moments · serials already minted, already assigned
- Marquee: {{event.set_marquee_player}}

**Body:**
> **{{event.setName}}** chronicles {{event.set_chronicler_note}}.
>
> Three Moments inside this pack. The order packs were created determines the serials you pulled. Some collectors pull a #1 of a tier. Some pull a low-print parallel that won't appear in another pack for months.
>
> **On the Marketplace this week, from {{event.setName}}:**
> {% for sale in event.set_top_3_recent_sales %}
> • {{sale.player}} {{sale.play}} cleared **{{sale.amount}}** ({{sale.sold_at | date: "%b %-d"}})
> {% endfor %}

**CTA:** Open your pack

**Why this exemplifies Magic voice:** Set-as-artifact opener ("{{setName}} chronicles X") — the platform-chronicler voice doing the talking, not a person. Marketplace comp data is woven into the body as a Liquid loop, not added as a sidebar. Treats pack arrival as the launch of a chronicled set, not a personal celebration. This is the registry voice, the documentary voice, and the only frame Roham shipped without a note.

**Banned-pattern audit:** ✅ no AI-tells (no "the play itself") · ✅ no newsletter framing · ✅ no negative-math · ✅ no spreadsheet-callout-stack (the callouts here are this email's own structure, not duplicated across the deck) · ✅ no factual claims to verify (everything is Liquid-bound to real per-event data)

---

## Exemplar 2 — Transactional/receipt — Pack Received Cinematic (Sparse Variant)

**Source:** `/home/agent/topshot-review/lib/cards.ts` lines 309–332

**Subject:** Three Moments. Already yours.

**Preheader:** {{event.set_marquee_player}} headlines. The serials are minted.

**Callouts:**
- The set: {{event.setName}} · {{event.setTier}}
- Circulation: {{event.setMomentCount}} Moments
- Inside: 3 serials · already assigned

**Body:**
> **The plays already happened.** Now they're yours.
>
> Three Moments inside. **Real serials. On-chain. The footage of the second it happened** — not a clip, not a card scan.
>
> {{event.set_marquee_player}} headlines this run.

**CTA:** OPEN THE PACK

**Why this exemplifies Magic voice:** Demonstrates the opposite structural end from Exemplar 1 — three callout rows, three body lines, one CTA. Shows drafters that the voice survives at minimum length. "The plays already happened. Now they're yours." is the cinematic-brevity register: declarative, ownership-anchored, no over-explanation.

**Banned-pattern audit:** ✅ "The footage of the second it happened" is NOT BANNED-01 — that ban targets "The play itself." as a standalone fragment-with-period. This is an adjective clause that names what the document IS without dropping into a rhetorical pause · ✅ no newsletter framing · ✅ no negative-math · ✅ no spreadsheet stack · ✅ no factual claims to verify

---

## Exemplar 3 — Transactional/receipt — Welcome v1001 (Platform Definition First)

**Source:** `/home/agent/topshot-review/lib/cards.ts` lines 409–431 (Roham: "this is starting to be really good")

**Subject:** Welcome to NBA Top Shot.

**Preheader:** Your free pack is loaded. Three Moments inside.

**Callouts:**
- Your free pack: 3 Moments · serials already minted
- Tonight in the Playoffs: {{week.featured_games}} · Round 2 live
- Where collectors talk: Discord · The Show · Top Shot Live

**Body:**
> NBA Top Shot is where basketball history exists as something you can own. Each Moment is a specific highlight from a specific game — pulled from the live broadcast, minted in a limited run, with a serial number that is permanent and assigned only once.
>
> **Your free pack** has three Moments inside. Already minted, already yours. The order packs were created determines what you pulled.
>
> **Round 2 of the 2026 Playoffs is live this week.** {{week.featured_games}}. The Moments minted from this postseason will be priced against by the next year of the market. Walking in this week means you're holding receipts on history before the rest of the market is loud.

**CTA:** Open your free pack

**Why this exemplifies Magic voice:** Platform-definition register. Answers "what is this thing" in line one without explaining it defensively. "Walking in this week means you're holding receipts on history before the rest of the market is loud" is the cleanest collector-positioning line in any welcome variant — anchors the new collector's arrival in time without flattery.

**Banned-pattern audit:** ✅ no "the play itself" · ✅ no personal letter ("Hey, this is...") · ✅ no NFT/Web3/dApp/crypto-native vocabulary · ✅ no manufactured urgency · ✅ no exclamation substitution · ✅ no fact claims that need checking (Liquid variables only)

---

## Exemplar 4 — Chronicler/market-read — R2 Transition Post (Discord version)

**Source:** `/opt/magic/collect-hq/nba-top-shot/drafts/r2-transition-post.md` lines 19–61

**Subject (if reframed as email):** Eight teams standing.

**Preheader:** Round 2 starts in 48 hours. The collector market is already there.

**Body:**
> Eight teams.
>
> That's what's left after everything that happened in Round 1.
>
> Here's what we know:
>
> **West:** Wembanyama's Spurs are in. SGA's Thunder are in. The Lakers and LeBron James at 41 are in. The Timberwolves are in — they knocked out the Nuggets in the first round.
>
> **East:** The 76ers are in — they came back from 3-1 down to eliminate the Celtics in Game 7, Embiid putting up 34 points and 12 rebounds nine days after appendectomy surgery. The Knicks are in. The Pistons are in — Cade Cunningham and Tobias Harris closed it at home 116-94 tonight, completing one of the 15 times in NBA history a team has come back from 3-1 down to win a series. And the Cavaliers are in — Donovan Mitchell closed the Raptors in Cleveland, 114-102.
>
> ---
>
> The collector market started moving toward Round 2 before the last Round 1 game was played. Embiid leading R2 players at 16 transactions/$14 median. LeBron 11 transactions/$2 median. SGA 2 transactions. Brunson 0. The market prices live narrative, not accomplished history.
>
> Round 2 starts in 48 hours.
>
> **The stories to watch:**
>
> Wembanyama's first Conference Semifinal at 22. This is the round where the narrative either confirms or complicates what you thought you knew about him. The collectors who hold Wemby going in hold an incomplete document that's about to get a lot more information.
>
> LeBron at 41 in the Conference Semis. He doesn't stop. The Moments from his 2026 playoff run will mean something different in ten years than they do now.

**CTA:** See all available Round 2 player Moments →

**Why this exemplifies Magic voice:** Chronicler/market-read at peak form. Structured news delivery (West / East) without editorial inflation — every sentence is a verifiable fact or specific Moment observation. The market framing ("the collector market started moving before the last Round 1 game was played") is embedded in the chronicle, not grafted on. "Round 2 isn't where players become legends. It's where you find out if the Round 1 version was a preview or a peak" is platform philosophy stated through the basketball, not over the basketball.

**Banned-pattern audit:** ✅ all factual claims are verifiable (specific scores, specific stats — Embiid 34/12 nine days post-appendectomy, Cade/Pistons 116-94, Mitchell 114-102) · ✅ no "three patterns I noticed" lead · ✅ no manufactured urgency · ✅ no lexical recycling

---

## Exemplar 5 — Chronicler/market-read — The 30-Minute Window

**Source:** `/opt/magic/collect-hq/nba-top-shot/intelligence/2026-05-03-the-30-minute-window.md` lines 17–42

**Subject (if reframed as email):** The market freezes during games. Then it doesn't.

**Preheader:** What I measured today: the 30 minutes after a buzzer is the sharpest window in this market.

**Body:**
> The NBA Top Shot marketplace freezes during live playoff game action and thaws immediately at resolution. The 30 minutes after the final buzzer is the sharpest, shortest window of informational advantage available to collectors in the Top Shot market.
>
> This is not speculation. I measured it three times today.
>
> **Confirmation 1 — Pistons/Magic G7 live action.** During live action, market activity on both Cade Cunningham and Paolo Banchero dropped to near-zero. Their seasons were literally on the line — one elimination basket at any moment — and the market didn't move. The resolution hadn't happened yet. Certainty hadn't arrived.
>
> At confirmation (final buzzer, Pistons 116-94): Cade's 24h volume recovered to 9 transactions in the hours following — the market reactivated post-result.
>
> **Confirmation 2 — Embiid announcement-day spike.** The NBA confirmed the Knicks/76ers Round 2 matchup mid-afternoon Sunday. Within the following hours, Embiid's 24h volume jumped from baseline to **52 transactions at $14 median** — an estimated 2.9× above Cade's concurrent volume. Embiid's Saturday Game 7 performance was already in the record; the announcement didn't add information about *what he did*. It added information about *what would happen next*: Embiid at MSG, confirmed, nine days out of appendectomy surgery.
>
> The announcement made the future certain. The market bought certainty.

**CTA:** See live R2 player Moments →

**Why this exemplifies Magic voice:** Data-scientist-as-chronicler. Numbers carry the argument. "I measured it three times today" is the only first-person construction — earned by specificity. The phrase "the market bought certainty" is the kind of compressed insight Roham reaches for in the through-line ("real signal, real specificity, real user — or don't send it"). Stratechery-meets-collectibles in the cleanest form.

**Banned-pattern audit:** ✅ all numbers traceable (52 transactions/$14 median sourced from market snapshot files) · ✅ "Confirmation 1, Confirmation 2" is structural section labels for a chronicled investigation, NOT BANNED-02 ("three patterns I noticed" newsletter lead) — the distinction is that these are evidence-block headers, not the email's opening rhetorical move · ✅ no AI-feel markers · ✅ no manufactured urgency

---

## Exemplar 6 — Chronicler/market-read — The Number Nobody Priced (Allen 22/19)

**Source:** `/opt/magic/collect-hq/nba-top-shot/briefs/2026-05-04-the-number-nobody-priced.md`

**Subject:** Jarrett Allen had 22 and 19 in a Game 7. The market hasn't noticed.

**Preheader:** Zero transactions in the 24 hours after a tied playoff career high.

**Body:**
> Jarrett Allen had 22 points and 19 rebounds in Cleveland's Game 7 win over Toronto.
>
> 22 and 19. That's a tied playoff career high. That's the kind of performance that reframes a player's reputation as a serious playoff contributor.
>
> His NBA Top Shot market activity in the 24 hours following: **zero transactions**.
>
> ---
>
> This isn't an argument that Allen is undervalued as a player. The Cavaliers know what they have. Cleveland built around the Mitchell/Mobley/Allen core deliberately.
>
> It's an observation about how the market allocates attention.
>
> The story that circulates — the one that gets framed and shared and analyzed — was Donovan Mitchell and the Raptors. The 114-102 close. The G7 that survived Barrett's overtime buzzer-3. That's the narrative thread. Mitchell is the headline.
>
> Allen's 22 and 19 disappears into the supporting text. Even though, on the night, his performance was the structural reason Cleveland won. Mitchell finishes. Allen makes finishing possible.
>
> ---
>
> Mitchell: 4 transactions, $2 median. Allen: 0.
>
> Both are now in a Conference Semifinals. Both contributed to the Game 7 win. The market is differentiating them not by contribution but by narrative legibility. Mitchell's arc has a frame. Allen's arc is: "the team wouldn't work without him."
>
> "The team wouldn't work without him" is a true and important thing. The market just doesn't pay a certainty premium for it.

**CTA:** See Allen Moments in the market →

**Why this exemplifies Magic voice:** Chronicler at its observational peak. The piece does not say "buy Allen." It says "this is how the market is reading the night." The framing — performance vs. narrative legibility — is the editorial contribution. "Mitchell finishes. Allen makes finishing possible" is the load-bearing sentence. No hype, no urgency, just a read.

**Banned-pattern audit:** ✅ all numbers verified (Allen 22/19 was the actual G7 stat line — sourced from r2-transition-post.md tick-0250) · ✅ Mitchell 4 txns/$2 median + Allen 0 sourced from GraphQL pull 04:52Z May 4 · ✅ no "three patterns" lead · ✅ no spin · ✅ no exclamation substitution

---

## Exemplar 7 — Drop-anticipation — Banchero PE Mint Case (Community Angle)

**Source:** `/opt/magic/collect-hq/nba-top-shot/intelligence/2026-05-03-banchero-playoffs-edition-mint-case.md` (sections "Why the Performance Earns It" + "What the Market Is Already Saying" + "The May 4 Pack Drop Pairing" — reframed for collector-facing surface)

**Subject:** Last night Paolo Banchero closed a road Game 7. Today there's a mint.

**Preheader:** 8-seed, no Wagner, road win in Detroit. The document goes live.

**Callouts:**
- The performance: 8-seed road winner over the East's 1-seed
- The context: Without Franz Wagner. After blowing a 24-point lead in Game 6
- The mint: Paolo Banchero · 2026 Playoffs Edition · live now

**Body:**
> Paolo Banchero closed a road Game 7 in Detroit last night.
>
> Eight-seed, against the East's 1-seed. Without his second star — Wagner in a walking boot. After blowing a 24-point lead at home in Game 6, shooting 4-of-20, his worst game of the series.
>
> Then he flew to Detroit and won the elimination game.
>
> That is one of the most context-rich individual playoff performances in recent first-round history. The kind of game where the document is built into the result.
>
> Pre-tip yesterday, Banchero's existing Moments showed three transactions at $8 median — a small position taken when the rest of the market was looking at Cade. Smart money buying optionality on the proof arc. Someone thought he wins.
>
> Today's Playoffs Edition mint captures the document. One pack. Real serial. The first round of the 2026 playoffs is closed; the chapter is written; this is the chapter you can hold.

**CTA:** See the Banchero PE drop →

**Why this exemplifies Magic voice:** Drop-anticipation register without overhype. The performance carries the argument — three sentences of context (8-seed / no Wagner / lost the 24-point lead) before the mint is mentioned. "Sensationalized-legend-but-restrained" — the legend is the actual performance, the restraint is in not adding adjectives. The smart-money sentence ($8 median pre-tip) gives the email a market-read subtext without becoming a market report.

**Banned-pattern audit:** ✅ all facts verified (Banchero 4-of-20 in G6, Wagner walking boot, $8 median pre-tip from market snapshot 19:12Z May 3) · ✅ no "limited time only" manufactured urgency · ✅ no "exclusive/incredible/unique" lexical recycling · ✅ no exclamation marks · CAVEAT: this is reframed from an internal mint-case document; the original was a decision brief, not a customer-facing email. Drafter agents should treat this as a register exemplar, not as production copy.

---

## Exemplar 8 — Drop-anticipation — CMB "The Only One Already Documented"

**Source:** `/opt/magic/collect-hq/nba-top-shot/briefs/2026-05-03-cmb-the-only-one.md` lines 14–43

**Subject (if reframed as drop email):** The only Raptor with a 2026 Playoffs Edition Moment.

**Preheader:** Collin Murray-Boyles. 20 years old. The market saw him before the rest of the room.

**Body:**
> Before tonight's game in Cleveland, the NBA Top Shot market made a statement nobody really talked about:
>
> **Collin Murray-Boyles is the only player on either the Cleveland Cavaliers or the Toronto Raptors with a 2026 Playoffs Edition Moment.**
>
> Not Donovan Mitchell. Not Scottie Barnes. Not RJ Barrett. Not Evan Mobley. Not James Harden.
>
> CMB.
>
> The 20-year-old Raptors rookie who set the franchise's single-season playoff scoring record for a first-year player. Who ran an offense without Immanuel Quickley (out all series) and Brandon Ingram (effectively out, walking boot at shootaround Sunday) in a series against the team with home court advantage. Who the market priced at $497 while Barrett was trading at $0.28 — a 1,775-to-1 ratio, on the morning of the same game.
>
> The market was telling you something.
>
> ---
>
> The arithmetic of the Playoffs Edition matters here. Every player in the PE has a fixed supply — roughly 200 Moments minted. CMB is the only player on either Cleveland or Toronto roster whose 2026 playoff run is already in the PE. The fixed supply is already there. What changes is the story it tells.

**CTA:** See the CMB PE Moment →

**Why this exemplifies Magic voice:** Drop-anticipation with the legend stated through arithmetic. "Not Donovan Mitchell. Not Scottie Barnes. Not RJ Barrett. Not Evan Mobley. Not James Harden. / CMB." is the cleanest cinematic beat structure in the entire corpus. The 1,775-to-1 ratio is the line that would not survive in a generic AI draft — it's specific, it's load-bearing, and it's the entire argument. Topps Now without overhype because the arithmetic carries the weight.

**Banned-pattern audit:** ✅ $497 Murray-Boyles morning ceiling + $0.28 Barrett trade verified in source · ✅ "roughly 200 Moments minted" is the documented PE supply standard · ✅ no manufactured urgency (the urgency is the actual game-window, not invented) · ✅ no spin

---

## Exemplar 9 — Reactivation/collector-history — Segment A: Origin Story Holders

**Source:** `/opt/magic/collect-hq/nba-top-shot/2026-05-03-reactivation-copy-specimens.md` lines 53–76 (positive-math cohort only — see appendix on lines 246–267)

**Subject:** The Moments you bought in 2021 are documenting something right now.

**Preheader:** Round 2 starts Tuesday. Here's what your collection means this week.

**Body:**
> You were collecting NBA Top Shot when it was the loudest thing in sports.
>
> You saw something real. A way to own the actual moments — not a jersey, not a print, not a card in a case. The specific play. Verified. Yours.
>
> Here's what I want you to know: **the players you held are in the Conference Semifinals this week.**
>
> LeBron James is 41 years old and just advanced past the first round. His Playoff Moments from 2026 are going to look different in ten years than they look right now. You know that. You bought that thesis in 2021 and you've been right about how this works.
>
> The between-rounds window is the repositioning window. It's when the first-round narratives settle into prices and the Round 2 stories haven't opened yet. The collectors who understand that — the ones who bought early because they understood what the Moment was documenting — are moving right now.
>
> Your collection is early-chapter documentation of something that's still being written.

**CTA:** See what's in the market →

**Why this exemplifies Magic voice:** Reactivation/collector-history at full strength. Treats the dormant collector as someone who was right, not someone who left. "You bought that thesis in 2021 and you've been right about how this works" is the through-line: the collector's own history is the credential. The personalization layer in the spec swaps in the actual top-held player from BQ — when that lands, this becomes the cleanest reactivation in the deck.

**Banned-pattern audit:** ✅ POSITIVE-MATH GATE: this exemplar is for the documented positive-math cohort only (Jokic S1 +246–518%, LeBron S1 Cosmic +240%, SGA S2 +48–128%, Wemby S7 +59–185% — all sourced in reactivation-copy-specimens.md lines 261–266). It is NOT to be sent to the negative-math cohort (Giannis S2 −89%, LeBron S2 Holo −96%, Luka S2 Holo −92%) · ✅ no negative-math framing for this audience · ✅ no AI tells · ✅ no "I hope this finds you well"

---

## Exemplar 10 — Reactivation/collector-history — Segment B: Single-Star Believers (LeBron variant)

**Source:** `/opt/magic/collect-hq/nba-top-shot/2026-05-03-reactivation-copy-specimens.md` lines 100–124

**Subject:** LeBron is in the Conference Semifinals at 41. Your Moments are live.

**Preheader:** The story you bought isn't finished.

**Body:**
> You've been collecting LeBron James Moments.
>
> You understand what you're holding: documentation of the specific player, the specific game, the specific play. Verified. Permanent. Yours.
>
> LeBron is 41 years old. He just beat a first-round opponent without his co-star. He's heading to Oklahoma City to face the defending champions as the largest underdog the Lakers franchise has faced since 1988.
>
> The Moments from a player's 41-year-old playoff run are not the same as the Moments from his championship years. They're something different. They're the "against all odds" chapter. The "they said it was over and he kept going" chapter.
>
> That story is being written right now — and your collection is already part of it.

**CTA:** See LeBron Moments in the market →

**Why this exemplifies Magic voice:** The single-star variant of collector-history voice. Names the specific player. Stakes the specific moment. "Your collection is already part of it" anchors the reactivation in ownership rather than in transaction-recovery. This is the register that scaled across 6 sub-variants in the spec (Giannis, Curry, KD, Embiid, SGA) — same structural pattern, different player.

**Banned-pattern audit:** ✅ "largest underdog the Lakers franchise has faced since 1988" — VERIFY before send. Source is the reactivation specimens doc but the 1988 line lacks an explicit citation. Drafter agents should fact-check or scope ("largest underdog in recent franchise history") before production · ✅ no negative-math framing for this audience (LeBron S1 Cosmic +240% is the math basis) · ✅ no manufactured urgency · ✅ no AI tells

---

## Exemplar 11 — Reactivation/collector-history — Segment C: The Survivors

**Source:** `/opt/magic/collect-hq/nba-top-shot/2026-05-03-reactivation-copy-specimens.md` lines 139–163

**Subject:** You held through 2024. Round 2 tips this week.

**Preheader:** You're still here. Here's what's in the market right now.

**Body:**
> You're still holding.
>
> You didn't leave when a lot of people left. You stayed with the Moments you have, through the years where the noise got loud and the obvious path was to walk away.
>
> I want to tell you what you've been holding while you've been waiting.
>
> The NBA is in the Conference Semifinals right now. Shai Gilgeous-Alexander is leading a defending championship team. LeBron James is 41 years old and went three rounds deep without his co-star. Wembanyama is in his first second round at 22. Joel Embiid came back from appendectomy surgery and won a Game 7.
>
> These are the rounds that the Moments get remembered from. Not the regular season. Not the first round. The Conference Semifinals, when the field is cut to eight teams and every possession matters.
>
> The Moments from this round are in the market right now — before they're priced for what they documented.
>
> You've been patient. This is the window you were patient for.

**CTA:** See what's available →

**Why this exemplifies Magic voice:** The hardest reactivation register — long-dormant collector, no portfolio-appreciation lever. The voice avoids the negative-math trap (BANNED-04) by not making the email about price at all. It makes it about basketball and patience. "You've been patient. This is the window you were patient for" is the close. No spin. No "your wallet is up." Just: here's what's happening on the court, and you're still in.

**Banned-pattern audit:** ✅ NO portfolio-appreciation claim — the email never says "your collection is up" — therefore D2 (Positive Math Gate) is N/A and BANNED-04 does not apply · ✅ all basketball facts verified (SGA defending champ, LeBron 41, Wemby 22, Embiid post-appendectomy) · ✅ no AI tells · ✅ no manufactured urgency

---

## Exemplar 12 — Reactivation/collector-history — Matt's Personal Touch (Top 50 Concierge Specimen)

**Source:** `/opt/magic/collect-hq/nba-top-shot/2026-05-03-reactivation-copy-specimens.md` lines 184–202

**Subject:** Your [PLAYER_NAME] Moment, and what's happening this week

**Body (template — Matt fills [BRACKETS] from BQ data per collector):**
> Hey [FIRSTNAME],
>
> Matt Schorr here.
>
> I pulled up your collection before writing this. You hold [MOMENT_COUNT] Moments, including [TOP_MOMENT_NAME] Serial #[SERIAL]. You've been collecting since [FIRST_PURCHASE_DATE].
>
> [ONE SENTENCE about their specific playoff connection: e.g., "That LeBron you've been holding — he's in Oklahoma City this week, 41 years old, without Luka, as the biggest underdog the franchise has fielded in thirty years."]
>
> I'm not writing to sell you anything. I'm writing because [ONE OBSERVATION about what's remarkable about their specific collection: e.g., "someone who held a LeBron early Playoff Moment through 2024 has a different kind of patience than most collectors — and I think you understand what that Moment is documenting in a way the market hasn't fully caught up to."]
>
> If you want to talk through what I'm seeing, just reply. If you want to look on your own terms, your collection is at [COLLECTION_URL].
>
> Matt

**CTA:** [Reply] or [COLLECTION_URL]

**Why this exemplifies Magic voice:** The named-person register, applied legitimately. This is NOT BANNED-03 (the "Matt writing some bullshit to you" anti-pattern) — the difference is the audience size and the personalization depth. This is 50 collectors, hand-reviewed, top LTV, with real per-collector BQ data filled in for each one before send. Matt actually pulls each collection up. The voice rules: no manufactured enthusiasm, named specifics, "I'm not writing to sell you anything" stated and then proven by what follows. This is the legitimate version of the personal-letter frame.

**Banned-pattern audit:** ✅ NOT BANNED-03 because the audience is 50, the data is per-collector real, and Matt actually drafts each one — this is the "real personalization on a real concierge surface" case the through-line endorses · ✅ "biggest underdog the franchise has fielded in thirty years" — same caveat as Exemplar 10, verify before send · ✅ no AI tells · ✅ no exclamation substitution

---

## Exemplar 13 — Concierge — The $525 Holder

**Source:** `/opt/magic/collect-hq/nba-top-shot/briefs/2026-05-03-the-525-holder.md` lines 26–66

**Subject (if reframed as concierge email):** Someone is holding a Murray-Boyles Moment at $525.

**Preheader:** What ceiling prices reveal about the highest-conviction holders in this market.

**Body:**
> This morning I pulled the market snapshot. Every key player in tonight's two Game 7s. Floor, ceiling, 24-hour volume.
>
> Here is the number that stopped me:
>
> **Collin Murray-Boyles: $525 ceiling.**
>
> The highest ceiling in the snapshot. Above Cade Cunningham ($500). Above Donovan Mitchell ($500). Above Paolo Banchero ($400). Above RJ Barrett ($299).
>
> A 20-year-old rookie, in his first playoff run, nine picks into the 2025 draft, on a team about to play a Game 7 in Cleveland — his most expensive available Moment is $525, and nobody has bought it yet.
>
> The person holding that Moment is asking $525 and has decided not to move.
>
> ---
>
> The floor is noise. A $1 floor means: the cheapest Moment from this player, the most common edition, the lowest ask. The floor is the opinion of the most impatient or least confident holder in the market.
>
> The ceiling is different. The ceiling is the opinion of the most patient and most confident holder in the market — the person who set an asking price and said: not below this, not now, not yet.
>
> The $525 Murray-Boyles holder is not holding $525 because they paid $525. They're holding $525 because that's the price at which they'd release the document — and they believe the price that justifies the release hasn't arrived yet.

**CTA:** See the Murray-Boyles ceiling listing →

**Why this exemplifies Magic voice:** The "trusted curator with a real read on a specific Moment" register the prompt asked for. The piece does not say "buy this Moment." It says "here is what this listing tells you about who is in this market." The single-Moment focus, the holder-psychology framing, the patient explanation of what a ceiling actually is — this is concierge as Roham described it: not newsletter-author register, not "three patterns I noticed," but a curator looking at one specific listing and explaining what they see. The voice survives at a higher word count because every paragraph adds a beat.

**Banned-pattern audit:** ✅ $525 / $500 / $500 / $400 / $299 ceilings sourced from market snapshot 10:41 UTC May 3 · ✅ NOT BANNED-02 (no "three patterns I noticed" lead — opens with a single specific number) · ✅ no manufactured urgency · ✅ no spin · CAVEAT: this is currently a community brief, not a 1-to-1 email surface. Drafter agents should read it for register and Moment-specificity, not for structural copy.

---

## Exemplar 14 — Concierge — Thirty-Five Purchases at Thirteen Dollars

**Source:** `/opt/magic/collect-hq/nba-top-shot/briefs/2026-05-03-thirty-five-at-thirteen.md` lines 14–60

**Subject (if reframed as concierge email):** Somebody bought 35 Mobley Moments. Here's the pattern.

**Preheader:** $640 position. 40-hour window. No panic, no chasing.

**Body:**
> In the 40 hours before Game 7, while the basketball world was watching Cade Cunningham and Paolo Banchero take turns scoring 45 points, somebody was buying Evan Mobley Moments.
>
> Not one or two. Thirty-five.
>
> All Base Set. Predominantly $13 each. First purchase Friday morning at 3 AM. Last purchase early Saturday morning. In between: a systematic walk through the available supply, transaction by transaction, clearing every $13 seller the market had to offer.
>
> They also bought a Metallic Gold LE. An Equinox. Two more premium parallels.
>
> Estimated total position: about $640 in Mobley before tip.
>
> ---
>
> **What 22 and 19 means in market terms.** The collector who bought 35 Base Set Mobley Moments knows what Mobley is. The Cavaliers' defensive rating when Mobley plays is historically among the best in the league. When he's anchoring the paint, Cleveland can live with aggressive opponents playing into the coverage, because the end of that possession is usually Mobley blocking it or redirecting it into contested territory. He doesn't show up on the highlights. He shows up in the final score.
>
> **How they did it.** First purchase: Metallic Gold LE, $19. Premium tier, small position — establishing an anchor. Then eight Base Set in 38 minutes. Then fourteen more in the early business hours window, $13–$14, clearing the floor as it appeared. They never paid more than $15 for a Base Set Moment. When sellers appeared at $13, they bought. When sellers ran dry, they waited.
>
> This is not a casual collector who woke up excited about the playoffs. This is a thesis, executed over 40+ hours with price discipline.

**CTA:** See Mobley Moments →

**Why this exemplifies Magic voice:** The other concierge mode — case-study register on a specific transaction pattern. Treats one collector's accumulation as the subject of a curator's careful read. "They priced something the market doesn't know how to price yet" is the editorial contribution. The data carries the argument; the prose explains why the data matters. Roham's 80/20 ratio in action — 80% chronicled facts, 20% Magic-observational ("This is a thesis, executed over 40+ hours with price discipline").

**Banned-pattern audit:** ✅ all 35 transactions traced from public GraphQL sortID timestamps, sourced in the brief · ✅ Metallic Gold LE $19, Equinox $34 — verifiable from sale records · ✅ no manufactured urgency · ✅ no spin · ✅ no exclamation substitution · CAVEAT: same as Exemplar 13 — currently community brief format, not 1-to-1 email surface. Use as register exemplar.

---

## Sufficiency check

- **Did you find ≥2 exemplars per voice mode?**
  - Transactional/receipt: 3 ✅ (Pack Received v1001, Pack Received Cinematic, Welcome v1001)
  - Chronicler/market-read: 3 ✅ (R2 Transition, 30-Minute Window, Number Nobody Priced)
  - Drop-anticipation: 2 ✅ (Banchero PE, CMB Only One) — both reframed from internal mint-cases
  - Reactivation/collector-history: 4 ✅ (Segment A, Segment B/LeBron, Segment C, Matt's Personal Touch)
  - Concierge: 2 ✅ but THIN (the $525 Holder, 35 at $13) — both currently community-brief format

- **Are any of the exemplars borderline?**
  - **Exemplar 7 (Banchero PE)** — reframed from internal mint-case decision brief. Drafter agents should treat as register exemplar, not production-ready copy. Roham review recommended before Phase 2 fires on a drop-announcement email type.
  - **Exemplar 10 (Reactivation B / LeBron)** — contains "largest underdog the Lakers franchise has faced since 1988" claim that lacks an explicit citation in the source. Verify or scope before send.
  - **Exemplar 12 (Matt's Personal Touch)** — needs Matt's actual approval before being treated as voice-canonical for a Matt-from surface. Magic should not author Matt's voice without confirmation; this is Matt's specimen, included as register example.
  - **Exemplars 13 + 14 (Concierge)** — both written as community broadcasts with curator framing, not as 1-to-1 email surfaces. Drafter agents must adapt structure (subject line, preheader, single CTA) without losing the read-on-a-specific-Moment register. Roham review is most load-bearing here because concierge psychology was the harshest single feedback ("Absolutely terrible. Totally misunderstands whale psychology").

- **Recommended Gate 1 status:** **PASS-WITH-CAVEATS**
  - PASS because all 5 voice modes have ≥2 exemplars; BANNED-01..10 scan is clean across all 14; AI-feel marker scan is clean.
  - WITH-CAVEATS because (a) the concierge mode is thin (community-brief format only, no true 1-to-1 surface examples); (b) two exemplars (10, 12) have unverified factual claims that need scoping before live use; (c) drop-anticipation exemplars are reframed-internal, not customer-facing-original.
  - Recommend Roham reviews Exemplars 7, 10, 12, 13, 14 specifically before Phase 2 launches on Drop Announcement, Reactivation Segment B, or any concierge-style surface.

---

## Gap report

**Voice modes where existing collect-hq material doesn't have a clean exemplar:**

1. **True 1-to-1 concierge email surface** — the $525 Holder and 35-at-$13 are both community-broadcast briefs. The "curator read on a specific Moment, sent to one collector" surface does not have a finished example anywhere in the corpus. The closest is Matt's Personal Touch specimen (Exemplar 12), which is reactivation-flavored, not Moment-curator-flavored. The whale-tier concierge work was deferred precisely because this register is hard.

2. **Drop-anticipation customer-facing email** — every drop-anticipation piece in the corpus is either a Discord post, an internal mint-case decision brief, or a Wemby/Cade/CMB community thesis. There is no Roham-approved drop-announcement email in cards.ts (the Drop Announcement Almanac in cards.ts has the unverified "$1.2M T30" line and the "13-Moments-per-buyer ratio invert" paragraph that Roham flagged).

3. **Abandoned cart and Fast Break** — both have ZERO exemplars (noted in the prior voice-exemplar-corpus.md gap report). Drafter agents working on these surfaces will be working from platform-chronicler general exemplars + Liquid scaffolds. Higher rubric-kick-back risk.

**Recommendation:**
- **Before Phase 2 fires** on Drop Announcement: commission 1 fresh write from Magic in true drop-email format using the CMB or Banchero source material, route through Roham for sign-off, add as Exemplar 15.
- **Before Phase 2 fires** on a concierge-style email type: commission 1 fresh write from Magic in true 1-to-1 concierge surface format (single Moment, single collector, real read), route through Roham, add as Exemplar 16.
- **For Abandoned Cart and Fast Break** specifically: drafter agents should rely on the platform-chronicler register from Exemplars 1, 2, 3, 4 + the surface-specific Liquid scaffolds + the social-proof injection in Phase 6. The first 50 sends per surface require human review (Sam W. or Roham proxy) as the orchestration spec specifies.
- **Proceed with thinner coverage** is acceptable for the transactional tier because the platform-chronicler register is well-established across Exemplars 1–6. Concierge and drop-anticipation should NOT proceed with thinner coverage — these are the registers where the prior 4-iteration failure cycle landed hardest.

---

*Filed 2026-05-04. Phase 0 Exemplar Curator agent. Pending Roham sign-off before Phase 2 (transactional draft agents) launches.*
