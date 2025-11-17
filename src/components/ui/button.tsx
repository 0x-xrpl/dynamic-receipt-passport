"use client";

import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";
import { cloneElement, isValidElement } from "react";

const baseStyles =
  "inline-flex items-center justify-center gap-1.5 rounded-full border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  primary:
    "bg-[radial-gradient(circle_at_top,_#ffb347,_#ff823f)] text-slate-950 border-transparent shadow-[0_20px_45px_rgba(255,131,63,0.35)] hover:-translate-y-0.5 hover:shadow-[0_30px_60px_rgba(255,131,63,0.45)]",
  secondary: "bg-white/5 text-white border-white/10 hover:bg-white/10",
  ghost: "bg-transparent border border-white/10 text-white/70 hover:text-white hover:bg-white/5",
  outline: "bg-transparent border-white/20 text-white hover:border-white/50",
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

  if (asChild && isValidElement(children)) {
    return cloneElement(children as ReactElement, {
      className: cn(children.props.className, composed),
      ...props,
    });
  }

  return (
    <button type={type} className={composed} {...props}>
      {children}
    </button>
  );
}
