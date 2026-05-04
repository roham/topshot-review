"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ExemplarCard, VoiceModeName } from "@/lib/exemplars";
import { EXEMPLARS } from "@/lib/exemplars";
import { ExemplarCard as ExemplarCardView } from "./ExemplarCard";
import { REASONS } from "@/lib/cards";

type Vote = "ship" | "no" | "needs-work";

const MODE_DOT: Record<VoiceModeName, string> = {
  transactional: "bg-mint-400",
  chronicler: "bg-flame-400",
  "drop-anticipation": "bg-rose-400",
  reactivation: "bg-sky-400",
  concierge: "bg-violet-400",
};

const MODE_LABEL: Record<VoiceModeName, string> = {
  transactional: "Transactional",
  chronicler: "Chronicler",
  "drop-anticipation": "Drop Anticipation",
  reactivation: "Reactivation",
  concierge: "Concierge",
};

export function ExemplarDeck({ voter, onBack }: { voter: string; onBack: () => void }) {
  const total = EXEMPLARS.length;
  const [stepIndex, setStepIndex] = useState(0);
  const [showReasons, setShowReasons] = useState<{ vote: Vote } | null>(null);
  const [shipped, setShipped] = useState(0);
  const [killed, setKilled] = useState(0);
  const [needsWork, setNeedsWork] = useState(0);

  const card: ExemplarCard | undefined = EXEMPLARS[stepIndex];

  useEffect(() => {
    const el = document.getElementById("exemplar-scroll");
    if (el) el.scrollTop = 0;
  }, [stepIndex]);

  const submit = async (vote: Vote, note?: string, reasons?: string[]) => {
    if (!card) return;
    fetch("/api/feedback", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        piece_id: card.id,
        variant: card.voiceMode,
        vote,
        note,
        reasons,
        voter,
      }),
    }).catch(() => {});
    if (vote === "ship") setShipped((n) => n + 1);
    else if (vote === "no") setKilled((n) => n + 1);
    else setNeedsWork((n) => n + 1);
    setStepIndex((i) => i + 1);
  };

  if (!card) {
    return (
      <ExemplarDone
        shipped={shipped}
        killed={killed}
        needsWork={needsWork}
        total={total}
        voter={voter}
        onBack={onBack}
      />
    );
  }

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex flex-col gap-1.5 px-4 pt-4 pb-3 shrink-0 border-b border-white/5 bg-ink-950/80 backdrop-blur">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="text-[11px] uppercase tracking-wider text-ink-500 font-semibold hover:text-ink-300 transition"
          >
            ← Decks
          </button>
          <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-flame-400 to-flame-600 transition-all duration-500"
              style={{ width: `${(stepIndex / total) * 100}%` }}
            />
          </div>
          <div className="text-[11px] font-mono text-ink-300 tabular-nums">
            {stepIndex + 1}/{total}
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-ink-400">
          <span className="text-flame-300 font-semibold">Exemplars</span>
          <span className="inline-flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full ${MODE_DOT[card.voiceMode]}`} />
            <span className="text-ink-200 font-semibold">{MODE_LABEL[card.voiceMode]}</span>
            {card.caveat && (
              <span className="ml-1 px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[9px] uppercase tracking-wider font-bold">
                caveat
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Scrollable area */}
      <div id="exemplar-scroll" className="flex-1 overflow-y-auto overscroll-contain px-3 py-4 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            <ExemplarCardView card={card} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Action bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 pb-[max(20px,env(safe-area-inset-bottom))] pt-3 bg-gradient-to-t from-ink-950 via-ink-950/95 to-transparent">
        <div className="flex items-center justify-center gap-2 px-4">
          <button
            onClick={() => submit("no")}
            className="h-12 flex-1 max-w-[120px] rounded-2xl bg-rose-500/15 border border-rose-500/40 grid place-items-center hover:bg-rose-500/25 active:scale-95 transition"
            aria-label="Nope"
          >
            <span className="text-rose-300 font-semibold text-[13px] tracking-wide">✕ Nope</span>
          </button>
          <button
            onClick={() => setShowReasons({ vote: "needs-work" })}
            className="h-12 flex-1 max-w-[140px] rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-300 text-[13px] tracking-wide font-semibold hover:bg-amber-500/25 active:scale-95 transition"
          >
            ⏸ Needs work
          </button>
          <button
            onClick={() => submit("ship")}
            className="h-12 flex-1 max-w-[120px] rounded-2xl bg-mint-500/15 border border-mint-500/50 grid place-items-center hover:bg-mint-500/25 active:scale-95 transition"
            aria-label="Ship it"
          >
            <span className="text-mint-300 font-semibold text-[13px] tracking-wide">✓ Keep</span>
          </button>
        </div>
        <div className="mt-1.5 text-center text-[10.5px] text-ink-400 uppercase tracking-wider">
          Exemplar {stepIndex + 1} of {total} ·{" "}
          <span className="text-flame-400 font-semibold">{MODE_LABEL[card.voiceMode]}</span>
        </div>
      </div>

      {showReasons && (
        <ExemplarReasonModal
          onClose={() => setShowReasons(null)}
          onSubmit={(note, reasons) => {
            submit(showReasons.vote, note, reasons);
            setShowReasons(null);
          }}
        />
      )}
    </div>
  );
}

