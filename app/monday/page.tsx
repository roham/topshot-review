"use client";

// Monday May 5 — Email program review session
// Three decisions: copy direction, trigger priority, engineering authorization.

export default function MondayPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col px-4 py-10">
      <div className="max-w-2xl mx-auto w-full">

        {/* Header */}
        <div className="text-[10px] uppercase tracking-[0.22em] text-flame-400 font-semibold">
          NBA Top Shot · Email Program · May 5 Review
        </div>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink-50 text-balance">
          Three decisions before we ship.
        </h1>
        <p className="mt-3 text-[14px] text-ink-400 leading-relaxed">
          The copy is done. The first three triggers are scoped. The engineering work is ~22 hours. Monday is about alignment, not discovery — we walk out with a sprint authorized or the blockers named.
        </p>

        {/* Decision 1 */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-flame-500/20 text-flame-400 text-[13px] font-bold flex items-center justify-center flex-shrink-0">1</span>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-ink-500 font-semibold">Decision 1</div>
              <div className="text-[15px] font-semibold text-ink-100">Does the copy direction feel right?</div>
            </div>
          </div>
          <div className="px-6 py-5">
            <p className="text-[13px] text-ink-400 leading-relaxed mb-4">
              Six hand-crafted emails — zero generated content. One shell, real player names, real serial numbers, real market data. Bread-and-butter e-commerce structure. Do these look like emails you&apos;d send?
            </p>
            <a
              href="/specimens"
              className="inline-flex items-center gap-2 bg-flame-500 hover:bg-flame-600 text-white rounded-lg px-5 py-3 text-[13px] font-semibold transition-colors"
            >
              Review the 6 specimens →
            </a>
            <p className="mt-3 text-[11px] text-ink-600">
              Abandoned Cart · Drop Announcement · Welcome · Pack Received · Reactivation · Fast Break
            </p>
          </div>
        </div>

        {/* Decision 2 */}
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-flame-500/20 text-flame-400 text-[13px] font-bold flex items-center justify-center flex-shrink-0">2</span>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-ink-500 font-semibold">Decision 2</div>
              <div className="text-[15px] font-semibold text-ink-100">Are these the right first three triggers?</div>
            </div>
          </div>
          <div className="px-6 py-5 space-y-4">

            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-mint-400 font-semibold mb-1">Ship first · ~4h engineering</div>
                  <div className="text-[14px] font-semibold text-ink-100">Drop Announcement</div>
                  <p className="mt-1 text-[12px] text-ink-400 leading-relaxed">
                    Sent when a drop contains Moments from a set you&apos;re partially collecting. Every variable is knowable when Guy/Sam configure the drop — no real-time query at send time.
                  </p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
                <div className="rounded-lg bg-white/[0.03] border border-white/10 px-3 py-2">
                  <div className="text-ink-500">New data</div>
                  <div className="text-ink-200 font-medium">Drop config push</div>
                </div>
                <div className="rounded-lg bg-white/[0.03] border border-white/10 px-3 py-2">
                  <div className="text-ink-500">Real-time?</div>
                  <div className="text-mint-400 font-medium">No — pre-push</div>
                </div>
                <div className="rounded-lg bg-white/[0.03] border border-white/10 px-3 py-2">
                  <div className="text-ink-500">Test case</div>
                  <div className="text-ink-200 font-medium">Next partial-set drop</div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold mb-1">Ship second · ~6h engineering</div>
              <div className="text-[14px] font-semibold text-ink-100">Fast Break Result</div>
              <p className="mt-1 text-[12px] text-ink-400 leading-relaxed">
                Sent after each slate to users who missed the next prize tier by ≤20 points. One new variable: the counterfactual Moment (best player not in their lineup). Calculated from existing scorecard data.
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
                <div className="rounded-lg bg-white/[0.03] border border-white/10 px-3 py-2">
                  <div className="text-ink-500">New data</div>
                  <div className="text-ink-200 font-medium">Post-slate push</div>
                </div>
                <div className="rounded-lg bg-white/[0.03] border border-white/10 px-3 py-2">
                  <div className="text-ink-500">Real-time?</div>
                  <div className="text-mint-400 font-medium">No — post-resolve</div>
                </div>
                <div className="rounded-lg bg-white/[0.03] border border-white/10 px-3 py-2">
                  <div className="text-ink-500">Test case</div>
                  <div className="text-ink-200 font-medium">Next Fast Break slate</div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="text-[10px] uppercase tracking-wider text-rose-400 font-semibold mb-1">Ship third · ~12h engineering</div>
              <div className="text-[14px] font-semibold text-ink-100">Reactivation</div>
              <p className="mt-1 text-[12px] text-ink-400 leading-relaxed">
                Sent weekly to dormant collectors (last active &gt;30 days) when the number of completeable set slots has increased since they left. Requires a nightly BQ batch job — the hardest variable is the delta.
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
                <div className="rounded-lg bg-white/[0.03] border border-white/10 px-3 py-2">
                  <div className="text-ink-500">New data</div>
                  <div className="text-ink-200 font-medium">Nightly BQ batch</div>
                </div>
                <div className="rounded-lg bg-white/[0.03] border border-white/10 px-3 py-2">
                  <div className="text-ink-500">Real-time?</div>
                  <div className="text-rose-400 font-medium">No — nightly batch</div>
                </div>
                <div className="rounded-lg bg-white/[0.03] border border-white/10 px-3 py-2">
                  <div className="text-ink-500">Test case</div>
                  <div className="text-ink-200 font-medium">30d dormant + delta &gt; 0</div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-amber-500/[0.06] border border-amber-500/20 p-4">
              <div className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold mb-1">One question blocks sprint start</div>
              <p className="text-[12px] text-ink-300 leading-relaxed">
                <strong className="text-ink-100">Pre-compute + push vs. real-time data block?</strong> Option 1: every variable lives in the user&apos;s CIO profile, resolved at send time (what these specs assume). Option 2: Liquid calls a Magic-side endpoint at send time. This decision needs to come out of Monday. Engineering (Ralf/Sid) owns the answer.
              </p>
            </div>

          </div>
        </div>

        {/* Decision 3 */}
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-flame-500/20 text-flame-400 text-[13px] font-bold flex items-center justify-center flex-shrink-0">3</span>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-ink-500 font-semibold">Decision 3</div>
              <div className="text-[15px] font-semibold text-ink-100">Authorize the sprint?</div>
            </div>
          </div>
          <div className="px-6 py-5">
            <div className="rounded-xl border border-mint-500/30 bg-mint-500/[0.04] p-4 mb-4">
              <div className="flex items-end gap-4">
                <div>
                  <div className="text-[11px] text-ink-500 uppercase tracking-wider font-semibold">Total engineering</div>
                  <div className="text-3xl font-bold text-ink-50 mt-1">~22h</div>
                  <div className="text-[12px] text-ink-400 mt-0.5">across three triggers</div>
                </div>
                <div className="text-[12px] text-ink-400 leading-relaxed">
                  4h (Drop-Announcement) + 6h (Fast Break) + 12h (Reactivation). The copy is done. The segments are defined. The variable resolution is the only open question.
                </div>
              </div>
            </div>
            <p className="text-[12.5px] text-ink-400 leading-relaxed">
              If copy direction is right (Decision 1) and trigger sequence is right (Decision 2), the ask is to authorize Ralf/Sid to scope and start. Dan owns the CIO send authorization gate — that&apos;s the one thing engineering can&apos;t unblock themselves.
            </p>
          </div>
        </div>

        {/* Footer links */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-ink-600">
          <a href="/specimens" className="hover:text-ink-400 transition-colors">Email specimens →</a>
          <a href="/review" className="hover:text-ink-400 transition-colors">Original review deck →</a>
          <a href="/" className="hover:text-ink-400 transition-colors">Home</a>
        </div>

      </div>
    </div>
  );
}
