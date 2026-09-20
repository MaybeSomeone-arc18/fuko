import { getOpportunities, saveOpportunities } from '../src/lib/db/opportunities.js';

function safeDepluralize(s: string): string {
  const exceptions = new Set(["css", "aws", "ios", "k8s", "js", "ts", "saas", "paas", "iaas"]);
  if (exceptions.has(s)) return s;
  if (s.endsWith("ss")) return s;
  if (s.endsWith("ies")) return s.slice(0, -3) + "y";
  if (s.endsWith("s") && s.length > 3) return s.slice(0, -1);
  return s;
}

function normalizeTag(str: string): string {
  if (!str) return "";
  return safeDepluralize(str.toLowerCase().replace(/[^a-z0-9]+/g, ''));
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function run() {
  if (!process.env.GITHUB_TOKEN) {
    console.error("FATAL: GITHUB_TOKEN is not set. Ensure .env.local is loaded.");
    process.exit(1);
  }

  const opps = await getOpportunities();
  let enrichedCount = 0;
  let skippedCount = 0;
  
  const headers: Record<string, string> = {
    "Accept": "application/vnd.github.v3+json",
    "User-Agent": "Fuko-Enricher",
    "Authorization": `token ${process.env.GITHUB_TOKEN}`
  };
  
  for (const opp of opps) {
    if (opp.sourceType === 'github') {
      // Resumable check
      if (opp.skills && opp.skills.length > 0 && !opp.skills.includes('bug') && !opp.skills.includes('enhancement') && !opp.skills.includes('goodfirstissue')) {
        skippedCount++;
        continue;
      }
      // If we only have labels but no real skills, or empty, let's enrich.

      try {
        const repoUrl = opp.sourceUrl; 
        const parts = repoUrl.split('/');
        const issuesIndex = parts.indexOf('issues');
        if (issuesIndex > 1) {
          const owner = parts[issuesIndex - 2];
          const repo = parts[issuesIndex - 1];
          
          const langRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, { headers });
          if (langRes.status === 403 || langRes.status === 429) {
            console.log(`Rate limit hit on ${owner}/${repo}. Backing off...`);
            await sleep(5000);
            continue; // Skip this one for now, do not wipe it
          }

          let newSkills: string[] = [];
          if (langRes.ok) {
            const langs = await langRes.json();
            newSkills = Object.keys(langs).map(l => l.toLowerCase());
          }
          
          const topicsRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/topics`, { headers });
          let newInterests: string[] = [];
          if (topicsRes.ok) {
            const topicsData = await topicsRes.json();
            newInterests = topicsData.names || [];
          }

          // Only write if we got a successful response
          if (langRes.ok && topicsRes.ok) {
            const combinedSkills = Array.from(new Set(newSkills.map(normalizeTag).filter(Boolean)));
            const combinedInterests = Array.from(new Set(newInterests.map(normalizeTag).filter(Boolean)));
            
            if (combinedSkills.length > 0 || combinedInterests.length > 0) {
              opp.skills = combinedSkills;
              opp.interests = combinedInterests;
              enrichedCount++;
              console.log(`Enriched ${owner}/${repo}: Skills [${opp.skills.join(', ')}] | Interests [${opp.interests.join(', ')}]`);
            }
          }
          
          await sleep(200); // Polite rate handling
        }
      } catch (err) {
        console.error(`Error enriching ${opp.id}:`, err);
      }
    } else {
      // Hackathon/other
      // populate interests from any existing theme/track/tag fields (we'll just ensure it keeps what it has or use type)
      // leaving skills empty if genuinely no tech signal.
      if (!opp.skills || opp.skills.length === 0) {
         opp.skills = [];
      }
    }
  }
  
  await saveOpportunities(opps);
  
  const finalSkillsCount = opps.filter(o => o.skills && o.skills.length > 0).length;
  const finalInterestsCount = opps.filter(o => o.interests && o.interests.length > 0).length;
  const finalNeitherCount = opps.filter(o => (!o.skills || o.skills.length === 0) && (!o.interests || o.interests.length === 0)).length;

  console.log(`Successfully enriched ${enrichedCount} new GitHub opportunities. Skipped ${skippedCount} already enriched.`);
  console.log(`Final Coverage (Total: ${opps.length}):`);
  console.log(`- Has Skills: ${finalSkillsCount}`);
  console.log(`- Has Interests: ${finalInterestsCount}`);
  console.log(`- Has Neither: ${finalNeitherCount}`);
}

run();
