"use client";

import { useState } from "react";

interface DecisionPanelProps {
  pieceId: string;
  question: string;
  options: string[];
}

const OPTION_LABELS: Record<string, { label: string; color: string }> = {
  accept: { label: "Accept", color: "bg-mint-500 hover:bg-mint-600 text-ink-950" },
  approve: { label: "Approve", color: "bg-mint-500 hover:bg-mint-600 text-ink-950" },
  "approve-with-notes": { label: "Approve with notes", color: "bg-amber-500 hover:bg-amber-600 text-ink-950" },
  modify: { label: "Modify", color: "bg-amber-500 hover:bg-amber-600 text-ink-950" },
  reject: { label: "Reject", color: "bg-rose-500 hover:bg-rose-600 text-white" },
};

export function DecisionPanel({ pieceId, question, options }: DecisionPanelProps) {
  const [voter, setVoter] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("voter") ?? "" : ""
  );
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const vote = async (choice: string) => {
    if (!voter.trim()) return;
    setBusy(true);
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          piece_id: pieceId,
          variant: "decision",
          vote: choice,
          note: note.trim() || undefined,
          voter: voter.trim(),
        }),
      });
      setSubmitted(choice);
    } finally {
      setBusy(false);
    }
  };

  if (submitted) {
    return (
      <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
        <div className="text-[12px] uppercase tracking-wider text-ink-400 mb-2">Decision recorded</div>
        <div className="font-display text-2xl font-semibold text-ink-50 capitalize">{submitted}</div>
        {note && <div className="mt-2 text-[13px] text-ink-300">&ldquo;{note}&rdquo;</div>}
        <div className="mt-3 text-[11px] text-ink-500">{voter} · {new Date().toLocaleDateString()}</div>
      </div>
    );
  }

  return (
    <div className="mt-10 rounded-2xl border border-flame-500/30 bg-flame-500/[0.04] p-6">
      <div className="text-[10.5px] uppercase tracking-wider text-flame-400 font-semibold mb-3">Decision Required</div>
      <p className="text-[15px] font-display font-semibold text-ink-100 mb-5">{question}</p>

      {!voter && (
        <div className="mb-4">
          <input
            autoFocus
            value={voter}
            onChange={(e) => setVoter(e.target.value)}
            placeholder="Your name"
            className="w-full max-w-xs h-10 rounded-xl bg-white/[0.04] border border-white/10 px-4 text-[14px] text-ink-100 placeholder-ink-500 focus:outline-none focus:border-flame-500/50"
            onBlur={() => {
              if (voter) localStorage.setItem("voter", voter);
            }}
          />
        </div>
      )}

      <div className="flex flex-wrap gap-3 mb-4">
        {options.map((opt) => {
          const cfg = OPTION_LABELS[opt] ?? { label: opt, color: "bg-ink-700 hover:bg-ink-600 text-ink-100" };
          return (
            <button
              key={opt}
              onClick={() => vote(opt)}
              disabled={busy || !voter.trim()}
              className={`px-5 py-2.5 rounded-xl font-semibold text-[14px] transition disabled:opacity-40 ${cfg.color}`}
            >
              {cfg.label}
            </button>
          );
        })}
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Optional: notes on modifications, conditions, or concerns..."
        rows={2}
        className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2.5 text-[13px] text-ink-100 placeholder-ink-500 focus:outline-none focus:border-flame-500/30 resize-none"
      />
    </div>
  );
}
