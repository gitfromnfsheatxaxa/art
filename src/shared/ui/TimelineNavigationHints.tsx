"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown, Scroll } from "lucide-react";

/**
 * Navigation hints for the timeline.
 * Shows users how to navigate: keyboard arrows, mouse scroll, or touch drag.
 * Auto-hides after first interaction or 5 seconds on desktop.
 */
export function TimelineNavigationHints() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Auto-hide after 5 seconds on desktop, 8 seconds on mobile
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const timeout = setTimeout(() => setVisible(false), isMobile ? 8000 : 5000);

    const handleAnyInteraction = () => {
      setVisible(false);
    };

    // Hide on any navigation interaction
    window.addEventListener("keydown", handleAnyInteraction);
    window.addEventListener("wheel", handleAnyInteraction);
    window.addEventListener("pointerdown", handleAnyInteraction);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("keydown", handleAnyInteraction);
      window.removeEventListener("wheel", handleAnyInteraction);
      window.removeEventListener("pointerdown", handleAnyInteraction);
    };
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="pointer-events-none fixed inset-x-0 top-1/2 z-30 -translate-y-1/2"
    >
      {/* Desktop hints */}
      <div className="hidden items-center justify-center gap-16 md:flex">
        {/* Left arrow hint */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 opacity-60"
        >
          <ArrowUp size={20} className="text-codex-gold/70" />
          <span className="text-[10px] uppercase tracking-[0.15em] text-codex-gold/60">Scroll Up</span>
        </motion.div>

        {/* Center instructions */}
        <div className="flex flex-col items-center gap-3">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Scroll size={24} className="text-codex-gold/70" />
          </motion.div>
          <div className="text-center">
            <p className="font-heading text-xs uppercase tracking-[0.18em] text-codex-gold/70">
              Scroll • Arrow Keys • Drag
            </p>
            <p className="mt-1 text-[10px] text-codex-parchment/50">Navigate through eras</p>
          </div>
        </div>

        {/* Right arrow hint */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 opacity-60"
        >
          <ArrowDown size={20} className="text-codex-gold/70" />
          <span className="text-[10px] uppercase tracking-[0.15em] text-codex-gold/60">Scroll Down</span>
        </motion.div>
      </div>

      {/* Mobile hints */}
      <div className="flex flex-col items-center gap-2 px-6 md:hidden">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowUp size={18} className="text-codex-gold/70" />
        </motion.div>
        <p className="font-heading text-[10px] uppercase tracking-[0.15em] text-codex-gold/70">
          Drag or tap arrows to navigate
        </p>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={18} className="text-codex-gold/70" />
        </motion.div>
      </div>
    </motion.div>
  );
}
