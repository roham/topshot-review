// lib/foundations.ts — Email Foundations swarm output, swipe-deck cards.
//
// 8 docs from the six-stage email-marketing-foundations swarm. Each card =
// one document. Voter swipes ship / needs-work / no on the work itself.
// Full markdown lives at collect-hq.vercel.app/email-foundations/[slug].

export type FoundationsCategory = "canonical" | "stage" | "audit";

export type FoundationsCard = {
  id: string;
  category: FoundationsCategory;
  badge: string;
  title: string;
  hook: string;        // one-sentence elevator
  keyFindings: string[]; // 3-5 bullets
  stats?: { label: string; value: string }[];
  reviewerAsk: string;
  fullReadHref: string; // link to full markdown on collect-hq
  wordCount: number;
};

export const FOUNDATIONS_CARDS: FoundationsCard[] = [
  // ─── CANONICAL — read these first ────────────────────────────────────────
  {
    id: "F-CANONICAL-ACTION-PLAN",
    category: "canonical",
    badge: "READY FOR TEAM REVIEW",
    title: "NBA Top Shot Email Program — Canonical Action Plan",
    hook:
      "Three archetypes, three journeys, three waves, six decisions that unlock them. F-SINBAD-268 shape — pod ownership, dependency-gated waves, copy specimens inline.",
    keyFindings: [
      "Wave 1 ships now — needs nothing but voice-corpus assembly + warm-whale BQ query (we already have BQ access)",
      "Wave 2 needs Phase 2 CIO send authorization + 1 Engineering sprint for ledger sync",
      "Wave 3 needs Roham sign-off on the Honest Reckoning send to Underwater dormant — founder-voice, zero purchase CTA, trust rebuild only",
      "ROI basis (bottom-up from bible benchmarks): $8.75K–$11.25K Documentarian per wave + $5.56K/wk Gambler-Collector recoverable + $3.36K/wk Status",
      "L1 collectors are NOT in scope until Wave 3 proves the model — no spray-and-pray",
    ],
    stats: [
      { label: "Pods named", value: "6" },
      { label: "Compliance gates", value: "9" },
      { label: "Copy specimens", value: "3" },
    ],
    reviewerAsk:
      "Ship = approve the plan, authorize Wave 1. Needs-work = priorities/copy/cadence wrong. No = reject this architecture, restart.",
    fullReadHref:
      "https://collect-hq.vercel.app/email-foundations/canonical-action-plan",
    wordCount: 3112,
  },
  {
    id: "F-VOICE-AB-TEST",
    category: "canonical",
    badge: "A/B TEST SPEC",
    title: "Voice Register A/B Test — Camp 132 (collector-insider) vs Camp 163 (retail)",
    hook:
      "The 3× CTR voice claim has 4 confounds (list, subject, time, trigger type). This spec controls all 4 to isolate register as the variable. 1.5× threshold @ 90% confidence.",
    keyFindings: [
      "Test subject: Cade Cunningham — best current candidate (active playoff narrative + cohort size)",
      "Treatment = Camp 132 collector-insider register; Control = Camp 163 retail register",
      "Same send time, same list, same trigger, same subject formula — only register varies",
      "500+ recipients per variant for statistical significance, 1 week minimum live data",
      "Decision tree for post-test: confirms voice as primary lever vs flags list/timing/trigger as actual driver",
    ],
    stats: [
      { label: "Confidence", value: "90%" },
      { label: "Lift threshold", value: "1.5×" },
      { label: "Per variant", value: "≥500" },
    ],
    reviewerAsk:
      "Ship = approve test design as-is. Needs-work = thresholds or test subject wrong. No = the voice claim isn't worth testing.",
    fullReadHref:
      "https://collect-hq.vercel.app/email-foundations/voice-register-ab-test",
    wordCount: 2050,
  },

  // ─── STAGE 3 — the plugin-validated work ────────────────────────────────
  {
    id: "F-STAGE3-VALIDATED-FRAME",
    category: "stage",
    badge: "STAGE 3 — VALIDATED COMBINED FRAME",
    title: "Stage 3 — Plugin-Validated Persona-and-Frame (the signed-off doc)",
    hook:
      "Six dapper-cmo plugins actually loaded via Skill tool. 12-claim verdict grid. CMO modifications applied inline. THIS is what Stage 4 builds on — not Stages 1+2 separately.",
    keyFindings: [
      "Wave-1 priority order MODIFIED: Documentarian × L4+ Dormant Positive-Math promoted to #1 (per-collector LTV/CAC math); Pack-Received Status × L2-L3 to #2",
      "Industry Watcher × L1 hand-off to trust-architecture (NOT email) — lawsuit-settlement-as-first-Google-result is credibility infrastructure",
      "Documentarian × L4+ Dormant: 1,164 collectors holding $244.8M lifetime GMV with zero programmatic outreach today",
      "Cadence FLAG: 2-3/wk during playoffs sits at edge of 46% opt-out elastic zone; instrument unsubscribe-by-archetype tracking before scaling",
      "Win-back-at-60-90d does NOT translate to Underwater (bible-break confirmed) — needs trust-architecture inversion",
    ],
    stats: [
      { label: "Plugins invoked", value: "6" },
      { label: "Verdict grid", value: "6C/4M/2F/0R" },
      { label: "Words", value: "9,200" },
    ],
    reviewerAsk:
      "Ship = the framework holds, Stage 4 may proceed. Needs-work = specific verdicts wrong. No = the framework doesn't hold under CMO scrutiny.",
    fullReadHref:
      "https://collect-hq.vercel.app/email-foundations/stage3-validated-combined-frame",
    wordCount: 9200,
  },
  {
    id: "F-STAGE3-MEMO",
    category: "stage",
    badge: "STAGE 3 — CMO VALIDATION MEMO",
    title: "Stage 3 — CMO Validation Memo (audit trail + plugin-invocation log)",
    hook:
      "The audit-trail counterpart to the validated frame. Plugin-by-plugin: what I asked, what it returned, how I applied it. The 12-claim verdict grid lives here.",
    keyFindings: [
      "Plugin-invocation log proves the 6 dapper-cmo plugins were actually loaded (cmo router / lifecycle-marketing / loyalty-systems / trust-architecture / narrative-design / campaign-economics)",
      "Each verdict cites the plugin lens it was reasoned through — e.g. claim (e) cites campaign-economics LTV/CAC math, claim (f) cites trust-architecture Yotta lesson",
      "MODIFY verdicts: voice-register lever (3× number not yet attribution-clean), T+15min→T+2h timing floor, Wave-1 priority swap, challenge as streak/loyalty register",
      "FLAG verdicts: cadence ceiling near opt-out cliff, XL whale concierge channel choice",
      "0 REJECT — the Stage 1+2 framework holds under plugin scrutiny",
    ],
    stats: [
      { label: "Plugins invoked", value: "6" },
      { label: "Claims tested", value: "12" },
      { label: "REJECT count", value: "0" },
    ],
    reviewerAsk:
      "Ship = audit trail is sound. Needs-work = specific plugin reasoning weak. No = the plugin invocations look fake.",
    fullReadHref:
      "https://collect-hq.vercel.app/email-foundations/stage3-cmo-validation-memo",
    wordCount: 6500,
  },

  // ─── STAGES 1, 2, 4 — the chain of reasoning ────────────────────────────
  {
    id: "F-STAGE1-PERSONAS",
    category: "stage",
    badge: "STAGE 1 — PERSONA SYNTHESIS",
    title: "Stage 1 — Six Canonical Archetypes from Existing Top Shot Substrate",
    hook:
      "4-behavioral × 6-tier ladder cross. NOT new personas — synthesis of existing collect-hq/content/personas + intelligence dossiers. Citation-rich, every claim sourced.",
    keyFindings: [
      "Documentarian × L4+ XL — active + dormant-positive-math — the highest per-collector LTV cohort",
      "Gambler-Collector × L2-L3 active — abandoned-cart psychology, opportunity-triggered emails",
      "Status × L1-L2 — cold lapsed reactivation pool (caveat: Industry Watcher hand-off needed for L0-L1)",
      "Industry Watcher × L0-L1 — informed observer, pre-conversion (Stage 3 surfaces email is wrong channel for this archetype)",
      "Dormant L+XL Positive-Math (~350-450) AND Underwater (~480 do-no-harm) split into separate canonical archetypes",
    ],
    stats: [
      { label: "Archetypes", value: "6" },
      { label: "Confidence high", value: "3 archetypes" },
      { label: "Words", value: "8,000" },
    ],
    reviewerAsk:
      "Ship = the archetypes are right and the cross is the right framing. Needs-work = some archetypes off. No = the framework is wrong.",
    fullReadHref:
      "https://collect-hq.vercel.app/email-foundations/stage1-persona-synthesis",
    wordCount: 8000,
  },
  {
    id: "F-STAGE2-FRAME",
    category: "stage",
    badge: "STAGE 2 — STRATEGIC FRAME",
    title: "Stage 2 — Bible-Grounded Lifecycle × Cadence × Pillars × KPI Mapping",
    hook:
      "Email-marketing-bible vertical knowledge applied to Top Shot. 13 lifecycle stages mapped to archetypes. Cadence matrix per channel. KPI framework with explicit 'open rate is not primary' stance.",
    keyFindings: [
      "Five bible-fits: engagement-tier sending, click-primacy under MPP, cart-abandonment psychology, transactional-as-brand-moment, voice-as-conversion",
      "Three bible-breaks: BFCM cadence (use playoff cycle), ecommerce-DTC revenue benchmarks (whale economy is different), win-back-at-60-90d (dangerous against Underwater)",
      "Cadence ceiling: 2-3/wk during playoffs (Active), 1/wk off-season; Underwater quarterly max; XL concierge 1:few not bulk-template",
      "Deliverability constraints: post-Feb-2024 Google/Yahoo + post-May-2025 Microsoft + Apple MPP + Sept-2025 Gmail Promotions ranking + Nov-2025 SNDS",
      "30-40% of Top Shot's list plausibly Outlook/Hotmail/Live — the deliverability cliff under post-May-2025 rules",
    ],
    stats: [
      { label: "Lifecycle stages", value: "13" },
      { label: "Content pillars", value: "7" },
      { label: "Words", value: "8,400" },
    ],
    reviewerAsk:
      "Ship = the bible adapts cleanly to Top Shot. Needs-work = cadence or KPI framework off. No = the bible doesn't fit collectibles.",
    fullReadHref:
      "https://collect-hq.vercel.app/email-foundations/stage2-strategic-frame",
    wordCount: 8400,
  },
  {
    id: "F-STAGE4-FLOWS",
    category: "stage",
    badge: "STAGE 4 — FLOW MAPS",
    title: "Stage 4 — Per-Archetype CIO Journey Maps",
    hook:
      "Three Phase-1 archetype flows: Documentarian dormant reactivation (3 emails), Gambler-Collector abandoned-cart (2 emails), Status Seeker engagement nurture (2 emails). Branch logic + exit conditions inline.",
    keyFindings: [
      "Documentarian E1 = Portfolio Anchor (D+0); E2 = Documentary System (D+7); E3 = Honest Reckoning (D+14, Phase 3 only, founder-voice, zero CTA)",
      "Gambler-Collector E1 = Market Signal (T+2h after game event — NOT T+15min, that reads as surveillance); E2 = Scarcity Update (T+12h); hard exit T+24h",
      "Status Seeker E1 = Social Proof Context (Wed 10am); E2 = Thesis Play (T+24h after E1 click only)",
      "Cross-archetype rules: T+2h floor on event triggers, single CTA per email, challenge-activation as streak/loyalty register (Duolingo-style not generic notification)",
      "Subject-line A/B variants embedded inline (2 variants per A/B-tested email)",
    ],
    stats: [
      { label: "Archetypes", value: "3" },
      { label: "Total emails", value: "7" },
      { label: "A/B subject pairs", value: "5" },
    ],
    reviewerAsk:
      "Ship = the journeys are right and the branch logic holds. Needs-work = specific emails wrong. No = restart flow design.",
    fullReadHref:
      "https://collect-hq.vercel.app/email-foundations/stage4-flow-maps",
    wordCount: 4200,
  },

  // ─── AUDIT — the superseded strawman ────────────────────────────────────
  {
    id: "F-STAGE3-STRAWMAN",
    category: "audit",
    badge: "AUDIT — SUPERSEDED",
    title: "Stage 3 — Strawman (unvalidated, superseded for audit)",
    hook:
      "Earlier Stage 3 draft from a prior agent overrun. Frontmatter claimed plugin invocation, but only 3 plugin mentions in 3.5K words = not actually loaded. Preserved for audit only.",
    keyFindings: [
      "Why it's quarantined: plugin invocation was claimed in frontmatter, not actually performed",
      "Replaced by: validated combined frame + validation memo (the real Stage 3 above)",
      "H1-H5 verdict labels in this strawman differ from the real grid's a-l labels (caused citation bleed-through that was reconciled in Stage 4)",
      "Preserved because: audit trails matter; honest accounting is non-negotiable",
      "Do NOT cite as Stage 3 output — cite the validated combined frame and the memo instead",
    ],
    reviewerAsk:
      "Ship = audit trail handling is right. Needs-work = should have been deleted, not preserved. No = the audit-trail discipline is wrong.",
    fullReadHref:
      "https://collect-hq.vercel.app/email-foundations/stage3-strawman-superseded",
    wordCount: 3587,
  },
];
