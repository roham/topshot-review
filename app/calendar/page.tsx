"use client";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CARDS } from "@/lib/cards";
import { CalendarCard } from "@/components/cards/CalendarCard";

export default function CalendarPage() {
  const card = CARDS.find((c) => c.kind === "calendar")!;
  return (
    <main className="min-h-[100dvh] px-4 sm:px-6 py-6">
      <header className="max-w-2xl mx-auto flex items-center justify-between mb-6">
        <Logo />
        <Link href="/" className="text-[11px] uppercase tracking-wider text-ink-400 hover:text-ink-100">← Home</Link>
      </header>
      <div className="max-w-2xl mx-auto">
        <div className="text-[10px] uppercase tracking-[0.22em] text-flame-400 font-semibold">Plan view</div>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-ink-50 text-balance leading-[1.1]">May 4 – 10 reactivation play</h1>
        <p className="mt-2 text-[14.5px] text-ink-300 max-w-prose">
          Front-loaded for narrative density. Three CIO sends Monday morning capture the post-G7 narrative window before it cools. Matt's 100 1:1s roll across the week. Wemby R2 piece on May 9 is the showcase regardless of bracket outcomes.
        </p>
        <div className="mt-6">
          <CalendarCard card={card} />
        </div>
        <div className="mt-8 grid sm:grid-cols-2 gap-3">
          <Link href="/review" className="rounded-2xl border border-flame-500/40 bg-flame-500/10 p-4 hover:bg-flame-500/15 transition">
            <div className="text-[11px] uppercase tracking-wider text-flame-300 font-semibold">Review the proposal</div>
            <div className="mt-1 text-[15px] text-ink-50 font-semibold">Swipe 14 pieces →</div>
            <div className="text-[12px] text-ink-300 mt-1">~4 min, ship/nope/needs-work per piece</div>
          </Link>
          <Link href="/admin" className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 hover:bg-white/[0.05] transition">
            <div className="text-[11px] uppercase tracking-wider text-ink-400 font-semibold">Read what came back</div>
            <div className="mt-1 text-[15px] text-ink-50 font-semibold">Feedback dashboard →</div>
            <div className="text-[12px] text-ink-300 mt-1">All votes, comments, sentiment per piece</div>
          </Link>
        </div>
      </div>
    </main>
  );
}
