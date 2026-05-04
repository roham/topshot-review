"use client";
import { useEffect, useState } from "react";
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
        <span className="text-[11px] uppercase tracking-wider text-ink-500">v1004</span>
      </header>

      <div className="flex-1 grid place-items-center px-6 py-10">
        <div className="max-w-xl w-full text-center">
          <div className="text-[10px] uppercase tracking-[0.22em] text-flame-400 font-semibold">
            Customer.io rebuild · marketing review
          </div>
          <h1 className="mt-3 font-display text-[40px] sm:text-5xl font-semibold tracking-tight text-ink-50 text-balance leading-[1.05]">
            Seven emails. Four versions of each.
          </h1>
          <p className="mt-4 text-[15px] sm:text-base text-ink-300 text-pretty leading-relaxed">
            Each card is rendered with mock data so you see exactly what the customer would receive — plus the underlying Customer.io Liquid template stacked below. Vote on all 28 variants:{" "}
            <span className="text-mint-400 font-semibold">ship it</span>,{" "}
            <span className="text-rose-400 font-semibold">nope</span>, or{" "}
            <span className="text-amber-400 font-semibold">needs work</span>. About 15 minutes.
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
              <button
                onClick={() => { setStored(null); localStorage.removeItem("voter"); }}
                className="mt-2 text-[12px] text-ink-400 hover:text-ink-200"
              >
                Not {stored}?
              </button>
            )}
          </div>

          <div className="mt-12 grid grid-cols-3 gap-3 text-left">
            {[
              { n: "28", l: "Variants to vote" },
              { n: "~15 min", l: "Linear flow" },
              { n: "Mock + Liquid", l: "Both shown" },
            ].map((x) => (
              <div key={x.l} className="rounded-2xl border border-white/10 bg-white/[0.02] p-3">
                <div className="font-display text-[15px] sm:text-base font-semibold text-ink-50">{x.n}</div>
                <div className="text-[10.5px] uppercase tracking-wider text-ink-400 mt-1">{x.l}</div>
              </div>
            ))}
          </div>

          {/* Matt's visual philosophy framing */}
          <div className="mt-10 rounded-2xl border border-amber-500/30 bg-amber-500/[0.04] px-4 py-4 text-left max-w-md mx-auto">
            <div className="text-[10.5px] uppercase tracking-wider text-amber-400 font-semibold mb-2">Context before you swipe</div>
            <p className="text-[13px] text-ink-200 leading-relaxed">
              These cards propose <span className="text-ink-50 font-medium">copy + personalization strategy</span> — not final HTML design. Matt&apos;s instinct (&ldquo;no one reads; images and video everywhere&rdquo;) and these proposals aren&apos;t opposed: Magic owns the content layer, the design team wraps it. Vote on whether the <em>content</em> is right. Visual execution is a separate conversation.
            </p>
          </div>

          <div className="mt-6 text-left max-w-md mx-auto">
            <div className="text-[10.5px] uppercase tracking-wider text-ink-400 font-semibold mb-2">
              The seven, in priority order
            </div>
            <ol className="space-y-1.5 text-[12.5px] text-ink-200">
              <li><span className="text-flame-400 font-mono mr-2">1</span>Reactivation drip — 1.27M idle L1+L2, currently zero</li>
              <li><span className="text-flame-400 font-mono mr-2">2</span>Pack Received — voice rebuild on the highest-leverage email</li>
              <li><span className="text-flame-400 font-mono mr-2">3</span>Welcome / Onboarding — restart after 136 days dark</li>
              <li><span className="text-flame-400 font-mono mr-2">4</span>Fast Break Daily Result — production fix + voice</li>
              <li><span className="text-flame-400 font-mono mr-2">5</span>Drop Announcements — programmatic loop instead of 1k one-offs</li>
              <li><span className="text-flame-400 font-mono mr-2">6</span>Abandoned Cart — voice swap, easiest win</li>
              <li><span className="text-flame-400 font-mono mr-2">7</span>Whale-tier concierge — net-new surface for L4+ collectors</li>
            </ol>
          </div>
        </div>
      </div>

      <footer className="px-6 pb-6 text-center text-[11px] text-ink-500">
        NBA Top Shot · Customer.io rebuild · workspace 161112
      </footer>
    </main>
  );
}
