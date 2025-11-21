"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { START_SEEN_STORAGE_KEY } from "@/components/drp/start-redirect-guard";
import { Input } from "@/components/ui/input";

const heroCopy = {
  eyebrow: "XRPL COMMONS",
  titleLines: ["Dynamic", "Receipt", "Passport"],
  subtitleLines: ["From Receipts to Loyalty", "One Unified Layer powered by XRPL"],
};

export default function HomePage() {
  const router = useRouter();
  const [activePanel, setActivePanel] = useState<"email" | "wallet" | null>(null);
  const [emailMode, setEmailMode] = useState<"signin" | "signup">("signin");
  const [emailState, setEmailState] = useState({ email: "", password: "", confirm: "" });
  const [walletAddress, setWalletAddress] = useState("");

  const handleDemoClick = (href: string) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(START_SEEN_STORAGE_KEY, "1");
    }
    router.push(href);
  };

  const toggleEmailPanel = () => setActivePanel((prev) => (prev === "email" ? null : "email"));
  const toggleWalletPanel = () => setActivePanel((prev) => (prev === "wallet" ? null : "wallet"));

  return (
    <div className="flex min-h-[calc(100vh-5rem)] w-full flex-col items-center justify-center px-5 py-12 text-center sm:py-16">
      <div className="flex w-[92vw] max-w-[540px] flex-col items-center">
        <section className="lift-hover shine relative w-full overflow-hidden rounded-[2.2rem] border border-white/12 bg-white/5 px-7 py-12 text-white shadow-[0_25px_70px_rgba(3,3,12,0.55)] backdrop-blur-2xl sm:px-9 sm:py-14">
          <div className="relative z-10 flex min-h-[28rem] flex-col items-center space-y-7 text-center">
            <div className="space-y-5 w-full">
              <p className="label-eyebrow no-line text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)] text-[0.85rem] tracking-[0.22em]">
                {heroCopy.eyebrow}
              </p>
              <h1 className="font-mono text-[3.3rem] font-normal leading-[1.1] tracking-tight text-white drop-shadow-[0_3px_14px_rgba(0,0,0,0.55)]">
                {heroCopy.titleLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>
              <div className="space-y-2 text-white w-full">
                <p className="text-[1.05rem] font-medium leading-relaxed tracking-[0.08em] drop-shadow-[0_3px_10px_rgba(0,0,0,0.45)]">
                  From Receipts to Loyalty
                  <br />
                  One Unified Layer
                  <br />
                  Powered by XRPL
                </p>
              </div>
            </div>
            <div className="mt-auto space-y-3 pt-4">
              <Button
                size="lg"
                className="w-full text-[0.78rem] font-semibold uppercase tracking-[0.18em]"
                variant="secondary"
                onClick={() => handleDemoClick("/passport")}
              >
                Demo Mode (Test Login)
              </Button>
              <Button
                size="lg"
                className="w-full text-[0.78rem] font-semibold uppercase tracking-[0.18em]"
                variant="secondary"
                onClick={toggleEmailPanel}
              >
                Start With Email
              </Button>
              <Button
                size="lg"
                className="w-full text-[0.78rem] font-semibold uppercase tracking-[0.18em]"
                variant="secondary"
                onClick={toggleWalletPanel}
              >
                Connect Wallet (Testnet)
              </Button>
            </div>
            {activePanel && (
              <div className="space-y-4 rounded-[1.6rem] border border-white/15 bg-white/5 p-4 text-center shadow-inner backdrop-blur-xl">
                {activePanel === "email" && (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant={emailMode === "signin" ? "secondary" : "ghost"}
                        className="flex-1"
                        onClick={() => setEmailMode("signin")}
                      >
                        Sign In
                      </Button>
                      <Button
                        type="button"
                        variant={emailMode === "signup" ? "secondary" : "ghost"}
                        className="flex-1"
                        onClick={() => setEmailMode("signup")}
                      >
                        Sign Up
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <Input
                        type="email"
                        placeholder="Email"
                        value={emailState.email}
                        onChange={(e) => setEmailState((prev) => ({ ...prev, email: e.target.value }))}
                      />
                      <Input
                        type="password"
                        placeholder="Password"
                        value={emailState.password}
                        onChange={(e) => setEmailState((prev) => ({ ...prev, password: e.target.value }))}
                      />
                      {emailMode === "signup" && (
                        <Input
                          type="password"
                          placeholder="Confirm password"
                          value={emailState.confirm}
                          onChange={(e) => setEmailState((prev) => ({ ...prev, confirm: e.target.value }))}
                        />
                      )}
                      <Button
                        className="w-full text-[0.78rem] font-semibold uppercase tracking-[0.18em]"
                        size="lg"
                        variant="secondary"
                      >
                        {emailMode === "signup" ? "Create account" : "Continue"}
                      </Button>
                    </div>
                  </div>
                )}
                {activePanel === "wallet" && (
                  <div className="space-y-3 rounded-[1.1rem] border border-white/10 bg-white/5 p-3">
                    <div className="space-y-1">
                      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-white/70">
                        XRPL Testnet Wallet Address
                      </p>
                      <p className="text-xs text-white/60">Enter your testnet wallet address (r…).</p>
                    </div>
                    <Input
                      placeholder="rXXXXXXXXXXXXXXXXXXXX"
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value)}
                    />
                    <Button className="w-full" variant="secondary">
                      Connect
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_55%)]" />
        </section>
      </div>
    </div>
  );
}
