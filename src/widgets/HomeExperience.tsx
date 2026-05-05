"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";

import { useMusicStore } from "@/features/player/store";
import { DESKTOP_SECTIONS, MOBILE_SECTIONS } from "@/shared/constants/home";
import { homeSectionMusic, timelineEraMusic } from "@/shared/constants/media";
import { GALLERY_ARTWORKS } from "@/shared/constants/artworks";
import { DropCap } from "@/shared/ui/DropCap";
import { FloatingNav } from "@/shared/ui/FloatingNav";
import { GalleryCard } from "@/shared/ui/GalleryCard";
import { GoldButton } from "@/shared/ui/GoldButton";
import { GoldDivider } from "@/shared/ui/GoldDivider";
import { KenBurnsBackground } from "@/shared/ui/KenBurnsBackground";
import { OrnatePanel } from "@/shared/ui/OrnatePanel";
import { PageProgress } from "@/shared/ui/PageProgress";
import { Preloader } from "@/processes/Preloader";

// ── Animation constants ────────────────────────────────────────────
const TRANSITION_MS = 1050;
const WHEEL_THRESHOLD = 80;
const HOME_SECTION_LIMIT = 6;

const bgVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1.4, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.9 } },
};

const contentVariants: Variants = {
  initial: (d: number) => ({ opacity: 0, y: d * 80 }),
  animate: { opacity: 1, y: 0, transition: { duration: 0.78, ease: [0.16, 1, 0.3, 1] } },
  exit: (d: number) => ({ opacity: 0, y: d * -48, transition: { duration: 0.38, ease: "easeIn" } }),
};

// ──────────────────────────────────────────────────────────────────

