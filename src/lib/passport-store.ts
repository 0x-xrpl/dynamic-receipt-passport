"use client";

import type { MintedPassport } from "./xrpl";

const STORAGE_KEY = "drp:passport:lvl1";

export function saveMintedPassport(passport: MintedPassport) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(passport));
}

export function loadMintedPassport(): MintedPassport | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as MintedPassport;
  } catch {
    return null;
  }
}

export function clearMintedPassport() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
