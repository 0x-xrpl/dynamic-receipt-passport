import { categoryStats, monthlySpend, topCities } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";

export function StatsPanels() {
  const total = categoryStats.reduce((acc, stat) => acc + stat.amount, 0);
  const maxMonthly = Math.max(...monthlySpend.map((entry) => entry.amount));

  return (
    <div className="space-y-4">
      <section className="rounded-[1.35rem] border border-white/12 bg-white/5 p-5 sm:p-6">
        <p className="text-[0.62rem] uppercase tracking-[0.38em] text-white/50">Category mix</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {categoryStats.map((stat) => {
            const percent = Math.round((stat.amount / total) * 100);
            return (
              <div key={stat.label} className="rounded-[1.1rem] border border-white/10 bg-black/20 p-4">
                <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.28em] text-white/70">
                  <span>{stat.label}</span>
                  <span className="text-white/60">{percent}%</span>
                </div>
                <p className="mt-3 text-xl font-bold tracking-[0.04em]">{formatCurrency(stat.amount)}</p>
                <div className="mt-3 h-1.5 rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-white" style={{ width: `${percent}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-[1.35rem] border border-white/12 bg-white/5 p-5 sm:p-6">
        <p className="text-[0.62rem] uppercase tracking-[0.38em] text-white/50">Monthly spend</p>
        <div className="mt-5 flex items-end gap-2.5">
          {monthlySpend.map((entry) => (
            <div key={entry.month} className="flex-1 text-center">
              <div className="relative mx-auto flex h-32 w-11 items-end justify-center rounded-full bg-white/5 sm:h-36 sm:w-12">
                <div
                  className="w-full rounded-full bg-gradient-to-t from-[#ffb347] to-white"
                  style={{ height: `${(entry.amount / maxMonthly) * 100}%` }}
                />
              </div>
              <p className="mt-2 text-[0.58rem] uppercase tracking-[0.32em] text-white/60">
                {entry.month}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[1.35rem] border border-white/12 bg-white/5 p-5 sm:p-6">
        <p className="text-[0.62rem] uppercase tracking-[0.38em] text-white/50">Top cities</p>
        <div className="mt-4 space-y-3">
          {topCities.map((city, index) => (
            <div
              key={city.label}
              className="flex items-center justify-between border-b border-white/5 pb-3 text-sm last:border-b-0 last:pb-0"
            >
              <div className="flex items-center gap-3">
                <span className="text-[0.58rem] uppercase tracking-[0.4em] text-white/40">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.32em]">{city.label}</span>
              </div>
              <p className="text-sm font-semibold tracking-[0.03em] text-white/75">
                {formatCurrency(city.amount)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
