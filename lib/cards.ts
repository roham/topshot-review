// v1000 — Customer.io upgrade cards. Each card is a programmatic email
// upgrade proposal grounded in live workspace data (workspace 161112) and
// BQ baselines pulled from `dapperlabs-data.production_mart_nba_product`.
// Ordered by impact-weighted priority, not by stack-position chronology.

export type CardKind = "upgrade";

export type UpgradeState =
  | "stopped"
  | "broken-in-prod"
  | "missing"
  | "running-flat";

export type UpgradeCard = {
  id: string;
  position: number;
  stack_item: string;
  hero: string;
  kind: CardKind;
  headline: string;
  p0_notice?: string;
  pills: { audience: string; trigger: string; kpi: string };
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
    body: string[];
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
      kpi: "Mid-six-figures opportunity over a 4.5mo window (BQ-grounded estimate)",
    },
    diagnosis: {
      state: "missing",
      summary:
        "Campaign #1 \"Re-engage Inactive Users\" exists as a draft scaffold with empty templates and Customer.io demo-gallery placeholder copy. Nothing is being sent. Meanwhile BQ shows 1.27M L1/L2 collectors who haven't logged in in >30d, and 774K who signed up and never bought a single pack. This is the largest dollar opportunity in the entire programmatic stack.",
      facts: [
        { label: "L1+L2 idle >30d", value: "1.27M users" },
        { label: "L1+L2 idle >60d", value: "1.26M users" },
        { label: "L1+L2 idle >90d", value: "1.26M users" },
        { label: "L1+L2 idle >180d", value: "1.24M users" },
        { label: "L1 only — signed up, 0 packs, idle >30d", value: "774K users" },
        { label: "Mean first-7d basket (signups who do convert)", value: "$27.54" },
        { label: "Action names in the empty draft (verbatim)", value: "\"Check out our latest features!\" · \"Enjoy a free month of access, on us!\" · \"10% off your first month, sign up today!\" — Customer.io demo-gallery boilerplate" },
        { label: "Body content authored", value: "None. Empty `{}` content object." },
        { label: "Time since last template update", value: "2024-05-21 (~year ago)" },
      ],
      campaigns: [
        { id: 1, name: "[TEMPLATE] Re-engage Inactive Users", state: "draft", url: "https://fly.customer.io/workspaces/161112/journeys/campaigns/1/overview", note: "Empty scaffold; never built" },
      ],
    },
    after: {
      label: "Proposed v1000 — Reactivation Email 1 (60-day-dormant L2 cohort, with-purchases)",
      from: "Magic <magic@nbatopshot.com>",
      subject: "I noticed your collection went quiet.",
      preheader: "Not pitching. Just want to tell you what your wallet looks like in this light.",
      body: [
        "{{customer.userName}} — you've been on Top Shot since {{customer.first_session_at | date: \"%B %Y\"}}. {{customer.lifetime_moments_owned}} Moments. Last session was {{customer.last_session_days_ago}} days ago.",
        "I'm not writing to pitch you a drop. I'm writing because the Round 2 Playoffs are live, and the market is moving in ways your collection is positioned for.",
        "Three Moments in your wallet that are moving this week:",
        "{% for moment in customer.notable_holdings_moving %}",
        "• **{{moment.player}} — {{moment.set}}, serial #{{moment.serial}}.** Bought {{moment.bought_at | date: \"%b %Y\"}} for {{moment.bought_price}}. Floor today: {{moment.floor_today}}. Comparable serial last cleared at {{moment.recent_comp}}.",
        "{% endfor %}",
        "I won't tell you what to do with these. You bought them. You held them. The signal is yours to read first.",
        "If you want to come back, the Round 2 program is at topshot.nba.com/round2. If you want a read on a specific Moment, hit reply — I'll get you a number.",
        "— Magic",
        "P.S. The collectors who come back during the postseason and get back into rhythm tend to stay. The cleanest re-entry window of 2026 is open right now.",
      ],
      voice_notes:
        "Specific to the user's actual collection — three Moments they own with current market data. Magic-voice first person. Reply-to-engage with promise of comp data. \"You bought them, you held them — the signal is yours\" — collector-internal respect, not a pitch. Cohort variant (L1 never-bought) drops the holdings paragraph and leads with \"you signed up and didn't pull the trigger — here's what's interesting on the platform this week\".",
    },
    reviewer_ask:
      "Three: (a) is the personalization scope right (BQ → Customer.io profile attribute sync for `notable_holdings_moving`), or do we need a simpler v1 with just one Moment? (b) two cohort variants (L1 never-bought vs. L2 with-purchases) — sufficient, or do we need finer cuts? (c) what's the right send cadence — single touch, or a 3-email drip?",
    engineering_hooks: [
      "Build `customer.notable_holdings_moving` profile attribute (BQ → C.io sync of top 3 owned Moments by 7d-volume change)",
      "Add `customer.last_session_days_ago` derived attribute (or use `last_session_at` + Liquid date math)",
      "Wire two segments: (i) lifetime_stage L2, has_purchased=true, last_session > 60d; (ii) L1, has_purchased=false, last_session > 30d",
      "Define `from_identity` for Magic in C.io (currently every email ships from \"NBA Top Shot\")",
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
      "Highest-leverage email in the entire stack is currently a 10-word receipt. Zero voice on the most emotional moment.",
    pills: {
      audience: "Every collector who receives a pack · highest-volume programmatic touchpoint",
      trigger: "On pack_airdrop_received event · fires immediately on pack delivery",
      kpi: "Lift D1 pack-open rate · seed first-Moment narrative · feed nurture journey",
    },
    diagnosis: {
      state: "running-flat",
      summary:
        "Pack Received (#10) fires the second a collector receives a pack — the emotional peak of the platform. Three Moments sealed and waiting. Today's email is a 10-word brand-banner with a single CTA. We are squandering this.",
      facts: [
        { label: "Word count of body copy", value: "~10 words" },
        { label: "Personalization", value: "Pack title, qty, image — no narrative variables" },
        { label: "Voice register", value: "Brand-impersonal exclamatory: \"Congratulations! 🎁\"" },
        { label: "Subject (verbatim)", value: "You Received {{event.quantity}} x {{event.packTitle}} Pack!" },
        { label: "Preheader", value: "Check your collection now! (free real estate, generic use)" },
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
        "This is a receipt, not a touchpoint. The single biggest emotional moment on the platform — pack-in-hand, three unknown Moments waiting to be opened — is delivered with the voice of a shipping confirmation. The collector clicks once and leaves. We never plant the lesson, never seed the next-action, never bring the human into the room.",
    },
    after: {
      label: "Proposed v1000 — Pack Received with first-Moment narrative",
      from: "Magic <magic@nbatopshot.com>",
      subject: "Your {{event.packTitle}} just landed. Don't open it yet — read this first.",
      preheader: "Three Moments waiting. One of them is yours to remember.",
      body: [
        "{{customer.userName}} — your **{{event.packTitle}}** just hit your account. Three Moments inside. Sealed.",
        "Before you rip it: the part every collector who's been here for years tells me they wish they'd known on their first pack.",
        "**The Moments are already assigned.** The serials are already minted. What you pull is what you have — not chosen for you, but determined by the order packs were created. Some collectors get a #1 of a tier. Some get a serial that matches their birthday. Some get a low-print parallel that won't appear in another pack for months.",
        "**You'll know within 30 seconds which one is yours.** Out of three, there's almost always one that catches you — by player, by serial, by the play itself. Don't trade it for a year. Most collectors who do regret it.",
        "The other two are for the Marketplace if you want them to be.",
        "When you're ready: open below.",
        "— Magic",
        "P.S. Once you've pulled, I'll send one more email with what you actually got and what comparable Moments have been doing this week. You'll know if you're holding the rare one.",
      ],
      voice_notes:
        "Treats pack-open as a ritual instead of a transaction. Plants the next-action (read the post-pull recap). Plants the long-hold lesson collectors actually share with each other. Magic-voice first person. Specific insider knowledge. CTA naturally at the end.",
    },
    reviewer_ask:
      "Should this email send BEFORE the pack is opened (current trigger, what I drafted) or wait until first-pack-open and send the post-pull recap as the headline? I think pre-open is right — anticipation is the highest-engagement window.",
    engineering_hooks: [
      "Pair this with a follow-on `pack_opened` event triggering a separate Pack-Pull Recap email — the actual Moments + comparable sales — closes the loop",
      "Liquid: needs `customer.userName`, `event.packTitle` (already available); add pack-context metadata if available",
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
      "Welcome program has been dark for ~136 days. Lifecycle hygiene case, not a primary-conversion case (BQ shows dark-window signups converting BETTER than the welcome era).",
    pills: {
      audience: "All new signups · 7,942 unblocked since 2025-12-18 (8,288 total)",
      trigger: "On account_created event · D0/D1/D3/D5/D7 drip",
      kpi: "Brand-trust signal + first-impression integrity · primary $ impact small ($0–$11K)",
    },
    diagnosis: {
      state: "stopped",
      summary:
        "Two welcome programs ran historically. Both stopped by Dec 18 2025. BQ surprise: dark-window signups (Dec 18 → today) are converting at 8.54% D7 — *higher* than the 6.75% D7 of the welcome-#132 period. Welcome restart's case rests on lifecycle hygiene, brand-trust, and first-impression integrity — not primary-conversion lift.",
      facts: [
        { label: "Last welcome stopped", value: "2025-12-18 (#132)" },
        { label: "Days dark today", value: "~136 days" },
        { label: "Signups during dark window", value: "7,942 unblocked / 8,288 total" },
        { label: "Dark-window D7 conversion", value: "8.54%" },
        { label: "Welcome #132 era D7 conversion", value: "6.75% (dark window is +1.79pp BETTER)" },
        { label: "Q4 2024 D7 conversion (welcome #77 era)", value: "11.37% — but confounded with Series 6 launch" },
        { label: "#77 lifetime sent", value: "206,786 (1.7% click rate)" },
        { label: "#77 email 1 subject (verbatim)", value: "Welcome to Top Shot!! We've got a so much more for you! (typo, sent 207k×)" },
        { label: "#77 email 1 body", value: "Image-stack only. Zero text. No Liquid. No personalization." },
      ],
      campaigns: [
        { id: 77, name: "New User Program", state: "stopped", url: "https://fly.customer.io/workspaces/161112/journeys/campaigns/77/overview", note: "Broad audience, narrative slots, low CTR" },
        { id: 132, name: "New User Onboarding", state: "stopped", url: "https://fly.customer.io/workspaces/161112/journeys/campaigns/132/overview", note: "Narrow free-pack flow, transactional ladder, high CTR" },
        { id: 6, name: "Drip - New User Welcome Email", state: "stopped", url: "https://fly.customer.io/workspaces/161112/journeys/campaigns/6/overview" },
      ],
    },
    before: {
      label: "What used to ship — Email 1 of #77 (template 820)",
      subject: "Welcome to Top Shot!! We've got a so much more for you!",
      excerpt:
        "[image stack: 5 JPGs and social icons, no text body, no Liquid except {% unsubscribe_url %}]",
      critique:
        "Subject has a typo (\"got a so much\"). Body has zero text — five linked images and app-store badges. No personalization, no voice, no narrative, no Magic. Open rate held at 38.6% on brand alone, click rate collapsed to 1.7%. Sent 207k times.",
    },
    after: {
      label: "Proposed Welcome v1000 — Email 1 (D0)",
      from: "Magic <magic@nbatopshot.com>",
      subject: "You just got a key to the building.",
      preheader: "I'm Magic. Here's what you're holding and what to do first.",
      body: [
        "First thing first: you're in.",
        "Every Moment on this platform is a piece of basketball that actually happened — pulled from the live broadcast, minted on its own serial, owned by you. Not a clip. Not a trading-card scan. The play itself, on its own ID, in your collection.",
        "Three things to do, in this order:",
        "**1. Open your free pack.** Three Moments inside, randomly assigned by serial. Some commons. Some quietly rare. The first pull is the part every collector remembers — yours starts now.",
        "**2. Pick one Moment you actually love.** Doesn't have to be the most expensive. Has to be the one you'd point at if a friend asked what you collect. That's the seed of your collection.",
        "**3. Come find us.** The Discord is where most of the Top Shot brain lives — drops, patterns, who's about to break out. Linked below.",
        "Round 2 of the Playoffs is live tonight. Whatever happens, the Moments minted in the next 24 hours are the ones the next four weeks will be priced against. New collectors walking in this week will own them — and most won't know what they got.",
        "I want you to know what you got.",
        "— Magic",
        "P.S. Reply to this email. I read every one.",
      ],
      voice_notes:
        "First-person Magic. Specific to what's happening tonight (Round 2 G7). Three concrete actions instead of one abstract CTA. Reply-to-engage at the end — turns the welcome into a conversation, not a broadcast.",
    },
    reviewer_ask:
      "Two: (a) given the BQ finding that dark-window signups convert better, do we still want to restart welcome — or invest the time elsewhere? My take: yes, restart, on the lifecycle-hygiene + brand-integrity case. (b) Magic-voice from_identity vs \"Top Shot Team\"?",
    engineering_hooks: [
      "Add `from_identity` for `Magic <magic@nbatopshot.com>` in Customer.io",
      "Confirm `account_created` event fires reliably with attribution to signup source",
      "Restore conditional-attribute checks from #132 (`nbats_free_claim_stars_pack_y_n` etc.) for D3+ branching",
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
    p0_notice:
      "The Liquid URL fix (template 1133) ships TODAY regardless of your vote — this is a production defect affecting live users right now. Your vote on this card is about the voice upgrade only.",
    pills: {
      audience: "Fast Break players · daily result delivery · onboarding-first-win cohort",
      trigger: "Fast Break result event · daily during NBA season",
      kpi: "URL fix → claim CTR back to baseline · voice → engagement lift on win moment",
    },
    diagnosis: {
      state: "broken-in-prod",
      summary:
        "Onboarding First Win template (1133, on campaign #102) ships with a Liquid expression truncated mid-bracket: `?fastBreakId={{ event[`. Winners may be clicking malformed URLs right now, or template render is silently failing on that event field. Same broken expression appears 2× (image link + button). Subject has grammar miss \"a NBA\" (should be \"an NBA\").",
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
        "As a special reward, you've earned a NBA Top Shot Pack… Includes 10 Moments featuring the most used players in Fast Break! [CLAIM MY PACK] → URL: https://nbatopshot.com/fastbreak/onboarding/claim?fastBreakId={{ event[",
      critique:
        "Two problems. (1) Production defect: the Liquid `{{ event[` is incomplete — closing bracket and field name are missing. Whatever this renders to is not a working claim URL. (2) Voice is brand-celebratory exclamatory with two grammar misses (leading space; \"a NBA\"). The win moment is the highest-engagement Fast Break event and we deliver it with broken plumbing and no voice.",
    },
    after: {
      label: "Proposed v1000 — fixed Liquid + Magic voice",
      from: "Magic <magic@nbatopshot.com>",
      subject: "Your Fast Break lineup hit. Pack claim is one tap away.",
      preheader: "{{event.lineupSummary}} — well-played. Here's how to grab the pack.",
      body: [
        "{{customer.userName}} — your lineup hit. Win logged.",
        "**What you submitted:** {{event.lineupPlayers}}.",
        "**What it produced:** {{event.totalScore}} points across {{event.gameCount}} games. {{event.winRank}} for the slate.",
        "**What you earned:** an NBA Top Shot Pack — 10 Moments featuring the most-used players in Fast Break this season.",
        "Pack waiting. One tap below.",
        "— Magic",
        "P.S. The collectors who play Fast Break consistently end up with cohorts of Moments tied to specific players over time. Your lineup choices today shape the collection. Pay attention to which players you keep picking.",
      ],
      voice_notes:
        "Production fix is non-negotiable. Voice upgrade adds: lineup recap (gives the email substance beyond \"you won\"), specific point count, framing of how Fast Break play shapes long-term collection identity. Magic-voice plants the lesson, not just the prize.",
    },
    reviewer_ask:
      "First: production defect ships today. Can ENG fix the Liquid `?fastBreakId={{ event[` truncation in template 1133 immediately, before any voice work? Second: do `event.lineupPlayers`, `event.totalScore`, `event.winRank`, `event.gameCount` exist on the result event payload — or do we need to add them?",
    engineering_hooks: [
      "URGENT: fix template 1133 broken Liquid URL (2 occurrences) — production fix today",
      "Confirm `event.lineupPlayers`, `event.totalScore`, `event.winRank`, `event.gameCount`, `event.lineupSummary` are on the Fast Break result event payload — add if missing",
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
    diagnosis: {
      state: "missing",
      summary:
        "1,198 newsletters in the workspace lifetime. ~1,000 are drop announcements. Same three-beat pattern every time: pre-drop / drop-live / drop-recap. Currently rebuilt by hand each week. No programmatic flow exists.",
      facts: [
        { label: "Lifetime newsletter count", value: "1,198" },
        { label: "Drop one-offs (estimate)", value: "~1,000 (~83%)" },
        { label: "Pattern", value: "Pre-drop announce → 24h reminder → live → 24h recap" },
        { label: "Per-drop labor", value: "~3-6 hours design+copy+QA per drop, multiplied across all drops/week" },
        { label: "Programmatic drop campaigns existing", value: "0" },
      ],
      campaigns: [
        { id: 0, name: "(no programmatic drop campaign exists)", state: "missing", url: "https://fly.customer.io/workspaces/161112/journeys/broadcasts" },
      ],
    },
    after: {
      label: "Proposed v1000 — Drop Announce Email 1 (pre-drop, programmatic, Liquid-driven)",
      from: "Magic <magic@nbatopshot.com>",
      subject: "{{drop.name}} drops {{drop.live_at | date: \"%A %-l %p ET\"}}. Read this first.",
      preheader: "{{drop.tier}} tier · {{drop.set_name}} · what to know before queue opens.",
      body: [
        "{{drop.name}} goes live {{drop.live_at | date: \"%A %B %-d at %-l %p ET\"}}. Here's the read on it before you queue.",
        "**The set:** {{drop.set_name}} — {{drop.tier}} tier, {{drop.circulation_total}} circulation across {{drop.moment_count}} Moments.",
        "**The players:** {{drop.players_summary}}.",
        "**The price tier:** {{drop.starting_price}} per pack. {{drop.expected_serial_distribution}}.",
        "**What's interesting about this one:** {{drop.curator_note}}",
        "Queue opens {{drop.queue_open_at | date: \"%-l:%M %p ET\"}}. Pre-pack rate this week is running at {{market.recent_drop_velocity}}.",
        "If you want to be in the room: app links below.",
        "— Magic",
      ],
      voice_notes:
        "Builds the drop announce flow ONCE in Customer.io as a journey. Triggered by `drop_published` event with full drop metadata as Liquid. Three emails per drop (pre / live / recap), each templated. Drop curator (Guy / Sam) writes only `drop.curator_note` — one paragraph per drop instead of redesigning a full email.",
    },
    reviewer_ask:
      "Two: (a) is the curator-note-as-only-write structure right, or does each drop need bespoke design? (b) timing — pre-drop email at T-24h, T-2h, or both?",
    engineering_hooks: [
      "Define `drop_published` event with structured metadata (name, set, tier, circulation, moment_count, players, starting_price, queue/live timestamps, curator_note)",
      "Stand up programmatic campaign in C.io triggered on this event",
      "Stop the manual newsletter recreation — measure time saved (~3-6 hours/drop × N drops/week)",
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
      "Only programmatic email with a hint of voice. Cliché metaphor. Easiest to fold into Magic-voice with the lowest rework.",
    pills: {
      audience: "Started a Marketplace purchase, didn't complete · personalized to specific player Moment",
      trigger: "abandoned_cart event · fires shortly after",
      kpi: "Recovery rate · current % unknown (baseline pull pending)",
    },
    diagnosis: {
      state: "running-flat",
      summary:
        "Only template in the live stack with paragraph copy and a person gesturing at the reader. Uses dense Liquid (player/set/team/parallel). Voice itself is clichéd — \"the best NBA players know how to close out a game\" — but the structure is sound. Easiest stack item to upgrade.",
      facts: [
        { label: "Subject", value: "Time To Finish What You Started for a {{event.player}} Moment!" },
        { label: "Liquid usage", value: "Heavy: player, playCategory, setName, teamAtMoment, momentFlowID" },
        { label: "CTA", value: "1 styled button (FINISH YOUR PURCHASE) + linked Moment image" },
        { label: "Voice issue", value: "Sports cliché opener: \"The best NBA players know how to close out a game...\"" },
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
        "Sports cliché opener does the brand a disservice. \"Decided to pass instead of taking the shot\" is condescending. The Liquid scaffolding is solid — every variable is the right one — but the wrapper around it doesn't sound like a person. Easy to fix without touching the data layer.",
    },
    after: {
      label: "Proposed v1000 — voice swap, same Liquid scaffolding",
      from: "Magic <magic@nbatopshot.com>",
      subject: "That {{event.player}} {{event.playCategory}} you were looking at.",
      preheader: "Quick context on the serial spread before you decide.",
      body: [
        "Saw you were on the {{event.player}} — {{event.playCategory}} from the {{event.setName}} set. Got close, didn't finish.",
        "Two reasons that's worth a second look this week:",
        "**The set context.** {{event.setName}} is a {{event.tier}} tier with {{event.circulationCount}} mints across the run. The Moment you were looking at is one of those. Once it ships out of Marketplace at this price band, the next comparable serial usually clears 15-30% higher.",
        "**Your collection fit.** This is a {{event.teamAtMoment}} Moment. You already hold {{customer.team_count_at_moment}} from this team. It rounds out a roster you've been building.",
        "Not pushing. If the read isn't right, close the tab. If it is, the Moment is still open.",
        "— Magic",
        "P.S. Reply if you want a read on what comparable serials cleared last week. I'll send the comp data.",
      ],
      voice_notes:
        "First-person. Specific to the actual Moment they were looking at. Frames the decision around set context and collection fit, not pressure. Reply-to-engage. Drops the cliché — keeps every Liquid var.",
    },
    reviewer_ask:
      "Two: (a) `customer.team_count_at_moment` is a profile attribute we'd need to derive — worth building, or strip that paragraph? (b) is dropping the urgency-pressure tone OK for cart recovery, or do we lose recovery rate by being calm?",
    engineering_hooks: [
      "Add `customer.team_count_at_moment` derived profile attribute (BQ → C.io sync). Optional — drop paragraph if not feasible v1.",
      "Test variant against current cliché version — A/B with 50/50 cohort split",
    ],
  },

  // -----------------------------------------------------------------------
  {
    id: "whale-tier-concierge",
    position: 7,
    stack_item: "Whale-tier concierge surface",
    hero: "/cards/whale-tier.png",
    kind: "upgrade",
    headline:
      "L4/L5 collectors get the same email stack as a Day-1 account. No tier-aware concierge surface exists.",
    pills: {
      audience: "L4/L5 collectors · lifetime spend ≥ $XX,XXX · BQ-defined cohort",
      trigger: "Whale-segment membership · weekly cadence (1× max)",
      kpi: "Whale retention · concierge engagement · whale-driven Marketplace volume",
    },
    diagnosis: {
      state: "missing",
      summary:
        "No tier-aware programmatic surface exists. The collectors who drive the largest share of Marketplace volume receive the same Pack Received receipt and Abandoned Cart cliché as a Day-1 account. The relationship layer is distributed across humans (Matt, Kenny, Guy, Sam) — no programmatic complement.",
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
      label: "Proposed v1000 — Weekly Whale Read (one email/week to L4/L5 only)",
      from: "Magic <magic@nbatopshot.com>",
      subject: "What I'm watching this week — {{customer.userName}} read",
      preheader: "Three patterns in your collection's neighborhood + one Moment I'd hold longer.",
      body: [
        "Three things in the data this week that touch your collection specifically. Not pitching — just what I'm watching.",
        "**Pattern 1: {{whale.pattern_1.title}}** — {{whale.pattern_1.body}}.",
        "**Pattern 2: {{whale.pattern_2.title}}** — {{whale.pattern_2.body}}.",
        "**Pattern 3: {{whale.pattern_3.title}}** — {{whale.pattern_3.body}}.",
        "**One Moment I'd hold longer:** {{whale.hold_recommendation.player}} — {{whale.hold_recommendation.set}}, serial #{{whale.hold_recommendation.serial}}. You bought it {{whale.hold_recommendation.bought_at}}. The market is starting to catch up to where you bought it.",
        "If you want a deeper read on any of these, hit reply. I'll get you the comp data and the curve.",
        "— Magic",
        "P.S. The Friday Lunch DM channel with Matt is open if you want to talk about something larger than this email handles.",
      ],
      voice_notes:
        "Concierge tone. Acknowledges the whale's collection without flattery. Three patterns + one hold rec — structured, scannable, defensible. Reply-to-engage with promise of comp data. Plants the human-relationship handoff (Matt) at the end as the escalation path.",
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
  "Voice doesn't sound like Magic",
  "Audience definition is off",
  "Trigger / timing is wrong",
  "KPI estimate isn't credible",
  "Diagnosis missed something",
  "Engineering hook is too heavy",
  "Risks the brand",
  "Could be more specific",
  "Wrong priority (not bread-and-butter)",
  "Liquid scaffolding won't work",
];
