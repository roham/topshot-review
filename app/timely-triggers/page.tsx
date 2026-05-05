import Link from "next/link";

type Exemplar = {
  id: string;
  brand: string;
  surface: string;
  trigger: string;
  timeFromEvent: string;
  src: string;
  whatYoureSeeing: string;
  takeaway: string;
};

type ExternalRef = {
  brand: string;
  surface: string;
  trigger: string;
  timeFromEvent: string;
  url: string;
  note: string;
};

const EXEMPLARS: Exemplar[] = [
  {
    id: "thescore-lockscreen",
    brand: "theScore",
    surface: "iOS Live Activity (lock screen)",
    trigger: "User opted in mid-game",
    timeFromEvent: "Sub-second updates throughout game",
    src: "/timely-triggers/01-thescore-lockscreen-live-activity.jpg",
    whatYoureSeeing:
      "TOR 3 — 3rd 20:00 — NJD 2. The game lives on the lock screen as a persistent, ambient widget. No tap required to know the state.",
    takeaway:
      "This is the ceiling for time-sensitive presence. The Top Shot This analogue: a lock-screen widget showing 'Tonight's Moment-of-the-Night unlocks in 1h 12m,' updating live during the game, with a tap-to-open that goes straight to the pack page. Once the buzzer sounds, the widget flips to 'Available now — closes in 23h 47m.'",
  },
  {
    id: "thescore-pushes",
    brand: "theScore",
    surface: "iOS Lock screen + Notification Center",
    trigger: "Goal events fired during live game",
    timeFromEvent: "10 minutes / 23 minutes after the play",
    src: "/timely-triggers/02-thescore-lockscreen-pushes.jpg",
    whatYoureSeeing:
      "Live Activity widget at top, plus two stacked push notifications: 'Svech hits the Michigan' (10m ago) and 'Ridiculous goal by Vilardi' (23m ago). Each push has a thumbnail of the actual play.",
    takeaway:
      "The pattern: short headline + emotional descriptor + visual proof. For Top Shot This: 'Wemby just blocked his 12th — that's an NBA record. Moment drops at noon.' with the actual block clip as the thumbnail. Push delivery within 10 minutes of the event is the bar.",
  },
  {
    id: "thescore-never-miss",
    brand: "theScore",
    surface: "In-app teaching tooltip during live game",
    trigger: "User opens game page while game is in progress",
    timeFromEvent: "Real-time, contextual",
    src: "/timely-triggers/03-thescore-never-miss-moment-tooltip.jpg",
    whatYoureSeeing:
      "Mid-game, an electric-blue tooltip slides in: 'Never Miss a Moment! Follow this game on your lock screen by starting a Live Activity.' Bound to the live-game tab, not a generic settings prompt.",
    takeaway:
      "The opt-in is sold *while the user is engaged*, not at onboarding. For Top Shot This, the analogue is: when a user is watching a game in-app or has a notable team in their portfolio, surface 'Get the Moment-of-the-Night first — turn on alerts for tonight's game' as an inline affordance, not a settings page.",
  },
  {
    id: "espn-my-games",
    brand: "ESPN",
    surface: "iOS app home — 'My Games'",
    trigger: "Live game state for user's followed teams",
    timeFromEvent: "Continuous, real-time clock",
    src: "/timely-triggers/04-espn-my-games-bell-icon.jpg",
    whatYoureSeeing:
      "Eagles vs Patriots: 17-24, live clock '12:46 -3rd', red ball icon, blue notification bell on the right rail. Below it a *completed* game (Alabama 39 - LSU 31, Final Sat 11/06) with a 'Highlights' button. Same surface, two states — live and post-game.",
    takeaway:
      "One personal home that flips state depending on game phase. Pre-game: countdown. Live: clock + bell. Post-game: Highlights button. Top Shot This should mirror this — the same homepage card hosts 'Tip-off in 2h' → 'Live now, 4 Q-1' → 'Moment of the Night unlocks in 16h' → 'Available now, your Moment ↓'. Don't make users navigate to separate pages for each phase.",
  },
  {
    id: "espn-track-every-play",
    brand: "ESPN",
    surface: "MLB Scorecast — live game state",
    trigger: "Live pitch-by-pitch updates",
    timeFromEvent: "Updates within seconds of each play",
    src: "/timely-triggers/05-espn-track-every-play.jpg",
    whatYoureSeeing:
      "TOR @ LAD, 3-2 in the Top 4th, with Ohtani pitching live (23P / 2.1IP / 1K) and Guerrero Jr. 1-1 at the plate. Every stat refreshes as the game happens.",
    takeaway:
      "The user expects state to be live. There is no refresh button. Top Shot's pre-Moment surface should never show stale state. If we're 4 minutes away from a Moment unlocking, the timer ticks down. If a player has 11 blocks heading into the 4th and the Moment is keyed to a record-break, the surface should reflect 'Wemby is 1 block from the all-time record' in real time.",
  },
  {
    id: "topps-bunt-countdown",
    brand: "Topps BUNT",
    surface: "Season Pass — limited window",
    trigger: "Season-bounded reward track",
    timeFromEvent: "18 days, 17 hours remaining",
    src: "/timely-triggers/06-topps-bunt-season-countdown.jpg",
    whatYoureSeeing:
      "'Season 8 | Retro Season 25!' with a clock badge reading '18D 17H' next to the level progress bar. The countdown is the headline element — bigger and brighter than the level number.",
    takeaway:
      "The window is the product. Top Shot This isn't 'forever-available drops with nice timing copy' — it's 'this Moment exists for X hours, then never again.' The countdown should be a first-class UI element, not buried in body copy. Topps's choice to surface days+hours (not just hours) is right for windows over 24h. Sub-24h, switch to hh:mm:ss.",
  },
  {
    id: "topps-bunt-live-contests",
    brand: "Topps BUNT",
    surface: "Live Contests — fantasy challenge with cards",
    trigger: "Real-time scoring during live MLB games",
    timeFromEvent: "Continuous, score-event driven",
    src: "/timely-triggers/07-topps-bunt-live-contests.jpg",
    whatYoureSeeing:
      "'PLAY YOUR COLLECTION IN LIVE CONTESTS — Set lineups with cards that score in real-time!' Cards are turned into fantasy assets that earn points as their player performs in tonight's game.",
    takeaway:
      "Cards stop being passive when they have a live use. For Top Shot This, the strongest version isn't a pack drop after the game — it's: hold a Wemby Moment AND a 'Defensive Stand' challenge ticket, and tonight's blocks score live against the leaderboard. The Moment is the entry condition. The game is the engine. The pack is the prize. This pattern earns daily attention better than any drop email can.",
  },
  {
    id: "topps-bunt-craft-cooldowns",
    brand: "Topps BUNT",
    surface: "Crafting — micro-window cooldowns",
    trigger: "Per-craft timer (sub-minute and 3-minute windows)",
    timeFromEvent: "Live ticking timer per craft slot",
    src: "/timely-triggers/08-topps-bunt-craft-cooldowns.jpg",
    whatYoureSeeing:
      "Three craft slots, each with a different timer: CLAIM (ready), 0:09 ticking down, 00:03:00 starting. Three windows of urgency on one page.",
    takeaway:
      "Layered urgency. Not every timely-trigger is 24-hour-Topps-NOW scale. There's a place for sub-minute 'this window opens for 60s after the buzzer' mechanics — flash mints, surge prices, claim windows. Top Shot This can layer: a same-night flash window (first 10 minutes after the event = special edition), a 24-hour standard window, a 48-hour after-window for late buyers at higher price.",
  },
];

