"use client";
import { useEffect, useState } from "react";
import { CARDS } from "@/lib/cards";
import { SwipeDeck } from "@/components/SwipeDeck";

export default function ReviewPage() {
  const [voter, setVoter] = useState<string | null>(null);

  useEffect(() => {
    const v = localStorage.getItem("voter");
    if (!v) {
      window.location.href = "/";
      return;
    }
    setVoter(v);
  }, []);

  if (!voter) return null;

  return <SwipeDeck cards={CARDS} voter={voter} />;
}
