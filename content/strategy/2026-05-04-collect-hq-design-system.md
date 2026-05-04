---
title: Collect HQ — Visual Design System
date: 2026-05-04
author: Magic (Information Architect)
status: SPEC — companion to IA spec; feeds Site Builder agent for component implementation
purpose: Define the visual grammar — palette, typography, card types, status badges, confidence indicators, navigation, empty states, imagery — for Collect HQ. Extends Top Shot's existing tokens to a portfolio-scope hub that must accommodate Disney Pinnacle and NFL ALL DAY as siblings.
companion: 2026-05-04-collect-hq-ia-spec.md (information architecture)
reference: https://finance-hq-seven.vercel.app/ (the bar to clear) and `2026-05-04-email-design-system.md` (Top Shot brand spine that cascades here)
---

# Collect HQ — Visual Design System

## 0. Premise

Collect HQ is a portfolio hub, not a Top Shot product surface. The visual grammar must:
1. Inherit the Top Shot brand spine (flame / mint / amber / rose / ink) so Top Shot pages feel native.
2. Extend cleanly to Disney Pinnacle and NFL ALL DAY without those siblings inheriting Top Shot's flame as their primary.
3. Carry an independent **system layer** — the "this is the intelligence hub itself" voice — that all three products share but no one product owns.

Three layers stack:
- **System layer** (the hub itself) — neutral, ink-led, navigational chrome, vote primitives, gap badges, confidence chips. The same regardless of which product you're looking at.
- **Product layer** (per product) — accent color override, occasional iconography. Top Shot leads with flame; Pinnacle leads with indigo; NFL ALL DAY leads with forest. The product layer paints the hero band, the active-nav indicator, primary CTAs.
- **Section accent layer** (per IA section) — within a product, each section has a category accent that paints the section's hero ribbon and its primary card-rule color. Helps the visitor track "I am on the Personas page of Top Shot" without reading the breadcrumb.

This three-layer stack is the single most important visual-design decision in this spec. It lets the same component library serve three products and eight sections without the chrome ever feeling generic.

---

## 1. The single most important decision

**Three-layer color system: System × Product × Section.** Spelled out in §0 above.

Why this and not "give Top Shot one palette, Pinnacle another, NFL another, share nothing":
- Site Builder needs ONE component library, not three.
- Roham, Dan, Matt navigate ALL three products in a single session — visual whiplash between hubs would tax cognition and erode the "this is one company's portfolio" thesis.
- The eight IA sections need their own rhythm (Personas is a different read from KPIs is a different read from Open Questions). A flat per-product palette would make all eight sections look identical.

Implementation: every component reads three CSS custom properties — `--system-accent`, `--product-accent`, `--section-accent` — and composes from them. Switching products swaps `--product-accent`; switching sections swaps `--section-accent`. The component code never knows which product or section it's rendering.

---

## 2. Brand palette

### 2.1 System layer (ink-led; identical across products)

```
--ink-900   #0A0A0B   — primary text, dark mode background
--ink-800   #16161A   — secondary text on light, primary nav background
--ink-600   #3D3D45   — body text on light
--ink-400   #8A8A92   — captions, source citations, timestamps
--ink-200   #D4D4D8   — dividers, table lattice
--ink-100   #ECECEE   — surface elevation 1
--ink-050   #F7F7F8   — page background light mode
--white     #FFFFFF
```

Vote/comment/feedback primitives use ink. Gap badges, confidence chips, status badges all ink-spine with semantic accents on top.

### 2.2 Product accent layer

```
TOP SHOT
--ts-flame      #E9461B    — primary accent (CTAs, active-nav indicator, hero ribbon when on Top Shot pages)
--ts-flame-dim  #C13A14    — flame on hover/active
--ts-flame-tint #FFE4DA    — flame at 12% opacity background

DISNEY PINNACLE
--dp-indigo      #3D2D7A
--dp-indigo-dim  #2A1F58
--dp-indigo-tint #E5DFFA

NFL ALL DAY
--nf-forest      #1F4D2C
--nf-forest-dim  #143820
--nf-forest-tint #DEEDE2
```

