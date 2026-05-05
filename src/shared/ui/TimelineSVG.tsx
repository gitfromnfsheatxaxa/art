"use client";

import { motion } from "framer-motion";

type TimelineSVGProps = {
  activeEra: number;
  totalEras: number;
};

export function TimelineSVG({ activeEra, totalEras }: TimelineSVGProps) {
  const progress = activeEra / Math.max(totalEras - 1, 1);

  return (
    <svg
      width="48"
      height="100%"
      viewBox="0 0 48 700"
      preserveAspectRatio="none"
      className="absolute left-1/2 top-0 z-10 hidden h-full -translate-x-1/2 md:block"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="codexLine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D4AF77" stopOpacity="0.18" />
          <stop offset="30%" stopColor="#D4AF77" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#D4AF77" stopOpacity="0.16" />
        </linearGradient>
        <linearGradient id="codexLineActive" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8C77F" />
          <stop offset="100%" stopColor="#D4AF77" />
        </linearGradient>
        <filter id="goldGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M24,36 C8,100 40,170 24,240 C8,310 40,380 24,450 C8,520 40,590 24,664"
        fill="none"
        stroke="url(#codexLine)"
        strokeWidth="1.5"
        filter="url(#goldGlow)"
      />
      <motion.path
        d="M24,36 C8,100 40,170 24,240 C8,310 40,380 24,450 C8,520 40,590 24,664"
        fill="none"
        stroke="url(#codexLineActive)"
        strokeWidth="2.2"
        filter="url(#goldGlow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: progress }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      {Array.from({ length: totalEras }).map((_, index) => {
        const y = 36 + (index / Math.max(totalEras - 1, 1)) * 628;
        const isActive = activeEra === index;
        return (
          <g key={index}>
            <circle cx="24" cy={y} r={isActive ? 6 : 3.5} fill={isActive ? "#E8C77F" : "#D4AF77"} opacity={isActive ? 1 : 0.55} />
            {isActive ? (
              <motion.circle
                cx="24"
                cy={y}
                r="11"
                fill="none"
                stroke="#E8C77F"
                initial={{ opacity: 0.45, scale: 1 }}
                animate={{ opacity: 0, scale: 1.7 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}
