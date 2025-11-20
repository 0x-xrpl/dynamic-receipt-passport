"use client";

import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";
import { cloneElement, isValidElement } from "react";

const baseStyles =
  "lift-hover inline-flex items-center justify-center gap-1.5 rounded-full border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/45 disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  primary:
    "bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.95),_rgba(48,17,75,0.9))] text-slate-950 border-transparent shadow-[0_18px_40px_rgba(139,92,246,0.45)] hover:shadow-[0_30px_60px_rgba(139,92,246,0.55)]",
  secondary:
    "bg-white/5 text-white border-white/15 hover:bg-white/10 hover:border-white/25 shadow-[0_10px_35px_rgba(4,5,15,0.4)]",
  ghost:
    "bg-transparent border border-white/10 text-white/70 hover:text-white hover:bg-white/5 hover:border-white/25",
  outline: "bg-transparent border-white/20 text-white hover:border-white/50 hover:bg-white/5",
} as const;

const sizes = {
  sm: "px-3.5 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
} as const;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  subtleGlow?: boolean;
  asChild?: boolean;
  children: ReactNode;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  subtleGlow,
  asChild,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const composed = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    subtleGlow && "relative before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-cyan-400/40 before:blur-2xl",
    className,
  );

  if (asChild) {
    if (!isValidElement(children)) {
      throw new Error("Button with asChild requires a valid React element child.");
    }

    const child = children as ReactElement;
    return cloneElement(child, {
      ...props,
      className: cn(child.props.className, composed),
    });
  }

  return (
    <button type={type} className={composed} {...props}>
      {children}
    </button>
  );
}
