// lib/autoresearch.ts
//
// Loads the autoresearch leaderboard (drafts produced by the iterative
// research → first-principles → drafter → scorer → critic → refine loop)
// and shapes each high-scoring entry into the same Card schema the
// existing /review SwipeDeck renders.
//
// Source file: content/autoresearch/leaderboard.jsonl (synced every 15 min
// by /opt/magic/autoresearch/sync-leaderboard.sh).
//
// Each candidate becomes one Card with `after.c1` populated from the draft.
// The card.id is shaped `auto-<trigger>-<sliceId>-<candIdx>` so the existing
// CARD_TEMPLATE_MAP / resolveTemplateId pipeline picks the right per-trigger
// template (welcome / pack-received / drop-announcement / fast-break / etc.).
//
// Scoring transparency is surfaced in the card's `diagnosis.facts` panel —
// total_score, top dimensions, critic notes — so reviewers see WHY a draft
// landed in front of them.

import fs from "node:fs";
import path from "node:path";
import type { Card, AfterBlock } from "./cards";
import { resolveLiquidString } from "./liquid";
import { AUTORESEARCH_DEFAULTS } from "./mockData";

// ---------------------------------------------------------------------------
// Leaderboard entry shape (mirrors what runner.py writes)
// ---------------------------------------------------------------------------

export type LeaderboardEntry = {
  ts: string;
  slice_id: string;
  iteration: number;
  candidate_id: string;
  total_score: number;
  max_possible: number;
  dim_scores: Record<string, number | "N/A">;
  draft: {
    subject?: string;
    preheader?: string;
    body_html?: string;
    body_text_fallback?: string;
    cta_label?: string;
    cta_url?: string;
    hero_image_asset?: string;
    voice_mode?: string;
    behavioral_hooks?: string[];
    embedded_mechanism?: string;
    liquid_vars_required?: string[];
    verification_notes?: string;
  };
  research_provenance?: { frigga?: string; heimdall?: string; mechanism?: string };
  critic_notes?: string;
  trigger: string;
  icp_archetype: string;
  tier: string;
  verdict_band?: string;
};

// ---------------------------------------------------------------------------
// Trigger → existing template hero mapping
// ---------------------------------------------------------------------------

const TRIGGER_HERO: Record<string, string> = {
  "welcome": "/cards/welcome.png",
  "pack-received": "/cards/pack-pull.png",
  "drop-announcement": "/cards/drop-series.png",
  "fast-break": "/cards/infographics/fastbreak-scorecard.png",
  "abandoned-cart": "/cards/daily-reminder.png",
  "reactivation": "/cards/reactivation.png",
};

const TRIGGER_LABEL: Record<string, string> = {
  "welcome": "Welcome",
  "pack-received": "Pack Received",
  "drop-announcement": "Drop Announcement",
  "fast-break": "Fast Break",
  "abandoned-cart": "Abandoned Cart",
  "reactivation": "Reactivation",
};

const ICP_LABEL: Record<string, string> = {
  "documentarian": "Documentarian",
  "gambler-collector": "Gambler/Collector",
  "status": "Status Collector",
  "industry-watcher": "Industry Watcher",
  "casual-fan": "Casual Fan",
};

const TIER_LABEL: Record<string, string> = {
  "L0-L1": "L0–L1 (new / first-pack)",
  "L2-L3": "L2–L3 (mid-funnel)",
  "L4+": "L4+ (whale-tier)",
  "dormant": "Dormant >30d",
};

// Trigger → matching existing card.id whose MOCK_CONTEXTS entry we reuse so
// Liquid placeholders resolve to realistic mock data.
const TRIGGER_TO_MOCK_CARD_ID: Record<string, string> = {
  "welcome": "welcome-onboarding",
  "pack-received": "pack-received-voice",
  "drop-announcement": "drop-announcement-programmatic",
  "fast-break": "fast-break-result-fix",
  "abandoned-cart": "abandoned-cart",
  "reactivation": "reactivation-drip",
};

// ---------------------------------------------------------------------------
// HTML body parser — converts the drafter's body_html into the body string[]
// the existing UpgradeCard expects (one entry per paragraph or list item).
// ---------------------------------------------------------------------------

