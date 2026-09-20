import { Opportunity } from "../../types";

export async function fetchBrabbleOpportunities(): Promise<Opportunity[]> {
  try {
    const feeds = [
      "https://brabble.ai/rss/hackathons.xml",
      "https://brabble.ai/rss/case-competitions.xml",
      "https://brabble.ai/rss/coding-contests.xml",
      "https://brabble.ai/rss/school-students.xml",
      "https://brabble.ai/rss/college-students.xml"
    ];

    const allOpportunities = new Map<string, Opportunity>();
    const feedCounts: Record<string, number> = {};
    let latestRefreshedAt = "";

    for (const feedUrl of feeds) {
      try {
        const response = await fetch(feedUrl, { cache: "no-store" });
        if (!response.ok) {
          console.error(`Failed to fetch ${feedUrl}: ${response.status}`);
          continue;
        }
        const xml = await response.text();
        const feedName = feedUrl.split("/").pop() || feedUrl;
        
        // Extract feed's lastBuildDate
        const lastBuildDateMatch = xml.match(/<lastBuildDate>([^<]+)<\/lastBuildDate>/);
        if (lastBuildDateMatch) {
          const dateStr = lastBuildDateMatch[1];
          if (!latestRefreshedAt || new Date(dateStr) > new Date(latestRefreshedAt)) {
            latestRefreshedAt = new Date(dateStr).toISOString();
          }
        }

        const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(m => m[1]);
        
        let count = 0;
        for (const item of items) {
          const titleMatch = item.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>|<title>([^<]+)<\/title>/);
          const title = (titleMatch?.[1] || titleMatch?.[2] || "Unknown").trim();
          
          const linkMatch = item.match(/<link>([^<]+)<\/link>/);
          const link = linkMatch ? linkMatch[1].trim() : "https://brabble.ai";
          
          const guidMatch = item.match(/<guid[^>]*>([^<]+)<\/guid>/);
          const guid = guidMatch ? guidMatch[1].trim() : link;
          
          const descMatch = item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>|<description>([\s\S]*?)<\/description>/);
          const description = (descMatch?.[1] || descMatch?.[2] || "").trim();
          
          const categoryMatch = item.match(/<category>([^<]+)<\/category>/);
          const category = categoryMatch ? categoryMatch[1].trim() : "other";
          
          const pubDateMatch = item.match(/<pubDate>([^<]+)<\/pubDate>/);
          const pubDate = pubDateMatch ? pubDateMatch[1].trim() : null;

          let parsedDeadline: string | null = null;
          const actualDeadlineMatch = description.match(/Registration closes ([^-]+)(?: -|$)/);
          if (actualDeadlineMatch) {
            const date = new Date(actualDeadlineMatch[1].trim());
            if (!isNaN(date.getTime())) {
              parsedDeadline = date.toISOString();
            }
          }

          let organization = "Unknown";
          
          const viaMatch = description.match(/^(.*?)\s*·\s*via\s*(.*?)\s*-/);
          if (viaMatch) {
            organization = viaMatch[1].trim();
            // Platform info (viaMatch[2]) is unused but extracted
          } else {
            const parts = description.split(" - ");
            if (parts.length > 0) {
              organization = parts[0].trim();
            }
          }

          const location = description.includes("In person:") ? "In person" : "Remote";
          let eligibility = "";
          if (feedUrl.includes("school-students")) eligibility = "School Students";
          if (feedUrl.includes("college-students")) eligibility = "College Students";

          const opp: Opportunity = {
            id: `brabble-${guid.replace(/[^a-zA-Z0-9-]/g, '-')}`,
            sourceId: guid,
            title,
            organization,
            type: category.toLowerCase(),
            description,
            deadline: parsedDeadline,
            location,
            eligibility,
            skills: [],
            interests: [],
            sourceUrl: link,
            applicationUrl: link,
            sourceType: "brabble",
            firstSeen: new Date().toISOString(),
            lastVerified: new Date().toISOString(),
            sourcePublishedAt: pubDate ? new Date(pubDate).toISOString() : undefined,
            verificationStatus: "verified",
            status: "active"
          };

          // Deduplicate by source URL
          if (!allOpportunities.has(link)) {
            allOpportunities.set(link, opp);
            count++;
          }
        }
        
        feedCounts[feedName] = count;
      } catch (e) {
        console.error(`Error processing feed ${feedUrl}:`, e);
      }
    }

    if (process.argv[1] && process.argv[1].includes('sources/index.ts')) {
      console.log("\nBrabble RSS Feed Counts (Unique Additions):");
      for (const [feed, count] of Object.entries(feedCounts)) {
        console.log(`- ${feed}: ${count}`);
      }
      if (latestRefreshedAt) {
        console.log(`- Latest feed refreshedAt: ${latestRefreshedAt}`);
      }
    }

    return Array.from(allOpportunities.values());
  } catch (error) {
    console.error("Error fetching Brabble opportunities:", error);
    return [];
  }
}

// Local testing execution
if (process.argv[1] && process.argv[1].includes('brabble.ts')) {
  fetchBrabbleOpportunities().then(opps => {
    console.log(`Total unique records fetched: ${opps.length}`);
    console.log("\nFirst 5 titles:");
    opps.slice(0, 5).forEach((opp, i) => console.log(`  ${i + 1}. ${opp.title}`));
  }).catch(console.error);
}

