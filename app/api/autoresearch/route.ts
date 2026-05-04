// app/api/autoresearch/route.ts
//
// Returns the current autoresearch leaderboard, shaped into the same Card[]
// schema /review's SwipeDeck consumes. Bound to the canonical jsonl synced
// every 15 min by /opt/magic/autoresearch/sync-leaderboard.sh into the repo.

import { NextResponse } from "next/server";
import { loadAutoresearchCards } from "@/lib/autoresearch";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const { cards, meta } = loadAutoresearchCards({
    minScore: 60,
    limit: 30,
    bestPerSlice: true,
  });
  return NextResponse.json({ cards, meta }, { headers: { "cache-control": "no-store" } });
}
