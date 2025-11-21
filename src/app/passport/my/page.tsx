"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/drp/app-shell";
import { PassportCard } from "@/components/drp/passport-card";
import { Button } from "@/components/ui/button";
import type { PassportStats } from "@/lib/mockData";
import { loadMintedPassport } from "@/lib/passport-store";
import { buildTestnetAccountUrl, buildTestnetTxUrl, type MintedPassport } from "@/lib/xrpl";
import { shortenHash } from "@/lib/utils";

export default function MyPassportPage() {
  const [mintedPassport, setMintedPassport] = useState<MintedPassport | null>(null);

  useEffect(() => {
    setMintedPassport(loadMintedPassport());
  }, []);

  const stats: PassportStats | null = useMemo(() => {
    if (!mintedPassport) return null;
    return {
      level: mintedPassport.level,
      totalSpend: 0,
      totalVat: 0,
      citiesVisited: 0,
      storesCount: 1,
      xpProgress: 0.05,
      owner: mintedPassport.name,
      wallet: mintedPassport.address,
      favoriteCity: "XRPL Testnet",
      totalPurchases: 0,
      heroGradient:
        "bg-[radial-gradient(circle_at_top,_rgba(150,120,255,0.8),_rgba(32,8,56,0.95))]",
    };
  }, [mintedPassport]);

  return (
    <AppShell
      heroTitle="Your DRP Passport"
      heroSubtitle="LVL1 mint anchored on XRPL Testnet via GemWallet."
      eyebrow="XRPL TESTNET"
      contextLabel="NFTokenMint · Proof of holder"
      hideHero
    >
      <div className="space-y-8">
        {stats ? (
          <>
            <div className="mx-auto w-[90vw] max-w-[440px]">
              <PassportCard stats={stats} variant="compact" size="card" headerLabel="Dynamic Receipt Passport" />
            </div>

            <div className="mx-auto w-[90vw] max-w-[440px] lift-hover shine relative overflow-hidden rounded-[1.8rem] border border-white/12 bg-white/5 p-6 text-white shadow-[0_22px_60px_rgba(4,6,16,0.65)] backdrop-blur-2xl sm:p-7">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_50%)]" />
              <div className="relative z-10 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <InfoTile label="Passport name" value={mintedPassport.name} />
                  <InfoTile label="Level" value="LVL 1" />
                  <InfoTile label="XRPL address" value={shortenHash(mintedPassport.address, 8, 6)} />
                  <InfoTile label="NFTokenID" value={shortenHash(mintedPassport.nfTokenId, 8, 6)} />
                </div>
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">Mint transaction</p>
                  <div className="flex flex-wrap items-center gap-3 rounded-[1.2rem] border border-white/12 bg-white/5 px-4 py-3 font-mono text-sm text-white/90">
                    <span className="break-all text-white/80">{mintedPassport.mintHash}</span>
                    <Button asChild size="sm" variant="secondary" className="ml-auto">
                      <Link href={buildTestnetTxUrl(mintedPassport.mintHash)} target="_blank" rel="noreferrer">
                        View on XRPL Testnet ↗
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="mx-auto w-[90vw] max-w-[440px] lift-hover shine relative overflow-hidden rounded-[1.8rem] border border-white/12 bg-white/5 p-6 text-white shadow-[0_22px_60px_rgba(4,6,16,0.65)] backdrop-blur-2xl sm:p-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),transparent_48%)]" />
            <div className="relative z-10 space-y-4 text-center">
              <p className="text-[0.72rem] uppercase tracking-[0.32em] text-white/60">No passport found</p>
              <p className="text-lg leading-relaxed text-white/80">
                You haven&apos;t minted a Level 1 passport yet. Jump to the mint flow to create yours on XRPL
                Testnet.
              </p>
              <div className="flex justify-center">
                <Button asChild size="lg" className="text-[0.78rem] font-semibold uppercase tracking-[0.18em]">
                  <Link href="/passport/new">Go to Mint Passport</Link>
                </Button>
              </div>
            </div>
          </div>
        )}

        <footer className="mx-auto flex w-[90vw] max-w-[440px] items-center justify-center">
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="w-full text-[0.78rem] font-semibold uppercase tracking-[0.18em]"
          >
            <Link href="/">HOME</Link>
          </Button>
        </footer>
      </div>
    </AppShell>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.2rem] border border-white/10 bg-white/5 p-4 shadow-inner shadow-black/30">
      <p className="text-[0.68rem] uppercase tracking-[0.3em] text-white/60">{label}</p>
      <p className="mt-1 font-mono text-sm text-white">{value}</p>
    </div>
  );
}
