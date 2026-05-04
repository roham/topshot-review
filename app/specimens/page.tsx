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
  hero: { src: string; alt: string };
  headline: string;
  paragraphs: string[];
  // Optional product-card block (Klaviyo cart-abandon / pack-received pattern):
  // small image + 2-3 fact rows beneath the hero, before the body.
  productCard?: {
    image: string;
    title: string;
    rows: { label: string; value: string }[];
  };
  cta: string;
  footerLinks?: string;
};

// Real Top Shot CDN imagery (verified 200 OK in mockData.ts) + locally-generated
// brand visuals in /public/cards/. Reuse the same URLs the actual Customer.io
// templates use so reviewers see the same visuals their colleagues will see.
const IMG = {
  packArt:
    "https://userimg-assets.customeriomail.com/images/client-env-161112/1747166167882_03-PACKS-ARE-YOUR-DOORWAY-TO-GREATNESSNEW2_01JV5KFXMNRPTA0J24ESESYX7N.jpg",
  setHero:
    "https://userimg-assets.customeriomail.com/images/client-env-161112/1733254430310_04-MORE-THAN-MOMENTS_01_01JE707FKDZM5GN3VEF7G26DYG.jpg",
  collectorFirstPack:
    "https://userimg-assets.customeriomail.com/images/client-env-161112/1740722955824_01-NEW-COLLECTOR-FIRST-PACK2_01JN5JRSMVBKXQ9YK4ESN8FFAS.jpg",
  packAnimated:
    "https://userimg-assets.customeriomail.com/images/client-env-161112/1734135875841_tier4_01JF18V2BX0TMRW39EA1J2FETP.gif",
  winExperience:
    "https://userimg-assets.customeriomail.com/images/client-env-161112/1733248546287_01A-WIN-THE-ULTIMATE-FAN-EXPERIENCE_06_01JE6TKVN6TCK7F2VWH2RBAFBH.jpg",
  // Locally generated infographics
  sparkline: "/cards/infographics/sparkline-holdings.png",
  setcard: "/cards/infographics/setcard.png",
  momentPlaceholder: "/cards/infographics/moment-hero-placeholder.png",
  // Brand hero PNGs
  welcome: "/cards/welcome.png",
  packPull: "/cards/pack-pull.png",
  dropSeries: "/cards/drop-series.png",
  reactivation: "/cards/reactivation.png",
};

const SPECIMENS: EmailSpecimen[] = [
  {
    id: "abandoned-cart-maxey",
    trigger: "Abandoned Cart",
    label: "Jordan · Tyrese Maxey #247/3,500",
    subject: "Jordan, your Tyrese Maxey #247/3,500 is still here",
    preheader: "Listed at $182 · 4 days since you last looked · 3,500 is the full print run",
    from: "NBA Top Shot <hello@nbatopshot.com>",
    hero: { src: IMG.momentPlaceholder, alt: "Tyrese Maxey · Step-Back Three · Q4 vs Boston" },
    headline: "Your Tyrese Maxey is still available.",
    productCard: {
      image: IMG.momentPlaceholder,
      title: "Tyrese Maxey — Step-Back Three · Q4",
      rows: [
        { label: "Set", value: "Playoff Push · Round 1" },
        { label: "Serial", value: "#247 / 3,500" },
        { label: "Listed", value: "$182" },
      ],
    },
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
    hero: { src: IMG.packArt, alt: "Series 9 Reserve · Cade Cunningham pack art" },
    headline: "Cade Cunningham Series 9 Reserve. Wednesday, 2 PM ET.",
    productCard: {
      image: IMG.dropSeries,
      title: "Series 9 Reserve",
      rows: [
        { label: "Mints open", value: "Wed · 2:00 PM ET" },
        { label: "Pack price", value: "$29 · 6 Moments" },
        { label: "Edition", value: "8,000 packs · 30-min window" },
      ],
    },
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
    hero: { src: IMG.collectorFirstPack, alt: "Welcome to NBA Top Shot — your starter pack is in your collection" },
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
    hero: { src: IMG.packAnimated, alt: "Your Series 9 pack just opened" },
    headline: "Here's your Series 9 pack.",
    productCard: {
      image: IMG.setcard,
      title: "Cooper Flagg — January 21 vs. Lakers",
      rows: [
        { label: "Tier", value: "Rare · #156 / 1,500" },
        { label: "Set", value: "Rookie Debut" },
        { label: "Recent comp", value: "$38" },
      ],
    },
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
    hero: { src: IMG.sparkline, alt: "Your collection value since December — chart" },
    headline: "Your collection since December.",
    productCard: {
      image: IMG.setHero,
      title: "Cade Cunningham — biggest mover in your collection",
      rows: [
        { label: "December value", value: "$74" },
        { label: "Today", value: "$312" },
        { label: "Driver", value: "G7 vs. Magic — 32 pts, 12 ast" },
      ],
    },
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

      {/* Hero image — full-width edge-to-edge, sets the visual anchor */}
      <div style={{ background: "#000" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={s.hero.src}
          alt={s.hero.alt}
          style={{
            width: "100%",
            display: "block",
            maxHeight: 320,
            objectFit: "cover",
          }}
        />
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

      {/* Product card — Klaviyo-pattern image + fact rows for cart / pack / drop emails */}
      {s.productCard && (
        <div style={{ padding: "20px 32px 0" }}>
          <div
            style={{
              display: "flex",
              gap: 16,
              padding: 16,
              border: "1px solid #2a2a2a",
              borderRadius: 6,
              background: "#141414",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.productCard.image}
              alt={s.productCard.title}
              style={{
                width: 96,
                height: 96,
                objectFit: "cover",
                borderRadius: 4,
                flexShrink: 0,
                background: "#0a0a0a",
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  margin: "0 0 8px",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#f5f5f5",
                  lineHeight: 1.35,
                }}
              >
                {s.productCard.title}
              </p>
              {s.productCard.rows.map((r, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 12,
                    color: "#888",
                    marginBottom: 3,
                  }}
                >
                  <span>{r.label}</span>
                  <span style={{ color: "#d4d4d4", fontWeight: 500 }}>{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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
