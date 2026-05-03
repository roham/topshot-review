import type { Card } from "@/lib/cards";

export function StrategyCard({ card }: { card: Card }) {
  const id = card.id;
  return (
    <div className="mx-auto max-w-[460px] rounded-3xl bg-gradient-to-br from-ink-900 to-ink-950 border border-white/10 overflow-hidden shadow-card">
      <div className="px-6 pt-6 pb-2">
        <div className="text-[10px] uppercase tracking-[0.2em] text-flame-400 font-semibold">Strategy</div>
        <h3 className="mt-1.5 font-display text-[22px] font-semibold tracking-tight text-ink-50 text-balance leading-[1.15]">{card.title}</h3>
        <p className="mt-1.5 text-[13.5px] text-ink-300 text-pretty">{card.subtitle}</p>
      </div>

      <div className="px-6 py-4">
        {id === "strategy-spine" ? <SpineDiagram data={card.data as any} /> : <ForecastTable data={card.data as any} forecast={card.forecast} />}
      </div>

      <div className="px-6 pb-6">
        <div className="text-[11px] uppercase tracking-wider text-ink-400 font-semibold mb-1.5">Why</div>
        <p className="text-[13px] text-ink-200 leading-[1.55]">{card.rationale}</p>
      </div>
    </div>
  );
}

function SpineDiagram({ data }: { data: { legs: { name: string; audience: string; mechanic: string; kpi: string }[]; kpi: string } }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "A", desc: "Warmth", color: "bg-amber-500/15 text-amber-300 border-amber-500/30" },
          { label: "B", desc: "Narrative · Primary", color: "bg-flame-500/20 text-flame-300 border-flame-500/40 shadow-glow" },
          { label: "C", desc: "Evidence", color: "bg-blue-500/15 text-blue-300 border-blue-500/30" },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl border ${s.color} px-3 py-3 text-center`}>
            <div className="text-2xl font-display font-bold leading-none">{s.label}</div>
            <div className="text-[11px] uppercase tracking-wider opacity-80 mt-1">{s.desc}</div>
          </div>
        ))}
      </div>
      <div className="space-y-2 pt-1">
        {data.legs.map((l) => (
          <div key={l.name} className="rounded-xl border border-flame-500/20 bg-flame-500/5 px-3 py-2.5">
            <div className="flex items-baseline justify-between gap-2 flex-wrap">
              <span className="text-[13px] font-semibold text-flame-300">{l.name}</span>
              <span className="text-[11px] text-ink-400">{l.audience}</span>
            </div>
            <div className="text-[11.5px] text-ink-300 mt-0.5"><span className="text-ink-400">Mechanic:</span> {l.mechanic} · <span className="text-ink-400">KPI:</span> {l.kpi}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ForecastTable({ data, forecast }: { data: { segments: { name: string; size: number; conv: string; react: string }[] }; forecast?: string }) {
  const total = data.segments.reduce((acc, s) => acc + s.size, 0);
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-flame-500/30 bg-gradient-to-br from-flame-500/10 to-flame-500/0 px-4 py-3">
        <div className="text-[11px] uppercase tracking-wider text-flame-300 font-semibold">7-day forecast</div>
        <div className="font-display text-[28px] font-bold text-ink-50 mt-0.5">{forecast}</div>
        <div className="text-[11px] text-ink-400">From a dormant pool of {total.toLocaleString()} L+XL collectors</div>
      </div>
      <div className="rounded-xl overflow-hidden border border-white/10">
        <div className="grid grid-cols-[1fr_auto_auto_auto] text-[11px] uppercase tracking-wider text-ink-400 font-semibold bg-white/[0.03] px-3 py-2 gap-3">
          <div>Segment</div><div>Size</div><div>Conv</div><div>React.</div>
        </div>
        {data.segments.map((s, i) => (
          <div key={s.name} className={`grid grid-cols-[1fr_auto_auto_auto] gap-3 px-3 py-2 text-[12.5px] ${i % 2 ? "bg-white/[0.02]" : ""}`}>
            <div className="text-ink-100 font-medium truncate">{s.name}</div>
            <div className="text-ink-300 font-mono">{s.size}</div>
            <div className="text-ink-300 font-mono">{s.conv}</div>
            <div className="text-flame-300 font-mono font-semibold">{s.react}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
