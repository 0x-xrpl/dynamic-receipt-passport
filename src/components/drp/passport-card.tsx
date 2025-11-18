"use client";

import type { PassportStats } from "@/lib/mockData";
import { formatCurrency, shortenHash } from "@/lib/utils";
import { Progress } from "../ui/progress";

type PassportCardProps = {
  stats: PassportStats;
  totalSpendOverride?: number;
};

const metricMap = [
  { key: "totalSpend", label: "Total spend" },
  { key: "totalVat", label: "VAT" },
  { key: "citiesVisited", label: "Cities" },
  { key: "storesCount", label: "Stores" },
];

export function PassportCard({ stats, totalSpendOverride }: PassportCardProps) {
  const walletDisplay = shortenHash(stats.wallet, 8, 6);
  const walletExplorerUrl = `https://testnet.xrpl.org/transactions/${stats.wallet}`;

  return (
    <div className="shine relative overflow-hidden rounded-[1.5rem] border border-white/15 bg-gradient-to-br from-[#140f24]/85 via-[#090c1f]/90 to-[#09162c]/85 p-5 text-white shadow-[0_24px_60px_rgba(4,6,16,0.7)] sm:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-x-6 bottom-4 h-36 rounded-full bg-gradient-to-r from-[#ffb347]/20 via-transparent to-[#7d9bff]/25 blur-3xl" />
      <div className="relative z-10 space-y-5">
        <div className="flex items-center justify-between text-[0.6rem] font-semibold uppercase tracking-[0.38em] text-white/70">
          <span>DRP PASS HOLDER</span>
          <span>lvl {stats.level.toString().padStart(2, "0")}</span>
        </div>
        <div>
          <h2 className="mt-1.5 text-[clamp(1.8rem,3vw,2.45rem)] font-semibold leading-tight tracking-tight text-white">
            {stats.owner}
          </h2>
          <div className="mt-3 rounded-[1.35rem] border border-white/14 bg-white/5 px-4 py-2 sm:px-5 sm:py-2.5">
            <div className="flex flex-wrap items-center gap-3 text-left">
              <span className="text-[0.44rem] font-semibold uppercase tracking-[0.32em] text-white/60">
                Wallet hash
              </span>
              <a
                href={walletExplorerUrl}
                target="_blank"
                rel="noreferrer"
                title={stats.wallet}
                className="ml-auto min-w-[8ch] select-text text-right text-[0.7rem] font-mono font-semibold tracking-[0.3em] text-white transition hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/40"
              >
                {walletDisplay}
              </a>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between text-[0.64rem] font-semibold uppercase tracking-[0.3em] text-white/60">
            <span>Progress</span>
            <span>{Math.round(stats.xpProgress * 100)}%</span>
          </div>
          <Progress value={stats.xpProgress * 100} className="mt-2 h-2.5 bg-white/20" />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {metricMap.map((metric) => {
            const rawValue = stats[metric.key as keyof PassportStats];
            const value =
              metric.key === "totalSpend" && typeof totalSpendOverride === "number"
                ? totalSpendOverride
                : rawValue;
            const formatted =
              typeof value === "number" && metric.key.includes("total")
                ? formatCurrency(value as number)
                : value?.toString();
            return (
              <div key={metric.key} className="rounded-[1.1rem] border border-white/12 bg-white/5 p-3 text-left">
                <p className="text-[0.56rem] font-medium uppercase tracking-[0.28em] text-white/60">
                  {metric.label}
                </p>
                <p className="mt-1.5 text-lg font-semibold tracking-[0.04em] text-white">{formatted}</p>
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-white/70">
          <div className="min-w-[5rem]">
            <p className="text-[0.54rem] uppercase tracking-[0.32em] text-white/50">Cities</p>
            <p className="text-xl font-semibold tracking-[0.03em] text-white">{stats.citiesVisited}</p>
          </div>
          <div className="min-w-[7rem]">
            <p className="text-[0.54rem] uppercase tracking-[0.32em] text-white/50">Favorite city</p>
            <p className="text-xl font-semibold tracking-[0.03em] text-white">{stats.favoriteCity}</p>
          </div>
          <div className="min-w-[6rem]">
            <p className="text-[0.54rem] uppercase tracking-[0.32em] text-white/50">Receipts</p>
            <p className="text-xl font-semibold tracking-[0.03em] text-white">{stats.totalPurchases}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
