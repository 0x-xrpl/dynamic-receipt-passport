import { passportMilestones } from "@/lib/mockData";

export function MilestonesPanel() {
  return (
    <div className="space-y-5">
      {passportMilestones.map((milestone, index) => (
        <div
          key={milestone.title}
          className="flex gap-6 rounded-2xl border border-white/10 bg-white/5 px-5 py-5 shadow-[0_12px_40px_rgba(3,4,12,0.45)] last:mb-0"
        >
          <div className="text-xs uppercase tracking-[0.35em] text-white/40">
            {milestone.date}
            <div className="text-3xl font-semibold text-white">{(index + 1).toString().padStart(2, "0")}</div>
          </div>
          <div className="space-y-2">
            <h4 className="text-lg font-semibold uppercase tracking-[0.2em]">{milestone.title}</h4>
            <p className="text-sm leading-relaxed text-white/80">{milestone.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
