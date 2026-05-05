import type { HomeSection } from "@/entities/artwork/types";

// portrait paintings need top-biased object-position so faces stay in frame
const TOP = "50% 15%";
const MID_TOP = "50% 22%";

export const DESKTOP_SECTIONS: HomeSection[] = [
  { id: "hero", art: "/images/backgrounds/1-last-supper.webp", title: "The Last Supper", artist: "Leonardo da Vinci" },
  { id: "school", art: "/images/backgrounds/2-school-of-athens.webp", title: "The School of Athens", artist: "Raphael" },
  { id: "wedding", art: "/images/backgrounds/3-wedding-at-cana.webp", title: "The Wedding at Cana", artist: "Paolo Veronese" },
  { id: "starry", art: "/images/backgrounds/4-starry-night.webp", title: "The Starry Night", artist: "Vincent van Gogh" },
  { id: "nightwatch", art: "/images/backgrounds/5-night-watch.webp", title: "The Night Watch", artist: "Rembrandt" },
  { id: "delft", art: "/images/backgrounds/6-view-of-delft.webp", title: "View of Delft", artist: "Johannes Vermeer" },
  { id: "prehistoric", art: "/images/backgrounds/1-prehistoric.webp", title: "Chauvet Cave Paintings", artist: "Unknown" },
  { id: "kells", art: "/images/backgrounds/3-book-of-kells.webp", title: "Book of Kells", artist: "Celtic Monks" },
  { id: "arnolfini", art: "/images/backgrounds/4-arnolfini.webp", title: "The Arnolfini Portrait", artist: "Jan van Eyck", bgPosition: MID_TOP },
  { id: "castiglione", art: "/images/backgrounds/4-castiglione.webp", title: "Portrait of Castiglione", artist: "Raphael", bgPosition: TOP },
  { id: "lacemaker", art: "/images/backgrounds/6-lacemaker.webp", title: "The Lacemaker", artist: "Johannes Vermeer", bgPosition: MID_TOP },
  { id: "mona-lisa", art: "/images/backgrounds/1-mona-lisa.webp", title: "Mona Lisa", artist: "Leonardo da Vinci", bgPosition: TOP },
  { id: "ermine", art: "/images/backgrounds/2-lady-with-ermine.webp", title: "Lady with an Ermine", artist: "Leonardo da Vinci", bgPosition: TOP },
  { id: "pearl", art: "/images/backgrounds/3-girl-with-pearl-earring.webp", title: "Girl with a Pearl Earring", artist: "Johannes Vermeer", bgPosition: TOP },
  { id: "durer", art: "/images/backgrounds/5-durer-self-portrait.webp", title: "Self-Portrait", artist: "Albrecht Dürer", bgPosition: TOP },
  { id: "kiss", art: "/images/backgrounds/7-the-kiss.webp", title: "The Kiss", artist: "Gustav Klimt", bgPosition: "50% 35%" },
];

export const MOBILE_SECTIONS: HomeSection[] = [
  { id: "hero", art: "/images/backgrounds/1-mona-lisa.webp", title: "Mona Lisa", artist: "Leonardo da Vinci", bgPosition: TOP },
  { id: "pearl", art: "/images/backgrounds/3-girl-with-pearl-earring.webp", title: "Girl with a Pearl Earring", artist: "Johannes Vermeer", bgPosition: TOP },
  { id: "ermine", art: "/images/backgrounds/2-lady-with-ermine.webp", title: "Lady with an Ermine", artist: "Leonardo da Vinci", bgPosition: TOP },
  { id: "durer", art: "/images/backgrounds/5-durer-self-portrait.webp", title: "Self-Portrait", artist: "Albrecht Dürer", bgPosition: TOP },
  { id: "arnolfini", art: "/images/backgrounds/4-arnolfini.webp", title: "The Arnolfini Portrait", artist: "Jan van Eyck", bgPosition: MID_TOP },
  { id: "castiglione", art: "/images/backgrounds/4-castiglione.webp", title: "Portrait of Castiglione", artist: "Raphael", bgPosition: TOP },
  { id: "lacemaker", art: "/images/backgrounds/6-lacemaker.webp", title: "The Lacemaker", artist: "Johannes Vermeer", bgPosition: MID_TOP },
  { id: "kiss", art: "/images/backgrounds/7-the-kiss.webp", title: "The Kiss", artist: "Gustav Klimt", bgPosition: "50% 35%" },
  { id: "kells", art: "/images/backgrounds/3-book-of-kells.webp", title: "Book of Kells", artist: "Celtic Monks" },
  { id: "prehistoric", art: "/images/backgrounds/1-prehistoric.webp", title: "Chauvet Cave Paintings", artist: "Unknown" },
  { id: "supper", art: "/images/backgrounds/1-last-supper.webp", title: "The Last Supper", artist: "Leonardo da Vinci" },
  { id: "school", art: "/images/backgrounds/2-school-of-athens.webp", title: "The School of Athens", artist: "Raphael" },
  { id: "wedding", art: "/images/backgrounds/3-wedding-at-cana.webp", title: "The Wedding at Cana", artist: "Paolo Veronese" },
  { id: "starry", art: "/images/backgrounds/4-starry-night.webp", title: "The Starry Night", artist: "Vincent van Gogh" },
  { id: "nightwatch", art: "/images/backgrounds/5-night-watch.webp", title: "The Night Watch", artist: "Rembrandt" },
  { id: "delft", art: "/images/backgrounds/6-view-of-delft.webp", title: "View of Delft", artist: "Johannes Vermeer" },
];
