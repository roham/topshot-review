#!/usr/bin/env python3
"""Generate 7 hero images via gpt-image-2 for the upgrade-card review surface.

Connective imagery only — no licensed NBA marks, no human figures, no logos.
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


CARDS = [
    ("welcome", "Abstract editorial illustration: a single arc of warm light rising from a dark navy court surface, conveying first ascent. Minimalist, no figures, no logos, no text. Cinematic, mobile-first horizontal composition. Color palette: deep navy ground, single warm amber-gold light arc."),
    ("reactivation", "Abstract editorial illustration: stadium lights flickering back on across an empty arena ceiling, viewed from below. Minimalist, no figures, no logos, no text. Sense of return. Color palette: cool blue-gray dominant with warm yellow points of light."),
    ("daily-reminder", "Abstract editorial illustration: a basketball captured mid-bounce as a series of fading after-images on a dark surface, conveying daily rhythm and cadence. Minimalist, monochrome composition with a single warm accent. No text. Color palette: deep charcoal with warm orange glow."),
    ("pack-pull", "Abstract editorial illustration: a single rectangular collectible card emerging from a dispersing cloud of similar cards, sense of one Moment chosen from many. Minimalist, no faces, no logos, no text. Color palette: deep purple background with a single warm gold-amber card glow."),
    ("drop-series", "Abstract editorial illustration: an opening tip-off basketball mid-air against a deep gradient dusk sky, sense of incoming arrival. Minimalist, a single ball, no figures, no court, no text. Color palette: dusk gradient from deep navy at top to warm amber at horizon."),
    ("whale-tier", "Abstract editorial illustration: a single high courtside seat lit alone in an otherwise dark arena, low-angle architectural view. Minimalist, no figures, no logos, no text. Sense of private signal. Color palette: charcoal dominant with a single warm spotlight gold."),
    ("winback", "Abstract editorial illustration: a door propped slightly open in a darker corridor with warm light spilling through the gap. Minimalist, architectural, no figures, no text. Sense of return invitation. Color palette: cool dark blue corridor, warm amber spill of light."),
]


def gen_one(slug: str, prompt: str, key: str, out_dir: Path) -> dict:
    payload = {
        "model": "gpt-image-2",
        "prompt": prompt,
        "n": 1,
        "size": "1536x1024",
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
    with urllib.request.urlopen(req, timeout=120) as resp:
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
        return {"slug": slug, "ok": False, "raw": item}


def main():
    key = load_key()
    out_dir = Path("/home/agent/topshot-review/public/cards")
    out_dir.mkdir(parents=True, exist_ok=True)

    only = sys.argv[1] if len(sys.argv) > 1 else None
    cards = [c for c in CARDS if (only is None or c[0] == only)]

    results = []
    for slug, prompt in cards:
        try:
            r = gen_one(slug, prompt, key, out_dir)
        except urllib.error.HTTPError as e:
            try:
                err_body = e.read().decode()
            except Exception:
                err_body = str(e)
            r = {"slug": slug, "ok": False, "http": e.code, "error": err_body[:500]}
        except Exception as e:
            r = {"slug": slug, "ok": False, "error": str(e)[:500]}
        results.append(r)
        print(json.dumps(r))

    print("---DONE---")
    print(json.dumps({"total": len(results), "ok": sum(1 for r in results if r.get("ok"))}, indent=2))


if __name__ == "__main__":
    main()
