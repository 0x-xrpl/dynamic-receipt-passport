import { NextRequest, NextResponse } from "next/server";
import { fetchTransaction } from "@/lib/xrpl/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ hash: string }> };

export async function GET(_: NextRequest, context: RouteContext) {
  const { hash } = await context.params;
  const result = await fetchTransaction(hash);
  return NextResponse.json(result);
}
