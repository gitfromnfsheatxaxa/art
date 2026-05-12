import Image from "next/image";

type GalleryCardProps = {
  art: string;
  title: string;
  artist: string;
  year: string;
  /** Data URI for blur placeholder */
  placeholder?: string;
};

export function GalleryCard({ art, title, artist, year, placeholder }: GalleryCardProps) {
  return (
    <div className="group relative h-[380px] min-w-[280px] overflow-hidden border border-codex-gold/60 bg-codex-dark/70 shadow-gilded transition-transform duration-500 hover:scale-[1.03]">
      <div className="relative h-[70%]">
        <Image
          src={art}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
          sizes="280px"
          loading="lazy"
          placeholder={placeholder ? "blur" : undefined}
          blurDataURL={placeholder}
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-codex-dark via-codex-dark/90 to-transparent px-4 pb-4 pt-10">
        <div className="font-heading text-sm text-codex-gold">{title}</div>
        <div className="mt-1 text-sm italic text-codex-parchment/80">
          {artist}, {year}
        </div>
      </div>
    </div>
  );
}
