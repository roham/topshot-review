#!/usr/bin/env python3
"""Generate stylized email-internal infographics via gpt-image-2.
These fill in for fake Liquid placeholders in Frame C / B mock data
(sparklines, dashboard thumbs, scorecards, datacards, whale charts, set cards).
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


INFOGRAPHICS = [
    ("sparkline-holdings", "1536x1024",
     "Stylized sparkline chart showing 3 trending lines over a 7-day window. Three colored lines (gold, orange, mint-green) trending upward at different rates against a dark navy background. Minimal Bloomberg-terminal aesthetic. No text labels, no axis labels. Premium financial-data visualization. 1024x512 horizontal banner format. Subtle grid lines, thin elegant lines."),
    ("market-dashboard-thumb", "1536x1024",
     "Bloomberg-terminal-style market dashboard mockup with 4 small numeric tiles in a dark navy background, each showing a different colored accent (gold, mint, amber, rose). Each tile has a fake number and tiny chart inside. Minimalist data-dense layout. No real text — abstract numbers and lines only. 1024x512 horizontal banner format."),
    ("fastbreak-scorecard", "1536x1024",
     "Stylized basketball stat scorecard infographic. Dark navy background. A single large score number in white at center-left. To the right, three small player position icons in orange-amber. Below, a thin progress bar in mint-green showing rank position. ESPN-meets-Bloomberg aesthetic. No team logos, no real names, no real numbers — abstract stylized layout only. 1024x512 horizontal banner format."),
    ("drop-datacard", "1536x1024",
     "Stylized trading-card-drop announcement datacard. Dark gradient background from deep navy to amber at horizon. Center: an abstract diamond/rhombus shape suggesting a pack opening, in orange-flame color. Around it: 4 small data tiles with abstract numbers (no real text). Premium drop-anticipation aesthetic. 1024x512 horizontal banner format. No player imagery, no logos."),
    ("whale-chart", "1536x1024",
     "Premium concierge-style portfolio chart. Single elegant ascending line in gold against a charcoal background. Three small annotation dots along the line. Subtle grid. Stratechery-meets-private-banking aesthetic. No labels, no real numbers. 1024x512 horizontal banner format. Restrained, expensive feel."),
    ("setcard", "1536x1024",
     "Stylized basketball Moment set-card preview. Dark navy background with a subtle court-line pattern. Centered: an abstract rectangular card frame in flame-orange with a small mint-green corner accent (suggesting a serial number badge). No text, no player images. Trading-card-anticipation aesthetic. 1024x512 horizontal banner format."),
    ("moment-hero-placeholder", "1024x1024",
     "Abstract basketball Moment placeholder. Dark navy background with a subtle ascending arc of motion-blur lines suggesting a basketball trajectory in warm orange-amber. Centered: a large rectangular Moment-card frame with a thin gold border. Inside the frame: the suggestion of a basketball mid-motion, abstract not photographic. No real player likeness, no team logos, no text. Cinematic dramatic 1024x1024 square format."),
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
    out_dir = Path("/home/agent/topshot-review/public/cards/infographics")
    out_dir.mkdir(parents=True, exist_ok=True)

    only = sys.argv[1] if len(sys.argv) > 1 else None
    items = [(s, sz, p) for s, sz, p in INFOGRAPHICS if (only is None or s == only)]

    results = []
    for slug, size, prompt in items:
        try:
            r = gen_one(slug, size, prompt, key, out_dir)
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
