import { NextResponse } from "next/server";

type Submission = { id: string; name: string; website: string; function: string; description: string; status: "PENDING"; createdAt: string };
const store = globalThis as unknown as { submissions?: Submission[] };
const submissions = store.submissions ?? (store.submissions = []);

export async function GET() {
  return NextResponse.json({ data: submissions });
}

export async function POST(request: Request) {
  const body = await request.json();
  const fields = ["name", "website", "function", "description"] as const;
  if (fields.some((field) => !body[field] || typeof body[field] !== "string")) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  try { new URL(body.website); } catch { return NextResponse.json({ error: "A valid website URL is required." }, { status: 400 }); }
  const item: Submission = { id: crypto.randomUUID(), name: body.name.trim(), website: body.website.trim(), function: body.function.trim(), description: body.description.trim(), status: "PENDING", createdAt: new Date().toISOString() };
  submissions.unshift(item);
  return NextResponse.json({ data: item }, { status: 201 });
}
