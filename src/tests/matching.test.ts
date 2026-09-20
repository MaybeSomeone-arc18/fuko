import { matchOpportunities } from "../lib/matching";
import { mockOpportunities } from "../data/mockOpportunities";
import { UserProfile } from "../types";

// Test Profile A: Physics student in Mumbai
const profileA: UserProfile = {
  education: "Physics",
  studyYear: "1",
  location: "Mumbai",
  skills: ["Blender"],
  interests: ["Astronomy"],
  opportunityTypes: ["Research"]
};

// Test Profile B: BTech CSE student in Bangalore
const profileB: UserProfile = {
  education: "BTech CSE",
  studyYear: "3",
  location: "Bangalore",
  skills: ["Python", "React"],
  interests: ["AI", "Open Source"],
  opportunityTypes: ["Hackathon", "Open Source"]
};

console.log("Testing Profile A:");
const matchedA = matchOpportunities(profileA, mockOpportunities);
console.log(`Found ${matchedA.length} matching opportunities`);
matchedA.forEach((opp, index) => {
  console.log(`${index + 1}. ${opp.title} (Score: ${opp.score})`);
  console.log(`   Reasons: ${opp.reasons.join(", ")}`);
});

console.log("\nTesting Profile B:");
const matchedB = matchOpportunities(profileB, mockOpportunities);
console.log(`Found ${matchedB.length} matching opportunities`);
matchedB.forEach((opp, index) => {
  console.log(`${index + 1}. ${opp.title} (Score: ${opp.score})`);
  console.log(`   Reasons: ${opp.reasons.join(", ")}`);
});

// Verify that the two profiles produce different results
const titlesA = matchedA.map(o => o.title);
const titlesB = matchedB.map(o => o.title);
const common = titlesA.filter(title => titlesB.includes(title));

console.log(`\nCommon opportunities between profiles: ${common.length}`);
if (common.length > 0) {
  console.log("Common opportunities:", common);
} else {
  console.log("No common opportunities - profiles produce distinctly different results");
}