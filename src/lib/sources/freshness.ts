import { Opportunity } from "../../types";

export function getOpportunityStatus(opp: Opportunity): "active" | "upcoming" | "closed" | "recurring" {
  // If explicitly overridden in the DB/curated layer
  if (opp.status && opp.status !== "active") {
    return opp.status;
  }
  
  if (!opp.deadline) {
    return "recurring";
  }
  
  const deadlineDate = new Date(opp.deadline);
  if (isNaN(deadlineDate.getTime())) {
    return "recurring";
  }
  
  if (deadlineDate < new Date()) {
    return "closed";
  }
  
  return "active";
}
