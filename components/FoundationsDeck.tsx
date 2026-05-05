"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { FoundationsCard, FoundationsCategory } from "@/lib/foundations";
import { FOUNDATIONS_CARDS } from "@/lib/foundations";

type Vote = "ship" | "no" | "needs-work";

const CATEGORY_DOT: Record<FoundationsCategory, string> = {
  canonical: "bg-flame-400",
  stage: "bg-sky-400",
  audit: "bg-ink-500",
};

const CATEGORY_LABEL: Record<FoundationsCategory, string> = {
  canonical: "Canonical",
  stage: "Stage",
  audit: "Audit",
};

export function FoundationsDeck({
  voter,
  onBack,
}: {
  voter: string;
  onBack: () => void;
}) {
  const [filterCat, setFilterCat] = useState<FoundationsCategory | "All">("All");
  const [stepIndex, setStepIndex] = useState(0);
  const [shipped, setShipped] = useState(0);
  const [killed, setKilled] = useState(0);
  const [needsWork, setNeedsWork] = useState(0);
  const [showNote, setShowNote] = useState<{ vote: Vote } | null>(null);
  const [noteText, setNoteText] = useState("");

  const filteredCards: FoundationsCard[] =
    filterCat === "All"
      ? FOUNDATIONS_CARDS
      : FOUNDATIONS_CARDS.filter((c) => c.category === filterCat);

  const total = filteredCards.length;
  const card: FoundationsCard | undefined = filteredCards[stepIndex];

  useEffect(() => {
    setStepIndex(0);
    setShipped(0);
    setKilled(0);
    setNeedsWork(0);
  }, [filterCat]);

  useEffect(() => {
    const el = document.getElementById("foundations-scroll");
    if (el) el.scrollTop = 0;
  }, [stepIndex]);

  const submit = async (vote: Vote, note?: string) => {
    if (!card) return;
    fetch("/api/feedback", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        piece_id: card.id,
        variant: card.category,
        vote,
        note,
        voter,
      }),
    }).catch(() => {});
    if (vote === "ship") setShipped((n) => n + 1);
    else if (vote === "no") setKilled((n) => n + 1);
    else setNeedsWork((n) => n + 1);
    setStepIndex((i) => i + 1);
    setShowNote(null);
    setNoteText("");
  };

  if (!card && total > 0) {
    return (
      <FoundationsDone
        shipped={shipped}
        killed={killed}
        needsWork={needsWork}
        total={total}
        voter={voter}
        onBack={onBack}
      />
    );
  }

  if (total === 0) {
    return (
      <div className="min-h-[100dvh] grid place-items-center px-6 py-12 text-center">
        <div>
          <p className="text-ink-400 text-[14px]">No cards for this filter.</p>
          <button
            onClick={onBack}
            className="mt-6 h-10 px-5 rounded-xl bg-flame-500 text-white text-[13px] font-semibold hover:bg-flame-600"
          >
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
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] uppercase tracking-wider text-ink-500 font-mono">
            Filter:
          </span>
          {(["All", "canonical", "stage", "audit"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat as typeof filterCat)}
              className={
                "h-6 px-2 rounded-md text-[10px] uppercase tracking-wider font-semibold transition " +
                (filterCat === cat
                  ? "bg-flame-500 text-white"
                  : "bg-white/[0.04] text-ink-300 hover:bg-white/[0.08]")
              }
            >
              {cat === "All" ? "All" : CATEGORY_LABEL[cat as FoundationsCategory]}
            </button>
          ))}
        </div>
      </div>

      {/* Card body */}
      <div
        id="foundations-scroll"
        className="flex-1 overflow-y-auto px-4 py-5"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="max-w-lg mx-auto w-full"
          >
            {/* Badge row */}
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={
                  "inline-flex items-center gap-1.5 h-6 px-2.5 rounded-md text-[10px] uppercase tracking-wider font-semibold " +
                  (card.category === "canonical"
                    ? "bg-flame-500/15 text-flame-300"
                    : card.category === "stage"
                    ? "bg-sky-500/15 text-sky-300"
                    : "bg-ink-700/40 text-ink-400")
                }
              >
                <span className={`h-1.5 w-1.5 rounded-full ${CATEGORY_DOT[card.category]}`} />
                {card.badge}
              </span>
              <span className="text-[10px] font-mono text-ink-500">
                {card.wordCount.toLocaleString()} words
              </span>
            </div>

            {/* Title */}
            <h2 className="mt-3 font-display text-[22px] md:text-[26px] font-semibold tracking-tight text-ink-50 leading-tight">
              {card.title}
            </h2>

            {/* Hook */}
            <p className="mt-3 text-[14.5px] text-ink-200 leading-relaxed">
              {card.hook}
            </p>

            {/* Stats strip */}
            {card.stats && card.stats.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-2">
                {card.stats.map((s) => (
                  <div
                    key={s.label}
                    className="bg-white/[0.03] border border-white/5 rounded-md px-2.5 py-2 text-center"
                  >
                    <div className="text-[18px] font-display font-semibold text-ink-50">
                      {s.value}
                    </div>
                    <div className="text-[9px] uppercase tracking-wider text-ink-500 font-mono mt-0.5">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Key findings */}
            <div className="mt-5">
              <div className="text-[10px] uppercase tracking-[0.18em] text-ink-500 font-semibold mb-2">
                Key findings
              </div>
              <ul className="space-y-2">
                {card.keyFindings.map((f, i) => (
                  <li
                    key={i}
                    className="text-[13px] text-ink-200 leading-relaxed pl-3 relative before:content-['→'] before:absolute before:left-0 before:top-0 before:text-ink-500"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviewer ask */}
            <div className="mt-5 px-4 py-3 rounded-md border border-flame-500/30 bg-flame-500/[0.04]">
              <div className="text-[10px] uppercase tracking-[0.18em] text-flame-300 font-semibold mb-1">
                Vote tells me
              </div>
              <p className="text-[13px] text-ink-200 leading-relaxed">
                {card.reviewerAsk}
              </p>
            </div>

            {/* Full read link */}
            <a
              href={card.fullReadHref}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 h-9 px-4 rounded-md bg-white/[0.04] border border-white/10 text-ink-200 text-[12.5px] font-semibold hover:bg-white/[0.08] transition"
            >
              Open full doc on collect-hq ↗
            </a>

            <div className="mt-3 text-[10px] font-mono text-ink-600">
              {card.id}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Vote buttons */}
      <div className="shrink-0 px-4 py-3 border-t border-white/5 bg-ink-950/95 backdrop-blur">
        <div className="max-w-lg mx-auto w-full flex gap-2">
          <button
            onClick={() => submit("no")}
            className="flex-1 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 font-semibold text-[13px] hover:bg-rose-500/20 transition"
          >
            No
          </button>
          <button
            onClick={() => setShowNote({ vote: "needs-work" })}
            className="flex-1 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold text-[13px] hover:bg-amber-500/20 transition"
          >
            Needs work
          </button>
          <button
            onClick={() => submit("ship")}
            className="flex-1 h-12 rounded-xl bg-mint-500/15 border border-mint-500/40 text-mint-300 font-semibold text-[13px] hover:bg-mint-500/25 transition"
          >
            Ship
          </button>
        </div>
      </div>

      {/* Note modal for needs-work */}
      <AnimatePresence>
        {showNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink-950/85 backdrop-blur grid place-items-center px-4"
            onClick={() => setShowNote(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-ink-900 border border-white/10 rounded-xl p-5 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-[10px] uppercase tracking-[0.18em] text-amber-300 font-semibold mb-2">
                Needs-work — what's missing?
              </div>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="One line — what to fix."
                className="w-full h-24 bg-white/[0.03] border border-white/10 rounded-md px-3 py-2.5 text-[13px] text-ink-100 placeholder:text-ink-500 resize-none focus:outline-none focus:border-amber-500/40"
                autoFocus
              />
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => setShowNote(null)}
                  className="flex-1 h-10 rounded-md border border-white/10 text-ink-300 text-[12.5px] font-semibold hover:bg-white/[0.04]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => submit("needs-work", noteText.trim() || undefined)}
                  className="flex-1 h-10 rounded-md bg-amber-500 text-ink-950 text-[12.5px] font-bold hover:bg-amber-400"
                >
                  Submit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FoundationsDone({
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
  return (
    <div className="min-h-[100dvh] grid place-items-center px-6 py-12">
      <div className="max-w-md w-full text-center">
        <div className="text-[10px] uppercase tracking-[0.22em] text-flame-400 font-semibold">
          Email Foundations · Done
        </div>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink-50">
          {shipped} ship · {needsWork} needs-work · {killed} no
        </h2>
        <p className="mt-3 text-[14px] text-ink-300">
          Thanks {voter}. Votes committed to the repo. {total} cards reviewed.
        </p>
        <button
          onClick={onBack}
          className="mt-8 h-11 inline-flex items-center justify-center px-6 rounded-xl border border-white/10 text-ink-200 font-semibold text-[14px] hover:bg-white/[0.04] transition"
        >
          ← Back to decks
        </button>
      </div>
    </div>
  );
}
