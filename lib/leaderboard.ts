import fs from "fs";
import path from "path";

export type DimScore = number | "N/A";

export type LeaderboardEntry = {
  ts: string;
  slice_id: string;
  iteration: number;
  candidate_id: string;
  total_score: number;
  max_possible: number;
  dim_scores: Record<string, DimScore>;
  draft: {
    subject: string;
    preheader: string;
    body_html: string;
    body_text_fallback: string;
    cta_label: string;
    cta_url: string;
    hero_image_asset: string;
  };
  research_provenance: {
    frigga: string;
    heimdall: string;
    mechanism: string;
  };
  critic_notes: string;
  trigger: string;
  icp_archetype: string;
  tier: string;
  verdict_band: "ship" | "roham-tomorrow" | "leaderboard" | "recorded" | "below";
};

// Path resolution — try repo-mirrored first, then absolute Magic path (dev/local).
const REPO_PATH = path.join(
  process.cwd(),
  "content",
  "autoresearch",
  "leaderboard.jsonl"
);
const ABS_PATH = "/opt/magic/collect-hq/strategy/autoresearch-leaderboard.jsonl";

export function leaderboardSourcePath(): string | null {
  if (fs.existsSync(REPO_PATH)) return REPO_PATH;
  if (fs.existsSync(ABS_PATH)) return ABS_PATH;
  return null;
}

export function loadAllEntries(): LeaderboardEntry[] {
  const p = leaderboardSourcePath();
  if (!p) return [];
  const raw = fs.readFileSync(p, "utf-8").trim();
  if (!raw) return [];
  const out: LeaderboardEntry[] = [];
  for (const line of raw.split("\n")) {
    const t = line.trim();
    if (!t) continue;
    try {
      out.push(JSON.parse(t) as LeaderboardEntry);
    } catch {
      // Skip malformed lines silently in UI; runner is the authority.
    }
  }
  return out;
}

/** Reduce: latest-best per slice_id (highest total_score; ties → later iteration). */
export function reduceLatestBest(entries: LeaderboardEntry[]): LeaderboardEntry[] {
  const perSlice = new Map<string, LeaderboardEntry>();
  for (const e of entries) {
    const cur = perSlice.get(e.slice_id);
    if (
      !cur ||
      e.total_score > cur.total_score ||
      (e.total_score === cur.total_score && e.iteration > cur.iteration)
    ) {
      perSlice.set(e.slice_id, e);
    }
  }
  return Array.from(perSlice.values());
}

const FEEDBACK_PATH =
  "/opt/magic/collect-hq/strategy/autoresearch-leaderboard-feedback.jsonl";

export type FeedbackEntry = {
  voter: string;
  candidate_id: string;
  vote: "ship" | "needs-work" | "no";
  note?: string;
  source_route?: string;
  ts: string;
};

export function loadFeedback(): Map<string, FeedbackEntry["vote"]> {
  const out = new Map<string, FeedbackEntry["vote"]>();
  if (!fs.existsSync(FEEDBACK_PATH)) return out;
  try {
    const raw = fs.readFileSync(FEEDBACK_PATH, "utf-8").trim();
    if (!raw) return out;
    for (const line of raw.split("\n")) {
      try {
        const e = JSON.parse(line) as FeedbackEntry;
        out.set(e.candidate_id, e.vote);
      } catch {
        /* skip */
      }
    }
  } catch {
    /* skip */
  }
  return out;
}

export type SortKey =
  | "total_score"
  | "trigger"
  | "icp_archetype"
  | "tier"
  | "iteration"
  | "last_updated";

export type SortDir = "asc" | "desc";

export function sortEntries(
  entries: LeaderboardEntry[],
  key: SortKey,
  dir: SortDir
): LeaderboardEntry[] {
  const sign = dir === "asc" ? 1 : -1;
  const cmp = (a: LeaderboardEntry, b: LeaderboardEntry): number => {
    switch (key) {
      case "total_score":
        return sign * (a.total_score - b.total_score);
      case "trigger":
        return sign * a.trigger.localeCompare(b.trigger);
      case "icp_archetype":
        return sign * a.icp_archetype.localeCompare(b.icp_archetype);
      case "tier":
        return sign * a.tier.localeCompare(b.tier);
      case "iteration":
        return sign * (a.iteration - b.iteration);
      case "last_updated":
        return sign * a.ts.localeCompare(b.ts);
    }
  };
  return [...entries].sort(cmp);
}

