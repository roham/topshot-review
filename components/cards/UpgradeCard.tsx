import type { UpgradeCard as TUpgradeCard, UpgradeState, AfterVariantId, AfterBlock } from "@/lib/cards";
import { resolveLiquidBody, resolveLiquidString, type LiquidContext } from "@/lib/liquid";
import { MOCK_CONTEXTS } from "@/lib/mockData";

const STATE_LABEL: Record<UpgradeState, string> = {
  "stopped": "STOPPED",
  "broken-in-prod": "BROKEN IN PROD",
  "missing": "MISSING",
  "running-flat": "RUNNING · FLAT",
};

const STATE_TONE: Record<UpgradeState, string> = {
  "stopped": "border-rose-500/50 bg-rose-500/15 text-rose-300",
  "broken-in-prod": "border-rose-600 bg-rose-600/25 text-rose-200 animate-pulse",
  "missing": "border-amber-500/50 bg-amber-500/15 text-amber-300",
  "running-flat": "border-amber-500/40 bg-amber-500/10 text-amber-200",
};

const VARIANT_LABEL: Record<AfterVariantId, string> = {
  v1001: "v1001 (current)",
  almanac: "Frame A — Almanac",
  cinematic: "Frame B — Cinematic",
  brief: "Frame C — Brief",
};

const VARIANT_DESC: Record<AfterVariantId, string> = {
  v1001: "Platform-chronicler · what's shipping today",
  almanac: "Stratechery-style chronicler-statesman · long-form narrative + comp data",
  cinematic: "Topps-style sensationalized legend · image-led + bold typography",
  brief: "Bloomberg-style market reporter · terse + data-dense",
};

const VARIANT_DOT: Record<AfterVariantId, string> = {
  v1001: "bg-mint-500",
  almanac: "bg-flame-500",
  cinematic: "bg-rose-500",
  brief: "bg-amber-500",
};

// Render markdown-ish bold (**text**) as <strong>; preserve linebreaks elsewhere.
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

