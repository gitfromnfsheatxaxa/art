"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useNavigationStore } from "@/features/navigation/store";
import { useMusicStore } from "@/features/player/store";
import { TIMELINE_ERAS } from "@/shared/constants/timeline";
import { FloatingNav } from "@/shared/ui/FloatingNav";
import { GoldDivider } from "@/shared/ui/GoldDivider";
import { KenBurnsBackground } from "@/shared/ui/KenBurnsBackground";
import { TimelineNavigationHints } from "@/shared/ui/TimelineNavigationHints";
import { Preloader } from "@/processes/Preloader";
import { TimelineEntryCard } from "@/shared/ui/TimelineEntryCard";
import { TimelineSVG } from "@/shared/ui/TimelineSVG";

export function TimelineExperience() {
  const activeEra = useNavigationStore((state) => state.timelineEra);
  const setActiveEra = useNavigationStore((state) => state.setTimelineEra);
  const setCurrentTrack = useMusicStore((state) => state.setCurrentTrack);
  const [hoveredBg, setHoveredBg] = useState<string | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [preloaded, setPreloaded] = useState(false);
  const wheelLock = useRef(false);
  const dragStart = useRef<number | null>(null);

  const currentEra = TIMELINE_ERAS[activeEra];

  const navigate = useCallback((direction: number) => {
    if (transitioning) {
      return;
    }

    const next = activeEra + direction;
    if (next < 0 || next >= TIMELINE_ERAS.length) {
      return;
    }

    setTransitioning(true);
    setHoveredBg(null);
    setActiveEra(next);
    window.setTimeout(() => setTransitioning(false), 760);
  }, [activeEra, setActiveEra, transitioning]);

  useEffect(() => {
    if (!preloaded) {
      return;
    }
    setCurrentTrack(currentEra.music);
  }, [currentEra.music, preloaded, setCurrentTrack]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        navigate(1);
      }
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        navigate(-1);
      }
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (wheelLock.current) {
        return;
      }
      wheelLock.current = true;
      if (event.deltaY > 16) {
        navigate(1);
      } else if (event.deltaY < -16) {
        navigate(-1);
      }
      window.setTimeout(() => {
        wheelLock.current = false;
      }, 760);
    };

    const onPointerDown = (event: PointerEvent) => {
      dragStart.current = event.clientY;
    };

    const onPointerUp = (event: PointerEvent) => {
      if (dragStart.current == null) {
        return;
      }
      const delta = dragStart.current - event.clientY;
      if (Math.abs(delta) > 48) {
        navigate(delta > 0 ? 1 : -1);
      }
      dragStart.current = null;
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [navigate]);

  // OPTIMIZATION: Only preload first era background immediately
  // Other eras preload in background without blocking FCP
  const heroImageSource = useMemo(
    () => [TIMELINE_ERAS[0]?.defaultBg || ""],
    [],
  );

  const backgroundImageSources = useMemo(
    () => TIMELINE_ERAS.slice(1).map((era) => era.defaultBg),
    [],
  );

  return (
    <>
      <Preloader
        imageSources={heroImageSource}
        backgroundImages={backgroundImageSources}
        onReady={() => setPreloaded(true)}
      />
      <FloatingNav items={[{ href: "/", label: "Home" }, { href: "/gallery", label: "Gallery" }]} />
      <TimelineNavigationHints />
      <main className="relative z-10 h-screen overflow-hidden">
        {/* Layer 1: era background — stable, only remounts on era navigation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentEra.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65 }}
          >
            <KenBurnsBackground
              src={currentEra.defaultBg}
              priority
              active={!transitioning}
              objectPosition={currentEra.defaultBgPosition}
            />
          </motion.div>
        </AnimatePresence>

        {/* Layer 2: artwork hover/touch preview — cross-dissolves independently over Layer 1 */}
        <AnimatePresence>
          {hoveredBg && (
            <motion.div
              key={hoveredBg}
              className="absolute inset-0 z-[1]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
            >
              <KenBurnsBackground src={hoveredBg} active portraitContain objectPosition="50% 50%" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="absolute inset-0 z-[2] bg-[radial-gradient(circle,rgba(232,199,127,0.15),transparent_58%)]"
          animate={{ opacity: transitioning ? 1 : hoveredBg ? 0.8 : 0.35 }}
          transition={{ duration: 0.5 }}
        />
        <TimelineSVG activeEra={activeEra} totalEras={TIMELINE_ERAS.length} />

        <div className="relative z-20 flex h-full items-center justify-center px-5 pt-20 md:px-10">
          <div className="absolute left-[5%] top-1/2 hidden w-[calc(45%-40px)] -translate-y-1/2 flex-col items-end gap-4 md:flex">
            <motion.div
              key={currentEra.id}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-2 text-right"
            >
              <div className="font-heading text-sm uppercase tracking-[0.18em] text-codex-gold">{currentEra.period}</div>
              <div className="mt-2 font-heading text-3xl leading-tight text-codex-parchment md:text-5xl">
                {currentEra.label}
              </div>
              <GoldDivider width={150} className="ml-auto mt-4" />
            </motion.div>
            {currentEra.entries
              .filter((_, index) => index % 2 === 0)
              .map((entry, index) => (
                <TimelineEntryCard
                  key={entry.title}
                  entry={entry}
                  side="left"
                  index={index}
                  active={!transitioning}
                  onHover={setHoveredBg}
                />
              ))}
          </div>

          <div className="absolute right-[5%] top-1/2 hidden w-[calc(45%-40px)] -translate-y-1/2 flex-col items-start gap-4 pt-16 md:flex">
            {currentEra.entries
              .filter((_, index) => index % 2 === 1)
              .map((entry, index) => (
                <TimelineEntryCard
                  key={entry.title}
                  entry={entry}
                  side="right"
                  index={index + 1}
                  active={!transitioning}
                  onHover={setHoveredBg}
                />
              ))}
          </div>

          {/* Mobile layout — reduced opacity so background shows through */}
          <div className="relative w-full max-w-md md:hidden">
            <div className="border border-codex-gold/20 bg-codex-dark/15 p-6 backdrop-blur-md">
              <div className="font-heading text-xs uppercase tracking-[0.18em] text-codex-gold">{currentEra.period}</div>
              <h1 className="mt-3 font-heading text-3xl text-codex-parchment">{currentEra.label}</h1>
              <GoldDivider width={140} className="mt-4" />
              <div className="mt-5 space-y-3">
                {currentEra.entries.map((entry, index) => (
                  <TimelineEntryCard
                    key={entry.title}
                    entry={entry}
                    side="right"
                    index={index}
                    active={!transitioning}
                    onHover={setHoveredBg}
                    onTouchPreview={setHoveredBg}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-center">
          <motion.div
            key={activeEra}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                disabled={activeEra === 0}
                className="rounded-full border border-codex-gold/30 p-2 transition-all hover:border-codex-gold/60 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Previous era"
                title="Previous era"
              >
                <svg className="h-4 w-4 text-codex-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="font-heading text-xs uppercase tracking-[0.22em] text-codex-gold/85">
                <span className="text-base font-bold">{activeEra + 1}</span>
                <span className="text-codex-gold/60"> / {TIMELINE_ERAS.length}</span>
              </div>

              <button
                onClick={() => navigate(1)}
                disabled={activeEra === TIMELINE_ERAS.length - 1}
                className="rounded-full border border-codex-gold/30 p-2 transition-all hover:border-codex-gold/60 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Next era"
                title="Next era"
              >
                <svg className="h-4 w-4 text-codex-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Progress bar */}
            <div className="flex items-center gap-1.5">
              {TIMELINE_ERAS.map((_, index) => (
                <motion.div
                  key={index}
                  className="h-1 rounded-full transition-all"
                  animate={{
                    width: index === activeEra ? 24 : 8,
                    backgroundColor: index <= activeEra ? "rgb(232, 199, 127)" : "rgba(232, 199, 127, 0.25)",
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
