"use client";
//
// LabDeck — wraps the existing SwipeDeck to render top-scoring autoresearch
// outputs in the SAME design + same vote capture flow used by the email-variants
// deck. Cards arrive from /api/autoresearch (which reads
// content/autoresearch/leaderboard.jsonl, synced every 15 min from the runner).
//
// The runner is the iterative loop:
//   Frigga + Heimdall research (parallel)
//   → first-principles mechanism
//   → drafter (3-5 candidates per slice)
//   → scorer (17-dim rubric)
//   → critic + refine
// Top scores per (Trigger × ICP × Tier) slice surface here.
//

import { useEffect, useState } from "react";
import type { Card } from "@/lib/cards";
import { SwipeDeck } from "./SwipeDeck";

type Meta = { totalEntries: number; afterFilter: number; lastUpdated: string | null };

export function LabDeck({ voter, onBack }: { voter: string; onBack: () => void }) {
  const [cards, setCards] = useState<Card[] | null>(null);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/autoresearch")
      .then((r) => r.json())
      .then((j) => {
        setCards(j.cards ?? []);
        setMeta(j.meta ?? null);
      })
      .catch((e) => setError(String(e)));
  }, []);

  if (error) {
    return (
      <div className="min-h-[100dvh] grid place-items-center px-6 py-12">
        <div className="max-w-md w-full text-center">
          <div className="text-[10px] uppercase tracking-[0.2em] text-rose-400 font-semibold">
            Lab — load error
          </div>
          <p className="mt-3 text-[14px] text-ink-300">{error}</p>
          <button
            onClick={onBack}
            className="mt-6 h-11 inline-flex items-center justify-center px-6 rounded-xl border border-white/10 text-ink-200 font-semibold text-[14px] hover:bg-white/[0.04] transition"
          >
            ← Back to decks
          </button>
        </div>
      </div>
    );
  }

  if (cards == null) {
    return (
      <div className="min-h-[100dvh] grid place-items-center px-6 py-12">
        <div className="text-[12px] uppercase tracking-wider text-ink-400">Loading lab…</div>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="min-h-[100dvh] grid place-items-center px-6 py-12">
        <div className="max-w-md w-full text-center">
          <div className="text-[10px] uppercase tracking-[0.2em] text-violet-400 font-semibold">
            Lab — autoresearch
          </div>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink-50 text-balance">
            No candidates above the leaderboard floor yet.
          </h2>
          <p className="mt-2 text-[13.5px] text-ink-300">
            The autoresearch loop is running. Top-scoring drafts will appear here as they complete.
          </p>
          {meta && (
            <p className="mt-4 text-[11px] uppercase tracking-wider text-ink-500 font-mono">
              {meta.totalEntries} entries logged · {meta.afterFilter} above floor · last update{" "}
              {meta.lastUpdated ? new Date(meta.lastUpdated).toLocaleTimeString() : "—"}
            </p>
          )}
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

  return <SwipeDeck cards={cards} voter={voter} onDone={onBack} />;
}
