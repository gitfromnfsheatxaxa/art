"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

interface LazyGalleryCardProps {
    children: ReactNode;
    index: number;
    isActive: boolean;
}

/**
 * Wraps gallery cards to animate only when they're visible in viewport.
 * Uses Intersection Observer for efficient animation triggering.
 */
export function LazyGalleryCard({ children, index, isActive }: LazyGalleryCardProps) {
    const { ref, isInView } = useInView({ threshold: 0.3 });

    // Only animate when section is active AND card is in view
    const shouldAnimate = isActive && isInView;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.55, delay: shouldAnimate ? index * 0.08 + 0.2 : 0 }}
            className="shrink-0"
        >
            {children}
        </motion.div>
    );
}
