"use client";

import { useState } from "react";
import { AppShell } from "@/components/drp/app-shell";
import { Select } from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { connectWallet, disconnectWallet, getAccountInfo } from "@/lib/legacyAdapter";

export default function SettingsPage() {
  const [theme, setTheme] = useState("liquid");
  const [accent, setAccent] = useState("amber");
  const [currency, setCurrency] = useState("EUR");
  const [language, setLanguage] = useState("en");
  const [homeCity, setHomeCity] = useState("Paris");
  const [status, setStatus] = useState(true);
  const [digest, setDigest] = useState(false);
  const [xrplAddress, setXrplAddress] = useState<string | null>(null);
  const [xrplBalance, setXrplBalance] = useState<string | null>(null);
  const [xrplBusy, setXrplBusy] = useState(false);

  const handleWalletConnect = async () => {
    setXrplBusy(true);
    try {
      const wallet = await connectWallet();
      setXrplAddress(wallet.address);
      const info = await getAccountInfo(wallet.address);
      const drops = info?.account_data?.Balance;
      if (drops) {
        setXrplBalance(`${(Number(drops) / 1_000_000).toFixed(2)} XRP`);
      }
    } catch (err) {
      console.error(err);
      setXrplBalance("Unavailable");
    } finally {
      setXrplBusy(false);
    }
  };

  const handleWalletDisconnect = async () => {
    setXrplBusy(true);
    try {
      await disconnectWallet();
      setXrplAddress(null);
      setXrplBalance(null);
    } finally {
      setXrplBusy(false);
    }
  };

  return (
    <AppShell heroSubtitle="Monochrome controls for future XRPL sync." contextLabel="Preferences">
      <div className="space-y-5">
        <Panel title="Theme">
          <Select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="liquid">Liquid default</option>
            <option value="noir">Noir</option>
            <option value="sunset">Sunset</option>
          </Select>
          <Select value={accent} onChange={(e) => setAccent(e.target.value)}>
            <option value="amber">Amber</option>
            <option value="teal">Teal</option>
            <option value="violet">Violet</option>
          </Select>
        </Panel>
        <Panel title="Locale">
          <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="EUR">Euro</option>
            <option value="USD">USD</option>
            <option value="JPY">JPY</option>
          </Select>
          <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="ja">日本語</option>
            <option value="fr">Français</option>
          </Select>
          <Select value={homeCity} onChange={(e) => setHomeCity(e.target.value)}>
            <option value="Paris">Paris</option>
            <option value="Tokyo">Tokyo</option>
            <option value="Osaka">Osaka</option>
            <option value="NYC">New York</option>
          </Select>
        </Panel>
        <Panel title="Notifications">
          <Row label="XRPL status updates" description="Confirmations once receipts settle.">
            <Toggle checked={status} onChange={(e) => setStatus(e.target.checked)} />
          </Row>
          <Row label="Weekly digest" description="Email summary of receipts + VAT.">
            <Toggle checked={digest} onChange={(e) => setDigest(e.target.checked)} />
          </Row>
        </Panel>
        <Panel title="Snapshot">
          <p className="text-sm text-white/60">
            Theme <strong>{theme}</strong> / Accent {accent} / Default currency {currency} / Language {language} / Home city {homeCity}.
          </p>
          <Button variant="ghost" className="mt-4 w-full">
            Apply mock settings
          </Button>
        </Panel>
        <Panel title="XRPL session">
          <p className="text-xs text-white/60">Track the shared testnet wallet used by the demo UI.</p>
          {xrplAddress ? (
            <div className="mt-3 space-y-1 text-xs text-white/70">
              <p className="font-mono break-all">{xrplAddress}</p>
              <p>{xrplBalance || "Loading balance…"}</p>
              <Button size="sm" variant="outline" onClick={handleWalletDisconnect} disabled={xrplBusy}>
                Disconnect
              </Button>
            </div>
          ) : (
            <Button size="sm" className="mt-3" onClick={handleWalletConnect} disabled={xrplBusy}>
              {xrplBusy ? "Connecting…" : "Connect XRPL wallet"}
            </Button>
          )}
        </Panel>
      </div>
    </AppShell>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4 rounded-[2rem] border border-white/10 bg-white/5 p-5">
      <p className="text-xs uppercase tracking-[0.35em] text-white/50">{title}</p>
      {children}
    </section>
  );
}

function Row({ label, description, children }: { label: string; description: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 pb-4 last:border-b-0 last:pb-0">
      <div>
        <p className="text-sm uppercase tracking-[0.2em]">{label}</p>
        <p className="text-xs text-white/50">{description}</p>
      </div>
      {children}
    </div>
  );
}
