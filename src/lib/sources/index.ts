import { Opportunity } from "../../types";
import { fetchGithubOpportunities } from "./github";
import { fetchBrabbleOpportunities } from "./brabble";

export async function fetchAllOpportunities(): Promise<Opportunity[]> {
  try {
    const [githubOpps, brabbleOpps] = await Promise.all([
      fetchGithubOpportunities(),
      fetchBrabbleOpportunities()
    ]);

    // Combine opportunities
    const all = [...githubOpps, ...brabbleOpps];

    // Basic deduplication by sourceUrl just in case
    const unique = new Map<string, Opportunity>();
    all.forEach(opp => {
      if (opp.sourceUrl && !unique.has(opp.sourceUrl)) {
        unique.set(opp.sourceUrl, opp);
      }
    });

    return Array.from(unique.values());
  } catch (error) {
    console.error("Error in fetchAllOpportunities:", error);
    return [];
  }
}

// Local testing execution
if (process.argv[1] && process.argv[1].includes('sources/index.ts')) {
  import('@next/env').then(({ loadEnvConfig }) => {
    loadEnvConfig(process.cwd());
  });

  fetchAllOpportunities().then(opps => {
    const brabbleCount = opps.filter(o => o.sourceType === 'brabble').length;
    const githubCount = opps.filter(o => o.sourceType === 'github').length;
    
    console.log(`\n=== TEST SOURCES ===`);
    console.log(`Total Brabble records: ${brabbleCount}`);
    console.log(`Total GitHub records: ${githubCount}`);

    const brabbleOppsList = opps.filter(o => o.sourceType === 'brabble');
    const withDeadline = brabbleOppsList.filter(o => o.deadline !== null).length;
    const withNullDeadline = brabbleOppsList.filter(o => o.deadline === null).length;
    const withSourcePublishedAt = brabbleOppsList.filter(o => o.sourcePublishedAt).length;

    console.log(`\nBrabble records: ${brabbleCount}`);
    console.log(`- records with actual deadline: ${withDeadline}`);
    console.log(`- records with null deadline: ${withNullDeadline}`);
    console.log(`- records with sourcePublishedAt: ${withSourcePublishedAt}`);
    
    console.log(`\nSample records (first 3):`);
    opps.slice(0, 3).forEach((opp, i) => {
      console.log(`  ${i + 1}. [${opp.sourceType}] ${opp.title} (${opp.organization})`);
    });
    
    const platforms = new Set(opps.map(o => o.organization));
    console.log(`\nPlatforms represented: ${Array.from(platforms).slice(0, 10).join(", ")}${platforms.size > 10 ? '...' : ''}`);
    
    const types = new Set(opps.map(o => o.sourceType));
    console.log(`Source types: ${Array.from(types).join(", ")}`);
  }).catch(console.error);
}
