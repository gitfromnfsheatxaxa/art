/**
 * Metropolitan Museum of Art — Open Access API
 * https://metmuseum.github.io
 *
 * No API key required. All data used here is public domain (isPublicDomain = true).
 * Next.js `{ next: { revalidate } }` caches responses at the edge for 24 h.
 */

import type { Artwork } from "@/entities/artwork/types";
import type { GalleryItem, MetApiObject, MetSearchResult } from "@/features/api/types";

const MET_BASE = "https://collectionapi.metmuseum.org/public/collection/v1";

// ── Curated public-domain artwork IDs ─────────────────────────────────────
// All verified public-domain works in the Met's Open Access collection.
export const FEATURED_MET_IDS: number[] = [
  436535,  // Wheat Field with Cypresses — Van Gogh (1889)
  436532,  // Self-Portrait with a Straw Hat — Van Gogh (1887)
  45434,   // The Great Wave off Kanagawa — Hokusai (1831)
  11417,   // Washington Crossing the Delaware — Leutze (1851)
  12127,   // Madame X — Sargent (1884)
  437881,  // Young Woman with a Water Pitcher — Vermeer (1660-62)
  435809,  // The Harvesters — Bruegel the Elder (1565)
  436105,  // The Death of Socrates — Jacques-Louis David (1787)
  436056,  // Portrait of a Young Woman — Pollaiuolo (1470s)
  437394,  // An Old Woman Cutting Her Nails — Rembrandt (1648)
];

// ── Era mapping helpers ────────────────────────────────────────────────────

function getEraId(beginDate: number, endDate: number): string {
  const mid = Math.round((beginDate + endDate) / 2);
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

function transformToArtwork(raw: MetApiObject): Artwork {
  const eraId = getEraId(raw.objectBeginDate, raw.objectEndDate);
  const slug = `met-${raw.objectID}`;
  const location = raw.GalleryNumber
    ? `Gallery ${raw.GalleryNumber}, ${raw.repository}`
    : raw.repository || "Metropolitan Museum of Art, New York";

  return {
    slug,
    title: raw.title || "Untitled",
    artist: raw.artistDisplayName || "Unknown",
    year: raw.objectDate || "Unknown",
    img: raw.primaryImage,
    era: ERA_LABEL[eraId] ?? "Unknown Era",
    eraId,
    period: ERA_PERIOD[eraId] ?? "",
    medium: raw.medium || undefined,
    dimensions: raw.dimensions || undefined,
    location,
    description: undefined, // Met descriptions require additional API calls
    creditLine: raw.creditLine || undefined,
    metUrl: raw.objectURL || undefined,
    isMet: true,
  };
}

function transformToGalleryItem(raw: MetApiObject): GalleryItem {
  const artwork = transformToArtwork(raw);
  return {
    slug: artwork.slug,
    detailHref: `/artwork/${artwork.slug}`,
    isMet: true,
    title: artwork.title,
    artist: artwork.artist,
    year: artwork.year,
    img: artwork.img,
    description: raw.creditLine || `${raw.medium || ""}${raw.medium && raw.dimensions ? " · " : ""}${raw.dimensions || ""}`.trim() || `A work from the ${artwork.era}.`,
    period: artwork.period,
    era: artwork.era,
    medium: artwork.medium,
    dimensions: artwork.dimensions,
    location: artwork.location,
    creditLine: artwork.creditLine,
    metUrl: artwork.metUrl,
  };
}

// ── Fetch helpers ──────────────────────────────────────────────────────────

/**
 * Fetch a single Met artwork by object ID.
 * Returns null if the artwork has no public-domain image or the request fails.
 */
export async function fetchMetArtwork(id: number): Promise<Artwork | null> {
  try {
    const res = await fetch(`${MET_BASE}/objects/${id}`, {
      next: { revalidate: 86400 }, // cache 24 h
    });
    if (!res.ok) return null;
    const raw = (await res.json()) as MetApiObject;
    if (!raw.primaryImage || !raw.isPublicDomain) return null;
    return transformToArtwork(raw);
  } catch {
    return null;
  }
}

/**
 * Fetch a single Met artwork as a `GalleryItem` for the slide gallery.
 */
async function fetchMetGalleryItem(id: number): Promise<GalleryItem | null> {
  try {
    const res = await fetch(`${MET_BASE}/objects/${id}`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const raw = (await res.json()) as MetApiObject;
    if (!raw.primaryImage || !raw.isPublicDomain) return null;
    return transformToGalleryItem(raw);
  } catch {
    return null;
  }
}

/**
 * Fetch multiple Met artworks as `GalleryItem[]`.
 * Invalid IDs and failures are silently dropped.
 */
export async function fetchMetGalleryItems(ids: number[]): Promise<GalleryItem[]> {
  const settled = await Promise.allSettled(ids.map((id) => fetchMetGalleryItem(id)));
  return settled
    .filter((r): r is PromiseFulfilledResult<GalleryItem | null> => r.status === "fulfilled")
    .map((r) => r.value)
    .filter((item): item is GalleryItem => item !== null);
}

/**
 * Search the Met collection and return up to `limit` GalleryItems.
 * Only returns public-domain artworks with images.
 */
export async function searchMetGallery(query: string, limit = 10): Promise<GalleryItem[]> {
  try {
    const res = await fetch(
      `${MET_BASE}/search?q=${encodeURIComponent(query)}&hasImages=true&isPublicDomain=true`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];
    const { objectIDs } = (await res.json()) as MetSearchResult;
    if (!objectIDs?.length) return [];
    return fetchMetGalleryItems(objectIDs.slice(0, limit));
  } catch {
    return [];
  }
}
