import type { Metadata } from "next";
import { MockDataProvider } from "@/lib/hooks";
import "./globals.css";
import { BottomNav } from "@/components/drp/bottom-nav";

export const metadata: Metadata = {
  title: "Dynamic Receipt Passport",
  description:
    "Dynamic Receipt Passport – Global XRPL Journey. Receipts, loyalty and journeys across XRPL-ready cities worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-50 antialiased">
        <MockDataProvider>
          <div className="drp-gradient" />
          <div className="noise-layer" />
          <div className="relative mx-auto flex min-h-screen w-full max-w-4xl flex-col px-4 pb-28 pt-6 sm:px-6 lg:max-w-5xl">
            <main className="flex-1">{children}</main>
          </div>
          <BottomNav />
        </MockDataProvider>
      </body>
    </html>
  );
}
