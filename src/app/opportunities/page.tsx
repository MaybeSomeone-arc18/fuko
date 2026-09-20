"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { matchOpportunities } from "../../lib/matching";
import { UserProfile, Opportunity } from "../../types";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useReveal, spring, useSafeSpring } from "../../lib/motion";
import Link from "next/link";
import { ConsideringSequence } from "./ConsideringSequence";
import { useTheme } from "../../lib/theme";

export const TEMPORARY_PROFILE: UserProfile = {
  education: "Computer Science",
  studyYear: "",
  location: "",
  skills: ["frontend", "cli", "testing"],
  interests: ["documentation", "community"],
  opportunityTypes: ["Hackathon", "Issue"]
}; // TODO: replace with real onboarding profile

type Mode = "contribute" | "near_you";

const SESSION_KEY = "fuko:considered";

export default function OpportunitiesPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>(TEMPORARY_PROFILE);
  const [allOpps, setAllOpps] = useState<Opportunity[]>([]);
  const [mode, setMode] = useState<Mode>("near_you");
  const [displayCount, setDisplayCount] = useState(5);
  const [loading, setLoading] = useState(true);
  const [considering, setConsidering] = useState(false);
  const [resolved, setResolved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const prefersReduced = useReducedMotion();
  const reveal = useReveal();
  const safeGentle = useSafeSpring(spring.gentle);
  const { theme } = useTheme();
  const isFunky = theme === "funky";

  const FUNKY_ACCENTS = ["#FF5C48", "#3FD07A", "#4C8DFF", "#F5C518"];

  const handleConsideringDone = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setConsidering(false);
    setResolved(true);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        let oppsToMatch: Opportunity[] = [];

        try {
          const res = await fetch("/api/opportunities");
          if (res.ok) {
            const data = await res.json();
            if (data.opportunities && Array.isArray(data.opportunities)) {
              oppsToMatch = data.opportunities;
            }
          } else {
            console.warn("API fetch failed");
            setError("Failed to fetch latest opportunities.");
          }
        } catch (apiError) {
          console.warn("API fetch error", apiError);
          setError("Failed to connect to server.");
        }

        let activeProfile = TEMPORARY_PROFILE;
        const saved = localStorage.getItem("fuko:profile");
        if (saved) {
          try {
            activeProfile = JSON.parse(saved);
          } catch (err) {
            console.error("Error parsing saved profile", err);
          }
        }

        setProfile(activeProfile);
        setAllOpps(oppsToMatch);

        const contributeMatched = matchOpportunities(activeProfile, oppsToMatch, "contribute");
        const nearYouMatched = matchOpportunities(activeProfile, oppsToMatch, "near_you");

        // Default is near_you; fall back to contribute only if near_you has nothing
        if (nearYouMatched.length === 0 && contributeMatched.length > 0) {
          setMode("contribute");
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
        // Play considering sequence once per session; skip if reduced motion
        const alreadySeen = sessionStorage.getItem(SESSION_KEY);
        if (!alreadySeen && !prefersReduced) {
          setConsidering(true);
        } else {
          setResolved(true);
        }
      }
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 min-h-screen bg-paper text-ink">
        <p className="text-body font-normal text-ink-soft">Loading feed...</p>
      </div>
    );
  }

  const isContribute = (o: Opportunity) =>
    o.sourceType === "github" ||
    o.type.toLowerCase() === "open_source" ||
    o.title.toLowerCase().includes("hacktoberfest");

  const poolCount = allOpps.filter(o =>
    mode === "contribute" ? isContribute(o) : !isContribute(o)
  ).length;

  const currentOpportunities = matchOpportunities(profile, allOpps, mode);
  const displayedOpportunities = currentOpportunities.slice(0, displayCount);
  const countToShow = Math.min(currentOpportunities.length, 5);

  return (
    <div className="max-w-3xl mx-auto px-6 pb-24 pt-0 min-h-screen bg-paper text-ink font-sans selection:bg-accent selection:text-accent-ink">
      {error && (
        <div className="mb-12 text-accent text-small">{error}</div>
      )}

      {/* Minimal Toggle — always visible */}
      <div className="mb-16 flex gap-6 border-b border-line pb-4">
        <button
          onClick={() => { setMode("near_you"); setDisplayCount(5); }}
          className={`text-body font-medium transition-colors duration-200 ${mode === "near_you" ? "text-ink" : "text-ink-faint hover:text-ink-soft"}`}
        >
          Near you
        </button>
        <button
          onClick={() => { setMode("contribute"); setDisplayCount(5); }}
          className={`text-body font-medium transition-colors duration-200 ${mode === "contribute" ? "text-ink" : "text-ink-faint hover:text-ink-soft"}`}
        >
          Contribute
        </button>
      </div>

      <AnimatePresence mode="popLayout">
        {/* Considering sequence */}
        {considering && (
          <motion.div
            key="considering"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={safeGentle}
          >
            <ConsideringSequence
              totalCount={allOpps.length}
              onDone={handleConsideringDone}
            />
          </motion.div>
        )}

        {/* Resolved feed */}
        {resolved && (
          <motion.div
            key="feed"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={safeGentle}
          >
            {currentOpportunities.length > 0 ? (
              <motion.h1
                key={`h1-${mode}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={safeGentle}
                className="text-h1 font-medium tracking-h1 mb-16"
              >
                {displayCount === 5 ? (
                  <>
                    <span className="text-ink-faint font-normal">From {poolCount} opportunities · </span>
                    {countToShow} worth your attention.
                  </>
                ) : "For You"}
              </motion.h1>
            ) : (
              <motion.div
                key={`empty-${mode}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={safeGentle}
                className="py-12"
              >
                {mode === "contribute" ? (
                  <>
                    <h1 className="text-h1 font-medium tracking-h1 mb-4">Nothing right now.</h1>
                    <p className="text-body text-ink-soft">Nothing matches your skills yet. Check back later.</p>
                  </>
                ) : (
                  <>
                    <h1 className="text-h1 font-medium tracking-h1 mb-4">Nothing near you right now.</h1>
                    <p className="text-body text-ink-soft">
                      {!profile.location ? (
                        <span>
                          <Link href="/profile" className="text-accent underline hover:opacity-80 transition-opacity">
                            Add your location
                          </Link>{" "}
                          to discover local events.
                        </span>
                      ) : (
                        "We didn't find any local events. Check back later."
                      )}
                    </p>
                  </>
                )}
              </motion.div>
            )}

            <AnimatePresence mode="popLayout">
              <motion.div
                key={`list-${mode}`}
                variants={reveal.container}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0 }}
                className="flex flex-col"
              >
                {displayedOpportunities.map((opp, idx) => {
                  const funkyAccent = FUNKY_ACCENTS[idx % 4];
                  return (
                  <motion.article
                    key={opp.id}
                    variants={reveal.item}
                    whileHover={isFunky && !prefersReduced ? { rotate: 0.4, x: 4, transition: { type: "spring", stiffness: 500, damping: 28 } } : {}}
                    className={`py-10 border-b border-line group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-6 cursor-pointer${isFunky ? " funky-row" : ""}`}
                    style={isFunky ? { "--funky-row-color": funkyAccent } as React.CSSProperties : {}}
                    onClick={() => router.push(`/opportunities/${encodeURIComponent(opp.id)}`)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-h2 font-medium tracking-h2 group-hover:text-accent transition-colors duration-200">
                          {opp.title}
                        </h2>
                        <span className="text-caption text-ink-faint tracking-caption">
                          {opp.type}
                        </span>
                      </div>

                      <p className="text-body text-ink-soft mb-6">
                        {opp.organization}
                      </p>

                      {opp.reasons.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, filter: "blur(2px)" }}
                          animate={{ opacity: 1, filter: "blur(0px)" }}
                          transition={{ delay: 0.15, ...safeGentle }}
                          className="font-mono text-caption text-ink-faint tracking-caption"
                        >
                          <span className="text-ink-soft mr-2">↳</span>
                          {opp.reasons.join(" • ")}
                        </motion.div>
                      )}
                    </div>

                    <div className="sm:ml-8 shrink-0">
                      <a
                        href={opp.applicationUrl || opp.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-small font-medium text-ink hover:text-accent transition-colors duration-200"
                      >
                        {opp.applicationUrl ? "Apply" : "View"}
                      </a>
                    </div>
                  </motion.article>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {currentOpportunities.length > displayCount && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, ...safeGentle }}
                className="mt-16 text-center"
              >
                <button
                  onClick={() => setDisplayCount((prev) => prev + 5)}
                  className="text-small font-medium text-ink-soft hover:text-ink transition-colors duration-200"
                >
                  Show 5 more
                </button>
              </motion.div>
            )}

            <div className="mt-24 text-caption text-ink-faint tracking-caption">
              {isFunky
                ? <span>peace out ✌️ — data from GitHub &amp; Brabble.ai</span>
                : <span>Opportunity data powered partly by Brabble.ai</span>
              }
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
