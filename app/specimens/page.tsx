"use client";

import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

type EmailSpecimen = {
  id: string;
  trigger: string;
  label: string;
  subject: string;
  preheader: string;
  from: string;
  headline: string;
  paragraphs: string[];
  cta: string;
  footerLinks?: string;
};

const SPECIMENS: EmailSpecimen[] = [
  {
    id: "abandoned-cart-maxey",
    trigger: "Abandoned Cart",
    label: "Jordan · Tyrese Maxey #247/3,500",
    subject: "Jordan, your Tyrese Maxey #247/3,500 is still here",
    preheader: "Listed at $182 · 4 days since you last looked · 3,500 is the full print run",
    from: "NBA Top Shot <hello@nbatopshot.com>",
    headline: "Your Tyrese Maxey is still available.",
    paragraphs: [
      "You saved serial #247 from the Playoff Push set — Maxey's 39-point Game 7 against Boston in the first round. That game is the reason Philadelphia is in the East Semis tonight.",
      "3,500 is the full print run. Serial #247 puts you in the bottom 7% of the run. The listing has been at $182 for four days.",
      "If it sells before you come back, the next available comparable serial will cost more. The market for Maxey has been moving since Philly-Celtics G7.",
    ],
    cta: "View in Cart",
    footerLinks: "Manage preferences · Unsubscribe · Help",
  },
  {
    id: "drop-announcement-cade",
    trigger: "Drop Announcement",
    label: "Series 9 Reserve · Cade Cunningham · Wednesday",
    subject: "Cade Cunningham Series 9 drops Wednesday at 2 PM ET",
    preheader: "8,000 packs · $29 · 6 Moments per pack · 30-minute window",
    from: "NBA Top Shot <drops@nbatopshot.com>",
    headline: "Cade Cunningham Series 9 Reserve. Wednesday, 2 PM ET.",
    paragraphs: [
      "8,000 packs. $29 each. 6 Moments per pack from a checklist anchored by Cade Cunningham, Tyrese Maxey, and Scottie Barnes.",
      "The Rare slots are Cunningham playoff performances from the Detroit comeback series — G5 (45 points, Pistons franchise playoff record) and G6 (32/10/4). There are 1,500 of each Rare. The window is 30 minutes. Limit 2 packs per account.",
      "Cade is in the East Semis right now against Cleveland. What happens in that series happens to these Moments.",
    ],
    cta: "Set a Reminder",
    footerLinks: "Drop calendar · Manage preferences · Unsubscribe",
  },
  {
    id: "welcome-sarah",
    trigger: "Welcome",
    label: "Sarah · New Collector",
    subject: "Sarah, welcome to NBA Top Shot",
    preheader: "You own Moments tied to real NBA games. Here's the one thing to do first.",
    from: "NBA Top Shot <welcome@nbatopshot.com>",
    headline: "You're in. Here's what this actually is.",
    paragraphs: [
      "NBA Top Shot Moments aren't videos you can download. They're digital collectibles — each one has a serial number, a print run, and an on-chain ownership record that says you own this specific one.",
      "Your first pack is in your collection right now. Open it. See your serial numbers. Each Moment in that pack is one of a limited print run, and you own the specific one in front of you.",
      "The market for these moves with the game. When a player does something that matters in the playoffs, the Moments from that game move in price. Your collection is live.",
    ],
    cta: "Open Your Pack",
    footerLinks: "How Top Shot works · Help center · Unsubscribe",
  },
  {
    id: "pack-received-marcus",
    trigger: "Pack Received",
    label: "Marcus · Series 9 Reserve Pack",
    subject: "Marcus, here's what was in your pack",
    preheader: "1 Rare + 2 Commons · Series 9 · your Moments are ready",
    from: "NBA Top Shot <packs@nbatopshot.com>",
    headline: "Here's your Series 9 pack.",
    paragraphs: [
      "You got three Moments: Cooper Flagg Rare #156/1,500 (his January 21 performance vs. the Lakers — 24 points, 9 rebounds), Tyrese Maxey Common #2,847/3,500, and Julius Randle Common #1,204/3,500.",
      "The Flagg Rare is the headline. He won Rookie of the Year this season despite Dallas missing the playoffs — first ROTY on a non-playoff team since Blake Griffin in 2010. Serial #156 puts you in the top 10% of the print run.",
      "Current market value across your three Moments: $47. The Flagg Rare is doing most of the work at $38 based on recent comparable sales.",
    ],
    cta: "View Your Collection",
    footerLinks: "Sell on the market · Set completion · Unsubscribe",
  },
  {
    id: "reactivation-sarah",
    trigger: "Reactivation",
    label: "Sarah · Last Active December",
    subject: "Your Top Shot collection since December",
    preheader: "14 Moments · current value $2,400 · the market moved",
    from: "NBA Top Shot <hello@nbatopshot.com>",
    headline: "Your collection since December.",
    paragraphs: [
      "You have 14 Moments. Total market value is $2,400 based on the most recent comparable sales — up from $1,840 in December when you last logged in.",
      "Most of that movement is your Cade Cunningham Rare from the '25-26 season. It was at $74 in December. It's at $312 today. The Pistons just completed a 3-1 comeback against the Magic in Game 7 last night — Cade had 32 points and 12 assists. He's in the East Semis against Cleveland starting this week.",
      "There are things you can do with the collection: list items on the market, use them toward set completions, or hold. The collection page shows you where every Moment stands.",
    ],
    cta: "See Your Collection",
    footerLinks: "Manage preferences · Unsubscribe · Help",
  },
];

