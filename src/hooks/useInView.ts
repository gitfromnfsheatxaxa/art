"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
    threshold?: number | number[];
    rootMargin?: string;
}

/**
 * Hook to detect when an element enters the viewport.
 * Perfect for triggering animations only when visible.
 */
export function useInView(options: UseInViewOptions = {}) {
    const ref = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);
    const hasTriggeredRef = useRef(false);

    useEffect(() => {
        if (!ref.current) return;

        // For SSR compatibility, check if IntersectionObserver is available
        if (typeof IntersectionObserver === "undefined") {
            setIsInView(true);
            return;
        }

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !hasTriggeredRef.current) {
                setIsInView(true);
                hasTriggeredRef.current = true;
                // Optionally unobserve after first trigger
                observer.unobserve(entry.target);
            }
        }, {
            threshold: options.threshold ?? 0.1,
            rootMargin: options.rootMargin ?? "0px",
        });

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [options.threshold, options.rootMargin]);

    return { ref, isInView };
}
