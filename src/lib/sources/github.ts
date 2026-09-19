import { Opportunity } from "../../types";

export async function fetchGithubOpportunities(): Promise<Opportunity[]> {
  try {
    const query = encodeURIComponent('is:issue is:open label:"good first issue"');
    const url = `https://api.github.com/search/issues?q=${query}&sort=updated&order=desc&per_page=15`;
    
    const headers: Record<string, string> = {
      "Accept": "application/vnd.github.v3+json",
      "User-Agent": "Fuko-App"
    };

    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
    }

    // Setting cache to no-store so it always fetches latest for now
    const res = await fetch(url, { headers, cache: 'no-store' });
    if (!res.ok) {
      console.error(`GitHub API error: ${res.status} ${res.statusText}`);
      return [];
    }

    const data = await res.json();
    
    return data.items.map((issue: { repository_url: string; labels: { name: string }[]; id: number; title: string; body: string; html_url: string }): Opportunity => {
      // Extract owner from repository_url: "https://api.github.com/repos/owner/repo"
      const repoParts = issue.repository_url.split('/');
      repoParts.pop(); // remove repo name
      const owner = repoParts.pop();
      
      const labels = issue.labels.map((l: { name: string }) => l.name);
      
      return {
        id: `gh-${issue.id}`,
        title: issue.title,
        organization: owner || "Unknown",
        type: "open_source",
        description: issue.body || issue.title,
        deadline: null, 
        location: "Remote",
        skills: labels.filter((l: string) => !l.toLowerCase().includes("good first") && !l.toLowerCase().includes("help wanted")),
        interests: ["Open Source"],
        sourceUrl: issue.html_url,
        applicationUrl: issue.html_url,
        sourceType: "github",
        lastVerified: new Date().toISOString(),
        verificationStatus: "verified",
        status: "active"
      };
    });
  } catch (error) {
    console.error("Error fetching GitHub opportunities:", error);
    return [];
  }
}
