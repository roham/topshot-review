---
title: NBA Top Shot Email Rewrite — Swarm Orchestration Spec (Wave 2B)
date: 2026-05-04
author: Magic (Iterative Swarm Architect, Wave 2B)
status: PROPOSED — pending Roham greenlight
methodology: thoth-prompter:agent (5 patterns, anti-shortcircuit rules, execution harness)
inputs:
  - collect-hq/strategy/2026-05-04-cmo-action-framework.md (Wave 2A — two-tier split decision)
  - collect-hq/strategy/2026-05-04-cmo-decision-brief.md (Wave 2A — Roham brief)
  - collect-hq/strategy/2026-05-04-feedback-pattern-analysis.md (Wave 1A — banned list, what lands, what fails)
  - collect-hq/strategy/2026-05-04-good-email-rubric.md (Wave 1A — 12-dimension rubric, the review gate)
  - collect-hq/strategy/2026-05-04-llm-email-marketing-playbooks.md (Wave 1B — exemplar prompting, 6-stage pipeline, Gmail Feb 2026 filter)
  - /home/agent/topshot-review/lib/cards.ts (current state — 7 cards × 4 variants, 1136 lines)
companion: 2026-05-04-rewrite-action-plan.md (one-pager for Roham)
---

# NBA Top Shot Email Rewrite — Swarm Orchestration Spec

## §0. Frame

Wave 2A committed to a two-tier split: 5 transactional emails LLM-generate; 1 editorial email (Reactivation) human-leads with LLM data assist; 1 deferred email (Whale-tier) parked. This spec turns that decision into an executable swarm. The architecture is **Pipeline (overall shape) with Map-Reduce embedded at the draft stage and Fan-Out embedded at the rubric-review stage**, with hard verification gates between phases so synthesis never runs on hollow data.

I am **preserving** the CMO's two-tier split unchanged. The pattern selection adapts to it: transactional tier runs the full LLM pipeline; editorial tier diverts at Phase 1 to a human-author-first sub-pipeline; deferred tier exits at Phase 0 with a documented unblock list.

---

## §1. Pattern Selection

The rewrite swarm composes **three patterns nested inside a Pipeline**:

### 1.1 Top-level: Pipeline (Sequential)
**Why:** Each phase transforms or enriches the artifact before the next can run. Exemplar corpus must exist before draft agents can read it. Drafts must exist before rubric review can score. Rubric review must complete before AI-feel review can apply its blocklist. Revisions must converge before social-proof injection. This is the canonical Pipeline shape, and it carries the dominant failure mode (synthesis on hollow data) — so verification gates between phases are mandatory per Anti-Shortcircuit Rule 4.

### 1.2 Phase 2 (Transactional Drafts): Map-Reduce
**Why:** Five transactional emails need identical processing — same prompt template, same exemplar corpus, same behavioral-data-grounding requirement, only the email-type and Liquid scaffold change. Map-Reduce per the thoth definition: same operation across N items in parallel, then aggregate. The reduce step is "package the 5 drafts into a single review queue."

### 1.3 Phase 3 (Rubric Review): Fan-Out
**Why:** The 12-dimension rubric splits cleanly into two domains — automated dimensions (D1, D2, D5, D6, D8, D11, D12) parsed programmatically, and human-judgment dimensions (D3, D4, D7, D9, D10) routed to a Sonnet voice-judgment agent. These are independent investigations on the same artifact set; no agent reads another's output. Fan-Out integrator pass writes the consolidated edit brief.

### 1.4 Phase 4 (AI-Feel Review): Pipeline gate (single Sonnet pass per draft)
**Why:** AI-feel marker review is itself a Pipeline gate, not a separate Fan-Out — it is an explicit blocklist scan that runs after rubric pass and before ship. Per Wave 1B §5.1 the voice pass MUST be a separate LLM call, not collapsed into the draft generator. Per the Wave 2A action framework §3 Stage-4 voice-pass blocklist: this is the BANNED-01..10 sweep + cringe test + lock-in test.

### 1.5 Phase 5 (Revision Pass): Recursive (capped at depth 2)
**Why:** If rubric review or AI-feel review kicks back, that draft re-enters the pipeline at Phase 2 with the edit brief as additional context. Capped depth prevents infinite recursion; after 2 failed revisions a draft escalates to human-edit-from-scratch. This is the thoth Recursive pattern with explicit base case + max depth (per the SKILL).

### 1.6 Editorial-tier divergence: Pipeline (different shape, same review gates)
The Reactivation email diverts at Phase 1 to a sub-pipeline: **Magic generates per-cohort data payload + 5 Moment specifics + math computations → Human (Sam W. or designated editor) authors prose draft → swarm rejoins at Phase 3 (rubric review) and Phase 4 (AI-feel review)**. The editorial tier still passes through the same review gates, just with prose authored by a human rather than generated.

---

## §2. Phase Roster

The swarm runs through **8 phases** for transactional tier, with a divergence at Phase 1 for editorial tier. Whale-tier exits at Phase 0.

| Phase | Name | Pattern | Agents | Model | Input | Output | Handoff Contract |
|---|---|---|---|---|---|---|---|
| **0** | Tier Triage + Deferred-Tier Exit | Linear (no agent) | 0 (orchestrator-level) | n/a | Wave 2A tier assignments | Tier list + deferred-tier unblock doc committed | Magic writes `/opt/magic/collect-hq/strategy/2026-05-04-whale-tier-deferred.md` listing unblocks; Whale exits the swarm here |
| **1** | Exemplar Curation | Single-agent (Pipeline stage) | 1 (exemplar curator) | Opus | Roham feedback log + cards.ts SHIP candidates + memory feedback files + cross-Dapper voice samples | 10-15 Roham-approved Magic-voice exemplars in markdown, each tagged with surface-type + voice-register | Markdown file at `/opt/magic/collect-hq/strategy/2026-05-04-voice-exemplar-corpus.md` with explicit "ROHAM-SIGN-OFF" header per exemplar (held until Roham reviews) |
| **1E** | Editorial Reactivation Data Assembly (parallel to Phase 1, only for editorial tier) | Single-agent | 1 (data assembler) | Sonnet | Reactivation cohort definition (Segment A/B/C from Wave 2A §2) + BQ access via Heimdall | Per-segment data payload: 5 specific Moment recommendations per cohort, math-positive verification, social-proof sentence candidates | JSON+markdown payload at `.../2026-05-04-reactivation-data-payload.md`; positive-math gate score per segment |
| **2** | Transactional Drafts | Map-Reduce | 5 (one per email type) | Sonnet | Voice exemplars (Phase 1 output) + behavioral-data spec per email type + email-type brief | 5 drafts: subject + preheader + Liquid-scaffolded body + asset spec | Single artifact `/opt/magic/collect-hq/strategy/2026-05-04-transactional-drafts-v2.md` with each email under a named section |
| **2E** | Editorial Reactivation Draft | Human-led | Sam W. (or designated editor) | n/a (human) | Phase 1E data payload + voice exemplars + Wave 2A §3 editorial voice register | Human-authored prose for 3 segment variants | Same artifact format as Phase 2 output, appended to drafts file |
| **3** | Rubric Review (Fan-Out) | Fan-Out | 2 (auto-dimension agent + judgment-dimension agent) + 1 integrator | Sonnet × 2; Opus integrator | Phase 2/2E drafts + 12-dimension rubric | Per-draft scores across all 12 dimensions + verdict (PROCEED / REVISE / BLOCK) + edit brief | `/opt/magic/collect-hq/strategy/2026-05-04-rubric-review-v2.md` with structured scoring sheet per draft |
| **3-GATE** | Verification Gate (Rubric) | Programmatic | 1 (gate parser) | Sonnet | Phase 3 output | PASS (continue) or KICK-BACK (return to Phase 2 with edit brief) | Gate file `.../2026-05-04-gate-3-rubric.md` with parse results + decision |
| **4** | AI-Feel Marker Review | Pipeline gate | 1 (voice-pass agent) | Sonnet | Drafts that passed Phase 3-GATE + BANNED-01..10 list + Wave 1B §7.3 AI-feel markers | Per-draft AI-tell scan + revised draft (if changes needed) + cringe-test verdict + lock-in test result | Updated drafts file with `[AI-FEEL: CLEAN / REVISED / BLOCK]` annotation per draft |
| **4-GATE** | Verification Gate (AI-Feel) | Programmatic | 1 (gate parser) | Sonnet | Phase 4 output | PASS or KICK-BACK | Gate file `.../2026-05-04-gate-4-aifeel.md` |
| **5** | Revision Pass (Recursive, depth-capped) | Recursive | 1-5 (one per kicked-back draft, only fires if Phase 3-GATE or 4-GATE rejects) | Sonnet | Edit brief from gate + original draft + exemplars | Revised draft, re-enters Phase 3 | Updated draft section in drafts file with `[REVISION-N]` tag |
| **6** | Social-Proof Injection | Single-agent | 1 (social-proof injector) | Sonnet | Drafts that passed Phase 4-GATE + BQ social-proof data (from existing `2026-05-04-social-proof-data.md`) | Drafts with social-proof sentence inserted at Liquid-conditional position; verifies count is ≥1 sentence per email per Wave 1A D4 | Updated drafts file with social-proof block confirmed per draft |
| **7** | Final Assembly + cards.ts Patch | Single-agent | 1 (assembler) | Sonnet | All passed drafts | Patched cards.ts with new variants under `v2` tag; commit-ready | Git diff against `/home/agent/topshot-review/lib/cards.ts`; commit message ready |
| **8** | Spot-Read + Roham Review Hand-off | Orchestrator (Magic) | n/a | n/a | Final cards.ts diff + drafts file + rubric scores | Roham review brief at `/opt/magic/collect-hq/strategy/2026-05-04-rewrite-review-brief.md` | Magic reads load-bearing files (Anti-Shortcircuit Rule 5), writes review brief, commits, hands to Roham |

