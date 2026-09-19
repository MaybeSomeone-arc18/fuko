import { mockOpportunities } from "../../data/mockOpportunities";
import Link from "next/link";

export default function OpportunitiesPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Opportunities</h1>
        <Link href="/profile" className="text-blue-600 hover:underline font-medium">
          Edit Profile
        </Link>
      </div>

      <div className="grid gap-6">
        {mockOpportunities.map((opp) => (
          <div key={opp.id} className="border rounded-lg p-6 shadow-sm bg-white">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-semibold text-gray-900">{opp.title}</h2>
              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded font-medium">
                {opp.type}
              </span>
            </div>
            
            <p className="text-gray-700 font-medium mb-3">{opp.organization}</p>
            
            <p className="text-gray-600 mb-4">{opp.description}</p>
            
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
      </div>
    </div>
  );
}
