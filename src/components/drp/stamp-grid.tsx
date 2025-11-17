import type { StampCard } from "@/lib/mockData";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";

export function StampGrid({ stamps }: { stamps: StampCard[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {stamps.map((stamp) => {
        const percent = (stamp.progress / stamp.goal) * 100;
        return (
          <div
            key={stamp.id}
            className={`rounded-3xl border border-white/10 p-5 ${
              stamp.unlocked ? "bg-gradient-to-r from-emerald-500/30 to-cyan-500/20" : "bg-white/5"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">{stamp.city}</p>
                <h3 className="text-xl font-semibold text-white">{stamp.store}</h3>
              </div>
              {stamp.unlocked ? (
                <Badge tone="success">Benefit unlocked</Badge>
              ) : (
                <Badge tone="default">
                  {stamp.progress}/{stamp.goal}
                </Badge>
              )}
            </div>
            <p className="mt-3 text-sm text-white/70">{stamp.benefit}</p>
            <Progress value={percent} className="mt-4" />
          </div>
        );
      })}
    </div>
  );
}
