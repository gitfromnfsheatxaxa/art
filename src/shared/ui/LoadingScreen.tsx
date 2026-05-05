"use client";

import { motion, AnimatePresence } from "framer-motion";

import { GoldDivider } from "@/shared/ui/GoldDivider";

type LoadingScreenProps = {
  progress: number;
  visible: boolean;
};

export function LoadingScreen({ progress, visible }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-codex-dark"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9 } }}
        >
          <div className="relative flex max-w-xl flex-col items-center px-8 text-center">
            <div className="absolute inset-[-4rem] bg-[radial-gradient(circle,rgba(212,175,119,0.14),transparent_55%)]" />
            <motion.div
              className="text-6xl text-codex-gold md:text-7xl"
              animate={{ y: [0, -10, 0], rotate: [-12, -6, -12] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            >
              ✒
            </motion.div>
            <GoldDivider width={180} className="mt-6" />
            <h1 className="mt-5 font-heading text-sm uppercase tracking-[0.35em] text-codex-gold md:text-base">
              Codex Luminara
            </h1>
            <p className="mt-3 text-lg italic text-codex-parchment/80 md:text-xl">
              Illuminating the Codex…
            </p>
            <div className="mt-8 h-[2px] w-56 overflow-hidden bg-codex-ink md:w-72">
              <motion.div
                className="h-full bg-gradient-to-r from-codex-gold via-codex-glow to-codex-gold bg-[length:200%_100%]"
                animate={{ width: `${progress}%`, backgroundPosition: ["0% 50%", "100% 50%"] }}
                transition={{ width: { duration: 0.25 }, backgroundPosition: { duration: 2.8, repeat: Infinity, ease: "linear" } }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
