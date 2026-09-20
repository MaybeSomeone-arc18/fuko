import { Opportunity, UserProfile } from "../types";

export interface MatchedOpportunity extends Opportunity {
  score: number;
  reasons: string[];
}

export function matchOpportunities(
  profile: UserProfile,
  opportunities: Opportunity[]
): MatchedOpportunity[] {
  const MIN_PROFILE_SCORE = 10; // Minimum points from profile-dependent categories to be shown

  return opportunities
    .map((opp) => {
      let profileScore = 0;
      let nonProfileScore = 0;
      const reasons: string[] = [];

      // 1. Opportunity type match (+25) - profile-dependent
      const matchesType = profile.opportunityTypes.some((t) =>
        opp.type.toLowerCase().includes(t.toLowerCase())
      );
      if (matchesType) {
        profileScore += 25;
        reasons.push(`Matches your preference for ${opp.type} roles`);
      }

      // 2. Skills match (+25) - profile-dependent
      const matchedSkills = opp.skills.filter((skill) =>
        profile.skills.some((ps) => skill.toLowerCase().includes(ps.toLowerCase()) || ps.toLowerCase().includes(skill.toLowerCase()))
      );
      if (matchedSkills.length > 0) {
        profileScore += 25;
        reasons.push(`Matches your ${matchedSkills[0]} skill`);
      }

      // 3. Interests match (+20) - profile-dependent
      const matchedInterests = opp.interests.filter((interest) =>
        profile.interests.some((pi) => interest.toLowerCase().includes(pi.toLowerCase()) || pi.toLowerCase().includes(interest.toLowerCase()))
      );
      if (matchedInterests.length > 0) {
        profileScore += 20;
        reasons.push(`Aligns with your ${matchedInterests[0]} interest`);
      }

      // 4. Location match (+15) - split into profile and non-profile
      const isRemote = opp.location.toLowerCase().includes("remote");
      const matchesLocation = profile.location && opp.location.toLowerCase().includes(profile.location.toLowerCase());
      if (isRemote) {
        // Remote is non-profile-dependent
        nonProfileScore += 15;
        reasons.push("Available remotely");
      } else if (matchesLocation) {
        // Non-remote location match is profile-dependent
        profileScore += 15;
        reasons.push(`Located near ${profile.location}`);
      }

      // 5. Student/education eligibility (+10) - profile-dependent
      const isStudentRole =
        opp.type.toLowerCase().includes("intern") ||
        opp.type.toLowerCase().includes("co-op") ||
        opp.type.toLowerCase().includes("fellow") ||
        opp.description.toLowerCase().includes("student");

      if (isStudentRole && profile.studyYear) {
        profileScore += 10;
        reasons.push("Suitable for students");
      }

      // 6. Deadline exists (+5) - non-profile-dependent
      if (opp.deadline) {
        nonProfileScore += 5;
        // Don't add a reason for deadline as it's not very personalized
      }

      // Only show if we have at least some profile match
      if (profileScore >= MIN_PROFILE_SCORE) {
        const totalScore = profileScore + nonProfileScore;
        return {
          ...opp,
          score: totalScore,
          reasons: reasons.slice(0, 4), // Keep max 4 reasons
        };
      }
      return null; // Will be filtered out
    })
    .filter((opp): opp is MatchedOpportunity => opp !== null)
    .sort((a, b) => b.score - a.score); // Sort by score descending
}