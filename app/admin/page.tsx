"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CARDS } from "@/lib/cards";

type Feedback = { piece_id: string; vote: "ship" | "no" | "needs-work"; note?: string; reasons?: string[]; voter: string; ts: string };

export default function AdminPage() {
  const [data, setData] = useState<Feedback[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/feedback")
      .then((r) => r.json())
      .then((j) => setData(j.feedback ?? []))
      .catch((e) => setError(String(e)));
  }, []);

  const byPiece: Record<string, Feedback[]> = {};
  (data ?? []).forEach((f) => {
    (byPiece[f.piece_id] ??= []).push(f);
  });

  const tally = (votes: Feedback[]) => ({
    ship: votes.filter((v) => v.vote === "ship").length,
    no: votes.filter((v) => v.vote === "no").length,
    needs: votes.filter((v) => v.vote === "needs-work").length,
  });

  return (
    <main className="min-h-[100dvh] px-4 sm:px-6 py-6">
      <header className="max-w-4xl mx-auto flex items-center justify-between mb-6">
        <Logo />
        <Link href="/" className="text-[11px] uppercase tracking-wider text-ink-400 hover:text-ink-100">← Home</Link>
      </header>
      <div className="max-w-4xl mx-auto">
        <div className="text-[10px] uppercase tracking-[0.22em] text-flame-400 font-semibold">Feedback</div>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-ink-50">What came back</h1>
        <p className="mt-2 text-[14.5px] text-ink-300">Per-piece tally, raw notes, who said what.</p>

        {error && <div className="mt-6 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-[13px] text-rose-300">Couldn't load: {error}</div>}
        {!data && !error && <div className="mt-6 text-[13px] text-ink-400">Loading…</div>}
        {data && data.length === 0 && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center">
            <div className="text-[14px] text-ink-200">No feedback yet.</div>
            <div className="mt-1 text-[12px] text-ink-400">Share the link with the team. Come back when they've swiped.</div>
            <Link href="/review" className="mt-4 inline-block px-4 h-10 leading-10 rounded-xl bg-flame-500 text-white font-semibold text-[13px] hover:bg-flame-600">Try it yourself →</Link>
          </div>
        )}

        {data && data.length > 0 && (
          <div className="mt-8 space-y-4">
            {CARDS.map((c) => {
              const votes = byPiece[c.id] ?? [];
              const t = tally(votes);
              const total = votes.length;
              const shipPct = total ? (t.ship / total) * 100 : 0;
              const noPct = total ? (t.no / total) * 100 : 0;
              const needsPct = total ? (t.needs / total) * 100 : 0;
              return (
                <div key={c.id} className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
                  <div className="px-4 py-3 flex items-baseline gap-3 flex-wrap border-b border-white/5">
                    <span className="text-[10px] uppercase tracking-wider text-flame-400 font-semibold">{c.kind}</span>
                    <span className="text-[14.5px] text-ink-50 font-semibold">{c.title}</span>
                    <span className="ml-auto text-[11px] text-ink-400 font-mono">{total} vote{total === 1 ? "" : "s"}</span>
                  </div>
                  {total > 0 && (
                    <>
                      <div className="px-4 pt-3 pb-1">
                        <div className="flex h-2 rounded-full overflow-hidden bg-white/5">
                          <div className="bg-mint-500" style={{ width: `${shipPct}%` }} />
                          <div className="bg-amber-500" style={{ width: `${needsPct}%` }} />
                          <div className="bg-rose-500" style={{ width: `${noPct}%` }} />
                        </div>
                        <div className="mt-1.5 flex gap-3 text-[11px]">
                          <span className="text-mint-500"><span className="font-semibold">{t.ship}</span> ship</span>
                          <span className="text-amber-500"><span className="font-semibold">{t.needs}</span> needs work</span>
                          <span className="text-rose-500"><span className="font-semibold">{t.no}</span> no</span>
                        </div>
                      </div>
                      {votes.some((v) => v.note || (v.reasons && v.reasons.length)) && (
                        <div className="px-4 pb-3 pt-2 space-y-1.5">
                          {votes.filter((v) => v.note || (v.reasons && v.reasons.length)).map((v, i) => (
                            <div key={i} className="rounded-lg bg-white/[0.03] border border-white/5 px-3 py-2">
                              <div className="flex items-center gap-2 text-[11px] text-ink-400 mb-0.5">
                                <span className="text-ink-200 font-medium">{v.voter}</span>
                                <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold ${v.vote === "ship" ? "bg-mint-500/15 text-mint-500" : v.vote === "no" ? "bg-rose-500/15 text-rose-500" : "bg-amber-500/15 text-amber-500"}`}>{v.vote}</span>
                              </div>
                              {v.reasons && v.reasons.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-1">
                                  {v.reasons.map((r) => <span key={r} className="text-[10.5px] px-1.5 py-0.5 rounded bg-flame-500/10 text-flame-300">{r}</span>)}
                                </div>
                              )}
                              {v.note && <div className="text-[12.5px] text-ink-200">{v.note}</div>}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
