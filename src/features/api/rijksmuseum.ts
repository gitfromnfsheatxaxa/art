/**
 * Rijksmuseum Collection API
 * https://data.rijksmuseum.nl/docs/search
 *
 * No API key required for basic search and object details.
 * Next.js `{ next: { revalidate } }` caches responses at the edge.
 * Uses stable high-resolution image URLs from Rijksmuseum.
 */

import type { Artwork } from "@/entities/artwork/types";
import type { GalleryItem } from "@/features/api/types";

const RIJKSMUSEUM_BASE = "https://www.rijksmuseum.nl/api/en/collection";
const RIJKSMUSEUM_SEARCH_BASE = "https://www.rijksmuseum.nl/api/en/collection";

// ── Rijksmuseum API Response Types ────────────────────────────────────────

export type RijksmuseumArtObject = {
  links: {
    self: string;
    web: string;
  };
  id: string;
  objectNumber: string;
  title: string;
  hasImage: boolean;
  principalOrFirstMaker: string;
  longTitle: string;
  showImage: boolean;
  permitDownload: boolean;
  webImage?: {
    guid: string;
    offsetPercentageX: number;
    offsetPercentageY: number;
    width: number;
    height: number;
    url: string;
  };
  headerImage?: {
    guid: string;
    offsetPercentageX: number;
    offsetPercentageY: number;
    width: number;
    height: number;
    url: string;
  };
  productionPlaces: string[];
};

export type RijksmuseumSearchResult = {
  elapsedMilliseconds: number;
  count: number;
  artObjects: RijksmuseumArtObject[];
};

export type RijksmuseumDetailResult = {
  elapsedMilliseconds: number;
  artObject: RijksmuseumArtObject & {
    scLabelLine?: string;
    label?: {
      title?: string;
      makerLine?: string;
      description?: string;
      notes?: string;
      date?: string;
    };
    objectTypes: string[];
    objectCollection: string[];
    makers: Array<{
      name: string;
      unFixedName: string;
      placeOfBirth: string;
      dateOfBirth: string;
      dateOfDeath: string;
      placeOfDeath: string;
      occupation: string[];
      roles: string[];
      nationality: string;
    }>;
    historicalPersons: string[];
    inscriptions: string[];
    documentation: string[];
    catRefRPK: string[];
    principalMakers: Array<{
      name: string;
      unFixedName: string;
      placeOfBirth: string;
      dateOfBirth: string;
      dateOfDeath: string;
      placeOfDeath: string;
      occupation: string[];
      roles: string[];
      nationality: string;
    }>;
    plaqueDescriptionDutch?: string;
    plaqueDescriptionEnglish?: string;
    principalMaker: string;
    artistRole?: string;
    associations: string[];
    acquisition: {
      method: string;
      date: string;
      creditLine: string;
    };
    exhibitions: string[];
    materials: string[];
    techniques: string[];
    productionPlaces: string[];
    dating: {
      presentingDate: string;
      sortingDate: number;
      period: number;
      yearEarly: number;
      yearLate: number;
    };
    classification: {
      iconClassIdentifier: string[];
      iconClassDescription: string[];
      motifs: string[];
      events: string[];
      periods: string[];
      places: string[];
      people: string[];
      objectNames: string[];
    };
    hasImage: boolean;
    historicalContext: string[];
    otherContent: string[];
    colors: Array<{
      percentage: number;
      hex: string;
    }>;
    colorsWithNormalization: Array<{
      originalHex: string;
      normalizedHex: string;
    }>;
    normalizedColors: Array<{
      percentage: number;
      hex: string;
    }>;
    normalized32Colors: Array<{
      percentage: number;
      hex: string;
    }>;
    titles: string[];
    description: string;
    labelText?: string;
    objectType: string;
    location: string;
    dimensions: Array<{
      unit: string;
      type: string;
      part: string;
      value: string;
    }>;
    materialsThesaurus: string[];
    techniquesThesaurus: string[];
    productionPlacesThesaurus: string[];
    titlesThesaurus: string[];
    notesThesaurus: string[];
    objectCollectionThesaurus: string[];
    plaqueDescription: string;
    artist: string;
    url: string;
  };
};

