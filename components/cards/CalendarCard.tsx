import type { Card } from "@/lib/cards";

const surfaceColor: Record<string, string> = {
  "X / Discord": "from-flame-500/20 to-flame-500/5 border-flame-500/30 text-flame-300",
  Internal: "from-ink-700/40 to-ink-800/20 border-ink-600/40 text-ink-300",
  CIO: "from-blue-500/15 to-blue-500/5 border-blue-500/30 text-blue-300",
  X: "from-flame-500/20 to-flame-500/5 border-flame-500/30 text-flame-300",
  PR: "from-amber-500/15 to-amber-500/5 border-amber-500/30 text-amber-300",
  "1:1": "from-mint-500/15 to-mint-500/5 border-mint-500/30 text-mint-500",
  Discord: "from-purple-500/15 to-purple-500/5 border-purple-500/30 text-purple-300",
  "CIO + X": "from-blue-500/15 to-flame-500/5 border-blue-500/30 text-blue-300",
};

export function CalendarCard({ card }: { card: Card }) {
  const d = card.data as {
    week: { date: string; day: string; items: { time: string; surface: string; title: string }[] }[];
  };

  return (
    <div className="mx-auto max-w-[460px] rounded-3xl bg-ink-900/95 border border-white/10 overflow-hidden shadow-card">
      <div className="px-5 pt-5 pb-3 border-b border-white/5">
        <div className="text-[10px] uppercase tracking-[0.2em] text-flame-400 font-semibold">May 4 – 10 · Round 2 Reactivation</div>
        <h3 className="mt-1 text-[19px] font-display font-semibold tracking-tight text-ink-50">7 days. Three legs in motion.</h3>
      </div>
      <div className="px-3 py-2 max-h-[440px] overflow-y-auto scrollbar-none">
        {d.week.map((day) => (
          <div key={day.date} className="px-2 py-2 border-b border-white/5 last:border-0">
            <div className="flex items-baseline gap-2 mb-1.5">
              <span className="text-[11px] uppercase tracking-wider text-ink-400 font-semibold">{day.day}</span>
              <span className="text-[12px] text-ink-300 font-mono">{day.date}</span>
            </div>
            <div className="space-y-1.5">
              {day.items.map((it, i) => {
                const cls = surfaceColor[it.surface] ?? "from-ink-700/40 to-ink-800/20 border-ink-600/40 text-ink-300";
                return (
                  <div key={i} className={`flex items-stretch gap-2 rounded-xl border bg-gradient-to-r ${cls} px-2.5 py-2`}>
                    <div className="flex flex-col items-center justify-center min-w-[58px]">
                      <span className="text-[10.5px] font-mono uppercase opacity-70">{it.surface}</span>
                      <span className="text-[11px] font-mono opacity-90 mt-0.5">{it.time}</span>
                    </div>
                    <div className="w-px bg-white/10" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[13.5px] text-ink-50 font-medium leading-snug">{it.title}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
