import { NextResponse } from "next/server";
import { createFundedWallet } from "@/lib/xrpl/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  const { wallet, balance } = await createFundedWallet();
  return NextResponse.json({
    address: wallet.address,
    seed: wallet.seed,
    balance,
  });
}
