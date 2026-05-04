import type { UpgradeCard as TUpgradeCard, UpgradeState, VoiceMode, AfterVariantId } from "@/lib/cards";

const VARIANT_LABELS: Record<AfterVariantId, string> = {
  v1001: "v1001",
  almanac: "Almanac",
  cinematic: "Cinematic",
  brief: "Brief",
};

const VARIANT_DESCRIPTIONS: Record<AfterVariantId, string> = {
  v1001: "Current · platform-chronicler",
  almanac: "Frame A · Stratechery-style chronicler-statesman",
  cinematic: "Frame B · Topps-style sensationalized legend",
  brief: "Frame C · Bloomberg-style market reporter",
};

const VARIANT_TONES: Record<AfterVariantId, string> = {
  v1001: "border-mint-500 bg-mint-500/25 text-white",
  almanac: "border-flame-500 bg-flame-500/25 text-white",
  cinematic: "border-rose-500 bg-rose-500/25 text-white",
  brief: "border-amber-500 bg-amber-500/25 text-white",
};

const VARIANT_DOT_TONES: Record<AfterVariantId, string> = {
  v1001: "bg-mint-500",
  almanac: "bg-flame-500",
  cinematic: "bg-rose-500",
  brief: "bg-amber-500",
};

const VARIANT_ORDER: AfterVariantId[] = ["v1001", "almanac", "cinematic", "brief"];

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

