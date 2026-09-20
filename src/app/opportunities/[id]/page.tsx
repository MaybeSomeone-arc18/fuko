"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { Opportunity, UserProfile } from "../../../types";
import { matchOpportunities } from "../../../lib/matching";
import { motion } from "framer-motion";
import { useReveal, spring, useSafeSpring } from "../../../lib/motion";

const TEMPORARY_PROFILE: UserProfile = {
  education: "",
  studyYear: "",
  location: "",
  skills: [],
  interests: [],
  opportunityTypes: []
};

export default function OpportunityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [reasons, setReasons] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const reveal = useReveal();
  const safeSnappy = useSafeSpring(spring.snappy);

  useEffect(() => {
    const loadOpportunity = async () => {
      try {
        const res = await fetch(`/api/opportunities/${encodeURIComponent(id)}`);
        if (!res.ok) {
          setError(true);
          return;
        }
        
        const data = await res.json();
        if (!data.opportunity) {
          setError(true);
          return;
        }

        const opp: Opportunity = data.opportunity;
        setOpportunity(opp);

        // Calculate reasons based on profile
        const saved = localStorage.getItem("fuko:profile");
        const activeProfile = saved ? JSON.parse(saved) : TEMPORARY_PROFILE;

        const contributeMatch = matchOpportunities(activeProfile, [opp], "contribute");
        const nearYouMatch = matchOpportunities(activeProfile, [opp], "near_you");

        const allReasons = new Set<string>();
        if (contributeMatch.length > 0) {
          contributeMatch[0].reasons.forEach(r => allReasons.add(r));
        }
        if (nearYouMatch.length > 0) {
          nearYouMatch[0].reasons.forEach(r => allReasons.add(r));
        }

        setReasons(Array.from(allReasons));
      } catch (err) {
        console.error("Failed to load opportunity:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadOpportunity();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 min-h-screen bg-paper text-ink flex items-center justify-center">
        <p className="text-body font-normal text-ink-soft">Loading opportunity...</p>
      </div>
    );
  }

  if (error || !opportunity) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 min-h-screen bg-paper text-ink flex flex-col items-center justify-center">
        <h1 className="text-h1 font-medium tracking-h1 mb-4">Not found.</h1>
        <p className="text-body text-ink-soft mb-8">This opportunity may have been removed or doesn&apos;t exist.</p>
        <Link 
          href="/opportunities"
          className="text-small font-medium text-ink hover:text-accent transition-colors"
        >
          ← Back to feed
        </Link>
      </div>
    );
  }

  const primaryActionUrl = opportunity.applicationUrl || opportunity.sourceUrl;
  const isApply = !!opportunity.applicationUrl;

  const facts = [];
  if (opportunity.deadline) {
    facts.push({ label: "Deadline", value: new Date(opportunity.deadline).toLocaleDateString() });
  }
  if (opportunity.location && opportunity.location !== "Unknown") {
    // We append the description snippet if it gives more context (Brabble workaround)
    const displayLoc = (opportunity.sourceType === "brabble" && opportunity.description) 
      ? opportunity.description.split(" - ").pop()?.trim() || opportunity.location
      : opportunity.location;
    facts.push({ label: "Location", value: displayLoc });
  }
  if (opportunity.eligibility) {
    facts.push({ label: "Eligibility", value: opportunity.eligibility });
  }
  if (opportunity.sourceType) {
    facts.push({ label: "Source", value: opportunity.sourceType === "github" ? "GitHub" : "Brabble" });
  }

  return (
    <div className="max-w-5xl mx-auto px-6 pb-24 pt-8 md:pt-16 min-h-screen bg-paper text-ink font-sans selection:bg-accent selection:text-accent-ink">
      <motion.div
        variants={reveal.container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 relative"
      >
        {/* Left Column: Main Content */}
        <div className="md:col-span-8 flex flex-col">
          <motion.div variants={reveal.item} className="mb-10">
            <span className="text-caption text-ink-faint tracking-caption mb-3 block uppercase">
              {opportunity.type}
            </span>
            <h1 className="text-h1 font-medium tracking-h1 mb-4 text-balance">
              {opportunity.title}
            </h1>
            <p className="text-body text-ink-soft text-lg">
              {opportunity.organization}
            </p>
          </motion.div>

          {/* Integrated match reasons block */}
          <motion.div variants={reveal.item} className="mb-16 bg-surface/40 rounded-2xl p-6 md:p-8 border border-line">
            <h2 className="text-small font-medium text-ink mb-5 uppercase tracking-widest">Why this fits you</h2>
            {reasons.length > 0 ? (
              <ul className="space-y-3">
                {reasons.map((r, i) => (
                  <li key={i} className="font-mono text-small text-ink-soft flex items-start gap-3">
                    <span className="text-ink-faint mt-0.5">↳</span>
                    <span className="leading-snug">{r}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-small text-ink-soft">
                This opportunity doesn&apos;t strongly match your saved skills, interests, or location profile right now.
              </p>
            )}
          </motion.div>

          {/* Main Description */}
          {opportunity.description && opportunity.sourceType !== 'brabble' && (
            <motion.div variants={reveal.item} className="mb-12">
              <h2 className="text-small font-medium text-ink mb-6 uppercase tracking-widest">About</h2>
              <div className="prose prose-sm md:prose-base prose-ink max-w-none text-ink-soft">
                <p className="whitespace-pre-wrap leading-relaxed">{opportunity.description}</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Column: Actions & Meta (Sticky) */}
        <div className="md:col-span-4">
          <div className="sticky top-28 flex flex-col gap-10">
            <motion.div variants={reveal.item}>
              <a
                href={primaryActionUrl}
                target="_blank"
                rel="noreferrer"
                className="block w-full"
              >
                <motion.button 
                  whileTap={{ scale: 0.98 }}
                  transition={safeSnappy}
                  className="w-full bg-accent text-accent-ink px-8 py-4 rounded-lg text-body font-medium tracking-wide hover:opacity-90 transition-opacity shadow-sm flex items-center justify-center gap-2"
                >
                  {isApply ? "Apply" : "View"} ↗
                </motion.button>
              </a>
            </motion.div>

            {facts.length > 0 && (
              <motion.div variants={reveal.item} className="border-t border-line pt-8">
                <h2 className="text-small font-medium text-ink mb-6 uppercase tracking-widest">Details</h2>
                <dl className="space-y-5">
                  {facts.map((f, i) => (
                    <div key={i} className="flex flex-col gap-1.5">
                      <dt className="text-caption font-medium text-ink-faint uppercase tracking-wider">{f.label}</dt>
                      <dd className="text-small text-ink-soft leading-snug">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
