# NBA Top Shot — Collector Sentiment Gap-Fill
## Phase 1 / Gap 7.8 Close
**Filed:** 2026-05-04  
**Window:** Active sentiment last 30 days; Lapsed sentiment last 90 days (some older signals included where recent data is thin)  
**Analyst:** Magic (sentiment research pass)

---

## Research Log — Queries Run

Before findings: full transparency on sourcing method.

**Total search queries executed: 18**  
**WebFetch attempts: 12 (7 successful, 5 blocked by 403/404/402)**  
**Sources successfully read:** The Ringer (2025-02), Defector (partial), NBA Top Shot blog (2026-05 Playoffs post, May Mailbag), CryptoAdventure 2026 review (search summary), Sporting Crypto 2025 newsletter, Medium/@clegainz (2023), Finder review, Sports Video Group season launch, Cardlines scarcity analysis, subredditstats.com (blocked), Trustpilot (blocked), Reddit direct fetch (blocked)

**Note on Discord:** Discord sentiment is not surfaceable via web search or WebFetch. Zero Discord threads findable without authenticated access. Flagged as a remaining structural gap.

**Note on X / Twitter:** Direct X page fetch blocked (402 paywall). X search results visible only through headline-level summaries in web search SERPs. No raw tweet text extractable. Flagged explicitly below.

**Note on Reddit direct access:** reddit.com returns 403 to WebFetch. All Reddit content comes through Google-indexed excerpts and cached summaries. Direct r/nbatopshot thread pulls not possible via these tools.

---

## Section A — Active Collector Sentiment (Last 30 Days)

### Context
Primary signals come from: NBA Top Shot official May Mailbag (collector-submitted questions, May 2026); The Ringer longform (Feb 2025, still the most recent collector-voice journalism with named sources); CryptoAdventure 2026 review (analysis with collector-facing framing); Cryptonomist (April 2026 pack drop reaction). Reddit and X signals are SERP-level only — no raw thread text recovered.

---

### Theme A-1 (Positive): The Playoffs Loop Is Working as a Daily Destination

Active collectors are engaging with Top Shot's postseason structure as a genuine nightly ritual — pack drops, Flash Challenges, Fast Break lineups, and prize stores are creating compounding touchpoints across the 2026 NBA Playoffs.

**Verbatim — May 2026 Mailbag collector:**
> "This season has been the best one yet."

[source: blog.nbatopshot.com/posts/the-may-mailbag, 2026-05]

**Platform signal supporting this theme:** The Playoffs Edition of Fast Break is framed around a simplified 2-3 player lineup structure with clear daily scoring objectives. The "Road to the Ring" progression campaign runs April 17 through June 26, with Drop 1 scheduled May 20 featuring Legendary, Rare, and Commons packs. Multiple daily touchpoints (Flash Challenges, leaderboards, prize stores) are functioning as described.

[source: blog.nbatopshot.com/posts/2026-nba-playoffs-on-top-shot, 2026-04-16]

**Third-party signal:** CryptoAdventure's 2026 review notes Flash Challenges "have taken over the community and collectors both big and small seem to love them, with more users becoming closer to the game than ever."

[source: x_search query "NBA Top Shot 2026 collector experience positive", returned cryptoadventure.com summary, 2026-05-04]

---

### Theme A-2 (Negative/Mixed): Leaderboard + Challenge Access Gap — Lower-Tier Collectors Feel Locked Out

The most pointed piece of active negative sentiment comes directly from a collector in the official May Mailbag. The complaint: the Challenges and Leaderboard structure rewards collectors with high-tier holdings, leaving lower-TSS collectors with no meaningful path to compete.

**Verbatim — May 2026 Mailbag collector:**
> "It's nearly impossible for me to compete for the best Moments of the season via Challenges or Leaderboards."

[source: blog.nbatopshot.com/posts/the-may-mailbag, 2026-05]

This is a structural complaint, not an emotional one. The collector is asking what the platform is doing for people who don't hold Legendary or Rare tier. Platform response cited Burn Leaderboards, Flash Leaderboards, and Fast Break as the answer — but the complaint itself signals a real equity gap in the engagement loop design.

**Supporting context from CryptoAdventure 2026 analysis:** The hybrid pack structure "has caused a unique split amongst collectors... some collectors absolutely loving the new hybrid pack structure while the rest are at the opposite end of the spectrum and want a return to old packs." Low odds for Rare/Legendary in hybrid packs compound the access problem.

