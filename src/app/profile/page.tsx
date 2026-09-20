"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { spring, useSafeSpring } from "../../lib/motion";
import { UserProfile } from "../../types";


const INTENT_OPTIONS = [
  { label: "Open Source", value: "open_source" },
  { label: "Startup", value: "startup" },
  { label: "Research", value: "research" },
  { label: "Non-profit", value: "non_profit" }
];

const SKILL_OPTIONS = [
  { label: "React", value: "react" },
  { label: "TypeScript", value: "typescript" },
  { label: "Python", value: "python" },
  { label: "Design", value: "design" },
  { label: "Writing", value: "writing" },
  { label: "Data Science", value: "data_science" }
];

const INTEREST_OPTIONS = [
  { label: "Climate", value: "climate" },
  { label: "Education", value: "education" },
  { label: "Health", value: "health" },
  { label: "AI Safety", value: "ai_safety" },
  { label: "DevTools", value: "devtools" },
  { label: "Hacktoberfest", value: "hacktoberfest" }
];

function TactileChip({ 
  label, 
  selected, 
  onClick, 
  accent = false,
  funky = false,
  funkyColor,
}: { 
  label: string; 
  selected: boolean; 
  onClick: () => void;
  accent?: boolean;
  funky?: boolean;
  funkyColor?: string;
}) {
  const safeSnappy = useSafeSpring(spring.snappy);
  
  return (
    <motion.button
      whileTap={{ scale: funky ? 0.85 : 0.94 }}
      whileHover={funky && selected ? { rotate: [-1, 1, -1], transition: { repeat: 1, duration: 0.25 } } : {}}
      transition={safeSnappy}
      onClick={onClick}
      className={`px-4 py-2 rounded-full border text-body font-medium transition-colors funky-chip-selected ${
        selected 
          ? accent 
            ? "border-accent bg-accent text-accent-ink" 
            : "border-ink bg-ink text-paper"
          : "border-line bg-surface text-ink hover:bg-surface-sunk"
      }`}
      style={funky && selected && funkyColor ? { borderColor: funkyColor, backgroundColor: funkyColor, color: "#fff" } : {}}
    >
      {label}
    </motion.button>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    education: "",
    studyYear: "",
    location: "",
    skills: [],
    interests: [],
    opportunityTypes: [],
  });
  const [isMounted, setIsMounted] = useState(false);
  
  const safeGentle = useSafeSpring(spring.gentle);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    const saved = localStorage.getItem("fuko:profile");
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  if (!isMounted) return null;

  const toggleArray = (key: keyof UserProfile, value: string) => {
    setProfile(prev => {
      const arr = (prev[key] as string[]) || [];
      const newArr = arr.includes(value) 
        ? arr.filter(v => v !== value)
        : [...arr, value];
      return { ...prev, [key]: newArr };
    });
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => Math.max(1, s - 1));

  const handleComplete = () => {
    const finalProfile: UserProfile = {
      education: profile.education || "",
      studyYear: profile.studyYear || "",
      location: profile.location || "",
      skills: profile.skills || [],
      interests: profile.interests || [],
      opportunityTypes: profile.opportunityTypes || [],
    };
    localStorage.setItem("fuko:profile", JSON.stringify(finalProfile));
    router.push("/opportunities");
  };

  const hasMeaningfulIdentity = (profile.skills && profile.skills.length > 0) || (profile.interests && profile.interests.length > 0);

  return (
    <div className="max-w-2xl mx-auto px-6 py-24 min-h-screen bg-paper text-ink font-sans selection:bg-accent selection:text-accent-ink">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={safeGentle}
            className="flex flex-col gap-12"
          >
            <div>
              <h1 className="text-h1 font-medium tracking-h1 mb-4">What you want.</h1>
              <p className="text-body text-ink-soft">Select the types of opportunities you are looking for.</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {INTENT_OPTIONS.map((opt) => (
                <TactileChip 
                  key={opt.value}
                  label={opt.label}
                  selected={(profile.opportunityTypes || []).includes(opt.value)}
                  onClick={() => toggleArray("opportunityTypes", opt.value)}
                  accent={false}
                />
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <button 
                onClick={nextStep}
                className="h-12 px-8 rounded-full bg-ink text-paper text-body font-medium transition-transform hover:scale-[0.98] active:scale-95"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={safeGentle}
            className="flex flex-col gap-12"
          >
            <div>
              <h1 className="text-h1 font-medium tracking-h1 mb-4">Who you are.</h1>
              <p className="text-body text-ink-soft">Fuko shows fewer, better matches — not everything. Your skills are the strongest signal we use.</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {SKILL_OPTIONS.map((opt) => (
                <TactileChip 
                  key={opt.value}
                  label={opt.label}
                  selected={(profile.skills || []).includes(opt.value)}
                  onClick={() => toggleArray("skills", opt.value)}
                  accent={true}
                />
              ))}
            </div>

            <div className="mt-8 flex justify-between">
              <button 
                onClick={prevStep}
                className="h-12 px-8 rounded-full border border-line text-ink text-body font-medium transition-colors hover:bg-surface-sunk"
              >
                Back
              </button>
              <button 
                onClick={nextStep}
                className="h-12 px-8 rounded-full bg-ink text-paper text-body font-medium transition-transform hover:scale-[0.98] active:scale-95"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={safeGentle}
            className="flex flex-col gap-12"
          >
            <div>
              <h1 className="text-h1 font-medium tracking-h1 mb-4">What you care about.</h1>
              <p className="text-body text-ink-soft">Pick a few domains you want to explore.</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {INTEREST_OPTIONS.map((opt) => (
                <TactileChip 
                  key={opt.value}
                  label={opt.label}
                  selected={(profile.interests || []).includes(opt.value)}
                  onClick={() => toggleArray("interests", opt.value)}
                  accent={true}
                />
              ))}
            </div>

            <div className="mt-8 flex justify-between">
              <button 
                onClick={prevStep}
                className="h-12 px-8 rounded-full border border-line text-ink text-body font-medium transition-colors hover:bg-surface-sunk"
              >
                Back
              </button>
              <button 
                onClick={nextStep}
                className="h-12 px-8 rounded-full bg-ink text-paper text-body font-medium transition-transform hover:scale-[0.98] active:scale-95"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={safeGentle}
            className="flex flex-col gap-12"
          >
            <div>
              <h1 className="text-h1 font-medium tracking-h1 mb-4">The basics.</h1>
              <p className="text-body text-ink-soft">Add your location to unlock the &quot;Near you&quot; feed, plus optional details for student roles.</p>
            </div>
            
            <div className="flex flex-col gap-6 max-w-sm">
              <label className="flex flex-col gap-2">
                <span className="text-small font-medium text-ink-soft">Location</span>
                <input 
                  type="text" 
                  value={profile.location || ""}
                  onChange={e => setProfile(p => ({ ...p, location: e.target.value }))}
                  placeholder="e.g. Bangalore, Remote"
                  className="h-12 px-4 rounded-md border border-line bg-surface text-ink focus:outline-none focus:border-ink transition-colors"
                />
              </label>
              
              <label className="flex flex-col gap-2">
                <span className="text-small font-medium text-ink-soft">Education</span>
                <input 
                  type="text" 
                  value={profile.education || ""}
                  onChange={e => setProfile(p => ({ ...p, education: e.target.value }))}
                  placeholder="e.g. BITS Pilani"
                  className="h-12 px-4 rounded-md border border-line bg-surface text-ink focus:outline-none focus:border-ink transition-colors"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-small font-medium text-ink-soft">Study Year</span>
                <input 
                  type="text" 
                  value={profile.studyYear || ""}
                  onChange={e => setProfile(p => ({ ...p, studyYear: e.target.value }))}
                  placeholder="e.g. 3"
                  className="h-12 px-4 rounded-md border border-line bg-surface text-ink focus:outline-none focus:border-ink transition-colors"
                />
              </label>
            </div>

            <div className="mt-8 flex justify-between">
              <button 
                onClick={prevStep}
                className="h-12 px-8 rounded-full border border-line text-ink text-body font-medium transition-colors hover:bg-surface-sunk"
              >
                Back
              </button>
              <button 
                onClick={hasMeaningfulIdentity ? handleComplete : undefined}
                className={`h-12 px-8 rounded-full text-body font-medium transition-transform ${
                  hasMeaningfulIdentity
                    ? "bg-accent text-accent-ink hover:scale-[0.98] active:scale-95"
                    : "bg-surface-sunk text-ink-faint cursor-not-allowed"
                }`}
                title={hasMeaningfulIdentity ? "" : "Select at least one skill or interest to continue"}
              >
                Show my feed
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
