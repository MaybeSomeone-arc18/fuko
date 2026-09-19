import { Opportunity } from "../types";

export const curatedOpportunities: Opportunity[] = [
  {
    id: "curated-1",
    title: "MLH Fellowship",
    organization: "Major League Hacking",
    type: "Fellowship",
    description: "A remote internship alternative for aspiring software engineers where you contribute to open source projects.",
    deadline: "Rolling",
    location: "Remote",
    skills: ["React", "Python", "Node.js", "Open Source"],
    interests: ["Software Engineering", "Open Source", "Fellowship"],
    sourceUrl: "https://fellowship.mlh.io/",
    applicationUrl: "https://fellowship.mlh.io/apply",
    sourceType: "curated",
    verifiedAt: new Date().toISOString(),
    verificationStatus: "verified"
  },
  {
    id: "curated-2",
    title: "Google Summer of Code",
    organization: "Google",
    type: "Internship / Open Source",
    description: "A global, online program focused on bringing new contributors into open source software development.",
    deadline: "2024-04-02", 
    location: "Remote",
    skills: ["C++", "Python", "Java", "JavaScript"],
    interests: ["Open Source", "Software Engineering"],
    sourceUrl: "https://summerofcode.withgoogle.com/",
    applicationUrl: "https://summerofcode.withgoogle.com/",
    sourceType: "curated",
    verifiedAt: new Date().toISOString(),
    verificationStatus: "verified"
  },
  {
    id: "curated-3",
    title: "Outreachy Internship",
    organization: "Outreachy",
    type: "Internship",
    description: "Outreachy provides internships in open source and open science subject to underrepresented groups.",
    deadline: "2024-08-31",
    location: "Remote",
    skills: ["Documentation", "Design", "Python", "JavaScript"],
    interests: ["Open Source", "Diversity in Tech"],
    sourceUrl: "https://www.outreachy.org/",
    applicationUrl: "https://www.outreachy.org/apply/",
    sourceType: "curated",
    verifiedAt: new Date().toISOString(),
    verificationStatus: "verified"
  },
  {
    id: "curated-4",
    title: "LFX Mentorship",
    organization: "Linux Foundation",
    type: "Mentorship",
    description: "The LFX Mentorship program trains the next generation of open source developers by matching them with experienced mentors.",
    deadline: "Rolling",
    location: "Remote",
    skills: ["Linux", "Go", "Kubernetes", "C"],
    interests: ["Open Source", "Infrastructure", "Mentorship"],
    sourceUrl: "https://lfx.linuxfoundation.org/mentorship/",
    applicationUrl: "https://mentorship.lfx.linuxfoundation.org/",
    sourceType: "curated",
    verifiedAt: new Date().toISOString(),
    verificationStatus: "verified"
  }
];