// ── Curated Rijksmuseum artwork IDs ─────────────────────────────────────
// Featured public-domain works from Rijksmuseum collection
export const FEATURED_RIJKSMUSEUM_IDS: string[] = [
  "SK-C-5",        // The Night Watch - Rembrandt
  "SK-A-1505",     // The Jewish Bride - Rembrandt
  "SK-A-2344",     // The Milkmaid - Vermeer
  "SK-A-1718",     // Self-Portrait - Rembrandt (1669)
  "SK-A-4691",     // The Windmill at Wijk bij Duurstede - Jacob van Ruisdael
  "SK-A-4050",     // Still Life with Flowers - Rachel Ruysch
  "SK-A-4877",     // Portrait of a Woman - Frans Hals
  "SK-A-3984",     // The Anatomy Lesson of Dr. Nicolaes Tulp - Rembrandt
  "SK-C-216",      // The Merry Family - Jan Steen
  "SK-A-305",      // Winter Landscape - Hendrick Avercamp
];

// ── Era mapping helpers ────────────────────────────────────────────────────

function getEraId(yearEarly: number, yearLate: number): string {
  const mid = Math.round((yearEarly + yearLate) / 2);
  if (mid < 0) return "prehistoric";
  if (mid < 500) return "classical";
  if (mid < 1000) return "early-medieval";
  if (mid < 1500) return "late-medieval";
  if (mid < 1700) return "renaissance";
  if (mid < 1900) return "enlightenment";
  return "modern";
}

const ERA_LABEL: Record<string, string> = {
  prehistoric: "Prehistoric Art",
  classical: "Classical Antiquity",
  "early-medieval": "Early Medieval",
  "late-medieval": "Late Medieval & Early Renaissance",
  renaissance: "High Renaissance & Baroque",
  enlightenment: "Enlightenment & Romanticism",
  modern: "Modern & Contemporary",
};

const ERA_PERIOD: Record<string, string> = {
  prehistoric: "Before Christ",
  classical: "0 - 500 AD",
  "early-medieval": "500 - 1000 AD",
  "late-medieval": "1000 - 1500 AD",
  renaissance: "1500 - 1700 AD",
  enlightenment: "1700 - 1900 AD",
  modern: "1900 - Present",
};

// ── Transform raw API object ───────────────────────────────────────────────

function transformToArtwork(raw: RijksmuseumDetailResult["artObject"]): Artwork {
  const eraId = getEraId(raw.dating.yearEarly, raw.dating.yearLate);
  const slug = `rijks-${raw.objectNumber.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}`;

  // Get the highest resolution image available
  const imageUrl = raw.webImage?.url || raw.headerImage?.url || "";

  // Format dimensions
  const dimensions = raw.dimensions
    ?.map(d => `${d.value} ${d.unit}`)
    .join(" × ") || undefined;

  // Format description
  const description = raw.label?.description ||
                     raw.plaqueDescriptionEnglish ||
                     raw.description ||
                     undefined;

  return {
    slug,
    title: raw.title || raw.longTitle || "Untitled",
    artist: raw.principalMaker || raw.artist || "Unknown",
    year: raw.dating.presentingDate || "Unknown",
    img: imageUrl,
    era: ERA_LABEL[eraId] ?? "Unknown Era",
    eraId,
    period: ERA_PERIOD[eraId] ?? "",
    medium: raw.materials?.join(", ") || raw.objectType || undefined,
    dimensions,
    location: "Rijksmuseum, Amsterdam",
    description,
    isMet: false, // Not from Met Museum
  };
}

function transformToGalleryItem(raw: RijksmuseumArtObject): GalleryItem {
  const eraId = getEraId(1500, 1700); // Default to renaissance era for gallery items
  const slug = `rijks-${raw.objectNumber.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}`;

  return {
    slug,
    detailHref: `/artwork/${slug}`,
    isMet: false, // Not from Met Museum
    title: raw.title || raw.longTitle || "Untitled",
    artist: raw.principalOrFirstMaker || "Unknown",
    year: "17th century", // Approximate for gallery view
    img: raw.webImage?.url || raw.headerImage?.url || "",
    description: raw.longTitle || `A masterpiece from the Rijksmuseum collection.`,
    period: ERA_PERIOD[eraId] ?? "",
    era: ERA_LABEL[eraId] ?? "Renaissance & Baroque",
    medium: undefined,
    dimensions: undefined,
    location: "Rijksmuseum, Amsterdam",
  };
}

