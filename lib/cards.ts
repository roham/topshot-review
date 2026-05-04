// v1009 — Phase H candidates. 15 net-new drafts (5 cards × 3 candidates).
// Old variants (v1001 / almanac / cinematic / brief / primary / alt_a / alt_b)
// dropped entirely per Roham's directive. Only c1 / c2 / c3 ship.
//
// c1 = C1 — Primary
// c2 = C2 — Alt A
// c3 = C3 — Alt B
//
// Pack Received: v1001 content promoted to c1 (rename only, content unchanged
//   per Roham's outright SHIP). No Phase H Pack Received drafts exist → no c2/c3.
// Whale Tier: parked per Phase G/H scope. Single deferred placeholder card.

export type CardKind = "upgrade";

export type UpgradeState =
  | "stopped"
  | "broken-in-prod"
  | "missing"
  | "running-flat";

export type VoiceMode = "platform-chronicler" | "magic-observational";

export type AfterVariantId = "c1" | "c2" | "c3";

export type AfterBlock = {
  label: string;
  from: string;
  subject: string;
  preheader: string;
  emailHero?: { src: string; alt: string; liquidCaption?: string };
  callouts?: { label: string; value: string }[];
  body: string[];
  cta: string;
  voice_notes?: string;
};

export type UpgradeCard = {
  id: string;
  position: number;
  stack_item: string;
  hero: string;
  kind: CardKind;
  headline: string;
  pills: { audience: string; trigger: string; kpi: string };
  voice: VoiceMode;
  diagnosis: {
    state: UpgradeState;
    summary: string;
    facts: { label: string; value: string }[];
    campaigns: { id: number; name: string; state: string; url: string; note?: string }[];
  };
  before?: {
    label: string;
    subject: string;
    excerpt: string;
    critique: string;
  };
  after: {
    c1?: AfterBlock;
    c2?: AfterBlock;
    c3?: AfterBlock;
  };
  reviewer_ask: string;
  engineering_hooks?: string[];
};

export type Card = UpgradeCard;

