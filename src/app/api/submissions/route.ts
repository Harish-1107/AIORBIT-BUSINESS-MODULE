import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const submissions = await prisma.toolSubmission.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({
    data: submissions.map((submission) => ({ ...submission, function: submission.businessFunction })),
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const fields = ["name", "website", "function", "description"] as const;
  if (fields.some((field) => !body[field] || typeof body[field] !== "string")) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  try { new URL(body.website); } catch { return NextResponse.json({ error: "A valid website URL is required." }, { status: 400 }); }
  const item = await prisma.toolSubmission.create({
    data: {
      name: body.name.trim(),
      website: body.website.trim(),
      businessFunction: body.function.trim(),
      description: body.description.trim(),
    },
  });
  return NextResponse.json({ data: { ...item, function: item.businessFunction } }, { status: 201 });
}
