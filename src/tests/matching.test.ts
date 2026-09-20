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
    interests: ["Empty"],
    location: "Unknown", // avoid location match
    eligibility: "Professional" // avoid student match
  },
  {
    ...baseOpp,
    id: "opp-skill-only",
    title: "Skill Match Only",
    type: "Internship",
    skills: ["Python"],
    interests: ["Empty"],
    location: "Unknown",
    eligibility: "Professional"
  },
  {
    ...baseOpp,
    id: "opp-interest-only",
    title: "Interest Match Only",
    type: "Internship",
    skills: ["Empty"],
    interests: ["AI"],
    location: "Unknown",
    eligibility: "Professional"
  },
  {
    ...baseOpp,
    id: "opp-type-skill",
    title: "Type and Skill Match",
    type: "Hackathon",
    skills: ["Python"],
    interests: ["Empty"],
    location: "Unknown",
    eligibility: "Professional"
  },
  {
    ...baseOpp,
    id: "opp-type-interest",
    title: "Type and Interest Match",
    type: "Hackathon",
    skills: ["Empty"],
    interests: ["AI"],
    location: "Unknown",
    eligibility: "Professional"
  },
  {
    ...baseOpp,
    id: "opp-location-only",
    title: "Location Match Only",
    type: "Internship",
    skills: ["Empty"],
    interests: ["Empty"],
    location: "New York", // matches profile location exactly
    eligibility: "Professional"
  },
  {
    ...baseOpp,
    id: "opp-eligibility-only",
    title: "Eligibility Match Only",
    type: "Internship",
    skills: ["Empty"],
    interests: ["Empty"],
    location: "Unknown",
    eligibility: "Student", // matches profile studyYear
    description: "student role"
  },
  {
    ...baseOpp,
    id: "opp-unrelated",
    title: "Unrelated Opportunity",
    type: "Research",
    skills: ["Ruby"],
    interests: ["Finance"],
    location: "Unknown",
    eligibility: "Professional"
  },
  {
    ...baseOpp,
    id: "opp-norm-hackathon",
    title: "Normalization Hackathon",
    type: "Hackathons",
    skills: ["Python"], // need something to pass the gate since type-only fails
    interests: ["Empty"],
    location: "Unknown",
    eligibility: "Professional"
  },
  {
    ...baseOpp,
    id: "opp-norm-opensource",
    title: "Normalization Open Source",
    type: "Internship",
    skills: ["Empty"],
    interests: ["Open Source"],
    location: "Unknown",
    eligibility: "Professional"
  },
  {
    ...baseOpp,
    id: "opp-norm-python",
    title: "Normalization Python",
    type: "Internship",
    skills: ["python"],
    interests: ["Empty"],
    location: "Unknown",
    eligibility: "Professional"
  }
];

const profile: UserProfile = {
  education: "CS",
  studyYear: "3", // Triggers student eligibility match
  location: "New York",
  skills: ["Python"],
  interests: ["AI", "opensource"],
  opportunityTypes: ["Hackathon"]
};

console.log("=== Matching Algorithm Tests ===");
console.log("Profile Preferences:", {
  types: profile.opportunityTypes,
  skills: profile.skills,
  interests: profile.interests,
  location: profile.location,
  studyYear: profile.studyYear
});

const matched = matchOpportunities(profile, testOpportunities);

console.log("\nResults (Sorted by Score):");
matched.forEach((opp, index) => {
  console.log(`${index + 1}. ${opp.title} (Score: ${opp.score})`);
  console.log(`   Reasons: ${opp.reasons.join(", ")}`);
});

// Verification assertions
const getScore = (id: string) => matched.find(o => o.id === id)?.score || 0;
const isIncluded = (id: string) => matched.some(o => o.id === id);

const assert = (condition: boolean, message: string) => {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ PASSED: ${message}`);
  }
};

console.log("\nAssertions:");

// Exclusions
assert(!isIncluded("opp-type-only"), "Type-only = excluded from For You feed");
assert(!isIncluded("opp-unrelated"), "Unrelated = excluded from For You feed");

// Inclusions (Passed the gate)
assert(isIncluded("opp-skill-only"), "Skill-only = included");
assert(isIncluded("opp-interest-only"), "Interest-only = included");
assert(isIncluded("opp-type-skill"), "Type + Skill = included");
assert(isIncluded("opp-type-interest"), "Type + Interest = included");
assert(isIncluded("opp-location-only"), "Explicit location match = included");
assert(isIncluded("opp-eligibility-only"), "Explicit eligibility/education match = included");

// Boosting
assert(
  getScore("opp-type-skill") > getScore("opp-skill-only"),
  "Type preference still boosts ranking after qualification"
);

// Normalization
assert(
  isIncluded("opp-norm-hackathon") && getScore("opp-norm-hackathon") > getScore("opp-skill-only"),
  "Normalization still works: 'Hackathon' boosts 'Hackathons'"
);
assert(isIncluded("opp-norm-opensource"), "Normalization still works: 'opensource' matches 'Open Source'");
assert(isIncluded("opp-norm-python"), "Normalization still works: 'Python' matches 'python'");

console.log("\nAll matching tests passed!");
