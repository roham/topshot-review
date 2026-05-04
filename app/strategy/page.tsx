import fs from "fs";
import path from "path";
import Link from "next/link";
import { Logo } from "@/components/Logo";

interface DocMeta {
  slug: string;
  title: string;
  preview: string;
  lineCount: number;
  date: string;
}

function parseFrontmatter(raw: string): { body: string; title?: string; description?: string } {
  if (!raw.startsWith("---")) return { body: raw };
  const end = raw.indexOf("---", 3);
  if (end === -1) return { body: raw };
  const frontmatter = raw.slice(3, end);
  const body = raw.slice(end + 3).trimStart();
  const titleMatch = frontmatter.match(/^title:\s*(.+)$/m);
  const descMatch = frontmatter.match(/^description:\s*(.+)$/m);
  return {
    body,
    title: titleMatch ? titleMatch[1].trim() : undefined,
    description: descMatch ? descMatch[1].trim() : undefined,
  };
}

function getDocMeta(filename: string): DocMeta {
  const slug = filename.replace(/\.md$/, "");
  const filePath = path.join(process.cwd(), "content", "strategy", filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const lines = raw.split("\n");
  const lineCount = lines.length;

  const { body, title: fmTitle, description: fmDescription } = parseFrontmatter(raw);

  // Extract date from slug prefix (YYYY-MM-DD-...)
  const dateMatch = slug.match(/^(\d{4}-\d{2}-\d{2})/);
  const date = dateMatch ? dateMatch[1] : "";

  // Title: frontmatter title > first H1 in body > slug
  let title = fmTitle;
  if (!title) {
    const h1 = body.match(/^# (.+)$/m);
    title = h1 ? h1[1].trim() : slug;
  }

  // Preview: frontmatter description > first non-empty non-heading paragraph
  let preview = fmDescription ?? "";
  if (!preview) {
    const bodyLines = body.split("\n");
    for (const line of bodyLines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#") && !trimmed.startsWith("---") && !trimmed.startsWith("- ") && !trimmed.startsWith("*")) {
        preview = trimmed.slice(0, 160);
        if (trimmed.length > 160) preview += "…";
        break;
      }
    }
  }

  return { slug, title, preview, lineCount, date };
}

export default function StrategyIndex() {
  const dir = path.join(process.cwd(), "content", "strategy");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md")).sort().reverse();
  const docs: DocMeta[] = files.map(getDocMeta);

  // Group by date
  const byDate = new Map<string, DocMeta[]>();
  for (const doc of docs) {
    const key = doc.date || "undated";
    if (!byDate.has(key)) byDate.set(key, []);
    byDate.get(key)!.push(doc);
  }

  const formatDate = (d: string) => {
    if (!d || d === "undated") return "Undated";
    const [y, m, day] = d.split("-");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[parseInt(m) - 1]} ${parseInt(day)}, ${y}`;
  };

  return (
    <main className="min-h-[100dvh] bg-ink-950">
      <header className="px-6 pt-6 pb-4 flex items-center justify-between max-w-4xl mx-auto">
        <Logo />
        <nav className="flex items-center gap-4">
          <Link href="/" className="text-[11px] uppercase tracking-wider text-ink-400 hover:text-ink-100 transition-colors">
            Home
          </Link>
          <Link href="/admin" className="text-[11px] uppercase tracking-wider text-ink-400 hover:text-ink-100 transition-colors">
            Admin
          </Link>
        </nav>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-[10px] uppercase tracking-[0.22em] text-flame-400 font-semibold">Intelligence Layer</div>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-ink-50">
          Strategy Docs
        </h1>
        <p className="mt-3 text-[14.5px] text-ink-300 max-w-xl">
          Gate artifacts, research reports, and playbooks — all rendered as readable pages. {docs.length} documents.
        </p>

        <div className="mt-8 space-y-8">
          {[...byDate.entries()].map(([date, dateDocs]) => (
            <section key={date}>
              <div className="text-[10.5px] uppercase tracking-[0.2em] text-ink-500 font-semibold mb-3">
                {formatDate(date)}
              </div>
              <div className="space-y-3">
                {dateDocs.map((doc) => (
                  <Link
                    key={doc.slug}
                    href={`/strategy/${doc.slug}`}
                    className="block rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all p-4 group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="font-display text-[15px] font-semibold text-ink-100 group-hover:text-ink-50 transition-colors leading-snug">
                          {doc.title}
                        </div>
                        {doc.preview && (
                          <div className="mt-1.5 text-[13px] text-ink-400 leading-relaxed line-clamp-2">
                            {doc.preview}
                          </div>
                        )}
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="text-[11px] font-mono text-ink-500">{doc.lineCount.toLocaleString()} ln</div>
                        <div className="mt-1 text-[10px] uppercase tracking-wider text-flame-500 group-hover:text-flame-400 transition-colors">
                          Open →
                        </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-[10px] font-mono text-ink-600">{doc.slug}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <footer className="max-w-4xl mx-auto px-6 pb-6 pt-8 text-[11px] text-ink-600">
        NBA Top Shot · Strategy Intelligence · {docs.length} docs
      </footer>
    </main>
  );
}
