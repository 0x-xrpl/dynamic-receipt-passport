import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "backdrop-card glass-border rounded-3xl p-6 text-slate-100 transition duration-300",
        "bg-gradient-to-b from-white/5 via-white/2 to-white/5",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4 flex items-center justify-between", className)} {...props} />;
}

export function CardTitle({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p className={cn("text-sm uppercase tracking-[0.3em] text-slate-400", className)}>{children}</p>
  );
}

export function CardHighlight({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/5 p-4 text-xs uppercase tracking-wide text-white/70",
        className,
      )}
      {...props}
    />
  );
}