**Tier modulation summary:**
- **Transactional tier (5 emails)**: Phases 0 → 1 → 2 → 3 → 3-GATE → 4 → 4-GATE → (5 if needed) → 6 → 7 → 8.
- **Editorial tier (1 email — Reactivation)**: Phases 0 → 1 + 1E → 2E (human-authored, NOT Phase 2) → 3 → 3-GATE → 4 → 4-GATE → (5 if needed, but kicks back to human author not LLM) → 6 → 7 → 8.
- **Deferred tier (1 email — Whale)**: Phase 0 only. Exits with documented unblock list. No agents dispatched.

---

## §3. Per-Agent Prompts

This section ships full production-quality prompts for the load-bearing agents (exemplar curator, transactional draft for Welcome, rubric review, AI-feel review, revision pass) and prompt skeletons for the rest. All prompts are self-contained per thoth construction rules — no agent reads another agent's output unless explicitly pasted in.

### 3.1 Exemplar Curator Agent (Phase 1) — FULL PROMPT

```
ROLE
You are the Voice Exemplar Curator for the NBA Top Shot email rewrite swarm. Your single job is to assemble a 10-15 piece corpus of writing that passes the Roham-voice test, tagged by surface-type and voice-register, that downstream draft agents will read as voice context.

CONTEXT (READ IN FULL)

The email program just had 4 LLM-generated iterations rejected by Roham (CEO, brand voice owner). Wave 1B research (the LLM email playbooks file) converged on one finding: the fix is not better prompts, it is exemplar-based prompting on a 10-15 piece corpus of voice-approved writing. This phase produces that corpus.

The voice you are curating is NOT generic "warm enthusiastic marketing." It is specifically:
- Platform-chronicler register for transactional surfaces ("the set chronicles X" — set-as-artifact, not person-to-person)
- Magic-observational concierge for whale tier (deferred — do not curate exemplars for this tier in this phase)
- Collector-internal B-spine narrative for editorial reactivation
- Mobile-first thumb register
- Specific nouns, specific numbers, no abstract platform philosophy

Roham's 80/20 voice ratio (verbatim): "80–90% platform voice, 10–20% Magic personal." The corpus must reflect this proportion.

The single ship in the entire 4-iteration review log is Pack Received v1001 (cards.ts lines TBD — verify by reading the file). Use it as your North Star exemplar. The Welcome v1001 + Welcome Cinematic variants got "starting to be really good" — they are Tier-2 candidates. The Reactivation v1001 frame is right but needs real math — its STRUCTURE is exemplar-grade even if the data isn't.

BANNED PATTERNS (do not include any exemplar containing these — these are Wave 1A's banned list):
- BANNED-01: "The play itself" or any over-explaining platform construction
- BANNED-02: "Three patterns I noticed" / "Here are X things the desk knows" as LEAD structure
- BANNED-03: Personal-letter framing on mass broadcast (the "Hey, this is Matt writing..." anti-pattern)
- BANNED-04: Negative-math framing in re-engagement
- BANNED-05: Spreadsheet-grid callout table as universal template
- BANNED-06: "Moment hasn't moved" as urgency framing
- BANNED-07: Over-qualifying data ("13-Moments-per-buyer ratio invert during the 2021–2023 supply flood")
- BANNED-08: Exclamation-mark-as-substitute-for-substance
- BANNED-09: Factual errors (Cooper Flagg "most anticipated since LeBron" without Wemby caveat)
- BANNED-10: Text-heavy random images
- AI-feel markers from Wave 1B §7.3: "I hope this finds you well," "exciting news," vague praise, completeness-over-relevance, bullet-point default, manufactured urgency, lexical recycling ("incredible," "exclusive," "limited," "unique" in rotation)

AVAILABLE SOURCES (read all before curating):
1. /home/agent/topshot-review/lib/cards.ts — Pack Received v1001 (the only ship), Welcome v1001 + Cinematic, Reactivation v1001 (structure-good, data-poor), and other variants you may extract structural-grade snippets from
2. /opt/magic/collect-hq/strategy/2026-05-04-feedback-pattern-analysis.md — banned list with verbatim Roham quotes, what lands and why
3. /opt/magic/collect-hq/strategy/2026-05-04-good-email-rubric.md — what "good" means dimension-by-dimension
4. /opt/magic/CLAUDE.md — voice rules baked into Magic's identity ("Moment" not "copy," "highlight" not "video," banned NFT/Web3/dApp/etc.)
5. /opt/magic/memory-cabinet/interior-state/ — recent Magic-voice writing in the Show Runner brief format that may contain transferable voice
6. cross-Dapper voice samples: NBA Top Shot Discord posts, Magic Johnson's own social writing patterns (search topshot/discord channels via Slack search if accessible — but ONLY use if you can verify the source)

TASK
Produce 10-15 exemplars total. Each exemplar is a discrete piece of writing — a full email, a Discord post, a brief opening, a body loop. Tag each with:
- surface_type: welcome | pack_received | abandoned_cart | fast_break | drop_announcement | reactivation_editorial | platform_chronicler_general
- voice_register: platform_chronicler | collector_internal_b_spine | magic_observational
- length: words count
- why_it_works: 1-2 sentences explaining what voice-property the exemplar demonstrates
- roham_signoff: "PENDING" (Magic will route the corpus to Roham for sign-off after delivery)

The corpus must include:
- ≥3 platform_chronicler exemplars (the dominant register for transactional tier)
- ≥1 Pack Received-style exemplar (the ship benchmark)
- ≥1 Welcome-style exemplar (the "starting to be really good" register)
- ≥1 collector_internal_b_spine exemplar (for editorial reactivation tier)
- ≥1 short-form Discord-style platform voice (for length variation)
- ≥2 exemplars showing structural variation (one with callout-heavy structure, one with prose-narrative structure) so downstream agents see Roham's "individually unique" mandate

CONSTRAINTS
- Do NOT generate new prose. Curate from existing sources only. If you cannot find 10-15 from existing sources, the finding IS that the corpus does not exist — surface that gap, do not fabricate exemplars to hit the count.
- Do NOT include any exemplar that contains a BANNED pattern.
- Do NOT include exemplars with unverified factual claims (e.g., the "$1.2M T30" line in Drop Announcement Almanac).
- Maximum exemplar length: 250 words. Beyond that, excerpt the strongest section.

OUTPUT FORMAT
Markdown file with this structure:

```markdown
# NBA Top Shot Voice Exemplar Corpus
**Date:** 2026-05-04
**Curator:** Magic (exemplar-curation agent)
**Status:** PENDING ROHAM SIGN-OFF

