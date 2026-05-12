"use client";

import { motion } from "framer-motion";

export function PageLoadingSkeleton() {
    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-codex-dark">
            <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-center"
            >
                <div className="mb-4 text-codex-gold">
                    <div className="h-1 w-40 bg-gradient-to-r from-codex-gold to-codex-glow" />
                </div>
                <p className="text-sm text-codex-parchment/60">Loading...</p>
            </motion.div>
        </div>
    );
}
