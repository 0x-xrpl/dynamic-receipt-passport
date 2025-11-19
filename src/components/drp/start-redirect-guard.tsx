"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export const START_SEEN_STORAGE_KEY = "drp_seen_start";

export function StartRedirectGuard() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (pathname === "/start") {
      return;
    }

    const hasSeenStart = window.localStorage.getItem(START_SEEN_STORAGE_KEY);
    if (!hasSeenStart) {
      router.replace("/start");
    }
  }, [pathname, router]);

  return null;
}
