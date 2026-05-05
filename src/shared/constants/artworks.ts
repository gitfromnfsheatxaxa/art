import type { Artwork, FeaturedArtwork } from "@/entities/artwork/types";
import { TIMELINE_ERAS } from "@/shared/constants/timeline";
import { slugify } from "@/shared/lib/utils";

const ARTWORK_DETAILS: Record<string, Partial<Artwork>> = {
  "chauvet-cave-paintings": {
    medium: "Charcoal and ochre on limestone",
    dimensions: "Various",
    location: "Chauvet Cave, Ardeche, France",
    description:
      "Among the earliest known figurative drawings in the world, these paintings depict animals with astonishing dynamism and anatomical precision, rendered by firelight deep within a limestone cavern.",
  },

  "hall-of-bulls-lascaux": {
    medium: "Mineral pigments on limestone",
    dimensions: "Wall spans about 5.5 m",
    location: "Lascaux Cave, Dordogne, France",
    description:
      "A processional panorama of aurochs, horses, and deer whose sophistication reveals how ancient image-making was already tied to memory, ritual, and wonder.",
  },

  "narmer-palette": {
    medium: "Carved siltstone",
    dimensions: "64 cm x 42 cm",
    location: "Egyptian Museum, Cairo",
    description:
      "This ceremonial palette commemorates the unification of Upper and Lower Egypt, codifying visual symbols that endured for millennia.",
  },

  "pompeii-frescoes": {
    medium: "Fresco on plaster",
    dimensions: "Various",
    location: "Pompeii Archaeological Site, Italy",
    description:
      "Preserved beneath ash, these wall paintings reveal the visual richness of Roman domestic interiors and their love of illusionistic depth.",
  },

  "fayum-mummy-portraits": {
    medium: "Encaustic on wood",
    dimensions: "Various",
    location: "Various museums worldwide",
    description:
      "Hauntingly lifelike funerary portraits whose direct gaze feels startlingly modern, collapsing two thousand years in a single glance.",
  },

  "mosaic-of-justinian-i": {
    medium: "Glass and stone tesserae",
    dimensions: "Wall mosaic",
    location: "Basilica of San Vitale, Ravenna, Italy",
    description:
      "Imperial purple, gold shimmer, and ceremonial symmetry turn political authority into sacred image.",
  },

  "lindisfarne-gospels": {
    medium: "Ink and pigment on vellum",
    dimensions: "34 cm x 25 cm",
    location: "British Library, London",
    description:
      "A jewel of Insular manuscript art where interlace, ornament, and devotion meet in luminous detail.",
  },

  "book-of-kells-chi-rho": {
    medium: "Ink and pigment on vellum",
    dimensions: "33 cm x 24 cm",
    location: "Trinity College, Dublin",
    description:
      "The Chi Rho page transforms sacred text into a living field of ornament, animals, and hidden forms.",
  },

  "utrecht-psalter": {
    medium: "Ink on vellum",
    dimensions: "33 cm x 26 cm",
    location: "Utrecht University Library",
    description:
      "Its restless linework gives biblical scenes an expressive energy that feels centuries ahead of its time.",
  },

  "scrovegni-chapel-frescoes": {
    medium: "Fresco",
    dimensions: "Full chapel interior",
    location: "Scrovegni Chapel, Padua, Italy",
    description:
      "Giotto gives painting weight, grief, and human presence, helping usher in the emotional language of Renaissance art.",
  },

  "the-arnolfini-portrait": {
    medium: "Oil on oak panel",
    dimensions: "82 cm x 60 cm",
    location: "National Gallery, London",
    description:
      "Van Eyck turns domestic stillness into a study in light, texture, symbolism, and seeing.",
  },

  "the-birth-of-venus": {
    medium: "Tempera on canvas",
    dimensions: "172.5 cm x 278.9 cm",
    location: "Uffizi Gallery, Florence",
    description:
      "Venus arrives on the shore like a poetic apparition, classical myth reborn through Botticelli's lyrical line.",
  },

  "mona-lisa": {
    medium: "Oil on poplar panel",
    dimensions: "77 cm x 53 cm",
    location: "Musee du Louvre, Paris",
    description:
      "Leonardo's sfumato softens every edge into atmosphere, making her expression seem alive and perpetually unresolved.",
  },

  "sistine-chapel-ceiling": {
    medium: "Fresco",
    dimensions: "40 m x 14 m",
    location: "Sistine Chapel, Vatican City",
    description:
      "Michelangelo transforms the vault into a muscular cosmic drama whose figures still define the image of the divine.",
  },

  "the-night-watch": {
    medium: "Oil on canvas",
    dimensions: "363 cm x 437 cm",
    location: "Rijksmuseum, Amsterdam",
    description:
      "A group portrait reimagined as theater, momentum, and chiaroscuro in motion.",
  },

  "girl-with-a-pearl-earring": {
    medium: "Oil on canvas",
    dimensions: "44.5 cm x 39 cm",
    location: "Mauritshuis, The Hague",
    description:
      "Vermeer distills portraiture into one luminous turning moment, suspended between intimacy and mystery.",
  },

  "the-third-of-may-1808": {
    medium: "Oil on canvas",
    dimensions: "268 cm x 347 cm",
    location: "Museo del Prado, Madrid",
    description:
      "Goya's martyr in white becomes a modern icon of terror, witness, and protest.",
  },

  "liberty-leading-the-people": {
    medium: "Oil on canvas",
    dimensions: "260 cm x 325 cm",
    location: "Musee du Louvre, Paris",
    description:
      "Allegory and uprising collide as Liberty rises through smoke and bodies with the tricolor aloft.",
  },

  "impression-sunrise": {
    medium: "Oil on canvas",
    dimensions: "48 cm x 63 cm",
    location: "Musee Marmottan Monet, Paris",
    description:
      "Monet paints atmosphere rather than certainty, giving a movement its name through light alone.",
  },

  "the-starry-night": {
    medium: "Oil on canvas",
    dimensions: "73.7 cm x 92.1 cm",
    location: "Museum of Modern Art, New York",
    description:
      "Sky becomes pulse, weather becomes feeling, and the whole night trembles with motion.",
  },

  "les-demoiselles-davignon": {
    medium: "Oil on canvas",
    dimensions: "243.9 cm x 233.7 cm",
    location: "Museum of Modern Art, New York",
    description:
      "Picasso fractures inherited beauty into a radical new visual language.",
  },

  "the-persistence-of-memory": {
    medium: "Oil on canvas",
    dimensions: "24.1 cm x 33 cm",
    location: "Museum of Modern Art, New York",
    description:
      "Soft watches, still air, and surreal precision make time feel unstable and dreamlike.",
  },

  "campbells-soup-cans": {
    medium: "Synthetic polymer paint on canvas",
    dimensions: "32 canvases",
    location: "Museum of Modern Art, New York",
    description:
      "Warhol collapses commerce and art into repetition, sameness, and subtle difference.",
  },
};

