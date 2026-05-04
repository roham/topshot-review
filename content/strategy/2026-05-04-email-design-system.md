# NBA Top Shot Email Design System — 7 Distinct Templates
## v1004 — response to Roham's "templates need to sing together but be individually unique"

**Status:** design spec, paired with `/home/agent/topshot-review/components/cards/templates.tsx` skeleton.
**Date:** 2026-05-04
**Author:** Magic (Show Runner + Email Design System Architect)

---

## Premise

Roham reviewed v1003 and rejected the single-shell approach (`UpgradeCard.tsx`'s `EmailRender` used for all 7 cards × 4 variants). His core complaint, paraphrased across four card-level reviews:

> "We can't reuse the exact same template table in every email. Tables look like a spreadsheet. We need a design system of different kinds of emails and tables and frames. They need to sing together but also be individually unique."

So: 7 templates, one per email type. Each has its own visual silhouette — recognizable from a thumbnail. Within each template, three frames (Almanac / Cinematic / Brief) overlay variant-specific styling. The frame is voice; the template is structure.

The current shell renders every email as: brand-header → hero image → callout grid → body paragraphs → CTA button → footer. That structure is fine for a press release but wrong for almost every actual email type. A pack-arrival email should not look like a portfolio dashboard. A Fast Break recap should not look like a marketing email. A whale concierge note should not look like a newsletter.

This spec defines what each of the 7 looks like instead.

---

## Sing-together rules (the brand spine)

These hold across all 7 templates so the stack reads as one brand:

1. **Brand header** — identical black bar with NBA Top Shot wordmark across all templates. This is the only fully-shared chrome element.
2. **Typography family** — same two fonts: display (geometric sans) for headlines, mono for callout values and serial numbers. Body is a humanist sans.
3. **Footer** — identical compliance footer (logo, address, privacy/terms/unsubscribe).
4. **Color palette** — same four-color swatch available to every template:
   - **Flame** (`#E9461B`) — primary accent, CTA button background, "live now" indicators
   - **Mint** — secondary accent, "after"/positive states
   - **Amber** — Liquid-mode tags, market-data callouts
   - **Ink** — neutral grayscale spine
   Each template *leads* with one color and uses the others as supporting tones. The leading color is what gives a thumbnail its identifiable hue.
5. **Customer-data treatment** — when collector identity surfaces (avatar, tier badge, Moments owned, since-date), the visual treatment is identical: 28px circular gradient avatar, small mono caption with a `·` separator. This makes the personalization legible across the whole stack without making every email look the same.
6. **Liquid-mode rendering** — the dual-pane (rendered + Liquid template) review surface is identical infrastructure for every template; it lives outside the template itself, so the review apparatus doesn't homogenize the visual.

---

## Don't-look-the-same rules (the differentiation spine)

Every template must score on at least three of the following four axes differently from every other template:

1. **Layout silhouette** — what's at top, middle, bottom. (Hero-first vs. callouts-first vs. headline-first vs. tape-feed vs. scoreboard.)
2. **Asset rhythm** — full-bleed hero, framed thumbnail, infographic data card, no image, asset grid.
3. **Information density** — narrative paragraph register, sparse-cinematic register, data-callout register, scoreboard register, social-proof register.
4. **CTA shape** — full-width primary button, ghost/text link, dual CTA (primary + secondary), inline contextual link, scoreboard-style claim row.

A template that is "centered hero + flame button + 4 callouts + 3 paragraphs" can only exist *once* in the stack. The other six templates each need different combinations.

---

## The 7 templates

### 1. Welcome / Onboarding
**Card ID:** `welcome-onboarding` · **Template ID:** `welcome`

**a. Visual identity**
- **Layout silhouette:** Vertical journey — tall hero illustration at the top (full-bleed, ~3:2), then a *stepped definition block* ("what is this thing"), then a free-pack callout card, then two choose-your-path cards (Playoffs / Drops). Footer is welcome-specific (links to Discord + the Show + Top Shot Live).
- **Color treatment:** **Flame leads** as the warm-welcome accent, mint supports for the "your free pack is loaded" pill, ink is the spine. This is the warmest template in the stack — first impression has to feel inviting.
- **Typography rhythm:** Big display headline (`Welcome to NBA Top Shot.` — 28pt+), then a single high-weight definition line ("Every Moment is a play that actually happened — your serial, on-chain"), then body settles into 14pt humanist sans. Callout chips are small and mono.
- **Asset usage:** Full-bleed welcome illustration as hero. NO data cards, NO sparklines, NO Moment thumbnails — this collector has no Moments yet. One supporting illustration for the free-pack reveal slot.
- **Tables:** None. Welcome is narrative + definition, not data.
- **CTA style:** Single full-width flame button (`Open your free pack`). Optional ghost-text secondary link below ("New here? See how it works") for the explainer-curious path.

**b. Per-frame overlay**
- **Almanac:** Adds a fourth section — a calm "how long-time collectors actually use the platform" map (Flash Challenges, the Show, Discord). Display headline gets a subhead ("Here is the platform you just joined."). Body density rises by ~80 words.
- **Cinematic:** Strips the platform-definition block and the calm map. Headline becomes a single declarative beat ("The Cooper Flagg Era begins here."). Hero becomes the dominant element — 70% of the email height. Three callout pills compress to scoreboard-style chips. CTA is uppercase tracked-out (`OPEN YOUR FREE PACK`).
- **Brief:** Replaces the journey silhouette with a *Day 0 brief* layout — small dashboard thumbnail hero, six-row data callout grid (account state, Round 2, marketplace 7d, active sets, licensing, brief cadence), single tight body line, primary CTA `Open your free pack`. Reads like a Bloomberg morning brief addressed to a new account.

**c. Don't-look-the-same scoring vs. template family:** Layout (vertical journey, unique), asset rhythm (illustrative-only, unique), information density (definitional + welcoming, unique).

**d. Social-proof slot:** "Where collectors talk" callout (Discord, the Show, Top Shot Live) is the social-proof seed. Future iteration could swap in "X collectors joined this week" if we wire that count.

**Roham feedback applied:** Removes "The play itself" repetition (he flagged it as AI-tells). Locks multiple test options — Almanac (long), Cinematic (Cooper-Flagg-Era poster), Brief (data brief). At least one variant must be non-playoff-themed (Almanac with `week.featured_games` Liquid lets the rotation breathe across the calendar).

---

### 2. Pack Received
**Card ID:** `pack-received-voice` · **Template ID:** `pack-received`

**a. Visual identity** — *the canonical baseline. Roham said ship.*
- **Layout silhouette:** **Hero-first cinematic** — pack art occupies the top 60% of the email, full-bleed, no chrome. Then a tight 3-row callout (Set / Pack / Marquee). Then the chronicler body paragraph. Then a recent-comp block (3 sales, narrow, divided). CTA is `Open your pack`.
- **Color treatment:** **Mint leads** (the calm "after" voice — the pack is already here, no urgency). Flame is reserved for the CTA only. The pack art carries the visual heat; chrome stays cool.
- **Typography rhythm:** Hero pack art is the headline. The subject line carries the chronicler statement ("Your {{packTitle}} just landed. Here's the set inside."). Body is generous — 13.5pt at 1.55 leading.
- **Asset usage:** Pack image is the full-bleed hero — `event.packImageURL`. No data cards. The 3-row callout is the only structural data block. Recent comps render as bullet rows, not a table.
- **Tables:** None. Recent comps are list-style (`• Cooper Flagg Three-Pointer cleared $1,247`) not row-column.
- **CTA style:** Single full-width flame button.

**b. Per-frame overlay**
- **Almanac:** Body grows to chronicler-statesman length (~140 words). Adds the "serial is a document" framing line and the "play-itself, not a clip" line. Adds a 4th callout row (`Set chronicled by: {{set_curator_name}}`).
- **Cinematic:** Body strips to ≤60 words ("The plays already happened. Now they're yours."). Recent comps disappear — pack art and three poster lines carry it. CTA becomes `OPEN THE PACK`.
- **Brief:** Hero swaps from pack art to set datacard infographic (`event.setcard_image_url`). Six-row data callout (set, pack, marquee, 7d volume, top clear, floor + 7d delta). Single 1-line body. Reads as a position-acquired note.

**c. Don't-look-the-same scoring:** Asset rhythm (pack art dominant — only template where the asset is the headline), CTA shape (single button is shared but the surrounding minimalism is unique), information density (cinematic-first, paragraph follows).

**d. Social-proof slot:** "Three Cooper Flagg Moments cleared at $634-$1,247 this week" — the recent-comp block doubles as social proof (collectors are paying real prices for what's now in your pack). Future iteration can add an explicit "X collectors opened this set today" line.

**Roham feedback applied:** SHIP. This is the reference. The other six templates measure against this one.

---

### 3. Reactivation Drip
**Card ID:** `reactivation-drip` · **Template ID:** `reactivation`

**a. Visual identity**
- **Layout silhouette:** **Portfolio-statement layout** — top stripe with "your portfolio in one line" (Moments owned · since-date · last seen), then a personalized "your three moving Moments" *stack* (each Moment is its own row with player, set, serial, bought-at price, floor today, and a small sparkline visual on the right). The Moments stack is the visual focus. Then a brief market-context paragraph. Then a CTA.
- **Color treatment:** **Amber leads** (financial-statement register — like a brokerage statement). Mint highlights "+pct" deltas, ink is the spine. Flame appears only in the CTA.
- **Typography rhythm:** Subject is the lead ("Three Moments in your collection are moving this week."). Headline of the email body is a thin display weight, not bold. Each Moment row has player name in display, all numbers in mono. Sparklines are 80px wide.
- **Asset usage:** The Moment stack is the asset rhythm — small 64px Moment thumbnails on the left, mini-sparkline charts on the right. Hero illustration is a thin 16:5 strip at the very top, not full-bleed.
- **Tables:** Light table lattice — the Moment stack is *table-adjacent* but rendered as a divided list (not row-column header). Roham flagged tables as dangerous; this is a list with column-aligned data, not a spreadsheet.
- **CTA style:** Primary button (`View your collection`) + secondary ghost-text (`See full marketplace tape`).

**b. Per-frame overlay**
- **Almanac:** Adds a 100-word "the loudest window in two years" cohort-thesis paragraph above the Moment stack. Adds Embiid 3.2× and Brunson-zero comp data inline. Anchors collector identity ("holding since {{first_session_at}}").
- **Cinematic:** Strips the Moment stack to a single hero Moment (the highest-mover from the array), full-bleed Moment image. Body strips to ("You were here first. The Cooper Flagg Era opens. Your serials predate it.") Three callout pills only. Big CTA: `SEE WHAT'S MOVING`.
- **Brief:** This is where the Brief frame's tape-style aesthetic earns its keep — the Moment stack stays but compresses into a 6-row tape feed (top mover, mover #2, mover #3, supply ratio context, last session, wallet size). Single tight body line. Sparkline becomes the hero.

**c. Don't-look-the-same scoring:** Layout (Moment-stack as the visual focus, unique), asset rhythm (per-Moment thumbnails + mini-sparklines, unique), CTA shape (dual primary + secondary, unique in stack).

**d. Social-proof slot:** "Three other long-time holders sold their Cooper Flagg Rookie Debut Moments this week at $X" — slot exists in the market-context paragraph; needs `event.cohort_recent_sales` Liquid to populate. Stub the slot now, fill later.

**Roham feedback applied:** "Apply real specifics — look up specific moment purchases, real math. If math isn't positive don't try to spin it." The Moment stack is built around *real* purchase data: bought-at, floor-today, recent-comp. If the math is negative, the row shows the negative delta in red — no spin. Engineering hook: `customer.notable_holdings_moving` BQ→Customer.io sync needs to support negative-delta rendering, not filter for positive movers.

---

### 4. Fast Break Daily Result
**Card ID:** `fast-break-result-fix` · **Template ID:** `fast-break`

**a. Visual identity** — *the most differentiated template in the stack. Game-loop product gets game-product UI.*
- **Layout silhouette:** **ESPN-scoreboard layout** — top is a *scoreboard header* (lineup vs. slate, score, rank in big numerals, team-color-coded). Below the scoreboard: a 5-cell lineup grid (5 small player tiles with tonight's points per player). Below the lineup: claim-pack row (pack art + countdown timer + claim button). Footer has streak stats and "next slate locks at 7pm ET" CTA.
- **Color treatment:** **Mint leads** for the win state (greens dominate — the win color). Flame is reserved for the urgent claim countdown. Amber for streak callouts. This template uses *more saturated* color than the others — it's the only template that should feel like a fantasy-sports app, not a marketing email.
- **Typography rhythm:** Scoreboard numerals are giant (48pt+, mono, the way ESPN renders scores). Player names in display. Game count and rank in mono. Body text is sparse.
- **Asset usage:** No marketing-style hero. The scoreboard *is* the hero. Player tiles are 56px circular avatars (using NBA player headshots — Liquid `event.player_avatar_url` array). Pack art is *small* in the claim row, not the lead.
- **Tables:** A 5-cell lineup grid renders as small player cards, not a table. Brief-overlay variant uses a tape-style scorecard but no spreadsheet table elsewhere.
- **CTA style:** Two CTAs — primary `Claim your pack` (flame, full-width) AND a contextual secondary `Set tomorrow's lineup` (ghost text, opens app to next slate). Game-loop products demand the next-loop CTA always be visible.

**b. Per-frame overlay**
- **Almanac:** Adds a "what won the slate tonight" paragraph below the scoreboard — the chronicler-statesman explains *why* this lineup hit (minutes-restriction news, defensive matchup, etc.). Names the craft. Same scoreboard layout.
- **Cinematic:** Scoreboard goes mythic — big tier-reveal animation hero (`tier4` GIF), three callouts compress, body strips to "You called it." Pack-claim row shifts up the page; the secondary CTA disappears.
- **Brief:** Scoreboard becomes a tape-row ("Lineup hit · 147 pts · rank Top 8%"). Six-callout data block replaces the lineup grid (production, slate rank, reward, claim window, streak, lifetime). The scorecard infographic is the hero.

**c. Don't-look-the-same scoring:** Layout (scoreboard, unique in stack — only sports-app-flavored template), color (more saturated, unique), CTA shape (dual + countdown, unique), information density (scoreboard register, unique).

**d. Social-proof slot:** "23,184 Fast Break players hit tonight's slate" — stat callout in the streak/lifetime section. Slot exists; populated from `event.slate_winner_count` Liquid.

**Roham feedback applied:** "Should look unique and different than the non-fast break Top Shot emails." This template has *no marketing-email DNA* — its silhouette is closer to DraftKings or Yahoo Fantasy result emails than to the rest of the Top Shot stack. That's intentional. Engineering hook: confirm `event.player_avatar_url[]` is on the result event payload — if not, falls back to player initials in the 5-cell grid. **PRODUCTION FIX still ships day-one regardless of template:** broken Liquid URL `?fastBreakId={{ event[` and "a NBA" → "an NBA" in subject. The template is the upgrade after the fix.

**gpt-image-2 generation needed:** A new generic Fast Break "tier reveal" hero image that isn't tied to a specific tier (current `tier4.gif` is fine, but for the cinematic variant we want one with the lineup positions visible). Flag for later generation; cinematic variant uses existing `tier4.gif` for now.

---

### 5. Drop Announcement
**Card ID:** `drop-announcement-programmatic` · **Template ID:** `drop-announcement`

**a. Visual identity**
- **Layout silhouette:** **Theatrical poster layout** — hero is the drop art (curator-supplied, full-bleed, ~16:9, NOT a data card). Below the poster: a single legend headline ("The Cooper Flagg Era begins here"). Below that: three vertical *anticipation cards* in a row — `When` (queue + live time, formatted big), `What` (set + tier + circulation), `How` (queue mechanics one-line). At the bottom: a primary `Set a reminder` CTA + secondary `Add to calendar` ghost link.
- **Color treatment:** **Flame leads, hard.** This is the most flame-saturated template — this is anticipation marketing, the bright accent earns its place. Ink for the poster border, mint reserved for confirmed-reminder state.
- **Typography rhythm:** The legend headline is the largest type in the entire stack — 36pt+ display, all the air the email can spare. The three anticipation cards use mono for time (`THU 7:30 PM ET`) and display for the labels.
- **Asset usage:** Drop art occupies 50%+ of the email height. NO callout grid in the v1001/Almanac variants. NO recent-comp data in the cinematic variant. The Brief-overlay variant uses a small datacard hero instead — so 3 of 4 variants are *image-led*, 1 is *data-led*.
- **Tables:** None in v1001/Almanac/Cinematic. Brief variant uses a 6-row datacard. Roham was explicit on this card: "tables are dangerous when overused — looks like a spreadsheet." Drop announcements are theatrical, not spreadsheet.
- **CTA style:** Primary `Set a reminder` (flame button) + secondary `Add to calendar` (ghost link). This dual CTA matters — the calendar add captures intent without committing to in-app reminder, which is a different psychological commitment.

**b. Per-frame overlay**
- **Almanac:** Adds a 120-word supply-discipline paragraph between the poster and the anticipation cards ("The discipline of the 2025–26 season has been smaller circulation, tighter sets, and rookies capped under 5,000…"). Names the supply-pivot trust signal that long-time collectors care about.
- **Cinematic:** Strips everything to poster + legend + time. The three anticipation cards compress to a single line ("THU 7:30 PM ET · 8,500 packs · queue opens 7:00"). Mythic closer ("One generation defines the next."). CTA becomes `SET THE REMINDER`.
- **Brief:** Poster swaps to the small datacard infographic. Six-row data callout (set, circulation, pack price, queue, live, last comparable drop). Single tight body line. Reads as a calendar-feed entry, not a poster.

**c. Don't-look-the-same scoring:** Asset rhythm (full-bleed drop art, theatrical scale — unique), color (flame-heavy, unique), CTA shape (dual reminder + calendar, unique), information density (anticipation-poster register, unique).

**d. Social-proof slot:** "Last comparable drop (Series 8 Wembanyama) sold out in 11 minutes; floor today $148" — Almanac variant has this in the supply paragraph; v1001 has it in the body. Brief variant has it as a callout row. Slot exists in all four variants.

**Roham feedback applied:** "We can't reuse the exact same template table in every email." This template *bans* tables in the dominant variants and uses them only in the Brief overlay where Bloomberg-style aesthetic justifies the spreadsheet shape. Drop art occupies the visual weight; data lives in three vertical anticipation cards, not rows.

**gpt-image-2 generation needed:** Per-drop hero art is curator-supplied. The placeholder for review is `bottom_banner` from the existing assets, but production drops use whatever Guy/Sam upload. No additional generation needed.

---

### 6. Abandoned Cart
**Card ID:** `abandoned-cart` · **Template ID:** `abandoned-cart`

**a. Visual identity** — *the social-proof template. Roham said "try social proof — others have purchased moments from X player."*
- **Layout silhouette:** **Moment-as-hero, social-proof-as-spine.** Top: the Moment thumbnail at *medium* scale (not full-bleed — framed in a card, ~3:4 aspect, signaling "this specific Moment, your serial"). Below the Moment card: the social-proof block ("3 collectors bought {{event.player}} Moments from this set in the last 24h"). Below that: the comp-band evidence (3 recent sales in similar serial bands, listed). At the bottom: the listing-still-open status row + CTA.
- **Color treatment:** **Mint leads** (the calm "your listing is still here" register — Roham's "drop the urgency-pressure tone" feedback). Amber for comp data. Flame for the CTA only.
- **Typography rhythm:** Subject carries the "still open" state ("{{player}} {{playCategory}} — still open on the Marketplace."). Moment card has player name in display, playCategory + serial in mono caption. Social-proof line in body weight, italics off. Comp rows in mono.
- **Asset usage:** Single Moment thumbnail as the framed hero (~360x480px, not full-bleed). NO marketing illustrations. NO data cards. The Moment is the entire visual story.
- **Tables:** None. Comp sales render as a list with bullets, not a table. Brief-variant overlay uses a 6-row callout but still avoids spreadsheet shape.
- **CTA style:** Primary `Finish your purchase` (flame button). Secondary `Browse this set` (ghost text — gives the collector an out without abandoning the surface).

**b. Per-frame overlay**
- **Almanac:** Adds the "serial is a document" closing paragraph and the "comp band is the language a Moment speaks in" chronicler-statesman line. Adds a 4th callout (Listing: Intact). Calm closer respects autonomy.
- **Cinematic:** Strips to "The play already happened. Serial #X is still on the marketplace. One serial. One owner." Comp data compresses to a single sentence. CTA becomes `OWN THE MOMENT`.
- **Brief:** Six-row data callout dominates (Moment, set, serial, listing price, two band comps). Body is one line. Moment thumbnail shrinks to 96px inline. Reads as an open-order desk note.

**c. Don't-look-the-same scoring:** Layout (Moment-card-as-hero is unique to this template — Pack Received uses pack art, this uses Moment art), social-proof slot is *prominent* in this template (unique), CTA shape (primary + browse-out, unique).

**d. Social-proof slot:** **First-class, prominent.** Right under the Moment card: "{{event.cohort_recent_buyers_count}} collectors bought {{event.player}} Moments from {{event.setName}} in the last 24h. {{event.recent_buyer_avatars}} (truncated avatar grid, 3-5 anonymized initials)." This is the differentiated treatment Roham asked for.

**Roham feedback applied:** "Looks too similar to the others, exact same table format. Want different templates to test. Try social proof — 'Hey, others have purchased moments from X player.'" The Moment-card-as-hero + social-proof-cohort layout is meaningfully different from every other template. Comp data stays for evidence; social proof is the new wedge.

**Engineering hooks added:** `event.cohort_recent_buyers_count`, `event.recent_buyer_avatars` derived fields on the abandoned_cart event (BQ → Customer.io sync of recent-cohort activity in the same set).

---

### 7. Whale-tier Concierge
**Card ID:** `whale-tier-concierge` · **Template ID:** `whale-tier`

**a. Visual identity** — *the only template where tables are appropriate. This is genuinely tabular intelligence.*
- **Layout silhouette:** **Research-desk dispatch layout** — top: small "Collector Desk · Weekly Read for {{userName}}" header strip with portfolio one-liner (Moments, lifetime, 7d delta). Below: a *patterns table* with three rows × four columns (Pattern · Player concentration · Cohort size · Market signal). Below: a single "Hold longer" row card highlighting one Moment with bought-at, floor-today, comp data. Below: a sparkline portfolio chart. CTA at the bottom is `Open comp dashboard` plus a `Reply for full pull` ghost link.
- **Color treatment:** **Ink leads** — this is the most restrained template in the stack. No flame on the page except the CTA button. Amber for the data lattice. Mint for the hold-recommendation accent. The visual register is "research desk," not "marketing email."
- **Typography rhythm:** Tight, dense, financial-newsletter cadence. Pattern titles in display semibold (small, 13pt). Table cells in mono (11.5pt). The hold-rec row gets the only visually-loud type — player name at 18pt, serial in mono.
- **Asset usage:** Portfolio sparkline chart (`customer.whale_chart_image_url`) as a small inset, not a full hero. NO marketing illustrations. NO Moment thumbnails. The data IS the asset.
- **Tables:** **Yes — first-class.** This is the only template where a table earns its keep. The 3-pattern × 4-column lattice IS the email's information architecture. Roham's "tables are dangerous" critique was about *overuse*; here, the content is genuinely tabular (three patterns each with the same four-axis signature), so a table is the honest treatment.
- **CTA style:** Primary `Open comp dashboard` (flame button — the *one* flame element on the entire page, intentionally rare). Secondary ghost-text `Reply for full comp pull` — the surface is concierge by definition (L4/L5, weekly cadence), so reply-to-engage is real.

**b. Per-frame overlay**
- **Almanac:** Reframes sender from "Magic" to "the collector desk" (per Roham's feedback that whale concierge should not be a personal letter). Each pattern gets a longer evidence sentence. Hold-rec row expands to include the cohort-comparison sentence ("the narrative density on this Moment is still building"). No "I." No "— Magic." Statesman authority via institutional voice.
- **Cinematic:** Strips the table. Patterns become three poster lines ("{{pattern_1.title}} · {{pattern_2.title}} · {{pattern_3.title}}"). The hold-rec gets the full visual weight. Sparkline disappears. Brand-cinematic, no concierge-letter framing. CTA becomes `OPEN THE READ`.
- **Brief:** Pure Bloomberg desk note. Six-row data callout (portfolio, 7d delta, three patterns one-line each, hold flag). Single body line ("Three patterns intersect your top holdings this week."). Sparkline is the hero. Brief is the natural home for this template — most variants of the whale read are *closer* to the Brief register than to the others.

**c. Don't-look-the-same scoring:** Layout (research-desk dispatch, unique), color (ink-led, restrained, unique), asset rhythm (data-as-asset, sparkline inset, unique), table treatment (first-class table, unique in the stack — only template that uses one).

**d. Social-proof slot:** Pattern 1's `cohort_size` field IS the social-proof element ("Three L5 collectors quietly built positions in pre-rookie Flagg Moments"). The whale knows other whales exist; naming the cohort size is the concierge equivalent of social proof.

**Roham feedback applied:** "Absolutely terrible. Totally misunderstands whale psychology. Dump whatever approach is leading you here." The previous v1001 ran Magic-personal-letter ("What I'm watching this week," signed "— Magic"), which Roham flagged separately as the voice trap. Whale psychology is *not* "a friend writes to you" — it's "a research desk you trust delivers a tight read you can act on." This template:
- Removes "Magic" as sender entirely. From-line becomes `NBA Top Shot Collector Desk <desk@nbatopshot.com>`.
- Removes the "What I'm watching" framing.
- No "I." No "reply if you want a read." Replaces with `Reply for full comp pull` as a contextual ghost link.
- Tables, sparkline, and dense data signal "we did real work for you," which is the whale concierge psychology — the value isn't warmth, it's evidence-of-effort.
- The hold-rec row stays but only when the math is genuinely positive (per the Reactivation feedback applied here too — no spin).

**gpt-image-2 generation needed:** Per-wallet portfolio sparkline (`customer.whale_chart_image_url`) — current placeholder is `whale-chart.png`. Production would generate per-L4/L5 wallet at send time via a server-side chart-rendering job. Flag the engineering hook.

---

## Summary table — 7 templates × 4 differentiation axes

| # | Template | Layout silhouette | Asset rhythm | Density register | CTA shape | Lead color |
|---|---|---|---|---|---|---|
| 1 | Welcome | Vertical journey | Illustrative-only | Definitional + welcoming | Single button + ghost link | Flame |
| 2 | Pack Received | Hero-first cinematic | Pack art dominant | Cinematic-then-paragraph | Single button | Mint |
| 3 | Reactivation | Portfolio-statement | Moment-stack + sparklines | Financial-statement | Dual button + ghost | Amber |
| 4 | Fast Break | ESPN scoreboard | Player-tile grid | Scoreboard register | Dual button + countdown | Mint (saturated) |
| 5 | Drop Announce | Theatrical poster | Drop art full-bleed | Anticipation-poster | Reminder + calendar | Flame (heavy) |
| 6 | Abandoned Cart | Moment-card-as-hero | Single Moment frame | Calm + social proof | Primary + browse-out | Mint |
| 7 | Whale Concierge | Research-desk dispatch | Data-as-asset (table+chart) | Bloomberg desk note | Primary + reply ghost | Ink |

Every row differs from every other row on at least three axes. None of the seven templates can be confused for another from a thumbnail.

---

## Engineering hooks by template (delta from existing card-level hooks)

- **Welcome:** No new hooks beyond existing `week.featured_games` Liquid feed.
- **Pack Received:** Existing — `event.set_chronicler_note`, `event.set_top_3_recent_sales`, `event.set_marquee_player`.
- **Reactivation:** Existing `customer.notable_holdings_moving` — *must support negative-delta rendering*. Add `customer.cohort_recent_sales` for social proof.
- **Fast Break:** Add `event.player_avatar_url[]` to result event payload. Add `event.slate_winner_count` for social proof. URGENT production fix on broken Liquid URL.
- **Drop Announcement:** Add `drop.previous_comparable.{set_name, sellout_minutes, floor_today}` for the calendar/comparison line.
- **Abandoned Cart:** Add `event.cohort_recent_buyers_count`, `event.recent_buyer_avatars` for social proof.
- **Whale Concierge:** Define `lifetime_stage` profile attribute. Build per-wallet sparkline rendering job. Wire collector-desk sender domain. Define weekly-cron campaign.

---

## What ships first

1. **Production fix** — Fast Break broken Liquid URL (no template change required, hours-of-work fix).
2. **Pack Received template** — already validated (Roham SHIP). Migrate live campaign #10 to the new template.
3. **Welcome template** — ~136 days dark, lifecycle hygiene case. Welcome shipping is the first place the new design system is publicly visible at scale.
4. **Whale Concierge template** — needs L4/L5 cohort definition first (open with Matt + Dan).
5. Remaining four — sequenced after L2 evidence on the first three.

---

## Self-verification — do the 7 look distinct?

I asked the spec mid-stream: could I draw 7 different thumbnails from this? Pass.

- Welcome — illustrated hero, definition block, free-pack pill, two path cards
- Pack Received — pack art dominates, mint chrome, three-row callout, comp bullets
- Reactivation — amber portfolio strip, three-Moment stack with sparklines per row
- Fast Break — green scoreboard with giant numerals, 5-cell lineup grid, pack-claim row
- Drop Announce — full-bleed drop art poster, big legend headline, three vertical anticipation cards
- Abandoned Cart — single framed Moment thumbnail, social-proof block, comp list, calm CTA
- Whale Concierge — ink-led research-desk strip, 3×4 patterns table, hold-rec row, portfolio sparkline

All seven distinct. Color leads vary across all four palette options. Layout silhouettes vary across seven shapes. Asset rhythms vary (illustrative, pack-art, Moment-stack, scoreboard, drop-art, framed Moment, data-table-and-chart). Information densities vary across the full register from welcoming to Bloomberg-desk.

The brand sings together via shared chrome (header, footer, type family, four-color palette, customer-data treatment). The templates are individually unique via the seven differentiation profiles above.

---

*End spec. See `/home/agent/topshot-review/components/cards/templates.tsx` for the renderer skeleton.*
