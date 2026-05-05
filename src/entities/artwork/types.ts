export type Artwork = {
  slug: string;
  title: string;
  artist: string;
  year: string;
  img: string;
  era: string;
  eraId: string;
  period: string;
  medium?: string;
  dimensions?: string;
  location?: string;
  description?: string;
  // Met Museum fields (only present on API-sourced artworks)
  creditLine?: string;
  metUrl?: string;
  isMet?: boolean;
};

export type FeaturedArtwork = Artwork & {
  galleryDesc: string;
};

export type HomeSection = {
  id: string;
  art: string;
  title: string;
  artist: string;
  bgPosition?: string;
};
