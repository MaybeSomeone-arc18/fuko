"use client";

import { useReducedMotion } from "framer-motion";
import { useRef } from "react";

const EMOJIS = ["🎉", "✨", "🎊", "🌈", "🦄", "🚀", "💥", "⭐", "🎯", "💫"];
const COLORS = ["#FF5C48", "#3FD07A", "#4C8DFF", "#F5C518"];
const PARTICLE_COUNT = 40;

interface Particle {
  el: HTMLDivElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  isEmoji: boolean;
}

/** Fire a confetti/emoji burst from the center of the page.
 *  Completely no-ops under prefers-reduced-motion.
 */
export function useConfettiBurst() {
  const reduced = useReducedMotion();
  const rafRef = useRef<number>(0);

  return () => {
    if (reduced) return;

    const container = document.createElement("div");
    container.style.cssText = "position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:9999;";
    document.body.appendChild(container);

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight * 0.45;

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => {
      const isEmoji = Math.random() < 0.35;
      const angle = (Math.random() * 360 * Math.PI) / 180;
      const speed = 4 + Math.random() * 8;
      const el = document.createElement("div");
      const size = isEmoji ? 20 + Math.random() * 12 : 6 + Math.random() * 6;

      if (isEmoji) {
        el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
        el.style.cssText = `position:absolute;font-size:${size}px;user-select:none;`;
      } else {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        el.style.cssText = `position:absolute;width:${size}px;height:${size * 0.4}px;background:${color};border-radius:2px;`;
      }

      container.appendChild(el);

      return {
        el,
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        life: 0,
        maxLife: 55 + Math.floor(Math.random() * 30),
        isEmoji,
      };
    });

    const tick = () => {
      let alive = false;
      for (const p of particles) {
        p.life++;
        if (p.life > p.maxLife) {
          p.el.style.opacity = "0";
          continue;
        }
        alive = true;
        p.vy += 0.25; // gravity
        p.vx *= 0.98; // drag
        p.x += p.vx;
        p.y += p.vy;
        const t = p.life / p.maxLife;
        p.el.style.opacity = String(1 - t * t);
        p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.life * 4}deg)`;
      }
      if (alive) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        container.remove();
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  };
}
