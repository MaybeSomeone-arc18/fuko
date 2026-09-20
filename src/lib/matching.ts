import { Opportunity, UserProfile } from "../types";

export interface MatchedOpportunity extends Opportunity {
  score: number;
  reasons: string[];
}

function normalize(str: string): string {
  if (!str) return "";
  let s = str.toLowerCase().trim();
  s = s.replace(/[\s-]/g, "");
  if (s.endsWith("s")) {
    s = s.slice(0, -1);
  }
  return s;
}

function checkMatch(a: string, b: string): boolean {
  const normA = normalize(a);
  const normB = normalize(b);
  if (!normA || !normB) return false;
  return normA.includes(normB) || normB.includes(normA);
}

export function matchOpportunities(
  profile: UserProfile,
  opportunities: Opportunity[]
): MatchedOpportunity[] {


  return opportunities
    .map((opp) => {
      let strongScore = 0;
      let weakScore = 0;
      const reasons: string[] = [];

      // 1. Opportunity type match (+20)
      const matchesType = profile.opportunityTypes.some((t) =>
        checkMatch(opp.type, t)
      );
      if (matchesType) {
        strongScore += 20;
        reasons.push(`Matches your preference for ${opp.type} roles`);
      }

      // 2. Skills match (+30)
      const matchedSkills = opp.skills.filter((skill) =>
        profile.skills.some((ps) => checkMatch(skill, ps))
      );
      if (matchedSkills.length > 0) {
        strongScore += 30;
        reasons.push(`Matches your ${matchedSkills[0]} skill`);
      }

      // 3. Interests match (+30)
      const matchedInterests = opp.interests.filter((interest) =>
        profile.interests.some((pi) => checkMatch(interest, pi))
      );
      if (matchedInterests.length > 0) {
        strongScore += 30;
        reasons.push(`Aligns with your ${matchedInterests[0]} interest`);
      }

      // 4. Location match (+15 for direct, remote gives weak score)
      const isRemote = opp.location.toLowerCase().includes("remote") || opp.location.toLowerCase().includes("online");
      const matchesLocation = profile.location && opp.location.toLowerCase().includes(profile.location.toLowerCase());
      
      if (matchesLocation && !isRemote) {
        // Direct location match is strong enough to note, but maybe not enough to bypass alone
        // We'll add it to weak score, but add a reason
        weakScore += 15;
        reasons.push(`Located near ${profile.location}`);
      } else if (isRemote) {
        // Remote is generic, weak signal. No reason generated.
        weakScore += 10;
      }

      // 5. Student eligibility (+10)
      const isStudentRole =
        opp.type.toLowerCase().includes("intern") ||
        opp.type.toLowerCase().includes("co-op") ||
        opp.type.toLowerCase().includes("fellow") ||
        opp.description.toLowerCase().includes("student") ||
        opp.eligibility?.toLowerCase().includes("student");

      if (isStudentRole && profile.studyYear) {
        // Generic, weak signal
        weakScore += 10;
      }

      // 6. Deadline exists (+5)
      if (opp.deadline) {
        weakScore += 5;
      }

      // Relevance gate
      let hasRelevanceGatePassed = false;
      
      if (matchedSkills.length > 0) hasRelevanceGatePassed = true;
      if (matchedInterests.length > 0) hasRelevanceGatePassed = true;
      if (matchesLocation && !isRemote) hasRelevanceGatePassed = true;
      if (isStudentRole && profile.studyYear) hasRelevanceGatePassed = true;

      // Must have at least ONE meaningful profile-specific signal to qualify
      if (hasRelevanceGatePassed) {
        const totalScore = strongScore + weakScore;
        return {
          ...opp,
          score: totalScore,
          reasons: reasons.slice(0, 4), // Keep max 4 reasons
        };
      }
      return null;
    })
    .filter((opp): opp is MatchedOpportunity => opp !== null)
    .sort((a, b) => b.score - a.score);
}