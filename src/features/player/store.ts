import { create } from "zustand";

import { MUSIC } from "@/shared/constants/media";

// ── Vibe-based artwork → track mapping ────────────────────────────────────
// Keys are slugified artwork titles (lowercase, hyphens, no apostrophes).
export const artworkMusicMap: Record<string, string> = {
  // Dramatic / intense / dark
  "the-starry-night": MUSIC.diesIrae,
  "the-night-watch": MUSIC.diesIrae,
  "the-third-of-may-1808": MUSIC.lacrimosa,
  "saturn-devouring-his-son": MUSIC.lacrimosa,
  "the-raft-of-the-medusa": MUSIC.lacrimosa,
  "guernica": MUSIC.diesIrae,
  "the-scream": MUSIC.diesIrae,
  "les-demoiselles-davignon": MUSIC.diesIrae,
  "sistine-chapel-ceiling": MUSIC.lacrimosa,

  // Serene / elegant / portraiture
  "mona-lisa": MUSIC.canonInD,
  "girl-with-a-pearl-earring": MUSIC.gymnopedie,
  "fayum-mummy-portraits": MUSIC.gymnopedie,
  "the-arnolfini-portrait": MUSIC.gymnopedie,
  "the-birth-of-venus": MUSIC.canonInD,
  "wanderer-above-the-sea-of-fog": MUSIC.swanLake,
  "water-lilies": MUSIC.gymnopedie,
  "impression-sunrise": MUSIC.gymnopedie,

  // Passionate / emotional / romantic
  "the-kiss": MUSIC.romeoJuliet,
  "liberty-leading-the-people": MUSIC.romeoJuliet,
  "the-swing": MUSIC.hungarianDance,

  // Light / playful / festive
  "campbells-soup-cans": MUSIC.canCan,
  "nighthawks": MUSIC.furElise,
  "the-persistence-of-memory": MUSIC.gymnopedie,
};

/**
 * Returns the most fitting classical track for a given artwork.
 * Falls back to the provided era track, then Canon in D.
 */
export function getArtworkMusic(slug: string, eraTrack?: string | null): string {
  return artworkMusicMap[slug] ?? eraTrack ?? MUSIC.canonInD;
}

// ── Zustand store ─────────────────────────────────────────────────────────

type MusicState = {
  currentTrack: string | null;
  interactionReady: boolean;
  musicEnabled: boolean;
  setCurrentTrack: (track: string | null) => void;
  unlockInteraction: () => void;
  toggleMusicEnabled: () => void;
};

export const useMusicStore = create<MusicState>((set) => ({
  currentTrack: null,
  interactionReady: false,
  musicEnabled: true,
  setCurrentTrack: (currentTrack) => set({ currentTrack }),
  unlockInteraction: () => set({ interactionReady: true }),
  toggleMusicEnabled: () => set((state) => ({ musicEnabled: !state.musicEnabled })),
}));
