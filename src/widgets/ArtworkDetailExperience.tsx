"use client";

import { useEffect, useMemo, useState } from "react";

import type { Artwork } from "@/entities/artwork/types";
import { getArtworkMusic, useMusicStore } from "@/features/player/store";
import { TIMELINE_ERAS } from "@/shared/constants/timeline";
import { FloatingNav } from "@/shared/ui/FloatingNav";
import { GoldButton } from "@/shared/ui/GoldButton";
import { GoldDivider } from "@/shared/ui/GoldDivider";
import { KenBurnsBackground } from "@/shared/ui/KenBurnsBackground";
import { MetaRow } from "@/shared/ui/MetaRow";
import { Preloader } from "@/processes/Preloader";

type ArtworkDetailExperienceProps = {
  artwork: Artwork;
};

export function ArtworkDetailExperience({ artwork }: ArtworkDetailExperienceProps) {
  const [ready, setReady] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const setCurrentTrack = useMusicStore((state) => state.setCurrentTrack);

  const track = useMemo(() => {
    const eraMusic = TIMELINE_ERAS.find((era) => era.id === artwork.eraId)?.music;
    return getArtworkMusic(artwork.slug, eraMusic);
  }, [artwork.eraId, artwork.slug]);

  useEffect(() => {
    if (!ready) return;
    setCurrentTrack(track);
  }, [track, ready, setCurrentTrack]);

  return (
    <>
      <Preloader imageSources={[artwork.img]} onReady={() => setReady(true)} />
      <FloatingNav items={[{ href: "/gallery", label: "Gallery" }, { href: "/timeline", label: "Timeline" }]} />
      <main className="relative z-10 h-screen overflow-hidden">
        <KenBurnsBackground src={artwork.img} alt={artwork.title} priority onPortraitDetected={setIsPortrait} />
        {!isPortrait && (
          <>
            <div className="absolute inset-0 z-[2] bg-[linear-gradient(90deg,transparent_35%,rgba(28,24,20,0.88)_76%)]" />
            <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_30%_50%,transparent_28%,rgba(28,24,20,0.55)_100%)]" />
          </>
        )}
        <div className="relative z-20 flex h-full items-end justify-end px-4 pb-6 pt-24 md:items-center md:px-10 md:pb-0">
          <div className="w-full max-w-[520px] border-l border-codex-gold/25 bg-codex-dark/58 px-8 py-8 backdrop-blur-xl md:px-10 md:py-10">
            <div className="font-heading text-[11px] uppercase tracking-[0.22em] text-codex-gold">
              {artwork.period} · {artwork.era}
            </div>
            <h1 className="mt-4 font-heading text-3xl leading-tight text-codex-parchment md:text-5xl">
              {artwork.title}
            </h1>
            <p className="mt-3 text-lg italic text-codex-gold md:text-xl">
              {artwork.artist}, {artwork.year}
            </p>
            <GoldDivider width={120} className="mt-5" />
            {artwork.description ? (
              <p className="mt-6 text-lg leading-8 text-codex-parchment/88">
                {artwork.description}
              </p>
            ) : null}
            <div className="mt-6 space-y-3">
              {artwork.medium ? <MetaRow label="Medium" value={artwork.medium} /> : null}
              {artwork.dimensions ? <MetaRow label="Dimensions" value={artwork.dimensions} /> : null}
              {artwork.location ? <MetaRow label="Location" value={artwork.location} /> : null}
            </div>
            <GoldDivider width={100} className="mt-6" />
            {artwork.creditLine ? (
              <p className="mt-4 text-sm italic text-codex-parchment/50">
                {artwork.creditLine}
              </p>
            ) : null}
            <div className="mt-7 flex flex-wrap gap-4">
              {artwork.isMet && artwork.metUrl ? (
                <a
                  href={artwork.metUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 border border-codex-gold/40 bg-transparent px-5 py-3 font-heading text-[11px] uppercase tracking-[0.24em] text-codex-gold transition-all duration-300 hover:border-codex-glow hover:text-codex-glow"
                >
                  View on Met Museum
                </a>
              ) : (
                <GoldButton href="/timeline" label="View in Timeline" />
              )}
              <GoldButton href="/gallery" label="Back to Gallery" secondary />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
