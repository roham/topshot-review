import type { Card } from "@/lib/cards";

export function DecisionCard({ card }: { card: Card }) {
  const d = card.data as any;
  return (
    <div className="mx-auto max-w-[460px] rounded-3xl bg-gradient-to-br from-ink-900 to-ink-950 border border-white/10 overflow-hidden shadow-card">
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-center gap-2">
          <div className="text-[10px] uppercase tracking-[0.2em] text-flame-400 font-semibold">Decision</div>
          <div className="ml-auto h-1.5 w-1.5 rounded-full bg-flame-500 animate-pulse" />
          <span className="text-[10px] uppercase tracking-wider text-flame-400 font-semibold">needs sign-off</span>
        </div>
        <h3 className="mt-1.5 font-display text-[20px] font-semibold tracking-tight text-ink-50 text-balance leading-[1.18]">{card.title}</h3>
        <p className="mt-1.5 text-[13.5px] text-ink-300 text-pretty">{card.subtitle}</p>
      </div>
      <div className="px-6 py-3 space-y-3">
        {d.surfaces && (
          <div className="rounded-xl border border-white/10 overflow-hidden">
            {d.surfaces.map((s: any, i: number) => (
              <div key={s.name} className={`flex items-baseline gap-3 px-3 py-2 ${i % 2 ? "bg-white/[0.02]" : ""}`}>
                <div className="text-[13px] font-semibold text-ink-50 min-w-[100px]">{s.name}</div>
                <div className="text-[12px] text-ink-300 flex-1">{s.role}</div>
                <div className="text-[11px] text-ink-400">{s.audience}</div>
              </div>
            ))}
          </div>
        )}
        {d.pros && (
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-mint-500/20 bg-mint-500/5 p-3">
              <div className="text-[10.5px] uppercase tracking-wider text-mint-500 font-semibold mb-1">Pro</div>
              <ul className="space-y-1 text-[12.5px] text-ink-200">{d.pros.map((p: string) => <li key={p}>· {p}</li>)}</ul>
            </div>
            <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-3">
              <div className="text-[10.5px] uppercase tracking-wider text-rose-500 font-semibold mb-1">Con</div>
              <ul className="space-y-1 text-[12.5px] text-ink-200">{d.cons.map((p: string) => <li key={p}>· {p}</li>)}</ul>
            </div>
          </div>
        )}
        {d.mechanic && (
          <div className="rounded-xl border border-flame-500/20 bg-flame-500/5 p-3">
            <div className="text-[10.5px] uppercase tracking-wider text-flame-300 font-semibold mb-1">Mechanic</div>
            <p className="text-[12.5px] text-ink-200 leading-[1.5]">{d.mechanic}</p>
          </div>
        )}
        {d.blockers && (
          <div>
            <div className="text-[10.5px] uppercase tracking-wider text-ink-400 font-semibold mb-1">Blockers</div>
            <ul className="space-y-1 text-[12.5px] text-ink-200">{d.blockers.map((p: string) => <li key={p}>· {p}</li>)}</ul>
          </div>
        )}
        {d.ask && (
          <div className="rounded-xl border border-flame-500/40 bg-flame-500/10 px-3 py-2.5">
            <div className="text-[10.5px] uppercase tracking-wider text-flame-300 font-semibold">Ask</div>
            <div className="text-[13px] text-ink-50 mt-0.5">{d.ask}</div>
          </div>
        )}
      </div>
      <div className="px-6 pb-6">
        <div className="text-[11px] uppercase tracking-wider text-ink-400 font-semibold mb-1.5">Why</div>
        <p className="text-[13px] text-ink-200 leading-[1.55]">{card.rationale}</p>
      </div>
    </div>
  );
}
