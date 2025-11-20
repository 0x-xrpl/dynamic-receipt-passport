import type { Purchase } from "@/lib/mockData";
import { formatCurrency, shortenHash } from "@/lib/utils";
import {
  Waves,
  Soup,
  Bus,
  Palette,
  ShoppingBag,
  HeartPulse,
  Shirt,
  Landmark,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const categoryIcons: Record<Purchase["category"], LucideIcon> = {
  Food: Soup,
  Transport: Bus,
  Culture: Palette,
  Groceries: ShoppingBag,
  Wellness: HeartPulse,
  Fashion: Shirt,
};

export function PurchaseList({ purchases }: { purchases: Purchase[] }) {
  return (
    <div className="space-y-3">
      {purchases.map((purchase) => (
        <article
          key={purchase.id}
          className="lift-hover flex flex-col gap-3 rounded-[1.35rem] border border-white/12 bg-white/5 px-4 py-4 text-white shadow-[0_18px_38px_rgba(2,6,23,0.45)] backdrop-blur-xl sm:px-5 sm:py-5"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-lg text-white/90 sm:text-xl">
                {(() => {
                  const Icon = categoryIcons[purchase.category] ?? Landmark;
                  return <Icon className="h-4.5 w-4.5 text-white" />;
                })()}
              </div>
              <div>
                <h3 className="font-mono text-base uppercase tracking-[0.18em] text-white sm:text-lg">
                  {purchase.store}
                </h3>
                <p className="text-[0.62rem] font-medium uppercase tracking-[0.28em] text-white/80">
                  {purchase.city} · {purchase.category}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-mono text-lg text-white sm:text-xl">
                {formatCurrency(purchase.amount, purchase.currency)}
              </p>
              <p className="text-[0.68rem] font-medium text-white/80">{purchase.date}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-white">
            <span>VAT {purchase.vat.toFixed(1)}%</span>
            <span>{purchase.method}</span>
            <span>{purchase.time}</span>
            {purchase.isXrp && (
              <span className="flex items-center gap-1 text-[var(--accent)]">
                <Waves className="h-3 w-3" /> XRP
              </span>
            )}
          </div>
          <div className="rounded-xl border border-white/10 bg-white/10 px-3.5 py-2.5 text-[0.78rem] font-medium leading-relaxed text-white/80">
            {purchase.memo}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-[0.9rem] border border-white/20 bg-white/10 px-3 py-1 text-[0.52rem] font-semibold uppercase tracking-[0.24em] text-white/70 shadow-[0_12px_34px_rgba(8,15,40,0.35)]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="tracking-[0.28em] text-white/80">TX HASH</span>
              {purchase.method === "XRP" && purchase.hash && (
                <Badge
                  tone="success"
                  className="px-2 py-0.5 text-[0.46rem] tracking-[0.32em] text-emerald-100"
                >
                  ON-CHAIN · XRPL TESTNET
                </Badge>
              )}
            </div>
            {purchase.hash ? (
              <a
                href={`https://testnet.xrpl.org/transactions/${purchase.hash}`}
                target="_blank"
                rel="noreferrer"
                className="ml-auto min-w-[8ch] text-right font-mono text-[0.6rem] tracking-[0.42em] text-white hover:text-emerald-200"
              >
                {shortenHash(purchase.hash, 8, 6)}
              </a>
            ) : (
              <span className="ml-auto min-w-[8ch] text-right font-mono text-[0.6rem] tracking-[0.42em] text-white/60">
                Pending
              </span>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
