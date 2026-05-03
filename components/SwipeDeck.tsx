"use client";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import type { Card } from "@/lib/cards";
import { SEGMENT_REASONS } from "@/lib/cards";
import { CardShell } from "./CardShell";

type Vote = "ship" | "no" | "needs-work";

export function SwipeDeck({ cards, voter }: { cards: Card[]; voter: string }) {
  const [index, setIndex] = useState(0);
  const [showReasons, setShowReasons] = useState<{ vote: Vote; cardId: string } | null>(null);
  const [shipped, setShipped] = useState(0);
  const [killed, setKilled] = useState(0);
  const [needsWork, setNeedsWork] = useState(0);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-12, 0, 12]);
  const yesOpacity = useTransform(x, [0, 80, 200], [0, 0.7, 1]);
  const noOpacity = useTransform(x, [0, -80, -200], [0, 0.7, 1]);

  const card = cards[index];
  const next = cards[index + 1];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const submit = async (vote: Vote, note?: string, reasons?: string[]) => {
    if (!card) return;
    fetch("/api/feedback", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ piece_id: card.id, vote, note, reasons, voter }),
    }).catch(() => {});
    if (vote === "ship") setShipped((n) => n + 1);
    else if (vote === "no") setKilled((n) => n + 1);
    else setNeedsWork((n) => n + 1);
    setIndex((i) => i + 1);
    x.set(0);
  };

  const handleDragEnd = (_: any, info: { offset: { x: number; y: number } }) => {
    if (info.offset.x > 140) submit("ship");
    else if (info.offset.x < -140) submit("no");
    else if (info.offset.y < -140) setShowReasons({ vote: "needs-work", cardId: card.id });
    else x.set(0);
  };

  if (!card) {
    return <Done shipped={shipped} killed={killed} needsWork={needsWork} total={cards.length} voter={voter} />;
  }

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-30 px-4 pt-4 pb-2 flex items-center gap-3">
        <div className="text-[11px] uppercase tracking-wider text-ink-400 font-semibold">{voter}</div>
        <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-flame-400 to-flame-600 transition-all duration-500" style={{ width: `${(index / cards.length) * 100}%` }} />
        </div>
        <div className="text-[11px] font-mono text-ink-300 tabular-nums">{index + 1}/{cards.length}</div>
      </div>

      {/* Stack */}
      <div className="absolute inset-0 grid place-items-center pt-14 pb-32 px-3">
        <div className="relative w-full max-w-[480px] flex items-center justify-center">
          {next && (
            <motion.div
              key={`stack-${next.id}`}
              className="absolute inset-x-0"
              initial={{ scale: 0.94, y: 16, opacity: 0.6 }}
              animate={{ scale: 0.94, y: 16, opacity: 0.6 }}
              style={{ pointerEvents: "none" }}
            >
              <CardShell card={next} />
            </motion.div>
          )}

          <AnimatePresence mode="popLayout">
            <motion.div
              key={card.id}
              className="relative w-full"
              drag
              dragElastic={0.6}
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              onDragEnd={handleDragEnd}
              style={{ x, rotate }}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
            >
              <CardShell card={card} />
              <motion.div className="absolute top-8 left-6 -rotate-12 px-3 py-1.5 rounded-md border-2 border-mint-500 text-mint-500 font-display font-bold text-2xl tracking-tight pointer-events-none" style={{ opacity: yesOpacity }}>
                SHIP IT
              </motion.div>
              <motion.div className="absolute top-8 right-6 rotate-12 px-3 py-1.5 rounded-md border-2 border-rose-500 text-rose-500 font-display font-bold text-2xl tracking-tight pointer-events-none" style={{ opacity: noOpacity }}>
                NOPE
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Action bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 pb-[max(20px,env(safe-area-inset-bottom))] pt-4 bg-gradient-to-t from-ink-950 via-ink-950/90 to-transparent">
        <div className="flex items-center justify-center gap-3 px-4">
          <button onClick={() => submit("no")} className="group h-14 w-14 rounded-full bg-rose-500/15 border border-rose-500/40 grid place-items-center hover:bg-rose-500/25 active:scale-95 transition" aria-label="Nope">
            <span className="text-rose-500 text-2xl group-hover:scale-110 transition">✕</span>
          </button>
          <button onClick={() => setShowReasons({ vote: "needs-work", cardId: card.id })} className="h-12 px-4 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-500 text-[12px] uppercase tracking-wider font-semibold hover:bg-amber-500/25 active:scale-95 transition">
            Needs work
          </button>
          <button onClick={() => submit("ship")} className="group h-14 w-14 rounded-full bg-mint-500/15 border border-mint-500/50 grid place-items-center hover:bg-mint-500/25 active:scale-95 transition" aria-label="Ship it">
            <span className="text-mint-500 text-2xl group-hover:scale-110 transition">✓</span>
          </button>
        </div>
        <div className="mt-2.5 text-center text-[10.5px] text-ink-400 uppercase tracking-wider">
          Swipe · ← Nope · ↑ Needs work · → Ship it
        </div>
      </div>

      {showReasons && (
        <ReasonModal
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

function ReasonModal({ onSubmit, onClose }: { onSubmit: (note: string, reasons: string[]) => void; onClose: () => void }) {
  const [picked, setPicked] = useState<string[]>([]);
  const [note, setNote] = useState("");

  return (
    <motion.div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm grid place-items-end sm:place-items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose}>
      <motion.div className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl bg-ink-900 border border-white/10 p-5" initial={{ y: 40 }} animate={{ y: 0 }} onClick={(e) => e.stopPropagation()}>
        <div className="text-[11px] uppercase tracking-wider text-amber-500 font-semibold">Needs work — what's off?</div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {SEGMENT_REASONS.map((r) => {
            const on = picked.includes(r);
            return (
              <button
                key={r}
                onClick={() => setPicked((p) => (on ? p.filter((x) => x !== r) : [...p, r]))}
                className={`text-[12px] px-2.5 py-1.5 rounded-full border transition ${on ? "bg-flame-500/20 border-flame-500/50 text-flame-200" : "bg-white/[0.03] border-white/10 text-ink-300 hover:bg-white/[0.07]"}`}
              >
                {r}
              </button>
            );
          })}
        </div>
        <textarea
          className="mt-3 w-full rounded-xl bg-white/[0.04] border border-white/10 px-3 py-2.5 text-[13.5px] text-ink-100 placeholder-ink-500 focus:outline-none focus:border-flame-500/50 resize-none"
          placeholder="Anything else? Optional."
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <div className="mt-3 flex items-center gap-2">
          <button onClick={onClose} className="flex-1 h-10 rounded-xl border border-white/10 text-ink-300 text-[13px] hover:bg-white/[0.04]">Cancel</button>
          <button onClick={() => onSubmit(note.trim(), picked)} className="flex-1 h-10 rounded-xl bg-flame-500 text-white text-[13px] font-semibold hover:bg-flame-600">Submit</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Done({ shipped, killed, needsWork, total, voter }: { shipped: number; killed: number; needsWork: number; total: number; voter: string }) {
  const pct = total > 0 ? Math.round((shipped / total) * 100) : 0;
  return (
    <div className="min-h-[100dvh] grid place-items-center px-6 py-12">
      <div className="max-w-md w-full text-center">
        <div className="text-[10px] uppercase tracking-[0.2em] text-flame-400 font-semibold">{voter}, you're done</div>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink-50 text-balance">Thanks. We'll iterate.</h2>
        <p className="mt-2 text-[14px] text-ink-300">All {total} pieces reviewed. Magic reads the feedback and ships the next round.</p>
        <div className="mt-8 grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-mint-500/30 bg-mint-500/5 p-4">
            <div className="text-3xl font-display font-bold text-mint-500">{shipped}</div>
            <div className="text-[10.5px] uppercase tracking-wider text-mint-500 mt-1 font-semibold">Ship it</div>
          </div>
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4">
            <div className="text-3xl font-display font-bold text-amber-500">{needsWork}</div>
            <div className="text-[10.5px] uppercase tracking-wider text-amber-500 mt-1 font-semibold">Needs work</div>
          </div>
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-4">
            <div className="text-3xl font-display font-bold text-rose-500">{killed}</div>
            <div className="text-[10.5px] uppercase tracking-wider text-rose-500 mt-1 font-semibold">Nope</div>
          </div>
        </div>
        <div className="mt-6 text-[12px] text-ink-400">{pct}% ship rate</div>
        <div className="mt-8 flex flex-col gap-2">
          <a href="/calendar" className="h-11 grid place-items-center rounded-xl bg-flame-500 text-white font-semibold text-[14px] hover:bg-flame-600">See the calendar view</a>
          <a href="/" className="h-11 grid place-items-center rounded-xl border border-white/10 text-ink-200 text-[14px] hover:bg-white/[0.04]">Back to start</a>
        </div>
      </div>
    </div>
  );
}
