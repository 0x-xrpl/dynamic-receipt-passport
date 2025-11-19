"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/drp/app-shell";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { usePurchases } from "@/lib/hooks";
import type { Purchase } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { shortenHash } from "@/lib/utils";

const categories = ["Food", "Transport", "Culture", "Groceries", "Wellness", "Fashion"] as const;
const methods = ["XRP", "Card", "Cash"] as const;

export default function AddPurchasePage() {
  const { purchases, addPurchase } = usePurchases();
  const [form, setForm] = useState({
    store: "",
    amount: "",
    currency: "EUR",
    vat: "20",
    category: "Food" as Purchase["category"],
    city: "Paris",
    method: "XRP" as Purchase["method"],
    memo: "",
    date: new Date().toISOString().slice(0, 10),
    time: "12:00",
  });
  const [aiMessage, setAiMessage] = useState<string | null>(null);
  const [hash, setHash] = useState<string | null>(null);
  const [txState, setTxState] = useState<"idle" | "sending" | "error">("idle");
  const [isSaving, setIsSaving] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [lastSavedMethod, setLastSavedMethod] = useState<Purchase["method"] | null>(null);
  const recent = useMemo(() => purchases.slice(0, 2), [purchases]);
  const explorerUrl = hash ? `https://testnet.xrpl.org/transactions/${hash}` : null;
  const shortHash = hash ? shortenHash(hash, 6, 6) : null;
  const statusMeta = (() => {
    if (txState === "sending") {
      return {
        label: "Sending payment to XRPL Testnet…",
        dotClass: "bg-amber-400/80 animate-pulse",
        showShortHash: false,
      };
    }
    if (txState === "error") {
      return {
        label: "XRPL testnet unavailable · placeholder hash",
        dotClass: "bg-rose-400",
        showShortHash: false,
      };
    }
    if (hash) {
      return {
        label: "On-chain on XRPL Testnet",
        dotClass: "bg-emerald-400",
        showShortHash: true,
      };
    }
    return {
      label: "Awaiting XRPL submission",
      dotClass: "bg-white/50",
      showShortHash: false,
    };
  })();
  const previewBoxText =
    txState === "sending" ? "Sending payment to XRPL Testnet…" : hash ?? "Awaiting XRPL submission";
  const saveLabel = form.method === "XRP" ? "Save XRPL receipt" : "Save receipt";

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.store || !form.amount || isSaving) return;
    setConfirmation(null);
    setLastSavedMethod(null);
    setIsSaving(true);

    try {
      let resolvedHash = hash ?? generateHash();

      if (form.method === "XRP") {
        setTxState("sending");
        try {
          const response = await fetch("/api/xrpl/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              amount: form.amount,
              memo: `DRP:${form.store}:${form.amount}`,
            }),
          });
          if (!response.ok) {
            throw new Error("XRPL send failed");
          }
          const payload = await response.json();
          resolvedHash = payload.hash;
          setTxState("idle");
        } catch (error) {
          console.error("XRPL send error", error);
          setTxState("error");
          resolvedHash = generateHash();
        }
      } else {
        resolvedHash = generateHash();
        setTxState("idle");
      }

      setHash(resolvedHash);
      const payload: Purchase = {
        id: `draft-${Date.now()}`,
        store: form.store,
        city: form.city,
        country: "France",
        category: form.category,
        amount: parseFloat(form.amount),
        currency: form.currency,
        vat: parseFloat(form.vat),
        method: form.method,
        memo: form.memo,
        date: form.date,
        time: form.time,
        isXrp: form.method === "XRP",
        icon: "✨",
        hash: resolvedHash,
      };
      addPurchase(payload);
      setConfirmation(form.method === "XRP" ? "XRPL receipt saved to passport" : "Receipt saved");
      setLastSavedMethod(form.method);
      setForm((prev) => ({ ...prev, store: "", amount: "", memo: "" }));
    } finally {
      setIsSaving(false);
    }
  };

  const handleSuggest = () => {
    setForm((prev) => ({ ...prev, category: "Culture", vat: "10" }));
    setAiMessage("AI mock · Culture · 10% VAT (XR art)");
  };

  return (
    <AppShell hideHero heroSubtitle="Smooth XRPL Testnet capture" contextLabel="Add purchase">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Section title="Store & Amount">
          <Input placeholder="Store name" value={form.store} onChange={(e) => update("store", e.target.value)} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              type="number"
              placeholder="Amount"
              value={form.amount}
              onChange={(e) => update("amount", e.target.value)}
            />
            <Select value={form.currency} onChange={(e) => update("currency", e.target.value)}>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="JPY">JPY</option>
            </Select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input type="date" value={form.date} onChange={(e) => update("date", e.target.value)} />
            <Input type="time" value={form.time} onChange={(e) => update("time", e.target.value)} />
          </div>
          <Input placeholder="City" value={form.city} onChange={(e) => update("city", e.target.value)} />
        </Section>

        <Section title="Details">
          <div className="grid gap-4 sm:grid-cols-2">
            <Select value={form.category} onChange={(e) => update("category", e.target.value)}>
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </Select>
            <Input placeholder="VAT %" value={form.vat} onChange={(e) => update("vat", e.target.value)} />
          </div>
          <Select value={form.method} onChange={(e) => update("method", e.target.value)}>
            {methods.map((method) => (
              <option key={method}>{method}</option>
            ))}
          </Select>
          <Textarea rows={3} placeholder="Memo" value={form.memo} onChange={(e) => update("memo", e.target.value)} />
          <div className="flex flex-wrap items-center gap-3">
            <Button type="button" variant="ghost" onClick={handleSuggest}>
              AI suggest category & VAT
            </Button>
            {aiMessage && <Badge tone="warning">{aiMessage}</Badge>}
          </div>
        </Section>

        <Section title="XRPL testnet preview">
          <p className="text-sm text-white/70">
            Demo hash updates locally. In production this will link to the XRPL explorer with proofs.
          </p>
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-3 text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-white/70">
              <div className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${statusMeta.dotClass}`} />
                <span>{statusMeta.label}</span>
              </div>
              {statusMeta.showShortHash && shortHash && (
                <span className="font-mono text-[0.6rem] tracking-[0.4em] text-white">{shortHash}</span>
              )}
            </div>
            <div className="rounded-2xl border border-white/15 bg-black/30 px-4 py-3 font-mono text-xs text-white/70">
              {previewBoxText}
            </div>
            {txState === "idle" && hash && explorerUrl && (
              <Button
                type="button"
                variant="ghost"
                className="w-full text-xs opacity-70"
                onClick={() => window.open(explorerUrl, "_blank", "noopener,noreferrer")}
              >
                View on XRPL Testnet
              </Button>
            )}
            {confirmation && (
              <p
                className={`text-[0.55rem] font-semibold uppercase tracking-[0.3em] ${
                  lastSavedMethod === "XRP" ? "text-emerald-200" : "text-white/70"
                }`}
              >
                {confirmation}
              </p>
            )}
          </div>
        </Section>

        <div className="flex flex-col gap-3">
          <Button type="submit" disabled={isSaving || txState === "sending"}>
            {saveLabel}
          </Button>
          <Button type="button" variant="ghost">
            Save draft
          </Button>
        </div>
      </form>

      <div className="mt-6 space-y-3 rounded-3xl border border-white/10 bg-white/5 p-5">
        <p className="text-xs uppercase tracking-[0.35em] text-white/60">Recent mock receipts</p>
        {recent.map((purchase) => (
          <div key={purchase.id} className="flex items-center justify-between text-sm">
            <span className="uppercase tracking-[0.2em]">{purchase.store}</span>
            <span className="text-white/60">
              {purchase.amount.toFixed(2)} {purchase.currency}
            </span>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4 rounded-[2rem] border border-white/15 bg-white/5 p-5">
      <p className="text-xs uppercase tracking-[0.35em] text-white/60">{title}</p>
      {children}
    </section>
  );
}

function generateHash() {
  return `0x${crypto.randomUUID().replace(/-/g, "").slice(0, 30)}`;
}
