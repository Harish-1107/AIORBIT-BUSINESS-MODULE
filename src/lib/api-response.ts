import { NextResponse } from "next/server";

export function apiError(message: string, status = 500, details?: unknown) {
  return NextResponse.json(details ? { error: message, details } : { error: message }, { status });
}
