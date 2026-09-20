export interface UserProfile {
  education: string;
  studyYear: string;
  location: string;
  skills: string[];
  interests: string[];
  opportunityTypes: string[];
}

export interface Opportunity {
  id: string;
  sourceType: "github" | "brabble";
  sourceId: string;
  title: string;
  organization: string;
  type: string; // e.g., 'internship', 'open_source', 'hackathon'
  description: string;
  deadline: string | null;
  location: string;
  eligibility: string;
  skills: string[];
  interests: string[];
  sourceUrl: string;
  applicationUrl?: string;
  firstSeen: string;
  lastVerified: string;
  sourcePublishedAt?: string;
  verificationStatus?: "verified" | "unverified";
  status: "active" | "upcoming" | "closed" | "recurring";
}
