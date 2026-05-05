import { ARTWORK_INDEX } from "@/shared/constants/artworks";

export function getArtworkBySlug(slug: string) {
  return ARTWORK_INDEX.find((artwork) => artwork.slug === slug);
}
