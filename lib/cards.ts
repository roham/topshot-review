// v1001 — Customer.io upgrade cards.
// Voice mix: 6 platform-chronicler cards, 1 Magic-observational (whale-tier
// concierge — the 10-20% personal slot). Each After block is image-led,
// structured-data-driven, with a brief celebrate-the-Moment / chronicle-the-
// legend / report-the-marketplace paragraph. No personal letters from Magic
// or Matt — those don't convert and the team correctly rejected them.

export type CardKind = "upgrade";

export type UpgradeState =
  | "stopped"
  | "broken-in-prod"
  | "missing"
  | "running-flat";

export type VoiceMode = "platform-chronicler" | "magic-observational";

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
    label: string;
    from: string;
    subject: string;
    preheader: string;
    callouts?: { label: string; value: string }[];
    body: string[];
    cta: string;
    voice_notes?: string;
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
      label: "Proposed v1001 — Reactivation Email 1 (60-day-dormant L2 cohort, with-purchases)",
      from: "NBA Top Shot <hello@nbatopshot.com>",
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
      label: "Proposed v1001 — Pack Received with set-chronicler voice + structured data",
      from: "NBA Top Shot <hello@nbatopshot.com>",
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
      label: "Proposed Welcome v1001 — Email 1 (D0)",
      from: "NBA Top Shot <welcome@nbatopshot.com>",
      subject: "Welcome to NBA Top Shot.",
      preheader: "Your free pack is loaded. Three Moments inside.",
      callouts: [
        { label: "Your free pack", value: "3 Moments · serials already minted" },
        { label: "Tonight in the Playoffs", value: "{{week.featured_games}} · Round 2 live" },
        { label: "Where collectors talk", value: "Discord · The Show · Top Shot Live" },
      ],
      body: [
        "Every Moment on Top Shot is a play that actually happened — pulled from the live broadcast, minted on its own serial, owned by you. Not a clip. Not a trading-card scan. The play itself.",
        "**Your free pack** has three Moments inside. Already minted, already yours. The order packs were created determines what you pulled.",
        "**Round 2 of the 2026 Playoffs is live this week.** {{week.featured_games}}. The Moments minted from this postseason will be priced against by the next year of the market. Walking in this week means you're holding receipts on history before the rest of the market is loud.",
      ],
      cta: "Open your free pack",
      voice_notes:
        "Platform voice with structural definition of what the platform IS in line one. Structured callouts deliver the basketball context + community context up front. Body chronicles the live Playoffs week as the entry frame. No 'I,' no Magic sign-off, no personal P.S. Pure platform.",
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
      label: "Proposed v1001 — fixed Liquid + structured production-recap voice",
      from: "NBA Top Shot <fastbreak@nbatopshot.com>",
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
      label: "Proposed v1001 — Drop Announce Email 1 (pre-drop, programmatic, Liquid-driven)",
      from: "NBA Top Shot <drops@nbatopshot.com>",
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
      label: "Proposed v1001 — voice swap, same Liquid scaffolding, comp data added",
      from: "NBA Top Shot <marketplace@nbatopshot.com>",
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
        "**Listing intact.** The Moment hasn't moved.",
      ],
      cta: "Finish your purchase",
      voice_notes:
        "Drops the cliché. Keeps every Liquid var. Adds structured callouts and comp-data block — substance instead of metaphor. No 'I,' no personal-letter tone. Pure factual chronicler-of-the-marketplace voice.",
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
      label: "Proposed v1001 — Weekly Whale Read (one email/week to L4/L5)",
      from: "Magic <magic@nbatopshot.com>",
      subject: "What I'm watching this week — {{customer.userName}} read",
      preheader: "Three patterns in your collection's neighborhood + one Moment to hold longer.",
      callouts: [
        { label: "Tier", value: "L4 — concierge weekly read" },
        { label: "Your collection", value: "{{customer.lifetime_moments_owned}} Moments · {{customer.lifetime_value}} lifetime" },
        { label: "Cadence", value: "Once weekly · never broadcast" },
      ],
      body: [
        "Three things in the data this week that touch your collection. Not pitching — just what I'm watching.",
        "**Pattern 1: {{whale.pattern_1.title}}** — {{whale.pattern_1.body}}.",
        "**Pattern 2: {{whale.pattern_2.title}}** — {{whale.pattern_2.body}}.",
        "**Pattern 3: {{whale.pattern_3.title}}** — {{whale.pattern_3.body}}.",
        "**One Moment I'd hold longer:** {{whale.hold_recommendation.player}} — {{whale.hold_recommendation.set}}, serial #{{whale.hold_recommendation.serial}}. You bought it {{whale.hold_recommendation.bought_at | date: \"%b %Y\"}}. The market is starting to catch up to where you bought it.",
        "Reply if you want a deeper read on any of these. Comp data on request.",
        "— Magic",
      ],
      cta: "View comp data dashboard",
      voice_notes:
        "Magic-observational, NOT Magic-personal-letter. \"What I'm watching\" is a public observational frame, like a market read in a finance newsletter. Three patterns + one hold rec — structured, scannable, defensible. Reply-to-engage stays because this surface IS 1:1 by definition (L4/L5 only, weekly cadence). The 10-20% personal slot Roham reserved.",
    },
    reviewer_ask:
      "Three: (a) define L4/L5 — lifetime spend threshold, recency, both? (b) Magic curates the patterns and hold rec each week, or is it semi-automated from BQ signals? (c) does Matt want this surface to exist, or does it step on the Friday Lunch DM cadence he runs?",
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
