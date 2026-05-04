#!/usr/bin/env python3
"""Generate per-template-per-frame hero images for the NBA Top Shot email design system.

Each image targets a specific email type × frame combination (Cinematic, Brief, Almanac)
so every template has visually distinct treatment per frame.

Images write to /home/agent/topshot-review/public/cards/infographics/.
Existing 7 infographics are NOT touched.
"""
import base64
import json
import os
import sys
import time
import urllib.request
from pathlib import Path


def load_key():
    env_path = Path("/opt/magic/.creds/openai.env")
    for line in env_path.read_text().splitlines():
        if line.startswith("OPENAI_API_KEY="):
            return line.split("=", 1)[1].strip()
    raise SystemExit("OPENAI_API_KEY not found")


# ~15 images: 7 Cinematic heroes + 5 Brief data-dashboards + 3 Almanac narratives
FRAME_IMAGES = [
    # ── CINEMATIC FRAME (image-led hero per email type) ────────────────────────
    (
        "welcome-cinematic",
        "1536x1024",
        (
            "A threshold doorway opening onto a professional basketball court at twilight. "
            "The court stretches into the distance under dramatic stadium lighting. "
            "Dark navy dominates — deep #0a0a0b to #111114 — with a warm amber-orange light "
            "spill (#ff6b00 tones) flooding in through the open doorway. "
            "No human figures, no text, no real team logos. "
            "Cinematic premium feel — Apple-event-invitation-meets-sports luxury. "
            "Wide 3:2 horizontal banner composition. "
            "Ultra high quality, photorealistic render. No text or lettering in the image."
        ),
    ),
    (
        "pack-received-cinematic",
        "1536x1024",
        (
            "A sealed collectible trading-card pack floating mid-air against a deep dark navy background. "
            "Brilliant light beams in flame-orange (#ff6b00) and amber (#f5a524) radiate from inside the pack "
            "through a thin glowing seam, suggesting collectible Moments waiting to be revealed. "
            "Dark navy background with orange and amber highlights. "
            "Premium product-reveal energy — iPhone-launch-meets-sports-collectible. "
            "No text, no real brand logos, no player imagery. "
            "Wide 3:2 horizontal banner. Ultra high quality cinematic render."
        ),
    ),
    (
        "reactivation-cinematic",
        "1536x1024",
        (
            "A lone spotlight illuminating a single empty padded courtside seat in an otherwise completely dark arena. "
            "All other seats invisible in darkness. The spotlight is warm white with a hint of amber. "
            "Cool deep blue (#111114) dominates the surrounding darkness. "
            "Sense of 'you were here first — the room is waiting for you.' "
            "No figures, no text, no logos. "
            "Dramatic theatrical composition, wide 3:2 horizontal banner. "
            "Photorealistic, cinematic quality. No text or lettering in the image."
        ),
    ),
    (
        "drop-cinematic",
        "1536x1024",
        (
            "An abstract countdown clock face rendered as a glowing dial. "
            "A single bold flame-orange glow (#ff6b00) pulses at the 12 o'clock position, "
            "suggesting T-minus anticipation. "
            "Deep navy-to-amber gradient background from bottom to horizon. "
            "Anticipation poster aesthetic — Nolan-film-meets-product-drop. "
            "No text, no real numbers rendered legibly, no team logos, no player imagery. "
            "Wide 3:2 horizontal banner. Cinematic, ultra high quality. No text or lettering in the image."
        ),
    ),
    (
        "fast-break-cinematic",
        "1536x1024",
        (
            "A stylized sports scoreboard display mid-game. Abstract score tiles with indistinct numbers "
            "(no real teams, no readable text). Flame-orange (#ff6b00) and electric blue dominate. "
            "Bold motion-blur streaks suggest fast action. ESPN-meets-cinema aesthetic. "
            "Dark navy background with neon-lit scoreboard tiles. "
            "Sports-action energy, premium broadcast quality. "
            "No real team logos, no player imagery, no legible text. "
            "Wide 3:2 horizontal banner. Cinematic render, ultra high quality. No text or lettering in the image."
        ),
    ),
    (
        "abandoned-cart-cinematic",
        "1536x1024",
        (
            "A single collectible trading card frame resting flat on a dark polished surface. "
            "One narrow beam of warm amber-white light hits the card from above, "
            "like a Sotheby's auction lot under a spotlight. "
            "The rest of the image is deep charcoal to black. "
            "Premium auction-house aesthetic — decisional weight, scarcity, desire. "
            "No text, no real imagery inside the card frame (abstract shimmer only), no logos. "
            "Wide 3:2 horizontal banner. Photorealistic, cinematic quality. No text or lettering in the image."
        ),
    ),
    (
        "whale-cinematic",
        "1536x1024",
        (
            "Private elevator doors made of brushed charcoal steel, half-open, revealing a courtside view "
            "of an empty arena at night through floor-to-ceiling glass beyond. "
            "Charcoal dominant (#1a1a1e), with restrained gold accents (#f5a524) on elevator trim detail. "
            "Sense of exclusive access — private club, not a public lobby. "
            "No figures, no text, no logos. "
            "Restrained luxury aesthetic — LVMH-meets-sports-private-banking. "
            "Wide 3:2 horizontal banner. Photorealistic, ultra premium cinematic quality. No text or lettering in the image."
        ),
    ),

    # ── BRIEF FRAME (data-led dashboard per email type) ────────────────────────
    (
        "reactivation-brief",
        "1536x1024",
        (
            "A horizontal Bloomberg-terminal-style portfolio overview with three ascending trendlines "
            "rendered in different colors: gold (#f5a524), mint-green (#22c08a), and rose (#ff4d6d). "
            "Charcoal dark background. No axis labels, no numbers legible, no text. "
            "Dense premium financial-data visualization aesthetic. "
            "Three thin elegant lines trending upward at different rates. Subtle grid lines behind. "
            "Wide 3:2 horizontal banner. Ultra clean data-art render. No text or lettering in the image."
        ),
    ),
    (
        "drop-brief",
        "1536x1024",
        (
            "A vertical data tape strip design showing abstract drop-metrics tiles: "
            "sellout-velocity indicator, mint-circulation bar, queue-depth sparkline — "
            "each as a small rectangular dark tile with abstract colored marks inside. "
            "Bloomberg market-tape aesthetic. Dark navy background. "
            "Accent colors: flame-orange (#ff6b00), amber (#f5a524), mint (#22c08a). "
            "No legible text, no real numbers, no logos. "
            "Wide 3:2 horizontal banner, tiles arranged horizontally. Premium data-art render. No text or lettering in the image."
        ),
    ),
    (
        "fast-break-brief",
        "1536x1024",
        (
            "A sports box-score data card with abstract score tiles and a win-rank ribbon. "
            "ESPN-stat-line-meets-Bloomberg-tape aesthetic. Dark navy background. "
            "Rectangular tiles in a grid: each tile has abstract bars or glyphs in orange-amber-mint. "
            "A thin horizontal ribbon in flame-orange at the top suggests a ranking. "
            "No real team names, no real numbers legible, no player images. "
            "Wide 3:2 horizontal banner. Premium data infographic render. No text or lettering in the image."
        ),
    ),
    (
        "abandoned-cart-brief",
        "1536x1024",
        (
            "A small collectible Moment card thumbnail centered, surrounded by four comparison-data tiles "
            "arranged at the corners — each tile showing abstract price-point indicators (bar charts, sparklines). "
            "Dense collector-decision data view aesthetic. Dark charcoal background. "
            "Accent colors: gold (#f5a524) and mint (#22c08a) for the data tiles. "
            "No real numbers legible, no logos, no player imagery inside the card thumbnail. "
            "Wide 3:2 horizontal banner. Premium infographic render. No text or lettering in the image."
        ),
    ),
    (
        "whale-brief",
        "1536x1024",
        (
            "A single elegant ascending portfolio line chart with three annotation diamond-points along the curve. "
            "The line is gold (#f5a524) on a deep charcoal (#1a1a1e) background. "
            "Stratechery-meets-private-banking aesthetic. Subtle minimal grid. "
            "Three small diamond annotations on the line at inflection points. "
            "No labels, no axis text, no real numbers rendered legibly. "
            "Wide 3:2 horizontal banner. Restrained, expensive feel. Clean elegant render. No text or lettering in the image."
        ),
    ),

    # ── ALMANAC FRAME (chronicler narrative imagery) ────────────────────────────
    (
        "reactivation-almanac",
        "1536x1024",
        (
            "A library shelf lined with rows of collectible card sleeves and binders, all abstract — "
            "no real images on the cards. One card is pulled slightly forward into a pool of warm amber light, "
            "illuminated like a featured exhibit. "
            "Rich leather, dark wood, warm lamp light aesthetic — premium library meets sports archive. "
            "Sense of 'your collection is the document / history.' "
            "No text, no real team logos, no player imagery. "
            "Wide 3:2 horizontal banner. Photorealistic warm-light render. No text or lettering in the image."
        ),
    ),
    (
        "pack-received-almanac",
        "1536x1024",
        (
            "A sealed collectible pack resting on a dark wooden desk surface beside a chronicler's leather journal. "
            "The journal is open to a blank page with abstract handwriting marks and timestamp lines "
            "(indistinct, not legible text). A brass pen lies across the journal. "
            "Warm amber desk lamp illuminates the scene from the side. "
            "Sense of 'your pack joins the chronicle / is recorded in the ledger.' "
            "No real logos, no player imagery, no legible text in the image. "
            "Wide 3:2 horizontal banner. Photorealistic warm-light library render. No text or lettering in the image."
        ),
    ),
    (
        "whale-almanac",
        "1536x1024",
        (
            "A private study desk at night under a polished brass desk lamp. "
            "On the desk: a small leather portfolio document with abstract data-lines visible on its open page "
            "(not legible text — just premium document texture). "
            "Dark charcoal background, gold accent from the lamp pool. "
            "Premium concierge-library aesthetic — private wealth management meets sports collecting. "
            "No real logos, no player imagery, no legible text. "
            "Wide 3:2 horizontal banner. Photorealistic high-end render. No text or lettering in the image."
        ),
    ),
]


