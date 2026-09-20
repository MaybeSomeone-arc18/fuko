import { useReducedMotion } from "framer-motion";

export const spring = {
  // Snappy — buttons, toggles, taps. Settles fast, minimal overshoot.
  snappy: { type: "spring", stiffness: 520, damping: 30, mass: 0.8 },
  // Bouncy — the playful one. Cards, reveals, delightful moments.
  bouncy: { type: "spring", stiffness: 380, damping: 18, mass: 1 },
  // Gentle — large surfaces, modals, page transitions. Calm, no bounce.
  gentle: { type: "spring", stiffness: 210, damping: 26, mass: 1.1 },
  // Drag — for elements that follow the pointer with weight.
  drag:   { type: "spring", stiffness: 700, damping: 42, mass: 1 },
} as const;

export const reveal = {
  container: { show: { transition: { staggerChildren: 0.05 } } },
  item: {
    hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
    show:   { opacity: 1, y: 0, filter: "blur(0px)", transition: spring.gentle },
  },
};

export const useReveal = () => {
  const reduced = useReducedMotion();
  if (reduced) {
    return {
      container: { show: { transition: { staggerChildren: 0 } } },
      item: {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0 } },
      },
    };
  }
  return reveal;
};

export const useSafeSpring = <T>(s: T): T | { duration: number } => {
  const prefersReduced = useReducedMotion();
  return prefersReduced ? { duration: 0 } : s;
};
