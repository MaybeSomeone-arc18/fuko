import { matchOpportunities } from "./matching";
import { UserProfile, Opportunity } from "../types";

const mockOpportunities: Opportunity[] = [
  {
    id: "1",
    title: "Software Engineering Intern",
    organization: "TechNova Solutions",
    type: "Internship",
    description: "Join our core platform team to build scalable microservices.",
    deadline: "2024-05-01",
    location: "San Francisco, CA",
    skills: ["TypeScript", "Node.js", "React"],
    interests: ["Backend Development", "Cloud Computing"],
    sourceUrl: "",
    applicationUrl: ""
  },
  {
    id: "2",
    title: "Data Science Fellowship",
    organization: "Data for Good",
    type: "Fellowship",
    description: "Apply machine learning to tackle climate change datasets.",
    deadline: "2024-06-15",
    location: "Remote",
    skills: ["Python", "Pandas", "Scikit-Learn"],
    interests: ["Machine Learning", "Social Impact"],
    sourceUrl: "",
    applicationUrl: ""
  }
];

function runTests() {
  const profile: UserProfile = {
    education: "University",
    studyYear: "Junior",
    location: "San Francisco, CA",
    skills: ["TypeScript", "React"],
    interests: ["Backend Development"],
    opportunityTypes: ["Internship"]
  };

  const results = matchOpportunities(profile, mockOpportunities);
  
  if (results.length !== 2) {
    throw new Error("Expected 2 results");
  }

  // The first one should score higher for this profile
  if (results[0].id !== "1") {
    throw new Error("Expected opportunity 1 to rank higher");
  }

  const bestMatch = results[0];
  console.log("Best match score:", bestMatch.score);
  console.log("Reasons:", bestMatch.reasons);
  
  // Verify scores logic
  // Type (+25)
  // Skills (+25)
  // Interests (+20)
  // Location (+15)
  // Student (+10)
  // Deadline (+5)
  // Total = 100 for ID 1
  if (bestMatch.score !== 100) {
    throw new Error(`Expected score 100, got ${bestMatch.score}`);
  }

  const badMatch = results[1];
  // Remote location (+15)
  // Student (+10) (because it's a Fellowship)
  // Deadline (+5)
  // Total = 30 for ID 2
  if (badMatch.score !== 30) {
    throw new Error(`Expected score 30, got ${badMatch.score}`);
  }

  console.log("All matching tests passed!");
}

runTests();
