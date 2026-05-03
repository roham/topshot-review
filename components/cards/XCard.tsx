import type { Card } from "@/lib/cards";

export function XCard({ card }: { card: Card }) {
  const d = card.data as { tweets: string[] };

  return (
    <div className="x-frame mx-auto max-w-[440px] rounded-[24px] bg-black border border-white/10 overflow-hidden shadow-card">
      <div className="px-4 py-3 flex items-center gap-3 border-b border-white/10">
        <div className="text-white/90 text-[18px] font-bold">𝕏</div>
        <span className="text-[13px] text-white/60">Thread · @nbatopshot</span>
      </div>
      <div className="divide-y divide-white/10">
        {d.tweets.map((t, i) => (
          <div key={i} className="px-4 py-3.5">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-flame-400 to-flame-600 grid place-items-center text-white text-sm font-bold flex-shrink-0">TS</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-1">
                  <span className="font-bold text-white text-[14.5px]">NBA Top Shot</span>
                  <span className="text-blue-400 text-[13px]">✓</span>
                  <span className="text-white/55 text-[13px]">@nbatopshot · {i === 0 ? "now" : `${i}m`}</span>
                </div>
                {t === "[Chart]" ? (
                  <div className="mt-2 rounded-2xl border border-white/15 overflow-hidden">
                    <div className="bg-gradient-to-br from-ink-800 to-ink-950 px-4 py-5">
                      <div className="text-[11px] uppercase tracking-widest text-flame-400 font-semibold mb-2">Pre-G7 market reading · May 1</div>
                      <div className="space-y-2">
                        {[
                          { p: "Cade", c: "$1,110", w: 100, color: "bg-flame-500" },
                          { p: "Banchero", c: "$130", w: 12, color: "bg-amber-500" },
                          { p: "Mitchell", c: "$61", w: 6, color: "bg-mint-500" },
                          { p: "Barrett", c: "$23", w: 2, color: "bg-rose-500" },
                        ].map((r) => (
                          <div key={r.p} className="flex items-center gap-3 text-[12.5px]">
                            <div className="w-20 text-white/85 font-medium">{r.p}</div>
                            <div className="flex-1 bg-white/5 rounded h-2 overflow-hidden"><div className={`${r.color} h-full`} style={{ width: `${r.w}%` }} /></div>
                            <div className="w-14 text-right text-white/70 font-mono text-[12px]">{r.c}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="mt-1 text-[14.5px] text-white whitespace-pre-line leading-[1.4]">{t}</p>
                )}
                <div className="mt-3 flex items-center justify-between text-white/50 text-[12px] max-w-[320px]">
                  <span>💬 —</span>
                  <span>↻ —</span>
                  <span>♡ —</span>
                  <span>📊 —</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
