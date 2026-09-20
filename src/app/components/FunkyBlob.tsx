"use client";

import { useReducedMotion } from "framer-motion";
import { useTheme } from "../../lib/theme";

/** Animated gradient blob background — only renders under [data-theme="funky"] */
export function FunkyBlob() {
  const reduced = useReducedMotion();
  const { theme } = useTheme();

  if (theme !== "funky" || reduced) return null;

  return (
    <div
      aria-hidden
      className="funky-blob pointer-events-none fixed inset-0 overflow-hidden -z-10"
      style={{ opacity: 0.18 }}
    >
      {/* Blob 1 — coral */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-5%",
          width: "55vw",
          height: "55vw",
          borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%",
          background: "radial-gradient(circle, #FF5C48 0%, transparent 70%)",
          animation: "fukoBlob1 14s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      {/* Blob 2 — blue */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          right: "-10%",
          width: "45vw",
          height: "45vw",
          borderRadius: "40% 60% 45% 55% / 60% 40% 60% 40%",
          background: "radial-gradient(circle, #4C8DFF 0%, transparent 70%)",
          animation: "fukoBlob2 18s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      {/* Blob 3 — green */}
      <div
        style={{
          position: "absolute",
          bottom: "-15%",
          left: "20%",
          width: "40vw",
          height: "40vw",
          borderRadius: "55% 45% 40% 60% / 45% 55% 45% 55%",
          background: "radial-gradient(circle, #3FD07A 0%, transparent 70%)",
          animation: "fukoBlob3 22s ease-in-out infinite",
          willChange: "transform",
        }}
      />
    </div>
  );
}
