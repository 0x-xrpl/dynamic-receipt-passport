"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/drp/app-shell";
import { PassportCard } from "@/components/drp/passport-card";
import { TabSwitcher } from "@/components/ui/tab-switcher";
import { PurchaseList } from "@/components/drp/purchase-list";
import { StatsPanels } from "@/components/drp/stats-panels";
import { usePassportData, usePurchases, useXrpStores } from "@/lib/hooks";
import dynamic from "next/dynamic";
import { Badge } from "@/components/ui/badge";

const MapCanvas = dynamic(
  () => import("@/components/drp/map-canvas").then((mod) => mod.MapCanvas),
  {
    ssr: false,
  },
);

const tabs = [
  { label: "Timeline", value: "timeline" },
  { label: "Map", value: "map" },
  { label: "Stats", value: "stats" },
];

export default function TimelinePage() {
  const [activeTab, setActiveTab] = useState("timeline");
  const passport = usePassportData();
  const { purchases } = usePurchases();
  const pins = useXrpStores();
  const totalFromReceipts = useMemo(
    () => purchases.reduce((sum, purchase) => sum + purchase.amount, 0),
    [purchases],
  );

  return (
    <AppShell hideHero>
      <div className="space-y-5">
        <PassportCard
          stats={passport}
          totalSpendOverride={totalFromReceipts}
          variant="full"
          hideIdentity
          size="compactCard"
          enableWidgetSelector
        />
        <TabSwitcher options={tabs} value={activeTab} onChange={setActiveTab} />
        {activeTab === "timeline" && <PurchaseList purchases={purchases} />}
        {activeTab === "map" && (
          <section className="lift-hover space-y-4 rounded-[1.9rem] border border-white/12 bg-white/5 p-5 shadow-[0_24px_60px_rgba(3,3,12,0.6)] backdrop-blur-2xl">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.35em] text-white/60">
              <span>● Purchases</span>
              <span>○ XRP stores</span>
              <Badge tone="warning" className="text-[0.52rem] uppercase tracking-[0.3em]">
                Live map
              </Badge>
            </div>
            <div className="aspect-[1.586/1] overflow-hidden rounded-[1.5rem] border border-white/10">
              <MapCanvas pins={pins} height="100%" />
            </div>
          </section>
        )}
        {activeTab === "stats" && (
          <section className="lift-hover rounded-[1.9rem] border border-white/12 bg-white/5 p-5 shadow-[0_24px_60px_rgba(3,3,12,0.6)] backdrop-blur-2xl">
            <StatsPanels />
          </section>
        )}
      </div>
    </AppShell>
  );
}
