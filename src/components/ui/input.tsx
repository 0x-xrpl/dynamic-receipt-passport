import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

const baseInput =
  "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 shadow-inner shadow-black/20 transition focus:border-cyan-300/60 focus:outline-none focus:ring-2 focus:ring-cyan-300/40";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(baseInput, className)} {...props} />;
}
