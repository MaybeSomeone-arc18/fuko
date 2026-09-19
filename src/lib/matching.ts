import { Opportunity, UserProfile } from "../types";

export interface MatchedOpportunity extends Opportunity {
  score: number;
  reasons: string[];
}

export function matchOpportunities(
  profile: UserProfile,
  opportunities: Opportunity[]
): MatchedOpportunity[] {
  return opportunities
    .map((opp) => {
      let score = 0;
      const reasons: string[] = [];

      // 1. Opportunity type match (+25)
      const matchesType = profile.opportunityTypes.some((t) =>
        opp.type.toLowerCase().includes(t.toLowerCase())
      );
      if (matchesType) {
        score += 25;
        reasons.push(`Matches your preference for ${opp.type} roles`);
      }

      // 2. Skills match (+25)
      const matchedSkills = opp.skills.filter((skill) =>
        profile.skills.some((ps) => skill.toLowerCase().includes(ps.toLowerCase()) || ps.toLowerCase().includes(skill.toLowerCase()))
      );
      if (matchedSkills.length > 0) {
        score += 25;
        reasons.push(`Matches your ${matchedSkills[0]} skill`);
      }

      // 3. Interests match (+20)
      const matchedInterests = opp.interests.filter((interest) =>
        profile.interests.some((pi) => interest.toLowerCase().includes(pi.toLowerCase()) || pi.toLowerCase().includes(interest.toLowerCase()))
      );
      if (matchedInterests.length > 0) {
        score += 20;
        reasons.push(`Aligns with your ${matchedInterests[0]} interest`);
      }

      // 4. Location match (+15)
      const isRemote = opp.location.toLowerCase().includes("remote");
      const matchesLocation = profile.location && opp.location.toLowerCase().includes(profile.location.toLowerCase());
      if (matchesLocation || isRemote) {
        score += 15;
        if (isRemote) {
          reasons.push("Available remotely");
        } else {
          reasons.push(`Located near ${profile.location}`);
        }
      }

      // 5. Student/education eligibility (+10)
      // Basic heuristic: check if description or type contains words related to students
      const isStudentRole =
        opp.type.toLowerCase().includes("intern") ||
        opp.type.toLowerCase().includes("co-op") ||
        opp.type.toLowerCase().includes("fellow") ||
        opp.description.toLowerCase().includes("student");
      
      if (isStudentRole && profile.studyYear) {
        score += 10;
        reasons.push("Suitable for students");
      }

      // 6. Deadline exists (+5)
      if (opp.deadline) {
        score += 5;
        // Don't add a reason for deadline as it's not very personalized
      }

      return {
        ...opp,
        score,
        reasons: reasons.slice(0, 4), // Keep max 4 reasons
      };
    })
    .sort((a, b) => b.score - a.score);
}
