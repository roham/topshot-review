import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GH_TOKEN = process.env.GH_TOKEN ?? process.env.GITHUB_TOKEN ?? "";
const GH_REPO = process.env.GH_REPO ?? ""; // e.g. "roham/topshot-review"
const GH_BRANCH = process.env.GH_BRANCH ?? "main";

async function gh(path: string, init?: RequestInit) {
  if (!GH_TOKEN || !GH_REPO) return null;
  const res = await fetch(`https://api.github.com/repos/${GH_REPO}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${GH_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });
  return res;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { piece_id, vote, note, reasons, voter } = body ?? {};
    if (!piece_id || !vote || !voter) return NextResponse.json({ error: "missing fields" }, { status: 400 });

    const ts = new Date().toISOString();
    const record = { piece_id, vote, note, reasons, voter, ts };

    if (!GH_TOKEN || !GH_REPO) {
      // Fallback: log to server console; client persists locally
      console.log("[feedback]", record);
      return NextResponse.json({ ok: true, persisted: false, reason: "GH_TOKEN/GH_REPO not configured" });
    }

    const filename = `feedback/${ts.replace(/[:.]/g, "-")}-${Math.random().toString(36).slice(2, 7)}.json`;
    const content = Buffer.from(JSON.stringify(record, null, 2)).toString("base64");
    const res = await gh(`/contents/${filename}`, {
      method: "PUT",
      body: JSON.stringify({
        message: `feedback: ${voter} · ${vote} · ${piece_id}`,
        content,
        branch: GH_BRANCH,
      }),
    });
    if (!res || !res.ok) {
      const t = res ? await res.text() : "no response";
      console.error("[feedback gh error]", t);
      return NextResponse.json({ ok: false, persisted: false, error: t.slice(0, 200) }, { status: 500 });
    }
    return NextResponse.json({ ok: true, persisted: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message ?? e) }, { status: 500 });
  }
}

export async function GET() {
  try {
    if (!GH_TOKEN || !GH_REPO) {
      return NextResponse.json({ feedback: [], note: "Storage not configured. Set GH_TOKEN and GH_REPO env vars in Vercel." });
    }
    const listRes = await gh(`/contents/feedback?ref=${GH_BRANCH}`);
    if (!listRes) return NextResponse.json({ feedback: [] });
    if (listRes.status === 404) return NextResponse.json({ feedback: [] });
    if (!listRes.ok) {
      const t = await listRes.text();
      return NextResponse.json({ feedback: [], error: t.slice(0, 200) }, { status: 200 });
    }
    const list = (await listRes.json()) as { name: string; download_url: string }[];
    const items = await Promise.all(
      list.map(async (f) => {
        try {
          const r = await fetch(f.download_url, { cache: "no-store" });
          return await r.json();
        } catch {
          return null;
        }
      })
    );
    const feedback = items.filter(Boolean).sort((a: any, b: any) => (a.ts < b.ts ? 1 : -1));
    return NextResponse.json({ feedback });
  } catch (e: any) {
    return NextResponse.json({ feedback: [], error: String(e?.message ?? e) }, { status: 200 });
  }
}