Why these specific siblings: Pinnacle's indigo nods to Disney's Pinnacle wordmark in the existing brand. NFL ALL DAY's forest nods to football grass + the wholesome-Americana register that NFL ALL DAY's brand is built on. Neither competes with Top Shot flame on the same page (they swap, never coexist).

### 2.3 Section accent layer (semantic; same across products)

```
HOME           --sec-home      = ink (no accent — neutral entry)
STACK          --sec-stack     = #B86A1C (rust)        — "machinery"
INITIATIVES    --sec-init      = #1B6E89 (teal)        — "active bets"
PERSONAS       --sec-personas  = #6B3F99 (violet)      — "people"
ROADMAP        --sec-roadmap   = #C19A2C (amber-gold)  — "time"
KPIS           --sec-kpis      = #2D7A3A (forest-mid)  — "measurement"
RESEARCH       --sec-research  = #2D5A7A (steel-blue)  — "evidence"
OPEN QUESTIONS --sec-questions = #B83A4D (claret)      — "blockers"
TEAM           --sec-team      = #3D6B5C (sage)        — "humans"
```

Section accent appears as: a 4px top-rule on the hero ribbon, a left-border on featured cards, and the underline on active nav links. It does NOT replace the product accent on CTAs.

### 2.4 Top Shot's existing supporting palette (preserved)

```
--ts-mint       #5DC9A6   — secondary positive ("after" / completed / mint-still-available)
--ts-amber      #E0A93B   — Liquid-mode tags, market-data callouts, time-warning
--ts-rose       #D14B6B   — destructive, broken-in-prod, kill confirmation
```

These are kept for Top Shot–native components (the email design system uses them; Collect HQ pages that show Top Shot intelligence inherit them). They are NOT the system semantic palette — the system uses ink + section accents.

### 2.5 Semantic states (system level)

```
--state-live      #2D7A3A   (green)   — running, healthy, on-track
--state-iterating #C19A2C   (amber)   — in-progress, monitoring
--state-broken    #C04020   (red-rust)— production defect, urgent
--state-stopped   #6B6B73   (slate)   — paused, deferred, killed
--state-blocked   #B83A4D   (claret)  — depends on someone else
--state-gap       #8B5A1C   (sienna)  — data missing with remediation
```

Semantic state colors are independent of section/product accents. A `live` badge is the same green on a Top Shot Stack card as on a Pinnacle Initiatives card.

---

## 3. Typography scale

### 3.1 Family

- **Display:** geometric sans, slight industrial cut. Same family used in Top Shot email design system. Reference: Söhne Breit, Neue Haas Grotesk Display, or similar weight progression. Weights used: 400, 600, 700.
- **Body:** humanist sans for long-read prose. Reference: Inter, Söhne, Söhne Breit. Weights: 400, 500, 600.
- **Mono:** geometric monospace for serial numbers, market values, BQ query references, file paths in citations. Reference: JetBrains Mono, IBM Plex Mono. Weights: 400, 500.

### 3.2 Scale

```
Hero            display 56/60   weight 700  tracking -0.02em
H1              display 40/44   weight 700  tracking -0.01em
H2              display 28/32   weight 600
H3              display 22/26   weight 600
H4              display 18/22   weight 600
Body-Large      body    17/26   weight 400
Body            body    15/24   weight 400
Body-Small      body    13/20   weight 400
Caption         body    12/16   weight 500  tracking 0.02em  uppercase optional
Mono-Value      mono    16/20   weight 500
Mono-Caption    mono    12/16   weight 400
Eyebrow         caption 11/14   weight 600  tracking 0.08em  uppercase
```

### 3.3 Hierarchy rules

