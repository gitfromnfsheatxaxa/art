"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

import { useMusicStore } from "@/features/player/store";
import type { GalleryItem } from "@/features/api/types";
import { cn } from "@/shared/lib/utils";
import { GALLERY_ARTWORKS } from "@/shared/constants/artworks";
import { galleryPageMusic } from "@/shared/constants/media";
import { FloatingNav } from "@/shared/ui/FloatingNav";
import { GoldButton } from "@/shared/ui/GoldButton";
import { GoldDivider } from "@/shared/ui/GoldDivider";
import { KenBurnsBackground } from "@/shared/ui/KenBurnsBackground";
import { PageProgress } from "@/shared/ui/PageProgress";
import { Preloader } from "@/processes/Preloader";

// ── Animation variants (same language as HomeExperience) ──────────────────
const TRANSITION_MS = 1050;
const WHEEL_THRESHOLD = 80;

const bgVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1.4, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.9 } },
};

const panelVariants: Variants = {
  initial: (d: number) => ({ opacity: 0, y: d * 72 }),
  animate: { opacity: 1, y: 0, transition: { duration: 0.78, ease: [0.16, 1, 0.3, 1] } },
  exit: (d: number) => ({ opacity: 0, y: d * -44, transition: { duration: 0.38, ease: "easeIn" } }),
};

// ── Static fallback converter ─────────────────────────────────────────────
function staticToGalleryItem(a: (typeof GALLERY_ARTWORKS)[number]): GalleryItem {
  return {
    slug: a.slug,
    detailHref: `/artwork/${a.slug}`,
    isMet: false,
    title: a.title,
    artist: a.artist,
    year: a.year,
    img: a.img,
    description: a.galleryDesc,
    period: a.period,
    era: a.era,
    medium: a.medium,
    dimensions: a.dimensions,
    location: a.location,
  };
}

// ─────────────────────────────────────────────────────────────────────────

type GalleryExperienceProps = {
  /** Pre-fetched items from the server; falls back to static GALLERY_ARTWORKS. */
  items?: GalleryItem[];
};