const VOICE_LABEL: Record<VoiceMode, string> = {
  "platform-chronicler": "Platform · chronicler",
  "magic-observational": "Magic · observational",
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

export function UpgradeCard({
  card,
  activeVariant,
  onVariantChange,
}: {
  card: TUpgradeCard;
  activeVariant: AfterVariantId;
  onVariantChange: (v: AfterVariantId) => void;
}) {
  const after = card.after[activeVariant];
  return (
    <article className="w-full max-w-[640px] mx-auto bg-ink-900/95 border border-white/10 rounded-3xl shadow-card overflow-hidden">
      {/* Hero */}
      <div className="relative w-full aspect-[3/2] bg-ink-950 overflow-hidden">
        <img
          src={card.hero}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-90"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-flame-500/95 text-white text-[11px] font-semibold tracking-wider uppercase">
            {card.position} of 7
          </span>
          <span
            className={`px-2.5 py-1 rounded-full border text-[10.5px] font-semibold tracking-wider uppercase ${
              STATE_TONE[card.diagnosis.state]
            }`}
          >
            {STATE_LABEL[card.diagnosis.state]}
          </span>
        </div>
        <div className="absolute bottom-5 left-5 right-5">
          <div className="text-[11px] uppercase tracking-[0.18em] text-flame-300 font-semibold">
            Customer.io upgrade · v1001
          </div>
          <h2 className="mt-1.5 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-ink-50 leading-[1.1] text-balance">
            {card.stack_item}
          </h2>
        </div>
      </div>

      {/* Headline */}
      <div className="px-5 pt-5 pb-4 border-b border-white/5">
        <p className="text-[15px] sm:text-base text-ink-100 leading-snug text-pretty">
          {card.headline}
        </p>
      </div>

      {/* Pills */}
      <div className="px-5 pt-4 pb-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5 border-b border-white/5">
        <Pill label="Audience" value={card.pills.audience} tone="audience" />
        <Pill label="Trigger" value={card.pills.trigger} tone="trigger" />
        <Pill label="KPI" value={card.pills.kpi} tone="kpi" />
      </div>

      {/* Diagnosis */}
      <Section title="Diagnosis">
        <p className="text-[14px] text-ink-200 leading-[1.55] text-pretty">
          {card.diagnosis.summary}
        </p>
        {card.diagnosis.facts.length > 0 && (
          <div className="mt-4 rounded-xl border border-white/10 overflow-hidden">
            <div className="divide-y divide-white/[0.06]">
              {card.diagnosis.facts.map((f, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[minmax(120px,38%)_1fr] text-[12.5px]"
                >
                  <div className="px-3 py-2 bg-white/[0.025] text-ink-300 font-medium">
                    {f.label}
                  </div>
                  <div className="px-3 py-2 text-ink-100 font-mono text-[12px] break-words">
                    {f.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {card.diagnosis.campaigns.length > 0 && (
          <div className="mt-4">
            <div className="text-[10.5px] uppercase tracking-wider text-ink-400 font-semibold mb-1.5">
              Campaigns referenced
            </div>
            <ul className="space-y-1.5">
              {card.diagnosis.campaigns.map((c) => (
                <li
                  key={`${c.id}-${c.name}`}
                  className="flex items-start gap-2 text-[12.5px]"
                >
                  <span className="font-mono text-ink-400 shrink-0 w-12">
                    #{c.id}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-ink-100">
                      {c.name}{" "}
                      <span className="text-ink-400">
                        · {c.state.toUpperCase()}
                      </span>
                    </div>
                    {c.note && (
                      <div className="text-ink-400 text-[12px]">{c.note}</div>
                    )}
                    {c.id > 0 && (
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-flame-400 hover:text-flame-300 text-[11.5px] underline decoration-dotted"
                      >
                        verify in fly.customer.io →
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      {/* Before */}
      {card.before && (
        <Section title="What's shipping today" tone="before">
          <div className="text-[10.5px] uppercase tracking-wider text-ink-400 font-semibold">
            {card.before.label}
          </div>
          <div className="mt-2 rounded-xl border border-white/10 bg-white/[0.02] p-3 space-y-2">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-ink-500 font-semibold mb-0.5">
                Subject
              </div>
              <div className="text-[13px] text-ink-100 font-mono break-words">
                {card.before.subject}
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-ink-500 font-semibold mb-0.5">
                Body
              </div>
              <div className="text-[12.5px] text-ink-300 font-mono break-words italic">
                {card.before.excerpt}
              </div>
            </div>
          </div>
          <p className="mt-3 text-[13px] text-ink-200 leading-relaxed text-pretty">
            <span className="text-rose-300 font-semibold">Critique: </span>
            {card.before.critique}
          </p>
        </Section>
      )}

      {/* After */}
      <Section title="Proposed upgrade — 4 variants to compare" tone="after">
        {/* Variant tab strip — high-contrast 2x2 grid so the 4 options are unmissable */}
        <div className="mb-2 text-[11px] uppercase tracking-wider text-flame-400 font-bold">
          ↓ tap a tab to compare versions
        </div>
        <div className="mb-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {VARIANT_ORDER.map((v) => {
            const isActive = v === activeVariant;
            return (
              <button
                key={v}
                onClick={() => onVariantChange(v)}
                className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border-2 text-[12px] font-bold uppercase tracking-wider transition ${
                  isActive
                    ? VARIANT_TONES[v] + " shadow-glow"
                    : "border-white/15 bg-white/[0.03] text-ink-200 hover:bg-white/[0.07]"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${VARIANT_DOT_TONES[v]}`} />
                {VARIANT_LABELS[v]}
              </button>
            );
          })}
        </div>
        <div className="mb-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
          <div className="text-[10px] uppercase tracking-wider text-flame-400 font-bold mb-0.5">
            now showing · {VARIANT_LABELS[activeVariant]}
          </div>
          <div className="text-[12px] text-ink-200">
            {VARIANT_DESCRIPTIONS[activeVariant]}
          </div>
          <div className="mt-1 text-[10.5px] text-ink-400">
            {after.label}
          </div>
        </div>
        <div className="mt-2 rounded-xl border border-mint-500/20 bg-mint-500/[0.04] overflow-hidden">
          {/* Email-style header */}
          <div className="px-3 py-2 border-b border-mint-500/15 bg-mint-500/[0.03]">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-flame-400 to-flame-600 grid place-items-center text-white text-[10.5px] font-bold flex-shrink-0">
                {after.from.startsWith("Magic") ? "M" : "TS"}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[12px] text-ink-100 font-semibold truncate">
                  {after.from}
                </div>
                <div className="text-[10.5px] text-ink-400">
                  to {`{{customer.userName}}`}
                </div>
              </div>
            </div>
          </div>
          {/* Subject + preheader */}
          <div className="px-3 pt-3">
            <div className="text-[15px] text-ink-50 font-semibold leading-snug text-balance">
              {after.subject}
            </div>
            <div className="mt-1 text-[12px] text-ink-400 italic leading-snug">
              {after.preheader}
            </div>
          </div>
          {/* Email brand header */}
          <div className="mx-3 mt-3 rounded-t-lg bg-black px-4 py-3 flex items-center justify-center border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://userimg-assets.customeriomail.com/images/client-env-161112/1717540209144_NBATopShot_LOGO_Horizontal_WhiteText_01HZJNZGHEK03E5E2ZH1DBRQ8E.png"
              alt="NBA Top Shot"
              className="h-7 w-auto"
            />
          </div>
          {/* Hero image — real official asset */}
          {after.emailHero ? (
            <div className="mx-3 overflow-hidden border-x border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={after.emailHero.src}
                alt={after.emailHero.alt}
                className="w-full block"
              />
              {after.emailHero.liquidCaption && (
                <div className="px-3 py-1.5 bg-flame-500/10 border-t border-flame-500/20 text-[10px] font-mono text-flame-300 text-center">
                  {after.emailHero.liquidCaption}
                </div>
              )}
            </div>
          ) : (
            <div className="mx-3 border-x border-white/10 bg-gradient-to-br from-ink-800 to-ink-900 px-3 py-3 text-[10.5px] uppercase tracking-wider text-ink-500 font-semibold text-center">
              ▢ Hero image · branded · 60%+ visual real estate
            </div>
          )}
          {/* Structured callouts */}
          {after.callouts && after.callouts.length > 0 && (
            <div className="mx-3 mt-3 rounded-lg border border-flame-500/20 bg-flame-500/[0.04] divide-y divide-flame-500/15 overflow-hidden">
              {after.callouts.map((c, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[minmax(96px,30%)_1fr] text-[12px]"
                >
                  <div className="px-3 py-2 bg-flame-500/[0.03] text-flame-300 font-semibold uppercase tracking-wider text-[10px]">
                    {c.label}
                  </div>
                  <div className="px-3 py-2 text-ink-100 font-mono text-[11.5px] break-words">
                    {c.value}
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Body */}
          <div className="px-3 pt-3 pb-3 space-y-2.5 text-[13.5px] text-ink-100 leading-[1.55]">
            {after.body.map((p, i) => {
              if (/^\{%/.test(p.trim()) || /^\{\{/.test(p.trim())) {
                return (
                  <p key={i} className="font-mono text-[12px] text-flame-300">
                    {p}
                  </p>
                );
              }
              return (
                <p key={i} className="text-pretty">
                  <MdLine text={p} />
                </p>
              );
            })}
          </div>
          {/* CTA */}
          <div className="mx-3 mt-1">
            <div className="rounded-lg bg-[#E9461B] px-4 py-3 text-center text-[14px] font-bold text-white tracking-wide shadow-lg shadow-flame-500/25 hover:bg-[#d43d15] cursor-pointer">
              {after.cta} →
            </div>
          </div>
          {/* Email footer */}
          <div className="mx-3 mb-3 mt-4 rounded-b-lg border border-white/10 bg-black/60 px-4 py-3 flex flex-col items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://userimg-assets.customeriomail.com/images/client-env-161112/1717540209144_NBATopShot_LOGO_Horizontal_WhiteText_01HZJNZGHEK03E5E2ZH1DBRQ8E.png"
              alt="NBA Top Shot"
              className="h-5 w-auto opacity-60"
            />
            <div className="flex items-center gap-2.5">
              {[
                { label: "Discord", icon: "https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-black/discord@2x.png" },
                { label: "X", icon: "https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-black/twitter@2x.png" },
                { label: "Instagram", icon: "https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-black/instagram@2x.png" },
                { label: "YouTube", icon: "https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-black/youtube@2x.png" },
              ].map((s) => (
                <div key={s.label} className="h-6 w-6 rounded-full overflow-hidden opacity-40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.icon} alt={s.label} className="h-full w-full" />
                </div>
              ))}
            </div>
            <div className="text-[9.5px] text-ink-500 text-center leading-snug">
              Dapper Labs Inc · 222 N Pacific Coast Hwy, El Segundo, CA 90245
              <br />
              <span className="text-ink-600">Privacy Policy · Terms of Service · Unsubscribe</span>
            </div>
          </div>
        </div>
        {after.voice_notes && (
          <p className="mt-3 text-[12.5px] text-ink-300 leading-relaxed italic text-pretty">
            <span className="text-mint-400 not-italic font-semibold">
              Voice notes:{" "}
            </span>
            {after.voice_notes}
          </p>
        )}
      </Section>

      {/* Reviewer ask */}
      <Section title="What I need from you" tone="ask">
        <p className="text-[14px] text-ink-100 leading-relaxed text-pretty">
          {card.reviewer_ask}
        </p>
      </Section>

      {/* Engineering hooks (optional, compact) */}
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
      <div className="text-[9.5px] uppercase tracking-[0.16em] font-semibold opacity-80">
        {label}
      </div>
      <div className="mt-1 text-[12.5px] leading-snug text-ink-100 text-pretty">
        {value}
      </div>
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
        className={`text-[10.5px] uppercase tracking-[0.2em] font-semibold mb-3 ${
          tones[tone ?? "muted"] ?? "text-ink-400"
        }`}
      >
        {title}
      </h3>
      {children}
    </section>
  );
}
