import {
  loadAllEntries,
  reduceLatestBest,
  loadFeedback,
  sortEntries,
  applyFilters,
  sanitizeBodyHtml,
  stateProgressCount,
  type SortKey,
  type SortDir,
} from "@/lib/leaderboard";
import { LeaderboardCard } from "@/components/LeaderboardCard";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const TRIGGERS = [
  "welcome",
  "pack-received",
  "pack-pull-recap",
  "drop-announcement",
  "fast-break",
  "abandoned-cart",
  "reactivation",
];
const ARCHETYPES = ["industry-watcher", "gambler-collector", "status", "documentarian"];
const TIERS = ["L0-L1", "L2-L3", "L4+", "dormant"];

type SearchParams = {
  sort?: string;
  dir?: string;
  score?: string;
  trigger?: string;
  archetype?: string;
  tier?: string;
  page?: string;
  perPage?: string;
};

function parseList(v: string | undefined): string[] | undefined {
  if (!v) return undefined;
  return v.split(",").map((s) => s.trim()).filter(Boolean);
}

function chipUrl(
  current: SearchParams,
  key: keyof SearchParams,
  value: string,
  multi: boolean
): string {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(current)) {
    if (v) params.set(k, String(v));
  }
  if (multi) {
    const cur = parseList(current[key] as string | undefined) ?? [];
    const next = cur.includes(value)
      ? cur.filter((x) => x !== value)
      : [...cur, value];
    if (next.length === 0) params.delete(key);
    else params.set(key, next.join(","));
  } else {
    if (current[key] === value) params.delete(key);
    else params.set(key, value);
  }
  const s = params.toString();
  return s ? `/showcase?${s}` : "/showcase";
}

function chipActive(current: SearchParams, key: keyof SearchParams, value: string, multi: boolean): boolean {
  if (multi) {
    return (parseList(current[key] as string | undefined) ?? []).includes(value);
  }
  return current[key] === value;
}

