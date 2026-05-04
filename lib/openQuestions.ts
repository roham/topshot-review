// lib/openQuestions.ts — Open Questions / Vote Cards (26 cards)
// Curated from: 2026-05-04-collect-hq-open-questions.md
// Decision-makers: Roham, Dan, Matt, Sam, Guy+Sam, Kenny, Engineering, Cross-product

export type DecisionMaker =
  | "Roham"
  | "Dan"
  | "Matt"
  | "Sam"
  | "Guy+Sam"
  | "Kenny"
  | "Engineering"
  | "Cross-product";

export type QuestionCard = {
  id: string;              // e.g. "Q-ROHAM-01"
  title: string;
  decisionMaker: DecisionMaker;
  question: string;
  context: string;
  consequenceOfYes: string;
  consequenceOfNo: string;
  consequenceOfDelay: string;
  linkedArtifactLabel: string;
  linkedArtifactSlug?: string; // slug for /strategy/<slug> reader page
  voteShape: string;       // human-readable vote options
  status: string;
};

export const OPEN_QUESTIONS: QuestionCard[] = [
  // ─── ROHAM ────────────────────────────────────────────────────────────────
  {
    id: "Q-ROHAM-01",
    title: "Approve the two-tier email split",
    decisionMaker: "Roham",
    question:
      "Yes / no / modify on the two-tier split: (a) Welcome / Pack Received / Abandoned Cart / Fast Break / Drop Announcement as TRANSACTIONAL tier (LLM-generated, auto-ship after rubric pass, human gate first 50 sends), (b) Reactivation as EDITORIAL tier (Sam W. authors prose, LLM does data + math + subject lines), (c) Whale-Tier Concierge as DEFERRED until 3 prerequisites unlock?",
    context:
      "Four iterations of the prior single-tier LLM-generation approach were rejected — the only outright 'ship' was Pack Received (the most transactional, least voice-load-bearing email). Industry data (200+ campaigns, ACM 2025 study, Skybox 63.6% benchmark) converges on the split. Roham's stated voice ratio (80–90% platform / 10–20% Magic personal) IS the split mathematically.",
    consequenceOfYes:
      "Wave 2B swarm fires (5 transactional drafts + 3 editorial reactivation segments + production-defect patches first). Day-30 review at rubric ≥80% pass + welcome CTR ≥10%. 78+ briefs in inventory begin moving through the new pipeline.",
    consequenceOfNo:
      "Iteration 5 follows the same architecture as iterations 1–4 → Wave 1B's evidence predicts rejection 5. Email program stays at 4.85% Camp 163 CTR vs. 13.24% Camp 132 baseline — 3,279 sends/month going through a broken funnel.",
    consequenceOfDelay:
      "Every week of delay = ~8,500 new signups going through Camp 163 (the broken welcome). At 8.54% dark-window D7 vs. 6.75% Camp 132 era, the broken welcome is plausibly suppressing conversion below absent-program baseline. Cost compounds with the playoff acquisition spike.",
    linkedArtifactLabel: "CMO Action Framework",
    linkedArtifactSlug: "cmo-action-framework",
    voteShape: "ship / needs-work / no + free text comment (modify-with-conditions OK)",
    status: "awaiting",
  },
  {
    id: "Q-ROHAM-02",
    title: "Authorize CIO Phase 2 send — Reactivation broadcast to dormant L+XL cohort",
    decisionMaker: "Roham",
    question:
      "Yes / no / modify on authorizing Customer.io broadcast send to the 1,164 dormant L+XL collectors (≥$100K lifetime, >60d dormant) for the Reactivation editorial tier?",
    context:
      "Three fully-written reactivation copy specimens exist (Segment A — Origin Story Holders; Segment B — Single-Star Believers; Segment C — Survivors) with a positive-math targeting appendix. They cannot be tested without send authorization. SoT GAP §7.4 names this as a governance gap, not a data gap.",
    consequenceOfYes:
      "A/B test of editorial-tier vs. LLM-control reactivation can run. Projected 35–70 reactivations in 14 days at 5% threshold = ~$105K–$168K immediate GMV; $1.4M LTV at 5% dormant-whale reactivation.",
    consequenceOfNo:
      "B-spine reactivation hypothesis is untestable. The 1,164 dormant cohort holding $244.8M historic GMV remains unaddressed by email. Fall-back: remove reactivation-via-email from Phase 3 and pivot to Matt's whale relationship layer + Slack-only distribution.",
    consequenceOfDelay:
      "Each week deferred = one more week of dormant-cohort decay (avg already 865 days since last purchase — ~2.4 years). Playoff narrative window (R1 → Finals June 24) is the highest-leverage reactivation moment; missing it pushes the test to a low-narrative window where the framework predicts lower lift.",
    linkedArtifactLabel: "Reactivation Copy Specimens",
    linkedArtifactSlug: "reactivation-real-specifics",
    voteShape: "ship / needs-work / no + free text comment",
    status: "awaiting (since 2026-05-03; second cycle without resolution)",
  },
  {
    id: "Q-ROHAM-03",
    title: "Greenlight the rewrite swarm (Phase 0 + Phase 1 exemplar corpus)",
    decisionMaker: "Roham",
    question:
      "Yes / no / modify on executing the 5-phase rewrite swarm as specified in 2026-05-04-rewrite-action-plan.md? If yes: Magic launches Phase 0 + Phase 1 immediately and routes the exemplar corpus to you within 24h.",
    context:
      "This is the operational swarm that executes the two-tier framework if Q-ROHAM-01 lands yes. The plan: (1) curate 10–15 exemplar corpus, (2) generate 5 transactional drafts in parallel, (3) assemble editorial Reactivation tier, (4) two-stage review gate, (5) BQ social proof injection + cards.ts patch. Whale-tier exits at Phase 0 with documented unblock list.",
    consequenceOfYes:
      "~5–6h swarm execution + 24h async for exemplar sign-off + 1 working day async for Sam W. editorial prose. ~$15–20 API cost. Deliverables: 5 transactional v2 drafts (cards.ts variants), 3 editorial reactivation segment drafts, 1 deferred-tier doc, 6 verification-gate artifacts, 1 review brief.",
    consequenceOfNo:
      "The framework approval (Q-ROHAM-01) lands without execution capacity — the work stalls at the spec layer. Alternative: hand-execute one card at a time, slower, no parallelism.",
    consequenceOfDelay:
      "Exemplar corpus assembly is the gate to all transactional drafts. Each day Roham doesn't sign off = one day Sam W.'s editorial prose work doesn't begin.",
    linkedArtifactLabel: "Rewrite Action Plan",
    linkedArtifactSlug: "feedback-pattern-analysis",
    voteShape: "ship / needs-work / no + free text comment",
    status: "awaiting",
  },
  {
    id: "Q-ROHAM-04",
    title: "Approve the v1004 whale-tier rebuild (supersede v1003 in cards.ts)",
    decisionMaker: "Roham",
    question:
      "Yes / no / modify on superseding v1003 whale-tier-concierge in lib/cards.ts with the v1004 rebuild (4 variants: v1001 baseline, Almanac, Cinematic, Brief)?",
    context:
      "Roham's verbatim verdict on v1003: \"Absolutely terrible. Totally misunderstands whale psychology. You should dump whatever approach it is that's leading you here, because it's not the correct one.\" The rebuild treats Marcus's specific Mitchell Pull-Up Three #2,418 (bought Jan 2024 at $112, floor today $245) as the spine, names Matt Schorr as the L+XL Desk officer of record, and routes reply to a real thread.",
    consequenceOfYes:
      "v1004 rendering on review surface; engineering pass on 5 new variables; A/B authorization decoupled from the broader Whale Phase 2 unlock. This unblocks the visual review of the concierge psychology.",
    consequenceOfNo:
      "v1003 stays on the review surface; the next iteration of whale-tier work has no canonical reference for 'what concierge looks like.' Risk: another rebuild cycle without resolution of the underlying psychology.",
    consequenceOfDelay:
      "Whale-tier was DEFERRED in the CMO framework on three prerequisites; the visual rebuild is logically prior to operational unblock. Without it, even when the data pipeline lands, there's no template to render into.",
    linkedArtifactLabel: "Whale Tier Rebuild Spec",
    linkedArtifactSlug: "collect-hq-design-system",
    voteShape: "ship / needs-work / no + free text comment",
    status: "awaiting",
  },
  {
    id: "Q-ROHAM-05",
    title: "Drop cadence: keep monthly batch model, or test alternative cadence?",
    decisionMaker: "Roham",
    question:
      "Should we (a) keep the monthly batch drop cadence as canonical and instrument measurement against the three-leg hypothesis, (b) test an alternative cadence (e.g., higher-frequency mini-drops) as the experimental arm, (c) defer until BQ + Frigga research closes? Multi-choice.",
    context:
      "Roham articulated the bet 2026-05-03: monthly batch → thematic set creation → set-completion psychology + temple event > cost of a month without new content. Three legs: curation quality, collector psychology, temple event. Frigga competitive scan confirms Legs 1 + 3, surfaces the unsolved between-drop collapse problem (Sorare evidence) and the announcement-day demand window (untapped).",
    consequenceOfYes:
      "(option a) BQ deep dive fires. Three-leg hypothesis becomes measurable. Cadence stays stable; only the measurement changes.",
    consequenceOfNo:
      "(delay) Three-leg hypothesis stays unvalidated; \"growth hasn't really moved\" remains the standing observation. Every drop cycle without measurement is a wasted signal.",
    consequenceOfDelay:
      "Three-leg hypothesis stays unvalidated; \"growth hasn't really moved\" remains the standing observation.",
    linkedArtifactLabel: "Drop Cadence Competitive Brief",
    linkedArtifactSlug: "collect-hq-roadmap",
    voteShape: "option-a / option-b / option-c-defer + free text comment",
    status: "awaiting (Roham's own bet — has not been re-engaged since 2026-05-03)",
  },
  {
    id: "Q-ROHAM-06",
    title: "Negative-math reactivation cohort (~480 collectors who bought near ATH) — what's the framing?",
    decisionMaker: "Roham",
    question:
      "For the ~480 dormant L+XL collectors whose lifetime math is negative (bought near 2021–2022 ATH, holdings now below acquisition cost), what's the right re-engagement framing? Multi-choice: (a) do not contact via email — protect the relationship, (b) contact with a non-portfolio angle (\"exciting platform things happening\"), (c) contact with documentary-frame messaging (\"you hold the document of [moment]; market is irrelevant\"), (d) hand off to Matt's relationship layer for human-touch outreach only.",
    context:
      "Reactivation copy specimens explicitly carry a 'DO NOT SEND' marker on the negative-math cohort. Roham's verbatim feedback: \"if the math isn't positive, don't try to spin it — pick a different angle or different cohort.\" Tester: \"I don't think the data will be favorable in this angle... Just say, 'Hey, you haven't logged in 1,000 days.' That's ridiculous.\" The framing decision is genuinely open.",
    consequenceOfYes:
      "(a) ~480 collectors stay dormant; trade-off is preserved trust, no recovery attempt. (b) Editorial Reactivation tier expands to a 4th segment (Segment D — Negative-Math). (c) Tests the Top Shot-as-document-of-history thesis on the cohort most likely to reject it. High-reward / high-risk. (d) Whale relationship layer expands to ~480 collectors; Matt's bandwidth becomes the binding constraint.",
    consequenceOfNo:
      "Negative-math cohort stays in DO NOT SEND indefinitely, which is a default to (a) without explicit decision.",
    consequenceOfDelay:
      "Negative-math cohort stays in DO NOT SEND indefinitely, which is a default to option (a) without explicit decision.",
    linkedArtifactLabel: "Reactivation Copy Specimens — DO NOT SEND section",
    linkedArtifactSlug: "reactivation-real-specifics",
    voteShape: "option-a / option-b / option-c / option-d + free text comment",
    status: "awaiting",
  },
  {
    id: "Q-ROHAM-07",
    title: "Sub-100 serial premium cliff: intentional design or product gap?",
    decisionMaker: "Roham",
    question:
      "Is the score/lottery distribution for sub-100 serials (the \"sub-100 serial premium cliff\") intentional product design, or is it a gap to fix?",
    context:
      "Sub-100 serials carry a steep premium relative to >100 serials in the same edition. Whether this is by design (scarcity-engineered) or emergent (a market quirk we haven't addressed) determines whether any drop-design or score-formula change should attempt to flatten or preserve the cliff.",
    consequenceOfYes:
      "(intentional) No action required; the cliff is a deliberate scarcity mechanism. Drop design preserves it; score formula respects it.",
    consequenceOfNo:
      "(gap) Product investigation required — score formula tweak, drop-design change, or marketplace mechanic to flatten the cliff.",
    consequenceOfDelay:
      "Every drop ships under uncertain treatment of the sub-100 band. Marketplace behavior on sub-100 is not currently modeled in any strategy doc.",
    linkedArtifactLabel: "Marketing Plan May 3–17 — Decisions still owed",
    linkedArtifactSlug: "collect-hq-kpis",
    voteShape: "intentional / gap-fix / needs-investigation + free text comment",
    status: "awaiting (since 2026-05-03)",
  },

  // ─── DAN ──────────────────────────────────────────────────────────────────
  {
    id: "Q-DAN-01",
    title: "Authorize Phase 2 GitHub Actions campaign approval pipeline",
    decisionMaker: "Dan",
    question:
      "Yes / no / modify on Phase 2 of the GitHub Actions pipeline — direct-send authority for pre-approved campaign types after merge, no manual CIO step?",
    context:
      "Phase 1 of the pipeline is the build (~8h dev — Ralf + Sid). Phase 2 is the policy decision: do pre-approved campaign types (e.g., Pack Received behavioral trigger, Welcome rebuilt v1004) ship on merge, or does every campaign go through manual CIO execution? Magic currently has read-only MCP access; Phase 2 grants write authority via the merge gate, not via direct API.",
    consequenceOfYes:
      "Editorial pipeline unlocks. 78+ briefs sitting in draft files begin shipping on merge. Magic gets visibility on what shipped. Pilot: Template 3428 rewrite ready.",
    consequenceOfNo:
      "Every campaign requires manual Guy/Sam pickup → manual CIO execution. The current bottleneck (drafts buried in Slack) persists.",
    consequenceOfDelay:
      "Each week = ~5–7 briefs that don't ship reliably. Compounds with Q-ROHAM-01 (two-tier framework approval) — even if the framework lands yes, the deploy bottleneck means the framework's bets can't ship at the cadence the success metrics assume.",
    linkedArtifactLabel: "GitHub Actions Campaign Brief",
    linkedArtifactSlug: "collect-hq-stack-inventory",
    voteShape: "ship / needs-work / no + free text comment",
    status: "awaiting (since 2026-05-03, filed for Monday review)",
  },
  {
    id: "Q-DAN-02",
    title: "Prioritize post-pack guided-next-step product fix (close the 83% pack-only / never-touch-marketplace gap)",
    decisionMaker: "Dan",
    question:
      "Yes / no on prioritizing the post-pack-open guided next step (single prompt: enter challenge / list duplicate on marketplace / view related sets) into the next 1–2 week sprint?",
    context:
      "Loki: \"83% of pack-only buyers never touch marketplace. No 'list this on marketplace,' no 'enter this challenge.'\" It is a UI/product fix, not a copy fix — eng owns it.",
    consequenceOfYes:
      "L2 → L3 conversion gains. Pack-only buyers become marketplace-active buyers. Bridges the documented post-pack dead end.",
    consequenceOfNo:
      "83% gap persists. Every pack drop ($500K–$1M+ Tier A; $100–300K Tier B revenue, ~$10.8M annual) has 83% of its buyers exit the funnel immediately after pack-open.",
    consequenceOfDelay:
      "Each weekly drop = thousands of pack-opens with no guided next step. The April 15–16 spike alone was 1,466 + 992 pack-opens = 2,458 buyers, ~83% of whom dead-end.",
    linkedArtifactLabel: "Stack Inventory — Surface 3 Post-Pack + Top 5 Priorities",
    linkedArtifactSlug: "collect-hq-stack-inventory",
    voteShape: "ship / needs-work / no + free text comment",
    status: "awaiting",
  },
  {
    id: "Q-DAN-03",
    title: "Ship mobile marketplace — confirm date (close the web-redirect friction)",
    decisionMaker: "Dan",
    question:
      "Confirm ship date for in-app mobile marketplace? Roadmap blog says \"coming later this season\" — what's the actual target?",
    context:
      "Mobile is the highest-engagement context (peak 4,457 daily app opens Apr 18 vs. 1,777 baseline Apr 14). Marketplace is currently web-redirected. App reviews note collectors requesting in-app marketplace. The roadmap blog stated \"coming later this season\" as of 2025-26 roadmap publication.",
    consequenceOfYes:
      "(confirmed ship date) Mobile marketplace ships → friction reduction on the highest-engagement surface. Pairs naturally with Q-DAN-02.",
    consequenceOfNo:
      "Web redirect persists. Mobile collectors continue context-switching to browser to transact.",
    consequenceOfDelay:
      "Each playoff week of delay = continued mobile→web friction during the highest-volume window of the year (Apr 22 peak: 824 orders/day = 23.5× lift over baseline).",
    linkedArtifactLabel: "Stack Inventory — Surface 9 Mobile App",
    linkedArtifactSlug: "collect-hq-stack-inventory",
    voteShape: "ship-date-confirmed / ship-date-unknown / not-prioritized + free text comment",
    status: "awaiting",
  },
  {
    id: "Q-DAN-04",
    title: "Top Shot Live: confirm current state (stopped / sunset / rolled-into-Tap-to-Watch / other)",
    decisionMaker: "Dan",
    question:
      "Confirm: is Top Shot Live (a) stopped, (b) sunset, (c) rolled into Tap to Watch (Fast Break NBA stream integration), or (d) something else entirely?",
    context:
      "Zero results across 2025-26 roadmap blog, playoffs blog, and xAI search. The product surface existed historically (live drop/event streaming) but has no current-state documentation. Stack Inventory marks it \"stopped / unconfirmed\" pending product team confirmation.",
    consequenceOfYes:
      "(any clear answer) Stack Inventory state can be authoritatively updated. Cross-product synthesis can proceed.",
    consequenceOfNo:
      "Stack Inventory carries \"unconfirmed\" indefinitely.",
    consequenceOfDelay:
      "Low immediate cost — but every cross-functional question that lands on \"is Top Shot Live still a thing?\" gets answered with \"we don't know,\" which is a credibility leak.",
    linkedArtifactLabel: "Stack Inventory — Surface 7 Top Shot Live",
    linkedArtifactSlug: "collect-hq-stack-inventory",
    voteShape: "stopped / sunset / rolled-in / other + free text comment",
    status: "awaiting",
  },

  // ─── MATT ─────────────────────────────────────────────────────────────────
  {
    id: "Q-MATT-01",
    title: "Confirm Sam W. capacity allocation for editorial-tier reactivation prose",
    decisionMaker: "Matt",
    question:
      "Confirm Sam W. has ~1 working day of capacity per cycle for editorial-tier reactivation prose (Segments A, B, C — three drafts), with Magic providing data assembly + math + subject lines + AI-feel banned-phrase scan?",
    context:
      "Sam W. is the named editor (Roham-ratified) for the editorial tier. The two-tier framework's editorial path requires Sam authoring prose, not just reviewing LLM drafts. Sam's other commitments: 3–4 playoff videos/day, plus the existing show-runner content backlog. Without explicit capacity allocation, the editorial tier cannot run.",
    consequenceOfYes:
      "Editorial tier launches. 3 reactivation segment drafts per cycle. Whale-tier deferral remains (separate scope; 3 unblocks not Sam's bandwidth).",
    consequenceOfNo:
      "Editorial tier blocks; transactional tier ships v2 anyway (parallel path); reactivation slips to cycle N+1. Framework explicitly does NOT fall back to LLM-authoring editorial — that's the failure mode Wave 2A rejected.",
    consequenceOfDelay:
      "Each cycle without Sam's capacity = one cycle without the L+XL reactivation arm of the framework (the leg most directly tied to the 1,164-cohort, $244.8M GMV thesis).",
    linkedArtifactLabel: "CMO Action Framework §6 + §8",
    linkedArtifactSlug: "cmo-action-framework",
    voteShape: "confirmed / partial / blocked + free text comment",
    status: "awaiting",
  },
  {
    id: "Q-MATT-02",
    title: "Confirm v1004 whale-tier \"L+XL Desk officer of record\" assignment to Matt by name",
    decisionMaker: "Matt",
    question:
      "Confirm: are you OK being named in the v1004 whale-tier rebuild as \"Matt Schorr · L+XL Desk officer of record,\" with the reply path opening a real thread to your inbox, and a 48h SLA on per-recipient comp memos?",
    context:
      "All four v1004 variants name Matt as the desk contact and route reply to matt.schorr@nbatopshot.com. CLAUDE.md identifies Matt as \"the natural owner of the L+XL relationship surface.\" Sotheby's and J.P. Morgan benchmarks make a named human a load-bearing concierge primitive.",
    consequenceOfYes:
      "Whale-tier rebuild ships with named human handoff. Reply path is real. 48h comp memo SLA falls to Matt (with Magic's BQ data assembly).",
    consequenceOfNo:
      "Whale-tier surface needs an alternative named human (Kenny Zamora? Dan?) or reverts to a desk-without-pulse.",
    consequenceOfDelay:
      "Whale-tier rebuild blocks at the surface-name field; cards.ts variants cannot render to review without a name.",
    linkedArtifactLabel: "Whale Tier Rebuild Spec",
    linkedArtifactSlug: "collect-hq-design-system",
    voteShape: "confirmed / alternative-name / decline + free text comment",
    status: "awaiting",
  },
  {
    id: "Q-MATT-03",
    title: "Approve PR amplification test (Sportico / The Athletic / Bleacher Report → \"What the Market Called\")",
    decisionMaker: "Matt",
    question:
      "Yes / no / modify on running the PR amplification test? Send \"What the Market Called\" to 3 journalists (Sportico, The Athletic, Bleacher Report). Success metric: ≥1 of 3 cites a Top Shot data point in their next 4 weeks of coverage.",
    context:
      "This is the C-evidence-layer experimental test from the CMO framework. The thesis (issuer-credibility deficit prevents external amplification) was confirmed across 5-agent swarm + R2/R3 attack. The test decides whether any C-amplification work is alive in 2026.",
    consequenceOfYes:
      "Test runs. Result clarifies whether external amplification is a live path or a dead one. Either way, the clean signal informs CMO cycle N+1.",
    consequenceOfNo:
      "Amplification thesis stays alive in theory but untested. Future CMO cycles re-litigate the same question without empirical resolution.",
    consequenceOfDelay:
      "Playoff window is the natural news hook. Outside playoffs, \"What the Market Called\" loses its time-anchor; the test becomes harder to run cleanly.",
    linkedArtifactLabel: "CMO Strategy Framework §6.7",
    linkedArtifactSlug: "cmo-decision-brief",
    voteShape: "ship / needs-work / no + free text comment",
    status: "awaiting",
  },
  {
    id: "Q-MATT-04",
    title: "Top 50 dormant collector data packs (Track 1 — Matt's personal-touch program)",
    decisionMaker: "Matt",
    question:
      "Confirm appetite + capacity for Track 1: per-collector data packs for the top 50 dormant L+XL whales, hand-delivered via Matt (or Kenny escalation) as 1:1 outreach, NOT email broadcast?",
    context:
      "Track 1 is the relationship-layer arm of the reactivation strategy — distinct from the Phase 2 CIO broadcast. The data packs require BQ credential refresh (currently blocked, GAP §7.1) for per-collector top-holdings + comp data. Matt's bandwidth on personal outreach is the human capacity layer.",
    consequenceOfYes:
      "Top 50 dormant whales get human-touch outreach. Independent of email distribution. Highest-trust restoration mechanism per whale-tier-rebuild.md benchmarks (Sotheby's, J.P. Morgan).",
    consequenceOfNo:
      "Top 50 whales fold into the email broadcast cohort — losing the relationship-layer benefit. Or stay un-contacted entirely.",
    consequenceOfDelay:
      "Each week of delay on Track 1 = compound dormancy on the highest-LT individuals (avg 865 days dormant already). Personal outreach decays fastest with time.",
    linkedArtifactLabel: "Reactivation Copy Specimens — Track 1",
    linkedArtifactSlug: "reactivation-real-specifics",
    voteShape: "confirmed / partial / no-capacity + free text comment",
    status: "awaiting (BQ-blocked currently — see Q-ENG-01)",
  },

  // ─── SAM ──────────────────────────────────────────────────────────────────
  {
    id: "Q-SAM-01",
    title: "Approve Sam W. as named editor for editorial tier; confirm voice rule baseline",
    decisionMaker: "Sam",
    question:
      "Re-confirm Sam W. as the editorial-tier voice DRI for NBA Top Shot email + community editorial? Roham ratified at the framework level; this question confirms ongoing capacity and the voice rules baseline.",
    context:
      "Sam's 3× CTR multiplier (Camp 132 vs 163, same audience, same timing) is the empirical case for voice ownership. The named-editor seat is load-bearing for the editorial tier — without it, editorial defaults to LLM-generated and the framework collapses.",
    consequenceOfYes:
      "Editorial tier has a voice DRI. Reactivation prose, whale-tier prose (when prerequisites unblock), and Run-It-Back content all route through Sam.",
    consequenceOfNo:
      "Editorial tier blocks until alternative editor named (no candidate currently identified).",
    consequenceOfDelay:
      "Same as Q-MATT-01. Compound cost on L+XL reactivation timeline.",
    linkedArtifactLabel: "CMO Action Framework §3 — Editorial tier voice",
    linkedArtifactSlug: "cmo-action-framework",
    voteShape: "confirmed / partial / decline + free text comment",
    status: "awaiting (ratified at principle level; capacity confirm pending)",
  },
  {
    id: "Q-SAM-02",
    title: "Greenlight Sam W. sign-off on Magic's pending editorial inventory (Ten-Year Hold Test, Serial #5, LeBron Archive)",
    decisionMaker: "Sam",
    question:
      "Three editorial pieces are written and queued for Sam's review/sign-off: Ten-Year Hold Test, Serial #5, LeBron Archive. Confirm Sam reviews + signs off (or kicks back) within 7 days?",
    context:
      "78+ briefs total in inventory. These three are the priority queue. They cannot ship without editor sign-off. Pending since tick 0400 with no response.",
    consequenceOfYes:
      "Three pieces ship; queue advances; backlog decompresses.",
    consequenceOfNo:
      "Three pieces stay in draft; backlog grows; the volume cost compounds with Q-DAN-01 (deploy pipeline).",
    consequenceOfDelay:
      "Each week without sign-off = three more pieces moving into stale-draft territory. Some are time-anchored (Serial #5 is series-specific) and decay if not shipped during their window.",
    linkedArtifactLabel: "Marketing Plan May 3–17 — What requires other humans",
    linkedArtifactSlug: "collect-hq-stack-inventory",
    voteShape: "sign-off-7d / kick-back / out-of-capacity + free text comment",
    status: "awaiting",
  },

  // ─── GUY + SAM ────────────────────────────────────────────────────────────
  {
    id: "Q-GUY-SAM-01",
    title: "Patch Camp 163 truncation (re-enable actions 4528 + 4550) AND fix UTM contamination",
    decisionMaker: "Guy+Sam",
    question:
      "Confirm patching of Camp 163 — re-enable actions 4528 + 4550 (currently 0 sends in 30d), restore Camp 132 dynamic content injection, and fix UTM parameters pointing to a May 2025 drop announcement?",
    context:
      "Three documented defects, all CIO-admin remediable (no engineering). Camp 163 V2 removed 85% of email touchpoints from V1. UTM contamination corrupts ALL welcome attribution. Filed with Guy/Sam tick 0400 — no response. Net impact of fix: 3× CTR improvement on 3,279 new-user sends/month.",
    consequenceOfYes:
      "Same-day fix possible. Welcome funnel returns toward Camp 132 baseline (44.2% open / 12.8% CTR). Causal-attribution UTM stops corrupting the data pipeline.",
    consequenceOfNo:
      "Camp 163 stays broken. Dark-window outperforms it (8.54% vs. 6.75% Welcome #132 era D7) → V2 is plausibly suppressing conversion below absent-program baseline.",
    consequenceOfDelay:
      "Every day the broken welcome runs = ~270 new signups going through the 4.85% CTR funnel instead of the 13.24% baseline. Cumulative cost compounds with the playoff acquisition window.",
    linkedArtifactLabel: "Camp 163 V2 Onboarding Investigation + Stack Inventory",
    linkedArtifactSlug: "collect-hq-stack-inventory",
    voteShape: "patched / partial / blocked + free text comment",
    status: "awaiting (filed tick 0400; no response 24h+)",
  },
  {
    id: "Q-GUY-SAM-02",
    title: "Patch Fast Break Daily Result email (template 1133 broken Liquid URL)",
    decisionMaker: "Guy+Sam",
    question:
      "Confirm 15-minute fix on template 1133 — the broken Liquid URL ?fastBreakId={{ event[ (malformed tag, link broken on every send)?",
    context:
      "Production defect on a running campaign. Fast Break is a retention-critical surface (drives daily app opens; lead-lag with email blasts). Every send currently has a broken link.",
    consequenceOfYes:
      "Same-day fix. Fast Break Daily Result email becomes functional.",
    consequenceOfNo:
      "Every Fast Break send keeps the broken URL. User-trust damage compounds.",
    consequenceOfDelay:
      "Each day = ~hundreds of broken-link sends. The CMO action framework explicitly carves out production-defect fixes from the rubric review gate so they ship FIRST regardless of voice work.",
    linkedArtifactLabel: "Stack Inventory — Surface 14 Customer.io Email Stack",
    linkedArtifactSlug: "collect-hq-stack-inventory",
    voteShape: "patched / blocked + free text comment",
    status: "awaiting",
  },

  // ─── KENNY ────────────────────────────────────────────────────────────────
  {
    id: "Q-KENNY-01",
    title: "Surface support ticket themes + NPS for sentiment-store seed (closes GAP §7.8)",
    decisionMaker: "Kenny",
    question:
      "Confirm Kenny can surface (a) top 10 recurring support ticket themes from the last 90 days, (b) any NPS or CSAT data Top Shot tracks, (c) whale-tagged ticket sub-themes specifically?",
    context:
      "SoT GAP §7.8 (Collector Sentiment Data) — no current 2026 collector sentiment data in any source. Discord scrapes blocked (auth-gated). Reddit blocked (403 to WebFetch). X paywalled (402). Support tickets are the one structured qualitative signal Top Shot owns end-to-end.",
    consequenceOfYes:
      "Collector Voice tier in /research/voice has a real seed (10+ themes, sentiment-tagged). Editorial reactivation framing gets ground-truth signal beyond market-behavior inference.",
    consequenceOfNo:
      "Collector Voice tier stays at the SoT-cited level (community language adoption: \"proof moment,\" \"incomplete document,\" \"name getting heavier\") — qualitative but not quantified.",
    consequenceOfDelay:
      "Each cycle without Kenny's queue surface = editorial decisions made on inferred sentiment.",
    linkedArtifactLabel: "SoT §7.8 + Phase 1 Sentiment Gap",
    linkedArtifactSlug: "collect-hq-research-catalog",
    voteShape: "can-surface / partial / blocked + free text comment",
    status: "awaiting",
  },

  // ─── ENGINEERING ──────────────────────────────────────────────────────────
  {
    id: "Q-ENG-01",
    title: "Restore BQ IAM for magic-agent@dl-kaaos.iam.gserviceaccount.com",
    decisionMaker: "Engineering",
    question:
      "Restore bigquery.jobUser permission on dapperlabs-data for magic-agent@dl-kaaos.iam.gserviceaccount.com? Roham flagged this as the longest-running blocker in the session.",
    context:
      "30 seconds of GCP console work. Blocks: actual dormant-cohort segment sizes (GAP §7.1), per-collector P&L join (Q-ROHAM-06 cohort sizing), causal-spend-lift measurement (GAP §7.10), pack-drop revenue per tier (GAP §7.11), Banchero post-elimination price discovery (GAP §7.2), Mixpanel × BQ join for placed-order rate (GAP §7.7), top-collector ranking (KPI section D1 BLOCKED).",
    consequenceOfYes:
      "ALL above gaps become Heimdall-runnable in same session. GAP §7.1 closes within hours. GAP §7.10 starts closing.",
    consequenceOfNo:
      "Magic continues to operate on cached BQ numbers from prior sessions + Loki estimates. Verification gates fail on freshness checks. Most GAPS in §7 stay open.",
    consequenceOfDelay:
      "This is the highest-multiplier blocker in the entire decision log. It's been flagged the longest. Every day = compound delay on 5+ downstream questions.",
    linkedArtifactLabel: "SoT §7.1 + §7.10 + KPI doc BLOCKED METRICS",
    linkedArtifactSlug: "collect-hq-kpis",
    voteShape: "restored / pending / blocked + free text comment",
    status: "awaiting (longest-running blocker per Roham flag)",
  },
  {
    id: "Q-ENG-02",
    title: "Fix CIO → Mixpanel campaign_id attribution (P2 ticket; close 32–57% dark)",
    decisionMaker: "Engineering",
    question:
      "Confirm scoping + ETA on the CIO → Mixpanel campaign_id tagging fix (P2 ticket per marketing plan)?",
    context:
      "57.2% of Email Link Clicked events have no campaign_id. Marketing plan stated \"32% of campaign data currently dark\" — both numbers are material. Without consistent campaign_id tagging, causal spend lift per campaign (the primary KPI) is unmeasurable.",
    consequenceOfYes:
      "Causal-attribution pipeline closes. Pairs with Q-ENG-01 (BQ IAM) and Q-ENG-03 (CIO holdout config) to fully unlock GAP §7.10.",
    consequenceOfNo:
      "Primary KPI stays unmeasurable. The hard-stop trigger (\"3 consecutive below-baseline pieces → rotate\") cannot fire.",
    consequenceOfDelay:
      "Same compound cost as Q-ENG-01 — every campaign run without measurement is wasted signal.",
    linkedArtifactLabel: "SoT §7.5 + §3.4",
    linkedArtifactSlug: "collect-hq-kpis",
    voteShape: "scoped / sprint-N / not-prioritized + free text comment",
    status: "awaiting",
  },
  {
    id: "Q-ENG-03",
    title: "Atlas consumer schema provisioning into BigQuery (dl-kaaos)",
    decisionMaker: "Engineering",
    question:
      "Confirm scoping + ETA on Atlas consumer schema → BigQuery dapperlabs-data (dl-kaaos location)?",
    context:
      "Atlas consumer schema holds Quest, Picks, Fast Break, and challenge-completion events. Currently invisible to data science. Challenge participation rate (14% vs. 30% NFL benchmark) is the largest single engagement gap in the product, and it can't be measured at user level without this schema.",
    consequenceOfYes:
      "Fast Break × email lead-lag becomes measurable. Challenge participation cohorts addressable. Picks attribution to marketplace spend joinable.",
    consequenceOfNo:
      "All Quest/Picks/Fast Break engagement stays at Loki-context-estimate level (Confidence 0.4).",
    consequenceOfDelay:
      "Every playoff week = compound loss on Fast Break/Picks instrumentation. Road to the Ring (April 17 → June 26) is a 70-day window; we're already 17 days in without instrumentation.",
    linkedArtifactLabel: "SoT §7.9 + CLAUDE.md Powers I do not yet have",
    linkedArtifactSlug: "collect-hq-kpis",
    voteShape: "scoped / sprint-N / not-prioritized + free text comment",
    status: "awaiting (filed pre-2026-05-03)",
  },
  {
    id: "Q-ENG-04",
    title: "Build the GitHub Actions campaign approval pipeline (Phase 1 — ~8h dev)",
    decisionMaker: "Engineering",
    question:
      "Confirm 8h dev allocation for GitHub Actions Phase 1 build (1h repo setup + 2h validation Action + 3h deploy Action + 30min CIO credentials + 1h test)? Pilot campaign Template 3428 rewrite is ready.",
    context:
      "Spec written and filed 2026-05-03 — ready for Monday review. The build is the prerequisite to Q-DAN-01 (Phase 2 direct-send authority). Named engineers: Ralf + Sid.",
    consequenceOfYes:
      "One-day sprint unblocks editorial deploy at scale. 78+ briefs begin shipping reliably.",
    consequenceOfNo:
      "Manual CIO execution remains the binding constraint. Volume capped at Guy/Sam pickup rate.",
    consequenceOfDelay:
      "Same compound cost as Q-DAN-01. Compounds with each passing week of playoff-window sends.",
    linkedArtifactLabel: "GitHub Actions Campaign Brief",
    linkedArtifactSlug: "collect-hq-stack-inventory",
    voteShape: "scoped / sprint-this-week / not-prioritized + free text comment",
    status: "awaiting (filed for Monday review)",
  },
  {
    id: "Q-ENG-05",
    title: "Build the per-collector real-data pipeline (BQ → Customer.io journey attributes; whale-tier prerequisite)",
    decisionMaker: "Engineering",
    question:
      "Confirm scoping for the per-collector real-data sync (top hold by serial, last purchase date, recent floor movement on held Moments, set completion %, current player narrative status) from BQ → CIO?",
    context:
      "Whale-tier rebuild's first prerequisite. v1004 variants depend on customer.whale_hold_image_url, whale.hold_recommendation.gain_pct, etc. Engineering ownership. Spec outlined in intelligence/2026-05-03-proof-you-were-there-spec.md.",
    consequenceOfYes:
      "Whale-tier rebuild can render with real data. First-batch ship becomes possible after Q-ENG-01 (BQ IAM) + Sam W. capacity + CIO send authorization for whale cohort.",
    consequenceOfNo:
      "Whale-tier stays in DEFERRED tier indefinitely.",
    consequenceOfDelay:
      "1,164 dormant L+XL whales (incl. ~1,000+ active L+XL) stay un-served by personalized email. Estimated 2–4 week build.",
    linkedArtifactLabel: "Whale Tier Deferred — Unblock 1",
    linkedArtifactSlug: "collect-hq-design-system",
    voteShape: "scoped / sprint-N / not-prioritized + free text comment",
    status: "awaiting",
  },
  {
    id: "Q-ENG-06",
    title: "BQ→CIO segment sync for Cooper Flagg, TST, Wemby (8–12× CTOR uplift estimate)",
    decisionMaker: "Engineering",
    question:
      "Confirm scoping + ETA on BQ collector segments → CIO audience list sync for Flagg, TST, Wemby debuts?",
    context:
      "Cooper Flagg is \"the highest-value Fresh Threads / Top Shot Debut opportunity since Wembanyama\" per Loki. The sync enables targeted Flagg debut sends to collectors matching predictive interest signals. P1 engineering item per marketing plan.",
    consequenceOfYes:
      "Flagg debut sends targeted at high-interest collectors with 8–12× CTOR uplift estimate.",
    consequenceOfNo:
      "Flagg debut sends go broadcast → diluted CTOR.",
    consequenceOfDelay:
      "Flagg debut window is one-time. Missing it can't be re-run.",
    linkedArtifactLabel: "Marketing Plan May 3–17 — What requires other humans",
    linkedArtifactSlug: "collect-hq-roadmap",
    voteShape: "scoped / sprint-N / not-prioritized + free text comment",
    status: "awaiting",
  },

  // ─── CROSS-PRODUCT ────────────────────────────────────────────────────────
  {
    id: "Q-XP-01",
    title: "Persii: cross-product whale crossover analysis (NBA Top Shot × Disney Pinnacle collectors)",
    decisionMaker: "Cross-product",
    question:
      "Confirm Persii has bandwidth + permission to run a cross-product whale crossover analysis: which collectors are active on both Top Shot and Pinnacle? Which lapsed-NBA collectors are active on Disney?",
    context:
      "Cross-product discipline (CLAUDE.md): \"When I notice something cross-product, I surface it as a finding for Roham + cross-product synthesis. I do not act on non-NBA products.\" This is filed as a finding for cross-product synthesis, NOT action by either Show Runner.",
    consequenceOfYes:
      "Cross-product synthesis layer gets data. SoT GAP §7.6 (Disney Pinnacle crossover) closes. The purple XP chip route at /open-questions/cross-product gets a real first artifact.",
    consequenceOfNo:
      "Cross-product layer stays at theory level. Whale-overlap question stays open.",
    consequenceOfDelay:
      "Lower compound cost than NBA-internal questions, but the synthesis can compound — the longer we don't see the overlap, the longer cross-product strategy decisions are made blind.",
    linkedArtifactLabel: "SoT §7.6 + Phase 1 Competitive Gap",
    linkedArtifactSlug: "collect-hq-research-catalog",
    voteShape: "can-run / partial / blocked + free text comment",
    status: "awaiting",
  },
];

export const DECISION_MAKERS: DecisionMaker[] = [
  "Roham",
  "Dan",
  "Matt",
  "Sam",
  "Guy+Sam",
  "Kenny",
  "Engineering",
  "Cross-product",
];
