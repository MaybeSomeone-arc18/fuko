/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserProfile } from "../../types";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    education: "",
    studyYear: "",
    location: "",
    skills: [],
    interests: [],
    opportunityTypes: [],
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [skillsInput, setSkillsInput] = useState("");
  const [interestsInput, setInterestsInput] = useState("");
  const [oppTypesInput, setOppTypesInput] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("fuko_profile");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProfile(parsed);
        setSkillsInput(parsed.skills?.join(", ") || "");
        setInterestsInput(parsed.interests?.join(", ") || "");
        setOppTypesInput(parsed.opportunityTypes?.join(", ") || "");
      } catch (e) {
        console.error("Failed to parse profile", e);
      }
    }
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!profile.education) newErrors.education = "Education is required";
    if (!profile.studyYear) newErrors.studyYear = "Study year is required";
    if (!profile.location) newErrors.location = "Location is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const finalProfile: UserProfile = {
        education: profile.education || "",
        studyYear: profile.studyYear || "",
        location: profile.location || "",
        skills: skillsInput.split(",").map((s) => s.trim()).filter(Boolean),
        interests: interestsInput.split(",").map((s) => s.trim()).filter(Boolean),
        opportunityTypes: oppTypesInput.split(",").map((s) => s.trim()).filter(Boolean),
      };
      
      localStorage.setItem("fuko_profile", JSON.stringify(finalProfile));
      alert("Profile saved!");
      router.push("/opportunities");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create Your Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Education</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={profile.education}
            onChange={(e) => setProfile({ ...profile, education: e.target.value })}
            placeholder="e.g. University of California, Berkeley"
          />
          {errors.education && <p className="text-red-500 text-sm mt-1">{errors.education}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Study Year</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={profile.studyYear}
            onChange={(e) => setProfile({ ...profile, studyYear: e.target.value })}
            placeholder="e.g. Junior, 2025"
          />
          {errors.studyYear && <p className="text-red-500 text-sm mt-1">{errors.studyYear}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={profile.location}
            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
            placeholder="e.g. San Francisco, CA"
          />
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Skills (comma separated)</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={skillsInput}
            onChange={(e) => setSkillsInput(e.target.value)}
            placeholder="e.g. Python, React, Data Analysis"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Interests (comma separated)</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={interestsInput}
            onChange={(e) => setInterestsInput(e.target.value)}
            placeholder="e.g. Machine Learning, Sustainability"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Opportunity Types (comma separated)</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={oppTypesInput}
            onChange={(e) => setOppTypesInput(e.target.value)}
            placeholder="e.g. Internship, Full-time, Research"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition-colors"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}
