"use client";

import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

type ToggleProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export function Toggle({ className, ...props }: ToggleProps) {
  return (
    <label className={cn("relative inline-flex cursor-pointer items-center", className)}>
      <input type="checkbox" className="peer sr-only" {...props} />
      <span className="h-6 w-11 rounded-full bg-white/10 transition peer-checked:bg-cyan-400/60" />
      <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-lg transition peer-checked:translate-x-5 peer-checked:bg-slate-900" />
    </label>
  );
}
