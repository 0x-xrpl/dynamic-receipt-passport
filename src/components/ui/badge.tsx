import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

const colors = {
  default: "bg-white/10 text-white border-white/20",
  glow: "bg-gradient-to-r from-cyan-400/70 to-blue-500/70 text-white border-transparent",
  success: "bg-emerald-400/20 text-emerald-200 border-emerald-400/30",
  warning: "bg-amber-400/20 text-amber-100 border-amber-400/30",
  rose: "bg-rose-400/20 text-rose-100 border-rose-400/30",
  outline: "bg-transparent border-white/30 text-white/80",
} as const;

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: keyof typeof colors;
};

export function Badge({ tone = "default", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs uppercase tracking-wide",
        colors[tone],
        className,
      )}
      {...props}
    />
  );
}
