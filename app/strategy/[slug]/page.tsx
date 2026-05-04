import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";
import { Logo } from "@/components/Logo";
import { DecisionPanel } from "@/components/DecisionPanel";

interface Props {
  params: Promise<{ slug: string }>;
}

interface Frontmatter {
  title?: string;
  decisionVote?: boolean;
  decisionQuestion?: string;
  decisionOptions?: string[];
  decisionPieceId?: string;
}

function parseFrontmatter(raw: string): { body: string; fm: Frontmatter } {
  if (!raw.startsWith("---")) return { body: raw, fm: {} };
  const end = raw.indexOf("---", 3);
  if (end === -1) return { body: raw, fm: {} };
  const fmRaw = raw.slice(3, end);
  const body = raw.slice(end + 3).trimStart();

  const get = (key: string) => {
    const m = fmRaw.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
    return m ? m[1].trim().replace(/^["']|["']$/g, "") : undefined;
  };

  const fm: Frontmatter = {
    title: get("title"),
    decisionVote: get("decision-vote") === "true",
    decisionQuestion: get("decision-question"),
    decisionOptions: get("decision-options")?.split(",").map((s) => s.trim()),
    decisionPieceId: get("decision-piece-id"),
  };

  return { body, fm };
}

function getTitle(raw: string, slug: string, fm: Frontmatter): string {
  if (fm.title) return fm.title;
  const h1 = raw.match(/^# (.+)$/m);
  return h1 ? h1[1].trim() : slug;
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "content", "strategy");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  return files.map((f) => ({ slug: f.replace(/\.md$/, "") }));
}

export default async function StrategyDoc({ params }: Props) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "content", "strategy", `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { body, fm } = parseFrontmatter(raw);
  const title = getTitle(raw, slug, fm);
  const html = await marked(body, { gfm: true, breaks: false });

  const dateMatch = slug.match(/^(\d{4}-\d{2}-\d{2})/);
  const date = dateMatch ? dateMatch[1] : "";
  const lineCount = raw.split("\n").length;

  return (
    <main className="min-h-[100dvh] bg-ink-950">
      <header className="px-6 pt-6 pb-4 flex items-center justify-between max-w-4xl mx-auto">
        <Logo />
        <Link href="/strategy" className="text-[11px] uppercase tracking-wider text-ink-400 hover:text-ink-100 transition-colors">
          ← Strategy
        </Link>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-4 pb-2">
        <div className="flex items-center gap-3 text-[11px] text-ink-500">
          {date && <span className="font-mono">{date}</span>}
          <span>·</span>
          <span className="font-mono">{lineCount.toLocaleString()} lines</span>
          {fm.decisionVote && (
            <>
              <span>·</span>
              <span className="text-flame-400 font-semibold uppercase tracking-wider">Decision required</span>
            </>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6">
        <article
          className="prose prose-invert max-w-3xl prose-headings:font-display prose-headings:tracking-tight prose-h1:text-ink-50 prose-h2:text-ink-100 prose-h3:text-ink-200 prose-p:text-ink-300 prose-li:text-ink-300 prose-strong:text-ink-100 prose-code:text-flame-300 prose-code:bg-ink-800 prose-code:rounded prose-code:px-1 prose-pre:bg-ink-800 prose-pre:border prose-pre:border-white/10 prose-a:text-flame-400 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-flame-500/40 prose-blockquote:text-ink-400 prose-hr:border-white/10 prose-table:text-ink-300 prose-thead:border-white/10 prose-tr:border-white/5"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {fm.decisionVote && fm.decisionQuestion && fm.decisionOptions && (
          <DecisionPanel
            pieceId={fm.decisionPieceId ?? slug}
            question={fm.decisionQuestion}
            options={fm.decisionOptions}
          />
        )}
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-8 pt-4 border-t border-white/5">
        <Link
          href="/strategy"
          className="inline-flex items-center gap-2 text-[12px] text-ink-400 hover:text-ink-100 transition-colors"
        >
          ← Back to all strategy docs
        </Link>
      </div>
    </main>
  );
}