function htmlToBodyArray(html: string | undefined): string[] {
  if (!html) return [];
  // Strip outer tags + extract inner text per paragraph / list-item.
  // The drafter outputs a constrained subset: <p>, <strong>, <ul>, <li>, <a>.
  const out: string[] = [];

  // <pre> blocks (ASCII tables / monospace data cards) — split on newlines
  let processed = html.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (_, inner) => {
    const lines = stripTags(String(inner))
      .split(/\n/)
      .map((l) => l.trimEnd())
      .filter((l) => l.trim().length);
    return `\n__BLOCK__\n${lines.join("\n__BLOCK__\n")}\n__BLOCK__\n`;
  });

  // <ul>...</ul> blocks → bullet-prefixed list items
  processed = processed.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_, inner) => {
    const items = Array.from(inner.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)).map(
      (m) => `• ${stripTags((m as RegExpMatchArray)[1]).trim()}`
    );
    return `\n__BLOCK__\n${items.join("\n__BLOCK__\n")}\n__BLOCK__\n`;
  });

  // Headings (h2/h3) → own paragraphs
  processed = processed.replace(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi, "\n__BLOCK__\n$1\n__BLOCK__\n");

  // <p>...</p>
  processed = processed.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "\n__BLOCK__\n$1\n__BLOCK__\n");

  // <div> wrappers — strip but preserve inner block structure
  processed = processed.replace(/<\/?div[^>]*>/gi, "\n__BLOCK__\n");

  // <br> → block break
  processed = processed.replace(/<br\s*\/?>/gi, "\n__BLOCK__\n");

  // Split by block markers, strip remaining tags, drop empties
  for (const seg of processed.split("__BLOCK__")) {
    const cleaned = stripTags(seg).replace(/\s+/g, " ").trim();
    if (cleaned) out.push(cleaned);
  }
  return out;
}

function stripTags(s: string): string {
  return s
    .replace(/<a\s+[^>]*>([\s\S]*?)<\/a>/gi, "$1")
    .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, "$1")
    .replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, "$1")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "");
}

// ---------------------------------------------------------------------------
// Synthesize a Card from a LeaderboardEntry
// ---------------------------------------------------------------------------

function dimSummary(dim_scores: Record<string, number | "N/A">): { label: string; value: string }[] {
  const labels: Record<string, string> = {
    D1: "Real Specificity",
    D3: "Voice Fit",
    D4: "Social Proof",
    D5: "AI-Tell Cleanliness",
    D6: "Structural Calibration",
    D7: "Design Uniqueness",
    D8: "Image Accuracy",
    D10: "L+XL Funnel Relevance",
    D11: "Production Hygiene",
    D12: "Factual Verification",
    D13: "Trigger Fit",
    D14: "ICP Fit",
    D15: "Data Depth",
    D16: "Market Grounding",
    D17: "First-Principles Soundness",
  };
  // Pick the four lowest-scored numeric dims so reviewers see weakest signals first
  const numeric = Object.entries(dim_scores)
    .filter(([, v]) => v !== "N/A" && v != null)
    .map(([k, v]) => [k, Number(v)] as const);
  numeric.sort((a, b) => a[1] - b[1]);
  const top = numeric.slice(0, 4);
  return top.map(([k, v]) => ({
    label: `${labels[k] ?? k} (${k})`,
    value: `${v}/5`,
  }));
}

