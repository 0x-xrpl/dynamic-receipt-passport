import { NextResponse } from "next/server";
import { sendTestnetPayment } from "@/lib/xrpl/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount = "1", destination, memo, senderSeed } = body ?? {};
    const result = await sendTestnetPayment({
      amountXrp: amount,
      destination,
      memo,
      senderSeed,
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("XRPL send error", error);
    return NextResponse.json({ error: "XRPL_TESTNET_FAILURE" }, { status: 500 });
  }
}
