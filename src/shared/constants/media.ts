// ── Classical music tracks ─────────────────────────────────────────────────
// Place these files in /public/music/ before shipping.
// Required filenames:
//   lacrimosa.mp3      – Requiem K.626 – Lacrimosa (Mozart)
//   swan-lake.mp3      – Swan Lake Suite (Tchaikovsky)
//   romeo-juliet.mp3   – Romeo and Juliet Fantasy Overture (Tchaikovsky)
//   dies-irae.mp3      – Requiem – Dies Irae (Mozart)
//   hungarian-dance.mp3 – Hungarian Dance No. 5 (Brahms)
//   fur-elise.mp3      – Für Elise (Beethoven)
//   canon-in-d.mp3     – Canon in D Major (Pachelbel)
//   gymnopedie.mp3     – Gymnopédie No. 1 (Erik Satie)
//   nutcracker.mp3     – The Nutcracker Op. 71 – Act 2 (Tchaikovsky)
//   can-can.mp3        – Can Can from Orpheus in the Underworld (Offenbach)

export const MUSIC = {
  lacrimosa: "/music/lacrimosa.mp3",
  swanLake: "/music/swan-lake.mp3",
  romeoJuliet: "/music/romeo-juliet.mp3",
  diesIrae: "/music/dies-irae.mp3",
  hungarianDance: "/music/hungarian-dance.mp3",
  furElise: "/music/fur-elise.mp3",
  canonInD: "/music/canon-in-d.mp3",
  gymnopedie: "/music/gymnopedie.mp3",
  nutcracker: "/music/nutcracker.mp3",
  canCan: "/music/can-can.mp3",
} as const;

// Home page: 5 dramatic / cinematic tracks cycling across all sections
export const homeSectionMusic = [
  MUSIC.lacrimosa,
  MUSIC.swanLake,
  MUSIC.romeoJuliet,
  MUSIC.diesIrae,
  MUSIC.hungarianDance,
] as const;

// Gallery page: 5 contemplative / elegant tracks cycling across artworks
export const galleryPageMusic = [
  MUSIC.furElise,
  MUSIC.canonInD,
  MUSIC.gymnopedie,
  MUSIC.nutcracker,
  MUSIC.canCan,
] as const;

// Timeline: one track per era, matched to historical mood
export const timelineEraMusic = [
  MUSIC.canonInD,       // 1 – Prehistoric  (timeless, structural)
  MUSIC.gymnopedie,     // 2 – Classical Antiquity  (serene, ancient)
  MUSIC.swanLake,       // 3 – Early Medieval  (mysterious, layered)
  MUSIC.romeoJuliet,    // 4 – Late Medieval & Early Renaissance  (passionate)
  MUSIC.lacrimosa,      // 5 – High Renaissance & Baroque  (solemn, grand)
  MUSIC.hungarianDance, // 6 – Enlightenment & Romanticism  (energetic, romantic)
  MUSIC.diesIrae,       // 7 – Modern & Contemporary  (dramatic, dissonant)
] as const;
