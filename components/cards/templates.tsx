// templates.tsx — v1004 per-email-type renderer skeleton.
//
// Replaces the single `EmailRender` shell in UpgradeCard.tsx with seven
// distinct per-template renderers. Each template owns its own visual
// silhouette; the variant (almanac/cinematic/brief) and mode
// (rendered/liquid) parameters apply per-frame style overlays + Liquid
// resolution.
//
// Architecture:
//   - CARD_TEMPLATE_MAP routes a card.id to a TemplateId
//   - renderEmail() is the dispatcher; it picks the right per-template
//     component and passes through (variant, after, ctx, mode)
//   - Per-template components compose shared primitives (BrandHeader,
//     BrandFooter, ModeBadge, MockPersonaBadge, SubjectPreheader)
//     plus their own template-specific layout sections
//
// Three templates (Welcome, Pack Received, Whale Tier) are fully realized.
// Four (Reactivation, Fast Break, Drop Announce, Abandoned Cart) ship as
// stub renderers that use the existing v1003 shell — they will be fleshed
// out in subsequent passes per the design spec at
// /opt/magic/collect-hq/strategy/2026-05-04-email-design-system.md
//
// Spec is the source of truth; this file is the implementation surface.

import type { AfterBlock, AfterVariantId } from "@/lib/cards";
import { resolveLiquidBody, resolveLiquidString, type LiquidContext } from "@/lib/liquid";

// ===================================================================
// Types & registry
// ===================================================================

export type TemplateId =
  | "welcome"
  | "pack-received"
  | "reactivation"
  | "fast-break"
  | "drop-announcement"
  | "abandoned-cart"
  | "whale-tier";

export const CARD_TEMPLATE_MAP: Record<string, TemplateId> = {
  "welcome-onboarding": "welcome",
  "pack-received-voice": "pack-received",
  "reactivation-drip": "reactivation",
  "fast-break-result-fix": "fast-break",
  "drop-announcement-programmatic": "drop-announcement",
  "abandoned-cart": "abandoned-cart",
  "whale-tier-concierge": "whale-tier",
};

export type RenderArgs = {
  templateId: TemplateId;
  variant: AfterVariantId;
  after: AfterBlock;
  ctx: LiquidContext;
  mode: "rendered" | "liquid";
};

export function renderEmail(args: RenderArgs): JSX.Element {
  switch (args.templateId) {
    case "welcome":
      return <WelcomeTemplate {...args} />;
    case "pack-received":
      return <PackReceivedTemplate {...args} />;
    case "whale-tier":
      return <WhaleTierTemplate {...args} />;
    case "reactivation":
      return <ReactivationTemplate {...args} />;
    case "fast-break":
      return <FastBreakTemplate {...args} />;
    case "drop-announcement":
      return <DropAnnouncementTemplate {...args} />;
    case "abandoned-cart":
      return <AbandonedCartTemplate {...args} />;
  }
}

// ===================================================================
// Shared primitives — sing-together rules from the design spec
// ===================================================================

const BRAND_LOGO =
  "https://userimg-assets.customeriomail.com/images/client-env-161112/1717540209144_NBATopShot_LOGO_Horizontal_WhiteText_01HZJNZGHEK03E5E2ZH1DBRQ8E.png";

const HERO_PLACEHOLDER = "/cards/infographics/moment-hero-placeholder.png";

type ResolveMode = "rendered" | "liquid";

/** Render markdown-ish bold (**text**) as <strong>; preserve linebreaks elsewhere. */
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

function resolveOrRaw(
  s: string | undefined,
  ctx: LiquidContext,
  mode: ResolveMode
): string {
  if (!s) return "";
  return mode === "liquid" ? s : resolveLiquidString(s, ctx);
}

