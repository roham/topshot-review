import type { UpgradeCard as TUpgradeCard, UpgradeState, AfterVariantId, AfterBlock } from "@/lib/cards";
import { resolveLiquidBody, resolveLiquidString, type LiquidContext } from "@/lib/liquid";
import { MOCK_CONTEXTS, AUTORESEARCH_DEFAULTS } from "@/lib/mockData";
import { renderEmail, CARD_TEMPLATE_MAP, resolveTemplateId, type TemplateId } from "./templates";

// ────────────────────────────────────────────────────────────
// CONSTANTS
// ────────────────────────────────────────────────────────────

const STATE_LABEL: Record<UpgradeState, string> = {
  stopped: "STOPPED",
  "broken-in-prod": "BROKEN IN PROD",
  missing: "MISSING",
  "running-flat": "RUNNING · FLAT",
};

const STATE_TONE: Record<UpgradeState, string> = {
  stopped: "border-rose-500/50 bg-rose-500/15 text-rose-300",
  "broken-in-prod": "border-rose-600 bg-rose-600/25 text-rose-200 animate-pulse",
  missing: "border-amber-500/50 bg-amber-500/15 text-amber-300",
  "running-flat": "border-amber-500/40 bg-amber-500/10 text-amber-200",
};

const VARIANT_LABEL: Record<AfterVariantId, string> = {
  c1: "C1 — Primary",
  c2: "C2 — Alt A",
  c3: "C3 — Alt B",
};

const VARIANT_DESC: Record<AfterVariantId, string> = {
  c1: "Phase H candidate · primary direction",
  c2: "Phase H candidate · Alt A direction",
  c3: "Phase H candidate · Alt B direction",
};

const VARIANT_DOT: Record<AfterVariantId, string> = {
  c1: "bg-mint-500",
  c2: "bg-flame-500",
  c3: "bg-rose-500",
};

const TOPSHOT_LOGO =
  "https://userimg-assets.customeriomail.com/images/client-env-161112/1717540209144_NBATopShot_LOGO_Horizontal_WhiteText_01HZJNZGHEK03E5E2ZH1DBRQ8E.png";

// ────────────────────────────────────────────────────────────
// UTILITIES
// ────────────────────────────────────────────────────────────

function MdLine({ text }: { text: string }) {
  const parts: (string | { bold: string })[] = [];
  let i = 0;
  const re = /\*\*(.+?)\*\*/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > i) parts.push(text.slice(i, m.index));
    parts.push({ bold: m[1] });
    i = m.index + m[0].length;
  }
  if (i < text.length) parts.push(text.slice(i));
  return (
    <>
      {parts.map((p, k) =>
        typeof p === "string" ? (
          <span key={k}>{p}</span>
        ) : (
          <strong key={k} className="font-semibold text-ink-50">
            {p.bold}
          </strong>
        )
      )}
    </>
  );
}

function resolveHeroSrc(rawSrc: string | undefined, ctx: LiquidContext): string {
  if (!rawSrc) return "/cards/infographics/moment-hero-placeholder.png";
  const resolved = resolveLiquidString(rawSrc, ctx);
  if (resolved.includes("{{") || resolved.includes("{%")) {
    return "/cards/infographics/moment-hero-placeholder.png";
  }
  return resolved;
}

function imgFallback(e: React.SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.onerror = null;
  e.currentTarget.src = "/cards/infographics/moment-hero-placeholder.png";
}

function getPersonaCtx(ctx: LiquidContext) {
  const p = ctx.customer as Record<string, unknown> | undefined;
  if (!p) return null;
  return {
    name: (p.userName as string) ?? "Collector",
    moments: p.lifetime_moments_owned as string | number | undefined,
    joined: p.first_session_at ? new Date(p.first_session_at as string).getFullYear() : null,
    lastSeen: p.last_session_days_ago as string | number | undefined,
    tier: p.lifetime_stage as string | undefined,
  };
}

// ────────────────────────────────────────────────────────────
// EMAIL RENDERER: V1001 — Platform-Chronicler
// Structured format: logo header + callout grid + body paragraphs
// ────────────────────────────────────────────────────────────

