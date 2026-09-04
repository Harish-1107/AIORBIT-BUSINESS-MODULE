import { NextResponse } from "next/server";
import { getDirectoryTools } from "@/lib/data";
import { apiError } from "@/lib/api-response";
import { toolDirectoryQuerySchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const parsed = toolDirectoryQuerySchema.safeParse(Object.fromEntries(new URL(request.url).searchParams));
  if (!parsed.success) return apiError("Invalid tool filters.", 400, parsed.error.flatten().fieldErrors);
  try {
    const result = await getDirectoryTools(parsed.data);
    return NextResponse.json({ data: result.items, pagination: result.pagination });
  } catch {
    return apiError("The tool directory is temporarily unavailable.", 503);
  }
}
