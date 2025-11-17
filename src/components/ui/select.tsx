import { cn } from "@/lib/utils";
import type { SelectHTMLAttributes } from "react";

const baseSelect =
  "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 shadow-inner shadow-black/20 transition focus:border-cyan-300/60 focus:outline-none focus:ring-2 focus:ring-cyan-300/40";

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(baseSelect, "appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23ffffff80\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E')] bg-[length:24px] bg-[position:calc(100%-12px)_center] bg-no-repeat", className)} {...props}>
      {children}
    </select>
  );
}
