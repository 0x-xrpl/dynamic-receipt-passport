"use client";

import Link from "next/link";
import { AppShell } from "@/components/drp/app-shell";
import { PassportCard } from "@/components/drp/passport-card";
import { usePassportData, useStamps } from "@/lib/hooks";
import { StampGrid } from "@/components/drp/stamp-grid";
import { MilestonesPanel } from "@/components/drp/milestones";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useWallet } from "@/context/wallet-context";

export default function PassportPage() {
  const passport = usePassportData();
  const stamps = useStamps();
  const { address, connected } = useWallet();
  const connectedAddressLabel =
    address && address.length > 10 ? `${address.slice(0, 10)}...${address.slice(-6)}` : address;
  const rebateRate = 0.05;
  const rebateAmount = passport.totalSpend * rebateRate;
  const rebateTarget = 6000 * rebateRate; // e.g., spend target €6k for full rebate milestone
  const rebateCard = {
    id: "rebate-xrp",
    store: "XRP Rebate",
    city: "Global",
    progress: 0,
    goal: 1,
    benefit: "Projected XRP rebate",
    unlocked: rebateAmount >= rebateTarget,
    rebateAmount,
    rebateTarget,
    rebateRate,
  } as const;

  return (
    <AppShell hideHero heroSubtitle="One NFT boarding pass for the XRPL residency." contextLabel="Passport overview">
      <div className="space-y-6">
        <div className="mx-auto w-full max-w-[680px]">
          <PassportCard stats={passport} variant="compact" size="card" headerLabel="Dynamic Receipt Passport" />
        </div>
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
            <StampGrid stamps={[...stamps, rebateCard]} />
          </div>
        </section>
      </div>
    </AppShell>
  );
}
