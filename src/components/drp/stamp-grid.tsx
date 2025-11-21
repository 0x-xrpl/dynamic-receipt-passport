import type { StampCard } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";

export function StampGrid({ stamps }: { stamps: StampCard[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {stamps.map((stamp) => {
        const isRebate = typeof stamp.rebateAmount === "number";
        const target = stamp.rebateTarget ?? stamp.goal;
        const current = isRebate ? stamp.rebateAmount ?? 0 : stamp.progress;
        const percent = target > 0 ? Math.min(100, (current / target) * 100) : 0;
        return (
          <div
            key={stamp.id}
            className={`flex h-full flex-col gap-3 rounded-3xl border p-5 ${
              isRebate
                ? "bg-gradient-to-r from-cyan-600/25 via-sky-500/20 to-violet-600/25 border-cyan-300/30 shadow-[0_18px_40px_rgba(0,220,255,0.1)]"
                : stamp.unlocked
                  ? "bg-gradient-to-r from-emerald-400/14 via-sky-400/12 to-indigo-500/16 border-white/12"
                  : "bg-white/5 border-white/10"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">{stamp.city}</p>
                <h3 className={`text-white ${isRebate ? "text-2xl font-semibold" : "text-xl font-semibold"}`}>
                  {stamp.store}
                </h3>
              </div>
              {stamp.unlocked ? (
                <Badge tone="success">Benefit unlocked</Badge>
              ) : (
                <Badge tone="default">
                  {isRebate ? `${Math.round(percent)}%` : `${stamp.progress}/${stamp.goal}`}
                </Badge>
              )}
            </div>
            <p className="mt-2 text-sm text-white/75">
              {isRebate
                ? `Projected rebate ${formatCurrency(stamp.rebateAmount ?? 0)} at ${(stamp.rebateRate ?? 0.05) * 100}%`
                : stamp.benefit}
            </p>
            <Progress
              value={percent}
              className={`mt-auto ${isRebate ? "bg-white/15" : ""}`}
              indicatorClassName={isRebate ? "bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300" : undefined}
            />
          </div>
        );
      })}
    </div>
  );
}
