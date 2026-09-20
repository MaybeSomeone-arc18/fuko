"use client";

import Link from "next/link";
import { useState } from "react";

export default function AboutPage() {
  const [feedHref] = useState<string>(() => {
    if (typeof window === "undefined") return "/profile";
    const saved = localStorage.getItem("fuko:profile");
    if (!saved) return "/profile";
    try {
      const p = JSON.parse(saved);
      if ((p.skills?.length > 0) || (p.interests?.length > 0)) return "/opportunities";
    } catch { /* bad data */ }
    return "/profile";
  });

  return (
    <div className="min-h-screen bg-paper text-ink font-sans selection:bg-accent selection:text-accent-ink">
      <div className="max-w-5xl mx-auto px-6 pb-24 pt-8 md:pt-16">
        <Link
          href="/"
          className="inline-block mb-16 text-small font-medium text-ink-faint hover:text-ink transition-colors"
        >
          ← fuko
        </Link>

        <h1 className="text-h1 font-medium tracking-h1 mb-4">What is Fuko?</h1>
        <p className="text-body text-ink-soft mb-20 max-w-prose">
          A focused opportunity feed. Not a job board. Not a search engine. A feed.
        </p>

        <div className="flex flex-col gap-16 md:gap-24">
          <section className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-16">
            <div className="md:col-span-4">
              <h2 className="text-small font-medium text-ink uppercase tracking-widest md:sticky md:top-24">The core idea</h2>
            </div>
            <div className="md:col-span-8 text-body text-ink-soft max-w-prose leading-relaxed flex flex-col gap-6">
              <p>
                Most opportunity platforms show you everything and let you filter. Fuko works the other way: it reads every open opportunity — GitHub issues, hackathons, bounties, competitions — and hands you only the ones that genuinely fit your skills, interests, and location. The default is silence. Something appears because it matched you, not because it&apos;s trending.
              </p>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-16 border-t border-line pt-16">
            <div className="md:col-span-4">
              <h2 className="text-small font-medium text-ink uppercase tracking-widest md:sticky md:top-24 text-balance">What &quot;matched you&quot; actually means</h2>
            </div>
            <div className="md:col-span-8 text-body text-ink-soft max-w-prose leading-relaxed flex flex-col gap-6">
              <p>
                Fuko matches on real profile signals only: your stated skills, interests, and location. It never uses opportunity type as a relevance signal.
              </p>
              <p>
                Selecting &quot;Hackathon&quot; as a preference tells Fuko you&apos;re interested in hackathons — it does not mean &quot;show me every hackathon.&quot; A hackathon that also matches your skills will rank higher. A hackathon that matches nothing about you will not appear. Every match reason shown is real and traceable.
              </p>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-16 border-t border-line pt-16">
            <div className="md:col-span-4">
              <h2 className="text-small font-medium text-ink uppercase tracking-widest md:sticky md:top-24">Two streams</h2>
            </div>
            <div className="md:col-span-8 flex flex-col gap-10">
              <div>
                <p className="text-body font-medium text-ink mb-3">Contribute</p>
                <p className="text-body text-ink-soft max-w-prose leading-relaxed">
                  Remote, skill-based open work: GitHub issues, open-source bounties, contribution campaigns. Location doesn&apos;t matter here. Ranked by how closely your skills and tech stack match.
                </p>
              </div>
              <div>
                <p className="text-body font-medium text-ink mb-3">Near you</p>
                <p className="text-body text-ink-soft max-w-prose leading-relaxed">
                  Time-and-place events you attend in person: hackathons, meetups, college competitions. Matched by your city and interest areas. Set your location in your profile to unlock this stream.
                </p>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-16 border-t border-line pt-16">
            <div className="md:col-span-4" />
            <div className="md:col-span-8">
              <p className="text-body text-ink-soft max-w-prose leading-relaxed">
                Fuko is a side project. Opportunity data is sourced from GitHub (open issues and contribution campaigns) and{" "}
                <a href="https://brabble.ai" target="_blank" rel="noreferrer" className="text-ink underline hover:text-accent transition-colors">
                  Brabble.ai
                </a>{" "}
                (events and competitions).
              </p>
            </div>
          </section>
        </div>

        <div className="mt-20 flex flex-col gap-6">
          <Link
            href={feedHref}
            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-accent text-accent-ink text-body font-medium transition-transform hover:scale-[0.98] active:scale-95 w-fit"
          >
            {feedHref === "/opportunities" ? "Go to your feed" : "See your feed"}
          </Link>
          <a
            href="https://github.com/MaybeSomeone-arc18/fuko"
            target="_blank"
            rel="noreferrer"
            className="text-small text-ink-faint hover:text-ink-soft transition-colors"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </div>
  );
}
