import { fetchAllOpportunities } from "../sources";
import { saveOpportunities } from "../db/opportunities";
import { getOpportunityStatus } from "../sources/freshness";

export async function runSync() {
  console.log("[runSync] Starting opportunity sync...");
  
  try {
    const rawOpportunities = await fetchAllOpportunities();
    console.log(`[runSync] Fetched ${rawOpportunities.length} raw opportunities (deduplicated by source)`);

    // Ensure status is up-to-date for all fetched items
    const validOpportunities = rawOpportunities.map(opp => {
      return {
        ...opp,
        status: opp.status || getOpportunityStatus(opp)
      };
    });

    // Optionally drop "closed" ones so we don't store junk. 
    // Wait, the API sync should keep the DB clean, so dropping closed is good.
    const activeOpportunities = validOpportunities.filter(opp => opp.status !== "closed");
    const rejectedCount = validOpportunities.length - activeOpportunities.length;
    
    console.log(`[runSync] Filtered out ${rejectedCount} closed opportunities`);
    console.log(`[runSync] Writing ${activeOpportunities.length} valid opportunities to DynamoDB`);

    await saveOpportunities(activeOpportunities);
    
    console.log("[runSync] Sync complete!");

    return {
      success: true,
      fetched: rawOpportunities.length,
      stored: activeOpportunities.length,
      rejected: rejectedCount
    };
  } catch (error) {
    console.error("[runSync] Sync failed:", error);
    return {
      success: false,
      fetched: 0,
      stored: 0,
      rejected: 0,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}
