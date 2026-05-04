"use client";
import type { ExemplarCard as TExemplarCard, VoiceModeName } from "@/lib/exemplars";

const MODE_LABEL: Record<VoiceModeName, string> = {
  transactional: "Transactional",
  chronicler: "Chronicler",
  "drop-anticipation": "Drop Anticipation",
  reactivation: "Reactivation",
  concierge: "Concierge",
};

const MODE_COLOR: Record<VoiceModeName, string> = {
  transactional: "border-mint-500/50 bg-mint-500/10 text-mint-300",
  chronicler: "border-flame-500/50 bg-flame-500/10 text-flame-300",
  "drop-anticipation": "border-rose-500/50 bg-rose-500/10 text-rose-300",
  reactivation: "border-sky-500/50 bg-sky-500/10 text-sky-300",
  concierge: "border-violet-500/50 bg-violet-500/10 text-violet-300",
};

const MODE_DOT: Record<VoiceModeName, string> = {
  transactional: "bg-mint-400",
  chronicler: "bg-flame-400",
  "drop-anticipation": "bg-rose-400",
  reactivation: "bg-sky-400",
  concierge: "bg-violet-400",
};

export function ExemplarCard({ card }: { card: TExemplarCard }) {
  return (
    <article className="w-full max-w-[640px] mx-auto bg-ink-900/95 border border-white/10 rounded-3xl shadow-card overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-white/5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-500">
            Exemplar {card.position} of 14
          </span>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10.5px] font-semibold tracking-wider uppercase ${MODE_COLOR[card.voiceMode]}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${MODE_DOT[card.voiceMode]}`} />
            {MODE_LABEL[card.voiceMode]}
          </span>
        </div>

        {/* Caveat banner */}
        {card.caveat && (
          <div className="mt-3 rounded-xl border border-amber-500/40 bg-amber-500/10 px-3 py-2.5">
            <div className="text-[10px] uppercase tracking-wider text-amber-400 font-bold mb-1">
              Caveat — read before voting
            </div>
            <p className="text-[12px] text-amber-200 leading-snug">{card.caveat}</p>
          </div>
        )}
      </div>

      {/* Source */}
      <div className="px-5 py-3 border-b border-white/5 bg-white/[0.015]">
        <div className="text-[9.5px] uppercase tracking-wider text-ink-500 font-semibold mb-0.5">Source</div>
        <div className="text-[11px] text-ink-400 font-mono break-words">{card.source}</div>
      </div>

      {/* Email preview */}
      <div className="px-5 py-4 border-b border-white/5 space-y-3">
        <div className="text-[9.5px] uppercase tracking-wider text-mint-400 font-semibold mb-2">Email preview</div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-ink-500 font-semibold mb-0.5">Subject</div>
          <div className="text-[15px] font-semibold text-ink-50 leading-snug text-balance">{card.subject}</div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-ink-500 font-semibold mb-0.5">Preheader</div>
          <div className="text-[12.5px] text-ink-300 italic leading-snug">{card.preheader}</div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-ink-500 font-semibold mb-1">Body</div>
          <div className="space-y-2 bg-white/[0.025] rounded-xl px-3 py-2.5 border border-white/[0.07]">
            {card.body.map((p, i) => (
              <p key={i} className="text-[13px] text-ink-100 leading-[1.55] whitespace-pre-line text-pretty">
                {p}
              </p>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-ink-500 font-semibold mb-0.5">CTA</div>
          <div className="inline-flex items-center rounded-lg bg-[#E9461B]/90 px-4 py-2 text-white text-[13px] font-bold">
            {card.cta} →
          </div>
        </div>
      </div>

      {/* Voice rationale */}
      <div className="px-5 py-4 border-b border-white/5">
        <div className="text-[9.5px] uppercase tracking-wider text-flame-400 font-semibold mb-2">
          Why this is exemplary
        </div>
        <p className="text-[13px] text-ink-200 leading-[1.55] text-pretty">{card.voiceRationale}</p>
      </div>

      {/* Banned audit */}
      <div className="px-5 py-4">
        <div className="text-[9.5px] uppercase tracking-wider text-sky-400 font-semibold mb-2">
          Banned-word audit
        </div>
        <p className="text-[12px] text-ink-300 leading-[1.55] font-mono">{card.bannedAudit}</p>
      </div>
    </article>
  );
}
