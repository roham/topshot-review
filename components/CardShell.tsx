"use client";
import type { Card } from "@/lib/cards";
import { EmailCard } from "./cards/EmailCard";
import { XCard } from "./cards/XCard";
import { DiscordCard } from "./cards/DiscordCard";
import { CalendarCard } from "./cards/CalendarCard";
import { StrategyCard } from "./cards/StrategyCard";
import { DecisionCard } from "./cards/DecisionCard";
import { ABTestCard } from "./cards/ABTestCard";

const KIND_LABEL: Record<Card["kind"], string> = {
  email: "Email",
  x: "X / Twitter",
  discord: "Discord",
  calendar: "Calendar",
  strategy: "Strategy",
  decision: "Decision",
  abtest: "A/B test",
};

const KIND_COLOR: Record<Card["kind"], string> = {
  email: "text-blue-300 border-blue-500/30 bg-blue-500/10",
  x: "text-flame-300 border-flame-500/30 bg-flame-500/10",
  discord: "text-purple-300 border-purple-500/30 bg-purple-500/10",
  calendar: "text-mint-500 border-mint-500/30 bg-mint-500/10",
  strategy: "text-amber-500 border-amber-500/30 bg-amber-500/10",
  decision: "text-flame-300 border-flame-500/40 bg-flame-500/15",
  abtest: "text-ink-200 border-ink-500/30 bg-white/[0.04]",
};

export function CardShell({ card }: { card: Card }) {
  return (
    <div className="w-full">
      <div className="px-1 pb-3 flex items-center gap-2 flex-wrap">
        <span className={`text-[10.5px] uppercase tracking-[0.16em] font-semibold border rounded-full px-2.5 py-1 ${KIND_COLOR[card.kind]}`}>{KIND_LABEL[card.kind]}</span>
        {card.surface && <span className="text-[10.5px] text-ink-400 uppercase tracking-wider">{card.surface}</span>}
        {card.audience && <span className="text-[10.5px] text-ink-400">· {card.audience}</span>}
        {card.date && <span className="ml-auto text-[10.5px] text-ink-400 font-mono">{card.date}</span>}
      </div>
      <div>
        {card.kind === "email" && <EmailCard card={card} />}
        {card.kind === "x" && <XCard card={card} />}
        {card.kind === "discord" && <DiscordCard card={card} />}
        {card.kind === "calendar" && <CalendarCard card={card} />}
        {card.kind === "strategy" && <StrategyCard card={card} />}
        {card.kind === "decision" && <DecisionCard card={card} />}
        {card.kind === "abtest" && <ABTestCard card={card} />}
      </div>
      {card.kind === "email" || card.kind === "x" || card.kind === "discord" ? (
        <div className="mt-4 mx-auto max-w-[460px] rounded-2xl bg-ink-900/60 border border-white/10 px-4 py-3">
          <div className="text-[10px] uppercase tracking-wider text-ink-400 font-semibold mb-1">Why</div>
          <p className="text-[12.5px] text-ink-200 leading-[1.5]">{card.rationale}</p>
          {card.forecast && (
            <div className="mt-2 text-[12px] text-flame-300 font-mono">{card.forecast}</div>
          )}
        </div>
      ) : null}
    </div>
  );
}
