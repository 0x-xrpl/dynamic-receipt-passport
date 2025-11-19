"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/drp/app-shell";
import { usePurchases } from "@/lib/hooks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

export default function ExportPage() {
  const { purchases } = usePurchases();
  const [from, setFrom] = useState("2025-02-01");
  const [to, setTo] = useState("2025-03-15");

  const data = useMemo(() => {
    const rows = purchases.filter((purchase) => purchase.date >= from && purchase.date <= to);
    const totalAmount = rows.reduce((sum, item) => sum + item.amount, 0);
    const totalVat = rows.reduce((sum, item) => sum + item.vat, 0);
    const cities = new Set(rows.map((item) => item.city)).size;
    return { rows, totalAmount, totalVat, cities };
  }, [from, to, purchases]);

  const download = () => alert("CSV export mocked for demo");

  return (
    <AppShell hideHero heroSubtitle="Accounting-grade snapshots with XRPL hashes." contextLabel="Export toolkit">
      <div className="space-y-5">
        <section className="rounded-[2rem] border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-6 text-slate-950">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-900/80">Date range</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
            <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
            <div className="flex gap-3">
              <Button onClick={download} className="flex-1">
                Download CSV
              </Button>
              <Button variant="ghost" className="flex-1 border border-slate-900/20 text-slate-900">
                Print view
              </Button>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <SummaryCard label="Total" value={formatCurrency(data.totalAmount)} />
          <SummaryCard label="VAT" value={formatCurrency(data.totalVat)} />
          <SummaryCard label="Purchases" value={`${data.rows.length}`} />
          <SummaryCard label="Cities" value={`${data.cities}`} />
        </section>

        <section className="space-y-4 rounded-[2rem] border border-white/15 bg-white/5 p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">Ledger preview</p>
            <span className="text-xs text-white/60">{data.rows.length} rows</span>
          </div>
          <div className="overflow-auto rounded-2xl border border-white/10">
            <table className="min-w-full text-left text-xs uppercase tracking-[0.2em] text-white/60">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-3 py-3">Date</th>
                  <th className="px-3 py-3">Store</th>
                  <th className="px-3 py-3">Amount</th>
                  <th className="px-3 py-3">VAT</th>
                  <th className="px-3 py-3">Method</th>
                  <th className="px-3 py-3">City</th>
                  <th className="px-3 py-3">Hash</th>
                </tr>
              </thead>
              <tbody className="text-[0.65rem] normal-case tracking-normal text-white">
                {data.rows.map((row) => (
                  <tr key={row.id} className="border-t border-white/5">
                    <td className="px-3 py-3 text-white/70">{row.date}</td>
                    <td className="px-3 py-3 uppercase tracking-[0.2em]">{row.store}</td>
                    <td className="px-3 py-3">{formatCurrency(row.amount, row.currency)}</td>
                    <td className="px-3 py-3">{row.vat.toFixed(2)}</td>
                    <td className="px-3 py-3">{row.method}</td>
                    <td className="px-3 py-3">{row.city}</td>
                    <td className="px-3 py-3 font-mono text-[0.6rem]">{row.hash}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
      <p className="text-xs uppercase tracking-[0.35em] text-white/50">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}
