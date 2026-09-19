import { NextResponse } from "next/server";
import { getOpportunities } from "../../../lib/db/opportunities";

export async function GET() {
  try {
    const opportunities = await getOpportunities();
    return NextResponse.json({ opportunities });
  } catch (error) {
    console.error("Failed to fetch opportunities from DB:", error);
    return NextResponse.json({ error: "Failed to fetch opportunities" }, { status: 500 });
  }
}