function ExemplarReasonModal({
  onSubmit,
  onClose,
}: {
  onSubmit: (note: string, reasons: string[]) => void;
  onClose: () => void;
}) {
  const [picked, setPicked] = useState<string[]>([]);
  const [note, setNote] = useState("");

  return (
    <motion.div
      className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm grid place-items-end sm:place-items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl bg-ink-900 border border-white/10 p-5"
        initial={{ y: 40 }}
        animate={{ y: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold">
          Needs work — what&apos;s off?
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {REASONS.map((r) => {
            const on = picked.includes(r);
            return (
              <button
                key={r}
                onClick={() => setPicked((p) => (on ? p.filter((x) => x !== r) : [...p, r]))}
                className={`text-[12px] px-2.5 py-1.5 rounded-full border transition ${
                  on
                    ? "bg-flame-500/20 border-flame-500/50 text-flame-200"
                    : "bg-white/[0.03] border-white/10 text-ink-300 hover:bg-white/[0.07]"
                }`}
              >
                {r}
              </button>
            );
          })}
        </div>
        <textarea
          className="mt-3 w-full rounded-xl bg-white/[0.04] border border-white/10 px-3 py-2.5 text-[13.5px] text-ink-100 placeholder-ink-500 focus:outline-none focus:border-flame-500/50 resize-none"
          placeholder="Anything specific? Optional."
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={onClose}
            className="flex-1 h-10 rounded-xl border border-white/10 text-ink-300 text-[13px] hover:bg-white/[0.04]"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(note.trim(), picked)}
            className="flex-1 h-10 rounded-xl bg-flame-500 text-white text-[13px] font-semibold hover:bg-flame-600"
          >
            Submit
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ExemplarDone({
  shipped,
  killed,
  needsWork,
  total,
  voter,
  onBack,
}: {
  shipped: number;
  killed: number;
  needsWork: number;
  total: number;
  voter: string;
  onBack: () => void;
}) {
  const pct = total > 0 ? Math.round((shipped / total) * 100) : 0;
  return (
    <div className="min-h-[100dvh] grid place-items-center px-6 py-12">
      <div className="max-w-md w-full text-center">
        <div className="text-[10px] uppercase tracking-[0.2em] text-flame-400 font-semibold">
          {voter}, exemplars done
        </div>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink-50 text-balance">
          Voice anchors reviewed.
        </h2>
        <p className="mt-2 text-[14px] text-ink-300">
          All {total} exemplars across 5 voice modes reviewed.
        </p>
        <div className="mt-8 grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-mint-500/30 bg-mint-500/5 p-4">
            <div className="text-3xl font-display font-bold text-mint-400">{shipped}</div>
            <div className="text-[10.5px] uppercase tracking-wider text-mint-400 mt-1 font-semibold">Keep</div>
          </div>
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4">
            <div className="text-3xl font-display font-bold text-amber-400">{needsWork}</div>
            <div className="text-[10.5px] uppercase tracking-wider text-amber-400 mt-1 font-semibold">Needs work</div>
          </div>
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-4">
            <div className="text-3xl font-display font-bold text-rose-400">{killed}</div>
            <div className="text-[10.5px] uppercase tracking-wider text-rose-400 mt-1 font-semibold">Nope</div>
          </div>
        </div>
        <div className="mt-6 text-[12px] text-ink-400">{pct}% keep rate</div>
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