// ── Fetch helpers ──────────────────────────────────────────────────────────

/**
 * Fetch a single Rijksmuseum artwork by object number.
 * Returns null if the artwork has no image or the request fails.
 */
export async function fetchRijksmuseumArtwork(objectNumber: string): Promise<Artwork | null> {
  try {
    const res = await fetch(`${RIJKSMUSEUM_BASE}/${objectNumber}`, {
      next: { revalidate: 86400 }, // cache 24 h
    });
    if (!res.ok) return null;
    const data = (await res.json()) as RijksmuseumDetailResult;
    const raw = data.artObject;
    if (!raw.hasImage || !raw.webImage?.url) return null;
    return transformToArtwork(raw);
  } catch {
    return null;
  }
}

/**
 * Fetch a single Rijksmuseum artwork as a `GalleryItem` for the slide gallery.
 */
async function fetchRijksmuseumGalleryItem(objectNumber: string): Promise<GalleryItem | null> {
  try {
    const res = await fetch(`${RIJKSMUSEUM_BASE}/${objectNumber}`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as RijksmuseumDetailResult;
    const raw = data.artObject;
    if (!raw.hasImage || !raw.webImage?.url) return null;

    // Create a simplified gallery item from detailed data
    const eraId = getEraId(raw.dating.yearEarly, raw.dating.yearLate);
    const slug = `rijks-${raw.objectNumber.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}`;

    return {
      slug,
      detailHref: `/artwork/${slug}`,
      isMet: false,
      title: raw.title || raw.longTitle || "Untitled",
      artist: raw.principalMaker || raw.artist || "Unknown",
      year: raw.dating.presentingDate || "Unknown",
      img: raw.webImage.url,
      description: raw.label?.description ||
                  raw.plaqueDescriptionEnglish ||
                  raw.description ||
                  `A masterpiece from the Rijksmuseum collection.`,
      period: ERA_PERIOD[eraId] ?? "",
      era: ERA_LABEL[eraId] ?? "Renaissance & Baroque",
      medium: raw.materials?.join(", ") || raw.objectType || undefined,
      dimensions: raw.dimensions?.map(d => `${d.value} ${d.unit}`).join(" × ") || undefined,
      location: "Rijksmuseum, Amsterdam",
    };
  } catch {
    return null;
  }
}

/**
 * Fetch multiple Rijksmuseum artworks as `GalleryItem[]`.
 * Invalid IDs and failures are silently dropped.
 */
export async function fetchRijksmuseumGalleryItems(objectNumbers: string[]): Promise<GalleryItem[]> {
  const settled = await Promise.allSettled(objectNumbers.map((id) => fetchRijksmuseumGalleryItem(id)));
  return settled
    .filter((r): r is PromiseFulfilledResult<GalleryItem | null> => r.status === "fulfilled")
    .map((r) => r.value)
    .filter((item): item is GalleryItem => item !== null);
}

/**
 * Search the Rijksmuseum collection and return up to `limit` GalleryItems.
 * Only returns artworks with images.
 */
export async function searchRijksmuseumGallery(query: string, limit = 10): Promise<GalleryItem[]> {
  try {
    const res = await fetch(
      `${RIJKSMUSEUM_SEARCH_BASE}?q=${encodeURIComponent(query)}&p=1&ps=${limit}&imgonly=true`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];
    const data = (await res.json()) as RijksmuseumSearchResult;
    if (!data.artObjects?.length) return [];

    // Get detailed information for each artwork
    const objectNumbers = data.artObjects.map(obj => obj.objectNumber);
    return fetchRijksmuseumGalleryItems(objectNumbers);
  } catch {
    return [];
  }
}

/**
 * Get featured Rijksmuseum artworks for the gallery.
 * Falls back to static data if API fails.
 */
export async function getFeaturedRijksmuseumGallery(): Promise<GalleryItem[]> {
  try {
    return await fetchRijksmuseumGalleryItems(FEATURED_RIJKSMUSEUM_IDS);
  } catch {
    return []; // Will fallback to static data in the component
  }
}