"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { mockOpportunities } from "../../data/mockOpportunities";
import { matchOpportunities, MatchedOpportunity } from "../../lib/matching";
import { UserProfile, Opportunity } from "../../types";
import Link from "next/link";

export default function OpportunitiesPage() {
  const router = useRouter();
  const [opportunities, setOpportunities] = useState<MatchedOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("fuko_profile");
    if (!saved) {
      router.push("/profile");
      return;
    }

    const loadData = async () => {
      try {
        const profile: UserProfile = JSON.parse(saved);
        let oppsToMatch: Opportunity[] = mockOpportunities;
        
        try {
          const res = await fetch("/api/sync");
          if (res.ok) {
            const data = await res.json();
            if (data.opportunities && Array.isArray(data.opportunities)) {
              oppsToMatch = data.opportunities;
            }
          } else {
            console.warn("API sync failed, falling back to local data");
            setError("Failed to fetch latest opportunities. Showing local data.");
          }
        } catch (apiError) {
          console.warn("API sync error, falling back to local data", apiError);
          setError("Failed to connect to server. Showing local data.");
        }

        const matched = matchOpportunities(profile, oppsToMatch);
        setOpportunities(matched);
      } catch (e) {
        console.error(e);
        router.push("/profile");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [router]);

  if (loading) {
    return <div className="max-w-4xl mx-auto p-6 font-medium">Loading opportunities...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {error && (
        <div className="mb-4 bg-orange-50 border border-orange-200 text-orange-800 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Opportunities</h1>
        <Link href="/profile" className="text-blue-600 hover:underline font-medium">
          Edit Profile
        </Link>
      </div>

      <div className="grid gap-6">
        {opportunities.map((opp) => (
          <div key={opp.id} className="border rounded-lg p-6 shadow-sm bg-white">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-semibold text-gray-900">{opp.title}</h2>
              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded font-medium">
                {opp.type}
              </span>
            </div>
            
            <p className="text-gray-700 font-medium mb-3">{opp.organization}</p>
            
            <p className="text-gray-600 mb-4">{opp.description}</p>

            {opp.reasons.length > 0 && (
              <div className="mb-4 bg-blue-50 border border-blue-100 p-3 rounded-md">
                <h3 className="text-sm font-semibold text-blue-800 mb-1">Why it&apos;s a match:</h3>
                <ul className="list-disc pl-5 text-sm text-blue-700 space-y-1">
                  {opp.reasons.map((reason, idx) => (
                    <li key={idx}>{reason}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
              <div>
                <strong>Location:</strong> {opp.location}
              </div>
              <div>
                <strong>Deadline:</strong> {opp.deadline}
              </div>
            </div>

            <div className="mb-4 text-sm">
              <div className="mb-1">
                <strong>Skills:</strong> {opp.skills.join(", ")}
              </div>
              <div>
                <strong>Interests:</strong> {opp.interests.join(", ")}
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <a
                href={opp.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                View Source
              </a>
              <a
                href={opp.applicationUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Apply Now
              </a>
            </div>
          </div>
        ))}
        {opportunities.length === 0 && (
          <div className="text-gray-600 text-center py-12">
            No opportunities matched your profile. Try updating your skills or interests!
          </div>
        )}
      </div>
    </div>
  );
}
