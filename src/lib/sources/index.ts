import { Opportunity } from "../../types";
import { fetchGithubOpportunities } from "./github";
import { fetchCuratedOpportunities } from "./curated";

export async function fetchAllOpportunities(): Promise<Opportunity[]> {
  const [github, curated] = await Promise.all([
    fetchGithubOpportunities(),
    fetchCuratedOpportunities()
  ]);

  const all = [...curated, ...github];
  
  // Deduplicate by sourceUrl
  const seenUrls = new Set<string>();
  const deduplicated: Opportunity[] = [];

  for (const opp of all) {
    if (!seenUrls.has(opp.sourceUrl)) {
      seenUrls.add(opp.sourceUrl);
      deduplicated.push(opp);
    }
  }

  return deduplicated;
}
