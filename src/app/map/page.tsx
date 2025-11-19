"use client";

import { AppShell } from "@/components/drp/app-shell";
import { MapCanvas } from "@/components/drp/map-canvas";
import { useXrpStores } from "@/lib/hooks";
import { Badge } from "@/components/ui/badge";

export default function MapPage() {
  const pins = useXrpStores();

  return (
    <AppShell
      hideHero
      heroSubtitle="Track where every XRPL receipt was minted across the journey."
      contextLabel="Residency map"
    >
      <div className="space-y-4">
        <MapCanvas pins={pins} height={500} />
        <div className="rounded-[1.7rem] border border-white/12 bg-white/5 p-4 text-[0.6rem] uppercase tracking-[0.35em] text-white/55">
          ● Purchases · ○ XRP stores · Tap to preview loyalty boosts.
        </div>
        <div className="space-y-3 rounded-[1.7rem] border border-white/12 bg-white/5 p-5">
          <div className="flex items-center justify-between">
            <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/55">Highlighted spots</p>
            <Badge tone="warning">New + XRP</Badge>
          </div>
          {pins.map((pin) => (
            <div
              key={pin.id}
              className="flex items-center justify-between border-b border-white/5 py-3 text-xs uppercase tracking-[0.3em] text-white/70 last:border-b-0 last:pb-0"
            >
              <div>
                <p className="uppercase tracking-[0.3em]">{pin.name}</p>
                <p className="text-[0.55rem] text-white/50">{pin.city}</p>
              </div>
              <p className="text-[0.55rem] text-white/60">{pin.stampBenefit ?? pin.description}</p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