// ─── EMAIL PREVIEW ───────────────────────────────────────────────────────────

function EmailPreview({ s }: { s: EmailSpecimen }) {
  return (
    <div
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        maxWidth: 600,
        margin: "0 auto",
        background: "#0d0d0d",
        border: "1px solid #2a2a2a",
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      {/* Logo bar */}
      <div
        style={{
          padding: "20px 32px",
          borderBottom: "1px solid #2a2a2a",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: "#f5f5f5",
            textTransform: "uppercase",
          }}
        >
          NBA Top Shot
        </span>
        <span style={{ fontSize: 11, color: "#555" }}>nbatopshot.com</span>
      </div>

      {/* Headline */}
      <div style={{ padding: "32px 32px 0" }}>
        <p
          style={{
            margin: 0,
            fontSize: 26,
            fontWeight: 700,
            color: "#f5f5f5",
            lineHeight: 1.25,
          }}
        >
          {s.headline}
        </p>
      </div>

      {/* Body */}
      <div style={{ padding: "20px 32px 0" }}>
        {s.paragraphs.map((p, i) => (
          <p
            key={i}
            style={{
              margin: "0 0 18px",
              fontSize: 16,
              color: "#a1a1a1",
              lineHeight: 1.75,
            }}
          >
            {p}
          </p>
        ))}
      </div>

      {/* CTA */}
      <div style={{ padding: "8px 32px 32px" }}>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          style={{
            display: "inline-block",
            background: "#ffffff",
            color: "#000000",
            padding: "13px 28px",
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
            borderRadius: 4,
            letterSpacing: "0.01em",
          }}
        >
          {s.cta}
        </a>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "16px 32px",
          borderTop: "1px solid #2a2a2a",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 12,
            color: "#444",
            lineHeight: 1.6,
          }}
        >
          {s.footerLinks ?? "Manage preferences · Unsubscribe · Help"}
        </p>
      </div>
    </div>
  );
}

// ─── CARD SHELL ──────────────────────────────────────────────────────────────

function SpecimenCard({
  specimen,
  index,
}: {
  specimen: EmailSpecimen;
  index: number;
}) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full text-left px-5 py-4 flex items-start gap-4 hover:bg-white/[0.03] transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-flame-400">
              {specimen.trigger}
            </span>
            <span className="text-[10px] text-ink-500">·</span>
            <span className="text-[11px] text-ink-400">{specimen.label}</span>
          </div>
          <p className="text-[14px] font-semibold text-ink-100 leading-snug">
            {specimen.subject}
          </p>
          <p className="mt-0.5 text-[12px] text-ink-500 leading-snug truncate">
            {specimen.preheader}
          </p>
        </div>
        <span className="text-ink-600 text-lg mt-0.5">{expanded ? "−" : "+"}</span>
      </button>

      {/* Email preview */}
      {expanded && (
        <div className="border-t border-white/10 p-4 bg-black/20">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-[10px] text-ink-600">From:</span>
            <span className="text-[11px] text-ink-400 font-mono">{specimen.from}</span>
          </div>
          <EmailPreview s={specimen} />
        </div>
      )}
    </div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function SpecimensPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col px-4 py-10">
      <div className="max-w-2xl mx-auto w-full">
        {/* Header */}
        <div className="text-[10px] uppercase tracking-[0.22em] text-flame-400 font-semibold">
          NBA Top Shot · Email Specimens
        </div>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink-50 text-balance">
          5 hand-crafted emails.
        </h1>
        <p className="mt-2 text-[13.5px] text-ink-400 leading-relaxed max-w-lg">
          No Liquid variables. No callout grids. No variants. Real player names, real serial numbers,
          real market data. Bread-and-butter e-commerce structure: logo → headline → body → CTA → footer.
          Does the first one look like a real email?
        </p>

        {/* Specimens */}
        <div className="mt-8 flex flex-col gap-4">
          {SPECIMENS.map((s, i) => (
            <SpecimenCard key={s.id} specimen={s} index={i} />
          ))}
        </div>

        {/* Back link */}
        <div className="mt-10 pb-6">
          <a
            href="/review"
            className="text-[12px] text-ink-600 hover:text-ink-400 transition-colors"
          >
            ← Back to review
          </a>
        </div>
      </div>
    </div>
  );
}
