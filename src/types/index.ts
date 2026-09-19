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
  type: string;
  description: string;
  deadline: string;
  location: string;
  skills: string[];
  interests: string[];
  sourceUrl: string;
  applicationUrl: string;
}
