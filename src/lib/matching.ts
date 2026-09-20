import { Opportunity, UserProfile } from "../types";

export interface MatchedOpportunity extends Opportunity {
  score: number;
  reasons: string[];
}

function safeDepluralize(s: string): string {
  const exceptions = new Set(["css", "aws", "ios", "k8s", "js", "ts", "saas", "paas", "iaas"]);
  if (exceptions.has(s)) return s;
  if (s.endsWith("ss")) return s;
  if (s.endsWith("ies")) return s.slice(0, -3) + "y";
  if (s.endsWith("s") && s.length > 3) return s.slice(0, -1);
  return s;
}

function getTokens(str: string): string[] {
  if (!str) return [];
  return str.toLowerCase().split(/[^a-z0-9]+/g).filter(Boolean).map(safeDepluralize);
}

function checkMatch(a: string, b: string): boolean {
  if (!a || !b) return false;
  
  const normA = safeDepluralize(a.toLowerCase().replace(/[^a-z0-9]+/g, ''));
  const normB = safeDepluralize(b.toLowerCase().replace(/[^a-z0-9]+/g, ''));
  
  if (normA === normB) return true;
  
  const tokensA = getTokens(a);
  const tokensB = getTokens(b);
  
  return tokensA.includes(normB) || tokensB.includes(normA);
}

function normalizeLocationTokens(loc: string): string[] {
  let s = loc.toLowerCase().replace(/[^a-z0-9\s,]+/g, '');
  // common aliases
  s = s.replace(/\bbangalore\b/g, 'bengaluru');
  s = s.replace(/\bbombay\b/g, 'mumbai');
  s = s.replace(/\bcalcutta\b/g, 'kolkata');
  s = s.replace(/\bmadras\b/g, 'chennai');
  s = s.replace(/\bnew delhi\b/g, 'delhi');
  return s.split(/[\s,]+/).filter(Boolean);
}

function checkLocationMatch(oppLoc: string, profileLoc: string): boolean {
  if (!oppLoc || !profileLoc) return false;
  const oppTokens = normalizeLocationTokens(oppLoc);
  const profTokens = normalizeLocationTokens(profileLoc);
  return profTokens.some(t => oppTokens.includes(t));
}

export function matchOpportunities(
  profile: UserProfile,
  opportunities: Opportunity[],
  mode: "contribute" | "near_you" = "contribute"
): MatchedOpportunity[] {

  return opportunities
    .map((opp) => {
      // Stream Classification
      const isContribute = opp.sourceType === 'github' || opp.type.toLowerCase() === 'open_source' || opp.title.toLowerCase().includes('hacktoberfest');
      
      if (mode === "contribute" && !isContribute) return null;
      if (mode === "near_you" && isContribute) return null;

      let strongScore = 0;
      let weakScore = 0;
      const matchedTech: Set<string> = new Set();
      const matchedTheme: Set<string> = new Set();
      let matchedLoc = "";

      // 1. Opportunity type match - purely for scoring, never a reason
      const matchesType = profile.opportunityTypes.some((t) =>
        checkMatch(opp.type, t)
      );
      if (matchesType) {
        weakScore += 5; // Reduced weight compared to actual skills/location
      }

      // 2. Skills match
      const matchedSkills = opp.skills.filter((skill) =>
        profile.skills.some((ps) => checkMatch(skill, ps))
      );

      // 3. Interests match
      const matchedInterests = opp.interests.filter((interest) =>
        profile.interests.some((pi) => checkMatch(interest, pi))
      );

      // 4. Location match (checking both location field and description to bypass brabble bug)
      const fullLoc = opp.location + " " + (opp.description || "");
      const isRemote = fullLoc.toLowerCase().includes("remote") || fullLoc.toLowerCase().includes("online");
      const matchesLocation = profile.location ? checkLocationMatch(fullLoc, profile.location) : false;

      // 5. Student eligibility
      const isStudentRole = opp.eligibility && opp.eligibility.toLowerCase().includes("student");

      let hasRelevanceGatePassed = false;
      const reasons: string[] = [];

      if (mode === "contribute") {
        if (matchedSkills.length > 0) {
          strongScore += 30;
          matchedSkills.forEach(s => matchedTech.add(s));
          hasRelevanceGatePassed = true;
        }
        if (matchedInterests.length > 0) {
          strongScore += 20;
          matchedInterests.forEach(i => matchedTech.add(i));
          hasRelevanceGatePassed = true;
        }
        if (isStudentRole && profile.studyYear) {
          weakScore += 10;
          matchedTech.add("Student");
          hasRelevanceGatePassed = true; // student is also a valid profile-specific tech/identity signal
        }
        
        if (hasRelevanceGatePassed && matchedTech.size > 0) {
          reasons.push(`Matched on ${Array.from(matchedTech).join(" · ")}`);
        }
      } else if (mode === "near_you") {
        if (matchesLocation && !isRemote) {
          strongScore += 30;
          matchedLoc = `Near ${profile.location}`;
          hasRelevanceGatePassed = true;
        } else if (isRemote) {
          strongScore += 10;
          matchedLoc = "Remote";
          // We don't automatically pass relevance gate just for being remote, unless it matches interest.
        }

        if (matchedInterests.length > 0) {
          strongScore += 20;
          matchedInterests.forEach(i => matchedTheme.add(i));
          hasRelevanceGatePassed = true;
        }
        
        if (matchedSkills.length > 0) {
          weakScore += 10;
          matchedSkills.forEach(s => matchedTheme.add(s));
          hasRelevanceGatePassed = true;
        }
        
        if (isStudentRole && profile.studyYear) {
          weakScore += 10;
          matchedTheme.add("Student");
          hasRelevanceGatePassed = true;
        }

        if (hasRelevanceGatePassed) {
          const combined = [];
          if (matchedLoc) combined.push(matchedLoc);
          if (matchedTheme.size > 0) combined.push(Array.from(matchedTheme).join(" · "));
          if (combined.length > 0) {
            reasons.push(combined.join(" · "));
          }
        }
      }

      if (hasRelevanceGatePassed) {
        return {
          ...opp,
          score: strongScore + weakScore,
          reasons,
        };
      }
      return null;
    })
    .filter((opp): opp is MatchedOpportunity => opp !== null)
    .sort((a, b) => b.score - a.score);
}
