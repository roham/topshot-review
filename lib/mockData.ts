// Per-card mock data — substituted into Liquid placeholders for the review surface.
// Real campaign URLs from past Customer.io templates where possible; locally-generated
// gpt-image-2 infographics for fields where the Liquid placeholder doesn't resolve to
// a real CDN path (sparkline, dashboards, scorecards, etc).
//
// This is review-only mock data, not production. Real send-time rendering happens
// in Customer.io against actual customer profiles.

export type MockContext = Record<string, unknown>;

// Shared reference URLs — all verified 200 OK on the Customer.io CDN
const ASSETS = {
  packArt:
    "https://userimg-assets.customeriomail.com/images/client-env-161112/1747166167882_03-PACKS-ARE-YOUR-DOORWAY-TO-GREATNESSNEW2_01JV5KFXMNRPTA0J24ESESYX7N.jpg",
  setHero:
    "https://userimg-assets.customeriomail.com/images/client-env-161112/1733254430310_04-MORE-THAN-MOMENTS_01_01JE707FKDZM5GN3VEF7G26DYG.jpg",
  collectorFirstPack:
    "https://userimg-assets.customeriomail.com/images/client-env-161112/1740722955824_01-NEW-COLLECTOR-FIRST-PACK2_01JN5JRSMVBKXQ9YK4ESN8FFAS.jpg",
  packAnimated:
    "https://userimg-assets.customeriomail.com/images/client-env-161112/1734135875841_tier4_01JF18V2BX0TMRW39EA1J2FETP.gif",
  bottomBanner:
    "https://userimg-assets.customeriomail.com/images/client-env-161112/1734135959963_04-MORE-THAN-MOMENTS-bottom_01JF18XMG4SDNNGA4Q6Y9W91A4.jpg",
  winExperience:
    "https://userimg-assets.customeriomail.com/images/client-env-161112/1733248546287_01A-WIN-THE-ULTIMATE-FAN-EXPERIENCE_06_01JE6TKVN6TCK7F2VWH2RBAFBH.jpg",
  // Locally generated infographics in /public/cards/infographics/
  sparkline: "/cards/infographics/sparkline-holdings.png",
  marketDashboard: "/cards/infographics/market-dashboard-thumb.png",
  fastBreakScorecard: "/cards/infographics/fastbreak-scorecard.png",
  dropDatacard: "/cards/infographics/drop-datacard.png",
  whaleChart: "/cards/infographics/whale-chart.png",
  setcard: "/cards/infographics/setcard.png",
  momentPlaceholder: "/cards/infographics/moment-hero-placeholder.png",
};

// Default mock collector — used across most cards for cohesion
const SARAH: MockContext = {
  userName: "Sarah",
  first_session_at: "2021-03-15T10:00:00Z",
  last_session_days_ago: 73,
  lifetime_moments_owned: 47,
  lifetime_value: "$8,420",
  team_count_at_moment: 4,
  notable_holdings_moving: [
    {
      player: "LeBron James",
      set: "Hardwood Classics 2024",
      serial: "842",
      bought_at: "2024-02-12T14:00:00Z",
      bought_price: "$48",
      floor_today: "$112",
      recent_comp: "$196",
      recent_comp_at: "2026-04-30T18:00:00Z",
      pct_change: "+18.2%",
      image_url:
        "https://userimg-assets.customeriomail.com/images/client-env-161112/1747166167882_03-PACKS-ARE-YOUR-DOORWAY-TO-GREATNESSNEW2_01JV5KFXMNRPTA0J24ESESYX7N.jpg",
    },
    {
      player: "Cooper Flagg",
      set: "Rookie Debut",
      serial: "1247",
      bought_at: "2025-11-04T19:30:00Z",
      bought_price: "$24",
      floor_today: "$340",
      recent_comp: "$485",
      recent_comp_at: "2026-05-02T22:00:00Z",
      pct_change: "+24.7%",
      image_url: ASSETS.setHero,
    },
    {
      player: "Donovan Mitchell",
      set: "Pull-Up Three",
      serial: "2418",
      bought_at: "2024-01-20T20:30:00Z",
      bought_price: "$112",
      floor_today: "$245",
      recent_comp: "$312",
      recent_comp_at: "2026-05-03T16:00:00Z",
      pct_change: "+12.1%",
      image_url: ASSETS.collectorFirstPack,
    },
  ],
  holdings_sparkline_url: ASSETS.sparkline,
};