const GALLERY_FEATURES = [
  {
    slug: "mona-lisa",
    galleryDesc:
      "The most recognized portrait in the world, where mystery, poise, and Leonardo's atmospheric touch still refuse to settle into certainty.",
  },

  {
    slug: "the-birth-of-venus",
    galleryDesc:
      "Botticelli's goddess arrives on a shell like a vision from antiquity, elegant and impossibly weightless.",
  },

  {
    slug: "sistine-chapel-ceiling",
    galleryDesc:
      "A painted heaven of muscular bodies, prophetic scale, and divine contact stretched across the vault.",
  },

  {
    slug: "girl-with-a-pearl-earring",
    galleryDesc:
      "A turning glance, parted lips, and a single pearl hold the entire room in stillness.",
  },

  {
    slug: "the-night-watch",
    galleryDesc:
      "Rembrandt breaks the group portrait open into theater, movement, and light gathered out of darkness.",
  },

  {
    slug: "the-starry-night",
    galleryDesc:
      "The sky swirls like thought itself, transforming observation into a luminous emotional weather.",
  },

  {
    slug: "liberty-leading-the-people",
    galleryDesc:
      "Revolution becomes myth as Liberty crosses the barricade through smoke, grief, and conviction.",
  },

  {
    slug: "the-arnolfini-portrait",
    galleryDesc:
      "A domestic interior made sacred by reflection, symbolism, and Van Eyck's jewel-like realism.",
  },

  {
    slug: "the-persistence-of-memory",
    galleryDesc:
      "Dali dissolves certainty into dream logic where time itself seems to sag in the heat.",
  },

  {
    slug: "impression-sunrise",
    galleryDesc:
      "Monet captures not a harbor but the sensation of dawn brushing water with color.",
  },
] as const;

export const ARTWORK_INDEX: Artwork[] = TIMELINE_ERAS.flatMap((era) =>
  era.entries.map((entry) => {
    const slug = slugify(entry.title);

    return {
      slug,
      title: entry.title,
      artist: entry.artist,
      year: entry.year,
      img: entry.img,
      era: era.label,
      eraId: era.id,
      period: era.period,
      ...ARTWORK_DETAILS[slug],
    };
  }),
);

export const GALLERY_ARTWORKS: FeaturedArtwork[] = GALLERY_FEATURES
  .map((feature) => {
    const artwork = ARTWORK_INDEX.find(
      (item) => item.slug === feature.slug,
    );

    if (!artwork) {
      console.warn(`Missing artwork for gallery feature: ${feature.slug}`);
      return null;
    }

    return {
      ...artwork,
      galleryDesc: feature.galleryDesc,
    };
  })
  .filter(Boolean) as FeaturedArtwork[];