- Hero is reserved for the Home page's mission line. No other page uses Hero.
- H1 is the section title (Stack / Initiatives / etc.). One per page.
- H2 is the sub-section (e.g., "Email" within Stack). Multiple per page.
- H3 is the card title.
- H4 is intra-card sub-headings (e.g., "Mechanism" / "Owner" / "Source").
- Eyebrows are used for tier labels on cards: `DATA FINDING` / `MARKET SIGNAL` / `COLLECTOR VOICE` — also for state callouts.
- Mono is *only* for: numeric values, source citations, file paths (rendered as URL chips), serial numbers, percent values inline (e.g., "CTR 4.85%"), and timestamps.

---

## 4. Card grammar — five reusable card types

Every page composes from these five card primitives. Variants are layout-light parameter changes; each primitive has a fixed visual identity.

### 4.1 `stat-tile`

**Used by:** KPIs (every metric tile), Home (now-band metric chips), Stack (campaign metrics).

**Shape:** rectangular, 1.5:1 ratio at default. Top-left: eyebrow (METRIC NAME). Top-right: state circle (green / amber / red / sienna `GAP` / unfilled = unknown). Center: large mono-value (the number). Below: thin H4 sparkline label (where applicable). Bottom: caption with source link + last-refreshed timestamp.

**Color rules:** background `--ink-100` (light) / `--ink-800` (dark). Section accent paints a 2px top-rule. Numeric value uses `--ink-900` regardless of state (the state circle carries the semantic). When state is `--state-broken` or `--state-gap`, add a faint tint background (12% opacity).

**Variants:**
- `stat-tile-large` — 2:1 ratio, used for Home anchor metrics. Adds a sparkline visual to the right of the value.
- `stat-tile-funnel` — chained tiles connected by chevrons; used for funnel visualization on KPIs.
- `stat-tile-gap` — the `GAP` state. Sienna left-border + a one-line "what would close this" remediation in the body. NEVER hidden, never silent.

### 4.2 `persona-card`

**Used by:** Personas (lifecycle ladder, archetype grid, dormant whale segments, reactivation tiers), Team (people are a persona variant).

**Shape:** rectangular, 4:5 portrait orientation. Top: 1:1 image slot (illustrated avatar for archetypes; AI-generated archetype mark; photo for Team where licensed). Below image: H3 name. Below name: eyebrow (TIER / ARCHETYPE / ROLE). Body: 2–3 line definition + a single italic kill-condition or trigger line. Footer: cohort size (mono, prominent) + confidence chip.

**Color rules:** background `--ink-050`. Section accent paints a 2px left-border. Tier number badge (L0–L4 or Type 1–4) lives top-right corner.

**Variants:**
- `persona-card-rich` — full archetype/dormant card with mechanism sub-section.
- `persona-card-slim` — Team variant; smaller image, role + current-focus + IDP link only.
- `persona-card-tier` — lifecycle ladder step; horizontal rather than portrait, used in the ladder visualization.

### 4.3 `initiative-card`

**Used by:** Initiatives (every bet), Roadmap (each swimlane card is an initiative reference).

**Shape:** rectangular, slightly wider than tall (5:4). Top-left: stage badge (`proposed` / `discovery` / `pre-launch` / `iterating` / `live` / `blocked` / `killed`). Top-right: confidence band (visual; see §6). Center: H3 title + 1-line mechanism statement. Body: KPI line (mono target) + owner avatar/name. Footer: persona-tag chips (which lifecycle tier / archetype this serves) + stack-tag chips (which surface delivers it). Bottom: vote primitives (ship / needs-work / no) and comment count.

**Color rules:** background `--ink-050`. Stage badge uses semantic state color. Section accent paints the bottom 4px rule. When `blocked`, the card gets a sienna left-border AND a small chip linking to the blocking GAP/Open Question.

**Variants:**
- `initiative-card-roadmap` — slimmer (used in Roadmap swimlanes); drops the persona/stack chips, keeps stage + KPI + owner.
- `initiative-card-detail` — full-width detail page header card; expanded mechanism, evidence trail link, dependency diagram.

