"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import type { StorePin } from "@/lib/mockData";

const parisPosition: [number, number] = [48.8566, 2.3522];

export function MapCanvas({ pins, height = 320 }: { pins: StorePin[]; height?: number }) {
  return (
    <div className="relative overflow-hidden rounded-[1.5rem] border border-white/25 bg-gradient-to-br from-[#f7f9ff]/90 via-[#eef2ff]/95 to-[#dee7ff]/90 p-3 shadow-[0_30px_80px_rgba(12,18,43,0.35)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_55%_10%,rgba(150,182,255,0.35),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,rgba(255,186,162,0.25),rgba(150,206,255,0.22),transparent)] opacity-70 mix-blend-screen" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_80%,rgba(255,255,255,0.45),transparent_60%)] opacity-80" />
      <MapContainer
        center={parisPosition}
        zoom={5}
        scrollWheelZoom={false}
        style={{ height, width: "100%" }}
        className="map-glass"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors &copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {pins.map((pin) => (
          <CircleMarker
            key={pin.id}
            center={[pin.lat, pin.lng]}
            radius={pin.type === "purchase" ? 7 : 9}
            pathOptions={{
              color: pin.type === "purchase" ? "#ffb074" : "#9cb7ff",
              weight: 1.6,
              fillColor: pin.type === "purchase" ? "rgba(255,176,116,0.85)" : "rgba(156,183,255,0.85)",
              fillOpacity: 0.85,
            }}
          >
            <Popup>
              <strong>{pin.name}</strong>
              <div>{pin.city}</div>
              {pin.description && <div className="text-xs">{pin.description}</div>}
              {pin.stampBenefit && <div className="text-xs text-emerald-500">{pin.stampBenefit}</div>}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