/** Renders a single email (used twice — once with mock data, once as raw Liquid). */
function EmailRender({ after, ctx, mode }: { after: AfterBlock; ctx: LiquidContext; mode: "rendered" | "liquid" }) {
  const isLiquid = mode === "liquid";
  // For "liquid" mode we just show the raw template values without substitution.
  // For "rendered" mode we resolve every Liquid placeholder against ctx.
  const subject = isLiquid ? after.subject : resolveLiquidString(after.subject, ctx);
  const preheader = isLiquid ? after.preheader : resolveLiquidString(after.preheader, ctx);
  const cta = isLiquid ? after.cta : resolveLiquidString(after.cta, ctx);
  const heroSrc = isLiquid ? after.emailHero?.src : resolveLiquidString(after.emailHero?.src, ctx);
  const heroAlt = isLiquid ? after.emailHero?.alt : resolveLiquidString(after.emailHero?.alt, ctx);
  const callouts = (after.callouts ?? []).map((c) => ({
    label: isLiquid ? c.label : resolveLiquidString(c.label, ctx),
    value: isLiquid ? c.value : resolveLiquidString(c.value, ctx),
  }));
  const body = isLiquid ? after.body : resolveLiquidBody(after.body, ctx);

  // For rendered mode, the hero src might still contain unresolved Liquid
  // (e.g. if mock data is missing for that field). In that case fall back to
  // a known-good placeholder so the email never shows broken images.
  const heroIsResolved = heroSrc && !heroSrc.includes("{{") && !heroSrc.includes("{%");
  const safeHeroSrc = heroIsResolved ? heroSrc : "/cards/infographics/moment-hero-placeholder.png";

  return (
    <div className={`rounded-xl overflow-hidden border ${isLiquid ? "border-amber-500/20 bg-amber-500/[0.02]" : "border-mint-500/20 bg-mint-500/[0.04]"}`}>
      {/* Mode badge */}
      <div className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-bold border-b ${isLiquid ? "border-amber-500/20 bg-amber-500/10 text-amber-300" : "border-mint-500/20 bg-mint-500/10 text-mint-300"}`}>
        {isLiquid ? "Customer.io · Liquid template — programmable form" : "Rendered preview — mock collector data"}
      </div>

      {/* Mock persona badge — rendered mode only */}
      {!isLiquid && (() => {
        const p = ctx.customer as Record<string, unknown> | undefined;
        if (!p) return null;
        const name = p.userName as string ?? "Collector";
        const moments = p.lifetime_moments_owned as string | number | undefined;
        const joined = p.first_session_at ? new Date(p.first_session_at as string).getFullYear() : null;
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
                {moments != null && `${moments} Moments`}{joined != null && ` · since ${joined}`}{lastSeen != null && ` · last seen ${lastSeen}d ago`}
              </div>
            </div>
            <div className="text-[9px] uppercase tracking-wider text-ink-600 font-semibold flex-shrink-0">mock</div>
          </div>
        );
      })()}

      {/* Email-style header */}
      <div className="px-3 py-2 border-b border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-flame-400 to-flame-600 grid place-items-center text-white text-[10.5px] font-bold flex-shrink-0">
            {after.from.startsWith("Magic") ? "M" : "TS"}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[12px] text-ink-100 font-semibold truncate">{after.from}</div>
            <div className="text-[10.5px] text-ink-400 font-mono">
              to {isLiquid ? "{{customer.userName}}" : (ctx.customer as Record<string, unknown> | undefined)?.userName as string ?? "you"}
            </div>
          </div>
        </div>
      </div>
      {/* Subject + preheader */}
      <div className="px-3 pt-3">
        <div className={`text-[15px] font-semibold leading-snug text-balance ${isLiquid ? "text-amber-100 font-mono text-[12.5px]" : "text-ink-50"}`}>
          {subject}
        </div>
        <div className={`mt-1 text-[12px] italic leading-snug ${isLiquid ? "text-amber-300/80 font-mono not-italic" : "text-ink-400"}`}>
          {preheader}
        </div>
      </div>
      {/* Brand header */}
      <div className="mx-3 mt-3 rounded-t-lg bg-black px-4 py-3 flex items-center justify-center border border-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://userimg-assets.customeriomail.com/images/client-env-161112/1717540209144_NBATopShot_LOGO_Horizontal_WhiteText_01HZJNZGHEK03E5E2ZH1DBRQ8E.png"
          alt="NBA Top Shot"
          className="h-7 w-auto"
        />
      </div>
      {/* Hero */}
      {after.emailHero ? (
        <div className="mx-3 overflow-hidden border-x border-white/10 bg-ink-950">
          {isLiquid ? (
            <div className="px-3 py-3 font-mono text-[11px] text-amber-300 break-words">
              <span className="opacity-60">img src=</span>{after.emailHero.src}
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={safeHeroSrc}
              alt={heroAlt}
              className="w-full block"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/cards/infographics/moment-hero-placeholder.png";
              }}
            />
          )}
          {after.emailHero.liquidCaption && (
            <div className="px-3 py-1.5 bg-flame-500/10 border-t border-flame-500/20 text-[10px] font-mono text-flame-300 text-center">
              {isLiquid ? after.emailHero.liquidCaption : resolveLiquidString(after.emailHero.liquidCaption, ctx)}
            </div>
          )}
        </div>
      ) : (
        <div className="mx-3 border-x border-white/10 bg-gradient-to-br from-ink-800 to-ink-900 px-3 py-3 text-[10.5px] uppercase tracking-wider text-ink-500 font-semibold text-center">
          ▢ no hero image specified
        </div>
      )}
      {/* Callouts */}
      {callouts.length > 0 && (
        <div className="mx-3 mt-3 rounded-lg border border-flame-500/20 bg-flame-500/[0.04] divide-y divide-flame-500/15 overflow-hidden">
          {callouts.map((c, i) => (
            <div key={i} className="grid grid-cols-[minmax(96px,30%)_1fr] text-[12px]">
              <div className="px-3 py-2 bg-flame-500/[0.03] text-flame-300 font-semibold uppercase tracking-wider text-[10px]">{c.label}</div>
              <div className={`px-3 py-2 text-ink-100 break-words ${isLiquid ? "font-mono text-[11px] text-amber-200" : "text-[11.5px] font-mono"}`}>{c.value}</div>
            </div>
          ))}
        </div>
      )}
      {/* Body */}
      <div className="px-3 pt-3 pb-3 space-y-2.5 text-[13.5px] leading-[1.55]">
        {body.map((p, i) => {
          const isLiquidLine = /^\{%/.test(p.trim()) || /^\{\{/.test(p.trim());
          if (isLiquid) {
            return (
              <p key={i} className="font-mono text-[11.5px] text-amber-200 whitespace-pre-wrap break-words">
                {p}
              </p>
            );
          }
          if (isLiquidLine) {
            // Some Liquid lines (like {% endfor %}) might survive the resolver if data is missing
            return null;
          }
          return (
            <p key={i} className="text-pretty text-ink-100">
              <MdLine text={p} />
            </p>
          );
        })}
      </div>
      {/* CTA */}
      <div className="mx-3 mt-1">
        <div className={`rounded-lg ${isLiquid ? "border border-amber-500/30 bg-amber-500/10 text-amber-200 font-mono text-[12px]" : "bg-[#E9461B] text-white text-[14px] font-bold shadow-lg shadow-flame-500/25"} px-4 py-3 text-center tracking-wide`}>
          {cta}{!isLiquid && " →"}
        </div>
      </div>
      {/* Email footer (compressed in liquid mode) */}
      {!isLiquid && (
        <div className="mx-3 mb-3 mt-4 rounded-b-lg border border-white/10 bg-black/60 px-4 py-3 flex flex-col items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://userimg-assets.customeriomail.com/images/client-env-161112/1717540209144_NBATopShot_LOGO_Horizontal_WhiteText_01HZJNZGHEK03E5E2ZH1DBRQ8E.png"
            alt="NBA Top Shot"
            className="h-5 w-auto opacity-60"
          />
          <div className="text-[9.5px] text-ink-500 text-center leading-snug">
            Dapper Labs Inc · 222 N Pacific Coast Hwy, El Segundo, CA 90245
            <br />
            <span className="text-ink-600">Privacy Policy · Terms of Service · Unsubscribe</span>
          </div>
        </div>
      )}
      {isLiquid && (
        <div className="mx-3 mb-3 mt-2 px-3 py-2 rounded-lg border border-amber-500/20 bg-amber-500/[0.03] text-[10px] text-amber-300/70 font-mono">
          [footer · same Liquid template across all variants]
        </div>
      )}
    </div>
  );
}

export function UpgradeCard({
  card,
  activeVariant,
}: {
  card: TUpgradeCard;
  activeVariant: AfterVariantId;
}) {
  const after = card.after[activeVariant];
  const ctx = MOCK_CONTEXTS[card.id] ?? {};

  return (
    <article className="w-full max-w-[640px] mx-auto bg-ink-900/95 border border-white/10 rounded-3xl shadow-card overflow-hidden">
      {/* Hero */}
      <div className="relative w-full aspect-[3/2] bg-ink-950 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={card.hero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-90" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-flame-500/95 text-white text-[11px] font-semibold tracking-wider uppercase">
            Card {card.position} of 7
          </span>
          <span className={`px-2.5 py-1 rounded-full border text-[10.5px] font-semibold tracking-wider uppercase ${STATE_TONE[card.diagnosis.state]}`}>
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
          <div className="text-[11px] uppercase tracking-[0.18em] text-flame-300 font-semibold">Customer.io upgrade · v1004</div>
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
                <div className="text-[12.5px] text-ink-300 font-mono break-words italic">{card.before.excerpt}</div>
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

        {/* RENDERED EMAIL with mock data */}
        <EmailRender after={after} ctx={ctx} mode="rendered" />

        {/* Liquid template form */}
        <div className="mt-4">
          <EmailRender after={after} ctx={ctx} mode="liquid" />
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
                <span className="leading-relaxed"><MdLine text={h} /></span>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </article>
  );
}

function Pill({ label, value, tone }: { label: string; value: string; tone: "audience" | "trigger" | "kpi" }) {
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

function Section({ title, children, tone }: { title: string; children: React.ReactNode; tone?: "before" | "after" | "ask" | "muted" }) {
  const tones: Record<string, string> = {
    before: "text-rose-300",
    after: "text-mint-300",
    ask: "text-amber-300",
    muted: "text-ink-400",
  };
  return (
    <section className="px-5 py-5 border-b border-white/5 last:border-b-0">
      <h3 className={`text-[10.5px] uppercase tracking-[0.2em] font-semibold mb-3 ${tones[tone ?? "muted"] ?? "text-ink-400"}`}>{title}</h3>
      {children}
    </section>
  );
}
