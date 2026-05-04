"use client";
import { useEffect, useState } from "react";
import { CARDS } from "@/lib/cards";
import { SwipeDeck } from "@/components/SwipeDeck";
import { ExemplarDeck } from "@/components/ExemplarDeck";
import { OpenQuestionsDeck } from "@/components/OpenQuestionsDeck";

type ActiveDeck = "email-variants" | "exemplars" | "open-questions" | null;

export default function ReviewPage() {
  const [voter, setVoter] = useState<string | null>(null);
  const [activeDeck, setActiveDeck] = useState<ActiveDeck>(null);

  useEffect(() => {
    const v = localStorage.getItem("voter");
    if (!v) {
      window.location.href = "/";
      return;
    }
    setVoter(v);
  }, []);

  if (!voter) return null;

  if (activeDeck === "email-variants") {
    return (
      <SwipeDeckWithBack
        voter={voter}
        onBack={() => setActiveDeck(null)}
      />
    );
  }

  if (activeDeck === "exemplars") {
    return <ExemplarDeck voter={voter} onBack={() => setActiveDeck(null)} />;
  }

  if (activeDeck === "open-questions") {
    return <OpenQuestionsDeck voter={voter} onBack={() => setActiveDeck(null)} />;
  }

  // Compute total steps for email variants
  const emailStepCount = CARDS.reduce((acc, card) => {
    const variantKeys = ["c1", "c2", "c3"] as const;
    return acc + variantKeys.filter((v) => card.after[v] != null).length;
  }, 0);

  return (
    <div className="min-h-[100dvh] flex flex-col px-4 py-10">
      {/* Header */}
      <div className="max-w-lg mx-auto w-full">
        <div className="text-[10px] uppercase tracking-[0.22em] text-flame-400 font-semibold">
          NBA Top Shot · Review
        </div>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink-50 text-balance">
          Pick a deck, {voter}.
        </h1>
        <p className="mt-2 text-[13.5px] text-ink-400">
          Three review surfaces. Vote on each card as you go.
        </p>

        {/* Deck cards */}
        <div className="mt-8 flex flex-col gap-3">
          <DeckCard
            title="Email Variants"
            subtitle={`${CARDS.length} emails · ${emailStepCount} total variants`}
            description="7 Customer.io lifecycle emails — 15 Phase H net-new candidates (c1/c2/c3). Vote ship / needs-work / no on each variant individually."
            accent="flame"
            badge="Phase H · c1/c2/c3"
            onClick={() => setActiveDeck("email-variants")}
          />
          <DeckCard
            title="Exemplars"
            subtitle="14 cards · 5 voice modes"
            description="Phase 0 voice-anchor corpus. Transactional, Chronicler, Drop Anticipation, Reactivation, Concierge. Vote keep / needs-work / no. Caveated exemplars flagged in amber."
            accent="sky"
            badge="Voice canon"
            onClick={() => setActiveDeck("exemplars")}
          />
          <DeckCard
            title="Open Questions"
            subtitle="26 decisions · 8 decision-makers"
            description="Roham, Dan, Matt, Sam, Guy+Sam, Kenny, Engineering, Cross-product. Filterable by owner. Vote unblock / discuss / block."
            accent="violet"
            badge="Governance"
            onClick={() => setActiveDeck("open-questions")}
          />
        </div>

        {/* Footer */}
        <div className="mt-10 text-center text-[10.5px] text-ink-600">
          Logged in as <span className="text-ink-400 font-semibold">{voter}</span> ·{" "}
          <button
            onClick={() => {
              localStorage.removeItem("voter");
              window.location.href = "/";
            }}
            className="text-ink-500 hover:text-ink-300 underline underline-offset-2 transition"
          >
            switch voter
          </button>
        </div>
      </div>
    </div>
  );
}

function DeckCard({
  title,
  subtitle,
  description,
  accent,
  badge,
  onClick,
}: {
  title: string;
  subtitle: string;
  description: string;
  accent: "flame" | "sky" | "violet";
  badge: string;
  onClick: () => void;
}) {
  const accentMap = {
    flame: {
      border: "border-flame-500/30 hover:border-flame-500/60",
      badge: "bg-flame-500/10 border-flame-500/30 text-flame-300",
      title: "text-flame-50",
      arrow: "text-flame-400",
      bg: "hover:bg-flame-500/[0.04]",
    },
    sky: {
      border: "border-sky-500/30 hover:border-sky-500/60",
      badge: "bg-sky-500/10 border-sky-500/30 text-sky-300",
      title: "text-sky-50",
      arrow: "text-sky-400",
      bg: "hover:bg-sky-500/[0.04]",
    },
    violet: {
      border: "border-violet-500/30 hover:border-violet-500/60",
      badge: "bg-violet-500/10 border-violet-500/30 text-violet-300",
      title: "text-violet-50",
      arrow: "text-violet-400",
      bg: "hover:bg-violet-500/[0.04]",
    },
  };
  const a = accentMap[accent];

  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-2xl border bg-ink-900/80 px-5 py-4 transition active:scale-[0.98] ${a.border} ${a.bg}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[10px] font-bold uppercase tracking-wider border rounded-full px-2 py-0.5 ${a.badge}`}>
              {badge}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-ink-500">{subtitle}</span>
          </div>
          <div className={`mt-2 text-[18px] font-semibold tracking-tight ${a.title}`}>{title}</div>
          <p className="mt-1 text-[12.5px] text-ink-400 leading-snug">{description}</p>
        </div>
        <span className={`text-xl leading-none pt-1 shrink-0 ${a.arrow}`}>→</span>
      </div>
    </button>
  );
}

// Thin wrapper around SwipeDeck that adds a back button when done
function SwipeDeckWithBack({ voter, onBack }: { voter: string; onBack: () => void }) {
  return <SwipeDeck cards={CARDS} voter={voter} onDone={onBack} />;
}
