"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useReveal } from "../lib/motion";
import { useState, useEffect } from "react";

export default function Home() {
  const reveal = useReveal();
  const [feedHref, setFeedHref] = useState("/profile");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("fuko:profile");
      if (saved) {
        const p = JSON.parse(saved);
        if ((p.skills?.length > 0) || (p.interests?.length > 0)) setFeedHref("/opportunities");
      }
    } catch { /* bad data */ }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen bg-paper text-ink font-sans selection:bg-accent selection:text-accent-ink">
      <main className="flex flex-col flex-1 items-start justify-center px-6 sm:px-16 max-w-2xl mx-auto w-full py-24">
        <motion.div 
          initial="hidden"
          animate="show"
          variants={reveal.container}
          className="flex flex-col"
        >
          <motion.h1 
            variants={reveal.item}
            className="text-h1 font-medium tracking-h1 mb-6 text-balance"
          >
            Opportunities, without the search.
          </motion.h1>
          
          <motion.p 
            variants={reveal.item}
            className="text-body text-ink-soft mb-12 max-w-md text-balance"
          >
            Fuko reads every open opportunity and hands you only the few that actually fit you — no searching, no endless lists.
          </motion.p>
          
          <motion.div variants={reveal.item} className="mb-20">
            <Link 
              href={feedHref}
              className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-accent text-accent-ink text-body font-medium transition-transform hover:scale-[0.98] active:scale-95"
            >
              {mounted && feedHref === "/opportunities" ? "Go to your feed" : "See your feed"}
            </Link>
          </motion.div>

          <motion.div variants={reveal.item} className="border-t border-line pt-12">
            <p className="text-caption text-ink-faint tracking-caption uppercase mb-8">How it works</p>
            <ol className="flex flex-col gap-6 list-none">
              <li className="flex gap-4">
                <span className="text-caption text-ink-faint font-mono w-4 shrink-0 pt-px">1</span>
                <span className="text-body text-ink-soft">Tell us who you are — your skills, interests, and location.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-caption text-ink-faint font-mono w-4 shrink-0 pt-px">2</span>
                <span className="text-body text-ink-soft">Fuko weighs every open opportunity against your real profile.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-caption text-ink-faint font-mono w-4 shrink-0 pt-px">3</span>
                <span className="text-body text-ink-soft">You get only the few worth your attention — with reasons, not guesses.</span>
              </li>
            </ol>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
