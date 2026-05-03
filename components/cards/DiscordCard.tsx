import type { Card } from "@/lib/cards";

export function DiscordCard({ card }: { card: Card }) {
  const d = card.data as { author: string; role: string; body: string[] };

  return (
    <div className="discord-frame mx-auto max-w-[460px] rounded-[14px] bg-[#313338] overflow-hidden shadow-card border border-white/5">
      <div className="px-4 py-2.5 border-b border-black/30 bg-[#2b2d31] flex items-center gap-2">
        <span className="text-white/60 text-lg font-bold">#</span>
        <span className="text-white text-[14px] font-semibold">general</span>
        <span className="text-white/40 text-[12px] mx-1">·</span>
        <span className="text-white/40 text-[11.5px]">📌 pinned</span>
      </div>
      <div className="px-4 pt-4 pb-5">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-flame-400 to-flame-600 grid place-items-center text-white text-sm font-bold flex-shrink-0">TS</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-flame-400 font-semibold text-[15px]">{d.author}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-flame-500/15 text-flame-400 font-semibold uppercase tracking-wide">{d.role}</span>
              <span className="text-white/40 text-[11.5px]">Today at 9:02 PM</span>
            </div>
            <div className="mt-1 space-y-0.5 text-[14.5px] text-white/90 leading-[1.45]">
              {d.body.map((line, i) => {
                if (line === "") return <div key={i} className="h-2" />;
                const html = line
                  .replace(/^\*\*(.+?)\*\*/, '<span class="font-bold text-white">$1</span>')
                  .replace(/\*(.+?)\*/g, '<span class="italic text-white/80">$1</span>')
                  .replace(/@([a-z_]+)/g, '<span class="bg-flame-500/20 text-flame-300 rounded px-1 py-[1px]">@$1</span>')
                  .replace(/<(https?:[^>]+)>/g, '<a class="text-blue-400 underline">$1</a>');
                return <p key={i} dangerouslySetInnerHTML={{ __html: html }} />;
              })}
            </div>
            <div className="mt-3 flex items-center gap-2 text-[12px]">
              <button className="px-2 py-0.5 rounded-md bg-white/[0.06] text-white/70 hover:bg-white/10">🔥 12</button>
              <button className="px-2 py-0.5 rounded-md bg-white/[0.06] text-white/70 hover:bg-white/10">🏀 8</button>
              <button className="px-2 py-0.5 rounded-md bg-white/[0.06] text-white/70 hover:bg-white/10">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
