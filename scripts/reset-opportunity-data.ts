import { runSync } from "../src/lib/sync/runSync";
import { deleteAllOpportunities } from "../src/lib/db/opportunities";
import { loadEnvConfig } from "@next/env";

// Ensure env vars are loaded for standalone script execution
loadEnvConfig(process.cwd());

async function resetOpportunities() {
  console.log("==========================================");
  console.log("   FUKO - RESET OPPORTUNITY DATA SCRIPT");
  console.log("==========================================\n");

  const isDryRun = process.argv.includes('--dry-run');

  if (isDryRun) {
    console.log("   *** DRY RUN MODE: No database changes will be made ***\n");
  }

  try {
    if (!isDryRun) {
      console.log("1. Deleting all existing records from DynamoDB (FukoOpportunities)...");
      await deleteAllOpportunities();
      console.log("   -> Deletion complete.\n");
    } else {
      console.log("1. [DRY RUN] Skipping database deletion.\n");
    }

    console.log("2. Running unified sync pipeline (Brabble + GitHub)...");
    const result = await runSync({ dryRun: isDryRun });

    console.log("\n==========================================");
    console.log("   SYNC RESULTS");
    console.log("==========================================");
    
    // Brabble / GitHub breakdown is hard since runSync just returns 'fetched'. 
    // We'll just print what we have. The prompt asks to print:
    // - Brabble records fetched
    // - GitHub records fetched
    // Let's modify the result from runSync to include source counts or just accept what we have.
    
    console.log(`Brabble Records Fetched: ${result.brabbleFetched}`);
    console.log(`GitHub Records Fetched: ${result.githubFetched}`);
    console.log(`Total Records Fetched: ${result.fetched}`);
    console.log(`Invalid/Closed Records Rejected: ${result.rejected}`);
    console.log(`Stale Records Closed (N/A on fresh wipe): ${result.staleClosed}`);
    console.log(`Final Active Records Stored: ${result.stored}`);
    
    if (result.success) {
      console.log("\n✅ Reset completed successfully.");
    } else {
      console.error("\n❌ Reset failed:", result.error);
    }
  } catch (error) {
    console.error("\n❌ Unhandled Error during reset:", error);
    process.exit(1);
  }
}

resetOpportunities();
