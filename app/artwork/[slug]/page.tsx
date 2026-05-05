import { notFound } from "next/navigation";

import { getArtworkBySlug } from "@/entities/artwork/model";
import { fetchMetArtwork } from "@/features/api/met-museum";
import { fetchRijksmuseumArtwork } from "@/features/api/rijksmuseum";
import { ArtworkDetailExperience } from "@/widgets/ArtworkDetailExperience";

type ArtworkPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ArtworkPage({ params }: ArtworkPageProps) {
  const { slug } = await params;

  // 1 – Try static index first (fast, no network)
  const staticArtwork = getArtworkBySlug(slug);
  if (staticArtwork) {
    return <ArtworkDetailExperience artwork={staticArtwork} />;
  }

  // 2 – Rijksmuseum API for "rijks-{objectNumber}" slugs
  if (slug.startsWith("rijks-")) {
    // Convert slug back to object number: "rijks-sk-c-5" -> "SK-C-5"
    const objectNumber = slug
      .replace("rijks-", "")
      .toUpperCase()
      .replace(/-/g, "-");
    const rijksmuseumArtwork = await fetchRijksmuseumArtwork(objectNumber);
    if (rijksmuseumArtwork) {
      return <ArtworkDetailExperience artwork={rijksmuseumArtwork} />;
    }
  }

  // 3 – Met Museum API for "met-{id}" slugs
  if (slug.startsWith("met-")) {
    const metId = parseInt(slug.replace("met-", ""), 10);
    if (!isNaN(metId)) {
      const metArtwork = await fetchMetArtwork(metId);
      if (metArtwork) {
        return <ArtworkDetailExperience artwork={metArtwork} />;
      }
    }
  }

  notFound();
}