function EmailV1001({ after, ctx }: { after: AfterBlock; ctx: LiquidContext }) {
  const subject = resolveLiquidString(after.subject, ctx);
  const preheader = resolveLiquidString(after.preheader, ctx);
  const cta = resolveLiquidString(after.cta, ctx);
  const heroSrc = resolveHeroSrc(after.emailHero?.src, ctx);
  const heroAlt = resolveLiquidString(after.emailHero?.alt, ctx);
  const callouts = (after.callouts ?? []).map((c) => ({
    label: resolveLiquidString(c.label, ctx),
    value: resolveLiquidString(c.value, ctx),
  }));
  const body = resolveLiquidBody(after.body, ctx);
  const persona = getPersonaCtx(ctx);

  return (
    <div className="rounded-xl overflow-hidden border border-mint-500/20 bg-mint-500/[0.04]">
      <div className="px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-bold border-b border-mint-500/20 bg-mint-500/10 text-mint-300">
        Rendered preview — mock collector data
      </div>
      {/* Persona strip */}
      {persona && (
        <div className="mx-3 mt-3 flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.025] px-3 py-2">
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-flame-500 to-flame-700 grid place-items-center text-white text-[11px] font-bold flex-shrink-0">
            {persona.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-semibold text-ink-100">
              {persona.name} · mock collector{persona.tier ? ` · ${persona.tier}` : ""}
            </div>
            <div className="text-[10px] text-ink-400 font-mono">
              {persona.moments != null && `${persona.moments} Moments`}
              {persona.joined != null && ` · since ${persona.joined}`}
              {persona.lastSeen != null && ` · last seen ${persona.lastSeen}d ago`}
            </div>
          </div>
          <div className="text-[9px] uppercase tracking-wider text-ink-600 font-semibold flex-shrink-0">mock</div>
        </div>
      )}
      {/* Email header */}
      <div className="px-3 py-2 mt-2 border-y border-white/[0.06] bg-white/[0.015]">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-flame-400 to-flame-600 grid place-items-center text-white text-[10px] font-bold flex-shrink-0">
            {after.from.startsWith("Magic") ? "M" : "TS"}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[11.5px] text-ink-100 font-semibold truncate">{after.from}</div>
            <div className="text-[10px] text-ink-500 font-mono">to {persona?.name ?? "you"}</div>
          </div>
        </div>
      </div>
      {/* Subject + preheader */}
      <div className="px-3 pt-3">
        <div className="text-[15px] font-semibold leading-snug text-balance text-ink-50">{subject}</div>
        <div className="mt-1 text-[12px] italic leading-snug text-ink-400">{preheader}</div>
      </div>
      {/* Brand header */}
      <div className="mx-3 mt-3 rounded-t-lg bg-black px-4 py-3 flex items-center justify-center border border-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={TOPSHOT_LOGO} alt="NBA Top Shot" className="h-7 w-auto" />
      </div>
      {/* Hero */}
      {after.emailHero && (
        <div className="mx-3 overflow-hidden border-x border-white/10 bg-ink-950">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroSrc} alt={heroAlt} className="w-full block" onError={imgFallback} />
          {after.emailHero.liquidCaption && (
            <div className="px-3 py-1.5 bg-flame-500/10 border-t border-flame-500/20 text-[10px] font-mono text-flame-300 text-center">
              {resolveLiquidString(after.emailHero.liquidCaption, ctx)}
            </div>
          )}
        </div>
      )}
      {/* Callout grid */}
      {callouts.length > 0 && (
        <div className="mx-3 mt-3 rounded-lg border border-flame-500/20 bg-flame-500/[0.04] divide-y divide-flame-500/15 overflow-hidden">
          {callouts.map((c, i) => (
            <div key={i} className="grid grid-cols-[minmax(96px,30%)_1fr] text-[12px]">
              <div className="px-3 py-2 bg-flame-500/[0.03] text-flame-300 font-semibold uppercase tracking-wider text-[10px]">
                {c.label}
              </div>
              <div className="px-3 py-2 text-ink-100 break-words text-[11.5px] font-mono">{c.value}</div>
            </div>
          ))}
        </div>
      )}
      {/* Body */}
      <div className="px-3 pt-3 pb-3 space-y-2.5 text-[13.5px] leading-[1.55]">
        {body.map((p, i) => {
          if (/^\{/.test(p.trim())) return null;
          return (
            <p key={i} className="text-pretty text-ink-100">
              <MdLine text={p} />
            </p>
          );
        })}
      </div>
      {/* CTA */}
      <div className="mx-3 mt-1">
        <div className="rounded-lg bg-[#E9461B] text-white text-[14px] font-bold shadow-lg shadow-flame-500/25 px-4 py-3 text-center tracking-wide">
          {cta} →
        </div>
      </div>
      {/* Footer */}
      <div className="mx-3 mb-3 mt-4 rounded-b-lg border border-white/10 bg-black/60 px-4 py-3 flex flex-col items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={TOPSHOT_LOGO} alt="NBA Top Shot" className="h-5 w-auto opacity-60" />
        <div className="text-[9.5px] text-ink-500 text-center leading-snug">
          Dapper Labs Inc · 222 N Pacific Coast Hwy, El Segundo, CA 90245
          <br />
          <span className="text-ink-600">Privacy Policy · Terms of Service · Unsubscribe</span>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// EMAIL RENDERER: ALMANAC — Editorial Newsletter
// No callout grid. Hero as editorial photo + caption.
// Body as prose paragraphs with editorial subheadings.
// Pull-stat sidebar (3 key metrics). Muted CTA.
// ────────────────────────────────────────────────────────────

function EmailAlmanac({ after, ctx }: { after: AfterBlock; ctx: LiquidContext }) {
  const subject = resolveLiquidString(after.subject, ctx);
  const preheader = resolveLiquidString(after.preheader, ctx);
  const cta = resolveLiquidString(after.cta, ctx);
  const heroSrc = resolveHeroSrc(after.emailHero?.src, ctx);
  const heroAlt = resolveLiquidString(after.emailHero?.alt, ctx);
  const callouts = (after.callouts ?? []).map((c) => ({
    label: resolveLiquidString(c.label, ctx),
    value: resolveLiquidString(c.value, ctx),
  }));
  const body = resolveLiquidBody(after.body, ctx);
  const bodyParagraphs = body.filter((p) => p.trim() && !/^\{/.test(p.trim()));
  const sidebarStats = callouts.slice(0, 3);
  const footerStats = callouts.slice(3);
  const persona = getPersonaCtx(ctx);

  return (
    <div className="rounded-xl overflow-hidden border border-ink-700/60 bg-[#111219]">
      <div className="px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-bold border-b border-mint-500/20 bg-mint-500/10 text-mint-300">
        Rendered preview — mock collector data
      </div>
      {/* Newsletter masthead */}
      <div className="px-5 pt-4 pb-3 border-b border-white/[0.07]">
        <div className="flex items-center justify-between">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={TOPSHOT_LOGO} alt="NBA Top Shot" className="h-4 w-auto opacity-35" />
          <span className="text-[10px] font-bold tracking-[0.22em] text-ink-500 uppercase">Almanac</span>
        </div>
        {persona && (
          <div className="flex items-center gap-2 mt-2.5">
            <div className="text-[9px] uppercase tracking-[0.14em] text-ink-600 font-semibold">To:</div>
            <div className="text-[10px] text-ink-400">
              {persona.name}
              {persona.tier ? ` · ${persona.tier}` : ""}
              {persona.moments != null ? ` · ${persona.moments} Moments` : ""}
              {persona.lastSeen != null ? ` · ${persona.lastSeen}d inactive` : ""}
            </div>
            <div className="text-[8.5px] bg-flame-500/15 text-flame-400 border border-flame-500/25 rounded px-1.5 py-0.5 uppercase tracking-wider font-semibold">
              mock
            </div>
          </div>
        )}
        <div className="text-[9.5px] text-ink-600 font-mono mt-1">From: {after.from}</div>
      </div>
      {/* Editorial headline */}
      <div className="px-5 pt-5">
        <h2 className="text-[21px] font-bold text-ink-50 leading-tight text-balance">{subject}</h2>
        <p className="mt-2 text-[13px] text-ink-400 italic leading-relaxed">{preheader}</p>
        <div className="mt-4 border-t border-white/[0.06]" />
      </div>
      {/* Hero — editorial photo */}
      {after.emailHero && (
        <div className="px-5 pt-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroSrc} alt={heroAlt} className="w-full rounded-lg block" onError={imgFallback} />
          {after.emailHero.liquidCaption && (
            <div className="text-[10px] text-ink-500 italic mt-1.5 leading-snug">
              {resolveLiquidString(after.emailHero.liquidCaption, ctx)}
            </div>
          )}
        </div>
      )}
      {/* Pull stats — editorial sidebar row */}
      {sidebarStats.length > 0 && (
        <div className="px-5 mt-4">
          <div className="flex gap-4 py-3 border-y border-white/[0.07]">
            {sidebarStats.map((c, i) => (
              <div key={i} className="flex-1 min-w-0">
                <div className="text-[9px] uppercase tracking-[0.14em] text-ink-500 font-semibold leading-tight">
                  {c.label}
                </div>
                <div className="text-[11.5px] text-ink-100 font-semibold leading-snug mt-0.5 break-words">
                  {c.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Editorial body */}
      <div className="px-5 pt-4 pb-2 space-y-4">
        {bodyParagraphs.map((p, i) => (
          <p
            key={i}
            className={`leading-[1.7] text-pretty ${
              i === 0 ? "text-[14.5px] text-ink-100" : "text-[13.5px] text-ink-200"
            }`}
          >
            <MdLine text={p} />
          </p>
        ))}
        {/* Extra callouts as footnote table */}
        {footerStats.length > 0 && (
          <div className="pt-3 border-t border-white/[0.06]">
            <div className="text-[9.5px] uppercase tracking-wider text-ink-500 font-semibold mb-2">
              Data footnotes
            </div>
            {footerStats.map((c, i) => (
              <div
                key={i}
                className="flex gap-3 py-1 border-b border-white/[0.04] last:border-b-0"
              >
                <span className="text-[10.5px] text-ink-500 w-32 flex-shrink-0">{c.label}</span>
                <span className="text-[10.5px] text-ink-300 leading-snug">{c.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Editorial CTA — restrained, no flame button */}
      <div className="mx-5 mb-4 mt-3">
        <div className="border border-ink-600 rounded-xl px-4 py-3 text-[13px] font-semibold text-ink-100 text-center">
          {cta} →
        </div>
      </div>
      {/* Newsletter footer */}
      <div className="px-5 py-3 border-t border-white/[0.06]">
        <div className="flex items-center justify-between text-[9.5px] text-ink-500">
          <span>NBA Top Shot Almanac</span>
          <span className="text-ink-600">Unsubscribe</span>
        </div>
        <div className="text-[9px] text-ink-600 mt-0.5">Dapper Labs Inc · El Segundo, CA</div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// EMAIL RENDERER: CINEMATIC — Full-Bleed Poster
// Hero takes the top 60%. Text overlaid with gradient.
// Callouts as horizontal chips. Short bold body. Giant CTA.
// ────────────────────────────────────────────────────────────

function EmailCinematic({ after, ctx }: { after: AfterBlock; ctx: LiquidContext }) {
  const subject = resolveLiquidString(after.subject, ctx);
  const preheader = resolveLiquidString(after.preheader, ctx);
  const cta = resolveLiquidString(after.cta, ctx);
  const heroSrc = resolveHeroSrc(after.emailHero?.src, ctx);
  const heroAlt = resolveLiquidString(after.emailHero?.alt, ctx);
  const callouts = (after.callouts ?? []).map((c) => ({
    label: resolveLiquidString(c.label, ctx),
    value: resolveLiquidString(c.value, ctx),
  }));
  const body = resolveLiquidBody(after.body, ctx);
  const bodyLines = body.filter((p) => p.trim() && !/^\{/.test(p.trim()));
  const persona = getPersonaCtx(ctx);

  return (
    <div className="rounded-xl overflow-hidden border border-white/[0.05] bg-black">
      <div className="px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-bold border-b border-mint-500/20 bg-mint-500/10 text-mint-300">
        Rendered preview — mock collector data
      </div>
      {/* Full-bleed hero with overlay */}
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroSrc}
          alt={heroAlt}
          className="w-full block"
          style={{ maxHeight: "280px", objectFit: "cover", objectPosition: "center 20%" }}
          onError={imgFallback}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/25 to-black" />
        {/* Logo top-left */}
        <div className="absolute top-3 left-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={TOPSHOT_LOGO} alt="NBA Top Shot" className="h-5 w-auto opacity-75" />
        </div>
        {/* Persona top-right */}
        {persona && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-black/55 backdrop-blur border border-white/15 px-2 py-1">
            <div className="h-4 w-4 rounded-full bg-gradient-to-br from-flame-500 to-flame-700 grid place-items-center text-white text-[8px] font-bold flex-shrink-0">
              {persona.name[0]}
            </div>
            <span className="text-[9px] text-white/55">
              {persona.name}
              {persona.tier ? ` · ${persona.tier}` : ""}
            </span>
            <span className="text-[8px] text-white/25">[mock]</span>
          </div>
        )}
        {/* Headline overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-5">
          <h2 className="text-[22px] font-black text-white leading-tight tracking-tight text-balance drop-shadow-lg">
            {subject}
          </h2>
          <p className="mt-1 text-[12px] text-white/50 leading-snug">{preheader}</p>
        </div>
      </div>
      {/* Callout chips — horizontal scroll */}
      {callouts.length > 0 && (
        <div className="flex gap-2 px-3 pt-3 pb-2 overflow-x-auto">
          {callouts.slice(0, 4).map((c, i) => (
            <div
              key={i}
              className="flex-shrink-0 rounded-xl bg-white/[0.055] border border-white/[0.08] px-3 py-2"
            >
              <div className="text-[9px] uppercase tracking-wider text-white/35 font-semibold mb-0.5">
                {c.label}
              </div>
              <div className="text-[11.5px] text-white font-bold whitespace-nowrap">{c.value}</div>
            </div>
          ))}
        </div>
      )}
      {/* Body — sparse, large */}
      <div className="px-4 pb-4 space-y-2.5 pt-1">
        {bodyLines.slice(0, 4).map((p, i) => (
          <p
            key={i}
            className={`leading-snug text-pretty ${
              i === 0 ? "text-[15.5px] font-medium text-white/90" : "text-[13.5px] text-white/55"
            }`}
          >
            <MdLine text={p} />
          </p>
        ))}
      </div>
      {/* Full-width CTA */}
      <div className="px-3 pb-4">
        <div className="bg-[#E9461B] text-white font-black text-[15px] py-4 rounded-2xl text-center tracking-[0.05em] shadow-xl shadow-flame-600/40 uppercase">
          {cta}
        </div>
      </div>
      {/* Minimal footer */}
      <div className="px-4 py-2.5 border-t border-white/[0.04] flex items-center justify-between">
        <span className="text-[9.5px] text-white/12">Dapper Labs Inc · El Segundo, CA</span>
        <span className="text-[9.5px] text-white/12">Unsubscribe</span>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// EMAIL RENDERER: BRIEF — Bloomberg Terminal
// Monospace throughout. Dense data rows. No decorative images.
// Amber terminal palette. Terse body. CLI-style CTA.
// ────────────────────────────────────────────────────────────

function EmailBrief({ after, ctx }: { after: AfterBlock; ctx: LiquidContext }) {
  const subject = resolveLiquidString(after.subject, ctx);
  const preheader = resolveLiquidString(after.preheader, ctx);
  const cta = resolveLiquidString(after.cta, ctx);
  const heroSrc = resolveHeroSrc(after.emailHero?.src, ctx);
  const heroAlt = resolveLiquidString(after.emailHero?.alt, ctx);
  const callouts = (after.callouts ?? []).map((c) => ({
    label: resolveLiquidString(c.label, ctx),
    value: resolveLiquidString(c.value, ctx),
  }));
  const body = resolveLiquidBody(after.body, ctx);
  const bodyLines = body.filter((p) => p.trim() && !/^\{/.test(p.trim()));
  const persona = getPersonaCtx(ctx);

  return (
    <div className="rounded-xl overflow-hidden border border-amber-500/20 bg-[#0a0a06] font-mono">
      {/* Terminal header */}
      <div className="px-3 py-2 border-b border-amber-500/15 bg-amber-500/[0.04] flex items-center justify-between">
        <span className="text-[10px] text-amber-400 font-bold tracking-[0.18em] uppercase">
          NBA Top Shot · Brief
        </span>
        <span className="text-[10px] text-amber-500/40">2026-05-04</span>
      </div>
      {/* Sender + recipient */}
      <div className="px-3 pt-1.5 pb-1.5 border-b border-amber-500/10 flex items-center justify-between gap-2">
        <span className="text-[9px] text-amber-600/55 truncate flex-1">{after.from}</span>
        {persona && (
          <span className="text-[9px] text-amber-500/35 flex-shrink-0">
            → {persona.name}
            {persona.tier ? ` [${persona.tier}]` : ""} [mock]
          </span>
        )}
      </div>
      {/* Subject as data header */}
      <div className="px-3 pt-2.5 pb-2">
        <div className="text-[12.5px] text-amber-100 font-bold leading-snug">{subject}</div>
        <div className="text-[10px] text-amber-500/55 mt-0.5 leading-snug">{preheader}</div>
      </div>
      <div className="px-3">
        <div className="border-t border-amber-500/12" />
      </div>
      {/* Chart / sparkline — compact, data-focused */}
      {after.emailHero && (
        <div className="px-3 pt-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroSrc}
            alt={heroAlt}
            className="w-full block rounded max-h-24 object-contain bg-amber-500/[0.015]"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/cards/infographics/sparkline-holdings.png";
            }}
          />
        </div>
      )}
      {/* Dense data rows */}
      {callouts.length > 0 && (
        <div className="px-3 pt-2 pb-1">
          {callouts.map((c, i) => (
            <div key={i} className="flex py-[3px] gap-1.5">
              <span className="text-[10px] text-amber-600/60 w-[108px] flex-shrink-0 truncate">
                {c.label}
              </span>
              <span className="text-[10px] text-amber-500/25 flex-shrink-0">·</span>
              <span className="text-[10px] text-amber-200/75 leading-snug break-all flex-1">
                {c.value}
              </span>
            </div>
          ))}
        </div>
      )}
      <div className="px-3 pt-1">
        <div className="border-t border-amber-500/12" />
      </div>
      {/* Terse body */}
      <div className="px-3 pt-2 pb-3 space-y-1.5">
        {bodyLines.map((p, i) => (
          <p key={i} className="text-[11px] text-amber-200/65 leading-[1.55]">
            <MdLine text={p} />
          </p>
        ))}
      </div>
      {/* Terminal CTA */}
      <div className="px-3 pb-3">
        <div className="border border-amber-500/25 bg-amber-500/[0.04] rounded-lg px-3 py-2.5 flex items-center gap-2">
          <span className="text-amber-500/50 text-[12px] font-bold">&gt;</span>
          <span className="text-[11px] text-amber-300/80 font-semibold">{cta}</span>
        </div>
      </div>
      {/* Terminal footer */}
      <div className="px-3 py-2 border-t border-amber-500/[0.08]">
        <div className="text-[8.5px] text-amber-600/30 text-center uppercase tracking-[0.15em]">
          NBA Top Shot · Dapper Labs Inc · Unsubscribe
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// LIQUID VIEW — raw Liquid template (same across all variants)
// ────────────────────────────────────────────────────────────

function LiquidView({ after }: { after: AfterBlock }) {
  return (
    <div className="rounded-xl overflow-hidden border border-amber-500/20 bg-amber-500/[0.02]">
      <div className="px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-bold border-b border-amber-500/20 bg-amber-500/10 text-amber-300">
        Customer.io · Liquid template — programmable form
      </div>
      {/* From/to */}
      <div className="px-3 py-2 border-b border-white/10 bg-white/[0.015]">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-flame-400 to-flame-600 grid place-items-center text-white text-[10px] font-bold flex-shrink-0">
            {after.from.startsWith("Magic") ? "M" : "TS"}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[11.5px] text-ink-100 font-semibold truncate">{after.from}</div>
            <div className="text-[10px] text-ink-500 font-mono">{"to {{customer.userName}}"}</div>
          </div>
        </div>
      </div>
      {/* Subject + preheader */}
      <div className="px-3 pt-3">
        <div className="font-mono text-amber-100 text-[12.5px] leading-snug text-balance">{after.subject}</div>
        <div className="font-mono text-amber-300/75 text-[11px] mt-1">{after.preheader}</div>
      </div>
      {/* Brand header */}
      <div className="mx-3 mt-3 rounded-t-lg bg-black px-4 py-3 flex items-center justify-center border border-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={TOPSHOT_LOGO} alt="NBA Top Shot" className="h-7 w-auto" />
      </div>
      {/* Hero src */}
      {after.emailHero && (
        <div className="mx-3 overflow-hidden border-x border-white/10 bg-ink-950">
          <div className="px-3 py-3 font-mono text-[11px] text-amber-300 break-words">
            <span className="opacity-50">img src=</span>
            {after.emailHero.src}
          </div>
          {after.emailHero.liquidCaption && (
            <div className="px-3 py-1.5 bg-flame-500/10 border-t border-flame-500/20 text-[10px] font-mono text-flame-300 text-center">
              {after.emailHero.liquidCaption}
            </div>
          )}
        </div>
      )}
      {/* Callouts */}
      {(after.callouts ?? []).length > 0 && (
        <div className="mx-3 mt-3 rounded-lg border border-flame-500/20 bg-flame-500/[0.04] divide-y divide-flame-500/15 overflow-hidden">
          {(after.callouts ?? []).map((c, i) => (
            <div key={i} className="grid grid-cols-[minmax(96px,30%)_1fr] text-[12px]">
              <div className="px-3 py-2 bg-flame-500/[0.03] text-flame-300 font-semibold uppercase tracking-wider text-[10px]">
                {c.label}
              </div>
              <div className="px-3 py-2 text-amber-200 break-words font-mono text-[11px]">{c.value}</div>
            </div>
          ))}
        </div>
      )}
      {/* Body */}
      <div className="px-3 pt-3 pb-3 space-y-2.5">
        {after.body.map((p, i) => (
          <p key={i} className="font-mono text-[11.5px] text-amber-200 whitespace-pre-wrap break-words">
            {p}
          </p>
        ))}
      </div>
      {/* CTA */}
      <div className="mx-3 mt-1">
        <div className="border border-amber-500/30 bg-amber-500/10 text-amber-200 font-mono text-[12px] rounded-lg px-4 py-3 text-center tracking-wide">
          {after.cta}
        </div>
      </div>
      {/* Footer */}
      <div className="mx-3 mb-3 mt-2 px-3 py-2 rounded-lg border border-amber-500/20 bg-amber-500/[0.03] text-[10px] text-amber-300/70 font-mono">
        [footer · same Liquid template across all variants]
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// DISPATCH
// ────────────────────────────────────────────────────────────

// Templates that have been fully realized in templates.tsx — these route
// through renderEmail() for per-template visual silhouettes. The remaining
// four templateIds fall back to the v1003 linter (EmailV1001/Almanac/
// Cinematic/Brief) so variants stay visually differentiated until the
// per-template skeletons are fleshed out.
const FULL_TEMPLATES: ReadonlySet<TemplateId> = new Set<TemplateId>([
  "welcome",
  "pack-received",
  "whale-tier",
]);

function EmailRendered({
  after,
  ctx,
  variant,
  cardId,
}: {
  after: AfterBlock;
  ctx: LiquidContext;
  variant: AfterVariantId;
  cardId: string;
}) {
  const templateId = resolveTemplateId(cardId);
  if (templateId && FULL_TEMPLATES.has(templateId)) {
    return renderEmail({ templateId, variant, after, ctx, mode: "rendered" });
  }
  // c1/c2/c3 map to visual silhouettes: c1=v1001-style, c2=almanac-style, c3=cinematic-style
  switch (variant) {
    case "c2":
      return <EmailAlmanac after={after} ctx={ctx} />;
    case "c3":
      return <EmailCinematic after={after} ctx={ctx} />;
    case "c1":
    default:
      return <EmailV1001 after={after} ctx={ctx} />;
  }
}

// ────────────────────────────────────────────────────────────
// MAIN CARD
// ────────────────────────────────────────────────────────────

export function UpgradeCard({
  card,
  activeVariant,
}: {
  card: TUpgradeCard;
  activeVariant: AfterVariantId;
}) {
  const after = card.after[activeVariant];
  // Autoresearch lab cards (id starts with `auto-<trigger>-`) reuse the mock
  // context for the matching hand-built card so Liquid placeholders resolve.
  const AUTO_TO_HANDBUILT: Record<string, string> = {
    "auto-welcome-": "welcome-onboarding",
    "auto-pack-received-": "pack-received-voice",
    "auto-drop-announcement-": "drop-announcement-programmatic",
    "auto-fast-break-": "fast-break-result-fix",
    "auto-abandoned-cart-": "abandoned-cart",
    "auto-reactivation-": "reactivation-drip",
    "auto-whale-": "whale-tier-concierge",
  };
  let mockKey = card.id;
  let isAuto = false;
  for (const [prefix, handBuiltId] of Object.entries(AUTO_TO_HANDBUILT)) {
    if (card.id.startsWith(prefix)) {
      mockKey = handBuiltId;
      isAuto = true;
      break;
    }
  }
  // Auto-* cards: merge AUTORESEARCH_DEFAULTS UNDER trigger-specific mock so
  // any Liquid var the drafter invented gets a sensible fallback while the
  // hand-curated mock data still wins where it exists.
  const ctx = isAuto
    ? { ...AUTORESEARCH_DEFAULTS, ...(MOCK_CONTEXTS[mockKey] ?? {}) }
    : MOCK_CONTEXTS[mockKey] ?? {};

  if (!after) return null;

  return (
    <article className="w-full max-w-[640px] mx-auto bg-ink-900/95 border border-white/10 rounded-3xl shadow-card overflow-hidden">
      {/* Card hero */}
      <div className="relative w-full aspect-[3/2] bg-ink-950 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={card.hero}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-90"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-flame-500/95 text-white text-[11px] font-semibold tracking-wider uppercase">
            Card {card.position} of 7
          </span>
          <span
            className={`px-2.5 py-1 rounded-full border text-[10.5px] font-semibold tracking-wider uppercase ${STATE_TONE[card.diagnosis.state]}`}
          >
            {STATE_LABEL[card.diagnosis.state]}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ink-950/80 backdrop-blur border border-white/15 text-[10.5px] font-bold uppercase tracking-wider text-ink-100">
            <span className={`h-1.5 w-1.5 rounded-full ${VARIANT_DOT[activeVariant]}`} />
            {VARIANT_LABEL[activeVariant].split("·")[0].trim()}
          </span>
        </div>
        <div className="absolute bottom-5 left-5 right-5">
          <div className="text-[11px] uppercase tracking-[0.18em] text-flame-300 font-semibold">
            Customer.io upgrade · v1005
          </div>
          <h2 className="mt-1.5 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-ink-50 leading-[1.1] text-balance">
            {card.stack_item}
          </h2>
        </div>
      </div>

      {/* Headline */}
      <div className="px-5 pt-5 pb-4 border-b border-white/5">
        <p className="text-[15px] sm:text-base text-ink-100 leading-snug text-pretty">{card.headline}</p>
      </div>

      {/* Pills */}
      <div className="px-5 pt-4 pb-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5 border-b border-white/5">
        <Pill label="Audience" value={card.pills.audience} tone="audience" />
        <Pill label="Trigger" value={card.pills.trigger} tone="trigger" />
        <Pill label="KPI" value={card.pills.kpi} tone="kpi" />
      </div>

      {/* Diagnosis */}
      <Section title="Diagnosis">
        <p className="text-[14px] text-ink-200 leading-[1.55] text-pretty">{card.diagnosis.summary}</p>
        {card.diagnosis.facts.length > 0 && (
          <details className="mt-3">
            <summary className="cursor-pointer text-[11px] uppercase tracking-wider text-flame-400 font-semibold hover:text-flame-300">
              {card.diagnosis.facts.length} grounding facts (tap to expand)
            </summary>
            <div className="mt-3 rounded-xl border border-white/10 overflow-hidden">
              <div className="divide-y divide-white/[0.06]">
                {card.diagnosis.facts.map((f, i) => (
                  <div key={i} className="grid grid-cols-[minmax(120px,38%)_1fr] text-[12.5px]">
                    <div className="px-3 py-2 bg-white/[0.025] text-ink-300 font-medium">{f.label}</div>
                    <div className="px-3 py-2 text-ink-100 font-mono text-[12px] break-words">{f.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </details>
        )}
      </Section>

      {/* Before */}
      {card.before && (
        <Section title="What's shipping today" tone="before">
          <details>
            <summary className="cursor-pointer text-[11px] uppercase tracking-wider text-rose-400 font-semibold hover:text-rose-300">
              {card.before.label} (tap to expand)
            </summary>
            <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.02] p-3 space-y-2">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-ink-500 font-semibold mb-0.5">Subject</div>
                <div className="text-[13px] text-ink-100 font-mono break-words">{card.before.subject}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-ink-500 font-semibold mb-0.5">Body</div>
                <div className="text-[12.5px] text-ink-300 font-mono break-words italic">
                  {card.before.excerpt}
                </div>
              </div>
            </div>
            <p className="mt-3 text-[13px] text-ink-200 leading-relaxed text-pretty">
              <span className="text-rose-300 font-semibold">Critique: </span>
              {card.before.critique}
            </p>
          </details>
        </Section>
      )}

      {/* Active variant — rendered + Liquid stacked */}
      <Section title={`Variant: ${VARIANT_LABEL[activeVariant]}`} tone="after">
        <div className="mb-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${VARIANT_DOT[activeVariant]}`} />
            <div className="text-[12px] text-ink-200 font-medium">{VARIANT_DESC[activeVariant]}</div>
          </div>
          <div className="mt-1 text-[10.5px] text-ink-400">{after.label}</div>
        </div>

        {/* RENDERED — variant-specific template design */}
        <EmailRendered after={after} ctx={ctx} variant={activeVariant} cardId={card.id} />

        {/* LIQUID — consistent amber/monospace template view */}
        <div className="mt-4">
          <LiquidView after={after} />
        </div>

        {after.voice_notes && (
          <p className="mt-4 text-[12.5px] text-ink-300 leading-relaxed italic text-pretty">
            <span className="text-mint-400 not-italic font-semibold">Voice notes: </span>
            {after.voice_notes}
          </p>
        )}
      </Section>

      {/* Reviewer ask */}
      <Section title="What I need from you" tone="ask">
        <p className="text-[14px] text-ink-100 leading-relaxed text-pretty">{card.reviewer_ask}</p>
      </Section>

      {/* Engineering hooks */}
      {card.engineering_hooks && card.engineering_hooks.length > 0 && (
        <Section title="Engineering / ops hooks" tone="muted">
          <ul className="space-y-1.5 text-[12.5px] text-ink-300">
            {card.engineering_hooks.map((h, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-ink-500 shrink-0">•</span>
                <span className="leading-relaxed">
                  <MdLine text={h} />
                </span>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </article>
  );
}

function Pill({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "audience" | "trigger" | "kpi";
}) {
  const colors: Record<typeof tone, string> = {
    audience: "border-flame-500/30 bg-flame-500/[0.05] text-flame-200",
    trigger: "border-mint-500/25 bg-mint-500/[0.04] text-mint-200",
    kpi: "border-amber-500/30 bg-amber-500/[0.05] text-amber-200",
  };
  return (
    <div className={`rounded-xl border ${colors[tone]} px-3 py-2.5`}>
      <div className="text-[9.5px] uppercase tracking-[0.16em] font-semibold opacity-80">{label}</div>
      <div className="mt-1 text-[12.5px] leading-snug text-white text-pretty">{value}</div>
    </div>
  );
}

function Section({
  title,
  children,
  tone,
}: {
  title: string;
  children: React.ReactNode;
  tone?: "before" | "after" | "ask" | "muted";
}) {
  const tones: Record<string, string> = {
    before: "text-rose-300",
    after: "text-mint-300",
    ask: "text-amber-300",
    muted: "text-ink-400",
  };
  return (
    <section className="px-5 py-5 border-b border-white/5 last:border-b-0">
      <h3
        className={`text-[10.5px] uppercase tracking-[0.2em] font-semibold mb-3 ${tones[tone ?? "muted"] ?? "text-ink-400"}`}
      >
        {title}
      </h3>
      {children}
    </section>
  );
}
