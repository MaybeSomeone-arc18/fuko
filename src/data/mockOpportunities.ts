import { Opportunity } from "../types";

export const mockOpportunities = ([
  {
    id: "1",
    title: "Software Engineering Intern",
    organization: "TechNova Solutions",
    type: "Internship",
    description: "Join our core platform team to build scalable microservices.",
    deadline: "2024-05-01",
    location: "San Francisco, CA (Hybrid)",
    skills: ["TypeScript", "Node.js", "React"],
    interests: ["Backend Development", "Cloud Computing"],
    sourceUrl: "https://example.com/job/1",
    applicationUrl: "https://example.com/apply/1"
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
    sourceUrl: "https://example.com/job/2",
    applicationUrl: "https://example.com/apply/2"
  },
  {
    id: "3",
    title: "Open Source Contributor Program",
    organization: "Mozilla Foundation",
    type: "Open Source",
    description: "Contribute to core browser features and privacy tools.",
    deadline: "2024-04-30",
    location: "Remote",
    skills: ["C++", "Rust", "JavaScript"],
    interests: ["Open Source", "Privacy"],
    sourceUrl: "https://example.com/job/3",
    applicationUrl: "https://example.com/apply/3"
  },
  {
    id: "4",
    title: "UX Design Co-op",
    organization: "CreativeLabs",
    type: "Co-op",
    description: "Design intuitive interfaces for next-generation mobile applications.",
    deadline: "2024-07-01",
    location: "New York, NY",
    skills: ["Figma", "User Research", "Prototyping"],
    interests: ["UX/UI Design", "Mobile Apps"],
    sourceUrl: "https://example.com/job/4",
    applicationUrl: "https://example.com/apply/4"
  },
  {
    id: "5",
    title: "Frontend Developer Role",
    organization: "StartupX",
    type: "Full-time",
    description: "Lead the development of our customer-facing web application.",
    deadline: "2024-05-20",
    location: "Austin, TX (On-site)",
    skills: ["React", "Next.js", "Tailwind CSS"],
    interests: ["Web Development", "Startups"],
    sourceUrl: "https://example.com/job/5",
    applicationUrl: "https://example.com/apply/5"
  },
  {
    id: "6",
    title: "Cybersecurity Analyst Intern",
    organization: "SecureNet",
    type: "Internship",
    description: "Assist in monitoring and analyzing network security threats.",
    deadline: "2024-06-01",
    location: "Washington, D.C.",
    skills: ["Network Security", "Python", "Linux"],
    interests: ["Cybersecurity", "Information Security"],
    sourceUrl: "https://example.com/job/6",
    applicationUrl: "https://example.com/apply/6"
  },
  {
    id: "7",
    title: "Cloud Infrastructure Engineering",
    organization: "CloudScale",
    type: "Part-time",
    description: "Help automate and manage our AWS infrastructure.",
    deadline: "2024-08-15",
    location: "Remote",
    skills: ["AWS", "Terraform", "Docker"],
    interests: ["DevOps", "Cloud Architecture"],
    sourceUrl: "https://example.com/job/7",
    applicationUrl: "https://example.com/apply/7"
  },
  {
    id: "8",
    title: "AI Research Assistant",
    organization: "Global AI Institute",
    type: "Research",
    description: "Work with leading researchers on natural language processing models.",
    deadline: "2024-05-10",
    location: "Boston, MA",
    skills: ["PyTorch", "NLP", "Python"],
    interests: ["Artificial Intelligence", "Research"],
    sourceUrl: "https://example.com/job/8",
    applicationUrl: "https://example.com/apply/8"
  }
]) as unknown as Opportunity[];