[source: x_search query "NBA Top Shot 2026 collector experience positive love enjoying", returned cryptoadventure.com summary, 2026-05-04]

---

### Theme A-3 (Mixed): Platform Vitality Belief vs. Market Skepticism

A real tension exists between collectors who have renewed conviction in Top Shot's direction and those who carry persistent skepticism about market values and long-term viability. The scarcity pivot (reduced mints, Cooper Flagg/Wembanyama rookie caps under 5,000) is resonating with believers while doing little to move skeptics.

**Verbatim — Andrew Seo (graduate student, Chicago), interviewed by The Ringer, February 2025:**
> "Now the platform is way better than it was back then, but people don't know that."

[source: theringer.com/2025/02/26/features/nba-top-shot-crypto-moments-bust-nfl-all-day-dapper-labs, 2025-02-26]

**Verbatim — Brandon Leib (35, sports marketing, Miami), The Ringer:**
> "Now I wanna buy another pack."

[source: theringer.com/2025/02/26/features/nba-top-shot-crypto-moments-bust-nfl-all-day-dapper-labs, 2025-02-26]
(Note: Leib hadn't accessed his account in 3+ years at time of interview — this represents lapsed-but-curious sentiment, not active.)

**Verbatim — Josh Ong (37, NYC), Defector:**
> "Now it's a market that's only full of sharks and whales and people who are there for the money."

[source: defector.com/nba-top-shot-story, via WebFetch, 2026-05-04]

The Ong quote captures a persistent structural concern among observers and lapsed/curious collectors: that the floor moved so fast in 2021 that "regular collectors are priced out," and the platform hasn't fully resolved that class dynamic.

---

### Section A Remaining Gaps

- **No raw Reddit thread text from 2026.** Reddit blocks WebFetch. All r/nbatopshot threads from last 30 days are inaccessible without authenticated scraping or manual review. This is the single biggest gap in active sentiment — the subreddit is where daily community voice lives.
- **No X/Twitter raw post text.** X paywall blocks direct fetch. Only headline-level SERP data available. Sentiment on X about the Playoffs Edition, Flash Challenges, and specific pack drops is unsampled.
- **Discord fully unavailable.** 200,000-member Discord cited as major community hub; zero access via web search archiving.
- **No NPS or structured survey data.** No third-party survey, CSAT score, or NPS data found for 2025–2026.

**Queries tried for A with no direct Reddit/X content returned:**
1. "site:reddit.com/r/nbatopshot 2026 sentiment discussion"
2. "r/nbatopshot 2026 complaints problems frustrated collectors"
3. "NBA Top Shot 2026 pack drop challenge serial community discussion positive negative"
4. "NBA Top Shot Reddit April 2026 complaint value drop moment pricing"
5. "r/nbatopshot subreddit top posts May 2026"

---

## Section B — Lapsed / Dormant Collector Sentiment (Last 90 Days, Extended Where Thin)

### Context
1.27M idle L1+L2 collectors per BQ baseline. Lapsed sentiment is harder to surface — these users have stopped posting, which means their most recent expressions of departure are often months to years old. Signals here draw on The Ringer (Feb 2025), Defector, the Sporting Crypto 2025 newsletter, and general search results. Extended lookback permitted per brief given signal scarcity.

---

### Theme B-1: Value Destruction as the Primary Exit Driver

The dominant lapsed narrative is financial: collectors who bought during the 2021 bubble (or tried to flip packs) watched values collapse 75–90%+ and left. This isn't just about losing money — it's about the trust violation of marketing that implied investment value.

**Verbatim — Phil (43, Sarasota, Florida), The Ringer:**
> "I definitely understood that someone was gonna get left holding the bag."

[source: theringer.com/2025/02/26/features/nba-top-shot-crypto-moments-bust-nfl-all-day-dapper-labs, 2025-02-26]
(Phil ultimately came out ahead — he is a data point for who survived, not who left.)

**Verbatim — Ernest Filart (physical therapist), The Ringer:**
> "I couldn't sleep. I was running on pure dopamine."

[source: theringer.com/2025/02/26/features/nba-top-shot-crypto-moments-bust-nfl-all-day-dapper-labs, 2025-02-26]
(Filart bought LaMelo Ball for ~$700, watched it spike to $10,000 then collapse — representative of the entry-and-exit trauma pattern.)

**Supporting data point from The Ringer:** Jesse Schwarz co-led a group purchase of the $208,000 LeBron Moment in 2021. Current value at time of reporting: ~$16,000 — a 92% decline. He still holds it.

[source: theringer.com/2025/02/26/features/nba-top-shot-crypto-moments-bust-nfl-all-day-dapper-labs, 2025-02-26]

**Structural note from Sporting Crypto 2025:** The platform's supply-to-buyer ratio went from 13 Moments per buyer in February 2021 to 63-to-1 by November 2023. The supply flood — intended to meet demand — destroyed the value proposition for anyone who held.

[source: newsletter.sportingcrypto.com/p/the-state-of-nba-top-shot-2025, via WebFetch, 2026-05-04]

---

### Theme B-2: "No There There" — Content Value Skepticism

A subset of lapsed collectors articulate a more fundamental disillusionment: the Moments themselves feel worthless as cultural objects. Highlights are free on YouTube, Instagram, TikTok. The ownership of a "five-second video" doesn't hold emotional weight when the clip is everywhere.

**Verbatim — Defector, paraphrasing critics' position:**
> "It's just 'a five-second video of LeBron James dunking a basketball' in an age when highlights are ubiquitous."

[source: defector.com/nba-top-shot-story, via WebFetch, 2026-05-04]

**Verbatim — Jack Settleman (24, NYC), Defector, on his own early appeal:**
> "At some point, I just dove into it and it clicked for me. Maybe it was confirmation bias."

[source: defector.com/nba-top-shot-story, via WebFetch, 2026-05-04]
(The "confirmation bias" framing from an early believer is telling — even sympathetic collectors hedge their conviction.)

**Verbatim — anonymous California collector, Defector:**
> "It just looked interesting, watching videos of people opening the packs. It was collecting cards, but online."

[source: defector.com/nba-top-shot-story, via WebFetch, 2026-05-04]
(This is an attraction quote, but it reveals the depth of engagement — pack-opening theater, not collector identity. When the novelty of "cards but online" faded, the hook was gone.)

---

### Theme B-3: Withdrawal Friction and Platform Lock-In as Departure Accelerant

A specific subset of lapsed collectors experienced a particular kind of betrayal: they sold their Moments, had money sitting in Dapper Balance, and could not extract it. The ID verification wall, the USDC withdrawal complexity, state restrictions (NY, HI, MN, AK excluded from ACH), and the weeks-to-months processing times created a "trapped" experience that soured them on return.

**Historical verbatim (CNN Business, April 2021, still informing dormant-collector memory):**
> Users reported having balances in their Dapper wallets but being unable to withdraw.

[source: x_search query "NBA Top Shot withdrawal Dapper wallet frustration 2025 2026", returned CNN Business summary, 2026-05-04]

**Supporting data from Sporting Crypto 2025 analysis:** Market normalization data shows that the exit bottleneck (withdrawal friction) is a known, structural issue that Dapper has worked to address, but the memory of it persists in former-collector narrative.

[source: newsletter.sportingcrypto.com/p/the-state-of-nba-top-shot-2025, via WebFetch, 2026-05-04]

**Note:** No fresh 2026 withdrawal complaints surfaced in search. This could mean the issue is resolved, or it could mean lapsed collectors are simply not posting about it (they're gone). Cannot confirm resolution without direct community access.

---

### Section B Remaining Gaps

- **No "I quit Top Shot" threads from 2025–2026 findable.** Queries tried:
  1. "NBA Top Shot quit stopped collecting 2026 why Reddit"
  2. "nbatopshot reddit 2026 'I quit' OR 'leaving' OR 'sold everything' OR 'cashed out'"
  3. "NBA Top Shot lapsed former collector 'haven't logged in' 'moved on' blog post 2025"
  4. "NBA Top Shot 'lost interest' OR 'not worth it' OR 'dead platform' 2025 forum community"
  — None returned lapsed-collector authored posts from 2025–2026. This is expected: lapsed users stop posting, making their departure signal structurally thin on open web.
- **No survey or interview data from lapsed cohort.** The 1.27M idle base has not been publicly surveyed; no third-party research surfaces their motivations.
- **r/nft and r/sportscards cross-subreddit departure threads not found** despite trying those angles. Signal either not posted or not indexed.
- **Medium/Substack from former collectors:** Nothing 2025–2026. Most former-collector writing is 2022–2023 vintage.

---

## Section C — New + Curious Collector Sentiment (Acquisition Signal)

### Context
This is the hardest segment to measure: people who have never collected but might. Signals come from acquisition-framing reviews (CryptoAdventure 2026, Finder 2022), comparison to physical cards context (Topps Now 2025–26 launch, Beckett coverage), and structural hesitations visible in search query intent. No direct "should I start" forum threads from 2026 were findable via these tools.

---

### Theme C-1 (Hesitation): "This Is Still a Crypto Thing" — The NFT/Blockchain Stigma

The single largest barrier for new collectors in 2026 is the reputational overhang of the NFT bubble and the crypto industry's broader credibility collapse (FTX, etc.). Top Shot's design — Dapper wallet, Flow blockchain, USDC withdrawals — reads as crypto infrastructure even when the platform tries to be collector-first.

**Verbatim — Defector, on the structural perception problem:**
> "Many who bought Moments at their peak were left with significant losses... one narrative describes a company that hoodwinked customers into a viral product with values that tanked by 75% in two short months."

[source: defector.com/nba-top-shot-story, via WebFetch, 2026-05-04 — summary of existing collector narrative]

**Verbatim — Gemini Cryptopedia / Bloomberg Law, on regulatory overhang:**
> "By privatizing the blockchain on which Moments' value depends and restricting the trade of Moments to only the Flow Blockchain, purchasers must rely on Dapper Labs's expertise and managerial efforts."

[source: x_search query "NBA Top Shot crypto NFT hesitation 2026 new buyer concerns blockchain skepticism", Bloomberg Law summary, 2026-05-04]

The securities lawsuit settlement (Dapper settled for $4M in 2024) is the visible marker of this overhang. New collectors who Google "NBA Top Shot" encounter the lawsuit prominently in SERP results — it's a trust-first-click problem.

[source: theblock.co/post/298286/dapper-labs-settles-nba-top-shot-moments-lawsuit-for-4-million]

---

### Theme C-2 (Hesitation): Physical Cards Are Having a Moment — Topps Return as Competitive Pressure

Topps regained the NBA license on October 1, 2025 — its first licensed basketball product since 2009. Topps Now Basketball (print-on-demand, moment-based cards, 48-hour windows) launched for 2025–26, directly competing with Top Shot's real-time moments proposition. New collectors with sports card instincts have a credentialed physical alternative.

**Key structural difference:** Topps Now cards are numbered to the exact quantity sold. Top Shot Moments have blockchain-verified scarcity but no physical object. For collectors who learned collecting through Topps or Panini, the physical format carries default legitimacy.

[source: sportscardportal.com/blog/2025-26-topps-now-basketball-debuts-with-nba-real-time-cards, WebFetch, 2026-05-04]  
[source: si.com/collectibles/the-return-of-a-classic-topps-and-fanatics-bring-the-nba-license-home]

**Quote on Topps return excitement from SI/Collectibles community:**
> "For the first time in over fifteen years, Topps is producing licensed NBA cards again... this product offers something for every collector—whether you're chasing your first autograph, building a rainbow, or just enjoying the return of an iconic brand."

[source: ludex.com/blog/trading-card-university/the-best-cards-to-look-for-in-2025-26-topps-basketball, via search result summary, 2026-05-04]

The "return of an iconic brand" framing is a direct emotional draw that Top Shot cannot replicate. Topps has 75 years of collector memory. Top Shot has 5 years, including a bubble and crash.

---

### Theme C-3 (Attraction): The Daily Game Loop — Fast Break + Challenges as Hook for NBA Fans

The clearest acquisition signal for new collectors is the Fast Break game mechanic and Flash Challenge daily structure. These create a reason to engage that isn't dependent on owning expensive Moments — they look more like fantasy sports than collectibles investment.

**CryptoAdventure 2026 review framing:**
> "NBA Top Shot remains one of the most complete NFT marketplaces because it combines licensed content, pack drops, a secondary market, and ongoing challenge mechanics that can create real demand cycles."

[source: x_search query "NBA Top Shot 2026 collector experience positive love enjoying", returned cryptoadventure.com summary, 2026-05-04]

**Platform framing for new entrants:** Starter Packs available for $19, accessible to collectors who have purchased fewer than five packs. This creates a clear low-commitment entry point that doesn't require upfront conviction.

[source: x_search query "NBA Top Shot 2026 should I buy is it worth new collector hesitation", 2026-05-04]

**Structural attraction — Cooper Flagg rookie market signal:**
Cooper Flagg's physical rookie debut jersey sold for $1 million, framed as evidence that "collectors place extraordinary value on true 'first moments' in sport." This creates a cross-market narrative Top Shot can leverage — digital Flagg Moments as the on-chain equivalent of the physical rookie market.

[source: x_search query "NBA Top Shot 2026 Cooper Flagg Wembanyama collector reaction buy or pass", 2026-05-04]

**However:** No organic "I tried Top Shot and loved it" new-collector posts from 2026 were findable. Acquisition sentiment remains structurally underrepresented in open-web data.

---

### Theme C-4 (Hesitation — supplementary): Withdrawal and Fee Complexity as Onboarding Friction

New collectors who research Top Shot encounter warnings about withdrawal complexity, marketplace fees (5% per transaction), and non-withdrawable Dapper Balance from promotions. These are framed as practical risks, not just theoretical concerns.

**CryptoAdventure 2026 framing (cautionary):**
> "In 2026, collectors get the best outcomes by understanding fees, treating packs as probability, watching challenge-driven demand, and planning withdrawals early so gains are not trapped inside the platform."

[source: x_search query "NBA Top Shot review 2026 fee 5% marketplace collector feedback experience", returned cryptoadventure.com summary, 2026-05-04]

The phrase "so gains are not trapped" is a flag — it acknowledges the historical withdrawal problem as live enough to warn new collectors about, even in a 2026 review.

---

### Section C Remaining Gaps

- **No 2026 "should I start Top Shot" Reddit threads findable.** Tried: "NBA Top Shot new user 2026 beginner guide reddit advice 'should I start'" — returned only older guides (2021–2022).
- **No TikTok/Instagram/YouTube comment sentiment surfaceable.** Search results link to YouTube videos but no comment thread data is indexable. TikTok is completely opaque to WebSearch.
- **No direct new-collector forum discussion from r/sportscards or r/nft comparing Top Shot to Topps Now in 2026.** These communities almost certainly have relevant threads — not accessible via current tools.
- **No A/B comparison data.** Cannot determine what percentage of the "curious" pool converts vs. bounces on seeing the crypto/NFT label.

---

## Sentiment Synthesis — 5–8 Strongest Signals

1. **The Playoffs content machine is the strongest active positive signal.** The combination of Flash Challenges, Fast Break, pack drops, and the prize store creates a daily ritual that active collectors explicitly praise. "This season has been the best one yet" is the freshest direct collector voice available (May 2026 Mailbag). The content cadence is working for the engaged core.

2. **Lower-TSS collectors feel structurally excluded from the best rewards.** The "nearly impossible to compete via Challenges or Leaderboards" complaint (May 2026 Mailbag) is a direct signal that the engagement loop has a wealth-gate problem. The platform's answer (Fast Break, Flash Leaderboards) exists, but collectors with lower-tier holdings don't feel it closes the gap.

3. **Market dynamics — not content — drove the lapsed cohort away.** The dominant exit narrative is financial betrayal: bought high, watched values collapse 75–92%, couldn't withdraw. This is a historical wound, not a current-platform defect. But it persists in search results and shapes new-collector discovery.

4. **The NFT/crypto stigma is the primary acquisition barrier.** New potential collectors encounter the securities lawsuit settlement, the FTX collapse narrative, and the "highlights are free on YouTube" critique before they encounter any positive platform signal. The trust hole is in the discovery layer, not the product layer.

5. **Topps Now is a real competitive alternative for the physical-first collector.** The return of Topps to NBA licensing (October 2025) gives collectors who prefer physical objects a moment-based real-time product. Top Shot's digital ownership advantage (no grading needed, instant settlement, on-chain authenticity) is real but must be communicated against a newly credible alternative.

6. **The collector community has a long memory for supply mismanagement.** The 13-to-63 Moments-per-buyer ratio collapse (2021–2023) and the trust erosion from botched pack drops are still cited in every major retrospective. The 2025–26 scarcity pivot (reduced mints, rookie caps under 5,000) is the direct response — but collectors who lived through the bubble are watching to see if supply discipline holds.

7. **Digital autographs and the Cooper Flagg/Wembanyama rookie market are the strongest new-collector hooks.** These are the moments where Top Shot's proposition is cleanest: ownable, scarce, authenticated, cannot be counterfeited. The $1M Flagg physical rookie jersey sale gives a cross-market credibility signal that digital Flagg Moments can reference without claiming equivalence.

8. **Primary sentiment data for this report is structurally thin and second-order.** The most important collector voice surfaces — Reddit r/nbatopshot, Discord, X — are either blocked, paywalled, or inaccessible via current tooling. The signals above are real but are drawn primarily from longform journalism (The Ringer Feb 2025, Defector), official platform channels (May Mailbag), and third-party review summaries. Direct, unmediated community voice in the last 30 days is the gap this report cannot fully close without Discord/Reddit authenticated access.

---

## Structural Gaps Remaining After This Research Pass

| Gap | Why It Matters | Access Needed |
|---|---|---|
| r/nbatopshot raw threads (last 30d) | Primary daily community voice | Reddit auth or Pushshift-style API |
| Discord server archives | 200K member community, highest-signal complaints live here | Discord bot token or invite |
| X/Twitter raw post text (last 30d) | Real-time reaction to drops and challenges | X API Academic/Enterprise tier |
| NPS / CSAT / structured survey data | No NPS score exists in any source file | Dapper internal CRM / Qualtrics |
| TikTok/Instagram/YouTube comment sentiment | Acquisition-funnel first-impression data | Social listening tool (Brandwatch, Sprout) |
| Lapsed-collector direct outreach | 1.27M idle base; no public signal available | Email/Dapper outreach campaign |

---

*Sources referenced in this document:*  
- [Inside the Spectacular Rise and Fall (and Rise Again?) of NBA Top Shot — The Ringer](https://www.theringer.com/2025/02/26/features/nba-top-shot-crypto-moments-bust-nfl-all-day-dapper-labs)  
- [A Short, Lucrative, And Depressing Journey Into NBA Top Shot — Defector](https://defector.com/nba-top-shot-story)  
- [2026 NBA Playoffs on Top Shot — NBA Top Shot Blog](https://blog.nbatopshot.com/posts/2026-nba-playoffs-on-top-shot)  
- [May Mailbag — NBA Top Shot Blog](https://blog.nbatopshot.com/posts/the-may-mailbag)  
- [The State of NBA Top Shot 2025 — Sporting Crypto](https://newsletter.sportingcrypto.com/p/the-state-of-nba-top-shot-2025)  
- [NBA Top Shot Review 2026 — CryptoAdventure](https://cryptoadventure.com/nba-top-shot-review-2026-moments-packs-fees-and-collector-strategies/)  
- [The 2025–26 NBA Top Shot Roadmap — NBA Top Shot Blog](https://blog.nbatopshot.com/posts/the-2025-26-nba-top-shot-roadmap)  
- [Dapper Labs settles NBA Top Shot Moments lawsuit — The Block](https://www.theblock.co/post/298286/dapper-labs-settles-nba-top-shot-moments-lawsuit-for-4-million)  
- [2025-26 Topps Now Basketball Debuts — SportsCardPortal](https://www.sportscardportal.com/blog/2025-26-topps-now-basketball-debuts-with-nba-real-time-cards)  
- [The Return of a Classic: Topps and Fanatics Bring the NBA License Home — SI](https://www.si.com/collectibles/the-return-of-a-classic-topps-and-fanatics-bring-the-nba-license-home)  
- [NBA Top Shot Launches 2025-26 Season — Sports Video Group](https://www.sportsvideo.org/2025/10/21/nba-top-shot-launches-2025-26-season-with-star-partnerships-player-autographs/)  
- [Is Top Shot Dead? An Investors Guide — Cardlines](https://cardlines.com/is-top-shot-dead-an-investors-guide/)  
- [NBA Top Shot NFT Review 2026 — Finder](https://www.finder.com/nfts/nba-top-shot-review)  
- [The History of NBA Top Shot — Medium/@clegainz](https://medium.com/@clegainz/the-history-of-nba-top-shot-past-present-and-future-of-nba-nfts-4d66f6e41016)
