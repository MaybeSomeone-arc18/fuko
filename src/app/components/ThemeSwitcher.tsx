"use client";

import { motion } from "framer-motion";
import { useTheme, Theme } from "../../lib/theme";
import { useSafeSpring, spring } from "../../lib/motion";

const THEMES: { value: Theme; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark",  label: "Dark"  },
  { value: "funky", label: "Funky" },
];

const FUNKY_ACTIVE_COLORS: Record<Theme, string> = {
  light: "#FF5C48",
  dark:  "#4C8DFF",
  funky: "#F5C518",
};

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const safeSnappy = useSafeSpring(spring.snappy);
  const isFunky = theme === "funky";

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-line px-1 py-0.5"
      role="group"
      aria-label="Theme switcher"
    >
      {THEMES.map(({ value, label }) => {
        const isActive = theme === value;
        const activeBg = isFunky ? FUNKY_ACTIVE_COLORS[value] : undefined;

        return (
          <motion.button
            key={value}
            onClick={() => setTheme(value)}
            whileTap={isFunky ? { scale: 0.82 } : { scale: 0.92 }}
            transition={safeSnappy}
            className={`
              px-2.5 py-0.5 rounded-full text-caption font-medium transition-colors duration-150
              ${isActive
                ? "text-paper"
                : "text-ink-faint hover:text-ink-soft"
              }
            `}
            style={isActive ? { backgroundColor: activeBg ?? "var(--ink)" } : {}}
            aria-pressed={isActive}
          >
            {label}
          </motion.button>
        );
      })}
    </div>
  );
}