const MARCUS_WHALE: MockContext = {
  userName: "Marcus",
  lifetime_moments_owned: 312,
  lifetime_value: "$147,200",
  lifetime_stage: "L4",
  first_session_at: "2020-10-22T18:00:00Z",
  portfolio_7d_change: "+4.2%",
  portfolio_positions_moved: "27",
  whale_chart_image_url: ASSETS.whaleChart,
};

const WEEK: MockContext = {
  featured_games:
    "Knicks/76ers · Cavs/Pacers · Thunder/Lakers · Spurs/Wolves",
};

const MARKET: MockContext = {
  recent_drop_velocity: "$1.2M cleared in T-30",
  weekly_sales_count: "47,820",
  weekly_median_price: "$64",
  active_set_count: "23",
  new_drops_this_week: "5",
  serial_max: "65,000",
  dashboard_image_url: ASSETS.marketDashboard,
};

// ===================================================================
// Per-card mock contexts. Keys match card IDs in lib/cards.ts.
// ===================================================================

export const MOCK_CONTEXTS: Record<string, MockContext> = {
  "reactivation-drip": {
    customer: SARAH,
    week: WEEK,
    market: MARKET,
  },

  "pack-received-voice": {
    customer: SARAH,
    event: {
      packTitle: "Cooper Flagg Rookie Debut Pack",
      quantity: 1,
      packImageURL: ASSETS.packAnimated,
      setName: "Rookie Debut",
      setTier: "Rare",
      setMomentCount: "12",
      setCirculation: "8,500",
      set_marquee_player: "Cooper Flagg",
      set_chronicler_note:
        "the first postseason of the most-anticipated rookie since LeBron",
      set_curator_name: "Guy",
      setFlowID: "rookie-debut-2026",
      set_7d_volume_count: "2,420",
      set_7d_median_price: "$185",
      set_floor_today: "$72",
      set_floor_change_7d: "+18%",
      setcard_image_url: ASSETS.setcard,
      set_top_3_recent_sales: [
        {
          player: "Cooper Flagg",
          play: "Three-Pointer · Q4",
          amount: "$1,247",
          sold_at: "2026-05-03T20:15:00Z",
        },
        {
          player: "Cooper Flagg",
          play: "Block · Q2",
          amount: "$892",
          sold_at: "2026-05-03T18:42:00Z",
        },
        {
          player: "Cooper Flagg",
          play: "Steal · Q3",
          amount: "$634",
          sold_at: "2026-05-03T17:08:00Z",
        },
      ],
    },
  },

  "welcome-onboarding": {
    customer: { ...SARAH, userName: "Alex", lifetime_moments_owned: 0 },
    week: WEEK,
    market: MARKET,
  },

  "fast-break-result-fix": {
    customer: { ...SARAH, fastbreak_win_streak: 3, fastbreak_lifetime_wins: 12 },
    event: {
      lineupPlayers: "SGA · Edwards · Mobley · Brunson · Bane",
      lineupSummary: "Defensive-anchor build, mid-tier scorers",
      totalScore: "147",
      gameCount: "4",
      winRank: "Top 8%",
      fastBreakId: "fb-2026-05-03",
      claim_expires_at: "2026-05-04T23:59:00Z",
      scorecard_image_url: ASSETS.fastBreakScorecard,
    },
  },

  "drop-announcement-programmatic": {
    drop: {
      id: "series-9-flagg",
      name: "Series 9 — Cooper Flagg Rookie Edition",
      set_name: "The Rookie Era",
      tier: "Premium",
      circulation_total: "8,500",
      moment_count: "15",
      starting_price: "$25",
      live_at: "2026-05-08T20:00:00Z",
      queue_open_at: "2026-05-08T19:30:00Z",
      featured_player_marquee: "Cooper Flagg · #1 overall pick",
      featured_player_legend:
        "First Duke player to go #1 since Zion. Pre-draft consensus called him the most complete prospect since LeBron. The set documents his rookie season as it happens — 15 Moments, 8,500 mints, one chance.",
      curator_note:
        "captures Cooper Flagg's rookie postseason — minted as it happens, sealed by the buzzer. The set every collector who came in 2026 will be measured against five years from now.",
      curator_name: "Guy",
      expected_serial_distribution: "Most packs will land in the 2,500-7,500 serial band; #1-#100 reserved for top-tier rewards.",
      previous_comparable: {
        set_name: "Series 8 Wembanyama",
        sellout_minutes: "11",
        floor_today: "$148",
      },
      serial_max: "8,500",
      likely_first_movers: "Whale collectors, Cooper Flagg-set completists",
      datacard_image_url: ASSETS.dropDatacard,
    },
    market: MARKET,
  },

  "abandoned-cart": {
    customer: SARAH,
    event: {
      player: "Donovan Mitchell",
      playCategory: "Pull-Up Three",
      setName: "Eastern Conference Run",
      tier: "Rare",
      circulationCount: "3,500",
      setMomentCount: "8",
      momentFlowID: "mitchell-pullup-2026",
      teamAtMoment: "Cleveland Cavaliers",
      serial: "2,418",
      listing_price: "$245",
      set_chronicler_note:
        "Eastern Conference Run captures Cleveland's Round 2 push — when Mitchell turned the corner from regular-season scorer to playoff closer.",
      recent_serial_band_sales: [
        {
          serial_range: "2,400-2,500",
          amount: "$312",
          sold_at: "2026-05-03T16:00:00Z",
        },
        {
          serial_range: "2,500-2,700",
          amount: "$287",
          sold_at: "2026-05-02T22:30:00Z",
        },
        {
          serial_range: "2,200-2,400",
          amount: "$298",
          sold_at: "2026-05-01T19:15:00Z",
        },
      ],
    },
  },

  "whale-tier-concierge": {
    customer: { ...MARCUS_WHALE, id: "marcus-vance-l4" },
    whale: {
      pattern_1: {
        title: "Cooper Flagg pre-draft accumulation",
        body: "Three L5 collectors quietly built positions in pre-rookie Flagg Moments over the last 14 days; floor moved 18% with low volume",
        player_concentration: "Cooper Flagg",
        cohort_size: "3 L5",
        recent_comp: "$485",
        market_signal: "+18% floor on <30 transactions",
      },
      pattern_2: {
        title: "Eastern Conference Run set tightening",
        body: "Mitchell + Mobley sub-3,000 serials are tightening fast — comparable serial bands cleared 30% above floor in last 72h",
        player_concentration: "Mitchell, Mobley",
        cohort_size: "Sub-3K serial band",
        recent_comp: "$312",
        market_signal: "Bid-ask spread halved in 72h",
      },
      pattern_3: {
        title: "Series 8 Wembanyama floor consolidation",
        body: "The Wembanyama Series 8 floor has stabilized at $148 after three months of slow decline — first sign of bottom-fishing",
        player_concentration: "Wembanyama",
        cohort_size: "All Series 8 holders",
        recent_comp: "$148",
        market_signal: "Floor flat 14d, bid-ask narrowing",
      },
      hold_recommendation: {
        player: "Donovan Mitchell",
        set: "Pull-Up Three",
        serial: "2,418",
        bought_at: "2024-01-20T20:30:00Z",
        bought_price: "$112",
        floor_today: "$245",
      },
    },
  },
};
