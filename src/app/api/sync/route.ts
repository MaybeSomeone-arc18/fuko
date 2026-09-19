import { NextResponse } from "next/server";
import { fetchAllOpportunities } from "../../../lib/sources";

export async function GET() {
  try {
    const opportunities = await fetchAllOpportunities();
    return NextResponse.json({ opportunities });
  } catch (error) {
    console.error("Failed to sync opportunities:", error);
    return NextResponse.json({ error: "Failed to sync opportunities" }, { status: 500 });
  }
}
