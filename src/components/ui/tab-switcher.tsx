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
    <div className="flex rounded-full border border-white/10 bg-white/5 p-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "flex-1 rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/60 transition focus-visible:outline-none",
            value === option.value && "bg-white text-slate-900 shadow-lg",
          )}
        >
          <span className="flex items-center justify-center gap-2">
            {option.icon}
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
}
