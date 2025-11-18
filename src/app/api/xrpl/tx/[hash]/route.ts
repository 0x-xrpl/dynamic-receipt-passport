import { NextResponse } from "next/server";
import { fetchTransaction } from "@/lib/xrpl/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_: Request, { params }: { params: { hash: string } }) {
  const result = await fetchTransaction(params.hash);
  return NextResponse.json(result);
}
