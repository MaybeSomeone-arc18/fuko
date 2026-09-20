import { fetchAllOpportunities } from "../sources";
import { saveOpportunities, getOpportunities } from "../db/opportunities";
import { getOpportunityStatus } from "../sources/freshness";

export async function runSync(options?: { dryRun?: boolean }) {
  console.log(`[runSync] Starting opportunity sync... ${options?.dryRun ? '(DRY RUN)' : ''}`);
  
  try {
    const rawOpportunities = await fetchAllOpportunities();
    console.log(`[runSync] Fetched ${rawOpportunities.length} raw opportunities (deduplicated by source)`);

    const existingOpps = await getOpportunities();
    const existingMap = new Map(existingOpps.map(opp => [opp.id, opp]));

    const activeSet = new Set<string>();

    const mergedOpportunities = rawOpportunities.map(opp => {
      const existing = existingMap.get(opp.id);
      
      const status = opp.status || getOpportunityStatus(opp);
      
      activeSet.add(opp.id);

      return {
        ...opp,
        firstSeen: existing?.firstSeen || opp.firstSeen || new Date().toISOString(),
        status,
        lastVerified: new Date().toISOString(),
      };
    });

    const activeOpportunities = mergedOpportunities.filter(opp => opp.status !== "closed");
    const rejectedCount = mergedOpportunities.length - activeOpportunities.length;
    
    // Process stale records
    const staleRecords = [];
    for (const [id, opp] of existingMap.entries()) {
      if (!activeSet.has(id) && opp.status !== "closed") {
        staleRecords.push({
          ...opp,
          status: "closed" as const,
          lastVerified: new Date().toISOString()
        });
      }
    }

    const finalRecordsToSave = [...activeOpportunities, ...staleRecords];
    
    console.log(`[runSync] Filtered out ${rejectedCount} closed opportunities from raw fetch`);
    console.log(`[runSync] Identified ${staleRecords.length} stale opportunities to close`);
    if (options?.dryRun) {
      console.log(`[runSync] DRY RUN: Skipping write of ${finalRecordsToSave.length} opportunities to DynamoDB`);
    } else {
      console.log(`[runSync] Writing ${finalRecordsToSave.length} valid opportunities to DynamoDB`);
      await saveOpportunities(finalRecordsToSave);
    }
    
    console.log("[runSync] Sync complete!");

    const brabbleCount = rawOpportunities.filter(o => o.sourceType === 'brabble').length;
    const githubCount = rawOpportunities.filter(o => o.sourceType === 'github').length;

    return {
      success: true,
      fetched: rawOpportunities.length,
      brabbleFetched: brabbleCount,
      githubFetched: githubCount,
      stored: finalRecordsToSave.length,
      rejected: rejectedCount,
      staleClosed: staleRecords.length
    };
  } catch (error) {
    console.error("[runSync] Sync failed:", error);
    return {
      success: false,
      fetched: 0,
      brabbleFetched: 0,
      githubFetched: 0,
      stored: 0,
      rejected: 0,
      staleClosed: 0,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}
