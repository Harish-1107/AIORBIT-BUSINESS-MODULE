import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { submissionSchema } from "@/lib/validation";
import { apiError } from "@/lib/api-response";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const submissions = await prisma.toolSubmission.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ data: submissions.map((submission) => ({ ...submission, function: submission.businessFunction })) });
  } catch {
    return apiError("The submission service is temporarily unavailable.", 503);
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("Request body must be valid JSON.", 400);
  }
  const parsed = submissionSchema.safeParse(body);
  if (!parsed.success) {
    return apiError("Please correct the highlighted fields.", 400, parsed.error.flatten().fieldErrors);
  }
  try {
    const item = await prisma.toolSubmission.create({
      data: { name: parsed.data.name, website: parsed.data.website, businessFunction: parsed.data.function, description: parsed.data.description },
    });
    return NextResponse.json({ data: { ...item, function: item.businessFunction } }, { status: 201 });
  } catch {
    return apiError("The submission service is temporarily unavailable.", 503);
  }
}
