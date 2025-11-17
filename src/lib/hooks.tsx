"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  mockPassport,
  mockPurchases,
  mockStamps,
  storePins,
  type PassportStats,
  type Purchase,
  type StampCard,
  type StorePin,
} from "./mockData";

interface DataContextValue {
  passport: PassportStats;
  purchases: Purchase[];
  stamps: StampCard[];
  pins: StorePin[];
  addPurchase: (purchase: Purchase) => void;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export function MockDataProvider({ children }: { children: ReactNode }) {
  const [passport, setPassport] = useState(mockPassport);
  const [purchases, setPurchases] = useState(mockPurchases);
  const [stamps] = useState(mockStamps);
  const [pins] = useState(storePins);

  const addPurchase = useCallback((purchase: Purchase) => {
    setPurchases((prev) => [purchase, ...prev]);
    setPassport((prev) => {
      let level = prev.level;
      let xp = prev.xpProgress + 0.2;
      if (xp >= 1) {
        level += 1;
        xp = xp - 1;
      }
      return {
        ...prev,
        totalSpend: prev.totalSpend + purchase.amount,
        totalVat: prev.totalVat + purchase.vat,
        totalPurchases: prev.totalPurchases + 1,
        storesCount: prev.storesCount + 1,
        xpProgress: xp,
        level,
      };
    });
  }, []);

  const value = useMemo(
    () => ({ passport, purchases, stamps, pins, addPurchase }),
    [passport, purchases, pins, stamps, addPurchase],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used inside MockDataProvider");
  }
  return context;
}

export function usePassportData() {
  const { passport } = useData();
  return passport;
}

export function usePurchases() {
  const { purchases, addPurchase } = useData();
  return { purchases, addPurchase };
}

export function useStamps() {
  const { stamps } = useData();
  return stamps;
}

export function useXrpStores() {
  const { pins } = useData();
  return pins;
}
