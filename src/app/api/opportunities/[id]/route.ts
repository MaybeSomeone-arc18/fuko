import { NextResponse } from "next/server";
import { getOpportunityById } from "../../../../lib/db/opportunities";
import { getOpportunityStatus } from "../../../../lib/sources/freshness";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const opportunity = await getOpportunityById(id);
    
    if (!opportunity) {
      return NextResponse.json({ error: "Opportunity not found" }, { status: 404 });
    }

    const oppWithStatus = {
      ...opportunity,
      status: opportunity.status || getOpportunityStatus(opportunity)
    };

    return NextResponse.json({ opportunity: oppWithStatus });
  } catch (error) {
    console.error("Error fetching opportunity:", error);
    return NextResponse.json({ error: "Failed to fetch opportunity" }, { status: 500 });
  }
}
