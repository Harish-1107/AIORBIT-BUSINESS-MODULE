import { NextResponse } from "next/server";
import { getDirectoryTools } from "@/lib/data";
import { apiError } from "@/lib/api-response";
import { toolQuerySchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = toolQuerySchema.safeParse(Object.fromEntries(searchParams));
  if (!parsed.success) {
    return apiError("Invalid tool filters.", 400, parsed.error.flatten().fieldErrors);
  }
  try {
    const { search, limit, ...filters } = parsed.data;
    const result = await getDirectoryTools({ ...filters, q: search, page: 1, pageSize: limit });
    return NextResponse.json({ data: result.items, pagination: result.pagination });
  } catch {
    return apiError("The tool directory is temporarily unavailable.", 503);
  }
}
