import { NextResponse } from "next/server";
import { getRelatedTools, getTool } from "@/lib/data";
import { apiError } from "@/lib/api-response";
import { slugSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slugSchema.safeParse(slug).success) return apiError("Invalid tool slug.", 400);
  try {
    if (!await getTool(slug)) return apiError("Tool not found.", 404);
    return NextResponse.json({ data: await getRelatedTools(slug) });
  } catch {
    return apiError("The tool directory is temporarily unavailable.", 503);
  }
}
