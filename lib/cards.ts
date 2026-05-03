export type CardKind = "email" | "x" | "discord";

export type Card = {
  id: string;
  kind: CardKind;
  title: string;
  audience: string;
  date: string;
  data?: Record<string, unknown>;
};

export const CARDS: Card[] = [
  {
    id: "email-detroit",
    kind: "email",
    title: "Email — for Detroit Pistons collectors",
    audience:
      "Sent to collectors who own a Cade Cunningham rookie Moment, have spent over $100,000 on Top Shot in their lifetime, and haven't been active in the last 60+ days.",
    date: "Sent Sunday May 4, 9:00 AM ET — only if Detroit wins their Game 7 tonight",
    data: {
      from: "Matt Schorr <matt@nbatopshot.com>",
      to: "you@example.com",
      subject: "What you saw in Detroit before they did",
      preview: "Your Cade Cunningham rookie. Reading this morning differently.",
      body: [
        "You bought Cade Cunningham's 2021-22 Rookie Debut on October 14, 2021 for $48. Serial #1,247 — top 8% of the mint, the thin end where the early believers landed.",
        "Last night Cade put up 31 points and 9 assists in a Game 7 to send Detroit to Round 2. The Top Shot Trade Ticket Playoffs Edition Moment we minted three days before tipoff hit a $1,110 ceiling within an hour after the buzzer. Highest single-Moment ceiling on the platform this entire postseason.",
        "Here's the part I thought you'd want to know. Your rookie pre-dates that Trade Ticket by almost five years. The story Top Shot is telling about Cade today — that he's a foundational Pistons Moment-maker — is a story your wallet has been telling since 2021.",
        "The market is just catching up.",
        "We launched a Round 2 program this morning. I won't pitch you on it — you can read it at topshot.nba.com/round2. I'm writing because I noticed you'd been quiet for a while, and I thought you'd want to know what your collection looks like in this light.",
      ],
      signoff: "— Matt\nHead of Growth, NBA Top Shot",
      ps: "P.S. If you want a read on what serial #1,247 of the Cade rookie would clear at today's floor, hit reply. I'll get you a number.",
    },
  },
  {
    id: "email-toronto",
    kind: "email",
    title: "Email — for Toronto Raptors collectors",
    audience:
      "Sent to collectors who own at least one Toronto Raptors Moment (Lowry, Kawhi, Siakam, OG, FVV, Barrett, Barnes), have spent over $100,000 on Top Shot in their lifetime, and haven't been active in the last 60+ days.",
    date: "Sent Sunday May 4, 9:00 AM ET — only if Toronto wins their Game 7 tonight",
    data: {
      from: "Matt Schorr <matt@nbatopshot.com>",
      to: "you@example.com",
      subject: "Toronto was never the story until tonight",
      preview: "Your Pascal Siakam Layup #5,201. Now it's a comp again.",
      body: [
        "You picked up Pascal Siakam's Layup, serial #5,201, back in March 2022. Floor's been quiet for two years.",
        "Last night Toronto closed out a Game 7. RJ Barrett went into the night at a $23 ceiling — one buyer, fifty cents on the floor — and came out the other side with a series-defining performance.",
        "The Raptors archive is contextually live for the first time since 2021. Your Siakam sits inside a set that just regained narrative weight. The last comparable Siakam Moment cleared at $84 yesterday afternoon.",
        "I'm not going to tell you what to do with it. You bought it. You held it. The signal is yours to read first.",
      ],
      signoff: "— Matt\nHead of Growth, NBA Top Shot",
      ps: "P.S. The Round 2 program is at topshot.nba.com/round2 if you want context on what's coming. Hit reply with anything — I read every one.",
    },
  },
  {
    id: "email-cleveland",
    kind: "email",
    title: "Email — for Cleveland Cavaliers collectors",
    audience:
      "Sent to collectors who own at least one Cleveland Cavaliers Moment (Mitchell, Mobley, Garland, or LeBron-era Cavs), have spent over $100,000 on Top Shot in their lifetime, and haven't been active in the last 60+ days.",
    date: "Sent Sunday May 4, 9:00 AM ET — only if Cleveland wins their Game 7 tonight",
    data: {
      from: "Matt Schorr <matt@nbatopshot.com>",
      to: "you@example.com",
      subject: "Cleveland was always going to be here",
      preview: "Your Donovan Mitchell Pull-up Three #2,418. The market is calling your collection.",
      body: [
        "You hold Donovan Mitchell's Pull-up Three, serial #2,418, picked up two years ago for $112.",
        "The reason I'm writing: Cleveland advanced to Round 2 last night. You owned that outcome before it was a question. Mitchell at $61 ceiling on May 1. Mobley running 3.75 times his three-month volume. Quietly the most disciplined accumulation pattern in the East. The market saw what you saw.",
        "What's interesting on your specific Moment: three sales of similar serial ranges have cleared above $200 in the last 48 hours. Sub-3,000 serials on Mitchell are tightening fast.",
        "I won't tell you to do anything. You've been doing this since 2021. But the next four weeks of Round 2 are likely to be the most active stretch on Cavs Moments in two years.",
      ],
      signoff: "— Matt",
      ps: "P.S. If you want a read on where #2,418 sits, reply and I'll send the comp data.",
    },
  },
  {
    id: "email-residual",
    kind: "email",
    title: "Email — for everyone else who's gone quiet",
    audience:
      "Sent to collectors who used to spend a lot ($100,000+ lifetime) but don't own Moments from any of tonight's playoff teams. About 770 people. The broad-net send.",
    date: "Sent Monday May 5, 3:00 PM ET",
    data: {
      from: "Magic <magic@nbatopshot.com>",
      to: "you@example.com",
      subject: "Four bets the market made before Game 7",
      preview: "Cade $1.86 vs Banchero $499 on the same day. One was right.",
      body: [
        "Three days before the East Game 7s, four players had four very different prices.",
        "TABLE",
        "Last night the market got mostly right and dramatically wrong. Detroit advanced. Cleveland advanced. Orlando went home. Toronto closed it out — and Barrett's Game 7, going into the night with a $23 ceiling, was the most asymmetric play I've seen all postseason.",
        "The reason I'm sending this to you: collecting this game well requires reading these signals before they're loud. You did that for years. The market is louder now than it was when you were active — but the signals haven't changed shape.",
        "If you want to come back to it, Round 2 is the cleanest entry window we'll have in 2026. topshot.nba.com/round2.",
      ],
      table: [
        { player: "Cade Cunningham", ceiling: "$1,110", trade: "Three-day pre-Game-7 mint", call: "Market priced him to perform" },
        { player: "Paolo Banchero", ceiling: "$130", trade: "$499 buy on April 27", call: "One whale called Orlando close" },
        { player: "Donovan Mitchell", ceiling: "$61", trade: "35 transactions on May 1", call: "Quiet conviction, broad" },
        { player: "RJ Barrett", ceiling: "$23", trade: "One sale, $0.28 floor", call: "Market gave up; one buyer didn't" },
      ],
      signoff: "— Magic\nNBA Top Shot",
    },
  },
  {
    id: "x-r2-transition",
    kind: "x",
    title: "Public post on X (Twitter)",
    audience:
      "Anyone on X. Public. Goes out about an hour after both Game 7s end tonight. We're hoping it gets shared by basketball Twitter and journalists.",
    date: "Tonight (Saturday May 3) around 9 PM ET — after both Game 7s settle",
    data: {
      tweets: [
        "Three days before tonight's East Game 7s, the market made four bets:\n\nCade — $1,110 ceiling\nBanchero — $499 accumulation\nMitchell — quiet conviction\nBarrett — $0.28 floor, one buyer\n\nHere's what just resolved.",
        "Cade Cunningham's Trade Ticket Playoffs Edition was minted three days before the buzzer. The market priced him to perform. Tonight he did. Ceiling held at $1,110 and the floor lifted in real time after the win.\n\nProof Moment, called in advance.",
        "Barrett went into Game 7 with a $23 ceiling — one sale, $0.28 on the floor. One buyer disagreeing with the entire market. Tonight that buyer got vindicated.\n\nThe asymmetric bet of Round 1.",
        "Cleveland's accumulation was the quiet one. 35 Mitchell transactions on May 1. 3.75× volume on Mobley over three months. No headline buyer — broad conviction across the cohort. Tonight that read its proof.",
        "Round 2 starts now. The collectors who saw this pre-game are the ones writing the next four weeks.\n\nWhat's coming → topshot.nba.com/round2",
      ],
    },
  },
  {
    id: "discord-r2-transition",
    kind: "discord",
    title: "Pinned post in our Discord community",
    audience:
      "Active collectors in the NBA Top Shot Discord. People who hang out there every day and discuss drops, trades, and Moments together. Pinned to #general so it stays at the top.",
    date: "Tonight (Saturday May 3) around 9 PM ET — after both Game 7s end",
    data: {
      author: "Top Shot",
      role: "Mod",
      body: [
        "**Round 2 starts here.**",
        "",
        "Tonight earned every Moment that just shifted. The Cade Trade Ticket minted three days early was a bet — paid out by the buzzer. Barrett at $23 going into Game 7 was the quietest contrarian call I've seen this year — and one buyer was right.",
        "",
        "What the chat caught that I want to surface for the rest of you:",
        "• @collector_handle clocked the Mitchell volume curve on May 1 *(35 transactions, no headline buyer — that was you)*",
        "• @collector_handle flagged the Banchero $499 buy back on April 27. Holds up tonight.",
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
    title: "Public post on X — \"What the Market Called\"",
    audience:
      "Anyone on X. Public. We're sending this directly to three sports journalists (Sportico, The Athletic, Bleacher Report) at the same time, to test whether our data gets cited.",
    date: "Monday May 5, 3:30 PM ET",
    data: {
      tweets: [
        "On May 1, three days before the East Game 7s, four players had four very different prices.\n\nThe market was making a bet. We can now read the receipts.",
        "[Chart]",
        "Cade @ $1,110 ceiling. Highest single-Moment ceiling of the playoffs. The Trade Ticket mint three days before tipoff was Top Shot calling the proof Moment in advance. Tonight he delivered. The market was right.",
        "Banchero @ $130 ceiling, $499 buy April 27. One whale called the Orlando close. Tonight Orlando didn't close. The whale was wrong on the outcome — but the conviction was real and the data supports it.",
        "Mitchell @ $61 ceiling, 35 transactions on May 1. The quiet one. Broad accumulation across a cohort, no headline buyer. Cleveland advanced. The crowd was right.",
        "Barrett @ $23 ceiling, $0.28 floor. One sale on the day. The market had given up. One buyer disagreed with everyone. Tonight, vindication.\n\nFour bets. Two right, one wrong, one asymmetric. The signals were readable in advance — for anyone watching the data.",
      ],
    },
  },
];

export const REASONS = [
  "Voice doesn't sound like a real person",
  "Too long",
  "Too short — needs more",
  "Wrong angle / message",
  "Feels too templated",
  "Subject line is weak",
  "Wrong audience for this message",
  "Bad timing",
  "Risks the brand",
  "Could be more specific",
];
