import { NextResponse } from "next/server";
import { runSync } from "../../../lib/sync/runSync";

export async function GET() {
  const result = await runSync();
  
  if (!result.success) {
    return NextResponse.json(result, { status: 500 });
  }

  return NextResponse.json(result);
}
