"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CARDS, type AfterVariantId } from "@/lib/cards";

type Feedback = {
  piece_id: string;
  variant?: AfterVariantId;
  vote: "ship" | "no" | "needs-work";
  note?: string;
  reasons?: string[];
  voter: string;
  ts: string;
};

const VARIANT_ORDER: AfterVariantId[] = ["v1001", "almanac", "cinematic", "brief"];
const VARIANT_LABELS: Record<AfterVariantId, string> = {
  v1001: "v1001",
  almanac: "Almanac",
  cinematic: "Cinematic",
  brief: "Brief",
};
const VARIANT_TONE: Record<AfterVariantId, string> = {
  v1001: "text-mint-300",
  almanac: "text-flame-300",
  cinematic: "text-rose-300",
  brief: "text-amber-300",
};

export default function AdminPage() {
  const [data, setData] = useState<Feedback[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [storageNote, setStorageNote] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/feedback")
      .then((r) => r.json())
      .then((j) => {
        setData(j.feedback ?? []);
        if (j.note) setStorageNote(j.note);
      })
      .catch((e) => setError(String(e)));
  }, []);

  // Group: piece_id → variant → votes[]
  const byPieceVariant: Record<string, Record<AfterVariantId, Feedback[]>> = {};
  (data ?? []).forEach((f) => {
    const v: AfterVariantId = (f.variant ?? "v1001") as AfterVariantId;
    if (!byPieceVariant[f.piece_id]) {
      byPieceVariant[f.piece_id] = { v1001: [], almanac: [], cinematic: [], brief: [] };
    }
    byPieceVariant[f.piece_id][v].push(f);
  });

  const tally = (votes: Feedback[]) => ({
    ship: votes.filter((x) => x.vote === "ship").length,
    no: votes.filter((x) => x.vote === "no").length,
    needs: votes.filter((x) => x.vote === "needs-work").length,
  });

  const totalVotes = (m: Record<AfterVariantId, Feedback[]>) =>
    VARIANT_ORDER.reduce((sum, v) => sum + m[v].length, 0);

  return (
    <main className="min-h-[100dvh] px-4 sm:px-6 py-6">
      <header className="max-w-4xl mx-auto flex items-center justify-between mb-6">
        <Logo />
        <Link href="/" className="text-[11px] uppercase tracking-wider text-ink-400 hover:text-ink-100">← Home</Link>
      </header>
      <div className="max-w-4xl mx-auto">
        <div className="text-[10px] uppercase tracking-[0.22em] text-flame-400 font-semibold">Feedback · v1002</div>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-ink-50">What came back</h1>
        <p className="mt-2 text-[14.5px] text-ink-300">Per-card tally split by variant. v1001 = current shipping. Almanac / Cinematic / Brief = the three alternates.</p>

        {storageNote && (
          <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-[13px] text-amber-200">
            <span className="font-semibold">Votes aren&apos;t being saved.</span> {storageNote}
          </div>
        )}
        {error && <div className="mt-6 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-[13px] text-rose-300">Couldn&apos;t load: {error}</div>}
        {!data && !error && <div className="mt-6 text-[13px] text-ink-400">Loading…</div>}
        {data && data.length === 0 && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center">
            <div className="text-[14px] text-ink-200">No feedback yet.</div>
            <div className="mt-1 text-[12px] text-ink-400">Share the link with the team. Come back when they&apos;ve voted.</div>
            <Link href="/review" className="mt-4 inline-block px-4 h-10 leading-10 rounded-xl bg-flame-500 text-white font-semibold text-[13px] hover:bg-flame-600">Try it yourself →</Link>
          </div>
        )}

        {data && data.length > 0 && (
          <div className="mt-8 space-y-4">
            {CARDS.map((c) => {
              const variantVotes = byPieceVariant[c.id] ?? { v1001: [], almanac: [], cinematic: [], brief: [] };
              const total = totalVotes(variantVotes);
              return (
                <div key={c.id} className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
                  <div className="px-4 py-3 flex items-baseline gap-3 flex-wrap border-b border-white/5">
                    <span className="text-[10px] uppercase tracking-wider text-flame-400 font-semibold font-mono">#{c.position}</span>
                    <span className="text-[14.5px] text-ink-50 font-semibold">{c.stack_item}</span>
                    <span className="ml-auto text-[11px] text-ink-400 font-mono">{total} vote{total === 1 ? "" : "s"}</span>
                  </div>

                  {/* Per-variant tally rows */}
                  <div className="px-4 py-3 space-y-2">
                    {VARIANT_ORDER.map((v) => {
                      const votes = variantVotes[v];
                      const t = tally(votes);
                      const vTotal = votes.length;
                      const shipPct = vTotal ? (t.ship / vTotal) * 100 : 0;
                      const noPct = vTotal ? (t.no / vTotal) * 100 : 0;
                      const needsPct = vTotal ? (t.needs / vTotal) * 100 : 0;
                      return (
                        <div key={v} className="grid grid-cols-[100px_1fr_100px] items-center gap-3 text-[11px]">
                          <div className={`font-semibold uppercase tracking-wider ${VARIANT_TONE[v]}`}>
                            {VARIANT_LABELS[v]}
                          </div>
                          <div className="flex h-1.5 rounded-full overflow-hidden bg-white/5">
                            {vTotal > 0 ? (
                              <>
                                <div className="bg-mint-500" style={{ width: `${shipPct}%` }} />
                                <div className="bg-amber-500" style={{ width: `${needsPct}%` }} />
                                <div className="bg-rose-500" style={{ width: `${noPct}%` }} />
                              </>
                            ) : null}
                          </div>
                          <div className="flex justify-end gap-2 font-mono text-ink-400">
                            <span className="text-mint-400">{t.ship}</span>
                            <span className="text-amber-400">{t.needs}</span>
                            <span className="text-rose-400">{t.no}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Notes + reasons across all variants */}
                  {VARIANT_ORDER.flatMap((v) => variantVotes[v].filter((x) => x.note || (x.reasons && x.reasons.length))).length > 0 && (
                    <div className="px-4 pb-3 pt-1 space-y-1.5 border-t border-white/5">
                      {VARIANT_ORDER.flatMap((v) =>
                        variantVotes[v]
                          .filter((x) => x.note || (x.reasons && x.reasons.length))
                          .map((x) => ({ ...x, _variant: v }))
                      ).map((x, i) => (
                        <div key={i} className="rounded-lg bg-white/[0.03] border border-white/5 px-3 py-2">
                          <div className="flex items-center gap-2 text-[11px] text-ink-400 mb-0.5 flex-wrap">
                            <span className="text-ink-200 font-medium">{x.voter}</span>
                            <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold ${x.vote === "ship" ? "bg-mint-500/15 text-mint-500" : x.vote === "no" ? "bg-rose-500/15 text-rose-500" : "bg-amber-500/15 text-amber-500"}`}>{x.vote}</span>
                            <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold border ${VARIANT_TONE[x._variant as AfterVariantId]} border-current bg-white/[0.02]`}>
                              {VARIANT_LABELS[x._variant as AfterVariantId]}
                            </span>
                          </div>
                          {x.reasons && x.reasons.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-1">
                              {x.reasons.map((r) => <span key={r} className="text-[10.5px] px-1.5 py-0.5 rounded bg-flame-500/10 text-flame-300">{r}</span>)}
                            </div>
                          )}
                          {x.note && <div className="text-[12.5px] text-ink-200">{x.note}</div>}
                        </div>
                      ))}
                    </div>
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
