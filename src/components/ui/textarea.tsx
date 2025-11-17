import { cn } from "@/lib/utils";
import type { TextareaHTMLAttributes } from "react";

const base =
  "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 shadow-inner shadow-black/20 transition focus:border-cyan-300/60 focus:outline-none focus:ring-2 focus:ring-cyan-300/40";

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(base, className)} {...props} />;
}
