"use client";

import { memo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import type { TimelineEntry } from "@/entities/era/types";
import { slugify } from "@/shared/lib/utils";

type TimelineEntryCardProps = {
  entry: TimelineEntry;
  side: "left" | "right";
  index: number;
  active: boolean;
  onHover: (img: string | null) => void;
  onTouchPreview?: (img: string | null) => void;
};

export const TimelineEntryCard = memo(function TimelineEntryCard({
  entry,
  side,
  index,
  active,
  onHover,
  onTouchPreview,
}: TimelineEntryCardProps) {
  const href = `/artwork/${slugify(entry.title)}`;

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: active ? 1 : 0,
        y: active ? 0 : 24,
      }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
    >
      <Link
        href={href}
        onMouseEnter={() => onHover(entry.img)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(entry.img)}
        onBlur={() => onHover(null)}
        onTouchStart={() => onTouchPreview?.(entry.img)}
        onTouchEnd={() => onTouchPreview?.(null)}
        className={`group flex ${side === "left" ? "justify-end text-right" : "justify-start text-left"}`}
      >
        <div className="max-w-[290px] border border-transparent bg-codex-dark/18 px-5 py-3 backdrop-blur-xl transition-all duration-300 group-hover:scale-[1.03] group-hover:border-codex-gold/40 group-hover:bg-codex-dark/35">
          <div className="font-heading text-[13px] tracking-[0.08em] text-codex-gold/80">{entry.year}</div>
          <div className="mt-1 font-heading text-base leading-tight text-codex-parchment">{entry.title}</div>
          <div className="mt-1 text-sm italic text-codex-parchment/75">{entry.artist}</div>
        </div>
      </Link>
    </motion.div>
  );
});
