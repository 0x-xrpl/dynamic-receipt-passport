"use client";

import type { PassportStats } from "@/lib/mockData";
import { monthlySpend } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";
import { buildTestnetAccountUrl } from "@/lib/xrpl";
import { useState } from "react";

type PassportCardProps = {
  stats: PassportStats;
  totalSpendOverride?: number;
  variant?: "full" | "compact";
  hideIdentity?: boolean;
  size?: "default" | "card" | "compactCard";
  enableWidgetSelector?: boolean;
  headerLabel?: string;
};

const metricMap = [
  { key: "totalSpend", label: "Spend" },
  { key: "totalVat", label: "VAT" },
  { key: "citiesVisited", label: "Cities" },
  { key: "storesCount", label: "Stores" },
];

export function PassportCard({
  stats,
  totalSpendOverride,
  variant = "full",
  hideIdentity,
  size = "default",
  enableWidgetSelector = false,
  headerLabel = "Status",
}: PassportCardProps) {
  const walletExplorerUrl = buildTestnetAccountUrl(stats.wallet);
  const showFull = variant === "full";
  const sizeClass =
    size === "card"
      ? "aspect-[1.586/1] w-full max-w-[680px] mx-auto"
      : size === "compactCard"
        ? "w-full max-w-[680px] mx-auto min-h-[260px]"
        : "min-h-[280px]";
  const isCardSize = size === "card" || size === "compactCard";

  const maxMonthly = Math.max(...monthlySpend.map((m) => m.amount));
  const progressPercent = Math.round(stats.xpProgress * 100);
  const [widgetSelection, setWidgetSelection] = useState<"default" | "metrics" | "monthly">("default");

  const renderMetrics = () => (
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
          <div
            key={metric.key}
            className="flex min-h-[96px] flex-col justify-center rounded-[1.15rem] border border-white/12 bg-white/5 p-4 text-left shadow-[inset_0_0_30px_rgba(255,255,255,0.05)] sm:p-5"
          >
            <p className="type-label text-white/60 whitespace-nowrap">{metric.label}</p>
            <p className="mt-1.5 type-metric">{formatted}</p>
          </div>
        );
      })}
    </div>
  );

  const renderMonthly = () => (
    <div className="space-y-2">
      <p className="text-[0.54rem] uppercase tracking-[0.32em] text-white/60">Monthly spend</p>
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {monthlySpend.map((item) => {
          const heightPct = Math.max(16, Math.round((item.amount / maxMonthly) * 100));
          return (
            <div key={item.month} className="flex flex-col items-center justify-end gap-1">
              <div className="relative flex h-28 w-full items-end justify-center">
                <div className="flex h-full w-9 flex-col justify-end rounded-full bg-white/8 sm:w-10">
                  <div
                    className="w-full rounded-full bg-gradient-to-t from-[var(--accent)] to-white shadow-[0_10px_22px_rgba(46,119,255,0.22)]"
                    style={{ height: `${heightPct}%` }}
                    aria-hidden
                  />
                </div>
              </div>
              <p className="font-mono text-[0.75rem] text-white">
                €{item.amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
              <p className="text-[0.6rem] uppercase tracking-[0.35em] text-white/60">{item.month}</p>
            </div>
          );
        })}
      </div>
    </div>
  );

  const identityBlock = hideIdentity ? null : (
    <div className="space-y-2 sm:space-y-3">
      <div className="flex items-end justify-between gap-4">
        <h2 className="passport-name font-mono font-normal leading-tight tracking-tight text-white">
          {stats.owner}
        </h2>
        <a
          href={walletExplorerUrl}
          target="_blank"
          rel="noreferrer"
          title={stats.wallet}
          className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[0.55rem] uppercase tracking-[0.28em] text-white transition hover:border-cyan-200/70 hover:bg-cyan-200/10 hover:text-cyan-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/50"
        >
          <span>WALLET HASH</span>
          <span aria-hidden>↗</span>
        </a>
      </div>
      <div className="h-2 rounded-full bg-white/18">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400"
          style={{ width: `${progressPercent}%` }}
          aria-hidden
        />
      </div>
    </div>
  );

  return (
    <div
      className={`lift-hover shine relative overflow-hidden rounded-[1.8rem] border border-white/12 bg-gradient-to-br from-[#140f24]/85 via-[#090c1f]/90 to-[#09162c]/85 p-4 text-white shadow-[0_24px_60px_rgba(4,6,16,0.7)] backdrop-blur-2xl sm:p-5 ${sizeClass}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-x-6 bottom-4 h-36 rounded-full bg-gradient-to-r from-[#ffb347]/20 via-transparent to-[#7d9bff]/25 blur-3xl" />
{showFull ? (
        <div className="relative z-10 flex h-full flex-col gap-3">
          <div className="flex items-center justify-between text-white/70">
            <span
              className={`font-semibold uppercase text-white/70 ${
                isCardSize ? "text-[0.78rem] tracking-[0.28em]" : "text-xs tracking-[0.35em]"
              }`}
            >
              {headerLabel}
            </span>
            {enableWidgetSelector ? (
              <label className="relative inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[0.6rem] uppercase tracking-[0.24em] text-white shadow-[0_10px_28px_rgba(6,12,26,0.35)]">
                <span>Widget</span>
                <select
                  value={widgetSelection}
                  onChange={(e) => setWidgetSelection(e.target.value as typeof widgetSelection)}
                  className="absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0"
                  aria-label="Select widget layout"
                >
                  <option value="default">Metrics + monthly</option>
                  <option value="metrics">Metrics only</option>
                  <option value="monthly">Monthly spend</option>
                </select>
              </label>
            ) : (
              <span
                className={`font-semibold uppercase text-white/70 ${
                  isCardSize ? "text-[0.78rem] tracking-[0.28em]" : "text-xs tracking-[0.35em]"
                }`}
              >
                lvl {stats.level.toString().padStart(2, "0")}
              </span>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-3">
            {widgetSelection === "metrics" && renderMetrics()}
            {widgetSelection === "monthly" && renderMonthly()}
            {widgetSelection === "default" && (
              <>
                {renderMetrics()}
                {renderMonthly()}
              </>
            )}
          </div>
          {identityBlock && <div className="mt-auto">{identityBlock}</div>}
        </div>
      ) : (
        <div className="relative z-10 flex h-full flex-col gap-3">
          <div className="flex items-center justify-between text-white/70">
            <span
              className={`font-semibold uppercase text-white/70 ${
                isCardSize ? "text-[0.78rem] tracking-[0.28em]" : "text-xs tracking-[0.35em]"
              }`}
            >
              {headerLabel}
            </span>
            {enableWidgetSelector ? (
              <label className="relative inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[0.6rem] uppercase tracking-[0.24em] text-white shadow-[0_10px_28px_rgba(6,12,26,0.35)]">
                <span>Widget</span>
                <select
                  value={widgetSelection}
                  onChange={(e) => setWidgetSelection(e.target.value as typeof widgetSelection)}
                  className="absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0"
                  aria-label="Select widget layout"
                >
                  <option value="default">Metrics + monthly</option>
                  <option value="metrics">Metrics only</option>
                  <option value="monthly">Monthly spend</option>
                </select>
              </label>
            ) : (
              <span
                className={`font-semibold uppercase text-white/70 ${
                  isCardSize ? "text-[0.78rem] tracking-[0.28em]" : "text-xs tracking-[0.35em]"
                }`}
              >
                lvl {stats.level.toString().padStart(2, "0")}
              </span>
            )}
          </div>
          <div className="flex-1" />
          {identityBlock}
        </div>
      )}
    </div>
  );
}
