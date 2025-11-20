"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type TabOption = {
  value: string;
  label: string;
  icon?: ReactNode;
};

type TabSwitcherProps = {
  options: TabOption[];
  value: string;
  onChange: (value: string) => void;
};

export function TabSwitcher({ options, value, onChange }: TabSwitcherProps) {
  return (
    <div className="flex rounded-[1.8rem] border border-white/20 bg-white/10 px-2 py-2.5 shadow-[0_28px_60px_rgba(5,10,25,0.35)]">
      {options.map((option) => {
        const isActive = value === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex-1 rounded-[1.2rem] px-6 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/75 transition focus-visible:outline-none",
              isActive
                ? "bg-white/80 text-slate-900 shadow-[0_16px_34px_rgba(8,12,35,0.45)]"
                : "hover:bg-white/15",
            )}
          >
            <span
              className={cn(
                "flex items-center justify-center gap-2 leading-[1.15]",
                isActive ? "text-slate-900" : "text-white/85",
              )}
            >
              {option.icon}
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
