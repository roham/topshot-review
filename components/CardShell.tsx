"use client";
import type { Card } from "@/lib/cards";
import { UpgradeCard } from "./cards/UpgradeCard";

export function CardShell({ card }: { card: Card }) {
  return <UpgradeCard card={card} activeVariant="c1" />;
}