export function GalleryExperience({ items }: GalleryExperienceProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [preloaded, setPreloaded] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  const isTransitioning = useRef(false);
  const wheelAcc = useRef(0);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);

  const setCurrentTrack = useMusicStore((s) => s.setCurrentTrack);

  // Use provided items or fall back to static data
  const galleryItems = useMemo<GalleryItem[]>(() => {
    if (items && items.length > 0) return items;
    return GALLERY_ARTWORKS.map(staticToGalleryItem);
  }, [items]);

  const total = galleryItems.length;
  const current = galleryItems[activeIndex];

  // ── Navigation ──
  const goTo = useCallback(
    (index: number, dir: 1 | -1) => {
      if (isTransitioning.current) return;
      if (index < 0 || index >= total) return;
      isTransitioning.current = true;
      setDirection(dir);
      setActiveIndex(index);
      setTimeout(() => { isTransitioning.current = false; }, TRANSITION_MS);
    },
    [total],
  );

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (isTransitioning.current) { wheelAcc.current = 0; return; }
      wheelAcc.current += e.deltaY;
      if (wheelAcc.current >= WHEEL_THRESHOLD) {
        wheelAcc.current = 0;
        goTo(activeIndex + 1, 1);
      } else if (wheelAcc.current <= -WHEEL_THRESHOLD) {
        wheelAcc.current = 0;
        goTo(activeIndex - 1, -1);
      }
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [activeIndex, goTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") goTo(activeIndex + 1, 1);
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft") goTo(activeIndex - 1, -1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, goTo]);

  // ── Music: cycle gallery tracks ──
  useEffect(() => {
    if (!preloaded) return;
    setCurrentTrack(galleryPageMusic[activeIndex % galleryPageMusic.length] ?? null);
  }, [activeIndex, preloaded, setCurrentTrack]);

  // Only preload first image + audio; rest load via next/image as user navigates
  const imageSources = useMemo(
    () => (galleryItems[0] ? [galleryItems[0].img] : []),
    [galleryItems],
  );
  const audioSources = useMemo(() => galleryPageMusic.map(String), []);

  const progress = total > 1 ? (activeIndex / (total - 1)) * 100 : 100;
  const even = activeIndex % 2 === 0;
  const manySlides = total > 14;

  return (
    <>
      <Preloader
        imageSources={imageSources}
        audioSources={audioSources}
        onReady={() => setPreloaded(true)}
      />
      <PageProgress progress={progress} />
      <FloatingNav
        items={[
          { href: "/", label: "Home" },
          { href: "/timeline", label: "Timeline" },
        ]}
      />

      {/* ═══ Fixed full-screen slide container ═══ */}
      <div
        className="fixed inset-0 overflow-hidden"
        onTouchStart={(e) => {
          touchStartY.current = e.touches[0].clientY;
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const dy = touchStartY.current - e.changedTouches[0].clientY;
          const dx = touchStartX.current - e.changedTouches[0].clientX;
          if (Math.abs(dy) < 50 || Math.abs(dx) > Math.abs(dy)) return;
          dy > 0 ? goTo(activeIndex + 1, 1) : goTo(activeIndex - 1, -1);
        }}
      >
        {/* ── Background crossfade ── */}
        <AnimatePresence initial={false}>
          <motion.div
            key={`bg-${activeIndex}`}
            variants={bgVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 z-0"
          >
            <KenBurnsBackground
              src={current.img}
              direction={even ? "in" : "out"}
              priority={activeIndex < 2}
              portraitContain
              onPortraitDetected={setIsPortrait}
            />
          </motion.div>
        </AnimatePresence>

        {/* ── Content panel slide ── */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={`panel-${activeIndex}`}
            custom={direction}
            variants={panelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`absolute inset-0 z-10 flex items-center px-6 md:px-16 ${even ? "justify-start" : "justify-end"
              }`}
          >
            <div className="max-w-[520px]">
              <div
                className={cn(
                  "py-8",
                  even
                    ? "border-l border-codex-gold/30 pl-8 text-left"
                    : "border-r border-codex-gold/30 pr-8 text-right",
                )}
              >
                {/* Period / era badge */}
                {(current.period || current.era) && (
                  <div className="font-heading text-[11px] uppercase tracking-[0.22em] text-codex-gold/70">
                    {[current.period, current.era].filter(Boolean).join(" · ")}
                    {current.isMet && (
                      <span className="ml-2 text-codex-gold/40">· Met Museum</span>
                    )}
                  </div>
                )}

                <h2 className="mt-3 font-heading text-3xl leading-tight text-codex-parchment md:text-5xl">
                  {current.title}
                </h2>
                <p className="mt-2 text-lg italic text-codex-gold md:text-xl">
                  {current.artist}, {current.year}
                </p>

                <GoldDivider
                  width={110}
                  className={cn("mt-5", !even && "ml-auto")}
                />

                <p className="mt-5 text-base leading-7 text-codex-parchment/82 md:text-lg md:leading-8">
                  {current.description}
                </p>

                <div className={cn("mt-8 flex gap-3", !even && "justify-end")}>
                  <GoldButton
                    href={current.detailHref}
                    label="Explore This Masterpiece"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Navigation dots ── */}
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5">
          {galleryItems.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to artwork ${i + 1}`}
              onClick={() => goTo(i, i > activeIndex ? 1 : -1)}
              className={[
                "rounded-full border transition-all duration-500",
                manySlides ? "h-[5px]" : "h-[7px]",
                i === activeIndex
                  ? `bg-codex-gold border-codex-gold ${manySlides ? "w-3" : "w-8"}`
                  : `bg-transparent border-codex-gold/35 hover:border-codex-gold/60 hover:bg-codex-gold/20 ${manySlides ? "w-[5px]" : "w-[7px]"}`,
              ].join(" ")}
            />
          ))}
        </div>

        {/* ── Artwork counter ── */}
        <motion.div
          key={`counter-${activeIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45 }}
          className="absolute bottom-8 right-6 z-20 font-heading text-[10px] tracking-[0.2em] text-codex-gold/45 md:right-12"
        >
          {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </motion.div>
      </div>
    </>
  );
}
