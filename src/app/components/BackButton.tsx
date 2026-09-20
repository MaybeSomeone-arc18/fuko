"use client";

import { useRouter, usePathname } from "next/navigation";

/** ← back — a quiet strip between the navbar and the page content. */
export function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  // Don't show on landing or About (About has its own nav link)
  if (pathname === "/" || pathname === "/about") return null;

  return (
    <div className="max-w-3xl mx-auto w-full px-6 pt-4 pb-0">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-caption text-ink-faint hover:text-ink-soft transition-colors duration-150 group"
        aria-label="Go back"
      >
        <span className="transition-transform duration-150 group-hover:-translate-x-0.5">←</span>
        <span>back</span>
      </button>
    </div>
  );
}
