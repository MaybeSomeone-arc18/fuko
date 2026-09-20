import { Opportunity } from "../../types";

interface GitHubIssue {
  id: number;
  html_url: string;
  repository_url: string;
  state: string;
  title: string;
  body: string | null;
  created_at: string;
  labels: { name: string }[];
}


export async function fetchGithubOpportunities(): Promise<Opportunity[]> {
  try {
    const headers: Record<string, string> = {
      "Accept": "application/vnd.github.v3+json",
      "User-Agent": "Fuko-App"
    };

    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
    }

    let apiRequests = 0;
    let apiErrors = 0;

    const fetchIssues = async (label: string) => {
      const query = encodeURIComponent(`is:issue is:open archived:false label:"${label}"`);
      const url = `https://api.github.com/search/issues?q=${query}&sort=updated&order=desc&per_page=100`;
      apiRequests++;
      const res = await fetch(url, { headers, cache: 'no-store' });
      if (!res.ok) {
        apiErrors++;
        console.error(`GitHub API error for ${label}: ${res.status} ${res.statusText}`);
        return [];
      }
      const data = await res.json();
      return data.items || [];
    };

    const [goodFirst, helpWanted] = await Promise.all([
      fetchIssues("good first issue"),
      fetchIssues("help wanted")
    ]);

    const allIssues = [...goodFirst, ...helpWanted];

    const uniqueIssues = new Map<string, GitHubIssue>();
    let duplicates = 0;
    for (const issue of allIssues) {
      if (!uniqueIssues.has(issue.html_url)) {
        uniqueIssues.set(issue.html_url, issue as GitHubIssue);
      } else {
        duplicates++;
      }
    }

    let rejected = 0;
    const validIssues = Array.from(uniqueIssues.values()).filter(issue => {
      if (issue.state !== "open") {
        rejected++;
        return false;
      }
      if (!issue.html_url || typeof issue.html_url !== "string" || !issue.html_url.includes("/issues/")) {
        rejected++;
        return false;
      }
      
      const labels = (issue.labels as { name: string }[]).map(l => l.name.toLowerCase());
      if (!labels.includes("good first issue") && !labels.includes("help wanted")) {
        rejected++;
        return false;
      }
      return true;
    });

    const opportunities: Opportunity[] = [];

    for (const issue of validIssues) {
      const repoUrl = issue.repository_url;
      const repoParts = repoUrl.split('/');
      repoParts.pop();
      const owner = repoParts.pop();
      
      const issueLabels = issue.labels.map(l => l.name);
      
      const skillsAndInterests = new Set<string>();
      issueLabels.forEach((l: string) => {
        const lower = l.toLowerCase();
        if (!lower.includes("good first") && !lower.includes("help wanted")) {
          skillsAndInterests.add(l);
        }
      });

      opportunities.push({
        id: `gh-${issue.id}`,
        sourceId: issue.id.toString(),
        title: issue.title,
        organization: owner || "Unknown",
        type: "open_source",
        description: issue.body || issue.title || "",
        deadline: null, 
        location: "Remote",
        eligibility: "",
        skills: Array.from(skillsAndInterests),
        interests: ["Open Source"],
        sourceUrl: issue.html_url,
        applicationUrl: issue.html_url,
        sourceType: "github",
        firstSeen: issue.created_at || new Date().toISOString(),
        lastVerified: new Date().toISOString(),
        sourcePublishedAt: issue.created_at || undefined,
        verificationStatus: "verified",
        status: "active"
      });
    }

    if (process.argv[1] && process.argv[1].includes('sources/index.ts')) {
      const goodFirstCount = opportunities.filter(o => o.skills.some(s => s.toLowerCase() === "good first issue") || validIssues.find(i => i.html_url === o.sourceUrl)?.labels?.some((l) => l.name.toLowerCase() === "good first issue")).length;
      const helpWantedCount = opportunities.filter(o => o.skills.some(s => s.toLowerCase() === "help wanted") || validIssues.find(i => i.html_url === o.sourceUrl)?.labels?.some((l) => l.name.toLowerCase() === "help wanted")).length;
      
      console.log("\nGitHub Metrics:");
      console.log(`- GitHub count: ${opportunities.length}`);
      console.log(`- GitHub good-first-issue count: ${goodFirstCount}`);
      console.log(`- GitHub help-wanted count: ${helpWantedCount}`);
      console.log(`- duplicates: ${duplicates}`);
      console.log(`- rejected: ${rejected}`);
      console.log(`- API requests made: ${apiRequests}`);
      console.log(`- API errors: ${apiErrors}`);
      console.log(`\nSample 5 GitHub records:`);
      opportunities.slice(0, 5).forEach((opp, i) => {
        console.log(`  ${i + 1}. ${opp.title} (${opp.organization})`);
      });
    }

    return opportunities;
  } catch (error) {
    console.error("Error fetching GitHub opportunities:", error);
    return [];
  }
}
