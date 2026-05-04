// Minimal Liquid resolver — handles the subset of Liquid used in our After blocks:
// - {{ path.to.field }}
// - {{ path | filter }}
// - {{ path | filter: "arg" }}
// - {{ path | filter: arg }}
// - {% for x in y %} ... {% endfor %}
//
// Filters supported: date (strftime-ish), round, size, default
// This is intentionally minimal — enough to render mock data into demo emails.
// Real Customer.io rendering happens server-side at send time; this is for
// the review surface only.

export type LiquidContext = Record<string, unknown>;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function getPath(obj: unknown, path: string): unknown {
  if (!obj || typeof obj !== "object") return undefined;
  // Support a.b.c, a[0].b, a.b[0]
  const segments = path.split(/\.|\[|\]/).filter(Boolean);
  let cur: unknown = obj;
  for (const seg of segments) {
    if (cur == null) return undefined;
    if (typeof cur === "object") {
      cur = (cur as Record<string, unknown>)[seg];
    } else {
      return undefined;
    }
  }
  return cur;
}

function formatDate(iso: string, fmt: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return fmt
    .replace("%Y", d.getFullYear().toString())
    .replace("%y", d.getFullYear().toString().slice(2))
    .replace("%B", MONTHS_LONG[d.getMonth()])
    .replace("%b", MONTHS[d.getMonth()])
    .replace("%-d", d.getDate().toString())
    .replace("%d", d.getDate().toString().padStart(2, "0"))
    .replace("%-l", (d.getHours() % 12 || 12).toString())
    .replace("%l", (d.getHours() % 12 || 12).toString().padStart(2, " "))
    .replace("%H", d.getHours().toString().padStart(2, "0"))
    .replace("%M", d.getMinutes().toString().padStart(2, "0"))
    .replace("%p", d.getHours() < 12 ? "AM" : "PM")
    .replace("%A", DAYS[d.getDay()])
    .replace("%a", DAYS[d.getDay()].slice(0, 3));
}

function applyFilter(val: unknown, expr: string, context: LiquidContext): unknown {
  const m = expr.match(/^(\w+)(?::\s*(.+))?$/);
  if (!m) return val;
  const [, name, rawArg] = m;
  const arg = rawArg?.trim().replace(/^["']|["']$/g, "");

  if (name === "date" && val && typeof val === "string" && arg) {
    return formatDate(val, arg);
  }
  if (name === "round" && val != null) {
    const n = Number(val);
    return isNaN(n) ? val : n.toFixed(arg ? parseInt(arg, 10) : 0);
  }
  if (name === "size") {
    if (Array.isArray(val)) return val.length;
    if (typeof val === "string") return val.length;
    return 0;
  }
  if (name === "default" && (val == null || val === "")) {
    // Try to resolve arg as a context path first, then literal
    const resolved = arg ? getPath(context, arg) : undefined;
    return resolved !== undefined ? resolved : arg;
  }
  return val;
}

function substitute(line: string, context: LiquidContext): string {
  return line.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_, expr: string) => {
    const parts = expr.split("|").map((p) => p.trim());
    let val: unknown = getPath(context, parts[0]);
    for (let i = 1; i < parts.length; i++) {
      val = applyFilter(val, parts[i], context);
    }
    if (val == null) return ""; // missing values render empty
    return String(val);
  });
}

/**
 * Resolve a body array with Liquid syntax into rendered strings.
 * Handles `{% for x in y %}...{% endfor %}` blocks across array entries.
 */
export function resolveLiquidBody(body: string[], context: LiquidContext): string[] {
  const result: string[] = [];
  let inFor = false;
  let forVarName: string | null = null;
  let forIterTarget: unknown[] | null = null;
  let forBuffer: string[] = [];

  for (const rawLine of body) {
    const trimmed = rawLine.trim();
    const forStart = trimmed.match(/^\{%\s*for\s+(\w+)\s+in\s+([\w.[\]]+)\s*%\}$/);
    const forEnd = trimmed.match(/^\{%\s*endfor\s*%\}$/);

    if (forStart) {
      inFor = true;
      forVarName = forStart[1];
      const target = getPath(context, forStart[2]);
      forIterTarget = Array.isArray(target) ? target : [];
      forBuffer = [];
      continue;
    }
    if (forEnd) {
      if (forIterTarget && forVarName) {
        for (const item of forIterTarget) {
          const innerCtx = { ...context, [forVarName]: item };
          for (const buffLine of forBuffer) {
            result.push(substitute(buffLine, innerCtx));
          }
        }
      }
      inFor = false;
      forVarName = null;
      forIterTarget = null;
      forBuffer = [];
      continue;
    }
    if (inFor) {
      forBuffer.push(rawLine);
    } else {
      result.push(substitute(rawLine, context));
    }
  }
  return result;
}

/**
 * Resolve a single string with Liquid into rendered string.
 * Used for subject, preheader, cta, callout values, hero src, etc.
 */
export function resolveLiquidString(s: string | undefined, context: LiquidContext): string {
  if (!s) return "";
  return substitute(s, context);
}
