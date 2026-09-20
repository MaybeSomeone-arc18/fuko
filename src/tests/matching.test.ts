import { matchOpportunities } from "../lib/matching";
import { UserProfile, Opportunity } from "../types";

// Base opportunity to avoid repetition
const baseOpp = {
  id: "test",
  sourceId: "test",
  organization: "Test Org",
  description: "Test description",
  location: "Remote",
  eligibility: "Student",
  sourceUrl: "https://example.com",
  applicationUrl: "https://example.com",
  sourceType: "github" as const,
  firstSeen: "2026-09-20T00:00:00Z",
  lastVerified: "2026-09-20T00:00:00Z",
  status: "active" as const,
  verificationStatus: "verified" as const,
  deadline: null
};

const testOpportunities: Opportunity[] = [
  {
    ...baseOpp,
    id: "opp-type-only",
    title: "Type Only Match",
    type: "Hackathon",
    skills: ["Empty"],
    interests: ["Empty"]
  },
  {
    ...baseOpp,
    id: "opp-skill-only",
    title: "Skill Match Only",
    type: "Internship",
    skills: ["Python"],
    interests: ["Empty"]
  },
  {
    ...baseOpp,
    id: "opp-interest-only",
    title: "Interest Match Only",
    type: "Internship",
    skills: ["Empty"],
    interests: ["AI"]
  },
  {
    ...baseOpp,
    id: "opp-type-skill",
    title: "Type and Skill Match",
    type: "Hackathon",
    skills: ["Python"],
    interests: ["Empty"]
  },
  {
    ...baseOpp,
    id: "opp-type-interest",
    title: "Type and Interest Match",
    type: "Hackathon",
    skills: ["Empty"],
    interests: ["AI"]
  },
  {
    ...baseOpp,
    id: "opp-unrelated",
    title: "Unrelated Opportunity",
    type: "Research",
    skills: ["Ruby"],
    interests: ["Finance"]
  },
  {
    ...baseOpp,
    id: "opp-norm-hackathon",
    title: "Normalization Hackathon",
    type: "Hackathons",
    skills: ["Empty"],
    interests: ["Empty"]
  },
  {
    ...baseOpp,
    id: "opp-norm-opensource",
    title: "Normalization Open Source",
    type: "Internship",
    skills: ["Empty"],
    interests: ["Open Source"]
  },
  {
    ...baseOpp,
    id: "opp-norm-python",
    title: "Normalization Python",
    type: "Internship",
    skills: ["python"],
    interests: ["Empty"]
  }
];

const profile: UserProfile = {
  education: "CS",
  studyYear: "3",
  location: "Remote",
  skills: ["Python"],
  interests: ["AI", "opensource"],
  opportunityTypes: ["Hackathon"]
};

console.log("=== Matching Algorithm Tests ===");
console.log("Profile Preferences:", {
  types: profile.opportunityTypes,
  skills: profile.skills,
  interests: profile.interests
});

const matched = matchOpportunities(profile, testOpportunities);

console.log("\nResults (Sorted by Score):");
matched.forEach((opp, index) => {
  console.log(`${index + 1}. ${opp.title} (Score: ${opp.score})`);
  console.log(`   Reasons: ${opp.reasons.join(", ")}`);
});

// Verification assertions
const getScore = (id: string) => matched.find(o => o.id === id)?.score || 0;

const assert = (condition: boolean, message: string) => {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ PASSED: ${message}`);
  }
};

console.log("\nAssertions:");

assert(
  matched.length === 8,
  "Should return exactly 8 opportunities (unrelated is filtered out)"
);

assert(
  getScore("opp-type-skill") > getScore("opp-type-only"),
  "Type + Skill should score higher than Type-only"
);

assert(
  getScore("opp-skill-only") > getScore("opp-type-only"),
  "Skill-only match should score higher than Type-only match"
);

assert(
  getScore("opp-interest-only") > getScore("opp-type-only"),
  "Interest-only match should score higher than Type-only match"
);

assert(
  getScore("opp-unrelated") === 0,
  "Unrelated opportunity should not be matched at all"
);

assert(
  getScore("opp-norm-hackathon") > 0,
  "Should match 'Hackathon' profile preference with 'Hackathons' opportunity type"
);

assert(
  getScore("opp-norm-opensource") > 0,
  "Should match 'opensource' profile interest with 'Open Source' opportunity interest"
);

assert(
  getScore("opp-norm-python") > 0,
  "Should match 'Python' profile skill with 'python' opportunity skill"
);

console.log("\nAll matching tests passed!");