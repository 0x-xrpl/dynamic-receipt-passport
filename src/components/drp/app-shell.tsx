import type { ReactNode } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

type AppShellProps = {
  heroTitle?: string;
  heroSubtitle?: string;
  eyebrow?: string;
  contextLabel?: string;
  actions?: ReactNode;
  hideHero?: boolean;
  children: ReactNode;
};

const DEFAULT_TITLE = "Dynamic Receipt Passport";
const DEFAULT_SUBTITLE = "Receipts · Journeys · Loyalty — Powered by XRPL.";

export function AppShell({
  heroTitle = DEFAULT_TITLE,
  heroSubtitle = DEFAULT_SUBTITLE,
  eyebrow = "XRPL COMMONS",
  contextLabel,
  actions,
  hideHero,
  children,
}: AppShellProps) {
  return (
    <div className="mx-auto w-full max-w-[680px]">
      <div className="flex flex-col gap-7 pb-6">
        {!hideHero && (
        <header className="lift-hover shine relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/5 px-7 py-7 text-white shadow-[0_25px_70px_rgba(3,3,12,0.55)] backdrop-blur-2xl sm:px-10 sm:py-9">
          <div className="relative z-10 space-y-4 sm:space-y-5">
            <p className="label-eyebrow text-white/70">
              {eyebrow}
            </p>
            <h1 className="type-hero font-mono">
              {heroTitle}
            </h1>
            {heroSubtitle && (
              <p className="type-subtitle max-w-2xl">
                {heroSubtitle}
              </p>
            )}
            {contextLabel && <p className="label-eyebrow text-white/60">{contextLabel}</p>}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Button
                asChild
                  variant="ghost"
                  className="border-white/30 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em]"
                >
                  <Link href="/passport">Passport overview</Link>
                </Button>
                <Button
                  asChild
                  className="px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em]"
                >
                  <Link href="/add-purchase">Add purchase</Link>
                </Button>
                {actions}
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_55%)]" />
          </header>
        )}
        {children}
      </div>
    </div>
  );
}