### 4.4 `research-finding`

**Used by:** Research (all three tiers; Data / Market / Voice), Home (now-band cards inherit this with slight slimming).

**Shape:** horizontal rectangle, 2.5:1. Left strip (60px): tier indicator — vertical eyebrow text `DATA FINDING` / `MARKET SIGNAL` / `COLLECTOR VOICE` rotated 90deg, on a tier-tinted background (Data: steel-blue tint; Market: amber tint; Voice: violet tint). Center: H3 title + 2-line mechanism statement + body excerpt. Right (compact): date (mono), confidence chip (numeric for Data/Market, sentiment for Voice), source citation as a clickable URL chip.

**Color rules:** background `--ink-050`. Tier strip uses tier-specific tint (consistent across Research). Hover state: card lifts 2px, source citation expands to show the breakdown of the confidence score (mechanism / sample / replicability).

**Variants:**
- `research-finding-now` — compressed for the Home now-band; drops the tier strip in favor of a small tier eyebrow above the title.
- `research-finding-voice` — Collector Voice: replaces numeric confidence with a sentiment chip (positive / neutral / negative) + source count chip ("23 community posts").

### 4.5 `open-question-vote-card`

**Used by:** Open Questions (every question), KPI page (`is this the right metric` votes), Initiative page (per-card votes), Stack (per-campaign votes).

**Shape:** rectangular, 3:1 horizontal. Left: question/item ID badge in mono (Q-7.1 / KPI-W0 / INIT-REACTIVATION). Center: H4 title + body sentence (the question, or "ship/needs-work/no this initiative?"). Right: three vote buttons stacked vertically OR three pills horizontally (depending on context). Bottom strip: vote tally — small bars showing distribution (`ship: 4 · needs-work: 1 · no: 0`).

**Color rules:** background `--ink-050`. ID badge uses ink. Vote buttons: `ship` is `--state-live` outlined; `needs-work` is `--state-iterating` outlined; `no` is `--state-broken` outlined. When the user has voted, the chosen pill fills with its state color and the others fade to 40%. Section accent paints the right 4px rule (so question cards on the Open Questions page have a claret rule; the same card primitive on the Initiatives page has a teal rule).

**Variants:**
- `open-question-vote-card-blocker` — adds a left red-border + ETA confidence chip (tracking / at-risk / stuck).
- `open-question-vote-card-win` — used in Recent Wins; replaces vote buttons with a `landed` chip + landed-date timestamp.
- `open-question-vote-card-cross-product` — adds purple `XP` chip top-right.

---

## 5. Status badges

### 5.1 Lifecycle / stage badges (used on Initiatives, Stack, Roadmap)

Pill-shape, 24px height, uppercase eyebrow text inside, semantic color background at 100% with white text:

```
LIVE              --state-live      (green)
ITERATING         --state-iterating (amber)
PRE-LAUNCH        --ink-600         (slate-strong)
DISCOVERY         --ink-400         (slate-medium)
PROPOSED          --ink-200         (slate-light, dark text)
BROKEN-IN-PROD    --state-broken    (red-rust)
STOPPED           --state-stopped   (slate-mid)
DEFERRED          --state-stopped   (slate-mid)  italic
KILLED            --state-stopped   (slate-mid)  strikethrough
BLOCKED           --state-blocked   (claret)
```

### 5.2 Data badges (used on KPIs, Stack, Research)

Same pill shape, slightly different family:

```
LIVE METRIC       --state-live      (green)
WEEKLY REFRESH    --ink-600         + mono "weekly" text
DAILY REFRESH     --ink-600         + mono "daily" text
MISSING           --state-gap       (sienna)
GAP §7.X          --state-gap       (sienna) + GAP-id link → /gaps/<id>
```

### 5.3 Cross-product badge

Used to tag cross-product synthesis findings or open questions:

