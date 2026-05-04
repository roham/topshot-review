// v1002 — Customer.io upgrade cards with 4-variant After blocks.
// Voice mix: v1001 (current platform-chronicler) + 3 alternate frames:
//   - almanac:   Frame A — Stratechery-style chronicler-statesman
//   - cinematic: Frame B — Topps-style sensationalized legend
//   - brief:     Frame C — Bloomberg-style market reporter
// Voting captures (card × variant) so the team can see which frame wins per stack item.

export type CardKind = "upgrade";

export type UpgradeState =
  | "stopped"
  | "broken-in-prod"
  | "missing"
  | "running-flat";

export type VoiceMode = "platform-chronicler" | "magic-observational";

export type AfterVariantId = "v1001" | "almanac" | "cinematic" | "brief" | "primary" | "alt_a" | "alt_b";

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
    v1001: AfterBlock;
    almanac: AfterBlock;
    cinematic: AfterBlock;
    brief: AfterBlock;
    primary?: AfterBlock;
    alt_a?: AfterBlock;
    alt_b?: AfterBlock;
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
      v1001: {
        label: "Proposed v1001 — Reactivation Email 1 (60-day-dormant L2 cohort, with-purchases)",
        from: "NBA Top Shot <hello@nbatopshot.com>",
        emailHero: {
          src: "/cards/infographics/reactivation-cinematic.png",
          alt: "NBA Top Shot — your collection",
        },
        subject: "Three Moments in your collection are moving this week.",
        preheader: "Round 2 of the 2026 Playoffs is live. Here's where your wallet sits.",
        callouts: [
          { label: "Your collection", value: "{{customer.lifetime_moments_owned}} Moments · since {{customer.first_session_at | date: \"%b %Y\"}}" },
          { label: "Last session", value: "{{customer.last_session_days_ago}} days ago" },
          { label: "Round 2 status", value: "{{week.featured_games}} · live this week" },
        ],
        body: [
          "Round 2 of the 2026 NBA Playoffs is live. The Moments minted from these games will be priced against by the next year of the secondary market.",
          "**Three Moments in your wallet are moving:**",
          "{% for moment in customer.notable_holdings_moving %}",
          "• **{{moment.player}} — {{moment.set}}, serial #{{moment.serial}}.** Bought {{moment.bought_at | date: \"%b %Y\"}} for {{moment.bought_price}}. Floor today: {{moment.floor_today}}. Comparable serial last cleared at **{{moment.recent_comp}}**.",
          "{% endfor %}",
          "Your wallet has been positioned for this since {{customer.first_session_at | date: \"%Y\"}}. The market is starting to catch up.",
        ],
        cta: "View your collection",
        voice_notes:
          "Platform-chronicler. Opens with basketball context (Round 2 chronicling), structured callouts on user state, structured Moment-by-Moment data with floor/comp. No 'I.' No personal letter framing. Same factual rhythm as a Topps drop announcement, applied to a personalized re-engagement.",
      },
      almanac: {
        label: "Frame A — Almanac · Reactivation Email 1 (60d-dormant L2, with-purchases)",
        from: "NBA Top Shot <hello@nbatopshot.com>",
        emailHero: {
          src: "/cards/infographics/reactivation-almanac.png",
          alt: "NBA Top Shot — Round 2 of the 2026 Playoffs",
          liquidCaption: "Round 2 of the 2026 NBA Playoffs · live this week",
        },
        subject: "Round 2 is the loudest window we've had in two years.",
        preheader: "Three Moments in your wallet are moving. Here is where each one sits today.",
        callouts: [
          { label: "Your collection", value: "{{customer.lifetime_moments_owned}} Moments · holding since {{customer.first_session_at | date: \"%b %Y\"}}" },
          { label: "Last session", value: "{{customer.last_session_days_ago}} days ago" },
          { label: "Round 2 status", value: "{{week.featured_games}}" },
          { label: "Marketplace temperature", value: "Embiid up 3.2× the day his R2 was confirmed; Cade comeback arc cleared $0.28 the morning of the G7" },
        ],
        body: [
          "Round 2 of the 2026 Playoffs is the loudest market window NBA Top Shot has had since the 2024 run. Fourteen Game 7s in fifteen days. Cooper Flagg's first postseason. Banchero's elimination on a one-buyer Moment that cleared $0.28 the morning of his exit. The collectors who held through 2024–2025 are watching the floor catch up to where they bought it.",
          "You opened your account in {{customer.first_session_at | date: \"%Y\"}}. Your wallet has been positioned for this since.",
          "**Three Moments in your collection are moving:**",
          "{% for moment in customer.notable_holdings_moving %}",
          "- **{{moment.player}} — {{moment.set}}, serial #{{moment.serial}}.** Bought {{moment.bought_at | date: \"%b %Y\"}} at {{moment.bought_price}}. Floor today: {{moment.floor_today}}. The most recent comparable serial cleared at **{{moment.recent_comp}}** on {{moment.recent_comp_at | date: \"%b %-d\"}}.",
          "{% endfor %}",
          "The pattern across these three is the same pattern across the cohort. The market is starting to ratify what long-time holders already know: a Moment from a confirmed playoff run is worth more than a Moment from a regular-season night. Narrative density is the price driver. Embiid's appendectomy-comeback path produced 54 transactions in 24 hours; Brunson's expected 2-seed advance produced zero. The market reads what happened.",
          "Round 2 closes inside two weeks. The next year of secondary pricing will be set against the Moments minted from these games.",
        ],
        cta: "View your collection",
        voice_notes:
          "Frame A opens the email as a statesman writing to a fellow long-time holder — \"the loudest window we've had in two years\" stakes the time horizon. Anchors directly in the long-time-collector identity (\"holding since {{first_session_at}}\"). Embiid 3.2× and Brunson zero are quoted as evidence of the narrative-density mechanic, not as hype. v1001's reactivation is shorter, more transactional. v1002 takes 60 more words to build the cohort-wide thesis the collector is part of.",
      },
      cinematic: {
        label: "Frame B — Cinematic · Reactivation Drip",
        from: "NBA Top Shot <drops@nbatopshot.com>",
        emailHero: {
          src: "/cards/infographics/reactivation-cinematic.png",
          alt: "NBA Top Shot — Reactivation Cinematic",
          liquidCaption: "Dynamic option: {{customer.notable_holdings_moving.[0].image_url}} for personalized hero",
        },
        subject: "You were here first.",
        preheader: "The Cooper Flagg era opens. Your serials predate it.",
        callouts: [
          { label: "Your first session", value: "{{customer.first_session_at | date: \"%B %Y\"}}" },
          { label: "Round 2 of 2026", value: "Live this week" },
          { label: "Cooper Flagg Era", value: "Begins Drop 1 · May 20" },
        ],
        body: [
          "The market is loud again. **Round 2 is live.** Cooper Flagg drops in two weeks.",
          "Three Moments in your wallet are **moving right now**: {% for moment in customer.notable_holdings_moving %}**{{moment.player}} #{{moment.serial}}** ({{moment.floor_today}}){% unless forloop.last %}, {% endunless %}{% endfor %}.",
          "You bought receipts on history before the rest knew. **The rest is showing up.**",
        ],
        cta: "SEE WHAT'S MOVING",
        voice_notes:
          "Mythic-cinematic reactivation. v1001 was a structured chronicler (\"Three Moments in your collection are moving this week\"). v1002 makes the dormant collector the *legend who got there first* — Cooper Flagg as the cultural arrival moment they were positioned for. Sparse, declarative. Sentiment theme 1 (Cooper Flagg scarcity narrative) drives the emotional pull; the dormant whale's history is the cinematic spine.",
      },
      brief: {
        label: "Frame C — Brief · Reactivation",
        from: "NBA Top Shot Marketplace <market@nbatopshot.com>",
        emailHero: {
          src: "/cards/infographics/reactivation-brief.png",
          alt: "7-day sparkline of customer's top 3 moving Moments",
          liquidCaption: "Dynamic per wallet — auto-rendered sparkline chart",
        },
        subject: "Round 2 lifted 3 of your Moments above last-month floor.",
        preheader: "{{customer.notable_holdings_moving | size}} positions moved >10% in 7d. Comps inside.",
        callouts: [
          { label: "Last session", value: "{{customer.last_session_days_ago}}d ago" },
          { label: "Wallet size", value: "{{customer.lifetime_moments_owned}} Moments · entered {{customer.first_session_at | date: \"%b %Y\"}}" },
          { label: "Top mover (7d)", value: "{{customer.notable_holdings_moving[0].player}} · {{customer.notable_holdings_moving[0].pct_change}} · floor {{customer.notable_holdings_moving[0].floor_today}}" },
          { label: "Mover #2", value: "{{customer.notable_holdings_moving[1].player}} · {{customer.notable_holdings_moving[1].pct_change}} · last comp {{customer.notable_holdings_moving[1].recent_comp}}" },
          { label: "Mover #3", value: "{{customer.notable_holdings_moving[2].player}} · {{customer.notable_holdings_moving[2].pct_change}} · last comp {{customer.notable_holdings_moving[2].recent_comp}}" },
          { label: "Supply ratio", value: "63:1 today vs. 13:1 in Feb 2021 · context for floor reads" },
        ],
        body: [
          "Round 2 priced what you bought in {{customer.first_session_at | date: \"%Y\"}}. Three positions moved on last week's tape. Comps above are last 7d clears in your serial band.",
          "Floors held through Phase 4 elimination on the cohort tracked since G7.",
        ],
        cta: "Open your dashboard",
        voice_notes:
          "v1001 narrates Round 2 as a chronicled chapter and re-anchors collector identity. Frame C reports the tape: three deltas, three comps, supply-ratio context, exit. Reads as a position update on a wallet, not a re-engagement letter.",
      },
    },
    reviewer_ask:
      "Three: (a) is the personalization scope right (BQ → Customer.io profile attribute sync for `notable_holdings_moving`), or do we need a simpler v1 with just one Moment? (b) two cohort variants (L1 never-bought vs. L2 with-purchases) — sufficient, or do we need finer cuts? (c) single touch, or 3-email drip?",
    engineering_hooks: [
      "Build `customer.notable_holdings_moving` profile attribute (BQ → C.io sync of top 3 owned Moments by 7d-volume change)",
      "Add `customer.last_session_days_ago` derived attribute",
      "Wire two segments: (i) L2 with_purchases AND last_session > 60d; (ii) L1 never_bought AND last_session > 30d",
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
      v1001: {
        label: "Proposed v1001 — Pack Received with set-chronicler voice + structured data",
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
        ],
        body: [
          "**{{event.setName}}** chronicles {{event.set_chronicler_note}}.",
          "Three Moments inside this pack. The order packs were created determines the serials you pulled. Some collectors pull a #1 of a tier. Some pull a low-print parallel that won't appear in another pack for months.",
          "**On the Marketplace this week, from {{event.setName}}:**",
          "{% for sale in event.set_top_3_recent_sales %}",
          "• {{sale.player}} {{sale.play}} cleared **{{sale.amount}}** ({{sale.sold_at | date: \"%b %-d\"}})",
          "{% endfor %}",
        ],
        cta: "Open your pack",
        voice_notes:
          "Platform-chronicler. Opens with the set as a chronicler statement (\"{{setName}} chronicles X\"). Structured callouts above body, marketplace facts in body. No 'I,' no personal-letter, no Magic sign-off. Treats pack arrival as the launch of a chronicled set, not a personal moment.",
      },
      almanac: {
        label: "Frame A — Almanac · Pack Received with set-chronicler narrative",
        from: "NBA Top Shot <hello@nbatopshot.com>",
        emailHero: {
          src: "/cards/infographics/pack-received-almanac.png",
          alt: "{{event.packTitle}} pack art",
          liquidCaption: "{{event.setName}} · {{event.setTier}} tier",
        },
        subject: "Your {{event.packTitle}} just landed. The set inside, chronicled.",
        preheader: "{{event.set_marquee_player}} headlines. {{event.setTier}} tier. {{event.setMomentCount}} Moments across the run.",
        callouts: [
          { label: "The set", value: "{{event.setName}} · {{event.setTier}} tier · {{event.setMomentCount}} Moments across the run" },
          { label: "Your pack", value: "3 Moments · serials already minted, already assigned to you" },
          { label: "Marquee", value: "{{event.set_marquee_player}}" },
          { label: "Set chronicled by", value: "{{event.set_curator_name}}" },
        ],
        body: [
          "**{{event.setName}}** chronicles {{event.set_chronicler_note}}.",
          "Three Moments are inside this pack. They were minted before the pack was assembled, and the order packs were created determines the serials you pulled. Some collectors open the first pack of a set and find a #1 of the tier. Some open the last pack of a set and find a low-print parallel that will not appear in another pack for months. The serial is the document; the document is permanent.",
          "Three serials are now yours. There is no copy of any Moment with the same serial number.",
          "**On the Marketplace this week, from {{event.setName}}:**",
          "{% for sale in event.set_top_3_recent_sales %}",
          "- {{sale.player}} {{sale.play}} cleared **{{sale.amount}}** ({{sale.sold_at | date: \"%b %-d\"}})",
          "{% endfor %}",
          "Open your pack to see which three Moments — and which three serials — were assigned to you.",
        ],
        cta: "Open your pack",
        voice_notes:
          "Frame A treats the set as an artifact being chronicled, not an inventory item being shipped. The \"play itself, not a clip\" line is a deliberate counter to the \"five-second video\" critique surfaced in lapsed-collector sentiment (Theme B-2). Three recent comp sales embed C-evidence inside a B-narrative. v1001 is tight and structural; v1002 lingers on serial-as-document and the permanence frame, then closes with the \"which three serials were assigned to you\" curiosity gap.",
      },
      cinematic: {
        label: "Frame B — Cinematic · Pack Received",
        from: "NBA Top Shot <drops@nbatopshot.com>",
        emailHero: {
          src: "/cards/infographics/pack-received-cinematic.png",
          alt: "Your {{event.packTitle}} pack",
          liquidCaption: "Dynamic per pack — full-bleed pack art is the hero",
        },
        subject: "Three Moments. Already yours.",
        preheader: "{{event.set_marquee_player}} headlines. The serials are minted.",
        callouts: [
          { label: "The set", value: "{{event.setName}} · {{event.setTier}}" },
          { label: "Circulation", value: "{{event.setMomentCount}} Moments" },
          { label: "Inside", value: "3 serials · already assigned" },
        ],
        body: [
          "**The plays already happened.** Now they're yours.",
          "Three Moments inside. **Real serials. On-chain. The footage of the second it happened** — not a clip, not a card scan.",
          "{{event.set_marquee_player}} headlines this run.",
        ],
        cta: "OPEN THE PACK",
        voice_notes:
          "Frame B treats pack arrival as a cinematic reveal, not a chronicled set launch. v1001 led with set chronicler-note + marketplace comp data. v1002 leans on the documentary frame (\"the footage of the second it happened\") as mythic positioning vs. Topps Now / YouTube highlights. Three callout rows, three short body lines, one dramatic CTA.",
      },
      brief: {
        label: "Frame C — Brief · Pack Receipt",
        from: "NBA Top Shot Marketplace <market@nbatopshot.com>",
        emailHero: {
          src: "{{event.setcard_image_url}}",
          alt: "Set data card — circulation, tier, marquee",
          liquidCaption: "Dynamic data card per set — {{event.setFlowID}} · small footprint, no full-bleed art",
        },
        subject: "Pack landed: {{event.setName}} · marquee {{event.set_marquee_player}}.",
        preheader: "{{event.setTier}} tier · 3 Moments · last 7d clears below.",
        callouts: [
          { label: "Set", value: "{{event.setName}} · {{event.setTier}} · {{event.setMomentCount}} Moments" },
          { label: "Pack", value: "3 Moments · serials assigned at mint" },
          { label: "Marquee", value: "{{event.set_marquee_player}}" },
          { label: "7d set volume", value: "{{event.set_7d_volume_count}} sales · median {{event.set_7d_median_price}}" },
          { label: "Top clear (7d)", value: "{{event.set_top_3_recent_sales[0].player}} · {{event.set_top_3_recent_sales[0].amount}} · {{event.set_top_3_recent_sales[0].sold_at | date: \"%b %-d\"}}" },
          { label: "Floor", value: "{{event.set_floor_today}} · {{event.set_floor_change_7d}} vs 7d ago" },
        ],
        body: [
          "Pack delivered. Set is live on the secondary; recent comps above. Open inside the app to reveal serials.",
        ],
        cta: "Open your pack",
        voice_notes:
          "v1001 frames the pack as the launch of a chronicled set. Frame C frames it as a position acquired into a live secondary market — set tape, floor, top clear, all visible on receipt.",
      },
      // ── Phase 1 Candidates ──────────────────────────────────────────────
      primary: {
        label: "Phase 1 Candidate 1 — Primary: Refreshed v1001 chronicler-lite + Phase 1B data",
        from: "NBA Top Shot <hello@nbatopshot.com>",
        emailHero: {
          src: "{{event.packImageURL}}",
          alt: "{{event.setName}} pack art — animated",
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
          "v1001 SHIP body preserved verbatim through paragraph two, with Phase 1B cohort signal added as a single closing observation. Smallest possible delta from the canonical SHIP that integrates Phase 1B data. 11 inline Liquid refs. 58/60 rubric score. PRIMARY RECOMMENDATION.",
      },
      alt_a: {
        label: "Phase 1 Candidate 2 — Alternate A: Cohort-density frame",
        from: "NBA Top Shot <hello@nbatopshot.com>",
        emailHero: {
          src: "{{event.packImageURL}}",
          alt: "{{event.setName}} pack art — animated",
        },
        subject: "Your {{event.packTitle}} landed. {{event.social_proof.set_buyers_7d}} collectors bought into this set this week.",
        preheader: "{{event.set_marquee_player}} headlines. Top clear {{event.social_proof.set_top_sale_amount}}. Three Moments inside your pack.",
        callouts: [
          { label: "The set", value: "{{event.setName}} · {{event.setTier}} · {{event.setMomentCount}} Moments" },
          { label: "Your pack", value: "3 Moments · serials already assigned" },
          { label: "This week", value: "{{event.social_proof.set_buyers_7d}} buyers · {{event.social_proof.set_transactions_7d}} sales · {{event.social_proof.set_volume_usd_7d}} cleared" },
          { label: "Top clear", value: "{{event.social_proof.set_top_sale_player}} {{event.social_proof.set_top_sale_tier}} · {{event.social_proof.set_top_sale_amount}}" },
        ],
        body: [
          "**{{event.setName}}** chronicles {{event.set_chronicler_note}}.",
          "{{event.social_proof.set_buyers_7d}} collectors bought into this set in the last seven days. {{event.social_proof.set_transactions_7d}} sales, {{event.social_proof.set_volume_usd_7d}} cleared. {{event.social_proof.set_top_sale_player}} {{event.social_proof.set_top_sale_tier}} cleared **{{event.social_proof.set_top_sale_amount}}** at the top of the band.",
          "Three Moments are inside your pack. Serials minted before the pack was assembled, assigned in the order packs were created. The set you are now holding into is the same set those {{event.social_proof.set_buyers_7d}} collectors bought into.",
          "**Recent comps from {{event.setName}}:**",
          "{% for sale in event.set_top_3_recent_sales %}• {{sale.player}} {{sale.play}} cleared **{{sale.amount}}** ({{sale.sold_at | date: \"%b %-d\"}}){% endfor %}",
        ],
        cta: "Open your pack",
        voice_notes:
          "Cohort-chronicler. Same register as v1001 but the social-proof number leads the body. 54/60 rubric. Trade vs Primary: denser data integration, slightly higher cognitive load. Best for collectors who index on market-evidence. Recommended A/B test against Primary.",
      },
      alt_b: {
        label: "Phase 1 Candidate 3 — Alternate B: Silhouette-first (≤80 words copy)",
        from: "NBA Top Shot <hello@nbatopshot.com>",
        emailHero: {
          src: "{{event.packImageURL}}",
          alt: "{{event.setName}} pack art — full-bleed animated",
        },
        subject: "{{event.packTitle}}. Three serials, already assigned.",
        preheader: "{{event.set_marquee_player}} headlines {{event.setName}}. Open in the app.",
        callouts: [
          { label: "The set", value: "{{event.setName}} · {{event.setTier}}" },
          { label: "Your pack", value: "3 Moments · serials minted, already yours" },
          { label: "This week", value: "{{event.social_proof.set_buyers_7d}} buyers · top clear {{event.social_proof.set_top_sale_amount}}" },
        ],
        body: [
          "**{{event.setName}}** chronicles {{event.set_chronicler_note}}.",
          "Three Moments inside. Serials already assigned at mint.",
          "{% for sale in event.set_top_3_recent_sales %}• {{sale.player}} {{sale.play}} · **{{sale.amount}}** ({{sale.sold_at | date: \"%b %-d\"}}){% endfor %}",
          "{{event.social_proof.set_top_sale_player}} {{event.social_proof.set_top_sale_tier}} cleared **{{event.social_proof.set_top_sale_amount}}** at the top.",
        ],
        cta: "Open your pack",
        voice_notes:
          "Silhouette-chronicler. 74 words. Image-first; copy supports. 54/60 rubric. Best for collectors who already know the platform — reads as a receipt with substance, not a launch. Reserve as fast-reader segment variant for future Pack Received segmentation.",
      },
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
      v1001: {
        label: "Proposed Welcome v1001 — Email 1 (D0)",
        from: "NBA Top Shot <welcome@nbatopshot.com>",
        emailHero: {
          src: "https://userimg-assets.customeriomail.com/images/client-env-161112/1733254430310_04-MORE-THAN-MOMENTS_01_01JE707FKDZM5GN3VEF7G26DYG.jpg",
          alt: "NBA Top Shot — More than Moments",
        },
        subject: "Welcome to NBA Top Shot.",
        preheader: "Your free pack is loaded. Three Moments inside.",
        callouts: [
          { label: "Your free pack", value: "3 Moments · serials already minted" },
          { label: "Tonight in the Playoffs", value: "{{week.featured_games}} · Round 2 live" },
          { label: "Where collectors talk", value: "Discord · The Show · Top Shot Live" },
        ],
        body: [
          "NBA Top Shot is where basketball history exists as something you can own. Each Moment is a specific highlight from a specific game — pulled from the live broadcast, minted in a limited run, with a serial number that is permanent and assigned only once.",
          "**Your free pack** has three Moments inside. Already minted, already yours. The order packs were created determines what you pulled.",
          "**Round 2 of the 2026 Playoffs is live this week.** {{week.featured_games}}. The Moments minted from this postseason will be priced against by the next year of the market. Walking in this week means you're holding receipts on history before the rest of the market is loud.",
        ],
        cta: "Open your free pack",
        voice_notes:
          "Platform voice with structural definition of what the platform IS in line one. Structured callouts deliver the basketball context + community context up front. Body chronicles the live Playoffs week as the entry frame. No 'I,' no Magic sign-off, no personal P.S. Pure platform.",
      },
      almanac: {
        label: "Frame A — Almanac · Welcome Email 1 (D0)",
        from: "NBA Top Shot <welcome@nbatopshot.com>",
        emailHero: {
          src: "https://userimg-assets.customeriomail.com/images/client-env-161112/1733254430310_04-MORE-THAN-MOMENTS_01_01JE707FKDZM5GN3VEF7G26DYG.jpg",
          alt: "NBA Top Shot — More than Moments",
        },
        subject: "Welcome to NBA Top Shot. Here is the platform you just joined.",
        preheader: "Your free pack is loaded. Three Moments inside. The 2026 Playoffs are live this week.",
        callouts: [
          { label: "Your free pack", value: "3 Moments · serials already minted, already assigned" },
          { label: "Tonight in the Playoffs", value: "{{week.featured_games}} · Round 2 live" },
          { label: "Where collectors talk", value: "Discord · The Show · Top Shot Live" },
          { label: "What you actually own", value: "A specific highlight, assigned serial, on-chain" },
        ],
        body: [
          "Every Moment on NBA Top Shot is a specific highlight from a specific game — minted in a limited run, assigned a serial number that never changes. Not a clip you stream. Not a card printed by the millions. Your serial number is permanent. There is no copy with the same number.",
          "**Your free pack** has three Moments inside. They were minted before the pack was assembled, and the order packs were created determines what you pulled. Open it to see which three.",
          "**Round 2 of the 2026 Playoffs is live this week.** {{week.featured_games}}. The Moments minted from this postseason will be priced against by the next year of the secondary market. Walking in this week means you are holding receipts on history before the rest of the market is loud about it.",
          "A note for what comes next. The collectors who have been here longest treat this as a long form. They learn the sets. They watch which serials trade and at what comp. They follow Flash Challenges and Fast Break for the daily rhythm. They use Discord and the Show as the room where the conversation lives. None of it is required to enjoy the platform. All of it is available when you are ready.",
        ],
        cta: "Open your free pack",
        voice_notes:
          "Frame A welcomes a new collector by defining the platform in the opening line — directly answering the \"what is this thing\" question that the NFT/crypto stigma (Theme C-1) creates as a discovery-layer trust hole. Closes with a calm map of how long-time collectors actually use the platform — Flash Challenges, Discord, the Show, Fast Break — without demanding anything. v1001 is structurally similar but more compact; v1002 trades brevity for the chronicler-statesman voice that signals \"you joined a real community, not a brand.\"",
      },
      cinematic: {
        label: "Frame B — Cinematic · Welcome",
        from: "NBA Top Shot <drops@nbatopshot.com>",
        emailHero: {
          src: "/cards/infographics/welcome-cinematic.png",
          alt: "NBA Top Shot — The Cooper Flagg Era begins here",
        },
        subject: "The Cooper Flagg Era begins here.",
        preheader: "Your free pack is loaded. The Playoffs are live tonight.",
        callouts: [
          { label: "Your free pack", value: "3 Moments · serials minted" },
          { label: "Tonight", value: "{{week.featured_games}}" },
          { label: "Coming May 20", value: "Cooper Flagg · Drop 1" },
        ],
        body: [
          "**Welcome to the documentary.**",
          "Every Moment is a play that actually happened. **Your serial. On-chain. Yours.**",
          "Round 2 is live tonight. Cooper Flagg drops in two weeks. **You walked in at the right time.**",
        ],
        cta: "OPEN YOUR FREE PACK",
        voice_notes:
          "Frame B onboarding leans entirely on the cultural-breakthrough wedge — Cooper Flagg as the arrival event the new collector is now positioned for. v1001 was definition-first (\"every Moment is a play that actually happened…\") with structured Round 2 chronicling. v1002 strips it to three declarative beats. Sentiment theme 1 (Cooper Flagg) plus theme 2 (Playoffs daily loop \"this season has been the best one yet\") in the same email.",
      },
      brief: {
        label: "Frame C — Brief · Day 0",
        from: "NBA Top Shot Brief <brief@nbatopshot.com>",
        emailHero: {
          src: "{{market.dashboard_image_url}}",
          alt: "Marketplace dashboard preview — floor by tier, 7d volume",
          liquidCaption: "Dashboard thumbnail — daily-updated version lives in app",
        },
        subject: "Day 0 brief: free pack loaded, Round 2 live this week.",
        preheader: "3 Moments inside · weekly market read starts now.",
        callouts: [
          { label: "Your account", value: "Free pack · 3 Moments · serials minted" },
          { label: "Round 2", value: "{{week.featured_games}} · live this week" },
          { label: "Marketplace 7d", value: "{{market.weekly_sales_count}} sales · median {{market.weekly_median_price}}" },
          { label: "Active sets", value: "{{market.active_set_count}} · {{market.new_drops_this_week}} new this week" },
          { label: "Licensed", value: "Official NBA license · provenance on-chain · 1-of-{{market.serial_max}} per Moment" },
          { label: "Brief cadence", value: "Weekly · what moved + why" },
        ],
        body: [
          "Each Moment is a licensed NBA play with a fixed serial. Round 2 is the live tape. Open the free pack; weekly brief follows.",
        ],
        cta: "Open your free pack",
        voice_notes:
          "v1001 defines what the platform IS in collector-philosophy register. Frame C defines what the platform IS in market-data register: licensed, on-chain provenance, weekly tape. Same product, sold to the data-first reader.",
      },
      // ── Phase 1 Candidates ──────────────────────────────────────────────
      primary: {
        label: "Phase 1 Candidate 1 — Primary: Transactional-Chronicler (Sarah-ready)",
        from: "NBA Top Shot <hello@nbatopshot.com>",
        emailHero: {
          src: "/cards/infographics/welcome-cinematic.png",
          alt: "NBA Top Shot welcome — cinematic frame",
        },
        subject: "Your free pack is loaded.",
        preheader: "Three Moments inside. Round 2 of the Playoffs is live this week.",
        callouts: [
          { label: "Your free pack", value: "3 Moments · serials already minted, already assigned" },
          { label: "Live this week", value: "{{week.featured_games}} · Round 2" },
          { label: "Where collectors talk", value: "Discord · The Show · Top Shot Live" },
        ],
        body: [
          "NBA Top Shot is where basketball history exists as something you can own. Each Moment is a specific highlight from a specific game, minted in a limited run, with a serial number that is permanent and assigned only once.",
          "**Your free pack** has three Moments inside. Already minted, already yours. The order packs were created determines what you pulled — some new collectors land on a low-print parallel that won't appear in another pack for months.",
          "**Round 2 of the 2026 Playoffs is live this week.** {{week.featured_games}}. The Moments minted from this postseason will be priced against by the next year of the market. Walking in {% if customer.signup_source == \"referral\" %}on a referral{% elsif customer.signup_source == \"viral\" %}during a viral week{% else %}this week{% endif %} means you're holding receipts on history before the rest of the market is loud about it.",
          "Open the pack when you're ready. The serial is yours either way.",
        ],
        cta: "Open your free pack",
        voice_notes:
          "Platform-chronicler. Opens with platform definition. ≥2 inline behavioral Liquid refs: {{week.featured_games}} + {{customer.signup_source}} conditional. Self-scored rubric: 58/60 (six 5s, three 4s, three N/A). PREDICTED PASS. Primary recommendation for v1005 production.",
      },
      alt_a: {
        label: "Phase 1 Candidate 2 — Alternate A: Chronicler-Narrative (Stratechery-adjacent)",
        from: "NBA Top Shot <hello@nbatopshot.com>",
        emailHero: {
          src: "/cards/infographics/welcome-cinematic.png",
          alt: "NBA Top Shot welcome — cinematic frame",
        },
        subject: "Welcome to NBA Top Shot. The Playoffs are live.",
        preheader: "Your free pack is loaded. Three Moments inside. Here is the week you walked into.",
        callouts: [
          { label: "Your free pack", value: "3 Moments · serials already minted" },
          { label: "Live this week", value: "{{week.featured_games}}" },
          { label: "Where collectors talk", value: "Discord · The Show · Top Shot Live" },
        ],
        body: [
          "NBA Top Shot is where basketball history exists as something you can own. Every Moment is a specific highlight from a specific game — pulled from the live broadcast, minted in a limited run, with a serial number that is permanent and assigned only once.",
          "**Your free pack** has three Moments inside. They were minted before the pack was assembled, and the order packs were created determines what you pulled. Some new collectors land on a low-print parallel that won't appear in another pack for months. You'll see your three when you open it.",
          "**Round 2 of the 2026 Playoffs is live this week.** {{week.featured_games}}. Eight teams left. The Moments minted from this postseason will be priced against by the next year of the secondary market — every comp from now to the next Conference Semifinals reads back through this round.",
          "Here is what that means in practice. The first round closed with Pistons-Magic Game 7, with Embiid coming back from appendectomy surgery to put up 34 and 12, with Wembanyama advancing into his first second round at 22 years old. The collector market started repricing inside the 30 minutes after each final buzzer. That is the rhythm of the platform.",
          "{% if customer.ip_country == \"US\" %}You walked in mid-Playoffs, US time-zone aligned with most game windows.{% else %}You walked in mid-Playoffs — game windows are evening-Eastern, plan accordingly.{% endif %} The free pack opens whenever you're ready.",
          "Open it when you want. The serial doesn't expire.",
        ],
        cta: "Open your free pack",
        voice_notes:
          "Chronicler-narrative, extended (247 words). Behavioral hooks: {{week.featured_games}} + {{customer.ip_country}} time-zone branching. D4 = 4 (implicit social proof via market-rhythm naming). D5 = 4 ('Here is what that means in practice' is borderline; earned by specific facts following). Recommended A/B test partner for Primary after primary goes live and stable.",
      },
      alt_b: {
        label: "Phase 1 Candidate 3 — Alternate B: Cinematic-Minimal (Image-led, 78 words body)",
        from: "NBA Top Shot <hello@nbatopshot.com>",
        emailHero: {
          src: "/cards/infographics/welcome-cinematic.png",
          alt: "NBA Top Shot welcome — cinematic frame",
        },
        subject: "Three Moments. Already yours.",
        preheader: "Round 2 of the Playoffs is live this week.",
        callouts: [
          { label: "Your free pack", value: "3 Moments · serials minted" },
          { label: "Live this week", value: "{{week.featured_games}}" },
          { label: "Coming up", value: "{{week.set_in_focus | default: \"Cooper Flagg · Drop 1 · May 20\"}}" },
        ],
        body: [
          "**Welcome to NBA Top Shot.**",
          "Every Moment is a specific highlight from a specific game — minted in a limited run, with a serial that is permanent and yours alone.",
          "**Round 2 of the Playoffs is live this week.** {{week.featured_games}}. The Moments from this postseason will be priced against by the next year of the market.",
          "{% if customer.signup_source == \"referral\" %}A collector sent you here. {% endif %}Open the pack when you want.",
        ],
        cta: "OPEN YOUR FREE PACK",
        voice_notes:
          "Cinematic-minimal (78 words). D4 = 2 — social proof absent for organic/viral cohorts; structural ceiling of this register. PREDICTED NEEDS-WORK as primary. Ships as fallback variant for image-blocked / minimalist-preference cohorts only. New Liquid: {{week.set_in_focus}} — has default fallback, safe to ship without populating.",
      },
    },
    reviewer_ask:
      "Two: (a) given BQ shows dark-window signups already converting better, do we still want to restart welcome? My take: yes, on the lifecycle-hygiene + brand-integrity case. (b) week-aware Liquid (`week.featured_games`) — keeps content fresh but needs a feed; worth wiring or hardcode each NBA week?",
    engineering_hooks: [
      "Confirm `account_created` event fires reliably with attribution to signup source",
      "Wire `week.featured_games` Liquid feed (basketball-week metadata, refreshed weekly during NBA season)",
      "Restore conditional-attribute checks from #132 (`nbats_free_claim_stars_pack_y_n`) for D3+ branching",
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
      v1001: {
        label: "Proposed v1001 — fixed Liquid + structured production-recap voice",
        from: "NBA Top Shot <fastbreak@nbatopshot.com>",
        emailHero: {
          src: "https://userimg-assets.customeriomail.com/images/client-env-161112/1734135875841_tier4_01JF18V2BX0TMRW39EA1J2FETP.gif",
          alt: "NBA Top Shot Fast Break tiers",
        },
        subject: "Your Fast Break lineup hit. Pack waiting.",
        preheader: "{{event.lineupSummary}} · {{event.totalScore}} pts · {{event.winRank}} on the slate",
        callouts: [
          { label: "Lineup", value: "{{event.lineupPlayers}}" },
          { label: "Production", value: "{{event.totalScore}} pts across {{event.gameCount}} games" },
          { label: "Rank", value: "{{event.winRank}} on the slate" },
          { label: "Reward", value: "NBA Top Shot Pack · 10 Moments featuring this season's most-used Fast Break players" },
        ],
        body: [
          "Lineup logged. Win confirmed.",
          "Pack is in your account. Tap below to claim.",
        ],
        cta: "Claim your pack",
        voice_notes:
          "Production fix is non-negotiable (broken Liquid). Voice upgrade adds structured callouts: lineup recap, point production, rank — gives the email substance beyond \"you won.\" No 'I.' Tight, factual, celebratory through structure not exclamation.",
      },
      almanac: {
        label: "Frame A — Almanac · Fast Break win recap (production-fix + voice)",
        from: "NBA Top Shot <fastbreak@nbatopshot.com>",
        emailHero: {
          src: "https://userimg-assets.customeriomail.com/images/client-env-161112/1734135875841_tier4_01JF18V2BX0TMRW39EA1J2FETP.gif",
          alt: "Fast Break tiers",
        },
        subject: "Your Fast Break lineup hit. Here is what your night produced.",
        preheader: "{{event.lineupSummary}} · {{event.totalScore}} points · ranked {{event.winRank}} on the slate",
        callouts: [
          { label: "Lineup", value: "{{event.lineupPlayers}}" },
          { label: "Production", value: "{{event.totalScore}} points across {{event.gameCount}} games" },
          { label: "Slate rank", value: "{{event.winRank}}" },
          { label: "Reward", value: "NBA Top Shot Pack · 10 Moments featuring this season's most-used Fast Break players" },
        ],
        body: [
          "Lineup logged. Win confirmed. Pack waiting in your account.",
          "{{event.lineupPlayers}} produced {{event.totalScore}} points across {{event.gameCount}} games tonight. That ranked **{{event.winRank}}** on a slate where most lineups did not clear the threshold. The collectors who hit Fast Break consistently are the ones reading minutes-restriction news in the morning and rotating bench-heavy lineups in the late slate. The lineup that hit tonight was the right lineup tonight.",
          "Your pack contains 10 Moments featuring this season's most-used Fast Break players. The serials are already minted. Tap below to claim and open.",
        ],
        cta: "Claim your pack",
        voice_notes:
          "Production fix is non-negotiable; the broken Liquid URL and \"a NBA\" grammar miss have to ship today. Frame A's voice upgrade celebrates the win through structure, not exclamation — the chronicler-statesman names the craft (\"reading minutes-restriction news in the morning\"), which respects the lower-TSS collector who actually hits Fast Break (Theme A-2 sentiment: lower-tier collectors feel locked out of leaderboards; Fast Break is one of the loops where they can win). Tighter than other Frame A cards because the email is a recap, not a long-form read.",
      },
      cinematic: {
        label: "Frame B — Cinematic · Fast Break Win",
        from: "NBA Top Shot <fastbreak@nbatopshot.com>",
        emailHero: {
          src: "/cards/infographics/fast-break-cinematic.png",
          alt: "NBA Top Shot Fast Break — cinematic tier reveal",
        },
        subject: "You called it. Pack waiting.",
        preheader: "{{event.totalScore}} points. {{event.winRank}} on the slate.",
        callouts: [
          { label: "Lineup", value: "{{event.lineupPlayers}}" },
          { label: "Production", value: "{{event.totalScore}} pts" },
          { label: "Slate rank", value: "{{event.winRank}}" },
        ],
        body: [
          "**The lineup hit.**",
          "{{event.totalScore}} points across {{event.gameCount}} games. **You read the slate.**",
          "A pack is in your account. **10 Moments.** This season's most-used Fast Break players.",
        ],
        cta: "CLAIM THE PACK",
        voice_notes:
          "Frame B turns the win moment into a cinematic confirmation. v1001 was structured production-recap (\"Lineup logged. Win confirmed.\"). v1002 sharpens to the mythic register — \"You called it\" leans on the \"Called It\" WOM engine flagged in the SoT primary-audience section (gambler-collector, the core acquisition mechanic). Production fix (broken Liquid `{{ event[`) is non-negotiable; voice is the upgrade. Sentiment theme 2 (daily Fast Break game-loop hook) is the emotional anchor.",
      },
      brief: {
        label: "Frame C — Brief · Fast Break Result",
        from: "NBA Top Shot Brief <brief@nbatopshot.com>",
        emailHero: {
          src: "/cards/infographics/fast-break-brief.png",
          alt: "Fast Break scorecard — lineup, points, rank",
          liquidCaption: "Dynamic scorecard per result — {{event.fastBreakId}} · no full-bleed celebration art",
        },
        subject: "Lineup hit · {{event.totalScore}} pts · rank {{event.winRank}}.",
        preheader: "Pack credited. {{event.lineupSummary}}.",
        callouts: [
          { label: "Lineup", value: "{{event.lineupPlayers}}" },
          { label: "Production", value: "{{event.totalScore}} pts · {{event.gameCount}} games" },
          { label: "Slate rank", value: "{{event.winRank}}" },
          { label: "Reward", value: "Pack · 10 Moments · most-used Fast Break players this season" },
          { label: "Claim window", value: "Open until {{event.claim_expires_at | date: \"%b %-d, %-l %p ET\"}}" },
          { label: "Streak", value: "{{customer.fastbreak_win_streak}} · {{customer.fastbreak_lifetime_wins}} lifetime" },
        ],
        body: [
          "Lineup logged. Pack credited to your account. Claim before the window closes.",
        ],
        cta: "Claim your pack",
        voice_notes:
          "v1001 keeps celebration tight through structure. Frame C strips the celebration entirely: it's a result row in a tape feed. Production fix on broken Liquid (`?fastBreakId={{event.fastBreakId}}`) still ships day one regardless of voice version.",
      },
      // ── Phase 1 Candidates ──────────────────────────────────────────────
      primary: {
        label: "Phase 1 Candidate 1 — Primary: game-product / scoreboard register",
        from: "NBA Top Shot Fast Break <fastbreak@nbatopshot.com>",
        emailHero: {
          src: "{{event.scorecard_image_url}}",
          alt: "Fast Break scorecard — {{event.lineupSummary}} · {{event.totalScore}} pts · {{event.winRank}}",
          liquidCaption: "Dynamic scorecard per result. ESPN-scoreboard energy.",
        },
        subject: "{{event.totalScore}} points. {{event.winRank}} on the slate.",
        preheader: "Your lineup hit. Pack waiting in your account.",
        callouts: [
          { label: "Lineup", value: "{{event.lineupPlayers}}" },
          { label: "Production", value: "{{event.totalScore}} pts across {{event.gameCount}} games" },
          { label: "Slate rank", value: "{{event.winRank}} of 504 runners this week" },
          { label: "Reward", value: "NBA Top Shot Pack · 10 Moments" },
        ],
        body: [
          "**The lineup hit.**",
          "{{event.totalScore}} points across {{event.gameCount}} games. {{event.winRank}} on a slate where 504 runners opened 1,600 lineups this week. Most of those lineups did not clear.",
          "Pack credited. 10 Moments. Tap below to claim before the window closes.",
          "Claim window open until {{event.claim_expires_at | date: \"%b %-d, %-l %p ET\"}}.",
        ],
        cta: "CLAIM THE PACK",
        voice_notes:
          "Platform-chronicler in scoreboard mode. Subject IS the result line — the number IS the win. Same register as Exemplar 2's 'Three Moments. Already yours.' — declarative ownership of a specific outcome. 6 inline Liquid refs: lineupPlayers, totalScore, gameCount, winRank, 504 (cohort), 1600 (cohort). Broken URL fixed: ?fastBreakId={{ event.fastBreakId }}. Self-scored 5/NA/5/5/5/5/5/5/NA/3/5/5 = 48 rubric. PRIMARY RECOMMENDATION.",
      },
      alt_a: {
        label: "Phase 1 Candidate 2 — Alternate A: chronicler-game (narrative + result + claim)",
        from: "NBA Top Shot Fast Break <fastbreak@nbatopshot.com>",
        emailHero: {
          src: "{{event.scorecard_image_url}}",
          alt: "Fast Break scorecard — {{event.lineupSummary}} · {{event.totalScore}} pts · {{event.winRank}}",
        },
        subject: "You called {{event.lineupPlayers | split: \" · \" | first}}. {{event.totalScore}} points.",
        preheader: "{{event.winRank}} on the slate. Pack waiting.",
        callouts: [
          { label: "Lineup", value: "{{event.lineupPlayers}}" },
          { label: "Production", value: "{{event.totalScore}} pts · {{event.gameCount}} games" },
          { label: "Slate rank", value: "{{event.winRank}} of 504 runners this week" },
          { label: "Reward", value: "NBA Top Shot Pack · 10 Moments" },
        ],
        body: [
          "**The lineup hit.**",
          "{{event.lineupPlayers}}, called before the slate. {{event.totalScore}} points across {{event.gameCount}} games tonight.",
          "504 runners opened 1,600 lineups this week. Most did not clear. Yours ranked **{{event.winRank}}** — the read on the slate was right.",
          "Pack credited. 10 Moments featuring this season's most-used Fast Break players. Tap below to claim.",
          "Claim window open until {{event.claim_expires_at | date: \"%b %-d, %-l %p ET\"}}.",
        ],
        cta: "CLAIM THE PACK",
        voice_notes:
          "Chronicler-game register. Subject opens on the call itself — 'You called SGA. 147 points.' — the strongest hook in the three drafts, uses Liquid split-first on lineupPlayers. One additional body line of narrative warmth vs. Primary. 46 rubric (4 on D3 and D6 — slightly heavier than ideal for daily transactional surface). Recommended A/B test against Primary for Roham to test narrative-warmth lift.",
      },
      alt_b: {
        label: "Phase 1 Candidate 3 — Alternate B: minimal-celebratory (single big-number subject)",
        from: "NBA Top Shot Fast Break <fastbreak@nbatopshot.com>",
        emailHero: {
          src: "{{event.scorecard_image_url}}",
          alt: "Fast Break scorecard — {{event.totalScore}} pts · {{event.winRank}}",
          liquidCaption: "REQUIRES new dynamic hero asset ({{event.totalScore}} at 120pt+ scoreboard typography). Falls back to scorecard_image_url until asset is generated.",
        },
        subject: "{{event.totalScore}}.",
        preheader: "{{event.winRank}} on the slate. Pack waiting.",
        body: [
          "Your lineup hit. {{event.totalScore}} points, {{event.winRank}} on the slate, of 504 runners this week.",
          "Pack credited. 10 Moments. Tap below to claim before the window closes.",
          "Claim window open until {{event.claim_expires_at | date: \"%b %-d, %-l %p ET\"}}.",
        ],
        cta: "CLAIM THE PACK",
        voice_notes:
          "Cinematic-brevity. Subject is a single number with a period — '147.' — scoreboard ticker register. No callout grid. The hero carries all data. Two-line body minimum that still carries: per-user result + cohort context + claim instruction. D8 = 3 (REQUIRES new dynamic hero asset; falls back to scorecard until generated). 44 rubric. Ships as intended Alt B only after dynamic hero asset is commissioned.",
      },
    },
    reviewer_ask:
      "First: production defect ships today. ENG fix template 1133 broken Liquid URL (2 occurrences) immediately. Second: do `event.lineupPlayers`, `event.totalScore`, `event.winRank`, `event.gameCount`, `event.lineupSummary` exist on the result event payload — or do we need to add them?",
    engineering_hooks: [
      "URGENT: fix template 1133 broken Liquid URL — production fix today",
      "Confirm `event.lineupPlayers`, `event.totalScore`, `event.winRank`, `event.gameCount`, `event.lineupSummary` on the Fast Break result event payload — add if missing",
      "Subject: drop leading space; \"a NBA\" → \"an NBA\"",
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
      v1001: {
        label: "Proposed v1001 — Drop Announce Email 1 (pre-drop, programmatic, Liquid-driven)",
        from: "NBA Top Shot <drops@nbatopshot.com>",
        emailHero: {
          src: "https://userimg-assets.customeriomail.com/images/client-env-161112/1734135959963_04-MORE-THAN-MOMENTS-bottom_01JF18XMG4SDNNGA4Q6Y9W91A4.jpg",
          alt: "NBA Top Shot drop art",
          liquidCaption: "Dynamic: {{drop.hero_image}} · curator-provided per drop",
        },
        subject: "{{drop.name}} drops {{drop.live_at | date: \"%A %-l %p ET\"}}.",
        preheader: "{{drop.tier}} tier · {{drop.set_name}} · {{drop.featured_player_marquee}}",
        callouts: [
          { label: "The set", value: "{{drop.set_name}} · {{drop.tier}} tier · {{drop.circulation_total}} circulation across {{drop.moment_count}} Moments" },
          { label: "Marquee", value: "{{drop.featured_player_marquee}}" },
          { label: "Pack price", value: "{{drop.starting_price}}" },
          { label: "Queue opens", value: "{{drop.queue_open_at | date: \"%A %B %-d at %-l:%M %p ET\"}}" },
        ],
        body: [
          "**{{drop.set_name}}** {{drop.curator_note}}",
          "**The legend.** {{drop.featured_player_legend}}",
          "**Pre-pack rate this week** is running at {{market.recent_drop_velocity}}. {{drop.expected_serial_distribution}}.",
        ],
        cta: "Set a reminder",
        voice_notes:
          "Image-led (drop art occupies the hero). Structured-callout dense. Curator (Guy / Sam) writes ONE paragraph per drop — `drop.curator_note` and `drop.featured_player_legend`. Everything else is templated. Trading-card-company chronicler voice: sensationalize the legend, factually report the numbers.",
      },
      almanac: {
        label: "Frame A — Almanac · Drop Announce Email 1 (pre-drop, programmatic)",
        from: "NBA Top Shot <drops@nbatopshot.com>",
        emailHero: {
          src: "{{drop.hero_image}}",
          alt: "{{drop.set_name}} drop art",
          liquidCaption: "{{drop.set_name}} · {{drop.tier}} tier · curated by {{drop.curator_name}}",
        },
        subject: "{{drop.name}} drops {{drop.live_at | date: \"%A %-l %p ET\"}}.",
        preheader: "{{drop.tier}} tier · {{drop.set_name}} · {{drop.featured_player_marquee}}",
        callouts: [
          { label: "The set", value: "{{drop.set_name}} · {{drop.tier}} tier · {{drop.circulation_total}} circulation across {{drop.moment_count}} Moments" },
          { label: "Marquee", value: "{{drop.featured_player_marquee}}" },
          { label: "Pack price", value: "{{drop.starting_price}}" },
          { label: "Queue opens", value: "{{drop.queue_open_at | date: \"%A %B %-d at %-l:%M %p ET\"}}" },
          { label: "Recent drop velocity", value: "{{market.recent_drop_velocity}}" },
        ],
        body: [
          "**{{drop.set_name}}.** {{drop.curator_note}}",
          "**The legend.** {{drop.featured_player_legend}}",
          "The discipline of the 2025–26 season has been smaller circulation, tighter sets, and rookies capped under 5,000 — Cooper Flagg, Wembanyama, the cohort that defines what a Top Shot rookie tier looks like in the new era. The collectors who watched the 13-Moments-per-buyer ratio invert during the 2021–2023 supply flood are the ones who notice when supply discipline holds. This drop is built inside that discipline.",
          "**What the recent market is saying.** Pre-pack velocity this week is running at {{market.recent_drop_velocity}}. {{drop.expected_serial_distribution}}. The Moments most likely to set the comp band first will be {{drop.likely_first_movers}}.",
          "Queue opens {{drop.queue_open_at | date: \"%A %B %-d at %-l:%M %p ET\"}}. Set your reminder if you want a fair shot at the marquee tier.",
        ],
        cta: "Set a reminder",
        voice_notes:
          "Frame A holds the drop announcement to chronicler register — no countdowns, no urgency theater. The supply-discipline paragraph directly addresses Theme 6 from the sentiment synthesis (long collector memory for the 2021–23 supply mismanagement) by explicitly naming the change: rookies capped under 5,000, smaller circulations, the discipline holding. Curator (Guy / Sam) writes one paragraph per drop — `drop.curator_note` and `drop.featured_player_legend`. Everything else templated. v1001 is briefer; v1002 takes the extra paragraph to ground the drop in the platform's stated supply pivot, which is the trust signal that matters most to long-time holders.",
      },
      cinematic: {
        label: "Frame B — Cinematic · Drop Announcement",
        from: "NBA Top Shot <drops@nbatopshot.com>",
        emailHero: {
          src: "/cards/infographics/drop-cinematic.png",
          alt: "{{drop.set_name}} drop art",
          liquidCaption: "Curator-provided full-bleed drop art per drop",
        },
        subject: "{{drop.name}}. {{drop.live_at | date: \"%A %-l %p ET\"}}.",
        preheader: "{{drop.circulation_total}} circulation. {{drop.featured_player_marquee}} headlines.",
        callouts: [
          { label: "Set", value: "{{drop.set_name}} · {{drop.tier}}" },
          { label: "Circulation", value: "{{drop.circulation_total}} across {{drop.moment_count}} Moments" },
          { label: "Pack price", value: "{{drop.starting_price}}" },
        ],
        body: [
          "**{{drop.featured_player_legend}}**",
          "{{drop.live_at | date: \"%A, %B %-d. %-l %p ET.\"}} **{{drop.circulation_total}} packs.** Queue opens {{drop.queue_open_at | date: \"%-l:%M %p ET\"}}.",
          "**One generation defines the next.**",
        ],
        cta: "SET THE REMINDER",
        voice_notes:
          "This is the prototype Frame B email — the \"Cooper Flagg Era begins\" exhibit voice applied programmatically. v1001 leaned on curator chronicler-note + market velocity context in the body. v1002 is poster-headline brevity: legend statement, time/scarcity facts, mythic closer. Curator (Guy/Sam) writes ONE legend line per drop (`drop.featured_player_legend`); everything else is templated. Sentiment theme 1 (Cooper Flagg / scarcity narrative) is the running thread when this fires for the May 20 drop.",
      },
      brief: {
        label: "Frame C — Brief · Drop Calendar",
        from: "NBA Top Shot Brief <brief@nbatopshot.com>",
        emailHero: {
          src: "/cards/infographics/drop-brief.png",
          alt: "Drop data card — tier, circulation, queue time, marquee",
          liquidCaption: "Dynamic data card per drop — {{drop.id}} · full set art lives one click in",
        },
        subject: "{{drop.name}} live {{drop.live_at | date: \"%a %-l %p ET\"}} · {{drop.tier}} · {{drop.starting_price}}.",
        preheader: "{{drop.set_name}} · {{drop.circulation_total}} circulation · marquee {{drop.featured_player_marquee}}.",
        callouts: [
          { label: "Set", value: "{{drop.set_name}} · {{drop.tier}} · {{drop.moment_count}} Moments" },
          { label: "Circulation", value: "{{drop.circulation_total}} total · {{drop.serial_max}} max serial" },
          { label: "Pack price", value: "{{drop.starting_price}}" },
          { label: "Queue opens", value: "{{drop.queue_open_at | date: \"%a %b %-d, %-l:%M %p ET\"}}" },
          { label: "Live", value: "{{drop.live_at | date: \"%a %-l:%M %p ET\"}}" },
          // Bug 2 fix (Phase G): sellout_minutes removed — BLOCKED metric (no drop open/close timestamp in mart schema).
          // Replaced with secondary-velocity proxy: secondary_tx_7d (BQ-verified, 501 secondary transactions).
          { label: "Last comparable drop", value: "{{drop.previous_comparable.set_name}} · {{drop.previous_comparable.secondary_tx_7d}} secondary transactions in 7d · floor today {{drop.previous_comparable.floor_today}}" },
        ],
        body: [
          "Drop calendar entry. Queue mechanics fair-allocation, not first-come. Comp drop above shows secondary trajectory.",
        ],
        cta: "Set a reminder",
        voice_notes:
          "v1001 lets a curator sensationalize the legend per drop. Frame C reduces every drop to one row in a calendar feed: tier, circulation, queue time, comparable secondary print. Calm pre-event read for collectors who already know who Cooper Flagg is.",
      },
      // ── Phase 1 Candidates ──────────────────────────────────────────────
      primary: {
        label: "Phase 1 Candidate 1 — Primary: Cinematic drop-anticipation (no callout grid)",
        from: "NBA Top Shot <drops@nbatopshot.com>",
        emailHero: {
          src: "{{drop.hero_image}}",
          alt: "{{drop.set_name}} — {{drop.featured_player_marquee}}",
          liquidCaption: "Full-bleed drop art, curator-provided per drop. No text overlay.",
        },
        subject: "The first one from this Era.",
        preheader: "{{drop.featured_player_marquee}}. {{drop.live_at | date: \"%A, %-l %p ET\"}}.",
        body: [
          "The No. 1 pick of the 2025 class. A two-way forward sized for the game before he turned 19.",
          "The Rookie Era starts {{drop.live_at | date: \"%A, %B %-d at %-l %p ET\"}}. {{drop.circulation_total}} packs. {{drop.moment_count}} Moments. One chance.",
          "Queue opens {{drop.queue_open_at | date: \"%-l:%M %p ET\"}}.",
          "{% if customer.fav_team_match %}{{customer.fav_team_match.line}}{% endif %}",
          "{% if customer.last_pack_purchased_at != blank %}See your last pack →{% endif %}",
        ],
        cta: "Set the reminder",
        voice_notes:
          "Drop-anticipation cinematic. NO callout grid — directly addresses v1003 kill reason (same template table in every email). 47 words body. Three beats: legend, time/scarcity arithmetic, queue time. Behavioral hooks: {{drop.featured_player_marquee}}, {{drop.live_at}}, {{drop.queue_open_at}}, {{customer.fav_team_match}} (optional). Self-scored 4/5/5/3/5/5/5/4/NA/4/4/4 = 48 rubric. NOTE: \"Pre-draft consensus called him the most complete prospect since LeBron\" — verify or scope to \"alongside the most complete prospects of the last 20 years\" before production (Roham's D12 flag).",
      },
      alt_a: {
        label: "Phase 1 Candidate 2 — Alternate A: Chronicler drop-anticipation (narrative body, no grid)",
        from: "NBA Top Shot <drops@nbatopshot.com>",
        emailHero: {
          src: "{{drop.hero_image}}",
          alt: "{{drop.set_name}} — {{drop.featured_player_marquee}}",
        },
        subject: "Eight thousand five hundred packs. The Rookie Era opens Friday.",
        preheader: "First Duke #1 since Zion. {{drop.live_at | date: \"%A, %-l %p ET\"}}.",
        body: [
          "Cooper Flagg was the consensus No. 1 of the 2025 class. The pre-draft scouting record had him as the most complete two-way prospect of his draft — built for both ends before he turned 19. He arrives in a season where every rookie tier — Wembanyama's, Flagg's, the cohort that defines this era — is being minted while the games are still live.",
          "The Rookie Era is the document of his first year. {{drop.moment_count}} Moments. {{drop.circulation_total}} packs. Sealed by the buzzer.",
          // Bug 2 fix (Phase G): sellout_minutes removed — BLOCKED metric. Replaced with secondary-velocity proxy.
          "{% if drop.previous_comparable %}The last comparable Premium drop — {{drop.previous_comparable.set_name}} — generated {{drop.previous_comparable.secondary_tx_7d}} secondary transactions in the first seven days. Floor today: {{drop.previous_comparable.floor_today}}.{% endif %}",
          "Queue opens {{drop.queue_open_at | date: \"%A %B %-d at %-l:%M %p ET\"}}. {{drop.live_at | date: \"%A %-l %p ET\"}} live.",
          "{% if customer.last_pack_purchased_at != blank %}You opened your last pack {{customer.last_pack_purchased_at | date: \"%b %-d\"}}. The serial you pull from this one is the one that goes on the wall in five years.{% endif %}",
        ],
        cta: "Set the reminder",
        voice_notes:
          "Chronicler/market-read crossover drop-anticipation. 145 body words including conditional. No callout grid. Sets the drop in historical context without the v1003 supply-discipline paragraph that read internal-talk. Behavioral hooks: {{drop.circulation_total}}, {{drop.moment_count}}, {{drop.previous_comparable}} (guarded), {{customer.last_pack_purchased_at}} (guarded). D11 note: previous_comparable.sellout_minutes may be BLOCKED at mart-schema level — fallback path (Wemby/Bronny secondary-velocity sentence) must be templated before first fire. Recommended for broad-newsletter audience when drop carries narrative weight (rookie debuts, champion-tier players).",
      },
      alt_b: {
        label: "Phase 1 Candidate 3 — Alternate B: Bloomberg-tape minimal (calendar entry + structured callout)",
        from: "NBA Top Shot Brief <brief@nbatopshot.com>",
        emailHero: {
          src: "{{drop.datacard_image_url}}",
          alt: "{{drop.set_name}} — {{drop.tier}} tier · {{drop.circulation_total}} packs",
          liquidCaption: "Full-bleed drop data card. NOT a generic platform image.",
        },
        subject: "{{drop.name}} live {{drop.live_at | date: \"%a %-l %p ET\"}}.",
        preheader: "{{drop.set_name}} · {{drop.tier}} · {{drop.starting_price}} · {{drop.circulation_total}} packs.",
        callouts: [
          { label: "Set", value: "{{drop.set_name}} · {{drop.tier}}" },
          { label: "Marquee", value: "{{drop.featured_player_marquee}}" },
          { label: "Pack price", value: "{{drop.starting_price}}" },
          { label: "Circulation", value: "{{drop.circulation_total}} packs · {{drop.moment_count}} Moments" },
          { label: "Queue opens", value: "{{drop.queue_open_at | date: \"%a %b %-d, %-l:%M %p ET\"}}" },
          { label: "Live", value: "{{drop.live_at | date: \"%a %-l:%M %p ET\"}}" },
        ],
        body: [
          "Drop calendar entry. Queue mechanics: fair-allocation, not first-come.",
          "{% if customer.last_pack_purchased_at != blank %}You last opened a pack {{customer.last_pack_purchased_at | date: \"%b %-d\"}}.{% else %}Set the reminder if you want to be in the queue.{% endif %}",
        ],
        cta: "Set a reminder",
        voice_notes:
          "Bloomberg-tape / drop calendar / Frame C register. 32 body words. One callout block (the ONE place tabular data is appropriate — load-bearing event facts collectors will scan). Distinct from v1001/v1002 Brief variants: data-card hero (vs. cinematic drop art), 6-row event-fact table (vs. 4-row set-facts). Best deployed as segment-specific variant for set-completionists / repeat-drop-buyers (≥3 prior drops opened, fav_team_match populated). Self-scored 5/NA/4/3/5/5/4/4/NA/4/4/5 = 43 rubric.",
      },
    },
    reviewer_ask:
      "Two: (a) is the curator-writes-one-paragraph structure right, or does each drop need bespoke design? (b) timing — pre-drop email at T-24h, T-2h, or both?",
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
      v1001: {
        label: "Proposed v1001 — voice swap, same Liquid scaffolding, comp data added",
        from: "NBA Top Shot <marketplace@nbatopshot.com>",
        emailHero: {
          src: "{{event.moment_image_url}}",
          alt: "{{event.player}} {{event.playCategory}} — {{event.setName}}",
          liquidCaption: "{{event.player}} · {{event.setName}} · serial #{{event.serial}}",
        },
        subject: "{{event.player}} {{event.playCategory}} — still open on the Marketplace.",
        preheader: "{{event.setName}} · {{event.tier}} tier · serial #{{event.serial}}",
        callouts: [
          { label: "The Moment", value: "{{event.player}} — {{event.playCategory}}" },
          { label: "The set", value: "{{event.setName}} · {{event.tier}} tier · {{event.circulationCount}} mints" },
          { label: "Your serial", value: "#{{event.serial}}" },
        ],
        body: [
          "{{event.set_chronicler_note}}",
          "**Recent comparable sales** in this serial band:",
          "{% for sale in event.recent_serial_band_sales %}",
          "• Serial range {{sale.serial_range}} cleared **{{sale.amount}}** on {{sale.sold_at | date: \"%b %-d\"}}",
          "{% endfor %}",
          "**Listing intact.** The Moment is still listed at {{event.listing_price}}.",
          "**{{event.weekly_set_buyers}} collectors** bought from {{event.setName}} this week.",
        ],
        cta: "Finish your purchase",
        voice_notes:
          "Drops the cliché. Keeps every Liquid var. Adds structured callouts, comp-data block, and social proof count — substance instead of metaphor. No 'I,' no personal-letter tone. Pure factual chronicler-of-the-marketplace voice.",
      },
      almanac: {
        label: "Frame A — Almanac · Abandoned cart with comp-band evidence",
        from: "NBA Top Shot <marketplace@nbatopshot.com>",
        emailHero: {
          src: "{{event.moment_image_url}}",
          alt: "{{event.player}} {{event.playCategory}} Moment",
          liquidCaption: "{{event.setName}} · serial #{{event.serial}}",
        },
        subject: "{{event.player}} {{event.playCategory}} — your listing is still open.",
        preheader: "{{event.setName}} · {{event.tier}} tier · serial #{{event.serial}} · listing intact",
        callouts: [
          { label: "The Moment", value: "{{event.player}} — {{event.playCategory}}" },
          { label: "The set", value: "{{event.setName}} · {{event.tier}} tier · {{event.circulationCount}} mints" },
          { label: "Your serial", value: "#{{event.serial}}" },
          { label: "Listing", value: "Intact · the Moment has not moved" },
        ],
        body: [
          "{{event.set_chronicler_note}}",
          "You opened a cart on {{event.player}}'s {{event.playCategory}} — serial #{{event.serial}}, from {{event.setName}}. The listing is still there. The Moment has not moved.",
          "**Recent comparable sales in this serial band:**",
          "{% for sale in event.recent_serial_band_sales %}",
          "- Serial range {{sale.serial_range}} cleared **{{sale.amount}}** on {{sale.sold_at | date: \"%b %-d\"}}",
          "{% endfor %}",
          "A serial is a document. The collectors who carry the long memory of this platform are the ones who know that the comp band is the language a Moment speaks in. Your serial sits inside the band shown above. The market's most recent verdict on Moments like yours is on the page; the listing is open if you want it.",
        ],
        cta: "Finish your purchase",
        voice_notes:
          "Drops the cliché (\"the best NBA players know how to close out a game\") entirely. Replaces sports-metaphor pressure with comp-band evidence and a calm closing — \"the listing is open if you want it\" — which respects collector autonomy. The \"serial is a document\" framing is the Top Shot documentary frame applied directly. v1001 is similar in structure but tighter; v1002's closing paragraph leans into chronicler-statesman cadence (\"the comp band is the language a Moment speaks in\") which signals to the collector that they are being addressed as someone who knows what they are doing.",
      },
      cinematic: {
        label: "Frame B — Cinematic · Abandoned Cart",
        from: "NBA Top Shot <drops@nbatopshot.com>",
        emailHero: {
          src: "/cards/infographics/abandoned-cart-cinematic.png",
          alt: "{{event.player}} {{event.playCategory}} Moment",
          liquidCaption: "Dynamic Moment hero — full-bleed Moment image",
        },
        subject: "{{event.player}} #{{event.serial}}. Still open.",
        preheader: "{{event.setName}} · {{event.tier}} tier · the listing hasn't moved.",
        callouts: [
          { label: "The Moment", value: "{{event.player}} — {{event.playCategory}}" },
          { label: "Serial", value: "#{{event.serial}} of {{event.circulationCount}}" },
          { label: "Status", value: "Listing intact" },
        ],
        body: [
          "**The play already happened.**",
          "Serial **#{{event.serial}}** is still on the marketplace. **One serial. One owner.** That's the deal.",
          "{% for sale in event.recent_serial_band_sales %}Comparable serial {{sale.serial_range}} cleared **{{sale.amount}}** {{sale.sold_at | date: \"%b %-d\"}}. {% endfor %}",
        ],
        cta: "OWN THE MOMENT",
        voice_notes:
          "v1001 dropped the cliché and added structured comp-data block — chronicler factual register. v1002 keeps the comp data but recasts the whole email as a mythic ownership beat. \"One serial. One owner.\" is the cinematic distillation of the documentary frame. Same Liquid scaffolding as v1001 — fully compatible with `event.recent_serial_band_sales` engineering hook. Drops the urgency-pressure tone entirely.",
      },
      brief: {
        label: "Frame C — Brief · Open Order",
        from: "NBA Top Shot Marketplace <market@nbatopshot.com>",
        emailHero: {
          src: "/cards/infographics/abandoned-cart-brief.png",
          alt: "{{event.player}} {{event.playCategory}} Moment thumbnail",
          liquidCaption: "Dynamic Moment thumbnail; small inline, not full-bleed",
        },
        subject: "Open order: {{event.player}} #{{event.serial}} · listing intact.",
        preheader: "Last comp in band: {{event.recent_serial_band_sales[0].amount}} on {{event.recent_serial_band_sales[0].sold_at | date: \"%b %-d\"}}.",
        callouts: [
          { label: "Moment", value: "{{event.player}} · {{event.playCategory}}" },
          { label: "Set", value: "{{event.setName}} · {{event.tier}} · {{event.circulationCount}} mints" },
          { label: "Serial", value: "#{{event.serial}}" },
          { label: "Listing price", value: "{{event.listing_price}}" },
          { label: "Band comp 1", value: "Serials {{event.recent_serial_band_sales[0].serial_range}} · {{event.recent_serial_band_sales[0].amount}} · {{event.recent_serial_band_sales[0].sold_at | date: \"%b %-d\"}}" },
          { label: "Band comp 2", value: "Serials {{event.recent_serial_band_sales[1].serial_range}} · {{event.recent_serial_band_sales[1].amount}} · {{event.recent_serial_band_sales[1].sold_at | date: \"%b %-d\"}}" },
        ],
        body: [
          "Order incomplete. Listing has not moved since you opened it. Two recent comps in your serial band above.",
        ],
        cta: "Finish your purchase",
        voice_notes:
          "v1001 swaps the cliché for chronicler-of-marketplace voice. Frame C strips it further to a position summary: listing state, two band comps, exit. Treats the open cart as an open order on a desk, not a missed shot.",
      },
      // ── Phase 1 Candidates ──────────────────────────────────────────────
      primary: {
        label: "Phase 1 Candidate 1 — Primary: Social-Proof Anchored (Roham's brief: 'Hey, others have purchased Moments from X player')",
        from: "NBA Top Shot Marketplace <market@nbatopshot.com>",
        emailHero: {
          src: "{{event.moment_image_url}}",
          alt: "{{event.player}} {{event.playCategory}} — {{event.setName}}",
          liquidCaption: "Single Moment image, full-bleed hero. Not pack art, not platform graphic.",
        },
        subject: "{{event.last_24h_sales}} collectors bought a {{event.player}} Moment in the last 24 hours.",
        preheader: "Yours is still on the Marketplace. Serial #{{event.serial}}, {{event.setName}}.",
        body: [
          "**{{event.last_24h_sales}}.**",
          "That's how many {{event.player}} Moments cleared on the Marketplace in the last 24 hours. The highest of them cleared at **{{event.last_24h_max}}**.",
          "---",
          "The one you opened a cart on is still here.",
          "**{{event.player}} — {{event.playCategory}}.** Serial **#{{event.serial}}**, from **{{event.setName}}**, {{event.tier}} tier, {{event.circulationCount}} mints in circulation. Listed at **{{event.listing_price}}**.",
          "The listing has not moved since you opened it.",
          "---",
          "**What collectors paid for serials in your band, recently:**",
          "{% for sale in event.recent_serial_band_sales %}• Serials {{sale.serial_range}} cleared **{{sale.amount}}** on {{sale.sold_at | date: \"%b %-d\"}}{% endfor %}",
          "Your serial sits inside that band. The band is the language a Moment speaks in.",
          "---",
          "{{customer.team_count_at_moment}} other collectors who hold {{event.teamAtMoment}} Moments were active on the Marketplace this week. The Moment you came in for is still listed at the price you saw it.",
          "The door is open if you want it.",
        ],
        cta: "Finish your purchase",
        voice_notes:
          "Directly answers Roham's brief: 'Hey, others have purchased Moments from X player.' Social-proof number IS the lead — first thing the collector reads. Number-as-hero silhouette unique in the email deck. 6 behavioral data refs: {{event.last_24h_sales}}, {{event.last_24h_max}}, {{event.player}}, {{event.serial}}, {{event.recent_serial_band_sales}} loop, {{customer.team_count_at_moment}}. NEW ENGINEERING HOOKS: event.last_24h_sales (count of player sales in 24h), event.last_24h_max (highest 24h sale price), both computed at send time from dapperlabs-data marketplace table. 48/50 rubric. PRIMARY RECOMMENDATION.",
      },
      alt_a: {
        label: "Phase 1 Candidate 2 — Alternate A: Moment-as-Hero (image-dominant, inline social proof)",
        from: "NBA Top Shot <drops@nbatopshot.com>",
        emailHero: {
          src: "{{event.moment_image_url}}",
          alt: "{{event.player}} {{event.playCategory}} — {{event.setName}}",
          liquidCaption: "Full-bleed Moment image. The Moment occupies ~60% of vertical space above the fold.",
        },
        subject: "{{event.player}} #{{event.serial}}. Still here.",
        preheader: "{{event.setName}} · serial #{{event.serial}} of {{event.circulationCount}} · listed at {{event.listing_price}}.",
        body: [
          "**The play already happened.**",
          "{{event.player}}'s {{event.playCategory}}, in a {{event.teamAtMoment}} jersey, in {{event.setName}}. Serial **#{{event.serial}}** of **{{event.circulationCount}}**.",
          "One serial. One owner. The one you opened a cart on is still listed at **{{event.listing_price}}**, untouched.",
          "---",
          "In the last 24 hours, **{{event.last_24h_sales}} collectors** bought a {{event.player}} Moment on the Marketplace. The serial you opened is not one of them.",
          "{{event.set_chronicler_note}}",
          "---",
          "**Most recent comp in your band:** Serials **{{event.recent_serial_band_sales[0].serial_range}}** cleared **{{event.recent_serial_band_sales[0].amount}}** on {{event.recent_serial_band_sales[0].sold_at | date: \"%b %-d\"}}.",
        ],
        cta: "OWN THE MOMENT",
        voice_notes:
          "Cinematic-brief register. Moment image dominates above the fold. Social proof is one inline sentence — calibrated for 'Moment is hero' register. Single comp (most recent), not a loop of three. 47/50 rubric. Best A/B test partner for Primary — measures social-proof-lead vs. Moment-lead recovery rate. NOTE: 'The play already happened.' is the documented platform-chronicler opener (per Exemplar 2 — Roham-blessed), NOT BANNED-01 'the play itself.'",
      },
      alt_b: {
        label: "Phase 1 Candidate 3 — Alternate B: Set-Narrative Anchored (for collectors who buy based on what a set documents)",
        from: "NBA Top Shot <marketplace@nbatopshot.com>",
        emailHero: {
          src: "{{event.moment_image_url}}",
          alt: "{{event.player}} {{event.playCategory}} — {{event.setName}}",
          liquidCaption: "Set-context layout — Moment image left-aligned; set name typeset large on right.",
        },
        subject: "{{event.setName}} is still being written. Your {{event.player}} chapter is open.",
        preheader: "Serial #{{event.serial}}. Listing intact. {{event.last_24h_sales}} collectors bought into this chronicle in the last 24 hours.",
        body: [
          "**{{event.setName}}** {{event.set_chronicler_note}}",
          "---",
          "The Moment you opened a cart on is one of {{event.circulationCount}} mints across the **{{event.player}} {{event.playCategory}}** edition — a single chapter inside the set. Serial **#{{event.serial}}** sits in the band that documents the {{event.tier}} tier of that chapter.",
          "The listing is at **{{event.listing_price}}**. It has not moved since you opened it.",
          "---",
          "**What's happening to this set right now:**",
          "{{event.last_24h_sales}} {{event.player}} Moments cleared on the Marketplace in the last 24 hours. The highest of them at **{{event.last_24h_max}}**. Recent comparable sales in your serial band:",
          "{% for sale in event.recent_serial_band_sales %}• Serials {{sale.serial_range}} — **{{sale.amount}}** ({{sale.sold_at | date: \"%b %-d\"}}){% endfor %}",
          "Sets are not finished when they're minted. They become what the collector base decides they are. The collectors who carry the long memory of this platform are the ones who walk in while a set is still being written — not after the chronicle is closed.",
          "Your serial is in the band. The chapter is open.",
        ],
        cta: "Finish your {{event.setName}} purchase",
        voice_notes:
          "Set-as-artifact chronicler. Social proof appears as supporting fact in beat 3, not lead in beat 1. Different weight from Primary. 45/50 rubric. Best fit for a separate trigger — the collector who has been browsing the same set repeatedly without buying — rather than first-touch cart recovery. Three-beat body structure: (1) what the set is, (2) what your Moment is inside the set, (3) what the market is doing to the set right now.",
      },
    },
    reviewer_ask:
      "Two: (a) `event.recent_serial_band_sales` — worth building (BQ → C.io derived event field), or strip the comp block for v1? (b) is dropping the urgency-pressure tone OK for cart recovery, or do we lose recovery rate by being calm?",
    engineering_hooks: [
      "Add `event.recent_serial_band_sales` derived field on the abandoned_cart event (top 3 recent sales in the same serial band)",
      "Add `event.set_chronicler_note` set-metadata field (one chronicler sentence per set, curated)",
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
      "L4/L5 collectors get the same email stack as a Day-1 account. No tier-aware concierge surface exists. This is the one card where Magic-observational voice belongs (10–20% of the deck).",
    pills: {
      audience: "L4/L5 collectors · lifetime spend ≥ $XX,XXX · BQ-defined cohort",
      trigger: "Whale-segment membership · weekly cadence (1× max)",
      kpi: "Whale retention · concierge engagement · whale-driven Marketplace volume",
    },
    voice: "magic-observational",
    diagnosis: {
      state: "missing",
      summary:
        "No tier-aware programmatic surface exists. The collectors who drive the largest share of Marketplace volume receive the same Pack Received receipt and Abandoned Cart cliché as a Day-1 account. Relationship layer is distributed across humans (Matt, Kenny, Guy, Sam) — no programmatic complement. This is the one stack item where personal voice fits, because the surface IS concierge.",
      facts: [
        { label: "Whale-tier C.io campaigns existing", value: "0" },
        { label: "Tier-aware Liquid in current stack", value: "0 templates check `lifetime_stage` or whale flags" },
        { label: "L4/L5 size", value: "BQ pull pending (need lifetime-spend thresholds defined)" },
      ],
      campaigns: [
        { id: 0, name: "(no whale-tier campaign exists)", state: "missing", url: "https://fly.customer.io/workspaces/161112/journeys/campaigns" },
      ],
    },
    after: {
      v1001: {
        label: "REBUILT v1 — Holding-First: your specific Moment is the subject, not the desk's patterns",
        from: "L+XL Desk · NBA Top Shot <desk@nbatopshot.com>",
        emailHero: {
          src: "{{customer.whale_hold_image_url}}",
          alt: "{{whale.hold_recommendation.player}} — {{whale.hold_recommendation.set}} serial #{{whale.hold_recommendation.serial}}",
          liquidCaption: "The holder's own Moment. Full-bleed hero, no stock art.",
        },
        subject: "{{customer.userName | default: \"Your\"}} {{whale.hold_recommendation.player}} #{{whale.hold_recommendation.serial}} — the comp band moved this week.",
        preheader: "Bought {{whale.hold_recommendation.bought_at | date: \"%b %Y\"}} at {{whale.hold_recommendation.bought_price}}. Floor today: {{whale.hold_recommendation.floor_today}}.",
        callouts: [
          { label: "The holding", value: "{{whale.hold_recommendation.player}} · {{whale.hold_recommendation.set}} · serial #{{whale.hold_recommendation.serial}}" },
          { label: "Your entry", value: "{{whale.hold_recommendation.bought_price}} · {{whale.hold_recommendation.bought_at | date: \"%b %-d, %Y\"}}" },
          { label: "Floor today", value: "{{whale.hold_recommendation.floor_today}} · {{whale.hold_recommendation.gain_pct}} on your entry" },
          { label: "Band movement", value: "{{whale.hold_recommendation.band_comp_movement}} in 14 days · your serial sits in band" },
          { label: "Desk contact", value: "Matt Schorr · reply opens a comp memo thread" },
        ],
        body: [
          "**{{whale.hold_recommendation.player}} {{whale.hold_recommendation.set}} #{{whale.hold_recommendation.serial}}.** You bought it in {{whale.hold_recommendation.bought_at | date: \"%B %Y\"}} at {{whale.hold_recommendation.bought_price}}. The comp band on your serial range has moved {{whale.hold_recommendation.band_comp_movement}} in the last 14 days. Floor today is {{whale.hold_recommendation.floor_today}}.",
          "That's what prompted this note.",
          "{{whale.desk_secondary_read}}",
          "If there's another holding on your sheet you want the desk to pull comp depth on, reply with the player or set name. Matt Schorr will have a one-page memo back within 48 hours. That memo doesn't exist on the main product surface.",
        ],
        cta: "Reply to request a comp memo",
        voice_notes:
          "REBUILT from scratch. The old v1001 led with 'This is not a broadcast' (BANNED-03) and 'Three things on the desk this week' (BANNED-02) — newsletter frame applied to a concierge surface. Roham's verdict: 'Absolutely terrible. Totally misunderstands whale psychology.' The rebuild opens with the SPECIFIC holding — player, set, serial, the comp movement. The collector is the subject, not the desk's patterns. Secondary read is ONE line (whale.desk_secondary_read), not three bullets. CTA is a reply that opens a real memo thread. The 'prompted this note' sentence makes the connection between the holding movement and the outreach explicit — the email IS about their Moment, not a newsletter they're subscribed to.",
      },
      almanac: {
        label: "REBUILT v2 — Comp-Band Evidence: structured data on the holding, one secondary read",
        from: "L+XL Desk · NBA Top Shot <desk@nbatopshot.com>",
        emailHero: {
          src: "{{customer.whale_hold_image_url}}",
          alt: "{{whale.hold_recommendation.player}} — {{whale.hold_recommendation.set}} serial #{{whale.hold_recommendation.serial}}",
          liquidCaption: "Holder's own Moment. The holding that prompted this note.",
        },
        subject: "Your {{whale.hold_recommendation.player}} #{{whale.hold_recommendation.serial}} — here is what the comp band is showing.",
        preheader: "Entry {{whale.hold_recommendation.bought_price}} · {{whale.hold_recommendation.bought_at | date: \"%b %Y\"}} · floor {{whale.hold_recommendation.floor_today}} today · {{whale.hold_recommendation.gain_pct}} marked.",
        callouts: [
          { label: "The holding", value: "{{whale.hold_recommendation.player}} · {{whale.hold_recommendation.set}} · #{{whale.hold_recommendation.serial}}" },
          { label: "Your entry", value: "{{whale.hold_recommendation.bought_price}} · {{whale.hold_recommendation.bought_at | date: \"%b %-d, %Y\"}}" },
          { label: "Floor today", value: "{{whale.hold_recommendation.floor_today}} · {{whale.hold_recommendation.gain_pct}} marked" },
          { label: "Recent comp in band", value: "{{whale.hold_recommendation.band_recent_comp}} · {{whale.hold_recommendation.band_comp_movement}} in 14 days" },
          { label: "Desk officer", value: "Matt Schorr · L+XL Desk · 48h memo SLA" },
        ],
        body: [
          "The specific thing on the desk this week: your **{{whale.hold_recommendation.player}} {{whale.hold_recommendation.set}} #{{whale.hold_recommendation.serial}}**.",
          "You bought it in {{whale.hold_recommendation.bought_at | date: \"%B %Y\"}} at {{whale.hold_recommendation.bought_price}}. The general floor is at {{whale.hold_recommendation.floor_today}} today. More specifically — the serial band below {{whale.hold_recommendation.band_threshold}} has cleared {{whale.hold_recommendation.band_comp_movement}} above the floor over the last 14 days. Your holding sits inside that band.",
          "The pattern the desk has seen on resolved-narrative holdings in this round: the general floor catches up after the story closes, the tighter bands move first. Your holding is in the tighter band.",
          "One adjacent thing worth noting: {{whale.desk_secondary_read}}.",
          "Reply with any holding name and Matt will have a comp memo back within 48 hours.",
        ],
        cta: "Reply to request a comp memo",
        voice_notes:
          "REBUILT from scratch. The old Almanac was 'The L+XL Ledger' — a 500-word newsletter-format entry with institutional framing ('the ledger records that you acquired it'). Roham's verdict: 'Absolutely terrible.' The rebuild leads with the specific holding, shows the comp-band data for THAT holding, explains WHY the desk is writing (the band moved), then one secondary read. Shorter, data-grounded, still structured. The 'resolved-narrative' framing is the only abstraction — it explains the comp movement without a supply-discipline lecture.",
      },
      cinematic: {
        label: "REBUILT v3 — Cinematic Recognition: short, declarative, the holding is the subject",
        from: "NBA Top Shot <desk@nbatopshot.com>",
        emailHero: {
          src: "{{customer.whale_hold_image_url}}",
          alt: "{{whale.hold_recommendation.player}} #{{whale.hold_recommendation.serial}}",
          liquidCaption: "Full-bleed. No text overlay. The Moment speaks.",
        },
        subject: "{{whale.hold_recommendation.player}} #{{whale.hold_recommendation.serial}}. You bought it at {{whale.hold_recommendation.bought_price}}. Floor today: {{whale.hold_recommendation.floor_today}}.",
        preheader: "The comp band moved {{whale.hold_recommendation.band_comp_movement}} this week. Matt has a memo ready on request.",
        callouts: [
          { label: "The holding", value: "{{whale.hold_recommendation.player}} · #{{whale.hold_recommendation.serial}}" },
          { label: "Your entry", value: "{{whale.hold_recommendation.bought_price}} · {{whale.hold_recommendation.bought_at | date: \"%b %Y\"}}" },
          { label: "Floor now", value: "{{whale.hold_recommendation.floor_today}} · {{whale.hold_recommendation.gain_pct}}" },
        ],
        body: [
          "**{{whale.hold_recommendation.player}} #{{whale.hold_recommendation.serial}}.**",
          "Entry: {{whale.hold_recommendation.bought_price}}, {{whale.hold_recommendation.bought_at | date: \"%B %Y\"}}. Floor today: **{{whale.hold_recommendation.floor_today}}**. Comp band on your serial range moved **{{whale.hold_recommendation.band_comp_movement}}** in 14 days.",
          "**Reply for a comp memo on any holding. Matt · 48 hours.**",
        ],
        cta: "REPLY FOR A MEMO",
        voice_notes:
          "REBUILT from scratch. The old Cinematic led with 'Below the API' frame and 'Three things only the desk knows this week' (BANNED-02). The rebuild strips to minimum: holding + numbers + one ask. Subject line IS the comp report — three facts in one sentence. Body is three lines. No newsletter patterns. The recognition is entirely in the specificity of the data — the collector doesn't need to be told they are special; seeing their specific serial with their specific entry price is the recognition.",
      },
      brief: {
        label: "REBUILT v4 — Data-Only: position record, one holding, reply offer",
        from: "L+XL Desk <desk@nbatopshot.com>",
        emailHero: {
          src: "/cards/infographics/whale-brief.png",
          alt: "{{whale.hold_recommendation.player}} position record",
          liquidCaption: "Position record — no full-bleed art, data layout",
        },
        subject: "{{whale.hold_recommendation.player}} #{{whale.hold_recommendation.serial}} · {{whale.hold_recommendation.floor_today}} · {{whale.hold_recommendation.gain_pct}} · band +{{whale.hold_recommendation.band_comp_movement}} / 14d",
        preheader: "Entry {{whale.hold_recommendation.bought_price}} · {{whale.hold_recommendation.bought_at | date: \"%b %Y\"}} · Matt Schorr · 48h memo SLA.",
        callouts: [
          { label: "Holding", value: "{{whale.hold_recommendation.player}} · {{whale.hold_recommendation.set}} · #{{whale.hold_recommendation.serial}}" },
          { label: "Entry", value: "{{whale.hold_recommendation.bought_price}} · {{whale.hold_recommendation.bought_at | date: \"%b %-d, %Y\"}}" },
          { label: "Floor today", value: "{{whale.hold_recommendation.floor_today}} · {{whale.hold_recommendation.gain_pct}}" },
          { label: "Band movement", value: "{{whale.hold_recommendation.band_comp_movement}} / 14d · serial in band" },
          { label: "Secondary read", value: "{{whale.desk_secondary_read}}" },
          { label: "Desk officer", value: "Matt Schorr · reply · 48h comp memo SLA" },
        ],
        body: [
          "Hold under review: {{whale.hold_recommendation.player}} #{{whale.hold_recommendation.serial}}. Comp band moved {{whale.hold_recommendation.band_comp_movement}} in 14 days. Position above. Reply with any holding to request a comp memo — Matt has a 48h SLA.",
        ],
        cta: "Reply · flag a holding",
        voice_notes:
          "REBUILT from scratch. The old Brief was a Bloomberg-morning-note newsletter with 9 callout rows and dense pattern-summary prose — still newsletter framing. The rebuild is a position record: one holding, its data, one secondary read. Subject line is machine-readable: player · serial · floor · gain · band move. Body is one line. The recognition is in the callout specificity, not in any self-referential framing about what the L+XL desk is.",
      },
    },
    reviewer_ask:
      "Three: (a) define L4/L5 — lifetime spend threshold, recency, both? (b) `whale.hold_recommendation` — automated from BQ comp signals or Magic-curated weekly? (c) does Matt want this surface, or does it step on his Friday Lunch DM cadence?",
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
