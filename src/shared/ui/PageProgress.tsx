"use client";

import { motion } from "framer-motion";

type PageProgressProps = {
  progress: number;
};

export function PageProgress({ progress }: PageProgressProps) {
  return (
    <motion.div
      className="fixed left-0 top-0 z-[80] h-[2px] bg-gradient-to-r from-codex-gold to-codex-glow"
      animate={{ width: `${progress}%` }}
      transition={{ ease: "easeOut", duration: 0.25 }}
    />
  );
}
