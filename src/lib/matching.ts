import { Opportunity, UserProfile } from "../types";

export interface MatchedOpportunity extends Opportunity {
  score: number;
  reasons: string[];
}

export function matchOpportunities(
  profile: UserProfile,
  opportunities: Opportunity[]
): MatchedOpportunity[] {
  // Must match at least one strong signal (Type=25, Skill=25, Interest=20)
  const MIN_STRONG_SCORE = 20;

  return opportunities
    .map((opp) => {
      let strongScore = 0;
      let weakScore = 0;
      const reasons: string[] = [];

      // 1. Opportunity type match (+25)
      const matchesType = profile.opportunityTypes.some((t) =>
        opp.type.toLowerCase().includes(t.toLowerCase())
      );
      if (matchesType) {
        strongScore += 25;
        reasons.push(`Matches your preference for ${opp.type} roles`);
      }

      // 2. Skills match (+25)
      const matchedSkills = opp.skills.filter((skill) =>
        profile.skills.some((ps) => skill.toLowerCase().includes(ps.toLowerCase()) || ps.toLowerCase().includes(skill.toLowerCase()))
      );
      if (matchedSkills.length > 0) {
        strongScore += 25;
        reasons.push(`Matches your ${matchedSkills[0]} skill`);
      }

      // 3. Interests match (+20)
      const matchedInterests = opp.interests.filter((interest) =>
        profile.interests.some((pi) => interest.toLowerCase().includes(pi.toLowerCase()) || pi.toLowerCase().includes(interest.toLowerCase()))
      );
      if (matchedInterests.length > 0) {
        strongScore += 20;
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

      // Must have at least one STRONG match to appear
      if (strongScore >= MIN_STRONG_SCORE) {
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