def gen_one(slug: str, size: str, prompt: str, key: str, out_dir: Path) -> dict:
    payload = {
        "model": "gpt-image-2",
        "prompt": prompt,
        "n": 1,
        "size": size,
    }
    req = urllib.request.Request(
        "https://api.openai.com/v1/images/generations",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    t0 = time.time()
    with urllib.request.urlopen(req, timeout=180) as resp:
        body = json.loads(resp.read())
    dt = time.time() - t0

    item = body["data"][0]
    if "b64_json" in item:
        png = base64.b64decode(item["b64_json"])
        path = out_dir / f"{slug}.png"
        path.write_bytes(png)
        return {"slug": slug, "ok": True, "path": str(path), "bytes": len(png), "secs": round(dt, 1)}
    elif "url" in item:
        with urllib.request.urlopen(item["url"], timeout=60) as r:
            png = r.read()
        path = out_dir / f"{slug}.png"
        path.write_bytes(png)
        return {"slug": slug, "ok": True, "path": str(path), "bytes": len(png), "secs": round(dt, 1), "via_url": True}
    else:
        return {"slug": slug, "ok": False, "raw": str(item)[:300]}


def main():
    key = load_key()
    out_dir = Path("/home/agent/topshot-review/public/cards/infographics")
    out_dir.mkdir(parents=True, exist_ok=True)

    only = sys.argv[1] if len(sys.argv) > 1 else None
    items = [(s, sz, p) for s, sz, p in FRAME_IMAGES if (only is None or s == only)]

    results = []
    t_start = time.time()

    for idx, (slug, size, prompt) in enumerate(items, 1):
        print(f"\n[{idx}/{len(items)}] Generating: {slug} ...", flush=True)

        # First attempt
        try:
            r = gen_one(slug, size, prompt, key, out_dir)
        except urllib.error.HTTPError as e:
            try:
                err_body = e.read().decode()
            except Exception:
                err_body = str(e)
            r = {"slug": slug, "ok": False, "http": e.code, "error": err_body[:500], "attempt": 1}
        except Exception as e:
            r = {"slug": slug, "ok": False, "error": str(e)[:500], "attempt": 1}

        # Retry once on failure with a slight prompt variation
        if not r.get("ok"):
            print(f"  Attempt 1 failed: {r.get('error', r.get('http', '?'))}. Retrying...", flush=True)
            time.sleep(5)
            retry_prompt = prompt + " High fidelity, no text, abstract only."
            try:
                r = gen_one(slug, size, retry_prompt, key, out_dir)
                r["attempt"] = 2
            except urllib.error.HTTPError as e:
                try:
                    err_body = e.read().decode()
                except Exception:
                    err_body = str(e)
                r = {"slug": slug, "ok": False, "http": e.code, "error": err_body[:500], "attempt": 2}
            except Exception as e:
                r = {"slug": slug, "ok": False, "error": str(e)[:500], "attempt": 2}

        results.append(r)
        status = "OK" if r.get("ok") else "FAIL"
        detail = f"{r['bytes']:,} bytes, {r['secs']}s" if r.get("ok") else r.get("error", "unknown")[:120]
        print(f"  [{status}] {slug}: {detail}", flush=True)

        # Mid-stream disk verify after image 5
        if idx == 5:
            existing = sorted(out_dir.glob("*.png"))
            print(f"\n--- MID-STREAM CHECK: {len(existing)} PNG files in {out_dir} ---", flush=True)
            for f in existing:
                sz = f.stat().st_size
                flag = "OK" if sz > 500_000 else "SMALL"
                print(f"  [{flag}] {f.name}: {sz:,} bytes", flush=True)
            print("--- END MID-STREAM CHECK ---\n", flush=True)

    elapsed = round(time.time() - t_start, 1)

    print("\n\n===== FINAL RESULTS =====")
    ok_count = sum(1 for r in results if r.get("ok"))
    total_bytes = sum(r.get("bytes", 0) for r in results if r.get("ok"))
    print(f"Generated: {ok_count}/{len(results)}")
    print(f"Total bytes: {total_bytes:,}")
    print(f"Elapsed: {elapsed}s")

    failures = [r for r in results if not r.get("ok")]
    if failures:
        print(f"\nFailures ({len(failures)}):")
        for r in failures:
            print(f"  {r['slug']}: attempt={r.get('attempt','?')} http={r.get('http','?')} error={r.get('error','?')[:200]}")

    print("\n--- DIRECTORY LISTING ---")
    for f in sorted(out_dir.glob("*.png")):
        sz = f.stat().st_size
        flag = "OK" if sz > 500_000 else "SMALL"
        print(f"  [{flag}] {f.name}: {sz:,} bytes")

    print("---DONE---")
    print(json.dumps({"total": len(results), "ok": ok_count, "total_bytes": total_bytes, "elapsed_secs": elapsed}, indent=2))


if __name__ == "__main__":
    main()
