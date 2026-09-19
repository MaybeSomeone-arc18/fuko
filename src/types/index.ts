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
  title: string;
  organization: string;
  type: string; // e.g., 'internship', 'open_source', 'hackathon'
  description: string;
  deadline: string | null;
  location: string;
  skills: string[];
  interests: string[];
  sourceUrl: string;
  applicationUrl?: string;
  sourceType?: "github" | "curated" | "other";
  verifiedAt?: string;
  lastVerified?: string;
  verificationStatus?: "verified" | "unverified";
  status?: "active" | "upcoming" | "closed" | "recurring";
}
