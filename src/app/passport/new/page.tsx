"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { mintNFT } from "@gemwallet/api";
import { AppShell } from "@/components/drp/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWallet } from "@/context/wallet-context";
import { loadMintedPassport, saveMintedPassport } from "@/lib/passport-store";
import { buildMintPayload } from "@/lib/xrpl";
import { shortenHash } from "@/lib/utils";

export default function PassportMintPage() {
  const router = useRouter();
  const { connected, address, connect } = useWallet();
  const [passportName, setPassportName] = useState("");
  const [minting, setMinting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [existingPassport, setExistingPassport] = useState(loadMintedPassport());

  useEffect(() => {
    const stored = loadMintedPassport();
    if (stored) {
      setExistingPassport(stored);
      setPassportName(stored.name);
    }
  }, []);

  const connectedLabel = useMemo(() => {
    if (!connected || !address) return "Wallet not connected";
    return `Connected: ${shortenHash(address, 8, 6)}`;
  }, [address, connected]);

  const handleMint = async () => {
    setError(null);
    const trimmedName = passportName.trim();

    if (!connected || !address) {
      setError("Connect your GemWallet on XRPL Testnet first.");
      return;
    }

    if (!trimmedName) {
      setError("Passport name is required.");
      return;
    }

    setMinting(true);
    try {
      const uri = `drp://passport/${encodeURIComponent(trimmedName)}`;
      const payload = buildMintPayload({ uri });
      const response = await mintNFT(payload);

      if (response.type !== "response" || !response.result?.NFTokenID || !response.result?.hash) {
        throw new Error("Mint was rejected. Please try again.");
      }

      const minted = {
        name: trimmedName,
        address,
        nfTokenId: response.result.NFTokenID,
        mintHash: response.result.hash,
        level: 1,
      };

      saveMintedPassport(minted);
      setExistingPassport(minted);
      router.push("/passport/my");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Mint failed, please try again.";
      setError(message);
    } finally {
      setMinting(false);
    }
  };

  return (
    <AppShell
      heroTitle="Mint your DRP Passport"
      heroSubtitle="XRPL Testnet · GemWallet required. Mint a LVL1 collectible that anchors your receipts journey."
      eyebrow="XRPL TESTNET FLOW"
      contextLabel="NFTokenMint · LVL1"
      actions={
        existingPassport && (
          <Button asChild variant="ghost" size="sm" className="px-4 py-2">
            <Link href="/passport/my">View my passport</Link>
          </Button>
        )
      }
    >
      <div className="space-y-5">
        {existingPassport && (
          <div className="lift-hover shine relative overflow-hidden rounded-[1.6rem] border border-white/15 bg-white/5 p-4 text-white shadow-[0_16px_50px_rgba(4,6,16,0.6)] backdrop-blur-2xl sm:p-5">
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <p className="text-[0.65rem] uppercase tracking-[0.32em] text-white/60">Passport stored</p>
                <p className="font-mono text-sm text-white/80">
                  {existingPassport.name} · {shortenHash(existingPassport.nfTokenId, 6, 6)}
                </p>
              </div>
              <Button asChild size="sm" variant="secondary">
                <Link href="/passport/my">Open my passport</Link>
              </Button>
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_60%)]" />
          </div>
        )}

        <div className="lift-hover shine relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/5 p-6 text-white shadow-[0_22px_60px_rgba(4,6,16,0.65)] backdrop-blur-2xl sm:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.14),transparent_45%)]" />
          <div className="relative z-10 space-y-6">
            <div className="space-y-2">
              <p className="text-[0.7rem] uppercase tracking-[0.32em] text-white/60">LVL1 passport mint</p>
              <p className="text-[1.05rem] leading-relaxed text-white/80">
                Connect GemWallet on XRPL Testnet, set your passport name, and mint a Level 1 collectible (NFTokenMint).
                This uses a placeholder URI and transferable flag so you can move it later.
              </p>
            </div>

            <div className="space-y-3">
              <label className="block text-xs uppercase tracking-[0.3em] text-white/70">Passport name</label>
              <Input
                placeholder="e.g. 0x-xrpl"
                value={passportName}
                onChange={(e) => setPassportName(e.target.value)}
                disabled={minting}
              />
            </div>

            <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4 shadow-inner shadow-black/30">
              <p className="text-xs uppercase tracking-[0.28em] text-white/60">Status</p>
              <p className="mt-2 font-mono text-sm text-white">{connectedLabel}</p>
              {!connected && (
                <p className="mt-1 text-xs text-white/60">
                  Ensure GemWallet is installed and set to XRPL Testnet before minting.
                </p>
              )}
            </div>

            {error && (
              <div className="rounded-[1.2rem] border border-rose-300/40 bg-rose-400/10 px-4 py-3 text-sm text-rose-50 shadow-[0_10px_35px_rgba(255,88,141,0.25)]">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                type="button"
                variant="secondary"
                className="flex-1 text-[0.78rem] font-semibold uppercase tracking-[0.18em]"
                onClick={() => connect()}
                disabled={minting}
              >
                {connected ? "Reconnect Wallet" : "Connect Wallet (Testnet)"}
              </Button>
              <Button
                type="button"
                className="flex-1 text-[0.78rem] font-semibold uppercase tracking-[0.18em]"
                onClick={handleMint}
                disabled={minting}
              >
                {minting ? "Minting…" : "Mint My Passport"}
              </Button>
            </div>

            <p className="text-xs text-white/60">
              Powered by GemWallet & XRPL Testnet · NFTokenMint uses transferable flag and a simple DRP placeholder URI.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
