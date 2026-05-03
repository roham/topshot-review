import type { Card } from "@/lib/cards";

export function EmailCard({ card }: { card: Card }) {
  const d = card.data as {
    from: string;
    subject: string;
    preview: string;
    body: string[];
    table?: { player: string; ceiling: string; trade: string; call: string }[];
    signoff: string;
    ps?: string;
    vars?: string[];
  };

  return (
    <div className="email-frame mx-auto max-w-[440px] rounded-[28px] bg-white shadow-card overflow-hidden">
      {/* phone-style status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1 text-[11px] font-medium text-black/70">
        <span>9:00</span>
        <div className="flex items-center gap-1">
          <span className="block h-2 w-4 rounded-sm bg-black/70" />
          <span className="block h-2 w-2 rounded-sm bg-black/70" />
          <span className="block h-2 w-6 rounded-sm border border-black/70" />
        </div>
      </div>

      {/* mail header */}
      <div className="px-5 pt-2 pb-4 border-b border-black/5">
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-blue-600">Inbox</span>
          <div className="flex items-center gap-3 text-blue-600">
            <span className="text-[18px]">↑</span>
            <span className="text-[18px]">↓</span>
          </div>
        </div>
      </div>

      <div className="px-5 pt-4">
        <h3 className="text-[19px] font-semibold leading-[1.18] text-black tracking-tight text-balance">{d.subject}</h3>
        <div className="mt-3 flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-flame-500 to-flame-700 grid place-items-center text-white text-xs font-semibold">M</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-semibold text-black truncate">{d.from.split("<")[0].trim()}</span>
              <span className="text-[12px] text-black/50">{card.date?.split("·")[1]?.trim() ?? "9:00 AM"}</span>
            </div>
            <div className="text-[12px] text-black/55">to me</div>
          </div>
        </div>
      </div>

      <div className="px-5 pt-4 pb-6 space-y-3 text-[14.5px] leading-[1.55] text-black/85">
        {d.body.map((p, i) =>
          p === "TABLE" && d.table ? (
            <div key={i} className="my-3 rounded-xl overflow-hidden border border-black/10">
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr className="bg-black/[0.03] text-black/70">
                    <th className="text-left px-3 py-2 font-semibold">Player</th>
                    <th className="text-left px-3 py-2 font-semibold">Ceiling</th>
                    <th className="text-left px-3 py-2 font-semibold">Notable trade</th>
                  </tr>
                </thead>
                <tbody>
                  {d.table.map((r, j) => (
                    <tr key={j} className={j % 2 ? "bg-black/[0.02]" : ""}>
                      <td className="px-3 py-2 font-semibold text-black">{r.player}</td>
                      <td className="px-3 py-2 text-black/70">{r.ceiling}</td>
                      <td className="px-3 py-2 text-black/60">{r.trade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p key={i} dangerouslySetInnerHTML={{ __html: highlightTokens(p) }} />
          )
        )}
        <div className="pt-2 whitespace-pre-line text-[14px] text-black/90 font-medium">{d.signoff}</div>
        {d.ps && (
          <p className="pt-2 text-[13.5px] italic text-black/65" dangerouslySetInnerHTML={{ __html: highlightTokens(d.ps) }} />
        )}
      </div>

      {d.vars && (
        <div className="px-5 py-3 bg-flame-50 border-t border-flame-100">
          <div className="text-[10px] uppercase tracking-[0.14em] text-flame-700 font-semibold mb-1">Personalization tokens</div>
          <div className="flex flex-wrap gap-1">
            {d.vars.map((v) => (
              <span key={v} className="text-[10.5px] px-1.5 py-0.5 rounded bg-white text-flame-700 font-mono border border-flame-100">
                {`{{${v}}}`}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function highlightTokens(s: string) {
  return s.replace(/\{\{([A-Z_]+)\}\}/g, '<span class="px-1 py-[1px] rounded bg-flame-100 text-flame-700 font-mono text-[12.5px]">{{$1}}</span>');
}
