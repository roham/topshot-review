"use client";
import type { QuestionCard, DecisionMaker } from "@/lib/openQuestions";

const DM_COLOR: Record<DecisionMaker, string> = {
  Roham: "border-flame-500/50 bg-flame-500/10 text-flame-300",
  Dan: "border-sky-500/50 bg-sky-500/10 text-sky-300",
  Matt: "border-mint-500/50 bg-mint-500/10 text-mint-300",
  Sam: "border-violet-500/50 bg-violet-500/10 text-violet-300",
  "Guy+Sam": "border-pink-500/50 bg-pink-500/10 text-pink-300",
  Kenny: "border-amber-500/50 bg-amber-500/10 text-amber-300",
  Engineering: "border-rose-500/50 bg-rose-500/10 text-rose-300",
  "Cross-product": "border-ink-400/50 bg-ink-400/10 text-ink-300",
};

const DM_DOT: Record<DecisionMaker, string> = {
  Roham: "bg-flame-400",
  Dan: "bg-sky-400",
  Matt: "bg-mint-400",
  Sam: "bg-violet-400",
  "Guy+Sam": "bg-pink-400",
  Kenny: "bg-amber-400",
  Engineering: "bg-rose-400",
  "Cross-product": "bg-ink-400",
};

export function OpenQuestionCard({ card }: { card: QuestionCard }) {
  return (
    <article className="w-full max-w-[640px] mx-auto bg-ink-900/95 border border-white/10 rounded-3xl shadow-card overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-white/5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-500">
            {card.id}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10.5px] font-semibold tracking-wider uppercase ${DM_COLOR[card.decisionMaker]}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${DM_DOT[card.decisionMaker]}`} />
            {card.decisionMaker}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-ink-500 border border-white/10 rounded-full px-2 py-0.5">
            {card.status}
          </span>
        </div>
        <h2 className="mt-3 font-display text-xl font-semibold tracking-tight text-ink-50 leading-snug text-balance">
          {card.title}
        </h2>
      </div>

      {/* The question */}
      <div className="px-5 py-4 border-b border-white/5">
        <div className="text-[9.5px] uppercase tracking-wider text-flame-400 font-semibold mb-2">
          The question
        </div>
        <p className="text-[14px] text-ink-100 leading-[1.55] text-pretty">{card.question}</p>
      </div>

      {/* Context */}
      <div className="px-5 py-4 border-b border-white/5">
        <div className="text-[9.5px] uppercase tracking-wider text-sky-400 font-semibold mb-2">
          Context
        </div>
        <p className="text-[13px] text-ink-200 leading-[1.55] text-pretty">{card.context}</p>
      </div>

      {/* Consequences */}
      <div className="px-5 py-4 border-b border-white/5 space-y-3">
        <div className="text-[9.5px] uppercase tracking-wider text-amber-400 font-semibold">
          Consequence tree
        </div>
        <div className="rounded-xl border border-mint-500/20 bg-mint-500/[0.04] px-3 py-2.5">
          <div className="text-[10px] uppercase tracking-wider text-mint-400 font-semibold mb-1">If yes</div>
          <p className="text-[12.5px] text-ink-200 leading-[1.5]">{card.consequenceOfYes}</p>
        </div>
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/[0.04] px-3 py-2.5">
          <div className="text-[10px] uppercase tracking-wider text-rose-400 font-semibold mb-1">If no</div>
          <p className="text-[12.5px] text-ink-200 leading-[1.5]">{card.consequenceOfNo}</p>
        </div>
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.04] px-3 py-2.5">
          <div className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold mb-1">If deferred</div>
          <p className="text-[12.5px] text-ink-200 leading-[1.5]">{card.consequenceOfDelay}</p>
        </div>
      </div>

      {/* Linked artifact + vote shape */}
      <div className="px-5 py-4">
        <div className="flex items-start gap-3 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="text-[9.5px] uppercase tracking-wider text-ink-500 font-semibold mb-1">
              Linked artifact
            </div>
            <div className="text-[12.5px] text-ink-300">{card.linkedArtifactLabel}</div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[9.5px] uppercase tracking-wider text-ink-500 font-semibold mb-1">
              Vote shape
            </div>
            <div className="text-[11.5px] text-ink-300 font-mono">{card.voteShape}</div>
          </div>
        </div>
      </div>
    </article>
  );
}
