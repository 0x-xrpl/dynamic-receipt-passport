"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { connect as connectGemWallet, detectGemWallet } from "@/lib/wallet";

type WalletState = {
  connected: boolean;
  address: string | null;
};

type WalletContextValue = WalletState & {
  connect: () => Promise<void>;
};

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WalletState>({ connected: false, address: null });
  const [isConnecting, setIsConnecting] = useState(false);

  const connect = useCallback(async () => {
    if (isConnecting) return;
    setIsConnecting(true);
    try {
      const installed = await detectGemWallet();
      if (!installed) {
        alert("GemWallet is not installed. Install from https://gemwallet.app/ to continue.");
        return;
      }

      const result = await connectGemWallet();
      if (result.success) {
        setState({ connected: true, address: result.address });
      } else {
        alert(result.error || "Unable to connect to GemWallet.");
      }
    } finally {
      setIsConnecting(false);
    }
  }, [isConnecting]);

  const value = useMemo(
    () => ({
      ...state,
      connect,
    }),
    [state, connect],
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
