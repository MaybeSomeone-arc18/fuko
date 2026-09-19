import { NextResponse } from "next/server";
import { fetchAllOpportunities } from "../../../lib/sources";
import { saveOpportunities } from "../../../lib/db/opportunities";

export async function GET() {
  try {
    const opportunities = await fetchAllOpportunities();
    await saveOpportunities(opportunities);
    return NextResponse.json({ opportunities, success: true, count: opportunities.length });
  } catch (error) {
    console.error("Failed to sync opportunities:", error);
    return NextResponse.json({ error: "Failed to sync opportunities" }, { status: 500 });
  }
}
