---
title: NBA Top Shot Email Rewrite — Action Plan One-Pager
date: 2026-05-04
read-time: 90 seconds
companion: 2026-05-04-rewrite-swarm-orchestration.md
---

# Email Rewrite — Action Plan

## The plan in 5 phases

1. **Curate a 10-15 piece voice exemplar corpus** from existing Roham-approved Top Shot writing (Pack Received v1001 as North Star, Welcome v1001/Cinematic, structurally-good Reactivation v1001). Held until Roham signs off ≥10 exemplars before any draft agent reads them.
2. **Generate 5 transactional drafts in parallel** (Welcome, Pack Received, Abandoned Cart, Fast Break, Drop Announcement) using Sonnet agents that read the full corpus, are scaffolded with Liquid behavioral-data variables, and embed ≥2 behavioral references inline per Gmail's Feb 2026 AI-spam filter.
3. **Assemble the editorial Reactivation tier in parallel**: Magic computes per-segment data payloads (5 Moments, math with positive-math gate, social-proof candidates per segment) → Sam W. authors prose for Segments A, B, C → swarm rejoins at the rubric stage.
4. **Run a two-stage review gate**: Fan-Out rubric review (Sonnet agent on the 7 auto-scored dimensions + Sonnet agent on the 5 voice-judgment dimensions + Opus integrator), followed by a separate Sonnet AI-feel marker pass against BANNED-01..10 + Wave 1B's 6-marker blocklist + cringe test + lock-in test. Hard gates between phases reject hollow scoring.
5. **Inject BQ-sourced social proof, patch cards.ts with v2 variants, hand to Roham**, with Magic spot-reading every load-bearing file end-to-end before declaring done (Anti-Shortcircuit Rule 5). Whale tier exits at Phase 0 with a documented 3-item unblock list (Atlas consumer schema, Sam W. whale capacity, Phase 2 CIO send auth) — no whale drafts ship.

## Expected output

- **5 transactional v2 drafts** committed to `cards.ts` as new variants (existing preserved for A/B).
- **3 editorial reactivation segment drafts** (A/B/C), Sam W.-authored with LLM data assembly, staged for Phase 2 CIO send-auth.
- **1 deferred-tier doc** with whale unblocks.
- **6 verification-gate artifacts** documenting parse results.
- **1 Roham review brief** summarizing ship/kickback/async items.

## Time + cost estimate

- **Wall-clock:** ~5-6 hours swarm execution + 24h async for Roham exemplar sign-off + 1 working day async for Sam W. editorial prose (parallel). Transactional-only sub-path is the same minus Sam's day.
- **API cost:** ~$15-20 across 11 agent dispatches (Opus on exemplar curation + rubric integrator; Sonnet elsewhere). Cost is not the binding constraint.
- **Human capacity:** Roham (~30 min exemplar sign-off, ~30 min final review), Sam W. (~1 working day for editorial prose, only if editorial proceeds this cycle).

## The 3 risks + mitigations

1. **Exemplar corpus thinner than 10.** *Mitigation:* Phase 1's "Gaps surfaced" section is required. If <10 returned, the swarm pauses for Roham to author/designate additional exemplars. We treat this as the diagnosis it is, not a count to paper over.
2. **Phase 4 AI-feel review aligned to the same blind spots as Phase 3 rubric review.** *Mitigation:* Phase 4 is a SEPARATE LLM call per Wave 1B §5.1; agents read different context (rubric vs. banned-pattern blocklist); gates reject "no patterns found" claims without provenance. If Roham still catches AI-tells in spot-read, prompts update for cycle N+1.
3. **Sam W. at capacity, editorial tier blocks.** *Mitigation:* Editorial runs in PARALLEL to transactional, not sequential. Transactional ships v2 anyway; reactivation slips to cycle N+1. Framework explicitly does NOT fall back to LLM-authoring editorial — that's the failure mode Wave 2A rejected.

## The 1 ask

**Greenlight to execute this swarm as specified, OR specify modifications.** If yes: Magic launches Phase 0 + Phase 1 immediately and routes the corpus to Roham within 24h; Phase 2 onward begins post-sign-off.

The two-tier split from Wave 2A is preserved unchanged. Pattern selection (Pipeline with Map-Reduce and Fan-Out embedded) is thoth-canonical. The 12-dimension rubric from Wave 1A is the load-bearing review gate. Wave 1B's exemplar-prompting and Gmail Feb 2026 filter findings are operationalized in every prompt. Anti-shortcircuit rules embedded verbatim in all 11 agent prompts. Magic's spot-read protocol commits to substantive (not structural) verification.

If the answer is no, iteration 5 follows the same architecture as iterations 1-4 and Wave 1B's evidence says iteration 5 = rejection 5. This swarm is the architecture fix four prompt iterations could not be.