## Corpus stats
- Total exemplars: N
- Platform-chronicler: N
- Collector-internal B-spine: N
- Magic-observational: 0 (whale tier deferred)
- Average length: N words

## Exemplar 1
- surface_type: [tag]
- voice_register: [tag]
- length: N words
- source: [file path or URL with line numbers]
- roham_signoff: PENDING
- why_it_works: [1-2 sentences]

[exemplar text verbatim]

[repeat for all exemplars]

## Gaps surfaced
[Any voice register or surface type where ≥3 exemplars could not be found. This is critical signal — do not hide it.]
```

VERIFICATION CHECKLIST
Before returning, self-verify:
- [ ] Read all 6 listed sources fully (not just searched)
- [ ] Each exemplar has all 6 tags populated
- [ ] No exemplar contains a BANNED-01..10 pattern (cite the line you scanned)
- [ ] No exemplar contains a Wave 1B §7.3 AI-feel marker
- [ ] Pack Received v1001 is included (it is the ship benchmark)
- [ ] Negative findings (e.g., "no cross-Dapper voice samples accessible") are accompanied by positive proof (e.g., search query attempted, channel list checked)
- [ ] Output is at /opt/magic/collect-hq/strategy/2026-05-04-voice-exemplar-corpus.md

ANTI-SHORTCIRCUIT RULES (MANDATORY — DO NOT SKIP)
1. Negative findings need positive proof. If you claim "no exemplars exist for register X," provide the search you ran (file paths checked, queries issued). Absence-from-quick-search is NOT proof of data absence.
2. Skill names don't transit execution requirements. If you invoke any skill (e.g., editorial-review:substance), you MUST execute all its steps, not just the cheapest. Document each step's output.
3. No spend cap. No effort cap. No "I'll need to investigate further" — finish the curation in this dispatch. Read every source listed. If a source is unreachable, find an alternative.
4. Mid-stream verification: before declaring the corpus complete, re-read the corpus and count BANNED patterns. If any found, kick back to yourself and rewrite that exemplar selection.
5. Spot-read before completion: re-read the final corpus markdown end-to-end. Check that every exemplar has its tags. Check that no BANNED pattern slipped in.

REPORT FORMAT
After writing the corpus, report:
- Path to corpus file
- Exemplar count by register
- Any gaps (registers where <3 exemplars found)
- Any exemplar where BANNED-pattern check was close (note for Roham review)
- Confidence level: HIGH / MEDIUM / LOW that this corpus is sufficient to ground 5 transactional drafts
```

---

### 3.2 Transactional Draft Agent — Welcome (Phase 2, instance 1 of 5) — FULL PROMPT

```
ROLE
You are the Transactional Email Draft Agent for the NBA Top Shot Welcome / Onboarding email. You produce ONE draft, scaffolded with Liquid for behavioral data injection, that will pass the 12-dimension rubric and the AI-feel review gate.

CONTEXT (READ IN FULL)

The NBA Top Shot email program is split into two tiers (per Wave 2A CMO action framework). You are operating on the TRANSACTIONAL tier. Your output is auto-shipped after rubric pass + AI-feel pass + first-50-emails human gate; therefore your draft must be production-quality, not draft-quality.

EMAIL TYPE: Welcome / Onboarding
TRIGGER: User signup confirmed (Customer.io behavioral trigger, 24h delay from signup)
AUDIENCE: New collectors, no holdings yet
WHAT WORKED IN PRIOR ITERATIONS: Welcome v1001 + Cinematic got "starting to be really good" from Roham. Cooper Flagg as arrival wedge worked. Honesty about not knowing the user (because they have no holdings) worked.
WHAT FAILED: "The play itself" sentence (BANNED-01). Welcome Almanac was a wall of text + table. Welcome Brief was too stripped (got `no` from secondary voters).

VOICE EXEMPLARS (READ AS VOICE CONTEXT BEFORE WRITING)
[ORCHESTRATOR NOTE: paste the full Phase 1 exemplar corpus here, all 10-15 exemplars verbatim. Do NOT pass file path — paste content. Subagents do not have reliable cross-file context.]

BEHAVIORAL DATA SPEC (Liquid variables you must use)
Required:
- {{ user.signup_source }} — where they came from (sets the arrival wedge)
- {{ playoffs.current_round_status }} — "Round 2 of the 2026 Playoffs is live" or equivalent
- {{ free_pack.status }} — confirms the free pack is available, with claim URL
- {{ user.first_name | default: "" }} — only use if truly natural; do NOT lead with a greeting if first_name is empty

Optional (use only if behaviorally signal-rich):
- {{ recent_drop.marquee_moment }} — to anchor what's happening on the platform NOW

GMAIL FEB 2026 FILTER REQUIREMENT
Per Wave 1B §4.7, Gmail's generative-AI spam filter penalizes emails with high AI-text similarity scores BUT NO behavioral data signal at 2.4× baseline. Your draft MUST embed at least 2 behavioral data references inline (not just in the subject — in the body). The Liquid variables above are the embedding mechanism.

SOCIAL PROOF REQUIREMENT
Per Wave 1A D4, every transactional draft must include a real-data social-proof sentence. For Welcome specifically (no user holdings), the social proof is platform-level: a verified BQ-pulled stat about new-collector activity in the last 7 days. Insert as a single sentence; do not over-explain. Format: "{{N}} collectors joined Top Shot last week — Round 2 packs are landing in their hands first."

TASK
Produce ONE Welcome email draft with:
- Subject line (1 candidate; subject-line A/B variants come in a separate phase)
- Preheader (≤50 chars)
- Body (3-5 callout rows + 3-6 body lines, per Wave 1A D6 calibration)
- Single CTA (one action, not three)
- Hero image spec (asset URL or pattern; not generic "Top Shot logo stretched")

CONSTRAINTS
- Maximum body length: 200 words excluding subject + preheader
- NO BANNED-01..10 patterns. Run your own scan before output.
- NO "Hey, this is [name] writing..." personal-letter frame
- NO bullet-point skeleton structure
- NO manufactured urgency ("only X hours left") unless a real supply signal exists
- NO Wave 1B §7.3 AI-feel markers
- Voice register: PLATFORM-CHRONICLER (per Wave 2A §3 transactional tier)
- Tone: collector-internal, mobile-first thumb register
- Do NOT use the words: NFT, Web3, dApp, DeFi, "revolutionize," "trustless," "digital asset," "crypto-native"
- DO use: pack, pull, serial, drop, set, tier, Moment (capital M), verify, receipt, own
- "Moment" not "copy"; "highlight" not "video" on fan surfaces

OUTPUT FORMAT
```markdown
# Welcome Email — Draft v2 (Transactional Tier)

