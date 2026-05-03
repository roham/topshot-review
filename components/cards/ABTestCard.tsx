import type { Card } from "@/lib/cards";

export function ABTestCard({ card }: { card: Card }) {
  const d = card.data as { variants: { label: string; subject: string; preview: string }[] };
  return (
    <div className="mx-auto max-w-[460px] rounded-3xl bg-gradient-to-br from-ink-900 to-ink-950 border border-white/10 overflow-hidden shadow-card">
      <div className="px-6 pt-6 pb-3">
        <div className="text-[10px] uppercase tracking-[0.2em] text-flame-400 font-semibold">A/B variants</div>
        <h3 className="mt-1.5 font-display text-[20px] font-semibold tracking-tight text-ink-50 leading-[1.18]">{card.title}</h3>
        <p className="mt-1.5 text-[13px] text-ink-300">{card.subtitle}</p>
      </div>
      <div className="px-6 pb-3 space-y-2.5">
        {d.variants.map((v) => (
          <div key={v.label} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase tracking-wider text-flame-300 font-semibold px-2 py-0.5 rounded-full bg-flame-500/10 border border-flame-500/30">{v.label}</span>
            </div>
            <div className="rounded-lg bg-white p-3">
              <div className="text-[14px] font-semibold text-black leading-snug text-balance">{v.subject}</div>
              <div className="text-[12px] text-black/60 mt-1 truncate">{v.preview}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-6 pb-6">
        <div className="text-[11px] uppercase tracking-wider text-ink-400 font-semibold mb-1.5">Why</div>
        <p className="text-[13px] text-ink-200 leading-[1.55]">{card.rationale}</p>
      </div>
    </div>
  );
}
