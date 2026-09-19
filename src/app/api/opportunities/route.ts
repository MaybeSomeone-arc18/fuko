import { NextResponse } from "next/server";
import { getOpportunities } from "../../../lib/db/opportunities";
import { getOpportunityStatus } from "../../../lib/sources/freshness";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeClosed = searchParams.get("includeClosed") === "true";
    
    let opportunities = await getOpportunities();
    
    // Ensure all opportunities have a computed status
    opportunities = opportunities.map(opp => ({
      ...opp,
      status: opp.status || getOpportunityStatus(opp)
    }));

    if (!includeClosed) {
      opportunities = opportunities.filter(opp => getOpportunityStatus(opp) !== "closed");
    }
    
    return NextResponse.json({ opportunities });
  } catch (error) {
    console.error("Failed to fetch opportunities from DB:", error);
    return NextResponse.json({ error: "Failed to fetch opportunities" }, { status: 500 });
  }
}