const EXTERNAL_REFS: ExternalRef[] = [
  {
    brand: "Fanatics UK",
    surface: "Email blast",
    trigger: "Lakers winning the 2020 NBA Finals",
    timeFromEvent: "Hours after Game 6, Oct 11 2020",
    url: "https://milled.com/fanatics-uk/the-lakers-are-2020-nba-champions-R0xguJ5t4O5JQacC",
    note: "The canonical 'champions are crowned, shop is open' email. Fanatics fires a templated version of this within hours of every championship.",
  },
  {
    brand: "Topps",
    surface: "Email blast",
    trigger: "New Topps NOW card available",
    timeFromEvent: "Same-day after MLB moment",
    url: "https://milled.com/topps/dont-miss-the-latest-topps-now-ay87b92CVoEj2U9j",
    note: "'Don't miss the latest Topps NOW' — hero card art + 24-hour print-window framing.",
  },
  {
    brand: "Topps",
    surface: "Email blast",
    trigger: "Last hours of a Topps NOW window",
    timeFromEvent: "Final ~4 hours of 24-hour window",
    url: "https://milled.com/topps/last-chance-mlb-topps-now-Ud9x_8qvbHQVnbQi",
    note: "'Last Chance' framing. Direct analogue to 'Top Shot This window closes in X hours.'",
  },
  {
    brand: "Topps",
    surface: "Email blast",
    trigger: "World Series matchup confirmed",
    timeFromEvent: "Hours after series clinch",
    url: "https://milled.com/topps/new-world-series-matchup-topps-now-cards-R8mY1w6bpqxh9eOt",
    note: "Trigger card drop tied to the moment a postseason matchup locks in. Closest competitor analogue to 'Top Shot This → Conference Finals clinched.'",
  },
  {
    brand: "Panini America",
    surface: "Brand landing page",
    trigger: "Live moment-to-card pipeline",
    timeFromEvent: "As moments happen — same-day mint",
    url: "https://www.paniniamerica.net/panini-instant/panini-instant.html",
    note: "Panini Instant's hub. Direct competitor framing: 'must-see moments and major milestones into ready-to-purchase cards as they happen.'",
  },
  {
    brand: "Panini Instant (DE)",
    surface: "Email blast",
    trigger: "First UEFA Euro 2020 cards",
    timeFromEvent: "Same-day after match",
    url: "https://milled.com/paninishop/uefa-euro-2020-panini-instant-die-ersten-cards-sind-da-aUS1RnNPnRZInDis",
    note: "'The first cards are here' framing — triggered by tournament moments. German-language but the design pattern transfers.",
  },
  {
    brand: "DraftKings",
    surface: "iOS Live Activity (lock screen)",
    trigger: "Active bet slip during a live game",
    timeFromEvent: "Real-time bet status",
    url: "https://support.draftkings.com/dk/en-us/tracking-bets-on-your-lock-screen-overview?id=kb_article_view&sysparm_article=KB0010802",
    note: "DK's official guide to their Live Activity. Direct UX reference for 'your Top Shot This window is open' lock-screen presence.",
  },
  {
    brand: "DraftKings",
    surface: "Live in-game betting hub",
    trigger: "NBA game in progress",
    timeFromEvent: "Continuously updated next-event props",
    url: "https://sportsbook.draftkings.com/live?category=live-in-game&subcategory=basketball",
    note: "Best-in-class for in-game moment-betting prompt design. Worth a screenshot during the next Cavs/Pistons or Thunder/Lakers tip-off.",
  },
  {
    brand: "ESPN",
    surface: "Reporter alerts FAQ",
    trigger: "Breaking news / scoops from named reporters",
    timeFromEvent: "Within minutes of the news",
    url: "https://www.espn.com/espn/story/_/id/43511398/introducing-espn-reporter-breaking-news-alerts-faq-fans",
    note: "The 'Jeff Passan alert' pattern that conditions sports fans to expect instant news pushes. Sets the user expectation we're building Top Shot This against.",
  },
  {
    brand: "NBA Top Shot",
    surface: "Email — drop-imminent",
    trigger: "Pack drop in T-minus hours",
    timeFromEvent: "Hours before drop",
    url: "https://milled.com/nba-top-shot/the-cats-are-back-new-packs-drop-at-12-pm-pdt-xsZ5STnsGAdpjCn2",
    note: "Internal 'before' reference — the current Top Shot drop-imminent template. Useful as the bar to clear.",
  },
  {
    brand: "NBA Top Shot",
    surface: "Email — final playoff drop",
    trigger: "Series-tied drop announcement",
    timeFromEvent: "Tied to playoff progression",
    url: "https://milled.com/nba-top-shot/the-final-playoff-pack-drop-is-coming-soon-46PTm4Oqya1KLfa9",
    note: "Closest internal precedent for what Top Shot This wants to be — playoff-event-tied drop framing.",
  },
];

