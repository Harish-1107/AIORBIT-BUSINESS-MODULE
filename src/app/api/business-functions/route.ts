import { NextResponse } from "next/server";
import { getBusinessFunctions } from "@/lib/data";
import { apiError } from "@/lib/api-response";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json({ data: await getBusinessFunctions() });
  } catch {
    return apiError("The business function directory is temporarily unavailable.", 503);
  }
}
