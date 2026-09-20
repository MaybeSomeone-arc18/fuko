import { runSync } from "../lib/sync/runSync";

export const handler = async (event: unknown) => {
  console.log("[Lambda] Invoked with event:", JSON.stringify(event));

  const result = await runSync();

  if (!result.success) {
    console.error("[Lambda] Sync failed", result.error);
    return {
      statusCode: 500,
      body: JSON.stringify(result)
    };
  }

  console.log("[Lambda] Sync completed successfully", result);
  return {
    statusCode: 200,
    body: JSON.stringify(result)
  };
};

// Local testing execution: check if this file is the entry point
if (process.argv[1] && process.argv[1].includes('sync.ts')) {
  handler({}).then(res => console.log("Local execution result:", res));
}