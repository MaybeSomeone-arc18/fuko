import { curatedOpportunities } from "../../data/curatedOpportunities";
import { Opportunity } from "../../types";

function validateCurated(opportunities: Opportunity[]): Opportunity[] {
  const valid: Opportunity[] = [];
  const seenUrls = new Set<string>();

  for (const opp of opportunities) {
    if (!opp.sourceUrl) {
      console.warn(`Skipping opportunity ${opp.id}: missing sourceUrl`);
      continue;
    }
    
    if (seenUrls.has(opp.sourceUrl)) {
      console.warn(`Skipping opportunity ${opp.id}: duplicate sourceUrl ${opp.sourceUrl}`);
      continue;
    }

    // Check if expired
    if (opp.deadline && opp.deadline !== "Rolling" && !isNaN(Date.parse(opp.deadline))) {
      const deadlineDate = new Date(opp.deadline);
      if (deadlineDate < new Date()) {
        console.warn(`Skipping opportunity ${opp.id}: expired deadline ${opp.deadline}`);
        continue;
      }
    }

    seenUrls.add(opp.sourceUrl);
    valid.push(opp);
  }

  return valid;
}

export async function fetchCuratedOpportunities(): Promise<Opportunity[]> {
  return validateCurated(curatedOpportunities);
}
