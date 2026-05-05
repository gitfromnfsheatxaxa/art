"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Music2 } from "lucide-react";

import { useMusicStore } from "@/features/player/store";
import { cn } from "@/shared/lib/utils";

type FloatingNavProps = {
  items: Array<{ href: string; label: string }>;
  brandHref?: string;
  className?: string;
};

export function FloatingNav({ items, brandHref = "/", className }: FloatingNavProps) {
  const pathname = usePathname();
  const musicEnabled = useMusicStore((state) => state.musicEnabled);
  const toggleMusicEnabled = useMusicStore((state) => state.toggleMusicEnabled);

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn("fixed inset-x-0 top-0 z-50", className)}
    >
      {/* Full-width gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-codex-dark/80 via-codex-dark/35 to-transparent" />

      <div className="relative flex items-center justify-between px-6 py-5 md:px-12">
        <Link
          href={brandHref}
          className="font-heading text-[11px] uppercase tracking-[0.32em] text-codex-gold transition-colors duration-300 hover:text-codex-glow md:text-sm"
        >
          Codex Luminara
        </Link>

        <nav className="flex items-center gap-5 md:gap-8">
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative font-heading text-[10px] uppercase tracking-[0.22em] transition-colors duration-300 md:text-[11px]",
                  isActive
                    ? "text-codex-gold"
                    : "text-codex-parchment/60 hover:text-codex-parchment/90",
                )}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-codex-gold"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
              </Link>
            );
          })}
          
          {/* Music toggle button */}
          <button
            onClick={toggleMusicEnabled}
            className={cn(
              "flex items-center justify-center transition-colors duration-300",
              musicEnabled
                ? "text-codex-gold hover:text-codex-glow"
                : "text-codex-parchment/40 hover:text-codex-parchment/60",
            )}
            aria-label={musicEnabled ? "Mute music" : "Unmute music"}
            title={musicEnabled ? "Mute music" : "Unmute music"}
          >
            <Music2 size={18} />
          </button>
        </nav>
      </div>
    </motion.header>
  );
}