export function entryToCard(entry: LeaderboardEntry, position: number): Card {
  const trigger = entry.trigger;
  const archetype = entry.icp_archetype;
  const tier = entry.tier;
  const triggerLabel = TRIGGER_LABEL[trigger] ?? trigger;
  const icpLabel = ICP_LABEL[archetype] ?? archetype;
  const tierLabel = TIER_LABEL[tier] ?? tier;
  const hero = TRIGGER_HERO[trigger] ?? "/cards/infographics/moment-hero-placeholder.png";

  const draft = entry.draft ?? {};
  const bodyArr = htmlToBodyArray(draft.body_html);
  // Resolve headline-display Liquid (subject, preheader) with the
  // autoresearch defaults so the card's static text fields don't show
  // raw `{{var}}`. The detailed in-email body still goes through full
  // per-trigger Liquid resolution at render time.
  const resolvedSubject = resolveLiquidString(draft.subject, AUTORESEARCH_DEFAULTS as Record<string, unknown>);
  const resolvedPreheader = resolveLiquidString(draft.preheader, AUTORESEARCH_DEFAULTS as Record<string, unknown>);

  const after: AfterBlock = {
    label: `${triggerLabel} · ${draft.voice_mode ?? "draft"}`,
    from: "NBA Top Shot <hello@nbatopshot.com>",
    subject: draft.subject ?? "(no subject)", // raw — UpgradeCard will Liquid-resolve via the merged ctx
    preheader: draft.preheader ?? "",
    emailHero: {
      src: hero,
      alt: `${triggerLabel} hero`,
      liquidCaption: draft.hero_image_asset
        ? `Spec: ${draft.hero_image_asset.slice(0, 160)}`
        : undefined,
    },
    body: bodyArr.length ? bodyArr : ["(empty body)"],
    cta: draft.cta_label ?? "View on NBA Top Shot",
    voice_notes: draft.voice_mode ? `Voice mode: ${draft.voice_mode}` : undefined,
  };

  const cardId = `auto-${trigger}-${entry.slice_id}-iter${entry.iteration}-cand${entry.candidate_id.split("cand-")[1] ?? "X"}`;

  const verdictColor: Record<string, string> = {
    ship: "running-flat",
    "roham-tomorrow": "running-flat",
    leaderboard: "running-flat",
    record: "missing",
    abandon: "stopped",
  };

  return {
    id: cardId,
    position,
    stack_item: `${triggerLabel} · ${icpLabel} · ${tierLabel}`,
    hero,
    kind: "upgrade",
    headline: resolvedSubject || draft.subject || `${triggerLabel} candidate`,
    pills: {
      audience: `${icpLabel} · ${tierLabel}`,
      trigger: `${triggerLabel} · iter ${entry.iteration}`,
      kpi: `Score ${entry.total_score}/${entry.max_possible} · ${entry.verdict_band ?? "scored"}`,
    },
    voice: "platform-chronicler",
    diagnosis: {
      state: (verdictColor[entry.verdict_band ?? "record"] ?? "missing") as Card["diagnosis"]["state"],
      summary: draft.embedded_mechanism
        ? `Mechanism — ${draft.embedded_mechanism}`
        : `Autoresearch candidate · ${triggerLabel} × ${icpLabel} × ${tierLabel} · iteration ${entry.iteration}.`,
      facts: [
        { label: "Total score", value: `${entry.total_score} / ${entry.max_possible}` },
        { label: "Verdict", value: entry.verdict_band ?? "scored" },
        ...dimSummary(entry.dim_scores),
        ...(entry.critic_notes
          ? [{ label: "Critic edits (excerpt)", value: entry.critic_notes.slice(0, 220) + (entry.critic_notes.length > 220 ? "…" : "") }]
          : []),
      ],
      campaigns: [],
    },
    after: { c1: after },
    reviewer_ask:
      "Would you ship this exact draft to this audience? Use Ship-it / Needs work / Nope. Notes go back to Magic for the next iteration.",
    engineering_hooks: draft.liquid_vars_required ?? [],
  };
}

// ---------------------------------------------------------------------------
// Loader (server-only) — reads the jsonl, returns top-N cards.
// ---------------------------------------------------------------------------

export type LoadOptions = {
  /** Minimum total score to include. Defaults to 60 (the leaderboard floor). */
  minScore?: number;
  /** Maximum number of cards to return. Defaults to 30. */
  limit?: number;
  /** If true, return only the highest-scoring iteration per slice. */
  bestPerSlice?: boolean;
};

export function loadAutoresearchCards(opts: LoadOptions = {}): {
  cards: Card[];
  meta: { totalEntries: number; afterFilter: number; lastUpdated: string | null };
} {
  const minScore = opts.minScore ?? 60;
  const limit = opts.limit ?? 30;
  const bestPerSlice = opts.bestPerSlice ?? true;

  const jsonlPath = path.join(process.cwd(), "content/autoresearch/leaderboard.jsonl");
  let raw = "";
  try {
    raw = fs.readFileSync(jsonlPath, "utf8");
  } catch {
    return { cards: [], meta: { totalEntries: 0, afterFilter: 0, lastUpdated: null } };
  }

  const lines = raw.split("\n").filter((l) => l.trim());
  const entries: LeaderboardEntry[] = [];
  for (const line of lines) {
    try {
      const e = JSON.parse(line) as LeaderboardEntry;
      if (e.draft && (e.draft.subject || e.draft.body_html)) {
        entries.push(e);
      }
    } catch {
      // skip malformed
    }
  }

  let filtered = entries.filter((e) => (e.total_score ?? 0) >= minScore);

  if (bestPerSlice) {
    const bestBy: Record<string, LeaderboardEntry> = {};
    for (const e of filtered) {
      const key = e.slice_id;
      const cur = bestBy[key];
      if (!cur || (e.total_score ?? 0) > (cur.total_score ?? 0)) {
        bestBy[key] = e;
      }
    }
    filtered = Object.values(bestBy);
  }

  filtered.sort((a, b) => (b.total_score ?? 0) - (a.total_score ?? 0));
  filtered = filtered.slice(0, limit);

  const cards = filtered.map((e, i) => entryToCard(e, i + 1));
  const lastUpdated = entries.length ? entries[entries.length - 1].ts : null;

  return {
    cards,
    meta: { totalEntries: entries.length, afterFilter: filtered.length, lastUpdated },
  };
}
