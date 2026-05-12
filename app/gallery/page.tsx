import type { Metadata } from "next";
import { Suspense } from "react";

import type { GalleryItem } from "@/features/api/types";
import { FEATURED_MET_IDS, fetchMetGalleryItems } from "@/features/api/met-museum";
import { FEATURED_RIJKSMUSEUM_IDS, fetchRijksmuseumGalleryItems } from "@/features/api/rijksmuseum";
import { GALLERY_ARTWORKS } from "@/shared/constants/artworks";
import { GalleryExperience } from "@/widgets/GalleryExperience";
import { PageLoadingSkeleton } from "@/shared/ui/PageLoadingSkeleton";

export const metadata: Metadata = {
  title: "Gallery — Codex Luminara",
  description: "Slide through forty centuries of masterworks — from the Renaissance to today.",
};

/** Convert static GALLERY_ARTWORKS to unified GalleryItem shape */
function staticToGalleryItem(a: (typeof GALLERY_ARTWORKS)[number]): GalleryItem {
  return {
    slug: a.slug,
    detailHref: `/artwork/${a.slug}`,
    isMet: false,
    title: a.title,
    artist: a.artist,
    year: a.year,
    img: a.img,
    description: a.galleryDesc,
    period: a.period,
    era: a.era,
    medium: a.medium,
    dimensions: a.dimensions,
    location: a.location,
  };
}

export default async function GalleryPage() {
  let rijksmuseumItems: GalleryItem[] = [];
  let metItems: GalleryItem[] = [];

  try {
    // Fetch Rijksmuseum artworks first (primary data source)
    rijksmuseumItems = await fetchRijksmuseumGalleryItems(FEATURED_RIJKSMUSEUM_IDS);
  } catch (error) {
    console.warn("Failed to fetch Rijksmuseum artworks:", error);
  }

  try {
    // Fetch Met Museum artworks as secondary fallback
    metItems = await fetchMetGalleryItems(FEATURED_MET_IDS);
  } catch (error) {
    console.warn("Failed to fetch Met Museum artworks:", error);
  }

  // Static artworks as final fallback
  const staticItems = GALLERY_ARTWORKS.map(staticToGalleryItem);

  // Combine all sources: Rijksmuseum first, then Met Museum, then static
  const allItems: GalleryItem[] = [...rijksmuseumItems, ...metItems, ...staticItems];

  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <GalleryExperience items={staticItems} />
    </Suspense>
  );
}