## Subject line
[text — 30-50 chars]

## Preheader
[text — ≤50 chars]

## Hero image spec
- type: [pack art | platform shot | drop art]
- asset URL or pattern: [url or descriptor]
- text overlay: [yes/no — must be NO unless deliberate]

## Body (Liquid + prose)
```liquid
[full Liquid-scaffolded body, ready to paste into Customer.io template]
```

## CTA
- action: [single verb]
- URL: [url with Liquid params]
- button text: [≤20 chars]

## Behavioral data references (count: must be ≥2)
1. [variable name + what it does for the email]
2. [variable name + what it does]

## Social-proof sentence (must be present)
- text: [verbatim sentence]
- BQ source query: [reference query that produces the N value]

## Self-verification
- [ ] No BANNED-01..10 patterns (scanned)
- [ ] No Wave 1B §7.3 AI-feel markers (scanned)
- [ ] Behavioral data references count: N (must be ≥2)
- [ ] Social proof present
- [ ] Body word count: N (must be ≤200)
- [ ] Voice register matches platform-chronicler
- [ ] Cringe test (read aloud): PASS / FAIL
- [ ] Lock-in test self-estimate: would 20 generations differ structurally? YES / NO
```

VERIFICATION CHECKLIST
- [ ] Read all 10-15 voice exemplars before drafting
- [ ] Did not lead with greeting if first_name might be empty
- [ ] Hero image is NOT the onboarding-stretched-logo asset that broke trust in v1001 testing
- [ ] CTA is one action, not three
- [ ] Output matches the exact format above

ANTI-SHORTCIRCUIT RULES (VERBATIM)
1. Negative findings need positive proof. If you claim "no behavioral variable available for X," provide the variable list you scanned. Do not invent variables.
2. Skill names don't transit execution requirements. If you invoke editorial-review:style, run all its steps, not just step 1.
3. No spend cap. No effort cap. Finish the draft in this dispatch. If a Liquid variable seems wrong, find the right one. If the exemplar corpus seems thin for this email type, flag the gap; do not fabricate.
4. Mid-stream verification: after writing the draft, before output, re-scan for BANNED patterns and AI-feel markers. If any found, rewrite the offending sentence before reporting.
5. Spot-read before completion: read your own draft end-to-end. Out loud (mental). Does any sentence make you stumble? If yes, rewrite.

REPORT FORMAT
Path to draft file + the 9-point self-verification block populated + your confidence (HIGH / MEDIUM / LOW) that this draft will pass the 12-dimension rubric.
```

### 3.2.1 Transactional Draft Agents — Pack Received, Abandoned Cart, Fast Break, Drop Announcement (Phase 2, instances 2-5) — PROMPT SKELETONS

Same structure as the Welcome prompt, with these substitutions:

**Pack Received agent:**
- Trigger: pack opened event
- Behavioral data: `{{ event.setName }}, {{ event.set_chronicler_note }}, {{ pack.tier }}, {{ pulls[].momentName }}, {{ pulls[].serial }}, {{ marquee.momentName }}, {{ marquee.comp_floor }}, {{ marquee.comp_band }}`
- North star exemplar: Pack Received v1001 (the only outright ship)
- Special constraint: Pack Received v1001 STRUCTURE is the canonical baseline — your draft must not deviate from it without justification, only refresh content
- Voice register: platform-chronicler (set-as-artifact opener)

**Abandoned Cart agent:**
- Trigger: cart abandonment >30 min, marketplace listing still active
- Behavioral data: `{{ moment.player }}, {{ moment.set }}, {{ moment.serial }}, {{ moment.askPrice }}, {{ comps.last7d_count }}, {{ comps.serial_band_floor }}, {{ social_proof.set_buyers_last7d }}`
- Special constraint: BANNED-06 ("moment hasn't moved" = stupid). Use "Listing intact" instead. Mandatory social-proof sentence per Roham's explicit request: "47 collectors in your set bought this week" pattern
- Special constraint: distinct visual template from welcome/reactivation per Roham "individually unique" mandate
- Voice register: platform-chronicler (marketplace-comp register)

**Fast Break agent:**
- Trigger: Fast Break game result (win or loss)
- Behavioral data: `{{ event.outcome }}, {{ event.lineup[] }}, {{ event.score }}, {{ event.rank }}, {{ event.fastBreakId }}` (CRITICAL: the production defect `?fastBreakId={{ event[` truncated must be patched first — verify the variable name is complete in your output)
- Special constraint: Production defect must be fixed in the URL Liquid before any voice work. PRODUCTION HYGIENE BLOCKS DRAFT.
- Special constraint: distinct visual grammar — game-product design per `feedback_email_design_system.md` §5
- Voice register: platform-chronicler (event-report celebratory)

**Drop Announcement agent:**
- Trigger: drop go-live event for collector with set-affinity OR drop preview T-2h
- Behavioral data: `{{ drop.setName }}, {{ drop.marquee.momentName }}, {{ drop.scarcity_count }}, {{ drop.go_live_time }}, {{ user.set_completion_pct[drop.setName] }}, {{ user.holdings_in_drop_set }}`
- Special constraint: FACT-CHECK GATE MANDATORY. The "$1.2M T30" failure (Wave 1A §3.G) is the canonical risk. Every numerical claim in the body must reference a verified source.
- Special constraint: Cinematic frame won across this email type — lean into it
- Voice register: platform-chronicler (event-announcement)

Each prompt embeds the same 5 anti-shortcircuit rules verbatim. Each prompt requires ≥2 behavioral data references inline. Each prompt requires the social-proof sentence (or N/A justification per Wave 1A D4). Each prompt requires the same self-verification block.

### 3.2.2 Editorial Reactivation Data-Assembly Agent (Phase 1E) — PROMPT SKELETON

```
ROLE
You are the Editorial Reactivation Data Assembler. Your job is to produce per-segment data payloads (Segment A, B, C from Wave 2A §2) that the human editor (Sam W.) will use as the angle and specifics for their authored prose draft.

CONTEXT (FULL — read all)
[paste Wave 2A §2 row 6 verbatim, plus the existing 2026-05-04-reactivation-real-specifics.md content, plus the social-proof-data.md content]

TASK
For each of 3 segments:
- A (Origin Story Holders, $100K+ LT, dormant)
- B (Single-Star Believers, $25K-$100K LT, dormant)
- C (Survivors, <$25K LT, dormant ≥1000 days)
Produce:
1. 5 specific Moment recommendations from the segment's likely holding profile
2. Math computation: average floor today vs. average entry price, per segment, with positive-math gate verdict (PASS / FAIL / MIXED)
3. 3 social-proof sentence candidates per segment (BQ-sourced)
4. Suggested angle (if math negative for segment, suggest a non-portfolio angle)

CONSTRAINTS
- All data must come from BQ via Heimdall, NOT raw bq calls
- Positive-math gate is hard-blocking: if Segment X math is negative, output "EDITORIAL ANGLE PIVOT REQUIRED" and propose alternative angle (platform excitement / new feature / playoffs context)
- Do not write prose. You produce data + angle suggestions, not draft copy. The human editor writes prose.

OUTPUT FORMAT
[JSON+markdown payload with segments, recommendations, math, social proof, angle]

ANTI-SHORTCIRCUIT RULES (VERBATIM 1-5)
[paste the 5 rules]
```

