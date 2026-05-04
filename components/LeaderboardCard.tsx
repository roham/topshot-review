"use client";

import { useState } from "react";
import type { LeaderboardEntry } from "@/lib/leaderboard";

const DIM_LABELS: { key: string; label: string }[] = [
  { key: "D1", label: "Real Specificity" },
  { key: "D2", label: "Positive Math Gate" },
  { key: "D3", label: "Voice Fit for Surface" },
  { key: "D4", label: "Social Proof Presence" },
  { key: "D5", label: "AI-Tell Cleanliness" },
  { key: "D6", label: "Structural Calibration" },
  { key: "D7", label: "Design Uniqueness" },
  { key: "D8", label: "Image Accuracy" },
  { key: "D9", label: "Concierge Psychology" },
  { key: "D10", label: "L+XL Funnel Relevance" },
  { key: "D11", label: "Production Hygiene" },
  { key: "D12", label: "Factual Verification" },
  { key: "D13", label: "Trigger Fit" },
  { key: "D14", label: "ICP Fit" },
  { key: "D15", label: "Data Depth" },
  { key: "D16", label: "Market Grounding" },
  { key: "D17", label: "First-Principles" },
];

function bar(score: number | "N/A"): string {
  if (score === "N/A") return "—— N/A ——";
  const filled = Math.max(0, Math.min(5, Number(score)));
  return "█".repeat(filled * 3) + "░".repeat(15 - filled * 3);
}

function scoreBandColor(score: number): string {
  if (score >= 80) return "bg-emerald-700 text-white";
  if (score >= 75) return "bg-blue-600 text-white";
  if (score >= 60) return "bg-slate-600 text-white";
  return "bg-slate-400 text-slate-900";
}

function tierBadge(tier: string): string {
  if (tier === "L4+") return "border-amber-500/50 text-amber-300 bg-amber-500/10";
  if (tier === "dormant") return "border-violet-500/50 text-violet-300 bg-violet-500/10";
  if (tier === "L2-L3") return "border-sky-500/50 text-sky-300 bg-sky-500/10";
  return "border-emerald-500/50 text-emerald-300 bg-emerald-500/10";
}

