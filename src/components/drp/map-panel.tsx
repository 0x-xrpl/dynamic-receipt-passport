"use client";

import { useMemo, useState } from "react";
import type { StorePin } from "@/lib/mockData";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { MapPin, Compass } from "lucide-react";

type FilterState = {
  purchases: boolean;
  stores: boolean;
  newOnly: boolean;
};

export function MapPanel({ pins }: { pins: StorePin[] }) {
  const [filters, setFilters] = useState<FilterState>({ purchases: true, stores: true, newOnly: false });

  const filtered = useMemo(() => {
    return pins.filter((pin) => {
      if (!filters.purchases && pin.type === "purchase") return false;
      if (!filters.stores && pin.type === "store") return false;
      if (filters.newOnly && !pin.isNew) return false;
      return true;
    });
  }, [pins, filters]);

  const latRange = useMemo(() => {
    const lats = pins.map((p) => p.lat);
    const lngs = pins.map((p) => p.lng);
    return {
      minLat: Math.min(...lats),
      maxLat: Math.max(...lats),
      minLng: Math.min(...lngs),
      maxLng: Math.max(...lngs),
    };
  }, [pins]);

  const toggle = (key: keyof FilterState) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">Residency Map</p>
          <h2 className="text-2xl font-semibold text-white">XRPL spots</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterPill label="My Purchases" active={filters.purchases} onClick={() => toggle("purchases")} />
          <FilterPill label="XRP Stores" active={filters.stores} onClick={() => toggle("stores")} />
          <FilterPill label="NEW only" active={filters.newOnly} onClick={() => toggle("newOnly")} />
        </div>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,0.8fr)]">
        <div className="relative h-[420px] overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_top,_rgba(12,32,52,0.85),_rgba(4,7,18,0.95))] p-6">
          <div className="absolute inset-4 rounded-[2rem] border border-white/5 bg-white/5" />
          <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          {filtered.map((pin) => {
            const latPercent =
              ((latRange.maxLat - pin.lat) / (latRange.maxLat - latRange.minLat)) * 100;
            const lngPercent = ((pin.lng - latRange.minLng) / (latRange.maxLng - latRange.minLng)) * 100;
            return (
              <div
                key={pin.id}
                className={cn(
                  "absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center",
                )}
                style={{ top: `${latPercent}%`, left: `${lngPercent}%` }}
              >
                {pin.isNew && <Badge tone="warning">NEW</Badge>}
                <div
                  className={cn(
                    "mt-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/40 text-white shadow-lg",
                    pin.type === "purchase" ? "bg-cyan-500/80" : "bg-purple-500/80",
                  )}
                >
                  <MapPin className="h-4 w-4" />
                </div>
                <p className="mt-2 text-xs text-white/80">{pin.name}</p>
              </div>
            );
          })}
        </div>
        <div className="space-y-3">
          {filtered.map((pin) => (
            <div key={pin.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-white">{pin.name}</p>
                {pin.isNew && <Badge tone="warning">New</Badge>}
              </div>
              <p className="text-sm text-white/60">{pin.city}</p>
              <p className="mt-2 text-xs text-white/50">{pin.description}</p>
              {pin.stampBenefit && (
                <p className="mt-1 text-xs text-emerald-200">{pin.stampBenefit}</p>
              )}
              <div className="mt-3 flex items-center gap-2 text-xs text-white/50">
                <Compass className="h-3.5 w-3.5" /> {pin.distance ?? "XRPL"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: VoidFunction;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-1.5 text-xs uppercase tracking-wide",
        active
          ? "border-cyan-300/70 bg-cyan-400/20 text-white"
          : "border-white/10 bg-white/5 text-white/50 hover:text-white",
      )}
    >
      {label}
    </button>
  );
}
