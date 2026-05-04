"use client";
import { useState } from "react";
import type { Card, AfterVariantId } from "@/lib/cards";
import { UpgradeCard } from "./cards/UpgradeCard";

export function CardShell({ card }: { card: Card }) {
  const [activeVariant, setActiveVariant] = useState<AfterVariantId>("v1001");
  return (
    <UpgradeCard
      card={card}
      activeVariant={activeVariant}
      onVariantChange={setActiveVariant}
    />
  );
}