```
XP                --dp-indigo (purple) at 100%, white text, 16px corner pill
```

### 5.4 Tier eyebrows for Research

Vertical strip indicators (see card type 4.4):
- DATA FINDING — steel-blue tint
- MARKET SIGNAL — amber tint
- COLLECTOR VOICE — violet tint

Distinct from stage badges; they identify *origin* not *status*.

---

## 6. Confidence indicators

Three rendering modes depending on the data type:

### 6.1 Numeric confidence (0.0–1.0) — Research Data + Market findings, Initiatives

Three-component visual:
- A 3-segment bar (mechanism / sample / replicability) — each segment fills proportionally to its sub-score.
- Numeric label `0.86` displayed in mono.
- Below 0.6 → bar tints to amber (`--state-iterating`); below 0.4 → tints to sienna (`--state-gap`) and a `low confidence — what would close this?` ghost link appears below.

Rendering: 60px wide, 8px tall bar. Hover reveals the three sub-scores as tooltip mono labels.

### 6.2 Categorical confidence — KPI tiles + Roadmap ETAs

finance-hq's circle legend, extended:
- **Filled green circle** = healthy / on-track / high confidence.
- **Filled amber circle** = monitor / at-risk / moderate.
- **Filled red circle** = concern / stuck / low.
- **Filled sienna circle with `GAP` label** = unknown but with a remediation path (replaces finance-hq's unfilled circle for the actionable case).
- **Unfilled circle** = unknown without remediation path (genuinely unmeasured, no plan yet — the rare case).

12px diameter, top-right corner of any tile.

### 6.3 Sentiment + source-count — Collector Voice only

Two chips side-by-side:
- Sentiment chip: `+` (mint), `–` (rose), `=` (slate). Single character, large, in mono.
- Source-count chip: small mono `23 mentions` or `5 Discord posts` or `1 support ticket theme`.

Replaces numeric confidence on Voice cards because qualitative data doesn't have a meaningful 0.0–1.0 score; it has volume + valence.

---

## 7. Navigation

### 7.1 Pattern

**Top-bar hub-and-spoke**, sticky. Inherits finance-hq's pattern with two extensions:
1. **Product switcher on the left.** A pill-group with three pills: Top Shot (flame) / Pinnacle (indigo) / NFL ALL DAY (forest). The active product highlights. Click swaps the `--product-accent` for the entire site. Default: Top Shot.
2. **Section nav on the right.** Eight sections horizontally: Stack / Initiatives / Personas / Roadmap / KPIs / Research / Open Questions / Team. Active section underlines with `--section-accent` 4px rule.

### 7.2 Sticky behavior

- Top-bar is always sticky (always visible on scroll).
- Each section page has its OWN sticky sub-nav for in-page anchors (e.g., Stack page: surface-group anchors; Personas page: ladder / archetypes / reactivation / dormant). Sub-nav style is small ink-link strip directly under top-bar; appears on scroll past the hero.
- On mobile: top-bar collapses to wordmark + hamburger; product switcher moves into the menu drawer; section nav becomes the drawer's primary list.

### 7.3 Breadcrumb on detail pages

Detail pages (`/initiatives/<slug>`, `/gaps/<id>`, `/research/<id>`) carry a breadcrumb above H1: `Top Shot › Initiatives › Reactivation B-spine`. Clickable hops, ink-color.

### 7.4 Footer

Shared across all pages: refresh cadence summary, GitHub source link (rendered as URL chip), last-commit timestamp, copyright/credits.

---

## 8. Empty states (THE GAP DISCIPLINE)

### 8.1 The hard rule

**No silent missing data.** Roham's standing rule. Every place where data could exist but doesn't, the visitor sees a `GAP` badge with a remediation path. Empty space communicates "we forgot"; a GAP badge communicates "we know and here's the plan."

### 8.2 Three GAP empty-state patterns

**Pattern A: Single-tile GAP** — used when one metric/datapoint is missing but the surrounding context exists. The tile renders normally with a sienna `GAP §7.X` chip in the value slot and a one-line remediation below ("BQ IAM fix pending — Eng owner, no ETA").

**Pattern B: Section GAP banner** — used when an entire sub-section can't be populated. A full-width sienna-tinted banner says "Section pending data — [what's missing], [who's unblocking], [downstream-need]." Below the banner: a faded-out skeleton of what the section would look like (see Pinnacle Stack stub).

**Pattern C: Sibling-product GAP page** — used when a sibling product (Pinnacle / NFL) has no data for an entire IA section. The section renders the page frame with its hero ribbon, then a centered card: "Pinnacle Personas not yet defined here — Persii's surface is canonical for Pinnacle persona research. Filed for cross-product sync week of May 11. [link to Persii]." Never hide the route; the route exists, the answer is "see elsewhere."

### 8.3 Anti-patterns (banned)

- Empty `0` rendered without a state-circle.
- Greyed-out element with no remediation.
- "Data coming soon" without an owner or ETA.
- Hidden route (404) for sibling products.
- Spinner without a fallback.

---

## 9. Imagery treatment

### 9.1 The infographic library

The 22 generated infographics from past Customer.io campaigns + the real CDN-hosted Moment imagery accessible via NBA Top Shot public GraphQL are the asset pool. Rule for use:

**Use real Moment imagery (CDN URLs from GraphQL `momentImage` / `mediaUrl` fields) when:**
- The page references a specific player or play. Always use the actual media. Never a stock illustration in place of a real Moment.
- Pack art is referenced (Stack / Initiatives related to drops). Use `event.packImageURL` style — the actual pack art.

**Use generated infographics when:**
- A concept is being illustrated (e.g., the three-phase demand model timeline, the lifecycle ladder, the certainty premium ratio diagram). The 22 from Customer.io campaigns are the seed library; we extend with section-accent-colored versions.
- A "this is the mental model" panel needs a visual anchor. The infographic carries the model.

**Never use:**
- Stock photography of basketball players.
- AI-generated hero photos of "happy collectors."
- Generic "Web3" / "blockchain" / "crypto" imagery (banned by CLAUDE.md voice rules — also visually banned).
- The same infographic three times on one page.

### 9.2 Hero illustration vs. data hero

Each section page chooses ONE hero treatment:
- **Illustration hero** (Personas, Team, Home) — uses the infographic library or a custom illustrated mark. Covers ~25% of the page above the fold.
- **Data hero** (KPIs, Stack, Research, Open Questions) — replaces the illustration with a *first stat*: a single oversized number plus a line of context. KPIs page leads with the L+XL whale revenue concentration ("66–83% of monthly revenue from XL"). Stack leads with "139 campaigns / 24 running / 1 broken in production." Research leads with "82 findings logged / 12 GAPs flagged / weekly refresh."

Initiatives + Roadmap split: Initiatives uses an illustration hero (the bet portfolio is a creative artifact); Roadmap uses a timeline ribbon as its hero (time is the primary axis).

### 9.3 Photo licensing rule

For Team cards: only use photos where licensing is explicit. Default to a stylized monogram avatar (initials in mono on a section-tinted background) until photo permission is confirmed per-person. Persii's card stays monogram until Persii confirms.

### 9.4 Animation discipline

- Respect `prefers-reduced-motion`.
- No autoplay video. Ever.
- Sparklines, confidence-bar fill, vote-button hover-state are the only animated elements. All <300ms transitions.
- Pack art and Moment thumbnails: static. They have inherent visual heat; motion would compete.

---

## 10. Site Builder readiness

### 10.1 CSS custom property surface

```
:root {
  --ink-900, --ink-800, --ink-600, --ink-400, --ink-200, --ink-100, --ink-050;
  --product-accent: #E9461B;       /* default Top Shot flame; swapped by product switcher */
  --product-accent-dim, --product-accent-tint;
  --section-accent: var(--ink-600); /* default Home; swapped per-route */
  --state-live, --state-iterating, --state-broken, --state-stopped, --state-blocked, --state-gap;
  --ts-mint, --ts-amber, --ts-rose; /* Top-Shot–only supporting palette */
}

[data-product="pinnacle"]   { --product-accent: #3D2D7A; ... }
[data-product="nfl-all-day"] { --product-accent: #1F4D2C; ... }

[data-section="stack"]      { --section-accent: #B86A1C; }
[data-section="initiatives"]{ --section-accent: #1B6E89; }
... (one per IA section)
```

### 10.2 Component manifest

```
StatTile, StatTileLarge, StatTileFunnel, StatTileGap
PersonaCard, PersonaCardRich, PersonaCardSlim, PersonaCardTier
InitiativeCard, InitiativeCardRoadmap, InitiativeCardDetail
ResearchFinding, ResearchFindingNow, ResearchFindingVoice
OpenQuestionVoteCard, OpenQuestionVoteCardBlocker, OpenQuestionVoteCardWin, OpenQuestionVoteCardCrossProduct

StatusBadge (props: variant, label)
ConfidenceBar (props: mechanism, sample, replicability)
ConfidenceCircle (props: state)
SentimentChip (props: valence, sourceCount)

GapBanner (props: gapId, remediation, owner)
GapTile (variant of StatTile)

NavBar (with ProductSwitcher + SectionNav slots)
StickySubNav (props: anchors[])
Breadcrumb (props: trail[])
Footer (props: refreshCadence, lastCommit)

VoteButton (props: variant, state, onVote)
CommissionForm (props: routeContext)
```

### 10.3 Route to section-accent map

```
/                  → home (no accent)
/stack             → rust
/initiatives, /initiatives/<slug> → teal
/personas          → violet
/roadmap           → amber-gold
/kpis              → forest-mid
/research, /research/data, /research/market, /research/voice → steel-blue
/open-questions, /open-questions/cross-product → claret
/gaps, /gaps/<id>  → sienna (treats GAPs as their own thematic; section accent here mirrors the state color because the section literally IS gap-tracking)
/team              → sage
/glossary          → ink (no section accent)
```

### 10.4 Three-things-better — recap of what we surpass finance-hq on

1. **Three-tier research (vs. two)** — Collector Voice is a first-class tier, not embedded in Market Signals or absent. The site-wide visual differentiator is the violet tier-tint on `research-finding-voice` cards plus the sentiment-chip rendering rule in §6.3.
2. **GAP discipline (vs. implicit staging)** — sienna `GAP §7.X` badges everywhere data could-but-doesn't exist; never silent. Three empty-state patterns (single-tile / section banner / sibling-product page) cover every case.
3. **Per-card voting (vs. submit-only commissioning)** — every card type carries a vote primitive routing to `/api/feedback`. The site itself becomes the review apparatus, not a static read with a separate review channel. Per-feedback rule from `feedback_links_not_paths.md`: this is exactly the gate primitive Roham asked for.

### 10.5 Three-things-preserved from finance-hq

1. Top-bar hub-and-spoke with thematic clustering (extended with product switcher).
2. Two-tier (now three-tier) research separation with decimal confidence scores.
3. Mechanism-first storytelling — every claim is translated to the underlying activity (the 30–60% capital-efficiency claim of finance-hq becomes our Embiid 3.2× ratio = "narrative density × certainty premium × supply availability").

---

*Compiled 2026-05-04 by Magic (Information Architect persona).*
*Companion: `2026-05-04-collect-hq-ia-spec.md`.*
*Inherits: Top Shot email design system tokens (`2026-05-04-email-design-system.md`).*
*Status: ready for Site Builder agent. CSS custom properties, component manifest, route map, three-layer color system, five card primitives, status badge inventory, confidence indicator rules, empty-state discipline, and imagery rules all specified.*
