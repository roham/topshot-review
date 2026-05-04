"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { QuestionCard, DecisionMaker } from "@/lib/openQuestions";
import { OPEN_QUESTIONS, DECISION_MAKERS } from "@/lib/openQuestions";
import { OpenQuestionCard } from "./OpenQuestionCard";

type Vote = "ship" | "no" | "needs-work";

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

export function OpenQuestionsDeck({ voter, onBack }: { voter: string; onBack: () => void }) {
  const [filterDM, setFilterDM] = useState<DecisionMaker | "All">("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [shipped, setShipped] = useState(0);
  const [killed, setKilled] = useState(0);
  const [needsWork, setNeedsWork] = useState(0);
  const [showNote, setShowNote] = useState<{ vote: Vote } | null>(null);
  const [noteText, setNoteText] = useState("");

  const filteredCards: QuestionCard[] =
    filterDM === "All"
      ? OPEN_QUESTIONS
      : OPEN_QUESTIONS.filter((q) => q.decisionMaker === filterDM);

  const total = filteredCards.length;
  const card: QuestionCard | undefined = filteredCards[stepIndex];

  useEffect(() => {
    setStepIndex(0);
    setShipped(0);
    setKilled(0);
    setNeedsWork(0);
  }, [filterDM]);

  useEffect(() => {
    const el = document.getElementById("questions-scroll");
    if (el) el.scrollTop = 0;
  }, [stepIndex]);

  const submit = async (vote: Vote, note?: string) => {
    if (!card) return;
    fetch("/api/feedback", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        piece_id: card.id,
        variant: card.decisionMaker,
        vote,
        note,
        voter,
      }),
    }).catch(() => {});
    if (vote === "ship") setShipped((n) => n + 1);
    else if (vote === "no") setKilled((n) => n + 1);
    else setNeedsWork((n) => n + 1);
    setStepIndex((i) => i + 1);
  };

  if (!card && total > 0) {
    return (
      <QuestionsDone
        shipped={shipped}
        killed={killed}
        needsWork={needsWork}
        total={total}
        voter={voter}
        onBack={onBack}
        filterDM={filterDM}
      />
    );
  }

  if (total === 0) {
    return (
      <div className="min-h-[100dvh] grid place-items-center px-6 py-12 text-center">
        <div>
          <p className="text-ink-400 text-[14px]">No questions for this filter.</p>
          <button onClick={onBack} className="mt-6 h-10 px-5 rounded-xl bg-flame-500 text-white text-[13px] font-semibold hover:bg-flame-600">
            ← Back to decks
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex flex-col gap-1.5 px-4 pt-4 pb-3 shrink-0 border-b border-white/5 bg-ink-950/80 backdrop-blur">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="text-[11px] uppercase tracking-wider text-ink-500 font-semibold hover:text-ink-300 transition shrink-0"
          >
            ← Decks
          </button>
          <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-flame-400 to-flame-600 transition-all duration-500"
              style={{ width: `${(stepIndex / total) * 100}%` }}
            />
          </div>
          <div className="text-[11px] font-mono text-ink-300 tabular-nums shrink-0">
            {stepIndex + 1}/{total}
          </div>
        </div>

        {/* Filter row */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider text-ink-500 font-semibold shrink-0">Filter:</span>
          <div className="relative">
            <button
              onClick={() => setFilterOpen((o) => !o)}
              className="inline-flex items-center gap-1.5 h-7 px-3 rounded-full border border-white/10 bg-white/[0.04] text-[11px] text-ink-200 hover:bg-white/[0.07] transition"
            >
              {filterDM !== "All" && (
                <span className={`h-1.5 w-1.5 rounded-full ${DM_DOT[filterDM as DecisionMaker]}`} />
              )}
              {filterDM}
              <span className="text-ink-500 text-[9px]">▾</span>
            </button>
            {filterOpen && (
              <div className="absolute top-8 left-0 z-50 min-w-[140px] rounded-xl bg-ink-900 border border-white/10 shadow-xl overflow-hidden">
                {(["All", ...DECISION_MAKERS] as (DecisionMaker | "All")[]).map((dm) => (
                  <button
                    key={dm}
                    onClick={() => { setFilterDM(dm); setFilterOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-[12px] flex items-center gap-2 hover:bg-white/[0.05] transition ${
                      filterDM === dm ? "text-flame-300 bg-flame-500/10" : "text-ink-300"
                    }`}
                  >
                    {dm !== "All" && (
                      <span className={`h-1.5 w-1.5 rounded-full ${DM_DOT[dm as DecisionMaker]}`} />
                    )}
                    {dm}
                  </button>
                ))}
              </div>
            )}
          </div>
          {card && (
            <span className="text-[10px] uppercase tracking-wider text-ink-400 ml-auto">
              {card.id}
            </span>
          )}
        </div>
      </div>

      {/* Scrollable area */}
      <div id="questions-scroll" className="flex-1 overflow-y-auto overscroll-contain px-3 py-4 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={card?.id ?? "done"}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            {card && <OpenQuestionCard card={card} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Action bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 pb-[max(20px,env(safe-area-inset-bottom))] pt-3 bg-gradient-to-t from-ink-950 via-ink-950/95 to-transparent">
        <div className="flex items-center justify-center gap-2 px-4">
          <button
            onClick={() => submit("no")}
            className="h-12 flex-1 max-w-[120px] rounded-2xl bg-rose-500/15 border border-rose-500/40 grid place-items-center hover:bg-rose-500/25 active:scale-95 transition"
            aria-label="Block"
          >
            <span className="text-rose-300 font-semibold text-[13px] tracking-wide">✕ Block</span>
          </button>
          <button
            onClick={() => setShowNote({ vote: "needs-work" })}
            className="h-12 flex-1 max-w-[140px] rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-300 text-[13px] tracking-wide font-semibold hover:bg-amber-500/25 active:scale-95 transition"
          >
            ⏸ Discuss
          </button>
          <button
            onClick={() => submit("ship")}
            className="h-12 flex-1 max-w-[120px] rounded-2xl bg-mint-500/15 border border-mint-500/50 grid place-items-center hover:bg-mint-500/25 active:scale-95 transition"
            aria-label="Unblock"
          >
            <span className="text-mint-300 font-semibold text-[13px] tracking-wide">✓ Unblock</span>
          </button>
        </div>
        <div className="mt-1.5 text-center text-[10.5px] text-ink-400 uppercase tracking-wider">
          {card ? (
            <>
              Decision for{" "}
              <span className="text-flame-400 font-semibold">{card.decisionMaker}</span> ·{" "}
              {stepIndex + 1} of {total}
            </>
          ) : null}
        </div>
      </div>

      {/* Note modal */}
      {showNote && (
        <motion.div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm grid place-items-end sm:place-items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowNote(null)}
        >
          <motion.div
            className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl bg-ink-900 border border-white/10 p-5"
            initial={{ y: 40 }}
            animate={{ y: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold">
              Discuss — add context
            </div>
            <textarea
              className="mt-3 w-full rounded-xl bg-white/[0.04] border border-white/10 px-3 py-2.5 text-[13.5px] text-ink-100 placeholder-ink-500 focus:outline-none focus:border-flame-500/50 resize-none"
              placeholder="What needs discussion? Optional."
              rows={4}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              autoFocus
            />
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => setShowNote(null)}
                className="flex-1 h-10 rounded-xl border border-white/10 text-ink-300 text-[13px] hover:bg-white/[0.04]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  submit(showNote.vote, noteText.trim() || undefined);
                  setNoteText("");
                  setShowNote(null);
                }}
                className="flex-1 h-10 rounded-xl bg-flame-500 text-white text-[13px] font-semibold hover:bg-flame-600"
              >
                Submit
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

function QuestionsDone({
  shipped,
  killed,
  needsWork,
  total,
  voter,
  onBack,
  filterDM,
}: {
  shipped: number;
  killed: number;
  needsWork: number;
  total: number;
  voter: string;
  onBack: () => void;
  filterDM: DecisionMaker | "All";
}) {
  const pct = total > 0 ? Math.round((shipped / total) * 100) : 0;
  return (
    <div className="min-h-[100dvh] grid place-items-center px-6 py-12">
      <div className="max-w-md w-full text-center">
        <div className="text-[10px] uppercase tracking-[0.2em] text-flame-400 font-semibold">
          {voter}, questions done
        </div>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink-50 text-balance">
          {filterDM === "All" ? "All 26 questions reviewed." : `${filterDM} questions reviewed.`}
        </h2>
        <p className="mt-2 text-[14px] text-ink-300">
          {total} questions reviewed.
        </p>
        <div className="mt-8 grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-mint-500/30 bg-mint-500/5 p-4">
            <div className="text-3xl font-display font-bold text-mint-400">{shipped}</div>
            <div className="text-[10.5px] uppercase tracking-wider text-mint-400 mt-1 font-semibold">Unblocked</div>
          </div>
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4">
            <div className="text-3xl font-display font-bold text-amber-400">{needsWork}</div>
            <div className="text-[10.5px] uppercase tracking-wider text-amber-400 mt-1 font-semibold">Discuss</div>
          </div>
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-4">
            <div className="text-3xl font-display font-bold text-rose-400">{killed}</div>
            <div className="text-[10.5px] uppercase tracking-wider text-rose-400 mt-1 font-semibold">Blocked</div>
          </div>
        </div>
        <div className="mt-6 text-[12px] text-ink-400">{pct}% unblock rate</div>
        <div className="mt-8">
          <button
            onClick={onBack}
            className="h-11 inline-flex items-center justify-center px-6 rounded-xl bg-flame-500 text-white font-semibold text-[14px] hover:bg-flame-600"
          >
            ← Back to decks
          </button>
        </div>
      </div>
    </div>
  );
}
