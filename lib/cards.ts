export type CardKind = "strategy" | "email" | "x" | "discord" | "calendar" | "decision" | "abtest";

export type Card = {
  id: string;
  kind: CardKind;
  title: string;
  subtitle: string;
  audience?: string;
  surface?: string;
  date?: string;
  rationale: string;
  forecast?: string;
  data?: Record<string, unknown>;
};

export const CARDS: Card[] = [
  {
    id: "strategy-spine",
    kind: "strategy",
    title: "Spine: B-primary, C-evidence, A-warmth",
    subtitle: "Two distinct legs inside B — Reactivation and Whale Activation",
    rationale:
      "B-spine is the reactivation engine. 'You were there. You were right. Here's what's happening next.' C is embedded as evidence (floor moves, sweep trades, ceilings) inside every B-piece — never the surface. A is ambient warmth, not a separate output. R2/R3 ratified that we must keep Reactivation (dormant $100K-LT) labeled separately from Whale Activation (active XL, wallet-funding) — they have different KPIs.",
    data: {
      legs: [
        { name: "Reactivation", audience: "1,122 dormant $100K-LT", mechanic: "Run It Back", kpi: "Causal spend lift on dormant cohort" },
        { name: "Whale Activation", audience: "Active XL", mechanic: "Lock-In April", kpi: "MoM spend lift on active XL" },
      ],
      kpi: "Causal spend lift, per send. Engagement is the Goodhart trap.",
    },
  },
  {
    id: "strategy-forecast",
    kind: "strategy",
    title: "7-day forecast: 80–115 reactivated L+XL",
    subtitle: "May 4–10. ~$2.5M annualized recovered revenue if it sticks.",
    rationale:
      "Three segmented sends + 50-name personal touch. Conversion rates from R2/R3 ratified benchmarks: warm voice + tight narrative-fit segmentation = 15–25% on segments where the narrative resolves favorably; 4–7% on residual. R2 G7 night is the highest narrative-density moment of 2026 for this list — we're capturing roughly 2× the 6-week historical reactivation rate inside 7 days.",
    forecast: "Best case 100. Realistic 80. Floor 60.",
    data: {
      segments: [
        { name: "A — Detroit Holders", size: 150, conv: "20–25%", react: "30–37" },
        { name: "B — Toronto Holders", size: 80, conv: "20–25% if TOR wins", react: "16–20" },
        { name: "C — Cleveland Holders", size: 120, conv: "18–22% if CLE wins", react: "22–26" },
        { name: "D — Residual dormant", size: 770, conv: "3–5%", react: "23–38" },
        { name: "E — Top 50 named (Matt 1:1)", size: 50, conv: "25–35%", react: "12–17" },
      ],
    },
  },
  {
    id: "email-segment-a",
    kind: "email",
    title: "Segment A — Detroit Holders",
    subtitle: "Conditional on Pistons advancing. ~150 dormant.",
    surface: "CIO email · From: Matt Schorr",
    audience: "Owns Cade rookie OR ≥3 Pistons Moments",
    date: "May 4 · 09:00 ET",
    rationale:
      "Anchors on a specific Moment they own and a price they actually paid, then bridges to last night's resolution. 'Your wallet has been telling this story since 2021.' Soft P.S. ask (quote-on-request, not a CTA button). Sender is named Matt, not 'team@'.",
    forecast: "20–25% conversion = 30–37 reactivated",
    data: {
      from: "Matt Schorr <matt@nbatopshot.com>",
      subject: "What you saw in Detroit before they did",
      preview: "Your Cade {{ROOKIE_MOMENT_NAME}} #{{SERIAL}}. Reading this morning differently.",
      body: [
        "You bought Cade Cunningham's {{ROOKIE_MOMENT_NAME}} on {{PURCHASE_DATE}} for {{PURCHASE_PRICE}}. Serial #{{SERIAL}} — {{SERIAL_RANK_LANGUAGE}}.",
        "Last night Cade put up {{G7_STAT_LINE}} in a Game 7 to send Detroit to Round 2. The TST Playoffs Edition Moment minted three days before tipoff hit a $1,110 ceiling within the first hour after the buzzer. Highest single-Moment ceiling on the platform this playoffs.",
        "Here's the part that might be interesting to you. Your rookie pre-dates that TST by {{YEARS_SINCE_PURCHASE}} years. The story Top Shot is telling about Cade today — that he's a foundational Pistons Moment-maker — is a story your wallet has been telling since {{PURCHASE_YEAR}}.",
        "The market is just catching up.",
        "We launched a Round 2 program this morning. I won't pitch you on it — you can read it at topshot.nba.com/round2. I'm writing because I noticed you'd been quiet for a while, and I thought you'd want to know what your collection looks like in this light.",
      ],
      signoff: "— Matt\nHead of Growth, NBA Top Shot",
      ps: "P.S. If you want a read on what serial #{{SERIAL}} would clear at today's floor, hit reply. I'll get you a number.",
      vars: ["ROOKIE_MOMENT_NAME", "SERIAL", "PURCHASE_DATE", "PURCHASE_PRICE", "PURCHASE_YEAR", "YEARS_SINCE_PURCHASE", "SERIAL_RANK_LANGUAGE", "G7_STAT_LINE"],
    },
  },
  {
    id: "email-segment-b",
    kind: "email",
    title: "Segment B — Toronto Holders",
    subtitle: "Conditional on Raptors winning. ~80 dormant.",
    surface: "CIO email · From: Matt Schorr",
    audience: "Owns ≥1 Lowry/Kawhi/Siakam/OG/FVV/Barrett/Barnes Moment",
    date: "May 4 · 09:00 ET",
    rationale:
      "Most asymmetric segment. Barrett's pre-game ceiling was $23. If TOR wins, the entire Raptors archive becomes contextually live for the first time in years. Their dormant Lowry from 2021 is suddenly a comp again. The opportunity is large but only if the outcome breaks our way.",
    forecast: "20–25% if TOR wins = 16–20 reactivated · 5–7% if TOR loses = 4–6",
    data: {
      from: "Matt Schorr <matt@nbatopshot.com>",
      subject: "Toronto was never the story until tonight",
      preview: "Your {{RAPTORS_MOMENT}} #{{SERIAL}}. Now it's a comp again.",
      body: [
        "You picked up {{RAPTORS_MOMENT}} #{{SERIAL}} on {{PURCHASE_DATE}}. Floor's been quiet for two years.",
        "Last night Toronto closed out a Game 7. Barrett went into the night at a $23 ceiling — one buyer, fifty cents on the floor — and came out the other side with a series-defining performance.",
        "The Raptors archive is contextually live for the first time since 2021. Your {{RAPTORS_MOMENT}} sits inside a set that just regained narrative weight. {{COMPARABLE_TRADE_LANGUAGE}}.",
        "I'm not going to tell you what to do with it. You bought it. You held it. The signal is yours to read first.",
      ],
      signoff: "— Matt\nHead of Growth, NBA Top Shot",
      ps: "P.S. The Round 2 program is at topshot.nba.com/round2 if you want context on what's coming. Hit reply with anything — I read.",
    },
  },
  {
    id: "email-segment-c",
    kind: "email",
    title: "Segment C — Cleveland Holders",
    subtitle: "Conditional on Cavs advancing. ~120 dormant.",
    surface: "CIO email · From: Matt Schorr",
    audience: "Owns ≥1 Mitchell/Mobley/Garland/LeBron-Cavs Moment",
    date: "May 4 · 09:00 ET",
    rationale:
      "Different psychological register from A. A is proof Moment ('Cade earned it last night'). C is vindication ('the market is reaching consensus you already had'). Leads with their judgment, not a stat line. This cohort bought into Cleveland early — speaking to that respect is the lever.",
    forecast: "18–22% if CLE wins = 22–26 reactivated",
    data: {
      from: "Matt Schorr <matt@nbatopshot.com>",
      subject: "Cleveland was always going to be here",
      preview: "Your {{CAVS_MOMENT}} #{{SERIAL}}. The market is calling your collection.",
      body: [
        "You hold {{CAVS_MOMENT}} #{{SERIAL}}, picked up {{TIMEFRAME}} ago for {{PURCHASE_PRICE}}.",
        "The reason I'm writing: Cleveland advanced to Round 2 last night. You owned that outcome before it was a question. Mitchell at $61 ceiling on May 1. Mobley at 3.75× three-month volume. Quietly the most disciplined accumulation pattern in the East. The market saw what you saw.",
        "What's interesting on your specific Moment: {{COMPARABLE_RECENT_TRADE_LANGUAGE}}. {{SERIAL_CONTEXT_LANGUAGE}}.",
        "I won't tell you to do anything. You've been doing this since {{COLLECTOR_TENURE_YEAR}}. But the next four weeks of Round 2 are likely to be the most active stretch on Cavs Moments in two years.",
      ],
      signoff: "— Matt",
      ps: "P.S. If you want a read on where {{CAVS_MOMENT}} sits, reply and I'll send the comp data.",
    },
  },
  {
    id: "email-segment-d",
    kind: "email",
    title: "Segment D — \"What the Market Called\"",
    subtitle: "Residual dormant cohort. ~770 collectors.",
    surface: "CIO email · From: Magic (Top Shot)",
    audience: "Dormant L+XL, no R2-team holdings",
    date: "May 5 · 15:00 ET",
    rationale:
      "Broad-net send. No per-recipient personalization needed. Show-runner voice, not Matt's named-personal. The piece is the proof: the market made four real bets, last night resolved them. The cohort is reading these signals or they're not — this email surfaces them clearly and offers the door back in.",
    forecast: "3–5% conversion = 23–38 reactivated",
    data: {
      from: "Magic <magic@nbatopshot.com>",
      subject: "Four bets the market made before Game 7",
      preview: "Cade $1.86 vs Banchero $499 on the same day. One was right.",
      body: [
        "Three days before the East Game 7s, four players had four very different prices.",
        "TABLE",
        "Last night the market got mostly right and dramatically wrong. {{POST_G7_NARRATIVE_SUMMARY}}.",
        "The reason I'm sending this to you: collecting this game well requires reading these signals before they're loud. You did that for years. The market is louder now than it was when you were active — but the signals haven't changed shape.",
        "If you want to come back to it, Round 2 is the cleanest entry window we'll have in 2026.",
      ],
      table: [
        { player: "Cade", ceiling: "$1,110 (TST)", trade: "Three-day pre-G7 mint", call: "Market priced him to perform" },
        { player: "Banchero", ceiling: "$130", trade: "$499 accumulation Apr 27", call: "One whale called Orlando close" },
        { player: "Mitchell", ceiling: "$61", trade: "35 transactions May 1", call: "Quiet conviction, broad" },
        { player: "Barrett", ceiling: "$23", trade: "One sale, $0.28 floor", call: "Market gave up; one buyer didn't" },
      ],
      signoff: "— Magic\nNBA Top Shot",
    },
  },
  {
    id: "x-r2-transition",
    kind: "x",
    title: "X thread — R2 Transition",
    subtitle: "Posts ~9 PM ET May 3 after both G7s settle",
    surface: "X / @nbatopshot",
    date: "May 3 · ~21:00 ET",
    rationale:
      "Five-tweet thread. First tweet is the spine — the hook that gets it shared. Subsequent tweets walk through what the market called and where the wins/losses landed. Last tweet pivots to Round 2 program with a single link. No 'we're excited' language. Specific numbers throughout.",
    forecast: "Target: 250+ engagements, 1+ journalist quote",
    data: {
      tweets: [
        "Three days before tonight's East Game 7s, the market made four bets:\n\nCade — $1,110 ceiling\nBanchero — $499 accumulation\nMitchell — quiet conviction\nBarrett — $0.28 floor, one buyer\n\nHere's what just resolved.",
        "Cade Cunningham's TST Playoffs Edition was minted three days before the buzzer. The market priced him to perform. Tonight he did. Ceiling held at $1,110 and the floor lifted in real time after the win.\n\nProof Moment, called in advance.",
        "Barrett went into Game 7 with a $23 ceiling — one sale, $0.28 on the floor. One buyer disagreeing with the market. Tonight that buyer got vindicated.\n\nThe asymmetric bet of Round 1.",
        "Cleveland's accumulation was the quiet one. 35 Mitchell transactions May 1. 3.75× volume on Mobley over three months. No headline buyer — broad conviction across the cohort. Tonight that read its proof.",
        "Round 2 starts now. The collectors who saw this pre-game are the ones writing the next four weeks.\n\nPanel of what's coming → topshot.nba.com/round2",
      ],
    },
  },
  {
    id: "discord-r2-transition",
    kind: "discord",
    title: "Discord pin — Round 2 opens",
    subtitle: "Pinned to #general, posts ~9 PM ET May 3",
    surface: "Discord · #general · NBA Top Shot",
    date: "May 3 · ~21:00 ET",
    rationale:
      "Different register from X. Discord is the dwelling community — they've been here all night. The post acknowledges what we just watched together, names the moments the chat already noticed, and invites the next 24 hours of conversation. No marketing register at all.",
    data: {
      author: "Top Shot",
      role: "Mod",
      body: [
        "**Round 2 starts here.**",
        "",
        "Tonight earned every Moment that just shifted. The Cade TST minted three days early was a bet — paid out by the buzzer. Barrett at $23 going into Game 7 was the quietest contrarian call I've seen this year — and one buyer was right.",
        "",
        "What the chat caught that I want to surface for the rest of you:",
        "• @collector_handle clocked the Mitchell volume curve on May 1 *(35 txns, no headline buyer — that was you)*",
        "• @collector_handle flagged the Banchero $499 accumulation back on April 27. Holds up tonight.",
        "",
        "If you traded into this, drop your screenshots. If you held, tell us what you held and why. The next 24 hours is going to be the most active conversation Top Shot has had since the Cosmic run.",
        "",
        "Round 2 program: <https://topshot.nba.com/round2>",
        "",
        "Get into it.",
      ],
    },
  },
  {
    id: "x-market-called",
    kind: "x",
    title: "X thread — \"What the Market Called\"",
    subtitle: "Companion to the May 5 essay-email",
    surface: "X / @nbatopshot",
    date: "May 5 · 15:30 ET",
    rationale:
      "Six-tweet thread. Walks through each of the four pre-game bets and how each resolved, with one chart-style tweet showing the table. Pinned for 48 hours. The PR ask: this is the piece sent direct to 3 journalists (Sportico, Athletic, Bleacher Report) — fair test of the C-amplification thesis.",
    forecast: "Test: ≥1 journalist citation in next 4 weeks",
    data: {
      tweets: [
        "On May 1, three days before the East Game 7s, four players had four very different prices.\n\nThe market was making a bet. We can now read the receipts.",
        "[Chart]",
        "Cade @ $1,110. Highest single-Moment ceiling of the playoffs. The TST mint three days before tipoff was Top Shot's product team calling the proof Moment in advance. Tonight he delivered. The market was right.",
        "Banchero @ $130 / $499 accumulation. One whale on April 27 called the close possibility. Tonight Orlando didn't close. The whale was wrong on the outcome — but the conviction was real and the data supports it.",
        "Mitchell @ $61 / 35 transactions. The quiet one. Broad accumulation across a cohort, no headline buyer. Cleveland advanced. The crowd was right.",
        "Barrett @ $23 / $0.28 floor. One sale on the day. The market had given up. One buyer disagreed with everyone. Tonight, vindication.\n\nFour bets. Two right, one wrong, one asymmetric. The signals were readable in advance — for anyone watching the data.",
      ],
    },
  },
  {
    id: "calendar-overview",
    kind: "calendar",
    title: "May 4–10 deploy schedule",
    subtitle: "Three legs in motion: dormant reactivation, active community, reactive ops",
    rationale:
      "Front-loaded for narrative density. Three CIO sends Monday morning capture the post-G7 narrative window before it cools. May 5 essay-email is the broad piece. Matt's 100 1:1s roll across the week. Wemby R2 piece on May 9 is the showcase regardless of bracket outcomes.",
    data: {
      week: [
        { date: "May 3", day: "Sat", items: [
          { time: "21:00", surface: "X / Discord", title: "R2 Transition Post" },
          { time: "21:00", surface: "Internal", title: "Lock segment lists in CIO" },
        ]},
        { date: "May 4", day: "Sun", items: [
          { time: "09:00", surface: "CIO", title: "Segment A — Detroit (Matt)" },
          { time: "09:00", surface: "CIO", title: "Segment B — Toronto (Matt)" },
          { time: "09:00", surface: "CIO", title: "Segment C — Cleveland (Matt)" },
        ]},
        { date: "May 5", day: "Mon", items: [
          { time: "15:00", surface: "CIO", title: "Segment D — \"What the Market Called\"" },
          { time: "15:30", surface: "X", title: "Companion thread" },
          { time: "16:00", surface: "PR", title: "Direct to 3 journalists (test)" },
        ]},
        { date: "May 6", day: "Tue", items: [
          { time: "All day", surface: "1:1", title: "Matt: 20 named touches" },
        ]},
        { date: "May 7", day: "Wed", items: [
          { time: "12:00", surface: "Discord", title: "Collector's Club Question" },
          { time: "All day", surface: "1:1", title: "Matt: 20 named touches" },
        ]},
        { date: "May 8", day: "Thu", items: [
          { time: "All day", surface: "1:1", title: "Matt: 20 named touches" },
        ]},
        { date: "May 9", day: "Fri", items: [
          { time: "10:00", surface: "CIO + X", title: "Wemby R2 Editorial (whole list)" },
        ]},
        { date: "May 10", day: "Sat", items: [
          { time: "EOD", surface: "Internal", title: "Reactivation report — actuals vs forecast" },
        ]},
      ],
    },
  },
  {
    id: "decision-matt-sender",
    kind: "decision",
    title: "Matt as named sender for personalized segments",
    subtitle: "Segments A / B / C send from Matt Schorr, not 'team@'",
    rationale:
      "Camp 132 vs Camp 163 history shows 3× CTR uplift from voice register alone (warm vs cold), same audience, same timing. The mechanism is named-human warmth. Generic warmth from a brand fails on this cohort. 'Matt Schorr, Head of Growth' is the right level — known, accountable, replyable.",
    data: {
      pros: [
        "3× CTR uplift mechanism (Camp 132 baseline)",
        "Reply paths route to a real human who can quote serials",
        "Named-human warmth is the B-spine prerequisite",
      ],
      cons: [
        "Matt's reply bandwidth — needs Kenny's CS infrastructure to scale",
        "Sender concentration risk — if Matt is OOO, the program pauses",
        "Brand-vs-individual tension — but for reactivation, individual wins",
      ],
      ask: "Roham + Matt sign off",
    },
  },
  {
    id: "decision-cio-surface",
    kind: "decision",
    title: "Drop \"Slack-first.\" CIO is the reactivation surface.",
    subtitle: "Slack is internal. Discord + X are active community. CIO email is dormant.",
    rationale:
      "The original framing said 'Phase 1 Slack-first.' That confused internal team comms (Dapper Slack, where I post to you) with the external community surface (Discord). And neither reaches the dormant cohort. Reactivation surface is owned email through Customer.io. Period.",
    data: {
      surfaces: [
        { name: "Discord", role: "Active community, real-time", audience: "Active collectors" },
        { name: "X / Twitter", role: "Public reach", audience: "Active + journalists + fans" },
        { name: "CIO email", role: "Reactivation broadcast + segmented", audience: "Whole list incl. dormant" },
        { name: "In-app feed", role: "Owned, log-in only", audience: "Active only" },
        { name: "Dapper Slack", role: "Internal team", audience: "Never customer-facing" },
      ],
      ask: "Confirm framing. Approve CIO send authorization for May 4–9 sends.",
    },
  },
  {
    id: "decision-top-50",
    kind: "decision",
    title: "Top 50 by historic spend get Matt's 1:1 outreach first",
    subtitle: "20 names/day × 5 working days = 100 touches. Top 50 in the first three days.",
    rationale:
      "ROI on personal touch on whales runs 25–35% conversion versus 3–5% on broadcast. The top 50 by historic spend in the dormant cohort represent the largest share of recoverable LTV. Front-loading them captures the narrative-density window before it cools, and gives Matt the most leveraged list.",
    data: {
      mechanic: "I produce per-collector content packs (BQ → wallet → notable holdings → R2 narrative fit). Matt sends from his account. Replies route to a triage queue (Kenny + Matt).",
      blockers: [
        "BQ credential refresh (provisioning a service-account key file unblocks personalization)",
        "Matt's 1.5h/day commitment for 5 days",
        "Kenny's CS infrastructure routes replies in under 2h",
      ],
    },
  },
  {
    id: "abtest-segment-a-subject",
    kind: "abtest",
    title: "Segment A subject line — 3 variants",
    subtitle: "All warm. Different angles. Pick one or vote ship-all.",
    rationale:
      "All three are Camp-132 register. The differences are angle: V1 is observation, V2 is question-as-hook, V3 is plain market-context. Subject line is the single biggest controllable lever on open rate — worth picking deliberately rather than defaulting to the first written.",
    data: {
      variants: [
        { label: "V1 (current)", subject: "What you saw in Detroit before they did", preview: "Your Cade rookie. Reading this morning differently." },
        { label: "V2", subject: "Your Cade rookie predates the $1,110 ceiling by three years", preview: "Three years ahead of the market." },
        { label: "V3", subject: "Detroit is in Round 2. Your wallet has been there since 2021.", preview: "What that means for your collection today." },
      ],
    },
  },
];

export const SEGMENT_REASONS = [
  "Voice doesn't sound like Matt",
  "Too long",
  "Too short / too thin",
  "Wrong narrative angle",
  "Personalization tokens feel templated",
  "Subject line is weak",
  "Forecast feels overstated",
  "Forecast feels understated",
  "Wrong cohort definition",
  "Timing is off",
  "Risks the brand",
];