function ModeBadge({ mode, accent }: { mode: ResolveMode; accent: string }) {
  const isLiquid = mode === "liquid";
  return (
    <div
      className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-bold border-b ${
        isLiquid
          ? "border-amber-500/20 bg-amber-500/10 text-amber-300"
          : `border-${accent}-500/20 bg-${accent}-500/10 text-${accent}-300`
      }`}
    >
      {isLiquid
        ? "Customer.io · Liquid template — programmable form"
        : "Rendered preview — mock collector data"}
    </div>
  );
}

function MockPersonaBadge({ ctx, mode }: { ctx: LiquidContext; mode: ResolveMode }) {
  if (mode === "liquid") return null;
  const p = ctx.customer as Record<string, unknown> | undefined;
  if (!p) return null;
  const name = (p.userName as string) ?? "Collector";
  const moments = p.lifetime_moments_owned as string | number | undefined;
  const joined = p.first_session_at
    ? new Date(p.first_session_at as string).getFullYear()
    : null;
  const lastSeen = p.last_session_days_ago as string | number | undefined;
  const tier = p.lifetime_stage as string | undefined;
  return (
    <div className="mx-3 mt-3 flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.025] px-3 py-2">
      <div className="h-7 w-7 rounded-full bg-gradient-to-br from-flame-500 to-flame-700 grid place-items-center text-white text-[11px] font-bold flex-shrink-0">
        {name[0]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] font-semibold text-ink-100">
          {name} · mock collector{tier ? ` · ${tier}` : ""}
        </div>
        <div className="text-[10px] text-ink-400 font-mono">
          {moments != null && `${moments} Moments`}
          {joined != null && ` · since ${joined}`}
          {lastSeen != null && ` · last seen ${lastSeen}d ago`}
        </div>
      </div>
      <div className="text-[9px] uppercase tracking-wider text-ink-600 font-semibold flex-shrink-0">
        mock
      </div>
    </div>
  );
}

function EmailHeader({ from, ctx, mode }: { from: string; ctx: LiquidContext; mode: ResolveMode }) {
  const isLiquid = mode === "liquid";
  return (
    <div className="px-3 py-2 border-b border-white/10 bg-white/[0.02]">
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-flame-400 to-flame-600 grid place-items-center text-white text-[10.5px] font-bold flex-shrink-0">
          {from.startsWith("Magic") ? "M" : "TS"}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[12px] text-ink-100 font-semibold truncate">{from}</div>
          <div className="text-[10.5px] text-ink-400 font-mono">
            to{" "}
            {isLiquid
              ? "{{customer.userName}}"
              : ((ctx.customer as Record<string, unknown> | undefined)?.userName as string) ??
                "you"}
          </div>
        </div>
      </div>
    </div>
  );
}

function SubjectPreheader({
  subject,
  preheader,
  mode,
}: {
  subject: string;
  preheader: string;
  mode: ResolveMode;
}) {
  const isLiquid = mode === "liquid";
  return (
    <div className="px-3 pt-3">
      <div
        className={`text-[15px] font-semibold leading-snug text-balance ${
          isLiquid ? "text-amber-100 font-mono text-[12.5px]" : "text-ink-50"
        }`}
      >
        {subject}
      </div>
      <div
        className={`mt-1 text-[12px] italic leading-snug ${
          isLiquid ? "text-amber-300/80 font-mono not-italic" : "text-ink-400"
        }`}
      >
        {preheader}
      </div>
    </div>
  );
}

function BrandHeader() {
  // Shared across all 7 templates — the only fully shared chrome element.
  return (
    <div className="mx-3 mt-3 rounded-t-lg bg-black px-4 py-3 flex items-center justify-center border border-white/10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={BRAND_LOGO} alt="NBA Top Shot" className="h-7 w-auto" />
    </div>
  );
}

function BrandFooter({ mode }: { mode: ResolveMode }) {
  if (mode === "liquid") {
    return (
      <div className="mx-3 mb-3 mt-2 px-3 py-2 rounded-lg border border-amber-500/20 bg-amber-500/[0.03] text-[10px] text-amber-300/70 font-mono">
        [footer · same Liquid template across all variants]
      </div>
    );
  }
  return (
    <div className="mx-3 mb-3 mt-4 rounded-b-lg border border-white/10 bg-black/60 px-4 py-3 flex flex-col items-center gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={BRAND_LOGO} alt="NBA Top Shot" className="h-5 w-auto opacity-60" />
      <div className="text-[9.5px] text-ink-500 text-center leading-snug">
        Dapper Labs Inc · 222 N Pacific Coast Hwy, El Segundo, CA 90245
        <br />
        <span className="text-ink-600">Privacy Policy · Terms of Service · Unsubscribe</span>
      </div>
    </div>
  );
}

function PrimaryCta({
  label,
  mode,
  uppercase,
}: {
  label: string;
  mode: ResolveMode;
  uppercase?: boolean;
}) {
  const isLiquid = mode === "liquid";
  return (
    <div className="mx-3 mt-1">
      <div
        className={`rounded-lg ${
          isLiquid
            ? "border border-amber-500/30 bg-amber-500/10 text-amber-200 font-mono text-[12px]"
            : "bg-[#E9461B] text-white text-[14px] font-bold shadow-lg shadow-flame-500/25"
        } px-4 py-3 text-center tracking-wide ${uppercase && !isLiquid ? "uppercase tracking-[0.16em]" : ""}`}
      >
        {label}
        {!isLiquid && " →"}
      </div>
    </div>
  );
}

function GhostCtaLink({ label, mode }: { label: string; mode: ResolveMode }) {
  const isLiquid = mode === "liquid";
  return (
    <div className="mx-3 mt-2 mb-1 text-center">
      <span
        className={`text-[11.5px] underline decoration-white/20 underline-offset-4 ${
          isLiquid ? "text-amber-300/70 font-mono" : "text-ink-300 hover:text-ink-100"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function HeroImage({
  after,
  ctx,
  mode,
  aspect = "16/10",
}: {
  after: AfterBlock;
  ctx: LiquidContext;
  mode: ResolveMode;
  aspect?: string;
}) {
  if (!after.emailHero) {
    return (
      <div className="mx-3 border-x border-white/10 bg-gradient-to-br from-ink-800 to-ink-900 px-3 py-3 text-[10.5px] uppercase tracking-wider text-ink-500 font-semibold text-center">
        ▢ no hero image specified
      </div>
    );
  }
  const isLiquid = mode === "liquid";
  const heroSrc = isLiquid ? after.emailHero.src : resolveLiquidString(after.emailHero.src, ctx);
  const heroAlt = isLiquid ? after.emailHero.alt : resolveLiquidString(after.emailHero.alt, ctx);
  const heroIsResolved = heroSrc && !heroSrc.includes("{{") && !heroSrc.includes("{%");
  const safeHeroSrc = heroIsResolved ? heroSrc : HERO_PLACEHOLDER;

  return (
    <div className="mx-3 overflow-hidden border-x border-white/10 bg-ink-950">
      {isLiquid ? (
        <div className="px-3 py-3 font-mono text-[11px] text-amber-300 break-words">
          <span className="opacity-60">img src=</span>
          {after.emailHero.src}
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={safeHeroSrc}
          alt={heroAlt}
          className="w-full block"
          style={{ aspectRatio: aspect }}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = HERO_PLACEHOLDER;
          }}
        />
      )}
      {after.emailHero.liquidCaption && (
        <div className="px-3 py-1.5 bg-flame-500/10 border-t border-flame-500/20 text-[10px] font-mono text-flame-300 text-center">
          {isLiquid
            ? after.emailHero.liquidCaption
            : resolveLiquidString(after.emailHero.liquidCaption, ctx)}
        </div>
      )}
    </div>
  );
}

function CalloutGrid({
  callouts,
  ctx,
  mode,
  accent = "flame",
}: {
  callouts: { label: string; value: string }[];
  ctx: LiquidContext;
  mode: ResolveMode;
  accent?: "flame" | "mint" | "amber" | "ink";
}) {
  const isLiquid = mode === "liquid";
  const accentClasses: Record<string, string> = {
    flame: "border-flame-500/20 bg-flame-500/[0.04] divide-flame-500/15 text-flame-300 bg-flame-500/[0.03]",
    mint: "border-mint-500/20 bg-mint-500/[0.04] divide-mint-500/15 text-mint-300 bg-mint-500/[0.03]",
    amber: "border-amber-500/20 bg-amber-500/[0.04] divide-amber-500/15 text-amber-300 bg-amber-500/[0.03]",
    ink: "border-white/15 bg-white/[0.025] divide-white/10 text-ink-300 bg-white/[0.015]",
  };
  // Split classes for outer (border/bg/divide) and label (text/bg)
  const outerCls =
    accent === "mint"
      ? "border-mint-500/20 bg-mint-500/[0.04] divide-mint-500/15"
      : accent === "amber"
        ? "border-amber-500/20 bg-amber-500/[0.04] divide-amber-500/15"
        : accent === "ink"
          ? "border-white/15 bg-white/[0.025] divide-white/10"
          : "border-flame-500/20 bg-flame-500/[0.04] divide-flame-500/15";
  const labelCls =
    accent === "mint"
      ? "bg-mint-500/[0.03] text-mint-300"
      : accent === "amber"
        ? "bg-amber-500/[0.03] text-amber-300"
        : accent === "ink"
          ? "bg-white/[0.015] text-ink-300"
          : "bg-flame-500/[0.03] text-flame-300";
  // Touch the unused map so lint doesn't complain
  void accentClasses;

  if (callouts.length === 0) return null;
  return (
    <div className={`mx-3 mt-3 rounded-lg border ${outerCls} divide-y overflow-hidden`}>
      {callouts.map((c, i) => {
        const label = isLiquid ? c.label : resolveLiquidString(c.label, ctx);
        const value = isLiquid ? c.value : resolveLiquidString(c.value, ctx);
        return (
          <div key={i} className="grid grid-cols-[minmax(96px,30%)_1fr] text-[12px]">
            <div
              className={`px-3 py-2 ${labelCls} font-semibold uppercase tracking-wider text-[10px]`}
            >
              {label}
            </div>
            <div
              className={`px-3 py-2 text-ink-100 break-words ${
                isLiquid ? "font-mono text-[11px] text-amber-200" : "text-[11.5px] font-mono"
              }`}
            >
              {value}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function BodyParagraphs({
  body,
  ctx,
  mode,
}: {
  body: string[];
  ctx: LiquidContext;
  mode: ResolveMode;
}) {
  const isLiquid = mode === "liquid";
  const lines = isLiquid ? body : resolveLiquidBody(body, ctx);
  return (
    <div className="px-3 pt-3 pb-3 space-y-2.5 text-[13.5px] leading-[1.55]">
      {lines.map((p, i) => {
        const isLiquidLine = /^\{%/.test(p.trim()) || /^\{\{/.test(p.trim());
        if (isLiquid) {
          return (
            <p
              key={i}
              className="font-mono text-[11.5px] text-amber-200 whitespace-pre-wrap break-words"
            >
              {p}
            </p>
          );
        }
        if (isLiquidLine) return null;
        return (
          <p key={i} className="text-pretty text-ink-100">
            <MdLine text={p} />
          </p>
        );
      })}
    </div>
  );
}

function TemplateOuter({
  mode,
  templateId,
  variant,
  children,
}: {
  mode: ResolveMode;
  templateId: TemplateId;
  variant: AfterVariantId;
  children: React.ReactNode;
}) {
  const isLiquid = mode === "liquid";
  return (
    <div
      data-template={templateId}
      data-variant={variant}
      className={`rounded-xl overflow-hidden border ${
        isLiquid ? "border-amber-500/20 bg-amber-500/[0.02]" : "border-mint-500/20 bg-mint-500/[0.04]"
      }`}
    >
      {children}
    </div>
  );
}

// ===================================================================
// Template 1 — Welcome / Onboarding (FULL)
//
// Vertical journey silhouette:
//   1. Tall illustrated hero (full-bleed)
//   2. Stepped definition block ("what is this thing")
//   3. Free-pack callout card (mint-accented, single row)
//   4. "Choose your path" — Playoffs card + Drops card (side-by-side)
//   5. Single primary CTA + ghost link
//
// Lead color: flame (warm welcome)
// ===================================================================

function WelcomeTemplate({ variant, after, ctx, mode }: RenderArgs) {
  const subject = resolveOrRaw(after.subject, ctx, mode);
  const preheader = resolveOrRaw(after.preheader, ctx, mode);
  const cta = resolveOrRaw(after.cta, ctx, mode);
  const isLiquid = mode === "liquid";

  // Variant-specific shape adjustments
  const isCinematic = variant === "cinematic";
  const isBrief = variant === "brief";
  const isAlmanac = variant === "almanac";

  return (
    <TemplateOuter mode={mode} templateId="welcome" variant={variant}>
      <ModeBadge mode={mode} accent="mint" />
      <MockPersonaBadge ctx={ctx} mode={mode} />
      <EmailHeader from={after.from} ctx={ctx} mode={mode} />
      <SubjectPreheader subject={subject} preheader={preheader} mode={mode} />
      <BrandHeader />

      {/* Hero — full-bleed in non-Brief variants, small inset in Brief */}
      <HeroImage after={after} ctx={ctx} mode={mode} aspect={isBrief ? "16/9" : "3/2"} />

      {/* Cinematic: just three callout pills + body, no journey blocks */}
      {isCinematic && after.callouts && (
        <div className="mx-3 mt-3 grid grid-cols-3 gap-2">
          {after.callouts.slice(0, 3).map((c, i) => (
            <div
              key={i}
              className="rounded-md border border-flame-500/30 bg-flame-500/[0.05] px-2 py-2 text-center"
            >
              <div className="text-[9px] uppercase tracking-wider text-flame-300 font-semibold">
                {isLiquid ? c.label : resolveLiquidString(c.label, ctx)}
              </div>
              <div
                className={`mt-1 ${
                  isLiquid ? "font-mono text-[10px] text-amber-200" : "text-[11px] font-mono text-ink-100"
                }`}
              >
                {isLiquid ? c.value : resolveLiquidString(c.value, ctx)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Almanac & v1001: stepped definition block */}
      {(isAlmanac || variant === "v1001") && after.callouts && (
        <CalloutGrid callouts={after.callouts} ctx={ctx} mode={mode} accent="flame" />
      )}

      {/* Brief: dashboard data callout */}
      {isBrief && after.callouts && (
        <CalloutGrid callouts={after.callouts} ctx={ctx} mode={mode} accent="amber" />
      )}

      {/* Body — narrative or sparse depending on variant */}
      <BodyParagraphs body={after.body} ctx={ctx} mode={mode} />

      {/* Welcome-specific journey footer: only show in v1001 + Almanac, not in Cinematic/Brief */}
      {(isAlmanac || variant === "v1001") && !isLiquid && (
        <div className="mx-3 mb-3 mt-1 grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-flame-500/25 bg-flame-500/[0.05] px-3 py-2.5">
            <div className="text-[9px] uppercase tracking-wider text-flame-300 font-semibold">
              Tonight in the Playoffs
            </div>
            <div className="mt-1 text-[11.5px] text-ink-100 font-mono break-words">
              Round 2 · live this week
            </div>
          </div>
          <div className="rounded-lg border border-mint-500/25 bg-mint-500/[0.05] px-3 py-2.5">
            <div className="text-[9px] uppercase tracking-wider text-mint-300 font-semibold">
              Where collectors talk
            </div>
            <div className="mt-1 text-[11.5px] text-ink-100 font-mono break-words">
              Discord · The Show · Top Shot Live
            </div>
          </div>
        </div>
      )}

      <PrimaryCta label={cta} mode={mode} uppercase={isCinematic} />
      {/* Ghost-link secondary CTA — only on Almanac/v1001 (the "explainer-curious" path) */}
      {(isAlmanac || variant === "v1001") && (
        <GhostCtaLink label="New here? See how it works" mode={mode} />
      )}

      <BrandFooter mode={mode} />
    </TemplateOuter>
  );
}

// ===================================================================
// Template 2 — Pack Received (FULL)
//
// Hero-first cinematic silhouette:
//   1. Pack art occupies top ~60% (full-bleed)
//   2. Tight 3-row callout (Set / Pack / Marquee)
//   3. Chronicler body paragraph
//   4. Recent comp block (3 sales as bullets)
//   5. Single CTA
//
// Lead color: mint (calm "after")
// ===================================================================

function PackReceivedTemplate({ variant, after, ctx, mode }: RenderArgs) {
  const subject = resolveOrRaw(after.subject, ctx, mode);
  const preheader = resolveOrRaw(after.preheader, ctx, mode);
  const cta = resolveOrRaw(after.cta, ctx, mode);

  const isCinematic = variant === "cinematic";
  const isBrief = variant === "brief";

  return (
    <TemplateOuter mode={mode} templateId="pack-received" variant={variant}>
      <ModeBadge mode={mode} accent="mint" />
      <MockPersonaBadge ctx={ctx} mode={mode} />
      <EmailHeader from={after.from} ctx={ctx} mode={mode} />
      <SubjectPreheader subject={subject} preheader={preheader} mode={mode} />
      <BrandHeader />

      {/* Pack art — the entire visual story. Larger aspect ratio in Cinematic. */}
      <HeroImage
        after={after}
        ctx={ctx}
        mode={mode}
        aspect={isCinematic ? "1/1" : isBrief ? "16/9" : "4/3"}
      />

      {/* Cinematic: pack-art-as-headline, tight 3-pill callouts (no full grid) */}
      {isCinematic && after.callouts && (
        <div className="mx-3 mt-3 grid grid-cols-3 gap-2">
          {after.callouts.slice(0, 3).map((c, i) => (
            <div
              key={i}
              className="rounded-md border border-mint-500/30 bg-mint-500/[0.05] px-2 py-2 text-center"
            >
              <div className="text-[9px] uppercase tracking-wider text-mint-300 font-semibold">
                {mode === "liquid" ? c.label : resolveLiquidString(c.label, ctx)}
              </div>
              <div
                className={`mt-1 ${
                  mode === "liquid"
                    ? "font-mono text-[10px] text-amber-200"
                    : "text-[11px] font-mono text-ink-100"
                }`}
              >
                {mode === "liquid" ? c.value : resolveLiquidString(c.value, ctx)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Non-cinematic: full callout grid (mint-accent) */}
      {!isCinematic && after.callouts && (
        <CalloutGrid
          callouts={after.callouts}
          ctx={ctx}
          mode={mode}
          accent={isBrief ? "amber" : "mint"}
        />
      )}

      {/* Body — chronicler narrative + recent comp bullets are inside the body */}
      <BodyParagraphs body={after.body} ctx={ctx} mode={mode} />

      <PrimaryCta label={cta} mode={mode} uppercase={isCinematic} />

      <BrandFooter mode={mode} />
    </TemplateOuter>
  );
}

// ===================================================================
// Template 7 — Whale-tier Concierge (FULL)
//
// Research-desk dispatch silhouette:
//   1. "Collector Desk · Weekly Read" header strip with portfolio one-liner
//   2. 3-pattern × 4-column patterns table (Pattern · Player · Cohort · Signal)
//   3. Hold-longer row card (mint accent, single Moment highlighted)
//   4. Portfolio sparkline inset
//   5. Primary CTA `Open comp dashboard` + ghost reply link
//
// Lead color: ink (restrained — research desk, not marketing)
// Tables: YES — first-class. The only template with a real table.
// ===================================================================

function WhaleTierTemplate({ variant, after, ctx, mode }: RenderArgs) {
  const subject = resolveOrRaw(after.subject, ctx, mode);
  const preheader = resolveOrRaw(after.preheader, ctx, mode);
  const cta = resolveOrRaw(after.cta, ctx, mode);
  const isLiquid = mode === "liquid";
  const isCinematic = variant === "cinematic";
  const isBrief = variant === "brief";

  // Pattern data is on ctx.whale.pattern_{1,2,3} — extract for the table
  const whale = (ctx.whale as Record<string, unknown> | undefined) ?? {};
  const patterns = [whale.pattern_1, whale.pattern_2, whale.pattern_3]
    .filter(Boolean)
    .map((p) => p as Record<string, string>);
  const hold = whale.hold_recommendation as Record<string, string> | undefined;
  const customer = (ctx.customer as Record<string, unknown> | undefined) ?? {};

  const renderTable = !isCinematic; // Cinematic strips the table

  return (
    <TemplateOuter mode={mode} templateId="whale-tier" variant={variant}>
      <ModeBadge mode={mode} accent="mint" />
      <MockPersonaBadge ctx={ctx} mode={mode} />
      <EmailHeader from={after.from} ctx={ctx} mode={mode} />
      <SubjectPreheader subject={subject} preheader={preheader} mode={mode} />
      <BrandHeader />

      {/* Collector-desk header strip: portfolio one-liner */}
      <div className="mx-3 mt-3 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2.5">
        <div className="text-[9.5px] uppercase tracking-[0.18em] font-semibold text-ink-400">
          Collector Desk · Weekly Read
        </div>
        <div
          className={`mt-1 text-[12px] ${
            isLiquid ? "font-mono text-amber-200" : "font-mono text-ink-100"
          }`}
        >
          {isLiquid ? "{{customer.lifetime_moments_owned}} Moments" : `${customer.lifetime_moments_owned ?? "—"} Moments`}
          {" · "}
          {isLiquid ? "{{customer.lifetime_value}}" : (customer.lifetime_value as string) ?? "—"}
          {" · "}
          {isLiquid ? "{{customer.portfolio_7d_change}}" : ((customer.portfolio_7d_change as string) ?? "+0.0%")} 7d
        </div>
      </div>

      {/* Cinematic: skip the table, just patterns as poster lines */}
      {isCinematic && (
        <div className="mx-3 mt-3 px-4 py-3 rounded-lg border border-white/10 bg-black/40">
          <div className="space-y-2">
            {patterns.map((p, i) => (
              <div
                key={i}
                className="text-[14px] font-semibold text-ink-100 leading-snug text-balance"
              >
                {isLiquid ? `{{whale.pattern_${i + 1}.title}}` : p.title}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Patterns table — 3 rows × 4 columns. The information IS tabular. */}
      {renderTable && patterns.length > 0 && (
        <div className="mx-3 mt-3 rounded-lg border border-white/10 overflow-hidden">
          <div className="grid grid-cols-[1.6fr_1fr_0.7fr_1.1fr] text-[9.5px] uppercase tracking-wider font-semibold bg-black/50 border-b border-white/10">
            <div className="px-3 py-2 text-ink-400">Pattern</div>
            <div className="px-3 py-2 text-ink-400">Concentration</div>
            <div className="px-3 py-2 text-ink-400">Cohort</div>
            <div className="px-3 py-2 text-ink-400">Signal</div>
          </div>
          {patterns.map((p, i) => (
            <div
              key={i}
              className="grid grid-cols-[1.6fr_1fr_0.7fr_1.1fr] text-[11px] border-b border-white/5 last:border-b-0"
            >
              <div className="px-3 py-2.5 text-ink-100 font-semibold leading-snug">
                {isLiquid ? `{{whale.pattern_${i + 1}.title}}` : p.title}
              </div>
              <div
                className={`px-3 py-2.5 ${
                  isLiquid ? "font-mono text-[10px] text-amber-200" : "font-mono text-ink-200"
                }`}
              >
                {isLiquid
                  ? `{{whale.pattern_${i + 1}.player_concentration}}`
                  : p.player_concentration}
              </div>
              <div
                className={`px-3 py-2.5 ${
                  isLiquid ? "font-mono text-[10px] text-amber-200" : "font-mono text-ink-200"
                }`}
              >
                {isLiquid ? `{{whale.pattern_${i + 1}.cohort_size}}` : p.cohort_size}
              </div>
              <div
                className={`px-3 py-2.5 ${
                  isLiquid ? "font-mono text-[10px] text-amber-200" : "font-mono text-mint-300"
                }`}
              >
                {isLiquid ? `{{whale.pattern_${i + 1}.market_signal}}` : p.market_signal}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Hold-longer row card */}
      {hold && !isCinematic && (
        <div className="mx-3 mt-3 rounded-lg border border-mint-500/25 bg-mint-500/[0.04] px-4 py-3">
          <div className="text-[9.5px] uppercase tracking-[0.18em] font-semibold text-mint-300">
            Hold longer · collector desk flag
          </div>
          <div className="mt-1.5 flex items-baseline justify-between gap-3 flex-wrap">
            <div className="text-[16px] font-semibold text-ink-50 leading-tight">
              {isLiquid ? "{{whale.hold_recommendation.player}}" : hold.player}
            </div>
            <div
              className={`${
                isLiquid ? "font-mono text-[10px] text-amber-200" : "font-mono text-[11px] text-ink-300"
              }`}
            >
              {isLiquid ? "#{{whale.hold_recommendation.serial}}" : `#${hold.serial}`}
              {" · "}
              {isLiquid ? "{{whale.hold_recommendation.set}}" : hold.set}
            </div>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2 text-[11px]">
            <div>
              <div className="text-[9px] uppercase tracking-wider text-ink-500">Entry</div>
              <div
                className={
                  isLiquid ? "font-mono text-[10px] text-amber-200" : "font-mono text-ink-200"
                }
              >
                {isLiquid ? "{{whale.hold_recommendation.bought_price}}" : hold.bought_price}
              </div>
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-wider text-ink-500">Floor</div>
              <div
                className={
                  isLiquid ? "font-mono text-[10px] text-amber-200" : "font-mono text-mint-300"
                }
              >
                {isLiquid ? "{{whale.hold_recommendation.floor_today}}" : hold.floor_today}
              </div>
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-wider text-ink-500">Recent comp</div>
              <div
                className={
                  isLiquid ? "font-mono text-[10px] text-amber-200" : "font-mono text-mint-300"
                }
              >
                {isLiquid
                  ? "{{whale.hold_recommendation.recent_comp}}"
                  : (hold.recent_comp as string) ?? "—"}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Brief variant: data-callout grid replaces the body text */}
      {isBrief && after.callouts && (
        <CalloutGrid callouts={after.callouts} ctx={ctx} mode={mode} accent="amber" />
      )}

      {/* Body — terse for whale (research-desk register) */}
      {!isCinematic && <BodyParagraphs body={after.body} ctx={ctx} mode={mode} />}
      {isCinematic && <BodyParagraphs body={after.body} ctx={ctx} mode={mode} />}

      {/* Portfolio sparkline inset */}
      {!isCinematic && !isBrief && (
        <div className="mx-3 mb-2 mt-1 px-4 py-2 rounded-lg border border-white/10 bg-black/40">
          <div className="text-[9px] uppercase tracking-wider text-ink-400 font-semibold mb-1">
            Portfolio · last 7d
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={
              (customer.whale_chart_image_url as string) ??
              "/cards/infographics/whale-chart.png"
            }
            alt="Portfolio sparkline"
            className="w-full h-12 object-cover rounded opacity-90"
          />
        </div>
      )}

      <PrimaryCta label={cta} mode={mode} uppercase={isCinematic} />
      {!isCinematic && <GhostCtaLink label="Reply for full comp pull" mode={mode} />}

      <BrandFooter mode={mode} />
    </TemplateOuter>
  );
}

// ===================================================================
// Template 3 — Reactivation Drip (FULL)
//
// Portfolio-statement layout. Lead color: amber.
// ===================================================================

function ReactivationTemplate({ variant, after, ctx, mode }: RenderArgs) {
  const subject = resolveOrRaw(after.subject, ctx, mode);
  const preheader = resolveOrRaw(after.preheader, ctx, mode);
  const cta = resolveOrRaw(after.cta, ctx, mode);
  const isLiquid = mode === "liquid";
  const isCinematic = variant === "cinematic";
  const isBrief = variant === "brief";

  const customer = (ctx.customer as Record<string, unknown> | undefined) ?? {};
  const holdings = (customer.notable_holdings_moving as Record<string, string>[] | undefined) ?? [];

  const heroAspect = isCinematic ? "4/3" : isBrief ? "16/9" : "16/5";

  return (
    <TemplateOuter mode={mode} templateId="reactivation" variant={variant}>
      <ModeBadge mode={mode} accent="amber" />
      <MockPersonaBadge ctx={ctx} mode={mode} />
      <EmailHeader from={after.from} ctx={ctx} mode={mode} />
      <SubjectPreheader subject={subject} preheader={preheader} mode={mode} />
      <BrandHeader />

      {/* Hero image — thin banner for v1001/almanac, larger for cinematic/brief */}
      <HeroImage after={after} ctx={ctx} mode={mode} aspect={heroAspect} />

      {/* Cinematic: 3 callout pills in amber */}
      {isCinematic && after.callouts && (
        <div className="mx-3 mt-3 grid grid-cols-3 gap-2">
          {after.callouts.slice(0, 3).map((c, i) => (
            <div
              key={i}
              className="rounded-md border border-amber-500/30 bg-amber-500/[0.05] px-2 py-2 text-center"
            >
              <div className="text-[9px] uppercase tracking-wider text-amber-300 font-semibold">
                {isLiquid ? c.label : resolveLiquidString(c.label, ctx)}
              </div>
              <div
                className={`mt-1 ${
                  isLiquid
                    ? "font-mono text-[10px] text-amber-200"
                    : "text-[11px] font-mono text-ink-100"
                }`}
              >
                {isLiquid ? c.value : resolveLiquidString(c.value, ctx)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Portfolio stripe — non-cinematic, non-brief */}
      {!isCinematic && !isBrief && (
        <div className="mx-3 mt-3 rounded-lg border border-amber-500/25 bg-amber-500/[0.04] px-4 py-2.5">
          {isLiquid ? (
            <div className="font-mono text-[11px] text-amber-300">
              {"{{customer.lifetime_moments_owned}} Moments · since {{customer.first_session_at | date: \"%Y\"}} · last seen {{customer.last_session_days_ago}}d ago"}
            </div>
          ) : (
            <div className="font-mono text-[12px] text-amber-200">
              {customer.lifetime_moments_owned != null
                ? String(customer.lifetime_moments_owned)
                : "—"}{" "}
              Moments · since{" "}
              {customer.first_session_at
                ? new Date(customer.first_session_at as string).getFullYear()
                : "—"}{" "}
              · last seen{" "}
              {customer.last_session_days_ago != null
                ? String(customer.last_session_days_ago)
                : "—"}
              d ago
            </div>
          )}
        </div>
      )}

      {/* Brief: CalloutGrid amber instead of moment stack */}
      {isBrief && after.callouts && (
        <CalloutGrid callouts={after.callouts} ctx={ctx} mode={mode} accent="amber" />
      )}

      {/* Non-cinematic, non-brief: Moment stack or liquid loop preview */}
      {!isCinematic && !isBrief && (
        <div className="mx-3 mt-3 rounded-lg border border-amber-500/20 overflow-hidden">
          {isLiquid ? (
            <div className="px-3 py-3 font-mono text-[10.5px] text-amber-300 whitespace-pre-wrap leading-relaxed">
              {`{% for moment in customer.notable_holdings_moving %}\n  {{moment.player}} · {{moment.set}} · #{{moment.serial}}\n  Bought {{moment.bought_at | date: "%b %Y"}} at {{moment.bought_price}} · Floor: {{moment.floor_today}} · {{moment.pct_change}}\n{% endfor %}`}
            </div>
          ) : (
            <div className="divide-y divide-amber-500/10">
              {holdings.slice(0, 3).map((m, i) => {
                const isPositive = (m.pct_change ?? "").startsWith("+");
                return (
                  <div key={i} className="px-3 py-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-[13px] font-semibold text-ink-100">{m.player}</div>
                      <div
                        className={`text-[13px] font-bold font-mono ${
                          isPositive ? "text-mint-400" : "text-red-400"
                        }`}
                      >
                        {m.pct_change}
                      </div>
                    </div>
                    <div className="mt-0.5 flex items-center gap-2">
                      <div className="rounded px-1.5 py-0.5 bg-amber-500/10 border border-amber-500/20 text-[10.5px] font-mono text-amber-400">
                        {m.set} · #{m.serial}
                      </div>
                    </div>
                    <div className="mt-0.5 text-[10px] font-mono text-ink-400">
                      {m.bought_price} → {m.floor_today}
                    </div>
                    {m.recent_comp && (
                      <div className="text-[10px] font-mono text-ink-500">
                        Last comp: {m.recent_comp}
                      </div>
                    )}
                  </div>
                );
              })}
              {holdings.length === 0 && (
                <div className="px-3 py-3 text-[11px] text-ink-500 font-mono italic">
                  No holdings data available
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* v1001/almanac non-brief: amber callout grid */}
      {(variant === "v1001" || variant === "almanac") && after.callouts && (
        <CalloutGrid callouts={after.callouts} ctx={ctx} mode={mode} accent="amber" />
      )}

      <BodyParagraphs body={after.body} ctx={ctx} mode={mode} />
      <PrimaryCta label={cta} mode={mode} uppercase={isCinematic} />
      {!isCinematic && <GhostCtaLink label="See full marketplace tape" mode={mode} />}
      <BrandFooter mode={mode} />
    </TemplateOuter>
  );
}

// ===================================================================
// Template 4 — Fast Break Daily Result (FULL)
//
// ESPN-scoreboard layout. Lead color: saturated mint.
// ===================================================================

function FastBreakTemplate({ variant, after, ctx, mode }: RenderArgs) {
  const subject = resolveOrRaw(after.subject, ctx, mode);
  const preheader = resolveOrRaw(after.preheader, ctx, mode);
  const cta = resolveOrRaw(after.cta, ctx, mode);
  const isLiquid = mode === "liquid";
  const isCinematic = variant === "cinematic";
  const isBrief = variant === "brief";

  const customer = (ctx.customer as Record<string, unknown> | undefined) ?? {};
  const event = (ctx.event as Record<string, unknown> | undefined) ?? {};

  const showScoreboard = !isBrief;
  const showLineupGrid = (variant === "v1001" || variant === "almanac") && !isLiquid;

  const lineupStr = (event.lineupPlayers as string | undefined) ?? "";
  const lineupParts = lineupStr ? lineupStr.split(" · ") : [];

  return (
    <TemplateOuter mode={mode} templateId="fast-break" variant={variant}>
      <ModeBadge mode={mode} accent="mint" />
      <MockPersonaBadge ctx={ctx} mode={mode} />
      <EmailHeader from={after.from} ctx={ctx} mode={mode} />
      <SubjectPreheader subject={subject} preheader={preheader} mode={mode} />
      <BrandHeader />

      {isCinematic && <HeroImage after={after} ctx={ctx} mode={mode} aspect="4/3" />}
      {isBrief && <HeroImage after={after} ctx={ctx} mode={mode} aspect="16/9" />}

      {/* Scoreboard header — v1001/almanac/cinematic */}
      {showScoreboard && (
        <div className="mx-3 mt-3 rounded-lg border border-mint-500/25 bg-mint-500/[0.04] px-4 py-3">
          {isLiquid ? (
            <div className="font-mono text-[11px] text-amber-300 whitespace-pre-wrap leading-relaxed">
              {"LINEUP: {{event.lineupPlayers}}\nSCORE: {{event.totalScore}}\n{{event.winRank}} · {{event.gameCount}} games"}
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-2">
                <div className="text-[9px] uppercase tracking-[0.18em] font-semibold text-mint-300">
                  Lineup
                </div>
                <div className="text-[11px] font-mono text-ink-300 truncate">
                  {lineupStr || "—"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-[48px] font-bold font-mono text-mint-400 leading-none">
                  {(event.totalScore as string | number | undefined) ?? "—"}
                </div>
                <div className="mt-1 text-[12px] font-mono text-ink-400">
                  {(event.winRank as string | undefined) ?? "—"} ·{" "}
                  {(event.gameCount as string | number | undefined) ?? "—"} games
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* 5-cell lineup grid — v1001/almanac rendered only */}
      {showLineupGrid && lineupParts.length > 0 && (
        <div
          className="mx-3 mt-2 grid gap-1.5"
          style={{ gridTemplateColumns: `repeat(${Math.min(lineupParts.length, 5)}, 1fr)` }}
        >
          {lineupParts.slice(0, 5).map((player, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1 rounded-md border border-mint-500/20 bg-mint-500/[0.03] px-1 py-2"
            >
              <div className="h-7 w-7 rounded-full bg-mint-500/20 border border-mint-500/30 grid place-items-center text-mint-300 text-[11px] font-bold">
                {player.slice(0, 2)}
              </div>
              <div className="text-[9px] font-mono text-ink-400 text-center leading-tight">
                {player}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pack-claim row — non-cinematic, non-brief, rendered */}
      {!isCinematic && !isBrief && !isLiquid && (
        <div className="mx-3 mt-2 rounded-lg border border-mint-500/30 bg-mint-500/[0.04] px-4 py-2.5">
          <div className="font-mono text-[11.5px] text-ink-100">
            Pack credited · claim by{" "}
            <span className="text-mint-300">
              {event.claim_expires_at
                ? new Date(event.claim_expires_at as string).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "—"}
            </span>
          </div>
        </div>
      )}

      {(variant === "v1001" || variant === "almanac") && after.callouts && (
        <CalloutGrid callouts={after.callouts} ctx={ctx} mode={mode} accent="mint" />
      )}
      {isBrief && after.callouts && (
        <CalloutGrid callouts={after.callouts} ctx={ctx} mode={mode} accent="amber" />
      )}

      <BodyParagraphs body={after.body} ctx={ctx} mode={mode} />
      <PrimaryCta label={cta || "Claim your pack"} mode={mode} uppercase={isCinematic} />
      {!isBrief && <GhostCtaLink label="Set tomorrow's lineup" mode={mode} />}

      {/* Streak footer — v1001/almanac rendered */}
      {(variant === "v1001" || variant === "almanac") && !isLiquid && (
        <div className="mx-3 mb-2 mt-1 px-3 py-2 rounded-lg border border-white/10 bg-white/[0.02] text-center">
          <div className="font-mono text-[11px] text-ink-400">
            <span className="text-mint-300 font-semibold">
              {(customer.fastbreak_win_streak as string | number | undefined) ?? "—"}
            </span>{" "}
            win streak ·{" "}
            <span className="text-ink-300">
              {(customer.fastbreak_lifetime_wins as string | number | undefined) ?? "—"}
            </span>{" "}
            lifetime
          </div>
        </div>
      )}

      <BrandFooter mode={mode} />
    </TemplateOuter>
  );
}

// ===================================================================
// Template 5 — Drop Announcement (FULL)
//
// Theatrical poster layout. Lead color: flame (heavy).
// ===================================================================

function DropAnnouncementTemplate({ variant, after, ctx, mode }: RenderArgs) {
  const subject = resolveOrRaw(after.subject, ctx, mode);
  const preheader = resolveOrRaw(after.preheader, ctx, mode);
  const cta = resolveOrRaw(after.cta, ctx, mode);
  const isLiquid = mode === "liquid";
  const isCinematic = variant === "cinematic";
  const isBrief = variant === "brief";
  const isV1001orAlmanac = variant === "v1001" || variant === "almanac";

  const drop = (ctx.drop as Record<string, unknown> | undefined) ?? {};

  const formatDropTime = (dateStr: unknown) => {
    if (!dateStr) return "—";
    try {
      const d = new Date(dateStr as string);
      return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) +
        " · " + d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZoneName: "short" });
    } catch {
      return String(dateStr);
    }
  };

  const formatQueueTime = (dateStr: unknown) => {
    if (!dateStr) return "—";
    try {
      const d = new Date(dateStr as string);
      return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZoneName: "short" });
    } catch {
      return String(dateStr);
    }
  };

  const liveAtFormatted = formatDropTime(drop.live_at);
  const queueTimeFormatted = formatQueueTime(drop.queue_open_at);

  const legendText = isLiquid
    ? "{{drop.featured_player_legend}}"
    : (drop.featured_player_legend as string | undefined) ?? "";

  return (
    <TemplateOuter mode={mode} templateId="drop-announcement" variant={variant}>
      <ModeBadge mode={mode} accent="flame" />
      <MockPersonaBadge ctx={ctx} mode={mode} />
      <EmailHeader from={after.from} ctx={ctx} mode={mode} />
      <SubjectPreheader subject={subject} preheader={preheader} mode={mode} />
      <BrandHeader />

      {/* Full-bleed poster hero */}
      <HeroImage after={after} ctx={ctx} mode={mode} aspect={isBrief ? "16/9" : "16/10"} />

      {/* Legend headline — non-brief */}
      {!isBrief && (
        <div className="mx-3 mt-3 px-4 py-3 rounded-lg border border-flame-500/20 bg-flame-500/[0.04]">
          {isLiquid ? (
            <div className="font-mono text-[11px] text-amber-300">
              {"{{drop.featured_player_legend}}"}
            </div>
          ) : (
            <div className="text-[17px] font-semibold text-balance leading-snug text-ink-50">
              {legendText || " "}
            </div>
          )}
        </div>
      )}

      {/* Anticipation cards — v1001/almanac */}
      {isV1001orAlmanac && (
        <div className="mx-3 mt-3 grid grid-cols-3 gap-2">
          {/* When */}
          <div className="rounded-md border border-flame-500/25 bg-flame-500/[0.04] px-2 py-3 text-center">
            <div className="text-[9px] uppercase tracking-wider text-flame-300 font-semibold">When</div>
            {isLiquid ? (
              <div className="mt-1 text-[10px] font-mono text-amber-200">
                {"{{drop.live_at | date: \"%a %b %-d\"}}"}
              </div>
            ) : (
              <>
                <div className="mt-1 text-[11px] font-mono text-ink-100">
                  {liveAtFormatted}
                </div>
                <div className="text-[9.5px] font-mono text-ink-400 mt-0.5">
                  Queue opens {queueTimeFormatted}
                </div>
              </>
            )}
          </div>
          {/* What */}
          <div className="rounded-md border border-flame-500/25 bg-flame-500/[0.04] px-2 py-3 text-center">
            <div className="text-[9px] uppercase tracking-wider text-flame-300 font-semibold">What</div>
            {isLiquid ? (
              <div className="mt-1 text-[10px] font-mono text-amber-200">
                {"{{drop.set_name}} · {{drop.tier}} · {{drop.circulation_total}}"}
              </div>
            ) : (
              <div className="mt-1 text-[11px] font-mono text-ink-100">
                {[
                  drop.set_name as string | undefined,
                  drop.tier as string | undefined,
                  drop.circulation_total as string | undefined,
                ]
                  .filter(Boolean)
                  .join(" · ") || "—"}
              </div>
            )}
          </div>
          {/* How */}
          <div className="rounded-md border border-flame-500/25 bg-flame-500/[0.04] px-2 py-3 text-center">
            <div className="text-[9px] uppercase tracking-wider text-flame-300 font-semibold">How</div>
            {isLiquid ? (
              <div className="mt-1 text-[10px] font-mono text-amber-200">
                {"{{drop.starting_price}} · fair-allocation queue"}
              </div>
            ) : (
              <div className="mt-1 text-[11px] font-mono text-ink-100">
                {(drop.starting_price as string | undefined) ?? "—"} · fair-allocation queue
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cinematic: compact time+supply line */}
      {isCinematic && (
        <div className="mx-3 mt-3 px-4 py-2.5 rounded-lg border border-flame-500/20 bg-flame-500/[0.04]">
          {isLiquid ? (
            <div className="font-mono text-[11px] text-amber-300">
              {"{{drop.live_at | date: \"%A\"}} {{drop.live_at | date: \"%l:%M %p\"}} ET · {{drop.circulation_total}} packs · queue opens {{drop.queue_open_at | date: \"%l:%M %p\"}}"}
            </div>
          ) : (
            <div className="font-mono text-[12px] text-ink-100">
              {liveAtFormatted} · {(drop.circulation_total as string | undefined) ?? "—"} packs · queue opens {queueTimeFormatted}
            </div>
          )}
        </div>
      )}

      {/* CalloutGrid — flame for v1001/almanac; amber for brief */}
      {isV1001orAlmanac && after.callouts && (
        <CalloutGrid callouts={after.callouts} ctx={ctx} mode={mode} accent="flame" />
      )}
      {isBrief && after.callouts && (
        <CalloutGrid callouts={after.callouts} ctx={ctx} mode={mode} accent="amber" />
      )}

      <BodyParagraphs body={after.body} ctx={ctx} mode={mode} />
      <PrimaryCta label={cta || "Set a reminder"} mode={mode} uppercase={isCinematic} />
      <GhostCtaLink label="Add to calendar" mode={mode} />
      <BrandFooter mode={mode} />
    </TemplateOuter>
  );
}

// ===================================================================
// Template 6 — Abandoned Cart (FULL)
//
// Moment-as-hero, social-proof-as-spine. Lead color: mint (calm).
// ===================================================================

function AbandonedCartTemplate({ variant, after, ctx, mode }: RenderArgs) {
  const subject = resolveOrRaw(after.subject, ctx, mode);
  const preheader = resolveOrRaw(after.preheader, ctx, mode);
  const cta = resolveOrRaw(after.cta, ctx, mode);
  const isLiquid = mode === "liquid";
  const isCinematic = variant === "cinematic";
  const isBrief = variant === "brief";

  const event = (ctx.event as Record<string, unknown> | undefined) ?? {};

  const socialProof = (event.social_proof as Record<string, unknown> | undefined) ?? {};
  const recentBandSales =
    (event.recent_serial_band_sales as Record<string, string>[] | undefined) ?? [];

  const momentImageSrc =
    (event.moment_image_url as string | undefined) ?? HERO_PLACEHOLDER;
  const playerName = (event.player_name as string | undefined) ?? "Player";
  const playCategory = (event.play_category as string | undefined) ?? "";
  const serial = (event.serial as string | number | undefined) ?? "";

  return (
    <TemplateOuter mode={mode} templateId="abandoned-cart" variant={variant}>
      <ModeBadge mode={mode} accent="mint" />
      <MockPersonaBadge ctx={ctx} mode={mode} />
      <EmailHeader from={after.from} ctx={ctx} mode={mode} />
      <SubjectPreheader subject={subject} preheader={preheader} mode={mode} />
      <BrandHeader />

      {/* Framed Moment thumbnail — non-brief, non-cinematic */}
      {!isBrief && !isCinematic && (
        <div className="mx-6 mt-3 rounded-xl overflow-hidden border border-mint-500/25 bg-ink-950">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={momentImageSrc}
            alt={`${playerName} Moment`}
            className="w-full block"
            style={{ aspectRatio: "3/4" }}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = HERO_PLACEHOLDER;
            }}
          />
          <div className="px-3 py-2 bg-black/60 border-t border-white/10">
            <div className="text-[13px] font-semibold text-ink-100">{playerName}</div>
            <div className="text-[11px] font-mono text-ink-400">
              {playCategory}
              {serial ? ` · #${serial}` : ""}
            </div>
          </div>
        </div>
      )}

      {/* Brief: small inline hero */}
      {isBrief && <HeroImage after={after} ctx={ctx} mode={mode} aspect="16/9" />}
      {/* Cinematic: 4/3 hero */}
      {isCinematic && <HeroImage after={after} ctx={ctx} mode={mode} aspect="4/3" />}

      {/* Cinematic: 3 callout pills (mint accent) */}
      {isCinematic && after.callouts && (
        <div className="mx-3 mt-3 grid grid-cols-3 gap-2">
          {after.callouts.slice(0, 3).map((c, i) => (
            <div
              key={i}
              className="rounded-md border border-mint-500/30 bg-mint-500/[0.05] px-2 py-2 text-center"
            >
              <div className="text-[9px] uppercase tracking-wider text-mint-300 font-semibold">
                {isLiquid ? c.label : resolveLiquidString(c.label, ctx)}
              </div>
              <div
                className={`mt-1 ${
                  isLiquid
                    ? "font-mono text-[10px] text-amber-200"
                    : "text-[11px] font-mono text-ink-100"
                }`}
              >
                {isLiquid ? c.value : resolveLiquidString(c.value, ctx)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Social proof block — non-cinematic, non-brief */}
      {!isCinematic && !isBrief && (
        <div className="mx-3 mt-3 rounded-lg border border-mint-500/20 bg-mint-500/[0.04] px-4 py-3">
          {isLiquid ? (
            <div className="font-mono text-[10.5px] text-amber-300 whitespace-pre-wrap leading-relaxed">
              {"{{event.social_proof.sample_player_sales_24h}} collectors bought {{event.social_proof.sample_player}} Moments in the last 24h\nAvg clear: {{event.social_proof.sample_player_avg_24h_usd}} · top: {{event.social_proof.sample_player_max_24h_usd}}"}
            </div>
          ) : (
            <>
              <div className="text-[11.5px] text-ink-100">
                <span className="font-bold font-mono text-mint-300">
                  {(socialProof.sample_player_sales_24h as string | undefined) ?? "—"}
                </span>
                {" collectors bought "}
                <span className="font-semibold">
                  {(socialProof.sample_player as string | undefined) ?? "—"}
                </span>
                {" Moments in the last 24h"}
              </div>
              <div className="mt-1 text-[10.5px] text-ink-400 font-mono">
                Avg clear: {(socialProof.sample_player_avg_24h_usd as string | undefined) ?? "—"} · top:{" "}
                {(socialProof.sample_player_max_24h_usd as string | undefined) ?? "—"}
              </div>
            </>
          )}
        </div>
      )}

      {/* Comp-band evidence — non-cinematic, non-brief */}
      {!isCinematic && !isBrief && (
        <div className="mx-3 mt-2 px-3 py-2.5 rounded-lg border border-white/10 bg-white/[0.02]">
          {isLiquid ? (
            <div className="font-mono text-[10.5px] text-amber-300 whitespace-pre-wrap leading-relaxed">
              {"{% for sale in event.recent_serial_band_sales %}\n  Serials {{sale.serial_range}} cleared {{sale.amount}} on {{sale.sold_at | date: \"%b %-d\"}}\n{% endfor %}"}
            </div>
          ) : recentBandSales.length > 0 ? (
            <div className="space-y-1">
              {recentBandSales.map((sale, i) => (
                <div key={i} className="text-[11px] font-mono text-ink-300">
                  {"• Serials "}{sale.serial_range}{" cleared "}{sale.amount}{" on "}
                  {sale.sold_at
                    ? new Date(sale.sold_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : sale.sold_at}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-[11px] font-mono text-ink-500 italic">No recent comp data</div>
          )}
        </div>
      )}

      {/* Listing-still-open status row — rendered, non-cinematic */}
      {!isCinematic && !isLiquid && (
        <div className="mx-3 mt-2 flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/[0.02]">
          <div className="h-2 w-2 rounded-full bg-mint-400 flex-shrink-0" />
          <div className="text-[11px] font-mono text-ink-300">
            Listing intact · still available on the Marketplace
          </div>
        </div>
      )}

      {/* CalloutGrid — mint for v1001/almanac; amber for brief */}
      {(variant === "v1001" || variant === "almanac") && after.callouts && (
        <CalloutGrid callouts={after.callouts} ctx={ctx} mode={mode} accent="mint" />
      )}
      {isBrief && after.callouts && (
        <CalloutGrid callouts={after.callouts} ctx={ctx} mode={mode} accent="amber" />
      )}

      <BodyParagraphs body={after.body} ctx={ctx} mode={mode} />
      <PrimaryCta label={cta || "Finish your purchase"} mode={mode} uppercase={isCinematic} />
      <GhostCtaLink label="Browse this set" mode={mode} />
      <BrandFooter mode={mode} />
    </TemplateOuter>
  );
}

// ===================================================================
// Generic shell — fallback for stubbed templates. Mirrors the v1003 shape.
// Distinguishable from the full templates only by the data-template attr,
// so during review we can tell which templates are stubbed vs realized.
// ===================================================================

function GenericShellTemplate({
  variant,
  after,
  ctx,
  mode,
  accent,
  templateId,
}: RenderArgs & { accent: "flame" | "mint" | "amber" | "ink"; templateId: TemplateId }) {
  const subject = resolveOrRaw(after.subject, ctx, mode);
  const preheader = resolveOrRaw(after.preheader, ctx, mode);
  const cta = resolveOrRaw(after.cta, ctx, mode);

  return (
    <TemplateOuter mode={mode} templateId={templateId} variant={variant}>
      <ModeBadge mode={mode} accent="mint" />
      <MockPersonaBadge ctx={ctx} mode={mode} />
      <EmailHeader from={after.from} ctx={ctx} mode={mode} />
      <SubjectPreheader subject={subject} preheader={preheader} mode={mode} />
      <BrandHeader />
      <HeroImage after={after} ctx={ctx} mode={mode} />
      {after.callouts && (
        <CalloutGrid callouts={after.callouts} ctx={ctx} mode={mode} accent={accent} />
      )}
      <BodyParagraphs body={after.body} ctx={ctx} mode={mode} />
      <PrimaryCta label={cta} mode={mode} uppercase={variant === "cinematic"} />
      <BrandFooter mode={mode} />
      {/* Stub-status banner so reviewers know which templates are fleshed out vs. fallback */}
      {mode === "rendered" && (
        <div className="mx-3 mb-3 -mt-2 px-3 py-1.5 rounded-md border border-amber-500/20 bg-amber-500/[0.04] text-[10px] text-amber-300/80 font-mono text-center">
          Template stub · {templateId} · spec at /opt/magic/collect-hq/strategy/2026-05-04-email-design-system.md
        </div>
      )}
    </TemplateOuter>
  );
}