export function HomeExperience() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [preloaded, setPreloaded] = useState(false);

  const isTransitioning = useRef(false);
  const wheelAcc = useRef(0);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);

  const setCurrentTrack = useMusicStore((s) => s.setCurrentTrack);

  const artSections = useMemo(
    () => (isMobile ? MOBILE_SECTIONS : DESKTOP_SECTIONS).slice(0, HOME_SECTION_LIMIT),
    [isMobile],
  );
  const totalSections = artSections.length + 1; // art sections + gallery

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 1024);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // ── Navigation ──
  const goTo = useCallback(
    (index: number, dir: 1 | -1) => {
      if (isTransitioning.current) return;
      if (index < 0 || index >= totalSections) return;
      isTransitioning.current = true;
      setDirection(dir);
      setActiveSection(index);
      setTimeout(() => { isTransitioning.current = false; }, TRANSITION_MS);
    },
    [totalSections],
  );

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (isTransitioning.current) { wheelAcc.current = 0; return; }
      wheelAcc.current += e.deltaY;
      if (wheelAcc.current >= WHEEL_THRESHOLD) {
        wheelAcc.current = 0;
        goTo(activeSection + 1, 1);
      } else if (wheelAcc.current <= -WHEEL_THRESHOLD) {
        wheelAcc.current = 0;
        goTo(activeSection - 1, -1);
      }
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [activeSection, goTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") goTo(activeSection + 1, 1);
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft") goTo(activeSection - 1, -1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeSection, goTo]);

  // ── Music: cycle through 5 home tracks ──
  useEffect(() => {
    if (!preloaded) return;
    setCurrentTrack(homeSectionMusic[activeSection % homeSectionMusic.length] ?? null);
  }, [activeSection, preloaded, setCurrentTrack]);

  // Preload the first 6 background images for better performance
  const imageSources = useMemo(
    () => [
      ...DESKTOP_SECTIONS.slice(0, HOME_SECTION_LIMIT).map(s => s.art),
      ...MOBILE_SECTIONS.slice(0, HOME_SECTION_LIMIT).map(s => s.art),
    ],
    [],
  );

  const audioSources = useMemo(
    () => [...homeSectionMusic, ...timelineEraMusic].map(String),
    [],
  );

  const isGallerySection = activeSection === artSections.length;
  const currentSection = isGallerySection ? null : artSections[activeSection];
  const progress = (activeSection / Math.max(totalSections - 1, 1)) * 100;

  // Compact dots when there are many sections
  const manyDots = totalSections > 10;

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
          { href: "/gallery", label: "Gallery" },
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
          dy > 0 ? goTo(activeSection + 1, 1) : goTo(activeSection - 1, -1);
        }}
      >
        {/* ── Background layer: crossfades independently ── */}
        <AnimatePresence initial={false}>
          {currentSection ? (
            <motion.div
              key={`bg-${activeSection}`}
              variants={bgVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 z-0"
            >
              <KenBurnsBackground
                src={currentSection.art}
                direction={activeSection % 2 === 0 ? "in" : "out"}
                objectPosition={currentSection.bgPosition}
              />
            </motion.div>
          ) : (
            <motion.div
              key="bg-gallery"
              variants={bgVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(60,47,47,0.85),rgba(28,24,20,1))]"
            />
          )}
        </AnimatePresence>

        {/* ── Content layer: direction-aware slide ── */}
        <AnimatePresence initial={false} custom={direction}>
          {activeSection === 0 ? (
            /* ─ Hero: keep the ornate panel ─ */
            <motion.div
              key="content-hero"
              custom={direction}
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center"
            >
              <OrnatePanel className="max-w-3xl px-8 py-12 md:px-14 md:py-14">
                <h1 className="font-heading text-4xl text-codex-gold drop-shadow-[0_2px_14px_rgba(232,199,127,0.4)] md:text-6xl">
                  Codex Luminara
                </h1>
                <GoldDivider width={170} className="mx-auto mt-5" />
                <p className="mt-6 text-lg italic leading-8 text-codex-parchment/90 md:text-2xl md:leading-10">
                  <DropCap letter="A" />
                  rt Through the Ages — a living Renaissance manuscript where masterworks glow,
                  breathe, and unfold with quiet cinematic splendor.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <GoldButton href="/timeline" label="Enter the Timeline" />
                  <GoldButton href="/gallery" label="Explore the Gallery" secondary />
                </div>
              </OrnatePanel>
            </motion.div>
          ) : isGallerySection ? (
            /* ─ Gallery cards ─ */
            <motion.div
              key="content-gallery"
              custom={direction}
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 z-10 flex items-center overflow-hidden"
            >
              <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center gap-7 px-6">
                <h2 className="text-center font-heading text-3xl text-codex-gold md:text-5xl">
                  Famous Renaissance Masterworks
                </h2>
                <GoldDivider width={240} />
                <div className="hide-scrollbar flex w-full gap-6 overflow-x-auto px-2 pb-4 pt-2 md:px-8">
                  {GALLERY_ARTWORKS.map((artwork, i) => (
                    <motion.div
                      key={artwork.slug}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, delay: i * 0.08 + 0.2 }}
                      className="shrink-0"
                    >
                      <Link href={`/artwork/${artwork.slug}`}>
                        <GalleryCard
                          art={artwork.img}
                          title={artwork.title}
                          artist={artwork.artist}
                          year={artwork.year}
                        />
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <p className="text-sm italic text-codex-parchment/70">
                  Scroll sideways to leaf through the illuminated collection.
                </p>
              </div>
            </motion.div>
          ) : (
            /* ─ Art sections 1–N: bare floating text, no panel ─ */
            <motion.div
              key={`content-${activeSection}`}
              custom={direction}
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={`absolute inset-0 z-10 flex items-end px-8 pb-[14vh] md:px-16 ${
                activeSection % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <div className={`max-w-[480px] ${activeSection % 2 === 0 ? "text-left" : "text-right"}`}>
                <p className="mb-3 font-heading text-[10px] uppercase tracking-[0.3em] text-codex-gold/70 [text-shadow:0_1px_12px_rgba(0,0,0,0.95)]">
                  {String(activeSection).padStart(2, "0")} — Masterwork
                </p>
                <h2 className="font-heading text-4xl leading-tight text-codex-gold [text-shadow:0_2px_20px_rgba(0,0,0,1),0_0_40px_rgba(212,175,119,0.25)] md:text-6xl">
                  {currentSection?.title}
                </h2>
                <GoldDivider
                  width={90}
                  className={`mt-4 ${activeSection % 2 !== 0 ? "ml-auto" : ""}`}
                />
                <p className="mt-3 text-xl italic text-codex-parchment/95 [text-shadow:0_1px_14px_rgba(0,0,0,0.95)] md:text-2xl">
                  {currentSection?.artist}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Navigation dots ── */}
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5">
          {Array.from({ length: totalSections }).map((_, i) => (
            <button
              key={i}
              aria-label={`Go to section ${i + 1}`}
              onClick={() => goTo(i, i > activeSection ? 1 : -1)}
              className={[
                "rounded-full border transition-all duration-500",
                manyDots ? "h-[5px]" : "h-[7px]",
                i === activeSection
                  ? `bg-codex-gold border-codex-gold ${manyDots ? "w-3" : "w-8"}`
                  : `bg-transparent border-codex-gold/35 hover:border-codex-gold/65 hover:bg-codex-gold/20 ${manyDots ? "w-[5px]" : "w-[7px]"}`,
              ].join(" ")}
            />
          ))}
        </div>

        {/* ── Section counter ── */}
        <motion.div
          key={`counter-${activeSection}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45 }}
          className="absolute bottom-8 right-6 z-20 font-heading text-[10px] tracking-[0.2em] text-codex-gold/45 md:right-12"
        >
          {String(activeSection + 1).padStart(2, "0")} / {String(totalSections).padStart(2, "0")}
        </motion.div>

        {/* ── Scroll hint (hero only) ── */}
        <AnimatePresence>
          {activeSection === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="absolute bottom-16 left-1/2 z-20 -translate-x-1/2 animate-scroll-hint"
            >
              <svg width="22" height="34" viewBox="0 0 22 34" aria-hidden="true">
                <rect x="1" y="1" width="20" height="32" rx="10" stroke="#D4AF77" strokeWidth="1.5" fill="none" />
                <circle cx="11" cy="9" r="2" fill="#D4AF77">
                  <animate attributeName="cy" from="9" to="22" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="1" to="0.2" dur="2s" repeatCount="indefinite" />
                </circle>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
