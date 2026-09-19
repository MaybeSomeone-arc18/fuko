"use client";

import { useEffect, useState, use } from "react";
import { Opportunity } from "../../../types";
import Link from "next/link";

function formatGoogleCalendarUrl(opp: Opportunity) {
  // Try to parse deadline if available, otherwise just use current date + 1 day as placeholder
  let start = new Date();
  start.setDate(start.getDate() + 1);
  let end = new Date(start);
  end.setHours(end.getHours() + 1);

  if (opp.deadline && opp.deadline !== "Rolling" && !isNaN(Date.parse(opp.deadline))) {
    start = new Date(opp.deadline);
    end = new Date(start);
    end.setHours(end.getHours() + 1);
  }

  const formatIso = (date: Date) => date.toISOString().replace(/-|:|\.\d\d\d/g, "");
  const dates = `${formatIso(start)}/${formatIso(end)}`;

  const url = new URL("https://calendar.google.com/calendar/render");
  url.searchParams.append("action", "TEMPLATE");
  url.searchParams.append("text", `Apply to ${opp.title} at ${opp.organization}`);
  url.searchParams.append("dates", dates);
  url.searchParams.append("details", `Opportunity link: ${opp.sourceUrl}\n\n${opp.description}`);
  url.searchParams.append("location", opp.location);

  return url.toString();
}

function generateIcsFile(opp: Opportunity) {
  let start = new Date();
  start.setDate(start.getDate() + 1);
  
  if (opp.deadline && opp.deadline !== "Rolling" && !isNaN(Date.parse(opp.deadline))) {
    start = new Date(opp.deadline);
  }
  
  const formatIso = (date: Date) => date.toISOString().replace(/-|:|\.\d\d\d/g, "");
  const startDateStr = formatIso(start);
  
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `DTSTART:${startDateStr}`,
    `DTEND:${startDateStr}`,
    `SUMMARY:Apply to ${opp.title} at ${opp.organization}`,
    `DESCRIPTION:Opportunity link: ${opp.sourceUrl}`,
    `LOCATION:${opp.location}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `opportunity-${opp.id}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function OpportunityDetail({ params }: { params: Promise<{ id: string }> }) {
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = use(params);

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        const res = await fetch(`/api/opportunities/${encodeURIComponent(id)}`);
        if (res.ok) {
          const data = await res.json();
          setOpportunity(data.opportunity);
        } else if (res.status === 404) {
          setError("not-found");
        } else {
          setError("failed");
        }
      } catch (e) {
        console.error(e);
        setError("failed");
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunity();
  }, [id]);

  if (loading) {
    return <div className="max-w-4xl mx-auto p-6 font-medium">Loading opportunity details...</div>;
  }

  if (error === "not-found" || !opportunity) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center py-20">
        <h1 className="text-3xl font-bold mb-4">Opportunity Not Found</h1>
        <p className="text-gray-600 mb-8">We couldn&apos;t find the opportunity you&apos;re looking for.</p>
        <Link href="/opportunities" className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition-colors">
          Back to Opportunities
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <Link href="/opportunities" className="text-gray-500 hover:text-gray-900 font-medium flex items-center">
          ← Back to opportunities
        </Link>
      </div>

      <div className="bg-white border rounded-lg shadow-sm p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{opportunity.title}</h1>
            <p className="text-xl text-gray-700 font-medium">{opportunity.organization}</p>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-auto">
            {opportunity.applicationUrl && (
              <a
                href={opportunity.applicationUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-black text-white text-center px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
              >
                Apply Now
              </a>
            )}
            <a
              href={opportunity.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="border border-gray-300 text-gray-700 text-center px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
            >
              View original opportunity
            </a>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {opportunity.type}
          </span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            {opportunity.location}
          </span>
          {opportunity.verificationStatus === "verified" && (
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              ✓ Verified
            </span>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold mb-3 border-b pb-2">Description</h3>
            <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {opportunity.description}
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Deadline</h3>
                <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${opportunity.status === 'active' ? 'bg-green-100 text-green-800' : opportunity.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : opportunity.status === 'closed' ? 'bg-red-100 text-red-800' : 'bg-purple-100 text-purple-800'}`}>
                  {opportunity.status === 'active' ? 'Open now' : opportunity.status}
                </span>
              </div>
              <p className="text-gray-700 font-medium">{opportunity.deadline || "Check original source"}</p>
              
              <div className="mt-4 space-y-2">
                <a 
                  href={formatGoogleCalendarUrl(opportunity)}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-sm text-blue-600 hover:underline font-medium"
                >
                  + Add to Google Calendar
                </a>
                <button 
                  onClick={() => generateIcsFile(opportunity)}
                  className="block text-sm text-blue-600 hover:underline font-medium text-left"
                >
                  ↓ Download .ics
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wider">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {opportunity.skills.map((skill, i) => (
                  <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                    {skill}
                  </span>
                ))}
                {opportunity.skills.length === 0 && <span className="text-gray-500 text-sm">None specified</span>}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wider">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {opportunity.interests.map((interest, i) => (
                  <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                    {interest}
                  </span>
                ))}
                {opportunity.interests.length === 0 && <span className="text-gray-500 text-sm">None specified</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
