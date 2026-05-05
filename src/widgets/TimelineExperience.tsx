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
  const currentBg = hoveredBg ?? currentEra.defaultBg;

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

  const imageSources = useMemo(
    () =>
      TIMELINE_ERAS.flatMap((era) => [
        era.defaultBg,
        ...era.entries.map((entry) => entry.img),
      ]),
    [],
  );

  const audioSources = useMemo(() => TIMELINE_ERAS.map((era) => era.music), []);

  return (
    <>
      <Preloader imageSources={imageSources} audioSources={audioSources} onReady={() => setPreloaded(true)} />
      <FloatingNav items={[{ href: "/", label: "Home" }, { href: "/gallery", label: "Gallery" }]} />
      <main className="relative z-10 h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBg}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65 }}
          >
            <KenBurnsBackground
              src={currentBg}
              priority
              objectPosition={hoveredBg ? "50% 50%" : currentEra.defaultBgPosition}
            />
          </motion.div>
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

          <div className="relative w-full max-w-md md:hidden">
            <div className="border border-codex-gold/20 bg-codex-dark/42 p-6 backdrop-blur-xl">
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
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-center">
          <div className="font-heading text-[11px] uppercase tracking-[0.22em] text-codex-gold/85">
            {activeEra + 1} / {TIMELINE_ERAS.length}
          </div>
        </div>
      </main>
    </>
  );
}
