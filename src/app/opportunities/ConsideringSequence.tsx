"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { spring, useSafeSpring } from "../../lib/motion";

interface ConsideringProps {
  totalCount: number;
  onDone: () => void;
}

const GHOST_ROWS = 12;

export function ConsideringSequence({ totalCount, onDone }: ConsideringProps) {
  const [phase, setPhase] = useState<"profile" | "weighing" | "collapsing">("profile");
  const prefersReduced = useReducedMotion();
  const safeGentle = useSafeSpring(spring.gentle);

  useEffect(() => {
    if (prefersReduced) {
      // Instant — skip the whole sequence
      onDone();
      return;
    }

    // Phase 1: "Reading your profile…" — 500ms
    const t1 = setTimeout(() => setPhase("weighing"), 500);
    // Phase 2: "Weighing N opportunities…" — hold 900ms
    const t2 = setTimeout(() => setPhase("collapsing"), 1400);
    // Phase 3: ghost rows collapse, then done — 400ms collapse
    const t3 = setTimeout(() => onDone(), 1820);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone, prefersReduced]);

  if (prefersReduced) return null;

  return (
    <div className="flex flex-col">
      {/* Status line */}
      <div className="mb-16 h-8 overflow-hidden">
        <AnimatePresence mode="popLayout">
          {phase === "profile" && (
            <motion.p
              key="reading"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={safeGentle}
              className="text-h1 font-medium tracking-h1 text-ink-faint"
            >
              Reading your profile…
            </motion.p>
          )}
          {(phase === "weighing" || phase === "collapsing") && (
            <motion.p
              key="weighing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={safeGentle}
              className="text-h1 font-medium tracking-h1 text-ink-faint"
            >
              Weighing {totalCount} opportunities…
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Ghost rows — streaming shimmer, then collapse */}
      <motion.div
        animate={phase === "collapsing" ? { opacity: 0, height: 0 } : { opacity: 1, height: "auto" }}
        transition={phase === "collapsing" ? { ...spring.gentle, duration: 0.35 } : {}}
        style={{ overflow: "hidden" }}
      >
        {Array.from({ length: GHOST_ROWS }).map((_, i) => (
          <GhostRow key={i} index={i} active={phase !== "collapsing"} />
        ))}
      </motion.div>
    </div>
  );
}

function GhostRow({ index, active }: { index: number; active: boolean }) {
  // Staggered shimmer using a CSS animation delay
  const delay = `${(index * 0.06).toFixed(2)}s`;
  const titleWidth = [55, 70, 62, 80, 50, 75, 65, 58, 72, 68, 53, 78][index % 12];
  const orgWidth = [30, 38, 35, 42, 28, 40, 33, 36][index % 8];

  return (
    <div
      className="py-8 border-b border-line opacity-0"
      style={{
        animation: active ? `fukoGhostIn 0.3s ease forwards, fukoShimmer 1.6s ease-in-out ${delay} infinite` : "none",
        animationDelay: active ? `${(index * 0.04).toFixed(2)}s, ${(index * 0.06).toFixed(2)}s` : "0s",
      }}
    >
      <div className="flex flex-col gap-3">
        <div
          className="h-4 rounded-sm bg-surface-sunk"
          style={{ width: `${titleWidth}%` }}
        />
        <div
          className="h-3 rounded-sm bg-surface-sunk"
          style={{ width: `${orgWidth}%`, opacity: 0.6 }}
        />
      </div>
    </div>
  );
}
