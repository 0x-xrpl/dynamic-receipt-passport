"use client";

import Link from "next/link";
import { AppShell } from "@/components/drp/app-shell";
import { PassportCard } from "@/components/drp/passport-card";
import { usePassportData, useStamps } from "@/lib/hooks";
import { StampGrid } from "@/components/drp/stamp-grid";
import { MilestonesPanel } from "@/components/drp/milestones";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export default function PassportPage() {
  const passport = usePassportData();
  const stamps = useStamps();

  return (
    <AppShell hideHero heroSubtitle="One NFT boarding pass for the XRPL residency." contextLabel="Passport overview">
      <div className="space-y-6">
        <PassportCard stats={passport} />
        <section className="lift-hover rounded-[2rem] border border-white/15 bg-white/5 p-6 shadow-[0_24px_60px_rgba(3,3,12,0.6)] backdrop-blur-2xl">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">Milestones</p>
            <Button asChild variant="ghost" size="sm">
              <Link href="/map">
                <MapPin className="mr-2 h-4 w-4" /> View on map
              </Link>
            </Button>
          </div>
          <div className="mt-4">
            <MilestonesPanel />
          </div>
        </section>
        <section className="lift-hover rounded-[2rem] border border-white/15 bg-white/5 p-6 shadow-[0_24px_60px_rgba(3,3,12,0.6)] backdrop-blur-2xl">
          <p className="text-xs uppercase tracking-[0.35em] text-white/60">Stamp cards</p>
          <div className="mt-4">
            <StampGrid stamps={stamps} />
          </div>
        </section>
      </div>
    </AppShell>
  );
}