export default async function ShowcasePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sortKey = (searchParams.sort ?? "total_score") as SortKey;
  const sortDir = (searchParams.dir ?? "desc") as SortDir;
  const scoreMin = searchParams.score ? Number(searchParams.score) : undefined;
  const triggers = parseList(searchParams.trigger);
  const archetypes = parseList(searchParams.archetype);
  const tiers = parseList(searchParams.tier);
  const perPage = Math.max(1, Math.min(200, Number(searchParams.perPage ?? 20)));
  const page = Math.max(1, Number(searchParams.page ?? 1));

  const all = loadAllEntries();
  const reduced = reduceLatestBest(all);
  const feedback = loadFeedback();

  const filtered = applyFilters(reduced, {
    scoreMin,
    triggers,
    archetypes,
    tiers,
  }).filter((e) => feedback.get(e.candidate_id) !== "no");

  const sorted = sortEntries(filtered, sortKey, sortDir);

  const totalCount = sorted.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / perPage));
  const pageEntries = sorted.slice((page - 1) * perPage, page * perPage);

  const progress = stateProgressCount();
  const isEmpty = all.length === 0;

  return (
    <main className="min-h-[100dvh] px-4 sm:px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <div className="text-[10px] uppercase tracking-[0.22em] text-flame-400 font-semibold">
            NBA Top Shot · Autoresearch
          </div>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink-50">
            /showcase — Leaderboard
          </h1>
          <p className="mt-1 text-[13px] text-ink-400">
            17-dim scored drafts, reduced to top-1-per-slice. Vote ship / needs-work /
            no — feeds back into the runner.
          </p>
          <div className="mt-2 text-[11px] text-ink-500 font-mono">
            entries={all.length} · slices={reduced.length} · in-progress={progress.in_progress} · completed={progress.completed}
          </div>
        </header>

        {/* Filter chips */}
        <section className="mb-4 space-y-2">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-[10px] uppercase tracking-wider text-ink-500 mr-1">
              Score
            </span>
            {[
              { v: 80, label: "≥80 Roham-tomorrow" },
              { v: 75, label: "≥75 Leaderboard" },
              { v: 60, label: "≥60 Recorded" },
            ].map((c) => (
              <a
                key={c.v}
                href={chipUrl(searchParams, "score", String(c.v), false)}
                className={`text-[11px] rounded-full px-3 py-1 border transition ${
                  chipActive(searchParams, "score", String(c.v), false)
                    ? "bg-flame-500/20 border-flame-500/60 text-flame-200"
                    : "bg-white/[0.02] border-white/10 text-ink-300 hover:border-white/30"
                }`}
              >
                {c.label}
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-[10px] uppercase tracking-wider text-ink-500 mr-1">
              Trigger
            </span>
            {TRIGGERS.map((t) => (
              <a
                key={t}
                href={chipUrl(searchParams, "trigger", t, true)}
                className={`text-[11px] rounded-full px-2.5 py-1 border transition font-mono ${
                  chipActive(searchParams, "trigger", t, true)
                    ? "bg-sky-500/20 border-sky-500/60 text-sky-200"
                    : "bg-white/[0.02] border-white/10 text-ink-300 hover:border-white/30"
                }`}
              >
                {t}
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-[10px] uppercase tracking-wider text-ink-500 mr-1">
              Archetype
            </span>
            {ARCHETYPES.map((a) => (
              <a
                key={a}
                href={chipUrl(searchParams, "archetype", a, true)}
                className={`text-[11px] rounded-full px-2.5 py-1 border transition font-mono ${
                  chipActive(searchParams, "archetype", a, true)
                    ? "bg-violet-500/20 border-violet-500/60 text-violet-200"
                    : "bg-white/[0.02] border-white/10 text-ink-300 hover:border-white/30"
                }`}
              >
                {a}
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-[10px] uppercase tracking-wider text-ink-500 mr-1">
              Tier
            </span>
            {TIERS.map((t) => (
              <a
                key={t}
                href={chipUrl(searchParams, "tier", t, true)}
                className={`text-[11px] rounded-full px-2.5 py-1 border transition font-mono ${
                  chipActive(searchParams, "tier", t, true)
                    ? "bg-amber-500/20 border-amber-500/60 text-amber-200"
                    : "bg-white/[0.02] border-white/10 text-ink-300 hover:border-white/30"
                }`}
              >
                {t}
              </a>
            ))}
          </div>
        </section>

        {/* Sort controls */}
        <section className="mb-6 flex flex-wrap gap-2 items-center text-[11px]">
          <span className="uppercase tracking-wider text-ink-500 mr-1">Sort</span>
          {(["total_score", "trigger", "icp_archetype", "tier", "iteration", "last_updated"] as SortKey[]).map(
            (k) => {
              const active = sortKey === k;
              const nextDir: SortDir = active && sortDir === "desc" ? "asc" : "desc";
              const params = new URLSearchParams();
              for (const [pk, pv] of Object.entries(searchParams)) {
                if (pv) params.set(pk, String(pv));
              }
              params.set("sort", k);
              params.set("dir", nextDir);
              return (
                <a
                  key={k}
                  href={`/showcase?${params.toString()}`}
                  className={`rounded-lg px-2 py-1 border transition ${
                    active
                      ? "bg-flame-500/15 border-flame-500/50 text-flame-200"
                      : "bg-white/[0.02] border-white/10 text-ink-300 hover:border-white/30"
                  }`}
                >
                  {k} {active ? (sortDir === "desc" ? "↓" : "↑") : ""}
                </a>
              );
            }
          )}
        </section>

        {isEmpty ? (
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/[0.04] p-6 text-[13px] text-ink-200">
            <div className="text-[10.5px] uppercase tracking-wider text-amber-400 font-semibold mb-2">
              Empty leaderboard
            </div>
            <p>
              Autoresearch runner is warming up. First slice typically completes in
              30–45 minutes.
            </p>
            <p className="mt-2 font-mono text-[11.5px] text-ink-400">
              State file: /opt/magic/collect-hq/strategy/autoresearch-state.jsonl —
              in-progress: {progress.in_progress}, completed: {progress.completed}
            </p>
          </div>
        ) : (
          <>
            <div className="text-[11px] text-ink-500 mb-3 font-mono">
              {totalCount} cards (page {page}/{totalPages})
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {pageEntries.map((e) => (
                <LeaderboardCard
                  key={e.candidate_id}
                  entry={e}
                  bodyHtmlSanitized={sanitizeBodyHtml(e.draft.body_html || "")}
                  initialVote={feedback.get(e.candidate_id) ?? null}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav className="mt-6 flex items-center justify-center gap-2 text-[11px]">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                  const params = new URLSearchParams();
                  for (const [pk, pv] of Object.entries(searchParams)) {
                    if (pv) params.set(pk, String(pv));
                  }
                  params.set("page", String(p));
                  return (
                    <a
                      key={p}
                      href={`/showcase?${params.toString()}`}
                      className={`rounded px-2 py-1 border transition ${
                        p === page
                          ? "bg-flame-500 text-white border-flame-500"
                          : "bg-white/[0.02] border-white/10 text-ink-300 hover:border-white/30"
                      }`}
                    >
                      {p}
                    </a>
                  );
                })}
              </nav>
            )}
          </>
        )}

        <footer className="mt-12 text-center text-[10.5px] text-ink-500">
          /showcase · spec /opt/magic/collect-hq/strategy/2026-05-04-autoresearch-leaderboard-spec.md
        </footer>
      </div>
    </main>
  );
}
