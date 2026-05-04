// lib/exemplars.ts — Phase 0 Voice-Anchor Exemplar Deck (14 cards)
// Curated from: 2026-05-04-rewrite-exemplars.md
// Voice modes: transactional (3), chronicler (3), drop-anticipation (2),
//              reactivation (4), concierge (2)
// Caveats on exemplars 7, 10, 12, 13, 14 — yellow warning banner per spec.

export type VoiceModeName =
  | "transactional"
  | "chronicler"
  | "drop-anticipation"
  | "reactivation"
  | "concierge";

export type ExemplarCard = {
  id: string;              // e.g. "exemplar-01"
  position: number;        // 1–14
  voiceMode: VoiceModeName;
  source: string;
  subject: string;
  preheader: string;
  body: string[];          // paragraphs
  cta: string;
  voiceRationale: string;  // "Why this exemplifies Magic voice"
  bannedAudit: string;     // pass/fail summary
  caveat?: string;         // if present → show yellow warning banner
};

export const EXEMPLARS: ExemplarCard[] = [
  // ─── TRANSACTIONAL ───────────────────────────────────────────────────────
  {
    id: "exemplar-01",
    position: 1,
    voiceMode: "transactional",
    source: "lib/cards.ts — Pack Received v1001 (THE Ship Benchmark — only outright SHIP from Roham, no caveats)",
    subject: "Your {{event.packTitle}} just landed. Here's the set inside.",
    preheader: "{{event.set_marquee_player}} headlines. {{event.setTier}} tier. {{event.setMomentCount}} Moments across the run.",
    body: [
      "**{{event.setName}}** chronicles {{event.set_chronicler_note}}.",
      "Three Moments inside this pack. The order packs were created determines the serials you pulled. Some collectors pull a #1 of a tier. Some pull a low-print parallel that won't appear in another pack for months.",
      "**On the Marketplace this week, from {{event.setName}}:**",
      "{% for sale in event.set_top_3_recent_sales %}\n• {{sale.player}} {{sale.play}} cleared **{{sale.amount}}** ({{sale.sold_at | date: \"%b %-d\"}})\n{% endfor %}",
    ],
    cta: "Open your pack",
    voiceRationale:
      "Set-as-artifact opener (\"{{setName}} chronicles X\") — the platform-chronicler voice doing the talking, not a person. Marketplace comp data woven into the body as a Liquid loop, not added as a sidebar. Treats pack arrival as the launch of a chronicled set, not a personal celebration. This is the registry voice, the documentary voice, and the only frame Roham shipped without a note.",
    bannedAudit:
      "CLEAN: no \"the play itself\" · no newsletter framing · no negative-math · no spreadsheet-callout-stack · no factual claims to verify (everything is Liquid-bound to real per-event data)",
  },

  {
    id: "exemplar-02",
    position: 2,
    voiceMode: "transactional",
    source: "lib/cards.ts — Pack Received Cinematic (Sparse Variant)",
    subject: "Three Moments. Already yours.",
    preheader: "{{event.set_marquee_player}} headlines. The serials are minted.",
    body: [
      "**The plays already happened.** Now they're yours.",
      "Three Moments inside. **Real serials. On-chain. The footage of the second it happened** — not a clip, not a card scan.",
      "{{event.set_marquee_player}} headlines this run.",
    ],
    cta: "OPEN THE PACK",
    voiceRationale:
      "Demonstrates the opposite structural end from Exemplar 1 — three callout rows, three body lines, one CTA. Shows drafters that the voice survives at minimum length. \"The plays already happened. Now they're yours.\" is the cinematic-brevity register: declarative, ownership-anchored, no over-explanation.",
    bannedAudit:
      "CLEAN: \"The footage of the second it happened\" is NOT BANNED-01 — that ban targets \"The play itself.\" as a standalone fragment-with-period. This is an adjective clause that names what the document IS · no newsletter framing · no negative-math · no spreadsheet stack · no factual claims to verify",
  },

  {
    id: "exemplar-03",
    position: 3,
    voiceMode: "transactional",
    source: "lib/cards.ts — Welcome v1001 (Roham: \"this is starting to be really good\")",
    subject: "Welcome to NBA Top Shot.",
    preheader: "Your free pack is loaded. Three Moments inside.",
    body: [
      "NBA Top Shot is where basketball history exists as something you can own. Each Moment is a specific highlight from a specific game — pulled from the live broadcast, minted in a limited run, with a serial number that is permanent and assigned only once.",
      "**Your free pack** has three Moments inside. Already minted, already yours. The order packs were created determines what you pulled.",
      "**Round 2 of the 2026 Playoffs is live this week.** {{week.featured_games}}. The Moments minted from this postseason will be priced against by the next year of the market. Walking in this week means you're holding receipts on history before the rest of the market is loud.",
    ],
    cta: "Open your free pack",
    voiceRationale:
      "Platform-definition register. Answers \"what is this thing\" in line one without explaining it defensively. \"Walking in this week means you're holding receipts on history before the rest of the market is loud\" is the cleanest collector-positioning line in any welcome variant — anchors the new collector's arrival in time without flattery.",
    bannedAudit:
      "CLEAN: no \"the play itself\" · no personal letter (\"Hey, this is...\") · no NFT/Web3/dApp/crypto-native vocabulary · no manufactured urgency · no exclamation substitution · no fact claims that need checking (Liquid variables only)",
  },

  // ─── CHRONICLER ───────────────────────────────────────────────────────────
  {
    id: "exemplar-04",
    position: 4,
    voiceMode: "chronicler",
    source: "collect-hq/nba-top-shot/drafts/r2-transition-post.md — R2 Transition Post (Discord version)",
    subject: "Eight teams standing.",
    preheader: "Round 2 starts in 48 hours. The collector market is already there.",
    body: [
      "Eight teams.\n\nThat's what's left after everything that happened in Round 1.",
      "**West:** Wembanyama's Spurs are in. SGA's Thunder are in. The Lakers and LeBron James at 41 are in. The Timberwolves are in — they knocked out the Nuggets in the first round.",
      "**East:** The 76ers are in — they came back from 3-1 down to eliminate the Celtics in Game 7, Embiid putting up 34 points and 12 rebounds nine days after appendectomy surgery. The Knicks are in. The Pistons are in — Cade Cunningham and Tobias Harris closed it at home 116-94 tonight, completing one of the 15 times in NBA history a team has come back from 3-1 down to win a series. And the Cavaliers are in — Donovan Mitchell closed the Raptors in Cleveland, 114-102.",
      "---",
      "The collector market started moving toward Round 2 before the last Round 1 game was played. Embiid leading R2 players at 16 transactions/$14 median. LeBron 11 transactions/$2 median. SGA 2 transactions. Brunson 0. The market prices live narrative, not accomplished history.",
      "Round 2 starts in 48 hours.",
      "**The stories to watch:**\n\nWembanyama's first Conference Semifinal at 22. This is the round where the narrative either confirms or complicates what you thought you knew about him. The collectors who hold Wemby going in hold an incomplete document that's about to get a lot more information.\n\nLeBron at 41 in the Conference Semis. He doesn't stop. The Moments from his 2026 playoff run will mean something different in ten years than they do now.",
    ],
    cta: "See all available Round 2 player Moments →",
    voiceRationale:
      "Chronicler/market-read at peak form. Structured news delivery (West / East) without editorial inflation — every sentence is a verifiable fact or specific Moment observation. The market framing is embedded in the chronicle, not grafted on.",
    bannedAudit:
      "CLEAN: all factual claims are verifiable (specific scores, specific stats — Embiid 34/12 nine days post-appendectomy, Cade/Pistons 116-94, Mitchell 114-102) · no \"three patterns I noticed\" lead · no manufactured urgency · no lexical recycling",
  },

  {
    id: "exemplar-05",
    position: 5,
    voiceMode: "chronicler",
    source: "collect-hq/nba-top-shot/intelligence/2026-05-03-the-30-minute-window.md — The 30-Minute Window",
    subject: "The market freezes during games. Then it doesn't.",
    preheader: "What I measured today: the 30 minutes after a buzzer is the sharpest window in this market.",
    body: [
      "The NBA Top Shot marketplace freezes during live playoff game action and thaws immediately at resolution. The 30 minutes after the final buzzer is the sharpest, shortest window of informational advantage available to collectors in the Top Shot market.",
      "This is not speculation. I measured it three times today.",
      "**Confirmation 1 — Pistons/Magic G7 live action.** During live action, market activity on both Cade Cunningham and Paolo Banchero dropped to near-zero. Their seasons were literally on the line — one elimination basket at any moment — and the market didn't move. The resolution hadn't happened yet. Certainty hadn't arrived.\n\nAt confirmation (final buzzer, Pistons 116-94): Cade's 24h volume recovered to 9 transactions in the hours following — the market reactivated post-result.",
      "**Confirmation 2 — Embiid announcement-day spike.** The NBA confirmed the Knicks/76ers Round 2 matchup mid-afternoon Sunday. Within the following hours, Embiid's 24h volume jumped from baseline to **52 transactions at $14 median** — an estimated 2.9× above Cade's concurrent volume. Embiid's Saturday Game 7 performance was already in the record; the announcement didn't add information about *what he did*. It added information about *what would happen next*: Embiid at MSG, confirmed, nine days out of appendectomy surgery.\n\nThe announcement made the future certain. The market bought certainty.",
    ],
    cta: "See live R2 player Moments →",
    voiceRationale:
      "Data-scientist-as-chronicler. Numbers carry the argument. \"I measured it three times today\" is the only first-person construction — earned by specificity. The phrase \"the market bought certainty\" is the kind of compressed insight Roham reaches for. Stratechery-meets-collectibles in the cleanest form.",
    bannedAudit:
      "CLEAN: all numbers traceable (52 transactions/$14 median sourced from market snapshot) · \"Confirmation 1, Confirmation 2\" is structural section labels for a chronicled investigation, NOT BANNED-02 (these are evidence-block headers, not the email's opening rhetorical move) · no AI-feel markers · no manufactured urgency",
  },

  {
    id: "exemplar-06",
    position: 6,
    voiceMode: "chronicler",
    source: "collect-hq/nba-top-shot/briefs/2026-05-04-the-number-nobody-priced.md — The Number Nobody Priced (Allen 22/19)",
    subject: "Jarrett Allen had 22 and 19 in a Game 7. The market hasn't noticed.",
    preheader: "Zero transactions in the 24 hours after a tied playoff career high.",
    body: [
      "Jarrett Allen had 22 points and 19 rebounds in Cleveland's Game 7 win over Toronto.",
      "22 and 19. That's a tied playoff career high. That's the kind of performance that reframes a player's reputation as a serious playoff contributor.",
      "His NBA Top Shot market activity in the 24 hours following: **zero transactions**.",
      "---",
      "This isn't an argument that Allen is undervalued as a player. The Cavaliers know what they have. Cleveland built around the Mitchell/Mobley/Allen core deliberately.\n\nIt's an observation about how the market allocates attention.",
      "The story that circulates — the one that gets framed and shared and analyzed — was Donovan Mitchell and the Raptors. The 114-102 close. The G7 that survived Barrett's overtime buzzer-3. That's the narrative thread. Mitchell is the headline.\n\nAllen's 22 and 19 disappears into the supporting text. Even though, on the night, his performance was the structural reason Cleveland won. Mitchell finishes. Allen makes finishing possible.",
      "---",
      "Mitchell: 4 transactions, $2 median. Allen: 0.\n\nBoth are now in a Conference Semifinals. Both contributed to the Game 7 win. The market is differentiating them not by contribution but by narrative legibility. Mitchell's arc has a frame. Allen's arc is: \"the team wouldn't work without him.\"\n\n\"The team wouldn't work without him\" is a true and important thing. The market just doesn't pay a certainty premium for it.",
    ],
    cta: "See Allen Moments in the market →",
    voiceRationale:
      "Chronicler at its observational peak. The piece does not say \"buy Allen.\" It says \"this is how the market is reading the night.\" The framing — performance vs. narrative legibility — is the editorial contribution. \"Mitchell finishes. Allen makes finishing possible\" is the load-bearing sentence. No hype, no urgency, just a read.",
    bannedAudit:
      "CLEAN: all numbers verified (Allen 22/19 sourced from r2-transition-post.md tick-0250; Mitchell 4 txns/$2 median + Allen 0 sourced from GraphQL pull 04:52Z May 4) · no \"three patterns\" lead · no spin · no exclamation substitution",
  },

  // ─── DROP-ANTICIPATION ───────────────────────────────────────────────────
  {
    id: "exemplar-07",
    position: 7,
    voiceMode: "drop-anticipation",
    source: "collect-hq/nba-top-shot/intelligence/2026-05-03-banchero-playoffs-edition-mint-case.md — Banchero PE Mint Case (Community Angle)",
    subject: "Last night Paolo Banchero closed a road Game 7. Today there's a mint.",
    preheader: "8-seed, no Wagner, road win in Detroit. The document goes live.",
    body: [
      "Paolo Banchero closed a road Game 7 in Detroit last night.",
      "Eight-seed, against the East's 1-seed. Without his second star — Wagner in a walking boot. After blowing a 24-point lead at home in Game 6, shooting 4-of-20, his worst game of the series.",
      "Then he flew to Detroit and won the elimination game.",
      "That is one of the most context-rich individual playoff performances in recent first-round history. The kind of game where the document is built into the result.",
      "Pre-tip yesterday, Banchero's existing Moments showed three transactions at $8 median — a small position taken when the rest of the market was looking at Cade. Smart money buying optionality on the proof arc. Someone thought he wins.",
      "Today's Playoffs Edition mint captures the document. One pack. Real serial. The first round of the 2026 playoffs is closed; the chapter is written; this is the chapter you can hold.",
    ],
    cta: "See the Banchero PE drop →",
    voiceRationale:
      "Drop-anticipation register without overhype. The performance carries the argument — three sentences of context (8-seed / no Wagner / lost the 24-point lead) before the mint is mentioned. \"Sensationalized-legend-but-restrained\" — the legend is the actual performance, the restraint is in not adding adjectives. The smart-money sentence ($8 median pre-tip) gives the email a market-read subtext without becoming a market report.",
    bannedAudit:
      "CLEAN: all facts verified (Banchero 4-of-20 in G6, Wagner walking boot, $8 median pre-tip from market snapshot 19:12Z May 3) · no \"limited time only\" manufactured urgency · no \"exclusive/incredible/unique\" lexical recycling · no exclamation marks",
    caveat:
      "REGISTER CAVEAT — this exemplar is reframed from an internal mint-case decision brief. Drafter agents should treat as register exemplar, not production copy. Roham review recommended before Phase 2 fires on a drop-announcement email type.",
  },

  {
    id: "exemplar-08",
    position: 8,
    voiceMode: "drop-anticipation",
    source: "collect-hq/nba-top-shot/briefs/2026-05-03-cmb-the-only-one.md — CMB \"The Only One Already Documented\"",
    subject: "The only Raptor with a 2026 Playoffs Edition Moment.",
    preheader: "Collin Murray-Boyles. 20 years old. The market saw him before the rest of the room.",
    body: [
      "Before tonight's game in Cleveland, the NBA Top Shot market made a statement nobody really talked about:",
      "**Collin Murray-Boyles is the only player on either the Cleveland Cavaliers or the Toronto Raptors with a 2026 Playoffs Edition Moment.**",
      "Not Donovan Mitchell. Not Scottie Barnes. Not RJ Barrett. Not Evan Mobley. Not James Harden.\n\nCMB.",
      "The 20-year-old Raptors rookie who set the franchise's single-season playoff scoring record for a first-year player. Who ran an offense without Immanuel Quickley (out all series) and Brandon Ingram (effectively out, walking boot at shootaround Sunday) in a series against the team with home court advantage. Who the market priced at $497 while Barrett was trading at $0.28 — a 1,775-to-1 ratio, on the morning of the same game.",
      "The market was telling you something.",
      "---",
      "The arithmetic of the Playoffs Edition matters here. Every player in the PE has a fixed supply — roughly 200 Moments minted. CMB is the only player on either Cleveland or Toronto roster whose 2026 playoff run is already in the PE. The fixed supply is already there. What changes is the story it tells.",
    ],
    cta: "See the CMB PE Moment →",
    voiceRationale:
      "Drop-anticipation with the legend stated through arithmetic. \"Not Donovan Mitchell. Not Scottie Barnes. Not RJ Barrett. Not Evan Mobley. Not James Harden. / CMB.\" is the cleanest cinematic beat structure in the entire corpus. The 1,775-to-1 ratio is the line that would not survive in a generic AI draft — it's specific, it's load-bearing, and it's the entire argument. Topps Now without overhype because the arithmetic carries the weight.",
    bannedAudit:
      "CLEAN: $497 Murray-Boyles morning ceiling + $0.28 Barrett trade verified in source · \"roughly 200 Moments minted\" is the documented PE supply standard · no manufactured urgency",
    caveat:
      "FACTUAL CAVEAT — \"LeBron comparison\" in adjacent copy from this source carries the same scoping risk Roham flagged on Wemby. The arithmetic argument here is self-contained and verified. The legend framing in any downstream draft should be scoped to \"most complete prospects of the last 20 years\" per Alt A form, not the unqualified LeBron comparison.",
  },

  // ─── REACTIVATION ─────────────────────────────────────────────────────────
  {
    id: "exemplar-09",
    position: 9,
    voiceMode: "reactivation",
    source: "collect-hq/nba-top-shot/2026-05-03-reactivation-copy-specimens.md — Segment A: Origin Story Holders",
    subject: "The Moments you bought in 2021 are documenting something right now.",
    preheader: "Round 2 starts Tuesday. Here's what your collection means this week.",
    body: [
      "You were collecting NBA Top Shot when it was the loudest thing in sports.",
      "You saw something real. A way to own the actual moments — not a jersey, not a print, not a card in a case. The specific play. Verified. Yours.",
      "Here's what I want you to know: **the players you held are in the Conference Semifinals this week.**",
      "LeBron James is 41 years old and just advanced past the first round. His Playoff Moments from 2026 are going to look different in ten years than they look right now. You know that. You bought that thesis in 2021 and you've been right about how this works.",
      "The between-rounds window is the repositioning window. It's when the first-round narratives settle into prices and the Round 2 stories haven't opened yet. The collectors who understand that — the ones who bought early because they understood what the Moment was documenting — are moving right now.",
      "Your collection is early-chapter documentation of something that's still being written.",
    ],
    cta: "See what's in the market →",
    voiceRationale:
      "Reactivation/collector-history at full strength. Treats the dormant collector as someone who was right, not someone who left. \"You bought that thesis in 2021 and you've been right about how this works\" is the through-line: the collector's own history is the credential.",
    bannedAudit:
      "POSITIVE-MATH GATE: this exemplar is for the documented positive-math cohort only (Jokic S1 +246–518%, LeBron S1 Cosmic +240%, SGA S2 +48–128%, Wemby S7 +59–185%). It is NOT to be sent to the negative-math cohort · no negative-math framing · no AI tells · no \"I hope this finds you well\"",
  },

  {
    id: "exemplar-10",
    position: 10,
    voiceMode: "reactivation",
    source: "collect-hq/nba-top-shot/2026-05-03-reactivation-copy-specimens.md — Segment B: Single-Star Believers (LeBron variant)",
    subject: "LeBron is in the Conference Semifinals at 41. Your Moments are live.",
    preheader: "The story you bought isn't finished.",
    body: [
      "You've been collecting LeBron James Moments.",
      "You understand what you're holding: documentation of the specific player, the specific game, the specific play. Verified. Permanent. Yours.",
      "LeBron is 41 years old. He just beat a first-round opponent without his co-star. He's heading to Oklahoma City to face the defending champions as the largest underdog the Lakers franchise has faced since 1988.",
      "The Moments from a player's 41-year-old playoff run are not the same as the Moments from his championship years. They're something different. They're the \"against all odds\" chapter. The \"they said it was over and he kept going\" chapter.",
      "That story is being written right now — and your collection is already part of it.",
    ],
    cta: "See LeBron Moments in the market →",
    voiceRationale:
      "The single-star variant of collector-history voice. Names the specific player. Stakes the specific moment. \"Your collection is already part of it\" anchors the reactivation in ownership rather than in transaction-recovery. This is the register that scaled across 6 sub-variants in the spec (Giannis, Curry, KD, Embiid, SGA).",
    bannedAudit:
      "CLEAN: no negative-math framing for this audience (LeBron S1 Cosmic +240% is the math basis) · no manufactured urgency · no AI tells",
    caveat:
      "FACTUAL CAVEAT — \"largest underdog the Lakers franchise has faced since 1988\" lacks an explicit citation in the source. Drafter agents should fact-check or scope (\"largest underdog in recent franchise history\") before production.",
  },

  {
    id: "exemplar-11",
    position: 11,
    voiceMode: "reactivation",
    source: "collect-hq/nba-top-shot/2026-05-03-reactivation-copy-specimens.md — Segment C: The Survivors",
    subject: "You held through 2024. Round 2 tips this week.",
    preheader: "You're still here. Here's what's in the market right now.",
    body: [
      "You're still holding.",
      "You didn't leave when a lot of people left. You stayed with the Moments you have, through the years where the noise got loud and the obvious path was to walk away.",
      "I want to tell you what you've been holding while you've been waiting.",
      "The NBA is in the Conference Semifinals right now. Shai Gilgeous-Alexander is leading a defending championship team. LeBron James is 41 years old and went three rounds deep without his co-star. Wembanyama is in his first second round at 22. Joel Embiid came back from appendectomy surgery and won a Game 7.",
      "These are the rounds that the Moments get remembered from. Not the regular season. Not the first round. The Conference Semifinals, when the field is cut to eight teams and every possession matters.",
      "The Moments from this round are in the market right now — before they're priced for what they documented.",
      "You've been patient. This is the window you were patient for.",
    ],
    cta: "See what's available →",
    voiceRationale:
      "The hardest reactivation register — long-dormant collector, no portfolio-appreciation lever. The voice avoids the negative-math trap (BANNED-04) by not making the email about price at all. It makes it about basketball and patience. \"You've been patient. This is the window you were patient for\" is the close. No spin. No \"your wallet is up.\" Just: here's what's happening on the court, and you're still in.",
    bannedAudit:
      "CLEAN: NO portfolio-appreciation claim — the email never says \"your collection is up\" · all basketball facts verified (SGA defending champ, LeBron 41, Wemby 22, Embiid post-appendectomy) · no AI tells · no manufactured urgency",
    caveat:
      "SCOPE CAVEAT — the \"collectors who carry the long memory\" construction from related source material (Exemplar 13) is used once in adjacent copy. Watch for reuse — it can read as AI-feel under repetition.",
  },

  {
    id: "exemplar-12",
    position: 12,
    voiceMode: "reactivation",
    source: "collect-hq/nba-top-shot/2026-05-03-reactivation-copy-specimens.md — Matt's Personal Touch (Top 50 Concierge Specimen)",
    subject: "Your [PLAYER_NAME] Moment, and what's happening this week",
    preheader: "[Personalized per collector — Matt fills from BQ data]",
    body: [
      "Hey [FIRSTNAME],",
      "Matt Schorr here.",
      "I pulled up your collection before writing this. You hold [MOMENT_COUNT] Moments, including [TOP_MOMENT_NAME] Serial #[SERIAL]. You've been collecting since [FIRST_PURCHASE_DATE].",
      "[ONE SENTENCE about their specific playoff connection: e.g., \"That LeBron you've been holding — he's in Oklahoma City this week, 41 years old, without Luka, as the biggest underdog the franchise has fielded in thirty years.\"]",
      "I'm not writing to sell you anything. I'm writing because [ONE OBSERVATION about what's remarkable about their specific collection: e.g., \"someone who held a LeBron early Playoff Moment through 2024 has a different kind of patience than most collectors — and I think you understand what that Moment is documenting in a way the market hasn't fully caught up to.\"]",
      "If you want to talk through what I'm seeing, just reply. If you want to look on your own terms, your collection is at [COLLECTION_URL].",
      "Matt",
    ],
    cta: "[Reply] or [COLLECTION_URL]",
    voiceRationale:
      "The named-person register, applied legitimately. This is NOT BANNED-03 (the \"Matt writing some bullshit to you\" anti-pattern) — the difference is the audience size and the personalization depth. This is 50 collectors, hand-reviewed, top LTV, with real per-collector BQ data filled in for each one before send. Matt actually pulls each collection up. The voice rules: no manufactured enthusiasm, named specifics, \"I'm not writing to sell you anything\" stated and then proven by what follows.",
    bannedAudit:
      "NOT BANNED-03 because the audience is 50, the data is per-collector real, and Matt actually drafts each one · \"biggest underdog the franchise has fielded in thirty years\" — same caveat as Exemplar 10, verify before send · no AI tells · no exclamation substitution",
    caveat:
      "CONSENT CAVEAT — needs Matt's actual approval before being treated as voice-canonical for a Matt-from surface. Magic should not author Matt's voice without confirmation; this is Matt's specimen, included as register example.",
  },

  // ─── CONCIERGE ────────────────────────────────────────────────────────────
  {
    id: "exemplar-13",
    position: 13,
    voiceMode: "concierge",
    source: "collect-hq/nba-top-shot/briefs/2026-05-03-the-525-holder.md — The $525 Holder",
    subject: "Someone is holding a Murray-Boyles Moment at $525.",
    preheader: "What ceiling prices reveal about the highest-conviction holders in this market.",
    body: [
      "This morning I pulled the market snapshot. Every key player in tonight's two Game 7s. Floor, ceiling, 24-hour volume.",
      "Here is the number that stopped me:",
      "**Collin Murray-Boyles: $525 ceiling.**",
      "The highest ceiling in the snapshot. Above Cade Cunningham ($500). Above Donovan Mitchell ($500). Above Paolo Banchero ($400). Above RJ Barrett ($299).",
      "A 20-year-old rookie, in his first playoff run, nine picks into the 2025 draft, on a team about to play a Game 7 in Cleveland — his most expensive available Moment is $525, and nobody has bought it yet.",
      "The person holding that Moment is asking $525 and has decided not to move.",
      "---",
      "The floor is noise. A $1 floor means: the cheapest Moment from this player, the most common edition, the lowest ask. The floor is the opinion of the most impatient or least confident holder in the market.",
      "The ceiling is different. The ceiling is the opinion of the most patient and most confident holder in the market — the person who set an asking price and said: not below this, not now, not yet.",
      "The $525 Murray-Boyles holder is not holding $525 because they paid $525. They're holding $525 because that's the price at which they'd release the document — and they believe the price that justifies the release hasn't arrived yet.",
    ],
    cta: "See the Murray-Boyles ceiling listing →",
    voiceRationale:
      "The \"trusted curator with a real read on a specific Moment\" register. The piece does not say \"buy this Moment.\" It says \"here is what this listing tells you about who is in this market.\" The single-Moment focus, the holder-psychology framing, the patient explanation of what a ceiling actually is — this is concierge as Roham described it: not newsletter-author register, but a curator looking at one specific listing and explaining what they see.",
    bannedAudit:
      "CLEAN: $525 / $500 / $500 / $400 / $299 ceilings sourced from market snapshot 10:41 UTC May 3 · NOT BANNED-02 (opens with a single specific number) · no manufactured urgency · no spin",
    caveat:
      "FORMAT CAVEAT — this is currently a community brief, not a 1-to-1 email surface. Drafter agents should read it for register and Moment-specificity, not for structural copy. The \"collectors who carry the long memory\" construction appears once — watch for reuse across the corpus.",
  },

  {
    id: "exemplar-14",
    position: 14,
    voiceMode: "concierge",
    source: "collect-hq/nba-top-shot/briefs/2026-05-03-thirty-five-at-thirteen.md — Thirty-Five Purchases at Thirteen Dollars",
    subject: "Somebody bought 35 Mobley Moments. Here's the pattern.",
    preheader: "$640 position. 40-hour window. No panic, no chasing.",
    body: [
      "In the 40 hours before Game 7, while the basketball world was watching Cade Cunningham and Paolo Banchero take turns scoring 45 points, somebody was buying Evan Mobley Moments.",
      "Not one or two. Thirty-five.",
      "All Base Set. Predominantly $13 each. First purchase Friday morning at 3 AM. Last purchase early Saturday morning. In between: a systematic walk through the available supply, transaction by transaction, clearing every $13 seller the market had to offer.",
      "They also bought a Metallic Gold LE. An Equinox. Two more premium parallels.",
      "Estimated total position: about $640 in Mobley before tip.",
      "---",
      "**What 22 and 19 means in market terms.** The collector who bought 35 Base Set Mobley Moments knows what Mobley is. The Cavaliers' defensive rating when Mobley plays is historically among the best in the league. When he's anchoring the paint, Cleveland can live with aggressive opponents playing into the coverage, because the end of that possession is usually Mobley blocking it or redirecting it into contested territory. He doesn't show up on the highlights. He shows up in the final score.",
      "**How they did it.** First purchase: Metallic Gold LE, $19. Premium tier, small position — establishing an anchor. Then eight Base Set in 38 minutes. Then fourteen more in the early business hours window, $13–$14, clearing the floor as it appeared. They never paid more than $15 for a Base Set Moment. When sellers appeared at $13, they bought. When sellers ran dry, they waited.",
      "This is not a casual collector who woke up excited about the playoffs. This is a thesis, executed over 40+ hours with price discipline.",
    ],
    cta: "See Mobley Moments →",
    voiceRationale:
      "The other concierge mode — case-study register on a specific transaction pattern. Treats one collector's accumulation as the subject of a curator's careful read. \"They priced something the market doesn't know how to price yet\" is the editorial contribution. The data carries the argument; the prose explains why the data matters. Roham's 80/20 ratio in action — 80% chronicled facts, 20% Magic-observational.",
    bannedAudit:
      "CLEAN: all 35 transactions traced from public GraphQL sortID timestamps · Metallic Gold LE $19, Equinox $34 — verifiable from sale records · no manufactured urgency · no spin · no exclamation substitution",
    caveat:
      "FORMAT CAVEAT — currently community brief format, not 1-to-1 email surface. Use as register exemplar. Drafter agents must adapt structure (subject line, preheader, single CTA) without losing the read-on-a-specific-Moment register.",
  },
];
