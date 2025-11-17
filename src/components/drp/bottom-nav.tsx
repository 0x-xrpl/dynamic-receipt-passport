"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Home, Map, PlusCircle, ReceiptText } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/passport", label: "Passport", icon: ReceiptText },
  { href: "/add-purchase", label: "Add", icon: PlusCircle },
  { href: "/map", label: "Map", icon: Map },
  { href: "/export", label: "Export", icon: Compass },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-4 z-40 mx-auto w-full max-w-md px-4 sm:px-0">
      <div className="backdrop-card glass-border flex items-center justify-between rounded-3xl px-3 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center rounded-2xl px-2 py-1 text-[0.65rem] uppercase tracking-[0.15em] transition",
                active ? "text-white" : "text-white/50 hover:text-white",
              )}
            >
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10",
                  active ? "bg-white/20 text-white" : "bg-transparent",
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