export type Filters = {
  scoreMin?: number;
  triggers?: string[];
  archetypes?: string[];
  tiers?: string[];
};

export function applyFilters(
  entries: LeaderboardEntry[],
  f: Filters
): LeaderboardEntry[] {
  return entries.filter((e) => {
    if (f.scoreMin != null && e.total_score < f.scoreMin) return false;
    if (f.triggers && f.triggers.length > 0 && !f.triggers.includes(e.trigger))
      return false;
    if (
      f.archetypes &&
      f.archetypes.length > 0 &&
      !f.archetypes.includes(e.icp_archetype)
    )
      return false;
    if (f.tiers && f.tiers.length > 0 && !f.tiers.includes(e.tier)) return false;
    return true;
  });
}

/** Approx state file count for the empty state. */
export function stateProgressCount(): { in_progress: number; completed: number } {
  const STATE_PATH = "/opt/magic/collect-hq/strategy/autoresearch-state.jsonl";
  if (!fs.existsSync(STATE_PATH)) return { in_progress: 0, completed: 0 };
  try {
    const raw = fs.readFileSync(STATE_PATH, "utf-8").trim();
    if (!raw) return { in_progress: 0, completed: 0 };
    let inProgress = 0;
    let completed = 0;
    const seen = new Map<string, string>();
    for (const line of raw.split("\n")) {
      try {
        const e = JSON.parse(line);
        seen.set(e.slice_id, e.status);
      } catch {
        /* skip */
      }
    }
    for (const status of seen.values()) {
      if (status === "in-progress") inProgress += 1;
      else if (
        status === "threshold-hit" ||
        status === "max-iterations" ||
        status === "plateaued"
      )
        completed += 1;
    }
    return { in_progress: inProgress, completed };
  } catch {
    return { in_progress: 0, completed: 0 };
  }
}

const ALLOWED_TAGS = new Set([
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "ul",
  "ol",
  "li",
  "a",
  "strong",
  "em",
  "br",
  "span",
  "div",
  "blockquote",
]);

/** Conservative server-side sanitizer. Strips scripts/iframes/event handlers/inline styles. */
export function sanitizeBodyHtml(html: string): string {
  let out = html;
  // Strip whole tags we never want
  out = out.replace(
    /<(script|iframe|object|embed|style|link|meta)[\s\S]*?<\/\1>/gi,
    ""
  );
  out = out.replace(/<(script|iframe|object|embed|style|link|meta)[^>]*\/?>/gi, "");
  // Strip on* attributes and inline styles and javascript: URLs
  out = out.replace(/\s+on[a-z]+\s*=\s*"[^"]*"/gi, "");
  out = out.replace(/\s+on[a-z]+\s*=\s*'[^']*'/gi, "");
  out = out.replace(/\s+style\s*=\s*"[^"]*"/gi, "");
  out = out.replace(/\s+style\s*=\s*'[^']*'/gi, "");
  out = out.replace(/javascript:/gi, "");
  // Strip tags not in allow-list
  out = out.replace(/<\/?([a-zA-Z0-9]+)([^>]*)>/g, (m, tag, rest) => {
    if (ALLOWED_TAGS.has(String(tag).toLowerCase())) {
      // For <a>, restrict attrs to href-only (and class)
      if (String(tag).toLowerCase() === "a") {
        const hrefMatch = String(rest).match(/href\s*=\s*"([^"]*)"/i);
        const classMatch = String(rest).match(/class\s*=\s*"([^"]*)"/i);
        const safeAttrs: string[] = [];
        if (hrefMatch) safeAttrs.push(`href="${hrefMatch[1]}"`);
        if (classMatch) safeAttrs.push(`class="${classMatch[1]}"`);
        return m.startsWith("</") ? "</a>" : `<a ${safeAttrs.join(" ")}>`;
      }
      // Strip all attrs except class
      const classMatch = String(rest).match(/class\s*=\s*"([^"]*)"/i);
      const cls = classMatch ? ` class="${classMatch[1]}"` : "";
      return m.startsWith("</") ? `</${tag}>` : `<${tag}${cls}>`;
    }
    return "";
  });
  return out;
}
