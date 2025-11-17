"use client";

import { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/drp/app-shell";
import { PassportCard } from "@/components/drp/passport-card";
import { usePassportData, useStamps } from "@/lib/hooks";
import { StampGrid } from "@/components/drp/stamp-grid";
import { MilestonesPanel } from "@/components/drp/milestones";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { connectWallet, getAccountInfo, getTransactionHistory } from "@/lib/legacyAdapter";

export default function PassportPage() {
  const passport = usePassportData();
  const stamps = useStamps();
  const [wallet, setWallet] = useState<{ address: string; seed: string } | null>(null);
  const [accountInfo, setAccountInfo] = useState<any | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    setStatus("loading");
    setError(null);
    try {
      const connected = await connectWallet();
      setWallet(connected);
      const info = await getAccountInfo(connected.address);
      setAccountInfo(info);
      const tx = await getTransactionHistory(5, connected.address);
      setHistory(tx);
      setStatus("idle");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError(err instanceof Error ? err.message : "XRPL unavailable");
    }
  };

  const balanceDrops = accountInfo?.account_data?.Balance ?? null;
  const balanceXrp = balanceDrops ? Number(balanceDrops) / 1_000_000 : null;

  return (
    <AppShell heroSubtitle="One NFT boarding pass for the XRPL residency." contextLabel="Passport overview">
      <div className="space-y-6">
        <PassportCard stats={passport} />
        <section className="rounded-[2rem] border border-white/15 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">XRPL wallet</p>
            <Button size="sm" onClick={handleConnect} disabled={status === "loading"}>
              {wallet ? "Refresh" : "Connect wallet"}
            </Button>
          </div>
          {wallet && (
            <div className="mt-3 space-y-2 text-xs text-white/70">
              <p className="font-mono break-all">Address · {wallet.address}</p>
              {balanceXrp !== null && (
                <p>
                  Balance ·{" "}
                  <span className="font-semibold text-white">
                    {balanceXrp.toFixed(2)} XRP
                  </span>
                </p>
              )}
              <p className="text-white/60">Seed stored locally for demo only.</p>
            </div>
          )}
          {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
          {history.length > 0 && (
            <div className="mt-4 space-y-2 text-xs text-white/70">
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">Recent tx</p>
              {history.map((entry, idx) => {
                const tx = entry.tx ?? entry;
                const hash = tx?.hash ?? tx?.tx?.hash ?? `tx-${idx}`;
                return (
                  <div key={hash} className="flex items-center justify-between rounded-xl border border-white/10 px-3 py-2">
                    <span>{tx?.TransactionType ?? "TX"}</span>
                    <span className="font-mono text-[11px] text-white/60">{hash.slice(0, 8)}…</span>
                  </div>
                );
              })}
            </div>
          )}
        </section>
        <section className="rounded-[2rem] border border-white/15 bg-white/5 p-6">
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
        <section className="rounded-[2rem] border border-white/15 bg-white/5 p-6">
          <p className="text-xs uppercase tracking-[0.35em] text-white/60">Stamp cards</p>
          <div className="mt-4">
            <StampGrid stamps={stamps} />
          </div>
        </section>
      </div>
    </AppShell>
  );
}
