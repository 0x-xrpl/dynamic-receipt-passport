"use client";

export function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(amount: number, currency = "EUR") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function shortenHash(hash: string, start = 6, end = 4) {
  if (!hash) return "";
  return `${hash.slice(0, start)}...${hash.slice(-end)}`;
}
