import { passportMilestones } from "@/lib/mockData";

export function MilestonesPanel() {
  return (
    <div className="space-y-5">
      {passportMilestones.map((milestone, index) => (
        <div key={milestone.title} className="flex gap-4 border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
          <div className="text-xs uppercase tracking-[0.35em] text-white/40">
            {milestone.date}
            <div className="text-3xl font-semibold text-white">{(index + 1).toString().padStart(2, "0")}</div>
          </div>
          <div>
            <h4 className="text-lg font-semibold uppercase tracking-[0.2em]">{milestone.title}</h4>
            <p className="text-sm text-white/70">{milestone.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
