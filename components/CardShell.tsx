"use client";
import type { Card } from "@/lib/cards";
import { EmailCard } from "./cards/EmailCard";
import { XCard } from "./cards/XCard";
import { DiscordCard } from "./cards/DiscordCard";

export function CardShell({ card }: { card: Card }) {
  return (
    <div className="w-full">
      <div className="px-1 pb-3">
        <div className="text-[15px] font-display font-semibold text-ink-50 leading-snug text-balance">{card.title}</div>
        <div className="mt-1.5 text-[12.5px] text-ink-300 leading-relaxed text-pretty">
          <span className="text-flame-300 font-semibold">Sent to: </span>
          {card.audience}
        </div>
        <div className="mt-1 text-[12px] text-ink-400">
          <span className="text-ink-500">When: </span>
          {card.date}
        </div>
      </div>
      <div>
        {card.kind === "email" && <EmailCard card={card} />}
        {card.kind === "x" && <XCard card={card} />}
        {card.kind === "discord" && <DiscordCard card={card} />}
      </div>
    </div>
  );
}
