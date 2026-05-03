export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative h-7 w-7">
        <div className="absolute inset-0 rounded-md bg-gradient-to-br from-flame-400 to-flame-600 shadow-[0_0_24px_-6px_rgba(255,107,0,0.7)]" />
        <div className="absolute inset-[3px] rounded-[5px] bg-ink-950 grid place-items-center">
          <span className="text-[10px] font-display font-bold tracking-tight text-flame-400">TS</span>
        </div>
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display text-sm font-semibold tracking-tight text-ink-100">Top Shot</span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-ink-400">Review</span>
      </div>
    </div>
  );
}