export default function TimelyTriggersPage() {
  return (
    <main className="min-h-[100dvh] bg-ink-950 text-ink-100">
      <header className="border-b border-white/5 px-6 sm:px-10 pt-10 pb-8">
        <Link
          href="/"
          className="text-[11px] uppercase tracking-[0.22em] text-flame-400 font-semibold hover:text-flame-300"
        >
          ← topshot review
        </Link>
        <h1 className="mt-3 font-display text-[36px] sm:text-5xl font-semibold tracking-tight text-balance leading-[1.05]">
          Timely-trigger reference deck for Top Shot This
        </h1>
        <p className="mt-4 max-w-3xl text-[15px] sm:text-base text-ink-300 leading-relaxed text-pretty">
          Best-in-class examples of time-sensitive UX patterns from sports software platforms. The
          benchmark question: <em>what does the post-buzzer pack drop need to feel like?</em> Eight
          captured artifacts below, plus eleven external references for emails behind Cloudflare /
          login walls. Curated 2026-05-05 by Magic.
        </p>
      </header>

      <section className="px-6 sm:px-10 py-12">
        <h2 className="text-[12px] uppercase tracking-[0.18em] text-ink-400 font-semibold">
          captured · {EXEMPLARS.length} screenshots
        </h2>

        <div className="mt-6 space-y-12">
          {EXEMPLARS.map((e, i) => (
            <article
              key={e.id}
              className="grid grid-cols-1 lg:grid-cols-[minmax(280px,360px)_1fr] gap-8 lg:gap-10 items-start border-t border-white/5 pt-10 first:border-t-0 first:pt-0"
            >
              <div className="rounded-2xl overflow-hidden bg-black/40 border border-white/10 shadow-xl">
                <img
                  src={e.src}
                  alt={`${e.brand} — ${e.surface}`}
                  className="w-full h-auto block"
                />
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-flame-400 font-semibold">
                    {String(i + 1).padStart(2, "0")} · {e.brand}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.14em] text-ink-500">
                    {e.surface}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-[24px] sm:text-[28px] font-semibold tracking-tight text-ink-50 text-balance leading-[1.15]">
                  {e.whatYoureSeeing}
                </h3>
                <dl className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px]">
                  <div>
                    <dt className="text-ink-500 uppercase tracking-wider text-[10px]">
                      Trigger
                    </dt>
                    <dd className="text-ink-200 mt-1">{e.trigger}</dd>
                  </div>
                  <div>
                    <dt className="text-ink-500 uppercase tracking-wider text-[10px]">
                      Time from event
                    </dt>
                    <dd className="text-ink-200 mt-1">{e.timeFromEvent}</dd>
                  </div>
                </dl>
                <p className="mt-5 text-[15px] text-ink-200 leading-relaxed text-pretty">
                  <span className="text-mint-400 font-semibold">For Top Shot This:</span>{" "}
                  {e.takeaway}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-white/5 px-6 sm:px-10 py-12 bg-black/20">
        <h2 className="text-[12px] uppercase tracking-[0.18em] text-ink-400 font-semibold">
          external references · {EXTERNAL_REFS.length} click-through artifacts
        </h2>
        <p className="mt-3 max-w-3xl text-[14px] text-ink-400 leading-relaxed">
          These are real archived emails / live brand surfaces that I couldn't render to image
          here (Cloudflare bot challenges block headless capture in this environment, and the
          container has no display server for a real browser). Each link is a direct URL to the
          artifact — open in a desktop browser to see the rendered email or live UI.
        </p>
        <ul className="mt-6 divide-y divide-white/5">
          {EXTERNAL_REFS.map((r, i) => (
            <li key={i} className="py-4 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
              <div className="sm:w-44 shrink-0">
                <span className="text-[12px] uppercase tracking-[0.14em] text-flame-400 font-semibold">
                  {r.brand}
                </span>
                <div className="text-[11px] uppercase tracking-[0.12em] text-ink-500 mt-0.5">
                  {r.surface}
                </div>
              </div>
              <div className="flex-1">
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-100 underline decoration-flame-500/40 hover:decoration-flame-500 underline-offset-4 break-words"
                >
                  {r.trigger}
                </a>
                <div className="text-[12px] text-ink-500 mt-0.5">
                  Time from event: {r.timeFromEvent}
                </div>
                <p className="text-[14px] text-ink-300 mt-2 leading-relaxed">{r.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <footer className="border-t border-white/5 px-6 sm:px-10 py-10 text-[12px] text-ink-500 leading-relaxed">
        <p className="max-w-3xl">
          <span className="text-ink-400 font-semibold">Source notes:</span> screenshots pulled
          from the Apple App Store iTunes Lookup API and from theScore's own product
          announcement (assets-cms.thescore.com). External references located via milled.com,
          paniniamerica.net, support.draftkings.com, espn.com. Curated by Magic on
          2026-05-05 in support of the Top Shot This / Moment-of-the-Night feature thread.
        </p>
      </footer>
    </main>
  );
}
