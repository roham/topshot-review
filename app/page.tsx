"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function Home() {
  const [name, setName] = useState("");
  const [stored, setStored] = useState<string | null>(null);

  useEffect(() => {
    const v = localStorage.getItem("voter");
    if (v) setStored(v);
  }, []);

  const start = () => {
    const v = (name || stored || "").trim();
    if (!v) return;
    localStorage.setItem("voter", v);
    window.location.href = "/review";
  };

  return (
    <main className="min-h-[100dvh] flex flex-col">
      <header className="px-6 pt-6 pb-2 flex items-center justify-between">
        <Logo />
        <Link href="/calendar" className="text-[11px] uppercase tracking-wider text-ink-400 hover:text-ink-100">Calendar →</Link>
      </header>

      <div className="flex-1 grid place-items-center px-6 py-10">
        <div className="max-w-lg w-full text-center">
          <div className="text-[10px] uppercase tracking-[0.22em] text-flame-400 font-semibold">May 4 – 10 · Round 2</div>
          <h1 className="mt-3 font-display text-[40px] sm:text-5xl font-semibold tracking-tight text-ink-50 text-balance leading-[1.05]">
            Reactivate <span className="text-flame-400">L+XL</span>.<br/>
            Tell us what ships.
          </h1>
          <p className="mt-4 text-[15px] sm:text-base text-ink-300 text-pretty leading-relaxed">
            Magic's proposal for the next 7 days, deconstructed into 14 pieces — emails, social, calendar, decisions. Swipe through them. Three choices per piece: <span className="text-mint-500 font-semibold">ship it</span>, <span className="text-rose-500 font-semibold">nope</span>, <span className="text-amber-500 font-semibold">needs work</span>. Takes 4 minutes.
          </p>

          <div className="mt-7 max-w-sm mx-auto">
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={stored ?? "Your name"}
              className="w-full h-12 rounded-xl bg-white/[0.04] border border-white/10 px-4 text-[15px] text-ink-100 placeholder-ink-500 focus:outline-none focus:border-flame-500/50 text-center"
              onKeyDown={(e) => e.key === "Enter" && start()}
            />
            <button
              onClick={start}
              className="mt-3 w-full h-12 rounded-xl bg-flame-500 text-white font-semibold text-[15px] hover:bg-flame-600 active:scale-[0.99] transition disabled:opacity-40"
              disabled={!name && !stored}
            >
              Start reviewing
            </button>
            {stored && !name && (
              <button onClick={() => { setStored(null); localStorage.removeItem("voter"); }} className="mt-2 text-[12px] text-ink-400 hover:text-ink-200">
                Not {stored}?
              </button>
            )}
          </div>

          <div className="mt-12 grid grid-cols-3 gap-3 text-left">
            {[
              { n: "14", l: "Pieces" },
              { n: "80–115", l: "Reactivated forecast" },
              { n: "$2.5M", l: "Annualized recovered" },
            ].map((x) => (
              <div key={x.l} className="rounded-2xl border border-white/10 bg-white/[0.02] p-3">
                <div className="font-display text-[18px] sm:text-xl font-semibold text-ink-50">{x.n}</div>
                <div className="text-[10.5px] uppercase tracking-wider text-ink-400 mt-1">{x.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="px-6 pb-6 text-center text-[11px] text-ink-500">
        NBA Top Shot · Reactivation Review v1
      </footer>
    </main>
  );
}