export const CARDS: UpgradeCard[] = [
  // -----------------------------------------------------------------------
  {
    id: "reactivation-drip",
    position: 1,
    stack_item: "Reactivation Drip — the biggest hole in the stack",
    hero: "/cards/reactivation.png",
    kind: "upgrade",
    headline:
      "1.27M idle L1+L2 collectors. 774K signed up and never bought a pack. Zero programmatic drip aimed at any of them.",
    pills: {
      audience: "L1+L2 dormant >30d · 1.27M total · 774K never-bought-and-dormant",
      trigger: "Segment-membership · entry on dormancy threshold cross",
      kpi: "Mid-six-figures opportunity over a 4.5mo window (BQ-grounded)",
    },
    voice: "platform-chronicler",
    diagnosis: {
      state: "missing",
      summary:
        "Campaign #1 \"Re-engage Inactive Users\" is a draft scaffold with empty templates and Customer.io demo-gallery placeholder copy. BQ shows 1.27M L1/L2 collectors idle >30 days, 774K who signed up and never bought a single pack. Largest dollar opportunity in the entire programmatic stack.",
      facts: [
        { label: "L1+L2 idle >30d", value: "1.27M users" },
        { label: "L1+L2 idle >180d", value: "1.24M users" },
        { label: "L1 only — 0 packs lifetime, idle >30d", value: "774K users" },
        { label: "Mean first-7d basket (signups who do convert)", value: "$27.54" },
        { label: "Action names in the empty draft (verbatim)", value: "\"Check out our latest features!\" · \"Enjoy a free month of access, on us!\" · \"10% off your first month, sign up today!\" — Customer.io demo-gallery boilerplate" },
        { label: "Body content authored", value: "None. Empty `{}` content object." },
      ],
      campaigns: [
        { id: 1, name: "[TEMPLATE] Re-engage Inactive Users", state: "draft", url: "https://fly.customer.io/workspaces/161112/journeys/campaigns/1/overview", note: "Empty scaffold; never built" },
      ],
    },
    after: {
      // Phase H — Reactivation C1: Segment A · Origin Story Holder · Sarah
      c1: {
        label: "Phase H Candidate 1 — Segment A · Origin Story Holder · Sarah",
        from: "NBA Top Shot <hello@nbatopshot.com>",
        emailHero: {
          src: "/cards/infographics/reactivation-almanac.png",
          alt: "NBA Top Shot — Round 2 of the 2026 Playoffs",
          liquidCaption: "Round 2 of the 2026 NBA Playoffs · live this week",
        },
        subject: "Your Jokić #14 cleared at $3,399 last month.",
        preheader: "And LeBron Cosmic #41 cleared at $13,000 in March. Your collection is documenting something.",
        callouts: [
          { label: "Jokić", value: "S1 Holo MMXX · #14 · last comp $3,399 ({{customer.notable_holdings_moving[0].recent_comp_at | date: \"%b %-d\"}})" },
          { label: "LeBron", value: "S1 Cosmic · #41 · last comp $13,000 ({{customer.notable_holdings_moving[1].recent_comp_at | date: \"%b %-d\"}})" },
          { label: "Wemby", value: "S7 Constellations · #138 · last comp $77 ({{customer.notable_holdings_moving[2].recent_comp_at | date: \"%b %-d\"}})" },
        ],
        body: [
          "Some Moments take years to be worth what they were always worth.",
          "You bought your Jokić Series 1 Holo MMXX, serial #14, on **{{customer.notable_holdings_moving[0].bought_at | date: \"%B %-d, %Y\"}}** for **{{customer.notable_holdings_moving[0].bought_price | default: \"$650\"}}**. Last month, {{customer.notable_holdings_moving[0].recent_comp_at | date: \"%B %-d\"}}, a comparable serial in that edition cleared **{{customer.notable_holdings_moving[0].recent_comp | default: \"$3,399\"}}**. The floor today sits at {{customer.notable_holdings_moving[0].floor_today | default: \"$2,250\"}}.",
          "You weren't wrong about what you were holding. You were just early.",
          "{% for hold in customer.notable_holdings_moving offset:1 limit:2 %}Your **{{hold.player}}** {{hold.set}} #{{hold.serial}} — bought {{hold.bought_price}}, last comp **{{hold.recent_comp}}** ({{hold.recent_comp_at | date: \"%b %-d\"}}, {{hold.pct_change}}).{% endfor %}",
          "Round 2 of the 2026 Playoffs is live this week. {{social_proof.reactivation.returned_collectors_30d | default: \"37,227\"}} collectors came back in the last 30 days. Holding since {{customer.first_session_at | date: \"%B %Y\"}} — your collection is early-chapter documentation of something that's still being written.",
        ],
        cta: "View your collection",
        voice_notes:
          "Phase H C1. Segment A — Origin Story Holder (Sarah archetype). Backward-looking: 4-year history, specific bought-prices, specific dates, specific comps. Three named Moments with serials. Real math only — positive-math gate upstream. 12/12 rubric. Roham comment addressed: 'Apply real specifics. Specific moment purchases. Real math per user. Only convincing where math IS positive.'",
      },
      // Phase H — Reactivation C2: Segment B · Whale Cohort-Density · Marcus
      c2: {
        label: "Phase H Candidate 2 — Segment B · Whale Cohort-Density · Marcus",
        from: "NBA Top Shot <hello@nbatopshot.com>",
        emailHero: {
          src: "/cards/infographics/reactivation-almanac.png",
          alt: "NBA Top Shot — market-depth read",
          liquidCaption: "Market-depth read on the players you're holding. Round 2 starts this week.",
        },
        subject: "LeBron cleared 833 sales in 30 days. Your Mitchell sits inside a tightening band.",
        preheader: "Market-depth read on the players you're holding. Round 2 starts this week.",
        callouts: [
          { label: "LeBron", value: "{{social_proof.reactivation.top_player_by_volume_sales_30d | default: \"833\"}} sales · {{social_proof.reactivation.top_player_by_volume_buyers_30d | default: \"429\"}} buyers (30d)" },
          { label: "Mitchell", value: "sub-3K serials · band tightening +30% in 72h" },
          { label: "Returners", value: "{{social_proof.reactivation.returned_collectors_30d | default: \"37,227\"}} in 30 days" },
        ],
        body: [
          "The market did things in the last 30 days that don't show up in a price chart.",
          "LeBron James cleared **{{social_proof.reactivation.top_player_by_volume_sales_30d | default: \"833\"}}** sales across **{{social_proof.reactivation.top_player_by_volume_buyers_30d | default: \"429\"}}** unique buyers. He is 41 years old, into the Conference Semifinals, and the buyer breadth is the deepest it's been in 18 months.",
          "Closer to your portfolio: Mitchell's sub-3,000 serial band has tightened by roughly 30% in the last 72 hours. The bid-ask is narrowing. The asks the patient holders set six months ago are starting to clear.",
          "You're holding a Mitchell #{{customer.notable_holdings_moving[0].serial | default: \"2,418\"}} inside that band.",
          "**{{social_proof.reactivation.returned_collectors_30d | default: \"37,227\"}}** dormant collectors came back in the last 30 days. Most of them came back because the market started signaling something they recognized.",
          "The window between rounds is the repositioning window.",
        ],
        cta: "See market depth",
        voice_notes:
          "Phase H C2. Segment B — Whale Cohort-Density (Marcus archetype). Present-tense: market-state read, not personal history. 833 sales / 429 buyers / 30% band move / 37,227 returners all BQ-confirmed. Positive-math frame is 'market moving toward your holdings' not 'wallet is up X%'. 12/12 rubric.",
      },
      // Phase H — Reactivation C3: Segment C · Constellations Buyer · Riley · Forward Hook
      c3: {
        label: "Phase H Candidate 3 — Segment C · Constellations Buyer · Riley · Forward Hook",
        from: "NBA Top Shot <hello@nbatopshot.com>",
        emailHero: {
          src: "/cards/infographics/reactivation-cinematic.png",
          alt: "NBA Top Shot — forward-looking energy",
          liquidCaption: "Series 9 Rookie Era drops Thursday 8 PM ET · 8,500 mints",
        },
        subject: "You bought Wemby's first postseason. Flagg drops in 5 days.",
        preheader: "Your S7 Constellations #138 is up 59%. Series 9 Rookie Era goes live Thursday.",
        callouts: [
          { label: "You held in 2025", value: "S7 Constellations #138 · bought $27 · last comp $77" },
          { label: "Series 9 Rookie Era", value: "live Thursday 8 PM ET · 8,500 mints" },
          { label: "{{social_proof.reactivation.returned_collectors_30d | default: \"37,227\"}}", value: "collectors returned in 30d" },
        ],
        body: [
          "You were here when Wembanyama's first postseason set dropped on **{{customer.notable_holdings_moving[2].bought_at | date: \"%B %-d, %Y\"}}**.",
          "You bought serial #{{customer.notable_holdings_moving[2].serial | default: \"138\"}} at **{{customer.notable_holdings_moving[2].bought_price | default: \"$27\"}}**. The last comparable cleared **{{customer.notable_holdings_moving[2].recent_comp | default: \"$77\"}}** on {{customer.notable_holdings_moving[2].recent_comp_at | date: \"%b %-d\"}}. {{customer.notable_holdings_moving[2].pct_change | default: \"+59%\"}}.",
          "That's not a giant number. It's a *correct* one. Your read on Wemby's first postseason was the read; the market caught up.",
          "**Series 9 — The Rookie Era — drops Thursday at 8 PM ET.** Cooper Flagg, first overall, alongside the most complete prospects of the last 20 years. 15 Moments. 8,500 mints.",
          "You called Wemby. The next chapter opens this week.",
        ],
        cta: "See the Flagg drop",
        voice_notes:
          "Phase H C3. Segment C — Constellations Buyer (Riley archetype). Forward-looking: Wemby win is the credential, Flagg drop is the next chapter. +59% is modest but real; 'not a giant number, a correct one' avoids overselling. Three specific dates, one specific serial, one specific delta. 12/12 rubric.",
      },
    },
    reviewer_ask:
      "Three: (a) confirm Segment routing — Sarah (A) gets C1, Marcus (B) gets C2, Riley (C) gets C3; (b) do we run Tier 3 Heimdall investigation for exact positive-math cohort count before Phase 2 send authorization? (c) `customer.notable_holdings_moving` engineering path — BQ → C.io per-user holdings array needs scoping.",
    engineering_hooks: [
      "Build `customer.notable_holdings_moving` profile attribute (BQ → C.io sync of top 3 owned Moments by 7d-volume change)",
      "Positive-math gate: per-user portfolio FMV join must confirm appreciation before send — suppress KAI_FLAT cohort (negative math)",
      "Wire three segments: (i) Segment A (S1 pre-2022 buyers, positive math); (ii) Segment B (whales $100K+ LTV, 12-18mo dormant); (iii) Segment C (2025 Constellations buyers)",
    ],
  },

  // -----------------------------------------------------------------------
  {
    id: "pack-received-voice",
    position: 2,
    stack_item: "Pack Received — first-Moment voice",
    hero: "/cards/pack-pull.png",
    kind: "upgrade",
    headline:
      "Highest-leverage email in the entire stack is currently a 10-word receipt. The most emotional moment on the platform is delivered with shipping-confirmation voice.",
    pills: {
      audience: "Every collector who receives a pack · highest-volume programmatic touchpoint",
      trigger: "On pack_airdrop_received event · fires on pack delivery",
      kpi: "Lift D1 pack-open rate · seed first-Moment narrative · feed nurture journey",
    },
    voice: "platform-chronicler",
    diagnosis: {
      state: "running-flat",
      summary:
        "Pack Received (#10) fires the second a collector gets a pack — the emotional peak of the platform. Today's email is a 10-word brand-banner with one CTA. We are squandering this.",
      facts: [
        { label: "Word count of body copy", value: "~10 words" },
        { label: "Personalization", value: "Pack title, qty, image — no narrative variables" },
        { label: "Voice register", value: "Brand-impersonal exclamatory: \"Congratulations! 🎁\"" },
        { label: "Subject (verbatim)", value: "You Received {{event.quantity}} x {{event.packTitle}} Pack!" },
      ],
      campaigns: [
        { id: 10, name: "Transactional | Pack Received", state: "running", url: "https://fly.customer.io/workspaces/161112/journeys/campaigns/10/overview", note: "Live, voice-empty" },
      ],
    },
    before: {
      label: "What's shipping right now — Pack Received (template 29)",
      subject: "You Received {{event.quantity}} x {{event.packTitle}} Pack!",
      excerpt:
        "[logo image] · [pack image] · 🎁 · [VIEW PACK button] · [app store badges] · [social icons] · \"All your Moments in your pocket.\"",
      critique:
        "This is a receipt, not a touchpoint. The single biggest emotional moment on the platform — pack-in-hand, three unknown Moments waiting — is delivered with the voice of a shipping confirmation. No set context, no legend, no marketplace data. The collector clicks once and leaves.",
    },
    after: {
      // Pack Received c1 = the Roham-SHIP'd v1001 content (rename only, content unchanged)
      c1: {
        label: "SHIP'd v1001 (promoted to c1) — Pack Received with set-chronicler voice + structured data",
        from: "NBA Top Shot <hello@nbatopshot.com>",
        emailHero: {
          src: "{{event.packImageURL}}",
          alt: "NBA Top Shot pack art",
        },
        subject: "Your {{event.packTitle}} just landed. Here's the set inside.",
        preheader: "{{event.set_marquee_player}} headlines. {{event.setTier}} tier. {{event.setMomentCount}} Moments across the run.",
        callouts: [
          { label: "The set", value: "{{event.setName}} · {{event.setTier}} tier · {{event.setMomentCount}} Moments" },
          { label: "Your pack", value: "3 Moments · serials already minted, already assigned" },
          { label: "Marquee", value: "{{event.set_marquee_player}}" },
          { label: "This week, in this set", value: "{{event.social_proof.set_buyers_7d}} collectors bought · top clear {{event.social_proof.set_top_sale_amount}}" },
        ],
        body: [
          "**{{event.setName}}** chronicles {{event.set_chronicler_note}}.",
          "Three Moments inside this pack. The order packs were created determines the serials you pulled. Some collectors pull a #1 of a tier. Some pull a low-print parallel that won't appear in another pack for months.",
          "**On the Marketplace this week, from {{event.setName}}:**",
          "{% for sale in event.set_top_3_recent_sales %}• {{sale.player}} {{sale.play}} cleared **{{sale.amount}}** ({{sale.sold_at | date: \"%b %-d\"}}){% endfor %}",
          "{{event.social_proof.set_top_sale_player}} {{event.social_proof.set_top_sale_tier}} cleared **{{event.social_proof.set_top_sale_amount}}** at the top of the band; {{event.social_proof.set_buyers_7d}} collectors bought into this set in the last seven days. The serials assigned to your pack are now in that same set.",
        ],
        cta: "Open your pack",
        voice_notes:
          "SHIP. Roham-blessed v1001 content promoted to c1 (rename only, content unchanged). Platform-chronicler. Opens with set as chronicler statement. Structured callouts + marketplace facts. Phase 1B cohort signal as closing observation. 11 inline Liquid refs. No c2/c3 for Pack Received — Phase H produced no stronger candidate to supersede the SHIP baseline.",
      },
      // No c2 or c3 for Pack Received — Phase H did not draft new Pack Received candidates.
      // The SHIP baseline (c1) stands as the sole variant.
    },
    reviewer_ask:
      "Two: (a) does pre-open (current trigger) work, or should this fire on pack-open with the actual Moments in hand? (b) `event.set_chronicler_note` — curated per set or pulled from set metadata? Curator note keeps voice tight; metadata is automatable.",
    engineering_hooks: [
      "Pair with follow-on `pack_opened` event triggering a Pack-Pull Recap email — closes the first-Moment loop",
      "Add `event.set_chronicler_note`, `event.set_marquee_player`, `event.set_top_3_recent_sales` to the pack-received event payload (or fetch from a set-metadata table at send time)",
    ],
  },

  // -----------------------------------------------------------------------
  {
    id: "welcome-onboarding",
    position: 3,
    stack_item: "Welcome / Onboarding",
    hero: "/cards/welcome.png",
    kind: "upgrade",
    headline:
      "Welcome program has been dark for ~136 days. Two prior versions stopped, neither replaced. Lifecycle hygiene case (BQ shows dark-window signups converting better than the welcome era).",
    pills: {
      audience: "All new signups · 7,942 unblocked since 2025-12-18",
      trigger: "On account_created event · D0/D1/D3/D5/D7 drip",
      kpi: "Brand-trust signal + first-impression integrity · primary $ impact small ($0–$11K)",
    },
    voice: "platform-chronicler",
    diagnosis: {
      state: "stopped",
      summary:
        "Two welcome programs ran historically. Both stopped by Dec 18, 2025. BQ surprise: dark-window signups (Dec 18 → today) converting at 8.54% D7 — *higher* than the 6.75% D7 of the welcome-#132 period. Welcome restart's case rests on lifecycle hygiene + brand-trust + first-impression integrity, not primary-conversion lift.",
      facts: [
        { label: "Last welcome stopped", value: "2025-12-18 (#132)" },
        { label: "Days dark today", value: "~136 days" },
        { label: "Dark-window D7 conversion", value: "8.54%" },
        { label: "Welcome #132 era D7 conversion", value: "6.75% (dark window is +1.79pp BETTER)" },
        { label: "Q4 2024 D7 conversion (welcome #77 era)", value: "11.37% — but confounded with Series 6 launch" },
        { label: "#77 lifetime sent", value: "206,786 (1.7% click rate)" },
        { label: "#77 email 1 subject (verbatim)", value: "Welcome to Top Shot!! We've got a so much more for you! (typo, sent 207k×)" },
      ],
      campaigns: [
        { id: 77, name: "New User Program", state: "stopped", url: "https://fly.customer.io/workspaces/161112/journeys/campaigns/77/overview" },
        { id: 132, name: "New User Onboarding", state: "stopped", url: "https://fly.customer.io/workspaces/161112/journeys/campaigns/132/overview" },
      ],
    },
    before: {
      label: "What used to ship — Email 1 of #77 (template 820)",
      subject: "Welcome to Top Shot!! We've got a so much more for you!",
      excerpt:
        "[image stack: 5 JPGs and social icons, no text body, no Liquid except {% unsubscribe_url %}]",
      critique:
        "Subject has a typo (\"got a so much\"). Body has zero text — five linked images and app-store badges. No personalization, no set context, no marketplace data. Sent 207k times. Open rate held at 38.6% on brand alone, click rate collapsed to 1.7%.",
    },
    after: {
      // Phase H — Welcome C1: Live-Playoff-Context · Restrained Chronicler
      c1: {
        label: "Phase H Candidate 1 — Live-Playoff-Context · Restrained Chronicler",
        from: "NBA Top Shot <hello@nbatopshot.com>",
        emailHero: {
          src: "/cards/infographics/welcome-cinematic.png",
          alt: "NBA Top Shot — welcome",
        },
        subject: "Welcome. Round 2 starts this week.",
        preheader: "Three Moments inside your free pack. Eight teams left in the NBA.",
        callouts: [
          { label: "Free pack", value: "3 Moments · already minted" },
          { label: "This week", value: "{{week.featured_games | default: \"Conference Semifinals live\"}}" },
          { label: "{{social_proof.welcome.returned_collectors_30d | default: \"37,227\"}}", value: "collectors returned in the last 30 days" },
        ],
        body: [
          "NBA Top Shot is where basketball history exists as something you can own. Each Moment is a specific highlight from a specific game — pulled from the live broadcast, minted in a limited run, with a serial number that is permanent and assigned only once.",
          "**Your free pack** has three Moments inside. Already minted, already yours. The order packs were created determines what you pulled.",
          "Round 2 of the 2026 Playoffs starts this week. {{week.featured_games | default: \"Eight teams. Conference Semifinals.\"}}. The Moments minted from this postseason will be priced against by the next year of the market. Walking in this week means you're holding receipts on history before the rest of the market is loud.",
          "{% if customer.signup_source == \"referral\" %}Whoever sent you here knew what they were doing.{% endif %}",
        ],
        cta: "Open your free pack",
        voice_notes:
          "Phase H C1. Live-playoff-anchor variant. Strips 'the play itself' (BANNED-01) entirely; replaced with 'specific highlight from a specific game'. Three behavioral hooks: customer.signup_source, week.featured_games, social_proof.welcome.returned_collectors_30d. 12/12 rubric. SHIP.",
      },
      // Phase H — Welcome C2: Evergreen · Cinematic
      c2: {
        label: "Phase H Candidate 2 — Evergreen · Cinematic",
        from: "NBA Top Shot <hello@nbatopshot.com>",
        emailHero: {
          src: "/cards/infographics/welcome-cinematic.png",
          alt: "NBA Top Shot — welcome",
        },
        subject: "Welcome to NBA Top Shot.",
        preheader: "Three Moments inside your free pack. The serials are minted.",
        body: [
          "Specific highlight. Specific game. Permanent serial.",
          "That's what a Moment is. Three of them are inside your free pack — already minted, already yours. The order packs were created determines what you pulled.",
          "Some collectors pull a #1 of a tier. Some pull a low-print parallel that won't show up in another pack for months.",
        ],
        cta: "Open your free pack",
        voice_notes:
          "Phase H C2. Evergreen — zero playoff anchor, works year-round. 62 words. 'Specific highlight. Specific game. Permanent serial.' is the platform definition in three words, replacing the banned 'the play itself' fragment. No callout grid (cinematic register). 11/12 rubric (D4 intentional cap). SHIP.",
      },
      // Phase H — Welcome C3: Lifecycle-First · Minimal
      c3: {
        label: "Phase H Candidate 3 — Lifecycle-First · Minimal",
        from: "NBA Top Shot <hello@nbatopshot.com>",
        emailHero: {
          src: "/cards/infographics/welcome-cinematic.png",
          alt: "NBA Top Shot — welcome",
        },
        subject: "Your free pack is loaded.",
        preheader: "Three Moments inside. Already minted.",
        body: [
          "{% if customer.signup_source == \"referral\" %}Someone you know sent you here.{% elsif customer.signup_source == \"paid\" %}You came in through an ad. The product is the actual thing.{% else %}You found us on your own. That tracks.{% endif %}",
          "Three Moments inside your free pack. Specific highlights, specific games, permanent serials. Already yours.",
        ],
        cta: "Open your free pack",
        voice_notes:
          "Phase H C3. Lifecycle-first — signup_source conditional determines the first sentence. Tests whether onboarding-personalization at the top moves activation. 42 words. Two behavioral hooks: customer.signup_source (load-bearing), customer.first_session_at (mobile preheader). 11/12 rubric (D4 intentional cap). SHIP.",
      },
    },
    reviewer_ask:
      "Two: (a) C1 (live playoffs) vs C2 (evergreen) vs C3 (lifecycle) — send all three as A/B/C or pick a default + test arms? Recommendation: C1 default during playoffs, C2 default outside playoffs, C3 as personalization-test arm. (b) `week.featured_games` feed — worth wiring for C1 or hardcode per NBA week?",
    engineering_hooks: [
      "Confirm `account_created` event fires reliably with attribution to signup source",
      "Wire `week.featured_games` Liquid feed (basketball-week metadata, refreshed weekly during NBA season)",
      "Confirm `customer.signup_source` in C.io customer attributes — add if absent",
    ],
  },

  // -----------------------------------------------------------------------
  {
    id: "fast-break-result-fix",
    position: 4,
    stack_item: "Fast Break Daily Result — fix + voice",
    hero: "/cards/daily-reminder.png",
    kind: "upgrade",
    headline:
      "PRODUCTION DEFECT: winners' claim links are malformed Liquid. AND the email has no voice. Fix today, upgrade after.",
    pills: {
      audience: "Fast Break players · daily result delivery · onboarding-first-win cohort",
      trigger: "Fast Break result event · daily during NBA season",
      kpi: "URL fix → claim CTR back to baseline · voice → engagement lift on win moment",
    },
    voice: "platform-chronicler",
    diagnosis: {
      state: "broken-in-prod",
      summary:
        "Onboarding First Win template (1133, on campaign #102) ships with a Liquid expression truncated mid-bracket: `?fastBreakId={{ event[`. Winners may be clicking malformed URLs right now. Same broken expression appears 2× (image link + button). Subject has grammar miss \"a NBA\" (should be \"an NBA\").",
      facts: [
        { label: "Subject (verbatim)", value: " 🎉 Congratulations! You've Just Won a NBA Top Shot Pack! 🎉" },
        { label: "Subject defect", value: "Leading space; \"a NBA\" should be \"an NBA\"" },
        { label: "URL Liquid (verbatim, truncated)", value: "https://nbatopshot.com/fastbreak/onboarding/claim?fastBreakId={{ event[" },
        { label: "Defect appears", value: "2× in template (image link + button)" },
        { label: "Last template update", value: "2025-03-12 — defect has been live for ~14 months" },
      ],
      campaigns: [
        { id: 102, name: "Fast Break | Daily Result v2", state: "running", url: "https://fly.customer.io/workspaces/161112/journeys/campaigns/102/overview", note: "Running with broken Liquid" },
      ],
    },
    before: {
      label: "What's shipping right now — template 1133 (Onboarding First Win)",
      subject: " 🎉 Congratulations! You've Just Won a NBA Top Shot Pack! 🎉",
      excerpt:
        "As a special reward, you've earned a NBA Top Shot Pack… Includes 10 Moments. [CLAIM MY PACK] → URL: https://nbatopshot.com/fastbreak/onboarding/claim?fastBreakId={{ event[",
      critique:
        "Two problems. (1) Production defect: the Liquid `{{ event[` is incomplete — closing bracket and field name are missing. The claim URL is not a working URL. (2) Voice is brand-celebratory exclamatory with two grammar misses. Win moment is the highest-engagement Fast Break event and we deliver it with broken plumbing and no substance.",
    },
    after: {
      // Phase H — Fast Break C1: ESPN Scoreboard · Game-Product UI
      c1: {
        label: "Phase H Candidate 1 — ESPN Scoreboard · Game-Product UI",
        from: "NBA Top Shot Fast Break <fastbreak@nbatopshot.com>",
        emailHero: {
          src: "/cards/infographics/fastbreak-scorecard.png",
          alt: "Fast Break scorecard — scoreboard typography, dark court background",
        },
        subject: "{{event.totalScore}} points. {{event.winRank}} on the slate.",
        preheader: "{{social_proof.fastBreak.classic_run_12_unique_openers_7d}} runners played. Most did not clear.",
        callouts: [
          { label: "{{event.totalScore | default: \"147\"}}", value: "points" },
          { label: "{{event.winRank | default: \"Top 8%\"}}", value: "on the slate" },
          { label: "1 pack", value: "earned · claim by {{event.claim_expires_at | date: \"%a %-l %p\"}}" },
        ],
        body: [
          "You called {{event.lineupPlayers | split: \" · \" | first | default: \"SGA\"}} first. The slate cleared at {{event.totalScore | default: \"147\"}}. {{social_proof.fastBreak.classic_run_12_unique_openers_7d | default: \"504\"}} runners came in this week — most of them did not clear.",
          "The pack is in your account. Claim it before {{event.claim_expires_at | date: \"%a %-l %p\"}}.",
        ],
        cta: "CLAIM THE PACK",
        voice_notes:
          "Phase H C1. ESPN-scoreboard register. UPPERCASE CTA is game-product convention (BANNED-08 carve-out: scoreboard register). CTA URL: https://nbatopshot.com/fast-break/claim?fastBreakId={{event.fastBreakId}} — fixes the broken Liquid from production template 1133. 5 behavioral hooks. 12/12 rubric. Roham comment: 'Design should look unique and different than the non-fast-break Top Shot emails.'",
      },
      // Phase H — Fast Break C2: Lineup Recap · Sports-Recap Narrative
      c2: {
        label: "Phase H Candidate 2 — Lineup Recap · Sports-Recap Narrative",
        from: "NBA Top Shot Fast Break <fastbreak@nbatopshot.com>",
        emailHero: {
          src: "/cards/infographics/fastbreak-scorecard.png",
          alt: "Fast Break scorecard",
        },
        subject: "Your lineup just hit Top 8%.",
        preheader: "{{event.lineupPlayers}}. {{event.totalScore}} points. Pack in your account.",
        body: [
          "Five players. {{event.lineupPlayers | default: \"SGA · Edwards · Mobley · Brunson · Bane\"}}.",
          "You called them before the slate. {{event.gameCount | default: \"4\"}} games later, the lineup cleared **{{event.totalScore | default: \"147\"}}** points. {{event.winRank | default: \"Top 8%\"}} of the {{social_proof.fastBreak.classic_run_12_unique_openers_7d | default: \"504\"}} runners who came in this week.",
          "Most lineups didn't clear. Mobley's defensive anchor work wasn't visible in the highlights but it showed up in the final score. SGA carried the scoring slot the way you bet he would.",
          "The pack is in your account. Window closes {{event.claim_expires_at | date: \"%a %-l %p\"}}.",
        ],
        cta: "Claim the pack",
        voice_notes:
          "Phase H C2. Sports-recap narrative register. Reads like a beat reporter writing up a result for a fan. Mixed-case CTA (conversational register; UPPERCASE only in C1 scoreboard). CTA URL: https://nbatopshot.com/fast-break/claim?fastBreakId={{event.fastBreakId}}. 7 behavioral hooks. 12/12 rubric.",
      },
      // Phase H — Fast Break C3: Streak-Context · Cohort-Density Signal
      c3: {
        label: "Phase H Candidate 3 — Streak-Context · Cohort-Density Signal",
        from: "NBA Top Shot Fast Break <fastbreak@nbatopshot.com>",
        emailHero: {
          src: "/cards/infographics/fastbreak-scorecard.png",
          alt: "Fast Break scorecard with streak overlay",
        },
        subject: "{{customer.fastbreak_win_streak}} in a row.",
        preheader: "{{event.totalScore}} points. {{customer.fastbreak_lifetime_wins}} lifetime wins.",
        callouts: [
          { label: "{{customer.fastbreak_win_streak | default: \"3\"}}", value: "consecutive wins" },
          { label: "{{customer.fastbreak_lifetime_wins | default: \"12\"}}", value: "lifetime" },
          { label: "{{event.winRank | default: \"Top 8%\"}}", value: "this slate · pack credited" },
        ],
        body: [
          "Three in a row.",
          "That is not the average runner profile. {{social_proof.fastBreak.classic_run_12_unique_openers_7d | default: \"504\"}} runners came in this week. Most didn't clear once. You're at three.",
          "The pack is in your account. Window closes {{event.claim_expires_at | date: \"%a %-l %p\"}}.",
        ],
        cta: "Claim the pack",
        voice_notes:
          "Phase H C3. Streak-context register — uses customer streak history as the lead. Only Fast Break can send this. CTA URL: https://nbatopshot.com/fast-break/claim?fastBreakId={{event.fastBreakId}}. 6 behavioral hooks: customer.fastbreak_win_streak, customer.fastbreak_lifetime_wins, event.fastBreakId, event.winRank, event.totalScore, event.claim_expires_at. Note: customer.fastbreak_win_streak + customer.fastbreak_lifetime_wins need Atlas consumer schema (blocked at dl-kaaos). Falls back to defaults until provisioned. 12/12 rubric.",
      },
    },
    reviewer_ask:
      "First: production defect ships today. ENG fix template 1133 broken Liquid URL (2 occurrences) immediately. Second: do `event.lineupPlayers`, `event.totalScore`, `event.winRank`, `event.gameCount`, `event.lineupSummary` exist on the result event payload — or do we need to add them? Third: UPPERCASE CTA carve-out for C1 scoreboard register — confirmed?",
    engineering_hooks: [
      "URGENT: fix template 1133 broken Liquid URL — production fix today",
      "Confirm `event.lineupPlayers`, `event.totalScore`, `event.winRank`, `event.gameCount`, `event.lineupSummary` on the Fast Break result event payload — add if missing",
      "customer.fastbreak_win_streak + customer.fastbreak_lifetime_wins need Atlas consumer schema (currently blocked at dl-kaaos — see CLAUDE.md open work)",
    ],
  },

  // -----------------------------------------------------------------------
  {
    id: "drop-announcement-programmatic",
    position: 5,
    stack_item: "Drop Announcements — programmatic conversion",
    hero: "/cards/drop-series.png",
    kind: "upgrade",
    headline:
      "~1,000 of 1,198 newsletters are drop one-offs. Same three-beat pattern, manually rebuilt every time. This is a programmatic loop posing as ops labor.",
    pills: {
      audience: "Segmented per drop · varies by team / tier / drop history",
      trigger: "drop_published event → series of emails over 72h window",
      kpi: "Reduce ops labor (~3-6h per drop) · increase consistency · cohort-aware send timing",
    },
    voice: "platform-chronicler",
    diagnosis: {
      state: "missing",
      summary:
        "1,198 newsletters in the workspace lifetime. ~1,000 are drop announcements. Same three-beat pattern every time: pre-drop / drop-live / drop-recap. Currently rebuilt by hand each week. No programmatic flow exists.",
      facts: [
        { label: "Lifetime newsletter count", value: "1,198" },
        { label: "Drop one-offs (estimate)", value: "~1,000 (~83%)" },
        { label: "Pattern", value: "Pre-drop announce → 24h reminder → live → 24h recap" },
        { label: "Per-drop labor", value: "~3-6 hours design+copy+QA per drop" },
        { label: "Programmatic drop campaigns existing", value: "0" },
      ],
      campaigns: [
        { id: 0, name: "(no programmatic drop campaign exists)", state: "missing", url: "https://fly.customer.io/workspaces/161112/journeys/broadcasts" },
      ],
    },
    after: {
      // Phase H — Drop Announcement C1: Cinematic Poster · ≤60 words
      c1: {
        label: "Phase H Candidate 1 — Cinematic Poster · ≤60 words",
        from: "NBA Top Shot <drops@nbatopshot.com>",
        emailHero: {
          src: "{{drop.hero_image | default: \"/cards/infographics/drop-cinematic.png\"}}",
          alt: "{{drop.set_name}} — full-bleed poster art",
          liquidCaption: "Curator-provided full-bleed drop art per drop. No text overlay.",
        },
        subject: "Cooper Flagg. Rookie Era. Thursday 8 PM ET.",
        preheader: "{{drop.moment_count}} Moments. {{drop.circulation_total}} mints. One queue.",
        body: [
          "The Rookie Era goes live Thursday at 8 PM ET. {{drop.moment_count | default: \"15\"}} Moments. {{drop.circulation_total | default: \"8,500\"}} mints. The queue opens 30 minutes early.",
          "Cooper Flagg, first overall, alongside the most complete prospects of the last 20 years. Minted as the rookie season happens. Sealed by the buzzer.",
        ],
        cta: "Set the reminder",
        voice_notes:
          "Phase H C1. Full-bleed cinematic poster — no callout grid, image is 80%+ of vertical space, prose is two declarative beats. Addresses Roham's 'Tables = spreadsheet feel. More interesting visual ways for exciting things.' Zero callout grid. Scoped legend language: 'most complete prospects of the last 20 years' (not 'since LeBron'). 11/12 rubric (D4 cinematic-cap intentional). SHIP.",
      },
      // Phase H — Drop Announcement C2: Chronicler-Narrative · Curator-Voice Prose
      c2: {
        label: "Phase H Candidate 2 — Chronicler-Narrative · Curator-Voice Prose",
        from: "NBA Top Shot <drops@nbatopshot.com>",
        emailHero: {
          src: "{{drop.hero_image | default: \"/cards/infographics/drop-cinematic.png\"}}",
          alt: "{{drop.set_name}}",
          liquidCaption: "{{drop.set_name}} · top-aligned ~40% vertical space",
        },
        subject: "What the Rookie Era set documents.",
        preheader: "Curator note. Drop is Thursday. The argument is in the prose.",
        body: [
          "Cooper Flagg is the first Duke player to go #1 since Zion. The pre-draft scouting record placed him alongside the most complete prospects of the last 20 years.",
          "The Rookie Era set documents that arc as it happens — 15 Moments, 8,500 mints, one season, sealed game-by-game. {{drop.curator_name | default: \"The curator\"}} put it this way: it's the set every collector who came in 2026 will be measured against five years from now.",
          "The argument the market is making in advance: a comparable Wembanyama drop generated **{{drop.previous_comparable.secondary_tx_7d | default: \"501\"}} secondary transactions in the first seven days**. Floor settled at {{drop.previous_comparable.floor_today | default: \"$148\"}}. The Flagg floor will be set before the open market prices it.",
          "{% if customer.last_pack_purchased_at %}You opened your last pack on {{customer.last_pack_purchased_at | date: \"%B %-d\"}}.{% endif %}",
        ],
        cta: "Set the reminder",
        voice_notes:
          "Phase H C2. Prose-curator-paragraph frame. 138 words. One image at top + prose column (Stratechery register). Wembanyama 501-secondary-txns inline in a sentence, not in a table row. Addresses 'different kinds of frames' — this is distinct from C1 (poster) and C3 (market tape). 12/12 rubric. SHIP.",
      },
      // Phase H — Drop Announcement C3: Scarcity Arithmetic · Bloomberg-Tape Minimal
      c3: {
        label: "Phase H Candidate 3 — Scarcity Arithmetic · Bloomberg-Tape Minimal",
        from: "NBA Top Shot <drops@nbatopshot.com>",
        emailHero: {
          src: "/cards/infographics/drop-brief.png",
          alt: "{{drop.set_name}} data-card variant",
          liquidCaption: "Data-card variant — confirmed in directory. Small, top-right, ~25% vertical space.",
        },
        subject: "{{drop.circulation_total}} mints. One queue. Thursday.",
        preheader: "Three lines of arithmetic. The drop is Thursday at 8.",
        body: [
          "**8,500 mints. 15 Moments. Queue opens 7:30 PM ET.**",
          "**Wembanyama comparable: 501 secondary transactions in week one. Floor settled $148.**",
          "**Bronny Playoffs comparable: 156 open offers, top sale $169.**",
          "Thursday. 8 PM ET. The Rookie Era.",
        ],
        cta: "Set the reminder",
        voice_notes:
          "Phase H C3. Market-tape frame — three bolded sentences, NOT a table. Reads like a Bloomberg ticker. Three real BQ comparables (Wemby 501 + Bronny 156/169) per social_proof.drop in mockData. 38 words. 5 behavioral hooks. Addresses Roham's 'more interesting visual ways for exciting things' — the market-tape is the most novel silhouette. 12/12 rubric. SHIP.",
      },
    },
    reviewer_ask:
      "Two: (a) C1 (poster), C2 (prose column), C3 (market-tape) — send all three to A/B/C across the dormant list and hold the winner? My read: yes; the market-tape (C3) is the one I'd most like to see real CTR data on. (b) curator-writes-one-paragraph structure right, or does each drop need bespoke design?",
    engineering_hooks: [
      "Define `drop_published` event with structured metadata (name, set, tier, circulation, moment_count, marquee_player, legend, starting_price, queue/live timestamps, curator_note)",
      "Stand up programmatic campaign in C.io triggered on this event",
      "Stop the manual newsletter recreation — measure time saved (~3-6h/drop)",
    ],
  },

  // -----------------------------------------------------------------------
  {
    id: "abandoned-cart",
    position: 6,
    stack_item: "Abandoned Cart — voice upgrade (lowest rework)",
    hero: "/cards/winback.png",
    kind: "upgrade",
    headline:
      "Only programmatic email with paragraph copy and a person gesturing at the reader. Cliché metaphor. Dense Liquid scaffolding intact — drop the cliché, swap in chronicler voice.",
    pills: {
      audience: "Started a Marketplace purchase, didn't complete · personalized to specific player Moment",
      trigger: "abandoned_cart event · fires shortly after",
      kpi: "Recovery rate · current % unknown (baseline pull pending)",
    },
    voice: "platform-chronicler",
    diagnosis: {
      state: "running-flat",
      summary:
        "Only template in the live stack with paragraph copy. Uses dense Liquid (player/set/team/parallel). Voice itself is clichéd — \"the best NBA players know how to close out a game\" — but the Liquid scaffolding is sound. Easiest stack item to upgrade.",
      facts: [
        { label: "Subject (verbatim)", value: "Time To Finish What You Started for a {{event.player}} Moment!" },
        { label: "Liquid usage", value: "Heavy: player, playCategory, setName, teamAtMoment, momentFlowID" },
        { label: "CTA", value: "1 styled button (FINISH YOUR PURCHASE) + linked Moment image" },
        { label: "Voice issue", value: "Sports-cliché opener: \"The best NBA players know how to close out a game...\"" },
      ],
      campaigns: [
        { id: 18, name: "Marketing | Abandoned Cart", state: "running", url: "https://fly.customer.io/workspaces/161112/journeys/campaigns/18/overview", note: "Running, voice-clichéd" },
      ],
    },
    before: {
      label: "Currently sending — template 74",
      subject: "Time To Finish What You Started for a {{event.player}} Moment!",
      excerpt:
        "The best NBA players know how to close out a game. You recently started to purchase a {{event.player}} - {{event.playCategory}} - {{event.setName}} Moment for your {{event.teamAtMoment}} collection — but decided to pass instead of taking the shot.",
      critique:
        "Sports-cliché opener does the brand a disservice. \"Decided to pass instead of taking the shot\" is condescending. Liquid scaffolding is solid — every variable is the right one — but the wrapper around it doesn't deliver any substance. No comp data, no set context, no urgency grounded in fact. Just a metaphor.",
    },
    after: {
      // Phase H — Abandoned Cart C1: Social-Proof Headline · Roham's Exact Brief
      c1: {
        label: "Phase H Candidate 1 — Social-Proof Headline · Roham's Exact Brief",
        from: "NBA Top Shot <hello@nbatopshot.com>",
        emailHero: {
          src: "{{event.moment_image_url | default: \"/cards/infographics/moment-hero-placeholder.png\"}}",
          alt: "{{event.player}} {{event.playCategory}} — {{event.setName}}",
          liquidCaption: "{{event.player}} · {{event.setName}} · serial #{{event.serial}}",
        },
        subject: "75 collectors bought a Mitchell Moment yesterday.",
        preheader: "The one you opened a cart on is still here. $245 ask, $312 last band-comp.",
        body: [
          "**{{event.last_24h_sales | default: \"75\"}} collectors bought a {{event.player | default: \"Donovan Mitchell\"}} Moment in the last 24 hours.** The highest cleared at **{{event.last_24h_max | default: \"$1,500\"}}**.",
          "The one you opened a cart on — {{event.player | default: \"Donovan Mitchell\"}}'s {{event.playCategory | default: \"Pull-Up Three\"}}, serial #{{event.serial | default: \"2,418\"}} of {{event.circulationCount | default: \"3,500\"}} — is still on the listing.",
          "In the same serial band over the last 72 hours: {% for sale in event.recent_serial_band_sales limit:2 %}{{sale.serial_range}} cleared {{sale.amount}}{% if forloop.last == false %}; {% endif %}{% endfor %}.",
          "{% if customer.team_count_at_moment %}{{customer.team_count_at_moment}} other Cleveland Moments are in your collection.{% endif %} The door is open if you want it.",
        ],
        cta: "Open the cart",
        voice_notes:
          "Phase H C1. Social-proof-headline-led — literal first sentence is Roham's verbatim brief: 'Hey, others have purchased moments from X player.' Three layers of social proof: cohort (75 buyers), price ($1,500 ceiling), personal-cohort (team_count_at_moment). BANNED-06 ('hasn't moved') not present. 7 behavioral hooks. 12/12 rubric. Roham comment addressed: 'Emphasize much more social proof everywhere — pull the data and use it completely.'",
      },
      // Phase H — Abandoned Cart C2: Moment-as-Hero · Image-Led
      c2: {
        label: "Phase H Candidate 2 — Moment-as-Hero · Image-Led",
        from: "NBA Top Shot <hello@nbatopshot.com>",
        emailHero: {
          src: "{{event.moment_image_url | default: \"/cards/infographics/moment-hero-placeholder.png\"}}",
          alt: "{{event.player}} {{event.playCategory}} — {{event.setName}}",
          liquidCaption: "Full-bleed Moment image, ~70% vertical space. The Moment IS the hero.",
        },
        subject: "Pull-Up Three. Cleveland. Serial #{{event.serial}}.",
        preheader: "75 collectors bought a Mitchell Moment yesterday. Yours is still here.",
        body: [
          "The play already happened. Donovan Mitchell, Pull-Up Three, in a Cleveland jersey, in Eastern Conference Run. Serial #{{event.serial | default: \"2,418\"}} of {{event.circulationCount | default: \"3,500\"}}.",
          "In the last 24 hours, **{{event.last_24h_sales | default: \"75\"}} collectors bought a Mitchell Moment on the Marketplace.** Most recent band-comp: {{event.recent_serial_band_sales[0].amount | default: \"$312\"}}.",
          "The listing is at {{event.listing_price | default: \"$245\"}}.",
        ],
        cta: "Open the cart",
        voice_notes:
          "Phase H C2. Moment-as-hero, image-dominant (~70% vertical). Social proof as inline sentence in body line 2 (supporting the Moment, not leading). Tests Moment-image-first vs social-proof-first in recovery CTR. 7 behavioral hooks. 12/12 rubric.",
      },
      // Phase H — Abandoned Cart C3: Serial-Band-Tight · Focused Cohort Proof
      c3: {
        label: "Phase H Candidate 3 — Serial-Band-Tight · Focused Cohort Proof",
        from: "NBA Top Shot <hello@nbatopshot.com>",
        emailHero: {
          src: "{{event.moment_image_url | default: \"/cards/infographics/moment-hero-placeholder.png\"}}",
          alt: "{{event.player}} {{event.playCategory}} — {{event.setName}}",
          liquidCaption: "Small, top-aligned, ~30% vertical. Body carries the proof.",
        },
        subject: "Three collectors bought your serial band this week.",
        preheader: "Mitchell Pull-Up Three. Sub-3K serials cleared $287-$312 in 7 days.",
        body: [
          "In the last 7 days, **3 collectors bought a Mitchell Pull-Up Three serial inside or adjacent to yours.**",
          "{% for sale in event.recent_serial_band_sales %}- Serial {{sale.serial_range}} cleared **{{sale.amount}}** ({{sale.sold_at | date: \"%b %-d\"}})\n{% endfor %}",
          "Your serial — #{{event.serial | default: \"2,418\"}} of {{event.circulationCount | default: \"3,500\"}} — is listed at {{event.listing_price | default: \"$245\"}}. The asks are tight; the band is tight; {{event.weekly_player_buyers | default: \"47\"}} collectors bought a Mitchell Moment of any tier this week.",
        ],
        cta: "Open the cart",
        voice_notes:
          "Phase H C3. Tight-band cohort — where C1 is broad (75 buyers across all Mitchell), C3 is tight (3 buyers in your specific band). Tests whether a smaller-but-more-relevant cohort number lifts urgency without manufacturing it. Three cohort layers: 3 in your band, 75 of any Mitchell, 47 weekly buyers. BANNED-05 (manufactured urgency) avoided — 'the band is tight' is descriptive, not theatrical. 12/12 rubric.",
      },
    },
    reviewer_ask:
      "Two: (a) is C1 the lead candidate (Roham's brief is literally C1's first sentence), or test all three? My read: C1 is the lead, C2 + C3 are the test arms. (b) `event.recent_serial_band_sales` — worth building (BQ → C.io derived event field)?",
    engineering_hooks: [
      "Add `event.recent_serial_band_sales` derived field on the abandoned_cart event (top 3 recent sales in the same serial band)",
      "Add `event.last_24h_sales`, `event.last_24h_max`, `event.weekly_player_buyers` to cart event payload — per-player BQ lookup at send time",
      "A/B against current cliché version — 50/50 cohort split",
    ],
  },

  // -----------------------------------------------------------------------
  {
    id: "whale-tier-concierge",
    position: 7,
    stack_item: "Whale-tier concierge surface (Magic-observational)",
    hero: "/cards/whale-tier.png",
    kind: "upgrade",
    headline:
      "L4/L5 collectors get the same email stack as a Day-1 account. No tier-aware concierge surface exists. PARKED per Phase G/H scope — prerequisites (L4/L5 definition, BQ cohort sizing, Matt Schorr desk confirmation) not yet met.",
    pills: {
      audience: "L4/L5 collectors · lifetime spend ≥ $XX,XXX · BQ-defined cohort",
      trigger: "Whale-segment membership · weekly cadence (1× max)",
      kpi: "Whale retention · concierge engagement · whale-driven Marketplace volume",
    },
    voice: "magic-observational",
    diagnosis: {
      state: "missing",
      summary:
        "No tier-aware programmatic surface exists. The collectors who drive the largest share of Marketplace volume receive the same Pack Received receipt and Abandoned Cart cliché as a Day-1 account. Relationship layer is distributed across humans (Matt, Kenny, Guy, Sam) — no programmatic complement. PARKED: prerequisites not met. Build list: (A) define L4/L5 lifetime-spend thresholds; (B) BQ cohort sizing; (C) Matt Schorr desk confirmation; (D) whale.hold_recommendation automation path.",
      facts: [
        { label: "Whale-tier C.io campaigns existing", value: "0" },
        { label: "Tier-aware Liquid in current stack", value: "0 templates check `lifetime_stage` or whale flags" },
        { label: "L4/L5 size", value: "BQ pull pending (need lifetime-spend thresholds defined)" },
        { label: "Park status", value: "Parked per Phase G/H CMO framework. Prerequisites A-D above must be met before drafting goes live." },
      ],
      campaigns: [
        { id: 0, name: "(no whale-tier campaign exists)", state: "missing", url: "https://fly.customer.io/workspaces/161112/journeys/campaigns" },
      ],
    },
    after: {
      // Single deferred placeholder — Whale is parked per Phase G/H scope.
      // No c2 or c3. c1 is a deferred banner, not a sendable draft.
      c1: {
        label: "DEFERRED — Parked per CMO framework. Prerequisites: (A) L4/L5 definition; (B) BQ cohort sizing; (C) Matt Schorr desk confirmation; (D) whale.hold_recommendation automation path.",
        from: "L+XL Desk · NBA Top Shot <desk@nbatopshot.com>",
        subject: "[PARKED] Whale-tier concierge — not yet ready to draft",
        preheader: "Prerequisites A-D not met. See diagnosis for details.",
        body: [
          "This card is parked per the Phase G/H CMO framework. The whale-tier concierge surface requires four prerequisites before drafting goes live:",
          "A. Define L4/L5 lifetime-spend thresholds (Roham + Dan decision).",
          "B. BQ cohort sizing — exact count of L4/L5 collectors against defined thresholds.",
          "C. Matt Schorr desk confirmation — does he want this surface, or does it conflict with his Friday Lunch DM cadence?",
          "D. whale.hold_recommendation automation path — automated from BQ comp signals or Magic-curated weekly?",
          "When prerequisites are met, Phase I will draft three concierge candidates using the rebuilt v1/v2/v3/v4 content from Phase G as the starting reference.",
        ],
        cta: "Unlock prerequisites first",
        voice_notes:
          "DEFERRED. Not a sendable draft. This placeholder exists so the deck stays at 7 cards and reviewers can see the park status without losing the Whale card entirely. Phase I will replace this with 3 real concierge candidates once prerequisites are confirmed.",
      },
    },
    reviewer_ask:
      "Four prerequisites before Whale drafting goes live: (a) define L4/L5 lifetime-spend thresholds; (b) BQ cohort sizing; (c) does Matt want this surface or does it step on his Friday Lunch DM cadence? (d) whale.hold_recommendation — automated from BQ or Magic-curated weekly?",
    engineering_hooks: [
      "Define `lifetime_stage` profile attribute with L1-L5 thresholds (lifetime spend bands)",
      "Build whale-pattern attributes — top 3 weekly patterns relevant to user's holdings",
      "Wire weekly cron-triggered campaign with segment-membership filter",
    ],
  },
];

export const REASONS = [
  "Voice doesn't match Top Shot brand",
  "Too much text — needs more image",
  "Not enough text — needs context",
  "Audience definition is off",
  "Trigger / timing is wrong",
  "KPI estimate isn't credible",
  "Engineering hook is too heavy",
  "Risks the brand",
  "Could be more specific",
  "Wrong priority (not bread-and-butter)",
  "Liquid scaffolding won't work",
];
