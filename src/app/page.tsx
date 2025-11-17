"use client";

import { useState } from "react";
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

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("timeline");
  const passport = usePassportData();
  const { purchases } = usePurchases();
  const pins = useXrpStores();

  return (
    <AppShell>
      <div className="space-y-5">
        <PassportCard stats={passport} />
        <TabSwitcher options={tabs} value={activeTab} onChange={setActiveTab} />
        {activeTab === "timeline" && <PurchaseList purchases={purchases} />}
        {activeTab === "map" && (
          <section className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.35em] text-white/60">
              <span>● Purchases</span>
              <span>○ XRP stores</span>
              <Badge tone="warning" className="text-[0.52rem] uppercase tracking-[0.3em]">
                Live map
              </Badge>
            </div>
            <MapCanvas pins={pins} height={360} />
          </section>
        )}
        {activeTab === "stats" && <StatsPanels />}
      </div>
    </AppShell>
  );
}