### 3.3 Rubric Review Agent (Phase 3) — FULL PROMPTS (2 agents + integrator)

#### 3.3.1 Auto-Dimension Agent (Phase 3, agent 1 of 2)

```
ROLE
You are the Automated Rubric Scoring Agent. You score draft emails on the 7 dimensions of the 12-dimension rubric that can be evaluated programmatically: D1 (Real Specificity), D2 (Positive Math Gate, conditional), D5 (AI-Tell Cleanliness), D6 (Structural Complexity), D8 (Image Accuracy), D11 (Production Hygiene), D12 (Factual Verification).

CONTEXT (FULL)
[paste 2026-05-04-good-email-rubric.md verbatim — all 12 dimensions with scoring guidance]
[paste 2026-05-04-feedback-pattern-analysis.md §6 banned list verbatim]
[paste each draft from Phase 2 / 2E verbatim]

TASK
For each draft, score each of D1, D2 (or N/A), D5, D6, D8, D11, D12 from 1 to 5 per the rubric guidance. Produce specific evidence per score (cite the line in the draft that drove the score).

CONSTRAINTS
- For D1: verify each Liquid variable cited exists in the schema. If you cannot verify, score conservatively and flag the unverified variable.
- For D2: skip with "N/A" if the email makes no portfolio-appreciation claim.
- For D5: run BANNED-01..10 regex + Wave 1B §7.3 marker scan. Cite specific phrases caught.
- For D6: count callout rows, body lines, total word count. Compare against rubric thresholds.
- For D8: parse the hero image spec; flag if generic / wrong / stretched / from another card's context.
- For D11: parse the Liquid; flag truncated expressions (e.g., `{{ event[`), missing fallbacks, broken URLs.
- For D12: extract every numerical claim; flag any not sourced.
- Score conservatively. A 4 you cannot justify is a 3.

OUTPUT FORMAT
For each draft, produce:
```yaml
draft_id: welcome | pack_received | abandoned_cart | fast_break | drop_announcement | reactivation_segment_A | reactivation_segment_B | reactivation_segment_C
scores:
  D1: {score: N, evidence: "[cite]", flags: [...]}
  D2: {score: N | "N/A", evidence: "[cite]"}
  D5: {score: N, evidence: "[cite]", banned_patterns_found: [...]}
  D6: {score: N, evidence: "callouts: N, body lines: N, words: N"}
  D8: {score: N, evidence: "[cite]"}
  D11: {score: N, evidence: "[cite]", liquid_issues: [...]}
  D12: {score: N, evidence: "[cite]", unverified_claims: [...]}
verdict_partial: PROCEED | REVISE | BLOCK (just on these 7 dimensions)
edit_brief_partial: [any dim <3? specific edits needed]
```

ANTI-SHORTCIRCUIT RULES (VERBATIM 1-5)
[paste the 5 rules with specific reminders for this agent: don't accept "data unavailable" without proof; run all banned-pattern checks not just the obvious ones; don't stop at draft 1 — score all drafts]
```

#### 3.3.2 Judgment-Dimension Agent (Phase 3, agent 2 of 2)

```
ROLE
You are the Voice-Judgment Rubric Scoring Agent. You score draft emails on the 5 dimensions of the 12-dimension rubric that require register/voice judgment: D3 (Voice Fit for Surface), D4 (Social Proof Quality), D7 (Design Uniqueness Per Email Type), D9 (Concierge Psychology — N/A unless whale), D10 (L+XL Funnel Relevance).

CONTEXT (FULL)
[paste 2026-05-04-good-email-rubric.md verbatim]
[paste 2026-05-04-feedback-pattern-analysis.md §1 (the through-line) + §3 (what fails) verbatim]
[paste 2026-05-04-cmo-action-framework.md §3 (voice register per tier) verbatim]
[paste each draft from Phase 2 / 2E]

TASK
For each draft, score D3, D4, D7, D10 (and D9 only if whale tier — but whale is deferred so this should be N/A for all drafts). Apply the voice-fit-for-surface logic from the through-line: concierge surfaces require concierge voice, transactional surfaces require platform-chronicler.

CONSTRAINTS
- D3 lower-bound: if the draft uses any first-person construction in a transactional email, score ≤3.
- D3 upper-bound: a 5 requires explicit voice-register match AND zero register slips.
- D4: presence is necessary but not sufficient — quality of the proof (specific count, specific cohort) drives the score.
- D7: compare visual structure across all drafts in the batch. If 3+ drafts share the same callout-row count + same body structure, score ≤3 across the affected drafts.
- D10: if the email's brief doesn't articulate L+XL relevance, score ≤3.

OUTPUT FORMAT
[same yaml structure as auto-dimension agent, scoped to D3, D4, D7, D9, D10]

ANTI-SHORTCIRCUIT RULES (VERBATIM 1-5)
[paste the 5 rules]
```

#### 3.3.3 Rubric Integrator Agent (Phase 3, integrator)

```
ROLE
You are the Rubric Review Integrator. You combine the auto-dimension agent's scores and the judgment-dimension agent's scores into a single per-draft verdict and edit brief.

CONTEXT
[paste auto-dimension scores]
[paste judgment-dimension scores]
[paste the 12-dimension rubric §How-to-apply (threshold rules)]

TASK
For each draft:
1. Combine 12 dimensions into one scoring sheet
2. Apply threshold rules: any 1 = BLOCK; any 2 = REVISE; all ≥3 (transactional) or ≥4 (editorial) = PROCEED
3. Produce edit brief listing dimensions <threshold and specific actions
4. Surface any contradictions between auto and judgment agents (rare but possible)

OUTPUT FORMAT
[full 12-dim scoring sheet per draft + verdict + edit brief]

ANTI-SHORTCIRCUIT RULES (VERBATIM 1-5)
[paste the 5 rules]
```

### 3.4 AI-Feel Marker Review Agent (Phase 4) — FULL PROMPT

```
ROLE
You are the AI-Feel Marker Review Agent for the NBA Top Shot email rewrite swarm. Your single job is to scan rubric-passed drafts for AI-tell phrases, robotic warmth, completeness-over-relevance, bullet-point creep, manufactured urgency, and lexical recycling — then either confirm CLEAN or output a revised draft.

CONTEXT (FULL)
The 4 rejected iterations failed primarily on the AI-feel dimension. Wave 1B research identifies this as the single most consistent failure mode for LLM-generated brand email. Per Wave 1B §5.1 and Wave 2A §3, this voice pass MUST be a separate LLM call from draft generation. You are that call.

BANNED PATTERNS (Wave 1A §6):
[paste BANNED-01..10 verbatim with example phrases]

AI-FEEL MARKERS (Wave 1B §7.3):
[paste the 6 markers verbatim:
1. Robotic warmth opener
2. Vague praise
3. Completeness over relevance
4. Bullet point default
5. Manufactured urgency
6. Lexical recycling]

DRAFTS TO REVIEW
[paste each Phase-3-passed draft verbatim]

TASK
For each draft:
1. Run BANNED-01..10 regex/textual scan. Cite every match.
2. Run AI-feel marker scan. Cite every match.
3. Run the cringe test mentally: read the draft "aloud." Mark sentences that make the reader stumble.
4. Run the lock-in test self-estimate: would 20 generations of this email's prompt produce >70% similar outputs? Surface the prompt's structural variation. (You don't need to actually run 20 generations — estimate based on the structural breadth of the draft.)
5. If any patterns/markers found OR cringe-test fails OR lock-in test fails: output a REVISED draft with the offending phrases rewritten, preserving the Liquid scaffolding and behavioral data references.
6. If all clean: output CLEAN verdict with the original draft passed through.

CONSTRAINTS
- You may revise prose. You MAY NOT change the Liquid variables, the behavioral data references, the social-proof sentence count, or the structural elements (callouts, CTA).
- Revisions stay within the original draft's voice register (per Wave 2A §3 transactional-tier platform-chronicler).
- Do NOT add new content. Only remove or reword.

OUTPUT FORMAT
For each draft:
```yaml
draft_id: [name]
verdict: CLEAN | REVISED | BLOCK
banned_patterns_found:
  - {pattern: BANNED-N, citation: "[line]"}
ai_feel_markers_found:
  - {marker: N, citation: "[line]"}
cringe_test: PASS | FAIL (and which sentence)
lock_in_test: PASS | FAIL (and why)
revised_draft: |
  [if REVISED: the full revised draft]
revision_log:
  - "[change made and why]"
```

ANTI-SHORTCIRCUIT RULES (VERBATIM 1-5)
1. Negative findings need positive proof. "No BANNED patterns found" must be accompanied by "scanned BANNED-01 through BANNED-10 individually."
2. Skill names don't transit. If you invoke editorial-review:style, run all steps.
3. No spend cap. No effort cap. Scan thoroughly. If a sentence is borderline, mark it and propose a revision. Better to over-flag than under-flag.
4. Mid-stream verification: after revising, re-scan the revised draft. AI-feel markers can sneak back in during revision.
5. Spot-read before completion: read your final output end-to-end. Confirm every draft has a verdict, and every revision has a log entry.
```

### 3.5 Revision Pass Agent (Phase 5) — FULL PROMPT

```
ROLE
You are the Revision Pass Agent. You receive a draft that failed Phase 3-GATE or Phase 4-GATE with a specific edit brief, and you produce a revised draft that addresses the brief without introducing new failures.

CONTEXT (FULL)
[paste original draft]
[paste edit brief from gate]
[paste the relevant rubric dimensions that failed]
[paste the voice exemplar corpus from Phase 1]
[paste banned-pattern list]

TASK
Address every dimension flagged in the edit brief. Produce a revised draft.

CONSTRAINTS
- Do NOT change dimensions that already passed. Only fix what was flagged.
- Preserve Liquid scaffolding, behavioral data references, social-proof sentence.
- After revising, self-score against the failed dimensions only.
- If the edit brief is contradictory (e.g., "shorten" vs. "add specificity"), surface the contradiction; do not silently choose.

DEPTH-CAP RULE
This is a recursive phase capped at depth 2. If this is REVISION-2 and the draft still fails, escalate to "ESCALATE-TO-HUMAN-EDIT" verdict — do not produce REVISION-3.

OUTPUT FORMAT
- Revised draft (same format as Phase 2 output)
- Per-dimension self-score on the previously-failed dimensions
- Revision-N tag

ANTI-SHORTCIRCUIT RULES (VERBATIM 1-5)
[paste the 5 rules]
```

### 3.6 Social-Proof Injector Agent (Phase 6) — PROMPT SKELETON

Inputs: Phase-4-passed drafts + `2026-05-04-social-proof-data.md`.
Task: confirm each draft has ≥1 BQ-sourced social-proof sentence per Wave 1A D4. If missing, inject one matched to the email type. If present, confirm the BQ source query is cited.
Constraint: do not generate fabricated proof. Only inject if a verified BQ-sourced sentence is available in the social-proof-data file.
Output: drafts with social-proof block confirmed and BQ source cited.

### 3.7 Final Assembly Agent (Phase 7) — PROMPT SKELETON

Inputs: all passed drafts + current cards.ts.
Task: produce a git diff that adds new variants under `v2` tag for each transactional email and the editorial reactivation. Preserve existing variants for A/B comparison. Format the diff for paste-into-PR.
Constraint: do not modify existing variants. Add new variants only. Maintain TypeScript type compatibility with the cards.ts schema.
Output: git diff + commit message draft.

---

## §4. Verification Gates

Per thoth Anti-Shortcircuit Rule 4: between data-gathering and synthesis stages, insert gates. These gates parse upstream output and reject continuation if substantive content is missing.

### 4.1 Gate 0 — Tier Triage Confirmation
**Position:** End of Phase 0, before Phase 1 launches.
**Parses:** `2026-05-04-whale-tier-deferred.md` exists and lists the 3 unblocks. Tier-list confirms 5 transactional + 1 editorial + 1 deferred.
**Kick-back trigger:** If whale-tier-deferred doc missing or unblocks not enumerated, kick back to Magic (orchestrator) — do not proceed to exemplar curation.

### 4.2 Gate 1 — Exemplar Corpus Sufficiency Gate
**Position:** End of Phase 1, before Phase 2 launches.
**Parses:** `2026-05-04-voice-exemplar-corpus.md` for: total exemplar count (must be ≥10); platform-chronicler count (must be ≥3); BANNED-pattern scan must show 0 hits; "Gaps surfaced" section populated honestly.
**Kick-back trigger:** count <10, or any BANNED pattern detected, or "Gaps surfaced" section is empty (suspicious — exemplar curation almost always reveals gaps; empty section means agent shortcircuited).
**Special:** This gate also requires Roham sign-off on the corpus before transactional drafts can read from it. The agent populates the corpus; Magic routes to Roham; only after Roham marks ≥10 exemplars APPROVED does Phase 2 launch.

### 4.3 Gate 3 — Rubric Review Substance Gate (LOAD-BEARING — primary anti-hollow-data gate)
**Position:** End of Phase 3, before Phase 4 launches.
**Parses:** `2026-05-04-rubric-review-v2.md` for: every draft has all 12 dimensions scored (no "TBD" or "could not assess" without schema-proof); every <3 score has a specific citation; every PROCEED verdict has all dimensions ≥3 (transactional) or ≥4 (editorial); contradictions between auto and judgment agents are surfaced not silently averaged.
**Kick-back trigger:** any "approximately," "would suggest," "appears to," "likely" without numbers and citations in the scoring evidence (per Anti-Shortcircuit Rule 4 verbatim). Any dimension scored without evidence cited. Any draft missing a verdict.
**This gate is the most critical** — synthesis-on-hollow-data here means shipping drafts that look reviewed but weren't.

### 4.4 Gate 4 — AI-Feel Cleanliness Gate
**Position:** End of Phase 4, before Phase 6 launches (or before Phase 5 if revisions needed).
**Parses:** Phase 4 output for: every draft has a verdict (CLEAN / REVISED / BLOCK); every REVISED draft has a revision_log; every BANNED-pattern-found citation maps to an actual line in the draft (not invented); cringe_test and lock_in_test results are populated.
**Kick-back trigger:** any draft missing a verdict; any "no patterns found" claim without "scanned BANNED-01 through BANNED-10 individually" provenance; any revised draft where the revision_log doesn't explain each change.

### 4.5 Gate 6 — Social-Proof Verification Gate
**Position:** End of Phase 6, before Phase 7.
**Parses:** Each draft has ≥1 social-proof sentence with BQ source query cited. The N value in the sentence matches the BQ output (orchestrator can spot-check 1 of 6 randomly).
**Kick-back trigger:** any social-proof sentence without source query; any social-proof sentence with a fabricated number.

### 4.6 Gate 7 — cards.ts Patch Validity Gate
**Position:** End of Phase 7, before Phase 8 (Roham hand-off).
**Parses:** Git diff is valid TypeScript; new variants are tagged v2; existing variants preserved; commit message format matches `[REWRITE v2] Email type — Description`.
**Kick-back trigger:** TS compile error; existing variant modified; commit message non-conforming.

### 4.7 Gate 8 — Spot-Read Final Gate (orchestrator — Magic)
**Position:** End of Phase 8.
**Parses:** Magic reads load-bearing files end-to-end (per §5 below) and confirms substantive completion. Per Anti-Shortcircuit Rule 5: structural completion is not sufficient.

---

## §5. Spot-Read Protocol (Anti-Shortcircuit Rule 5)

Before Magic (orchestrator) declares the swarm complete and hands to Roham, Magic MUST read end-to-end:

1. **`/opt/magic/collect-hq/strategy/2026-05-04-voice-exemplar-corpus.md`** — verify ≥10 exemplars, no BANNED patterns, gaps surfaced honestly. (Phase 1 output)
2. **`/opt/magic/collect-hq/strategy/2026-05-04-transactional-drafts-v2.md`** — read every draft, every line. Apply the cringe test personally. Look for any sentence Magic-as-reader stumbles on. (Phase 2/2E output)
3. **`/opt/magic/collect-hq/strategy/2026-05-04-rubric-review-v2.md`** — read every score, every evidence citation. Look for "approximately" / "would suggest" / "likely" without numbers. (Phase 3 output — the load-bearing review file)
4. **Updated drafts file post-Phase-4** — verify revisions are improvements, not regressions. (Phase 4 output)
5. **Final cards.ts diff** — verify the Liquid scaffolding is production-grade, the Fast Break URL truncation is patched, the variant tagging is correct. (Phase 7 output)
6. **`/opt/magic/collect-hq/strategy/2026-05-04-rewrite-review-brief.md`** — Magic's own brief to Roham. Verify it says what Magic believes, not what Magic thinks Roham wants to hear.

If any of these reads surfaces hollowness ("approximately X," "this would suggest Y," "likely Z" without numbers/citations), **the swarm is not complete.** Push back to the responsible phase. Do not optimize for "swarm-finished" structural signal.

---

## §6. Failure Handling

### 6.1 Per-agent failure modes

| Agent | Timeout | Garbage output | "CANNOT DETERMINE" |
|---|---|---|---|
| Exemplar curator | Re-dispatch with explicit "spend more compute, read all 6 sources fully" | Diagnose (too-broad scope? skipped sources?), rewrite prompt, re-dispatch | Reject — exemplar curator cannot return CANNOT DETERMINE; if no exemplars exist, the corpus is the gap report |
| Transactional draft (any of 5) | Re-dispatch with same prompt — drafts are self-contained | Read output, identify failure (no exemplar grounding? wrong register? missed Liquid spec?), fix prompt, re-dispatch | Reject — draft agents cannot return CANNOT DETERMINE; if a behavioral variable doesn't exist, agent must surface the gap and propose a fallback |
| Reactivation data assembler (1E) | Re-dispatch via Heimdall (BQ retries) | Diagnose (wrong segment definition? math computation error?), fix, re-dispatch | Acceptable IF accompanied by schema-proof from Heimdall that the column doesn't exist (per Rule 1) |
| Auto-dimension rubric agent | Re-dispatch | Re-dispatch with explicit "score every draft, every dimension" | Reject — auto dimensions are programmatic; CANNOT DETERMINE means agent didn't try |
| Judgment-dimension rubric agent | Re-dispatch | Re-dispatch with stricter voice-judgment criteria | Reject — judgment agent must score |
| Rubric integrator | Re-dispatch with both upstream outputs re-pasted | Re-dispatch with "address every contradiction explicitly" | n/a |
| AI-feel review agent | Re-dispatch | Re-dispatch with stricter "scan EACH banned pattern individually" | Reject — AI-feel scan is exhaustive; CANNOT DETERMINE means agent didn't scan |
| Revision pass agent | Re-dispatch | Re-dispatch with edit brief expanded | If revision-2 still fails: ESCALATE-TO-HUMAN-EDIT (depth cap rule) |
| Social-proof injector | Re-dispatch | Re-dispatch | If no BQ-sourced social proof available for a draft: surface the gap, do not fabricate |
| Final assembler | Re-dispatch with cards.ts re-pasted | Diagnose TS compile error, fix, re-dispatch | n/a |

### 6.2 Phase-level failure modes

- **If Phase 1 (exemplar corpus) fails to produce ≥10 exemplars**: stop the swarm. Roham must produce or approve more exemplars before transactional drafts can run. This is a known unblock, not a swarm failure.
- **If Phase 2 produces 5 drafts that all BLOCK on the same dimension**: prompt-level systemic issue; rewrite the Phase 2 prompt template before re-dispatching.
- **If Phase 3-GATE kicks back >2 times for the same draft**: escalate that draft to Phase 5 with depth-2 cap; if still failing, escalate to human edit.
- **If Phase 4-GATE catches BANNED patterns the rubric review missed**: this is a coverage gap in the rubric review prompts; update the rubric agent prompts before next iteration.

### 6.3 Orchestrator-level failure modes

- **If Magic's spot-read finds hollowness**: kick back to the responsible phase. Do NOT smooth over by editing the load-bearing file directly; that hides the failure mode for next iteration.
- **If the swarm is taking >150% of estimated time**: pause and diagnose. Time overruns usually mean an agent is in a retry loop or a gate is rejecting persistently. Read the gate output.

---

## §7. Tier Modulation (Operational Definition)

### 7.1 Transactional tier (5 emails)
**Pipeline:** Phase 0 → 1 → 2 → 3 → 3-GATE → 4 → 4-GATE → (5 if needed) → 6 → 7 → 8.
**Voice ownership:** LLM owns prose, grounded in exemplars + behavioral data. Liquid owns structure. Magic (orchestrator) owns spot-read gates.
**Review threshold:** all 12 dimensions ≥3.
**First-50-emails human gate:** transactional drafts auto-ship after rubric+AI-feel pass, BUT the first 50 actual sends per email type are human-reviewed (Sam W. or Roham proxy) before send. After 50, sample-based audit (1-in-10).

### 7.2 Editorial tier (1 email — Reactivation)
**Pipeline:** Phase 0 → 1 + 1E → 2E (HUMAN AUTHOR) → 3 → 3-GATE → 4 → 4-GATE → (5 if needed, kicks back to HUMAN) → 6 → 7 → 8.
**Voice ownership:** Sam W. (or designated editor) owns prose. Magic (LLM) owns:
  - Per-segment data payload (5 specific Moments per segment, math per segment, social-proof candidates per segment) — Phase 1E
  - Subject-line variant generation (5-8 candidates) — could run as a sub-phase between 2E and 3
  - AI-feel scan on the human-authored draft (Phase 4) — second-pair-of-eyes pass
  - Rubric scoring on the editor's draft (Phase 3)
  - Banned-phrase scan (Phase 4)
**Review threshold:** all 12 dimensions ≥4 (higher bar — voice surfaces have less room for slip).
**Human author capacity check:** Sam W.'s capacity must be confirmed before Phase 2E launches. If Sam is at capacity, the editorial tier slows to whatever throughput Sam can sustain; LLM does NOT fall back to authoring.
**Positive-Math Gate:** D2 is hard-blocking before send per segment. If Segment X math is negative, that segment's email pivots angle (platform excitement / new feature / playoffs) per Phase 1E output.

### 7.3 Deferred tier (1 email — Whale Concierge)
**Pipeline:** Phase 0 only.
**Output:** `2026-05-04-whale-tier-deferred.md` documenting:
1. The 3 unblocks (per Wave 2A §6):
   - Per-collector real-data pipeline (BQ → Customer.io journey attributes — depends on Atlas `consumer` schema provisioning + BQ IAM credential refresh)
   - Named editor seat (Sam W. capacity allocation specific to whale tier)
   - Phase 2 CIO send authorization
2. The unblock-trigger conditions (when prerequisites are met, the whale tier re-enters the swarm under a separate execution; this swarm does NOT touch whale-tier drafts)
3. The hold-state acknowledgement: NO whale-tier programmatic emails ship between framework approval and prerequisite-met state. This is Bet 5 from Wave 2A §7.

### 7.4 What "LLM assist" looks like operationally for the Editorial tier

Concretely:
1. **Magic computes per-segment data** (Phase 1E): "Segment A — Origin Story Holders, $100K+ LT, dormant. Average entry price $X, current avg floor $Y, math is +Z%. 5 specific Moment recommendations for re-engagement: [list]. 3 social-proof sentence candidates: [list]. Suggested angle: portfolio-appreciation lead."
2. **Magic delivers the data payload to Sam W.** as a structured brief (markdown document with all data).
3. **Sam W. drafts the prose** — 250-450 words for the segment-A body, similar for B and C. Sam owns the angle, the lead, the voice.
4. **Magic generates 5-8 subject-line candidates** based on Sam's draft.
5. **Magic runs the rubric review** on Sam's drafts (Phase 3) — same agents as transactional, just with editorial threshold (≥4).
6. **Magic runs the AI-feel scan** on Sam's drafts (Phase 4) — humans can write AI-feel too, especially under deadline; this is a guard.
7. **Roham approves** before send.

The LLM never owns the prose body. Magic does NOT propose the prose; Magic proposes the data + subject lines + scan results.

---

## §8. Estimated Time + Cost

### 8.1 Time estimate per phase

| Phase | Duration (wall-clock) | Notes |
|---|---|---|
| Phase 0 (tier triage + whale defer doc) | 15 min | Magic-orchestrator only |
| Phase 1 (exemplar curation, single-agent Opus) | 45-90 min | Reads 6 sources thoroughly; depth not breadth; Roham sign-off adds async waiting |
| Phase 1E (reactivation data assembly via Heimdall) | 30-60 min | Depends on BQ query latency for 3 segments |
| Phase 2 (5 transactional drafts in parallel, Sonnet) | 20-40 min | All 5 drafts run in parallel — wall-clock = slowest agent |
| Phase 2E (Sam W. prose draft, human) | 4-8 hours wall-clock OR 2-3 days async | Human dependent; framework operates as if Sam can deliver in 1 working day |
| Phase 3 (rubric review fan-out + integrator) | 30-45 min | 2 Sonnet agents in parallel + Opus integrator sequential |
| Phase 3-GATE | 5 min | Programmatic parse |
| Phase 4 (AI-feel review) | 20-30 min | Sonnet, sequential per draft |
| Phase 4-GATE | 5 min | Programmatic parse |
| Phase 5 (revision pass — only if needed) | 20-40 min × N drafts kicked back | At depth-cap 2, max 2 iterations per draft |
| Phase 6 (social-proof injection) | 15-25 min | Sonnet, sequential |
| Phase 6-GATE | 5 min | Programmatic |
| Phase 7 (final assembly + cards.ts patch) | 15-30 min | Sonnet, sequential |
| Phase 8 (Magic spot-read + Roham brief) | 30-60 min | Magic reads 5 load-bearing files end-to-end |

**Total wall-clock if everything goes first-pass:**
- Transactional-only path: ~3.5-5 hours (excluding Roham exemplar sign-off async time, ~24h additional)
- Editorial path: ~3.5-5 hours of swarm time + 1 working day of Sam W. authoring time (parallel to other transactional work)
- With one revision cycle at Phase 5: add ~30 min

**Total wall-clock realistic estimate (with 1 revision cycle on 1-2 drafts):**
- Transactional: ~4.5-6 hours
- Editorial reactivation prose: 1 working day (Sam W.) async, parallel to swarm

### 8.2 Cost estimate (rough, 2026 Anthropic API rates)

| Phase | Model | Token estimate (input + output) | Approx cost |
|---|---|---|---|
| Phase 1 (exemplar curator, Opus) | Opus 4.7 | 80K in + 15K out | ~$3.50 |
| Phase 1E (data assembler, Sonnet + Heimdall BQ) | Sonnet | 30K in + 5K out + BQ scan cost | ~$0.75 + BQ scan ~$0.20 |
| Phase 2 (5 transactional drafts, Sonnet) | Sonnet × 5 | 5 × (40K in + 3K out) | ~$3.50 |
| Phase 3 (2 Sonnet + 1 Opus integrator) | Sonnet × 2 + Opus × 1 | 2×(60K in + 8K out) + 1×(50K in + 10K out) | ~$3.50 |
| Phase 4 (AI-feel review, Sonnet) | Sonnet | 50K in + 10K out × 6 drafts | ~$2.50 |
| Phase 5 (revision, Sonnet, conditional) | Sonnet × N (typically 1-2) | N × (30K in + 3K out) | ~$0.50 - $1.00 |
| Phase 6 (social-proof, Sonnet) | Sonnet | 30K in + 3K out | ~$0.50 |
| Phase 7 (final assembly, Sonnet) | Sonnet | 40K in + 5K out | ~$0.75 |
| **Total estimated swarm cost** | | | **~$15-20** |

**Gates and verification add minimal cost** (Sonnet, small parses): ~$1 total across all gates.

**Cost is not a binding constraint** at this scale. Time is the binding constraint, and the estimate is 1 working day for the LLM swarm + 1 working day of human author capacity (parallel) for the editorial tier.

### 8.3 Roham's perspective

This is **a 1-day run, not a 30-min run and not a 3-hour run.** The swarm itself is ~5-6 hours of execution time (mostly waiting on agents); Roham's exemplar sign-off is the long pole on async wait (~24h); Sam W.'s editorial prose is parallel (~1 working day).

If Roham wants a faster path: the transactional-only sub-pipeline (skip editorial entirely for v2, defer reactivation prose to a later cycle) runs in ~5-6 hours wall-clock + 24h async for exemplar sign-off. Editorial reactivation can ship in cycle N+1.

---

## §9. Internal consistency check

- §1 patterns map cleanly to §2 phase roster (Pipeline-with-Map-Reduce-and-Fan-Out-embedded). ✓
- §3 prompts embed all 5 anti-shortcircuit rules in every agent. ✓
- §4 gates address the dominant Pipeline failure mode (synthesis on hollow data). ✓
- §5 spot-read protocol commits Magic to Anti-Shortcircuit Rule 5. ✓
- §6 failure handling defines per-agent + phase-level + orchestrator-level recovery. ✓
- §7 tier modulation matches Wave 2A §1's two-tier verdict + §2's per-email assignment + §3's voice register per tier. ✓
- §8 time/cost estimate is realistic and grounded in known Anthropic API rates. ✓

The orchestration spec is internally consistent with Wave 2A's strategy commitments and applies thoth methodology rigorously.

---

*End of Orchestration Spec. Companion: 2026-05-04-rewrite-action-plan.md (one-pager for Roham greenlight).*
