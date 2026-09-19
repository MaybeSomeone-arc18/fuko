import { curatedOpportunities } from "../../data/curatedOpportunities";
import { Opportunity } from "../../types";

export async function fetchCuratedOpportunities(): Promise<Opportunity[]> {
  // In the future this could fetch from a CMS or database.
  // For now, it returns the static dataset.
  return curatedOpportunities;
}