export function LeaderboardCard({
  entry,
  bodyHtmlSanitized,
  initialVote,
}: {
  entry: LeaderboardEntry;
  bodyHtmlSanitized: string;
  initialVote: "ship" | "needs-work" | "no" | null;
}) {
  const [showDims, setShowDims] = useState(true);
  const [showCritic, setShowCritic] = useState(entry.total_score < 80);
  const [vote, setVote] = useState<"ship" | "needs-work" | "no" | null>(initialVote);
  const [voting, setVoting] = useState(false);
  const [note, setNote] = useState("");

  const submit = async (v: "ship" | "needs-work" | "no") => {
    setVoting(true);
    try {
      const voter =
        typeof window !== "undefined" ? localStorage.getItem("voter") || "anon" : "anon";
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          piece_id: entry.candidate_id,
          variant: "autoresearch",
          vote: v,
          note: note || undefined,
          voter,
        }),
      });
      setVote(v);
    } finally {
      setVoting(false);
    }
  };

  return (
    <article className="rounded-2xl border border-white/10 bg-ink-900/80 p-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="font-mono text-[11px] text-ink-400 truncate">
            {entry.slice_id}
          </div>
          <div className="mt-1 flex items-center gap-2 flex-wrap">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider border rounded-full px-2 py-0.5 ${tierBadge(
                entry.tier
              )}`}
            >
              {entry.tier}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-ink-500">
              {entry.trigger} · {entry.icp_archetype}
            </span>
          </div>
        </div>
        <div
          className={`shrink-0 rounded-full px-3 py-1 text-[12px] font-bold ${scoreBandColor(
            entry.total_score
          )}`}
        >
          {entry.total_score}/{entry.max_possible}
        </div>
      </div>

      {/* Draft preview — mobile-thumb register (320px container) */}
      <div className="mt-4 mx-auto max-w-[320px] rounded-xl border border-white/10 bg-ink-950 p-3">
        <div className="text-[10px] uppercase tracking-wider text-ink-500">Subject</div>
        <div className="mt-0.5 text-[13.5px] text-ink-50 font-semibold">
          {entry.draft.subject || <span className="text-ink-500">(no subject)</span>}
        </div>
        <div className="mt-2 text-[10px] uppercase tracking-wider text-ink-500">
          Preheader
        </div>
        <div className="mt-0.5 text-[12px] text-ink-300">
          {entry.draft.preheader || (
            <span className="text-ink-500">(no preheader)</span>
          )}
        </div>
        {entry.draft.hero_image_asset && (
          <div className="mt-3 rounded-lg border border-white/10 bg-ink-900 px-3 py-6 text-center text-[11px] text-ink-500">
            [hero image: {entry.draft.hero_image_asset}]
          </div>
        )}
        <div
          className="mt-3 prose prose-invert prose-sm max-w-none text-[12.5px] text-ink-200"
          dangerouslySetInnerHTML={{ __html: bodyHtmlSanitized }}
        />
        <div className="mt-3">
          <button
            type="button"
            className="w-full rounded-lg bg-flame-500 text-white font-semibold text-[12px] py-2"
          >
            {entry.draft.cta_label || "View"}
          </button>
          <div className="mt-1 text-[10px] text-ink-500 truncate">
            → {entry.draft.cta_url}
          </div>
        </div>
      </div>

      {/* 17-dim breakdown */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => setShowDims((s) => !s)}
          className="text-[11px] uppercase tracking-wider text-ink-400 hover:text-ink-200"
        >
          {showDims ? "▾" : "▸"} 17-dimension score breakdown
        </button>
        {showDims && (
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 font-mono text-[11px] text-ink-200">
            {DIM_LABELS.map((d) => {
              const s = entry.dim_scores[d.key];
              const display = s == null ? "—" : s;
              return (
                <div key={d.key} className="flex items-center gap-2 truncate">
                  <span className="text-ink-500 w-7">{d.key}</span>
                  <span className="text-ink-400 w-44 truncate">{d.label}</span>
                  <span className="text-ink-300 w-3 text-right">{display}</span>
                  <span className="text-ink-700">{bar(s ?? "N/A")}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Provenance */}
      <div className="mt-4 text-[11px] text-ink-400">
        <div className="uppercase tracking-wider mb-1">Research provenance</div>
        <ul className="space-y-0.5 font-mono">
          <li>· frigga: {entry.research_provenance.frigga || "—"}</li>
          <li>· heimdall: {entry.research_provenance.heimdall || "—"}</li>
          <li>· mechanism: {entry.research_provenance.mechanism || "—"}</li>
        </ul>
      </div>

      {/* Critic notes */}
      {entry.critic_notes && (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setShowCritic((s) => !s)}
            className="text-[11px] uppercase tracking-wider text-ink-400 hover:text-ink-200"
          >
            {showCritic ? "▾" : "▸"} Critic notes
          </button>
          {showCritic && (
            <div className="mt-2 rounded-lg border border-amber-500/20 bg-amber-500/[0.04] px-3 py-2 text-[12px] text-ink-200">
              {entry.critic_notes}
            </div>
          )}
        </div>
      )}

      {/* Vote primitive */}
      <div className="mt-5 border-t border-white/10 pt-4">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={voting}
            onClick={() => submit("ship")}
            className={`rounded-lg px-3 py-1.5 text-[12px] font-semibold transition ${
              vote === "ship"
                ? "bg-emerald-500 text-white"
                : "bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
            }`}
          >
            Ship
          </button>
          <button
            type="button"
            disabled={voting}
            onClick={() => submit("needs-work")}
            className={`rounded-lg px-3 py-1.5 text-[12px] font-semibold transition ${
              vote === "needs-work"
                ? "bg-amber-500 text-white"
                : "bg-amber-500/10 text-amber-300 hover:bg-amber-500/20"
            }`}
          >
            Needs work
          </button>
          <button
            type="button"
            disabled={voting}
            onClick={() => submit("no")}
            className={`rounded-lg px-3 py-1.5 text-[12px] font-semibold transition ${
              vote === "no"
                ? "bg-rose-500 text-white"
                : "bg-rose-500/10 text-rose-300 hover:bg-rose-500/20"
            }`}
          >
            No
          </button>
          {vote && (
            <span className="ml-1 text-[11px] text-ink-400 self-center">
              voted: <span className="text-ink-200">{vote}</span>
            </span>
          )}
        </div>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="optional note"
          className="mt-2 w-full rounded-lg bg-white/[0.04] border border-white/10 px-3 py-1.5 text-[12px] text-ink-100 placeholder-ink-500 focus:outline-none focus:border-flame-500/50"
        />
        <div className="mt-2 text-[10.5px] text-ink-500">
          Iteration {entry.iteration}/5 · {new Date(entry.ts).toLocaleString()}
        </div>
      </div>
    </article>
  );
}
